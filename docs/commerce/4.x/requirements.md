# Requirements

The server requirements for Craft Commerce are the [same as Craft 4](../4.x/requirements.md) as well as PHP’s [SOAP extension](https://www.php.net/manual/en/book.soap.php).

## PHP Package Dependencies

Craft Commerce uses the following PHP packages, which will be installed for you via Composer. See each package’s documentation for any additional requirements.

- [craftcms/cms](https://github.com/craftcms/cms) ^4.0.0-beta.1
- [dompdf/dompdf](https://github.com/dompdf/dompdf) ^1.0.2 (recommends GD and IMagick)
- [ibericode/vat](https://github.com/ibericode/vat) ^1.1.2
- [iio/libmergepdf](https://github.com/ibericode/vat) ^4.0

::: tip
If you’re using MySQL or MariaDB, the engine should provide timezone support for the best experience. See [Populating MySQL and MariaDB Timezone Tables](https://craftcms.com/knowledge-base/populating-mysql-mariadb-timezone-tables).
:::