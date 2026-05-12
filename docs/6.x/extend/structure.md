# Paths

In general, we recommend keeping your primary plugin class within a `src/` directory at the root of your package.

If you *must* use a different structure for your plugin package, define `basePath()` and/or `resourcesPath()` methods in your base plugin class so that Craft can locate your resources.

::: tip
Within your plugin’s `src/` directory, you are not obligated to use any particular structure.
While some conventions are similar, Laravel’s opinionated paths (i.e. `Listeners/` for auto-registered [event](events.md) handlers) are only relevant in the project’s space (`app/`), and have no bearing on plugins.
:::

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
