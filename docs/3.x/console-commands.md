---
keywords: cli
---
# Console Commands

While most of your interaction with Craft happens in a browser, a number of important tools are available via command line interface (CLI) actions that are run in a terminal.

This can be useful for automating tasks with `cron`, running actions in a [deployment process](https://craftcms.com/knowledge-base/deployment-best-practices), working with Craft via SSH, and running resource-intensive tasks that might otherwise be constrained by the limits of your web server.

The Craft console application (`craft`) lives in the root of your project and requires PHP to run.

::: tip
You may need to configure your environment in order to run PHP from your terminal; `php-fpm` and `mod_php` are meant to run with a web server while `php-cli` is a separate process for the command line.
:::

Running `php craft` without any arguments will output a complete list of available options.

```
$ php craft

This is Yii version 2.0.36.

The following commands are available:

- db                                    Performs database operations.
    db/backup                           Creates a new database backup.
    db/convert-charset                  Converts tables’ character sets and collations. (MySQL only)
    db/restore                          Restores a database backup.

- cache                                 Allows you to flush cache.
    cache/flush                         Flushes given cache components.
    cache/flush-all                     Flushes all caches registered in the system.
    cache/flush-schema                  Clears DB schema cache for a given connection
                                        component.
    cache/index (default)               Lists the caches that can be flushed.

...

To see the help of each command, enter:

  craft help <command-name>
```

You can also run `php craft help <command-name>` to learn more about a command and whatever parameters and options it may accept.

::: tip
See the [Console Commands](extend/commands.md) page in the _Extending Craft_ section to learn about adding your own console commands.
:::

While the complete list of available commands will include those from any plugins or custom modules you’ve added to your project, the following are Craft’s default console commands:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/3.x/cms/console-commands.md)!!!
