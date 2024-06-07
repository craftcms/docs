---
description: Twig tags give your templates advanced logical capabilities.
---

# Tags

The following [tags](https://twig.symfony.com/doc/3.x/templates.html#control-structure) are available to Twig templates in Craft:

Tag | Description
--- | -----------
[apply](https://twig.symfony.com/doc/3.x/tags/apply.html) | Applies Twig filters to the nested template code.
[autoescape](https://twig.symfony.com/doc/3.x/tags/autoescape.html) | Controls the escaping strategy for the nested template code.
[block](https://twig.symfony.com/doc/3.x/tags/block.html) | Defines a template block.
[cache](#cache) | Caches a portion of your template.
[css](#css) | Registers a `<style>` tag on the page.
[dd](#dd) | Dump and die.
[dump](#dump) | Quietly dump a variable to the Yii debug toolbar.
[deprecated](https://twig.symfony.com/doc/3.x/tags/deprecated.html) | Triggers a PHP deprecation error.
[do](https://twig.symfony.com/doc/3.x/tags/do.html) | Does.
[embed](https://twig.symfony.com/doc/3.x/tags/embed.html) | Embeds another template.
[exit](#exit) | Ends the request.
[expires](#expires) | Set cache headers in a human-readable way.
[extends](https://twig.symfony.com/doc/3.x/tags/extends.html) | Extends another template.
[flush](https://twig.symfony.com/doc/3.x/tags/flush.html) | Flushes the output buffer.
[for](https://twig.symfony.com/doc/3.x/tags/for.html) | Loops through an array.
[from](https://twig.symfony.com/doc/3.x/tags/from.html) | Imports macros from a template.
[header](#header) | Sets an HTTP header on the response.
[hook](#hook) | Invokes a template hook.
[html](#html) | Registers arbitrary HTML code on the page.
[if](https://twig.symfony.com/doc/3.x/tags/if.html) | Conditionally executes the nested template code.
[import](https://twig.symfony.com/doc/3.x/tags/import.html) | Imports macros from a template.
[include](https://twig.symfony.com/doc/3.x/tags/include.html) | Includes another template.
[js](#js) | Registers a `<script>` tag on the page.
[macro](https://twig.symfony.com/doc/3.x/tags/macro.html) | Defines a macro.
[namespace](#namespace) | Namespaces input names and other HTML attributes, as well as CSS selectors.
[nav](#nav) | Creates a hierarchical nav menu.
[paginate](#paginate) | Paginates an element query.
[redirect](#redirect) | Redirects the browser.
[requireAdmin](#requireAdmin) | Requires that an admin user is logged in.
[requireEdition](#requireEdition) | Requires Craft’s edition to be equal to or better than what’s specified.
[requireGuest](#requireguest) | Requires that no user is logged in.
[requireLogin](#requirelogin) | Requires that a user is logged in.
[requirePermission](#requirepermission) | Requires that a user is logged in with a given permission.
[script](#script) | Renders an HTML script tag on the page.
[set](https://twig.symfony.com/doc/3.x/tags/set.html) | Sets a variable.
[switch](#switch) | Switch the template output based on a give value.
[tag](#tag) | Renders an HTML tag on the page.
[use](https://twig.symfony.com/doc/3.x/tags/use.html) | Inherits from another template horizontally.
[verbatim](https://twig.symfony.com/doc/3.x/tags/verbatim.html) | Disables parsing of nested Twig code.
[with](https://twig.symfony.com/doc/3.x/tags/with.html) | Creates a nested template scope.

## `cache`

This tag will cache the output from a portion of your template, which can improve performance for subsequent requests.

```twig
{% cache %}
  {% for block in entry.myMatrixField.all() %}
    <p>{{ block.text }}</p>
  {% endfor %}
{% endcache %}
```

Since the cache tag is for caching _output_ and not _logic_, avoid caching `{{ csrfInput() }}`, form fields, or parts of templates where the markup is highly dynamic or personalized.

By default, cached output will be kept by URL without regard for the query string.

While carefully-placed `{% cache %}` tags can offer significant boosts to performance, it’s important to know how the cache tag’s parameters affect its behavior.

::: tip
The `{% cache %}` tag captures code and styles registered with `{% js %}`, `{% script %}` and `{% css %}` tags.

External references from `{% js %}` and `{% css %}` tags will be stored as well.
:::

### Parameters

The `{% cache %}` tag provides multiple ways to define how long a fragment will be cached. Parameters can be combined to achieve the desired result:

#### `globally`

Caches the output globally (for the current site), rather than on a per-URL basis.

```twig
{% cache globally %}
```

#### `using key`

Specifies the name of the key the cache should use. When the key changes, the tag’s contents are re-rendered. If this parameter is not provided, a random key will be generated each time Twig re-parses the template.

```twig
{% cache using key "page-header" %}
```

::: warning
If you change template code within a `{% cache %}` that uses a custom key, existing template caches will not automatically be purged. Either assign the tag a new key, or clear your existing template caches manually by navigating to **Utilities** → **Caches** and clearing **Data caches**.
:::

You can provide a dynamic key and combine it with [globally](#globally) for more control over template caching. For example, you could cache based on the URL *with* the query string that’s ignored by default:

```twig
{% set request = craft.app.request %}
{% set uriWithQueryString = request.fullUri ~ request.queryStringWithoutPath %}
{% cache globally using key uriWithQueryString %}
```

#### `for`

The amount of time it should take for the cache to expire.

```twig
{% cache for 3 weeks %}
```

The accepted duration units are defined by <craft5:craft\helpers\DateTimeHelper::RELATIVE_TIME_UNITS>:

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

If this parameter is omitted, your <config5:cacheDuration> config setting will be used to define the default duration.

#### `until`

A [DateTime](http://php.net/manual/en/class.datetime.php) object defining when the cache should expire.

```twig
{% cache until entry.eventDate %}
```

::: tip
You can only use [for](#for) **_or_** [until](#until) in a single `{% cache %}` tag.
:::

#### `if`

Only activates the `{% cache %}` tag if a certain condition is met.

```twig
{# Only cache if this is a mobile browser #}
{% cache if craft.app.request.isMobileBrowser() %}
```

#### `unless`

Prevents the `{% cache %}` tag from activating if a certain condition is met.

```twig
{# Don’t cache if someone is logged in #}
{% cache unless currentUser %}
```

::: tip
You can only use [if](#if) _or_ [unless](#unless) in a single `{% cache %}` tag.
:::

### Cache Clearing

Your template caches will automatically clear when any elements (entries, assets, etc.) within the tags are saved or deleted.

If you have any element _queries_ within the tags (e.g. a `craft.entries`), and you create a new element that should be returned by one of the queries, Craft will also be able to figure that out and clear the cache.

You can also manually clear your template caches from the Utilities page, using the “Clear Caches” tool, or by using the `invalidate-tags/template` console command.

```bash
php craft invalidate-tags/template
```

### When to Use `{% cache %}` Tags

You should use `{% cache %}` tags when a template requires many database queries, or you’re doing something very computationally expensive with Twig. Some examples include…

- N+1 queries: Lists of elements or other records for which [eager-loading](../../development/eager-loading.md) is not possible.
- Other complex queries: Sections of pages that involve expensive database queries or post-processing, like sums, averages, etc.
- External data: Pulling in data from a remote source, like a JSON endpoint or RSS feed.

There are also some cases where it’s _not_ a good idea to use them:

- Static text: retrieving text from the cache is slower than just outputting it.
- Logic: anything outside a `{% block %}` tag can’t be cached. Variables set inside a `cache` tag won't be available to the surrounding template when the output is retrieved from the cache.
- Shuffled content: If the order of items on a page should be randomized each time the page is loaded, don’t cache it.

Depending on your project’s infrastructure and [cache configuration](../config/app.md#cache), it may take more time to read a value from the cache than it would to regenerate it. If the cache tag does not affect response times, profile your templates in the debug toolbar to find your bottleneck.

::: tip
The `{% cache %}` tag detects un-generated [image transform](../../development/image-transforms.md) URLs within it and holds off caching the template until the next request so those temporary image URLs aren’t cached.
:::

To cache scalar values that don’t benefit from the cache tag’s automatic invalidation, you can use Craft’s caching API directly via `craft.app.cache`.

## `css`

The `{% css %}` tag can be used to register a CSS file or a CSS code block.

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
To register a CSS file, the URL must begin with `https://` or `http://`, or end in `.css`.
:::

### Parameters

The `{% css %}` tag supports the following parameters:

#### `with`

Any HTML attributes that should be included on the `<style>` tag.

```twig
{% css with {type: 'text/css'} %}
```

Attributes will be rendered by <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

## `dd`

Outputs a variable to the browser and ends the request. (`dd` is short for “Dump-and-Die”)

```twig
{% set entry = craft.entries().id(entryId).one() %}
{% dd entry %}
```

## `dump`

Unlike [`dd`](#dd) (which halts execution), `{% dump %}` quietly logs the current context (or a provided variable) to the Yii debug toolbar, in a special **Dumps** tab. You can use the tag any number of times during a request, and Craft will keep track of the template path and line number that produced the output. For example, this template…

```twig{3}
{# templates/_blog/post #}

{% dump entry %}

{# ... #}
```

…would log a <craft5:craft\elements\Entry> object tagged `templates/_blog/post:3` to the debug toolbar. If you’re not sure what variables you have access to in a given template, you can use the tag _without_ a variable to dump everything:

```twig
{% dump %}
```

In this scenario, keys of the dumped array are variable names, and the values represent the [data types](../../development/twig.md#types-of-values). Expand complex types to view nested properties by clicking any value with a signature like `craft\elements\Category {#123 ▶}`.

::: tip
To enable the debug toolbar, visit your user profile in the [control panel](../../system/control-panel.md) and check **Show the debug toolbar on the front end** within the **Preferences** tab.
:::

## `exit`

This tag will prevent the rest of the template from executing, and end the request.

```twig
{% set entry = craft.entries().id(entryId).one() %}

{% if not entry %}
  {% exit 404 %}
{% endif %}
```

### Parameters

The `{% exit %}` tag supports the following parameters:

#### Status

If you choose to set the HTTP status code that should be included with the response, Craft will look for the appropriate error template to render. For example, `{% exit 404 %}` will get Craft to return the `404.twig` template. If the template doesn’t exist, Craft will fall back on its own template corresponding to the status code.

::: tip
`{% exit %}` throws an [HttpException](yii2:yii\web\HttpException) with the appropriate status code, so with <config5:devMode> enabled a full error report and stack trace will be shown instead of an error template.
:::

#### Message

The second parameter is passed to the [error template](../../system/routing.md#error-templates) as the `message` variable:

```twig
{% if not currentUser.isInGroup('powerUsers') ?? false %}
  {% exit 403 'You must be a power user to access this page!' %}
{% endif %}
```

## `expires`

Control HTTP caching headers with a Twig-friendly date expression.

### Parameters

The `expires` tag accepts a single, optional expression beginning with either `in` or `on`.

`in`
:   Uses specified duration expression to set cache headers:

    - `{% expires in 1 week %}`
    - `{% expires in 2 hours %}`
    - `{% expires in 4 days %}`

    The allowed units are the same as those supported by the (unrelated) [`cache` tag](#cache).

`on`
:   Sets cache headers to a specific date.

    - `{% expires on entry.expiryDate %}`
    - `{% expires on now|date_modify('midnight next friday') %}`
    - `{% expires on tomorrow %}`

When neither an `in` or `on` clause are used in the tag, Craft instead calls <craft5:craft\web\Response::setNoCacheHeaders()>. Using the `expires` tag multiple times in a single request will only honor the _last_ call.

## `header`

This tag will set an HTTP header on the response.

```twig
{# Tell the browser to cache this page for 30 days #}
{% set expiry = now|date_modify('+30 days') %}

{% header "Cache-Control: max-age=" ~ (expiry.timestamp - now.timestamp) %}
{% header "Pragma: cache" %}
{% header "Expires: " ~ expiry|date('D, d M Y H:i:s', 'GMT') ~ " GMT" %}
```

::: tip
Headers which contain dates must be formatted according to [RFC 7234](https://tools.ietf.org/html/rfc7231#section-7.1.1.2). You can use the [httpdate](filters.md#httpdate) filter (added in Craft 3.6.10) to do this:
```twig
{% header "Expires: #{myDate|httpdate}" %}
```
:::

Setting a header this way will override any previously-set value. Some headers are best set with dedicated features like the [`expires` tag](#expires), or internal cookie APIs ([`craft.app.response.cookies`](yii2:yii\web\Response::getCookies()))

### Parameters

The `{% header %}` tag supports the following parameter:

#### Header

You specify the full header (including its name and value, separated by a `:`) that should be sent by typing it as a string after the word `header`. This parameter is required.

## `hook`

This tag gives plugins and modules an opportunity to hook into the template, to either return additional HTML or make changes to the available template variables.

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

See [Template Hooks](../../extend/template-hooks.md) for details on plugins and modules can work with `{% hook %}` tags.

## `html`

The `{% html %}` tag can be used to register arbitrary HTML code on the page.

```twig
{% html %}
  <p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>
{% endhtml %}
```

::: tip
The tag calls <craft5:craft\web\View::registerHtml()> under the hood, which can also be accessed via the [global `view` variable](global-variables.md#view).

```twig
{% set para = '<p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>' %}
{% do view.registerHtml(para) %}
```
:::

### Parameters

The `{% html %}` tag supports the following parameters:

#### Position

You can specify where the HTML code should be injected into the page using one of these position keywords:

| Keyword | Description
| ------- | -----------
| `at head` | In the page’s `<head>`
| `at beginBody` | At the beginning of the page’s `<body>`
| `at endBody` | At the end of the page’s `<body>`

```twig
{% html at head %}
```

By default, `at endBody` will be used.

## `js`

The `{% js %}` tag can be used to register a JavaScript file or a JavaScript code block.

```twig
{# Register a JS file: #}
{% js "/assets/js/script.js" %}

{# Register a JS code block: #}
{% js %}
  _gaq.push([
    "_trackEvent",
    "Search",
    "{{ searchTerm|e('js') }}"
  ]);
{% endjs %}
```

::: tip
To register a JavaScript file, the URL must begin with `https://` or `http://`, or end in `.js`.

To provide a *dynamic* filename reference, use [`view.registerJsFile()`](craft5:craft\web\View::registerJsFile()) instead:
```twig
{% set myJsFile = "/assets/js/script.js" %}
{% do view.registerJsFile(myJsFile) %}
```
:::

If a duplicate URL or JavaScript block is registered, Craft will only output it once. Blocks are registered with a key derived from the `md5` hash of its contents, after stripping whitespace from its start and end, and ensuring it is terminated by a semicolon.

Suppose one of your entries relied on a carousel library for slideshows managed via a Matrix field—some entries may have _no_ slideshows, but others may have _multiple_:

```twig
{% for block in entry.myMatrixField.all() %}
  {% switch block.type %}
    {% case 'text' %}
      {{ block.text|md }}
    {% case 'slideshow' %}
      {# 1. Include carousel library: #}
      {% js 'https://cdn.jsdelivr.net/npm/package/file' %}

      {# 2. Initialize this carousel instance: #}
      {% js %}
        Carousel.init('#carousel-{{ block.uid | e('js') }}')
      {% endjs %}

      {# 3. Output carousel markup: #}
      <div id="carousel-{{ block.uid }}">
        {% for image in block.images.all() %}
          {{ image.getImg() }}
        {% endfor %}
      </div>
    {% default %}
      <p>Unknown block type!</p>
{% endfor %}
```

Rendering this template would result in the library (1) being output _once_ (because the URL is the same each time), but each initialization block (2) being output individually (because it includes a unique `id` target for the current carousel). If no `slideshow` blocks were rendered, no scripts would be output—but you could still register the same script elsewhere on your site without fear of it being included twice.

### Parameters

The `{% js %}` tag supports the following parameters:

#### Position

You can specify where the `<script>` tag should be added to the page using one of these position keywords:

| Keyword | Description
| ------- | -----------
| `at head` | In the page’s `<head>`
| `at beginBody` | At the beginning of the page’s `<body>`
| `at endBody` | At the end of the page’s `<body>`
| `on load` | At the end of the page’s `<body>`, within `jQuery(window).load()`
| `on ready` | At the end of the page’s `<body>`, within `jQuery(document).ready()`

```twig
{% js at head %}
```

By default, `at endBody` will be used.

::: warning
Setting the position to `on load` or `on ready` will cause Craft to load its internal copy of jQuery onto the page (even if the template is already including its own copy), so you should probably avoid using them in front-end templates.
:::

#### `with`

Any HTML attributes that should be included on the `<script>` tag.

```twig
{% js "/assets/js/script.js" with {
  defer: true
} %}
```

Attributes will be rendered by <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

::: warning
The `with` parameter is only available when you specify a JavaScript file; it won’t have any effect with a JavaScript code block.
:::

## `namespace`

The `{% namespace %}` tag can be used to namespace input names and other HTML attributes, as well as CSS selectors.

For example, this:

```twig
{% namespace 'foo' %}
<style>
  .text { font-size: larger; }
  #title { font-weight: bold; }
</style>
<input class="text" id="title" name="title" type="text">
{% endnamespace %}
```

would become this:

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

Notice how the `#title` CSS selector became `#foo-title`, the `id` attribute changed from `title` to `foo-title`, and the `name` attribute changed from `title` to `foo[title]`.

If you want class names to get namespaced as well, add the `withClasses` flag. That will affect both class CSS selectors and `class` attributes:

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
This tag works identically to the [namespace](filters.md#namespace) filter, except that it will call <craft5:craft\web\View::setNamespace()> at the beginning, so any PHP code executed within it can be aware of what the nested IDs will become.
:::

## `nav`

This tag helps create a hierarchical navigation menu for entries in a [Structure section](../element-types/entries.md#section-types) or a [Category Group](../element-types/categories.md).

```twig
{% set entries = craft.entries().section('pages').all() %}

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
The `{% nav %}` tag should _only_ be used in times when you want to show elements in a hierarchical list. If you want to show elements in a flat list, use a [for](https://twig.symfony.com/doc/tags/for.html) tag instead.
:::

### Parameters

The `{% nav %}` tag has the following parameters:

#### Item name

The first thing to follow “`{% nav`” is the variable name you’d like to use to represent each item in the loop, e.g. `item`, `entry`, or `category`. You will be using this variable name to reference the items inside the loop.

#### `in`

Next you need to type the word “`in`”, followed by the array of entries the tag should loop through. This can be an array of elements, or an [element query](../../development/element-queries.md).

::: warning
The `{% nav %}` tag requires elements to be queried in a specific (hierarchical) order, so make sure you don’t override the `order` criteria parameter in conjunction with this tag.
:::

### Showing children

The `{% children %}` tag will output the children of the current element in the loop, using the same template defined between your `{% nav %}` and `{% endnav %}` tags.

If you want to show some additional HTML surrounding the children, but only in the event that the element actually has children, wrap your `{% children %}` tag with `{% ifchildren %}` and `{% endifchildren %}` tags.

::: warning
Don’t add any special logic between your `{% ifchildren %}` and `{% endifchildren %}` tags. These are special tags that are used to identify the raw HTML that should be output surrounding nested nav items. They don’t get parsed in the order you’d expect.
:::

## `paginate`

This tag makes it easy to paginate query results across multiple pages.

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

Complete reference for the `paginate` tag and the related `pageInfo` objects is available on the [element queries](../../development/element-queries.md#pagination) page.

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### Parameters

The `{% paginate %}` tag has the following parameters:

#### Query

The first thing you pass into the `{% paginate %}` tag is a query object (such as an [element query](../../development/element-queries.md)), which defines all of the results that should be paginated. Use the `limit` parameter to define how many results should show up per page (100 by default).

::: warning
This parameter needs to be an actual query object, not an array of pre-fetched results. So don’t call `all()` on the query before passing it in.
:::

#### `as`

Next up you need to type “`as`”, followed by one or two variable names:

- `as pageInfo, pageEntries`
- `as pageEntries`

Here’s what they get set to:

- `pageInfo` gets set to a <craft5:craft\web\twig\variables\Paginate> object, which provides info about the current page, and some helper methods for creating links to other pages. (See [below](#the-pageInfo-variable) for more info.)
- `pageEntries` gets set to an array of the results (e.g. the elements) that belong to the current page.

::: tip
If you only specify one variable name here, the `pageInfo` variable will be called `paginate` by default for backwards compatibility.
:::

### Showing the results

The `{% paginate %}` tag won’t actually output the current page’s results for you. It will only give you an array of the results that should be on the current page (referenced by the variable you defined in the `as` parameter.)

Following your `{% paginate %}` tag, you will need to loop through this page’s results using a [for](https://twig.symfony.com/doc/tags/for.html) tag.

```twig
{% paginate craft.entries().section('blog').limit(10) as pageEntries %}

{% for entry in pageEntries %}
  <article>
    <h1>{{ entry.title }}</h1>
    {{ entry.body }}
  </article>
{% endfor %}
```

### The `pageInfo` variable

The `pageInfo` variable (or whatever you’ve called it) provides the following properties and methods:

- **`pageInfo.first`** – The offset of the first result on the current page.
- **`pageInfo.last`** – The offset of the last result on the current page.
- **`pageInfo.total`** – The total number of results across all pages
- **`pageInfo.currentPage`** – The current page number.
- **`pageInfo.totalPages`** – The total number of pages.
- **`pageInfo.prevUrl`** – The URL to the previous page, or `null` if you’re on the first page.
- **`pageInfo.nextUrl`** – The URL to the next page, or `null` if you’re on the last page.
- **`pageInfo.firstUrl`** – The URL to the first page.
- **`pageInfo.lastUrl`** – The URL to the last page.
- **`pageInfo.getPageUrl( page )`** – Returns the URL to a given page number, or `null` if the page doesn’t exist.
- **`pageInfo.getPrevUrls( [dist] )`** – Returns an array of URLs to the previous pages, with keys set to the page numbers. The URLs are returned in ascending order. You can optionally pass in the maximum distance away from the current page the function should go.
- **`pageInfo.getNextUrls( [dist] )`** – Returns an array of URLs to the next pages, with keys set to the page numbers. The URLs are returned in ascending order. You can optionally pass in the maximum distance away from the current page the function should go.
- **`pageInfo.getRangeUrls( start, end )`** – Returns an array of URLs to pages in a given range of page numbers, with keys set to the page numbers.
- **`pageInfo.getDynamicRangeUrls( max )`** – Returns an array of URLs to pages in a dynamic range of page numbers that surround (and include) the current page, with keys set to the page numbers.

### Navigation examples

The [pageInfo](#the-pageInfo-variable) variable gives you lots of options for building the pagination navigation that’s right for you. Here are a few common examples.

#### Previous/Next Page Links

If you just want simple Previous Page and Next Page links to appear, you can do this:

```twig
{% set query = craft.entries()
  .section('blog')
  .limit(10) %}

{% paginate query as pageInfo, pageEntries %}

{% if pageInfo.prevUrl %}<a href="{{ pageInfo.prevUrl }}">Previous Page</a>{% endif %}
{% if pageInfo.nextUrl %}<a href="{{ pageInfo.nextUrl }}">Next Page</a>{% endif %}
```

Note that we’re wrapping those links in conditionals because there won’t always be a previous or next page.

#### First/Last Page Links

You can add First Page and Last Page links into the mix, you can do that too:

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

There’s no reason to wrap those links in conditionals since there will always be a first and last page.

#### Nearby Page Links

If you want to create a list of nearby pages, perhaps surrounding the current page number, you can do that too!

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

In this example we’re only showing up to five page links in either direction of the current page. If you’d prefer to show more or less, just change the numbers that are passed into `getPrevUrls()` and `getNextUrls()`. You can also choose to not pass any number in at all, in which case *all* previous/next page URLs will be returned.

## `redirect`

This tag will redirect the browser to a different URL.

```twig
{% if not user or not user.isInGroup('members') %}
  {% redirect "pricing" %}
{% endif %}
```

### Parameters

The `{% redirect %}` tag has the following parameter:

#### The URL

Immediately after typing “`{% redirect`”, you need to tell the tag where to redirect the browser. You can either give it a full URL, or just the path.

#### The Status Code

By default, redirects will have `302` status codes, which tells the browser that the requested URL has only been moved to the redirected URL _temporarily_.

You can customize which status code accompanies your redirect response by typing it right after the URL. For example, the following code would return a `301` redirect (permanent):

```twig
{% redirect "pricing" 301 %}
```

#### Flash Messages

You can optionally set flash messages that will show up for the user on the next request using the `with notice` and/or `with error` params:

```twig
{% if not currentUser.isInGroup('members') %}
  {% redirect "pricing" 301 with notice "You have to be a member to access that!" %}
{% endif %}
```

## `requireAdmin`

This tag will ensure that an admin user is logged in. If the user is not logged in, they’ll be redirected to the Login page specified by your <config5:loginPath> config setting and returned to the original page after logging in as an admin.

A user that’s already logged in but *not* an admin will get a 403 response.

```twig
{% requireAdmin %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the admin enforcement will take place.

## `requireEdition`

Requires Craft’s active edition to be equal to or “greater” than what’s specified. This is generally only useful to plugin developers who need to expose features only when a plugin is installed in a site running one edition or another.

If the Craft edition does not meet the requirement, the visitor will get a 404 response.

- `0` – Craft Solo
- `1` – Craft Pro

```twig
{# Require Craft Pro #}
{% requireEdition 1 %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the edition enforcement will take place.

::: tip
Control panel templates can use the `CraftSolo` and `CraftPro` variables.\
Example: `{% requireEdition CraftPro %}`.
:::

## `requireGuest`

This tag will ensure that the user is **not** logged in. If they’re already logged in, they’ll be redirected to the page specified by your <config5:postLoginRedirect> config setting.

```twig
{% requireGuest %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the guest enforcement will take place.

## `requireLogin`

This tag will ensure that the user is logged in. If they aren’t, they’ll be redirected to a Login page and returned to the original page after successfully logging in.

```twig
{% requireLogin %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the login enforcement will take place.

The login page location is based on your <config5:loginPath> config setting. If you do not set <config5:loginPath>, it defaults to `login`. That will throw a `404` error if you have not handled the `/login` route with a custom template. To use the control panel’s login form, set it to `admin/login` or `[your cpTrigger]/login`.

## `requirePermission`

This tag will ensure that the current user is logged in with an account that has a given permission.

```twig
{% requirePermission 'stayUpLate' %}
```

The user can have the permission either directly or through one of their user groups. If they don’t have it, a 403 (Forbidden) error will be served.

<See path="../../system/user-management.md" hash="permissions" label="User Permissions" description="View a complete list of available permissions." />

## `script`

Similar to the [`{% js %}`](#js) tag, but with full control over the resulting `<script>` tag’s attributes.

```twig
{% script with {type: 'module'} %}
// some JavaScript
{% endscript %}
```

## `switch`

“Switch statements” offer a clean way to compare a variable against multiple possible values, instead of using several repetitive `{% if %}` conditionals.

Take this template for example, which is running different template code depending on a Matrix block’s type:

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

Since all of the conditionals are evaluating the same thing – `matrixBlock.type` – we can simplify that code using a `{% switch %}` tag instead:

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
Unlike `switch` statements in other languages, the matching `case` block will be broken out of automatically. You don’t need to worry about adding `break` statements.
:::

### Checking multiple values from a single `{% case %}` tag

If you want to check for mulitple values from a single `{% case %}` tag, separate the values with `or` operators.

```twig
{% case "h2" or "h3" or "p" %}
  {# output an <h2>, <h3>, or <p> tag, depending on the block type #}
  {{ tag(matrixBlock.type, {
      text: matrixBlock.text
  }) }}
```

### Accessing the parent `loop` variable

If you’re using the `{% switch %}` tag inside of a `{% for %}` loop, you won’t be able to access Twig’s [loop variable](https://twig.symfony.com/doc/tags/for.html#the-loop-variable) directly inside of the `{% switch %}` tag.  Instead, you can access it like so:

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

The `{% tag %}` tag can be used to render an HTML element in a template.

It’s similar to the [tag](functions.md#tag) _function_, however the `{% tag %}` tag is better suited for cases where the tag contents need to be dynamic.

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

::: tip
Attribute values are HTML-encoded automatically:
```twig
{% tag 'p' with {
  title: 'Hello & Welcome',
} %}
  Hello, {{ currentUser.friendlyName }}
{% endtag %}
{# Output: <p title="Hello &amp; Welcome">Hello, Tim</p> #}
```
:::

### Parameters

The `{% tag %}` tag has the following parameters:

#### Name

<!-- textlint-disable terminology -->

The first thing you must pass to the `{% tag %}` tag is the name of the node that should be rendered.

<!-- textlint-enable terminology -->

#### `with`

<!-- textlint-disable terminology -->

Next, you can optionally type “` with `” followed by an object with attributes for the node.

<!-- textlint-enable terminology -->

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
