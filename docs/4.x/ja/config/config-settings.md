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

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'actions'`

定義元

:   [GeneralConfig::$actionTrigger](craft3:craft\config\GeneralConfig::$actionTrigger)



現在のリクエストをコントローラーアクションにルーティングするかどうかを決定するとき、Craft が探す URI セグメント。



### `activateAccountSuccessPath`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$activateAccountSuccessPath](craft3:craft\config\GeneralConfig::$activateAccountSuccessPath)



コントロールパネルにアクセスできないユーザーが、アカウントをアクティベートしたときにリダイレクトする URI。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `addTrailingSlashesToUrls`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$addTrailingSlashesToUrls](craft3:craft\config\GeneralConfig::$addTrailingSlashesToUrls)



自動生成された URL にスラッシュをつけるかどうか。



### `aliases`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$aliases](craft3:craft\config\GeneralConfig::$aliases)



リクエストごとに定義される、カスタムの Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)。



### `allowAdminChanges`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$allowAdminChanges](craft3:craft\config\GeneralConfig::$allowAdminChanges)

それ以降

:   3.1.0



管理者によるシステムへの管理上の変更を許可するかどうか。

これを無効にすると、設定およびプラグインストアのセクションは非表示になり、Craft 本体のエディションとプラグインのバージョンがロックされ、プロジェクトコンフィグは読み取り専用になります。

そのため、デプロイ時に自動的に `composer install` を実行するデプロイワークフローがある production 環境のみ、この機能を無効にするべきです。

::: warning
**すべての**環境が Craft 3.1.0 以降にアップデートされるまで、この設定を無効にしないでください。
:::



### `allowSimilarTags`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$allowSimilarTags](craft3:craft\config\GeneralConfig::$allowSimilarTags)



ユーザーによる類似した名前のタグの作成を許可するかどうか。



### `allowUpdates`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$allowUpdates](craft3:craft\config\GeneralConfig::$allowUpdates)



コントロールパネルでのシステムとプラグインのアップデート、および、プラグインストアからのプラグインのインストールを Craft が許可するかどうか。

<config3:allowAdminChanges> が無効になっている場合、この設定は自動的に無効になります。



### `allowUppercaseInSlug`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$allowUppercaseInSlug](craft3:craft\config\GeneralConfig::$allowUppercaseInSlug)



スラグに大文字を使うことを許可するかどうか。



### `allowedFileExtensions`

許可される型

:   [string](http://php.net/language.types.string)[]

デフォルト値

:   `['7z', 'aiff', 'asf', 'avi', 'bmp', 'csv', 'doc', 'docx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'htm', 'html', 'jp2', 'jpeg', 'jpg', 'jpx', 'js', 'json', 'm2t', 'mid', 'mov', 'mp3', 'mp4', 'm4a', 'm4v', 'mpc', 'mpeg', 'mpg', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'ppz', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rtf', 'sdc', 'sitd', 'svg', 'swf', 'sxc', 'sxw', 'tar', 'tgz', 'tif', 'tiff', 'txt', 'vob', 'vsd', 'wav', 'webm', 'webp', 'wma', 'wmv', 'xls', 'xlsx', 'zip']`

定義元

:   [GeneralConfig::$allowedFileExtensions](craft3:craft\config\GeneralConfig::$allowedFileExtensions)



ユーザーがファイルをアップロードする際に、Craft が許可するファイル拡張子。



### `allowedGraphqlOrigins`

許可される型

:   [string](http://php.net/language.types.string)[], [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$allowedGraphqlOrigins](craft3:craft\config\GeneralConfig::$allowedGraphqlOrigins)

それ以降

:   3.5.0



有効な場合、GraphQL API へのアクセスが許可されるべき Ajax のオリジン。

ここに配列がセットされている場合、現在のリクエストの [origin](https://www.yiiframework.com/doc/api/2.0/yii-web-request#getOrigin()-detail) がリストされていれば、`graphql/api` リクエストは `Access-Control-Allow-Origin` レスポンスヘッダを含めます。

ここに `false` がセットされている場合、`Access-Control-Allow-Origin` レスポンスヘッダは決して送信されません。



### `autoLoginAfterAccountActivation`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$autoLoginAfterAccountActivation](craft3:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)



ユーザーがアカウントを有効化、または、パスワードをリセットした後で、自動的にログインさせるかどうか。



### `autosaveDrafts`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$autosaveDrafts](craft3:craft\config\GeneralConfig::$autosaveDrafts)

それ以降

:   3.5.6



編集された下書きを自動的に保存するかどうか。

この設定に関わらず、ライブプレビューを開いている間は下書きが自動保存 *されます*。



### `backupCommand`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$backupCommand](craft3:craft\config\GeneralConfig::$backupCommand)



データベースのバックアップを作成するために Craft が実行するシェルコマンド。

ウェブサーバーを実行しているユーザーの `$PATH` 変数にライブラリが含まれている場合、デフォルトで Craft は `mysqldump` または `pg_dump` を実行します。

ランタイムで Craft がスワップアウトするために利用できるいくつかのトークンがあります。

- `{file}` - バックアップファイルのターゲットパス
- `{port}` - 現在のデータベースポート
- `{server}` - 現在のデータベースホスト名e
- `{user}` - データベースに接続するユーザー
- `{database}` - 現在のデータベース名
- `{schema}` - （もしある場合）現在のデータベーススキーマ

データベースのバックアップを完全に無効化するために、`false` をセットすることもできます。



### `backupOnUpdate`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$backupOnUpdate](craft3:craft\config\GeneralConfig::$backupOnUpdate)



新しいシステムアップデートを適用する前に、Craft がデータベースのバックアップを作成するかどうか。



### `baseCpUrl`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$baseCpUrl](craft3:craft\config\GeneralConfig::$baseCpUrl)



コントロールパネルの URL を生成する際に、Craft が使用するベース URL。

空白の場合、自動的に決定されます。

::: tip
コントロールパネルのベース URL に [コントロールパネルのトリガーワード](config3:cpTrigger)（例：`/admin`）を **含めない** でください。
:::



### `blowfishHashCost`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `13`

定義元

:   [GeneralConfig::$blowfishHashCost](craft3:craft\config\GeneralConfig::$blowfishHashCost)



コスト値が高いと、パスワードハッシュの生成とそれに対する検証に時間がかかります。そのため、より高いコストはブルートフォース攻撃を遅くさせます。

ブルートフォース攻撃に対するベストな保護のために、production サーバーで許容される最高の値をセットしてください。

この値が増加するごとに、ハッシュを計算するためにかかる時間は倍になります。
例えば、値が14のときハッシュの計算に1秒かかる場合、計算時間は「2^(値 - 14) 」秒で変化します。



### `brokenImagePath`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$brokenImagePath](craft3:craft\config\GeneralConfig::$brokenImagePath)

それ以降

:   3.5.0



404 ステータスコードの画像リクエストへ応答する際に送信する、画像ファイルのサーバーパス。

`@webroot/assets/404.svg` のようなエイリアスパスをセットできます。



### `cacheDuration`

許可される型

:   `mixed`

デフォルト値

:   `86400`

定義元

:   [GeneralConfig::$cacheDuration](craft3:craft\config\GeneralConfig::$cacheDuration)



Craft がデータ、RSS フィード、および、テンプレートキャッシュを保管する時間のデフォルトの長さ。

`0` をセットすると、データと RSS フィードのキャッシュは無期限に保管されます。テンプレートキャッシュは1年間保管されます。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `convertFilenamesToAscii`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$convertFilenamesToAscii](craft3:craft\config\GeneralConfig::$convertFilenamesToAscii)



アップロードされたファイル名に含まれる ASCII 以外の文字を ASCII に変換するかどうか（例： `ñ` → `n`）。

::: tip
ターミナルで `php craft utils/ascii-filenames` を実行することによって、既存のすべてのアセットに ASCII ファイル名を適用できます。
:::



### `cooldownDuration`

許可される型

:   `mixed`

デフォルト値

:   `300`

定義元

:   [GeneralConfig::$cooldownDuration](craft3:craft\config\GeneralConfig::$cooldownDuration)



あまりに多くのログイン試行の失敗によりアカウントがロックされた後、ユーザーが再試行するために待たなければならない時間。

`0` をセットするとアカウントは無期限にロックされます。管理者が手動でアカウントのロックを解除する必要があります。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `cpHeadTags`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$cpHeadTags](craft3:craft\config\GeneralConfig::$cpHeadTags)

それ以降

:   3.5.0



コントロールパネルページの `<head>` に含めるべき追加の HTML タグのリスト。

それぞれのタグは、タグ名とその属性を配列として指定できます。

例えば、コントロールパネルに次のようなカスタムファビコン（など）を加えることができます。

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

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `'admin'`

定義元

:   [GeneralConfig::$cpTrigger](craft3:craft\config\GeneralConfig::$cpTrigger)



現在のリクエストをフロントエンドのウェブサイトではなくコントロールパネルにルーティングするかどうかを決定するとき、Craft が探す URI セグメント。

コントロールパネル専用のホスト名（例：`cms.example.com`）を持っていたり、Craft を[ヘッドレスモード](config3:headlessMode)で稼働している場合、`null` をセットできます。その場合、サーバーのウェブルートディレクトリにある PHP 定数 `CRAFT_CP` を定義した `index.php` ファイルからコントロールパネルが配信されていることを確認する必要があります。

```php
define('CRAFT_CP', true);
```

あるいは、コンフィグ設定 <config3:baseCpUrl> をセットすることもできますが、メインのウェブルートにある実際のフォルダやファイルと URI が競合してしまい、コントロールパネルの一部にアクセスできなくなる危険性があります。
（例えば、`assets/` フォルダがある場合、コントロールパネルの `/assets` ページと競合します。）



### `csrfTokenName`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'CRAFT_CSRF_TOKEN'`

定義元

:   [GeneralConfig::$csrfTokenName](craft3:craft\config\GeneralConfig::$csrfTokenName)



<config3:enableCsrfProtection> が `true` にセットされている場合、CSRF の検証に使用される CSRF トークン名。



### `defaultCookieDomain`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$defaultCookieDomain](craft3:craft\config\GeneralConfig::$defaultCookieDomain)



Craft によって生成される Cookie が作成されるべきドメイン。空白の場合、使用するドメイン（ほとんどの場合、現在のもの）の決定はブラウザに任されます。すべてのサブドメインで機能する Cookie を望むなら、例えば、ここに `'.domain.com'` をセットします。



### `defaultCpLanguage`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$defaultCpLanguage](craft3:craft\config\GeneralConfig::$defaultCpLanguage)



優先言語をまだセットしてないユーザー向けに、コントロールパネルが使用するデフォルトの言語。



### `defaultCpLocale`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$defaultCpLocale](craft3:craft\config\GeneralConfig::$defaultCpLocale)

それ以降

:   3.5.0



優先する言語や書式のロケールをまだセットしていないユーザー向けに、コントロールパネルが日付や数字の書式として使用するデフォルトのロケール。

これが `null` の場合、コンフィグ設定 <config3:defaultCpLanguage> がデフォルトで使用される日付や書式のフォーマットを決定します。



### `defaultDirMode`

許可される型

:   `mixed`

デフォルト値

:   `0775`

定義元

:   [GeneralConfig::$defaultDirMode](craft3:craft\config\GeneralConfig::$defaultDirMode)



新しく生成されたディレクトリにセットされるデフォルトのパーミッション。

`null` をセットすると、パーミッションは現在の環境によって決定されます。



### `defaultFileMode`

許可される型

:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$defaultFileMode](craft3:craft\config\GeneralConfig::$defaultFileMode)



新しく生成されたファイルにセットされるデフォルトのパーミッション。

`null` をセットすると、パーミッションは現在の環境によって決定されます。



### `defaultImageQuality`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `82`

定義元

:   [GeneralConfig::$defaultImageQuality](craft3:craft\config\GeneralConfig::$defaultImageQuality)



JPG と PNG ファイルを保存する際に、Craft が使用する品質レベル。0（最低品質、最小ファイルサイズ）から100（最高品質、最大ファイルサイズ）までの範囲。



### `defaultSearchTermOptions`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$defaultSearchTermOptions](craft3:craft\config\GeneralConfig::$defaultSearchTermOptions)



それぞれの検索用語に適用されるデフォルトのオプション。

オプションは次のものを含みます。

- `attribute` – （もしある場合）用語が適用される属性（例：'title'）。（デフォルトは `null`）
- `exact` – 用語が完全一致でなければならないかどうか（`attribute` がセットされている場合のみ、適用されます）。（デフォルトは `false`)
- `exclude` – 検索結果でこの用語のレコードを *除外する* かどうか。（デフォルトは `false`)
- `subLeft` – それより前に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。（デフォルトは `false`）
- `subRight` – それより後に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。（デフォルトは `true`）



### `defaultTemplateExtensions`

許可される型

:   [string](http://php.net/language.types.string)[]

デフォルト値

:   `['html', 'twig']`

定義元

:   [GeneralConfig::$defaultTemplateExtensions](craft3:craft\config\GeneralConfig::$defaultTemplateExtensions)



フロントエンドでテンプレートパスとファイルの照合をする際に、Craft が探すテンプレートファイルの拡張子。



### `defaultTokenDuration`

許可される型

:   `mixed`

デフォルト値

:   `86400`

定義元

:   [GeneralConfig::$defaultTokenDuration](craft3:craft\config\GeneralConfig::$defaultTokenDuration)



トークンが期限切れになる前に使用できるデフォルトの時間。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `defaultWeekStartDay`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `1`

定義元

:   [GeneralConfig::$defaultWeekStartDay](craft3:craft\config\GeneralConfig::$defaultWeekStartDay)



新しいユーザーが「週の開始日」としてセットする必要があるデフォルトの曜日。

これは、次の整数の1つをセットしてください。

- `0` – 日曜日
- `1` – 月曜日
- `2` – 火曜日
- `3` – 水曜日
- `4` – 木曜日
- `5` – 金曜日
- `6` – 土曜日



### `deferPublicRegistrationPassword`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$deferPublicRegistrationPassword](craft3:craft\config\GeneralConfig::$deferPublicRegistrationPassword)



デフォルトでは、フロントエンドの一般ユーザー登録で「パスワード」フィールドを送信する必要があります。`true` をセットすると、最初の登録フォームでパスワードを必要としなくなります。

メールアドレスの確認が有効になっている場合、新しいユーザーは通知メールに記載されたリンクをクリックしてパスワードを設定できます。そうでなければ、「パスワードを忘れた」際のワークフローを経由することがパスワードをセットできる唯一の方法となります。



### `devMode`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$devMode](craft3:craft\config\GeneralConfig::$devMode)



システムを [Dev Mode](https://craftcms.com/support/dev-mode) で実行するかどうか。



### `disabledPlugins`

許可される型

:   [string](http://php.net/language.types.string)[]

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$disabledPlugins](craft3:craft\config\GeneralConfig::$disabledPlugins)

それ以降

:   3.1.9



プロジェクトコンフィグの内容に関わらず無効にする、プラグインハンドルの配列。



```php
'dev' => [
    'disabledPlugins' => ['webhooks'],
],
```

### `elevatedSessionDuration`

許可される型

:   `mixed`

デフォルト値

:   `300`

定義元

:   [GeneralConfig::$elevatedSessionDuration](craft3:craft\config\GeneralConfig::$elevatedSessionDuration)



機密性の高い操作（例：ユーザーのグループや権限の割り当てなど）に必要な、ユーザーの昇格されたセッションの時間。

昇格されたセッションのサポートを無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `enableBasicHttpAuth`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$enableBasicHttpAuth](craft3:craft\config\GeneralConfig::$enableBasicHttpAuth)

それ以降

:   3.5.0



フロントエンドのウェブリクエストが基本的な HTTP 認証をサポートするかどうか。



### `enableCsrfCookie`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$enableCsrfCookie](craft3:craft\config\GeneralConfig::$enableCsrfCookie)



<config3:enableCsrfProtection> が有効な場合、CSRF トークンを保持するために Cookie を使用するかどうか。false の場合、CSRF トークンはコンフィグ設定 `csrfTokenName` 配下のセッション内に保管されます。セッションの CSRF トークンを保存することでセキュリティが向上している間は、CSRF トークンを必要とされるすべてのページでセッションを開始する必要があるため、サイトのパフォーマンスは低下する可能性がある点に注意してください。



### `enableCsrfProtection`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$enableCsrfProtection](craft3:craft\config\GeneralConfig::$enableCsrfProtection)



Craft 経由で送信されるすべてのフォームで、不可視項目による CSRF 保護を有効にするかどうか。



### `enableGql`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$enableGql](craft3:craft\config\GeneralConfig::$enableGql)

それ以降

:   3.3.1



GraphQL API を有効にするかどうか。

GraphQL API は Craft Pro でのみ利用可能です。



### `enableGraphQlCaching`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$enableGraphQlCaching](craft3:craft\config\GeneralConfig::$enableGraphQlCaching)

それ以降

:   3.3.12



Craft が GraphQL クエリをキャッシュするかどうか。

`true` をセットすると、Craft はアクセストークンごとに GraphQL クエリの結果をキャッシュします。そのキャッシュは、エレメントが保存されたとき、サイト構造が更新されたとき、または、GraphQL スキーマが保存されたときはいつでも、自動的に無効になります。

[craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) イベントを利用してプラグインが独自のキャッシュ処理を提供し、`result` プロパティをセットしている場合、この設定は効果がありません。



### `enableTemplateCaching`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$enableTemplateCaching](craft3:craft\config\GeneralConfig::$enableTemplateCaching)



グローバル基準で Craft テンプレートの `{% cache %}` タグを有効にするかどうか。



### `errorTemplatePrefix`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$errorTemplatePrefix](craft3:craft\config\GeneralConfig::$errorTemplatePrefix)



エラーテンプレートを探すためのパスを決定するときに、HTTP エラーステータスコードの前につける接頭辞。

例えば `'_'` がセットされている場合、サイトの 404 テンプレートは `templates/_404.html` となります。



### `extraAllowedFileExtensions`

許可される型

:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$extraAllowedFileExtensions](craft3:craft\config\GeneralConfig::$extraAllowedFileExtensions)



コンフィグ設定 <config3:allowedFileExtensions> にマージされるファイル拡張子のリスト。



### `extraAppLocales`

許可される型

:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$extraAppLocales](craft3:craft\config\GeneralConfig::$extraAppLocales)

それ以降

:   3.0.24



アプリケーションがサポートすべき追加のロケール ID のリストで、ユーザーが優先言語として選択できる必要があります。

サーバーに Intl PHP エクステンションがあるか、対応する[ロケールデータ](https://github.com/craftcms/locales)を `config/locales/` フォルダに保存している場合のみ、この設定を利用してください。



### `extraFileKinds`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$extraFileKinds](craft3:craft\config\GeneralConfig::$extraFileKinds)

それ以降

:   3.0.37



Craft がサポートすべき追加のファイル種類のリスト。この配列は `\craft\helpers\Assets::_buildFileKinds()` 内で定義されたものとマージされます。

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
ここにリストされたファイル拡張子が、即座にアップロードを許可されるわけではありません。コンフィグ設定 <config3:extraAllowedFileExtensions> でそれらをリストする必要もあります。
:::



### `filenameWordSeparator`

許可される型

:   [string](http://php.net/language.types.string), [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `'-'`

定義元

:   [GeneralConfig::$filenameWordSeparator](craft3:craft\config\GeneralConfig::$filenameWordSeparator)



アセットをアップロードする際に、単語を区切るために使用する文字列。`false` の場合、空白だけが残ります。



### `generateTransformsBeforePageLoad`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$generateTransformsBeforePageLoad](craft3:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)



ページの読み込み前に画像変換によるサムネイルの生成をするかどうか。



### `gqlTypePrefix`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$gqlTypePrefix](craft3:craft\config\GeneralConfig::$gqlTypePrefix)



GraphQL が返す、すべての型名に使用する接頭辞。



### `headlessMode`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$headlessMode](craft3:craft\config\GeneralConfig::$headlessMode)

それ以降

:   3.3.0



ヘッドレス CMS 導入のために、システムやコントロールパネルを最適化するヘッドレスモードとしてシステムを実行するかどうか。

有効にした場合、次の変更が行われます。

- セクションやカテゴリグループのテンプレート設定は非表示になります。
- テンプレートルート管理は非表示になります。
- フロントエンドのルーティングは、エレメントやテンプレートリクエストのチェックをスキップします。
- フロントエンドのレスポンスは、デフォルトで HTML ではなく JSON 形式になります。
- Twig は、フロントエンドのデフォルトで HTML ではなく JavaScript / JSON のための安全ではない文字列をエスケープするよう設定されます。
- <config3:loginPath>、<config3:logoutPath>、<config3:setPasswordPath>、および、<config3:verifyEmailPath> 設定は無視されます。

::: tip
ヘッドレスモードを有効にした場合、「コントロールパネルへのアクセス」権限を持たないユーザーは初期バスワードの設定、新しいパスワードの設定、または、メールアドレスの確認ができなくなります。コントロールパネルにログインできるはずのコンテンツ編集者や管理者には、この権限を確実に付与してください。
:::



### `imageDriver`

許可される型

:   `mixed`

デフォルト値

:   `self::IMAGE_DRIVER_AUTO`

定義元

:   [GeneralConfig::$imageDriver](craft3:craft\config\GeneralConfig::$imageDriver)



Craft が画像の削除や変形で使用するイメージドライバ。デフォルトでは、Craft はインストールされている ImageMagick を自動検出し、そうでない場合は GD をフォールバックします。明示的に `'imagick'` または `'gd'` をセットして、その振る舞いを上書きできます。



### `imageEditorRatios`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `['Unconstrained' => 'none', 'Original' => 'original', 'Square' => 1, '16:9' => 1.78, '10:8' => 1.25, '7:5' => 1.4, '4:3' => 1.33, '5:3' => 1.67, '3:2' => 1.5]`

定義元

:   [GeneralConfig::$imageEditorRatios](craft3:craft\config\GeneralConfig::$imageEditorRatios)



イメージエディタで選択可能な画像のアスペクト比を含む配列。配列は `label` => `ratio` の形式で、ratio は浮動少数、または、文字列でなければなりません。
文字列の場合は "none" と "original" だけが許可されています。



### `indexTemplateFilenames`

許可される型

:   [string](http://php.net/language.types.string)[]

デフォルト値

:   `['index']`

定義元

:   [GeneralConfig::$indexTemplateFilenames](craft3:craft\config\GeneralConfig::$indexTemplateFilenames)



フロントエンドでテンプレートパスとファイルの照合をする際に、Craft がディレクトリ内で探すディレクトリの「インデックス」テンプレートに相当するテンプレートファイル名。



### `invalidLoginWindowDuration`

許可される型

:   `mixed`

デフォルト値

:   `3600`

定義元

:   [GeneralConfig::$invalidLoginWindowDuration](craft3:craft\config\GeneralConfig::$invalidLoginWindowDuration)



Craft がアカウントをロックするかを決定するために、ユーザーの無効なログイン試行を追跡する時間。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `invalidUserTokenPath`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$invalidUserTokenPath](craft3:craft\config\GeneralConfig::$invalidUserTokenPath)



ユーザートークンの検証が失敗した際に、Craft がリダイレクトする URI。トークンは、ユーザーアカウントのパスワードの設定やリセットで利用されます。フロントエンドサイトのリクエストのみに影響することに注意してください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `ipHeaders`

許可される型

:   [string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$ipHeaders](craft3:craft\config\GeneralConfig::$ipHeaders)



プロキシが実際のクライアント IP を保管するヘッダーのリスト。

詳細については、[yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) を参照してください。

設定されていない場合、デフォルトで [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) 値が使用されます。



### `isSystemLive`

許可される型

:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$isSystemLive](craft3:craft\config\GeneralConfig::$isSystemLive)



サイトが現在稼働しているかどうか。`true` または `false` をセットしている場合、「設定 > 一般」のシステムのステータス設定よりも優先されます。



### `limitAutoSlugsToAscii`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$limitAutoSlugsToAscii](craft3:craft\config\GeneralConfig::$limitAutoSlugsToAscii)



自動生成されたスラグの ASCII 以外の文字を ASCII に変換するかどうか（例： ñ → n）。

::: tip
これは JavaScript によって自動生成されるスラグのみ影響します。手動で入力した場合、ASCII 以外の文字をスラグに使用できます。
:::



### `loginPath`

許可される型

:   `mixed`

デフォルト値

:   `'login'`

定義元

:   [GeneralConfig::$loginPath](craft3:craft\config\GeneralConfig::$loginPath)



Craft がフロントエンドのユーザーログインに使用する URI。

フロントエンドのログインを無効にする場合、`false` をセットします。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `logoutPath`

許可される型

:   `mixed`

デフォルト値

:   `'logout'`

定義元

:   [GeneralConfig::$logoutPath](craft3:craft\config\GeneralConfig::$logoutPath)



Craft がフロントエンドのユーザーログアウトに使用する URI。

フロントエンドのログアウトを無効にする場合、`false` をセットします。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `maxBackups`

許可される型

:   [integer](http://php.net/language.types.integer), [false](http://php.net/language.types.boolean)

デフォルト値

:   `20`

定義元

:   [GeneralConfig::$maxBackups](craft3:craft\config\GeneralConfig::$maxBackups)



一番古いバックアップの削除を開始する前に、Craft が保持するべきバックアップの数。
`false` がセットされている場合、Craft はバックアップを削除しません。



### `maxCachedCloudImageSize`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `2000`

定義元

:   [GeneralConfig::$maxCachedCloudImageSize](craft3:craft\config\GeneralConfig::$maxCachedCloudImageSize)



変換で使用する外部ソースから画像をキャッシュする際に使用する最大の寸法サイズ。キャッシュを無効化するには、`0` をセットしてください。



### `maxInvalidLogins`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `5`

定義元

:   [GeneralConfig::$maxInvalidLogins](craft3:craft\config\GeneralConfig::$maxInvalidLogins)



ロックされる前のアカウントが指定期間内で Craft に許可される、無効なログイン試行の回数。



### `maxRevisions`

許可される型

:   [integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値

:   `50`

定義元

:   [GeneralConfig::$maxRevisions](craft3:craft\config\GeneralConfig::$maxRevisions)

それ以降

:   3.2.0



それぞれのエレメントのために保存するリビジョンの最大数。

リビジョンを無制限に保存したい場合、`0` をセットしてください。



### `maxSlugIncrement`

許可される型

:   [integer](http://php.net/language.types.integer)

デフォルト値

:   `100`

定義元

:   [GeneralConfig::$maxSlugIncrement](craft3:craft\config\GeneralConfig::$maxSlugIncrement)



諦めてエラーにする前に、Craft がそれをユニークにするためにスラグへ追加する最高の数。



### `maxUploadFileSize`

許可される型

:   [integer](http://php.net/language.types.integer), [string](http://php.net/language.types.string)

デフォルト値

:   `16777216`

定義元

:   [GeneralConfig::$maxUploadFileSize](craft3:craft\config\GeneralConfig::$maxUploadFileSize)



許可される最大のアップロードファイルサイズ。

サポートされる値の種類は、[craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) のリストを参照してください。



### `omitScriptNameInUrls`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$omitScriptNameInUrls](craft3:craft\config\GeneralConfig::$omitScriptNameInUrls)



生成された URL が `index.php` を省略するかどうか（例：`http://domain.com/index.php/path` の代わりに `http://domain.com/path`）。

これは、例えば Craft に付属している  `.htaccess` にリダイレクトが見つかるなど、404 を `index.php` にリダイレクトするようサーバーが設定されている場合のみ可能です。

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```



### `optimizeImageFilesize`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$optimizeImageFilesize](craft3:craft\config\GeneralConfig::$optimizeImageFilesize)



Craft が画質を著しく低下させることなく、画像のファイルサイズを減らす最適化をするかどうか。
（ImageMagick を利用している場合のみ、サポートされます。）



### `pageTrigger`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'p'`

定義元

:   [GeneralConfig::$pageTrigger](craft3:craft\config\GeneralConfig::$pageTrigger)



現在のリクエストがページ分割されたリストに含まれる特定ページのものかどうかを決定する際に、Craft が探す数値の前にある文字列。

| サンプル値 | サンプル URI |
------------- | -----------
| `p` | `/news/p5` |
| `page` | `/news/page5` |
| `page/` | `/news/page/5` |
| `?page` | `/news?page=5` |

::: tip
これを `?p`（例：`/news?p=5`）にセットしたい場合、デフォルトで `p` がセットされている  <config3:pathParam> 設定も変更する必要があります。さらにサーバーが Apache で稼働している場合、新しい `pathParam` 値とマッチするよう `.htaccess` ファイル内のリダイレクトコードをアップデートする必要があります。
:::



### `pathParam`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `'p'`

定義元

:   [GeneralConfig::$pathParam](craft3:craft\config\GeneralConfig::$pathParam)



リクエストのパスを決定する際に、Craft がチェックするクエリ文字列のパラメータ。

ウェブサーバーがクエリ文字列のパラメータなしで `index.php` にトラフィックを誘導できる場合、`null` をセットできます。Apache を利用している場合、`.htaccess` の `RewriteRule` 行を次のように変更する必要があります。

    RewriteRule (.+) index.php [QSA,L]



### `phpMaxMemoryLimit`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$phpMaxMemoryLimit](craft3:craft\config\GeneralConfig::$phpMaxMemoryLimit)



Craft が圧縮、展開、アップデートなどのメモリ集約型の操作中に確保しようと試みるメモリの最大量。デフォルトは空の文字列で、可能な限り多くのメモリを使用することを意味しています。

受け入れられる値については、<http://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> のリストを参照してください。



### `phpSessionName`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'CraftSessionId'`

定義元

:   [GeneralConfig::$phpSessionName](craft3:craft\config\GeneralConfig::$phpSessionName)



PHP セッション Cookie の名前。



### `postCpLoginRedirect`

許可される型

:   `mixed`

デフォルト値

:   `'dashboard'`

定義元

:   [GeneralConfig::$postCpLoginRedirect](craft3:craft\config\GeneralConfig::$postCpLoginRedirect)



コントロールパネルからログインした後にユーザーをリダイレクトするパス。

すでにログインしているユーザーがコントロールパネルのログインページ（`/admin/login`）または、コントロールパネルのルート URL（/admin）にアクセスした場合も、この設定が効力を発揮します。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `postLoginRedirect`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$postLoginRedirect](craft3:craft\config\GeneralConfig::$postLoginRedirect)



フロントエンドサイトからログインした後にユーザーをリダイレクトするパス。

すでにログインしているユーザーがログインページ（コンフィグ設定 loginPath に明示されているとおり）にアクセスした場合も、効力を発揮します。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `postLogoutRedirect`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$postLogoutRedirect](craft3:craft\config\GeneralConfig::$postLogoutRedirect)



フロントエンドサイトからログアウトした後にユーザーをリダイレクトするパス。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `preserveCmykColorspace`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$preserveCmykColorspace](craft3:craft\config\GeneralConfig::$preserveCmykColorspace)

それ以降

:   3.0.8



画像を操作するとき、CMYK を色空間として保存するかどうか。

`true` をセットすると、Craft は CMYK イメージを sRGB に変換するのを防ぎます。ただし、 ImageMagick のバージョンによっては、イメージに色の歪みを生じることがあります。これは ImageMagick を利用している場合のみ、影響があります。



### `preserveExifData`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$preserveExifData](craft3:craft\config\GeneralConfig::$preserveExifData)



画像の操作やアップロードをするとき、EXIF データを保存するかどうか。

`true` をセットすると、画像ファイルのサイズが大きくなります。

これは ImageMagick を利用している場合のみ、影響があります。



### `preserveImageColorProfiles`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$preserveImageColorProfiles](craft3:craft\config\GeneralConfig::$preserveImageColorProfiles)



画像を操作するとき、埋め込まれたイメージカラープロファイル（ICC）を保存するかどうか。

`false` をセットすると画像サイズが少し小さくなります。ただし、ImageMagick のバージョンによっては正しくないガンマ値が保存され、とても暗い画像になることがあります。これは ImageMagick を利用している場合のみ、影響があります。



### `preventUserEnumeration`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$preventUserEnumeration](craft3:craft\config\GeneralConfig::$preventUserEnumeration)



`false` がセットされ、コントロールパネルのログインページの「パスワードを忘れた」ワークフローを通過すると、ユーザー名 / メールアドレスが存在しないのか、または、次の手順のためのメール送信が成功し確認されたのかを示す別個のメッセージが表示されます。これは、レスポンスに基づいてユーザー名 / メールアドレスの列挙を許可します。`true` をセットすると、ユーザーを列挙するのが難しいエラーである場合も、常に正常なレスポンスを受け取るでしょう。



### `previewIframeResizerOptions`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `[]`

定義元

:   [GeneralConfig::$previewIframeResizerOptions](craft3:craft\config\GeneralConfig::$previewIframeResizerOptions)

それ以降

:   3.5.0



プレビューの iframe で使用される、カスタムの[iFrame Resizer オプション](http://davidjbradshaw.github.io/iframe-resizer/#options)。

```php
'previewIframeResizerOptions' => [
    'autoResize' => false,
],
```



### `privateTemplateTrigger`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'_'`

定義元

:   [GeneralConfig::$privateTemplateTrigger](craft3:craft\config\GeneralConfig::$privateTemplateTrigger)



「プライベート」テンプレート（マッチする URL から直接アクセスできないテンプレート）を識別するために使用するテンプレートパスのセグメントの接頭辞。

公開テンプレートのルーティングを無効化するには、空の値をセットしてください。



### `purgePendingUsersDuration`

許可される型

:   `mixed`

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$purgePendingUsersDuration](craft3:craft\config\GeneralConfig::$purgePendingUsersDuration)



有効化されていない保留中のユーザーを Craft がシステムからパージするまでに待機する時間。

与えられた時間が経過すると、保留中のユーザーに割り当てられたコンテンツもすべて削除される点に注意してください。

この機能を無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `purgeStaleUserSessionDuration`

許可される型

:   `mixed`

デフォルト値

:   `7776000`

定義元

:   [GeneralConfig::$purgeStaleUserSessionDuration](craft3:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

それ以降

:   3.3.0



データベースの sessions テーブルから Craft が古いユーザーセッションをパージするまでに待機する時間。

この機能を無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `purgeUnsavedDraftsDuration`

許可される型

:   `mixed`

デフォルト値

:   `2592000`

定義元

:   [GeneralConfig::$purgeUnsavedDraftsDuration](craft3:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

それ以降

:   3.2.0



正式に保存されなかった新しいエレメントの下書きを Craft がパージするまでに待機する時間。

この機能を無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `rememberUsernameDuration`

許可される型

:   `mixed`

デフォルト値

:   `31536000`

定義元

:   [GeneralConfig::$rememberUsernameDuration](craft3:craft\config\GeneralConfig::$rememberUsernameDuration)



コントロールパネルのログインページへ自動挿入するために、Craft がユーザー名を記憶しておく時間。

この機能を完全に無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `rememberedUserSessionDuration`

許可される型

:   `mixed`

デフォルト値

:   `1209600`

定義元

:   [GeneralConfig::$rememberedUserSessionDuration](craft3:craft\config\GeneralConfig::$rememberedUserSessionDuration)



ログインページで「ログイン状態を維持する」がチェックされている場合、ユーザーがログインしたままになる時間。

「ログイン状態を維持する」機能を完全に無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `requireMatchingUserAgentForSession`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$requireMatchingUserAgentForSession](craft3:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)



Cookie からユーザーセッションを復元する際に、一致するユーザーエージェントの文字列を Craft が必要とするかどうか。



### `requireUserAgentAndIpForSession`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$requireUserAgentAndIpForSession](craft3:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)



新しいユーザーセッションを作成する際に、ユーザーエージェントの文字列と IP アドレスの存在を Craft が必要とするかどうか。



### `resourceBasePath`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'@webroot/cpresources'`

定義元

:   [GeneralConfig::$resourceBasePath](craft3:craft\config\GeneralConfig::$resourceBasePath)



公開されたコントロールパネルのリソースを保管するルートディレクトリのパス。



### `resourceBaseUrl`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'@web/cpresources'`

定義元

:   [GeneralConfig::$resourceBaseUrl](craft3:craft\config\GeneralConfig::$resourceBaseUrl)



公開されたコントロールパネルのリソースを保管するルートディレクトリの URL。



### `restoreCommand`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$restoreCommand](craft3:craft\config\GeneralConfig::$restoreCommand)



データベースのバックアップを復元するために Craft が実行するシェルコマンド。

ウェブサーバーを実行しているユーザーの `$PATH` 変数にライブラリが含まれている場合、デフォルトで Craft は `mysql` または `psql` を実行します。

ランタイムで Craft がスワップアウトするために利用できるいくつかのトークンがあります。

- `{path}` - バックアップファイルのパス
- `{port}` - 現在のデータベースポート
- `{server}` - 現在のデータベースホスト名e
- `{user}` - データベースに接続するユーザー
- `{database}` - 現在のデータベース名
- `{schema}` - （もしある場合）現在のデータベーススキーマ

データベースの復元を完全に無効化するために、`false` をセットすることもできます。



### `rotateImagesOnUploadByExifData`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$rotateImagesOnUploadByExifData](craft3:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)



アップロード時の EXIF データに従って、Craft が画像を回転するかどうか。



### `runQueueAutomatically`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$runQueueAutomatically](craft3:craft\config\GeneralConfig::$runQueueAutomatically)



誰かがコントロールパネルを訪れたときに、Craft が保留中のキュージョブを自動的に実行するかどうか。

無効にした場合、代わりのキューワーカーを [常に稼働しているデーモンとして](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md)、または、
毎分ごとに `queue/run` コマンドを実行する cron ジョブとして、別途セットアップ *しなければなりません* 。

```cron
* * * * * /path/to/project/craft queue/run
```

::: tip
この設定は、サーバーが Win32 を実行している、または、Apache の mod_deflate/mod_gzip がインストールされていて PHP の [flush()](http://php.net/manual/en/function.flush.php) メソッドが動作しない場合は、無効にする必要があります。
:::



### `sameSiteCookieValue`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$sameSiteCookieValue](craft3:craft\config\GeneralConfig::$sameSiteCookieValue)

それ以降

:   3.1.33



Craft の Cookie にセットされるべき [SameSite](https://www.owasp.org/index.php/SameSite) 値。

`'Lax'`、`'Strict'`、または、`null` をセットできます。

::: tip
この設定には PHP 7.3 以降が必要です。
:::



### `sanitizeSvgUploads`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$sanitizeSvgUploads](craft3:craft\config\GeneralConfig::$sanitizeSvgUploads)



Craft がアップロードされた SVG ファイルをサニタイズし、潜在的な悪意のあるコンテンツを取り除くべきかどうか。

信頼できないソースから SVG アップロードを許可する場合は、これを確実に有効にするべきです。



### `secureHeaders`

許可される型

:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$secureHeaders](craft3:craft\config\GeneralConfig::$secureHeaders)



デフォルトで、信頼できるホスト設定の適用を受けるヘッダーのリスト。

詳細については、[yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) を参照してください。

設定されていない場合、デフォルトで [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) 値が使用されます。



### `secureProtocolHeaders`

許可される型

:   [array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$secureProtocolHeaders](craft3:craft\config\GeneralConfig::$secureProtocolHeaders)



HTTPS 経由で接続されるかどうかを決定するための確認を行うヘッダーのリスト。

詳細については、[yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) を参照してください。

設定されていない場合、デフォルトで [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) 値が使用されます。



### `securityKey`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$securityKey](craft3:craft\config\GeneralConfig::$securityKey)



[craft\services\Security](craft3:craft\services\Security) のデータのハッシングや暗号化に使われる、非公開でランダムな暗号的に安全な鍵。

この値は、すべての環境で同じであるべきです。この鍵を変更した場合、暗号化されたいかなるデータにもアクセスできなくなることに注意してください。



### `sendPoweredByHeader`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$sendPoweredByHeader](craft3:craft\config\GeneralConfig::$sendPoweredByHeader)



`X-Powered-By: Craft CMS` ヘッダーを送信するかどうか。[BuiltWith](https://builtwith.com/) や [Wappalyzer](https://www.wappalyzer.com/) のようなサービスで、サイトが Craft で動作していると判別するのを手伝います。



### `setPasswordPath`

許可される型

:   `mixed`

デフォルト値

:   `'setpassword'`

定義元

:   [GeneralConfig::$setPasswordPath](craft3:craft\config\GeneralConfig::$setPasswordPath)



Craft がフロントエンドのパスワードの設定フォームに使用する URI。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。

::: tip
ユーザーが期限切れのパスワードリセットリンクをクリックした場合に備えて、<config3:invalidUserTokenPath> をセットすることもできます。
:::



### `setPasswordSuccessPath`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$setPasswordSuccessPath](craft3:craft\config\GeneralConfig::$setPasswordSuccessPath)



Craft がフロントエンドからパスワードを設定したユーザーをリダイレクトさせる URI。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `siteName`

許可される型

:   [string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$siteName](craft3:craft\config\GeneralConfig::$siteName)



サイト名。セットされている場合、「設定 > サイト > [名前]」で設定された名称よりも優先されます。

プライマリサイトの名前だけを上書きするための文字列、または、サイトのハンドルをキーとして使用する配列をセットできます。



### `siteToken`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'siteToken'`

定義元

:   [GeneralConfig::$siteToken](craft3:craft\config\GeneralConfig::$siteToken)

それ以降

:   3.5.0



サイトのトークンがセットされるクエリ文字列パラメータ名。



### `siteUrl`

許可される型

:   [string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$siteUrl](craft3:craft\config\GeneralConfig::$siteUrl)



サイトのベース URL。セットされている場合、「設定 > サイト > [名前]」で設定された名称よりも優先されます。

プライマリサイトのベース URL だけを上書きするための文字列、または、サイトのハンドルをキーとして使用する配列をセットできます。

URL は `http://`、`https://`、`//`（プロトコル相対）、または、[エイリアス](config3:aliases)のいずれかではじまる必要があります。

```php
'siteUrl' => [
    'siteA' => 'https://site-a.com/',
    'siteB' => 'https://site-b.com/',
],
```



### `slugWordSeparator`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'-'`

定義元

:   [GeneralConfig::$slugWordSeparator](craft3:craft\config\GeneralConfig::$slugWordSeparator)



スラグの単語を区切るために使用する文字。



### `softDeleteDuration`

許可される型

:   `mixed`

デフォルト値

:   `2592000`

定義元

:   [GeneralConfig::$softDeleteDuration](craft3:craft\config\GeneralConfig::$softDeleteDuration)

それ以降

:   3.1.0



ソフトデリートされたアイテムが、ガベージコレクションによって完全に削除されるまでの時間。

ソフトデリートされたアイテムを削除したくない場合、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `storeUserIps`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$storeUserIps](craft3:craft\config\GeneralConfig::$storeUserIps)

それ以降

:   3.1.0



ユーザーの IP アドレスがシステムによって保存 / 記録されるべきかどうか。



### `testToEmailAddress`

許可される型

:   [string](http://php.net/language.types.string), [array](http://php.net/language.types.array), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$testToEmailAddress](craft3:craft\config\GeneralConfig::$testToEmailAddress)



すべてのシステムメールをテスト目的の単一のメールアドレス、または、メールアドレスの配列へ送信するよう、Craft を設定します。

デフォルトでは受信者名は「テスト受信者」になりますが、`['email@address.com' => 'Name']` の形式で値をカスタマイズできます。



### `timezone`

許可される型

:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$timezone](craft3:craft\config\GeneralConfig::$timezone)



サイトのタイムゾーン。セットされている場合、「設定 > 一般」で設定されたタイムゾーンよりも優先されます。

これは、PHP の [supported timezones](http://php.net/manual/en/timezones.php) の1つをセットできます。



### `tokenParam`

許可される型

:   [string](http://php.net/language.types.string)

デフォルト値

:   `'token'`

定義元

:   [GeneralConfig::$tokenParam](craft3:craft\config\GeneralConfig::$tokenParam)



Craft のトークンがセットされるクエリ文字列パラメータ名。



### `transformGifs`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$transformGifs](craft3:craft\config\GeneralConfig::$transformGifs)

それ以降

:   3.0.7



GIF ファイルを綺麗にしたり、変形したりするかどうか。



### `translationDebugOutput`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$translationDebugOutput](craft3:craft\config\GeneralConfig::$translationDebugOutput)



`Craft::t()` または `|translate` フィルタを実行されていない文字列を見つけるために、翻訳されたメッセージを特殊文字で囲むかどうか。



### `trustedHosts`

許可される型

:   [array](http://php.net/language.types.array)

デフォルト値

:   `['any']`

定義元

:   [GeneralConfig::$trustedHosts](craft3:craft\config\GeneralConfig::$trustedHosts)



信頼されるセキュリティ関連のヘッダーの設定。

詳細については、[yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) を参照してください。

デフォルトでは、すべてのホストが信頼されます。



### `upscaleImages`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `true`

定義元

:   [GeneralConfig::$upscaleImages](craft3:craft\config\GeneralConfig::$upscaleImages)

それ以降

:   3.4.0



指定された変形サイズが元画像よりも大きい場合、画像をアップスケールするかどうか。



### `useEmailAsUsername`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$useEmailAsUsername](craft3:craft\config\GeneralConfig::$useEmailAsUsername)



ユーザー自身がユーザー名をセットするのではなく、Craft がユーザー名をメールアドレスに合わせるかどうか。

ユーザーアカウントが既に存在している状態でこの設定を有効にする場合、次のターミナルコマンドを実行して、既存のユーザー名を更新します。

```bash
php craft utils/update-usernames
```



### `useFileLocks`

許可される型

:   [boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

デフォルト値

:   `null`

定義元

:   [GeneralConfig::$useFileLocks](craft3:craft\config\GeneralConfig::$useFileLocks)



`LOCK_EX` フラグを利用して、書き込む際にファイルを排他ロックするかどうか。

NFS のような一部のファイルシステムでは、排他的なファイルロックをサポートしていません。

`true` または `false` をセットしていない場合、Craft は自動的に基礎となるファイルシステムが排他的なファイルロックをサポートしているかを検出し、結果をキャッシュします。



### `useIframeResizer`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$useIframeResizer](craft3:craft\config\GeneralConfig::$useIframeResizer)

それ以降

:   3.5.5



[iFrame Resizer オプション](http://davidjbradshaw.github.io/iframe-resizer/#options) をライブプレビューに使用するかどうか。

iFrame Resizer を使用すると、Craft がクロスオリジンのウェブページ向けにページのロード間でプレビューのスクロール位置を保持できるようになります。

iframe の高さを内部ウェブページの高さに一致するよう設定することで動作し、iframe ドキュメント自体ではなく iframe のコンテナをスクロールさせます。しかし、プレビューされたビューポートの高さが iframe の表示部分よりも高くなってしまうため、予期せぬ CSS 問題を引き起こす可能性があります。

[分離されたフロントエンド](/docs/3.x/ja/entries.html#previewing-decoupled-front-ends) の場合、期待する動作になるよう [iframeResizer.contentWindow.min.js](https://raw.github.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js) をページに含める必要があります。リクエスト URL に `x-craft-live-preview` クエリ文字列パラメータが含まれているかを確認することで、ライブプレビューのリクエストだけそれを含めるようにできます。

::: tip
コンフィグ設定 <config3:previewIframeResizerOptions> で iFrame Resizer の振る舞いをカスタマイズできます。
:::



### `usePathInfo`

許可される型

:   [boolean](http://php.net/language.types.boolean)

デフォルト値

:   `false`

定義元

:   [GeneralConfig::$usePathInfo](craft3:craft\config\GeneralConfig::$usePathInfo)



Craft が URL を生成する際、`PATH_INFO` を利用してパスを指定するか、クエリ文字列パラメータとして指定するかどうか。

この設定は、<config3:omitScriptNameInUrls> が false にセットされている場合のみ影響することに注意してください。



### `useSecureCookies`

許可される型

:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

デフォルト値

:   `'auto'`

定義元

:   [GeneralConfig::$useSecureCookies](craft3:craft\config\GeneralConfig::$useSecureCookies)



`Cookie を作成するために Craft::cookieConfig()` を使用した際、Craft が保存する Cookie に "secure" フラグをセットするかどうか。

有効な値は `true`、`false`、および、`'auto'` です。デフォルトは `'auto'` で、現在のアクセスが `https://` 越しの場合に、secure フラグがセットされます。`true` はプロトコルに関係なく常にフラグをセットし、`false` は自動的にフラグをセットすることはありません。



### `useSslOnTokenizedUrls`

許可される型

:   [boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

デフォルト値

:   `'auto'`

定義元

:   [GeneralConfig::$useSslOnTokenizedUrls](craft3:craft\config\GeneralConfig::$useSslOnTokenizedUrls)



トークン化された URL を生成する際に、Craft が使用するプロトコル / スキーマを決定します。`'auto'` をセットすると、Craft は現在のリクエストの siteUrl とプロトコルをチェックし、いずれかが https であればトークン化された URL で `https` を使用します。そうでなければ、`http` を使用します。

`false` をセットすると、Craft は常に `http` を使用します。そして、`true` をセットすると、Craft は常に `https` を使用します。



### `userSessionDuration`

許可される型

:   `mixed`

デフォルト値

:   `3600`

定義元

:   [GeneralConfig::$userSessionDuration](craft3:craft\config\GeneralConfig::$userSessionDuration)



ユーザーがアクティブではないためにログアウトするまでの時間。

事前に決定した時間ではなく、ユーザーがブラウザを開いている間はログインしたままにしておきたい場合は、`0` をセットします。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `verificationCodeDuration`

許可される型

:   `mixed`

デフォルト値

:   `86400`

定義元

:   [GeneralConfig::$verificationCodeDuration](craft3:craft\config\GeneralConfig::$verificationCodeDuration)



期限切れになる前に、ユーザー確認コードを使用できる時間。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `verifyEmailPath`

許可される型

:   `mixed`

デフォルト値

:   `'verifyemail'`

定義元

:   [GeneralConfig::$verifyEmailPath](craft3:craft\config\GeneralConfig::$verifyEmailPath)

それ以降

:   3.4.0



Craft がフロントエンドのメールアドレスの確認リンクに使用する URI。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `verifyEmailSuccessPath`

許可される型

:   `mixed`

デフォルト値

:   `''`

定義元

:   [GeneralConfig::$verifyEmailSuccessPath](craft3:craft\config\GeneralConfig::$verifyEmailSuccessPath)

それ以降

:   3.1.20



コントロールパネルにアクセスできないユーザーが、新しいメールアドレスを確認したときにリダイレクトする URI。

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。




<!-- END SETTINGS -->
