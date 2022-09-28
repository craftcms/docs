# Project Config

Craft tracks system settings in a centralized store called _Project Config_. Changes are recorded as YAML files in the `config/project/` folder, which can be version-controlled alongside your templates and other front-end resources.

This workflow provides two main benefits:

1. Your [project’s state](#whats-stored-in-project-config) is tracked over time.
2. Settings are [automatically propagated](#propagating-changes) to other development/staging/production environments.

The overarching principle behind Project Config is to separate the management of content and settings. In doing so, it’s possible to establish a one-way flow for configuration, and to tie settings and schema to the rest of your project’s code.

::: tip
Project Config is a discrete concept from [configuration](./config/README.md), but [often complements](#secrets-and-the-environment) it.
:::

## Scope

Broadly speaking, Project Config tracks things that are managed via the **Settings** section of the control panel.

- Asset volumes and named image transforms
- Category groups
- Craft and plugin schema versions
- Craft edition
- Email settings
- Fields, field groups, and all field layouts
- Global sets (settings only, not their content)
- GraphQL schemas, and the access settings for the public schema
- Matrix block types
- Plugin versions, editions, and settings
- Routes defined in **Settings** → **Routes**
- Sections and entry types
- Sites and site groups
- System name, time zone, and status (live/offline)
- Tag groups
- User settings and user groups

::: tip
Plugins and Modules can store their own settings in Project Config, too. See [Supporting Project Config](extend/project-config.md) to learn how.
:::

## Usage

Project Config is always active, but you may need to adjust your workflow to get the most out of it.

Use of Project Config often involves disabling the <config4:allowAdminChanges> option in all but development environments, which makes the **Settings** section of the control panel inaccessible—even for admin users. This guarantees settings are only changed under circumstances where their effects can be tested alongside any relevant templates or code.

Suppose you are asked to add a new entry type to an existing section. The process is probably pretty familiar: make some updates via the control panel, adjust templates and styles, then push your code. But how does the new entry type definition actually make it to the live site?

- **Without** Project Config, you would eventually need to squash a live database with a development one (risking content loss), or copy settings from one control panel to another (risking misconfiguration).
- **With** Project Config, Craft tracks the schema changes as YAML and can apply them automatically (as part of your deployment process) or at the click of a button.

::: warning
Never directly edit YAML files. Missing changes in other parts of the Project Config that should be made simultaneously can cause inconsistencies and instability.
:::

## Propagating Changes

As you make changes in your development environment, you will notice the contents of your `config/project/` folder are updated to reflect those changes. Commit those files to your Git repository as you would templates, front-end resources, and other project files—then push and [deploy](kb:deployment-best-practices) them together.

On the target machine or environment, _apply_ the pending changes in one of two ways:

1. From the **Project Config** utility in the control panel.
2. By running the `php craft project-config/apply` terminal command.

Craft will compare the `config/project/` folder with its already-loaded Project Config, and apply whatever changes it finds.

::: tip
When [installing Craft](installation.md), any existing configuration in your `config/project/` directory will be applied automatically as long as its Craft and plugin versions match those being installed. This makes it possible to set up your own boilerplate projects!
:::

## Secrets and the Environment

Some settings may require you to input sensitive information:

- An SMTP password for your email transport/adapter
- An API key for a third-party service
- A secret access key in an AWS S3 filesystem

Providing a secret verbatim will cause the value to leak into Project Config YAML files. To avoid this, Craft supports using [environment variables](./config/README.md#env) and [aliases](./config/README.md#aliases) to stand in for a sensitive or dynamic value. For example, providing `$MYSERVICE_API_KEY` would read the corresponding value (minus the `$`) from your `.env` file, at runtime. Similarly, values that begin with an `@` are resolved as aliases.

![Craft’s autosuggest field, displaying a suitable match](./images/site-base-url-setting.png)

See [Environmental Configuration](config/#control-panel-settings) for more information.

## Working with Others

Project Config simplifies collaboration on big features by letting you share version-controlled settings and schema changes with others just as easily as deploying them. Multiple contributors’ changes can even be cleanly merged together.

:::tip
Merge conflicts _can_ still happen, but resolving them is no more difficult than a template or stylesheet—you’ll just have to run `php project-config/touch` and then `php project-config/apply` to ensure the final result is applied.
:::

## Adopting Project Config

If you had previously opted out or are upgrading from earlier than Craft 3.1, it’s still possible to get on board. Let’s look at how to get your environments in a consistent state:

1. Pick a primary environment that has the most up-to-date settings, and make sure it’s running the latest version of Craft. (If your project is already live, this should be your production environment!)
2. Go to **Utilities** → **Project Config** on that environment, and click the “Rebuild” button (or use the CLI: `php craft project-config/rebuild`) to ensure that its Project Config is up to date with settings stored throughout the database.
3. Back up the database on the primary environment.
4. In your secondary/development environment:
    - Import the database backup created in step #3;
    - Delete the contents of the `config/project/` folder;
    - Make a request to the control panel to trigger a regeneration of the YAML files in `config/project/`;
5. Disable the <config4:allowAdminChanges> config setting on the primary environment (and all non-development environments, for that matter) to avoid [losing changes](#production-changes-reverted), going forward.

It’s now safe to deploy changes in your `config/project/` folder to other environments!

## Troubleshooting

There are a few things you should keep in mind when working with Project Config:

### Composer

When Craft tries to apply Project Config changes, it will first verify that the Craft and plugin schema versions declared in YAML are compatible with what’s actually installed. Inconsistencies can usually be resolved by running `composer install`.

::: tip
`composer.lock` should be checked in to version control alongside Project Config files. To stay ahead of these errors, run `composer install` during every deploy and when integrating changes from collaborators!
:::

### Production Changes Reverted

Changes made to Project Config on production will likely be reverted the next time your site is deployed. Craft does not attempt to distinguish between explicit deletions and incidental removal of settings—if the incoming config has an “old” value (or omits the value entirely), Craft applies those changes.

To prevent this, set <config4:allowAdminChanges> to `false` in `config/general.php`, or via an [environment override](./config/README.md#environment-overrides):

```env
CRAFT_ALLOW_ADMIN_CHANGES=false
```

This completely removes the UI for administrative settings, and places the entire Project Config service in a read-only state to prevent inadvertent modifications.

::: warning
Craft _will_ warn you in the control panel if the YAML files on disk appear to be “older” than the loaded config (based on the root `dateModified` property), but it is up to you to determine which version is correct.
:::

### Config Data Could Get Out of Sync

The recommended way to keep Project Config in sync is to version control `config/project/` and use the CLI to apply changes:

```bash
php craft project-config/apply
```

If any settings stored in Project Config are modified directly in the database (either manually or via a plugin/module that isn’t using the appropriate APIs), the state will be out of sync and likely result in errors. If that happens, Craft provides a console command that is effectively the reverse of `apply` (instead of taking YAML changes and applying them, it rebuilds YAML files from Craft’s internal state):

```bash
php craft project-config/rebuild
```

If changes are not being picked up during the apply process, you can use the `--force` option:

```bash
php craft project-config/apply --force
```

This will treat all Project Config values as added or updated, resulting in a longer sync process and potentially overriding any expected changes that might have been favored in the database.

## Manual YAML File Generation

If you want control over _when_ the Project Config YAML files are updated (or you want to opt out of saving them altogether) you can configure Craft to stop writing the YAML files automatically as changes are made. To do that, add the following to your `config/app.php` file:

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

::: warning
If you already have YAML files generated, run the `project-config/write` command before updating Craft and/or plugins. Otherwise, the out-of-date YAML files could conflict with Project Config changes performed by the update migrations.
:::
