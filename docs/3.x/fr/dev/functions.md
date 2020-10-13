# Functions

The following [functions](https://twig.symfony.com/doc/2.x/templates.html#functions) are available to Twig templates in Craft:

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
| [className](#classname)                                                                        | Returns the fully qualified class name of a given object.                                              |
| [clone](#clone)                                                                                | Clones an object.                                                                                      |
| [combine](#combine)                                                                            | Combines two arrays into one.                                                                          |
| [configure](#configure)                                                                        | Sets attributes on the passed object.                                                                  |
| [constant](https://twig.symfony.com/doc/2.x/functions/constant.html)                           | Returns the constant value for a given string.                                                         |
| [create](#create)                                                                              | Creates a new object.                                                                                  |
| [csrfInput](#csrfinput)                                                                        | Returns a hidden CSRF token input.                                                                     |
| [cpUrl](#cpurl)                                                                                | Generates a control panel URL.                                                                         |
| [cycle](https://twig.symfony.com/doc/2.x/functions/cycle.html)                                 | Cycles on an array of values.                                                                          |
| [date](https://twig.symfony.com/doc/2.x/functions/date.html)                                   | Creates a date.                                                                                        |
| [dump](https://twig.symfony.com/doc/2.x/functions/dump.html)                                   | Dumps information about a variable.                                                                    |
| [endBody](#endbody)                                                                            | Outputs scripts and styles that were registered for the “end body” position.                           |
| [expression](#expression)                                                                      | Creates a database expression object.                                                                  |
| [floor](#floor)                                                                                | Rounds a number down.                                                                                  |
| [getenv](#getenv)                                                                              | Returns the value of an environment variable.                                                          |
| [gql](#gql)                                                                                    | Executes a GraphQL query against the full schema.                                                      |
| [parseEnv](#parseenv)                                                                          | Parses a string as an environment variable or alias.                                                   |
| [head](#head)                                                                                  | Outputs scripts and styles that were registered for the “head” position.                               |
| [hiddenInput](#hiddeninput)                                                                    | Outputs a hidden input.                                                                                |
| [include](https://twig.symfony.com/doc/2.x/functions/include.html)                             | Returns the rendered content of a template.                                                            |
| [input](#input)                                                                                | Outputs an HTML input.                                                                                 |
| [max](https://twig.symfony.com/doc/2.x/functions/max.html)                                     | Returns the biggest value in an array.                                                                 |
| [min](https://twig.symfony.com/doc/2.x/functions/min.html)                                     | Returns the lowest value in an array.                                                                  |
| [parent](https://twig.symfony.com/doc/2.x/functions/parent.html)                               | Returns the parent block’s output.                                                                     |
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
| [url](#url)                                                                                    | Generates a URL.                                                                                       |

## `actionInput`

A shortcut for outputting a hidden input used to route a POST request to a particular controller action. This is effectively the same as writing `<input type="hidden" name="action" value="controller/action/route">` directly into a template.

```twig
{{ actionInput('users/save-user') }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ actionInput('users/save-user', {
    id: 'action-input'
}) }}
```

## `actionUrl`

Returns a controller action URL, automatically accounting for relative vs. absolute format and the active <config3:actionTrigger> setting.

### Arguments

The `actionUrl()` function has the following arguments:

* **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
* **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
* **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.

## `alias`

Passes a string through [Craft::getAlias()](yii2:yii\BaseYii::getAlias()), which will check if the string begins with an [alias](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases). (See [Configuration](../config/README.md#aliases) for more info.)

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `attr`

Generates a list of HTML attributes based on the given [hash](twig-primer.md#hashes), using <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

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

Outputs any scripts and styles that were registered for the “begin body” position. It should be placed right after your `<body>` tag.

```twig
<body>
    {{ beginBody() }}

    <h1>{{ page.name }}</h1>
    {{ page.body }}
</body>
```

## `block`

Prints a block’s output.

This works identically to Twig’s core [`block`](https://twig.symfony.com/doc/2.x/functions/block.html) function.

## `ceil`

Rounds a number up.

```twig
{{ ceil(42.1) }}
{# Output: 43 #}
```

## `className`

Returns the fully qualified class name of a given object.

```twig
{% set class = className(entry) %}
{# Result: 'craft\\elements\\Entry' #}
```

## `clone`

Clones a given object.

```twig
{% set query = craft.entries.section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `combine`

Combines two arrays into one, using the first array to define the keys, and the second array to define the values.

```twig
{% set arr1 = ['a', 'b', 'c'] %}
{% set arr2 = ['foo', 'bar', 'baz'] %}
{% set arr3 = combine(arr1, arr2) %}
{# arr3 will now be `{a: 'foo', b: 'bar', c: 'baz'}` #}
```

## `configure`

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

It could technically even be used to set a model or element’s attributes, even though that’s not a great idea:

```twig
{% do configure(entry, { title: 'New Title' }) %}
{% do craft.app.elements.saveElement(entry) %}
```

## `constant`

Returns the constant value for a given string.

This works identically to Twig’s core [`constant`](https://twig.symfony.com/doc/2.x/functions/constant.html) function.

## `create`

Creates a new object instance based on a given class name or object configuration. See <yii2:Yii::createObject()> for a full explanation of supported arguments.

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

### Arguments

The `cpUrl()` function has the following arguments:

* **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
* **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
* **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.

## `csrfInput`

Returns a hidden CSRF Token input. All sites that have CSRF Protection enabled must include this in each form that submits via POST.

```twig
{{ csrfInput() }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ csrfInput({
    id: 'csrf-input'
}) }}
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

## `parseEnv`

Checks if a string references an environment variable (`$VARIABLE_NAME`) and/or an alias (`@aliasName`), and returns the referenced value.

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
```

## `max`

Returns the biggest value in an array.

This works identically to Twig’s core [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) function.

## `min`

Returns the lowest value in an array.

This works identically to Twig’s core [`min`](https://twig.symfony.com/doc/2.x/functions/min.html) function.

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

* **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
* **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
* **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
* **`siteId`** – The ID of the site that the URL should point to. By default the current site will be used.

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

## `url`

Returns a URL.

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

### Arguments

The `url()` function has the following arguments:

* **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
* **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](twig-primer.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
* **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
* **`mustShowScriptName`** – If this is set to `true`, then the URL returned will include “index.php”, disregarding the <config3:omitScriptNameInUrls> config setting. (This can be useful if the URL will be used by POST requests over Ajax, where the URL will not be shown in the browser’s address bar, and you want to avoid a possible collision with your site’s .htaccess file redirect.)

::: tip
You can use the `url()` function for appending query string parameters and/or enforcing a scheme on an absolute URL:
```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Outputs: "https://my-project.com?foo=1" #}
```
:::
