# ユーザーフィールド

ユーザーフィールドでは、[ユーザー](users.md)を他のエレメントに関連付けることができます。

## 設定

ユーザーフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのユーザーグループ（または、他のユーザーインデックスソース）からユーザーを関連付けられるか。
- **リミット** – フィールドと一度に関連付けできるユーザー数の上限（デフォルトは無制限です） (Default is no limit.)
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

ユーザーフィールドを持つ[エレメントを照会](dev/element-queries/README.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、ユーザーフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値                                                            | 取得するエレメント                                              |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| `':empty:'`                                                  | 関連付けられたユーザーを持たない。                                      |
| `':notempty:'`                                               | 少なくとも1つの関連付けられたユーザーを持つ。                                |
| `100`                                                        | that are related to the user with an ID of 100.        |
| `[100, 200]`                                                 | that are related to a user with an ID of 100 or 200.   |
| `['and', 100, 200]`                                          | that are related to the users with IDs of 100 and 200. |
| an [User](craft3:craft\elements\User) object               | that are related to the user.                          |
| an [UserQuery](craft3:craft\elements\db\UserQuery) object | that are related to any of the resulting users.        |

```twig
{# Fetch entries with a related user #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### ユーザーフィールドデータの操作

テンプレート内でユーザーフィールドのエレメントを取得する場合、ユーザーフィールドのハンドルを利用して、関連付けられたユーザーにアクセスできます。

```twig
{% set query = entry.myFieldHandle %}
```

これは、所定のフィールドで関連付けられたすべてのユーザーを出力するよう準備された[ユーザークエリ](dev/element-queries/user-queries.md)を提供します。

関連付けられたすべてのユーザーをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

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

関連付けられた最初のユーザーだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ url('profiles/'~rel.username) }}">{{ rel.name }}</a></p>
{% endif %}
```

（取得する必要はなく）いずれかの関連付けられたユーザーがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related users!</p>
{% endif %}
```

ユーザークエリで[パラメータ](dev/element-queries/user-queries.md#parameters)をセットすることもできます。 例えば、`authors` グループに含まれるユーザーだけを取得するには、[groupId](dev/element-queries/user-queries.md#groupid) パラメータをセットします。

```twig
{% set relatedUsers = clone(entry.myFieldHandle)
    .group('authors')
    .all() %}
```

::: tip
It’s always a good idea to clone the user query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

## 関連項目

* [ユーザークエリ](users.md#querying-users)
* <craft3:craft\elements\User>
* [リレーション](relations.md)
