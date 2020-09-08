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
| [switch](#switch)                                                     | Switch the template output based on a give value.                                                                                                                                                                                                                                      |
| [use](https://twig.symfony.com/doc/2.x/tags/use.html)                 | Inherits from another template horizontally.                                                                                                                                                                                                                                           |
| [unique](https://twig.symfony.com/doc/2.x/tags/verbatim.html)         | Disables parsing of nested Twig code.                                                                                                                                                                                                                                                  |
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
// Fetch tags as arrays
$tags = \craft\elements\Tag::find()
    ->asArray()
    ->all();
```

#### `fixedOrder`

::: code

```twig
{# Fetch tags created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set tags = craft.tags()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
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

* A big list of entries
* A Matrix field loop, where some of the blocks have relational fields on them, adding their own additional database queries to the page
* Whenever you’re pulling in data from another site

Narrows the query results based on the tags’ last-updated dates.

* Don’t use them to cache static text; that will be more expensive than simply outputting the text.
* You can’t use them outside of top-level `{% block %}` tags within a template that extends another.
* The `{% cache %}` tag will only cache HTML, so using tags like [{% css %}](#css) and [{% js %}](#js) inside of it doesn’t make sense because they don’t actually output HTML therefore their output won’t be cached.

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
{# Fetch tags in the Foo group #}
{% set tags = craft.tags()
    .group('foo')
    .all() %}
```

### Parameters

Possible values include:

#### Header

You specify the actual header that should be set by typing it as a string after the word `header`. This parameter is required.

## `trashed`

This tag gives plugins and modules an opportunity to hook into the template, to either return additional HTML or make changes to the available template variables.

```twig
// Fetch tags in the Foo group
$tags = \craft\elements\Tag::find()
    ->group('foo')
    ->all();
```

Narrows the query results based on the tags’ IDs.

## `siteId`

Possible values include:

```twig
{# Fetch tags in the group with an ID of 1 #}
{% set tags = craft.tags()
    .groupId(1)
    .all() %}
```

::: code

```twig
// Fetch tags in the group with an ID of 1
$tags = \craft\elements\Tag::find()
    ->groupId(1)
    ->all();
```
:::

### Parameters

The `{% html %}` tag supports the following parameters:

#### Position

Causes the query to return matching tags as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).

| Value                                            | Description                                          |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were created on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were created before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01. |

```twig
{# Fetch the tag by its ID #}
{% set tag = craft.tags()
    .id(1)
    .one() %}
```

Causes the query results to be returned in reverse order.

## `id`

::: code

```twig
// Fetch the tag by its ID
$tag = \craft\elements\Tag::find()
    ->id(1)
    ->one();
```

::: warning
Setting the position to `on load` or `on ready` will cause Craft to load its internal copy of jQuery onto the page (even if the template is already including its own copy), so you should probably avoid using them in front-end templates.
:::

### Parameters

Determines the number of tags that should be returned.

#### Position

::: code

| Value                                            | Description                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were updated on or after 2018-04-01.                                  |
| `'< 2018-05-01'`                              | that were updated before 2018-05-01                                        |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.                       |
| `on load`                                        | At the end of the page’s `<body>`, within `jQuery(window).load()`    |
| `on ready`                                       | At the end of the page’s `<body>`, within `jQuery(document).ready()` |

```twig
{# Fetch tags in reverse #}
{% set tags = craft.tags()
    .inReverse()
    .all() %}
```

By default, `at endBody` will be used.

::: warning
The `{% nav %}` tag requires elements to be queried in a specific (hierarchical) order, so make sure you don’t override the `order` criteria parameter in conjunction with this tag.
:::

#### `with`

::: code

```twig
// Fetch tags in reverse
$tags = \craft\elements\Tag::find()
    ->inReverse()
    ->all();
```

Attributes will be rendered by <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

::: tip
If you only specify one variable name here, the `pageInfo` variable will be called `paginate` by default for backwards compatibility.
:::

## `namespace`

::: code

For example, this:

```twig
{# Fetch up to 10 tags  #}
{% set tags = craft.tags()
    .limit(10)
    .all() %}
```

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.

```html
// Fetch up to 10 tags
$tags = \craft\elements\Tag::find()
    ->limit(10)
    ->all();
```

For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If you want class names to get namespaced as well, add the `withClasses` flag. That will affect both class CSS selectors and `class` attributes:

```twig
{# Fetch all tags except for the first 3 #}
{% set tags = craft.tags()
    .offset(3)
    .all() %}
```

::: code

```html{2,5}
// Fetch all tags except for the first 3
$tags = \craft\elements\Tag::find()
    ->offset(3)
    ->all();
```

::: tip
This tag works identically to the [namespace](filters.md#namespace) filter, except that it will call <craft3:craft\web\View::setNamespace()> at the beginning, so any PHP code executed within it can be aware of what the nested IDs will become.
:::

## `nav`

Narrows the query results to only tags that are related to certain other elements.


```twig
{# Fetch all tags in order of date created #}
{% set tags = craft.tags()
    .orderBy('dateCreated asc')
    .all() %}
```

### Parameters

See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.

#### Item name

The first thing to follow “`{% nav`” is the variable name you’d like to use to represent each item in the loop, e.g. `item`, `entry`, or `category`. You will be using this variable name to reference the items inside the loop.

#### `orderBy`

Next you need to type the word “`in`”, followed by the array of entries the tag should loop through. This can be an array of elements, or an [element query](../element-queries.md).

::: warning
The `{% nav %}` tag requires elements to be queried in a specific (hierarchical) order, so make sure you don’t override the `order` criteria parameter in conjunction with this tag.
:::

### Showing children

To show the children of the current element in the loop, use the `{% children %}` tag. When Craft gets to this tag, it will loop through the element’s children, applying the same template defined between your `{% nav %}` and `{% endnav %}` tags to those children.

::: code

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::

## `preferSites`

Determines which site(s) the tags should be queried in.

```twig
// Fetch all tags in order of date created
$tags = \craft\elements\Tag::find()
    ->orderBy('dateCreated asc')
    ->all();
```

The current site will be used by default.

::: tip
You can use the <config3:pageTrigger> config setting to customize what comes before the actual page number in your URLs. For example you could set it to `'page/'`, and your paginated URLs would start looking like `http://my-project.test/news/page/2`.
:::

::: warning
Only a single `{% paginate %}` tag should be used per request.
:::

### Parameters

::: code

#### Querying Tags

Once you’ve created a tag query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. Use the `limit` parameter to define how many results should show up per page (100 by default).

::: warning
This parameter needs to be an actual query object, not an array of pre-fetched results. So don’t call `all()` on the query before passing it in.
:::

#### `relatedTo`

The current site will be used by default.

* `as pageInfo, pageEntries`
* `as pageEntries`

Possible values include:

* `pageInfo` gets set to a <craft3:craft\web\twig\variables\Paginate> object, which provides info about the current page, and some helper methods for creating links to other pages. (See [below](#the-pageInfo-variable) for more info.)
* `pageEntries` gets set to an array of the results (e.g. the elements) that belong to the current page.

::: tip
If you only specify one variable name here, the `pageInfo` variable will be called `paginate` by default for backwards compatibility.
:::

### Showing the results

The `{% paginate %}` tag won’t actually output the current page’s results for you. It will only give you an array of the results that should be on the current page (referenced by the variable you defined in the `as` parameter.)

Narrows the query results based on the tags’ titles.

```twig
{# Fetch unique tags from Site A, or Site B if they don’t exist in Site A #}
{% set tags = craft.tags()
    .site('*')
    .unique()
    .preferSites(['a', 'b'])
    .all() %}
```

### The `pageInfo` variable

Possible values include:

* **`pageInfo.first`** – The offset of the first result on the current page.
* **`pageInfo.last`** – The offset of the last result on the current page.
* **`pageInfo.total`** – The total number of results across all pages
* **`pageInfo.currentPage`** – The current page number.
* **`pageInfo.totalPages`** – The total number of pages.
* **`pageInfo.prevUrl`** – The URL to the previous page, or `null` if you’re on the first page.
* **`pageInfo.nextUrl`** – The URL to the next page, or `null` if you’re on the last page.
* from the site with an ID of `1`.
* **`pageInfo.lastUrl`** – The URL to the last page.
* not in a site with an ID of `1` or `2`.
* **`pageInfo.getPrevUrls( [dist] )`** – Returns an array of URLs to the previous pages, with keys set to the page numbers. The URLs are returned in ascending order. You can optionally pass in the maximum distance away from the current page the function should go.
* **`pageInfo.getNextUrls( [dist] )`** – Returns an array of URLs to the next pages, with keys set to the page numbers. The URLs are returned in ascending order. You can optionally pass in the maximum distance away from the current page the function should go.
* **`pageInfo.getRangeUrls( start, end )`** – Returns an array of URLs to pages in a given range of page numbers, with keys set to the page numbers.


### Example

The [pageInfo](#the-pageInfo-variable) variable gives you lots of options for building the pagination navigation that’s right for you. Here are a few common examples.

#### Previous/Next Page Links

If you just want simple Previous Page and Next Page links to appear, you can do this:

```twig
// Fetch unique tags from Site A, or Site B if they don’t exist in Site A
$tags = \craft\elements\Tag::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```

Narrows the query results to only tags that have been soft-deleted.

#### First/Last Page Links

::: code

```twig
{# Fetch all tags that are related to myCategory #}
{% set tags = craft.tags()
    .relatedTo(myCategory)
    .all() %}
```

There’s no reason to wrap those links in conditionals since there will always be a first and last page.

#### Nearby Page Links

Narrows the query results based on the tags’ UIDs.

```twig
// Fetch all tags that are related to $myCategory
$tags = \craft\elements\Tag::find()
    ->relatedTo($myCategory)
    ->all();
```

In this example we’re only showing up to five page links in either direction of the current page. If you’d prefer to show more or less, just change the numbers that are passed into `getPrevUrls()` and `getNextUrls()`. You can also choose to not pass any number in at all, in which case *all* previous/next page URLs will be returned.

## `redirect`

This tag will redirect the browser to a different URL.

```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all tags that match the search query #}
{% set tags = craft.tags()
    .search(searchQuery)
    .all() %}
```

### Parameters

Determines whether only elements with unique IDs should be returned by the query.

#### The URL

Immediately after typing “`{% redirect`”, you need to tell the tag where to redirect the browser. You can either give it a full URL, or just the path.

#### The Status Code

::: code

You can customize which status code accompanies your redirect response by typing it right after the URL. For example, the following code would return a `301` redirect (permanent):

```twig
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all tags that match the search query
$tags = \craft\elements\Tag::find()
    ->search($searchQuery)
    ->all();
```

#### Flash Messages

Narrows the query results based on the tags’ URIs.

```twig
{% if not currentUser.isInGroup('members') %}
    {% redirect "pricing" 301 with notice "You have to be a member to access that!" %}
{% endif %}
```

## `requireGuest`

This tag will ensure that the user is **not** logged in. If they’re already logged in, they’ll be redirected to the page specified by your <config3:postLoginRedirect> config setting.

```twig
// Fetch tags from the Foo site
$tags = \craft\elements\Tag::find()
    ->site('foo')
    ->all();
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the guest enforcement will take place.

## `requireLogin`

This tag will ensure that the user is logged in. If they aren’t, they’ll be redirected to a Login page and returned to the original page after successfully logging in.

```twig
{# Fetch tags from the site with an ID of 1 #}
{% set tags = craft.tags()
    .siteId(1)
    .all() %}
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

Since all of the conditionals are evaluating the same thing – `matrixBlock.type` – we can simplify that code using a `{% switch %}` tag instead:

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
