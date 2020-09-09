# エントリフィールド

エントリフィールドでは、[エントリ](entries.md)を他のエレメントに関連付けることができます。

## 設定

エントリフィールドの設定は、次の通りです。

- **ソース** – フィールドが、どのエントリ（または、他のエントリインデックスソース）からエントリを関連付けられるか。
- **リミット** – フィールドと一度に関連付けできるエントリ数の上限。（デフォルトは無制限です）
- **選択ラベル** – フィールドの選択ボタンのラベルに利用されます。

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **特定のサイトから エントリ を関連付けますか？** – 特定のサイトのエントリとの関連付けのみを許可するかどうか。

   有効にすると、サイトを選択するための新しい設定が表示されます。

   無効にすると、関連付けられたエントリは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたエントリの独自のセットを取得するかどうか。

## フィールド

エントリフィールドには、現在関連付けられているすべてのエントリのリストと、新しいエントリを追加するためのボタンがあります。

「エントリを追加」ボタンをクリックすると、すでに追加されているエントリの検索や選択ができるモーダルウィンドウが表示されます。このモーダルから新しいエントリを作るには、「新しいエントリの入力」ボタンをクリックします。

### インラインのエントリ編集

関連付けられたエントリをダブルクリックすると、エントリのタイトルやカスタムフィールドを編集できる HUD を表示します。

## テンプレート記法

### エントリフィールドによるエレメントの照会

エントリフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、エントリフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `':empty:'` | 関連付けられたエントリを持たない。
| `':notempty:'` | 少なくとも1つの関連付けられたエントリを持つ。
| `100` | ID が 100 のエントリが関連付けられている。
| `[100, 200]` | ID が 100 または 200 のエントリが関連付けられている。
| `['and', 100, 200]` | ID が 100 と 200 のエントリが関連付けられている。
| [Entry](craft3:craft\elements\Entry) オブジェクト | エントリに関連付けられている。
| [EntryQuery](craft3:craft\elements\db\EntryQuery) オブジェクト | 結果のエントリのいずれかに関連付けられている。

```twig
{# Fetch artwork entries that are related to `artist` #}
{% set works = craft.entries()
    .section('artwork')
    .myFieldHandle(artist)
    .all() %}
```

### エントリフィールドデータの操作

テンプレート内でエントリフィールドのエレメントを取得する場合、エントリフィールドのハンドルを利用して、関連付けられたエントリにアクセスできます。

```twig
{% set query = entry.myFieldHandle %}
```

これは、所定のフィールドで関連付けられたすべてのエントリを出力するよう定義された[エントリクエリ](entries.md#querying-entries)を提供します。

関連付けられたすべてのエントリをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

```twig
{% set relatedEntries = entry.myFieldHandle.all() %}
{% if relatedEntries|length %}
    <ul>
        {% for rel in relatedEntries %}
            <li><a href="{{ rel.url }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```

関連付けられた最初のエントリだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.title }}</a></p>
{% endif %}
```

（取得する必要はなく）いずれかの関連付けられたエントリがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related entries!</p>
{% endif %}
```

エントリクエリで[パラメータ](entries.md#parameters)をセットすることもできます。例えば、`news` セクションに含まれるエントリだけを取得するには、[section](entries.md#section) パラメータをセットしてください。

```twig
{% set relatedEntries = clone(entry.myFieldHandle)
    .section('news')
    .all() %}
```

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用してエントリクエリのクローンを作成するのは、とても良いアイデアです。それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。
:::

### 投稿フォームでエントリフィールドを保存

エントリフィールドを含む必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、フィールド値をエントリ ID のリストとして、関連付ける順番で送信する必要があります。

例えば、可能なリレーションごとにチェックボックスのリストを作成できます。

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible entry options #}
{% set possibleEntries = craft.entries()
    .section('galleries')
    .orderBy('title ASC')
    .all() %}

{# Get the currently related entry IDs #}
{% set relatedEntryIds = entry is defined
    ? entry.myFieldHandle.ids()
    : [] %}

<ul>
    {% for possibleEntry in possibleEntries %}
        <li>
            <label>
                {{ input(
                    'checkbox',
                    'fields[myFieldHandle][]',
                    possibleEntry.id,
                    { checked: possibleEntry.id in relatedEntryIds }
                ) }}
                {{ possibleEntry.title }}
            </label>
        </li>
    {% endfor %}
</ul>
```

チェックボックスのリストをソート可能にすれば、ユーザーが関連付けられたエントリの順序をコントロールできるようになります。

## 関連項目

* [エントリクエリ](entries.md#querying-entries)
* <craft3:craft\elements\Entry>
* [Relations](relations.md)
