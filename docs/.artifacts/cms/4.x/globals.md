<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                     | Description
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only global sets that are related to certain other elements.
| [asArray](#asarray)                       | Causes the query to return matching global sets as arrays of data, rather than [GlobalSet](craft4:craft\elements\GlobalSet) objects.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#datecreated)               | Narrows the query results based on the global sets’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the global sets’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [handle](#handle)                         | Narrows the query results based on the global sets’ handles.
| [id](#id)                                 | Narrows the query results based on the global sets’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching global sets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [language](#language)                     | Determines which site(s) the global sets should be queried in, based on their language.
| [limit](#limit)                           | Determines the number of global sets that should be returned.
| [offset](#offset)                         | Determines how many global sets should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the global sets should be returned in. (If empty, defaults to `sortOrder ASC`.)
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                   | Narrows the query results to only global sets that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only global sets that match a search query.
| [site](#site)                             | Determines which site(s) the global sets should be queried in.
| [siteId](#siteid)                         | Determines which site(s) the global sets should be queried in, per the site’s ID.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the global sets’ IDs in the `elements_sites` table.
| [trashed](#trashed)                       | Narrows the query results to only global sets that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the global sets’ UIDs.
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.
| [with](#with)                             | Causes the query to return matching global sets eager-loaded with related elements.


<!-- textlint-enable -->


#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only global sets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all global sets that are related to myCategoryA and myCategoryB #}
{% set globalSets = craft.globalSets()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all global sets that are related to $myCategoryA and $myCategoryB
$globalSets = \craft\elements\GlobalSet::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching global sets as arrays of data, rather than [GlobalSet](craft4:craft\elements\GlobalSet) objects.





::: code
```twig
{# Fetch global sets as arrays #}
{% set globalSets = craft.globalSets()
  .asArray()
  .all() %}
```

```php
// Fetch global sets as arrays
$globalSets = \craft\elements\GlobalSet::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the global sets’ creation dates.



Possible values include:

| Value | Fetches global sets…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch global sets created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set globalSets = craft.globalSets()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch global sets created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the global sets’ last-updated dates.



Possible values include:

| Value | Fetches global sets…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch global sets updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set globalSets = craft.globalSets()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch global sets updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch global sets in a specific order #}
{% set globalSets = craft.globalSets()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch global sets in a specific order
$globalSets = \craft\elements\GlobalSet::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `handle`

Narrows the query results based on the global sets’ handles.

Possible values include:

| Value | Fetches global sets…
| - | -
| `'foo'` | with a handle of `foo`.
| `'not foo'` | not with a handle of `foo`.
| `['foo', 'bar']` | with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not with a handle of `foo` or `bar`.



::: code
```twig
{# Fetch the global set with a handle of 'foo' #}
{% set globalSet = craft.globalSets()
  .handle('foo')
  .one() %}
```

```php
// Fetch the global set with a handle of 'foo'
$globalSet = \craft\elements\GlobalSet::find()
    ->handle('foo')
    ->one();
```
:::


#### `id`

Narrows the query results based on the global sets’ IDs.



Possible values include:

| Value | Fetches global sets…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the global set by its ID #}
{% set globalSet = craft.globalSets()
  .id(1)
  .one() %}
```

```php
// Fetch the global set by its ID
$globalSet = \craft\elements\GlobalSet::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching global sets as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch global sets in reverse #}
{% set globalSets = craft.globalSets()
  .inReverse()
  .all() %}
```

```php
// Fetch global sets in reverse
$globalSets = \craft\elements\GlobalSet::find()
    ->inReverse()
    ->all();
```
:::


#### `language`

Determines which site(s) the global sets should be queried in, based on their language.



Possible values include:

| Value | Fetches global sets…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch global sets from English sites #}
{% set globalSets = craft.globalSets()
  .language('en')
  .all() %}
```

```php
// Fetch global sets from English sites
$globalSets = \craft\elements\GlobalSet::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

Determines the number of global sets that should be returned.



::: code
```twig
{# Fetch up to 10 global sets  #}
{% set globalSets = craft.globalSets()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many global sets should be skipped in the results.



::: code
```twig
{# Fetch all global sets except for the first 3 #}
{% set globalSets = craft.globalSets()
  .offset(3)
  .all() %}
```

```php
// Fetch all global sets except for the first 3
$globalSets = \craft\elements\GlobalSet::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the global sets should be returned in. (If empty, defaults to `sortOrder ASC`.)



::: code
```twig
{# Fetch all global sets in order of date created #}
{% set globalSets = craft.globalSets()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all global sets in order of date created
$globalSets = \craft\elements\GlobalSet::find()
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
{# Fetch unique global sets from Site A, or Site B if they don’t exist in Site A #}
{% set globalSets = craft.globalSets()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique global sets from Site A, or Site B if they don’t exist in Site A
$globalSets = \craft\elements\GlobalSet::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `relatedTo`

Narrows the query results to only global sets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all global sets that are related to myCategory #}
{% set globalSets = craft.globalSets()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all global sets that are related to $myCategory
$globalSets = \craft\elements\GlobalSet::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `search`

Narrows the query results to only global sets that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all global sets that match the search query #}
{% set globalSets = craft.globalSets()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all global sets that match the search query
$globalSets = \craft\elements\GlobalSet::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

Determines which site(s) the global sets should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches global sets…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](craft4:craft\models\Site) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch global sets from the Foo site #}
{% set globalSets = craft.globalSets()
  .site('foo')
  .all() %}
```

```php
// Fetch global sets from the Foo site
$globalSets = \craft\elements\GlobalSet::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the global sets should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches global sets…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch global sets from the site with an ID of 1 #}
{% set globalSets = craft.globalSets()
  .siteId(1)
  .all() %}
```

```php
// Fetch global sets from the site with an ID of 1
$globalSets = \craft\elements\GlobalSet::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the global sets’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches global sets…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the global set by its ID in the elements_sites table #}
{% set globalSet = craft.globalSets()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the global set by its ID in the elements_sites table
$globalSet = \craft\elements\GlobalSet::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `trashed`

Narrows the query results to only global sets that have been soft-deleted.





::: code
```twig
{# Fetch trashed global sets #}
{% set globalSets = craft.globalSets()
  .trashed()
  .all() %}
```

```php
// Fetch trashed global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the global sets’ UIDs.





::: code
```twig
{# Fetch the global set by its UID #}
{% set globalSet = craft.globalSets()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the global set by its UID
$globalSet = \craft\elements\GlobalSet::find()
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
{# Fetch unique global sets across all sites #}
{% set globalSets = craft.globalSets()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique global sets across all sites
$globalSets = \craft\elements\GlobalSet::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `with`

Causes the query to return matching global sets eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch global sets eager-loaded with the "Related" field’s relations #}
{% set globalSets = craft.globalSets()
  .with(['related'])
  .all() %}
```

```php
// Fetch global sets eager-loaded with the "Related" field’s relations
$globalSets = \craft\elements\GlobalSet::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
