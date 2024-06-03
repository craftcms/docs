<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN SETTINGS -->

## System

### `accessibilityDefaults`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[
    'alwaysShowFocusRings' => false,
    'useShapes' => false,
    'underlineLinks' => false,
    'disableAutofocus' => false,
    'notificationDuration' => 5000,
]`

Defined by
:  [GeneralConfig::$accessibilityDefaults](craft5:craft\config\GeneralConfig::$accessibilityDefaults)

Since
:  3.6.4

</div>

The default user accessibility preferences that should be applied to users that haven’t saved their preferences yet.



### `allowAdminChanges`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$allowAdminChanges](craft5:craft\config\GeneralConfig::$allowAdminChanges)

Since
:  3.1.0

</div>

Whether admins should be allowed to make administrative changes to the system.



### `allowSimilarTags`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$allowSimilarTags](craft5:craft\config\GeneralConfig::$allowSimilarTags)

</div>

Whether users should be allowed to create similarly-named tags.



### `allowUpdates`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$allowUpdates](craft5:craft\config\GeneralConfig::$allowUpdates)

</div>

Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.



### `autoLoginAfterAccountActivation`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$autoLoginAfterAccountActivation](craft5:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)

</div>

Whether users should automatically be logged in after activating their account or resetting their password.



### `autosaveDrafts`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$autosaveDrafts](craft5:craft\config\GeneralConfig::$autosaveDrafts)

Since
:  3.5.6

Deprecated
:  in 4.0.0

</div>

Whether drafts should be saved automatically as they are edited.



### `backupOnUpdate`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$backupOnUpdate](craft5:craft\config\GeneralConfig::$backupOnUpdate)

</div>

Whether Craft should create a database backup before applying a new system update.



### `cacheDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$cacheDuration](craft5:craft\config\GeneralConfig::$cacheDuration)

</div>

The default length of time Craft will store data, RSS feed, and template caches.



### `cpHeadTags`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$cpHeadTags](craft5:craft\config\GeneralConfig::$cpHeadTags)

Since
:  3.5.0

</div>

List of additional HTML tags that should be included in the `<head>` of control panel pages.



### `defaultCountryCode`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'US'`

Defined by
:  [GeneralConfig::$defaultCountryCode](craft5:craft\config\GeneralConfig::$defaultCountryCode)

Since
:  4.5.0

</div>

The two-letter country code that addresses will be set to by default.



### `defaultCpLanguage`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultCpLanguage](craft5:craft\config\GeneralConfig::$defaultCpLanguage)

</div>

The default language the control panel should use for users who haven’t set a preferred language yet.



### `defaultCpLocale`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultCpLocale](craft5:craft\config\GeneralConfig::$defaultCpLocale)

Since
:  3.5.0

</div>

The default locale the control panel should use for date/number formatting, for users who haven’t set
a preferred language or formatting locale.



### `defaultDirMode`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `0775`

Defined by
:  [GeneralConfig::$defaultDirMode](craft5:craft\config\GeneralConfig::$defaultDirMode)

</div>

The default permission to be set for newly-generated directories.



### `defaultFileMode`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultFileMode](craft5:craft\config\GeneralConfig::$defaultFileMode)

</div>

The default permission to be set for newly-generated files.



### `defaultSearchTermOptions`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$defaultSearchTermOptions](craft5:craft\config\GeneralConfig::$defaultSearchTermOptions)

</div>

The default options that should be applied to each search term.



### `defaultTemplateExtensions`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[
    'twig',
    'html',
]`

Defined by
:  [GeneralConfig::$defaultTemplateExtensions](craft5:craft\config\GeneralConfig::$defaultTemplateExtensions)

</div>

The template file extensions Craft will look for when matching a template path to a file on the front end.



### `defaultWeekStartDay`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `1` (Monday)

Defined by
:  [GeneralConfig::$defaultWeekStartDay](craft5:craft\config\GeneralConfig::$defaultWeekStartDay)

</div>

The default day new users should have set as their Week Start Day.



### `devMode`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$devMode](craft5:craft\config\GeneralConfig::$devMode)

</div>

Whether the system should run in [Dev Mode](https://craftcms.com/support/dev-mode).



### `disabledPlugins`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$disabledPlugins](craft5:craft\config\GeneralConfig::$disabledPlugins)

Since
:  3.1.9

</div>

Array of plugin handles that should be disabled, regardless of what the project config says.



### `disabledUtilities`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[]`

Defined by
:  [GeneralConfig::$disabledUtilities](craft5:craft\config\GeneralConfig::$disabledUtilities)

Since
:  4.6.0

</div>

Array of utility IDs that should be disabled.



### `disallowRobots`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$disallowRobots](craft5:craft\config\GeneralConfig::$disallowRobots)

Since
:  3.5.10

</div>

Whether front end requests should respond with `X-Robots-Tag: none` HTTP headers, indicating that pages should not be indexed,
and links on the page should not be followed, by web crawlers.



### `enableTemplateCaching`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableTemplateCaching](craft5:craft\config\GeneralConfig::$enableTemplateCaching)

</div>

Whether to enable Craft’s template `{% cache %}` tag on a global basis.



### `errorTemplatePrefix`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$errorTemplatePrefix](craft5:craft\config\GeneralConfig::$errorTemplatePrefix)

</div>

The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.



### `extraAllowedFileExtensions`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$extraAllowedFileExtensions](craft5:craft\config\GeneralConfig::$extraAllowedFileExtensions)

</div>

List of file extensions that will be merged into the <config4:allowedFileExtensions> config setting.



### `extraAppLocales`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$extraAppLocales](craft5:craft\config\GeneralConfig::$extraAppLocales)

Since
:  3.0.24

</div>

List of extra locale IDs that the application should support, and users should be able to select as their Preferred Language.



### `handleCasing`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `GeneralConfig::CAMEL_CASE`

Defined by
:  [GeneralConfig::$handleCasing](craft5:craft\config\GeneralConfig::$handleCasing)

Since
:  3.6.0

</div>

The casing to use for autogenerated component handles.



### `headlessMode`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$headlessMode](craft5:craft\config\GeneralConfig::$headlessMode)

Since
:  3.3.0

</div>

Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations.



### `httpProxy`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$httpProxy](craft5:craft\config\GeneralConfig::$httpProxy)

Since
:  3.7.0

</div>

The proxy server that should be used for outgoing HTTP requests.



### `indexTemplateFilenames`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[
    'index',
]`

Defined by
:  [GeneralConfig::$indexTemplateFilenames](craft5:craft\config\GeneralConfig::$indexTemplateFilenames)

</div>

The template filenames Craft will look for within a directory to represent the directory’s “index” template when
matching a template path to a file on the front end.



### `ipHeaders`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$ipHeaders](craft5:craft\config\GeneralConfig::$ipHeaders)

</div>

List of headers where proxies store the real client IP.



### `isSystemLive`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$isSystemLive](craft5:craft\config\GeneralConfig::$isSystemLive)

</div>

Whether the site is currently live. If set to `true` or `false`, it will take precedence over the System Status setting
in Settings → General.



### `limitAutoSlugsToAscii`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$limitAutoSlugsToAscii](craft5:craft\config\GeneralConfig::$limitAutoSlugsToAscii)

</div>

Whether non-ASCII characters in auto-generated slugs should be converted to ASCII (i.e. ñ → n).



### `localeAliases`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$localeAliases](craft5:craft\config\GeneralConfig::$localeAliases)

Since
:  5.0.0

</div>

Custom locale aliases, which will be included when fetching all known locales.



### `maxBackups`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [false](https://php.net/language.types.boolean)

Default value
:  `20`

Defined by
:  [GeneralConfig::$maxBackups](craft5:craft\config\GeneralConfig::$maxBackups)

</div>

The number of backups Craft should make before it starts deleting the oldest backups. If set to `false`, Craft will
not delete any backups.



### `maxRevisions`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [null](https://php.net/language.types.null)

Default value
:  `50`

Defined by
:  [GeneralConfig::$maxRevisions](craft5:craft\config\GeneralConfig::$maxRevisions)

Since
:  3.2.0

</div>

The maximum number of revisions that should be stored for each element.



### `maxSlugIncrement`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `100`

Defined by
:  [GeneralConfig::$maxSlugIncrement](craft5:craft\config\GeneralConfig::$maxSlugIncrement)

</div>

The highest number Craft will tack onto a slug in order to make it unique before giving up and throwing an error.



### `partialTemplatesPath`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'_partials'`

Defined by
:  [GeneralConfig::$partialTemplatesPath](craft5:craft\config\GeneralConfig::$partialTemplatesPath)

Since
:  5.0.0

</div>

The path within the `templates` folder where element partial templates will live.



### `permissionsPolicyHeader`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$permissionsPolicyHeader](craft5:craft\config\GeneralConfig::$permissionsPolicyHeader)

Since
:  3.6.14

</div>

The `Permissions-Policy` header that should be sent for web responses.



### `phpMaxMemoryLimit`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$phpMaxMemoryLimit](craft5:craft\config\GeneralConfig::$phpMaxMemoryLimit)

</div>

The maximum amount of memory Craft will try to reserve during memory-intensive operations such as zipping,
unzipping and updating. Defaults to an empty string, which means it will use as much memory as it can.



### `preloadSingles`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preloadSingles](craft5:craft\config\GeneralConfig::$preloadSingles)

Since
:  4.4.0

</div>

Whether Single section entries should be preloaded for Twig templates.



### `previewIframeResizerOptions`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$previewIframeResizerOptions](craft5:craft\config\GeneralConfig::$previewIframeResizerOptions)

Since
:  3.5.0

</div>

Custom [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) that should be used for preview iframes.



### `privateTemplateTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'_'`

Defined by
:  [GeneralConfig::$privateTemplateTrigger](craft5:craft\config\GeneralConfig::$privateTemplateTrigger)

</div>

The template path segment prefix that should be used to identify “private” templates, which are templates that are not
directly accessible via a matching URL.



### `runQueueAutomatically`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$runQueueAutomatically](craft5:craft\config\GeneralConfig::$runQueueAutomatically)

</div>

Whether Craft should run pending queue jobs automatically when someone visits the control panel.



### `safeMode`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$safeMode](craft5:craft\config\GeneralConfig::$safeMode)

Since
:  4.9.0

</div>

Whether the system should run in Safe Mode.



### `sameSiteCookieValue`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$sameSiteCookieValue](craft5:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:  3.1.33

</div>

The [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) value that should be set on Craft cookies, if any.



### `sendContentLengthHeader`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$sendContentLengthHeader](craft5:craft\config\GeneralConfig::$sendContentLengthHeader)

Since
:  3.7.3

</div>

Whether a `Content-Length` header should be sent with responses.



### `sendPoweredByHeader`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sendPoweredByHeader](craft5:craft\config\GeneralConfig::$sendPoweredByHeader)

</div>

Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and
[Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.



### `slugWordSeparator`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'-'`

Defined by
:  [GeneralConfig::$slugWordSeparator](craft5:craft\config\GeneralConfig::$slugWordSeparator)

</div>

The character(s) that should be used to separate words in slugs.



### `testToEmailAddress`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [array](https://php.net/language.types.array), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$testToEmailAddress](craft5:craft\config\GeneralConfig::$testToEmailAddress)

</div>

Configures Craft to send all system emails to either a single email address or an array of email addresses
for testing purposes.



### `timezone`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$timezone](craft5:craft\config\GeneralConfig::$timezone)

</div>

The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.



### `translationDebugOutput`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$translationDebugOutput](craft5:craft\config\GeneralConfig::$translationDebugOutput)

</div>

Whether translated messages should be wrapped in special characters to help find any strings that are not being run through
`Craft::t()` or the `|translate` filter.



### `useEmailAsUsername`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$useEmailAsUsername](craft5:craft\config\GeneralConfig::$useEmailAsUsername)

</div>

Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.



### `useFileLocks`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$useFileLocks](craft5:craft\config\GeneralConfig::$useFileLocks)

</div>

Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.



### `useIframeResizer`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$useIframeResizer](craft5:craft\config\GeneralConfig::$useIframeResizer)

Since
:  3.5.5

</div>

Whether [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) should be used for Live Preview.



## Environment

### `aliases`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$aliases](craft5:craft\config\GeneralConfig::$aliases)

</div>

Any custom Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases) that should be defined for every request.



### `backupCommand`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean), [Closure](https://php.net/class.closure)

Default value
:  `null`

Defined by
:  [GeneralConfig::$backupCommand](craft5:craft\config\GeneralConfig::$backupCommand)

</div>

The shell command that Craft should execute to create a database backup.



### `backupCommandFormat`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$backupCommandFormat](craft5:craft\config\GeneralConfig::$backupCommandFormat)

Since
:  4.9.0

</div>

The output format that database backups should use (PostgreSQL only).



### `buildId`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$buildId](craft5:craft\config\GeneralConfig::$buildId)

Since
:  4.0.0

</div>

A unique ID representing the current build of the codebase.



### `defaultCookieDomain`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$defaultCookieDomain](craft5:craft\config\GeneralConfig::$defaultCookieDomain)

</div>

The domain that cookies generated by Craft should be created for. If blank, it will be left up to the browser to determine
which domain to use (almost always the current). If you want the cookies to work for all subdomains, for example, you could
set this to `'.my-project.tld'`.



### `resourceBasePath`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'@webroot/cpresources'`

Defined by
:  [GeneralConfig::$resourceBasePath](craft5:craft\config\GeneralConfig::$resourceBasePath)

</div>

The path to the root directory that should store published control panel resources.



### `resourceBaseUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'@web/cpresources'`

Defined by
:  [GeneralConfig::$resourceBaseUrl](craft5:craft\config\GeneralConfig::$resourceBaseUrl)

</div>

The URL to the root directory that should store published control panel resources.



### `restoreCommand`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean), [Closure](https://php.net/class.closure)

Default value
:  `null`

Defined by
:  [GeneralConfig::$restoreCommand](craft5:craft\config\GeneralConfig::$restoreCommand)

</div>

The shell command Craft should execute to restore a database backup.



## Routing

### `actionTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'actions'`

Defined by
:  [GeneralConfig::$actionTrigger](craft5:craft\config\GeneralConfig::$actionTrigger)

</div>

The URI segment Craft should look for when determining if the current request should be routed to a controller action.



### `activateAccountSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$activateAccountSuccessPath](craft5:craft\config\GeneralConfig::$activateAccountSuccessPath)

</div>

The URI that users without access to the control panel should be redirected to after activating their account.



### `addTrailingSlashesToUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$addTrailingSlashesToUrls](craft5:craft\config\GeneralConfig::$addTrailingSlashesToUrls)

</div>

Whether auto-generated URLs should have trailing slashes.



### `allowUppercaseInSlug`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$allowUppercaseInSlug](craft5:craft\config\GeneralConfig::$allowUppercaseInSlug)

</div>

Whether uppercase letters should be allowed in slugs.



### `baseCpUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$baseCpUrl](craft5:craft\config\GeneralConfig::$baseCpUrl)

</div>

The base URL Craft should use when generating control panel URLs.



### `cpTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `'admin'`

Defined by
:  [GeneralConfig::$cpTrigger](craft5:craft\config\GeneralConfig::$cpTrigger)

</div>

The URI segment Craft should look for when determining if the current request should route to the control panel rather than
the front-end website.



### `invalidUserTokenPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$invalidUserTokenPath](craft5:craft\config\GeneralConfig::$invalidUserTokenPath)

</div>

The URI Craft should redirect to when user token validation fails. A token is used on things like setting and resetting user account
passwords. Note that this only affects front-end site requests.



### `loginPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'login'`

Defined by
:  [GeneralConfig::$loginPath](craft5:craft\config\GeneralConfig::$loginPath)

</div>

The URI Craft should use for user login on the front end.



### `logoutPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'logout'`

Defined by
:  [GeneralConfig::$logoutPath](craft5:craft\config\GeneralConfig::$logoutPath)

</div>

The URI Craft should use for user logout on the front end.



### `omitScriptNameInUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$omitScriptNameInUrls](craft5:craft\config\GeneralConfig::$omitScriptNameInUrls)

</div>

Whether generated URLs should omit `index.php` (e.g. `http://my-project.tld/path` instead of `http://my-project.tld/index.php/path`)



### `pageTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'p'`

Defined by
:  [GeneralConfig::$pageTrigger](craft5:craft\config\GeneralConfig::$pageTrigger)

</div>

The string preceding a number which Craft will look for when determining if the current request is for a particular page in
a paginated list of pages.



### `pathParam`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `'p'`

Defined by
:  [GeneralConfig::$pathParam](craft5:craft\config\GeneralConfig::$pathParam)

</div>

The query string param that Craft will check when determining the request’s path.



### `postCpLoginRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'dashboard'`

Defined by
:  [GeneralConfig::$postCpLoginRedirect](craft5:craft\config\GeneralConfig::$postCpLoginRedirect)

</div>

The path users should be redirected to after logging into the control panel.



### `postLoginRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$postLoginRedirect](craft5:craft\config\GeneralConfig::$postLoginRedirect)

</div>

The path users should be redirected to after logging in from the front-end site.



### `postLogoutRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$postLogoutRedirect](craft5:craft\config\GeneralConfig::$postLogoutRedirect)

</div>

The path that users should be redirected to after logging out from the front-end site.



### `setPasswordPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'setpassword'`

Defined by
:  [GeneralConfig::$setPasswordPath](craft5:craft\config\GeneralConfig::$setPasswordPath)

</div>

The URI or URL that Craft should use for Set Password forms on the front end.



### `setPasswordRequestPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null`

Defined by
:  [GeneralConfig::$setPasswordRequestPath](craft5:craft\config\GeneralConfig::$setPasswordRequestPath)

Since
:  3.5.14

</div>

The URI to the page where users can request to change their password.



### `setPasswordSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$setPasswordSuccessPath](craft5:craft\config\GeneralConfig::$setPasswordSuccessPath)

</div>

The URI Craft should redirect users to after setting their password from the front end.



### `siteToken`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'siteToken'`

Defined by
:  [GeneralConfig::$siteToken](craft5:craft\config\GeneralConfig::$siteToken)

Since
:  3.5.0

</div>

The query string parameter name that site tokens should be set to.



### `tokenParam`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'token'`

Defined by
:  [GeneralConfig::$tokenParam](craft5:craft\config\GeneralConfig::$tokenParam)

</div>

The query string parameter name that Craft tokens should be set to.



### `usePathInfo`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$usePathInfo](craft5:craft\config\GeneralConfig::$usePathInfo)

</div>

Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.



### `useSslOnTokenizedUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [string](https://php.net/language.types.string)

Default value
:  `'auto'`

Defined by
:  [GeneralConfig::$useSslOnTokenizedUrls](craft5:craft\config\GeneralConfig::$useSslOnTokenizedUrls)

</div>

Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the
current site’s base URL and the protocol of the current request and if either of them are HTTPS will use `https` in the tokenized URL. If not,
will use `http`.



### `verifyEmailPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'verifyemail'`

Defined by
:  [GeneralConfig::$verifyEmailPath](craft5:craft\config\GeneralConfig::$verifyEmailPath)

Since
:  3.4.0

</div>

The URI or URL that Craft should use for email verification links on the front end.



### `verifyEmailSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$verifyEmailSuccessPath](craft5:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:  3.1.20

</div>

The URI that users without access to the control panel should be redirected to after verifying a new email address.



## Session

### `phpSessionName`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'CraftSessionId'`

Defined by
:  [GeneralConfig::$phpSessionName](craft5:craft\config\GeneralConfig::$phpSessionName)

</div>

The name of the PHP session cookie.



### `rememberUsernameDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `31536000` (1 year)

Defined by
:  [GeneralConfig::$rememberUsernameDuration](craft5:craft\config\GeneralConfig::$rememberUsernameDuration)

</div>

The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.



### `rememberedUserSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `1209600` (14 days)

Defined by
:  [GeneralConfig::$rememberedUserSessionDuration](craft5:craft\config\GeneralConfig::$rememberedUserSessionDuration)

</div>

The amount of time a user stays logged if “Remember Me” is checked on the login page.



### `requireMatchingUserAgentForSession`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$requireMatchingUserAgentForSession](craft5:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)

</div>

Whether Craft should require a matching user agent string when restoring a user session from a cookie.



### `requireUserAgentAndIpForSession`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$requireUserAgentAndIpForSession](craft5:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)

</div>

Whether Craft should require the existence of a user agent string and IP address when creating a new user session.



### `userSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `3600` (1 hour)

Defined by
:  [GeneralConfig::$userSessionDuration](craft5:craft\config\GeneralConfig::$userSessionDuration)

</div>

The amount of time before a user will get logged out due to inactivity.



## Security

### `asyncCsrfInputs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$asyncCsrfInputs](craft5:craft\config\GeneralConfig::$asyncCsrfInputs)

Since
:  4.9.0

</div>

Whether CSRF values should be injected via JavaScript for greater cache-ability.



### `blowfishHashCost`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `13`

Defined by
:  [GeneralConfig::$blowfishHashCost](craft5:craft\config\GeneralConfig::$blowfishHashCost)

</div>

The higher the cost value, the longer it takes to generate a password hash and to verify against it.



### `cooldownDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `300` (5 minutes)

Defined by
:  [GeneralConfig::$cooldownDuration](craft5:craft\config\GeneralConfig::$cooldownDuration)

</div>

The amount of time a user must wait before re-attempting to log in after their account is locked due to too many
failed login attempts.



### `csrfTokenName`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'CRAFT_CSRF_TOKEN'`

Defined by
:  [GeneralConfig::$csrfTokenName](craft5:craft\config\GeneralConfig::$csrfTokenName)

</div>

The name of CSRF token used for CSRF validation if <config4:enableCsrfProtection> is set to `true`.



### `defaultTokenDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$defaultTokenDuration](craft5:craft\config\GeneralConfig::$defaultTokenDuration)

</div>

The default amount of time tokens can be used before expiring.



### `deferPublicRegistrationPassword`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$deferPublicRegistrationPassword](craft5:craft\config\GeneralConfig::$deferPublicRegistrationPassword)

</div>

By default, Craft requires a front-end “password” field for public user registrations. Setting this to `true`
removes that requirement for the initial registration form.



### `elevatedSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `300` (5 minutes)

Defined by
:  [GeneralConfig::$elevatedSessionDuration](craft5:craft\config\GeneralConfig::$elevatedSessionDuration)

</div>

The amount of time a user’s elevated session will last, which is required for some sensitive actions (e.g. user group/permission assignment).



### `enableBasicHttpAuth`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$enableBasicHttpAuth](craft5:craft\config\GeneralConfig::$enableBasicHttpAuth)

Since
:  3.5.0

</div>

Whether front-end web requests should support basic HTTP authentication.



### `enableCsrfCookie`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableCsrfCookie](craft5:craft\config\GeneralConfig::$enableCsrfCookie)

</div>

Whether to use a cookie to persist the CSRF token if <config4:enableCsrfProtection> is enabled. If false, the CSRF token will be
stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security,
it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.



### `enableCsrfProtection`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableCsrfProtection](craft5:craft\config\GeneralConfig::$enableCsrfProtection)

</div>

Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.



### `invalidLoginWindowDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `3600` (1 hour)

Defined by
:  [GeneralConfig::$invalidLoginWindowDuration](craft5:craft\config\GeneralConfig::$invalidLoginWindowDuration)

</div>

The amount of time to track invalid login attempts for a user, for determining if Craft should lock an account.



### `maxInvalidLogins`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [false](https://php.net/language.types.boolean)

Default value
:  `5`

Defined by
:  [GeneralConfig::$maxInvalidLogins](craft5:craft\config\GeneralConfig::$maxInvalidLogins)

</div>

The number of invalid login attempts Craft will allow within the specified duration before the account gets locked.



### `preventUserEnumeration`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preventUserEnumeration](craft5:craft\config\GeneralConfig::$preventUserEnumeration)

</div>

When `true`, Craft will always return a successful response in the “forgot password” flow, making it difficult to enumerate users.



### `previewTokenDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null` (1 day)

Defined by
:  [GeneralConfig::$previewTokenDuration](craft5:craft\config\GeneralConfig::$previewTokenDuration)

Since
:  3.7.0

</div>

The amount of time content preview tokens can be used before expiring.



### `sanitizeCpImageUploads`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sanitizeCpImageUploads](craft5:craft\config\GeneralConfig::$sanitizeCpImageUploads)

Since
:  3.6.0

</div>

Whether images uploaded via the control panel should be sanitized.



### `sanitizeSvgUploads`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sanitizeSvgUploads](craft5:craft\config\GeneralConfig::$sanitizeSvgUploads)

</div>

Whether Craft should sanitize uploaded SVG files and strip out potential malicious-looking content.



### `secureHeaders`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$secureHeaders](craft5:craft\config\GeneralConfig::$secureHeaders)

</div>

Lists of headers that are, by default, subject to the trusted host configuration.



### `secureProtocolHeaders`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$secureProtocolHeaders](craft5:craft\config\GeneralConfig::$secureProtocolHeaders)

</div>

List of headers to check for determining whether the connection is made via HTTPS.



### `securityKey`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$securityKey](craft5:craft\config\GeneralConfig::$securityKey)

</div>

A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](craft5:craft\services\Security).



### `storeUserIps`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$storeUserIps](craft5:craft\config\GeneralConfig::$storeUserIps)

Since
:  3.1.0

</div>

Whether user IP addresses should be stored/logged by the system.



### `trustedHosts`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[
    'any',
]`

Defined by
:  [GeneralConfig::$trustedHosts](craft5:craft\config\GeneralConfig::$trustedHosts)

</div>

The configuration for trusted security-related headers.



### `useSecureCookies`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [string](https://php.net/language.types.string)

Default value
:  `'auto'`

Defined by
:  [GeneralConfig::$useSecureCookies](craft5:craft\config\GeneralConfig::$useSecureCookies)

</div>

Whether Craft will set the “secure” flag when saving cookies when using `Craft::cookieConfig()` to create a cookie.



### `verificationCodeDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$verificationCodeDuration](craft5:craft\config\GeneralConfig::$verificationCodeDuration)

</div>

The amount of time a user verification code can be used before expiring.



## Assets

### `allowedFileExtensions`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[
    '7z',
    'aiff',
    'asc',
    'asf',
    'avi',
    'avif',
    'bmp',
    'cap',
    'cin',
    'csv',
    'dfxp',
    'doc',
    'docx',
    'dotm',
    'dotx',
    'fla',
    'flv',
    'gif',
    'gz',
    'gzip',
    'heic',
    'heif',
    'hevc',
    'itt',
    'jp2',
    'jpeg',
    'jpg',
    'jpx',
    'js',
    'json',
    'lrc',
    'm2t',
    'm4a',
    'm4v',
    'mcc',
    'mid',
    'mov',
    'mp3',
    'mp4',
    'mpc',
    'mpeg',
    'mpg',
    'mpsub',
    'ods',
    'odt',
    'ogg',
    'ogv',
    'pdf',
    'png',
    'potx',
    'pps',
    'ppsm',
    'ppsx',
    'ppt',
    'pptm',
    'pptx',
    'ppz',
    'pxd',
    'qt',
    'ram',
    'rar',
    'rm',
    'rmi',
    'rmvb',
    'rt',
    'rtf',
    'sami',
    'sbv',
    'scc',
    'sdc',
    'sitd',
    'smi',
    'srt',
    'stl',
    'sub',
    'svg',
    'swf',
    'sxc',
    'sxw',
    'tar',
    'tds',
    'tgz',
    'tif',
    'tiff',
    'ttml',
    'txt',
    'vob',
    'vsd',
    'vtt',
    'wav',
    'webm',
    'webp',
    'wma',
    'wmv',
    'xls',
    'xlsx',
    'zip',
]`

Defined by
:  [GeneralConfig::$allowedFileExtensions](craft5:craft\config\GeneralConfig::$allowedFileExtensions)

</div>

The file extensions Craft should allow when a user is uploading files.



### `convertFilenamesToAscii`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$convertFilenamesToAscii](craft5:craft\config\GeneralConfig::$convertFilenamesToAscii)

</div>

Whether uploaded filenames with non-ASCII characters should be converted to ASCII (i.e. `ñ` → `n`).



### `extraFileKinds`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$extraFileKinds](craft5:craft\config\GeneralConfig::$extraFileKinds)

Since
:  3.0.37

</div>

List of additional file kinds Craft should support. This array will get merged with the one defined in
`\craft\helpers\Assets::_buildFileKinds()`.



### `filenameWordSeparator`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [false](https://php.net/language.types.boolean)

Default value
:  `'-'`

Defined by
:  [GeneralConfig::$filenameWordSeparator](craft5:craft\config\GeneralConfig::$filenameWordSeparator)

</div>

The string to use to separate words when uploading assets. If set to `false`, spaces will be left alone.



### `maxUploadFileSize`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [string](https://php.net/language.types.string)

Default value
:  `16777216` (16MB)

Defined by
:  [GeneralConfig::$maxUploadFileSize](craft5:craft\config\GeneralConfig::$maxUploadFileSize)

</div>

The maximum upload file size allowed.



### `revAssetUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$revAssetUrls](craft5:craft\config\GeneralConfig::$revAssetUrls)

Since
:  3.7.0

</div>

Whether asset URLs should be revved so browsers don’t load cached versions when they’re modified.



### `tempAssetUploadFs`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$tempAssetUploadFs](craft5:craft\config\GeneralConfig::$tempAssetUploadFs)

Since
:  5.0.0

</div>

The handle of the filesystem that should be used for storing temporary asset uploads. A local temp folder will
be used by default.



## Image Handling

### `brokenImagePath`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$brokenImagePath](craft5:craft\config\GeneralConfig::$brokenImagePath)

Since
:  3.5.0

</div>

The server path to an image file that should be sent when responding to an image request with a
404 status code.



### `defaultImageQuality`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `82`

Defined by
:  [GeneralConfig::$defaultImageQuality](craft5:craft\config\GeneralConfig::$defaultImageQuality)

</div>

The quality level Craft will use when saving JPG and PNG files. Ranges from 1 (worst quality, smallest file) to
100 (best quality, biggest file).



### `generateTransformsBeforePageLoad`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$generateTransformsBeforePageLoad](craft5:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)

</div>

Whether image transforms should be generated before page load.



### `imageDriver`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `GeneralConfig::IMAGE_DRIVER_AUTO`

Defined by
:  [GeneralConfig::$imageDriver](craft5:craft\config\GeneralConfig::$imageDriver)

</div>

The image driver Craft should use to cleanse and transform images. By default Craft will use ImageMagick if it’s installed
and otherwise fall back to GD. You can explicitly set either `'imagick'` or `'gd'` here to override that behavior.



### `imageEditorRatios`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[
    'Unconstrained' => 'none',
    'Original' => 'original',
    'Square' => 1,
    '16:9' => 1.78,
    '10:8' => 1.25,
    '7:5' => 1.4,
    '4:3' => 1.33,
    '5:3' => 1.67,
    '3:2' => 1.5,
]`

Defined by
:  [GeneralConfig::$imageEditorRatios](craft5:craft\config\GeneralConfig::$imageEditorRatios)

</div>

An array containing the selectable image aspect ratios for the image editor. The array must be in the format
of `label` => `ratio`, where ratio must be a float or a string. For string values, only values of “none” and “original” are allowed.



### `maxCachedCloudImageSize`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `2000`

Defined by
:  [GeneralConfig::$maxCachedCloudImageSize](craft5:craft\config\GeneralConfig::$maxCachedCloudImageSize)

</div>

The maximum dimension size to use when caching images from external sources to use in transforms. Set to `0` to never cache them.



### `optimizeImageFilesize`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$optimizeImageFilesize](craft5:craft\config\GeneralConfig::$optimizeImageFilesize)

</div>

Whether Craft should optimize images for reduced file sizes without noticeably reducing image quality. (Only supported when
ImageMagick is used.)



### `preserveCmykColorspace`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preserveCmykColorspace](craft5:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:  3.0.8

</div>

Whether CMYK should be preserved as the colorspace when manipulating images.



### `preserveExifData`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preserveExifData](craft5:craft\config\GeneralConfig::$preserveExifData)

</div>

Whether the EXIF data should be preserved when manipulating and uploading images.



### `preserveImageColorProfiles`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$preserveImageColorProfiles](craft5:craft\config\GeneralConfig::$preserveImageColorProfiles)

</div>

Whether the embedded Image Color Profile (ICC) should be preserved when manipulating images.



### `rasterizeSvgThumbs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$rasterizeSvgThumbs](craft5:craft\config\GeneralConfig::$rasterizeSvgThumbs)

Since
:  3.6.0

</div>

Whether SVG thumbnails should be rasterized.



### `rotateImagesOnUploadByExifData`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$rotateImagesOnUploadByExifData](craft5:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)

</div>

Whether Craft should rotate images according to their EXIF data on upload.



### `transformGifs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$transformGifs](craft5:craft\config\GeneralConfig::$transformGifs)

Since
:  3.0.7

</div>

Whether GIF files should be cleansed/transformed.



### `transformSvgs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$transformSvgs](craft5:craft\config\GeneralConfig::$transformSvgs)

Since
:  3.7.1

</div>

Whether SVG files should be transformed.



### `upscaleImages`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$upscaleImages](craft5:craft\config\GeneralConfig::$upscaleImages)

Since
:  3.4.0

</div>

Whether image transforms should allow upscaling by default, for images that are smaller than the transform dimensions.



## GraphQL

### `allowedGraphqlOrigins`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$allowedGraphqlOrigins](craft5:craft\config\GeneralConfig::$allowedGraphqlOrigins)

Since
:  3.5.0

</div>

The Ajax origins that should be allowed to access the GraphQL API, if enabled.



### `disableGraphqlTransformDirective`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$disableGraphqlTransformDirective](craft5:craft\config\GeneralConfig::$disableGraphqlTransformDirective)

Since
:  3.6.0

</div>

Whether the `transform` directive should be disabled for the GraphQL API.



### `enableGql`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGql](craft5:craft\config\GeneralConfig::$enableGql)

Since
:  3.3.1

</div>

Whether the GraphQL API should be enabled.



### `enableGraphqlCaching`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGraphqlCaching](craft5:craft\config\GeneralConfig::$enableGraphqlCaching)

Since
:  3.3.12

</div>

Whether Craft should cache GraphQL queries.



### `enableGraphqlIntrospection`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGraphqlIntrospection](craft5:craft\config\GeneralConfig::$enableGraphqlIntrospection)

Since
:  3.6.0

</div>

Whether GraphQL introspection queries are allowed. Defaults to `true` and is always allowed in the control panel.



### `gqlTypePrefix`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$gqlTypePrefix](craft5:craft\config\GeneralConfig::$gqlTypePrefix)

</div>

Prefix to use for all type names returned by GraphQL.



### `maxGraphqlBatchSize`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlBatchSize](craft5:craft\config\GeneralConfig::$maxGraphqlBatchSize)

Since
:  4.5.5

</div>

The maximum allowed GraphQL queries that can be executed in a single batched request. Set to `0` to allow any number of queries.



### `maxGraphqlComplexity`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlComplexity](craft5:craft\config\GeneralConfig::$maxGraphqlComplexity)

Since
:  3.6.0

</div>

The maximum allowed complexity a GraphQL query is allowed to have. Set to `0` to allow any complexity.



### `maxGraphqlDepth`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlDepth](craft5:craft\config\GeneralConfig::$maxGraphqlDepth)

Since
:  3.6.0

</div>

The maximum allowed depth a GraphQL query is allowed to reach. Set to `0` to allow any depth.



### `maxGraphqlResults`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlResults](craft5:craft\config\GeneralConfig::$maxGraphqlResults)

Since
:  3.6.0

</div>

The maximum allowed results for a single GraphQL query. Set to `0` to disable any limits.



### `prefixGqlRootTypes`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$prefixGqlRootTypes](craft5:craft\config\GeneralConfig::$prefixGqlRootTypes)

Since
:  3.6.6

</div>

Whether the <config4:gqlTypePrefix> config setting should have an impact on `query`, `mutation`, and `subscription` types.



### `setGraphqlDatesToSystemTimeZone`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$setGraphqlDatesToSystemTimeZone](craft5:craft\config\GeneralConfig::$setGraphqlDatesToSystemTimeZone)

Since
:  3.7.0

</div>

Whether dates returned by the GraphQL API should be set to the system time zone by default, rather than UTC.



## Garbage Collection

### `purgePendingUsersDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `0`

Defined by
:  [GeneralConfig::$purgePendingUsersDuration](craft5:craft\config\GeneralConfig::$purgePendingUsersDuration)

</div>

The amount of time to wait before Craft purges pending users from the system that have not activated.



### `purgeStaleUserSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `7776000` (90 days)

Defined by
:  [GeneralConfig::$purgeStaleUserSessionDuration](craft5:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

Since
:  3.3.0

</div>

The amount of time to wait before Craft purges stale user sessions from the sessions table in the database.



### `purgeUnsavedDraftsDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `2592000` (30 days)

Defined by
:  [GeneralConfig::$purgeUnsavedDraftsDuration](craft5:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

Since
:  3.2.0

</div>

The amount of time to wait before Craft purges unpublished drafts that were never updated with content.



### `softDeleteDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `2592000` (30 days)

Defined by
:  [GeneralConfig::$softDeleteDuration](craft5:craft\config\GeneralConfig::$softDeleteDuration)

Since
:  3.1.0

</div>

The amount of time before a soft-deleted item will be up for hard-deletion by garbage collection.



## Users

### `extraLastNamePrefixes`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[]`

Defined by
:  [GeneralConfig::$extraLastNamePrefixes](craft5:craft\config\GeneralConfig::$extraLastNamePrefixes)

Since
:  4.3.0

</div>

Any additional last name prefixes that should be supported by the name parser.



### `extraNameSalutations`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[]`

Defined by
:  [GeneralConfig::$extraNameSalutations](craft5:craft\config\GeneralConfig::$extraNameSalutations)

Since
:  4.3.0

</div>

Any additional name salutations that should be supported by the name parser.



### `extraNameSuffixes`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[]`

Defined by
:  [GeneralConfig::$extraNameSuffixes](craft5:craft\config\GeneralConfig::$extraNameSuffixes)

Since
:  4.3.0

</div>

Any additional name suffixes that should be supported by the name parser.



### `showFirstAndLastNameFields`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$showFirstAndLastNameFields](craft5:craft\config\GeneralConfig::$showFirstAndLastNameFields)

Since
:  4.6.0

</div>

Whether “First Name” and “Last Name” fields should be shown in place of “Full Name” fields.




<!-- END SETTINGS -->
