# Migrations

Migrations are PHP classes that make one-time changes to the system.

For the most part, migrations in Craft work similarly to [Yii’s implementation](guide:db-migrations). _Unlike_ Yii, Craft manages three different types of migrations:

App migrations
:   Craft’s own internal migrations. You will only create an `app` migration when contributing to Craft. Every Craft installation runs these migrations after an update.

Plugin migrations
:   Each installed plugin has its own migration “track.” Only Craft projects that have your plugin installed and enabled will run these migrations.

Content migrations
:   Migrations specific to your Craft project. These often contain steps that manipulate data based on handles or other identifiers that are only relevant internally.

[Modules](module-guide.md) are treated as part of your application, and should use content migrations.

## Creating Migrations

To create a new migration, use the `migrate/create` command:

::: code
```bash Plugin Migration
php craft migrate/create my_migration_name --plugin=my-plugin-handle
```
```bash Content Migration
php craft migrate/create my_migration_name
```
:::

Enter `yes` at the prompt, and a new migration file will be created for you. You can find it at the file path output by the command; migration classes include a timestamp prefix with the format `mYYMMDD_HHMMSS`, like `m250923_000000`.

This file and class should _never_ be renamed after release!
Doing so can cause it to run again, or out of order.
Similarly, the only time it is appropriate to modify an existing migration is when it produces errors for your users.
Those changes should be published as part of a new release, and they should never result in a different schema.

::: tip
If this is a plugin migration, increase your plugin’s [schema version](#schema-version), so Craft knows to run new migrations after an update.
:::

### What Goes Inside

Migration classes must define two methods:

- [safeUp()](<yii2:yii\db\Migration::safeUp()>) — Run when the migration is _applied_.
- [safeDown()](<yii2:yii\db\Migration::safeDown()>) — Run when the migration is _reverted_.

::: tip
You can usually ignore the `safeDown()` method, as Craft doesn’t have a way to revert migrations from the control panel.
During development and testing, however, you may find that it significantly easier to [roll back](#rolling-back) a migration than drop and re-import a database.
:::

You have full access to [Craft’s API](https://docs.craftcms.com/api/v5/) from your `safeUp()` method, but plugin migrations should try to avoid calling the plugin’s own API here.
As your plugin’s database schema changes over time, so will your APIs assumptions about the schema.
If a migration calls a service method that relies on database changes that haven’t been applied yet, it will result in a SQL error.
In general, you should execute all SQL queries _directly from that migration class_.
It may feel like you’re duplicating code, but it will be more future-proof.
Read more about this in the [rollbacks and compatibility](#rollbacks-and-compatibility) section.

When you’ve finalized a migration, make sure its effects are reflected in the [install migration](#plugin-install-migrations), as well.
When a plugin is installed

### Manipulating Database Data

Your migration class extends <craft5:craft\db\Migration>, which provides several methods for working with the database.
These are often more convenient than their <craft5:craft\db\Command> counterparts, and they’ll output a status message to the terminal for you.

```php
// Traditional command:
$this->db->createCommand()
    ->insert('{{%mytablename}}', $rows)
    ->execute();

// Migration shortcut:
$this->insert('{{%mytablename}}', $rows);
```

<craft5:craft\helpers\MigrationHelper> provides several helpful methods, as well:

- [dropForeignKeyIfExists()](craft5:craft\helpers\MigrationHelper::dropForeignKeyIfExists()) removes a foreign key if it exists, without needing to know its exact name (oftentimes a random string).
- [dropIndexIfExists()](craft5:craft\helpers\MigrationHelper::dropIndexIfExists()) removes an index if it exists, without needing to know its exact name (oftentimes a random string).
- [dropTable()](craft5:craft\helpers\MigrationHelper::dropTable()) drops a table, along with any foreign keys that reference it (some of which your plugin might not even be aware of).

::: warning
The <yii2:yii\db\Migration::insert()>, [batchInsert()](<craft5:craft\db\Migration::batchInsert()>), and [update()](<yii2:yii\db\Migration::update()>) migration methods will automatically insert/update data in the `dateCreated`, `dateUpdated`, `uid` table columns in addition to whatever you specified in the `$columns` argument. If the table you’re working with does’t have those columns, make sure you pass `false` to the `$includeAuditColumns` argument so you don’t get a SQL error.
:::

::: tip
<craft5:craft\db\Migration> doesn’t have a method for _selecting_ data, so you will still need to go through Yii’s [Query Builder](https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder) for read-only queries.

```php
use craft\db\Query;

$result = (new Query())
    // ...
    ->all();
```
:::

### Logging

If you want to log messages in your migration code, `echo` it rather than calling [Craft::info()](<yii2:yii\BaseYii::info()>):

```php
echo "    > some note\n";
```

When the migration is run from the console, `echo` outputs text to the terminal (`stdout`).
For web requests, Craft captures the output and logs it to `storage/logs/`, as if you had used `Craft::info()`.
As a consequence, use of the [console command output helpers](commands.md#output-helpers) may pollute output with ANSI control characters.

## Executing Migrations

You can apply your new migration from the terminal:

::: code
```bash Plugin Migration
php craft migrate/up --plugin=my-plugin-handle
```
```bash Content Migration
php craft migrate/up
```
:::

To apply _all_ new migrations, across _all_ migration tracks, run `migrate/all`:

```bash
php craft migrate/all
```

Craft will also check for new plugin and content migrations on control panel requests.
App migrations must be applied before logging in; plugin and content migrations can be run later, by visiting <Journey path="Utilities, Migrations" />.

## Rollbacks and Compatibility

### Schema Version

Your primary plugin class should maintain a [`schemaVersion`](craft5:craft\base\PluginTrait::$schemaVersion) that reflects the last release in which a migration was introduced.
When Craft notices a new schema version for a plugin, it will present control panel users with the post-upgrade “migrations” screen.

Despite migrations being performed incrementally, they can result in incompatible schemas, from the currently-running code’s perspective.
Keep in mind that your users may be upgrading from _any_ prior version, particularly when using your own plugin’s APIs in a migration.
For example, using a custom [element type](element-types.md)’s [query class](element-types.md#element-query-class) in a migration can result in a selection that includes columns that haven’t been added to the table yet:

```php
class ProductQuery extends ElementQuery
{
    protected function beforePrepare(): bool
    {
        // JOIN our `products` table:
        $this->joinElementTable('products');

        // Always SELECT the `price` and `currency` columns...
        $this->query->select([
            'products.price',
            'products.currency',
        ]);

        // ...and add this column, only if it exists:
        if (Craft::$app->getDb()->columnExists(MyTables::PRODUCTS, 'weight')) {
            $this->query->addSelect([
                'products.weight',
                'products.weightUnit'
            ]);
        }

        // For performance, you can also test against schema versions that you know will contain those columns:
        $pluginInfo = Craft::$app->getPlugins()->getStoredPluginInfo('myplugin');

        if (version_compare($pluginInfo['schemaVersion'], '1.2.3', '>=')) {
            $this->query->addSelect([
                'products.width',
                'products.height',
                'products.depth',
            ]);
        }

        // ...
    }
}
```

::: warning
The new `schemaVersion` is only recorded after _all_ of its pending migrations have run, so a test like the one above (using `version_compare()`) may not accurately describe the state of the database.
When in doubt, explicitly check for the column’s existence.
:::

Queries built with <craft5:craft\db\Query> are typically immune to this issue, because the selections are controlled by the current migration (rather than application code).

### Minimum Versions

As a last resort, you can create a “breakpoint” in the upgrade process by setting a [`minVersionRequired`](craft5:craft\base\PluginTrait::$minVersionRequired) from which users can update.
This tends to be disruptive for developers, and means a routine upgrade must be handled across multiple deployments—even if they have applied your updates sequentially in a development environment, Craft won’t allow the jump between incompatible versions in secondary environments.

This “minimum version” also signals to Craft’s built-in updater what the latest compatible version is.
As with expired licenses, developers _can_ still directly install a more recent version via Composer—but they are apt to be met with an error as soon as plugins are loaded:

> You need to be on at least `My Plugin` 1.2.3 before you can update to `My Plugin` 1.4.0.

### Rolling Back

Another way to look at the `schemaVersion` is the farthest back a developer can expect to be able to _downgrade_ your packag, before encountering schema compatibility issues.

You may be able to provide additional support by thoroughly implementing `safeDown()` in each of your migrations.
Backtracking is handled similarly to normal upgrades; each migration’s `safeDown()` method is invoked in succession, and its record is deleted from the `migrations` table so it can be re-run.

```bash
php craft migrate/down
```

The `safeDown()` method must actually reverse changes from `safeUp()` for it to be undone (or redone) successfully.
If a migration tries to create a table or column that already exists, it will likely result in an error.

## Plugin Install Migrations

Plugins can have a special “Install” migration which handles the installation and uninstallation of the plugin.
_This is the only migration run during installation_, so it should establish your plugin’s complete database schema, in each release.
Your plugin’s other, incremental migrations are _not_ run during installation.

The special install migration should live at `migrations/Install.php`, alongside normal migrations, and follow this template:

```php{6}
<?php
namespace mynamespace\migrations;

use craft\db\Migration;

class Install extends Migration
{
    public function safeUp(): bool
    {
        // ...
    }

    public function safeDown(): bool
    {
        // ...
    }
}
```

You can give your plugin an install migration with the `migrate/create` command if you pass the migration name “`install`”:

```bash
php craft migrate/create install --plugin=my-plugin-handle
```

When a plugin has an install migration, its `safeUp()` method will be called when the plugin is installed, and its `safeDown()` method will be called when the plugin is uninstalled (invoked by the plugin’s [install()](<craft5:craft\base\Plugin::install()>) and [uninstall()](<craft5:craft\base\Plugin::uninstall()>) methods, respectively).

::: tip
It is _not_ a plugin’s responsibility to manage its row in the `plugins` database table. Craft takes care of that for you.
:::

### Setting Default Project Config Data

If you want to add things to the [project config](project-config.md) on install, either directly or via your plugin’s API, be sure to only do that if the incoming project config YAML doesn’t already have a record of your plugin.

```php
public function safeUp(): bool
{
    // ...

    // Don’t make the same config changes twice
    if (Craft::$app->projectConfig->get('plugins.my-plugin-handle', true) === null) {
        // Make the config changes here...
    }
}
```

That’s because there’s a chance that your plugin is being installed as part of a project config sync, and if its install migration were to make any project config changes of its own, they would overwrite all of the incoming project config YAML changes.

The reverse could be useful if you need to make changes when your plugin is uninstalled:

```php{6-14}
public function safeUp(): bool
{
    // ...
}

public function safeDown(): bool
{
    // ...

    // Don’t make the same config changes twice
    if (Craft::$app->projectConfig->get('plugins.my-plugin-handle', true) !== null) {
        // Make the config changes here...
    }
}
```
