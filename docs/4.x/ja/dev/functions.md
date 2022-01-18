# ファンクション

Craft の Twig テンプレートで利用可能な[ファンクション](https://twig.symfony.com/doc/2.x/templates.html#functions)は、以下の通りです。

| ファンクション | 説明 |
-------- | -----------
| [actionInput](#actioninput) | 不可視項目の `action` を出力します。 |
| [actionUrl](#actionurl) | コントローラーのアクション URL を生成します。 |
| [alias](#alias) | 文字列をエイリアスとして解析します。 |
| [attr](#attr) | HTML 属性を生成します。 |
| [attribute](https://twig.symfony.com/doc/2.x/functions/attribute.html) | 変数の動的属性にアクセスします。 |
| [beginBody](#beginbody) | 「begin body」に登録されたスクリプトやスタイルを出力します。 |
| [block](https://twig.symfony.com/doc/2.x/functions/block.html) | ブロックの出力をプリントします。 |
| [ceil](#ceil) | 整数値に切り上げます。 |
| [className](#classname) | 指定されたオブジェクトの完全修飾クラス名を返します。 |
| [clone](#clone) | オブジェクトを複製します。 |
| [combine](#combine) | 2つの配列を1つに結合します。 |
| [configure](#configure) | 渡されたオブジェクトに属性をセットします。 |
| [constant](https://twig.symfony.com/doc/2.x/functions/constant.html) | 指定された文字列の定数値を返します。 |
| [create](#create) | 新しいオブジェクトを作成します。 |
| [csrfInput](#csrfinput) | 不可視項目の CSRF トークンを返します。 |
| [cpUrl](#cpurl) | コントロールパネルの URL を生成します。 |
| [cycle](https://twig.symfony.com/doc/2.x/functions/cycle.html) | 値の配列を循環します。 |
| [date](https://twig.symfony.com/doc/2.x/functions/date.html) | 日付を作成します。 |
| [dump](https://twig.symfony.com/doc/2.x/functions/dump.html) | 変数に関する情報をダンプします。 |
| [endBody](#endbody) | 「end body」に登録されたスクリプトやスタイルを出力します。 |
| [expression](#expression) | データベース式オブジェクトを作成します。 |
| [floor](#floor) | 整数値に切り捨てます。 |
| [getenv](#getenv) | 環境変数の値を返します。 |
| [gql](#gql) | スキーマ全体に対して、GraphQL クエリを実行します。 |
| [parseEnv](#parseenv) | 文字列を環境変数、または、エイリアスとして解析します。 |
| [head](#head) | 「head」に登録されたスクリプトやスタイルを出力します。 |
| [hiddenInput](#hiddeninput) | 不可視項目を出力します。 |
| [include](https://twig.symfony.com/doc/2.x/functions/include.html) | レンダリングされたテンプレートのコンテンツを返します。 |
| [input](#input) | HTML input タグを出力します。 |
| [max](https://twig.symfony.com/doc/2.x/functions/max.html) | 配列内の最大値を返します。 |
| [min](https://twig.symfony.com/doc/2.x/functions/min.html) | 配列内の最小値を返します。 |
| [parent](https://twig.symfony.com/doc/2.x/functions/parent.html) | 親ブロックの出力を返します。 |
| [plugin](#plugin) | ハンドルに従ってプラグインのインスタンスを返します。 |
| [random](https://twig.symfony.com/doc/2.x/functions/random.html) | ランダムな値を返します。 |
| [range](https://twig.symfony.com/doc/2.x/functions/range.html) | 整数の等差数列を含むリストを返します。 |
| [raw](#raw) | 出力時に HTML エンコードされないよう、指定された文字列を`Twig\Markup` オブジェクトで囲みます。 |
| [redirectInput](#redirectinput) | 不可視項目の `redirect` を出力します。 |
| [seq](#seq) | シーケンスの次、または、現在の番号を出力します。 |
| [shuffle](#shuffle) | 配列内のアイテムの順番をランダム化します。 |
| [siteUrl](#siteurl) | フロントエンドの URL を生成します。 |
| [svg](#svg) | SVG 文書を出力します。 |
| [source](https://twig.symfony.com/doc/2.x/functions/source.html) | レンダリングせずに、テンプレートのコンテンツを返します。 |
| [tag](#tag) | HTML タグを出力します。 |
| [template_from_string](https://twig.symfony.com/doc/2.x/functions/template_from_string.html) | 文字列からテンプレートを読み込みます。 |
| [url](#url) | URL を生成します。 |

## `actionInput`

特定のコントローラーアクションのための POST リクエストをルーティングするために利用する不可視項目を出力するためのショートカット。これは、テンプレート内に直接 `<input type="hidden" name="action" value="controller/action/route">` を書き込むのと実質的に同じです。

```twig
{{ actionInput('users/save-user') }}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ actionInput('users/save-user', {
    id: 'action-input'
}) }}
```

## `actionUrl`

相対形式と絶対形式、および、アクティブな <config3:actionTrigger> 設定を自動的に考慮し、コントローラーアクションの URL を返します。

### 引数

`actionUrl()` ファンクションは、次の引数を持っています。

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** –  URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。

## `alias`

その文字列が[エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)ではじまるかをチェックする [Craft::getAlias()](yii2:yii\BaseYii::getAlias()) に、文字列を渡します。（詳細については、[コンフィギュレーション](../config/README.md#aliases)を参照してください。）

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `attr`

<yii2:yii\helpers\BaseHtml::renderTagAttributes()> を利用して、指定された[ハッシュ](twig-primer.md#hashes)に基づく HTML 属性のリストを生成します。

```twig
{% set myAttributes = {
    class: ['one', 'two'],
    disabled: true,
    readonly: false,
    data: {
        baz: 'Escape this "',
        qux: {
            some: ['data', '"quoted"']
        }
    },
    style: {
        'background-color': 'red',
        'font-size': '20px'
    },
} %}

<div {{ attr(myAttributes) }}></div>
```

## `beginBody`

「begin body」に登録されたスクリプトやスタイルを出力します。`<body>` タグの直後に配置する必要があります。

```twig
<body>
    {{ beginBody() }}

    <h1>{{ page.name }}</h1>
    {{ page.body }}
</body>
```

## `block`

ブロックの出力をプリントします。

Twig コアの [`block`](https://twig.symfony.com/doc/2.x/functions/block.html) ファンクションと同様に機能します。

## `ceil`

整数値に切り上げます。

```twig
{{ ceil(42.1) }}
{# Output: 43 #}
```

## `className`

指定されたオブジェクトの完全修飾クラス名を返します。

```twig
{% set class = className(entry) %}
{# Result: 'craft\\elements\\Entry' #}
```

## `clone`

指定されたオブジェクトのクローンを作成します。

```twig
{% set query = craft.entries.section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `combine`

2つの配列を1つに結合し、最初の配列をキー、2番目の配列を値に定義するために利用します。

```twig
{% set arr1 = ['a', 'b', 'c'] %}
{% set arr2 = ['foo', 'bar', 'baz'] %}
{% set arr3 = combine(arr1, arr2) %}
{# arr3 will now be `{a: 'foo', b: 'bar', c: 'baz'}` #}
```

## `configure`

[`Yii::configure()`](yii2:yii\BaseYii::configure()) から継承された `Craft::configure()` メソッドの振る舞いを渡します。オブジェクトに属性を適用するという点で [`create`](#create) に似ていますが、新しいインスタンスを作成する代わりに、既存のオブジェクトを受け入れて変更します。

```twig
{# Modify an `EntryQuery` object set up by a relational field: #}
{% set myRelatedEntries = configure(entry.myEntriesField, {
    section: 'blog'
}).all() %}
```

[`merge`](https://twig.symfony.com/doc/2.x/filters/merge.html) フィルタの代わりに利用することもできます。

```twig
{% set myObject = { one: 'Original' } %}
{# With `merge`: #}
{% set myObject = myObject | merge({ one: 'Overridden', two: 'New' }) %}

{# With `configure`: #}
{% do configure(myObject, { one: 'Overridden', two: 'New' }) %}
```

あまり良いアイデアではありませんが、技術的にはモデルやエレメントの属性をセットするために利用することもできます。

```twig
{% do configure(entry, { title: 'New Title' }) %}
{% do craft.app.elements.saveElement(entry) %}
```

## `constant`

指定された文字列の定数値を返します。

Twig コアの [`constant`](https://twig.symfony.com/doc/2.x/functions/constant.html) ファンクションと同様に機能します。

## `create`

与えられたクラス名やオブジェクト設定に基づいて新しいオブジェクトインスタンスを作成します。サポートされる引数の詳細については、<yii2:Yii::createObject()> を参照してください。

```twig
{# Pass in a class name #}
{% set cookie = create('yii\\web\\Cookie') %}

{# Or a full object configuration hash #}
{% set cookie = create({
    class: 'yii\\web\\cookie',
    name: 'foo',
    value: 'bar'
}) %}
```

## `cpUrl`

相対形式と絶対形式、および、アクティブな <config3:cpTrigger> 設定を自動的に考慮し、コントロールパネルの URL を返します。

```twig
<a href="{{ cpUrl('settings') }}">Visit control panel settings</a>
```

### 引数

`cpUrl()` ファンクションは、次の引数を持っています。

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** –  URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。

## `csrfInput`

不可視項目の CSRF トークンを返します。CSRF 保護が有効になっているすべてのサイトでは、POST 経由で送信するそれぞれのフォームにこれを含めなければなりません。

```twig
{{ csrfInput() }}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ csrfInput({
    id: 'csrf-input'
}) }}
```

## `endBody`

「end body」に登録されたスクリプトやスタイルを出力します。`</body>` タグの直前に配置する必要があります。

```twig
<body>
    <h1>{{ page.name }}</h1>
    {{ page.body }}

    {{ endBody() }}
</body>
```

## `expression`

データベースクエリで使用するための新しい <yii2:yii\db\Expression> オブジェクトを作成して返します。

```twig
{% set entries = craft.entries()
    .andWhere(expression('[[authorId]] = :authorId', {authorId: currentUser.id}))
    .all() %}
```

## `floor`

整数値に切り捨てます。

```twig
{{ floor(42.9) }}
{# Output: 42 #}
```

## `getenv`

環境変数の値を返します。

```twig
{{ getenv('MAPS_API_KEY') }}
```

## `gql`

スキーマ全体に対して、GraphQL クエリを実行します。

```twig
{% set result = gql('{
  entries (section: "news", limit: 2, orderBy: "dateCreated DESC") {
    postDate @formatDateTime (format: "Y-m-d")
    title
    url
    ... on news_article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300, immediately: true)
        altText
      }
    }
  }
}') %}

{% for entry in result.data %}
    <h3><a href="{{ entry.url }}">{{ entry.title }}</a></h3>
    <p class="timestamp">{{ entry.postDate }}</p>

    {% set image = entry.featuredImage[0] %}
    <img class="thumb" src="{{ image.url }}" alt="{{ image.altText }}">

    {{ entry.shortDescription|markdown }}
    <p><a href="{{ entry.url }}">Continue reading…</a></p>
{% endfor %}
```

## `parseEnv`

文字列が環境変数（`$VARIABLE_NAME`）、および / または、エイリアス（`@aliasName`）を参照しているかどうかを確認し、参照されている値を返します。

## `head`

「head」に登録されたスクリプトやスタイルを出力します。`</head>` タグの直前に配置する必要があります。

```twig
<head>
    <title>{{ siteName }}</title>
    {{ head() }}
</head>
```

## `hiddenInput`

HTML input タグを出力します。

```twig
{{ hiddenInput('entryId', entry.id) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ hiddenInput('entryId', entry.id, {
    id: 'entry-id-input'
}) }}
```

## `include`

レンダリングされたテンプレートのコンテンツを返します。

Twig コアの [`include`](https://twig.symfony.com/doc/2.x/functions/include.html) ファンクションと同様に機能します。

## `input`

HTML input タグを出力します。

```twig
{{ input('email', 'email-input', '') }}
{# Output: <input type="email" name="email-input" value=""> #}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ input('email', 'email-input', '', {
    id: 'custom-input'
}) }}
```

## `max`

配列内の最大値を返します。

Twig コアの [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) ファンクションと同様に機能します。

## `min`

配列内の最小値を返します。

Twig コアの [`min`](https://twig.symfony.com/doc/2.x/functions/min.html) ファンクションと同様に機能します。

## `plugin`

ハンドルに従ってプラグインインスタンスを返します。そのハンドルでインストールされ有効化されているプラグインがない場合、`null` を返します。

```twig
{{ plugin('commerce').version }}
```

## `raw`

出力時に HTML エンコードされないよう、指定された文字列を`Twig\Markup` オブジェクトで囲みます。

```twig
{% set html = raw('<p>Don’t encode me.</p>') %}
{{ html }}
```

::: tip
これは、変数が他のテンプレート/マクロに渡された場合でも Twig が HTML をエスケープしないことを覚えている点を除き、[raw](https://twig.symfony.com/doc/2.x/filters/raw.html) フィルタと同様に機能します。一方、`|raw` フィルタは出力タグ内で直接利用した場合にのみ効果があります。
:::

## `redirectInput`

`<input type="hidden" name="redirect" value="{{ url|hash }}">` を入力するためのショートカットです。

```twig
{{ redirectInput(url) }}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ redirectInput(url, {
    id: 'redirect-input'
}) }}
```

## `seq`

`name` で定義されたシーケンスの次または現在の番号を出力します。

```twig
<p>This entry has been read {{ seq('hits:' ~ entry.id) }} times.</p>
```

ファンクションが呼び出されるたびに、与えられたシーケンスは自動的にインクリメントされます。

オプションで特定の長さにゼロ詰めした数値にできます。

```twig
{{ now|date('Y') ~ '-' ~ seq('orderNumber:' ~ now|date('Y'), 5) }}
{# outputs: 2018-00001 #}
```

インクリメントせずにシーケンスの現在の数字を表示するには、引数 `next` に `false` をセットします。

```twig
<h5><a href="{{ entry.url }}">{{ entry.title }}</a></h5>
<p>{{ seq('hits:' ~ entry.id, next=false) }} views</p>
```

## `shuffle`

配列内のエレメントの順序をランダム化します。

```twig
{% set promos = craft.entries.section('promos').all() %}
{% set shuffledPromos = shuffle(promos) %}

{% for promo in shuffledPromos %}
    <div class="promo {{ promo.slug }}">
        <h3>{{ promo.title }}</h3>
        <p>{{ promo.description }}</p>
        <a class="cta" href="{{ promo.ctaUrl }}">{{ promo.ctaLabel }}</a>
    </div>
{% endfor %}
```

## `siteUrl`

サイト上のページへの URL を作成するため _だけ_ という点を除けば、[url()](#url-path-params-scheme-mustshowscriptname) と似ています。

```twig
<a href="{{ siteUrl('company/contact') }}">Contact Us</a>
```

### 引数

`siteUrl()` ファンクションは、次の引数を持っています。

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** –  URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`siteId`** – URL が指すべきサイト ID。デフォルトでは、現在のサイトが使用されます。

## `svg`

SVG 文書を出力します。

次のものを渡すことができます。

- SVG ファイルのパス。

   ```twig
   {{ svg('@webroot/icons/lemon.svg') }}
   ```

- [アセットフィールド](../assets-fields.md)から引っ張られたような、<craft3:craft\elements\Asset> オブジェクト。

   ```twig
   {% set image = entry.myAssetsField.one() %}
   {% if image and image.extension == 'svg' %}
     {{ svg(image) }}
   {% endif %}
   ```

- 生の SVG マークアップ。

   ```twig
   {% set image = include('_includes/icons/lemon.svg') %}
   {{ svg(image) }}
   ```

ファンクションにアセットまたは生のマークアップを渡した場合、デフォルトでは SVG は [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer) を利用して潜在的に悪意のあるスクリプトをサニタイズし、ドキュメント内の ID や class 名が DOM の他の ID や class 名と衝突しないよう名前空間を付加します。引数 `sanitize`、および、`namespace` を利用して、これらの動作を無効にできます。

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

[attr](filters.md#attr) フィルタを利用して、ルートの `<svg>` ノードに追加する独自の class 名を指定することもできます。

```twig
{{ svg('@webroot/icons/lemon.svg')|attr({ class: 'lemon-icon' }) }}
```

## `source`

レンダリングせずに、テンプレートのコンテンツを返します。

Twig コアの [`source`](https://twig.symfony.com/doc/2.x/functions/source.html) ファンクションと同様に機能します。

## `tag`

完全な HTML タグをレンダリングします。

```twig
{{ tag('div', {
    class: 'foo'
}) }}
{# Output: <div class="foo"></div> #}
```

属性引数に `text` が含まれる場合、その値は HTML エンコードされ、タグのテキストコンテンツとしてセットされます。

```twig
{{ tag('div', {
    text: 'Hello'
}) }}
{# Output: <div>Hello</div> #}
```

属性引数に `html` が含まれている（かつ、`text` が含まれていない）場合、その値はタグのインナー HTML としてセットされます（HTML エンコードされません）。

```twig
{{ tag('div', {
    html: 'Hello<br>world'
}) }}
{# Output: <div>Hello<br>world</div> #}
```

第二引数に渡される他のすべてのキーは、<yii2:yii\helpers\BaseHtml::renderTagAttributes()> を利用してタグの属性としてセットされます。

属性が `true` にセットされている場合、値なしで追加されます。

```twig
{{ tag('input', {
    id: "foo",
    name: "bar",
    required: true
}) }}
{# Output: <input id="foo" name="bar" required> #}
```

`null` または `false` をセットされた属性は、省略されます。

## `url`

URL を返します。

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

### 引数

`url()` ファンクションは、次の引数を持っています。

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** –  URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`mustShowScriptName`** – ここに `true` がセットされている場合、「index.php」を含めた URL が返され、コンフィグ設定 <config3:omitScriptNameInUrls> は無視されます。（ブラウザのアドレスバーに表示されない URL と .htaccess ファイルのリダイレクトとの衝突を避けたいような、Ajax 経由の POST リクエストで使用される URL の場合に有用です。）

::: tip
クエリ文字列パラメータを追加、および / または、絶対 URL にスキームを適用するために、`url()` ファンクションを使用することができます。
```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Outputs: "https://my-project.com?foo=1" #}
```
:::
