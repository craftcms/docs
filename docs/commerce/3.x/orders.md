# Orders

When a cart is completed, it becomes an order. You can view orders in the control panel’s Commerce → Orders section.

Orders are [Element Types](https://craftcms.com/docs/3.x/extend/element-types.html) and can have custom fields associated with them.

If you’d like to jump straight to displaying order information in your templates, take a look at the the <commerce3:craft\commerce\elements\Order> class reference for a complete list of available properties.

## Carts and Orders

When someone is building a cart, the goal is to maintain an always-accurate list of items with their relevant costs, discounts, and promotions. For this reason, the cart will be updated and recalculated each time a change is made.

Once a cart is completed, however, it becomes an order that represents choices explicitly finalized by whoever completed the cart.

When a cart becomes an order, the following things happen:

1. The `dateOrdered` order attribute is set to the current date.
2. The `isCompleted` order attribute is set to `true`.
3. The default [order status](custom-order-statuses.md) is set on the order and any emails for this status are sent.
4. The order reference number is generated for the order, based on the “Order Reference Number Format” setting. (In the control panel: Commerce → Settings → System Settings → General Settings.)

Instead of being recalculated on each change like a cart, the order will only be recalculated if you [manually trigger recalculation](#recalculating-orders).

## Order Numbers

There are three ways to identify an order: by order number, short order number, and order reference number.

### Order Number

The order number is a hash generated when the cart is first created in the user’s session. It exists even before the cart is saved in the database, and remains the same for the entire life of the order.

This is different from the order reference number, which is only generated after the cart has been completed and becomes an order.

We recommend using the order number when referencing the order in URLs or anytime the order is retrieved publicly.

### Short Order Number

The short order number is the first seven characters of the order number. This is short enough to still be unique, and is a little friendlier to customers, although not as friendly as the order reference number.

### Order Reference Number

The order reference number is generated on cart completion according to the “Order Reference Number Format” in Commerce → Settings → System Settings → General Settings.

This number is usually best used as the customer-facing identifier of the order, but shouldn’t be used in URLs.

```twig
{{ object.reference }}
```

The “Order Reference Number Format” is a mini Twig template that’s rendered when the order is completed. It can use order attributes along with Twig filters and functions. For example:

```twig
{{ object.dateCompleted|date('Y') }}-{{ id }}
```

Output:

```
2018-43
```

In this example, `{{ id }}` refers to the order’s element ID, which is not sequential. If you would rather generate a unique sequential number, a simple way would be to use Craft’s [seq()](https://craftcms.com/docs/3.x/dev/functions.html#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

The `seq()` function takes the following parameters:

1. A key name. If this name is changed, a new sequence starting at one is started.
2. An optional padding character length. For example if the next sequence number is `14` and the padding length is `8`, the generation number will be `00000014`

For example:

```twig
{{ object.dateCompleted|date('Y') }}-{{ seq(object.dateCompleted|date('Y'), 8) }}
```

Ouput:

```
2018-00000023
```

In this example we’ve used the year as the sequence name so we automatically get a new sequence, starting at `1`, when the next year arrives.

## Creating Orders

An order is usually created on the front end as a customer [adds items](adding-to-and-updating-the-cart.md) to and completes a [cart](cart.md). With Commerce Pro, An order may also be created in the control panel.

To create a new order, navigate to Commerce → Orders, and choose “New Order”. This will create a new order that behaves like a cart. As [purchasables](purchasables.md) are added and removed from the order, it will automatically recalculate its sales and adjustments.

::: warning
You must be using [Commerce Pro](editions.md) and have “Edit Orders” permission to create orders from the control panel.
:::

To complete the order, choose “Mark as completed”.

## Editing Orders

Orders can be edited in the control panel by visiting the order edit page and choosing “Edit”. You’ll enter edit mode where you can change values within the order.

While editing the order, it will refresh subtotals and totals and display any errors. It will _not_ automatically recalculate the order based on system rules like shipping, taxes, or promotions. Choose “Recalculate order” to have it fully recalculate including those system rules.

Once you’re happy with your changes, choose “Update Order” to save it to the database.

## Recalculating Orders

Let’s take a closer look at how carts and orders can be recalculated.

A cart or order must always be in one of three calculation modes:

- **Recalculate All** is active for a cart, or an order which is not yet completed.
This mode refreshes each line item’s details from the related purchasable and re-applies all adjustments to the cart. In other words, it rebuilds and recalculates cart details based on information from purchasables and how Commerce is configured. This mode merges duplicate line items and removes any that are out of stock or whose purchasables were deleted.
- **Adjustments Only** doesn’t touch line items, but re-applies adjustments on the cart or order. This can only be set programmatically and is not available from the control panel.
- **None** doesn’t change anything at all, and is active for an order (completed cart) so only manual edits or admin-initiated recalculation can modify order details.

Cart/order subtotals and totals are computed values that always reflect the sum of line items. A few examples are `totalPrice`, `itemTotal`, and `itemSubtotal`.

You can manually recalculate an order by choosing “Recalculate order” at the bottom of the order edit screen:

![](./assets/recalculate-order.png)

This will set temporarily the order’s calculation mode to *Recalculate All* and trigger recalculation. You can then apply the resulting changes to the order by choosing “Update Order”, or discard them by choosing “Cancel”.

## Order Status Emails

If [status emails](order-status-emails.md) are set up for a newly-updated order status, messages will be sent when the updated order is saved.

You can manually re-send an order status email at any time. Navigate to an order’s edit page, then select the desired email from the Send Email menu at the top of the page.
