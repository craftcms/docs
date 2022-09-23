# General Settings

This group of settings affects a wide variety of Craft’s features and behaviors. If you are uncertain about whether something is configurable or not, refer to the categories in the table of contents.

General settings go in `config/general.php`. The config file that ships with [new Craft projects](https://github.com/craftcms/craft/blob/master/config/general.php) looks like this:

```php
use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    ->defaultWeekStartDay(1)
    ->omitScriptNameInUrls()
    ->devMode(App::env('DEV_MODE') ?? false)
    ->allowAdminChanges(App::env('ALLOW_ADMIN_CHANGES') ?? false)
    ->disallowRobots(App::env('DISALLOW_ROBOTS') ?? false)
```

::: tip
There are a number of [ways to provide configuration](./README.md). This file uses the new “[fluent](./README.md#style-map-vs-fluent)” syntax, and contains references to [environment variables](./README.md#env) for settings that may change between environments.
:::

<!-- BEGIN SETTINGS -->

### `passwordPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null`

Defined by
:  [GeneralConfig::$passwordPath](craft4:craft\config\GeneralConfig::$passwordPath)

Since
:  4.2.0

</div>





### `passwordRequestPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null`

Defined by
:  [GeneralConfig::$passwordRequestPath](craft4:craft\config\GeneralConfig::$passwordRequestPath)

Since
:  4.2.0

</div>





### `passwordSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null`

Defined by
:  [GeneralConfig::$passwordSuccessPath](craft4:craft\config\GeneralConfig::$passwordSuccessPath)

Since
:  4.2.0

</div>





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
    'notificationDuration' => 5000,
]`

Defined by
:  [GeneralConfig::$accessibilityDefaults](craft4:craft\config\GeneralConfig::$accessibilityDefaults)

Since
:  3.6.4

</div>

The default user accessibility preferences that should be applied to users that haven’t saved their preferences yet.

The array can contain the following keys:

- `alwaysShowFocusRings` - Whether focus rings should always be shown when an element has focus.
- `useShapes` – Whether shapes should be used to represent statuses.
- `underlineLinks` – Whether links should be underlined.
- `notificationDuration` – How long notifications should be shown before they disappear automatically (in
  milliseconds). Set to `0` to show them indefinitely.

```php
->accessibilityDefaults([
    'useShapes' => true,
])
```



### `allowAdminChanges`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$allowAdminChanges](craft4:craft\config\GeneralConfig::$allowAdminChanges)

Since
:  3.1.0

</div>

Whether admins should be allowed to make administrative changes to the system.

When this is disabled, the Settings section will be hidden, the Craft edition and Craft/plugin versions will be locked,
and the project config and Plugin Store will become read-only—though Craft and plugin licenses may still be purchased.

It’s best to disable this in production environments with a deployment workflow that runs `composer install` and
[propagates project config updates](../project-config.md#propagating-changes) on deploy.

::: warning
Don’t disable this setting until **all** environments have been updated to Craft 3.1.0 or later.
:::

::: code
```php Static Config
->allowAdminChanges(false)
```
```shell Environment Override
CRAFT_ALLOW_ADMIN_CHANGES=false
```
:::



### `allowSimilarTags`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$allowSimilarTags](craft4:craft\config\GeneralConfig::$allowSimilarTags)

</div>

Whether users should be allowed to create similarly-named tags.

::: code
```php Static Config
->allowSimilarTags(true)
```
```shell Environment Override
CRAFT_ALLOW_SIMILAR_TAGS=1
```
:::



### `allowUpdates`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$allowUpdates](craft4:craft\config\GeneralConfig::$allowUpdates)

</div>

Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.

This setting will automatically be disabled if <config4:allowAdminChanges> is disabled.

::: code
```php Static Config
->allowUpdates(false)
```
```shell Environment Override
CRAFT_ALLOW_UPDATES=false
```
:::



### `autoLoginAfterAccountActivation`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$autoLoginAfterAccountActivation](craft4:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)

</div>

Whether users should automatically be logged in after activating their account or resetting their password.

::: code
```php Static Config
->autoLoginAfterAccountActivation(true)
```
```shell Environment Override
CRAFT_ALLOW_AUTO_LOGIN_AFTER_ACCOUNT_ACTIVATION=true
```
:::



### `autosaveDrafts`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$autosaveDrafts](craft4:craft\config\GeneralConfig::$autosaveDrafts)

Since
:  3.5.6

Deprecated
:  in 4.0.0

</div>

Whether drafts should be saved automatically as they are edited.

Drafts *will* be autosaved while Live Preview is open, regardless of this setting.

::: code
```php Static Config
->autosaveDrafts(false)
```
```shell Environment Override
CRAFT_AUTOSAVE_DRAFTS=false
```
:::



### `backupOnUpdate`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$backupOnUpdate](craft4:craft\config\GeneralConfig::$backupOnUpdate)

</div>

Whether Craft should create a database backup before applying a new system update.

::: code
```php Static Config
->backupOnUpdate(false)
```
```shell Environment Override
CRAFT_BACKUP_ON_UPDATE=false
```
:::



### `cacheDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$cacheDuration](craft4:craft\config\GeneralConfig::$cacheDuration)

</div>

The default length of time Craft will store data, RSS feed, and template caches.

If set to `0`, data and RSS feed caches will be stored indefinitely; template caches will be stored for one year.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->cacheDuration(0)
```
```shell Environment Override
CRAFT_CACHE_DURATION=0
```
:::



### `cpHeadTags`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$cpHeadTags](craft4:craft\config\GeneralConfig::$cpHeadTags)

Since
:  3.5.0

</div>

List of additional HTML tags that should be included in the `<head>` of control panel pages.

Each tag can be specified as an array of the tag name and its attributes.

For example, you can give the control panel a custom favicon (etc.) like this:

```php Static Config
->cpHeadTags([
    // Traditional favicon
    ['link', ['rel' => 'icon', 'href' => '/icons/favicon.ico']],
    // Scalable favicon for browsers that support them
    ['link', ['rel' => 'icon', 'type' => 'image/svg+xml', 'sizes' => 'any', 'href' => '/icons/favicon.svg']],
    // Touch icon for mobile devices
    ['link', ['rel' => 'apple-touch-icon', 'sizes' => '180x180', 'href' => '/icons/touch-icon.svg']],
    // Pinned tab icon for Safari
    ['link', ['rel' => 'mask-icon', 'href' => '/icons/mask-icon.svg', 'color' => '#663399']],
])
```



### `defaultCpLanguage`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultCpLanguage](craft4:craft\config\GeneralConfig::$defaultCpLanguage)

</div>

The default language the control panel should use for users who haven’t set a preferred language yet.

::: code
```php Static Config
->defaultCpLanguage('en-US')
```
```shell Environment Override
CRAFT_DEFAULT_CP_LANGUAGE=en-US
```
:::



### `defaultCpLocale`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultCpLocale](craft4:craft\config\GeneralConfig::$defaultCpLocale)

Since
:  3.5.0

</div>

The default locale the control panel should use for date/number formatting, for users who haven’t set
a preferred language or formatting locale.

If this is `null`, the <config4:defaultCpLanguage> config setting will determine which locale is used for date/number formatting by default.

::: code
```php Static Config
->defaultCpLocale('en-US')
```
```shell Environment Override
CRAFT_DEFAULT_CP_LOCALE=en-US
```
:::



### `defaultDirMode`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `0775`

Defined by
:  [GeneralConfig::$defaultDirMode](craft4:craft\config\GeneralConfig::$defaultDirMode)

</div>

The default permission to be set for newly-generated directories.

If set to `null`, the permission will be determined by the current environment.

::: code
```php Static Config
->defaultDirMode(0744)
```
```shell Environment Override
CRAFT_DEFAULT_DIR_MODE=0744
```
:::



### `defaultFileMode`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$defaultFileMode](craft4:craft\config\GeneralConfig::$defaultFileMode)

</div>

The default permission to be set for newly-generated files.

If set to `null`, the permission will be determined by the current environment.

::: code
```php Static Config
->defaultFileMode(0744)
```
```shell Environment Override
CRAFT_DEFAULT_FILE_MODE=0744
```
:::



### `defaultSearchTermOptions`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$defaultSearchTermOptions](craft4:craft\config\GeneralConfig::$defaultSearchTermOptions)

</div>

The default options that should be applied to each search term.

Options include:

- `subLeft` – Whether to include keywords that contain the term, with additional characters before it. (`false` by default)
- `subRight` – Whether to include keywords that contain the term, with additional characters after it. (`true` by default)
- `exclude` – Whether search results should *exclude* records with this term. (`false` by default)
- `exact` – Whether the term must be an exact match (only applies if the search term specifies an attribute). (`false` by default)

```php Static Config
->defaultSearchTermOptions([
    'subLeft' => true,
    'exclude' => 'secret',
])
```



### `defaultTemplateExtensions`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[
    'html',
    'twig',
]`

Defined by
:  [GeneralConfig::$defaultTemplateExtensions](craft4:craft\config\GeneralConfig::$defaultTemplateExtensions)

</div>

The template file extensions Craft will look for when matching a template path to a file on the front end.

::: code
```php Static Config
->defaultTemplateExtensions(['html', 'twig', 'txt'])
```
```shell Environment Override
CRAFT_DEFAULT_TEMPLATE_EXTENSIONS=html,twig,txt
```
:::



### `defaultWeekStartDay`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `1` (Monday)

Defined by
:  [GeneralConfig::$defaultWeekStartDay](craft4:craft\config\GeneralConfig::$defaultWeekStartDay)

</div>

The default day new users should have set as their Week Start Day.

This should be set to one of the following integers:

- `0` – Sunday
- `1` – Monday
- `2` – Tuesday
- `3` – Wednesday
- `4` – Thursday
- `5` – Friday
- `6` – Saturday

::: code
```php Static Config
->defaultWeekStartDay(0)
```
```shell Environment Override
CRAFT_DEFAULT_WEEK_START_DAY=0
```
:::



### `devMode`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$devMode](craft4:craft\config\GeneralConfig::$devMode)

</div>

Whether the system should run in [Dev Mode](https://craftcms.com/support/dev-mode).

::: code
```php Static Config
->devMode(true)
```
```shell Environment Override
CRAFT_DEV_MODE=true
```
:::



### `disabledPlugins`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$disabledPlugins](craft4:craft\config\GeneralConfig::$disabledPlugins)

Since
:  3.1.9

</div>

Array of plugin handles that should be disabled, regardless of what the project config says.

```php
->disabledPlugins([
    'webhooks',
])
```

This can also be set to `'*'` to disable **all** plugins.

```php
->disabledPlugins'('*')
```

::: warning
This should not be set on a per-environment basis, as it could result in plugin schema version mismatches
between environments, which will prevent project config changes from getting applied.
:::

::: code
```php Static Config
->disabledPlugins([
    'redactor',
    'webhooks',
])
```
```shell Environment Override
CRAFT_DISABLED_PLUGINS=redactor,webhooks
```
:::



### `disallowRobots`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$disallowRobots](craft4:craft\config\GeneralConfig::$disallowRobots)

Since
:  3.5.10

</div>

Whether front end requests should respond with `X-Robots-Tag: none` HTTP headers, indicating that pages should not be indexed,
and links on the page should not be followed, by web crawlers.

::: tip
This should be set to `true` for development and staging environments.
:::

::: code
```php Static Config
->disallowRobots(true)
```
```shell Environment Override
CRAFT_DISALLOW_ROBOTS=1
```
:::



### `enableTemplateCaching`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableTemplateCaching](craft4:craft\config\GeneralConfig::$enableTemplateCaching)

</div>

Whether to enable Craft’s template `{% cache %}` tag on a global basis.

::: code
```php Static Config
->enableTemplateCaching(false)
```
```shell Environment Override
CRAFT_ENABLE_TEMPLATE_CACHING=false
```
:::



### `errorTemplatePrefix`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$errorTemplatePrefix](craft4:craft\config\GeneralConfig::$errorTemplatePrefix)

</div>

The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.

If set to `'_'` your site’s 404 template would live at `templates/_404.twig`, for example.

::: code
```php Static Config
->errorTemplatePrefix('_')
```
```shell Environment Override
CRAFT_ERROR_TEMPLATE_PREFIX=_
```
:::



### `extraAllowedFileExtensions`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$extraAllowedFileExtensions](craft4:craft\config\GeneralConfig::$extraAllowedFileExtensions)

</div>

List of file extensions that will be merged into the <config4:allowedFileExtensions> config setting.

::: code
```php Static Config
->extraAllowedFileExtensions(['mbox', 'xml'])
```
```shell Environment Override
CRAFT_EXTRA_ALLOWED_FILE_EXTENSIONS=mbox,xml
```
:::



### `extraAppLocales`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$extraAppLocales](craft4:craft\config\GeneralConfig::$extraAppLocales)

Since
:  3.0.24

</div>

List of extra locale IDs that the application should support, and users should be able to select as their Preferred Language.

::: code
```php Static Config
->extraAppLocales(['uk'])
```
```shell Environment Override
CRAFT_EXTRA_APP_LOCALES=uk
```
:::



### `handleCasing`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `GeneralConfig::CAMEL_CASE`

Defined by
:  [GeneralConfig::$handleCasing](craft4:craft\config\GeneralConfig::$handleCasing)

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
:  [GeneralConfig::$headlessMode](craft4:craft\config\GeneralConfig::$headlessMode)

Since
:  3.3.0

</div>

Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations.

When this is enabled, the following changes will take place:

- Template settings for sections and category groups will be hidden.
- Template route management will be hidden.
- Front-end routing will skip checks for element and template requests.
- Front-end responses will be JSON-formatted rather than HTML by default.
- Twig will be configured to escape unsafe strings for JavaScript/JSON rather than HTML by default for front-end requests.
- The <config4:loginPath>, <config4:logoutPath>, <config4:setPasswordPath>, and <config4:verifyEmailPath> settings will be ignored.

::: tip
With Headless Mode enabled, users may only set passwords and verify email addresses via the control panel. Be sure to grant “Access the control
panel” permission to all content editors and administrators. You’ll also need to set the <config4:baseCpUrl> config setting if the control
panel is located on a different domain than your front end.
:::

::: code
```php Static Config
->headlessMode(true)
```
```shell Environment Override
CRAFT_HEADLESS_MODE=1
```
:::



### `httpProxy`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$httpProxy](craft4:craft\config\GeneralConfig::$httpProxy)

Since
:  3.7.0

</div>

The proxy server that should be used for outgoing HTTP requests.

This can be set to a URL (`http://localhost`) or a URL plus a port (`http://localhost:8125`).

::: code
```php Static Config
->httpProxy('<http://localhost')>
```
```shell Environment Override
CRAFT_HTTP_PROXY=http://localhost
```
:::



### `indexTemplateFilenames`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[]

Default value
:  `[
    'index',
]`

Defined by
:  [GeneralConfig::$indexTemplateFilenames](craft4:craft\config\GeneralConfig::$indexTemplateFilenames)

</div>

The template filenames Craft will look for within a directory to represent the directory’s “index” template when
matching a template path to a file on the front end.

::: code
```php Static Config
->indexTemplateFilenames(['index', 'default'])
```
```shell Environment Override
CRAFT_INDEX_TEMPLATE_FILENAMES=index,default
```
:::



### `ipHeaders`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$ipHeaders](craft4:craft\config\GeneralConfig::$ipHeaders)

</div>

List of headers where proxies store the real client IP.

See [yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) for more details.

If not set, the default [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) value will be used.

::: code
```php Static Config
->ipHeaders(['X-Forwarded-For', 'CF-Connecting-IP'])
```
```shell Environment Override
CRAFT_IP_HEADERS=X-Forwarded-For,CF-Connecting-IP
```
:::



### `isSystemLive`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$isSystemLive](craft4:craft\config\GeneralConfig::$isSystemLive)

</div>

Whether the site is currently live. If set to `true` or `false`, it will take precedence over the System Status setting
in Settings → General.

::: code
```php Static Config
->isSystemLive(true)
```
```shell Environment Override
CRAFT_IS_SYSTEM_LIVE=true
```
:::



### `limitAutoSlugsToAscii`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$limitAutoSlugsToAscii](craft4:craft\config\GeneralConfig::$limitAutoSlugsToAscii)

</div>

Whether non-ASCII characters in auto-generated slugs should be converted to ASCII (i.e. ñ → n).

::: tip
This only affects the JavaScript auto-generated slugs. Non-ASCII characters can still be used in slugs if entered manually.
:::

::: code
```php Static Config
->limitAutoSlugsToAscii(true)
```
```shell Environment Override
CRAFT_LIMIT_AUTO_SLUGS_TO_ASCII=1
```
:::



### `maxBackups`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [false](https://php.net/language.types.boolean)

Default value
:  `20`

Defined by
:  [GeneralConfig::$maxBackups](craft4:craft\config\GeneralConfig::$maxBackups)

</div>

The number of backups Craft should make before it starts deleting the oldest backups. If set to `false`, Craft will
not delete any backups.

::: code
```php Static Config
->maxBackups(5)
```
```shell Environment Override
CRAFT_MAX_BACKUPS=5
```
:::



### `maxRevisions`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [null](https://php.net/language.types.null)

Default value
:  `50`

Defined by
:  [GeneralConfig::$maxRevisions](craft4:craft\config\GeneralConfig::$maxRevisions)

Since
:  3.2.0

</div>

The maximum number of revisions that should be stored for each element.

Set to `0` if you want to store an unlimited number of revisions.

::: code
```php Static Config
->maxRevisions(25)
```
```shell Environment Override
CRAFT_MAX_REVISIONS=25
```
:::



### `maxSlugIncrement`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `100`

Defined by
:  [GeneralConfig::$maxSlugIncrement](craft4:craft\config\GeneralConfig::$maxSlugIncrement)

</div>

The highest number Craft will tack onto a slug in order to make it unique before giving up and throwing an error.

::: code
```php Static Config
->maxSlugIncrement(10)
```
```shell Environment Override
CRAFT_MAX_SLUG_INCREMENT=10
```
:::



### `permissionsPolicyHeader`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$permissionsPolicyHeader](craft4:craft\config\GeneralConfig::$permissionsPolicyHeader)

Since
:  3.6.14

</div>

The `Permissions-Policy` header that should be sent for web responses.

::: code
```php Static Config
->permissionsPolicyHeader('Permissions-Policy: geolocation=(self)')
```
```shell Environment Override
CRAFT_PERMISSIONS_POLICY_HEADER=Permissions-Policy: geolocation=(self)
```
:::



### `phpMaxMemoryLimit`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$phpMaxMemoryLimit](craft4:craft\config\GeneralConfig::$phpMaxMemoryLimit)

</div>

The maximum amount of memory Craft will try to reserve during memory-intensive operations such as zipping,
unzipping and updating. Defaults to an empty string, which means it will use as much memory as it can.

See <https://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> for a list of acceptable values.

::: code
```php Static Config
->phpMaxMemoryLimit('512M')
```
```shell Environment Override
CRAFT_PHP_MAX_MEMORY_LIMIT=512M
```
:::



### `previewIframeResizerOptions`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$previewIframeResizerOptions](craft4:craft\config\GeneralConfig::$previewIframeResizerOptions)

Since
:  3.5.0

</div>

Custom [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) that should be used for preview iframes.

```php Static Config
->previewIframeResizerOptions([
    'autoResize' => false,
])
```



### `privateTemplateTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'_'`

Defined by
:  [GeneralConfig::$privateTemplateTrigger](craft4:craft\config\GeneralConfig::$privateTemplateTrigger)

</div>

The template path segment prefix that should be used to identify “private” templates, which are templates that are not
directly accessible via a matching URL.

Set to an empty value to disable public template routing.

::: code
```php Static Config
->privateTemplateTrigger('')
```
```shell Environment Override
CRAFT_PRIVATE_TEMPLATE_TRIGGER=
```
:::



### `runQueueAutomatically`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$runQueueAutomatically](craft4:craft\config\GeneralConfig::$runQueueAutomatically)

</div>

Whether Craft should run pending queue jobs automatically when someone visits the control panel.

If disabled, an alternate queue worker *must* be set up separately, either as an
[always-running daemon](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md), or a cron job that runs the
`queue/run` command every minute:

```cron
* * * * * /path/to/project/craft queue/run
```

::: tip
This setting should be disabled for servers running Win32, or with Apache’s mod_deflate/mod_gzip installed,
where PHP’s [flush()](https://php.net/manual/en/function.flush.php) method won’t work.
:::

::: code
```php Static Config
->runQueueAutomatically(false)
```
```shell Environment Override
CRAFT_RUN_QUEUE_AUTOMATICALLY=false
```
:::



### `sameSiteCookieValue`

<div class="compact">

Allowed types
:  

Default value
:  `null`

Defined by
:  [GeneralConfig::$sameSiteCookieValue](craft4:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:  3.1.33

</div>





### `sendContentLengthHeader`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$sendContentLengthHeader](craft4:craft\config\GeneralConfig::$sendContentLengthHeader)

Since
:  3.7.3

</div>

Whether a `Content-Length` header should be sent with responses.

::: code
```php Static Config
->sendContentLengthHeader(true)
```
```shell Environment Override
CRAFT_SEND_CONTENT_LENGTH_HEADER=1
```
:::



### `sendPoweredByHeader`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sendPoweredByHeader](craft4:craft\config\GeneralConfig::$sendPoweredByHeader)

</div>

Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and
[Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.

::: code
```php Static Config
->sendPoweredByHeader(false)
```
```shell Environment Override
CRAFT_SEND_POWERED_BY_HEADER=false
```
:::



### `slugWordSeparator`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'-'`

Defined by
:  [GeneralConfig::$slugWordSeparator](craft4:craft\config\GeneralConfig::$slugWordSeparator)

</div>

The character(s) that should be used to separate words in slugs.

::: code
```php Static Config
->slugWordSeparator('.')
```
```shell Environment Override
CRAFT_SLUG_WORD_SEPARATOR=.
```
:::



### `testToEmailAddress`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [array](https://php.net/language.types.array), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$testToEmailAddress](craft4:craft\config\GeneralConfig::$testToEmailAddress)

</div>

Configures Craft to send all system emails to either a single email address or an array of email addresses
for testing purposes.

By default, the recipient name(s) will be “Test Recipient”, but you can customize that by setting the value with the format
`['me@domain.tld' => 'Name']`.

::: code
```php Static Config
->testToEmailAddress('me@domain.tld')
```
```shell Environment Override
CRAFT_TEST_TO_EMAIL_ADDRESS=me@domain.tld
```
:::



### `timezone`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$timezone](craft4:craft\config\GeneralConfig::$timezone)

</div>

The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.

This can be set to one of PHP’s [supported timezones](https://php.net/manual/en/timezones.php).

::: code
```php Static Config
->timezone('Europe/London')
```
```shell Environment Override
CRAFT_TIMEZONE=Europe/London
```
:::



### `translationDebugOutput`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$translationDebugOutput](craft4:craft\config\GeneralConfig::$translationDebugOutput)

</div>

Whether translated messages should be wrapped in special characters to help find any strings that are not being run through
`Craft::t()` or the `|translate` filter.

::: code
```php Static Config
->translationDebugOutput(true)
```
```shell Environment Override
CRAFT_TRANSLATION_DEBUG_OUTPUT=1
```
:::



### `useEmailAsUsername`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$useEmailAsUsername](craft4:craft\config\GeneralConfig::$useEmailAsUsername)

</div>

Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.

If you enable this setting after user accounts already exist, run this terminal command to update existing usernames:

```bash
php craft utils/update-usernames
```

::: code
```php Static Config
->useEmailAsUsername(true)
```
```shell Environment Override
CRAFT_USE_EMAIL_AS_USERNAME=1
```
:::



### `useFileLocks`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$useFileLocks](craft4:craft\config\GeneralConfig::$useFileLocks)

</div>

Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.

Some file systems, such as NFS, do not support exclusive file locking.

If `null`, Craft will try to detect if the underlying file system supports exclusive file locking and cache the results.

::: code
```php Static Config
->useFileLocks(false)
```
```shell Environment Override
CRAFT_USE_FILE_LOCKS=false
```
:::



### `useIframeResizer`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$useIframeResizer](craft4:craft\config\GeneralConfig::$useIframeResizer)

Since
:  3.5.5

</div>

Whether [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) should be used for Live Preview.

Using iFrame Resizer makes it possible for Craft to retain the preview’s scroll position between page loads, for cross-origin web pages.

It works by setting the height of the iframe to match the height of the inner web page, and the iframe’s container will be scrolled rather
than the iframe document itself. This can lead to some unexpected CSS issues, however, because the previewed viewport height will be taller
than the visible portion of the iframe.

If you have a [decoupled front end](https://craftcms.com/docs/4.x/entries.html#previewing-decoupled-front-ends), you will need to include
[iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js) on your
page as well for this to work. You can conditionally include it for only Live Preview requests by checking if the requested URL contains a
`x-craft-live-preview` query string parameter.

::: tip
You can customize the behavior of iFrame Resizer via the <config4:previewIframeResizerOptions> config setting.
:::

::: code
```php Static Config
->useIframeResizer(true)
```
```shell Environment Override
CRAFT_USE_IFRAME_RESIZER=1
```
:::



## Environment

### `aliases`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$aliases](craft4:craft\config\GeneralConfig::$aliases)

</div>

Any custom Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases) that should be defined for every request.

```php Static Config
->aliases([
    '@webroot' => '/var/www/',
])
```



### `backupCommand`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$backupCommand](craft4:craft\config\GeneralConfig::$backupCommand)

</div>

The shell command that Craft should execute to create a database backup.

When set to `null` (default), Craft will run `mysqldump` or `pg_dump`, provided that those libraries are in the `$PATH` variable
for the system user running the web server.

You may provide your own command optionally using several tokens Craft will swap out at runtime:

- `{path}` - the target backup file path
- `{port}` - the current database port
- `{server}` - the current database hostname
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database backups completely.

::: code
```php Static Config
->backupCommand(false)
```
```shell Environment Override
CRAFT_BACKUP_COMMAND=false
```
:::



### `buildId`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$buildId](craft4:craft\config\GeneralConfig::$buildId)

Since
:  4.0.0

</div>

A unique ID representing the current build of the codebase.

This should be set to something unique to the deployment, e.g. a Git SHA or a deployment timestamp.

::: code
```php Static Config
->buildId(\craft\helpers\App::env('GIT_SHA'))
```
```shell Environment Override
CRAFT_BUILD_ID=$GIT_SHA
```
:::



### `defaultCookieDomain`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$defaultCookieDomain](craft4:craft\config\GeneralConfig::$defaultCookieDomain)

</div>

The domain that cookies generated by Craft should be created for. If blank, it will be left up to the browser to determine
which domain to use (almost always the current). If you want the cookies to work for all subdomains, for example, you could
set this to `'.my-project.tld'`.

::: code
```php Static Config
->defaultCookieDomain('.my-project.tld')
```
```shell Environment Override
CRAFT_DEFAULT_COOKIE_DOMAIN=.my-project.tld
```
:::



### `resourceBasePath`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'@webroot/cpresources'`

Defined by
:  [GeneralConfig::$resourceBasePath](craft4:craft\config\GeneralConfig::$resourceBasePath)

</div>

The path to the root directory that should store published control panel resources.

::: code
```php Static Config
->resourceBasePath('@webroot/craft-resources')
```
```shell Environment Override
CRAFT_RESOURCE_BASE_PATH=@webroot/craft-resources
```
:::



### `resourceBaseUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'@web/cpresources'`

Defined by
:  [GeneralConfig::$resourceBaseUrl](craft4:craft\config\GeneralConfig::$resourceBaseUrl)

</div>

The URL to the root directory that should store published control panel resources.

::: code
```php Static Config
->resourceBaseUrl('@web/craft-resources')
```
```shell Environment Override
CRAFT_RESOURCE_BASE_URL=@web/craft-resources
```
:::



### `restoreCommand`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$restoreCommand](craft4:craft\config\GeneralConfig::$restoreCommand)

</div>

The shell command Craft should execute to restore a database backup.

By default Craft will run `mysql` or `psql`, provided those libraries are in the `$PATH` variable for the user the web server is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - the backup file path
- `{port}` - the current database port
- `{server}` - the current database hostname
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database restores completely.

::: code
```php Static Config
->restoreCommand(false)
```
```shell Environment Override
CRAFT_RESTORE_COMMAND=false
```
:::



## Routing

### `actionTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'actions'`

Defined by
:  [GeneralConfig::$actionTrigger](craft4:craft\config\GeneralConfig::$actionTrigger)

</div>

The URI segment Craft should look for when determining if the current request should be routed to a controller action.

::: code
```php Static Config
->actionTrigger('do-it')
```
```shell Environment Override
CRAFT_ACTION_TRIGGER=do-it
```
:::



### `activateAccountSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$activateAccountSuccessPath](craft4:craft\config\GeneralConfig::$activateAccountSuccessPath)

</div>

The URI that users without access to the control panel should be redirected to after activating their account.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->activateAccountSuccessPath('welcome')
```
```shell Environment Override
CRAFT_ACTIVATE_ACCOUNT_SUCCESS_PATH=welcome
```
:::



### `addTrailingSlashesToUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$addTrailingSlashesToUrls](craft4:craft\config\GeneralConfig::$addTrailingSlashesToUrls)

</div>

Whether auto-generated URLs should have trailing slashes.

::: code
```php Static Config
->addTrailingSlashesToUrls(true)
```
```shell Environment Override
CRAFT_ADD_TRAILING_SLASHES_TO_URLS=1
```
:::



### `allowUppercaseInSlug`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$allowUppercaseInSlug](craft4:craft\config\GeneralConfig::$allowUppercaseInSlug)

</div>

Whether uppercase letters should be allowed in slugs.

::: code
```php Static Config
->allowUppercaseInSlug(true)
```
```shell Environment Override
CRAFT_ALLOW_UPPERCASE_IN_SLUG=1
```
:::



### `baseCpUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$baseCpUrl](craft4:craft\config\GeneralConfig::$baseCpUrl)

</div>

The base URL Craft should use when generating control panel URLs.

It will be determined automatically if left blank.

::: tip
The base control panel URL should **not** include the [control panel trigger word](config4:cpTrigger) (e.g. `/admin`).
:::

::: code
```php Static Config
->baseCpUrl('<https://cms.my-project.tld/')>
```
```shell Environment Override
CRAFT_BASE_CP_URL=https://cms.my-project.tld/
```
:::



### `cpTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `'admin'`

Defined by
:  [GeneralConfig::$cpTrigger](craft4:craft\config\GeneralConfig::$cpTrigger)

</div>

The URI segment Craft should look for when determining if the current request should route to the control panel rather than
the front-end website.

This can be set to `null` if you have a dedicated hostname for the control panel (e.g. `cms.my-project.tld`), or you are running Craft in
[Headless Mode](config4:headlessMode). If you do that, you will need to ensure that the control panel is being served from its own web root
directory on your server, with an `index.php` file that defines the `CRAFT_CP` PHP constant.

```php
define('CRAFT_CP', true);
```

Alternatively, you can set the <config4:baseCpUrl> config setting, but then you will run the risk of losing access to portions of your
control panel due to URI conflicts with actual folders/files in your main web root.

(For example, if you have an `assets/` folder, that would conflict with the `/assets` page in the control panel.)

::: code
```php Static Config
->cpTrigger(null)
```
```shell Environment Override
CRAFT_CP_TRIGGER=null
```
:::



### `invalidUserTokenPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$invalidUserTokenPath](craft4:craft\config\GeneralConfig::$invalidUserTokenPath)

</div>

The URI Craft should redirect to when user token validation fails. A token is used on things like setting and resetting user account
passwords. Note that this only affects front-end site requests.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
// 1 day
'invalidUserTokenPath' => 'nope',
```
```shell Environment Override
# 1 day
CRAFT_INVALID_USER_TOKEN_PATH=nope
```
:::



### `loginPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'login'`

Defined by
:  [GeneralConfig::$loginPath](craft4:craft\config\GeneralConfig::$loginPath)

</div>

The URI Craft should use for user login on the front end.

This can be set to `false` to disable front-end login.

Note that this config setting is ignored when <config4:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->loginPath(false)
```
```shell Environment Override
CRAFT_LOGIN_PATH=false
```
:::



### `logoutPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'logout'`

Defined by
:  [GeneralConfig::$logoutPath](craft4:craft\config\GeneralConfig::$logoutPath)

</div>

The URI Craft should use for user logout on the front end.

This can be set to `false` to disable front-end logout.

Note that this config setting is ignored when <config4:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->logoutPath(false)
```
```shell Environment Override
CRAFT_LOGOUT_PATH=false
```
:::



### `omitScriptNameInUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$omitScriptNameInUrls](craft4:craft\config\GeneralConfig::$omitScriptNameInUrls)

</div>

Whether generated URLs should omit `index.php` (e.g. `http://my-project.tld/path` instead of `http://my-project.tld/index.php/path`)

This can only be possible if your server is configured to redirect would-be 404s to `index.php`, for example, with the redirect found
in the `.htaccess` file that came with Craft:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```

::: code
```php Static Config
->omitScriptNameInUrls(true)
```
```shell Environment Override
CRAFT_OMIT_SCRIPT_NAME_IN_URLS=1
```
:::



### `pageTrigger`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'p'`

Defined by
:  [GeneralConfig::$pageTrigger](craft4:craft\config\GeneralConfig::$pageTrigger)

</div>

The string preceding a number which Craft will look for when determining if the current request is for a particular page in
a paginated list of pages.

Example Value | Example URI
------------- | -----------
`p` | `/news/p5`
`page` | `/news/page5`
`page/` | `/news/page/5`
`?page` | `/news?page=5`

::: tip
If you want to set this to `?p` (e.g. `/news?p=5`), you’ll also need to change your <config4:pathParam> setting which defaults to `p`.
If your server is running Apache, you’ll need to update the redirect code in your `.htaccess` file to match your new `pathParam` value.
:::

::: code
```php Static Config
->pageTrigger('page')
```
```shell Environment Override
CRAFT_PAGE_TRIGGER=page
```
:::



### `pathParam`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `'p'`

Defined by
:  [GeneralConfig::$pathParam](craft4:craft\config\GeneralConfig::$pathParam)

</div>

The query string param that Craft will check when determining the request’s path.

This can be set to `null` if your web server is capable of directing traffic to `index.php` without a query string param.
If you’re using Apache, that means you’ll need to change the `RewriteRule` line in your `.htaccess` file to:

```
RewriteRule (.+) index.php [QSA,L]
```

::: code
```php Static Config
->pathParam(null)
```
```shell Environment Override
CRAFT_PATH_PARAM=null
```
:::



### `postCpLoginRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'dashboard'`

Defined by
:  [GeneralConfig::$postCpLoginRedirect](craft4:craft\config\GeneralConfig::$postCpLoginRedirect)

</div>

The path users should be redirected to after logging into the control panel.

This setting will also come into effect if a user visits the control panel’s login page (`/admin/login`) or the control panel’s
root URL (`/admin`) when they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->postCpLoginRedirect('entries')
```
```shell Environment Override
CRAFT_POST_CP_LOGIN_REDIRECT=entries
```
:::



### `postLoginRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$postLoginRedirect](craft4:craft\config\GeneralConfig::$postLoginRedirect)

</div>

The path users should be redirected to after logging in from the front-end site.

This setting will also come into effect if the user visits the login page (as specified by the <config4:loginPath> config setting) when
they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->postLoginRedirect('welcome')
```
```shell Environment Override
CRAFT_POST_LOGIN_REDIRECT=welcome
```
:::



### `postLogoutRedirect`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$postLogoutRedirect](craft4:craft\config\GeneralConfig::$postLogoutRedirect)

</div>

The path that users should be redirected to after logging out from the front-end site.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->postLogoutRedirect('goodbye')
```
```shell Environment Override
CRAFT_POST_LOGOUT_REDIRECT=goodbye
```
:::



### `setPasswordPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'setpassword'`

Defined by
:  [GeneralConfig::$setPasswordPath](craft4:craft\config\GeneralConfig::$setPasswordPath)

</div>

The URI or URL that Craft should use for Set Password forms on the front end.

This setting is ignored when <config4:headlessMode> is enabled, unless it’s set to an absolute URL.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: tip
You might also want to set <config4:invalidUserTokenPath> in case a user clicks on an expired password reset link.
:::

::: code
```php Static Config
->setPasswordPath('set-password')
```
```shell Environment Override
CRAFT_SET_PASSWORD_PATH=set-password
```
:::



### `setPasswordRequestPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null`

Defined by
:  [GeneralConfig::$setPasswordRequestPath](craft4:craft\config\GeneralConfig::$setPasswordRequestPath)

Since
:  3.5.14

</div>

The URI to the page where users can request to change their password.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

If this is set, Craft will redirect [.well-known/change-password requests](https://w3c.github.io/webappsec-change-password-url/) to this URI.

::: tip
You’ll also need to set [setPasswordPath](config4:setPasswordPath), which determines the URI and template path for the Set Password form
where the user resets their password after following the link in the Password Reset email.
:::

::: code
```php Static Config
->setPasswordRequestPath('request-password')
```
```shell Environment Override
CRAFT_SET_PASSWORD_REQUEST_PATH=request-password
```
:::



### `setPasswordSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$setPasswordSuccessPath](craft4:craft\config\GeneralConfig::$setPasswordSuccessPath)

</div>

The URI Craft should redirect users to after setting their password from the front end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->setPasswordSuccessPath('password-set')
```
```shell Environment Override
CRAFT_SET_PASSWORD_SUCCESS_PATH=password-set
```
:::



### `siteToken`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'siteToken'`

Defined by
:  [GeneralConfig::$siteToken](craft4:craft\config\GeneralConfig::$siteToken)

Since
:  3.5.0

</div>

The query string parameter name that site tokens should be set to.

::: code
```php Static Config
->siteToken('t')
```
```shell Environment Override
CRAFT_SITE_TOKEN=t
```
:::



### `tokenParam`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'token'`

Defined by
:  [GeneralConfig::$tokenParam](craft4:craft\config\GeneralConfig::$tokenParam)

</div>

The query string parameter name that Craft tokens should be set to.

::: code
```php Static Config
->tokenParam('t')
```
```shell Environment Override
CRAFT_TOKEN_PARAM=t
```
:::



### `usePathInfo`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$usePathInfo](craft4:craft\config\GeneralConfig::$usePathInfo)

</div>

Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.

This setting only takes effect if <config4:omitScriptNameInUrls> is set to `false`.

::: code
```php Static Config
->usePathInfo(true)
```
```shell Environment Override
CRAFT_USE_PATH_INFO=1
```
:::



### `useSslOnTokenizedUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [string](https://php.net/language.types.string)

Default value
:  `'auto'`

Defined by
:  [GeneralConfig::$useSslOnTokenizedUrls](craft4:craft\config\GeneralConfig::$useSslOnTokenizedUrls)

</div>

Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the
current site’s base URL and the protocol of the current request and if either of them are HTTPS will use `https` in the tokenized URL. If not,
will use `http`.

If set to `false`, Craft will always use `http`. If set to `true`, then, Craft will always use `https`.

::: code
```php Static Config
->useSslOnTokenizedUrls(true)
```
```shell Environment Override
CRAFT_USE_SSL_ON_TOKENIZED_URLS=1
```
:::



### `verifyEmailPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `'verifyemail'`

Defined by
:  [GeneralConfig::$verifyEmailPath](craft4:craft\config\GeneralConfig::$verifyEmailPath)

Since
:  3.4.0

</div>

The URI or URL that Craft should use for email verification links on the front end.

This setting is ignored when <config4:headlessMode> is enabled, unless it’s set to an absolute URL.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->verifyEmailPath('verify-email')
```
```shell Environment Override
CRAFT_VERIFY_EMAIL_PATH=verify-email
```
:::



### `verifyEmailSuccessPath`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `''`

Defined by
:  [GeneralConfig::$verifyEmailSuccessPath](craft4:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:  3.1.20

</div>

The URI that users without access to the control panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: code
```php Static Config
->verifyEmailSuccessPath('verified-email')
```
```shell Environment Override
CRAFT_VERIFY_EMAIL_SUCCESS_PATH=verified-email
```
:::



## Session

### `phpSessionName`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'CraftSessionId'`

Defined by
:  [GeneralConfig::$phpSessionName](craft4:craft\config\GeneralConfig::$phpSessionName)

</div>

The name of the PHP session cookie.

::: code
```php Static Config
->phpSessionName(null)
```
```shell Environment Override
CRAFT_PHP_SESSION_NAME=null
```
:::



### `rememberUsernameDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `31536000` (1 year)

Defined by
:  [GeneralConfig::$rememberUsernameDuration](craft4:craft\config\GeneralConfig::$rememberUsernameDuration)

</div>

The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.

Set to `0` to disable this feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->rememberUsernameDuration(0)
```
```shell Environment Override
CRAFT_REMEMBER_USERNAME_DURATION=0
```
:::



### `rememberedUserSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `1209600` (14 days)

Defined by
:  [GeneralConfig::$rememberedUserSessionDuration](craft4:craft\config\GeneralConfig::$rememberedUserSessionDuration)

</div>

The amount of time a user stays logged if “Remember Me” is checked on the login page.

Set to `0` to disable the “Remember Me” feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->rememberedUserSessionDuration(0)
```
```shell Environment Override
CRAFT_REMEMBERED_USER_SESSION_DURATION=0
```
:::



### `requireMatchingUserAgentForSession`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$requireMatchingUserAgentForSession](craft4:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)

</div>

Whether Craft should require a matching user agent string when restoring a user session from a cookie.

::: code
```php Static Config
->requireMatchingUserAgentForSession(false)
```
```shell Environment Override
CRAFT_REQUIRE_MATCHING_USER_AGENT_FOR_SESSION=false
```
:::



### `requireUserAgentAndIpForSession`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$requireUserAgentAndIpForSession](craft4:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)

</div>

Whether Craft should require the existence of a user agent string and IP address when creating a new user session.

::: code
```php Static Config
->requireUserAgentAndIpForSession(false)
```
```shell Environment Override
CRAFT_REQUIRE_USER_AGENT_AND_IP_FOR_SESSION=false
```
:::



### `userSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `3600` (1 hour)

Defined by
:  [GeneralConfig::$userSessionDuration](craft4:craft\config\GeneralConfig::$userSessionDuration)

</div>

The amount of time before a user will get logged out due to inactivity.

Set to `0` if you want users to stay logged in as long as their browser is open rather than a predetermined amount of time.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// 3 hours
'userSessionDuration' => 10800,
```
```shell Environment Override
# 3 hours
CRAFT_USER_SESSION_DURATION=10800
```
:::



## Security

### `blowfishHashCost`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `13`

Defined by
:  [GeneralConfig::$blowfishHashCost](craft4:craft\config\GeneralConfig::$blowfishHashCost)

</div>

The higher the cost value, the longer it takes to generate a password hash and to verify against it.

Therefore, higher cost slows down a brute-force attack.

For best protection against brute force attacks, set it to the highest value that is tolerable on production servers.

The time taken to compute the hash doubles for every increment by one for this value.

For example, if the hash takes 1 second to compute when the value is 14 then the compute time varies as
2^(value - 14) seconds.

::: code
```php Static Config
->blowfishHashCost(15)
```
```shell Environment Override
CRAFT_BLOWFISH_HASH_COST=15
```
:::



### `cooldownDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `300` (5 minutes)

Defined by
:  [GeneralConfig::$cooldownDuration](craft4:craft\config\GeneralConfig::$cooldownDuration)

</div>

The amount of time a user must wait before re-attempting to log in after their account is locked due to too many
failed login attempts.

Set to `0` to keep the account locked indefinitely, requiring an admin to manually unlock the account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->cooldownDuration(0)
```
```shell Environment Override
CRAFT_COOLDOWN_DURATION=0
```
:::



### `csrfTokenName`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'CRAFT_CSRF_TOKEN'`

Defined by
:  [GeneralConfig::$csrfTokenName](craft4:craft\config\GeneralConfig::$csrfTokenName)

</div>

The name of CSRF token used for CSRF validation if <config4:enableCsrfProtection> is set to `true`.

::: code
```php Static Config
->csrfTokenName('MY_CSRF')
```
```shell Environment Override
CRAFT_CSRF_TOKEN_NAME=MY_CSRF
```
:::



### `defaultTokenDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$defaultTokenDuration](craft4:craft\config\GeneralConfig::$defaultTokenDuration)

</div>

The default amount of time tokens can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// One week
'defaultTokenDuration' => 604800,
```
```shell Environment Override
# One week
CRAFT_DEFAULT_TOKEN_DURATION=604800
```
:::



### `deferPublicRegistrationPassword`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$deferPublicRegistrationPassword](craft4:craft\config\GeneralConfig::$deferPublicRegistrationPassword)

</div>

By default, Craft requires a front-end “password” field for public user registrations. Setting this to `true`
removes that requirement for the initial registration form.

If you have email verification enabled, new users will set their password once they’ve followed the verification link in the email.
If you don’t, the only way they can set their password is to go through your “forgot password” workflow.

::: code
```php Static Config
->deferPublicRegistrationPassword(true)
```
```shell Environment Override
CRAFT_DEFER_PUBLIC_REGISTRATION_PASSWORD=true
```
:::



### `elevatedSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `300` (5 minutes)

Defined by
:  [GeneralConfig::$elevatedSessionDuration](craft4:craft\config\GeneralConfig::$elevatedSessionDuration)

</div>

The amount of time a user’s elevated session will last, which is required for some sensitive actions (e.g. user group/permission assignment).

Set to `0` to disable elevated session support.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->elevatedSessionDuration(0)
```
```shell Environment Override
CRAFT_ELEVATED_SESSION_DURATION=0
```
:::



### `enableBasicHttpAuth`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$enableBasicHttpAuth](craft4:craft\config\GeneralConfig::$enableBasicHttpAuth)

Since
:  3.5.0

</div>

Whether front-end web requests should support basic HTTP authentication.

::: code
```php Static Config
->enableBasicHttpAuth(true)
```
```shell Environment Override
CRAFT_ENABLE_BASIC_HTTP_AUTH=1
```
:::



### `enableCsrfCookie`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableCsrfCookie](craft4:craft\config\GeneralConfig::$enableCsrfCookie)

</div>

Whether to use a cookie to persist the CSRF token if <config4:enableCsrfProtection> is enabled. If false, the CSRF token will be
stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security,
it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.

::: code
```php Static Config
->enableCsrfCookie(false)
```
```shell Environment Override
CRAFT_ENABLE_CSRF_COOKIE=false
```
:::



### `enableCsrfProtection`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableCsrfProtection](craft4:craft\config\GeneralConfig::$enableCsrfProtection)

</div>

Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.

::: code
```php Static Config
->enableCsrfProtection(false)
```
```shell Environment Override
CRAFT_ENABLE_CSRF_PROTECTION=false
```
:::



### `invalidLoginWindowDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `3600` (1 hour)

Defined by
:  [GeneralConfig::$invalidLoginWindowDuration](craft4:craft\config\GeneralConfig::$invalidLoginWindowDuration)

</div>

The amount of time to track invalid login attempts for a user, for determining if Craft should lock an account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// 1 day
'invalidLoginWindowDuration' => 86400,
```
```shell Environment Override
# 1 day
CRAFT_INVALID_LOGIN_WINDOW_DURATION=86400
```
:::



### `maxInvalidLogins`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [false](https://php.net/language.types.boolean)

Default value
:  `5`

Defined by
:  [GeneralConfig::$maxInvalidLogins](craft4:craft\config\GeneralConfig::$maxInvalidLogins)

</div>

The number of invalid login attempts Craft will allow within the specified duration before the account gets locked.

::: code
```php Static Config
->maxInvalidLogins(3)
```
```shell Environment Override
CRAFT_MAX_INVALID_LOGINS=3
```
:::



### `preventUserEnumeration`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preventUserEnumeration](craft4:craft\config\GeneralConfig::$preventUserEnumeration)

</div>

When `true`, Craft will always return a successful response in the “forgot password” flow, making it difficult to enumerate users.

When set to `false` and you go through the “forgot password” flow from the control panel login page, you’ll get distinct messages indicating
whether the username/email exists and whether an email was sent with further instructions. This can be helpful for the user attempting to
log in but allow for username/email enumeration based on the response.

::: code
```php Static Config
->preventUserEnumeration(true)
```
```shell Environment Override
CRAFT_PREVENT_USER_ENUMERATION=1
```
:::



### `previewTokenDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `null` (1 day)

Defined by
:  [GeneralConfig::$previewTokenDuration](craft4:craft\config\GeneralConfig::$previewTokenDuration)

Since
:  3.7.0

</div>

The amount of time content preview tokens can be used before expiring.

Defaults to <config4:defaultTokenDuration> value.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// 1 hour
'previewTokenDuration' => 3600,
```
```shell Environment Override
# 1 hour
CRAFT_PREVIEW_TOKEN_DURATION=3600
```
:::



### `sanitizeCpImageUploads`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sanitizeCpImageUploads](craft4:craft\config\GeneralConfig::$sanitizeCpImageUploads)

Since
:  3.6.0

</div>

Whether images uploaded via the control panel should be sanitized.

::: code
```php Static Config
->sanitizeCpImageUploads(false)
```
```shell Environment Override
CRAFT_SANITIZE_CP_IMAGE_UPLOADS=false
```
:::



### `sanitizeSvgUploads`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$sanitizeSvgUploads](craft4:craft\config\GeneralConfig::$sanitizeSvgUploads)

</div>

Whether Craft should sanitize uploaded SVG files and strip out potential malicious-looking content.

This should definitely be enabled if you are accepting SVG uploads from untrusted sources.

::: code
```php Static Config
->sanitizeSvgUploads(false)
```
```shell Environment Override
CRAFT_SANITIZE_SVG_UPLOADS=false
```
:::



### `secureHeaders`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$secureHeaders](craft4:craft\config\GeneralConfig::$secureHeaders)

</div>

Lists of headers that are, by default, subject to the trusted host configuration.

See [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) value will be used.

::: code
```php Static Config
->secureHeaders([
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Rewrite-Url',
    'X-Original-Host',
    'CF-Connecting-IP',
])
```
```shell Environment Override
CRAFT_SECURE_HEADERS=X-Forwarded-For,X-Forwarded-Host,X-Forwarded-Proto,X-Rewrite-Url,X-Original-Host,CF-Connecting-IP
```
:::



### `secureProtocolHeaders`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$secureProtocolHeaders](craft4:craft\config\GeneralConfig::$secureProtocolHeaders)

</div>

List of headers to check for determining whether the connection is made via HTTPS.

See [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) value will be used.

```php Static Config
->secureProtocolHeaders([
    'X-Forwarded-Proto' => [
        'https',
    ],
    'Front-End-Https' => [
        'on',
    ],
    'CF-Visitor' => [
        '{\"scheme\":\"https\"}',
    ],
])
```



### `securityKey`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$securityKey](craft4:craft\config\GeneralConfig::$securityKey)

</div>

A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](craft4:craft\services\Security).

This value should be the same across all environments. If this key ever changes, any data that was encrypted with it will be inaccessible.

```php Static Config
->securityKey('2cf24dba5...')
```



### `storeUserIps`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$storeUserIps](craft4:craft\config\GeneralConfig::$storeUserIps)

Since
:  3.1.0

</div>

Whether user IP addresses should be stored/logged by the system.

::: code
```php Static Config
->storeUserIps(true)
```
```shell Environment Override
CRAFT_STORE_USER_IPS=1
```
:::



### `trustedHosts`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[
    'any',
]`

Defined by
:  [GeneralConfig::$trustedHosts](craft4:craft\config\GeneralConfig::$trustedHosts)

</div>

The configuration for trusted security-related headers.

See [yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) for more details.

By default, all hosts are trusted.

::: code
```php Static Config
->trustedHosts(['trusted-one.foo', 'trusted-two.foo'])
```
```shell Environment Override
CRAFT_TRUSTED_HOSTS=trusted-one.foo,trusted-two.foo
```
:::



### `useSecureCookies`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean), [string](https://php.net/language.types.string)

Default value
:  `'auto'`

Defined by
:  [GeneralConfig::$useSecureCookies](craft4:craft\config\GeneralConfig::$useSecureCookies)

</div>

Whether Craft will set the “secure” flag when saving cookies when using `Craft::cookieConfig()` to create a cookie.

Valid values are `true`, `false`, and `'auto'`. Defaults to `'auto'`, which will set the secure flag if the page you’re currently accessing
is over `https://`. `true` will always set the flag, regardless of protocol and `false` will never automatically set the flag.

::: code
```php Static Config
->useSecureCookies(true)
```
```shell Environment Override
CRAFT_USE_SECURE_COOKIES=1
```
:::



### `verificationCodeDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `86400` (1 day)

Defined by
:  [GeneralConfig::$verificationCodeDuration](craft4:craft\config\GeneralConfig::$verificationCodeDuration)

</div>

The amount of time a user verification code can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// 1 hour
'verificationCodeDuration' => 3600,
```
```shell Environment Override
# 1 hour
CRAFT_VERIFICATION_CODE_DURATION=3600
```
:::



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
:  [GeneralConfig::$allowedFileExtensions](craft4:craft\config\GeneralConfig::$allowedFileExtensions)

</div>

The file extensions Craft should allow when a user is uploading files.

```php Static Config
// Nothing bug GIFs!
'allowedFileExtensions' => [
    'gif',
],
```



### `convertFilenamesToAscii`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$convertFilenamesToAscii](craft4:craft\config\GeneralConfig::$convertFilenamesToAscii)

</div>

Whether uploaded filenames with non-ASCII characters should be converted to ASCII (i.e. `ñ` → `n`).

::: tip
You can run `php craft utils/ascii-filenames` in your terminal to apply ASCII filenames to all existing assets.
:::

::: code
```php Static Config
->convertFilenamesToAscii(false)
```
```shell Environment Override
CRAFT_CONVERT_FILENAMES_TO_ASCII=false
```
:::



### `extraFileKinds`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [GeneralConfig::$extraFileKinds](craft4:craft\config\GeneralConfig::$extraFileKinds)

Since
:  3.0.37

</div>

List of additional file kinds Craft should support. This array will get merged with the one defined in
`\craft\helpers\Assets::_buildFileKinds()`.

```php Static Config
->extraFileKinds([
    // merge .psb into list of Photoshop file kinds
    'photoshop' => [
        'extensions' => ['psb'],
    ],
    // register new "Stylesheet" file kind
    'stylesheet' => [
        'label' => 'Stylesheet',
        'extensions' => ['css', 'less', 'pcss', 'sass', 'scss', 'styl'],
    ],
])
```

::: tip
File extensions listed here won’t immediately be allowed to be uploaded. You will also need to list them with
the <config4:extraAllowedFileExtensions> config setting.
:::



### `filenameWordSeparator`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [false](https://php.net/language.types.boolean)

Default value
:  `'-'`

Defined by
:  [GeneralConfig::$filenameWordSeparator](craft4:craft\config\GeneralConfig::$filenameWordSeparator)

</div>

The string to use to separate words when uploading Assets. If set to `false`, spaces will be left alone.

::: code
```php Static Config
->filenameWordSeparator(false)
```
```shell Environment Override
CRAFT_FILENAME_WORD_SEPARATOR=false
```
:::



### `maxUploadFileSize`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [string](https://php.net/language.types.string)

Default value
:  `16777216` (16MB)

Defined by
:  [GeneralConfig::$maxUploadFileSize](craft4:craft\config\GeneralConfig::$maxUploadFileSize)

</div>

The maximum upload file size allowed.

See [craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) for a list of supported value types.

::: code
```php Static Config
// 25MB
'maxUploadFileSize' => 26214400,
```
```shell Environment Override
# 25MB
CRAFT_MAX_UPLOAD_FILE_SIZE=26214400
```
:::



### `revAssetUrls`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$revAssetUrls](craft4:craft\config\GeneralConfig::$revAssetUrls)

Since
:  3.7.0

</div>

Whether asset URLs should be revved so browsers don’t load cached versions when they’re modified.

::: code
```php Static Config
->revAssetUrls(true)
```
```shell Environment Override
CRAFT_REV_ASSET_URLS=1
```
:::



## Image Handling

### `brokenImagePath`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [GeneralConfig::$brokenImagePath](craft4:craft\config\GeneralConfig::$brokenImagePath)

Since
:  3.5.0

</div>

The server path to an image file that should be sent when responding to an image request with a
404 status code.

This can be set to an aliased path such as `@webroot/assets/404.svg`.

::: code
```php Static Config
->brokenImagePath('@webroot/assets/404.svg')
```
```shell Environment Override
CRAFT_BROKEN_IMAGE_PATH=@webroot/assets/404.svg
```
:::



### `defaultImageQuality`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `82`

Defined by
:  [GeneralConfig::$defaultImageQuality](craft4:craft\config\GeneralConfig::$defaultImageQuality)

</div>

The quality level Craft will use when saving JPG and PNG files. Ranges from 1 (worst quality, smallest file) to
100 (best quality, biggest file).

::: code
```php Static Config
->defaultImageQuality(90)
```
```shell Environment Override
CRAFT_DEFAULT_IMAGE_QUALITY=90
```
:::



### `generateTransformsBeforePageLoad`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$generateTransformsBeforePageLoad](craft4:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)

</div>

Whether image transforms should be generated before page load.

::: code
```php Static Config
->generateTransformsBeforePageLoad(true)
```
```shell Environment Override
CRAFT_GENERATE_TRANSFORMS_BEFORE_PAGE_LOAD=1
```
:::



### `imageDriver`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `GeneralConfig::IMAGE_DRIVER_AUTO`

Defined by
:  [GeneralConfig::$imageDriver](craft4:craft\config\GeneralConfig::$imageDriver)

</div>

The image driver Craft should use to cleanse and transform images. By default Craft will use ImageMagick if it’s installed
and otherwise fall back to GD. You can explicitly set either `'imagick'` or `'gd'` here to override that behavior.

::: code
```php Static Config
->imageDriver('imagick')
```
```shell Environment Override
CRAFT_IMAGE_DRIVER=imagick
```
:::



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
:  [GeneralConfig::$imageEditorRatios](craft4:craft\config\GeneralConfig::$imageEditorRatios)

</div>

An array containing the selectable image aspect ratios for the image editor. The array must be in the format
of `label` => `ratio`, where ratio must be a float or a string. For string values, only values of “none” and “original” are allowed.

```php Static Config
->imageEditorRatios([
    'Unconstrained' => 'none',
    'Original' => 'original',
    'Square' => 1,
    'IMAX' => 1.9,
    'Widescreen' => 1.78,
])
```



### `maxCachedCloudImageSize`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `2000`

Defined by
:  [GeneralConfig::$maxCachedCloudImageSize](craft4:craft\config\GeneralConfig::$maxCachedCloudImageSize)

</div>

The maximum dimension size to use when caching images from external sources to use in transforms. Set to `0` to never cache them.

::: code
```php Static Config
->maxCachedCloudImageSize(0)
```
```shell Environment Override
CRAFT_MAX_CACHED_CLOUD_IMAGE_SIZE=0
```
:::



### `optimizeImageFilesize`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$optimizeImageFilesize](craft4:craft\config\GeneralConfig::$optimizeImageFilesize)

</div>

Whether Craft should optimize images for reduced file sizes without noticeably reducing image quality. (Only supported when
ImageMagick is used.)

::: code
```php Static Config
->optimizeImageFilesize(false)
```
```shell Environment Override
CRAFT_OPTIMIZE_IMAGE_FILESIZE=1
```
:::



### `preserveCmykColorspace`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preserveCmykColorspace](craft4:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:  3.0.8

</div>

Whether CMYK should be preserved as the colorspace when manipulating images.

Setting this to `true` will prevent Craft from transforming CMYK images to sRGB, but on some ImageMagick versions it can cause
image color distortion. This will only have an effect if ImageMagick is in use.

::: code
```php Static Config
->preserveCmykColorspace(true)
```
```shell Environment Override
CRAFT_PRESERVE_CMYK_COLORSPACE=1
```
:::



### `preserveExifData`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$preserveExifData](craft4:craft\config\GeneralConfig::$preserveExifData)

</div>

Whether the EXIF data should be preserved when manipulating and uploading images.

Setting this to `true` will result in larger image file sizes.

This will only have effect if ImageMagick is in use.

::: code
```php Static Config
->preserveExifData(true)
```
```shell Environment Override
CRAFT_PRESERVE_EXIF_DATA=1
```
:::



### `preserveImageColorProfiles`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$preserveImageColorProfiles](craft4:craft\config\GeneralConfig::$preserveImageColorProfiles)

</div>

Whether the embedded Image Color Profile (ICC) should be preserved when manipulating images.

Setting this to `false` will reduce the image size a little bit, but on some ImageMagick versions can cause images to be saved with
an incorrect gamma value, which causes the images to become very dark. This will only have effect if ImageMagick is in use.

::: code
```php Static Config
->preserveImageColorProfiles(false)
```
```shell Environment Override
CRAFT_PRESERVE_IMAGE_COLOR_PROFILES=false
```
:::



### `rasterizeSvgThumbs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$rasterizeSvgThumbs](craft4:craft\config\GeneralConfig::$rasterizeSvgThumbs)

Since
:  3.6.0

</div>

Whether SVG thumbnails should be rasterized.

This will only work if ImageMagick is installed, and <config4:imageDriver> is set to either `auto` or `imagick`.

::: code
```php Static Config
->rasterizeSvgThumbs(true)
```
```shell Environment Override
CRAFT_RASTERIZE_SVG_THUMBS=1
```
:::



### `rotateImagesOnUploadByExifData`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$rotateImagesOnUploadByExifData](craft4:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)

</div>

Whether Craft should rotate images according to their EXIF data on upload.

::: code
```php Static Config
->rotateImagesOnUploadByExifData(false)
```
```shell Environment Override
CRAFT_ROTATE_IMAGES_ON_UPLOAD_BY_EXIF_DATA=false
```
:::



### `transformGifs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$transformGifs](craft4:craft\config\GeneralConfig::$transformGifs)

Since
:  3.0.7

</div>

Whether GIF files should be cleansed/transformed.

::: code
```php Static Config
->transformGifs(false)
```
```shell Environment Override
CRAFT_TRANSFORM_GIFS=false
```
:::



### `transformSvgs`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$transformSvgs](craft4:craft\config\GeneralConfig::$transformSvgs)

Since
:  3.7.1

</div>

Whether SVG files should be transformed.

::: code
```php Static Config
->transformSvgs(false)
```
```shell Environment Override
CRAFT_TRANSFORM_SVGS=false
```
:::



### `upscaleImages`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$upscaleImages](craft4:craft\config\GeneralConfig::$upscaleImages)

Since
:  3.4.0

</div>

Whether images should be upscaled if the provided transform size is larger than the image.

::: code
```php Static Config
->upscaleImages(false)
```
```shell Environment Override
CRAFT_UPSCALE_IMAGES=false
```
:::



## GraphQL

### `allowedGraphqlOrigins`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)[], [null](https://php.net/language.types.null), [false](https://php.net/language.types.boolean)

Default value
:  `null`

Defined by
:  [GeneralConfig::$allowedGraphqlOrigins](craft4:craft\config\GeneralConfig::$allowedGraphqlOrigins)

Since
:  3.5.0

</div>

The Ajax origins that should be allowed to access the GraphQL API, if enabled.

If this is set to an array, then `graphql/api` requests will only include the current request’s [origin](https://www.yiiframework.com/doc/api/2.0/yii-web-request#getOrigin()-detail)
in the `Access-Control-Allow-Origin` response header if it’s listed here.

If this is set to `false`, then the `Access-Control-Allow-Origin` response header will never be sent.

::: code
```php Static Config
->allowedGraphqlOrigins(false)
```
```shell Environment Override
CRAFT_ALLOW_GRAPHQL_ORIGINS=false
```
:::



### `disableGraphqlTransformDirective`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$disableGraphqlTransformDirective](craft4:craft\config\GeneralConfig::$disableGraphqlTransformDirective)

Since
:  3.6.0

</div>

Whether the `transform` directive should be disabled for the GraphQL API.

::: code
```php Static Config
->disableGraphqlTransformDirective(true)
```
```shell Environment Override
CRAFT_DISABLE_GRAPHQL_TRANSFORM_DIRECTIVE=1
```
:::



### `enableGql`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGql](craft4:craft\config\GeneralConfig::$enableGql)

Since
:  3.3.1

</div>

Whether the GraphQL API should be enabled.

The GraphQL API is only available for Craft Pro.

::: code
```php Static Config
->enableGql(false)
```
```shell Environment Override
CRAFT_ENABLE_GQL=false
```
:::



### `enableGraphqlCaching`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGraphqlCaching](craft4:craft\config\GeneralConfig::$enableGraphqlCaching)

Since
:  3.3.12

</div>

Whether Craft should cache GraphQL queries.

If set to `true`, Craft will cache the results for unique GraphQL queries per access token. The cache is automatically invalidated any time
an element is saved, the site structure is updated, or a GraphQL schema is saved.

This setting will have no effect if a plugin is using the [craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) event to provide its own
caching logic and setting the `result` property.

::: code
```php Static Config
->enableGraphqlCaching(false)
```
```shell Environment Override
CRAFT_ENABLE_GRAPHQL_CACHING=false
```
:::



### `enableGraphqlIntrospection`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$enableGraphqlIntrospection](craft4:craft\config\GeneralConfig::$enableGraphqlIntrospection)

Since
:  3.6.0

</div>

Whether GraphQL introspection queries are allowed. Defaults to `true` and is always allowed in the control panel.

::: code
```php Static Config
->enableGraphqlIntrospection(false)
```
```shell Environment Override
CRAFT_ENABLE_GRAPHQL_INTROSPECTION=false
```
:::



### `gqlTypePrefix`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [GeneralConfig::$gqlTypePrefix](craft4:craft\config\GeneralConfig::$gqlTypePrefix)

</div>

Prefix to use for all type names returned by GraphQL.

::: code
```php Static Config
->gqlTypePrefix('craft_')
```
```shell Environment Override
CRAFT_GQL_TYPE_PREFIX=craft_
```
:::



### `maxGraphqlComplexity`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlComplexity](craft4:craft\config\GeneralConfig::$maxGraphqlComplexity)

</div>

The maximum allowed complexity a GraphQL query is allowed to have. Set to `0` to allow any complexity.



### `maxGraphqlDepth`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlDepth](craft4:craft\config\GeneralConfig::$maxGraphqlDepth)

Since
:  3.6.0

</div>

The maximum allowed depth a GraphQL query is allowed to reach. Set to `0` to allow any depth.

::: code
```php Static Config
->maxGraphqlDepth(5)
```
```shell Environment Override
CRAFT_MAX_GRAPHQL_DEPTH=5
```
:::



### `maxGraphqlResults`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer)

Default value
:  `0`

Defined by
:  [GeneralConfig::$maxGraphqlResults](craft4:craft\config\GeneralConfig::$maxGraphqlResults)

Since
:  3.6.0

</div>

The maximum allowed results for a single GraphQL query. Set to `0` to disable any limits.

::: code
```php Static Config
->maxGraphqlResults(100)
```
```shell Environment Override
CRAFT_MAX_GRAPHQL_RESULTS=100
```
:::



### `prefixGqlRootTypes`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [GeneralConfig::$prefixGqlRootTypes](craft4:craft\config\GeneralConfig::$prefixGqlRootTypes)

Since
:  3.6.6

</div>

Whether the <config4:gqlTypePrefix> config setting should have an impact on `query`, `mutation`, and `subscription` types.

::: code
```php Static Config
->prefixGqlRootTypes(false)
```
```shell Environment Override
CRAFT_PREFIX_GQL_ROOT_TYPES=false
```
:::



### `setGraphqlDatesToSystemTimeZone`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [GeneralConfig::$setGraphqlDatesToSystemTimeZone](craft4:craft\config\GeneralConfig::$setGraphqlDatesToSystemTimeZone)

Since
:  3.7.0

</div>

Whether dates returned by the GraphQL API should be set to the system time zone by default, rather than UTC.

::: code
```php Static Config
->setGraphqlDatesToSystemTimeZone(true)
```
```shell Environment Override
CRAFT_SET_GRAPHQL_DATES_TO_SYSTEM_TIMEZONE=1
```
:::



## Garbage Collection

### `purgePendingUsersDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `0`

Defined by
:  [GeneralConfig::$purgePendingUsersDuration](craft4:craft\config\GeneralConfig::$purgePendingUsersDuration)

</div>

The amount of time to wait before Craft purges pending users from the system that have not activated.

Any content assigned to a pending user will be deleted as well when the given time interval passes.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: tip
Users will only be purged when [garbage collection](https://craftcms.com/docs/4.x/gc.html) is run.
:::

::: code
```php Static Config
// 2 weeks
'purgePendingUsersDuration' => 1209600,
```
```shell Environment Override
# 2 weeks
CRAFT_PURGE_PENDING_USERS_DURATION=1209600
```
:::



### `purgeStaleUserSessionDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `7776000` (90 days)

Defined by
:  [GeneralConfig::$purgeStaleUserSessionDuration](craft4:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

Since
:  3.3.0

</div>

The amount of time to wait before Craft purges stale user sessions from the sessions table in the database.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
// 1 week
'purgeStaleUserSessionDuration' => 604800,
```
```shell Environment Override
# 1 week
CRAFT_PURGE_STALE_USER_SESSION_DURATION=604800
```
:::



### `purgeUnsavedDraftsDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `2592000` (30 days)

Defined by
:  [GeneralConfig::$purgeUnsavedDraftsDuration](craft4:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

Since
:  3.2.0

</div>

The amount of time to wait before Craft purges unpublished drafts that were never updated with content.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->purgeUnsavedDraftsDuration(0)
```
```shell Environment Override
CRAFT_PURGE_UNSAVED_DRAFTS_DURATION=0
```
:::



### `softDeleteDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `2592000` (30 days)

Defined by
:  [GeneralConfig::$softDeleteDuration](craft4:craft\config\GeneralConfig::$softDeleteDuration)

Since
:  3.1.0

</div>

The amount of time before a soft-deleted item will be up for hard-deletion by garbage collection.

Set to `0` if you don’t ever want to delete soft-deleted items.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.

::: code
```php Static Config
->softDeleteDuration(0)
```
```shell Environment Override
CRAFT_SOFT_DELETE_DURATION=0
```
:::




<!-- END SETTINGS -->
