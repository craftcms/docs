# Table Fields

Table fields give you a customizable table, where you can create multiple rows of content.

## Settings

Table fields have the following settings:

- **Table Columns** – Define the columns that will be available to your Table field.

    Each column has the following properties:

    - *Column Heading* – The name that will appear in the head of the table
    - *Handle* – How you’ll refer to this column from your templates
    - *Width* – The width for this column specified in either pixels or a percentage
    - *Type* – The type of content allowed in the column. Choose from Single-line text, Multi-line text, Number, Checkbox, Dropdown, Date, Time, Lightswitch, and Color.

- **Default Values** – Define the default row and column values for new instances of the field.

## The Field

Table fields will show the table as configured based on the field settings. You can reorder, delete, and add new rows, and modify their values.

## Templating

Calling a Table field in your templates and GraphQL queries will return an array of the rows. Each row is a sub-array which holds each of the columns’ values for that row.

::: code
```twig
{% if entry.myFieldHandle|length %}
<h3>Whiskeys</h3>
<ul>
  {% for row in entry.myFieldHandle %}
    <li>{{ row.whiskey }} - {{ row.description }} - {{ row.proof }}</li>
  {% endfor %}
</ul>
{% endif %}
```
```php
if (count($entry->myFieldHandle)) {
    // Whiskeys:
    foreach ($entry->myFieldHandle as $row) {
        // $row['whiskey']
        // $row['description']
        // $row['proof']
    }
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
In each example above, the custom column handle could also be accessed by a key named `'col*'`, where `*` is the order in which it was saved. Example:

- `whiskey` → `col1`
- `description` → `col2`
- `proof` → `col3`
:::

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
  "title": "Gin and Tonic",
  "slug": "gin-tonic",
  "authorId": 1,
  "myFieldHandle": [
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