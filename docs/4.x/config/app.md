# Application Configuration

Craft’s entire [application configuration](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations) can be customized via `config/app.php`. Any items returned by an `app.php` config file will get merged into the main application configuration array.

You can further customize the application configuration for only web requests or console requests from `config/app.web.php` and `config/app.console.php`.

::: warning
New [Craft projects](https://github.com/craftcms/craft/tree/4.x) include a stub of `app.php` that exists solely to set an app ID, which affects how caches and sessions are stored. Most applications will _not_ require additional application config.
:::

## Approach

What follows differs in nature from other configuration you’ve likely encountered, so far: [general](README.md) and [database](db.md) config is handled via curated, publicly-documented settings that Craft pulls from to adjust its bootstrapping or runtime behavior. Application config, on the other hand, directly modifies [components](guide:structure-application-components) of the Craft application—either by customizing them in-place, or swapping them out with new ones.

Of course, this power comes with a greater risk of misconfiguration. Some components may also require a bit of independent research to discover available options; [configuring a component](https://www.yiiframework.com/doc/guide/2.0/en/concept-configurations) is in most cases simply defining properties the class initializes with, so some degree of comfort with source-diving and class reference will go a long way.

::: tip
Keep in mind that even when Craft doesn’t provide “defaults” explicitly in its own `app.php` config files (or config helper methods), the underlying component classes may have default property values—or even compute defaults based on other values.
:::

### Static

Most components’ config can be provided as a plain array, which gets merged with the default config map prior to initialization. This style is mostly used for customizing individual properties on a component:

```php
<?php
return [
    // ...
    'components' => [
        // Customize one property on an existing component:
        'deprecator' => [
            'throwExceptions' => App::env('HARD_MODE') ?: false,
        ],
    ],
];
```

### Closures

Craft uses functions to dynamically define some components—see [`app.php`](https://github.com/craftcms/cms/blob/4.x/src/config/app.php) and its `app.web.php` and `app.console.php` counterparts for a complete list in each context.

Components defined in this way should only be overridden with another function. The process will almost always look something like this:

1. Call the same helper method that Craft uses internally to build the base config object
2. Assign or reassign properties on it
3. Pass it to `Craft::createObject()` to initialize the component

If your intent is to completely replace a component, you can opt out of this pattern and define a config map from scratch. This may be necessary when properties coming from the helper method are incompatible with the new component—such is the case with alternate [cache drivers](#cache):

```php
<?php
return [
    // ...
    'components' => [
        // Adjust parts of a component based on the environment:
        'db' => function() {
            $config = craft\helpers\App::dbConfig();

            if (App::env('HIGH_AVAILABILITY')) {
                $config['replicaConfig'] = [
                    // ... Base replica DB configuration
                ];

                $config['replicas'] = [
                    // ... unique config for each replica, like hosts or DSNs.
                ];
            }

            return Craft::createObject($config);
        },

        // Completely re-define a component without letting defaults leak in:
        'cache' => function() {
            $config = [
                'class' => yii\redis\Cache::class,
                'redis' => [
                    // ... Redis connection configuration
                ],
            ];

            return Craft::createObject($config);
        },
    ],
];
```

## Common Components

We’ll only cover a few commonly-customized components here. Refer to Craft’s own [src/config/app.php](https://github.com/craftcms/cms/blob/4.x/src/config/app.php), [app.web.php](https://github.com/craftcms/cms/blob/4.x/src/config/app.web.php) and [app.console.php](https://github.com/craftcms/cms/blob/4.x/src/config/app.console.php) when determining what components are initialized for each type of request—for example, Craft uses two different `request` component classes (<craft4:craft\web\Request> and <craft4:craft\console\Request>) to help smooth over some differences in Yii’s HTTP and CLI APIs.

### Cache

By default, Craft will store data caches on disk in the `storage/runtime/cache/` folder. You can configure Craft to use alternative [cache storage](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage) layer by overriding the `cache` application component from `config/app.php`.

::: tip
To help avoid key collisions when sharing non-standard cache drivers between multiple applications, set a unique application `id`. See the [Craft starter project](https://github.com/craftcms/craft/blob/4.x/config/app.php#L25) for an example of how this is configured, then run the following command to generate and append a `CRAFT_APP_ID` value to your `.env` file:

    php craft setup/app-id
:::

#### Database Example

To store data caches in the database, create a `cache` table as specified by <yii2:yii\caching\DbCache::$cacheTable>. Craft provides a console command for convenience, which will honor your [`tablePrefix`](db.md#tableprefix) setting:

```bash
php craft setup/db-cache-table
```

Once that’s done, you can set your `cache` application component to use <craft4:craft\cache\DbCache>.

```php
<?php
return [
    'components' => [
        'cache' => function() {
            $config = [
                'class' => craft\cache\DbCache::class,
                'defaultDuration' => Craft::$app->config->general->cacheDuration,
            ];

            return Craft::createObject($config);
        },
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
        'cache' => function() {
            $config = [
                'class' => yii\caching\ApcCache::class,
                'useApcu' => true,
                'keyPrefix' => Craft::$app->id,
                'defaultDuration' => Craft::$app->config->general->cacheDuration,
            ];

            return Craft::createObject($config);
        }
    ],
];
```

#### Memcached Example

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'cache' => function() {
            $config = [
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
                'keyPrefix' => Craft::$app->id,
                'defaultDuration' => Craft::$app->config->general->cacheDuration,
            ];

            return Craft::createObject($config);
        },
    ],
];
```

<a name="cache-redis"></a>

#### Redis Example

To use Redis cache storage, install [yii2-redis](https://www.yiiframework.com/extension/yiisoft/yii2-redis) and replace your `cache` component with `yii\redis\Cache::class`, providing connection details to its `redis` property:

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'cache' => function() {
            $config = [
                'class' => yii\redis\Cache::class,
                'keyPrefix' => Craft::$app->id,
                'defaultDuration' => Craft::$app->config->general->cacheDuration,

                // Full Redis connection details:
                'redis' => [
                    'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
                    'port' => 6379,
                    'password' => App::env('REDIS_PASSWORD') ?: null,
                ],
            ];

            return Craft::createObject($config);
        },
    ],
];
```

::: warning
If you are also using Redis for [session](#session-redis) storage or the [queue](#queue), you should [set a unique `database`](https://www.yiiframework.com/extension/yiisoft/yii2-redis/doc/api/2.0/yii-redis-connection#$database-detail) for each component’s connection to prevent inadvertently flushing important data!
:::

### Database

If you need to configure the database connection beyond what’s possible with Craft’s [database config settings](db.md), you can do that by overriding the `db` component.

This example sets up read/write splitting by defining read replicas. The writer will be whatever is configured in `config/db.php`.

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'db' => function() {
            // Get the default component config (using values in `db.php`):
            $config = App::dbConfig();

            // Define the default config for replica connections:
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

            // Define the replica connections, with unique DSNs:
            $config['replicas'] = [
                ['dsn' => App::env('DB_REPLICA_DSN_1')],
                ['dsn' => App::env('DB_REPLICA_DSN_2')],
                ['dsn' => App::env('DB_REPLICA_DSN_3')],
                ['dsn' => App::env('DB_REPLICA_DSN_4')],
            ];

            // Instantiate and return the configuration object:
            return Craft::createObject($config);
        },
    ],
];
```

The `db` component is just Craft’s _default_ database connection—but your application can connect to _multiple_ databases by creating additional components.

For example, if you need to read some data from a legacy database as part of a migration, you could define a `legacydb` component with its own connection settings. Then, any <craft4:craft\db\Query> execution methods can be called using the alternate component:

::: code
```php app.php
use craft\helpers\App;

return [
    'components' => [
        'legacydb' => [
            'server' => App::env('LEGACY_DB_SERVER'),
            // ...
        ],
    ],
];
```
```php Example Query
use Craft;
use craft\db\Query;

$connection = Craft::$app->get('legacydb');

$legacyPosts = (new Query)
    ->select(['title', 'body', 'post_date'])
    ->from(['posts'])
    ->all($connection);
```
:::

::: warning
Note that if you need to supply custom PDO attributes to your primary database connection (for example, setting up an SSL connection to your database), you should do so via the `attributes` key in your `config/db.php` file, not from `config/app.php` while overriding the `db` component.
:::

### Log

Check out the [guide on Logging](../logging.md#customizing-logs) for some detailed examples.

### Session

In a load-balanced environment, you may want to override the default `session` component to store PHP session data in a centralized location.

The `session` component **must** have the <craft4:craft\behaviors\SessionBehavior> behavior attached to provide methods that the system relies on. When configuring the component from scratch, you must explicitly include it by setting an `as session` key to `craft\behaviors\SessionBehavior::class`, where `as session` is a [Yii shorthand](https://www.yiiframework.com/doc/guide/2.0/en/concept-configurations#configuration-format) for attaching behaviors via a configuration object.

::: warning
The `session` component should only be overridden from `app.web.php` so it gets defined for web requests, but not console requests.
:::

<a name="session-redis"></a>

#### Redis Example

```php
// config/app.web.php
<?php

use craft\helpers\App;

return [
    'components' => [
        'session' => function() {
            // Get the default component config:
            $config = craft\helpers\App::sessionConfig();

            // Replace component class:
            $config['class'] = yii\redis\Session::class;

            // Define additional properties:
            $config['redis'] = [
                'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
                'port' => 6379,
                'password' => App::env('REDIS_PASSWORD') ?: null,
            ];

            // Return the initialized component:
            return Craft::createObject($config);
        }
    ],
];
```

::: warning
If you are sharing a Redis server between multiple components, you should [set a unique `database`](https://www.yiiframework.com/extension/yiisoft/yii2-redis/doc/api/2.0/yii-redis-connection#$database-detail) for each one.
:::

#### Database Example

First, you must create the database table that will store PHP’s sessions. You can do that by running the `craft setup/php-session-table` console command from your project’s root folder.

```php
<?php
return [
    'components' => [
        'session' => function() {
            // Get the default component config:
            $config = craft\helpers\App::sessionConfig();

            // Override the class to use DB session class:
            $config['class'] = yii\web\DbSession::class;

            // Set the session table name:
            $config['sessionTable'] = craft\db\Table::PHPSESSIONS;

            // Return the initialized component:
            return Craft::createObject($config);
        },
    ],
];
```

### Mailer

To override the `mailer` component config (which is responsible for sending emails), do this in `config/app.php`:

```php
<?php

use craft\helpers\App;

return [
    'components' => [
        'mailer' => function() {
            // Get the default component config:
            $config = App::mailerConfig();

            // Use Mailpit in dev mode:
            if (Craft::$app->getConfig()->getGeneral()->devMode) {
                $adapter = craft\helpers\MailerHelper::createTransportAdapter(
                    craft\mail\transportadapters\Smtp::class,
                    [
                        'host' => App::env('MAILPIT_SMTP_HOSTNAME'),
                        'port' => App::env('MAILPIT_SMTP_PORT'),
                    ]
                );

                // Override the transport:
                $config['transport'] = $adapter->defineTransport();
            }

            // Return the initialized component:
            return Craft::createObject($config);
        },
    ],
];
```

::: tip
Any changes you make to the Mailer component from `config/app.php` will not be reflected when testing [email settings](../mail.md) from **Settings** → **Email**.
:::

### Queue

Craft’s job queue is powered by the [Yii2 Queue Extension](https://github.com/yiisoft/yii2-queue). By default, Craft will use a [custom queue driver](craft4:craft\queue\Queue) based on the extension’s [DB driver](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/driver-db.md).

Switching to a different driver by overriding Craft’s `queue` component from `config/app.php` will result in a loss of visibility into the queue’s state from the control panel. Instead of replacing the entire component, set your custom queue driver config on <craft4:craft\queue\Queue::$proxyQueue>:

```php
<?php
return [
    'components' => [
        'queue' => [
            'proxyQueue' => [
                'class' => yii\queue\redis\Queue::class,
                'redis' => [
                    'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
                    'port' => 6379,
                    'password' => App::env('REDIS_PASSWORD') ?: null,
                ],
            ],
            'channel' => 'queue', // Queue channel key
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

### Mutex

Craft uses the database for mutex (or “mutually exclusive”) locks <Since ver="4.6.0" feature="The database mutex driver became the default in {ver} of {product}" />, which means it will work natively in [load-balanced environments](kb:configuring-load-balanced-environments#mutex-locks).

::: warning
Prior to 4.6, enabling `devMode` would automatically switch from the default `FileMutex` driver to a special `NullMutex` driver to help avoid some virtualization bugs. Now, `NullMutex` is only used when a database connection is not available (i.e. prior to installation).
:::

You can configure a custom mutex driver by overriding the `mutex` component’s nested `$mutex` property:

```php
return [
    'components' => [
        'mutex' => function() {
            $generalConfig = Craft::$app->getConfig()->getGeneral();

            $config = [
                'class' => craft\mutex\File::class,
                // Alter just this nested property of the main mutex component:
                'mutex' => [
                    'class' => yii\mutex\FileMutex::class,
                    'fileMode' => $generalConfig->defaultFileMode,
                    'dirMode' => $generalConfig->defaultDirMode,
                ],
            ];

            // Return the initialized component:
            return Craft::createObject($config);
        },
    ],
    // ...
];
```

The specific properties that you can (or must) use in the configuration object will differ based on the specified mutex class—check the driver’s documentation for instructions.

::: warning
The primary mutex _component_ should always be an instance of <craft4:craft\mutex\Mutex>. We’re only modifying the existing `mutex` component’s nested _driver_ property and leaving the rest of its config as-is!
:::

## Modules

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.

An empty Module is included in every starter project, and can be activated by adding its ID to the `bootstrap` key of `app.php`:

```php
return [
    // ...
    'modules' => [
        'my-module' => \modules\Module::class,
    ],
    'bootstrap' => ['my-module'],
];
```

## Requests + Responses <Since ver="4.11.0" feature="CORS and headers filters" />

To set arbitrary headers on every site response, attach <craft4:craft\filters\Headers> to the root _web_ application, in `config/app.web.php`:

```php
return [
    // Attach the headers filter to the application:
    'as headersFilter' => [
        'class' => \craft\filters\Headers::class,
        'site' => ['siteA', 'siteB'],
        'headers' => [
            // Define pairs of headers:
            'Permissions-Policy' => 'interest-cohort=()',
            'X-Foo' => 'Bar',
        ],
    ],
];
```

We also provide a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)-specific filter (<craft4:craft\filters\Cors>) to manage server-side policies on a per-action basis:

```php
return [
    // Attach the CORS filter to the application:
    'as corsFilter' => [
        'class' => \craft\filters\Cors::class,

        // Scope to specific sites (optional):
        'site' => ['siteA', 'siteB'],

        // CORS defaults for all non-CP requests:
        'cors' => [
            'Origin' => [
                'https://my-project.ddev.site',
                'https://es.my-project.ddev.site',
            ],
            'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            'Access-Control-Request-Headers' => ['*'],
            'Access-Control-Allow-Credentials' => true,
            'Access-Control-Max-Age' => 86400,
            'Access-Control-Expose-Headers' => [],
        ],

        // Controller/action-specific overrides (optional):
        'actions' => [
            'graphql/api' => [
                'Origin' => ['*'],
                'Access-Control-Allow-Credentials' => false,
            ],
        ],
    ],
];
```

With [Dev Mode](kb:what-dev-mode-does) on, some potentially dangerous CORS misconfigurations will trigger exceptions.

::: warning
Headers in action-specific overrides are _not_ merged with global headers—they are only applied if the header was already set, globally!
:::
