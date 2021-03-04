# ファンクション

[Twig に付随する](https://twig.symfony.com/doc/functions/index.html)テンプレートファンクションに加えて、Craft がいくつか独自のものを提供します。

| Function                                                                                       | Description                                                                                            |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [actionInput](#actioninput)                                                                    | Outputs a hidden `action` input.                                                                       |
| [actionUrl](#actionurl)                                                                        | Generates a controller action URL.                                                                     |
| [alias](#alias)                                                                                | Parses a string as an alias.                                                                           |
| [attr](#attr)                                                                                  | Generates HTML attributes.                                                                             |
| [attribute](https://twig.symfony.com/doc/2.x/functions/attribute.html)                         | Accesses a dynamic attribute of a variable.                                                            |
| [beginBody](#beginbody)                                                                        | Outputs scripts and styles that were registered for the “begin body” position.                         |
| [block](https://twig.symfony.com/doc/2.x/functions/block.html)                                 | Prints a block’s output.                                                                               |
| [ceil](#ceil)                                                                                  | Rounds a number up.                                                                                    |
| [className](#classname)                                                                        | 指定されたオブジェクトの完全修飾クラス名を返します。                                                                             |
| [clone](#clone)                                                                                | Clones an object.                                                                                      |
| [combine](#combine)                                                                            | Combines two arrays into one.                                                                          |
| [configure](#configure)                                                                        | Sets attributes on the passed object.                                                                  |
| [constant](https://twig.symfony.com/doc/2.x/functions/constant.html)                           | Returns the constant value for a given string.                                                         |
| [create](#create)                                                                              | Creates a new object.                                                                                  |
| [csrfInput](#csrfinput)                                                                        | Returns a hidden CSRF token input.                                                                     |
| [cpUrl](#cpurl)                                                                                | Generates a control panel URL.                                                                         |
| [cycle](https://twig.symfony.com/doc/2.x/functions/cycle.html)                                 | Cycles on an array of values.                                                                          |
| [dataUrl](#dataurl)                                                                            | Outputs an asset or file as a base64-encoded data URL.                                                 |
| [date](https://twig.symfony.com/doc/2.x/functions/date.html)                                   | Creates a date.                                                                                        |
| [dump](https://twig.symfony.com/doc/2.x/functions/dump.html)                                   | Dumps information about a variable.                                                                    |
| [endBody](#endbody)                                                                            | Outputs scripts and styles that were registered for the “end body” position.                           |
| [expression](#expression)                                                                      | Creates a database expression object.                                                                  |
| [floor](#floor)                                                                                | Rounds a number down.                                                                                  |
| [getenv](#getenv)                                                                              | Returns the value of an environment variable.                                                          |
| [gql](#gql)                                                                                    | Executes a GraphQL query against the full schema.                                                      |
| [head](#head)                                                                                  | Outputs scripts and styles that were registered for the “head” position.                               |
| [hiddenInput](#hiddeninput)                                                                    | Outputs a hidden input.                                                                                |
| [include](https://twig.symfony.com/doc/2.x/functions/include.html)                             | Returns the rendered content of a template.                                                            |
| [input](#input)                                                                                | Outputs an HTML input.                                                                                 |
| [max](https://twig.symfony.com/doc/2.x/functions/max.html)                                     | Returns the biggest value in an array.                                                                 |
| [min](https://twig.symfony.com/doc/2.x/functions/min.html)                                     | Returns the lowest value in an array.                                                                  |
| [ol](#ol)                                                                                      | Outputs an array of items as an ordered list.                                                          |
| [parent](https://twig.symfony.com/doc/2.x/functions/parent.html)                               | Returns the parent block’s output.                                                                     |
| [parseEnv](#parseenv)                                                                          | Parses a string as an environment variable or alias.                                                   |
| [plugin](#plugin)                                                                              | Returns a plugin instance by its handle.                                                               |
| [random](https://twig.symfony.com/doc/2.x/functions/random.html)                               | Returns a random value.                                                                                |
| [range](https://twig.symfony.com/doc/2.x/functions/range.html)                                 | Returns a list containing an arithmetic progression of integers.                                       |
| [raw](#raw)                                                                                    | Wraps the given string in a `Twig\Markup` object to prevent it from getting HTML-encoded when output. |
| [redirectInput](#redirectinput)                                                                | Outputs a hidden `redirect` input.                                                                     |
| [seq](#seq)                                                                                    | Outputs the next or current number in a sequence.                                                      |
| [shuffle](#shuffle)                                                                            | Randomizes the order of the items in an array.                                                         |
| [siteUrl](#siteurl)                                                                            | Generates a front-end URL.                                                                             |
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

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ actionInput('users/save-user', {
    id: 'action-input'
}) }}
```

## `alias( string )`

Returns a controller action URL, automatically accounting for relative vs. absolute format and the active <config3:actionTrigger> setting.

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
{{ ceil(42.1) }} → 43
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

Prints a block’s output.

This works identically to Twig’s core [`block`](https://twig.symfony.com/doc/2.x/functions/block.html) function.

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

Passes through the behavior of the `Craft::configure()` method inherited from [`Yii::configure()`](yii2:yii\BaseYii::configure()). It’s similar to [`create`](#create) in that it applies attributes to an object, but instead of creating new instances it accepts an existing object and modifies it.

```twig
{# Modify an `EntryQuery` object set up by a relational field: #}
{% set myRelatedEntries = configure(entry.myEntriesField, {
    section: 'blog'
}).all() %}
```

It can also be used instead of the [`merge`](https://twig.symfony.com/doc/2.x/filters/merge.html) filter:

```twig
{% set myObject = { one: 'Original' } %}
{# With `merge`: #}
{% set myObject = myObject | merge({ one: 'Overridden', two: 'New' }) %}

{# With `configure`: #}
{% do configure(myObject, { one: 'Overridden', two: 'New' }) %}
```

It could technically even be used to set a model or element’s attributes, even though that’s not a great idea since templates generally present content rather than modify it:

```twig
{% do configure(entry, { title: 'New Title' }) %}
{% do craft.app.elements.saveElement(entry) %}
```

## `constant`

Returns the constant value for a given string.

This works identically to Twig’s core [`constant`](https://twig.symfony.com/doc/2.x/functions/constant.html) function.

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

Returns a control panel URL, automatically accounting for relative vs. absolute format and the active <config3:cpTrigger> setting.

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

You can optionally set additional attributes on the tag by passing an `options` argument.

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

The `dataUrl()` function has the following arguments:

- **`file`** - The asset or path to a file to be encoded.
- **`mimeType`** - Optional MIME type. If omitted, the file’s MIME type will be determined automatically.

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

Generates an HTML input tag.

```twig
{{ hiddenInput('entryId', entry.id) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

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

### Arguments

The `ol()` function has the following arguments:

- **`items`** – An array of items to be wrapped in `<li>`s. These will be HTML-encoded by default.
- **`params`** – An attributes argument where each key+value will be set as attributes on the `<ol>`, with the exception of two special options:
    - **`encode: false`** – Prevents the list items from being HTML-encoded.
    - **`itemOptions: {...}`** – Tag attributes to be applied to each of the `<li>`s.

## `parseEnv`

Checks if a string references an environment variable (`$VARIABLE_NAME`) and/or an alias (`@aliasName`), and returns the referenced value.

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

### Arguments

The `siteUrl()` function has the following arguments:

- **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
- **`siteId`** – The ID of the site that the URL should point to. By default the current site will be used.

## `svg`

Outputs an SVG document.

You can pass the following things into it:

- An SVG file path.

  ```twig
  {{ svg('@webroot/icons/lemon.svg') }}
  ```

- A <craft3:craft\elements\Asset> object, such as one pulled in from an [Assets field](../assets-fields.md).

  ```twig
  {% set image = entry.myAssetsField.one() %}
  {% if image and image.extension == 'svg' %}
    {{ svg(image) }}
  {% endif %}
  ```

- Raw SVG markup.

  ```twig
  {% set image = include('_includes/icons/lemon.svg') %}
  {{ svg(image) }}
  ```

By default, if you pass an asset or raw markup into the function, the SVG will be sanitized of potentially malicious scripts using [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer), and any IDs or class names within the document will be namespaced so they don’t conflict with other IDs or class names in the DOM. You can disable those behaviors using the `sanitize` and `namespace` arguments:

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

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
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
- **`mustShowScriptName`** – If this is set to `true`, then the URL returned will include “index.php”, disregarding the <config3:omitScriptNameInUrls> config setting. (This can be useful if the URL will be used by POST requests over Ajax, where the URL will not be shown in the browser’s address bar, and you want to avoid a possible collision with your site’s .htaccess file redirect.)

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
