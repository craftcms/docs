# Lightswitch Fields

Lightswitch fields give you a simple toggle input for times when all you need is a “Yes” or “No” answer.

## Templating

### Querying Elements with Lightswitch Fields

When [querying for elements](dev/element-queries/README.md) that have a Lightswitch field, you can filter the results based on the Lightswitch field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `true` | with an enabled Lightswitch value.
| `false` | with a disabled Lightswitch value.

```twig
{# Fetch entries with the Lightswitch field enabled #}
{% set entries = craft.entries()
    .<FieldHandle>(true)
    .all() %}
```

### Working with Lightswitch Field Data

If you have an element with a Lightswitch field in your template, you can access its data using your Lightswitch field’s handle:

```twig
{% if entry.<FieldHandle> %}
    <p>I'm on!</p>
{% else %}
    <p>I'm off.</p>
{% endif %}
```

### Saving Lightswitch Fields in Entry Forms

If you have an [entry form](dev/examples/entry-form.md) that needs to contain a Lightswitch field, you can use this template as a starting point:

```twig
{{ hiddenInput('fields[<FieldHandle>]', '') }}

{{ tag('input', {
  type: 'checkbox',
  name: 'fields[<FieldHandle>]',
  value: '1',
  checked: (entry.<FieldHandle> ?? false) ? true : false,
}) }}
```
