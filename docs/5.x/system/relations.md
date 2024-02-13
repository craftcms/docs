---
sidebarDepth: 2
---

# Relations

Craft has a powerful engine for relating elements to one another with five [relational field types](#custom-fields). Just like other field types, relational fields can be added to any [field layout](./fields.md#field-layouts), including those within [nested entries](#relations-via-matrix).

_Unlike_ other field types, relational fields store their data in a dedicated `relations` table. In that table, Craft tracks:

- The element that is the **source** of the relationship;
- Which **field** a relationship uses;
- The **site** a relationship was defined;
- The element that is the **target** of the relationship;
- The **order** in which the related elements are arranged;

This allows you to design fast and powerful [queries](#the-relatedto-parameter) for related content, and to [optimize loading](../development/eager-loading.md) of nested and related resources.

### Terminology

Each relationship consists of two elements we call the *source* and *target*:

- The <dfn>source</dfn> has the relational field where other elements are chosen.
- The <dfn>target</dfn> is the one selected by the source.

## Illustrating Relations

Suppose we have a database of _Recipes_ (represented as a [channel](./entries.md#channels)) and we want to allow visitors to browse other recipes that share an ingredient. To-date, ingredients have been stored as plain text along with the instructions, and users have relied on search to discover other recipes.

Let’s leverage Craft’s relations system to improve this “schema” and user experience:

1. Create another channel for _Ingredients_.
2. Create a new [Entries field](./entries-fields.md), with the name “Ingredients.”
3. Limit the **Sources** option to “Ingredients” only.
4. Leave the **Limit** field blank so we can choose however many ingredients each recipe needs.
5. Add this new field to the _Recipes_ channel’s field layout.

Now, we can attach _Ingredients_ to each _Recipe_ entry via the new _Ingredients_ relation field. Each selected ingredient defines a new relationship, with the recipe as the _source_ and the ingredient as the _target_.

<a id="getting-target-elements-via-the-source-element" title="Section “Getting Target Elements via the Source Element” has been renamed."></a>

## Using Relational Data

Relationships are primarily used within [element queries](./element-queries.md), either via a relational field on an element you already have a reference to, or the [`relatedTo()` query parameter](#the-relatedto-parameter).

### Custom Fields

_Ingredients_ attached to a _Recipe_ can be accessed using the relational field’s handle. Unlike most fields (which return their stored value), relational fields return an [element query](./element-queries.md), ready to fetch the attached elements in the order they were selected.

Craft has X built-in relational fields, each pointing to a different [element type](./elements.md#element-types):

- [Assets](../reference/field-types/assets.md)
- [Categories](../reference/field-types/categories.md)
- [Entries](../reference/field-types/entries.md)
- [Tags](../reference/field-types/tags.md)
- [Users](../reference/field-types/users.md)

Addresses and global sets don’t have relational fields, in the traditional sense.

::: tip
[Eager-loading](../development/eager-loading.md) related elements _does_ make them available directly on the source element! Don’t worry about this just yet—let’s get comfortable with the default behavior, first.
:::

To output the list of ingredients for a recipe on the recipe’s page, you could do this (assuming the relational field handle is `ingredients`):

```twig
{# Fetch related elements by calling `.all()` on the relational field: #}
{% set ingredients = entry.ingredients.all() %}

{# Check if anything came back: #}
{% if ingredients|length %}
  <h3>Ingredients</h3>

  <ul>
    {# Loop over the results: #}
    {% for ingredient in ingredients %}
      <li>{{ ingredient.title }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

Because `entry.ingredients` is an element query, you can set additional constraints before executing it:

```twig
{# Narrow the query to only “Vegetables”: %}
{% set veggies = entry.ingredients.foodGroup('vegetable').all() %}

<h3>Vegetables</h3>

{% if veggies|length %}
  <ul>
    {% for veggie in veggies %}
      <li>{{ veggie.title }}</li>
    {% endfor %}
  </ul>
{% else %}
  <p>This recipe has no vegetables!</p>
{% endif %}
```

This query will display ingredients attached to the current recipe that _also_ have their `foodGroup` field (perhaps a [Dropdown](./dropdown-fields.md)) set to `vegetable`. Here’s another example using the same schema—but a different [query execution method](./element-queries.md#executing-element-queries)—that lets us answer a question that some cooks might have:

```twig
{% set hasMeat = entry.ingredients.foodGroup(['meat', 'poultry']).exists() %}

{% if not hasMeat %}
  <span class="badge">Vegetarian</span>
{% endif %}
```

::: tip
Each relational field type will return a different type of element query. _Entries_ fields produce an entry query; _Categories_ fields produce a category query; and so on.
:::

### The `relatedTo` Parameter

The `relatedTo` parameter on every [element query](./element-queries.md) allows you to narrow results based on their relationship to an element (or multiple elements).

Any of the following can be used when setting up a relational query:

- A single **element object**: <craft4:craft\elements\Asset>, <craft4:craft\elements\Category>, <craft4:craft\elements\Entry>, <craft4:craft\elements\User>, or <craft4:craft\elements\Tag>
- A single **element ID**
- A [**hash**](../development/twig.md#hashes) with properties describing specific constraints on the relationship:
  - Required: `element`, `sourceElement`, or `targetElement`
  - Optional: `field` and `sourceSite`
- An [**array**](../development/twig.md#arrays) of the above options, with an optional operator in the first position:
  - The string `and`, to return relations matching _all_ conditions rather than _any_;
  - The string `or`, to return relations that match _any_ conditions (default behavior, can be omitted);

::: tip
Chaining multiple `relatedTo` parameters on the same element query will overwrite earlier ones. Use [`andRelatedTo`](#the-andrelatedto-parameter) to append relational constraints.
:::

### The `andRelatedTo` Parameter

Use the `andRelatedTo` parameter to join multiple sets of relational criteria together with an `and` operator. It accepts the same arguments as `relatedTo`, and can be supplied any number of times.

::: warning
There is one limitation, here: multiple `relatedTo` criteria using `or` *and* `and` operators cannot be combined.
:::

## Simple Relationships

The most basic relational query involves passing a single element or element ID. Here, we’re looking up other recipes that use the current one’s main protein:

```twig
{# Grab the first protein in the recipe: #}
{% set protein = entry.ingredients.foodGroup('protein').one() %}

{% set similarRecipes = craft.entries()
  .section('recipes')
  .relatedTo(protein)
  .all() %}
{# -> Recipes that share `protein` with the current one. #}
```

Passing an array returns results related to _any_ of the supplied elements. This means we could expand our criteria to search for other recipes with any crossover in proteins:

```twig
{# Note the use of `.all()`, this time: #}
{% set proteins = entry.ingredients.foodGroup('protein').all() %}

{% set moreRecipes = craft.entries()
  .section('recipes')
  .relatedTo(proteins)
  .all() %}
{# -> Recipes that share one or more proteins with the current one. #}
```

Passing `and` at the beginning of an array returns results relating to *all* of the supplied items:

```twig
{% set proteins = entry.ingredients.foodGroup('protein').all() %}

{% set moreRecipes = craft.entries()
  .section('recipes')
  .relatedTo(['and'] | merge(proteins))
  .all() %}
{# -> Recipes that also use all this recipe’s proteins. #}
```

This is equivalent to `.relatedTo(['and', beef, pork])`, if you already had variables for `beef` and `pork`.

## Compound Criteria

Let’s look at how we might combine multiple relational criteria:

```twig
{# A new relational field for recipes, tracking their origins: #}
{% set origin = entry.origin.one() %}
{% set proteins = entry.ingredients.foodGroup('proteins').all() %}

{% set regionalDishes = craft.entries()
  .section('recipes')
  .relatedTo([
    'and',
    origin,
    proteins,
  ])
  .all() %}
{# -> Recipes from the same region that share at least one protein. #}
```

You could achieve the same result as the example above using the `andRelatedTo` parameter:

```twig
{% set regionalDishes = craft.entries()
  .section('recipes')
  .relatedTo(origin)
  .andRelatedTo(proteins)
  .all() %}
```

::: warning
These examples _may_ return the recipe you’re currently viewing. Exclude a specific element from results with the `id` param: `.id(['not', entry.id])`.
:::

## Complex Relationships

All the `relatedTo` examples we’ve looked at assume that the only place we’re defining relationships between recipes and ingredients is the _ingredients_ field. What if there were other fields on recipes that described “substitutions,” or “pairs with” and “clashes with” that might muddy our related recipes? What if an ingredient had a “featured seasonal recipe” field?

Craft lets you be specific about the location and direction of relationships when using relational params in your queries. The following options can be passed to `relatedTo` and `andRelatedTo` as a [hash](../development/twig.md#hashes):

### Sources and Targets

Property
:  One of `element`, `sourceElement`, or `targetElement`

Accepts
:  Element ID, element, [element query](../development/element-queries.md), or an array thereof

Description
:  - Use `element` to get results on either end of a relational field (source _or_ target);
:  - Use `sourceElement` to return elements selected in a relational field on the provided element(s);
:  - Use `targetElement` to return elements that have the provided element(s) selected in a relational field.

One way of thinking about the difference between `sourceElement` and `targetElement` is that specifying a _source_ is roughly equivalent to using a field handle:

```twig
{% set ingredients = craft.entries()
  .section('ingredients')
  .relatedTo({
    sourceElement: recipe,
  })
  .all() %}
{# -> Equivalent to `recipe.ingredients.all()`, from our very first example! #}
```

### Fields

Property
:  `field` (Optional)

Accepts
:  Field handle, field ID, or an array thereof.

Description
:  Limits relationships to those defined via one of the provided fields.

Suppose we wanted to recommend recipes that use the current one’s alternate proteins—but as main ingredients, not substitutions:

```twig
{% set alternateProteins = recipe.substitutions.foodGroup('protein').all() %}

{% set recipes = craft.entries()
  .section('recipes')
  .relatedTo({
    targetElement: alternateProteins,
    field: 'ingredients',
  })
  .all() %}
```

By being explicit about the field we want the relation to use, we can show the user recipes that don’t rely on substitutions to meet their dietary needs.

### Sites

Property
:  `sourceSite` (Optional, defaults to main query’s site)

Accepts
:  [Site](craft4:craft\models\Site) object, site ID, or site handle.

Description
:  Limits relationships to those defined from the supplied site(s).
:  In most cases, you won’t need to set this explicitly. Craft’s default behavior is to look for relationships only in the site(s) that the query will return elements for.

::: warning
Only use `sourceSite` if you’ve designated your relational field to be translatable.
:::

What if our recipes live on an international grocer’s website and are localized for dietary tradition? We can still provide results that make sense for a variety of cooks:

```twig
{% set proteins = recipe.ingredients.foodGroup('protein').all() %}

{% set recipes = craft.entries()
  .section('recipes')
  .relatedTo([
    'or',
    {
      targetElement: proteins,
      field: 'ingredients',
    },
    {
      targetElement: proteins,
      sourceSite: null,
      field: 'substitutions',
    },
  ])
  .all() %}
{# -> Recipes that share regionally-appropriate proteins, *or* that can be adapted. #}
```

Here, we’re allowing Craft to look up substitutions defined in any site, which might imply a recipe can be adapted.

## Relations via Matrix

Relational fields on nested entries within Matrix fields are used the same way they would be on any other element type.

If you want to find elements related to a source element through a [Matrix](matrix.md) field, pass the Matrix field’s handle to the `field` parameter:

```twig{5}
{% set relatedRecipes = craft.entries()
    .section('recipes')
    .relatedTo({
        targetElement: ingredient,
        field: 'steps'
    })
    .all() %}
```

In this example, we’ve changed our schema a bit: ingredients are now attached to blocks in a `steps` Matrix field, so we can tie instructions and quantities or volume to each one. We still have access to all the same relational query capabilities!

If that Matrix field has more than one relational field and you want to target a specific one, you can specify the block type field’s handle using a dot notation:

```twig{5}
{% set relatedRecipes = craft.entries()
    .section('recipes')
    .relatedTo({
        targetElement: ingredient,
        field: 'steps.ingredient'
    })
    .all() %}
```

::: warning
This notation only uses the main Matrix field’s handle and the block’s relational field handle: `matrixFieldHandle.relationalFieldHandle`. The block type handle is _not_ used here, as it is when [eager-loading](./dev/eager-loading-elements.md).
:::
