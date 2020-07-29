# Field Types

Plugins can provide custom field types by creating a class that implements <craft3:craft\base\FieldInterface> and <craft3:craft\base\FieldTrait>. The class will serve both as a way to communicate various things about your field type (with static methods), and as a model that fields of its type will be instantiated with.

As a convenience, you can extend <craft3:craft\base\Field>, which provides a base field type implementation.

You can refer to Craft’s own field classes for examples. They are located in `vendor/craftcms/cms/src/fields/`.

## Registering Custom Field Types

Once you have created your field class, you will need to register it with the Fields service, so Craft will know about it when populating the list of available field types:

```php
<?php
namespace mynamespace;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use yii\base\Event;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MyField::class;
            }
        );

        // ...
    }

    // ...
}
```

## Supporting Delta Saves

If your field type does any processing from [afterElementSave()](<craft3:craft\base\FieldInterface::afterElementSave()>) or [afterElementPropagate()](<craft3:craft\base\FieldInterface::afterElementPropagate()>), you can improve performance by skipping processing when the field’s value is unchanged.

You can tell whether field content has changed by calling [isFieldDirty()](<craft3:craft\base\ElementInterface::isFieldDirty()>) on the element.

```php
public function afterElementSave(ElementInterface $element, bool $isNew)
{
    if ($element->isFieldDirty()) {
        // logic for handling saved element
    }

    parent::afterElementSave($element, $isNew);
}
```
