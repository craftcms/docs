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

モジュールは新しい[ダッシュボードウィジェットタイプ](widget-types.md)を提供するような単一の目的を満たすためにシンプルか、 Eコマースアプリケーションのような完全に新しいコンセプトをシステムに導入するために複雑であり得ます。

- コンテンツ制作や管理業務のための、直感的でユーザーフレンドリーなコントロールパネル。
- コンテンツやその消費方法については想定されていない、コンテンツのモデリングや[フロントエンド開発](dev/README.md)のための真っ新なアプローチです。
- クリックするだけの、何百という無料、および、商用[プラグイン](https://plugins.craftcms.com/)を備える組み込みのプラグインストア。
- [モジュールおよびプラグイン開発](extend/README.md)のための、強靭なフレームワーク。

`config/` フォルダに `guzzle.php` ファイルを作成することによって、これらのリクエストを送信する際に Guzzle が使用するコンフィグ設定をカスタマイズできます。 そのファイルは、設定を上書きした配列を返さなければなりません。

```php
<?php

return [
    'headers' => ['Foo' => 'Bar'],
    'query'   => ['testing' => '123'],
    'auth'    => ['username', 'password'],
    'proxy'   => 'tcp://localhost:80',
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
    '@assetBaseUrl' => 'http://my-project.com/assets',
    '@assetBasePath' => '/path/to/web/assets',
],
```

ウェブルートが `web/`、`public/`、`public_html/`、または、`html/` 以外だったり、Craft の実行ファイルと一緒に配置されていない場合、`@webroot` エイリアスを上書きして、コンソールコマンドに対して適切に定義されるようにする必要があります。

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
];
```

コンフィグ設定 <config3:aliases> config setting as well. 例えば、アセットボリュームが存在するベース URL とベースパスを定義するエイリアスを作成したいかもしれません。

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

[getenv()](http://php.net/manual/en/function.getenv.php) を使用して、エイリアスの定義にセットすることができます。

必要であれば、`.env` ファイルや環境設定のどこかで、環境変数のエイリアス値をセットできます。

```bash
ASSETS_BASE_URL=http://my-project.com/assets
ASSETS_BASE_PATH=/path/to/web/assets
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
Craft’s default configuration is defined by [src/config/app.php](https://github.com/craftcms/cms/blob/main/src/config/app.php), [app.web.php](https://github.com/craftcms/cms/blob/main/src/config/app.web.php), and [app.console.php](https://github.com/craftcms/cms/blob/main/src/config/app.console.php). 既存のアプリケーションコンポーネントを上書きする必要がある場合、これらのファイルを参照してください。 :::
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

Craft の[データベース接続設定](db-settings.md)で可能な範囲を超えるデータベース接続の設定が必要な場合、`db` コンポーネントを上書きすることによって可能になります。

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

::: tip
`session` コンポーネントは、システムが依存するコンポーネントにメソッドを加える <craft3:craft\behaviors\SessionBehavior> ビヘイビアで設定**しなければなりません**。
:::

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

はじめに、PHP セッションを保存するデータベーステーブルを作成しなければなりません。 プロジェクトのルートフォルダから `craft setup/php-session-table` コンソールコマンドを実行すればできます。

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

（メール送信を担っている）`mailer` コンポーネントの設定を上書きするために、`config/app.php` を調整します。

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
`config/app.php` から Mailer コンポーネントに行った変更は、「設定 > メール」からメールの設定をテストする際には反映されません。 :::
:::

### Queue コンポーネント

Craft のジョブキューは [Yii2 Queue Extension](https://github.com/yiisoft/yii2-queue) によって動いています。 デフォルトでは、Craft はエクステンションの [DB driver](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/driver-db.md) をベースとする [custom queue driver](craft3:craft\queue\Queue) を使用しますが、`config/app.php` から Craft の `queue` コンポーネントを上書きすることによって、別のドライバに切り替えることができます。

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

利用可能なドライバは、[Yii2 Queue Extension documentation](https://github.com/yiisoft/yii2-queue/tree/master/docs/guide) に記載されています。

::: warning
<craft3:craft\queue\QueueInterface> を実装しているドライバだけがコントロールパネル内に表示されます。 :::
:::

::: tip
キュードライバが独自のワーカーを提供している場合、`config/general.php` の <config3:runQueueAutomatically> コンフィグ設定を `false` に設定します。 :::
:::

### モジュール

`config/app.php` からカスタム Yii モジュールを登録し bootstrap することもできます。 詳細については、[モジュールの構築方法](../extend/module-guide.md)を参照してください。

## アプリケーション設定

いくつかの設定は、それぞれの環境ごとに定義する必要があります。 例えば、ローカル環境での開発時はサイトのベース URL を `http://my-project.test`、本番環境では `https://my-project.com` にしたいかもしれません。

### コントロールパネルの設定

コントロールパネル内のいくつかの設定は、（`.env` ファイルで定義されているような）環境変数にセットできます。

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

環境変数の名前だけがデータベース、または、プロジェクトコンフィグ内に保存さるため、環境ごとに変更したり機密性の高い情報を含む設定値をセットするのにとても良い方法です。

![ボリュームのベース URL 設定](../images/volume-base-url-setting.jpg)

これらの設定を環境変数にセットするには、環境変数の名前を `$` に続けて入力してください。

::: tip
プラグインも同様に、それぞれの設定内で環境設定やエイリアスのためのサポートを追加できます。 どのようにするかを知るには、[環境設定](../extend/environmental-settings.md)を参照してください。 :::
:::

#### コントロールパネルの設定内でのエイリアスの利用

次に、それを参照するエイリアス `@rootUrl` を作成します。

これで（例として）ユーザーフォトのボリュームの設定画面に移動し、ベース URL に `@rootUrl/images/user-photos` をセットできます。

```bash
# -- .env --
ROOT_URL="http://my-project.test"
```
PHP の [getenv()](http://php.net/manual/en/function.getenv.php) ファンクションを利用して、環境変数を[一般設定](config-settings.md)、[データベース接続設定](db-settings.md)、および、他の PHP 設定ファイルにセットできます。

```php
// -- config/general.php --
'aliases' => [
    '@rootUrl' => getenv('ROOT_URL'),
],
```

Craft の PHP 設定ファイルは、オプションでそれぞれの環境ごとに別々の設定を定義できます。

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

Craft 3 プロジェクトは `.env` ファイルに定義された `ENVIRONMENT` 環境変数を利用して [CRAFT_ENVIRONMENT](#craft-environment) 定数を定義します。

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

Craft がマルチ環境のキーとしてそれを取り扱うことを知るために、ここでは `'*'` キーが必須となりますが、他のキーはあなた次第です。 Craft は `web/index.php` ファイルに定義されている PHP 定数  [CRAFT_ENVIRONMENT](#craft-environment) とマッチするキーを探します。 （フォールバックとして、サーバーのホスト名が使用されます。 ）

// -- web/index.php -- define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');

```bash
# -- .env --
ENVIRONMENT="dev"
```

```php
// -- web/index.php --
define('CRAFT_ENVIRONMENT', craft\helpers\App::env('ENVIRONMENT') ?: 'production');
```

## PHP 定数

`web/index.php` ファイルには、Craft の読み込みと環境設定を行う際に、Craft の起動スクリプトがチェックする PHP 定数を定義できます。

### `CRAFT_BASE_PATH`

Craft がデフォルトで探す [config/](../directory-structure.md#config)、[templates/](../directory-structure.md#templates)、および、他のディレクトリの**ベースディレクトリ**のパス。 （デフォルトでは、`vendor/` フォルダの親とみなされます。 ）

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

### `CRAFT_COMPOSER_PATH`

[composer.json](../directory-structure.md#composer-json) ファイルのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

```php
define('CRAFT_COMPOSER_PATH', 'path/to/composer.json');
```

### `CRAFT_CONFIG_PATH`

[config/](../directory-structure.md#config) フォルダのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

### `CRAFT_CONTENT_MIGRATIONS_PATH`

コンテンツマイグレーションの保管に使用される [migrations/](../directory-structure.md#migrations) フォルダのパス。 （デフォルトでは、ベースディレクトリ内に存在するものとします。

### `CRAFT_CP`

現在のリクエストをコントロールパネルのリクエストとして扱うかどうかを指定します。

```php
// Tell Craft that this is a control panel request
define('CRAFT_CP', true);
```

これが定義されていない場合、Craft は次のいずれかが true であればコントロールパネルのリクエストとして扱います。

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


