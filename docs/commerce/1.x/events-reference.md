# Events Reference

## commerce_discounts.onBeforeMatchLineItem

Raised when matching the discount to each line item.

This event will not trigger if the line item’s purchasable is not promotable or is excluded from sale.

### Params

- `lineItem` – The [Line Item model](line-item-model.md) for the currently tested line item
- `discount` – The Commerce_DiscountModel for the currently tested discount

```php
craft()->on('commerce_discounts.onBeforeMatchLineItem', function($event) {
    if ($lineItem->purchasable instanceof Commerce_VariantModel) {
        if ($lineItem->qty < 3) {
            $event->performAction = false;
        }
    }
});
```

## commerce_sales.onBeforeMatchProductAndSale

This event will trigger if the product matches the sale.

### Params

- `product` – The [Product model](product-model.md) that matches the sale
- `sale` – The Commerce_SaleModel that matches the product

```php
craft()->on('commerce_sales.onBeforeMatchProductAndSale', function($event) {
    $cart = craft()->commerce_cart->getCart();
    if ($cart->isInStoreOrder) {
        $event->performAction = false;
    }
});
```

## commerce_payments.onBeforeGatewayRequestSend

Raised before an order is saved.

### Params

- `type` – The transaction type `authorize`,`purchase`,`refund`,`capture`
- `request` – The Omnipay Request object (Omnipay\Common\Message\AbstractRequest)
- `transaction` – The [Transaction model](transaction-model.md) for this request

```php
craft()->on('commerce_payments.onBeforeGatewayRequestSend', function($event){
    $transaction = $event->params['transaction'];
    $transaction->message = 'Transaction declined';
    $event->performAction = false;
});
```

::: tip
Event handlers can prevent the gateway request from happening by setting `$event->performAction` to `false`. If you want to give a clear reason, set a message on the transaction model.
:::

## commerce_lineItems.onPopulateLineItem

This event is raised when a line item is getting populated or repopulated from a purchasable.

### Params

- `lineItem` – the [Line Item model](line-item-model.md) that is getting populated by the line item
- `purchasable` – the purchasable that belongs to the line item

```php
craft()->on('commerce_lineItems.onPopulateLineItem', function($event) {
    $purchasable = $event->params['purchasable'];
    $lineItem = $event->params['lineItem'];

    if ($purchasable->getPurchasableId() == 1461) {
        $lineItem->price = 3;
        $lineItem->saleAmount = 0;
    }
});
```

OR

```php
craft()->on('commerce_lineItems.onPopulateLineItem', function($event) {
    $purchasable = $event->params['purchasable'];
    $lineItem = $event->params['lineItem'];

    if ($lineItem->options['giftWrapped']) {
        $lineItem->price = $lineItem->price + 1;
        $lineItem->saleAmount = 0;
    }
});
```

OR

```php
craft()->on('commerce_lineItems.onPopulateLineItem', function($event)
{
    $lineItem = $event->params['lineItem'];
    $options = $lineItem->options;

    if (isset($options['customWidth']) && $options['customWidth']) {
        $lineItem->price = $lineItem->price * (int) $options['customWidth'];
        $lineItem->saleAmount = 0;
    }
});
```

## commerce_lineItems.onCreateLineItem

This event is raised when a new line item is created from a purchasable.

### Params

- `lineItem` – the [Line Item model](line-item-model.md) as it has been created and before it has been added to the cart

```php
craft()->on('commerce_lineItems.onCreateLineItem', ['MyClass', 'onCreateLineItemHandlerMethod']);
```

## commerce_lineItems.onBeforeSaveLineItem

Raised before a line item is saved.

### Params

- `lineItem` – the [Line Item model](line-item-model.md) getting saved
- `isNewLineItem ` - true/false if the Line Item is new

```php
craft()->on('commerce_lineItems.onBeforeSaveLineItem', ['MyClass', 'beforeSaveHandlerMethod']);
```

## commerce_lineItems.onSaveLineItem

Raised when a line item is saved.

### Params

- `lineItem` – the [Line Item model](line-item-model.md) getting saved
- `isNewLineItem ` - Whether the line item is new

```php
craft()->on('commerce_lineItems.onSaveLineItem', ['MyClass', 'saveHandlerMethod']);
```

## commerce_products.onBeforeSaveProduct

Raised before a product is saved.

### Params

- `product` – the [Product model](product-model.md) getting saved
- `isNewProduct` - Whether the product is new

```php
craft()->on('commerce_products.onBeforeSaveProduct', ['MyClass', 'beforeSaveHandlerMethod']);
```

## commerce_products.onSaveProduct

Raised after a product is saved.

### Params

- `product` – the [Product model](product-model.md) getting saved
- `isNewProduct` - Whether the product is new

```php
craft()->on('commerce_products.onSaveProduct', ['MyClass', 'saveHandlerMethod']);
```

## commerce_products.onBeforeDeleteProduct

Raised before a product is deleted.

### Params

- `product` – the [Product model](product-model.md) getting deleted

```php
craft()->on('commerce_products.onBeforeDeleteProduct', ['MyClass', 'beforeDeleteHandlerMethod']);
```

::: tip
You can prevent the product from getting deleted by setting `$event->performAction` to `false`.
:::

## commerce_products.onBeforeEditProduct

Raised after a product model has been loaded for editing.

### Params

- `product` – the [Product model](product-model.md) being edited

```php
craft()->on('commerce_products.onBeforeEditProduct', ['MyClass', 'saveHandlerMethod']);
```

## commerce_products.onDeleteProduct

Raised after a Product is deleted.

### Params

- `product` – the [Product model](product-model.md) getting deleted

```php
craft()->on('commerce_products.onDeleteProduct', ['MyClass', 'deleteHandlerMethod']);
```

## commerce_orders.onBeforeSaveOrder

Raised before an order is saved.

### Params

- `order` – the [Order model](order-model.md) getting saved

```php
craft()->on('commerce_orders.onBeforeSaveOrder', ['MyClass', 'orderBeforeSaveHandlerMethod']);
```

::: tip
Event handlers can prevent the order from getting saved by setting `$event->performAction` to false.
:::

## commerce_orders.onSaveOrder

Raised after an order is saved.

### Params

- `order` – the [Order model](order-model.md) getting saved

```php
craft()->on('commerce_orders.onSaveOrder', ['MyClass', 'orderSaveHandlerMethod']);
```

## commerce_orders.onBeforeOrderComplete

Raised before a cart is completed and becomes an order.

### Params

- `order` – the [Order model](order-model.md) for the cart that is about to become an order

```php
craft()->on('commerce_orders.onBeforeOrderComplete', ['MyClass', 'orderCompleteHandlerMethod']);
```

## commerce_orders.onOrderComplete

Raised when a cart has been turned into an order.

### Params

- `order` – the [Order model](order-model.md) for the cart, which is now a completed order.

```php
craft()->on('commerce_orders.onOrderComplete', ['MyClass', 'orderCompleteHandlerMethod']);
```

## commerce_payments.onRefundTransaction

Raised after a transaction was attempted to be refunded.

### Params

- `transaction` – the [Transaction model](transaction-model.md) created after a refund was attempted

```php
craft()->on('commerce_payments.onRefundTransaction', function($event) {
    $transaction = $event->params['transaction];
    if ($transaction->status == 'success') {
        $transaction->order->orderStatusId = 2;
        craft()->commerce_orders->saveOrder($transaction->order);
    }
});
```

## commerce_orderHistories.onStatusChange

Raised after the status of an order was changed.

### Params

- `order` – the [Order model](order-model.md) getting saved
- `orderHistory` – the [Order History model](order-history-model.md) that was created and which updated the order’s status

```php
craft()->on('commerce_orderHistories.onStatusChange', ['MyClass', 'orderStatusChangeHandlerMethod']);
```

## commerce_cart.onBeforeAddToCart

Raised before an item has been saved to the cart for the first time.

### Params

- `order` – the [Order model](order-model.md) for the cart
- `lineItem` – the [Line Item model](line-item-model.md) getting added to the cart.

```php
craft()->on('commerce_cart.onAddToCart', ['MyClass', 'beforAddToCartHandlerMethod']);
```

::: tip
Event handlers can prevent the add to cart by setting `$event->performAction` to `false`.
:::

## commerce_cart.onAddToCart

Raised after an item has been added to the cart for the first time.

### Params

- `cart` – the [Order model](order-model.md) for the cart
- `lineItem` – the [Line Item model](line-item-model.md) getting added to the cart

```php
craft()->on('commerce_cart.onAddToCart', ['MyClass', 'addToCartHandlerMethod']);
```

## commerce_cart.onRemoveFromCart

Raised after a lineItem has been removed from the cart.

### Params

- `cart` – the [Order model](order-model.md) that the line item was removed from
- `lineItemId` – the removed line item’s ID

```php
craft()->on('commerce_cart.onRemoveFromCart', ['MyClass', 'removeFromCartHandlerMethod']);
```

## commerce_transactions.onCreateTransaction

Raised after a newly created transaction model has been instantiated.

### Params

- `transaction` – the [Transaction model](transaction-model.md) that was just created

```php
craft()->on('commerce_transactions.onCreateTransaction', function($event) {
    $transaction = $event->params['transaction'];

    // pay half the regular amount
    $transaction->amount /= 2;
    $transaction->paymentAmount /= 2;
});
```

## commerce_transactions.onSaveTransaction

Raised after a transaction has been saved.

### Params

- `transaction` – the [Transaction model](transaction-model.md) that was just saved

```php
craft()->on('commerce_transactions.onSaveTransaction', ['MyClass', 'savedTranactionHandlerMethod']);
```

## commerce_variants.onOrderVariant

Raised after stock has been deducted from a variant.

### Params

- `variant` – the [Variant model](variant-model.md) that was ordered

```php
craft()->on('commerce_variants.onOrderVariant', function($event) {
    $variant = $event->params['variant'];
    if ($variant->stock < 5) {
        Craft::log('Stock Low');
    }
});
```

## commerce_emails.onBeforeSendEmail

Raised before a Commerce email is sent.

### Params

- `craftEmail` – the [Email model](https://docs.craftcms.com/api/v2/craft-emailmodel.html) that has been prepared to send
- `commerceEmail` – the source Commerce email model as setup in Commerce settings
- `order` – the [Order model](order-model.md) of the current email
- `orderHistory` – the [Order History model](order-history-model.md) that triggered this Commerce email to be sent

```php
craft()->on('commerce_emails.onBeforeSendEmail', function($event) {
    // if the order's locale is US English, change the email's From address.
    if ($event->params['order'] && $event->params['order']->orderLocale == 'en_us') {
        $event->params['craftEmail']->fromEmail = 'usa@usa-example.com';
    }
});
```

## commerce_emails.onSendEmail

Raised after a Commerce email was sent.

### Params

- `craftEmail` – the [Email model](https://docs.craftcms.com/api/v2/craft-emailmodel.html) that was sent
- `commerceEmail` – the source Commerce email model as setup in Commerce settings
- `order` – the [Order model](order-model.md) of the current email
- `orderHistory` – the [Order History model](order-history-model.md) that triggered this Commerce email

```php
craft()->on('commerce_emails.onSendEmail', function($event) {
    // if the order's locale is US English, change the email's From address.
    if ($event->params['order'] && $event->params['order']->orderLocale == 'en_us') {
        $event->params['craftEmail']->fromEmail = 'usa@usa-example.com';
    }
});
```

## commerce_addresses.onBeforeSaveAddress

Raised before address has been saved.

### Params

- `address` – the [Address model](address-model.md) that will be saved

```php
craft()->on('commerce_addresses.onBeforeSaveAddress', function($event) {
    $address = $event->params['address'];
    $address->addError('firstName', 'Invalid name');
    $event->performAction = false;
});
```

::: tip
Event handlers can prevent the address from getting replaced by setting `$event->performAction` to `false`.
:::

## commerce_addresses.onSaveAddress

Raised after an address has been saved.

### Params

- `address` – the [Address model](address-model.md) that was just saved

```php
craft()->on('commerce_addresses.onSaveAddress', ['MyClass', 'saveAddressHandlerMethod']);
```
