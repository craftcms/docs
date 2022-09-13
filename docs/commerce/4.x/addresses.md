# Addresses

::: warning
Addresses have changed significantly in Commerce 4 and this page isn’t up to date yet!
:::

Commerce manages shipping and billing addresses using Craft’s [Address](craft4:craft\elements\Address) elements, adding a mandatory **Commerce Settings** field to the address field layout with primary shipping and billing controls.

In the control panel, you’ll find addresses within the context of Orders and Customers. A Store Location may also be entered at **Commerce** → **Store Settings** → **Store** → **Store Location**.

You manage any customer’s addresses from their user account once you’ve added the native Addresses field to Users’ Field Layout.

## Managing Addresses

Your front end can work with addresses [by way of the cart](#cart-addresses) and [via customer accounts](#customer-addresses).

Every order may have a shipping and billing address, and customers with accounts can save and re-use addresses when placing new orders. How you collect and validate addresses on the front end is up to you. Commerce provides tools that help streamline address management:

- The ability to use [estimated addresses](#estimate-addresses) to calculate shipping and tax costs with minimal data entry before checkout.
- Multiple ways of [updating cart addresses](#updating-cart-addresses) and avoid data re-entry.
- Methods for working with the store’s [countries & states](countries-states.md) provided by Craft’s supporting [address repository](/4.x/addresses.md#address-repository).
- A separate endpoint that can be used to allow customers to [manage their saved addresses](#customer-addresses).

The store address is available via the [Store service](commerce4:craft\commerce\services\Store):

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
That `getStore().getStore()` is not a typo! We’re getting the store service with the first method and getting the store model with the second.
:::

If you flattened `storeAddress` into an array, this is what it might look like:

<toggle-tip title="Example Address">

<<< @/docs/commerce/4.x/example-objects/storeAddress.php

</toggle-tip>

## Cart Addresses

### Fetching Cart Addresses

Once you have [a cart object](orders-carts.md#fetching-a-cart), you can access order addresses via `cart.shippingAddress` and `cart.billingAddress`:

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

If present, the address will be an [Address](craft4:craft\elements\Address) object like the store location example above. Otherwise the `shippingAddress` or `billingAddress` property will return `null` if an address is not set.

::: tip
You don’t need to add your own logic for checking `shippingAddressSameAsBilling` or `billingAddressSameAsShipping`; Commerce will return the correct address taking those options into account.
:::

### Updating Cart Addresses

Any post to the `commerce/cart/update-cart` action can include parameters for modifying shipping and billing address information in two formats:

1. A `shippingAddress` and/or `billingAddress` array with details to be added, along with an ID (i.e. `shippingAddress[id]`) to update an existing address.
2. A `shippingAddressId` and/or `billingAddressId` parameter for designating an existing addresses by its ID.

With either approach, you can also use `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameters to synchronize addresses and not have to send the same information in two places.

If you provide a `shippingAddress` or `shippingAddressId`, for example, and the order’s billing address should be identical, you can simply pass `billingAddressSameAsShipping` with a value of `1` rather than supplying the same `billingAddress` or `billingAddressId`.

If you provide conflicting information for an address, like passing `shippingAddress` fields *and* `shippingAddressId` for example, Commerce will ignore the `shippingAddress` information and honor `shippingAddressId`.

::: warning
Commerce doesn’t require an order to have a shipping address, but providing one is important for the tax and shipping engine to calculate more accurate options and costs.
:::

### Cart Address Examples

The following are a handful of approaches you can take updating cart addresses.

#### Use an Existing Address by Default

This creates a form for adding the customer’s first saved address as the `shippingAddressId` and using it for the billing address with the `billingAddressSameAsShipping` parameter. The fields are hidden so the user doesn’t have any fields to populate.

```twig
{% set address = craft.commerce.customers.customer.addresses|first %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('shippingAddressId', address.id) }}
  {{ hiddenInput('billingAddressSameAsShipping', '1') }}
  <button>Submit</button>
</form>
```

You could achieve the inverse providing the first address as the `billingAddressId` and setting the `shippingAddressSameAsBilling` param.

The same thing could also be done explicitly setting each address ID:

```twig
{% set address = craft.commerce.customers.customer.addresses|first %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('shippingAddressId', address.id) }}
  {{ hiddenInput('billingAddressId', address.id) }}
  <button>Submit</button>
</form>
```

Every order address designates the order as its `ownerId`. If a customer uses one of their saved addresses for an order’s shipping or billing, the address will be cloned to that order with references to the original address element stored in `order.sourceBillingAddressId` and `order.sourceShippingAddressId`.

#### Submit New Addresses During Checkout

The customer, especially if they’re a guest, needs to enter an address at checkout.

This example creates a form for collecting the customer’s name and country, which are applied for the shipping and billing addresses.

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('successMessage', 'Updated shipping address.'|hash) }}

  {# You can send a blank string here or omit this form parameter #}
  {{ hiddenInput('shippingAddressId', '') }}

  <input type="text" name="shippingAddress[firstName]" value="">
  <input type="text" name="shippingAddress[lastName]" value="">
  <select name="shippingAddress[countryCode]">
    {% for code, name in craft.commerce.getStore().getStore().getCountriesList() %}
      <option value="{{ code }}">{{ name }}</option>
    {% endfor %}
  </select>
  {{ hiddenInput('billingAddressSameAsShipping', '1') }}

  <button>Add to Cart</button>
</form>
```

The example sends the `shippingAddressId` parameter with an empty string, which behaves the same as omitting the parameter. When `shippingAddressId` is an integer, the address form data is ignored and the form action attempts to set the shipping address to that of the ID.

If we were updating an existing address, we could use this same form but simply populate `shippingAddressId` with the ID of the address we’d like to update.

#### Select an Existing Address

If your customers have saved multiple addresses, you can display radio buttons allowing the a customer to select the proper `shippingAddressId` and `billingAddressId`, or create a new address on the fly:

```twig
{% set cart = craft.commerce.carts.cart %}
{% set customerAddresses = currentUser ? currentUser.addresses : [] %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('successMessage', 'Updated addresses.'|hash) }}

  {# Display saved addresses as options if we have them #}
  {% if customerAddresses | length %}
    <div class="shipping-address">
      {% for address in customerAddresses %}
        <label>
          <input type="radio"
            name="shippingAddressId"
            value="{{ address.id }}" {{- cart.shippingAddressId ? ' checked' : null }}
          >
          {# Identifying address information, up to you! #}
          {# ... #}
        </label>
      {% endfor %}
    </div>

    <div class="billing-address">
      {% for address in customerAddresses %}
        <label>
          <input type="radio"
            name="billingAddressId"
            value="{{ address.id }}" {{- cart.billingAddressId ? ' checked' : null }}
          >
          {# Identifying address information, up to you! #}
          {# ... #}
        </label>
      {% endfor %}
    </div>
  {% else %}
    {# No existing addresses; provide forms to add new ones #}
    <div class="new-billing-address">
      <label>
        First Name
        <input type="text" name="billingAddress[firstName]">
      </label>
      {# Remaining address fields #}
      {# ... #}
    </div>

    <div class="new-shipping-address">
      <label>
        First Name
        <input type="text" name="shippingAddress[firstName]">
      </label>
      {# Remaining address fields #}
      {# ... #}
    </div>
  {% endif %}
</form>
```

You may need to create custom routes to allow customers to manage these addresses, or introduce logic in the browser to hide and show new address forms based on the type(s) of addresses you need.

#### Update an Existing Address

An address in the cart may be updated by passing the `id` part of the address model e.g. `shippingAddress[id]`.

This example starts a form that could be used to update the shipping address attached to the cart:

```twig
{% set cart = craft.commerce.carts.getCart() %}
{% set address = cart.shippingAddress %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('successMessage', 'Updated addresses.'|hash) }}

  {{ hiddenInput('shippingAddress[id]', address.id) }}
  <input type="text" name="shippingAddress[firstName]" value="{{ address.firstName }}">
  <input type="text" name="shippingAddress[lastName]" value="{{ address.lastName }}">

  {# ... #}

  <button>Update Address</button>
</form>
```

::: warning
If a cart’s billing and shipping address IDs are the same, updating the shipping address will have no effect as the billing address takes precedence.
:::

### Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details.

To help with this, the cart can use estimated shipping and billing addresses for calculations before complete addresses are available.

::: tip
An estimated address is an [Address element](craft4:craft\elements\Address) assigned to the order’s `estimatedShippingAddressId` or `estimatedBillingAddressId`.
:::

#### Adding a Shipping Estimate Address to the Cart

You can add or update an estimated addresses on the order with the same `commerce/cart/update-cart` form action.

In this example we’ll first check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](commerce4:craft\commerce\elements\Order) object, displaying a form to collect only the shipping country, state, and postal code if we don’t already have them:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('estimatedBillingAddressSameAsShipping', '1') }}

  {% if not cart.estimatedShippingAddressId %}
    {# Display country selection dropdown #}
    <select name="estimatedShippingAddress[countryCode]">
      {% for code, option in craft.commerce.getStore().getStore().getCountriesList() %}
        <option value="{{ code }}">{{ option }}</option>
      {% endfor %}
    </select>

    {# Display state selection dropdown #}
    <select name="estimatedShippingAddress[administrativeArea]">
      {% for states in craft.commerce.getStore().getStore().getAdministrativeAreasListByCountryCode() %}
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

## Customer Addresses

Your front end can modify customer addresses independently of the cart.

Customers can only add and remove addresses from the front end while they’re logged in.

### Get All Current Customer Addresses

You can fetch a list of addresses directly from any [user](craft4:craft\elements\User) element:

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

### Get Current Customer Address by ID

Use an [address query](/4.x/addresses.md#querying-addresses) to get a specific address by its ID:

::: code
```twig
{% set address = craft.addresses()
  .id(8)
  .one() %}
```
```php
$address = \craft\elements\Address::find()
    ->id(8)
    ->one();
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

## Validating Addresses

Addresses are validated similarly to other element types. You can set requirements for custom fields in the Address Fields field layout, and you can add custom validation to native address fields using a custom plugin or module.

::: tip
If you’d like to provide your own server-side validation, make sure you’re comfortable [creating a plugin or module for Craft CMS](../../4.x/extend/). Take a look at the [Using Events in a Custom Module](https://craftcms.com/knowledge-base/custom-module-events) Knowledge Base article for a complete example.
:::

If you write your own plugin or module, you’ll want to use its `init()` method to subscribe to the event that’s triggered when the `Address` element collects it rules prior to attempting validation. Your event listener can add additional [validation rules](https://www.yiiframework.com/doc/guide/2.0/en/input-validation#declaring-rules) for the Address model.

In this example, a new rule is added to make `firstName` and `lastName` required:

```php
use craft\elements\Address;
use craft\base\Model;
use craft\events\DefineRulesEvent;

Event::on(
    Address::class,
    Model::EVENT_DEFINE_RULES,
    function(DefineRulesEvent $event) {
        $rules = $event->rules;
        $rules[] = [['firstName', 'lastName'], 'required'];
        $event->rules = $rules;
    }
);
```

In any of the above examples that post to the `users/save-address` action, you would access validation errors in your template like any other element:

```twig
{% if address %}
  {# Get all validation errors for the address #}
  {% set errors = address.getErrors() %}

  {# Get the `firstName` error for the address #}
  {% set firstNameErrors = address.getErrors('firstName') %}
{% endif %}
```

For a complete template example that outputs individual field validation errors, see [shop/_private/address/fields.twig](https://github.com/craftcms/commerce/blob/main/example-templates/dist/shop/_private/address/fields.twig) in the [example templates](example-templates.md).
