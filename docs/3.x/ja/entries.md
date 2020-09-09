# エントリ

エントリはウェブページに表示させたいコンテンツを保持します。すべてのエントリは投稿者、投稿日、（もし望むなら）有効期限日、（有効・無効の）ステータスと、もちろん、コンテンツを持っています。

エントリの現在の公開バージョンと並行して、エントリの下書きを作成することもできます。

一般的に、それぞれのエントリはサイトの独自のプライマリー URL に関わり合いを持ちますが、Craft ではテンプレートが必要とするならば、どこからでもエントリを取得できます。

## セクション

エントリを作成する前に、それらを含めるためのセクションを作成しなければなりません。それぞれのセクションには、次のことを定義できます。

* セクション内のエントリが URL を持つかどうか
* エントリの URL をどのように表示するか
* エントリの URL がリクエストされたとき、どのテンプレートを読み込むか
* セクション内でどのような入力タイプが利用可能か、それらの入力タイプはどのようなフィールドを持つ必要があるか

Craft のマルチサイト機能を利用しているなら、次のこともセクションで定義できます。

* セクション内のどのサイトのエントリをターゲットにするか
* 新しいエントリ向けに、どのサイトをデフォルトで有効にするか

新しいセクションを作るには、「設定 > セクション」に移動し、「新規セクション」ボタンをクリックします。

### セクションタイプ

すべてのセクションが同じように作成されるわけではありません。Craft には3つの異なるタイプのセクションがあります。

#### シングル

シングルは、次のようなユニークなコンテンツを持つ1回限りのページで利用します。

* ホームページ
* 会社概要ページ
* お問い合わせページ

他のセクションタイプと異なり、シングルは1つのエントリしか関連付けられておらず、編集可能な投稿者、スラグ、投稿日、または有効期限日がありません。

#### チャンネル

チャンネルは、次のような類似するコンテンツのストリームに利用します。

* ブログ
* ニュースのセクション
* レシピ

#### ストラクチャー

ストラクチャーは、複数の類似するエントリを蓄積し、かつ、特定の順序で並び替える必要がある場合に適しています。それらは階層構造を持つこともできます。例として次のものを含みます。

* ドキュメント
* サービスの順序が重要なサービスのセクション
* 会社の組織図

### エントリ URI 形式

チャンネルとストラクチャーセクションでは、「エントリ URI 形式」設定を入力することでシステム内のエントリに URL を割り当てるかどうかを選択できます。

エントリ URI 形式は、セクション内のエントリが保存されるごとにレンダリングされる小さな Twig テンプレートです。 レンダリング結果は、システムのエントリ URI として保存されます。

保存されているエントリは、`object` と名付けられた変数としてテンプレートで利用できます。さらに、各エントリのプロパティやカスタムフィールドの値は、それぞれの変数として利用できます。そのため、次のようなことが可能です。

```twig
{{ author.username }}/{{ slug }}
```

ショートカット構文は、エントリのプロパティを参照する出力タグでも利用できます。

```twig
{author.username}/{slug}
```

ストラクチャーセクションでは、子エントリのためのネストされたパスが必要かもしれません。

```twig
{parent.uri}/{slug}
```

上記のエントリ URI 形式では、トップレベルエントリの URI は `templating` で終わるかもしれないのに対して、ネストされているエントリの URI は `templating/tags` で終わるかもしれません。

ストラクチャーセクションでは、ネストされたパスの前にセグメントを含めることもできます。

```twig
{parent.uri ?? 'docs'}/{slug}
```

上記のテンプレートは次の構文で表すこともできます。

```twig
{% if level == 1 %}docs{% else %}{parent.uri}{% endif %}/{slug}
```

上記のエントリ URI 形式では、トップレベルエントリの URI は `docs/templating` で終わるかもしれないのに対して、ネストされているエントリの URI は `docs/templating/tags` で終わるかもしれません。

### プレビューターゲット

Craft Pro を利用している場合、セクションは1つ以上の**プレビューターゲット**を持つことができます。これは、エントリが表示されるページの URL であり、投稿者がコントロールパネルでエントリを編集中にプレビューできます。

エントリ URI 形式と同様、プレビューターゲット URL はエントリのプロパティや他の動的な値を含めることができる小さな Twig テンプレートです。

セクション内のエントリが独自の URL を持つ場合、URL テンプレート `{url}` を利用して、エントリのプライマリ URL のプレビューターゲットを作成できます。

`news` や `archive/{postDate|date('Y')}` のように、エントリが表示されるかもしれない他のエリアのプレビューターゲットを追加で作成してください。エントリがホームページに表示されている場合、空の URL でプレビューターゲットを作成できます。

![セクションのプレビューターゲット設定画面](./images/preview-targets.png)

::: tip
プレビューターゲット URL にエントリの ID や UID を含めたい場合、`{id}` や `{uid}` ではなく `{sourceId}` や `{sourceUid}` を利用してください。それによって、下書きではなくソースエントリの ID や UID が使用されます。
:::

::: tip
URI を環境変数（`$NEWS_INDEX`）やエイリアスではじまる URL（`@rootUrl/news` または `@rootUrl/news/{slug}`）でセットすることもできます。どのように動作するかを知るには、[環境設定](config/#environmental-configuration)を参照してください。
:::

投稿者がカスタムのプレビューターゲットを持つセクションのエントリを編集している場合、「共有する」ボタンは（セクションがエントリ URL 形式を持てば）「プライマリのエントリページ」にそれぞれのプレビューターゲットがプラスされたリストのメニューに置き換えられます。

![An entry’s Share menu with 3 custom preview targets.](./images/share-with-targets.png =294x)

ターゲットはライブプレビュー内でも利用可能です。

#### 切り離されたフロントエンドのプレビュー

例えば Vue や React アプリのように、サイトのフロントエンドが Craft の外で稼働している場合でも、ライブプレビューや「共有する」ボタンで、下書きやリビジョンをプレビューできます。そのために、フロントエンドでクエリ文字列パラメータ（または、コンフィグ設定 <config3:tokenParam> でセットされている）`token`が存在するかどうかをチェックしなければなりません。それが URL にある場合、ページコンテンツを読み込む Craft API リクエストに同じトークンを渡す必要があります。このトークンにより、実際にプレビューされている内容に基づいて、API リクエストが正しいコンテンツを返すようになります。

コンフィグ設定 <config3:tokenParam> で名付けられたクエリ文字列パラメータか、`X-Craft-Token` ヘッダー経由でトークンを渡すことができます。

::: tip
ライブプレビュー向けに、Craft がページ読み込み間のページのスクロール位置を維持できるよう [iFrame Resizer の有効化](config3:useIframeResizer)も考慮する必要があるでしょう。
:::

## 入力タイプ

チャンネルとストラクチャーセクションの両方では、入力タイプを用いて複数のタイプのエントリを定義できます。

「設定 > セクション」のセクション名の横にある「入力タイプを変更してください。」リンクをクリックして、セクションの入力タイプを管理できます。セクションの入力タイプのインデックスに移動します。いずれかの入力タイプの名前をクリックすると、その設定ページへ移動します。

![入力タイプの設定編集画面](./images/sections-and-entries-entry-types.png)

入力タイプの設定は、次の通りです。

* **名前** – 入力タイプの名前
* **ハンドル** – 入力タイプのテンプレートに対応するハンドル
* **タイトルのフィールドを見る。** – この入力タイプのエントリでタイトルフィールドを表示するかどうか
* **タイトルフィールドラベル** – 「タイトル」フィールドのラベルをどうするか

### 動的なエントリタイトル

投稿者に入力を求めるのではなく、自動生成されたタイトルにする場合、「タイトルのフィールドを見る。」チェックボックスをオフにします。その際、新たに「タイトル形式」欄が表示され、自動生成されるタイトルの見え方を定義できます。

タイトル形式は本格的な Twig テンプレートで、エントリが保存されるたびに解析されます。

エントリは `object` という名称の変数としてこのテンプレートに渡されます。エントリの[プロパティ](craft3:craft\elements\Entry#public-properties)は、次の2つの方法で参照できます。

* `{{ object.property }}` _（標準の Twig 構文）_
* `{property}` _（ショートカット構文）_

_ショートカット構文には、中括弧が1つしかないことに注意してください。_

Craft がタイトル形式の中でショートカット構文を見つけた場合、Twig の解析にあたりテンプレートへ渡す前に `{` を `{{object.`、`}` を `}}` に置換します。

いずれの構文でも Twig フィルタを使えます。

```twig
{{ object.postDate|date('M j, Y') }}
{postDate|date('M j, Y')}
```

Craft の[グローバル変数](dev/global-variables.md)は、これらのテンプレートでも利用できます。

```twig
{{ now|date('Y-m-d') }}
{{ currentUser.username }}
```

条件文もまた、かっこうの標的です。ショートカット構文がないため、エントリプロパティの1つで条件分岐する場合、変数 `object` で参照する必要があります。

```twig
{% if object.postDate %}{postDate|date('M j, Y')}{% else %}{{ now|date('M j, Y') }}{% endif %}
```

## エントリの編集

少なくとも1つのセクションがあれば、コントロールパネルのメインナビゲーションに「エントリ」タブが表示されます。クリックすると、エントリのインデックスに移動します。そこから、編集したいエントリに移動したり、新しいエントリを作成できます。

エントリの編集ページでは、次のアクションを実行できます。

* （選択候補が2つ以上ある場合）入力タイプの選択
* エントリのタイトルの編集
* エントリのスラグの編集
* エントリのカスタムフィールドコンテンツの編集
* エントリーの投稿者の選択（Pro エディションのみ）
* （ストラクチャーセクションに含まれる場合）エントリの親の選択
* エントリの投稿日の選択
* エントリの有効期限の選択（オプション）
* エントリを有効にするかどうかの選択
* エントリの変更を保存
* エントリの新しい下書きの保存
* 下書きの公開
* エントリの過去のバージョンの閲覧

投稿日を空のままにした場合、Craft はエントリが有効な状態で保存された最初のタイミングで自動的にセットします。

## エントリの照会

**エントリクエリ**を利用して、テンプレートや PHP コード内でエントリを取得できます。

::: code
```twig
{# Create a new entry query #}
{% set myEntryQuery = craft.entries() %}
```
```php
// Create a new entry query
$myEntryQuery = \craft\elements\Entry::find();
```
:::

エレメントクエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。[Entry](craft3:craft\elements\Entry) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。
:::

### 実例

次の操作を行うことで、「Blog」セクションに含まれる最新10件のエントリを表示できます。

1. `craft.entries()` でエントリクエリを作成します。
2. [section](#section) および [limit](#limit) パラメータをセットします。
3. `.all()` でエントリを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用してエントリをループ処理し、ブログ投稿の HTML を出力します。

```twig
{# Create an entry query with the 'section' and 'limit' parameters #}
{% set myEntryQuery = craft.entries()
    .section('blog')
    .limit(10) %}

{# Fetch the entries #}
{% set entries = myEntryQuery.all() %}

{# Display the entries #}
{% for entry in entries %}
    <article>
        <h1><a href="{{ entry.url }}">{{ entry.title }}</a></h1>
        {{ entry.summary }}
        <a href="{{ entry.url }}">Continue reading</a>
    </article>
{% endfor %}
```

### パラメータ

エントリクエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ | 説明 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [after](#after) | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。 |
| [ancestorDist](#ancestordist) | [ancestorOf](#ancestorof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。 |
| [ancestorOf](#ancestorof) | 指定したエントリの先祖であるエントリだけに、クエリの結果を絞り込みます。 |
| [anyStatus](#anystatus) | ステータスに基づくエレメントのフィルタを削除します。 |
| [asArray](#asarray) | [Entry](craft3:craft\elements\Entry) オブジェクトではなく、データの配列として、マッチしたエントリをクエリが返します。 |
| [authorGroup](#authorgroup) | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。 |
| [authorGroupId](#authorgroupid) | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。 |
| [authorId](#authorid) | エントリの投稿者に基づいて、クエリの結果を絞り込みます。 |
| [before](#before) | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。 |
| [clearCachedResult](#clearcachedresult) | キャッシュされた結果をクリアします。 |
| [dateCreated](#datecreated) | エントリの作成日に基づいて、クエリの結果を絞り込みます。 |
| [dateUpdated](#dateupdated) | エントリの最終アップデート日に基づいて、クエリの結果が絞り込まれます。 |
| [descendantDist](#descendantdist) | [descendantOf](#descendantof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。 |
| [descendantOf](#descendantof) | 指定したエントリの子孫であるエントリだけに、クエリの結果を絞り込みます。 |
| [draftCreator](#draftcreator) | 所定のユーザーに作成された下書きだけに、クエリの結果を絞り込みます。 |
| [draftId](#draftid) | （`drafts` テーブルの）エントリのドラフト ID に基づいて、クエリの結果を絞り込みます。 |
| [draftOf](#draftof) | 所定のエントリの下書きだけに、クエリの結果を絞り込みます。 |
| [drafts](#drafts) | 下書きのエントリだけに、クエリの結果を絞り込みます。 |
| [expiryDate](#expirydate) | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。 |
| [fixedOrder](#fixedorder) | クエリの結果を [id](#id) で指定された順序で返します。 |
| [hasDescendants](#hasdescendants) | エントリが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。 |
| [id](#id) | エントリの ID に基づいて、クエリの結果を絞り込みます。 |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするエントリをクエリが返します。 |
| [inReverse](#inreverse) | クエリの結果を逆順で返します。 |
| [leaves](#leaves) | エントリが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。 |
| [level](#level) | ストラクチャー内のエントリのレベルに基づいて、クエリの結果を絞り込みます。 |
| [limit](#limit) | 返されるエントリの数を決定します。 |
| [nextSiblingOf](#nextsiblingof) | 指定したエントリの直後にあるエントリだけに、クエリの結果を絞り込みます。 |
| [offset](#offset) | 結果からスキップされるエントリの数を決定します。 |
| [orderBy](#orderby) | 返されるエントリの順序を決定します。（空の場合、デフォルトは `postDate DESC` です。単一のストラクチャーセクションに [section](#section) または [sectionId](#sectionid) パラメータがセットされている場合、セクションによって定義された順序になります。 |
| [positionedAfter](#positionedafter) | 指定したエントリの後に位置するエントリだけに、クエリの結果を絞り込みます。 |
| [positionedBefore](#positionedbefore) | 指定したエントリの前に位置するエントリだけに、クエリの結果を絞り込みます。 |
| [postDate](#postdate) | エントリの投稿日に基づいて、クエリの結果を絞り込みます。 |
| [preferSites](#prefersites) | [unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します |
| [prevSiblingOf](#prevsiblingof) | 指定したエントリの直前にあるエントリだけに、クエリの結果を絞り込みます。 |
| [relatedTo](#relatedto) | 特定の他のエレメントと関連付けられたエントリだけに、クエリの結果を絞り込みます。 |
| [revisionCreator](#revisioncreator) | 所定のユーザーに作成されたリビジョンだけに、クエリの結果を絞り込みます。 |
| [revisionId](#revisionid) | （`revisions` テーブルの）エントリのリビジョン ID に基づいて、クエリの結果を絞り込みます。 |
| [revisionOf](#revisionof) | 所定のエントリのリビジョンだけに、クエリの結果を絞り込みます。 |
| [revisions](#revisions) | リビジョンのエントリだけに、クエリの結果を絞り込みます。 |
| [search](#search) | 検索クエリにマッチするエントリだけに、クエリの結果を絞り込みます。 |
| [section](#section) | エントリが属するセクションに基づいて、クエリの結果を絞り込みます。 |
| [sectionId](#sectionid) | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。 |
| [siblingOf](#siblingof) | 指定したエントリの兄弟であるエントリだけに、クエリの結果を絞り込みます。 |
| [site](#site) | エントリを照会するサイトを決定します。 |
| [siteId](#siteid) | サイトの ID ごとに、エントリを照会するサイトを決定します。 |
| [slug](#slug) | エントリのスラグに基づいて、クエリの結果を絞り込みます。 |
| [status](#status) | エントリのステータスに基づいて、クエリの結果を絞り込みます。 |
| [title](#title) | エントリのタイトルに基づいて、クエリの結果を絞り込みます。 |
| [trashed](#trashed) | ソフトデリートされたエントリだけに、クエリの結果を絞り込みます。 |
| [type](#type) | エントリの入力タイプに基づいて、クエリの結果を絞り込みます。 |
| [typeId](#typeid) | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。 |
| [uid](#uid) | エントリの UID に基づいて、クエリの結果を絞り込みます。 |
| [unique](#unique) | クエリによってユニークな ID のエレメントだけが返されるかを決定します。 |
| [uri](#uri) | エントリの URI に基づいて、クエリの結果を絞り込みます。 |
| [with](#with) | 関連付けられたエレメントを eager-loaded した状態で、マッチしたエントリをクエリが返します。 |

#### `after`

特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'2018-04-01'` | 2018-04-01 以降に投稿されたもの。
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトとして表される日付以降に投稿されたもの。



::: code
```twig
{# Fetch entries posted this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
    .after(firstDayOfMonth)
    .all() %}
```

```php
// Fetch entries posted this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->after($firstDayOfMonth)
    ->all();
```
:::


#### `ancestorDist`

[ancestorOf](#ancestorof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
    .ancestorOf(myEntry)
    .ancestorDist(3)
    .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->ancestorDist(3)
    ->all();
```
:::


#### `ancestorOf`

指定したエントリの先祖であるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの上層。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの上層。



::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
    .ancestorOf(myEntry)
    .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->all();
```
:::



::: tip
どれだけ離れた先祖エントリを対象にするか制限したい場合、[ancestorDist](#ancestordist) と組み合わせることができます。
:::


#### `anyStatus`

ステータスに基づくエレメントのフィルタを削除します。





::: code
```twig
{# Fetch all entries, regardless of status #}
{% set entries = craft.entries()
    .anyStatus()
    .all() %}
```

```php
// Fetch all entries, regardless of status
$entries = \craft\elements\Entry::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

[Entry](craft3:craft\elements\Entry) オブジェクトではなく、データの配列として、マッチしたエントリをクエリが返します。





::: code
```twig
{# Fetch entries as arrays #}
{% set entries = craft.entries()
    .asArray()
    .all() %}
```

```php
// Fetch entries as arrays
$entries = \craft\elements\Entry::find()
    ->asArray()
    ->all();
```
:::


#### `authorGroup`

エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | ハンドルが `foo` のグループ内の投稿者。
| `'not foo'` | ハンドルが `foo` のグループ内の投稿者ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のグループ内の投稿者。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のグループ内の投稿者ではない。
| [UserGroup](craft3:craft\models\UserGroup) オブジェクト | オブジェクトで表されるグループ内の投稿者。



::: code
```twig
{# Fetch entries with an author in the Foo user group #}
{% set entries = craft.entries()
    .authorGroup('foo')
    .all() %}
```

```php
// Fetch entries with an author in the Foo user group
$entries = \craft\elements\Entry::find()
    ->authorGroup('foo')
    ->all();
```
:::


#### `authorGroupId`

グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のグループ内の投稿者。
| `'not 1'` | ID が 1 のグループ内の投稿者ではない。
| `[1, 2]` | ID が 1 または 2 のグループ内の投稿者。
| `['not', 1, 2]` | ID が 1 または 2 のグループ内の投稿者ではない。



::: code
```twig
{# Fetch entries with an author in a group with an ID of 1 #}
{% set entries = craft.entries()
    .authorGroupId(1)
    .all() %}
```

```php
// Fetch entries with an author in a group with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorGroupId(1)
    ->all();
```
:::


#### `authorId`

エントリの投稿者に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 の投稿者。
| `'not 1'` | ID が 1 の投稿者ではない。
| `[1, 2]` | ID が 1 または 2 の投稿者。
| `['not', 1, 2]` | ID が 1 または 2 の投稿者ではない。



::: code
```twig
{# Fetch entries with an author with an ID of 1 #}
{% set entries = craft.entries()
    .authorId(1)
    .all() %}
```

```php
// Fetch entries with an author with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorId(1)
    ->all();
```
:::


#### `before`

特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'2018-04-01'` | 2018-04-01 より前に投稿されたもの。
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトで表される日付より前に投稿されたもの。



::: code
```twig
{# Fetch entries posted before this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
    .before(firstDayOfMonth)
    .all() %}
```

```php
// Fetch entries posted before this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->before($firstDayOfMonth)
    ->all();
```
:::


#### `clearCachedResult`

キャッシュされた結果をクリアします。






#### `dateCreated`

エントリの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に作成されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に作成されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。



::: code
```twig
{# Fetch entries created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch entries created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

エントリの最終アップデート日に基づいて、クエリの結果が絞り込まれます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降にアップデートされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前にアップデートされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。



::: code
```twig
{# Fetch entries updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set entries = craft.entries()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch entries updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `descendantDist`

[descendantOf](#descendantof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
    .descendantOf(myEntry)
    .descendantDist(3)
    .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->descendantDist(3)
    ->all();
```
:::


#### `descendantOf`

指定したエントリの子孫であるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のカテゴリの下層。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの下層。



::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
    .descendantOf(myEntry)
    .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->all();
```
:::



::: tip
どれだけ離れた子孫エントリを対象にするか制限したい場合、[descendantDist](#descendantdist) と組み合わせることができます。
:::


#### `draftCreator`

所定のユーザーに作成された下書きだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するドラフト
| - | -
| `1` | ID が 1 のユーザーによって作成されたもの。
| [craft\elements\User](craft3:craft\elements\User) オブジェクト | オブジェクトで表されるユーザーによって作成されたもの。



::: code
```twig
{# Fetch drafts by the current user #}
{% set entries = craft.entries()
    .draftCreator(currentUser)
    .all() %}
```

```php
// Fetch drafts by the current user
$entries = \craft\elements\Entry::find()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `draftId`

（`drafts` テーブルの）エントリのドラフト ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するドラフト
| - | -
| `1` | ID が 1 のドラフト。



::: code
```twig
{# Fetch a draft #}
{% set entries = craft.entries()
    .draftId(10)
    .all() %}
```

```php
// Fetch a draft
$entries = \craft\elements\Entry::find()
    ->draftId(10)
    ->all();
```
:::


#### `draftOf`

所定のエントリの下書きだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するドラフト
| - | -
| `1` | ID が 1 のエントリ。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリ。



::: code
```twig
{# Fetch drafts of the entry #}
{% set entries = craft.entries()
    .draftOf(myEntry)
    .all() %}
```

```php
// Fetch drafts of the entry
$entries = \craft\elements\Entry::find()
    ->draftOf($myEntry)
    ->all();
```
:::


#### `drafts`

下書きのエントリだけに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch a draft entry #}
{% set entries = {twig-function}
    .drafts()
    .id(123)
    .one() %}
```

```php
// Fetch a draft entry
$entries = \craft\elements\Entry::find()
    ->drafts()
    ->id(123)
    ->one();
```
:::


#### `expiryDate`

エントリの有効期限日に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `':empty:'` | 有効期限日を持たない。
| `':notempty:'` | 有効期限日を持つ。
| `'>= 2020-04-01'` | 2020-04-01 以降に有効期限が切れるもの。
| `'< 2020-05-01'` | 2020-05-01 より前に有効期限が切れるもの。
| `['and', '>= 2020-04-04', '< 2020-05-01']` | 2020-04-01 から 2020-05-01 の間に有効期限が切れるもの。



::: code
```twig
{# Fetch entries expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set entries = craft.entries()
    .expiryDate("< #{nextMonth}")
    .all() %}
```

```php
// Fetch entries expiring this month
$nextMonth = (new \DateTime('first day of next month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


#### `fixedOrder`

クエリの結果を [id](#id) で指定された順序で返します。





::: code
```twig
{# Fetch entries in a specific order #}
{% set entries = craft.entries()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch entries in a specific order
$entries = \craft\elements\Entry::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `hasDescendants`

エントリが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。



（これは [leaves](#leaves) の呼び出しと反対の効果を持っています。）



::: code
```twig
{# Fetch entries that have descendants #}
{% set entries = craft.entries()
    .hasDescendants()
    .all() %}
```

```php
// Fetch entries that have descendants
$entries = \craft\elements\Entry::find()
    ->hasDescendants()
    ->all();
```
:::


#### `id`

エントリの ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1。
| `'not 1'` | ID が 1ではない。
| `[1, 2]` | ID が 1 または 2。
| `['not', 1, 2]` | ID が 1 または 2 ではない。



::: code
```twig
{# Fetch the entry by its ID #}
{% set entry = craft.entries()
    .id(1)
    .one() %}
```

```php
// Fetch the entry by its ID
$entry = \craft\elements\Entry::find()
    ->id(1)
    ->one();
```
:::



::: tip
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::


#### `ignorePlaceholders`

[craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするエントリをクエリが返します。










#### `inReverse`

クエリの結果を逆順で返します。





::: code
```twig
{# Fetch entries in reverse #}
{% set entries = craft.entries()
    .inReverse()
    .all() %}
```

```php
// Fetch entries in reverse
$entries = \craft\elements\Entry::find()
    ->inReverse()
    ->all();
```
:::


#### `leaves`

エントリが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。



（これは [hasDescendants](#hasdescendants) の呼び出しと反対の効果を持っています。）



::: code
```twig
{# Fetch entries that have no descendants #}
{% set entries = craft.entries()
    .leaves()
    .all() %}
```

```php
// Fetch entries that have no descendants
$entries = \craft\elements\Entry::find()
    ->leaves()
    ->all();
```
:::


#### `level`

ストラクチャー内のエントリのレベルに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | レベルが 1。
| `'not 1'` | レベルが 1 ではない。
| `'>= 3'` | レベルが 3 以上。
| `[1, 2]` | レベルが 1 または 2。
| `['not', 1, 2]` | レベルが 1 または 2 ではない。



::: code
```twig
{# Fetch entries positioned at level 3 or above #}
{% set entries = craft.entries()
    .level('>= 3')
    .all() %}
```

```php
// Fetch entries positioned at level 3 or above
$entries = \craft\elements\Entry::find()
    ->level('>= 3')
    ->all();
```
:::


#### `limit`

返されるエントリの数を決定します。



::: code
```twig
{# Fetch up to 10 entries  #}
{% set entries = craft.entries()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 entries
$entries = \craft\elements\Entry::find()
    ->limit(10)
    ->all();
```
:::


#### `nextSiblingOf`

指定したエントリの直後にあるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの後。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの後。



::: code
```twig
{# Fetch the next entry #}
{% set entry = craft.entries()
    .nextSiblingOf(myEntry)
    .one() %}
```

```php
// Fetch the next entry
$entry = \craft\elements\Entry::find()
    ->nextSiblingOf($myEntry)
    ->one();
```
:::


#### `offset`

結果からスキップされるエントリの数を決定します。



::: code
```twig
{# Fetch all entries except for the first 3 #}
{% set entries = craft.entries()
    .offset(3)
    .all() %}
```

```php
// Fetch all entries except for the first 3
$entries = \craft\elements\Entry::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

返されるエントリの順序を決定します。（空の場合、デフォルトは `postDate DESC` です。単一のストラクチャーセクションに [section](#section) または [sectionId](#sectionid) パラメータがセットされている場合、セクションによって定義された順序になります。



::: code
```twig
{# Fetch all entries in order of date created #}
{% set entries = craft.entries()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all entries in order of date created
$entries = \craft\elements\Entry::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


#### `positionedAfter`

指定したエントリの後に位置するエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの後。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの後。



::: code
```twig
{# Fetch entries after this one #}
{% set entries = craft.entries()
    .positionedAfter(myEntry)
    .all() %}
```

```php
// Fetch entries after this one
$entries = \craft\elements\Entry::find()
    ->positionedAfter($myEntry)
    ->all();
```
:::


#### `positionedBefore`

指定したエントリの前に位置するエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの前。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの前。



::: code
```twig
{# Fetch entries before this one #}
{% set entries = craft.entries()
    .positionedBefore(myEntry)
    .all() %}
```

```php
// Fetch entries before this one
$entries = \craft\elements\Entry::find()
    ->positionedBefore($myEntry)
    ->all();
```
:::


#### `postDate`

エントリの投稿日に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に投稿されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に投稿されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 と 2018-05-01 の間に投稿されたもの。



::: code
```twig
{# Fetch entries posted last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
    .postDate(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch entries posted last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->postDate(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `preferSites`

[unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します



例えば、エレメント “Foo” がサイト A とサイト B に存在し、エレメント “Bar” がサイト B とサイト C に存在し、ここに `['c', 'b', 'a']` がセットされている場合、Foo will はサイト C に対して返され、Bar はサイト B に対して返されます。

これがセットされていない場合、現在のサイトが優先されます。



::: code
```twig
{# Fetch unique entries from Site A, or Site B if they don’t exist in Site A #}
{% set entries = craft.entries()
    .site('*')
    .unique()
    .preferSites(['a', 'b'])
    .all() %}
```

```php
// Fetch unique entries from Site A, or Site B if they don’t exist in Site A
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prevSiblingOf`

指定したエントリの直前にあるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの前。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの前。



::: code
```twig
{# Fetch the previous entry #}
{% set entry = craft.entries()
    .prevSiblingOf(myEntry)
    .one() %}
```

```php
// Fetch the previous entry
$entry = \craft\elements\Entry::find()
    ->prevSiblingOf($myEntry)
    ->one();
```
:::


#### `relatedTo`

特定の他のエレメントと関連付けられたエントリだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](relations.md)を参照してください。



::: code
```twig
{# Fetch all entries that are related to myCategory #}
{% set entries = craft.entries()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all entries that are related to $myCategory
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `revisionCreator`

所定のユーザーに作成されたリビジョンだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するリビジョン
| - | -
| `1` | ID が 1 のユーザーによって作成されたもの。
| [craft\elements\User](craft3:craft\elements\User) オブジェクト | オブジェクトで表されるユーザーによって作成されたもの。



::: code
```twig
{# Fetch revisions by the current user #}
{% set entries = craft.entries()
    .revisionCreator(currentUser)
    .all() %}
```

```php
// Fetch revisions by the current user
$entries = \craft\elements\Entry::find()
    ->revisionCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `revisionId`

（`revisions` テーブルの）エントリのリビジョン ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するリビジョン
| - | -
| `1` | ID が 1 のリビジョン。



::: code
```twig
{# Fetch a revision #}
{% set entries = craft.entries()
    .revisionId(10)
    .all() %}
```

```php
// Fetch a revision
$entries = \craft\elements\Entry::find()
    ->revisionIf(10)
    ->all();
```
:::


#### `revisionOf`

所定のエントリのリビジョンだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するリビジョン
| - | -
| `1` | ID が 1 のエントリ。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリ。



::: code
```twig
{# Fetch revisions of the entry #}
{% set entries = craft.entries()
    .revisionOf(myEntry)
    .all() %}
```

```php
// Fetch revisions of the entry
$entries = \craft\elements\Entry::find()
    ->revisionOf($myEntry)
    ->all();
```
:::


#### `revisions`

リビジョンのエントリだけに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch a revision entry #}
{% set entries = {twig-function}
    .revisions()
    .id(123)
    .one() %}
```

```php
// Fetch a revision entry
$entries = \craft\elements\Entry::find()
    ->revisions()
    ->id(123)
    ->one();
```
:::


#### `search`

検索クエリにマッチするエントリだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[検索](searching.md)を参照してください。



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all entries that match the search query #}
{% set entries = craft.entries()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all entries that match the search query
$entries = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `section`

エントリが属するセクションに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | ハンドルが `foo` のセクション内。
| `'not foo'` | ハンドルが `foo` のセクション内ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のセクション内。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のセクション内ではない。
| [Section](craft3:craft\models\Section) オブジェクト | オブジェクトで表されるセクション内。



::: code
```twig
{# Fetch entries in the Foo section #}
{% set entries = craft.entries()
    .section('foo')
    .all() %}
```

```php
// Fetch entries in the Foo section
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->all();
```
:::


#### `sectionId`

セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のセクション内。
| `'not 1'` | ID が 1 のセクション内ではない。
| `[1, 2]` | ID が 1 または 2 のセクション内。
| `['not', 1, 2]` | ID が 1 または 2 のセクション内ではない。



::: code
```twig
{# Fetch entries in the section with an ID of 1 #}
{% set entries = craft.entries()
    .sectionId(1)
    .all() %}
```

```php
// Fetch entries in the section with an ID of 1
$entries = \craft\elements\Entry::find()
    ->sectionId(1)
    ->all();
```
:::


#### `siblingOf`

指定したエントリの兄弟であるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のエントリの横。
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの横。



::: code
```twig
{# Fetch entries beside this one #}
{% set entries = craft.entries()
    .siblingOf(myEntry)
    .all() %}
```

```php
// Fetch entries beside this one
$entries = \craft\elements\Entry::find()
    ->siblingOf($myEntry)
    ->all();
```
:::


#### `site`

エントリを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | ハンドルが `foo` のサイトから。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のサイトから。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のサイトではない。
| [craft\models\Site](craft3:craft\models\Site) オブジェクト | オブジェクトで表されるサイトから。
| `'*'` | すべてのサイトから。

::: tip
複数のサイトを指定した場合、複数のサイトに属するエレメントは複数回返されます。単一のエレメントだけを返したい場合、これと併せて [unique](#unique) を利用してください。
:::



::: code
```twig
{# Fetch entries from the Foo site #}
{% set entries = craft.entries()
    .site('foo')
    .all() %}
```

```php
// Fetch entries from the Foo site
$entries = \craft\elements\Entry::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

サイトの ID ごとに、エントリを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が `1` のサイトから。
| `[1, 2]` | ID が `1` または `2` のサイトから。
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。
| `'*'` | すべてのサイトから。



::: code
```twig
{# Fetch entries from the site with an ID of 1 #}
{% set entries = craft.entries()
    .siteId(1)
    .all() %}
```

```php
// Fetch entries from the site with an ID of 1
$entries = \craft\elements\Entry::find()
    ->siteId(1)
    ->all();
```
:::


#### `slug`

エントリのスラグに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | スラグが `foo`。
| `'foo*'` | スラグが `foo` ではじまる。
| `'*foo'` | スラグが `foo` で終わる。
| `'*foo*'` | スラグが `foo` を含む。
| `'not *foo*'` | スラグが `foo` を含まない。
| `['*foo*', '*bar*']` | スラグが `foo` または `bar` を含む。
| `['not', '*foo*', '*bar*']` | スラグが `foo` または `bar` を含まない。



::: code
```twig
{# Get the requested entry slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the entry with that slug #}
{% set entry = craft.entries()
    .slug(requestedSlug|literal)
    .one() %}
```

```php
// Get the requested entry slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the entry with that slug
$entry = \craft\elements\Entry::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


#### `status`

エントリのステータスに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'live'` _（デフォルト）_ | ライブなもの。
| `'pending'` | 保留しているもの（未来の投稿日がセットされた有効なもの）。
| `'expired'` | 期限切れのもの（過去の有効期限日がセットされた有効なもの）。
| `'disabled'` | 無効なもの。
| `['live', 'pending']` | live または pending のもの。



::: code
```twig
{# Fetch disabled entries #}
{% set entries = craft.entries()
    .status('disabled')
    .all() %}
```

```php
// Fetch disabled entries
$entries = \craft\elements\Entry::find()
    ->status('disabled')
    ->all();
```
:::


#### `title`

エントリのタイトルに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'Foo'` | タイトルが `Foo`。
| `'Foo*'` | タイトルが `Foo` ではじまる。
| `'*Foo'` | タイトルが `Foo` で終わる。
| `'*Foo*'` | タイトルが `Foo` を含む。
| `'not *Foo*'` | タイトルが `Foo` を含まない。
| `['*Foo*', '*Bar*']` | タイトルが `Foo` または `Bar` を含む。
| `['not', '*Foo*', '*Bar*']` | タイトルが `Foo` または `Bar` を含まない。



::: code
```twig
{# Fetch entries with a title that contains "Foo" #}
{% set entries = craft.entries()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch entries with a title that contains "Foo"
$entries = \craft\elements\Entry::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

ソフトデリートされたエントリだけに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch trashed entries #}
{% set entries = craft.entries()
    .trashed()
    .all() %}
```

```php
// Fetch trashed entries
$entries = \craft\elements\Entry::find()
    ->trashed()
    ->all();
```
:::


#### `type`

エントリの入力タイプに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | ハンドルが `foo` のタイプ。
| `'not foo'` | ハンドルが `foo` のタイプではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のタイプ。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のタイプではない。
| [EntryType](craft3:craft\models\EntryType) オブジェクト | オブジェクトで表されるタイプ。



::: code
```twig
{# Fetch entries in the Foo section with a Bar entry type #}
{% set entries = craft.entries()
    .section('foo')
    .type('bar')
    .all() %}
```

```php
// Fetch entries in the Foo section with a Bar entry type
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->type('bar')
    ->all();
```
:::


#### `typeId`

タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `1` | ID が 1 のタイプ。
| `'not 1'` | ID が 1 のタイプではない。
| `[1, 2]` | ID が 1 または 2 のタイプ。
| `['not', 1, 2]` | ID が 1 または 2 のタイプではない。



::: code
```twig
{# Fetch entries of the entry type with an ID of 1 #}
{% set entries = craft.entries()
    .typeId(1)
    .all() %}
```

```php
// Fetch entries of the entry type with an ID of 1
$entries = \craft\elements\Entry::find()
    ->typeId(1)
    ->all();
```
:::


#### `uid`

エントリの UID に基づいて、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch the entry by its UID #}
{% set entry = craft.entries()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the entry by its UID
$entry = \craft\elements\Entry::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

クエリによってユニークな ID のエレメントだけが返されるかを決定します。



一度に複数のサイトからエレメントを照会する際、「重複する」結果を望まない場合に使用します。



::: code
```twig
{# Fetch unique entries across all sites #}
{% set entries = craft.entries()
    .site('*')
    .unique()
    .all() %}
```

```php
// Fetch unique entries across all sites
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

エントリの URI に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するエントリ
| - | -
| `'foo'` | URI が `foo`。
| `'foo*'` | URI が `foo` ではじまる。
| `'*foo'` | URI が `foo` で終わる。
| `'*foo*'` | URI が `foo` を含む。
| `'not *foo*'` | URI が `foo` を含まない。
| `['*foo*', '*bar*']` | URI が `foo` または `bar` を含む。
| `['not', '*foo*', '*bar*']` | URI が `foo` または `bar` を含まない。



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the entry with that URI #}
{% set entry = craft.entries()
    .uri(requestedUri|literal)
    .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the entry with that URI
$entry = \craft\elements\Entry::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `with`

関連付けられたエレメントを eager-loaded した状態で、マッチしたエントリをクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントの Eager-Loading](dev/eager-loading-elements.md) を参照してください。



::: code
```twig
{# Fetch entries eager-loaded with the "Related" field’s relations #}
{% set entries = craft.entries()
    .with(['related'])
    .all() %}
```

```php
// Fetch entries eager-loaded with the "Related" field’s relations
$entries = \craft\elements\Entry::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
