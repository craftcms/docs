<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

::: danger
This auto-generated reference material has not yet been updated for Craft 5!
:::

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                       | Description
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [ElementCollection](#elementcollection)     | <Tag> collect($db = null)
| [afterPopulate](#afterpopulate)             | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)               | Narrows the query results to only tags that are related to certain other elements.
| [asArray](#asarray)                         | Causes the query to return matching tags as arrays of data, rather than [Tag](craft5:craft\elements\Tag) objects.
| [cache](#cache)                             | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)     | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [collect](#collect)                         |
| [dateCreated](#datecreated)                 | Narrows the query results based on the tags’ creation dates.
| [dateUpdated](#dateupdated)                 | Narrows the query results based on the tags’ last-updated dates.
| [eagerly](#eagerly)                         | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [fixedOrder](#fixedorder)                   | Causes the query results to be returned in the order specified by [id](#id).
| [group](#group)                             | Narrows the query results based on the tag groups the tags belong to.
| [groupId](#groupid)                         | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.
| [id](#id)                                   | Narrows the query results based on the tags’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)   | Causes the query to return matching tags as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                       | Narrows the query results to only tags that were involved in a bulk element operation.
| [inReverse](#inreverse)                     | Causes the query results to be returned in reverse order.
| [limit](#limit)                             | Determines the number of tags that should be returned.
| [offset](#offset)                           | Determines how many tags should be skipped in the results.
| [orderBy](#orderby)                         | Determines the order that the tags should be returned in. (If empty, defaults to `title ASC`.)
| [preferSites](#prefersites)                 | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading) | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)         | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                     | Narrows the query results to only tags that are related to certain other elements.
| [render](#render)                           | Executes the query and renders the resulting elements using their partial templates.
| [search](#search)                           | Narrows the query results to only tags that match a search query.
| [site](#site)                               | Determines which site(s) the tags should be queried in.
| [siteId](#siteid)                           | Determines which site(s) the tags should be queried in, per the site’s ID.
| [siteSettingsId](#sitesettingsid)           | Narrows the query results based on the tags’ IDs in the `elements_sites` table.
| [title](#title)                             | Narrows the query results based on the tags’ titles.
| [trashed](#trashed)                         | Narrows the query results to only tags that have been soft-deleted.
| [uid](#uid)                                 | Narrows the query results based on the tags’ UIDs.
| [unique](#unique)                           | Determines whether only elements with unique IDs should be returned by the query.
| [uri](#uri)                                 | Narrows the query results based on the tags’ URIs.
| [wasCountEagerLoaded](#wascounteagerloaded) | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)           | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                               | Causes the query to return matching tags eager-loaded with related elements.


<!-- textlint-enable -->


#### `ElementCollection`

<Tag> collect($db = null)






#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only tags that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all tags that are related to myCategoryA and myCategoryB #}
{% set tags = craft.tags()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all tags that are related to $myCategoryA and $myCategoryB
$tags = \craft\elements\Tag::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching tags as arrays of data, rather than [Tag](craft5:craft\elements\Tag) objects.





::: code
```twig
{# Fetch tags as arrays #}
{% set tags = craft.tags()
  .asArray()
  .all() %}
```

```php
// Fetch tags as arrays
$tags = \craft\elements\Tag::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `collect`








#### `dateCreated`

Narrows the query results based on the tags’ creation dates.



Possible values include:

| Value | Fetches tags…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch tags created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set tags = craft.tags()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch tags created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$tags = \craft\elements\Tag::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the tags’ last-updated dates.



Possible values include:

| Value | Fetches tags…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch tags updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set tags = craft.tags()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch tags updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$tags = \craft\elements\Tag::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch tags in a specific order #}
{% set tags = craft.tags()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch tags in a specific order
$tags = \craft\elements\Tag::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `group`

Narrows the query results based on the tag groups the tags belong to.

Possible values include:

| Value | Fetches tags…
| - | -
| `'foo'` | in a group with a handle of `foo`.
| `'not foo'` | not in a group with a handle of `foo`.
| `['foo', 'bar']` | in a group with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a group with a handle of `foo` or `bar`.
| a [TagGroup](craft5:craft\models\TagGroup) object | in a group represented by the object.



::: code
```twig
{# Fetch tags in the Foo group #}
{% set tags = craft.tags()
  .group('foo')
  .all() %}
```

```php
// Fetch tags in the Foo group
$tags = \craft\elements\Tag::find()
    ->group('foo')
    ->all();
```
:::


#### `groupId`

Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.

Possible values include:

| Value | Fetches tags…
| - | -
| `1` | in a group with an ID of 1.
| `'not 1'` | not in a group with an ID of 1.
| `[1, 2]` | in a group with an ID of 1 or 2.
| `['not', 1, 2]` | not in a group with an ID of 1 or 2.



::: code
```twig
{# Fetch tags in the group with an ID of 1 #}
{% set tags = craft.tags()
  .groupId(1)
  .all() %}
```

```php
// Fetch tags in the group with an ID of 1
$tags = \craft\elements\Tag::find()
    ->groupId(1)
    ->all();
```
:::


#### `id`

Narrows the query results based on the tags’ IDs.



Possible values include:

| Value | Fetches tags…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the tag by its ID #}
{% set tag = craft.tags()
  .id(1)
  .one() %}
```

```php
// Fetch the tag by its ID
$tag = \craft\elements\Tag::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching tags as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only tags that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch tags in reverse #}
{% set tags = craft.tags()
  .inReverse()
  .all() %}
```

```php
// Fetch tags in reverse
$tags = \craft\elements\Tag::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

Determines the number of tags that should be returned.



::: code
```twig
{# Fetch up to 10 tags  #}
{% set tags = craft.tags()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 tags
$tags = \craft\elements\Tag::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many tags should be skipped in the results.



::: code
```twig
{# Fetch all tags except for the first 3 #}
{% set tags = craft.tags()
  .offset(3)
  .all() %}
```

```php
// Fetch all tags except for the first 3
$tags = \craft\elements\Tag::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the tags should be returned in. (If empty, defaults to `title ASC`.)



::: code
```twig
{# Fetch all tags in order of date created #}
{% set tags = craft.tags()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all tags in order of date created
$tags = \craft\elements\Tag::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique tags from Site A, or Site B if they don’t exist in Site A #}
{% set tags = craft.tags()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique tags from Site A, or Site B if they don’t exist in Site A
$tags = \craft\elements\Tag::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prepForEagerLoading`

Prepares the query for lazy eager loading.










#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `relatedTo`

Narrows the query results to only tags that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all tags that are related to myCategory #}
{% set tags = craft.tags()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all tags that are related to $myCategory
$tags = \craft\elements\Tag::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `search`

Narrows the query results to only tags that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all tags that match the search query #}
{% set tags = craft.tags()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all tags that match the search query
$tags = \craft\elements\Tag::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

Determines which site(s) the tags should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches tags…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](craft5:craft\models\Site) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch tags from the Foo site #}
{% set tags = craft.tags()
  .site('foo')
  .all() %}
```

```php
// Fetch tags from the Foo site
$tags = \craft\elements\Tag::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the tags should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches tags…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch tags from the site with an ID of 1 #}
{% set tags = craft.tags()
  .siteId(1)
  .all() %}
```

```php
// Fetch tags from the site with an ID of 1
$tags = \craft\elements\Tag::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the tags’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches tags…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the tag by its ID in the elements_sites table #}
{% set tag = craft.tags()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the tag by its ID in the elements_sites table
$tag = \craft\elements\Tag::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `title`

Narrows the query results based on the tags’ titles.



Possible values include:

| Value | Fetches tags…
| - | -
| `'Foo'` | with a title of `Foo`.
| `'Foo*'` | with a title that begins with `Foo`.
| `'*Foo'` | with a title that ends with `Foo`.
| `'*Foo*'` | with a title that contains `Foo`.
| `'not *Foo*'` | with a title that doesn’t contain `Foo`.
| `['*Foo*', '*Bar*']` | with a title that contains `Foo` or `Bar`.
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`.



::: code
```twig
{# Fetch tags with a title that contains "Foo" #}
{% set tags = craft.tags()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch tags with a title that contains "Foo"
$tags = \craft\elements\Tag::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only tags that have been soft-deleted.





::: code
```twig
{# Fetch trashed tags #}
{% set tags = craft.tags()
  .trashed()
  .all() %}
```

```php
// Fetch trashed tags
$tags = \craft\elements\Tag::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the tags’ UIDs.





::: code
```twig
{# Fetch the tag by its UID #}
{% set tag = craft.tags()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the tag by its UID
$tag = \craft\elements\Tag::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not
desired.



::: code
```twig
{# Fetch unique tags across all sites #}
{% set tags = craft.tags()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique tags across all sites
$tags = \craft\elements\Tag::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

Narrows the query results based on the tags’ URIs.



Possible values include:

| Value | Fetches tags…
| - | -
| `'foo'` | with a URI of `foo`.
| `'foo*'` | with a URI that begins with `foo`.
| `'*foo'` | with a URI that ends with `foo`.
| `'*foo*'` | with a URI that contains `foo`.
| `'not *foo*'` | with a URI that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a URI that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the tag with that URI #}
{% set tag = craft.tags()
  .uri(requestedUri|literal)
  .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the tag with that URI
$tag = \craft\elements\Tag::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

Causes the query to return matching tags eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch tags eager-loaded with the "Related" field’s relations #}
{% set tags = craft.tags()
  .with(['related'])
  .all() %}
```

```php
// Fetch tags eager-loaded with the "Related" field’s relations
$tags = \craft\elements\Tag::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
