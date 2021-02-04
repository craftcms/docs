# Multi-select Fields

Multi-select fields give you an input where multiple items may be selected.

## Settings

Multi-select fields have the following settings:

* **Multi-select Options** – Define the options that will be available in the field. You even get to set the option values and labels separately, and choose which ones should be selected by default.

## Development

### Querying Elements with Multi-select Fields

When [querying for elements](element-queries.md) that have a Multi-select field, you can filter the results based on the Multi-select field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `'foo'` | with a `foo` option selected.
| `'not foo'` | without a `foo` option selected.
| `['foo', 'bar']` | with `foo` or `bar` options selected.
| `['and', 'foo', 'bar']` | with `foo` and `bar` options selected.

::: code
```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```
```php
// Fetch entries with the 'foo' option selected
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('foo')
    ->all();
```
:::

### Working with Multi-select Field Data

If you have an element with a Multi-select field in your template, you can access its data using your Multi-select field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you a <craft3:craft\fields\data\MultiOptionsFieldData> object that contains the field data.

To loop through all the selected options, iterate over the field value:

::: code
```twig
{% for option in entry.myFieldHandle %}
    Label: {{ option.label }}
    Value: {{ option }} or {{ option.value }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle as $option) {
    // Label: $option->label
    // Value: $option or $option->value
}
```
:::

To loop through all the available options, iterate over the [options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) property:

::: code
```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle->options as $option) {
    // Label:    $option->label
    // Value:    $option or $option->value
    // Selected: $option->selected ? 'Yes' : 'No'
}
```
:::

To see if any options are selected, use the [length](https://twig.symfony.com/doc/2.x/filters/length.html) filter:

::: code
```twig
{% if entry.myFieldHandle|length %}
```
```php
if (count($entry->myFieldHandle)) {
```
:::

To see if a particular option is selected, use [contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains())

::: code
```twig
{% if entry.myFieldHandle.contains('foo') %}
```
```php
if ($entry->myFieldHandle->contains('foo') {
```
:::

### Saving Multi-select Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Multi-select field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

{# Include a hidden input first so Craft knows to update the
   existing value, if no options are selected. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

<select multiple name="fields[myFieldHandle][]">
    {% for option in field.options %}

        {% set selected = entry is defined
            ? entry.myFieldHandle.contains(option.value)
            : option.default %}

        <option value="{{ option.value }}"
                {% if selected %}selected{% endif %}>
            {{ option.label }}
        </option>
    {% endfor %}
</select>
```
