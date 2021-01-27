# サーバー要件

::: tip
[Craft Server Check](https://github.com/craftcms/server-check) スクリプトを使うことで、サーバーが Craft の要件を満たしているかどうかを素早く確認できます。
:::

<columns>
<column>

## Minimum System Specs

- PHP 7.2.5+
- MySQL 5.5+ with InnoDB, MariaDB 5.5+, or PostgreSQL 9.5+
- 256MB+ memory allocated to PHP
- 200MB+ free disk space

</column>
<column>

## Recommended System Specs

- PHP 7.4*
- MySQL 5.7+ with InnoDB, MariaDB 10.5+, or PostgreSQL 10+
- 512MB+ of memory allocated to PHP
- 200MB+ of free disk space
- [Composer 1.3+](installation.md#downloading-with-composer) if installing Craft via Composer

</column>
</columns>

<b>*</b> Craft supports PHP 8, but it may not be fully supported by all plugins yet.

## 必要な PHP エクステンション

* [ctype](https://secure.php.net/manual/en/book.ctype.php)
* [cURL](http://php.net/manual/en/book.curl.php)
* [GD](http://php.net/manual/en/book.image.php) or [ImageMagick](http://php.net/manual/en/book.imagick.php)
* [iconv](http://php.net/manual/en/book.iconv.php)
* [JSON](http://php.net/manual/en/book.json.php)
* [Multibyte String](http://php.net/manual/en/book.mbstring.php)
* [OpenSSL](http://php.net/manual/en/book.openssl.php)
* [PCRE](http://php.net/manual/en/book.pcre.php)
* [PDO MySQL Driver](http://php.net/manual/en/ref.pdo-mysql.php) or [PDO PostgreSQL Driver](http://php.net/manual/en/ref.pdo-pgsql.php)
* [PDO](http://php.net/manual/en/book.pdo.php)
* [Reflection](http://php.net/manual/en/class.reflectionextension.php)
* [SPL](http://php.net/manual/en/book.spl.php)
* [Zip](http://php.net/manual/en/book.zip.php)
* [DOM](http://php.net/manual/en/book.dom.php)

We recommend ImageMagick for expanded image handling options and the [Intl](http://php.net/manual/en/book.intl.php) extension for rich internationalization support.

## Optional PHP Methods and Configurations

一部の共用ホスティング環境では、Craft の機能に影響を与える PHP メソッドや設定が無効になっています。

- [allow_url_fopen](http://php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen) must be enabled for updating and installing plugins from the Plugin Store.
- [proc_*](http://php.net/manual/en/ref.exec.php) methods must be enabled in order to utilize the Plugin Store and send emails.
- [ignore_user_abort](https://www.php.net/manual/en/function.ignore-user-abort.php) must be enabled for the [default, web-based queue runner](config3:runQueueAutomatically) to operate.

## Required Database User Privileges

Craft のデータベースに接続するユーザーには、次の特権がなければなりません。

#### MySQL/MariaDB

* `SELECT`
* `INSERT`
* `DELETE`
* `UPDATE`
* `CREATE`
* `ALTER`
* `INDEX`
* `DROP`
* `REFERENCES`
* `LOCK TABLES`

#### PostgreSQL

* `SELECT`
* `INSERT`
* `UPDATE`
* `CREATE`
* `DELETE`
* `REFERENCES`
* `CONNECT`

## Control Panel Browser Requirements

Craft のコントロールパネルは、モダンブラウザが必要です。

#### Windows と macOS

- Firefox 67+
- Chrome 63+
- Safari 11.1+
- Edge 79+

#### モバイル

- iOS: Safari 11+
- Android: Chrome 81+ or Firefox 68+

::: tip
Craft の CP のブラウザ要件は、実際のウェブサイトとは関係がありません。 もしあなたがつらい仕事を苦にせず、IE 6 で完璧に表示されるサイトを望むのであれば、あたなの望む通りにできます。
:::
