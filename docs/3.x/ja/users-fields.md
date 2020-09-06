# ユーザーフィールド

ユーザーフィールドでは、[ユーザー](users.md)を他のエレメントに関連付けることができます。

## 設定

ユーザーフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのユーザーグループ（または、他のユーザーインデックスソース）からユーザーを関連付けられるか。
- **リミット** – フィールドと一度に関連付けできるユーザー数の上限。（デフォルトは無制限です）
- **選択ラベル** – フィールドの選択ボタンのラベルに利用されます。

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたユーザーの独自のセットを取得するかどうか。

## フィールド

ユーザーフィールドには、現在関連付けられているすべてのユーザーのリストと、新しいユーザーを追加するためのボタンがあります。

「ユーザーを追加」ボタンをクリックすると、すでに追加されているユーザーの検索や選択ができるモーダルウィンドウが表示されます。

### インラインのユーザー編集

関連付けられたユーザーをダブルクリックすると、ユーザーのカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### ユーザーフィールドによるエレメントの照会

ユーザーフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、ユーザーフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `':empty:'` | 関連付けられたユーザーを持たない。
| `':notempty:'` | 少なくとも1つの関連付けられたユーザーを持つ。
| `100` | ID が 100 のユーザーが関連付けられている。
| `[100, 200]` |  ID が 100 または 200 のユーザーが関連付けられている。
| `['and', 100, 200]` | ID が 100 と 200 のユーザーが関連付けられている。
| [User](craft3:craft\elements\User) オブジェクト | ユーザーに関連付けられている。
| [UserQuery](craft3:craft\elements\db\UserQuery) オブジェクト | 結果のユーザーのいずれかに関連付けられている。

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

これは、所定のフィールドで関連付けられたすべてのユーザーを出力するよう準備された[ユーザークエリ](users.md#querying-users)を提供します。

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

ユーザークエリで[パラメータ](users.md#parameters)をセットすることもできます。例えば、`authors` グループに含まれるユーザーだけを取得するには、[groupId](users.md#groupid) パラメータをセットします。

```twig
{% set relatedUsers = clone(entry.myFieldHandle)
    .group('authors')
    .all() %}
```

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用してユーザークエリのクローンを作成するのは、とても良いアイデアです。それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。
:::

## 関連項目

* [ユーザークエリ](users.md#querying-users)
* <craft3:craft\elements\User>
* [Relations](relations.md)
