---
description: Create user-managed, hierarchical taxonomies for your content.
containsGeneratedContent: yes
related:
  - uri: ../../system/elements.md
    label: Introduction to Elements
  - uri: ../field-types/categories.md
    label: Categories Fields
---

# Categories

Craft supports user-managed, hierarchical taxonomies for content via **categories**.

<!-- more -->

Categories are one of Craft’s built-in [element types](elements.md), and are represented throughout the application as instances of <craft5:craft\elements\Category>.

<Block label="Migrating to Structures">

With the release of Craft 4.4, we began consolidating features of [other element types](elements.md) into [entries](entries.md).

As part of that process, we introduced a [console command](../cli.md#entrify-categories) that can automate the conversion of categories to [structure sections](entries.md#structures):

```bash
php craft entrify/categories myCategoryGroupHandle
```

Read more about this [transition](https://craftcms.com/blog/entrification) on our blog.

</Block>

## Category Groups

Every category belongs to a _category group_, which defines…

- …a name;
- …a handle (used when referencing the group in queries and templates);
- …the maximum number of levels categories can be nested, within the group;
- …the format of category URIs;
- …which template should be rendered when a category’s URL is accessed;
- …which [fields](fields.md) categories in the group should have;

To create a new category group, go to **Settings** → **Categories** and click **New Category Group**.

## Category Field Layout

Each category group has its own _field layout_, which allows you to customize the data that’s associated with each category in the group. By default, every category will have a **Title** field (the category name). Any available field type can be added to a category group’s field layout.

<See path="../../system/fields.md" />

## Creating and Editing Categories

When you’ve defined at least one category group, **Categories** will appear in the control panel’s primary navigation. Clicking it will take you to the category index. From there, you can choose a category group <Poi label="1" target="categoryIndex" id="groups" /> from the sidebar, and add/reorder/delete categories within it:

<BrowserShot
    url="https://my-craft-project.ddev.site/admin/categories/flavors"
    :link="false"
    caption="A category index representing coffee flavor profiles."
    id="categoryIndex"
    :poi="{
        groups: [30, 20.6],
        structure: [76.2, 9],
        statusIcon: [45, 64],
    }">
<img src="../../images/categories-category-index.png" alt="Screenshot of the categories index, with “Categories” active in the main navigation, the “Flavors” category group selected, and a listing of category names in a nested hierarchy">
</BrowserShot>

Select the “Structure” <Poi label="2" target="categoryIndex" id="structure" /> sort option to view and manipulate the categories’ [hierarchy](./elements.md#structures). Double-click any element <Poi label="3" target="categoryIndex" id="statusIcon" /> to open a [slideout](./control-panel.md#slideouts).

You can also click a category’s title to visit its edit page just like an entry.

When you create a category, you have the following options:

- Fill out the category fields (if you didn’t define any, the only field available will be **Title**)
- Edit the slug (it’s automatically populated based on the title).
- Choose a Parent category. The new category will have a hierarchical relationship with its parent. This is helpful for creating taxonomies with multiple levels. You also have the option of creating a new category while assigning the Parent.

::: tip
You can only nest categories up to the level specified in the **Max Level** field Category Group settings. If it’s empty, the nesting level is unlimited.
:::

## Assigning Categories

To assign categories to things (entries, assets, users, etc.), you must first create a [Categories field](categories-fields.md).

Each Categories field is connected to a single category group. Whatever you attach the field to will store [relations](relations.md) to categories selected from that group.

## Querying Categories

You can fetch categories in your templates or PHP code using **category queries**.

::: code
```twig
{# Create a new category query #}
{% set myCategoryQuery = craft.categories() %}
```
```php
// Create a new category query
$myCategoryQuery = \craft\elements\Category::find();
```
:::

Once you’ve created a category query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](../../development/element-queries.md#executing-element-queries) by calling `.all()`. An array of [Category](craft5:craft\elements\Category) objects will be returned.

<See path="../../development/element-queries" description="Learn more about element queries." />

### Example

We can display a navigation for all the categories in a category group called “Topics” by doing the following:

1. Create a category query with `craft.categories()`.
2. Set the [group](#group) parameter on it.
3. Fetch the categories with `.all()`.
4. Loop through the categories using a [nav](../twig/tags.md#nav) tag to create the navigation HTML.

```twig
{# Create a category query with the 'group' parameter #}
{% set myCategoryQuery = craft.categories()
  .group('topics') %}

{# Fetch the categories #}
{% set categories = myCategoryQuery.all() %}

{# Display the navigation #}
<ul>
  {% nav category in categories %}
    <li>
      <a href="{{ category.url }}">{{ category.title }}</a>
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
To maintain the exact order you see in the control panel, add `orderBy('lft ASC')` to your query:
```twig
{% set myCategoryQuery = craft.categories()
  .group('topics')
  .orderBy('lft ASC') %}
```
:::

### Elements Related to a Category

When you’ve attached a [categories field](./categories-fields.md) to another type of element, you can query for those elements when you have a reference to a category.

For example, if we were building a blog with dedicated “Topic” (category) pages, we might build a query like this to look up posts:

```twig
{% set posts = craft.entries()
  .relatedTo({
    targetElement: category,
    field: 'topics',
  })
  .all() %}
```

<See path="../../system/relations.md" description="Read about querying with relational fields." />

### Parameters

Category queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/5.x/categories.md)!!!
