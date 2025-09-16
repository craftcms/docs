<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                     | Description
| ----------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [administrativeArea](#administrativearea) | Narrows the query results based on the administrative area the assets belong to.
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only addresses that are related to certain other elements.
| [andWith](#andwith)                       | Causes the query to return matching addresses eager-loaded with related elements, in addition to the elements that were already specified by [with](#with).
| [asArray](#asarray)                       | Causes the query to return matching addresses as arrays of data, rather than [Address](craft4:craft\elements\Address) objects.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [countryCode](#countrycode)               | Narrows the query results based on the country the assets belong to.
| [dateCreated](#datecreated)               | Narrows the query results based on the addresses’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the addresses’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [id](#id)                                 | Narrows the query results based on the addresses’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [language](#language)                     | Determines which site(s) the addresses should be queried in, based on their language.
| [limit](#limit)                           | Determines the number of addresses that should be returned.
| [offset](#offset)                         | Determines how many addresses should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC, id`.)
| [owner](#owner)                           | Sets the [ownerId](#ownerid) parameter based on a given owner element.
| [ownerId](#ownerid)                       | Narrows the query results based on the addresses’ owner elements, per their IDs.
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                   | Narrows the query results to only addresses that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only addresses that match a search query.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the addresses’ IDs in the `elements_sites` table.
| [trashed](#trashed)                       | Narrows the query results to only addresses that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the addresses’ UIDs.
| [with](#with)                             | Causes the query to return matching addresses eager-loaded with related elements.
| [withCustomFields](#withcustomfields)     | Sets whether custom fields should be factored into the query.


<!-- textlint-enable -->


#### `administrativeArea`


Narrows the query results based on the administrative area the assets belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'AU'` | with a administrativeArea of `AU`.
| `'not US'` | not in a administrativeArea of `US`.
| `['AU', 'US']` | in a administrativeArea of `AU` or `US`.
| `['not', 'AU', 'US']` | not in a administrativeArea of `AU` or `US`.



::: code
```twig
{# Fetch addresses in the AU #}
{% set addresses = craft.addresses()
  .administrativeArea('AU')
  .all() %}
```

```php
// Fetch addresses in the AU
$addresses = \craft\elements\Address::find()
    ->administrativeArea('AU')
    ->all();
```
:::


#### `andRelatedTo`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andrelatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only addresses that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all addresses that are related to myCategoryA and myCategoryB #}
{% set addresses = craft.addresses()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all addresses that are related to $myCategoryA and $myCategoryB
$addresses = \craft\elements\Address::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `andWith`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andwith" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching addresses eager-loaded with related elements, in addition to the elements that were already specified by [with](#with).



.






#### `asArray`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-asarray" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching addresses as arrays of data, rather than [Address](craft4:craft\elements\Address) objects.





::: code
```twig
{# Fetch addresses as arrays #}
{% set addresses = craft.addresses()
  .asArray()
  .all() %}
```

```php
// Fetch addresses as arrays
$addresses = \craft\elements\Address::find()
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






#### `countryCode`


Narrows the query results based on the country the assets belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'AU'` | with a countryCode of `AU`.
| `'not US'` | not in a countryCode of `US`.
| `['AU', 'US']` | in a countryCode of `AU` or `US`.
| `['not', 'AU', 'US']` | not in a countryCode of `AU` or `US`.



::: code
```twig
{# Fetch addresses in the AU #}
{% set addresses = craft.addresses()
  .countryCode('AU')
  .all() %}
```

```php
// Fetch addresses in the AU
$addresses = \craft\elements\Address::find()
    ->countryCode('AU')
    ->all();
```
:::


#### `dateCreated`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-datecreated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the addresses’ creation dates.



Possible values include:

| Value | Fetches addresses…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch addresses created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set addresses = craft.addresses()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch addresses created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$addresses = \craft\elements\Address::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-dateupdated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the addresses’ last-updated dates.



Possible values include:

| Value | Fetches addresses…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch addresses updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set addresses = craft.addresses()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch addresses updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$addresses = \craft\elements\Address::find()
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
{# Fetch addresses in a specific order #}
{% set addresses = craft.addresses()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch addresses in a specific order
$addresses = \craft\elements\Address::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `id`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-id" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the addresses’ IDs.



Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the address by its ID #}
{% set address = craft.addresses()
  .id(1)
  .one() %}
```

```php
// Fetch the address by its ID
$address = \craft\elements\Address::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-ignoreplaceholders" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-inreverse" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch addresses in reverse #}
{% set addresses = craft.addresses()
  .inReverse()
  .all() %}
```

```php
// Fetch addresses in reverse
$addresses = \craft\elements\Address::find()
    ->inReverse()
    ->all();
```
:::


#### `language`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-language" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines which site(s) the addresses should be queried in, based on their language.



Possible values include:

| Value | Fetches addresses…
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
{# Fetch addresses from English sites #}
{% set addresses = craft.addresses()
  .language('en')
  .all() %}
```

```php
// Fetch addresses from English sites
$addresses = \craft\elements\Address::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#limit()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

Determines the number of addresses that should be returned.



::: code
```twig
{# Fetch up to 10 addresses  #}
{% set addresses = craft.addresses()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 addresses
$addresses = \craft\elements\Address::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#offset()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

Determines how many addresses should be skipped in the results.



::: code
```twig
{# Fetch all addresses except for the first 3 #}
{% set addresses = craft.addresses()
  .offset(3)
  .all() %}
```

```php
// Fetch all addresses except for the first 3
$addresses = \craft\elements\Address::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-orderby" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC,
    id`.)



::: code
```twig
{# Fetch all addresses in order of date created #}
{% set addresses = craft.addresses()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all addresses in order of date created
$addresses = \craft\elements\Address::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `owner`


Sets the [ownerId](#ownerid) parameter based on a given owner element.



::: code
```twig
{# Fetch addresses for the current user #}
{% set addresses = craft.addresses()
  .owner(currentUser)
  .all() %}
```

```php
// Fetch addresses created for the current user
$addresses = \craft\elements\Address::find()
    ->owner(Craft::$app->user->identity)
    ->all();
```
:::


#### `ownerId`


Narrows the query results based on the addresses’ owner elements, per their IDs.

Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | created for an element with an ID of 1.
| `[1, 2]` | created for an element with an ID of 1 or 2.



::: code
```twig
{# Fetch addresses created for an element with an ID of 1 #}
{% set addresses = craft.addresses()
  .ownerId(1)
  .all() %}
```

```php
// Fetch addresses created for an element with an ID of 1
$addresses = \craft\elements\Address::find()
    ->ownerId(1)
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
{# Fetch unique addresses from Site A, or Site B if they don’t exist in Site A #}
{% set addresses = craft.addresses()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique addresses from Site A, or Site B if they don’t exist in Site A
$addresses = \craft\elements\Address::find()
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

Narrows the query results to only addresses that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all addresses that are related to myCategory #}
{% set addresses = craft.addresses()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all addresses that are related to $myCategory
$addresses = \craft\elements\Address::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `search`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-search" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only addresses that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all addresses that match the search query #}
{% set addresses = craft.addresses()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all addresses that match the search query
$addresses = \craft\elements\Address::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siteSettingsId`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-sitesettingsid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the addresses’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the address by its ID in the elements_sites table #}
{% set address = craft.addresses()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the address by its ID in the elements_sites table
$address = \craft\elements\Address::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `trashed`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-trashed" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only addresses that have been soft-deleted.





::: code
```twig
{# Fetch trashed addresses #}
{% set addresses = craft.addresses()
  .trashed()
  .all() %}
```

```php
// Fetch trashed addresses
$addresses = \craft\elements\Address::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-uid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the addresses’ UIDs.





::: code
```twig
{# Fetch the address by its UID #}
{% set address = craft.addresses()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the address by its UID
$address = \craft\elements\Address::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `with`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-with" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching addresses eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch addresses eager-loaded with the "Related" field’s relations #}
{% set addresses = craft.addresses()
  .with(['related'])
  .all() %}
```

```php
// Fetch addresses eager-loaded with the "Related" field’s relations
$addresses = \craft\elements\Address::find()
    ->with(['related'])
    ->all();
```
:::


#### `withCustomFields`

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-withcustomfields" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Sets whether custom fields should be factored into the query.











<!-- END PARAMS -->
