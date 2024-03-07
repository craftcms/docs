---
updatedVersion: 'commerce/5.x/system/discounts'
---

# Discounts

!!!include(docs/.artifacts/commerce/4.x/shared/edition-changes.md)!!!

Discounts are deductions that can be applied either to line items or the order as a whole.

Discounts are only calculated while items are in the cart. [Sales](sales.md) are pricing rules that apply to products _before_ they’re added to the cart.

You’ll need _Manage discounts_ permission to work with discounts in the control panel via **Commerce** → **Promotions** → **Discounts**.

## Discount Sort Order

Discounts are processed and applied in the order they are sorted in the control panel.

Each discount’s **Actions** tab includes a lightswitch labeled **Don’t apply any subsequent discounts to an order if this discount is applied**. If this option is enabled and the discount matches the order, no further discounts will be applied to the cart.

## Coupon Discounts

Discounts can have a coupon requirement as an optional condition, which you can manage on the **Coupons** tab.

If no coupon is entered for the cart and the discount has a coupon code, the discount will not apply.

If a coupon is added to the discount, all other conditions still need to be met in addition to the coupon being applied to the cart.

For more on coupon code setup and templating, see the [coupon codes](coupon-codes.md) page.

## Discount Matching Items

Each discount’s **Matching Items** tab provides options for limiting what store items qualify for the discount. By default, _all purchasables_ qualify for the discount.

### Purchasables

You can restrict a discount to specific purchasables by enabling the **Only match certain purchasables…** option, and selecting one or more via the revealed element picker(s). Each registered purchasable type will display its own selection field—but by default, this is only variants.

If this is enabled and no purchasables are selected, the discount will never match.

::: tip
Only variants belonging to _promotable_ products may have discounts and sales applied. This means the **Promotable** switch must be enabled on the variant’s product in the control panel, which is the default for any new product.
:::

### Relationships

Oftentimes, it makes more sense to make discounts available based on categories or other taxonomies than on specific products.

Let’s assume your store is organized into departments that are defined by a [category group](/4.x/categories.md) or [entry section](/4.x/entries.md). On each product (or variant), administrators select one or more of those departments via a category or entry custom fields.

In the **Matching Items** tab, enabling **Only match purchasables related to…** will reveal two element selection fields (one for categories and one for entries), as well as an [Advanced](#advanced) drawer, which allows you to specify the [direction](/4.x/relations.md#sources-and-targets) of the relationship. If you enable the relational criteria and don’t select any categories or entries

::: tip
The **Categories** field will only be displayed if you have a category group configured; similarly, the **Entries** field will only be displayed if you’ve configured a section.
:::

#### Advanced

The “Advanced” drawer contains the **Relationship Type** field that determines how related purchasables should behave when matching items.

- **Either way (Default)**: the relational field can be on the purchasable _or_ the category/entry (the purchasable may be the source _or_ target of the relationship);
- **The purchasable defines the relationship**: the relational field is defined on the _purchasable_, and you select categories or entries from it (the purchasable is the _source_ of the relationship);
- **The purchasable is related by another element**: the relational field is defined on the category/entry, and you select purchasables from it (the purchasable is the _target_ of the relationship);

::: tip
This behavior is consistent with all Craft’s relationships; see the [Terminology](/4.x/relations.html#terminology) section on the Relations page for more information on sources and targets.
:::

To illustrate, suppose the “departments” we mentioned earlier each represent a landing page. Those pages (managed as entries in Craft) are also be used to organize products, through an [entries field](/4.x/entries-field.md) in the product type’s field layout. As products are added and edited, administrators place them in departments by selecting those entries as relations. In this scenario, both the **Either way** and **The purchasable defines the relationship** settings would allow the discount to match a department entry selected in its purchasable-matching rules.

Now, if you were to add a “Featured Products” field to the department landing pages and select a few products, the third **The purchasable is related by another element** relationship type setting would match.

This combination of settings can provide powerful matching criteria all on their own. You can even define back-end-only taxonomies (without content or URLs) for the express purpose of managing pricing rules.

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

The order condition formula lets you use a simple Twig condition syntax to add a matching rule to the discount.
If the field is left blank, the condition will match the order being matched to the discount (the other conditions will still apply).

The field accepts the [Twig’s expression syntax](https://twig.symfony.com/doc/3.x/templates.html#expressions), which is an expression that returns `true` or `false`.

If the expression is calculated as `true`, the discount matches the order. If not, the condition disqualifies the order from the discount. An empty condition is the same as a `true` expression.

The condition formula can use an `order` variable, which for safety is an array and not the order element—it’s the same representation of the order you’d see if you exported it from the order index page. This data-only format prevents a store manager from accidentally calling methods like `order.markAsComplete()`.

::: tip
The condition formula’s `order` array is generated with:

```php
$order->toArray(
    [], ['lineItems.snapshot', 'shippingAddress', 'billingAddress']
);
```
:::

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

Returns a [Discount](commerce4:craft\commerce\models\Discount) model that matches the supplied code.

```twig
{% set discount = craft.commerce.discounts.getDiscountByCode('HALFOFF') %}
{% if discount %}
  {{ discount.name }} - {{ discount.description }}
{% endif %}
```
