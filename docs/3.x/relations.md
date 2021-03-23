# Relations

Craft has a powerful engine for relating elements to one another with five relational field types:

* [Assets Fields](assets-fields.md)
* [Categories Fields](categories-fields.md)
* [Entries Fields](entries-fields.md)
* [Tags Fields](tags-fields.md)
* [Users Fields](users-fields.md)

Just like the other field types, you can add these to your [section](entries.md#sections), [user](users.md), [asset](assets.md), [category group](categories.md), [tag group](tags.md), and [global sets](globals.md)’ field layouts.

## Terminology

Each relationship consists of two elements we call the *source* and *target*:

- The <dfn>source</dfn> has the relational field where other elements are chosen.
- The <dfn>target</dfn> element is the one selected by the source.

Let’s say we’d like have an entry for a drink recipe where we select each ingredient as a relationship in an Entries field.

To set this up:

1. Create a new field using the Entries field type, with the name “Ingredients”.
2. From the available source elements, check “Ingredients” so only those entries are options.
3. Leave the Limit field blank so we can choose however many ingredients each recipe needs.

Now we can assign the ingredients to each Drink entry with the new Ingredients relation field.

By selecting multiple ingredients in an entry, we create several relationships—each with the recipe as the source and the ingredient as the target.

## Templating

Once we have our relations field set up, we can look at the options for outputting related elements in our templates.

### Getting Target Elements via the Source Element

If you’ve already got a hold of the source element in your template, like in the example below where we're outputting the Drink entry, you can access its target elements for a particular field in the same way you access any other field’s value: by the handle.

Calling the source’s relational field handle (`ingredients`) returns an [entry query](entries.md#querying-entries) that can output the field’s target elements, in the field-defined order.

If we want to output the ingredients list for a drink recipe, we'd use the following:

```twig
{% set ingredients = drink.ingredients.all() %}
{% if ingredients|length %}

    <h3>Ingredients</h3>

    <ul>
        {% for ingredient in ingredients %}
            <li>{{ ingredient.title }}</li>
        {% endfor %}
    </ul>

{% endif %}
```

You can also add any additional parameters supported by the element type:

```twig
{% for ingredient in drink.ingredients.section('ingredients').all() %}
    <li>{{ ingredient.title }}</li>
{% endfor %}
```

### The `relatedTo` Parameter

Assets, Categories, Entries, Users, and Tags each support a `relatedTo` parameter, enabling all kinds of crazy things.

You can pass one of these to it:

- A single **element object**: <craft3:craft\elements\Asset>, <craft3:craft\elements\Category>, <craft3:craft\elements\Entry>, <craft3:craft\elements\User>, or <craft3:craft\elements\Tag>
- A single **element ID**
- A [**hash**](dev/twig-primer.md#hashes) with properties we’ll get into below: `element`, `sourceElement` or `targetElement` optionally with `field` and/or `sourceSite`
- An [**array**](dev/twig-primer.md#arrays) containing any mixture of the above options, which can start with `and` for relations on all elements rather than _any_ elements (default behavior is `or`, which you can omit or pass explicitly)

::: warning
You cannot chain multiple `relatedTo` parameters on the same element query; any subsequent `relatedTo` criteria will overwrite whatever was previously set.
:::

### The `andRelatedTo` Parameter

You can use the `andRelatedTo` parameter to further specify criteria that will be joined with an `and`. It accepts the same arguments, and you can use multiple `andRelatedTo` parameters.

::: warning
You can’t combine multiple `relatedTo` criteria with `or` *and* `and` conditions.
:::

#### Simple Relationships

A simple query might pass `relatedTo` a single element object or ID, like a `drinks` entry or entry ID represented here by `drink`:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo(drink)
    .all() %}
{# result: drinks entries with *any* relationship to `drink` (source or target) #}
```

Passing an array of elements returns results relating to any one of the supplied items, meaning one *or* the other by default:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ gin, lime ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` #}
```

Passing `and` at the beginning of an array returns results relating to *all* of the supplied items:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ 'and', gin, lime ])
    .all() %}
{# result: drinks entries with any relationship to `gin` and `lime` #}
```

You can further nest criteria as well:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        [ 'or', gin, lime ],
        [ 'or', rum, grenadine ],
    ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` *and*
   `rum` or `grenadine` #}
```

You could achieve the same result as the example above using the `andRelatedTo` parameter:

```twig
{% set relatedDrinks = craft.entries()
    .section('drinks')
    .relatedTo([ 'or', gin, lime ])
    .andRelatedTo([ 'or', rum, grenadine ])
    .all() %}
{# result: drinks entries with any relationship to `gin` or `lime` *and*
   `rum` or `grenadine` #}
```

#### Advanced Relationships

You can query more specifically by passing `relatedTo`/`andRelatedTo` a [hash](dev/twig-primer.md#hashes) that contains the following properties:

| Property | Accepts | Description |
| -------- | -------- | ----------- | -- |
| `element`, `sourceElement`, or `targetElement` | Element ID, element, [element query](element-queries.md), or an array with any of those. | Use `element` for source *or* target relations, `sourceElement` for relations where provided item/set is the source, or `targetElement` for relations where provided item/set is the target. |
| `field` (optional) | Field handle, field ID, or an array with either of those. | Limits scope to relations created by the supplied field(s). |
| `sourceSite` (optional) | [Site](craft3:craft\models\Site) object, site ID, or site handle. | Limits scope to relations created from the supplied site(s). |

::: warning
Only use `sourceSite` if you’ve designated your relational field to be translatable.
:::

This is the equivalent of calling `drink.ingredients.all()`:

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredients'
    })
    .all() %}
{# result: ingredients entries related from `drink`’s custom `ingredients` field #}
```

This doesn’t limit to a specific field, but it limits relations to the current site only:

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        sourceSite: craft.app.sites.currentSite.id
    })
    .all() %}
{# result: ingredients entries related from `drink`, limited to the current site #}
```

This finds other drinks that uses the current one’s primary ingredient:

```twig
{% set moreDrinks = craft.entries()
    .section('drinks')
    .relatedTo({
        targetElement: drink.ingredients.one(),
        field: 'ingredients'
    })
    .all() %}
{# result: other drinks using `drink`’s first ingredient #}
```

#### Going Through Matrix

If you want to find elements related to a source element through a [Matrix](matrix-fields.md) field, pass the Matrix field’s handle to the `field` parameter. If that Matrix field has more than one relational field and you want to target a specific one, you can specify the block type field’s handle using a dot notation:

```twig
{% set ingredients = craft.entries()
    .section('ingredients')
    .relatedTo({
        sourceElement: drink,
        field: 'ingredientsMatrix.relatedIngredient'
    })
    .all() %}
```

#### Passing Multiple Relation Criteria

There might be times when you need to factor multiple types of relations into the mix. For example, outputting all of the current user’s favorite drinks that include espresso:

```twig
{% set espresso = craft.entries()
    .section('ingredients')
    .slug('espresso')
    .one() %}

{% set cocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: currentUser, field: 'favoriteDrinks' },
        { targetElement: espresso, field: 'ingredients' }
    ])
    .all() %}
{# result: current user’s favorite espresso drinks #}
```

Or you might want to pass an element query to find other users’ favorite drinks using the current one’s primary ingredient:

```twig
{% set otherUsers = craft.users()
    .id('not '~currentUser.id)
    .all() %}

{% set recommendedCocktails = craft.entries()
    .section('drinks')
    .relatedTo([
        'and',
        { sourceElement: otherUsers, field: 'favoriteDrinks' },
        { targetElement: drink.ingredients.one(), field: 'ingredients' }
    ])
    .all() %}
{# result: other users’ favorite drinks that use `drink`’s first ingredient #}
```
