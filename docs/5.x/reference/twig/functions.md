---
description: Process and generate data or markup.
---

# Functions

The following [functions](https://twig.symfony.com/doc/3.x/templates.html#functions) are available to Twig templates in Craft:

Function | Description
-------- | -----------
[actionInput](#actioninput) | Outputs a hidden `action` input.
[actionUrl](#actionurl) | Generates a controller action URL.
[alias](#alias) | Parses a string as an alias.
[attr](#attr) | Generates HTML attributes.
[attribute](https://twig.symfony.com/doc/3.x/functions/attribute.html) | Accesses a dynamic attribute of a variable.
[beginBody](#beginbody) | Outputs scripts and styles that were registered for the “begin body” position.
[block](https://twig.symfony.com/doc/3.x/functions/block.html) | Prints a block’s output.
[canCreateDrafts](#cancreatedrafts)<br> [canDelete](#candelete)<br> [canDeleteForSite](#candeleteforsite)<br> [canDuplicate](#canduplicate)<br> [canSave](#cansave)<br> [canView](#canview) | Check permissions for a given element.
[ceil](#ceil) | Rounds a number up.
[className](#classname) | Returns the fully qualified class name of a given object.
[clone](#clone) | Clones an object.
[collect](#collect) | Returns a new collection.
[combine](#combine) | Combines two arrays into one.
[configure](#configure) | Sets attributes on the passed object.
[constant](https://twig.symfony.com/doc/3.x/functions/constant.html) | Returns the constant value for a given string.
[cpUrl](#cpurl) | Generates a control panel URL.
[create](#create) | Creates a new object.
[csrfInput](#csrfinput) | Returns a hidden CSRF token input.
[cycle](https://twig.symfony.com/doc/3.x/functions/cycle.html) | Cycles on an array of values.
[dataUrl](#dataurl) | Outputs an asset or file as a base64-encoded data URL.
[date](#date) | Creates a date.
[dump](#dump) | Dumps information about a variable.
[encodeUrl](#encodeurl) | Encodes and unencoded components of a URL.
[endBody](#endbody) | Outputs scripts and styles that were registered for the “end body” position.
[entryType](#entrytype) | Gets an entry type definition by its handle.
[expression](#expression) | Creates a database expression object.
[failMessageInput](#failmessageinput) | Outputs a hidden `failMessage` input.
[fieldValueSql](#fieldvaluesql) | Generates an SQL expression for accessing specific fields in elements’ JSON content column.
[floor](#floor) | Rounds a number down.
[getenv](#getenv) | Returns the value of an environment variable.
[gql](#gql) | Executes a GraphQL query against the full schema.
[head](#head) | Outputs scripts and styles that were registered for the “head” position.
[hiddenInput](#hiddeninput) | Outputs a hidden input.
[include](https://twig.symfony.com/doc/3.x/functions/include.html) | Returns the rendered content of a template.
[input](#input) | Outputs an HTML input.
[max](https://twig.symfony.com/doc/3.x/functions/max.html) | Returns the biggest value in an array.
[min](https://twig.symfony.com/doc/3.x/functions/min.html) | Returns the lowest value in an array.
[ol](#ol) | Outputs an array of items as an ordered list.
[parent](https://twig.symfony.com/doc/3.x/functions/parent.html) | Returns the parent block’s output.
[parseBooleanEnv](#parsebooleanenv) | Parses a string as an environment variable or alias having a boolean value.
[parseEnv](#parseenv) | Parses a string as an environment variable or alias.
[plugin](#plugin) | Returns a plugin instance by its handle.
[random](https://twig.symfony.com/doc/3.x/functions/random.html) | Returns a random value.
[range](https://twig.symfony.com/doc/3.x/functions/range.html) | Returns a list containing an arithmetic progression of integers.
[raw](#raw) | Wraps the given string in a `Twig\Markup` object to prevent it from getting HTML-encoded when output.
[redirectInput](#redirectinput) | Outputs a hidden `redirect` input.
[renderObjectTemplate](#renderobjecttemplate) | Renders an [object template](../../system/object-templates.md).
[seq](#seq) | Outputs the next or current number in a sequence.
[shuffle](#shuffle) | Randomizes the order of the items in an array.
[siteUrl](#siteurl) | Generates a front-end URL.
[source](#source) | Returns the content of a template without rendering it.
[successMessageInput](#successmessageinput) | Outputs a hidden `successMessage` input.
[svg](#svg) | Outputs an SVG document.
[tag](#tag) | Outputs an HTML tag.
[template_from_string](https://twig.symfony.com/doc/3.x/functions/template_from_string.html) | Loads a template from a string.
[ul](#ul) | Outputs an array of items as an unordered list.
[url](#url) | Generates a URL.

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

Returns a controller action URL, automatically accounting for relative vs. absolute format and the active <config5:actionTrigger> setting.

### Arguments

The `actionUrl()` function has the following arguments:

- **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](../../development/twig.md#hashes) (e.g. `{ foo: '1', bar: '2' }`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.

## `alias`

Passes a string through [Craft::getAlias()](yii2:yii\BaseYii::getAlias()), which will check if the string begins with an [alias](guide:concept-aliases). (See [Configuration](../../configure.md#aliases) for more info.)

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `attr`

Generates a list of HTML attributes based on the given [hash](../../development/twig.md#hashes), using <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

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

::: tip
Attribute values are HTML-encoded automatically:
```twig
<div {{ attr({ title: 'Greetings & Salutations' }) }}></div>
{# Output: <div title="Greetings &amp; Salutations"> #}
```
:::

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

This works identically to Twig’s core [`block`](https://twig.symfony.com/doc/3.x/functions/block.html) function.

## `canCreateDrafts`

Checks whether the current user (or a specific user, when provided) can create drafts from the passed element.

```twig
{% if canCreateDrafts(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

## `canDelete`

Checks whether the current user (or a specific user, when provided) can delete the passed element.

```twig
{% if canDelete(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

## `canDeleteForSite`

Checks whether the current user (or a specific user, when provided) can delete the passed element from the site it was loaded in.

```twig
{% if canDeleteForSite(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

## `canDuplicate`

Checks whether the current user (or a specific user, when provided) can duplicate the passed element.

```twig
{% if canDuplicate(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

## `canSave`

Checks whether the current user (or a specific user, when provided) can save the passed element.

```twig
{% if canSave(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

## `canView`

Checks whether the current user (or a specific user, when provided) can view the passed element within the control panel.

```twig
{% if canView(entry) %}
  <a href="{{ entry.getCpEditUrl() }}">Edit</a>
{% endif %}
```

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
{% set query = craft.entries().section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `collect`

Returns a new [collection](../../development/collections.md).

```twig
{% set collection = collect(['a', 'b', 'c']) %}
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

`configure()` _can_ be used to set a model or element’s attributes—but we don’t generally recommend this, as templates are intended to present content rather than modify it:

```twig
{% do configure(entry, { title: 'New Title' }) %}
{% do craft.app.elements.saveElement(entry) %}
```

## `constant`

Returns the constant value for a given string.

This works identically to Twig’s core [`constant`](https://twig.symfony.com/doc/3.x/functions/constant.html) function.

## `cpUrl`

Returns a control panel URL, automatically accounting for relative vs. absolute format and the active <config5:cpTrigger> setting.

```twig
<a href="{{ cpUrl('settings') }}">Visit control panel settings</a>
```

### Arguments

The `cpUrl()` function has the following arguments:

- **`path`** – The path that the resulting URL should point to on your site. It will be appended to your base site URL.
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](../../development/twig.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.

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

## `csrfInput`

Renders a CSRF token `input` element for use in an HTML form. All sites that have CSRF protection enabled must include this in each [form](../../development/forms.md) that makes a POST request.

::: code
```twig Usage
{{ csrfInput() }}
```
```html Output
<input type="hidden" name="CRAFT_CSRF_TOKEN" value="MfVs9Nyp33VKpXH7S0eUZZxy74Dw25VUYHGti-(...)">
```
:::


You can set additional attributes on the rendered tag by passing an `options` argument:

```twig
{{ csrfInput({
  id: 'my-csrf-input',
}) }}
```

::: warning
The output of `csrfInput()` should not be cached—statically, or using [template caches](tags.md#cache).
:::

Craft automatically sends [`no-cache` headers](craft5:craft\web\Response::setNoCacheHeaders()) when generating or outputting a CSRF token. <Since ver="5.3.0" description="We began sending automatic no-cache headers in {product} {ver}." />

A special `async` key in the passed hash allows you to override the global <config5:asyncCsrfInputs> setting for a single input <Since ver="5.1.0" feature="The asyncCsrfInputs setting" />:

```twig
{{ csrfInput({
  async: true,
}) }}
```

Asynchronous CSRF inputs _are_ cacheable, and therefore no headers are sent—but other features of the page (including other `csrfInput()` calls) can still cause no-cache headers to be sent.

Craft outputs a placeholder element, and registers a snippet of JavaScript that requests a token over Ajax, once the page has loaded in the client. Only one request is made, regardless of the number of inputs on the page.

## `dataUrl`

Outputs an asset or file as a base64-encoded [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). You can pass it an <craft5:craft\elements\Asset> object or a file path (optionally using an [alias](../../configure.md#aliases)).

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

## `date`

Converts an argument to a date to allow comparison, like [Twig’s `date()` function](https://twig.symfony.com/doc/3.x/functions/date.html).

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

## `dump`

Overrides Twig’s default [`dump()`](https://twig.symfony.com/doc/3.x/functions/dump.html) function  with one that is available in all contexts (not just when the Twig environment is in “debug” mode), and produces consistent output with the [`{% dd %}` tag](./tags.md#dd).

```twig
{% set news = craft.entries()
  .section('news')
  .all() %}

{{ dump(news|column('title')) }}
```

## `encodeUrl`

Ensures a URL contains only ASCII characters. The underlying <craft5:craft\helpers\UrlHelper::encodeUrl()> function is automatically called by Craft’s internal redirection logic. This is typically only required when using a URL in an HTTP header. Supposing we have a URL with accented characters like `https://my-project.ddev.site/pages/åbçdé`…

```twig
{# …unencoded output leads to garbled characters, and won’t resolve if requested: #}
{% header "X-See-Also: #{entry.url}" %}
{# -> https://my-project.ddev.site/Ã¥bÃ§dÃ©  #}

{# …but encoding the output preserves the original accented characters: #}
{% header "X-See-Also: #{encodeUrl(entry.url)}" %}
{# -> https://my-project.ddev.site/%C3%A5b%C3%A7d%C3%A9 #}
```

## `endBody`

Outputs any scripts and styles that were registered for the “end body” position. It should be placed right before your `</body>` tag.

```twig{9}
<html>
  <head>
    {# ... #}
  </head>
  <body>
    <h1>{{ page.name }}</h1>
    {{ page.body }}

    {{ endBody() }}
  </body>
</html>
```

## `entryType`

Get a reference to an entry type, by its handle:

```twig{1}
{% set type = entryType('post') %}

{{ type.name }}
```

This is equivalent to using the entries service, directly:

```twig{1}
{% set type = craft.app.entries.getEntryTypeByHandle('post') %}

{{ type.name }}
```

When creating entries in a [front-end form](../../development/forms.md), you can use the `entryType()` function to find the correct ID to submit (IDs can be unstable between environments, due to the way [project config](../../system/project-config.md#ids-uuids-and-handles) works):

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}

  {{ hiddenInput('typeId', entryType('post').id) }}

  {# ... #}
</form>
```

## `expression`

Creates and returns a new <yii2:yii\db\Expression> object, for use in database queries.

```twig
{% set entries = craft.entries()
  .andWhere(expression('[[authorId]] = :authorId', {authorId: currentUser.id}))
  .all() %}
```

## `failMessageInput`

Renders a hidden `input` element with a tamper-proof [failure](../../development/forms.md#failure) message.

```twig{3}
<form method="post">
  {{ actionInput('users/save-user') }}
  {{ failMessageInput('Something went wrong when updating your profile.') }}

  {# ... #}
</form>
```

You can set additional attributes on the `input` tag by passing an `options` argument:

```twig
{{ failMessageInput('Something went wrong when updating your profile.', {
  id: 'failure-message-input'
}) }}
```

The output is equivalent to this Twig:

```twig
<input
  type="hidden"
  name="failMessage"
  value="{{ 'Something went wrong when updating your profile.'|hash }}">
```

Failure messages are stored in the session as [flashes](../../development/forms.md#flashes).

<See path="../../development/forms.md" label="Working with Forms" />

## `fieldValueSql`

Generates a platform-specific SQL expression to extract a value from elements’ JSON content column.

```twig
{% set longestFilm = craft.entries()
  .section('films')
  .max(fieldValueSql(entryType('film'), 'runtimeMinutes')) %}
```

::: tip
Craft automatically handles this for `orderBy()` and `select()` expressions, as well as when using field methods, directly:

```twig
{% set shortFilms = craft.entries()
  .section('films')
  .runtimeMinutes('<= 20')
  .orderBy('runtimeMinutes DESC')
  .all() %}
```
:::

### Arguments

- `provider` — An object that implements `craft\base\FieldLayoutProviderInterface`, like an [entry type](../element-types/entries.md#entry-types) or [asset volume](../element-types/assets.md#volumes)—basically anything that defines a field layout.
    ```twig
    {# Load a field layout provider: #}
    {# set volume = craft.app.volumes.getVolumeByHandle('photos') %}
    {% set longExposures = craft.assets()
      .volume('photos')
      .andWhere('between', (fieldValueSql(volume, 'shutterSpeed')), 0.17, 1)
      .all() %}
    ```

    The provider can also be passed from an existing resource, like `entry.type`.

- `fieldHandle` — The field’s handle in the given field layout. This may be different than the field’s global definition—especially if the field is present [multiple times](../../system/fields.md#multi-instance-fields) in the layout.

## `floor`

Rounds a number down.

```twig
{{ floor(42.9) }}
{# Output: 42 #}
```

## `getenv`

Returns the value of an environment variable, using <craft5:craft\helpers\App::env()>.

```twig
{{ getenv('MAPS_API_KEY') }}
```

::: danger
Take care to not leak sensitive environment variables into your HTML!
:::

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
        url @transform (width: 300)
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

This works identically to Twig’s core [`include`](https://twig.symfony.com/doc/3.x/functions/include.html) function.

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

This works identically to Twig’s core [`max`](https://twig.symfony.com/doc/3.x/functions/max.html) function.

## `min`

Returns the lowest value in an array.

This works identically to Twig’s core [`min`](https://twig.symfony.com/doc/3.x/functions/min.html) function.

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
This works similarly to the [raw](https://twig.symfony.com/doc/3.x/filters/raw.html) filter, except that Twig will remember not to escape the HTML even if the variable is passed to another template/macro, whereas `|raw` filters only have an effect if used directly in an output tag.
:::

## `redirectInput`

Output an HTML input equivalent to `<input type="hidden" name="redirect" value="{{ url|hash }}">`, for use in [forms](../../development/forms.md) that POST data to Craft or a plugin.

```twig
{{ redirectInput(url) }}
```

The URL is typically parsed as an object template, meaning dynamic redirects are possible, based on the data being manipulated.

You can optionally set additional attributes on the resulting `input` tag by passing an `options` argument:

```twig
{{ redirectInput(url, {
  id: 'redirect-input'
}) }}
```

::: warning
Don’t include user-provided data in redirection URLs, directly (via interpolation in a template) or indirectly (rendered in an object template).
:::

## `renderObjectTemplate`

Evaluates a string as an [object template](../../system/object-templates.md), using the provided element, model, or hash.

```twig
{{ renderObjectTemplate('👋 Hi, {fullName}!', currentUser) }}
{# Output: 👋 Hi, Oli! #}

{{ renderObjectTemplate('✨ {foo}', { foo: "I’m a made-up hash!" }) }}
{# Output: ✨ I’m a made-up hash! #}
```

::: danger
Do not pass user-supplied templates to the `renderObjectTemplate()` function!
:::

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
{% set promos = craft.entries().section('promos').all() %}
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
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](../../development/twig.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
- **`siteId`** – The ID of the site that the URL should point to. By default the current site will be used.

## `source`

Returns the content of a template without rendering it.

This works identically to Twig’s core [`source`](https://twig.symfony.com/doc/3.x/functions/source.html) function.

## `successMessageInput`

Renders a hidden `input` element with a tamper-proof [success](../../development/forms.md#success) message.

```twig{3}
<form method="post">
  {{ actionInput('users/save-user') }}
  {{ successMessageInput('Your profile has been updated!') }}

  {# ... #}
</form>
```

You can set additional attributes on the `input` tag by passing an `options` argument:

```twig
{{ successMessageInput('Your profile has been updated!', {
  id: 'success-message-input'
}) }}
```

The output is equivalent to this Twig:

```twig
<input
  type="hidden"
  name="successMessage"
  value="{{ 'Your profile has been updated!'|hash }}">
```

Success messages are stored in the session as [flashes](../../development/forms.md#flashes).

<See path="../../development/forms.md" label="Working with Forms" />

## `svg`

Outputs an SVG document.

You can pass the following things into it:

- An SVG file path.

  ```twig
  {{ svg('@webroot/icons/lemon.svg') }}
  ```

- A <craft5:craft\elements\Asset> object, such as one pulled in from an [Assets field](../field-types/assets.md).

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

Images passed via path/alias will _not_ automatically be sanitized and namespaced.

<!-- textlint-disable terminology -->

You can also specify a custom class name that should be added to the root `<svg>` node using the [attr](filters.md#attr) filter:

<!-- textlint-enable terminology -->

```twig
{{ svg('@webroot/icons/lemon.svg')|attr({ class: 'lemon-icon' }) }}
```

::: tip
Consider caching the output, especially if you’re loading SVG files from remote volumes or URLs, so Craft doesn’t download the file each time your template is rendered.
:::

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
  id: 'foo',
  name: 'bar',
  required: true
}) }}
{# Output: <input id="foo" name="bar" required> #}
```

Any attribute set to `null` or `false` will be omitted.

::: tip
Attribute values are HTML-encoded automatically:
```twig
{{ tag('input', {
  name: 'bar',
  value: 'Foobar & Baz',
}) }}
{# Output: <input name="bar" value="Foobar &amp; Baz"> #}
```
:::

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
- **`params`** – Any query string parameters that should be appended to the URL. This can be either a string (e.g. `'foo=1&bar=2'`) or a [hash](../../development/twig.md#hashes) (e.g. `{foo:'1', bar:'2'}`).
- **`scheme`** – Which scheme the URL should use (`'http'` or `'https'`). The default value depends on whether the current request is served over SSL or not. If not, then the scheme in your Site URL will be used; if so, then `https` will be used.
- **`mustShowScriptName`** – If this is set to `true`, then the URL returned will include “index.php”, disregarding the <config5:omitScriptNameInUrls> config setting. (This can be useful if the URL will be used by POST requests over Ajax, where the URL will not be shown in the browser’s address bar, and you want to avoid a possible collision with your site’s .htaccess file redirect.)

Using the `url()` function has advantages over hard-coding URLs in your templates:

- Generated URLs will encourage consistency by respecting settings like [addTrailingSlashesToUrls](config5:addTrailingSlashesToUrls).
- Your site will be more portable, making it easier to do something like move to a new domain or subdomain.
- If the page has a `token` URL parameter, that token will automatically get appended to generated URLs to maintain preview context navigating around the site.

::: tip
You can use the `url()` function for appending query string parameters and/or enforcing a scheme on an absolute URL:
```twig
{{ url('http://my-project.tld', 'foo=1', 'https') }}
{# Output: "https://my-project.tld?foo=1" #}
```
:::
