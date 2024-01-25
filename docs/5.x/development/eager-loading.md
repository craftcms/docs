---
description: Optimize your templates with smart eager-loading.
---

# Eager-Loading Elements

When you are working with a list of elements and need to access other elements they point to, you may start to notice some performance problems. Craft 5 provides a 

<Block label="The N+1 Problem">

Let’s look at a [template](templates.md) that loops through a list of news articles (entries), and displays an image (asset) attached to each one.

```twig
{% set articles = craft.entries()
  .section('news')
  .all() %}

{% for article in articles %}
  {# Get the related asset, if there is one #}
  {% set image = article.assetsField.one() %}
  {% if image %}
    <img src="{{ image.url }}" alt="{{ image.title }}">
  {% endif %}
{% endfor %}
```

In addition to the main query for the entry elements, an additional query is executed for _each_ article to find the attached asset. The number of queries will be _N_ (the number of entries) _+ 1_ (the initial entries query). If there are 50 entries, this innocent-looking template will cost the page 51 queries!

If we were to then display the name of the user who uploaded each image (i.e. `asset.uploader.fullName`) or a list of categories for each entry (i.e. `article.topics.all()`), we would introduce a _2N+1_ query, whereby each entry in the initial query would trigger _two_ additional queries, for a total of 101.

</Block>

Eager-loading allows Craft to proactively load related or nested elements _in bulk_, while keeping track of where they all belong.

::: tip
Not every relationship needs to be eager-loaded! We have a list of recommendations for how to identify [opportunities for optimization](#identifying-candidates).
:::

## Identifying Candidates

Auditing your templates for performance problems solvable with eager-loading can be tricky, but you may be able to narrow down what you’re looking for with these common bottlenecks:

- [Nested](#eager-loading-nested-sets-of-elements) `{% for %}` loops;
- Accessing or outputting data from nested blocks in a Matrix field;
- Getting information about an entry’s author, within a loop;
- Using multiple [asset transforms](#eager-loading-image-transforms);
- Using relational fields within a loop;

The exact patterns here may differ template-to-template, and don’t always involve an explicit call to a [query execution method](./element-queries.md#query-execution) (like `.one()` in the example above)! Implicit queries may be masked by filters like `|first` or `|slice`, or when iterating over a relational field’s value in a `for` loop.

::: tip
Not all of these situations will require (or benefit from) eager-loading—the goal is only to consider which of your projects’ features _may_ be candidates.
:::

## Magic Eager-Loading

Element queries in Craft 5 have a new `.eagerly()` query param that automatically detects and optimizes nested queries from relational fields. As a result, most projects will _not_ need to use custom eager-loading maps via the [`.with()` method](#the-with-query-param) for custom fields.

::: code
```twig
{% set posts = craft.entries()
  .section('posts')
  .with([
    ['author'],
    ['featureImage', { withTransforms: ['large'] }],
    ['topics'],
  ])
  .all() %}

{% for post in posts %}
  {% set image = post.featureImage|first %}

  <article>
    <h2>{{ post.title }}</h2>

    {% if image %}
      {{ image.getImg('large') }}
    {% endif %}

    <ul>
      {% for topic in topics %}
        <li>{{ topic.getLink() }}</li>
      {% endfor %}
    </ul>
  </article>
{% endfor %}
```
```twig
{% set cars = craft.entries()
  .section('cars')
  .all() %}

{% for car in cars %}
  {% set manufacturer = car.manufacturer.eagerly().one() %}
  {% set bodyStyle = car.bodyStyle.eagerly().one() %}

  <article>
    <h2>{{ car.title }}</h2>
    <h3>{{ manufacturer.title }}</h3>

    <p>Origin: {{ manufacturer.countryCode }}</p>

    {% set pioneer = bodyStyle.pioneer.eagerly().one() %}

    <p>The {{ bodyStyle.title }} was pioneered by the {{ pioneer.title }} in {{ pioneer.postDate|date('Y') }}.</p>
  </article>
{% endfor %}
```
:::

Lazily eager-loaded relations are used just as though they _weren’t_. In fact, it’s by using standard element query methods that Craft is able to detect subsequent access to nested elements! This means your templates can continue using `.one()`, `.all()`, or filters like `|first` on any relational field that uses `.eagerly()`.

::: warning
[Native attributes](#eligible-fields-and-attributes) currently do not support lazy eager-loading due to the way their
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
  {# Get the “first” (or only) eager-loaded asset: #}
  {% set image = entry.assetsField|first %}

  {# Make sure we actually have an asset element: #}
  {% if image %}
    <img src="{{ image.url }}" alt="{{ image.title }}">
  {% endif %}
{% endfor %}
```

This template code will only cost three queries (one to fetch the entries, one to determine which assets should be eager-loaded, and one to fetch the assets), and the number of queries will not grow proportional to the number of elements being displayed. The entries are then are automatically populated with their respective related asset(s).

## Accessing Eager-Loaded Elements

Eager-loaded elements are returned as a [collections](collections.md)—or more specifically, an <craft5:craft\elements\ElementCollection>. This means that (in most cases) eager-loaded and non-eager-loaded elements can be treated in the same way.

There are some differences in the methods exposed by element queries and 

Accessing eager-loaded elements works a little differently than regular elements, under certain circumstances. Take a look at how we assigned the `image` variable in our examples, before and after applying the `with` param:

```twig
{# Before: #}
{% set image = entry.assetsField.one() %}

{# After: #}
{% set image = entry.assetsField|first %}
```

When the assets _aren’t_ eager-loaded, `entry.assetsField` gives you a preconfigured [asset query](../reference/element-types/assets.md#querying-assets) to return the related assets.

However, when the assets _are_ eager-loaded, `entry.assetsField` gets overwritten with an array of the eager-loaded assets. So `one()`, `all()`, and other element query methods are not available. Instead you must stick to the standard array syntaxes. In our example, we’re grabbing the first asset with `entry.assetsField[0]`, and we’re using Twig’s _null-coalescing operator_ (`??`) to define a default value (`null`) in case there is no related asset.

## Eager-Loading Multiple Sets of Elements

If you have multiple sets of elements you wish to eager-load off of the top list of elements, just add additional values to your `with` parameter.

```twig
{% set entries = craft.entries
  .section('news')
  .with([
    'assetsField',
    'matrixField'
  ])
  .all() %}

{% for entry in entries %}
  {# Get the eager-loaded asset, if there is one #}
  {% set image = entry.assetsField[0] ?? null %}
  {% if image %}
    <img src="{{ image.url }}" alt="{{ image.title }}">
  {% endif %}

  {# Loop through any eager-loaded Matrix blocks #}
  {% for block in entry.matrixField %}
    {{ block.textField }}
  {% endfor %}
{% endfor %}
```

## Eager-Loading Nested Sets of Elements

It’s also possible to load _nested_ sets of elements, using this syntax:

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    'entriesField.assetsField'
  ])
  .all() %}

{% for entry in entries %}
  {# Loop through any eager-loaded sub-entries #}
  {% for relatedEntry in entry.entriesField %}
    {# Get the eager-loaded asset, if there is one #}
    {% set image = relatedEntry.assetsField[0] ?? null %}
    {% if image %}
      <img src="{{ image.url }}" alt="{{ image.title }}">
    {% endif %}
  {% endfor %}
{% endfor %}
```

## Defining Custom Parameters on Eager-Loaded Elements

You can define custom criteria parameters that will get applied as elements are being eager-loaded, by replacing its key with an array that has two values: the key, and a [hash](twig-primer.md#hashes) that defines the criteria parameters that should be applied.

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    ['assetsField', { kind: 'image' }]
  ])
  .all() %}
```

When eager-loading nested sets of elements, you can apply parameters at any level of the eager-loading path.

```twig
{% set entries = craft.entries()
  .section('news')
  .with([
    ['entriesField', { authorId: 5 }],
    ['entriesField.assetsField', { kind: 'image' }]
  ])
  .all() %}
```

## Eager-Loading Elements Related to Matrix Blocks

The syntax for eager-loading relations from Matrix blocks is a little different than other contexts. You need to prefix your relational field’s handle with the block type’s handle:

```twig
{% set blocks = entry.matrixField
  .with(['blockType:assetsField'])
  .all() %}
```

The reason for this is that Matrix fields can have multiple sub-fields that each share the same handle, as long as they’re in different block types. By requiring the block type handle as part of the eager-loading key, Matrix can be confident that it is eager-loading the right set of elements.

This applies if the Matrix blocks themselves are being eager-loaded, too.

```twig
{% set entries = craft.entries()
  .section('news')
  .with(['matrixField.blockType:assetsField'])
  .all() %}
```

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

Note that each transform definition you want to eager-load can either be a string (the handle of a transform defined in Settings → Assets → Image Transforms) or a [hash](twig-primer.md#hashes) that defines the transform properties.

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

[Relational fields](../system/relations.md) are the most common candidate for eager-loading. Fields are always eager-loaded using their handle. In this example, `manufacturer` is an entries field attached to each “car” entry:

```twig
{% set carsWithManufacturers = craft.entries()
  .section('cars')
  .with([
    ['manufacturer'],
  ])
  .all() %}
```

[Element types](../system/elements.md) support a variety of unique eager-loadable attributes, as well:

All Element Types
:   - Immediate children: `children`
    - All descendants: `descendants`
    - Immediate parent: `parent`
    - All ancestors: `ancestors`
    - Same element in other sites: `localized`
    - Drafts: `drafts`
    - Draft creators: `draftCreator`
    - Revisions: `revisions`
    - Revision creators: `revisionCreator`

Assets
:   - Uploader: `uploader`

Entries
:   - First author: `author`
:   - Authors: `authors`

Users
:   - Addresses: `addresses`
    - Profile photo: `photo`

::: tip
Some elements may also expose query methods that optimize the loading of associated _non-element_ records (like [asset transforms](#eager-loading-image-transforms)), but their interfaces are not part of the core element-only eager-loading system.
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
