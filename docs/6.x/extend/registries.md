---
description: Manage system component types and other configuration with a standard interface.
---

# Registries

Craft 6.x uses a new _registries_ concept to manage collections of related components.

<!-- more -->

Registries replace [events](events.md) and supplement plugin trait [initialization](avenues.md#initialization), providing an explicit, [validated](#validation) catalog of members that can be accessed and mutated at any time, rather than resolved and memoized once, when they are first accessed.

## Structure

Every registry extends `CraftCms\Cms\Component\TypeRegistry`, and provides `register()` and `remove()` methods.
Each implementation defines a `CONTRACT` that every type must conform to, and many use `DEFAULT_TYPES` to seed the registry with built-in types.

Types are checked before mutating the registry’s `types` property, so calls to `TypeRegistry::types()` is guaranteed to return a “safe” collection.

## Using Registries

Registries are intended as a drop-in replacement for code paths that used `craft\events\RegisterComponentTypesEvent` or related events.

Laravel will inject any registries you declare in your plugin’s `boot()` method.
You can then manipulate the registered types:

```php
use CraftCms\Cms\Dashboard\WidgetTypes;
use CraftCms\Cms\Field\FieldTypes;

public function boot(
    FieldTypes $fieldTypes,
    WidgetTypes $widgetTypes,
): void
{
    // Add a custom field type:
    $fieldTypes->register(Fields\MyField::class);

    // Remove an unused dashboard widget:
    $widgetTypes->remove(CraftCms\Cms\Dashboard\Widgets\Feed::class);
}
```

Where possible, plugins are still encouraged to register features declaratively using properties on the base class (i.e. `$widgets`).
Plugin traits backed by a [built-in registry](#built-in-registries) act as proxies, automatically registering any declared types as the plugin boots.

::: tip
Some registries include “protected” types, which cannot be removed.
:::

### Built-in Registries

These feature registries accept one or more class string identifiers to `register()` or `remove()`:

| Feature | Registry Class |
| --- | --- |
| Auth methods | `CraftCms\Cms\Auth\AuthMethods` |
| Element types | `CraftCms\Cms\Element\ElementTypes` |
| Field types | `CraftCms\Cms\Field\FieldTypes` |
| Filesystem adapters | `CraftCms\Cms\Filesystem\FilesystemTypes` |
| GraphQL directives | `CraftCms\Cms\Gql\GqlDirectives` |
| GraphQL mutations | `CraftCms\Cms\Gql\GqlMutations` |
| GraphQL queries | `CraftCms\Cms\Gql\GqlQueries` |
| GraphQL types | `CraftCms\Cms\Gql\GqlTypes` |
| Image transformers | `CraftCms\Cms\Image\ImageTransformers` |
| Link types | `CraftCms\Cms\Field\LinkTypes` |
| Nested entry field types | `CraftCms\Cms\Field\NestedEntryFieldTypes` |
| Template cache collectors | `CraftCms\Cms\View\TemplateCacheCollectors` |
| Utility types | `CraftCms\Cms\Utility\UtilityTypes` |
| Widget types | `CraftCms\Cms\Dashboard\WidgetTypes` |

A number of other features use registry-like patterns for collecting and validating configuration.
Most require unique _domain identifiers_, passed explicitly (as with _asset file kinds_), or derived from other criteria (like _template roots_) against which the value or closure is registered.

The following sections cover these additional, non-standard catalogs.
Some sections will defer to pages that describe the implementation or usage in greater detail.

#### Asset file kinds

File “kinds” are identified by a handle, and are expected to be an array with `label` and list of allowed `extensions`.

```php
use CraftCms\Cms\Asset\AssetFileKinds;

public function boot(AssetFileKinds $fileKinds): void
{
    $fileKinds->register('drawing', [
        'label' => 'Drawing',
        'extensions' => ['dwg'],
    ]);
}
```

#### Native field layout fields

Field layout elements are registered and removed using a group handle and a callback.
The callback receives a plain array of `$fields` that have been registered so far, 

```php
use CraftCms\Cms\FieldLayout\NativeFields;

public function boot(NativeFields $nativeFields): void
{
    $nativeFields->register('my-plugin', function (FieldLayout $fieldLayout, array $fields): array {
        if ($fieldLayout->type === Entry::class) {
            $fields[] = MyEntryField::class;
        }

        return $fields;
    });
}
```

#### Control panel settings

Settings tiles are registered with a `$section` and `$handle`.
Sections represent the top-level rows that settings tiles are arranged by, and should be a human-readable string.
You may register new sections, or inject additional tiles into an existing section—so long as their handles are unique.

The third argument is a [lazily-invoked closure](#lazy-resolution), and should return an array with at least `label` and `url` keys, and an optional `icon` (SVG string) or `iconName` (resolvable among icons published by `CraftCms\Cms\Providers\IconServiceProvider`) key.

```php
use CraftCms\Cms\Cp\Settings;

public function boot(Settings $settings): void
{
    $settings->registerSetting('My Plugin', 'general', fn () => [
        'label' => t('General', category: 'my-plugin'),
        'iconName' => 'light/map-location',
        'url' => route('my-plugin.settings'),
    ]);

    // Read-only settings tiles can omit
    $settings->registerReadOnlySetting('My Plugin', 'status', fn () => [
        'label' => t('Status', category: 'my-plugin'),
        'iconName' => 'solid/stopwatch',
        // The `url` key is not required for read-only settings.
    ]);
}
```

You must provide a single section when removing settings tiles; `$handle`s are only matched within that section.

#### System Messages

A [lazily-invoked closure](#lazy-resolution) that returns a populated `CraftCms\Cms\SystemMessage\Models\SystemMessage` can be registered by key.

```php
use CraftCms\Cms\SystemMessage\Models\SystemMessage;
use CraftCms\Cms\SystemMessage\SystemMessages;

public function boot(SystemMessages $messages): void
{
    $messages->register('order_shipped', fn () => new SystemMessage([
        'key' => 'order_shipped',
        'heading' => 'Order shipped',
        'subject' => 'Your order has shipped',
        'body' => 'Your order is on its way.',
    ]));
}
```

Plugins should instead [implement `getSystemMessages()` method](mail.md), and return an array of `SystemMessage` objects, indexed by key.

<See path="mail.md" />

#### Permissions

Apps can register groups of permissions under a handle.

```php
use CraftCms\Cms\User\Data\Permission;
use CraftCms\Cms\User\Data\PermissionGroup;
use CraftCms\Cms\User\UserPermissions;

public function boot(UserPermissions $permissions): void
{
    $permissions->registerPermissionGroup('filament', fn () => new PermissionGroup(
        handle: 'filament',
        heading: 'Filament',
        permissions: collect([
            new Permission('accessFilament', 'Access Filament'),
        ]),
    ));
}
```

Plugins automatically get a permissions group if their `getPermissions()` method returns a non-empty array of `CraftCms\Cms\User\Data\Permission` objects.

#### Template roots

Additional [template roots](templates.md#plugin-templates) can be registered using a template mode, prefix, and any number of paths:

```php
use CraftCms\Cms\View\TemplateMode;
use CraftCms\Cms\View\TemplateRoots;

public function boot(TemplateRoots $roots): void
{
    $roots->register(
        TemplateMode::Cp,
        'my-plugin',
        __DIR__.'/templates',
        __DIR__.'/fallback-templates',
    );
}
```

Plugins automatically get a _control panel_ template root, and register additional _site_ template roots set on `$siteTemplateRoots`.

#### Cache-clearing options

You can supplement Craft’s built-in cache management tools with your own actions.
These appear as options in <Journey path="Utilities, Clear Caches" />, and `CraftCms\Cms\Utility\Utilities\ClearCaches`

```php
ClearCaches::add('webhook-logs', [
    'label' => 'My Plugin: Webhook logs',
    'action' => WebhookLogs::clear(...),
]);
```

Caches can be cleared individually (via the control panel or using `php craft clear-caches`, interactively), or all at once (by running `php craft clear-caches/all`).

Clearable _tags_ can also be registered:

```php
ClearCaches::addTag('webhook-payloads', 'Webhook Payloads');
```

Craft then exposes a new command using the handle (like `invalidate-tags:{tag}`), which passes the tag to `TagDependency::invalidate()`.

#### Migration tracks

In general, you should use your plugin’s automatically-defined migration track.
If you must split migrations into different paths (say, to provide updates only when a particular vendor-specific table is used), tracks are registered via `CraftCms\Cms\Database\Commands\MigrateCommand`:

```php
use CraftCms\Cms\Database\Commands\MigrateCommand;
use CraftCms\Cms\Database\Migrator;

MigrateCommand::registerMigrator(
    fn (Migrator $migrator) => $migrator
        ->track('hooks-plugin:sentry')
        ->setPaths([__DIR__.'/migrations']),
);
```

The handler must return the injected `Migrator` instance and define a `track`.
Custom migration tracks run _after_ `craft` and plugins’ default tracks, but before `content` migrations.

### Lazy Resolution

Subclasses of `CraftCms\Cms\Component\TypeRegistry` accept only _types_ (not instances) that implement the contract.
These types are instantiated as-needed, used statically, or for validation.

Other registry-like resolvers may expect other kinds of values, including lazily-invoked closures, which help avoid instantiating objects on every request.
Closures support dependency injection as a result of being invoked using `app()->call($fn)`.

## Custom Registries

You are free to implement your own registry-like class from scratch, or extend `CraftCms\Cms\Component\TypeRegistry` for type safety.
Override `CONTRACT` with an interface or base class that any incoming types must satisfy, and declare any defaults with `DEFAULT_TYPES`.

Types that _must_ be present for your plugin or application to work should be declared in your registry’s `PROTECTED_TYPES`.

For registries that collect values other than types (or for which the values aren’t known as the app boots), you should override the `register()` method to accept an explicit [identifier](#identity) and a [callback](#lazy-resolution).

### Identity

Your registry’s `identity()` method is responsible for uniquely identifying and de-duplicating types.
By default, this uses the incoming class string, but you are free to derive the value in whatever way is appropriate, so long as the `remove()` implementation is able to locate and remove types from the catalog.
