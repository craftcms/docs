# Tax

Commerce represents taxes for an order with tax categories and tax rates.

Products within Commerce can be linked to tax categories, which are then used to influence the taxation rate for products when they’re purchased. A default tax category can be set for the entire system, applying automatically to any product that isn’t assigned to a specific tax category.

A tax category may have many tax rates. Each tax rate indicates the rate at which products in its tax category will be taxed. Each tax rate matches all tax zones by default, but can optionally specify a specific tax zone.

When an order is placed for a specific zone, any of the order’s products with a tax zone that matching the order’s tax zone will be taxed.

The standard sales tax policies commonly found in the USA can be modeled, as well as European VAT (Value Added Tax).
These are not the only types of tax rules that you can model in Commerce.
Once you obtain a sufficient understanding of the basic concepts you should be able to model the tax rules of your country or jurisdiction.

## Tax Categories

Every product in your store has a tax category. This allows the tax engine to select to apply the correct tax for the tax category.
For example you may make the following tax categories:

- GST
- GSTFREE

By default all items in your store would get the GST tax category, but at various times, an author may choose to mark a product as GST tax free.

## Tax Zone

The tax engine also looks at the shipping address of the order, to determine which tax rate applies. We create tax zones which define a geographic area a shipping address could fall into.

Tax Zones are either country based (match the shipping address to the list of countries in the zone) or state based (match the shipping address to the list of states in the zone). In addition to an address
matching a country or state, a zip code condition formula can be added.

### Zip code condition formula

A zip code condition formula is a short expression of logic that returns either `true` or `false`. The expression syntax is [powered by Twig](https://twig.symfony.com/doc/2.x/templates.html#expressions).

The zip code condition will match if the zip code has `60` or `70` as it’s first 2 characters:

```
zipCode[0:2] == '60' or zipCode[0:2] == '70'
```

The zip code condition will match if the zip code is any of the above values:

```
zipCode in ['NG102', 'NG103', 'NG102']
```

## Tax Rate

The tax rate simply is a percentage rate of tax that is applied to items in the cart. The rate is only applied if both the tax category and tax zone matches the current item and order address respectively.
Tax rates also contain other important information.

- Whether product prices are inclusive of this tax
- The zone in which the order address must fall within
- The tax category that a product must belong to in order to be considered taxable.

Commerce will calculate tax based on the best matching zone for the order.
It’s also possible to have more than one applicable tax rate for a single zone.
In order for a tax rate to apply to a particular product, that product must have a tax category that matches
the tax category of the tax rate.

## Basic Example

Let’s say you need to charge 5% tax for all items that ship to New York and 6% on only clothing items that ship to Pennsylvania. This will mean you need to construct two different zones: one zone containing just the state of New York and another zone consisting of the single state of Pennsylvania.

Here’s another hypothetical scenario. You would like to charge 10% tax on all electronic items and 5% tax on everything else. This tax should apply to all countries in the European Union (EU). In this case you would construct just a single zone consisting of all the countries in the EU.
The fact that you want to charge two different rates depending on the type of good does not mean you need two zones.
