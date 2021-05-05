# General Config Settings

Craft supports several configuration settings that give you control over its behavior.

To set a new config setting, open `config/general.php` and define it in one of the environment config arrays, depending on which environment(s) you want the setting to apply to.

For example, if you want to allow Craft to be updated in dev environments but not on staging or production environments, do this:

```php{4,10}
return [
    // Global settings
    '*' => [
        'allowUpdates' => false,
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'allowUpdates' => true,
        // ...
    ],

    // Staging environment settings
    'staging' => [
        // ...
    ],

    // Production environment settings
    'production' => [
        // ...
    ],
];
```

Here’s the full list of config settings that Craft supports:

<!-- BEGIN SETTINGS -->

## System

### `accessibilityDefaults`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `['useShapes' => false, 'underlineLinks' => false]`

Defined by
:   [GeneralConfig::$accessibilityDefaults](craft3:craft\config\GeneralConfig::$accessibilityDefaults)

Since
:   3.6.4



The default user accessibility preferences that should be applied to users that haven’t saved their preferences yet.

The array can contain the following keys:

- `useShapes` – Whether shapes should be used to represent statuses
- `underlineLinks` – Whether links should be underlined



### `allowAdminChanges`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$allowAdminChanges](craft3:craft\config\GeneralConfig::$allowAdminChanges)

Since
:   3.1.0



Whether admins should be allowed to make administrative changes to the system.

When this is disabled, the Settings and Plugin Store sections will be hidden, the Craft edition and Craft/plugin versions will be locked, and the project config will become read-only.

It’s best to disable this in production environments with a deployment workflow that runs `composer install` and [propogates project config updates](../project-config.md#propagating-changes) on deploy.

::: warning
Don’t disable this setting until **all** environments have been updated to Craft 3.1.0 or later.
:::



### `allowUpdates`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$allowUpdates](craft3:craft\config\GeneralConfig::$allowUpdates)



Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.

This setting will automatically be disabled if <config3:allowAdminChanges> is disabled.



### `allowSimilarTags`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$allowSimilarTags](craft3:craft\config\GeneralConfig::$allowSimilarTags)



Whether users should be allowed to create similarly-named tags.



### `autoLoginAfterAccountActivation`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$autoLoginAfterAccountActivation](craft3:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)



Whether users should automatically be logged in after activating their account or resetting their password.



### `autosaveDrafts`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$autosaveDrafts](craft3:craft\config\GeneralConfig::$autosaveDrafts)

Since
:   3.5.6



Whether drafts should be saved automatically as they are edited.

Note that drafts *will* be autosaved while Live Preview is open, regardless of this setting.



### `backupOnUpdate`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$backupOnUpdate](craft3:craft\config\GeneralConfig::$backupOnUpdate)



Whether Craft should create a database backup before applying a new system update.



### `cacheDuration`

Allowed types
:   `mixed`

Default value
:   `86400` (1 day)

Defined by
:   [GeneralConfig::$cacheDuration](craft3:craft\config\GeneralConfig::$cacheDuration)



The default length of time Craft will store data, RSS feed, and template caches.

If set to `0`, data and RSS feed caches will be stored indefinitely; template caches will be stored for one year.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `cpHeadTags`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [GeneralConfig::$cpHeadTags](craft3:craft\config\GeneralConfig::$cpHeadTags)

Since
:   3.5.0



List of additional HTML tags that should be included in the `<head>` of control panel pages.

Each tag can be specified as an array of the tag name and its attributes.

For example, you can give the control panel a custom favicon (etc.) like this:

```php
'cpHeadTags' => [
    // Traditional favicon
    ['link', ['rel' => 'icon', 'href' => '/icons/favicon.ico']],
    // Scalable favicon for browsers that support them
    ['link', ['rel' => 'icon', 'type' => 'image/svg+xml', 'sizes' => 'any', 'href' => '/icons/favicon.svg']],
    // Touch icon for mobile devices
    ['link', ['rel' => 'apple-touch-icon', 'sizes' => '180x180', 'href' => '/icons/touch-icon.svg']],
    // Pinned tab icon for Safari
    ['link', ['rel' => 'mask-icon', 'href' => '/icons/mask-icon.svg', 'color' => '#663399']],
],
```


### `defaultCpLanguage`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$defaultCpLanguage](craft3:craft\config\GeneralConfig::$defaultCpLanguage)



The default language the control panel should use for users who haven’t set a preferred language yet,
as well as for console requests.



### `defaultCpLocale`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$defaultCpLocale](craft3:craft\config\GeneralConfig::$defaultCpLocale)

Since
:   3.5.0



The default locale the control panel should use for date/number formatting, for users who haven’t set
a preferred language or formatting locale.

If this is `null`, the <config3:defaultCpLanguage> config setting will determine which locale is used for date/number formatting by default.



### `defaultDirMode`

Allowed types
:   `mixed`

Default value
:   `0775`

Defined by
:   [GeneralConfig::$defaultDirMode](craft3:craft\config\GeneralConfig::$defaultDirMode)



The default permission to be set for newly-generated directories.

If set to `null`, the permission will be determined by the current environment.



### `defaultFileMode`

Allowed types
:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$defaultFileMode](craft3:craft\config\GeneralConfig::$defaultFileMode)



The default permission to be set for newly-generated files.

If set to `null`, the permission will be determined by the current environment.



### `defaultSearchTermOptions`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [GeneralConfig::$defaultSearchTermOptions](craft3:craft\config\GeneralConfig::$defaultSearchTermOptions)



The default options that should be applied to each search term.

Options include:

- `attribute` – The attribute that the term should apply to (e.g. 'title'), if any. (`null` by default)
- `exact` – Whether the term must be an exact match (only applies if `attribute` is set). (`false` by default)
- `exclude` – Whether search results should *exclude* records with this term. (`false` by default)
- `subLeft` – Whether to include keywords that contain the term, with additional characters before it. (`false` by default)
- `subRight` – Whether to include keywords that contain the term, with additional characters after it. (`true` by default)



### `defaultTemplateExtensions`

Allowed types
:   [string](http://php.net/language.types.string)[]

Default value
:   `['html', 'twig']`

Defined by
:   [GeneralConfig::$defaultTemplateExtensions](craft3:craft\config\GeneralConfig::$defaultTemplateExtensions)



The template file extensions Craft will look for when matching a template path to a file on the front end.



### `defaultWeekStartDay`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `1` (Monday)

Defined by
:   [GeneralConfig::$defaultWeekStartDay](craft3:craft\config\GeneralConfig::$defaultWeekStartDay)



The default day new users should have set as their Week Start Day.

This should be set to one of the following integers:

- `0` – Sunday
- `1` – Monday
- `2` – Tuesday
- `3` – Wednesday
- `4` – Thursday
- `5` – Friday
- `6` – Saturday



### `devMode`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$devMode](craft3:craft\config\GeneralConfig::$devMode)



Whether the system should run in [Dev Mode](https://craftcms.com/support/dev-mode).



### `disabledPlugins`

Allowed types
:   [string](http://php.net/language.types.string)[], [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$disabledPlugins](craft3:craft\config\GeneralConfig::$disabledPlugins)

Since
:   3.1.9



Array of plugin handles that should be disabled, regardless of what the project config says.

```php
'dev' => [
    'disabledPlugins' => ['webhooks'],
],
```

This can also be set to `'*'` to disable **all** plugins.

```php
'dev' => [
    'disabledPlugins' => '*',
],
```



### `disallowRobots`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$disallowRobots](craft3:craft\config\GeneralConfig::$disallowRobots)

Since
:   3.5.10



Whether front end requests should respond with `X-Robots-Tag: none` HTTP headers, indicating that pages should not be indexed,
and links on the page should not be followed, by web crawlers.

::: tip
This should be set to `true` for development and staging environments.
:::



### `enableTemplateCaching`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableTemplateCaching](craft3:craft\config\GeneralConfig::$enableTemplateCaching)



Whether to enable Craft’s template `{% cache %}` tag on a global basis.



### `errorTemplatePrefix`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [GeneralConfig::$errorTemplatePrefix](craft3:craft\config\GeneralConfig::$errorTemplatePrefix)



The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.

If set to `'_'` your site’s 404 template would live at `templates/_404.html`, for example.



### `extraAllowedFileExtensions`

Allowed types
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$extraAllowedFileExtensions](craft3:craft\config\GeneralConfig::$extraAllowedFileExtensions)



List of file extensions that will be merged into the <config3:allowedFileExtensions> config setting.



### `extraAppLocales`

Allowed types
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$extraAppLocales](craft3:craft\config\GeneralConfig::$extraAppLocales)

Since
:   3.0.24



List of extra locale IDs that the application should support, and users should be able to select as their Preferred Language.

Only use this setting if your server has the Intl PHP extension, or if you’ve saved the corresponding
[locale data](https://github.com/craftcms/locales) into your `config/locales/` folder.



### `handleCasing`

Allowed types
:   

Default value
:   `self::CAMEL_CASE`

Defined by
:   [GeneralConfig::$handleCasing](craft3:craft\config\GeneralConfig::$handleCasing)

Since
:   3.6.0



This can be set to one of the following:

- `camel` – for camelCase
- `pascal` – for PascalCase (aka UpperCamelCase)
- `snake` – for snake_case



### `headlessMode`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$headlessMode](craft3:craft\config\GeneralConfig::$headlessMode)

Since
:   3.3.0



Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations.

When this is enabled, the following changes will take place:

- Template settings for sections and category groups will be hidden.
- Template route management will be hidden.
- Front-end routing will skip checks for element and template requests.
- Front-end responses will be JSON-formatted rather than HTML by default.
- Twig will be configured to escape unsafe strings for JavaScript/JSON rather than HTML by default for front-end requests.
- The <config3:loginPath>, <config3:logoutPath>, <config3:setPasswordPath>, and <config3:verifyEmailPath> settings will be ignored.

::: tip
With Headless Mode enabled, users may only set passwords and verify email addresses via the control panel. Be sure to grant “Access the control
panel” permission to all content editors and administrators. You’ll also need to set the <config3:baseCpUrl> config setting if the control
panel is located on a different domain than your front end.
:::



### `indexTemplateFilenames`

Allowed types
:   [string](http://php.net/language.types.string)[]

Default value
:   `['index']`

Defined by
:   [GeneralConfig::$indexTemplateFilenames](craft3:craft\config\GeneralConfig::$indexTemplateFilenames)



The template filenames Craft will look for within a directory to represent the directory’s “index” template when
matching a template path to a file on the front end.



### `ipHeaders`

Allowed types
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$ipHeaders](craft3:craft\config\GeneralConfig::$ipHeaders)



List of headers where proxies store the real client IP.

See [yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) for more details.

If not set, the default [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) value will be used.



### `isSystemLive`

Allowed types
:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$isSystemLive](craft3:craft\config\GeneralConfig::$isSystemLive)



Whether the site is currently live. If set to `true` or `false`, it will take precedence over the System Status setting
in Settings → General.



### `limitAutoSlugsToAscii`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$limitAutoSlugsToAscii](craft3:craft\config\GeneralConfig::$limitAutoSlugsToAscii)



Whether non-ASCII characters in auto-generated slugs should be converted to ASCII (i.e. ñ → n).

::: tip
This only affects the JavaScript auto-generated slugs. Non-ASCII characters can still be used in slugs if entered manually.
:::



### `maxBackups`

Allowed types
:   [integer](http://php.net/language.types.integer), [false](http://php.net/language.types.boolean)

Default value
:   `20`

Defined by
:   [GeneralConfig::$maxBackups](craft3:craft\config\GeneralConfig::$maxBackups)



The number of backups Craft should make before it starts deleting the oldest backups. If set to `false`, Craft will
not delete any backups.



### `maxRevisions`

Allowed types
:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

Default value
:   `50`

Defined by
:   [GeneralConfig::$maxRevisions](craft3:craft\config\GeneralConfig::$maxRevisions)

Since
:   3.2.0



The maximum number of revisions that should be stored for each element.

Set to `0` if you want to store an unlimited number of revisions.



### `maxSlugIncrement`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `100`

Defined by
:   [GeneralConfig::$maxSlugIncrement](craft3:craft\config\GeneralConfig::$maxSlugIncrement)



The highest number Craft will tack onto a slug in order to make it unique before giving up and throwing an error.



### `phpMaxMemoryLimit`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$phpMaxMemoryLimit](craft3:craft\config\GeneralConfig::$phpMaxMemoryLimit)



The maximum amount of memory Craft will try to reserve during memory-intensive operations such as zipping,
unzipping and updating. Defaults to an empty string, which means it will use as much memory as it can.

See <http://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> for a list of acceptable values.



### `privateTemplateTrigger`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'_'`

Defined by
:   [GeneralConfig::$privateTemplateTrigger](craft3:craft\config\GeneralConfig::$privateTemplateTrigger)



The template path segment prefix that should be used to identify “private” templates, which are templates that are not
directly accessible via a matching URL.

Set to an empty value to disable public template routing.



### `previewIframeResizerOptions`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [GeneralConfig::$previewIframeResizerOptions](craft3:craft\config\GeneralConfig::$previewIframeResizerOptions)

Since
:   3.5.0



Custom [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) that should be used for preview iframes.

```php
'previewIframeResizerOptions' => [
    'autoResize' => false,
],
```



### `runQueueAutomatically`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$runQueueAutomatically](craft3:craft\config\GeneralConfig::$runQueueAutomatically)



Whether Craft should run pending queue jobs automatically when someone visits the control panel.

If disabled, an alternate queue worker *must* be set up separately, either as an
[always-running daemon](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md), or a cron job that runs the
`queue/run` command every minute:

```cron
* * * * * /path/to/project/craft queue/run
```

::: tip
This setting should be disabled for servers running Win32, or with Apache’s mod_deflate/mod_gzip installed,
where PHP’s [flush()](http://php.net/manual/en/function.flush.php) method won’t work.
:::



### `sameSiteCookieValue`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [GeneralConfig::$sameSiteCookieValue](craft3:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:   3.1.33



The [SameSite](https://www.owasp.org/index.php/SameSite) value that should be set on Craft cookies, if any.

This can be set to `'Lax'`, `'Strict'`, or `null`.

::: tip
This setting requires PHP 7.3 or later.
:::



### `sendPoweredByHeader`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$sendPoweredByHeader](craft3:craft\config\GeneralConfig::$sendPoweredByHeader)



Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and
[Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.



### `slugWordSeparator`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'-'`

Defined by
:   [GeneralConfig::$slugWordSeparator](craft3:craft\config\GeneralConfig::$slugWordSeparator)



The character(s) that should be used to separate words in slugs.



### `testToEmailAddress`

Allowed types
:   [string](http://php.net/language.types.string), [array](http://php.net/language.types.array), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$testToEmailAddress](craft3:craft\config\GeneralConfig::$testToEmailAddress)



Configures Craft to send all system emails to either a single email address or an array of email addresses
for testing purposes.

By default, the recipient name(s) will be “Test Recipient”, but you can customize that by setting the value with the format
`['email@address.com' => 'Name']`.



### `timezone`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$timezone](craft3:craft\config\GeneralConfig::$timezone)



The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.

This can be set to one of PHP’s [supported timezones](http://php.net/manual/en/timezones.php).



### `translationDebugOutput`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$translationDebugOutput](craft3:craft\config\GeneralConfig::$translationDebugOutput)



Whether translated messages should be wrapped in special characters to help find any strings that are not being run through
`Craft::t()` or the `|translate` filter.



### `useEmailAsUsername`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$useEmailAsUsername](craft3:craft\config\GeneralConfig::$useEmailAsUsername)



Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.

If you enable this setting after user accounts already exist, run this terminal command to update existing usernames:

```bash
php craft utils/update-usernames
```



### `useIframeResizer`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$useIframeResizer](craft3:craft\config\GeneralConfig::$useIframeResizer)

Since
:   3.5.5



Whether [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) should be used for Live Preview.

Using iFrame Resizer makes it possible for Craft to retain the preview’s scroll position between page loads, for cross-origin web pages.

It works by setting the height of the iframe to match the height of the inner web page, and the iframe’s container will be scrolled rather
than the iframe document itself. This can lead to some unexpected CSS issues, however, because the previewed viewport height will be taller
than the visible portion of the iframe.

If you have a [decoupled front-end](https://craftcms.com/docs/3.x/entries.html#previewing-decoupled-front-ends), you will need to include
[iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js) on your
page as well for this to work. You can conditionally include it for only Live Preview requests by checking if the requested URL contains a
`x-craft-live-preview` query string parameter.

::: tip
You can customize the behavior of iFrame Resizer via the <config3:previewIframeResizerOptions> config setting.
:::



### `useFileLocks`

Allowed types
:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$useFileLocks](craft3:craft\config\GeneralConfig::$useFileLocks)



Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.

Some file systems, such as NFS, do not support exclusive file locking.

If not set to `true` or `false`, Craft will try to detect if the underlying file system supports exclusive file locking and cache the results.



## Environment

### `aliases`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [GeneralConfig::$aliases](craft3:craft\config\GeneralConfig::$aliases)



Any custom Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases) that should be defined for every request.



### `backupCommand`

Allowed types
:   [string](http://php.net/language.types.string), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$backupCommand](craft3:craft\config\GeneralConfig::$backupCommand)



The shell command that Craft should execute to create a database backup.

When set to `null` (default), Craft will run `mysqldump` or `pg_dump`, provided that those libraries are in the `$PATH` variable
for the system user running the web server.

You may provide your own command optionally using several tokens Craft will swap out at runtime:

- `{path}` - the target backup file path
- `{port}` - the current database port
- `{server}` - the current database host name
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database backups completely.



### `defaultCookieDomain`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [GeneralConfig::$defaultCookieDomain](craft3:craft\config\GeneralConfig::$defaultCookieDomain)



The domain that cookies generated by Craft should be created for. If blank, it will be left up to the browser to determine
which domain to use (almost always the current). If you want the cookies to work for all subdomains, for example, you could
set this to `'.domain.com'`.



### `resourceBasePath`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'@webroot/cpresources'`

Defined by
:   [GeneralConfig::$resourceBasePath](craft3:craft\config\GeneralConfig::$resourceBasePath)



The path to the root directory that should store published control panel resources.



### `resourceBaseUrl`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'@web/cpresources'`

Defined by
:   [GeneralConfig::$resourceBaseUrl](craft3:craft\config\GeneralConfig::$resourceBaseUrl)



The URL to the root directory that should store published control panel resources.



### `restoreCommand`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$restoreCommand](craft3:craft\config\GeneralConfig::$restoreCommand)



The shell command Craft should execute to restore a database backup.

By default Craft will run `mysql` or `psql`, provided those libraries are in the `$PATH` variable for the user the web server is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - the backup file path
- `{port}` - the current database port
- `{server}` - the current database host name
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database restores completely.



## Routing

### `actionTrigger`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'actions'`

Defined by
:   [GeneralConfig::$actionTrigger](craft3:craft\config\GeneralConfig::$actionTrigger)



The URI segment Craft should look for when determining if the current request should be routed to a controller action.



### `activateAccountSuccessPath`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$activateAccountSuccessPath](craft3:craft\config\GeneralConfig::$activateAccountSuccessPath)



The URI that users without access to the control panel should be redirected to after activating their account.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `addTrailingSlashesToUrls`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$addTrailingSlashesToUrls](craft3:craft\config\GeneralConfig::$addTrailingSlashesToUrls)



Whether auto-generated URLs should have trailing slashes.



### `allowUppercaseInSlug`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$allowUppercaseInSlug](craft3:craft\config\GeneralConfig::$allowUppercaseInSlug)



Whether uppercase letters should be allowed in slugs.



### `baseCpUrl`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$baseCpUrl](craft3:craft\config\GeneralConfig::$baseCpUrl)



The base URL Craft should use when generating control panel URLs.

It will be determined automatically if left blank.

::: tip
The base control panel URL should **not** include the [control panel trigger word](config3:cpTrigger) (e.g. `/admin`).
:::



### `cpTrigger`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `'admin'`

Defined by
:   [GeneralConfig::$cpTrigger](craft3:craft\config\GeneralConfig::$cpTrigger)



The URI segment Craft should look for when determining if the current request should route to the control panel rather than
the front-end website.

This can be set to `null` if you have a dedicated host name for the control panel (e.g. `cms.example.com`), or you are running Craft in
[Headless Mode](config3:headlessMode). If you do that, you will need to ensure that the control panel is being served from its own webroot
directory on your server, with an `index.php` file that defines the `CRAFT_CP` PHP constant.

```php
define('CRAFT_CP', true);
```

Alternatively, you can set the <config3:baseCpUrl> config setting, but then you will run the risk of losing access to portions of your
control panel due to URI conflicts with actual folders/files in your main webroot.

(For example, if you have an `assets/` folder, that would conflict with the `/assets` page in the control panel.)



### `invalidUserTokenPath`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$invalidUserTokenPath](craft3:craft\config\GeneralConfig::$invalidUserTokenPath)



The URI Craft should redirect to when user token validation fails. A token is used on things like setting and resetting user account
passwords. Note that this only affects front-end site requests.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `loginPath`

Allowed types
:   `mixed`

Default value
:   `'login'`

Defined by
:   [GeneralConfig::$loginPath](craft3:craft\config\GeneralConfig::$loginPath)



The URI Craft should use for user login on the front end.

This can be set to `false` to disable front-end login.

Note that this config setting is ignored when <config3:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `logoutPath`

Allowed types
:   `mixed`

Default value
:   `'logout'`

Defined by
:   [GeneralConfig::$logoutPath](craft3:craft\config\GeneralConfig::$logoutPath)



The URI Craft should use for user logout on the front end.

This can be set to `false` to disable front-end logout.

Note that this config setting is ignored when <config3:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `omitScriptNameInUrls`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$omitScriptNameInUrls](craft3:craft\config\GeneralConfig::$omitScriptNameInUrls)



Whether generated URLs should omit `index.php` (e.g. `http://domain.com/path` instead of `http://domain.com/index.php/path`)

This can only be possible if your server is configured to redirect would-be 404's to `index.php`, for example, with the redirect found
in the `.htaccess` file that came with Craft:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```



### `pageTrigger`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'p'`

Defined by
:   [GeneralConfig::$pageTrigger](craft3:craft\config\GeneralConfig::$pageTrigger)



The string preceding a number which Craft will look for when determining if the current request is for a particular page in
a paginated list of pages.

Example Value | Example URI
------------- | -----------
`p` | `/news/p5`
`page` | `/news/page5`
`page/` | `/news/page/5`
`?page` | `/news?page=5`

::: tip
If you want to set this to `?p` (e.g. `/news?p=5`), you’ll also need to change your <config3:pathParam> setting which defaults to `p`.
If your server is running Apache, you’ll need to update the redirect code in your `.htaccess` file to match your new `pathParam` value.
:::



### `pathParam`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `'p'`

Defined by
:   [GeneralConfig::$pathParam](craft3:craft\config\GeneralConfig::$pathParam)



The query string param that Craft will check when determining the request’s path.

This can be set to `null` if your web server is capable of directing traffic to `index.php` without a query string param.
If you’re using Apache, that means you’ll need to change the `RewriteRule` line in your `.htaccess` file to:

```
RewriteRule (.+) index.php [QSA,L]
```



### `postCpLoginRedirect`

Allowed types
:   `mixed`

Default value
:   `'dashboard'`

Defined by
:   [GeneralConfig::$postCpLoginRedirect](craft3:craft\config\GeneralConfig::$postCpLoginRedirect)



The path users should be redirected to after logging into the control panel.

This setting will also come into effect if a user visits the control panel’s login page (`/admin/login`) or the control panel’s
root URL (`/admin`) when they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLoginRedirect`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$postLoginRedirect](craft3:craft\config\GeneralConfig::$postLoginRedirect)



The path users should be redirected to after logging in from the front-end site.

This setting will also come into effect if the user visits the login page (as specified by the <config3:loginPath> config setting) when
they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLogoutRedirect`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$postLogoutRedirect](craft3:craft\config\GeneralConfig::$postLogoutRedirect)



The path that users should be redirected to after logging out from the front-end site.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `setPasswordPath`

Allowed types
:   `mixed`

Default value
:   `'setpassword'`

Defined by
:   [GeneralConfig::$setPasswordPath](craft3:craft\config\GeneralConfig::$setPasswordPath)



The URI or URL that Craft should use for Set Password forms on the front end.

Note that this config setting is ignored when <config3:headlessMode> is enabled, unless it’s set to an absolute URL.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: tip
You might also want to set <config3:invalidUserTokenPath> in case a user clicks on an expired password reset link.
:::



### `setPasswordRequestPath`

Allowed types
:   `mixed`

Default value
:   `null`

Defined by
:   [GeneralConfig::$setPasswordRequestPath](craft3:craft\config\GeneralConfig::$setPasswordRequestPath)

Since
:   3.5.14



The URI to the page where users can request to change their password.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

If this is set, Craft will redirect [.well-known/change-password requests](https://w3c.github.io/webappsec-change-password-url/) to this URI.

::: tip
You’ll also need to set [setPasswordPath](config3:setPasswordPath), which determines the URI and template path for the Set Password form
where the user resets their password after following the link in the Password Reset email.
:::



### `setPasswordSuccessPath`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$setPasswordSuccessPath](craft3:craft\config\GeneralConfig::$setPasswordSuccessPath)



The URI Craft should redirect users to after setting their password from the front end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `siteToken`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'siteToken'`

Defined by
:   [GeneralConfig::$siteToken](craft3:craft\config\GeneralConfig::$siteToken)

Since
:   3.5.0



The query string parameter name that site tokens should be set to.



### `tokenParam`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'token'`

Defined by
:   [GeneralConfig::$tokenParam](craft3:craft\config\GeneralConfig::$tokenParam)



The query string parameter name that Craft tokens should be set to.



### `usePathInfo`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$usePathInfo](craft3:craft\config\GeneralConfig::$usePathInfo)



Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.

Note that this setting only takes effect if <config3:omitScriptNameInUrls> is set to `false`.



### `useSslOnTokenizedUrls`

Allowed types
:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:   `'auto'`

Defined by
:   [GeneralConfig::$useSslOnTokenizedUrls](craft3:craft\config\GeneralConfig::$useSslOnTokenizedUrls)



Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the
current site’s base URL and the protocol of the current request and if either of them are https will use `https` in the tokenized URL. If not,
will use `http`.

If set to `false`, Craft will always use `http`. If set to `true`, then, Craft will always use `https`.



### `verifyEmailPath`

Allowed types
:   `mixed`

Default value
:   `'verifyemail'`

Defined by
:   [GeneralConfig::$verifyEmailPath](craft3:craft\config\GeneralConfig::$verifyEmailPath)

Since
:   3.4.0



The URI or URL that Craft should use for email verification links on the front end.

Note that this config setting is ignored when <config3:headlessMode> is enabled, unless it’s set to an absolute URL.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `verifyEmailSuccessPath`

Allowed types
:   `mixed`

Default value
:   `''`

Defined by
:   [GeneralConfig::$verifyEmailSuccessPath](craft3:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:   3.1.20



The URI that users without access to the control panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



## Session

### `phpSessionName`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'CraftSessionId'`

Defined by
:   [GeneralConfig::$phpSessionName](craft3:craft\config\GeneralConfig::$phpSessionName)



The name of the PHP session cookie.



### `rememberUsernameDuration`

Allowed types
:   `mixed`

Default value
:   `31536000` (1 year)

Defined by
:   [GeneralConfig::$rememberUsernameDuration](craft3:craft\config\GeneralConfig::$rememberUsernameDuration)



The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.

Set to `0` to disable this feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberedUserSessionDuration`

Allowed types
:   `mixed`

Default value
:   `1209600` (14 days)

Defined by
:   [GeneralConfig::$rememberedUserSessionDuration](craft3:craft\config\GeneralConfig::$rememberedUserSessionDuration)



The amount of time a user stays logged if “Remember Me” is checked on the login page.

Set to `0` to disable the “Remember Me” feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `requireMatchingUserAgentForSession`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$requireMatchingUserAgentForSession](craft3:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)



Whether Craft should require a matching user agent string when restoring a user session from a cookie.



### `requireUserAgentAndIpForSession`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$requireUserAgentAndIpForSession](craft3:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)



Whether Craft should require the existence of a user agent string and IP address when creating a new user session.



### `userSessionDuration`

Allowed types
:   `mixed`

Default value
:   `3600` (1 hour)

Defined by
:   [GeneralConfig::$userSessionDuration](craft3:craft\config\GeneralConfig::$userSessionDuration)



The amount of time before a user will get logged out due to inactivity.

Set to `0` if you want users to stay logged in as long as their browser is open rather than a predetermined amount of time.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



## Security

### `blowfishHashCost`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `13`

Defined by
:   [GeneralConfig::$blowfishHashCost](craft3:craft\config\GeneralConfig::$blowfishHashCost)



The higher the cost value, the longer it takes to generate a password hash and to verify against it.

Therefore, higher cost slows down a brute-force attack.

For best protection against brute force attacks, set it to the highest value that is tolerable on production servers.

The time taken to compute the hash doubles for every increment by one for this value.

For example, if the hash takes 1 second to compute when the value is 14 then the compute time varies as
2^(value - 14) seconds.



### `cooldownDuration`

Allowed types
:   `mixed`

Default value
:   `300` (5 minutes)

Defined by
:   [GeneralConfig::$cooldownDuration](craft3:craft\config\GeneralConfig::$cooldownDuration)



The amount of time a user must wait before re-attempting to log in after their account is locked due to too many
failed login attempts.

Set to `0` to keep the account locked indefinitely, requiring an admin to manually unlock the account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `csrfTokenName`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'CRAFT_CSRF_TOKEN'`

Defined by
:   [GeneralConfig::$csrfTokenName](craft3:craft\config\GeneralConfig::$csrfTokenName)



The name of CSRF token used for CSRF validation if <config3:enableCsrfProtection> is set to `true`.



### `defaultTokenDuration`

Allowed types
:   `mixed`

Default value
:   `86400` (1 day)

Defined by
:   [GeneralConfig::$defaultTokenDuration](craft3:craft\config\GeneralConfig::$defaultTokenDuration)



The default amount of time tokens can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `deferPublicRegistrationPassword`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$deferPublicRegistrationPassword](craft3:craft\config\GeneralConfig::$deferPublicRegistrationPassword)



By default, Craft will require a ‘password’ field to be submitted on front-end, public user registrations. Setting this to `true`
will no longer require it on the initial registration form.

If you have email verification enabled, new users will set their password once they’ve clicked on the verification link in the email.
If you don’t, the only way they can set their password is to go through your “forgot password” workflow.



### `enableBasicHttpAuth`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$enableBasicHttpAuth](craft3:craft\config\GeneralConfig::$enableBasicHttpAuth)

Since
:   3.5.0



Whether front-end web requests should support basic HTTP authentication.



### `enableCsrfCookie`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableCsrfCookie](craft3:craft\config\GeneralConfig::$enableCsrfCookie)



Whether to use a cookie to persist the CSRF token if <config3:enableCsrfProtection> is enabled. If false, the CSRF token will be
stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security,
it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.



### `elevatedSessionDuration`

Allowed types
:   `mixed`

Default value
:   `300` (5 minutes)

Defined by
:   [GeneralConfig::$elevatedSessionDuration](craft3:craft\config\GeneralConfig::$elevatedSessionDuration)



The amount of time a user’s elevated session will last, which is required for some sensitive actions (e.g. user group/permission assignment).

Set to `0` to disable elevated session support.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `enableCsrfProtection`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableCsrfProtection](craft3:craft\config\GeneralConfig::$enableCsrfProtection)



Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.



### `invalidLoginWindowDuration`

Allowed types
:   `mixed`

Default value
:   `3600` (5 minutes)

Defined by
:   [GeneralConfig::$invalidLoginWindowDuration](craft3:craft\config\GeneralConfig::$invalidLoginWindowDuration)



The amount of time to track invalid login attempts for a user, for determining if Craft should lock an account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `maxInvalidLogins`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `5`

Defined by
:   [GeneralConfig::$maxInvalidLogins](craft3:craft\config\GeneralConfig::$maxInvalidLogins)



The number of invalid login attempts Craft will allow within the specified duration before the account gets locked.



### `preventUserEnumeration`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$preventUserEnumeration](craft3:craft\config\GeneralConfig::$preventUserEnumeration)



When `true`, Craft will always return a successful response in the “forgot password” flow, making it difficult to enumerate users.

When set to `false` and you go through the “forgot password” flow from the control panel login page, you’ll get distinct messages indicating
whether the username/email exists and whether an email was sent with further instructions. This can be helpful for the user attempting to
log in but allow for username/email enumeration based on the response.



### `sanitizeCpImageUploads`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$sanitizeCpImageUploads](craft3:craft\config\GeneralConfig::$sanitizeCpImageUploads)

Since
:   3.6.0



Whether images uploaded via the control panel should be sanitized.



### `sanitizeSvgUploads`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$sanitizeSvgUploads](craft3:craft\config\GeneralConfig::$sanitizeSvgUploads)



Whether Craft should sanitize uploaded SVG files and strip out potential malicious-looking content.

This should definitely be enabled if you are accepting SVG uploads from untrusted sources.



### `securityKey`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [GeneralConfig::$securityKey](craft3:craft\config\GeneralConfig::$securityKey)



A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](craft3:craft\services\Security).

This value should be the same across all environments. If this key ever changes, any data that was encrypted with it will be inaccessible.



### `secureHeaders`

Allowed types
:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$secureHeaders](craft3:craft\config\GeneralConfig::$secureHeaders)



Lists of headers that are, by default, subject to the trusted host configuration.

See [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) value will be used.



### `secureProtocolHeaders`

Allowed types
:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$secureProtocolHeaders](craft3:craft\config\GeneralConfig::$secureProtocolHeaders)



List of headers to check for determining whether the connection is made via HTTPS.

See [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) value will be used.



### `storeUserIps`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$storeUserIps](craft3:craft\config\GeneralConfig::$storeUserIps)

Since
:   3.1.0



Whether user IP addresses should be stored/logged by the system.



### `trustedHosts`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `['any']`

Defined by
:   [GeneralConfig::$trustedHosts](craft3:craft\config\GeneralConfig::$trustedHosts)



The configuration for trusted security-related headers.

See [yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) for more details.

By default, all hosts are trusted.



### `useSecureCookies`

Allowed types
:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:   `'auto'`

Defined by
:   [GeneralConfig::$useSecureCookies](craft3:craft\config\GeneralConfig::$useSecureCookies)



Whether Craft will set the “secure” flag when saving cookies when using `Craft::cookieConfig()` to create a cookie.

Valid values are `true`, `false`, and `'auto'`. Defaults to `'auto'`, which will set the secure flag if the page you’re currently accessing
is over `https://`. `true` will always set the flag, regardless of protocol and `false` will never automatically set the flag.



### `verificationCodeDuration`

Allowed types
:   `mixed`

Default value
:   `86400` (1 day)

Defined by
:   [GeneralConfig::$verificationCodeDuration](craft3:craft\config\GeneralConfig::$verificationCodeDuration)



The amount of time a user verification code can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



## Assets

### `allowedFileExtensions`

Allowed types
:   [string](http://php.net/language.types.string)[]

Default value
:   `['7z', 'aiff', 'asc', 'asf', 'avi', 'bmp', 'cap', 'cin', 'csv', 'dfxp', 'doc', 'docx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'itt', 'jp2', 'jpeg', 'jpg', 'jpx', 'js', 'json', 'lrc', 'm2t', 'm4a', 'm4v', 'mcc', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'mpsub', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'ppz', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rt', 'rtf', 'sami', 'sbv', 'scc', 'sdc', 'sitd', 'smi', 'srt', 'stl', 'sub', 'svg', 'swf', 'sxc', 'sxw', 'tar', 'tds', 'tgz', 'tif', 'tiff', 'ttml', 'txt', 'vob', 'vsd', 'vtt', 'wav', 'webm', 'webp', 'wma', 'wmv', 'xls', 'xlsx', 'xml', 'zip']`

Defined by
:   [GeneralConfig::$allowedFileExtensions](craft3:craft\config\GeneralConfig::$allowedFileExtensions)



The file extensions Craft should allow when a user is uploading files.



### `convertFilenamesToAscii`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$convertFilenamesToAscii](craft3:craft\config\GeneralConfig::$convertFilenamesToAscii)



Whether uploaded filenames with non-ASCII characters should be converted to ASCII (i.e. `ñ` → `n`).

::: tip
You can run `php craft utils/ascii-filenames` in your terminal to apply ASCII filenames to all existing assets.
:::



### `extraFileKinds`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [GeneralConfig::$extraFileKinds](craft3:craft\config\GeneralConfig::$extraFileKinds)

Since
:   3.0.37



List of additional file kinds Craft should support. This array will get merged with the one defined in
`\craft\helpers\Assets::_buildFileKinds()`.

```php
'extraFileKinds' => [
    // merge .psb into list of Photoshop file kinds
    'photoshop' => [
        'extensions' => ['psb'],
    ],
    // register new "Stylesheet" file kind
    'stylesheet' => [
        'label' => 'Stylesheet',
        'extensions' => ['css', 'less', 'pcss', 'sass', 'scss', 'styl'],
    ],
],
```

::: tip
File extensions listed here won’t immediately be allowed to be uploaded. You will also need to list them with
the <config3:extraAllowedFileExtensions> config setting.
:::



### `filenameWordSeparator`

Allowed types
:   [string](http://php.net/language.types.string), [boolean](http://php.net/language.types.boolean)

Default value
:   `'-'`

Defined by
:   [GeneralConfig::$filenameWordSeparator](craft3:craft\config\GeneralConfig::$filenameWordSeparator)



The string to use to separate words when uploading Assets. If set to `false`, spaces will be left alone.



### `maxUploadFileSize`

Allowed types
:   [integer](http://php.net/language.types.integer), [string](http://php.net/language.types.string)

Default value
:   `16777216` (16MB)

Defined by
:   [GeneralConfig::$maxUploadFileSize](craft3:craft\config\GeneralConfig::$maxUploadFileSize)



The maximum upload file size allowed.

See [craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) for a list of supported value types.



## Image Handling

### `brokenImagePath`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$brokenImagePath](craft3:craft\config\GeneralConfig::$brokenImagePath)

Since
:   3.5.0



The server path to an image file that should be sent when responding to an image request with a
404 status code.

This can be set to an aliased path such as `@webroot/assets/404.svg`.



### `defaultImageQuality`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `82`

Defined by
:   [GeneralConfig::$defaultImageQuality](craft3:craft\config\GeneralConfig::$defaultImageQuality)



The quality level Craft will use when saving JPG and PNG files. Ranges from 1 (worst quality, smallest file) to
100 (best quality, biggest file).



### `generateTransformsBeforePageLoad`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$generateTransformsBeforePageLoad](craft3:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)



Whether image transforms should be generated before page load.



### `imageDriver`

Allowed types
:   `mixed`

Default value
:   `self::IMAGE_DRIVER_AUTO`

Defined by
:   [GeneralConfig::$imageDriver](craft3:craft\config\GeneralConfig::$imageDriver)



The image driver Craft should use to cleanse and transform images. By default Craft will use ImageMagick if it’s installed
and otherwise fall back to GD. You can explicitly set either `'imagick'` or `'gd'` here to override that behavior.



### `imageEditorRatios`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `['Unconstrained' => 'none', 'Original' => 'original', 'Square' => 1, '16:9' => 1.78, '10:8' => 1.25, '7:5' => 1.4, '4:3' => 1.33, '5:3' => 1.67, '3:2' => 1.5]`

Defined by
:   [GeneralConfig::$imageEditorRatios](craft3:craft\config\GeneralConfig::$imageEditorRatios)



An array containing the selectable image aspect ratios for the image editor. The array must be in the format
of `label` => `ratio`, where ratio must be a float or a string. For string values, only values of “none” and “original” are allowed.



### `maxCachedCloudImageSize`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `2000`

Defined by
:   [GeneralConfig::$maxCachedCloudImageSize](craft3:craft\config\GeneralConfig::$maxCachedCloudImageSize)



The maximum dimension size to use when caching images from external sources to use in transforms. Set to `0` to never cache them.



### `optimizeImageFilesize`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$optimizeImageFilesize](craft3:craft\config\GeneralConfig::$optimizeImageFilesize)



Whether Craft should optimize images for reduced file sizes without noticeably reducing image quality. (Only supported when
ImageMagick is used.)



### `preserveCmykColorspace`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$preserveCmykColorspace](craft3:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:   3.0.8



Whether CMYK should be preserved as the colorspace when manipulating images.

Setting this to `true` will prevent Craft from transforming CMYK images to sRGB, but on some ImageMagick versions it can cause
image color distortion. This will only have an effect if ImageMagick is in use.



### `preserveExifData`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$preserveExifData](craft3:craft\config\GeneralConfig::$preserveExifData)



Whether the EXIF data should be preserved when manipulating and uploading images.

Setting this to `true` will result in larger image file sizes.

This will only have effect if ImageMagick is in use.



### `preserveImageColorProfiles`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$preserveImageColorProfiles](craft3:craft\config\GeneralConfig::$preserveImageColorProfiles)



Whether the embedded Image Color Profile (ICC) should be preserved when manipulating images.

Setting this to `false` will reduce the image size a little bit, but on some ImageMagick versions can cause images to be saved with
an incorrect gamma value, which causes the images to become very dark. This will only have effect if ImageMagick is in use.



### `rasterizeSvgThumbs`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$rasterizeSvgThumbs](craft3:craft\config\GeneralConfig::$rasterizeSvgThumbs)

Since
:   3.6.0



Whether SVG thumbnails should be rasterized.

Note this will only work if ImageMagick is installed, and <config3:imageDriver> is set to either `auto` or `imagick`.



### `rotateImagesOnUploadByExifData`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$rotateImagesOnUploadByExifData](craft3:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)



Whether Craft should rotate images according to their EXIF data on upload.



### `transformGifs`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$transformGifs](craft3:craft\config\GeneralConfig::$transformGifs)

Since
:   3.0.7



Whether GIF files should be cleansed/transformed.



### `upscaleImages`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$upscaleImages](craft3:craft\config\GeneralConfig::$upscaleImages)

Since
:   3.4.0



Whether images should be upscaled if the provided transform size is larger than the image.



## GraphQL

### `allowedGraphqlOrigins`

Allowed types
:   [string](http://php.net/language.types.string)[], [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$allowedGraphqlOrigins](craft3:craft\config\GeneralConfig::$allowedGraphqlOrigins)

Since
:   3.5.0



The Ajax origins that should be allowed to access the GraphQL API, if enabled.

If this is set to an array, then `graphql/api` requests will only include the current request’s [origin](https://www.yiiframework.com/doc/api/2.0/yii-web-request#getOrigin()-detail)
in the `Access-Control-Allow-Origin` response header if it’s listed here.

If this is set to `false`, then the `Access-Control-Allow-Origin` response header will never be sent.



### `disableGraphqlTransformDirective`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$disableGraphqlTransformDirective](craft3:craft\config\GeneralConfig::$disableGraphqlTransformDirective)

Since
:   4.0.0



Whether the `transform` directive should be disabled for the GraphQL API.



### `enableGraphqlIntrospection`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableGraphqlIntrospection](craft3:craft\config\GeneralConfig::$enableGraphqlIntrospection)

Since
:   4.0.0



Whether GraphQL introspection queries are allowed. Defaults to `true` and is always allowed in the CP.



### `enableGql`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableGql](craft3:craft\config\GeneralConfig::$enableGql)

Since
:   3.3.1



Whether the GraphQL API should be enabled.

Note that the GraphQL API is only available for Craft Pro.



### `enableGraphQlCaching`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableGraphQlCaching](craft3:craft\config\GeneralConfig::$enableGraphQlCaching)

Since
:   3.3.12



Whether Craft should cache GraphQL queries.

If set to `true`, Craft will cache the results for unique GraphQL queries per access token. The cache is automatically invalidated any time
an element is saved, the site structure is updated, or a GraphQL schema is saved.

This setting will have no effect if a plugin is using the [craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) event to provide its own
caching logic and setting the `result` property.



### `gqlTypePrefix`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [GeneralConfig::$gqlTypePrefix](craft3:craft\config\GeneralConfig::$gqlTypePrefix)



Prefix to use for all type names returned by GraphQL.



### `maxGraphqlComplexity`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `0`

Defined by
:   [GeneralConfig::$maxGraphqlComplexity](craft3:craft\config\GeneralConfig::$maxGraphqlComplexity)

Since
:   4.0.0



The maximum allowed complexity a GraphQL query is allowed to have. Set to `0` to allow any complexity.



### `maxGraphqlDepth`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `0`

Defined by
:   [GeneralConfig::$maxGraphqlDepth](craft3:craft\config\GeneralConfig::$maxGraphqlDepth)

Since
:   4.0.0



The maximum allowed depth a GraphQL query is allowed to reach. Set to `0` to allow any depth.



### `maxGraphqlResults`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `0`

Defined by
:   [GeneralConfig::$maxGraphqlResults](craft3:craft\config\GeneralConfig::$maxGraphqlResults)

Since
:   4.0.0



The maximum allowed results for a single GraphQL query. Set to `0` to disable any limits.



## Garbage Collection

### `purgePendingUsersDuration`

Allowed types
:   `mixed`

Default value
:   `0`

Defined by
:   [GeneralConfig::$purgePendingUsersDuration](craft3:craft\config\GeneralConfig::$purgePendingUsersDuration)



The amount of time to wait before Craft purges pending users from the system that have not activated.

Any content assigned to a pending user will be deleted as well when the given time interval passes.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: tip
Users will only be purged when [garbage collection](https://craftcms.com/docs/3.x/gc.html) is run.
:::



### `purgeStaleUserSessionDuration`

Allowed types
:   `mixed`

Default value
:   `7776000` (90 days)

Defined by
:   [GeneralConfig::$purgeStaleUserSessionDuration](craft3:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

Since
:   3.3.0



The amount of time to wait before Craft purges stale user sessions from the sessions table in the database.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `softDeleteDuration`

Allowed types
:   `mixed`

Default value
:   `2592000` (30 days)

Defined by
:   [GeneralConfig::$softDeleteDuration](craft3:craft\config\GeneralConfig::$softDeleteDuration)

Since
:   3.1.0



The amount of time before a soft-deleted item will be up for hard-deletion by garbage collection.

Set to `0` if you don’t ever want to delete soft-deleted items.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.




<!-- END SETTINGS -->
