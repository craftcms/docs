---
title: Configuration
description: Set up Craft to work with your team and infrastructure.
sidebarDepth: 2
related:
  - uri: https://nystudio107.com/blog/fluent-multi-environment-config-for-craft-cms-4
    label: Fluent multi-environment config for Craft CMS
  - uri: ./system/project-config.md
---

# Configuring Craft

Craft can be configured to work in a way that makes sense for you, your team, and your infrastructure.

<!-- more -->

Broadly, configuration refers to how Craft will behave in a particular environment. Most applications will only require [database connection information](#database) to work, but as you get familiar with more of Craft’s features, install plugins, or start using additional services, you may need to provide additional config.

We’ll start by looking at how Craft builds its config in a context-aware way, then get into some specific options. Keep in mind that—unlike most aspects of a Craft project—this will require some basic PHP knowledge.

::: tip
[Project config](system/project-config.md) is a discrete concept, but was designed to integrate with the core config system. We’ll look at some examples in just a moment.
:::

## Where Configuration Happens

### Config Files

The most common way to customize your Craft project is by editing files in the [`config/` folder](system/directory-structure.md). These files act as a canonical map of what customizations you’ve made to a project, and as a bridge between specific settings and [environment variables](#setting-and-resolving-options).

| Concern | File(s) | Description
| ------- | -------- | -----------
| [General Configuration](#general) | `general.php` | Global options that can affect the front-end, control panel, debugging, etc.
| [Database Settings](#database) | `db.php` | Connection settings for your database.
| [Custom Options](#custom-settings) | `custom.php` | Arbitrary key-value storage for your own options.
| [Routing](#url-rules) | `routes.php`, `redirects.php` | Custom HTTP routes and redirect rules.
| [Application Configuration](#application-configuration) | `app.php`, `app.web.php`, `app.console.php` | Overrides for the root application and any of its [Components](https://www.yiiframework.com/doc/guide/2.0/en/concept-components).
| Plugin Settings | `{plugin-handle}.php`, or other custom files | Consult the plugin’s documentation for specifics.
| [Advanced](#advanced) | | Specific library options and/or behaviors that may be exposed in a non-standard way.

::: tip
You may find other files in the `config/` folder, like `license.key` or the `project/` folder. Craft (and many plugins) will ask you to place config-adjacent files here, even if they don’t work in a consistent way.
:::

Sensitive credentials like your database’s password should be kept out of tracked files—but instead of ignoring config files outright, let’s take a look at some options.

### `.env`

New [Craft projects](https://github.com/craftcms/craft) use [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv) to load values into the environment from a `.env` file in the root of your project. A basic `.env` file contains pairs of keys and values:

```env
CRAFT_APP_ID=my-project
CRAFT_ENVIRONMENT=dev

# ...and comments!
```

These values can be referenced in your config files by calling [App::env()](craft5:craft\helpers\App::env()), or using them directly in a [control panel setting](#control-panel-settings). Use of PHP’s `getenv()` directly is discouraged, due to [issues with thread-safety](https://github.com/craftcms/cms/issues/3631). The equivalent [`getenv()` Twig function](reference/twig/functions.md#getenv) uses `App::env()`, and is therefore fine to use in templates.

Craft doesn’t require your variables to follow any kind of naming convention, but it will automatically discover [some specific environment variables](#environment-overrides) for general and database settings.

For most installations, the `.env` file is the only place where secrets should be stored. Avoid checking it in to version control!

::: tip
Some platforms (especially those with ephemeral filesystems, like [Craft Cloud](https://craftcms.com/cloud)) provide a GUI for managing environment variables in lieu of using a `.env` file, and will automatically inject them when the server or process starts. `App::env()` is still the recommended method for retrieving environment variables set in this way.
:::

#### Nested Variables

In your `.env` file, one variable can reference another:

```bash
BASE_HOSTNAME="acmelabs.com"
PRIMARY_SITE_URL="https://${BASE_HOSTNAME}"
GLOBAL_SITE_URL="https://global.${BASE_HOSTNAME}"
```

Depending on your infrastructure, this may also be possible at other points in process of loading environment variables. The example above works thanks to `vlucas/phpdotenv`; Docker (and therefore DDEV) share this general syntax, but not all variables are available at each step as the container boots up—so interpolation is best left until this last stage. Earlier layers may allow interpolation to be escaped so that it is only evaluated by a later one:

```bash
# Here, we escape the beginning interpolation token with a backslash (\):
BASE_API_HOSTNAME="api.\${DDEV_HOSTNAME}"
```

Craft does not know or indicate when substitutions have occurred—it only sees the final, fully-resolved values.

::: warning
Variables with substitutions will only be written back into the environment when using one of the [mutable loaders](https://github.com/vlucas/phpdotenv?tab=readme-ov-file#immutability-and-repository-customization).
:::

### Entry Script

Craft will also respond to a handful of [specific environment variables or PHP constants](#bootstrap-config), as long as they are set prior to bootstrapping the application in your entry script. The [starter project](repo:craftcms/craft) shares a `bootstrap.php` file between `web/index.php` and the `craft` executable to consolidate the definition of constants.

### Secrets

You can store sensitive values that won’t leak into the process’s environment in a special “secrets” file. The path to this file is determined by the [`CRAFT_SECRETS_PATH` environment variable or constant](#craft_secrets_path). When defined, Craft will attempt to include a file at that path (presumed to be a PHP script that `return`s an associative array), and checks it prior to resolving any environment variable or constant with <craft5:craft\helpers\App::env()>.

```php
return [
    'SUPER_SECRET_KEY' => '...',
];
```

::: warning
Even though secrets aren’t automatically loaded into the environment on every request, they can still be accessed via application helpers, Twig templates (like system messages), other PHP scripts, or anyone with direct filesystem access.

This is only recommended in situations where environment variable exfiltration is among the last attack surfaces. If your server supports any form of remote access (say, via SSH), this is _not_ a practical security measure!
:::

## Setting and Resolving Options

Each setting accepts specific [types and values](#types-and-values) (like an integer, interval expression string, or boolean), but Craft can resolve them in two ways:

- **Statically:** A value is set explicitly in a config file, and is the same in all environments. Example: Customizing file types that can be uploaded.
- **Dynamically:** Values are only known at runtime, or are set conditionally based on the current environment. Typically, this will involve a call to [App::env()](craft5:craft\helpers\App::env()) using the name of an environment variable that is expected to exist—or whose absence is significant. Example: Dev mode, database connection details, or a storage bucket URL.

### Priority

Craft takes the first discovered value, in this order:

0. **Environment Overrides:** For general and database settings, Craft looks for special [environment variables](#environment-overrides) and [PHP constants](#php-constants).
1. **Config Files:** Craft evaluates and merges [multi-environment](#multi-environment-configs) and [application type](#application-types) PHP config files.
2. **Defaults:** Every option has a default value, even if it’s `null`. You can find these defaults in the documentation for each setting.

### Style

At its simplest, a config file returns a key-value map of settings:

```php
use craft\helpers\App;

return [
    'devMode' => App::env('DEV_MODE') ?? false,
    'userSessionDuration' => 'P1D',
];
```

If you are interested in auto-completion and type hints from your editor, the equivalent “fluent” style declaration would look like this:

```php
use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    ->devMode(App::env('DEV_MODE') ?? false)
    ->userSessionDuration('P1D');
```

Each option becomes a method call, accepting the same [values](#types-and-values) that you would provide in a config map. The configuration object is returned to allow chaining.

::: warning
Fluent config is currently available for _general_ and _database_ settings, but unsupported in plugins, [custom](#custom-settings) config files, and [application config](#application-configuration). When in doubt, use a config map!
:::

Config files can also return a closure that accepts a single `$config` argument and returns a config object. <Since ver="5.3.0" feature="Closures in config files" />

```php
// config/general.php

use craft\config\GeneralConfig;

return function(GeneralConfig $config) {
    return $config
        ->aliases([
            '@webroot' => dirname(__DIR__) . '/web',
        ])
        // ...
    ;
};
```

Craft will always pass an instance of <craft5:craft\config\GeneralConfig> or <craft5:craft\config\DbConfig> to a closure in the primary general or database config files, respectively—but [application type-specific files](#application-types) should accept whatever the _primary_ file returns:

::: code
```php general.php
return [
    'aliases' => [
        '@webroot' => dirname(__DIR__) . '/web',
    ],
];
```
```php general.console.php
return function(array $config) {
    $config['aliases']['@web'] = App::env('CLI_WEB_URL');

    return $config;
};
```
:::

There is no equivalent to `GeneralConfig` and `DbConfig` for [application](#application-configuration). If you return an array from the primary file, there is limited value in using a closure in an application type-specific file.

::: tip
The `GeneralConfig` class has a special `addAlias()` method that allows you to merge additional aliases, when using closures _and_ fluent config.
:::

### Application Types <Since ver="5.3.0" feature="Application type-specific config files" />

Craft has two primary application types—_web_ and _console_. Web requests are typically initiated by an HTTP server via `index.php`; console requests are initiated from the `craft` executable, on the command line.

You can provide configuration that targets a specific application type by creating additional general, database, or application configuration files with the appropriate suffix:

<div class="croker-table">

Category | File | Application Type
--- | --- | ---
[General](#general) | `general.php` | All
&nbsp; | `general.web.php` | Web only
&nbsp; | `general.console.php` | Console only
[Database](#database) | `db.php` | All
&nbsp; | `db.web.php` | Web only
&nbsp; | `db.console.php` | Console only
[Application](#application-configuration) | `app.php` | All
&nbsp; | `app.web.php` | Web only
&nbsp; | `app.console.php` | Console only

</div>

The primary config file is always evaluated, but only one of the `web` or `console` files are merged on top of it, when present.

::: tip
See the previous section for some examples of how to combine application type-specific configuration and config styles.
:::

### Types and Values

Most config settings expect a [scalar](https://www.php.net/manual/en/function.is-scalar.php) value, and will generate exceptions if they are not (and can not be coerced to) a valid type.

Normalization may occur on some values. For instance, any setting that expects a “file size” (like [`maxUploadFileSize`](config5:maxUploadFileSize)) will interpret a numeric value in bytes—but passing a string allows you to use other formats like `256M` or `1G` by virtue of Craft normalizing the value with [ConfigHelper::sizeInBytes()](craft5:craft\helpers\ConfigHelper::sizeInBytes()).

A few settings support complex types, like arrays and closures:

```php
use craft\config\GeneralConfig;

return GeneralConfig::create()
    // Arrays:
    ->extraFileKinds([
        'fonts' => [
            'extensions' => ['otf', 'ttf', 'woff', 'woff2'],
        ],
    ])
    // Functions or "closures":
    ->postLoginRedirect(function($siteHandle) {
        // Perform tests on the signed-in User:
        $user = Craft::$app->getUser()->getIdentity();

        // Send to their account, if their profile is incomplete...
        if (empty($user->someProfileField)) {
            return 'account/profile';
        }

        // ...or the homepage, by default:
        return '/';
    });
```

In this example, the function passed to `postLoginRedirect` will be called by [ConfigHelper::localizedValue()](craft5:craft\helpers\ConfigHelper::localizedValue()) with the current site’s handle, only *at the time the value needed*. This distinction is important, because Craft is not fully initialized when configuration files are *evaluated*, but will be by the time the application is ready to redirect a logged-in user.

Keep in mind that while scalar values are automatically normalized during configuration, the return value of a function *is not*.

::: tip
Refer to a config property’s documentation for a full list of its supported types and values!
:::

### Multi-Environment Configs

Config files using the traditional map style can define configurations for each of your environments all in one place—called a “multi-environment config”. 

To establish that your config file should be treated as a multi-environment config, it must have a `*` key which defines the base config that should be applied to each of your environments, followed by additional keys which will be matched against the [`CRAFT_ENVIRONMENT`](reference/config/bootstrap.md#craft-environment) environment variable or PHP constant.

When determining the exact configuration that should be used for a request, the base config and environment-specific config arrays will be merged together. If any config settings are defined by both arrays, the environment-specific config will take precedence.

For example, given the following multi-environment config:

```php
// -- config/general.php --
return [
    '*' => [
        // Applies to all environments:
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'allowAdminChanges' => false,
    ],

    'dev' => [
        // Only applies to development environments, overriding anything in `*`:
        'allowAdminChanges' => true,
        'devMode' => true,
    ],

    'production' => [
        // Only applies to the production environment, overriding anything in `*`:
        'cpTrigger' => 'secret-word',
    ],
];
```

Environments matching `dev` would end up with the following merged config:

```php
return [
    'defaultWeekStartDay' => 1,
    'omitScriptNameInUrls' => true,
    'allowAdminChanges' => true,
    'devMode' => true,
];
```

::: tip
Make sure your key(s) are sufficiently unique! Craft reads your array of config settings from top to bottom, applying config settings wherever the `CRAFT_ENVIRONMENT` value *contains* the key.

If the environment cannot be determined, your server’s hostname will be used.
:::

::: warning
Do not combine fluent and multi-environment config in the same file. Merging fluent config models causes all previously-set values to be overwritten.
:::

### Aliases

Some settings and functions in Craft support [Yii aliases](guide:concept-aliases), which are most often used as placeholders for file system paths and URLs.

Out of the box, Craft provides these aliases—but you can override them or provide new ones with the <config5:aliases> config setting:

| Alias | Description | Based On
| --- | --- | ---
| `@app` | Path to Craft’s source code. | [CRAFT_VENDOR_PATH](reference/config/bootstrap.md#craft-vendor-path)
| `@config` | Path to your `config/` folder. | [CRAFT_BASE_PATH](reference/config/bootstrap.md#craft-base-path)
| `@contentMigrations` | Path to your `migrations/` folder. | [CRAFT_BASE_PATH](reference/config/bootstrap.md#craft-base-path)
| `@craft` | Path to Craft’s source code. | `@app`
| `@dotenv` | Path to your [.env](system/directory-structure.md#env) file. | [CRAFT_DOTENV_PATH](reference/config/bootstrap.md#craft-dotenv-path)
| `@lib` | Path to extra libraries packaged with Craft. | `@app`
| `@root` | The root project path. | [CRAFT_BASE_PATH](reference/config/bootstrap.md#craft-base-path)
| `@runtime` | Path to your `storage/runtime/` folder. | `@storage`
| `@storage` | Path to your `storage/` folder. | [CRAFT_STORAGE_PATH](reference/config/bootstrap.md#craft-storage-path)
| `@templates` | Path to your `templates/` folder. | [CRAFT_TEMPLATES_PATH](reference/config/bootstrap.md#craft-templates-path)
| `@tests` | Path to your `tests/` folder. | [CRAFT_TESTS_PATH](reference/config/bootstrap.md#craft-tests-path)
| `@translations` | Path to your `translations/` folder. | [CRAFT_TRANSLATIONS_PATH](reference/config/bootstrap.md#craft-translations-path)
| `@vendor` | Path to your `vendor/` folder. | [CRAFT_VENDOR_PATH](reference/config/bootstrap.md#craft-vendor-path)
| `@web` | URL to the folder that contains the `index.php` file that was loaded for the request. | [CRAFT_WEB_URL](reference/config/bootstrap.md#craft-web-url)
| `@webroot` | Path to the folder that contains the `index.php` file that was loaded for the request. | [CRAFT_WEB_ROOT](reference/config/bootstrap.md#craft-web-root)

Aliases can be set to plain strings, or to the content of an environment variable. Keep in mind that **aliases are resolved recursively**, so you can define one based on another (including those whose values came from the environment):

```php
use craft\helpers\App;

return [
    'aliases' => [
        '@primaryUrl' => App::env('PRIMARY_SITE_URL'),
        '@shared' => App::env('SHARED_PATH'),
        '@uploads' => '@shared/web/uploads',
        '@assets' => '@primaryUrl/uploads',
    ],
];
```

Assuming `PRIMARY_SITE_URL` is defined as `https://mydomain.com` and `SHARED_PATH` is `/var/www/releases/123/shared`, these aliases would evaluate to:

- `@primaryUrl`: `https://mydomain.com`
- `@shared`: `/var/www/releases/123/shared`
- `@uploads`: `/var/www/releases/123/shared/web/uploads`
- `@assets`: `https://mydomain.com/uploads`

Recursive aliases are preferred to basic string interpolation, because they are evaluated at the time of _use_ rather than _definition_. Aliases are only resolved at the beginning of a string.

### Environment Overrides

Craft allows some settings to be defined directly from environment variables, PHP constants, or secrets using the special `CRAFT_` prefix.

Add the prefix to any [general config](reference/config/general.md) (`CRAFT_`) or [database connection settings](reference/config/db.md) (`CRAFT_DB_`) in [screaming snake case](https://dev.to/fission/screaming-snake-case-43kj). For example:

- General: <config5:allowUpdates> &rarr; `CRAFT_ALLOW_UPDATES`
- Database: [`port`](db.md#port) &rarr; `CRAFT_DB_PORT`
- General: <config5:testToEmailAddress> &rarr; `CRAFT_TEST_TO_EMAIL_ADDRESS`

::: danger
Any environment variable or constant names that match a known config setting (using the formula above) will have the [highest priority](#priority)! The `CRAFT_` prefix is intended to reduce the likelihood of collisions with other environment variables that a server or platform might inject—it’s actually _inadvisable_ to use this prefix when defining custom variables that aren’t intended to be used as overrides.
:::

Enforcing a structure for database connection details (even with a multi-environment config file) can cause problems when working with others, or across environments. Overrides make it possible to use whatever connection parameters are available in the current environment, without having to maintain a config file just to map variables to config settings.

::: tip
If you are working with others and your `.env` isn’t checked in to version control (it probably shouldn’t be!), make sure you have a way of communicating what options are required to get your application running! A `.env.example` file is a great place to store keys and comments, without exposing secrets—and it lets you simply copy the file when spinning up a new environment.
:::

## Using Configured Values

Most configuration is applied automatically on every request, and requires no additional action.

However, Craft provides a powerful way to use dynamically-resolved config values in other parts of the system.

<!-- Preserve links while craftcms/cms#11886 is in limbo! -->
<a name="environmental-configuration"></a>

### Control Panel Settings

Most values in the **Settings** area of Craft’s control panel are recorded in [Project config](system/project-config.md). While this makes schema changes much easier to move between environments, it presents a challenge when something like a URL needs to change per-environment, or an API key leaks into YAML files.

For this reason, Craft provides a way to bind system settings to dynamic aliases and environment variables.

![Craft’s autosuggest field, displaying a suitable match](./images/site-base-url-setting.png)

Whenever you see this UI, you can provide a valid alias or environment variable name, in addition to plain values. Craft will always store and display the raw, unparsed value, but uses [App::parseEnv()](craft5:craft\helpers\App::parseEnv()) when the value is consumed. Here are some examples of settings for which dynamic values are useful:

- **General Settings:** System Name, Status, and Time Zone;
- **Sites:** Base URLs;
- **Sections:** Preview Target URIs;
- **Asset Filesystems:** Base URL, File System Path (Local only);
- **Email:** System Email Address, Sender Name, Email Template path, SMTP credentials;

Focusing one of these fields will immediately suggest some values. Type `$` followed by an environment variable’s name, or `@` followed by an alias to narrow the suggestions and find your placeholder.

You may combine aliases and environment variables with additional path segments, so `@primaryUrl/uploads` and `$PRIMARY_SITE_URL/de` are both perfectly valid settings. <Since ver="5.5.0" feature="Combining environment variables with other path segments in project config values" /> If a combination of alias and path is used frequently, though, it might make sense to [define a specific alias](#aliases) (like `@uploads`) and use that in the control panel, instead. Prior to Craft 5.5.0, this was only a feature of aliases; environment variables _could not_ be prepended to other values.

::: tip
Plugins can add support for environment variables and aliases in their settings as well. See [Environmental Settings](extend/environmental-settings.md) to learn how.
:::

### Templates and Modules

#### Accessing Config Values

You can check the final resolved value of a setting in your templates or a module via the `Config` service. For example, if you wanted to switch some debugging information on or off, you could do the following:

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

#### Aliases and Environment Variables

In the event you need to evaluate an alias or environment variable directly in Twig or PHP, Craft provides some helpers:

::: code
```twig
{# Resolve an alias, recursively: #}
{{ alias('@uploadsBaseUrl') }}

{# Access a specific environment variable: #}
{{ getenv('SOME_ENV_VAR') }}

{# Fully resolve a value, as though it came from a control panel setting: #}
{{ parseEnv(craft.app.config.custom.myDynamicValue) }}
```
```php
// Resolve an alias, recursively:
Craft::getAlias('@uploadsBaseUrl');

// Access a specific environment variable:
craft\helpers\App::env('SOME_ENV_VAR');

// Fully resolve a value, as though it came from a control panel setting:
craft\helpers\App::parseEnv(Craft::$app->config->custom->myDynamicValue);
```
:::

## Config Categories

To make config settings easier to find, they’re organized into a few groups.

### General

[General config settings](reference/config/general.md) are set via the `config/general.php` file, or using special environment variables.

### Database

Your [database connection settings](reference/config/db.md) are set via the `config/db.php` file, or using special environment variables.

### URL Rules

You can define custom [URL rules](guide:runtime-routing#url-rules) in `config/routes.php`, and [redirection rules](system/routing.md#redirection) in `config/redirects.php`. <Since ver="5.6.0" feature="Redirection rules" />

See [Routing](system/routing.md) for more details.

### Application Configuration

Some projects may require customization of Craft [application components](reference/config/app.md) beyond what is exposed through specific config files. This is done directly via the `config/app.php` file.

### Advanced

In rare cases, you may need to customize parts of Craft that don’t follow the normal configuration scheme.

#### Guzzle

Craft uses [Guzzle](http://docs.guzzlephp.org/en/latest/) to make HTTP requests, when…

- …checking for Craft updates;
- …sending a support request from the Craft Support widget;
- …loading RSS feeds from the Feeds widget;
- …working with assets on remote volumes, like Amazon S3;

You can customize the settings passed to Guzzle when initializing these requests by creating a `guzzle.php` file in your `config/` folder. The file does not support Craft’s [multi-environment configuration](#multi-environment-configs) and should only ever return an array with your config overrides at the top level.

```php
return [
    'headers' => ['Foo' => 'Bar'],
    'query' => ['testing' => '123'],
    'auth' => ['username', 'password'],
    'proxy' => 'https://myproxy:1234',
];
```

The options defined here will be passed into new `GuzzleHttp\Client` instances. See [Guzzle’s documentation](http://docs.guzzlephp.org/en/latest/) for a list of available options.

::: tip
To use a proxy for _all_ requests, set an [httpProxy](config5:httpProxy) in general config. This will get merged with the Guzzle configuration, and passed to the front-end for use by JavaScript, in the [control panel](system/control-panel.md). Setting a proxy only in Guzzle’s config will not affect Ajax requests!
:::

### Custom Settings

Settings defined in a `config/custom.php` file don’t map to or affect any built-in Craft features, but can useful to centralize data, flags, or secrets that otherwise don’t have a place to live.

```php
return [
    'serviceBaseUrl' => 'https://api.service.com/v1',
    'servicePublishableKey' => App::env('SERVICE_PUBLISHABLE_KEY'),
    'servicePrivateKey' => App::env('SERVICE_PRIVATE_KEY'),
];
```

Custom config follows the same multi-environment structure as other files, so you can use the resolved values in a predictable way in any context:

::: code
```twig
{% set publishableKey = craft.app.config.custom.servicePublishableKey %}

{% js "https://cdn.service.com/client.js?key=#{publishableKey}" %}
```
```php
$privateKey = Craft::$app->config->custom->servicePrivateKey;

$client = Craft::createGuzzleClient([
    'base_uri' => Craft::$app->config->custom->serviceBaseUrl,
]);

$client->post('/donations', [
    'auth' => ['apiuser', $privateKey],
    'json' => [
        'amount' => 1000,
    ],
]);
```
:::

::: tip
If these settings need to be changed frequently, edited by a control panel user, or don’t depend on the environment, they may be a better fit for a [Global Set](reference/element-types/globals.md).
:::

#### HTML Purifier

JSON files containing valid [HTML Purifier configuration](https://htmlpurifier.org/live/configdoc/plain.html) can be added to `config/htmlpurifier/`.

When creating a [Redactor](plugin:redactor) or [CKEditor](plugin:ckeditor) field, you can select one of your predefined purifier configs—or provide a one-off config object. The [`purify`](reference/twig/filters.md#purify) filter also accepts a reference to an existing config file or a complete config object.

A simple config that scrubs everything but paragraph and anchor tags would look like this:

```json
{
  "HTML.AllowedElements": "p, a",
}
```

For security, any keys _not_ set will use their [defaults](https://github.com/ezyang/htmlpurifier/blob/master/plugins/phorum/config.default.php).

::: tip
Note that HTML Purifier expresses many options with dot notation, like `HTML.AllowedElements`. These are the literal keys, not an indication that keys should be nested!
:::

<a id="php-constants"></a>

## Bootstrap Config

Some customization is handled via special variables (set as PHP constants or environment vars) that Craft will take into account as it boots up. Depending on your installation, you may keep these in `web/index.php` and the `craft` CLI entry points, or consolidate common values into a single `required` file, as the [starter project](repo:craftcms/craft) does in its `bootstrap.php` file—they’ll get picked up as long as they’re set prior to calling `$app->run()`.

By virtue of accessing these via <craft5:craft\helpers\App::env()>, Craft also honors values defined by your environment under the same names or keys. The majority of these settings are tied specifically to the structure of your project directory, though, and generally do not need to change between environments.

::: tip
Constants you set directly in `web/index.php` will only be defined for _web_ requests, while any you set in the `craft` executable will only be defined for _console_ requests. Use `bootstrap.php` to define constants for _all_ requests.
:::

<See path="reference/config/bootstrap" label="Bootstrap Variable Reference" description="View a list of bootstrap variables that Craft uses." />
