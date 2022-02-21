---
sidebarDepth: 2
---
# Products & Variants

A _product_ is an [element](/4.x/elements.md) that describes what’s for sale. A _variant_ is the [purchasable](purchasables.md) the customer ultimately orders.

## Products

Products are the items available in your store.

A product itself is never sold; what goes into a cart for purchase is actually one of the product’s [variants](#variants). In the Craft control panel, you’ll see Products listed by Product Type.

![Diagram depicting Product with common fields and its relationship to one or more Variants](./assets/product-variant.png)

In the same way that all Craft CMS entries have common fields, Craft Commerce products have some of their own:

- **Title**, **Slug**, **Post Date**, **Expiry Date**, and **Enabled** work just like they do in Craft [entries](../../4.x/entries.md).
- **Free Shipping**, when enabled, excludes the product and its variants from an order’s shipping cost calculation. (This only impacts per-*item*—and not per-*order*—shipping costs.)
- **Promotable** determines whether [sales](sales.md) and [discounts](discounts.md) can be applied to the product and its variants.
- **Available for purchase** determines whether the product and its variants should be available for purchase on the front end.
- **Tax** and **Shipping** allow you to designate the product’s [tax](tax.md) and [shipping](shipping.md) category respectively.

## Product Types

Product Types are a way to distinguish products in your system. Similar to Craft’s [Entry Types](/4.x/entries.html#entry-types), they can determine the URL format of a product and include any number of custom fields. Each product type will also have one or more variants.

You can manage Product Types in the control panel from **Commerce** → **System Settings** → **Product Types**.

<img src="./assets/product-type-entry-screen.png" width="797" alt="Edit Product Type page">

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

#### Title Field Label

Allows you to change what the “Title” field label should be.

#### Automatic SKU Format

Defines what auto-generated SKUs should look like when a SKU field is submitted empty. You can include Twig tags that output properties, such as `{product.slug}` or `{myCustomField}`.

::: tip
How you access properties in the SKU format depends on whether the product type has variants. If the product type does not have multiple variants, use `{product}`. Otherwise, `{object}` will refer to the variant when the product type has multiple variants.
:::

Be sure to choose this carefully and avoid using the `id` property to ensure a unique SKU.

Since `id` refers to the element’s ID and Craft may have many other elements, this won’t be sequential. If you’d rather generate a unique sequential number, consider using Craft’s [seq()](https://craftcms.com/docs/4.x/dev/functions.html#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

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

#### Show the Title field for variants

Whether or not to show the “Variant Title” field when adding or editing variants. When `true` a “Variant Title Field Label” will appear, allowing you to change what the “Variant Title” field label should be.

#### Products of this type have their own URLs

This works just like Craft’s [entry](https://craftcms.com/docs/4.x/entries.html) URLs.

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

Once you’ve created a product query, you can set [parameters](#product-query-parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/4.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Product](commerce3:craft\commerce\elements\Product) objects will be returned.

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
See [Element Queries](https://craftcms.com/docs/4.x/element-queries.html) in the Craft docs to learn about how element queries work.
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

## Product Query Parameters

Product queries support the following parameters:

<!-- BEGIN PRODUCTQUERY_PARAMS -->

<!-- END PRODUCTQUERY_PARAMS -->

## Variants

A variant describes the individual properties of a product as an item that may be purchased.

Those properties inclue a SKU, price, and dimensions. Even if a product doesn’t appear to have any variants in the control panel, it still uses one *default variant* behind the scenes.

Let’s compare examples of a single-variant an multi-variant product: a paperback book and a t-shirt.

A book sold in only one format does not have meaningful variations for the customer to choose, but it would still have a specific SKU, price, weight, and dimensions. A single, implicit default variant needs to exist and that’s what would be added to the cart.

A t-shirt, on the other hand, would have at least one variant for each available color and size combination. You wouldn’t sell the t-shirt without a specific color and size, so multiple variants would be necessary. If the shirt came in “small” and “large” sizes and “red” or “blue” colors, four unique variants could exist:

- small, red
- small, blue
- large, red
- large, blue

### Variant Properties

Each variant includes the following unique properties:

| Property      | Type                | Required?      |
| ------------- | ------------------- | -------------- |
| SKU           | string              | <check-mark /> |
| Price         | number              | <check-mark /> |
| Stock         | number or unlimited | <check-mark /> |
| Allowed Qty   | range               |                |
| Dimensions    | number (l × w × h)  |                |
| Weight        | number              |                |
| Related Sales | relationship (Sale) |                |

Each variant may also have any number of custom fields to allow other distinguishing traits.

Commerce does not automatically create every possible unique variant for you—that’s up to the store manager.

### Default Variant

Every product has a default variant. Whenever a product is created, a default variant will be created as well.

If a product type has multiple variants enabled, the author can choose which one should be used by default. Products that do not have multiple variants still have a default variant, but the author can’t add additional variants.

For a single-variant product, variant details are shown in a unified view with custom product fields:

![Single-Variant Product](./assets/single-variant.png)

When a product supports multiple variants, the default variant will be identified in a **Variants** field where more variants can be added:

![Multi-Variant Product](./assets/multi-variant.png)

### Variant Stock

Variants can have unlimited stock or a specific quantity.

A finite stock amount will automatically be reduced whenever someone completes an order, until the stock amount reaches zero. At that point the variant’s “Available for purchase” setting won’t be changed, but zero-stock variants cannot be added to a cart.

For returns or refunds that aren’t ultimately delivered to the customer, you’ll need to either manually update product stock or use [the `orderStatusChange` event](extend/events.md#orderstatuschange) to automate further stock adjustments.

## Querying Variants

You can fetch variants using **variant queries**.

::: code
```twig
{# Create a new variant query #}
{% set myVariantQuery = craft.variants() %}
```
```php
// Create a new variant query
$myVariantQuery = \craft\commerce\elements\Variant::find();
```
```graphql
# Create a new variant query
{
  variants {
    # ...
  }
}
```
:::

Once you’ve created a variant query, you can set [parameters](#variant-query-parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/4.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Variant](commerce3:craft\commerce\elements\Variant) objects will be returned.

You can also fetch only the number of items a query might return, which is better for performance when you don’t need the variant data.

::: code
```twig
{# Count all enabled variants #}
{% set myVariantCount = craft.variants()
    .status('enabled')
    .count() %}
```
```php
use craft\commerce\elements\Variant;

// Count all enabled variants
$myVariantCount = Variant::find()
    ->status(Variant::STATUS_ENABLED)
    ->count();
```
```graphql
# Count all enabled variants
{
  variantCount(status: "enabled")
}
```
:::

::: tip
See [Element Queries](https://craftcms.com/docs/4.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

### Example

We can display a specific variant by its ID in Twig by doing the following:

1. Create a variant query with `craft.variants()`.
2. Set the [`id`](#id) parameter on it.
3. Fetch the variant with `.one()`.
4. Output information about the variant as HTML.

```twig
{# Get the requested variant ID from the query string #}
{% set variantId = craft.app.request.getQueryParam('id') %}

{# Create a variant query with the 'id' parameter #}
{% set myVariantQuery = craft.variants()
    .id(variantId) %}

{# Fetch the variant #}
{% set variant = myVariantQuery.one() %}

{# Make sure it exists #}
{% if not variant %}
    {% exit 404 %}
{% endif %}

{# Display the variant #}
<h1>{{ variant.title }}</h1>
<!-- ... -->
```

Fetching the equivalent with GraphQL could look like this:

```graphql
# Fetch variant having ID = 46
{
  variants(id: 46) {
    title
  }
}
```

## Variant Query Parameters

Variant queries support the following parameters:

<!-- BEGIN VARIANTQUERY_PARAMS -->

<!-- END VARIANTQUERY_PARAMS -->
