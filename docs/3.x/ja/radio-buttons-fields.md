# ラジオボタンフィールド

ラジオボタンフィールドでは、ラジオボタンのグループが提供されます。

## 設定

ラジオボタンフィールドの設定は、次の通りです。

* **ラジオボタンのオプション** – フィールドで利用可能なラジオボタンを定義します。 オプションの値とラベルを別々に設定したり、デフォルトで選択状態にしておくものを選択できます。

## Development

### ラジオボタンフィールドによるエレメントの照会

ラジオボタンフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、ラジオボタンフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                       | 取得するエレメント                            |
| ----------------------- | ------------------------------------ |
| `'foo'`                 | `foo` オプションが選択されている。                 |
| `'not foo'`             | `foo` オプションが選択さていない。                 |
| `['foo', 'bar']`        | `foo` または `bar` オプションのいずれかが選択されている。  |
| `['not', 'foo', 'bar']` | `foo` または `bar` オプションのいずれかが選択されていない。 |

::: code
```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```
```php
// Fetch entries with the 'foo' option selected
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('foo')
    ->all();
```
:::

### ラジオボタンフィールドデータの操作

If you have an element with a Radio Buttons field in your template, you can access its data using your Radio Buttons field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you a <craft3:craft\fields\data\SingleOptionFieldData> object that contains the field data.

To show the selected option, output it as a string, or output the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

::: code
```twig
{{ entry.myFieldHandle }} or {{ entry.myFieldHandle.value }}
```
```php
// $entry->myFieldHandle or $entry->myFieldHandle->value
```
:::

To see if an option is selected, use the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

::: code
```twig
{% if entry.myFieldHandle.value %}
```
```php
if ($entry->myFieldHandle->value) {
```
:::

To show the selected option’s label, output the [label](craft3:craft\fields\data\SingleOptionFieldData::$label) property:

::: code
```twig
{{ entry.myFieldHandle.label }}
```
```php
// $entry->myFieldHandle->label
```
:::

To loop through all the available options, iterate over the [options](craft3:craft\fields\data\SingleOptionFieldData::getOptions()) property:

::: code
```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle->options as $option) {
    // Label:    $option->label
    // Value:    $option or $option->value
    // Selected: $option->selected ? 'Yes' : 'No'
}
```
:::

### Saving Radio Buttons Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Radio Buttons field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

<ul>
    {% for option in field.options %}

        {% set selected = entry is defined
            ? entry.myFieldHandle.value == option.value
            : option.default %}

        <li><label>
            <input type="radio"
                name="fields[myFieldHandle]"
                value="{{ option.value }}"
                {% if selected %}checked{% endif %}>
            {{ option.label }}
        </label></li>
    {% endfor %}
</ul>
```
