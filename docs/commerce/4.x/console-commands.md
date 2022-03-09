---
keywords: cli
---
# Console Commands

Commerce adds console commands that can be run in your terminal.

See Craft’s [Console Commands](/3.x/console-commands.md) page for more about using console commands.

## example-templates

Customizes and copies example templates into your project’s template folder.

```
$ php craft commerce/example-templates
A folder will be copied to your templates directory.
Choose folder name: [shop] myshop
Use CDN link to resources (tailwind)? (yes|no) [yes]: yes
Base Tailwind CSS color: [gray,red,yellow,green,blue,indigo,purple,pink,?]: green
Attempting to copy example templates ... 
Copying ...
Done!
```

## reset-data

Cleanses Commerce data without uninstalling the plugin or removing store configuration. This can be useful for removing test data after finishing initial project development.

Deletes all orders, subscriptions, payment sources, customers, addresses and resets discount usages.

**Example**

```
php craft commerce/reset-data
```
