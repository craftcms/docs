# Multi-select Fields

Multi-select fields give you a multi-select input.

## Settings

Multi-select fields have the following settings:

* **Multi-select Options** – Define the options that will be available in the field. You even get to set the option values and labels separately, and choose which ones should be selected by default.

## Templating

### Querying Elements with Multi-select Fields

When [querying for elements](element-queries.md) that have a Multi-select field, you can filter the results based on the Multi-select field data using a query param named after your field’s handle.

Possible values include:

| Value                   | Fetches elements…                      |
| ----------------------- | -------------------------------------- |
| `'foo'`                 | with a `foo` option selected.          |
| `'not foo'`             | without a `foo` option selected.       |
| `['foo', 'bar']`        | with `foo` or `bar` options selected.  |
| `['and', 'foo', 'bar']` | with `foo` and `bar` options selected. |

```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```

### Working with Multi-select Field Data

If you have an element with a Multi-select field in your template, you can access its data using your Multi-select field’s handle:

```twig
{% set value = entry.myFieldHandle %}
```

That will give you a <craft3:craft\fields\data\MultiOptionsFieldData> object that contains the field data.

To loop through all the selected options, iterate over the field value:

```twig
{% for option in entry.myFieldHandle %}
    Label: {{ option.label }}
    Value: {{ option }} or {{ option.value }}
{% endfor %}
```

To loop through all of the available options, iterate over the [options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) property:

```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

To see if any options are selected, use the [length](https://twig.symfony.com/doc/2.x/filters/length.html) filter:

```twig
{% if entry.myFieldHandle|length %}
```

To see if a particular option is selected, use [contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains())

```twig
{% if entry.myFieldHandle.contains('foo') %}
```

### Saving Multi-select Fields in Entry Forms

If you have an [entry form](dev/examples/entry-form.md) that needs to contain a Multi-select field, you can use this template as a starting point:

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
