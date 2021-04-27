# タグフィールド

タグフィールドでは、[タグ](tags.md)を他のエレメントに関連付けることができます。

## 設定

タグフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのタググループからタグを関連付けられるか。
- **選択ラベル** – タグの検索と入力を行うフィールドのラベルに使用されます

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。 （「高度」のトグルボタンで表示されます）

- **特定のサイトから タグ を関連付けますか?** – 特定のサイトのタグとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたタグは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたタグの独自のセットを取得するかどうか。

## フィールド

Tags fields list all the currently-related tags with a text input to add new ones.

テキスト入力欄に入力すると、タグフィールドはそのタググループに属する既存のタグを（ソースの設定ごとに）検索し、入力欄の下のメニューにタグのサジェストを表示します。 完全に一致するものが見つからない場合、メニューの最初のオプションから入力した値を名前にもつ新しいタグを作成できます。

::: tip
デフォルトでは、名前があまりにも似ている複数のタグを作成できません。 コンフィグ設定の <config3:allowSimilarTags> config setting.
:::

### インラインのタグ編集

関連付けられたタグをダブルクリックすると、タグのタイトルやカスタムフィールドを編集できる HUD を表示します。

## Development

### タグフィールドによるエレメントの照会

タグフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、タグフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                                                          | 取得するエレメント                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `':empty:'`                                                | 関連付けられたタグを持たない。                                                     |
| `':notempty:'`                                             | 少なくとも1つの関連付けられたタグを持つ。                                               |
| `100`                                                      | that are related to the tag with an ID of 100.                      |
| `[100, 200]`                                               | that are related to a tag with an ID of 100 or 200.                 |
| `[':empty:', 100, 200]`                                    | with no related tags, or related to a tag with an ID of 100 or 200. |
| `['and', 100, 200]`                                        | that are related to the tags with IDs of 100 and 200.               |
| an [Tag](craft3:craft\elements\Tag) object               | that are related to the tag.                                        |
| an [TagQuery](craft3:craft\elements\db\TagQuery) object | that are related to any of the resulting tags.                      |

::: code
```twig
{# Fetch entries with a related tag #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```
```php
// Fetch entries with a related tag
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### タグフィールドデータの操作

If you have an element with a Tags field in your template, you can access its related tags using your Tags field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you a [tag query](tags.md#querying-tags), prepped to output all the related tags for the given field.

To loop through all the related tags, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedTags = entry.myFieldHandle.all() %}
{% if relatedTags|length %}
    <ul>
        {% for rel in relatedTags %}
            <li><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```
```php
$relatedTags = $entry->myFieldHandle->all();
if (count($relatedTags)) {
    foreach ($relatedTags as $rel) {
        // \craft\helpers\UrlHelper::url('tags/' . $rel->slug)
        // $rel->title
    }
}
{% endif %}
```
:::

If you only want the first related tag, call [one()](craft3:craft\db\Query::one()) and make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // \craft\helpers\UrlHelper::url('tags' . $rel->slug)
    // $rel->title
}
```
:::

If you need to check for any related tags without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related tags!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are related tags!
}
```
:::

You can set [parameters](tags.md#parameters) on the tag query as well.

::: code
```twig
{% set relatedTags = clone(entry.myFieldHandle)
    .group('blogEntryTags')
    .all() %}
```
```php
$relatedTags = (clone $entry->myFieldHandle)
    ->group('blogEntryTags')
    ->all();
```
:::

::: tip
It’s always a good idea to clone the tag query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Tags Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Tags field, you will need to submit your field value as a list of tag IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible tag options #}
{% set possibleTags = craft.entries()
    .group('blogEntryTags')
    .orderBy('title ASC')
    .all() %}

{# Get the currently related tag IDs #}
{% set relatedTagIds = entry is defined
    ? entry.myFieldHandle.ids()
    : [] %}

<ul>
    {% for possibleTag in possibleTags %}
        <li>
            <label>
                {{ input(
                    'checkbox',
                    'fields[myFieldHandle][]',
                    possibleTag.id,
                    { checked: possibleTag.id in relatedTagIds }
                ) }}
                {{ possibleTag.title }}
            </label>
        </li>
    {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related tags.

## 関連項目

* [タグクエリ](tags.md#querying-tags)
* <craft3:craft\elements\Tag>
* [リレーション](relations.md)
