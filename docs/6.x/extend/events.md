# Events + Listeners

Every event that Craft emits is now a distinct class.
Most “named” event constants (i.e. `EVENT_AFTER_SAVE`) have been translated to a corresponding class.

::: tip
Due to the increased specificity of event classes, instance-level events and listeners are rare in the new architecture.
:::

## Events

An event class does not need to extend from any other class.
Its name should adequately describe what is about to happen (or what has just happened); if there is relevant data, it can be attached using a property.

```php
namespace MyOrg\Store\Shipping\Events;

class DeliveryConfirmed {}
```

Emit an event using the `event()` helper function:

```php
event($confirmation = new DeliveryConfirmed);
```

If you care about the outcome of the event, store the event instance in a variable, as we’ve done above.

- **Cancelable** events should `use CraftCms\Cms\Shared\Concerns\ValidatableEvent`, and the emitting context can proceed based on `$event->isValid`. As with the legacy `CancelableEvent`, the last handler to set `isValid` wins.
- **Handleable** events should `use CraftCms\Cms\Shared\Concerns\HandleableEvent`, and the emitting context can check `$event->handled` to determine whether a handler intervened.

As an alternative to handleable events, `Event::until()` or `event(..., halt: true)` can be used to capture the first non-null return value from a handler.
Similarly, instruct other developers to return `false` from an event to prevent further handlers from running.

[Dispatchable](laravel:events#dispatching-events) events provide an alternative pattern:

```php
DeliveryConfirmed::dispatch($args);
```

## Listeners

[Listeners](laravel:events#defining-listeners) can be classes, as well—or any kind of callable!

The main difference between Yii and Laravel event handlers is that you no longer need to know *where* an event comes from—you just listen for that event.
Specific objects/instances may be attached to an event, but there is no *de facto* `sender` property.

Bind listeners to events using your plugin’s `$events` property (see the `HasListeners` trait):

```php
use CraftCms\Cms\Cp\Events\DefineElementCardHtml;
use CraftCms\Cms\Element\Events\DraftApplied;
use CraftCms\Cms\Plugin\Plugin;
use Illuminate\Mail\Events\MessageSending;

class DemoPlugin extends Plugin
{
    // ...

    // Each item in this array should have an event class as its key, and one or more listeners as values:
    protected array $events = [
        // Craft event:
        DraftApplied::class => Listeners\LogElementActivity::class,
        // Laravel event:
        MessageSending::class => Listeners\LogMailMessage::class,
        // Multiple listeners can be attached to a single event name:
        DefineElementCardHtml::class => [
            // Listener class:
            Listeners\AddCardDetails::class,
            // “Callable” array:
            [self::class, 'redactSensitiveCardData'],
        ],
    ];

    // ...
}
```

These bindings are explicit, but Laravel can also infer which event a handler is for just from its signature.
Here’s an example of a listener defined as a closure that takes advantage of this:

```php
use CraftCms\Cms\Filesystem\Events\RegisterFilesystemTypes;
use MyVendor\MyPlugin\Filesystems\Dropbox

// ...

public function bootPlugin(): void
{
    // Closures must be bound in your plugin’s bootPlugin() method, as PHP doesn’t support them as static class properties!
    Event::listen(function(RegisterFilesystemTypes $event): void {
        $event->types->push(Dropbox::class)
    });
}
```

Within a *project*, add listener classes to `App\Listeners` and Laravel will [discover](laravel:events#event-discovery) them, automatically—or you can bind them explicitly in your service provider’s `boot()` method.

Listeners generally shouldn’t return anything, unless the event was emitted with `until()`.
Craft has historically used event properties to register or collect input from multiple handlers (i.e. `$event->types` in the example above), but Laravel also tracks return values from registered handlers and gives some values special significance.

::: tip
As you update your handlers, enforce this by giving the return value a `void` type. Return `false` from a handler only when you want to stop the event from propagating to other handlers.
:::

### Subscribers

[Subscribers](laravel:events#writing-event-subscribers) bundle multiple handlers into a class.
The organization is entirely up to you, but you must register your plugin’s subscribers in `bootPlugin()`:

```php
Event::subscribe(CustomerRetentionSubscriber::class);
```

## Transactions

Events that implement `Illuminate\Contracts\Events\ShouldDispatchAfterCommit` are deferred until the current database transaction completes.
This can help handlers from executing in another process before the underlying data is committed (say, if the event is [queueable](laravel:events#queued-event-listeners)).
