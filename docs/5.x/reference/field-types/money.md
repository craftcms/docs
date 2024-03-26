# Money Fields

Money fields give you a text input tailored for storing currency amounts.

## Settings

Money fields have the following settings:

- **Currency** – The currency in which values should be stored.
- **Default Value** – The default value that should be applied for new elements.
- **Min Value** – The lowest amount that may be entered in the field.
- **Max Value** – The highest amount that may be entered in the field.
- **Show Currency** – Whether to display the currency label with the field’s text input.
- **Size** – The input’s `size` attribute.

Values are always stored in the database as an integer, in the currency’s base or “minor” unit. For example, the Chilean Peso has no minor unit and is always expressed as a whole number; on the other hand, the Swiss Franc can be split into 100 _Rappen_. Even if you enter a value like `123.45 Fr.` in the control panel, it will be stored in the minor unit as `12345`.

## Development

### Querying Elements with Money Fields

When [querying for elements](element-queries.md) that have a Date field, you can filter the results based on the Money field data using a query param named after your field’s handle.

::: tip
When querying with a money field, provide amounts as you would naturally write them (`123.45`), _not_ in the currency’s minor unit (`12345`). Craft will automatically normalize the values when executing the query.
:::

Any value compatible with <craft5:craft\helpers\Db::parseMoneyParam()> can be passed as a query param:

| Value | Fetches elements…
| - | -
| `':empty:'` | …that have no amount saved.
| `':notempty:'` | …that have an amount saved.
| `'>= 123.45'` | …that have a normalized amount greater than `123.45`.
| `'< 123.45'` | …that have a normalized amount less than `123.45`.
| `['and', '>= 50.00', '< 75.00']` | …that have a normalized amount between `50.00` and `75.00`.
| `['or', '< -100.00', '> 100.00']` | …that have a normalized amount less than `-100.00` or greater than `100.00`.

All values are assumed to be in the field’s currency.

### Working with Money Field Data

If you have an element with a Money field in your template, you can output its value using the [money](reference/twig/filters.md#money) filter, or <craft5:craft\helpers\MoneyHelper::toString()>.

::: code
```twig
{% set value = entry.myFieldHandle|money %}
```
```php
$value = \craft\helpers\MoneyHelper::toString($entry->myFieldHandle);
```
:::

That will give you a formatted currency value for the field, if it has a value.

