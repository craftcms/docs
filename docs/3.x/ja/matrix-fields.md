# 行列フィールド

行列フィールドでは、1つのフィールド内に複数のコンテンツブロックを作成できます。

## 設定

行列フィールドの設定は、次の通りです。

- **構成** – ここでは、行列フィールドでどのようなブロックタイプが利用可能か、それらのブロックタイプがどのようなサブフィールドを持つ必要があるかを設定します。
- **最大ブロック数** – フィールドに作成できるブロック数の上限（デフォルトは無制限です） (Default is no limit.) (Default is no limit.)

## フィールド

新しいエントリでは、行列フィールドにはボタンのグループが表示されます。 フィールド設定で作成したブロックタイプごとに1つのボタンが表示されます。

それらのボタンの1つをクリックすると、新しいブロックが作成されます。 ブロックタイプの名前はブロックのタイトルバーに表示され、それぞれのブロックタイプのフィールドにはブロックの本体が存在しているでしょう。

あなたは好きなだけ（または、最大ブロック数の設定で許可されている範囲内で）、行列フィールドへブロックを追加できます。

各ブロックは設定メニューを持ち、そのブロックに対して追加でできることを開示します。

複数のブロックが選択されている場合、選択されたすべてのブロックに対して「折りたたむ / 展開する」「無効 / 有効」および「削除」オプションが適用されます。

メニューオプションの「折りたたむ」 をクリックするか、ブロックのタイトルバーをダブルクリックすることで、行列ブロックを折りたたむことができます。 ブロックが折りたたまれている場合、タイトルバーはコンテンツのプレビューを表示するため、それがどんなブロックかを識別できます。

ブロックは、そのブロックのタイトルバーの最後にある「移動」アイコンをドラックして並び替えることもできます。 複数のブロックが選択されている場合、選択されたすべてのブロックが一緒に移動します。

## テンプレート記法

### 行列フィールドによるエレメントの照会

行列フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、行列フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値              | 取得するエレメント          |
| -------------- | ------------------ |
| `':empty:'`    | 行列ブロックを持たない。       |
| `':notempty:'` | 少なくとも1つの行列ブロックを持つ。 |

```twig
{# Fetch entries with a Matrix block #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### 行列フィールドデータの操作

テンプレート内で行列フィールドを出力するには、行列フィールドに対して [for ループ](https://twig.symfony.com/doc/tags/for.html) を使用します。

```twig
{% set query = entry.myFieldHandle %}
```

That will give you a [Matrix block query](matrix-blocks.md#querying-matrix-blocks), prepped to output all of the enabled blocks for the given field.

To loop through all of the blocks, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

```twig
{% for block in entry.myFieldHandle.all() %}

    {% if block.type == "heading" %}

        <h3>{{ block.heading }}</h3>

    {% elseif block.type == "text" %}

        {{ block.text|markdown }}

    {% elseif block.type == "image" %}

        {% set image = block.image.one() %}
        {% if image %}
            <img src="{{ image.getUrl('thumb') }}" width="{{ image.getWidth('thumb') }}" height="{{ image.getHeight('thumb') }}" alt="{{ image.title }}">
        {% endif %}

    {% elseif block.type == "quote" %}

        <blockquote>
            <p>{{ block.quote }}</p>
            <cite>– {{ block.cite }}</cite>
        </blockquote>

    {% endif %}

{% endfor %}
```

for ループ内に記述されたすべてのコードは、 フィールドに含まれるそれぞれの行列ブロックに対して繰り返されます。 定義済みの変数 `block` にセットされる現在のブロックは、<craft3:craft\elements\MatrixBlock> モデルになります。

次に、4つのブロックタイプ（見出し、テキスト、画像、および、引用）を持つ行列フィールドのテンプレートの実例を示します。 `block.type` （<craft3:craft\elements\MatrixBlock::getType()>）をチェックすることによって、現在のブロックタイプのハンドルを確認できます。

```twig
{% for block in clone(entry.myFieldHandle).type('text').all() %}
    {{ block.text|markdown }}
{% endfor %}
```

::: tip
このコードは [switch](dev/tags.md#switch) タグを利用して、簡略化できます。
:::

If you only want the first block, call [one()](craft3:craft\db\Query::one()) instead of `all()`, and then make sure it returned something:

```twig
{% for block in clone(entry.myFieldHandle).type('text, heading').all() %}
    {% if block.type == "heading" %}
        <h3>{{ block.heading }}</h3>
    {% else %}
        {{ block.text|markdown }}
    {% endif %}
{% endfor %}
```

[length フィルタ](https://twig.symfony.com/doc/filters/length.html)を利用して、ブロックの総数を取得できます。

```twig
{% for block in clone(entry.myFieldHandle).limit(5) %}
```

If you just need to check if are blocks exist (but don’t need to fetch them), you can call [exists()](craft3:craft\db\Query::exists()):

```twig
{{ entry.myFieldHandle|length }}
```

You can set [parameters](matrix-blocks.md#parameters) on the Matrix block query as well. For example, to only fetch blocks of type `text`, set the [type](matrix-blocks.md#type) param:

```twig
{% for block in entry.myFieldHandle.all() %}
    ... {% endfor %}
```

::: tip
It’s always a good idea to clone the Matrix query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### ブロックタイプのフィルタリング

If you have an [entry form](dev/examples/entry-form.md) that needs to contain a Matrix field, you will need to submit your field value in this format:

```
- sortOrder
- blocks
  - <BlockID_1>
    - type
    - fields
      - <FieldHandle_1>
      - <FieldHandle_2>
  - <BlockID_2>
    - type
    - fields
      - ...
```

`sortOrder` should be submitted as an array of all the block IDs you wish to persist (as well as any new block IDs), in the order they should be saved.

If you want all existing blocks to persist in the same order they are currently in, then use this template to define your `sortOrder` array:

```twig
{% if entry is defined %}
    {% for blockId in clone(entry.myFieldHandle).anyStatus().ids() %}
        {{ hiddenInput('fields[myFieldHandle][sortOrder][]', blockId) }}
    {% endfor %}
{% endif %}
```

All of your block data should be nested under `blocks`, indexed by their IDs. Each block must submit its `type` and custom field data nested under a `fields` array.

特定のタイプのブロックだけを出力したい場合、行列フィールドに「type」フィルタを追加します。

```twig
{% if entry is defined %}
    {% for block in entry.myFieldHandle.all() %}
        {# Prefix the block's input names with `fields[myFieldHandle][blocks][<BlockID>]` #}
        {% namespace "fields[myFieldHandle][blocks][#{block.id}]" %}
            {{ hiddenInput('type', block.type) }}
            {% switch block.type %}
                {% case 'text' %}
                    <textarea name="fields[<TextFieldHandle>]">{{ block.<TextFieldHandle>|raw }}</textarea>
                {% case 'image' %}
                    {% set images = block.<AssetsFieldHandle>.all() %}
                    {% if images|length %}
                        <ul>
                            {% for image in block.<AssetsFieldHandle>.all() %}
                                <li>
                                    {{ image.getImg({ width: 100, height: 100 }) }}
                                    {{ hiddenInput('fields[<AssetsFieldHandle>][]', image.id) }}
                                </li>
                            {% endfor %}
                        </ul>
                    {% endif %}
            {% endswitch %}
        {% endnamespace %}
    {% endfor %}
{% endif %}
```

::: tip
Outputting form fields for existing blocks is completely optional. As long as the block IDs are listed in the `sortOrder` array, they will persist even if they are missing from the form data.
:::

To show a “New Block” form, first come up with a temporary ID for the block, prefixed with `new:`. For example, `new:1`, `new:2`, etc.

Append the temporary ID to the `sortOrder` array, and use it when outputting the block’s form inputs.

If you will likely need to include a JavaScript-powered component to the field, which appends new block inputs to the form. New blocks should have an “ID” of `new:X`, where `X` is any number that is unique among all new blocks for the field.

For example, the first new block that is added to the form could have an “ID” of `new:1`, so its `type` input name would end up looking like this:

```html
<input type="hidden" name="fields[myFieldHandle][new:1][type]" value="text" />
```

Then define the form inputs for any additional blocks that should be appended to the input.

```twig
{{ hiddenInput('fields[myFieldHandle][sortOrder][]', 'new:1') }}

{# Prefix the block's input names with `fields[myFieldHandle][blocks][new:1]` #}
{% namespace "fields[myFieldHandle][blocks][new:1]" %}
    {{ hiddenInput('type', 'text') }}
    <textarea name="fields[<TextFieldHandle>]"></textarea>
{% endnamespace %}
```

## 関連項目

- [エレメントクエリ](matrix-blocks.md#querying-matrix-blocks)
- [Element Queries](element-queries.md)
- <craft3:craft\elements\MatrixBlock>
