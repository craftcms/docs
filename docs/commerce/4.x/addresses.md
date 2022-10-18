# Addresses

::: tip
Addresses are now a native part of Craft! We recommend reviewing the [main documentation on addresses](/4.x/addresses.md) before digging in on Commerce-specifics.
:::

Commerce manages shipping and billing information using Craft’s <craft4:craft\elements\Address> element type.

In the control panel, you’ll encounter addresses within the context of orders and users. A [Store Location](#store-address) address may also be entered at **Commerce** → **Store Settings** → **Store** → **Store Location**.

Customer’s addresses are managed from their user account, if you’ve [added the native Addresses field](/4.x/addresses.md#setup) to Users’ field layout. Commerce also inserts a **Commerce Settings** field into the [address field layout](/4.x/addresses.md#native-and-custom-fields)) with primary shipping and billing controls.

## Managing Addresses

Your customers will work with addresses [directly](#address-book), or [via the cart](#cart-addresses).

::: tip
Your primary source for information about [working with Addresses](/4.x/addresses.md) is the main Craft documentation!
:::

Every order may have a shipping and billing address, and customers with accounts can save and re-use addresses when placing new orders. How you collect and validate addresses on the front end is up to you—but Craft and Commerce provide tools that help streamline address management:

- The ability to use [estimated addresses](#estimate-addresses) to calculate shipping and tax costs with minimal data entry before checkout.
- Multiple ways of [updating cart addresses](#updating-cart-addresses) to avoid data re-entry.
- Methods for working with the store’s [countries & states](countries-states.md) provided by Craft’s supporting [address repository](/4.x/addresses.md#address-repository).
- A separate endpoint that can be used to allow customers to [manage their saved addresses](#customer-addresses).

### Store Address

The store address (set via **Commerce** &rarr; **Store Settings** &rarr; **Store**) is available via the [Store service](commerce4:craft\commerce\services\Store):

::: code
```twig
{% set storeAddress = craft.commerce
  .getStore()
  .getStore()
  .getLocationAddress() %}
```
```php
$storeAddress = \craft\commerce\Plugin::getInstance()
    ->getStore()
    ->getStore()
    ->getLocationAddress();
```
:::

::: tip
That `getStore().getStore()` is not a typo! We’re getting the <commerce4:craft\commerce\services\Store> _service_ with the first method and getting the <commerce4:craft\commerce\models\Store> _model_ with the second.
:::

## Cart Addresses

### Fetching Cart Addresses

Once you have [a cart object](orders-carts.md#fetching-a-cart), you can access the attached addresses via `cart.shippingAddress` and `cart.billingAddress`:

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

::: tip
You don’t need to add your own logic to handle `shippingAddressSameAsBilling` or `billingAddressSameAsShipping`; Commerce will return the correct address taking those options into account.
:::

### Updating Cart Addresses

Any post to the `commerce/cart/update-cart` action can include parameters for modifying shipping and billing address information in two formats:

1. A `shippingAddress` and/or `billingAddress` array with details to be added (guests and logged-in users)
2. A `shippingAddressId` and/or `billingAddressId` parameter for choosing an existing address by ID (logged-in users only)

#### Synchronizing Shipping and Billing Addresses

With either approach, you can leverage the `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameters to synchronize addresses and avoid having to send the same information twice.

If you provide a `shippingAddress` or `shippingAddressId`, for example, and the order’s billing address should be identical, you can simply pass a non-empty value under `billingAddressSameAsShipping` rather than supplying the same `billingAddress` or `billingAddressId`.

If you provide `shippingAddress` fields *and* `shippingAddressId`, the latter takes precedence.

::: warning
Commerce doesn’t require an order to have a shipping address, but providing one is important for the tax and shipping engine to calculate more accurate options and costs.
:::

#### Address Fields

The specific properties and fields supported when updating an order’s `shippingAddress` or `billingAddress` in this way are determined by the [Address](craft4:craft\elements\Address) element, regional differences based on the provided `countryCode`, and any custom fields assigned to it.

```twig
<form method="post">
  {# ... #}

  <input type="text" name="shippingAddress[firstName]" value="{{ cart.shippingAddress.firstName }}">
</form>
```

#### Address Ownership

Logged-in users can directly [manage their addresses](/4.x/addresses.md#managing-addresses) via the front-end, and pick from them during checkout. However, addresses are only ever “owned” by one element—let’s look at some examples of how Commerce handles this:

- When an address is selected by updating a cart with a `shippingAddressId` or `billingAddressId`, the order keeps track of where the address came from via `sourceShippingAddressId` and `sourceBillingAddressId` properties, but _clones_ the actual address element. This means that `shippingAddressId` and `sourceShippingAddressId` will never be the same!
- Addresses provided by sending individual fields under the `shippingAddress[...]` and `billingAddress[...]` keys are created and owned by the order.
- Similarly, sending individual field values for an order’s shipping or billing address (regardless of how it was originally populated) will only update the order address, and breaks any association to the user’s address book via `sourceShippingAddressId` or `sourceBillingAddressId`.

::: tip
If you want to make it clear that your customer has selected a preexisting address, compare `order.sourceShippingAddressId` or `order.sourceBillingAddressId` with the IDs of the addresses in their address book. We have an [example of this](#select-an-existing-address), below.
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

  {{ input('text', 'shippingAddress[firstName]', shippingAddress.fullName) }}

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

#### Auto-fill from Address Book

You can allow your customers to populate order addresses with a previously-saved one by sending a `shippingAddressId` and/or `billingAddressId` param when updating the cart.

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

You may need to create custom routes to allow customers to [manage these addresses](/4.x/addresses.md#managing-addresses), or introduce logic in the browser to hide and show new address forms based on the type(s) of addresses you need.

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

::: warning
Updates to an order address filled from the customer’s address book will _not_ propagate back to the source, and 
:::

### Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details. To help with this, the cart can use “estimated” shipping and billing addresses for calculations, before complete addresses are available.

Estimated addresses are <craft4:craft\elements\Address> elements, just like shipping and billing addresses.

#### Adding a Shipping Estimate Address to the Cart

You can add or update an estimated addresses on the order with the same `commerce/cart/update-cart` form action.

In this example we’ll first check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](commerce4:craft\commerce\elements\Order) object, displaying a form to collect only the shipping country, state, and postal code if we don’t already have them:

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
[Tax adjusters](commerce4:craft\commerce\adjusters\Tax) and [shipping adjusters](commerce4:craft\commerce\adjusters\Shipping) will include an `isEstimated` attribute when their calculations were based on estimated address data.
:::

A full example of this can be seen in the [example templates](example-templates.md) on the cart page.

## Address Book

When logged in, your customers can modify their addresses independently of the cart.

Refer to the main [Address documentation](/4.x/addresses.md) for more information and examples.

### Get All Current Customer Addresses

You can fetch a list of addresses directly from any [User](craft4:craft\elements\User) element:

::: code
```twig
{% set addresses = currentUser.getAddresses() %}
```
```php
$addresses = Craft::$app->user->getIdentity()
    ->getAddresses();
```
:::

You can also do the same thing using an [address query](/4.x/addresses.md#querying-addresses) to get the addresses owned by the current user ID:

::: code
```twig
{% set addresses = craft.addresses()
  .ownerId(currentUser.id)
  .all() %}
```
```php
$addresses = \craft\elements\Address::find()
    ->ownerId(Craft::$app->user->id)
    ->all();
```
:::

### Add or Update a Customer Address

The form action for adding or updating a customer’s address is `users/save-address`.

This example would add a new address for the customer with the details in the `address` form field:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/save-address') }}
  {{ redirectInput('commerce/customer/addresses') }}
  <input type="text" name="firstName" value="{{ address is defined ? address.firstName : '' }}">
  <input type="text" name="lastName" value="{{ address is defined ? address.lastName : '' }}">
  {# ... #}
  <button>Save</button>
</form>
```

To update an existing address, include its ID for the value of a `addressId` parameter:

```twig{5}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/save-address') }}
  {{ redirectInput('commerce/customer/addresses') }}
  <input type="text" name="addressId" value="{{ address.id }}">
  <input type="text" name="firstName" value="{{ address.firstName }}">
  <input type="text" name="lastName" value="{{ address.lastName }}">
  {# ... #}
  <button>Save</button>
</form>
```

Like other element types, any custom fields should be included in a `fields` array. If we had a field with a handle of `myCustomField`, for example, we’d include it like this:

```twig{6}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/save-address') }}
  {{ redirectInput('commerce/customer/addresses') }}
  <input type="text" name="addressId" value="{{ address.id }}">
  <input type="text" name="firstName" value="{{ address.firstName }}">
  <input type="text" name="lastName" value="{{ address.lastName }}">
  <input type="text" name="fields[myCustomField]" value="{{ address.myCustomField }}">
  {# ... #}
  <button>Save</button>
</form>
```

### Delete a Customer Address

The form action for deleting a customer address is `users/delete-address`. All that’s needed is the address ID:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/delete-address') }}
  {{ redirectInput('commerce/customer/addresses') }}
  {{ hiddenInput('addressId', address.id) }}
  <button>Delete</button>
</form>
```

::: warning
If an address is designated for shipping or billing in a cart, edits will carry over to the cart before checkout. Deleting an address will remove it from the cart and require further user action to complete the order.
:::
