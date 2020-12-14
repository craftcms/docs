# プレーンテキストフィールド

プレーンテキストフィールドでは、プレーンなテキストを入力できる、一行テキストまたは複数行のテキストエリアのいずれかが提供されます。

## 設定

プレーンテキストフィールドの設定は、次の通りです。

* **プレースホルダーのテキスト** – フィールドが値を持たない場合に表示されるプレースホルダーのテキスト
* **文字数制限** – フィールドに含めることができる文字数の上限
* **改行を許可** – フィールド内で改行を許可するかどうか

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
