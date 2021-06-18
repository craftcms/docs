# カテゴリフィールド

カテゴリフィールドでは、[カテゴリ](categories.md)をたのエレメントに関連付けることができます。

## 設定

カテゴリフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのカテゴリグループ（または、他のカテゴリインデックスソース）からカテゴリを関連付けられるか。
- **ブランチ制限** – フィールドと一度に関連付けできるカテゴリ数の上限。 （デフォルトは無制限です）

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

- **選択ラベル** – フィールドの選択ボタンのラベルに使用されます

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。 （「高度」のトグルボタンで表示されます）

- **特定のサイトから カテゴリ を関連付けますか?** – 特定のサイトのカテゴリとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたカテゴリは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたカテゴリの独自のセットを取得するかどうか。

## フィールド

カテゴリフィールドには、現在関連付けられているすべてのカテゴリのリストと、新しいカテゴリを追加するためのボタンがあります。

「カテゴリーを追加」ボタンをクリックすると、すでに追加されているカテゴリの検索や選択ができるモーダルウィンドウが表示されます。 このモーダルから新しいカテゴリを作るには、「新しいカテゴリー」ボタンをクリックします。

ネストされたカテゴリを選択すると、そのカテゴリに至るすべての先祖カテゴリも自動的に関連付けられます。 同様に、メインフィールドの入力からカテゴリを削除すると、そのすべての子孫カテゴリも削除されます。

### インラインのカテゴリ編集

関連付けられたカテゴリをダブルクリックすると、カテゴリのタイトルやカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### カテゴリフィールドによるエレメントの照会

カテゴリフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、カテゴリフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                                                                   | 取得するエレメント                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------- |
| `':empty:'`                                                         | 関連付けられたカテゴリを持たない。                                    |
| `':notempty:'`                                                      | 少なくとも1つの関連付けられたカテゴリを持つ。                              |
| `100`                                                               | ID が 100 のカテゴリが関連付けられている。                            |
| `[100, 200]`                                                        | ID が 100 または 200 のカテゴリが関連付けられている。                    |
| `[':empty:', 100, 200]`                                             | ID が 100 と 200 のカテゴリが関連付けられている。                      |
| `['and', 100, 200]`                                                 | カテゴリに関連付けられている。                                      |
| [CategoryQuery](craft3:craft\elements\db\CategoryQuery) オブジェクト   | 結果のカテゴリのいずれかに関連付けられている。                              |
| a [CategoryQuery](craft3:craft\elements\db\CategoryQuery) object | that are related to any of the resulting categories. |

テンプレート内でカテゴリフィールドのエレメントを取得する場合、カテゴリフィールドのハンドルを利用して、関連付けられたカテゴリにアクセスできます。
```twig
{# Fetch entries with a related category #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```
```php
{% set relatedCategories = entry.myFieldHandle %}
```
:::

### カテゴリフィールドデータの操作

関連付けられたすべてのカテゴリをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

または、[nav](dev/tags.md#nav) タグで階層リストとして表示することもできます。
```twig
{% set relatedCategories = entry.myFieldHandle
    .leaves()
    .all() %}
```
```php
$query = $entry->myFieldHandle; 
```
:::

（取得する必要はなく）いずれかの関連付けられたカテゴリがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

[Category](craft3:craft\elements\Category) オブジェクト

::: code
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
```php
$relatedCategories = $entry->myFieldHandle->all();
if (count($relatedCategories)) {
    foreach ($relatedCategories as $rel) {
        // do something with $rel->url and $rel->title
    }
}
```
:::

Or you can show them as a hierarchical list with the [nav](dev/tags.md#nav) tag:

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

If you only want the first related category, call [one()](craft3:craft\db\Query::one()) instead and make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.title }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // do something with $rel->url and $rel->title
}
```
:::

If you need to check for related categories without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related categories!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // do something with related categories
}
```
:::

カテゴリクエリで[パラメータ](categories.md#parameters)をセットすることもできます。 例えば、“leaves”（子を持たないカテゴリ）だけを取得するには、[leaves](categories.md#leaves) パラメータをセットします。

::: code
```twig
{% set relatedCategories = clone(entry.myFieldHandle)
    .leaves()
    .all() %}
```
```php
$myField = clone $entry->myFieldHandle;
$relatedAssets = $myField
    ->leaves()
    ->all();
```
:::

::: tip
It’s always a good idea to clone the category query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Categories Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Categories field, you will need to submit your field value as a list of category IDs.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible category options #}
{% set possibleCategories = craft.categories()
    .group('food')
    .all() %}

{# Get the currently related category IDs #}
{% set relatedCategoryIds = entry is defined
    ? entry.myFieldHandle.ids()
    : [] %}

<ul>
    {% nav possibleCategory in possibleCategories %}
        <li>
            <label>
                {{ input(
                    'checkbox',
                    'fields[myFieldHandle][]',
                    possibleCategory.id,
                    { checked: possibleCategory.id in relatedCategoryIds }
                ) }}
                {{ possibleCategory.title }}
            </label>
            {% ifchildren %}
                <ul>
                    {% children %}
                </ul>
            {% endifchildren %}
        </li>
    {% endnav %}
</ul>
```

::: tip
Note that it’s not possible to customize the order that categories will be related in, and if a nested category is related, so will each of its ancestors.
:::

## 関連項目

* [カテゴリクエリ](categories.md#querying-categories)
* <craft3:craft\elements\Category>
* [リレーション](relations.md)
