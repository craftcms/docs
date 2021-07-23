- - -
Craft は、Craft がどのようにデータベースへ接続するかを制御するためのいくつかのデータベース接続設定をサポートしています。
- - -
# データベース接続設定

Craft supports several database connection settings that give you control over how Craft connects to the database.

Ultimately, database connection settings must be set from  `config/db.php`, but we recommend you initially set them as environment variables (such as in your `.env` file), and then pull the environment variable value into `config/db.php` using [getenv()](https://php.net/manual/en/function.getenv.php).

`DB_` ではじまる変数はデータベース接続設定で、`config/db.php` の中から次のように取得します。

```bash
ENVIRONMENT="dev"
SECURITY_KEY=""
DB_DRIVER="mysql"
DB_SERVER="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_DATABASE=""
DB_SCHEMA="public"
DB_TABLE_PREFIX=""
DB_PORT=""
```

最終的に、データベース接続設定は `config/db.php` からセットしなければなりません。

```php
return [
    'driver' => getenv('DB_DRIVER'),
    'server' => getenv('DB_SERVER'),
    'user' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'database' => getenv('DB_DATABASE'),
    'schema' => getenv('DB_SCHEMA'),
    'tablePrefix' => getenv('DB_TABLE_PREFIX'),
    'port' => getenv('DB_PORT')
];
```

::: tip
環境変数 `DB_DSN` を指定することもできます。 定義されている場合、Craft はそれを使用します。 :::
:::

Craft がサポートするデータベース接続設定の完全なリストは、次の通りです。

1. 機密情報をプロジェクトのコードベースから守ります。 （`.env` ファイルは、共有したり Git にコミットするべきではありません。
2. それぞれの開発者が他者の設定を上書きすることなく独自の設定を定義できるため、他の開発者とのコラボレーションを容易にします。

PDO コンストラクタに渡す PDO 属性の key => value ペアの配列。

<!-- BEGIN SETTINGS -->

### `attributes`

Allowed types :
:   [array](https://php.net/language.types.array)

Default value :
:   `[]`

Defined by :
:   [DbConfig::$attributes](craft3:craft\config\DbConfig::$attributes)


例えば、MySQL PDO ドライバ（http://php.net/manual/en/ref.pdo-mysql.php）を使用する場合、（MySQL で SSL が利用できると仮定する https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html）SSL データベース接続で `'user'` が SSL 経由で接続できる場合、次のように設定します。

For example, when using the [MySQL PDO driver](https://php.net/manual/en/ref.pdo-mysql.php), if you wanted to enable a SSL database connection (assuming [SSL is enabled in MySQL](https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html) and `'user'` can connect via SSL, you’d set these:

```php
[
    PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
],
```



### `charset`

Allowed types :
:   [string](https://php.net/language.types.string)

Default value :
:   `'utf8'`

定義元 :
:   [DbConfig::$charset](craft3:craft\config\DbConfig::$charset)


選択するデータベースの名前。

::: tip
You can change the character set and collation across all existing database tables using this terminal command:

```bash
> php craft db/convert-charset
```
:::



### `collation`

Allowed types :
:   [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

デフォルト値 :
:   `null`

定義元 : :
:   [DbConfig::$collation](craft3:craft\config\DbConfig::$collation)

Since
:   3.6.4


DSN はドライバの接頭辞（`mysql:` または `pgsql:`）ではじまり、ドライバ固有のパラメータが続きます。 例えば `mysql:host=127.0.0.1;port=3306;dbname=acme_corp` のような形です。

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

許可される型 :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$dsn](craft3:craft\config\DbConfig::$dsn)


The Data Source Name (“DSN”) that tells Craft how to connect to the database.

DSNs should begin with a driver prefix (`mysql:` or `pgsql:`), followed by driver-specific parameters. For example, `mysql:host=127.0.0.1;port=3306;dbname=acme_corp`.

- MySQL のパラメータ：http://php.net/manual/en/ref.pdo-mysql.connection.php
- PostgreSQL のパラメータ：http://php.net/manual/en/ref.pdo-pgsql.connection.php



### `password`

許可される型 :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `''`

定義元 : :
:   [DbConfig::$password](craft3:craft\config\DbConfig::$password)


接続するデータベースのパスワード。



### `schema`

許可される型 : :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `'public'`

定義元 : :
:   [DbConfig::$schema](craft3:craft\config\DbConfig::$schema)


ホスティング環境によって提供された場合、データベースの接続 URL。



### `tablePrefix`

許可される型 : :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `''`

定義元 : :
:   [DbConfig::$tablePrefix](craft3:craft\config\DbConfig::$tablePrefix)


共有するCraft のインストールを単一のデータベース（MySQL）、または、単一のデータベースで共有スキーマ（PostgreSQL）を使用する場合、インストールごとにテーブル名の競合を避けるために、テーブル接頭辞をセットできます。 これは5文字以内、かつ、すべて小文字でなければなりません。



### `user`

許可される型 : :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `'root'`

定義元 : :
:   [DbConfig::$user](craft3:craft\config\DbConfig::$user)


接続するデータベースのユーザー名。



### `useUnbufferedConnections`

許可される型 : :
:   [boolean](https://php.net/language.types.boolean)

デフォルト値 : :
:   `false`

定義元 : :
:   [DbConfig::$useUnbufferedConnections](craft3:craft\config\DbConfig::$useUnbufferedConnections)

Since
:   3.7.0


Whether batched queries should be executed on a separate, unbuffered database connection.

This setting only applies to MySQL. It can be enabled when working with high volume content, to prevent PHP from running out of memory when querying too much data at once. (See <https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder#batch-query-mysql> for an explanation of MySQL’s batch query limitations.)



### `url`

許可される型 : :
:   [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$url](craft3:craft\config\DbConfig::$url)


The database connection URL, if one was provided by your hosting environment.

If this is set, the values for [driver](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#driver), [user](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#user), [database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database), [server](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#server), [port](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#port), and [database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database) will be extracted from it.



### `driver`

許可される型 : :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$driver](craft3:craft\config\DbConfig::$driver)


The database driver to use. Either 'mysql' for MySQL or 'pgsql' for PostgreSQL.



### `server`

許可される型 : :
:   [string](https://php.net/language.types.string)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$server](craft3:craft\config\DbConfig::$server)


The database server name or IP address. Usually `localhost` or `127.0.0.1`.



### `port`

許可される型 : :
:   [integer](https://php.net/language.types.integer)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$port](craft3:craft\config\DbConfig::$port)


The database server port. Defaults to 3306 for MySQL and 5432 for PostgreSQL.



### `unixSocket`

Allowed types
:   [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [DbConfig::$unixSocket](craft3:craft\config\DbConfig::$unixSocket)


MySQL only. If this is set, the CLI connection string (used for yiic) will connect to the Unix socket instead of the server and port. If this is specified, then `server` and `port` settings are ignored.



### `database`

Allowed types
:   [string](https://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$database](craft3:craft\config\DbConfig::$database)


The name of the database to select.

<!-- END SETTINGS -->