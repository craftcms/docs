# ファンクション

[Twig に付随する](https://twig.symfony.com/doc/functions/index.html)テンプレートファンクションに加えて、Craft がいくつか独自のものを提供します。

| Function                                                                                       | ファンクション                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [actionInput](#actioninput)                                                                    | 不可視項目の `action` を出力します。                                                                                |
| [actionUrl](#actionurl)                                                                        | コントローラーのアクション URL を生成します。                                                                              |
| [alias](#alias)                                                                                | 文字列をエイリアスとして解析します。                                                                                     |
| [attr](#attr)                                                                                  | HTML 属性を生成します。                                                                                         |
| [attribute](https://twig.symfony.com/doc/2.x/functions/attribute.html)                         | 変数の動的属性にアクセスします。                                                                                       |
| [beginBody](#beginbody)                                                                        | 「begin body」に登録されたスクリプトやスタイルを出力します。                                                                    |
| [block](https://twig.symfony.com/doc/2.x/functions/block.html)                                 | ブロックの出力をプリントします。                                                                                       |
| [ceil](#ceil)                                                                                  | Rounds a number up.                                                                                    |
| [className](#classname)                                                                        | 指定されたオブジェクトの完全修飾クラス名を返します。                                                                             |
| [clone](#clone)                                                                                | オブジェクトを複製します。                                                                                          |
| [combine](#combine)                                                                            | 2つの配列を1つに結合します。                                                                                        |
| [configure](#configure)                                                                        | 渡されたオブジェクトに属性をセットします。                                                                                  |
| [constant](https://twig.symfony.com/doc/2.x/functions/constant.html)                           | 指定された文字列の定数値を返します。                                                                                     |
| [create](#create)                                                                              | 新しいオブジェクトを作成します。                                                                                       |
| [csrfInput](#csrfinput)                                                                        | 不可視項目の CSRF トークンを返します。                                                                                 |
| [cpUrl](#cpurl)                                                                                | コントロールパネルの URL を生成します。                                                                                 |
| [cycle](https://twig.symfony.com/doc/2.x/functions/cycle.html)                                 | 値の配列を循環します。                                                                                            |
| [dataUrl](#dataurl)                                                                            | Outputs an asset or file as a base64-encoded data URL.                                                 |
| [date](#date)                                                                                  | 日付を作成します。                                                                                              |
| [dump](https://twig.symfony.com/doc/2.x/functions/dump.html)                                   | 変数に関する情報をダンプします。                                                                                       |
| [endBody](#endbody)                                                                            | 「end body」に登録されたスクリプトやスタイルを出力します。                                                                      |
| [expression](#expression)                                                                      | データベース式オブジェクトを作成します。                                                                                   |
| [failMessageInput](#failmessageinput)                                                          | Outputs a hidden `failMessage` input.                                                                  |
| [floor](#floor)                                                                                | 整数値に切り上げます。                                                                                            |
| [getenv](#getenv)                                                                              | 環境変数の値を返します。                                                                                           |
| [gql](#gql)                                                                                    | スキーマ全体に対して、GraphQL クエリを実行します。                                                                          |
| [head](#head)                                                                                  | 「head」に登録されたスクリプトやスタイルを出力します。                                                                          |
| [hiddenInput](#hiddeninput)                                                                    | 不可視項目を出力します。                                                                                           |
| [include](https://twig.symfony.com/doc/2.x/functions/include.html)                             | レンダリングされたテンプレートのコンテンツを返します。                                                                            |
| [input](#input)                                                                                | HTML input タグを出力します。                                                                                   |
| [max](https://twig.symfony.com/doc/2.x/functions/max.html)                                     | 配列内の最大値を返します。                                                                                          |
| [min](https://twig.symfony.com/doc/2.x/functions/min.html)                                     | 配列内の最小値を返します。                                                                                          |
| [ol](#ol)                                                                                      | 配列内のアイテムの順番をランダム化します。                                                                                  |
| [parent](https://twig.symfony.com/doc/2.x/functions/parent.html)                               | 親ブロックの出力を返します。                                                                                         |
| [parseBooleanEnv](#parsebooleanenv)                                                            | Parses a string as an environment variable or alias having a boolean value.                            |
| [parseEnv](#parseenv)                                                                          | Parses a string as an environment variable or alias.                                                   |
| [plugin](#plugin)                                                                              | Returns a plugin instance by its handle.                                                               |
| [random](https://twig.symfony.com/doc/2.x/functions/random.html)                               | Returns a random value.                                                                                |
| [range](https://twig.symfony.com/doc/2.x/functions/range.html)                                 | Returns a list containing an arithmetic progression of integers.                                       |
| [raw](#raw)                                                                                    | Wraps the given string in a `Twig\Markup` object to prevent it from getting HTML-encoded when output. |
| [redirectInput](#redirectinput)                                                                | Outputs a hidden `redirect` input.                                                                     |
| [seq](#seq)                                                                                    | Outputs the next or current number in a sequence.                                                      |
| [shuffle](#shuffle)                                                                            | Randomizes the order of the items in an array.                                                         |
| [siteUrl](#siteurl)                                                                            | Generates a front-end URL.                                                                             |
| [successMessageInput](#successmessageinput)                                                    | Outputs a hidden `successMessage` input.                                                               |
| [svg](#svg)                                                                                    | Outputs an SVG document.                                                                               |
| [source](https://twig.symfony.com/doc/2.x/functions/source.html)                               | Returns the content of a template without rendering it.                                                |
| [tag](#tag)                                                                                    | Outputs an HTML tag.                                                                                   |
| [template_from_string](https://twig.symfony.com/doc/2.x/functions/template_from_string.html) | Loads a template from a string.                                                                        |
| [ul](#ul)                                                                                      | Outputs an array of items as an unordered list.                                                        |
| [url](#url)                                                                                    | Generates a URL.                                                                                       |

## `actionInput( actionPath )`

特定のコントローラーやアクションのための POST リクエストをルーティングするために使用される不可視項目を出力するためのショートカット。 これは、テンプレート内に直接 `<input type="hidden" name="action" value="controller/action-name">` を書き込むのと実質的に同じです。

```twig
<form method="POST">
    {{ actionInput('users/save-user') }}<!-- ...
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ actionInput('users/save-user', {
  id: 'action-input'
}) }}
```

## `alias( string )`

相対形式と絶対形式、および、アクティブな <config3:actionTrigger> 設定を自動的に考慮し、コントローラーアクションの URL を返します。

### 引数

整数値に切り上げます。

- **`path`** – 結果となる URL がサイトで指すべきパス。 それは、ベースサイト URL に追加されます。
- **`params`** – URL に追加するクエリ文字列パラメータ。 これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
- **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。 デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。 そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。

## `beginBody()`

その文字列が[エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)ではじまるかをチェックする [Craft::getAlias()](yii2:yii\BaseYii::getAlias()) に、文字列を渡します。 （詳細については、[コンフィギュレーション](../config/README.md#aliases)を参照してください。 ）

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `ceil( num )`

指定されたオブジェクトのクローンを作成します。

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

## `className( object )`

「begin body」に登録されたスクリプトやスタイルを出力します。 `<body>` タグの直後に配置する必要があります。

```twig
<body>
  {{ beginBody() }}

  <h1>{{ page.name }}</h1>
  {{ page.body }}
</body>
```

## `clone( object )`

ブロックの出力をプリントします。

Twig コアの [`block`](https://twig.symfony.com/doc/2.x/functions/block.html) ファンクションと同様に機能します。

## `create( type )`

整数値に切り上げます。

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
{% set class = className(entry) %}
{# Result: 'craft\\elements\\Entry' #}
```

## `endBody()`

環境変数の値を返します。

```twig
{% set query = craft.entries.section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `expression( expression, params, config )`

文字列が環境変数（`$VARIABLE_NAME`）、および / または、エイリアス（`@aliasName`）を参照しているかどうかを確認し、参照されている値を返します。

```twig
{{ floor(42.9) }} → 42
```

## `floor( num )`

[`Yii::configure()`](yii2:yii\BaseYii::configure()) から継承された `Craft::configure()` メソッドの振る舞いを渡します。 オブジェクトに属性を適用するという点で [`create`](#create) に似ていますが、新しいインスタンスを作成する代わりに、既存のオブジェクトを受け入れて変更します。

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

与えられたクラス名やオブジェクト設定に基づいて新しいオブジェクトインスタンスを作成します。 サポートされる引数の詳細については、<yii2:Yii::createObject()> を参照してください。

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

`siteUrl()` ファンクションは、次の引数を持っています。

- **`path`** – 結果となる URL がサイトで指すべきパス。 それは、ベースサイト URL に追加されます。
- **`params`** – URL に追加するクエリ文字列パラメータ。 これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
- **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。 デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。 そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。

## `csrfInput`

不可視の CSRF トークン入力欄を返します。 CSRF 保護が有効になっているすべてのサイトでは、POST 経由で送信するそれぞれのフォームにこれを含めなければなりません。

```twig
{{ csrfInput() }}
```

オプションで、引数 `options` を渡すことにより、タグに追加の属性をセットできます。

```twig
{{ csrfInput({
  id: 'csrf-input'
}) }}
```

## `dataUrl`

Outputs an asset or file as a base64-encoded [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). You can pass it an <craft3:craft\elements\Asset> object or a file path (optionally using an [alias](../config/#aliases)).

```twig
{# Asset object `myLogoAsset` #}
<img src="{{ dataUrl(myLogoAsset) }}" />

{# File path, optionally using an alias #}
<img src="{{ dataUrl('@webroot/images/my-logo-asset.svg') }}" />

{# Output: <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCIgdmd(...)" /> #}
```

データベースクエリで使用するための新しい <yii2:yii\db\Expression> オブジェクトを作成して返します。

- **`mustShowScriptName`** – ここに `true` がセットされている場合、「index.php」を含めた URL が返され、コンフィグ設定
- **`mimeType`** - Optional MIME type. If omitted, the file’s MIME type will be determined automatically.

## `date`

Converts an argument to a date to allow comparison, like [Twig’s `date()` function](https://twig.symfony.com/doc/2.x/functions/date.html).

The argument can be one of PHP’s supported [date and time formats](https://www.php.net/manual/en/datetime.formats.php), or additionally a `date`/`time` array.

```twig
{% if date(asset.dateModified) < date('-2days') %}
  {# asset is not new #}
{% endif %}
```

A `null` or empty argument defaults to the current date:

```twig
{% if date() > date('2021/06/01') %}
  {# today is past June 1, 2021 #}
{% endif %}
```

Craft additionally supports passing a `date`/`time` array:

```twig
{% set myDate = {
  date: '2021-01-15',
  timezone: 'America/Los_Angeles',
  time: '10:57',
} %}

{% if now > date(myDate) %}
  {# today is past January 15, 2021 #}
{% endif %}
```

## `endBody`

Outputs any scripts and styles that were registered for the “end body” position. It should be placed right before your `</body>` tag.

```twig
<body>
  <h1>{{ page.name }}</h1>
  {{ page.body }}

  {{ endBody() }}
</body>
```

## `expression`

Creates and returns a new <yii2:yii\db\Expression> object, for use in database queries.

```twig
{% set entries = craft.entries()
  .andWhere(expression('[[authorId]] = :authorId', {authorId: currentUser.id}))
  .all() %}
```

## `failMessageInput`

Shortcut for typing `<input type="hidden" name="failMessage" value="{{ 'Custom fail message'|hash }}">`.

```twig
{{ failMessageInput('Custom fail message') }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ failMessageInput('Custom fail message', {
  id: 'fail-message-input'
}) }}
```

## `floor`

Rounds a number down.

```twig
{{ floor(42.9) }}
{# Output: 42 #}
```

## `getenv`

Returns the value of an environment variable.

```twig
{{ getenv('MAPS_API_KEY') }}
```

## `gql`

Executes a GraphQL query against the full schema.

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

## `head`

Outputs any scripts and styles that were registered for the “head” position. It should be placed right before your `</head>` tag.

```twig
<head>
  <title>{{ siteName }}</title>
  {{ head() }}
</head>
```

## `hiddenInput`

Twig コアの [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) ファンクションと同様に機能します。

```twig
{{ hiddenInput('entryId', entry.id) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

配列内の最小値を返します。

```twig
{{ hiddenInput('entryId', entry.id, {
  id: 'entry-id-input'
}) }}
```

## `include`

Returns the rendered content of a template.

This works identically to Twig’s core [`include`](https://twig.symfony.com/doc/2.x/functions/include.html) function.

## `input`

Generates an HTML input tag.

```twig
{{ input('email', 'email-input', '') }}
{# Output: <input type="email" name="email-input" value=""> #}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ input('email', 'email-input', '', {
  id: 'custom-input'
}) }}
{# Output: <input type="email" id="custom-input" name="email-input" value=""> #}
```

## `max`

Returns the biggest value in an array.

This works identically to Twig’s core [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) function.

## `min`

Returns the lowest value in an array.

This works identically to Twig’s core [`min`](https://twig.symfony.com/doc/2.x/functions/min.html) function.

## `ol`

Outputs an array of items as an ordered list.

```twig
{% set titles = craft.entries()
  .section('news')
  .select('title')
  .column() %}
{{ ol(titles) }}
{# Output:
<ol>
  <li>Shocking Foo</li>
  <li>You Won’t Believe This Bar</li>
  <li>Ten Baz You Can’t Live Without</li>
</ol>
#}
```

### 引数

The `ol()` function has the following arguments:

- **`siteId`** – URL が指すべきサイト ID。 デフォルトでは、現在のサイトが使用されます。
- **`params`** – An attributes argument where each key+value will be set as attributes on the `<ol>`, with the exception of two special options:
    - **`encode: false`** – Prevents the list items from being HTML-encoded.
    - **`itemOptions: {...}`** – Tag attributes to be applied to each of the `<li>`s.

## `parseBooleanEnv`

Checks if a string references an environment variable (`$VARIABLE_NAME`) and returns the referenced boolean value, or `null` if a boolean value can’t be determined.

## `parseEnv`

Checks if a string references an environment variable (`$VARIABLE_NAME`) and/or an alias (`@aliasName`), and returns the referenced value.

If the string references an environment variable with a value of `true` or `false`, a boolean value will be returned.

## `plugin`

Returns a plugin instance by its handle, or `null` if no plugin is installed and enabled with that handle.

```twig
{{ plugin('commerce').version }}
```

## `raw`

Wraps the given string in a `Twig\Markup` object to prevent it from getting HTML-encoded when output.

```twig
{% set html = raw('<p>Don’t encode me.</p>') %}
{{ html }}
```

::: tip
This works similarly to the [raw](https://twig.symfony.com/doc/2.x/filters/raw.html) filter, except that Twig will remember not to escape the HTML even if the variable is passed to another template/macro, whereas `|raw` filters only have an effect if used directly in an output tag.
:::

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
{# Output: 2018-00001 #}
```

To view the current number in the sequence without incrementing it, set the `next` argument to `false`.

```twig
<h5><a href="{{ entry.url }}">{{ entry.title }}</a></h5>
<p>{{ seq('hits:' ~ entry.id, next=false) }} views</p>
```

## `shuffle`

Randomizes the order of the elements within an array.

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

Similar to [url()](#url-path-params-scheme-mustshowscriptname), except _only_ for creating URLs to pages on your site.

```twig
<a href="{{ siteUrl('company/contact') }}">Contact Us</a>
```

### 引数

The `siteUrl()` function has the following arguments:

- **`path`** – 結果となる URL がサイトで指すべきパス。 それは、ベースサイト URL に追加されます。
- **`params`** –  URL に追加するクエリ文字列パラメータ。 これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
- **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。 デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。 そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
- **`path`** – 結果となる URL がサイトで指すべきパス。 それは、ベースサイト URL に追加されます。

## `successMessageInput`

Shortcut for typing `<input type="hidden" name="successMessage" value="{{ 'Custom success message'|hash }}">`.

```twig
{{ successMessageInput('Custom success message') }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ successMessageInput('Custom success message', {
  id: 'success-message-input'
}) }}
```

## `svg`

Outputs an SVG document.

You can pass the following things into it:

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

By default, if you pass an asset or raw markup into the function, the SVG will be sanitized of potentially malicious scripts using [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer), and any IDs or class names within the document will be namespaced so they don’t conflict with other IDs or class names in the DOM. You can disable those behaviors using the `sanitize` and `namespace` arguments:

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

Images passed via path/alias will _not_ automatically be sanitized and namespaced.

You can also specify a custom class name that should be added to the root `<svg>` node using the [attr](filters.md#attr) filter:

```twig
{{ svg('@webroot/icons/lemon.svg')|attr({ class: 'lemon-icon' }) }}
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

::: warning
Be sure you trust any input you provide via `html` since it could be an XSS (cross-site scripting) attack vector. It’s safer to use `text` wherever possible.
:::

```twig
{{ tag('div', {
  html: 'Hello<br>world'
}) }}
{# Output: <div>Hello<br>world</div> #}
```

All other keys passed to the second argument will be set as attributes on the tag, using <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

If an attribute is set to `true`, it will be added without a value.

```twig
{{ tag('input', {
  id: "foo",
  name: "bar",
  required: true
}) }}
{# Output: <input id="foo" name="bar" required> #}
```

Any attribute set to `null` or `false` will be omitted.

## `ul`

Outputs an array of items as an unordered list.

```twig
{% set titles = craft.entries()
  .section('news')
  .select('title')
  .column() %}
{{ ul(titles) }}
{# Output:
<ul>
  <li>Shocking Foo</li>
  <li>You Won’t Believe This Bar</li>
  <li>Ten Baz You Can’t Live Without</li>
</ul>
#}
```

### Arguments

The `ul()` function has the following arguments:

- **`items`** – An array of items to be wrapped in `<li>`s. These will be HTML-encoded by default.
- **`params`** – An attributes argument where each key+value will be set as attributes on the `<ul>`, with the exception of two special options:
    - **`encode: false`** – Prevents the list items from being HTML-encoded.
    - **`itemOptions: {...}`** – Tag attributes to be applied to each of the `<li>`s.

## `url`

Returns a URL.

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

### Arguments

The `url()` function has the following arguments:

- **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
- **`params`** –  URL に追加するクエリ文字列パラメータ。 これは文字列（例：`'foo=1&bar=2'`）または、[ハッシュ](twig-primer.md#hashes)（例：`{foo:'1', bar:'2'}`）が利用可能です。
- **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。 デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。 そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
- **`mustShowScriptName`** – If this is set to `true`, then the URL returned will include “index.php”, disregarding the <config3:omitScriptNameInUrls> config setting. （ブラウザのアドレスバーに表示されない URL と .htaccess ファイルのリダイレクトとの衝突を避けたいような、Ajax 経由の POST リクエストで使用される URL の場合に有用です。 ）

Using the `url()` function has advantages over hard-coding URLs in your templates:

- Generated URLs will encourage consistency by respecting settings like [addTrailingSlashesToUrls](config3:addTrailingSlashesToUrls).
- Your site will be more portable, making it easier to do something like move to a new domain or subdomain.
- If the page has a `token` URL parameter, that token will automatically get appended to generated URLs to maintain preview context navigating around the site.

::: tip
You can use the `url()` function for appending query string parameters and/or enforcing a scheme on an absolute URL:
```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Output: "https://my-project.com?foo=1" #}
```
:::
