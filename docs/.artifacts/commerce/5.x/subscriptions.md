<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                           | Description
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [afterPopulate](#afterpopulate)                 | Performs any post-population processing on elements.
| [andNotRelatedTo](#andnotrelatedto)             | Narrows the query results to only subscriptions that are not related to certain other elements.
| [andRelatedTo](#andrelatedto)                   | Narrows the query results to only subscriptions that are related to certain other elements.
| [asArray](#asarray)                             | Causes the query to return matching subscriptions as arrays of data, rather than [Subscription](commerce5:craft\commerce\elements\Subscription) objects.
| [cache](#cache)                                 | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)         | Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).
| [dateCanceled](#datecanceled)                   | Narrows the query results based on the subscriptions’ cancellation date.
| [dateCreated](#datecreated)                     | Narrows the query results based on the subscriptions’ creation dates.
| [dateExpired](#dateexpired)                     | Narrows the query results based on the subscriptions’ expiration date.
| [dateSuspended](#datesuspended)                 | Narrows the query results based on the subscriptions’ suspension date.
| [dateUpdated](#dateupdated)                     | Narrows the query results based on the subscriptions’ last-updated dates.
| [eagerly](#eagerly)                             | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [fixedOrder](#fixedorder)                       | Causes the query results to be returned in the order specified by [id](#id).
| [gatewayId](#gatewayid)                         | Narrows the query results based on the gateway, per its ID.
| [getFieldLayouts](#getfieldlayouts)             | Returns the field layouts that could be associated with the resulting elements.
| [hasStarted](#hasstarted)                       | Narrows the query results to only subscriptions that have started.
| [id](#id)                                       | Narrows the query results based on the subscriptions’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)       | Causes the query to return matching subscriptions as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                           | Narrows the query results to only subscriptions that were involved in a bulk element operation.
| [inReverse](#inreverse)                         | Causes the query results to be returned in reverse order.
| [isCanceled](#iscanceled)                       | Narrows the query results to only subscriptions that are canceled.
| [isExpired](#isexpired)                         | Narrows the query results to only subscriptions that have expired.
| [isSuspended](#issuspended)                     | Narrows the query results to only subscriptions that are suspended.
| [language](#language)                           | Determines which site(s) the subscriptions should be queried in, based on their language.
| [limit](#limit)                                 | Determines the number of subscriptions that should be returned.
| [nextPaymentDate](#nextpaymentdate)             | Narrows the query results based on the subscriptions’ next payment dates.
| [notRelatedTo](#notrelatedto)                   | Narrows the query results to only subscriptions that are not related to certain other elements.
| [offset](#offset)                               | Determines how many subscriptions should be skipped in the results.
| [onTrial](#ontrial)                             | Narrows the query results to only subscriptions that are on trial.
| [orderBy](#orderby)                             | Determines the order that the subscriptions should be returned in. (If empty, defaults to `dateCreated DESC`.)
| [orderId](#orderid)                             | Narrows the query results based on the order, per its ID.
| [plan](#plan)                                   | Narrows the query results based on the subscription plan.
| [planId](#planid)                               | Narrows the query results based on the subscription plans’ IDs.
| [preferSites](#prefersites)                     | If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading)     | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)             | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [reference](#reference)                         | Narrows the query results based on the reference.
| [relatedTo](#relatedto)                         | Narrows the query results to only subscriptions that are related to certain other elements.
| [render](#render)                               | Executes the query and renders the resulting elements using their partial templates.
| [search](#search)                               | Narrows the query results to only subscriptions that match a search query.
| [siteSettingsId](#sitesettingsid)               | Narrows the query results based on the subscriptions’ IDs in the `elements_sites` table.
| [status](#status)                               | Narrows the query results based on the subscriptions’ statuses.
| [trashed](#trashed)                             | Narrows the query results to only subscriptions that have been soft-deleted.
| [trialDays](#trialdays)                         | Narrows the query results based on the number of trial days.
| [uid](#uid)                                     | Narrows the query results based on the subscriptions’ UIDs.
| [user](#user)                                   | Narrows the query results based on the subscriptions’ user accounts.
| [userId](#userid)                               | Narrows the query results based on the subscriptions’ user accounts’ IDs.
| [wasCountEagerLoaded](#wascounteagerloaded)     | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)               | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                                   | Causes the query to return matching subscriptions eager-loaded with related elements.
| [withCustomFields](#withcustomfields)           | Sets whether custom fields should be factored into the query.
| [withProvisionalDrafts](#withprovisionaldrafts) | Causes the query to return provisional drafts for the matching elements, when they exist for the current user.


<!-- textlint-enable -->


#### `afterPopulate`

Performs any post-population processing on elements.










#### `andNotRelatedTo`

Narrows the query results to only subscriptions that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all subscriptions that are related to myCategoryA and not myCategoryB #}
{% set subscriptions = craft.subscriptions()
  .relatedTo(myCategoryA)
  .andNotRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all subscriptions that are related to $myCategoryA and not $myCategoryB
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->relatedTo($myCategoryA)
    ->andNotRelatedTo($myCategoryB)
    ->all();
```
:::


#### `andRelatedTo`

Narrows the query results to only subscriptions that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all subscriptions that are related to myCategoryA and myCategoryB #}
{% set subscriptions = craft.subscriptions()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all subscriptions that are related to $myCategoryA and $myCategoryB
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching subscriptions as arrays of data, rather than [Subscription](commerce5:craft\commerce\elements\Subscription) objects.





::: code
```twig
{# Fetch subscriptions as arrays #}
{% set subscriptions = craft.subscriptions()
  .asArray()
  .all() %}
```

```php
// Fetch subscriptions as arrays
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).






#### `dateCanceled`

Narrows the query results based on the subscriptions’ cancellation date.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were canceled on or after 2018-04-01.
| `'< 2018-05-01'` | that were canceled before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were canceled between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch subscriptions that were canceled recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set subscriptions = craft.subscriptions()
  .dateCanceled(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch subscriptions that were canceled recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
    ->dateCanceled(">= {$aWeekAgo}")
    ->all();
```
:::


#### `dateCreated`

Narrows the query results based on the subscriptions’ creation dates.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch subscriptions created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set subscriptions = craft.subscriptions()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch subscriptions created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateExpired`

Narrows the query results based on the subscriptions’ expiration date.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that expired on or after 2018-04-01.
| `'< 2018-05-01'` | that expired before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that expired between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch subscriptions that expired recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set subscriptions = craft.subscriptions()
  .dateExpired(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch subscriptions that expired recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
    ->dateExpired(">= {$aWeekAgo}")
    ->all();
```
:::


#### `dateSuspended`

Narrows the query results based on the subscriptions’ suspension date.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were suspended on or after 2018-04-01.
| `'< 2018-05-01'` | that were suspended before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were suspended between 2018-04-01 and 2018-05-01.


::: code
```twig
{# Fetch subscriptions that were suspended recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set subscriptions = craft.subscriptions()
  .dateSuspended(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch subscriptions that were suspended recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
    ->dateSuspended(">= {$aWeekAgo}")
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the subscriptions’ last-updated dates.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch subscriptions updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set subscriptions = craft.subscriptions()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch subscriptions updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
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
{# Fetch subscriptions in a specific order #}
{% set subscriptions = craft.subscriptions()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch subscriptions in a specific order
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `gatewayId`

Narrows the query results based on the gateway, per its ID.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with a gateway with an ID of 1.
| `'not 1'` | not with a gateway with an ID of 1.
| `[1, 2]` | with a gateway with an ID of 1 or 2.
| `['not', 1, 2]` | not with a gateway with an ID of 1 or 2.




#### `getFieldLayouts`

Returns the field layouts that could be associated with the resulting elements.










#### `hasStarted`

Narrows the query results to only subscriptions that have started.



::: code
```twig
{# Fetch started subscriptions #}
{% set subscriptions = craft.subscriptions()
  .hasStarted()
  .all() %}
```

```php
// Fetch started subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->hasStarted()
    ->all();
```
:::


#### `id`

Narrows the query results based on the subscriptions’ IDs.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the subscription by its ID #}
{% set subscription = craft.subscriptions()
  .id(1)
  .one() %}
```

```php
// Fetch the subscription by its ID
$subscription = \craft\commerce\elements\Subscription::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching subscriptions as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only subscriptions that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch subscriptions in reverse #}
{% set subscriptions = craft.subscriptions()
  .inReverse()
  .all() %}
```

```php
// Fetch subscriptions in reverse
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->inReverse()
    ->all();
```
:::


#### `isCanceled`

Narrows the query results to only subscriptions that are canceled.



::: code
```twig
{# Fetch canceled subscriptions #}
{% set subscriptions = craft.subscriptions()
  .isCanceled()
  .all() %}
```

```php
// Fetch canceled subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->isCanceled()
    ->all();
```
:::


#### `isExpired`

Narrows the query results to only subscriptions that have expired.



::: code
```twig
{# Fetch expired subscriptions #}
{% set subscriptions = craft.subscriptions()
  .isExpired()
  .all() %}
```

```php
// Fetch expired subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->isExpired()
    ->all();
```
:::


#### `isSuspended`

Narrows the query results to only subscriptions that are suspended.



::: code
```twig
{# Fetch suspended subscriptions #}
{% set subscriptions = craft.subscriptions()
  .isSuspended()
  .all() %}
```

```php
// Fetch suspended subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->isSuspended()
    ->all();
```
:::


#### `language`

Determines which site(s) the subscriptions should be queried in, based on their language.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'en'` | from sites with a language of `en`.
| `['en-GB', 'en-US']` | from sites with a language of `en-GB` or `en-US`.
| `['not', 'en-GB', 'en-US']` | not in sites with a language of `en-GB` or `en-US`.

::: tip
Elements that belong to multiple sites will be returned multiple times by default. If you
only want unique elements to be returned, use [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) in conjunction with this.
:::



::: code
```twig
{# Fetch subscriptions from English sites #}
{% set subscriptions = craft.subscriptions()
  .language('en')
  .all() %}
```

```php
// Fetch subscriptions from English sites
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

Determines the number of subscriptions that should be returned.



::: code
```twig
{# Fetch up to 10 subscriptions  #}
{% set subscriptions = craft.subscriptions()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->limit(10)
    ->all();
```
:::


#### `nextPaymentDate`

Narrows the query results based on the subscriptions’ next payment dates.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | with a next payment on or after 2018-04-01.
| `'< 2018-05-01'` | with a next payment before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | with a next payment between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch subscriptions with a payment due soon #}
{% set aWeekFromNow = date('+7 days')|atom %}

{% set subscriptions = craft.subscriptions()
  .nextPaymentDate("< #{aWeekFromNow}")
  .all() %}
```

```php
// Fetch subscriptions with a payment due soon
$aWeekFromNow = new \DateTime('+7 days')->format(\DateTime::ATOM);

$subscriptions = \craft\commerce\elements\Subscription::find()
    ->nextPaymentDate("< {$aWeekFromNow}")
    ->all();
```
:::


#### `notRelatedTo`

Narrows the query results to only subscriptions that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all subscriptions that are related to myEntry #}
{% set subscriptions = craft.subscriptions()
  .notRelatedTo(myEntry)
  .all() %}
```

```php
// Fetch all subscriptions that are related to $myEntry
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->notRelatedTo($myEntry)
    ->all();
```
:::


#### `offset`

Determines how many subscriptions should be skipped in the results.



::: code
```twig
{# Fetch all subscriptions except for the first 3 #}
{% set subscriptions = craft.subscriptions()
  .offset(3)
  .all() %}
```

```php
// Fetch all subscriptions except for the first 3
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->offset(3)
    ->all();
```
:::


#### `onTrial`

Narrows the query results to only subscriptions that are on trial.



::: code
```twig
{# Fetch trialed subscriptions #}
{% set subscriptions = craft.subscriptions()
  .onTrial()
  .all() %}
```

```php
// Fetch trialed subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->isPaid()
    ->all();
```
:::


#### `orderBy`

Determines the order that the subscriptions should be returned in. (If empty, defaults to `dateCreated DESC`.)



::: code
```twig
{# Fetch all subscriptions in order of date created #}
{% set subscriptions = craft.subscriptions()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all subscriptions in order of date created
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `orderId`

Narrows the query results based on the order, per its ID.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with an order with an ID of 1.
| `'not 1'` | not with an order with an ID of 1.
| `[1, 2]` | with an order with an ID of 1 or 2.
| `['not', 1, 2]` | not with an order with an ID of 1 or 2.




#### `plan`

Narrows the query results based on the subscription plan.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'foo'` | for a plan with a handle of `foo`.
| `['foo', 'bar']` | for plans with a handle of `foo` or `bar`.
| a [Plan](commerce5:craft\commerce\base\Plan) object | for a plan represented by the object.



::: code
```twig
{# Fetch Supporter plan subscriptions #}
{% set subscriptions = craft.subscriptions()
  .plan('supporter')
  .all() %}
```

```php
// Fetch Supporter plan subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->plan('supporter')
    ->all();
```
:::


#### `planId`

Narrows the query results based on the subscription plans’ IDs.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | for a plan with an ID of 1.
| `[1, 2]` | for plans with an ID of 1 or 2.
| `['not', 1, 2]` | for plans not with an ID of 1 or 2.




#### `preferSites`

If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique subscriptions from Site A, or Site B if they don’t exist in Site A #}
{% set subscriptions = craft.subscriptions()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique subscriptions from Site A, or Site B if they don’t exist in Site A
$subscriptions = \craft\commerce\elements\Subscription::find()
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






#### `reference`

Narrows the query results based on the reference.






#### `relatedTo`

Narrows the query results to only subscriptions that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all subscriptions that are related to myCategory #}
{% set subscriptions = craft.subscriptions()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all subscriptions that are related to $myCategory
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `search`

Narrows the query results to only subscriptions that match a search query.



See [Searching](https://craftcms.com/docs/5.x/system/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all subscriptions that match the search query #}
{% set subscriptions = craft.subscriptions()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all subscriptions that match the search query
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the subscriptions’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the subscription by its ID in the elements_sites table #}
{% set subscription = craft.subscriptions()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the subscription by its ID in the elements_sites table
$subscription = \craft\commerce\elements\Subscription::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `status`

Narrows the query results based on the subscriptions’ statuses.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'active'` _(default)_ | that are active.
| `'expired'` | that have expired.



::: code
```twig
{# Fetch expired subscriptions #}
{% set subscriptions = craft.subscriptions()
  .status('expired')
  .all() %}
```

```php
// Fetch expired subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->status('expired')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only subscriptions that have been soft-deleted.





::: code
```twig
{# Fetch trashed subscriptions #}
{% set subscriptions = craft.subscriptions()
  .trashed()
  .all() %}
```

```php
// Fetch trashed subscriptions
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->trashed()
    ->all();
```
:::


#### `trialDays`

Narrows the query results based on the number of trial days.






#### `uid`

Narrows the query results based on the subscriptions’ UIDs.





::: code
```twig
{# Fetch the subscription by its UID #}
{% set subscription = craft.subscriptions()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the subscription by its UID
$subscription = \craft\commerce\elements\Subscription::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `user`

Narrows the query results based on the subscriptions’ user accounts.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'foo'` | for a user account with a username of `foo`
| `['foo', 'bar']` | for user accounts with a username of `foo` or `bar`.
| a [User](https://docs.craftcms.com/api/v5/craft-elements-user.html) object | for a user account represented by the object.



::: code
```twig
{# Fetch the current user's subscriptions #}
{% set subscriptions = craft.subscriptions()
  .user(currentUser)
  .all() %}
```

```php
// Fetch the current user's subscriptions
$user = Craft::$app->user->getIdentity();
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->user($user)
    ->all();
```
:::


#### `userId`

Narrows the query results based on the subscriptions’ user accounts’ IDs.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | for a user account with an ID of 1.
| `[1, 2]` | for user accounts with an ID of 1 or 2.
| `['not', 1, 2]` | for user accounts not with an ID of 1 or 2.



::: code
```twig
{# Fetch the current user's subscriptions #}
{% set subscriptions = craft.subscriptions()
  .userId(currentUser.id)
  .all() %}
```

```php
// Fetch the current user's subscriptions
$user = Craft::$app->user->getIdentity();
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->userId($user->id)
    ->all();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

Causes the query to return matching subscriptions eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/5.x/development/eager-loading.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch subscriptions eager-loaded with the "Related" field’s relations #}
{% set subscriptions = craft.subscriptions()
  .with(['related'])
  .all() %}
```

```php
// Fetch subscriptions eager-loaded with the "Related" field’s relations
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->with(['related'])
    ->all();
```
:::


#### `withCustomFields`

Sets whether custom fields should be factored into the query.










#### `withProvisionalDrafts`

Causes the query to return provisional drafts for the matching elements,
when they exist for the current user.











<!-- END PARAMS -->
