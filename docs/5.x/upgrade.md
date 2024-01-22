---
sidebarDepth: 2
---

# Upgrading from Craft 4

The smoothest way to upgrade to Craft 5 is to start with a [fully-updated Craft 4 project](/4.x/updating.md).

## Preparing for the Upgrade

Let’s take a moment to audit and prepare your project.

- Your **live site** must be running the [latest version](repo:craftcms/cms/releases) of Craft 4;
- The most recent Craft 4-compatible versions of all plugins are installed, and Craft 5-compatible versions are available;
- Your project is free of [deprecation warnings](https://craftcms.com/knowledge-base/preparing-for-craft-5#fix-deprecation-warnings) after thorough testing on the latest version of Craft 4;
- All your environments meet Craft 5’s [minimum requirements](requirements.md) (the latest version of Craft 4 supports all the same );
- You’ve reviewed the breaking changes in Craft 5 further down this page and understand that additional work and testing may lie ahead, post-upgrade;

Once you’ve completed everything above, you’re ready to start the upgrade process!

::: tip
If your project uses custom plugins or modules, we have an additional [extension upgrade guide](extend/updating-plugins.md).
:::

## Performing the Upgrade

Like [any other update](update.md), it’s essential that you have a safe place to test the upgrade prior to rolling it out to a live website.

These steps assume you have a local development environment that meets Craft 5’s [requirements](requirements.md), and that any changes made [in preparation for the upgrade](#preparing-for-the-upgrade) have been deployed to your live site.

::: tip
[DDEV](https://ddev.com/) users should take this opportunity to update so that the `craftcms` project type reflects our latest recommendations.

In an existing DDEV project, you can change the PHP or database version with the `config` command:

```bash
ddev config --php-version=8.2
ddev config --database=mysql:8.0
ddev start
```
:::

1. Capture a fresh database backup from your live environment and import it.
1. Make sure you don’t have any pending or active jobs in your queue.
1. Run `php craft project-config/rebuild` and allow any new background tasks to complete.
1. Capture a database backup of your _local_ environment, just in case things go sideways.
1. Edit your project’s `composer.json` to require `"craftcms/cms": "^5.0.0"` and Craft-5-compatible plugins, all at once.
    ::: tip
    You’ll need to manually edit each plugin version in `composer.json`. If any plugins are still in beta, you may need to change your [`minimum-stability`](https://getcomposer.org/doc/04-schema.md#minimum-stability) and [`prefer-stable`](https://getcomposer.org/doc/04-schema.md#prefer-stable) settings.
    :::

    You may also need to add `"php": "8.2"` to your [platform](https://getcomposer.org/doc/06-config.md#platform) requirements, or remove it altogether.
1. Run `composer update`.
1. Make any required changes to your [configuration](#configuration).
1. Run `php craft migrate/all`.
1. Review the [platform-specific](#optional-conditional-steps) steps, below.

Your site is now running Craft 5! If you began this process with no deprecation warnings, you’re nearly done.

::: warning
Thoroughly review the list of changes on this page, making note of any features you use in templates or modules. Only a fraction of your site’s code is actually evaluated during an upgrade, so it’s your responsibility to check templates and modules for consistency. You may also need to follow any plugin-specific upgrade guides, like [Upgrading to Commerce 4](/commerce/4.x/upgrading.md).
:::

Once you’ve verified everything’s in order, commit your updated `composer.json`, `composer.lock`, and `config/project/` directory (along with any template, configuration, or module files that required updates) and deploy those changes normally in each additional environment.

### Platform-Specific Steps

Additional steps may be required for projects that use specific technologies.

#### MySQL Character Sets

If you’re using MySQL, we recommend running [`php craft db/convert-charset`](console-commands.md#db-convert-charset) along with the upgrade process to ensure optimal database performance.

## Breaking Changes and Deprecations

Features deprecated in Craft 4 may have been fully removed or replaced in Craft 4, and new deprecations have been flagged in Craft 5.

::: warning
This list focuses on high-traffic, user-facing features. Review the [complete changelog](repo:craftcms/cms/blob/main/CHANGELOG.md) for information about changes to specific APIs, including class deprecations, method signatures, and so on.
:::

### Configuration

The following settings have been changed.

#### Template Priority

The `defaultTemplateExtensions` config setting now lists `twig` before `html`, by default. This means that projects with templates that share a name (i.e. `widget.twig` and `widget.html`, _in the same directory_) may behave differently in Craft 5. Audit your `templates/` directory for any overlap to ensure consistent rendering. If all your templates use one extension or another, no action is required!

This setting only affects rendering of templates in the front-end; the control panel will always use `.twig` files before `.html`.

#### Volumes & Filesystems

Multiple [asset volumes](reference/element-types/assets.md) can now share a filesystem! However, they must be carefully arranged such that each volume has a unique and non-overlapping base path.

::: warning
When selecting a filesystem, options that would result in a collision between two volumes are not shown. This means that you may need to adjust multiple volumes’ configuration in order to consolidate them into a single filesystem.
:::

### Templates

#### Variables

With the elimination of Matrix Blocks as a discrete element type, we have removed the associated element query factory function from <craft5:craft\web\twig\CraftVariable>.

| Old | New |
| --- | --- |
| `craft.matrixBlocks()` | `craft.entries()` |

## Elements & Content

Craft 5 has an entirely new content storage architecture that underpins many other features.

### Content Table

The content table has been eliminated! Elements now store their content in the `elements_sites` table, alongside other localized properties.

Content is stored as a JSON blob, and is dynamically indexed by the database in such a way that all your existing element queries will work without modification.

#### Advanced Queries

<Todo notes="Explain that you don't need special column names any more." />
<Todo notes="Clarify how field reuse affects queries" />

### Matrix Fields

During the upgrade, Craft will automatically migrate all your Matrix field content to entries. In doing so, new globally-accessible fields will be created with this format:

::: code
``` Name
{Matrix Field Name} - {Block Type Name} - {Field Name}
```
``` Handle
{matrixFieldHandle}_{blockTypeHandle}_{fieldHandle}
```
:::

#### Consolidating Fields

<Todo notes="This hasn't been implemented yet—but likely a console command?" />

## Plugins and Modules

Plugin authors (and module maintainers) should refer to our guide on [updating Plugins for Craft 4](extend/updating-plugins.md).
