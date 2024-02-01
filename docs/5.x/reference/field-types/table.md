# Table Fields

Table fields give you a customizable table, where you can manage data or content in compact rows.

## Settings

Table fields have the following settings:

**Table Columns**
:   Define the columns that will be available to your Table field. Each column has the following properties:

    - **Column Heading** — The name that will appear in the head of the table.
    - **Handle** — How you’ll refer to this column from your templates.
    - **Width** — The width for this column specified in either pixels or a percentage.
    - **Type** — The field or content type for the column. Choose from: Checkbox, Color, Date, Dropdown, Email, Lightswitch, Multi-line text, Number, Single-line text, Time, or URL. An additional Row Heading column type provides a non-editable area for labels, and is most useful in combination with the **Static Rows** option.

      ::: tip
      Not all field types are available as table columns due to UI and storage constraints. If you need the full array of custom field types, consider using a [Matrix field](matrix-fields.md) instead.
      :::

**Default Values**
:   Define the default row and column values for new instances of the field.

**Static Rows**
:   Choose whether rows can be managed by the author, or if the table should include only the rows defined in **Default Values**. Use the **Row Heading** column type to create read-only labels for each row, and clear all **Column Heading** fields to remove the table’s header.

**Min Rows**
:   The _minimum_ number of rows allowed.

**Max Rows**
:   The _maximum_ number of rows allowed.

## The Field

Table fields’ appearance and available controls depends on their configuration and whether you are working on a new or existing element.

- **New elements** show the rows as defined by the **Default Values** setting.
- **Existing elements** will display an empty table. (An “existing element” is one that was created prior to the field being added to its field layout.)

Fields that use the **Static Rows** setting will _always_ display the rows defined in the field’s settings, but the values of each cell will still be determined by the stored data—or the defaults, for fresh elements. **Row Heading** columns are never editable.

::: tip
The appearance of a table field in an element editor will be identical to the table shown in the **Default Values** setting.
:::

## Development

### Querying Elements with Table Fields

Due to the way Table field data is stored (a blob of JSON), [element queries](element-queries.md) can be challenging to construct. Internally, Craft stores each row with keys that are stable across changes to [project config](project-config.md), and won’t agree with the handles you’ve defined in 

::: tip
If you anticipate needing to query by sub-fields, consider using a [Matrix](matrix-fields.md) field, instead. As a native element type, matrix blocks support the full array of element query params that 
:::

### Working with Table Field Data

Table fields return an array of rows, whether you access the data via its field handle on an element or by requesting it via GraphQL.

Each row is an array of values indexed by their column handles. For example, a field that catalogued whiskeys might have columns for:

- **Name**, Single-line text, `whiskey`;
- **Description**, Single-line text, `description`;
- **Proof**, Number, `proof`;

::: code
```twig
<h3>Whiskeys</h3>
<ul>
  {% for row in entry.myFieldHandle %}
    <li>{{ row.whiskey }}: {{ row.description }} ({{ row.proof }} proof, {{ row.proof / 2 }}%)</li>
  {% endfor %}
</ul>
```
```php
foreach ($entry->myFieldHandle as $row) {
    // Each row is a plain array, not an object:
    $row['whiskey'];
    $row['description'];
    $row['proof'];
}
```
```graphql
{
  # (...) query for relevant entry
  myFieldHandle {
    whiskey
    description
    proof
  }
}
```
:::

::: tip
In each example above, the custom column handle can also be accessed by a key named `'col*'`, where `*` is the order in which it was saved. Example:

- `whiskey` → `col1`
- `description` → `col2`
- `proof` → `col3`

This is also how Craft stores the data, under the hood—which makes it possible to rename and rearrange columns without misplacing their values!
:::

Table field data evaluates cleanly as a boolean, but you can explicitly check whether one [has any data](../../development/twig.md.md#emptiness) by using the [`is empty` test](https://twig.symfony.com/doc/3.x/tests/empty.html) or the [`length` filter](https://twig.symfony.com/doc/3.x/filters/length.html):

```twig
{# Basic conditional: #}
{% if entry.myFieldHandle %}
  {# An array with any values is “truthy!” #}
{% endif %}

{# Emptiness test: #}
{% if entry.myFieldHandle is not empty %}
  {# Note the `not`—we only want to render this block if there *is* data! #}
{% endif %}

{# Length check: #}
{% if entry.myFieldHandle|length %}
  {# At least one row is present! #}
{% endif %}

{# Test for a specific number of rows: #}
{% if entry.myFieldHandle|length >= 3 %}
  {# Three or more rows have been added to this table field. #}
{% endif %}
```

Other functions, filters, and tags that operate on arrays can also be used on table field data!

### Mutating Table Data

You can mutate table data by providing an array of rows, each representing its column’s data with a `'col*'` key:

```graphql
mutation saveEntry(
  $title: String,
  $slug: String,
  $authorId: ID,
  $tableRows: [myFieldHandle_TableRowInput],
) {
  save_cocktails_cocktails_Entry(
    title: $title,
    slug: $slug,
    authorId: $authorId,
    myFieldHandle: $tableRows
  ) {
    title
    slug
    authorId
    dateCreated @formatDateTime (format: "Y-m-d")
    myFieldHandle {
      whiskey
      description
      proof
    }
  }
}

# query variables:
{
  "title": "Whiskies",
  "slug": "whiskies",
  "authorId": 1,
  "tableRows": [
    {
      "col1": "High West Double Rye",
      "col2": "Blend of straight and rye whiskeys.",
      "col3": 92
    },
    {
      "col1": "Blanton’s Single Barrel",
      "col2": "Has been called liquid gold.",
      "col3": 92
    },
  ]
}
```

Check your field’s definition in the database (or inspect the field in an entry form) to find the appropriate `col*` names.
