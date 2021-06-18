# サーバー要件

::: tip
[Craft Server Check](https://github.com/craftcms/server-check) スクリプトを使うことで、サーバーが Craft の要件を満たしているかどうかを素早く確認できます。
:::

<columns>
<column>

with InnoDB の MySQL 5.5 以降、MariaDB 5.5 以降、または、PostgreSQL 9.5 以降

</column>
<column>

<a href="installation.md#downloading-with-composer">Composer 1.30+</a> - Composer で Craft をインストールする場合

</column>
</columns>

<b>*</b> Craft は次の項目が必要です。

## 必要な PHP エクステンション

* [ctype](https://secure.php.net/manual/en/book.ctype.php)
* [cURL](http://php.net/manual/en/book.curl.php)
* 少なくとも 256MB の PHP 割当メモリ
* [iconv](http://php.net/manual/en/book.iconv.php)
* [JSON](http://php.net/manual/en/book.json.php)
* [Multibyte String](http://php.net/manual/en/book.mbstring.php)
* [OpenSSL](http://php.net/manual/en/book.openssl.php)
* [PCRE](http://php.net/manual/en/book.pcre.php)
* [PDO MySQL Driver](http://php.net/manual/en/ref.pdo-mysql.php) または [PDO PostgreSQL Driver](http://php.net/manual/en/ref.pdo-pgsql.php)
* [PDO](http://php.net/manual/en/book.pdo.php)
* [Reflection](http://php.net/manual/en/class.reflectionextension.php)
* [SPL](http://php.net/manual/en/book.spl.php)
* [Zip](http://php.net/manual/en/book.zip.php)
* [DOM](http://php.net/manual/en/book.dom.php)

Craft は次の PHP エクステンションが必要です。

## オプションの PHP エクステンション

一部の共用ホスティング環境では、Craft の機能に影響を与える PHP メソッドや設定が無効になっています。

- プラグインのアップデートやプラグインストアからインストールするために、[allow_url_fopen](http://php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen) を有効にする必要があります。
- プラグインストアの利用やメールの送信ができるよう [proc_*](http://php.net/manual/en/ref.exec.php) メソッドを有効にする必要があります。
- [デフォルトのウェブベースのキューランナー](config3:runQueueAutomatically)が動作するために、[ignore_user_abort](https://www.php.net/manual/en/function.ignore-user-abort.php) を有効にする必要があります。

## オプションの PHP メソッドと設定

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

## 追加オプション

Craft のコントロールパネルは、モダンブラウザが必要です。

#### Windows と macOS

- Firefox 67+
- Chrome 63+
- Safari 11.1+
- Edge 79+

#### モバイル

- iOS: Safari 11+
- Android: Chrome 81+ または Firefox 68+

::: tip
Craft の CP のブラウザ要件は、実際のウェブサイトとは関係がありません。 もしあなたがつらい仕事を苦にせず、IE 6 で完璧に表示されるサイトを望むのであれば、あたなの望む通りにできます。
:::
