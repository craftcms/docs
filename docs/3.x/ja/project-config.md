# プロジェクトコンフィグ

Craft 3.1 では**プロジェクトコンフィグ**導入されました。 これは開発者が共同作業をしたり、マルチ環境にまたがるサイト変更の展開を容易にする共有可能な設定を保存するものです。

Craft はプロジェクトコンフィグに次の設定を保存します。

- アセットボリューム、および、名前付けされた画像の変形
- カテゴリグループ
- Craft、および、プラグインのスキーマのバーション
- Craft のエディション
- メールの設定
- フィールド、および、フィールドグループ
- グローバル設定（設定のみ、コンテンツを含みません）
- 行列ブロックのタイプ
- プラグインのエディション、および、設定
- 「設定 > ルート」のルート定義
- セクション、および、入力タイプ
- サイト、および、サイトグループ
- システム名、タイムゾーン、および、システムのステータス（稼働中 / オフライン）
- タググループ
- ユーザー設定、および、ユーザーグループ

::: tip
プラグインがプロジェクトコンフィグに追加情報を保存できます。 どのようにするかを知るには、[プロジェクトコンフィグのサポート](extend/project-config.md)を参照してください。 :::
:::

::: warning
Craft 3.5 added changes to project config, see [craftcms.com/knowledge-base/upgrading-to-craft-3-5](https://craftcms.com/knowledge-base/upgrading-to-craft-3-5#project-config-workflow).
:::

## プロジェクトコンフィグファイルの有効化

To start sharing a project config across multiple environments, follow these steps:

1. Pick a primary environment that has the most up-to-date data. (If your project is already live, this should be your production environment.)
2. Ensure that your primary environment is running the latest version of Craft.
3. If you were already running Craft 3.1 or later, run `./craft project-config/rebuild` on that environment, to ensure that its project config is up-to-date with config settings stored throughout the database.
4. プライマリ環境の `config/general.php` で <config3:useProjectConfigFile> 設定を有効にしてください。

    ```php
    return [
    '*' => [
        'useProjectConfigFile' => true,
    ],
   ];
    ```

5. プライマリ環境の任意のページをロードすると、Craft は `config/project.yaml` ファイルを生成できます。
6. Backup the database on the primary environment.
7. For all other environments, restore the database backup created in step 6, and save a copy of the `config/project.yaml` file created in step 5.

Going forward, Craft will start updating `config/project.yaml` any time something changes that is managed by the project config. And any time Craft detects that `project.yaml` has been updated on its own (e.g. if it was changed in a Git commit that was recently pulled down), any changes in it will be propagated to the local Craft install.

## 注意事項

There are a few things you should keep in mind when working with the project config:

### Composer があるでしょう

When Craft detects that `project.yaml` has changed, it will ensure that the versions of Craft and plugins described in the file are compatible with what’s actually installed.

If there’s a discrepancy, you will need to fix that before Craft can begin syncing the file’s changes into the loaded project config. The only practical way to do that is by running `composer install`, as access to the control panel will be denied until the discrepancy is resolved.

::: tip
To avoid downtime on production, you should ensure that `composer install` is built into your deployment workflow.
:::

### 機密情報は `project.yaml` に保存できます

Some of your system components may have required sensitive information in their settings, such as:

- メール設定の Gmail / SMTP パスワード
- AWS S3 ボリュームのシークレットアクセスキー

To prevent those values from being saved into your `project.yaml` file, make sure that you are setting those fields to environment variables. See [Environmental Configuration](config/#environmental-configuration) for more information.

::: tip
If you’re overriding volume settings with `config/volumes.php`, you can set sensitive values to the environment variable name rather than calling [getenv()](http://php.net/manual/en/function.getenv.php) to avoid the real values being saved to `project.yaml`.

```php
// Bad:
'secret' => getenv('SECRET_ACCESS_KEY'),

// Good:
'secret' => '$SECRET_ACCESS_KEY',
```

Once you’ve made that change, re-save your volume in the control panel so your `project.yaml` file gets updated with the environment variable name.
:::

### 本番環境の変更は忘れられるかもしれません

If any updates are made on production that updates `project.yaml` there, those changes will be lost the next time your project is deployed and `project.yaml` is overwritten.

To prevent that, you can set the <config3:allowAdminChanges> config setting to `false` in `config/general.php`:

```php
return [
    '*' => [
        'useProjectConfigFile' => true,
    ],
    'production' => [
        // Disable project config changes on production
        'allowAdminChanges' => false,
    ], 
];
```

That will remove the UI for most administrative settings that affect the project config, and also places the project config in a read-only state, so there’s no chance that `project.yaml` will be tampered with.

### プラグインはまだサポートしていないかもしれません

Any plugins that are storing configuration settings outside of their main plugin settings will need to be updated to [support the project config](extend/project-config.md). So there may still be some cases where changes need to be manually made on each environment.

### 設定データが同期しなくなる可能性があります

If any settings managed by the project config are modified elsewhere in the database, either manually or via a plugin/module that isn’t using the appropriate service, then the project config will be out of sync with those database values, which will likely lead to errors. If that happens, Craft provides a console command that can be run to patch up your project config.

```bash
./craft project-config/rebuild
```

One way to keep project config in sync is to version control `project.yaml` and use the console command for syncing any changes with Craft:

```bash
./craft project-config/apply
```

If changes are not being picked up during the sync process, you can use the `--force` option:

```bash
./craft project-config/apply --force
```

This will treat all project config values as added or updated, resulting in a longer sync process and potentially overriding any expected changes that might have been favored in the database.
