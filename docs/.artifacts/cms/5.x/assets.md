<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                       | Description
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [addOrderBy](#addorderby)                   | Adds additional ORDER BY columns to the query.
| [afterPopulate](#afterpopulate)             | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)               | Narrows the query results to only assets that are related to certain other elements.
| [asArray](#asarray)                         | Causes the query to return matching assets as arrays of data, rather than [Asset](craft5:craft\elements\Asset) objects.
| [cache](#cache)                             | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)     | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#datecreated)                 | Narrows the query results based on the assets’ creation dates.
| [dateModified](#datemodified)               | Narrows the query results based on the assets’ files’ last-modified dates.
| [dateUpdated](#dateupdated)                 | Narrows the query results based on the assets’ last-updated dates.
| [eagerly](#eagerly)                         | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [fields](#fields)                           | Returns the list of fields that should be returned by default by [toArray()](https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail) when no specific fields are specified.
| [filename](#filename)                       | Narrows the query results based on the assets’ filenames.
| [fixedOrder](#fixedorder)                   | Causes the query results to be returned in the order specified by [id](#id).
| [folderId](#folderid)                       | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.
| [folderPath](#folderpath)                   | Narrows the query results based on the folders the assets belong to, per the folders’ paths.
| [hasAlt](#hasalt)                           | Narrows the query results based on whether the assets have alternative text.
| [height](#height)                           | Narrows the query results based on the assets’ image heights.
| [id](#id)                                   | Narrows the query results based on the assets’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)   | Causes the query to return matching assets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                       | Narrows the query results to only assets that were involved in a bulk element operation.
| [inReverse](#inreverse)                     | Causes the query results to be returned in reverse order.
| [includeSubfolders](#includesubfolders)     | Broadens the query results to include assets from any of the subfolders of the folder specified by [folderId](#folderid).
| [kind](#kind)                               | Narrows the query results based on the assets’ file kinds.
| [language](#language)                       | Determines which site(s) the assets should be queried in, based on their language.
| [limit](#limit)                             | Determines the number of assets that should be returned.
| [offset](#offset)                           | Determines how many assets should be skipped in the results.
| [orderBy](#orderby)                         | Determines the order that the assets should be returned in. (If empty, defaults to `dateCreated DESC, elements.id`.)
| [preferSites](#prefersites)                 | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading) | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)         | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                     | Narrows the query results to only assets that are related to certain other elements.
| [render](#render)                           | Executes the query and renders the resulting elements using their partial templates.
| [savable](#savable)                         | Sets the [savable](https://docs.craftcms.com/api/v5/craft-elements-db-assetquery.html#property-savable) property.
| [search](#search)                           | Narrows the query results to only assets that match a search query.
| [site](#site)                               | Determines which site(s) the assets should be queried in.
| [siteId](#siteid)                           | Determines which site(s) the assets should be queried in, per the site’s ID.
| [siteSettingsId](#sitesettingsid)           | Narrows the query results based on the assets’ IDs in the `elements_sites` table.
| [size](#size)                               | Narrows the query results based on the assets’ file sizes (in bytes).
| [title](#title)                             | Narrows the query results based on the assets’ titles.
| [trashed](#trashed)                         | Narrows the query results to only assets that have been soft-deleted.
| [uid](#uid)                                 | Narrows the query results based on the assets’ UIDs.
| [unique](#unique)                           | Determines whether only elements with unique IDs should be returned by the query.
| [uploader](#uploader)                       | Narrows the query results based on the user the assets were uploaded by, per the user’s IDs.
| [volume](#volume)                           | Narrows the query results based on the volume the assets belong to.
| [volumeId](#volumeid)                       | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.
| [wasCountEagerLoaded](#wascounteagerloaded) | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)           | Returns whether the query results were already eager loaded by the query's source element.
| [width](#width)                             | Narrows the query results based on the assets’ image widths.
| [with](#with)                               | Causes the query to return matching assets eager-loaded with related elements.
| [withTransforms](#withtransforms)           | Causes the query to return matching assets eager-loaded with image transform indexes.


<!-- textlint-enable -->


#### `addOrderBy`

Adds additional ORDER BY columns to the query.










#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only assets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all assets that are related to myCategoryA and myCategoryB #}
{% set assets = craft.assets()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all assets that are related to $myCategoryA and $myCategoryB
$assets = \craft\elements\Asset::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching assets as arrays of data, rather than [Asset](craft5:craft\elements\Asset) objects.





::: code
```twig
{# Fetch assets as arrays #}
{% set assets = craft.assets()
  .asArray()
  .all() %}
```

```php
// Fetch assets as arrays
$assets = \craft\elements\Asset::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the assets’ creation dates.



Possible values include:

| Value | Fetches assets…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch assets created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set assets = craft.assets()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch assets created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateModified`

Narrows the query results based on the assets’ files’ last-modified dates.

Possible values include:

| Value | Fetches assets…
| - | -
| `'>= 2018-04-01'` | that were modified on or after 2018-04-01.
| `'< 2018-05-01'` | that were modified before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were modified between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were modified at midnight of the specified relative date.



::: code
```twig
{# Fetch assets modified in the last month #}
{% set start = date('30 days ago')|atom %}

{% set assets = craft.assets()
  .dateModified(">= #{start}")
  .all() %}
```

```php
// Fetch assets modified in the last month
$start = (new \DateTime('30 days ago'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateModified(">= {$start}")
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the assets’ last-updated dates.



Possible values include:

| Value | Fetches assets…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch assets updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set assets = craft.assets()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch assets updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `fields`

Returns the list of fields that should be returned by default by [toArray()](https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail) when no specific fields are specified.

A field is a named element in the returned array by [toArray()](https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail).
This method should return an array of field names or field definitions.
If the former, the field name will be treated as an object property name whose value will be used
as the field value. If the latter, the array key should be the field name while the array value should be
the corresponding field definition which can be either an object property name or a PHP callable
returning the corresponding field value. The signature of the callable should be:

```php
function ($model, $field) {
    // return field value
}
```

For example, the following code declares four fields:

- `email`: the field name is the same as the property name `email`;
- `firstName` and `lastName`: the field names are `firstName` and `lastName`, and their
  values are obtained from the `first_name` and `last_name` properties;
- `fullName`: the field name is `fullName`. Its value is obtained by concatenating `first_name`
  and `last_name`.

```php
return [
    'email',
    'firstName' => 'first_name',
    'lastName' => 'last_name',
    'fullName' => function ($model) {
        return $model->first_name . ' ' . $model->last_name;
    },
];
```




#### `filename`

Narrows the query results based on the assets’ filenames.

Possible values include:

| Value | Fetches assets…
| - | -
| `'foo.jpg'` | with a filename of `foo.jpg`.
| `'foo*'` | with a filename that begins with `foo`.
| `'*.jpg'` | with a filename that ends with `.jpg`.
| `'*foo*'` | with a filename that contains `foo`.
| `'not *foo*'` | with a filename that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a filename that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a filename that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Fetch all the hi-res images #}
{% set assets = craft.assets()
  .filename('*@2x*')
  .all() %}
```

```php
// Fetch all the hi-res images
$assets = \craft\elements\Asset::find()
    ->filename('*@2x*')
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
{# Fetch assets in a specific order #}
{% set assets = craft.assets()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch assets in a specific order
$assets = \craft\elements\Asset::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `folderId`

Narrows the query results based on the folders the assets belong to, per the folders’ IDs.

Possible values include:

| Value | Fetches assets…
| - | -
| `1` | in a folder with an ID of 1.
| `'not 1'` | not in a folder with an ID of 1.
| `[1, 2]` | in a folder with an ID of 1 or 2.
| `['not', 1, 2]` | not in a folder with an ID of 1 or 2.



::: code
```twig
{# Fetch assets in the folder with an ID of 1 #}
{% set assets = craft.assets()
  .folderId(1)
  .all() %}
```

```php
// Fetch assets in the folder with an ID of 1
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->all();
```
:::



::: tip
This can be combined with [includeSubfolders](#includesubfolders) if you want to include assets in all the subfolders of a certain folder.
:::
#### `folderPath`

Narrows the query results based on the folders the assets belong to, per the folders’ paths.

Possible values include:

| Value | Fetches assets…
| - | -
| `foo/` | in a `foo/` folder (excluding nested folders).
| `foo/*` | in a `foo/` folder (including nested folders).
| `'not foo/*'` | not in a `foo/` folder (including nested folders).
| `['foo/*', 'bar/*']` | in a `foo/` or `bar/` folder (including nested folders).
| `['not', 'foo/*', 'bar/*']` | not in a `foo/` or `bar/` folder (including nested folders).



::: code
```twig
{# Fetch assets in the foo/ folder or its nested folders #}
{% set assets = craft.assets()
  .folderPath('foo/*')
  .all() %}
```

```php
// Fetch assets in the foo/ folder or its nested folders
$assets = \craft\elements\Asset::find()
    ->folderPath('foo/*')
    ->all();
```
:::


#### `hasAlt`

Narrows the query results based on whether the assets have alternative text.






#### `height`

Narrows the query results based on the assets’ image heights.

Possible values include:

| Value | Fetches assets…
| - | -
| `100` | with a height of 100.
| `'>= 100'` | with a height of at least 100.
| `['>= 100', '<= 1000']` | with a height between 100 and 1,000.



::: code
```twig
{# Fetch XL images #}
{% set assets = craft.assets()
  .kind('image')
  .height('>= 1000')
  .all() %}
```

```php
// Fetch XL images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->height('>= 1000')
    ->all();
```
:::


#### `id`

Narrows the query results based on the assets’ IDs.



Possible values include:

| Value | Fetches assets…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the asset by its ID #}
{% set asset = craft.assets()
  .id(1)
  .one() %}
```

```php
// Fetch the asset by its ID
$asset = \craft\elements\Asset::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching assets as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only assets that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch assets in reverse #}
{% set assets = craft.assets()
  .inReverse()
  .all() %}
```

```php
// Fetch assets in reverse
$assets = \craft\elements\Asset::find()
    ->inReverse()
    ->all();
```
:::


#### `includeSubfolders`

Broadens the query results to include assets from any of the subfolders of the folder specified by [folderId](#folderid).



::: code
```twig
{# Fetch assets in the folder with an ID of 1 (including its subfolders) #}
{% set assets = craft.assets()
  .folderId(1)
  .includeSubfolders()
  .all() %}
```

```php
// Fetch assets in the folder with an ID of 1 (including its subfolders)
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->includeSubfolders()
    ->all();
```
:::



::: warning
This will only work if [folderId](#folderid) was set to a single folder ID.
:::
#### `kind`

Narrows the query results based on the assets’ file kinds.

Supported file kinds:
- `access`
- `audio`
- `compressed`
- `excel`
- `flash`
- `html`
- `illustrator`
- `image`
- `javascript`
- `json`
- `pdf`
- `photoshop`
- `php`
- `powerpoint`
- `text`
- `video`
- `word`
- `xml`
- `unknown`

Possible values include:

| Value | Fetches assets…
| - | -
| `'image'` | with a file kind of `image`.
| `'not image'` | not with a file kind of `image`..
| `['image', 'pdf']` | with a file kind of `image` or `pdf`.
| `['not', 'image', 'pdf']` | not with a file kind of `image` or `pdf`.



::: code
```twig
{# Fetch all the images #}
{% set assets = craft.assets()
  .kind('image')
  .all() %}
```

```php
// Fetch all the images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->all();
```
:::


#### `language`

Determines which site(s) the assets should be queried in, based on their language.



Possible values include:

| Value | Fetches assets…
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
{# Fetch assets from English sites #}
{% set assets = craft.assets()
  .language('en')
  .all() %}
```

```php
// Fetch assets from English sites
$assets = \craft\elements\Asset::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

Determines the number of assets that should be returned.



::: code
```twig
{# Fetch up to 10 assets  #}
{% set assets = craft.assets()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 assets
$assets = \craft\elements\Asset::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many assets should be skipped in the results.



::: code
```twig
{# Fetch all assets except for the first 3 #}
{% set assets = craft.assets()
  .offset(3)
  .all() %}
```

```php
// Fetch all assets except for the first 3
$assets = \craft\elements\Asset::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the assets should be returned in. (If empty, defaults to `dateCreated DESC,
    elements.id`.)



::: code
```twig
{# Fetch all assets in order of date created #}
{% set assets = craft.assets()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all assets in order of date created
$assets = \craft\elements\Asset::find()
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
{# Fetch unique assets from Site A, or Site B if they don’t exist in Site A #}
{% set assets = craft.assets()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique assets from Site A, or Site B if they don’t exist in Site A
$assets = \craft\elements\Asset::find()
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

Narrows the query results to only assets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all assets that are related to myCategory #}
{% set assets = craft.assets()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all assets that are related to $myCategory
$assets = \craft\elements\Asset::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `savable`

Sets the [savable](https://docs.craftcms.com/api/v5/craft-elements-db-assetquery.html#property-savable) property.






#### `search`

Narrows the query results to only assets that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all assets that match the search query #}
{% set assets = craft.assets()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all assets that match the search query
$assets = \craft\elements\Asset::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

Determines which site(s) the assets should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches assets…
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
{# Fetch assets from the Foo site #}
{% set assets = craft.assets()
  .site('foo')
  .all() %}
```

```php
// Fetch assets from the Foo site
$assets = \craft\elements\Asset::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the assets should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches assets…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch assets from the site with an ID of 1 #}
{% set assets = craft.assets()
  .siteId(1)
  .all() %}
```

```php
// Fetch assets from the site with an ID of 1
$assets = \craft\elements\Asset::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the assets’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches assets…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the asset by its ID in the elements_sites table #}
{% set asset = craft.assets()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the asset by its ID in the elements_sites table
$asset = \craft\elements\Asset::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `size`

Narrows the query results based on the assets’ file sizes (in bytes).

Possible values include:

| Value | Fetches assets…
| - | -
| `1000` | with a size of 1,000 bytes (1KB).
| `'< 1000000'` | with a size of less than 1,000,000 bytes (1MB).
| `['>= 1000', '< 1000000']` | with a size between 1KB and 1MB.



::: code
```twig
{# Fetch assets that are smaller than 1KB #}
{% set assets = craft.assets()
  .size('< 1000')
  .all() %}
```

```php
// Fetch assets that are smaller than 1KB
$assets = \craft\elements\Asset::find()
    ->size('< 1000')
    ->all();
```
:::


#### `title`

Narrows the query results based on the assets’ titles.



Possible values include:

| Value | Fetches assets…
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
{# Fetch assets with a title that contains "Foo" #}
{% set assets = craft.assets()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch assets with a title that contains "Foo"
$assets = \craft\elements\Asset::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only assets that have been soft-deleted.





::: code
```twig
{# Fetch trashed assets #}
{% set assets = craft.assets()
  .trashed()
  .all() %}
```

```php
// Fetch trashed assets
$assets = \craft\elements\Asset::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the assets’ UIDs.





::: code
```twig
{# Fetch the asset by its UID #}
{% set asset = craft.assets()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the asset by its UID
$asset = \craft\elements\Asset::find()
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
{# Fetch unique assets across all sites #}
{% set assets = craft.assets()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique assets across all sites
$assets = \craft\elements\Asset::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uploader`

Narrows the query results based on the user the assets were uploaded by, per the user’s IDs.

Possible values include:

| Value | Fetches assets…
| - | -
| `1` | uploaded by the user with an ID of 1.
| a [craft\elements\User](craft5:craft\elements\User) object | uploaded by the user represented by the object.



::: code
```twig
{# Fetch assets uploaded by the user with an ID of 1 #}
{% set assets = craft.assets()
  .uploader(1)
  .all() %}
```

```php
// Fetch assets uploaded by the user with an ID of 1
$assets = \craft\elements\Asset::find()
    ->uploader(1)
    ->all();
```
:::


#### `volume`

Narrows the query results based on the volume the assets belong to.

Possible values include:

| Value | Fetches assets…
| - | -
| `'foo'` | in a volume with a handle of `foo`.
| `'not foo'` | not in a volume with a handle of `foo`.
| `['foo', 'bar']` | in a volume with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a volume with a handle of `foo` or `bar`.
| a [craft\models\Volume](craft5:craft\models\Volume) object | in a volume represented by the object.



::: code
```twig
{# Fetch assets in the Foo volume #}
{% set assets = craft.assets()
  .volume('foo')
  .all() %}
```

```php
// Fetch assets in the Foo group
$assets = \craft\elements\Asset::find()
    ->volume('foo')
    ->all();
```
:::


#### `volumeId`

Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.

Possible values include:

| Value | Fetches assets…
| - | -
| `1` | in a volume with an ID of 1.
| `'not 1'` | not in a volume with an ID of 1.
| `[1, 2]` | in a volume with an ID of 1 or 2.
| `['not', 1, 2]` | not in a volume with an ID of 1 or 2.
| `':empty:'` | that haven’t been stored in a volume yet



::: code
```twig
{# Fetch assets in the volume with an ID of 1 #}
{% set assets = craft.assets()
  .volumeId(1)
  .all() %}
```

```php
// Fetch assets in the volume with an ID of 1
$assets = \craft\elements\Asset::find()
    ->volumeId(1)
    ->all();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `width`

Narrows the query results based on the assets’ image widths.

Possible values include:

| Value | Fetches assets…
| - | -
| `100` | with a width of 100.
| `'>= 100'` | with a width of at least 100.
| `['>= 100', '<= 1000']` | with a width between 100 and 1,000.



::: code
```twig
{# Fetch XL images #}
{% set assets = craft.assets()
  .kind('image')
  .width('>= 1000')
  .all() %}
```

```php
// Fetch XL images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->width('>= 1000')
    ->all();
```
:::


#### `with`

Causes the query to return matching assets eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch assets eager-loaded with the "Related" field’s relations #}
{% set assets = craft.assets()
  .with(['related'])
  .all() %}
```

```php
// Fetch assets eager-loaded with the "Related" field’s relations
$assets = \craft\elements\Asset::find()
    ->with(['related'])
    ->all();
```
:::


#### `withTransforms`

Causes the query to return matching assets eager-loaded with image transform indexes.

This can improve performance when displaying several image transforms at once, if the transforms
have already been generated.

Transforms can be specified as their handle or an object that contains `width` and/or `height` properties.

You can include `srcset`-style sizes (e.g. `100w` or `2x`) following a normal transform definition, for example:

::: code

```twig
[{width: 1000, height: 600}, '1.5x', '2x', '3x']
```

```php
[['width' => 1000, 'height' => 600], '1.5x', '2x', '3x']
```

:::

When a `srcset`-style size is encountered, the preceding normal transform definition will be used as a
reference when determining the resulting transform dimensions.



::: code
```twig
{# Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded #}
{% set assets = craft.assets()
  .kind('image')
  .withTransforms(['thumbnail', 'hiResThumbnail'])
  .all() %}
```

```php
// Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->withTransforms(['thumbnail', 'hiResThumbnail'])
    ->all();
```
:::



<!-- END PARAMS -->
