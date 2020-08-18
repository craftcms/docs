# Installation

## Pre-flight check

Before installing Craft Commerce, make sure you’ve got everything you need:

* A web host that meets Commerce’s [minimum server requirements](requirements.md).
* Craft CMS 3.0 or later (see Craft’s [installation instructions](https://craftcms.com/docs/3.x/installation.html) for details).

Craft Commerce can only be installed from the plugin store, or through Composer.

## Plugin Store

Log into your Control Panel and and click on “Plugin Store” then search for “Commerce”.

## Composer

Ensure that you have Composer [installed correctly](https://craftcms.com/docs/3.x/installation.html#downloading-with-composer) in your Craft 3 project.

Run the following Composer command from within your Craft 3 project:

```bash
composer require craftcms/commerce:"^2.0"
```

::: tip
Once installed via Composer don't forget to install the plugin in Craft itself via Settings → Plugins.
:::

## Example Templates

We provide [example templates](example-templates.md) to help get you started learning how to use Commerce.
