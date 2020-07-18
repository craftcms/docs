# Estimate Cart Addresses

It’s common to provide a shipping or tax cost estimate before a customer has entered full address details.

To help with this, the cart can use estimated shipping and billing addresses for calculations before complete addresses are available.

::: tip
An estimated address is an [Address model](api:craft\commerce\models\Address) with its `isEstimated` property set to `true`. This simple differentiation prevents any confusion between estimated and final calculations.
:::

## Adding a shipping estimate address to the cart

Adding or updating the estimated addresses on the order is done using the `commerce/cart/update-cart` form action.

You can check for existing estimate addresses with the `estimatedShippingAddressId` and `estimatedBillingAddressId` attributes on the [cart](api:craft\commerce\elements\Order) object.

This example renders a form for adding an estimated shipping country, state, and zip code to the cart:

```twig
{% set cart = craft.commerce.carts.cart %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
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

[Tax adjusters](api:craft\commerce\adjusters\Tax) and [shipping adjusters](api:craft\commerce\adjusters\Shipping) based on estimated address data contain an `isEstimated` attribute.

A full example of this can be seen in the [example templates](example-templates.md) on the cart page.
