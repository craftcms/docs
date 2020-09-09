# 行列フィールド

行列フィールドでは、1つのフィールド内に複数のコンテンツブロックを作成できます。

## 設定

行列フィールドの設定は、次の通りです。

- **構成** – ここでは、行列フィールドでどのようなブロックタイプが利用可能か、それらのブロックタイプがどのようなサブフィールドを持つ必要があるかを設定します。
- **最大ブロック数** – フィールドに作成できるブロック数の上限。（デフォルトは無制限です）

## フィールド

新しいエントリでは、行列フィールドにはボタンのグループが表示されます。フィールド設定で作成したブロックタイプごとに1つのボタンが表示されます。

それらのボタンの1つをクリックすると、新しいブロックが作成されます。ブロックタイプの名前はブロックのタイトルバーに表示され、それぞれのブロックタイプのフィールドにはブロックの本体が存在しているでしょう。

あなたは好きなだけ（または、最大ブロック数の設定で許可されている範囲内で）、行列フィールドへブロックを追加できます。

各ブロックは設定メニューを持ち、そのブロックに対して追加でできることを開示します。

複数のブロックが選択されている場合、選択されたすべてのブロックに対して「折りたたむ / 展開する」「無効 / 有効」および「削除」オプションが適用されます。

メニューオプションの「折りたたむ」 をクリックするか、ブロックのタイトルバーをダブルクリックすることで、行列ブロックを折りたたむことができます。ブロックが折りたたまれている場合、タイトルバーはコンテンツのプレビューを表示するため、それがどんなブロックかを識別できます。

ブロックは、そのブロックのタイトルバーの最後にある「移動」アイコンをドラックして並び替えることもできます。複数のブロックが選択されている場合、選択されたすべてのブロックが一緒に移動します。

## テンプレート記法

### 行列フィールドによるエレメントの照会

行列フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、行列フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント |
| -------------- | ------------------------------------ |
| `':empty:'` | 行列ブロックを持たない。 |
| `':notempty:'` | 少なくとも1つの行列ブロックを持つ。 |

```twig
{# Fetch entries with a Matrix block #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### 行列フィールドデータの操作

テンプレート内で行列フィールドのエレメントを取得する場合、行列フィールドのハンドルを利用して、そのブロックにアクセスできます。

```twig
{% set query = entry.myFieldHandle %}
```

これは、所定のフィールドで利用可能なすべてのブロックを出力するよう準備された[行列ブロッククエリ](matrix-blocks.md#querying-matrix-blocks)を提供します。

関連付けられたすべてのブロックをループするには、[all()](<craft3:craft\db\Query::all()>) を呼び出して、結果をループ処理します。

```twig
{% set blocks = entry.myFieldHandle.all() %}
{% if blocks|length %}
    <ul>
        {% for block in blocks %}
            <!-- ... -->
        {% endfor %}
    </ul>
{% endif %}
```

for ループ内に記述されたすべてのコードは、 フィールドに含まれるそれぞれの行列ブロックに対して繰り返されます。定義済みの変数 `block` にセットされる現在のブロックは、<craft3:craft\elements\MatrixBlock> モデルになります。

次に、4つのブロックタイプ（見出し、テキスト、画像、および、引用）を持つ行列フィールドのテンプレートの実例を示します。`block.type`（<craft3:craft\elements\MatrixBlock::getType()>）をチェックすることによって、現在のブロックタイプのハンドルを確認できます。

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

::: tip
このコードは [switch](dev/tags.md#switch) タグを利用して、簡略化できます。
:::

最初のブロックだけが欲しい場合、`all()` の代わりに [one()](<craft3:craft\db\Query::one()>) を呼び出して、何かが返されていることを確認します。

```twig
{% set block = entry.myFieldHandle.one() %}
{% if block %}
    <!-- ... -->
{% endif %}
```

ブロックの総数だけを知りたい場合、[count()](<craft3:craft\db\Query::count()>) を呼び出します。

```twig
{% set total = entry.myFieldHandle.count() %}
<p>Total blocks: <strong>{{ total }}</strong></p>
```

（取得する必要はなく）ブロックがあるかを確認したい場合、[exists()](<craft3:craft\db\Query::exists()>) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are blocks!</p>
{% endif %}
```

行列ブロッククエリで[パラメータ](matrix-blocks.md#parameters)をセットすることもできます。例えば、`text` タイプのブロックだけを取得するには、[type](matrix-blocks.md#type) パラメータをセットしてください。

```twig
{% set blocks = clone(entry.myFieldHandle)
    .type('text')
    .all() %}
```

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用して行列クエリのクローンを作成するのは、とても良いアイデアです。それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。
:::

### 投稿フォームで行列フィールドを保存

行列フィールドを含む必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、次のフォーマットでフィールド値を送信する必要があります。

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

`sortOrder` は（新しいブロック ID を含む）維持したいすべてのブロック ID の配列を保存したい順序で送信する必要があります。

すべての既存ブロックを現在と同じ順序で維持したい場合、このテンプレートを利用して `sortOrder` 配列を定義します。

```twig
{% if entry is defined %}
    {% for blockId in clone(entry.myFieldHandle).anyStatus().ids() %}
        {{ hiddenInput('fields[myFieldHandle][sortOrder][]', blockId) }}
    {% endfor %}
{% endif %}
```

すべてのブロックデータは、ID でインデックス付けされた `blocks` 内にネストする必要があります。それぞれのブロックは `type` と  `fields` 配列内にネストされたカスタムフィールドデータを送信しなければなりません。

ここでは、2つのブロックタイプ（`text` と `image`）を持つ行列フィールドで、既存ブロックのフォーム項目を出力する方法を示します。

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
既存ブロック向けのフォーム項目の出力は、完全なオプションです。`sortOrder` 配列にブロック ID がリストされている限り、フォームデータから欠落していてもそれらは維持されます。
:::

「新しいブロック」フォームを表示するには、まず接頭辞 `new:` の一時的な ID を考えます。例えば、`new:1`、`new:2` などです。

`sortOrder` 配列に一時的な ID を追加し、ブロックのフォーム入力欄を出力する際に使用します。

新しいブロック項目をフォームに追加するために、フィールドへ JavaScript によるコンポーネントを含める必要があるかもしれません。新しいブロックは `new:X` という「ID」で、`X` はフィールド上のすべての新しいブロックでユニークな数字でなければなりません。

例えば、フォームに追加された最初の新しいブロックは `new:1` という「ID」を持つことができるため、その 入力項目 `type` の name は次のようになります。

```html
<input type="hidden" name="fields[myFieldHandle][new:1][type]" value="text" />
```

次に、入力を加えたい追加ブロックのフォーム入力欄を定義します。

```twig
{{ hiddenInput('fields[myFieldHandle][sortOrder][]', 'new:1') }}

{# Prefix the block's input names with `fields[myFieldHandle][blocks][new:1]` #}
{% namespace "fields[myFieldHandle][blocks][new:1]" %}
    {{ hiddenInput('type', 'text') }}
    <textarea name="fields[<TextFieldHandle>]"></textarea>
{% endnamespace %}
```

## 関連項目

- [行列ブロッククエリ](matrix-blocks.md#querying-matrix-blocks)
- [Element Queries](element-queries.md)
- <craft3:craft\elements\MatrixBlock>
