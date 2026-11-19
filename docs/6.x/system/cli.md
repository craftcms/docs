---
description: Many of Craft’s powerful content and administrative tools are also available via the command-line.
---

# Command-Line Interface

Craft’s [HTTP API](../development/forms.md) is complemented by commands we expose via Laravel’s [Artisan](laravel:artisan) console.
Both means of accessing Craft’s features generally flow through the same core Craft APIs.

<!-- more -->

This can be useful for automating tasks with `cron`, running actions in a [deployment process](kb:deployment-best-practices), working with Craft via SSH, and running resource-intensive tasks that might otherwise be constrained by the limits of your web server.
If you installed Craft using our [quick-start guide](../install.md), you’ve already used the CLI!

The Craft CLI executable typically lives at the root of your project (as [a file named `craft`](directory-structure.md#craft)) and requires a compatible PHP installation to run.
You can view a [list of available commands](../reference/cli.md) in the **Reference** section.

::: tip
The version of PHP that handles HTTP requests may not be the same as the one that is available directly in your terminal.

Some development environments or hosting platforms have specific tools for running console commands—for example, DDEV has a special `ddev craft …` command that automatically attaches to the appropriate container before running a command. In this case, you would use `ddev craft` instead of `php craft`.
:::

Running `php craft` without any arguments will output a complete list of available options.

```
$ php craft

Craft CMS 6.0.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
      --silent          Do not output any message
  -q, --quiet           Only errors are displayed. All other output is suppressed
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --env[=ENV]       The environment the command should run under
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  clear-caches          Lists available caches to clear or clear specific caches.
  clear-deprecations    Clears all deprecation warnings.
  help                  Display help for a command

...
```

You can also run `php craft help <command-name>` to learn more about a command and whatever parameters and options it may accept.

<See path="../reference/cli.md" label="Console Commands Reference" description="Explore Craft’s CLI API" />

::: tip
See the [Console Commands](../extend/commands.md) page in the _Extending Craft_ section to learn about adding your own console commands.
:::

## Artisan

After the [upgrade](../upgrade.md), you may have noticed an `artisan` executable in your project’s root directory.
This is the generic entrypoint for Laravel.
The same features are accessible through both, but the commands will look slightly different:

::: code
```bash artisan
# `craft` is part of the command signature:
php artisan craft:db:backup
```
```bash craft
# Commands are used without the prefix:
php craft db:backup
```
:::

Craft also registers slash-separated commands (like `db/backup`), for compatibility.
