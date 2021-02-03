# Migrations

Migrations are PHP classes that make one-time changes to the system.

For the most part, migrations in Craft work similarly to [Yii’s implementation](https://www.yiiframework.com/doc/guide/2.0/en/db-migrations), but unlike Yii, Craft manages three different types of migrations:

- **App migrations** – Craft’s own internal migrations.
- **Plugin migrations** – Each installed plugin has its own migration track.
- **Content migrations** – Your Craft project itself can have migrations, too.

## Creating Migrations

::: tip
If your Craft install is running from a Vagrant box, you will need to SSH into the box to run these commands.
:::

To create a new migration for your plugin or project, open up your terminal and go to your Craft project:

```bash
cd /path/to/project
```

Then run the following command to generate a new migration file for your plugin or project:

::: code

```bash Plugin Migration
php craft migrate/create my_migration_name --plugin=my-plugin-handle
```

```bash Content Migration
php craft migrate/create my_migration_name
```

:::

Enter `yes` at the prompt, and a new migration file will be created for you. You can find it at the file path output by the command.

If this is a plugin migration, increase your plugin’s [schema version](craft3:craft\base\PluginTrait::$schemaVersion), so Craft knows to check for new plugin migrations as people update to your new version.

### What Goes Inside

Migration classes contain methods: [safeUp()](<yii2:yii\db\Migration::safeUp()>) and [safeDown()](<yii2:yii\db\Migration::safeDown()>). `safeUp()` is run when your migration is _applied_, and `safeDown()` is run when your migration is _reverted_.

::: tip
You can usually ignore the `safeDown()` method, as Craft doesn’t have a way to revert migrations from the control panel.
:::

You have full access to [Craft’s API](https://docs.craftcms.com/api/v3/) from your `safeUp()` method, but plugin migrations should try to avoid calling the plugin’s own API here. As your plugin’s database schema changes over time, so will your API’s assumptions about the schema. If an old migration calls a service method that relies on database changes that haven’t been applied yet, it will result in a SQL error. So in general you should execute all SQL queries directly from your own migration class. It may feel like you’re duplicating code, but it will be more future-proof.

### Manipulating Database Data

Your migration class extends <craft3:craft\db\Migration>, which provides several methods for working with the database. It’s better to use these than their <craft3:craft\db\Command> counterparts, because the migration methods are both simpler to use, and they’ll output a status message to the terminal for you.

```php
// Bad:
$this->db->createCommand()
    ->insert('{{%mytablename}}', $rows)
    ->execute();

// Good:
$this->insert('{{%mytablename}}', $rows);
```

<craft3:craft\helpers\MigrationHelper> provides several helpful methods as well:

- [dropForeignKeyIfExists()](craft3:craft\helpers\MigrationHelper::dropForeignKeyIfExists()) removes a foreign key if it exists, without needing to know its exact name.
- [dropIndexIfExists()](craft3:craft\helpers\MigrationHelper::dropIndexIfExists()) removes an index if it exists, without needing to know its exact name.
- [dropTable()](craft3:craft\helpers\MigrationHelper::dropTable()) drops a table, along with any foreign keys that reference it (some of which your plugin might not even be aware of).

::: warning
The <yii2:yii\db\Migration::insert()>, [batchInsert()](<craft3:craft\db\Migration::batchInsert()>), and [update()](<yii2:yii\db\Migration::update()>) migration methods will automatically insert/update data in the `dateCreated`, `dateUpdated`, `uid` table columns in addition to whatever you specified in the `$columns` argument. If the table you’re working with does’t have those columns, make sure you pass `false` to the `$includeAuditColumns` argument so you don’t get a SQL error.
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

### Logging

If you want to log messages in your migration code, echo it out rather than calling [Craft::info()](<yii2:yii\BaseYii::info()>):

```php
echo "    > some note\n";
```

If the migration is being run from a console request, this will ensure the message is seen by whoever is executing the migration, as the message will be output into the terminal. If it’s a web request, Craft will capture it and log it to `storage/logs/` just as if you had used `Craft::info()`.

## Executing Migrations

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

## Plugin Install Migrations

Plugins can have a special “Install” migration which handles the installation and uninstallation of the plugin. Install migrations live at `migrations/Install.php` alongside normal migrations. They should follow this template:

```php
<?php
namespace mynamespace\migrations;

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

When a plugin has an Install migration, its `safeUp()` method will be called when the plugin is installed, and its `safeDown()` method will be called when the plugin is uninstalled (invoked by the plugin’s [install()](<craft3:craft\base\Plugin::install()>) and [uninstall()](<craft3:craft\base\Plugin::uninstall()>) methods).

::: tip
It is _not_ a plugin’s responsibility to manage its row in the `plugins` database table. Craft takes care of that for you.
:::

### Setting Default Project Config Data

If you want to add things to the [project config](project-config.md) on install, either directly or via your plugin’s API, be sure to only do that if the incoming project config YAML doesn’t already have a record of your plugin.

```php
public function safeUp()
{
    // ...

    // Don’t make the same config changes twice
    if (Craft::$app->projectConfig->get('plugins.my-plugin-handle', true) === null) {
        // Make the config changes here...
    }
}
```

That’s because there’s a chance that your plugin is being installed as part of a project config sync, and if its install migration were to make any project config changes of its own, they would overwrite all of the incoming project config YAML changes.
