---
description: Optimize your templates with smart eager-loading.
related:
  - uri: ../system/elements.md
    label: Introduction to Elements
  - uri: element-queries.md
    label: Querying Elements
---

# Eager-Loading Elements

When you are working with a list of elements and need to access their nested or related elements, _eager-loading_ can help optimize your [element queries](element-queries.md).

<!-- more -->

Much of this is handled by Craft, automatically.
However, there are opportunities to tune certain queries with [lazy eager-loading](#lazy-eager-loading) and manual [eager-loading maps](#the-with-query-param).

<Block label="The N+1 Problem">

Let’s look at a [template](templates.md) that loops through a list of news posts (entries), and displays an image (asset) attached to each one.

```twig
{% set posts = craft.entries()
  .section('news')
  .all() %}

{% for post in posts %}
  <article>
    {% set image = post.featureImage.one() %}

    {% if image %}
      {{ image.getImg() }}
    {% endif %}

    {# ... #}
  </article>
{% endfor %}
```

In addition to the main query for the entry elements, an additional query is executed for _each_ article to find the attached asset. The number of queries will be _N_ (the number of entries) _+ 1_ (the initial entries query). If there are 50 entries, this innocent-looking template will cost the page 51 queries!

If we were to then display the name of the user who uploaded each image (i.e. `image.uploader.fullName`) or a list of categories for each entry (i.e. `post.topics.all()`), we would introduce a _2N+1_ or _3N+1_ query, whereby each entry in the initial query would trigger _two_ or _three_ additional queries, for a minimum of 101. Supposing each query takes a couple of milliseconds, this can mean your site spends 250–750ms _just waiting for data_.

</Block>

Eager-loading allows Craft to proactively load related or nested elements _in bulk_, while keeping track of where they all belong.

::: tip
Not every relationship needs to be eager-loaded! We have a list of recommendations for how to identify [opportunities for optimization](#identifying-candidates).
:::

## Identifying Candidates

Auditing your templates for performance problems solvable with eager-loading can be tricky, but you may be able to narrow down what you’re looking for with these common bottlenecks:

- [Nested](#eager-loading-nested-sets-of-elements) `{% for %}` loops;
- Accessing or outputting data from nested entries in a Matrix field;
- Getting information about an entry’s author, within a loop;
- Using multiple [asset transforms](#eager-loading-image-transforms);
- Using relational fields within a loop;

The exact patterns here may differ template-to-template, and don’t always involve an explicit call to a [query execution method](./element-queries.md#query-execution) (like `.one()` in the example above)! Implicit queries may be masked by filters like `|first` or `|slice`, or when iterating over a relational field’s value in a `for` loop.

::: tip
Not all of these situations will require (or benefit from) eager-loading—the goal is only to consider which of your projects’ features _may_ be candidates.
:::

## Lazy Eager-Loading <Badge text="New!" />

Element queries in Craft have an `.eagerly()` query method that simplifies eager-loading of relational fields.
Most projects can eschew custom eager-loading maps (using the [`.with()` method](#the-with-query-param)) in favor of calling `.eagerly()` on down-stream element queries:

::: code
```twig{3-6} Using .with()
{% set posts = craft.entries()
  .section('news')
  .with([
    ['featureImage', { withTransforms: ['large'] }],
    ['topics'],
  ])
  .all() %}

{% for post in posts %}
  {% set image = post.featureImage.one() %}

  <article>
    <h2>{{ post.title }}</h2>

    {% if image %}
      {{ image.getImg('large') }}
    {% endif %}

    {{ post.summary|md }}

    <ul>
      {% for topic in post.topics %}
        <li>{{ topic.getLink() }}</li>
      {% endfor %}
    </ul>
  </article>
{% endfor %}
```
```twig{6,18} Using .eagerly()
{% set posts = craft.entries()
  .section('news')
  .all() %}

{% for post in posts %}
  {% set image = post.featureImage.eagerly().one() %}

  <article>
    <h2>{{ post.title }}</h2>

    {% if image %}
      {{ image.getImg('large') }}
    {% endif %}

    {{ post.summary|md }}

    <ul>
      {% for topic in post.topics.eagerly().all() %}
        <li>{{ topic.getLink() }}</li>
      {% endfor %}
    </ul>
  </article>
{% endfor %}
```
:::

In this example, our primary query (for entries in the _News_ section) no longer needs to be concerned about what nested or related queries _might_ be used—instead, each query that stems from an entry returned by the primary query should use `.eagerly()` to let Craft know that there is an opportunity to fetch a set of elements _as though they had been eager-loaded_, up-front. The main difference between this strategy and `.with()` is that—as the name “lazy” suggests—nested and related elements aren’t loaded until Craft actually evaluates logic that needs them; templates (like [element partials](../system/elements.md#rendering-elements)) can request additional relational data without impacting the upstream query, while avoiding optimistic-but-unnecessary up-front queries.

After calling `.eagerly()`, lazily eager-loaded relations are used just like normal relational field values. This means your templates can continue chaining `.one()` or `.all()`, use them like arrays in a loop, or pass them to filters like `|first`.

::: warning
Some [native attributes](#eligible-fields-and-attributes) currently do not support lazy eager-loading due to the way many of their values are accessed, but they can be eager loaded using `.with()`.
:::

## The `.with()` Query Param

The purpose of the `.with()` param is to tell Craft which related or nested elements you are apt to need, in advance. With that information, Craft is able to fetch them all up front, in as few queries as possible.

Here’s how to apply the `with` param to our example:

```twig
{% set entries = craft.entries()
  .section('news')
  .with(['assetsField'])
  .all() %}

{% for entry in entries %}
  {% set image = entry.assetsField.one() %}

  {# Make sure we actually have an asset element: #}
  {% if image %}
    <img src="{{ image.url }}" alt="{{ image.title }}">
  {% endif %}
{% endfor %}
```

This template code will only cost three queries (one to fetch the entries, one to determine which assets should be eager-loaded, and one to fetch the assets), and the number of queries will not grow proportional to the number of elements being displayed. The entries are then are automatically populated with their respective related asset(s).

## Accessing Eager-Loaded Elements

Eager-loaded elements are returned as a [collection](collections.md)—or more specifically, an <craft5:craft\elements\ElementCollection>.
This means that (in most cases) eager-loaded and non-eager-loaded elements can be treated in the same way at the template level, including as an iterable in `for` loops.

## Eager-Loading Multiple Sets of Elements

If you have multiple sets of elements you wish to eager-load via the primary query, add those field handles to your `.with()` parameter:

```twig{4-5}
{% set posts = craft.entries
  .section('news')
  .with([
    'topics',
    'featureImage',
  ])
  .all() %}

{% for post in posts %}
  <article>
    {# Use the eager-loaded elements normally: #}
    {% for topic in post.topics %}
      {{ topic.getLink() }}
    {% endfor %}
  </article>
{% endfor %}
```

[Lazy eager-loading](#lazy-eager-loading) works the same for any number of eager-loaded fields. Each query that stems from an element in the primary query should use `.eagerly()` to signal that it will be used similarly in later iterations of a loop.

If you need to conditionally add eager-loading criteria, use the `.andWith()` method:

```twig
{% set postsQuery = craft.entries()
  .section('news')
  .with(['topics']) %}

{% if unfurlPosts %}
  {% do postsQuery.andWith(['featureImage']) %}
{% endif %}

{% set posts = postsQuery.all() %}

{# ... #}
```

Craft will merge your criteria into a single plan before executing the query.

## Eager-Loading Nested Sets of Elements

It’s also possible to optimize loading of elements nested two or more levels deep, using a special syntax. Suppose the topics in our news feed from previous examples each had a thumbnail or icon:

```twig{4,17-18}
{% set posts = craft.entries()
  .section('news')
  .with([
    'topics.thumbnail',
  ])
  .all() %}

{# Main loop: #}
{% for post in posts %}
  <article>
    <h2>{{ post.title }}</h2>

    {# ... #}

    {# Nested topics loop: #}
    <ul>
      {% for topic in post.topics %}
        {% set icon = topic.thumbnail.one() %}

        <li>
          <a href="{{ topic.url }}">
            {% if icon %}
              {{ icon.getImg() }}
            {% endif %}
            <span>{{ topic.title }}</span>
          </a>
        </li>
      {% endfor %}
    </ul>
  </article>
{% endfor %}
```

A dot (`.`) in the eager-loading map indicates that another set of elements on the eager-loaded results _also_ needs to be loaded. Craft expands this notation into a multi-stage eager-loading “plan” and fetches each layer of elements in a batch. Each segment of an eager-loading path will be a field handle.

The same optimization is possible with [lazy eager-loading](#lazy-eager-loading)—the `.with()` param can be omitted from the main query, and `.eagerly()` can be added to all the nested queries:

```twig{10-11}
{% set posts = craft.entries()
  .section('news')
  .all() %}

{% for post in posts %}
  <article>
    {# ... #}

    <ul>
      {% for topic in post.topics.eagerly().all() %}
        {% set icon = topic.thumbnail.eagerly().one() %}

        {# ... #}
      {% endfor %}
    </ul>
  </article>
```

::: tip
Elements that are the target of multiple relations (as you might expect with a set of categories or tags) are only loaded once per batch. For example, if we were displaying a list of 100 news articles that were each assigned one of 10 categories, eager-loading the categories would never fetch more than 10 elements—Craft assigns the returned categories to _all_ the articles they were related to.
:::

## Defining Custom Parameters on Eager-Loaded Elements

You can define custom parameters that will get applied as elements are being eager-loaded, by replacing its handle with an array that has two values: the handle, and a [hash](twig.md#hashes) that defines the parameters that should be applied.

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    ['assetsField', { kind: 'image' }],
  ])
  .all() %}
```

When eager-loading nested sets of elements, you can apply parameters at any level of the eager-loading path.

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    ['featureImage', { dateUploaded: ">= #{now|date_modify('-1 month')}" }],
    ['authors', { group: 'staff' }],
    ['topic.thumbnail', { kind: 'image' }],
  ])
  .all() %}
```

The accepted parameters correspond to the kind of element that each relationship uses—this example uses the [asset query](../reference/element-types/assets.md#querying-assets)’s `dateUploaded` and `kind` params, and the [user query](../reference/element-types/users.md#querying-users)’s `group` param.

::: tip
You can also provide nested `with` directives via these hashes. Here’s an example where we’re loading each topic’s `thumbnail` and `sectionEditor`, as well as all their `descendants` (presuming that our topic category group is a multi-level structure):

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    ['topic', {
      with: [
        ['thumbnail', { kind: image }],
        ['descendants'],
        ['sectionEditor'],
      ]
    }]
  ])
  .all() %}
```

The equivalent “flat” eager-loading map would look like this—note the repetition:

```twig
[
  ['topic.thumbnail', { kind: 'image' }],
  ['topic.descendants'],
  ['topic.sectionEditor'],
]
```

Ultimately, Craft normalizes both maps to something more like the first example, then loads each “layer” in sequence—the topics have to be loaded before anything attached to them!
:::

## Eager-Loading Image Transforms

Another _N+1_ problem occurs when looping through a set of assets, and applying image transforms to each of them. For each transform, Craft needs to execute a query to see if the transform already exists.

This problem can be solved with the `withTransforms` asset criteria parameter:

```twig
{% set assets = entry.assetsField
  .withTransforms([
    'heroImage',
    { width: 100, height: 100 }
  ])
  .all() %}
```

Note that each transform definition you want to eager-load can either be a string (the handle of a transform defined in Settings → Assets → Image Transforms) or a [hash](twig.md#hashes) that defines the transform properties.

Using the `withTransforms` param has no effect on how you’d access image transforms further down in the template.

Image transform indexes can be eager-loaded on assets that are also eager-loaded:

```twig
{% set entries = craft.entries()
  .with([
    ['assetsField', {
      withTransforms: ['heroImage']
    }]
  ])
  .all() %}
```

## Eligible Fields and Attributes

[Relational fields](../system/relations.md) are the most common candidate for eager-loading.
Fields are always eager-loaded using their handle.
In this example, `manufacturer` is an [entries field](../reference/field-types/entries.md) attached to each “car” entry:

```twig
{% set carsWithManufacturers = craft.entries()
  .section('cars')
  .with([
    ['manufacturer'],
  ])
  .all() %}
```

Fields that manage nested elements (like [Matrix](../reference/field-types/matrix.md) or [addresses](../reference/field-types/addresses.md)) use the same syntax:

```twig
{% set carsWithSaleHistory = craft.entries()
  .section('cars')
  .with([
    ['saleHistory'],
  ])
  .all() %}
```

The handle you use for eager-loading respects any overrides set in the relevant field layouts.

Each [element type](../system/elements.md) supports a variety of unique eager-loadable attributes, as well:

All Element Types
:   - Same element in other sites: `localized`
    - Drafts: `drafts`
    - Draft creators: `draftCreator`
    - Revisions: `revisions`
    - Revision creators: `revisionCreator`
    - Current revision: `currentRevision`

    (Not all element types actually make use of sites, drafts, and revisions.)

All [Nested Elements](../system/elements.md#nested-elements)
:   - Owners: `owner`
    - Primary owners: `primaryOwner`

    Note that owners may not have a uniform element type.

Structure elements
:   Entries in structure sections, categories, and any other hierarchical elements support these:
    - Immediate children: `children`
    - All descendants: `descendants`
    - Immediate parent: `parent`
    - All ancestors: `ancestors`

Assets
:   - Uploader: `uploader`

Entries
:   - First selected author: `author`
    - All authors: `authors`

Users
:   - Addresses: `addresses`
    - Profile photo: `photo`

Like custom relational fields, some commonly-used attributes (like `authors` and `owner`) support automatic eager-loading.
If you are noticing sluggish queries, it never hurts to add an attribute to an eager-loading map.

### Non-Element Relationships

Fields and attributes that don’t use element queries (or don’t ultimately resolve to one or more elements) are generally not eager-loadable—and trying to eager-load them may result in an error. This includes scalar field values (like strings and numbers) as well as complex fields like [table](../reference/field-types/table.md).

::: tip
Some elements may also expose query methods that optimize the loading of associated _non-element_ records (like [asset transforms](#eager-loading-image-transforms)), but their interfaces are not part of the core element-only eager-loading system, and may not support automatic or lazy eager-loading.
:::

### Reverse Relationships

While related elements can be queried in either direction using [`sourceElement` and `targetElement` options](../system/relations.md#sources-and-targets), it is only possible to declaratively eager-load elements that are the [target](../system/relations.md#sources-and-targets) of a relationship. If you need to query for other elements that point _to_ an element in the main query, the queries must be written separately:

```twig
{# We can’t load these poets *and* their poems in one query: #}
{% set poets = craft.users()
  .group('poets')
  .all() %}

{# This second query takes the list of poets and loads all their poems: #}
{% set poems = craft.entries()
  .section('poems')
  .authorId(poets|column('id'))
  .all() %}

{# Then, we can group those poems by their author’s ID: #}
{% set poemsByAuthorId = poems|group('authorId') %}

{% for poet in poets %}
  <article>
    <h2>Poems by: {{ poet.fullName }}</h2>
    <ul>
      {% for poem in poemsByAuthorId[poet.id] ?? [] %}
        <li>{{ poem.title }}</li>
      {% endfor %}
    </ul>
  </article>
{% endfor %}
```

Of course, if each _poet_ user element had a custom field in which administrators selected “Featured Poems,” that _would_ be eager-loadable:

```twig
{% set poets = craft.users()
  .group('poets')
  .with([
    ['featuredPoems'],
  ])
  .all() %}
```
