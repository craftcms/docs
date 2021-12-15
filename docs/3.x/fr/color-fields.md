# Color Fields

Color fields give you a hexadecimal color input with a preview of the current color, and on browsers that support `<input type="color">`, clicking on the preview will open the browser’s color picker.

## Templating

Calling a Color field in your templates will return a <craft3:craft\fields\data\ColorData> object, or `null` if no color was selected.

By default, the bare field handle will return a hexadecimal representation of that color:

::: code
```twig
{% if entry.myFieldHandle %}
  <style type="text/css">
    .content a {
      color: {{ entry.myFieldHandle }};
    }
    .content b {
      {# same thing #}
      color: {{ entry.myFieldHandle.getHex() }};
    }
  </style>
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    echo $entry->myFieldHandle;
    // same thing
    echo $entry->myFieldHandle->getHex();
}
```
:::

Here’s an impractical example illustrating each <craft3:craft\fields\data\ColorData> method:

::: code
```twig
{% if entry.myFieldHandle %}
  {{ entry.myFieldHandle }}                 {# output: #e5422b #}
  {{ entry.myFieldHandle.getHex() }}        {# output: #e5422b #}
  {{ entry.myFieldHandle.getRgb() }}        {# output: rgb(229,66,43) #}
  {{ entry.myFieldHandle.getHsl() }}        {# output: hsl(7,81%,90%) #}
  {{ entry.myFieldHandle.getLuma() }}       {# output: 0.38820862745098 #}
  {{ entry.myFieldHandle.getHue() }}        {# output: 7 #}
  {{ entry.myFieldHandle.getLightness() }}  {# output: 90 #}
  {{ entry.myFieldHandle.getSaturation() }} {# output: 81 #}
  {{ entry.myFieldHandle.getRed() }}        {# output: 229 #}
  {{ entry.myFieldHandle.getGreen() }}      {# output: 66 #}
  {{ entry.myFieldHandle.getBlue() }}       {# output: 43 #}
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    echo $entry->myFieldHandle;                  // output: #e5422b
    echo $entry->myFieldHandle->getHex();        // output: #e5422b
    echo $entry->myFieldHandle->getRgb();        // output: rgb(229,66,43)
    echo $entry->myFieldHandle->getHsl();        // output: hsl(7,81%,90%)
    echo $entry->myFieldHandle->getLuma();       // output: 0.38820862745098
    echo $entry->myFieldHandle->getHue();        // output: 7
    echo $entry->myFieldHandle->getLightness();  // output: 90
    echo $entry->myFieldHandle->getSaturation(); // output: 81
    echo $entry->myFieldHandle->getRed();        // output: 229
    echo $entry->myFieldHandle->getGreen();      // output: 66
    echo $entry->myFieldHandle->getBlue();       // output: 43
}
```
:::

::: tip
The example omits the `getL()`, `getS()`, `getR()`, `getG()`, and `getB()` methods, which are abbreviated forms of `getLuma()`, `getSaturation()`, `getRed()`, `getGreen()`, and `getBlue()` respectively.
:::
