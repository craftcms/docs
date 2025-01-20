---
sidebarDepth: 2
description: Take a peek at what’s new in Craft 5.
---

# Upgrading from Craft 4

The smoothest way to upgrade to Craft 5 is to make sure your live site is already running the [latest version of Craft 4](/4.x/updating.md). We recommend approaching the upgrade in three phases: [preparation](#preparing-for-the-upgrade), a [local upgrade](#performing-the-upgrade), and [rollout](#going-live) to live environments.

<!-- more -->

## Preparing for the Upgrade

Let’s take a moment to audit and prepare your project.

- Your **live site** must be running the [latest version](repo:craftcms/cms/releases) of Craft 4 (you cannot upgrade directly from Craft 3 to Craft 5);
- The most recent Craft 4-compatible versions of all plugins are installed, and Craft 5-compatible versions are available;
- Your project is free of deprecation warnings after thorough testing on the latest version of Craft 4;
- All your environments meet Craft 5’s [minimum requirements](requirements.md) (the latest version of Craft 4 will run in any environment that meets Craft 5’s requirements, so it’s safe to update PHP and your database ahead of the 5.x upgrade):
    - PHP 8.2
    - MySQL 8.0.17+ using InnoDB, MariaDB 10.4.6+, or PostgreSQL 13+
- You’ve reviewed the breaking changes in Craft 5 further down this page and understand that additional work and testing may lie ahead, post-upgrade;

Once you’ve completed everything above, you’re ready to start the upgrade process!

::: tip
If your project uses custom plugins or modules, we have an additional [extension upgrade guide](extend/updating-plugins.md).
:::

## Performing the Upgrade

Like [any other update](update.md), it’s essential that you have a safe place to test the upgrade prior to rolling it out to a live website.

These steps assume you have a local development environment that meets Craft 5’s [requirements](requirements.md), and that any changes made [in preparation for the upgrade](#preparing-for-the-upgrade) have been deployed to your live site.

<Block label="Upgrading with DDEV">

[DDEV](https://ddev.com/) users should take this opportunity to [update](https://ddev.readthedocs.io/en/stable/users/install/ddev-upgrade/) so that the `craftcms` project type reflects our latest recommendations.

In an existing DDEV project, you can change the PHP or database version with the `config` command…

```bash
ddev config --php-version=8.2
ddev config --database=mysql:8.0
ddev start
```

…or use `ddev config --update` to reapply project type defaults.

</Block>

1. Capture a fresh database backup from your live environment and import it.
1. Make sure you don’t have any pending or active jobs in your queue.
1. Run `php craft project-config/rebuild` and allow any new background tasks to complete.
1. Run `php craft utils/fix-field-layout-uids`.
1. Deploy any project config changes to your live environment. (Be sure to run `php craft up` or `php craft pc/apply`.)
1. Note your current **Temp Uploads Location** setting in **Settings** &rarr; **Assets** &rarr; **Settings**.
1. MySQL users: Add your database’s _current_ character set and collation to `.env`. If you have always used Craft’s defaults, this will be:

    ```bash
    CRAFT_DB_CHARSET="utf8mb3"
    CRAFT_DB_COLLATION="utf8mb3_general_ci"
    ```

    Read more about this process in the [Database Character Set and Collation](#database-character-set-and-collation) section, below.

1. Edit your project’s `composer.json` to require `"craftcms/cms": "^5.0.0"` and Craft-5-compatible plugins, all at once.

    ::: tip
    You’ll need to manually edit each plugin version in `composer.json`. If any plugins are still in beta, you may need to change your [`minimum-stability`](https://getcomposer.org/doc/04-schema.md#minimum-stability) and [`prefer-stable`](https://getcomposer.org/doc/04-schema.md#prefer-stable) settings.
    :::

    While you’re at it, review your project’s [other dependencies](#entry-scripts)! You may also need to add `"php": "8.2"` to your [platform](https://getcomposer.org/doc/06-config.md#platform) requirements, or remove it altogether.

1. Run `composer update`.
1. Make any required changes to your [configuration](#configuration).
1. Run `php craft up`.
1. MySQL users: Remove your database character set and collation settings from `.env` (and `db.php`—even if you didn’t modify it during the upgrade), then run `php craft db/convert-charset`.

Your site is now running Craft 5! If you began this process with no deprecation warnings, you’re nearly done.

::: warning
Thoroughly review the list of changes on this page, making note of any features you use in templates or modules. Only a fraction of your site’s code is actually evaluated during an upgrade, so it’s your responsibility to check templates and modules for consistency. You may also need to follow any plugin-specific upgrade guides.
:::

## Going Live

The Craft 5 upgrade can be run largely unattended during a routine deployment. Once you’ve performed the upgrade in your local environment and everything is working as expected, commit your updated `composer.json`, `composer.lock`, and `config/project/` directory, as well as any template, configuration, or module files that required updates.

::: warning
MySQL users must add the correct [character set and collation settings](#database-character-set-and-collation) to each remote environment for the duration of the upgrade.
:::

Deploy your changes to each environment, then run `php craft up`.

If you added temporary character set or collation settings for the upgrade, remove them now, then run `php craft db/convert-charset` to apply Craft 5’s new defaults to all tables.

Read more about this part of the upgrade in the [Database Character Set and Collation](#database-character-set-and-collation) section, below.

## Cleanup + Optional Steps

### Field and Entry Type Consolidation <Since ver="5.3.0" feature="Field type and entry type consolidation commands" />

Craft 5.3 introduced three new commands for consolidating fields and entry types, post-upgrade:

- `fields/auto-merge` — Automatically discovers functionally identical fields and merges their uses together.
- `fields/merge` — Manually merge one field into another of the same type and update uses of the merged field.
- `entry-types/merge` — Merge one entry type into another and update uses of the merged entry type.

These tools are particularly useful on projects with many Matrix fields containing similar block types, or multiple sections with similar entry types. While the upgrade doesn’t result in _more_ fields or entry types and block types than existed previously, it can result in some ergonomic problems with the new content architecture!

We recommend you approach consolidation in the following order, _after_ getting your project fully upgraded and deployed.

::: warning
In addition to updating project config, this process generates content migrations. You must commit these files to version control and run `craft up` in all other environments to apply the changes!
:::

#### Auto-merging Fields

Your first step should be to try auto-merging field definitions:

```bash
ddev craft fields/auto-merge
```

Craft will audit your fields, and propose batches of merge candidates. To accept a merge, type `y` and press <kbd>Enter</kbd>, then choose the field you want to merge the duplicates into.

The usage of any merged fields in field layouts and templates will remain the same after merging global field definitions. Any overridden names, handles, instructions, and so on will remain. One exception here is if a name or handle override is present but the same as the merged global field’s name: Craft clears the override so that it can be better kept in sync, moving forward.

::: tip
Don’t like how Craft grouped some of the fields? You can skip any proposed merge and come back to the command later—say, after [manually merging](#manually-merging-fields) a few of the fields.
:::

Merged fields’ search keywords are also combined, which may affect the quality of results when [searching by field handles](system/searching.md#multi-instance-fields).

#### Manually Merging Fields

For any additional fields you wish to merge (or merge candidates you skipped in the previous step), run the `fields/merge` command as many times as necessary to consolidate them:

```bash
ddev craft fields/merge myFirstDropdownField mySecondDropdownField
```

To merge multiple fields together, choose the field you want to persist, and run the command multiple times, passing each redundant field as the first argument, and the target field as the second, i.e:

```bash
ddev craft fields/merge ctaDonate ctaAbout
ddev craft fields/merge ctaStaff ctaAbout
ddev craft fields/merge ctaFoundation ctaAbout
```

#### Merging Entry Types

Once your field definitions have been consolidated, merging entry types is greatly simplified. Here’s how Craft handles fields during a merge:

- Any field instances that map to the same custom field (and have the same handle) will be left alone in the persistent entry type.
- Any single-instance fields that exist in both entry types (but with _different_ handles) will be left alone in the persistent entry type, and the command will note the handle change for fields of the outgoing entry type.
- Any other fields in the outgoing entry type will be added to the persistent entry type under a “Merged Fields” tab. Any handle conflicts will be resolved by incrementing the handle of the merged field, and the handle change will be noted in the command’s output.

There is no “automatic” equivalent for merging entry types—each merge must be run manually:

```bash
ddev craft entry-types/merge quote pullQuote
```

To merge entry types, Craft takes the following actions:

1. The persistent entry type’s field layout is updated with any new fields from the outgoing entry type.
1. Sections and fields that use the outgoing entry type are updated to use the persistent entry type, instead (if it wasn’t already available in that context).
1. The outgoing entry type is removed.
1. A content migration is generated an run, remapping entries of the outgoing entry type to the persistent one, and entries’ JSON content is updated with the correct layout element UUIDs.

::: warning
Merging is concerned only with custom fields. Other field layout elements (like tips, rules, breaks, or templates) are _not_ merged into the persisted entry type.
:::

### Entry Scripts

Older projects may use versions of [`vlucas/phpdotenv`](repo:vlucas/phpdotenv) (the library that loads variables from your `.env` file) that depend on features deprecated in PHP 8.1. If you encounter errors during (or after) installation, change your `vlucas/phpdotenv` dependency in `composer.json` to `^5.6.0`, then run `composer update`.

Along with this update, you’ll need to integrate changes from our [starter project](repo:craftcms/craft)’s `web/index.php` script and `craft` executable. If you have done any low-level customization of Craft via [bootstrap constants](configure.md#bootstrap-config), make sure those values are preserved in the appropriate file(s)—constants shared between the two files can be moved to a common [`bootstrap.php` file](repo:craftcms/craft/blob/5.x/bootstrap.php).

## Breaking Changes and Deprecations

Features deprecated in Craft 4 may have been fully removed or replaced in Craft 5, and new deprecations have been flagged in Craft 5.

::: warning
This list focuses on high-traffic, user-facing features. Review the [complete changelog](repo:craftcms/cms/blob/5.x/CHANGELOG.md) for information about changes to specific APIs, including class deprecations, method signatures, and so on.
:::

### Configuration

The following settings have been changed.

#### Database Character Set and Collation

MySQL 8.0 [deprecated the `utf8mb3` character set](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb3.html), as well as [the use of `utf8` as an alias for `utf8mb3`](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8.html). MySQL [recommends `utf8mb4`](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html) instead, and it’s expected that `utf8` will become an alias for `utf8mb4` in MySQL 8.1.

To ease that transition, Craft 5 is proactively treating `utf8` as `utf8mb4` for MySQL and MariaDB installs.

<Block label="During the Upgrade">

Explicitly setting the character set and collation ensures compatibility of new tables _during_ the upgrade—afterwards, those settings can be scrubbed and the tables can be converted via Craft’s CLI. Here’s how this will look, in practice.

If you have never customized character set or collation settings for your database connection, set these variables in your `.env` file during the upgrade:

```bash
CRAFT_DB_CHARSET="utf8mb3"
CRAFT_DB_COLLATION="utf8mb3_general_ci"
```

If you _are_ using these settings (either from `.env` or `db.php`), they can be left as-is, for now.

Once the upgrade is complete in an environment, convert your tables to `utf8mb4` by _removing_ the `CRAFT_DB_CHARSET` and `CRAFT_DB_COLLATION` environment variables (and clearing any `charset` and `collation` settings from `db.php`)…

```bash
# …or set them to Craft’s defaults…
CRAFT_DB_CHARSET="utf8mb4"
CRAFT_DB_COLLATION="utf8mb4_0900_ai_ci" # MySQL
CRAFT_DB_COLLATION="utf8mb4_unicode_ci" # MariaDB
```

…then running `php craft db/convert-charset`.

</Block>

#### Template Priority

The <config5:defaultTemplateExtensions> config setting now lists `twig` before `html`, by default. This means that projects with templates that share a name (i.e. `widget.twig` and `widget.html`, _in the same directory_) may behave differently in Craft 5. Audit your `templates/` directory for any overlap to ensure consistent rendering. If all your templates use one extension or another, no action is required!

This setting only affects rendering of templates in the front-end; the control panel will _always_ use `.twig` files before `.html`.

#### Volumes & Filesystems

Multiple [asset volumes](reference/element-types/assets.md) can now share a filesystem! However, they must be carefully arranged such that each volume has a unique and non-overlapping base path.

::: warning
When selecting a filesystem, options that would result in a collision between two volumes are not shown. This means that you may need to adjust multiple volumes’ configuration in order to consolidate them into a single filesystem.
:::

### Templates

#### Variables

With the elimination of Matrix blocks as a discrete element type, we have removed the associated element query factory function from <craft5:craft\web\twig\variables\CraftVariable>.

| Old | New |
| --- | --- |
| `craft.matrixBlocks()` | `craft.entries()` |

::: tip
See the section on [Matrix fields](#matrix-fields) for more information about these changes.
:::

### GraphQL

The reusability of entry types means that some GraphQL queries have changed.

- GraphQL types corresponding to entry types no longer include their section names. In Craft 4, entries a section named “Ingredients” with the entry type “Ingredient” might have been represented in GraphQL as a type named `ingredients_ingredient_Entry`. That type would now be named `ingredient_Entry`.

    Entries can still be queried by section using the corresponding query type (i.e. `ingredientsEntries`) or the `section` argument for the generic `entries` query:

    ::: code
    ```gql{2} Section Query
    query MyIngredients {
      ingredientsEntries {
        ... on ingredient_Entry {
          title
        }
      }
    }
    ```
    ```gql{2} Generic Query
    query MyIngredients {
      entries(section: "ingredients") {
        ... on ingredient_Entry {
          title
        }
      }
    }
    ```
    :::

    The corresponding queries for entries nested within a Matrix field would look like this:

    ::: code
    ```gql{2} Field Query
    query DifficultSteps {
      stepsFieldEntries(difficulty: "hard") {
        ... on step_Entry {
          title
          estimatedTime
        }
      }
    }
    ```
    ```gql{2} Generic Query
    query DifficultSteps {
      entries(field: "steps", difficulty: "hard") {
        ... on step_Entry {
          title
          estimatedTime
        }
      }
    }
    ```

- The names of mutations targeting entries in a particular section remain unchanged, and still include the section and entry type handles, i.e: `save_ingredients_ingredient_Entry` and `save_ingredients_ingredient_Draft`.
- Mutations directly targeting nested entries in Matrix fields will use a similar structure, but combining the field handle and entry type handle: `save_stepsField_step_Entry`.
- When mutating a Matrix field value via GraphQL, the nested entries must be passed under an `entries` key instead of a `blocks` key:

    ```gql{2,5}
    mutation AddStep {
      save_recipes_recipe_Entry(
        title: "Yummy Bits and Bytes"
        summary: "Chocolate chip cookies that are out of this world!"
        steps: {
          entries: [
            {
              step: {
                difficulty: "hard",
                instructions: "Preheat oven to 20,000,000°F",
                estimatedTime: 120,
                id: "new:1"
              }
            }
            # ...
          ],
          sortOrder: [
            "new-first"
          ]
        }
      ) {
        title
        id
      }
    }
    ```

### Field Types

#### URL &rarr; Link <Since ver="5.3.0" feature="Link fields" />

URL fields will be converted to [Link](reference/field-types/link.md) fields during the upgrade. Your templates _do not_ require any updates, but projects that use custom field values in PHP may need to update type hints or use a specific member of the new <craft5:craft\fields\data\LinkData> object:

::: code
```php Old
use craft\base\Element;

class MyHelper
{
    public static function getUrl(Element $element, string $fieldHandle): string
    {
        return $element->$fieldHandle;
    }
}
```
```php{6} New (Types)
use craft\base\Element;
use craft\fields\data\LinkData;

class MyHelper
{
    public static function getUrl(Element $element, string $fieldHandle): LinkData
    {
        // The return type is now an object instead of a string!
        return $element->$fieldHandle;
    }
}
```
```php{9} New (Member)
use craft\base\Element;
use craft\fields\data\LinkData;

class MyHelper
{
    public static function getUrl(Element $element, string $fieldHandle): string
    {
        // The signature can stay the same if you return a specific property:
        return $element->$fieldHandle->url;
    }
}
```
:::

The new field type supports linking to elements, in addition to text-based URLs—[check out its options](reference/field-types/link.md#settings) to see if it can help simplify some of your authoring interfaces!

## Elements & Content

Craft 5 has an entirely new content storage architecture that underpins many other features.

### Content Table

The content table has been eliminated! Elements now store their content in the `elements_sites` table, alongside other localized properties.

Content is stored as a JSON blob, and is dynamically indexed by the database in such a way that all your existing element queries will work without modification.

#### Advanced Queries

When using custom fields in [advanced `where()` conditions](development/element-queries.md#advanced-element-queries), you no longer need to manually assemble a database column prefix/suffix. Instead, Craft can generate the appropriate expression to locate values in the JSON content column:

::: code
```twig{12} Twig
{% set entriesFromPhysicalMedia = craft.entries()
  .section('news')
  .andWhere([
    'or like',
    fieldValueSql(entryType('post'), 'sourceMedia'),
    ['print', 'paper', 'press']
  ])
  .all() %}
```
```php{12} PHP
use Craft;
use craft\elements\Entry;

$entryType = Craft::$app->getEntries()->getEntryTypeByHandle('post');
$fieldLayout = $entryType->getFieldLayout();
$sourceField = $fieldLayout->getFieldByHandle('sourceMedia');

$entriesFromPhysicalMedia = Entry::find()
  ->section('news')
  ->andWhere([
    'or like',
    $sourceField->getValueSql(),
    ['print', 'paper', 'press'],
  ])
  ->all();
```
:::

This ensures that you are querying for the correct instance of a [multi-instance field](system/fields.md#multi-instance-fields), each of which will store their content under a different UUID in their respective field layouts.

Craft already knows how to query against the appropriate instance of a field when using its handle as a query method, so this is only necessary for complex or compound conditions that make use of low-level query builder features.

#### Case-Sensitivity

MySQL users should review queries against [textual custom field values](development/element-queries.md#case-sensitivity) for consistency. The following query using a lower-case name will no longer match a capitalized value:

```twig
{% set entries = craft.entries()
  .section('departments')
  .deptHeadNameFirst('oli')
  .all() %}
```

If you don’t have control over the query _value_ (say, it comes from a third-party feed), consider updating the query to use the new `caseInsensitive` option:

```twig
{% set entries = craft.entries()
  .section('departments')
  .deptHeadNameFirst({
    value: 'oli',
    caseInsensitive: true,
  })
  .all() %}
```

You may also want to review any [custom sources](system/elements.md#sources) that use condition rules targeting the [affected field types](development/element-queries.md#case-sensitivity).

### Matrix Fields

During the upgrade, Craft will automatically migrate all your Matrix field content to entries. In doing so, new globally-accessible fields will be created with a unique name:

```
{Matrix Field Name} - {Block Type Name} - {Field Name}
```

These fields are then assigned to new [entry types](./reference/element-types/entries.md#entry-types) that replace your existing Matrix block types.

::: tip
Field labels and handles are retained, within their field layouts—even if they collide with other fields in the [global space](./system/fields.md#multi-instance-fields)!
:::

Queries for nested entries will be largely the same—equivalent methods have been added to <craft5:craft\elements\db\EntryQuery> to enable familiar usage. The `.owner()` method still accepts a list of elements that the results must be owned by, and the `field()` and `fieldId()` methods narrow the results by those belonging to specific fields.

::: warning
Values passed to the `type()` method of [entry queries](./reference/element-types/entries.md#querying-entries) may require updates, as migrated entry types _can_ receive new handles. For example, a Matrix field that contained a block type with the handle `gallery` might conflict with a preexisting entry type belonging to a section; in that event, the new entry type for that block would get the handle `gallery1` (or potentially `gallery2`, `gallery3`, and so on, if multiple similar Matrix fields are being migrated).

Visit **Settings** &rarr; **Entry Types** to check if any handles appear to have collided in this way, then review and update templates as necessary.

_Matrix block IDs were not stable in Craft 4, and will change as they are converted to entry types. If you maintain code that loads Matrix block definitions by hard-coded IDs, it will no longer work in Craft 5._
:::

### Eager-Loading

[Eager-loading](development/eager-loading.md) has been dramatically simplified for most sites. You no longer need to tell Craft which relational fields to load via the `.with()` query method—instead, call `.eagerly()` on any query that _may_ result in an N+1 problem to automatically trigger eager-loading:

::: code
```twig Before
{% set articles = craft
    .entries()
    .section('blog')
    .with([
        ['featureImage'],
    ])
    .all() %}

{% for article in articles %}
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

{% for article in articles %}
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

{% for article in articles %}
  {# Lazily-eager-loaded relation: #}
  {% set image = article.featureImage.eagerly().one() %}

  {% if image %}
    {{ image.getImg() }}
  {% endif %}

  {# Explicitly eager-loaded element: #}
  <span>{{ article.author.fullName }}</span>
{% endfor %}
```

<See path="development/eager-loading.md" description="Read more about opportunities to optimize your templates with automatic and manual eager-loading." />

## Assets

### Reusable Filesystems

Filesystems can now be shared by multiple asset volumes, so long as each volume has a unique and non-overlapping base path. The [assets](./reference/element-types/assets.md) page has more information on this new behavior.

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
