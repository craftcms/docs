# Discounts <badge type="edition" vertical="middle" title="Discounts are only available in Commerce Pro">Pro</badge>

Discounts are deductions that can be applied either to line items or the order as a whole.

Discounts are only calculated while items are in the cart. [Sales](sales.md) are pricing rules that apply to products _before_ they’re added to the cart.

You’ll need _Manage discounts_ permission to work with discounts in the control panel via **Commerce** → **Promotions** → **Discounts**.

## Discount Sort Order

Discounts are processed and applied in the order they are sorted in the control panel.

Inside each discount is a checkbox labelled **Stop processing further discounts after this discount matches**. If this option is ticked and the discount matches the order, no further discounts will be applied to the cart.

## Coupon Discounts

Discounts can have a coupon requirement as an optional condition, which you can manage on the **Coupon** tab.

If no coupon is entered for the cart and the discount has a coupon code, the discount will not apply.

If a coupon is added to the discount, all other conditions still need to be met in addition to the coupon being applied to the cart.

To update the coupon code on the cart, see the [coupon codes](coupon-codes.md) template guide.

## Discount Conditions

The discount functionality comes with a variety of conditions allowing you to specify criteria to be met in order for a discount to be applied.

Conditions are all optional and can be used in any combination.

### Dates

Restrict the discount to a specific time period defined by start and end date fields.

### Discount Condition Formula

The discount condition formula lets you use a simple Twig condition syntax to add a matching rule to the discount.
If the field is left blank, then the condition will match the order being matched to the discount (the other conditions will still apply).

The field accepts the [Twig’s expression syntax](https://twig.symfony.com/doc/2.x/templates.html#expressions), which is an expression that returns `true` or `false`.

If the expression is calculated as `true` then the discount matches the order. If not, the condition disqualifies the order from the discount. A blank condition is the same as
a `true` expression.

The condition formula can use an `order` variable, which for safety is available as an array and not the order element. This prevents a store manager from accidentally calling methods like `order.markAsComplete()`.

::: tip
The condition formula’s `order` array is generated with:

```php
$order->toArray(
    [], ['lineItems.snapshot', 'shippingAddress', 'billingAddress']
);
```
:::

Inside the condition formula you have access to the `order` variable. This is a data only representation of the order.
The variable contains the same data you’d see exported from the order index page.

Here are some examples of an discount’s condition formula:

**Example 1:**

```twig
'@myclient.com' in order.email
```

The above would be a `true` statement if the order’s email contains the string `@myclient.com`.

This would be a way of giving this discount to anyone from that company.

**Example 2:**

```twig
order.shippingAddressId and order.shippingAddress.zipCode[0:2] == '70'
```

The above would be a `true` statement if the order has a shipping address and the shipping address `zipCode` starts with `70`.

This would be a way of giving this discount to anyone shipping to that postal code.

**Example 3:**

```twig
order.myCustomLicenseField and order.myCustomLicenseField == 'Supporter'
```

The above would be a `true` statement if the order has a custom `myCustomLicenseField` field with a value of `Supporter`.

This would be a way of giving this discount to anyone that’s chosen a specific product license, and you could similarly use it to offer discounts that depend on custom field data.

::: tip
For safety, only a serialized representation of order attributes is available; you can’t call custom field methods from a condition formula.
:::

### User Groups

Limit the discount to selected user groups the customer must belong to when checking out.

### Product Variant

Require one or more specific product variants for the discount to apply.

::: tip
Only _promotable_ purchasables may have discounts and sales applied. This means the **Promotable** switch must be enabled on the variant’s product in the control panel, which is the default for any new product.
:::

### Categories

Limit the discount to one or more categories the purchasables/products must relate to.

### Categories Relationship Type

This field specifies the type of relationship must exist between the purchasable and category in order for the [Categories](#categories) condition to be met. There are three options:

- **Source**: the relational field exists on the product/purchasable.
- **Target**: the category has a product/variant relational field.
- **Both**: the relationship can be either **Source** or **Target**

For more information on how this works please see [Relations Terminology](https://craftcms.com/docs/3.x/relations.html#terminology).

### Purchase Total

Require a minimum total value or matching items for the discount to apply.

### Minimum Purchase Quantity

Require a minimum number of matching order items for the discount to apply.

### Maximum Purchase Quantity

Require a maximum number of matching order items for the discount to apply. A zero value here will skip this condition.

### Per User Discount Limit

Limit how many times, per user, the discount is allowed to be applied. This requires a user to be logged in; guests users will not be able to use the discount.

::: tip
Usage/counts can be reset at any point with the “Reset usage” button.
:::

### Per Email Address Discount Limit

Limit how many times one email address may use the discount. This applies to all previous orders, whether guest or user. Set to zero for unlimited use by guests or users.

::: tip
Usage/counts can be reset at any point with the “Reset usage” button.
:::

### Total Discount Use Limit

Limit how many times this coupon can be used in total by guests or logged in users. Set to zero for unlimited use.

::: tip
The counter can be reset at any point with the “Clear counter” button.
:::

::: tip
The discount uses counter will always increment whether or not a limit is set. This is helpful to keep an eye on the usage of the discount.
:::

### Exclude this discount for products that are already on sale

If the item is already on sale, the discount will not be applied.

## Discount Actions

Discount actions control the effect the discount have on the order.

To take an amount off a line item, a discount adjustment is applied. One discount can add multiple discount adjustments.
The first thing the discount does is create an adjustment for each “Per Item Amount Off”. It then calculates the “Per Item Percentage Off”, then takes away the “Flat Amount Off Order”.

### Applied Scope

To determine which line items in the order will be discounted, a discount has an “Applied Scope”.

The options are:

**Discount the matching items only**\
This will only add “Per Item Amount Off” and “Per Item Percentage Off” discount amounts to the matching line items.

Matching items are those items used to match this discount’s conditions, like “Product Variant” or “Category” conditions.

**Discount all line items**\
This will add “Per Item Amount Off” and “Per Item Percentage Off” discount amounts to all line items.

Please note that the “Flat Amount Off Order” is applied to the whole order, so it’s not affected by the applied scope option and applies its discount to every line item—most expensive to least expensive—until it’s used up.

### Per Item Amount Off

The flat value which should discount each item in the order e.g. \$1. This is controlled by the "Applied Scope".

### Per Item Percentage Off

The percentage value which should discount each item in the order, and whether it should be off the original or discounted price.

Original price is the sale price of the item. The Discounted price is the sale price of the item minus any other discounts that were applied before this one.

Whether it is based on the Original or Dicounted price, it is always calculated after the “Per Item Amount Off” has been taken off the item.

This is controlled by the "Applied Scope".

### Ignore sales when this discount is applied to matching line items

When checked, this will prevent sales from being applied to matching line items.

Matching line items are those items used to match this discount’s conditions, like “Product Variant” or “Category” conditions.

### Flat Amount Off Order

A discounted currency amount to be taken off the whole order e.g. \$100.

This amount will be spread across the whole order from the most expensive item to the least expensive item.

If all line items have been discounted to a zero price then the remaining amount of discount is discarded. It cannot make the order negative.

This amount is not affected by the Applied Scope.

### Additional Actions

#### Remove all shipping costs from the order

Remove all shipping costs from the order.

#### Remove shipping costs for matching products only

If the discount is applied, no shipping costs for matching items will be added to the order.

Matching items are those items used to match this discount’s conditions, like “Product Variant” or “Category” conditions.

#### Don’t apply any subsequent discounts to an order if this discount is applied

When this setting is on and the discount applies, discounts further down in the discounts list will not be applied. This makes it possible to prevent cumulative discounts from being applied.

## Templating

### craft.commerce.discounts.allActiveDiscounts

Returns an array of all enabled discounts set up in the system active for the current date and time.

```twig
{% for discount in craft.commerce.discounts.allActiveDiscounts %}
    {{ discount.name }} - {{ discount.description }}
{% endfor %}
```

### craft.commerce.discounts.getDiscountByCode(code)

Returns a [Discount](commerce3:craft\commerce\models\Discount) model that matches the supplied code.

```twig
{% set discount = craft.commerce.discounts.getDiscountByCode('HALFOFF') %}
{% if discount %}
    {{ discount.name }} - {{ discount.description }}
{% endif %}
```
