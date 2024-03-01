---
sidebarDepth: 2
containsGeneratedContent: yes
---

# Products & Variants

A _product_ is an [element](/5.x/system/elements.md) that describes what’s for sale. A _variant_ is the [purchasable](purchasables.md) the customer ultimately orders.

## Products

Products are the items available in your store.

A product itself is never sold; what goes into a cart for purchase is actually one of the product’s [variants](#variants). In the Craft control panel, you’ll see Products listed by Product Type.

![Diagram depicting Product with common fields and its relationship to one or more Variants](../images/product-variant.png)

In the same way that all Craft CMS entries have common fields, Craft Commerce products have some of their own:

- **Title**, **Slug**, **Post Date**, **Expiry Date**, and **Enabled** work just like they do in Craft [entries](/5.x/reference/element-types/entries.md).
- **Free Shipping**, when enabled, excludes the product and its variants from an order’s shipping cost calculation. (This only impacts per-*item*—and not per-*order*—shipping costs.)
- **Promotable** determines whether [sales](sales.md) and [discounts](discounts.md) can be applied to the product and its variants.
- **Available for purchase** determines whether the product and its variants should be available for purchase on the front end.
- **Tax** and **Shipping** allow you to designate the product’s [tax](tax.md) and [shipping](shipping.md) category respectively.

## Product Types

Product Types are a way to distinguish products in your system. Similar to Craft’s [Entry Types](/5.x/reference/element-types/entries.md#entry-types), they can determine the URL format of a product and include any number of custom fields. Each product type will also have one or more variants.

You can manage Product Types in the control panel from **Commerce** → **System Settings** → **Product Types**.

![Screenshot of a “Clothing” product type’s details displaying the settings mentioned below](../images/product-type-details.png)

### Product Type Options

#### Name

The name of the product type as displayed in the control panel.

#### Handle

The handle is what you’ll use to reference the product type in code. In Twig, for example, to get your product types with a handle of `clothes` you would use:

```twig
{% set clothes = craft.products()
  .type('clothes')
  .all() %}
```

#### Automatic SKU Format

Defines what auto-generated SKUs should look like when a SKU field is submitted empty. You can include Twig tags that output properties, such as `{product.slug}` or `{myCustomField}`.

::: tip
How you access properties in the SKU format depends on whether the product type has variants. If the product type does not have multiple variants, use `{product}`. Otherwise, `{object}` will refer to the variant when the product type has multiple variants.
:::

Be sure to choose this carefully and avoid using the `id` property to ensure a unique SKU.

Since `id` refers to the element’s ID and Craft may have many other elements, this won’t be sequential. If you’d rather generate a unique sequential number, consider using Craft’s [seq()](/5.x/reference/twig/functions.md#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

The following example generates a sequential number, per variant, with the given product slug:

```twig
{{ object.product.slug }}-{{ seq(object.product.slug) }}
```

The resulting variant SKU might be something like `a-new-toga-001`, where `a-new-toga` is the product’s slug and `001` is the first sequential number based on that slug.

::: warning
If a product type has an automatic SKU format, the SKU field is not shown for new variants. Once saved, the field will be displayed for editing.
:::

#### Order Description Format

Describes the product on a line item in an order. It can include tags that output properties, such as `{product.title}` or `{myVariantCustomField}`.

#### Show the Dimensions and Weight fields

Allows you to hide the weight and dimensions fields if they are not necessary for products of this type.

#### Products of this type have multiple variants

If enabled and multiple variants are allowed, a new tab will appear at the top of the page for configuring the variant field layout.

A “Variant Title Format” will also appear for configuring auto-generated variant titles.

::: tip
Once you’ve checked this field, you’ll need to press **Save** in order to see additional settings related to variants.
:::

#### Show the Title field for variants

Whether or not to show the “Variant Title” field when adding or editing variants. When `true` a “Variant Title Field Label” will appear, allowing you to change what the “Variant Title” field label should be.

#### Site Settings

This works just like Craft’s [entry](/4.x/entries.md) URLs, where you can determine the URL for the product type and which template it should use.

::: tip
When a site visitor hits the URL of a product, the `product` variable is automatically available to your templates, just like the `entry` variable for Craft’s entries.
:::



### Templating

#### craft.commerce.productTypes.allProductTypes

Returns an array of all product types set up in the system.

```twig
{% for type in craft.commerce.productTypes.allProductTypes %}
  {{ type.handle }} - {{ type.name }}
{% endfor %}
```

## Querying Products

You can fetch products using product queries.

::: code
```twig
{# Create a new product query #}
{% set myProductQuery = craft.products() %}
```

```php
// Create a new product query
$myProductQuery = \craft\commerce\elements\Product::find();
```

```graphql
# Create a new product query
{
  products {
    # ...
  }
}
```
:::

Once you’ve created a product query, you can set [parameters](#product-query-parameters) on it to narrow down the results, and then [execute it](/4.x/element-queries.md#executing-element-queries) by calling `.all()`. An array of [Product](commerce4:craft\commerce\elements\Product) objects will be returned.

You can also fetch only the number of items a query might return, which is better for performance when you don’t need the variant data.

::: code
```twig
{# Count all enabled products #}
{% set myProductCount = craft.products()
  .status('enabled')
  .count() %}
```
```php
use craft\commerce\elements\Product;

// Count all enabled products
$myProductCount = Product::find()
    ->status(Product::STATUS_ENABLED)
    ->count();
```
```graphql
# Count all enabled products
{
  productCount(status: "enabled")
}
```
:::

::: tip
See [Element Queries](/4.x/element-queries.md) in the Craft docs to learn about how element queries work.
:::

### Example

We can use Twig to display the ten most recent Clothing products:

1. Create a product query with `craft.products()`.
2. Set the [`type`](#type) and [`limit`](#limit) parameters on it.
3. Fetch the products with `.all()`.
4. Loop through the products using a [`for`](https://twig.symfony.com/doc/2.x/tags/for.html) tag to output their HTML.

```twig
{# Create a product query with the 'type' and 'limit' parameters #}
{% set myProductQuery = craft.products()
  .type('clothing')
  .limit(10) %}

{# Fetch the products #}
{% set products = myProductQuery.all() %}

{# Display the products #}
{% for product in products %}
  <h2><a href="{{ product.url }}">{{ product.title }}</a></h2>
  {{ product.summary }}
  <a href="{{ product.url }}">Learn more</a>
{% endfor %}
```

To fetch the same information with GraphQL, we could write a query like this:

```graphql
{
  products(limit: 10, type: "clothing") {
    title
    uri
    ... on clothing_Product {
      summary
    }
  }
}
```

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/4.x/products-variants.md)!!!
