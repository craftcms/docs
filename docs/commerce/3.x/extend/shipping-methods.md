# Shipping Methods <badge type="edition" vertical="middle" title="Custom shipping methods are only available in Commerce Pro">Pro</badge>

Craft Commerce provides several ways of adding shipping costs to the cart:

1. **Using the [included shipping method and shipping rules engine](../shipping.md).**\
   Define your rules and prices based on individual product details and the cart as a whole. Costs may come from the overall order, weight, cost percentage, and per-item attributes. This engine is fairly powerful and can meet the needs of most small businesses with simple to moderately complex shipping needs.

2. **Writing an order [adjuster](adjusters.md) class.**\
   If you need to add dynamic shipping costs to the cart _without_ providing options to your customer, an order adjuster class offers flexibility beyond the native shipping engine UI.

3. **Writing a plugin or module that provides its own shipping method.**\
   You can still utilize the shipping engine in option 1 while adding functionality that presents more than one option to the customer, utilizes an external API, or uses your own custom pricing logic.

::: tip
Before writing your own shipping adjuster or shipping method (option 2 or 3), make sure you’re comfortable [creating a plugin or module for Craft CMS](https://craftcms.com/docs/3.x/extend/).
:::

Since the best code is code you don’t have to write, it’s best to see if the included shipping system can be used to address the shipping needs of your store. Adding or modifying adjusters means introducing a minimal amount of custom PHP, while adding your own shipping method offers the greatest flexibility when the first two options are too limited. The most common reason for introducing a custom shipping method is to provide an integration with an external API for getting rates.

## Creating a Shipping Adjuster

A shipping adjuster is a specific kind of adjuster whose `type` is set to `shipping`.

To learn more about adjusters and how you can create your own, see [Adjusters](adjusters.md).

## Creating a Shipping Method

Shipping methods must be classes that meet the [shipping method interface](commerce3:craft\commerce\base\ShippingMethodInterface), generally providing a name, rules for applying the method to an order, and the logic that evaluates those rules to decide whether the shipping method should return _shipping method options_ for the customer based on an order.

### Shipping Method Interface

The [shipping method interface](commerce3:craft\commerce\base\ShippingMethodInterface) requires a class with the following methods:

#### getType()

Returns the type of shipping method. This would likely be the handle of your plugin.

#### getId()

Must return `null`.

#### getName()

Returns the name of this shipping method, displayed to the customer and in the control panel.

#### getHandle()

Returns the handle added to the order when a customer selects this shipping method.

#### getCpEditUrl()

Returns a control panel URL to a place where you can configure this shipping method’s rules. Return an empty string if the method has no link.

#### getRules()

Returns an array of rules that meet [the `ShippingRules` interface](#shipping-rules-interface).

#### getIsEnabled()

Returns `true` if this shipping method should be an option for the customer to select.

### Shipping Rules Interface

The shipping method returns an array of these rules objects. The shipping engine processes the array in the order it was received, calling `matchOrder()` on each item. It expects to get `true` or `false` from each, indicating whether this shipping method can be applied to the order/cart. The first matched (`true`) rule returns the costs to the cart.

These are the methods required for each [shipping rule](commerce3:craft\commerce\base\ShippingRuleInterface) object:

#### getHandle();

Returns the unique handle of this shipping rule.

#### matchOrder([Order \$order](commerce3:craft\commerce\elements\Order))

Returns `true` if this rule is a match on the order, or `false` if the shipping engine should continue and evaluate the next rule for the current shipping method.

If all rules return `false`, the shipping method is not available for the customer to select on the order.

#### getIsEnabled()

Returns `true` if the rule is enabled, or `false` if `matchOrder()` should not be attempted.

#### getOptions()

Stores this data as JSON on the order’s shipping adjustment when this rule is applied. For example, you might include all data used to determine the rule matched.

#### getPercentageRate()

Returns a percentage rate to be multiplied by each line item’s subtotal. `0` will not make any changes.

#### getPerItemRate()

Returns a flat rate to be multiplied by each line item’s quantity. `0` will not make any changes.

#### getWeightRate()

Returns a rate to be multiplied by each line item’s weight. `0` will not make any changes.

#### getBaseRate()

Returns a base shipping cost to be added at the order level. `0` will not make any changes.

#### getMaxRate()

Returns a maximum cost for this rule to be applied. If the total of the order’s applied rates is greater than this, the `baseShippingCost` on the order is modified to meet this maximum rate.

#### getMinRate()

Returns a minimum cost for this rule to be applied. If the total of the order’s applied rates is less than this, the `baseShippingCost` on the order is modified to meet this minimum rate. `0` will not make any changes.

#### getDescription()

Returns a human-friendly description of the rates applied by this rule.

### Registering your Shipping Method and Rules

Once you’ve created your shipping method class and its associated shipping rules classes, you need make sure Commerce can use it.

Do this by using your plugin’s `init()` method to register an instance of your shipping method. Subscribe to the [`registerAvailableShippingMethods`](events.md#registeravailableshippingmethods) event and add your shipping method to the event object’s `shippingMethods` array:

```php
use craft\commerce\events\RegisterAvailableShippingMethodsEvent;
use craft\commerce\services\ShippingMethods;
use yii\base\Event;

Event::on(
    ShippingMethods::class,
    ShippingMethods::EVENT_REGISTER_AVAILABLE_SHIPPING_METHODS,
    function(RegisterAvailableShippingMethodsEvent $event) {
        $event->shippingMethods[] = new MyShippingMethod();
    }
);
```

## Fetching a Cart’s Shipping Method

When looking to get a cart’s selected shipping method, use [`shippingMethodHandle`](commerce3:craft\commerce\elements\Order::shippingMethodHandle). This will return the handle of the chosen shipping method or `null` if none has been selected.

It’s important to note that calling [`getShippingMethod()`](commerce3:craft\commerce\elements\Order::getShippingMethod()) will set the least expensive option for the order if one hasn’t yet been selected. This can lead to some confusion if you’re expecting it to represent an explicit choice from the user.
