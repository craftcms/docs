# Mail

Mailer adapters are no longer necessary, as drivers are [configured directly via Laravel](laravel:mail), in `config/mailer.php`.

## System Messages

Craft’s **System Messages** utility is still used to manage built-in and plugin-provided email messages.

Register a system message with the `RegisterSystemMessages` event, from your `bootPlugin()` method:

```php
use Illuminate\Support\Facades\Event;
use CraftCms\Cms\SystemMessage\Data\SystemMessage;
use CraftCms\Cms\SystemMessage\Events\RegisterSystemMessages;

Event::listen(function(RegisterSystemMessages $event) {
    $event->messages->push(new SystemMessage(
        key: 'report_finished',
        heading: 'When a report is finished generating',
        subject: 'Here is your {report.template.name} report',
        body: "Hi, {report.creator.fullName}!\n\nA {report.template.name} just finished running. To download it, ...",
    ));
});
```

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
