# Installation

## Pre-Flight check

Before installing Craft Commerce, make sure your web server meets Commerce’s [minimum requirements](requirements.md).

## Plugin Store

Log into the control panel, navigate to **Plugin Store** and search for “Commerce”. Choose **Craft Commerce**, and from there you can choose **Add to Cart** or **Try** for either edition.

## Composer

Ensure that you have Composer [installed correctly](https://craftcms.com/docs/3.x/installation.html#downloading-with-composer) in your Craft 3 project. Then run the following terminal commands from within your Craft project:

```bash
composer require craftcms/commerce
php craft plugin/install commerce
```

::: tip
You may also want to copy the included [example templates](example-templates.md) into your project as a starting point, especially if you’re new to Commerce.
:::