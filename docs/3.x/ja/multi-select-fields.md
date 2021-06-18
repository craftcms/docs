# マルチセレクトボックスフィールド

マルチセレクトボックスフィールドは、複数選択形式の入力を提供します。

## 設定

マルチセレクトボックスフィールドの設定は、次の通りです。

* **マルチセレクトボックスのオプション** – フィールドで利用可能なオプションを定義します。 オプションの値とラベルを別々に設定したり、デフォルトで選択状態にしておくものを選択できます。

## テンプレート記法

### マルチセレクトボックスフィールドによるエレメントの照会

マルチセレクトボックスフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、マルチセレクトボックスフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                       | 取得するエレメント                           |
| ----------------------- | ----------------------------------- |
| `'foo'`                 | `foo` オプションが選択されている。                |
| `'not foo'`             | `foo` オプションが選択されていない。               |
| `['foo', 'bar']`        | `foo` または `bar` オプションのいずれかが選択されている。 |
| `['and', 'foo', 'bar']` | `foo` と `bar` オプションが選択されている。        |

テンプレート内でマルチセレクトボックスフィールドのエレメントを取得する場合、マルチセレクトボックスフィールドのハンドルを利用して、そのデータにアクセスできます。
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

### マルチセレクトボックスフィールドデータの操作

選択されたオプションすべてをループするには、フィールド値を反復してください。

利用可能なオプションすべてをループするには、[options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) プロパティを反復してください。
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

特定のオプションが選択されているかを確認するには、[contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains()) を利用してください。

マルチセレクトボックスフィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

::: code
```twig
{% for option in entry.myFieldHandle %}
    Label: {{ option.label }}
    Value: {{ option }} or {{ option.value }}
{% endfor %}
```
```php
foreach ($entry->myFieldHandle as $option) {
    // Label: $option->label
    // Value: $option or $option->value
}
```
:::

To loop through all the available options, iterate over the [options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) property:

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

To see if any options are selected, use the [length](https://twig.symfony.com/doc/2.x/filters/length.html) filter:

::: code
```twig
{% if entry.myFieldHandle|length %}
```
```php
if (count($entry->myFieldHandle)) {
```
:::

To see if a particular option is selected, use [contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains())

::: code
```twig
{% if entry.myFieldHandle.contains('foo') %}
```
```php
if ($entry->myFieldHandle->contains('foo') {
```
:::

### 投稿フォームでマルチセレクトボックスフィールドを保存

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Multi-select field, you can use this template as a starting point:

```twig
{% set field = craft.app.fields.getFieldByHandle('myFieldHandle') %}

{# Include a hidden input first so Craft knows to update the
   existing value, if no options are selected. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

<select multiple name="fields[myFieldHandle][]">
    {% for option in field.options %}

        {% set selected = entry is defined
            ? entry.myFieldHandle.contains(option.value)
            : option.default %}

        <option value="{{ option.value }}"
                {% if selected %}selected{% endif %}>
            {{ option.label }}
        </option>
    {% endfor %}
</select>
```
