# Scheduled Tasks

Your plugin can register recurring workloads with Laravel’s internal [scheduler](laravel:scheduling).

<!-- more -->

These tasks can be implemented as [commands](laravel:artisan), [jobs](laravel:queues), or plain closures.
To configure a recurring task, define a `schedule()` method on your plugin’s base class:

```php
protected function schedule(Schedule $schedule): void
{
    // Send a test email every day:
    $schedule->command('craft:mailer:test')
        ->daily();

    // Queue a report at the top of every hour:
    $schedule->job(new GenerateReport(['templateId' => 1234]))
        ->hourly();

    // Report
    $schedule->call(function () {
        Log::info('Scheduler healthy!');
    })
        ->everyTenMinutes()
        ->thenPing(env('UPTIME_KUMA_SERVICE_URL'));
}
```

This `$schedule` instance is the same underlying class that Laravel’s documentation uses via a facade, so the APIs are identical.
Refer to the [scheduling documentation](laravel:scheduling) for a complete list of capabilities and options.

## Running the Schedule

The scheduler requires regular invocation by the host; it does not run automatically.
A typical CRON task would look something like this:

```
* * * * * /usr/bin/env php /var/www/html/artisan schedule:run
```

::: tip
This expression is compatible with DDEV’s [CRON add-on](https://github.com/ddev/ddev-cron).
:::

Some projects may not have a reliable schedule runner set up, so it’s important that you mention any reliance on scheduled tasks in your plugin’s installation instructions.
