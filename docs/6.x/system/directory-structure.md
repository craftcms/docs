# Directory Structure

A fresh Craft installation shares most of its structure with a standard Laravel application.
This page describes those default [folders](#folders) and [files](#files)… but keep in mind that existing projects may have all kinds of [additional files](#other-common-files) in the root!

<!-- more -->

You don’t need to be familiar with everything in the working directory to get started with Craft, but it is a great way to discover tools and configuration that will help you work more efficiently, down the line.

## Folders

### `app/`

Your Craft project is a Laravel application, so it can do anything Laravel can!
If you pursue [extending Craft](../extend/README.md), you may need to add files in this directory.

Most projects can leave it as-is, but we do not recommend deleting it without understanding how it relates to `bootstrap/providers.php`.

### `bootstrap/`

This folder contains two files that your app needs to boot up:

- `app.php` — The application “factory” that performs some low-level configuration and returns an instance of Laravel.
- `providers.php` — Lists your app’s [service providers](laravel:providers).

In general, you will not need to edit these files unless you are [extending Craft](../extend/README.md) or building custom features with Laravel.
You may see a `cache/` directory in here, as well: everything in there is ignored by version control, and can be rebuilt by Laravel.

### `config/`

All of your project’s static [configuration](../configure.md#where-configuration-happens) files live here.
Craft-specific config files (including `license.key`) are in a `craft/` subdirectory; anything you see at the top level (like `config/filesystems.php`) is owned by Laravel.

Your [`.env` file](#env) is typically located in the project root!

### `public/`

This directory represents your server’s web root.
The HTTP entry script (`index.php`) lives here, alongside your static images, stylesheets, and JavaScript files.

Craft and Laravel will also publish static assets into the `public/vendor/` directory.

### `resources/`

Private files that your app uses at runtime, or publishes.

#### `resources/views/`

Your front-end Twig templates go in here. Any local site assets, such as images, CSS, and JS that should be statically served, should live in the [web/](directory-structure.md#web) folder. The [Routing](routing.md) page has an overview of how files in this folder are handled.

#### `resources/widgets/`

[Custom dashboard widgets](../extend/widgets.md#template-driven-widgets) can be added here, as `.md` files.
This directory is not part of the standard project structure, so you will have to create it.

### `routes/`

Projects that need [custom routes](routing.md) can add them here, in a `web.php` file.
Custom [commands](laravel:artisan#writing-commands) can also be added to a `console.php` file.

::: web
These file names should match whatever is listed in `bootstrap/app.php`.
:::

We cover some of the features you can use in `routes/web.php` in [our own routing docs](routing.md), but this is technically a [native Laravel feature](laravel:routing).

### `storage/`

This is where Craft stores a variety of files that are dynamically generated at runtime.
Some of the folders you might find in the storage directory include:

- `backups/` — Stores database backups initiated by Craft while updating, or captured manually via the control panel utility or [CLI](../reference/cli-api.md#db-backup).
- `logs/` — Stores the application’s [logs](logging.md), when using the default file-based [drivers](laravel:logging#available-channel-drivers).
- `runtime/` — Pretty much everything in here is there for caching and debugging. Nothing that Craft couldn’t live without, if the folder happened to get deleted.

For the curious, here are the types of things you will find in `storage/runtime/` (though this is not a comprehensive list):

- `assets/` — Temporary uploads, image thumbnails, resized file icons, image editor scratch files, and copies of images stored on remote asset volumes (to save Craft an HTTP request when it needs the images to generate new thumbnails or transforms).
- `cache/` — Arbitrary data caches, when using a [disk-based cache driver](laravel:cache#storage).
- `compiled_classes/` — Dynamically-defined PHP classes.
- `compiled_templates/` — Compiled Twig templates. This is _not_ your main [views](#views) folder!
- `temp/` — Other temporary files. The names and contents of files in here do not obey any convention—the assumption should be that they will be deleted or overwritten between requests.

### `vendor/`

This is where all of your Composer dependencies go—including Craft and any plugins you’ve installed. This directory should _not_ be tracked in version control.
Instead, commit [`composer.lock`](#composerlock), and use [`composer install`](https://getcomposer.org/doc/03-cli.md#install-i) to rebuild it.

## Files

### `.env`

This is your [PHP dotenv](https://github.com/vlucas/phpdotenv) configuration file.
It is used to store sensitive or [environment-specific config](../configure.md#env) values that don’t make sense to commit to version control.
Laravel handles loading this file for you, so it must be discoverable in the root of the project.

The [starter project](repo:craftcms/craft) provides a stub of Laravel’s `.env` file that contains a number of variables you can use to quickly customize framework features.
Consider keeping this file updated (with sensitive data removed) as a starting point for your actual `.env` file, so collaborators know what variables the project requires.
When they set up the project, they can run `cp .env.example .env` to duplicate the file and fill out missing keys!

### `.gitignore`

This file tells Git which files it should exclude when committing changes
 At minimum, it should contain entries for `.env` and Composer’s `vendor/` directory.

Check out our [Hosting & Deployment](../deploy.md#be-aware-of-artifacts) article for a list of other things you’ll want to exclude.

### `composer.json`

Your project’s PHP dependencies are declared in this file. If you just started your project, the only two packages it will explicitly require are `craftcms/cms` (Craft’s core) and `vlucas/phpdotenv` (used in the entry scripts). Existing projects may contain more packages—say, if the it relies on Craft [plugins](plugins.md) or includes other [custom functionality](../extend/README.md).

Craft uses Composer to update itself and install plugins. See the [Composer documentation](https://getcomposer.org/doc/04-schema.md) for details on how this file works.

### `composer.lock`

This is a Composer-managed file that contains the _exact_ list of packages (and their versions) that should be installed in the `vendor/` directory. It should be committed to version control so that anyone working on the project can run `composer install` to download all its dependencies.

### `craft` and `artisan`

These are command line executables used to run Craft and Laravel [console commands](../reference/cli-api.md).
They serve a similar role as `public/index.php` (insofar as they bootstrap the Laravel application), but the console entry points send terminal input into the Artisan system.

You can invoke either console entrypoint with `php` or treat them as binaries (thanks to the [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) at the top of each file):

```bash
# Via Laravel:
php artisan craft:db:backup

# Via Craft:
php craft db:backup

# As a binary:
./artisan craft:db:backup
./craft db:backup
```

<See path="cli.md" description="Learn more about what you can do with Craft’s CLI." />

## Other Common Files

Depending on the age and structure of a Craft project (as well as the tools used to build it), its root directory may look a little bit different!
Here are some examples of common things you might find when inheriting a project:

### `.ddev/`

If you (or another maintainer) followed the [installation](../install.md) instructions or [Getting Started Tutorial](/getting-started-tutorial/README.md), DDEV probably left a `.ddev/` directory in the root of your project.
This is safe to keep in version control—DDEV may make changes to it from time to time, but a separate `.gitignore` file exists within it to ensure only necessary files are tracked.

### `migrations/`

[Content migrations](../extend/migrations.md) from the upgrade to 5.x or other automated work (like merging custom fields) may live here.
Laravel has its own `database/migrations/` directory, where new migrations belong.

### `modules/`

Projects with this directory

### `web/`

Older projects may have carried over our convention of naming their web root `web/`.
There is no functional difference between these folder names, but most Craft and Laravel resources will refer to it as `public/`.

If you have a `web/` directory, you should consolidate any files into `public/` (keeping Laravel’s `index.php`), and check your web server’s configuration to ensure the web root is set correctly.

### `tests/`

When using tests to validate application changes, you are apt to have a dedicated `tests/` directory.

::: warning
Documentation for automated testing of Craft 6 has not been published.
Pest and PHPUnit tests are [fully supported by Laravel](laravel:testing).
:::

### `lang/`

Multi-site projects often make use of [static translations](sites.md#static-message-translations), which are stored in this directory, indexed by their language code.

### `package.json`

Projects that use Node.js will typically contain `package.json` and `package-lock.json` files, as well as a `node_modules/` directory.
Craft does not interact with these files, but they often contain information about how the front-end of your site works.

Oftentimes, a Node.js “build step” will output files that are then loaded by a user’s browser—those should be written to the web root so they can be directly requested via HTTP.

### Docker Files

A `Dockerfile` or `docker-compose.yml` in your project root suggests that it is intended to be run in [Docker](https://www.docker.com/), a containerized development environment.
DDEV users will typically _not_ see these files, as they’re abstracted by configuration stored in the [`.ddev/` directory](#ddev).

### IDE Configuration

Some editors write configuration to a file or folder within your project—for example, PhpStorm will create a `.idea/` directory; Visual Studio Code uses `.vscode/`.
Coordinate with your team about which tools are valuable to your process, and commit anything that supports it.
