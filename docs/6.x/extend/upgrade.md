# Required Changes

There are only a couple of things that you must do to get your plugin running in Craft 6.x.
Additional work may be required to eject the [adapter](adapter.md).

## Base Plugin Class

Plugins now extend `CraftCms\Cms\Plugin\Plugin`.

Many plugins will only need to update their settings model and rename the `init()` method to `bootPlugin()`. At this point, the plugin should be in a stable state from which you can gradually move [initialization logic](https://www.notion.so/Plugin-Developers-2e7c197f70b780ef948be26817442634?pvs=21) to the new architecture.

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

## Paths

In general, we recommend keeping your primary plugin class within a `src/` directory at the root of your package.

Plugin icons (`icon.svg` and `icon-mask.svg`) are expected to be in a new top-level `resources/` directory.
This is also typically where [static or publishable assets](assets.md) live; resources are *not* exposed in the web root, automatically.

If you *must* change the structure of your plugin package, override your plugin’s `basePath()` and `resourcesPath()` methods.
