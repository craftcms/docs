# Required Changes

There are only a couple of things that you must do to get your plugin running in Craft 6.x.

## Adapter

Your plugin package should require `craftcms/yii2-adapter`:

```bash
composer require craftcms/yii2-adapter
```

Additional work may be required to eject the [adapter](adapter.md).

::: tip
The adapter is automatically installed by our [project upgrade tool](../upgrade.md), so it may _initially_ appear that your plugin works without it.
Similarly, the adapter will be active if _any_ Composer-installed plugin requires it!

To test adequately, remove the adapter and all other plugins from the host project and require it only in your plugin.
:::

## Signatures

The legacy base plugin class (`craft\base\Plugin`) and the interfaces in implements may require signature updates for some lower-level methods.

We have mainly observed this with the `attributes()` and `attributeLabels()` methods.
If you don’t use these, there’s nothing to do here.

## Paths

In general, we recommend keeping your primary plugin class within a `src/` directory at the root of your package.

Plugin icons (`icon.svg` and `icon-mask.svg`) are expected to be in a new top-level `resources/` directory.
This is also typically where [static or publishable assets](assets.md) live; resources are *not* exposed in the web root, automatically.

If you *must* use a different structure for your plugin package, define `basePath()` and/or `resourcesPath()` methods in your base plugin class so that Craft can locate your resources.
