# Extension Types

Historically, you’ve been able to extend Craft in two ways: [plugins](#plugins) (distributable packages installed via the [Plugin Store](https://plugins.craftcms.com)) and [modules](#modules) (a low-level extension usually tied to a single project, but still somewhat portable).

## Plugins

Plugins are special `craft-plugin`-typed Composer packages that have additional hooks for discovery by Laravel and Craft.
You must install plugins with Composer for them to be discovered by our `craftcms/plugin-installer` package.

You can clone a plugin into your project directory and require it with a path repository to [work locally](local-dev.md).

## Modules

Project-specific code should be unfurled into the `App` namespace.
“Modules” are not really a distinct concept any more; if you want to share or distribute code/features for use in other projects, check out Laravel’s documentation on [package development](laravel:packages).

The equivalent entry point for modules is a regular [service provider](laravel:providers).
Your application can have as many service providers as you need.
Add new providers to `bootstrap/providers.php`, or turn your primary provider into an `\Illuminate\Support\AggregateServiceProvider`.

## New Concepts

This section discusses some general design differences between Yii and Laravel that will affect how you update existing plugins and structure new ones.

### Feature Awareness

Laravel is designed to accommodate a wide range of private apps, so packages can’t assume that all projects are configured the same.
Like Yii, some features, drivers, database tables, etc. are elective and may not be available.
Craft may even be invited into someone’s sprawling, preexisting application with extremely specific infrastructure requirements!

Confirm with your users when you rely on non-standard Laravel features (like [batched queue jobs](laravel:queues#job-batching)), and avoid using them while the app is bootstrapping, or during installation.

### PHP Support

Craft now requires PHP 8.5, so every plugin gets access to language features introduced since 8.2:

- A proper [URI](https://www.php.net/releases/8.5/en.php#new-uri-extension) built-in
- [Pipe operator](https://www.php.net/releases/8.5/en.php#pipe-operator)
- [Property hooks](https://www.php.net/releases/8.4/en.php#property_hooks) (getters and setters)
- [New `array_*` functions](https://www.php.net/releases/8.4/en.php#new_array_find)
- [Typed class constants](https://www.php.net/releases/8.3/en.php#typed_class_constants)
- [`#[Override]` attribute](https://www.php.net/releases/8.3/en.php#override_attribute) (protect against drift from interfaces/subclasses)

Consider reviewing your code for opportunities to implement these features.
In modernizing the Craft codebase, we also made extensive use of **enumerations** and **attributes**.
Many sections in this guide provide opportunities to annotate your code with attributes, rather than implement methods.

### Organization

Craft’s classes have been reorganized by feature rather than parentage, and most have a significantly shallower inheritance tree.
You are free to adopt this pattern or choose your own structure based on needs in the new system.

For example, everything related to communication with a third-party API could be in a `Bridge\` namespace (`enum` classes, exceptions, events, etc.) while user-facing data collection is in a `Customer\` namespace.

Autoloading still observes the same rules as before:

- The fully-qualified class name/space must match its path on disk, within the autoloading root (defined in `composer.json`).
- Treat all files and paths as **case-sensitive** to support case-sensitive filesystems.

#### Paths

Check out the various plugin traits for any hard-and-fast rules about where classes and [resources](assets.md) live.
The most common of these is apt to be your [routes](http.md) files (`HasRoutes`).

### Models + Data Objects

Laravel’s definition of a [model](models.md) is much narrower than Craft’s, and combines aspects of our legacy *model* and *record* classes.

1. Anything that you previously used `craft\db\Record` for in Craft 5.x will likely become an Eloquent model.
1. We’ve brought some of our legacy “model” features into 6.x as *components*. Components are still a perfectly good way to move “data objects” throughout your plugin.
1. [Validation](validation.md) in Laravel is more often performed on simple arrays at the input or request layer rather than after assignment to models.

We discuss this in greater detail in the [Models, Records, and Data](models.md) section.

### Initialization

Plugins have an entirely new, phased initialization mechanism that makes it much easier to reason about the availability of other systems and add features in a declarative way.

As the application boots, Laravel instantiates each known service provider, including Craft and all plugins.
Those providers are then asked to [register](laravel:providers#the-register-method) any low-level behavior (like how classes are resolved through the container), and are later [booted](laravel:providers#the-boot-method).

::: tip
You’ll almost never need to implement the `register()` or `registerPlugin()` methods, and the kinds of things you can do in either are extremely limited.

As an example: it comes so early in the request lifecycle that the events system may not work reliably.
The app is still waiting to be told what class is responsible for dispatching events… and another service provider may re-bind it before an event triggers!
:::

A simplified view of [the initialization process](laravel:lifecycle) looks like this:

- Application instance (HTTP or Console kernel) creation
- Service provider discovery
- Service provider registration
- Service provider booting
- Routing

Only bits and pieces of “Craft” are resolved in this process—unlike Yii, there is no central *Craft* instance that exists prior to plugins being booted!
Despite this, we are able to make sure during the boot phase that only plugins that are installed and enabled are actually “booted.”

To be notified when the app has fully booted, register a callback:

```php
app()->booted($callback);
```

#### Plugin Traits

A handful of built-in *concerns* handle this bootstrapping process for plugins, providing a declarative way to register many common for define any of their corresponding properties and methods.
Instead of setting up an event listener to, say, register a field type, 

- `HasCommands` → `$commands` — List of [command](commands.md) classes exposed to the Artisan CLI.
- `HasConfig` → `$config` (Boolean) — Set to `false` to prevent [config](config.md) file publishing and discovery.
- `HasEditions` → `$editions`, `$minCmsEdition`, `static editions()` — Call `is()` to test the current edition and determine limits or gate features.
- `HasElementTypes` → `$elementTypes` — An array of custom [element types](elements.md).
- `HasFieldtypes` → `$fieldTypes` (Array) — Custom [field types](fields.md) class names.
- `HasFrontendAssets` → `$vite`, `$styles`, `$scripts` — Configuration or path maps for various [asset publishing](assets.md) options.
- `HasListeners` → `$events` — Bind [events](events.md) (keys) to listeners (values).
- `HasPermissions` → `getPermissions()` (Array) — `CraftCms\Cms\User\Data\Permission` objects, with optional nesting.
- `HasRoutes` → Loads [routes](http.md) defined in `routes/[web|cp|~~actions~~].php`.
- `HasSettings` → `$hasCpSettings`, `$hasReadOnlyCpSettings` (Boolean) — Enables automatic routing to a dedicated [settings](config.md) screen in the control panel.
- `HasTranslations` → `$t9nCategory`, `$sourceLanguage` — Customize the translation category. Defaults to your plugin handle.
- `HasUtilities` → `$utilities` (Array) — Register utilities.
- `HasViews` — Automatically registers your plugin’s [template](templates.md) root.
- `HasWidgets` → `$widgets` (Array) — Register widgets for the control panel dashboard.

::: tip
The base plugin class includes all of these traits, by default—you don’t need to opt-in or define properties your plugin doesn’t use.
:::

As an example, if your plugin provided a new type of dashboard widget, you would add a `$widgets` property to your main plugin class:

```php{8-10}
use CraftCms\Cms\Plugin\Plugin;
use MyOrg\MyPlugin\Widgets\RandomQuoteWidget;

class InspirationPlugin extends Plugin
{
    // ...

    protected array $widgets = [
        RandomQuoteWidget::class,
    ];
}
```

A plugin’s traits are all initialized before finally calling the `bootPlugin()` method.
Once all plugins are booted, Craft emits the `CraftCms\Cms\Plugin\Events\PluginsLoaded` event, indicating that it’s safe to check for and interact with other plugins.

::: danger
**Do not** override your plugin’s `register()` or `boot()` methods.
All your initialization logic should be in the `bootPlugin()` methods.
:::

## Termination

Your plugin can register cleanup tasks at the end of the app’s lifecycle—roughly equivalent to Yii’s `EVENT_AFTER_REQUEST` event:

```php
app()->terminating($callback);
```
