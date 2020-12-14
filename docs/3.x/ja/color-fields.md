# 色フィールド

色フィールドでは、現在のカラーのプレビューが付いた16進数のカラー入力を提供します。 `<input type="color">` をサポートしているブラウザでは、プレビューのクリックでブラウザのカラーピッカーを開きます。

## Development

テンプレート内でカラーフィルドを呼び出すと、 <craft3:craft\fields\data\ColorData> オブジェクトが返ります。 カラーが選択されていなければ、 `null` を返します。

::: code
```twig
{% if entry.myFieldHandle %}
    <style type="text/css">
        .content a {
            color: {{ entry.myFieldHandle.getHex() }};
        }
    </style>
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    // $entry->myFieldHandle->getHex()
}
```
:::