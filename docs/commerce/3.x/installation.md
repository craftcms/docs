# Installation

## Pre-flight check

Before installing Craft Commerce, make sure you’ve got everything you need:

- A web host that meets Commerce’s [minimum server requirements](requirements.md).
- Craft CMS 3.4 or later (see Craft’s [installation instructions](https://docs.craftcms.com/v3/installation.html) for details).

Craft Commerce can only be installed from the plugin store, or through Composer.

## Plugin Store

Log into the control panel, navigate to “Plugin Store”, then search for “Commerce”.

## Composer

Ensure that you have Composer [installed correctly](https://docs.craftcms.com/v3/installation.html#downloading-with-composer) in your Craft 3 project.

Run the following Composer command from within your Craft 3 project:

```bash
composer require craftcms/commerce
```

::: tip
Don’t forget to install Commerce after you’ve required it with Composer. You can do this from the control panel via Settings → Plugins, or using the `php craft install/plugin commerce` console command.
:::

## Example Templates

See the included [example templates](example-templates.md) to start learning how to use Commerce.
