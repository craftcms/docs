---
keywords: cli
containsGeneratedContent: yes
---

# Console Commands

While most of your interaction with Craft happens in a browser, a number of important tools are available via command line interface (CLI) actions that are run in a terminal.

This can be useful for automating tasks with `cron`, running actions in a [deployment process](kb:deployment-best-practices), working with Craft via SSH, and running resource-intensive tasks that might otherwise be constrained by the limits of your web server.

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

The complete list of available commands will include those from any plugins or custom modules you’ve added to your project. The list below represents just those that are present by default in all Craft installations.

### Global Options

All commands support the following options:

`--color`
: Explicitly enable or disable ANSI coloring in output. When omitted, color will only be used in environments that support it.

`--help`
: Displays help about the command, rather than running it. Alternative to `php craft help controller/action`.

`--interactive`
: Enable or disable interactive prompts for the command. For use in unattended or automated workflows (like CRON or deployments), consider setting `--interactive=0`.

`--isolated`
: Acquire a [mutex lock](yii2:yii\mutex\Mutex) before running the command to prevent simultaneous execution. Some commands (like `migrate` and `project-config`) have their own internal locking mechanism. A properly configured, centralized mutex driver (like Redis) is required in load-balanced environments—the default file-based driver can only prevent concurrent execution on a single machine.

`--silent-exit-on-exception`
: Force a nominal exit code (`0`), even if an exception occurred. Useful when inconsequential failures would otherwise block chained commands in automated environments.

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/4.x/console-commands.md)!!!
