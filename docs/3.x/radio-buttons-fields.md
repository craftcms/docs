# Radio Buttons Fields

Radio Buttons fields give you a group of radio buttons.

## Settings

Radio Buttons fields have the following settings:

* **Radio Button Options** – Define the radio buttons that will be available in the field. You even get to set the option values and labels separately, and choose which one should be selected by default.

## Development

### Querying Elements with Radio Buttons Fields

When [querying for elements](element-queries.md) that have a Radio Buttons field, you can filter the results based on the Radio Buttons field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `'foo'` | with a `foo` option selected.
| `'not foo'` | without a `foo` option selected.
| `['foo', 'bar']` | with either a `foo` or `bar` option selected.
| `['not', 'foo', 'bar']` | without either a `foo` or `bar` option selected.

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

### Working with Radio Buttons Field Data

If you have an element with a Radio Buttons field in your template, you can access its data using your Radio Buttons field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you a <craft3:craft\fields\data\SingleOptionFieldData> object that contains the field data.

To show the selected option, output it as a string, or output the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

::: code
```twig
{{ entry.myFieldHandle }} or {{ entry.myFieldHandle.value }}
```
```php
// $entry->myFieldHandle or $entry->myFieldHandle->value
```
:::

To see if an option is selected, use the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

::: code
```twig
{% if entry.myFieldHandle.value %}
```
```php
if ($entry->myFieldHandle->value) {
```
:::

To show the selected option’s label, output the [label](craft3:craft\fields\data\SingleOptionFieldData::$label) property:

::: code
```twig
{{ entry.myFieldHandle.label }}
```
```php
// $entry->myFieldHandle->label
```
:::

To loop through all the available options, iterate over the [options](craft3:craft\fields\data\SingleOptionFieldData::getOptions()) property:

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

### Saving Radio Buttons Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Radio Buttons field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

<ul>
    {% for option in field.options %}

        {% set selected = entry is defined
            ? entry.myFieldHandle.value == option.value
            : option.default %}

        <li><label>
            <input type="radio"
                name="fields[myFieldHandle]"
                value="{{ option.value }}"
                {% if selected %}checked{% endif %}>
            {{ option.label }}
        </label></li>
    {% endfor %}
</ul>
```
