# Discounts

::: warning
Discounts are only available in the [Pro edition](editions.md) of Craft Commerce.
:::

Discounts are deductions that can be applied either to line items or the order as a whole.

Discounts are only calculated _while_ items are in the cart. [Sales](sales.md) are pricing rules that apply to products _before_ they’re added to the cart.

To create a new discount, navigate to Commerce → Promotions → Discounts in the control panel.

## Discount Sort Order

Discounts are processed and applied in the order they are sorted in the control panel.

Inside each discount is a checkbox labelled “Stop processing further discounts after this discount matches”. If this option is ticked and the discount matches the order, no further discounts will be applied to the cart.

## Coupon Discounts

Discounts can have a coupon requirement as an optional condition. The coupon condition can be
found on the “Coupon” tab.

If no coupon is entered for the cart and the discount has a coupon code, the discount will not apply.

If a coupon is added to the discount, all other conditions still need to be met in addition to the coupon being applied to the cart.

To update the coupon code on the cart, see the [coupon codes](coupon-codes.md) template guide.

## Discount Conditions

The discount functionality comes with a variety of conditions allowing you to specify criteria to be met in order for a discount to be applied.

Conditions are all optional and can be used in any combination.

### Dates

Restrict the discount to a specific time period defined by start and end date fields.

### User Groups

Limit the discount to selected user groups the customer must belong to when checking out.

### Product Variant

Require one or more specific product variants for the discount to apply.

### Categories

Limit the discount to one or more categories the purchasables/products must relate to.

### Categories Relationship Type

This field specifies the type of relationship must exist between the purchasable and category in order for the [Categories](#categories) condition to be met. There are three options:

- **Source**: the relational field exists on the product/purchasable.
- **Target**: the category has a product/variant relational field.
- **Both**: the relationship can be either **Source** or **Target**

For more information on how this works please see [Relations Terminology](https://docs.craftcms.com/v3/relations.html#terminology).

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

## Discount Amounts

There are several ways to define the actual amount that should be discounted:

### Base Discount

A discounted amount applied to the total order price. This can be a flat value (\$10) or a percentage (10%).

There are further options for percentage-based discounts. These allow you to determine if the discount is applied to the orginal or discounted price, and whether or not it applies to shipping costs.

### Per Item Discount

The flat value which should discount each item in the order e.g. \$1.

### Percent Discount

The percentage value which should discount each item in the order, and whether it should be off the original or discounted price.

### Ignore sales when this discount is applied

When applied, this will prevent sales from being applied if this discount is applied.

### Remove all shipping costs from the order

If the discount is applied all shipping costs from the order will be removed.

### Remove shipping costs for matching products only

If the discount is applied all shipping costs for matching products on the order will be removed.

### Don't apply subsequent discounts if discount is applied

When this setting is on and the discount applies, discounts further down in the discounts list will not be applied. This makes it possible to prevent cummulative discounts from being applied.
