# ラジオボタンフィールド

ラジオボタンフィールドでは、ラジオボタンのグループが提供されます。

## 設定

ラジオボタンフィールドの設定は、次の通りです。

* **ラジオボタンのオプション** – フィールドで利用可能なラジオボタンを定義します。オプションの値とラベルを別々に設定したり、デフォルトで選択状態にしておくものを選択できます。

## テンプレート記法

### ラジオボタンフィールドによるエレメントの照会

ラジオボタンフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、ラジオボタンフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `'foo'` | `foo`  オプションが選択されている。
| `'not foo'` | `foo` オプションが選択さていない。
| `['foo', 'bar']` | `foo` または `bar` オプションのいずれかが選択されている。
| `['not', 'foo', 'bar']` | `foo` または `bar` オプションのいずれかが選択されていない。

```twig
{# Fetch entries with the 'foo' option selected #}
{% set entries = craft.entries()
    .myFieldHandle('foo')
    .all() %}
```

### ラジオボタンフィールドデータの操作

テンプレート内でラジオボタンフィールドのエレメントを取得する場合、ラジオボタンフィールドのハンドルを利用して、そのデータにアクセスできます。

```twig
{% set value = entry.myFieldHandle %}
```

それは、フィールドデータを含む <craft3:craft\fields\data\SingleOptionFieldData> オブジェクトを提供します。

選択されたオプションを表示するには、それを文字列として出力するか、[value](craft3:craft\fields\data\SingleOptionFieldData::$value) プロパティを出力してください。

```twig
{{ entry.myFieldHandle }} or {{ entry.myFieldHandle.value }}
```

任意のオプションが選択されているかを確認するには、[value](craft3:craft\fields\data\SingleOptionFieldData::$value) プロパティを利用してください。

```twig
{% if entry.myFieldHandle.value %}
```

選択されたオプションのラベルを表示するには、[label](craft3:craft\fields\data\SingleOptionFieldData::$label) プロパティを出力してください。

```twig
{{ entry.myFieldHandle.label }}
```

利用可能なオプションすべてをループするには、[options](craft3:craft\fields\data\SingleOptionFieldData::getOptions()) プロパティを反復してください。

```twig
{% for option in entry.myFieldHandle.options %}
    Label:    {{ option.label }}
    Value:    {{ option }} or {{ option.value }}
    Selected: {{ option.selected ? 'Yes' : 'No' }}
{% endfor %}
```

### 投稿フォームでラジオボタンフィールドを保存

ラジオボタンフィールドを含める必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、出発点としてこのテンプレートを利用してください。

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
