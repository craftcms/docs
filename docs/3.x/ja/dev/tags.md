# タグ

タグを利用して、[エントリ](sections-and-entries.md)、[ユーザー](users.md)、および、[アセット](assets.md)の分類を作成できます。

| Param                                                                 | Description                                                                                                                                                                                                                                                                            |
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
| [orderBy](#header)                                                    | Sets an HTTP header on the response.                                                                                                                                                                                                                                                   |
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
| [requireGuest](#requireguest)                                         | Requires that no user is logged-in.                                                                                                                                                                                                                                                    |
| [requireLogin](#requirelogin)                                         | Requires that a user is logged-in.                                                                                                                                                                                                                                                     |
| [requirePermission](#requirepermission)                               | Requires that a user is logged-in with a given permission.                                                                                                                                                                                                                             |
| [group](https://twig.symfony.com/doc/2.x/tags/set.html)               | Sets a variable.                                                                                                                                                                                                                                                                       |
| [script](#script)                                                     | Renders an HTML script tag on the page.                                                                                                                                                                                                                                                |
| [switch](#switch)                                                     | Switch the template output based on a give value.                                                                                                                                                                                                                                      |
| [tag](#tag)                                                           | Renders an HTML tag on the page.                                                                                                                                                                                                                                                       |
| [use](https://twig.symfony.com/doc/2.x/tags/use.html)                 | Inherits from another template horizontally.                                                                                                                                                                                                                                           |
| [verbatim](https://twig.symfony.com/doc/2.x/tags/verbatim.html)       | Disables parsing of nested Twig code.                                                                                                                                                                                                                                                  |
| [with](https://twig.symfony.com/doc/2.x/tags/with.html)               | Creates a nested template scope.                                                                                                                                                                                                                                                       |

## `search`

タグを作成する前に、それらを含めるためのタググループを作成しなければなりません。

```twig
{# Create a new tag query #}
{% set myTagQuery = craft.tags() %}
```

新しいタググループを作るには、「設定 > タグ」に移動し、「新しいタググループ」ボタンをクリックします。

Warning: If you’re suffering from abnormal page load times, you may be experiencing a suboptimal hosting environment. Please consult a specialist before trying `{% cache %}`. `{% cache %}` is not a substitute for fast database connections, efficient templates, or moderate query counts. Possible side effects include stale content, excessively long-running background tasks, stuck tasks, and in rare cases, death. Ask your hosting provider if `{% cache %}` is right for you.

どこか（エントリなど）にタグを割り当てるには、[タグフィールド](tags-fields.md)を作成し、フィールドレイアウトで追加しなければなりません。

While carefully-placed `{% cache %}` tags can offer significant boosts to performance, it’s important to know how the cache tag’s parameters can be used to fine-tune its behavior.

### Parameters

You can fetch tags in your templates or PHP code using **tag queries**.

#### `anyStatus`

::: code

```twig
// Create a new tag query
$myTagQuery = \craft\elements\Tag::find();
```

#### `asArray`

Specifies the name of the key the cache should use. When the key changes, the tag’s contents are re-rendered. If this parameter is not provided, a random key will be generated each time Twig re-parses the template.

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
If you change the template code within a `{% cache %}` that uses a custom key, any existing template caches will not automatically be purged. You will either need to assign the tag a new key, or clear your existing template caches manually selecting “Data Caches” in the Utilities → Clear Caches tool.
:::

You can provide a dynamic key and combine it with [globally](#globally) for more control over template caching. For example, you could cache based on the URL *with* the query string that’s ignored by default:

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

Tip: If this parameter is omitted, your <config3:cacheDuration> config setting will be used to define the default duration.

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
{# Only cache if this is a mobile browser #}
{% cache if craft.app.request.isMobileBrowser() %}
```

#### `fixedOrder`

::: code

```twig
{# Don’t cache if someone is logged in #}
{% cache unless currentUser %}
```

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Cache clearing

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

### When to use `{% cache %}` tags

::: code

Here are some examples of when to use them:

- A big list of entries
- A Matrix field loop, where some of the blocks have relational fields on them, adding their own additional database queries to the page
- Whenever you’re pulling in data from another site

Narrows the query results based on the tags’ last-updated dates.

- Don’t use them to cache static text; that will be more expensive than simply outputting the text.
- You can’t use them outside of top-level `{% block %}` tags within a template that extends another.
- The `{% cache %}` tag will only cache HTML, so using tags like [{% css %}](#css) and [{% js %}](#js) inside of it doesn’t make sense because they don’t actually output HTML therefore their output won’t be cached.

    ```twig
    {# Bad: #}

    {% extends "_layout" %}
    {% cache %}
        {% block "content" %}
            ...
        {% endblock %}
    {% endcache %}

    {# Good: #}

    {% extends "_layout" %}
    {% block "content" %}
        {% cache %}
            ...
        {% endcache %}
    {% endblock %}
    ```


Tip: The `{% cache %}` tag will detect if there are any ungenerated [image transform](../image-transforms.md) URLs within it. If there are, it will hold off on caching the template until the next request, so those temporary image URLs won’t get cached.

## `site`

::: code

```twig
{# Fetch tags updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set tags = craft.tags()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### Parameters

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

Attributes will be rendered by <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

## `uid`

This tag will dump a variable out to the browser and then end the request. (`dd` stands for “Dump-and-Die”.)

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
// Fetch tags in a specific order
$tags = \craft\elements\Tag::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```

### Parameters

::: code

#### Status

You can optionally set the HTTP status code that should be included with the response. If you do, Craft will look for the appropriate error template to render. For example, `{% exit 404 %}` will get Craft to return the `404.twig` template. If the template doesn’t exist. Craft will fallback on its own template corresponding to the status code.

## `title`

Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

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

### Parameters

The `{% header %}` tag supports the following parameter:

#### Header

You specify the actual header that should be set by typing it as a string after the word `header`. This parameter is required.

## `trashed`

This tag gives plugins and modules an opportunity to hook into the template, to either return additional HTML or make changes to the available template variables.

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

See [Template Hooks](../extend/template-hooks.md) for details on plugins and modules can work with `{% hook %}` tags.

## `siteId`

The `{% html %}` tag can be used to register arbitrary HTML code on the page.

```twig
{% html %}
    <p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>
{% endhtml %}
```

::: tip
The tag calls <craft3:craft\web\View::registerHtml()> under the hood, which can also be accessed via the global `view` variable.

```twig
{% set para = '<p>This will be placed right before the <code>&lt;/body&gt;</code> tag.</p>' %}
{% do view.registerHtml(para) %}
```
:::

### Parameters

The `{% html %}` tag supports the following parameters:

#### Position

You can specify where the HTML code should be injected into the page using one of these position keywords:

| Value                                            | Description                                          |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were created on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were created before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01. |

```twig
{% html at head %}
```

By default, `at endBody` will be used.

## `id`

The `{% js %}` tag can be used to register a JavaScript file or a JavaScript code block.

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
To register a JavaScript file, the URL must end in `.js`.

To provide a *dynamic* filename reference, use [`view.registerJsFile()`](craft3:craft\web\View::registerJsFile()) instead:
```twig
{% set myJsFile = "/assets/js/script.js" %}
{% do view.registerJsFile(myJsFile) %}
```
:::

### Parameters

The `{% js %}` tag supports the following parameters:

#### Position

You can specify where the `<script>` tag should be added to the page using one of these position keywords:

| Value                                            | Description                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were updated on or after 2018-04-01.                                  |
| `'< 2018-05-01'`                              | that were updated before 2018-05-01                                        |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.                       |
| `on load`                                        | At the end of the page’s `<body>`, within `jQuery(window).load()`    |
| `on ready`                                       | At the end of the page’s `<body>`, within `jQuery(document).ready()` |

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
The `{% nav %}` tag should _only_ be used in times when you want to show elements in a hierarchical list. If you want to show elements in a flat list, use a [for](https://twig.symfony.com/doc/tags/for.html) tag instead.
:::

### Parameters

The `{% nav %}` tag has the following parameters:

#### Item name

The first thing to follow “`{% nav`” is the variable name you’d like to use to represent each item in the loop, e.g. `item`, `entry`, or `category`. You will be using this variable name to reference the items inside the loop.

#### `orderBy`

Next you need to type the word “`in`”, followed by the array of entries the tag should loop through. This can be an array of elements, or an [element query](../element-queries.md).

::: warning
The `{% nav %}` tag requires elements to be queried in a specific (hierarchical) order, so make sure you don’t override the `order` criteria parameter in conjunction with this tag.
:::

### Showing children

The `{% children %}` tag will output the children of the current element in the loop, using the same template defined between your `{% nav %}` and `{% endnav %}` tags.

If you want to show some additional HTML surrounding the children, but only in the event that the element actually has children, wrap your `{% children %}` tag with `{% ifchildren %}` and `{% endifchildren %}` tags.

::: warning
Don’t add any special logic between your `{% ifchildren %}` and `{% endifchildren %}` tags. These are special tags that are used to identify the raw HTML that should be output surrounding nested nav items. They don’t get parsed in the order you’d expect.
:::

## `preferSites`

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

Paginated URLs will be identical to the first page’s URL, except that “/p_X_” will be appended to the end (where _X_ is the page number), e.g. `http://my-project.test/news/p2`.

::: tip
You can use the <config3:pageTrigger> config setting to customize what comes before the actual page number in your URLs. For example you could set it to `'page/'`, and your paginated URLs would start looking like `http://my-project.test/news/page/2`.
:::

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### Parameters

The `{% paginate %}` tag has the following parameters:

#### Querying Tags

The first thing you pass into the `{% paginate %}` tag is a query object (such as an [element query](../element-queries.md)), which defines all of the results that should be paginated. Use the `limit` parameter to define how many results should show up per page (100 by default).

::: warning
This parameter needs to be an actual query object, not an array of pre-fetched results. So don’t call `all()` on the query before passing it in.
:::

#### `relatedTo`

Next up you need to type “`as`”, followed by one or two variable names:

- `as pageInfo, pageEntries`
- `as pageEntries`

Here’s what they get set to:

- `pageInfo` gets set to a <craft3:craft\web\twig\variables\Paginate> object, which provides info about the current page, and some helper methods for creating links to other pages. (See [below](#the-pageInfo-variable) for more info.)
- `pageEntries` gets set to an array of the results (e.g. the elements) that belong to the current page.

::: tip
If you only specify one variable name here, the `pageInfo` variable will be called `paginate` by default for backwards compatibility.
:::

### Showing the results

The `{% paginate %}` tag won’t actually output the current page’s results for you. It will only give you an array of the results that should be on the current page (referenced by the variable you defined in the `as` parameter.)

Following your `{% paginate %}` tag, you will need to loop through this page’s results using a [for](https://twig.symfony.com/doc/tags/for.html) tag.

```twig
{% paginate craft.entries.section('blog').limit(10) as pageEntries %}

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

### Example

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

## `requireGuest`

This tag will ensure that the user is **not** logged in. If they’re already logged in, they’ll be redirected to the page specified by your <config3:postLoginRedirect> config setting.

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

The Login page location is based on your <config3:loginPath> config setting. If you do not set <config3:loginPath>, it defaults to `login`. That will throw a `404` error if you have not handled the `/login` route with a custom template. To use the control panel’s Login form, set it to `admin/login` or `[your cpTrigger]/login`.

## `requirePermission`

This tag will ensure that the current user is logged in with an account that has a given permission.

```twig
{% requirePermission 'stayUpLate' %}
```

The user can have the permission either directly or through one of their user groups. If they don’t have it, a 403 (Forbidden) error will be served.

See the [Users](../users.md#permissions) page for a list of available permissions.

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
