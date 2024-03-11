---
related:
  - uri: https://github.com/craftcms/rector
    label: Rector Library
  - uri: https://github.com/craftcms/phpstan
    label: PHPStan Configuration
sidebarDepth: 2
---

# Updating Plugins for Craft 5

Craft 5 brings some of the most significant author- and developer-experience improvements _ever_—and in a way that is minimally disruptive to plugins.

The [changelog](https://github.com/craftcms/cms/blob/5.0/CHANGELOG.md) is the most comprehensive and up-to-date list of added, changed, deprecated, and removed APIs. This guide focuses on high-level changes, organized by the features they impact.

::: tip
Report issues with the upgrade guide in our [`craftcms/docs` repo](https://github.com/craftcms/docs/issues/new), and issues with the upgrade itself in the [`craftcms/cms` repo](https://github.com/craftcms/cms/issues/new?labels=bug%2Ccraft5&projects=&template=BUG-REPORT-V5.yml&title=%5B5.x%5D%3A+).
:::

## Overview

Be sure and fully review this page (and the [changelog](https://github.com/craftcms/cms/blob/5.0/CHANGELOG.md)) before getting started, taking note of features that are apt to impact your plugin.

## Process

Updating a plugin for Craft 5 starts with a fully-updated Craft 4 installation. See our guide on [loading your plugin into a Craft project](plugin-guide.md#loading-your-plugin-into-a-craft-project) to get up-and-running.

Once your environment is set up, this is what the process will look like:

1. Run [PHPStan](#phpstan) to address any outstanding issues with the latest version of your plugin, in Craft 4.
1. Make the recommended changes, commit the results, and tag a new release on the _current_ version.
1. Run the Craft 5 [Rector ruleset](#rector) on your plugin.
1. Update the `craftcms/cms` requirement in the root Craft project _and_ in your plugin’s `composer.json` to `^5.0.0-beta.1`, then run `composer update`.
1. Run `php craft up` to perform the Craft upgrade.

At this point, your project _should_ be functional again! Go ahead and kick the tires—then come back here and review changes that may impact your plugin. If the project is still failing to bootstrap, it is likely due to incompatible API changes that Rector couldn’t address on its own.

::: tip
The next few sections cover these steps (and some other procedural concerns). Skip down to [new features](#new-features) if you’re ready to dig in.
:::

### PHPStan

We use [PHPStan](https://github.com/phpstan/phpstan) on Craft CMS, Craft Commerce, and most of our first-party plugins to continually audit code quality and consistency.

While there’s no _requirement_ that you use PHPStan, we encourage all developers to join us—with the upgrade process being a perfect opportunity to integrate code quality tools into your workflow.

Follow the instructions in our [PHPStan package](https://github.com/craftcms/phpstan) to add it as a development dependency of your plugin. You should end up with a `phpstan.neon` config file in your _plugin_ repository’s root; then go back to the Craft project root, and run:

```bash
vendor/bin/phpstan -c path/to/plugin/phpstan.neon
```

::: tip
Large plugins may benefit from the `--memory-limit 1G` flag.
:::

### Rector

Our [Rector](https://github.com/craftcms/rector) rule set for Craft 5 automates most signature changes, deprecations, and other one-for-one replacements in your codebase. With your plugin running in Craft 4, follow these steps:

1. Install Rector:

    Rule-sets are not “versioned” in the traditional sense; instead, each major version is kept in a separate file. As such, its use depends on a couple of Composer settings:

    ```
    composer config minimum-stability dev
    composer config prefer-stable true
    ```

    Require the package, using the `dev-main` version constraint. The `main` branch will be cloned, and subsequent `composer update` commands will pull any changes.

    ```
    composer require craftcms/rector:dev-main --dev
    ```

1. Run the Craft 5 ruleset:

    ```
    vendor/bin/rector process my-local-plugin/src --config vendor/craftcms/rector/sets/craft-cms-50.php
    ```

    ::: warning
    Rector may make your plugin incompatible with Craft 4, which can prevent the system from initializing. This is fine! It’s safe to continue upgrading the project.
    :::

### Versioning

Craft 5 is the first major release that may not require breaking changes for all plugins. This means that plugins that don’t immediately take advantage of new features or APIs (and aren’t affected by any currently-deprecated APIs) can tag a compatibility-only “point” release.

If you are uncertain whether your plugin will use new features, we recommend tagging a new major version, and back-porting any features and bugfixes.

We anticipate most developers will choose to release a new major version of their plugin that requires Craft 5. However, Craft and the Plugin Store only look at what is required by `composer.json` to determine major-version compatibility.

Either way, you must explicitly declare support for each major Craft version. If a single version of your plugin supports both Craft 4 _and_ 5, you’ll need to use an “or” constraint for your `craftcms/cms` requirement, like `^4.0|^5.0`. Any `craftcms/cms` constraint beginning with `>=` will be treated as `^`.

::: warning
Keep in mind that all versions of PHP 7 are [end-of-life](https://www.php.net/supported-versions.php). Your plugin does _not_ need to support PHP 7 in order to be compatible with Craft 4.
:::

### Custom Modules

The upgrade process for custom modules is very similar, except that you aren’t responsible for versioning.

[Rector](#rector) and [PHPStan](#phpstan) can be installed as a direct dependency of your project, and run against the entire `modules/` directory (or wherever your custom modules live), or one module at a time.

Commit changes to your module at the same time as the rest of the Craft 5 upgrade. We recommend tracking these changes in a separate branch.

---

## New Features

### Bulk Operations

Whenever Craft saves an element, it starts tracking a _bulk save operation_. This allows plugins to act on the final state in a save that _may_ involve multiple elements. If you rely on element save events, consider switching to bulk ops

<See path="events.md" hash="bulk-operations" label="Bulk Saving" description="Learn how to respond to multi-element saves." />

### Enums

PHP 8.1 introduced support for [enumeration classes](https://www.php.net/manual/en/language.types.enumerations.php), so we’ve taken the opportunity to extract some constants. See the `craft\enums` namespace for examples. A major version is the perfect time to adopt this in your own plugin.

::: tip
You may define your plugin’s editions this way, but the base plugin class must still return the available edition handles via a static `editions()` method.
:::

### Database Character Sets

Craft now creates database tables using the `uft8mb4` character set (and `utf8mb4_0900_ai_ci` or `utf8mb4_unicode_ci` collation, on MySQL) by default. Developers are asked during the [upgrade process](../upgrade.md#database-character-set-and-collation) to convert existing tables with inconsistent encoding, so it will generally be safe to save emoji and other multibyte characters directly to the database.

Calls to `craft\helpers\StringHelper::emojiToShortcodes($string)` and `craft\helpers\StringHelper::shortcodesToEmoji($string)` are no longer strictly necessary; if you are supporting Craft 4 and 5, consider calling `craft\db\Connection::getSupportsMb4()` to pack and unpack strings when saving and loading.

### Composer

A copy of `composer.phar` is included in `craftcms/cms`, so the `composer/composer` package has been dropped as a dependency.

Craft’s internal Composer service remains unchanged. Plugins and other low-level extensions that use the Composer PHP API _directly_ must `require` it. This change does _not_ impact how your plugin is installed by an end-user!

---

## Changes

### Content

Craft 5 has a completely new content storage engine. Plugins that provide element types or field types may require some additional attention.

#### Elements

- Content migration
- Use unified element editor
- Breadcrumbs
- Actions
- Chips and Cards (Link down)

#### Fields

- Supporting multiple instances, criteria for what makes a reliable multi-instance field

### Controller Actions

#### Control Panel Screens

In addition to full-page forms and slideouts, you can now send responses that target more compact _modals_.

```php
$this->asCpModal()???
```

### Services

- After globalizing entry types, remaining Section-related functionality from `craft\services\Sections` has moved to `craft\services\Entries`.

### Control Panel Templates

Craft now prefers `.twig` over `.html` when loading templates rendered in the control panel. Check your plugin for templates with the same names (aside from the extension) and ensure the correct one is being rendered. This behavior is not customizable by plugins or by the project’s developer.

#### Element Chips + Cards

- `elementChip()`
- `elementCard()`
- Actions

#### Editable Tables

`VueAdminTable`, pagination, etc?

### Events



### Filesystems

Asset volumes can now share filesystems, so long as their base paths don’t overlap. If you have any logic that assumes volumes and filesystems are mapped one-to-one, it will need to be updated to account for the possibility that multiple volumes may point to a single filesystem.

You can always get the filesystem for a volume via `craft\models\Volume::getFs()`.

### User Permissions
