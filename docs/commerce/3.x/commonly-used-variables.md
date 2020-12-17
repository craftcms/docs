# Commonly Used Variables

The following are common methods you will want to call in your front end templates:

## craft.commerce.settings

To get the Craft Commerce [general settings model](commerce3:craft\commerce\models\Settings):

```twig
{% set settings = craft.commerce.settings %}
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
