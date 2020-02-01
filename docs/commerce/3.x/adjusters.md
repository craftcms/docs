# Adjusters

Adjusters are classes that return adjustment models to the cart. Each adjustment model contains an amount which modifies the price of the order or line item. Adjustment models always belong to the order, but can optionally belong to a line item.

Custom adjusters are only available in the Pro edition of Craft Commerce.

An adjuster class implements the [Adjuster Interface](api:craft\commerce\base\AdjusterInterface).

## Register a New Adjuster

To register your adjuster class, append it to the `types` array attribute in 
the `OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS` event model.

```php
Event::on(OrderAdjustments::class, OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS, function(RegisterComponentTypesEvent $event) {
  $event->types[] = MyAdjuster::class;
});
```

The order of the adjustments within the types array is important, because its adjusters will be called in exactly that sequence when an order is calculated. Because of this, you could have a project-level event listener that could exist solely to reorder these adjusters without appending any new ones.

## Adjusting

The Adjuster Interface’s only method is `adjust(Order $order)`. 

Each order adjustment model should contain all information about how the adjuster came to its adjustment. For example, the shipping adjuster includes the information about the matching shipping rules used to calculate the shipping cost, and stores the rule information in the `sourceSnapshot` attribute of the adjustment model.

The `amount` value on the Order Adjustment model is used when totalling the cart. Use negative amounts to reduce the price of the order.

If you’d like to explain the adjustment for the user in plain text, use the `description` field on the model.

## Included Adjustments

If you set the adjustment model’s `included` attribute as `true`, the adjustment does not make any changes to the order’s total. Instead, it simply records an amount that was included in the price of the order.

The only “included” adjustment used in Commerce is for included taxes.

## Order or Line Item adjustment

An adjustment model always belongs to an order, but can optionally belong to a line item. To specify an adjustment on a line item, use the `setLineItem()` method when creating the adjustment model:

`$adjustment->setLineItem($lineItem)`

This ensures the correct line item will be referenced, even if that line item is new and doesn’t yet have an ID.

## Example

Below is an example adjuster class that puts a $2 discount on each line item:

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
      $adjustment->sourceSnapshot = [ 'data' => 'value']; // This can contain information about how the adjustment came to be
      $adjustment->amount = -2;
      $adjustment->setOrder($order);
      $adjustment->setLineItem($item);
      
      $adjustments[] = $adjustment;
    }
    
    return $adjustments;
  }
}        
```
