# Configuration

The Craft module is configured through the `codeception.yml` file.

::: tip
The Craft module inherits all configuration options from the [Yii2 codeception module](https://codeception.com/for/yii). All its [configuration options](https://codeception.com/docs/modules/Yii2) are thus also available to use and not explained here.
:::

## Config options
### `projectConfig`

Accepts: Object

The `projectConfig` option instructs the Craft module if and how to set-up Project Config support for your tests. It accepts an object with the following parameters:

- **folder** (required): What folder the Project Config files must be copied from.\ Typically, this is `config/project` starting from the root of your project. The contents of that folder will be copied into `tests/_craft/config/project`.
- **reset**: Whether Project Config should be reset before each test is run.\ If enabled, Craft will reset the Project Config state to what is specified in the `folder` parameter. Can safely be disabled if you are not making changes to project config during your tests.

::: warning
If you are using Project Config for your tests, regular database-backed fixtures for Project Config data (i.e sections) may cause syncing issues. We recommended that you set up your environment using the Project Config support only.
:::

### `migrations`

Accepts: Array|Object

The `migrations` parameter accepts an Array of objects with the following parameters.

- **class** (required): The migration class.
- **params**: Any parameters that must be passed into the migration.

Migrations will be applied before any tests are run.

### `plugins`

Accepts: Array|Object

The `plugins` parameter accepts an Array of objects with the following parameters.

- **class** (required): [The main plugin class](../../extend/plugin-guide.md#the-plugin-class).
- **handle** (required): The plugin handle.

Plugins will be installed before any tests are run.

### `setupDb`

Accepts: Object

The `setupDb` parameter controls how the database is setup before tests. It accepts an object with the following parameters.

- **clean**: Whether all tables should be deleted before any tests.
- **setupCraft**: Whether the `Install.php` migration should be run before any tests.
- **applyMigrations**: Whether migrations stored in `CRAFT_MIGRATIONS_PATH` should be applied before any tests are run.

### `edition`
Accepts: int

Determines what edition Craft must be in when running your tests and what is returned when calling `Craft::$app->getEdition()`. If `projectConfig` is enabled, the `edition` property will be ignored. To set an edition you must define the desired edition in the `project.yml` instead.

## PHP Constants
Additionally, you will have to define several PHP Constants for the test suite to use. All of these constants must be defined in the `tests/_bootstrap.php`.

### `CRAFT_STORAGE_PATH`
The [storage path](../../directory-structure.md#storage) Craft can use during testing.

### `CRAFT_TEMPLATES_PATH`
The [templates path](../../directory-structure.md#templates) Craft can use during testing.

### `CRAFT_CONFIG_PATH`
The [config path](../../directory-structure.md#config) Craft can use during testing.

::: warning
If you’re testing an actual Craft site, this directory cannot be the config directory you use for the production site. Ensure it’s located within the `tests/_craft/` folder.
:::

### `CRAFT_MIGRATIONS_PATH`
The path to the folder where all your [migration](../../extend/migrations.md) classes are stored.

### `CRAFT_TRANSLATIONS_PATH`
The path to the folder where all your [translations](../../sites.md#static-message-translations) are stored.

### `CRAFT_VENDOR_PATH`
Path to the [vendor](../../directory-structure.md#vendor) directory.

