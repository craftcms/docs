# Requirements

The server requirements for Craft Commerce are the [same as Craft 3.5](https://craftcms.com/docs/3.x/requirements.html) as well as PHP’s [SOAP extension](https://www.php.net/manual/en/book.soap.php).

## PHP Package Dependencies

Craft Commerce uses the following PHP packages. Please see their documentation for any additional requirements.

- [craftcms/cms](https://github.com/craftcms/cms) ^3.6.0
- [dompdf/dompdf](https://github.com/dompdf/dompdf) ^1.0.2 (recommends GD and IMagick)
- [moneyphp/money](https://github.com/moneyphp/money) ^3.3.1
- [ibericode/vat](https://github.com/ibericode/vat) ^2.0.3
- [iio/libmergepdf](https://github.com/ibericode/vat) ^4.0

::: tip
If you’re using MySQL or MariaDB, the engine should provide timezone support for the best experience. See [Populating MySQL and MariaDB Timezone Tables](https://craftcms.com/knowledge-base/populating-mysql-mariadb-timezone-tables).
:::