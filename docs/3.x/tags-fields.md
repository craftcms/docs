# Tags Fields

Tags fields allow you relate [tags](tags.md) to other elements.

## Settings

Tags fields have the following settings:

- **Source** – Which tag group the field should be able to relate tags from.
- **Selection Label** – The label that should be used on the field’s tag search input.

### Multi-Site Settings

On multi-site installs, the following settings will also be available (under “Advanced”):

- **Relate tags from a specific site?** – Whether to only allow relations to tags from a specific site.

  If enabled, a new setting will appear where you can choose which site.

  If disabled, related tags will always be pulled from the current site.

- **Manage relations on a per-site basis** – Whether each site should get its own set of related tags.

## The Field

Tags fields list all the currently-related tags with a text input to add new ones.

As you type into the text input, the Tags field will search through the existing tags that belong to the field’s tag group (per its Source setting), and suggest tags in a menu below the text input. If an exact match is not found, the first option in the menu will create a new tag named after the input value.

::: tip
By default you won’t be able to create multiple tags that are too similar in name. You can change that behavior by enabling the <config3:allowSimilarTags> config setting.
:::

### Inline Tag Editing

When you double-click on a related tag, a HUD will appear where you can edit the tag’s title and custom fields.

## Development

### Querying Elements with Tags Fields

When [querying for elements](element-queries.md) that have a Tags field, you can filter the results based on the Tags field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related tags.
| `':notempty:'` | that have at least one related tag.
| `100` | that are related to the tag with an ID of 100.
| `[100, 200]` | that are related to a tag with an ID of 100 or 200.
| `[':empty:', 100, 200]` | with no related tags, or related to a tag with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the tags with IDs of 100 and 200.
| an [Tag](craft3:craft\elements\Tag) object | that are related to the tag.
| an [TagQuery](craft3:craft\elements\db\TagQuery) object | that are related to any of the resulting tags.

::: code
```twig
{# Fetch entries with a related tag #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```
```php
// Fetch entries with a related tag
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### Working with Tags Field Data

If you have an element with a Tags field in your template, you can access its related tags using your Tags field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you a [tag query](tags.md#querying-tags), prepped to output all the related tags for the given field.

To loop through all the related tags, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedTags = entry.myFieldHandle.all() %}
{% if relatedTags|length %}
    <ul>
        {% for rel in relatedTags %}
            <li><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```
```php
$relatedTags = $entry->myFieldHandle->all();
if (count($relatedTags)) {
    foreach ($relatedTags as $rel) {
        // \craft\helpers\UrlHelper::url('tags/' . $rel->slug)
        // $rel->title
    }
}
{% endif %}
```
:::

If you only want the first related tag, call [one()](craft3:craft\db\Query::one()) and make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // \craft\helpers\UrlHelper::url('tags' . $rel->slug)
    // $rel->title
}
```
:::

If you need to check for any related tags without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related tags!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are related tags!
}
```
:::

You can set [parameters](tags.md#parameters) on the tag query as well.

::: code
```twig
{% set relatedTags = clone(entry.myFieldHandle)
    .group('blogEntryTags')
    .all() %}
```
```php
$relatedTags = (clone $entry->myFieldHandle)
    ->group('blogEntryTags')
    ->all();
```
:::

::: tip
It’s always a good idea to clone the tag query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Tags Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Tags field, you will need to submit your field value as a list of tag IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible tag options #}
{% set possibleTags = craft.entries()
    .group('blogEntryTags')
    .orderBy('title ASC')
    .all() %}

{# Get the currently related tag IDs #}
{% set relatedTagIds = entry is defined
    ? entry.myFieldHandle.ids()
    : [] %}

<ul>
    {% for possibleTag in possibleTags %}
        <li>
            <label>
                {{ input(
                    'checkbox',
                    'fields[myFieldHandle][]',
                    possibleTag.id,
                    { checked: possibleTag.id in relatedTagIds }
                ) }}
                {{ possibleTag.title }}
            </label>
        </li>
    {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related tags.

## See Also

* [Tag Queries](tags.md#querying-tags)
* <craft3:craft\elements\Tag>
* [Relations](relations.md)
