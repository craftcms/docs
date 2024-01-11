---
containsGeneratedContent: yes
---

# Matrix Blocks

If you’ve ever worked with a hairball of content and markup managed in an increasingly-fragile WYSIWYG field, you’re probably going to like Matrix blocks.

Matrix blocks are groupings of fields an editor can use to build and rearrange content. They can be critical in supporting flexible, customizable content for an editor that’s balanced with the kind of discrete, well-modeled content a developer wants to work with.

## Querying Matrix Blocks

You can fetch Matrix blocks in your templates or PHP code using **Matrix block queries**.

::: code
```twig
{# Create a new Matrix block query #}
{% set myMatrixBlockQuery = craft.matrixBlocks() %}
```
```php
// Create a new Matrix block query
$myMatrixBlockQuery = \craft\elements\MatrixBlock::find();
```
:::

Once you’ve created a Matrix block query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [MatrixBlock](craft4:craft\elements\MatrixBlock) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display content from all the Matrix blocks of an element by doing the following:

1. Create a Matrix block query with `craft.matrixBlocks()`.
2. Set the [owner](#owner), [fieldId](#fieldid), and [type](#type) parameters on it.
3. Fetch the Matrix blocks with `.all()`.
4. Loop through the Matrix blocks using a [for](https://twig.symfony.com/doc/3.x/tags/for.html) tag to output the contents.

```twig
{# Create a Matrix block query with the 'owner', 'fieldId', and 'type' parameters #}
{% set myMatrixBlockQuery = craft.matrixBlocks()
  .owner(myEntry)
  .fieldId(10)
  .type('text') %}

{# Fetch the Matrix blocks #}
{% set matrixBlocks = myMatrixBlockQuery.all() %}

{# Display their contents #}
{% for block in matrixBlocks %}
  <p>{{ block.text }}</p>
{% endfor %}
```

::: warning
In order for the returned Matrix block(s) to be populated with their custom field content, you will need to either set the [fieldId](#fieldid) or [id](#id) parameter.
:::

### Parameters

Matrix block queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/4.x/matrix-blocks.md)!!!
