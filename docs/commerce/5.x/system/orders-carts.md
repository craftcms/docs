---
sidebarDepth: 2
containsGeneratedContent: yes
---

# Orders & Carts

Commerce uses a single [Order](commerce5:craft\commerce\elements\Order) element to represent both an in-progress [cart](#carts) and a completed [order](#orders). Whenever we use the terms “cart” and “order,” we’re talking about the same underlying object—but in two different states.

The lifecycle of an order element looks something like this:

1. A customer visits your site and is assigned an [order number](#order-number);
1. Items (purchasables) are added to the cart as _line items_;
1. Additional information is collected to satisfy your [checkout](../development/checkout.md) requirements;
1. Payment is submitted, completing the order;

However, not _all_ carts will become orders in this way! Commerce also allows store managers to [create carts from the control panel](#creating-orders); checkout without payment (or with partial payment) is possible via configuration; carts can be [abandoned](#carts); or a cart can be manually completed via the control panel.

## Carts

As a customer or store manager is building a cart, the goal is to maintain an up-to-date list of items with their relevant costs, discounts, promotions, and metadata. For this reason, the cart will be recalculated each time a change is made.

Once a cart is completed, however, it becomes an [order](#orders) that represents choices explicitly finalized by whoever completed the cart. The order’s behavior changes slightly at this point: the customer will no longer be able to make edits, and changes made by a store manager will not automatically trigger [recalculation](#recalculating-orders).

::: tip
Carts and orders are managed per-[store](stores.md). A customer may have multiple active carts in different stores, each with discrete contents—the cart Commerce loads automatically for a customer depends on what site they’re viewing, in the front-end.

Customers can also [switch between active carts](../development/cart.md#restoring-previous-cart-contents) for a given site.
:::

Carts and orders are both listed on the **Orders** index page in the control panel, where you can further limit your view to _active_ carts (updated in the last hour), and _inactive_ carts (older than an hour). You can customize this time limit using the [`activeCartDuration`](../configure.md#activecartduration) setting.

Craft automatically deletes inactive carts after 90 days. Disable purging with the [`purgeInactiveCarts`](../configure.md#purgeinactivecarts) setting, or fine-tune the delay with [`purgeInactiveCartsDuration`](../configure.md#purgeinactivecartsduration).

Your customers’ experience of the cart and [checkout](../development/checkout.md) can be tailored to your project.

<See path="../development/cart.md" label="Using the cart in your templates" description="Dive into developing cart management experiences in Twig." />

Use of carts and orders is deeply connected to other Commerce features like [addresses](addresses.md), [shipping](shipping.md), [tax](tax.md), and so on.

## Orders

An order is a type of [element](/5.x/extend/element-types.md) that underpins the shopping and checkout experience, in addition to supporting the wide array of content and query features. You can browse orders in the control panel by navigating to <Journey path="Commerce, Orders" />.

When a cart becomes an order, the following things happen:

1. The `dateOrdered` order attribute is set to the current date.
2. The `isCompleted` order attribute is set to `true`.
3. The default [order status](custom-order-statuses.md) is set on the order and any emails for this status are sent.
4. The order reference number is generated for the order, based on the [**Order Reference Number Format** setting](stores.md#settings) for the store it was placed in.

Instead of being recalculated on each change like a cart, the order will only be recalculated if you [manually trigger recalculation](#recalculating-orders).

Adjustments for discounts, shipping, and tax may be applied when an order is recalculated. Each adjustment is related to its order, and can optionally relate to a specific line item.

If you’d like to jump straight to displaying order information in your templates, check out the [cart](../development/cart.md) and [orders](../development/orders.md) development sections, then review the <commerce5:craft\commerce\elements\Order> class reference for a complete list of available methods and properties.

### Order Numbers

There are three ways to identify an order: by order number, short order number, and order reference number.

#### Order Number

The order number is a 32-character, alphanumeric hash generated when the cart cookie is first created. It exists even before the cart is saved in the database, and remains the same for the entire life of the order. Order numbers are _not_ sequential!

```twig
{{ order.number }}
{# -> 706ffb9c4fa439977908f6a4ad0287af #}
```

This is different from the [order reference number](#order-reference-number), which is only generated after a cart has been completed and becomes an order.

::: tip
Use the order number in situations where orders are displayed without authentication—like in a [route](/5.x/system/routing.md#advanced-routing-with-url-rules) segment for a template that displays order details after checkout. See the development page for [an example of a route and template](../development/orders.md#guest-orders) used to display guest orders.
:::

#### Short Order Number

The short order number is the first seven characters of the order number. This is short enough to still be (statistically) unique, but marginally easier for customers to process—although not as friendly as the [order reference number](#order-reference-number).

```twig
{{ order.shortNumber }}
{# -> 706ffb9 #}
```

#### Order Reference

The _order reference_ is generated upon completing a cart using the store’s **Order Reference Number Format** in <Journey path="Commerce, System Settings, Stores" />. It is intended to be a customer-facing alternative to the 32-digit alphanumeric [order number](#order-number).

```twig
{{ order.reference }}
```

The “Order Reference Number Format” is an [object template](/5.x/system/object-templates.md) that’s rendered when the order is completed. It can use order attributes along with Twig filters and functions. For example:

```twig
{{ dateCompleted|date('Y') }}-{{ id }}
```

Output:

```
2024-43
```

In this example, `{{ id }}` refers to the order’s element ID, which is not necessarily sequential (nor predictable in length). If you would rather generate a unique sequential number, a simple way would be to use Craft’s [seq()](/5.x/reference/twig/functions.md#seq) Twig function, which returns the next unique number based on the `name` parameter passed to it.

The `seq()` function takes the following parameters:

1. A key name. If this name is changed, a new sequence starting at one is started.
2. An optional padding character length. For example if the next sequence number is `14` and the padding length is `8`, the output will always be at least that many characters: `00000014`. You can change the padding value without disrupting the sequence.

For example:

```twig
{{ dateCompleted|date('Y') }}-{{ seq(dateCompleted|date('Y'), 8) }}
```

Output:

```
2024-00000023
```

In this example we’ve used the current year as the sequence name so we automatically get a new sequence, starting at `1`, when the next year arrives. You could use the `store`’s handle (like `seq("store-order-#{store.handle}")`) to keep sequences unique per-store, or a static key (like `seq('order-number')`) if you want _all_ orders to occupy the same sequential space.

Sequences are global, so constructing keys that will not collide with others you may use in other fields or templates is essential to avoid gaps.

::: tip
Order references cannot be relied upon for sorting. Use `.orderBy('dateCompleted DESC')` if you wish to display orders in reverse-chronological order.
:::

### Creating Orders

An order is typically created when a customer [adds items](#adding-items-to-a-cart) to their [cart](#carts) and then [checks out](../development/checkout.md). Orders can also be created in the control panel by users with the “Manage Orders” [permission](../reference/permissions.md#manage-orders).

To create a new order, navigate to <Journey path="Commerce, Orders" />, and choose **New Order**. This will create a new order that behaves like a cart—as line items are added to and removed from the order, it will automatically recalculate totals and apply matching discounts and other adjustments. Select a customer and populate the **Billing Address** and **Shipping Address** to ensure prices (including tax and shipping) can be calculated accurately.

To complete the order, press **Mark as completed**.

#### Custom Line Items <Since product="commerce" ver="5.1.0" feature="Custom, ad-hoc line items" />

In addition to selecting from the store’s available [purchasables](purchasables.md), store managers can create ad-hoc _custom line items_ to represent one-off fees or other order contents.

Custom line items behave exactly the same as line items based on a purchasable, except that their `type` property is `custom`, and they do not track a `purchasableId`. Therefore, their other attributes are never be “refreshed” from a purchasable, they will never be “out of stock,” and they will not be part of the [pricing catalog](pricing-rules.md).

Shipping, tax, and other adjustments _can_ still affect custom line items! Any rules and conditions that specify product types, relationships, or other qualities that depend on a preexisting purchasable will never match a custom line item.

### Editing Orders

Completed orders can be edited in the control panel by visiting the order edit page and choosing **Edit**.

While editing the order, it will refresh subtotals and totals and display any errors. It will _not_ automatically recalculate the order based on system rules like shipping, taxes, or promotions. Choose **Recalculate order** to have it fully recalculate including those system rules.

Once you’re happy with your changes, choose **Update Order** to save it to the database. Updating an order after it is completed does not automatically charge or refund the customer! You must take these actions explicitly via the **Transactions** tab.

### Order Totals

Every order includes a few important totals:

- **order.itemSubtotal** is the sum of the order’s line item `subtotal` amounts.
- **order.itemTotal** is the sum of the order’s line item `total` amounts.
- **order.adjustmentsTotal** is the sum of the order’s adjustments.
- **order.total** is the sum of the order’s `itemSubtotal` and `adjustmentsTotal`.
- **order.totalPrice** is the total order price with a minimum enforced by the [minimumTotalPriceStrategy](../configure.md#minimumtotalpricestrategy) setting.

::: tip
Note that `total` _can_ be negative!
:::

### Recalculating Orders

Let’s take a closer look at how carts and orders are recalculated.

A cart or order is always in one of three calculation modes:

- **Recalculate All** — Active for incomplete carts and orders. This mode refreshes each line item’s details from the related purchasable and re-applies all adjustments to the cart. In other words, it rebuilds and recalculates cart details based on information from purchasables and how Commerce is configured. This mode merges duplicate line items and removes any that are out of stock or whose purchasables were deleted.
- **Adjustments Only** doesn’t touch line items, but re-applies adjustments on the cart or order. This can only be set programmatically and is not available from the control panel.
- **None** — Skips recalculation entirely; active only on completed orders. Only manual edits or admin-initiated recalculation can modify order details.

Cart/order subtotals and totals are computed values that always reflect the sum of line items. A few examples are `totalPrice`, `itemTotal`, and `itemSubtotal`.

You can manually recalculate an order by choosing “Recalculate order” at the bottom of the order edit screen:

![](../images/recalculate-order.png)

This will set temporarily the order’s calculation mode to *Recalculate All* and trigger recalculation. You can then apply the resulting changes to the order by choosing “Update Order”, or discard them by choosing “Cancel”.

### Order Notices

Notices are added to carts and orders in circumstances where it or the store’s state results in unexpected changes:

- A previously-valid coupon or shipping method was removed from the order;
- A line item’s purchasable was no longer available so that line item was removed from the cart;
- A line item’s sale price changed for some reason, like a sale ending;

Each notice is an [OrderNotice](https://github.com/craftcms/commerce/blob/main/src/models/OrderNotice.php) model, containing a customer-facing description of what changed, and a corresponding <commerce5:craft\commerce\elements\Order> attribute.

<See path="../development/cart.md" hash="notices" label="Order Notices in Twig" description="Learn about how to display and dismiss notices in your storefront." />

### Statuses

When a cart is completed, it is assigned the default _order status_ for the [store](stores.md) it was placed in, and any relevant emails are sent via the [queue](/5.x/system/queue.md).

<See path="custom-order-statuses.md" label="Order Statuses" description="Design a custom order management workflow for your store." />

#### Status Emails

If [status emails](emails.md) are set up for a newly-updated order status, messages will be sent when the updated order is saved.

You can manually re-send an order status email at any time. Navigate to an order’s edit screen, then select the desired email from the **Send Email** menu in the toolbar.

## Querying Orders

You can fetch carts and orders in your templates or PHP code using **order queries**.

::: code
```twig
{# Create a new order query #}
{% set myOrderQuery = craft.orders() %}
```
```php
// Create a new order query
$myOrderQuery = \craft\commerce\elements\Order::find();
```
:::

Once you’ve created the query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](/5.x/development/element-queries.md#executing-element-queries) by calling `.one()` or `.all()` to return one or more order elements.

::: tip
See [Element Queries](/5.x/development/element-queries.md) in the Craft docs to learn about how element queries work.
:::

The customer’s current cart is accessible in most Twig contexts via `craft.commerce.carts.cart`. In some situations (like [order status emails](emails.md)), an `order` variable will be automatically populated with the correct order. Ad-hoc queries are typically only necessary when displaying _inactive_ carts, a customer’s order history, or for generating custom reports.

### Example

We can display an order with a given [order number](#order-number) by doing the following:

1. Create an order query with `craft.orders()`.
2. Set the [number](#number) parameter on it.
3. Fetch the order with `.one()`.
4. Output information about the order as HTML.

```twig
{# Get the requested order number from the query string #}
{% set orderNumber = craft.app.request.getQueryParam('number') %}

{# Create an order query with the 'number' parameter #}
{% set myOrderQuery = craft.orders()
  .number(orderNumber) %}

{# Fetch the order #}
{% set order = myOrderQuery.one() %}

{# Make sure it exists #}
{% if not order %}
  {% exit 404 %}
{% endif %}

{# Display the order #}
<h1>Order {{ order.getShortNumber() }}</h1>
<!-- ... -->
```

## Order Query Parameters

Order queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/5.x/orders-carts.md)!!!
