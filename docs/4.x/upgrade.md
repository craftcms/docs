# Upgrading from Craft 3

The smoothest way to upgrade to Craft 4 is to start with a [fully-updated Craft 3 project](/3.x/updating.md).

## Preparing for the Upgrade

Let’s take a moment to audit the current state of your site, and make sure:

- your **live site** is running [the latest version of Craft 3](https://craftcms.com/knowledge-base/preparing-for-craft-4#update-to-the-latest-version-of-craft-3)
- you have the most recent Craft 3-compatible version of all plugins installed, and you’ve verified that Craft 4-compatible versions are available
- there are no [deprecation warnings](https://craftcms.com/knowledge-base/preparing-for-craft-4#fix-deprecation-warnings) to be fixed
- all your environments meet Craft 4’s [minimum requirements](requirements.md)
    - [PHP 8.0.2+ and MySQL 5.7.8+, MariaDB 10.2.7+, or PostgreSQL 10+](https://craftcms.com/knowledge-base/preparing-for-craft-4#upgrade-your-environment)
    - newly-required PHP extensions: [BCMath](https://www.php.net/manual/en/book.bc.php) and [Intl](http://php.net/manual/en/book.intl.php)
- you’ve reviewed the changes in Craft 4 further down this page and understand what work may lie ahead, post-upgrade

Once you’ve completed everything above, you’re ready to start the upgrade process.

::: tip
If your project uses custom plugins or modules, we have an additional [extension upgrade guide](extend/updating-plugins.md).
:::

## Performing the Upgrade

Like [any other update](updating.md), it’s essential that you have a safe place to test the upgrade prior to rolling it out.

These steps assume you have a local development environment that meets Craft 4’s [requirements](requirements.md), and that any changes made [in preparation for the upgrade](#preparing-for-the-upgrade) have been deployed to your live site.

1. Capture a fresh database backup from your live environment and import it.
2. If your database has `entrydrafts` and `entryversions` tables, check them for any meaningful data. Craft 3.2 stopped using these tables when drafts and revisions became elements, and the tables will be removed as part of the Craft 4 install process.
3. Make sure you don’t have any pending or active jobs in your queue.
4. Run `php craft project-config/rebuild` and allow any new background tasks to complete.
5. Capture a database backup _of your local environment_, just in case things go sideways.
6. Edit your project’s `composer.json` to require `"craftcms/cms": "^4.0.0"` and Craft-4-compatible plugins all at once.
    ::: tip
    You’ll need to manually edit each plugin version in `composer.json`. If any plugins are still in beta, you may need to change your [`minimum-stability`](https://getcomposer.org/doc/04-schema.md#minimum-stability) and [`prefer-stable`](https://getcomposer.org/doc/04-schema.md#prefer-stable) settings.
    :::
    You may also need to add `"php": "8.0.2"` to your [platform](https://getcomposer.org/doc/06-config.md#platform) requirements.
7. Run `composer update`.
8. Make any required changes to your [configuration](#configuration).
9. Run `php craft migrate/all`.

Your site is now running Craft 4! If you began this process with no deprecation warnings, you’re nearly done.

::: warning
Thoroughly review the list of changes on this page, making note of any features you use in templates or modules. Only a fraction of your site’s code is actually evaluated during an upgrade, so it’s your responsibility to check templates and modules for consistency. You may also need to follow any plugin-specific upgrade guides, like [Upgrading to Commerce 4](/commerce/4.x/upgrading.md).
:::

Once you’ve verified everything’s in order, commit your updated `composer.json`, `composer.lock`, and `config/project/` directory (along with any template, configuration, or module files that required updates) and deploy those changes normally in each additional environment.

### Optional Steps

These steps aren’t required to use Craft 4, but it’s the perfect time to do some housekeeping.

#### MySQL Character Sets

If you’re using MySQL, we recommend running [`php craft db/convert-charset`](console-commands.md#db-convert-charset) along with the upgrade process to ensure optimal database performance.

#### Entry Script

The [Craft starter project](https://github.com/craftcms/craft) is kept up-to-date with new Craft features, and provides official recommendations for your entry scripts (`index.php` and the `craft` CLI executable), configuration structure, etc. It’s a good idea to look this over to keep your upgraded projects as similar as possible to fresh ones.

Changing your entry script(s) may also involve updating [DotEnv](https://github.com/vlucas/phpdotenv) via `composer.json`. As long as its use in the entry script is compatible with the required version, you’re fine—Craft doesn’t rely on it, internally.

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
| `config/general.php` | `useProjectConfigFile`    | Project config always writes YAML now, but you can [manually control when](./project-config.md#manual-yaml-file-generation).

::: tip
You can now set your own config settings—as opposed to those Craft supports—from `config/custom.php`. Any of your [custom config settings](config/README.md#custom-settings) will be accessible via `Craft::$app->config->custom->{mycustomsetting}`.
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
- Query logging is no longer enabled by default when `devMode` is set to `false`. This can be changed using the new [enableLogging](./config/db.md#enablelogging) config setting in `config/db.php`.
- Query profiling is no longer enabled by default when `devMode` is set to `false`. This can be changed using the new [enableProfiling](./config/db.md#enableprofiling) config setting in `config/db.php`.
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
| `craft.feeds`             | n/a (see below)
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

::: tip Reading Feeds?
You can use [dodecastudio/craft-feedreader](https://github.com/dodecastudio/craft-feedreader) as a drop-in replacement for Craft’s removed feed service:
```twig
{# Craft 3 #}
{% set feed = craft.app.feeds.getFeed('https://craftcms.com/blog.rss') %}

{# Craft 4 #}
{% set feed = craft.feedreader.getFeed('https://craftcms.com/blog.rss') %}
```
:::

## Template Operators

Twig 3’s operators (`in`, `<`, `>`, `<=`, `>=`, `==`, `!=`) are more strict comparing strings to integers and floats. Make sure this doesn’t have any unintended consequences!

## Elements

Craft elements now clone custom array and object field values before returning them.

This means that every time you call a field handle like `element.myCustomField`, you’ll get a fresh copy of that field’s value. As a result, you may no longer need to use `clone()` to avoid inadvertently changing data or element queries used elsewhere.

The change in behavior has the potential to break templates relying on Craft 3’s behavior, so be sure to check any templates or custom code that modifies and re-uses custom field values.

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

### User Queries

User queries now return _all_ users by default in Craft 4, instead of only active users. Any user queries relying on this default behavior may need to be updated:

::: code
```twig
{# Craft 3 returned all *active* users by default #}
{% set activeUsers = craft.users().all() %}

{# Craft 4 returns *all* users by default; specify status for the same behavior #}
{% set activeUsers = craft.users()
  .status('active')
  .all() %}
```
```php
// Craft 3 returned all *active* users by default
$activeUsers = Craft::$app->getUsers()->all();

// Craft 4 returns *all* users by default; specify status for the same behavior
$activeUsers = Craft::$app->getUsers()
  ->status('active')
  ->all();
```
:::

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

## Queue Drivers

If you’re overriding Craft’s `queue` component in `config/app.php`, you may want to override the [`proxyQueue`](craft4:craft\queue\Queue::$proxyQueue) property of Craft’s built-in queue driver, instead. This way, you’ll regain visibility into the queue’s state from the control panel.

```php
<?php
return [
    'components' => [
        'queue' => [
            'proxyQueue' => [
                // custom queue config goes here
            ],
        ],
    ],
];
```

<a name="plugins"></a>

## Plugins and Modules

Plugin authors (and module maintainers) should refer to our guide on [updating Plugins for Craft 4](extend/updating-plugins.md).
