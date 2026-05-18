# Migrations

As with any major plugin version jump, we recommend bringing your `Install` migration up-to-date with the expected state of your database, then culling all other incremental migrations.

::: warning
Once you switch your plugin’s base class to `CraftCms\Cms\Plugin\Plugin`, the adapter assumes your migrations no longer need shims for legacy features, and only native Laravel migrations will work.
:::

## Adding Migrations

Laravel’s `make` command can generate migrations for the host application (in the project’s top-level `database/migrations/` directory), but is not yet plugin-aware:

```bash
ddev artisan make:migration
```

You can safely relocate the generated file, as it will have no class name or namespace.
As long as it has a name that is unique and in the expected order, it can be moved into your plugin’s top-level `database/migrations/` directory.

The stub will look something like this:

```php{5}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
```

Migrations’ `up()` and `down()` methods should not return anything.
Exceptions should be allowed to bubble out of either method, so that Laravel knows whether it ran successfully.

::: warning
If the host application you are using for [local development](local-dev.md) has [customized stubs](laravel:artisan#stub-customization), the output may be different.
:::

Most of your migrations’ substance will involve calling the `Schema` facade (highlighted in the stub, above) and the database-agnostic `Illuminate\Database\Schema\Blueprint` builder available in its callbacks:

```php
// Create a new table:
Schema::create('my_table', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('handle');
});

// Modify a column:
Schema::table('my_table', function (Blueprint $table) {
    $table->string('name', 256)->change();
});

// Add a key or index:
Schema::table('my_table', function (Blueprint $table) {
    $table->string('handle')->unique();
});
```

::: tip
Blueprints always operate on a single table, and collect commands that are then built into one or more statements.
Laravel executes each blueprint all at once, but echoes individual actions to the console as they’re sent to the database.
:::

Laravel has comprehensive [documentation](laravel:migrations) for creating and modifying tables.
The [supported column types](laravel:migrations#available-column-types) should be comparable to Yii, but they may be named or described differently, or require different [modifiers](laravel:migrations#column-modifiers) to achieve the same results.

## Driver Differences

Most inconsistencies between database drivers should be smoothed over by the schema builder.
If you must handle schema creation (or queries) differently, test against the current driver name:

```php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Query\Expression;

Schema::create('myplugin_bundles', function (Blueprint $table) {
    $table->integer('primarySku')->notNull();

    tap($table->json('skus'), function (ColumnDefinition $column) {
        match (DB::connection()->getDriverName()) {
            'mysql' => $column->default(new Expression('...')),
            'pgsql' => $column->default(new Expression('...')),
        };
    });
});
```

## Install Migrations

If your plugin has a migration named `Install`, its `up()` method will run when installed.
When uninstalled, that migration’s `down()` method is called.

Your `Install` migration should always represent the current expected state of the database, and it should be capable of completely removing that schema when uninstalled.

## Events

Laravel emits a number of [events](laravel:migrations#events) as migrations are run.
These replace Craft’s <craft5:craft\db\Migration::EVENT_AFTER_UP> and <craft5:craft\db\Migration::EVENT_AFTER_DOWN> events.

## Publishable Migrations

If your plugin has optional migrations (like unique database tables for logs from each of a large number of supported third-party integrations), you can offer them to the application as a [publishable migration](laravel:packages#migrations):

```php
public function bootPlugin(): void
{
    $this->publishesMigrations([
        __DIR__.'/../database/publishable-migrations' => database_path('migrations'),
    ]);
}
```

::: danger
Don’t publish all of your plugin’s regular migrations!
Craft can discover and track those, automatically.
If they get published into the application’s migrations, they could be run again.
:::

Some downstream Laravel packages may already do this—for example, a Craft plugin that wrapped [Cashier](laravel:billing) would _not_ need to publish or replicate the migrations that are already provided by the package.
