---
sidebarDepth: 2
---

# Addresses

::: tip
Addresses are now a native part of Craft! We recommend reviewing the [main documentation on addresses](/5.x/addresses.md) before digging in on Commerce-specifics.
:::

Commerce manages shipping and billing information using Craft’s <craft4:craft\elements\Address> element type.

In the control panel, you’ll encounter addresses within the context of [orders](./orders-carts.md) and [users](/5.x/system/users.md). [Store locations](#store-addresses) may also be entered at **Commerce** → **Store Management** → **General** → **Store Location**.

Customer’s addresses are managed from their user account, if you’ve [added the native Addresses field](/5.x/reference/element-types/addresses.md#setup) to Users’ field layout. Commerce also inserts a **Commerce Settings** field into the [address field layout](/5.x/reference/element-types/addresses.md#native-and-custom-fields)) with primary shipping and billing controls.

### How Addresses are Used

Your customers will work with addresses [directly](#address-book), or [via the cart](#cart-addresses).

::: tip
Your primary source for information about [working with Addresses](/5.x/reference/element-types/addresses.md) is the main Craft documentation!
:::

Every order may have a shipping and billing address, and customers with accounts can save and re-use addresses when placing new orders. How you collect and validate addresses on the front end is up to you—but Craft and Commerce provide tools that help streamline address management:

- The ability to use [estimated addresses](#estimate-addresses) to calculate shipping and tax costs with minimal data entry before checkout.
- Multiple ways of [updating cart addresses](#updating-cart-addresses) to avoid data re-entry.
- Methods for working with geographic regions provided by Craft’s supporting [address repository](/5.x/reference/element-types/addresses.md#address-repository).
- A separate endpoint that can be used to allow customers to [manage their saved addresses](#customer-addresses).

#### Store Addresses

Each store’s primary address (set via **Commerce** &rarr; **System Settings** &rarr; **Stores**) is available via the global `currentStore` variable or the [`Stores` service](commerce5:craft\commerce\services\Stores):

::: code
```twig
{% set storeAddress = craft.commerce
  .getStores()
  .getStoreByHandle('eu')
  .getSettings()
  .getLocationAddress() %}

{# ...or... #}

{% set storeAddress = currentStore
  .getSettings()
  .getLocationAddress() %}
```
```php
$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStores()
    ->getStoreByHandle('eu')
    ->getSettings()
    ->getLocationAddress();

// ...or...

$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStores()
    ->getCurrentStore()
    ->getSettings()
    ->getLocationAddress();
```
:::

::: tip
That `getStore().getStore()` is not a typo! We’re getting the <commerce5:craft\commerce\services\Store> _service_ with the first method and getting the <commerce5:craft\commerce\models\Store> _model_ with the second.
:::

## Cart Addresses

### Fetching Cart Addresses

Once you have a [cart object](orders-carts.md#fetching-a-cart), you can access the attached addresses via `cart.shippingAddress` and `cart.billingAddress`:

```twig
{% if cart.shippingAddress %}
  {{ cart.shippingAddress.firstName }}
  {# ... #}
{% endif %}

{% if cart.billingAddress %}
  {{ cart.billingAddress.firstName }}
  {# ... #}
{% endif %}
```

It’s important to code defensively, here! If the customer hasn’t set an address yet, you’ll get back `null`—otherwise, it’ll be an [Address](craft4:craft\elements\Address) object.

### Updating Cart Addresses

Any time you submit data to the `commerce/cart/update-cart` action, you can include parameters for modifying shipping and billing addresses:

1. Send `shippingAddress` and/or `billingAddress` arrays with new values (guests and logged-in users);
2. `shippingAddressId` and/or `billingAddressId` parameters for [choosing an existing address](#address-book) by ID (logged-in users only);
3. A `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameter to [copy address information](#synchronizing-shipping-and-billing-addresses) in one direction or another;

The full list of supported parameters can be found in the [controller actions](../reference/controller-actions.md#post-cart-update-cart) documentation.

#### Synchronizing Shipping and Billing Addresses

With either approach, you can leverage the `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameters to synchronize addresses and avoid having to send the same information twice.

If you provide a `shippingAddress` or `shippingAddressId` and the order’s billing address should be identical, you can simply send a non-empty `billingAddressSameAsShipping` param rather than supplying the same `billingAddress` or `billingAddressId`.

If you provide `shippingAddress` fields *and* a `shippingAddressId`, the latter takes precedence.

::: warning
Customize what address information is required at checkout with the **Require Billing Address At Checkout** and **Require Shipping Address At Checkout** [store settings](stores.md#settings).

The tax and shipping engines require address information to generate accurate options and costs.
:::

Use the `cart.hasMatchingAddresses()` method to confirm to customers that their addresses match. Read more about how Commerce handles changes to addresses in the [address book](#auto-fill-from-address-book) section.

#### Address Fields

The specific properties and fields supported when updating an order’s `shippingAddress` or `billingAddress` in this way are determined by the [Address](craft4:craft\elements\Address) element, regional differences based on the provided `countryCode`, and any [custom fields](/5.x/system/fields.md) assigned to it.

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {# Native `fullName` field: #}
  {{ input('text', 'shippingAddress[fullName]', cart.shippingAddress.fullName) }}

  {# Custom fields (note the `[fields]` prefix): #}
  {{ input('checkbox', 'shippingAddress[fields][isResidentialAddress]') }}
</form>
```

For more information on address management, continue reading—or see the main Craft documentation for [Address elements](/5.x/reference/element-types/addresses.md).

#### Address Ownership

Logged-in users can directly [manage their addresses](/5.x/reference/element-types/addresses.md#managing-addresses) via the front-end, and pick from them during checkout. However, addresses are only ever “owned” by one element—let’s look at some examples of how Commerce handles this:

- When an address is selected by updating a cart with a `shippingAddressId` or `billingAddressId`, the order keeps track of where the address came from via `sourceShippingAddressId` and `sourceBillingAddressId` properties, but _clones_ the actual address element. This means that `shippingAddressId` and `sourceShippingAddressId` will _never_ be the same—even if they were filled from the same source address!
- Addresses provided by sending individual fields under the `shippingAddress[...]` and `billingAddress[...]` keys are created and owned by the order.
- Similarly, sending individual field values for an order’s shipping or billing address (regardless of how it was originally populated) will only update the order address, and breaks any association to the user’s address book via `sourceShippingAddressId` or `sourceBillingAddressId`.

::: tip
If you want to make it clear that your customer has selected a preexisting address, compare `order.sourceShippingAddressId` or `order.sourceBillingAddressId` with the IDs of the addresses in their address book. We have an [example of this](#auto-fill-from-address-book), below.
:::

### Cart Address Examples

Let’s look at some approaches to updating order addresses during checkout.

::: tip
With either of these strategies, you can apply changes to shipping and billing addresses, simultaneously. Read more about [synchronizing addresses](#synchronizing-shipping-and-billing-addresses).
:::

#### Submit New Addresses

Customers—especially guests—will probably need to enter an address at checkout. To set address information directly on the order, pass individual properties under a `shippingAddress` or `billingAddress` key, depending on what you want to update:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {{ input('text', 'shippingAddress[fullName]', shippingAddress.fullName) }}

  <select name="shippingAddress[countryCode]">
    {% for code, name in craft.commerce.getStore().getStore().getCountriesList() %}
      {{ tag('option', {
        value: code,
        text: name,
        selected: code == shippingAddress.countryCode,
      }) }}
    {% endfor %}
  </select>

  {# ... #}

  <button>Save Shipping Address</button>
</form>
```

::: warning
If your request also includes a non-empty `shippingAddressId` or `billingAddressId param, the corresponding individual address fields are ignored and Commerce attempts to fill from an [existing address](#auto-fill-from-address-book).
:::

#### Save Addresses when Completing an Order

Your customers can save the billing and/or shipping addresses on their cart to their address book when they check out. These options are stored as `saveBillingAddressOnOrderComplete` and `saveShippingAddressOnOrderComplete` on the cart or <commerce5:craft\commerce\elements\Order> object. You may send corresponding values any time you update the customer’s cart:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {# ... #}

  {% if currentUser %}
    {% if cart.billingAddressId and not cart.sourceBillingAddressId %} 
      {{ input('checkbox', 'saveBillingAddressOnOrderComplete', 1, { checked: cart.saveBillingAddressOnOrderComplete }) }}
    {% endif %}

    {% if cart.shippingAddressId and not cart.sourceShippingAddressId %} 
      {{ input('checkbox', 'saveShippingAddressOnOrderComplete', 1, { checked: cart.saveShippingAddressOnOrderComplete }) }}
    {% endif %}
  {% endif %}

  <button>Save Cart</button>
</form>
```

This example guards against saving an existing address, indicated by the presence of a `cart.sourceBillingAddressId` or `cart.sourceShippingAddressId`.

Both properties can be set at once with the `saveAddressesOnOrderComplete` parameter, but you are still responsible for deriving UI state from the underlying address-specific properties:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {% if currentUser and ((cart.billingAddressId and not cart.sourceBillingAddressId) or (cart.shippingAddressId and not cart.sourceShippingAddressId)) %}
    {{ input('checkbox', 'saveAddressesOnOrderComplete', 1, {checked: cart.saveBillingAddressOnOrderComplete and cart.saveShippingAddressOnOrderComplete}) }}
  {% endif %}

  {# ... #}

  <button>Save Cart</button>
</form>
```

::: tip
The `saveAddress*` properties are only applicable to customers who created addresses directly on the cart. Setting these options to `true` if a _registered_ customer selected an address from their [address book](#auto-fill-from-address-book) has no effect.

Guests’ addresses are automatically saved to their customer account when [registering at checkout](customers.md#registration-at-checkout).
:::

#### Auto-fill from Address Book

You can let your customers populate their cart addresses with a previously-saved one by sending a `shippingAddressId` and/or `billingAddressId` param when updating the cart.

```twig
{% set cart = craft.commerce.carts.cart %}
{% set customerAddresses = currentUser ? currentUser.addresses : [] %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {# Display saved addresses as options if we have them #}
  {% if customerAddresses | length %}
    <div class="shipping-address">
      {% for address in customerAddresses %}
        <label>
          {{ input('radio', 'shippingAddressId', address.id, {
            checked: cart.sourceShippingAddressId == address.id,
          }) }}
          {{ address|address }}
        </label>
      {% endfor %}
    </div>

    {# ... same process for `billingAddressId` ... #}
  {% else %}
    {# No existing addresses! See examples above to learn about sending a new address. #}
  {% endif %}

  <button>Save Addresses</button>
</form>
```

You may need to create custom routes to allow logged-in customers to [manage these addresses](/5.x/reference/element-types/addresses.md#managing-addresses), or introduce logic in the template or browser to hide and show new address forms based on the type(s) of addresses you need.

#### Update an Existing Address

An address on the cart may be updated in-place by passing individual address properties.

```twig
{% set cart = craft.commerce.carts.getCart() %}
{% set address = cart.shippingAddress %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {{ input('text', 'shippingAddress[fullName]', address.fullName) }}
  {{ input('text', 'shippingAddress[addressLine1]', address.addressLine1) }}

  {# ... #}

  <button>Save Shipping Info</button>
</form>
```

You may also send `firstName` and `lastName` properties, separately.

::: warning
Changes to an address in the customer’s address book (via the [`users/save-address` action](/5.x/reference/controller-actions.md#users-save-address)) are copied to any carts it is attached to.

_However_, any field(s) updated on an order address that was originally populated from the customer’s address book will _not_ propagate back to the source, and will break the association to it. Sending `shippingAddressId` and `billingAddressId` are only intended to populate an order address with existing information, and to track where it originally came from—not bind them in both directions.
:::

### Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details. To help with this, the cart can use “estimated” shipping and billing addresses for calculations, before complete addresses are available.

Estimated addresses are <craft4:craft\elements\Address> elements, just like shipping and billing addresses.

#### Adding a Shipping Estimate Address to the Cart

You can add or update an estimated addresses on the order with the same `commerce/cart/update-cart` form action.

In this example we’ll first check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](commerce5:craft\commerce\elements\Order) object, displaying a form to collect only the shipping country, state, and postal code if we don’t already have them:

```twig
{% set cart = craft.commerce.carts.cart %}
{% set store = craft.commerce.getStore().getStore() %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('estimatedBillingAddressSameAsShipping', '1') }}

  {% if not cart.estimatedShippingAddressId %}
    {# Display country selection dropdown #}
    <select name="estimatedShippingAddress[countryCode]">
      {% for code, option in store.getCountriesList() %}
        <option value="{{ code }}">{{ option }}</option>
      {% endfor %}
    </select>

    {# Display state selection dropdown #}
    <select name="estimatedShippingAddress[administrativeArea]">
      {% for states in store.getAdministrativeAreasListByCountryCode() %}
        {% for key, option in states %}
          <option value="{{ key }}">{{ option }}</option>
        {% endfor %}
      {% endfor %}
    </select>

    {# Display a postal code input #}
    <input type="text" name="estimatedShippingAddress[postalCode]" value="">
  {% endif %}

  {% if cart.availableShippingMethodOptions|length and cart.estimatedShippingAddressId %}
    {# Display name+price selection for each available shipping method #}
    {% for handle, method in cart.availableShippingMethodOptions %}
      {% set price = method.priceForOrder(cart)|commerceCurrency(cart.currency) %}
      <label>
        <input type="radio"
          name="shippingMethodHandle"
          value="{{ handle }}"
          {% if handle == cart.shippingMethodHandle %}checked{% endif %}
        />
        {{ method.name }} - {{ price }}
      </label>
    {% endfor %}
  {% endif %}

  <button>Submit</button>
</form>
```

::: tip
[Tax adjusters](commerce5:craft\commerce\adjusters\Tax) and [shipping adjusters](commerce5:craft\commerce\adjusters\Shipping) will include an `isEstimated` attribute when their calculations were based on estimated address data.
:::

A full example of this can be seen in the [example templates](../development/example-templates.md) on the cart page.

## Address Book

When logged in, your customers can manage their addresses independently of a cart. Refer to the main [addresses documentation](/5.x/reference/element-types/addresses.md) and to this page’s section on [auto-filling addresses](#auto-fill-from-address-book) for more information and examples.

### Primary Billing + Shipping Addresses

In addition to the [natively supported](/5.x/reference/controller-actions.md#post-users-save-address) address params, Commerce will look for `isPrimaryShipping` and `isPrimaryBilling`. These values determine which addresses get attached to a fresh cart when the **Auto Set New Cart Addresses** [store setting](../system/stores.md#settings) is enabled.

To let your customers set a address, add this code to your [new address](/5.x/reference/element-types/addresses.md#new-addresses) and/or [existing addresses](/5.x/reference/element-types/addresses.md#existing-addresses) forms:

```twig
{# Make primary shipping address? #}
{{ hiddenInput('isPrimaryShipping', 0) }}
<label>
  {{ input('checkbox', 'isPrimaryShipping', 1, {
    checked: address.isPrimaryShipping
  }) }}
  Set as primary shipping address
</label>

{{ hiddenInput('isPrimaryBilling', 0) }}
<label>
  {{ input('checkbox', 'isPrimaryBilling', 1, {
    checked: address.isPrimaryBilling
  }) }}
  Set as primary billing address
</label>
```

::: tip
`checkbox` inputs only send a value when checked. In order to support _un_-setting a primary billing or shipping address, you must include the hidden input _before_ the visible checkbox, in the DOM. This ensures that the falsy `0` value is sent when the checkbox is unchecked, differentiating it from simply not sending a value at all (omitting `isPrimaryShipping` or `isPrimaryBilling` entirely makes no changes to the user’s current settings).
:::

Send `makePrimaryBillingAddress` and/or `makePrimaryShippingAddress` params along with any `cart/update-cart` request to set an address attached to the cart as the customer’s primary billing or shipping address. Only addresses that retain their `sourceBillingAddressId` or `sourceShippingAddressId` can be configured this way—an address that has been modified from its source is not considered part of the customer’s [address book](/5.x/reference/element-types/addresses.md#managing-addresses).
