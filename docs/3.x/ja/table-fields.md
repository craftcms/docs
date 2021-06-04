# テーブルフィールド

テーブルフィールドでは、複数行のコンテンツを作成できるカスタマイズ可能なテーブルを提供されます。

## 設定

テーブルフィールドの設定は、次の通りです。

- **テーブルの欄** – テーブルフィールドで利用可能な列を定義します。

    それぞれの列には、次のプロパティがあります。

    - **Column Heading** – The name that will appear in the head of the table.
    - **Handle** – How you’ll refer to this column from your templates.
    - **Width** – The width for this column specified in either pixels or a percentage.
    - **Type** – The type of content allowed in the column. 一行テキスト、複数行のテキスト、数字、チェックボックス、日付、時間、LightSwitch、色から選択します。

- **デフォルトの変数** – フィールドの新しいインスタンスを作成したときにセットされる行および列のデフォルト値を定義します。

## フィールド

テーブルフィールドでは、フィールド設定で定義されたテーブルが表示されます。 並び替えや削除、新しい行の追加、値の変更ができます。

## Development

テンプレート内でテーブルフィールドを呼び出すと、行の配列を返します。 それぞれの行は、その行の列ごとの値を保持するサブ配列です。

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
:::
