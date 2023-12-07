---
containsGeneratedContent: yes
---

# Order Queries

You can fetch orders in your templates or PHP code using **order queries**.

::: code
```twig
{# Create a new order query #}
{% set myOrderQuery = craft.orders() %}
```
```php
// Create a new order query
$myOrderQuery = \craft\commerce\elements\Order::find();
```
:::

Once you’ve created an order query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/3.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Order](commerce2:craft\commerce\elements\Order) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/3.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

## Example

We can display an order with a given order number by doing the following:

1. Create an order query with `craft.orders()`.
2. Set the [number](#number) parameter on it.
3. Fetch the order with `.one()`.
4. Output information about the order as HTML.

```twig
{# Get the requested order number from the query string #}
{% set orderNumber = craft.app.request.getQueryParam('number') %}

{# Create an order query with the 'number' parameter #}
{% set myOrderQuery = craft.orders()
  .number(orderNumber) %}

{# Fetch the order #}
{% set order = myOrderQuery.one() %}

{# Make sure it exists #}
{% if not order %}
  {% exit 404 %}
{% endif %}

{# Display the order #}
<h1>Order {{ order.getShortNumber() }}</h1>
<!-- ... ->
```

## Parameters

Order queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/2.x/order-queries.md)!!!
