# Logging

Craft’s application logs can help you confirm expected behavior and investigate issues. If you’ve ever encountered a cryptic error page on a live site and wondered what actually went wrong, the logs will have the complete story.

## Finding and Reading Log Files

By default, Craft writes log files to the `storage/logs/` directory. Messages are split into a few different files, and are [rotated](#log-rotation) daily:

- `console-[Y-m-d].log`: logs generated from running console commands
- `queue-[Y-m-d].log`: logs generated from running queue jobs
- `web-[Y-m-d].log`: logs generated from front-end web requests

::: tip
You can change where runtime artifacts are stored (including logs) using the [CRAFT_STORAGE_PATH](../reference/config/bootstrap.md#craft-storage-path) PHP constant.
:::

Additionally, low-level PHP errors are logged to `phperrors.log` if allowed by [your configuration](../reference/config/bootstrap.md#craft-log-php-errors). These messages are special, and bypass Craft’s logging system entirely.

All other messages follow the same format:

```
2022-07-15 00:00:04 [web.INFO] [yii\db\Connection::open] Opening DB connection: mysql:host=ddev-starter-blog-db;dbname=db;port=3306 {"memory":913536} 
```

| Part | Example | Description
|----- | ------- | -----------
| Timestamp | `2022-07-15 00:00:04` | Precise time that the log was created.
| Target + Level | `[web.INFO]` | Type of request involved (`web`, `console`, `queue`), and log level (`TRACE`, `INFO`, `WARNING`, `ERROR`).
| Category | `[yii\db\Connection::open]` | Yii convention that broadly defines the area of concern. Defaults to `application`, but may be the calling class or method or a plugin handle.
| Message | `Opening DB connection: (...)` | Description explicitly passed to the logger.
| Context | `{"memory":913536}` | Additional parameters that were captured along with the message.

Session and environment variables are printed after the last log line for the request, preceded by a `Request context:` message.

### What Gets Logged?

The types of messages you’ll find in a log file depend on the current environment, allowed logging level(s), installed plugins, and a host of other factors.

#### Levels

Log volume generally increases as level (or “severity”) decreases—there are _a ton_ of debugging messages emitted in development environments, but when only warnings and errors are logged in a live environment, you may go long periods of time without a single message.

Levels are a great way to summarize the substance of logs:

- **Error:** Something happened that interfered with Craft’s expected behavior. Usually logged in the process of handling an exception.
- **Warning:** Craft encountered an unusual (but recoverable) circumstance. Warnings often point to abuse, misuse, or misconfiguration.
- **Info:** Messages emitted during normal operation. Oftentimes, these messages will correspond to things like failed validation, and include specifics that aren’t otherwise communicated to users.
- **Debug:** Extraneous data that is likely only useful when actively investigating an issue with a feature or plugin.
- **Profiling:** Normally excluded from logs. Profiling data is available to help identify low-level performance issues, like template rendering or database queries.

#### Exceptions

Craft will also log uncaught exceptions. Exceptions can occur for all sorts of reasons, and will often use a specific class to reflect the nature of the issue. Those that extend <yii2:yii\base\UserException> are considered safe to display to a user, and will render this default view (or one matching your <config5:errorTemplatePrefix>):

![Default presentation of a 404 HTTP Exception](../images/exception-404.png)

For security, other exceptions are hidden from the front-end, and only available by examining logs. When <config5:devMode> is _on_, a stack trace will be output just after the exception’s message; otherwise, the stack trace is encoded as JSON and appended to the log message.

::: tip
You can see a stack trace for any log message by increasing the `traceLevel` in your [log configuration](#trace-level).
:::

### Logs in Different Environments

What you see in your log files depends on the environment.

When you’re working locally with <config5:devMode> enabled, logs are output in a verbose, multi-line format that’s human-readable. Any exceptions will include a stack trace.

```
[2022-04-15T17:00:11+00:00] web.INFO: Opening DB connection: pgsql:host=db;dbname=db;port=5432 {"trace":[],"memory":9646256,"category":"yii\\db\\Connection::open"}
[2022-04-15T17:00:11+00:00] web.WARNING: Some warning… {"trace":[],"memory":13577888,"category":"application"}
[2022-04-15T17:00:11+00:00] web.INFO: Request context
$_GET = []

$_POST = []
[…truncated] {"ip":"172.18.0.1"}
```

When <config5:devMode> is off, log files are written in a machine-readable format that’s best for log aggregators. Each message will be represented on a single, longer line that includes context:

```
[2022-04-15T16:57:54+00:00] web.WARNING: Some warning… {"trace":[],"memory":13579752,"category":"application"}
[2022-04-15T16:57:54+00:00] web.WARNING: Request context  {"ip":"172.18.0.1","userId":1,"vars":{"_GET":[],"_POST":[],"_COOKIE":{"1031b8c41dfff97a311a7ac99863bdc5_username":"2756d05ef7521bdc1dac02da066e1658e3e16d6acc7360cfc6256cb1cec311cca:2:{i:0;s:41:\"1031b8c41dfff97a311a7ac99863bdc5_username\";i:1;s:5:\"admin\";}","CraftSessionId":"if0uq3uj36d8ek6n5o9eak2l04","1031b8c41dfff97a311a7ac99863bdc5_identity":"8ddb6a5ce28f3fb2d23567df9228ce31614d6b19572c4f60db3b4b5eae78f2a3a:2:{i:0;s:41:\"1031b8c41dfff97a311a7ac99863bdc5_identity\";i:1;s:159:\"[1,\"[\\\"QwoFhu6pBsTvSOkCXqNvu2_cIr16fde6AK1DHP7GLiyXmnv7qY5BscDi8sl_QRT9z2uGh051J7r9IkSawusrx-ijCLZWZ6bHB433\\\",null,\\\"d9667159e600aea00a68fcc215cc4f6e\\\"]\",3600]\";}","CRAFT_CSRF_TOKEN":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"},"_FILES":[],"_SERVER":{"PATH":"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","HOSTNAME":"my-project.tld","PHP_DISPLAY_ERRORS":"on","PHP_MEMORY_LIMIT":"512M","PHP_MAX_EXECUTION_TIME":"5000","PHP_UPLOAD_MAX_FILESIZE":"512M","PHP_MAX_INPUT_VARS":"5000","PHP_POST_MAX_SIZE":"512M","PHP_OPCACHE_ENABLE":"0","PHP_OPCACHE_REVALIDATE_FREQ":"0","PHP_OPCACHE_VALIDATE_TIMESTAMPS":"0","XDEBUG_SESSION":"PHPSTORM","PHP_IDE_CONFIG":"serverName=my-project.tld","XDEBUG_CONFIG":"client_host=host.docker.internal client_port=9003","XDEBUG_MODE":"develop,debug","IMAGE_USER":"nitro","PHP_VERSION":"8.0","NVM_VERSION":"0.38.0","DEBIAN_FRONTEND":"noninteractive","HOME":"/home/nitro","LC_CTYPE":"C.UTF-8","SUPERVISOR_ENABLED":"1","SUPERVISOR_PROCESS_NAME":"php-fpm","SUPERVISOR_GROUP_NAME":"php-fpm","USER":"nitro","HTTP_X_FORWARDED_PROTO":"https","HTTP_X_FORWARDED_FOR":"172.18.0.1","HTTP_UPGRADE_INSECURE_REQUESTS":"1","HTTP_SEC_FETCH_USER":"?1","HTTP_SEC_FETCH_SITE":"none","HTTP_SEC_FETCH_MODE":"navigate","HTTP_SEC_FETCH_DEST":"document","HTTP_SEC_CH_UA_PLATFORM":"\"macOS\"","HTTP_SEC_CH_UA_MOBILE":"?0","HTTP_SEC_CH_UA":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"","HTTP_COOKIE":"1031b8c41dfff97a311a7ac99863bdc5_username=2756d05ef7521bdc1dac02da066e1658e3e16d6acc7360cfc6256cb1cec311cca%3A2%3A%7Bi%3A0%3Bs%3A41%3A%221031b8c41dfff97a311a7ac99863bdc5_username%22%3Bi%3A1%3Bs%3A5%3A%22admin%22%3B%7D; 1031b8c41dfff97a311a7ac99863bdc5_identity=8ddb6a5ce28f3fb2d23567df9228ce31614d6b19572c4f60db3b4b5eae78f2a3a%3A2%3A%7Bi%3A0%3Bs%3A41%3A%221031b8c41dfff97a311a7ac99863bdc5_identity%22%3Bi%3A1%3Bs%3A159%3A%22%5B1%2C%22%5B%5C%22QwoFhu6pBsTvSOkCXqNvu2_cIr16fde6AK1DHP7GLiyXmnv7qY5BscDi8sl_QRT9z2uGh051J7r9IkSawusrx-ijCLZWZ6bHB433%5C%22%2Cnull%2C%5C%22d9667159e600aea00a68fcc215cc4f6e%5C%22%5D%22%2C3600%5D%22%3B%7D; CRAFT_CSRF_TOKEN=9779283c4e1eba389e1017adc948f01af0a22c04a007ab820e41e540b501e74ca%3A2%3A%7Bi%3A0%3Bs%3A16%3A%22CRAFT_CSRF_TOKEN%22%3Bi%3A1%3Bs%3A147%3A%22XBmAAP6UFlrOfMEOHl9coZnXbJKENF2LtqdsItB7%7C11c6df0a319dfd02ab5a74652e290bf2aa260e6423b903fc38fee0c76e1dbc06XBmAAP6UFlrOfMEOHl9coZnXbJKENF2LtqdsItB7%7C1%22%3B%7D","HTTP_CACHE_CONTROL":"max-age=0","HTTP_ACCEPT_LANGUAGE":"en-US,en;q=0.9","HTTP_ACCEPT_ENCODING":"gzip, deflate, br","HTTP_ACCEPT":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","HTTP_USER_AGENT":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36","HTTP_HOST":"my-project.tld","SCRIPT_FILENAME":"/app/web/index.php","REDIRECT_STATUS":"200","SERVER_NAME":"","SERVER_PORT":"80","SERVER_ADDR":"172.18.0.12","REMOTE_USER":"","REMOTE_PORT":"46122","REMOTE_ADDR":"172.18.0.19","SERVER_SOFTWARE":"nginx/1.18.0","GATEWAY_INTERFACE":"CGI/1.1","REQUEST_SCHEME":"http","SERVER_PROTOCOL":"HTTP/1.1","DOCUMENT_ROOT":"/app/web","DOCUMENT_URI":"/index.php","REQUEST_URI":"/","SCRIPT_NAME":"/index.php","CONTENT_LENGTH":"","CONTENT_TYPE":"","REQUEST_METHOD":"GET","QUERY_STRING":"","FCGI_ROLE":"RESPONDER","PHP_SELF":"/index.php","REQUEST_TIME_FLOAT":1650041873.980016,"REQUEST_TIME":1650041873,"PRIMARY_SITE_URL":"https://my-project.tld/","CRAFT_ENVIRONMENT":"dev","CRAFT_SECURITY_KEY":"•••","CRAFT_DEV_MODE":"0","CRAFT_DB_URL":"","CRAFT_DB_DATABASE":"db","CRAFT_DB_USER":"db","CRAFT_DB_PASSWORD":"•••••","CRAFT_DB_DRIVER":"pgsql","CRAFT_DB_SCHEMA":"public","CRAFT_DB_SERVER":"postgres-13-5432.database.nitro"},"_SESSION":{"bd62416aa8538ede709019a5e113eea5__flash":[],"1031b8c41dfff97a311a7ac99863bdc5__token":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••","1031b8c41dfff97a311a7ac99863bdc5__id":1,"__authKey":"••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••","1031b8c41dfff97a311a7ac99863bdc5__expire":1650045474,"__duration":3600}}}
```

### Tools

Log files are just plain text, but their growth can gradually become a problem for some programs. Let’s look at a few ways to monitor logs for new messages.

#### Command Line

UNIX provides the `tail` command for printing files:

```bash
tail -f storage/logs/web-*.log
```

This will output new `web` logs as they’re written, and will continue to work even as files are rotated. You can clear any old output with <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>K</kbd>.

To hunt for specific messages, pipe the output through [`grep`](https://linux.die.net/man/1/grep):

```bash
tail -f storage/logs/web-*.log | grep "specific message or category" -C 10
```

The `-C` flag preserves a few lines on either side of a message that matches. Some characters have special meaning in `grep`, and may need to be escaped.

#### Console

MacOS comes with a utility called [Console](https://support.apple.com/guide/console/welcome/mac), designed for log processing. When opening a file, it will automatically watch for new messages and can filter them by search terms.

#### Log Drains

Some platforms will have built-in support for aggregating logs and “draining” them to first- and third-party tools. In these situations, the expectation is generally that logs are sent to [`stdout` and `stderr`](#stdout-and-stderr).

Docker operates in a similar way, making output streams available to the host via `docker logs --follow my-container-name`.

### Sensitive Information

To prevent leaking secrets into logs, Craft automatically redacts sensitive-sounding environment or “context” variable names, like “password”, “token”, and “key.” The final output ends up looking like this:

```
"CRAFT_DB_DATABASE":"db","CRAFT_DB_USER":"db","CRAFT_DB_PASSWORD":"•••••",
```

These keywords are customizable via the `security` component’s `sensitiveKeywords` property in [config/app.php](repo:craftcms/cms/blob/5.x/src/config/app.php#L110-L122):

```php
<?php

return [
    'components' => [
        'security' => [
            'sensitiveKeywords' => [
                // Anything added here gets merged with the defaults:
                'private',
            ],
        ],
    ],
];
```

::: danger
Craft does _not_ attempt to redact the message content itself. It is your responsibility to prevent sensitive information from being explicitly logged, say, via interpolation in a message.
:::

### Log Rotation

Logs are grouped by date without any specific size limit. The number of files is limited to 5 by default, per <craft5:craft\log\MonologTarget::$maxFiles>.

For high-traffic environments, configuring [`logrotate`](https://linux.die.net/man/8/logrotate) or streaming your logs to [`stdout` and `stderr`](#stdout-and-stderr) is recommended.

## Customizing Logs

Craft gives you fine-grained control over how logs are formatted and where they end up.

Configuration is handled via the `log` component, in `config/app.php`. If this is your first time dealing with `app.php`, we recommend reading a bit about [application configuration](../reference/config/app.md).

### Monolog

Craft uses [Monolog](https://seldaek.github.io/monolog/) to standardize log output. The defaults used for creating the built-in `web`, `console`, and `queue` targets can be customized via the `monologTargetConfig` property:

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

                // Only export messages with `warning` severity and higher:
                'level' => LogLevel::WARNING,

                // Force single-line logs, even in `devMode`:
                'allowLineBreaks' => false,

                // Override message filtering to exclude *all* 400-level exceptions:
                // (This replaces the default exclusions, `PhpMessageSource:*` and `HttpException:404`)
                'except' => [
                    PhpMessageSource::class . ':*',
                    HttpException::class . ':4*',
                ],

                // Change the default log formatter and date format:
                'formatter' => new LineFormatter(
                    format: "%datetime% [%level_name%][%context.category%] %message% %context% %extra%\n",
                    dateFormat: DATE_ATOM
                ),
            ],
        ],
    ],
];
```

### Targets

Unless configured otherwise, all logs for a request will be written to the same file.

Additional [targets](https://www.yiiframework.com/doc/guide/2.0/en/runtime-logging#log-targets) can be defined to send your logs (or a subset of them, based on severity or category) to other destinations.

```php
<?php

use craft\helpers\App;
use craft\log\MonologTarget;
use Psr\Log\LogLevel;
use yii\log\FileTarget;
use yii\web\HttpException;

return [
    'components' => [
        'log' => [
            'targets' => [
                // 1. Add a traditional Yii file target for auditing 404 errors that are normally excluded:
                [
                    'class' => FileTarget::class,
                    'logFile' => '@storage/logs/missing-pages.log',
                    'categories' => [
                        HttpException::class . ':404',
                    ],
                    'logVars' => [],
                ],

                // 2. Add a Monolog target for module-specific messages:
                [
                    'class' => MonologTarget::class,
                    'name' => 'custom-module',
                    'extractExceptionTrace' => !App::devMode(),
                    'allowLineBreaks' => App::devMode(),
                    'level' => App::devMode() ? LogLevel::INFO : LogLevel::WARNING,
                    'categories' => ['custom-module'],
                    'logContext' => false,
                ],
            ],
        ],
    ],
];
```

Here, we’re defining two new targets:

1. A simple <yii2:yii\log\FileTarget> that only includes messages with the `yii\web\HttpException:404` category. These are emitted by Yii, but excluded by Craft’s default targets.
2. A custom <craft5:craft\log\MonologTarget> to siphon messages emitted by a custom module into a separate log file, and discards context info. Read about [logging your own events](#logging-your-own-events) to learn how to send a message here.

Our new targets don’t affect Craft’s normal logging behavior—the default targets are still configured. As a result, a single message may be dispatched to multiple targets; if you want to filter messages out of the default targets, you can use the `categories` and `except` properties within the [`monologTargetConfig`](#monolog), above. See the Yii documentation on [messaging filtering](guide:runtime-logging#message-filtering) for more information on how this works.

`monologTargetConfig` and the `MonologTarget` are the only places you should use [PSR-3](#psr-3-logging) `Psr\Log\LogLevel` constants—other Yii-compatible log targets should use <yii2:yii\log\Logger> constants.

::: tip
The available options for each type of `Target` will differ, and may include things like API keys or hostnames for external services. Refer to the author’s documentation for specific requirements!
:::

### `stdout` and `stderr`

Craft redirects all log output from Monolog targets to `stdout` and `stderr` when [`CRAFT_STREAM_LOG`](../reference/config/bootstrap.md#craft-stream-log) is set to `true`. This is common in load-balanced environments and servers with ephemeral filesystems, where log output is aggregated from multiple sources, or the sources themselves are not directly accessible.

### Trace Level

To see exception-like traces for _all_ logs, set the log component’s [`traceLevel` property](guide:runtime-logging#trace-level):

```php
<?php
# config/app.php
return [
    'components' => [
        'log' => [
            // Include this many levels of the call stack:
            'traceLevel' => 5,
        ],
    ],
];
```

::: warning
Keep in mind that non-zero `traceLevel` values can incur a performance hit as the system accumulates debugging data!
:::

## Logging Your Own Events

You can log your own messages from a plugin or module.

### Using Craft’s Logger

Convenience methods are available for different severity levels:

- `Craft::debug()` – non-essential information that can be used for debugging issues
- `Craft::info()` – standard level for informative contextual details
- `Craft::warning()` – messages that indicate something problematic or unexpected even though everything continues to work
- `Craft::error()` – most urgent level before an exception, used to indicate that something didn’t function properly

::: tip
By default, Craft logs levels `info` and up when <config5:devMode> is enabled. Otherwise, anything lower than `warning` will be ignored. To override this behavior, set the `level` property in your [log configuration](#monolog).
:::

Logged messages should designate a message body, level, and optional category. Here, the we’re using the `custom-module` category, overriding the default of `application`:

```php
// Short form, using a helper function for the `info` level:
Craft::info('My first log message!', 'custom-module');

// The equivalent call, with an explicit level:
Craft::getLogger()->log('My first log message!', Logger::LEVEL_INFO, 'custom-module');
```

These messages would be dispatched to the main log files (in environments where `info`-level messages are processed), as well as the custom `MonologTarget` we set up earlier! In both places, it will receive a `[custom-module]` designation:

```
2022-09-16 16:50:49 [web.INFO] [custom-module] My first log message! {"memory":1038928}
```

Anything that can be serialized as JSON can be logged.

### PSR-3 Logging

Craft 4 doesn’t require any changes to existing logging setups, but now accepts PSR-3 messages:

```php
use samdark\log\PsrMessage;

// Traditional Yii2 Logging:
Craft::error('Some error…', 'Some category (logged as context.category)');

// PSR-3 Logging, with context and message substitutions:
Craft::error(new PsrMessage(
    'Some error, {psr3Replacement}',
    [
        'some' => 'context',
        'to' => ['be', 'serialized'],
        'psr3Replacement' => 'https://www.php-fig.org/psr/psr-3/'
    ],
));
```

Using the [convenience methods](#using-craft-s-logger) will automatically translate Yii log levels to the most appropriate PSR-3 level when dispatched to a `MonologTarget`.

## Further Reading

- [Adding Logging to Craft Plugins with Monolog](https://putyourlightson.com/articles/adding-logging-to-craft-plugins-with-monolog)
