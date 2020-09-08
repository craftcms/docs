# Requirements

::: tip
You can use the [Craft Server Check](https://github.com/craftcms/server-check) script to quickly find out if your server meet’s Craft’s requirements.
:::

Craft requires the following:

* PHP 7.0+
* MySQL 5.5+ with InnoDB, MariaDB 5.5+, or PostgreSQL 9.5+
* At least 256MB of memory allocated to PHP
* At least 200MB of free disk space

## Required PHP Extensions

Craft requires the following PHP extensions:

* [ctype](https://secure.php.net/manual/en/book.ctype.php)
* [cURL](http://php.net/manual/en/book.curl.php)
* [GD](http://php.net/manual/en/book.image.php) or [ImageMagick](http://php.net/manual/en/book.imagick.php). ImageMagick is preferred.
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

## Optional PHP Extensions

* [Intl](http://php.net/manual/en/book.intl.php) – Adds rich internationalization support.

## Optional PHP Methods and Configurations

Some shared hosting environments will disable certain common PHP methods and configurations that affect Craft features.

- [allow_url_fopen](http://php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen) must be enabled for updating and installing plugins from the Plugin Store.
- [proc_*](http://php.net/manual/en/ref.exec.php) methods must be enabled in order to utilize the Plugin Store and send emails.
- [ignore_user_abort](https://www.php.net/manual/en/function.ignore-user-abort.php) must be enabled for the [default, web-based queue runner](config3:runQueueAutomatically) to operate.

## Optional Extras

* [Composer 1.30+](installation.md#downloading-with-composer) - When installing Craft with Composer

## Required Database User Privileges

The database user you tell Craft to connect with must have the following privileges:

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

Craft’s control panel requires a browser that [supports JavaScript modules](https://caniuse.com/#feat=es6-module-dynamic-import).

#### Windows and macOS

- Firefox 67+
- Chrome 63+
- Safari 11.1+
- Edge 79+

#### Mobile

- iOS: Safari 11+
- Android: Chrome 81+ or Firefox 68+

::: tip
Craft’s control panel browser requirements have nothing to do with your actual website. If you’re a glutton for punishment and want your website to look flawless on IE 6, that’s your choice.
:::
