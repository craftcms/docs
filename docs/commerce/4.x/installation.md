---
updatedVersion: 'commerce/5.x/install'
---

# Installation

## Pre-Flight check

Before installing Craft Commerce, make sure your web server meets Commerce’s [minimum requirements](requirements.md).

## Plugin Store

Log into the control panel, navigate to **Plugin Store** and search for “Commerce.” Choose **Craft Commerce**, then click **Try**, or copy the install command.

## Composer

To install via the CLI, run the following commands in an existing Craft 4 project:

```bash
composer require -w craftcms/commerce
php craft plugin/install commerce
```

If you are using DDEV, these shortcuts ensure the commands are run inside the appropriate container:

```bash
ddev composer require -w craftcms/commerce
ddev craft plugin/install commerce
```

::: tip
New to Commerce? Consider copying the included [example templates](example-templates.md) into your project as a starting point!
:::
