# Custom Order Statuses

## Overview

When a customer completes a cart it becomes an order.

The only differences between an order and a cart is:

- A cart has an empty `dateOrdered` attribute.
- A cart has its `isCompleted` attribute set to `false`.
- An order has a custom status set.

When a customer completes their order, the `dateOrdered` is set to the current time and date and it gets a custom order status. The custom order status set depends on which order status you’ve established as the default.

Custom order statuses can be managed from **Commerce** → **System Settings** →** Order Statuses** in the control panel. There you can choose the default order status for new orders.

## Functionality

Order statuses allow a store owner to track an order through the various stages of its life cycle.

For example you may use default status of “Received”, set when the order is completed. Once you’ve packaged the order for shipment, you might update to “Packed” status. Or if you’re waiting to receive product stock you might use a “Pending Stock” status. When you’ve shipped the order you might set the status to “Completed”. Every year you might change all “Completed” orders to an “Archived” status.

You can set up as many statuses as you want, with any meaning ascribed to them, and you can move your order between statuses freely.

This allows you to manage your orders and organise them easily.

Whenever you change the status of an order, the change from one status to another is recorded in an Order History record on the order. This allows you to see the history of the order over time.

In addition to setting a new status, you can record a message that gets stored with the status change. For example, you might place an order into a status called “Pending Stock”, and in the message write which product you’re waiting on. This is a good way to allow multiple store managers to better understand why a particular status was set on an order.

## Changing the status of an order

### In the control panel

An order’s status can be changed on the Edit Order Page in the control panel. Choosing “Update Order Status” will present you with a modal window that allows the selection of the new status and a message associated with the change. After choosing “Submit”, the order’s status will be updated and a new order history record will be created.

You can change the status of multiple orders at the same time on the Order Index Page using the checkbox selection and then choosing “Update Order Status” from the action menu.

### In code

```php
$order = \craft\commerce\Plugin::getInstance()
    ->getOrders()
    ->getOrderById(ID);
$order->orderStatusId = $orderStatus->id; // new status ID
$order->message = $message; // new message
$result = Craft::$app->getElements()->saveElement($order);
```

By updating `orderStatusId` and saving the order, the status change event will be triggered and a new order status history record will be created.

### Deleting an Order Status

An order status associated with one or more orders cannot be deleted since it would result in incomplete records.

If you’d like to delete an order status, first select all orders having that status in the control panel and change them to a different status. You’ll then be able to delete the order status once it’s no longer in use. (Technically, an order status will only be soft-deleted so each order’s history may be preserved.)

## Email

In addition to using order statuses to manage your orders, you can choose emails that will be sent when an order moves into that status.

See [Emails](emails.md).

## Line Item Statuses

Line item statuses are similar to order statuses except they’re for *internal* management of an order and do not trigger emails.

You can create a new line item status by navigating to **Commerce** → **System Settings** → **Line Item Statuses** and choosing **New line item status**.

When creating a line item status you can optionally designate that status to be applied by default with the **New line items get this status by default** checkbox. When checked, the status is applied by default when an order is completed.

If no line item status is designated as the default, line items have a `null` or “None” status.

## Templating

### craft.commerce.orderStatuses.allOrderStatuses

Returns an array of <commerce3:craft\commerce\models\OrderStatus> objects representing all the order statuses in the system.

```twig
{% for status in craft.commerce.orderStatuses.allOrderStatuses %}
    {{ status.handle }} - {{ status.name }}
{% endfor %}
```
