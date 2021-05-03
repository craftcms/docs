# Adjusters <badge type="edition" vertical="middle" title="Custom adjusters are only available in Commerce Pro">Pro</badge>

Adjuster classes return models that modify pricing when an order is [recalculated](../orders-carts.md#recalculating-orders).

## Writing an Adjuster

Each class implements the [Adjuster Interface](commerce3:craft\commerce\base\AdjusterInterface) with an `adjust()` method for evaluating the order and returning zero or more [OrderAdjustment](commerce3:craft\commerce\models\OrderAdjustment) models. Each of those models may be applied to the order or one of its line items.

::: tip Do you need your own adjuster?
The built in adjusters each include integration points that could reduce the amount of custom code you need to write. Look at the existing [Discount](commerce3:craft\commerce\adjusters\Discount), [Shipping](commerce3:craft\commerce\adjusters\Shipping), and [Tax](commerce3:craft\commerce\adjusters\Tax) adjusters before you write your own from scratch.
:::

An adjustment model should have a `type` of `shipping`, `discount`, or `tax`. (Adjustments are applied in that order under the hood.) While it’s technically possible to designate any `type` value, using one of those three will ensure the adjustment is properly represented to the payment gateway.

The rest of this page covers discount and shipping adjusters even though there is also a `tax` adjuster type. Only one tax adjuster is allowed, but tax adjustments are deeply customizable via [tax engines](tax-engines.md).

::: warning
Adjuster models previously allowed setting the `type` property to any string. This been deprecated and only the type values above will be allowed in Commerce 4.
:::

## Registering a New Adjuster

You can register your adjuster class by including it in the `types` array attribute of the [`registerOrderAdjusters`](events.md#registerorderadjusters) or [`registerDiscountAdjusters`](events.md#registerdiscountadjusters) event model.

::: code
```php Order Adjuster
use craft\commerce\services\OrderAdjustments;
use yii\base\Event;
use MyAdjuster;

Event::on(
    OrderAdjustments::class,
    OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyAdjuster::class;
    }
);
```
```php Discount Adjuster
use craft\commerce\services\OrderAdjustments;
use yii\base\Event;
use MyAdjuster;

Event::on(
    OrderAdjustments::class,
    OrderAdjustments::EVENT_REGISTER_DISCOUNT_ADJUSTERS,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyAdjuster::class;
    }
);
```
:::

The order of the adjustments within the `types` array is important because adjusters will be called in exactly that sequence when an order is calculated.

::: tip
Even if you don’t add or replace an adjuster you might still use either event solely to change the order in which *existing* adjustments are applied.
:::

## Replacing an Adjuster

Because the adjusters are exposed in an array, you could also swap your own custom adjuster for one that’s built in. Here, we’re swapping a custom `MyShippingAdjuster` in place of the included [Shipping](commerce3:craft\commerce\adjusters\Shipping) class:

```php
use craft\commerce\services\OrderAdjustments;
use yii\base\Event;
use craft\commerce\adjusters\Shipping;
use MyShippingAdjuster;

Event::on(
    OrderAdjustments::class,
    OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
    function(RegisterComponentTypesEvent $event) {
        $adjusters = $event->types;

        foreach ($adjusters as $key => $adjuster) {
            if ($adjuster == Shipping::class) {
                $adjusters[$key] = MyShippingAdjuster::class;
            }
        }

        $event->types = $adjusters;
    }
);
```

## Creating Adjustments

The adjuster interface consists of a single method: `adjust(Order $order)`.

Each [OrderAdjustment](commerce3:craft\commerce\models\OrderAdjustment) model returned by that `adjust` method—if it returns any at all—will have adjustment details and should include contextual information that explains why the adjuster returned it:

- **$type** should be `shipping`, `discount`, or `tax` to reflect the kind of adjustment.
- **$amount** is the value (positive or negative) used to modify the order or line item. (Negative amounts reduce the price of the order.)
- **$orderId** is the ID of the applicable order, which should be set via the `setOrder()` method.
- **$sourceSnapshot** is a required array or JSON string that should illuminate the rationale behind the adjustment. The included shipping adjuster, for example, includes whatever matching shipping rules were used to calculate the shipping cost.
- **$lineItemId** refers to the ID of an applicable line item on the order, which should optionally be set via the `setLineItem()` method.
- **$included** is `false` by default, and when `true` prevents the adjustment from changing the order’s total in order to clarify that it was already included in the price of the order. (The only included adjustment Commerce ships with is used for taxes.)
- **$name** is an optional short, human-friendly label for the adjustment.
- **$description** is an optional longer, human-friendly description of the adjustment.

### Designating an Order and Line Item

An adjustment model always belongs to an order, but can optionally belong to a line item.

To specify the adjustment’s order, use the `setOrder()` method when creating the adjustment:

```php
$adjustment->setOrder($order);
```

To the adjustment’s line item, use the `setLineItem()` method when creating the adjustment model:

```php
$adjustment->setLineItem($lineItem);
```

Using these methods ensures the correct order and line item will be referenced even if either one is new and doesn’t yet have an ID.

### Example

Below is an example adjuster class that puts a \$2 discount on each line item:

```php
<?php

use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\models\OrderAdjustment;

class MyAdjuster extends Component implements AdjusterInterface
{
    public function adjust(Order $order): array
    {
        $adjustments = [];

        foreach ($order->getLineItems() as $item) {
            $adjustment = new OrderAdjustment;
            $adjustment->type = 'discount';
            $adjustment->name = '$2 off';
            $adjustment->description = '$2 off everything in the store';
            // `sourceSnapshot` can contain information to explain the adjustment
            $adjustment->sourceSnapshot = [ 'data' => 'value' ];
            $adjustment->amount = -2;
            $adjustment->setOrder($order);
            $adjustment->setLineItem($item);

            $adjustments[] = $adjustment;
        }

        return $adjustments;
    }
}
```
