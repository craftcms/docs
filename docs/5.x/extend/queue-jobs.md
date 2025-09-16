---
description: Offloading work to a background process can improve the experience and reliability of your plugin’s functionality.
---

# Queue Jobs

Craft uses a queue for processing background tasks like updating indexes, propagating entries, and pruning revisions. You can write simple queue job classes to register your asynchronous queue tasks.

This feature relies on [Yii’s queue system](https://www.yiiframework.com/extension/yiisoft/yii2-queue/doc/guide/2.0/en/usage), to which Craft adds a [BaseJob](craft5:craft\queue\BaseJob) class for some perks:

- The ability to set a fallback description for the job.
- The ability to label and report task progress for a better user experience.

## To Queue or Not to Queue?

An ideal queue job is something slow that the a user shouldn’t have to wait on while using a site’s front end or the control panel. Multi-step processes and actions that connect with third-party APIs can be ideal candidates for queueing.

Critical tasks, however, should not necessarily be entrusted to the queue. A default Craft install will have <config5:runQueueAutomatically> enabled and be reliant on a control panel browser session to trigger the queue. This could result in queue processing delays for infrequently-accessed sites.

Similarly, failed queue jobs may pause the queue and require admin intervention. Both are worth considering as you’re contemplating whether or not to utilize a queue job for your plugin or custom module.

## Writing a Job

You can add your own queue job by first writing a class that extends <craft5:craft\queue\BaseJob> and implements `execute()`.

This example class sends an email:

```php
<?php

namespace modules\jobs;

use Craft;
use craft\mail\Message;

class MyJob extends \craft\queue\BaseJob
{
    public function execute($queue): void
    {
        $message = new Message();

        $message->setTo('to@domain.tld');
        $message->setSubject('Craft Queue Test');
        $message->setTextBody('Hello from the Craft queue worker! 👋');

        Craft::$app->getMailer()->send($message);
    }

    protected function defaultDescription(): string
    {
        return Craft::t('app', 'Sending a test email');
    }
}
```

### Updating Progress

If your job involves multiple steps, you might want to report its progress while it’s executing.

You can do this with BaseJob’s [`setProgress()`](craft5:craft\queue\BaseJob::setProgress()) method, whose arguments are:

- the queue instance
- a number between 0 and 1 representing the percent complete
- an optional, human-friendly label describing the progress

We can modify our example `execute()` method to send an email to a number of users and report the job’s progress between each send.

```php{7-14}
public function execute($queue): void
{
    $users = \craft\elements\User::find()
        ->admin(false)
        ->all();
    $totalUsers = count($users);

    foreach ($users as $i => $user) {
        $this->setProgress(
            $queue,
            $i / $totalUsers,
            Craft::t('app', '{step, number} of {total, number}', [
                'step' => $i + 1,
                'total' => $totalUsers,
            ])
        );

        $message = new Message();

        $message->setTo($user->email);
        $message->setSubject('Craft Queue Test');
        $message->setTextBody('Hello from the Craft queue worker! 👋');

        // Swallow exceptions from the mailer:
        try {
            Craft::$app->getMailer()->send($message);
        } catch (\Throwable $e) {
            Craft::warning("Something went wrong: {$e->getMessage()}", __METHOD__);
        }
    }
}
```

Depending on the number of users (or any kind of record or item) and the app’s mailer configuration, this may take longer than the queue’s allowed <abbr title="Time to reserve">TTR</abbr>. Consider [batching](#batched-jobs) jobs that act on many individual items!

### Dealing with Failed Jobs

In our first example, exceptions from the mailer can bubble out of our job—but in the second example, we catch those errors so the job is not halted prematurely.

This decision is up to you: if the work in a job is nonessential (or can be done again later without consequence, as is the case with <craft5:craft\queue\jobs\GeneratePendingTransforms>), you can catch errors, log them, and let the job exit nominally; if the work is critical (like synchronizing something to or from an external API), it may be better to let the exception bubble out of `execute()`.

The queue wraps every job in its own `try` block, and will mark any jobs that throw exceptions as _failed_. The exception message that caused the failure will be recorded along with the job. Failed jobs can be retried from the control panel or with the `php craft queue/retry [id]` command.

#### Retryable Jobs

The queue will automatically retry failed jobs that implement [`RetryableJobInterface`](https://www.yiiframework.com/extension/yiisoft/yii2-queue/doc/guide/2.0/en/retryable#retryablejobinterface). A job will only be retried after its “time to reserve” has passed—even if it didn’t use up the allowed time—and will be marked as failed once `canRetry()` returns false.

::: warning
Unconditionally returning `true` from `canRetry()` will pollute your queue with jobs that may never succeed. Failed jobs are not necessarily bad—exceptions can (and should) be thrown to track failures in code that runs unattended!
:::

### Batched Jobs

In situations where there is simply too much work to do in a single request (or within PHP’s memory limit), consider extending <craft5:craft\queue\BaseBatchedJob>.

Batched jobs’ `execute()` method is implemented for you. Instead, you must define two new methods:

- `loadData()` — Returns a class implementing <craft5:craft\base\Batchable>, like <craft5:craft\db\QueryBatcher>. Data is not necessarily _loaded_ at this point—instead, you’ll return a means of fetching data in “slices” or “pages.”
- `processItem($item)` — Your logic for handling a single item in each batch.

::: tip
<craft5:craft\db\QueryBatcher> can be passed any <craft5:craft\db\Query> subclass, including element queries. Use it to wrap queries returned from `loadData()`:

```php
use craft\db\QueryBatcher;
use craft\elements\Asset;

$query = Asset::find()
    ->volume('whitepapers')
    ->orderBy('id ASC');

return new QueryBatcher($query);
```

Also note that we’re explicitly ordering by `id`—this can help avoid skipped or double-processed items across batches when the underlying data changes (including changes made _within a job_)!
:::

Batched jobs can also define a default `$batchSize` that is appropriate for the workload. The batch size is a _maximum_ value, carried from job to job—Craft keeps track of memory usage and _may_ stop short and push a new job for the next batch. Every job maintains an `itemOffset` so they can be resumed exactly where the last one left off.

::: warning
Batched jobs **must** be pushed using <craft5:craft\helpers\Queue::push()>, or `delay` and `ttr` settings may be lost for subsequent batches.
:::

#### Batch Hooks

Special setup and cleanup actions can be defined in two pairs of methods:

| Method… | Runs… |
| --- | --- |
| `before()` | …at the very beginning of a series of batched jobs. |
| `beforeBatch()` | …prior to each batch in a series. |
| `afterBatch()` | …after each batch in a series. |
| `after()` | …at the very end of a series of batched jobs. |

`before()` and `after()` are invoked _once_ per manually-pushed batched job, whereas `beforeBatch()` and `afterBatch()` are run for _every_ slice. If all the items in a batched job are processed in a single job, it will invoke all four hooks.

## Adding Your Job to the Queue

Once you’ve created your job, add it to the queue with the helper:

```php{4}
use craft\helpers\Queue;
use mynamespace\queue\jobs\MyJob;

Queue::push(new MyJob());
```

Users and developers typically cannot (and should not need to) trigger specific jobs at-will, so it’s important that your plugin push jobs where it makes sense—typically in a [controller action](controllers.md) or [service](services.md).

### Specifying Priority

You can specify priority when pushing a job by passing an integer in a second argument:

```php
use mynamespace\queue\jobs\MyJob;

\craft\helpers\Queue::push(new MyJob(), 10);
```

The default priority is `1024`, and jobs with a lower priority are executed first.

Not all queue drivers support setting a priority; `Queue::push()` will attempt to set it and fall back to pushing without a priority if the driver throws a `NotSupportedException`.

| Queue Driver                 | Supports Priority
| ---------------------------- | -----------------
| [amqp](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/amqp/Queue.php)         | <x-mark />
| [amqp_interop](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/amqp_interop/Queue.php) | <check-mark />
| [beanstalk](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/beanstalk/Queue.php) | <check-mark />
| [db](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/db/Queue.php) | <check-mark />
| [file](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/file/Queue.php) | <x-mark />
| [gearman](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/gearman/Queue.php) | <check-mark />
| [redis](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/redis/Queue.php) | <x-mark />
| [sqs](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/sqs/Queue.php) | <x-mark />
| [stomp](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/stomp/Queue.php) | <x-mark />
| [sync](https://github.com/yiisoft/yii2-queue/tree/master/src/drivers/sync/Queue.php) | <x-mark />
