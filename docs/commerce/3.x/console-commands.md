# Console Commands

Commerce adds console commands that can be run in your terminal.

See Craft’s [Console Commands](/3.x/console-commands.md) page for more about using console commands.

## reset-data

Cleanses Commerce data without uninstalling the plugin or removing store configuration. This can be useful for removing test data after finishing initial project development.

Deletes all orders, subscriptions, payment sources, customers, addresses and resets discount usages.

**Example**

```
php craft commerce/reset-data
```
