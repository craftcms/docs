# Address Management

Your customers will need to provide billing and shipping information at some point during [checkout](checkout.md).
You can set up this experience in a couple of ways:

- Using addresses from an [address book](#address-book): See the main Craft documentation for information about [managing address elements](/5.x/reference/element-types/addresses.md) outside the context of a cart.
- Configuring addresses [on a cart](#cart-addresses): Directly add billing and shipping information to the customer’s cart. _For guests, this is the only means of collecting address information!_

Once a customer completes checkout, the cart becomes an order, and the address information is frozen.
The way you access the address details is exactly the same—but you’re apt to display them in a read-only or [partial](orders.md#obfuscation) way.

## Displaying Address Information

Once you have a [cart](cart.md) or [order](orders.md), you can access the attached addresses via the `shippingAddress` and `billingAddress` properties:

```twig
{% if cart.shippingAddress %}
  Shipping to:
  {{ cart.shippingAddress.fullName }}
  {# ... #}
{% endif %}

{% if cart.billingAddress %}
  Billed to:
  {{ cart.billingAddress.fullName }}
  {# ... #}
{% endif %}
```

If the customer hasn’t set an address yet, you’ll get back `null`—otherwise, it’ll be an [Address](craft5:craft\elements\Address) object.

Use the [`address` filter](/5.x/reference/twig/filters.md#address) to output a complete, locale-aware address:

```twig
{% if cart.shippingAddress %}
  <address>
    {{ cart.shippingAddress|address }}
  </address>
{% else %}
  <p>No shipping address was provided.</p>
{% endif %}
```

Addresses are also accessed and output the same way in [emails](../system/emails.md) and [PDFs](../system/pdfs.md).

::: tip
Each [store](../system/addresses.md#store-addresses) also has an address you can display in your storefront or communications.
:::

## Fields

The specific properties and fields supported when creating or updating an [Address](craft5:craft\elements\Address) element are determined by regional differences (based on the provided `countryCode`) and any [custom fields](/5.x/system/fields.md) assigned to it.

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {# Native `fullName` field: #}
  {{ input('text', 'shippingAddress[fullName]', cart.shippingAddress.fullName) }}

  {# Native `dependentLocality` field, required by some localities: #}
  {{ input('text', 'shippingAddress[dependentLocality]', cart.shippingAddress.dependentLocality) }}

  {# Custom fields (note the `[fields]` prefix): #}
  {{ input('checkbox', 'shippingAddress[fields][isResidentialAddress]') }}
</form>
```

Refer to the [custom field type reference](/5.x/reference/field-types/README.md) for information on how each field expects data to be sent, and the [`users/save-address` action](/5.x/reference/controller-actions.md#post-users-save-address) for a complete list of params that can be nested within `shippingAddress[...]` and `billingAddress[...]`.

## Address Book

When logged in, customers can manage their addresses independently of a cart.
Refer to the main [addresses documentation](/5.x/reference/element-types/addresses.md) for information on managing addresses, and see [auto-filling addresses](#auto-fill-from-address-book) to learn how to quickly apply them to a cart.

Enable the **Auto Set New Cart Addresses** [store setting](../system/stores.md#settings) to automatically apply a customer’s primary billing and shipping address to new carts.

## Cart Addresses

Let’s look at some approaches to updating addresses on a cart during checkout.
Any time you submit data to the `commerce/cart/update-cart` action, you can include parameters for modifying addresses:

| Parameter(s) | Result |
| --- | --- |
| `shippingAddress` and/or `billingAddress` | Sets or updates individual address fields (guests and logged-in users) |
| `shippingAddressId` and/or `billingAddressId` | Fill address fields [from an existing address](#address-book) by ID (logged-in users only)
| `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` | [Synchronize](#synchronizing-addresses) address fields in one direction or another (guests and logged-in users)

The full list of supported parameters can be found in the [controller actions](../reference/controller-actions.md#post-cart-update-cart) documentation.

::: tip
Addresses can be [synchronized](#synchronizing-addresses) when providing new fields or filling from an existing address, but you cannot fill _and_ patch an address at the same time: `shippingAddressId` takes precedence over individual fields under a `shippingAddress` key.
:::

### Displaying Cart Address

From a [cart](cart.md) or [order](orders.md), you can access the attached addresses via the `shippingAddress` and `billingAddress` properties:

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

It’s important to code defensively, here! If the customer hasn’t set an address yet, you’ll get back `null`—otherwise, it’ll be an [Address](craft5:craft\elements\Address) object.

### Submit New Addresses

To set address information directly on the order, pass an [array of properties](#fields) under a `shippingAddress` or `billingAddress` key:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  {{ input('text', 'shippingAddress[fullName]', shippingAddress.fullName) }}

  <select name="shippingAddress[countryCode]">
    {% for code, name in currentStore.getCountriesList() %}
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
If your request also includes a non-empty `shippingAddressId` or `billingAddressId` param, the corresponding individual address fields are ignored and Commerce attempts to fill from an [existing address](#auto-fill-from-address-book).
:::

### Auto-fill from Address Book

You can let your customers populate their cart addresses with a previously-saved one by sending a `shippingAddressId` and/or `billingAddressId` param when updating the cart.

```twig{14}
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

Note that we’re using the cart’s `sourceShippingAddressId` to determine which preexisting address the shipping address was filled from.

### Update an Existing Address

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

_However_, any field(s) updated on a cart address that was originally populated from the customer’s address book will _not_ propagate back to the source, and will break the association to it.
Sending `shippingAddressId` and `billingAddressId` are only intended to populate a cart address with existing information, and to track where it originally came from—not bind them in both directions.
Commerce tracks the source of an address with the `sourceBillingAddressId` and `sourceShippingAddressId` properties.
:::

### Adding a Shipping Estimate Address

You can add or update an estimated addresses on the order with the same `commerce/cart/update-cart` form action.

In this example, we’ll check <commerce5:craft\commerce\elements\Order::estimatedShippingAddressId> for an existing estimate addresses, and display a form to collect the shipping country, state, and postal code:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('estimatedBillingAddressSameAsShipping', '1') }}

  {% if not cart.estimatedShippingAddressId %}
    {# Display country selection dropdown: #}
    <select name="estimatedShippingAddress[countryCode]">
      {% for code, option in currentStore.getCountriesList() %}
        <option value="{{ code }}">{{ option }}</option>
      {% endfor %}
    </select>

    {# Display state/province (“administrative area”) selection dropdown: #}
    <select name="estimatedShippingAddress[administrativeArea]">
      {% for states in currentStore.getAdministrativeAreasListByCountryCode() %}
        {% for key, option in states %}
          <option value="{{ key }}">{{ option }}</option>
        {% endfor %}
      {% endfor %}
    </select>

    {# Display a postal code input: #}
    <input type="text" name="estimatedShippingAddress[postalCode]">
  {% else if cart.availableShippingMethodOptions|length %}
    {# Display name + price selection for each available shipping method #}
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
  {% else %}
    <p></p>
  {% endif %}

  <button>Submit</button>
</form>
```

This example can be adapted to add an estimated _billing_ address by replacing `estimatedShippingAddress` with `estimatedBillingAddress`.
You can see this in-context in the [example templates](example-templates.md)’ cart page.

::: tip
[Tax adjusters](commerce5:craft\commerce\adjusters\Tax) and [shipping adjusters](commerce5:craft\commerce\adjusters\Shipping) set the `isEstimated` attribute when their calculations were based on an estimate address.
:::

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

Send `makePrimaryBillingAddress` and/or `makePrimaryShippingAddress` params along with any `cart/update-cart` request to set an address attached to the cart as the customer’s primary billing or shipping address.
These flags are persisted on the cart through checkout and are interoperable with `saveShippingAddressOnOrderComplete` and `saveBillingAddressOnOrderComplete`, which means _new_ addresses can be saved _and_ set as the customer’s primary. <Since product="Commerce" repo="craftcms/commerce" ver="5.3.0" description="Making a newly-saved address the customer’s primary was first possible in version {ver} of {product}" :useChangelog="false" />
_Prior_ to Commerce 5.3, only cart addresses that retained a `sourceBillingAddressId` or `sourceShippingAddressId` (effectively, addresses from the customer’s [address book](/5.x/reference/element-types/addresses.md#managing-addresses)) could be updated this way; new addresses (and addresses that had been modified from their source) could not be set as the customer’s primary due to the transient nature of the  `makePrimary*` params.

### Save Addresses when Completing an Order

Your customers can save the billing and/or shipping addresses on their cart to their address book when they check out.
These options are stored as flags (`saveBillingAddressOnOrderComplete` and `saveShippingAddressOnOrderComplete`) on the cart or <commerce5:craft\commerce\elements\Order> object.
You may update these preferences any time you modify the cart:

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

This example guards against saving a duplicate address, indicated by the presence of a `cart.sourceBillingAddressId` or `cart.sourceShippingAddressId`.

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

Guests’ addresses are automatically saved to their customer account when [registering at checkout](../system/customers.md#registration-at-checkout).
:::


## Synchronizing Addresses

With either approach, you can leverage the `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameters to synchronize addresses and avoid having to send the same information twice.

If you provide a `shippingAddress` or `shippingAddressId` and the order’s billing address should be identical, you can simply send a non-empty `billingAddressSameAsShipping` param rather than supplying the same `billingAddress` or `billingAddressId`.

If you provide `shippingAddress` fields *and* a `shippingAddressId`, the latter takes precedence.

::: warning
Customize what address information is required at checkout with the **Require Billing Address At Checkout** and **Require Shipping Address At Checkout** [store settings](stores.md#settings).

The [tax](tax.md) and [shipping](shipping.md) engines require address information to generate accurate options and costs.
:::

Use the `cart.hasMatchingAddresses()` method to confirm to customers that their addresses match. Read more about how Commerce handles changes to addresses in the [address book](#auto-fill-from-address-book) section.
