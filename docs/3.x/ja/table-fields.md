# テーブルフィールド

テーブルフィールドでは、複数行のコンテンツを作成できるカスタマイズ可能なテーブルを提供されます。

## 設定

テーブルフィールドの設定は、次の通りです。

- **テーブルの欄** – テーブルフィールドで利用可能な列を定義します。

    それぞれの列には、次のプロパティがあります。

    - *列の見出し* – テーブルのヘッダに表示する名前
    - *ハンドル* – テンプレートから、この列を参照する方法
    - *幅* – ピクセルまたはパーセントで指定された、この列の幅
    - *タイプ* – 列に許可されるコンテンツのタイプ。 Choose from Single-line text, Multi-line text, Number, Checkbox, Dropdown, Date, Time, Lightswitch, and Color.

- **デフォルトの変数** – フィールドの新しいインスタンスを作成したときにセットされる行および列のデフォルト値を定義します。

## フィールド

テーブルフィールドでは、フィールド設定で定義されたテーブルが表示されます。 並び替えや削除、新しい行の追加、値の変更ができます。

## テンプレート記法

Calling a Table field in your templates and GraphQL queries will return an array of the rows. それぞれの行は、その行の列ごとの値を保持するサブ配列です。

::: code
```twig
{% if entry.myFieldHandle|length %}
<h3>Whiskeys</h3>
<ul>
  {% for row in entry.myFieldHandle %}
    <li>{{ row.whiskey }} - {{ row.description }} - {{ row.proof }}</li>
  {% endfor %}
</ul>
{% endif %}
```
```php
if (count($entry->myFieldHandle)) {
    // Whiskeys:
    foreach ($entry->myFieldHandle as $row) {
        // $row['whiskey']
        // $row['description']
        // $row['proof']
    }
}
```
```graphql
{
  # (...) query for relevant entry
  myFieldHandle {
    whiskey
    description
    proof
  }
}
```
:::

::: tip
In each example above, the custom column handle could also be accessed by a key named `'col*'`, where `*` is the order in which it was saved. Example:

- `whiskey` → `col1`
- `description` → `col2`
- `proof` → `col3`
:::

### Mutating Table Data

You can mutate table data by providing an array of rows, each representing its column’s data with a `'col*'` key:

```graphql
mutation saveEntry(
  $title: String,
  $slug: String,
  $authorId: ID,
  $tableRows: [myFieldHandle_TableRowInput],
) {
  save_cocktails_cocktails_Entry(
    title: $title,
    slug: $slug,
    authorId: $authorId,
    myFieldHandle: $tableRows
  ) {
    title
    slug
    authorId
    dateCreated @formatDateTime (format: "Y-m-d")
    myFieldHandle {
      whiskey
      description
      proof
    }
  }
}

# query variables:
{
  "title": "Gin and Tonic",
  "slug": "gin-tonic",
  "authorId": 1,
  "myFieldHandle": [
    {
      "col1": "High West Double Rye",
      "col2": "Blend of straight and rye whiskeys.",
      "col3": 92,
    },
    {
      "col1": "Blanton’s Single Barrel",
      "col2": "Has been called liquid gold.",
      "col3": 92,
    },
  ]
}

```