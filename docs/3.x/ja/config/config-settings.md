# 一般設定

Craft は、その振る舞いを制御するためのいくつかのコンフィギュレーション設定をサポートしています。

新しいコンフィグ設定をセットするには `config/general.php` を開き、設定を適用したい環境に応じて環境設定の配列の1つを定義してください。

例えば、staging または production 環境ではなく、dev 環境のみ Craft のアップデートを許可したい場合、次のようにします。

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

Craft がサポートするコンフィグ設定の完全なリストは、次の通りです。

<!-- BEGIN SETTINGS -->

### `actionTrigger`

Allowed types :
:

[string](http://php.net/language.types.string)

Default value :
:

`'actions'`

Defined by :
:

[GeneralConfig::$actionTrigger](craft3:craft\config\GeneralConfig::$actionTrigger)



許可される型 :



### `activateAccountSuccessPath`

Allowed types :
:

`mixed`

Default value :
:

`''`

Defined by :
:

[GeneralConfig::$activateAccountSuccessPath](craft3:craft\config\GeneralConfig::$activateAccountSuccessPath)



The URI that users without access to the Control Panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `addTrailingSlashesToUrls`

Allowed types :
:

[boolean](http://php.net/language.types.boolean)

Default value :
:

`false`

Defined by :
:

[GeneralConfig::$addTrailingSlashesToUrls](craft3:craft\config\GeneralConfig::$addTrailingSlashesToUrls)



生成された URL が `index.php` を省略するかどうか（例：`http://domain.com/index.php/path` の代わりに `http://domain.com/path`）。



### `aliases`

Allowed types :
:

[array](http://php.net/language.types.array)

Default value :
:

`[]`

Defined by :
:

[GeneralConfig::$aliases](craft3:craft\config\GeneralConfig::$aliases)



定義元 :



### `allowAdminChanges`

Allowed types :
:

[boolean](http://php.net/language.types.boolean)

Default value :
:

`true`

Defined by :
:

[GeneralConfig::$allowAdminChanges](craft3:craft\config\GeneralConfig::$allowAdminChanges)

Since :
:

3.1.0



管理者によるシステムへの管理上の変更を許可するかどうか。

現在のリクエストを最初にコントローラーアクションにルーティングするかどうかを決定するとき、Craft が探す URI セグメント。

許可される型 :

::: warning
Make sure you’ve read the entire [Project Config](https://docs.craftcms.com/v3/project-config.html) documentation, and carefully follow the “Enabling the Project Config File” steps when enabling this setting.
:::



### `allowSimilarTags`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$allowSimilarTags](craft3:craft\config\GeneralConfig::$allowSimilarTags)



デフォルト値 :



### `allowUpdates`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$allowUpdates](craft3:craft\config\GeneralConfig::$allowUpdates)



Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.

This setting will automatically be disabled if <config3:allowAdminChanges> is disabled.



### `allowUppercaseInSlug`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$allowUppercaseInSlug](craft3:craft\config\GeneralConfig::$allowUppercaseInSlug)



Whether uppercase letters should be allowed in slugs.



### `allowedFileExtensions`

許可される型 :
:

[string](http://php.net/language.types.string)[]

デフォルト値 :
:

`['7z', 'aiff', 'asf', 'avi', 'bmp', 'csv', 'doc', 'docx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'htm', 'html', 'jp2', 'jpeg', 'jpg', 'jpx', 'js', 'json', 'm2t', 'mid', 'mov', 'mp3', 'mp4', 'm4a', 'm4v', 'mpc', 'mpeg', 'mpg', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'ppz', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rtf', 'sdc', 'sitd', 'svg', 'swf', 'sxc', 'sxw', 'tar', 'tgz', 'tif', 'tiff', 'txt', 'vob', 'vsd', 'wav', 'webm', 'webp', 'wma', 'wmv', 'xls', 'xlsx', 'zip']`

定義元 :
:

[GeneralConfig::$allowedFileExtensions](craft3:craft\config\GeneralConfig::$allowedFileExtensions)



コントロールパネルにアクセスできないユーザーが、アカウントをアクティベートしたときにリダイレクトする URI。



### `allowedGraphqlOrigins`

許可される型 :
:

[string](http://php.net/language.types.string)[], [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$useProjectConfigFile](craft3:craft\config\GeneralConfig::$allowedGraphqlOrigins)

Since
:

3.5.0



サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。

許可される型 :

If this is set to `false`, then the `Access-Control-Allow-Origin` response header will never be sent.



### `autoLoginAfterAccountActivation`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$autoLoginAfterAccountActivation](craft3:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)



デフォルト値 :



### `autosaveDrafts`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$autosaveDrafts](craft3:craft\config\GeneralConfig::$autosaveDrafts)

Since
:

3.5.6



Whether drafts should be saved automatically as they are edited.

Note that drafts *will* be autosaved while Live Preview is open, regardless of this setting.



### `backupCommand`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$backupCommand](craft3:craft\config\GeneralConfig::$backupCommand)



The shell command that Craft should execute to create a database backup.

By default Craft will run `mysqldump` or `pg_dump`, provided that those libraries are in the `$PATH` variable for the user the web server  is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - バックアップファイルのターゲットパス
- `{port}` - the current database port
- `{server}` - the current database host name
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database backups completely.



### `backupOnUpdate`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$backupOnUpdate](craft3:craft\config\GeneralConfig::$backupOnUpdate)



Whether Craft should create a database backup before applying a new system update.



### `baseCpUrl`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$baseCpUrl](craft3:craft\config\GeneralConfig::$baseCpUrl)



The base URL that Craft should use when generating control panel URLs.

It will be determined automatically if left blank.

::: tip
The base control panel URL should **not** include the [control panel trigger word](config3:cpTrigger) (e.g. `/admin`).
:::



### `blowfishHashCost`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`13`

定義元 :
:

[GeneralConfig::$blowfishHashCost](craft3:craft\config\GeneralConfig::$blowfishHashCost)



The higher the cost value, the longer it takes to generate a password hash and to verify against it. Therefore, higher cost slows down a brute-force attack.

For best protection against brute force attacks, set it to the highest value that is tolerable on production servers.

The time taken to compute the hash doubles for every increment by one for this value. For example, if the hash takes 1 second to compute when the value is 14 then the compute time varies as 2^(value - 14) seconds.



### `brokenImagePath`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$brokenImagePath](craft3:craft\config\GeneralConfig::$brokenImagePath)

Since
:

3.5.0



The server path to an image file that should be sent when responding to an image request with a 404 status code.

This can be set to an aliased path such as `@webroot/assets/404.svg`.



### `cacheDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`86400`

定義元 :
:

[GeneralConfig::$cacheDuration](craft3:craft\config\GeneralConfig::$cacheDuration)



The default length of time Craft will store data, RSS feed, and template caches.

If set to `0`, data and RSS feed caches will be stored indefinitely; template caches will be stored for one year.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `convertFilenamesToAscii`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$convertFilenamesToAscii](craft3:craft\config\GeneralConfig::$convertFilenamesToAscii)



Whether uploaded filenames with non-ASCII characters should be converted to ASCII (i.e. `ñ` → `n`).

::: tip
You can run `php craft utils/ascii-filenames` in your terminal to apply ASCII filenames to all existing assets.
:::



### `cooldownDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`300`

定義元 :
:

[GeneralConfig::$cooldownDuration](craft3:craft\config\GeneralConfig::$cooldownDuration)



The amount of time a user must wait before re-attempting to log in after their account is locked due to too many failed login attempts.

Set to `0` to keep the account locked indefinitely, requiring an admin to manually unlock the account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `cpHeadTags`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`[]`

定義元 :
:

[GeneralConfig::$cpHeadTags](craft3:craft\config\GeneralConfig::$cpHeadTags)

Since
:

3.5.0



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



### `cpTrigger`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`'admin'`

定義元 :
:

[GeneralConfig::$cpTrigger](craft3:craft\config\GeneralConfig::$cpTrigger)



The URI segment Craft should look for when determining if the current request should route to the control panel rather than the front-end website.

This can be set to `null` if you have a dedicated host name for the control panel (e.g. `cms.example.com`), or you are running Craft in [Headless Mode](config3:headlessMode). If you do that, you will need to ensure that the control panel is being served from its own webroot directory on your server, with an `index.php` file that defines the `CRAFT_CP` PHP constant.

```php
define('CRAFT_CP', true);
```

Alternatively, you can set the <config3:baseCpUrl> config setting, but then you will run the risk of losing access to portions of your control panel due to URI conflicts with actual folders/files in your main webroot. (For example, if you have an `assets/` folder, that would conflict with the `/assets` page in the control panel.)



### `csrfTokenName`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'CRAFT_CSRF_TOKEN'`

定義元 :
:

[GeneralConfig::$csrfTokenName](craft3:craft\config\GeneralConfig::$csrfTokenName)



The name of CSRF token used for CSRF validation if <config3:enableCsrfProtection> is set to `true`.



### `defaultCookieDomain`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$defaultCookieDomain](craft3:craft\config\GeneralConfig::$defaultCookieDomain)



The domain that cookies generated by Craft should be created for. If blank, it will be left up to the browser to determine which domain to use (almost always the current). If you want the cookies to work for all subdomains, for example, you could set this to `'.domain.com'`.



### `defaultCpLanguage`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$defaultCpLanguage](craft3:craft\config\GeneralConfig::$defaultCpLanguage)



The default language the control panel should use for users who haven’t set a preferred language yet.



### `defaultCpLocale`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$defaultCpLocale](craft3:craft\config\GeneralConfig::$defaultCpLocale)

Since
:

3.5.0



The default locale the control panel should use for date/number formatting, for users who haven’t set a preferred language or preferred formatting locale yet.

If this is `null`, then the <config3:defaultCpLanguage> config setting will determine which locale is used for date/number formatting by default.



### `defaultDirMode`

許可される型 :
:

`mixed`

デフォルト値 :
:

`0775`

定義元 :
:

[GeneralConfig::$defaultDirMode](craft3:craft\config\GeneralConfig::$defaultDirMode)



The default permission to be set for newly generated directories.

[allowAdminChanges](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#allowadminchanges) が無効になっている場合、この設定は自動的に無効になります。



### `defaultFileMode`

許可される型 :
:

[integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$defaultFileMode](craft3:craft\config\GeneralConfig::$defaultFileMode)



The default permission to be set for newly generated files.

If set to `null`, the permission will be determined by the current environment.



### `defaultImageQuality`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`82`

定義元 :
:

[GeneralConfig::$defaultImageQuality](craft3:craft\config\GeneralConfig::$defaultImageQuality)



The quality level Craft will use when saving JPG and PNG files. Ranges from 0 (worst quality, smallest file) to 100 (best quality, biggest file).



### `defaultSearchTermOptions`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`[]`

定義元 :
:

[GeneralConfig::$defaultSearchTermOptions](craft3:craft\config\GeneralConfig::$defaultSearchTermOptions)



The default options that should be applied to each search term.

Options include:

- `attribute` – （もしある場合）用語が適用される属性（例：'title'）。 （デフォルトは `null`）
- `exact` – 用語が完全一致でなければならないかどうか（`attribute` がセットされている場合のみ、適用されます）。 （デフォルトは `false`）
- `exclude` – 検索結果でこの用語のレコードを *除外する* かどうか。 （デフォルトは `false`）
- `subLeft` – それより前に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。 （デフォルトは `false`）
- `subRight` – それより後に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。 （デフォルトは `true`）



### `defaultTemplateExtensions`

許可される型 :
:

[string](http://php.net/language.types.string)[]

デフォルト値 :
:

`['html', 'twig']`

定義元 :
:

[GeneralConfig::$defaultTemplateExtensions](craft3:craft\config\GeneralConfig::$defaultTemplateExtensions)



The template file extensions Craft will look for when matching a template path to a file on the front end.



### `defaultTokenDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`86400`

定義元 :
:

[GeneralConfig::$defaultTokenDuration](craft3:craft\config\GeneralConfig::$defaultTokenDuration)



The default amount of time tokens can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `defaultWeekStartDay`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`1`

定義元 :
:

[GeneralConfig::$defaultWeekStartDay](craft3:craft\config\GeneralConfig::$defaultWeekStartDay)



The default day that new users should have set as their Week Start Day.

This should be set to one of the following integers:

- `0` – 日曜日
- `1` – 月曜日
- `2` – 火曜日
- `3` – 水曜日
- `4` – 木曜日
- `5` – 金曜日
- `6` – 土曜日



### `deferPublicRegistrationPassword`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$deferPublicRegistrationPassword](craft3:craft\config\GeneralConfig::$deferPublicRegistrationPassword)



By default, Craft will require a 'password' field to be submitted on front-end, public user registrations. Setting this to `true` will no longer require it on the initial registration form.

If you have email verification enabled, new users will set their password once they've clicked on the verification link in the email. If you don't, the only way they can set their password is to go through your "forgot password" workflow.



### `devMode`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$devMode](craft3:craft\config\GeneralConfig::$devMode)



Whether the system should run in [Dev Mode](https://craftcms.com/support/dev-mode).



### `disabledPlugins`

許可される型 :
:

[string](http://php.net/language.types.string)[]

デフォルト値 :
:

`[]`

定義元 :
:

[GeneralConfig::$disabledPlugins](craft3:craft\config\GeneralConfig::$disabledPlugins)

Since
:

3.1.9



Array of plugin handles that should be disabled, regardless of what the project config says.

```php
'dev' => [
    'disabledPlugins' => ['webhooks'],
],
```

### `elevatedSessionDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`300`

定義元 :
:

[GeneralConfig::$elevatedSessionDuration](craft3:craft\config\GeneralConfig::$elevatedSessionDuration)



The amount of time a user’s elevated session will last, which is required for some sensitive actions (e.g. user group/permission assignment).

Set to `0` to disable elevated session support.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `enableBasicHttpAuth`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$enableBasicHttpAuth](craft3:craft\config\GeneralConfig::$enableBasicHttpAuth)

Since
:

3.5.0



Whether front-end web requests should support basic HTTP authentication.



### `enableCsrfCookie`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$enableCsrfCookie](craft3:craft\config\GeneralConfig::$enableCsrfCookie)



Whether to use a cookie to persist the CSRF token if <config3:enableCsrfProtection> is enabled. If false, the CSRF token will be stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security, it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.



### `enableCsrfProtection`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$enableCsrfProtection](craft3:craft\config\GeneralConfig::$enableCsrfProtection)



Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.



### `enableGql`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$enableGql](craft3:craft\config\GeneralConfig::$enableGql)

Since
:

3.3.1



Whether the GraphQL API should be enabled.

Note that the GraphQL API is only available for Craft Pro.



### `enableGraphQlCaching`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$enableGraphQlCaching](craft3:craft\config\GeneralConfig::$enableGraphQlCaching)

Since
:

3.3.12



Whether Craft should cache GraphQL queries.

If set to `true`, Craft will cache the results for unique GraphQL queries per access token. The cache is automatically invalidated any time an element is saved, the site structure is updated, or a GraphQL schema is saved.

This setting will have no effect if a plugin is using the [craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) event to provide its own caching logic and setting the `result` property.



### `enableTemplateCaching`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$enableTemplateCaching](craft3:craft\config\GeneralConfig::$enableTemplateCaching)



Whether to enable Craft's template `{% cache %}` tag on a global basis.



### `errorTemplatePrefix`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$errorTemplatePrefix](craft3:craft\config\GeneralConfig::$errorTemplatePrefix)



The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.

If set to `'_'`, then your site’s 404 template would live at `templates/_404.html`, for example.



### `extraAllowedFileExtensions`

許可される型 :
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$extraAllowedFileExtensions](craft3:craft\config\GeneralConfig::$extraAllowedFileExtensions)



List of file extensions that will be merged into the <config3:allowedFileExtensions> config setting.



### `extraAppLocales`

許可される型 :
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$extraAppLocales](craft3:craft\config\GeneralConfig::$extraAppLocales)

Since
:

3.0.24



List of extra locale IDs that the application should support, and users should be able to select as their Preferred Language.

Only use this setting if your server has the Intl PHP extension, or if you’ve saved the corresponding [locale data](https://github.com/craftcms/locales) into your `config/locales/` folder.



### `extraFileKinds`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`[]`

定義元 :
:

[GeneralConfig::$extraFileKinds](craft3:craft\config\GeneralConfig::$extraFileKinds)

Since
:

3.0.37



List of additional file kinds Craft should support. This array will get merged with the one defined in `\craft\helpers\Assets::_buildFileKinds()`.

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
File extensions listed here won’t immediately be allowed to be uploaded. You will also need to list them with the <config3:extraAllowedFileExtensions> config setting.
:::



### `filenameWordSeparator`

許可される型 :
:

[string](http://php.net/language.types.string), [boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`'-'`

定義元 :
:

[GeneralConfig::$filenameWordSeparator](craft3:craft\config\GeneralConfig::$filenameWordSeparator)



The string to use to separate words when uploading Assets. If set to `false`, spaces will be left alone.



### `generateTransformsBeforePageLoad`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$generateTransformsBeforePageLoad](craft3:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)



Whether images transforms should be generated before page load.



### `gqlTypePrefix`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$gqlTypePrefix](craft3:craft\config\GeneralConfig::$gqlTypePrefix)



Prefix to use for all type names returned by GraphQL.



### `headlessMode`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$headlessMode](craft3:craft\config\GeneralConfig::$headlessMode)

Since
:

3.3.0



Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations.

When this is enabled, the following changes will take place:

- `{path}` - バックアップファイルのパス
- `{port}` -現在のデータベースポート
- `{server}` - 現在のデータベースホスト名
- `{user}` -データベースのに接続するユーザー
- Twig will be configured to escape unsafe strings for JavaScript/JSON rather than HTML by default for front-end requests.
- The <config3:loginPath>, <config3:logoutPath>, <config3:setPasswordPath>, and <config3:verifyEmailPath> settings will be ignored.

::: tip
When Headless Mode is enabled, users will not be able to set an initial password, set a new password, or verify their email address unless they have the "Access the control panel" permission. Make sure to grant this permission to content editors and administrators who should be able to log into the control panel.
:::



### `imageDriver`

許可される型 :
:

`mixed`

デフォルト値 :
:

`self::IMAGE_DRIVER_AUTO`

定義元 :
:

[GeneralConfig::$imageDriver](craft3:craft\config\GeneralConfig::$imageDriver)



Craft が画像の削除や変形で使用するイメージドライバ。 デフォルトでは、Craft はインストールされている ImageMagick を自動検出し、そうでない場合は GD をフォールバックします。 明示的に `'imagick'` または `'gd'` をセットして、その振る舞いを上書きすることができます。



### `imageEditorRatios`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`['Unconstrained' => 'none', 'Original' => 'original', 'Square' => 1, '16:9' => 1.78, '10:8' => 1.25, '7:5' => 1.4, '4:3' => 1.33, '5:3' => 1.67, '3:2' => 1.5]`

定義元 :
:

[craft3:craft\config\GeneralConfig::$useCompressedJs](craft3:craft\config\GeneralConfig::$imageEditorRatios)



An array containing the selectable image aspect ratios for image editor. The array must be in the format of `label` => `ratio`, where ratio must be a float or a string. For string values, only values of "none" and "original" are allowed.



### `indexTemplateFilenames`

許可される型 :
:

[string](http://php.net/language.types.string)[]

デフォルト値 :
:

`['index']`

定義元 :
:

[GeneralConfig::$indexTemplateFilenames](craft3:craft\config\GeneralConfig::$indexTemplateFilenames)



フロントエンドでテンプレートパスとファイルの照合をする際に、Craft がディレクトリ内で探すディレクトリの「インデックス」テンプレートに相当するテンプレートファイル名。



### `invalidLoginWindowDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`3600`

定義元 :
:

[GeneralConfig::$invalidLoginWindowDuration](craft3:craft\config\GeneralConfig::$invalidLoginWindowDuration)



Craft がアカウントをロックするかを決定するために、ユーザーの無効なログイン試行を追跡する時間。

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `invalidUserTokenPath`

許可される型 :
:

`mixed`

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$invalidUserTokenPath](craft3:craft\config\GeneralConfig::$invalidUserTokenPath)



ユーザートークンの検証が失敗した際に、Craft がリダイレクトする URI。 トークンは、ユーザーアカウントのパスワードの設定やリセットで利用されます。 フロントエンドサイトのリクエストのみに影響することに注意してください。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `ipHeaders`

許可される型 :
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$ipHeaders](craft3:craft\config\GeneralConfig::$ipHeaders)



プロキシが実際のクライアント IP を保管するヘッダーのリスト。

詳細については、[yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) を参照してください。

設定されていない場合、デフォルトで [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) 値が使用されます。



### `isSystemLive`

許可される型 :
:

[boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$isSystemLive](craft3:craft\config\GeneralConfig::$isSystemLive)



サイトが現在稼働しているかどうか。 `true` または `false` をセットしている場合、「設定 > 一般」のシステムのステータス設定よりも優先されます。



### `limitAutoSlugsToAscii`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$limitAutoSlugsToAscii](craft3:craft\config\GeneralConfig::$limitAutoSlugsToAscii)



自動生成されたスラグの ASCII 以外の文字を ASCII に変換するかどうか（例： ñ → n）。

::: tip
これは JavaScript によって自動生成されるスラグのみ影響します。 手動で入力した場合、ASCII 以外の文字をスラグに使用できます。 :::
:::



### `loginPath`

許可される型 :
:

`mixed`

デフォルト値 :
:

`'login'`

定義元 :
:

[GeneralConfig::$loginPath](craft3:craft\config\GeneralConfig::$loginPath)



Craft がフロントエンドのユーザーログインに使用する URI。

データベースのバックアップを完全に無効化するために、`false` をセットすることもできます。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `logoutPath`

許可される型 :
:

`mixed`

デフォルト値 :
:

`'logout'`

定義元 :
:

[GeneralConfig::$logoutPath](craft3:craft\config\GeneralConfig::$logoutPath)



Craft がフロントエンドのユーザーログアウトに使用する URI。

この機能を完全に無効化するには、`0` をセットしてください。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `maxBackups`

許可される型 :
:

[integer](http://php.net/language.types.integer), [false](http://php.net/language.types.boolean)

デフォルト値 :
:

`20`

定義元 :
:

[GeneralConfig::$maxBackups](craft3:craft\config\GeneralConfig::$maxBackups)



The number of backups that Craft should make before it starts deleting the oldest backups. If it is set to `false`, then Craft will not delete any backups.



### `maxCachedCloudImageSize`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`2000`

定義元 :
:

[GeneralConfig::$maxCachedCloudImageSize](craft3:craft\config\GeneralConfig::$maxCachedCloudImageSize)



変換で使用する外部ソースから画像をキャッシュする際に使用する最大の寸法サイズ。 キャッシュを無効化するには、`0` をセットしてください。



### `maxInvalidLogins`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`5`

定義元 :
:

[GeneralConfig::$maxInvalidLogins](craft3:craft\config\GeneralConfig::$maxInvalidLogins)



ロックされる前のアカウントが指定期間内で Craft に許可される、無効なログイン試行の回数。



### `maxRevisions`

許可される型 :
:

[integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値 :
:

`50`

定義元 :
:

[GeneralConfig::$maxRevisions](craft3:craft\config\GeneralConfig::$maxRevisions)

Since
:

3.2.0



The maximum number of revisions that should be stored for each element.

Set to `0` if you want to store an unlimited number of revisions.



### `maxSlugIncrement`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`100`

定義元 :
:

[GeneralConfig::$maxSlugIncrement](craft3:craft\config\GeneralConfig::$maxSlugIncrement)



諦めてエラーにする前に、Craft がそれをユニークにするためにスラグへ追加する最高の数。



### `maxUploadFileSize`

許可される型 :
:

[integer](http://php.net/language.types.integer), [string](http://php.net/language.types.string)

デフォルト値 :
:

`661e8.0004774116777216`

定義元 :
:

[GeneralConfig::$maxUploadFileSize](craft3:craft\config\GeneralConfig::$maxUploadFileSize)



許可される最大のアップロードファイルサイズ。

サポートされる値の種類は、[craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) のリストを参照してください。



### `omitScriptNameInUrls`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$omitScriptNameInUrls](craft3:craft\config\GeneralConfig::$omitScriptNameInUrls)



例えば `'_'` がセットされている場合、サイトの 404 テンプレートは`templates/_404.html` となります。

これは、例えば Craft に付属している `.htaccess` にリダイレクトが見つかるなど、404 を `index.php` にリダイレクトするようサーバーが設定されている場合のみ可能です。

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```



### `optimizeImageFilesize`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$optimizeImageFilesize](craft3:craft\config\GeneralConfig::$optimizeImageFilesize)



Craft が画質を著しく低下させることなく、画像のファイルサイズを減らす最適化をするかどうか。 （ImageMagick を使用している場合のみ、サポートされます。



### `pageTrigger`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'p'`

定義元 :
:

[GeneralConfig::$pageTrigger](craft3:craft\config\GeneralConfig::$pageTrigger)



現在のリクエストがページ分割されたリストに含まれる特定ページのものかどうかを決定する際に、Craft が探す数値の前にある文字列。

| サンプル値   | サンプル URI       |
| ------- | -------------- |
| `p`     | `/news/p5`     |
| `page`  | `/news/page5`  |
| `page/` | `/news/page/5` |
| `?page` | `/news?page=5` |

::: tip
If you want to set this to `?p` (e.g. `/news?p=5`), you will need to change your <config3:pathParam> ::: tip これを変更し、かつ、サーバーが Apache で稼働している場合、新しい値とマッチするよう `.htaccess` ファイルをアップデートすることを忘れないでください。 :::
:::



### `pathParam`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`'p'`

定義元 :
:

[GeneralConfig::$pathParam](craft3:craft\config\GeneralConfig::$pathParam)



リクエストのパスを決定する際に、Craft がチェックするクエリ文字列のパラメータ。

::: tip
これを `?p`（例：`/news?p=5`）にセットしたい場合、デフォルトで `p` がセットされている [pathParam](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#pathparam) 設定も変更する必要があります。 さらにサーバーが Apache で稼働している場合、新しい `pathParam` 値とマッチするよう `.htaccess` ファイル内のリダイレクトコードをアップデートする必要があります。
:::

    RewriteRule (.+) index.php [QSA,L]



### `phpMaxMemoryLimit`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$phpMaxMemoryLimit](craft3:craft\config\GeneralConfig::$phpMaxMemoryLimit)



Craft が圧縮、展開、アップデートなどのメモリ集約型の操作中に確保しようと試みるメモリの最大量。 デフォルトは空の文字列で、可能な限り多くのメモリを使用することを意味しています。

受け入れられる値については、<http://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> のリストを参照してください。



### `phpSessionName`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'CraftSessionId'`

定義元 :
:

[GeneralConfig::$phpSessionName](craft3:craft\config\GeneralConfig::$phpSessionName)



PHP セッション Cookie の名前。



### `postCpLoginRedirect`

許可される型 :
:

`mixed`

デフォルト値 :
:

`'dashboard'`

定義元 :
:

[GeneralConfig::$postCpLoginRedirect](craft3:craft\config\GeneralConfig::$postCpLoginRedirect)



コントロールパネルからログインした後にユーザーをリダイレクトするパス。

すでにログインしているユーザーが CP のログインページ（`/admin/login`）または、CP のルート URL（/admin）にアクセスした場合も、この設定が効力を発揮します。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLoginRedirect`

許可される型 :
:

`mixed`

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$postLoginRedirect](craft3:craft\config\GeneralConfig::$postLoginRedirect)



フロントエンドサイトからログインした後にユーザーをリダイレクトするパス。

すでにログインしているユーザーがログインページ（コンフィグ設定の loginPath に明示されているとおり）にアクセスした場合も、効力を発揮します。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLogoutRedirect`

許可される型 :
:

`mixed`

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$postLogoutRedirect](craft3:craft\config\GeneralConfig::$postLogoutRedirect)



フロントエンドサイトからログアウトした後にユーザーをリダイレクトするパス。

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `preserveCmykColorspace`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$preserveCmykColorspace](craft3:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:

3.0.8



画像を操作するとき、CMYK を色空間として保存するかどうか。

Setting this to `true` will prevent Craft from transforming CMYK images to sRGB, but on some ImageMagick versions it can cause color distortion in the image. これは ImageMagick を使用している場合のみ、影響があります。



### `preserveExifData`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$preserveExifData](craft3:craft\config\GeneralConfig::$preserveExifData)



画像を操作するとき、EXIF データを保存するかどうか。

`false` に設定すると画像サイズが少し小さくなります。

これは ImageMagick を使用している場合のみ、影響があります。



### `preserveImageColorProfiles`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$preserveImageColorProfiles](craft3:craft\config\GeneralConfig::$preserveImageColorProfiles)



画像を操作するとき、埋め込まれたイメージカラープロファイル（ICC）を保存するかどうか。

Setting this to `false` will reduce the image size a little bit, but on some ImageMagick versions can cause images to be saved with an incorrect gamma value, which causes the images to become very dark. これは ImageMagick を使用している場合のみ、影響があります。



### `preventUserEnumeration`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`false`

定義元 :
:

[GeneralConfig::$preventUserEnumeration](craft3:craft\config\GeneralConfig::$preventUserEnumeration)



`false` に設定され、コントロールパネルのログインページの「パスワードを忘れた」ワークフローを通過すると、ユーザー名 / メールアドレスが存在しないのか、または、次の手順のためのメール送信が成功し確認されたのかを示す別個のメッセージが表示されます。 これは、レスポンスに基づいてユーザー名 / メールアドレスの列挙を許可します。 `true` に設定すると、ユーザーを列挙するのが難しいエラーである場合も、常に正常なレスポンスを受け取るでしょう。



### `previewIframeResizerOptions`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`[]`

定義元 :
:

[GeneralConfig::$previewIframeResizerOptions](craft3:craft\config\GeneralConfig::$previewIframeResizerOptions)

Since
:

3.5.0



Custom [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) that should be used for preview iframes.

```php
'previewIframeResizerOptions' => [
    'autoResize' => false,
],
```



### `privateTemplateTrigger`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'_'`

定義元 :
:

[GeneralConfig::$privateTemplateTrigger](craft3:craft\config\GeneralConfig::$privateTemplateTrigger)



The template path segment prefix that should be used to identify "private" templates (templates that aren't directly accessible via a matching URL).

Set to an empty value to disable public template routing.



### `purgePendingUsersDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$purgePendingUsersDuration](craft3:craft\config\GeneralConfig::$purgePendingUsersDuration)



The amount of time to wait before Craft purges pending users from the system that have not activated.

Note that any content assigned to a pending user will be deleted as well when the given time interval passes.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `purgeStaleUserSessionDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`7776000`

定義元 :
:

[GeneralConfig::$purgeStaleUserSessionDuration](craft3:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

Since
:

3.3.0



The amount of time to wait before Craft purges stale user sessions from the sessions table in the database.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `purgeUnsavedDraftsDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`2592000`

定義元 :
:

[GeneralConfig::$purgeUnsavedDraftsDuration](craft3:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

Since
:

3.2.0



The amount of time to wait before Craft purges drafts of new elements that were never formally saved.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberUsernameDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`31536000`

定義元 :
:

[GeneralConfig::$rememberUsernameDuration](craft3:craft\config\GeneralConfig::$rememberUsernameDuration)



The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.

Set to `0` to disable this feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberedUserSessionDuration`

許可される型 :
:

`mixed`

デフォルト値 :
:

`1209600`

定義元 :
:

[GeneralConfig::$rememberedUserSessionDuration](craft3:craft\config\GeneralConfig::$rememberedUserSessionDuration)



The amount of time a user stays logged if “Remember Me” is checked on the login page.

Set to `0` to disable the “Remember Me” feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `requireMatchingUserAgentForSession`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$requireMatchingUserAgentForSession](craft3:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)



Whether Craft should require a matching user agent string when restoring a user session from a cookie.



### `requireUserAgentAndIpForSession`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$requireUserAgentAndIpForSession](craft3:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)



Whether Craft should require the existence of a user agent string and IP address when creating a new user session.



### `resourceBasePath`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'@webroot/cpresources'`

定義元 :
:

[GeneralConfig::$resourceBasePath](craft3:craft\config\GeneralConfig::$resourceBasePath)



The path to the root directory that should store published control panel resources.



### `resourceBaseUrl`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'@web/cpresources'`

定義元 :
:

[GeneralConfig::$resourceBaseUrl](craft3:craft\config\GeneralConfig::$resourceBaseUrl)



The URL to the root directory that should store published control panel resources.



### `restoreCommand`

許可される型 :
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$restoreCommand](craft3:craft\config\GeneralConfig::$restoreCommand)



The shell command that Craft should execute to restore a database backup.

By default Craft will run `mysql` or `psql`, provided that those libraries are in the `$PATH` variable for the user the web server  is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - the backup file path
- `{port}` - the current database port
- `{server}` - the current database host name
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database restores completely.



### `rotateImagesOnUploadByExifData`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$rotateImagesOnUploadByExifData](craft3:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)



Whether Craft should rotate images according to their EXIF data on upload.



### `runQueueAutomatically`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$runQueueAutomatically](craft3:craft\config\GeneralConfig::$runQueueAutomatically)



Whether Craft should run pending queue jobs automatically when someone visits the control panel.

If disabled, an alternate queue worker *must* be set up separately, either as an [always-running daemon](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md), or a cron job that runs the `queue/run` command every minute:

```cron
/1 * * * * /path/to/project/root/craft queue/run
```

::: tip
This setting should be disabled for servers running Win32, or with Apache’s mod_deflate/mod_gzip installed, where PHP’s [flush()](http://php.net/manual/en/function.flush.php) method won’t work.
:::



### `sameSiteCookieValue`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$sameSiteCookieValue](craft3:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:

3.1.33



The [SameSite](https://www.owasp.org/index.php/SameSite) value that should be set on Craft cookies, if any.

This can be set to `'Lax'`, `'Strict'`, or `null`.

::: tip
This setting requires PHP 7.3 or later.
:::



### `sanitizeSvgUploads`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$sanitizeSvgUploads](craft3:craft\config\GeneralConfig::$sanitizeSvgUploads)



Whether Craft should sanitize uploaded SVG files and strip out potential malicious looking content.

This should definitely be enabled if you are accepting SVG uploads from untrusted sources.



### `secureHeaders`

許可される型 :
:

[array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$secureHeaders](craft3:craft\config\GeneralConfig::$secureHeaders)



Lists of headers that are, by default, subject to the trusted host configuration.

See [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) value will be used.



### `secureProtocolHeaders`

許可される型 :
:

[array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$secureProtocolHeaders](craft3:craft\config\GeneralConfig::$secureProtocolHeaders)



List of headers to check for determining whether the connection is made via HTTPS.

See [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) value will be used.



### `securityKey`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$securityKey](craft3:craft\config\GeneralConfig::$securityKey)



A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](craft3:craft\services\Security).

This value should be the same across all environments. Note that if this key ever changes, any data that was encrypted with it will be inaccessible.



### `sendPoweredByHeader`

許可される型 :
:

[boolean](http://php.net/language.types.boolean)

デフォルト値 :
:

`true`

定義元 :
:

[GeneralConfig::$sendPoweredByHeader](craft3:craft\config\GeneralConfig::$sendPoweredByHeader)



Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and [Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.



### `setPasswordPath`

許可される型 :
:

`mixed`

デフォルト値 :
:

`'setpassword'`

定義元 :
:

[GeneralConfig::$setPasswordPath](craft3:craft\config\GeneralConfig::$setPasswordPath)



The URI Craft should use for Set Password forms on the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: tip
You might also want to set <config3:invalidUserTokenPath> in case a user clicks on an expired password reset link.
:::



### `setPasswordSuccessPath`

許可される型 :
:

`mixed`

デフォルト値 :
:

`''`

定義元 :
:

[GeneralConfig::$setPasswordSuccessPath](craft3:craft\config\GeneralConfig::$setPasswordSuccessPath)



The URI Craft should redirect users to after setting their password from the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `siteName`

許可される型 :
:

[string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$siteName](craft3:craft\config\GeneralConfig::$siteName)



The site name(s). If set, it will take precedence over the Name settings in Settings → Sites → [Site Name].

This can be set to a string, which will override the primary site’s name only, or an array with site handles used as the keys.



### `siteToken`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'siteToken'`

定義元 :
:

[GeneralConfig::$siteToken](craft3:craft\config\GeneralConfig::$siteToken)

Since
:

3.5.0



The query string parameter name that site tokens should be set to.



### `siteUrl`

許可される型 :
:

[string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

デフォルト値 :
:

`null`

定義元 :
:

[GeneralConfig::$siteUrl](craft3:craft\config\GeneralConfig::$siteUrl)



The base URL to the site(s). If set, it will take precedence over the Base URL settings in Settings → Sites → [Site Name].

This can be set to a string, which will override the primary site’s base URL only, or an array with site handles used as the keys.

The URL(s) must begin with either `http://`, `https://`, `//` (protocol-relative), or an [alias](config3:aliases).

```php
'siteUrl' => [
    'siteA' => 'https://site-a.com/',
    'siteB' => 'https://site-b.com/',
],
```



### `slugWordSeparator`

許可される型 :
:

[string](http://php.net/language.types.string)

Default value
:

`'-'`

定義元 :
:

[GeneralConfig::$slugWordSeparator](craft3:craft\config\GeneralConfig::$slugWordSeparator)



The character(s) that should be used to separate words in slugs.



### `softDeleteDuration`

許可される型 :
:

`mixed`

Default value
:

`2592000`

Defined by
:

[GeneralConfig::$softDeleteDuration](craft3:craft\config\GeneralConfig::$softDeleteDuration)

Since
:

3.1.0



The amount of time before a soft-deleted item will be up for hard-deletion by garbage collection.

Set to `0` if you don’t ever want to delete soft-deleted items.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `storeUserIps`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$storeUserIps](craft3:craft\config\GeneralConfig::$storeUserIps)

Since
:

3.1.0



Whether user IP addresses should be stored/logged by the system.



### `testToEmailAddress`

Allowed types
:

[string](http://php.net/language.types.string), [array](http://php.net/language.types.array), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$testToEmailAddress](craft3:craft\config\GeneralConfig::$testToEmailAddress)



Configures Craft to send all system emails to a single email address, or an array of email addresses for testing purposes.

By default the recipient name(s) will be “Test Recipient”, but you can customize that by setting the value with the format `['email@address.com' => 'Name']`.



### `timezone`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$timezone](craft3:craft\config\GeneralConfig::$timezone)



The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.

This can be set to one of PHP’s [supported timezones](http://php.net/manual/en/timezones.php).



### `tokenParam`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'token'`

Defined by
:

[GeneralConfig::$tokenParam](craft3:craft\config\GeneralConfig::$tokenParam)



The query string parameter name that Craft tokens should be set to.



### `transformGifs`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$transformGifs](craft3:craft\config\GeneralConfig::$transformGifs)

Since
:

3.0.7



Whether GIF files should be cleansed/transformed.



### `translationDebugOutput`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$translationDebugOutput](craft3:craft\config\GeneralConfig::$translationDebugOutput)



Whether translated messages should be wrapped in special characters, to help find any strings that are not being run through `Craft::t()` or the `|translate` filter.



### `trustedHosts`

Allowed types
:

[array](http://php.net/language.types.array)

Default value
:

`['any']`

Defined by
:

[GeneralConfig::$trustedHosts](craft3:craft\config\GeneralConfig::$trustedHosts)



The configuration for trusted security-related headers.

See [yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) for more details.

By default, all hosts are trusted.



### `upscaleImages`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$upscaleImages](craft3:craft\config\GeneralConfig::$upscaleImages)

Since
:

3.4.0



Whether images should be upscaled if the provided transform size is larger than the image.



### `useEmailAsUsername`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$useEmailAsUsername](craft3:craft\config\GeneralConfig::$useEmailAsUsername)



Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.

If you enable this setting after user accounts already exist, run this terminal command to update existing usernames:

```bash
php craft utils/update-usernames
```



### `useFileLocks`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$useFileLocks](craft3:craft\config\GeneralConfig::$useFileLocks)



Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.

Some file systems, such as NFS, do not support exclusive file locking.

If not set to `true` or `false`, Craft will automatically try to detect if the underlying file system supports exclusive file locking and cache the results.



### `useIframeResizer`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$useIframeResizer](craft3:craft\config\GeneralConfig::$useIframeResizer)

Since
:

3.5.5



Whether [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) should be used for Live Preview.

Using iFrame Resizer makes it possible for Craft to retain the preview’s scroll position between page loads, for cross-origin web pages.

It works by setting the height of the iframe to match the height of the inner web page, and the iframe’s container will be scrolled rather than the iframe document itself. This can lead to some unexpected CSS issues, however, because the previewed viewport height will be taller than the visible portion of the iframe.

If you have a [decoupled front-end](https://craftcms.com/docs/3.x/entries.html#previewing-decoupled-front-ends), you will need to include [iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js) on your page as well for this to work. You can conditionally include it for only Live Preview requests by checking if the requested URL contains a `x-craft-live-preview` query string parameter.

::: tip
You can customize the behavior of iFrame Resizer via the <config3:previewIframeResizerOptions> config setting.
:::



### `usePathInfo`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$usePathInfo](craft3:craft\config\GeneralConfig::$usePathInfo)



Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.

Note that this setting only takes effect if <config3:omitScriptNameInUrls> is set to false.



### `useSecureCookies`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:

`'auto'`

Defined by
:

[GeneralConfig::$useSecureCookies](craft3:craft\config\GeneralConfig::$useSecureCookies)



Whether Craft will set the "secure" flag when saving cookies when using `Craft::cookieConfig() to create a cookie`.

Valid values are `true`, `false`, and `'auto'`. Defaults to `'auto'`, which will set the secure flag if the page you're currently accessing is over `https://`. `true` will always set the flag, regardless of protocol and `false` will never automatically set the flag.



### `useSslOnTokenizedUrls`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:

`'auto'`

Defined by
:

[GeneralConfig::$useSslOnTokenizedUrls](craft3:craft\config\GeneralConfig::$useSslOnTokenizedUrls)



Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the siteUrl and the protocol of the current request and if either of them are https will use `https` in the tokenized URL. If not, will use `http`.

If set to `false`, the Craft will always use `http`. If set to `true`, then, Craft will always use `https`.



### `userSessionDuration`

Allowed types
:

`mixed`

Default value
:

`3600`

Defined by
:

[GeneralConfig::$userSessionDuration](craft3:craft\config\GeneralConfig::$userSessionDuration)



The amount of time before a user will get logged out due to inactivity.

Set to `0` if you want users to stay logged in as long as their browser is open rather than a predetermined amount of time.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `verificationCodeDuration`

Allowed types
:

`mixed`

Default value
:

`86400`

Defined by
:

[GeneralConfig::$verificationCodeDuration](craft3:craft\config\GeneralConfig::$verificationCodeDuration)



The amount of time a user verification code can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `verifyEmailPath`

Allowed types
:

`mixed`

Default value
:

`'verifyemail'`

Defined by
:

[GeneralConfig::$verifyEmailPath](craft3:craft\config\GeneralConfig::$verifyEmailPath)

Since
:

3.4.0



The URI Craft should use for email verification links on the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `verifyEmailSuccessPath`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$verifyEmailSuccessPath](craft3:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:

3.1.20



The URI that users without access to the control panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.




<!-- END SETTINGS -->
