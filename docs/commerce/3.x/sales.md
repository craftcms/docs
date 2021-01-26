# Sales

Sales allow a store manager with _Manage promotions_ permission to set up conditions for dynamic, promotional product discounts.

A sale is different from a [discount](discounts.md) because it’s applied _before_ an item is added to the cart. A discount needs a cart; it’s applied when an item’s in the cart or to the cart as a whole (like a coupon code).

An item in the store would typically be listed by its sale price. If no sales apply to a given product, its sale price would simply equal its regular price.

Sales are ordered in the control panel, and the system always runs through each sale in order when determining the `salePrice` of the purchasable.

## Conditions

When creating a sale, you can set a number of conditions to be evaluated when determining if the sale should be applied to the purchasable. All conditions must match to have the sale applied. Leaving a condition empty ignores that condition.

::: tip
Only _promotable_ purchasables may have discounts and sales applied. This means the **Promotable** switch must be enabled on the variant’s product in the control panel, which is the default for any new product.
:::

### Start date

When the sale can start to be applied to matching products.

### End date

When the sale stops being applied to matching products.

### User Group

Whether the cart’s customer belongs to one of the matching user groups.

### Variant

Whether the purchasable being matched is one of the selected variants.

### Category

Whether the purchasable being matched is related to the selected category.

For example, you might have a category of products in the “Womens Sport” department category, and this allows you to put all products in that category on sale.

For variants, the category can be related to either the product or the variant to match this condition.

Each custom purchasable can decide to determine how it considers the selected category.

### Category Relationship Type

This field specifies the type of relationship must exist between the purchasable and category in order for the condition to be met. There are three options available “Source”, “Target” and “Both”:

- **Source**: the relational field exists on the product/purchasable.
- **Target**: the category has a product/variant relational field.
- **Both**: the relationship can be either **Source** or **Target**

For more information on how this works, see [Relations Terminology](https://craftcms.com/docs/3.x/relations.html#terminology).

### Other Purchasables

Any other custom purchasable a third party system adds to Commerce can show up here as a condition.

## Actions

If the conditions match the current context (variant, user, cart date, etc.), then the actions are applied to the purchasable.

### Price Effect

There are four ways to apply a price effect:

#### Reduce the price by a percentage of the original price

Enter a percentage amount to take off the price of the purchasable.

Example: for a $100 purchasable, setting this value to 80% would make the purchasable’s sale price $20.

#### Set the price to a percentage of the original price

Enter a percentage amount to become the price of the purchasable.

Example: for a $100 purchasable, setting this value to 20% would make the purchasable’s sale price $20.

#### Reduce the price by a flat amount

Enter an flat currency amount to take off the purchasable’s price.

Example: for a $100 purchasable, setting this value to $20 would make the purchasable’s sale price \$80.

#### Set the price to a flat amount

Enter an flat currency amount to determine the sale price of the purchasable.

Example: for a $100 purchasable, setting this value to $20 would make the purchasable’s sale price \$20.

### Sale Application

There are additional options for how the sale is applied to the product:

#### Ignore previous matching sales if this sale matches. (Checkbox)

This setting will disregard any previous sale that affected the price of the item matched in this sale.

For example, `Sale 1` reduced the price by 10%. Checking this box within `Sale 2` will apply its affect on the original price of the purchasable, ignoring the 10% off.

This is automatically true if either of the following pricing effects are used:

- Set the price to a percentage of the original price
- Set the price to a flat amount

This setting is related to the purchasable being affected.

#### Do not apply subsequent matching sales beyond applying this sale. (Checkbox)

After this sale matches the order, do not apply any other sales, based on the order of sales in the control panel.

This is a sale-level option, not a purchasable-level option like the above `Ignore previous matching sales if this sale matches.`

## Templating

### craft.commerce.sales.allSales

Returns an array of all sales set up in the system, each represented as a [Sale](commerce3:craft\commerce\models\Sale) model.

```twig
{% for sale in craft.commerce.sales.allSales %}
    {{ sale.name }} - {{ sale.description }}
{% endfor %}
```
