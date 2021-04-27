# 行列フィールド

行列フィールドでは、1つのフィールド内に複数のコンテンツブロックを作成できます。

## 設定

行列フィールドの設定は、次の通りです。

- **構成** – ここでは、行列フィールドでどのようなブロックタイプが利用可能か、それらのブロックタイプがどのようなサブフィールドを持つ必要があるかを設定します。
- **Min Blocks** – The minimum number of blocks that can be created within the field. (Default is no limit.)
- **Max Blocks** – The maximum number of blocks that can be created within the field. (Default is no limit.)

## フィールド

新しいエントリでは、行列フィールドにはボタンのグループが表示されます。 フィールド設定で作成したブロックタイプごとに1つのボタンが表示されます。

それらのボタンの1つをクリックすると、新しいブロックが作成されます。 ブロックタイプの名前はブロックのタイトルバーに表示され、それぞれのブロックタイプのフィールドにはブロックの本体が存在しているでしょう。

You can add as many blocks to your Matrix field as you’d like—or at least as many as the field’s Min Blocks and Max Blocks settings allow.

各ブロックは設定メニューを持ち、そのブロックに対して追加でできることを開示します。

If multiple blocks are selected, the Collapse/Expand, Disable/Enable, and Delete options will apply to each of those selected.

You can collapse Matrix blocks by choosing the **Collapse** menu option or by double-clicking on a block’s title bar. When a block is collapsed, its title bar will show a preview of its content so you can still identify which block it is.

ブロックは、そのブロックのタイトルバーの最後にある「移動」アイコンをドラックして並び替えることもできます。 If multiple blocks are selected, all the selected blocks will be going along for the ride.

## Development

### 行列フィールドによるエレメントの照会

行列フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、行列フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値              | 取得するエレメント          |
| -------------- | ------------------ |
| `':empty:'`    | 行列ブロックを持たない。       |
| `':notempty:'` | 少なくとも1つの行列ブロックを持つ。 |

::: code
```twig
{# Fetch entries with a Matrix block #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```
```php
// Fetch entries with a Matrix block
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### 行列フィールドデータの操作

If you have an element with a Matrix field in your template, you can access its blocks using your Matrix field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you a [Matrix block query](matrix-blocks.md#querying-matrix-blocks), prepped to output all the enabled blocks for the given field.

To loop through all the blocks, call [all()](craft3:craft\db\Query::all()) and loop over the results:

::: code
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
```php
$blocks = $entry->myFieldHandle->all();
if (count($blocks)) {
    foreach ($blocks as $block) {
        // ...
    }
}
```
:::

All the code you put within the for-loop will be repeated for each Matrix block in the field. The current block will get set to that `block` variable we’ve defined, and it will be a <craft3:craft\elements\MatrixBlock> model.

Here’s an example of what the template might look like for a Matrix field with four block types (Heading, Text, Image, and Quote). We can determine the current block type’s handle by checking `block.type` (<craft3:craft\elements\MatrixBlock::getType()>).

```twig
{% for block in entry.myFieldHandle.all() %}
    {% if block.type == "heading" %}
        <h3>{{ block.heading }}</h3>
    {% elseif block.type == "text" %}
        {{ block.text|markdown }}
    {% elseif block.type == "image" %}
        {% set image = block.image.one() %}
        {% if image %}
            <img src="{{ image.getUrl('thumb') }}" 
                width="{{ image.getWidth('thumb') }}" 
                height="{{ image.getHeight('thumb') }}" 
                alt="{{ image.title }}"
            >
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
This code can be simplified using the [switch](dev/tags.md#switch) tag.
:::

If you only want the first block, call [one()](craft3:craft\db\Query::one()) instead of `all()`, and make sure it returned something:

::: code
```twig
{% set block = entry.myFieldHandle.one() %}
{% if block %}
    <!-- ... -->
{% endif %}
```
```php
$block = $entry->myFieldHandle->one();
if ($block) {
    // ...
}
```
:::

If you only want to know the total number of blocks, call [count()](craft3:craft\db\Query::count()).

::: code
```twig
{% set total = entry.myFieldHandle.count() %}
<p>Total blocks: <strong>{{ total }}</strong></p>
```
```php
$total = $entry->myFieldHandle->count();
// Total blocks: $total
```
:::

If you just need to check if blocks exist (but don’t need to fetch them), you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are blocks!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are blocks!
}
```
:::

You can set [parameters](matrix-blocks.md#parameters) on the Matrix block query as well. For example, to only fetch blocks of type `text`, set the [type](matrix-blocks.md#type) param:

::: code
```twig
{% set blocks = clone(entry.myFieldHandle)
    .type('text')
    .all() %}
```
```php
$blocks = (clone $entry->myFieldHandle)
    ->type('text')
    ->all();
```
:::

::: tip
It’s always a good idea to clone the Matrix query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Matrix Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Matrix field, you will need to submit your field value in this format:

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

Here’s how you can output form fields for existing blocks, for a Matrix field with two block types (`text` and `image`):

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

You’ll probably want to include a JavaScript-powered component to the field that appends new block inputs to the form. New blocks should have an “ID” of `new:X`, where `X` is any number that is unique among all new blocks for the field.

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
