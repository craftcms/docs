<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                         | Description
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [addOrderBy](#addorderby)                     | Adds additional ORDER BY columns to the query.
| [afterPopulate](#afterpopulate)               | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)                 | Narrows the query results to only orders that are related to certain other elements.
| [asArray](#asarray)                           | Causes the query to return matching orders as arrays of data, rather than [Order](commerce5:craft\commerce\elements\Order) objects.
| [cache](#cache)                               | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)       | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [customer](#customer)                         | Narrows the query results based on the customer’s user account.
| [customerId](#customerid)                     | Narrows the query results based on the customer, per their user ID.
| [dateAuthorized](#dateauthorized)             | Narrows the query results based on the orders’ authorized dates.
| [dateCreated](#datecreated)                   | Narrows the query results based on the orders’ creation dates.
| [dateOrdered](#dateordered)                   | Narrows the query results based on the orders’ completion dates.
| [datePaid](#datepaid)                         | Narrows the query results based on the orders’ paid dates.
| [dateUpdated](#dateupdated)                   | Narrows the query results based on the orders’ last-updated dates.
| [eagerly](#eagerly)                           | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [email](#email)                               | Narrows the query results based on the customers’ email addresses.
| [expiryDate](#expirydate)                     | Narrows the query results based on the orders’ expiry dates.
| [fields](#fields)                             | Returns the list of fields that should be returned by default by [toArray()](https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail) when no specific fields are specified.
| [fixedOrder](#fixedorder)                     | Causes the query results to be returned in the order specified by [id](#id).
| [gateway](#gateway)                           | Narrows the query results based on the gateway.
| [gatewayId](#gatewayid)                       | Narrows the query results based on the gateway, per its ID.
| [hasLineItems](#haslineitems)                 | Narrows the query results to only orders that have line items.
| [hasPurchasables](#haspurchasables)           | Narrows the query results to only orders that have certain purchasables.
| [hasTransactions](#hastransactions)           | Narrows the query results to only carts that have at least one transaction.
| [id](#id)                                     |
| [ignorePlaceholders](#ignoreplaceholders)     | Causes the query to return matching orders as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                         | Narrows the query results to only orders that were involved in a bulk element operation.
| [inReverse](#inreverse)                       | Causes the query results to be returned in reverse order.
| [isCompleted](#iscompleted)                   | Narrows the query results to only orders that are completed.
| [isPaid](#ispaid)                             | Narrows the query results to only orders that are paid.
| [isUnpaid](#isunpaid)                         | Narrows the query results to only orders that are not paid.
| [itemSubtotal](#itemsubtotal)                 | Narrows the query results based on the order’s item subtotal.
| [itemTotal](#itemtotal)                       | Narrows the query results based on the order’s item total.
| [language](#language)                         | Determines which site(s) the orders should be queried in, based on their language.
| [limit](#limit)                               | Determines the number of orders that should be returned.
| [number](#number)                             | Narrows the query results based on the order number.
| [offset](#offset)                             | Determines how many orders should be skipped in the results.
| [orderBy](#orderby)                           | Determines the order that the orders should be returned in. (If empty, defaults to `id ASC`.)
| [orderLanguage](#orderlanguage)               | Narrows the query results based on the order language, per the language string provided.
| [orderSiteId](#ordersiteid)                   | Narrows the query results based on the order language, per the language string provided.
| [orderStatus](#orderstatus)                   | Narrows the query results based on the order statuses.
| [orderStatusId](#orderstatusid)               | Narrows the query results based on the order statuses, per their IDs.
| [origin](#origin)                             | Narrows the query results based on the origin.
| [preferSites](#prefersites)                   | If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading)   | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)           | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [reference](#reference)                       | Narrows the query results based on the order reference.
| [relatedTo](#relatedto)                       | Narrows the query results to only orders that are related to certain other elements.
| [render](#render)                             | Executes the query and renders the resulting elements using their partial templates.
| [search](#search)                             | Narrows the query results to only orders that match a search query.
| [shippingMethodHandle](#shippingmethodhandle) | Narrows the query results based on the shipping method handle.
| [shortNumber](#shortnumber)                   | Narrows the query results based on the order short number.
| [siteSettingsId](#sitesettingsid)             | Narrows the query results based on the orders’ IDs in the `elements_sites` table.
| [storeId](#storeid)                           | Narrows the query results to only orders that are related to the given store.
| [total](#total)                               | Narrows the query results based on the total.
| [totalDiscount](#totaldiscount)               | Narrows the query results based on the total discount.
| [totalPaid](#totalpaid)                       | Narrows the query results based on the total paid amount.
| [totalPrice](#totalprice)                     | Narrows the query results based on the total price.
| [totalQty](#totalqty)                         | Narrows the query results based on the total qty of items.
| [totalTax](#totaltax)                         | Narrows the query results based on the total tax.
| [totalWeight](#totalweight)                   | Narrows the query results based on the total weight of items.
| [trashed](#trashed)                           | Narrows the query results to only orders that have been soft-deleted.
| [uid](#uid)                                   | Narrows the query results based on the orders’ UIDs.
| [wasCountEagerLoaded](#wascounteagerloaded)   | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)             | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                                 | Causes the query to return matching orders eager-loaded with related elements.
| [withAddresses](#withaddresses)               | Eager loads the shipping and billing addressees on the resulting orders.
| [withAdjustments](#withadjustments)           | Eager loads the order adjustments on the resulting orders.
| [withAll](#withall)                           | Eager loads all relational data (addresses, adjustments, customers, line items, transactions) for the resulting orders.
| [withCustomer](#withcustomer)                 | Eager loads the user on the resulting orders.
| [withLineItems](#withlineitems)               | Eager loads the line items on the resulting orders.
| [withTransactions](#withtransactions)         | Eager loads the transactions on the resulting orders.


<!-- textlint-enable -->


#### `addOrderBy`

Adds additional ORDER BY columns to the query.










#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only orders that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all orders that are related to myCategoryA and myCategoryB #}
{% set orders = craft.orders()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all orders that are related to $myCategoryA and $myCategoryB
$orders = \craft\commerce\elements\Order::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching orders as arrays of data, rather than [Order](commerce5:craft\commerce\elements\Order) objects.





::: code
```twig
{# Fetch orders as arrays #}
{% set orders = craft.orders()
  .asArray()
  .all() %}
```

```php
// Fetch orders as arrays
$orders = \craft\commerce\elements\Order::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `customer`

Narrows the query results based on the customer’s user account.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with a customer with a user account ID of 1.
| a [User](https://docs.craftcms.com/api/v5/craft-elements-user.html) object | with a customer with a user account represented by the object.
| `'not 1'` | not the user account with an ID 1.
| `[1, 2]` | with an user account ID of 1 or 2.
| `['not', 1, 2]` | not with a user account ID of 1 or 2.



::: code
```twig
{# Fetch the current user's orders #}
{% set orders = craft.orders()
  .customer(currentUser)
  .all() %}
```

```php
// Fetch the current user's orders
$user = Craft::$app->user->getIdentity();
$orders = \craft\commerce\elements\Order::find()
    ->customer($user)
    ->all();
```
:::


#### `customerId`

Narrows the query results based on the customer, per their user ID.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with a user with an ID of 1.
| `'not 1'` | not with a user with an ID of 1.
| `[1, 2]` | with a user with an ID of 1 or 2.
| `['not', 1, 2]` | not with a user with an ID of 1 or 2.



::: code
```twig
{# Fetch the current user's orders #}
{% set orders = craft.orders()
  .customerId(currentUser.id)
  .all() %}
```

```php
// Fetch the current user's orders
$user = Craft::$app->user->getIdentity();
$orders = \craft\commerce\elements\Order::find()
    ->customerId($user->id)
    ->all();
```
:::


#### `dateAuthorized`

Narrows the query results based on the orders’ authorized dates.

Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2018-04-01'` | that were authorized on or after 2018-04-01.
| `'< 2018-05-01'` | that were authorized before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were completed between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch orders that were authorized recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set orders = craft.orders()
  .dateAuthorized(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch orders that were authorized recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->dateAuthorized(">= {$aWeekAgo}")
    ->all();
```
:::


#### `dateCreated`

Narrows the query results based on the orders’ creation dates.



Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch orders created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set orders = craft.orders()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch orders created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateOrdered`

Narrows the query results based on the orders’ completion dates.

Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2018-04-01'` | that were completed on or after 2018-04-01.
| `'< 2018-05-01'` | that were completed before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were completed between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch orders that were completed recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set orders = craft.orders()
  .dateOrdered(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch orders that were completed recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->dateOrdered(">= {$aWeekAgo}")
    ->all();
```
:::


#### `datePaid`

Narrows the query results based on the orders’ paid dates.

Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2018-04-01'` | that were paid on or after 2018-04-01.
| `'< 2018-05-01'` | that were paid before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were completed between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch orders that were paid for recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set orders = craft.orders()
  .datePaid(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch orders that were paid for recently
$aWeekAgo = new \DateTime('7 days ago')->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->datePaid(">= {$aWeekAgo}")
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the orders’ last-updated dates.



Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch orders updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set orders = craft.orders()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch orders updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `email`

Narrows the query results based on the customers’ email addresses.

Possible values include:

| Value | Fetches orders with customers…
| - | -
| `'foo@bar.baz'` | with an email of `foo@bar.baz`.
| `'not foo@bar.baz'` | not with an email of `foo@bar.baz`.
| `'*@bar.baz'` | with an email that ends with `@bar.baz`.



::: code
```twig
{# Fetch orders from customers with a .co.uk domain on their email address #}
{% set orders = craft.orders()
  .email('*.co.uk')
  .all() %}
```

```php
// Fetch orders from customers with a .co.uk domain on their email address
$orders = \craft\commerce\elements\Order::find()
    ->email('*.co.uk')
    ->all();
```
:::


#### `expiryDate`

Narrows the query results based on the orders’ expiry dates.

Possible values include:

| Value | Fetches orders…
| - | -
| `'>= 2020-04-01'` | that will expire on or after 2020-04-01.
| `'< 2020-05-01'` | that will expire before 2020-05-01
| `['and', '>= 2020-04-04', '< 2020-05-01']` | that will expire between 2020-04-01 and 2020-05-01.



::: code
```twig
{# Fetch orders expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set orders = craft.orders()
  .expiryDate("< #{nextMonth}")
  .all() %}
```

```php
// Fetch orders expiring this month
$nextMonth = new \DateTime('first day of next month')->format(\DateTime::ATOM);

$orders = \craft\commerce\elements\Order::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


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




#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch orders in a specific order #}
{% set orders = craft.orders()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch orders in a specific order
$orders = \craft\commerce\elements\Order::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `gateway`

Narrows the query results based on the gateway.

Possible values include:

| Value | Fetches orders…
| - | -
| a [Gateway](commerce5:craft\commerce\base\Gateway) object | with a gateway represented by the object.




#### `gatewayId`

Narrows the query results based on the gateway, per its ID.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with a gateway with an ID of 1.
| `'not 1'` | not with a gateway with an ID of 1.
| `[1, 2]` | with a gateway with an ID of 1 or 2.
| `['not', 1, 2]` | not with a gateway with an ID of 1 or 2.




#### `hasLineItems`

Narrows the query results to only orders that have line items.



::: code
```twig
{# Fetch orders that do or do not have line items #}
{% set orders = craft.orders()
  .hasLineItems()
  .all() %}
```

```php
// Fetch unpaid orders
$orders = \craft\commerce\elements\Order::find()
    ->hasLineItems()
    ->all();
```
:::


#### `hasPurchasables`

Narrows the query results to only orders that have certain purchasables.

Possible values include:

| Value | Fetches orders…
| - | -
| a [PurchasableInterface](commerce5:craft\commerce\base\PurchasableInterface) object | with a purchasable represented by the object.
| an array of [PurchasableInterface](commerce5:craft\commerce\base\PurchasableInterface) objects | with all the purchasables represented by the objects.




#### `hasTransactions`

Narrows the query results to only carts that have at least one transaction.



::: code
```twig
{# Fetch carts that have attempted payments #}
{% set orders = craft.orders()
  .hasTransactions()
  .all() %}
```

```php
// Fetch carts that have attempted payments
$orders = \craft\commerce\elements\Order::find()
    ->hasTransactions()
    ->all();
```
:::


#### `id`








#### `ignorePlaceholders`

Causes the query to return matching orders as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only orders that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch orders in reverse #}
{% set orders = craft.orders()
  .inReverse()
  .all() %}
```

```php
// Fetch orders in reverse
$orders = \craft\commerce\elements\Order::find()
    ->inReverse()
    ->all();
```
:::


#### `isCompleted`

Narrows the query results to only orders that are completed.



::: code
```twig
{# Fetch completed orders #}
{% set orders = craft.orders()
  .isCompleted()
  .all() %}
```

```php
// Fetch completed orders
$orders = \craft\commerce\elements\Order::find()
    ->isCompleted()
    ->all();
```
:::


#### `isPaid`

Narrows the query results to only orders that are paid.



::: code
```twig
{# Fetch paid orders #}
{% set orders = craft.orders()
  .isPaid()
  .all() %}
```

```php
// Fetch paid orders
$orders = \craft\commerce\elements\Order::find()
    ->isPaid()
    ->all();
```
:::


#### `isUnpaid`

Narrows the query results to only orders that are not paid.



::: code
```twig
{# Fetch unpaid orders #}
{% set orders = craft.orders()
  .isUnpaid()
  .all() %}
```

```php
// Fetch unpaid orders
$orders = \craft\commerce\elements\Order::find()
    ->isUnpaid()
    ->all();
```
:::


#### `itemSubtotal`

Narrows the query results based on the order’s item subtotal.

Possible values include:

| Value | Fetches orders…
| - | -
| `100` | with an item subtotal of 0.
| `'< 1000000'` | with an item subtotal of less than ,000,000.
| `['>= 10', '< 100']` | with an item subtotal of between  and 0.




#### `itemTotal`

Narrows the query results based on the order’s item total.

Possible values include:

| Value | Fetches orders…
| - | -
| `100` | with an item total of 0.
| `'< 1000000'` | with an item total of less than ,000,000.
| `['>= 10', '< 100']` | with an item total of between  and 0.




#### `language`

Determines which site(s) the orders should be queried in, based on their language.



Possible values include:

| Value | Fetches orders…
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
{# Fetch orders from English sites #}
{% set orders = craft.orders()
  .language('en')
  .all() %}
```

```php
// Fetch orders from English sites
$orders = \craft\commerce\elements\Order::find()
    ->language('en')
    ->all();
```
:::


#### `limit`

Determines the number of orders that should be returned.



::: code
```twig
{# Fetch up to 10 orders  #}
{% set orders = craft.orders()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 orders
$orders = \craft\commerce\elements\Order::find()
    ->limit(10)
    ->all();
```
:::


#### `number`

Narrows the query results based on the order number.

Possible values include:

| Value | Fetches orders…
| - | -
| `'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'` | with a matching order number



::: code
```twig
{# Fetch the requested order #}
{% set orderNumber = craft.app.request.getQueryParam('number') %}
{% set order = craft.orders()
  .number(orderNumber)
  .one() %}
```

```php
// Fetch the requested order
$orderNumber = Craft::$app->request->getQueryParam('number');
$order = \craft\commerce\elements\Order::find()
    ->number($orderNumber)
    ->one();
```
:::


#### `offset`

Determines how many orders should be skipped in the results.



::: code
```twig
{# Fetch all orders except for the first 3 #}
{% set orders = craft.orders()
  .offset(3)
  .all() %}
```

```php
// Fetch all orders except for the first 3
$orders = \craft\commerce\elements\Order::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the orders should be returned in. (If empty, defaults to `id ASC`.)



::: code
```twig
{# Fetch all orders in order of date created #}
{% set orders = craft.orders()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all orders in order of date created
$orders = \craft\commerce\elements\Order::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `orderLanguage`

Narrows the query results based on the order language, per the language string provided.

Possible values include:

| Value | Fetches orders…
| - | -
| `'en'` | with an order language that is `'en'`.
| `'not en'` | not with an order language that is not `'en'`.
| `['en', 'en-us']` | with an order language that is `'en'` or `'en-us'`.
| `['not', 'en']` | not with an order language that is not `'en'`.



::: code
```twig
{# Fetch orders with an order language that is `'en'` #}
{% set orders = craft.orders()
  .orderLanguage('en')
  .all() %}
```

```php
// Fetch orders with an order language that is `'en'`
$orders = \craft\commerce\elements\Order::find()
    ->orderLanguage('en')
    ->all();
```
:::


#### `orderSiteId`

Narrows the query results based on the order language, per the language string provided.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with an order site ID of 1.
| `'not 1'` | not with an order site ID that is no 1.
| `[1, 2]` | with an order site ID of 1 or 2.
| `['not', 1, 2]` | not with an order site ID of 1 or 2.



::: code
```twig
{# Fetch orders with an order site ID of 1 #}
{% set orders = craft.orders()
  .orderSiteId(1)
  .all() %}
```

```php
// Fetch orders with an order site ID of 1
$orders = \craft\commerce\elements\Order::find()
    ->orderSiteId(1)
    ->all();
```
:::


#### `orderStatus`

Narrows the query results based on the order statuses.

Possible values include:

| Value | Fetches orders…
| - | -
| `'foo'` | with an order status with a handle of `foo`.
| `'not foo'` | not with an order status with a handle of `foo`.
| `['foo', 'bar']` | with an order status with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not with an order status with a handle of `foo` or `bar`.
| a [OrderStatus](commerce5:craft\commerce\models\OrderStatus) object | with an order status represented by the object.



::: code
```twig
{# Fetch shipped orders #}
{% set orders = craft.orders()
  .orderStatus('shipped')
  .all() %}
```

```php
// Fetch shipped orders
$orders = \craft\commerce\elements\Order::find()
    ->orderStatus('shipped')
    ->all();
```
:::


#### `orderStatusId`

Narrows the query results based on the order statuses, per their IDs.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with an order status with an ID of 1.
| `'not 1'` | not with an order status with an ID of 1.
| `[1, 2]` | with an order status with an ID of 1 or 2.
| `['not', 1, 2]` | not with an order status with an ID of 1 or 2.



::: code
```twig
{# Fetch orders with an order status with an ID of 1 #}
{% set orders = craft.orders()
  .orderStatusId(1)
  .all() %}
```

```php
// Fetch orders with an order status with an ID of 1
$orders = \craft\commerce\elements\Order::find()
    ->orderStatusId(1)
    ->all();
```
:::


#### `origin`

Narrows the query results based on the origin.

Possible values include:

| Value | Fetches orders…
| - | -
| `'web'` | with an origin of `web`.
| `'not remote'` | not with an origin of `remote`.
| `['web', 'cp']` | with an order origin of `web` or `cp`.
| `['not', 'remote', 'cp']` | not with an origin of `web` or `cp`.



::: code
```twig
{# Fetch shipped orders #}
{% set orders = craft.orders()
  .origin('web')
  .all() %}
```

```php
// Fetch shipped orders
$orders = \craft\commerce\elements\Order::find()
    ->origin('web')
    ->all();
```
:::


#### `preferSites`

If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique orders from Site A, or Site B if they don’t exist in Site A #}
{% set orders = craft.orders()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique orders from Site A, or Site B if they don’t exist in Site A
$orders = \craft\commerce\elements\Order::find()
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

Narrows the query results based on the order reference.

Possible values include:

| Value | Fetches orders…
| - | -
| `'Foo'` | with a reference of `Foo`.
| `'Foo*'` | with a reference that begins with `Foo`.
| `'*Foo'` | with a reference that ends with `Foo`.
| `'*Foo*'` | with a reference that contains `Foo`.
| `'not *Foo*'` | with a reference that doesn’t contain `Foo`.
| `['*Foo*', '*Bar*']` | with a reference that contains `Foo` or `Bar`.
| `['not', '*Foo*', '*Bar*']` | with a reference that doesn’t contain `Foo` or `Bar`.



::: code
```twig
{# Fetch the requested order #}
{% set orderReference = craft.app.request.getQueryParam('ref') %}
{% set order = craft.orders()
  .reference(orderReference)
  .one() %}
```

```php
// Fetch the requested order
$orderReference = Craft::$app->request->getQueryParam('ref');
$order = \craft\commerce\elements\Order::find()
    ->reference($orderReference)
    ->one();
```
:::


#### `relatedTo`

Narrows the query results to only orders that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all orders that are related to myCategory #}
{% set orders = craft.orders()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all orders that are related to $myCategory
$orders = \craft\commerce\elements\Order::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `search`

Narrows the query results to only orders that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all orders that match the search query #}
{% set orders = craft.orders()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all orders that match the search query
$orders = \craft\commerce\elements\Order::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `shippingMethodHandle`

Narrows the query results based on the shipping method handle.

Possible values include:

| Value | Fetches orders…
| - | -
| `'foo'` | with a shipping method with a handle of `foo`.
| `'not foo'` | not with a shipping method with a handle of `foo`.
| `['foo', 'bar']` | with a shipping method with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not with a shipping method with a handle of `foo` or `bar`.
| a `\craft\commerce\elements\db\ShippingMethod` object | with a shipping method represented by the object.



::: code
```twig
{# Fetch collection shipping method orders #}
{% set orders = craft.orders()
  .shippingMethodHandle('collection')
  .all() %}
```

```php
// Fetch collection shipping method orders
$orders = \craft\commerce\elements\Order::find()
    ->shippingMethodHandle('collection')
    ->all();
```
:::


#### `shortNumber`

Narrows the query results based on the order short number.

Possible values include:

| Value | Fetches orders…
| - | -
| `'xxxxxxx'` | with a matching order number



::: code
```twig
{# Fetch the requested order #}
{% set orderNumber = craft.app.request.getQueryParam('shortNumber') %}
{% set order = craft.orders()
  .shortNumber(orderNumber)
  .one() %}
```

```php
// Fetch the requested order
$orderNumber = Craft::$app->request->getQueryParam('shortNumber');
$order = \craft\commerce\elements\Order::find()
    ->shortNumber($orderNumber)
    ->one();
```
:::


#### `siteSettingsId`

Narrows the query results based on the orders’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the order by its ID in the elements_sites table #}
{% set order = craft.orders()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the order by its ID in the elements_sites table
$order = \craft\commerce\elements\Order::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `storeId`

Narrows the query results to only orders that are related to the given store.

Possible values include:

| Value | Fetches orders…
| - | -
| `1` | with a `storeId` of `1`.




#### `total`

Narrows the query results based on the total.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total price of .
| `['and', 10, 20]` | an order with a total of  or .




#### `totalDiscount`

Narrows the query results based on the total discount.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total discount of 10.
| `[10, 20]` | an order with a total discount of 10 or 20.




#### `totalPaid`

Narrows the query results based on the total paid amount.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total paid amount of .
| `['and', 10, 20]` | an order with a total paid amount of  or .




#### `totalPrice`

Narrows the query results based on the total price.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total price of .
| `['and', 10, 20]` | an order with a total price of  or .




#### `totalQty`

Narrows the query results based on the total qty of items.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total qty of 10.
| `[10, 20]` | an order with a total qty of 10 or 20.




#### `totalTax`

Narrows the query results based on the total tax.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total tax of 10.
| `[10, 20]` | an order with a total tax of 10 or 20.




#### `totalWeight`

Narrows the query results based on the total weight of items.

Possible values include:

| Value | Fetches orders…
| - | -
| `10` | with a total weight of 10.
| `[10, 20]` | an order with a total weight of 10 or 20.




#### `trashed`

Narrows the query results to only orders that have been soft-deleted.





::: code
```twig
{# Fetch trashed orders #}
{% set orders = craft.orders()
  .trashed()
  .all() %}
```

```php
// Fetch trashed orders
$orders = \craft\commerce\elements\Order::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the orders’ UIDs.





::: code
```twig
{# Fetch the order by its UID #}
{% set order = craft.orders()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the order by its UID
$order = \craft\commerce\elements\Order::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

Causes the query to return matching orders eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch orders eager-loaded with the "Related" field’s relations #}
{% set orders = craft.orders()
  .with(['related'])
  .all() %}
```

```php
// Fetch orders eager-loaded with the "Related" field’s relations
$orders = \craft\commerce\elements\Order::find()
    ->with(['related'])
    ->all();
```
:::


#### `withAddresses`

Eager loads the shipping and billing addressees on the resulting orders.

Possible values include:

| Value | Fetches addresses
| - | -
| bool | `true` to eager-load, `false` to not eager load.




#### `withAdjustments`

Eager loads the order adjustments on the resulting orders.

Possible values include:

| Value | Fetches adjustments
| - | -
| bool | `true` to eager-load, `false` to not eager load.




#### `withAll`

Eager loads all relational data (addresses, adjustments, customers, line items, transactions) for the resulting orders.

Possible values include:

| Value | Fetches addresses, adjustments, customers, line items, transactions
| - | -
| bool | `true` to eager-load, `false` to not eager load.




#### `withCustomer`

Eager loads the user on the resulting orders.

Possible values include:

| Value | Fetches adjustments
| - | -
| bool | `true` to eager-load, `false` to not eager load.




#### `withLineItems`

Eager loads the line items on the resulting orders.

Possible values include:

| Value | Fetches line items
| - | -
| bool | `true` to eager-load, `false` to not eager load.




#### `withTransactions`

Eager loads the transactions on the resulting orders.

Possible values include:

| Value | Fetches transactions…
| - | -
| bool | `true` to eager-load, `false` to not eager load.





<!-- END PARAMS -->
