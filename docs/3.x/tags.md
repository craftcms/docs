---
containsGeneratedContent: yes
---

# Tags

You can create folksonomies for your [entries](entries.md), [users](users.md), and [assets](assets.md) using Tags.

## Tag Groups

Before you can create tags, you must create Tag Groups to contain them.

To create a new tag group, go to Settings → Tags and click New Tag Group.

Each tag group holds a unique set of tags, and lets you define a custom set of [fields](fields.md) that should be available to tags within the group. However, you don’t need to assign any fields to the Tag Group Field Layout in order to use the group.

## Assigning Tags

To assign tags to things (like Entries), you must create a [Tags field](tags-fields.md) and add it to a Field Layout.

Each Tags field is connected to a single tag group. Whatever you attach the field to (entries, assets, users, etc.) will be able to create new tags and create [relations](relations.md) to any of the tags within that group.

## Querying Tags

You can fetch tags in your templates or PHP code using **tag queries**.

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

Once you’ve created a tag query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Tag](craft3:craft\elements\Tag) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display a list of the tags in a “Blog Tags” tag group by doing the following:

1. Create a tag query with `craft.tags()`.
2. Set the [group](#group) parameter on it.
3. Fetch the tags with `.all()`.
4. Loop through the tags using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to create the list HTML.

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
!!!include(docs/.artifacts/cms/3.x/tags.md)!!!
