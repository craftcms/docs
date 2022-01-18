# カテゴリフィールド

カテゴリフィールドでは、[カテゴリ](categories.md)を他のエレメントに関連付けることができます。

## 設定

カテゴリフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのカテゴリグループ（または、他のカテゴリインデックスソース）からカテゴリを関連付けられるか。
- **ブランチ制限** – フィールドと一度に関連付けできるカテゴリ数の上限。（デフォルトは無制限です）

   例えば、次のカテゴリグループがあるとします。

   ```
   Food
   ├── Fruit
   │   ├── Apples
   │   ├── Bananas
   │   └── Oranges
   └── Vegetables
       ├── Brussels sprouts
       ├── Carrots
       └── Celery
   ```

   そして、ブランチ制限が `1` にセットされていれば、Fruit、Vegetables、または、その子孫の1つだけを関連付けられます。

- **選択ラベル** – フィールドの選択ボタンのラベルに利用されます。

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **特定のサイトから カテゴリ を関連付けますか？** – 特定のサイトのカテゴリとの関連付けのみを許可するかどうか。

   有効にすると、サイトを選択するための新しい設定が表示されます。

   無効にすると、関連付けられたカテゴリは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたカテゴリの独自のセットを取得するかどうか。

## フィールド

カテゴリフィールドには、現在関連付けられているすべてのカテゴリのリストと、新しいカテゴリを追加するためのボタンがあります。

「カテゴリーを追加」ボタンをクリックすると、すでに追加されているカテゴリの検索や選択ができるモーダルウィンドウが表示されます。このモーダルから新しいカテゴリを作るには、「新しいカテゴリー」ボタンをクリックします。

ネストされたカテゴリを選択すると、そのカテゴリに至るすべての先祖カテゴリも自動的に関連付けられます。同様に、メインフィールドの入力からカテゴリを削除すると、そのすべての子孫カテゴリも削除されます。

### インラインのカテゴリ編集

関連付けられたカテゴリをダブルクリックすると、カテゴリのタイトルやカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### カテゴリフィールドによるエレメントの照会

カテゴリフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、カテゴリフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `':empty:'` | 関連付けられたカテゴリを持たない。
| `':notempty:'` | 少なくとも1つの関連付けられたカテゴリを持つ。
| `100` | ID が 100 のカテゴリが関連付けられている。
| `[100, 200]` | ID が 100 または 200 のカテゴリが関連付けられている。
| `['and', 100, 200]` | ID が 100 と 200 のカテゴリが関連付けられている。
| [Category](craft3:craft\elements\Category) オブジェクト | カテゴリに関連付けられている。
| [CategoryQuery](craft3:craft\elements\db\CategoryQuery) オブジェクト | 結果のカテゴリのいずれかに関連付けられている。

```twig
{# Fetch entries with a related category #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### カテゴリフィールドデータの操作

テンプレート内でカテゴリフィールドのエレメントを取得する場合、カテゴリフィールドのハンドルを利用して、関連付けられたカテゴリにアクセスできます。

```twig
{% set relatedCategories = entry.myFieldHandle %}
```

これは、所定のフィールドで関連付けられたすべてのカテゴリを出力するよう準備された[カテゴリクエリ](categories.md#querying-categories)を提供します。

関連付けられたすべてのカテゴリをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

```twig
{% set relatedCategories = entry.myFieldHandle.all() %}
{% if relatedCategories|length %}
    <ul>
        {% for rel in relatedCategories %}
            <li><a href="{{ rel.url }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```

または、[nav](dev/tags.md#nav) タグで階層リストとして表示することもできます。

```twig
{% set relatedCategories = entry.myFieldHandle.all() %}
{% if relatedCategories|length %}
    <ul>
        {% nav rel in relatedCategories %}
            <li>
                <a href="{{ rel.url }}">{{ rel.title }}</a>
                {% ifchildren %}
                    <ul>
                        {% children %}
                    </ul>
                {% endifchildren %}
            </li>
        {% endnav %}
    </ul>
{% endif %}
```

関連付けられた最初のカテゴリだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.title }}</a></p>
{% endif %}
```

（取得する必要はなく）いずれかの関連付けられたカテゴリがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related categories!</p>
{% endif %}
```

カテゴリクエリで[パラメータ](categories.md#parameters)をセットすることもできます。例えば、“leaves”（子を持たないカテゴリ）だけを取得するには、[leaves](categories.md#leaves) パラメータをセットします。

```twig
{% set relatedCategories = entry.myFieldHandle
    .leaves()
    .all() %}
```

## 関連項目

* [カテゴリクエリ](categories.md#querying-categories)
* <craft3:craft\elements\Category>
* [Relations](relations.md)
