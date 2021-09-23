# タグ

タグを利用して、[エントリ](sections-and-entries.md)、[ユーザー](users.md)、および、[アセット](assets.md)の分類を作成できます。

| Param                                                                 | タグ                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [anyStatus](https://twig.symfony.com/doc/2.x/tags/apply.html)         | Removes element filters based on their statuses.                                                                                                                                                                                                                                       |
| [asArray](https://twig.symfony.com/doc/2.x/tags/autoescape.html)      | Causes the query to return matching tags as arrays of data, rather than [Tag](craft3:craft\elements\Tag) objects.                                                                                                                                                                    |
| [clearCachedResult](https://twig.symfony.com/doc/2.x/tags/block.html) | Clears the cached result.                                                                                                                                                                                                                                                              |
| [dateCreated](#cache)                                                 | Narrows the query results based on the tags’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#css)                                                   | Narrows the query results based on the tags’ last-updated dates.                                                                                                                                                                                                                       |
| [fixedOrder](#dd)                                                     | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                           |
| [group](https://twig.symfony.com/doc/2.x/tags/deprecated.html)        | Narrows the query results based on the tag groups the tags belong to.                                                                                                                                                                                                                  |
| [groupId](https://twig.symfony.com/doc/2.x/tags/do.html)              | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.                                                                                                                                                                                             |
| [id](https://twig.symfony.com/doc/2.x/tags/embed.html)                | Narrows the query results based on the tags’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#exit)                                           | Causes the query to return matching tags as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](https://twig.symfony.com/doc/2.x/tags/extends.html)       | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                              |
| [limit](https://twig.symfony.com/doc/2.x/tags/for.html)               | Determines the number of tags that should be returned.                                                                                                                                                                                                                                 |
| [offset](https://twig.symfony.com/doc/2.x/tags/from.html)             | Determines how many tags should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#header)                                                    | レスポンスに HTML ヘッダーをセットします。                                                                                                                                                                                                                                                               |
| [preferSites](#hook)                                                  | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                          |
| [relatedTo](#html)                                                    | Narrows the query results to only tags that are related to certain other elements.                                                                                                                                                                                                     |
| [search](https://twig.symfony.com/doc/2.x/tags/if.html)               | Narrows the query results to only tags that match a search query.                                                                                                                                                                                                                      |
| [site](https://twig.symfony.com/doc/2.x/tags/import.html)             | Determines which site(s) the tags should be queried in.                                                                                                                                                                                                                                |
| [siteId](https://twig.symfony.com/doc/2.x/tags/include.html)          | Determines which site(s) the tags should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [title](#js)                                                          | Narrows the query results based on the tags’ titles.                                                                                                                                                                                                                                   |
| [trashed](https://twig.symfony.com/doc/2.x/tags/macro.html)           | Narrows the query results to only tags that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#namespace)                                                     | Narrows the query results based on the tags’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#nav)                                                        | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                      |
| [uri](#paginate)                                                      | Narrows the query results based on the tags’ URIs.                                                                                                                                                                                                                                     |
| [inReverse](#redirect)                                                | Causes the query to return matching tags eager-loaded with related elements.                                                                                                                                                                                                           |
| [requireGuest](#requireguest)                                         | ユーザーがログインしていない必要があります。                                                                                                                                                                                                                                                                 |
| [requireLogin](#requirelogin)                                         | ユーザーがログインしている必要があります。                                                                                                                                                                                                                                                                  |
| [requirePermission](#requirepermission)                               | 特定の権限を持つユーザーがログインしている必要があります。                                                                                                                                                                                                                                                          |
| [group](https://twig.symfony.com/doc/2.x/tags/set.html)               | 変数をセットします。                                                                                                                                                                                                                                                                             |
| [script](#script)                                                     | Renders an HTML script tag on the page.                                                                                                                                                                                                                                                |
| [switch](#switch)                                                     | 指定された値に基づいて、テンプレートの出力を切り替えます。                                                                                                                                                                                                                                                          |
| [tag](#tag)                                                           | `{% paginate %}` タグに続けて [for](https://twig.symfony.com/doc/tags/for.html) タグを利用し、このページの結果をループする必要があります。                                                                                                                                                                                |
| [use](https://twig.symfony.com/doc/2.x/tags/use.html)                 | 別のテンプレートを水平方向に継承します。                                                                                                                                                                                                                                                                   |
| [verbatim](https://twig.symfony.com/doc/2.x/tags/verbatim.html)       | ネストされた Twig コードの解析を無効にします。                                                                                                                                                                                                                                                             |
| [with](https://twig.symfony.com/doc/2.x/tags/with.html)               | ネストされたテンプレートのスコープを作成します。                                                                                                                                                                                                                                                               |

## `search`

タグを作成する前に、それらを含めるためのタググループを作成しなければなりません。

```twig
{% cache %}
  {% for block in entry.myMatrixField.all() %}
    <p>{{ block.text }}</p>
  {% endfor %}
{% endcache %}
```

新しいタググループを作るには、「設定 > タグ」に移動し、「新しいタググループ」ボタンをクリックします。

By default, cached output will be kept by URL without regard for the query string.

While carefully-placed `{% cache %}` tags can offer significant boosts to performance, it’s important to know how the cache tag’s parameters can be used to fine-tune its behavior.

::: tip
The `{% cache %}` tag captures code and styles registered with `{% js %}`, \ `{% script %}` and `{% css %}` tags.
:::

<small>
Warning: If you’re suffering from abnormal page load times, you may be experiencing a suboptimal hosting environment. Please consult a specialist before trying <b>{% cache %}</b>. <b>{% cache %}</b> is not a substitute for fast database connections, efficient templates, or moderate query counts. Possible side effects include stale content, excessively long-running background tasks, stuck tasks, and in rare cases, death. Ask your hosting provider if <b>{% cache %}</b> is right for you.
</small>

### パラメータ

You can fetch tags in your templates or PHP code using **tag queries**.

#### `anyStatus`

::: code

```twig
// Create a new tag query
$myTagQuery = \craft\elements\Tag::find();
```

#### `asArray`

キャッシュが使用するキーの名前を指定します。 キーを変更すると、タグのコンテンツは再レンダリングされます。 これを指定しない場合、Twig がテンプレートを再解析するたびにランダムなキーが生成されます。

```twig
{# Create a tag query with the 'group' parameter #}
{% set myTagQuery = craft.tags()
    .group('blogTags') %}

{# Fetch the tags #}
{% set tags = myTagQuery.all() %}

{# Display the tag list #}
<ul>
    {% for tag in tags %}
        <li><a href="{{ url('blog/tags/'~tag.id) }}">{{ tag.title }}</a></li>
    {% endfor %}
</ul>
```

::: warning
If you change template code within a `{% cache %}` that uses a custom key, existing template caches will not automatically be purged. Either assign the tag a new key, or clear your existing template caches manually by navigating to **Utilities** → **Caches** and clearing **Data caches**.
:::

動的キーを指定し、[globally](#globally) と組み合わせることで、テンプレートキャッシュをより細かくコントールできます。 例えば、デフォルトでは無視されるクエリ文字列 *と* URL に基づいてキャッシュすることができます。

```twig
{# Fetch all tags, regardless of status #}
{% set tags = craft.tags()
    .anyStatus()
    .all() %}
```

#### `clearCachedResult`

We can display a list of the tags in a “Blog Tags” tag group by doing the following:

```twig
// Fetch all tags, regardless of status
$tags = \craft\elements\Tag::find()
    ->anyStatus()
    ->all();
```

Tag queries support the following parameters:

- with a URI of `foo`.
- from a site with an ID of `1` or `2`.
- ::: code
- from the site with a handle of `foo`.
- with a title of `Foo`.
- Fetch the tags with `.all()`.
- ::: code
- ::: code
- ::: code
- ::: code
- from a site with a handle of `foo` or `bar`.

ヒント：このパラメータが省略される場合、コンフィグ設定 <config3:cacheDuration> がデフォルトの継続時間を定義するために使用されます。

#### `dateCreated`

::: code

```twig
{# Fetch tags as arrays #}
{% set tags = craft.tags()
    .asArray()
    .all() %}
```

::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::

#### `dateUpdated`

Causes the query to return matching tags as arrays of data, rather than [Tag](craft3:craft\elements\Tag) objects.

```twig
{## Only cache if this is a mobile browser #}
{% cache if craft.app.request.isMobileBrowser() %}
```

#### `fixedOrder`

::: code

```twig
{## Don't cache if someone is logged in #}
{% cache unless currentUser %}
```

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Cache Clearing

Clears the cached result.

Narrows the query results based on the tags’ creation dates.

Possible values include:

```bash
// Fetch tags created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$tags = \craft\elements\Tag::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```

### When to Use `{% cache %}` Tags

::: code

それらを使用する場合のいくつかの例です。

- エントリの大きなリスト
- いくつかのブロックが関連フィールドを持ち、独自のデータベースクエリをページに追加している行列フィールドのループ
- 他のサイトからデータを取得しているときはいつでも

Narrows the query results based on the tags’ last-updated dates.

- 静的なテキストにキャッシュを使用しないでください。 シンプルにテキストを出力するよりも、コストが高くなります。
- 他を拡張するテンプレート内で、トップレベルの `{% block %}` タグの外側で使用することはできません。

::: tip
The `{% cache %}` tag detects ungenerated [image transform](../image-transforms.md) URLs within it. When it finds any, it holds off caching the template until the next request so those temporary image URLs aren’t cached.
:::

## `site`

::: code

```twig
{# Register a CSS file #}
{% css "/assets/css/style.css" %}

{# Register a CSS code block #}
{% css %}
  .content {
    color: {{ entry.textColor }};
  }
{% endcss %}
```

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### パラメータ

Causes the query results to be returned in the order specified by [id](#id).

#### `with`

::: code

```twig
// Fetch tags updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$tags = \craft\elements\Tag::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```

属性は <yii2:yii\helpers\BaseHtml::renderTagAttributes()> によってレンダリングされます。

## `uid`

このタグはブラウザに変数をダンプしてから、リクエストを終了します。 （`dd` は「Dump-and-Die」の略です。

```twig
{# Fetch tags in a specific order #}
{% set tags = craft.tags()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

## `offset`

Possible values include:

```twig
{% set entry = craft.entries.id(entryId).one() %}

{% if not entry %}
  {% exit 404 %}
{% endif %}
```

### パラメータ

::: code

#### ステータス

レスポンスに含まれるべき HTTP ステータスコードをオプションでセットできます。 その場合、Craft はレンダリングするための適切なエラーテンプレートを探します。 例えば、`{% exit 404 %}` は Craft に `404.twig` テンプレートを返します。 If the template doesn’t exist. テンプレートが存在しない場合、Craft はそのステータスコードに対応する独自のテンプレートをフォールバックします。

## `title`

Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

```twig
{## Tell the browser to cache this page for 30 days #}
{% set expiry = now|date_modify('+30 days') %}

{% header "Cache-Control: max-age=" ~ (expiry.timestamp - now.timestamp) %}
{% header "Pragma: cache" %}
{% header "Expires: " ~ expiry|date('D, d M Y H:i:s', 'GMT') ~ " GMT" %}
```

::: tip
Headers which contain dates must be formatted according to [RFC 7234](https://tools.ietf.org/html/rfc7231#section-7.1.1.2). You can use the [httpdate](filters.md#httpdate) filter (added in Craft 3.6.10) to do this:
```twig
{## Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```
:::

### パラメータ

このタグは、テンプレート内でプラグインやモジュールに追加の HTML を返すか、利用可能なテンプレート変数を変更する機会を与えます。

#### ヘッダー

`header` の後に文字列として記述することによって、実際のヘッダーを明示します。 このパラメータは必須です。

## `trashed`

`{% html %}` タグは、ページに任意の HTML コードを登録するために利用できます。

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

::: tip
タグを <craft3:craft\web\View::registerHtml()> の中で呼び出し、グローバルな変数 `view` 経由でアクセスすることもできます。

## `siteId`

`{% paginate %}` タグは、次のパラメータを持っています。

```twig
{% html %}
  <p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>
{% endhtml %}
```

`{% html %}` タグは、次のパラメータをサポートしています。

```twig
{% set para = '<p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>' %}
{% do view.registerHtml(para) %}
```
:::

### パラメータ

デフォルトでは、`at endBody` が利用されます。

#### 位置

`{% js %}` タグは JavaScript ファイルや JavaScript コードブロックを登録するために利用できます。

| Value                                            | 説明                                                   |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were created on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were created before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01. |

```twig
{% html at head %}
```

::: tip
JavaScript ファイルを登録するには、URL の末尾が `.js` でなければなりません。
:::

## `id`

`{% js %}` タグは、次のパラメータをサポートしています。

```twig
{# Register a JS file #}
{% js "/assets/js/script.js" %}

{# Register a JS code block #}
{% js %}
  _gaq.push([
    "_trackEvent",
    "Search",
    "{{ searchTerm|e('js') }}"
  ]);
{% endjs %}
```

次の位置キーワードのいずれかを使用して、ページの `<script>` を追加する場所を指定できます。

デフォルトでは、`at endBody` が利用されます。
```twig
{% set myJsFile = "/assets/js/script.js" %}
{% do view.registerJsFile(myJsFile) %}
```
:::

### パラメータ

`<script>` タグに含まれるべき、HTML 属性。

#### 位置

属性は <yii2:yii\helpers\BaseHtml::renderTagAttributes()> によってレンダリングされます。

| Value                                            | 説明                                                     |
| ------------------------------------------------ | ------------------------------------------------------ |
| `'>= 2018-04-01'`                             | that were updated on or after 2018-04-01.              |
| `'< 2018-05-01'`                              | that were updated before 2018-05-01                    |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.   |
| `on load`                                        | ページの `<body>` の最後、`jQuery(window).load()` の中で    |
| `on ready`                                       | ページの `<body>` の最後、`jQuery(document).ready()` の中で |

```twig
{% js at head %}
```

By default, `at endBody` will be used.

::: warning
位置を `on load` または `on ready` にセットすると、（テンプレートがすでに独自のコピーを含めている場合でも）Craft はページに jQuery の内部コピーを読み込みます。 そのため、フロントエンドのテンプレートで利用するのは避けてください。 :::
:::

#### `with`

例えば、これは

```twig
{% js "/assets/js/script.js" with {
  defer: true
} %}
```

次のようになるでしょう。

::: warning
`with` パラメータは、JavaScript ファイルを指定したい場合のみ有効です。 JavaScript コードブロックでは効果がありません。 :::
:::

## `namespace`

`{% namespace %}` タグは、CSS セレクタだけでなく、入力項目の name や HTML 属性の名前空間を割り当てるために利用されます。

次のような結果になるでしょう。

```twig
{% namespace 'foo' %}
<style>
  .text { font-size: larger; }
  #title { font-weight: bold; }
</style>
<input class="text" id="title" name="title" type="text">
{% endnamespace %}
```

::: tip
このタグは、最初に <craft3:craft\web\View::setNamespace()> を呼び出すことを除いて [namespace](filters.md#namespace) フィルタと同様に機能するため、その中で実行される PHP コードは、ネストされた ID がどうなるのかを知ることができます。
:::

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

このタグは、[ストラクチャーセクション](../entries.md#section-types)や[カテゴリグループ](../categories.md)のエントリの階層的なナビゲーションメニューを作成するのに役立ちます。

クラス名にも名前空間を割り当てたい場合、`withClasses` を追加してください。 クラス CSS セレクタと `class` 属性の両方に影響します。

```twig
{% namespace 'foo' withClasses %}
```

That would result in:

```html{2,5}
<style>
  .foo-text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="foo-text" id="foo-title" name="foo[title]" type="text">
```

::: tip
This tag works identically to the [namespace](filters.md#namespace) filter, except that it will call <craft3:craft\web\View::setNamespace()> at the beginning, so any PHP code executed within it can be aware of what the nested IDs will become.
:::

## `nav`

This tag helps create a hierarchical navigation menu for entries in a [Structure section](../entries.md#section-types) or a [Category Group](../categories.md).

```twig
{% set entries = craft.entries.section('pages').all() %}

<ul id="nav">
  {% nav entry in entries %}
    <li>
      <a href="{{ entry.url }}">{{ entry.title }}</a>
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
`{% nav %}` タグは、エレメントを階層的に表示したい、かつ、DOM で階層構造を表現したいとき _だけ_ 利用するべきです。 エレメントを直線的にループしたい場合、代わりに Twig の [for](https://twig.symfony.com/doc/tags/for.html) タグを利用してください。 :::
:::

### パラメータ

エレメントが実際に子を持っているときだけ、子を取り囲む追加 HTML を表示したい場合、`{% children %}` タグを `{% ifchildren %}` と `{% endifchildren %}` タグで囲みます。

#### アイテム名

「`{% nav`」に続く最初のものは、例えば `item`、`entry`、または、`category` のような、ループ内のそれぞれのアイテムを表すために利用する変数名です。 この変数名を利用して、ループ内のアイテムを参照します。

#### `orderBy`

次に「`in`」という単語の記述が必要で、その後にタグがループ処理するエントリの配列が続きます。 これは、エレメントの配列、または、[エレメントクエリ](../element-queries.md)にできます。

::: warning
`{% nav %}` タグは特定の（階層的な）順序でエレメントを照会する必要があります。 そのため、このタグと関連して `order` 基準パラメータを上書きしないよう確認してください。 :::
:::

### 子エレメントの表示

`{% nav %}` タグは、次のパラメータを持っています。

::: warning
リクエストごとに、単一の `{% paginate %}` タグだけを利用しなければなりません。
:::

::: warning
Don’t add any special logic between your `{% ifchildren %}` and `{% endifchildren %}` tags. These are special tags that are used to identify the raw HTML that should be output surrounding nested nav items. They don’t get parsed in the order you’d expect.
:::

## `preferSites`

このタグは、複数ページにわたるクエリ結果を簡単にページ割りできます。

```twig
{% set query = craft.entries()
  .section('blog')
  .limit(10) %}

{% paginate query as pageInfo, pageEntries %}

{% for entry in pageEntries %}
  <article>
    <h1>{{ entry.title }}</h1>
    {{ entry.body }}
  </article>
{% endfor %}

{% if pageInfo.prevUrl %}<a href="{{ pageInfo.prevUrl }}">Previous Page</a>{% endif %}
{% if pageInfo.nextUrl %}<a href="{{ pageInfo.nextUrl }}">Next Page</a>{% endif %}
```

ページ付けされた URL は最初のページ URL と同一になりますが、最後に「/p_X_」（_X_ はページ番号）が追加されます。 例：`http://my-project.test/news/p2`。

::: tip
You can use the <config3:pageTrigger> ::: tip URL の実際のページ番号の前にあるものをカスタマイズするために、コンフィグ設定 例えば、`'page/'`  をセットすると、ページ付けされた URL は `http://my-project.test/news/page/2` のようになります。 :::
:::

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### パラメータ

::: tip
ここに変数名を1つだけ指定した場合、後方互換性のために変数 `pageInfo` はデフォルトで `paginate` と呼ばれます。
:::

#### Querying Tags

`{% paginate %}` タグに渡す最初のものは、ページ割りしたいすべての結果を定義する（[エレメントクエリ](../element-queries.md)のような）クエリオブジェクトです。 `limit` パラメータを使用して、ページごとに表示する結果の数を定義します（デフォルトは 100）。

::: warning
このパラメータは実際のクエリオブジェクトである必要があります。 プリフェッチされた結果の配列ではありません。 そのため、それを渡す前のクエリで `all()` をコールしないでください。 :::
:::

#### `relatedTo`

変数 `pageInfo`（または、あなたが命名した変数）は次のプロパティやメソッドを提供します。

- `as pageInfo, pageEntries`
- `as pageEntries`

ここで設定されることは、次の通りです。

- `pageInfo` には、現在のページに関する情報や他のページへのリンクを作成するためのいくつかのヘルパーメソッドを提供する <craft3:craft\web\twig\variables\Paginate> オブジェクトがセットされます。 （詳細は[こちら](#the-pageInfo-variable)を参照してください。 ）
- `pageEntries` には、現在のページに属する結果（例：エレメント）の配列がセットされます。

::: tip
If you only specify one variable name here, the `pageInfo` variable will be called `paginate` by default for backwards compatibility.
:::

### 結果の表示

`{% paginate %}` タグは、現在のページの結果を実際に出力するわけではありません。 （`as` パラメータで定義された変数によって参照される）現在のページにあるべき結果の配列を提供するだけです。

最初のページと最後のページのリンクをミックスすることもできます。

```twig
{% paginate craft.entries.section('blog').limit(10) as pageEntries %}

{% for entry in pageEntries %}
  <article>
    <h1>{{ entry.title }}</h1>
    {{ entry.body }}
  </article>
{% endfor %}
```

### `pageInfo` 変数

最初と最後のページは常に存在するため、条件文でこれらをラップする理由はありません。

- **`pageInfo.first`** – 現在のページの最初の結果のオフセット。
- **`pageInfo.last`** – 現在のページの最後のエレメントのオフセット。
- **`pageInfo.total`** – すべてのページの結果の合計数。
- **`pageInfo.currentPage`** – 現在のページ番号。
- **`pageInfo.totalPages`** – すべてのページ数。
- **`pageInfo.prevUrl`** – 前のページの URL、または、最初のページにいる場合は `null`。
- **`pageInfo.nextUrl`** – 次のページの URL、または、最後のページにいる場合は `null`。
- **`pageInfo.firstUrl`** – 最初のページの URL。
- **`pageInfo.lastUrl`** – 最後のページの URL。
- **`pageInfo.getPageUrl( page )`** – 指定されたページ番号の URL、または、ページが存在しない場合は `null` を返します。
- **`pageInfo.getPrevUrls( [dist] )`** – キーにページ番号がセットされた、前のページの URL の配列を返します。 URL は昇順で返されます。 現在のページから到達可能な最大距離をオプションとして渡すことができます。
- **`pageInfo.getNextUrls( [dist] )`** – キーにページ番号がセットされた、次のページの URL の配列を返します。 URL は昇順で返されます。 現在のページから到達可能な最大距離をオプションとして渡すことができます。
- **`pageInfo.getRangeUrls( start, end )`** – キーにページ番号がセットされた、指定したページ番号の範囲のページ URL の配列を返します。
- **`pageInfo.getDynamicRangeUrls( max )`** – Returns an array of URLs to pages in a dynamic range of page numbers that surround (and include) the current page, with keys set to the page numbers.

### Example

変数 [pageInfo](#the-pageInfo-variable) は、あなたに合ったページナビゲーションを作るための沢山のオプションを提供します。 ここにいつくかの一般的な例があります。

#### 前 / 次のページリンク

単純に前のページと次のページのリンクを表示させたいなら、次のようにできます。

```twig
{% set query = craft.entries()
  .section('blog')
  .limit(10) %}

{% paginate query as pageInfo, pageEntries %}

{% if pageInfo.prevUrl %}<a href="{{ pageInfo.prevUrl }}">Previous Page</a>{% endif %}
{% if pageInfo.nextUrl %}<a href="{{ pageInfo.nextUrl }}">Next Page</a>{% endif %}
```

このタグは、ブラウザを別の URL にリダイレクトします。

#### 最初 / 最後のページリンク

`{% redirect %}` タグは、次のパラメータを持っています。

```twig
{% set query = craft.entries()
  .section('blog')
  .limit(10) %}

{% paginate query as pageInfo, pageEntries %}

<a href="{{ pageInfo.firstUrl }}">First Page</a>
{% if pageInfo.prevUrl %}<a href="{{ pageInfo.prevUrl }}">Previous Page</a>{% endif %}
{% if pageInfo.nextUrl %}<a href="{{ pageInfo.nextUrl }}">Next Page</a>{% endif %}
<a href="{{ pageInfo.lastUrl }}">Last Page</a>
```

前、または、次のページが常に存在するとは限らないため、これらのリンクを条件文でラップしていることに注意してください。

#### 近くのページリンク

デフォルトでは、 リダイレクトはステータスコード `302` を持っていて、リクエストされた URL がリダイレクトされた URL に _一時的に_ 移動されたことをブラウザに伝えます。

```twig
{% set query = craft.entries()
  .section('blog')
  .limit(10) %}

{% paginate query as pageInfo, pageEntries %}

<a href="{{ pageInfo.firstUrl }}">First Page</a>
{% if pageInfo.prevUrl %}<a href="{{ pageInfo.prevUrl }}">Previous Page</a>{% endif %}

{% for page, url in pageInfo.getPrevUrls(5) %}
  <a href="{{ url }}">{{ page }}</a>
{% endfor %}

<span class="current">{{ pageInfo.currentPage }}</span>

{% for page, url in pageInfo.getNextUrls(5) %}
  <a href="{{ url }}">{{ page }}</a>
{% endfor %}

{% if pageInfo.nextUrl %}<a href="{{ pageInfo.nextUrl }}">Next Page</a>{% endif %}
<a href="{{ pageInfo.lastUrl }}">Last Page</a>
```

この例では、現在のページからいずれかの方向に5ページのリンクを表示しているだけです。 多かれ少なかれ表示することを望むなら、`getPrevUrls()` と `getNextUrls()` に渡す数値を変更してください。 いずれの数値も渡さないよう選択することもできます。 その場合、 *すべての* 前 / 次のページ URL が返されます。

## `redirect`

`with notice`、および / または、`with error` パラメータを利用して、次のリクエスト時にユーザーへ表示するフラッシュメッセージをオプションでセットできます。

```twig
{% if not user or not user.isInGroup('members') %}
  {% redirect "pricing" %}
{% endif %}
```

### パラメータ

`{% header %}` タグは、次のパラメータをサポートしています。

#### URL

「`{% redirect`」と入力したすぐ後に、ブラウザがリダイレクトする場所をタグに伝える必要があります。 完全な URL を与えることも、パスだけ指定することもできます。

#### ステータスコード

By default, redirects will have `302` status codes, which tells the browser that the requested URL has only been moved to the redirected URL _temporarily_.

リダイレクトのレスポンスに伴うステータスコードは、URL の直後に入力することでカスタマイズできます。 例えば、次のコードは `301` リダイレクト（永続的）を返します。

```twig
{% redirect "pricing" 301 %}
```

#### フラッシュメッセージ

You can optionally set flash messages that will show up for the user on the next request using the `with notice` and/or `with error` params:

```twig
{% if not currentUser.isInGroup('members') %}
  {% redirect "pricing" 301 with notice "You have to be a member to access that!" %}
{% endif %}
```

## `requireGuest`

このタグは、ユーザーがログインしていることを保証します。 そうでない場合、ログインページにリダイレクトし、ログインに成功した後で元のページに戻ります。 <config3:postLoginRedirect> config setting.

```twig
{% requireGuest %}
```

条件文の中を含め、テンプレートのどこにでもこのタグを記述できます。 Twig がそれに到達すると、ゲストが強制されます。

## `requireLogin`

This tag will ensure that the user is logged in. If they aren’t, they’ll be redirected to a Login page and returned to the original page after successfully logging in.

```twig
{% requireLogin %}
```

条件文の中を含め、テンプレートのどこにでもこのタグを記述できます。 Twig がそれに到達すると、ログインが強制されます。

ログインページの場所は、コンフィグ設定 <config3:loginPath> config setting. If you do not set <config3:loginPath>を設定しない場合、デフォルトで `login` になります。 カスタムテンプレートで `/login` ルートを処理していない場合、`404` エラーが返されます。 コントロールパネルのログインフォームを使用するには、`admin/login` または `[your cpTrigger]/login` をセットしてください。

## `requirePermission`

このタグは、現在のユーザーが特定の権限を持つアカウントでログインしていることを保証します。

```twig
{% requirePermission 'stayUpLate' %}
```

ユーザーは、直接またはユーザーグループの1つを通して権限を持つことができます。 もし権限を持っていないなら、403（Forbidden）エラーが提供されます。

利用可能な権限のリストは、[ユーザー](../users.md#permissions)ページを参照してください。

## `script`

Similar to the [`{% js %}`](#js) tag, but with full control over the resulting `<script>` tag’s attributes.

```twig
{% script with {type: 'module'} %}
// some JavaScript
{% endscript %}
```

## `switch`

「Switch 文」は、いくつかの反復的な `{% if %}` 条件を使う代わりに、複数の可能性がある値に対して変数を比較するクリーンな方法を提供します。

このテンプレートの例では、行列ブロックのタイプによって異なるテンプレートを実行します。

```twig
{% if matrixBlock.type == "text" %}
  {{ matrixBlock.textField|markdown }}
{% elseif matrixBlock.type == "image" %}
  {{ matrixBlock.image[0].getImg() }}
{% else %}
  <p>A font walks into a bar.</p>
  <p>The bartender says, “Hey, we don’t serve your type in here!”</p>
{% endif %}
```

条件文のすべてが同じもの – `matrixBlock.type` – を評価しているため、代わりに `{% switch %}` タグを利用してコードを簡略化できます。

```twig
{% switch matrixBlock.type %}
  {% case "text" %}
    {{ matrixBlock.textField|markdown }}
  {% case "image" %}
    {{ matrixBlock.image[0].getImg() }}
  {% default %}
    <p>A font walks into a bar.</p>
    <p>The bartender says, “Hey, we don’t serve your type in here!”</p>
{% endswitch %}
```

::: tip
他の言語の `switch` 文とは異なり、マッチする `case` ブロックは自動的に終了します。 `break` ステートメントについて、心配する必要はありません。 :::
:::

### 単一の `{% case %}` タグで複数の値をチェックする

単一の `{% case %}` タグで複数の値をチェックしたい場合、`or` 演算子で値を区切ってください。

```twig
{% case "h2" or "h3" or "p" %}
  {# output an <h2>, <h3>, or <p> tag, depending on the block type #}
  {{ tag(matrixBlock.type, {
      text: matrixBlock.text
  }) }}
```

### 親の `loop` 変数へのアクセス

`{% for %}`  ループ内で `{% switch %}` タグを使う場合、`{% switch %}` タグの内側で Twig の [ループ変数](https://twig.symfony.com/doc/tags/for.html#the-loop-variable) に直接アクセスすることはできません。  代わりに、次のようにアクセスできます。

```twig
{% for matrixBlock in entry.matrixField.all() %}
  {% set loopIndex = loop.index %}

  {% switch matrixBlock.type %}

    {% case "text" %}

        Loop #{{ loopIndex }}

  {% endswitch %}
{% endfor %}
```

## `tag`

プラグインやモジュールが `{% hook %}` タグで作動できる詳細については、[テンプレートフック](../extend/template-hooks.md)を参照してください。

::: tip
単一の `{% cache %}` タグで利用できるのは、[if](#if) **_または_** [unless](#unless) のいずれかのみです。
:::

```twig
{% tag 'p' with {
  class: 'welcome',
} %}
  Hello, {{ currentUser.friendlyName }}
{% endtag %}
{# Output: <p class="welcome">Hello, Tim</p> #}
```

`{% tag %}` tags can also be nested:
```twig
{% tag 'div' with {
  class: 'foo',
} %}
  {% tag 'p' with {
    class: 'welcome',
  } -%}
    Hello, {{ currentUser.friendlyName }}
  {%- endtag %}
{% endtag %}
{# Output: <div class="foo"><p class="welcome">Hello, Tim</p></div> #}
```

### Parameters

The `{% tag %}` tag has the following parameters:

#### Name

The first thing you must pass to the `{% tag %}` tag is the name of the node that should be rendered.

#### `with`

Next, you can optionally type “`with`” followed by an object with attributes for the node.

These will be rendered using <yii2:yii\helpers\BaseHtml::renderTagAttributes()> just like the [tag](functions.md#tag) function, except for the `html` and `text` keys because inner content will go between `{% tag %}` and `{% endtag %}` instead.

If an attribute is set to `true`, it will be added without a value:

```twig
{% tag 'textarea' with {
  name: 'message',
  required: true
} -%}
  Please foo some bar.
{%- endtag %}
{# Output: <textarea name="message" required>Please foo some bar.</textarea> #}
```
