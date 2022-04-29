# Products Fields

Commerce Products fields allow you to relate [products](products-variants.md#products) to other elements.

## Settings

Commerce Products fields have the following settings:

- **Sources** – the product types you want to relate entries from. (Default is “All”.)
- **Min Relations** – the minimum number of products that must be selected. (Default is no minimum.)
- **Max Relations** – the maximum number of products that can be selected. (Default is no limit.)
- **Selection Label** – the label to be shown on the field’s selection button. (Default is “Add a product”.)
- **Validate related products** – whether validation errors on selected products should prevent the source element from being saved. (Default is un-checked.)

### Advanced

- **Allow self relations** – whether the source element should be able to select itself in this field.

## The Field

Commerce Products fields list all of the currently selected products, with a button to select new ones:

<img src="./images/product-field-example.png" alt="Products field">

Choosing **Add a product** opens a modal window for finding and selecting additional products:

<img src="./images/product-field-modal.png" alt="Product selection modal">

## Templating

If you have an element with a products field in your template, you can access its selected products with the field handle:

```twig
{% set products = entry.myFieldHandle %}
```

That will give you an [element query](/4.x/element-queries.md) prepped to output all the selected products for the given field.

::: tip
See [Relations](/4.x/relations.md) for more info on the `relatedTo` param.
:::

## Examples

To check if your Commerce Products field has any selected products, you can use the `length` filter:

```twig
{% if entry.myFieldHandle|length %}
  {# ... #}
{% endif %}
```

Loop through all the selected products using `all()`:

```twig
{% for product in entry.myFieldHandle.all() %}
  {# ... #}
{% endfor %}
```

Rather than typing `entry.myFieldHandle` every time, you can call it once and set it to another variable:

```twig
{% set products = entry.myFieldHandle.all() %}

{% if products|length %}
  <h3>Some great products</h3>
  {% for product in products %}
    {# ... #}
  {% endfor %}
{% endif %}
```

You can also add parameters to the element query:

```twig
{% set clothingProducts = entry.myFieldHandle.type('clothing') %}
```

If your products field is only meant to have a single product selected, remember that calling your products field will still give you the same element query, not the selected product. To get the first (and only) product selected, use `one()`:

```twig
{% set product = entry.myFieldHandle.one() %}
{% if product %}
  {# ... #}
{% endif %}
```
