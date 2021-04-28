# Events

Craft Commerce provides a multitude of events for extending its functionality. Modules and plugins can [register event listeners](https://craftcms.com/knowledge-base/custom-module-events), typically in their `init()` methods, to modify Commerce’s behavior.

## Variant Events

### `beforeCaptureVariantSnapshot`

The event that is triggered before a variant’s field data is captured, which makes it possible to customize which fields are included in the snapshot. Custom fields are not included by default.

This example adds every custom field to the variant snapshot:

```php
use craft\commerce\elements\Variant;
use craft\commerce\events\CustomizeVariantSnapshotFieldsEvent;
use yii\base\Event;

Event::on(
    Variant::class,
    Variant::EVENT_BEFORE_CAPTURE_VARIANT_SNAPSHOT,
    function(CustomizeVariantSnapshotFieldsEvent $event) {
        // @var Variant $variant
        $variant = $event->variant;
        // @var array|null $fields
        $fields = $event->fields;

        // Add every custom field to the snapshot
        if (($fieldLayout = $variant->getFieldLayout()) !== null) {
            foreach ($fieldLayout->getFields() as $field) {
                $fields[] = $field->handle;
            }
        }

        $event->fields = $fields;
    }
);
```

::: warning
Add with care! A huge amount of custom fields/data will increase your database size.
:::

### `afterCaptureVariantSnapshot`

The event that is triggered after a variant’s field data is captured. This makes it possible to customize, extend, or redact the data to be persisted on the variant instance.

```php
use craft\commerce\elements\Variant;
use craft\commerce\events\CustomizeVariantSnapshotDataEvent;
use yii\base\Event;

Event::on(
    Variant::class,
    Variant::EVENT_AFTER_CAPTURE_VARIANT_SNAPSHOT,
    function(CustomizeVariantSnapshotDataEvent $event) {
        // @var Variant $variant
        $variant = $event->variant;
        // @var array $data
        $data = $event->fieldData;

        // Modify or redact captured `$data`
        // ...
    }
);
```

### `beforeCaptureProductSnapshot`

The event that is triggered before a product’s field data is captured. This makes it possible to customize which fields are included in the snapshot. Custom fields are not included by default.

This example adds every custom field to the product snapshot:

```php
use craft\commerce\elements\Variant;
use craft\commerce\elements\Product;
use craft\commerce\events\CustomizeProductSnapshotFieldsEvent;
use yii\base\Event;

Event::on(
    Variant::class,
    Variant::EVENT_BEFORE_CAPTURE_PRODUCT_SNAPSHOT,
    function(CustomizeProductSnapshotFieldsEvent $event) {
        // @var Product $product
        $product = $event->product;
        // @var array|null $fields
        $fields = $event->fields;

        // Add every custom field to the snapshot
        if (($fieldLayout = $product->getFieldLayout()) !== null) {
            foreach ($fieldLayout->getFields() as $field) {
                $fields[] = $field->handle;
            }
        }

        $event->fields = $fields;
    }
);
```

::: warning
Add with care! A huge amount of custom fields/data will increase your database size.
:::

### `afterCaptureProductSnapshot`

The event that is triggered after a product’s field data is captured, which can be used to customize, extend, or redact the data to be persisted on the product instance.

```php
use craft\commerce\elements\Variant;
use craft\commerce\elements\Product;
use craft\commerce\events\CustomizeProductSnapshotDataEvent;
use yii\base\Event;

Event::on(
    Variant::class,
    Variant::EVENT_AFTER_CAPTURE_PRODUCT_SNAPSHOT,
    function(CustomizeProductSnapshotDataEvent $event) {
        // @var Product $product
        $product = $event->product;
        // @var array $data
        $data = $event->fieldData;

        // Modify or redact captured `$data`
        // ...
    }
);
```

## Sale Events

### `beforeMatchPurchasableSale`

The event that is triggered before Commerce attempts to match a sale to a purchasable.

The `isValid` event property can be set to `false` to prevent the application of the matched sale.

```php
use craft\commerce\events\SaleMatchEvent;
use craft\commerce\services\Sales;
use craft\commerce\base\PurchasableInterface;
use craft\commerce\models\Sale;
use yii\base\Event;

Event::on(
    Sales::class,
    Sales::EVENT_BEFORE_MATCH_PURCHASABLE_SALE,
    function(SaleMatchEvent $event) {
        // @var Sale $sale
        $sale = $event->sale;
        // @var PurchasableInterface $purchasable
        $purchasable = $event->purchasable;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Use custom business logic to exclude purchasable from sale
        // with `$event->isValid = false`
        // ...
    }
);
```

### `beforeSaveSale`

The event that is triggered before a sale is saved.

```php
use craft\commerce\events\SaleEvent;
use craft\commerce\services\Sales;
use craft\commerce\models\Sale;
use yii\base\Event;

Event::on(
    Sales::class,
    Sales::EVENT_BEFORE_SAVE_SALE,
    function(SaleEvent $event) {
        // @var Sale $sale
        $sale = $event->sale;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `afterSaveSale`

The event that is triggered after a sale is saved.

```php
use craft\commerce\events\SaleEvent;
use craft\commerce\services\Sales;
use craft\commerce\models\Sale;
use yii\base\Event;

Event::on(
    Sales::class,
    Sales::EVENT_BEFORE_SAVE_SALE,
    function(SaleEvent $event) {
        // @var Sale $sale
        $sale = $event->sale;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `afterDeleteSale`

The event that is triggered after a sale is deleted.

```php
use craft\commerce\events\SaleEvent;
use craft\commerce\services\Sales;
use craft\commerce\models\Sale;
use yii\base\Event;

Event::on(
    Sales::class,
    Sales::EVENT_AFTER_DELETE_SALE,
    function(SaleEvent $event) {
        // @var Sale $sale
        $sale = $event->sale;

        // do something
        // ...
    }
);

```

## Order Events

### `beforeAddLineItemToOrder`

The event that is triggered before a new line item has been added to the order.

```php
use craft\commerce\elements\Order;
use craft\commerce\models\LineItem;
use craft\commerce\events\AddLineItemEvent;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_BEFORE_ADD_LINE_ITEM,
    function(AddLineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;
        // @var bool $isValid
        $isValid = $event->isValid;
        // ...
    }
);
```

### `afterAddLineItemToOrder`

The event that is triggered after a line item has been added to an order.

```php
use craft\commerce\elements\Order;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_AFTER_ADD_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```
### `afterApplyAddLineItemToOrder`

The event that is triggered after a line item has been added to an order.

```php
use craft\commerce\elements\Order;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use yii\base\Event;
Event::on(
    Order::class,
    Order::EVENT_AFTER_APPLY_ADD_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `afterRemoveLineItemToOrder`

The event that is triggered after a line item has been removed from an order.

```php
use craft\commerce\elements\Order;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_AFTER_REMOVE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `afterApplyRemoveLineItemFromOrder`

The event that is triggered after a line item has been removed from an order.

```php
use craft\commerce\elements\Order;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use yii\base\Event;
Event::on(
    Order::class,
    Order::EVENT_AFTER_APPLY_REMOVE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `beforeCompleteOrder`

The event that is triggered before an order is completed.

```php
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_BEFORE_COMPLETE_ORDER,
    function(Event $event) {
        // @var Order $order
        $order = $event->sender;
        // ...
    }
);
```

### `afterCompleteOrder`

The event that is triggered after an order is completed.

```php
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_AFTER_COMPLETE_ORDER,
    function(Event $event) {
        // @var Order $order
        $order = $event->sender;
        // ...
    }
);
```

### `afterOrderAuthorized`

This event is raised after an order is authorized in full and completed.

Plugins can get notified after an order is authorized in full and completed.

```php
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_AFTER_ORDER_AUTHORIZED,
    function(Event $event) {
        // @var Order $order
        $order = $event->sender;
        // ...
    }
);
```

### `afterOrderPaid`

The event that is triggered after an order is paid and completed.

```php
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    Order::class,
    Order::EVENT_AFTER_ORDER_PAID,
    function(Event $event) {
        // @var Order $order
        $order = $event->sender;
        // ...
    }
);
```

### `registerOrderAdjusters`

The event that is triggered for registration of additional adjusters.

```php
use craft\events\RegisterComponentTypesEvent;
use craft\commerce\services\OrderAdjustments;
use yii\base\Event;

Event::on(
    OrderAdjustments::class,
    OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyAdjuster::class;
    }
);
```

### `registerDiscountAdjusters`

The event that is triggered for registration of additional discount adjusters.

```php
use craft\events\RegisterComponentTypesEvent;
use craft\commerce\services\OrderAdjustments;
use yii\base\Event;

Event::on(
    OrderAdjustments::class,
    OrderAdjustments::EVENT_REGISTER_DISCOUNT_ADJUSTERS,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyAdjuster::class;
    }
);
```

### `orderStatusChange`

The event that is triggered when an order status is changed.

```php
use craft\commerce\events\OrderStatusEvent;
use craft\commerce\services\OrderHistories;
use craft\commerce\models\OrderHistory;
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    OrderHistories::class,
    OrderHistories::EVENT_ORDER_STATUS_CHANGE,
    function(OrderStatusEvent $event) {
        // @var OrderHistory $orderHistory
        $orderHistory = $event->orderHistory;
        // @var Order $order
        $order = $event->order;

        // Let the delivery department know the order’s ready to be delivered
        // ...
    }
);
```

### `defaultOrderStatus`

The event that is triggered when a default order status is being fetched.

Set the event object’s `orderStatus` property to override the default status set in the control panel.

```php
use craft\commerce\events\DefaultOrderStatusEvent;
use craft\commerce\services\OrderStatuses;
use craft\commerce\models\OrderStatus;
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    OrderStatuses::class,
    OrderStatuses::EVENT_DEFAULT_ORDER_STATUS,
    function(DefaultOrderStatusEvent $event) {
        // @var OrderStatus $status
        $status = $event->orderStatus;
        // @var Order $order
        $order = $event->order;

        // Choose a more appropriate order status than the control panel default
        // ...
    }
);
```

### `modifyCartInfo`

The event that’s triggered when a cart is returned as an array for AJAX cart update requests.

```php
use craft\commerce\controllers\BaseFrontEndController;
use craft\commerce\events\ModifyCartInfoEvent;
use yii\base\Event;

Event::on(
    BaseFrontEndController::class,
    BaseFrontEndController::EVENT_MODIFY_CART_INFO,
    function(ModifyCartInfoEvent $e) {
        $cartArray = $e->cartInfo;
        $cartArray['anotherOne'] = 'Howdy';
        $e->cartInfo = $cartArray;
    }
);
```

## Discount Events

### `afterDiscountAdjustmentsCreated`

The event that is triggered after a discount has matched the order and before it returns its adjustments.

```php
use craft\commerce\adjusters\Discount;
use craft\commerce\elements\Order;
use craft\commerce\models\Discount as DiscountModel;
use craft\commerce\models\OrderAdjustment;
use craft\commerce\events\DiscountAdjustmentsEvent;
use yii\base\Event;

Event::on(
    Discount::class,
    Discount::EVENT_AFTER_DISCOUNT_ADJUSTMENTS_CREATED,
    function(DiscountAdjustmentsEvent $event) {
        // @var Order $order
        $order = $event->order;
        // @var DiscountModel $discount
        $discount = $event->discount;
        // @var OrderAdjustment[] $adjustments
        $adjustments = $event->adjustments;

        // Use a third party to check order data and modify the adjustments
        // ...
    }
);
```

### `beforeSaveDiscount`

The event that is triggered before a discount is saved.

```php
use craft\commerce\events\DiscountEvent;
use craft\commerce\services\Discounts;
use craft\commerce\models\Discount;
use yii\base\Event;

Event::on(
    Discounts::class,
    Discounts::EVENT_BEFORE_SAVE_DISCOUNT,
    function(DiscountEvent $event) {
        // @var Discount $discount
        $discount = $event->discount;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Let an external CRM know about a client’s new discount
        // ...
    }
);
```

### `afterSaveDiscount`

The event that is triggered after a discount is saved.

```php
use craft\commerce\events\DiscountEvent;
use craft\commerce\services\Discounts;
use craft\commerce\models\Discount;
use yii\base\Event;

Event::on(
    Discounts::class,
    Discounts::EVENT_AFTER_SAVE_DISCOUNT,
    function(DiscountEvent $event) {
        // @var Discount $discount
        $discount = $event->discount;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Set this discount as default in an external CRM
        // ...
    }
);
```

### `afterDeleteDiscount`

The event that is triggered after a discount is deleted.

```php
use craft\commerce\events\DiscountEvent;
use craft\commerce\services\Discounts;
use craft\commerce\models\Discount;
use yii\base\Event;

Event::on(
    Discounts::class,
    Discounts::EVENT_AFTER_DELETE_DISCOUNT,
    function(DiscountEvent $event) {
        // @var Discount $discount
        $discount = $event->discount;

        // Remove this discount from a payment gateway
        // ...
    }
);
```

### `discountMatchesLineItem`

The event that is triggered when a line item is matched with a discount.

This event will be raised if all standard conditions are met.

You may set the `isValid` property to `false` on the event to prevent the matching of the discount to the line item.

```php
use craft\commerce\services\Discounts;
use craft\commerce\events\MatchLineItemEvent;
use craft\commerce\models\Discount;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    Discounts::class,
    Discounts::EVENT_DISCOUNT_MATCHES_LINE_ITEM,
    function(MatchLineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var Discount $discount
        $discount = $event->discount;

        // Check some business rules and prevent a match in special cases
        // ...
    }
);
```

### `discountMatchesOrder`

The event that is triggered when an order is matched with a discount.

You may set the `isValid` property to `false` on the event to prevent the matching of the discount with the order.

```php
use craft\commerce\services\Discounts;
use craft\commerce\events\MatchOrderEvent;
use craft\commerce\models\Discount;
use craft\commerce\elements\Order;
use yii\base\Event;

Event::on(
    Discounts::class,
    Discounts::EVENT_DISCOUNT_MATCHES_ORDER,
    function(MatchOrderEvent $event) {
        // @var Order $order
        $order = $event->order;
        // @var Discount $discount
        $discount = $event->discount;

        // Check some business rules and prevent a match in special cases
        // ... $event->isValid = false; // set to false if you want it to NOT match as it would.
    }
);
```

## Line Item Events

### `beforeSaveLineItem`

The event that is triggered before a line item is saved.

```php
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_BEFORE_SAVE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Notify a third party service about changes to an order
        // ...
    }
);
```

### `afterSaveLineItem`

The event that is triggeredd after a line item is saved.

```php
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_AFTER_SAVE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Reserve stock
        // ...
    }
);
```

### `populateLineItem`

The event that is triggered as a line item is being populated from a purchasable.

```php
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_POPULATE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Modify the price of a line item
        // $lineItem->salePrice = 10;
        // $lineItem->price = 20;
        // ...
    }
);
```

::: tip
Don’t forget to set `salePrice` accordingly since it’s the amount that gets added to the cart.
:::

### `createLineItem`

The event that is triggered after a line item has been created from a purchasable.

```php
use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;
use yii\base\Event;

Event::on(
    LineItems::class,
    LineItems::EVENT_CREATE_LINE_ITEM,
    function(LineItemEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Call a third party service based on the line item options
        // ...
    }
);
```

### `defaultLineItemStatus`

The event that is triggered when getting a default status for a line item.

You may set [DefaultLineItemStatusEvent::lineItemStatus](commerce3:craft\commerce\events\DefaultLineItemStatusEvent) to a desired LineItemStatus to override the default status set in the control panel.

Plugins can get notified when a default line item status is being fetched.

```php
use craft\commerce\services\LineItemStatuses;
use craft\commerce\events\DefaultLineItemStatusEvent;
use craft\commerce\models\LineItem;
use craft\commerce\models\LineItemStatus;
use yii\base\Event;

Event::on(
    LineItemStatuses::class,
    LineItemStatuses::EVENT_DEFAULT_LINE_ITEM_STATUS,
    function(DefaultLineItemStatusEvent $event) {
        // @var LineItem $lineItem
        $lineItem = $event->lineItem;
        // @var LineItemStatus $status
        $status = $event->lineItemStatus;

        // Specify a default line item status other than the CP selection
        // ...
    }
);
```

## Payment Events

### `registerGatewayTypes`

The event that is triggered for the registration of additional gateways.

This example registers a custom gateway instance of the `MyGateway` class:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\commerce\services\Purchasables;
use yii\base\Event;

Event::on(
    Gateways::class,
    Gateways::EVENT_REGISTER_GATEWAY_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyGateway::class;
    }
);
```

### `afterPaymentTransaction`

The event that is triggered after a payment transaction is made.

```php
use craft\commerce\events\TransactionEvent;
use craft\commerce\services\Payments;
use craft\commerce\models\Transaction;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_AFTER_PAYMENT_TRANSACTION,
    function(TransactionEvent $event) {
        // @var Transaction $transaction
        $transaction = $event->transaction;

        // Check whether it was an authorize transaction
        // and make sure that warehouse team is on top of it
        // ...
    }
);
```

### `beforeCaptureTransaction`

The event that is triggered before a payment transaction is captured.

```php
use craft\commerce\events\TransactionEvent;
use craft\commerce\services\Payments;
use craft\commerce\models\Transaction;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_BEFORE_CAPTURE_TRANSACTION,
    function(TransactionEvent $event) {
        // @var Transaction $transaction
        $transaction = $event->transaction;

        // Check that shipment’s ready before capturing
        // ...
    }
);
```

### `afterCaptureTransaction`

The event that is triggered after a payment transaction is captured.

```php
use craft\commerce\events\TransactionEvent;
use craft\commerce\services\Payments;
use craft\commerce\models\Transaction;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_AFTER_CAPTURE_TRANSACTION,
    function(TransactionEvent $event) {
        // @var Transaction $transaction
        $transaction = $event->transaction;

        // Notify the warehouse we're ready to ship
        // ...
    }
);
```

### `beforeRefundTransaction`

The event that is triggered before a transaction is refunded.

```php
use craft\commerce\events\RefundTransactionEvent;
use craft\commerce\services\Payments;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_BEFORE_REFUND_TRANSACTION,
    function(RefundTransactionEvent $event) {
        // @var float $amount
        $amount = $event->amount;

        // Do something else if the refund amount’s >50% of the transaction
        // ...
    }
);
```

### `afterRefundTransaction`

The event that is triggered after a transaction is refunded.

```php
use craft\commerce\events\RefundTransactionEvent;
use craft\commerce\services\Payments;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_AFTER_REFUND_TRANSACTION,
    function(RefundTransactionEvent $event) {
        // @var float $amount
        $amount = $event->amount;

        // Do something else if the refund amount’s >50% of the transaction
        // ...
    }
);
```

### `beforeProcessPaymentEvent`

The event that is triggered before a payment is processed.

You may set the `isValid` property to `false` on the event to prevent the payment from being processed.

```php
use craft\commerce\events\ProcessPaymentEvent;
use craft\commerce\services\Payments;
use craft\commerce\elements\Order;
use craft\commerce\models\payments\BasePaymentForm;
use craft\commerce\models\Transaction;
use craft\commerce\base\RequestResponseInterface;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_BEFORE_PROCESS_PAYMENT,
    function(ProcessPaymentEvent $event) {
        // @var Order $order
        $order = $event->order;
        // @var BasePaymentForm $form
        $form = $event->form;
        // @var Transaction $transaction
        $transaction = $event->transaction;
        // @var RequestResponseInterface $response
        $response = $event->response;

        // Check some business rules to see whether the transaction is allowed
        // ...
    }
);
```

### `afterProcessPaymentEvent`

The event that is triggered after a payment is processed.

```php
use craft\commerce\events\ProcessPaymentEvent;
use craft\commerce\services\Payments;
use craft\commerce\elements\Order;
use craft\commerce\models\payments\BasePaymentForm;
use craft\commerce\models\Transaction;
use craft\commerce\base\RequestResponseInterface;
use yii\base\Event;

Event::on(
    Payments::class,
    Payments::EVENT_AFTER_PROCESS_PAYMENT,
    function(ProcessPaymentEvent $event) {
        // @var Order $order
        $order = $event->order;
        // @var BasePaymentForm $form
        $form = $event->form;
        // @var Transaction $transaction
        $transaction = $event->transaction;
        // @var RequestResponseInterface $response
        $response = $event->response;

        // Let the accounting department know an order transaction went through
        // ...
    }
);
```

### `deletePaymentSource`

The event that is triggered when a payment source is deleted.

```php
use craft\commerce\events\PaymentSourceEvent;
use craft\commerce\services\PaymentSources;
use craft\commerce\models\PaymentSource;
use yii\base\Event;

Event::on(
    PaymentSources::class,
    PaymentSources::EVENT_DELETE_PAYMENT_SOURCE,
    function(PaymentSourceEvent $event) {
        // @var PaymentSource $source
        $source = $event->paymentSource;

        // Warn a user they don’t have any valid payment sources saved
        // ...
    }
);
```

### `beforeSavePaymentSource`

The event that is triggered before a payment source is added.

```php
use craft\commerce\events\PaymentSourceEvent;
use craft\commerce\services\PaymentSources;
use craft\commerce\models\PaymentSource;
use yii\base\Event;

Event::on(
    PaymentSources::class,
    PaymentSources::EVENT_BEFORE_SAVE_PAYMENT_SOURCE,
    function(PaymentSourceEvent $event) {
        // @var PaymentSource $source
        $source = $event->paymentSource;

        // ...
    }
);
```

### `afterSavePaymentSource`

The event that is triggered after a payment source is added.

```php
use craft\commerce\events\PaymentSourceEvent;
use craft\commerce\services\PaymentSources;
use craft\commerce\models\PaymentSource;
use yii\base\Event;

Event::on(
    PaymentSources::class,
    PaymentSources::EVENT_AFTER_SAVE_PAYMENT_SOURCE,
    function(PaymentSourceEvent $event) {
        // @var PaymentSource $source
        $source = $event->paymentSource;

        // Settle any outstanding balance
        // ...
    }
);
```

### `afterSaveTransaction`

The event that is triggered after a transaction has been saved.

```php
use craft\commerce\events\TransactionEvent;
use craft\commerce\services\Transactions;
use craft\commerce\models\Transaction;
use yii\base\Event;

Event::on(
    Transactions::class,
    Transactions::EVENT_AFTER_SAVE_TRANSACTION,
    function(TransactionEvent $event) {
        // @var Transaction $transaction
        $transaction = $event->transaction;

        // Run custom logic for failed transactions
        // ...
    }
);
```

### `afterCreateTransaction`

The event that is triggered after a transaction has been created.

```php
use craft\commerce\events\TransactionEvent;
use craft\commerce\services\Transactions;
use craft\commerce\models\Transaction;
use yii\base\Event;

Event::on(
    Transactions::class,
    Transactions::EVENT_AFTER_CREATE_TRANSACTION,
    function(TransactionEvent $event) {
        // @var Transaction $transaction
        $transaction = $event->transaction;

        // Run custom logic depending on the transaction type
        // ...
    }
);
```

## Subscription Events

### `afterExpireSubscription`

The event that is triggered after a subscription has expired.

```php
use craft\commerce\events\SubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_EXPIRE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;

        // Make a call to third party service to de-authorize a user
        // ...
    }
);
```

### `beforeCreateSubscription`

The event that is triggered before a subscription is created.

You may set the `isValid` property to `false` on the event to prevent the user from being subscribed to the plan.

```php
use craft\commerce\events\CreateSubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\elements\User;
use craft\commerce\base\Plan;
use craft\commerce\models\subscriptions\SubscriptionForm;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION,
    function(CreateSubscriptionEvent $event) {
        // @var User $user
        $user = $event->user;
        // @var Plan $plan
        $plan = $event->plan;
        // @var SubscriptionForm $params
        $params = $event->parameters;

        // Set the trial days based on some business logic
        // ...
    }
);
```

### `afterCreateSubscription`

The event that is triggered after a subscription is created.

```php
use craft\commerce\events\SubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_CREATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;

        // Ignore suspended subscriptions
        if ($subscription->isSuspended) {
            return;
        }

        // Call a third party service to authorize a user
        // ...
    }
);
```

::: tip
Since a subscription may be suspended at creation due to payment issues, you may want to check subscription properties like `hasStarted` or `isSuspended` before taking further action.
:::

### `beforeReactivateSubscription`

The event that is triggered before a subscription gets reactivated.

You may set the `isValid` property to `false` on the event to prevent the subscription from being reactivated.

```php
use craft\commerce\events\SubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_REACTIVATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;

        // Use business logic to determine whether the user can reactivate
        // ...
    }
);
```

### `afterReactivateSubscription`

The event that is triggered after a subscription gets reactivated.

```php
use craft\commerce\events\SubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_REACTIVATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;

        // Re-authorize the user with a third-party service
        // ...
    }
);
```

### `beforeSwitchSubscriptionPlan`

The event that is triggered before a subscription is switched to a different plan.

You may set the `isValid` property to `false` on the event to prevent the switch from happening.

```php
use craft\commerce\events\SubscriptionSwitchPlansEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\base\Plan;
use craft\commerce\elements\Subscription;
use craft\commerce\models\subscriptions\SwitchPlansForm;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_SWITCH_SUBSCRIPTION_PLAN,
    function(SubscriptionSwitchPlansEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;
        // @var Plan $oldPlan
        $oldPlan = $event->oldPlan;
        // @var Plan $newPlan
        $newPlan = $event->newPlan;
        // @var SwitchPlansForm $params
        $params = $event->parameters;

        // Modify the switch parameters based on some business logic
        // ...
    }
);
```

### `afterSwitchSubscriptionPlan`

The event that is triggered after a subscription gets switched to a different plan.

```php
use craft\commerce\events\SubscriptionSwitchPlansEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\base\Plan;
use craft\commerce\elements\Subscription;
use craft\commerce\models\subscriptions\SwitchPlansForm;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_SWITCH_SUBSCRIPTION_PLAN,
    function(SubscriptionSwitchPlansEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;
        // @var Plan $oldPlan
        $oldPlan = $event->oldPlan;
        // @var Plan $newPlan
        $newPlan = $event->newPlan;
        // @var SwitchPlansForm $params
        $params = $event->parameters;

        // Adjust the user’s permissions on a third party service
        // ...
    }
);
```

### `beforeCancelSubscription`

The event that is triggered before a subscription is canceled.

You may set the `isValid` property to `false` on the event to prevent the subscription from being canceled.

```php
use craft\commerce\events\CancelSubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use craft\commerce\models\subscriptions\CancelSubscriptionForm;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_CANCEL_SUBSCRIPTION,
    function(CancelSubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;
        // @var CancelSubscriptionForm $params
        $params = $event->parameters;

        // Check whether the user is permitted to cancel the subscription
        // ...
    }
);
```

### `afterCancelSubscription`

The event that is triggered after a subscription gets canceled.

```php
use craft\commerce\events\CancelSubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use craft\commerce\models\subscriptions\CancelSubscriptionForm;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_CANCEL_SUBSCRIPTION,
    function(CancelSubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;
        // @var CancelSubscriptionForm $params
        $params = $event->parameters;

        // Refund the user for the remainder of the subscription
        // ...
    }
);
```

### `beforeUpdateSubscription`

The event that is triggered before a subscription gets updated. Typically this event is fired when subscription data is updated on the gateway.

```php
use craft\commerce\events\SubscriptionEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_UPDATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;

        // ...
    }
);
```

### `receiveSubscriptionPayment`

The event that is triggered when a subscription payment is received.

```php
use craft\commerce\events\SubscriptionPaymentEvent;
use craft\commerce\services\Subscriptions;
use craft\commerce\elements\Subscription;
use craft\commerce\models\subscriptions\SubscriptionPayment;
use DateTime;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_RECEIVE_SUBSCRIPTION_PAYMENT,
    function(SubscriptionPaymentEvent $event) {
        // @var Subscription $subscription
        $subscription = $event->subscription;
        // @var SubscriptionPayment $payment
        $payment = $event->payment;
        // @var DateTime $until
        $until = $event->paidUntil;

        // Update loyalty reward data
        // ...
    }
);
```

## Other Events

### `beforeSaveAddress`

The event that is triggered before an address is saved.

```php
use craft\commerce\events\AddressEvent;
use craft\commerce\services\Addresses;
use craft\commerce\models\Address;
use yii\base\Event;

Event::on(
    Addresses::class,
    Addresses::EVENT_BEFORE_SAVE_ADDRESS,
    function(AddressEvent $event) {
        // @var Address $address
        $address = $event->address;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Update customer’s address in an external CRM
        // ...
    }
);
```

### `beforePurgeAddresses`

The event that is triggered before purgeable addresses are deleted.

```php
use craft\commerce\events\PurgeAddressesEvent;
use craft\commerce\services\Addresses;
use yii\base\Event;

Event::on(
    Addresses::class,
    Addresses::EVENT_BEFORE_PURGE_ADDRESSES,
    function(PurgeAddressesEvent $event) {
        // @var Query $addressQuery
        $addressQuery = $event->addressQuery;

        // Add an `$addressQuery->andWhere(..)` to change the addresses that will be purged query
        // $event->addressQuery = $addressQuery
    }
}
);
```

### `afterSaveAddress`

The event that is triggered after an address is saved.

```php
use craft\commerce\events\AddressEvent;
use craft\commerce\services\Addresses;
use craft\commerce\models\Address;
use yii\base\Event;

Event::on(
    Addresses::class,
    Addresses::EVENT_AFTER_SAVE_ADDRESS,
    function(AddressEvent $event) {
        // @var Address $address
        $address = $event->address;
        // @var bool $isNew
        $isNew = $event->isNew;

        // Set the default address in an external CRM
        // ...
    }
);
```

### `afterDeleteAddress`

The event that is triggered after an address is deleted.

```php
use craft\commerce\events\AddressEvent;
use craft\commerce\services\Addresses;
use craft\commerce\models\Address;
use yii\base\Event;

Event::on(
    Addresses::class,
    Addresses::EVENT_AFTER_DELETE_ADDRESS,
    function(AddressEvent $event) {
        // @var Address $address
        $address = $event->address;

        // Remove this address from a payment gateway
        // ...
    }
);
```

### `defineAddressLines`

The event that is triggered when defining the [arrayable address fields](commerce3:craft\commerce\models\Address::getAddressLines()).

```php
use craft\commerce\events\DefineAddressLinesEvent;
use craft\commerce\models\Address;
use yii\base\Event;
Event::on(
    Address::class,
    Address::EVENT_DEFINE_ADDRESS_LINES,
    function(DefineAddressLinesEvent $event) {
        // @var array $addressLines
        $addressLines = $event->addressLines;
        // Modify default address lines array
        // ...
    }
);
```

### `beforeSendEmail`

The event that is triggered before an email is sent out.

You may set the `isValid` property to `false` on the event to prevent the email from being sent.

```php
use craft\commerce\events\MailEvent;
use craft\commerce\services\Emails;
use craft\commerce\elements\Order;
use craft\commerce\models\Email;
use craft\commerce\models\OrderHistory;
use craft\mail\Message;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_BEFORE_SEND_MAIL,
    function(MailEvent $event) {
        // @var Message $message
        $message = $event->craftEmail;
        // @var Email $email
        $email = $event->commerceEmail;
        // @var Order $order
        $order = $event->order;
        // @var OrderHistory $history
        $history = $event->orderHistory;

        // Use `$event->isValid = false` to prevent sending
        // based on some business rules or client preferences
        // ...
    }
);
```

### `afterSendEmail`

The event that is triggered after an email has been sent out.

```php
use craft\commerce\events\MailEvent;
use craft\commerce\services\Emails;
use craft\commerce\elements\Order;
use craft\commerce\models\Email;
use craft\commerce\models\OrderHistory;
use craft\mail\Message;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_AFTER_SEND_MAIL,
    function(MailEvent $event) {
        // @var Message $message
        $message = $event->craftEmail;
        // @var Email $email
        $email = $event->commerceEmail;
        // @var Order $order
        $order = $event->order;
        // @var OrderHistory $history
        $history = $event->orderHistory;

        // Add the email address to an external CRM
        // ...
    }
);
```

### `beforeSaveEmail`

The event that is triggered before an email is saved.

```php
use craft\commerce\events\EmailEvent;
use craft\commerce\services\Emails;
use craft\commerce\models\Email;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_BEFORE_SAVE_EMAIL,
    function(EmailEvent $event) {
        // @var Email $email
        $email = $event->email;
        // @var bool $isNew
        $isNew = $event->isNew;

        // ...
    }
);
```

### `afterSaveEmail`

The event that is triggered after an email is saved.

```php
use craft\commerce\events\EmailEvent;
use craft\commerce\services\Emails;
use craft\commerce\models\Email;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_AFTER_SAVE_EMAIL,
    function(EmailEvent $event) {
        // @var Email $email
        $email = $event->email;
        // @var bool $isNew
        $isNew = $event->isNew;

        // ...
    }
);
```

### `beforeDeleteEmail`

The event that is triggered before an email is deleted.

```php
use craft\commerce\events\EmailEvent;
use craft\commerce\services\Emails;
use craft\commerce\models\Email;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_BEFORE_DELETE_EMAIL,
    function(EmailEvent $event) {
        // @var Email $email
        $email = $event->email;

        // ...
    }
);
```

### `afterDeleteEmail`

The event that is triggered after an email is deleted.

```php
use craft\commerce\events\EmailEvent;
use craft\commerce\services\Emails;
use craft\commerce\models\Email;
use yii\base\Event;

Event::on(
    Emails::class,
    Emails::EVENT_AFTER_DELETE_EMAIL,
    function(EmailEvent $event) {
        // @var Email $email
        $email = $event->email;

        // ...
    }
);
```

### `beforeRenderPdf`

The event that is triggered before an order’s PDF is rendered.

Event handlers can customize PDF rendering by modifying several properties on the event object:

| Property    | Value                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `order`     | populated [Order](commerce3:craft\commerce\elements\Order) model                                                                |
| `template`  | optional Twig template path (string) to be used for rendering                                                             |
| `variables` | populated with the variables availble to the template used for rendering                                                  |
| `option`    | optional string for the template that can be used to show different details based on context (example: `receipt`, `ajax`) |
| `pdf`       | `null` by default, can optionally be used to supply your own PDF string rather than the one Commerce would generate |

```php
use craft\commerce\events\PdfEvent;
use craft\commerce\services\Pdfs;
use yii\base\Event;

Event::on(
    Pdfs::class,
    Pdfs::EVENT_BEFORE_RENDER_PDF,
    function(PdfEvent $event) {
        // Modify `$event->order`, `$event->option`, `$event->template`,
        // and `$event->variables` to customize what gets rendered into a PDF;
        // or render your own PDF and set its string on `$event->pdf`
        // ...
    }
);
```

::: warning
If you provide your own PDF string, Commerce will skip its own rendering and [`afterRenderPdf`](#afterrenderpdf) will not be triggered.
:::

### `afterRenderPdf`

The event that is triggered after an order’s PDF has been rendered by Commerce.

Event handlers can override Commerce’s PDF generation by setting the `pdf` property on the event to a custom-rendered PDF string. The event properties will be the same as those from `beforeRenderPdf`, but `pdf` will contain a rendered PDF string and is the only one for which setting a value will make any difference for the resulting PDF output.

```php
use craft\commerce\events\PdfEvent;
use craft\commerce\services\Pdfs;
use yii\base\Event;

Event::on(
    Pdfs::class,
    Pdfs::EVENT_AFTER_RENDER_PDF,
    function(PdfEvent $event) {
        // Add a watermark to the PDF or forward it to the accounting department
        // ...
    }
);
```
### `beforeSavePdf`

The event that is triggered before a PDF is saved.

```php
use craft\commerce\events\PdfSaveEvent;
use craft\commerce\services\Pdfs;
use craft\commerce\models\Pdf;
use yii\base\Event;

Event::on(
    Pdfs::class,
    Pdfs::EVENT_BEFORE_SAVE_PDF,
    function(PdfSaveEvent $event) {
        // @var Pdf $pdf
        $pdf = $event->pdf;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `afterSavePdf`

The event that is triggered after a PDF is saved.

```php
use craft\commerce\events\PdfSaveEvent;
use craft\commerce\services\Pdfs;
use craft\commerce\models\Pdf;
use yii\base\Event;

Event::on(
    Pdfs::class,
    Pdfs::EVENT_AFTER_SAVE_PDF,
    function(PdfSaveEvent $event) {
        // @var Pdf $pdf
        $pdf = $event->pdf;
        // @var bool $isNew
        $isNew = $event->isNew;
        // ...
    }
);
```

### `beforeSaveProductType`

The event that is triggered before a product type is saved.

```php
use craft\commerce\events\ProductTypeEvent;
use craft\commerce\services\ProductTypes;
use craft\commerce\models\ProductType;
use yii\base\Event;

Event::on(
    ProductTypes::class,
    ProductTypes::EVENT_BEFORE_SAVE_PRODUCTTYPE,
    function(ProductTypeEvent $event) {
        // @var ProductType|null $productType
        $productType = $event->productType;

        // Create an audit trail of this action
        // ...
    }
);
```

### `afterSaveProductType`

The event that is triggered after a product type has been saved.

```php
use craft\commerce\events\ProductTypeEvent;
use craft\commerce\services\ProductTypes;
use craft\commerce\models\ProductType;
use yii\base\Event;

Event::on(
    ProductTypes::class,
    ProductTypes::EVENT_AFTER_SAVE_PRODUCTTYPE,
    function(ProductTypeEvent $event) {
        // @var ProductType|null $productType
        $productType = $event->productType;

        // Prepare some third party system for a new product type
        // ...
    }
);
```

### `registerPurchasableElementTypes`

The event that is triggered for registration of additional purchasables.

This example adds an instance of `MyPurchasable` to the event object’s `types` array:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\commerce\services\Purchasables;
use yii\base\Event;

Event::on(
    Purchasables::class,
    Purchasables::EVENT_REGISTER_PURCHASABLE_ELEMENT_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyPurchasable::class;
    }
);
```

### `registerAvailableShippingMethods`

The event that is triggered for registration of additional shipping methods.

This example adds an instance of `MyShippingMethod` to the event object’s `shippingMethods` array:

```php
use craft\commerce\events\RegisterAvailableShippingMethodsEvent;
use craft\commerce\services\ShippingMethods;
use yii\base\Event;

Event::on(
    ShippingMethods::class,
    ShippingMethods::EVENT_REGISTER_AVAILABLE_SHIPPING_METHODS,
    function(RegisterAvailableShippingMethodsEvent $event) {
        $event->shippingMethods[] = MyShippingMethod::class;
    }
);
```

### `purchasableAvailable`

The event that’s triggered when determining whether a purchasable should be available for a given current user and cart.

```php
use craft\commerce\events\PurchasableAvailableEvent;
use craft\commerce\services\Purchasables;
use yii\base\Event;
Event::on(
    Purchasables::class,
    Purchasables::EVENT_PURCHASABLE_AVAILABLE,
    function(PurchasableAvailableEvent $event) {
        if($order && $user = $order->getUser()){
            // Prevent users in group ID 1 from having the purchasable in their cart
            $event->isAvailable = $event->isAvailable && !$user->isInGroup(1);
        }
    }
);
```

::: tip
If the purchasable becomes unavailable after being added to the cart, an [order notice](../orders-carts.md#order-notices) will be added to the order informing the customer.
:::