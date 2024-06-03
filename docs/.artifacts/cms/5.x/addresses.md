<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                       | Description
| ------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [addOrderBy](#addorderby)                   | Adds additional ORDER BY columns to the query.
| [addressLine1](#addressline1)               | Narrows the query results based on the first address line the addresses have.
| [addressLine2](#addressline2)               | Narrows the query results based on the second address line the addresses have.
| [addressLine3](#addressline3)               | Narrows the query results based on the third address line the addresses have.
| [administrativeArea](#administrativearea)   | Narrows the query results based on the administrative areas the addresses belongs to.
| [afterPopulate](#afterpopulate)             | Performs any post-population processing on elements.
| [allowOwnerDrafts](#allowownerdrafts)       | Narrows the query results based on whether the addresses’ owners are drafts.
| [allowOwnerRevisions](#allowownerrevisions) | Narrows the query results based on whether the addresses’ owners are revisions.
| [andRelatedTo](#andrelatedto)               | Narrows the query results to only addresses that are related to certain other elements.
| [asArray](#asarray)                         | Causes the query to return matching addresses as arrays of data, rather than [Address](craft5:craft\elements\Address) objects.
| [cache](#cache)                             | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)     | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [countryCode](#countrycode)                 | Narrows the query results based on the country the addresses belong to.
| [dateCreated](#datecreated)                 | Narrows the query results based on the addresses’ creation dates.
| [dateUpdated](#dateupdated)                 | Narrows the query results based on the addresses’ last-updated dates.
| [dependentLocality](#dependentlocality)     | Narrows the query results based on the dependent locality the addresses belong to.
| [eagerly](#eagerly)                         | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [field](#field)                             | Narrows the query results based on the field the addresses are contained by.
| [fieldId](#fieldid)                         | Narrows the query results based on the field the addresses are contained by, per the fields’ IDs.
| [fields](#fields)                           | Returns the list of fields that should be returned by default by [toArray()](https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail) when no specific fields are specified.
| [firstName](#firstname)                     | Narrows the query results based on the first name the addresses have.
| [fixedOrder](#fixedorder)                   | Causes the query results to be returned in the order specified by [id](#id).
| [fullName](#fullname)                       | Narrows the query results based on the full name the addresses have.
| [id](#id)                                   | Narrows the query results based on the addresses’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)   | Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                       | Narrows the query results to only addresses that were involved in a bulk element operation.
| [inReverse](#inreverse)                     | Causes the query results to be returned in reverse order.
| [language](#language)                       | Determines which site(s) the addresses should be queried in, based on their language.
| [lastName](#lastname)                       | Narrows the query results based on the last name the addresses have.
| [limit](#limit)                             | Determines the number of addresses that should be returned.
| [locality](#locality)                       | Narrows the query results based on the locality the addresses belong to.
| [offset](#offset)                           | Determines how many addresses should be skipped in the results.
| [orderBy](#orderby)                         | Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC, elements.id`.)
| [organization](#organization)               | Narrows the query results based on the organization the addresses have.
| [organizationTaxId](#organizationtaxid)     | Narrows the query results based on the tax ID the addresses have.
| [owner](#owner)                             | Sets the [ownerId](#ownerid) parameter based on a given owner element.
| [ownerId](#ownerid)                         | Narrows the query results based on the addresses’ owner elements, per their IDs.
| [postalCode](#postalcode)                   | Narrows the query results based on the postal code the addresses belong to.
| [preferSites](#prefersites)                 | If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading) | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)         | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [primaryOwner](#primaryowner)               | Sets the [primaryOwnerId](#primaryownerid) and [siteId()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-siteid) parameters based on a given element.
| [primaryOwnerId](#primaryownerid)           | Narrows the query results based on the primary owner element of the addresses, per the owners’ IDs.
| [relatedTo](#relatedto)                     | Narrows the query results to only addresses that are related to certain other elements.
| [render](#render)                           | Executes the query and renders the resulting elements using their partial templates.
| [search](#search)                           | Narrows the query results to only addresses that match a search query.
| [siteSettingsId](#sitesettingsid)           | Narrows the query results based on the addresses’ IDs in the `elements_sites` table.
| [sortingCode](#sortingcode)                 | Narrows the query results based on the sorting code the addresses have.
| [trashed](#trashed)                         | Narrows the query results to only addresses that have been soft-deleted.
| [uid](#uid)                                 | Narrows the query results based on the addresses’ UIDs.
| [wasCountEagerLoaded](#wascounteagerloaded) | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)           | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                               | Causes the query to return matching addresses eager-loaded with related elements.
| [withCustomFields](#withcustomfields)       | Sets whether custom fields should be factored into the query.


<!-- textlint-enable -->


#### `addOrderBy`

Adds additional ORDER BY columns to the query.










#### `addressLine1`

Narrows the query results based on the first address line the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'23 Craft st'` | with a addressLine1 of `23 Craft st`.
| `'*23*'` | with a addressLine1 containing `23`.
| `'23*'` | with a addressLine1 beginning with `23`.



::: code
```twig
{# Fetch addresses at 23 Craft st #}
{% set addresses = craft.addresses()
  .addressLine1('23 Craft st')
  .all() %}
```

```php
// Fetch addresses at 23 Craft st
$addresses = \craft\elements\Address::find()
    ->addressLine1('23 Craft st')
    ->all();
```
:::


#### `addressLine2`

Narrows the query results based on the second address line the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Apt 5B'` | with an addressLine2 of `Apt 5B`.
| `'*5B*'` | with an addressLine2 containing `5B`.
| `'5B*'` | with an addressLine2 beginning with `5B`.



::: code
```twig
{# Fetch addresses at Apt 5B #}
{% set addresses = craft.addresses()
  .addressLine2('Apt 5B')
  .all() %}
```

```php
// Fetch addresses at Apt 5B
$addresses = \craft\elements\Address::find()
    ->addressLine2('Apt 5B')
    ->all();
```
:::


#### `addressLine3`

Narrows the query results based on the third address line the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Suite 212'` | with an addressLine3 of `Suite 212`.
| `'*Suite*'` | with an addressLine3 containing `Suite`.
| `'Suite*'` | with an addressLine3 beginning with `Suite`.



::: code
```twig
{# Fetch addresses at Suite 212 #}
{% set addresses = craft.addresses()
  .addressLine3('Suite 212')
  .all() %}
```

```php
// Fetch addresses at Suite 212
$addresses = \craft\elements\Address::find()
    ->addressLine3('Suite 212')
    ->all();
```
:::


#### `administrativeArea`

Narrows the query results based on the administrative areas the addresses belongs to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'WA'` | with a administrative area of `WA`.
| `'not WA'` | not in a administrative area of `WA`.
| `['WA', 'SA']` | in a administrative area of `WA` or `SA`.
| `['not', 'WA', 'SA']` | not in a administrative area of `WA` or `SA`.



::: code
```twig
{# Fetch addresses in Western Australia #}
{% set addresses = craft.addresses()
  .administrativeArea('WA')
  .all() %}
```

```php
// Fetch addresses in Western Australia
$addresses = \craft\elements\Address::find()
    ->administrativeArea('WA')
    ->all();
```
:::


#### `afterPopulate`

Performs any post-population processing on elements.










#### `allowOwnerDrafts`

Narrows the query results based on whether the addresses’ owners are drafts.

Possible values include:

| Value | Fetches addresses…
| - | -
| `true` | which can belong to a draft.
| `false` | which cannot belong to a draft.




#### `allowOwnerRevisions`

Narrows the query results based on whether the addresses’ owners are revisions.

Possible values include:

| Value | Fetches addresses…
| - | -
| `true` | which can belong to a revision.
| `false` | which cannot belong to a revision.




#### `andRelatedTo`

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


#### `asArray`

Causes the query to return matching addresses as arrays of data, rather than [Address](craft5:craft\elements\Address) objects.





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

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `countryCode`

Narrows the query results based on the country the addresses belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'AU'` | with a countryCode of `AU`.
| `'not US'` | not in a countryCode of `US`.
| `['AU', 'US']` | in a countryCode of `AU` or `US`.
| `['not', 'AU', 'US']` | not in a countryCode of `AU` or `US`.



::: code
```twig
{# Fetch Australian addresses #}
{% set addresses = craft.addresses()
  .countryCode('AU')
  .all() %}
```

```php
// Fetch Australian addresses
$addresses = \craft\elements\Address::find()
    ->countryCode('AU')
    ->all();
```
:::


#### `dateCreated`

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


#### `dependentLocality`

Narrows the query results based on the dependent locality the addresses belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Darlington'` | with a dependentLocality of `Darlington`.
| `'*Darling*'` | with a dependentLocality containing `Darling`.
| `'Dar*'` | with a dependentLocality beginning with `Dar`.



::: code
```twig
{# Fetch addresses in Darlington #}
{% set addresses = craft.addresses()
  .dependentLocality('Darlington')
  .all() %}
```

```php
// Fetch addresses in Darlington
$addresses = \craft\elements\Address::find()
    ->dependentLocality('Darlington')
    ->all();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `field`

Narrows the query results based on the field the addresses are contained by.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'foo'` | in a field with a handle of `foo`.
| `['foo', 'bar']` | in a field with a handle of `foo` or `bar`.
| an `\craft\elements\db\craft\fields\Addresses` object | in a field represented by the object.



::: code
```twig
{# Fetch addresses in the Foo field #}
{% set addresses = craft.addresses()
  .field('foo')
  .all() %}
```

```php
// Fetch addresses in the Foo field
$addresses = \craft\elements\Address::find()
    ->field('foo')
    ->all();
```
:::


#### `fieldId`

Narrows the query results based on the field the addresses are contained by, per the fields’ IDs.

Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | in a field with an ID of 1.
| `'not 1'` | not in a field with an ID of 1.
| `[1, 2]` | in a field with an ID of 1 or 2.
| `['not', 1, 2]` | not in a field with an ID of 1 or 2.



::: code
```twig
{# Fetch addresses in the field with an ID of 1 #}
{% set addresses = craft.addresses()
  .fieldId(1)
  .all() %}
```

```php
// Fetch addresses in the field with an ID of 1
$addresses = \craft\elements\Address::find()
    ->fieldId(1)
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




#### `firstName`

Narrows the query results based on the first name the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'John'` | with a firstName of `John`.
| `'*Joh*'` | with a firstName containing `Joh`.
| `'Joh*'` | with a firstName beginning with `Joh`.



::: code
```twig
{# Fetch addresses with first name John #}
{% set addresses = craft.addresses()
  .firstName('John')
  .all() %}
```

```php
// Fetch addresses with first name John
$addresses = \craft\elements\Address::find()
    ->firstName('John')
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


#### `fullName`

Narrows the query results based on the full name the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'John Doe'` | with a fullName of `John Doe`.
| `'*Doe*'` | with a fullName containing `Doe`.
| `'John*'` | with a fullName beginning with `John`.



::: code
```twig
{# Fetch addresses for John Doe #}
{% set addresses = craft.addresses()
  .fullName('John Doe')
  .all() %}
```

```php
// Fetch addresses for John Doe
$addresses = \craft\elements\Address::find()
    ->fullName('John Doe')
    ->all();
```
:::


#### `id`

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

Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only addresses that were involved in a bulk element operation.










#### `inReverse`

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

Determines which site(s) the addresses should be queried in, based on their language.



Possible values include:

| Value | Fetches addresses…
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


#### `lastName`

Narrows the query results based on the last name the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Doe'` | with a lastName of `Doe`.
| `'*Do*'` | with a lastName containing `Do`.
| `'Do*'` | with a lastName beginning with `Do`.



::: code
```twig
{# Fetch addresses with last name Doe #}
{% set addresses = craft.addresses()
  .lastName('Doe')
  .all() %}
```

```php
// Fetch addresses with last name Doe
$addresses = \craft\elements\Address::find()
    ->lastName('Doe')
    ->all();
```
:::


#### `limit`

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


#### `locality`

Narrows the query results based on the locality the addresses belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Perth'` | with a locality of `Perth`.
| `'*Perth*'` | with a locality containing `Perth`.
| `'Ner*'` | with a locality beginning with `Per`.



::: code
```twig
{# Fetch addresses in Perth #}
{% set addresses = craft.addresses()
  .locality('Perth')
  .all() %}
```

```php
// Fetch addresses in Perth
$addresses = \craft\elements\Address::find()
    ->locality('Perth')
    ->all();
```
:::


#### `offset`

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

Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC,
    elements.id`.)



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


#### `organization`

Narrows the query results based on the organization the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'Pixel & Tonic'` | with an organization of `Pixel & Tonic`.
| `'*Pixel*'` | with an organization containing `Pixel`.
| `'Pixel*'` | with an organization beginning with `Pixel`.



::: code
```twig
{# Fetch addresses for Pixel & Tonic #}
{% set addresses = craft.addresses()
  .organization('Pixel & Tonic')
  .all() %}
```

```php
// Fetch addresses for Pixel & Tonic
$addresses = \craft\elements\Address::find()
    ->organization('Pixel & Tonic')
    ->all();
```
:::


#### `organizationTaxId`

Narrows the query results based on the tax ID the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'123-456-789'` | with an organizationTaxId of `123-456-789`.
| `'*456*'` | with an organizationTaxId containing `456`.
| `'123*'` | with an organizationTaxId beginning with `123`.



::: code
```twig
{# Fetch addresses with tax ID 123-456-789 #}
{% set addresses = craft.addresses()
  .organizationTaxId('123-456-789')
  .all() %}
```

```php
// Fetch addresses with tax ID 123-456-789
$addresses = \craft\elements\Address::find()
    ->organizationTaxId('123-456-789')
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


#### `postalCode`

Narrows the query results based on the postal code the addresses belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'10001'` | with a postalCode of `10001`.
| `'*001*'` | with a postalCode containing `001`.
| `'100*'` | with a postalCode beginning with `100`.



::: code
```twig
{# Fetch addresses with postal code 10001 #}
{% set addresses = craft.addresses()
  .postalCode('10001')
  .all() %}
```

```php
// Fetch addresses with postal code 10001
$addresses = \craft\elements\Address::find()
    ->postalCode('10001')
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


#### `prepForEagerLoading`

Prepares the query for lazy eager loading.










#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `primaryOwner`

Sets the [primaryOwnerId](#primaryownerid) and [siteId()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-siteid) parameters based on a given element.



::: code
```twig
{# Fetch addresses created for this entry #}
{% set addresses = craft.addresses()
  .primaryOwner(myEntry)
  .all() %}
```

```php
// Fetch addresses created for this entry
$addresses = \craft\elements\Address::find()
    ->primaryOwner($myEntry)
    ->all();
```
:::


#### `primaryOwnerId`

Narrows the query results based on the primary owner element of the addresses, per the owners’ IDs.

Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | created for an element with an ID of 1.
| `'not 1'` | not created for an element with an ID of 1.
| `[1, 2]` | created for an element with an ID of 1 or 2.
| `['not', 1, 2]` | not created for an element with an ID of 1 or 2.



::: code
```twig
{# Fetch addresses created for an element with an ID of 1 #}
{% set addresses = craft.addresses()
  .primaryOwnerId(1)
  .all() %}
```

```php
// Fetch addresses created for an element with an ID of 1
$addresses = \craft\elements\Address::find()
    ->primaryOwnerId(1)
    ->all();
```
:::


#### `relatedTo`

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


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `search`

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


#### `sortingCode`

Narrows the query results based on the sorting code the addresses have.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'ABCD'` | with a sortingCode of `ABCD`.
| `'*BC*'` | with a sortingCode containing `BC`.
| `'AB*'` | with a sortingCode beginning with `AB`.



::: code
```twig
{# Fetch addresses with sorting code ABCD #}
{% set addresses = craft.addresses()
  .sortingCode('ABCD')
  .all() %}
```

```php
// Fetch addresses with sorting code ABCD
$addresses = \craft\elements\Address::find()
    ->sortingCode('ABCD')
    ->all();
```
:::


#### `trashed`

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


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

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

Sets whether custom fields should be factored into the query.











<!-- END PARAMS -->
