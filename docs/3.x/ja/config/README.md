# Testing

Craft は、ウェブ上でさらなる独自のデジタル体験を創造するための、柔軟でユーザーフレンドリーな CMS です。

## Introduction

Craft は、いくつかの[一般設定](config-settings.md)をサポートしています。 `config/general.php` ファイルでデフォルト値を上書きすることができます。

```php
return [
    'devMode' => true,
];
```

## Craft testing framework

Craft は、いくつかの[データベース接続設定](db-settings.md)をサポートしています。 `config/db.php` ファイルでデフォルト値を上書きすることができます。

## 打ち込む

Craft uses [Guzzle](http://docs.guzzlephp.org/en/latest/) whenever creating HTTP requests, such as:

- コンテンツ制作や管理業務のための、直感的でユーザーフレンドリーなコントロールパネル。
- コンテンツやその消費方法については想定されていない、コンテンツのモデリングや[フロントエンド開発](dev/README.md)のための真っ新なアプローチです。
- クリックするだけの、何百という無料、および、商用[プラグイン](https://plugins.craftcms.com/)を備える組み込みのプラグインストア。
- [モジュールおよびプラグイン開発](extend/README.md)のための、強靭なフレームワーク。

`config/` フォルダに `guzzle.php` ファイルを作成することによって、これらのリクエストを送信する際に Guzzle が使用するコンフィグ設定をカスタマイズできます。 The file does not support Craft’s [multi-environment configuration](#environmental-configuration) and should return an array, with your config overrides.

```php
<?php

return [
    'headers' => ['Foo' => 'Bar'],
    'query'   => ['testing' => '123'],
    'auth'    => ['username', 'password'],
    'proxy'   => 'https://myproxy:1234',
];
```

ここで定義されたオプションは、新しい `GuzzleHttp\Client` インスタンスに渡されます。 利用可能なオプションのリストは、[Guzzle のドキュメント](http://docs.guzzlephp.org/en/latest/)を参照してください。

## エイリアス

Craft のいくつかの設定やファンクションでは、基本ファイルシステムのパスや URL を代用する [Yii エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)をサポートしています。 これには次ものが含まれます。

- **[Documentation](https://craftcms.com/docs/3.x/)** – 公式ドキュメントを読んでください。
- **[Guides](https://craftcms.com/guides)** – 公式ガイドに従ってください。
- **[#craftcms](https://twitter.com/hashtag/craftcms)** – Craft に関する最新ツイートをみてください。
- コンフィグ設定の <config3:resourceBasePath> と <config3:resourceBaseUrl> config settings
- Twig ファンクションの [svg()](../dev/functions.md#svg-svg-sanitize)

次のエイリアスは、そのまま利用可能です。

| エイリアス                | 説明                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `@app`               | Craft には、テンプレートへの Unix スタイルのファイルシステムのパスや `templates` フォルダからの相対パスという、それぞれのケースで適用される標準的なテンプレートパスのフォーマットがあります。 |
| `@config`            | `config/` フォルダのパス                                                                                           |
| `@contentMigrations` | `migrations/` フォルダのパス                                                                                       |
| `@craft`             | 例えば、`templates/recipes/entry.twig` にテンプレートがある場合、次のテンプレートパスで指し示すことができます。                                     |
| `@lib`               | `vendor/craftcms/cms/lib/` のパス                                                                              |
| `@root`              | ルートプロジェクトのパス（PHP 定数の [CRAFT_BASE_PATH](#craft-base-path) と同じ）                                             |
| `@runtime`           | `storage/runtime/` フォルダのパス                                                                                  |
| `@storage`           | `storage/` フォルダのパス                                                                                          |
| `@templates`         | 例えば、`templates/recipes/ingredients/index.twig` にテンプレートがある場合、次のテンプレートパスで指し示すことができます。                         |
| `@translations`      | `translations/` フォルダのパス                                                                                     |
| `@vendor`            | `vendor/` フォルダのパス                                                                                           |
| `@web`               | リクエストのために読み込まれた `index.php` ファイルを含むフォルダの URL                                                                |
| `@webroot`           | リクエストのために読み込まれた `index.php` ファイルを含むフォルダのパス                                                                  |

コンフィグ設定 <config3:aliases> config setting if needed. キャッシュポイズニングの脆弱性を避けるために、`@web` エイリアスを使用する場合は上書きすることを推奨します。

```php
'aliases' => [
    '@web' => 'https://my-project.com',
];
```

ウェブルートが `web/`、`public/`、`public_html/`、または、`html/` 以外だったり、Craft の実行ファイルと一緒に配置されていない場合、`@webroot` エイリアスを上書きして、コンソールコマンドに対して適切に定義されるようにする必要があります。

```php
'aliases' => [
    '@web' => 'https://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
];
```

コンフィグ設定 <config3:aliases> config setting as well. 例えば、アセットボリュームが存在するベース URL とベースパスを定義するエイリアスを作成したいかもしれません。

```php
'aliases' => [
    '@web' => 'https://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

[getenv()](http://php.net/manual/en/function.getenv.php) を使用して、エイリアスの定義にセットすることができます。

必要であれば、`.env` ファイルや環境設定のどこかで、環境変数のエイリアス値をセットできます。

```bash
ASSETS_BASE_URL=https://my-project.com/assets
ASSETS_BASE_PATH=/path/to/webroot/assets
```

[getenv()](http://php.net/manual/en/function.getenv.php) を利用して、エイリアスの定義にセットできます。

```php
'aliases' => [
    '@assetBaseUrl' => getenv('ASSETS_BASE_URL'),
    '@assetBasePath' => getenv('ASSETS_BASE_PATH'),
],
```

::: tip
設定でエイリアスを参照する場合、URL やパスに追加のセグメントを付加することができます。 例えば、`@assetBaseUrl/user-photos` をボリュームのベース URL  にセットできます。
:::

::: tip
[alias()](../dev/functions.html#alias-string) ファンクションに渡すことによって、テンプレート内でエイリアスを解析できます。

```twig
{{ alias('@assetBaseUrl') }}
```
:::

## URL ルール

`config/routes.php` にカスタムの [URL ルール](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) を定義することができます。 詳細については、[ローカライゼーションガイド](../sites.md)を参照してください。

## PHP 定数

`config/app.php` から、Craft の [Yii アプリケーション設定](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations)全体をカスタマイズできます。 配列として返された項目は、 メインのアプリケーション設定の配列にマージされます。

You can customize Craft’s application configuration from `config/app.php`, such as overriding component configs, or adding new modules and components.

::: tip
Craft のデフォルト設定は [src/config/app.php](https://github.com/craftcms/cms/blob/main/src/config/app.php)、[app.web.php](https://github.com/craftcms/cms/blob/main/src/config/app.web.php)、および、[app.console.php](https://github.com/craftcms/cms/blob/main/src/config/app.console.php) によって定義されています。 既存のアプリケーションコンポーネントを上書きする必要がある場合、これらのファイルを参照してください。 :::
:::

### Cache コンポーネント

デフォルトでは、Craft は `storage/runtime/cache/` フォルダにデータキャッシュを蓄積します。 `config/app.php` で `cache` アプリケーションコンポーネントを上書きすることによって、代替の[キャッシュストレージ](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage)を使うよう Craft を設定できます。

::: tip
Make sure that your `config/app.php` file is setting a unique `id` for your application, like [new Craft projects are doing](https://github.com/craftcms/craft/blob/master/config/app.php#L23). If not, add that missing line, and run the following command to add a unique `APP_ID` environment variable to your `.env` file:

    php craft setup/app-id
:::

#### データベースキャッシュの実例

データキャッシュをデータベースに保存したい場合、はじめに <yii2:yii\caching\DbCache::$cacheTable> で指定された `cache` テーブルを作成する必要があります。 Craft は便利な CLI コマンドを提供します。

```bash
php craft setup/db-cache-table
```

それが完了したら、`cache` アプリケーションコンポーネントで <craft3:craft\cache\DbCache> を使うように設定できます。

```php
<?php
return [
    'components' => [
        'cache' => craft\cache\DbCache::class,
    ],
];
```

::: tip
もし <craft3:craft\cache\DbCache> ではなく <yii2:yii\caching\DbCache> を使うよう既に Craft を設定している場合、`cache` テーブルの `dateCreated`、`dateUpdated`、および、 `uid` カラムを削除すれば、安全に切り替えることができます。 :::
:::

#### APC の実例

```php
<?php
return [
    'components' => [
        'cache' => [
            'class' => yii\caching\MemCache::class,
            'useMemcached' => true,
            'username' => getenv('MEMCACHED_USERNAME'),
            'password' => getenv('MEMCACHED_PASSWORD'),
            'defaultDuration' => 86400,
            'servers' => [
                [
                    'host' => 'localhost',
                    'persistent' => true,
                    'port' => 11211,
                    'retryInterval' => 15,
                    'status' => true,
                    'timeout' => 15,
                    'weight' => 1,
                ],
            ],
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```


#### Memcached の実例

```php
<?php
return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => 'localhost',
            'port' => 6379,
            'password' => getenv('REDIS_PASSWORD'),
        ],
        'cache' => [
            'class' => yii\redis\Cache::class,
            'defaultDuration' => 86400,
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```

#### Redis の実例

Redis キャッシュストレージを利用するには、あらかじめ [yii2-redis](https://github.com/yiisoft/yii2-redis) ライブラリをインストールする必要があります。 次に、Craft の `cache` コンポーネントでそれを利用するよう設定します。

```php
<?php
return [
    'components' => [
        'db' => function() {
            // Get the default component config
            $config = craft\helpers\App::dbConfig();

            // Use read/write query splitting
            // (requires Craft 3.4.25 or later)

            // Define the default config for replica DB connections
            $config['replicaConfig'] = [
                'username' => getenv('DB_REPLICA_USER'),
                'password' => getenv('DB_REPLICA_PASSWORD'),
                'tablePrefix' => getenv('DB_TABLE_PREFIX'),
                'attributes' => [
                    // Use a smaller connection timeout
                    PDO::ATTR_TIMEOUT => 10,
                ],
                'charset' => 'utf8',
            ];

            // Define the replica DB connections
            $config['replicas'] = [
                ['dsn' => getenv('DB_REPLICA_DSN_1')],
                ['dsn' => getenv('DB_REPLICA_DSN_2')],
                ['dsn' => getenv('DB_REPLICA_DSN_3')],
                ['dsn' => getenv('DB_REPLICA_DSN_4')],
            ];

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

### Database コンポーネント

If you need to configure the database connection beyond what’s possible with Craft’s [database config settings](db-settings.md), you can do that by overriding the `db` component.

This example configures read/write splitting by defining read replicas. The writer will be whatever’s configured in `config/db.php`.

```php
<?php
return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => 'localhost',
            'port' => 6379,
            'password' => getenv('REDIS_PASSWORD'),
        ],
        'session' => function() {
            // Get the default component config
            $config = craft\helpers\App::sessionConfig();

            // Override the class to use Redis' session class
            $config['class'] = yii\redis\Session::class;

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

### Session コンポーネント

In a load-balanced environment, you may want to override the default `session` component to store PHP session data in a centralized location.

#### Redis の実例

```php
<?php
return [
    'components' => [
        'cache' => [
            'class' => yii\caching\ApcCache::class,
            'useApcu' => true,
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```

#### データベースの実例

First, you must create the database table that will store PHP’s sessions. You can do that by running the `craft setup/php-session-table` console command from your project’s root folder.

```php
<?php
return [
    'components' => [
        'session' => function() {
            // Get the default component config
            $config = craft\helpers\App::sessionConfig();

            // Override the class to use DB session class
            $config['class'] = yii\web\DbSession::class;

            // Set the session table name
            $config['sessionTable'] = craft\db\Table::PHPSESSIONS;

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

::: tip
The `session` component **must** be configured with the <craft3:craft\behaviors\SessionBehavior> behavior, which adds methods to the component that the system relies on.
:::

### Mailer コンポーネント

To override the `mailer` component config (which is responsible for sending emails), do this in `config/app.php`:

```php
<?php
return [
    'components' => [
        'mailer' => function() {
            // Get the stored email settings
            $settings = craft\helpers\App::mailSettings();

            // Override the transport adapter class
            $settings->transportType = craft\mailgun\MailgunAdapter::class;

            // Override the transport adapter settings
            $settings->transportSettings = [
                'domain' => 'foo.com',
                'apiKey' => 'key-xxxxxxxxxx',
            ];

            // Create a Mailer component config with these settings
            $config = craft\helpers\App::mailerConfig($settings);

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

::: tip
Any changes you make to the Mailer component from `config/app.php` will not be reflected when testing email settings from Settings → Email.
:::

### Queue コンポーネント

Craft’s job queue is powered by the [Yii2 Queue Extension](https://github.com/yiisoft/yii2-queue). By default Craft will use a [custom queue driver](craft3:craft\queue\Queue) based on the extension’s [DB driver](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/driver-db.md), but you can switch to a different driver by overriding Craft’s `queue` component from `config/app.php`:

```php
<?php
return [
    'components' => [
        'queue' => [
            'class' => yii\queue\redis\Queue::class,
            'redis' => 'redis', // Redis connection component or its config
            'channel' => 'queue', // Queue channel key
        ],
    ],
];
```

Available drivers are listed in the [Yii2 Queue Extension documentation](https://github.com/yiisoft/yii2-queue/tree/master/docs/guide).

::: warning
Only drivers that implement <craft3:craft\queue\QueueInterface> will be visible within the control panel.
:::

::: tip
If your queue driver supplies its own worker, set the <config3:runQueueAutomatically> config setting to `false` in `config/general.php`.
:::

### モジュール

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.

## アプリケーション設定

Some settings should be defined on a per-environment basis. For example, when developing locally, you may want your site’s base URL to be `http://my-project.test`, but on production it should be `https://my-project.com`.

### コントロールパネルの設定

Some settings in the control panel can be set to environment variables (like the ones defined in your `.env` file):

- 一般
  - **システム名**
- サイト
  - **ペース URL**
- セクション
  - **プレビューターゲットの URI**
- アセットボリューム
  - **ペース URL**
  - **[Stack Exchange](http://craftcms.stackexchange.com/)** – お互いに助け合ってください。
- メール
  - **システムのメールアドレス**
  - **差出人の名前**
  - **HTML メールのテンプレート**
  - **[nystudio107 Blog](https://nystudio107.com/blog)** – Craft やモダンなウェブ開発について学んでください。
  - **パスワード**（Gmail、および、SMTP）
  - **ホスト名**（SMTP）
  - **[Craft Link List](http://craftlinklist.com/)** – 事情通でいてください。

To set these settings to an environment variable, type `$` followed by the environment variable’s name.

![A volume’s Base URL setting](../images/volume-base-url-setting.jpg)

Only the environment variable’s name will be stored in your database or project config, so this is a great way to set setting values that may change per-environment, or contain sensitive information.

::: tip
Plugins can add support for environment variables and aliases in their settings as well. See [Environmental Settings](../extend/environmental-settings.md) to learn how.
:::

#### コントロールパネルの設定内でのエイリアスの利用

Some of these settings—the ones that store a URL or a file system path—can also be set to [aliases](README.md#aliases), which is helpful if you just want to store a base URL or path in an environment variable, and append additional segments onto it.

For example, you can define a `ROOT_URL` environment variable that is set to the root URL of your site:

```bash
# -- .env --
ROOT_URL="http://my-project.test"
```
Then create a `@rootUrl` alias that references it:

```php
// -- config/general.php --
'aliases' => [
    '@rootUrl' => getenv('ROOT_URL'),
],
```

Then you could go into your User Photos volume’s settings (for example) and set its Base URL to `@rootUrl/images/user-photos`.

### コンフィグファイル

You can set your [general config settings](config-settings.md), [database connection settings](db-settings.md), and other PHP config files to environment variables using Craft’s [App::env()](craft3:craft\helpers\App::env()) function:

```bash
# -- .env --
CP_TRIGGER="secret-word"
```

```php
// -- config/general.php --
'cpTrigger' => getenv('CP_TRIGGER') ?: 'admin',
```

#### マルチ環境設定

Craft’s PHP config files can optionally define separate config settings for each individual environment.

```php
// -- config/general.php --
return [
    // Global settings
    '*' => [
        'omitScriptNameInUrls' => true,
    ],

    // Dev environment settings
    'dev' => [
        'devMode' => true,
    ],

    // Production environment settings
    'production' => [
        'cpTrigger' => 'secret-word',
    ],
];
```

The `'*'` key is required here so Craft knows to treat it as a multi-environment key, but the other keys are up to you. Craft will look for the key(s) that match the [CRAFT_ENVIRONMENT](#craft-environment) PHP constant, which should be defined by your `web/index.php` file. (Your server’s hostname will be used as a fallback.)

By default, new Craft 3 projects will define the [CRAFT_ENVIRONMENT](#craft-environment) constant using an environment variable called `ENVIRONMENT`, which is defined in the `.env` file:

```bash
# -- .env --
ENVIRONMENT="dev"
```

```php
// -- web/index.php --
define('CRAFT_ENVIRONMENT', craft\helpers\App::env('ENVIRONMENT') ?: 'production');
```

## PHP 定数

Your `web/index.php` and `craft` files can define certain PHP constants Craft’s bootstrap script will check for while loading and configuring Craft.

::: tip
Constants you set in `web/index.php` will be used for web-based requests, while any you set in your root `craft` file will be used for console requests.
:::

### `CRAFT_BASE_PATH`

The path to the **base directory** that Craft will look for [config/](../directory-structure.md#config), [templates/](../directory-structure.md#templates), and other directories within by default. (It is assumed to be the parent of the `vendor/` folder by default.)

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

### `CRAFT_COMPOSER_PATH`

The path to the [composer.json](../directory-structure.md#composer-json) file. （デフォルトでは、ベースディレクトリ内に存在するものとします。

```php
define('CRAFT_COMPOSER_PATH', 'path/to/composer.json');
```

### `CRAFT_CONFIG_PATH`

The path to the [config/](../directory-structure.md#config) folder. (It is assumed to live within the base directory by default.)

### `CRAFT_CONTENT_MIGRATIONS_PATH`

The path to the [migrations/](../directory-structure.md#migrations) folder used to store content migrations. (It is assumed to live within the base directory by default.)

### `CRAFT_CP`

Dictates whether the current request should be treated as a control panel request.

```php
// Tell Craft that this is a control panel request
define('CRAFT_CP', true);
```

If this isn’t defined, Craft will treat the request as a control panel request if either of these are true:

- The <config3:baseCpUrl> がセット**されている**、かつ、リクエスト URL がこれではじまる（ <config3:cpTrigger> がセットされている場合、それも加えて）。
- The <config3:baseCpUrl> がセット**されていない**、かつ、リクエスト URI が <config3:cpTrigger> ではじまる。

### `CRAFT_ENVIRONMENT`

環境特有の設定配列を定義する際に[マルチ環境設定](../config/README.md#multi-environment-configs)が参照できる環境名。 (The [craftcms/craft](https://github.com/craftcms/craft) starter project sets this to the value of an `ENVIRONMENT` environment variable, or falls back to `production` if it’s not defined.)

```php
// Set the environment from the ENVIRONMENT env var, or default to 'production'
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
```

### `CRAFT_EPHEMERAL`

`true` として定義されている場合、Craft は一時または読み取り専用ストレージのある環境で利用できないファイルシステムのパーミッションチェックや操作をスキップします。

### `CRAFT_LICENSE_KEY`

何らかの理由で、ライセンスキーファイルではなく PHP によって定義されなければならい場合の Craft のライセンスキー。 （有効なライセンスキーを取得するまで、これをセットしないでください。 ）

```php
// Tell Craft to get its license key from a `LICENSE_KEY` environment variable
define('CRAFT_LICENSE_KEY', craft\helpers\App::env('LICENSE_KEY'));
```

### `CRAFT_LICENSE_KEY_PATH`

ファイル名を含めた Craft がライセンスキーファイルを保存するパス。 （デフォルトでは、[config/](../directory-structure.md#config) フォルダ内に `license.key` が保存されます。 ）

### `CRAFT_LOG_PHP_ERRORS`

Craft が PHP の [log_errors](http://php.net/manual/en/errorfunc.configuration.php#ini.log-errors) 設定をセットすることを抑制し、`php.ini` 内の設定に任せるよう `false` をセットすることもできます。

```php
// Don't send PHP error logs to storage/logs/phperrors.log
define('CRAFT_LOG_PHP_ERRORS', false);
```

### `CRAFT_SITE`

Craft がこの `index.php` ファイルから提供するべき、サイトハンドル、または、サイト ID。 （明確な理由がある場合のみ、これをセットしてください。 セットされていなければ、Craft はリクエスト URL を調査することで正しいサイトを自動的に配信します。 ）

```php
// Show the German site
define('CRAFT_SITE', 'de');
```

### `CRAFT_STORAGE_PATH`

[storage/](../directory-structure.md#storage) フォルダのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

::: tip
必ず有効なフォルダパスをセットしてください。
:::

### `CRAFT_STREAM_LOG`

When set to `true`, Craft will additionally send log output to `stderr` and `stdout`.

### `CRAFT_TEMPLATES_PATH`

[templates/](../directory-structure.md#templates) フォルダのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

### `CRAFT_TRANSLATIONS_PATH`

`translations/` フォルダのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

### `CRAFT_VENDOR_PATH`

[vendor/](../directory-structure.md#vendor) フォルダのパス。 （デフォルトでは、起動スクリプトによって4つのディレクトリが稼働しているものとします。


