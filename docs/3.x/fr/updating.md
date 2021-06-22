# Updating Instructions

## Updating from the Control Panel

When an update is available, users with the permission to update Craft will see a badge in the control panel next to **Utilities** in the main navigation. Click **Utilities**, then **Updates**. (You can also get to this view directly from the **Updates** widget that’s installed by default in the control panel dashboard.)

This section displays updates for Craft CMS plugins, each with its own **Update** button. Clicking that will initiate Craft’s self-updating process.

You can choose **Update All** at the top left to initiate all available Craft and/or plugin updates at once.

While there aren’t usually any warnings, it’s always a good idea to check before updating. While there aren’t usually any warnings, it’s always a good idea to check the changelog and [any upgrade guides](#upgrade-guides) before updating.
:::

## Updating from the Terminal

Craft 3.0.38 and 3.1.4 introduced a new `update` console command that can be used to update Craft and plugins.

To see available updates, go to your Craft project in your terminal and run this command:

```bash
php craft update
```

![An example interaction with the ](./images/cli-update-info.png)

To update everything all at once, run this command:

```bash
php craft update all
```

To update a specific thing, replace `all` with its handle (either `craft` to update Craft, or a plugin’s handle).

```bash
php craft update element-api
```

![update <handle></code> command."](./images/cli-update-plugin.png)

You can also pass multiple handles in at once:

```bash
php craft update element-api commerce
```

By default, Craft will update you to the latest available version. To update to a specific version, append `:<version>` to the handle:

```bash
php craft update element-api:2.7.0
```

Craft also provides an `update/composer-install` command, which behaves like the `composer install` command, but doesn’t require you to have Composer installed.

## Upgrade Guides

Sometimes there are significant changes to be aware of, so it’s worth checking the upgrade guide for each version or edition along your upgrade path.

- [Upgrading to Craft 3.7](https://craftcms.com/knowledge-base/upgrading-to-craft-3-7)
- [Upgrading to Craft 3.6](https://craftcms.com/knowledge-base/upgrading-to-craft-3-6)
- [Upgrading to Craft 3.5](https://craftcms.com/knowledge-base/upgrading-to-craft-3-5)
- [Upgrading to Craft Pro](https://craftcms.com/knowledge-base/upgrading-to-craft-pro)
