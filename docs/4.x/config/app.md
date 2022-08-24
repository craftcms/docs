# Application Configuration

You can customize Craft’s entire [Yii application configuration](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations) from `config/app.php`. Any items returned by that array will get merged into the main application configuration array.

You can also customize Craft’s application configuration for only web requests or console requests from `config/app.web.php` and `config/app.console.php`.

::: tip
Craft’s default configuration is defined by [src/config/app.php](https://github.com/craftcms/cms/blob/main/src/config/app.php), [app.web.php](https://github.com/craftcms/cms/blob/main/src/config/app.web.php), and [app.console.php](https://github.com/craftcms/cms/blob/main/src/config/app.console.php). Refer to these files when you need to override existing application components.
:::

### Cache Component

By default, Craft will store data caches in the `storage/runtime/cache/` folder. You can configure Craft to use alternative [cache storage](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage) by overriding the `cache` application component from `config/app.php`.

::: tip
Make sure that your `config/app.php` file is setting a unique `id` for your application, like [new Craft projects are doing](https://github.com/craftcms/craft/blob/main/config/app.php#L23). If not, add that missing line, and run the following command to add a unique `CRAFT_APP_ID` environment variable to your `.env` file:

    php craft setup/app-id
:::

#### Database Cache Example

If you want to store data caches in the database, first you will need to create a `cache` table as specified by <yii2:yii\caching\DbCache::$cacheTable>. Craft provides a console command for convenience:

```bash
php craft setup/db-cache-table
```

Once that’s done, you can set your `cache` application component to use <craft4:craft\cache\DbCache>.

```php
<?php
return [
    'components' => [
        'cache' => craft\cache\DbCache::class,
    ],
];
```

::: tip
If you’ve already configured Craft to use <yii2:yii\caching\DbCache> rather than <craft4:craft\cache\DbCache>, you can safely switch to the latter if you remove your `cache` table’s `dateCreated`, `dateUpdated`, and `uid` columns.
:::

#### APC Example

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'cache' => [
            'class' => yii\caching\ApcCache::class,
            'useApcu' => true,
            'keyPrefix' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
        ],
    ],
];
```


#### Memcached Example

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'cache' => [
            'class' => yii\caching\MemCache::class,
            'useMemcached' => true,
            'username' => App::env('MEMCACHED_USERNAME'),
            'password' => App::env('MEMCACHED_PASSWORD'),
            'defaultDuration' => 86400,
            'servers' => [
                [
                    'host' => App::env('MEMCACHED_HOST') ?: 'localhost',
                    'persistent' => true,
                    'port' => 11211,
                    'retryInterval' => 15,
                    'status' => true,
                    'timeout' => 15,
                    'weight' => 1,
                ],
            ],
            'keyPrefix' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
        ],
    ],
];
```

#### Redis Example

To use Redis cache storage, you will first need to install the [yii2-redis](https://github.com/yiisoft/yii2-redis) library. Then configure Craft’s `cache` component to use it:

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
            'port' => 6379,
            'password' => App::env('REDIS_PASSWORD') ?: null,
        ],
        'cache' => [
            'class' => yii\redis\Cache::class,
            'defaultDuration' => 86400,
            'keyPrefix' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
        ],
    ],
];
```

### Database Component

If you need to configure the database connection beyond what’s possible with Craft’s [database config settings](db.md), you can do that by overriding the `db` component.

This example configures read/write splitting by defining read replicas. The writer will be whatever’s configured in `config/db.php`.

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'db' => function() {
            // Get the default component config
            $config = App::dbConfig();

            // Use read/write query splitting
            // (requires Craft 3.4.25 or later)

            // Define the default config for replica DB connections
            $config['replicaConfig'] = [
                'username' => App::env('DB_REPLICA_USER'),
                'password' => App::env('DB_REPLICA_PASSWORD'),
                'tablePrefix' => App::env('CRAFT_DB_TABLE_PREFIX'),
                'attributes' => [
                    // Use a smaller connection timeout
                    PDO::ATTR_TIMEOUT => 10,
                ],
                'charset' => 'utf8',
            ];

            // Define the replica DB connections
            $config['replicas'] = [
                ['dsn' => App::env('DB_REPLICA_DSN_1')],
                ['dsn' => App::env('DB_REPLICA_DSN_2')],
                ['dsn' => App::env('DB_REPLICA_DSN_3')],
                ['dsn' => App::env('DB_REPLICA_DSN_4')],
            ];

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

### Session Component

In a load-balanced environment, you may want to override the default `session` component to store PHP session data in a centralized location.

::: tip
The `session` component should be overridden from `app.web.php` so it gets defined for web requests, but not console requests.
:::

#### Redis Example

```php
// config/app.php
<?php

use craft\helpers\App;

return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
            'port' => 6379,
            'password' => App::env('REDIS_PASSWORD') ?: null,
        ],
    ],
];
```

```php
// config/app.web.php
<?php

use craft\helpers\App;

return [
    'components' => [
        'session' => function() {
            // Get the default component config
            $config = App::sessionConfig();

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
The `session` component **must** be configured with the <craft4:craft\behaviors\SessionBehavior> behavior, which adds methods to the component that the system relies on.
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
                'domain' => 'my-project.tld',
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
Any changes you make to the Mailer component from `config/app.php` will not be reflected when testing email settings from **Settings** → **Email**.
:::

### Queue Component

Craft’s job queue is powered by the [Yii2 Queue Extension](https://github.com/yiisoft/yii2-queue). By default Craft will use a [custom queue driver](craft4:craft\queue\Queue) based on the extension’s [DB driver](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/driver-db.md).

You can switch to a different driver by overriding Craft’s `queue` component from `config/app.php`, however that will result in a loss of visibility into the queue’s state from the control panel. Instead you should take a hybrid approach, by setting your custom queue driver config on <craft4:craft\queue\Queue::$proxyQueue>:

```php
<?php
return [
    'components' => [
        'queue' => [
            'proxyQueue' => [
                'class' => yii\queue\redis\Queue::class,
                'redis' => 'redis', // Redis connection component or its config
                'channel' => 'queue', // Queue channel key
            ],
        ],
    ],
];
```

Available drivers are listed in the [Yii2 Queue Extension documentation](https://github.com/yiisoft/yii2-queue/tree/master/docs/guide).

::: warning
Only drivers that implement <craft4:craft\queue\QueueInterface> will be visible within the control panel.
:::

::: tip
If your queue driver supplies its own worker, set the <config4:runQueueAutomatically> config setting to `false` in `config/general.php`.
:::

### Modules

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.
