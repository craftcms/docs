<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

## Product Query Parameters

Product queries support the following parameters:

<!-- BEGIN PRODUCTQUERY_PARAMS -->



<!-- textlint-disable -->

| Param                                                 | Description
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [after](#product-after)                               | Narrows the query results to only products that were posted on or after a certain date.
| [andRelatedTo](#product-andrelatedto)                 | Narrows the query results to only products that are related to certain other elements.
| [andWith](#product-andwith)                           | Causes the query to return matching products eager-loaded with related elements, in addition to the elements that were already specified by [with](#product-with).
| [asArray](#product-asarray)                           | Causes the query to return matching products as arrays of data, rather than [Product](commerce4:craft\commerce\elements\Product) objects.
| [availableForPurchase](#product-availableforpurchase) | Narrows the query results to only products that are available for purchase.
| [before](#product-before)                             | Narrows the query results to only products that were posted before a certain date.
| [cache](#product-cache)                               | Enables query cache for this Query.
| [clearCachedResult](#product-clearcachedresult)       | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#product-datecreated)                   | Narrows the query results based on the products’ creation dates.
| [dateUpdated](#product-dateupdated)                   | Narrows the query results based on the products’ last-updated dates.
| [defaultHeight](#product-defaultheight)               | Narrows the query results based on the products’ default variant height dimension IDs.
| [defaultLength](#product-defaultlength)               | Narrows the query results based on the products’ default variant length dimension IDs.
| [defaultPrice](#product-defaultprice)                 | Narrows the query results based on the products’ default variant price.
| [defaultSku](#product-defaultsku)                     | Narrows the query results based on the default productvariants defaultSku
| [defaultWeight](#product-defaultweight)               | Narrows the query results based on the products’ default variant weight dimension IDs.
| [defaultWidth](#product-defaultwidth)                 | Narrows the query results based on the products’ default variant width dimension IDs.
| [expiryDate](#product-expirydate)                     | Narrows the query results based on the products’ expiry dates.
| [fixedOrder](#product-fixedorder)                     | Causes the query results to be returned in the order specified by [id](#product-id).
| [hasVariant](#product-hasvariant)                     | Narrows the query results to only products that have certain variants.
| [id](#product-id)                                     | Narrows the query results based on the products’ IDs.
| [ignorePlaceholders](#product-ignoreplaceholders)     | Causes the query to return matching products as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#product-inreverse)                       | Causes the query results to be returned in reverse order.
| [language](#product-language)                         | Determines which site(s) the products should be queried in, based on their language.
| [limit](#product-limit)                               | Determines the number of products that should be returned.
| [offset](#product-offset)                             | Determines how many products should be skipped in the results.
| [orderBy](#product-orderby)                           | Determines the order that the products should be returned in. (If empty, defaults to `postDate DESC`.)
| [postDate](#product-postdate)                         | Narrows the query results based on the products’ post dates.
| [preferSites](#product-prefersites)                   | If [unique](#product-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#product-preparesubquery)           | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#product-relatedto)                       | Narrows the query results to only products that are related to certain other elements.
| [search](#product-search)                             | Narrows the query results to only products that match a search query.
| [shippingCategory](#product-shippingcategory)         | Narrows the query results based on the products’ shipping category.
| [shippingCategoryId](#product-shippingcategoryid)     | Narrows the query results based on the products’ shipping categories, per the shipping categories’ IDs.
| [site](#product-site)                                 | Determines which site(s) the products should be queried in.
| [siteId](#product-siteid)                             | Determines which site(s) the products should be queried in, per the site’s ID.
| [siteSettingsId](#product-sitesettingsid)             | Narrows the query results based on the products’ IDs in the `elements_sites` table.
| [slug](#product-slug)                                 | Narrows the query results based on the products’ slugs.
| [status](#product-status)                             | Narrows the query results based on the products’ statuses.
| [taxCategory](#product-taxcategory)                   | Narrows the query results based on the products’ tax category.
| [taxCategoryId](#product-taxcategoryid)               | Narrows the query results based on the products’ tax categories, per the tax categories’ IDs.
| [title](#product-title)                               | Narrows the query results based on the products’ titles.
| [trashed](#product-trashed)                           | Narrows the query results to only products that have been soft-deleted.
| [type](#product-type)                                 | Narrows the query results based on the products’ types.
| [typeId](#product-typeid)                             | Narrows the query results based on the products’ types, per the types’ IDs.
| [uid](#product-uid)                                   | Narrows the query results based on the products’ UIDs.
| [unique](#product-unique)                             | Determines whether only elements with unique IDs should be returned by the query.
| [uri](#product-uri)                                   | Narrows the query results based on the products’ URIs.
| [with](#product-with)                                 | Causes the query to return matching products eager-loaded with related elements.
| [withCustomFields](#product-withcustomfields)         | Sets whether custom fields should be factored into the query.


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


<h4 id="product-andrelatedto"><a href="#product-andrelatedto" class="header-anchor">#</a> <code>andRelatedTo</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andrelatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-andwith"><a href="#product-andwith" class="header-anchor">#</a> <code>andWith</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andwith" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching products eager-loaded with related elements, in addition to the elements that were already specified by [with](#product-with).



.






<h4 id="product-asarray"><a href="#product-asarray" class="header-anchor">#</a> <code>asArray</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-asarray" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching products as arrays of data, rather than [Product](commerce4:craft\commerce\elements\Product) objects.





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


<h4 id="product-availableforpurchase"><a href="#product-availableforpurchase" class="header-anchor">#</a> <code>availableForPurchase</code></h4>


Narrows the query results to only products that are available for purchase.



::: code
```twig
{# Fetch products that are available for purchase #}
{% set products = craft.products()
  .availableForPurchase()
  .all() %}
```

```php
// Fetch products that are available for purchase
$products = \craft\commerce\elements\Product::find()
    ->availableForPurchase()
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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-cache" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Enables query cache for this Query.










<h4 id="product-clearcachedresult"><a href="#product-clearcachedresult" class="header-anchor">#</a> <code>clearCachedResult</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-clearcachedresult" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






<h4 id="product-datecreated"><a href="#product-datecreated" class="header-anchor">#</a> <code>dateCreated</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-datecreated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-dateupdated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-fixedorder" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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
| a [VariantQuery](commerce4:craft\commerce\elements\db\VariantQuery) object | with variants that match the query.




<h4 id="product-id"><a href="#product-id" class="header-anchor">#</a> <code>id</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-id" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-ignoreplaceholders" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching products as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










<h4 id="product-inreverse"><a href="#product-inreverse" class="header-anchor">#</a> <code>inReverse</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-inreverse" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-language" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#limit()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

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

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#offset()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-orderby" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-prefersites" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-preparesubquery"><a href="#product-preparesubquery" class="header-anchor">#</a> <code>prepareSubquery</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-preparesubquery" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Prepares the element query and returns its subquery (which determines what elements will be returned).






<h4 id="product-relatedto"><a href="#product-relatedto" class="header-anchor">#</a> <code>relatedTo</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-relatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-search"><a href="#product-search" class="header-anchor">#</a> <code>search</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-search" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-shippingcategory"><a href="#product-shippingcategory" class="header-anchor">#</a> <code>shippingCategory</code></h4>


Narrows the query results based on the products’ shipping category.

Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | of a shipping category with a handle of `foo`.
| `'not foo'` | not of a shipping category with a handle of `foo`.
| `['foo', 'bar']` | of a shipping category with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not of a shipping category with a handle of `foo` or `bar`.
| an [ShippingCategory](commerce4:craft\commerce\models\ShippingCategory) object | of a shipping category represented by the object.



::: code
```twig
{# Fetch products with a Foo shipping category #}
{% set products = craft.products()
  .shippingCategory('foo')
  .all() %}
```

```php
// Fetch products with a Foo shipping category
$products = \craft\commerce\elements\Product::find()
    ->shippingCategory('foo')
    ->all();
```
:::


<h4 id="product-shippingcategoryid"><a href="#product-shippingcategoryid" class="header-anchor">#</a> <code>shippingCategoryId</code></h4>


Narrows the query results based on the products’ shipping categories, per the shipping categories’ IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a shipping category with an ID of 1.
| `'not 1'` | not of a shipping category with an ID of 1.
| `[1, 2]` | of a shipping category with an ID of 1 or 2.
| `['not', 1, 2]` | not of a shipping category with an ID of 1 or 2.



::: code
```twig
{# Fetch products of the shipping category with an ID of 1 #}
{% set products = craft.products()
  .shippingCategoryId(1)
  .all() %}
```

```php
// Fetch products of the shipping category with an ID of 1
$products = \craft\commerce\elements\Product::find()
    ->shippingCategoryId(1)
    ->all();
```
:::


<h4 id="product-site"><a href="#product-site" class="header-anchor">#</a> <code>site</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-site" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines which site(s) the products should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](https://docs.craftcms.com/api/v4/craft-models-site.html) object | from the site represented by the object.
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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-siteid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-sitesettingsid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-slug" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-taxcategory"><a href="#product-taxcategory" class="header-anchor">#</a> <code>taxCategory</code></h4>


Narrows the query results based on the products’ tax category.

Possible values include:

| Value | Fetches products…
| - | -
| `'foo'` | of a tax category with a handle of `foo`.
| `'not foo'` | not of a tax category with a handle of `foo`.
| `['foo', 'bar']` | of a tax category with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not of a tax category with a handle of `foo` or `bar`.
| an [ShippingCategory](commerce4:craft\commerce\models\ShippingCategory) object | of a tax category represented by the object.



::: code
```twig
{# Fetch products with a Foo tax category #}
{% set products = craft.products()
  .taxCategory('foo')
  .all() %}
```

```php
// Fetch products with a Foo tax category
$products = \craft\commerce\elements\Product::find()
    ->taxCategory('foo')
    ->all();
```
:::


<h4 id="product-taxcategoryid"><a href="#product-taxcategoryid" class="header-anchor">#</a> <code>taxCategoryId</code></h4>


Narrows the query results based on the products’ tax categories, per the tax categories’ IDs.

Possible values include:

| Value | Fetches products…
| - | -
| `1` | of a tax category with an ID of 1.
| `'not 1'` | not of a tax category with an ID of 1.
| `[1, 2]` | of a tax category with an ID of 1 or 2.
| `['not', 1, 2]` | not of a tax category with an ID of 1 or 2.



::: code
```twig
{# Fetch products of the tax category with an ID of 1 #}
{% set products = craft.products()
  .taxCategoryId(1)
  .all() %}
```

```php
// Fetch products of the tax category with an ID of 1
$products = \craft\commerce\elements\Product::find()
    ->taxCategoryId(1)
    ->all();
```
:::


<h4 id="product-title"><a href="#product-title" class="header-anchor">#</a> <code>title</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-title" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-trashed" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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
| an [ProductType](commerce4:craft\commerce\models\ProductType) object | of a type represented by the object.



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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-uid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-uri" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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


<h4 id="product-with"><a href="#product-with" class="header-anchor">#</a> <code>with</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-with" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

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

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-withcustomfields" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Sets whether custom fields should be factored into the query.











<!-- END PRODUCTQUERY_PARAMS -->

## Variants

A variant describes the individual properties of a product as an item that may be purchased.

Those properties inclue a SKU, price, and dimensions. Even if a product doesn’t appear to have any variants in the control panel, it still uses one *default variant* behind the scenes.

Let’s compare examples of a single-variant an multi-variant product: a paperback book and a t-shirt.

A book sold in only one format does not have meaningful variations for the customer to choose, but it would still have a specific SKU, price, weight, and dimensions. A single, implicit default variant needs to exist and that’s what would be added to the cart.

A t-shirt, on the other hand, would have at least one variant for each available color and size combination. You wouldn’t sell the t-shirt without a specific color and size, so multiple variants would be necessary. If the shirt came in “small” and “large” sizes and “red” or “blue” colors, four unique variants could exist:

- small, red
- small, blue
- large, red
- large, blue

### Variant Properties

Each variant includes the following unique properties:

| Property      | Type                | Required?      |
| ------------- | ------------------- | -------------- |
| SKU           | string              | <check-mark /> |
| Price         | number              | <check-mark /> |
| Stock         | number or unlimited | <check-mark /> |
| Allowed Qty   | range               |                |
| Dimensions    | number (l × w × h)  |                |
| Weight        | number              |                |
| Related Sales | relationship (Sale) |                |

Each variant may also have any number of custom fields to allow other distinguishing traits.

Commerce does not automatically create every possible unique variant for you—that’s up to the store manager.

### Default Variant

Every product has a default variant. Whenever a product is created, a default variant will be created as well.

If a product type has multiple variants enabled, the author can choose which one should be used by default. Products that do not have multiple variants still have a default variant, but the author can’t add additional variants.

For a single-variant product, variant details are shown in a unified view with custom product fields:

![Stylized illustration of a single-variant product edit page, with custom product fields in a single content pane and fields like SKU in the sidebar details](./images/single-variant.png)

When a product supports multiple variants, the default variant will be identified in a **Variants** field where more variants can be added:

![Stylized illustration of a multi-variant product edit page, with an additional “Variants” tab that has a Matrix-like editor for multiple variants each having their own fields like SKU](./images/multi-variant.png)

### Variant Stock

Variants can have unlimited stock or a specific quantity.

A finite stock amount will automatically be reduced whenever someone completes an order, until the stock amount reaches zero. At that point the variant’s “Available for purchase” setting won’t be changed, but zero-stock variants cannot be added to a cart.

For returns or refunds that aren’t ultimately delivered to the customer, you’ll need to either manually update product stock or use [the `orderStatusChange` event](extend/events.md#orderstatuschange) to automate further stock adjustments.

## Querying Variants

You can fetch variants using **variant queries**.

::: code
```twig
{# Create a new variant query #}
{% set myVariantQuery = craft.variants() %}
```
```php
// Create a new variant query
$myVariantQuery = \craft\commerce\elements\Variant::find();
```
```graphql
# Create a new variant query
{
  variants {
    # ...
  }
}
```
:::

Once you’ve created a variant query, you can set [parameters](#variant-query-parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/4.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Variant](commerce4:craft\commerce\elements\Variant) objects will be returned.

You can also fetch only the number of items a query might return, which is better for performance when you don’t need the variant data.

::: code
```twig
{# Count all enabled variants #}
{% set myVariantCount = craft.variants()
    .status('enabled')
    .count() %}
```
```php
use craft\commerce\elements\Variant;

// Count all enabled variants
$myVariantCount = Variant::find()
    ->status(Variant::STATUS_ENABLED)
    ->count();
```
```graphql
# Count all enabled variants
{
  variantCount(status: "enabled")
}
```
:::

::: tip
See [Element Queries](https://craftcms.com/docs/4.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

### Example

We can display a specific variant by its ID in Twig by doing the following:

1. Create a variant query with `craft.variants()`.
2. Set the [`id`](#id) parameter on it.
3. Fetch the variant with `.one()`.
4. Output information about the variant as HTML.

```twig
{# Get the requested variant ID from the query string #}
{% set variantId = craft.app.request.getQueryParam('id') %}

{# Create a variant query with the 'id' parameter #}
{% set myVariantQuery = craft.variants()
    .id(variantId) %}

{# Fetch the variant #}
{% set variant = myVariantQuery.one() %}

{# Make sure it exists #}
{% if not variant %}
    {% exit 404 %}
{% endif %}

{# Display the variant #}
<h1>{{ variant.title }}</h1>
<!-- ... -->
```

Fetching the equivalent with GraphQL could look like this:

```graphql
# Fetch variant having ID = 46
{
  variants(id: 46) {
    title
  }
}
```

## Variant Query Parameters

Variant queries support the following parameters:

<!-- BEGIN VARIANTQUERY_PARAMS -->



<!-- textlint-disable -->

| Param                                             | Description
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [andRelatedTo](#variant-andrelatedto)             | Narrows the query results to only variants that are related to certain other elements.
| [andWith](#variant-andwith)                       | Causes the query to return matching variants eager-loaded with related elements, in addition to the elements that were already specified by [with](#variant-with).
| [asArray](#variant-asarray)                       | Causes the query to return matching variants as arrays of data, rather than [Variant](commerce4:craft\commerce\elements\Variant) objects.
| [cache](#variant-cache)                           | Enables query cache for this Query.
| [clearCachedResult](#variant-clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [dateCreated](#variant-datecreated)               | Narrows the query results based on the variants’ creation dates.
| [dateUpdated](#variant-dateupdated)               | Narrows the query results based on the variants’ last-updated dates.
| [fixedOrder](#variant-fixedorder)                 | Causes the query results to be returned in the order specified by [id](#variant-id).
| [hasProduct](#variant-hasproduct)                 | Narrows the query results to only variants for certain products.
| [hasSales](#variant-hassales)                     | Narrows the query results to only variants that are on sale.
| [hasStock](#variant-hasstock)                     | Narrows the query results to only variants that have stock.
| [hasUnlimitedStock](#variant-hasunlimitedstock)   | Narrows the query results to only variants that have been set to unlimited stock.
| [height](#variant-height)                         | Narrows the query results based on the variants’ height dimension.
| [id](#variant-id)                                 | Narrows the query results based on the variants’ IDs.
| [ignorePlaceholders](#variant-ignoreplaceholders) | Causes the query to return matching variants as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#variant-inreverse)                   | Causes the query results to be returned in reverse order.
| [isDefault](#variant-isdefault)                   | Narrows the query results to only default variants.
| [language](#variant-language)                     | Determines which site(s) the variants should be queried in, based on their language.
| [length](#variant-length)                         | Narrows the query results based on the variants’ length dimension.
| [limit](#variant-limit)                           | Determines the number of variants that should be returned.
| [maxQty](#variant-maxqty)                         | Narrows the query results based on the variants’ max quantity.
| [minQty](#variant-minqty)                         | Narrows the query results based on the variants’ min quantity.
| [offset](#variant-offset)                         | Determines how many variants should be skipped in the results.
| [orderBy](#variant-orderby)                       | Determines the order that the variants should be returned in. (If empty, defaults to `sortOrder ASC`.)
| [preferSites](#variant-prefersites)               | If [unique](#variant-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepareSubquery](#variant-preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [price](#variant-price)                           | Narrows the query results based on the variants’ price.
| [product](#variant-product)                       | Narrows the query results based on the variants’ product.
| [productId](#variant-productid)                   | Narrows the query results based on the variants’ products’ IDs.
| [relatedTo](#variant-relatedto)                   | Narrows the query results to only variants that are related to certain other elements.
| [search](#variant-search)                         | Narrows the query results to only variants that match a search query.
| [site](#variant-site)                             | Determines which site(s) the variants should be queried in.
| [siteId](#variant-siteid)                         |
| [siteSettingsId](#variant-sitesettingsid)         | Narrows the query results based on the variants’ IDs in the `elements_sites` table.
| [sku](#variant-sku)                               | Narrows the query results based on the variants’ SKUs.
| [status](#variant-status)                         |
| [stock](#variant-stock)                           | Narrows the query results based on the variants’ stock.
| [title](#variant-title)                           | Narrows the query results based on the variants’ titles.
| [trashed](#variant-trashed)                       | Narrows the query results to only variants that have been soft-deleted.
| [typeId](#variant-typeid)                         | Narrows the query results based on the variants’ product types, per their IDs.
| [uid](#variant-uid)                               | Narrows the query results based on the variants’ UIDs.
| [unique](#variant-unique)                         | Determines whether only elements with unique IDs should be returned by the query.
| [weight](#variant-weight)                         | Narrows the query results based on the variants’ weight dimension.
| [width](#variant-width)                           | Narrows the query results based on the variants’ width dimension.
| [with](#variant-with)                             | Causes the query to return matching variants eager-loaded with related elements.
| [withCustomFields](#variant-withcustomfields)     | Sets whether custom fields should be factored into the query.


<!-- textlint-enable -->


<h4 id="variant-andrelatedto"><a href="#variant-andrelatedto" class="header-anchor">#</a> <code>andRelatedTo</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andrelatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only variants that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all variants that are related to myCategoryA and myCategoryB #}
{% set variants = craft.variants()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all variants that are related to $myCategoryA and $myCategoryB
$variants = \craft\commerce\elements\Variant::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


<h4 id="variant-andwith"><a href="#variant-andwith" class="header-anchor">#</a> <code>andWith</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-andwith" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching variants eager-loaded with related elements, in addition to the elements that were already specified by [with](#variant-with).



.






<h4 id="variant-asarray"><a href="#variant-asarray" class="header-anchor">#</a> <code>asArray</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-asarray" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching variants as arrays of data, rather than [Variant](commerce4:craft\commerce\elements\Variant) objects.





::: code
```twig
{# Fetch variants as arrays #}
{% set variants = craft.variants()
  .asArray()
  .all() %}
```

```php
// Fetch variants as arrays
$variants = \craft\commerce\elements\Variant::find()
    ->asArray()
    ->all();
```
:::


<h4 id="variant-cache"><a href="#variant-cache" class="header-anchor">#</a> <code>cache</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-cache" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Enables query cache for this Query.










<h4 id="variant-clearcachedresult"><a href="#variant-clearcachedresult" class="header-anchor">#</a> <code>clearCachedResult</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-clearcachedresult" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






<h4 id="variant-datecreated"><a href="#variant-datecreated" class="header-anchor">#</a> <code>dateCreated</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-datecreated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ creation dates.



Possible values include:

| Value | Fetches variants…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch variants created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set variants = craft.variants()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch variants created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$variants = \craft\commerce\elements\Variant::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


<h4 id="variant-dateupdated"><a href="#variant-dateupdated" class="header-anchor">#</a> <code>dateUpdated</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-dateupdated" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ last-updated dates.



Possible values include:

| Value | Fetches variants…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch variants updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set variants = craft.variants()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch variants updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$variants = \craft\commerce\elements\Variant::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


<h4 id="variant-fixedorder"><a href="#variant-fixedorder" class="header-anchor">#</a> <code>fixedOrder</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-fixedorder" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query results to be returned in the order specified by [id](#variant-id).



::: tip
If no IDs were passed to [id](#variant-id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch variants in a specific order #}
{% set variants = craft.variants()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch variants in a specific order
$variants = \craft\commerce\elements\Variant::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


<h4 id="variant-hasproduct"><a href="#variant-hasproduct" class="header-anchor">#</a> <code>hasProduct</code></h4>


Narrows the query results to only variants for certain products.

Possible values include:

| Value | Fetches variants…
| - | -
| a [ProductQuery](commerce4:craft\commerce\elements\db\ProductQuery) object | for products that match the query.




<h4 id="variant-hassales"><a href="#variant-hassales" class="header-anchor">#</a> <code>hasSales</code></h4>


Narrows the query results to only variants that are on sale.

Possible values include:

| Value | Fetches variants…
| - | -
| `true` | on sale
| `false` | not on sale




<h4 id="variant-hasstock"><a href="#variant-hasstock" class="header-anchor">#</a> <code>hasStock</code></h4>


Narrows the query results to only variants that have stock.

Possible values include:

| Value | Fetches variants…
| - | -
| `true` | with stock.
| `false` | with no stock.




<h4 id="variant-hasunlimitedstock"><a href="#variant-hasunlimitedstock" class="header-anchor">#</a> <code>hasUnlimitedStock</code></h4>


Narrows the query results to only variants that have been set to unlimited stock.

Possible values include:

| Value | Fetches variants…
| - | -
| `true` | with unlimited stock checked.
| `false` | with unlimited stock not checked.




<h4 id="variant-height"><a href="#variant-height" class="header-anchor">#</a> <code>height</code></h4>


Narrows the query results based on the variants’ height dimension.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a height of 100.
| `'>= 100'` | with a height of at least 100.
| `'< 100'` | with a height of less than 100.




<h4 id="variant-id"><a href="#variant-id" class="header-anchor">#</a> <code>id</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-id" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ IDs.



Possible values include:

| Value | Fetches variants…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the variant by its ID #}
{% set variant = craft.variants()
  .id(1)
  .one() %}
```

```php
// Fetch the variant by its ID
$variant = \craft\commerce\elements\Variant::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#variant-fixedorder) if you want the results to be returned in a specific order.
:::


<h4 id="variant-ignoreplaceholders"><a href="#variant-ignoreplaceholders" class="header-anchor">#</a> <code>ignorePlaceholders</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-ignoreplaceholders" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching variants as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










<h4 id="variant-inreverse"><a href="#variant-inreverse" class="header-anchor">#</a> <code>inReverse</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-inreverse" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch variants in reverse #}
{% set variants = craft.variants()
  .inReverse()
  .all() %}
```

```php
// Fetch variants in reverse
$variants = \craft\commerce\elements\Variant::find()
    ->inReverse()
    ->all();
```
:::


<h4 id="variant-isdefault"><a href="#variant-isdefault" class="header-anchor">#</a> <code>isDefault</code></h4>


Narrows the query results to only default variants.



::: code
```twig
{# Fetch default variants #}
{% set variants = craft.variants()
  .isDefault()
  .all() %}
```

```php
// Fetch default variants
$variants = \craft\commerce\elements\Variant::find()
    ->isDefault()
    ->all();
```
:::


<h4 id="variant-language"><a href="#variant-language" class="header-anchor">#</a> <code>language</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-language" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines which site(s) the variants should be queried in, based on their language.



Possible values include:

| Value | Fetches variants…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique](#variant-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch variants from English sites #}
{% set variants = craft.variants()
  .language('en')
  .all() %}
```

```php
// Fetch variants from English sites
$variants = \craft\commerce\elements\Variant::find()
    ->language('en')
    ->all();
```
:::


<h4 id="variant-length"><a href="#variant-length" class="header-anchor">#</a> <code>length</code></h4>


Narrows the query results based on the variants’ length dimension.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a length of 100.
| `'>= 100'` | with a length of at least 100.
| `'< 100'` | with a length of less than 100.




<h4 id="variant-limit"><a href="#variant-limit" class="header-anchor">#</a> <code>limit</code></h4>

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#limit()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

Determines the number of variants that should be returned.



::: code
```twig
{# Fetch up to 10 variants  #}
{% set variants = craft.variants()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 variants
$variants = \craft\commerce\elements\Variant::find()
    ->limit(10)
    ->all();
```
:::


<h4 id="variant-maxqty"><a href="#variant-maxqty" class="header-anchor">#</a> <code>maxQty</code></h4>


Narrows the query results based on the variants’ max quantity.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a maxQty of 100.
| `'>= 100'` | with a maxQty of at least 100.
| `'< 100'` | with a maxQty of less than 100.




<h4 id="variant-minqty"><a href="#variant-minqty" class="header-anchor">#</a> <code>minQty</code></h4>


Narrows the query results based on the variants’ min quantity.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a minQty of 100.
| `'>= 100'` | with a minQty of at least 100.
| `'< 100'` | with a minQty of less than 100.




<h4 id="variant-offset"><a href="#variant-offset" class="header-anchor">#</a> <code>offset</code></h4>

<a class="ref-defined-by" href="https://www.yiiframework.com/doc/api/2.0/yii-db-querytrait#offset()-detail" target="_blank" rel="noopener noreferer">Defined by <code>yii\db\QueryTrait</code></a>

Determines how many variants should be skipped in the results.



::: code
```twig
{# Fetch all variants except for the first 3 #}
{% set variants = craft.variants()
  .offset(3)
  .all() %}
```

```php
// Fetch all variants except for the first 3
$variants = \craft\commerce\elements\Variant::find()
    ->offset(3)
    ->all();
```
:::


<h4 id="variant-orderby"><a href="#variant-orderby" class="header-anchor">#</a> <code>orderBy</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-orderby" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines the order that the variants should be returned in. (If empty, defaults to `sortOrder ASC`.)



::: code
```twig
{# Fetch all variants in order of date created #}
{% set variants = craft.variants()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all variants in order of date created
$variants = \craft\commerce\elements\Variant::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


<h4 id="variant-prefersites"><a href="#variant-prefersites" class="header-anchor">#</a> <code>preferSites</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-prefersites" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

If [unique](#variant-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique variants from Site A, or Site B if they don’t exist in Site A #}
{% set variants = craft.variants()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique variants from Site A, or Site B if they don’t exist in Site A
$variants = \craft\commerce\elements\Variant::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


<h4 id="variant-preparesubquery"><a href="#variant-preparesubquery" class="header-anchor">#</a> <code>prepareSubquery</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-preparesubquery" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Prepares the element query and returns its subquery (which determines what elements will be returned).






<h4 id="variant-price"><a href="#variant-price" class="header-anchor">#</a> <code>price</code></h4>


Narrows the query results based on the variants’ price.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a price of 100.
| `'>= 100'` | with a price of at least 100.
| `'< 100'` | with a price of less than 100.




<h4 id="variant-product"><a href="#variant-product" class="header-anchor">#</a> <code>product</code></h4>


Narrows the query results based on the variants’ product.

Possible values include:

| Value | Fetches variants…
| - | -
| a [Product](commerce4:craft\commerce\elements\Product) object | for a product represented by the object.




<h4 id="variant-productid"><a href="#variant-productid" class="header-anchor">#</a> <code>productId</code></h4>


Narrows the query results based on the variants’ products’ IDs.

Possible values include:

| Value | Fetches variants…
| - | -
| `1` | for a product with an ID of 1.
| `[1, 2]` | for product with an ID of 1 or 2.
| `['not', 1, 2]` | for product not with an ID of 1 or 2.




<h4 id="variant-relatedto"><a href="#variant-relatedto" class="header-anchor">#</a> <code>relatedTo</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-relatedto" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only variants that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all variants that are related to myCategory #}
{% set variants = craft.variants()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all variants that are related to $myCategory
$variants = \craft\commerce\elements\Variant::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


<h4 id="variant-search"><a href="#variant-search" class="header-anchor">#</a> <code>search</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-search" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only variants that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all variants that match the search query #}
{% set variants = craft.variants()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all variants that match the search query
$variants = \craft\commerce\elements\Variant::find()
    ->search($searchQuery)
    ->all();
```
:::


<h4 id="variant-site"><a href="#variant-site" class="header-anchor">#</a> <code>site</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-site" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines which site(s) the variants should be queried in.



The current site will be used by default.

Possible values include:

| Value | Fetches variants…
| - | -
| `'foo'` | from the site with a handle of `foo`.
| `['foo', 'bar']` | from a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a site with a handle of `foo` or `bar`.
| a [craft\models\Site](https://docs.craftcms.com/api/v4/craft-models-site.html) object | from the site represented by the object.
| `'*'` | from any site.

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you
only want unique elements to be returned, use [unique](#variant-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch variants from the Foo site #}
{% set variants = craft.variants()
  .site('foo')
  .all() %}
```

```php
// Fetch variants from the Foo site
$variants = \craft\commerce\elements\Variant::find()
    ->site('foo')
    ->all();
```
:::


<h4 id="variant-siteid"><a href="#variant-siteid" class="header-anchor">#</a> <code>siteId</code></h4>









<h4 id="variant-sitesettingsid"><a href="#variant-sitesettingsid" class="header-anchor">#</a> <code>siteSettingsId</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-sitesettingsid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches variants…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the variant by its ID in the elements_sites table #}
{% set variant = craft.variants()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the variant by its ID in the elements_sites table
$variant = \craft\commerce\elements\Variant::find()
    ->siteSettingsId(1)
    ->one();
```
:::


<h4 id="variant-sku"><a href="#variant-sku" class="header-anchor">#</a> <code>sku</code></h4>


Narrows the query results based on the variants’ SKUs.

Possible values include:

| Value | Fetches variants…
| - | -
| `'foo'` | with a SKU of `foo`.
| `'foo*'` | with a SKU that begins with `foo`.
| `'*foo'` | with a SKU that ends with `foo`.
| `'*foo*'` | with a SKU that contains `foo`.
| `'not *foo*'` | with a SKU that doesn’t contain `foo`.
| `['*foo*', '*bar*'` | with a SKU that contains `foo` or `bar`.
| `['not', '*foo*', '*bar*']` | with a SKU that doesn’t contain `foo` or `bar`.



::: code
```twig
{# Get the requested variant SKU from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the variant with that slug #}
{% set variant = craft.variants()
  .sku(requestedSlug|literal)
  .one() %}
```

```php
// Get the requested variant SKU from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the variant with that slug
$variant = \craft\commerce\elements\Variant::find()
    ->sku(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


<h4 id="variant-status"><a href="#variant-status" class="header-anchor">#</a> <code>status</code></h4>









<h4 id="variant-stock"><a href="#variant-stock" class="header-anchor">#</a> <code>stock</code></h4>


Narrows the query results based on the variants’ stock.

Possible values include:

| Value | Fetches variants…
| - | -
| `0` | with no stock.
| `'>= 5'` | with a stock of at least 5.
| `'< 10'` | with a stock of less than 10.




<h4 id="variant-title"><a href="#variant-title" class="header-anchor">#</a> <code>title</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-title" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ titles.



Possible values include:

| Value | Fetches variants…
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
{# Fetch variants with a title that contains "Foo" #}
{% set variants = craft.variants()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch variants with a title that contains "Foo"
$variants = \craft\commerce\elements\Variant::find()
    ->title('*Foo*')
    ->all();
```
:::


<h4 id="variant-trashed"><a href="#variant-trashed" class="header-anchor">#</a> <code>trashed</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-trashed" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results to only variants that have been soft-deleted.





::: code
```twig
{# Fetch trashed variants #}
{% set variants = craft.variants()
  .trashed()
  .all() %}
```

```php
// Fetch trashed variants
$variants = \craft\commerce\elements\Variant::find()
    ->trashed()
    ->all();
```
:::


<h4 id="variant-typeid"><a href="#variant-typeid" class="header-anchor">#</a> <code>typeId</code></h4>


Narrows the query results based on the variants’ product types, per their IDs.

Possible values include:

| Value | Fetches variants…
| - | -
| `1` | for a product of a type with an ID of 1.
| `[1, 2]` | for product of a type with an ID of 1 or 2.
| `['not', 1, 2]` | for product of a type not with an ID of 1 or 2.




<h4 id="variant-uid"><a href="#variant-uid" class="header-anchor">#</a> <code>uid</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-uid" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Narrows the query results based on the variants’ UIDs.





::: code
```twig
{# Fetch the variant by its UID #}
{% set variant = craft.variants()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the variant by its UID
$variant = \craft\commerce\elements\Variant::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


<h4 id="variant-unique"><a href="#variant-unique" class="header-anchor">#</a> <code>unique</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-unique" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not
desired.



::: code
```twig
{# Fetch unique variants across all sites #}
{% set variants = craft.variants()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique variants across all sites
$variants = \craft\commerce\elements\Variant::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


<h4 id="variant-weight"><a href="#variant-weight" class="header-anchor">#</a> <code>weight</code></h4>


Narrows the query results based on the variants’ weight dimension.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a weight of 100.
| `'>= 100'` | with a weight of at least 100.
| `'< 100'` | with a weight of less than 100.




<h4 id="variant-width"><a href="#variant-width" class="header-anchor">#</a> <code>width</code></h4>


Narrows the query results based on the variants’ width dimension.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a width of 100.
| `'>= 100'` | with a width of at least 100.
| `'< 100'` | with a width of less than 100.




<h4 id="variant-with"><a href="#variant-with" class="header-anchor">#</a> <code>with</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-with" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Causes the query to return matching variants eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch variants eager-loaded with the "Related" field’s relations #}
{% set variants = craft.variants()
  .with(['related'])
  .all() %}
```

```php
// Fetch variants eager-loaded with the "Related" field’s relations
$variants = \craft\commerce\elements\Variant::find()
    ->with(['related'])
    ->all();
```
:::


<h4 id="variant-withcustomfields"><a href="#variant-withcustomfields" class="header-anchor">#</a> <code>withCustomFields</code></h4>

<a class="ref-defined-by" href="https://docs.craftcms.com/api/v4/craft-elements-db-elementquery.html#method-withcustomfields" target="_blank" rel="noopener noreferer">Defined by <code>craft\elements\db\ElementQuery</code></a>

Sets whether custom fields should be factored into the query.











<!-- END VARIANTQUERY_PARAMS -->
