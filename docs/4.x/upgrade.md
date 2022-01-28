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

Some config settings have been removed entirely:

| File          | Setting
| ------------- | -----------
| `customAsciiCharMappings` |
| `siteName` |
| `siteUrl` |
| `suppressTemplateErrors` |
| `useCompressedJs` |
| `useProjectConfigFile` |

::: tip
You can now set custom config settings from `config/custom.php`, which will be accessible via `Craft::$app->config->{mycustomsetting}`.
:::

### Volumes

We’ve also removed support for `config/volumes.php`. Volumes can now specify per-environment filesystems.

## PHP Constants

Some PHP constants have been deprecated in Craft 4, and will no longer work in Craft 5:

| Old PHP Constant | What to do instead
| ---------------- | ----------------------------------------
| `CRAFT_SITE_URL` | Environment-specific site URLs can be defined via environment variables.
| `CRAFT_LOCALE` | `CRAFT_SITE`

## Template Tags

Some Twig template tags have been deprecated in Craft 4, and will be completely removed in Craft 5:

| Old Tag                         | What to do instead
| ------------------------------- | ---------------------------------------------
| `{% includeCss %}` | `{% css %}`
| `{% includeCssFile %}` | `{% css %}`
| `{% includeHiResCss %}` | 
| `{% includeJs %}` | `{% js %}`
| `{% includeJsFile %}` | `{% js %}`

## Template Functions

Some template functions have been removed completely:

| Old Template Function                       | What to do instead
| ------------------------------------------- | ------------------------------------
| `getCsrfInput()` | `csrfInput()`
| `getFootHtml()` | `endBody()`
| `getHeadHtml()` | `head()`
| `round()` | `|round`
| `atom()` |
| `cookie()` |
| `iso8601()` |
| `rfc822()` |
| `rfc850()` |
| `rfc1036()` |
| `rfc1123()` |
| `rfc2822()` |
| `rfc3339()` |
| `rss()` |
| `w3c()` |
| `w3cDate()` |
| `mySqlDateTime()` |
| `localeDate()` |
| `localeTime()` |
| `year()` |
| `month()` |
| `day()` |
| `nice()` |
| `uiTimestamp()` |

## Template Variables

| Old Template Variable           | What to do instead
| ------------------------------- | ---------------------------------------------
| `craft.categoryGroups` |
| `craft.config` |
| `craft.deprecator` |
| `craft.elementIndexes` |
| `craft.emailMessages` |
| `craft.feeds` |
| `craft.fields` |
| `craft.globals` |
| `craft.i18n` |
| `craft.isLocalized` | `craft.app.isMultiSite`
| `craft.locale` | 
| `craft.request` | 
| `craft.sections` | 
| `craft.session` | 
| `craft.systemSettings` | 
| `craft.userGroups` | 
| `craft.userPermissions` | 

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
| | `anyStatus` | `status(null)`

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

## Plugins

See [Updating Plugins for Craft 4](extend/updating-plugins.md).
