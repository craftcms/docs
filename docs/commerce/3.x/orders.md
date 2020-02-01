# Orders

When a cart is completed, it becomes an order. You can view orders in the Commerce → Orders section of the Control Panel.

Orders are an [Element Type](https://docs.craftcms.com/v3/extend/element-types.html) and can have custom field associated with them.

For examples of using order information in templates and seeing what properties are available, take a look at the the <api:craft\commerce\elements\Order> class reference.

## Carts become orders

When a cart becomes an order, the following things happen:

1) The `dateOrdered` order attribute is set to the current date.
2) The `isCompleted` order attribute is set to `true`.
3) The default [order status](custom-order-statuses.md) is set on the order and any emails for this status are sent.
4) The order reference number is generated for the order, based on the ‘Order Reference Number Format‘ setting found in Commerce → Settings → General Settings section of the Control Panel. 

### Order Numbers

You can identify an order in three ways: by order number, short order number, and order reference number.

#### Order Number

The order number is a hash generated when the cart is first created in the user's session. It exists even before the cart is saved in the database, and remains the same for the entire life of the order.

This is different from the order reference number, which is only generated after the cart has been completed and becomes an order.

We recommend using the order number when referencing the order in URLs or anytime the order is retrieved publicly.

#### Short Order Number

The short order number is the first 7 characters of the order number. 
This is short enough to still be unique, and is a little friendlier to customers, although not as friendly as the order reference number.

#### Order Reference Number

The order reference number is generated on cart completion by the ‘Order Reference Number Format’ in general settings.

This number is usually the best to use as the customer facing identifier of the order, but shouldn't be used in URLs.

```twig
{{ object.reference }}
```

The ‘Order Reference Number Format’ is a mini Twig template, which will be rendered when the order is completed.

Attributes on the order can be accessed as well as Twig filters and functions, for example:

```twig
{{ object.dateCompleted|date('Y') }}-{{ id }}
```

Output:
```
2018-43
```

In this example, `{{ id }}` refers to the order’s element ID, which is not sequential. If you would rather generate a unique sequential number, a simple way would be to use Craft’s [seq()](https://docs.craftcms.com/v3/dev/functions.html#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

The `seq()` function takes the following parameters:

1. A key name. If this name is changed, a new sequence starting at one is started. See Craft docs for more information.
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

## Creating and editing orders

### Creating orders

An order is usually created on the front end as a customer [adds items](adding-to-and-updating-the-cart.md) to a [cart](cart.md). With Commerce Pro, An order may also be created in the control panel.

To create a new order, navigate to Commerce → Orders, and choose “New Order”. This will create a new order that behaves like a cart. As [purchasables](purchasables.md) are added and removed from the order, it will automatically recalculate its sales and adjustments.

::: warning
You must be using [Commerce Pro](editions.md) and have “Edit Orders” permission to create orders from the control panel.
:::

To complete the order, choose “Mark as complete”. This saves the order with its default order status, its date ordered with the current timestamp, generates the order reference number, and marks the order complete.


### Editing orders

Orders can be edited in the control panel by visiting the order edit page and choosing  “Edit”. You’ll enter edit mode where you can change values within the order.

While editing the order, it will refresh subtotals and totals and display any errors. It will _not_ automatically recalculate the order based on system rules like shipping, taxes, or promotions. Choose “Recalculate Order” to have it fully recalculate including those system rules.

Once you’re happy with your changes, choose “Update Order” to save it to the database.


### Order status emails

If [status emails](order-status-emails.md) are set up for a newly-updated order status, messages will be sent when the updated order is saved.

You can manually re-send an order status email at any time. Navigate to an order’s edit page, then select the desired email from the Send Email menu at the top of the page.
