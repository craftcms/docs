# Categories

You can create taxonomies for your [entries](entries.md), [users](users.md), and [assets](assets.md) using Categories.

## Category Groups

Before you can create categories, you must create Category Groups to contain them. Each Category Group lets you define the following:

* Category Group name
* Category Group handle (how you'll refer to the Category Group in your templates)
* Maximum number of levels you can nest categories in the group
* The format of the category URI
* Which template should load if a category’s URL is accessed
* Which [fields](fields.md) categories in the group should have

To create a new category group, go to Settings → Categories and click the “New Category Group” button.

After you create at least one category group, you will be able to create categories for that group.

## Category Field Layout

Each Category Groups can have its own Field Layout, which allows you to customize the data that is associated with each category in the group. By default, every category will have a Title field (the category name).

You can also add additional fields using all of the available field types in Craft. If a field doesn't yet exist, you must first create it via Settings → Fields. The new field will then be available to assign to the Field Layout of your Category Group.

## Creating and Editing Categories

If you have at least one category group, there will be a “Categories” tab in the primary control panel navigation. Clicking on it will take you to the category index. From there you can choose a category group from the sidebar, and add/reorder/delete categories within it:

![Category Index](./images/categories-category-index.png)

Double-clicking on a category will bring up a modal that lets you edit its name, slug, and any fields you’ve assigned to the group.

![Category Edit Modal](./images/categories-edit-popup.png)

When you create a category, you have the following options:

* Fill out the category fields (if you didn't define any then the only field available will be Title)
* Edit the slug (it's automatically populated based on the title).
* Choose a Parent category. The new category will have a hierarchical relationship with its parent. This is helpful for creating taxonomies with multiple levels. You also have the option of creating a new category while assigning the Parent.

::: tip
You can only nest categories up to the level specified in the Max Level field Category Group settings. If no level is specified then the nesting level is unlimited.
:::

## Assigning Categories

To assign categories to things (entries, assets, users, etc.), you must first create a [Categories field](categories-fields.md).

Each Categories field is connected to a single category group. Whatever you attach the field to will be able to create [relations](relations.md) to any of the categories within that group.

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

Once you’ve created a category query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Category](craft3:craft\elements\Category) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display a navigation for all the categories in a category group called “Topics” by doing the following:

1. Create a category query with `craft.categories()`.
2. Set the [group](#group) parameter on it.
3. Fetch the categories with `.all()`.
4. Loop through the categories using a [nav](tags.md#nav) tag to create the navigation HTML.

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

### Parameters

Category queries support the following parameters:

<!-- BEGIN PARAMS -->

| Param                                     | Description                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ancestorDist](#ancestordist)             | Narrows the query results to only categories that are up to a certain distance away from the category specified by [ancestorOf](#ancestorof).                                                                                                                                                |
| [ancestorOf](#ancestorof)                 | Narrows the query results to only categories that are ancestors of another category.                                                                                                                                                                                                         |
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.                                                                                                                                                                                                                                             |
| [asArray](#asarray)                       | Causes the query to return matching categories as arrays of data, rather than [Category](craft3:craft\elements\Category) objects.                                                                                                                                                          |
| [clearCachedResult](#clearcachedresult)   | Clears the cached result.                                                                                                                                                                                                                                                                    |
| [dateCreated](#datecreated)               | Narrows the query results based on the categories’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#dateupdated)               | Narrows the query results based on the categories’ last-updated dates.                                                                                                                                                                                                                       |
| [descendantDist](#descendantdist)         | Narrows the query results to only categories that are up to a certain distance away from the category specified by [descendantOf](#descendantof).                                                                                                                                            |
| [descendantOf](#descendantof)             | Narrows the query results to only categories that are descendants of another category.                                                                                                                                                                                                       |
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                                 |
| [group](#group)                           | Narrows the query results based on the category groups the categories belong to.                                                                                                                                                                                                             |
| [groupId](#groupid)                       | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.                                                                                                                                                                                        |
| [hasDescendants](#hasdescendants)         | Narrows the query results based on whether the categories have any descendants.                                                                                                                                                                                                              |
| [id](#id)                                 | Narrows the query results based on the categories’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching categories as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                                    |
| [leaves](#leaves)                         | Narrows the query results based on whether the categories are “leaves” (categories with no descendants).                                                                                                                                                                                     |
| [level](#level)                           | Narrows the query results based on the categories’ level within the structure.                                                                                                                                                                                                               |
| [limit](#limit)                           | Determines the number of categories that should be returned.                                                                                                                                                                                                                                 |
| [nextSiblingOf](#nextsiblingof)           | Narrows the query results to only the category that comes immediately after another category.                                                                                                                                                                                                |
| [offset](#offset)                         | Determines how many categories should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                       | Determines the order that the categories should be returned in. (If empty, defaults to `dateCreated DESC`, or the order defined by the category group if the [group](#group) or [groupId](#groupid) params are set to a single group.)                                                       |
| [positionedAfter](#positionedafter)       | Narrows the query results to only categories that are positioned after another category.                                                                                                                                                                                                     |
| [positionedBefore](#positionedbefore)     | Narrows the query results to only categories that are positioned before another category.                                                                                                                                                                                                    |
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                                |
| [prevSiblingOf](#prevsiblingof)           | Narrows the query results to only the category that comes immediately before another category.                                                                                                                                                                                               |
| [relatedTo](#relatedto)                   | Narrows the query results to only categories that are related to certain other elements.                                                                                                                                                                                                     |
| [search](#search)                         | Narrows the query results to only categories that match a search query.                                                                                                                                                                                                                      |
| [siblingOf](#siblingof)                   | Narrows the query results to only categories that are siblings of another category.                                                                                                                                                                                                          |
| [site](#site)                             | Determines which site(s) the categories should be queried in.                                                                                                                                                                                                                                |
| [siteId](#siteid)                         | Determines which site(s) the categories should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [slug](#slug)                             | Narrows the query results based on the categories’ slugs.                                                                                                                                                                                                                                    |
| [status](#status)                         | Narrows the query results based on the categories’ statuses.                                                                                                                                                                                                                                 |
| [title](#title)                           | Narrows the query results based on the categories’ titles.                                                                                                                                                                                                                                   |
| [trashed](#trashed)                       | Narrows the query results to only categories that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#uid)                               | Narrows the query results based on the categories’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                            |
| [uri](#uri)                               | Narrows the query results based on the categories’ URIs.                                                                                                                                                                                                                                     |
| [with](#with)                             | Causes the query to return matching categories eager-loaded with related elements.                                                                                                                                                                                                           |

#### `ancestorDist`

Narrows the query results to only categories that are up to a certain distance away from the category specified by [ancestorOf](#ancestorof).





::: code
```twig
{# Fetch categories above this one #}
{% set categories = craft.categories()
    .ancestorOf(myCategory)
    .ancestorDist(3)
    .all() %}
```

```php
// Fetch categories above this one
$categories = \craft\elements\Category::find()
    ->ancestorOf($myCategory)
    ->ancestorDist(3)
    ->all();
```
:::


#### `ancestorOf`

Narrows the query results to only categories that are ancestors of another category.



Possible values include:

| Value                                                 | Fetches categories…                           |
| ----------------------------------------------------- | --------------------------------------------- |
| `1`                                                   | above the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | above the category represented by the object. |



::: code
```twig
{# Fetch categories above this one #}
{% set categories = craft.categories()
    .ancestorOf(myCategory)
    .all() %}
```

```php
// Fetch categories above this one
$categories = \craft\elements\Category::find()
    ->ancestorOf($myCategory)
    ->all();
```
:::



::: tip
This can be combined with [ancestorDist](#ancestordist) if you want to limit how far away the ancestor categories can be.
:::


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all categories, regardless of status #}
{% set categories = craft.categories()
    .anyStatus()
    .all() %}
```

```php
// Fetch all categories, regardless of status
$categories = \craft\elements\Category::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching categories as arrays of data, rather than [Category](craft3:craft\elements\Category) objects.





::: code
```twig
{# Fetch categories as arrays #}
{% set categories = craft.categories()
    .asArray()
    .all() %}
```

```php
// Fetch categories as arrays
$categories = \craft\elements\Category::find()
    ->asArray()
    ->all();
```
:::


#### `clearCachedResult`

Clears the cached result.






#### `dateCreated`

Narrows the query results based on the categories’ creation dates.



Possible values include:

| Value                                            | Fetches categories…                                  |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were created on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were created before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01. |



::: code
```twig
{# Fetch categories created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set categories = craft.categories()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch categories created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$categories = \craft\elements\Category::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the categories’ last-updated dates.



Possible values include:

| Value                                            | Fetches categories…                                  |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were updated on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were updated before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01. |



::: code
```twig
{# Fetch categories updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set categories = craft.categories()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch categories updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$categories = \craft\elements\Category::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `descendantDist`

Narrows the query results to only categories that are up to a certain distance away from the category specified by [descendantOf](#descendantof).





::: code
```twig
{# Fetch categories below this one #}
{% set categories = craft.categories()
    .descendantOf(myCategory)
    .descendantDist(3)
    .all() %}
```

```php
// Fetch categories below this one
$categories = \craft\elements\Category::find()
    ->descendantOf($myCategory)
    ->descendantDist(3)
    ->all();
```
:::


#### `descendantOf`

Narrows the query results to only categories that are descendants of another category.



Possible values include:

| Value                                                 | Fetches categories…                           |
| ----------------------------------------------------- | --------------------------------------------- |
| `1`                                                   | below the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | below the category represented by the object. |



::: code
```twig
{# Fetch categories below this one #}
{% set categories = craft.categories()
    .descendantOf(myCategory)
    .all() %}
```

```php
// Fetch categories below this one
$categories = \craft\elements\Category::find()
    ->descendantOf($myCategory)
    ->all();
```
:::



::: tip
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant categories can be.
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch categories in a specific order #}
{% set categories = craft.categories()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch categories in a specific order
$categories = \craft\elements\Category::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `group`

Narrows the query results based on the category groups the categories belong to.

Possible values include:

| Value                                                         | Fetches categories…                             |
| ------------------------------------------------------------- | ----------------------------------------------- |
| `'foo'`                                                       | in a group with a handle of `foo`.              |
| `'not foo'`                                                   | not in a group with a handle of `foo`.          |
| `['foo', 'bar']`                                              | in a group with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                                       | not in a group with a handle of `foo` or `bar`. |
| a [CategoryGroup](craft3:craft\models\CategoryGroup) object | in a group represented by the object.           |



::: code
```twig
{# Fetch categories in the Foo group #}
{% set categories = craft.categories()
    .group('foo')
    .all() %}
```

```php
// Fetch categories in the Foo group
$categories = \craft\elements\Category::find()
    ->group('foo')
    ->all();
```
:::


#### `groupId`

Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

Possible values include:

| Value           | Fetches categories…                  |
| --------------- | ------------------------------------ |
| `1`             | in a group with an ID of 1.          |
| `'not 1'`       | not in a group with an ID of 1.      |
| `[1, 2]`        | in a group with an ID of 1 or 2.     |
| `['not', 1, 2]` | not in a group with an ID of 1 or 2. |



::: code
```twig
{# Fetch categories in the group with an ID of 1 #}
{% set categories = craft.categories()
    .groupId(1)
    .all() %}
```

```php
// Fetch categories in the group with an ID of 1
$categories = \craft\elements\Category::find()
    ->groupId(1)
    ->all();
```
:::


#### `hasDescendants`

Narrows the query results based on whether the categories have any descendants.



(This has the opposite effect of calling [leaves](#leaves).)



::: code
```twig
{# Fetch categories that have descendants #}
{% set categories = craft.categories()
    .hasDescendants()
    .all() %}
```

```php
// Fetch categories that have descendants
$categories = \craft\elements\Category::find()
    ->hasDescendants()
    ->all();
```
:::


#### `id`

Narrows the query results based on the categories’ IDs.



Possible values include:

| Value           | Fetches categories…       |
| --------------- | ------------------------- |
| `1`             | with an ID of 1.          |
| `'not 1'`       | not with an ID of 1.      |
| `[1, 2]`        | with an ID of 1 or 2.     |
| `['not', 1, 2]` | not with an ID of 1 or 2. |



::: code
```twig
{# Fetch the category by its ID #}
{% set category = craft.categories()
    .id(1)
    .one() %}
```

```php
// Fetch the category by its ID
$category = \craft\elements\Category::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching categories as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch categories in reverse #}
{% set categories = craft.categories()
    .inReverse()
    .all() %}
```

```php
// Fetch categories in reverse
$categories = \craft\elements\Category::find()
    ->inReverse()
    ->all();
```
:::


#### `leaves`

Narrows the query results based on whether the categories are “leaves” (categories with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



::: code
```twig
{# Fetch categories that have no descendants #}
{% set categories = craft.categories()
    .leaves()
    .all() %}
```

```php
// Fetch categories that have no descendants
$categories = \craft\elements\Category::find()
    ->leaves()
    ->all();
```
:::


#### `level`

Narrows the query results based on the categories’ level within the structure.



Possible values include:

| Value           | Fetches categories…                      |
| --------------- | ---------------------------------------- |
| `1`             | with a level of 1.                       |
| `'not 1'`       | not with a level of 1.                   |
| `'>= 3'`     | with a level greater than or equal to 3. |
| `[1, 2]`        | with a level of 1 or 2                   |
| `['not', 1, 2]` | not with level of 1 or 2.                |



::: code
```twig
{# Fetch categories positioned at level 3 or above #}
{% set categories = craft.categories()
    .level('>= 3')
    .all() %}
```

```php
// Fetch categories positioned at level 3 or above
$categories = \craft\elements\Category::find()
    ->level('>= 3')
    ->all();
```
:::


#### `limit`

Determines the number of categories that should be returned.



::: code
```twig
{# Fetch up to 10 categories  #}
{% set categories = craft.categories()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 categories
$categories = \craft\elements\Category::find()
    ->limit(10)
    ->all();
```
:::


#### `nextSiblingOf`

Narrows the query results to only the category that comes immediately after another category.



Possible values include:

| Value                                                 | Fetches the category…                         |
| ----------------------------------------------------- | --------------------------------------------- |
| `1`                                                   | after the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | after the category represented by the object. |



::: code
```twig
{# Fetch the next category #}
{% set category = craft.categories()
    .nextSiblingOf(myCategory)
    .one() %}
```

```php
// Fetch the next category
$category = \craft\elements\Category::find()
    ->nextSiblingOf($myCategory)
    ->one();
```
:::


#### `offset`

Determines how many categories should be skipped in the results.



::: code
```twig
{# Fetch all categories except for the first 3 #}
{% set categories = craft.categories()
    .offset(3)
    .all() %}
```

```php
// Fetch all categories except for the first 3
$categories = \craft\elements\Category::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the categories should be returned in. (If empty, defaults to `dateCreated DESC`, or the order defined by the category group if the [group](#group) or [groupId](#groupid) params are set to a single group.)



::: code
```twig
{# Fetch all categories in order of date created #}
{% set categories = craft.categories()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all categories in order of date created
$categories = \craft\elements\Category::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


#### `positionedAfter`

Narrows the query results to only categories that are positioned after another category.



Possible values include:

| Value                                                 | Fetches categories…                           |
| ----------------------------------------------------- | --------------------------------------------- |
| `1`                                                   | after the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | after the category represented by the object. |



::: code
```twig
{# Fetch categories after this one #}
{% set categories = craft.categories()
    .positionedAfter(myCategory)
    .all() %}
```

```php
// Fetch categories after this one
$categories = \craft\elements\Category::find()
    ->positionedAfter($myCategory)
    ->all();
```
:::


#### `positionedBefore`

Narrows the query results to only categories that are positioned before another category.



Possible values include:

| Value                                                 | Fetches categories…                            |
| ----------------------------------------------------- | ---------------------------------------------- |
| `1`                                                   | before the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | before the category represented by the object. |



::: code
```twig
{# Fetch categories before this one #}
{% set categories = craft.categories()
    .positionedBefore(myCategory)
    .all() %}
```

```php
// Fetch categories before this one
$categories = \craft\elements\Category::find()
    ->positionedBefore($myCategory)
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique categories from Site A, or Site B if they don’t exist in Site A #}
{% set categories = craft.categories()
    .site('*')
    .unique()
    .preferSites(['a', 'b'])
    .all() %}
```

```php
// Fetch unique categories from Site A, or Site B if they don’t exist in Site A
$categories = \craft\elements\Category::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prevSiblingOf`

Narrows the query results to only the category that comes immediately before another category.



Possible values include:

| Value                                                 | Fetches the category…                          |
| ----------------------------------------------------- | ---------------------------------------------- |
| `1`                                                   | before the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | before the category represented by the object. |



::: code
```twig
{# Fetch the previous category #}
{% set category = craft.categories()
    .prevSiblingOf(myCategory)
    .one() %}
```

```php
// Fetch the previous category
$category = \craft\elements\Category::find()
    ->prevSiblingOf($myCategory)
    ->one();
```
:::


#### `relatedTo`

Narrows the query results to only categories that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all categories that are related to myCategory #}
{% set categories = craft.categories()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all categories that are related to $myCategory
$categories = \craft\elements\Category::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `search`

Narrows the query results to only categories that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all categories that match the search query #}
{% set categories = craft.categories()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all categories that match the search query
$categories = \craft\elements\Category::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siblingOf`

Narrows the query results to only categories that are siblings of another category.



Possible values include:

| Value                                                 | Fetches categories…                            |
| ----------------------------------------------------- | ---------------------------------------------- |
| `1`                                                   | beside the category with an ID of 1.           |
| a [Category](craft3:craft\elements\Category) object | beside the category represented by the object. |



::: code
```twig
{# Fetch categories beside this one #}
{% set categories = craft.categories()
    .siblingOf(myCategory)
    .all() %}
```

```php
// Fetch categories beside this one
$categories = \craft\elements\Category::find()
    ->siblingOf($myCategory)
    ->all();
```
:::


#### `site`

Determines which site(s) the categories should be queried in.



The current site will be used by default.

Possible values include:

| Value                                                      | Fetches categories…                            |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `'foo'`                                                    | from the site with a handle of `foo`.          |
| `['foo', 'bar']`                                           | from a site with a handle of `foo` or `bar`.   |
| `['not', 'foo', 'bar']`                                    | not in a site with a handle of `foo` or `bar`. |
| a [craft\models\Site](craft3:craft\models\Site) object | from the site represented by the object.       |
| `'*'`                                                      | from any site.                                 |

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch categories from the Foo site #}
{% set categories = craft.categories()
    .site('foo')
    .all() %}
```

```php
// Fetch categories from the Foo site
$categories = \craft\elements\Category::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the categories should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value           | Fetches categories…                     |
| --------------- | --------------------------------------- |
| `1`             | from the site with an ID of `1`.        |
| `[1, 2]`        | from a site with an ID of `1` or `2`.   |
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`. |
| `'*'`           | from any site.                          |



::: code
```twig
{# Fetch categories from the site with an ID of 1 #}
{% set categories = craft.categories()
    .siteId(1)
    .all() %}
```

```php
// Fetch categories from the site with an ID of 1
$categories = \craft\elements\Category::find()
    ->siteId(1)
    ->all();
```
:::


#### `slug`

Narrows the query results based on the categories’ slugs.



Possible values include:

| Value                       | Fetches categories…                              |
| --------------------------- | ------------------------------------------------ |
| `'foo'`                     | with a slug of `foo`.                            |
| `'foo*'`                    | with a slug that begins with `foo`.              |
| `'*foo'`                    | with a slug that ends with `foo`.                |
| `'*foo*'`                   | with a slug that contains `foo`.                 |
| `'not *foo*'`               | with a slug that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a slug that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested category slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the category with that slug #}
{% set category = craft.categories()
    .slug(requestedSlug|literal)
    .one() %}
```

```php
// Get the requested category slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the category with that slug
$category = \craft\elements\Category::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


#### `status`

Narrows the query results based on the categories’ statuses.



Possible values include:

| Value                    | Fetches categories… |
| ------------------------ | ------------------- |
| `'enabled'`  _(default)_ | that are enabled.   |
| `'disabled'`             | that are disabled.  |



::: code
```twig
{# Fetch disabled categories #}
{% set categories = craft.categories()
    .status('disabled')
    .all() %}
```

```php
// Fetch disabled categories
$categories = \craft\elements\Category::find()
    ->status('disabled')
    ->all();
```
:::


#### `title`

Narrows the query results based on the categories’ titles.



Possible values include:

| Value                       | Fetches categories…                               |
| --------------------------- | ------------------------------------------------- |
| `'Foo'`                     | with a title of `Foo`.                            |
| `'Foo*'`                    | with a title that begins with `Foo`.              |
| `'*Foo'`                    | with a title that ends with `Foo`.                |
| `'*Foo*'`                   | with a title that contains `Foo`.                 |
| `'not *Foo*'`               | with a title that doesn’t contain `Foo`.          |
| `['*Foo*', '*Bar*']`        | with a title that contains `Foo` or `Bar`.        |
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`. |



::: code
```twig
{# Fetch categories with a title that contains "Foo" #}
{% set categories = craft.categories()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch categories with a title that contains "Foo"
$categories = \craft\elements\Category::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only categories that have been soft-deleted.





::: code
```twig
{# Fetch trashed categories #}
{% set categories = craft.categories()
    .trashed()
    .all() %}
```

```php
// Fetch trashed categories
$categories = \craft\elements\Category::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the categories’ UIDs.





::: code
```twig
{# Fetch the category by its UID #}
{% set category = craft.categories()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the category by its UID
$category = \craft\elements\Category::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique categories across all sites #}
{% set categories = craft.categories()
    .site('*')
    .unique()
    .all() %}
```

```php
// Fetch unique categories across all sites
$categories = \craft\elements\Category::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

Narrows the query results based on the categories’ URIs.



Possible values include:

| Value                       | Fetches categories…                             |
| --------------------------- | ----------------------------------------------- |
| `'foo'`                     | with a URI of `foo`.                            |
| `'foo*'`                    | with a URI that begins with `foo`.              |
| `'*foo'`                    | with a URI that ends with `foo`.                |
| `'*foo*'`                   | with a URI that contains `foo`.                 |
| `'not *foo*'`               | with a URI that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a URI that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the category with that URI #}
{% set category = craft.categories()
    .uri(requestedUri|literal)
    .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the category with that URI
$category = \craft\elements\Category::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `with`

Causes the query to return matching categories eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch categories eager-loaded with the "Related" field’s relations #}
{% set categories = craft.categories()
    .with(['related'])
    .all() %}
```

```php
// Fetch categories eager-loaded with the "Related" field’s relations
$categories = \craft\elements\Category::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
