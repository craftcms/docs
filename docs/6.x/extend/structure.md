# Paths

In general, we recommend keeping your primary plugin class within a `src/` directory at the root of your package.

If you *must* use a different structure for your plugin package, define `basePath()` and/or `resourcesPath()` methods in your base plugin class so that Craft can locate your resources.

::: tip
Within your plugin’s `src/` directory, you are not obligated to use any particular structure.
While some conventions are similar, Laravel’s opinionated paths (i.e. `Listeners/` for auto-registered [event](events.md) handlers) are only relevant in the project’s space (`app/`), and have no bearing on plugins.
:::

## Class Organization

You are free to organize `src/` however you like, but we recommend following the conventions that Craft’s own code (and most Laravel packages) use: a PascalCase PSR-4 namespace (like `CraftCms\MyPlugin`), with classes grouped by what they _are_.
Craft groups by feature first, and by role within each feature.

| Kind of class | Location | Core example |
| --- | --- | --- |
| Plugin class and settings | `src/Plugin.php`, `src/Settings.php` | |
| Controllers | `src/Http/Controllers/` | `CraftCms\Cms\Http\Controllers\AddressesController` |
| Form requests | `src/Http/Requests/` | |
| Middleware | `src/Http/Middleware/` | |
| Events | `src/Events/` | `CraftCms\Cms\Section\Events\SectionSaved` |
| Listeners | `src/Listeners/` | |
| Data objects | `src/Data/` | `CraftCms\Cms\Section\Data\Section` |
| Eloquent models (formerly records) | `src/Models/` | `CraftCms\Cms\Section\Models\Section` |
| Enums | `src/Enums/` | `CraftCms\Cms\Section\Enums\SectionType` |
| Exceptions | `src/Exceptions/` | `CraftCms\Cms\Section\Exceptions\SectionNotFoundException` |
| Jobs, commands, policies | `src/Jobs/`, `src/Console/Commands/`, `src/Policies/` | |
| Services | A feature folder, with `#[Singleton]` classes | `CraftCms\Cms\Section\Sections` |

Larger plugins can nest these inside a feature folder (`src/Reporting/Events/`, `src/Reporting/Data/`).

When porting a Craft 5 plugin, this usually means moving classes out of Yii-style lowercase folders (`controllers/`, `models/`, `events/`, `services/`) as you port them.
Directory names are case-sensitive, so make sure each namespace matches its path exactly, and list every renamed class in your upgrade notes.

## Plugin Base Class

Craft needs to be able to locate your base class.
If you’ve named it something other than `Plugin.php` in your auto-loading root, you must define either `extra.class` _or_ use the standard Laravel [provider registration](laravel:packages#package-discovery):

```js
{
    // ...

    "extra": {
        "laravel": {
            "providers": [
                "MyOrg\\ActivityPlugin\\Activity"
            ]
        }
    }
}
```

## Resources

Plugin icons (`icon.svg` and `icon-mask.svg`) are expected to be in a new top-level `resources/` directory.
This is also typically where [static or publishable assets](assets.md) live; resources are *not* exposed in the web root, automatically.

## Routes

The new [route](http.md) registration files must be created in a top-level `routes/` directory.

## Migrations

[Migrations](migrations.md) now live in a top-level `database/migrations/` directory.
