# エントリ

エントリはウェブページに表示させたいコンテンツを保持します。 すべてのエントリは投稿者、投稿日、（もし望むなら）有効期限日、（有効・無効の）ステータスと、もちろん、コンテンツを持っています。

エントリの現在の公開バージョンと並行して、エントリの下書きを作成することもできます。

一般的に、それぞれのエントリはサイトの独自のプライマリー URL に関わり合いを持ちますが、Craft ではテンプレートが必要とするならば、どこからでもエントリを取得できます。

## セクション

エントリを作成する前に、それらを含めるためのセクションを作成しなければなりません。 それぞれのセクションには、次のことを定義できます。

- セクション内のエントリが URL を持つかどうか
- エントリの URL をどのように表示するか
- エントリの URL がリクエストされたとき、どのテンプレートを読み込むか
- セクション内でどのような入力タイプが利用可能か、それらの入力タイプはどのようなフィールドを持つ必要があるか

Craft のマルチサイト機能を利用しているなら、次のこともセクションで定義できます。

- セクション内のどのサイトのエントリをターゲットにするか
- 新しいエントリ向けに、どのサイトをデフォルトで有効にするか

新しいセクションを作るには、「設定 > セクション」に移動し、「新規セクション」ボタンをクリックします。

### セクションタイプ

すべてのセクションが同じように作成されるわけではありません。 Craft には3つの異なるタイプのセクションがあります。

#### シングル

シングルは、次のようなユニークなコンテンツを持つ1回限りのページで利用します。

- ホームページ
- 会社概要ページ
- お問い合わせページ

他のセクションタイプと異なり、シングルは1つのエントリしか関連付けられておらず、編集可能な投稿者、スラグ、投稿日、または有効期限日がありません。

#### チャンネル

チャンネルは、次のような類似するコンテンツのストリームに利用します。

- ブログ
- ニュースのセクション
- レシピ

#### ストラクチャー

ストラクチャーは、複数の類似するエントリを蓄積し、かつ、特定の順序で並び替える必要がある場合に適しています。 それらは階層構造を持つこともできます。 例として次のものを含みます。

- ドキュメント
- サービスの順序が重要なサービスのセクション
- 会社の組織図

### エントリ URI 形式

チャンネルとストラクチャーセクションでは、「エントリ URI 形式」設定を入力することでシステム内のエントリに URL を割り当てるかどうかを選択できます。

エントリ URI 形式は、セクション内のエントリが保存されるごとにレンダリングされる小さな Twig テンプレートです。 レンダリング結果は、システムのエントリ URI として保存されます。

保存されているエントリは、`object` と名付けられた変数としてテンプレートで利用できます。 さらに、各エントリのプロパティやカスタムフィールドの値は、それぞれの変数として利用できます。 そのため、次のようなことが可能です。

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

::: tip
You can designate any one entry as a site’s homepage using a special `__home__` URI.
:::

::: tip
You can use an attribute from a query in the entry's URI. Use double curly braces (e.g. `{{craft.entries.section('mySingle').one().slug}}/news`).
:::

::: tip
You can use aliases in the entry's URI. Use the `alias()` function in double curly braces (e.g. `{{alias(@rootUrl)}}/news`, `{{alias(@mySectionUri)}}`). See [Environmental Configuration](config/#environmental-configuration) to learn more about how those work.
:::

### プレビューターゲット

セクション内のエントリが独自の URL を持つ場合、URL テンプレート `{url}` を利用して、エントリのプライマリ URL のプレビューターゲットを作成できます。

エントリ URI 形式と同様、プレビューターゲット URL はエントリのプロパティや他の動的な値を含めることができる小さな Twig テンプレートです。

Use single curly braces to render attributes on the entry. For example if entries in your section have their own URLs, then you can create a preview target for the entry’s primary URL using the URL template, `{url}`.

`news` や `archive/{postDate|date('Y')}` のように、エントリが表示されるかもしれない他のエリアのプレビューターゲットを追加で作成してください。 エントリがホームページに表示されている場合、空の URL でプレビューターゲットを作成できます。

![セクションのプレビューターゲット設定画面](./images/preview-targets.png)

::: tip
プレビューターゲット URL にエントリの ID や UID を含めたい場合、`{id}` や `{uid}` ではなく `{sourceId}` や `{sourceUid}` を利用してください。
:::

::: tip
You can use environment variables and aliases in the preview target URL. ::: tip URI を環境変数（`$NEWS_INDEX`）やエイリアスではじまる URL（`@rootUrl/news` または `@rootUrl/news/{slug}`）でセットすることもできます。 どのように動作するかを知るには、[環境設定](config/#environmental-configuration)を参照してください。 :::
:::

::: tip
Preview target URLs can include an attribute on the result of a query. Here double curly braces must be used (e.g. `{{ craft.entries.section('mySingle').one().url }}`).
:::

When an author is editing an entry from a section with custom preview targets, the **View** button will be replaced with a menu that lists the **Primary entry page** (if the section has an Entry URI Format), plus the names of each preview target.

!\[An entry’s View menu with 3 custom preview targets.\](./images/share-with-targets.png =394x)

If you share a link from this menu that includes a preview token, it will expire by default after one day. You can customize this with the [defaultTokenDuration](config3:defaultTokenDuration) config setting.

The targets will also be available within **Preview**.

#### 切り離されたフロントエンドのプレビュー

If your site’s front end lives outside of Craft, for example as a Vue or React app, you can still support previewing drafts and revisions with **Preview** or **Share** buttons. To do that, your front end must check for the existence of a `token` query string parameter (or whatever your <config3:tokenParam> config setting is set to). If it’s in the URL, then you will need to pass that same token in the Craft API request that loads the page content. This token will cause the API request to respond with the correct content based on what’s actually being previewed.

You can pass the token via either a query string parameter named after your <config3:tokenParam> config setting, or an `X-Craft-Token` header.

::: tip
For live preview, you should also consider [enabling iFrame Resizer](config3:useIframeResizer) so that Craft can maintain the page scroll position between page loads.
:::

## 入力タイプ

Both Channel and Structure sections let you define multiple types of entries using Entry Types.

You can manage your sections’ Entry Types by choosing **Edit Entry Types** link beside the section’s name in **Settings** → **Sections**. That’ll take you to the section’s entry type index. Choosing on an entry type’s name takes you to its settings page:

![Entry Type Edit Settings](./images/sections-and-entries-entry-types.png)

Entry types have the following settings:

- **名前** – 入力タイプの名前
- **ハンドル** – 入力タイプのテンプレートに対応するハンドル
- **エントリクエリ**を利用して、テンプレートや PHP コード内でエントリを取得できます。
- **タイトルフィールドラベル** – 「タイトル」フィールドのラベルをどうするか

### 動的なエントリタイトル

If you want your entries to have auto-generated titles rather than requiring authors to enter them, you can uncheck the **Show the Title field?** checkbox. When you do, a new **Title Format** setting will appear, where you can define what the auto-generated titles should look like.

The Title Format is a full-blown Twig template, and it will get parsed whenever your entries are saved.

The entry is passed to this template as a variable named `object`. You can reference the entry’s [properties](craft3:craft\elements\Entry#public-properties) in two ways:

- `{{ object.property }}` _（標準の Twig 構文）_
- `{property}` _（ショートカット構文）_

_Note that the shortcut syntax only has one set of curly braces_.

If Craft finds any of these in your Title Format, it will replace the `{` with `{{object.` and the `}` with `}}`, before passing the template off to Twig for parsing.

You can use Twig filters in both syntaxes:

```twig
{{ object.postDate|date('M j, Y') }}
{postDate|date('M j, Y')}
```

Craft’s [global variables](dev/global-variables.md) are available to these templates as well:

```twig
{{ now|date('Y-m-d') }}
{{ currentUser.username }}
```

Conditionals are also fair game. There’s no shortcut syntax for those, so if you want to use a conditional on one of the entry’s properties, you will need to reference it with the `object` variable:

```twig
{% if object.postDate %}{postDate|date('M j, Y')}{% else %}{{ now|date('M j, Y') }}{% endif %}
```

## エントリの編集

If you have at least one section, there will be an **Entries** tab in the primary control panel navigation. Clicking on it will take you to the entry index. From there you can navigate to the entry you wish to edit, or create a new one.

You can perform the following actions from the Edit Entry page:

- （選択候補が2つ以上ある場合）入力タイプの選択
- エントリのタイトルの編集
- エントリのスラグの編集
- エントリのカスタムフィールドコンテンツの編集
- エントリーの投稿者の選択（Pro エディションのみ）
- （ストラクチャーセクションに含まれる場合）エントリの親の選択
- エントリの投稿日の選択
- エントリの有効期限の選択（オプション）
- エントリを有効にするかどうかの選択
- エントリの変更を保存
- エントリの新しい下書きの保存
- 下書きの公開
- エントリの過去のバージョンの閲覧

If you leave the Post Date blank, Craft will automatically set it the first time an entry is saved as enabled.

## エントリの照会

You can fetch entries in your templates or PHP code using **entry queries**.

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

Once you’ve created an entry query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Entry](craft3:craft\elements\Entry) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### 実例

We can display the 10 most recent entries in a “Blog” section by doing the following:

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

Entry queries support the following parameters:

<!-- BEGIN PARAMS -->

| パラメータ                                     | 説明                                                                                                                                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [after](#after)                           | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                                |
| [ancestorDist](#ancestordist)             | [ancestorOf](#ancestorof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。                                                                                                                                           |
| [ancestorOf](#ancestorof)                 | 指定したエントリの先祖であるエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [anyStatus](#anystatus)                   | ステータスに基づくエレメントのフィルタを削除します。                                                                                                                                                                                         |
| [asArray](#asarray)                       | [Entry](craft3:craft\elements\Entry) オブジェクトではなく、データの配列として、マッチしたエントリをクエリが返します。                                                                                                                                    |
| [authorGroup](#authorgroup)               | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                           |
| [authorGroupId](#authorgroupid)           | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                                                              |
| [authorId](#authorid)                     | エントリの投稿者に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                       |
| [before](#before)                         | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [clearCachedResult](#clearcachedresult)   | キャッシュされた結果をクリアします。                                                                                                                                                                                                 |
| [dateCreated](#datecreated)               | エントリの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                       |
| [dateUpdated](#dateupdated)               | エントリの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                                                                |
| [descendantDist](#descendantdist)         | [descendantOf](#descendantof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。                                                                                                                                       |
| [descendantOf](#descendantof)             | 指定したエントリの子孫であるエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [draftCreator](#draftcreator)             | 所定のユーザーに作成された下書きだけに、クエリの結果を絞り込みます。                                                                                                                                                                                 |
| [draftId](#draftid)                       | （`drafts` テーブルの）エントリのドラフト ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                  |
| [draftOf](#draftof)                       | 所定のエントリの下書きだけに、クエリの結果を絞り込みます。                                                                                                                                                                                      |
| [drafts](#drafts)                         | 下書きのエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                                         |
| [expiryDate](#expirydate)                 | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                     |
| [fixedOrder](#fixedorder)                 | クエリの結果を [id](#id) で指定された順序で返します。                                                                                                                                                                                   |
| [hasDescendants](#hasdescendants)         | エントリが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                 |
| [id](#id)                                 | エントリの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするエントリをクエリが返します。 |
| [inReverse](#inreverse)                   | クエリの結果を逆順で返します。                                                                                                                                                                                                    |
| [leaves](#leaves)                         | エントリが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                |
| [level](#level)                           | ストラクチャー内のエントリのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                              |
| [limit](#limit)                           | 返されるエントリの数を決定します。                                                                                                                                                                                                  |
| [nextSiblingOf](#nextsiblingof)           | 指定したエントリの直後にあるエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [offset](#offset)                         | 結果からスキップされるエントリの数を決定します。                                                                                                                                                                                           |
| [orderBy](#orderby)                       | 返されるエントリの順序を決定します。 (If empty, defaults to `postDate DESC`.)                                                                                                                                                        |
| [positionedAfter](#positionedafter)       | 指定したエントリの後に位置するエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                              |
| [positionedBefore](#positionedbefore)     | 指定したエントリの前に位置するエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                              |
| [postDate](#postdate)                     | エントリの投稿日に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                       |
| [preferSites](#prefersites)               | [unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します                                                                                                                                                   |
| [prevSiblingOf](#prevsiblingof)           | 指定したエントリの直前にあるエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [relatedTo](#relatedto)                   | 特定の他のエレメントと関連付けられたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                           |
| [revisionCreator](#revisioncreator)       | 所定のユーザーに作成されたリビジョンだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [revisionId](#revisionid)                 | （`revisions` テーブルの）エントリのリビジョン ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                                              |
| [revisionOf](#revisionof)                 | 所定のエントリのリビジョンだけに、クエリの結果を絞り込みます。                                                                                                                                                                                    |
| [revisions](#revisions)                   | リビジョンのエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                                       |
| [search](#search)                         | 検索クエリにマッチするエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                                  |
| [section](#section)                       | エントリが属するセクションに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                  |
| [sectionId](#sectionid)                   | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                    |
| [siblingOf](#siblingof)                   | 指定したエントリの兄弟であるエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                               |
| [site](#site)                             | エントリを照会するサイトを決定します。                                                                                                                                                                                                |
| [siteId](#siteid)                         | サイトの ID ごとに、エントリを照会するサイトを決定します。                                                                                                                                                                                    |
| [slug](#slug)                             | エントリのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                       |
| [status](#status)                         | エントリのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                     |
| [title](#title)                           | エントリのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                      |
| [trashed](#trashed)                       | ソフトデリートされたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                                                                   |
| [type](#type)                             | エントリの入力タイプに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                     |
| [typeId](#typeid)                         | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。                                                                                                                                                                         |
| [uid](#uid)                               | エントリの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                     |
| [unique](#unique)                         | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                                                              |
| [uri](#uri)                               | エントリの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                                                                     |
| [with](#with)                             | 関連付けられたエレメントを eager-loaded した状態で、マッチしたエントリをクエリが返します。                                                                                                                                                               |

#### `after`

Narrows the query results to only entries that were posted on or after a certain date.

Possible values include:

| 値                                                | 取得するエントリ                   |
| ------------------------------------------------ | -------------------------- |
| `'2018-04-01'`                                   | 2018-04-01 以降に投稿されたもの。     |
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトとして表される日付以降に投稿されたもの。 |



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

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [ancestorOf](#ancestorof).





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

Narrows the query results to only entries that are ancestors of another entry.



Possible values include:

| 値                                             | 取得するエントリ            |
| --------------------------------------------- | ------------------- |
| `1`                                           | ID が 1 のエントリの上層。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの上層。 |



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
This can be combined with [ancestorDist](#ancestordist) if you want to limit how far away the ancestor entries can be.
:::


#### `anyStatus`

Removes element filters based on their statuses.





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

Causes the query to return matching entries as arrays of data, rather than [Entry](craft3:craft\elements\Entry) objects.





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

Narrows the query results based on the user group the entries’ authors belong to.

Possible values include:

| 値                                                   | 取得するエントリ                              |
| --------------------------------------------------- | ------------------------------------- |
| `'foo'`                                             | ハンドルが `foo` のグループ内の投稿者。               |
| `'not foo'`                                         | ハンドルが `foo` のグループ内の投稿者ではない。           |
| `['foo', 'bar']`                                    | ハンドルが `foo` または `bar` のグループ内の投稿者。     |
| `['not', 'foo', 'bar']`                             | ハンドルが `foo` または `bar` のグループ内の投稿者ではない。 |
| [UserGroup](craft3:craft\models\UserGroup) オブジェクト | オブジェクトで表されるグループ内の投稿者。                 |



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

Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.

Possible values include:

| 値               | 取得するエントリ                     |
| --------------- | ---------------------------- |
| `1`             | ID が 1 のグループ内の投稿者。           |
| `'not 1'`       | ID が 1 のグループ内の投稿者ではない。       |
| `[1, 2]`        | ID が 1 または 2 のグループ内の投稿者。     |
| `['not', 1, 2]` | ID が 1 または 2 のグループ内の投稿者ではない。 |



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

Narrows the query results based on the entries’ authors.

Possible values include:

| 値               | 取得するエントリ               |
| --------------- | ---------------------- |
| `1`             | ID が 1 の投稿者。           |
| `'not 1'`       | ID が 1 の投稿者ではない。       |
| `[1, 2]`        | ID が 1 または 2 の投稿者。     |
| `['not', 1, 2]` | ID が 1 または 2 の投稿者ではない。 |



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

Narrows the query results to only entries that were posted before a certain date.

Possible values include:

| 値                                                | 取得するエントリ                  |
| ------------------------------------------------ | ------------------------- |
| `'2018-04-01'`                                   | 2018-04-01 より前に投稿されたもの。   |
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトで表される日付より前に投稿されたもの。 |



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

Clears the cached result.






#### `dateCreated`

Narrows the query results based on the entries’ creation dates.



Possible values include:

| 値                                                | 取得するエントリ                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



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

Narrows the query results based on the entries’ last-updated dates.



Possible values include:

| 値                                                | 取得するエントリ                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



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

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).





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

Narrows the query results to only entries that are descendants of another entry.



Possible values include:

| 値                                             | 取得するエントリ            |
| --------------------------------------------- | ------------------- |
| `1`                                           | ID が 1 のカテゴリの下層。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの下層。 |



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
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant entries can be.
:::


#### `draftCreator`

Narrows the query results to only drafts created by a given user.



Possible values include:

| 値                                                            | 取得するドラフト                    |
| ------------------------------------------------------------ | --------------------------- |
| `1`                                                          | ID が 1 のユーザーによって作成されたもの。    |
| [craft\elements\User](craft3:craft\elements\User) オブジェクト | オブジェクトで表されるユーザーによって作成されたもの。 |



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

Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).



Possible values include:

| 値   | 取得するドラフト      |
| --- | ------------- |
| `1` | ID が 1 のドラフト。 |



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

Narrows the query results to only drafts of a given entry.



Possible values include:

| 値                                             | 取得するドラフト         |
| --------------------------------------------- | ---------------- |
| `1`                                           | ID が 1 のエントリ。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリ。 |



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

Narrows the query results to only drafts entries.





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

Narrows the query results based on the entries’ expiry dates.

Possible values include:

| 値                                                | 取得するエントリ                                |
| ------------------------------------------------ | --------------------------------------- |
| `':empty:'`                                      | 有効期限日を持たない。                             |
| `':notempty:'`                                   | 有効期限日を持つ。                               |
| `'>= 2020-04-01'`                             | 2020-04-01 以降に有効期限が切れるもの。               |
| `'< 2020-05-01'`                              | 2020-05-01 より前に有効期限が切れるもの。              |
| `['and', '>= 2020-04-04', '< 2020-05-01']` | 2020-04-01 から 2020-05-01 の間に有効期限が切れるもの。 |



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

Causes the query results to be returned in the order specified by [id](#id).





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

Narrows the query results based on whether the entries have any descendants.



(This has the opposite effect of calling [leaves](#leaves).)



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

Narrows the query results based on the entries’ IDs.



Possible values include:

| 値               | 取得するエントリ           |
| --------------- | ------------------ |
| `1`             | ID が 1。            |
| `'not 1'`       | ID が 1ではない。        |
| `[1, 2]`        | ID が 1 または 2。      |
| `['not', 1, 2]` | ID が 1 または 2 ではない。 |



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
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





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

Narrows the query results based on whether the entries are “leaves” (entries with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



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

Narrows the query results based on the entries’ level within the structure.



Possible values include:

| 値               | 取得するエントリ           |
| --------------- | ------------------ |
| `1`             | レベルが 1。            |
| `'not 1'`       | レベルが 1 ではない。       |
| `'>= 3'`     | レベルが 3 以上。         |
| `[1, 2]`        | レベルが 1 または 2。      |
| `['not', 1, 2]` | レベルが 1 または 2 ではない。 |



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

Determines the number of entries that should be returned.



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

Narrows the query results to only the entry that comes immediately after another entry.



Possible values include:

| 値                                             | 取得するエントリ           |
| --------------------------------------------- | ------------------ |
| `1`                                           | ID が 1 のエントリの後。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの後。 |



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

Determines how many entries should be skipped in the results.



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

Determines the order that the entries should be returned in. (If empty, defaults to `postDate DESC`, or the order defined by the section if the [section](#section) or [sectionId](#sectionid) params are set to a single Structure section.)



::: code
```twig
{# Fetch all entries in order of date created #}
{% set entries = craft.entries()
    .orderBy('dateCreated ASC')
    .all() %}
```

```php
// Fetch all entries in order of date created
$entries = \craft\elements\Entry::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `positionedAfter`

Narrows the query results to only entries that are positioned after another entry.



Possible values include:

| 値                                             | 取得するエントリ           |
| --------------------------------------------- | ------------------ |
| `1`                                           | ID が 1 のエントリの後。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの後。 |



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

Narrows the query results to only entries that are positioned before another entry.



Possible values include:

| 値                                             | 取得するエントリ           |
| --------------------------------------------- | ------------------ |
| `1`                                           | ID が 1 のエントリの前。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの前。 |



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

Narrows the query results based on the entries’ post dates.

Possible values include:

| 値                                                | 取得するエントリ                            |
| ------------------------------------------------ | ----------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に投稿されたもの。              |
| `'< 2018-05-01'`                              | 2018-05-01 より前に投稿されたもの。             |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 と 2018-05-01 の間に投稿されたもの。 |



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

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



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

Narrows the query results to only the entry that comes immediately before another entry.



Possible values include:

| 値                                             | 取得するエントリ           |
| --------------------------------------------- | ------------------ |
| `1`                                           | ID が 1 のエントリの前。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの前。 |



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

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



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

Narrows the query results to only revisions created by a given user.



Possible values include:

| 値                                                            | 取得するリビジョン                   |
| ------------------------------------------------------------ | --------------------------- |
| `1`                                                          | ID が 1 のユーザーによって作成されたもの。    |
| [craft\elements\User](craft3:craft\elements\User) オブジェクト | オブジェクトで表されるユーザーによって作成されたもの。 |



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

Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).



Possible values include:

| 値   | 取得するリビジョン      |
| --- | -------------- |
| `1` | ID が 1 のリビジョン。 |



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

Narrows the query results to only revisions of a given entry.



Possible values include:

| 値                                             | 取得するリビジョン        |
| --------------------------------------------- | ---------------- |
| `1`                                           | ID が 1 のエントリ。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリ。 |



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

Narrows the query results to only revision entries.





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

Narrows the query results to only entries that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



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

Narrows the query results based on the sections the entries belong to.

Possible values include:

| 値                                               | 取得するエントリ                           |
| ----------------------------------------------- | ---------------------------------- |
| `'foo'`                                         | ハンドルが `foo` のセクション内。               |
| `'not foo'`                                     | ハンドルが `foo` のセクション内ではない。           |
| `['foo', 'bar']`                                | ハンドルが `foo` または `bar` のセクション内。     |
| `['not', 'foo', 'bar']`                         | ハンドルが `foo` または `bar` のセクション内ではない。 |
| [Section](craft3:craft\models\Section) オブジェクト | オブジェクトで表されるセクション内。                 |



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

Narrows the query results based on the sections the entries belong to, per the sections’ IDs.

Possible values include:

| 値               | 取得するエントリ                  |
| --------------- | ------------------------- |
| `1`             | ID が 1 のセクション内。           |
| `'not 1'`       | ID が 1 のセクション内ではない。       |
| `[1, 2]`        | ID が 1 または 2 のセクション内。     |
| `['not', 1, 2]` | ID が 1 または 2 のセクション内ではない。 |



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

Narrows the query results to only entries that are siblings of another entry.



Possible values include:

| 値                                             | 取得するエントリ           |
| --------------------------------------------- | ------------------ |
| `1`                                           | ID が 1 のエントリの横。    |
| [Entry](craft3:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの横。 |



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

Determines which site(s) the entries should be queried in.



The current site will be used by default.

Possible values include:

| 値                                                        | 取得するエントリ                        |
| -------------------------------------------------------- | ------------------------------- |
| `'foo'`                                                  | ハンドルが `foo` のサイトから。             |
| `['foo', 'bar']`                                         | ハンドルが `foo` または `bar` のサイトから。   |
| `['not', 'foo', 'bar']`                                  | ハンドルが `foo` または `bar` のサイトではない。 |
| [craft\models\Site](craft3:craft\models\Site) オブジェクト | オブジェクトで表されるサイトから。               |
| `'*'`                                                    | すべてのサイトから。                      |

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
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

Determines which site(s) the entries should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| 値               | 取得するエントリ                   |
| --------------- | -------------------------- |
| `1`             | ID が `1` のサイトから。           |
| `[1, 2]`        | ID が `1` または `2` のサイトから。   |
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。 |
| `'*'`           | すべてのサイトから。                 |



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

Narrows the query results based on the entries’ slugs.



Possible values include:

| 値                           | 取得するエントリ                    |
| --------------------------- | --------------------------- |
| `'foo'`                     | スラグが `foo`。                 |
| `'foo*'`                    | スラグが `foo` ではじまる。           |
| `'*foo'`                    | スラグが `foo` で終わる。            |
| `'*foo*'`                   | スラグが `foo` を含む。             |
| `'not *foo*'`               | スラグが `foo` を含まない。           |
| `['*foo*', '*bar*']`        | スラグが `foo` または `bar` を含む。   |
| `['not', '*foo*', '*bar*']` | スラグが `foo` または `bar` を含まない。 |



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

Narrows the query results based on the entries’ statuses.

Possible values include:

| 値                     | 取得するエントリ                       |
| --------------------- | ------------------------------ |
| `'live'` _（デフォルト）_    | ライブなもの。                        |
| `'pending'`           | 保留しているもの（未来の投稿日がセットされた有効なもの）。  |
| `'expired'`           | 期限切れのもの（過去の有効期限日がセットされた有効なもの）。 |
| `'disabled'`          | 無効なもの。                         |
| `['live', 'pending']` | live または pending のもの。          |



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

Narrows the query results based on the entries’ titles.



Possible values include:

| 値                           | 取得するエントリ                     |
| --------------------------- | ---------------------------- |
| `'Foo'`                     | タイトルが `Foo`。                 |
| `'Foo*'`                    | タイトルが `Foo` ではじまる。           |
| `'*Foo'`                    | タイトルが `Foo` で終わる。            |
| `'*Foo*'`                   | タイトルが `Foo` を含む。             |
| `'not *Foo*'`               | タイトルが `Foo` を含まない。           |
| `['*Foo*', '*Bar*']`        | タイトルが `Foo` または `Bar` を含む。   |
| `['not', '*Foo*', '*Bar*']` | タイトルが `Foo` または `Bar` を含まない。 |



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

Narrows the query results to only entries that have been soft-deleted.





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

Narrows the query results based on the entries’ entry types.

Possible values include:

| 値                                                   | 取得するエントリ                        |
| --------------------------------------------------- | ------------------------------- |
| `'foo'`                                             | ハンドルが `foo` のタイプ。               |
| `'not foo'`                                         | ハンドルが `foo` のタイプではない。           |
| `['foo', 'bar']`                                    | ハンドルが `foo` または `bar` のタイプ。     |
| `['not', 'foo', 'bar']`                             | ハンドルが `foo` または `bar` のタイプではない。 |
| [EntryType](craft3:craft\models\EntryType) オブジェクト | オブジェクトで表されるタイプ。                 |



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

Narrows the query results based on the entries’ entry types, per the types’ IDs.

Possible values include:

| 値               | 取得するエントリ               |
| --------------- | ---------------------- |
| `1`             | ID が 1 のタイプ。           |
| `'not 1'`       | ID が 1 のタイプではない。       |
| `[1, 2]`        | ID が 1 または 2 のタイプ。     |
| `['not', 1, 2]` | ID が 1 または 2 のタイプではない。 |



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

Narrows the query results based on the entries’ UIDs.





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

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



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

Narrows the query results based on the entries’ URIs.



Possible values include:

| 値                           | 取得するエントリ                     |
| --------------------------- | ---------------------------- |
| `'foo'`                     | URI が `foo`。                 |
| `'foo*'`                    | URI が `foo` ではじまる。           |
| `'*foo'`                    | URI が `foo` で終わる。            |
| `'*foo*'`                   | URI が `foo` を含む。             |
| `'not *foo*'`               | URI が `foo` を含まない。           |
| `['*foo*', '*bar*']`        | URI が `foo` または `bar` を含む。   |
| `['not', '*foo*', '*bar*']` | URI が `foo` または `bar` を含まない。 |



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

Causes the query to return matching entries eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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
