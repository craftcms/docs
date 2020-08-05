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
