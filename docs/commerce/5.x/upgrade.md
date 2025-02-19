---
related:
  - uri: /5.x/upgrade.md
    label: Upgrading to Craft 5
---

# Upgrading from Commerce 4

Commerce 5 introduces powerful multi-store functionality and transforms the product management experience.

::: warning
If you’re currently running Commerce 3, you’ll need to follow the [Commerce 4 upgrade guide](/commerce/4.x/upgrading.md), first.
:::

## Preparing for the Upgrade

Before you begin, make sure that you have…

- …updated to the latest version of Craft 4 and Commerce 4;
- …familiarized yourself with the [Craft 5 upgrade process](/5.x/upgrade.md);
- …reviewed [the changelog](https://github.com/craftcms/commerce/blob/5.0/CHANGELOG.md) and changes further down this page;
- …resolved all deprecation warnings from Commerce 4 that need fixing;
- …backed up your database and files, in case anything goes awry;

Once you’ve completed these steps, you’re ready to begin the upgrade process.

::: tip
If you are coming from Commerce 3 in two stages, run the [Commerce 4 upgrade command](/commerce/4.x/upgrading.md#performing-the-upgrade) to migrate customer data _before_ continuing to Commerce 5!
:::

## Performing the Upgrade

The Commerce 5 happens at the same time you [upgrade to Craft 5](/5.x/upgrade.md). As you alter version constraints in `composer.json`, set `craftcms/commerce` to `^5.0.0-beta.1`.

<See path="/5.x/upgrade.md" />

Commerce migrations will run just after Craft’s, and content for your products and variants will be moved into the new storage architecture. Once you’re running the latest version of Craft Commerce, you’ll need to update your templates and any custom code relevant to the topics detailed below.

## Products + Variants

The way you interact with products and variants has changed in some subtle, non-breaking ways.

### Nested Elements

Variants take advantage of Craft 5’s new _nested elements_ system, meaning they are managed via an embedded element index as a table or cards. Products with many variants benefit from search, filtering, pagination, sorting, and customizable previews.

During the upgrade, variants will be automatically migrated to this new structure. To clarify this relationship, we are deprecating <commerce5:craft\commerce\elements\Variant::getProduct()> in favor of the underlying element class’s [getOwner()](craft5:craft\base\Element::getOwner()) method:

```twig
{% set smallThings = craft.variants()
  .weight('< 1')
  .with(['owner'])
  .all() %}

<ul>
  {% for smallThing in smallThings %}
    <li>{{ smallThing.getOwner().title }}: {{ smallThing.title }}</li>
  {% endfor %}
</ul>
```

### Product Types

Product types now have a **Maximum Variants** setting that replaces the `hasVariants` setting. During the upgrade, product types that had `hasVariants` _off_ were given a `maxVariants` of `1`. Logic based on a product type’s configuration may need to be updated:

::: code
```twig{1} Old
{% if product.type.hasVariants %}
  <select name="purchasableId">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}">{{ variant.title }}</option>
    {% endfor %}
  </select>
  {# ... #}
{% else %}
  <button name="purchasableId" value="{{ product.defaultVariantId }}">Add to Cart</button>
{% endif %}
```
```twig{1} New
{% if product.type.maxVariants > 1 %}
  <select name="purchasableId">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}">{{ variant.title }}</option>
    {% endfor %}
  </select>
  {# ... #}
{% else %}
  <button name="purchasableId" value="{{ product.defaultVariantId }}">Add to Cart</button>
{% endif %}
```
:::

### Field Layouts

The interface for single-variant products is the same as multi-variant products, so you may now use product _and_ variant field layouts at the same time. This also means that _all_ purchasable information is transparently edited via a variant (rather than it appearing within the sidebar of the product edit screen).

To give you more flexibility over how built-in variant attributes are managed, fields that were previously in the product’s sidebar (or a split view of the inline variant editor) are now discrete field layout elements. Use the **Variant Fields** tab in any product type edit screen to arrange these in a way that makes sense for your store.

## Multi-Store

Commerce now supports multiple storefronts, each with unique configuration.

<See path="system/stores.md" />

A number of settings have moved from the “global” space into the context of individual stores:

- `autoSetNewCartAddresses`
- `autoSetCartShippingMethodOption`
- `autoSetPaymentSource`
- `allowEmptyCartOnCheckout`
- `allowCheckoutWithoutPayment`
- `allowPartialPaymentOnCheckout`
- `requireShippingAddressAtCheckout`
- `requireBillingAddressAtCheckout`
- `requireShippingMethodSelectionAtCheckout`
- `useBillingAddressForTax`
- `validateOrganizationTaxIdAsVatId`
- `orderReferenceFormat`
- `freeOrderPaymentStrategy`
- `minimumTotalPriceStrategy`

If you had previously used these in your `config/commerce.php` file, they will be ignored. During the upgrade, Commerce copies each setting onto the new default/primary store, and saves them in [project config](/5.x/system/project-config.md). To review or update these settings, visit <Journey path="Commerce, System Settings, Stores, Primary" />.

The singular `store` service has been deprecated. In its place, the `stores` service provides access to information about all the configured stores. Calls to `craft.commerce.store.store` should be replaced with the new global `currentStore` variable, or an explicit call via the new service:

::: code
```twig Old
{# Get the store’s address: #}
{% set address = craft.commerce.store.store.getLocationAddress() %}
```
```twig New
{# Get the current store’s address: #}
{% set address = currentStore.settings.locationAddress %}

{# ...or... #}
{% set store = craft.commerce.stores.getStoreByHandle('store-eu') %}
{% set address = store.settings.locationAddress %}
```
:::

Non-project config settings (like the order condition formula and [markets](system/stores.md#markets)) are now accessible via a dedicated [StoreSettings](commerce5:craft\commerce\models\StoreSettings) model:

```twig
{% set allowedCountries = currentStore.settings.countriesList %}

{% if cart.shippingAddress.countryCode not in countries|keys %}
  <p>Sorry, we don’t fulfill orders to or from {{ countries[cart.shippingAddress.countryCode].name }}!</p>
{% endif %}
```

## Prices

Commerce 5 changes how pricing, sales, and discounts work. [Variants](system/products-variants.md) now define a **Price** and a **Promotional Price**, with variations handled via [catalog pricing rules](system/pricing-rules.md).

This differs from the previous sales engine in a couple of fundamental ways:

- Prices are pre-computed for each possible combination of purchasable (and customer, if applicable);
- The final price and promotional price (previously the “sale price”) can be used for filtering and sorting element queries;

A pricing rule either _sets_ or _reduces_ the price (or promotional price) of a purchasable based on its original price (or promotional price). You can even configure rules that cross-populate prices and promotional prices—like setting the normal price to the promotional price for customers in certain user group, then taking an additional percentage off the original promotional price.

Commerce will try and keep your pricing up-to-date, but some events (like a user being removed from a group) can cause brief inconsistencies. To ensure the pricing catalog remains accurate, add a daily CRON task:

```
0 0 * * * /usr/bin/env php /path/to/craft commerce/catalog-pricing/generate
```

<See path="system/pricing-rules.md" label="Catalog Pricing" description="Read more about the new pricing engine." />

### Sales

Upgraded projects that had at least one [sale](system/sales.md) configured will retain access to the sales feature. New projects, however, only have access to the new [catalog pricing](system/pricing-rules.md) engine.

Until you’ve cleared out _all_ existing sales, the **Pricing Rules** tab will be hidden from the **Store Management** navigation. Inversely, if a store has _no_ sales (as is the case with fresh installs), the **Sales** tab will be hidden.

## Templates

We expect minimal impact to front-end templates, for most projects. Single-store installations will function almost identically, before and after the upgrade.

### Global Variables

A new `currentStore` variable is available in all templates, containing a reference to the <commerce5:craft\commerce\models\Store> for the current _site_.

### Properties & Methods

Some properties and methods have been moved from products to variants (along with their corresponding [query](#queries) methods):

- `craft\commerce\elements\Product::hasUnlimitedStock()` is deprecated. Check each variant’s `inventoryTracked` property, instead:
    ```twig
    {% set hasVariantWithUntrackedStock = product.variants.contains('inventoryTracked', true) %}
    ```
- `craft\commerce\elements\Variant::getProduct()` has been deprecated in favor of the nested element interface’s `getOwner()` method. `getProduct()` will continue to work throughout the 5.x lifecycle.
- `craft\commerce\elements\Product::getVariants()` now returns a special type of [collection](/5.x/development/collections.md). See the `hasUnlimitedStock` replacement, above, for an example of how this can be used.

## Queries

Some [product query](system/products-variants.md#querying-products) params have been moved to _variant_ queries to agree with their shift to the base <commerce5:craft\commerce\base\Purchasable> class, but their accepted arguments remain the same:

- `shippingCategory()`
- `shippingCategoryId()`
- `taxCategory()`
- `taxCategoryId()`
- `availableForPurchase()`

If you are using any of these parameters in product queries, you may need to replace them with `hasVariant()`, and pass a variant query with those params:

::: code
```twig{4} Old
{% set perishableShippingCategory = craft.commerce.shippingCategories.getShippingCategoryByHandle('perishable') %}

{% set perishableGoods = craft.products()
  .shippingCategory(perishableShippingCategory)
  .all() %}
```
```twig{4-6} New
{% set perishableShippingCategory = craft.commerce.shippingCategories.getShippingCategoryByHandle('perishable') %}

{% set perishableGoods = craft.products()
  .hasVariant({
    shippingCategory: perishableShippingCategory,
  })
  .all() %}
```
:::

Variant queries’ `hasUnlimitedStock()` param (inherited from [PurchasableQuery](commerce5:craft\commerce\elements\Purchasable)) has also been deprecated—use the new `inventoryTracked()` param, instead. Note that the meaning of the boolean param has inverted, as well: when querying for variants with “unlimited” or _untracked_ inventory, `hasUnlimitedStock(true)` translates to `inventoryTracked(false)`.

## Console Commands

Commerce 5 adds one new [console command](reference/console-commands.md), to help keep catalog pricing up-to-date:

`commerce/pricing-catalog/generate`
:   Fully regenerates pricing data for all purchasables.

## API Changes

To support multi-store functionality and the new pricing catalog, there are a number of breaking API changes. Review these and other deprecations in the [changelog](repo:craftcms/commerce/blob/5.0/CHANGELOG.md).

### Hooks

With the adoption of the universal element editor, some template hooks have been removed:

- `cp.commerce.product.edit.content`
- `cp.commerce.product.edit.details`
