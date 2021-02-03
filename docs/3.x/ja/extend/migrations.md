# マイグレーション

マイグレーションは、システムに一時的な変更を加える PHP クラスです。

ほとんどの場合、Craft のマイグレーションは [Yii の実装](https://www.yiiframework.com/doc/guide/2.0/en/db-migrations)と同様に機能しますが、Yii と異なり、Craft は3種類のマイグレーションを管理します。

- **アプリケーションのマイグレーション** – Craft 独自の内部的なマイグレーション
- **プラグインのマイグレーション** – インストールされたプラグインが持つ独自のマイグレーショントラック
- **コンテンツのマイグレーション** - Craft プロジェクト自体もマイグレーションできます。

## マイグレーションの作成

::: tip
Craft のインストールが Vagrant box から実行されている場合、これらのコマンドを実行するために box に SSH 接続する必要があります。
:::

プラグインやプロジェクトのための新しいマイグレーションを作成するために、ターミナルを開き Craft プロジェクトに移動してください。

```bash
cd /path/to/project
```

それから、プラグインのための新しいマイグレーションファイルを生成するために次のコマンドを実行します（`<migration_name>` を snake_case のマイグレーション名に、`<plugin-handle>` を kebab-case のプラグインハンドルに置き換えます）。

::: code

```bash Plugin Migration
php craft migrate/create my_migration_name --plugin=my-plugin-handle
```

```bash Content Migration
php craft migrate/create my_migration_name
```

:::

プロンプトで `yes` と入力すると、新しいマイグレーションファイルが作成されます。 コマンドによって出力されたファイルパスで見つけることができます。

プラグインのマイグレーションの場合、プラグインの[スキーマバージョン](craft3:craft\base\PluginTrait::$schemaVersion)を上げてください。 そうすることで、Craft は新しいバージョンにアップデートするように新しいプラグインのマイグレーションをチェックすることを知ります。

### 内部で行うこと

マイグレーションクラスには [safeUp()](yii2:yii\db\Migration::safeUp()) と [safeDown()](yii2:yii\db\Migration::safeDown()) メソッドが含まれます。 マイグレーションが _適用される_ ときに `safeUp()` が実行され、_復帰させる_ ときに `safeDown()` が実行されます。

::: tip
You can usually ignore the `safeDown()` method, as Craft doesn’t have a way to revert migrations from the control panel.
:::

`safeUp()` メソッドから [Craft の API](https://docs.craftcms.com/api/v3/) にフルアクセスできますが、プラグインのマイグレーションはここでプラグイン独自の API を呼び出すことを避けるようにする必要があります。 長い間にプラグインのデータベーススキーマが変化するように、スキーマに関する API の想定も変化します。 古いマイグレーションが、まだ適用されていないデータベースの変更を前提とするサービスメソッドを呼び出すと、SQL エラーをもたらすでしょう。 そのため、一般的には独自のマイグレーションクラスからすべての SQL クエリを直接実行する必要があります。 コードを複製しているように感じるかもしれませんが、将来的にも保証されるでしょう。

### データベースデータの操作

マイグレーションクラスは <craft3:craft\db\Migration> を拡張し、データベースを操作するためのいくつかのメソッドを提供しています。 マイグレーションメソッドはどちらも使いやすく、ターミナルにステータスメッセージを出力するため、<craft3:craft\db\Command> よりもこれらを使う方が良いでしょう。

```php
// Bad:
$this->db->createCommand()
    ->insert('{{%tablename}}', $rows)
    ->execute();

// Good:
$this->insert('{{%tablename}}', $rows);
```

<craft3:craft\helpers\MigrationHelper> provides several helpful methods as well:

- [dropForeignKeyIfExists()](craft3:craft\helpers\MigrationHelper::dropForeignKeyIfExists()) removes a foreign key if it exists, without needing to know its exact name.
- [dropIndexIfExists()](craft3:craft\helpers\MigrationHelper::dropIndexIfExists()) removes an index if it exists, without needing to know its exact name.
- [dropTable()](craft3:craft\helpers\MigrationHelper::dropTable()) drops a table, along with any foreign keys that reference it (some of which your plugin might not even be aware of).

::: warning
The <yii2:yii\db\Migration::insert()>, [batchInsert()](craft3:craft\db\Migration::batchInsert()), and [update()](yii2:yii\db\Migration::update()) migration methods will automatically insert/update data in the `dateCreated`, `dateUpdated`, `uid` table columns in addition to whatever you specified in the `$columns` argument. If the table you’re working with does’t have those columns, make sure you pass `false` to the `$includeAuditColumns` argument so you don’t get a SQL error.
:::

::: tip
<craft3:craft\db\Migration> doesn’t have a method for _selecting_ data, so you will still need to go through Yii’s [Query Builder](https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder) for that.

```php
use craft\db\Query;

$result = (new Query())
    // ...
    ->all();
```

:::

### ロギング

If you want to log messages in your migration code, echo it out rather than calling [Craft::info()](yii2:yii\BaseYii::info()):

```php
echo "    > some note\n";
```

If the migration is being run from a console request, this will ensure the message is seen by whoever is executing the migration, as the message will be output into the terminal. If it’s a web request, Craft will capture it and log it to `storage/logs/` just as if you had used `Craft::info()`.

## マイグレーションの実行

You can have Craft apply your new migration from the terminal:

::: code

```bash Plugin Migration
php craft migrate/up --plugin=my-plugin-handle
```

```bash Content Migration
php craft migrate/up
```

:::

Or you can have Craft apply all new migrations across all migration tracks:

```bash
php craft migrate/all
```

Craft will also check for new plugin migrations on control panel requests, for any plugins that have a new [schema version](craft3:craft\base\PluginTrait::$schemaVersion), and content migrations can be applied from the Control Panel by going to Utilities → Migrations.

## プラグインのインストールマイグレーション

Plugins can have a special “Install” migration which handles the installation and uninstallation of the plugin. Install migrations live at `migrations/Install.php` alongside normal migrations. They should follow this template:

```php
<?php
namespace ns\prefix\migrations;

use craft\db\Migration;

class Install extends Migration
{
    public function safeUp()
    {
        // ...
    }

    public function safeDown()
    {
        // ...
    }
}
```

You can give your plugin an install migration with the `migrate/create` command if you pass the migration name “`install`”:

```bash
php craft migrate/create install --plugin=my-plugin-handle
```

When a plugin has an Install migration, its `safeUp()` method will be called when the plugin is installed, and its `safeDown()` method will be called when the plugin is uninstalled (invoked by the plugin’s [install()](craft3:craft\base\Plugin::install()) and [uninstall()](craft3:craft\base\Plugin::uninstall()) methods).

::: tip
It is _not_ a plugin’s responsibility to manage its row in the `plugins` database table. Craft takes care of that for you.
:::

### デフォルトのプロジェクトコンフィグデータの設定

If you want to add things to the [project config](project-config.md) on install, either directly or via your plugin’s API, be sure to only do that if the incoming project config YAML doesn’t already have a record of your plugin.

```php
public function safeUp()
{
    // ...

    // Don't make the same config changes twice
    if (Craft::$app->projectConfig->get('plugins.<plugin-handle>', true) === null) {
        // Make the config changes here...
    }
}
```

That’s because there’s a chance that your plugin is being installed as part of a project config sync, and if its install migration were to make any project config changes of its own, they would overwrite all of the incoming project config YAML changes.
