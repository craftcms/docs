# マルチセレクトボックスフィールド

マルチセレクトボックスフィールドは、複数選択形式の入力を提供します。

## 設定

マルチセレクトボックスフィールドの設定は、次の通りです。

* **マルチセレクトボックスのオプション** – フィールドで利用可能なオプションを定義します。オプションの値とラベルを別々に設定したり、デフォルトで選択状態にしておくものを選択できます。

## テンプレート記法

### マルチセレクトボックスフィールドによるエレメントの照会

マルチセレクトボックスフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、マルチセレクトボックスフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `'foo'` | `foo`  オプションが選択されている。
| `'not foo'` | `foo` オプションが選択さていない。
| `['foo', 'bar']` | `foo` または `bar` オプションのいずれかが選択されている。
| `['and', 'foo', 'bar']` | `foo` と `bar` オプションが選択されている。

```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```

### マルチセレクトボックスフィールドデータの操作

テンプレート内でマルチセレクトボックスフィールドのエレメントを取得する場合、マルチセレクトボックスフィールドのハンドルを利用して、そのデータにアクセスできます。

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
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

いずれかのオプションが選択されているかを確認するには、[length](https://twig.symfony.com/doc/2.x/filters/length.html) フィルタを利用してください。

```twig
{% if entry.myFieldHandle|length %}
```

特定のオプションが選択されているかを確認するには、[contains()](craft3:craft\fields\data\MultiOptionsFieldData::contains()) を利用してください。

```twig
{% if entry.myFieldHandle.contains('foo') %}
```

### 投稿フォームでマルチセレクトボックスフィールドを保存

マルチセレクトボックスフィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

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
