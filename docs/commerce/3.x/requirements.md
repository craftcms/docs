# Requirements

The server requirements for Craft Commerce are the [same as Craft 3.5](https://craftcms.com/docs/3.x/requirements.html) as well as PHP’s [SOAP extension](https://www.php.net/manual/en/book.soap.php).

## PHP Package Dependencies

Craft Commerce uses the following PHP packages. Please see their documentation for any additional requirements.

- [craftcms/cms](https://github.com/craftcms/cms) ^3.5.4
- [dompdf/dompdf](https://github.com/dompdf/dompdf) ~0.8.3 (recommends GD and IMagick)[*](#dompdf)
- [moneyphp/money](https://github.com/moneyphp/money) ^3.2.1
- [ibericode/vat](https://github.com/ibericode/vat) ^1.1.2

### Dompdf

In strictly following Craft’s server requirements, Commerce requires a version of Dompdf that’s compatible with PHP 7.0 but results in errors with PHP 7.4.

You can resolve by updating your project’s `composer.json` platform requirement to PHP 7.1 or greater:

```json{5}
// ...
"config": {
  "optimize-autoloader": true,
  "platform": {
    "php": "7.1"
  }
}
// ...
```

Running `composer update` will install Dompdf `0.8.4+`.
