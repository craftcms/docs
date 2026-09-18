---
description: Craft 6.x is our biggest technical leap and easiest upgrade, yet. Let’s get started!
sidebarDepth: 3
---

# Upgrading to Craft 6.x

The smoothest way to upgrade to Craft 6 is to make sure your live and local environments are already running the [latest version of Craft 5](/5.x/updating.md).
We recommend approaching the upgrade in three phases: [preparation](#preparing-for-the-upgrade), a [local upgrade](#performing-the-upgrade), and [triage](#deprecations).

<!-- more -->

## Preparing for the Upgrade

### Requirements

There are a few things that you need to take care of _before_ the upgrade (even with the [adapter](compatibility.md)):

- Update Craft to the latest 5.x release, and all plugins to their latest compatible versions (see the note below about the state of plugins during alpha). You cannot upgrade directly to Craft 6.x from Craft 4.x or earlier.
- Upgrade PHP on your host to 8.5
- Resolve any outstanding deprecation notices

### Reminders

The alpha is primarily intended to give [plugin developers](extend/README.md) a chance to make a handful of required compatibility updates.
That said, we were seeing successful upgrades as early as the first developer preview, which we shared at Dot All Lisbon, in October 2025!

If you haven’t already, consider spinning up a fresh Craft 6.x project.
You’ll be able to get a sense for the new project structure without the pressure of plugin compatibility or deprecation warnings.

- Categories, Global Sets, and Tags are deprecated, and may be [entrified](https://craftcms.com/blog/entrification) during the upgrade! If you want to customize how they are migrated, use the [`entrify/*` commands](/5.x/reference/cli.md#entrify) in your 5.x project before you begin the upgrade.
- Commit and deploy any final changes to your live environment
    - While project config schema is *mostly* consistent between 5.x and 6.x, we do not recommend attempting to merge changes across versions (i.e. from an a feature branch), especially during the alpha and beta.
- Allow your queue to fully process. Consider running `ddev craft queue/run` if there are a lot of pending jobs and you can’t keep a browser open.
    ::: warning
    During the upgrade, your `queue` table is removed and rebuilt. _Any remaining jobs will be lost, regardless of their status._
    :::
- Capture a database backup.
- Take note of your configured mail adapter in <Journey path="Settings, Email" />.

Your project is apt to continue working after the update, but it will include the adapter package.
Don’t remove it before reviewing the rest of this guide!

### On Plugins

During the alpha and beta phases, you may need to set `CRAFT_DISABLED_PLUGINS="*"` in `.env` or fully uninstall plugins before starting the upgrade to prevent incompatible ones from loading or running.
They are bootstrapped very early in the app’s lifecycle, and an error can leave your project in a partially-upgraded state.

Not all plugins will be necessary!
Laravel makes it possible to directly configure mailers, loggers, filesystems, and more.

## Performing the Upgrade

1. Install the upgrade tool:

    ```bash
    composer global require craftcms/craft6-revamp
    ```

    The tool will examine your project structure and will warn you if it’s unable to safely make changes.
    It runs on any system that runs Craft 5.x.

    ::: tip
    If you can’t install a composer package on your host machine, you can mount your project directory into an ephemeral Docker container and run the commands there:

    ```
    # On the host machine...
    $ docker run --interactive --tty --volume $PWD:/app composer bash

    # ...in the container:
    -> 42dae745a6ab:/app# composer global require craftcms/craft6-revamp
    -> ...
    -> 42dae745a6ab:/app# composer global exec craft6-revamp
    ```
    :::
2. Run `craft6-revamp` in your project’s root directory. The full list of actions our tool will attempt to take is available on its [repository](repo:craftcms/craft6-revamp).
3. Perform any **Next Steps** recommended by the tool. At a minimum, this should include…
    - `ddev restart` to apply the new project settings (DDEV users only);
    - `ddev composer update` to install new dependencies (or `composer update` outside of DDEV);
    - `ddev artisan vendor:publish --tag=craftcms` to publish stubs for Laravel and Craft;

### Run Migrations

There are about ten lightweight migrations to run.
Many handle replacing legacy class names with their new namespaces.
None touch your content, and the number of required queries does not scale with the amount of elements you have.

```
# Use the new `artisan` entrypoint...
ddev artisan craft:up

# ...or the familiar `craft` executable:
ddev php craft up
```

The new DDEV project type means that it will only forward `artisan` commands, but you can still use Craft’s entry point via `ddev php`.

::: warning
If you see a warning about the application being in production, it’s safe to ignore.
Laravel will warn you before applying migrations when `APP_DEBUG` is off.
:::

### Bootstrapping

During the upgrade, we removed the `bootstrap.php` file that has come with new projects [since Craft 3.7](https://github.com/craftcms/craft/releases/tag/1.1.5).
If you had any customizations to Craft’s initialization process (like how environment variables are loaded), you may need to find equivalent features in Laravel.

Many of the [bootstrap variables](compatibility.md#constants) you would define here have been removed and will have no effect.
We strongly recommend using the [new default Craft project structure](https://github.com/craftcms/craft/tree/6.x).

If you used the upgrade tool, it removed `vlucas/phpdotenv` from your `composer.json`, but it will still be installed as a transitive dependency of Laravel.
You do not need to do anything to continue using a `.env` file, provided it is at the application “root” (typically next to the `vendor/` directory, or the path passed to `Application::configure()` in the new `bootstrap/app.php`).

### Cleanup

We recommend taking another snapshot of your database and code so that you can revert to this freshly-upgraded state if you want to try different strategies for dealing with [deprecations](#deprecations).

::: warning
The upgrade tool added `craftcms/yii2-adapter` to your project’s Composer requirements to make templates and modules [compatible with 6.x](compatibility.md).
Don’t remove this until you have resolved all new deprecation warnings!
:::

### Deployment

::: danger
Craft 6.x is not ready for production use.
This section is for reference only.
:::

When your project is in a stable state, you can deploy it to a server that meets Craft’s requirements.
Keep in mind that the layout of your project has changed significantly!

- Any steps in your deployment that involve paths (i.e. symlinking storage or other persistent files) may need to change;
- Commands should be mostly compatible, but slash-separated action paths are only supported with the adapter;
- CRON tasks, daemons, and other queue processes should be reviewed (or replaced/supplemented with the [scheduler](laravel:scheduling) command when applicable);

## Deprecations

At this point, you should have a fully-functional Craft application!

The rest of the upgrade can be tackled at your leisure—but you should review the [compatibility](compatibility.md) section to get an idea of how much work is ahead.

<See path="compatibility.md" description="A detailed guide for ejecting the adapter package." />

## Extensions

Plugin developers should continue exploring the [extension upgrade guide](extend/README.md).

If you maintain a _module_, your application just got a whole lot more powerful.
Craft 6.x projects are just Laravel applications, meaning you are free to use them just as you would if Craft wasn’t part of the picture… except you get access to its huge library of APIs for working with content, users, templates, GraphQL, and more!

You can follow along with the plugin development guide or jump right in to the [Laravel documentation](laravel:lifecycle) to learn about how modules can unfurl into your project’s main “app” space.

## Tools + Resources

Everything we’ve talked about, so far.

<ul class="theme-default-content-override w-full px-0 sm:flex sm:-mx-2 flex-wrap">
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="craft6-revamp"
            subtitle="The fastest way to upgrade."
            link="https://github.com/craftcms/craft6-revamp"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Laravel Documentation"
            subtitle="Authoritative docs for the new framework."
            link="https://laravel.com/docs"
            icon="/docs/icons/icon-book.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Changelog"
            subtitle="Scaffold system components."
            link="https://github.com/craftcms/cms/blob/6.x/CHANGELOG.md"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
    <li class="block mb-4 sm:w-1/2 sm:px-2 sm:py-0">
        <IconLink
            title="Adapter"
            subtitle="Our compatibility layer."
            link="https://github.com/craftcms/yii2-adapter"
            icon="/docs/icons/icon-generic-link.svg"
            iconSize="large" />
    </li>
</ul>
