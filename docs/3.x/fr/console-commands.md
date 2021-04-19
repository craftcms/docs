# Console Commands

While most of your interaction with Craft happens in a browser, a number of important tools are available via console commands that are run in a terminal.

This can be useful for a variety of reasons, including automating tasks with `cron`, privately triggering actions via SSH or as part of a [deployment process](https://craftcms.com/knowledge-base/deployment-best-practices), or running resource-intensive tasks that might be constrained by the limits of your web server.

The Craft console application (`craft`) lives in the root of your project and requires PHP to run.

::: tip
You may need to configure your environment in order to run PHP from your terminal; `php-fpm` and `mod_php` are meant to run with a web server while `php-cli` is a separate process for the command line.
:::

Running `php craft` without any arguments will output a complete list of available options.

```
$ php craft

This is Yii version 2.0.36.

The following commands are available:

- backup                                    Allows you to create a new database backup.
    backup/db (default)                     Creates a new database backup.

- cache                                     Allows you to flush cache.
    cache/flush                             Flushes given cache components.
    cache/flush-all                         Flushes all caches registered in the system.
    cache/flush-schema                      Clears DB schema cache for a given connection
                                            component.
    cache/index (default)                   Lists the caches that can be flushed.

...

To see the help of each command, enter:

  craft help <command-name>
```

You can also run `php craft help <command-name>` to learn more about a command and whatever parameters and options it may accept.

While the complete list of available commands will include those from any plugins or custom modules you’ve added to your project, the following are Craft’s default console commands:

## `backup`

#### `backup/db` <badge>default</badge>

Creates a new database backup.

**Options**

`--path`
:   The path the database backup should be created at. Can be any of the following:
    - A full file path
    - A folder path (backup will be saved in there with a dynamically-generated name)
    - A filename (backup will be saved in the working directory with the given name)
    - Blank (backup will be saved to the `config/backups/` folder with a dynamically-generated name)

`--zip`
:   Whether the backup should be saved as a zip file.\ boolean, 0 or 1 (defaults to 0)

## `cache`

Allows you to flush caches.

#### `cache/flush`

Flushes given cache components.

#### `cache/flush-all`

Flushes all caches registered in the system.

#### `cache/flush-schema`

Clears DB schema cache for a given connection component.

**Parameters**

`componentId`
:   ID of the connection component. (Defaults to `db`.)

**Example**

```sh
php craft cache/flush-schema
# identical to `php craft cache/flush-schema db`
```

#### `cache/index` <badge>default</badge>

Lists the caches that can be flushed.

## `clear-caches`

Allows you to clear various Craft caches.

#### `clear-caches/all`

Clears all caches.

#### `clear-caches/asset`

Clears Asset caches.

#### `clear-caches/asset-indexing-data`

Clears Asset indexing data.

#### `clear-caches/compiled-templates`

Clears compiled templates.

#### `clear-caches/cp-resources`

Clears control panel resources.

#### `clear-caches/data`

Clears data caches.

#### `clear-caches/index` <badge>default</badge>

Lists the caches that can be cleared.

#### `clear-caches/temp-files`

Clears temporary files.

#### `clear-caches/transform-indexes`

Clears the Asset transform index.

## `fixture`

Allows you to manage test fixtures.

#### `fixture/load` <badge>default</badge>

Loads the specified fixture data.

**Parameters**

`fixturesInput`
:   Array of fixtures to load.

**Options**

`--global-fixtures`, `-g`
:   Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
:   Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

#### `fixture/unload`

Unloads the specified fixtures.

**Parameters**

`fixturesInput`
:   Array of fixtures to load.

**Options**

`--global-fixtures`, `-g`
:   Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
:   Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

## `gc`

#### `gc/run` <badge>default</badge>

Runs garbage collection.

**Options**

`--delete-all-trashed`
:   Whether all soft-deleted items should be deleted, rather than just the ones that were deleted long enough ago to be ready for hard-deletion per the `softDeleteDuration` config setting.\ boolean, 0 or 1 (defaults to 0)

## `graphql`

Allows you to manage GraphQL schemas.

#### `graphql/dump-schema`

Dumps a given GraphQL schema to a file.

**Options**

`--token`
:   The token to look up to determine the appropriate GraphQL schema.

#### `graphql/print-schema`

Prints a given GraphQL schema.

**Options**

`--token`
:   The token to look up to determine the appropriate GraphQL schema.

## `help`

Provides help information about console commands.

#### `help/index` <badge>default</badge>

Displays available commands or the detailed information.

**Parameters**

`command`
:   The name of the command to show help about.\ If not provided, all available commands will be displayed.

**Example**

```
$ php craft help backup/db

DESCRIPTION

Creates a new database backup.


USAGE

craft backup [path] [...options...]

- path: string|null
  The path the database backup should be created at.
  Can be any of the following:

  - A full file path
  - A folder path (backup will be saved in there with a dynamically-generated name)
  - A filename (backup will be saved in the working directory with the given name)
  - Blank (backup will be saved to the config/backups/ folder with a dynamically-generated name)


OPTIONS

--appconfig: string
  custom application configuration file path.
  If not set, default application configuration is used.

--color: boolean, 0 or 1
  whether to enable ANSI color in the output.
  If not set, ANSI color will only be enabled for terminals that support it.

--help, -h: boolean, 0 or 1
  whether to display help information about current command.

--interactive: boolean, 0 or 1 (defaults to 1)
  whether to run the command interactively.

--overwrite: boolean, 0 or 1 (defaults to 0)
  Whether to overwrite an existing backup file, if a specific file path is given.

--silent-exit-on-exception: boolean, 0 or 1
  if true - script finish with `ExitCode::OK` in case of exception.
  false - `ExitCode::UNSPECIFIED_ERROR`.
  Default: `YII_ENV_TEST`

--zip: boolean, 0 or 1 (defaults to 0)
  Whether the backup should be saved as a zip file.

$
```

#### `help/list`

Lists all available controllers and actions in machine-readable format.

#### `help/list-action-options`

List all available options for `action` in machine-readable format.

**Parameters**

`action`
:   Route to action. (required)

#### `help/usage`

Displays usage information for `action`.

**Parameters**

`action`
:   Route to action. (required)


## `index-assets`

Allows you to re-index assets in volumes.

#### `index-assets/all`

Re-indexes assets across all volumes.

**Options**

`--cache-remote-images`
:   Whether remote-stored images should be locally cached in the process.\ boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
:   Whether to auto-create new asset records when missing.\ boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
:   Whether to delete all asset records whose files are missing.\ boolean, 0 or 1 (defaults to 0)

#### `index-assets/one` <badge>default</badge>

Re-indexes assets from the given volume handle.

It’s possible to provide a volume sub-path to index, e.g. `php craft index-assets/one volume-handle/path/to/folder`.

**Parameters**

`handle`
:   The handle of the volume to index. (required)

`startAt`
:   Integer, defaults to 0.

**Options**

`--cache-remote-images`
:   Whether remote-stored images should be locally cached in the process.\ boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
:   Whether to auto-create new asset records when missing.\ boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
:   Whether to delete all asset records whose files are missing.\ boolean, 0 or 1 (defaults to 0)

## `install`

Craft CMS CLI installer.

#### `install/check` <badge>default</badge>

Checks whether Craft is already installed.

#### `install/craft`

Runs the install migration.

**Options**

`--email`
:   The default email address for the first user to create during install.

`--language`
:   The default langcode for the first site to create during install.

`--password`
:   The default password for the first user to create during install.

`--site-name`
:   The default site name for the first site to create during install.

`--site-url`
:   The default site url for the first site to create during install.

`--username`
:   The default username for the first user to create during install.

#### `install/plugin`

Installs a plugin. (**Deprecated**, use [`plugin/install`](#plugin-install) instead.)

**Parameters**

`handle`
:   Handle of the plugin to be installed. (required)

## `invalidate-tags`

Allows you to invalidate cache tags.

#### `invalidate-tags/all`

Invalidates all cache tags.

#### `invalidate-tags/graphql`

Invalidates all GraphQL query cache tags.

#### `invalidate-tags/index` <badge>default</badge>

Lists the caches that can be cleared.

#### `invalidate-tags/template`

Invalidates all template cache tags.

## `mailer`

#### `mailer/test`

Tests sending an email with the current mailer settings.

**Options**

`--to`
:   Email address that should receive the test message.

## `migrate`

Manages Craft and plugin migrations.

#### `migrate/all`

Runs all pending Craft, plugin, and content migrations.

**Options**

`--no-backup`
:   Skip backing up the database.\ boolean, 0 or 1 (defaults to 0)

`--no-content`
:   Exclude pending content migrations.\ boolean, 0 or 1 (defaults to 0)

#### `migrate/create`

Creates a new migration.

**Parameters**

`name`
:   The name of the new migration. This should only contain letters, digits, and underscores. (required)

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--template-file`
:   The template file for generating new migrations.\ This can be either a [path alias](config3:aliases) (e.g. "@app/migrations/template.php") or a file path.\ defaults to `/var/www/html/vendor/craftcms/cms/src/updates/migration.php.template`

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/down`

Downgrades the application by reverting old migrations.

**Parameters**

`limit`
:   The number of migrations to be reverted. Defaults to 1, meaning the last applied migration will be reverted. When value is `all`, all migrations will be reverted.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/fresh`

Drops all tables and related constraints. Starts the migration from the beginning.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/history`

Displays the migration history.

**Parameters**

`limit`
:   The maximum number of migrations to be displayed. (Defaults to 10.)\ If `all`, the whole migration history will be displayed.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/mark`

Modifies the migration history to the specified version.

**Parameters**

`version`
:   The version at which the migration history should be marked. (required)\ This can be either the timestamp or the full name of the migration.\ You may specify the name `m000000_000000_base` to set the migration history to a state where no migration has been applied.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/new`

Displays the un-applied new migrations.

**Parameters**

`limit`
:   The maximum number of new migrations to be displayed. (default: 10)\ If `all`, all available new migrations will be displayed.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/redo`

Reapplies the last few migrations.

**Parameters**

`limit`
:   The number of migrations to be redone. Defaults to 1, meaning the last applied migration will be redone. When `all`, all migrations will be redone.

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/to`

Upgrades or downgrades till the specified version.

**Parameters**

`version`
:   Either the version name or the certain time value in the past that the application should be migrated to. This can be either the timestamp, the full name of the migration, the UNIX timestamp, or the parseable datetime string. (required)

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/up` <badge>default</badge>

Upgrades the application by applying new migrations.

**Parameters**

`limit`
:   The number of new migrations to be applied. If 0, it means applying all available new migrations. (Defaults to 0.)

**Options**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

## `off`

Disables `system.live` project config value—bypassing any <config3:allowAdminChanges> restrictions—meant for temporary use during the deployment process.

**Options**

`--retry`
:   Number of seconds that the `Retry-After` HTTP header should be set to for 503 responses.

The [Retry Duration](config3:retryDuration) setting can be used to configure a *system-wide* `Retry-After` header.

::: warning
The <config3:isSystemLive> setting takes precedence over the `system.live` project config value, so if `config/general.php` sets `isSystemLive` to `true` or `false` these `on`/`off` commands to error out.
:::

**Example**

Running the following will take the system offline and return 503 responses until it’s switched [on](#on) again:

```
$ php craft off --retry=60
The system is now offline.
The retry duration is now set to 60.
```

## `on`

Turns the system on again.

**Example**

```
$ php craft on
The system is now online.
```

## `plugin`

Manage plugins.

#### `plugin/disable`

Disables a plugin.

**Parameters**

`handle`
:   The plugin handle. (required)

#### `plugin/enable`

Enables a plugin.

**Parameters**

`handle`
:   The plugin handle. (required)

#### `plugin/install`

Installs a plugin.

**Parameters**

`handle`
:   The plugin handle. (required)

#### `plugin/uninstall`

Uninstalls a plugin.

**Parameters**

`handle`
:   The plugin handle. (required)

## `project-config`

Manages the Project Config.

#### `project-config/apply`

Applies project config file changes.

**Options**

`--force`
:   Whether every entry change should be force-applied.\ boolean, 0 or 1 (defaults to 0)

#### `project-config/diff`

Prints a diff of the pending project config YAML changes.

#### `project-config/rebuild`

Rebuilds the project config.

#### `project-config/sync`

Alias for [`apply`](#project-config-apply).

## `queue`

Manages the queue.

#### `queue/exec`

Executes a job.

**Parameters**

`id`
:   Of a message. (required string)

`ttr`
:   Time to reserve. (required int)

`attempt`
:   Number. (required int)

`pid`
:   Of a worker. (required int)

**Options**

`--verbose`, `-v`
:   Verbose mode of a job execute. If enabled, execute result of each job will be printed.\ boolean, 0 or 1 (defaults to 0)

#### `queue/info` <badge>default</badge>

Info about queue status.

#### `queue/listen`

Listens for newly-added queue jobs and runs them.

**Parameters**

`delay`
:   Number of seconds for waiting new job. (Defaults to 3.)

**Options**

`--isolate`
:   isolate mode. It executes a job in a child process.\ boolean, 0 or 1 (defaults to 1)

`--php-binary`
:   Path to php interpreter that uses to run child processes.\ If undefined, `PHP_BINARY` will be used.

`--verbose`, `-v`
:   Verbose mode of a job execute. If enabled, execute result of each job will be printed.\ boolean, 0 or 1 (defaults to 0)

#### `queue/release`

Releases job(s) from the queue.

**Parameters**

`job`
:   The job ID to release. Pass `all` to release all jobs. (required)

**Example**

```
php craft queue/release all
```

#### `queue/retry`

Re-adds failed job(s) to the queue.

**Parameters**

`job`
:   The job ID that should be retried, or pass `all` to retry all failed jobs. (required)

#### `queue/run`

Runs all jobs in the queue.

**Options**

`--isolate`
:   isolate mode. It executes a job in a child process.\ boolean, 0 or 1 (defaults to 1)

`--php-binary`
:   Path to php interpreter that uses to run child processes.\ If undefined, `PHP_BINARY` will be used.

`--verbose`, `-v`
:   Verbose mode of a job execute. If enabled, execute result of each job will be printed.\ boolean, 0 or 1 (defaults to 0)

## `resave`

Allows you to bulk-save elements.

#### `resave/assets`

Re-saves assets.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

`--volume`
:   The volume handle(s) to save assets from. Can be set to multiple comma-separated volumes.

#### `resave/categories`

Re-saves categories.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--group`
:   The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

#### `resave/entries`

Re-saves entries.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--section`
:   The section handle(s) to save entries from. Can be set to multiple comma-separated sections.

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--type`
:   The type handle(s) of the elements to resave.

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

#### `resave/matrix-blocks`

Re-saves Matrix blocks.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--field`
:   The field handle to save Matrix blocks for.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--type`
:   The type handle(s) of the elements to resave.

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

#### `resave/tags`

Re-saves tags.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--group`
:   The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

#### `resave/users`

Re-saves users.

**Options**

`--element-id`
:   The ID(s) of the elements to resave.

`--group`
:   The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
:   The number of elements to resave.

`--offset`
:   The number of elements to skip.

`--propagate`
:   Whether to save the elements across all their enabled sites.\ boolean, 0 or 1 (defaults to 1)

`--site`
:   The site handle to save elements from.

`--status`
:   The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\ (defaults to `any`)

`--uid`
:   The UUID(s) of the elements to resave.

`--update-search-index`
:   Whether to update the search indexes for the resaved elements.\ boolean, 0 or 1 (defaults to 0)

## `restore`

#### `restore/db` <badge>default</badge>

Restores a database from backup.

**Parameters**

`path`
:   The path to the database backup file.

## `serve`

#### `serve/index` <badge>default</badge>

Runs the PHP built-in web server.

## `setup`

Craft CMS setup installer.

#### `setup/app-id`

Generates a new application ID and saves it in the `.env` file.

#### `setup/db`

Alias for [`setup/db-creds`](#setup-db-creds).

#### `setup/db-cache-table`

Creates a database table for storing DB caches.

#### `setup/db-creds`

Stores new DB connection settings to the `.env` file.

**Options**

`--database`
:   The name of the database to select.

`--driver`
:   The database driver to use. Either `mysql` for MySQL or `pgsql` for PostgreSQL.

`--password`
:   The database password to connect with.

`--port`
:   The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.

`--schema`
:   The database schema to use (PostgreSQL only).

`--server`
:   The database server name or IP address. Usually `localhost` or `127.0.0.1`.

`--table-prefix`
:   The table prefix to add to all database tables. This can be no more than 5 characters, and must be all lowercase.

`--user`
:   The database username to connect with.\ (defaults to `root`)

#### `setup/index` <badge>default</badge>

Sets up all the things.

#### `setup/php-session-table`

Creates a database table for storing PHP session information.

#### `setup/security-key`

Generates a new security key and saves it in the `.env` file.

#### `setup/welcome`

Called from the `post-create-project-cmd` Composer hook.

## `tests`

Provides resources for testing Craft’s services and your Craft project.

#### `tests/setup`

Sets up a test suite for the current project.

**Parameters**

`dst`
:   The folder that the test suite should be generated in.\ Defaults to the current working directory.

#### `tests/test`

Don’t use this method; it won’t actually execute anything.

## `update`

Updates Craft and plugins.

#### `update/composer-install`

Installs dependencies based on the current composer.json & composer.lock.

#### `update/info`

Displays info about available updates.

#### `update/update` <badge>default</badge>

Updates Craft and/or plugins.

**Parameters**

`handle`
:   The update handle (`all`, `craft`, or a plugin handle). You can pass multiple handles separated by spaces, and you can update to a specific version using the syntax `<handle>:<version>`.

**Options**

`--backup`
:   Backup the database before updating.\ boolean, 0 or 1

`--force`, `-f`
:   Force the update if `allowUpdates` is disabled.\ boolean, 0 or 1 (defaults to 0)

`--migrate`
:   Run new database migrations after completing the update.\ boolean, 0 or 1 (defaults to 1)

## `utils/ascii-filenames`

#### `utils/ascii-filenames/index` <badge>default</badge>

Converts all non-ASCII asset filenames to ASCII.

## `utils/fix-element-uids`

#### `utils/fix-element-uids/index` <badge>default</badge>

Ensures all element UIDs are unique.

## `utils/prune-revisions`

#### `utils/utils/prune-revisions/index` <badge>default</badge>

Prunes excess element revisions.

**Options**

`--max-revisions`
:   The maximum number of revisions an element can have.

## `utils/repair`

Repairs data.

#### `utils/repair/category-group-structure`

Repairs structure data for a category group.

**Parameters**

`handle`
:   The category group handle. (required)

**Options**

`--dry-run`
:   Whether to only do a dry run of the repair process.\ boolean, 0 or 1 (defaults to 0)

#### `utils/repair/project-config`

Repairs double-packed associative arrays in the project config.

**Options**

`--dry-run`
:   Whether to only do a dry run of the repair process.\ boolean, 0 or 1 (defaults to 0)

#### `utils/repair/section-structure`

Repairs structure data for a section.

**Parameters**

`handle`
:   The section handle. (required)

**Options**

`--dry-run`
:   Whether to only do a dry run of the repair process.\ boolean, 0 or 1 (defaults to 0)

## `utils/update-usernames`

#### `utils/update-usernames/index` <badge>default</badge>

Updates all users’ usernames to ensure they match their email address.

**Example**

```
$ php craft utils/update-usernames
10 usernames updated.
```
