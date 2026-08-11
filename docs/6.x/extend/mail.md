---
description: Craft’s email capabilities sit on top of Laravel’s highly flexible mailer.
---

# Mail

Mailer adapters are no longer necessary, as drivers are [configured directly via Laravel](laravel:mail), in `config/mailer.php`.

<!-- more -->

## System Messages

Craft’s **System Messages** utility is still used to manage built-in and plugin-provided email messages.

Your plugin can [register](registries.md) system messages by implementing the `getSystemMessages()` method:

```php
use CraftCms\Cms\SystemMessage\Data\SystemMessage;

public function getSystemMessages()
{
    return [
        'report_finished' => fn () => new SystemMessage(
            key: 'report_finished',
            heading: 'When a report is finished generating',
            subject: 'Here is your {report.template.name} report',
            body: "Hi, {report.creator.fullName}!\n\nA {report.template.name} just finished running. To download it, ...",
        ),
    ];
}
```

This method is invoked as your plugin is booted, so each value in the returned array must be a [closure](registries.md#lazy-resolution), under the same key the `SystemMessage` will produce, later.

To send a system message, pass the “mailable” to Laravel’s `Mail` facade:

```php
use CraftCms\Cms\SystemMessage\SystemMessages;
use Illuminate\Support\Facades\Mail;

$message = app(SystemMessages::class)->mailable('report_finished', $report->creator, [
    'report' => $report,
]);

Mail::send($message);
```

## Other Mailables

A system messages is just one implementation of Laravel’s `Mailable`, with the notable limitation of requiring an existing Craft user.
For all other email, extend our `CraftCms\Cms\Email\Mailables\CraftMailable` class:

```php
namespace MyOrg\Activity\Notifications;

use CraftCms\Cms\Email\Mailables\CraftMailable;

class ReportFinished extends CraftMailable
{
    public int $reportId;
    public string $summary = '';

    // ...
}
```

This gives your mailables a `siteId` property, which helps Craft pick up site-specific mailer overrides before sending:

```php
$message = new ReportFinished($report);
$message->setTo($report->notifyEmail);
$message->siteId = $report->getTemplate()->siteId;

// Send after resolving mailer overrides for `siteId`:
$message->send();
```

## Mail Events

Register a [listener](events.md) for `Illuminate\Mail\Events\MessageSending` to monitor outgoing emails, and return `false` to suppress them.
