# Upgrading to Commerce 3

::: warning
If you’re upgrading from Commerce 1, see the [Changes in Commerce 2](https://craftcms.com/docs/commerce/2.x/changes-in-commerce-2.html) and upgrade to the latest Commerce 2 version before upgrading to Commerce 3.
:::

## Preparing for the Upgrade

Before you begin, make sure that:

1. You’ve reviewed the [changes in Commerce 3](https://github.com/craftcms/commerce/blob/master/CHANGELOG.md#300---2020-01-28)
2. Your site’s running at least **Craft 3.4** and **the latest version of Commerce 2** (2.2.26)
3. Your **database is backed up** in case everything goes horribly wrong

Once you’ve completed these steps, you’re ready continue.

When upgrading from Commerce 2 to Commerce 3, the following changes may be important depending on how you’ve set up your project.

## Order Emails

Order notification emails are now sent via a queue job, so running a [queue worker as a daemon](https://nystudio107.com/blog/robust-queue-job-handling-in-craft-cms) is highly recommended to avoid customer email notification delays.

Previously emails would be generated during customer checkout, which could cause the order completion page to take a prolonged time to display (especially with PDF generation involved). This change gives your customers a better checkout experience.

No changes are needed for emails to continue to work, but ensuring your queue is working correctly will ensure everything goes smoothly.

## Edit Order page

Plugins and modules that modify the Edit Order page are likely to break with this update as the page is now a [Vue.js](https://vuejs.org/) application.
The same Twig template hooks are still available, but inserting into the part of the DOM controlled by Vue.js will not work.

## Data Tables

All data tables throughout the control panel use the new Craft 3.4 Vue.js-based data table, so any extensions of those old HTML tables are likely to break.

## Permissions

We have added the “Edit orders” and “Delete orders” user permissions, but users with the existing “Manage orders” permission will not automatically get these new permissions, so updating those users and user groups would be required.

## Cart Merging

Automatic cart merging has been removed.

The cart is still retrieved from the front end templates using `craft.commerce.carts.cart` in your templates, but the optional `mergeCarts` param has been removed, and it is no longer possible to automicatically merge previous carts of the current user.

We now recommend the customer manually adds items from the [previous carts to their current cart](adding-to-and-updating-the-cart.md#restoring-previous-cart-contents). An example of this is in the example templates.

Merging carts as manual process is better since the customer can decide what to do with any validation issues like maximum quanity rules. The previous merge feature would just fail to merge correctly with no error messages.

This change is also mitigated by the fact that the previous cart of the current user is now loaded as the current cart when calling `craft.commerce.carts.cart` automatically.

## Order Recalculations

Previously, a saved order would only be recalculated if it was still a cart, meaning `Order::isCompleted` was `false`.

The introduction of order editing required more sophisticated recalculation that can be achieved with three order recalculation modes.

| Mode                                                                                                       | Recalculates                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Recalculate All](https://docs.craftcms.com/commerce/api/v3/craft-commerce-elements-order.html#constants)  | All line items (from purchasables) and all adjustments.<br>Removes line item if purchasable is out of stock.<br>**Default mode for carts.** |
| [Adjustments Only](https://docs.craftcms.com/commerce/api/v3/craft-commerce-elements-order.html#constants) | All order adjustments; doesn’t change line items.                                                                                           |
| [None](https://docs.craftcms.com/commerce/api/v3/craft-commerce-elements-order.html#constants)             | Nothing; does not change anything about the order.                                                                                          |

If you’re using event listeners or plugins to save orders, you may want to check and set the mode prior to saving to ensure recalculation behaves as expected. In this example, we’re avoiding any recalculation on our custom save by setting the recalculation mode to `Order::RECALCULATION_MODE_NONE`:

```php
$originalRecalculationMode = $order->getRecalculationMode();
$order->setRecalculationMode(\craft\commerce\elements\Order::RECALCULATION_MODE_NONE);

Craft::$app->elements->saveElement($order);

// restore original mode to avoid unexpected issues with other events, plugins, etc.
$order->setRecalculationMode($originalRecalculationMode);
```

## Twig Template Breaking Changes

Use the table below to update each breaking change in your Twig templates.

| Old                                       | New                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `craft.commerce.carts.cart(true, true)`   | `craft.commerce.carts.cart(true)`                                   |
| `craft.commerce.carts.cart(false, true)`  | `craft.commerce.carts.cart(false)`                                  |
| `craft.commerce.availableShippingMethods` | `cart.availableShippingMethodOptions`                               |
| `craft.commerce.cart`                     | `craft.commerce.carts.cart`                                         |
| `craft.commerce.countriesList`            | `craft.commerce.countries.allCountriesAsList`                       |
| `craft.commerce.customer`                 | `craft.commerce.customers.customer`                                 |
| `craft.commerce.discountByCode`           | `craft.commerce.discounts.discountByCode`                           |
| `craft.commerce.primaryPaymentCurrency`   | `craft.commerce.paymentCurrencies.primaryPaymentCurrency`           |
| `craft.commerce.statesArray`              | `craft.commerce.states.allStatesAsList`                             |
| `craft.commerce.states.allStatesAsList`   | `craft.commerce.states.getAllEnabledStatesAsListGroupedByCountryId` |
| `currentUser.customerFieldHandle`         | `craft.commerce.customers.customer` |

## Form Action Changes

| Old                                   | New                         | Docs                                                                        |
| ------------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| `commerce/cart/remove-line-item`      | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |
| `commerce/cart/update-line-item`      | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |
| `commerce/cart/remove-all-line-items` | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |

## Event Changes

| Old                                                                      | New                                            |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| `craft\commerce\models\Address::EVENT_REGISTER_ADDRESS_VALIDATION_RULES` | `craft\base\Model::EVENT_DEFINE_RULES`         |
| `craft\commerce\services\Reports::EVENT_BEFORE_GENERATE_EXPORT`          | `craft\base\Element::EVENT_REGISTER_EXPORTERS` |

## Custom Adjuster Types

In order to improve compatibility with payment gateways and tax systems, custom adjuster types have been deprecated.

Custom adjusters must extend the included <commerce3:craft\commerce\adjusters\Discount>, <commerce3:craft\commerce\adjusters\Shipping>, or <commerce3:craft\commerce\adjusters\Tax>.


## Discount Category Matching

Commerce 3 adds a *Categories Relationship Type* field for choosing how designated purchasable categories may be used to match a discount or sale promotion. Its options are “Source”, “Target”, and “Either”. (See the Craft CMS [Relations](https://craftcms.com/docs/3.x/relations.html) page for more on what each means.)

Commerce 2 used discount categories as the “Source” for discount matches, and existing discounts are migrated from Commerce 2 with that option selected. It’s important to consider the relationship type as you work with discounts in Commerce 3 since the *Categories Relationship Type* can impact how discounts and sales are applied and its default match type is “Either”.

## Custom Line Item Pricing

If your store customizes line item pricing with the [`populateLineItem` event](events.md#populatelineitem), it’s important to know that the `salePrice` property is handled differently in Commerce 3.

Commerce 2 set the line item’s `salePrice` to the sum of `saleAmount` and `price` immediately *after* the `populateLineItem` event. Commerce 3 does not modify `salePrice` after the event is triggered, so any pricing adjustments should explicitly set `salePrice`.

### Commerce 2 Example

If we’re setting a line item’s price to $20 in Commerce 2 and we want the cart price to be $15, we’d modify the `price` and `saleAmount` properties on the line item:

```php {17}
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_POPULATE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;

        // setting custom price
        $lineItem->price = 20;

        // setting amount to be discounted from price
        $lineItem->saleAmount = -5;
    }
);
```

### Commerce 3 Example

To accomplish the same thing in Commerce 3, we would need to set `price` and `salePrice`:

```php {17}
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_POPULATE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;

        // setting custom price
        $lineItem->price = 20;

        // setting discounted price
        $lineItem->salePrice = 15;
    }
);
```

## Current Customer

The Customer field on Craft’s [`currentUser`](/3.x/dev/global-variables.md#currentuser) (i.e. `currentUser.customerFieldHandle`, where `customerFieldHandle` is the field handle you chose) was removed in Commerce 3. Retrieving the current customer can now be done consistently through the customers service:

::: code
```twig
{# gets the customer active in the current session #}
{% set customer = craft.commerce.customers.customer %}
```

```php
// gets the customer active in the current session
$customer = \craft\commerce\Plugin::getInstance()
    ->getCustomers()
    ->customer;
```
:::

## Customer Info Field

The Customer Info field type has been removed. If you previously added a Customer Info field to any field layouts, you’ll need to remove them manually.

By default, customer information is displayed in a tab for each user in the control panel. You can control whether this tab is shown using the Commerce [showCustomerInfoTab](config-settings.md#showcustomerinfotab) setting.