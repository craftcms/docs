---
sidebarDepth: 2
containsGeneratedContent: yes
---

# Products & Variants

Your product catalog in Commerce is represented by a pair of [element types](/5.x/system/elements.md).

- [Products](#products) are the top-level container for goods and content.
- [Variants](#variants) represent individual [purchasable](purchasables.md) goods that are ultimately added to carts.

Every _product_ must have one or more _variants_, and every _variant_ belongs to a single _product_.

<Block label="Product & Variant Architecture">

To illustrate the relationship between products and variants, consider the needs of a store that sells apparel.

A particular pair of tennis shoes is available in two colors, and in U.S. half-size increments from 6 to 12. The **product** we’re describing might have a name like “Court Balance DX,” while the **variants** represent each intersection of a color and size. This is both a key discovery tool (customers need to find shoes that fit their feet and style), _and_ a necessary business tool for the store owner (tracking inventory, accounting for shipping weight, visualizing sales).

In this example, the product would hold all the marketing information like text, photos, and graphics, while the variants represent unique, saleable _variations_. Customers shop for a shoe that is aligned with their needs and tastes, but _buy_ a specific size and color.

</Block>

## Products

Products organize your goods into logical bundles of [variants](#variants). A product itself is never actually purchased—what goes into a cart for purchase is one of the product’s [variants](#variants). In this way, the product is free to house some globally-relevant attributes or content, while the variants describe specific physical or digital items.

In the same way that Craft’s native element types each share a set of common attributes, every Commerce product has a **Title**, **Slug**, **Post Date**, **Expiry Date**, and per-site status options.

## Product Types

**Product Types** provide a way to distinguish classes of goods in your stores. Manage product types in the control panel from <Journey path="Commerce, System Settings, Product Types" />.

::: warning
Despite their similarities to [entries](/5.x/reference/elements/entries.md#entry-types), a product’s type cannot be changed after it is created.
:::

### Product Type Options

Each product type has the following settings.

Name
:   The name of the product type as displayed in the control panel. Customers only see this if you explicitly output it in the front-end (or in an email or PDF).

Handle
:   The handle is what you’ll use to reference the product type in code. In Twig, you would query for products with the `clothes` type like this:

    ```twig
    {% set clothes = craft.products()
      .type('clothes')
      .all() %}
    ```

Versioning
:   Enable versioning to queue and revert product content changes with Craft’s drafts and revisions system.

Titles
:   When enabled, each product will require a **Title**. Disable this if you’d like to generate titles with an [object template](/5.x/system/object-templates.md), using values of other attributes or fields.

Automatic SKU Format
:   Defines what auto-generated SKUs should look like when a variant’s **SKU** field is left empty. This setting is an [object template](/5.x/system/object-templates.md), meaning it can include dynamic values such as `{product.slug}` or `{myCustomField}`.

    ::: tip
    The SKU format is always evaluated in the context of a _variant_, so product attributes must be prefixed with `product`, like `{product.myCustomField}`.
    :::

    Commerce requires that SKUs are unique across all variants in the system—including anything in the trash, so avoid using static or ambiguous values (like `PLACEHOLDER`) that are apt to collide when first saving a variant.

Order Description Format
:   Identifies a variant in the cart. Like the SKU format, this is also an [object template](/5.x/system/object-templates.md), and gets rendered in the context of a variant. It can include tags that output properties, such as `{product.title}` or `{myVariantCustomField}`.

    The rendered string is ultimately stored in a line item’s `description` attribute. Changing a description format after an order has been completed does *not* apply retroactively.

Max Variants
:   To limit products of this type to a single variant, use `1` in this field, or leave it blank for no limit.

Show the Dimensions and Weight fields
:   Allows you to hide the weight and dimensions fields if they are not necessary for products of this type.

Show the Title field for variants
:   Whether or not to show the “Variant Title” field when adding or editing variants. When `true` a “Variant Title Field Label” will appear, allowing you to change what the “Variant Title” field label should be.

Site Settings
:   Like [entries](/5.x/reference/element-types/entries.md), products provide site-specific routing settings. When a customer visits a product’s URL in a given site, Commerce renders the specified template with a special `product` variable.

#### Tax & Shipping

The second tab in a product type’s settings screen is strictly informational—it displays a list of **Shipping Categories** and **Tax Categories** (from the **Store Management** area) that can be selected from _variants_ of current product type.

::: tip
Product types are defined globally, but shipping and tax categories are defined per-store.
:::

#### Product Fields

Every product type’s authoring experience can be tailored to its needs through a [field layout](/5.x/system/fields.md). Consider what content belongs on a product and what belongs on a [variant](#variant-fields).

A product’s field layout _must_ include the special **Variants** field layout element, which controls where the nested element management interface lives.

#### Variant Fields

In addition to fields associated with a product, the product type defines what fields are available to its nested variants.

### Templating

There are a ton of ways to leverage your product types and product data in templates. Keep in mind that the custom fields available to each product type may differ—but they’re accessed exactly the same way as you would with any other element type!

#### Displaying a Product Type

Every product has access to its product type definition via a `type` attribute:

```twig
<ul class="breadcrumbs">
  <li><a href="{{ siteUrl }}">Home</a></li>
  <li><a href="{{ siteUrl('shop') }}">Shop</a></li>
  <li><a href="{{ siteUrl("shop/#{product.type.handle}") }}">{{ product.type.name }}</a></li>
</ul>

<h2>{{ product.title }}</h2>
```

This example generates a URL to an “index” for a product type—but requires that we set up a corresponding route that maps it to a template:

```php
return [
    // ...
    'shop/<productType:{slug}>' => ['template' => '_shop/product-type'],
];
```

#### Listing Product Types

Returns an array of all product types set up in the system.

```twig
{% for type in craft.commerce.productTypes.allProductTypes %}
  {{ type.handle }} - {{ type.name }}
{% endfor %}
```

### Querying Products

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

Once you’ve created a product query, you can set [parameters](#product-query-parameters) on it to narrow down the results, and then [execute it](/5.x/development/element-queries.md#executing-element-queries) by calling `.all()`. An array of [Product](commerce5:craft\commerce\elements\Product) elements will be returned.

::: tip
See [Element Queries](/5.x/development/element-queries.md) in the Craft docs to learn about how element queries work.
:::

### Example

We can use Twig to display the ten most recently-added Clothing products:

1. Create a product query with `craft.products()`.
2. Set the [`type`](#type) and [`limit`](#limit) parameters on it.
3. Fetch the products with `.all()`.
4. Loop through the products using a [`for`](https://twig.symfony.com/doc/3.x/tags/for.html) tag to output their HTML.

```twig
{# Create a product query with the 'type' and 'limit' parameters #}
{% set newProducts = craft.products()
  .type('clothing')
  .limit(10)
  .all() %}

{# Display the products #}
{% for product in newProducts %}
  <h2><a href="{{ product.url }}">{{ product.title }}</a></h2>
  {{ product.summary|md }}
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
!!!include(docs/.artifacts/commerce/5.x/products-variants.md)!!!

## Variants

::: tip
Hey, we’re still consolidating some resources into this section. Come back soon!
:::
