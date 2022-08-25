# Application Configuration

Craft’s entire [application configuration](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations) can be customized via `config/app.php`. Any items in the returned array will get merged into the main application configuration array.

You can further customize the application configuration for only web requests or console requests from `config/app.web.php` and `config/app.console.php`.

::: warning
New [Craft projects](https://github.com/craftcms/craft) include a stub of `app.php` to set an app ID and [bootstrap an example Module](#modules). Most applications will _not_ require any deeper application config.
:::

## Common Components

We'll only cover a few commonly-customized components here. Refer to Craft's own [src/config/app.php](https://github.com/craftcms/cms/blob/main/src/config/app.php), [app.web.php](https://github.com/craftcms/cms/blob/main/src/config/app.web.php) and [app.console.php](https://github.com/craftcms/cms/blob/main/src/config/app.console.php) when determining what components and properties can be customized. For example, Craft swaps out <craft4:craft\web\Request> for <craft4:craft\console\Request> to help smooth over some differences in Yii's HTTP and CLI APIs.

Even in the native application config map, some properties are omitted for brevity. Every component will be declared either as a closure (with an internal call to a config factory helper) or an array with a `class` key. All public properties (as well as private properties with the appropriate magic getter/setter methods) on those classes are configurable!

### Cache

By default, Craft will store data caches in the `storage/runtime/cache/` folder. You can configure Craft to use alternative [cache storage](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage) by overriding the `cache` application component from `config/app.php`.

::: tip
To help avoid key collisions with non-standard cache drivers, set a unique application `id`. See the  [Craft starter project](https://github.com/craftcms/craft/blob/main/config/app.php#L23) for an example of how this is configured, then run the following command to append a `CRAFT_APP_ID` variable to your `.env` file:

    php craft setup/app-id
:::

#### Database Example

If you want to store data caches in the database, first you will need to create a `cache` table as specified by <yii2:yii\caching\DbCache::$cacheTable>. Craft provides a console command for convenience, which will honor your [`tablePrefix`](db.md#tableprefix) setting:

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

### Database

If you need to configure the database connection beyond what’s possible with Craft’s [database config settings](db.md), you can do that by overriding the `db` component.

This example sets up read/write splitting by defining read replicas. The writer will be whatever is configured in `config/db.php`.

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

### Session

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
The `session` component **must** have the <craft4:craft\behaviors\SessionBehavior> behavior attached, which provides methods that the system relies on. This is handled by the factory function in the closure above, but when configuring the component from scratch, you must explicitly include it by setting `$config['as session'] = SessionBehavior::class;`, where `as session` is a [Yii shorthand](https://www.yiiframework.com/doc/guide/2.0/en/concept-configurations#configuration-format) for attaching behaviors via a configuration object.
:::

### Mailer

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

### Queue

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

## Modules

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.
