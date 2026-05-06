# Base Plugin Class

Plugins now extend `CraftCms\Cms\Plugin\Plugin`, and are Laravel [service providers](laravel:providers).

Many plugins will only need to update their [settings model](#settings) and rename the `init()` method to `bootPlugin()`.
At this point, the plugin should be in a stable state from which you can gradually move [initialization logic](avenues.md#initialization) to the new architecture.

::: tip
After switching classes (and making the corresponding change in `composer.json`), you will need to run `ddev artisan package:discover` for Laravel to locate and cache the plugin’s root service provider.
:::

Your plugin’s `composer.json` file needs one new entry, `extra.laravel.providers`:

```json{9-13}
{
  // ...
  "extra": {
    "handle": "_demo-plugin",
    "name": "Demo Plugin",
    "developer": "Pixel & Tonic",
    "documentationUrl": "",
    "class": "CraftCms\\DemoPlugin\\Demo",
    "laravel": {
      "providers": [
        "CraftCms\\DemoPlugin\\Demo"
      ]
    }
  }
}
```

You are not required to adopt `PascalCase`.
This example reflects the change in convention in `extra.class`, as well—but the `class` field is only required if your base class is named something other than `Plugin`, in your autoloading root.

## Settings

When you change your plugin’s base class, its `createSettingsModel()` method signature will require that it return a `CraftCms\Cms\Validation\Contracts\Validatable` (or `null`) instead of a `craft\base\Model`.
We provide the abstract `CraftCms\Cms\Plugin\PluginSettings` class for you to extend.

::: tip
Laravel tends to use *model* in the context of its Eloquent ORM.

`PluginSettings` aren’t part of that system, so we’ve opted to move our own plugins’ settings classes to the same directory as the base plugin class.
This is not mandatory!
:::

Read more about this in the [configuration and settings](config.md) section.
