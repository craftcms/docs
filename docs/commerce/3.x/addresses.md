# Addresses

Commerce manages shipping and billing addresses using [Address](commerce3:craft\commerce\models\Address) models that are relevant to [Orders](orders-carts.md) and [Customers](customers.md).

In the control panel, you’ll find addresses within the context of Orders and Customers. A Store Location may also be entered at **Commerce** → **Store Settings** → **Store Location**.

## Managing Addresses

Your front end can work with addresses [by way of the cart](#cart-addresses) and [via customer accounts](#customer-addresses).

Every order may have a shipping and billing address, and customers with accounts can save and re-use addresses when placing new orders. How you collect and validate addresses on the front end is up to you. Commerce provides tools that help streamline address management:

- The ability to use minimal [estimated addresses](#estimate-addresses) for calculating shipping and tax costs with minimal data entry prior to checkout.
- Multiple ways of [updating cart addresses](#update-cart-addresses) and avoid data re-entry.
- Convenient handling of the [Countries & States](countries-states.md) used in addresses thatstore managers can fully customize.
- A separate endpoint that can be used to allow customers to [manage their saved addresses](#customer-addresses).

An [Addresses service](commerce3:craft\commerce\services\Addresses) also provides methods for working directly with address data. We can use it here, for example, to get the store location address:

::: code
```twig
{% set storeAddress = craft.commerce.addresses.storeLocationAddress %}
```
```php
$storeAddress = craft\commerce\Plugin::getInstance()
    ->getAddresses()
    ->getStoreLocationAddress();
```
:::

If you flattened `storeAddress` into an array, this is what it might look like:

<toggle-tip title="Example Address">

<<< @/docs/commerce/3.x/example-objects/storeAddress.php

</toggle-tip>


Several [Events](extend/events.md) may also be used, when [extending Commerce](extend/), to provide custom functionality as addresses are changed in the system:

- [`beforeSaveAddress`](extend/events.md#beforesaveaddress)
- [`afterSaveAddress`](extend/events.md#aftersaveaddress)
- [`afterDeleteAddress`](extend/events.md#afterdeleteaddress)
- [`defineAddressLines`](extend/events.md#defineaddresslines)

### Address Lines

The address model has a read-only `addressLines` parameter that returns a key-value array with every line of the address. By default it consists of most of the items in the example above:

- `attention`
- `name`
- `fullName`
- `address1`
- `address2`
- `address3`
- `city`
- `zipCode`
- `phone`
- `alternativePhone`
- `label`
- `notes`
- `businessName`
- `businessTaxId`
- `stateText`
- `countryText`
- `custom1`
- `custom2`
- `custom3`
- `custom4`

This parameter is designed to allow consistency when displaying a customer’s address on the front end and in the control panel.

Address lines are used, for example, on the [order edit](orders.md#editing-orders) page in the control panel. There are examples for [displaying an address](https://github.com/craftcms/commerce/blob/main/example-templates/build/shop/_private/address/address.twig) in the [example templates](example-templates.md).

You can customize this array using the [defineAddressLines](extend/events.md#defineaddresslines) event.

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

If present, the address will be an [Address](commerce3:craft\commerce\models\Address) object like the store location example above. Otherwise the `shippingAddress` or `billingAddress` property will return `null` if an address is not set.

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
    <button type="submit">Submit</button>
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
    <button type="submit">Submit</button>
</form>
```

#### Submit New Addresses During Checkout

The customer, especially if they’re a guest, need to enter an address at checkout.

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
    <select name="shippingAddress[countryId]">
        {% for id, name in craft.commerce.countries.getAllCountriesAsList() %}
            <option value="{{ id }}">{{ name }}</option>
        {% endfor %}
    </select>
    {{ hiddenInput('billingAddressSameAsShipping', '1') }}

    <button type="submit">Add to Cart</button>
</form>
```

The example sends the `shippingAddressId` parameter with an empty string, which behaves the same as omitting the parameter. When `shippingAddressId` is an integer, the address form data is ignored and the form action attempts to set the shipping address to that of the ID.

If we were updating an existing address, we could use this same form but simply populate `shippingAddressId` with the ID of the address we’d like to update.

#### Select an Existing Address

If your customers have saved multiple addresses, you can display radio buttons allowing the a customer to select the proper `shippingAddressId` and `billingAddressId`, or create a new address on the fly:

```twig
{% set cart = craft.commerce.carts.cart %}
{% set customerAddresses = craft.commerce.customers.customer.addresses %}

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

::: warning
If the ID of the address belongs to a customer, the customer’s address will also be updated at the same time.
:::

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

    <button type="submit">Update Address</button>
</form>
```

::: warning
If a cart’s billing and shipping address IDs are the same, updating the shipping address will have no effect as the billing address takes precedence.
:::

### Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details.

To help with this, the cart can use estimated shipping and billing addresses for calculations before complete addresses are available.

::: tip
An estimated address is an [Address model](commerce3:craft\commerce\models\Address) with its `isEstimated` property set to `true`. This simple differentiation prevents any confusion between estimated and final calculations.
:::

#### Adding a Shipping Estimate Address to the Cart

You can add or update an estimated addresses on the order with the same `commerce/cart/update-cart` form action.

In this example we’ll first check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](commerce3:craft\commerce\elements\Order) object, displaying a form to collect only the shipping country, state, and zip code if we don’t already have them:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    {{ hiddenInput('estimatedBillingAddressSameAsShipping', '1') }}

    {% if not cart.estimatedShippingAddressId %}
        {# Display country selection dropdown #}
        <select name="estimatedShippingAddress[countryId]">
            {% for key, option in craft.commerce.countries.allCountriesAsList %}
                <option value="{{ key }}">{{ option }}</option>
            {% endfor %}
        </select>

        {# Display state selection dropdown #}
        <select name="estimatedShippingAddress[stateValue]">
            {% for states in craft.commerce.states.allStatesAsList %}
                {% for key, option in states %}
                    <option value="{{ key }}">{{ option }}</option>
                {% endfor %}
            {% endfor %}
        </select>

        {# Display a zip code input #}
        <input type="text" name="estimatedShippingAddress[zipCode]" value="">
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

    <button type="submit">Submit</button>
</form>
```

::: tip
[Tax adjusters](commerce3:craft\commerce\adjusters\Tax) and [shipping adjusters](commerce3:craft\commerce\adjusters\Shipping) will include an `isEsimated` attribute when their calculations were based on estimated address data.
:::

A full example of this can be seen in the [example templates](example-templates.md) on the cart page.

## Customer Addresses

Your front end modify customer addresses indepdendently of the cart.

When a customer is logged in and checks out with a new address, that address is saved to their address book. (This is not true for guests since they don’t have any need for an address book.)

Customers can only add and remove addresses from the front end while they’re logged in.

See [the Customer model](commerce3:craft\commerce\models\Customer) to learn about the methods available to retrieve customer address data e.g. [Customer::getPrimaryBillingAddress()](<commerce3:craft\commerce\models\Customer::getPrimaryBillingAddress()>), [Customer::getPrimaryShippingAddress()](<commerce3:craft\commerce\models\Customer::getPrimaryShippingAddress()>) and [Customer::getAddressById()](<commerce3:craft\commerce\models\Customer::getAddressById()>).

### Get All Current Customer Addresses

::: code
```twig
{% set addresses = craft.commerce.customers.customer.addresses %}
```
```php
$addresses = craft\commerce\Plugin::getInstance()
    ->getCustomers()
    ->getCustomer()
    ->getAddresses();
```
:::

### Get Current Customer Address by ID

::: code
```twig
{% set address = craft.commerce.customers.customer.getAddressById(id) %}
```
```php
$addresses = craft\commerce\Plugin::getInstance()
    ->getCustomers()
    ->getCustomer()
    ->getAddressById(id);
```
:::

### Add or Update a Customer Address

The form action for adding or updating a customer’s address is `commerce/customer-addresses/save`.

This example would add a new address for the customer with the details in the `address` form field:

```twig
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/customer-addresses/save') }}
    {{ redirectInput('commerce/customer/addresses') }}
    <input type="text" name="address[firstName]" value="{{ address is defined ? address.firstName : '' }}">
    <input type="text" name="address[lastName]" value="{{ address is defined ? address.lastName : '' }}">
    {# ... #}
    <button type="submit">Save</button>
</form>
```

To update an existing address, include its ID for the value of a `address[id]` parameter:

```twig{5}
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/customer-addresses/save') }}
    {{ redirectInput('commerce/customer/addresses') }}
    <input type="text" name="address[id]" value="{{ address.id }}">
    <input type="text" name="address[firstName]" value="{{ address.firstName }}">
    <input type="text" name="address[lastName]" value="{{ address.lastName }}">
    {# ... #}
    <button type="submit">Save</button>
</form>
```

### Delete a Customer Address

The form action for deleting a customer address is `commerce/customer-addresses/delete`. All that’s needed is the address ID:

```twig
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/customer-addresses/delete') }}
    {{ redirectInput('commerce/customer/addresses') }}
    {{ hiddenInput('id', address.id) }}
    <button type="submit">Delete</button>
</form>
```

::: warning
If an address is designated for shipping or billing in a cart, edits will carry over to the cart before checkout. Deleting an address will remove it from the cart and require further user action to complete the order.
:::

## Validating Addresses

Commerce saves customer address data without any validation. If you’d like to provide your own validation rules, you can either do that on the front end or use a custom plugin or module to provide server side validation.

::: tip
If you’d like to provide your own server side validation, make sure you’re comfortable [creating a plugin or module for Craft CMS](https://craftcms.com/docs/3.x/extend/). Take a look at this Knowledge Base article for a complete example: [craftcms.com/knowledge-base/custom-module-events](https://craftcms.com/knowledge-base/custom-module-events)
:::

If you write your own plugin or module, you’ll want to use its `init()` method to subscribe to the event that’s triggered when the `Address` model collects it rules prior to attempting validation. Your event listener can add additional [validation rules](https://www.yiiframework.com/doc/guide/2.0/en/input-validation#declaring-rules) for the Address model.

In this example, a new rule is added to make `firstName` and `lastName` required:

```php
use craft\commerce\models\Address;
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

In any of the above examples that post to the `commerce/customer-addresses/save` action, you would access validation errors in your template like any other model:

```twig
{% if address %}
    {# Get all validation errors for the address #}
    {% set errors = address.getErrors() %}

    {# Get the `firstName` error for the address #}
    {% set firstNameErrors = address.getErrors('firstName') %}
{% endif %}
```

For a complete template example that outputs individual field validation errors, see [shop/_includes/addresses/form.twig](https://github.com/craftcms/commerce/tree/main/example-templates/build/shop/_private/address/form.twig) in the [example templates](example-templates.md).
