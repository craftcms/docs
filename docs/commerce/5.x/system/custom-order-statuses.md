# Custom Order Statuses

When a cart becomes an order (in response to a customer completing a payment, or manual intervention by a store manager), it is assigned that store’s default _order status_. Any time an order is given a new status, the associated [status emails](#email) are sent to their designated recipients.

::: tip
The default order status can be overridden in a plugin or module with the [OrderStatus::EVENT_DEFAULT_ORDER_STATUS](commerce5:craft\commerce\services\OrderStatus::EVENT_DEFAULT_ORDER_STATUS) event.
:::

Custom order statuses are managed in the control panel for each store by navigating to <Journey path="Commerce, System Settings, Order Statuses" />. Status definitions are stored in [project config](/5.x/system/project-config.md) (along with stores, emails, and other system settings), and must be created and modified in a development environment, then deployed.

## Functionality

Statuses allow store managers to design custom workflows for orders, on a per-store basis. Each order status gets its own [source](/5.x/system/elements.md#sources) in the orders element index, and custom sources can use order status as a filter condition.

<Block label="Example Workflow">

A store that sells physical goods might set up order statuses like this:

1. Orders are placed in the default status “Processing” when a customer checks out.
2. Once an employee has packaged the order for shipment, its status could be updated to “Packed.” If there was a supply hiccup and the warehouse is waiting on inventory, they might temporarily assign it a “Pending Stock” status, instead.
3. When the order has been picked up by the carrier, the order can be marked as “Shipped” or “Fulfilled.”

Statuses can also be used to flag or classify orders outside the typical workflow:

- Customers who email with support questions or changes to their order could have them placed in a “Hold” status while a resolution is reached.
- Similarly, if a customer requests a refund or replacement, the order could be moved into a “Remediated” status.
- At the end of each quarter, you might change all “Completed” orders to an “Archived” status.

</Block>

You can set up as many statuses as you want, with any meaning ascribed to them, and you can move orders between statuses freely. Whenever you change the status of an order, Commerce creates a record with the new and old statuses, as well as an (optional) message. This history is available on any order’s edit screen in the **Order History** tab.

Order statuses can also be changed programmatically from plugins and modules, in response to all kinds of events—like a webhook from a logistics provider.

## Changing the status of an order

### In the control panel

An order’s status can be changed on the **Edit Order** screen in the control panel. Selecting a new status will reveal a space for a message and a **Suppress Emails** checkbox.

You can change the status of multiple orders at the same time on the order element index using the checkbox selection and then choosing **Update Order Status** from the action menu. The same message will be applied to all orders modified this way.

### In code

As a side-effect of saving an order with a new `orderStatusId`, Commerce will emit the appropriate status change events and create a corresponding order history record. Here’s an example of a [custom controller action](/5.x/extend/controllers.md) that is responsible for moving an order into a “Ready for Shipment” status:

```php
use craft\commerce\Plugin as Commerce;
use craft\commerce\elements\Order;
// ...
public function actionMarkReady(int $orderId)
{
    $orderStatus = Commerce::getInstance()->getOrderStatuses()->getOrderStatusByHandle('readyForShipment');

    $order = Order::find()
        ->id($orderId)
        ->one();

    // Assign new status ID:
    $order->orderStatusId = $orderStatus->id;

    // Provide a message:
    $order->message = Craft::$app->getRequest()->getBodyParam('statusMessage');

    // Save it:
    if (!Craft::$app->getElements()->saveElement($order)) {
        return $this->asModelFailure($order, Craft::t('site', 'Failed to update order status.'));
    }

    return $this->asModelSuccess($order, Craft::t('site', 'Order updated to {status}.', [
        'status' => $orderStatus->name,
    ]));
}
```

::: warning
Always check whether the user has the appropriate permissions to perform an action like this!
:::

### Deleting an Order Status

If you do need to delete an order status (say, to avoid confusion about procedure), use the appropriate order [element index source](/5.x/system/elements.md#sources) to select all orders, and change them to a different status. You’ll then be able to delete the order status; Commerce retains the soft-deleted record (so that your orders’ status history remains intact), but it will not be assignable to other orders.

## Email

In addition to using order statuses to manage your orders, you can choose emails that will be sent when an order moves into that status.

<See path="emails.md" label="Order Status Emails" description="Keep your customers up-to-date on their order’s status via automated emails." />

## Line Item Statuses

Line item statuses are similar to order statuses except they’re for internal management of an order and cannot trigger emails.

<See path="line-item-statuses.md" label="Line Item Statuses" description="Set up fine-grained fulfillment control." />

## Templating

### Showing Customers the History of an Order

An order’s <commerce4:craft\commerce\models\OrderHistory> models are available via `order.histories`. Every history record has a `newStatus` property that reflects which status the order moved into, and all but the first record will have an `prevStatus`. The `message` property contains any text from the order’s `message` field that coincided with the change.

The new and old status properties return <commerce4:craft\commerce\models\OrderStatus> models, which include a `name` and `description`.

```twig
<ul>
  {% for history in order.histories %}
    {% set newStatus = history.newStatus %}

    <li>{{ newStatus.name }} ({{ history.dateCreated | date('short') }}): {{ history.message }}</li>

    {# `newStatus.color` and `newStatus.handle` are also available, if you want to distinguish (visually or functionally) between history records! #}
  {% endfor %}
</ul>
```

### craft.commerce.orderStatuses.allOrderStatuses

Returns an array of <commerce4:craft\commerce\models\OrderStatus> objects representing all the order statuses in the system.

```twig
{% for status in craft.commerce.orderStatuses.allOrderStatuses %}
  {{ status.handle }} - {{ status.name }}
{% endfor %}
```
