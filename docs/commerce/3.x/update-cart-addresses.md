# Update Cart Addresses

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

## Modifying a cart’s shipping and billing addresses

Adding or updating the addresses on the order is done using the `commerce/cart/update-cart` form action. There are a number of ways you can do this:

### 1. Use an existing address as the default

This example creates a form for adding the customer’s first address as the `shippingAddressId`, also using it for the billing address with the `billingAddressSameAsShipping` parameter:

```twig
{% set address = craft.commerce.customers.customer.addresses|first %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="redirect" value="commerce/cart">
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
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="redirect" value="commerce/cart">
    <input type="hidden" name="shippingAddressId" value="{{ address.id }}">
    <input type="hidden" name="billingAddressId" value="{{ address.id }}">
    <button type="submit">Submit</button>
</form>
```

### 2. Submit new addresses during checkout

A user may also provide a new address at checkout. (This is common when the user is a guest.)

In this example, it’s important to note that `shippingAddressId` must either be omitted or sent as an empty string. If `shippingAddressId` is an integer, the address form data is ignored and the form action attempts to set the shipping address to that of the ID.

```twig
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated Shipping Address.">
    {{ redirectInput('commerce/cart') }}

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

### 3. Select an existing address

If your customers have added multiple addresses, you can use radio buttons to select the proper `shippingAddressId` and `billingAddressId`, or create a new address on the fly:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated addresses.">
    {{ csrfInput() }}

    {% set customerAddresses = craft.commerce.customers.customer.addresses %}

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

### 4. Updating an existing address

An address in the cart may be updated by passing the `id` part of the address model e.g. `shippingAddress[id]`.

::: warning
If the ID of the address belongs to a customer, the customer’s address will also be updated at the same time. 
:::

This example starts a form that could be used to update the shipping address attached to the cart:

```twig
{% set cart = craft.commerce.carts.getCart() %}
{% set address = cart.shippingAddress %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated addresses.">
    {{ csrfInput() }}
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

## Summary

When using the `update-cart` action, you may include both new shipping and billing address (properly nested under their respective keys, `shippingAddress[...]` and `billingAddress[...]`), or select existing addresses using one or the other of the `shippingAddressId` and `billingAddressId` params. In either example, you can include `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` to synchronize the attached addresses.
