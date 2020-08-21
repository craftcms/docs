# Project Config

Craft keeps track of each project’s configuration in a central store called **project config**.

It writes static YAML files that can be versioned and used to deploy site changes across multiple environments, making it easier for developers to collaborate without having to pass around database dumps or write migrations to update basic configuration.

### What’s Stored in Project Config

- Asset volumes and named image transforms
- Category groups
- Craft and plugin schema versions
- Craft edition
- Email settings
- Fields and field groups
- Global sets (settings only, not their content)
- GraphQL schemas, and the access settings for the public schema
- Matrix block types
- Plugin editions and settings
- Routes defined in Settings → Routes
- Sections and entry types
- Sites and site groups
- System name, time zone, and status (live/offline)
- Tag groups
- User settings and user groups

::: tip
Plugins can store additional things in the project config as well. See [Supporting Project Config](extend/project-config.md) to learn how.
:::

## Getting Started with Project Config Files

As of Craft 3.5, project config is always enabled and writing multiple files to `config/project/`. (Multiple files reduce the frequency and complexity of merge conflicts, compared to previous versions’ single `project.yaml` file.) This doesn’t have any impact on your Craft install unless you decide to apply changes from these files.

::: warning
For more specifically on the project config updates in Craft 3.5, see [craftcms.com/knowledge-base/upgrading-to-craft-3-5](https://craftcms.com/knowledge-base/upgrading-to-craft-3-5#project-config-workflow).
:::

Before sharing your project config with a team or regularly applying changes in your deployments, it’s important to start by pulling a clean, intentional starting point into each of your environments:

1. Pick a primary environment that has the most up-to-date data. (If your project is already live, this should be your production environment.)
2. Ensure your primary environment is running the latest version of Craft.
3. Run `php craft project-config/rebuild` on that environment to ensure that its project config is up to date with settings stored throughout the database.
4. Back up the database on the primary environment.
5. For all other environments, restore the database backup created in the previous step, and replace the local project’s `config/project/` directory with the one generated in the primary environment in step 3.

Craft will continue updating the files in `config/project/` any time something changes [that’s managed by the project config](#whats-stored-in-project-config). Whenever you run `php craft project-config/apply`, any changes found in `config/project/` will be propagated into the local Craft install, regardless of whether they were changes you made yourself or pulled down from Git. Or even—and take a moment to consider this—both!

::: tip
If you’re approaching project config after regularly copying down database dumps from production, a critical shift in thinking is to separate the idea of Craft’s *state*, formerly handled by `composer.json` and a database dump, into *configuration* via project config and *content* in the database. Content ultimately lives in one place, but configuration can be shared using project config in any number of places—often starting with your local environment.
:::

## Caveats

There are a few things you should keep in mind when working with the project config:

### There Will Be Composer

When Craft detects project config has changed, it will ensure the YAML’s Craft and plugin versions are compatible with what’s actually installed.

If there’s a discrepancy, you’ll need to fix that before Craft can begin syncing the file’s changes into the loaded project config. The only practical way to do that is by running `composer install`, as access to the control panel will be denied until the discrepancy is resolved.

::: tip
It’s a good idea to always run `composer install` before `php craft project-config/apply`.
:::

### Sensitive Information Could Be Saved in Project Config YAML

Some of your system components may require sensitive information in their settings, such as:

- a Gmail/SMTP password in your email settings
- a secret access key in an AWS S3 volume

To prevent those values from being saved into your YAML files, make sure you’re setting those fields to environment variables. See [Environmental Configuration](config/#environmental-configuration) for more information.

### Production Changes May Be Forgotten

If any updates are made on production that change project config YAML there, those changes will be lost the next time your project is deployed and `config/project/` is overwritten. For simple Git-based deployments, these changes could result in a conflict that actually _prevents_ the deployment from succeeding.

To prevent either of these situations, you can set the <config3:allowAdminChanges> config setting to `false` in `config/general.php`:

```php
return [
    '*' => [],
    'production' => [
        // Disable project config changes on production
        'allowAdminChanges' => false,
    ],
];
```

That will remove the UI for most administrative settings that affect the project config, and also places the project config in a read-only state so there’s no chance its YAML will be altered.

### Plugins May Not Support It Yet

Any plugins that are storing configuration settings outside of their main plugin settings will need to be updated to [support the project config](extend/project-config.md). So there may still be some cases where changes need to be manually made on each environment.

### Config Data Could Get Out of Sync

If any settings managed by the project config are modified elsewhere in the database, either manually or via a plugin/module that isn’t using the appropriate service, the project config will be out of sync with those database values and likely result in errors. If that happens, Craft provides a console command that can be run to patch up your project config:

```bash
php craft project-config/rebuild
```

One way to keep project config in sync is to version control `config/project/` and use the console command for applying any changes to Craft:

```bash
php craft project-config/apply
```

If changes are not being picked up during the apply process, you can use the `--force` option:

```bash
php craft project-config/apply --force
```

This will treat all project config values as added or updated, resulting in a longer sync process and potentially overriding any expected changes that might have been favored in the database.
