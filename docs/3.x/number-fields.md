# Number Fields

Number fields give you a text input that accepts a numeric value.

## Settings

Number fields have the following settings:

* **Default Value** – The default value that should be applied for new elements.
* **Min Value** – The lowest number that may be entered in the field
* **Max Value** – The highest number that may be entered in the field.
* **Decimal Points** – The maximum number of decimal points that may be entered in the field.
* **Size** – The field’s input width in characters. (Default omits [size](https://www.w3schools.com/tags/att_input_size.asp) attribute.)
* **Prefix Text** – Text that should be displayed before the input.
* **Suffix Text** – Text that should be displayed after the input.

## Development

### Querying Elements with Number Fields

When [querying for elements](element-queries.md) that have a Number field, you can filter the results based on the Number field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `100` | with a value of 100.
| `'>= 100'` | with a value of at least 100.
| `['and', '>= 100', '<= 1000']` | with a value between 100 and 1,000.

::: code
```twig
{# Fetch entries with a Number field set to at least 100 #}
{% set entries = craft.entries()
    .myFieldHandle('>= 100')
    .all() %}
```
```php
// Fetch entries with a Number field set to at least 100
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('>= 100')
    ->all();
```
:::

### Working with Number Field Data

If you have an element with a Number field in your template, you can access its data using your Number field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you the number value for the field, or `null` if there is no value.

To format the number with proper thousands separators (e.g. `,`), use the [number](./dev/filters.md#number) filter:

::: code
```twig
{{ entry.myFieldHandle|number }}
```
```php
\Craft::$app->getFormatter()->asDecimal($entry->myFieldHandle);
```
:::

If the number will always be an integer, pass `decimals=0` to format the number without any decimals.

::: code
```twig
{{ entry.myFieldHandle|number(decimals=0) }}
```
```php
\Craft::$app->getFormatter()->asDecimal($entry->myFieldHandle, 0);
```
:::


### Saving Number Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Number field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

{% set value = entry is defined
    ? entry.myFieldHandle
    : field.defaultValue %}

<input type="number"
    name="fields[myFieldHandle]"
    min="{{ field.min }}"
    max="{{ field.max }}"
    value="{{ value }}">
```
