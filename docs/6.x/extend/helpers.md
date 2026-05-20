# Helpers

Most of Craft’s static “helper” classes have moved to the `CraftCms\Cms\Support` namespace.

<!-- more -->

## Functions

A handful of helper functions are defined in `src/helpers.php`, at the top level of the `CraftCms\Cms` namespace.
These are mostly shortcuts for high-traffic features, like [rendering templates](templates.md) (`template()`), [translating strings](translation.md) (`t()`), or generating URLs (`cp_url()`, `site_url()`).

You are not obligated to use these helpers, but they provide a highly stable, public API that we hope will simplify and standardize common tasks.

## Facades

Laravel’s [Facades](laravel:facades#main-content) architecture is a handy way to define your plugin’s public API.
It also brings [dependency injection](laravel:facades#facades-vs-dependency-injection) support to a helper-like interface.

This facade wraps our `Manager` [service](services.md) class:

```php
namespace MyOrg\Activity\Support;

use Illuminate\Support\Facades\Facade;

class Events extends Facade
{
    #[\Override]
    protected static function getFacadeAccessor(): string
    {
        return \MyOrg\Activity\Reporting\Manager::class;
    }
}
```

Facades can then be used as a shortcut, in lieu of reaching for the service container:

```php
use MyOrg\Activity\Support\Events;

Events::track('pageView', ['elementId' => $entry->id]);

// This still works:
app(\MyOrg\Activity\Reporting\Manager::class)->track(
    'pageView',
    ['elementId' => $entry->id],
);
```

Either way, Laravel will make sure `#[Singleton]` service classes are reused.
