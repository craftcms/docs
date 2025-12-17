---
related:
  - uri: ../element-types/categories.md
    label: Category Elements
  - uri: ../../system/relations.md
    label: Using Relationships
  - uri: link.md
    label: Link fields
---

# Categories Fields

<div class="version-warning">

Categories are being phased out in favor of [structure sections](../element-types/entries.md#structures). The corresponding [entries field](entries.md) has a _maintain hierarchy_ setting that mimics categories fields.

Read more about this [transition](https://craftcms.com/blog/entrification) on our blog.

</div>

Categories fields allow you to relate [categories](../element-types/categories.md) to other elements. It is one of Craft’s [relational](../../system/relations.md) custom fields.

<!-- more -->

## Settings

Categories fields have the following settings:

- **Source** — Which category group (or other category index [source](../../system/elements.md#sources)) the field should be able to relate categories from.
- **Maintain Hierarchy** — Should the selected categories’ order and hierarchy be preserved?

  When **enabled**, the following options become available:

  - **Branch Limit** — How many distinct “branches” of the category tree can be selected?

  When **disabled**, these options are available:

  - **Min Relations** — The minimum number of categories that must be selected when the field is marked as “required” in a field layout. (Default is no minimum.)
  - **Max Relations** — The maximum number of categories that can be selected. (Default is no maximum.)
  - **Default Category Placement** — Whether new selections are prepended or appended to the existing relations.
  - **View Mode** — How the related categories are displayed to authors (_List_, _Cards_, <Since ver="5.9.0" feature="The inline list and card grid view modes for relational fields">_Card grid_, or _Inline list_</Since>).

- **“Add” Button Label** — The label that should be used on the field’s selection button.
- **Validate related categories** — Whether or not validation errors on the related categories will be bubbled up.

When a single source is selected, you can also configure these settings:

- **Show the search input** — Allow authors to quick-search (and create) categories, without opening an element selector modal. <Since ver="5.8.0" feature="Quick-search support for relational fields" />

### Advanced Settings

Additional settings are available under the **Advanced** toggle:

- **Allow self-relations** — If this field is added to a category group field layout, should the author be allowed to select the category they are editing as a relationship to itself?

### Multi-Site Settings

On multi-site installs, the following settings will also be available:

- **Translation Method** — How relationships are handled when [propagating changes to other sites](../../system/fields.md#translation-methods).
- **Relate categories from a specific site?** — Whether to only allow relations to categories from a specific site.
  - If _enabled_, a new setting will appear where you can choose which site.
  - If _disabled_, related categories will always be pulled from the current site.

- **Show the site menu** — Whether to display the site menu in category selection modals. (This setting is hidden when relations are locked to a single site.)

<See path="../../system/fields.md" hash="translation-methods" label="Translation Methods" description="Learn about options for translating field values." />

## The Field

Categories fields list all the currently-related categories with a button to select new ones.

Choosing **Add a category** will bring up a modal window where you can find and select additional categories. You can create new categories from this modal as well, by choosing **New category**.

When you select a nested category, all the ancestors leading up to that category will also automatically be related. Likewise, when you remove a category from within the main field input, any of its descendants will also be removed.

### Inline Category Editing

Double-click on a related category to edit it in a [slideout](../../system/control-panel.md#slideouts).

## Development

### Querying Elements with Categories Fields

When [querying for elements](../../development/element-queries.md) that may have a categories field, you can use values compatible with [relational query params](../../system/relations.md) to narrow the results:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related categories.
| `':notempty:'` | that have at least one related category.
| `100` | that are related to the category with an ID of 100.
| `[100, 200]` | that are related to a category with an ID of 100 or 200.
| `[':empty:', 100, 200]` | with no related categories, or are related to a category with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the categories with IDs of 100 and 200.
| one or more [Category](craft5:craft\elements\Category) elements | that are related to the category/categories.
| a [CategoryQuery](craft5:craft\elements\db\CategoryQuery) object | that are related to any of the resulting categories.

In general, you won’t know a specific category’s ID up-front. Here’s how you might use a category field param to fetch entries belonging to a particular category, in a blog:

```twig
{% set posts = craft.entries()
  .section('posts')
  .myCategoriesField(category)
  .all() %}
```

This example assumes we’re loading entries from a [category’s template](../element-types/categories.md#routing-and-templates), where the `category` variable is automatically injected. This same approach would work if we were instead looking for related content, on an individual post page:

```twig
{# Fetch IDs of the current post’s categories: #}
{% set currentPostCategories = entry.myCategoriesField.ids() %}

{# Use them in a new entries query: #}
{% set relatedPosts = craft.entries()
  .section('posts')
  .myCategoriesField(currentPostCategories)
  .limit(5)
  .all() %}
```

This query will return entries related to _any_ of the current post’s categories. Prepend `and` to the array to find entries that share _all_ their categories with the current post:

```twig
['and', ...currentPostCategories]
```

All the examples so far are achievable using generic [relational query methods](../../system/relations.md#the-relatedto-parameter), but automatically ensure that relationships are defined in a specific field, and in a specific direction (as _targets_). An equivalent query using `.relatedTo()` might look something like this:

```twig{5-8}
{% set currentPostCategories = entry.myCategoriesField.ids() %}

{% set relatedPosts = craft.entries()
  .section('posts')
  .relatedTo({
    field: 'myCategoriesField',
    targetElement: currentPostCategories,
  })
  .limit(5)
  .all() %}
```

The last example we’ll look at uses the [special `:empty:` token](../../system/relations.md#sources-and-targets) to find post entries with _no_ categories related to the field:

```twig{3}
{% set uncategorized = craft.entries()
  .section('posts')
  .myCategoriesField(':empty:')
  .all() %}
```

::: warning
This query may still return entries related to categories via _other_ fields! You can combine multiple category field params to better define “uncategorized:”

```twig{3-4}
{% set uncategorized = craft.entries()
  .section('posts')
  .topics(':empty:')
  .productFamilies(':empty:')
  .all() %}

{# ...or... }

{% set uncategorized = craft.entries()
  .section('posts')
  .relatedTo({
    targetElement: ':empty:',
    field: ['topics', 'productFamilies'],
  })
  .all() %}
```
:::

### Working with Categories Field Data

If you have an element with a categories field in your template, you can access the related category elements using the field’s handle:

::: code
```twig
{% set query = entry.myCategoriesField %}
```
```php
$query = $entry->myCategoriesField; 
```
:::

That will give you a [category query](../element-types/categories.md#querying-categories), prepped to return all the related categories for the given field. You can use the results as a list…

::: code
```twig
{% set relatedCategories = entry.myCategoriesField.all() %}
{% if relatedCategories|length %}
  <ul>
    {% for rel in relatedCategories %}
      <li><a href="{{ rel.url }}">{{ rel.title }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedCategories = $entry->myCategoriesField->all();
if (count($relatedCategories)) {
    foreach ($relatedCategories as $rel) {
        // do something with $rel->url and $rel->title
    }
}
```
:::

…or you can show them as a hierarchical list with the [nav](../twig/tags.md#nav) tag:

```twig
{% set relatedCategories = entry.myCategoriesField.all() %}
{% if relatedCategories|length %}
  <ul>
    {% nav rel in relatedCategories %}
      <li>
        <a href="{{ rel.url }}">{{ rel.title }}</a>
        {% ifchildren %}
          <ul>
            {% children %}
          </ul>
        {% endifchildren %}
      </li>
    {% endnav %}
  </ul>
{% endif %}
```

If you only want the first related category, call [one()](craft5:craft\db\Query::one()) instead and make sure it returned something:

::: code
```twig
{% set rel = entry.myCategoriesField.one() %}
{% if rel %}
  <p><a href="{{ rel.url }}">{{ rel.title }}</a></p>
{% endif %}
```
```php
$rel = $entry->myCategoriesField->one();
if ($rel) {
    // do something with $rel->url and $rel->title
}
```
:::

If you need to check for related categories without fetching them, you can call [exists()](craft5:craft\db\Query::exists()):

::: code
```twig
{% if entry.myCategoriesField.exists() %}
  <p>There are related categories!</p>
{% endif %}
```
```php
if ($entry->myCategoriesField->exists()) {
    // do something with related categories
}
```
:::

You can set [parameters](../element-types/categories.md#parameters) on the category query as well. For example, to only fetch the “leaves” (categories without any children), set the [leaves](../element-types/categories.md#leaves) param:

::: code
```twig
{% set relatedCategories = entry.myCategoriesField
  .leaves()
  .all() %}
```
```php
$relatedAssets = $entry->myCategoriesField
    ->leaves()
    ->all();
```
:::

::: tip
Each time you access a category field by its handle, Craft returns a new element query.
:::

### Saving Categories Fields

If you have an element form, such as an [entry form](kb:entry-form), that needs to contain a Categories field, you will need to submit your field value as a list of category IDs.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myCategoriesField]', '') }}

{# Get all of the possible category options #}
{% set possibleCategories = craft.categories()
  .group('food')
  .all() %}

{# Get the currently related category IDs #}
{% set relatedCategoryIds = entry is defined
  ? entry.myCategoriesField.ids()
  : [] %}

<ul>
  {% nav possibleCategory in possibleCategories %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myCategoriesField][]',
          possibleCategory.id,
          { checked: possibleCategory.id in relatedCategoryIds }
        ) }}
        {{ possibleCategory.title }}
      </label>
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
When the **Maintain Hierarchy** [setting](#settings) is _enabled_, Craft enforces an order for the selected categories and normalizes the selections to “fill in” gaps in the tree.

With the setting _disabled_, only the explicitly-selected categories will be related, in the order they appear in the request—most often, their order in the form’s HTML.
:::

### GraphQL

Categories related via a categories field can be selected along with the source of the relationship:

```graphql{7-10}
query Posts {
  entries(section: "blog") {
    title
    url

    ... on post_Entry {
      topics {
        title
        url
      }
    }
  }
}
```

You can also use categories fields as query arguments, to narrow the results:

```graphql{4}
query TopicPosts {
  entries(
    section: "blog"
    topics: [1234, 5678]
  ) {
    title
    url
  }
}
```

Some relational queries may require that you translate category identifiers (like slugs or UUIDs) to IDs.

<See path="../../development/graphql.md" hash="relationships" label="Relational Fields in GraphQL" description="Get the most out of Craft’s relational fields via the GraphQL API." />

## See Also

- [Category Queries](../element-types/categories.md#querying-categories)
- <craft5:craft\elements\Category>
- [Relations](../../system/relations.md)
