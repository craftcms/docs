# Variants Fields

Commerce Variants fields allow you to relate [product variants](products-variants.md#variants) to other elements.

## Settings

Commerce Variants fields have the following settings:

- **Sources** – the product types whose variants you want to relate entries from. (Default is “All”.)
- **Limit** – the maximum number of products that can be related with the field at once. (Default is no limit.)
- **Selection Label** – the label to be shown on the field’s selection button. (Default is “Add a variant.)

## The Field

Commerce Variants fields list all of the currently selected product variants, with a button to select new ones:

<img src="./assets/variant-field-example.png" alt="Variants field">

Choosing **Add a variant** opens a modal window for finding and selecting additional variants:

<img src="./assets/variant-field-modal.png" alt="Variant selection modal">

## Templating

If you have an element with a variants field in your template, you can access its selected variants with the field handle:

```twig
{% set variants = entry.myFieldHandle %}
```

That will give you an [element query](/3.x/element-queries.md) prepped to output all the selected product variants for the given field.

::: tip
See [Relations](/3.x/relations.md) for more info on the `relatedTo` param.
:::

## Examples

To check if your Commerce Variants field has any selected product variants, you can use the `length` filter:

```twig
{% if entry.myFieldHandle|length %}
    {# ... #}
{% endif %}
```

Loop through all the selected variants using `all()`:

```twig
{% for variant in entry.myFieldHandle.all() %}
    {# ... #}
{% endfor %}
```

Rather than typing `entry.myFieldHandle` every time, you can call it once and set it to another variable:

```twig
{% set variants = entry.myFieldHandle.all() %}

{% if variants|length %}

    <h3>Consider buying these:</h3>

    <ul>
        {% for variant in variants %}
            {% set product = variant.getProduct() %}
            <li>
                <a href="{{ product.url }}">
                    {{ product.title ~ ': ' ~ variant.title }}
                </a>
            </li>
        {% endfor %}
    </ul>

{% endif %}
```

You can also add parameters to the element query:

```twig
{% set clothingProducts = entry.myFieldHandle.type('clothing') %}
```

If your variants field is only meant to have a single variant selected, remember that calling your variants field will still give you the same element query, not the selected variant. To get the first (and only) variant selected, use `one()`:

```twig
{% set variant = entry.myFieldHandle.one() %}
{% if variant %}
    {# ... #}
{% endif %}
```
