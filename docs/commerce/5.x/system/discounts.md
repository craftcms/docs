# Discounts

!!!include(docs/.artifacts/commerce/5.x/shared/edition-changes.md)!!!

Discounts are adjustments that can match and apply to individual line items, or to an order as a whole Discounts are only calculated while items are in the cart.

::: warning
If you need to manage how prices are displayed to customers _before_ an item is in their cart, use the new [catalog pricing rules](pricing-rules.md) system.
:::

Users with the _Manage discounts_ permission can add and edit discounts in the control panel via <Journey path="Commerce, Promotions, Discounts" />.

## Discount Sort Order

Discounts are processed and applied in the order they are sorted in the control panel.

Each discount’s **Actions** tab includes a lightswitch labeled **Don’t apply any subsequent discounts to an order if this discount is applied**. If this option is enabled and the discount matches the order, no further discounts will be applied to the cart.

## Coupon Discounts

Discounts can have a coupon requirement as an optional condition, which you can manage on the **Coupons** tab.

If no coupon is entered for the cart and the discount has a coupon code, the discount will not apply.

If a coupon is added to the discount, all other conditions still need to be met in addition to the coupon being applied to the cart.

For more on coupon code setup and templating, see the [coupon codes](coupon-codes.md) page.

## Discount Matching Items

Each discount’s **Matching Items** tab provides options for limiting what store items qualify for the discount. By default, _all purchasables_ (that are considered promotable) qualify for the discount.

### Purchasables

You can restrict a discount to specific purchasables by enabling the **Only match certain purchasables…** option, and selecting one or more via the revealed element picker(s). Each registered purchasable type will display its own selection field—but by default, this is only [variants](products-variants.md).

If this is enabled and no purchasables are selected, the discount will never match.

::: warning
Only variants marked as **Promotable** will match discount conditions (even if they are explicitly selected in one of the rules).
:::

## Discount Conditions Rules

The **Conditions Rules** tab has flexible, rule-based condition fields for controlling which orders, customers, and/or addresses should qualify for the discount.

### Match Order

By default, any order can qualify for the discount. You can use this setting to add any number of rules to further limit which orders may qualify.

### Match Customer

By default, any customer can qualify for the discount. You can use this setting to add any number of rules to further limit which customers may qualify.

### Match Shipping Address

By default, any shipping address can qualify for the discount. You can use this setting to add any number of rules to further limit shipping addresses that may qualify.

### Match Billing Address

By default, any billing address can qualify for the discount. You can use this setting to add any number of rules to further limit billing addresses that may qualify.

## Discount Conditions

The discount functionality comes with a variety of conditions allowing you to specify criteria to be met in order for a discount to be applied.

Conditions are all optional and can be used in any combination.

### Dates

Restrict the discount to a specific time period defined by start and end date fields.

### Order Condition Formula

The order condition formula lets you define custom logic via a pared-down [Twig expression](https://twig.symfony.com/doc/3.x/templates.html#expressions) that returns `true` or `false`. Formulas are ultimately evaluated as part of an `{% if ... %}` control tag.

- If the field is left blank it has no effect on the matching.
- If the expression evaluates to `true` (or any equivalent “[truthy](https://twig.symfony.com/doc/3.x/tags/if.html)” value), the discount _matches_ the order.
- If the expression evaluates to `false` (or any equivalent “falsey” value) the condition _disqualifies_ the order.

The condition formula has access to an `order` variable, which (for safety) is an array and not the order element—effectively the same representation of the order you’d see if you exported it from the order index page. This data-only format prevents a store manager from accidentally or maliciously calling methods like `order.markAsComplete()`. The same is true for any nested elements and custom field values—everything is serialized into arrays and scalar values.

::: tip
As an additional safeguard, only a handful of Twig filters, functions, tags, and variables are available in this context. See <commerce5:craft\commerce\services\Formulas> for a complete list of allowed features.
:::

Here are some examples of an discount’s condition formula:

Example 1: Company Email Discount

:   ```twig
    '@myclient.com' in order.email
    ```

    The above would be a `true` statement if the order’s email contains the string `@myclient.com`.

    This would be a way of giving a discount to customers using a specific company’s email address.

    ::: warning
    Guest customers do not need to verify the email they use on an order! You may need to use the **Match Customer** condition builder to ensure they are a registered user.
    :::

Example 2: Local Customers

:   ```twig
    order.shippingAddressId and order.shippingAddress.postalCode[0:2] == '70'
    ```

    The above would be a `true` statement if the order has a shipping address and the shipping address `postalCode` starts with `70`.

    This would be a way of giving this discount to anyone shipping to that postal code.

Example 3: Custom Fields

:   ```twig
    order.myCustomLicenseField and order.myCustomLicenseField == 'Supporter'
    ```

    The above would be a `true` statement if the order has a custom `myCustomLicenseField` field with a value of `Supporter`.

    This would be a way of giving this discount to anyone that’s chosen a specific product license, and you could similarly use it to offer discounts that depend on custom field data.

Whenever possible, we recommend implementing **Order Condition Formula** as **Match Order** conditions. Doing so means that we can automatically migrate conditions or provide suggestions during major version upgrades.

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

A discounted currency amount to be taken off the whole order e.g. $100.

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

Returns a [Discount](commerce5:craft\commerce\models\Discount) model that matches the supplied code.

```twig
{% set discount = craft.commerce.discounts.getDiscountByCode('HALFOFF') %}
{% if discount %}
  {{ discount.name }} - {{ discount.description }}
{% endif %}
```
