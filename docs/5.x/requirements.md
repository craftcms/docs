---
description: Craft requires PHP 8.2 and MySQL 8.0.17 or Postgres 13.
---

# Requirements

Craft is a PHP application that uses a relational database for content storage. It will run on most modern hosting environments, and can be configured to take advantage of all kinds of advanced infrastructure.

<!-- more -->

::: tip
You can use the official [server check](https://github.com/craftcms/server-check) script to quickly find out if your server meets Craft’s requirements.
:::

<columns>
<column>

## Minimum System Specs

- PHP 8.2+
- MySQL 8.0.17+ using InnoDB, MariaDB 10.4.6+, or PostgreSQL 13+
- 256MB+ memory allocated to PHP
- 200MB+ free disk space
- Composer 2.0+

</column>
<column>

## Recommended System Specs

- PHP 8.2+
- MySQL 8.0.36+ using InnoDB, or PostgreSQL 16+
- 512MB+ of memory allocated to PHP

</column>
</columns>

::: warning
Due to its diverging parity with MySQL, we no longer recommend MariaDB for sites with many users or a large volume of content.
:::

## Required PHP Extensions

- [BCMath](https://www.php.net/manual/en/book.bc.php)
- [ctype](https://secure.php.net/manual/en/book.ctype.php)
- [cURL](http://php.net/manual/en/book.curl.php)
- [GD](http://php.net/manual/en/book.image.php) or [ImageMagick](http://php.net/manual/en/book.imagick.php)
- [iconv](http://php.net/manual/en/book.iconv.php)
- [Intl](http://php.net/manual/en/book.intl.php)
- [JSON](http://php.net/manual/en/book.json.php)
- [Multibyte String](http://php.net/manual/en/book.mbstring.php)
- [OpenSSL](http://php.net/manual/en/book.openssl.php)
- [PCRE](http://php.net/manual/en/book.pcre.php)
- [PDO MySQL Driver](http://php.net/manual/en/ref.pdo-mysql.php) or [PDO PostgreSQL Driver](http://php.net/manual/en/ref.pdo-pgsql.php)
- [PDO](http://php.net/manual/en/book.pdo.php)
- [Reflection](http://php.net/manual/en/class.reflectionextension.php)
- [SPL](http://php.net/manual/en/book.spl.php)
- [Zip](http://php.net/manual/en/book.zip.php)
- [DOM](http://php.net/manual/en/book.dom.php)

::: tip
We recommend ImageMagick over GD for expanded [image handling options](development/image-transforms.md).
:::

## Optional PHP Methods and Configurations

Some shared hosting environments disable common PHP methods and configurations that affect Craft features.

- [allow_url_fopen](http://php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen) must be enabled for updating and installing plugins from the Plugin Store.
- [proc_*](http://php.net/manual/en/ref.exec.php) methods must be enabled in order to utilize the Plugin Store, install updates, and send emails.
- [ignore_user_abort](https://www.php.net/manual/en/function.ignore-user-abort.php) must be enabled for the [default, web-based queue runner](config5:runQueueAutomatically) to operate.

## File Permissions

For Craft to run properly, PHP needs to be able to write to the following files and folders at all times:

- `storage/*`
- `config/license.key`
- `web/cpresources/*`

Additionally, during [setup](kb:first-time-setup) or when [updating](update.md) or installing [plugins](system/plugins.md) via the [control panel](system/control-panel.md) or [CLI](system/cli.md), Craft may touch these files:

- `.env`
- `config/project/*`
- `composer.json` and `composer.lock`
- `vendor/*`

The exact permissions depend on the relationship between the system user that PHP runs as and the owner of the folders and files:

- If they’re the same user, use `744` (`rwxr--r--`).
- If they’re in the same group, use `774` (`rwxrwxr--`).
- If neither of the above options describe your setup, something may have been misconfigured. Reach out to your system administrator for support.

Specifics may vary from platform to platform or host to host! Consult your development or hosting environment’s documentation for more information.

::: danger
**Never** set permissions to `777` in a shared environment or on a live site, and **never** run your HTTP server (or PHP) as `root`.
:::

## Required Database User Privileges

The database user you tell Craft to connect with must have the following privileges:

<columns>
<column>

#### MySQL/MariaDB

- `SELECT`
- `INSERT`
- `DELETE`
- `UPDATE`
- `CREATE`
- `ALTER`
- `INDEX`
- `DROP`
- `REFERENCES`
- `LOCK TABLES`

</column>

<column>

#### PostgreSQL

- `SELECT`
- `INSERT`
- `UPDATE`
- `CREATE`
- `DELETE`
- `REFERENCES`
- `CONNECT`

</column>
</columns>

<See path="reference/config/db.md" />

## Control Panel Browser Requirements

Craft’s [control panel](system/control-panel.md) requires a browser that [supports JavaScript modules](https://caniuse.com/#feat=es6-module-dynamic-import).

#### Windows and macOS

- Firefox 67+
- Chrome 63+
- Safari 11.1+
- Edge 79+

#### Mobile

- iOS: Safari 11+
- Android: Chrome 81+ or Firefox 68+

::: tip
Craft’s _control panel_ browser requirements are independent from those of your site’s front-end. Ultimately, Craft is only concerned with delivering [hypermedia](https://en.wikipedia.org/wiki/Hypermedia)—how you choose to enhance that with JavaScript and CSS is entirely up to you!
:::
