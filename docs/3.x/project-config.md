# Project Config

Craft keeps track of each project’s configuration in a central store called **project config**.

As you make changes to system settings, Craft will record those setting values to YAML files in a `config/project/` folder. You can then commit those files to your Git repository, just like your templates and front-end resources.

It offers two benefits:

1. You’ll be able to keep track of your project’s changing state over time.
2. You can propagate new changes to other development/staging/production environments, rather than manually reapplying them.

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
- Routes defined in **Settings** → **Routes**
- Sections and entry types
- Sites and site groups
- System name, time zone, and status (live/offline)
- Tag groups
- User settings and user groups

::: tip
Plugins can store additional things in the project config as well. See [Supporting Project Config](extend/project-config.md) to learn how.
:::

## Environment Setup

Before you start propagating project config changes across your environments, make sure each environment is in a consistent state.

1. Pick a primary environment that has the most up-to-date data. (If your project is already live, this should be your production environment.)
2. Ensure your primary environment is running the latest version of Craft.
3. Go to **Utilities** → **Project Config** on that environment, and click the “Rebuild” button to ensure that its project config is up to date with settings stored throughout the database.
4. Back up the database on the primary environment.
5. For all other environments, restore the database backup created in the previous step, delete the contents of the `config/project/` folder, and then load the site in your browser to ensure it works. (Craft will regenerate the YAML files in `config/project/` the first time the control panel is accessed.)
6. Disable the <config3:allowAdminChanges> config setting on all non-development environments, to avoid [losing changes unexpectedly](#production-changes-may-be-forgotten) going forward.

Now you’re ready to start propagating changes in your `config/project/` folder to other environments.

## Propagating Changes

As you make changes in a development environment, you will notice the contents of your `config/project/` folder are updated to reflect those changes. Commit those files to your Git repository just like your templates, front-end resources, and other project files.

::: warning
Don’t make manual changes to your YAML files unless you’re positive you know what you are doing. Manual edits are prone to miss changes in other parts of the project config that should be made simultaneously.
:::

When you [deploy your changes to other environments](https://craftcms.com/knowledge-base/deployment-best-practices), you can then _apply_ the project config changes in one of two ways:

1. From the “Project Config” utility in the control panel.
2. By running the `php craft project-config/apply` terminal command.

Either way, Craft will compare the files in the local `config/project/` folder with its already-loaded project config, and pull in whatever changes it finds.

::: tip
When [installing Craft](installation.md), any existing configuration in your `config/project/` directory will be applied automatically as long as its Craft and plugin versions match those being installed.
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

## Manual YAML File Generation

If you want control over _when_ the project config YAML files are updated, or you want to opt out of saving them altogether, you can configure Craft to stop writing the YAML files automatically as changes are made. To do that, add the following to your `config/app.php` file:

```php
return [
    // ...
    'components' => [
        // ...
        'projectConfig' => function() {
            $config = craft\helpers\App::projectConfigConfig();
            $config['writeYamlAutomatically'] = false;
            return Craft::createObject($config);
        },
    ]
];
```

You can manually trigger YAML file generation from the Project Config utility, or by running the following terminal command:

```bash
php craft project-config/write
```
