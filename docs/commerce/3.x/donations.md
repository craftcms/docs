<!-- BEGIN PARAMS -->

| Param                                     | Description
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only elements that are related to certain other elements.
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.
| [asArray](#asarray)                       | Causes the query to return matching elements as arrays of data, rather than ElementClass objects.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).
| [dateCreated](#datecreated)               | Narrows the query results based on the elements’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the elements’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [getCacheTags](#getcachetags)             |
| [id](#id)                                 | Narrows the query results based on the elements’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching elements as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [limit](#limit)                           | Determines the number of elements that should be returned.
| [offset](#offset)                         | Determines how many elements should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the elements should be returned in. (If empty, defaults to `dateCreated DESC`.)
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [provisionalDrafts](#provisionaldrafts)   | Narrows the query results to only provisional drafts.
| [relatedTo](#relatedto)                   | Narrows the query results to only elements that are related to certain other elements.
| [savedDraftsOnly](#saveddraftsonly)       | Narrows the query results to only unpublished drafts which have been saved after initial creation.
| [search](#search)                         | Narrows the query results to only elements that match a search query.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the elements’ IDs in the `elements_sites` table.
| [sku](#sku)                               | Narrows the query results based on the SKU.
| [trashed](#trashed)                       | Narrows the query results to only elements that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the elements’ UIDs.
| [with](#with)                             | Causes the query to return matching elements eager-loaded with related elements.

#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only elements that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all elements that are related to myCategoryA and myCategoryB #}
{% set elements = craft.queryFunction()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all elements that are related to $myCategoryA and $myCategoryB
$elements = ElementClass::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all elements, regardless of status #}
{% set elements = craft.queryFunction()
  .anyStatus()
  .all() %}
```

```php
// Fetch all elements, regardless of status
$elements = ElementClass::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching elements as arrays of data, rather than ElementClass objects.





::: code
```twig
{# Fetch elements as arrays #}
{% set elements = craft.queryFunction()
  .asArray()
  .all() %}
```

```php
// Fetch elements as arrays
$elements = ElementClass::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the elements’ creation dates.



Possible values include:

| Value | Fetches elements…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch elements created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set elements = craft.queryFunction()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch elements created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$elements = ElementClass::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the elements’ last-updated dates.



Possible values include:

| Value | Fetches elements…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch elements updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set elements = craft.queryFunction()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch elements updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$elements = ElementClass::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch elements in a specific order #}
{% set elements = craft.queryFunction()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch elements in a specific order
$elements = ElementClass::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `getCacheTags`








#### `id`

Narrows the query results based on the elements’ IDs.



Possible values include:

| Value | Fetches elements…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the element by its ID #}
{% set element = craft.queryFunction()
  .id(1)
  .one() %}
```

```php
// Fetch the element by its ID
$element = ElementClass::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching elements as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch elements in reverse #}
{% set elements = craft.queryFunction()
  .inReverse()
  .all() %}
```

```php
// Fetch elements in reverse
$elements = ElementClass::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

Determines the number of elements that should be returned.



::: code
```twig
{# Fetch up to 10 elements  #}
{% set elements = craft.queryFunction()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 elements
$elements = ElementClass::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many elements should be skipped in the results.



::: code
```twig
{# Fetch all elements except for the first 3 #}
{% set elements = craft.queryFunction()
  .offset(3)
  .all() %}
```

```php
// Fetch all elements except for the first 3
$elements = ElementClass::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the elements should be returned in. (If empty, defaults to `dateCreated DESC`.)



::: code
```twig
{# Fetch all elements in order of date created #}
{% set elements = craft.queryFunction()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all elements in order of date created
$elements = ElementClass::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `preferSites`

If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned
for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique elements from Site A, or Site B if they don’t exist in Site A #}
{% set elements = craft.queryFunction()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique elements from Site A, or Site B if they don’t exist in Site A
$elements = ElementClass::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `provisionalDrafts`

Narrows the query results to only provisional drafts.





::: code
```twig
{# Fetch provisional drafts created by the current user #}
{% set elements = craft.queryFunction()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$elements = ElementClass::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only elements that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all elements that are related to myCategory #}
{% set elements = craft.queryFunction()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all elements that are related to $myCategory
$elements = ElementClass::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft elements #}
{% set elements = {twig-function}
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft elements
$elements = ElementClass::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only elements that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all elements that match the search query #}
{% set elements = craft.queryFunction()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all elements that match the search query
$elements = ElementClass::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the elements’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches elements…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the element by its ID in the elements_sites table #}
{% set element = craft.queryFunction()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the element by its ID in the elements_sites table
$element = ElementClass::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `sku`

Narrows the query results based on the SKU.

Possible values include:

| Value | Fetches elements…
| - | -
| `'DON-123'` | with a matching sku



::: code
```twig
{# Fetch the requested element #}
{% set sku = craft.app.request.getQueryParam('sku') %}
{% set element = craft.queryFunction()
  .sku(sku)
  .one() %}
```

```php
// Fetch the requested element
$sku = Craft::$app->request->getQueryParam('sku');
$element = ElementClass::find()
    ->sku($sku)
    ->one();
```
:::


#### `trashed`

Narrows the query results to only elements that have been soft-deleted.





::: code
```twig
{# Fetch trashed elements #}
{% set elements = craft.queryFunction()
  .trashed()
  .all() %}
```

```php
// Fetch trashed elements
$elements = ElementClass::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the elements’ UIDs.





::: code
```twig
{# Fetch the element by its UID #}
{% set element = craft.queryFunction()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the element by its UID
$element = ElementClass::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `with`

Causes the query to return matching elements eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch elements eager-loaded with the "Related" field’s relations #}
{% set elements = craft.queryFunction()
  .with(['related'])
  .all() %}
```

```php
// Fetch elements eager-loaded with the "Related" field’s relations
$elements = ElementClass::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->