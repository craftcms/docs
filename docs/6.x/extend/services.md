# Services

::: tip
This section discusses one of the headiest *conceptual* changes in Craft 6.x, but requires very few *practical* changes to your codebase or architecture!
:::

Services have been a staple of Craft and its plugin ecosystem from the beginning.
For most plugins, services *are* the API, and they were carefully grouped by, bound to, and accessed through “modules.”
This has taken basically two forms:

```php
# Craft 2.x:
craft()->activityPlugin_reportsService->generate(...);

# Craft 3.x–5.x:
Activity::getInstance()->getReports()->generate(...);
```

In Craft 6.x, “services” are nothing more than auto-loadable PHP classes.
Most are marked with the `Singleton` attribute to help Laravel’s service container reuse instances:

```php
namespace MyOrg\Activity\Reporting;

#[\Illuminate\Container\Attributes\Singleton]
class Manager
{
    public function generate(Template $template): Report
    {
        // ...
    }
}
```

You’ll either access these directly through the service container…

```php
app(\MyOrg\Activity\Reporting\Manager::class)->generate(...);
```

…or by adding a facade:

```php
namespace MyOrg\Activity\Facades;

use Illuminate\Support\Facades\Facade;

class Reports extends Facade
{
    #[\Override]
    protected static function getFacadeAccessor(): string
    {
        return \MyOrg\Activity\Reporting\Manager::class;
    }
}

# -> Reports::generate(...)
```

## Resolving a Service

Craft’s internal structure and inheritance model has been radically flattened by adopting this pattern.
It also means that you don’t need to resolve every API through a central instance—in fact, you may find that you’re rarely reaching for the service locator, thanks to dependency injection… revisiting our controller example, from earlier:

```php
namespace MyOrg\Activity\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

readonly class TrackEvent
{
    public function __construct(
        public \Illuminate\Http\Request $request
    ) {}

    public function handle(
        MyOrg\Activity\Ledger\Events $events
    ): Response
    {
        if (! $events->track($this->validated('name'))) {
            abort(400, 'The event could not be tracked.');
        }

        return new JsonResponse(['success' => true]);
    }
}
```

At no point in our method bodies do we need to manually “get” services from Craft (or even our own plugin).
The facade we created above brings dependency injection to the services they wrap, as well:

```php
Reports::fork($template, $currentUser);
```

```php
class Manager
{
    public function fork(
        Template $original,
        ?User $creator = null,
        Elements $elements,
    ): Template
    {
        return $elements->duplicate($original, ['creator' => $creator ?? $original->creator]);
    }
}
```

Outside a DI-capable context, you can always access Craft’s services via the `app()` container:

```php
app(\CraftCms\Cms\ProjectConfig\ProjectConfig)->get('graphql.enabled');
```

::: warning
You should never directly instantiate your services, especially those marked `#[Singleton]`.
The first time you request it through the container, Laravel will create an instance for you.
:::

The structure of your services remains entirely up to you.
We used the opportunity to refactor a number of Craft’s core features—as an example, the garbage collection service (`Gc`) was reduced in size roughly 80% by splitting it into [a number of bite-size invokable “action” classes](https://github.com/craftcms/cms/tree/6.x/src/GarbageCollection/Actions) that all still have access to the main service (and any additional services it might need) via dependency injection.

## Components

To make the transition a bit easier, we’ve brought along some of Yii’s “component” features that were upstream of Craft services.
Your services (and other data models) can extend `CraftCms\Cms\Component\Component` to get access to validation, macros, array-style access, and more.
