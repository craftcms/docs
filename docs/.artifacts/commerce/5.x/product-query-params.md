<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

## Product Query Parameters

Product queries support the following parameters:

<!-- BEGIN PRODUCTQUERY_PARAMS -->



<!-- textlint-disable -->

| Param                                               | Description
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [after](#product-after)                             | Narrows the query results to only products that were posted on or after a certain date.
| [afterPopulate](#product-afterpopulate)             | Performs any post-population processing on elements.
| [andRelatedTo](#product-andrelatedto)               | Narrows the query results to only products that are related to certain other elements.
| [asArray](#product-asarray)                         | Causes the query to return matching products as arrays of data, rather than [Product](commerce5:craft\commerce\elements\Product) objects.
| [before](#product-before)                           | Narrows the query results to only products that were posted before a certain date.
| [cache](#product-cache)                             | Enables query cache for this Query.
| [clearCachedResult](#product-clearcachedresult)     | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#product-datecreated)                 | Narrows the query results based on the products’ creation dates.
| [dateUpdated](#product-dateupdated)                 | Narrows the query results based on the products’ last-updated dates.
| [defaultHeight](#product-defaultheight)             | Narrows the query results based on the products’ default variant height dimension IDs.
| [defaultLength](#product-defaultlength)             | Narrows the query results based on the products’ default variant length dimension IDs.
| [defaultPrice](#product-defaultprice)               | Narrows the query results based on the products’ default variant price.
| [defaultSku](#product-defaultsku)                   | Narrows the query results based on the default productvariants defaultSku
| [defaultWeight](#product-defaultweight)             | Narrows the query results based on the products’ default variant weight dimension IDs.
| [defaultWidth](#product-defaultwidth)               | Narrows the query results based on the products’ default variant width dimension IDs.
| [eagerly](#product-eagerly)                         | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [expiryDate](#product-expirydate)                   | Narrows the query results based on the products’ expiry dates.
| [fixedOrder](#product-fixedorder)                   | Causes the query results to be returned in the order specified by [id](#product-id).
| [hasVariant](#product-hasvariant)                   | Narrows the query results to only products that have certain variants.
| [id](#product-id)                                   | Narrows the query results based on the products’ IDs.
| [ignorePlaceholders](#product-ignoreplaceholders)   | Causes the query to return matching products as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#product-inbulkop)                       | Narrows the query results to only products that were involved in a bulk element operation.
| [inReverse](#product-inreverse)                     | Causes the query results to be returned in reverse order.
| [language](#product-language)                       | Determines which site(s) the products should be queried in, based on their language.
| [limit](#product-limit)                             | Determines the number of products that should be returned.
| [offset](#product-offset)                           | Determines how many products should be skipped in the results.
| [orderBy](#product-orderby)                         | Determines the order that the products should be returned in. (If empty, defaults to `postDate DESC`.)
| [postDate](#product-postdate)                       | Narrows the query results based on the products’ post dates.
| [preferSites](#product-prefersites)                 | If [unique](#product-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#product-prepforeagerloading) | Prepares the query for lazy eager loading.
| [prepareSubquery](#product-preparesubquery)         | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#product-relatedto)                     | Narrows the query results to only products that are related to certain other elements.
| [render](#product-render)                           | Executes the query and renders the resulting elements using their partial templates.
| [search](#product-search)                           | Narrows the query results to only products that match a search query.
| [site](#product-site)                               | Determines which site(s) the products should be queried in.
| [siteId](#product-siteid)                           | Determines which site(s) the products should be queried in, per the site’s ID.
| [siteSettingsId](#product-sitesettingsid)           | Narrows the query results based on the products’ IDs in the `elements_sites` table.
| [slug](#product-slug)                               | Narrows the query results based on the products’ slugs.
| [status](#product-status)                           | Narrows the query results based on the products’ statuses.
| [title](#product-title)                             | Narrows the query results based on the products’ titles.
| [trashed](#product-trashed)                         | Narrows the query results to only products that have been soft-deleted.
| [type](#product-type)                               | Narrows the query results based on the products’ types.
| [typeId](#product-typeid)                           | Narrows the query results based on the products’ types, per the types’ IDs.
| [uid](#product-uid)                                 | Narrows the query results based on the products’ UIDs.
| [unique](#product-unique)                           | Determines whether only elements with unique IDs should be returned by the query.
| [uri](#product-uri)                                 | Narrows the query results based on the products’ URIs.
| [wasCountEagerLoaded](#product-wascounteagerloaded) | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#product-waseagerloaded)           | Returns whether the query results were already eager loaded by the query's source element.
| [with](#product-with)                               | Causes the query to return matching products eager-loaded with related elements.
| [withCustomFields](#product-withcustomfields)       | Sets whether custom fields should be factored into the query.


<!-- textlint-enable -->


<h4 id="product-after"><a href="#product-after" class="header-anchor">#</a> <code>after</code></h4>

Narrows the query results to only products that were posted on or after a certain date.

Possible values include:

| Value | Fetches products…
| - | -
| `'2018-04-01'` | that were posted after 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted after the date represented by the object.



::: code
```twig
{# Fetch products posted this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set products = craft.products()
  .after(firstDayOfMonth)
  .all() %}
```

```php
// Fetch products posted this month
$firstDayOfMonth = new \DateTime('first day of this month');

$products = \craft\commerce\elements\Product::find()
    ->after($firstDayOfMonth)
    ->all();
```
:::


<h4 id="product-afterpopulate"><a href="#product-afterpopulate" class="header-anchor">#</a> <code>afterPopulate</code></h4>

Performs any post-population processing on elements.










<h4 id="product-andrelatedto"><a href="#product-andrelatedto" class="header-anchor">#</a> <code>andRelatedTo</code></h4>

Narrows the query results to only products that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all products that are related to myCategoryA and myCategoryB #}
{% set products = craft.products()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all products that are related to $myCategoryA and $myCategoryB
$products = \craft\commerce\elements\Product::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


<h4 id="product-asarray"><a href="#product-asarray" class="header-anchor">#</a> <code>asArray</code></h4>

Causes the query to return matching products as arrays of data, rather than [Product](commerce5:craft\commerce\elements\Product) objects.





::: code
```twig
{# Fetch products as arrays #}
{% set products = craft.products()
  .asArray()
  .all() %}
```

```php
// Fetch products as arrays
$products = \craft\commerce\elements\Product::find()
    ->asArray()
    ->all();
```
:::


<h4 id="product-before"><a href="#product-before" class="header-anchor">#</a> <code>before</code></h4>

Narrows the query results to only products that were posted before a certain date.

Possible values include:

| Value | Fetches products…
| - | -
| `'2018-04-01'` | that were posted before 2018-04-01.
| a [DateTime](https://php.net/class.datetime) object | that were posted before the date represented by the object.



::: code
```twig
{# Fetch products posted before this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set products = craft.products()
  .before(firstDayOfMonth)
  .all() %}
```

```php
// Fetch products posted before this month
$firstDayOfMonth = new \DateTime('first day of this month');

$products = \craft\commerce\elements\Product::find()
    ->before($firstDayOfMonth)
    ->all();
```
:::


<h4 id="product-cache"><a href="#product-cache" class="header-anchor">#</a> <code>cache</code></h4>

Enables query cache for this Query.










<h4 id="product-clearcachedresult"><a href="#product-clearcachedresult" class="header-anchor">#</a> <code>clearCachedResult</code></h4>

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






<h4 id="product-datecreated"><a href="#product-datecreated" class="header-anchor">#</a> <code>dateCreated</code></h4>

Narrows the query results based on the products’ creation dates.



Possible values include:

| Value | Fetches products…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch products created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set products = craft.products()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch products created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$products = \craft\commerce\elements\Product::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


<h4 id="product-dateupdated"><a href="#product-dateupdated" class="header-anchor">#</a> <code>dateUpdated</code></h4>

Narrows the query results based on the products’ last-updated dates.



Possible values include:

| Value | Fetches products…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch products updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set products = craft.products()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch products updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$products = \craft\commerce\elements\Product::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


<h4 id="product-defaultheight"><a href="#product-defaultheight" class="header-anchor">#</a> <code>defaultHeight</code></h4>

Narrows the query results based on the products’ default variant height dimension IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a type with a dimension of 1.
| `'not 1'` | not a dimension of 1.
| `[1, 2]` | of a a dimension 1 or 2.
| `['and', '>= ' ~ 100, '<= ' ~ 2000]` | of a dimension between 100 and 2000



::: code
```twig
{# Fetch products of the product default dimension of 1 #}
{% set products = craft.products()
  .defaultHeight(1)
  .all() %}
```

```php
// Fetch products of the product default dimension of 1
$products = \craft\commerce\elements\Product::find()
    ->defaultHeight(1)
    ->all();
```
:::


<h4 id="product-defaultlength"><a href="#product-defaultlength" class="header-anchor">#</a> <code>defaultLength</code></h4>

Narrows the query results based on the products’ default variant length dimension IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a type with a dimension of 1.
| `'not 1'` | not a dimension of 1.
| `[1, 2]` | of a a dimension 1 or 2.
| `['and', '>= ' ~ 100, '<= ' ~ 2000]` | of a dimension between 100 and 2000



::: code
```twig
{# Fetch products of the product default dimension of 1 #}
{% set products = craft.products()
  .defaultLength(1)
  .all() %}
```

```php
// Fetch products of the  product default dimension of 1
$products = \craft\commerce\elements\Product::find()
    ->defaultLength(1)
    ->all();
```
:::


<h4 id="product-defaultprice"><a href="#product-defaultprice" class="header-anchor">#</a> <code>defaultPrice</code></h4>

Narrows the query results based on the products’ default variant price.

Possible values include:

| Value | Fetches products…
| - | -
| `10` | of a price of 10.
| `['and', '>= ' ~ 100, '<= ' ~ 2000]` | of a default variant price between 100 and 2000



::: code
```twig
{# Fetch products of the product type with an ID of 1 #}
{% set products = craft.products()
  .defaultPrice(1)
  .all() %}
```

```php
// Fetch products of the product type with an ID of 1
$products = \craft\commerce\elements\Product::find()
    ->defaultPrice(1)
    ->all();
```
:::


<h4 id="product-defaultsku"><a href="#product-defaultsku" class="header-anchor">#</a> <code>defaultSku</code></h4>

Narrows the query results based on the default productvariants defaultSku

Possible values include:

| Value | Fetches products…
| - | -
| `xxx-001` | of products default SKU of `xxx-001`.
| `'not xxx-001'` | not a default SKU of `xxx-001`.
| `['not xxx-001', 'not xxx-002']` | of a default SKU of xxx-001 or xxx-002.
| `['not', `xxx-001`, `xxx-002`]` | not a product default SKU of `xxx-001` or `xxx-001`.



::: code
```twig
{# Fetch products of the product default SKU of `xxx-001` #}
{% set products = craft.products()
  .defaultSku('xxx-001')
  .all() %}
```

```php
// Fetch products  of the product default SKU of `xxx-001`
$products = \craft\commerce\elements\Product::find()
    ->defaultSku('xxx-001')
    ->all();
```
:::


<h4 id="product-defaultweight"><a href="#product-defaultweight" class="header-anchor">#</a> <code>defaultWeight</code></h4>

Narrows the query results based on the products’ default variant weight dimension IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a type with a dimension of 1.
| `'not 1'` | not a dimension of 1.
| `[1, 2]` | of a a dimension 1 or 2.
| `['and', '>= ' ~ 100, '<= ' ~ 2000]` | of a dimension between 100 and 2000



::: code
```twig
{# Fetch products of the product default dimension of 1 #}
{% set products = craft.products()
  .defaultWeight(1)
  .all() %}
```

```php
// Fetch products of the  product default dimension of 1
$products = \craft\commerce\elements\Product::find()
    ->defaultWeight(1)
    ->all();
```
:::


<h4 id="product-defaultwidth"><a href="#product-defaultwidth" class="header-anchor">#</a> <code>defaultWidth</code></h4>

Narrows the query results based on the products’ default variant width dimension IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a type with a dimension of 1.
| `'not 1'` | not a dimension of 1.
| `[1, 2]` | of a a dimension 1 or 2.
| `['and', '>= ' ~ 100, '<= ' ~ 2000]` | of a dimension between 100 and 2000



::: code
```twig
{# Fetch products of the product default dimension of 1 #}
{% set products = craft.products()
  .defaultWidth(1)
  .all() %}
```

```php
// Fetch products of the  product default dimension of 1
$products = \craft\commerce\elements\Product::find()
    ->defaultWidth(1)
    ->all();
```
:::


<h4 id="product-eagerly"><a href="#product-eagerly" class="header-anchor">#</a> <code>eagerly</code></h4>

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










<h4 id="product-expirydate"><a href="#product-expirydate" class="header-anchor">#</a> <code>expiryDate</code></h4>

Narrows the query results based on the products’ expiry dates.

Possible values include:

| Value | Fetches products…
| - | -
| `'>= 2020-04-01'` | that will expire on or after 2020-04-01.
| `'< 2020-05-01'` | that will expire before 2020-05-01
| `['and', '>= 2020-04-04', '< 2020-05-01']` | that will expire between 2020-04-01 and 2020-05-01.



::: code
```twig
{# Fetch products expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set products = craft.products()
  .expiryDate("< #{nextMonth}")
  .all() %}
```

```php
// Fetch products expiring this month
$nextMonth = new \DateTime('first day of next month')->format(\DateTime::ATOM);

$products = \craft\commerce\elements\Product::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


<h4 id="product-fixedorder"><a href="#product-fixedorder" class="header-anchor">#</a> <code>fixedOrder</code></h4>

Causes the query results to be returned in the order specified by [id](#product-id).



::: tip
If no IDs were passed to [id](#product-id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch products in a specific order #}
{% set products = craft.products()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch products in a specific order
$products = \craft\commerce\elements\Product::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


<h4 id="product-hasvariant"><a href="#product-hasvariant" class="header-anchor">#</a> <code>hasVariant</code></h4>

Narrows the query results to only products that have certain variants.

Possible values include:

| Value | Fetches products…
| - | -
| a [VariantQuery](commerce5:craft\commerce\elements\db\VariantQuery) object | with variants that match the query.




<h4 id="product-id"><a href="#product-id" class="header-anchor">#</a> <code>id</code></h4>

Narrows the query results based on the products’ IDs.



Possible values include:

| Value | Fetches products…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the product by its ID #}
{% set product = craft.products()
  .id(1)
  .one() %}
```

```php
// Fetch the product by its ID
$product = \craft\commerce\elements\Product::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#product-fixedorder) if you want the results to be returned in a specific order.
:::


<h4 id="product-ignoreplaceholders"><a href="#product-ignoreplaceholders" class="header-anchor">#</a> <code>ignorePlaceholders</code></h4>

Causes the query to return matching products as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










<h4 id="product-inbulkop"><a href="#product-inbulkop" class="header-anchor">#</a> <code>inBulkOp</code></h4>

Narrows the query results to only products that were involved in a bulk element operation.










<h4 id="product-inreverse"><a href="#product-inreverse" class="header-anchor">#</a> <code>inReverse</code></h4>

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch products in reverse #}
{% set products = craft.products()
  .inReverse()
  .all() %}
```

```php
// Fetch products in reverse
$products = \craft\commerce\elements\Product::find()
    ->inReverse()
    ->all();
```
:::


<h4 id="product-language"><a href="#product-language" class="header-anchor">#</a> <code>language</code></h4>

Determines which site(s) the products should be queried in, based on their language.



Possible values include:

| Value | Fetches products…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique](#product-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch products from English sites #}
{% set products = craft.products()
  .language('en')
  .all() %}
```

```php
// Fetch products from English sites
$products = \craft\commerce\elements\Product::find()
    ->language('en')
    ->all();
```
:::


<h4 id="product-limit"><a href="#product-limit" class="header-anchor">#</a> <code>limit</code></h4>

Determines the number of products that should be returned.



::: code
```twig
{# Fetch up to 10 products  #}
{% set products = craft.products()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 products
$products = \craft\commerce\elements\Product::find()
    ->limit(10)
    ->all();
```
:::


<h4 id="product-offset"><a href="#product-offset" class="header-anchor">#</a> <code>offset</code></h4>

Determines how many products should be skipped in the results.



::: code
```twig
{# Fetch all products except for the first 3 #}
{% set products = craft.products()
  .offset(3)
  .all() %}
```

```php
// Fetch all products except for the first 3
$products = \craft\commerce\elements\Product::find()
    ->offset(3)
    ->all();
```
:::


<h4 id="product-orderby"><a href="#product-orderby" class="header-anchor">#</a> <code>orderBy</code></h4>

Determines the order that the products should be returned in. (If empty, defaults to `postDate DESC`.)



::: code
```twig
{# Fetch all products in order of date created #}
{% set products = craft.products()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all products in order of date created
$products = \craft\commerce\elements\Product::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


<h4 id="product-postdate"><a href="#product-postdate" class="header-anchor">#</a> <code>postDate</code></h4>

Narrows the query results based on the products’ post dates.

Possible values include:

| Value | Fetches products…
| - | -
| `'>= 2018-04-01'` | that were posted on or after 2018-04-01.
| `'< 2018-05-01'` | that were posted before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were posted between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch products posted last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set products = craft.products()
  .postDate(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch products posted last month
$start = new \DateTime('first day of next month')->format(\DateTime::ATOM);
$end = new \DateTime('first day of this month')->format(\DateTime::ATOM);

$products = \craft\commerce\elements\Product::find()
    ->postDate(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


<h4 id="product-prefersites"><a href="#product-prefersites" class="header-anchor">#</a> <code>preferSites</code></h4>

If [unique](#product-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique products from Site A, or Site B if they don’t exist in Site A #}
{% set products = craft.products()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique products from Site A, or Site B if they don’t exist in Site A
$products = \craft\commerce\elements\Product::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


<h4 id="product-prepforeagerloading"><a href="#product-prepforeagerloading" class="header-anchor">#</a> <code>prepForEagerLoading</code></h4>

Prepares the query for lazy eager loading.










<h4 id="product-preparesubquery"><a href="#product-preparesubquery" class="header-anchor">#</a> <code>prepareSubquery</code></h4>

Prepares the element query and returns its subquery (which determines what elements will be returned).






<h4 id="product-relatedto"><a href="#product-relatedto" class="header-anchor">#</a> <code>relatedTo</code></h4>

Narrows the query results to only products that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all products that are related to myCategory #}
{% set products = craft.products()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all products that are related to $myCategory
$products = \craft\commerce\elements\Product::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


<h4 id="product-render"><a href="#product-render" class="header-anchor">#</a> <code>render</code></h4>

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




<h4 id="product-search"><a href="#product-search" class="header-anchor">#</a> <code>search</code></h4>

Narrows the query results to only products that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all products that match the search query #}
{% set products = craft.products()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all products that match the search query
$products = \craft\commerce\elements\Product::find()
    ->search($searchQuery)
    ->all();
```
:::


<h4 id="product-site"><a href="#product-site" class="header-anchor">#</a> <code>site</code></h4>

Determines which site(s) the products should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](https://docs.craftcms.com/api/v5/craft-models-site.html) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#product-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch products from the Foo site #}
{% set products = craft.products()
  .site('foo')
  .all() %}
```

```php
// Fetch products from the Foo site
$products = \craft\commerce\elements\Product::find()
    ->site('foo')
    ->all();
```
:::


<h4 id="product-siteid"><a href="#product-siteid" class="header-anchor">#</a> <code>siteId</code></h4>

Determines which site(s) the products should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | from the site with an ID of `1`.
| `[1, 2]` | from a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`.
| `'*'` | from any site.



::: code
```twig
{# Fetch products from the site with an ID of 1 #}
{% set products = craft.products()
  .siteId(1)
  .all() %}
```

```php
// Fetch products from the site with an ID of 1
$products = \craft\commerce\elements\Product::find()
    ->siteId(1)
    ->all();
```
:::


<h4 id="product-sitesettingsid"><a href="#product-sitesettingsid" class="header-anchor">#</a> <code>siteSettingsId</code></h4>

Narrows the query results based on the products’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches products…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the product by its ID in the elements_sites table #}
{% set product = craft.products()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the product by its ID in the elements_sites table
$product = \craft\commerce\elements\Product::find()
    ->siteSettingsId(1)
    ->one();
```
:::


<h4 id="product-slug"><a href="#product-slug" class="header-anchor">#</a> <code>slug</code></h4>

Narrows the query results based on the products’ slugs.



Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | with a slug of `foo`.
| `'foo*'` | with a slug that begins with `foo`.
| `'*foo'` | with a slug that ends with `foo`.
| `'*foo*'` | with a slug that contains `foo`.
| `'not *foo*'` | with a slug that doesn’t contain `foo`.
| `['*foo*', '*bar*']` | with a slug that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested product slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the product with that slug #}
{% set product = craft.products()
  .slug(requestedSlug|literal)
  .one() %}
```

```php
// Get the requested product slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the product with that slug
$product = \craft\commerce\elements\Product::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


<h4 id="product-status"><a href="#product-status" class="header-anchor">#</a> <code>status</code></h4>

Narrows the query results based on the products’ statuses.

Possible values include:

| Value | Fetches products…
| - | -
| `'live'` _(default)_ | that are live.
| `'pending'` | that are pending (enabled with a Post Date in the future).
| `'expired'` | that are expired (enabled with an Expiry Date in the past).
| `'disabled'` | that are disabled.
| `['live', 'pending']` | that are live or pending.



::: code
```twig
{# Fetch disabled products #}
{% set products = craft.products()
  .status('disabled')
  .all() %}
```

```php
// Fetch disabled products
$products = \craft\commerce\elements\Product::find()
    ->status('disabled')
    ->all();
```
:::


<h4 id="product-title"><a href="#product-title" class="header-anchor">#</a> <code>title</code></h4>

Narrows the query results based on the products’ titles.



Possible values include:

| Value | Fetches products…
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
{# Fetch products with a title that contains "Foo" #}
{% set products = craft.products()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch products with a title that contains "Foo"
$products = \craft\commerce\elements\Product::find()
    ->title('*Foo*')
    ->all();
```
:::


<h4 id="product-trashed"><a href="#product-trashed" class="header-anchor">#</a> <code>trashed</code></h4>

Narrows the query results to only products that have been soft-deleted.





::: code
```twig
{# Fetch trashed products #}
{% set products = craft.products()
  .trashed()
  .all() %}
```

```php
// Fetch trashed products
$products = \craft\commerce\elements\Product::find()
    ->trashed()
    ->all();
```
:::


<h4 id="product-type"><a href="#product-type" class="header-anchor">#</a> <code>type</code></h4>

Narrows the query results based on the products’ types.

Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | of a type with a handle of `foo`.
| `'not foo'` | not of a type with a handle of `foo`.
| `['foo', 'bar']` | of a type with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not of a type with a handle of `foo` or `bar`.
| an [ProductType](commerce5:craft\commerce\models\ProductType) object | of a type represented by the object.



::: code
```twig
{# Fetch products with a Foo product type #}
{% set products = craft.products()
  .type('foo')
  .all() %}
```

```php
// Fetch products with a Foo product type
$products = \craft\commerce\elements\Product::find()
    ->type('foo')
    ->all();
```
:::


<h4 id="product-typeid"><a href="#product-typeid" class="header-anchor">#</a> <code>typeId</code></h4>

Narrows the query results based on the products’ types, per the types’ IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a type with an ID of 1.
| `'not 1'` | not of a type with an ID of 1.
| `[1, 2]` | of a type with an ID of 1 or 2.
| `['not', 1, 2]` | not of a type with an ID of 1 or 2.



::: code
```twig
{# Fetch products of the product type with an ID of 1 #}
{% set products = craft.products()
  .typeId(1)
  .all() %}
```

```php
// Fetch products of the product type with an ID of 1
$products = \craft\commerce\elements\Product::find()
    ->typeId(1)
    ->all();
```
:::


<h4 id="product-uid"><a href="#product-uid" class="header-anchor">#</a> <code>uid</code></h4>

Narrows the query results based on the products’ UIDs.





::: code
```twig
{# Fetch the product by its UID #}
{% set product = craft.products()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the product by its UID
$product = \craft\commerce\elements\Product::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


<h4 id="product-unique"><a href="#product-unique" class="header-anchor">#</a> <code>unique</code></h4>

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not
desired.



::: code
```twig
{# Fetch unique products across all sites #}
{% set products = craft.products()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique products across all sites
$products = \craft\commerce\elements\Product::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


<h4 id="product-uri"><a href="#product-uri" class="header-anchor">#</a> <code>uri</code></h4>

Narrows the query results based on the products’ URIs.



Possible values include:

| Value | Fetches products…
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

{# Fetch the product with that URI #}
{% set product = craft.products()
  .uri(requestedUri|literal)
  .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the product with that URI
$product = \craft\commerce\elements\Product::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


<h4 id="product-wascounteagerloaded"><a href="#product-wascounteagerloaded" class="header-anchor">#</a> <code>wasCountEagerLoaded</code></h4>

Returns whether the query result count was already eager loaded by the query's source element.










<h4 id="product-waseagerloaded"><a href="#product-waseagerloaded" class="header-anchor">#</a> <code>wasEagerLoaded</code></h4>

Returns whether the query results were already eager loaded by the query's source element.










<h4 id="product-with"><a href="#product-with" class="header-anchor">#</a> <code>with</code></h4>

Causes the query to return matching products eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch products eager-loaded with the "Related" field’s relations #}
{% set products = craft.products()
  .with(['related'])
  .all() %}
```

```php
// Fetch products eager-loaded with the "Related" field’s relations
$products = \craft\commerce\elements\Product::find()
    ->with(['related'])
    ->all();
```
:::


<h4 id="product-withcustomfields"><a href="#product-withcustomfields" class="header-anchor">#</a> <code>withCustomFields</code></h4>

Sets whether custom fields should be factored into the query.











<!-- END PRODUCTQUERY_PARAMS -->
