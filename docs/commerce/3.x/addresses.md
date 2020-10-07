# Addresses

Commerce manages shipping and billing addresses using [Address](commerce3:craft\commerce\models\Address) models that are relevant to [Orders](orders-carts.md) and [Customers](customers.md).

In the control panel, you’ll find addresses within the context of Orders and Customers. A Store Location may also be entered at Commerce → Store Settings → Store Location.

## Managing Addresses

TODO: describe how addresses work broadly for guests, member users, and store managers

- Address Lines
- Countries & States

Even though you’ll most likely work with addresses [via carts](#updating-cart-addresses) the control panel, an [Addresses Service](commerce3:craft\commerce\services\Addresses) provides methods for working directly with address data. We can use it here, for example, to get the store location address:

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

If you were to take `storeAddress` above and output it as JSON, this is what it might look like:

::: details Example Address

Note `countryId` and `stateId` are relational fields. (See [Countries & States](countries-states.md)).

```json
{
    "id": "3",
    "isStoreLocation": false,
    "attention": "",
    "title": "",
    "firstName": "",
    "lastName": "",
    "fullName": "",
    "address1": "1234 Balboa Towers Circle",
    "address2": "#100",
    "address3": "",
    "city": "Los Angeles",
    "zipCode": "92662",
    "phone": "(555) 555-5555",
    "alternativePhone": "",
    "label": "",
    "businessName": "Gobias Industries",
    "businessTaxId": "12345",
    "businessId": "",
    "stateName": "",
    "countryId": "236",
    "stateId": "26",
    "notes": "",
    "custom1": "",
    "custom2": "",
    "custom3": "",
    "custom4": "",
    "isEstimated": false
}
```
:::

Several [Events](extend/events.md) may also be used, when [extending Commerce](extend/), to provide custom functionality as addresses are changed in the system:

- [`beforeSaveAddress`](extend/events.md#beforesaveaddress)
- [`afterSaveAddress`](extend/events.md#aftersaveaddress)
- [`afterDeleteAddress`](extend/events.md#afterdeleteaddress)
- [`defineAddressLines`](extend/events.md#defineaddresslines)

## Updating Cart Addresses

Any post to the `commerce/cart/update-cart` action can include parameters for modifying shipping and billing address information in two formats:

1. A `shippingAddress` and/or `billingAddress` array with details to be added or updated.
2. A `shippingAddressId` and/or `billingAddressId` parameter for designating an existing addresses by its ID.

With either approach, you can also use `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` parameters to synchronize addresses and not have to send the same information in two places.

TODO: what if I provide conflicting settings?

You’ll probably want the customer to provide a shipping and billing address for the order. Although not required, the shipping address enables the tax and shipping engine to more accurately supply shipping options and tax costs.

You can see if the cart has a billing and shipping address has been set with:

You can use `cart.shippingAddress` and `cart.billingAddress` in a template to see if either one has been set:

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

Each attribute returns an [Address](commerce3:craft\commerce\models\Address) object, or `null` if no address is set.

### Modifying a cart’s shipping and billing addresses

Adding or updating the addresses on the order is done using the `commerce/cart/update-cart` form action. There are a number of ways you can do this:

#### 1. Use an existing address as the default

This example creates a form for adding the customer’s first address as the `shippingAddressId`, also using it for the billing address with the `billingAddressSameAsShipping` parameter:

```twig
{% set address = craft.commerce.customers.customer.addresses|first %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="shippingAddressId" value="{{ address.id }}">
    <input type="hidden" name="billingAddressSameAsShipping" value="1">
    <button type="submit">Submit</button>
</form>
```

You could achieve the inverse by providing the first address as the `billingAddressId` and setting the `shippingAddressSameAsBilling` param.

The same thing could also be done setting both addresses explicitly:

```twig
{% set address = craft.commerce.customers.customer.addresses|first %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="shippingAddressId" value="{{ address.id }}">
    <input type="hidden" name="billingAddressId" value="{{ address.id }}">
    <button type="submit">Submit</button>
</form>
```

#### 2. Submit new addresses during checkout

A user may also provide a new address at checkout. (This is common when the user is a guest.)

In this example, it’s important to note that `shippingAddressId` must either be omitted or sent as an empty string. If `shippingAddressId` is an integer, the address form data is ignored and the form action attempts to set the shipping address to that of the ID.

```twig
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="cartUpdatedNotice" value="Updated Shipping Address.">

    <input type="hidden" name="shippingAddressId" value=""> {# In addition to sending a blank string, you can omit this param from the form altogether #}
    <input type="text" name="shippingAddress[firstName]" value="">
    <input type="text" name="shippingAddress[lastName]" value="">
    <select name="shippingAddress[countryId]">
        {% for id, name in craft.commerce.countries.getAllCountriesAsList() %}
            <option value="{{ id }}">{{ name }}</option>
        {% endfor %}
    </select>
    <input type="hidden" name="sameAddress" value="1">

    <button type="submit">Add to Cart</button>
</form>
```

In this example we also omitted the `shippingAddress[id]` parameter since we were adding a new address. If we were updating an existing address we would include it with the address ID set.

#### 3. Select an existing address

If your customers have added multiple addresses, you can use radio buttons to select the proper `shippingAddressId` and `billingAddressId`, or create a new address on the fly:

```twig
{% set cart = craft.commerce.carts.cart %}
{% set customerAddresses = craft.commerce.customers.customer.addresses %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="cartUpdatedNotice" value="Updated addresses.">

    {# check if we have saved addresses #}
    {% if customerAddresses | length %}
        <div class="shipping-address">
            {% for address in customerAddresses %}
                <label>
                    <input type="radio"
                        name="shippingAddressId"
                        value="{{ address.id }}" {{- cart.shippingAddressId ? ' checked' : null }}
                    >
                    {# identifying address information, up to you! #}
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
                    {# identifying address information, up to you! #}
                    {# ... #}
                </label>
            {% endfor %}
        </div>
    {% else %}
        {# no existing addresses; provide forms to add new ones #}
        <div class="new-billing-address">
            <label>
                First Name
                <input type="text" name="billingAddress[firstName]">
            </label>
            {# remaining address fields #}
            {# ... #}
        </div>

        <div class="new-shipping-address">
            <label>
                First Name
                <input type="text" name="shippingAddress[firstName]">
            </label>
            {# remaining address fields #}
            {# ... #}
        </div>
    {% endif %}
</form>
```

You may need to create custom routes to allow customers to manage these addresses, or introduce logic in the browser to hide and show new address forms based on the type(s) of addresses you need.

#### 4. Updating an existing address

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
    <input type="hidden" name="cartUpdatedNotice" value="Updated addresses.">

    <input type="hidden" name="shippingAddress[id]" value="{{ address.id }}">
    <input type="text" name="shippingAddress[firstName]" value="{{ address.firstName }}">
    <input type="text" name="shippingAddress[lastName]" value="{{ address.lastName }}">

    {# ... #}

    <button type="submit">Update Address</button>
</form>
```

::: warning
If billing address ID and shipping address ID are the same on the cart. Updating the shipping address will have no effect as the billing address takes precedence.
:::

## Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details.

To help with this, the cart can use estimated shipping and billing addresses for calculations before complete addresses are available.

::: tip
An estimated address is an [Address model](commerce3:craft\commerce\models\Address) with its `isEstimated` property set to `true`. This simple differentiation prevents any confusion between estimated and final calculations.
:::

### Adding a shipping estimate address to the cart

Adding or updating the estimated addresses on the order is done using the `commerce/cart/update-cart` form action.

You can check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](commerce3:craft\commerce\elements\Order) object.

This example renders a form for adding an estimated shipping country, state, and zip code to the cart:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="estimatedBillingAddressSameAsShipping" value="1">

    {% if not cart.estimatedShippingAddressId %}
        {# show a country selection dropdown #}
        <select name="estimatedShippingAddress[countryId]">
            {% for key, option in craft.commerce.countries.allCountriesAsList %}
                <option value="{{ key }}">{{ option }}</option>
            {% endfor %}
        </select>

        {# show a state selection dropdown #}
        <select name="estimatedShippingAddress[stateValue]">
            {% for states in craft.commerce.states.allStatesAsList %}
                {% for key, option in states %}
                    <option value="{{ key }}">{{ option }}</option>
                {% endfor %}
            {% endfor %}
        </select>

        {# show a zip code input #}
        <input type="text" name="estimatedShippingAddress[zipCode]" value="">
    {% endif %}


    {% if cart.availableShippingMethodOptions|length and cart.estimatedShippingAddressId %}
        {# display name+price selection for each available shipping method #}
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

    <input type="submit" value="Submit">
</form>
```

[Tax adjusters](commerce3:craft\commerce\adjusters\Tax) and [shipping adjusters](commerce3:craft\commerce\adjusters\Shipping) based on estimated address data contain an `isEstimated` attribute.

A full example of this can be seen in the [example templates](example-templates.md) on the cart page.

## Validating Address Information

TODO: write