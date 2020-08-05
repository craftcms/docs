# データベース接続設定

Craft は、Craft がどのようにデータベースへ接続するかを制御するためのいくつかのデータベース接続設定をサポートしています。

最終的に、データベース接続設定は `config/db.php` からセットしなければなりません。 しかし、最初に（`.env` ファイルのような）環境変数としてセットしてから、`config/db.php` 内で [getenv()](http://php.net/manual/en/function.getenv.php) を使用して環境変数の値を取得することを推奨します。

例えば、新しい Craft 3 プロジェクト内の `.env` ファイルでは、次の環境変数を定義する必要があります。

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

`DB_` ではじまる変数はデータベース接続設定で、`config/db.php` の中から次のように取得します。

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
You may also provide a `DB_DSN` environment variable. If defined, Craft will use that.
:::

Craft がサポートするデータベース接続設定の完全なリストは、次の通りです。

1. 機密情報をプロジェクトのコードベースから守ります。 （`.env` ファイルは、共有したり Git にコミットするべきではありません。
2. それぞれの開発者が他者の設定を上書きすることなく独自の設定を定義できるため、他の開発者とのコラボレーションを容易にします。

許可される型 :

<!-- BEGIN SETTINGS -->

### `attributes`

許可される型 :
:

[array](http://php.net/language.types.array)

デフォルト値 :
:

`[]`

定義元 :
:

[DbConfig::$attributes](craft3:craft\config\DbConfig::$attributes)



An array of key => value pairs of PDO attributes to pass into the PDO constructor.

デフォルト値 :

```php
[
    PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
],
```



### `charset`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'utf8'`

定義元 :
:

[DbConfig::$charset](craft3:craft\config\DbConfig::$charset)



The charset to use when creating tables.



### `database`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$database](craft3:craft\config\DbConfig::$database)



定義元 :



### `driver`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$driver](craft3:craft\config\DbConfig::$driver)



使用するデータベースのドライバ。 MySQL 向けの 'mysql'、または、PostgreSQL 向けの 'pgsql'。



### `dsn`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$dsn](craft3:craft\config\DbConfig::$dsn)



PDO コンストラクタに渡す PDO 属性の key => value ペアの配列。

DSNs should begin with a driver prefix (`mysql:` or `pgsql:`), followed by driver-specific parameters. For example, `mysql:host=127.0.0.1;port=3306;dbname=acme_corp`.

- MySQL: http://php.net/manual/en/ref.pdo-mysql.connection.php
- PostgreSQL: http://php.net/manual/en/ref.pdo-pgsql.connection.php これを設定すると、コンフィグ設定の [server](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#server)、[port](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#port)、[user](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#user)、[password](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#password)、[database](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#database)、[driver](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#driver)、および、[unixSocket](https://docs.craftcms.com/api/v3/craft-config-dbconfig.html#unixsocket) は無視されます。



### `password`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`''`

定義元 :
:

[DbConfig::$password](craft3:craft\config\DbConfig::$password)



許可される型 :



### `port`

許可される型 :
:

[integer](http://php.net/language.types.integer)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$port](craft3:craft\config\DbConfig::$port)



データベースサーバーのポート。 デフォルトは、MySQL 向けの 3306、および、PostgreSQL 向けの 5432。



### `schema`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`'public'`

定義元 :
:

[DbConfig::$schema](craft3:craft\config\DbConfig::$schema)



デフォルト値 :



### `server`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$server](craft3:craft\config\DbConfig::$server)



データベースのサーバー名、または、IP アドレス。 通常は 'localhost' または '127.0.0.1' です。



### `tablePrefix`

許可される型 :
:

[string](http://php.net/language.types.string)

デフォルト値 :
:

`''`

定義元 :
:

[DbConfig::$tablePrefix](craft3:craft\config\DbConfig::$tablePrefix)



共有するCraft のインストールを単一のデータベース（MySQL）、または、単一のデータベースで共有スキーマ（PostgreSQL）を使用する場合、インストールごとにテーブル名の競合を避けるために、テーブル接頭辞をセットできます。 これは5文字以内、かつ、すべて小文字でなければなりません。



### `unixSocket`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値 :
:

`null`

定義元 :
:

[DbConfig::$unixSocket](craft3:craft\config\DbConfig::$unixSocket)



MySQL のみ。 セットされている場合、（yiic で使用される）CLI 接続文字列は、 サーバーやポートの代わりに Unix ソケットに接続します。 これを指定すると、'server' と 'port' 設定が無視されます。



### `url`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:

`null`

定義元 :
:

[DbConfig::$url](craft3:craft\config\DbConfig::$url)



テーブルを作成する際に使用する文字セット。

許可される型 :



### `user`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'root'`

Defined by
:

[DbConfig::$user](craft3:craft\config\DbConfig::$user)



接続するデータベースのユーザー名。




<!-- END SETTINGS -->
