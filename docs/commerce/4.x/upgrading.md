# Upgrading to Commerce 4

Commerce 4 brings the power of element types to customers and addresses and incorporates new Craft 4 features.

Address and Customer models have gone away, replaced by [Address](craft4:craft\elements\Address) and [User](craft4:craft\elements\User) elements. Thanks to the now-integrated [commerceguys/addressing](https://github.com/commerceguys/addressing) library (no relation), address data is now more pleasant to work with no matter what part of the planet you’re on.

::: warning
If you’re upgrading from Commerce 2, see the [Changes in Commerce 3](https://craftcms.com/docs/commerce/3.x/upgrading.html) and upgrade to the latest Commerce 3 version before upgrading to Commerce 4.
:::

## Preparing for the Upgrade

Before you begin, make sure that:

- you’ve reviewed the changes in Commerce 4 [in the changelog](https://github.com/craftcms/commerce/blob/main/CHANGELOG.md#400) and further down this page
- your site’s running at least **Craft 4.0**
- you’ve made sure there are no deprecation warnings from Commerce 3 that need fixing
- your **database and files are backed up** in case everything goes horribly wrong

Once you’ve completed these steps, you’re ready continue with the upgrade process.

## Performing the Upgrade

1. Create a new database backup just in case things go sideways.
2. Edit your project’s `composer.json` to require `"craftcms/commerce": "^4.0.0-beta.1"`.
3. In your terminal, run `composer update`.
4. Run `php craft migrate/up --track=plugin:commerce`.
5. Run `php craft commerce/upgrade`.

Once you’re running the latest version of Craft Commerce, you’ll need to update your templates and any custom code relevant to the topics detailed below.

## Customer → User Transition

In Commerce 4, a customer is always represented by a user element regardless of an order’s status.

The [Order::setEmail()](commerce4:craft\commerce\elements\Order::setEmail()) method was previously required to uniquely identify an order from the beginning. You can still use that and Commerce will ensure a user exists with that email address.

If your controller or service has already ensured a given user exists, however, you can now call [Order::setCustomer()](commerce4:craft\commerce\elements\Order::setCustomer()) or directly set the [Order::$customerId](commerce4:craft\commerce\elements\Order::$customerId) property.

## Countries and States

Commerce 4 replaces manually-managed countries and states with Craft’s [Addresses](craft4:craft\services\Addresses) service, which provides a full repository of countries and subdivisions (states, provinces, etc.).

Because this repository isn’t editable, Commerce 4 has moved away from custom countries and states to a new concept called “Store Markets”—which is a more flexible way of defining where the store operates. You can navigate to these settings via **Commerce** → **Store Settings** → **Store**:

![Screenshot of the Store Markets settings, with an Order Address Condition rule builder and Country List autosuggest field](./images/store-markets.png)

- **Order Address Condition** provides a condition builder for limiting what addresses should be allowed for orders.
- **Country List** is an autosuggest field for choosing the countries that should be available for customers to select.

::: tip
Enabled countries from Commerce 3 are migrated to the **Country List** field.
:::

You can fetch the list of available countries via the new [Store](commerce4:craft\commerce\services\Store) service:

::: code
```twig
{# Craft 3 #}
{% set countries = craft.commerce.countries.allEnabledCountriesAsList %}

{# Craft 4 #}
{% set countries = craft.commerce.getStore().store.getCountriesList() %}
```
```php
// Craft 3
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllEnabledCountriesAsList();

// Craft 4
$countries = \craft\commerce\Plugin::getInstance()
    ->getStore()
    ->getStore()
    ->getCountriesList();
```
:::

States can no longer be enabled or disabled for selection in dropdown lists, but you can use the new **Order Address Condition** to limit them instead. This example is configured to only allow orders from Western Australia:

![The Order Address Condition condition builder field, configured with `Administrative Area`, `is one of`, `Australia`, and `Western Australia`.](./images/order-address-condition.png)

While Commerce has removed support for managing custom countries and states, the [`commerce/upgrade`](console-commands.md#commerce-upgrade) command migrates previous custom countries and states into fields on individual addresses and adds rules to zone and store market condition builders to match those custom country and state values.

Please review your tax and shipping zones. We encourage you to use standardized countries and administrative areas (states) for your zones in the future.

## Address Management

Commerce-specific Address models are now Craft [Address](craft4:craft\elements\Address) elements and can only belong to one owner in the Craft install.

This will almost certainly require changes to your front-end templates, though it comes with several benefits:

- better address formatting defaults
- easier address format customization
- custom address fields can be managed in field layouts—so no more need for `custom1`, `custom2`, etc.

### Order Addresses

An order’s addresses (estimated and normal billing + shipping) belong solely to that order. If a user designates one of their saved addresses for an order’s shipping or billing, the address will be cloned to that order with references to the original address element stored in `order.sourceBillingAddressId` and `order.sourceShippingAddressId`.

### User Addresses

You can use [User::getAddresses()](craft4:craft\elements\User::getAddresses()) to fetch any user’s addresses, including the currently-logged-in user:

::: code
```twig
{% set userAddresses = currentUser.getAddresses() %}
```
```php
$userAddresses = Craft::$app->getUser()->getIdentity()->getAddresses();
```
:::

If you’d like to save a new address to a user’s address book, you must provide an `ownerId`:

```php
$address = new \craft\elements\Address();
$address->setAttributes($addressData);
$address->ownerId = 1;

Craft::$app->getElements()->saveElement($address);
```

### Store Address

The Commerce store address is now an [Address](craft4:craft\elements\Address) element available via the store service:

::: code
```twig
{# Commerce 3 #}
{% set storeAddress = craft.commerce.addresses.storeLocationAddress %}

{# Commerce 4 #}
{% set storeAddress = craft.commerce.getStore().getStore().getLocationAddress() %}
```
```php
// Commerce 3
$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getAddresses()
    ->getStoreLocationAddress();

// Commerce 4
$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStore()
    ->getStore()
    ->getLocationAddress();
```
:::

### Custom Address Fields and Formatting

The concept of address lines has gone away along with [DefineAddressLinesEvent](commerce3:craft\commerce\events\DefineAddressLinesEvent). Use Craft’s [Addresses::formatAddress()](craft4:craft\services\Addresses::formatAddress()) instead.

### Template Changes

`stateId` and `stateValue` references can be replaced with `administrativeArea`. It expects a two-letter code if the state/province is in the list of subdivisions for the current country, or an arbitrary string for countries that don’t.

```twig
{# Commerce 3 #}
{% set states = craft.commerce.states.allEnabledStatesAsListGroupedByCountryId %}
{% set options = (countryId and states[countryId] is defined ? states[countryId] : []) %}

{% tag 'select' with { name: modelName ~ '[stateValue]' } %}
  {% for key, option in options %}
    {# @var option \craft\commerce\models\State #}
    {% set optionValue = (stateId ?: '') %}
    {{ tag('option', {
      value: key,
      selected: key == optionValue,
      text: option
    }) }}
  {% endfor %}
{% endtag %}

{# Commerce 4 #}
{% set administrativeAreas = craft.app.getAddresses()
  .getSubdivisionRepository()
  .getList([countryCode]) %}

{% tag 'select' with { name: 'administrativeArea' } %}
  {% for key, option in administrativeAreas %}
    {# @var address \craft\elements\Address #}
    {% set selectedValue = address.administrativeArea ?? '' %}
    {{ tag('option', {
      value: key,
      selected: key == selectedValue,
      text: option
    }) }}
  {% endfor %}
{% endtag %}
```

`city` is now `locality`:

```twig
{# Commerce 3 #}
{# @var model craft\commerce\models\Address #}
{{ input('text', modelName ~ '[city]', model.city ?? '') }}

{# Commerce 4 #}
{# @var address craft\elements\Address #}
{{ input('text', 'locality', address.locality ?? '') }}
```

`zipCode` is now `postalCode`:

```twig
{# Commerce 3 #}
{# @var model craft\commerce\models\Address #}
{{ input('text', modelName ~ '[zipCode]', model.zipCode ?? '') }}

{# Commerce 4 #}
{# @var address craft\elements\Address #}
{{ input('text', 'postalCode', address.postalCode ?? '') }}
```

## Front-End Form Requests and Responses

Ajax responses from `commerce/payment-sources/*` no longer return the payment form error using the `paymentForm` key.
Use `paymentFormErrors` to get the payment form errors instead.

### Payment Forms

Gateway payment forms are now namespaced with `paymentForm` and the gateway’s `handle`, to prevent conflicts between cart/order fields and those required by the gateway.

If you were displaying the payment form on the final checkout step, for example, you would need to make the following change:

```twig
{# Commerce 3 #}
{{ cart.gateway.getPaymentFormHtml(params)|raw }}

{# Commerce 4 #}
{% namespace cart.gateway.handle|commercePaymentFormNamespace %}
  {{ cart.gateway.getPaymentFormHtml(params)|raw }}
{% endnamespace %}
```

This makes it possible to display multiple payment gateways’ form fields inside the same `<form>` tag, where the `gatewayId` param still determines which form data should be used.

## Subscriptions

- Subscription plans are no longer accessible via old Control Panel URLs.

## Discounts

## Config Settings

- Removed the `orderPdfFilenameFormat` setting.
- Removed the `orderPdfPath` setting.

## Twig

- Removed the `json_encode_filtered` Twig filter.

::: tip
Check out the [example templates](example-templates.md)—they’re compatible with Commerce 4!
:::

## Events

- Renamed [Order::EVENT_AFTER_REMOVE_LINE_ITEM](commerce4:craft\commerce\elements\Order::EVENT_AFTER_REMOVE_LINE_ITEM) string from `afterRemoveLineItemToOrder` to `afterRemoveLineItemFromOrder`.

## Controller Actions

- The `cartUpdatedNotice` param is no longer accepted for `commerce/cart/*` requests. Use a hashed `successMessage` param instead.
- The `commerce/orders/purchasable-search` action was removed. Use `commerce/orders/purchasables-table` instead.

## Elements

- [Order::getCustomer()](commerce4:craft\commerce\elements\Order::getCustomer()) now returns a [User](craft4:craft\elements\User) element.
- [Product::getVariants()](commerce4:craft\commerce\elements\Product::getVariants()), [getDefaultVariant()](commerce4:craft\commerce\elements\Product::getDefaultVariant()), [getCheapestVariant()](commerce4:craft\commerce\elements\Product::getCheapestVariant()), [getTotalStock()](commerce4:craft\commerce\elements\Product::getTotalStock()), and [getHasUnlimitedStock()](commerce4:craft\commerce\elements\Product::getHasUnlimitedStock()) now return data related to only enabled variant(s) by default.

One element method was deprecated in Commerce 4:

| Old | What to do instead
| --- | ---
| [Order::getUser()](commerce4:craft\commerce\elements\Order::getUser()) | [getCustomer()](commerce4:craft\commerce\elements\Order::getCustomer())

Some element methods have been removed in Commerce 4:

| Old | What to do instead
| --- | ---
| [Order::getAdjustmentsTotalByType()](commerce3:craft\commerce\elements\Order::getAdjustmentsTotalByType()) | [getTotalTax()](commerce4:craft\commerce\elements\Order::getTotalTax()), [getTotalDiscount()](commerce4:craft\commerce\elements\Order::getTotalDiscount()), or [getTotalShippingCost()](commerce4:craft\commerce\elements\Order::getTotalShippingCost())
| [Order::getAvailableShippingMethods()](commerce3:craft\commerce\elements\Order::getAvailableShippingMethods()) | [getAvailableShippingMethodOptions()](commerce4:craft\commerce\elements\Order::getAvailableShippingMethodOptions())
| [Order::getOrderLocale()](commerce3:craft\commerce\elements\Order::getOrderLocale()) | [$orderLanguage](commerce4:craft\commerce\elements\Order::$orderLanguage)
| [Order::getShippingMethodId()](commerce3:craft\commerce\elements\Order::getShippingMethodId()) | [getShippingMethodHandle()](commerce4:craft\commerce\elements\Order::getShippingMethodHandle())
| [Order::getShouldRecalculateAdjustments()](commerce3:craft\commerce\elements\Order::getShouldRecalculateAdjustments()) | [recalculationMode](commerce4:craft\commerce\elements\Order::recalculationMode)
| [Order::getTotalTaxablePrice()](commerce3:craft\commerce\elements\Order::getTotalTaxablePrice()) | Taxable price is now calculated within the tax adjuster.
| [Order::isEditable](commerce3:craft\commerce\elements\Order::isEditable) | [canSave()](commerce4:craft\commerce\elements\Order::canSave())
| [Order::removeEstimatedBillingAddress()](commerce3:craft\commerce\elements\Order::removeEstimatedBillingAddress()) | [setEstimatedBillingAddress(null)](commerce4:craft\commerce\elements\Order::setEstimatedBillingAddress(null))
| [Order::removeEstimatedShippingAddress()](commerce3:craft\commerce\elements\Order::removeEstimatedShippingAddress()) | [setEstimatedShippingAddress(null)](commerce4:craft\commerce\elements\Order::setEstimatedShippingAddress(null))
| [Order::setShouldRecalculateAdjustments()](commerce3:craft\commerce\elements\Order::setShouldRecalculateAdjustments()) | [recalculationMode](commerce4:craft\commerce\elements\Order::recalculationMode)
| [Product::getIsDeletable()](commerce3:craft\commerce\elements\Product::getIsDeletable()) | [canDelete()](commerce4:craft\commerce\elements\Product::canDelete())
| [Product::getIsEditable()](commerce3:craft\commerce\elements\Product::getIsEditable()) | [canSave()](commerce4:craft\commerce\elements\Product::canSave())
| [Product::isDeletable()](commerce3:craft\commerce\elements\Product::isDeletable()) | [canDelete()](commerce4:craft\commerce\elements\Product::canDelete())
| [Product::isEditable()](commerce3:craft\commerce\elements\Product::isEditable()) | [canSave()](commerce4:craft\commerce\elements\Product::canSave())
| [Variant::isEditable()](commerce3:craft\commerce\elements\Variant::isEditable()) | [canSave()](commerce4:craft\commerce\elements\Variant::canSave())

### Element Actions

Theses Commerce-specific element actions have been removed and rely on Craft’s:

| Old | What to do instead
| --- | ---
| [DeleteOrder](commerce3:craft\commerce\elements\actions\DeleteOrder) | [Delete](craft4:craft\elements\actions\Delete)
| [DeleteProduct](commerce3:craft\commerce\elements\actions\DeleteProduct) | [Delete](craft4:craft\elements\actions\Delete)

## Models

### Changed

- [ProductType::$titleFormat](commerce3:craft\commerce\model\ProductType::$titleFormat) was renamed to [$variantTitleFormat](commerce4:craft\commerce\model\ProductType::$variantTitleFormat).
- [TaxRate::getRateAsPercent()](commerce4:craft\commerce\models\TaxRate::getRateAsPercent()) now returns a localized value.

### Removed

| Old | What to do instead
| --- | ---
| [ProductType::lineItemFormat](commerce3:craft\commerce\models\ProductType::lineItemFormat) |
| [ShippingAddressZone::getStatesNames()](commerce3:craft\commerce\models\ShippingAddressZone::getStatesNames()) |
| [Discount::$code](commerce3:craft\commerce\models\Discount::$code) |
| [Discount::getDiscountUserGroups()](commerce3:craft\commerce\models\Discount::getDiscountUserGroups()) |
| [Discount::getUserGroupIds()](commerce3:craft\commerce\models\Discount::getUserGroupIds()) | Discount user groups were migrated to the customer condition rule.
| [Discount::setUserGroupIds()](commerce3:craft\commerce\models\Discount::setUserGroupIds()) | Discount user groups were migrated to the customer condition rule.
| [OrderHistory::$customerId](commerce3:craft\commerce\models\OrderHistory::$customerId) | [$userId](commerce4:craft\commerce\models\OrderHistory::$userId)
| [OrderHistory::getCustomer()](commerce3:craft\commerce\models\OrderHistory::getCustomer()) | [getUser()](commerce4:craft\commerce\models\OrderHistory::getUser())
| [Settings::$showCustomerInfoTab](commerce3:craft\commerce\models\Settings::$showCustomerInfoTab) | [$showEditUserCommerceTab](commerce4:craft\commerce\models\Settings::$showEditUserCommerceTab)
| [ShippingAddressZone::getCountries()](commerce3:craft\commerce\models\ShippingAddressZone::getCountries()) | 
| [ShippingAddressZone::getCountriesNames()](commerce3:craft\commerce\models\ShippingAddressZone::getCountriesNames()) | 
| [ShippingAddressZone::getCountryIds()](commerce3:craft\commerce\models\ShippingAddressZone::getCountryIds()) | 
| [ShippingAddressZone::getCountryIds()](commerce3:craft\commerce\models\ShippingAddressZone::getCountryIds()) |
| [ShippingAddressZone::getStateIds()](commerce3:craft\commerce\models\ShippingAddressZone::getStateIds()) |
| [ShippingAddressZone::getStates()](commerce3:craft\commerce\models\ShippingAddressZone::getStates()) |
| [ShippingAddressZone::getStatesNames()](commerce3:craft\commerce\models\ShippingAddressZone::getStatesNames()) | 
| [ShippingAddressZone::isCountryBased](commerce3:craft\commerce\models\ShippingAddressZone::isCountryBased) |
| [States](commerce3:craft\commerce\models\States) |
| [TaxAddressZone::getCountries()](commerce3:craft\commerce\models\TaxAddressZone::getCountries()) |
| [TaxAddressZone::getCountriesNames()](commerce3:craft\commerce\models\TaxAddressZone::getCountriesNames()) |
| [TaxAddressZone::getCountryIds()](commerce3:craft\commerce\models\TaxAddressZone::getCountryIds()) |
| [TaxAddressZone::getCountryIds()](commerce3:craft\commerce\models\TaxAddressZone::getCountryIds()) |
| [TaxAddressZone::getStateIds()](commerce3:craft\commerce\models\TaxAddressZone::getStateIds()) |
| [TaxAddressZone::getStates()](commerce3:craft\commerce\models\TaxAddressZone::getStates()) |
| [TaxAddressZone::getStatesNames()](commerce3:craft\commerce\models\TaxAddressZone::getStatesNames()) |
| [TaxAddressZone::isCountryBased](commerce3:craft\commerce\models\TaxAddressZone::isCountryBased) |

## Services

In Commerce 4, [ShippingMethods::getAvailableShippingMethods()](commerce3:craft\commerce\services\ShippingMethods::getAvailableShippingMethods()) has been renamed to [getMatchingShippingMethods()](commerce4:craft\commerce\services\ShippingMethods::getMatchingShippingMethods()) to better represent the method.

### Changed

A few methods have had changes to their arguments:

- [LineItems::createLineItem()](commerce4:craft\commerce\services\LineItems::createLineItem()) no longer has an `$orderId` argument.
- [LineItems::resolveLineItem()](commerce4:craft\commerce\services\LineItems::resolveLineItem()) expects an `$order` argument instead of `$orderId`.
- [Variants::getAllVariantsByProductId()](commerce4:craft\commerce\services\Variants::getAllVariantsByProductId()) now accepts a third param: `$includeDisabled`.

### Deprecated

Several methods have been deprecated:

| Old | What to do instead
| --- | ---
| [Plans::getAllGatewayPlans()](commerce3:craft\commerce\services\Plans::getAllGatewayPlans()) | [getPlansByGatewayId()](commerce4:craft\commerce\services\Plans::getPlansByGatewayId())
| [Subscriptions::doesUserHaveAnySubscriptions()](commerce3:craft\commerce\services\Subscriptions::doesUserHaveAnySubscriptions()) | [doesUserHaveAnySubscriptions()](commerce4:craft\commerce\services\Subscriptions::doesUserHaveSubscriptions())
| [Subscriptions::getSubscriptionCountForPlanById()](commerce3:craft\commerce\services\Subscriptions::getSubscriptionCountForPlanById()) | [getSubscriptionCountByPlanId()](commerce4:craft\commerce\services\Subscriptions::getSubscriptionCountByPlanId())
| [TaxRates::getTaxRatesForZone()](commerce3:craft\commerce\services\TaxRates::getTaxRatesForZone()) | [getTaxRatesByTaxZoneId()](commerce4:craft\commerce\services\TaxRates::getTaxRatesByTaxZoneId())
| [Transactions::deleteTransaction()](commerce3:craft\commerce\services\Transactions::deleteTransaction()) | [deleteTransactionById()](commerce4:craft\commerce\services\Transactions::deleteTransactionById())

## Controllers

- Removed `craft\commerce\controllers\AddressesController`.
- Removed `craft\commerce\controllers\CountriesController`.
- Removed `craft\commerce\controllers\CustomersController`.
- Removed `craft\commerce\controllers\CustomerAddressesController`.
- Removed `craft\commerce\controllers\OrdersController::_prepCustomersArray()`. Use `_customerToArray()` instead.
- Removed `craft\commerce\controllers\PlansController::actionRedirect()`.
- Removed `craft\commerce\controllers\ProductsPreviewController::enforceProductPermissions()`.
- Removed `craft\commerce\controllers\StatesController`.

## User Permissions

Permissions for managing products have become more granular in Commerce 4:

- `commerce-manageProducts` has been replaced by `commerce-editProductType:<uid>` and nested `commerce-createProducts:<uid>` and `commerce-deleteProducts:<uid>` permissions
- `commerce-manageCustomers` has been replaced by Craft’s standard user management permissions.
