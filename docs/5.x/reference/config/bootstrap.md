---
description: Reference
related:
  - uri: ../../configure.md
    label: Configuring Craft
---

# Bootstrap Variables

These variables can be set via your environment or as PHP constants in your [entry scripts](../../configure.md#entry-script). Read more about how to use bootstrap variables on the [configuration](../../configure.md#bootstrap-config) page.

<!-- more -->

<See path="../../configure" label="Configuring Craft" description="Learn about all the ways to customize Craft." />

## `CRAFT_BASE_PATH`

The path to the **base directory** that Craft will look for [config/](../../system/directory-structure.md#config), [templates/](../../system/directory-structure.md#templates), and other directories within by default. (It is assumed to be the parent of the `vendor/` folder by default.)

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

## `CRAFT_COMPOSER_PATH`

The path to the [composer.json](../../system/directory-structure.md#composer-json) file. (It is assumed to live within the base directory by default.)

```php
define('CRAFT_COMPOSER_PATH', 'path/to/composer.json');
```

## `CRAFT_CONFIG_PATH`

The path to the [config/](../../system/directory-structure.md#config) folder. (It is assumed to live within the base directory by default.)

## `CRAFT_CONTENT_MIGRATIONS_PATH`

The path to the [migrations/](../../system/directory-structure.md#migrations) folder used to store content migrations. (It is assumed to live within the base directory by default.)

## `CRAFT_CP`

Dictates whether the current request should be treated as a control panel request.

```php
// Tell Craft that this is a control panel request
define('CRAFT_CP', true);
```

If this isn’t defined, Craft will treat the request as a control panel request if either of these are true:

- The <config5:baseCpUrl> setting **is** set, and the request URL begins with it (plus the <config5:cpTrigger> setting, if set).
- The <config5:baseCpUrl> setting **is not** set, and the request URI begins with the <config5:cpTrigger> setting.

## `CRAFT_DOTENV_PATH`

Path to your project’s [`.env` file](../../system/directory-structure.md#env), including the filename. Defaults to `.env`, within [CRAFT_BASE_PATH](#craft-base-path).

## `CRAFT_EDITION`

Craft’s active edition is typically set via [project config](../../system/project-config.md), but you can override it for testing with a valid edition from <craft5:craft\enums\CmsEdition>.

::: warning
It is possible to enable Craft editions that are not allowed by your current license. This means that you may see warnings in the control panel on public domains.
:::

## `CRAFT_ENVIRONMENT`

The environment name that [multi-environment configs](../../configure.md#multi-environment-configs) can reference when defining their environment-specific config arrays.

## `CRAFT_EPHEMERAL`

When set to `true`, Craft will skip file system permission checks and operations that are not available in an environment with ephemeral or read-only storage.

## `CRAFT_LICENSE_KEY`

Your Craft license key, if for some reason that must be defined by PHP rather than a license key file. (Don’t set this until you have a valid license key.)

```php
// Tell Craft to get its license key from a `LICENSE_KEY` environment variable
define('CRAFT_LICENSE_KEY', craft\helpers\App::env('LICENSE_KEY'));
```

## `CRAFT_LICENSE_KEY_PATH`

The path that Craft should store its license key file, including its filename. (It will be stored as `license.key` within your [config/](../../system/directory-structure.md#config) folder by default.)

## `CRAFT_LOG_ALLOW_LINE_BREAKS`

Adjusts the default [log target config](../../system/logging.md#monolog) to allow or disallow multi-line log statements.

## `CRAFT_LOG_PHP_ERRORS`

Can be set to `false` to prevent Craft from setting PHP’s [log_errors](https://php.net/manual/en/errorfunc.configuration.php#ini.log-errors) and [error_log](https://php.net/manual/en/errorfunc.configuration.php#ini.error-log) settings, leaving it up to whatever’s set in `php.ini`.

```php
// Don’t send PHP error logs to storage/logs/phperrors.log
define('CRAFT_LOG_PHP_ERRORS', false);
```

## `CRAFT_SECRETS_PATH`

The path to a [secrets](../../configure.md#secrets) file, whose values are _not_ loaded into the environment.

```php
// Check the `secrets.php` file next to this script for sensitive values:
define('CRAFT_SITE', dirname(__DIR__) . 'secrets.php');
```

## `CRAFT_SITE`

The Site handle or ID that Craft should be serving from this `index.php` file. (Only set this if you have a good reason to. Craft will automatically serve the correct site by inspecting the requested URL, unless this is set.)

```php
// Show the German site
define('CRAFT_SITE', 'de');
```

## `CRAFT_STORAGE_PATH`

The path to the [storage/](../../system/directory-structure.md#storage) folder. (It is assumed to live within the base directory by default.)

::: tip
Make sure you set this to a valid folder path, otherwise it will be ignored.
:::

## `CRAFT_STREAM_LOG`

When set to `true`, Craft will send log output to `stderr` and `stdout`, instead of to log files. PHP fatal errors will be sent to `stderr`.

## `CRAFT_TEMPLATES_PATH`

The path to the [templates/](../../system/directory-structure.md#templates) folder. (It is assumed to live within the base directory by default.)

## `CRAFT_TRANSLATIONS_PATH`

The path to the `translations/` folder. (It is assumed to live within the base directory by default.)

## `CRAFT_VENDOR_PATH`

The path to the [vendor/](../../system/directory-structure.md#vendor) folder. (It is assumed to live 4 directories up from the bootstrap script by default.)

## `CRAFT_WEB_URL`

Automatically sets the `@web` [alias](../../configure.md#aliases). Platforms (like [DDEV](../../install.md)) can set this to ensure Craft is pre-configured with the correct public URL.

## `CRAFT_WEB_ROOT`

Automatically sets the `@webroot` [alias](../../configure.md#aliases), like [`CRAFT_WEB_URL`](#craft-web-url).
