---
description: Give content managers access to extra features from element indexes. 
---

# Element Actions

Plugins can provide custom actions for element index pages by creating a class that implements <craft4:craft\base\ElementActionInterface>. Element actions can operate on single elements or multiple elements at the same time.

## Action Class

Use the [generator](generator.md) to scaffold your action class:

<Generator component="element-action" plugin="my-plugin" />

As a convenience, you can extend <craft4:craft\base\ElementAction>, which provides a base action type implementation. You can refer to Craft’s own element action classes (located in `vendor/craftcms/cms/src/elements/actions/`, or the `craft\elements\actions` namespace) for examples.

### Parameterization

Craft’s built-in element actions prioritize reusability over specificity. Take <craft4:craft\elements\actions\Delete>, for instance: it can be used with any element type, but entries and categories make use of its attributes to generate other actions like “Delete (with descendants)” (by setting the `withDescendants` attribute), or “Delete permanently” (with the `hard` attribute).

## Registering Element Actions

To show up on an element index page, actions must be registered with the element type.

If an action is only relevant to a custom [element type](element-types.md) that is defined by the same plugin, return it from the element class’s [defineActions()](element-types.md#actions) method:

```php
protected static function defineActions(string $source): array
{
    return [
        MyAction::class,
    ];
}
```

If it should be available to an element type that is out of the plugin’s control, register it using the <craft4:craft\base\Element::EVENT_REGISTER_ACTIONS> event:

```php
<?php
namespace mynamespace;

use craft\base\Element;
use craft\elements\Entry;
use craft\events\RegisterElementActionsEvent;
use mynamespace\elements\actions\MyAction;
use yii\base\Event;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(
            Entry::class,
            Element::EVENT_REGISTER_ACTIONS,
            function(RegisterElementActionsEvent $event) {
                $event->actions[] = MyAction::class;
            }
        );

        // ...
    }

    // ...
}
```

Both options give you access to the [element source](element-types.md#sources) being rendered, so that actions can be conditionally added—for `defineActions()`, it's passed as an argument; when registering them via an event, the event object has a `source` attribute.

## Handling Actions

Craft runs all actions via <craft4:craft\controllers\ElementIndexesController::actionPerformAction()>. See the built-in actions for examples of how they handle interactions in the control panel, and for back-end implementations of `performAction()`.
