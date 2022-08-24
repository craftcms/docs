---
# This feature hasn't been merged yet--just stashing for later!
related:
  - uri: https://nystudio107.com/blog/fluent-multi-environment-config-for-craft-cms-4
    label: Fluent multi-environment config for Craft CMS
  - uri: /project-config
---

# Configuring Craft

Craft can be configured to work in a way that makes sense for you, your team, and your infrastructure.

Broadly, configuration refers to how Craft will behave in a particular environment. Most applications will only require [database connection information](db.md) to work, but as you get familiar with more of Craft's features, install plugins, or start using additional services, you may need to provide additional config.

We'll start by looking at how Craft assembles its config in a context-aware way, then move through some specific options.

::: tip
[Project Config](/project-config) is a discrete concept, but was designed to integrate with the lower-level config system. You'll see some examples in a moment!
:::

## Where Configuration Happens

The most common way to customize your Craft project is by editing files in the [`config/` folder](../directory-structure.md).

| Concern | File Name(s) | Description
| ------- | -------- | -----------
| [General Configuration](#general) | `general.php` | Global options that can affect the front-end, control panel, debugging, etc.
| [Database Settings](#database) | `db.php` | Connection settings for your database.
| [Custom Options](#custom-settings) | `db.php` | Connection settings for your database.
| [Routing](#url-rules) | `routes.php` | Custom HTTP routes.
| [Application Configuration](#application-configuration) | `app.php`, `app.web.php`, `app.console.php` | Overrides for the root Application and any of its [Components](https://www.yiiframework.com/doc/guide/2.0/en/concept-components).
| Plugin Settings | `{plugin-handle}.php`, or other custom files | Consult the plugin's documentation for specifics.
| Advanced | | Specific library options and/or behaviors that may be exposed in a non-standard way.

::: tip
You may find other files in the `config/` folder, like `license.key` or the `project/` folder. Craft (and many plugins) may ask you to place config-adjacent files here, even if they don't work in a consistent way.
:::

Sensitive credentials like your database's password should be kept out of tracked files—but instead of ignoring config files outright, let's take a look at our options.

## Setting, Resolving, and Accessing Options

Each setting accepts specific types and values (like an integer, interval expression string, or boolean), but Craft is able to resolve them in a few different ways:

- **Static:** A scalar value is explicitly set in a config file, and is the same for all environments.
- **Environment-dependent:** Specific values are set for [different known environments](#multi-environment-configs), like `dev` and `production`.
- **Dynamic:** A value is determined either by a call to `craft\helpers\App::env('MY_ENVIRONMENT_VAR')` (using a key that you expect to be defined in all target environments), or by using an [alias](#aliases) that is resolved at runtime.

You can combine these methods to create flexibility where you need it and rigidity where you don't. Let's look at some other ways values are resolved.

::: tip
When working on a team or deploying your project in a new environment, it ought to be easy to discover what Craft options were configured to make the site or application work as intended. While some of the following strategies are convenient, consider their impacts on clarity.
:::

### Priority

Craft will begin resolving values in this order, increasing in specificity:

0. **Defaults:** Every option has a default value, even if it’s `null`. Those values are provided in the documentation for each setting.
1. **Config Files:** Craft [evaluates and merges](#multi-environment-configs) PHP config files.
2. **Magic Environment Variables:** For general and database settings, Craft looks for [special environment variables](#config-environment-variables).

This allows you to set 

### Style: Map vs. Fluent

At its simplest, a config file might only return a map of settings:

```php
use craft\helpers\App;

return [
    'devMode' => App::env('CRAFT_ENVIRONMENT') === 'dev',
    'userSessionDuration' => 'P1D',
];
```

If you are interested in auto-completion and type hints from your editor, the equivalent "fluent" style declaration <Since ver="4.2" feature="Fluent config" /> would look like this:

```php
use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    ->devMode(App::env('CRAFT_ENVIRONMENT') === 'dev')
    ->userSessionDuration('P1D');
```

Each option becomes a method call, returning the modified config object to support chaining. You can dynamically set values with an in-line expression or by breaking the chain into logical chunks:

```php{5,8-10}
use craft\config\GeneralConfig;
use craft\helpers\App;

$config = GeneralConfig::create()
    ->devMode(false)
    ->userSessionDuration('P1D');

if (App::env('CRAFT_ENVIRONMENT') === 'dev') {
    $config->devMode(true);
}

return $config;
```

::: warning
Fluent config is currently only available for general and database settings, and not all plugins support it. When in doubt, use a config map!
:::

### Multi-Environment Configs

Craft’s PHP config files can supply separate config settings for each environment by declaring a `*` key at the top-level of the returned array.

Options in the splat apply to all environments, and additional options nested within a key matching the [`CRAFT_ENVIRONMENT`](#craft-environment) PHP constant or environment variable are merged on top of it. This also means that you can use `*` to set up your own "defaults," while still being able to override them in a specific environment.

```php
// -- config/general.php --
return [
    // Activate multi-environment config:
    '*' => [
        // Applies to all environments:
        'omitScriptNameInUrls' => true,
    ],

    'dev' => [
        // Only applies to development environments, overriding anything in `*`:
        'devMode' => true,
    ],

    'production' => [
        // Only applies to the production environment, overriding anything in `*`:
        'cpTrigger' => 'secret-word',
    ],
];
```

Presuming your environment was evaluated to `dev`, Craft would compile a config object equivalent to:

```php
return [
    'omitScriptNameInUrls' => true,
    'devMode' => true,
];
```

::: tip
Make sure your key(s) are sufficiently unique! Craft reads your array of config settings from top to bottom, applying config settings wherever the `CRAFT_ENVIRONMENT` value *contains* the key.

If the environment cannot be determined, your server’s hostname will be used.
:::

### Accessing Configured Values

If you need to check a setting in your templates or module, everything is available via the `Config` service. For example, if you wanted to switch some debugging information on or off, you could do the following:

::: code
```twig
{# Output entry ID for debugging: #}
{% if craft.app.config.general.devMode %}
  ID: <code>{{ entry.id }}</code>
{% endif %}
```
```php
// Add `DevMode` header when active:
if (Craft::$app->config->general->devMode) {
  Craft::$app->request->headers->set('DevMode', 'On');
}
```
:::

## Categories

To make config settings easier to find, they're organized into a few groups.

### General

[General config settings](config-settings.md) are set via the `config/general.php` file or special environment variables.

### Database

Your [database connection settings](db.md) are set via the `config/db.php` file.

### URL Rules

You can define custom [URL rules](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) in `config/routes.php`. See [Routing](../routing.md) for more details.

### Application

Some systems may require customization of Craft [application components](app.md) beyond what is exposed through specific config files. This is done directly via the `config/app.php` file.

### Custom Settings

Settings defined in a `config/custom.php` file don't map to or affect any built-in features, but can useful to centralize data, flags, or secrets that otherwise don't have a place to live.

```php
return [
    'serviceBaseUrl' => 'https://api.service.com/v1',
    'servicePublishableKey' => App::env('SERVICE_PUBLISHABLE_KEY'),
    'servicePrivateKey' => App::env('SERVICE_PRIVATE_KEY'),
];
```

Custom settings also support the multi-environment structure, so you can use the resolved values in a predictable way in any context:

::: code
```twig
{% set publishableKey = craft.app.config.custom.servicePublishableKey %}
```
```php
$privateKey = Craft::$app->config->custom->servicePrivateKey;
```
:::

::: tip
If these settings need to be changed frequently, or don't depend on the environment, they may be a better fit for a [Global Set](../globals.md).
:::

## Aliases

Some settings and functions in Craft support [Yii aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases), which are basically placeholders for base file system paths and URLs. These include:

- Sites’ Base URL settings
- Volumes’ Base URL settings
- Local volumes’ File System Path settings
- The <config4:resourceBasePath> and <config4:resourceBaseUrl> config settings
- The [svg()](../dev/functions.md#svg-svg-sanitize) Twig function

The following aliases are available out of the box:

| Alias | Description
| ----- | -----------
| `@app` | The path to `vendor/craftcms/cms/src/`
| `@config` | The path to your `config/` folder
| `@contentMigrations` | The path to your `migrations/` folder
| `@craft` | The path to `vendor/craftcms/cms/src/`
| `@lib` | The path to `vendor/craftcms/cms/lib/`
| `@root` | The root project path (same as the [CRAFT_BASE_PATH](#craft-base-path) PHP constant)
| `@runtime` | The path to your `storage/runtime/` folder
| `@storage` | The path to your `storage/` folder
| `@templates` | The path to your `templates/` folder
| `@translations` | The path to your `translations/` folder
| `@vendor` | The path to your `vendor/` folder
| `@web` | The URL to the folder that contains the `index.php` file that was loaded for the request
| `@webroot` | The path to the folder that contains the `index.php` file that was loaded for the request

You can override these default aliases with the <config4:aliases> config setting if needed. 

::: tip
We recommend overriding the `@web` alias if you plan on using it, to avoid a cache poisoning vulnerability.
:::

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
];
```

If your web root is something besides `web/`, `public/`, `public_html/`, or `html/`, or it’s not located alongside your `craft` executable, you will also need to override the `@webroot` alias, so it can be defined properly for console commands.

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
];
```

You can define additional custom aliases using the <config4:aliases> config setting as well. For example, you may wish to create aliases that define the base URL and base path that your asset volumes will live in.

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

With those in place, you could begin your asset volumes’ Base URL and File System Path settings with them, e.g. `@assetBaseUrl/user-photos` and `@assetBasePath/user-photos`.

If you’d like, you can set the alias values with environment variables, either from your `.env` file or somewhere in your environment’s configuration:

```bash
ASSETS_BASE_URL=https://my-project.tld/assets
ASSETS_BASE_PATH=/path/to/webroot/assets
```

Then you can pull them into the alias definitions using [App::env()](craft4:craft\helpers\App::env()):

```php
'aliases' => [
    '@assetBaseUrl' => craft\helpers\App::env('ASSETS_BASE_URL'),
    '@assetBasePath' => craft\helpers\App::env('ASSETS_BASE_PATH'),
],
```

::: tip
When referencing aliases in your settings, you can append additional segments onto the URL or path. For example, you can set a volume’s base URL to `@assetBaseUrl/user-photos`.
:::

::: tip
You can parse aliases in your templates by passing them to the [alias()](../dev/functions.html#alias-string) function:

```twig
{{ alias('@assetBaseUrl') }}
```
:::

::: tip
You can parse aliases in your modules or configs by passing them to the [getAlias()](yii2:yii\BaseYii::getAlias()) function:

```php
Craft::getAlias('@webroot');
```
:::

## Environmental Configuration

Some settings should be defined on a per-environment basis. For example, when developing locally, you may want your site’s base URL to be `http://my-project.test`, but on production it should be `https://my-project.com`.

### Control Panel Settings

Some settings in the control panel can be set to environment variables (like the ones defined in your `.env` file):

- General Settings
  - **System Name**
  - **System Status**
  - **Time Zone**
- Sites
  - **Base URL**
- Sections
  - **Preview Target URIs**
- Asset Volumes
  - **Base URL**
  - **File System Path** (Local)
- Email
  - **System Email Address**
  - **Sender Name**
  - **HTML Email Template**
  - **Username** (Gmail and SMTP)
  - **Password** (Gmail and SMTP)
  - **Hostname** (SMTP)
  - **Port** (SMTP)
  - **Use authentication** (SMTP)
  - **Encryption Method** (SMTP)

To set these settings to an environment variable, type `$` followed by the environment variable’s name.

![A site’s Base URL setting](../images/site-base-url-setting.png)

Only the environment variable’s name will be stored in your database or project config, so this is a great way to set setting values that may change per-environment, or contain sensitive information.

::: tip
Plugins can add support for environment variables and aliases in their settings as well. See [Environmental Settings](../extend/environmental-settings.md) to learn how.
:::

#### Using Aliases in Control Panel Settings

Some of these settings—the ones that store a URL or a file system path—can also be set to [aliases](README.md#aliases), which is helpful if you just want to store a base URL or path in an environment variable, and append additional segments onto it.

For example, you can define a `ROOT_URL` environment variable that is set to the root URL of your site:

```bash
# -- .env --
ROOT_URL="http://my-project.tld"
```
Then create a `@rootUrl` alias that references it:

```php
// -- config/general.php --
'aliases' => [
    '@rootUrl' => craft\helpers\App::env('ROOT_URL'),
],
```

Then you could go into your User Photos volume’s settings (for example) and set its Base URL to `@rootUrl/images/user-photos`.

### Config Environment Variables

Craft’s [general config settings](config-settings.md) and [database connection settings](db.md) can be defined exclusively by environment variables using a `CRAFT_` or `CRAFT_DB_` prefix respectively.

Combine the prefix with the config setting in [screaming snake case](https://dev.to/fission/screaming-snake-case-43kj). The <config4:allowUpdates> setting, for example, would be `CRAFT_ALLOW_UPDATES`. The database [port](db.md#port) setting would be `CRAFT_DB_PORT`.

::: tip
If you are working with others and your `.env` isn't checked in to version control (it probably shouldn't be!), make sure you have a way of communicating what options are required to get your application running! A `.env.example` file is a great place to store keys + comments, without exposing secrets—and it lets you simply copy the file when spinning up a new environment.
:::

## PHP Constants

You can define certain PHP constants that Craft will take into account as it boots up. Depending on your installation, you may keep these in `web/index.php` and the `craft` executable, or consolidate common values into a single file, as the [composter starter project](https://github.com/craftcms/craft) does.

::: tip
Constants you set in `web/index.php` will be used for web-based requests, while any you set in your root `craft` file will be used for console requests.
:::

### `CRAFT_BASE_PATH`

The path to the **base directory** that Craft will look for [config/](../directory-structure.md#config), [templates/](../directory-structure.md#templates), and other directories within by default. (It is assumed to be the parent of the `vendor/` folder by default.)

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

### `CRAFT_COMPOSER_PATH`

The path to the [composer.json](../directory-structure.md#composer-json) file. (It is assumed to live within the base directory by default.)

```php
define('CRAFT_COMPOSER_PATH', 'path/to/composer.json');
```

### `CRAFT_CONFIG_PATH`

The path to the [config/](../directory-structure.md#config) folder. (It is assumed to live within the base directory by default.)

### `CRAFT_CONTENT_MIGRATIONS_PATH`

The path to the [migrations/](../directory-structure.md#migrations) folder used to store content migrations. (It is assumed to live within the base directory by default.)

### `CRAFT_CP`

Dictates whether the current request should be treated as a control panel request.

```php
// Tell Craft that this is a control panel request
define('CRAFT_CP', true);
```

If this isn’t defined, Craft will treat the request as a control panel request if either of these are true:

- The <config4:baseCpUrl> setting **is** set, and the request URL begins with it (plus the <config4:cpTrigger> setting, if set).
- The <config4:baseCpUrl> setting **is not** set, and the request URI begins with the <config4:cpTrigger> setting.

### `CRAFT_ENVIRONMENT`

The environment name that [multi-environment configs](../config/README.md#multi-environment-configs) can reference when defining their environment-specific config arrays.

::: warning
Prior to Craft 4, `craftcms/craft` projects had `CRAFT_ENVIRONMENT` fall back to a value of `production` by default. This is no longer the case, as the default is [explicitly set to `dev`](https://github.com/craftcms/craft/blob/main/.env.example#L5).
:::

### `CRAFT_EPHEMERAL`

When set to `true`, Craft will skip file system permission checks and operations that are not available in an environment with ephemeral or read-only storage.

### `CRAFT_LICENSE_KEY`

Your Craft license key, if for some reason that must be defined by PHP rather than a license key file. (Don’t set this until you have a valid license key.)

```php
// Tell Craft to get its license key from a `LICENSE_KEY` environment variable
define('CRAFT_LICENSE_KEY', craft\helpers\App::env('LICENSE_KEY'));
```

### `CRAFT_LICENSE_KEY_PATH`

The path that Craft should store its license key file, including its file name. (It will be stored as `license.key` within your [config/](../directory-structure.md#config) folder by default.)

### `CRAFT_LOG_PHP_ERRORS`

Can be set to `false` to prevent Craft from setting PHP’s [log_errors](https://php.net/manual/en/errorfunc.configuration.php#ini.log-errors) and [error_log](https://php.net/manual/en/errorfunc.configuration.php#ini.error-log) settings, leaving it up to whatever’s set in `php.ini`.

```php
// Don’t send PHP error logs to storage/logs/phperrors.log
define('CRAFT_LOG_PHP_ERRORS', false);
```

### `CRAFT_SITE`

The Site handle or ID that Craft should be serving from this `index.php` file. (Only set this if you have a good reason to. Craft will automatically serve the correct site by inspecting the requested URL, unless this is set.)

```php
// Show the German site
define('CRAFT_SITE', 'de');
```

### `CRAFT_STORAGE_PATH`

The path to the [storage/](../directory-structure.md#storage) folder. (It is assumed to live within the base directory by default.)

::: tip
Make sure you set this to a valid folder path, otherwise it will be ignored.
:::

### `CRAFT_STREAM_LOG`

When set to `true`, Craft will send log output to `stderr` and `stdout`, instead of to log files. PHP fatal errors will be sent to `stderr`.

### `CRAFT_TEMPLATES_PATH`

The path to the [templates/](../directory-structure.md#templates) folder. (It is assumed to live within the base directory by default.)

### `CRAFT_TRANSLATIONS_PATH`

The path to the `translations/` folder. (It is assumed to live within the base directory by default.)

### `CRAFT_VENDOR_PATH`

The path to the [vendor/](../directory-structure.md#vendor) folder. (It is assumed to live 4 directories up from the bootstrap script by default.)

## Advanced Options

### Guzzle

Craft uses [Guzzle](http://docs.guzzlephp.org/en/latest/) whenever creating HTTP requests, such as:

- when checking for Craft updates
- when sending in a support request from the Craft Support widget
- when loading RSS feeds from the Feeds widget
- when working with assets on remote volumes, like Amazon S3

You can customize the config settings Guzzle uses when sending these requests by creating a `guzzle.php` file in your `config/` folder. The file does not support Craft’s [multi-environment configuration](#environmental-configuration) and should return an array, with your config overrides.

```php
return [
    'headers' => ['Foo' => 'Bar'],
    'query'   => ['testing' => '123'],
    'auth'    => ['username', 'password'],
    'proxy'   => 'https://myproxy:1234',
];
```

The options defined here will be passed into new `GuzzleHttp\Client` instances. See [Guzzle’s documentation](http://docs.guzzlephp.org/en/latest/) for a list of available options.


### Mutex Configuration

Craft uses a file-based mutex driver by default, which should be switched to a different driver in [load-balanced environments](https://craftcms.com/knowledge-base/configuring-load-balanced-environments#mutex-locks).

::: tip
A [NullMutex](craft4:craft\mutex\NullMutex) driver is used when Dev Mode is enabled, since mutex drivers aren’t necessary for local development and we’ve seen issues with mutex in some Windows and Linux filesystems.
:::

You can configure a custom mutex driver by configuring the `mutex` component’s nested `$mutex` property:

```php
// Use mutex driver provided by yii2-redis
return [
    'components' => [
        'mutex' => [
            'mutex' => 'yii\redis\Mutex',
        ],
    ],
];
```

Notice we’re modifying the _nested_ `mutex` property and leaving the main `mutex` component in place.
