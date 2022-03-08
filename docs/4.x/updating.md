# Updating Instructions

## Updating from the Control Panel

When an update is available, users with the permission to update Craft will see a badge in the control panel next to **Utilities** in the main navigation. Click **Utilities**, then **Updates**. (You can also get to this view directly from the **Updates** widget that’s installed by default in the control panel dashboard.)

This section displays updates for Craft CMS plugins, each with its own **Update** button. Choosing any of those will initiate Craft’s self-updating process.

You can choose **Update All** at the top left to initiate all available Craft and/or plugin updates at once.

::: tip
Craft’s [changelog](https://github.com/craftcms/cms/blob/main/CHANGELOG.md) will warn you of any critical changes at the top of the release notes. While there aren’t usually any warnings, it’s always a good idea to check the changelog and [any upgrade guides](#upgrade-guides) before updating.
:::

## Updating from the Terminal

The [`update` console command](console-commands.md#update) can be used to update Craft and plugins.

To see available updates, go to your Craft project in your terminal and run this command:

```bash
php craft update
```

![An example interaction with the `update` command.](./images/cli-update-info.png)

To update everything all at once, run this command:

```bash
php craft update all
```

To update a specific thing, replace `all` with its handle (either `craft` to update Craft, or a plugin’s handle).

```bash
php craft update element-api
```

![An example interaction with the `update <handle>` command.](./images/cli-update-plugin.png)

You can also pass multiple handles in at once:

```bash
php craft update element-api commerce
```

By default, Craft will update you to the latest available version. To update to a specific version, append `:<version>` to the handle:

```bash
php craft update element-api:2.7.0
```

Craft also provides an `update/composer-install` command, which behaves like the `composer install` command, but doesn’t require you to have Composer installed.

## Volumes

Volumes have changed a bit in Craft 4.

In Craft 3, Volumes were for storing custom files and defining their associated field layouts. In Craft 4, the field layouts work exactly the same but URLs and storage settings are moved to a new concept called a “Filesystem”. You can create any number of filesystems, giving each one a handle, and you designate one filesystem for each volume. Since this can be set to an environment variable, you can define all the filesystems you need in different environments and easily swap them out depending on the actual environment you’re in.

::: tip
You’ll want to create one filesystem per volume, which should be fairly quick since filesystems can be created in slideouts without leaving the volume settings page.
:::

The migration process will take care of volume migrations for you, but there are two cases that may require your attention:

1. `volumes.php` files are no longer supported—so you’ll need to use filesystems accordingly if you’re swapping storage methods in different environments.
2. Any filesystems without public URLs should designate a transform filesystem in order to have control panel thumbnails. Craft used to store generated thumbnails separately for the control panel—but it will now create them alongside your assets just like front-end transforms.

## Upgrade Guides

Sometimes there are significant changes to be aware of, so it’s worth checking the upgrade guide for each version or edition along your upgrade path.

- [Upgrading to Craft 3.7](https://craftcms.com/knowledge-base/upgrading-to-craft-3-7)
- [Upgrading to Craft 3.6](https://craftcms.com/knowledge-base/upgrading-to-craft-3-6)
- [Upgrading to Craft 3.5](https://craftcms.com/knowledge-base/upgrading-to-craft-3-5)
- [Upgrading to Craft Pro](https://craftcms.com/knowledge-base/upgrading-to-craft-pro)
