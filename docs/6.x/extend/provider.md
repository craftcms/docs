# Base Plugin Class

Plugins now extend `CraftCms\Cms\Plugin\Plugin`, and are Laravel [service providers](laravel:providers).

Many plugins will only need to update their [settings model](#settings) and rename the `init()` method to `boot()`.
At this point—with the adapter installed—your plugin should be in a stable state from which you can gradually move [initialization logic](avenues.md#initialization) to the new architecture.

You are not obligated to adopt `PascalCase` namespaces, but if you do (and your base class is named something other than `Plugin`, in your autoloading root), be sure and make the corresponding update to the `extra.class` property in `composer.json`:

```json{8}
{
  // ...
  "extra": {
    "handle": "_demo-plugin",
    "name": "Demo Plugin",
    "developer": "Pixel & Tonic",
    "documentationUrl": "https://github.com/craftcms/demo-plugin",
    "class": "CraftCms\\DemoPlugin\\Demo"
  }
}
```

In order to support the Craft plugin lifecycle (installation and uninstallation, as well as enabling and disabling), plugins live outside of Laravel’s [discovery](laravel:packages#package-discovery) system, so you do _not_ need to add the standard `extra.laravel.providers` entry to `composer.json`.

## Settings

When you change your plugin’s base class, its `createSettingsModel()` method signature will require that it return a `CraftCms\Cms\Validation\Contracts\Validatable` (or `null`) instead of a `craft\base\Model`.
We provide the abstract `CraftCms\Cms\Plugin\PluginSettings` class for you to extend, which retains much of the same [component](models.md#data-objects) functionality.

::: tip
Laravel tends to use *model* in the context of its Eloquent ORM.

`PluginSettings` aren’t part of that system, so we’ve opted to move our own plugins’ settings classes to the same directory as the base plugin class.
This is not mandatory!
:::

Read more about this in the [configuration and settings](config.md) section.

## Application Providers

The new starter project comes with a single `AppServiceProvider` class, which is registered via `bootstrap/providers.php`.

You can scaffold this yourself by adding an auto-loading root to `composer.json`…

```json
{
    // ...
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

…and creating the `app/Providers/` directory and a service provider class:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(Settings $settings): void {}
}
```

Make sure Laravel boots your provider by adding an entry to `bootstrap/providers.php`:

```php
use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,
];
```

`register()` and `boot()` will be called as the application boots.
Bare service providers do not have the same [declarative registration](avenues.md#initialization) features that you’ll see throughout the documentation; instead, you will need to directly bind the appropriate [events and listeners](events.md) or use a corresponding [registry](registries.md).
