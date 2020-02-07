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

Each attribute returns an [Address](api:craft\commerce\models\Address) object, or `null` if no address is set.

## Modifying a cart’s shipping and billing addresses

Adding or updating the addresses on the order is done using the `commerce/cart/update-cart` form action. There are a number of ways you can do this:

### 1. Using an existing address ID as the default

This example creates a form that would add the first address owned by the customer as the `shippingAddressId`. It also sets it as the order’s billing address by using the `billingAddressSameAsShipping` param:

```twig
{% set address = craft.commerce.customer.addresses|first %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="redirect" value="commerce/cart">
    <input type="hidden" name="shippingAddressId" value="{{ address.id }}">
    <input type="hidden" name="billingAddressSameAsShipping" value="1">
    <button type="submit">Submit</button>
</form>
```

You could achieve the inverse by providing the first owned address as the `billingAddressId` and setting the `shippingAddressSameAsBilling` param.

Another way of doing the same thing as the above examples would be to set both addresses explicitly:

```twig
{% set address = craft.commerce.customer.addresses|first %}

<form method="POST">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="redirect" value="commerce/cart">
    <input type="hidden" name="shippingAddressId" value="{{ address.id }}">
    <input type="hidden" name="billingAddressId" value="{{ address.id }}">
    <button type="submit">Submit</button>
</form>
```

### 2. Submit new addresses during checkout

A user may also submit a new address directly, at checkout. (This is common when the user is a guest.)

In this example, it’s important to note that `shippingAddressId` must either be omitted or sent as an empty string. If `shippingAddressId` is an integer, the address form data is ignored and the form action attempts to set the shipping address to that of the ID.

```twig
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated Shipping Address.">
    {{ redirectInput('commerce/cart') }}

    <input type="hidden" name="shippingAddressId" value="">
    <input type="text" name="shippingAddress[firstName]" value="">
    <input type="text" name="shippingAddress[lastName]" value="">
    <select name="shippingAddress[countryId]">
        {% for id, name in craft.commerce.countriesList %}
            <option value="{{ id }}">{{ name }}</option>
        {% endfor %}
    </select>
    <input type="hidden" name="sameAddress" value="1">

    <button type="submit">Add to Cart</button>
</form>
```

### 3. Select an existing address

If your customers have added multiple addresses, you can use radio buttons to select the proper `shippingAddressId` and `billingAddressId`, or create a new address on the fly:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated addresses.">
    {{ csrfInput() }}

    {% set customerAddresses = craft.commerce.customer.addresses %}

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

You may need to create custom routes to allow customers to manage these addresses, or introduce some logic in the browser to hide and show new address forms based on the type(s) of addresses you need.

## Summary

When using the `update-cart` action, you may include both new shipping and billing address (properly nested under their respective keys, `shippingAddress[...]` and `billingAddress[...]`), or select existing addresses using one or the other of the `shippingAddressId` and `billingAddressId` params. In either example, you can include `shippingAddressSameAsBilling` or `billingAddressSameAsShipping` to synchronize the attached addresses.
