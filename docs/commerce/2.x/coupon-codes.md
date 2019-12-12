# Coupon Codes

Coupon codes are set up as a condition within a discount promotion. 

To create a new discount, go to Commerce → Promotions → Discounts in the Control Panel. 
To see the coupon condition, go to the “Coupon” tab.

Discounts are only available in the Pro edition of Craft Commerce.

An empty coupon field on the discount means there is no requirement for a coupon
for the discount to work. Adding a coupon requires that a coupon is submitted to 
the cart. This makes the discount available to match the order but still needs to match all other discount conditions.

Read more about [Discounts](discounts.md).

## Using a coupon

To add a coupon to the cart, a customer submits the `couponCode` parameter to the cart using the `commerce/cart/update-cart` form action.

Example:

```twig

<form method="POST">
<input type="hidden" name="action" value="commerce/cart/update-cart">
<input type="hidden" name="cartUpdatedNotice" value="Added coupon code.">
{{ redirectInput('shop/cart') }}
{{ csrfInput() }}

{% set hasValidCoupon = craft.commerce.discounts.isCouponValidForCart(cart.couponCode, cart) %}

{% if not hasValidCoupon and cart.couponCode %}
  <span class="flash text-red">{{ 'Coupon is invalid.'|t('commerce') }}</span>
{% elseif cart.couponCode and hasValidCoupon %}
  <span class="flash text-green">{{ 'Coupon is valid.'|t('commerce') }}</span>
{% endif %}
                        
<span class="{% if not hasValidCoupon and cart.couponCode %}has-error{% endif %}">
  <input type="text" name="couponCode" width="11"
  class="{% if not hasValidCoupon and cart.couponCode %}has-error{% endif %}"
  value="{{ cart.couponCode }}"
  placeholder="{{ "Coupon Code"|t }}">
</span>


<input type="submit" value="Update Cart"/>
<form>
```

Coupon codes fields are not validated on the cart/order model. Use the `craft.commerce.discounts.isCouponValidForCart()` method to see if the entered coupon is valid for the current cart.

Only one coupon code can exist on the cart at a time. The current coupon code 
submitted to the cart can be seen by outputting `{{ cart.couponCode }}`.

You can retrieve the discount associated with the coupon code with:

```twig
{% set discount = craft.commerce.discounts.getDiscountByCode(cart.couponCode) %}
{% if discount %}
{{ discount.name }} - {{ discount.description }}
{% endif %}
```

This is useful for displaying discount conditions that need to be met for the customer to have the coupon work.



 

 
