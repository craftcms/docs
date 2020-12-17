# Tax

Commerce represents taxes for an order with tax categories and tax rates.

::: warning
Tax features differ depending on your [edition](editions.md) of Craft Commerce.
:::

Products within Commerce can be linked to tax categories, which are then used to influence the taxation rate for products when they’re purchased. A default tax category can be set for the entire system, applying automatically to any product that isn’t assigned to a specific tax category.

A tax category may have many tax rates. Each tax rate indicates the rate at which products in its tax category will be taxed. Each tax rate matches all tax zones by default, but can optionally specify a specific tax zone.

When an order is placed for a specific zone, any order products with a tax zone that matching the order’s tax zone will be taxed.

While standard sales tax policies can be modeled—like those common in the USA and European VAT (Value Added Tax)—these are not the _only_ types of tax rules that you can model in Commerce. With an understanding of Commerce’s basic taxation concepts you should be able to model the tax rules of your country or jurisdiction.

## Tax Categories

Tax categories ensure that every product in your store may have its tax amount calculated properly by the tax engine.

For example you may make the following tax categories:

- GST
- GSTFREE

By default, all items in your store would get the GST tax category. For various reasons, however, an author may choose to mark a product as GSTFREE.

## Tax Zone

The tax engine also looks at the shipping address of the order to determine the applicable tax rate. We create tax zones to define geographic areas that encapsulate different shipping addresses.

Tax zones are either country-based, matching the shipping address to the list of countries in the zone, or state-based, matching the shipping address to the list of states in the zone. A zip code condition formula may be used to flexibly match postal codes as well.

### Zip code condition formula

A zip code condition formula is an expression written in [Twig’s expression syntax](https://twig.symfony.com/doc/2.x/templates.html#expressions) that returns `true` or `false`.

This will match if the zip code’s first two characters are `60` or `70`:

```
zipCode[0:2] == '60' or zipCode[0:2] == '70'
```

The will match if the zip code is equal to `NG102`, `NG103`, or `NG102`:

```
zipCode in ['NG102', 'NG103', 'NG102']
```

## Tax Rate

The tax rate is a simple percentage rate of tax that is applied to items in the cart. The rate is only applied if both the tax category and tax zone matches the current item and order address respectively.

Tax rates also contain other important information:

- Whether product prices are inclusive of this tax
- The zone within which the order address must reside
- The tax category that product must belong to in order to be considered taxable

Commerce will calculate tax based on the best matching zone for the order. It’s also possible to have more than one applicable tax rate for a single zone. In order for a tax rate to apply to a particular product, that product must have a tax category that matches the tax category of the tax rate.

## Basic Examples

Let’s say you need to charge 5% tax for all items that ship to New York and 6% only on clothing items that ship to Pennsylvania. This will means you need to set up two zones: one for the state of New York, and another for the state of Pennsylvania.

Here’s another hypothetical scenario. You would like to charge 10% tax on all electronic items and 5% tax on everything else. This tax should apply to all countries in the European Union (EU). In this case you would construct just a single zone consisting of all the countries in the EU. Even though you need to charge two different rates for a product, you don’t necessarily need to have two zones.

## Templating

### craft.commerce.taxCategories.allTaxCategories

Returns an array of all tax categories set up in the system.

```twig
{% for taxCategory in craft.commerce.taxCategories.allTaxCategories %}
    {{ taxCategory.id }} - {{ taxCategory.name }}
{% endfor %}
```
