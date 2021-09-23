# ユーザーフィールド

ユーザーフィールドでは、[ユーザー](users.md)を他のエレメントに関連付けることができます。

## 設定

ユーザーフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのユーザーグループ（または、他のユーザーインデックスソース）からユーザーを関連付けられるか。
- **リミット** – フィールドと一度に関連付けできるユーザー数の上限（デフォルトは無制限です） (Default is no limit.) （デフォルトは無制限です）
- **選択ラベル** – フィールドの選択ボタンのラベルに使用されます

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。 （「高度」のトグルボタンで表示されます）

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたユーザーの独自のセットを取得するかどうか。

## フィールド

ユーザーフィールドには、現在関連付けられているすべてのユーザーのリストと、新しいユーザーを追加するためのボタンがあります。

「ユーザーを追加」ボタンをクリックすると、すでに追加されているユーザーの検索や選択ができるモーダルウィンドウが表示されます。

### インラインのユーザー編集

関連付けられたユーザーをダブルクリックすると、ユーザーのカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### ユーザーフィールドによるエレメントの照会

ユーザーフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、ユーザーフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                                                            | 取得するエレメント                                       |
| ------------------------------------------------------------ | ----------------------------------------------- |
| `':empty:'`                                                  | 関連付けられたユーザーを持たない。                               |
| `':notempty:'`                                               | 少なくとも1つの関連付けられたユーザーを持つ。                         |
| `100`                                                        | ID が 100 のユーザーが関連付けられている。                       |
| `[100, 200]`                                                 | ID が 100 または 200 のユーザーが関連付けられている。               |
| `[':empty:', 100, 200]`                                      | ID が 100 と 200 のユーザーが関連付けられている。                 |
| `['and', 100, 200]`                                          | ユーザーに関連付けられている。                                 |
| [UserQuery](craft3:craft\elements\db\UserQuery) オブジェクト    | 結果のユーザーのいずれかに関連付けられている。                         |
| an [UserQuery](craft3:craft\elements\db\UserQuery) object | that are related to any of the resulting users. |

テンプレート内でユーザーフィールドのエレメントを取得する場合、ユーザーフィールドのハンドルを利用して、関連付けられたユーザーにアクセスできます。
```twig
{# Fetch entries with a related user #}
{% set entries = craft.entries()
  .myFieldHandle(':notempty:')
  .all() %}
```
```php
// Fetch entries with a related user
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### ユーザーフィールドデータの操作

関連付けられたすべてのユーザーをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

関連付けられた最初のユーザーだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you a [user query](users.md#querying-users), prepped to output all the related users for the given field.

To loop through all the related users, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedUsers = entry.myFieldHandle.all() %}
{% if relatedUsers|length %}
  <ul>
    {% for rel in relatedUsers %}
      <li><a href="{{ url('profiles/'~rel.username) }}">{{ rel.name }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedUsers = $entry->myFieldHandle->all();
if (count($relatedUsers)) {
    foreach ($relatedUsers as $rel) {
        // \craft\helpers\UrlHelper::url('profiles/' . $rel->username)
        // $rel->name
    }
}
```
:::

[User](craft3:craft\elements\User) オブジェクト

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
  <p><a href="{{ url('profiles/'~rel.username) }}">{{ rel.name }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // \craft\helpers\UrlHelper::url('profiles/' . $rel->username)
    // $rel->name
}
```
:::

If you need to check for related users without fetching them you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>There are related users!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are related users!
}
```
:::

ユーザークエリで[パラメータ](users.md#parameters)をセットすることもできます。 例えば、`authors` グループに含まれるユーザーだけを取得するには、[groupId](users.md#groupid) パラメータをセットします。

::: code
```twig
{% set relatedUsers = clone(entry.myFieldHandle)
    .group('authors')
    .all() %}
```
```php
$relatedUsers = (clone $entry->myFieldHandle)
    ->group('authors')
    ->all();
```
:::

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用してユーザークエリのクローンを作成するのは、とても良いアイデアです。 それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。 :::
:::

### Saving Users Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Users field, you will need to submit your field value as a list of user IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible user options #}
{% set possibleUsers = craft.users()
  .group('authors')
  .orderBy('username ASC')
  .all() %}

{# Get the currently related user IDs #}
{% set relatedUserIds = entry is defined
  ? entry.myFieldHandle.ids()
  : [] %}

<ul>
  {% for possibleUser in possibleUsers %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myFieldHandle][]',
          possibleUser.id,
          { checked: possibleUser.id in relatedUserIds }
        ) }}
        {{ possibleUser.friendlyName }}
      </label>
    </li>
  {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related entries.

## 関連項目

- [ユーザークエリ](users.md#querying-users)
- <craft3:craft\elements\User>
- [リレーション](relations.md)
