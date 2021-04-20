# Categories Fields

Categories fields allow you to relate [categories](categories.md) to other elements.

## Settings

Categories fields have the following settings:

- **Source** – Which category group (or other category index source) the field should be able to relate categories from.
- **Branch Limit** – The maximum number of category tree branches that can be related with the field at once. (Default is no limit.)

  For example, if you have the following category group:

  ```
  Food
  ├── Fruit
  │   ├── Apples
  │   ├── Bananas
  │   └── Oranges
  └── Vegetables
      ├── Brussels sprouts
      ├── Carrots
      └── Celery
  ```

  …and Branch Limit was set to `1`, you would be able to relate Fruit, Vegetables, or one of their descendants, but no more than that.

- **Selection Label** – The label that should be used on the field’s selection button.

### Multi-Site Settings

On multi-site installs, the following settings will also be available (under “Advanced”):

- **Relate categories from a specific site?** – Whether to only allow relations to categories from a specific site.

  If enabled, a new setting will appear where you can choose which site.

  If disabled, related categories will always be pulled from the current site.

- **Manage relations on a per-site basis** – Whether each site should get its own set of related categories.

## The Field

Categories fields list all the currently-related categories with a button to select new ones.

Choosing **Add a category** will bring up a modal window where you can find and select additional categories. You can create new categories from this modal as well, by choosing **New category**.

When you select a nested category, all the ancestors leading up to that category will also automatically be related. Likewise, when you remove a category from within the main field input, any of its descendants will also be removed.

### Inline Category Editing

When you double-click on a related category, a HUD will appear where you can edit the category’s title and custom fields.

## Development

### Querying Elements with Categories Fields

When [querying for elements](element-queries.md) that have a Categories field, you can filter the results based on the Categories field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related categories.
| `':notempty:'` | that have at least one related category.
| `100` | that are related to the category with an ID of 100.
| `[100, 200]` | that are related to a category with an ID of 100 or 200.
| `[':empty:', 100, 200]` | with no related categories, or are related to a category with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the categories with IDs of 100 and 200.
| a [Category](craft3:craft\elements\Category) object | that are related to the category.
| a [CategoryQuery](craft3:craft\elements\db\CategoryQuery) object | that are related to any of the resulting categories.

::: code
```twig
{# Fetch entries with a related category #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```
```php
// Fetch entries with a related category
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### Working with Categories Field Data

If you have an element with a Categories field in your template, you can access its related categories using your Categories field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle; 
```
:::

That will give you a [category query](categories.md#querying-categories), prepped to output all the related categories for the given field.

To loop through all the related categories as a flat list, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedCategories = entry.myFieldHandle.all() %}
{% if relatedCategories|length %}
    <ul>
        {% for rel in relatedCategories %}
            <li><a href="{{ rel.url }}">{{ rel.title }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```
```php
$relatedCategories = $entry->myFieldHandle->all();
if (count($relatedCategories)) {
    foreach ($relatedCategories as $rel) {
        // do something with $rel->url and $rel->title
    }
}
```
:::

Or you can show them as a hierarchical list with the [nav](dev/tags.md#nav) tag:

```twig
{% set relatedCategories = entry.myFieldHandle.all() %}
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

If you only want the first related category, call [one()](craft3:craft\db\Query::one()) instead and make sure it returned something:

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
    // do something with $rel->url and $rel->title
}
```
:::

If you need to check for related categories without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related categories!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // do something with related categories
}
```
:::

You can set [parameters](categories.md#parameters) on the category query as well. For example, to only fetch the “leaves” (categories without any children), set the [leaves](categories.md#leaves) param:

::: code
```twig
{% set relatedCategories = clone(entry.myFieldHandle)
    .leaves()
    .all() %}
```
```php
$myField = clone $entry->myFieldHandle;
$relatedAssets = $myField
    ->leaves()
    ->all();
```
:::

::: tip
It’s always a good idea to clone the category query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Categories Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Categories field, you will need to submit your field value as a list of category IDs.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible category options #}
{% set possibleCategories = craft.categories()
    .group('food')
    .all() %}

{# Get the currently related category IDs #}
{% set relatedCategoryIds = entry is defined
    ? entry.myFieldHandle.ids()
    : [] %}

<ul>
    {% nav possibleCategory in possibleCategories %}
        <li>
            <label>
                {{ input(
                    'checkbox',
                    'fields[myFieldHandle][]',
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
Note that it’s not possible to customize the order that categories will be related in, and if a nested category is related, so will each of its ancestors.
:::

## See Also

* [Category Queries](categories.md#querying-categories)
* <craft3:craft\elements\Category>
* [Relations](relations.md)
