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
1. Note your current **Temp Uploads Location** setting in **Settings** &rarr; **Assets** &rarr; **Settings**.
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

This setting only affects rendering of templates in the front-end; the control panel will _always_ use `.twig` files before `.html`.

#### Volumes & Filesystems

Multiple [asset volumes](reference/element-types/assets.md) can now share a filesystem! However, they must be carefully arranged such that each volume has a unique and non-overlapping base path.

::: warning
When selecting a filesystem, options that would result in a collision between two volumes are not shown. This means that you may need to adjust multiple volumes’ configuration in order to consolidate them into a single filesystem.
:::

### Templates

#### Variables

With the elimination of Matrix blocks as a discrete element type, we have removed the associated element query factory function from <craft5:craft\web\twig\CraftVariable>.

| Old | New |
| --- | --- |
| `craft.matrixBlocks()` | `craft.entries()` |

::: tip
See the section on [Matrix fields](#matrix-fields) for more information about these changes.
:::

## Elements & Content

Craft 5 has an entirely new content storage architecture that underpins many other features.

### Content Table

The content table has been eliminated! Elements now store their content in the `elements_sites` table, alongside other localized properties.

Content is stored as a JSON blob, and is dynamically indexed by the database in such a way that all your existing element queries will work without modification.

#### Advanced Queries

When using custom fields in advanced `where()` conditions, you no longer need to assemble a column prefix/suffix. Instead, Craft can generate the appropriate expression to locate values in the JSON content column:

::: code
```twig{10} Twig
{# Locate the field layout element that would save to the desired column: #}
{% set entryType = craft.app.entries.getEntryTypeByHandle('post') %}
{% set fieldLayout = entryType.getFieldLayout() %}
{% set sourceField = fieldLayout.getFieldByHandle('source') %}

{% set entriesFromPhysicalMedia = craft.entries()
  .section('news')
  .andWhere([
    'like',
    sourceField.getValueSql(),
    ['print', 'paper', 'press']
  ])
  .all() %}
```
```php{12} PHP
use Craft;
use craft\elements\Entry;

$entryType = Craft::$app->getEntries()->getEntryTypeByHandle('post');
$fieldLayout = $entryType->getFieldLayout();
$sourceField = $fieldLayout->getFieldByHandle('source');

$entriesFromPhysicalMedia = Entry::find()
  ->section('news')
  ->andWhere([
    'like',
    $sourceField->getValueSql(),
    ['print', 'paper', 'press'],
  ])
  ->all();
```
:::

While this may appear more convoluted, initially, it ensures that you are querying for the correct instance of a [multi-instance field](), each of which will store their content under a different key in their respective field layouts.

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

Those fields are then assigned to new [entry types](./reference/element-types/entries.md#entry-types) that replace your existing Matrix blocks. Entry type handles

Queries for nested entries will be largely the same—equivalent methods have been added to <craft5:craft\elements\db\EntryQuery> to enable familiar usage. The `.owner()` method still accepts a list of elements that the results must be owned by, and the `field()` and `fieldId()` methods narrow the results by specific fields.

::: warning
Values passed to the `type()` method are apt to require updates, as the migrated entry types may receive new handles. For example, a Matrix field that contained a block type with the handle `gallery` might conflict with an existing section; in that event, the new entry type for that block would get the handle `gallery1` (or potentially `gallery2`, `gallery3`, and so on, if multiple similar Matrix fields are being migrated).

Visit **Settings** &rarr; **Entry Types** to check if any handles appear to have collided in this way, then review and update templates as necessary.
:::

#### Consolidating Fields

We plan to introduce a console command to handle merging similar fields, after the upgrade. There is no harm in running your project with extra fields during the beta period.

### Eager-Loading

[Eager-loading](development/eager-loading.md) has been dramatically simplified for most sites. You no longer need to tell Craft which relational fields to load via the `.with()` query method—instead, call `.eagerly()` on any query that _may_ result in an N+1 problem to automatically eager-loading:

::: code
```twig Before
{% set articles = craft
    .entries()
    .section('blog')
    .with([
        ['featureImage'],
    ])
    .all() %}

{% for article in article %}
  {% set image = article.featureImage|first %}
  {% if image %}
    {{ image.getImg() }}
  {% endif %}
{% endfor %}
```
```twig After
{% set articles = craft
    .entries()
    .section('blog')
    .all() %}

{% for article in article %}
  {% set image = article.featureImage.eagerly().one() %}

  {# Testing whether there was a result is still a good idea: #}
  {% if image %}
    {{ image.getImg() }}
  {% endif %}
{% endfor %}
```
:::

This feature does have _some_ limitations, though. While it will work for all elements connected via a [relational](system/relations.md) or Matrix field, you will still need to explicitly eager-load native attributes like entries’ `author` (and now `authors`, _plural_) or assets’ `uploader`. Craft can only detect eager-loading opportunities when the original attribute or value is an element query. The two strategies can be safely combined, though:

```twig
{% set articles = craft
    .entries()
    .section('blog')
    .with([
      ['author'],
    ])
    .all() %}

{% for article in article %}
  {# Lazily-eager-loaded relation: #}
  {% set image = article.featureImage.eagerly().one() %}

  {% if image %}
    {{ image.getImg() }}
  {% endif %}

  {# Explicitly eager-loaded element: #}
  <span>{{ entry.author.fullName }}</span>
{% endfor %}
```

<See path="development/eager-loading.md" description="Read more about opportunities to optimize your templates with automatic and manual eager-loading." />

## Assets

### Reusable Filesystems

Filesystems can now be shared by multiple asset volumes, so long as each volume as a unique and non-overlapping base path. The [assets](./reference/element-types/assets.md) page has more information on this new behavior.

### Temporary Filesystem

The new <config5:tempAssetUploadFs> general config setting has replaced the **Temp Uploads Location** setting in the **Settings** &rarr; **Assets** &rarr; **Settings** screen. If you noted a custom asset volume in the upgrade process, you will need to follow these steps to set up a distinct filesystem for temporary uploads. Otherwise, Craft will use the legacy behavior and fall back on an instance of <craft5:craft\fs\Temp>, which puts temporary uploads in a folder in your local [`storage/` directory](system/directory-structure.md).

::: tip
Load-balanced or ephemeral environments that rely on a centralized storage solution should define a temporary upload filesystem using the steps below.
:::

The location of temporary uploads is now defined by way of a _filesystem_ instead of a _volume_:

1. Create a new filesystem by visiting **Settings** &rarr; **Filesystems**, giving it an appropriate **Name** and **Handle** (users will not see this, so something like “Temporary” or “Scratch” is fine).
1. Set the **Base Path** to agree with the old volume, keeping in mind that previously, its subpath and its filesystem’s base path were combined.
1. Add the handle you chose to your [general config](reference/config/general.md#tempassetuploadfs) file or define a `CRAFT_TEMP_ASSET_UPLOAD_FS` [environment override](configure.md#environment-overrides).

A filesystem designated by your `tempAssetUploadFs` setting cannot be reused for volumes or image transforms, so it will not appear in filesystem selection menus. If you elect to define the temporary uploads filesystem handle via an _environment variable_, be sure and add it to your other environments as well!

## Plugins and Modules

Plugin authors (and module maintainers) should refer to our guide on [updating Plugins for Craft 5](extend/updating-plugins.md).
