# Upgrading from Craft 3

The first step to upgrading your site to Craft 4 is updating the CMS itself.

## Preparing for the Upgrade

Before you begin, make sure that:

- you’ve reviewed the changes in Craft 4 further down this page
- all your environments meet Craft 4’s [minimum requirements](requirements.md), with [PHP 8.0+ and MySQL 5.7.8+](https://craftcms.com/knowledge-base/preparing-for-craft-4#upgrade-php-and-mySQL)
- your site is running [the latest **Craft 3.7** release](https://craftcms.com/knowledge-base/preparing-for-craft-4#update-to-the-latest-version-of-craft-3)
- your plugins are all up-to-date, and you’ve verified that they’ve been updated for Craft 4 (check your plugins’ Craft 4 compatibility status from the **Updates** page in the Craft 3 control panel)
- you’ve made sure there are no [deprecation warnings](https://craftcms.com/knowledge-base/preparing-for-craft-4#fix-deprecation-warnings) anywhere that need fixing

::: tip
Read the full [Preparing for Craft 4](https://craftcms.com/knowledge-base/preparing-for-craft-4) article to get projects ready to roll.
:::

Once you’ve completed everything listed above you can continue with the upgrade process.

## Performing the Upgrade

The best way to upgrade a Craft 3 site is to get everything squeaky-clean and up to date at all at once, then proceed like it’s a normal software update.

1. Pull a fresh database backup down from your production environment and import it locally.
2. If your database has `entrydrafts` and `entryversions` tables, check them for any meaningful data. Craft 3.2 stopped using these tables when drafts and revisions became elements, and the tables will be removed as part of the Craft 4 install process.
3. Run `php craft project-config/rebuild` and make sure all background tasks have completed.
4. Create a new database backup just in case things go sideways.
5. Edit your project’s `composer.json` to require the latest versions of Craft CMS and Craft-4-compatible plugins all at once.
6. Run `composer update`.
7. Run `php craft up`.

Now that you’ve upgraded your install to use Craft 4, please take some time to review the changes on this page and update your project.

Once you’ve verified everything’s looking great, commit your updated `composer.json`, `composer.lock`, and `config/project/` directory and roll those changes out normally into each additional environment.

### Troubleshooting

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
You can now set your own config settings—as opposed to those Craft supports—from `config/custom.php`. Any of your custom config settings will be accessible via `Craft::$app->config->{mycustomsetting}`.
:::

### Volumes

We’ve removed support for `config/volumes.php`. Volumes can now specify per-environment filesystems.

## PHP Constants

Some PHP constants have been deprecated in Craft 4, and will no longer work in Craft 5:

| Old PHP Constant | What to do instead
| ---------------- | ----------------------------------------
| `CRAFT_SITE_URL` | Environment-specific site URLs can be defined [via environment variables](https://craftcms.com/knowledge-base/preparing-for-craft-4#replace-siteName-and-siteUrl-config-settings).
| `CRAFT_LOCALE`   | `CRAFT_SITE`

## Template Tags

Some Twig template tags have been deprecated in Craft 4, and will be completely removed in Craft 5:

| Old Tag                 | What to do instead
| ------------------------| ---------------------------------------------
| `{% includeCss %}`      | `{% css %}`
| `{% includeCssFile %}`  | `{% css %}`
| `{% includeHiResCss %}` | Add your own media selector to `{% css %}`.
| `{% includeJs %}`       | `{% js %}`
| `{% includeJsFile %}`   | `{% js %}`

[Twig 3](https://github.com/twigphp/Twig/blob/3.x/CHANGELOG) has removed some template tags, too:

| Old Tag           | What to do instead
| ----------------- | ------------------------
| `{% spaceless %}` | `{% apply spaceless %}`
| `{% filter %}`    | `{% apply %}`

## Template Functions

Some template functions have been removed completely:

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

## Collections

## Element Queries

### Query Params

Some element query params have been removed:

| Element Type | Old Param          | What to do instead
| ------------ | ------------------ | -------------------------
| |

Some element query params have been renamed in Craft 4. The old params have been deprecated, but will continue to work until Craft 5.

| Element Type | Old Param                | New Param
| ------------ | ------------------------ | ----------------------------
| all          | `anyStatus`              | `status(null)`

### Query Methods

Some element query methods have been renamed in Craft 4. The old methods have been deprecated, but will continue to work until Craft 5.

| Old Method      | New Method
| --------------- | --------------------------------------------------------
| |

## Elements

## Request Params

Some controller actions have been renamed:

| Old Controller Action       | New Controller Action
| --------------------------- | --------------------------
| |

Some `redirect` param tokens have been renamed:

| Controller Action               | Old Token     | New Token
| ------------------------------- | ------------- | ---------
| |

## GraphQL

| GraphQL Argument |
| ---------------- |
| `immediately`    |

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
    php craft resave/entries --set myAltTextField --to :empty:
    ```
4. Remove the old field from each relevant field layout.

Don’t forget to update your templates and GraphQL queries!

## Plugins

See [Updating Plugins for Craft 4](extend/updating-plugins.md).
