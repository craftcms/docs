# フィールドタイプ

プラグインは、<craft3:craft\base\FieldInterface> および <craft3:craft\base\FieldTrait> を実装するクラスを作成することによって、カスタムフィールドタイプを提供できます。 そのクラスは（静的メソッドで）フィールドタイプについて様々なことを伝える手段として、さらに、そのタイプのフィールドが一緒にインスタンス化されるであろうモデルとしての両方の役割を果たします。

便利なものとして、基本フィールドタイプの実装を提供する <craft3:craft\base\Field> を拡張できます。

例えば、Craft 自身のフィールドクラスを参照することもできます。 それらは `vendor/craftcms/cms/src/fields/` にあります。

## カスタムフィールドタイプの登録

フィールドクラスを作成したら、フィールドサービスに登録する必要があります。 それによって、Craft は利用可能なフィールドタイプのリストへ代入する際にそれを知ります。

```php
<?php
namespace ns\prefix;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use yii\base\Event;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES, function(RegisterComponentTypesEvent $event) {
            $event->types[] = MyField::class;
        });

        // ...
    }

    // ...
}
```

## Supporting Delta Saves

If your field type does any processing from [afterElementSave()](craft3:craft\base\FieldInterface::afterElementSave()) or [afterElementPropagate()](craft3:craft\base\FieldInterface::afterElementPropagate()), you can improve performance by skipping processing when the field’s value is unchanged.

You can tell whether field content has changed by calling [isFieldDirty()](craft3:craft\base\ElementInterface::isFieldDirty()) on the element.

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

The field type’s [getContentColumnType()](craft3:craft\base\Field::getContentColumnType()) method can return either a single column type, or a key-value array of multiple handles and [types](yii2:yii\db\Schema#constants).

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

- Automatic creation, duplication, retrieval, and deletion of field content in the database.
- Any core migrations or improvements that impact the `content` table.
- Automatic support for [sites and localization](../sites.md).
- Automatic inclusion of content fields in element queries and GraphQL.

