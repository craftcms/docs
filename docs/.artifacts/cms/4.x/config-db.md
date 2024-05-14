<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

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

Whether the [schema()](https://docs.craftcms.com/api/v4/craft-config-dbconfig.html#method-schema) should be explicitly used for database queries (PostgreSQL only).



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




<!-- END SETTINGS -->
