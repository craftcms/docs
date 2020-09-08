# Craft の拡張

Craft では、テンプレートを利用してサイトの HTML 出力を定義します。

## モジュール 対 プラグイン

Craft は、いくつかの[一般設定](config-settings.md)をサポートしています。 `config/general.php` ファイルでデフォルト値を上書きすることができます。

```php
return [
    'devMode' => true,
];
```

## テンプレートのローカライゼーション

Craft は、いくつかの[データベース接続設定](db-settings.md)をサポートしています。 `config/db.php` ファイルでデフォルト値を上書きすることができます。

## Guzzle 設定

モジュールは新しい[ダッシュボードウィジェットタイプ](widget-types.md)を提供するような単一の目的を満たすためにシンプルか、 Eコマースアプリケーションのような完全に新しいコンセプトをシステムに導入するために複雑であり得ます。

- Craft のプラグインストアからインストール / 試用 / 購入することができます。
- インストール、アップデート、または、アンインストール時にデータベースを変更できます。
- コントロールパネルの「設定」セクション内に独自の設定ページを持てます。
- Composer コマンドを実行することなく、管理者によって有効 / 無効にすることができます。

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

- サイトのベース URL 設定
- ボリュームのベース URL 設定
- ローカルボリュームのファイルシステムパス設定
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

コンフィグ設定 <config3:aliases> config setting if needed. It’s recommended to override the `@web` alias if you plan on using it, to avoid a cache poisoning vulnerability.

```php
'aliases' => [
    '@assetBaseUrl' => 'http://my-project.com/assets',
    '@assetBasePath' => '/path/to/web/assets',
],
```

If your webroot is something besides `web/`, `public/`, `public_html/`, or `html/`, or it’s not located alongside your `craft` executable, you will also need to override the `@webroot` alias, so it can be defined properly for console commands.

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
];
```

You can define additional custom aliases using the <config3:aliases> config setting as well. For example, you may wish to create aliases that define the base URL and base path that your asset volumes will live in.

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

[getenv()](http://php.net/manual/en/function.getenv.php) を使用して、エイリアスの定義にセットすることができます。

If you’d like, you can set the alias values with environment variables, either from your `.env` file or somewhere in your environment’s configuration:

```bash
ASSETS_BASE_URL=http://my-project.com/assets
ASSETS_BASE_PATH=/path/to/web/assets
```

::: tip
[alias()](../dev/functions.html#alias-string) ファンクションに渡すことによって、テンプレート内でエイリアスをパースできます。

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
You can parse aliases in your templates by passing them to the [alias()](../dev/functions.html#alias-string) function:

```twig
{{ alias('@assetBaseUrl') }}
```
:::

## URL ルール

`config/routes.php` にカスタムの [URL ルール](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) を定義することができます。 詳細については、[ローカライゼーションガイド](../sites.md)を参照してください。

## PHP 定数

You can customize Craft’s entire [Yii application configuration](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations) from `config/app.php`. Any items returned by that array will get merged into the main application configuration array.

You can customize Craft’s application configuration from `config/app.php`, such as overriding component configs, or adding new modules and components.

::: tip
Craft’s default configuration is defined by [src/config/app.php](https://github.com/craftcms/cms/blob/master/src/config/app.php), [app.web.php](https://github.com/craftcms/cms/blob/master/src/config/app.web.php), and [app.console.php](https://github.com/craftcms/cms/blob/master/src/config/app.console.php). Refer to these files when you need to override existing application components.
:::

### Cache Component

By default, Craft will store data caches in the `storage/runtime/cache/` folder. You can configure Craft to use alternative [cache storage](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage) by overriding the `cache` application component from `config/app.php`.

#### Database Cache Example

If you want to store data caches in the database, first you will need to create a `cache` table as specified by <yii2:yii\caching\DbCache::$cacheTable>. Craft provides a CLI command for convenience:

```bash
php craft setup/db-cache-table
```

Once that’s done, you can set your `cache` application component to use <craft3:craft\cache\DbCache>.

```php
<?php
return [
    'components' => [
        'cache' => craft\cache\DbCache::class,
    ],
];
```

::: tip
PHP コードはテンプレート内で使用できませんが、Craft はニーズに合わせて様々な方法で [Twig を拡張する](../extend/extending-twig.md)手段を提供しています。
:::

#### APC Example

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


#### Memcached Example

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

#### Redis Example

To use Redis cache storage, you will first need to install the [yii2-redis](https://github.com/yiisoft/yii2-redis) library. Then configure Craft’s `cache` component to use it:

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

### Database Component

`config/app.php` から、コンポーネント設定を上書きしたり新しいモジュールやコンポーネントを追加するような Craft の [アプリケーション設定](app.md) をカスタマイズできます。

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

### Session Component

In a load-balanced environment, you may want to override the default `session` component to store PHP session data in a centralized location.

#### Redis Example

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

#### Database Example

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

### Mailer Component

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

### Queue Component

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

### Modules

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.

## アプリケーション設定

Some settings should be defined on a per-environment basis. For example, when developing locally, you may want your site’s base URL to be `http://my-project.test`, but on production it should be `https://my-project.com`.

### Control Panel Settings

Some settings in the control panel can be set to environment variables (like the ones defined in your `.env` file):

- General Settings
  - **System Name**
- Sites
  - **Base URL**
- Sections
  - **Preview Target URIs**
- Asset Volumes
  - **Base URL**
  - ほとんどのカスタマイズは、**モジュール**、または、**プラグイン**の形で行われます。
- Email
  - **System Email Address**
  - **Sender Name**
  - **HTML Email Template**
  - **Username** (Gmail and SMTP)
  - **Password** (Gmail and SMTP)
  - **Host Name** (SMTP)
  - **Port** (Port)

To set these settings to an environment variable, type `$` followed by the environment variable’s name.

![例えば、アセットボリュームが存在するベース URL とベースパスを定義するエイリアスを作成したいかもしれません。](../images/volume-base-url-setting.jpg)

Only the environment variable’s name will be stored in your database or project config, so this is a great way to set setting values that may change per-environment, or contain sensitive information.

::: tip
Plugins can add support for environment variables and aliases in their settings as well. See [Environmental Settings](../extend/environmental-settings.md) to learn how.
:::

#### Using Aliases in Control Panel Settings

You can configure core settings like system file paths and the active environment by defining certain [PHP constants]() in `web/index.php`.

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

### Config Files

You can set your [general config settings](config-settings.md), [database connection settings](db-settings.md), and other PHP config files to environment variables using PHP’s [getenv()](http://php.net/manual/en/function.getenv.php) function:

```bash
# -- .env --
CP_TRIGGER="secret-word"
```

```php
// -- config/general.php --
'cpTrigger' => getenv('CP_TRIGGER') ?: 'admin',
```

#### Multi-Environment Configs

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
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
```

## PHP Constants

Your `web/index.php` file can define certain PHP constants, which Craft’s bootstrap script will check for while loading and configuring Craft.

### `CRAFT_BASE_PATH`

The path to the **base directory** that Craft will look for [config/](../directory-structure.md#config), [templates/](../directory-structure.md#templates), and other directories within by default. (It is assumed to be the parent of the `vendor/` folder by default.)

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

### `CRAFT_COMPOSER_PATH`

The path to the [composer.json](../directory-structure.md#composer-json) file. (It is assumed to live within the base directory by default.)

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

- The <config3:baseCpUrl> setting **is** set, and the request URL begins with it (plus the <config3:cpTrigger> setting, if set).
- The <config3:baseCpUrl> setting **is not** set, and the request URI begins with the <config3:cpTrigger> setting.

### `CRAFT_ENVIRONMENT`

The environment name that [multi-environment configs](../config/README.md#multi-environment-configs) can reference when defining their environment-specific config arrays. (`$_SERVER['SERVER_NAME']` will be used by default.)

```php
// Set the environment from the ENVIRONMENT env var, or default to 'production'
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
```

### `CRAFT_EPHEMERAL`

When defined as `true`, Craft will skip file system permission checks and operations that are not available in an environment with ephemeral or read-only storage.

### `CRAFT_LICENSE_KEY`

Your Craft license key, if for some reason that must be defined by PHP rather than a license key file. (Don’t set this until you have a valid license key.)

### `CRAFT_LICENSE_KEY_PATH`

The path that Craft should store its license key file, including its filename. (It will be stored as `license.key` within your [config/](../directory-structure.md#config) folder by default.)

### `CRAFT_LOG_PHP_ERRORS`

Can be set to `false` to prevent Craft from setting PHP’s [log_errors](http://php.net/manual/en/errorfunc.configuration.php#ini.log-errors) setting, leaving it up to whatever’s set in `php.ini`.

```php
// Don't send PHP error logs to storage/logs/phperrors.log
define('CRAFT_LOG_PHP_ERRORS', false);
```

### `CRAFT_SITE`

The Site handle or ID that Craft should be serving from this `index.php` file. (Only set this if you have a good reason to. Craft will automatically serve the correct site by inspecting the requested URL, unless this is set.)

```php
// Show the German site
define('CRAFT_SITE', 'de');
```

### `CRAFT_STORAGE_PATH`

The path to the [storage/](../directory-structure.md#storage) folder. (It is assumed to live within the base directory by default.)

::: tip
Make sure you set this to a valid folder path, otherwise it will be ignored.
:::

### `CRAFT_TEMPLATES_PATH`

The path to the [templates/](../directory-structure.md#templates) folder. (It is assumed to live within the base directory by default.)

### `CRAFT_TRANSLATIONS_PATH`

The path to the `translations/` folder. (It is assumed to live within the base directory by default.)

### `CRAFT_VENDOR_PATH`

The path to the [vendor/](../directory-structure.md#vendor) folder. (It is assumed to live 4 directories up from the bootstrap script by default.)


