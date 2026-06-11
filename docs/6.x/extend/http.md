---
sidebarDepth: 2
---

# Controllers + Routing

Your plugin’s HTTP API is entirely up to you.
Controllers are not automatically discovered or given routes in Craft 6.x, so you are responsible for mapping them using Laravel’s `Route` facade.

As your plugin is booted, the `CraftCms\Cms\Plugin\Concerns\HasRoutes` concern looks for three files in your plugin’s top-level `routes/` directory, each with a distinct behavior:

- `web.php` — Front-end routes, with standard [middleware](#middleware) (`craft` and `craft.web`).
- `cp.php` — Control panel routes, with additional middleware  (`craft.cp`) that automatically enforces basic permissions. These routes are prefixed with your `cpTrigger`.
- `actions.php` — A compatibility layer for Yii’s [action path](#action-paths) routing scheme. These routes are registered twice: once prefixed with the project’s `actionTrigger` using standard middleware, and once prefixed with `{cpTrigger}/{actionTrigger}` using the additional control panel middleware. Your plugin’s handle is also inserted between these prefixes and the declared routes.

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
Craft 6.x does not impose any of these requirements for routes defined in `web.php` or `cp.php`—but continuing to prefix routes with your plugin handle is a great way to avoid collisions.

## Action Paths

Plugins can define a special `routes/actions.php` file to maintain compatibility with any front-end forms or other external integrations that they don’t control:

```php
# routes/actions.php

Route::post('events/track', TrackEvent::class);

# Two routes:
# -> actions/activity/events/track
# -> admin/actions/activity/events/track
```

Action routes are automatically prefixed with your plugin’s handle (`activity`, in this example).
See the [Guest Entries](repo:craftcms/guest-entries/tree/5.x) plugin for an example.

::: warning
Action routes are considered a legacy feature, and while they are fully supported (even without the adapter), we encourage plugins to move to standard Laravel routing in `routes/web.php` and `routes/cp.php`
:::

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

### Authorization

Controllers in Laravel don’t often do their own authorization, because they’re no longer automatically exposed to the router.
See the [permissions](#permissions) section for info about guards, policies, and other middleware that you can define alongside your routes.

Any route can be guarded with a known permission using the `can` middleware:

```php
Route::get('activity/history', [HistoryController::class, 'index'])
    ->middleware(['can:activityPlugin-viewEventHistory']);
```

The [session](session.md) section has information about interacting with the current user.

### Permissions

Register permissions with Craft by defining a `getPermissions()` method in your plugin and returning an array of `CraftCms\Cms\User\Data\Permission` objects:

```php
use CraftCms\Cms\User\Data\Permission;

protected function getPermissions(): array
{
    return [
        new Permission(
            key: 'activity-viewReports',
            label: t('View {type}', [
                'type' => Report::pluralLowerDisplayName(),
            ]),
            nested: [
                // ...
            ],
        ),
        new Permission(
            key: 'activity-createReportTemplate',
            label: t('Create {type}', [
                'type' => Template::pluralLowerDisplayName(),
            ]),
        ),

        // ...
    ];
}
```

::: tip
Permissions should be explicitly named, as they are globally unique.
:::

In addition to the `can:` middleware (which is enforced before an action is invoked), a user’s permissions can be checked explicitly at any time throughout an action:

```php
// Check (but don’t throw):
if (! Gate::check('activity-viewReports')) {
    // ...
}

// Halt if unauthorized:
Gate::authorize('view', $report);
```

Unless another package has defined a simple gate with the exact name, bare ability checks (like the first example) fall through to Craft permissions.
In the second example, we’re authorizing against a specific object.
We do this internally, for elements: many related permissions determine whether a user can `save` an entry, so it doesn’t make sense to check against each of those specific permissions in each place an element might be saved.
Instead, these complex or compound checks are bundled with a [policy](laravel:authorization#creating-policies):

```php
class ReportPolicy
{
    /**
     * Runs before every check that resolves through this policy.
     */
    public function before(User $user, string $ability): ?bool
    {
        // ...
    }

    /**
     * Runs when explicitly checking the `view` ability against a Report object.
     */
    public function view(User $user, Report $report): bool
    {
        if (! $user->can('viewReports')) {
            return false;
        }

        $template = $report->getTemplate();

        // Are they allowed to view reports based on this template?
        if (! $user->can('viewReports:'.$template->uid)) {
            return false;
        }

        // Can they view reports they didn’t run?
        if ($user->id !== $report->creatorId && ! $user->can('viewPeerReports:'.$template->uid)) {
            return false;
        }

        return true;
    }
}
```

[Register your policy class](laravel:authorization#manually-registering-policies) with Laravel’s gate system, specifying the resource it should be evaluated against:

```php
Gate::policy(Report::class, ReportPolicy::class);
```

When bound to a class like this, your ability names can be simplified: our `activity-viewReports` permission is reduced to just the “action” `view`, as it only needs to be unique within that policy.

::: tip
Listen to the `Illuminate\Auth\Access\Events\GateEvaluated` event (or register an “after-check” callback with `Gate::after(...)`) to audit or alter the outcome of gate checks.

You can also intercept permission checks early, by registering a `before` handler:

```php
Gate::before('saveEntries:a6dbf63e-89fb-4f17-9205-2e7469f0aa2a', function (User $user, Entry $entry) {
    // Return `true` or `false` only if you have enough information; return `null` to continue processing.
});
```

In a plugin, the UUID in this example would need to be looked up, dynamically.
:::

In some situations, you may still need to resolve permissions directly via a user element:

```php
// Check against the current user:
Auth::craftUser()->can('triggerReport');

// Check against a specific user:
$recipient->can('requestAccess', $report);
```

These calls ultimately flow through the same checks, and are eventually handled by Craft using `CraftCms\Cms\User\UserPermissions::doesUserHavePermission()`.

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

::: warning
Individual projects can always add routes to your controllers that fully or selectively bypass middleware you would normally include.
:::

### Rendering Templates

Use the `template()` helper function to [render a Twig template](templates.md):

```php
public function __invoke()
{
    return template('activity/_session-report', [
        // ...
    ]);
}
```

Laravel’s generic `view()` helper function will also locate Blade templates.
`pageTemplate()` should be used when the template extends a control panel layout, or any time you want to trigger [page lifecycle](templates.md) hooks.

Templates that require no additional logic can be bound directly to a route:

```php
Route::view('my-stats', 'activity/_stats/user-summary');
```

## Named Routes

If your route map is growing or changing frequently in development, you can give your routes [names](laravel:routing#named-routes) to avoid form actions, redirects, and routes from getting out of sync.
This can also help when making some portion of your plugin-provided routes customizable on a per-project basis, while retaining

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
