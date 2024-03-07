# Catalog Pricing Rules

Pricing rules are sets of [conditions](#conditions) and [actions](#actions) that determine prices of [purchasables](purchasables.md).

::: tip
The catalog pricing system replaces _sales_ from earlier versions of Commerce. If you upgraded your store from 4.x to 5.x and had already configured one or more sales, you will retain access to them—but we strongly recommend migrating your sales into pricing rules.
:::

Catalog pricing is computed and stored in the database when its underlying data changes. Prices can also be manually refreshed at any time (or on a schedule) with the `commerce/pricing-catalog/generate` console command.

The resulting pricing information is joined in with normal variant queries and available transparently on the returned elements—even when rules produce customer-specific pricing!

To create a pricing rule, visit <Journey path="Commerce, Store Management, Pricing Rules" />, and click **New catalog pricing rule**.

## Conditions

A pricing rule applies to any purchasable that satisfies its **Conditions**, but may can be scoped to a specific set of **Customers** (Craft [users](/5.x/reference/element-types/users.md)).

::: warning
If no conditions are configured, the rule will match _all_ purchasables, and _all_ customers (whether or not they are logged in).
:::

Rules can also be limited to a specific date range with its **Start Date** and **End Date** options.

## Actions

When a rule matches a purchasable, its **Action** is applied. An action takes the matched purchasable’s price or promotional price, performs the defined arithmetic, and places the result in the pricing catalog as the new price or promotional price.

You can think of a pricing rule as having an independent _input_ and _output. The input can come from the purchasable’s price or promotional price, and the output can be directed to the purchasable’s price or promotional price.

The possible actions are:

| Action | Effect | Source Price
| ------------- | ------------------------ | ---------------------------------- |
| Reduce price… | …by a percentage of…     | …the original price.               |
|               |                          | …the original _promotional_ price. |
|               | …by a fixed amount from… | …the original price.               |
|               |                          | …the original _promotional_ price. |
| Set price…    | …to a percentage of…     | …the original price.               |
|               |                          | …the original _promotional_ price. |
|               | …to a flat amount.       | —                                  |

Use the **Is Promotional Price?** toggle to choose which price the rule will affect. When this is _off_, the computed value becomes the _price_; when it’s _on_, the computed value becomes the _promotional price_.

::: tip
All pricing rules operate on the purchasable’s original price or original promotional price. Pricing rules _do not_ stack.
:::

## Conflicts

More than one pricing rule can exist for a single purchasable. In the event of such an overlap, Commerce selects the _lowest_ calculated price that would apply. Prices and promotional prices are always kept separate, as are the prices for each store.

## Debugging

To visualize what pricing a customer will see, you can pass their user ID to the `.forCustomer()` variant query param:

```twig
{% set user = craft.users()
  .username('oli')
  .one() %}

{% set myVariant = craft.variants()
  .id(1234)
  .forCustomer(user.id)
  .one() %}

{{ user.fullName }} would pay <del>{{ myVariant.price|commerceCurrency }}</del> {{ myVariant.promotionalPrice|commerceCurrency }}
```

Similarly, to check the price for a _guest_, you can pass `false`, explicitly:

```twig
{% set myVariant = craft.variants()
  .forCustomer(false)
  .one() %}

A guest would pay <del>{{ myVariant.price|commerceCurrency }}</del> {{ myVariant.promotionalPrice|commerceCurrency }}
```
