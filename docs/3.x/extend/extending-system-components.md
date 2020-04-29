# Extending System Components

## Custom Validation Rules

You can add your own custom validation rules to elements and other system components using the [EVENT_DEFINE_RULES](api:craft\base\Model#event-define-rules) event.

Additional rules can use any of [Yii’s core validators](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-core-validators), [Craft’s validators](https://github.com/craftcms/cms/tree/develop/src/validators), or an [inline validation method](https://www.yiiframework.com/doc/guide/2.0/en/input-validation#inline-validators).

In this example, we’re adding a 5-item maximum for custom entry fields in a “News” section. It uses Craft’s `ArrayValidator` to easily validate based on the size of an array or element query result (like the Tags field):

```php
use craft\elements\Entry;
use craft\events\DefineRulesEvent;
use craft\validators\ArrayValidator;
use yii\base\Event;

Event::on(Entry::class, Entry::EVENT_DEFINE_RULES, function(DefineRulesEvent $e) {
    /** @var Entry $entry */
    $entry = $e->sender;

    // Only worry about entries in the News section
    if ($entry->section->handle !== 'news') {
        return;
    }

    $e->rules[] = ['field:myTagsField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
    $e->rules[] = ['field:myCheckboxesField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
    $e->rules[] = ['field:myTableField', ArrayValidator::class, 'max' => 5, 'on' => Entry::SCENARIO_LIVE];
});
```


## Behaviors

You can add your own custom [behaviors](https://www.yiiframework.com/doc/guide/2.0/en/concept-behaviors) to elements and other system components using the [EVENT_DEFINE_BEHAVIORS](api:craft\base\Model#event-define-behaviors) event.

This can be a simple way of adding small amounts of functionality to elements without having to extend them with new classes and use your new extended classes everywhere.

In this example, we’re adding a method on the built-in Commerce Product elements that will give us some details about financing the product.

Create the behavior class in your plugin. (Generally this would be created in a 'behaviors' directory.)

```php
<?php

namespace mynamespace\mypluginhandle\behaviors;

use craft\commerce\elements\Product;
use yii\base\Behavior;

class FinancableProductBehavior extends Behavior
{
    /** @var Product */
    public $owner;

    const FINANCE_MINIMUM_ELIGIBLE_PRICE = 500;
    const FINANCE_MINIMUM_DEPOSIT_PERCENTAGE = 10;
    const FINANCE_MAXIMUM_DURATION_MONTHS    = 24;

    public function isFinanceable()
    {
        return $this->owner->defaultPrice >= self::FINANCE_MINIMUM_ELIGIBLE_PRICE;
    }


    public function getFinancePriceFrom()
    {
        $price = $this->owner->defaultPrice;
        //take off the deposit
        $price = $price - ($price / self::FINANCE_MINIMUM_DEPOSIT_PERCENTAGE);
        // split what's left over the remaining months
        $price = $price / self::FINANCE_MAXIMUM_DURATION_MONTHS;
    
        return $price;
    }

  // ... any other methods

}

```

Then attach this behavior to the products in your plugin's `init` method.

```php
use mynamespace\mypluginhandle\behaviors\FinancableProductBehavior;

use craft\commerce\elements\Product;
use craft\events\DefineBehaviorsEvent;
use yii\base\Event;

Event::on(Product::class, Product::EVENT_DEFINE_BEHAVIORS, function(DefineBehaviorsEvent $event) {
    $event->sender->attachBehaviors([
        FinancableProductBehavior::class,
        // ... any other behaviors
    ]);
});
```

Now all the built-in products have a new method available to them that can be used in your templates or plugins.

::: code
```twig
{% if product.isFinanceable() %}
    <p>{{ product.title }} available from just {{ product.financePriceFrom | commerceCurrency('USD') }} per month!</p>
{% endif %}
```

```php
if ($product->isFinanceable()) {
    $priceFrom = $product->getFinancePriceFrom();
}
```
:::
