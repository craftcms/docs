# プロジェクトコンフィグ

Craft keeps track of each project’s configuration in a central store called **project config**.

As you make changes to system settings, Craft will record those setting values to YAML files in a `config/project/` folder. You can then commit those files to your Git repository, just like your templates and front-end resources.

It offers two benefits:

1. You’ll be able to keep track of your project’s changing state over time.
2. You can apply new changes to other development/staging/production environments, rather than restoring a database backup or manually recreating changes.

### What’s Stored in Project Config

- アセットボリューム、および、名前付けされた画像の変形
- カテゴリグループ
- Craft、および、プラグインのスキーマのバーション
- Craft のエディション
- メールの設定
- フィールド、および、フィールドグループ
- グローバル設定（設定のみ、コンテンツを含みません）
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

## Environment Setup

Before you start applying project config changes, make sure each environment is in a consistent state.

1. Pick a primary environment that has the most up-to-date data. (If your project is already live, this should be your production environment.)
2. Ensure your primary environment is running the latest version of Craft.
3. Run `php craft project-config/rebuild` on that environment to ensure that its project config is up to date with settings stored throughout the database.
4. Back up the database on the primary environment.
5. For all other environments, restore the database backup created in the previous step, and replace the local project’s `config/project/` directory with the one generated in the primary environment in step 3.
6. Disable the <config3:allowAdminChanges> config setting on all non-development environments, to avoid [losing changes unexpectedly](#production-changes-may-be-forgotten).

Now you’re ready to start applying changes in your `config/project/` folder to other environments.

## Applying Changes

There are three ways to apply new changes to an environment:

1. If [Dev Mode](config3:devMode) is enabled, Craft’s control panel will notify you of changes and prompt you to apply them.
2. You can apply pending changes from the “Project Config” utility in the control panel.
3. You can run the `php craft project-config/apply` terminal command to apply pending changes.

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

- メール設定の Gmail / SMTP パスワード
- AWS S3 ボリュームのシークレットアクセスキー

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

### 設定データが同期しなくなる可能性があります

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

## Opting Out

You can opt out of sharing your project config files with other environments by adding the following line to the `.gitignore` file at the root of your project:

```
/config/project
```

Then run the following terminal commands to delete all existing `config/project/` files from your repository:

```bash
git rm -r --cached config/project/\*
git commit -a -m 'Remove project config files'
```

Craft will continue recording changes to YAML files within the `config/project/` folder, but they will no longer get committed to your project’s Git repository or shared with other environments.
