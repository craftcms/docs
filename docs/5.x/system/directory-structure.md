# Directory Structure

A fresh Craft installation will have the following [folders](#folders) and [files](#files) in it. Existing projects may have [additional files](#other-common-files) in the root.

You don’t need to be familiar with everything in the working directory to get started with Craft, but it is a great way to discover tools and configuration that will help you work more efficiently, down the line.

## Customizing Paths

Craft’s default directory structure is intended to work for most projects and [hosting](../deploy.md) environments, but it is deeply customizable. Paths to many of the core files and folders can be changed by setting special [environment overrides](../configure.md#environment-overrides).

::: warning
Many of these directories’ locations are defined relative to Craft’s _base path_. Manually setting the [`CRAFT_BASE_PATH`](../configure.md#craft_base_path) environment override without making the corresponding adjustments to the rest of your project’s structure (or explicitly setting other paths) can lead to a non-functional installation.
:::

## Folders

### `config/`

Purpose
: Holds all of your project’s static [configuration](../configure.md#where-configuration-happens) files, as well as its `license.key` file. Your [`.env` file](#env), however, is typically located in the project root!

Configuration
: [`CRAFT_CONFIG_PATH`](../configure.md#craft-config-path)

### `storage/`

Purpose
: This is where Craft stores a variety of files that are dynamically generated at runtime.

  Some of the folders you might find in the storage directory include:

  - `backups/` — Stores database backups that get created when you update Craft, or capture a backup via the control panel utility or [CLI](../reference/cli.md#db-backup).
  - `logs/` — Stores Craft’s [logs](./logging.md) and PHP error logs.
  - `rebrand/` — Stores the custom Login Page Logo and Site Icon files, if you’ve uploaded them. <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>
  - `runtime/` — Pretty much everything in here is there for caching and logging purposes. Nothing that Craft couldn’t live without, if the folder happened to get deleted.

  For the curious, here are the types of things you will find in `storage/runtime/` (though this is not a comprehensive list):

  - `assets/` — Stores temporary uploads, image thumbnails, resized file icons, image editor scratch files, and copies of images stored on remote asset volumes (to save Craft an HTTP request when it needs the images to generate new thumbnails or transforms).
  - `cache/` — Stores arbitrary data caches, when using the [`FileCache` driver](./config/app.md#cache).
  - `compiled_classes/` — Stores some dynamically-defined PHP classes.
  - `compiled_templates/` — Stores compiled Twig templates. This is _not_ your main [templates](#templates) folder!
  - `temp/` — Other temporary files. The names and contents of files in here do not obey any convention—the assumption should be that they will be deleted or overwritten between requests.

Configuration
: [`CRAFT_STORAGE_PATH`](./config/README.md#craft-storage-path) — This is useful when running on systems with an [ephemeral](./config/README.md#craft-ephemeral) or “read-only” filesystem (wherein the only place to write temporary files is a central `/tmp` directory).

### `templates/`

Purpose
: Your front-end Twig templates go in here. Any local site assets, such as images, CSS, and JS that should be statically served, should live in the [web/](directory-structure.md#web) folder. The [Routing](./routing.md) page has an overview of how files in this folder are handled.

Configuration
: [`CRAFT_TEMPLATES_PATH`](./config/README.md#craft-templates-path) — Plugins may register additional _template roots_ that behave similarly, but are not affected by this setting and generally do not contain user-editable templates.

### `vendor/`

Purpose
: This is where all of your Composer dependencies go—including Craft and any plugins you’ve installed. This directory should _not_ be tracked in version control. Instead, commit [`composer.lock`](#composerlock), and use [`composer install`](https://getcomposer.org/doc/03-cli.md#install-i) to rebuild it.

Configuration
: [`CRAFT_VENDOR_PATH`](config/README.md#craft-vendor-path) — If you choose to relocate your `vendor/` directory, make sure you update your `.gitignore` file to continue excluding it from version control.

### `web/`

Purpose
: This directory represents your server’s web root. The public `index.php` file lives here, alongside your static images, stylesheets, and JavaScript files.

  You can generate a URL to a file in this folder with Twig’s [`siteUrl()` function](./dev/functions.md#siteurl).

Customization
: [`CRAFT_WEB_ROOT`](./config/README.md#craft-web-root) — This is primarily used to set the [`@webroot` alias](./config/README.md#aliases).

## Files

### `.env`

Purpose
: This is your [PHP dotenv](https://github.com/vlucas/phpdotenv) `.env` configuration file. It defines sensitive or [environment-specific config](./config/README.md#env) values that don’t make sense to commit to version control.

  The [starter project](https://github.com/craftcms/craft) provides a few examples of configuration that is apt to change between environments—you’ll see a group of similarly-named files, like `.env.example.staging`.

  These are `.env` file templates. Maintain one of them (with sensitive data removed) as a starting point for your actual `.env` file, so collaborators know what variables the project requires. When they set up the project, they can run `cp .env.example .env` to duplicate the file and fill out missing keys!

Configuration
: [`CRAFT_DOTENV_PATH`](./config/README.md#craft-dotenv-path) — This setting _was_ technically available in prior versions, but unreliable.

### `.gitignore`

This file tells Git which files it should exclude when committing changes. At minimum, it should contain entries for `.env` and Composer’s `vendor/` directory.

Check out our [Hosting & Deployment](./deployment.md#be-aware-of-artifacts) article for a list of other things you’ll want to exclude.

### `bootstrap.php`

The [starter project](depo:craftcms/craft) consolidates important bootstrapping logic (like defining path [constants](./config/README.md#php-constants) that determine the above directories’ locations, and loading environment variables from a [`.env`](#env) file) into this file. Both the HTTP and console entry scripts (`web/index.php` and [`craft`](#craft), respectively) include this file—but each goes on to instantiate a different [type of application](guide:structure-entry-scripts) suited for that request context.

This file’s location only matters to your entry scripts, so it is not “configurable” like other paths are. If you make changes to the layout of your project directory, be sure and update the references to `bootstrap.php` in `index.php` and the CLI entry point.

### `composer.json`

Your project’s PHP dependencies are declared in this file. If you just started your project, the only two packages it will explicitly require are `craftcms/cms` (Craft’s core) and `vlucas/phpdotenv` (used in the entry scripts). Existing projects may contain more packages—say, if the it relies on Craft [plugins](./plugins.md) or includes other [custom functionality](./extend/README.md).

Craft uses Composer to update itself and install plugins. See the [Composer documentation](https://getcomposer.org/doc/04-schema.md) for details on how this file works.

### `composer.lock`

This is a Composer-managed file that contains the _exact_ list of packages (and their versions) that should be installed in the `vendor/` directory. It should be committed to version control so that anyone working on the project can run `composer install` to download all its dependencies.

### `craft`

This is a command line executable used to run Craft’s [console commands](console-commands.md). Its structure is similar to `web/index.php` (insofar as it is responsible for bootstrapping the appropriate Craft application), but instead of a <craft5:craft\web\Application>, it creates a <craft5:craft\console\Application> and handles the “request” with a different set of controllers.

## Other Common Files

Depending on the age and structure of your Craft project (as well as the tools used to build it), your project directory may look a little bit different! Here are some examples of common things you might find when inheriting a project:

### `.ddev/`

If you (or another maintainer) followed the [installation](./installation.md) instructions or [Getting Started Tutorial](/getting-started-tutorial/README.md), DDEV will have left a `.ddev/` directory in the root of your project. This is safe to keep in version control—DDEV may make changes to it from time to time, but a separate `.gitignore` file exists within it to ensure only necessary files are tracked.

### `migrations/`

Projects that use [content migrations](./extend/migrations.md) will typically use this directory, but it is customizable with the [`CRAFT_CONTENT_MIGRATIONS_PATH`](./config/README.md#craft-content-migrations-path) variable.

### `modules/`

For a time, the starter project came with a pre-initialized [custom module](./extend/module-guide.md) in the `modules/` directory. This is typically harmless, but it cannot be removed without also modifying your project’s `config/app.php` file.

### `public/`

Older projects may have carried over a Craft 2 convention of naming their public web directory `public/`. There is no functional difference between these folder names, but most Craft resources will refer to it as `web/`.

### `tests/`

When using [tests](./testing/README.md) to validate application changes, you are apt to have a dedicated `tests/` directory.

### `translations/`

Multi-site projects often make use of [static translations](./sites.md#static-message-translations), which are stored in this directory, indexed by their language code. Customize this location with the [`CRAFT_TRANSLATIONS_PATH`](./config/README.md#craft-translations-path) variable.

### `package.json`

Projects that use Node.js will typically contain `package.json` and `package-lock.json` files, as well as a `node_modules/` directory. Craft does not interact with these files, but they often contain information about how the front-end of your site works.

Oftentimes, a Node.js “build step” will output files that are then loaded by a user’s browser—those should be written to the web root so they can be directly requested via HTTP.

### `craft.bat`

A Windows-specific command line entry point or “batch file.”

### Docker Files

A `Dockerfile` or `docker-compose.yml` in your project root suggests that it is intended to be run in [Docker](https://www.docker.com/), a containerized development environment. DDEV users will typically _not_ see these files, as they’re abstracted by configuration stored in the [`.ddev/` directory](#ddev).

### IDE Configuration

Some editors write configuration to a file or folder within your project—for example, PhpStorm will create a `.idea/` directory; Visual Studio Code uses `.vscode/`. Coordinate with your team about which tools are valuable to your process, and commit anything that supports it.
