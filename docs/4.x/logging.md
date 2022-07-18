# Logging

Craft’s application logs can help you confirm expected behavior and investigate issues.

## Finding and Reading Log Files

By default, Craft writes log files at runtime to the `storage/logs/` directory. They come in a few flavors:

- **console-[Y-m-d].log** – logs generated from running console commands
- **phperrors.log** – lower-level PHP errors, if Craft is configured to handle them (which it should be by default)
- **queue-[Y-m-d].log** – logs generated from running queue jobs
- **web-[Y-m-d].log** – logs generated from front-end web requests

::: tip
You can change where logs and other runtime-generated files are stored using the [CRAFT_STORAGE_PATH](https://craftcms.com/docs/4.x/config/#craft-storage-path) PHP constant.
:::

PHP errors aren’t written by Craft, so their format is slightly different. The rest follow the same convention defined by Craft’s [default Monolog target](craft4:craft\log\MonologTarget):

```
2022-07-15 00:00:04 [web.INFO] [yii\db\Connection::open] Opening DB connection: mysql:host=ddev-starter-blog-db;dbname=db;port=3306 {"memory":913536} 
```

This single log event is made up of the following parts:

| Part | Example | Description
|----- | ------- | -----------
| timestamp | `2022-07-15 00:00:04` | Precise time that the thing happened.
| type + level | `[web.INFO]` | Type of request involved (`web`, `console`, `queue`), and log level (`TRACE`, `INFO`, `WARNING`, `ERROR`).
| category | `[yii\db\Connection::open]` | Yii convention that broadly defines the area of concern. Defaults to `application`, but may be the calling class or method or a plugin handle.
| message | `Opening DB connection: (...)` | Event description explicitly passed to the logger.
| memory usage | `{"memory":913536}` | Amount of physical memory, in bytes, consumed by the PHP process when the log line was written.

Session and environment variables are printed after the last log line for the request, preceded by a `Request context:` message.

### Logs in Different Environments

What you see in your log files depends on the environment.

When you’re working locally with <config4:devMode> enabled, logs will be in a more verbose, multi-line format that’s human-readable. Each event will be represented on one or more lines. Any exceptions will include a stack trace.

```
[2022-04-15T17:00:11+00:00] web.INFO: Opening DB connection: pgsql:host=db;dbname=db;port=5432 {"trace":[],"memory":9646256,"category":"yii\\db\\Connection::open"}
[2022-04-15T17:00:11+00:00] web.WARNING: Some warning… {"trace":[],"memory":13577888,"category":"application"}
[2022-04-15T17:00:11+00:00] web.INFO: Request context
$_GET = []

$_POST = []
[…truncated] {"ip":"172.18.0.1"}
```

When <config4:devMode> is disabled, as in a production environment, log files are written in a machine-readiable format that’s best for log aggregators. Each event will be represented on a single, longer line that includes context:

```
[2022-04-15T16:57:54+00:00] web.WARNING: Some warning… {"trace":[],"memory":13579752,"category":"application"}
[2022-04-15T16:57:54+00:00] web.WARNING: Request context  {"ip":"172.18.0.1","userId":1,"vars":{"_GET":[],"_POST":[],"_COOKIE":{"1031b8c41dfff97a311a7ac99863bdc5_username":"2756d05ef7521bdc1dac02da066e1658e3e16d6acc7360cfc6256cb1cec311cca:2:{i:0;s:41:\"1031b8c41dfff97a311a7ac99863bdc5_username\";i:1;s:5:\"admin\";}","__stripe_mid":"ddd01b0a-8220-4d00-a2f4-96bb8cb8e6b6bec28d","CraftSessionId":"if0uq3uj36d8ek6n5o9eak2l04","1031b8c41dfff97a311a7ac99863bdc5_identity":"8ddb6a5ce28f3fb2d23567df9228ce31614d6b19572c4f60db3b4b5eae78f2a3a:2:{i:0;s:41:\"1031b8c41dfff97a311a7ac99863bdc5_identity\";i:1;s:159:\"[1,\"[\\\"QwoFhu6pBsTvSOkCXqNvu2_cIr16fde6AK1DHP7GLiyXmnv7qY5BscDi8sl_QRT9z2uGh051J7r9IkSawusrx-ijCLZWZ6bHB433\\\",null,\\\"d9667159e600aea00a68fcc215cc4f6e\\\"]\",3600]\";}","CRAFT_CSRF_TOKEN":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"},"_FILES":[],"_SERVER":{"PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","HOSTNAME":"my-project.tld","PHP_DISPLAY_ERRORS":"on","PHP_MEMORY_LIMIT":"512M","PHP_MAX_EXECUTION_TIME":"5000","PHP_UPLOAD_MAX_FILESIZE":"512M","PHP_MAX_INPUT_VARS":"5000","PHP_POST_MAX_SIZE":"512M","PHP_OPCACHE_ENABLE":"0","PHP_OPCACHE_REVALIDATE_FREQ":"0","PHP_OPCACHE_VALIDATE_TIMESTAMPS":"0","XDEBUG_SESSION":"PHPSTORM","PHP_IDE_CONFIG":"serverName=my-project.tld","XDEBUG_CONFIG":"client_host=host.docker.internal client_port=9003","XDEBUG_MODE":"develop,debug","IMAGE_USER":"nitro","PHP_VERSION":"8.0","NVM_VERSION":"0.38.0","DEBIAN_FRONTEND":"noninteractive","HOME":"/home/nitro","LC_CTYPE":"C.UTF-8","SUPERVISOR_ENABLED":"1","SUPERVISOR_PROCESS_NAME":"php-fpm","SUPERVISOR_GROUP_NAME":"php-fpm","USER":"nitro","HTTP_X_FORWARDED_PROTO":"https","HTTP_X_FORWARDED_FOR":"172.18.0.1","HTTP_UPGRADE_INSECURE_REQUESTS":"1","HTTP_SEC_FETCH_USER":"?1","HTTP_SEC_FETCH_SITE":"none","HTTP_SEC_FETCH_MODE":"navigate","HTTP_SEC_FETCH_DEST":"document","HTTP_SEC_CH_UA_PLATFORM":"\"macOS\"","HTTP_SEC_CH_UA_MOBILE":"?0","HTTP_SEC_CH_UA":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"","HTTP_COOKIE":"1031b8c41dfff97a311a7ac99863bdc5_username=2756d05ef7521bdc1dac02da066e1658e3e16d6acc7360cfc6256cb1cec311cca%3A2%3A%7Bi%3A0%3Bs%3A41%3A%221031b8c41dfff97a311a7ac99863bdc5_username%22%3Bi%3A1%3Bs%3A5%3A%22admin%22%3B%7D; __stripe_mid=ddd01b0a-8220-4d00-a2f4-96bb8cb8e6b6bec28d; CraftSessionId=if0uq3uj36d8ek6n5o9eak2l04; 1031b8c41dfff97a311a7ac99863bdc5_identity=8ddb6a5ce28f3fb2d23567df9228ce31614d6b19572c4f60db3b4b5eae78f2a3a%3A2%3A%7Bi%3A0%3Bs%3A41%3A%221031b8c41dfff97a311a7ac99863bdc5_identity%22%3Bi%3A1%3Bs%3A159%3A%22%5B1%2C%22%5B%5C%22QwoFhu6pBsTvSOkCXqNvu2_cIr16fde6AK1DHP7GLiyXmnv7qY5BscDi8sl_QRT9z2uGh051J7r9IkSawusrx-ijCLZWZ6bHB433%5C%22%2Cnull%2C%5C%22d9667159e600aea00a68fcc215cc4f6e%5C%22%5D%22%2C3600%5D%22%3B%7D; CRAFT_CSRF_TOKEN=9779283c4e1eba389e1017adc948f01af0a22c04a007ab820e41e540b501e74ca%3A2%3A%7Bi%3A0%3Bs%3A16%3A%22CRAFT_CSRF_TOKEN%22%3Bi%3A1%3Bs%3A147%3A%22XBmAAP6UFlrOfMEOHl9coZnXbJKENF2LtqdsItB7%7C11c6df0a319dfd02ab5a74652e290bf2aa260e6423b903fc38fee0c76e1dbc06XBmAAP6UFlrOfMEOHl9coZnXbJKENF2LtqdsItB7%7C1%22%3B%7D","HTTP_CACHE_CONTROL":"max-age=0","HTTP_ACCEPT_LANGUAGE":"en-US,en;q=0.9","HTTP_ACCEPT_ENCODING":"gzip, deflate, br","HTTP_ACCEPT":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","HTTP_USER_AGENT":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36","HTTP_HOST":"my-project.tld","SCRIPT_FILENAME":"/app/web/index.php","REDIRECT_STATUS":"200","SERVER_NAME":"","SERVER_PORT":"80","SERVER_ADDR":"172.18.0.12","REMOTE_USER":"","REMOTE_PORT":"46122","REMOTE_ADDR":"172.18.0.19","SERVER_SOFTWARE":"nginx/1.18.0","GATEWAY_INTERFACE":"CGI/1.1","REQUEST_SCHEME":"http","SERVER_PROTOCOL":"HTTP/1.1","DOCUMENT_ROOT":"/app/web","DOCUMENT_URI":"/index.php","REQUEST_URI":"/","SCRIPT_NAME":"/index.php","CONTENT_LENGTH":"","CONTENT_TYPE":"","REQUEST_METHOD":"GET","QUERY_STRING":"","FCGI_ROLE":"RESPONDER","PHP_SELF":"/index.php","REQUEST_TIME_FLOAT":1650041873.980016,"REQUEST_TIME":1650041873,"DEFAULT_SITE_URL":"https://my-project.tld/","CRAFT_ENVIRONMENT":"dev","CRAFT_SECURITY_KEY":"•••","CRAFT_DEV_MODE":"0","CRAFT_DB_URL":"","CRAFT_DB_DATABASE":"db","CRAFT_DB_USER":"db","CRAFT_DB_PASSWORD":"•••••","CRAFT_DB_DRIVER":"pgsql","CRAFT_DB_SCHEMA":"public","CRAFT_DB_SERVER":"postgres-13-5432.database.nitro"},"_SESSION":{"bd62416aa8538ede709019a5e113eea5__flash":[],"1031b8c41dfff97a311a7ac99863bdc5__token":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••","1031b8c41dfff97a311a7ac99863bdc5__id":1,"__authKey":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••","1031b8c41dfff97a311a7ac99863bdc5__expire":1650045474,"__duration":3600}}}
```

### Sensitive Information

If you don’t want sensitive variables printed in your logs, you’re in luck! Craft automatically obfuscates values with sensitive-sounding keys, like “password”, “token”, and “key”. (Entire list under `sensitiveKeywords` in [config/app.php](https://github.com/craftcms/cms/blob/main/src/config/app.php).)

```
"CRAFT_DB_DATABASE":"db","CRAFT_DB_USER":"db","CRAFT_DB_PASSWORD":"•••••",
```

### Log Rotation

Logs are grouped by date without any specific size limit. The number of files is limited to 5 by default, per  <craft4:craft\log\MonologTarget::$maxFiles>. For this reason, log files may accumulate and eventually consume a fair amount of disk space, especially in a busy local development environment.

## Customizing Logs

You have a lot of control over how logs are formatted and where they end up going.

### Monolog Configuration

```php
<?php

use craft\helpers\App;
use Monolog\Formatter\LineFormatter;
use Psr\Log\LogLevel;
use yii\i18n\PhpMessageSource;
use yii\web\HttpException;

return [
    'components' => [
        'log' => [
            'monologTargetConfig' => [

                // Only log context in `devMode`
                'logContext' => App::devMode(),

                // Only log warning and up
                'level' => LogLevel::WARNING,

                // Force single-line logs, even in `devMode`
                'allowLineBreaks' => false,

                // Override message filtering (eg don’t log any 40*)
                // By default, `PhpMessageSource:*` and `HttpException:404` are filtered
                'except' => [
                    PhpMessageSource::class . ':*',
                    HttpException::class . ':40*',
                    'custom-module'
                ],

                // Change the default log formatter and date format
                'formatter' => new LineFormatter(
                    format: "%datetime% [%level_name%][%context.category%] %message% %context% %extra%\n",
                    dateFormat: DATE_ATOM
                ),
            ],
            'targets' => [

                // Add a traditional Yii file target
                [
                    'class' => \yii\log\FileTarget::class,
                    'logFile' => '@storage/logs/custom-module.log',
                    'levels' => App::devMode() ? ['info', 'warning', 'error'] : ['warning', 'error'],
                    'categories' => ['custom-module'],
                ],

                // Add a Monolog target
                [
                    'class' => \craft\log\MonologTarget::class,
                    'name' => 'custom-module',
                    'extractExceptionTrace' => !App::devMode(),
                    'allowLineBreaks' => App::devMode(),
                    'level' => App::devMode() ? LogLevel::INFO : LogLevel::WARNING,
                    'categories' => ['custom-module'],
                ],
            ]

        ],
    ],
];
```

### stdout and stderr

If you don’t want log files to be written at all, but printed to `stdout` and `stderr`, you can set [CRAFT_STREAM_LOG](./config/README.md#craft-stream-log) to `true`. This is common in load-balanced and ephemeral environments where log output needs to be consolidated somewhere other than persistent storage.

#### Separate Log Files

Craft collects logged events in a single file so that anything you’re investigating has ample context. There may be times, however, when you’d rather isolate your module or plugin’s logging to a completely separate file.

You can log to a separate file by adjusting Craft’s logging configuration. To do this, we’ll filter desired messages _out_ of one target and exclusively limit a second one to _only_ those messages.

::: tip
You can go a lot further than this example, adding as many traditional Yii log targets and Monolog targets as you’d like, with complete control over what categories, levels, and formats should apply to each one.
:::

Let’s say we’re logging things with a `my-module` category, for example:

```php
Craft::info('I’m loggin!', 'my-module');
```

We’d like each of these messages to go to a separate `storage/logs/custom-module.log` file. We’ll need to do three things with the log component configuration in `config/app.php`:

1. Exclude the `my-module` category from the default target configuration, so these messages don’t show up in the normal logs.
2. Add a new file-based log target that writes `my-module` messages to our separate log file.

```php{16-17,21-27}
<?php

use craft\helpers\App;
use Monolog\Formatter\LineFormatter;
use Psr\Log\LogLevel;
use yii\i18n\PhpMessageSource;
use yii\web\HttpException;

return [
    'components' => [
        'log' => [
            'monologTargetConfig' => [
                'except' => [
                    PhpMessageSource::class . ':*',
                    HttpException::class . ':40*',
                    // 1. Ignore 'custom-module' in default target (after existing)
                    'custom-module'
                ],
            ],
            'targets' => [
                // 2. Add a new file-based Yii log target
                [
                    'class' => \yii\log\FileTarget::class,
                    'logFile' => '@storage/logs/my-module.log',
                    'levels' => App::devMode() ? ['info', 'warning', 'error'] : ['warning', 'error'],
                    'categories' => ['my-module'],
                ],
            ]

        ],
    ],
];
```

## Logging Your Own Events

You can write your own log events from a custom plugin or module.

#### Using Craft’s Logger

There are five methods available depending on the severity you’d like to designate for the event:

- `Craft::trace()` – verbose, fine-grained annotations—sometimes temporary—used for support or debuggging
- `Craft::debug()` – non-essential information that can be used for debugging issues
- `Craft::info()` – standard level for informative contextual details
- `Craft::warning()` – messages that indicate something problematic or unexpected even though everything continues to work
- `Craft::error()` – most urgent level before an exception, used to indicate that something didn’t function properly

::: tip
By default, Craft logs all levels when <config4:devMode> is enabled. Otherwise, anything lower than warning will be ignored.
:::

Logged messages should designate a message body, level, and optional category. Here, the category is `custom-module`:

```php
// Short form
Craft::info($message, 'custom-module');

// Exact same thing
Craft::getLogger()->log($message, Logger::LEVEL_INFO, 'custom-module');
```

#### PSR-3 Logging

Craft 4 doesn’t require any changes to standard logging setups, but it additionally supports PSR-3 logging:

```php
use samdark\log\PsrMessage;

// Traditional Yii2 Logging
Craft::error('Some error…', 'Some category (logged as context.category)');

// PSR-3 Logging, with context
Craft::error(new PsrMessage(
    'Some error, {psr3Replacement}',
    [
        'some' => 'context',
        'to' => ['be', 'serialized'],
        'psr3Replacement' => 'https://www.php-fig.org/psr/psr-3/'
    ],
));
```

## Further Reading

- [Adding Logging to Craft Plugins with Monolog](https://putyourlightson.com/articles/adding-logging-to-craft-plugins-with-monolog)
