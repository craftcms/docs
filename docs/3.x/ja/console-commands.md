# コンソールコマンド

Craft とのインタラクションのほとんどはブラウザ上で行われますが、ターミナル上で実行されるコンソールコマンドを経由していくつかの重要なツールを利用できます。

`cron` でタスクを自動化したり、SSH 経由や[デプロイ処理](https://craftcms.com/knowledge-base/deployment-best-practices)の一部としてプライベートにアクションを発動したり、ウェブサーバーの制約によって制限されるリソース集約型のタスクを実行するなど、様々な理由で便利です。

Craft コンソールアプリケーション（`craft`）はプロジェクトのルートにあり、実行には PHP が必要です。

::: tip
ターミナルから PHP を実行するために、環境を設定する必要があるかもしれません。`php-fpm` と `mod_php` はウェブサーバーと一緒に動作することを意味し、`php-cli` はコマンドライン向けの別プロセスです。
:::

`php craft` を引数なしで実行すると、利用可能なオプションのリストが出力されます。

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

...

To see the help of each command, enter:

  craft help <command-name>
```

`php craft help <command-name>`を実行して、コマンド、および、コマンドが受け入れることができるパラメータやオプションの詳細を確認できます。

利用可能なコマンドのリストには、プロジェクトに追加されたプラグインやカスタムモジュールのものも含まれます。Craft のデフォルトの CLI コマンドは、次の通りです。

## `backup`

#### `backup/db` <badge>default</badge>

新しいデータベースのバックアップを作成します。

**オプション**

`--path`
: The path the database backup should be created at. Can be any of the following:
    - A full file path
    - A folder path (backup will be saved in there with a dynamically-generated name)
    - A filename (backup will be saved in the working directory with the given name)
    - Blank (backup will be saved to the `config/backups/` folder with a dynamically-generated name)

`--zip`
: Whether the backup should be saved as a zip file.\
boolean, 0 or 1 (defaults to 0)

## `cache`

キャッシュをフラッシュできます。

#### `cache/flush`

指定されたキャッシュコンポーネントをフラッシュします。

#### `cache/flush-all`

システムに登録されたすべてのキャッシュをフラッシュします。

#### `cache/flush-schema`

指定された接続コンポーネントの DB スキーマキャッシュをクリアします。

**パラメータ**

`componentId`
: ID of the connection component. (Defaults to `db`.)

**実例**

```sh
php craft cache/flush-schema
# identical to `php craft cache/flush-schema db`
```

#### `cache/index` <badge>default</badge>

フラッシュできるキャッシュの一覧を表示します。

## `clear-caches`

様々な Craft のキャッシュをクリアできます。

#### `clear-caches/all`

すべてのキャッシュをクリアします。

#### `clear-caches/asset`

アセットキャッシュをクリアします。

#### `clear-caches/asset-indexing-data`

アセットインデックスデータをクリアします。

#### `clear-caches/compiled-templates`

コンパイル済みのテンプレートをクリアします。

#### `clear-caches/cp-resources`

コントロールパネルのリソースをクリアします。

#### `clear-caches/data`

データキャッシュをクリアします。

#### `clear-caches/index` <badge>default</badge>

クリアできるキャッシュの一覧を表示します。

#### `clear-caches/temp-files`

一時的なファイルをクリアします。

#### `clear-caches/transform-indexes`

アセット変換インデックスをクリアします。

## `fixture`

テストのフィクスチャを管理できます。

#### `fixture/load` <badge>default</badge>

指定されたフィクスチャデータをロードします。

**パラメータ**

`fixturesInput`
: Array of fixtures to load.

**オプション**

`--global-fixtures`, `-g`
: Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
: Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

#### `fixture/unload`

指定されたフィクスチャをアンロードします。

**パラメータ**

`fixturesInput`
: Array of fixtures to load.

**オプション**

`--global-fixtures`, `-g`
: Array of global fixtures that should be applied when loading and unloading. Set to `InitDbFixture` by default, which disables and enables integrity check so your data can be safely loaded.

`--namespace`, `-n`
: Namespace to search for fixtures. Defaults to `tests\unit\fixtures`.

## `gc`

#### `gc/run` <badge>default</badge>

ガベージコレクションを実行します。

**オプション**

`--delete-all-trashed`
: Whether all soft-deleted items should be deleted, rather than just the ones that were deleted long enough ago to be ready for hard-deletion per the `softDeleteDuration` config setting.\
boolean, 0 or 1 (defaults to 0)

## `graphql`

GraphQL スキーマを管理できます。

#### `graphql/dump-schema`

指定された GraphQL スキーマをファイルにダンプします。

**オプション**

`--token`
: The token to look up to determine the appropriate GraphQL schema.

#### `graphql/print-schema`

指定された GraphQL スキーマを出力します。

**オプション**

`--token`
: The token to look up to determine the appropriate GraphQL schema.

## `help`

コンソールコマンドに関するヘルプ情報を提供します。

#### `help/index` <badge>default</badge>

利用可能なコマンドや詳細情報を表示します。

**パラメータ**

`command`
: The name of the command to show help about.\
If not provided, all available commands will be displayed.

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

利用可能なすべてのコントローラーとアクションを機械可読形式でリストします。

#### `help/list-action-options`

`action` で利用可能なすべてのオプションを機械可読形式でリストします。

**パラメータ**

`action`
: Route to action. (required)

#### `help/usage`

`action` の使用法を表示します。

**パラメータ**

`action`
: Route to action. (required)


## `index-assets`

ボリューム内のアセットのインデックスを再作成できます。

#### `index-assets/all`

すべてのボリュームに渡って、アセットのインデックスを再作成します。

**オプション**

`--cache-remote-images`
: Whether remote-stored images should be locally cached in the process.\
boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
: Whether to auto-create new asset records when missing.\
boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
: Whether to delete all asset records whose files are missing.\
boolean, 0 or 1 (defaults to 0)

#### `index-assets/one` <badge>default</badge>

指定されたボリュームのハンドルから、アセットのインデックスを再作成します。

**パラメータ**

`handle`
: The handle of the volume to index. (required)

`startAt`
: Integer, defaults to 0.

**オプション**

`--cache-remote-images`
: Whether remote-stored images should be locally cached in the process.\
boolean, 0 or 1 (defaults to 0)

`--create-missing-assets`
: Whether to auto-create new asset records when missing.\
boolean, 0 or 1 (defaults to 1)

`--delete-missing-assets`
: Whether to delete all asset records whose files are missing.\
boolean, 0 or 1 (defaults to 0)

## `install`

Craft CMS の CLI インストーラーです。

#### `install/check` <badge>default</badge>

Craft が既にインストールされているかどうかをチェックします。

#### `install/craft`

インストールマイグレーションを実行します。

**オプション**

`--email`
: The default email address for the first user to create during install.

`--language`
: The default langcode for the first site to create during install.

`--password`
: The default password for the first user to create during install.

`--site-name`
: The default site name for the first site to create during install.

`--site-url`
: The default site url for the first site to create during install.

`--username`
: The default username for the first user to create during install.

#### `install/plugin`

プラグインをインストールします。（**非推奨**、代わりに [`plugin/install`](#plugin-install) を利用してください。）

**パラメータ**

`handle`
: Handle of the plugin to be installed. (required)

## `invalidate-tags`

キャッシュタグを無効にできます。

#### `invalidate-tags/all`

すべてのキャッシュタグを無効にします。

#### `invalidate-tags/graphql`

すべての GraphQL クエリキャッシュタグを無効にします。

#### `invalidate-tags/index` <badge>default</badge>

クリアできるキャッシュの一覧を表示します。

#### `invalidate-tags/template`

すべてのテンプレートキャッシュタグを無効にします。

## `mailer`

#### `mailer/test`

現在のメーラー設定で、メールの送信をテストします。

**オプション**

`--to`
: Email address that should receive the test message.

## `migrate`

Craft とプラグインのマイグレーションを管理します。

#### `migrate/all`

保留中のすべての Craft、プラグイン、および、コンテンツのマイグレーションを実行します。

**オプション**

`--no-backup`
: Skip backing up the database.\
boolean, 0 or 1 (defaults to 0)

`--no-content`
: Exclude pending content migrations.\
boolean, 0 or 1 (defaults to 0)

#### `migrate/create`

新しいマイグレーションを作成します。

**パラメータ**

`name`
: The name of the new migration. This should only contain letters, digits, and underscores. (required)

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--template-file`
: The template file for generating new migrations.\
This can be either a [path alias](config3:aliases) (e.g. "@app/migrations/template.php") or a file path.\
defaults to `/var/www/html/vendor/craftcms/cms/src/updates/migration.php.template`

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/down`

古いマイグレーションを戻すことで、アプリケーションをダウングレードします。

**パラメータ**

`limit`
: The number of migrations to be reverted. Defaults to 1, meaning the last applied migration will be reverted. When value is `all`, all migrations will be reverted.

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/fresh`

すべてのテーブルと関連する制約を削除します。最初からマイグレーションを開始します。

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/history`

マイグレーション履歴を表示します。

**パラメータ**

`limit`
: The maximum number of migrations to be displayed. (Defaults to 10.)\
If `all`, the whole migration history will be displayed.

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/mark`

マイグレーション履歴を指定したバージョンに変更します。

**パラメータ**

`version`
: The version at which the migration history should be marked. (required)\
This can be either the timestamp or the full name of the migration.\
You may specify the name `m000000_000000_base` to set the migration history to a state where no migration has been applied.

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/new`

適用されていない新しいマイグレーションを表示します。

**パラメータ**

`limit`
: The maximum number of new migrations to be displayed. (default: 10)\
If `all`, all available new migrations will be displayed.

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/redo`

最後のいくつかのマイグレーションを再適用します。

**パラメータ**

`limit`
: The number of migrations to be redone. Defaults to 1, meaning the last applied migration will be redone. When `all`, all migrations will be redone.

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/to`

指定されたバージョンまでアップグレード、または、ダウングレードします。

**パラメータ**

`version`
: Either the version name or the certain time value in the past that the application should be migrated to. This can be either the timestamp, the full name of the migration, the UNIX timestamp, or the parseable datetime string. (required)

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

#### `migrate/up` <badge>default</badge>

新しいマイグレーションを適用して、アプリケーションをアップグレードします。

**パラメータ**

`limit`
: The number of new migrations to be applied. If 0, it means applying all available new migrations. (Defaults to 0.)

**オプション**

`--plugin`, `-p`
: The handle of the plugin to use during migration operations, or the plugin itself.

`--track`
: The migration track to work with (e.g. `craft`, `content`, `plugin:commerce`, etc.)\
If `--plugin` is passed, this will automatically be set to the plugin’s track. Otherwise defaults to `content`.

`--type`, `-t`
: The type of migrations we’re dealing with here. Can be `app`, `plugin`, or `content`.

## `off`

<config3:allowAdminChanges> の制限をバイパスして、プロジェクトコンフィグの `system.live` 値を無効にします。これは、デプロイ処理中に一時的に利用するためのものです。

**オプション**

`--retry`
: Number of seconds that the `Retry-After` HTTP header should be set to for 503 responses.

[Retry Duration](config3:retryDuration) 設定を利用して、*システム全体* の `Retry-After` ヘッダーを構成できます。

::: warning
<config3:isSystemLive> 設定はプロジェクトコンフィグの `system.live` 値よりも優先されるため、`config/general.php` で `isSystemLive` を `true` または `false` にセットしている場合、これらの`on`/`off` コマンドはエラーになります。
:::

**実例**

次のコードを実行するとシステムがオフラインになり、再び [on](#on) に切り替えるまで 503 レスポンスを返します。

```
$ php craft off --retry=60
The system is now offline.
The retry duration is now set to 60.
```

## `on`

システムを再びオンにします。

**実例**

```
$ php craft on
The system is now online.
```

## `plugin`

プラグインを管理します。

#### `plugin/disable`

プラグインを無効にします。

**パラメータ**

`handle`
: The plugin handle. (required)

#### `plugin/enable`

プラグインを有効にします。

**パラメータ**

`handle`
: The plugin handle. (required)

#### `plugin/install`

プラグインをインストールします。

**パラメータ**

`handle`
: The plugin handle. (required)

#### `plugin/uninstall`

プラグインをアンインストールします。

**パラメータ**

`handle`
: The plugin handle. (required)

## `project-config`

プロジェクトコンフィグを管理します。

#### `project-config/apply`

プロジェクトコンフィグファイルの変更を適用します。

**オプション**

`--force`
: Whether every entry change should be force-applied.\
boolean, 0 or 1 (defaults to 0)

#### `project-config/diff`

保留中のプロジェクトコンフィグの YAML の変更点との差分を出力します。

#### `project-config/rebuild`

プロジェクトコンフィグを再構築します。

#### `project-config/sync`

[`apply`](#project-config-apply) のエイリアスです。

## `queue`

キューを管理します。

#### `queue/exec`

ジョブを実行します。

**パラメータ**

`id`
: Of a message. (required string)

`ttr`
: Time to reserve. (required int)

`attempt`
: Number. (required int)

`pid`
: Of a worker. (required int)

**オプション**

`--verbose`, `-v`
: Verbose mode of a job execute. If enabled, execute result of each job will be printed.\
boolean, 0 or 1 (defaults to 0)

#### `queue/info` <badge>default</badge>

キューのステータスに関する情報です。

#### `queue/listen`

新しく追加されたキュージョブを待ち受けて、それを実行します。

**パラメータ**

`delay`
: Number of seconds for waiting new job. (Defaults to 3.)

**オプション**

`--isolate`
: isolate mode. It executes a job in a child process.\
boolean, 0 or 1 (defaults to 1)

`--php-binary`
: Path to php interpreter that uses to run child processes.\
If undefined, `PHP_BINARY` will be used.

`--verbose`, `-v`
: Verbose mode of a job execute. If enabled, execute result of each job will be printed.\
boolean, 0 or 1 (defaults to 0)

#### `queue/release`

キューからジョブを解放します。

**パラメータ**

`job`
: The job ID to release. Pass `all` to release all jobs. (required)

**実例**

```
php craft queue/release all
```

#### `queue/retry`

失敗したジョブをキューに再度追加します。

**パラメータ**

`job`
: The job ID that should be retried, or pass `all` to retry all failed jobs. (required)

#### `queue/run`

キュー内のすべてのジョブを実行します。

**オプション**

`--isolate`
: isolate mode. It executes a job in a child process.\
boolean, 0 or 1 (defaults to 1)

`--php-binary`
: Path to php interpreter that uses to run child processes.\
If undefined, `PHP_BINARY` will be used.

`--verbose`, `-v`
: Verbose mode of a job execute. If enabled, execute result of each job will be printed.\
boolean, 0 or 1 (defaults to 0)

## `resave`

エレメントを一括保存できます。

#### `resave/assets`

アセットを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

`--volume`
: The volume handle(s) to save assets from. Can be set to multiple comma-separated volumes.

#### `resave/categories`

カテゴリを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--group`
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

#### `resave/entries`

エントリを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--section`
: The section handle(s) to save entries from. Can be set to multiple comma-separated sections.

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--type`
: The type handle(s) of the elements to resave.

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

#### `resave/matrix-blocks`

行列ブロックを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--field`
: The field handle to save Matrix blocks for.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--type`
: The type handle(s) of the elements to resave.

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

#### `resave/tags`

タグを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--group`
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

#### `resave/users`

ユーザーを再保存します。

**オプション**

`--element-id`
: The ID(s) of the elements to resave.

`--group`
: The group handle(s) to save categories/tags/users from. Can be set to multiple comma-separated groups.

`--limit`
: The number of elements to resave.

`--offset`
: The number of elements to skip.

`--propagate`
: Whether to save the elements across all their enabled sites.\
boolean, 0 or 1 (defaults to 1)

`--site`
: The site handle to save elements from.

`--status`
: The status(es) of elements to resave. Can be set to multiple comma-separated statuses.\
(defaults to `any`)

`--uid`
: The UUID(s) of the elements to resave.

`--update-search-index`
: Whether to update the search indexes for the resaved elements.\
boolean, 0 or 1 (defaults to 0)

## `restore`

#### `restore/db` <badge>default</badge>

バックアップからデータベースを復元します。

**パラメータ**

`path`
: The path to the database backup file.

## `serve`

#### `serve/index` <badge>default</badge>

PHP の組み込みウェブサーバーを実行します。

## `setup`

Craft CMS のセットアップインストーラーです。

#### `setup/app-id`

新しいアプリケーション ID を生成し、それを `.env` ファイルに保存します。

#### `setup/db`

[`setup/db-creds`](#setup-db-creds) のエイリアスです。

#### `setup/db-cache-table`

DB キャッシュを保存するデータベーステーブルを作成します。

#### `setup/db-creds`

新しいデータベース接続設定を `.env` ファイルに保存します。

**オプション**

`--database`
: The name of the database to select.

`--driver`
: The database driver to use. Either `mysql` for MySQL or `pgsql` for PostgreSQL.

`--password`
: The database password to connect with.

`--port`
: The database server port. デフォルトは、MySQL 向けの 3306、および、PostgreSQL 向けの 5432。

`--schema`
: The database schema to use (PostgreSQL only).

`--server`
: The database server name or IP address. Usually `localhost` or `127.0.0.1`.

`--table-prefix`
: The table prefix to add to all database tables. This can be no more than 5 characters, and must be all lowercase.

`--user`
: The database username to connect with.\
(defaults to `root`)

#### `setup/index` <badge>default</badge>

すべてのものを設定します。

#### `setup/php-session-table`

PHP セッション情報を保存するデータベーステーブルを作成します。

#### `setup/security-key`

新しいセキュリティキーを生成し、それを `.env` ファイルに保存します。

#### `setup/welcome`

Composer フック `post-create-project-cmd` から呼び出されます。

## `tests`

Craft のサービスや Craft プロジェクトをテストするためのリソースを提供します。

#### `tests/setup`

現在のプロジェクトのテストスイートを設定します。

**パラメータ**

`dst`
: The folder that the test suite should be generated in.\
Defaults to the current working directory.

#### `tests/test`

このメソッドは利用しないでください。実際には何も実行しません。

## `update`

Craft とプラグインをアップデートします。

#### `update/composer-install`

現在の composer.json と composer.lock に基づいて、依存関係をインストールします。

#### `update/info`

利用可能なアップデートに関する情報を表示します。

#### `update/update` <badge>default</badge>

Craft、および / または、プラグインをアップデートします。

**パラメータ**

`handle`
: The update handle (`all`, `craft`, or a plugin handle). You can pass multiple handles separated by spaces, and you can update to a specific version using the syntax `<handle>:<version>`.

**オプション**

`--backup`
: Backup the database before updating.\
boolean, 0 or 1

`--force`, `-f`
: Force the update if `allowUpdates` is disabled.\
boolean, 0 or 1 (defaults to 0)

`--migrate`
: Run new database migrations after completing the update.\
boolean, 0 or 1 (defaults to 1)

## `utils/ascii-filenames`

#### `utils/ascii-filenames/index` <badge>default</badge>

すべての非 ASCII なアセットファイル名を ASCII に変換します。

## `utils/fix-element-uids`

#### `utils/fix-element-uids/index` <badge>default</badge>

すべてのエレメントの UID がユニークであることを確認します。

## `utils/prune-revisions`

#### `utils/utils/prune-revisions/index` <badge>default</badge>

余分なエレメントのリビジョンを削除します。

**オプション**

`--max-revisions`
: The maximum number of revisions an element can have.

## `utils/repair`

データを修復します。

#### `utils/repair/category-group-structure`

カテゴリグループの構造データを修復します。

**パラメータ**

`handle`
: The category group handle. (required)

**オプション**

`--dry-run`
: Whether to only do a dry run of the repair process.\
boolean, 0 or 1 (defaults to 0)

#### `utils/repair/project-config`

プロジェクトコンフィグのダブルパックされた連想配列を修復します。

**オプション**

`--dry-run`
: Whether to only do a dry run of the repair process.\
boolean, 0 or 1 (defaults to 0)

#### `utils/repair/section-structure`

セクションの構造データを修復します。

**パラメータ**

`handle`
: The section handle. (required)

**オプション**

`--dry-run`
: Whether to only do a dry run of the repair process.\
boolean, 0 or 1 (defaults to 0)

## `utils/update-usernames`

#### `utils/update-usernames/index` <badge>default</badge>

すべてのユーザーのユーザー名を更新して、メールアドレスと一致するようにします。

**実例**

```
$ php craft utils/update-usernames
10 usernames updated.
```
