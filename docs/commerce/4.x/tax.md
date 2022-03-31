# Tax

Commerce represents taxes for an order using tax categories, tax rates, and tax zones. Each can be configured from the control panel via **Commerce** → **Tax**.

::: warning
Tax features differ depending on your [edition](editions.md) of Craft Commerce.
:::

You can model common sales tax policies—like those typical in U.S. retail and European Value Added Tax (VAT)—but those aren’t the _only_ types of tax rules that you can model in Commerce. With an understanding of Commerce’s basic taxation concepts you should be able to model the tax rules of your country or jurisdiction.

## Tax Categories

Every product designates a single tax category that determines how it’s taxed:

![Screenshot of product details in the control panel](./images/product-details-category.png)

Commerce creates a default “General” category when it’s installed. Every newly-created product is automatically assigned to that default category, but you can add as many categories as you’d like and designate any one of them as the system-wide default.

To create a new tax category, visit **Commerce** → **Tax** → **Tax Categories** and press **+ New tax category**:

![Screenshot of tax category form with fields for name, handle, description, available product types, and a checkbox to designate the category as the default](./images/new-tax-category.png)

Each new tax category should identify the product types it applies to. A new product will use the first tax category that’s available to it, or fall back on the default category.

::: tip
Every line item must have a tax category, and Commerce will pick the most appropriate one you’ve established. It’s possible your default category will be used for product types that _aren’t_ explicitly selected, if no other tax categories are available.
:::

A tax category may have zero or more [tax rates](#tax-rates), which we’ll explore further below.

### Fetching Tax Categories

You can fetch your site’s tax categories through the [TaxCategories](commerce4:craft\commerce\services\TaxCategories) service:

::: code
```twig
{% set categories = craft.commerce
  .getTaxCategories()
  .getAllTaxCategories() %}
```
```php
$categories = \craft\commerce\Plugin::getInstance()
    ->getTaxCategories()
    ->getAllTaxCategories();
```
:::

This returns an array of [TaxCategory](commerce4:craft\commerce\models\TaxCategory) models. You can use these to work with basic details like the category’s ID, name, and description, as well as related [product types](products-variants.md) and [tax rates](#tax-rates):

```twig
{% foreach categories as taxCategory %}
  {# @var taxCategory craft\commerce\models\TaxCategory #}
  {{ taxCategory.id }}
  {{ taxCategory.name }}
  {{ taxCategory.description }}
  {{ taxCategory.default }}
  {{ taxCategory.productTypes }}
  {{ taxCategory.taxRates }}
{% endforeach %}
```

You can fetch the tax categories for a specific product type using its ID:

::: code
```twig
{% set categories = craft.commerce
  .getTaxCategories()
  .getTaxCategoriesByProductTypeId(123) %}
```
```php
$category = \craft\commerce\Plugin::getInstance()
    ->getTaxCategories()
    ->getTaxCategoriesByProductTypeId(123);
```
:::

In some cases you may need to get a single, specific tax category:

::: code
```twig
{# Get a reference to the service for brevity below #}
{% set taxCategories = craft.commerce.getTaxCategories() %}

{# Get the default tax category #}
{% set category = taxCategories.getDefaultTaxCategory() %}

{# Get tax category with an ID of `123` #}
{% set category = taxCategories.getTaxCategoryById(123) %}

{# Get tax category with a handle of `general` #}
{% set category = taxCategories.getTaxCategoryByHandle('general') %}
```
```php
// Get a reference to the service for brevity below
$taxCategories = \craft\commerce\Plugin::getInstance()
    ->getTaxCategories();

// Get the default tax category
$category = $taxCategories->getDefaultTaxCategory();

// Get tax category with an ID of `123`
$category = $taxCategories->getTaxCategoryById(123);

// Get tax category with a handle of `general`
$category = $taxCategories->getTaxCategoryByHandle('general');
```
:::

### Example

Stores operating in countries like Australia, India, and Canada may need to apply a Goods and Services Tax (GST) to some of the store’s products while others are exempt from that tax.

In that case, you may configure your store with `GST` and `GSTFREE` tax categories with `GST` being the default.

This would mean that all items in your store would get the `GST` tax category, and a store manager could specifically select the `GSTFREE` tax category for each item that should be exempt.

## Tax Rates

A tax rate is a simple percentage that may be applied to relevant cart items. The rate is only applied when an item’s tax category and tax zone qualify it for the rate.

Commerce does not add any tax rates by default; you’ll need to explicitly create any that you’d like to be available.

To create a new tax category, visit **Commerce** → **Tax** → **Tax Rates** and press **+ New tax rate**:

![Screenshot of a new tax rate form with fields for name, code, taxable subject, tax zone, business tax ID disqualification, tax category, and tax rate](./images/new-tax-rate.png)

Every tax rate must specify a single [tax category](#tax-categories) it applies to.

::: tip
Multiple tax rates can apply to a single tax category and/or tax zone.
:::

Specifying a [tax zone](#tax-zones) is optional. By default, a tax rate won’t be limited to a particular zone—meaning it will qualify for any order item based on its tax category alone with no consideration for the order address.

The tax rate also has settings for exactly *what* it applies to and *how* it should be applied:

- **Taxable Subject** determines what part(s) of an item’s price should be taxed
- **Disqualify with valid business tax ID?** allows skipping the tax when certain business tax IDs exist on the order
- **Included in price?** determines whether the rate should be incorporated into the price of the item and whether disqualified items should have their prices adjusted

### Fetching Tax Rates

You can fetch all of your site’s tax rates through the [TaxRates](commerce4:craft\commerce\services\TaxRates) service:

::: code
```twig
{% set rates = craft.commerce
  .getTaxRates()
  .getAllTaxRates() %}
```
```php
$rates = \craft\commerce\Plugin::getInstance()
    ->getTaxRates()
    ->getAllTaxRates();
```
:::

This returns an array of [TaxRate](commerce4:craft\commerce\models\TaxRate) models. You can use these to work with basic details like the rate’s ID, name, code, and rate, as well as related tax zones and categories:

```twig
{% foreach rates as taxRate %}
  {# @var taxRate craft\commerce\models\TaxRate #}
  {{ taxRate.id }}
  {{ taxRate.name }}
  {{ taxRate.code }}
  {{ taxRate.rate }}
  {{ taxRate.taxable }}
  {{ taxRate.getRateAsPercent() }}
  {{ taxRate.getTaxZone() }}
  {{ taxRate.getTaxCategory() }}
  {{ taxRate.getIsEverywhere() }}
{% endforeach %}
```

You can also fetch tax rates for a specific tax zone by providing a zone object or ID:

::: code
```twig
{# Fetch rates for a `zone` we’ve already got #}
{# @var zone craft\commerce\models\TaxAddressZone #}
{% set rates = craft.commerce
  .getTaxRates()
  .getTaxRatesForZone(zone) %}

{# Fetch rates for a tax zone with an ID of `123` #}
{% set rates = craft.commerce
  .getTaxRates()
  .getTaxRatesByTaxZoneId(123) %}
```
```php
// Fetch rates for a `$zone` we’ve already got
/** @var $zone craft\commerce\models\TaxAddressZone **/
$rates = \craft\commerce\Plugin::getInstance()
    ->getTaxRates()
    ->getTaxRatesForZone($zone);

// Fetch rates for a tax zone with an ID of `123`
$rates = \craft\commerce\Plugin::getInstance()
    ->getTaxRates()
    ->getTaxRatesByTaxZoneId(123);
```
:::

In some cases you may need to get a single, specific tax rate by its ID:

::: code
```twig
{# Get tax rate with an ID of `123` #}
{% set rate = craft.commerce
  .getTaxRates()
  .getTaxRateById(123) %}
```
```php
// Get tax zone with an ID of `123`
$taxZones = \craft\commerce\Plugin::getInstance()
    ->getTaxRates()
    ->getTaxRateById(123);
```
:::

## Tax Zones

A tax zone represents a physical area that can be used to influence tax based on an order’s shipping address. 

When an order address falls within that zone, any rates tied to that zone may be factored into tax calculation. An order may have more than one matching tax zone, and all of them will be factored in.

Commerce does not add any tax zones by default. Like tax rates, you’ll need to create any tax zones you’d like to use for your store.

To create a new tax zone, visit **Commerce** → **Tax** → **Tax Zones** and press **+ New tax zone**:

![Screenshot of a new tax zone form with fields for name, description, and an address condition](./images/new-tax-zone.png)

The tax zone consists of a **Name**, **Description**, and an **Address Condition** you can use to define the relevant area. That condition can be as broad or specific as you’d like, from one or more countries to specific administrative areas (like U.S. states) or postal codes. You can also designate a single zone to be used as the default when an order doesn’t have a shipping address.

### Postal Code Formula

One of the Address Condition options is “Postal Code Formula”, previously referred to as the “zip code condition formula”.

This formula is an expression written in [Twig’s expression syntax](https://twig.symfony.com/doc/3.x/templates.html#expressions) that returns `true` or `false`.

This will match if the zip code’s first two characters are `60` or `70`:

```
postalCode[0:2] == '60' or postalCode[0:2] == '70'
```

The will match if the zip code is equal to `NG102`, `NG103`, or `NG104`:

```
postalCode in ['NG102', 'NG103', 'NG104']
```

### Fetching Tax Zones

You can fetch your site’s tax zones through the [TaxZones](commerce4:craft\commerce\services\TaxZones) service:

::: code
```twig
{% set zones = craft.commerce
  .getTaxZones()
  .getAllTaxZones() %}
```
```php
$zones = \craft\commerce\Plugin::getInstance()
    ->getTaxZones()
    ->getAllTaxZones();
```
:::

This returns an array of [TaxAddressZone](commerce4:craft\commerce\models\TaxAddressZone) models. You can use these to work with basic details like the zone’s ID, name, and description and the geographic conditions you’ve established for it:

```twig
{% foreach zones as taxZone %}
  {# @var taxZone craft\commerce\models\TaxAddressZone #}
  {{ taxZone.id }}
  {{ taxZone.name }}
  {{ taxZone.description }}
  {{ taxZone.dateCreated }}
  {{ taxZone.dateUpdated }}
  {{ taxZone.default }}
  {{ taxZone.getCondition() }}
{% endforeach %}
```

In some cases you may need to get a single, specific tax zone by its ID:

::: code
```twig
{# Get tax zone with an ID of `123` #}
{% set zone = craft.commerce
  .getTaxZones()
  .getTaxZoneById(123) %}
```
```php
// Get tax zone with an ID of `123`
$taxZones = \craft\commerce\Plugin::getInstance()
    ->getTaxZones()
    ->getTaxZoneById(123);
```
:::

### Basic Zone Examples

#### Example A

Let’s say you need to charge 5% tax for all items that ship to New York and 6% only on clothing items that ship to Pennsylvania. You’ll need to set up two zones: one for the state of New York, and another for the state of Pennsylvania.

#### Example B

You would like to charge 10% tax on all electronic items and 5% tax on everything else. This tax should apply to all countries in the European Union (EU). In this case you would construct just a single zone consisting of all the countries in the EU. Even though you need to charge two different rates for a product, you don’t necessarily need to have two zones.

## Templating

It’s common to display tax information to a customer in the context of their cart, since applicable taxes may depend on order items and the shipping address. Check out the [cart](https://github.com/craftcms/commerce/blob/main/example-templates/dist/shop/cart/index.twig) in the Commerce [example templates](example-templates.md), which includes taxable totals.

## Further Reading

See [Tax Engines](extend/tax-engines.md) if you’re interested in customizing the Commerce tax system.
