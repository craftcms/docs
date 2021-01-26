# Updating Instructions

Craft Commerce may be updated like any other update to [Craft or its plugins](/3.x/updating.md).

## Updating from the Control Panel

When an update is available, users with permission to update Craft will see a badge in the control panel next to **Utilities** in the main navigation.

From **Utilities** → **Updates**, any available Commerce updates will be listed along with those for Craft and other plugins. Choose “Commerce” to view the release notes before updating.

::: tip
Always check the release notes for any changes that may impact your site. Any critical changes will be clearly identified at the top.
:::

You can then choose the “Update” button next to Commerce to update the plugin, or “Update All” to run all available updates.

## Updating from the Terminal

The [`update` console command](/3.x/console-commands.md#update) can be used to update Craft and plugins including Commerce.

To see available updates, go to your Craft project in your terminal and run this command:

```bash
php craft update
```

If a Commerce update is available, run this command to apply it:

```bash
php craft update commerce
```

To apply all updates all at once, including those for Craft and other plugins, run this command:

```bash
php craft update all
```
