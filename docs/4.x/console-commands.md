---
keywords: cli
---
# Console Commands

While most of your interaction with Craft happens in a browser, a number of important tools are available via command line interface (CLI) actions that are run in a terminal.

This can be useful for automating tasks with `cron`, running actions in a [deployment process](https://craftcms.com/knowledge-base/deployment-best-practices), working with Craft via SSH, and running resource-intensive tasks that might otherwise be constrained by the limits of your web server.

The Craft console application (`craft`) lives in the root of your project and requires PHP to run.

::: tip
You may need to configure your environment in order to run PHP from your terminal; `php-fpm` and `mod_php` are meant to run with a web server while `php-cli` is a separate process for the command line.
:::

Running `php craft` without any arguments will output a complete list of available options.

```
$ php craft

This is Yii version 2.0.36.

The following commands are available:

- db                                    Performs database operations.
    db/backup                           Creates a new database backup.
    db/convert-charset                  Converts tables’ character sets and collations. (MySQL only)
    db/restore                          Restores a database backup.

- cache                                 Allows you to flush cache.
    cache/flush                         Flushes given cache components.
    cache/flush-all                     Flushes all caches registered in the system.
    cache/flush-schema                  Clears DB schema cache for a given connection
                                        component.
    cache/index (default)               Lists the caches that can be flushed.

...

To see the help of each command, enter:

  craft help <command-name>
```

You can also run `php craft help <command-name>` to learn more about a command and whatever parameters and options it may accept.

::: tip
See the [Console Commands](extend/commands.md) page in the _Extending Craft_ section to learn about adding your own console commands.
:::

While the complete list of available commands will include those from any plugins or custom modules you’ve added to your project, the following are Craft’s default console commands:

<!-- BEGIN COMMANDS -->

## `cache`

Allows you to flush caches.

<h3 id="cache-flush">
    <a href="#cache-flush" class="header-anchor">#</a>
    <code>cache/flush</code>
</h3>


Flushes given cache components.

Example:

```sh
# flushes caches by ID: “first”, “second”, “third”
php craft cache/flush first second third
```

<h3 id="cache-flush-all">
    <a href="#cache-flush-all" class="header-anchor">#</a>
    <code>cache/flush-all</code>
</h3>


Flushes all caches registered in the system.

<h3 id="cache-flush-schema">
    <a href="#cache-flush-schema" class="header-anchor">#</a>
    <code>cache/flush-schema</code>
</h3>


Clears DB schema cache for a given connection component.

```sh
php craft cache/flush-schema
# identical to `php craft cache/flush-schema db`
```

<h4 id="cache-flush-schema-parameters" class="command-subheading">Parameters</h4>

componentId
: ID of the connection component. (Defaults to `db`.)



<h3 id="cache-index">
    <a href="#cache-index" class="header-anchor">#</a>
    <code>cache</code>
</h3>


Lists the caches that can be flushed.

## `clear-caches`

Allows you to clear various Craft caches.

<h3 id="clear-caches-all">
    <a href="#clear-caches-all" class="header-anchor">#</a>
    <code>clear-caches/all</code>
</h3>


Clear all caches.

<h3 id="clear-caches-asset">
    <a href="#clear-caches-asset" class="header-anchor">#</a>
    <code>clear-caches/asset</code>
</h3>


Clears Asset caches.

<h3 id="clear-caches-asset-indexing-data">
    <a href="#clear-caches-asset-indexing-data" class="header-anchor">#</a>
    <code>clear-caches/asset-indexing-data</code>
</h3>


Clears Asset indexing data.

<h3 id="clear-caches-compiled-classes">
    <a href="#clear-caches-compiled-classes" class="header-anchor">#</a>
    <code>clear-caches/compiled-classes</code>
</h3>


Clears compiled classes.

<h3 id="clear-caches-compiled-templates">
    <a href="#clear-caches-compiled-templates" class="header-anchor">#</a>
    <code>clear-caches/compiled-templates</code>
</h3>


Clears compiled templates.

<h3 id="clear-caches-cp-resources">
    <a href="#clear-caches-cp-resources" class="header-anchor">#</a>
    <code>clear-caches/cp-resources</code>
</h3>


Clears control panel resources.

<h3 id="clear-caches-data">
    <a href="#clear-caches-data" class="header-anchor">#</a>
    <code>clear-caches/data</code>
</h3>


Clears data caches.

<h3 id="clear-caches-index">
    <a href="#clear-caches-index" class="header-anchor">#</a>
    <code>clear-caches</code>
</h3>


Lists the caches that can be cleared.

<h3 id="clear-caches-temp-files">
    <a href="#clear-caches-temp-files" class="header-anchor">#</a>
    <code>clear-caches/temp-files</code>
</h3>


Clears temporary files.

<h3 id="clear-caches-transform-indexes">
    <a href="#clear-caches-transform-indexes" class="header-anchor">#</a>
    <code>clear-caches/transform-indexes</code>
</h3>


Clears the Asset transform index.

## `clear-deprecations`


<h3 id="clear-deprecations-index">
    <a href="#clear-deprecations-index" class="header-anchor">#</a>
    <code>clear-deprecations</code>
</h3>


Clears all deprecation warnings.

## `db`

Performs database operations.

<h3 id="db-backup">
    <a href="#db-backup" class="header-anchor">#</a>
    <code>db/backup</code>
</h3>


Creates a new database backup.

Example:
```
php craft db/backup ./my-backups/
```

<h4 id="db-backup-parameters" class="command-subheading">Parameters</h4>

path
:  The path the database backup should be created at.
Can be any of the following:
    
    - A full file path
    - A folder path (backup will be saved in there with a dynamically-generated name)
    - A filename (backup will be saved in the working directory with the given name)
    - Blank (backup will be saved to the `storage/backups/` folder with a dynamically-generated name)



<h4 id="db-backup-options" class="command-subheading">Options</h4>


--zip
: Whether the backup should be saved as a zip file.


--overwrite
: Whether to overwrite an existing backup file, if a specific file path is given.



<h3 id="db-convert-charset">
    <a href="#db-convert-charset" class="header-anchor">#</a>
    <code>db/convert-charset</code>
</h3>


Converts tables’ character sets and collations. (MySQL only)

Example:
```
php craft db/convert-charset utf8 utf8_unicode_ci
```

<h4 id="db-convert-charset-parameters" class="command-subheading">Parameters</h4>

charset
:  The target character set, which honors `DbConfig::$charset`
                              or defaults to `utf8`.

collation
:  The target collation, which honors `DbConfig::$collation`
                              or defaults to `utf8_unicode_ci`.



<h3 id="db-drop-all-tables">
    <a href="#db-drop-all-tables" class="header-anchor">#</a>
    <code>db/drop-all-tables</code>
</h3>


Drops all tables in the database.

Example:
```
php craft db/drop-all-tables
```

<h3 id="db-restore">
    <a href="#db-restore" class="header-anchor">#</a>
    <code>db/restore</code>
</h3>


Restores a database backup.

Example:
```
php craft db/restore ./my-backup.sql
```

<h4 id="db-restore-parameters" class="command-subheading">Parameters</h4>

path
:  The path to the database backup file.



<h4 id="db-restore-options" class="command-subheading">Options</h4>


--drop-all-tables
: Whether to drop all preexisting tables in the database prior to restoring the backup.



## `elements`

Manages elements.

<h3 id="elements-delete">
    <a href="#elements-delete" class="header-anchor">#</a>
    <code>elements/delete</code>
</h3>


Deletes an element by its ID.

<h4 id="elements-delete-parameters" class="command-subheading">Parameters</h4>

id
:  The element ID to delete.



<h4 id="elements-delete-options" class="command-subheading">Options</h4>


--hard
: Whether the element should be hard-deleted.



<h3 id="elements-restore">
    <a href="#elements-restore" class="header-anchor">#</a>
    <code>elements/restore</code>
</h3>


Restores an element by its ID.

<h4 id="elements-restore-parameters" class="command-subheading">Parameters</h4>

id
:  The element ID to restore.



## `fixture`

Allows you to manage test fixtures.

<h3 id="fixture-load">
    <a href="#fixture-load" class="header-anchor">#</a>
    <code>fixture/load</code>
</h3>


Loads the specified fixture data.

Example:

```sh
# load User fixture data (any existing fixture data will be removed first)
php craft fixture/load "User"

# load all available fixtures found under 'tests\unit\fixtures'
php craft fixture/load "*"

# load all fixtures except User
php craft fixture/load "*, -User"
```

<h4 id="fixture-load-parameters" class="command-subheading">Parameters</h4>

fixturesInput
: Array of fixtures to load.



<h4 id="fixture-load-options" class="command-subheading">Options</h4>


--global-fixtures, -g
: Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.


--namespace, -n
: Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.



<h3 id="fixture-unload">
    <a href="#fixture-unload" class="header-anchor">#</a>
    <code>fixture/unload</code>
</h3>


Unloads the specified fixtures.

Example:

```sh
# unload User fixture data
php craft fixture/load "User"

# unload all fixtures found under 'tests\unit\fixtures'
php craft fixture/load "*"

# unload all fixtures except User
php craft fixture/load "*, -User"
```

<h4 id="fixture-unload-parameters" class="command-subheading">Parameters</h4>

fixturesInput
: Array of fixtures to unload.



<h4 id="fixture-unload-options" class="command-subheading">Options</h4>


--global-fixtures, -g
: Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.


--namespace, -n
: Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.



## `gc`


<h3 id="gc-run">
    <a href="#gc-run" class="header-anchor">#</a>
    <code>gc/run</code>
</h3>


Runs garbage collection.

<h4 id="gc-run-options" class="command-subheading">Options</h4>


--delete-all-trashed
: Whether all soft-deleted items should be deleted, rather than just
the ones that were deleted long enough ago to be ready for hard-deletion
per the `softDeleteDuration` config setting.



## `graphql`

Allows you to manage GraphQL schemas.

<h3 id="graphql-create-token">
    <a href="#graphql-create-token" class="header-anchor">#</a>
    <code>graphql/create-token</code>
</h3>


Creates a new authorization token for a schema.

<h4 id="graphql-create-token-parameters" class="command-subheading">Parameters</h4>

schemaUid
:  The schema UUID



<h4 id="graphql-create-token-options" class="command-subheading">Options</h4>


--name
: The schema name


--expiry
: Expiry date



<h3 id="graphql-dump-schema">
    <a href="#graphql-dump-schema" class="header-anchor">#</a>
    <code>graphql/dump-schema</code>
</h3>


Dumps a given GraphQL schema to a file.

<h4 id="graphql-dump-schema-options" class="command-subheading">Options</h4>


--schema
: The GraphQL schema UUID.


--token
: The token to look up to determine the appropriate GraphQL schema.


--full-schema
: Whether full schema should be printed or dumped.



<h3 id="graphql-list-schemas">
    <a href="#graphql-list-schemas" class="header-anchor">#</a>
    <code>graphql/list-schemas</code>
</h3>


Lists all GraphQL schemas.

<h3 id="graphql-print-schema">
    <a href="#graphql-print-schema" class="header-anchor">#</a>
    <code>graphql/print-schema</code>
</h3>


Prints a given GraphQL schema.

<h4 id="graphql-print-schema-options" class="command-subheading">Options</h4>


--schema
: The GraphQL schema UUID.


--token
: The token to look up to determine the appropriate GraphQL schema.


--full-schema
: Whether full schema should be printed or dumped.



## `help`

Provides help information about console commands.

<h3 id="help-index">
    <a href="#help-index" class="header-anchor">#</a>
    <code>help</code>
</h3>


Displays available commands or the detailed information
about a particular command.

Example:

```
$ php craft help db/backup

DESCRIPTION

Creates a new database backup.

Example:
php craft db/backup ./my-backups/


USAGE

craft db/backup [path] [...options...]

- path: string
  The path the database backup should be created at.
  Can be any of the following:

  - A full file path
  - A folder path (backup will be saved in there with a dynamically-generated name)
  - A filename (backup will be saved in the working directory with the given name)
  - Blank (backup will be saved to the `storage/backups/` folder with a dynamically-generated name)


OPTIONS

--appconfig: string
  custom application configuration file path.
  If not set, default application configuration is used.

--color: boolean, 0 or 1
  whether to enable ANSI color in the output.
  If not set, ANSI color will only be enabled for terminals that support it.

--help, -h: boolean, 0 or 1 (defaults to 0)
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


<h4 id="help-index-parameters" class="command-subheading">Parameters</h4>

command
:  The name of the command to show help about.
If not provided, all available commands will be displayed.



<h3 id="help-list">
    <a href="#help-list" class="header-anchor">#</a>
    <code>help/list</code>
</h3>


Lists all available controllers and actions in machine-readable format.

<h3 id="help-list-action-options">
    <a href="#help-list-action-options" class="header-anchor">#</a>
    <code>help/list-action-options</code>
</h3>


List all available options for `action` in machine-readable format.

<h4 id="help-list-action-options-parameters" class="command-subheading">Parameters</h4>

action
: Route to action.



<h3 id="help-usage">
    <a href="#help-usage" class="header-anchor">#</a>
    <code>help/usage</code>
</h3>


Displays usage information for `action`.

<h4 id="help-usage-parameters" class="command-subheading">Parameters</h4>

action
: Route to action.



## `index-assets`

Allows you to re-index assets in volumes.

<h3 id="index-assets-all">
    <a href="#index-assets-all" class="header-anchor">#</a>
    <code>index-assets/all</code>
</h3>


Re-indexes assets across all volumes.

<h4 id="index-assets-all-options" class="command-subheading">Options</h4>


--cache-remote-images
: Whether remote-stored images should be locally cached in the process.


--create-missing-assets
: Whether to auto-create new asset records when missing.


--delete-missing-assets
: Whether to delete all the asset records that have their files missing.



<h3 id="index-assets-cleanup">
    <a href="#index-assets-cleanup" class="header-anchor">#</a>
    <code>index-assets/cleanup</code>
</h3>


Removes all CLI indexing sessions.

<h4 id="index-assets-cleanup-options" class="command-subheading">Options</h4>


--cache-remote-images
: Whether remote-stored images should be locally cached in the process.


--create-missing-assets
: Whether to auto-create new asset records when missing.


--delete-missing-assets
: Whether to delete all the asset records that have their files missing.



<h3 id="index-assets-one">
    <a href="#index-assets-one" class="header-anchor">#</a>
    <code>index-assets/one</code>
</h3>


Re-indexes assets from the given volume handle.

<h4 id="index-assets-one-parameters" class="command-subheading">Parameters</h4>

handle
:  The handle of the volume to index.
You can optionally provide a volume sub-path, e.g. `php craft index-assets/one volume-handle/path/to/folder`.

startAt
:  Index of the asset to start with, which defaults to `0`.



<h4 id="index-assets-one-options" class="command-subheading">Options</h4>


--cache-remote-images
: Whether remote-stored images should be locally cached in the process.


--create-missing-assets
: Whether to auto-create new asset records when missing.


--delete-missing-assets
: Whether to delete all the asset records that have their files missing.



## `install`

Craft CMS CLI installer.

<h3 id="install-check">
    <a href="#install-check" class="header-anchor">#</a>
    <code>install/check</code>
</h3>


Checks whether Craft is already installed.

<h3 id="install-craft">
    <a href="#install-craft" class="header-anchor">#</a>
    <code>install/craft</code>
</h3>


Runs the install migration.

<h4 id="install-craft-options" class="command-subheading">Options</h4>


--email
: The default email address for the first user to create during install.


--username
: The default username for the first user to create during install.


--password
: The default password for the first user to create during install.


--site-name
: The default site name for the first site to create during install.


--site-url
: The default site URL for the first site to create during install.


--language
: The default language for the first site to create during install.



## `invalidate-tags`

Allows you to invalidate cache tags.

<h3 id="invalidate-tags-all">
    <a href="#invalidate-tags-all" class="header-anchor">#</a>
    <code>invalidate-tags/all</code>
</h3>


Invalidates all cache tags.

<h3 id="invalidate-tags-graphql">
    <a href="#invalidate-tags-graphql" class="header-anchor">#</a>
    <code>invalidate-tags/graphql</code>
</h3>


Invalidates all GraphQL query cache tags.

<h3 id="invalidate-tags-index">
    <a href="#invalidate-tags-index" class="header-anchor">#</a>
    <code>invalidate-tags</code>
</h3>


Lists the cache tags that can be invalidated.

<h3 id="invalidate-tags-template">
    <a href="#invalidate-tags-template" class="header-anchor">#</a>
    <code>invalidate-tags/template</code>
</h3>


Invalidates all template cache tags.

## `mailer`


<h3 id="mailer-test">
    <a href="#mailer-test" class="header-anchor">#</a>
    <code>mailer/test</code>
</h3>


Tests sending an email with the current mailer settings.

<h4 id="mailer-test-options" class="command-subheading">Options</h4>


--to
: Email address that should receive the test message.



## `migrate`

Manages Craft and plugin migrations.

<h3 id="migrate-all">
    <a href="#migrate-all" class="header-anchor">#</a>
    <code>migrate/all</code>
</h3>


Runs all pending Craft, plugin, and content migrations.

<h4 id="migrate-all-options" class="command-subheading">Options</h4>


--no-content
: Exclude pending content migrations.


--no-backup
: Skip backing up the database.



<h3 id="migrate-create">
    <a href="#migrate-create" class="header-anchor">#</a>
    <code>migrate/create</code>
</h3>


Creates a new migration.

This command creates a new migration using the available migration template.
After using this command, developers should modify the created migration
skeleton by filling up the actual migration logic.

```
craft migrate/create create_news_section
```

By default, the migration is created in the project’s `migrations/`
folder (as a “content migration”).\
Use `--plugin=<plugin-handle>` to create a new plugin migration.\
Use `--type=app` to create a new Craft CMS app migration.

<h4 id="migrate-create-parameters" class="command-subheading">Parameters</h4>

name
:  the name of the new migration. This should only contain
letters, digits, and underscores.



<h4 id="migrate-create-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.


--template-file
: The template file for generating new migrations. This can be either a path alias (e.g. `@app/migrations/template.php`) or a file path. Defaults to `vendor/craftcms/cms/src/updates/migration.php.template`.



<h3 id="migrate-down">
    <a href="#migrate-down" class="header-anchor">#</a>
    <code>migrate/down</code>
</h3>


Downgrades Craft by reverting old migrations.

Example:

```sh
php craft migrate/down      # revert last migration
php craft migrate/down 3    # revert last three migrations
php craft migrate/down all  # revert all migrations
```

<h4 id="migrate-down-parameters" class="command-subheading">Parameters</h4>

limit
: The number of migrations to be reverted. Defaults to `1`, meaning the last applied migration will be reverted. When value is `all`, all migrations will be reverted.



<h4 id="migrate-down-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-history">
    <a href="#migrate-history" class="header-anchor">#</a>
    <code>migrate/history</code>
</h3>


Shows the list of migrations that have been applied so far.

Example:

```sh
php craft migrate/history      # displays the last ten migrations
php craft migrate/history 5    # displays the last five migrations
php craft migrate/history all  # displays the entire migration history
```

<h4 id="migrate-history-parameters" class="command-subheading">Parameters</h4>

limit
: The maximum number of migrations to be displayed. (Defaults to `10`.)  
If `all`, the whole migration history will be displayed.



<h4 id="migrate-history-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-mark">
    <a href="#migrate-mark" class="header-anchor">#</a>
    <code>migrate/mark</code>
</h3>


Modifies the migration history to the specified version.

No actual migration will be performed.

```sh
php craft migrate/mark 101129_185401                          # using timestamp
php craft migrate/mark m101129_185401_create_user_table       # using name
php craft migrate/mark app\migrations\M101129185401CreateUser # using namespace name
php craft migrate/mark m000000_000000_base                    # reset entire history
```

<h4 id="migrate-mark-parameters" class="command-subheading">Parameters</h4>

version
: The version at which the migration history should be marked, which can be either the timestamp or the full name of the migration.
    
    Specify `m000000_000000_base` to set the migration history to a state where no migration has been applied.



<h4 id="migrate-mark-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-new">
    <a href="#migrate-new" class="header-anchor">#</a>
    <code>migrate/new</code>
</h3>


Shows any new migrations that have not been applied.

Example:

```sh
php craft migrate/new     # displays the first 10 new migrations
php craft migrate/new 5   # displays the first 5 new migrations
php craft migrate/new all # displays all new migrations
```

<h4 id="migrate-new-parameters" class="command-subheading">Parameters</h4>

limit
: The maximum number of new migrations to be displayed. (Defaults to `10`.)  
If `all`, then every available new migration will be displayed.



<h4 id="migrate-new-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-redo">
    <a href="#migrate-redo" class="header-anchor">#</a>
    <code>migrate/redo</code>
</h3>


Reapplies previous migrations by first reverting them and then applying them again.

Example:

```sh
php craft migrate/redo     # redo the last applied migration
php craft migrate/redo 3   # redo the last three applied migrations
php craft migrate/redo all # redo all migrations
```

<h4 id="migrate-redo-parameters" class="command-subheading">Parameters</h4>

limit
: The number of migrations to be redone. Defaults to `1`, meaning the last applied migration will be redone. When `all`, every migration will be redone.



<h4 id="migrate-redo-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-to">
    <a href="#migrate-to" class="header-anchor">#</a>
    <code>migrate/to</code>
</h3>


Upgrades or downgrades until the specified version.

You can downgrade versions to a past apply time by providing a UNIX timestamp or a [strtotime()](https://www.php.net/manual/en/function.strtotime.php)-parseable value. All versions applied after that specified time will then be reverted.

Example:

```sh
php craft migrate/to 101129_185401                          # migration timestamp
php craft migrate/to m101129_185401_create_user_table       # full name
php craft migrate/to 1392853618                             # UNIX timestamp
php craft migrate/to "2022-02-02 02:02:02"                  # strtotime()-parseable
php craft migrate/to app\migrations\M101129185401CreateUser # full namespace name
```

<h4 id="migrate-to-parameters" class="command-subheading">Parameters</h4>

version
: Either the version name or a past time value to be migrated to. This can be a timestamp, the full name of the migration, a UNIX timestamp, or a string value that can be parsed by [strotime()](https://www.php.net/manual/en/function.strtotime.php).



<h4 id="migrate-to-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



<h3 id="migrate-up">
    <a href="#migrate-up" class="header-anchor">#</a>
    <code>migrate/up</code>
</h3>


Upgrades Craft by applying new migrations.

Example:
```
php craft migrate     # apply all new migrations
php craft migrate 3   # apply the first 3 new migrations
```

<h4 id="migrate-up-parameters" class="command-subheading">Parameters</h4>

limit
:  The number of new migrations to be applied. If `0`, every new migration
will be applied.



<h4 id="migrate-up-options" class="command-subheading">Options</h4>


--track
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)
    
    Defaults to `content`, or automatically set to the plugin’s track when `--plugin` is passed.


--plugin, -p
: The handle of the plugin to use during migration operations, or the plugin itself.



## `off`


<h3 id="off-index">
    <a href="#off-index" class="header-anchor">#</a>
    <code>off</code>
</h3>


Disables `system.live` project config value—bypassing any `allowAdminChanges` config setting
restrictions—meant for temporary use during the deployment process.

<h4 id="off-index-options" class="command-subheading">Options</h4>


--retry
: Number of seconds the `Retry-After` HTTP header should be set to for 503 responses.
    
    The `retryDuration` config setting can be used to configure a *system-wide* `Retry-After` header.
    
    ::: warning
    The `isSystemLive` config setting takes precedence over the `system.live` project config value,
    so if `config/general.php` sets `isSystemLive` to `true` or `false` these `on`/`off` commands error out.
    :::
    
    **Example**
    
    Running the following takes the system offline and returns 503 responses until it’s switched on again:
    
    ```
    $ php craft off --retry=60
    The system is now offline.
    The retry duration is now set to 60.
    ```



## `on`


<h3 id="on-index">
    <a href="#on-index" class="header-anchor">#</a>
    <code>on</code>
</h3>


Turns the system on.

Example:
```
$ php craft on
The system is now online.
```

## `plugin`

Manages plugins.

<h3 id="plugin-disable">
    <a href="#plugin-disable" class="header-anchor">#</a>
    <code>plugin/disable</code>
</h3>


Disables a plugin.

```
$ php craft plugin/disable

The following plugins are enabled:

    Handle         Name            Version
    -------------  --------------  -------
    apple-news     Apple News      3.0.0
    ckeditor       CKEditor        2.0.0
    commerce       Craft Commerce  4.0.0
    gatsby-helper  Gatsby Helper   2.0.0

Choose a plugin handle to disable: ckeditor
*** disabling ckeditor
*** disabled ckeditor successfully (time: 0.003s)
```


<h4 id="plugin-disable-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle.



<h3 id="plugin-enable">
    <a href="#plugin-enable" class="header-anchor">#</a>
    <code>plugin/enable</code>
</h3>


Enables a plugin.

```
$ php craft plugin/enable

The following plugins are disabled:

    Handle      Name        Version
    ----------  ----------  -------
    apple-news  Apple News  3.0.0
    ckeditor    CKEditor    2.0.0

Choose a plugin handle to enable: ckeditor
*** enabling ckeditor
*** enabled ckeditor successfully (time: 0.004s)
```


<h4 id="plugin-enable-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle.



<h3 id="plugin-install">
    <a href="#plugin-install" class="header-anchor">#</a>
    <code>plugin/install</code>
</h3>


Installs a plugin.

```
$ php craft plugin/install

The following uninstalled plugins are present:

    Handle         Name            Version
    -------------  --------------  -------
    anchors        Anchors         3.0.0
    apple-news     Apple News      3.0.0
    ckeditor       CKEditor        2.0.0
    commerce       Craft Commerce  4.0.0
    gatsby-helper  Gatsby Helper   2.0.0

Choose a plugin handle to install: ckeditor
*** installing ckeditor
*** installed ckeditor successfully (time: 0.496s)
```


<h4 id="plugin-install-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle.



<h3 id="plugin-list">
    <a href="#plugin-list" class="header-anchor">#</a>
    <code>plugin/list</code>
</h3>


Lists all plugins.

```
$ php craft plugin/list

    Name            Handle         Package Name            Version  Installed  Enabled
    --------------  -------------  ----------------------  -------  ---------  -------
    Anchors         anchors        craftcms/anchors        3.0.0    Yes        Yes
    Apple News      apple-news     craftcms/apple-news     3.0.0    Yes        Yes
    CKEditor        ckeditor       craftcms/ckeditor       2.0.0    Yes        Yes
    Craft Commerce  commerce       craftcms/commerce       4.0.0    Yes        Yes
    Gatsby Helper   gatsby-helper  craftcms/gatsby-helper  2.0.0    Yes        Yes
```


<h3 id="plugin-uninstall">
    <a href="#plugin-uninstall" class="header-anchor">#</a>
    <code>plugin/uninstall</code>
</h3>


Uninstalls a plugin.

```
$ php craft plugin/uninstall

The following plugins plugins are installed and enabled:

    Handle         Name            Version
    -------------  --------------  -------
    anchors        Anchors         3.0.0
    apple-news     Apple News      3.0.0
    ckeditor       CKEditor        2.0.0
    commerce       Craft Commerce  4.0.0
    gatsby-helper  Gatsby Helper   2.0.0

Choose a plugin handle to uninstall: ckeditor
*** uninstalling ckeditor
*** uninstalled ckeditor successfully (time: 0.496s)
```


<h4 id="plugin-uninstall-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle.



<h4 id="plugin-uninstall-options" class="command-subheading">Options</h4>


--force
: Whether the plugin uninstallation should be forced.



## `project-config`

Manages the Project Config.

<h3 id="project-config-apply">
    <a href="#project-config-apply" class="header-anchor">#</a>
    <code>project-config/apply</code>
</h3>


Applies project config file changes.

<h4 id="project-config-apply-options" class="command-subheading">Options</h4>


--force
: Whether every entry change should be force-applied.



<h3 id="project-config-diff">
    <a href="#project-config-diff" class="header-anchor">#</a>
    <code>project-config/diff</code>
</h3>


Outputs a diff of the pending project config YAML changes.

<h4 id="project-config-diff-options" class="command-subheading">Options</h4>


--invert
: Whether to treat the loaded project config as the source of truth, instead of the YAML files.



<h3 id="project-config-get">
    <a href="#project-config-get" class="header-anchor">#</a>
    <code>project-config/get</code>
</h3>


Outputs a project config value.

Example:
```
php craft project-config/get system.edition
```

<h4 id="project-config-get-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path



<h4 id="project-config-get-options" class="command-subheading">Options</h4>


--external
: Whether to pull values from the project config YAML files instead of the loaded config.



<h3 id="project-config-rebuild">
    <a href="#project-config-rebuild" class="header-anchor">#</a>
    <code>project-config/rebuild</code>
</h3>


Rebuilds the project config.

<h3 id="project-config-remove">
    <a href="#project-config-remove" class="header-anchor">#</a>
    <code>project-config/remove</code>
</h3>


Removes a project config value.

Example:
```
php craft project-config/set system.edition pro
```

<h4 id="project-config-remove-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path



<h3 id="project-config-set">
    <a href="#project-config-set" class="header-anchor">#</a>
    <code>project-config/set</code>
</h3>


Sets a project config value.

Example:
```
php craft project-config/set system.edition pro
```

<h4 id="project-config-set-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path

value
:  The config item value as a valid YAML string



<h4 id="project-config-set-options" class="command-subheading">Options</h4>


--force
: Whether every entry change should be force-applied.


--message
: A message describing the changes.


--update-timestamp
: Whether the `dateModified` value should be updated



<h3 id="project-config-touch">
    <a href="#project-config-touch" class="header-anchor">#</a>
    <code>project-config/touch</code>
</h3>


Updates the `dateModified` value in `config/project/project.yaml`, attempting to resolve a Git conflict for it.

<h3 id="project-config-write">
    <a href="#project-config-write" class="header-anchor">#</a>
    <code>project-config/write</code>
</h3>


Writes out the currently-loaded project config as YAML files to the `config/project/` folder, discarding any pending YAML changes.

## `queue`

Manages the queue.

<h3 id="queue-exec">
    <a href="#queue-exec" class="header-anchor">#</a>
    <code>queue/exec</code>
</h3>


Executes a job.
The command is internal, and used to isolate a job execution. Manual usage is not provided.

<h4 id="queue-exec-parameters" class="command-subheading">Parameters</h4>

id
:  of a message

ttr
:  time to reserve

attempt
:  number

pid
:  of a worker



<h4 id="queue-exec-options" class="command-subheading">Options</h4>


--verbose, -v
: verbose mode of a job execute. If enabled, execute result of each job
will be printed.



<h3 id="queue-info">
    <a href="#queue-info" class="header-anchor">#</a>
    <code>queue/info</code>
</h3>


Info about queue status.

<h3 id="queue-listen">
    <a href="#queue-listen" class="header-anchor">#</a>
    <code>queue/listen</code>
</h3>


Listens for new jobs added to the queue and runs them.

<h4 id="queue-listen-parameters" class="command-subheading">Parameters</h4>

timeout
:  The number of seconds to wait between cycles.



<h4 id="queue-listen-options" class="command-subheading">Options</h4>


--verbose, -v
: verbose mode of a job execute. If enabled, execute result of each job
will be printed.


--isolate
: isolate mode. It executes a job in a child process.


--php-binary
: path to php interpreter that uses to run child processes.
If it is undefined, PHP_BINARY will be used.



<h3 id="queue-release">
    <a href="#queue-release" class="header-anchor">#</a>
    <code>queue/release</code>
</h3>


Releases job(s) from the queue.

Example:

```
php craft queue/release all
```

<h4 id="queue-release-parameters" class="command-subheading">Parameters</h4>

job
:  The job ID to release. Pass `all` to release all jobs.



<h3 id="queue-retry">
    <a href="#queue-retry" class="header-anchor">#</a>
    <code>queue/retry</code>
</h3>


Re-adds failed job(s) to the queue.

<h4 id="queue-retry-parameters" class="command-subheading">Parameters</h4>

job
:  The job ID that should be retried, or `all` to retry all failed jobs.



<h3 id="queue-run">
    <a href="#queue-run" class="header-anchor">#</a>
    <code>queue/run</code>
</h3>


Runs all jobs in the queue.

<h4 id="queue-run-options" class="command-subheading">Options</h4>


--verbose, -v
: verbose mode of a job execute. If enabled, execute result of each job
will be printed.


--isolate
: isolate mode. It executes a job in a child process.


--php-binary
: path to php interpreter that uses to run child processes.
If it is undefined, PHP_BINARY will be used.



## `resave`

Allows you to bulk-save elements.

<h3 id="resave-assets">
    <a href="#resave-assets" class="header-anchor">#</a>
    <code>resave/assets</code>
</h3>


Re-saves assets.

<h4 id="resave-assets-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--volume
: The volume handle(s) to save assets from. Can be set to multiple comma-separated volumes.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



<h3 id="resave-categories">
    <a href="#resave-categories" class="header-anchor">#</a>
    <code>resave/categories</code>
</h3>


Re-saves categories.

<h4 id="resave-categories-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



<h3 id="resave-entries">
    <a href="#resave-entries" class="header-anchor">#</a>
    <code>resave/entries</code>
</h3>


Re-saves entries.

<h4 id="resave-entries-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--drafts
: Whether to resave element drafts.


--provisional-drafts
: Whether to resave provisional element drafts.


--revisions
: Whether to resave element revisions.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--section
: The section handle(s) to save entries from. Can be set to multiple comma-separated sections.


--type
: The type handle(s) of the elements to resave.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



<h3 id="resave-matrix-blocks">
    <a href="#resave-matrix-blocks" class="header-anchor">#</a>
    <code>resave/matrix-blocks</code>
</h3>


Re-saves Matrix blocks.

You must supply the `--field` or `--element-id` argument for this to work properly.

<h4 id="resave-matrix-blocks-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--type
: The type handle(s) of the elements to resave.


--field
: The field handle to save Matrix blocks for.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



<h3 id="resave-tags">
    <a href="#resave-tags" class="header-anchor">#</a>
    <code>resave/tags</code>
</h3>


Re-saves tags.

<h4 id="resave-tags-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



<h3 id="resave-users">
    <a href="#resave-users" class="header-anchor">#</a>
    <code>resave/users</code>
</h3>


Re-saves users.

<h4 id="resave-users-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to save elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--to
: The value that should be set on the --set attribute.
    
    The following value types are supported:
    - An attribute name: `--to myCustomField`
    - An object template: `--to "={myCustomField|lower}"`
    - A raw value: `--to "=foo bar"`
    - A PHP arrow function: `--to "fn(\$element) => \$element->callSomething()"`
    - An empty value: `--to :empty:`


--if-empty
: Whether the `--set` attribute should only be set if it doesn’t have a value.



## `serve`


<h3 id="serve-index">
    <a href="#serve-index" class="header-anchor">#</a>
    <code>serve</code>
</h3>


Runs PHP built-in web server.

<h4 id="serve-index-parameters" class="command-subheading">Parameters</h4>

address
:  address to serve on. Either "host" or "host:port".



<h4 id="serve-index-options" class="command-subheading">Options</h4>


--docroot, -t
: path or [path alias](https://craftcms.com/docs/4.x/config/#aliases) of the directory to serve.


--port, -p
: port to serve on.


--router, -r
: path or [path alias](guide:concept-aliases) to router script.
See https://www.php.net/manual/en/features.commandline.webserver.php



## `setup`

Craft CMS setup installer.

<h3 id="setup-app-id">
    <a href="#setup-app-id" class="header-anchor">#</a>
    <code>setup/app-id</code>
</h3>


Generates a new application ID and saves it in the `.env` file.

<h3 id="setup-db">
    <a href="#setup-db" class="header-anchor">#</a>
    <code>setup/db</code>
</h3>


Alias for [setup/db-creds](#setup-db-creds).

<h4 id="setup-db-options" class="command-subheading">Options</h4>


--driver
: The database driver to use. Either `'mysql'` for MySQL or `'pgsql'` for PostgreSQL.


--server
: The database server name or IP address. Usually `'localhost'` or `'127.0.0.1'`.


--port
: The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.


--user
: The database username to connect with.


--password
: The database password to connect with.


--database
: The name of the database to select.


--schema
: The schema that Postgres is configured to use by default (PostgreSQL only).


--table-prefix
: The table prefix to add to all database tables. This can
be no more than 5 characters, and must be all lowercase.



<h3 id="setup-db-cache-table">
    <a href="#setup-db-cache-table" class="header-anchor">#</a>
    <code>setup/db-cache-table</code>
</h3>


Creates a database table for storing DB caches.

<h3 id="setup-db-creds">
    <a href="#setup-db-creds" class="header-anchor">#</a>
    <code>setup/db-creds</code>
</h3>


Stores new DB connection settings to the `.env` file.

<h4 id="setup-db-creds-options" class="command-subheading">Options</h4>


--driver
: The database driver to use. Either `'mysql'` for MySQL or `'pgsql'` for PostgreSQL.


--server
: The database server name or IP address. Usually `'localhost'` or `'127.0.0.1'`.


--port
: The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.


--user
: The database username to connect with.


--password
: The database password to connect with.


--database
: The name of the database to select.


--schema
: The schema that Postgres is configured to use by default (PostgreSQL only).


--table-prefix
: The table prefix to add to all database tables. This can
be no more than 5 characters, and must be all lowercase.



<h3 id="setup-index">
    <a href="#setup-index" class="header-anchor">#</a>
    <code>setup</code>
</h3>


Sets up all the things.

This is an interactive wrapper for the `setup/app-id`, `setup/security-key`, `setup/db-creds`,
and `install` commands, each of which support being run non-interactively.

<h3 id="setup-php-session-table">
    <a href="#setup-php-session-table" class="header-anchor">#</a>
    <code>setup/php-session-table</code>
</h3>


Creates a database table for storing PHP session information.

<h3 id="setup-security-key">
    <a href="#setup-security-key" class="header-anchor">#</a>
    <code>setup/security-key</code>
</h3>


Generates a new security key and saves it in the `.env` file.

<h3 id="setup-welcome">
    <a href="#setup-welcome" class="header-anchor">#</a>
    <code>setup/welcome</code>
</h3>


Called from the `post-create-project-cmd` Composer hook.

## `shell`


<h3 id="shell-index">
    <a href="#shell-index" class="header-anchor">#</a>
    <code>shell</code>
</h3>


Runs an interactive shell.

::: tip
This command requires the [`yiisoft/yii2-shell`](https://github.com/yiisoft/yii2-shell) package, which you may need to add to your project:

```
composer require --dev yiisoft/yii2-shell
```
:::

```
$ php craft shell

Psy Shell v0.10.12 (PHP 8.0.3 — cli) by Justin Hileman
>>> help
  help       Show a list of commands. Type `help [foo]` for information about [foo].      Aliases: ?
  ls         List local, instance or class variables, methods and constants.              Aliases: dir
  dump       Dump an object or primitive.
  doc        Read the documentation for an object, class, constant, method or property.   Aliases: rtfm, m
  show       Show the code for an object, class, constant, method or property.
  wtf        Show the backtrace of the most recent exception.                             Aliases: last-ex
  whereami   Show where you are in the code.
  throw-up   Throw an exception or error out of the Psy Shell.
  timeit     Profiles with a timer.
  trace      Show the current call stack.
  buffer     Show (or clear) the contents of the code input buffer.                       Aliases: buf
  clear      Clear the Psy Shell screen.
  edit       Open an external editor. Afterwards, get produced code in input buffer.
  sudo       Evaluate PHP code, bypassing visibility restrictions.
  history    Show the Psy Shell history.                                                  Aliases: hist
  exit       End the current session and return to caller.                                Aliases: quit, q
```


<h4 id="shell-index-options" class="command-subheading">Options</h4>


--include
: Include file(s) before starting tinker shell.



## `tests`


<h3 id="tests-setup">
    <a href="#tests-setup" class="header-anchor">#</a>
    <code>tests/setup</code>
</h3>


Sets up a test suite for the current project.

<h4 id="tests-setup-parameters" class="command-subheading">Parameters</h4>

dst
:  The folder that the test suite should be generated in.
                        Defaults to the current working directory.



## `up`


<h3 id="up-index">
    <a href="#up-index" class="header-anchor">#</a>
    <code>up</code>
</h3>


Runs pending migrations and applies pending project config changes.

<h4 id="up-index-options" class="command-subheading">Options</h4>


--force
: Whether to perform the action even if a mutex lock could not be acquired.



## `update`

Updates Craft and plugins.

<h3 id="update-composer-install">
    <a href="#update-composer-install" class="header-anchor">#</a>
    <code>update/composer-install</code>
</h3>


Installs dependencies based on the current `composer.json` & `composer.lock`.

<h3 id="update-info">
    <a href="#update-info" class="header-anchor">#</a>
    <code>update/info</code>
</h3>


Displays info about available updates.

<h3 id="update-update">
    <a href="#update-update" class="header-anchor">#</a>
    <code>update/update</code>
</h3>


Updates Craft and/or plugins.

<h4 id="update-update-parameters" class="command-subheading">Parameters</h4>

handle
:  The update handle (`all`, `craft`, or a plugin handle).
You can pass multiple handles separated by spaces, and you can update to a specific
version using the syntax `<handle>:<version>`.



<h4 id="update-update-options" class="command-subheading">Options</h4>


--force, -f
: Force the update if allowUpdates is disabled


--backup
: Backup the database before updating


--migrate
: Run new database migrations after completing the update



## `users`

Manages user accounts.

<h3 id="users-activation-url">
    <a href="#users-activation-url" class="header-anchor">#</a>
    <code>users/activation-url</code>
</h3>


Generates an activation URL for a pending user.

<h4 id="users-activation-url-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



<h3 id="users-create">
    <a href="#users-create" class="header-anchor">#</a>
    <code>users/create</code>
</h3>


Creates a user.

<h4 id="users-create-options" class="command-subheading">Options</h4>


--email
: The user’s email address.


--username
: The user’s username.


--password
: The user’s new password.


--admin
: Whether the user should be an admin.


--groups
: The group handles to assign the created user to.


--group-ids
: The group IDs to assign the user to the created user to.



<h3 id="users-delete">
    <a href="#users-delete" class="header-anchor">#</a>
    <code>users/delete</code>
</h3>


Deletes a user.

<h4 id="users-delete-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



<h4 id="users-delete-options" class="command-subheading">Options</h4>


--inheritor
: The email or username of the user to inherit content when deleting a user.


--delete-content
: Whether to delete the user’s content if no inheritor is specified.


--hard
: Whether the user should be hard-deleted immediately, instead of soft-deleted.



<h3 id="users-impersonate">
    <a href="#users-impersonate" class="header-anchor">#</a>
    <code>users/impersonate</code>
</h3>


Generates a URL to impersonate a user.

<h4 id="users-impersonate-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



<h3 id="users-list-admins">
    <a href="#users-list-admins" class="header-anchor">#</a>
    <code>users/list-admins</code>
</h3>


Lists admin users.

<h3 id="users-logout-all">
    <a href="#users-logout-all" class="header-anchor">#</a>
    <code>users/logout-all</code>
</h3>


Logs all users out of the system.

<h3 id="users-password-reset-url">
    <a href="#users-password-reset-url" class="header-anchor">#</a>
    <code>users/password-reset-url</code>
</h3>


Generates a password reset URL for a user.

<h4 id="users-password-reset-url-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



<h3 id="users-set-password">
    <a href="#users-set-password" class="header-anchor">#</a>
    <code>users/set-password</code>
</h3>


Changes a user’s password.

<h4 id="users-set-password-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



<h4 id="users-set-password-options" class="command-subheading">Options</h4>


--password
: The user’s new password.



## `utils/ascii-filenames`


<h3 id="utils-ascii-filenames-index">
    <a href="#utils-ascii-filenames-index" class="header-anchor">#</a>
    <code>utils/ascii-filenames</code>
</h3>


Converts all non-ASCII asset filenames to ASCII.

## `utils/fix-element-uids`


<h3 id="utils-fix-element-uids-index">
    <a href="#utils-fix-element-uids-index" class="header-anchor">#</a>
    <code>utils/fix-element-uids</code>
</h3>


Ensures all elements UIDs are unique.

## `utils/prune-provisional-drafts`


<h3 id="utils-prune-provisional-drafts-index">
    <a href="#utils-prune-provisional-drafts-index" class="header-anchor">#</a>
    <code>utils/prune-provisional-drafts</code>
</h3>


Prunes provisional drafts for elements that have more than one per user.

<h4 id="utils-prune-provisional-drafts-index-options" class="command-subheading">Options</h4>


--dry-run
: Whether this is a dry run.



## `utils/prune-revisions`


<h3 id="utils-prune-revisions-index">
    <a href="#utils-prune-revisions-index" class="header-anchor">#</a>
    <code>utils/prune-revisions</code>
</h3>


Prunes excess element revisions.

<h4 id="utils-prune-revisions-index-options" class="command-subheading">Options</h4>


--section
: The section handle(s) to prune revisions from. Can be set to multiple comma-separated sections.


--max-revisions
: The maximum number of revisions an element can have.


--dry-run
: Whether this is a dry run.



## `utils/repair`

Repairs data.

<h3 id="utils-repair-category-group-structure">
    <a href="#utils-repair-category-group-structure" class="header-anchor">#</a>
    <code>utils/repair/category-group-structure</code>
</h3>


Repairs structure data for a category group.

<h4 id="utils-repair-category-group-structure-parameters" class="command-subheading">Parameters</h4>

handle
:  The category group handle.



<h4 id="utils-repair-category-group-structure-options" class="command-subheading">Options</h4>


--dry-run
: Whether to only do a dry run of the repair process.



<h3 id="utils-repair-project-config">
    <a href="#utils-repair-project-config" class="header-anchor">#</a>
    <code>utils/repair/project-config</code>
</h3>


Repairs double-packed associative arrays in the project config.

<h4 id="utils-repair-project-config-options" class="command-subheading">Options</h4>


--dry-run
: Whether to only do a dry run of the repair process.



<h3 id="utils-repair-section-structure">
    <a href="#utils-repair-section-structure" class="header-anchor">#</a>
    <code>utils/repair/section-structure</code>
</h3>


Repairs structure data for a section.

<h4 id="utils-repair-section-structure-parameters" class="command-subheading">Parameters</h4>

handle
:  The section handle.



<h4 id="utils-repair-section-structure-options" class="command-subheading">Options</h4>


--dry-run
: Whether to only do a dry run of the repair process.



## `utils/update-usernames`


<h3 id="utils-update-usernames-index">
    <a href="#utils-update-usernames-index" class="header-anchor">#</a>
    <code>utils/update-usernames</code>
</h3>


Updates all users’ usernames to ensure they match their email address.

<!-- END COMMANDS -->
