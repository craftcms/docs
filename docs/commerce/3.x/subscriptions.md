# Subscriptions

Subscriptions are handled by gateways. A payment gateway must handle subscription plan support in order to establish a Commerce subscription for a user.

Because not all gateways support subscriptions via API, Commerce does not allow creating new subscription plans on the gateway. Support for this must be added by a plugin.

Once you’ve added a payment gateway that supports subscriptions, you can then navigate to **Commerce** → **Settings** → **Subscription Plans** to set up subscription plans.

## Subscription Support Across Gateways

Currently, only the [Commerce Stripe gateway](https://plugins.craftcms.com/commerce-stripe) supports subscriptions. If you need subscriptions for another gateway that supports them, a plugin first must be created that implements that gateway.

## Subscription Statuses

Commerce has the following subscription statuses:

- `active` if a subscription is within a paid billing cycle, even if it’s set to cancel at the end of the current billing cycle.
- `canceled` if a subscription is outside of a paid billing cycle and was canceled by the user.
- `expired` if a subscription is outside of a paid billing cycle and was marked as such by the gateway, either because it exhausted a fixed number of billing cycles or a payment failed.
- `trial` if a subscription is within the set amount of trial days from the beginning of the subscription.

In case more than one subscription status could be applied, the order of precedence is `expired`, `canceled`, `trial` and `active`.

## Subscribing

You create a subscription by subscribing a user to a subscription plan. As you are subscribing a user, it is possible to pass parameters for the subscription. All subscription gateways must support a `trialDays` parameter at minimum.

## Changing a Subscription’s Plan

Depending on the gateway, it might be possible to switch subscription plans. Please consult the gateway plugin’s documentation to see if it supports changing a subscription plan.

## Canceling a Subscription

Depending on the gateway, canceling subscriptions supports different options. Please consult the gateway plugin’s documentation to see if it supports canceling a subscription.

## Deleting Subscriptions or Plans

### Gateways

Not all gateways permit deleting subscription plans. Some gateways allow it and preserve all existing subscriptions, while others do not. Regardless of individual gateway support, we recommended **against** deleting a subscription plan on the gateway because it might result in the loss of historical data.

### Commerce

Commerce will attempt to delete all local subscription plans when a gateway is deleted. If any subscription—even an expired one—exists for a given plan, deletion will be prevented. Likewise, Commerce will prevent deleting a user that has active or expired subscriptions.

## Querying Subscriptions

You can fetch subscriptions in your templates or PHP code using **subscription queries**.

::: code
```twig
{# Create a new subscription query #}
{% set mySubscriptionQuery = craft.subscriptions() %}
```
```php
// Create a new subscription query
$mySubscriptionQuery = \craft\commerce\elements\Subscription::find();
```
:::

Once you’ve created a subscription query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/3.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Subscription](commerce3:craft\commerce\elements\Subscription) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/3.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

### Example

We can display all of the current user’s subscriptions by doing the following:

1. Create a subscription query with `craft.subscriptions()`.
2. Set the [user](#user) parameter on it.
3. Fetch the subscriptions with `.all()`.
4. Loop through the subscriptions using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to output their HTML.

```twig
{# Make sure someone is logged in #}
{% requireLogin %}

{# Create a subscription query with the 'user' parameter #}
{% set mySubscriptionQuery = craft.subscriptions()
    .user(currentUser) %}

{# Fetch the subscriptions #}
{% set subscriptions = mySubscriptionQuery.all() %}

{# Display the subscriptions #}
{% for subscription in subscriptions %}
    <article>
        <h1><a href="{{ subscription.url }}">{{ subscription.title }}</a></h1>
        {{ subscription.summary }}
        <a href="{{ subscription.url }}">Learn more</a>
    </article>
{% endfor %}
```

### Parameters

Subscription queries support the following parameters:

<!-- BEGIN PARAMS -->

| Param                                     | Description
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [anyStatus](#anystatus)                   | Clears out the [status](#status) and [enabledForSite()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-enabledforsite) parameters.
| [asArray](#asarray)                       | Causes the query to return matching subscriptions as arrays of data, rather than [Subscription](commerce3:craft\commerce\elements\Subscription) objects.
| [clearCachedResult](#clearcachedresult)   | Clears the cached result.
| [dateCanceled](#datecanceled)             | Narrows the query results based on the subscriptions’ cancellation date.
| [dateCreated](#datecreated)               | Narrows the query results based on the subscriptions’ creation dates.
| [dateExpired](#dateexpired)               | Narrows the query results based on the subscriptions’ expiration date.
| [dateSuspended](#datesuspended)           | Narrows the query results based on the subscriptions’ suspension date.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the subscriptions’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [gatewayId](#gatewayid)                   | Narrows the query results based on the gateway, per its ID.
| [hasStarted](#hasstarted)                 | Narrows the query results to only subscriptions that have started.
| [id](#id)                                 | Narrows the query results based on the subscriptions’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching subscriptions as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [isCanceled](#iscanceled)                 | Narrows the query results to only subscriptions that are canceled.
| [isExpired](#isexpired)                   | Narrows the query results to only subscriptions that have expired.
| [isSuspended](#issuspended)               | Narrows the query results to only subscriptions that are suspended.
| [limit](#limit)                           | Determines the number of subscriptions that should be returned.
| [nextPaymentDate](#nextpaymentdate)       | Narrows the query results based on the subscriptions’ next payment dates.
| [offset](#offset)                         | Determines how many subscriptions should be skipped in the results.
| [onTrial](#ontrial)                       | Narrows the query results to only subscriptions that are on trial.
| [orderBy](#orderby)                       | Determines the order that the subscriptions should be returned in. (If empty, defaults to `dateCreated DESC`.)
| [orderId](#orderid)                       | Narrows the query results based on the order, per its ID.
| [plan](#plan)                             | Narrows the query results based on the subscription plan.
| [planId](#planid)                         | Narrows the query results based on the subscription plans’ IDs.
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [reference](#reference)                   | Narrows the query results based on the reference.
| [relatedTo](#relatedto)                   | Narrows the query results to only subscriptions that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only subscriptions that match a search query.
| [status](#status)                         | Narrows the query results based on the subscriptions’ statuses.
| [trashed](#trashed)                       | Narrows the query results to only subscriptions that have been soft-deleted.
| [trialDays](#trialdays)                   | Narrows the query results based on the number of trial days.
| [uid](#uid)                               | Narrows the query results based on the subscriptions’ UIDs.
| [user](#user)                             | Narrows the query results based on the subscriptions’ user accounts.
| [userId](#userid)                         | Narrows the query results based on the subscriptions’ user accounts’ IDs.
| [with](#with)                             | Causes the query to return matching subscriptions eager-loaded with related elements.

### `anyStatus`

Clears out the [status](#status) and [enabledForSite()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-enabledforsite) parameters.





::: code
```twig
{# Fetch all subscriptions, regardless of status #}
{% set subscriptions = craft.subscriptions()
    .anyStatus()
    .all() %}
```

```php
// Fetch all subscriptions, regardless of status
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->anyStatus()
    ->all();
```
:::


### `asArray`

Causes the query to return matching subscriptions as arrays of data, rather than [Subscription](commerce3:craft\commerce\elements\Subscription) objects.





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


### `clearCachedResult`

Clears the cached result.






### `dateCanceled`

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


### `dateCreated`

Narrows the query results based on the subscriptions’ creation dates.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.



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


### `dateExpired`

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


### `dateSuspended`

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


### `dateUpdated`

Narrows the query results based on the subscriptions’ last-updated dates.



Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.



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


### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





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


### `gatewayId`

Narrows the query results based on the gateway, per its ID.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with a gateway with an ID of 1.
| `'not 1'` | not with a gateway with an ID of 1.
| `[1, 2]` | with a gateway with an ID of 1 or 2.
| `['not', 1, 2]` | not with a gateway with an ID of 1 or 2.




### `hasStarted`

Narrows the query results to only subscriptions that have started.



::: code
```twig
{# Fetch started subscriptions #}
{% set subscriptions = {twig-function}
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


### `id`

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


### `ignorePlaceholders`

Causes the query to return matching subscriptions as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










### `inReverse`

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


### `isCanceled`

Narrows the query results to only subscriptions that are canceled.



::: code
```twig
{# Fetch canceled subscriptions #}
{% set subscriptions = {twig-function}
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


### `isExpired`

Narrows the query results to only subscriptions that have expired.



::: code
```twig
{# Fetch expired subscriptions #}
{% set subscriptions = {twig-function}
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


### `isSuspended`

Narrows the query results to only subscriptions that are suspended.



::: code
```twig
{# Fetch suspended subscriptions #}
{% set subscriptions = {twig-function}
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


### `limit`

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


### `nextPaymentDate`

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


### `offset`

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


### `onTrial`

Narrows the query results to only subscriptions that are on trial.



::: code
```twig
{# Fetch trialed subscriptions #}
{% set subscriptions = {twig-function}
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


### `orderBy`

Determines the order that the subscriptions should be returned in. (If empty, defaults to `dateCreated DESC`.)



::: code
```twig
{# Fetch all subscriptions in order of date created #}
{% set subscriptions = craft.subscriptions()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all subscriptions in order of date created
$subscriptions = \craft\commerce\elements\Subscription::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


### `orderId`

Narrows the query results based on the order, per its ID.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | with an order with an ID of 1.
| `'not 1'` | not with an order with an ID of 1.
| `[1, 2]` | with an order with an ID of 1 or 2.
| `['not', 1, 2]` | not with an order with an ID of 1 or 2.




### `plan`

Narrows the query results based on the subscription plan.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'foo'` | for a plan with a handle of `foo`.
| `['foo', 'bar']` | for plans with a handle of `foo` or `bar`.
| a [Plan](commerce3:craft\commerce\base\Plan) object | for a plan represented by the object.



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


### `planId`

Narrows the query results based on the subscription plans’ IDs.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `1` | for a plan with an ID of 1.
| `[1, 2]` | for plans with an ID of 1 or 2.
| `['not', 1, 2]` | for plans not with an ID of 1 or 2.




### `preferSites`

If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned
for Site B.

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


### `reference`

Narrows the query results based on the reference.






### `relatedTo`

Narrows the query results to only subscriptions that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



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


### `search`

Narrows the query results to only subscriptions that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



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


### `status`

Narrows the query results based on the subscriptions’ statuses.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'active'` _(default)_ | that are active.
| `'expired'` | that have expired.



::: code
```twig
{# Fetch expired subscriptions #}
{% set subscriptions = {twig-function}
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


### `trashed`

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


### `trialDays`

Narrows the query results based on the number of trial days.






### `uid`

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


### `user`

Narrows the query results based on the subscriptions’ user accounts.

Possible values include:

| Value | Fetches subscriptions…
| - | -
| `'foo'` | for a user account with a username of `foo`
| `['foo', 'bar']` | for user accounts with a username of `foo` or `bar`.
| a [User](https://docs.craftcms.com/api/v3/craft-elements-user.html) object | for a user account represented by the object.



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


### `userId`

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


### `with`

Causes the query to return matching subscriptions eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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



<!-- END PARAMS -->
