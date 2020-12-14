# チェックボックスフィールド

チェックボックスフィールドでは、チェックボックスのグループが提供されます。

## 設定

チェックボックスの設定は、次の通りです。

* **チェックボックスのオプション** – フィールドで利用可能なチェックボックスを定義します。 オプションの値とラベルを別々に設定したり、デフォルトでチェックしておくものを選択できます。

## Development

### チェックボックスフィールドによるエレメントの照会

チェックボックスフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、チェックボックスフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                       | 取得するエレメント                              |
| ----------------------- | -------------------------------------- |
| `'foo'`                 | `foo` オプションが選択されている。                   |
| `'not foo'`             | `foo` オプションが選択されていない。                  |
| `['foo', 'bar']`        | with `foo` or `bar` options selected.  |
| `['and', 'foo', 'bar']` | with `foo` and `bar` options selected. |

::: code
```twig
{# Fetch entries with the 'foo' option checked #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```
```php
// Fetch entries with the 'foo' option checked
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('foo')
    ->all();
```
:::

### チェックボックスフィールドデータの操作

If you have an element with a Checkboxes field in your template, you can access its data using your Checkboxes field’s handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle %}
```
:::

That will give you a <craft3:craft\fields\data\MultiOptionsFieldData> object that contains the field data.

To loop through all checked options, iterate over the field value:

::: code
```twig
{% for option in entry.myFieldHandle %}
    Label: {{ option.label }}
    Value: {{ option }} or {{ option.value }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle as $option) {
    // label: $option->label
    // value: $option or $option->value
}
```
:::

To loop through all available options, iterate over the [options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) property:

::: code
```twig
{% for option in entry.myFieldHandle.options %}
    Label:   {{ option.label }}
    Value:   {{ option }} or {{ option.value }}
    Checked: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle->options as $option) {
    // label:   $option->label
    // value:   $option or $option->value
    // checked: $option->selected ? 'Yes' : 'No'
}
```
:::

To see if any options are checked, use the [length](https://twig.symfony.com/doc/2.x/filters/length.html) filter or [count](https://www.php.net/manual/en/function.count.php) method:

::: code
```twig
{% if entry.myFieldHandle|length %}
```
```php
if (count($entry->myFieldHandle)) {
```
:::

To see if a particular option is checked, use [contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains())

::: code
```twig
{% if entry.myFieldHandle.contains('foo') %}
```
```php
if ($entry->myFieldHandle->contains('foo')) {
```
:::

### Saving Checkboxes Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Checkboxes field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

{# Include a hidden input first so Craft knows to update the
   existing value, if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

<ul>
    {% for option in field.options %}

        {% set checked = entry is defined
            ? entry.myFieldHandle.contains(option.value)
            : option.default %}

        <li><label>
            <input type="checkbox"
                name="fields[myFieldHandle][]"
                value="{{ option.value }}"
                {% if checked %}checked{% endif %}>
            {{ option.label }}
        </label></li>
    {% endfor %}
</ul>
```
