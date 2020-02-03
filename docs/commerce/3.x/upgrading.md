# Upgrading to Commerce 3

::: warning
If you’re upgrading from Commerce 1, review the [Changes in Commerce 2](https://docs.craftcms.com/commerce/v2/changes-in-commerce-2.html) documentation and update your project accordingly before upgrading to Commerce 3.
:::

::: tip
See the [changelog](https://github.com/craftcms/commerce/blob/master/CHANGELOG.md#300---2020-01-28) for a full list of changes.
:::

When upgrading a Commerce 2 project to Commerce 3, you should be aware of the following.

## Order Emails

Order notification emails are now sent via a queue job, so running a [queue worker as a daemon](https://nystudio107.com/blog/robust-queue-job-handling-in-craft-cms) is highly recommended to avoid customer email notification delays.

Previously emails would be generated during customer checkout, which could cause the order completion page to take a prolonged time to display (especially with PDF generation involved). This change gives your customers a better checkout experience.

No changes are needed for emails to continue to work, but ensuring your queue is working correctly will ensure everything goes smoothly.


## Edit Order page

Plugins and modules that modify the Edit Order page are likely to break with this update as the page is now a [Vue.js](https://vuejs.org/) application. 
The same Twig template hooks are still available, but inserting into the part of the DOM controlled by Vue.js will not work.


## Data tables

All data tables throughout the control panel use the new Craft 3.4 Vue.js-based data table, so any extensions of those old HTML tables are likely to break.


## Permissions

We have added the “Edit orders” and “Delete orders” user permissions, but users with the existing “Manage orders” permission will not automatically get these new permissions, so updating those users and user groups would be required.


## Cart merging

Automatic cart merging has been removed.

The cart is still retrieved from the front end templates using `craft.commerce.carts.cart` in your templates, but the optional `mergeCarts` param has been removed, and it is no longer possible to automicatically merge previous carts of the current user. 

We now recommend the customer manually adds items from the [previous carts to their current cart](adding-to-and-updating-the-cart.md#restoring-previous-cart-contents). An example of this is in the example templates.

Merging carts as manual process is better since the customer can decide what to do with any validation issues like maximum quanity rules. The previous merge feature would just fail to merge correctly with no error messages. 

This change is also mitigated by the fact that the previous cart of the current user is now loaded as the current cart when calling `craft.commerce.carts.cart` automatically.

## Twig template changes

Use the table below to update your twig templates.
D - Deprecated
BC - Breaking Change

| Old                                       | New                                                          | Change |
| ----------------------------------------- | ------------------------------------------------------------ | ------ |
| `craft.commerce.carts.cart(true, true)`   | `craft.commerce.carts.cart(true)`                            | BC     |
| `craft.commerce.carts.cart(false, true)`  | `craft.commerce.carts.cart(false)`                           | BC     |
| `craft.commerce.availableShippingMethods` | `cart.availableShippingMethod`                               | BC     |
| `craft.commerce.cart`                     | `craft.commerce.carts.cart`                                  | BC     |
| `craft.commerce.countriesList`            | `craft.commerce.countries.allStatesAsListGroupedByCountryId` | BC     |
| `craft.commerce.customer`                 | `craft.commerce.customers.customer`                          | BC     |
| `craft.commerce.discountByCode`           | `craft.commerce.discounts.discountByCode`                    | BC     |
| `craft.commerce.primaryPaymentCurrency`   | `craft.commerce.paymentCurrencies.primaryPaymentCurrency`    | BC     |
| `craft.commerce.statesArray`              | `craft.commerce.states.allStatesAsList`                      | BC     |

## Form Action Changes

| Old                                    | New                         | Docs                                                                        |
| -------------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| `commerce/cart/remove-line-item`       | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |
| `commerce/cart/update-line-item`       | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |
| `commerce/cart/remove-all-line-items`  | `commerce/cart/update-cart` | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items) |

## Event Changes

| Old                                                          | New                                                        |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| `craft\commerce\models\Address::EVENT_REGISTER_ADDRESS_VALIDATION_RULES` | `craft\base\Model::EVENT_DEFINE_RULES`         |
| `craft\commerce\services\Reports::EVENT_BEFORE_GENERATE_EXPORT` | `craft\base\Element::EVENT_REGISTER_EXPORTERS`          |

