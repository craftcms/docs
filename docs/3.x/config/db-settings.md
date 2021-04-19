---
sidebarLevel: 3
---
# Database Connection Settings

Craft supports several database connection settings that give you control over how Craft connects to the database.

Ultimately, database connection settings must be set from  `config/db.php`, but we recommend you initially set them as environment variables (such as in your `.env` file), and then pull the environment variable value into `config/db.php` using [getenv()](http://php.net/manual/en/function.getenv.php).

For example, in a new Craft 3 project, your `.env` file should define these environment variables:

```bash
ENVIRONMENT="dev"
SECURITY_KEY=""
DB_DRIVER="mysql"
DB_SERVER="<host>"
DB_PORT="<port>"
DB_DATABASE="<dbname>"
DB_USER="root"
DB_PASSWORD=""
DB_SCHEMA="public"
DB_TABLE_PREFIX=""
```

The variables that start with `DB_` are database connection settings, and they get pulled into `config/db.php` like this:

```php
return [
    'driver' => getenv('DB_DRIVER'),
    'server' => getenv('DB_SERVER'),
    'port' => getenv('DB_PORT'),
    'database' => getenv('DB_DATABASE'),
    'user' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'schema' => getenv('DB_SCHEMA'),
    'tablePrefix' => getenv('DB_TABLE_PREFIX'),
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

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [DbConfig::$attributes](craft3:craft\config\DbConfig::$attributes)



An array of key => value pairs of PDO attributes to pass into the PDO constructor.

For example, when using the [MySQL PDO driver](http://php.net/manual/en/ref.pdo-mysql.php), if you wanted to enable a SSL database connection
(assuming [SSL is enabled in MySQL](https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html) and `'user'` can connect via SSL,
you’d set these:

```php
[
    PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
],
```



### `charset`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'utf8'`

Defined by
:   [DbConfig::$charset](craft3:craft\config\DbConfig::$charset)



The charset to use when creating tables.

::: tip
You can change the character set and collation across all existing database tables using this terminal command:

```bash
> php craft db/convert-charset
```
:::



### `collation`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [DbConfig::$collation](craft3:craft\config\DbConfig::$collation)

Since
:   3.6.4



The collation to use when creating tables.

This is only used by MySQL. If null, the [charset’s](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#charset) default collation will be used.

| Charset   | Default collation    |
| --------- | -------------------- |
| `utf8`    | `utf8_general_ci`    |
| `utf8mb4` | `utf8mb4_0900_ai_ci` |

::: tip
You can change the character set and collation across all existing database tables using this terminal command:

```bash
> php craft db/convert-charset
```
:::



### `dsn`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$dsn](craft3:craft\config\DbConfig::$dsn)



The Data Source Name (“DSN”) that tells Craft how to connect to the database.

DSNs should begin with a driver prefix (`mysql:` or `pgsql:`), followed by driver-specific parameters.
For example, `mysql:host=127.0.0.1;port=3306;dbname=acme_corp`.

- MySQL parameters: <https://php.net/manual/en/ref.pdo-mysql.connection.php>
- PostgreSQL parameters: <https://php.net/manual/en/ref.pdo-pgsql.connection.php>



### `password`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [DbConfig::$password](craft3:craft\config\DbConfig::$password)



The database password to connect with.



### `schema`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'public'`

Defined by
:   [DbConfig::$schema](craft3:craft\config\DbConfig::$schema)



The schema that Postgres is configured to use by default (PostgreSQL only).



### `tablePrefix`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [DbConfig::$tablePrefix](craft3:craft\config\DbConfig::$tablePrefix)



If you’re sharing Craft installs in a single database (MySQL) or a single database and using a shared schema (PostgreSQL),
you can set a table prefix here to avoid per-install table naming conflicts. This can be no more than 5 characters, and must be all lowercase.



### `user`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'root'`

Defined by
:   [DbConfig::$user](craft3:craft\config\DbConfig::$user)



The database username to connect with.



### `url`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [DbConfig::$url](craft3:craft\config\DbConfig::$url)



The database connection URL, if one was provided by your hosting environment.

If this is set, the values for [driver](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#driver), [user](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#user), [database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database), [server](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#server), [port](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#port), and [database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database) will be extracted from it.



### `driver`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$driver](craft3:craft\config\DbConfig::$driver)



The database driver to use. Either 'mysql' for MySQL or 'pgsql' for PostgreSQL.



### `server`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$server](craft3:craft\config\DbConfig::$server)



The database server name or IP address. Usually `localhost` or `127.0.0.1`.



### `port`

Allowed types
:   [integer](http://php.net/language.types.integer)

Default value
:   `null`

Defined by
:   [DbConfig::$port](craft3:craft\config\DbConfig::$port)



The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.



### `unixSocket`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [DbConfig::$unixSocket](craft3:craft\config\DbConfig::$unixSocket)



MySQL only. If this is set, the CLI connection string (used for yiic) will connect to the Unix socket instead of
the server and port. If this is specified, then `server` and `port` settings are ignored.



### `database`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$database](craft3:craft\config\DbConfig::$database)



The name of the database to select.




<!-- END SETTINGS -->