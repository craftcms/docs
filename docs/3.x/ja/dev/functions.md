# ファンクション

[Twig に付随する](https://twig.symfony.com/doc/functions/index.html)テンプレートファンクションに加えて、Craft がいくつか独自のものを提供します。

## `actionInput( actionPath )`

特定のコントローラーやアクションのための POST リクエストをルーティングするために使用される不可視項目を出力するためのショートカット。これは、テンプレート内に直接 `<input type="hidden" name="action" value="controller/action-name">` を書き込むのと実質的に同じです。

```twig
<form method="POST">
    {{ actionInput('users/save-user') }}<!-- ... --></form>
```

その文字列が[エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)ではじまるかをチェックする [Craft::getAlias()](yii2:yii\BaseYii::getAlias()) に、文字列を渡します。（詳細については、[コンフィギュレーション](../config/README.md#aliases)を参照してください。）

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `alias( string )`

「begin body」に登録されたスクリプトやスタイルを出力します。`<body>` タグの直後に配置する必要があります。

```twig
<body>
    {{ beginBody() }}

    <h1>{{ page.name }}</h1>
    {{ page.body }}
</body>
```

## `beginBody()`

整数値に切り上げます。

```twig
{{ ceil(42.1) }} → 43
```

## `ceil( num )`

指定されたオブジェクトの完全修飾クラス名を返します。

指定されたオブジェクトのクローンを作成します。

## `className( object )`

与えられたクラス名やオブジェクト設定に基づいて新しいオブジェクトインスタンスを作成します。サポートされる引数の詳細については、<api3:Yii::createObject()> を参照してください。

```twig
{% set query = craft.entries.section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `clone( object )`

不可視の CSRF トークン入力欄を返します。CSRF 保護が有効になっているすべてのサイトでは、POST 経由で送信するそれぞれのフォームにこれを含めなければなりません。

「end body」に登録されたスクリプトやスタイルを出力します。`</body>` タグの直前に配置する必要があります。

## `create( type )`

データベースクエリで使用するための新しい <yii2:yii\db\Expression> オブジェクトを作成して返します。

```twig
{# Pass in a class name #}
{% set cookie = create('yii\\web\\Cookie') %}

{# Or a full object configuration array #}
{% set cookie = create({
    class: 'yii\\web\\cookie',
    name: 'foo',
    value: 'bar'
}) %}
```

## `csrfInput()`

整数値に切り捨てます。

```twig
<form method="post">
    {{ csrfInput() }}<!-- ... --></form>
```

## `endBody()`

環境変数の値を返します。

```twig
<body>
    <h1>{{ page.name }}</h1>
    {{ page.body }}

    {{ endBody() }}
</body>
```

## `expression( expression, params, config )`

文字列が環境変数（`$VARIABLE_NAME`）、および / または、エイリアス（`@aliasName`）を参照しているかどうかを確認し、参照されている値を返します。

「head」に登録されたスクリプトやスタイルを出力します。`</head>` タグの直前に配置する必要があります。

## `floor( num )`

ハンドルに従ってプラグインインスタンスを返します。そのハンドルでインストールされ有効化されているプラグインがない場合、`null` を返します。

```twig
{{ floor(42.9) }} → 42
```

## `getenv( name )`

`<input type="hidden" name="redirect" value="{{ url|hash }}">` を入力するためのショートカットです。

```twig
{{ getenv('MAPS_API_KEY') }}
```

`name` で定義されたシーケンスの次または現在の番号を出力します。

```twig
<head>
    <title>{{ siteName }}</title>
    {{ head() }}
</head>
```

## `parseEnv( str )`

ファンクションが呼び出されるたびに、与えられたシーケンスは自動的にインクリメントされます。

オプションで特定の長さにゼロ詰めした数値にすることができます。

## `head()`

インクリメントせずにシーケンスの現在の数字を表示するには、`next` 引数に `false` をセットします。

配列内のエレメントの順序をランダム化します。

## `plugin( handle )`

サイト上のページへの URL を作成するため _だけ_ という点を除けば、[url()](#url-path-params-scheme-mustshowscriptname) と似ています。

`siteUrl()` ファンクションは、次の引数を持っています。

## `redirectInput( url )`

SVG 文書を出力します。

```twig
{{ plugin('commerce').version }}
```

## `seq( name, length, next )`

次のものを渡すことができます。

```twig
<p>This entry has been read {{ seq('hits:' ~ entry.id) }} times.</p>
```

## `shuffle( array )`

ファンクションにアセットまたは生のマークアップを渡した場合、デフォルトでは SVG は [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer) を使用して潜在的に悪意のあるスクリプトをサニタイズし、ドキュメント内の ID や class 名が DOM の他の ID や class 名と衝突しないよう名前空間を付加します。引数 `sanitize`、および、`namespace` を使用して、これらの動作を無効にできます。

```twig
{{ now|date('Y') ~ '-' ~ seq('orderNumber:' ~ now|date('Y'), 5) }}
{# outputs: 2018-00001 #}
```

## `siteUrl( path, params, scheme, siteId )`

引数 `class` を使用して、ルートの `<svg>` ノードに追加する独自の class 名を指定することもできます。

```twig
<h5><a href="{{ entry.url }}">{{ entry.title }}</a></h5>
<p>{{ seq('hits:' ~ entry.id, next=false) }} views</p>
```

## `svg( svg, sanitize, namespace, class )`

URL を返します。

## `url( path, params, scheme, mustShowScriptName )`

`url()` ファンクションは、次の引数を持っています。

```twig
{% set promos = shuffle(homepage.promos) %}

{% for promo in promos %}
    <div class="promo {{ promo.slug }}">
        <h3>{{ promo.title }}</h3>
        <p>{{ promo.description }}</p>
        <a class="cta" href="{{ promo.ctaUrl }}">{{ promo.ctaLabel }}</a>
    </div>
{% endfor %}
```

## `hiddenInput`

::: tip
クエリ文字列パラメータを追加、および / または、絶対 URL にスキームを適用するために、`url()` ファンクションを使用することができます。

```twig
<a href="{{ siteUrl('company/contact') }}">Contact Us</a>
```

:::

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

## `include`

Returns the rendered content of a template.

This works identically to Twig’s core [`include`](https://twig.symfony.com/doc/2.x/functions/include.html) function.

## `input`

Generates an HTML input tag.

```twig
{{ svg('@webroot/icons/lemon.svg', class='lemon-icon') }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

## `max`

Returns the biggest value in an array.

This works identically to Twig’s core [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) function.

## `min`

Returns the lowest value in an array.

This works identically to Twig’s core [`min`](https://twig.symfony.com/doc/2.x/functions/min.html) function.

## `parent`

Returns the parent block’s output.

This works identically to Twig’s core [`parent`](https://twig.symfony.com/doc/2.x/functions/parent.html) function.

## `plugin`

Returns a plugin instance by its handle, or `null` if no plugin is installed and enabled with that handle.

```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Outputs: "https://my-project.com?foo=1" #}
```

## `random`

Returns a random value.

This works identically to Twig’s core [`random`](https://twig.symfony.com/doc/2.x/functions/random.html) function.

## `range`

Returns a list containing an arithmetic progression of integers.

This works identically to Twig’s core [`range`](https://twig.symfony.com/doc/2.x/functions/range.html) function.

## `redirectInput`

Shortcut for typing `<input type="hidden" name="redirect" value="{{ url|hash }}">`.

```twig
{{ redirectInput(url) }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ redirectInput(url, {
    id: 'redirect-input'
}) }}
```

## `seq`

Outputs the next or current number in a sequence, defined by `name`:

```twig
<p>This entry has been read {{ seq('hits:' ~ entry.id) }} times.</p>
```

Each time the function is called, the given sequence will be automatically incremented.

You can optionally have the number be zero-padded to a certain length.

```twig
{{ now|date('Y') ~ '-' ~ seq('orderNumber:' ~ now|date('Y'), 5) }}
{# outputs: 2018-00001 #}
```

To view the current number in the sequence without incrementing it, set the `next` argument to `false`.

```twig
<h5><a href="{{ entry.url }}">{{ entry.title }}</a></h5>
<p>{{ seq('hits:' ~ entry.id, next=false) }} views</p>
```

## `shuffle`

Randomizes the order of the elements within an array.

```twig
{% set promos = shuffle(homepage.promos) %}

{% for promo in promos %}
    <div class="promo {{ promo.slug }}">
        <h3>{{ promo.title }}</h3>
        <p>{{ promo.description }}</p>
        <a class="cta" href="{{ promo.ctaUrl }}">{{ promo.ctaLabel }}</a>
    </div>
{% endfor %}
```

## `siteUrl`

Similar to [url()](#url-path-params-scheme-mustshowscriptname), except _only_ for creating URLs to pages on your site.

```twig
<a href="{{ siteUrl('company/contact') }}">Contact Us</a>
```

### 引数

The `siteUrl()` function has the following arguments:

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** – URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`siteId`** – URL が指すべきサイト ID。デフォルトでは、現在のサイトが使用されます。

## `svg`

Outputs an SVG document.

You can pass the following things into it:

- SVG ファイルのパス。

  ```twig
  {{ svg('@webroot/icons/lemon.svg') }}
  ```

- A <api3:craft\elements\Asset> object, such as one pulled in from an [Assets field](../assets-fields.md).

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

By default, if you pass an asset or raw markup into the function, the SVG will be sanitized of potentially malicious scripts using [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer), and any IDs or class names within the document will be namespaced so they don’t conflict with other IDs or class names in the DOM. You can disable those behaviors using the `sanitize` and `namespace` arguments:

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

You can also specify a custom class name that should be added to the root `<svg>` node using the `class` argument:

```twig
{{ svg('@webroot/icons/lemon.svg', class='lemon-icon') }}
```

## `source`

Returns the content of a template without rendering it.

This works identically to Twig’s core [`source`](https://twig.symfony.com/doc/2.x/functions/source.html) function.

## `tag`

Renders a complete HTML tag.

```twig
{{ tag('div', {
    class: 'foo'
}) }}
{# Output: <div class="foo"></div> #}
```

If `text` is included in the attributes argument, its value will be HTML-encoded and set as the text contents of the tag.

```twig
{{ tag('div', {
    text: 'Hello'
}) }}
{# Output: <div>Hello</div> #}
```

If `html` is included in the attributes argument (and `text` isn’t), its value will be set as the inner HTML of the tag (without getting HTML-encoded).

```twig
{{ tag('div', {
    html: 'Hello<br>world'
}) }}
{# Output: <div>Hello<br>world</div> #}
```

All other keys passed to the second argument will be set as attributes on the tag, using <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

## `template_from_string`

Loads a template from a string.

This works identically to Twig’s core [`template_from_string`](https://twig.symfony.com/doc/2.x/functions/template_from_string.html) function.

## `url`

Returns a URL.

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

### 引数

The `url()` function has the following arguments:

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** – URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`mustShowScriptName`** – ここに `true` がセットされている場合、「index.php」を含めた URL が返され、コンフィグ設定の <config3:omitScriptNameInUrls> は無視されます。（ブラウザのアドレスバーに表示されない URL と .htaccess ファイルのリダイレクトとの衝突を避けたいような、Ajax 経由の POST リクエストで使用される URL の場合に有用です。）

::: tip
You can use the `url()` function for appending query string parameters and/or enforcing a scheme on an absolute URL:
```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Outputs: "https://my-project.com?foo=1" #}
```
:::
