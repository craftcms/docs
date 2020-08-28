# Console Commands

While most of your interaction with Craft happens in a browser, a number of important tools are available via console commands that are run in a terminal.

This can be useful for a variety of reasons, including automating tasks with `cron`, privately triggering actions via SSH or as part of a deployment process, or running resource-intensive tasks that might be constrained by the limits of your web server.

The Craft console application (`craft`) lives in the root of your project and requires PHP to run.

::: tip
You may need to configure your environment in order to run PHP from your terminal; `php-fpm` and `mod_php` are meant to run with a web server while `php-cli` is a separate process for the command line.
:::

Running the `craft` console command without any arguments will output a complete list of available options. (This will include any console commands added by plugins or custom modules.)

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

- clear-caches                              Allows you to clear various Craft caches.
    clear-caches/all                        Clear all caches.
    clear-caches/asset                      Asset caches
    clear-caches/asset-indexing-data        Asset indexing data
    clear-caches/compiled-templates         Compiled templates
    clear-caches/cp-resources               Control panel resources
    clear-caches/data                       Data caches
    clear-caches/index (default)            Lists the caches that can be cleared.
    clear-caches/temp-files                 Temp files
    clear-caches/transform-indexes          Asset transform index

- fixture                                   Allows you to manage test fixtures.
    fixture/load (default)                  Loads the specified fixture data.
    fixture/unload                          Unloads the specified fixtures.

- gc                                        Allows you to manage garbage collection.
    gc/run (default)                        Runs garbage collection.

- graphql                                   Allows you to manage GraphQL schemas.
    graphql/dump-schema                     Dump out a given GraphQL schema to a file.
    graphql/print-schema                    Print out a given GraphQL schema.

- help                                      Provides help information about console commands.
    help/index (default)                    Displays available commands or the detailed
                                            information
    help/list                               List all available controllers and actions in
                                            machine readable format.
    help/list-action-options                List all available options for the $action in
                                            machine readable format.
    help/usage                              Displays usage information for $action.

- index-assets                              Allows you to re-indexes assets in volumes.
    index-assets/all                        Re-indexes assets across all volumes.
    index-assets/one (default)              Re-indexes assets from the given volume handle
                                            ($startAt = 0).

- install                                   Craft CMS CLI installer.
    install/check                           Checks whether Craft is already installed.
    install/craft (default)                 Runs the install migration.
    install/plugin                          Installs a plugin. (DEPRECATED -- use
                                            plugin/install instead.)

- invalidate-tags                           Allows you to invalidate cache tags.
    invalidate-tags/all                     Clear all caches.
    invalidate-tags/graphql                 GraphQL queries
    invalidate-tags/index (default)         Lists the caches that can be cleared.
    invalidate-tags/template                Template caches

- mailer                                    Allows for testing mailer settings via the CLI.
    mailer/test                             Tests sending an email with the current mailer
                                            settings.

- migrate                                   Manages Craft and plugin migrations.
    migrate/all                             Runs all pending Craft, plugin, and content
                                            migrations.
    migrate/create                          Creates a new migration.
    migrate/down                            Downgrades the application by reverting old
                                            migrations.
    migrate/fresh                           Drops all tables and related constraints. Starts
                                            the migration from the beginning.
    migrate/history                         Displays the migration history.
    migrate/mark                            Modifies the migration history to the specified
                                            version.
    migrate/new                             Displays the un-applied new migrations.
    migrate/redo                            Redoes the last few migrations.
    migrate/to                              Upgrades or downgrades till the specified version.
    migrate/up (default)                    Upgrades the application by applying new
                                            migrations.

- off                                       Takes the system offline
    off/index (default)                     Turns the system on

- on                                        Takes the system online
    on/index (default)                      Turns the system on

- plugin                                    Manage plugins
    plugin/disable                          Disables a plugin.
    plugin/enable                           Enables a plugin.
    plugin/install                          Installs a plugin.
    plugin/uninstall                        Uninstalls a plugin.

- project-config                            Manages the Project Config.
    project-config/apply                    Applies project config file changes.
    project-config/diff                     See a diff of the pending project config YAML
                                            changes.
    project-config/rebuild                  Rebuilds the project config.
    project-config/sync                     Alias for `apply`.

- queue                                     Manages the queue
    queue/exec                              Executes a job.
    queue/info (default)                    Info about queue status.
    queue/listen                            Listens for new jobs added to the queue and runs
                                            them
    queue/release                           @param string $job The job ID to release. Pass
                                            `all` to release all jobs.
    queue/retry                             Re-adds a failed job(s) to the queue.
    queue/run                               Runs all jobs in the queue.

- resave                                    Allows you to bulk-saves elements.
    resave/assets                           Re-saves assets.
    resave/categories                       Re-saves categories.
    resave/entries                          Re-saves entries.
    resave/matrix-blocks                    Re-saves Matrix blocks.
    resave/tags                             Re-saves tags.
    resave/users                            Re-saves users.

- restore                                   Restores a database from backup.
    restore/db (default)                    Allows you to restore a database from a backup.

- serve                                     Runs the PHP built-in web server.
    serve/index (default)                   Runs PHP built-in web server.

- setup                                     Craft CMS setup installer.
    setup/app-id                            Generates a new application ID and saves it in the
                                            .env file.
    setup/db                                Alias for setup/db-creds.
    setup/db-cache-table                    Creates a database table for storing DB caches.
    setup/db-creds                          Stores new DB connection settings to the .env file.
    setup/index (default)                   Sets up all the things.
    setup/php-session-table                 Creates a database table for storing PHP session
                                            information.
    setup/security-key                      Generates a new security key and saves it in the
                                            .env file.
    setup/welcome                           Called from the post-create-project-cmd Composer
                                            hook.

- tests                                     Provides support resources for testing both Craft's
                                            own services and your
    tests/setup                             Sets up a test suite for the current project.
    tests/test                              Don't use this method - it won't actually execute
                                            anything.

- update                                    Updates Craft and plugins.
    update/composer-install                 Installs dependencies based on the current
                                            composer.json & composer.lock.
    update/info                             Displays info about available updates.
    update/update (default)                 Updates Craft and/or plugins.

- utils/ascii-filenames                     Converts all non-ASCII asset filenames to ASCII.
    utils/ascii-filenames/index (default)   Prunes excess element revisions.

- utils/fix-element-uids                    Utilities
    utils/fix-element-uids/index (default)  Ensures all elements UIDs are unique.

- utils/prune-revisions                     Prunes excess element revisions.
    utils/prune-revisions/index (default)   Prunes excess element revisions.

- utils/repair                              Repairs data
    utils/repair/category-group-structure   Repairs structure data for a category group
    utils/repair/project-config             Repairs double-packed associative arrays in the
                                            project config.
    utils/repair/section-structure          Repairs structure data for a section

- utils/update-usernames                    Updates all users’ usernames to ensure they match
                                            their email address
    utils/update-usernames/index (default)  Updates all users’ usernames to ensure they match
                                            their email address

To see the help of each command, enter:

  craft help <command-name>
```
