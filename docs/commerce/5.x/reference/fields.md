# Fields

Commerce adds two new [relational fields](/5.x/system/relations.md) for you to use in your content model. These fields enable seamless merchandising (embedding products into other content) and support advanced product organization (categorizing or tagging products for browsing and applying [pricing rules](../system/pricing-rules.md)).

::: tip
Consider how you can leverage product and variant fields for Commerce’s [discount](../system/discounts.md) and [catalog pricing](../system/pricing-rules.md) matching
:::

## Products Field

_Products_ fields allow authors to relate [products](../system/products-variants.md#products) to other elements. The selected products can be accessed via that field’s handle, or using the `.relatedTo()` param in a product query.

Commerce Products fields have the following settings, which are analogous to Craft’s built-in relational fields:

- **Sources** — Select the product types you want to relate entries from. (Default is “All”.)
- **Min Relations** — Set a minimum number of products that must be selected. (Default is none.)
- **Max Relations** — Set a maximum number of products that can be selected. (Default is no limit.)
- **View Mode** — Display the related products as [chips or cards](/5.x/system/elements.md#chips-cards).
- **Selection Label** — Customize the label for the field’s selection button. (Default is “Add a product”.)
- **Validate related products** — Choose whether validation errors on selected products should prevent the source element from being saved. (Default is un-checked.)

Expanding the **Advanced** section, you have 

- **Allow self relations** — Allow the source element to select itself in this field (if the field is attached to a product’s field layout).
- **Relate products from a specific site?** — Only allow selection of products from a single, specific site.
- **Show the site menu** — Whether the selection modal will show a site-selection menu. This is only available when the **Relate products from a specific site?** setting is _off_.
- **Manage relations on a per-site basis** — Control whether relations are set per-site, or propagate to all sites.

### Authoring Experience

Products fields have a nearly identical interface to the [built-in relational fields](/5.x/system/relations.md) for selection.

### Templating

If you have an element with a products field in your template, you can access the related products via the field’s handle:

```twig
{% set products = entry.myProductFieldHandle %}
```

As with other relational fields, this returns a [product query](../system/products-variants.md#querying-products) prepped to fetch the related product elements. You can call `.all()` to [execute](/5.x/development/element-queries.md#executing-element-queries) the query, or narrow the results with other query methods.

To discover elements on one end or another of a relationship established via a products field, use [the `.relatedTo()` query param](/5.x/system/relations.md#the-relatedto-parameter). Assuming you have a `blog` section that allows authors to highlight featured products…

```twig
{% set productPosts = craft.entries()
  .section('blog')
  .relatedTo({
    targetElement: product,
    field: 'featuredProduct',
  })
  .all() %}
```

…adding this query to your product template gives you access to posts that point to the current product.

::: tip
See [Relations](/5.x/system/relations.md) for more info on the `relatedTo` param, or read more about what’s possible with [element queries](/5.x/development/element-queries.md).
:::

## Variants Field

Variants fields behave almost identically to [products fields](#products-field), except they directly relate specific variant elements.

Unlike the products field, however, you cannot create variants directly from the element selection modal—variants are always created within the context of a product, which we don’t have, in this view.

## Link Field <Since product="commerce" ver="5.1.0" feature="Selecting product elements in Craft’s Link field" />

When configuring Craft’s native [Link field](/5.x/reference/field-types/link.md), you can enable selection of Commerce products.
