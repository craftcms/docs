# Catalog Pricing Rules

Pricing rules are sets of [conditions](#conditions) and [actions](#actions) that determine prices of [purchasables](purchasables.md).

::: tip
The catalog pricing system replaces [sales](sales.md) from earlier versions of Commerce. If you [upgraded](../upgrade.md) your store from 4.x to 5.x and had already configured one or more sales, they will continue to work as expected. However, the new and old systems are _not_ interoperable, and Commerce will only expose one set of controls at a time—you will see _either_ a **Sales** _or_ **Pricing Rules** item within the **Store Management** navigation.

If you wish to take advantage of pricing rules after the upgrade, you must first remove all existing sales.
:::

Catalog pricing is computed and stored in the database when the underlying data changes. Prices can also be manually refreshed at any time (or on a schedule) with the `commerce/pricing-catalog/generate` console command. The resulting pricing information is joined in with normal variant queries and available transparently on the returned elements—even when rules produce customer-specific pricing!

This also means that you can accurately [sort and filter](#pricing-queries) based on effective prices in variant queries.

To create a pricing rule, visit <Journey path="Commerce, Store Management, Pricing Rules" />, and click **New catalog pricing rule**.

## Conditions

A pricing rule applies to any purchasable that satisfies its **Conditions**, but may can be scoped to a specific set of **Customers** (Craft [users](/5.x/reference/element-types/users.md)).

Start Date
:   Apply this rule _after_ the chosen date.

End Date
:   Apply this rule _before_ the chosen date.

Match Product <Since product="commerce" ver="5.1.0" feature="Product matching" />
:   Apply the rule only to purchasables belonging to products that match the provided conditions.

Match Variant <Since product="commerce" ver="5.1.0" feature="Variant matching" />
:   Apply the rule only to variants matching the provided condition.

Match Purchasable
:   Set conditions that apply to any type of purchasable, including those provided by plugins.

Match Customers
:   Make the rule available only to customers who match the provided conditions. Rules that include customer conditions are implicitly limited to registered users.

::: warning
If no conditions are configured, the rule will match _all_ purchasables, and _all_ customers (whether or not they are logged in).
:::

## Actions

When a rule matches a purchasable, its **Action** is applied. An action takes the matched purchasable’s price or promotional price, performs the defined arithmetic, and places the result in the pricing catalog as the new price or promotional price.

You can think of a pricing rule as having an independent _input_ and _output_. The input can come from the purchasable’s price or promotional price, and the output can be directed to the purchasable’s price or promotional price.

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

More than one pricing rule can match a purchasable. In the event of such an overlap, Commerce selects the _lowest_ calculated price that would apply. Prices and promotional prices are always kept separate, as are the prices for each store.

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

## Dynamic Pricing

The pricing catalog and discounts both operate on preestablished criteria and actions. In situations where a price needs to be dynamically calculated (say, from customer input in the form of [custom fields](orders-carts.md#field-layout) or [line item options](../development/cart.md#line-item-options-and-notes)), Commerce gives you complete control over pricing and cart contents via its [events system](../extend/events.md).

Read about [dynamically changing line item prices](kb:dynamically-customizing-line-item-prices) in the Knowledge Base.

## Querying Prices

Price data is always returned when executing [variant queries](products-variants.md#querying-variants). You can order any query by price, like this:

```twig{6}
{# Fetch variants featured in a given article: #}
{% set variants = craft.variants()
  .relatedTo({
    sourceElement: entry,
  })
  .orderBy('price DESC')
  .all() %}
```

Substitute `promotionalPrice` or `salePrice` to explicitly order by those resolved values.

::: warning
In general, `salePrice` will produce the most reliable and useful sorting. When using `promotionalPrice`, variants with no base promotional price defined will sort based on your database’s handling of `null` values, and may require an additional criteria like `['promotionalPrice IS NOT NULL', 'promotionalPrice DESC']` or `promotionalPrice DESC NULLS LAST` to ensure they appear at the end (or beginning) of the results.
:::

Variants can also be filtered by price, using values compatible with <craft5:craft\helpers\Db::parseNumericParam()>:

```twig
{% set dollarOrLess = craft.variants()
  .price('<= 1')
  .all() %}
```

To return variants with effective promotional pricing (a promotional price less than its base price), use the `.onPromotion()` query param:

```twig
{% set saleItems = craft.variants()
  .onPromotion(true)
  .all() %}
```

::: tip
See our [Listing Products On Sale](kb:listing-products-on-sale) article for some examples of advanced price-based queries.
:::

This behavior approximates variants’ `.getOnPromotion()` method, but performs the comparisons directly in the database (rather than loading every variant and comparing them in memory)!

It is currently only possible to directly sort and filter _products_ by their default variant’s price—but you can always use the [`hasVariant` param](products-variants.md#product-hasvariant) to build more sophisticated variant-based criteria.
