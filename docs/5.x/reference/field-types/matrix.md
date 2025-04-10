---
related:
  - uri: ../../development/element-queries.md
    label: Introduction to Elements
  - uri: ../element-types/entries.md
    label: Entries
---

# Matrix Fields

Matrix fields allow you to manage nested [entries](../element-types/entries.md) in a fluid way. Entries created within a Matrix field are “owned” by the element that field is attached to, and can represent anything from a slide in a gallery to an entire resources section, each record having its own URL.

<!-- more -->

::: tip
During the Craft 5 upgrade process, _Matrix blocks_ were converted to _entries_. [Fields](../../system/fields.md) that were previously owned by a particular “block type” are now managed in (and assigned from) a global pool. You are now able to design [entry types](../element-types/entries.md#entry-types) that exist as standalone content objects (in a section), _or_ as nested entries (in a Matrix field)!
:::

## Settings

Matrix fields have the following settings:

#### Entry Types

Select from existing, globally-defined [entry types](../element-types/entries.md#entry-types), or create a new one on-the-fly.

::: tip
You can specify local overrides for each of the attached entry types’ **Name** and **Handle** by selecting **Settings** from a chip’s action <Icon kind="ellipses" /> menu. <Since ver="5.6.0" feature="Contextual entry type name and handle overrides" /> A pencil icon will be displayed in any entry type chip that has overrides.

![Opening a selected entry type’s settings](../../images/fields-matrix-entry-types.png)
:::

#### Propagation Method

Choose how nested entries are propagated to other sites. This applies only to _new_ nested entries—changes to _existing_ nested entries are propagated on a per-field basis.

#### Site Settings <Badge text="New!" />

Nested entries can have their own URIs and templates.

::: tip
Incorporate the owner’s URI in a nested element by using `{owner.uri}` in its **URI Format** [object template](../../system/object-templates.md)!
:::

#### Min Entries

The _minimum_ number of entries that can be created within the field. (Default is no lower limit.)

#### Max Entries

The _maximum_ number of entries that can be created within the field. (Default is no upper limit.)

#### Versioning <Since ver="5.7.0" feature="Control over creation of revisions for nested entries in Matrix fields" />

Nested entries using the _As inline-editable blocks_ [view mode](#view-mode) are “versioned” alongside their owner—when making a change directly within the context of the owner, Craft automatically creates [revisions](../../system/drafts-revisions.md) for both elements. However, revisions of the nested element are hidden, by default.

The **Enable versioning for entries in this field** setting exposes the revisions menu and the **Notes** field in the sidebar, when editing a nested entry on its own.

#### View Mode <Badge text="New!" />

Choose how the nested elements are represented within the [field UI](#the-field):

  - **As cards**: Read-only [element cards](../../system/elements.md#chips-cards) that surface nested field data.
  - **As inline-editable blocks**: Manage nested entries as though they were part of the current element. In prior versions of Craft, this was the _only_ display option for Matrix fields.
  - **As an element index**: A simplified [element index](../../system/elements.md#indexes) with sorting, searching, and filtering controls.

    When using the element index view mode, you can also allow authors to toggle between a card view and standard table view. Enabling the table view reveals controls for the columns that will be displayed, by default.

#### “New” Button Label

By default, the button authors use to create nested entries will be labeled **New entry**. You can override this label with one that better suits the intended content.

## The Field

The interface of a Matrix field depends on its selected [view mode](#view-mode). 

Traditionally, Matrix fields have used the **As inline-editable blocks** view mode, which makes the nested entries appear as though they are a repeating or modular region the main element’s form. An empty Matrix field shows a single button, which will either immediately create a new nested entry (if there is only a single available entry type), or present a menu of entry types to select from:

![An empty Matrix field’s entry types](../../images/fields-matrix-inline-empty.png)

A new entry of the chosen type will be appended to the list:

![A newly-added Quote entry](../../images/fields-matrix-inline-new.png)

You can add as many nested entries to your Matrix field as you’d like—or at least as many as the field’s **Min Entries** and **Max Entries** settings allow.

Each block has a menu that provides access to additional controls:

![A nested entry’s action menu](../../images/matrix-block-action-menu.png)

::: tip
If multiple nested entries are selected, the Collapse/Expand, Disable/Enable, and Delete options will apply to each of them.

You can collapse inline Matrix blocks by choosing the **Collapse** menu option or by double-clicking on a block’s title bar. When a block is collapsed, its title bar will show a preview of its content so you can still identify which block it is.

Inline-blocks can also be reordered by dragging the “Move” icon (<icon kind="move" />) at the end of the block’s title bar. If multiple blocks are selected, all the selected blocks will be going along for the ride.

You can quickly select _all_ blocks by selecting one and pressing <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>A</kbd>, or selecting a range of blocks starting with the first and then <kbd>Shift</kbd>-clicking the last.
:::

The **As cards** [view mode](#view-mode) provides many of the same management tools, but the entries are represented as read-only [cards](../../system/elements.md#chips-cards). Double-click any card to edit its content in a slideout, or use the “Move” icon (<icon kind="move" />) to drag them into a new order.

![An newly-created nested entry, represented as a card](../../images/fields-matrix-cards-new.png)

Finally, the **As an element index** view mode behaves just like a normal element index—except it only ever shows the entries owned by that field. This mode is perfect for large data sets that may span multiple pages, need to be sorted by nested fields, or that would otherwise be unwieldy as blocks or cards.

## Nesting Matrix Fields

A Matrix field can include an entry type that has another Matrix field (or the same Matrix field) in its field layout. Those Matrix fields can use the same view mode, or different view modes, depending on how they’re composed. Take care when designing your authoring experience to avoid confusing, infinitely-recursive data structures.

## Development

### Querying Elements with Matrix Fields

When [querying for elements](../../development/element-queries.md) that have a Matrix field, you can filter the results based on the Matrix field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements… |
| --- | --- |
| `':empty:'` | that don’t have any nested entries. |
| `':notempty:'` | that have at least one nested entry. |

::: code
```twig
{# Fetch entries whose Matrix field `myFieldHandle` has at least one nested entry: #}
{% set entries = craft.entries()
  .myFieldHandle(':notempty:')
  .all() %}
```
```php
// Fetch entries whose Matrix field `myFieldHandle` has at least one nested entry:
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

::: tip
If you have a reference to a nested entry, you can get the owner element via `entry.owner`.
:::

### Working with Matrix Field Data

If you have an element with a Matrix field in your [template](../../development/templates.md), you can access its nested entries via the field’s handle:

```twig
{% set nestedElements = entry.myFieldHandle %}
```

That will give you an [Entry query](../element-types/entries.md#querying-entries), ready to load all the nested entries for a given field. To fetch the nested elements, call one of the [query execution methods](../../development/element-queries.md#executing-element-queries), or use it in a loop:

```twig
{% set nestedEntries = entry.myFieldHandle.all() %}

{% if nestedEntries|length %}
  <ul>
    {% for nestedEntry in nestedEntries %}
      {# ... #}
    {% endfor %}
  </ul>
{% endif %}
```

All the code you put inside the `for`-loop will be repeated for each nested entry. Each time, `nestedEntry` will be a <craft5:craft\elements\Entry> model populated with that nested entry’s content.

Here’s an example of what the template might look like for a Matrix field that has four entry types (_Heading_, _Text_, _Image_, and _Quote_). We can treat each entry type separately by checking its `handle`:

```twig
{% for nestedEntry in entry.myFieldHandle.all() %}
  {# Grab the entry type’s handle for comparison: #}
  {% set typeHandle = nestedEntry.type.handle %}

  {% if typeHandle == 'heading' %}
    <h3>{{ nestedEntry.heading }}</h3>
  {% elseif typeHandle == 'text' %}
    {{ nestedEntry.text|markdown }}
  {% elseif typeHandle == 'image' %}
    {% set image = nestedEntry.image.one() %}

    {% if image %}
      {{ image.getImg('thumb') }}
    {% endif %}
  {% elseif typeHandle == 'quote' %}
    <blockquote>
      <p>{{ nestedEntry.quote }}</p>
      <cite>– {{ nestedEntry.cite }}</cite>
    </blockquote>
  {% else %}
    {# Uh oh! This entry type isn’t support yet... #}
    <p>You can output something here to remind yourself to handle additional cases!</p>
  {% endif %}
{% endfor %}
```

::: tip
This code can be simplified using the [switch](../twig/tags.md#switch) tag.
:::

#### Other Query Methods

If you only want the first nested entry, call [one()](<craft5:craft\db\Query::one()>) instead of `all()`, and make sure it returned something:

::: code
```twig
{% set firstNestedEntry = entry.myFieldHandle.one() %}
{% if firstNestedEntry %}
  {# ... #}
{% endif %}
```
```php
$firstNestedEntry = $entry->myFieldHandle->one();
if ($firstNestedEntry) {
    // ...
}
```
:::

If you only want to know the total number of blocks, call [count()](<craft5:craft\db\Query::count()>).

::: code
```twig
{% set total = entry.myFieldHandle.count() %}
<p>Total nested entries: <strong>{{ total }}</strong></p>
```
```php
$total = $entry->myFieldHandle->count();
```
:::

If you just need to check if there are nested entries added to a field (but don’t need to actually load them), call [exists()](<craft5:craft\db\Query::exists()>):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>Here be nested content!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There’s at least one nested entry!
}
```
:::

::: tip
Read more about [query execution methods](../../development/element-queries.md#executing-element-queries) on the element query page.
:::

You can set [parameters](../element-types/entries.md#parameters) on the query, as well. For example, to only fetch nested entries that use a specific entry type, set the [type](../element-types/entries.md#type) param:

::: code
```twig
{% set nestedTextEntries = entry.myFieldHandle
  .type('text')
  .all() %}
```
```php
$nestedTextEntries = $entry->myFieldHandle
    ->type('text')
    ->all();
```
:::

#### Eager Loading

Nested entries can be [eager-loaded](../../development/eager-loading.md) with their owners using the special `.with()` query method. Eager-loading can greatly improve performance if you need to output one or more nested entries within a list of other elements—like generating summaries of articles in list of blog posts from their first text blocks.

The new `.eagerly()` method simplifies this in situations where you need to output or act on nested entry information within a query for their owners. Take this list of recipes, where `steps` is a Matrix field:

```twig
{% set latestRecipes = craft.entries()
  .section('recipes')
  .orderBy('postDate DESC')
  .limit(5)
  .all() %}

{% for recipe in latestRecipes %}
  <article>
    <h2>{{ recipe.title }}</h2>

    {{ recipe.summary|md }}

    <div>
      {{ recipe.estimatedTotalTime }}
      —
      {{ recipe.steps.eagerly().count() }} Step(s)
      —
      {{ recipe.difficulty }}
    </div>
  </article>
{% endfor %}
```

### Saving Matrix Fields

Working with nested entries is significantly more complex than other field types. The examples that follow assume some familiarity with [routing](../../system/routing.md) and [forms](../../development/forms.md), as well as a willingness to adapt the provided HTML (or extend it with JavaScript) to suit your needs.

If you have an element form (such as an [entry form](kb:entry-form)) that needs to manage content within a Matrix field, that data must be sent in a specific structure. We’re using JSON for the sake of its simple syntax, but the following examples will show you how to build a similarly-structured request with normal HTML `form` elements:

```json{2,7}
{
  "sortOrder": [
    321,
    654,
    "new:1"
  ],
  "entries": {
    "321": {
      "type": "myFirstTypeHandle",
      "fields": {
        "myTextFieldHandle": "...",
        "myAssetField": [
          4,
          5,
          6
        ]
      }
    },
    "654": {
      "type": "myOtherTypeHandle",
      "fields": {
        "myNumberField": 42,
        "myDateField": {
          "date": "2023-01-01",
          "time": "00:00",
          "timezone": "America/Los_Angeles"
        }
      }
    },
    "new:1": {
      "type": "myFirstTypeHandle",
      "fields": {
        "myTextFieldHandle": "...",
        "myAssetField": []
      }
    }
  }
}
```

The sections beginning with highlighted lines are covered below.

#### Entry Order

`sortOrder` should be submitted as an array of all the entry IDs you wish to persist (as well as any new entry identifiers), in the order they should be saved.

If you want all existing entries to persist in the same order they are currently in, then use this template to define your `sortOrder` array:

```twig
{% if entry is defined %}
  {% for nestedEntryId in entry.myFieldHandle.anyStatus().ids() %}
    {{ hiddenInput('fields[myFieldHandle][sortOrder][]', nestedEntryId) }}
  {% endfor %}
{% endif %}
```

::: tip
The `sortOrder` input elements do _not_ need to be adjacent in the DOM—you are free to distribute and collocate them with each entry’s data, if you wish. Wherever they are, though, they must ultimately be POSTed to Craft in the structure above.
:::

#### Entry Data

All of your entry data should be nested under a `entries` key, indexed by their ID. Each nested entry must submit its `type` (using the desired entry type’s handle) and custom field data nested under a `fields` key.

Here’s how you can output form fields for existing entries, for a Matrix field with two entry types (`text` and `image`):

```twig
{% for nestedEntry in entry.myFieldHandle.all() %}
  {# Prefix the nested entry’s input names with `fields[myFieldHandle][entries][<NestedEntryId>]` #}
  {% namespace "fields[myFieldHandle][entries][#{nestedEntry.id}]" %}
    {{ hiddenInput('type', nestedEntry.type) }}

    {% switch nestedEntry.type %}
      {% case 'text' %}
        {# Output fields relevant to the “Text” entry type: #}
        <textarea name="fields[myTextFieldHandle]">
          {{- nestedEntry.myTextFieldHandle|raw -}}
        </textarea>
      {% case 'image' %}
        {% set images = nestedEntry.myAssetFieldHandle.all() %}
        {% if images|length %}
          <ul>
            {% for image in nestedEntry.myAssetFieldHandle.all() %}
              <li>
                {{ image.getImg({ width: 100, height: 100 }) }}
                {{ hiddenInput('fields[myAssetFieldHandle][]', image.id) }}
              </li>
            {% endfor %}
          </ul>
        {% endif %}
    {% endswitch %}
  {% endnamespace %}
{% endfor %}
```

::: tip
Outputting form fields for existing nested entries is completely optional. As long as those entries’ IDs are listed in the `sortOrder` array, they will persist even if their content was omitted from the form data.
:::

Craft also accepts nested entries’ UUIDs under the `sortOrder` key, so long as the `entries` are indexed with UUIDs _prefixed by `uid:`_. The structure would then look like this:

```js{3-4,7,10}
{
  "sortOrder": [
    "a86e9189-3bc8-4e87-ba52-58222b44c066",
    "8e7f2123-e684-4075-8680-175c5e4ab215",
  ],
  "entries": {
    "uid:a86e9189-3bc8-4e87-ba52-58222b44c066": {
      // ...
    },
    "uid:8e7f2123-e684-4075-8680-175c5e4ab215": {
      // ...
    },
  }
}
```

<a name="new-blocks"></a>

#### New Entries

To _add_ an entry from a front-end form, you’ll need a unique, temporary identifier for it, prefixed with `new:`.  Append that “ID” to the `sortOrder` array, and use it when constructing the entry’s form inputs.

For example, the first new entry that is added to the form could have an “ID” of `new:1`, so its `type` input name would end up looking like this (ignoring for a moment any `namespace` tags):

```html
<input type="hidden" name="fields[myFieldHandle][new:1][type]" value="text" />
```

Then define the form inputs for any additional entries that should be appended to the input.

```twig
{{ hiddenInput('fields[myFieldHandle][sortOrder][]', 'new:1') }}

{# Prefix the entry’s input names with `fields[myFieldHandle][blocks][new:1]` #}
{% namespace "fields[myFieldHandle][blocks][new:1]" %}
  {# This hidden `type` input will be expanded like the example above: #}
  {{ hiddenInput('type', 'text') }}

  {# Custom fields still need the `fields` prefix: #}
  <textarea name="fields[myTextFieldHandle]"></textarea>
{% endnamespace %}
```

If you want to make the new entry _optional_, you will need to give the user an opportunity to remove the inputs so they are not included in the request.

::: tip
The flexibility of Matrix fields often demands some client-side JavaScript—appending form fragments for different entry types, generating temporary IDs, rearranging entries and updating sort order, etc. are all difficult problems to solve with plain HTML. Craft’s UI relies on a host of control panel-specific scripts and markup—and therefore is generally not usable in the front-end.

However: as long as the data you ultimately POST to Craft conforms to the schema above, it will work! If you have a preferred view library like Vue or React, you may be better prepared than you think—your task then shifts from dealing with manipulating DOM elements to transforming your components’ state into a [`FormData` object](https://developer.mozilla.org/en-US/docs/Web/API/FormData) with the right parameter names and values.
:::

#### Validation Errors

Should you encounter [validation](../../development/forms.md#models-and-validation) issues within a Matrix field, Craft will set a [flash](../../development/forms.md#flashes) and add errors to the main element (under the Matrix field’s handle)—as well as on each nested entry with problems.

In these cases, it’s important to handle the nested entry data appropriately—the entries will be available directly on the main element as an array, and do not need to be fetched. In fact, trying to re-load the entries from the database would mean you are working with the last-persisted state, rather than the entries populated from the most recent request!

Instead, we’ll try three values:

1. Attempt to use the field value as an element query (load the entries fresh, assuming there are no pending changes hanging in-memory);
1. Accept the value, verbatim (assuming Craft has left the in-memory entries attached, and they _don’t_ need to be queried);
1. Default to an empty array (this ensures whatever uses the `nestedEntries` variable later on can safely assume it’s an array);

```twig
{% set nestedEntries = entry.myFieldHandle.all() ?? entry.myFieldHandle ?? [] %}
```

::: tip
The [null-coalescing operator](https://twig.symfony.com/doc/3.x/templates.html#other-operators) swallows errors that occur when attempting to access variables, properties, or methods that don’t exist.
:::

Temporary identifiers on new entries do _not_ need to stay the same between requests (say, if you created two entries but changed their order, then submitted and hit a validation error); you may output “new” entries in the order Craft has provided them, re-keying those entries:

```twig
{% for nestedEntry in nestedEntries %}
  {% set id = nestedEntry.id ?? "new:#{loop.index}" %}

  {{ hiddenInput('sortOrder[]', id) }}
  {{ hiddenInput("entries[#{id}][type]", nestedEntry.type.handle) }}

  {# ... #}
{% endfor %}
```
