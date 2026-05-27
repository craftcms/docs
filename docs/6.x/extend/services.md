---
description: Services are the heart of your extension.
---

# Services

::: tip
This section discusses one of the headiest *conceptual* changes in Craft 6.x, but requires very few *practical* changes to your codebase or architecture!
:::

Services have been a staple of Craft and its plugin ecosystem from the beginning.
For most plugins, services *are* the API, and they were carefully grouped by, bound to, and accessed through “modules.”
This has taken basically two forms, over time:

```php
# Craft 2.x — instances available via Craft:
craft()->activityPlugin_reportsService->generate(...);

# Craft 3.x–5.x — singletons available via plugin:
Activity::getInstance()->getReports()->generate(...);
```

In Craft 6.x, “services” are nothing more than auto-loadable PHP classes.
Most should be marked with the `Singleton` attribute to help Laravel’s service container reuse instances:

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

Services don’t need to extend any other classes, implement any interfaces, or use any traits… but [components](#components) are still a great starting place.

## Resolving a Service

Craft’s internal structure and inheritance model has been radically flattened by adopting this pattern.
It also means that you don’t need to resolve every API through a central instance—in fact, you may find that you’re rarely reaching for the service locator, thanks to dependency injection.
Revisiting our controller example, from earlier:

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

At no point in our method bodies do we need to manually “get” services from Craft (or even our own plugin), because Laravel could infer them based on the signature of the controller’s `handle()` method when it is invoked.

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

In this example, the `fork()` method has two arguments (`$original` and `$creator`), and an automatic dependency (`$elements`).

Outside a DI-capable context, you can always access Craft’s services via the `app()` container:

```php
app(\CraftCms\Cms\ProjectConfig\ProjectConfig)->get('graphql.enabled');
```

We provide facades for many of our services: in this case, `CraftCms\Cms\Support\Facades\ProjectConfig::get('graphql.enabled')`.

::: warning
You should never directly instantiate your services, especially those marked `#[Singleton]`.
The first time it is resolved through the container, Laravel will create an instance for you.
:::

## Organization

The structure of your services remains entirely up to you.
To start, though, we recommend doing a strict horizontal port of your service classes; if you are compelled to rearrange after the port, Craft’s new codebase is a buffet of fun examples.

Here are a couple patterns that might apply:

### Atomization

We used the opportunity to refactor a number of Craft’s core features—as an example, the garbage collection service (`Gc`) was reduced in size roughly 80% by splitting it into [a number of bite-size invokable “action” classes](https://github.com/craftcms/cms/tree/6.x/src/GarbageCollection/Actions) that all still have access to the main service (and any additional services it might need) via dependency injection.

These action classes can then be called from HTTP or console requests—or even be treated as [queueable jobs](laravel:queues#class-structure) so they can be deferred!

### Registration

Another prime candidate for refactoring are methods that exist solely to define configuration or list features.
In Craft 5.x, there was no event to directly register a [global variable in Twig](templates.md#globals); in fact, all the logic for determining what global variables were available was contained in the `Extension` class itself.
For Craft 6.x, we extracted this into `CraftCms\Cms\View\TemplateGlobals`, which has a single `resolve()` with the legacy variable-gathering logic, plus an event emitter.
When resolved via `app()`, its constructor receives dependencies which are then used in `resolve()` to assemble the array.

Now, we can test this in isolation, share between [Twig and Blade environments](templates.md#blade), get a list of variables without instantiating Twig, or split up variables into categories without polluting one of our extensions.
The same pattern could be applied to widgets (`CraftCms\Cms\Dashboard\Dashboard::getAllWidgetTypes()`), elements (`\CraftCms\Cms\Element\Elements::getAllElementTypes()`), or utilities (`CraftCms\Cms\Utility\Utilities::getAllUtilityTypes()`).

## Components

To make the transition a bit easier, we’ve brought along some of Yii’s “component” features that were upstream of Craft services.
Your services (and other data models) can extend `CraftCms\Cms\Component\Component` to get access to [validation](validation.md), macros, array-style access, and more.

### Configuration

Laravel is broadly less config-driven than Yii.
Services can be instantiated from anywhere (and at any time), so it’s expected that they know how to resolve their configuration, internally (usually by grabbing values with `config(...)` at runtime).
As a result of flattening the application’s overall architecture, Yii’s [application configuration](guide:structure-applications#application-configurations) is no longer relevant—there is no centrally-defined component “tree” to initialize from config.

Components bridge this gap by accepting a “configuration” array in their constructors, which is mapped and typecast onto its public properties.
In many cases, we have elected to replace this top-down pattern with a combination of other strategies:

- Initialize with defaults that draw from general config settings and other `config(...)` calls;
- Provide methods to dynamically or temporarily reconfigure a service for the duration of a closure;

You may have already been exposed to the second strategy when rendering templates, in earlier versions of Craft:

```php
use CraftCms\Cms\View\TemplateMode;

TemplateMode::with(TemplateMode::Site, function () {
    // ...
});

// Previously: Craft::$app->getView()->renderTemplate(sprintf('forms/%s', $form->handle), View::TEMPLATE_MODE_SITE);
```

## Plugin Getters

Because your services are all accessible by their class names, plugins no longer need to call `setComponents([])`, or implement “getter” methods.
As a result, most calls to `Plugin::getInstance()` will be unnecessary (except for calling methods on the class itself).
