---
keywords: cli, terminal, command
containsGeneratedContent: yes
---

# Console Commands

<Todo notes="Split into controllers?" />

The complete list of available commands will include those from any plugins or custom modules you’ve added to your project. Only those that are present by default in all Craft installations are listed below.

::: tip
Run `ddev craft help` to see a list of commands your project supports.
:::

### Global Options

All commands support the following options:

`--color`
: Explicitly enable or disable ANSI coloring in output. When omitted, color will only be used in environments that support it.

`--help`
: Displays help about the command, rather than running it. Alternative to `php craft help controller/action`.

`--interactive`
: Enable or disable interactive prompts for the command. When using the CLI in unattended or automated workflows (like CRON or deployments), consider setting `--interactive=0`.

`--isolated`
: Acquire a [mutex lock](yii2:yii\mutex\Mutex) before running the command to prevent simultaneous execution. Some commands (like `migrate` and `project-config`) have their own internal locking mechanism.

`--silent-exit-on-exception`
: Force a nominal exit code (`0`), even if an exception occurred. Useful when inconsequential failures would otherwise block chained commands in automated environments.

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/5.x/console-commands.md)!!!
