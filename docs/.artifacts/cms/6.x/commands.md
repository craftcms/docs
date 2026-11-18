<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- textlint-disable -->

<!-- BEGIN COMMANDS -->

<Block label="Auto-generated Reference">

We are currently working on auto-generated reference for Craft’s CLI API.
In the meantime, you can run `ddev artisan craft` to list all the available commands.
A temporary copy of its output appears below!

</Block>

The `craft:` prefix is omitted from each signature, and aliases (like `pc` and `project-config`) have been combined into a single row.
You may also separate segments in a command using a slash (`/`).

::: tip
Learn about the arguments and options for a command by running `ddev artisan help {command}`.
:::

| Command | Description |
| --- | --- |
| clear-caches | Lists available caches to clear or clear specific caches. |
| clear-caches:all | Clears all caches. |
| clear-caches:asset | Asset caches |
| clear-caches:asset-indexing-data | Asset indexing data |
| clear-caches:compiled-classes | Compiled classes |
| clear-caches:compiled-templates | Compiled templates |
| clear-caches:compiled-views | Compiled views |
| clear-caches:data | Data caches |
| clear-caches:ide-helper | IDE helper |
| clear-caches:no-op | Custom: No-op |
| clear-caches:temp-files | Temp files |
| clear-caches:transform-indexes | Asset transform index |
| clear-deprecations | Clears all deprecation warnings. |
| db:backup | Creates a new database backup. |
| db:convert-charset | Converts tables' character sets and collations. (MySQL only) |
| db:drop-all-tables | Drops all tables in the database. |
| db:drop-table-prefix | Drops the database table prefix from all tables. |
| db:repair | Repairs all tables in the database. |
| db:restore | Restores a database backup. |
| elements:delete | Deletes an element by its ID. |
| elements:delete-all-of-type | Deletes all elements of a given type. |
| elements:restore | Restores a soft-deleted element by its ID. |
| eloquent-elements:sync | Creates elements for rows of registered Eloquent models that don’t have one. |
| entry-types:merge | Merges two entry types. |
| env | Displays the value of an environment variable, or sets its value if $name contains `=`. |
| env:remove | Removes an environment variable from the `.env` file. |
| env:set | Sets an environment variable in the `.env` file. |
| env:show | Displays the value of an environment variable, or sets its value if $name contains `=`. |
| fields:auto-merge | Finds fields with identical settings and merges them together. |
| fields:delete | Deletes custom fields. |
| fields:merge | Merges custom fields together. |
| gc:run or garbage-collection:run | Allows you to manage garbage collection. |
| graphql:create-token | Creates a new GraphQL authorization token. |
| graphql:dump-schema | Dumps a GraphQL schema to a file. |
| graphql:list-schemas | Lists all GraphQL schemas. |
| graphql:print-schema | Prints a GraphQL schema. |
| ide-helper:custom-fields | Generate IDE helper file for custom fields |
| index-assets | Re-indexes assets from the given volume handle. |
| index-assets:all | Re-indexes assets across all volumes. |
| index-assets:cleanup | Removes all CLI indexing sessions. |
| index-assets:one | Re-indexes assets from the given volume handle. |
| install | Craft CMS CLI installer. |
| install:check | Checks whether Craft is already installed. |
| install:craft | Craft CMS CLI installer. |
| invalidate-tags | Lists the caches that can be cleared. |
| invalidate-tags:all | Clear all caches. |
| invalidate-tags:graphql | GraphQL queries |
| invalidate-tags:template | Template caches |
| invalidate-tags:webhook-payloads | Webhook Payloads |
| mailer:test | Tests sending an email with the current mailer settings. |
| mcp:serve | Serves the Craft MCP server over stdio. |
| migrate:all | Run the database migrations |
| migrate:migration-table | Migrates the migration table to the new format |
| migrate:up | Run the database migrations |
| pc:apply or project-config:apply | Applies project config file changes. |
| pc:check or project-config:check | Checks project config schema compatibility with installed Craft and enabled plugins. |
| pc:diff or project-config:diff | Outputs a diff of the pending project config YAML changes. |
| pc:export or project-config:export | Exports the entire project config to a single file. |
| pc:get or project-config:get | Outputs a project config value. |
| pc:rebuild or project-config:rebuild | Rebuilds the project config. |
| pc:remove or project-config:remove | Removes a project config value. |
| pc:repair or project-config:repair | Repairs double-packed associative arrays in the project config. |
| pc:set or project-config:set | Sets a project config value. |
| pc:sync or project-config:sync | Applies project config file changes. |
| pc:touch or project-config:touch | Updates the `dateModified` value in `config/project/project.yaml`, attempting to resolve a Git conflict for it. |
| pc:write or project-config:write | Writes out the currently-loaded project config as YAML files to the `config/project/` folder, discarding any pending YAML changes. |
| plugin | Installs a plugin. |
| plugin:disable | Disables a plugin. |
| plugin:enable | Enables a plugin. |
| plugin:install | Installs a plugin. |
| plugin:list | Installs a plugin. |
| plugin:uninstall | Uninstalls a plugin. |
| repair:project-config | Repairs double-packed associative arrays in the project config. |
| repair:section-structure | Repairs structure data for a section. |
| resave:addresses | Re-saves addresses. |
| resave:all | Runs all resave commands. |
| resave:assets | Re-saves assets. |
| resave:entries | Re-saves entries. |
| resave:users | Re-saves users. |
| restore | Restores a database backup. |
| restore:db | Restores a database backup. |
| sections:create | Create a new section |
| sections:delete | Delete a section |
| setup:db | Stores new DB connection settings to the `.env` file. |
| setup:db-creds | Stores new DB connection settings to the `.env` file. |
| setup:publish | Publish Craft and plugin assets and configuration files to your project. |
| setup:welcome | Called from the `post-create-project-cmd` Composer hook. |
| twig:cache | Compile all of the application's Twig templates |
| twig:clear | Clear all the application's compiled Twig templates |
| up | Runs pending migrations and applies pending project config changes. |
| update | Updates Craft and/or plugins. |
| update-statuses | Updates statically-stored entry statuses. |
| update-statuses:index | Updates statically-stored entry statuses. |
| update:composer-install | Installs Composer |
| update:info | Displays info about available updates. |
| users:activation-url | Creates a new user. |
| users:activationUrl | Creates a new user. |
| users:create | Creates a new user. |
| users:delete | Deletes a user. |
| users:impersonate | Generates a URL to impersonate a user. |
| users:list-admins | Lists admin users. |
| users:logout-all | Logs all users out of the system. |
| users:logoutAll | Logs all users out of the system. |
| users:password-reset-url | Generates a password reset URL for a user. |
| users:passwordResetUrl | Generates a password reset URL for a user. |
| users:remove-2fa | Removes user's two-step verification method(s) |
| users:set-password | Changes a user’s password. |
| users:setPassword | Changes a user’s password. |
| users:unlock | Unlocks a user's account. |
| utils:ascii-filenames | Converts all non-ASCII asset filenames to ASCII. |
| utils:delete-empty-volume-folders | Deletes empty volume folders. |
| utils:fix-element-uids | Ensures all element UIDs are unique. |
| utils:fix-field-layout-uids | Fixes duplicate or missing field layout component UIDs in project config. |
| utils:prune-orphaned-entries | Prunes orphaned entries for each site. |
| utils:prune-provisional-drafts | Prunes provisional drafts for elements that have more than one per user. |
| utils:prune-revisions | Prunes excess element revisions. |
| utils:repair:section-structure | Repairs structure data for a section. |
| utils:update-usernames | Updates all users’ usernames to ensure they match their email address. |

<!-- END COMMANDS -->

<!-- textlint-enable -->
