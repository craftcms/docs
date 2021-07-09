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

## Storing Content

By default, a field type’s [hasContentColumn()](craft3:craft\base\Field::hasContentColumn()) method returns `true`, meaning Craft will create one or more fields for it in the database’s `content` table.

The field type’s [getContentColumnType()](craft\base\Field::getContentColumnType()) method can return either a single column type, or a key-value array of multiple handles and [types](yii2:yii\db\Schema#constants).

::: code
```php Single Column
public function getContentColumnType()
{
    return \yii\db\Schema::TYPE_STRING;
}
```
```php Multiple Columns
public function getContentColumnType()
{
    return [
        'comment' => \yii\db\Schema::TYPE_STRING,
        'date' => \yii\db\Schema::TYPE_DATE,
    ];
}
```
:::

::: tip
See Craft’s [Date](craft3:craft\fields\Date) field for an example that uses two columns when it’s configured to store a timezone.
:::

Any column Craft creates in the `content` table will automatically get a random 9-character suffix like `_ycpsotpa`. This ensures column names are unique even in the rare case that identical handles are used. You can get this suffix from any field instance from its `columnSuffix` property.

This automatic suffix behavior was introduced in Craft 3.7 and only impacts existing fields when they’re saved—not via migration when Craft is updated.

If you’d rather have your custom field type manage its own content in the database, you can return `false` for hasContentColumn()—just know that you’ll have to manually account for several things you otherwise get for free when Craft manages its content fields in the database:

1. Automatic creation and deletion of database columns.
2. Any core migrations or improvements that impact the content table.
3. Automatic support for [sites and localization](../sites.md).
4. Automatic inclusion of content fields in element queries and GraphQL.

