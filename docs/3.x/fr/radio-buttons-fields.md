# Radio Buttons Fields

Radio Buttons fields give you a group of radio buttons.

## Settings

Radio Buttons fields have the following settings:

* **Radio Button Options** – Define the radio buttons that will be available in the field. You even get to set the option values and labels separately, and choose which one should be selected by default.

## Templating

### Querying Elements with Radio Buttons Fields

When [querying for elements](element-queries.md) that have a Radio Buttons field, you can filter the results based on the Radio Buttons field data using a query param named after your field’s handle.

Possible values include:

| Value                   | Fetches elements…                                |
| ----------------------- | ------------------------------------------------ |
| `'foo'`                 | with a `foo` option selected.                    |
| `'not foo'`             | without a `foo` option selected.                 |
| `['foo', 'bar']`        | with either a `foo` or `bar` option selected.    |
| `['not', 'foo', 'bar']` | without either a `foo` or `bar` option selected. |

```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```

### Working with Radio Buttons Field Data

If you have an element with a Radio Buttons field in your template, you can access its data using your Radio Buttons field’s handle:

```twig
{% set value = entry.myFieldHandle %}
```

That will give you a <craft3:craft\fields\data\SingleOptionFieldData> object that contains the field data.

To show the selected option, output it as a string, or output the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

```twig
{{ entry.myFieldHandle }} or {{ entry.myFieldHandle.value }}
```

To see if an option is selected, use the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

```twig
{% if entry.myFieldHandle.value %}
```

To show the selected option’s label, output the [label](craft3:craft\fields\data\SingleOptionFieldData::$label) property:

```twig
{{ entry.myFieldHandle.label }}
```

To loop through all of the available options, iterate over the [options](craft3:craft\fields\data\SingleOptionFieldData::getOptions()) property:

```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

### Saving Radio Buttons Fields in Entry Forms

If you have an [entry form](dev/examples/entry-form.md) that needs to contain a Radio Buttons field, you can use this template as a starting point:

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
