# プレーンテキストフィールド

プレーンテキストフィールドでは、プレーンなテキストを入力できる、一行テキストまたは複数行のテキストエリアのいずれかが提供されます。

## 設定

プレーンテキストフィールドの設定は、次の通りです。

* **Placeholder Text** – The field’s placeholder text, to be displayed if the field has no value yet.
* **Max Length** – The maximum number of characters the field can contain.
* **Allow line breaks** – Whether or not to allow line breaks in this field.

## フィールド

Plain Text fields will either show a normal text input or a multi-line textarea, depending on whether **Allow line breaks** was checked.

## Development

テンプレート内でプレーンテキストフィールドを呼び出すと、フィールドに入力された値を返します。

::: code
```twig
{% if entry.myFieldHandle %}
    <h3>Article</h3>
    {{ entry.myFieldHandle|markdown }}
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    // \yii\helpers\Markdown::process($entry->myFieldHandle);
}
```
:::
