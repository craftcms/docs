# Upgrading from Craft 3

The first step to upgrading your site to Craft 4 is updating the CMS itself.

## Preparing for the Upgrade

Before you begin, make sure that:

- you’ve reviewed the changes in Craft 4 further down this page
- all your environments meet Craft 4’s [minimum requirements](requirements.md)
    - [PHP 8.0.2+ and MySQL 5.7.8+, MariaDB 10.2.7+, or PostgreSQL 10+](https://craftcms.com/knowledge-base/preparing-for-craft-4#upgrade-your-environment)
    - newly-required PHP extensions: [BCMath](https://www.php.net/manual/en/book.bc.php) and [Intl](http://php.net/manual/en/book.intl.php)
- your site is running [the latest **Craft 3.7** release](https://craftcms.com/knowledge-base/preparing-for-craft-4#update-to-the-latest-version-of-craft-3)
- your plugins are up to date and you’ve verified that they’ve been updated for Craft 4
- you’ve made sure there are no [deprecation warnings](https://craftcms.com/knowledge-base/preparing-for-craft-4#fix-deprecation-warnings) anywhere that need fixing

Once you’ve completed everything above you can continue with the upgrade process.

::: tip
If you’ve got custom plugins or modules, running Craft’s [Rector](extend/updating-plugins.md#rector) ruleset might save you some time!
:::

## Performing the Upgrade

The best way to upgrade a Craft 3 site is to get everything squeaky-clean and up to date all at once, then proceed like it’s a normal software update.

1. Pull a fresh database backup down from your production environment and import it locally.
2. If your database has `entrydrafts` and `entryversions` tables, check them for any meaningful data. Craft 3.2 stopped using these tables when drafts and revisions became elements, and the tables will be removed as part of the Craft 4 install process.
3. Make sure you don’t have any pending or active jobs in your queue.
4. Run `php craft project-config/rebuild` and make sure all background tasks have completed.
5. Create a new database backup just in case things go sideways.
6. Edit your project’s `composer.json` to require `"craftcms/cms": "^4.0.0"` and Craft-4-compatible plugins all at once.\
(You may also need to update your platform requirement to `php: "8.0.2"`.)
    ::: tip
    You’ll need to manually edit each plugin version in `composer.json`, and you may need to change your [`minimum-stability`](https://getcomposer.org/doc/04-schema.md#minimum-stability)—and include `"prefer-stable": true`—if you’re including beta versions of plugins.
    :::
7. Run `composer update`.
8. Run `php craft migrate/all`.

Now that you’ve upgraded your install to use Craft 4, please take some time to review the changes on this page and update your project. You may also need to follow any plugin-specific upgrade guides, like [Upgrading to Commerce 4](/commerce/4.x/upgrading.md).

Once you’ve verified everything’s looking great, commit your updated `composer.json`, `composer.lock`, and `config/project/` directory and roll those changes out normally into each additional environment.

::: tip
If you’re using MySQL, we recommend running [`php craft db/convert-charset`](console-commands.md#db-convert-charset) along with the upgrade process to ensure optimal database performance.
:::

## Configuration

### Config Settings

Some config settings have been removed in Craft 4:

| File                 | Setting                   | Note
| -------------------- | ------------------------- | -----------------
| `config/general.php` | `customAsciiCharMappings` | Deprecated in 3.0.10. Submit corrections to [Stringy](https://github.com/voku/Stringy).
| `config/general.php` | `siteName`                | Set in the control panel, optionally using environment variables. (See [example](https://craftcms.com/knowledge-base/preparing-for-craft-4#replace-siteName-and-siteUrl-config-settings).)
| `config/general.php` | `siteUrl`                 | Set in the control panel, optionally using environment variables. (See [example](https://craftcms.com/knowledge-base/preparing-for-craft-4#replace-siteName-and-siteUrl-config-settings).)
| `config/general.php` | `suppressTemplateErrors`  | 
| `config/general.php` | `useCompressedJs`         | Craft always serves compressed JavaScript files now.
| `config/general.php` | `useProjectConfigFile`    | Project config always writes YAML now, but you can [manually control when](https://craftcms.com/docs/4.x/project-config.html#manual-yaml-file-generation).

::: tip
You can now set your own config settings—as opposed to those Craft supports—from `config/custom.php`. Any of your [custom config settings](config/README.md#custom-config-settings) will be accessible via `Craft::$app->config->custom->{mycustomsetting}`.
:::

### Volumes

Volumes have changed a bit in Craft 4.

In Craft 3, Volumes were for storing custom files and defining their associated field layouts. In Craft 4, the field layouts work exactly the same but URLs and storage settings are moved to a new concept called a “Filesystem”.

Craft 4 Volume settings:

![Screenshot of a Craft 4 Volume’s settings that includes the new Filesystem dropdown field.](./images/volume.png)

Craft 4 Filesystem settings:

![Screenshot of a Craft 4 Filesystem’s settings, which include former volume type settings like Base Path, Base URL, and Filesystem Type.](./images/filesystem.png)

You can create any number of filesystems, giving each one a handle, and you designate one filesystem for each volume. Since this can be set to an environment variable, you can define all the filesystems you need in different environments and easily swap them out depending on the actual environment you’re in.

::: tip
You’ll want to create one filesystem per volume, which should be fairly quick since filesystems can be created in slideouts without leaving the volume settings page.
:::

The migration process will take care of volume migrations for you, but there are two cases that may require your attention:

1. `volumes.php` files are no longer supported—so you’ll need to use filesystems accordingly if you’re swapping storage methods in different environments.
2. Any filesystems without public URLs should designate a transform filesystem in order to have control panel thumbnails. Craft used to store generated thumbnails separately for the control panel—but it will now create them alongside your assets just like front-end transforms.

## Logging

Logs in Craft 4 now use [Monolog](https://github.com/Seldaek/monolog), which comes with some behavior changes.

- 404s are no longer logged by default. You can customize this in `config/app.php` via `components.log.monologTargetConfig.except`:
    ```php
    'components' => [
        'log' => [
            'monologTargetConfig' => [
                'except' => [
                    \yii\i18n\PhpMessageSource::class . ':*',
                    // *Do* log 404s (commented for illustration)
                    // \yii\web\HttpException::class . ':404',
                ]
            ]
        ]
    ],
    ```
- Query logging is no longer enabled by default when `devMode` is set to `false`. This can be changed using the new [enableLogging](./config/db-settings.md#enablelogging) config setting in `config/db.php`.
- Query profiling is no longer enabled by default when `devMode` is set to `false`. This can be changed using the new [enableProfiling](./config/db-settings.md#enableprofiling) config setting in `config/db.php`.
- When [CRAFT_STREAM_LOG](./config/#craft-stream-log) is set to `true`, file logging will **not** be enabled.

::: tip
See <craft4:craft\log\MonologTarget> for a look at Craft’s default log configuration.
:::

Any existing custom log components defined in `config/app.php`, `config/web.php`, or `config/console.php` may require changes noted below.

The following PHP classes have been removed:

| Class                                        | What to do instead                                                  |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `\craft\log\FileTarget`                      | Configure Monolog targets via `components.log.monologTargetConfig`. |
| `\craft\log\StreamLogTarget`                 | Configure Monolog targets via `components.log.monologTargetConfig`. |
| `\craft\helpers\App::getDefaultLogTargets()` | Add additional log targets via `components.log.targets`.            |
| `\craft\helpers\App::logConfig`              | Define your own log component using `yii\log\Dispatcher`.           |

The following PHP methods have been removed:

| Method                                       | What to do instead                                        |
| -------------------------------------------- | --------------------------------------------------------- |
| `\craft\helpers\App::getDefaultLogTargets()` | Add additional log targets via `components.log.targets`.  |
| `\craft\helpers\App::logConfig`              | Define your own log component using [yii\log\Dispatcher](yii2:yii\log\Dispatcher). |

## PHP Constants

Some PHP constants have been deprecated in Craft 4, and will no longer work in Craft 5:

| Old PHP Constant | What to do instead
| ---------------- | ----------------------------------------
| `CRAFT_SITE_URL` | Environment-specific site URLs can be defined [via environment variables](https://craftcms.com/knowledge-base/preparing-for-craft-4#replace-siteName-and-siteUrl-config-settings).
| `CRAFT_LOCALE`   | `CRAFT_SITE`

## Template Tags

[Twig 3](https://github.com/twigphp/Twig/blob/3.x/CHANGELOG) has removed some template tags:

| Old Tag           | What to do instead
| ----------------- | ------------------------
| `{% spaceless %}` | `{% apply spaceless %}`
| `{% filter %}`    | `{% apply %}`

Twig 3 also removed support for the `if` param in `{% for %}` tags, but you can use `|filter` instead:

```twig
{# Craft 3 #}
{% for item in items if item is not null %}
  {# ... #}
{% endfor %}

{# Craft 4 #}
{% for item in items|filter(item => item is not null) %}
  {# ... #}
{% endfor %}
```

The `{% cache %}` tag now stores any external references from `{% css %}` and `{% js %}` tags now, in addition to any inline content.

## Template Functions

Some template functions have been removed completely:

<!-- textlint-disable -->

| Old Template Function | What to do instead
| --------------------- | -------------------
| `getCsrfInput()`      | `csrfInput()`
| `getFootHtml()`       | `endBody()`
| `getHeadHtml()`       | `head()`
| `round()`             | `|round`
| `atom()`              | `|atom`
| `cookie()`            | `|date(constant('DATE_COOKIE'))`
| `iso8601()`           | `|date(constant('DATE_ISO8601'))`
| `rfc822()`            | `|date(constant('DATE_RFC822'))`
| `rfc850()`            | `|date(constant('DATE_RFC850'))`
| `rfc1036()`           | `|date(constant('DATE_RFC1036'))`
| `rfc1123()`           | `|date(constant('DATE_RFC1123'))`
| `rfc2822()`           | `|date(constant('DATE_RFC7231'))`
| `rfc3339()`           | `|date(constant('DATE_RFC2822'))`
| `rss()`               | `|rss`
| `w3c()`               | `|date(constant('DATE_W3C'))`
| `w3cDate()`           | `|date('Y-m-d')`
| `mySqlDateTime()`     | `|date('Y-m-d H:i:s')`
| `localeDate()`        | `|date('short')`
| `localeTime()`        | `|time('short')`
| `year()`              | `|date('Y')`
| `month()`             | `|date('n')`
| `day()`               | `|date('j')`
| `nice()`              | `|dateTime('short')`
| `uiTimestamp()`       | `|timestamp('short')`

<!-- textlint-enable -->

## Template Variables

| Old Template Variable     | What to do instead
| ------------------------- | ---------------------------------------------
| `craft.categoryGroups`    | `craft.app.categories`
| `craft.config`            | `craft.app.config`
| `craft.deprecator`        | `craft.app.deprecator`
| `craft.elementIndexes`    | `craft.app.elementIndexes`
| `craft.emailMessages`     | `craft.app.systemMessages`
| `craft.feeds`             | `craft.app.feeds`
| `craft.fields`            | `craft.app.fields`
| `craft.globals`           | `craft.app.globals`
| `craft.i18n`              | `craft.app.i18n`
| `craft.isLocalized`       | `craft.app.isMultiSite`
| `craft.locale`            | `craft.app.locale`
| `craft.request`           | `craft.app.request`
| `craft.sections`          | `craft.app.sections`
| `craft.session`           | `craft.app.session`
| `craft.systemSettings`    | `craft.app.systemSettings`
| `craft.userGroups`        | `craft.app.userGroups`
| `craft.userPermissions`   | `craft.app.userPermissions`

## Template Operators

Twig 3’s operators (`in`, `<`, `>`, `<=`, `>=`, `==`, `!=`) are more strict comparing strings to integers and floats. Make sure this doesn’t have any unintended consequences!

## Elements

Craft elements now clone custom array and object field values before returning them.

This means that every time you call a field handle like `element.myCustomField`, you’ll get a fresh copy of that field’s value. As a result, you may no longer need to use `clone()` to avoid inadvertently changing data or element queries used elsewhere.

The change in behavior has the potential to break templates relying on Craft 3’s behavior, so be sure to check any templates or custom code that modifies and re-uses custom field values.

## Element Queries

::: warning
Element queries can no longer be traversed or accessed like an array. Use a query execution method such as `all()`, `collect()`, or `one()` to fetch the results before working with them.
:::

### Query Params

Some element query params have been removed:

| Element Type | Old Param          | What to do instead
| ------------ | ------------------ | -------------------------
| all          | `locale`           | `site` or `siteId`
| all          | `localeEnabled`    | `status`
| all          | `order`            | `orderBy`
| Asset        | `source`           | `volume`
| Asset        | `sourceId`         | `volumeId`
| Matrix block | `ownerLocale`      | `site` or `siteId`
| Matrix block | `ownerSite`        | `site`
| Matrix block | `ownerSiteId`      | `siteId`

Some element query params have been renamed in Craft 4. The old params have been deprecated, but will continue to work until Craft 5.

| Element Type | Old Param                | New Param
| ------------ | ------------------------ | ----------------------------
| all          | `anyStatus`              | `status(null)`

### Query Methods

Some element query methods have been removed in Craft 4.

| Old Method      | What to do instead
| --------------- | --------------------------------------------------------
| `find()`        | `all()`
| `first()`       | `one()`
| `last()`        | `inReverse().one()`
| `total()`       | `count()`

## Collections

Craft 4 adds the [Collections](https://packagist.org/packages/illuminate/collections) package, which offers a more convenient and consistent way of working with arrays and collections of things.

Element queries, for example, now include a `collect()` method that returns query results as one of these collections instead of an array:

::: code
```twig
{# Array #}
{% set posts = craft.entries()
  .section('blog')
  .all() %}

{# Collection #}
{% set posts = craft.entries()
  .section('blog')
  .collect() %}
```
```php
// Array
$posts = \craft\elements\Entry::find()
    ->section('blog')
    ->all();

// Collection
$posts = \craft\elements\Entry::find()
    ->section('blog')
    ->collect();
```
:::

There’s also a new [collect()](dev/functions.md#collect) function you can use in Twig templates.

Be careful with any conditionals that rely on an implicit count! An empty array evaluates as `false`, while an empty collection evaluates as `true`:

```twig
{# 👍 #}
{% if myArray %}
  {# Do stuff #}
{% else %}
  {# No items to do stuff with; do something else #}
{% endif %}

{# ❌ #}
{% if myCollection %}
  {# Do stuff #}
{% else %}
  {# !! We’ll never end up here !! #}
{% endif %}
```

Use the `|length` filter or the collection’s `.count()` method instead:

```twig
{# 👍 #}
{% if myCollection.count() %}
  {# Do stuff #}
{% else %}
  {# No items to do stuff with; do something else #}
{% endif %}

{# 👍 #}
{% if myCollection|length %}
  {# Do stuff #}
{% else %}
  {# No items to do stuff with; do something else #}
{% endif %}
```

## GraphQL

| GraphQL Argument | What to do instead
| ---------------- | --------------------
| `immediately`    | all GraphQL transforms are now processed immediately
| `enabledForSite` | `status`

## Console Commands

| Old Command | What to do instead
| ----------- | ------------------
| `--type` option for `migrate/*` commmands | `--track` or `--plugin` option

## Alternative Text Fields

Craft 4’s Assets have the option of including a native `alt` field for alternative text. You can use this to query assets with or without alternative text, and Craft will use it generating image tags both in the control panel and on the front end.

![Native Alternative Text field in a Field Layout](./images/native-alternative-text-field-layout.png)

If you’re already using your own custom field for this, you can [use Craft’s resave command(s)](https://craftcms.com/knowledge-base/bulk-resaving-elements#resaving-with-specific-field-values) to migrate to the new `alt` field:

1. In the control panel, drag Craft’s `alt` field into each relevant field layout.
2. From your terminal, use the `resave/assets` command to populate the new `alt` field text from your old field’s content:
    ```shell
    php craft resave/assets --set alt --to myAltTextField --if-empty
    ```
3. If everything looks good, you can optionally empty the content out of your original field:
    ```shell
    php craft resave/assets --set myAltTextField --to :empty:
    ```
4. Remove the old field from each relevant field layout.

For deployment, you’ll probably want to take a phased approach: upgrade your site, migrate off your existing field to the native one, then remove the existing field after you’ve migrated the data in all your environments.

Don’t forget to update your templates and GraphQL queries!

::: warning
`alt` is now a reserved word for Asset Volume field layouts. If you have an existing, custom `alt` field, you’ll need to change it.
:::

## User Permissions

A few user permissions have been removed in Craft 4:

- `assignUserGroups` previously let authorized users assign other users to their own groups. Authorization must now be explicitly granted for each group.
- `customizeSources` had made it possible for authorized users to customize element sources. Only admins can customize element sources now, and only from an environment that allows admin changes.
- `publishPeerEntryDrafts:<uid>` permissions wouldn’t have stopped users from viewing, copying, and saving draft content themselves.

## Plugins

See [Updating Plugins for Craft 4](extend/updating-plugins.md).
