# Controllers + Routing

Your plugin’s HTTP API is entirely up to you.
Controllers are not automatically discovered or given routes in Craft 6.x, so you are responsible for mapping them using Laravel’s `Route` facade.

As your plugin is booted, the `CraftCms\Cms\Plugin\Concerns\HasRoutes` concern looks for three files in your plugin’s top-level `routes/` directory, each with a distinct behavior:

- `web.php` — Front-end routes, with standard middleware (`craft` and `craft.web`).
- `cp.php` — Control panel routes, with additional middleware  (`craft.cp`) that automatically enforces basic permissions. These routes are prefixed with your `cpTrigger`.
- `actions.php` — A compatibility layer for Yii’s “action path” routing scheme. These routes are registered twice: once prefixed with your `actionTrigger` using standard middleware, and once prefixed with `{cpTrigger}/{actionTrigger}` using the additional control panel middleware.

Here’s an example of a `web.php` file:

```php
use MyOrg\Activity\Http\Controllers\TrackEvent;
use Illuminate\Support\Facades\Route;

Route::post('activity/track', TrackEvent::class);
```

You are free to use these spaces however you see fit!
Keep in mind that each of these files is included within another routing group and the routes you define are subject to some default rules.
See the [middleware](#middleware) section for more info.

::: tip
Because your controllers are just classes, any app with your plugin installed can create custom routes pointing to them.
You can use this to your advantage by omitting front-end routes altogether, and letting the developer choose where to mount each endpoint.

An example might be a portal to manage newsletter subscriptions—instead of baking in the plugin’s name to the management interface (i.e. `/super-forms/signup`), you could require developers to define a route to its `ManageSubscriptions` controller.
This is similar to how Craft has required each project to choose where its GraphQL API lives.
:::

Yii’s automatic routing scheme for controller actions used specific paths that involved the plugin or module’s identifier and kebab-cased controller and action names.
Craft 6.x does not impose any of these requirements—but continuing to prefix routes with your plugin handle is a great way to avoid collisions.

## Action Paths

Plugins can define a special `routes/actions.php` file to maintain compatibility with any front-end forms or other external integrations that they don’t control:

```php
# routes/actions.php

Route::prefix('activity', function() {
    Route::post('events/log', TrackEvent::class);
});

# Two routes:
# -> actions/activity/events/log
# -> admin/actions/activity/events/log
```

See the [Guest Entries](repo:craftcms/guest-entries/tree/5.x) plugin for an example.

## Middleware

All of Craft’s middleware is registered by `CraftCms\Cms\Route\RouteServiceProvider`.
Each middleware group referenced in `HasRoutes` corresponds to a list of handlers in the route service provider.
You can view the final route layout via the `routes:list` command:

```bash
# -v displays middleware groups for each route.
# -vv lists *every middleware class* that will apply to each route.
ddev artisan route:list --path=some-path-segment -v
```

You can create your own middleware and attach it to your routes like any other Laravel application.
It’s `handle()` method will be called with the `Request` object and a `$next` closure.
Middleware operates on [requests *and* responses](laravel:middleware#middleware-and-responses), based on when you yield to the rest of the app by calling `$next($request)`.

Laravel’s “terminable” middleware is not compatible with all hosting environments, so we recommend using the generalized termination callback to perform cleanup after a response is sent:

```php
app()->terminating($this->flushLazyEvents());
```

## Authorization

Controllers in Laravel don’t often do their own authorization, because they’re no longer automatically exposed to the router.
See the [permissions](#) for info about guards, policies, and other middleware that you can define alongside your routes.

Any route can be guarded with a known permission using the `can` middleware:

```php
Route::get('events/history', ListHistory::class)
    ->middleware(['can:eventsPlugin-viewEventHistory']);
```

The [session](session.md) section has information about interacting with the current user.

## Controllers

As a result of so much logic being composed from existing middleware, there is no base controller to extend!
You are welcome to continue grouping multiple actions into a single controller class, or split controllers into individual *invokable* classes.

For convenience, we’ve collected a handful of methods in a `CraftCms\Cms\Http\RespondsWithFlash` trait (like the familiar `asSuccess()` and `asFailure()` methods and their JSON and “model” counterparts).

Add “dependencies” to a controller’s constructor as properties (for controllers with multiple actions), or to the `__invoke()` or `handle()` methods (for single-action controllers):

```php
readonly class TrackEvent
{
    public function __construct(
        public \Illuminate\Http\Request $request
    ) {}

    public function handle(
        MyOrg\Activity\Ledger\Events $events
    ) {
        $event = $this->request->validate([
            'name' => ['required', 'string'],
        ]);

        abort_unless($events->log($event['name'], $request->getUserIp()));

        // ...
    }
}
```

At first blush, this implementation *looks* wildly permissive and prone to abuse.
In reality, it can be exposed in a completely safe way with the appropriate middleware.
Your plugin can even make these hardening measures configurable:

```php
public function bootPlugin()
{
    RateLimiter::for('activity', function (Request $request) {
        $limit = $this->getSettings()->maxEventsPerMinute;

        return Limit::perMinute($limit)->by($request->getClientIp());
    });
}
```

You’d apply this custom rate-limiting middleware in `routes/web.php`:

```php
Route::middleware(['throttle:activity'])->group(function () {
    Route::post('activity/track', TrackEvent::class);
});
```

A complete example of this kind of configurable routing can be found in our [Guest Entries](https://github.com/craftcms/guest-entries/tree/5.x) plugin.

## Named Routes

If your route map is growing or changing frequently in development, you can give your routes [names](laravel:routing#named-routes) to avoid form actions, redirects, and routes from getting out of sync.

## Helpers

Laravel comes with a number of ergonomic improvements for generating [responses](laravel:responses):

```php
// Default:
if (in_array($event->name, $forbiddenEvents)) {
    abort(400, 'We are no longer tracking this event.');
}

// Succinct:
abort_if(in_array($event->name, $forbiddenEvents), 400, 'We are no longer tracking this event.');

// Inverse:
abort_unless($event->isTrackable(), 400, 'We are no longer tracking this event.');

// Redirect to a path:
return redirect('/my-account/profile');

// Redirect to a named route:
return redirect()->route('account.profile');

// Send the client back to the referring path:
return back()
    ->with('event_name', $event->name);

// Flash input back to the session to repopulate a form (using the `old()` helper):
return back()
    ->withInput();
```

Some of these are roughly equivalent to the familiar convenience methods provided by `CraftCms\Cms\Http\RespondsWithFlash`.
You don’t need to `return` the `abort()` calls, as they exit the method by throwing an exception.

::: tip
If you’ve implemented [middleware](#middleware) for authorization, you may find that you’re not even reaching for these helpers very often!
:::
