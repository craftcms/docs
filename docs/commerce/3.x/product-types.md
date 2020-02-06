# Product Types

Product Types are a way to distinguish products in your system. They can determine the URL format of a product, and also determine if the products has multiple variants, as well as configure other behaviors of the products.

You can also attach fields, and tab layouts to products and variants at the product type level, like you can with Craft’s entry types.

<img src="./assets/product-type-entry-screen.png" width="797" alt="Edit Product Type page">

## Product Type Options

### Name

This is the name of the product type as displayed in the control panel.

### Handle

The handle is how you will reference the product type in code. For example, in twig, to get product types with a handle of `clothes`, you would do:

```twig
{% set clothes = craft.products.type('clothes').all() %}
```

### Title Field Label

This setting allows you to change what the "Title" field label should be.

### Automatic SKU Format

What the unique auto-generated SKUs should look like, when a SKU field is submitted without a value. You can include tags that output properties, such as `{product.slug}` or `{myCustomField}`

::: tip
The way you access properties within the SKU format will differ depending on whether or not the product type has variants. If your product type has multiple variants, then the SKU formats default `object` is the variant, otherwise it’s the product.
:::

::: warning

If a product type has an automatic SKU format the SKU field is not shown for new variants. Once saved the field will be shown to allow editing.

:::

### Order Description Format

How this product will be described on a line item in an order. You can include tags that output properties, such as `{product.title}` or `{myVariantCustomField}`

### Show the Dimensions and Weight fields

Allows you to hide the weight and dimensions fields if they are not necessary for products of this type.

### Products of this type have multiple variants

If you enable the product type to have multiple variants, you will see a new tab appear at the top of the page which allows you to configure the variant field layout.

You also have the option to show the title input field or have it default to use a Title Format.

### Show the Title field for variants

Whether or not to show the "Variant Title" field when adding or editing variants. When true there is the further option to set the "Variant Title Field Label", this allows you to change what the "Variant Title" field label should be.

If you are decide to not sure the "Variant Title" field you have the option to set the "Variant Title Format" allowing you to set the format for auto-generating variant titles. You can include tags that output variant properties, such as `{sku}` or `{myVariantsCustomField}`.

### Products of this type have their own URLs

This works the same way the standard Craft [entry sections](https://craftcms.com/docs/sections-and-entries) work.

::: tip
When a site visitor hits the URL of a product, the `product` variable is automatically available to your templates, just like the `entry` variable for standard craft entries.
:::
