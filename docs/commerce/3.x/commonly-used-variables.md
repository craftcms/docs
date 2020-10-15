# Commonly Used Variables

The following are common methods you will want to call in your front end templates:

## craft.commerce.settings

To get the Craft Commerce [general settings model](commerce3:craft\commerce\models\Settings):

```twig
{% set settings = craft.commerce.settings %}
```

## craft.orders()

See [Order Queries](dev/element-queries/order-queries.md).

## craft.products()

See [Product Queries](dev/element-queries/product-queries.md).

## craft.subscriptions()

See [Order Queries](dev/element-queries/subscription-queries.md).

## craft.variants()

See [Variant Queries](dev/element-queries/variant-queries.md).

## craft.commerce.carts.cart

See [craft.commerce.carts.cart](craft-commerce-carts-cart.md).

## craft.commerce.countries.allEnabledCountries

Returns an array of <commerce3:craft\commerce\models\Country> objects.

```twig
<select>
{% for country in craft.commerce.countries.allEnabledCountries %}
    <option value="{{ country.id }}">{{ country.name }}</option>
{% endfor %}
</select>
```

## craft.commerce.countries.allEnabledCountriesAsList

Returns an array of all enabled countries for use in a dropdown menu.

Data returned as `[32:'Australia', 72:'USA']`

```twig
<select>
{% for id, countryName in craft.commerce.countries.allEnabledCountriesAsList %}
    <option value="{{ id }}">{{ countryName }}</option>
{% endfor %}
</select>
```

## craft.commerce.states.allEnabledStates

Returns an array of <commerce3:craft\commerce\models\State> objects.

```twig
<select>
{% for state in craft.commerce.states.allEnabledStates %}
    <option value="{{ state.id }}">{{ state.name }}</option>
{% endfor %}
</select>
```

## craft.commerce.states.allEnabledStatesAsListGroupedByCountryId

Returns an array of <commerce3:craft\commerce\models\State> object arrays, indexed by country IDs.

Data returned as `[72:[3:'California', 4:'Washington'],32:[7:'New South Wales']]`

```twig
<select>
{% for countryId, states in craft.commerce.states.allEnabledStatesAsListGroupedByCountryId %}
    {% set country = craft.commerce.countries.getCountryById(countryId) %}
    <optgroup label="{{ country.name }}">
    {% for stateId, stateName in states %}
        <option value="{{ stateId }}">{{ stateName }}</option>
    {% endfor %}
  </optgroup>
{% endfor %}
</select>
```

## cart.availableShippingMethodOptions

Returns the shipping methods available for the current cart. Some shipping methods may not be included, as only those whose rules apply to the current cart will be returned.

```twig
{% for handle, method in cart.availableShippingMethodOptions %}
    <label>
        <input type="radio" name="shippingMethodHandle" value="{{ handle }}"
               {% if handle == cart.shippingMethodHandle %}checked{% endif %} />
        <strong>{{ method.name }}</strong> {{ method.priceForOrder(cart)|currency(cart.currency) }}
    </label>
{% endfor %}
```

## craft.commerce.gateways.allFrontEndGateways

Returns all payment gateways available to the customer.

```twig
{% if not craft.commerce.gateways.allFrontEndGateways|length %}
    <p>No payment methods available.</p>
{% endif %}

{% if craft.commerce.gateways.allFrontEndGateways|length %}
<form method="post">
    {{ csrfInput() }}
    {{ hiddenInput('action', 'commerce/cart/update-cart') }}
    {{ hiddenInput('redirect', 'commerce/checkout/payment') }}

    <label for="gatewayId">Payment Method</label>
    <select id="gatewayId" name="gatewayId" >
        {% for id,name in craft.commerce.gateways.allFrontEndGateways %}
            <option value="{{ id }}"{% if id == cart.gatewayId %} selected{% endif %}>
                {{- name -}}
            </option>
        {% endfor %}
    </select>
</form>
{% endif %}
```

## craft.commerce.taxCategories.allTaxCategories

Returns an array of all tax categories set up in the system.

```twig
{% for taxCategory in craft.commerce.taxCategories.allTaxCategories %}
    {{ taxCategory.id }} - {{ taxCategory.name }}
{% endfor %}
```

## craft.commerce.productTypes.allProductTypes

Returns an array of all product types set up in the system.

```twig
{% for type in craft.commerce.productTypes.allProductTypes %}
    {{ type.handle }} - {{ type.name }}
{% endfor %}
```

## craft.commerce.orderStatuses.allOrderStatuses

Returns an array of <commerce3:craft\commerce\models\OrderStatus> objects representing all the order statuses in the system.

```twig
{% for status in craft.commerce.orderStatuses.allOrderStatuses %}
    {{ status.handle }} - {{ status.name }}
{% endfor %}
```

## craft.commerce.discounts.allActiveDiscounts

Returns an array of all enabled discounts set up in the system active for the current date and time.

```twig
{% for discount in craft.commerce.discounts.allActiveDiscounts %}
    {{ discount.name }} - {{ discount.description }}
{% endfor %}
```

## craft.commerce.discounts.getDiscountByCode(code)

Returns a discount that matches the code supplied.

```twig
{% set discount = craft.commerce.discount.getDiscountByCode('HALFOFF') %}
{% if discount %}
    {{ discount.name }} - {{ discount.description }}
{% endif %}
```

## craft.commerce.sales.allSales

Returns an array of all sales set up in the system.

```twig
{% for sale in craft.commerce.sales.allSales %}
    {{ sale.name }} - {{ sale.description }}
{% endfor %}
```
