---
sidebarLevel: 3
---
# Database Connection Settings

Craft supports several database connection settings that give you control over how Craft connects to the database.

Database connection settings may be set from `config/db.php`, but we recommend using environment variables (such as in your `.env` file).

For example, in [a new Craft 4 project](https://github.com/craftcms/craft), your `.env` file should define these environment variables:

```bash
CRAFT_APP_ID=
CRAFT_ENVIRONMENT=dev
CRAFT_SECURITY_KEY=
CRAFT_DB_DRIVER=mysql
CRAFT_DB_SERVER=127.0.0.1
CRAFT_DB_PORT=3306
CRAFT_DB_DATABASE=
CRAFT_DB_USER=root
CRAFT_DB_PASSWORD=
CRAFT_DB_SCHEMA=public
CRAFT_DB_TABLE_PREFIX=
```

The `DB_` variables are database connection settings, and the `CRAFT_` prefix is a special convention for overriding any config setting—meaning you don’t need to use a `config/db.php` file in Craft 4.

If you wanted to use your own environment variables in a static config file, you could create a `config/db.php` to return an array of settings (defined below), using the thread-safe [App::env()](craft4:craft\helpers\App::env()) to get the value of each environment variable:

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

::: tip
You may also provide a `DB_DSN` environment variable. If defined, Craft will use that.
:::

We recommend this environment variable approach for two reasons:

1. It keeps sensitive information out of your project’s codebase. (`.env` files should never be shared or committed to Git.)
2. It makes collaborating with other developers easier, as each developer can define their own settings without overwriting someone else’s settings.

Here’s the full list of database connection settings that Craft supports:

<!-- BEGIN SETTINGS -->

### `attributes`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array)

Default value
:  `[]`

Defined by
:  [DbConfig::$attributes](craft4:craft\config\DbConfig::$attributes)

</div>

An array of key-value pairs of PDO attributes to pass into the PDO constructor.

For example, when using the [MySQL PDO driver](https://php.net/manual/en/ref.pdo-mysql.php), if you wanted to enable a SSL database connection
(assuming [SSL is enabled in MySQL](https://dev.mysql.com/doc/mysql-secure-deployment-guide/5.7/en/secure-deployment-secure-connections.html) and `'user'` can connect via SSL,
you’d set these:

```php
'attributes' => [
    PDO::MYSQL_ATTR_SSL_KEY => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA => '/path/to/my/ca-cert.pem',
],
```



### `charset`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'utf8'`

Defined by
:  [DbConfig::$charset](craft4:craft\config\DbConfig::$charset)

</div>

The charset to use when creating tables.

::: tip
You can change the character set and collation across all existing database tables using this terminal command:

```bash
php craft db/convert-charset
```
:::

::: code
```php Static Config
'charset' => 'utf8mb4',
```
```shell Environment Override
CRAFT_DB_CHARSET=utf8mb4
```
:::



### `collation`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$collation](craft4:craft\config\DbConfig::$collation)

Since
:  3.6.4

</div>

The collation to use when creating tables.

This is only used by MySQL. If null, the [charset’s](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#charset) default collation will be used.

| Charset   | Default collation    |
| --------- | -------------------- |
| `utf8`    | `utf8_general_ci`    |
| `utf8mb4` | `utf8mb4_0900_ai_ci` |

::: tip
You can change the character set and collation across all existing database tables using this terminal command:

```bash
php craft db/convert-charset
```
:::

::: code
```php Static Config
'collation' => 'utf8mb4_0900_ai_ci',
```
```shell Environment Override
CRAFT_DB_COLLATION=utf8mb4_0900_ai_ci
```
:::



### `database`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$database](craft4:craft\config\DbConfig::$database)

</div>

The name of the database to select.

::: code
```php Static Config
'database' => 'mydatabase',
```
```shell Environment Override
CRAFT_DB_DATABASE=mydatabase
```
:::



### `driver`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$driver](craft4:craft\config\DbConfig::$driver)

</div>

The database driver to use. Either `mysql` for MySQL or `pgsql` for PostgreSQL.

::: code
```php Static Config
'driver' => 'mysql',
```
```shell Environment Override
CRAFT_DB_DRIVER=mysql
```
:::



### `dsn`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$dsn](craft4:craft\config\DbConfig::$dsn)

</div>

The Data Source Name (“DSN”) that tells Craft how to connect to the database.

DSNs should begin with a driver prefix (`mysql:` or `pgsql:`), followed by driver-specific parameters.
For example, `mysql:host=127.0.0.1;port=3306;dbname=acme_corp`.

- MySQL parameters: <https://php.net/manual/en/ref.pdo-mysql.connection.php>
- PostgreSQL parameters: <https://php.net/manual/en/ref.pdo-pgsql.connection.php>

::: code
```php Static Config
'dsn' => 'mysql:host=127.0.0.1;port=3306;dbname=acme_corp',
```
```shell Environment Override
CRAFT_DB_DSN=mysql:host=127.0.0.1;port=3306;dbname=acme_corp
```
:::



### `password`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [DbConfig::$password](craft4:craft\config\DbConfig::$password)

</div>

The database password to connect with.

::: code
```php Static Config
'password' => 'super-secret',
```
```shell Environment Override
CRAFT_DB_PASSWORD=super-secret
```
:::



### `port`

<div class="compact">

Allowed types
:  [integer](https://php.net/language.types.integer), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$port](craft4:craft\config\DbConfig::$port)

</div>

The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.

::: code
```php Static Config
'port' => 3306,
```
```shell Environment Override
CRAFT_DB_PORT=3306
```
:::



### `schema`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `'public'`

Defined by
:  [DbConfig::$schema](craft4:craft\config\DbConfig::$schema)

</div>

The schema that Postgres is configured to use by default (PostgreSQL only).

::: tip
To force Craft to use the specified schema regardless of PostgreSQL’s `search_path` setting, you must enable
the [setSchemaOnConnect()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-setschemaonconnect) setting.
:::

::: code
```php Static Config
'schema' => 'myschema,public',
```
```shell Environment Override
CRAFT_DB_SCHEMA=myschema,public
```
:::



### `server`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$server](craft4:craft\config\DbConfig::$server)

</div>

The database server name or IP address. Usually `localhost` or `127.0.0.1`.

::: code
```php Static Config
'server' => 'localhost',
```
```shell Environment Override
CRAFT_DB_SERVER=localhost
```
:::



### `setSchemaOnConnect`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [DbConfig::$setSchemaOnConnect](craft4:craft\config\DbConfig::$setSchemaOnConnect)

Since
:  3.7.27

</div>

Whether the [schema()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-schema) should be explicitly used for database queries (PostgreSQL only).

::: warning
This will cause an extra `SET search_path` SQL query to be executed per database connection. Ideally,
PostgreSQL’s `search_path` setting should be configured to prioritize the desired schema.
:::

::: code
```php Static Config
'setSchemaOnConnect' => true,
```
```shell Environment Override
CRAFT_DB_SET_SCHEMA_ON_CONNECT=true
```
:::



### `tablePrefix`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$tablePrefix](craft4:craft\config\DbConfig::$tablePrefix)

</div>

If you’re sharing Craft installs in a single database (MySQL) or a single database and using a shared schema (PostgreSQL),
you can set a table prefix here to avoid per-install table naming conflicts. This can be no more than 5 characters, and must be all lowercase.

::: code
```php Static Config
'tablePrefix' => 'craft_',
```
```shell Environment Override
CRAFT_DB_TABLE_PREFIX=craft_
```
:::



### `unixSocket`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$unixSocket](craft4:craft\config\DbConfig::$unixSocket)

</div>

MySQL only. If this is set, the CLI connection string (used for yiic) will connect to the Unix socket instead of
the server and port. If this is specified, then `server` and `port` settings are ignored.

::: code
```php Static Config
'unixSocket' => '/Applications/MAMP/tmp/mysql/mysql.sock',
```
```shell Environment Override
CRAFT_DB_UNIX_SOCKET=/Applications/MAMP/tmp/mysql/mysql.sock
```
:::



### `url`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [DbConfig::$url](craft4:craft\config\DbConfig::$url)

</div>

The database connection URL, if one was provided by your hosting environment.

If this is set, the values for [driver()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-driver), [user()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-user), [database()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-database), [server()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-server), [port()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-port), and [database()](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#method-database) will be extracted from it.

::: code
```php Static Config
'url' => 'jdbc:mysql://database.foo:3306/mydb',
```
```shell Environment Override
CRAFT_DB_URL=jdbc:mysql://database.foo:3306/mydb
```
:::



### `useUnbufferedConnections`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [DbConfig::$useUnbufferedConnections](craft4:craft\config\DbConfig::$useUnbufferedConnections)

Since
:  3.7.0

</div>

Whether batched queries should be executed on a separate, unbuffered database connection.

This setting only applies to MySQL. It can be enabled when working with high volume content, to prevent
PHP from running out of memory when querying too much data at once. (See
<https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder#batch-query-mysql> for an explanation
of MySQL’s batch query limitations.)

For more on Craft batch queries, see <https://craftcms.com/knowledge-base/query-batching-batch-each>.

::: code
```php Static Config
'useUnbufferedConnections' => true,
```
```shell Environment Override
CRAFT_DB_USE_UNBUFFERED_CONNECTIONS=true
```
:::



### `user`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'root'`

Defined by
:  [DbConfig::$user](craft4:craft\config\DbConfig::$user)

</div>

The database username to connect with.

::: code
```php Static Config
'user' => 'db',
```
```shell Environment Override
CRAFT_DB_USER=db
```
:::




<!-- END SETTINGS -->