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

## System

### `デフォルト値`

Allowed types :
:   [array](http://php.net/language.types.array)

Default value :
:   `['useShapes' => false, 'underlineLinks' => false]`

Defined by :
:   [GeneralConfig::$siteUrl](craft3:craft\config\GeneralConfig::$accessibilityDefaults)

それ以降
:   3600



現在のリクエストをコントローラーアクションにルーティングするかどうかを決定するとき、Craft が探す URI セグメント。

コントロールパネルにアクセスできないユーザーが、アカウントをアクティベートしたときにリダイレクトする URI。

- `{file}` - バックアップファイルのターゲットパス
- `{port}` - 現在のデータベースポート



### `allowAdminChanges`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `true`

Defined by :
:   [GeneralConfig::$allowAdminChanges](craft3:craft\config\GeneralConfig::$allowAdminChanges)

それ以降
:   3.1.0



サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。

自動生成された URL にスラッシュをつけるかどうか。

リクエストごとに定義される、カスタムの Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)。

::: warning
Don’t disable this setting until **all** environments have been updated to Craft 3.1.0 or later.
:::



### `allowUpdates`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `true`

Defined by :
:   [GeneralConfig::$allowUpdates](craft3:craft\config\GeneralConfig::$allowUpdates)



これを無効にすると、設定およびプラグインストアのセクションは非表示になり、Craft 本体のエディションとプラグインのバージョンがロックされ、プロジェクトコンフィグは読み取り専用になります。

が無効になっている場合、この設定は自動的に無効になります。 <config3:allowAdminChanges> is disabled.



### `allowSimilarTags`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `false`

Defined by :
:   [GeneralConfig::$allowSimilarTags](craft3:craft\config\GeneralConfig::$allowSimilarTags)



::: warning
**すべての**環境が Craft 3.1.0 以降にアップデートされるまで、この設定を無効にしないでください。
:::



### `autoLoginAfterAccountActivation`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `false`

Defined by :
:   [GeneralConfig::$autoLoginAfterAccountActivation](craft3:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)



ユーザーによる類似した名前のタグの作成を許可するかどうか。



### `autosaveDrafts`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `true`

Defined by :
:   [GeneralConfig::$autosaveDrafts](craft3:craft\config\GeneralConfig::$autosaveDrafts)

それ以降
:   3.5.6



コントロールパネルでのシステムとプラグインのアップデート、および、プラグインストアからのプラグインのインストールを Craft が許可するかどうか。

Note that drafts *will* be autosaved while Live Preview is open, regardless of this setting.



### `backupOnUpdate`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `true`

Defined by :
:   [GeneralConfig::$backupOnUpdate](craft3:craft\config\GeneralConfig::$backupOnUpdate)



スラグに大文字を使うことを許可するかどうか。



### `cacheDuration`

Allowed types :
:   `mixed`

Default value :
:   `86400` (1 day)

Defined by :
:   [GeneralConfig::$cacheDuration](craft3:craft\config\GeneralConfig::$cacheDuration)



ユーザーがファイルをアップロードする際に、Craft が許可するファイル拡張子。

有効な場合、GraphQL API へのアクセスが許可されるべき Ajax のオリジン。

ここに配列がセットされている場合、現在のリクエストの [origin](https://www.yiiframework.com/doc/api/2.0/yii-web-request#getOrigin()-detail) がリストされていれば、`graphql/api` リクエストは `Access-Control-Allow-Origin` レスポンスヘッダを含めます。



### `cpHeadTags`

Allowed types :
:   [array](http://php.net/language.types.array)

Default value :
:   `[]`

Defined by :
:   [GeneralConfig::$cpHeadTags](craft3:craft\config\GeneralConfig::$cpHeadTags)

それ以降
:   3.5.0



ここに `false` がセットされている場合、`Access-Control-Allow-Origin` レスポンスヘッダは決して送信されません。

ユーザーがアカウントを有効化、または、パスワードをリセットした後で、自動的にログインさせるかどうか。

編集された下書きを自動的に保存するかどうか。

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

Allowed types :
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value :
:   `null`

Defined by :
:   [GeneralConfig::$defaultCpLanguage](craft3:craft\config\GeneralConfig::$defaultCpLanguage)



この設定に関わらず、ライブプレビューを開いている間は下書きが自動保存 *されます*。



### `defaultCpLocale`

Allowed types :
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value :
:   `null`

Defined by :
:   [GeneralConfig::$defaultCpLocale](craft3:craft\config\GeneralConfig::$defaultCpLocale)

それ以降
:   3.5.0



データベースのバックアップを作成するために Craft が実行するシェルコマンド。

これが `null` の場合、コンフィグ設定 <config3:defaultCpLanguage> がデフォルトで使用される日付や書式のフォーマットを決定します。



### `defaultDirMode`

Allowed types :
:   `mixed`

Default value :
:   `0775`

Defined by :
:   [GeneralConfig::$defaultDirMode](craft3:craft\config\GeneralConfig::$defaultDirMode)



ランタイムで Craft がスワップアウトするために利用できるいくつかのトークンがあります。

データベースのバックアップを完全に無効化するために、`false` をセットすることもできます。



### `defaultFileMode`

Allowed types :
:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

Default value :
:   `null`

Defined by :
:   [GeneralConfig::$defaultFileMode](craft3:craft\config\GeneralConfig::$defaultFileMode)



新しいシステムアップデートを適用する前に、Craft がデータベースのバックアップを作成するかどうか。

コントロールパネルの URL を生成する際に、Craft が使用するベース URL。



### `defaultSearchTermOptions`

Allowed types :
:   [array](http://php.net/language.types.array)

Default value :
:   `[]`

Defined by :
:   [GeneralConfig::$defaultSearchTermOptions](craft3:craft\config\GeneralConfig::$defaultSearchTermOptions)



空白の場合、自動的に決定されます。

::: tip
コントロールパネルのベース URL に [コントロールパネルのトリガーワード](config3:cpTrigger)（例：`/admin`）を **含めない** でください。
:::

- `attribute` – （もしある場合）用語が適用される属性（例：'title'）。 （デフォルトは `null`）
- `exact` – 用語が完全一致でなければならないかどうか（`attribute` がセットされている場合のみ、適用されます）。 （デフォルトは `false`)
- `exclude` – 検索結果でこの用語のレコードを *除外する* かどうか。 （デフォルトは `false`)
- `subLeft` – それより前に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。 （デフォルトは `false`）
- `subRight` – それより後に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。 （デフォルトは `true`）



### `defaultTemplateExtensions`

Allowed types :
:   [string](http://php.net/language.types.string)[]

Default value :
:   `['html', 'twig']`

Defined by :
:   [GeneralConfig::$defaultTemplateExtensions](craft3:craft\config\GeneralConfig::$defaultTemplateExtensions)



フロントエンドでテンプレートパスとファイルの照合をする際に、Craft が探すテンプレートファイルの拡張子。



### `defaultWeekStartDay`

Allowed types :
:   [integer](http://php.net/language.types.integer)

Default value :
:   `1` (Monday)

Defined by :
:   [GeneralConfig::$defaultWeekStartDay](craft3:craft\config\GeneralConfig::$defaultWeekStartDay)



ブルートフォース攻撃に対するベストな保護のために、production サーバーで許容される最高の値をセットしてください。

この値が増加するごとに、ハッシュを計算するためにかかる時間は倍になります。 例えば、値が14のときハッシュの計算に1秒かかる場合、計算時間は「2^(値 - 14) 」秒で変化します。

- `0` – 日曜日
- `1` – 月曜日
- `2` – 火曜日
- `3` – 水曜日
- `4` – 木曜日
- `5` – 金曜日
- `6` – 土曜日



### `devMode`

Allowed types :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `false`

Defined by :
:   [GeneralConfig::$devMode](craft3:craft\config\GeneralConfig::$devMode)



404 ステータスコードの画像リクエストへ応答する際に送信する、画像ファイルのサーバーパス。



### `disabledPlugins`

許可される型 :
:   [string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

Default value :
:   `null`

Defined by :
:   [GeneralConfig::$disabledPlugins](craft3:craft\config\GeneralConfig::$disabledPlugins)

それ以降
:   3.1.9



`@webroot/assets/404.svg` のようなエイリアスパスをセットできます。

```php
'dev' => [
    'disabledPlugins' => ['webhooks'],
],
```

Craft がデータ、RSS フィード、および、テンプレートキャッシュを保管する時間のデフォルトの長さ。

```php
'dev' => [
    'disabledPlugins' => '*',
],
```



### `disallowRobots`

許可される型 :
:   [boolean](http://php.net/language.types.boolean)

Default value :
:   `false`

Defined by : :
:   [GeneralConfig::$siteName](craft3:craft\config\GeneralConfig::$disallowRobots)

それ以降
:   3.5.10



Whether front end requests should respond with `X-Robots-Tag: none` HTTP headers, indicating that pages should not be indexed, and links on the page should not be followed, by web crawlers.

::: tip
This should be set to `true` for development and staging environments.
:::



### `enableTemplateCaching`

許可される型 :
:   [boolean](http://php.net/language.types.boolean)

Default value : :
:   `true`

定義元 :
:   [GeneralConfig::$enableTemplateCaching](craft3:craft\config\GeneralConfig::$enableTemplateCaching)



アップロードされたファイル名に含まれる ASCII 以外の文字を ASCII に変換するかどうか（例： `ñ` → `n`）。



### `errorTemplatePrefix`

許可される型 :
:   [string](http://php.net/language.types.string)

デフォルト値 :
:   `''`

定義元 :
:   [GeneralConfig::$errorTemplatePrefix](craft3:craft\config\GeneralConfig::$errorTemplatePrefix)



::: tip
ターミナルで `php craft utils/ascii-filenames` を実行することによって、既存のすべてのアセットに ASCII ファイル名を適用できます。
:::

あまりに多くのログイン試行の失敗によりアカウントがロックされた後、ユーザーが再試行するために待たなければならない時間。



### `extraAllowedFileExtensions`

許可される型 : :
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値 :
:   `null`

定義元 :
:   [GeneralConfig::$extraAllowedFileExtensions](craft3:craft\config\GeneralConfig::$extraAllowedFileExtensions)



にマージされるファイル拡張子のリスト。 <config3:allowedFileExtensions> コンフィグ設定



### `extraAppLocales`

許可される型 : :
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値 :
:   `null`

定義元 :
:   [GeneralConfig::$extraAppLocales](craft3:craft\config\GeneralConfig::$extraAppLocales)

それ以降
:   3.0.24



サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。

コントロールパネルページの `<head>` に含めるべき追加の HTML タグのリスト。



### `handleCasing`

許可される型
:   

デフォルト値
:   `self::CAMEL_CASE`

定義元
:   [craft3:craft\config\GeneralConfig::$siteUrl](craft3:craft\config\GeneralConfig::$handleCasing)

それ以降
:   3.6.0



それぞれのタグは、タグ名とその属性を配列として指定できます。

- セクションやカテゴリグループのテンプレート設定は非表示になります。
- テンプレートルート管理は非表示になります。
- フロントエンドのルーティングは、エレメントやテンプレートリクエストのチェックをスキップします。



### `headlessMode`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$headlessMode](craft3:craft\config\GeneralConfig::$headlessMode)

それ以降
:   3.3.0



例えば、コントロールパネルに次のようなカスタムファビコン（など）を加えることができます。

現在のリクエストをフロントエンドのウェブサイトではなくコントロールパネルにルーティングするかどうかを決定するとき、Craft が探す URI セグメント。

- Template settings for sections and category groups will be hidden.
- 公開テンプレートのルーティングを無効化するには、空の値をセットしてください。
- Front-end routing will skip checks for element and template requests.
- フロントエンドのレスポンスは、デフォルトで HTML ではなく JSON 形式になります。
- Twig は、フロントエンドのデフォルトで HTML ではなく JavaScript / JSON のための安全ではない文字列をエスケープするよう設定されます。
- 、 <config3:loginPath>, <config3:logoutPath>, <config3:setPasswordPath>、および、 <config3:verifyEmailPath> 設定は無視されます。

::: tip
ヘッドレスモードを有効にした場合、「コントロールパネルへのアクセス」権限を持たないユーザーは初期バスワードの設定、新しいパスワードの設定、または、メールアドレスの確認ができなくなります。 コントロールパネルにログインできるはずのコンテンツ編集者や管理者には、この権限を確実に付与してください。 ::: You’ll also need to set the <config3:baseCpUrl> config setting if the control panel is located on a different domain than your front end.
:::



### `httpProxy`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$phpMaxMemoryLimit](craft3:craft\config\GeneralConfig::$httpProxy)

Since
:   3.7.0



The proxy server that should be used for outgoing HTTP requests.

This can be set to a URL (`http://localhost`) or a URL plus a port (`http://localhost:8125`).



### `indexTemplateFilenames`

許可される型
:   [string](http://php.net/language.types.string)[]

デフォルト値
:   `['index']`

定義元
:   [GeneralConfig::$indexTemplateFilenames](craft3:craft\config\GeneralConfig::$indexTemplateFilenames)



The template filenames Craft will look for within a directory to represent the directory’s “index” template when matching a template path to a file on the front end.



### `ipHeaders`

許可される型
:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$ipHeaders](craft3:craft\config\GeneralConfig::$ipHeaders)



List of headers where proxies store the real client IP.

See [yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) for more details.

If not set, the default [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) value will be used.



### `isSystemLive`

許可される型
:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$isSystemLive](craft3:craft\config\GeneralConfig::$isSystemLive)



Whether the site is currently live. If set to `true` or `false`, it will take precedence over the System Status setting in Settings → General.



### `limitAutoSlugsToAscii`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$limitAutoSlugsToAscii](craft3:craft\config\GeneralConfig::$limitAutoSlugsToAscii)



Whether non-ASCII characters in auto-generated slugs should be converted to ASCII (i.e. ñ → n).

::: tip
This only affects the JavaScript auto-generated slugs. Non-ASCII characters can still be used in slugs if entered manually.
:::



### `maxBackups`

許可される型
:   [integer](http://php.net/language.types.integer), [false](http://php.net/language.types.boolean)

デフォルト値
:   `20`

定義元
:   [GeneralConfig::$maxBackups](craft3:craft\config\GeneralConfig::$maxBackups)



The number of backups Craft should make before it starts deleting the oldest backups. If set to `false`, Craft will not delete any backups.



### `maxRevisions`

許可される型
:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値
:   `50`

定義元
:   [GeneralConfig::$maxRevisions](craft3:craft\config\GeneralConfig::$maxRevisions)

Since
:   3.2.0



The maximum number of revisions that should be stored for each element.

Set to `0` if you want to store an unlimited number of revisions.



### `maxSlugIncrement`

許可される型
:   [integer](http://php.net/language.types.integer)

デフォルト値
:   `100`

定義元
:   [GeneralConfig::$maxSlugIncrement](craft3:craft\config\GeneralConfig::$maxSlugIncrement)



The highest number Craft will tack onto a slug in order to make it unique before giving up and throwing an error.




### `permissionsPolicyHeader`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `'interest-cohort=()'`

定義元
:   [GeneralConfig::$pathParam](craft3:craft\config\GeneralConfig::$permissionsPolicyHeader)


The `Permissions-Policy` header that should be sent for web responses.

The default value prevents FLoC tracking due to security & privacy concerns:
- <https://www.theverge.com/2021/4/16/22387492/google-floc-ad-tech-privacy-browsers-brave-vivaldi-edge-mozilla-chrome-safari>
- <https://www.bleepingcomputer.com/news/security/wordpress-may-automatically-disable-google-floc-on-websites/>

This can be set to `null` to prevent the header from being sent.


### `phpMaxMemoryLimit`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$phpMaxMemoryLimit](craft3:craft\config\GeneralConfig::$phpMaxMemoryLimit)



The maximum amount of memory Craft will try to reserve during memory-intensive operations such as zipping, unzipping and updating. Defaults to an empty string, which means it will use as much memory as it can.

See <http://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> for a list of acceptable values.



### `privateTemplateTrigger`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'_'`

定義元
:   [GeneralConfig::$privateTemplateTrigger](craft3:craft\config\GeneralConfig::$privateTemplateTrigger)



The template path segment prefix that should be used to identify “private” templates, which are templates that are not directly accessible via a matching URL.

Set to an empty value to disable public template routing.



### `previewIframeResizerOptions`

許可される型
:   [array](http://php.net/language.types.array)

デフォルト値
:   `[]`

定義元
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

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$runQueueAutomatically](craft3:craft\config\GeneralConfig::$runQueueAutomatically)



Whether Craft should run pending queue jobs automatically when someone visits the control panel.

If disabled, an alternate queue worker *must* be set up separately, either as an [always-running daemon](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md), or a cron job that runs the `queue/run` command every minute:

```cron
* * * * * /path/to/project/craft queue/run
```

::: tip
This setting should be disabled for servers running Win32, or with Apache’s mod_deflate/mod_gzip installed, where PHP’s [flush()](http://php.net/manual/en/function.flush.php) method won’t work.
:::



### `sameSiteCookieValue`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$sameSiteCookieValue](craft3:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:   3.1.33



The [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) value that should be set on Craft cookies, if any.

This can be set to `'None'`, `'Lax'`, `'Strict'`, or `null`.

::: tip
This setting requires PHP 7.3 or later.
:::



### `sendPoweredByHeader`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$sendPoweredByHeader](craft3:craft\config\GeneralConfig::$sendPoweredByHeader)



Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and [Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.



### `slugWordSeparator`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'-'`

定義元
:   [GeneralConfig::$slugWordSeparator](craft3:craft\config\GeneralConfig::$slugWordSeparator)



The character(s) that should be used to separate words in slugs.



### `testToEmailAddress`

許可される型
:   [string](http://php.net/language.types.string), [array](http://php.net/language.types.array), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$testToEmailAddress](craft3:craft\config\GeneralConfig::$testToEmailAddress)



Configures Craft to send all system emails to either a single email address or an array of email addresses for testing purposes.

By default, the recipient name(s) will be “Test Recipient”, but you can customize that by setting the value with the format `['email@address.com' => 'Name']`.



### `timezone`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$timezone](craft3:craft\config\GeneralConfig::$timezone)



The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.

This can be set to one of PHP’s [supported timezones](http://php.net/manual/en/timezones.php).



### `translationDebugOutput`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$translationDebugOutput](craft3:craft\config\GeneralConfig::$translationDebugOutput)



Whether translated messages should be wrapped in special characters to help find any strings that are not being run through `Craft::t()` or the `|translate` filter.



### `useEmailAsUsername`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$useEmailAsUsername](craft3:craft\config\GeneralConfig::$useEmailAsUsername)



Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.

If you enable this setting after user accounts already exist, run this terminal command to update existing usernames:

```bash
php craft utils/update-usernames
```



### `useIframeResizer`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$useIframeResizer](craft3:craft\config\GeneralConfig::$useIframeResizer)

Since
:   3.5.5



Whether [iFrame Resizer options](http://davidjbradshaw.github.io/iframe-resizer/#options) should be used for Live Preview.

Using iFrame Resizer makes it possible for Craft to retain the preview’s scroll position between page loads, for cross-origin web pages.

It works by setting the height of the iframe to match the height of the inner web page, and the iframe’s container will be scrolled rather than the iframe document itself. This can lead to some unexpected CSS issues, however, because the previewed viewport height will be taller than the visible portion of the iframe.

If you have a [decoupled front-end](https://craftcms.com/docs/3.x/entries.html#previewing-decoupled-front-ends), you will need to include [iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js) on your page as well for this to work. You can conditionally include it for only Live Preview requests by checking if the requested URL contains a `x-craft-live-preview` query string parameter.

::: tip
You can customize the behavior of iFrame Resizer via the <config3:previewIframeResizerOptions> config setting.
:::



### `useFileLocks`

許可される型
:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$useFileLocks](craft3:craft\config\GeneralConfig::$useFileLocks)



Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.

Some file systems, such as NFS, do not support exclusive file locking.

If not set to `true` or `false`, Craft will try to detect if the underlying file system supports exclusive file locking and cache the results.



## Environment

### `aliases`

許可される型
:   [array](http://php.net/language.types.array)

デフォルト値
:   `[]`

定義元
:   [GeneralConfig::$aliases](craft3:craft\config\GeneralConfig::$aliases)



Any custom Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases) that should be defined for every request.



### `backupCommand`

許可される型
:   [string](http://php.net/language.types.string), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$backupCommand](craft3:craft\config\GeneralConfig::$backupCommand)



The shell command that Craft should execute to create a database backup.

When set to `null` (default), Craft will run `mysqldump` or `pg_dump`, provided that those libraries are in the `$PATH` variable for the system user running the web server.

You may provide your own command optionally using several tokens Craft will swap out at runtime:

- `{path}` - バックアップファイルのパス
- `{port}` - 現在のデータベースポート
- `{server}` - 現在のデータベースホスト名e
- `{user}` - データベースに接続するユーザー
- `{database}` - 現在のデータベース名
- `{schema}` - （もしある場合）現在のデータベーススキーマ

This can also be set to `false` to disable database backups completely.



### `defaultCookieDomain`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$defaultCookieDomain](craft3:craft\config\GeneralConfig::$defaultCookieDomain)



The domain that cookies generated by Craft should be created for. If blank, it will be left up to the browser to determine which domain to use (almost always the current). If you want the cookies to work for all subdomains, for example, you could set this to `'.domain.com'`.



### `resourceBasePath`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'@webroot/cpresources'`

定義元
:   [GeneralConfig::$resourceBasePath](craft3:craft\config\GeneralConfig::$resourceBasePath)



The path to the root directory that should store published control panel resources.



### `resourceBaseUrl`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'@web/cpresources'`

定義元
:   [GeneralConfig::$resourceBaseUrl](craft3:craft\config\GeneralConfig::$resourceBaseUrl)



The URL to the root directory that should store published control panel resources.



### `restoreCommand`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$restoreCommand](craft3:craft\config\GeneralConfig::$restoreCommand)



The shell command Craft should execute to restore a database backup.

By default Craft will run `mysql` or `psql`, provided those libraries are in the `$PATH` variable for the user the web server is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - the backup file path
- `{database}` - 現在のデータベース名
- `{server}` - 現在のデータベースホスト名e
- `{user}` - データベースに接続するユーザー
- `{schema}` - （もしある場合）現在のデータベーススキーマ
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database restores completely.



## Routing

### `actionTrigger`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'actions'`

定義元
:   [GeneralConfig::$actionTrigger](craft3:craft\config\GeneralConfig::$actionTrigger)



The URI segment Craft should look for when determining if the current request should be routed to a controller action.



### `activateAccountSuccessPath`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$activateAccountSuccessPath](craft3:craft\config\GeneralConfig::$activateAccountSuccessPath)



The URI that users without access to the control panel should be redirected to after activating their account.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `addTrailingSlashesToUrls`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$addTrailingSlashesToUrls](craft3:craft\config\GeneralConfig::$addTrailingSlashesToUrls)



Whether auto-generated URLs should have trailing slashes.



### `allowUppercaseInSlug`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$allowUppercaseInSlug](craft3:craft\config\GeneralConfig::$allowUppercaseInSlug)



Whether uppercase letters should be allowed in slugs.



### `baseCpUrl`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$baseCpUrl](craft3:craft\config\GeneralConfig::$baseCpUrl)



The base URL Craft should use when generating control panel URLs.

It will be determined automatically if left blank.

::: tip
The base control panel URL should **not** include the [control panel trigger word](config3:cpTrigger) (e.g. `/admin`).
:::



### `cpTrigger`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `'admin'`

定義元
:   [GeneralConfig::$cpTrigger](craft3:craft\config\GeneralConfig::$cpTrigger)



The URI segment Craft should look for when determining if the current request should route to the control panel rather than the front-end website.

This can be set to `null` if you have a dedicated host name for the control panel (e.g. `cms.example.com`), or you are running Craft in [Headless Mode](config3:headlessMode). If you do that, you will need to ensure that the control panel is being served from its own webroot directory on your server, with an `index.php` file that defines the `CRAFT_CP` PHP constant.

```php
define('CRAFT_CP', true);
```

Alternatively, you can set the <config3:baseCpUrl> config setting, but then you will run the risk of losing access to portions of your control panel due to URI conflicts with actual folders/files in your main webroot.

(For example, if you have an `assets/` folder, that would conflict with the `/assets` page in the control panel.)



### `invalidUserTokenPath`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$invalidUserTokenPath](craft3:craft\config\GeneralConfig::$invalidUserTokenPath)



The URI Craft should redirect to when user token validation fails. A token is used on things like setting and resetting user account passwords. Note that this only affects front-end site requests.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `loginPath`

許可される型
:   `mixed`

デフォルト値
:   `'login'`

定義元
:   [GeneralConfig::$loginPath](craft3:craft\config\GeneralConfig::$loginPath)



The URI Craft should use for user login on the front end.

This can be set to `false` to disable front-end login.

Note that this config setting is ignored when <config3:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `logoutPath`

許可される型
:   `mixed`

デフォルト値
:   `'logout'`

定義元
:   [GeneralConfig::$logoutPath](craft3:craft\config\GeneralConfig::$logoutPath)



The URI Craft should use for user logout on the front end.

This can be set to `false` to disable front-end logout.

Note that this config setting is ignored when <config3:headlessMode> is enabled.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `omitScriptNameInUrls`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$omitScriptNameInUrls](craft3:craft\config\GeneralConfig::$omitScriptNameInUrls)



Whether generated URLs should omit `index.php` (e.g. `http://domain.com/path` instead of `http://domain.com/index.php/path`)

This can only be possible if your server is configured to redirect would-be 404's to `index.php`, for example, with the redirect found in the `.htaccess` file that came with Craft:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```



### `pageTrigger`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'p'`

定義元
:   [GeneralConfig::$pageTrigger](craft3:craft\config\GeneralConfig::$pageTrigger)



The string preceding a number which Craft will look for when determining if the current request is for a particular page in a paginated list of pages.

| サンプル値   | サンプル URI       |
| ------- | -------------- |
| `p`     | `/news/p5`     |
| `page`  | `/news/page5`  |
| `page/` | `/news/page/5` |
| `?page` | `/news?page=5` |

::: tip
If you want to set this to `?p` (e.g. `/news?p=5`), you’ll also need to change your <config3:pathParam> setting which defaults to `p`. If your server is running Apache, you’ll need to update the redirect code in your `.htaccess` file to match your new `pathParam` value.
:::


### `pathParam`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `'p'`

定義元
:   [GeneralConfig::$pathParam](craft3:craft\config\GeneralConfig::$pathParam)



The query string param that Craft will check when determining the request’s path.

This can be set to `null` if your web server is capable of directing traffic to `index.php` without a query string param. If you’re using Apache, that means you’ll need to change the `RewriteRule` line in your `.htaccess` file to:

```
RewriteRule (.+) index.php [QSA,L]
```

### `postCpLoginRedirect`

許可される型
:   `mixed`

デフォルト値
:   `'dashboard'`

定義元
:   [GeneralConfig::$postCpLoginRedirect](craft3:craft\config\GeneralConfig::$postCpLoginRedirect)



The path users should be redirected to after logging into the control panel.

This setting will also come into effect if a user visits the control panel’s login page (`/admin/login`) or the control panel’s root URL (`/admin`) when they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLoginRedirect`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$postLoginRedirect](craft3:craft\config\GeneralConfig::$postLoginRedirect)



The path users should be redirected to after logging in from the front-end site.

This setting will also come into effect if the user visits the login page (as specified by the <config3:loginPath> config setting) when they are already logged in.

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `postLogoutRedirect`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$postLogoutRedirect](craft3:craft\config\GeneralConfig::$postLogoutRedirect)



The path that users should be redirected to after logging out from the front-end site.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `setPasswordPath`

許可される型
:   `mixed`

デフォルト値
:   `'setpassword'`

定義元
:   [GeneralConfig::$setPasswordPath](craft3:craft\config\GeneralConfig::$setPasswordPath)



The URI or URL that Craft should use for Set Password forms on the front end.

Note that this config setting is ignored when <config3:headlessMode> is enabled, unless it’s set to an absolute URL.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: tip
You might also want to set <config3:invalidUserTokenPath> in case a user clicks on an expired password reset link.
:::



### `setPasswordRequestPath`

許可される型
:   `mixed`

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$setPasswordRequestPath](craft3:craft\config\GeneralConfig::$setPasswordRequestPath)

Since
:   3.5.14



The URI to the page where users can request to change their password.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

If this is set, Craft will redirect [.well-known/change-password requests](https://w3c.github.io/webappsec-change-password-url/) to this URI.

::: tip
You’ll also need to set [setPasswordPath](config3:setPasswordPath), which determines the URI and template path for the Set Password form where the user resets their password after following the link in the Password Reset email.
:::



### `setPasswordSuccessPath`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$setPasswordSuccessPath](craft3:craft\config\GeneralConfig::$setPasswordSuccessPath)



The URI Craft should redirect users to after setting their password from the front end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `siteToken`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'siteToken'`

定義元
:   [GeneralConfig::$siteToken](craft3:craft\config\GeneralConfig::$siteToken)

Since
:   3.5.0



The query string parameter name that site tokens should be set to.



### `tokenParam`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'token'`

定義元
:   [GeneralConfig::$tokenParam](craft3:craft\config\GeneralConfig::$tokenParam)



The query string parameter name that Craft tokens should be set to.



### `usePathInfo`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$usePathInfo](craft3:craft\config\GeneralConfig::$usePathInfo)



Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.

Note that this setting only takes effect if <config3:omitScriptNameInUrls> is set to `false`.



### `useSslOnTokenizedUrls`

許可される型
:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

デフォルト値
:   `'auto'`

定義元
:   [GeneralConfig::$useSslOnTokenizedUrls](craft3:craft\config\GeneralConfig::$useSslOnTokenizedUrls)



Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the current site’s base URL and the protocol of the current request and if either of them are https will use `https` in the tokenized URL. If not, will use `http`.

If set to `false`, Craft will always use `http`. If set to `true`, then, Craft will always use `https`.



### `verifyEmailPath`

許可される型
:   `mixed`

デフォルト値
:   `'verifyemail'`

定義元
:   [GeneralConfig::$verifyEmailPath](craft3:craft\config\GeneralConfig::$verifyEmailPath)

それ以降
:   3.4.0



The URI or URL that Craft should use for email verification links on the front end.

Note that this config setting is ignored when <config3:headlessMode> is enabled, unless it’s set to an absolute URL.

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `verifyEmailSuccessPath`

許可される型
:   `mixed`

デフォルト値
:   `''`

定義元
:   [GeneralConfig::$verifyEmailSuccessPath](craft3:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:   3.1.20



The URI that users without access to the control panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



## Session

### `phpSessionName`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'CraftSessionId'`

定義元
:   [GeneralConfig::$phpSessionName](craft3:craft\config\GeneralConfig::$phpSessionName)



The name of the PHP session cookie.



### `rememberUsernameDuration`

許可される型
:   `mixed`

デフォルト値
:   `31536000` (1 year)

定義元
:   [GeneralConfig::$rememberUsernameDuration](craft3:craft\config\GeneralConfig::$rememberUsernameDuration)



The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.

Set to `0` to disable this feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberedUserSessionDuration`

許可される型
:   `mixed`

デフォルト値
:   `1209600` (14 days)

定義元
:   [GeneralConfig::$rememberedUserSessionDuration](craft3:craft\config\GeneralConfig::$rememberedUserSessionDuration)



The amount of time a user stays logged if “Remember Me” is checked on the login page.

Set to `0` to disable the “Remember Me” feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `requireMatchingUserAgentForSession`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$requireMatchingUserAgentForSession](craft3:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)



Whether Craft should require a matching user agent string when restoring a user session from a cookie.



### `requireUserAgentAndIpForSession`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$requireUserAgentAndIpForSession](craft3:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)



Whether Craft should require the existence of a user agent string and IP address when creating a new user session.



### `userSessionDuration`

許可される型
:   `mixed`

デフォルト値
:   `3600` (1 hour)

定義元
:   [GeneralConfig::$userSessionDuration](craft3:craft\config\GeneralConfig::$userSessionDuration)



The amount of time before a user will get logged out due to inactivity.

Set to `0` if you want users to stay logged in as long as their browser is open rather than a predetermined amount of time.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



## Security

### `blowfishHashCost`

許可される型
:   [integer](http://php.net/language.types.integer)

デフォルト値
:   `13`

定義元
:   [GeneralConfig::$blowfishHashCost](craft3:craft\config\GeneralConfig::$blowfishHashCost)



The higher the cost value, the longer it takes to generate a password hash and to verify against it.

Therefore, higher cost slows down a brute-force attack.

For best protection against brute force attacks, set it to the highest value that is tolerable on production servers.

The time taken to compute the hash doubles for every increment by one for this value.

For example, if the hash takes 1 second to compute when the value is 14 then the compute time varies as 2^(value - 14) seconds.



### `cooldownDuration`

許可される型
:   `mixed`

デフォルト値
:   `300` (5 minutes)

定義元
:   [GeneralConfig::$cooldownDuration](craft3:craft\config\GeneralConfig::$cooldownDuration)



The amount of time a user must wait before re-attempting to log in after their account is locked due to too many failed login attempts.

Set to `0` to keep the account locked indefinitely, requiring an admin to manually unlock the account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `csrfTokenName`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `'CRAFT_CSRF_TOKEN'`

定義元
:   [GeneralConfig::$csrfTokenName](craft3:craft\config\GeneralConfig::$csrfTokenName)



The name of CSRF token used for CSRF validation if <config3:enableCsrfProtection> is set to `true`.



### `defaultTokenDuration`

許可される型
:   `mixed`

デフォルト値
:   `86400` (1 day)

定義元
:   [GeneralConfig::$defaultTokenDuration](craft3:craft\config\GeneralConfig::$defaultTokenDuration)



The default amount of time tokens can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `deferPublicRegistrationPassword`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$deferPublicRegistrationPassword](craft3:craft\config\GeneralConfig::$deferPublicRegistrationPassword)



By default, Craft will require a ‘password’ field to be submitted on front-end, public user registrations. Setting this to `true` will no longer require it on the initial registration form.

If you have email verification enabled, new users will set their password once they’ve clicked on the verification link in the email. If you don’t, the only way they can set their password is to go through your “forgot password” workflow.



### `enableBasicHttpAuth`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$enableBasicHttpAuth](craft3:craft\config\GeneralConfig::$enableBasicHttpAuth)

Since
:   3.5.0



Whether front-end web requests should support basic HTTP authentication.



### `enableCsrfCookie`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$enableCsrfCookie](craft3:craft\config\GeneralConfig::$enableCsrfCookie)



Whether to use a cookie to persist the CSRF token if <config3:enableCsrfProtection> is enabled. If false, the CSRF token will be stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security, it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.



### `elevatedSessionDuration`

許可される型
:   `mixed`

デフォルト値
:   `300` (5 minutes)

定義元
:   [GeneralConfig::$elevatedSessionDuration](craft3:craft\config\GeneralConfig::$elevatedSessionDuration)



The amount of time a user’s elevated session will last, which is required for some sensitive actions (e.g. user group/permission assignment).

Set to `0` to disable elevated session support.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `enableCsrfProtection`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$enableCsrfProtection](craft3:craft\config\GeneralConfig::$enableCsrfProtection)



Whether to enable CSRF protection via hidden form inputs for all forms submitted via Craft.



### `invalidLoginWindowDuration`

許可される型
:   `mixed`

デフォルト値
:   `3600` (5 minutes)

定義元
:   [GeneralConfig::$invalidLoginWindowDuration](craft3:craft\config\GeneralConfig::$invalidLoginWindowDuration)



The amount of time to track invalid login attempts for a user, for determining if Craft should lock an account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `maxInvalidLogins`

許可される型
:   [integer](http://php.net/language.types.integer)

デフォルト値
:   `5`

定義元
:   [GeneralConfig::$maxInvalidLogins](craft3:craft\config\GeneralConfig::$maxInvalidLogins)



The number of invalid login attempts Craft will allow within the specified duration before the account gets locked.



### `preventUserEnumeration`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$preventUserEnumeration](craft3:craft\config\GeneralConfig::$preventUserEnumeration)



When `true`, Craft will always return a successful response in the “forgot password” flow, making it difficult to enumerate users.

When set to `false` and you go through the “forgot password” flow from the control panel login page, you’ll get distinct messages indicating whether the username/email exists and whether an email was sent with further instructions. This can be helpful for the user attempting to log in but allow for username/email enumeration based on the response.





### `previewTokenDuration`

許可される型
:   `mixed`

デフォルト値
:   `86400` (1 day)

定義元
:   [GeneralConfig::$previewTokenDuration](craft3:craft\config\GeneralConfig::$previewTokenDuration)

Since
:   3.7.0

The amount of time content preview tokens can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.





### `sanitizeCpImageUploads`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$sanitizeCpImageUploads](craft3:craft\config\GeneralConfig::$sanitizeCpImageUploads)

Since
:   3.6.0



Whether images uploaded via the control panel should be sanitized.



### `sanitizeSvgUploads`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$sanitizeSvgUploads](craft3:craft\config\GeneralConfig::$sanitizeSvgUploads)



Whether Craft should sanitize uploaded SVG files and strip out potential malicious-looking content.

This should definitely be enabled if you are accepting SVG uploads from untrusted sources.



### `securityKey`

許可される型
:   [string](http://php.net/language.types.string)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$securityKey](craft3:craft\config\GeneralConfig::$securityKey)



A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](craft3:craft\services\Security).

This value should be the same across all environments. If this key ever changes, any data that was encrypted with it will be inaccessible.



### `secureHeaders`

許可される型
:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$secureHeaders](craft3:craft\config\GeneralConfig::$secureHeaders)



Lists of headers that are, by default, subject to the trusted host configuration.

See [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) value will be used.



### `secureProtocolHeaders`

許可される型
:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$secureProtocolHeaders](craft3:craft\config\GeneralConfig::$secureProtocolHeaders)



List of headers to check for determining whether the connection is made via HTTPS.

See [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) value will be used.



### `storeUserIps`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$storeUserIps](craft3:craft\config\GeneralConfig::$storeUserIps)

Since
:   3.1.0



Whether user IP addresses should be stored/logged by the system.



### `trustedHosts`

許可される型
:   [array](http://php.net/language.types.array)

デフォルト値
:   `['any']`

定義元
:   [GeneralConfig::$trustedHosts](craft3:craft\config\GeneralConfig::$trustedHosts)



The configuration for trusted security-related headers.

See [yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) for more details.

By default, all hosts are trusted.



### `useSecureCookies`

許可される型
:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

デフォルト値
:   `'auto'`

定義元
:   [GeneralConfig::$useSecureCookies](craft3:craft\config\GeneralConfig::$useSecureCookies)



Whether Craft will set the “secure” flag when saving cookies when using `Craft::cookieConfig()` to create a cookie.

Valid values are `true`, `false`, and `'auto'`. Defaults to `'auto'`, which will set the secure flag if the page you’re currently accessing is over `https://`. `true` will always set the flag, regardless of protocol and `false` will never automatically set the flag.



### `verificationCodeDuration`

許可される型
:   `mixed`

デフォルト値
:   `86400` (1 day)

定義元
:   [GeneralConfig::$verificationCodeDuration](craft3:craft\config\GeneralConfig::$verificationCodeDuration)



The amount of time a user verification code can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



## Assets

### `allowedFileExtensions`

許可される型
:   [string](http://php.net/language.types.string)[]

デフォルト値
:   `['7z', 'aiff', 'asc', 'asf', 'avi', 'bmp', 'cap', 'cin', 'csv', 'dfxp', 'doc', 'docx', 'dotm', 'dotx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'itt', 'jp2', 'jpeg', 'jpg', 'jpx', 'js', 'json', 'lrc', 'm2t', 'm4a', 'm4v', 'mcc', 'mid', 'mov', 'mp3', 'mp4', 'mpc', 'mpeg', 'mpg', 'mpsub', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'ppz', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rt', 'rtf', 'sami', 'sbv', 'scc', 'sdc', 'sitd', 'smi', 'srt', 'stl', 'sub', 'svg', 'swf', 'sxc', 'sxw', 'tar', 'tds', 'tgz', 'tif', 'tiff', 'ttml', 'txt', 'vob', 'vsd', 'vtt', 'wav', 'webm', 'webp', 'wma', 'wmv', 'xls', 'xlsx', 'xml', 'zip']`

定義元
:   [GeneralConfig::$allowedFileExtensions](craft3:craft\config\GeneralConfig::$allowedFileExtensions)



The file extensions Craft should allow when a user is uploading files.



### `convertFilenamesToAscii`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$convertFilenamesToAscii](craft3:craft\config\GeneralConfig::$convertFilenamesToAscii)



Whether uploaded filenames with non-ASCII characters should be converted to ASCII (i.e. `ñ` → `n`).

::: tip
You can run `php craft utils/ascii-filenames` in your terminal to apply ASCII filenames to all existing assets.
:::



### `extraFileKinds`

許可される型
:   [array](http://php.net/language.types.array)

デフォルト値
:   `[]`

定義元
:   [GeneralConfig::$extraFileKinds](craft3:craft\config\GeneralConfig::$extraFileKinds)

Since
:   3.0.37



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

許可される型
:   [string](http://php.net/language.types.string), [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `'-'`

定義元
:   [GeneralConfig::$filenameWordSeparator](craft3:craft\config\GeneralConfig::$filenameWordSeparator)



The string to use to separate words when uploading Assets. If set to `false`, spaces will be left alone.



### `maxUploadFileSize`

許可される型
:   [integer](http://php.net/language.types.integer), [string](http://php.net/language.types.string)

デフォルト値
:   `16777216` (16MB)

定義元
:   [GeneralConfig::$maxUploadFileSize](craft3:craft\config\GeneralConfig::$maxUploadFileSize)



The maximum upload file size allowed.

See [craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) for a list of supported value types.




### `revAssetUrls`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$revAssetUrls](craft3:craft\config\GeneralConfig::$revAssetUrls)

Since:
:   3.7.0



Whether asset URLs should be revved so browsers don’t load cached versions when they’re modified.



## Image Handling

### `brokenImagePath`

許可される型
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:   `null`

定義元
:   [GeneralConfig::$brokenImagePath](craft3:craft\config\GeneralConfig::$brokenImagePath)

Since
:   3.5.0



The server path to an image file that should be sent when responding to an image request with a 404 status code.

This can be set to an aliased path such as `@webroot/assets/404.svg`.



### `defaultImageQuality`

許可される型
:   [integer](http://php.net/language.types.integer)

デフォルト値
:   `82`

定義元
:   [GeneralConfig::$defaultImageQuality](craft3:craft\config\GeneralConfig::$defaultImageQuality)



The quality level Craft will use when saving JPG and PNG files. Ranges from 1 (worst quality, smallest file) to 100 (best quality, biggest file).



### `generateTransformsBeforePageLoad`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$generateTransformsBeforePageLoad](craft3:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)



Whether image transforms should be generated before page load.



### `imageDriver`

許可される型
:   `mixed`

デフォルト値
:   `self::IMAGE_DRIVER_AUTO`

定義元
:   [GeneralConfig::$imageDriver](craft3:craft\config\GeneralConfig::$imageDriver)



The image driver Craft should use to cleanse and transform images. By default Craft will use ImageMagick if it’s installed and otherwise fall back to GD. You can explicitly set either `'imagick'` or `'gd'` here to override that behavior.



### `imageEditorRatios`

許可される型
:   [array](http://php.net/language.types.array)

デフォルト値
:   `['Unconstrained' => 'none', 'Original' => 'original', 'Square' => 1, '16:9' => 1.78, '10:8' => 1.25, '7:5' => 1.4, '4:3' => 1.33, '5:3' => 1.67, '3:2' => 1.5]`

定義元
:   [GeneralConfig::$imageEditorRatios](craft3:craft\config\GeneralConfig::$imageEditorRatios)



An array containing the selectable image aspect ratios for the image editor. The array must be in the format of `label` => `ratio`, where ratio must be a float or a string. For string values, only values of “none” and “original” are allowed.



### `maxCachedCloudImageSize`

許可される型
:   [integer](http://php.net/language.types.integer)

デフォルト値
:   `2000`

定義元
:   [GeneralConfig::$maxCachedCloudImageSize](craft3:craft\config\GeneralConfig::$maxCachedCloudImageSize)



The maximum dimension size to use when caching images from external sources to use in transforms. Set to `0` to never cache them.



### `optimizeImageFilesize`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$optimizeImageFilesize](craft3:craft\config\GeneralConfig::$optimizeImageFilesize)



Whether Craft should optimize images for reduced file sizes without noticeably reducing image quality. (Only supported when ImageMagick is used.)



### `preserveCmykColorspace`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$preserveCmykColorspace](craft3:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:   3.0.8



Whether CMYK should be preserved as the colorspace when manipulating images.

Setting this to `true` will prevent Craft from transforming CMYK images to sRGB, but on some ImageMagick versions it can cause image color distortion. This will only have an effect if ImageMagick is in use.



### `preserveExifData`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$preserveExifData](craft3:craft\config\GeneralConfig::$preserveExifData)



Whether the EXIF data should be preserved when manipulating and uploading images.

Setting this to `true` will result in larger image file sizes.

This will only have effect if ImageMagick is in use.



### `preserveImageColorProfiles`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$preserveImageColorProfiles](craft3:craft\config\GeneralConfig::$preserveImageColorProfiles)



Whether the embedded Image Color Profile (ICC) should be preserved when manipulating images.

Setting this to `false` will reduce the image size a little bit, but on some ImageMagick versions can cause images to be saved with an incorrect gamma value, which causes the images to become very dark. This will only have effect if ImageMagick is in use.



### `rasterizeSvgThumbs`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `false`

定義元
:   [GeneralConfig::$rasterizeSvgThumbs](craft3:craft\config\GeneralConfig::$rasterizeSvgThumbs)

それ以降
:   3.6.0



Whether SVG thumbnails should be rasterized.

Note this will only work if ImageMagick is installed, and <config3:imageDriver> is set to either `auto` or `imagick`.



### `rotateImagesOnUploadByExifData`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$rotateImagesOnUploadByExifData](craft3:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)



Whether Craft should rotate images according to their EXIF data on upload.



### `transformGifs`

許可される型
:   [boolean](http://php.net/language.types.boolean)

デフォルト値
:   `true`

定義元
:   [GeneralConfig::$transformGifs](craft3:craft\config\GeneralConfig::$transformGifs)

それ以降
:   3.0.7



Whether GIF files should be cleansed/transformed.



### `upscaleImages`

許可される型
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

定義元
:   [GeneralConfig::$upscaleImages](craft3:craft\config\GeneralConfig::$upscaleImages)

それ以降
:   3.4.0



Whether images should be upscaled if the provided transform size is larger than the image.



## GraphQL API を有効にするかどうか。

### `allowedGraphqlOrigins`

Allowed types
:   [string](http://php.net/language.types.string)[], [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [GeneralConfig::$allowedGraphqlOrigins](craft3:craft\config\GeneralConfig::$allowedGraphqlOrigins)

それ以降
:   3.5.0



The Ajax origins that should be allowed to access the GraphQL API, if enabled.

If this is set to an array, then `graphql/api` requests will only include the current request’s [origin](https://www.yiiframework.com/doc/api/2.0/yii-web-request#getOrigin()-detail) in the `Access-Control-Allow-Origin` response header if it’s listed here.

If this is set to `false`, then the `Access-Control-Allow-Origin` response header will never be sent.



### `disableGraphqlTransformDirective`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$disableGraphqlTransformDirective](craft3:craft\config\GeneralConfig::$disableGraphqlTransformDirective)

Since
:   3.6.0



Whether the `transform` directive should be disabled for the GraphQL API.



### `enableGraphqlIntrospection`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableGraphqlIntrospection](craft3:craft\config\GeneralConfig::$enableGraphqlIntrospection)

Since
:   3.6.0



Whether GraphQL introspection queries are allowed. Defaults to `true` and is always allowed in the CP.



### `enableGql`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [GeneralConfig::$enableGql](craft3:craft\config\GeneralConfig::$enableGql)

それ以降
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

それ以降
:   3.3.12



Whether Craft should cache GraphQL queries.

If set to `true`, Craft will cache the results for unique GraphQL queries per access token. The cache is automatically invalidated any time an element is saved, the site structure is updated, or a GraphQL schema is saved.

This setting will have no effect if a plugin is using the [craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) event to provide its own caching logic and setting the `result` property.



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
:   3.6.0



The maximum allowed complexity a GraphQL query is allowed to have. Set to `0` to allow any complexity.



### `maxGraphqlDepth`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `0`

Defined by
:   [GeneralConfig::$maxGraphqlDepth](craft3:craft\config\GeneralConfig::$maxGraphqlDepth)

それ以降
:   3.6.0



The maximum allowed depth a GraphQL query is allowed to reach. Set to `0` to allow any depth.



### `maxGraphqlResults`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `0`

Defined by
:   [GeneralConfig::$maxGraphqlResults](craft3:craft\config\GeneralConfig::$maxGraphqlResults)

Since
:   3.6.0



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


### `purgeUnsavedDraftsDuration`

Allowed types
:   `mixed`

Default value
:   `2592000` (30 days)

Defined by
:   [GeneralConfig::$purgeUnsavedDraftsDuration](craft3:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

Since
:   3.2.0

The amount of time to wait before Craft purges unpublished drafts that were never updated with content.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `setGraphqlDatesToSystemTimeZone`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [GeneralConfig::$setGraphqlDatesToSystemTimeZone](craft3:craft\config\GeneralConfig::$setGraphqlDatesToSystemTimeZone)

Since
:   3.7.0



Whether dates returned by the GraphQL API should be set to the system time zone by default, rather than UTC.



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
