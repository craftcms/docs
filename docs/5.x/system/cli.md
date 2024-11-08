---
description: Many of Craft’s powerful content and administrative tools are also available via the command-line.
---

# Command-Line Interface

<Todo notes="Move usage info out of console commands page, leaving in place only controller reference sections." />

Craft’s [HTTP API](../development/forms.md) is complemented by its command-line interface or _CLI_, which exposes powerful back-office tools to your terminal. Both means of accessing Craft’s features are part of a broader [controller-action architecture](guide:structure-controllers).

This can be useful for automating tasks with `cron`, running actions in a [deployment process](kb:deployment-best-practices), working with Craft via SSH, and running resource-intensive tasks that might otherwise be constrained by the limits of your web server. If you installed Craft using our [quick-start guide](../install.md), you’ve already used the CLI!

The Craft CLI executable typically lives at the root of your project (as [a file named `craft`](directory-structure.md#craft)) and requires a compatible PHP installation to run. You can view a [list of available commands](../reference/cli.md) in the **Reference** section.

::: tip
The version of PHP that handles HTTP requests may not be the same as the one that is available directly in your terminal.

Some development environments or hosting platforms have specific tools for running console commands—for example, DDEV has a special `ddev craft …` command that automatically attaches to the appropriate container before running a command. In this case, you would use `ddev craft` instead of `php craft`.
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

<See path="../reference/cli.md" label="Console Commands Reference" description="Explore Craft’s CLI API" />

::: tip
See the [Console Commands](../extend/commands.md) page in the _Extending Craft_ section to learn about adding your own console commands.
:::
