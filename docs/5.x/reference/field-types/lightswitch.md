# Lightswitch Fields

Lightswitch fields give you a simple toggle input and store a boolean value.

<!-- more -->

## Development

### Querying Elements with Lightswitch Fields

When [querying for elements](../../development/element-queries.md) that have a lightswitch field, you can filter the results based on the lightswitch field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements… |
| --- | --- |
| `true` | …with the switch _on_. |
| `false` | …with the switch _off_. |

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

Elements without a value for a lightswitch field (say, because they haven't been saved since the field was added) are treated as if they have the default field value. For example, querying against a field that defaults to _off_…

```twig{3}
{% set archive = craft.entries()
  .section('essays')
  .isFeatured(false)
  .all() %}
```

…would return all posts with an explicit `false` value, or no saved value. This can result in unpredictable behavior when some elements in a set may not have the field. Suppose we want to gather content across two sections (featured “essays” as well as implicitly high-priority “bulletins”):

```twig{2}
{% set headlines = craft.entries()
  .section(['essays', 'bulletins'])
  .isFeatured(true)
  .all() %}
```

If only the `essays` section has an `isFeatured` lightswitch field, entries in the `bulletins` section are assumed to have the field’s default value (`false`), and are therefore excluded.

For more control over this behavior, you have two options: <Since ver="5.7.0" feature="Customizing null handling for lightswitch fields" />

- Pass each acceptable value, explicitly…

  ```twig{3}
  {% set headlines = craft.entries()
    .section(['essays', 'bulletins'])
    .isFeatured([true, null])
    .all() %}
  ```

- Pass a hash with a `strict` key…

  ```twig{3-6}
  {% set headlines = craft.entries()
    .section(['essays', 'bulletins'])
    .isFeatured({
      value: true,
      strict: true,
    })
    .all() %}
  ```

### Working with Lightswitch Field Data

If you have an element with a lightswitch field in your template, you can access its value using the field’s handle:

::: code
```twig
{% if entry.myLightswitchField %}
  <p>I’m on!</p>
{% else %}
  <p>I’m off.</p>
{% endif %}
```
```php
if ($entry->myLightswitchField) {
    // I’m on!
} else {
    // I’m off.
}
```
:::

### Saving Lightswitch Fields

In an element or [entry form](kb:entry-form) that needs to save a value to a lightswitch field, you can use this template as a starting point:

```twig
{{ hiddenInput('fields[myLightswitchField]', '') }}

{{ tag('input', {
  type: 'checkbox',
  name: 'fields[myLightswitchField]',
  value: '1',
  checked: (entry.myLightswitchField ?? false) ? true : false,
  id: 'my-checkbox-input',
}) }}

<label for="my-checkbox-input">Opt In</label>
```

Your input’s `value` can be any “truthy” looking value; Craft only stores a boolean. If you wish to capture one or more explicit values, consider using a [radio](radio-buttons.md), [checkboxes](checkboxes.md), or [multi-select](multi-select.md) field.

The `hidden` input is necessary to tell Craft in the POST request that the field’s value should be updated. If you do not send a value under a custom field handle (`fields[myLightswitchField]` in the example), Craft assumes you _do not_ wish to update it. When the checkbox is ticked, its `value` is sent (`1` in the example) in place of an empty string.
