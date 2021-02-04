# Coupon Codes

Coupon codes are unique strings that may be entered by a user in order to receive a discount.

::: warning
Discounts are only available in the [Pro edition](editions.md) of Craft Commerce.
:::

With Craft Commerce, coupon codes are set up as a condition within a discount promotion.

To create a new discount promotion, navigate to **Commerce** → **Promotions** → **Discounts** in the control panel. To see the coupon condition, select to the “Coupon” tab.

An empty coupon field on the discount means no coupon is needed for the discount to work. Adding a coupon requires that a coupon is submitted to the cart. This makes the discount available to match the order but still needs to match all other discount conditions.

Read more about [Discounts](discounts.md).

## Using a coupon

To add a coupon to the cart, a customer submits the `couponCode` parameter using the `commerce/cart/update-cart` form action.

Example:

```twig
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    {{ hiddenInput('successMessage', 'Added coupon code.'|hash) }}
    {{ redirectInput('shop/cart') }}

    <input type="text"
       name="couponCode"
       class="{% if cart.getFirstError('couponCode') %}has-error{% endif %}"
       value="{{ cart.couponCode }}"
       placeholder="{{ "Coupon Code"|t }}">

    <button type="submit">Update Cart</button>
</form>
```

Only one coupon code can exist on the cart at a time. To see the value of the current cart’s coupon code, use `{{ cart.couponCode }}`.

You can retrieve the discount associated with the coupon code using `craft.commerce.discounts.getDiscountByCode`:

```twig
{# @var discount craft\commerce\models\Discount #}
{% set discount = craft.commerce.discounts.getDiscountByCode(cart.couponCode) %}
{% if discount %}
{{ discount.name }} - {{ discount.description }}
{% endif %}
```
