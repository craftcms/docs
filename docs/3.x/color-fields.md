# Color Fields

Color fields give you a hexadecimal color input with a preview of the current color, and on browsers that support `<input type="color">`, clicking on the preview will open the browser’s color picker.

## Development

Calling a Color field in your templates will return a <craft3:craft\fields\data\ColorData> object, or `null` if no color was selected.

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