---
sidebarDepth: 2
---

# Addresses

::: tip
Addresses are now a native part of Craft! We recommend reviewing the [main documentation on addresses](/5.x/reference/element-types/addresses.md) before digging in on Commerce-specifics.
:::

Commerce manages shipping and billing information using Craft’s <craft5:craft\elements\Address> element type.

In the control panel, you’ll encounter addresses within the context of [orders](./orders-carts.md) and [users](/5.x/system/users.md). [Store locations](#store-addresses) may also be entered at <Journey path="Commerce, Store Management, General, Store Location" />.

Administrators can manage customer’s addresses from their user account. Commerce also inserts a **Commerce Settings** field into the [field layout](/5.x/reference/element-types/addresses.md#native-and-custom-fields) of addresses owned by a user, with primary shipping and billing controls.

When you’re ready to start using addresses in your storefront templates, review the [address management](../development/address-management.md) page in the development section.

## How Addresses are Used

Based on how your storefront is set up, customers may provide addresses [directly](#address-book), or [via their cart](#cart-addresses).

::: tip
Your primary source for information about [working with addresses](/5.x/reference/element-types/addresses.md) is the main Craft documentation; Commerce-specific examples are found in the [development guide](../development/address-management.md).
:::

Every cart can have a shipping and billing address, and customers with accounts can save and re-use addresses at [checkout](../development/checkout.md). How you collect and validate addresses on the front end is up to you—but Craft and Commerce provide tools that help streamline address management:

- The ability to use [estimated addresses](#estimate-addresses) to calculate shipping and tax costs with minimal data entry before checkout.
- Multiple ways of [updating cart addresses](#updating-cart-addresses) to avoid data re-entry.
- Methods for working with geographic regions provided by Craft’s supporting [address repository](/5.x/reference/element-types/addresses.md#address-repository).
- A separate endpoint that customers can use to [manage their saved addresses](#address-book).

### Store Addresses

Each [store](stores.md) has an address, which is set in <Journey path="Commerce, System Settings, Stores" />).
You’ll access this via the global `currentStore` variable or the [`Stores` service](commerce5:craft\commerce\services\Stores):

::: code
```twig
{% set storeAddress = currentStore
  .getSettings()
  .getLocationAddress() %}

{# ...or... #}

{% set storeAddress = craft.commerce
  .getStores()
  .getStoreByHandle('eu')
  .getSettings()
  .getLocationAddress() %}
```
```php
$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStores()
    ->getCurrentStore()
    ->getSettings()
    ->getLocationAddress();

// ...or...

$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStores()
    ->getStoreByHandle('eu')
    ->getSettings()
    ->getLocationAddress();
```
:::

Commerce does not use the store address, internally—it’s provided as a convenience for developers as they build out their storefronts, and for plugins to have a source of truth about the vendor’s location (say, when looking up shipping rates or taxes).

### Ownership

Logged-in users can directly [manage their addresses](../development/address-management.md) via the front-end, and [pick from them during checkout](../development/address-management.md#auto-fill-from-address-book).
However, addresses are only ever “owned” by one element—let’s look at some examples of how Commerce handles this:

- When an address is selected by updating a cart with a `shippingAddressId` or `billingAddressId`, the order keeps track of where the address came from via `sourceShippingAddressId` and `sourceBillingAddressId` properties, but _duplicates_ the actual address element. This means that `shippingAddressId` and `sourceShippingAddressId` (and the `billing`) will _never_ be the same!
- Addresses provided by sending individual fields under the `shippingAddress[...]` and `billingAddress[...]` keys are created and owned by the order.
- Similarly, sending individual field values for an order’s shipping or billing address (regardless of how it was originally populated) will only update the order address, and breaks any association to the user’s address book via `sourceShippingAddressId` or `sourceBillingAddressId`.

::: tip
If you want to make it clear that your customer has selected a preexisting address, compare `order.sourceShippingAddressId` or `order.sourceBillingAddressId` with the IDs of the addresses in their address book.
See [this example](../development/address-management.md#auto-fill-from-address-book) for the complete Twig logic.
:::

## Cart Addresses

Customers provide billing and shipping information while shopping, or during [checkout](../development/checkout.md).
Every cart technically holds up to four addresses: billing, shipping, estimated billing, and estimated shipping.
You are not obligated to use all four, and some stores may only use a billing or shipping address for compliance.

The requirements for checkout are controlled directly by the **Require Shipping Address At Checkout** and **Require Billing Address At Checkout** [store settings](stores.md#settings), and indirectly by **Require Shipping Method Selection At Checkout** and conditions on your shipping methods.

### Updating Cart Addresses

Any time you have a customer update their cart, the request can include parameters for modifying addresses:

1. [Create](../development/address-management.md#submit-new-addresses) or [update](../development/address-management.md#update-an-existing-address) an address by sending billing and shipping address fields as arrays (guests and logged-in users);
1. [Fill from an existing address](../development/address-management.md#auto-fill-from-address-book) (logged-in users only) by sending its ID;
1. [Synchronize billing and shipping addresses](../development/address-management.md#synchronizing-addresses) in one direction or the other;
1. Opt in to [saving cart addresses to your account](../development/address-management.md#save-addresses-when-completing-an-order), after checkout;

::: tip
The full list of supported parameters can be found in the [controller actions](../reference/controller-actions.md#post-cart-update-cart) documentation.
:::

### Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details.
To help with this, the cart can use [estimated shipping and billing addresses](../development/address-management.md#adding-a-shipping-estimate-address) for calculations, before complete addresses are available.

Estimated addresses are <craft5:craft\elements\Address> elements, just like shipping and billing addresses.

## Address Book

Registered customers can [save addresses directly on their user](../development/address-management.md#address-book), for future use.
At checkout, they can [select from existing addresses](../development/address-management.md#auto-fill-from-address-book), or provide a new one.

New addresses can also be saved to the customer’s address book [when completing an order](../development/address-management.md#save-addresses-when-completing-an-order).
This is enabled by default for customers who register at checkout.
