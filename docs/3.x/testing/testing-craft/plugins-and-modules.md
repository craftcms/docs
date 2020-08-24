# Testing Modules & Plugins

## Testing Modules

Setting up modules for testing is quite simple. Ensure that an `app.php` is present in your config directory. Once this file exists you’ll register your module exactly [how you would](../../extend/module-guide.md) for a normal Craft project. Once setup, modules will be loaded in your test suite and available via `MyModule::getInstance()`.

## Testing Plugins

Plugins must be registered via the `codeception.yml` file in accordance with the [configuration options](../framework/config-options.md#plugins). Once it’s registered the plugin will be installed and available via
`MyPlugin::getInstance()`.

::: tip
Unsure where to start with tests for your module or plugin? See the [setup guide](setup.md).
:::
