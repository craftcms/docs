<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- textlint-disable -->

<!-- BEGIN COMMANDS -->

## `cache`

Allows you to flush cache.

<h3 id="cache-flush">
    <a href="#cache-flush" class="header-anchor">#</a>
    <code>cache/flush</code>
</h3>


Flushes given cache components.

For example,

```
# flushes caches specified by their id: "first", "second", "third"
yii cache/flush first second third
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

```
# clears cache schema specified by component id: "db"
yii cache/flush-schema db
```

<h4 id="cache-flush-schema-parameters" class="command-subheading">Parameters</h4>

db
:  id connection component



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


Clears the caches.

<h3 id="clear-caches-asset-indexing-data">
    <a href="#clear-caches-asset-indexing-data" class="header-anchor">#</a>
    <code>clear-caches/asset-indexing-data</code>
</h3>


Clears the caches.

<h3 id="clear-caches-compiled-classes">
    <a href="#clear-caches-compiled-classes" class="header-anchor">#</a>
    <code>clear-caches/compiled-classes</code>
</h3>


Clears the caches.

<h3 id="clear-caches-compiled-templates">
    <a href="#clear-caches-compiled-templates" class="header-anchor">#</a>
    <code>clear-caches/compiled-templates</code>
</h3>


Clears the caches.

<h3 id="clear-caches-cp-resources">
    <a href="#clear-caches-cp-resources" class="header-anchor">#</a>
    <code>clear-caches/cp-resources</code>
</h3>


Clears the caches.

<h3 id="clear-caches-data">
    <a href="#clear-caches-data" class="header-anchor">#</a>
    <code>clear-caches/data</code>
</h3>


Clears the caches.

<h3 id="clear-caches-index">
    <a href="#clear-caches-index" class="header-anchor">#</a>
    <code>clear-caches</code>
</h3>


Lists the caches that can be cleared.

<h3 id="clear-caches-temp-files">
    <a href="#clear-caches-temp-files" class="header-anchor">#</a>
    <code>clear-caches/temp-files</code>
</h3>


Clears the caches.

<h3 id="clear-caches-transform-indexes">
    <a href="#clear-caches-transform-indexes" class="header-anchor">#</a>
    <code>clear-caches/transform-indexes</code>
</h3>


Clears the caches.

<h3 id="clear-caches-twigpack-manifest-cache">
    <a href="#clear-caches-twigpack-manifest-cache" class="header-anchor">#</a>
    <code>clear-caches/twigpack-manifest-cache</code>
</h3>


Clears the caches.

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

<h3 id="db-drop-table-prefix">
    <a href="#db-drop-table-prefix" class="header-anchor">#</a>
    <code>db/drop-table-prefix</code>
</h3>


Drops the database table prefix from all tables.

<h4 id="db-drop-table-prefix-parameters" class="command-subheading">Parameters</h4>

prefix
:  The current table prefix. If omitted, the prefix will be detected automatically.



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



<h3 id="elements-delete-all-of-type">
    <a href="#elements-delete-all-of-type" class="header-anchor">#</a>
    <code>elements/delete-all-of-type</code>
</h3>


Deletes all elements of a given type.

<h4 id="elements-delete-all-of-type-parameters" class="command-subheading">Parameters</h4>

type
:  The element type to delete.



<h4 id="elements-delete-all-of-type-options" class="command-subheading">Options</h4>


--dry-run
: Whether to only do a dry run of the prune elements of type process.



<h3 id="elements-restore">
    <a href="#elements-restore" class="header-anchor">#</a>
    <code>elements/restore</code>
</h3>


Restores an element by its ID.

<h4 id="elements-restore-parameters" class="command-subheading">Parameters</h4>

id
:  The element ID to restore.



## `entrify`

Converts categories, tags, and global sets to entries.

<h3 id="entrify-categories">
    <a href="#entrify-categories" class="header-anchor">#</a>
    <code>entrify/categories</code>
</h3>


Converts categories to entries.

<h4 id="entrify-categories-parameters" class="command-subheading">Parameters</h4>

categoryGroup
:  The category group handle



<h4 id="entrify-categories-options" class="command-subheading">Options</h4>


--section
: The section handle that entries should be saved in


--entry-type
: The entry type handle that entries should have


--author
: The author username or email that entries should have



<h3 id="entrify-global-set">
    <a href="#entrify-global-set" class="header-anchor">#</a>
    <code>entrify/global-set</code>
</h3>


Converts a global set to a Single section.

<h4 id="entrify-global-set-parameters" class="command-subheading">Parameters</h4>

globalSet
:  The global set handle



<h4 id="entrify-global-set-options" class="command-subheading">Options</h4>


--section
: The section handle that entries should be saved in



<h3 id="entrify-tags">
    <a href="#entrify-tags" class="header-anchor">#</a>
    <code>entrify/tags</code>
</h3>


Converts tags to entries.

<h4 id="entrify-tags-parameters" class="command-subheading">Parameters</h4>

tagGroup
:  The tag group handle



<h4 id="entrify-tags-options" class="command-subheading">Options</h4>


--section
: The section handle that entries should be saved in


--entry-type
: The entry type handle that entries should have


--author
: The author username or email that entries should have



## `entry-types`


<h3 id="entry-types-merge">
    <a href="#entry-types-merge" class="header-anchor">#</a>
    <code>entry-types/merge</code>
</h3>


Merges two entry types.

<h4 id="entry-types-merge-parameters" class="command-subheading">Parameters</h4>

handleA
: 

handleB
: 



## `env`

Sets or removes environment variables in the `.env` file.

<h3 id="env-remove">
    <a href="#env-remove" class="header-anchor">#</a>
    <code>env/remove</code>
</h3>


Removes an environment variable from the `.env` file.

    php craft env/remove CRAFT_DEV_MODE

<h4 id="env-remove-parameters" class="command-subheading">Parameters</h4>

name
: 



<h3 id="env-set">
    <a href="#env-set" class="header-anchor">#</a>
    <code>env/set</code>
</h3>


Sets an environment variable in the `.env` file.

    php craft env/set CRAFT_DEV_MODE true

<h4 id="env-set-parameters" class="command-subheading">Parameters</h4>

name
: 

value
: 



<h3 id="env-show">
    <a href="#env-show" class="header-anchor">#</a>
    <code>env/show</code>
</h3>


Displays the value of an environment variable, or sets its value if $name contains `=`.

    php craft env CRAFT_DEV_MODE
    php craft env CRAFT_DEV_MODE=true

<h4 id="env-show-parameters" class="command-subheading">Parameters</h4>

name
: 



## `exec`


<h3 id="exec-exec">
    <a href="#exec-exec" class="header-anchor">#</a>
    <code>exec/exec</code>
</h3>


Executes a PHP statement and outputs the result.

<h4 id="exec-exec-parameters" class="command-subheading">Parameters</h4>

command
: 



## `fields`

Manages custom fields.

<h3 id="fields-auto-merge">
    <a href="#fields-auto-merge" class="header-anchor">#</a>
    <code>fields/auto-merge</code>
</h3>


Finds fields with identical settings and merges them together.

<h3 id="fields-merge">
    <a href="#fields-merge" class="header-anchor">#</a>
    <code>fields/merge</code>
</h3>


Merges two custom fields together.

<h4 id="fields-merge-parameters" class="command-subheading">Parameters</h4>

handleA
: 

handleB
: 



## `fixture`

Allows you to manage test fixtures.

<h3 id="fixture-load">
    <a href="#fixture-load" class="header-anchor">#</a>
    <code>fixture/load</code>
</h3>


Loads the specified fixture data.

For example,

```
# load the fixture data specified by User and UserProfile.
# any existing fixture data will be removed first
yii fixture/load "User, UserProfile"

# load all available fixtures found under 'tests\unit\fixtures'
yii fixture/load "*"

# load all fixtures except User and UserProfile
yii fixture/load "*, -User, -UserProfile"
```

<h4 id="fixture-load-parameters" class="command-subheading">Parameters</h4>

fixturesInput
: 



<h4 id="fixture-load-options" class="command-subheading">Options</h4>


--namespace, -n
: default namespace to search fixtures in


--global-fixtures, -g
: global fixtures that should be applied when loading and unloading. By default it is set to `InitDbFixture`
that disables and enables integrity check, so your data can be safely loaded.



<h3 id="fixture-unload">
    <a href="#fixture-unload" class="header-anchor">#</a>
    <code>fixture/unload</code>
</h3>


Unloads the specified fixtures.

For example,

```
# unload the fixture data specified by User and UserProfile.
yii fixture/unload "User, UserProfile"

# unload all fixtures found under 'tests\unit\fixtures'
yii fixture/unload "*"

# unload all fixtures except User and UserProfile
yii fixture/unload "*, -User, -UserProfile"
```

<h4 id="fixture-unload-parameters" class="command-subheading">Parameters</h4>

fixturesInput
: 



<h4 id="fixture-unload-options" class="command-subheading">Options</h4>


--namespace, -n
: default namespace to search fixtures in


--global-fixtures, -g
: global fixtures that should be applied when loading and unloading. By default it is set to `InitDbFixture`
that disables and enables integrity check, so your data can be safely loaded.



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

<h4 id="help-index-parameters" class="command-subheading">Parameters</h4>

command
:  The name of the command to show help about.
If not provided, all available commands will be displayed.



<h4 id="help-index-options" class="command-subheading">Options</h4>


--as-json, -j
: Should the commands help be returned in JSON format?



<h3 id="help-list">
    <a href="#help-list" class="header-anchor">#</a>
    <code>help/list</code>
</h3>


List all available controllers and actions in machine readable format.
This is used for shell completion.

<h3 id="help-list-action-options">
    <a href="#help-list-action-options" class="header-anchor">#</a>
    <code>help/list-action-options</code>
</h3>


List all available options for the $action in machine readable format.
This is used for shell completion.

<h4 id="help-list-action-options-parameters" class="command-subheading">Parameters</h4>

action
:  route to action



<h3 id="help-usage">
    <a href="#help-usage" class="header-anchor">#</a>
    <code>help/usage</code>
</h3>


Displays usage information for $action.

<h4 id="help-usage-parameters" class="command-subheading">Parameters</h4>

action
:  route to action



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


--delete-empty-folders
: Whether empty folders should be deleted.



<h3 id="index-assets-cleanup">
    <a href="#index-assets-cleanup" class="header-anchor">#</a>
    <code>index-assets/cleanup</code>
</h3>


Removes all CLI indexing sessions.

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


--delete-empty-folders
: Whether empty folders should be deleted.



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


Clear all caches.

<h3 id="invalidate-tags-graphql">
    <a href="#invalidate-tags-graphql" class="header-anchor">#</a>
    <code>invalidate-tags/graphql</code>
</h3>


Invalidates caches with the configured tag.

<h3 id="invalidate-tags-index">
    <a href="#invalidate-tags-index" class="header-anchor">#</a>
    <code>invalidate-tags</code>
</h3>


Lists the caches that can be cleared.

<h3 id="invalidate-tags-template">
    <a href="#invalidate-tags-template" class="header-anchor">#</a>
    <code>invalidate-tags/template</code>
</h3>


Invalidates caches with the configured tag.

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
: the template file for generating new migrations.
This can be either a [path alias](guide:concept-aliases) (e.g. "@app/migrations/template.php")
or a file path.



<h3 id="migrate-down">
    <a href="#migrate-down" class="header-anchor">#</a>
    <code>migrate/down</code>
</h3>


Downgrades the application by reverting old migrations.

For example,

```
yii migrate/down     # revert the last migration
yii migrate/down 3   # revert the last 3 migrations
yii migrate/down all # revert all migrations
```

<h4 id="migrate-down-parameters" class="command-subheading">Parameters</h4>

limit
:  the number of migrations to be reverted. Defaults to 1,
meaning the last applied migration will be reverted. When value is "all", all migrations will be reverted.



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


Displays the migration history.

This command will show the list of migrations that have been applied
so far. For example,

```
yii migrate/history     # showing the last 10 migrations
yii migrate/history 5   # showing the last 5 migrations
yii migrate/history all # showing the whole history
```

<h4 id="migrate-history-parameters" class="command-subheading">Parameters</h4>

limit
:  the maximum number of migrations to be displayed.
If it is "all", the whole migration history will be displayed.



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

```
yii migrate/mark 101129_185401                        # using timestamp
yii migrate/mark m101129_185401_create_user_table     # using full name
yii migrate/mark app\migrations\M101129185401CreateUser # using full namespace name
yii migrate/mark m000000_000000_base # reset the complete migration history
```

<h4 id="migrate-mark-parameters" class="command-subheading">Parameters</h4>

version
:  the version at which the migration history should be marked.
This can be either the timestamp or the full name of the migration.
You may specify the name `m000000_000000_base` to set the migration history to a
state where no migration has been applied.



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


Displays the un-applied new migrations.

This command will show the new migrations that have not been applied.
For example,

```
yii migrate/new     # showing the first 10 new migrations
yii migrate/new 5   # showing the first 5 new migrations
yii migrate/new all # showing all new migrations
```

<h4 id="migrate-new-parameters" class="command-subheading">Parameters</h4>

limit
:  the maximum number of new migrations to be displayed.
If it is `all`, all available new migrations will be displayed.



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


Redoes the last few migrations.

This command will first revert the specified migrations, and then apply
them again. For example,

```
yii migrate/redo     # redo the last applied migration
yii migrate/redo 3   # redo the last 3 applied migrations
yii migrate/redo all # redo all migrations
```

<h4 id="migrate-redo-parameters" class="command-subheading">Parameters</h4>

limit
:  the number of migrations to be redone. Defaults to 1,
meaning the last applied migration will be redone. When equals "all", all migrations will be redone.



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


Upgrades or downgrades till the specified version.

Can also downgrade versions to the certain apply time in the past by providing
a UNIX timestamp or a string parseable by the strtotime() function. This means
that all the versions applied after the specified certain time would be reverted.

This command will first revert the specified migrations, and then apply
them again. For example,

```
yii migrate/to 101129_185401                          # using timestamp
yii migrate/to m101129_185401_create_user_table       # using full name
yii migrate/to 1392853618                             # using UNIX timestamp
yii migrate/to "2014-02-15 13:00:50"                  # using strtotime() parseable string
yii migrate/to app\migrations\M101129185401CreateUser # using full namespace name
```

<h4 id="migrate-to-parameters" class="command-subheading">Parameters</h4>

version
:  either the version name or the certain time value in the past
that the application should be migrated to. This can be either the timestamp,
the full name of the migration, the UNIX timestamp, or the parseable datetime
string.



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
    
    The “Retry Duration” general setting can be used to configure a *system-wide* `Retry-After` header.
    
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

## `pc`

Alias of project-config.

<h3 id="pc-apply">
    <a href="#pc-apply" class="header-anchor">#</a>
    <code>pc/apply</code>
</h3>


Applies project config file changes.

<h4 id="pc-apply-options" class="command-subheading">Options</h4>


--force
: Whether every entry change should be force-applied.


--quiet
: Whether to reduce the command output.



<h3 id="pc-diff">
    <a href="#pc-diff" class="header-anchor">#</a>
    <code>pc/diff</code>
</h3>


Outputs a diff of the pending project config YAML changes.

<h4 id="pc-diff-options" class="command-subheading">Options</h4>


--invert
: Whether to treat the loaded project config as the source of truth, instead of the YAML files.



<h3 id="pc-export">
    <a href="#pc-export" class="header-anchor">#</a>
    <code>pc/export</code>
</h3>


Exports the entire project config to a single file.

<h4 id="pc-export-parameters" class="command-subheading">Parameters</h4>

path
:  The path the project config should be exported to.
Can be any of the following:
    
    - A full file path
    - A folder path (export will be saved in there with a dynamically-generated name)
    - A filename (export will be saved in the working directory with the given name)
    - Blank (export will be saved in the working directly with a dynamically-generated name)



<h4 id="pc-export-options" class="command-subheading">Options</h4>


--external
: Whether to pull values from the project config YAML files instead of the loaded config.


--overwrite
: Whether to overwrite an existing export file, if a specific file path is given.



<h3 id="pc-get">
    <a href="#pc-get" class="header-anchor">#</a>
    <code>pc/get</code>
</h3>


Outputs a project config value.

Example:
```
php craft project-config/get system.edition
```

The “path” syntax used here may be composed of directory and filenames (within your `config/project` folder), YAML object keys (including UUIDs for many Craft resources), and integers (referencing numerically-indexed arrays), joined by a dot (`.`): `path.to.nested.array.0.property`.

<h4 id="pc-get-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path



<h4 id="pc-get-options" class="command-subheading">Options</h4>


--external
: Whether to pull values from the project config YAML files instead of the loaded config.



<h3 id="pc-rebuild">
    <a href="#pc-rebuild" class="header-anchor">#</a>
    <code>pc/rebuild</code>
</h3>


Rebuilds the project config.

<h3 id="pc-remove">
    <a href="#pc-remove" class="header-anchor">#</a>
    <code>pc/remove</code>
</h3>


Removes a project config value.

Example:
```
php craft project-config/remove some.nested.key
```

::: danger
This should only be used when the equivalent change is not possible through the control panel or other Craft APIs. By directly modifying project config values, you are bypassing all validation and can easily destabilize configuration.
:::

As with [set](#project-config-set), removing values only updates the root `dateModified` key when using the [`--update-timestamp` flag](#project-config-set-options). If you do not include this flag, you must run `project-config/touch` before changes will be detected or applied in other environments!

<h4 id="pc-remove-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path



<h3 id="pc-set">
    <a href="#pc-set" class="header-anchor">#</a>
    <code>pc/set</code>
</h3>


Sets a project config value.

Example:
```
php craft project-config/set some.nested.key
```

See [get](#project-config-get) for the accepted key formats.

::: danger
This should only be used when the equivalent change is not possible through the control panel or other Craft APIs. By directly modifying project config values, you are bypassing all validation and can easily destabilize configuration.
:::

Values are updated in the database *and* in your local YAML files, but the root `dateModified` project config property is only touched when using the [`--update-timestamp` flag](#project-config-set-options). If you do not update the timestamp along with the value, the change may not be detected or applied in other environments!

<h4 id="pc-set-parameters" class="command-subheading">Parameters</h4>

path
:  The config item path

value
:  The config item value as a valid YAML string



<h4 id="pc-set-options" class="command-subheading">Options</h4>


--force
: Whether every entry change should be force-applied.


--message
: A message describing the changes.


--update-timestamp
: Whether the `dateModified` value should be updated



<h3 id="pc-touch">
    <a href="#pc-touch" class="header-anchor">#</a>
    <code>pc/touch</code>
</h3>


Updates the `dateModified` value in `config/project/project.yaml`, attempting to resolve a Git conflict for it.

<h3 id="pc-write">
    <a href="#pc-write" class="header-anchor">#</a>
    <code>pc/write</code>
</h3>


Writes out the currently-loaded project config as YAML files to the `config/project/` folder, discarding any pending YAML changes.

## `plugin`

Manages plugins.

<h3 id="plugin-disable">
    <a href="#plugin-disable" class="header-anchor">#</a>
    <code>plugin/disable</code>
</h3>


Disables a plugin.

<h4 id="plugin-disable-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle (omitted if --all provided).



<h4 id="plugin-disable-options" class="command-subheading">Options</h4>


--all
: Whether the action should be run for all Composer-installed plugins.



<h3 id="plugin-enable">
    <a href="#plugin-enable" class="header-anchor">#</a>
    <code>plugin/enable</code>
</h3>


Enables a plugin.

<h4 id="plugin-enable-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle (omitted if --all provided).



<h4 id="plugin-enable-options" class="command-subheading">Options</h4>


--all
: Whether the action should be run for all Composer-installed plugins.



<h3 id="plugin-install">
    <a href="#plugin-install" class="header-anchor">#</a>
    <code>plugin/install</code>
</h3>


Installs a plugin.

<h4 id="plugin-install-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle (omitted if --all provided).



<h4 id="plugin-install-options" class="command-subheading">Options</h4>


--all
: Whether the action should be run for all Composer-installed plugins.



<h3 id="plugin-list">
    <a href="#plugin-list" class="header-anchor">#</a>
    <code>plugin/list</code>
</h3>


Lists all plugins.

<h3 id="plugin-uninstall">
    <a href="#plugin-uninstall" class="header-anchor">#</a>
    <code>plugin/uninstall</code>
</h3>


Uninstalls a plugin.

<h4 id="plugin-uninstall-parameters" class="command-subheading">Parameters</h4>

handle
:  The plugin handle (omitted if --all provided).



<h4 id="plugin-uninstall-options" class="command-subheading">Options</h4>


--force
: Whether the plugin uninstallation should be forced.


--all
: Whether the action should be run for all Composer-installed plugins.



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


--quiet
: Whether to reduce the command output.



<h3 id="project-config-diff">
    <a href="#project-config-diff" class="header-anchor">#</a>
    <code>project-config/diff</code>
</h3>


Outputs a diff of the pending project config YAML changes.

<h4 id="project-config-diff-options" class="command-subheading">Options</h4>


--invert
: Whether to treat the loaded project config as the source of truth, instead of the YAML files.



<h3 id="project-config-export">
    <a href="#project-config-export" class="header-anchor">#</a>
    <code>project-config/export</code>
</h3>


Exports the entire project config to a single file.

<h4 id="project-config-export-parameters" class="command-subheading">Parameters</h4>

path
:  The path the project config should be exported to.
Can be any of the following:
    
    - A full file path
    - A folder path (export will be saved in there with a dynamically-generated name)
    - A filename (export will be saved in the working directory with the given name)
    - Blank (export will be saved in the working directly with a dynamically-generated name)



<h4 id="project-config-export-options" class="command-subheading">Options</h4>


--external
: Whether to pull values from the project config YAML files instead of the loaded config.


--overwrite
: Whether to overwrite an existing export file, if a specific file path is given.



<h3 id="project-config-get">
    <a href="#project-config-get" class="header-anchor">#</a>
    <code>project-config/get</code>
</h3>


Outputs a project config value.

Example:
```
php craft project-config/get system.edition
```

The “path” syntax used here may be composed of directory and filenames (within your `config/project` folder), YAML object keys (including UUIDs for many Craft resources), and integers (referencing numerically-indexed arrays), joined by a dot (`.`): `path.to.nested.array.0.property`.

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
php craft project-config/remove some.nested.key
```

::: danger
This should only be used when the equivalent change is not possible through the control panel or other Craft APIs. By directly modifying project config values, you are bypassing all validation and can easily destabilize configuration.
:::

As with [set](#project-config-set), removing values only updates the root `dateModified` key when using the [`--update-timestamp` flag](#project-config-set-options). If you do not include this flag, you must run `project-config/touch` before changes will be detected or applied in other environments!

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
php craft project-config/set some.nested.key
```

See [get](#project-config-get) for the accepted key formats.

::: danger
This should only be used when the equivalent change is not possible through the control panel or other Craft APIs. By directly modifying project config values, you are bypassing all validation and can easily destabilize configuration.
:::

Values are updated in the database *and* in your local YAML files, but the root `dateModified` project config property is only touched when using the [`--update-timestamp` flag](#project-config-set-options). If you do not update the timestamp along with the value, the change may not be detected or applied in other environments!

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


Re-adds a failed job(s) to the queue.

<h4 id="queue-retry-parameters" class="command-subheading">Parameters</h4>

job
:  The job ID that should be retried, or `all` to retry all failed jobs.



<h3 id="queue-run">
    <a href="#queue-run" class="header-anchor">#</a>
    <code>queue/run</code>
</h3>


Runs all jobs in the queue.

<h4 id="queue-run-options" class="command-subheading">Options</h4>


--job-id
: The job ID to run


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

<h3 id="resave-addresses">
    <a href="#resave-addresses" class="header-anchor">#</a>
    <code>resave/addresses</code>
</h3>


Re-saves user addresses.

<h4 id="resave-addresses-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--owner-id
: Comma-separated list of owner element IDs.


--country-code
: Comma-separated list of country codes.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



<h3 id="resave-all">
    <a href="#resave-all" class="header-anchor">#</a>
    <code>resave/all</code>
</h3>


Runs all other `resave/*` commands.

<h4 id="resave-all-options" class="command-subheading">Options</h4>


--queue
: Whether the elements should be resaved via a queue job.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



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
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--volume
: The volume handle(s) to save assets from. Can be set to multiple comma-separated volumes.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



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
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



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
Set to `null` if all elements should be resaved regardless of whether they’re drafts.


--provisional-drafts
: Whether to resave provisional element drafts.
Set to `null` if all elements should be resaved regardless of whether they’re provisional drafts.


--revisions
: Whether to resave element revisions.
Set to `null` if all elements should be resaved regardless of whether they’re revisions.


--element-id
: The ID(s) of the elements to resave.


--uid
: The UUID(s) of the elements to resave.


--site
: The site handle to fetch elements from.


--propagate-to
: Comma-separated site handles to propagate entries to.
    
    When this is set, the entry will *only* be saved for this site.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--section
: The section handle(s) to save entries from. Can be set to multiple comma-separated sections.


--all-sections
: Whether all sections’ entries should be saved.


--type
: The type handle(s) of the elements to resave.


--field
: The field handle to save nested entries for.


--owner-id
: Comma-separated list of owner element IDs.


--with-fields
: Only resave elements that have custom fields with these global field handles.


--set
: An attribute name that should be set for each of the elements. The value will be determined by --to.


--set-enabled-for-site
: The site-enabled status that should be set on the entry, for the site it’s initially being saved/propagated to.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



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
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



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
: The site handle to fetch elements from.


--status
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.


--offset
: The number of elements to skip.


--limit
: The number of elements to resave.


--update-search-index
: Whether to update the search indexes for the resaved elements.


--touch
: Whether to update the `dateUpdated` timestamp for the elements.


--group
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.


--with-fields
: Only resave elements that have custom fields with these global field handles.


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


--if-invalid
: Whether the `--set` attribute should only be set if the current value doesn’t validate.



## `sections`

Manages sections.

<h3 id="sections-create">
    <a href="#sections-create" class="header-anchor">#</a>
    <code>sections/create</code>
</h3>


Creates a section.

<h4 id="sections-create-options" class="command-subheading">Options</h4>


--name
: The section name.


--handle
: The section handle.


--type
: The section type (single, channel, or structure).


--no-versioning
: Whether to disable versioning for the section.


--entry-types
: Comma-separated list of entry type handles to assign to the section.


--uri-format
: The entry URI format to set for each site.


--template
: The template to load when an entry’s URL is requested.


--from-category-group
: The category group handle to model the section from.


--from-tag-group
: The tag group handle to model the section from.


--from-global-set
: The global set handle to model the section from.



<h3 id="sections-delete">
    <a href="#sections-delete" class="header-anchor">#</a>
    <code>sections/delete</code>
</h3>


Deletes a section.

<h4 id="sections-delete-parameters" class="command-subheading">Parameters</h4>

handle
:  The section handle



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
: path or [path alias](https://craftcms.com/docs/5.x/configure.html#aliases) of the directory to serve.


--router, -r
: 


--port, -p
: port to serve on.



## `setup`

Craft CMS setup installer.

<h3 id="setup-app-id">
    <a href="#setup-app-id" class="header-anchor">#</a>
    <code>setup/app-id</code>
</h3>


Generates a new application ID and saves it in the `.env` file.

<h3 id="setup-cloud">
    <a href="#setup-cloud" class="header-anchor">#</a>
    <code>setup/cloud</code>
</h3>


Prepares the Craft install to be deployed to Craft Cloud.

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

<h3 id="setup-keys">
    <a href="#setup-keys" class="header-anchor">#</a>
    <code>setup/keys</code>
</h3>


Generates an application ID and security key (if they don’t exist), and saves them in the `.env` file.

<h3 id="setup-message-tables">
    <a href="#setup-message-tables" class="header-anchor">#</a>
    <code>setup/message-tables</code>
</h3>


Creates database tables for storing message translations. (EXPERIMENTAL!)

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


Runs interactive shell

<h4 id="shell-index-options" class="command-subheading">Options</h4>


--include
: include file(s) before starting tinker shell



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


--no-backup
: Skip backing up the database.



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


--with-expired
: Whether to update expired licenses.
    
    NOTE: This will result in “License purchase required” messages in the control panel on public domains,
    until the licenses have been renewed.


--minor-only
: Whether only minor updates should be applied.


--patch-only
: Whether only patch updates should be applied.


--except
: Plugin handles to exclude


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



<h3 id="users-remove-2fa">
    <a href="#users-remove-2fa" class="header-anchor">#</a>
    <code>users/remove-2fa</code>
</h3>


Removes user's two-step verification method(s)

<h4 id="users-remove-2fa-parameters" class="command-subheading">Parameters</h4>

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



<h3 id="users-unlock">
    <a href="#users-unlock" class="header-anchor">#</a>
    <code>users/unlock</code>
</h3>


Unlocks a user's account.

<h4 id="users-unlock-parameters" class="command-subheading">Parameters</h4>

user
:  The ID, username, or email address of the user account.



## `utils/ascii-filenames`


<h3 id="utils-ascii-filenames-index">
    <a href="#utils-ascii-filenames-index" class="header-anchor">#</a>
    <code>utils/ascii-filenames</code>
</h3>


Converts all non-ASCII asset filenames to ASCII.

## `utils/delete-empty-volume-folders`


<h3 id="utils-delete-empty-volume-folders-index">
    <a href="#utils-delete-empty-volume-folders-index" class="header-anchor">#</a>
    <code>utils/delete-empty-volume-folders</code>
</h3>


Deletes empty volume folders.

<h4 id="utils-delete-empty-volume-folders-index-options" class="command-subheading">Options</h4>


--volume
: The volume handle(s) to delete folders from. Can be set to multiple comma-separated volumes.



## `utils/fix-element-uids`


<h3 id="utils-fix-element-uids-index">
    <a href="#utils-fix-element-uids-index" class="header-anchor">#</a>
    <code>utils/fix-element-uids</code>
</h3>


Ensures all elements UIDs are unique.

## `utils/fix-field-layout-uids`


<h3 id="utils-fix-field-layout-uids-index">
    <a href="#utils-fix-field-layout-uids-index" class="header-anchor">#</a>
    <code>utils/fix-field-layout-uids</code>
</h3>


Fixes any duplicate UUIDs found within field layout components in the project config.

## `utils/prune-orphaned-entries`


<h3 id="utils-prune-orphaned-entries-index">
    <a href="#utils-prune-orphaned-entries-index" class="header-anchor">#</a>
    <code>utils/prune-orphaned-entries</code>
</h3>


Prunes orphaned entries for each site.

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

<!-- textlint-enable -->
