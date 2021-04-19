# Lightswitch Fields

Lightswitch fields give you a simple toggle input for times when all you need is a “Yes” or “No” answer.

## Development

### Querying Elements with Lightswitch Fields

When [querying for elements](element-queries.md) that have a Lightswitch field, you can filter the results based on the Lightswitch field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `true` or `':notempty:'` | with an enabled Lightswitch value.
| `false` or `':empty:'` | with a disabled Lightswitch value.

::: code
```twig
{# Fetch entries with the Lightswitch field enabled #}
{% set entries = craft.entries()
    .myFieldHandle(true)
    .all() %}
```
```php
// Fetch entries with the Lightswitch field enabled
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(true)
    ->all();
```
:::

::: tip
Any elements that don’t have an explicit Lightswitch value set will be treated as if they have the default field value, per the field settings.
:::

### Working with Lightswitch Field Data

If you have an element with a Lightswitch field in your template, you can access its data using your Lightswitch field’s handle:

::: code
```twig
{% if entry.myFieldHandle %}
    <p>I’m on!</p>
{% else %}
    <p>I’m off.</p>
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    // I’m on!
} else {
    // I’m off.
}
```
:::

::: tip
If the element doesn’t have an explicit Lightswitch field value yet, the field’s default value will be returned.
:::

### Saving Lightswitch Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Lightswitch field, you can use this template as a starting point:

```twig
{{ hiddenInput('fields[myFieldHandle]', '') }}

{{ tag('input', {
    type: 'checkbox',
    name: 'fields[myFieldHandle]',
    value: '1',
    checked: (entry.myFieldHandle ?? false) ? true : false,
}) }}
```
