# Jobs + Queue

A job in Laravel is generally just a class with a `handle()` method.
Its behavior is determined by a handful of interfaces and traits, which we’ve packaged together for extension as `CraftCms\Cms\Queue\Job`.

```php
namespace MyOrg\Activity\Reporting\Jobs;

use CraftCms\Cms\Queue\Job;
use MyOrg\Activity\Reporting\Manager;

class GenerateReport extends Job
{
    public function __construct(
        public int $templateId,
        public bool $notifyOwner,
    ) {}

    // Laravel can automatically inject dependencies when it runs your job:
    public function handle(
        Manager $manager,
    ): void
    {
        $report = $manager->getTemplateById($this->templateId);
    }
}
```

Push jobs using the `dispatch()` helper:

```php
dispatch(new GenerateReport(1234, true));

// The base Job class is `Dispatchable`, meaning it has an equivalent static method that forwards arguments to the constructor:
GenerateReport::dispatch(1234, true);
```

Counterintuitively, jobs are not necessarily queued!
When building a custom job, you’ll need to `use Illuminate\Contracts\Queue\ShouldQueue` and `use Illuminate\Queue\InteractsWithQueue;` to tell Laravel that it can (and _should_) be pushed to the queue, rather than executed immediately.

## Priority

Laravel’s queues do not have an equivalent for “priority,” but we allow individual apps to designate a `lowPriorityQueue` in their general config file.
You can divert nonessential jobs to that queue, with the understanding that they may not actually yield to the normal queue.
Communicate to developers about your use of the queue so they can plan accordingly.

A few other changes are worth noting:

- Jobs are now given a `dateCompleted` rather than being immediately deleted. Craft prunes the jobs table during garbage collection.
- `ttr` has been renamed `timeout`
- Job are identified by UUIDs instead of IDs.
- New kinds of jobs are available to projects that support them: consider implementing [chained jobs](laravel:queues#chains-and-batches), [collision-avoidance](laravel:queues#preventing-job-overlaps), or [parallelization](laravel:queues#job-batching)

## Scheduling

Jobs can also be [executed on a schedule](laravel:scheduling#scheduling-queued-jobs).
