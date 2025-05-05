# How to Build a Plugin

Plugins are typically designed and built as public packages, distributable via the first-party [Plugin Store](plugin-store.md). You can also create [private plugins](#private-plugins) in lieu of a [module](module-guide.md) when the full suite of features are desirable (i.e. control panel navigation, settings, and project config) but the added functionality is still project-specific.

At a technical level, plugins are a type of [Yii module](guide:structure-modules) that are registered with Craft and initialized alongside the application, giving them an opportunity to supplement, change, or observe what the application does.

## Preparation

Your first task is to decide on a few characteristics that will dictate how your plugin is [scaffolded](#scaffolding):

Package name
:   Used to name your Composer package for the plugin. (See Composer’s [documentation][package name] for details.) We recommend prefixing the second segment (after the `/`) with `craft-`, to help identify that this is a Craft plugin. For example, `pixelandtonic/craft-recipes`.

Namespace
:   The root namespace that your plugin’s classes will live in. (See the [PSR-4] autoloading specification for details.) Note that this should _not_ begin with `craft\`; use something that identifies you, the developer or vendor.

Plugin handle
:   Something that uniquely identifies your plugin within the Craft ecosystem. (Plugin handles must begin with a letter and contain only lowercase letters, numbers, and dashes. They should be `kebab-cased`.)

Plugin name
:   What your plugin will be called within the control panel. This should be a clear and consistent identifier throughout its design and digital presence (if you choose to distribute it). Consider the longevity of your name, and how it fits with these guidelines:

    - **Don’t** reference the Craft version in your plugin’s name, folder, or repository URL. It’ll require more work and licensing considerations if you update it for another major Craft release.\
    Example: `craft-foo`, not `craft3-foo`.
    - **Do** add `craft-` as a prefix in your GitHub repository name. This helps differentiate any Craft plugins from other projects.\
    Example: `craft-foo`, not `foo-plugin`.
    - **Do** keep your Composer package name reasonably concise. Developers will see (and type) the package name when installing the plugin.\
    Example: `composer require acme/craft-thinginator`, not `composer require acme/craft-super-advanced-thinginator-by-acme`.

    ::: warning
    Your plugin’s name _must not_ begin with “Craft”, or include an [edition](plugin-editions.md)-sounding word like “Lite”, “Plus”, or “Pro”.
    :::

### Private Plugins

A plugin can be made “private” by prefixing its handle with an underscore (like `_my-private-plugin`). Private plugins have all the same features as regular plugins, but are excluded from license verification (and are ineligible for listing on the [Plugin Store](plugin-store.md)); you can even publish a private plugin to GitHub or Packagist and share it between multiple projects, taking advantage of features like [migration tracks](migrations.md).

Private plugins can be scaffolded with the [Generator](generator.md).

## Scaffolding

::: tip
If this is your first time setting up a plugin, consider using the [Generator](generator.md)—it will prompt you for all of the required information, and leave you with a nicely-organized workspace.

<p><Generator component="plugin" /></p>
:::

To create a plugin, create a new directory for it somewhere on your computer. A common approach is to store them in a `~/dev/` folder alongside your Craft projects:

```treeview
~/dev/
├── my-project/
│   └── ...
└── my-plugin/
    ├── CHANGELOG.md
    ├── LICENSE.md
    ├── README.md
    ├── composer.json
    └── src/
        └── Plugin.php
```

The name of your plugin directory doesn’t matter. Just choose something that is easy to identify.

## composer.json

Create a `composer.json` file at the root of your plugin directory, and use this template as a starting point:

```json
{
  "name": "package/name",
  "description": "Your plugin’s package description",
  "type": "craft-plugin",
  "keywords": ["some", "keywords", "here"],
  "license": "MIT",
  "authors": [
    {
      "name": "Developer Name",
      "homepage": "https://developer-website.tld"
    }
  ],
  "support": {
    "email": "email@developer-website.tld",
    "issues": "https://github.com/developer/repo/issues?state=open",
    "source": "https://github.com/developer/repo",
    "docs": "https://github.com/developer/repo/blob/master/README.md"
  },
  "require": {
    "craftcms/cms": "^5.3.0"
  },
  "autoload": {
    "psr-4": {
      "namespace\\prefix\\": "src/"
    }
  },
  "extra": {
    "name": "Plugin Name",
    "handle": "my-plugin-handle"
  }
}
```

Review and replace the following values:

- `package/name` with your package name.
- `Developer Name` with your name, or the organization name that the plugin should be attributed to.
- `https://developer-website.tld` with the URL to the website the developer name should link to in the control panel.
- `email@developer-website.tld` with your support email.
- `developer/repo` with the actual GitHub account and repository names where the plugin will live.
- `master` with the actual primary branch name of your GitHub repository.
- `namespace\\prefix\\` with your namespace prefix. (Use double-backslashes because this is JSON, and note this must end with `\\`.)
- `Plugin Name` with your plugin name.
- `my-plugin-handle` with your plugin handle.
- `MIT` with `proprietary` if you plan to use [Craft License](https://craftcms.github.io/license/). Read more about [choosing a license](plugin-store.md#choose-a-license).

In addition to `name` and `handle` (both of which are required), there are a few other things you can include under the `extra` key:

- `class` — The [main plugin class](#the-plugin-class) name. If not set, the installer will look for a `Plugin.php` file at the root of each `autoload` path.
- `description` — A brief description of your plugin’s purpose. If not set, the main `description` property will be used.
- `developer` — The developer name. If not set, the first author’s `name` will be used (via the `authors` property).
- `developerUrl` — The developer URL. If not set, the `homepage` property will be used, or the first author’s `homepage` (via the `authors` property).
- `developerEmail` — The support email. If not set, the `support.email` property will be used.
- `documentationUrl` — The plugin’s documentation URL. If not set, the `support.docs` property will be used.

Some of these values are displayed in the Craft control panel (in <Journey path="Settings, Plugins" />—[see below](#plugin-icons) for an example) and used to auto-populate a handful of fields when you begin the Plugin Store submission process. We encourage you to provide a more thorough description—or update its details any time thereafter—via [Craft Console](kb:what-is-craft-console)—descriptions and URLs are _not_ synchronized again.

## The Plugin Class

The `src/Plugin.php` file is your plugin’s entry point for the system. Craft instantiates a singleton of your plugin class at the beginning of every request, [invoking its `init()` method](#initialization). This is the best place to register [event listeners](events.md), and perform any other setup steps.

Use this template as a starting point for your `Plugin.php` file:

```php
namespace mynamespace;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        parent::init();

        // Custom initialization code goes here...
    }
}
```

::: warning
Don’t move or rename this class or file after [publishing](plugin-store.md) a plugin. Craft stores references to its fully-resolved class name in configuration, and may have issues initializing if it goes missing.
:::

### Automatic Defaults

Plugins are automatically given a few key features to simplify setup and provide a consistent developer experience:

- An [alias](../configure.md#aliases) is registered, corresponding to each autoloading namespace. If your plugin’s root namespace was `acmelabs\mousetrap`, Craft would create `@acmelabs/mousetrap`.
- The plugin’s `controllerNamespace` is configured such that web requests are served by [controllers](controllers.md) in a `controllers/` directory adjacent to the main plugin file, and [console commands](commands.md) are resolved using classes in `console/controllers/`.

### Initialization

Most initialization logic belongs in your plugin’s `init()` method. However, there are some situations in which parts of the application aren’t ready yet (like another plugin)—in particular, creating [element queries](../development/element-queries.md) or causing the [Twig environment](../development/twig.md) to be loaded prematurely can result in race conditions and incomplete initialization.

In these cases, it’s best to register a callback via <craft5:craft\base\ApplicationTrait::onInit()>, from your plugin’s `init()` method:

```php
namespace mynamespace;

use Craft;

class Plugin extends \craft\base\Plugin
{
    public function init(): void
    {
        // Always let the parent init() method run, first:
        parent::init();

        // Set up critical components + features...

        // Defer some setup tasks until Craft is fully initialized:
        Craft::$app->onInit(function() {
            // ...
        });
    }

    // ...
}
```

::: tip
If Craft has already fully initialized, your callback will be invoked immediately.
:::

Conversely, there are cases in which attaching [event listeners](events.md) in `onInit()` may be _too late_—by the time your callback is invoked, those events may have already happened.

### Accessing your Plugin

When you need a reference to your main plugin class (say, from a [controller](controllers.md) or [service](services.md)), use the static instance getter:

```php
use mynamespace\Plugin as MyPlugin;

$pluginInstance = MyPlugin::getInstance();
```

Each time you call this, the same “singleton” will be returned, so anything you’ve memoized on the class (say, as private properties) will be preserved.

::: warning
You should never need to create additional instances of your plugin!
:::

### Components and Getters

As your plugin’s capabilities grow, you may want to organize functionality into [services](services.md). Yii is able to resolve any services you configure via your plugin’s [setComponents()](yii2:yii\base\Component::setComponents()) method, but some [IDE](README.md#ide)s are aided by [`@property` docblock tags](https://docs.phpdoc.org/guide/references/phpdoc/tags/property.html) or explicit [component getters](services.md#component-getters).

## Loading your plugin into a Craft project

When you scaffold a new plugin with the [generator](#scaffolding), Craft takes care of connecting the project’s `composer.json` to the new local directory using a [path repository](#path-repository). You are free to continue local development like this, indefinitely—but it’s important to understand how other developers might install your plugin, later!

Once published, other developers can [install your plugin via Packagist](#packagist). These steps are identical for any plugin in the [Plugin Store](plugin-store.md).

### Packagist

If you’re ready to [publicly release](plugin-store.md) your plugin, register it as a new Composer package on [Packagist](https://packagist.org/). Other developers can install it like any other package, by passing its name to Composer’s `require` command:

```bash
# go to the project directory
cd /path/to/my-project

# require the plugin package
composer require package/name
```

DDEV users have access to this shortcut when interacting with Composer:

```bash
ddev composer require package/name
```

<See path="plugin-store.md" label="Publishing to the Plugin Store" description="Get your plugin ready to publish in the official Plugin Store!" />

### Path Repository

During development, the easiest way to work on your plugin is with a [path repository][path]. This allows Composer to _symbolically link_ your plugin into the `vendor/` folder, right alongside other dependencies.

To set it up, open your Craft project’s `composer.json` file and make the following changes:

- Set [minimum-stability](https://getcomposer.org/doc/04-schema.md#minimum-stability) to `"dev"`
- Set [prefer-stable](https://getcomposer.org/doc/04-schema.md#prefer-stable) to `true`
- Add a new [path repository](https://getcomposer.org/doc/05-repositories.md#path) record, pointed at your plugin’s root directory.

```json
{
  "minimum-stability": "dev",
  "prefer-stable": true,
  "repositories": [
    {
      "type": "path",
      "url": "./local/my-plugin"
    }
  ]
}
```

Set the `url` value to the absolute or relative path to your plugin’s source directory. The `./local/my-plugin` example above assumes that the plugin was cloned into a directory named `local/`, which exists alongside `composer.json`.

::: tip
If you are using a containerized development environment like DDEV, Composer may not be able to see directories outside the current project! You can either clone another copy of the repository into the project, or configure a new mount by creating `./config/docker-compose.plugin-mount.yml`:

```yml
services:
  web:
    volumes:
      - "$HOME/Developer/my-plugin:/home/shared/my-plugin"
```

This will be merged with DDEV’s main web container config; you can then replace the path repository’s `url` with the absolute path `/home/shared/my-plugin`.
:::

In a terminal, go to your Craft project and require the plugin using the same package name you gave your plugin in its `composer.json` file:

```bash
composer require package/name
```

Composer’s output should show that the package was installed via a symlink:

```
  - Installing package/name (X.Y.Z): Symlinking from ./local/my-plugin
```

::: warning
One caveat of `path` Composer repositories is that Composer may ignore `path`-based dependencies when you run `composer update`. So any time you change anything in a plugin’s `composer.json` (like its dependencies or [extras](#composer-json)), you may need to completely remove and re-require your plugin for those changes to take effect:

```bash
# Remove the plugin package from your project:
composer remove package/name

# Re-require the plugin package, and allow updates to dependencies:
composer require package/name -w
```
:::

This same process can be used to fork, clone, and contribute to any open-source or source-available plugin!

## Plugin Icons

Plugins can provide an icon, which will be visible on the **Settings** → **Plugins** page.

<BrowserShot url="https://my-project.tld/admin/settings/plugins" :link="false" caption="The Settings → Plugins page in Craft’s control panel.">
<img src="../images/plugin-index.png" alt="Screenshot of control panel Settings → Plugins">
</BrowserShot>

Plugin icons must be square SVG files, saved as `icon.svg` at the root of your plugin’s source directory (e.g `src/`).

If your plugin has a [control panel section](cp-section.md), you can also give its global nav item a custom icon by saving an `icon-mask.svg` file in the root of your plugin’s source directory. Note that this icon cannot contain strokes, and will always be displayed in a solid color (respecting alpha transparency).

[package name]: https://getcomposer.org/doc/04-schema.md#name
[psr-4]: https://www.php-fig.org/psr/psr-4/
[path]: https://getcomposer.org/doc/05-repositories.md#path
