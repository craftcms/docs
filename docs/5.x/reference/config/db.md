---
containsGeneratedContent: yes
sidebarLevel: 3
description: Craft supports a wide array of connection settings for MySQL and Postgres databases.
related:
  - uri: ../../configure.md
    label: Configuring Craft
  - uri: ../../system/directory-structure.md
    label: Directory Structure
---

# Database Connection Settings

Craft can connect to MySQL and Postgres databases.

Database connection settings may be set from a `config/db.php` file, but because they’re often entirely environment-specific, Craft supports assigning [directly from environment variables](../config#environment-overrides). In [a new Craft 4 project](https://github.com/craftcms/craft), your `.env` file will need to define these options:

```bash
# Required variables:
CRAFT_APP_ID=
CRAFT_ENVIRONMENT=dev
CRAFT_SECURITY_KEY=

# Database-specific variables:
CRAFT_DB_DRIVER=mysql
CRAFT_DB_SERVER=127.0.0.1
CRAFT_DB_PORT=3306
CRAFT_DB_DATABASE=
CRAFT_DB_USER=root
CRAFT_DB_PASSWORD=
CRAFT_DB_SCHEMA=public
CRAFT_DB_TABLE_PREFIX=
```

We recommend this approach because it:

1. Keeps sensitive information out of your project’s codebase (`.env` files should never be shared or committed to version control);
2. Makes collaborating with other developers easier, as each developer can define their own settings from scratch, without overwriting someone else’s settings.

::: tip
Environment overrides are covered in greater detail on the [configuration overview page](../config#environment-overrides).
:::

If you need to use your own environment variables in a config file (or connection details are provided via platform-specific keys), create `config/db.php` and return an explicit array of settings:

```php
use craft\helpers\App;

return [
    'driver' => App::env('MY_DB_DRIVER'),
    'server' => App::env('MY_DB_SERVER'),
    'port' => App::env('MY_DB_PORT'),
    'database' => App::env('MY_DB_DATABASE'),
    'user' => App::env('MY_DB_USER'),
    'password' => App::env('MY_DB_PASSWORD'),
    'schema' => App::env('MY_DB_SCHEMA'),
    'tablePrefix' => App::env('MY_DB_TABLE_PREFIX'),
];
```

::: warning
Finer-grain control of Craft’s database connection is possible by configuring the underlying [`db` application component](./app.md#database). This may be necessary if you have specific security requirements, or your app needs to connect to multiple databases.
:::

## Supported Settings

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/5.x/config-db.md)!!!
