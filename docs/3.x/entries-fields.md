# Entries Fields

Entries fields allow you to relate [entries](entries.md) to other elements.

## Settings

Entries fields have the following settings:

- **Sources** – Which sections (or other entry index sources) the field should be able to relate entries from.
- **Limit** – The maximum number of entries that can be related with the field at once. (Default is no limit.)
- **Selection Label** – The label that should be used on the field’s selection button.

### Multi-Site Settings

On multi-site installs, the following settings will also be available (under “Advanced”):

- **Relate entries from a specific site?** – Whether to only allow relations to entries from a specific site.

  If enabled, a new setting will appear where you can choose which site.

  If disabled, related entries will always be pulled from the current site.

- **Manage relations on a per-site basis** – Whether each site should get its own set of related entries.

## The Field

Entries fields list all of the currently-related entries, with a button to select new ones.

Clicking the “Add an entry” button will bring up a modal window where you can find and select additional entries. You can create new entries from this modal as well, by clicking the “New entry” button.

### Inline Entry Editing

When you double-click on a related entry, a HUD will appear where you can edit the entry’s title and custom fields.

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
| an [Entry](craft3:craft\elements\Entry) object | that are related to the entry.
| an [EntryQuery](craft3:craft\elements\db\EntryQuery) object | that are related to any of the resulting entries.

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

To loop through all the related entries, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

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

If you only want the first related entry, call [one()](craft3:craft\db\Query::one()) instead, and then make sure it returned something:

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

If you’d like to check for related entries without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

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

You can set [parameters](entries.md#parameters) on the entry query as well. For example, to only fetch entries in the `news` section, set the [section](entries.md#section) param:

::: code
```twig
{% set relatedEntries = clone(entry.myFieldHandle)
    .section('news')
    .all() %}
```
```php
$relatedEntries = (clone $entry->myFieldHandle)
    ->section('news')
    ->all();
```
:::

::: tip
It’s always a good idea to clone the entry query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Entries Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain an Entries field, you will need to submit your field value as a list of entry IDs, in the order you want them to be related.

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

* [Entry Queries](entries.md#querying-entries)
* <craft3:craft\elements\Entry>
* [Relations](relations.md)
