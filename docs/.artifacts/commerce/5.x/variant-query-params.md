<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

## Variant Query Parameters

Variant queries support the following parameters:

<!-- BEGIN VARIANTQUERY_PARAMS -->



<!-- textlint-disable -->

| Param                                             | Description
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [afterPopulate](#variant-afterpopulate)           | Performs any post-population processing on elements.
| [andRelatedTo](#variant-andrelatedto)             | Narrows the query results to only variants that are related to certain other elements.
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


<!-- textlint-enable -->


<h4 id="variant-afterpopulate"><a href="#variant-afterpopulate" class="header-anchor">#</a> <code>afterPopulate</code></h4>

Performs any post-population processing on elements.










<h4 id="variant-andrelatedto"><a href="#variant-andrelatedto" class="header-anchor">#</a> <code>andRelatedTo</code></h4>

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


<h4 id="variant-asarray"><a href="#variant-asarray" class="header-anchor">#</a> <code>asArray</code></h4>

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

Enables query cache for this Query.










<h4 id="variant-clearcachedresult"><a href="#variant-clearcachedresult" class="header-anchor">#</a> <code>clearCachedResult</code></h4>

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






<h4 id="variant-datecreated"><a href="#variant-datecreated" class="header-anchor">#</a> <code>dateCreated</code></h4>

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

Causes the query to return matching variants as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v4/craft-services-elements.html#method-setplaceholderelement).










<h4 id="variant-inreverse"><a href="#variant-inreverse" class="header-anchor">#</a> <code>inReverse</code></h4>

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


<h4 id="variant-length"><a href="#variant-length" class="header-anchor">#</a> <code>length</code></h4>

Narrows the query results based on the variants’ length dimension.

Possible values include:

| Value | Fetches variants…
| - | -
| `100` | with a length of 100.
| `'>= 100'` | with a length of at least 100.
| `'< 100'` | with a length of less than 100.




<h4 id="variant-limit"><a href="#variant-limit" class="header-anchor">#</a> <code>limit</code></h4>

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



<!-- END VARIANTQUERY_PARAMS -->
