# Queue Jobs

Craft uses a queue for processing background tasks like updating indexes, propagating entries, and pruning revisions. You can write simple queue job classes to register your asynchronous queue tasks.

This feature relies on [Yii’s queue system](https://www.yiiframework.com/extension/yiisoft/yii2-queue/doc/guide/2.0/en/usage), to which Craft adds a [BaseJob](craft3:craft\queue\BaseJob) class for some perks:

- The ability to set a fallback description for the job.
- The ability to label and report task progress for a better user experience.

## To Queue or Not to Queue

An ideal queue job is something slow that the a user shouldn’t have to wait on while using a site’s front end or the control panel. Multi-step processes and actions that connect with third-party APIs can be ideal candidates for queueing.

Critical tasks, however, should not necessarily be entrusted to the queue. A default Craft install will have <config3:runQueueAutomatically> enabled and be reliant on a control panel browser session to trigger the queue. This could result in queue processing delays for infrequently-accessed sites.

Similarly, failed queue jobs may pause the queue and require admin intervention. Both are worth considering as you’re contemplating whether or not to utilize a queue job for your plugin or custom module.

## Writing a Job

You can add your own queue job by first writing a class that extends <craft3:craft\queue\BaseJob> and implements `execute()`.

This example class sends an email:

```php
<?php

namespace modules\jobs;

use craft\mail\Message;

class MyJob extends \craft\queue\BaseJob
{
    /**
     * @inheritdoc
     */
    public function execute($queue): void
    {
        $message = new Message();

        $message->setTo('to@foo.dev');
        $message->setSubject('Oh Hai');
        $message->setTextBody('Hello from the queue system! 👋');

        try {
            \Craft::$app->getMailer()->send($message);
        } catch (\Throwable $e) {
            // Don’t let an exception block the queue
            echo 'Something went wrong: ' . $e->getMessage();
        }
    }

    /**
     * @inheritdoc
     */
    protected function defaultDescription(): string
    {
        return \Craft::t('app', 'Sending a worthless email');
    }
}
```

### Updating Progress

If your job involves multiple steps, you might want to report its progress while it’s executing.

You can do this with BaseJob’s [`setProgress()`](craft3:craft\queue\BaseJob::setProgress()) method, whose arguments are

- the queue instance
- a number between 0 and 1 representing the percent complete
- an optional, human-friendly label describing the progress

We can modify our example `execute()` method to send an email to every Craft user and report the job’s progress.

::: danger
Do not lightheartedly send an email to every Craft user. Not cool.
:::

```php{7-14}
public function execute($queue): void
{
    $users = \craft\elements\User::findAll();
    $totalUsers = count($users);

    foreach ($users as $i => $user) {
        $this->setProgress(
            $queue,
            $i / $totalUsers,
            \Craft::t('app', '{step, number} of {total, number}', [
                'step' => $i + 1,
                'total' => $totalUsers,
            ])
        );

        $message = new Message();

        $message->setTo($user->email);
        $message->setSubject('Oh Hai');
        $message->setTextBody('Hello from the queue system! 👋');

        try {
            \Craft::$app->getMailer()->send($message);
        } catch (\Throwable $e) {
            // Don’t let an exception block the queue
            echo 'Something went wrong: ' . $e->getMessage();
        }
    }
}
```

## Registering

You’ll need to register it using the queue service:

```php
use mynamespace\queue\jobs\MyJob;

\Craft::$app->queue->push(new MyJob());
```

You can do this wherever it makes sense—most likely in a controller action or service.

Unlike registering lots of other things in Craft, it’s _not_ a great idea to do this in your plugin or module’s `init()` method because that could add the job to the queue on every request.

### Specifying Priority

You can specify priority when pushing a job by passing an integer in a second argument:

```php
use mynamespace\queue\jobs\MyJob;

\Craft::$app->queue->push(new MyJob(), 10);
```

The default priority is `1024`, and jobs with a lower priority are executed first.

::: warning
Not all drivers support job priorities.
:::