# Lightswitch Fields

Lightswitch fields give you a simple toggle input and store a boolean value.

<!-- more -->

## Development

### Querying Elements with Lightswitch Fields

When [querying for elements](../../development/element-queries.md) that have a lightswitch field, you can filter the results based on the lightswitch field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `true` | with the switch _on_.
| `false` | with the switch _off_.

::: code
```twig
{# Fetch entries with the lightswitch field enabled #}
{% set entries = craft.entries()
  .myFieldHandle(true)
  .all() %}
```
```php
// Fetch entries with the lightswitch field enabled
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(true)
    ->all();
```
:::

::: tip
Any elements that don’t have a value set for a lightswitch field will be treated as if they have the default field value, per the field’s settings.
:::

### Working with Lightswitch Field Data

If you have an element with a lightswitch field in your template, you can access its value using the field’s handle:

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

### Saving Lightswitch Fields

In an element or [entry form](kb:entry-form) that needs to save a value to a lightswitch field, you can use this template as a starting point:

```twig
{{ hiddenInput('fields[myFieldHandle]', '') }}

{{ tag('input', {
  type: 'checkbox',
  name: 'fields[myFieldHandle]',
  value: '1',
  checked: (entry.myFieldHandle ?? false) ? true : false,
}) }}
```
