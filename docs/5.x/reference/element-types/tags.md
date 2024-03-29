---
description: Define flat “folksonomies” to organize content, as it grows.
containsGeneratedContent: yes
related:
  - uri: ../../system/elements.md
    label: Introduction to Elements
  - uri: ../reference/field-types/tags.md
    label: Tags Fields
---

# Tags

You can create folksonomies for your [entries](entries.md), [users](users.md), and [assets](assets.md) using Tags. Tags are another type of [element](./elements.md).

<Block label="Migrating to Channels">

With the release of Craft 4.4, we began consolidating features of [other element types](elements.md) into [entries](entries.md).

::: warning
A comparable [tags field](tags-fields.md) UI has not yet been introduced for entries. If you or your clients value this authoring experience, it is safe to continue using tags!
:::

As part of that process, we introduced a [console command](../cli.md#entrify-categories) that can automate the conversion of tags to [channel sections](entries.md#channels):

```bash
php craft entrify/tags myTagGroupHandle
```

Read more about this [transition](https://craftcms.com/blog/entrification) on our blog.

</Block>

## Tag Groups

Before you can create tags, you must create Tag Groups to contain them.

To create a new tag group, go to **Settings** → **Tags** and click **New Tag Group**.

Each tag group holds a unique set of tags, and lets you define a custom set of [fields](fields.md) that should be available to tags within the group. However, you don’t need to assign any fields to the Tag Group Field Layout in order to use the group.

::: tip
There is no centralized editing view for tags (like there is for other element types), so fields you attach will only be editable via a [slideout](./control-panel.md#slideouts), after a tag has been created and assigned to a tag field.
:::

## Assigning Tags

To assign tags to things (like Entries), you must create a [Tags field](tags-fields.md) and add it to a Field Layout.

Each Tags field is connected to a single tag group. Whatever you attach the field to (entries, assets, users, etc.) will be able to create new tags and create [relations](relations.md) to any of the tags within that group.

## Querying Tags

You can fetch tags in your templates or PHP code using a tag query.

::: code
```twig
{# Create a new tag query #}
{% set myTagQuery = craft.tags() %}
```
```php
// Create a new tag query
$myTagQuery = \craft\elements\Tag::find();
```
:::

Once you’ve created a tag query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Tag](craft5:craft\elements\Tag) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display a list of the tags in a “Blog Tags” tag group by doing the following:

1. Create a tag query with `craft.tags()`.
2. Set the [group](#group) parameter on it.
3. Fetch the tags with `.all()`.
4. Loop through the tags using a [for](https://twig.symfony.com/doc/3.x/tags/for.html) tag to create the list HTML.

```twig
{# Create a tag query with the 'group' parameter #}
{% set myTagQuery = craft.tags()
  .group('blogTags') %}

{# Fetch the tags #}
{% set tags = myTagQuery.all() %}

{# Display the tag list #}
<ul>
  {% for tag in tags %}
    <li><a href="{{ url('blog/tags/'~tag.id) }}">{{ tag.title }}</a></li>
  {% endfor %}
</ul>
```

### Parameters

Tag queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/5.x/tags.md)!!!
