<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                     | Description
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only elements that are related to certain other elements.
| [andWith](#andwith)                       | Causes the query to return matching elements eager-loaded with related elements, in addition to the elements that were already specified by [with](#with).
| [asArray](#asarray)                       | Causes the query to return matching elements as arrays of data, rather than ElementClass objects.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#datecreated)               | Narrows the query results based on the elements’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the elements’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [id](#id)                                 | Narrows the query results based on the elements’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching elements as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [language](#language)                     | Determines which site(s) the elements should be queried in, based on their language.
| [limit](#limit)                           | Determines the number of elements that should be returned.
| [offset](#offset)                         | Determines how many elements should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the elements should be returned in. (If empty, defaults to `dateCreated DESC, elements.id`.)
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                   | Narrows the query results to only elements that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only elements that match a search query.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the elements’ IDs in the `elements_sites` table.
| [sku](#sku)                               | Narrows the query results based on the SKU.
| [trashed](#trashed)                       | Narrows the query results to only elements that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the elements’ UIDs.
| [with](#with)                             | Causes the query to return matching elements eager-loaded with related elements.
| [withCustomFields](#withcustomfields)     | Sets whether custom fields should be factored into the query.


<!-- textlint-enable -->


#### `andRelatedTo`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andrelatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only elements that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



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


#### `andWith`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andwith" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching elements eager-loaded with related elements, in addition to the elements that were already specified by [with](#with).



.






#### `asArray`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-asarray" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-cache" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Enables query cache for this Query.










#### `clearCachedResult`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-clearcachedresult" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `dateCreated`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-datecreated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the elements’ creation dates.



Possible values include:

| Value | Fetches elements…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-dateupdated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the elements’ last-updated dates.



Possible values include:

| Value | Fetches elements…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-fixedorder" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



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


#### `id`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-id" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-ignoreplaceholders" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching elements as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-inreverse" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


#### `language`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-language" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines which site(s) the elements should be queried in, based on their language.



Possible values include:

| Value | Fetches elements…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique()](https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch elements from English sites #}
{% set elements = craft.queryFunction()
  .language('en')
  .all() %}
```

```php
// Fetch elements from English sites
$elements = ElementClass::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#limit()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

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

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#offset()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-orderby" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines the order that the elements should be returned in. (If empty, defaults to `dateCreated DESC,
    elements.id`.)



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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-prefersites" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

If [unique()](https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

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


#### `prepareSubquery`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-preparesubquery" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `relatedTo`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-relatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only elements that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



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


#### `search`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-search" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only elements that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-sitesettingsid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-trashed" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-uid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-with" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching elements eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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


#### `withCustomFields`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-withcustomfields" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Sets whether custom fields should be factored into the query.











<!-- END PARAMS -->
