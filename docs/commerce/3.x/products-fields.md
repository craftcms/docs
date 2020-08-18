# Products Fields

Commerce Products fields allow you to relate products to a parent element.

## Settings

<img src="./assets/products-field-settings.png" width="422" alt="Products field settings.">

Products fields have the following settings:

- **Sources** are the product types you want to relate entries from. (Default is “All”.)
- **Limit** is the maximum number of products that can be related with the field at once. (Default is no limit.)
- **Selection Label** is the label to be shown on the field’s selection button. (Default is “Add a product”.)

## The Field

Products fields list all of the currently selected products, with a button to select new ones:

<img src="./assets/product-field-example.png" width="297" alt="Products field">

Choosing “Add an entry” will bring up a modal window where you can find and select additional entries:

<img src="./assets/product-field-modal.png" width="600" alt="Product selection modal">

## Templating

If you have an element with a Products field in your template, you can access its selected products with the field handle:

```twig
{% set products = entry.productsFieldHandle %}
```

That will give you an [element query](https://craftcms.com/docs/3.x/element-queries.html) prepped to output all of the selected products for the given field.

::: tip
See [Relations](https://craftcms.com/docs/relations) for more info on the `relatedTo` param.
:::

## Examples

To check if your Products field has any selected products, you can use the `length` filter:

```twig
{% if entry.productsFieldHandle|length %}
    {# ... #}
{% endif %}
```

Loop through all the selected products using `all()`:

```twig
{% for product in entry.productsFieldHandle.all() %}
    {# ... #}
{% endfor %}
```

Rather than typing `entry.productsFieldHandle` every time, you can call it once and set it to another variable:

```twig
{% set products = entry.productsFieldHandle.all() %}

{% if products|length %}

    <h3>Some great products</h3>
    {% for product in products %}
        {# ... #}
    {% endfor %}

{% endif %}
```

You can add parameters to the element query as well:

```twig
{% set clothingProducts = entry.productsFieldHandle.type('clothing') %}
```

If your Products field is only meant to have a single product selected, remember that calling your Products field will still give you the same element query, not the selected product. To get the first (and only) product selected, use `one()`:

```twig
{% set product = entry.productsFieldHandle.one() %}
{% if product %}
    {# ... #}
{% endif %}
```
