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

Tags fields list all of the currently-related tags, with a text input to add new ones.

As you type into the text input, the Tags field will search through the existing tags that belong to the field’s tag group (per its Source setting), and suggest tags in a menu below the text input. If an exact match is not found, the first option in the menu will create a new tag named after the input value.

::: tip
By default you won’t be able to create multiple tags that are too similar in name. You can change that behavior by enabling the <config3:allowSimilarTags> config setting.
:::

### Inline Tag Editing

When you double-click on a related tag, a HUD will appear where you can edit the tag’s title and custom fields.

## Templating

### Querying Elements with Tags Fields

When [querying for elements](element-queries.md) that have a Tags field, you can filter the results based on the Tags field data using a query param named after your field’s handle.

Possible values include:

| Value                                                      | Fetches elements…                                     |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| `':empty:'`                                                | that don’t have any related tags.                     |
| `':notempty:'`                                             | that have at least one related tag.                   |
| `100`                                                      | that are related to the tag with an ID of 100.        |
| `[100, 200]`                                               | that are related to a tag with an ID of 100 or 200.   |
| `['and', 100, 200]`                                        | that are related to the tags with IDs of 100 and 200. |
| an [Tag](craft3:craft\elements\Tag) object               | that are related to the tag.                          |
| an [TagQuery](craft3:craft\elements\db\TagQuery) object | that are related to any of the resulting tags.        |

```twig
{# Fetch entries with a related tag #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### Working with Tags Field Data

If you have an element with an Tags field in your template, you can access its related tags using your Tags field’s handle:

```twig
{% set query = entry.myFieldHandle %}
```

That will give you a [tag query](tags.md#querying-tags), prepped to output all of the related tags for the given field.

To loop through all of the related tags, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

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

If you only want the first related tag, call [one()](craft3:craft\db\Query::one()) instead, and then make sure it returned something:

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ url('tags/'~rel.slug) }}">{{ rel.title }}</a></p>
{% endif %}
```

If you just need to check if there are any related tags (but don’t need to fetch them), you can call [exists()](craft3:craft\db\Query::exists()):

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related tags!</p>
{% endif %}
```

You can set [parameters](tags.md#parameters) on the tag query as well.

```twig
{% set relatedTags = clone(entry.myFieldHandle)
    .group('blogEntryTags')
    .all() %}
```

::: tip
It’s always a good idea to clone the tag query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

## See Also

* [Tag Queries](tags.md#querying-tags)
* <craft3:craft\elements\Tag>
* [Relations](relations.md)
