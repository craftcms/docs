# Element Queries

You can fetch [elements](../system/elements.md) (like entries, categories, assets, etc.) in your templates or PHP code using **element queries**.

<!-- more -->

Suppose you’ve already created a [section](../reference/element-types/entries.md#sections) for news posts and configured a URL scheme. Craft automatically loads the corresponding entry element when its URL is requested, and exposes it to the template under an `entry` variable. This is convenient—but it’s rare that a page only refers to a _single_ piece of content! What if we want to show a list of other recent posts, in a sidebar? Element queries are Craft’s way of loading elements anywhere you need them.

Element queries can be hyper-specific (like loading a single [global set](../reference/element-types/globals.md) by its handle) or relaxed (like a list of recently-updated [entries](../reference/element-types/entries.md)).

Working with element queries consists of three steps:

1. **Create the element query.** Calling the “factory function” corresponding to the [element type](#element-types) you want to fetch. For entries, this is `craft.entries()`; for categories, `craft.categories()`.
2. **Set some parameters.** By default, element queries will be configured to return _all_ elements of a given type. You can narrow that down to just the elements you care about by setting [parameters](#types-parameters) on the query.
3. **Execute the query.** Use a [query execution method](#executing-element-queries) to run the query and return results.

::: tip
[Relational fields](../system/relations.md) also return element queries (except when [eager-loaded](./eager-loading.md)), which you can treat the same as the result of step #1, above.
:::

Here’s what this process looks like, in practice:

::: code
```twig
{# Create an entry query and set some parameters on it #}
{% set postsQuery = craft.entries()
  .section('news')
  .orderBy('postDate DESC')
  .limit(10) %}

{# Execute the query and get the results #}
{% set posts = postsQuery.all() %}
```
```php
use craft\elements\Entry;

// Create an entry query and set some parameters on it
$postsQuery = Entry::find()
    ->section('news')
    ->orderBy('postDate DESC')
    ->limit(10);

// Execute the query and get the results
$posts = $postsQuery->all();
```
:::

You can eliminate the intermediate variable and flatten this into a single statement by chaining the [execution method](#executing-element-queries) on the end:

::: code
```twig
{% set posts = craft.entries()
  .section('news')
  .orderBy('postDate DESC')
  .limit(10)
  .all() %}
```
```php
use craft\elements\Entry;

$posts = Entry::find()
    ->section('news')
    ->orderBy('postDate DESC')
    ->limit(10)
    ->all();
```
:::

## Types + Parameters

Each type of element has its own function for creating element queries, and they each have their own parameters you can set. All element types expose parameters for their [custom fields](#querying-with-custom-fields).

### Element Types

See the query reference section of each [element type](../system/elements.md) for more details on working with them:

[Address Queries](../reference/element-types/addresses.md#querying-addresses) &rarr;
:     {% set addressQuery = craft.addresses() %}

[Asset Queries](../reference/element-types/assets.md#querying-assets) &rarr;
:     {% set assetQuery = craft.assets() %}

[Category Queries](../reference/element-types/categories.md#querying-categories) &rarr;
:     {% set categoryQuery = craft.categories() %}

[Entry Queries](../reference/element-types/entries.md#querying-entries) &rarr;
:     {% set entryQuery = craft.entries() %}

[Global Set Queries](../reference/element-types/globals.md#querying-globals) &rarr;
:     {% set globalQuery = craft.globals() %}

[Tag Queries](../reference/element-types/tags.md#querying-tags) &rarr;
:     {% set tagQuery = craft.tags() %}

[User Queries](../reference/element-types/users.md#querying-users) &rarr;
:     {% set userQuery = craft.users() %}

### Parameters

Parameters are set using methods after creating an element query, or by passing in key-value pairs to the factory function:

```twig
{% set images = craft.assets()
  .kind('image')
  .all() %}

{# ...or... #}

{% set images = craft.assets({
  kind: 'image',
}).all() %}

{# ...or if you’re fancy, set some parameters conditionally: #}

{% set assetsQuery = craft.assets() %}

{% if craft.app.request.getParam('onlyImages') %}
  {# Effectively the same as chaining query methods: #}
  {% do assetsQuery.kind('image') %}
{% endif %}

{% set images = assetsQuery.all() %}
```

::: tip
Query methods (except for those that [execute](#executing-element-queries) a query) modify some internal properties and return the query itself, allowing you to chained more methods together—just like Craft’s [fluent config](../configure.md#style) syntax!
:::

All element queries support a standard set of methods (like `.id()`, `.title()`, and [`.search()`](../system/searching.md)). These are documented alongside the [element type-specific](#element-types) parameters (like `.kind()` in the example above).

Typically, parameters make a query more specific—but setting a single parameter more than once will replace the previous constraint. Similarly, setting a parameter to `null` can _broaden_ a query by removing an existing constraint.

#### Querying with Custom Fields

In addition to native query parameters, Craft automatically injects methods for each of your [custom fields](../system/fields.md).

For example, if we wanted to find entries in a _Cars_ section with a specific paint color stored in a [dropdown](../reference/field-types/dropdown.md) field, we could perform this query:

```twig
{% set silverCars = craft.entries()
  .section('cars')
  .paintColor('silver')
  .all() %}
```

Custom field parameters can be combined for advanced filtering—in this example, we’re also applying a pair of constraints to a [date](../reference/field-types/date-time.md) field:

```twig
{% set silverCars = craft.entries()
  .section('cars')
  .paintColor(['silver', 'gold'])
  .modelYear('>= 1990', '<= 2000')
  .all() %}
```

See each [field type](../system/fields.md#field-types)’s documentation for what kinds of values you can use.

#### Case-Sensitivity

Queries against textual fields ([Color](../reference/field-types/color.md), [Country](../reference/field-types/country.md), [Email](../reference/field-types/email.md), [Icon](../reference/field-types/icon.md), [Link](../reference/field-types/link.md), [Plain Text](../reference/field-types/plain-text.md), and [Table](../reference/field-types/table.md)) are case-sensitive, by default.

To make a query case-_insensitive_, pass an object with the special `caseInsensitive` key:

```twig{4-5}
{% set cars = craft.entries()
  .section('cars')
  .brand({
    value: 'bmw',
    caseInsensitive: true,
  })
  .all() %}
```

[Dropdown](../reference/field-types/dropdown.md), [Radio](../reference/field-types/radio.md), [Checkboxes](../reference/field-types/checkboxes.md), and other fields whose only allowable values are determined by the field’s configuration are _always_ handled in a case-sensitive way.

### Reusing Queries

Sometimes, you might want to run a number of similar queries. Take this case, where we want to show some information about upcoming events at a library:

```twig
{# Assuming we're on a page for a specific branch: #}
{% set upcomingEvents = craft.entries()
  .section('events')
  .dateStart(">= #{now|atom}")
  .branch(entry) %}

{% set weekEvents = clone(upcomingEvents)
  .dateEnd("< #{now|modify('+1 week')|atom}") %}
Events in the next week: {{ weekEvents.count() }}

{% set monthEvents = clone(upcomingEvents)
  .dateEnd("< #{now|modify('+1 month')|atom}") %}
Events in the next month: {{ monthEvents.count() }}
```

The [`clone()` function](../reference/twig/functions.md#clone) is used to copy a base query, before setting additional parameters. Parameters set on the base query (like `dateStart()`, above) will affect all subsequent queries, unless explicitly unset.

::: tip
Note that we are only executing the `weekEvents` and `monthEvents` queries! Cloning an executed query will just copy the results.
:::

### Relational Fields

Any time you access a [relational field](../system/relations.md#fields) (specifically, one that hasn’t been [eager-loaded](eager-loading.md)), Craft automatically clones it:

```twig
{% set relatedDocuments = entry.attachments.type('document').all() %}
{% set relatedArticles = entry.attachments.type('article').all() %}
{% set recentAttachments = entry.attachments
  .dateCreated(">= #{now|date_modify('-1 week')}")
  .orderBy('dateCreated DESC')
  .limit(5)
  .all() %}
```

In this example, each time `entry.attachments` is accessed, it returns a fresh element query prepared to fetch the explicitly related elements, in the order they were defined in the control panel. Calling `.type('...')` on the first two queries will _not_ affect the third query. If instead you captured the query in an intermediate variable, each param would be applied in sequence on a single query:

```twig
{% set attachmentsQuery = entry.attachments %}
{% set relatedDocuments = attachmentsQuery.type('document').all() %}
{% set relatedArticles = attachmentsQuery.type('article').all() %}
{% set recentAttachments = attachmentsQuery
  .dateCreated(">= #{now|date_modify('-1 week')}")
  .orderBy('dateCreated DESC')
  .limit(5)
  .all() %}
```

The first two sets of results here will contain the expected elements—`relatedDocuments` modifies the base query, and then `relatedArticles` overwrites the `type` param—but the third will retain the last-set `type` value and apply additional `dateCreated` and `orderBy` params. Instead of containing the latest five attachments of any type, it will only include the latest five _articles_.

## Executing Element Queries

Once you’ve defined your parameters on the query, there are multiple functions available to [execute it](#query-execution), depending on what you need back.

::: tip
Craft also makes it easy to display the results of an element query across multiple pages with [pagination](#pagination).
:::

### `all()`

The most common way to fetch a list of results is with the `all()` method, which executes the query and returns an array of populated [element](../system/elements.md) models. The resulting elements will _always_ be of the type that the query started with—assets come back from asset queries, categories from category queries, and so on.

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .limit(10)
  .all() %}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->limit(10)
    ->all();
```
:::

::: tip
Declaring a `limit()` _and_ executing a query with `all()` may seem like a contradiction, but this is a totally valid query! `all()` doesn’t override the `limit()`; rather, it returns _all_ results that meet the current criteria—one of which just happens to be a cap on the number of allowed results. Regardless of the number of results, `.all()` always returns an array—even if it’s empty.
:::

### `collect()`

Calling `.collect()` to execute a query will perform the same database call as `.all()`, but the results are wrapped in a [Collection](collections.md).

Collections can simplify some common array manipulation and filtering tasks that are otherwise awkward in the template or query builder:

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .with(['category'])
  .limit(10)
  .collect() %}

{% set categoriesDescription = entries
  .pluck('category')
  .collapse()
  .pluck('title')
  .join(', ', ' and ') %}
Posted in: {{ categoriesDescription }}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->with(['category'])
    ->limit(10)
    ->collect();

$categoriesDescription = $entries
    // Collate all the attached categories:
    ->pluck('category')
    // Flatten those into a single array:
    ->collapse()
    // Grab just the titles:
    ->pluck('title')
    // Turn them into a comma-separated list:
    ->join(', ', ' and ');
```
:::

You can also call `.all()` and wrap the results in a collection yourself, with the [`collect()` Twig function](../reference/twig/functions.md#collect).

::: tip
Review some of the [optimization tips](#performance-and-optimization) to see if built-in query methods can accomplish what you need.

For example, loading and populating hundreds of element models into a collection solely to calculate an average field value may not be necessary; the database is highly optimized for tasks like this!
:::

### `one()`

If you only need a single element, call `one()` instead of [`all()`](#all). It will either a populated element model or `null` if no matching element exists.

::: code
```twig
{% set entry = craft.entries()
  .section('news')
  .slug('hello-world')
  .one() %}
```
```php
use craft\elements\Entry;

$entry = Entry::find()
    ->section('news')
    ->slug('hello-world')
    ->one();
```
:::

### `exists()`

If you just need to check if any elements exist that match the element query, you can call `exists()`, which will return either `true` or `false`.

::: code
```twig
{% set exists = craft.entries()
  .section('news')
  .slug('hello-world')
  .exists() %}
```
```php
use craft\elements\Entry;

$exists = Entry::find()
    ->section('news')
    ->slug('hello-world')
    ->exists();
```
:::

### `count()`

If you want to know how many elements match an element query, call `count()`.

::: code
```twig
{% set count = craft.entries()
  .section('news')
  .count() %}
```
```php
use craft\elements\Entry;

$count = Entry::find()
    ->section('news')
    ->count();
```
:::

::: tip
The `limit` and `offset` parameters will be ignored when you call `count()`.
:::

### `ids()`

If you just want a list of matching element IDs, you can call `ids()`. This returns an array of integers.

::: code
```twig
{% set entryIds = craft.entries()
  .section('news')
  .ids() %}
```
```php
use craft\elements\Entry;

$entryIds = Entry::find()
    ->section('news')
    ->ids();
```
:::

### `column()`

Combined with a single-column [selection](#selections), the `column()` execution method will return a scalar value for each row instead of an object:

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .select(['title'])
  .column() %}

{# -> ['Post A', 'Post B', 'Post C'] #}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->select(['title'])
    ->column();

// -> ['Post A', 'Post B', 'Post C']
```
:::

An array of scalar values is returned, the type of which depends on the column. Elements are _not_ populated when using `column()`, so methods and properties you may be accustomed to using after other queries will not be available.

## Pagination

Craft provides the [`{% paginate %}` tag](../reference/twig/tags.md#paginate) to simplify the process of splitting results into pages with a stable URL scheme based on the <config5:pageTrigger> setting.

The `paginate` tag accepts an element query, sets its `offset` param based on the current page, and executes it. The number of results per page is determined by the query’s `limit` param, or defaults to 100.

```twig
{# Prepare your query, but don’t execute it: #}
{% set newsQuery = craft.entries()
  .section('news')
  .orderBy('postDate DESC') %}

{# Paginate the query into a `posts` variable: #}
{% paginate newsQuery as pageInfo, posts %}

{# Use the `posts` variable just like you would any other result set: #}
{% for post in posts %}
  <article>
    <h2>{{ post.title }}</h2>
    {# ... #}
  </article>
{% endfor %}
```

::: warning
Paginating a query will only work if the results come back in a stable order and the page size is kept consistent. Using randomized values in query params or in an `orderBy` clause will be disorienting for users.

Results from a [search](#search) query are perfectly fine to paginate.
:::

### Navigating Pages

In our example, the `pageInfo` variable (a [Paginate](craft5:craft\web\twig\variables\Paginate) instance) has a number of properties and methods to help you work with paginated results. The variable can be named anything you like, so long as references to it are updated.

`first`
: Number of the first element on the _current_ page. For example, on the second page of 10 results, `first` would be `11`.

`last`
: Number of the last element on the _current_ page. For example, on the first page of 10 results, `last` would be `10`.

`total`
: Total number of results, across all pages.

`currentPage`
: The current page. Equivalent to `craft.app.request.getPageNum()`.

`totalPages`
: The total number of pages the results are spread across. The last page of results may not be complete.

`getPageUrl(page)`
: Builds a URL for the specified `page` of results.

`getFirstUrl()`
: Builds a URL for the first page of results. Equivalent to `pageInfo.getPageUrl(1)`.

`getLastUrl()`
: Builds a URL for the last page of results. Equivalent to `pageInfo.getPageUrl(pageInfo.totalPages)`.

`getNextUrl()`
: Get a URL for the next page of results. Returns `null` on the last page of results.

`getPrevUrl()`
: Get a URL for the previous page of results. Returns `null` on the first page of results.

`getNextUrls(num)`
: Gets up to `num` next page URLs, indexed by their page numbers.

`getPrevUrls(num)`
: Gets up to `num` previous page URLs, indexed by their page numbers.

`getRangeUrls(start, end)`
: Returns a list of URLs indexed by their page number. The list will only include valid pages, ignoring out-of-range `start` and `end` values.

`getDynamicRangeUrls(max)`
: Returns up to `max` page URLs around the current page, indexed by their page numbers.

::: tip
The values above use a one-based index, so they are human-readable without any additional work.
:::

#### Examples

You can display a summary of the current page using `pageInfo.total`, `pageInfo.first`, and `pageInfo.last`:

```twig
Showing {{ pageInfo.first }}–{{ pageInfo.last }} of {{ pageInfo.total }} results.
```

Next and previous links are simple:

```twig
<nav role="navigation" aria-label="Search result pagination">
  {% if pageInfo.getPrevUrl() %}
    <a href="{{ pageInfo.getPrevUrl() }}">Previous Page</a>
  {% endif %}
  {% if pageInfo.getNextUrl() %}
    <a href="{{ pageInfo.getNextUrl() }}">Next Page</a>
  {% endif %}
</nav>
```

We could improve this for screen readers by including specific page numbers in the labels:

```twig
{% set prevLinkSummary = "#{pageInfo.currentPage - 1} of #{pageInfo.totalPages}" %}

{{ tag('a', {
  text: 'Previous Page',
  href: pageInfo.getPrevUrl(),
  aria: {
    label: "Previous page (#{prevLinkSummary})"
  }
}) }}
```

::: tip
We’re using the [`tag()` Twig function](../reference/twig/functions.md#tag) to make this a little more readable, but its output is equivalent to a normal anchor element.
:::

More advanced pagination links are also possible with `getDynamicRangeUrls()`:

```twig{3}
<nav role="navigation" aria-label="Search result pagination">
  <ul>
    {% for p, url in pageInfo.getDynamicRangeUrls(5) %}
      <li>
        {{ tag('a', {
          text: p,
          href: url,
          aria: {
            label: "Go to page #{p} of #{pageInfo.totalPages}",
          },
        }) }}
      </li>
    {% endfor %}
  </ul>
</nav>
```

Notice how our loop uses the keys (`p`) _and_ values (`url`) from the returned array—Craft assigns each URL to a key matching its page number!

## Search

Craft gives you access to its [search](../system/searching.md) index from any element query. Use the `search` param to narrow results by keywords:

::: code
```twig{5}
{% set q = craft.app.request.getQueryParam('search') %}

{% set results = craft.entries
  .section('news')
  .search(q)
  .all() %}
```
```php{5}
$q = Craft::$app->getRequest()->getQueryParam('search');

$results = Entry::find()
    ->section('news')
    ->search($q)
    ->all();
```
:::

<See path="../system/search.md" description="Learn about the supported syntaxes for plain-text search." />

The value passed to `.search()` can come from anywhere—user input via an HTML form (via `craft.app.request`), hard-coded terms, or from another field (like `entry.relatedSearchFilter`). While search is a great tool, it’s generally not appropriate for finding up elements with specific qualities—for example, you _can_ search for JPEG assets by calling `.search('extension:jpg')`, but using the dedicated [`.extension('jpg')` query method](../reference/element-types/assets.md#extension) will produce faster and more consistent results.

::: warning
Be aware that exposing records to search _can_ lead to [unintended disclosure or enumeration](../system/searching.md#development) of content that is not otherwise visible. For example, a query like `craft.entries.section('locations').search(q)` (where `q` is a term provided by a user with some understanding of your content model) could attempt to figure out which stores are managed by people with the last name “Smith” by sending a query like `managedBy:*smith*`.
:::

## Performance and Optimization

When you start working with lots of data, it’s important to consider how queries affect your pages’ load time. While the [`{% cache %}` tag](../reference/twig/tags.md#cache) can be used strategically to avoid major slowdowns, it’s only one of many tools at your disposal.

::: tip
Turn on the **Debug Toolbar** in your user’s preferences to profile your memory usage and database query counts.
:::

### Eager Loading

Displaying a list of elements and one or more elements related to each of them (say, blog posts and any tags or categories attached to them) can lead to an “N+1” problem, wherein each result from the main query triggers an additional query. Craft addresses this with [eager-loading](eager-loading.md).

<See path="eager-loading.md" description="Eager-loading is a means of fetching nested or related elements in bulk." />

### Caching Element Queries

Results can be cached with the `cache()` method:

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .limit(10)
  .cache()
  .all() %}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->limit(10)
    ->cache()
    ->all();
```
:::

This cache is separate from fragments cached via [{% cache %} template tags](../reference/twig/tags.md#cache), and will only match subsequent queries that have all the same parameters. Caching a query does not guarantee better [performance](#performance-and-optimization), but it can be used strategically—say, to memoize a scalar query result inside a loop (like the total number of entries in a list of categories).

The `cache()` method accepts a `duration` argument, and defaults to your <config5:cacheDuration>.

::: tip
Craft registers an [ElementQueryTagDependency](craft5:craft\cache\ElementQueryTagDependency) for you by default, so cache dependencies and invalidation are handled automatically.
:::

### Large Result Sets

Sometimes, a query will simply depend on a large number of elements (and [pagination](#pagination) is not possible), or it needs to use the most current data available (so [caching](#caching-element-queries) is off the table).

Populating element models can be resource-intensive, and loading many thousands of records can exhaust PHP’s memory limit. Let’s look at some common places where queries can be optimized to avoid this bottleneck.

#### Counting

In this example, we just need the number of active users:

::: code
```twig Slow
{# Loads and populates all users, then gets the length of the array: #}
{% set totalUsers = craft.users().status('active').all()|length %}
```
```twig Optimized
{# Uses the SQL COUNT(*) function and returns only an integer: #}
{% set totalUsers = craft.users().status('active').count() %}
```
:::

In addition to the memory footprint of the optimized query being many orders of magnitude smaller, we’re also avoiding a huge amount of data transfer between the PHP process and database server!

::: tip
Using the [`length`](../reference/twig/filters.md#length) filter on a query (before it’s been run) will automatically call its [`count()`](#count) execution method to prevent inadvertent performance issues. Other situations in which queries are treated as arrays may not be optimized in the same way.
:::

#### Arithmetic Operations

Counting isn’t the only operation that the database can do for you! What if we wanted to find the minimum and maximum values for a given field?

::: code
```twig Slow
{# Loads field data for every race, then throws out all but one property: #}
{% set races = craft.entries()
  .section('races')
  .all() %}
{% set fastestTime = min(races|column('winningTime')) %}
{% set slowestTime = max(races|column('winningTime')) %}
```
```twig Optimized
{# Set up a base query to select only the times: #}
{% set raceQuery = craft.entries()
  .section('races')
  .select('winningTime') %}

{# Execute it twice with different ordering criteria: #}
{% set fastestTime = clone(raceQuery)
  .orderBy('winningTime ASC')
  .scalar() %}
{% set slowestTime = clone(raceQuery)
  .orderBy('winningTime DESC')
  .scalar() %}
```
:::

`scalar()` is just an [execution method](#executing-element-queries) that returns the first column from the first result—it will always produce a simple, “[scalar](https://www.php.net/manual/en/function.is-scalar.php)” value.

::: warning
While `select()` and `orderBy()` accept field handles and ambiguous columns, some SQL functions and expressions (like `MIN()` or `SUM()`) may not.
:::

#### Lean Selections

Combining a narrower [selection](#selections) with an execution method that returns results as an array (or explicitly calling `toArray()` while preparing a query) can significantly reduce the amount of memory a query requires.

::: code
```twig Slow
{# Load all donor entries with complete native + custom field data: #}
{% set donors = craft.entries()
  .section('donors')
  .all() %}

<ul>
  {% for donor in donors %}
    <li>{{ donor.title }} — {{ donor.lifetimeGiftAmount|money }}</li>
  {% endfor %}
</ul>
```
```twig Optimized
{# Load only donor names and gift amounts: #}
{% set donors = craft.entries()
  .section('donors')
  .select([
    'title',
    'lifetimeGiftAmount'
  ])
  .pairs() %}

<ul>
  {% for name, amount in donors %}
    <li>{{ name }} — {{ amount|money }}</li>
  {% endfor %}
</ul>
```
:::

The `pairs()` [execution method](#executing-element-queries) is a shorthand for creating a key-value hash from the first two columns of each row. Collisions can occur, so it’s safest to use a column you know will be unique for your first selection!

::: warning
Not all attributes can be fetched this way—element URLs, for instance, are built on-the-fly from their URIs and site’s base URL. Relational data may also be more difficult to work with, as it often has to be eager-loaded alongside fully-populated element models.
:::

## Advanced Element Queries

Element queries are specialized [query builders](guide:db-query-builder) under the hood, so they support most of the same methods provided by <craft5:craft\db\Query>. The most common methods appear below—argument lists are non-exhaustive, and are only provided to differentiate them.

::: tip
You may call <craft5:craft\db\Query::asArray()> to skip populating element models with results and return matching rows’ data as an associative array. Altering [selections](#selections) in particular can make elements behave erratically, as they may be missing critical pieces of information.
:::

### Content and Custom Fields

Most custom field values are stored in a single JSON column, keyed by their unique field instance UUID. Craft handles this automatically when using a field or field instance’s built-in query methods (i.e. `.myCustomDateField('<= 2025-11-05')`) by building the appropriate “JSON extraction” expression.

However, Craft _does not_ intercept direct use of `.where()` and other [specialized condition](#conditions) methods, and cannot infer what is a plain column name versus a field or field instance handle. This means you are responsible for building equivalent field value expressions. Typically, this involves a field instance handle and a _field layout provider_ (like an entry type, asset volume, category group, or other component that manages a field layout):

::: code
```twig{1,7} Twig
{% set valueSql = fieldValueSql(entryType('post'), 'sourceMedia') %}

{% set entriesFromPhysicalMedia = craft.entries()
  .section('news')
  .andWhere([
    'or like',
    valueSql,
    ['print', 'paper', 'press']
  ])
  .all() %}
```
```php PHP
$entryType = Craft::$app->getEntries()->getEntryTypeByHandle('post');
$fieldLayout = $entryType->getFieldLayout();
$fieldInstance = $fieldLayout->getFieldByHandle('sourceMedia');

$entriesFromPhysicalMedia = Entry::find()
    ->section('news')
    ->andWhere([
      'or like',
      $fieldInstance->getValueSql(),
      ['print', 'paper', 'press'],
    ])
    ->all();
```
:::

Each element type has a unique means of accessing the relevant field layout provider:

Assets
:   Asset field layouts are provided by their volumes:

    ```twig
    {% set provider = craft.app
      .volumes
      .getVolumeByHandle('myAssetVolume') %}
    ```

Entries
:   You can get an entry type via the `entries` service…
    ```twig
    {% set provider = craft.app
      .entries
      .getEntryTypeByHandle('myEntryType') %}
    ```
    …or use the [Twig helper](../reference/twig/functions.md#entrytype):
    ```twig
    {% set provider = entryType('myEntryType') %}
    ```

Categories
:   Categories’ field layouts are defined by their _group_:
    ```twig
    {% set provider = craft.app
      .categories
      .getGroupByHandle('myCategoryGroup') %}
    ```

Global Sets
:   Global sets are unique, in that they provide their own field layouts:
    ```twig
    {% set provider = craft.app
      .globals
      .getSetByHandle('myGlobalSet') %}
    ```

Tags
:   Like categories, tags’ field layouts come from their _group_:
    ```twig
    {% set provider = craft.app
      .tags
      .getTagGroupByHandle('myTagGroup') %}
    ```

Pass any of these `provider` variables to `fieldValueSql()` along with the desired field instance handle to build the required expression:

```twig
{% set valueSql = fieldValueSql(provider, 'sourceMedia') %}
```

Addresses and users do not have field layout providers. Instead, you can construct the correct expression via their field layouts, directly:

Address
:   Use the `addresses` service to load the single address field layout:
    ```twig
    {% set valueSql = craft.app
      .addresses
      .getFieldLayout()
      .getFieldByHandle('myFieldHandle')
      .getValueSql() %}
    ```

User
:   There is no analogous API for the user field layout, but you can get it directly by its class name—it is guaranteed to be unique:
    ```twig
    {% set valueSql = craft.app
      .fields
      .getLayoutByType('craft\\elements\\User')
      .getFieldByHandle('myFieldHandle')
      .getValueSql() %}
    ```

If you have an address or user element in a variable, you can always call `element.getFieldLayout()`, then get the field layout element and value SQL. This can produce unexpected results for element types that support more than one field layout.

### Fixed Ordering

When using `.id()` to query for elements with a specific set of IDs, you can call `.fixedOrder()` to retain their positions. This alleviates some problems when [limiting](#selections) or [paginating](#pagination) sets of results that are in a prescribed order.

```twig
{% set someExternalApiResult = ['SKU-C', 'SKU-R', 'SKU-A', 'SKU-F', 'SKU-T', '...'] %}

{# Pre-flight a query to get a SKU-to-ID map: #}
{% set internalIdMatches = craft.entries()
  .select(['id', 'sku'])
  .indexBy('sku')
  .asArray()
  .all() %}

{% Translate SKUs to internal IDs, and load the entries in that order: #}
{% set orderedMatches = craft.entries()
  .id(someExternalApiResult | map(sku => internalIdMatches[sku].id))
  .fixedOrder()
  .all() %}
```

### Selections

Selections modify what columns and rows are returned.

[select()](yii2:yii\db\Query::select())
: Define a list of columns to `SELECT`.

[addSelect()](yii2:yii\db\Query::addSelect())
: Add columns to the existing selection.

[distinct()](yii2:yii\db\Query::distinct())
: Return only rows that have a unique combination of values in the provided column(s).

[groupBy($columns)](yii2:yii\db\Query::groupBy())
: Combine or flatten database rows based on the value of one or more columns. Often used in combination with aggregate [selections](#selections) like `SUM(columnName)`.

[limit($n)](yii2:yii\db\Query::limit())
: Set a maximum number of results that can be returned.

[offset($n)](yii2:yii\db\Query::offset())
: Skip the specified number of matching rows.

### Joins

In most cases, Craft automatically `JOIN`s the appropriate tables so that your elements are populated with the correct data. However, additional `JOIN`s can be useful in [plugin development](../extend/README.md) or for doing deeper analysis of your content.

[innerJoin($table, $condition)](yii2:yii\db\Query::innerJoin())
: Adds an `INNER JOIN` clause for the target table, using the provided condition.

[leftJoin($table, $condition)](yii2:yii\db\Query::leftJoin())
: Adds a `LEFT JOIN` clause for the target table, using the provided condition.

[rightJoin($table, $condition)](yii2:yii\db\Query::rightJoin())
: Adds a `RIGHT JOIN` clause for the target table, using the provided condition.

`JOIN` conditions are generally expected to be in this format:

```php{7}
$popularAuthors = craft\elements\Entry::find()
  ->select([
    'users.fullName as name',
    'COUNT(*) as postCount',
  ])
  ->groupBy('entries.authorId')
  ->leftJoin('{{%users}}', '[[entries.authorId]] = [[users.id]]')
  ->asArray()
  ->all();
```

Craft prepares two queries when fetching elements (a main query and a “subquery”) and applies `JOIN`s to both, so that you can use the tables for filtering _and_ for selections. Read more about the architecture of element queries in the [extension documentation](../extend/element-types.md#element-query-class).

::: warning
Adding columns to your selection from other tables may cause errors when populating elements, as they will not have a corresponding class property. Call `asArray()` to return your results as a plain associative array, or consider [attaching a `Behavior`](../extend/behaviors.md).
:::

### Conditions

::: warning
Exercise caution when using these methods directly—some will completely overwrite the existing query conditions and cause unpredictable results like allowing drafts, revisions, or elements from other sites to leak into the result set.

Specific [element type queries](#element-types) and [custom field methods](#querying-with-custom-fields) often provide a more approachable and reliable API for working with the database, and will modify the query in non-destructive ways.
:::

[where()](yii2:yii\db\QueryTrait::where())
: Directly set the query’s `WHERE` clause. See the warning, above.

[andWhere()](yii2:yii\db\QueryTrait::andWhere())
: Add expressions to the `WHERE` clause. Useful if the provided [element type-specific query methods](#element-types) can’t achieve an advanced condition required by your site or application.

[orWhere()](yii2:yii\db\QueryTrait::orWhere())
: Starts a new `WHERE` clause.

[filterWhere()](yii2:yii\db\QueryTrait::filterWhere())
: Same as `where()`, but ignores `null` values in the passed conditions.

[andFilterWhere()](yii2:yii\db\QueryTrait::andFilterWhere())
: Same as `andWhere()`, but ignores `null` values in the passed conditions.

[orFilterWhere()](yii2:yii\db\QueryTrait::orFilterWhere())
: Same as `orWhere()`, but ignores `null` values in the passed conditions.


### Query Execution

Some of these methods are discussed in the [Executing Element Queries](#executing-element-queries) section.

[all()](yii2:yii\db\Query::all()) — `craft\base\Element[]`
: Array of populated element models.

[collect()](craft5:craft\db\Query::collect()) — `Illuminate\Support\Collection`
: Same as `all()`, but wrapped in a [Collection](./collections.md).

[one()](yii2:yii\db\Query::one()) — `craft\base\Element|null`
: Element model or `null` if none match the criteria.

[nth($n)](craft5:craft\db\Query::nth()) — `craft\base\Element|null`
: Element model or `null` if one doesn’t exist at the specified offset.

[exists()](yii2:yii\db\Query::exists()) — `boolean`
: Whether or not there are matching results.

[count()](yii2:yii\db\Query::count()) — `int`
: The number of results that would be returned.

[column()](yii2:yii\db\Query::column()) — `array`
: Array of scalar values from the first selected column.

[scalar()](yii2:yii\db\Query::scalar()) — `int|float|string|boolean`
: A single, scalar value, from the first selected column of the matching row.

[sum($column)](yii2:yii\db\Query::sum()) — `int|float`
: Total of values in `$column` across all matching results

[average($column)](yii2:yii\db\Query::average()) — `int|float`
: Average of all `$column` values matching results

[min($column)](yii2:yii\db\Query::min()) — `int|float`
: Minimum value in `$column` among matching results

[max($column)](yii2:yii\db\Query::max()) — `int|float`
: Maximum value in `$column` among matching results

[pairs()](craft5:craft\db\Query::pairs()) — `array`
: The first selected column becomes the returned array’s keys, and the second, its values. Duplicate keys are overwritten, so the array may not have the same number of elements as matched the query.

::: tip
When customizing an element query, you can call [getRawSql()](craft5:craft\db\Query::getRawSql()) to get the full SQL that is going to be executed by the query, so you have a better idea of what to modify.

```twig
{{ dump(query.getRawSql()) }}
```
:::

## Headless Applications

Craft can act as a headless content back-end for your static or client-rendered website. There are two main ways of making content available to applications that exist outside Craft’s built-in Twig templating layer:

### Element API

The first-party [Element API](plugin:element-api) allows you to map _endpoints_ to element queries with a combination of static and dynamic criteria and serve JSON-serialized results.

### GraphQL

Craft includes a [GraphQL API](graphql.md) with configurable schemas. Many of the same element query basics apply when accessing elements via GraphQL.

::: warning
For security reasons, not all query builder features are available via GraphQL. Some advanced queries may need to be executed separately and combined by the client.
:::
