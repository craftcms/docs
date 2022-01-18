# タグ

Craft の Twig テンプレートで利用可能な[タグ](https://twig.symfony.com/doc/2.x/templates.html#control-structure)は、以下の通りです。

| タグ | 説明 |
--- | -----------
| [apply](https://twig.symfony.com/doc/2.x/tags/apply.html) | ネストされたテンプレートコードに Twig フィルタを適用します。 |
| [autoescape](https://twig.symfony.com/doc/2.x/tags/autoescape.html) | ネストされたテンプレートコードのエスケープ方針をコントロールします。 |
| [block](https://twig.symfony.com/doc/2.x/tags/block.html) | テンプレートブロックを定義します。 |
| [cache](#cache) | テンプレートの一部をキャッシュします。 |
| [css](#css) | ページに `<style>` タグを登録します。 |
| [dd](#dd) | ダンプして停止します。 |
| [deprecated](https://twig.symfony.com/doc/2.x/tags/deprecated.html) | PHP の非推奨エラーをトリガーします。 |
| [do](https://twig.symfony.com/doc/2.x/tags/do.html) | 実行します。 |
| [embed](https://twig.symfony.com/doc/2.x/tags/embed.html) | 別のテンプレートをエンベッドします。 |
| [exit](#exit) | リクエストを終了します。 |
| [extends](https://twig.symfony.com/doc/2.x/tags/extends.html) | 別のテンプレートを拡張します。 |
| [for](https://twig.symfony.com/doc/2.x/tags/for.html) | 配列をループします。 |
| [from](https://twig.symfony.com/doc/2.x/tags/from.html) | テンプレートからマクロをインポートします。 |
| [header](#header) | レスポンスに HTML ヘッダーをセットします。 |
| [hook](#hook) | テンプレートフックを呼び出します。 |
| [html](#html) | ページに任意の HTML コードを登録します。 |
| [if](https://twig.symfony.com/doc/2.x/tags/if.html) | ネストされたテンプレートコードを条件付きで実行します。 |
| [import](https://twig.symfony.com/doc/2.x/tags/import.html) | テンプレートからマクロをインポートします。 |
| [include](https://twig.symfony.com/doc/2.x/tags/include.html) | 別のテンプレートをインクルードします。 |
| [js](#js) | ページに `<script>` タグを登録します。 |
| [macro](https://twig.symfony.com/doc/2.x/tags/macro.html) | マクロを定義します。 |
| [namespace](#namespace) | CSS セレクタだけでなく、入力項目の name や HTML 属性に名前空間を割り当てます。 |
| [nav](#nav) | 階層的なナビゲーションメニューを作成します。 |
| [paginate](#paginate) | エレメントクエリをページ分割します。 |
| [redirect](#redirect) | ブラウザをリダイレクトします。 |
| [requireGuest](#requireguest) | ユーザーがログインしていない必要があります。 |
| [requireLogin](#requirelogin) | ユーザーがログインしている必要があります。 |
| [requirePermission](#requirepermission) | 特定の権限を持つユーザーがログインしている必要があります。 |
| [set](https://twig.symfony.com/doc/2.x/tags/set.html) | 変数をセットします。 |
| [switch](#switch) | 指定された値に基づいて、テンプレートの出力を切り替えます。 |
| [use](https://twig.symfony.com/doc/2.x/tags/use.html) | 別のテンプレートを水平方向に継承します。 |
| [verbatim](https://twig.symfony.com/doc/2.x/tags/verbatim.html) | ネストされた Twig コードの解析を無効にします。 |
| [with](https://twig.symfony.com/doc/2.x/tags/with.html) | ネストされたテンプレートのスコープを作成します。 |

## `cache`

このタグはテンプレートの一部をキャッシュします。実行する作業が減るため、後からのリクエストのパフォーマンスを向上させます。

```twig
{% cache %}
    {% for block in entry.myMatrixField.all() %}
        <p>{{ block.text }}</p>
    {% endfor %}
{% endcache %}
```

キャッシュタグはロジックではなく出力をキャッシュするためのものなので、`{{ csrfInput() }}`、フォーム項目、または、動的な出力が期待されるテンプレートの部品をキャッシュすることは避けてください。

警告：異常なページの読み込み時間で苦しむ場合、最適なホスティング環境を経験していないかもしれません。`{% cache %}` を試す前に、専門家に相談してください。`{% cache %}` は高速なデータベース接続、効率的なテンプレート、または適度なクエリ数に代わるものではありません。可能性のある副作用には、古くなったコンテンツ、過度に時間のかかるバックグラウンドタスク、動かなくなったタスク、および、稀に消滅があります。`{% cache %}` が適切かどうかをホスティングプロバイダに問い合わせてください。

デフォルトでは、キャッシュされた出力はクエリ文字列に関係なく URL によって保持されます。

慎重に配置された `{% cache %}` タグは、パフォーマンスを大幅に向上させることができますが、キャッシュタグのパラメーターをどのように利用すればその挙動を微調整できるかを知ることが重要です。

### パラメータ

`{% cache %}` タグは、次のパラメータをサポートしています。

#### `globally`

URL ごとではなく、（現在のサイトロケールのための）グローバルな出力をキャッシュします。

```twig
{% cache globally %}
```

#### `using key`

キャッシュが使用するキーの名前を指定します。キーを変更すると、タグのコンテンツは再レンダリングされます。これを指定しない場合、Twig がテンプレートを再解析するたびにランダムなキーが生成されます。

```twig
{% cache using key "page-header" %}
```

::: warning
カスタムキーを利用している `{% cache %}` 内のテンプレートコードを変更する場合、既存のテンプレートキャッシュは自動的にパージされません。タグに新しいキーを割り当てるか、「ユーティリティ > キャッシュ」ツールの「データキャッシュ」を選択して、既存のテンプレートキャッシュを手動でクリアする必要があります。
:::

動的キーを指定し、[globally](#globally) と組み合わせることで、テンプレートキャッシュをより細かくコントールできます。例えば、デフォルトでは無視されるクエリ文字列 *と* URL に基づいてキャッシュすることができます。

```twig
{% set request = craft.app.request %}
{% set uriWithQueryString = request.fullUri ~ request.queryStringWithoutPath %}
{% cache globally using key uriWithQueryString %}
```

#### `for`

キャッシュが有効期限になるまでの時間。

```twig
{% cache for 3 weeks %}
```

許可される継続時間の単位は、次の通りです。

- `sec`(`s`)
- `second`(`s`)
- `min`(`s`)
- `minute`(`s`)
- `hour`(`s`)
- `day`(`s`)
- `fortnight`(`s`)
- `forthnight`(`s`)
- `month`(`s`)
- `year`(`s`)
- `week`(`s`)

ヒント：このパラメータが省略される場合、コンフィグ設定 <config3:cacheDuration> がデフォルトの継続時間を定義するために使用されます。

#### `until`

キャッシュの有効期限を [DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトで定義します。

```twig
{% cache until entry.eventDate %}
```

::: tip
単一の `{% cache %}` タグで利用できるのは、[for](#for) **_または_** [until](#until) のいずれかのみです。
:::

#### `if`

ある条件が満足される場合のみ、 `{% cache %}` タグを作動させます。

```twig
{## Only cache if this is a mobile browser #}
{% cache if craft.app.request.isMobileBrowser() %}
```

#### `unless`

ある条件が満たされる場合、`{% cache %}` タグが作動しないようにします。

```twig
{## Don't cache if someone is logged in #}
{% cache unless currentUser %}
```

::: tip
単一の `{% cache %}` タグで利用できるのは、[if](#if) **_または_** [unless](#unless) のいずれかのみです。
:::

### キャッシュのクリア

タグ内のエレメント（エントリ、アセットなど）が保存または削除されると、テンプレートキャッシュは自動的にクリアされます。

タグ内にエレメント _クエリ_（例：`craft.entries`）を持ち、クエリの1つによって返される新しいエレメントを作成する場合、Craft はそれを判断してキャッシュをクリアすることもできます。

ユーティリティページから「キャッシュをクリア」ツールを利用、または、コンソールコマンド `invalidate-tags/template` を利用して、テンプレートキャッシュを手動でクリアすることもできます。

```bash
php craft invalidate-tags/template
```

### どんなときに `{% cache %}` タグを使うのか

沢山のデータベースクエリを引き起こすテンプレートがある場合、または Twig の計算上非常にコストがかかる処理を行っているときは、`{% cache %}` タグを使うべきです。

それらを使用する場合のいくつかの例です。

* エントリの大きなリスト
* いくつかのブロックが関連フィールドを持ち、独自のデータベースクエリをページに追加している行列フィールドのループ
* 他のサイトからデータを取得しているときはいつでも

それらを使用するのがよいアイデア _ではない_ 場合のいくつかの例です。

* 静的なテキストにキャッシュを使用しないでください。シンプルにテキストを出力するよりも、コストが高くなります。
* 他を拡張するテンプレート内で、トップレベルの `{% block %}` タグの外側で使用することはできません。
* `{% cache %}` タグは HTML のみキャッシュします。そのため、キャッシュ対象となる実際の HTML を出力しない [{% css %}](#css) や [{% js %}](#js) のようなタグの内部で使うことは、意味をなしません。

   ```twig
   {## Bad: #}

   {% extends "_layout" %}
   {% cache %}
       {% block "content" %}
           ...
       {% endblock %}
   {% endcache %}

   {## Good: #}

   {% extends "_layout" %}
   {% block "content" %}
       {% cache %}
           ...
       {% endcache %}
   {% endblock %}
   ```


ヒント：`{% cache %}` タグは、その中にまだ生成されていない[画像変換](../image-transforms.md) URL が含まれるかどうかを検出します。それが含まれる場合、次のリクエストまでテンプレートのキャッシュを保留するため、一時的な画像 URL はキャッシュされません。

## `css`

`{% css %}` タグは、CSS ファイルや CSS コードブロックを登録するために利用できます。

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

::: tip
CSS ファイルを登録するには、URL の末尾が `.css` でなければなりません。
:::

### パラメータ

`{% css %}` タグは、次のパラメータをサポートしています。

#### `with`

`<style>` タグに含まれるべき、HTML 属性。

```twig
{% css with {type: 'text/css'} %}
```

属性は <yii2:yii\helpers\BaseHtml::renderTagAttributes()> によってレンダリングされます。

## `dd`

このタグはブラウザに変数をダンプしてから、リクエストを終了します。（`dd` は「Dump-and-Die」の略です。）

```twig
{% set entry = craft.entries.id(entryId).one() %}
{% dd entry %}
```

## `exit`

このタグは残りのテンプレートの実行を防ぎ、リクエストを終了します。

```twig
{% set entry = craft.entries.id(entryId).one() %}

{% if not entry %}
    {% exit 404 %}
{% endif %}
```

### パラメータ

`{% exit %}` タグは、次のパラメータをサポートしています。

#### ステータス

レスポンスに含まれるべき HTTP ステータスコードをオプションでセットできます。その場合、Craft はレンダリングするための適切なエラーテンプレートを探します。例えば、`{% exit 404 %}` は Craft に `404.twig` テンプレートを返します。テンプレートが存在しない場合、Craft はそのステータスコードに対応する独自のテンプレートをフォールバックします。

## `header`

このタグは、レスポンス上に新しい HTTP ヘッダーをセットします。

```twig
{## Tell the browser to cache this page for 30 days #}
{% set expiry = now|date_modify('+30 days') %}

{% header "Cache-Control: max-age=" ~ (expiry.timestamp - now.timestamp) %}
{% header "Pragma: cache" %}
{% header "Expires: " ~ expiry|date('D, d M Y H:i:s', 'GMT') ~ " GMT" %}
```

### パラメータ

`{% header %}` タグは、次のパラメータをサポートしています。

#### ヘッダー

`header` の後に文字列として記述することによって、実際のヘッダーを明示します。このパラメータは必須です。

## `hook`

このタグは、テンプレート内でプラグインやモジュールに追加の HTML を返すか、利用可能なテンプレート変数を変更する機会を与えます。

```twig
{## Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

プラグインやモジュールが `{% hook %}` タグで作動できる詳細については、[テンプレートフック](../extend/template-hooks.md)を参照してください。

## `html`

`{% html %}` タグは、ページに任意の HTML コードを登録するために利用できます。

```twig
{% html %}
    <p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>
{% endhtml %}
```

::: tip
タグを <craft3:craft\web\View::registerHtml()> の中で呼び出し、グローバルな変数 `view` 経由でアクセスすることもできます。

```twig
{% set para = '<p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>' %}
{% do view.registerHtml(para) %}
```
:::

### パラメータ

`{% html %}` タグは、次のパラメータをサポートしています。

#### 位置

いずれかの位置キーワードを利用して、HTML コードがページに挿入されるべき場所を指定できます。

| キーワード | 説明 |
| ------- | -----------
| `at head` | ページの `<head>` 内 |
| `at beginBody` | ページの `<body>` の先頭 |
| `at endBody` | ページの `<body>` の最後 |

```twig
{% html at head %}
```

デフォルトでは、`at endBody` が利用されます。

## `js`

`{% js %}` タグは JavaScript ファイルや JavaScript コードブロックを登録するために利用できます。

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

::: tip
JavaScript ファイルを登録するには、URL の末尾が `.js` でなければなりません。
:::

### パラメータ

`{% js %}` タグは、次のパラメータをサポートしています。

#### 位置

次の位置キーワードのいずれかを使用して、ページの `<script>` を追加する場所を指定できます。

| キーワード | 説明 |
| ------- | -----------
| `at head` | ページの `<head>` 内 |
| `at beginBody` | ページの `<body>` の先頭 |
| `at endBody` | ページの `<body>` の最後 |
| `on load` | ページの `<body>` の最後、`jQuery(window).load()` の中で |
| `on ready` | ページの `<body>` の最後、`jQuery(document).ready()` の中で |

```twig
{% js at head %}
```

デフォルトでは、`at endBody` が利用されます。

::: warning
位置を `on load` または `on ready` にセットすると、（テンプレートがすでに独自のコピーを含めている場合でも）Craft はページに jQuery の内部コピーを読み込みます。そのため、フロントエンドのテンプレートで利用するのは避けてください。
:::

#### `with`

`<script>` タグに含まれるべき、HTML 属性。

```twig
{% js "/assets/js/script.js" with {
    defer: true
} %}
```

属性は <yii2:yii\helpers\BaseHtml::renderTagAttributes()> によってレンダリングされます。

::: warning
`with` パラメータは、JavaScript ファイルを指定したい場合のみ有効です。JavaScript コードブロックでは効果がありません。
:::

## `namespace`

`{% namespace %}` タグは、CSS セレクタだけでなく、入力項目の name や HTML 属性の名前空間を割り当てるために利用されます。

例えば、これは

```twig
{% namespace 'foo' %}
<style>
  .text { font-size: larger; }
  #title { font-weight: bold; }
</style>
<input class="text" id="title" name="title" type="text">
{% endnamespace %}
```

次のようになるでしょう。

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

CSS セレクタの `#title` が `#foo-title`、`id` 属性が `title` から `foo-title`、さらに、`name` 属性が `title` から `foo[title]` へ変わったことに注目してください。

クラス名にも名前空間を割り当てたい場合、`withClasses` を追加してください。クラス CSS セレクタと `class` 属性の両方に影響します。

```twig
{% namespace 'foo' withClasses %}
```

次のような結果になるでしょう。

```html{2,5}
<style>
  .foo-text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="foo-text" id="foo-title" name="foo[title]" type="text">
```

::: tip
このタグは、最初に <craft3:craft\web\View::setNamespace()> を呼び出すことを除いて [namespace](filters.md#namespace) フィルタと同様に機能するため、その中で実行される PHP コードは、ネストされた ID がどうなるのかを知ることができます。
:::

## `nav`

このタグは、[ストラクチャーセクション](../entries.md#section-types)や[カテゴリグループ](../categories.md)のエントリの階層的なナビゲーションメニューを作成するのに役立ちます。


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

### パラメータ

`{% nav %}` タグは、次のパラメータを持っています。

#### アイテム名

「`{% nav`」に続く最初のものは、例えば `item`、`entry`、または、`category` のような、ループ内のそれぞれのアイテムを表すために利用する変数名です。この変数名を利用して、ループ内のアイテムを参照します。

#### `in`

次に「`in`」という単語の記述が必要で、その後にタグがループ処理するエントリの配列が続きます。これは、エレメントの配列、または、[エレメントクエリ](../element-queries.md)にできます。

::: warning
`{% nav %}` タグは特定の（階層的な）順序でエレメントを照会する必要があります。そのため、このタグと関連して `order` 基準パラメータを上書きしないよう確認してください。
:::

### 子エレメントの表示

ループ内の現在のエレメントの子を表示するには、`{% children %}` タグを利用します。Craft がこのタグを取得すると、エレメントの子をループし、`{% nav %}` と `{% endnav %}` タグの間に定義された同じテンプレートをその子に適用します。

エレメントが実際に子を持っているときだけ、子を取り囲む追加 HTML を表示したい場合、`{% children %}` タグを `{% ifchildren %}` と `{% endifchildren %}` タグで囲みます。

::: tip
`{% nav %}` タグは、エレメントを階層的に表示したい、かつ、DOM で階層構造を表現したいとき _だけ_ 利用するべきです。エレメントを直線的にループしたい場合、代わりに Twig の [for](https://twig.symfony.com/doc/tags/for.html) タグを利用してください。
:::

## `paginate`

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

ページ付けされた URL は最初のページ URL と同一になりますが、最後に「/p_X_」（_X_ はページ番号）が追加されます。例：`http://my-project.test/news/p2`。

::: tip
URL の実際のページ番号の前にあるものをカスタマイズするために、コンフィグ設定 <config3:pageTrigger> を利用できます。例えば、`'page/'`  をセットすると、ページ付けされた URL は `http://my-project.test/news/page/2` のようになります。
:::

::: warning
リクエストごとに、単一の `{% paginate %}` タグだけを利用しなければなりません。
:::

### パラメータ

`{% paginate %}` タグは、次のパラメータを持っています。

#### クエリ

`{% paginate %}` タグに渡す最初のものは、ページ割りしたいすべての結果を定義する（[エレメントクエリ](../element-queries.md)のような）クエリオブジェクトです。`limit` パラメータを使用して、ページごとに表示する結果の数を定義します（デフォルトは 100）。

::: warning
このパラメータは実際のクエリオブジェクトである必要があります。プリフェッチされた結果の配列ではありません。そのため、それを渡す前のクエリで `all()` をコールしないでください。
:::

#### `as`

次に「`as`」の記述が必要で、その後に1つまたは2つの変数名が続きます。

* `as pageInfo, pageEntries`
* `as pageEntries`

ここで設定されることは、次の通りです。

* `pageInfo` には、現在のページに関する情報や他のページへのリンクを作成するためのいくつかのヘルパーメソッドを提供する <craft3:craft\web\twig\variables\Paginate> オブジェクトがセットされます。（詳細は[こちら](#the-pageInfo-variable)を参照してください。）
* `pageEntries` には、現在のページに属する結果（例：エレメント）の配列がセットされます。

::: tip
ここに変数名を1つだけ指定した場合、後方互換性のために変数 `pageInfo` はデフォルトで `paginate` と呼ばれます。
:::

### 結果の表示

`{% paginate %}` タグは、現在のページの結果を実際に出力するわけではありません。（`as` パラメータで定義された変数によって参照される）現在のページにあるべき結果の配列を提供するだけです。

`{% paginate %}` タグに続けて [for](https://twig.symfony.com/doc/tags/for.html) タグを利用し、このページの結果をループする必要があります。

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

変数 `pageInfo`（または、あなたが命名した変数）は次のプロパティやメソッドを提供します。

* **`pageInfo.first`** – 現在のページの最初の結果のオフセット。
* **`pageInfo.last`** – 現在のページの最後のエレメントのオフセット。
* **`pageInfo.total`** – すべてのページの結果の合計数。
* **`pageInfo.currentPage`** – 現在のページ番号。
* **`pageInfo.totalPages`** – すべてのページ数。
* **`pageInfo.prevUrl`** – 前のページの URL、または、最初のページにいる場合は `null`。
* **`pageInfo.nextUrl`** – 次のページの URL、または、最後のページにいる場合は `null`。
* **`pageInfo.firstUrl`** – 最初のページの URL。
* **`pageInfo.lastUrl`** – 最後のページの URL。
* **`pageInfo.getPageUrl( page )`** – 指定されたページ番号の URL、または、ページが存在しない場合は `null` を返します。
* **`pageInfo.getPrevUrls( [dist] )`** – キーにページ番号がセットされた、前のページの URL の配列を返します。URL は昇順で返されます。現在のページから到達可能な最大距離をオプションとして渡すことができます。
* **`pageInfo.getNextUrls( [dist] )`** – キーにページ番号がセットされた、次のページの URL の配列を返します。URL は昇順で返されます。現在のページから到達可能な最大距離をオプションとして渡すことができます。
* **`pageInfo.getRangeUrls( start, end )`** – キーにページ番号がセットされた、指定したページ番号の範囲のページ URL の配列を返します。


### ナビゲーションの実例

変数 [pageInfo](#the-pageInfo-variable) は、あなたに合ったページナビゲーションを作るための沢山のオプションを提供します。ここにいつくかの一般的な例があります。

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

前、または、次のページが常に存在するとは限らないため、これらのリンクを条件文でラップしていることに注意してください。

#### 最初 / 最後のページリンク

最初のページと最後のページのリンクをミックスすることもできます。

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

最初と最後のページは常に存在するため、条件文でこれらをラップする理由はありません。

#### 近くのページリンク

おそらく現在のページ番号周辺の、近くのページのリストを作りたい場合、同様にできます。

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

この例では、現在のページからいずれかの方向に5ページのリンクを表示しているだけです。多かれ少なかれ表示することを望むなら、`getPrevUrls()` と `getNextUrls()` に渡す数値を変更してください。いずれの数値も渡さないよう選択することもできます。その場合、 *すべての* 前 / 次のページ URL が返されます。

## `redirect`

このタグは、ブラウザを別の URL にリダイレクトします。

```twig
{% if not user or not user.isInGroup('members') %}
    {% redirect "pricing" %}
{% endif %}
```

### パラメータ

`{% redirect %}` タグは、次のパラメータを持っています。

#### URL

「`{% redirect`」と入力したすぐ後に、ブラウザがリダイレクトする場所をタグに伝える必要があります。完全な URL を与えることも、パスだけ指定することもできます。

#### ステータスコード

デフォルトでは、 リダイレクトはステータスコード `302` を持っていて、リクエストされた URL がリダイレクトされた URL に _一時的に_ 移動されたことをブラウザに伝えます。

リダイレクトのレスポンスに伴うステータスコードは、URL の直後に入力することでカスタマイズできます。例えば、次のコードは `301` リダイレクト（永続的）を返します。

```twig
{% redirect "pricing" 301 %}
```

#### フラッシュメッセージ

`with notice`、および / または、`with error` パラメータを利用して、次のリクエスト時にユーザーへ表示するフラッシュメッセージをオプションでセットできます。

```twig
{% if not currentUser.isInGroup('members') %}
    {% redirect "pricing" 301 with notice "You have to be a member to access that!" %}
{% endif %}
```

## `requireGuest`

このタグは、ユーザーがログイン **していない** ことを保証します既にログインしている場合、コンフィグ設定 <config3:postLoginRedirect> で指定されたページにリダイレクトされます。

```twig
{% requireGuest %}
```

条件文の中を含め、テンプレートのどこにでもこのタグを記述できます。Twig がそれに到達すると、ゲストが強制されます。

## `requireLogin`

このタグは、ユーザーがログインしていることを保証します。そうでない場合、ログインページにリダイレクトし、ログインに成功した後で元のページに戻ります。

```twig
{% requireLogin %}
```

条件文の中を含め、テンプレートのどこにでもこのタグを記述できます。Twig がそれに到達すると、ログインが強制されます。

ログインページの場所は、コンフィグ設定 <config3:loginPath> に基づきます。<config3:loginPath> を設定しない場合、デフォルトで `login` になります。カスタムテンプレートで `/login` ルートを処理していない場合、`404` エラーが返されます。コントロールパネルのログインフォームを使用するには、`admin/login` または `[your cpTrigger]/login` をセットしてください。

## `requirePermission`

このタグは、現在のユーザーが特定の権限を持つアカウントでログインしていることを保証します。

```twig
{% requirePermission 'stayUpLate' %}
```

ユーザーは、直接またはユーザーグループの1つを通して権限を持つことができます。もし権限を持っていないなら、403（Forbidden）エラーが提供されます。

利用可能な権限のリストは、[ユーザー](../users.md#permissions)ページを参照してください。

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
他の言語の `switch` 文とは異なり、マッチする `case` ブロックは自動的に終了します。`break` ステートメントについて、心配する必要はありません。
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

`{% for %}`  ループ内で `{% switch %}` タグを使う場合、`{% switch %}` タグの内側で Twig の [ループ変数](https://twig.symfony.com/doc/tags/for.html#the-loop-variable) に直接アクセスすることはできません。代わりに、次のようにアクセスできます。

```twig
{% for matrixBlock in entry.matrixField.all() %}
    {% set loopIndex = loop.index %}

    {% switch matrixBlock.type %}

        {% case "text" %}

            Loop #{{ loopIndex }}

    {% endswitch %}
{% endfor %}
```
