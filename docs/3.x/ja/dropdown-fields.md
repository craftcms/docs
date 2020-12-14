# セレクトボックスフィールド

セレクトボックスフィールドは、ドロップダウン形式の入力を提供します。

## 設定

セレクトボックスフィールドの設定は、次の通りです。

* **セレクトボックスのオプション** – フィールドで利用可能なオプションを定義します。 オプションの値とラベルを別々に設定したり、デフォルトで選択状態にしておくものを選択できます。

## Development

### セレクトボックスフィールドによるエレメントの照会

セレクトボックスフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、セレクトボックスフィールドのデータに基づいた結果をフィルタできます。

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

### セレクトボックスフィールドデータの操作

If you have an element with a Dropdown field in your template, you can access its data using your Dropdown field’s handle:

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

```twig
{{ entry.myFieldHandle }} or {{ entry.myFieldHandle.value }}
```

To see if an option is selected, use the [value](craft3:craft\fields\data\SingleOptionFieldData::$value) property:

```twig
{% if entry.myFieldHandle.value %}
```

To show the selected option’s label, output the [label](craft3:craft\fields\data\SingleOptionFieldData::$label) property:

```twig
{{ entry.myFieldHandle.label }}
```

To loop through all of the available options, iterate over the [options](craft3:craft\fields\data\SingleOptionFieldData::getOptions()) property:

```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

### Saving Dropdown Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Dropdown field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

<select name="fields[myFieldHandle]">
    {% for option in field.options %}

        {% set selected = entry is defined
            ? entry.myFieldHandle.value == option.value
            : option.default %}

        <option value="{{ option.value }}"
                {% if selected %}selected{% endif %}>
            {{ option.label }}
        </option>
    {% endfor %}
</select>
```
