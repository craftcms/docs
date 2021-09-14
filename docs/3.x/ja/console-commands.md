- - -
Craft とのインタラクションのほとんどはブラウザ上で行われますが、ターミナル上で実行されるコンソールコマンドを経由していくつかの重要なツールを利用できます。
- - -
# コンソールコマンド

`cron` でタスクを自動化したり、SSH 経由や[デプロイ処理](https://craftcms.com/knowledge-base/deployment-best-practices)の一部としてプライベートにアクションを発動したり、ウェブサーバーの制約によって制限されるリソース集約型のタスクを実行するなど、様々な理由で便利です。

Craft コンソールアプリケーション（`craft`）はプロジェクトのルートにあり、実行には PHP が必要です。

The Craft console application (`craft`) lives in the root of your project and requires PHP to run.

::: tip
ターミナルから PHP を実行するために、環境を設定する必要があるかもしれません。 `php-fpm` と `mod_php` はウェブサーバーと一緒に動作することを意味し、`php-cli` はコマンドライン向けの別プロセスです。 :::
:::

`php craft help <command-name>`を実行して、コマンド、および、コマンドが受け入れることができるパラメータやオプションの詳細を確認できます。

```
$ ./craft

This is Yii version 2.0.36.

The following commands are available:

- backup                                    Allows you to create a new database backup.
    backup/db (default)                     Creates a new database backup.
    db/convert-charset                  Converts tables’ character sets and collations. (MySQL only)
    db/restore                          Restores a database backup.

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

`php craft` を引数なしで実行すると、利用可能なオプションのリストが出力されます。

::: tip
See the [Console Commands](extend/commands.md) page in the _Extending Craft_ section to learn about adding your own console commands.
:::

利用可能なコマンドのリストには、プロジェクトに追加されたプラグインやカスタムモジュールのものも含まれます。

<!-- BEGIN COMMANDS -->

## `backup`

#### `backup/db`

キャッシュをフラッシュできます。

指定されたキャッシュコンポーネントをフラッシュします。

```sh
バックアップからデータベースを復元します。
```

**パラメータ**

`path`
:   The path the database backup should be created at. Can be any of the following:
    - A full file path
    - A folder path (backup will be saved in there with a dynamically-generated name)
    - A filename (backup will be saved in the working directory with the given name)
    - Blank (backup will be saved to the `config/backups/` folder with a dynamically-generated name)

**オプション**

`--zip`
:   Whether the backup should be saved as a zip file.\ boolean, 0 or 1 (defaults to 0)

## `cache`

アセットキャッシュをクリアします。

#### `cache/flush`

Flushes given cache components.

#### `cache/flush-all`

フラッシュできるキャッシュの一覧を表示します。

#### `cache/flush-schema`

様々な Craft のキャッシュをクリアできます。

**パラメータ**

`componentId`
:   ID of the connection component. (Defaults to `db`.)

**実例**

```sh
php craft cache/flush-schema
# identical to `php craft cache/flush-schema db`
```

#### `cache/index` <badge>default</badge>

アセットインデックスデータをクリアします。

## `clear-caches`

コンパイル済みのテンプレートをクリアします。

#### `clear-caches/all`

コントロールパネルのリソースをクリアします。

#### `clear-caches/asset`

データキャッシュをクリアします。

#### `clear-caches/asset-indexing-data`

クリアできるキャッシュの一覧を表示します。

#### `clear-caches/compiled-templates`

一時的なファイルをクリアします。

#### `clear-caches/cp-resources`

アセット変換インデックスをクリアします。

#### `clear-caches/data`

テストのフィクスチャを管理できます。

#### `clear-caches/index` <badge>default</badge>

指定されたフィクスチャデータをロードします。

#### `clear-caches/temp-files`

Clears temporary files.

#### `clear-caches/transform-indexes`

Clears the Asset transform index.

## `fixture`

指定されたフィクスチャをアンロードします。

#### `fixture/load` <badge>default</badge>

Loads the specified fixture data.

**オプション**

`fixturesInput`
:   Array of fixtures to load.

**オプション**

`--global-fixtures`, `-g`
:   Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
:   Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

#### `fixture/unload`

Unloads the specified fixtures.

**パラメータ**

`fixturesInput`
:   Array of fixtures to load.

**オプション**

`--global-fixtures`, `-g`
:   Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
:   Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

## `gc`

#### `gc/run` <badge>default</badge>

ガベージコレクションを実行します。

**オプション**

`--delete-all-trashed`
:   Whether all soft-deleted items should be deleted, rather than just the ones that were deleted long enough ago to be ready for hard-deletion per the `softDeleteDuration` config setting.\ boolean, 0 or 1 (defaults to 0)

## `graphql`

GraphQL スキーマを管理できます。

#### `graphql/dump-schema`

コンソールコマンドに関するヘルプ情報を提供します。

**オプション**

`--token`
:   The token to look up to determine the appropriate GraphQL schema.

#### `graphql/print-schema`

指定された GraphQL スキーマを出力します。

**実例**

`--token`
:   The token to look up to determine the appropriate GraphQL schema.

## `help`

利用可能なすべてのコントローラーとアクションを機械可読形式でリストします。

#### `help/index` <badge>default</badge>

`action` で利用可能なすべてのオプションを機械可読形式でリストします。

**パラメータ**

`command`
:   The name of the command to show help about.\ If not provided, all available commands will be displayed.

**実例**

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

ボリューム内のアセットのインデックスを再作成できます。

**パラメータ**

`action`
:   Route to action. (required)

#### `help/usage`

`action` の使用法を表示します。

**パラメータ**

`action`
:   Route to action. (required)


## `index-assets`

すべてのボリュームに渡って、アセットのインデックスを再作成します。

#### `index-assets/all`

指定されたボリュームのハンドルから、アセットのインデックスを再作成します。

**オプション**

`--cache-remote-images`
:   Whether remote-stored images should be locally cached in the process.\ boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
:   Whether to auto-create new asset records when missing.\ boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
:   Whether to delete all asset records whose files are missing.\ boolean, 0 or 1 (defaults to 0)

#### `index-assets/one` <badge>default</badge>

Craft が既にインストールされているかどうかをチェックします。

インストールマイグレーションを実行します。

**オプション**

`handle`
:   The handle of the volume to index. (required)

`startAt`
:   Integer, defaults to 0.

**オプション**

`--cache-remote-images`
:   Whether remote-stored images should be locally cached in the process.\ boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
:   Whether to auto-create new asset records when missing.\ boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
:   Whether to delete all asset records whose files are missing.\ boolean, 0 or 1 (defaults to 0)

## `install`

Craft CMS の CLI インストーラーです。

#### `install/check` <badge>default</badge>

キャッシュタグを無効にできます。

#### `install/craft`

すべてのキャッシュタグを無効にします。

**オプション**

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

プラグインをインストールします。 （**非推奨**、代わりに [`plugin/install`](#plugin-install) を利用してください。 ）

**パラメータ**

`handle`
:   Handle of the plugin to be installed. (required)

## `invalidate-tags`

現在のメーラー設定で、メールの送信をテストします。

#### `invalidate-tags/all`

すべてのテンプレートキャッシュタグを無効にします。

#### `invalidate-tags/graphql`

Craft とプラグインのマイグレーションを管理します。

#### `invalidate-tags/index` <badge>default</badge>

保留中のすべての Craft、プラグイン、および、コンテンツのマイグレーションを実行します。

#### `invalidate-tags/template`

Invalidates all template cache tags.

## `mailer`

#### `mailer/test`

新しいマイグレーションを作成します。

**パラメータ**

`--to`
:   Email address that should receive the test message.

## `migrate`

Manages Craft and plugin migrations.

#### `migrate/all`

古いマイグレーションを戻すことで、アプリケーションをダウングレードします。

**パラメータ**

`--no-backup`
:   Skip backing up the database.\ boolean, 0 or 1 (defaults to 0)

`--no-content`
:   Exclude pending content migrations.\ boolean, 0 or 1 (defaults to 0)

#### `migrate/create`

適用されていない新しいマイグレーションを表示します。

**パラメータ**

`name`
:   The name of the new migration. This should only contain letters, digits, and underscores. (required)

**オプション**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--template-file`
:   The template file for generating new migrations.\ This can be either a [path alias](config3:aliases) (e.g. "@app/migrations/template.php") or a file path.\ defaults to `/var/www/html/vendor/craftcms/cms/src/updates/migration.php.template`

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/down`

マイグレーション履歴を表示します。

**パラメータ**

`limit`
:   The number of migrations to be reverted. Defaults to 1, meaning the last applied migration will be reverted. When value is `all`, all migrations will be reverted.

**オプション**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/fresh`

すべてのテーブルと関連する制約を削除します。 最初からマイグレーションを開始します。

**パラメータ**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/history`

マイグレーション履歴を指定したバージョンに変更します。

**パラメータ**

`limit`
:   The maximum number of migrations to be displayed. (Defaults to 10.)\ If `all`, the whole migration history will be displayed.

**パラメータ**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/mark`

Modifies the migration history to the specified version.

**パラメータ**

`version`
:   The version at which the migration history should be marked. (required)\ This can be either the timestamp or the full name of the migration.\ You may specify the name `m000000_000000_base` to set the migration history to a state where no migration has been applied.

**パラメータ**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/new`

新しいマイグレーションを適用して、アプリケーションをアップグレードします。

**パラメータ**

`limit`
:   The maximum number of new migrations to be displayed. (default: 10)\ If `all`, all available new migrations will be displayed.

**パラメータ**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/redo`

最後のいくつかのマイグレーションを再適用します。

**パラメータ**

`limit`
:   The number of migrations to be redone. Defaults to 1, meaning the last applied migration will be redone. When `all`, all migrations will be redone.

**パラメータ**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/to`

指定されたバージョンまでアップグレード、または、ダウングレードします。

**パラメータ**

`version`
:   Either the version name or the certain time value in the past that the application should be migrated to. This can be either the timestamp, the full name of the migration, the UNIX timestamp, or the parseable datetime string. (required)

**オプション**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/up` <badge>default</badge>

[Retry Duration](config3:retryDuration) 設定を利用して、*システム全体* の `Retry-After` ヘッダーを構成できます。

**パラメータ**

`limit`
:   The number of new migrations to be applied. If 0, it means applying all available new migrations. (Defaults to 0.)

**実例**

`--plugin`, `-p`
:   The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
:   The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\ If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
:   The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

## `off`

設定はプロジェクトコンフィグの `system.live` 値よりも優先されるため、`config/general.php` で `isSystemLive` を `true` または `false` にセットしている場合、これらの`on`/`off` コマンドはエラーになります。 ::: <config3:allowAdminChanges> restrictions—meant for temporary use during the deployment process.

**オプション**

`--retry`
:   Number of seconds that the `Retry-After` HTTP header should be set to for 503 responses.

The [Retry Duration](config3:retryDuration) setting can be used to configure a *system-wide* `Retry-After` header.

::: warning
<config3:isSystemLive> setting takes precedence over the `system.live` project config value, so if `config/general.php` sets `isSystemLive` to `true` or `false` these `on`/`off` commands to error out.
:::

**実例**

次のコードを実行するとシステムがオフラインになり、再び [on](#on) に切り替えるまで 503 レスポンスを返します。

```
$ php craft off --retry=60
The system is now offline.
The retry duration is now set to 60.
```

## `on`

プラグインを有効にします。

**パラメータ**

```
$ php craft on
The system is now online.
```

## `plugin`

プラグインをインストールします。

#### `plugin/disable`

プラグインを無効にします。

**パラメータ**

`handle`
:   The plugin handle. (required)

#### `plugin/enable`

プラグインを管理します。

**パラメータ**

`handle`
:   The plugin handle. (required)

#### `plugin/install`

プロジェクトコンフィグファイルの変更を適用します。

**オプション**

`handle`
:   The plugin handle. (required)

#### `plugin/uninstall`

保留中のプロジェクトコンフィグの YAML の変更点との差分を出力します。

**パラメータ**

`handle`
:   The plugin handle. (required)

**オプション**

`--force`
:   Whether the plugin uninstallation should be forced.\ boolean, 0 or 1 (defaults to 0)

## `project-config`

キューを管理します。

#### `project-config/apply`

ジョブを実行します。

**パラメータ**

`--force`
:   Whether every entry change should be force-applied.\ boolean, 0 or 1 (defaults to 0)

#### `project-config/diff`

Prints a diff of the pending project config YAML changes.

**オプション**

`--path`
:   Treats the loaded project config as the source of truth, rather than the YAML files.\ boolean, 0 or 1 (defaults to 0)

#### `project-config/rebuild`

新しく追加されたキュージョブを待ち受けて、それを実行します。

#### `project-config/sync`

[`apply`](#project-config-apply) のエイリアスです。

#### `プロジェクトコンフィグを管理します。`

Updates the `dateModified` value in `config/project/project.yaml`.

キューからジョブを解放します。

**パラメータ**

`timestamp`
:   The updated `dateModified` value. If `null`, the current time will be used. (optional int, defaults to `null`)

#### `プロジェクトコンフィグを再構築します。`

Writes out the currently-loaded project config as YAML files to the `config/project/` folder, discarding any pending YAML changes.

## `queue`

失敗したジョブをキューに再度追加します。

#### `queue/exec`

キュー内のすべてのジョブを実行します。

**パラメータ**

`id`
:   Of a message. (required string)

`ttr`
:   Time to reserve. (required int)

`attempt`
:   Number. (required int)

`pid`
:   Of a worker. (required int)

**オプション**

`--verbose`, `-v`
:   Verbose mode of a job execute. If enabled, execute result of each job will be printed.\ boolean, 0 or 1 (defaults to 0)

#### `queue/info` <badge>default</badge>

エレメントを一括保存できます。

#### `queue/listen`

アセットを再保存します。

**オプション**

`delay`
:   Number of seconds for waiting new job. (Defaults to 3.)

**オプション**

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

**オプション**

```
php craft queue/release all
```

#### `queue/retry`

行列ブロックを再保存します。

**オプション**

`job`
:   The job ID that should be retried, or pass `all` to retry all failed jobs. (required)

#### `queue/run`

タグを再保存します。

**オプション**

`--isolate`
:   isolate mode. It executes a job in a child process.\ boolean, 0 or 1 (defaults to 1)

`--php-binary`
:   Path to php interpreter that uses to run child processes.\ If undefined, `PHP_BINARY` will be used.

`--verbose`, `-v`
:   Verbose mode of a job execute. If enabled, execute result of each job will be printed.\ boolean, 0 or 1 (defaults to 0)

## `resave`

ユーザーを再保存します。

#### `resave/assets`

エントリを再保存します。

**オプション**

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

カテゴリを再保存します。

**オプション**

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

Craft CMS のセットアップインストーラーです。

**オプション**

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

[`setup/db-creds`](#setup-db-creds) のエイリアスです。

**オプション**

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

新しいデータベース接続設定を `.env` ファイルに保存します。

**オプション**

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

すべてのものを設定します。

**オプション**

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

新しいセキュリティキーを生成し、それを `.env` ファイルに保存します。

**Parameters**

`path`
:   The path to the database backup file.

## `serve`

#### `serve/index` <badge>default</badge>

Craft のサービスや Craft プロジェクトをテストするためのリソースを提供します。

## `setup`

現在のプロジェクトのテストスイートを設定します。

#### `setup/app-id`

新しいアプリケーション ID を生成し、それを `.env` ファイルに保存します。

#### `setup/db`

Alias for [`setup/db-creds`](#setup-db-creds).

#### `setup/db-cache-table`

Craft とプラグインをアップデートします。

#### `setup/db-creds`

現在の composer.json と composer.lock に基づいて、依存関係をインストールします。

**オプション**

`--database`
:   The name of the database to select.

`--driver`
:   The database driver to use. Either `mysql` for MySQL or `pgsql` for PostgreSQL.

`--password`
:   The database password to connect with.

`--port`
:   The database server port. デフォルトは、MySQL 向けの 3306、および、PostgreSQL 向けの 5432。

`--schema`
:   The database schema to use (PostgreSQL only).

`--server`
:   The database server name or IP address. Usually `localhost` or `127.0.0.1`.

`--table-prefix`
:   The table prefix to add to all database tables. This can be no more than 5 characters, and must be all lowercase.

`--user`
:   The database username to connect with.\ (defaults to `root`)

#### `setup/index` <badge>default</badge>

Craft、および / または、プラグインをアップデートします。

#### `setup/php-session-table`

PHP セッション情報を保存するデータベーステーブルを作成します。

#### `setup/security-key`

Generates a new security key and saves it in the `.env` file.

#### `setup/welcome`

すべての非 ASCII なアセットファイル名を ASCII に変換します。

## `shell`

すべてのエレメントの UID がユニークであることを確認します。

```
composer require --dev yiisoft/yii2-shell
```
:::

#### `utils/utils/prune-revisions/index` <badge>default</badge>

Runs an interactive shell.

```
$ php craft shell
Psy Shell v0.10.4 (PHP 7.4.3 — cli) by Justin Hileman
>>> help
  help       Show a list of commands. Type `help [foo]` for information about [foo].      Alias
  ls         List local, instance or class variables, methods and constants.              Alias
  dump       Dump an object or primitive.
  doc        Read the documentation for an object, class, constant, method or property.   Alias
  show       Show the code for an object, class, constant, method or property.
  wtf        Show the backtrace of the most recent exception.                             Alias
  whereami   Show where you are in the code.
  throw-up   Throw an exception or error out of the Psy Shell.
  timeit     Profiles with a timer.
  trace      Show the current call stack.
  buffer     Show (or clear) the contents of the code input buffer.                       Alias
  clear      Clear the Psy Shell screen.
  edit       Open an external editor. Afterwards, get produced code in input buffer.
  sudo       Evaluate PHP code, bypassing visibility restrictions.
  history    Show the Psy Shell history.                                                  Alias
  exit       End the current session and return to caller.                                Alias
```

**オプション**

`--include`
:   Include file(s) before starting tinker shell.\ array

## `tests`

カテゴリグループの構造データを修復します。

#### `tests/setup`

Sets up a test suite for the current project.

**オプション**

`dst`
:   The folder that the test suite should be generated in.\ Defaults to the current working directory.

#### `tests/test`

プロジェクトコンフィグのダブルパックされた連想配列を修復します。

## `up`

Runs pending migrations and applies pending project config changes.

### `up/index` <badge vertical="center">default</badge>

Runs pending migrations and applies pending project config changes.

**Options**

`--force`
:   Whether to perform the action even if a mutex lock could not be acquired.

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

## `users`

#### `users/create`

Creates a user.

**Options**

`--admin`
:   Whether the user should be an admin.\ boolean, 0 or 1

`--email`
:   The user’s email.

`--group-ids`
:   The group IDs to assign the user to the created user to.\ int[]

`--groups`
:   The group handles to assign the created user to.\ string[]

`--password`
:   The user’s new password.

`--username`
:   The user’s username.

#### `users/delete`

Deletes a user.

**Parameters**

`usernameOrEmail`
:   The user’s username or email address.

**Options**

`--delete-content`
:   Whether to delete the user’s content if no inheritor is specified.\ boolean, 0 or 1 (defaults to 0)

`--hard`
:   Whether the user should be hard-deleted immediately, instead of soft-deleted.\ boolean, 0 or 1 (defaults to 0)

`--inheritor`
:   The email or username of the user to inherit content when deleting a user.

## `utils/ascii-filenames`

#### `utils/ascii-filenames/index` <badge>default</badge>

Converts all non-ASCII asset filenames to ASCII.

## `utils/fix-element-uids`

#### `utils/fix-element-uids/index` <badge>default</badge>

Ensures all element UIDs are unique.

## `utils/prune-provisional-drafts`

Prunes provisional drafts for elements that have more than one per user.

#### `utils/prune-provisional-drafts/index` <badge vertical="center">default</badge>

Prunes provisional drafts for elements that have more than one per user.

**オプション**

`--dry-run`
:   Whether this is a dry run.


## `utils/prune-revisions`

Prunes excess element revisions.

#### `utils/prune-revisions/index` <badge vertical="center">default</badge>

Prunes excess element revisions.

**Options**

`--max-revisions`
:   The maximum number of revisions an element can have.

`--dry-run`
:   Whether this is a dry run.

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

<!-- END COMMANDS -->
