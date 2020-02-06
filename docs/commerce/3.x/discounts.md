# Discounts

Discounts are deductions off line items or deduction off the order as a whole.
Discounts are only calculated _while_ items are in the cart, [Sales](sales.md) are pricing rules that apply to product _before_ they are added to the cart.

Discounts are only available in the Pro edition of Craft Commerce.

To create a new discount, go to Commerce → Promotions → Discounts in the control panel.

## Discount Sort Order

Discounts are processed and applied in the order they are sorted in the control panel.

Inside a discount there is a checkbox labelled “Stop processing further discounts after this discount matches”.
If this checkbox is turned on, and the discount matches the order, no further discounts will be applied to the cart.

## Coupon Discounts

Discounts can have a coupon requirement as an optional condition. The coupon condition can be
found on the “Coupon” tab.

If no coupon is entered into the cart, and the discount has a coupon code, then the discount will not apply.

If a coupon is added to the discount, all other conditions still need to be met in addition to the coupon being applied to the cart.

To update the coupon code on the cart see [coupon codes](coupon-codes.md) in the template guides.

## Discount Conditions

The discount functionality comes with a variety of discounts conditions allowing you to specify certain criteria that must be met before a discount is applied.

Conditions are all optional and can be used in any combination.

### Dates

Start and end date fields are provided to allow the restriction of the discount based on a time period.

### User Groups

To pass this condition a user must belong to one of the selected user groups when checking out.

### Product Variant

The product variant or variants for which the discount will be applicable to.

### Categories

By selecting categories this condition will define that purchasables/products must be related to them in order for the discount to be applied.

### Categories Relationship Type

This field specifies the type of relationship must exist between the purchasable and category in order for the condition to be met. There are three options available "Source", "Target" and "Both"

- **Source** - the relational field exists on the product/purchasable.
- **Target** - the category has a product/variant relational field.
- **Both** - the relationship can be either **Source** or **Target**

For more information on how this works please see [Relations Terminology](https://docs.craftcms.com/v3/relations.html#terminology).

### Purchase Total

The discount will only be applied when the order as has reached a minimum total value or matching items.

### Minimum Purchase Quantity

Minimum number of matching items that need to be ordered for this discount to apply.

### Maximum Purchase Quantity

Maximum number of matching items that can be ordered for this discount to apply. A zero value here will skip this condition.

### Per User Discount Limit

This condition, when set, restricts how many times per user the discount is allowed to be used. This condition requires a user to be logged in. If this is set guests users will not be able to use the discount.

::: tip

Usage/counts can be reset at any point using the "Reset usage" button.

:::

### Per Email Address Discount Limit

How many times one email address is allowed to use this discount. This applies to all previous orders, whether guest or user. Set to zero for unlimited use by guests or users.

::: tip

Usage/counts can be reset at any point using the "Reset usage" button.

:::

### Total Discount Use Limit

How many times this coupon can be used in total by guests or logged in users. Set
zero for unlimited use.

::: tip

Counter can be reset at any point using the "Clear counter" button.

:::

::: tip

The discount uses counter will always increment whether or not a limit is set. This is helpful to keep an eye on the usage of the discount.

:::

### Exclude this discount for products that are already on sale

If the item is already on sale, the discount will not be applied.

## Discount Amounts

### Base Discount

This is the amount of discount that is applied to the order's total price. This comes in the form of either a flat value (\$10) or a percentage (10%).

There are further options for percentage base discounts and these allow you to determine if the discount is applied to the orginal or discounted price and whether or not it discounts shipping costs.

### Per Item Discount

The flat value which should discount each item in the order e.g. \$1.

### Percent Discount

The percentage value which should discount each item in the order and whether it should be off the original or discounted price.

###Ignore sales when this discount is applied

When applied this will prevent sales from being applied if this discount is applied.

### Remove all shipping costs from the order

If the discount is applied all shipping costs from the order will be removed.

### Remove shipping costs for mathcing products only

If the discount is applied all shipping costs for matching products on the order will be removed.

### Don't apply subsequent discounts if discount is applied

With this setting on, when the discount matches and is applied sequent discounts in the discounts list will not be applied. This gives you the ability to stop cummulative discounts from taking place.
