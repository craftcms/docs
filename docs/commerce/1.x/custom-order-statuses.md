# Custom Order Statuses

## Overview

When a customer completes a cart it becomes an order.

The only differences between an order and a cart is:

- A cart has an empty `dateOrdered` attribute.
- A cart has `isCompleted` attribute set to `false`.
- An order has a custom status set.

When a customer completes their order, the `dateOrdered` is set to the current time and date. Also, a custom order status is set on the order. The custom order status set depends on which order status you have set as the default.

Custom order statuses can be managed from **Commerce** → **Settings** → **Order Statuses** in the Control Panel. There you can choose the order status that is set by default on new orders.

## Functionality

Order statuses allow a store owner to track an order through the various stages of its lifecycle.

For example, you may set up a default status as “Received”, which gets set when the order is completed. When you have packed the order, you might set the order’s status to “Packed”. When you’re waiting on a product to get into stock before packing, you might set the status to “Pending Stock”. When you’ve shipped the order, you might set the status to “Completed”. Every year you might set all orders with a “Completed” status to a status called “Archived”.

You can set up as many statuses as you want, with any meaning ascribed to them, and you can move your order between statuses freely.

This allows you to manage your orders and organise them easily.

Whenever you change the status of an order, the change from one status to another is recorded in an Order History record on the order. This allows you to see the history of the order over time.

In addition to setting a new status, you can record a message which is stored with that status change. For example, you might place an order into a status called “Pending Stock”, and in the message you might write in which product you are waiting on stock for. This is a good way to allow multiple store managers to better understand why a particular status was set on an order.

## Email

In addition to using order statuses to manage your orders, You can choose emails that will be sent when an order moves into that status.

See [Order Status Emails](order-status-emails.md).
