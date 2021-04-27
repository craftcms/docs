- - -
Craft は、Craft がどのようにデータベースへ接続するかを制御するためのいくつかのデータベース接続設定をサポートしています。
- - -
# データベース接続設定

Craft supports several database connection settings that give you control over how Craft connects to the database.

例えば、新しい Craft 3 プロジェクト内の `.env` ファイルでは、次の環境変数を定義する必要があります。

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
:   [array](http://php.net/language.types.array)

Default value :
:   `[]`

Defined by :
:   [DbConfig::$attributes](craft3:craft\config\DbConfig::$attributes)



例えば、MySQL PDO ドライバ（http://php.net/manual/en/ref.pdo-mysql.php）を使用する場合、（MySQL で SSL が利用できると仮定する https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html）SSL データベース接続で `'user'` が SSL 経由で接続できる場合、次のように設定します。

テーブルを作成する際に使用する文字セット。

```php
[
    PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
],
```



### `charset`

Allowed types :
:   [string](http://php.net/language.types.string)

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
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

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
:   [string](http://php.net/language.types.string)

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
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `''`

定義元 : :
:   [DbConfig::$password](craft3:craft\config\DbConfig::$password)



接続するデータベースのパスワード。



### `schema`

許可される型 : :
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `'public'`

定義元 : :
:   [DbConfig::$schema](craft3:craft\config\DbConfig::$schema)



ホスティング環境によって提供された場合、データベースの接続 URL。



### `tablePrefix`

許可される型 : :
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `''`

定義元 : :
:   [DbConfig::$tablePrefix](craft3:craft\config\DbConfig::$tablePrefix)



共有するCraft のインストールを単一のデータベース（MySQL）、または、単一のデータベースで共有スキーマ（PostgreSQL）を使用する場合、インストールごとにテーブル名の競合を避けるために、テーブル接頭辞をセットできます。 これは5文字以内、かつ、すべて小文字でなければなりません。



### `user`

許可される型 : :
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `'root'`

定義元 : :
:   [DbConfig::$user](craft3:craft\config\DbConfig::$user)



接続するデータベースのユーザー名。



### `url`

許可される型 : :
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$url](craft3:craft\config\DbConfig::$url)



The database connection URL, if one was provided by your hosting environment.

これがセットされている場合、[driver](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#driver)、[user](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#user)、[database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database)、[server](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#server)、 [port](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#port)、および、[database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database) の値は、そこから抽出されます。



### `driver`

許可される型 : :
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$driver](craft3:craft\config\DbConfig::$driver)



使用するデータベースのドライバ。 MySQL 向けの 'mysql'、または、PostgreSQL 向けの 'pgsql'。



### `server`

許可される型 : :
:   [string](http://php.net/language.types.string)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$server](craft3:craft\config\DbConfig::$server)



データベースのサーバー名、または、IP アドレス。 Usually `localhost` or `127.0.0.1`.



### `port`

許可される型 : :
:   [integer](http://php.net/language.types.integer)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$port](craft3:craft\config\DbConfig::$port)



データベースサーバーのポート。 デフォルトは、MySQL 向けの 3306、および、PostgreSQL 向けの 5432。



### `unixSocket`

許可される型 : :
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 : :
:   `null`

定義元 : :
:   [DbConfig::$unixSocket](craft3:craft\config\DbConfig::$unixSocket)



MySQL のみ。 セットされている場合、（yiic で使用される）CLI 接続文字列は、 サーバーやポートの代わりに Unix ソケットに接続します。 これを指定すると、'server' と 'port' 設定が無視されます。



### `database`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [DbConfig::$database](craft3:craft\config\DbConfig::$database)



The name of the database to select.




<!-- END SETTINGS -->