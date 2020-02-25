# Matrix Fields

Matrix fields allow you to create multiple blocks of content within a single field.

## Settings

Matrix fields have the following settings:

* **Configuration** – This is where you configure which block types should be available to your Matrix field, and which sub-fields each of those block types should have.
* **Max Blocks** – The maximum number of blocks that can be created within the field. (Default is no limit.)

## The Field

On a fresh entry, Matrix fields will just show a group of buttons – one for each of the Block Types you created in the field’s settings.

When you click on one of those buttons, a new block will be created. The Block Type’s name will be shown in the block’s title bar, and each of the Block Type’s fields will be present within the body of the block.

You can add as many blocks to your Matrix field as you’d like (or at least as many as the field’s Max Blocks setting will allow).

Each block has a settings menu that reveals additional things you can do with the block.

If multiple blocks are selected, the Collapse/Expand, Disable/Enable, and Delete options will apply to all of the selected blocks.

You can collapse Matrix blocks by clicking the “Collapse” menu option, or by double-clicking on a block’s title bar. When a block is collapsed, its title bar will show a preview of its content, so you can still identify which block it is.

Blocks can also be reordered by dragging the “Move” icon at the end of the block’s title bar. If multiple blocks are selected, all of the selected blocks will be going along for the ride.

## Templating

### Querying Elements with Matrix Fields

When [querying for elements](dev/element-queries/README.md) that have a Matrix field, you can filter the results based on the Matrix field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any Matrix blocks.
| `':notempty:'` | that have at least one Matrix block.

```twig
{# Fetch entries with a Matrix block #}
{% set entries = craft.entries()
    .<FieldHandle>(':notempty:')
    .all() %}
```

### Working with Matrix Field Data

If you have an element with a Matrix field in your template, you can access its blocks using your Matrix field’s handle:

```twig
{% set query = entry.<FieldHandle> %}
```

That will give you a [Matrix block query](dev/element-queries/matrix-block-queries.md), prepped to output all of the enabled blocks for the given field.

To loop through all of the blocks, call [all()](api:craft\db\Query::all()) and then loop over the results:

```twig
{% set blocks = entry.<FieldHandle>.all() %}
{% if blocks|length %}
    <ul>
        {% for block in blocks %}
            <!-- ... -->
        {% endfor %}
    </ul>
{% endif %}
```

All of the code you put within the for-loop will be repeated for each Matrix block in the field. The current block will get set to that `block` variable we’ve defined, and it will be a <api:craft\elements\MatrixBlock> model.

Here’s an example of what the template might look like for a Matrix field with four block types (Heading, Text, Image, and Quote). We can determine the current block type’s handle by checking `block.type` (<api:craft\elements\MatrixBlock::getType()>).

```twig
{% for block in entry.<FieldHandle>.all() %}
    {% if block.type == "heading" %}
        <h3>{{ block.heading }}</h3>
    {% elseif block.type == "text" %}
        {{ block.text|markdown }}
    {% elseif block.type == "image" %}
        {% set image = block.image.one() %}
        {% if image %}
            <img src="{{ image.getUrl('thumb') }}" width="{{ image.getWidth('thumb') }}" height="{{ image.getHeight('thumb') }}" alt="{{ image.title }}">
        {% endif %}
    {% elseif block.type == "quote" %}
        <blockquote>
            <p>{{ block.quote }}</p>
            <cite>– {{ block.cite }}</cite>
        </blockquote>
    {% endif %}
{% endfor %}
```

::: tip
This code can be simplified using the [switch](dev/tags/switch.md) tag.
:::

If you only want the first block, call [one()](api:craft\db\Query::one()) instead of `all()`, and then make sure it returned something:

```twig
{% set block = entry.<FieldHandle>.one() %}
{% if block %}
    <!-- ... -->
{% endif %}
```

If you only want to know the total number of blocks, call [count()](api:craft\db\Query::count()).

```twig
{% set total = entry.<FieldHandle>.count() %}
<p>Total blocks: <strong>{{ total }}</strong></p>
```

If you just need to check if are blocks exist (but don’t need to fetch them), you can call [exists()](api:craft\db\Query::exists()):

```twig
{% if entry.<FieldHandle>.exists() %}
    <p>There are blocks!</p>
{% endif %}
```

You can set [parameters](dev/element-queries/matrix-block-queries.md#parameters) on the Matrix block query as well. For example, to only fetch blocks of type `text`, set the [type](dev/element-queries/matrix-block-queries.md#type) param:

```twig
{% set blocks = clone(entry.<FieldHandle>)
    .type('text')
    .all() %}
```

::: tip
It’s always a good idea to clone the Matrix query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

## See Also

* [Element Queries](dev/element-queries/README.md)
* <api:craft\elements\MatrixBlock>
