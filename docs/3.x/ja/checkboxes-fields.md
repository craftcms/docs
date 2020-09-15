# チェックボックスフィールド

チェックボックスフィールドでは、チェックボックスのグループが提供されます。

## 設定

チェックボックスの設定は、次の通りです。

* **チェックボックスのオプション** – フィールドで利用可能なチェックボックスを定義します。オプションの値とラベルを別々に設定したり、デフォルトでチェックしておくものを選択できます。

## テンプレート記法

### チェックボックスフィールドによるエレメントの照会

チェックボックスフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、チェックボックスフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `'foo'` | `foo` オプションが選択されている。
| `'not foo'` | `foo` オプションが選択されていない。
| `['foo', 'bar']` | `foo` または `bar` オプションのいずれかが選択されている。
| `['and', 'foo', 'bar']` | `foo` と `bar` オプションが選択されている。

```twig
{# Fetch entries with the 'foo' option checked #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```

### チェックボックスフィールドデータの操作

テンプレート内でチェックボックスフィールドのエレメントを取得する場合、チェックボックスフィールドのハンドルを利用して、そのデータにアクセスできます。

```twig
{% set value = entry.myFieldHandle %}
```

それは、フィールドデータを含む <craft3:craft\fields\data\MultiOptionsFieldData> オブジェクトを提供します。

選択されたオプションすべてをループするには、フィールド値を反復してください。

```twig
{% for option in entry.myFieldHandle %}
    Label: {{ option.label }}
    Value: {{ option }} or {{ option.value }}
{% endfor %}
```

利用可能なオプションすべてをループするには、[options](craft3:craft\fields\data\MultiOptionsFieldData::getOptions()) プロパティを反復してください。

```twig
{% for option in entry.myFieldHandle.options %}
    Label:   {{ option.label }}
    Value:   {{ option }} or {{ option.value }}
    Checked: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

いずれかのチェックボックスが選択されているかを確認するには、[length](https://twig.symfony.com/doc/2.x/filters/length.html) フィルタを利用してください。

```twig
{% if entry.myFieldHandle|length %}
```

特定のオプションが選択されているかを確認するには、[contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains()) を利用してください。

```twig
{% if entry.myFieldHandle.contains('foo') %}
```

### 投稿フォームでチェックボックスフィールドを保存

チェックボックスフィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

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
