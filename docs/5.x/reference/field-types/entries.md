---
related:
  - uri: ../element-types/entries.md
    label: Entry Elements
  - uri: ../../system/relations.md
    label: Using Relationships
---

# Entries Fields

Entries fields allow you to relate [entries](entries.md) to other elements. It is one of Craft’s [relational](../../system/relations.md) custom fields.

::: tip
If you would like to manage a set of _nested_ entries within another element, consider using the [Matrix field](matrix.md).
:::

## Settings

Entries fields have the following settings:

- **Sources** — Which sections (or other entry index sources) the field should be able to relate entries from.
- **Selectable Entries Condition** — Rules that determine which entries should be available for selection.
- **Maintain Hierarchy** — When selecting from a _structure_ section, should the entries’ order and hierarchy be preserved?

  ::: tip
  This option is available only when the selected sources are all structures.
  :::

  When **enabled**, the following options become available:

  - **Branch Limit** — How many distinct “branches” of a structure can be selected?

  When **disabled**, these options are available:

  - **Min Relations** — The minimum number of entries that must be selected when the field is marked as “required” in a field layout. (Default is no minimum.)
  - **Max Relations** — The maximum number of entries that can be selected. (Default is no maximum.)

- **Selection Label** — The label that should be used on the field’s selection button.

### Advanced Settings

Additional settings are available under the **Advanced** toggle:

- **Allow self relations** — Whether the current entry (with this field) should be allowed to select itself as a relation.

### Multi-Site Settings

On multi-site installs, additional advanced settings will be available:

- **Relate entries from a specific site?** – Whether to only allow relations to entries from a specific site.

  If enabled, a new setting will appear where you can choose which site.

  If disabled, related entries will always be pulled from the current site.

- **Show the site menu** – Whether to display the site menu in entry selection modals. (The selected site isn’t stored, so this should only be enabled if some entries aren’t propagated to all sites.)

- **Manage relations on a per-site basis** – Whether each site should get its own set of related entries.

## The Field

Entries fields list all of the currently-related entries, with a button to select new ones.

Pressing **Add an entry** will open a modal window where you can find and select additional entries. (You also press **+ New entry** from this modal to create a new entry in a slideout panel.)

### Inline Entry Editing

When you double-click a related entry, a slideout will appear where you can edit the entry’s title and custom fields.

## Development

### Querying Elements with Entries Fields

When [querying for elements](element-queries.md) that have an Entries field, you can filter the results based on the Entries field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related entries.
| `':notempty:'` | that have at least one related entry.
| `100` | that are related to the entry with an ID of 100.
| `[100, 200]` | that are related to an entry with an ID of 100 or 200.
| `[':empty:', 100, 200]` | with no related entries, or related to an entry with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the entries with IDs of 100 and 200.
| an [Entry](craft5:craft\elements\Entry) object | that are related to the entry.
| an [EntryQuery](craft5:craft\elements\db\EntryQuery) object | that are related to any of the resulting entries.

::: code
```twig
{# Fetch artwork entries that are related to `artist` #}
{% set works = craft.entries()
  .section('artwork')
  .myFieldHandle(artist)
  .all() %}
```
```php
// Fetch artwork entries that are related to `$artist`
$works = \craft\elements\Entry::find()
    ->section('artwork')
    ->myFieldHandle($artist)
    ->all();
```
:::

### Working with Entries Field Data

If you have an element with an Entries field in your template, you can access its related entries using your Entries field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you an [entry query](entries.md#querying-entries), prepped to output all of the related entries for the given field.

To loop through all the related entries, call [all()](craft5:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedEntries = entry.myFieldHandle.all() %}
{% if relatedEntries|length %}
  <ul>
    {% for rel in relatedEntries %}
      <li><a href="{{ rel.url }}">{{ rel.title }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedEntries = $entry->myFieldHandle->all();
if (count($relatedEntries)) {
    foreach ($relatedEntries as $rel) {
        // $rel->url, $rel->title
    }
}
```
:::

If you only want the first related entry, call [one()](craft5:craft\db\Query::one()) instead, and then make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
  <p><a href="{{ rel.url }}">{{ rel.title }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // $rel->url, $rel->title
}
```
:::

If you’d like to check for related entries without fetching them, you can call [exists()](craft5:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>There are related entries!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are related entries!
}
```
:::

You can set [parameters](entries.md#parameters) on the entry query as well. For example, to narrow the related entries to those in a `news` section, set the [section](entries.md#section) param:

::: code
```twig
{% set relatedEntries = entry.myFieldHandle
  .section('news')
  .all() %}
```
```php
$relatedEntries = $entry->myFieldHandle
    ->section('news')
    ->all();
```
:::

::: tip
<Todo notes="Extract this into a snippet." />

In Craft 3, we recommended cloning these query objects using the [`clone` keyword](https://www.php.net/manual/en/language.oop5.cloning.php) or [`clone()`](./dev/functions.md#clone) Twig function before applying params. **This is no longer required in Craft 4**, because a new copy of the query is returned each time you access the field property.
:::

### Saving Entries Fields

If you have front-end form for saving an element, that needs to contain an Entries field, you will need to submit your field value as a list of entry IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible entry options #}
{% set possibleEntries = craft.entries()
  .section('galleries')
  .orderBy('title ASC')
  .all() %}

{# Get the currently related entry IDs #}
{% set relatedEntryIds = entry is defined
  ? entry.myFieldHandle.ids()
  : [] %}

<ul>
  {% for possibleEntry in possibleEntries %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myFieldHandle][]',
          possibleEntry.id,
          { checked: possibleEntry.id in relatedEntryIds }
        ) }}
        {{ possibleEntry.title }}
      </label>
    </li>
  {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related entries.

## See Also

- [Entry Queries](entries.md#querying-entries)
- <craft5:craft\elements\Entry>
- [Relations](relations.md)
