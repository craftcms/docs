# Required Changes

There are only a couple of things that you must do to get your plugin running in Craft 6.x.

## Adapter

To initialize properly in a Laravel project, your plugin package must require `craftcms/yii2-adapter`:

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

<Block label="Wait… is that it?">

Basically, _yes_!

The rest of this guide is focused on extension points that need your attention in order to eject the [adapter](adapter.md), which is _not_ a requirement for Craft 6.x.
You are free to tackle as much (or as little) of it as you wish, for the public release.

We want to stress: _using the adapter is an official, supported way to release 6.x-compatible plugin_—and it will remain part of many developers’ toolkit (and the Craft ecosystem) _at least_ as long as 6.x receives updates.

While the changes above must happen _before_ any other work, reducing or eliminating dependence on the adapter can be relatively fluid.

</Block>
