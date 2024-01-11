---
containsGeneratedContent: yes
---

# Product Queries

You can fetch products in your templates or PHP code using **product queries**.

::: code
```twig
{# Create a new product query #}
{% set myProductQuery = craft.products() %}
```
```php
// Create a new product query
$myProductQuery = \craft\commerce\elements\Product::find();
```
:::

Once you’ve created a product query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/3.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Product](commerce2:craft\commerce\elements\Product) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/3.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

## Example

We can display the 10 most recent Clothing products by doing the following:

1. Create a product query with `craft.products()`.
2. Set the [type](#type) an [limit](#limit) parameters on it.
3. Fetch the products with `.all()`.
4. Loop through the products using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to output their HTML.

```twig
{# Create a product query with the 'type' and 'limit' parameters #}
{% set myProductQuery = craft.products()
  .type('clothing')
  .limit(10) %}

{# Fetch the products #}
{% set products = myProductQuery.all() %}

{# Display the products #}
{% for product in products %}
  <h1><a href="{{ product.url }}">{{ product.title }}</a></h1>
  {{ product.summary }}
  <a href="{{ product.url }}">Learn more</a>
{% endfor %}
```

## Parameters

Product queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/2.x/product-queries.md)!!!
