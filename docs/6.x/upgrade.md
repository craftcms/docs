---
description: Craft 6.x is our biggest technical leap and easiest upgrade, yet. Let’s get started!
sidebarDepth: 3
---

# Upgrading to Craft 6.x

The smoothest way to upgrade to Craft 6 is to make sure your live and local environments are already running the [latest version of Craft 5](/5.x/updating.md).
We recommend approaching the upgrade in three phases: [preparation](#preparing-for-the-upgrade), a [local upgrade](#performing-the-upgrade), and [triage](#deprecations).

<!-- more -->

## Preparing for the Upgrade

This guide assumes you’ll be using our upgrade helper tool.
If you’d like to know more about the individual steps involved in the upgrade, skip to the [Upgrading Manually](#upgrading-manually) section.

### Requirements

There are a few things that you must take care of _before_ the upgrade:

- Update Craft to the latest 5.x release, and all plugins to their latest compatible versions (see the note below about the state of plugins during alpha). You cannot upgrade directly to Craft 6.x from Craft 4.x or earlier.
- Upgrade PHP on your host to 8.5
- Resolve any outstanding deprecation notices

The adapter can only make project and plugin code compatible with Craft 6.x; it is not a PHP polyfill, and it does not loosen Craft’s [system requirements](requirements.md).

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

Your project is apt to continue working after the update, but it will include the [adapter](compatibility.md) package.
Don’t remove it before reviewing the rest of this guide!

<Block label="On Plugins">

During the alpha and beta phases, you may need to set `CRAFT_DISABLED_PLUGINS="*"` in `.env` or fully uninstall plugins before starting the upgrade to prevent incompatible ones from loading or running.
They are bootstrapped very early in the app’s lifecycle, and an error can leave your project in a partially-upgraded state.

Not all plugins will be necessary!
Laravel makes it possible to directly configure mailers, loggers, filesystems, and more.

</Block>

## Performing the Upgrade

1. Install the upgrade tool:

    ```bash
    composer global require craftcms/craft6-revamp
    ```

    The tool will examine your project structure and will warn you if it’s unable to safely make changes.
    It runs on any system that supports Craft 5.x.

    ::: tip
    If you can’t install a composer package on your host machine, you can mount your project directory into an ephemeral Docker container and run the commands there:

    ```
    # On the host machine...
    $ cd path/to/project
    $ docker run --interactive --tty --volume $PWD:/app composer bash

    # ...in the container:
    -> 42dae745a6ab:/app# composer global require craftcms/craft6-revamp
    -> ...
    -> 42dae745a6ab:/app# composer global exec craft6-revamp
    ```
    :::
2. Run `craft6-revamp` in your project’s root directory. The full list of actions our tool will attempt to take is available on its [repository](repo:craftcms/craft6-revamp); each step is printed to the console, and it will confirm (or bail) before taking any potentially-destructive actions.
3. Perform any **Next Steps** recommended by the tool. At a minimum, this should include…
    - `ddev restart` to apply the new project settings (DDEV users only);
    - `ddev composer update` to install new dependencies (or `composer update` outside of DDEV);
    - `ddev artisan craft:setup:publish` to publish Craft’s config stubs, control panel assets, and `craft` executable;
    - `ddev artisan key:generate` to set the new `APP_KEY` in your `.env` file;

The upgrade tool is intended to align your project with the new starter, rather than strictly what is required for compatibility.
If your project uses a filesystem adapter other than the default _Local_ one, you’ll see some configuration suggestions for each one.
Add these to the `disks` array in `config/filesystems.php`, keyed by their handles.

### Run Migrations

There are about two dozen lightweight migrations to run.
Many handle replacing legacy class names with their new namespaces.
None touch your content, and the number of required queries does not scale with the number of elements you have.

```
# Use the new `artisan` entrypoint...
ddev artisan craft:up

# ...or the familiar `craft` executable:
ddev php craft up
```

The new DDEV project type means that it will only forward `artisan` commands, but you can still use Craft’s entry point via `ddev php craft`.

::: warning
If you see a warning about the application being in production, it’s safe to ignore.
Laravel will warn you before applying migrations when `APP_DEBUG` is off.
:::

### Image Transforms

Craft 6 stores generated image transforms in a new location, and the migrations clear the transform index.
Transforms are generated again as they’re requested, which can take a while (and cost a lot of writes) on volumes with many transforms.
To reuse the transforms Craft 5 generated instead, move them into the new location.

Craft 5 stored each transform at `{folderPath}/{transform}/{filename}`.
Craft 6 adds a folder named after the volume’s UID: `_{volumeUid}/{folderPath}/{transform}/{filename}`.

- `{volumeUid}` is the volume’s UID, the part after `--` in its `config/craft/project/volumes/{handle}--{uid}.yaml` filename.
- `{folderPath}` is the asset’s folder within the volume, and is empty for assets in the volume’s root.
- `{transform}` is an underscore followed by a named transform’s handle, such as `_thumb`, or an ad-hoc transform’s parameters, such as `_1200xAUTO_crop_center-center_82_none`.
  These folder names and filenames haven’t changed.

Both paths are relative to the root of the disk transforms are stored on, not the volume’s subpath.
That’s the volume’s own disk, unless the disk’s `asset_transformer` settings in `config/filesystems.php` set an `output_disk`.
If your Craft 5 volume had a _Transform Filesystem_ or _Transform Subpath_, those settings aren’t carried over: set an `output_disk` that points at the same place, such as a `scoped` disk with the transform subpath as its `prefix`, and move the files within it.

For a volume with the UID `6d1f0b4e-…`, a `thumb` transform of `blog/2024/sunset.jpg` moves like this:

```
blog/2024/_thumb/sunset.jpg  →  _6d1f0b4e-…/blog/2024/_thumb/sunset.jpg
```

Move every transform folder (each folder whose name begins with an underscore) this way, keeping the folders around it, and leave the assets themselves where they are.
For remote disks, use your storage provider’s tools to move them on the server, so the files don’t have to be downloaded.

Craft picks up the moved files without generating them again:

- On local disks, Craft finds each file the first time the transform is requested, and returns its URL.
- On other disks, the first request for each transform returns a URL that generates it, as usual.
  Generating it finds the existing file and uses it, without processing the image.
  To get the transforms’ own URLs straight away, generate them before the page loads, such as with the `immediately` argument in GraphQL: `url @transform(handle: "thumb", immediately: true)`.

Transforms whose settings changed after they were generated are generated again either way.
Craft doesn’t delete transforms you leave in their old location.

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
- Command syntax should be compatible, but we recommend replacing external invocations with Artisan convention (in most cases, this just means using `:` instead of `/` between command segments);
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
            subtitle="Review changes as they’re released."
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

## Upgrading Manually

Begin by following the same [preparation](#preparing-for-the-upgrade) steps, above.

With very few exceptions, we recommend using our upgrade tool for the smoothest upgrade experience.
If you want to tackle the upgrade by hand, the steps below are synthesized from the tool’s [Readme](repo:craftcms/craft6-revamp).

### Packages

In `composer.json`, update the `craftcms/cms` constraint to `^6.0.0-alpha.1`.
Do the same for each 6.x-ready plugin, noting that some may no longer be necessary.

Add Laravel’s package discovery and Craft’s publish command to the `post-autoload-dump` scripts, as in [the starter project](repo:craftcms/craft/blob/6.x/composer.json):

```json
{
  "scripts": {
    "post-autoload-dump": [
      "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
      "@php artisan package:discover --ansi",
      "@php artisan craft:setup:publish --ansi"
    ]
  }
}
```

::: warning
Don’t run `composer update` yet!
:::

### DDEV

Update your DDEV’s `project-type` to `laravel`, set the PHP version to `8.5`, and switch the `docroot` to `public`.

### Environment Variables

Laravel uses different variables to configure your database connection and debug settings:

| Old | New |
| --- | --- |
| `CRAFT_DB_DRIVER` | `DB_CONNECTION` |
| `CRAFT_DB_SERVER` | `DB_HOST` |
| `CRAFT_DB_PORT` | `DB_PORT` |
| `CRAFT_DB_USER` | `DB_USERNAME` |
| `CRAFT_DB_PASSWORD` | `DB_PASSWORD` |
| `CRAFT_DB_DATABASE` | `DB_DATABASE` |
| `CRAFT_DB_SCHEMA` | `DB_SCHEMA` |
| `CRAFT_DB_TABLE_PREFIX` | `DB_TABLE_PREFIX` |
| `CRAFT_DEV_MODE` | `APP_DEBUG` |
| `CRAFT_SECURITY_KEY` | Remove |

::: tip
Be sure and look in your main `.env` file, as well as any container-specific files that DDEV might merge in (`.ddev/.env` and `.ddev/.env.web`).
:::

Then add these to your main `.env` file:

```bash
CACHE_STORE=file
SESSION_DRIVER=file
APP_KEY=
```

`APP_KEY` stays empty for now; you’ll generate it in the [final steps](#final-steps).

### Web Root

Rename your web root (typically `web/`) to `public/`.

### Entry Scripts

If you have a shared `bootstrap.php` file at the root of your project, remove it.
This is a Craft-specific entrypoint, and [it won’t work after the upgrade](#bootstrapping).

::: warning
Customizations to bootstrap variables will be lost.
Most path constants are no longer necessary, as the rest of this section is intended to work with Laravel’s [default project structure](laravel:structure).
:::

Create a `bootstrap/app.php` file, referenced in the executable above.
Its contents should match [the starter project](repo:craftcms/craft/blob/6.x/bootstrap/app.php).

#### CLI

Add the `artisan` executable at the root of your project, with [`0755`](https://chmod.guru/#755) permissions.
Its content should match [the starter project](repo:craftcms/craft/blob/6.x/artisan).

For now, remove the `craft` executable from the root of the project.
It will be re-published after the upgrade.

#### Web

Replace the contents of `public/index.php` with that of [the starter project](repo:craftcms/craft/blob/6.x/public/index.php).

### Storage Folders

Laravel expects a slightly different `storage/` directory setup.

```bash
mkdir -p storage/framework/{cache,sessions,views}
```

In those three leaves, create a `.gitignore` file so the directories are tracked, but their contents are not:

```
*
!.gitignore
```

### Configuration Files

Move Craft’s config files (`config/*`) into `config/craft/`.
Review your config files for [any required changes](compatibility.md#configuration).

### Static Message Translations

Rename `translations/` to `lang/`.

### Templates

Move your Twig files from `templates/` to `resources/views/`.

### Filesystems

We’ve dropped our own filesystem concept in favor of directly configuring [Laravel disks](laravel:filesystem), so filesystem plugins are no longer necessary.
Each of your filesystems should be translated to disk configurations, retaining their handles.

Refer to the Laravel documentation for specifics.
You can retrieve existing configuration values from the `fs` key in `config/craft/project/project.yaml`, replacing instances of `$ENV_VAR` with `env('ENV_VAR')`.

### Final Steps

Before proceeding, DDEV users should restart their project using `ddev restart`.
The same applies to any container-based environment—you may need to pull and rebuild the new PHP 8.5 images, if this is your first time using them.

Run `ddev composer update` to reconcile and install the new [packages](#packages).

To publish Craft’s config stubs, the latest control panel assets, and the `craft` console executable, run `ddev artisan craft:setup:publish`.
(Composer also runs this after every `composer update`, via the `post-autoload-dump` script you added.)

Generate a value for the empty `APP_KEY` in your `.env` file by running `ddev artisan key:generate`.

Complete the upgrade by running [migrations](#run-migrations):

```bash
# Use the Artisan shortcut for DDEV...
ddev artisan craft:up

# ...or directly invoke the Craft executable:
ddev php craft up
```
