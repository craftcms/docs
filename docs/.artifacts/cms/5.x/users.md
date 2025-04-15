<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

| Param                                           | Description
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [admin](#admin)                                 | Narrows the query results to only users that have admin accounts.
| [affiliatedSite](#affiliatedsite)               | Narrows the query results based on the users’ affiliated sites.
| [affiliatedSiteId](#affiliatedsiteid)           | Narrows the query results based on the users’ affiliated sites, per the site’s ID(s).
| [afterPopulate](#afterpopulate)                 | Performs any post-population processing on elements.
| [andNotRelatedTo](#andnotrelatedto)             | Narrows the query results to only users that are not related to certain other elements.
| [andRelatedTo](#andrelatedto)                   | Narrows the query results to only users that are related to certain other elements.
| [asArray](#asarray)                             | Causes the query to return matching users as arrays of data, rather than [User](craft5:craft\elements\User) objects.
| [assetUploaders](#assetuploaders)               | Narrows the query results to only users that have uploaded an asset.
| [authorOf](#authorof)                           | Narrows the query results to users who are the author of the given entry.
| [authors](#authors)                             | Narrows the query results to only users that are authors of an entry.
| [cache](#cache)                                 | Enables query cache for this Query.
| [can](#can)                                     | Narrows the query results to only users that have a certain user permission, either directly on the user account or through one of their user groups.
| [canonicalsOnly](#canonicalsonly)               | Narrows the query results to only canonical elements, including elements that reference another canonical element via `canonicalId` so long as they aren’t a draft.
| [clearCachedResult](#clearcachedresult)         | Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).
| [dateCreated](#datecreated)                     | Narrows the query results based on the users’ creation dates.
| [dateUpdated](#dateupdated)                     | Narrows the query results based on the users’ last-updated dates.
| [eagerly](#eagerly)                             | Causes the query to be used to eager-load results for the query’s source element and any other elements in its collection.
| [email](#email)                                 | Narrows the query results based on the users’ email addresses.
| [firstName](#firstname)                         | Narrows the query results based on the users’ first names.
| [fixedOrder](#fixedorder)                       | Causes the query results to be returned in the order specified by [id](#id).
| [fullName](#fullname)                           | Narrows the query results based on the users’ full names.
| [getFieldLayouts](#getfieldlayouts)             | Returns the field layouts that could be associated with the resulting elements.
| [group](#group)                                 | Narrows the query results based on the user group the users belong to.
| [groupId](#groupid)                             | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| [hasPhoto](#hasphoto)                           | Narrows the query results to only users that have (or don’t have) a user photo.
| [id](#id)                                       | Narrows the query results based on the users’ IDs.
| [ignorePlaceholders](#ignoreplaceholders)       | Causes the query to return matching users as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).
| [inBulkOp](#inbulkop)                           | Narrows the query results to only users that were involved in a bulk element operation.
| [inReverse](#inreverse)                         | Causes the query results to be returned in reverse order.
| [language](#language)                           | Determines which site(s) the users should be queried in, based on their language.
| [lastLoginDate](#lastlogindate)                 | Narrows the query results based on the users’ last login dates.
| [lastName](#lastname)                           | Narrows the query results based on the users’ last names.
| [limit](#limit)                                 | Determines the number of users that should be returned.
| [notRelatedTo](#notrelatedto)                   | Narrows the query results to only users that are not related to certain other elements.
| [offset](#offset)                               | Determines how many users should be skipped in the results.
| [orderBy](#orderby)                             | Determines the order that the users should be returned in. (If empty, defaults to `username ASC`.)
| [preferSites](#prefersites)                     | If [unique()](https://docs.craftcms.com/api/v5/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [prepForEagerLoading](#prepforeagerloading)     | Prepares the query for lazy eager loading.
| [prepareSubquery](#preparesubquery)             | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                         | Narrows the query results to only users that are related to certain other elements.
| [render](#render)                               | Executes the query and renders the resulting elements using their partial templates.
| [search](#search)                               | Narrows the query results to only users that match a search query.
| [siteSettingsId](#sitesettingsid)               | Narrows the query results based on the users’ IDs in the `elements_sites` table.
| [status](#status)                               | Narrows the query results based on the users’ statuses.
| [trashed](#trashed)                             | Narrows the query results to only users that have been soft-deleted.
| [uid](#uid)                                     | Narrows the query results based on the users’ UIDs.
| [username](#username)                           | Narrows the query results based on the users’ usernames.
| [wasCountEagerLoaded](#wascounteagerloaded)     | Returns whether the query result count was already eager loaded by the query's source element.
| [wasEagerLoaded](#waseagerloaded)               | Returns whether the query results were already eager loaded by the query's source element.
| [with](#with)                                   | Causes the query to return matching users eager-loaded with related elements.
| [withCustomFields](#withcustomfields)           | Sets whether custom fields should be factored into the query.
| [withGroups](#withgroups)                       | Causes the query to return matching users eager-loaded with their user groups.
| [withProvisionalDrafts](#withprovisionaldrafts) | Causes the query to return provisional drafts for the matching elements, when they exist for the current user.


<!-- textlint-enable -->


#### `admin`

Narrows the query results to only users that have admin accounts.



::: code
```twig
{# Fetch admins #}
{% set users = craft.users()
  .admin()
  .all() %}
```

```php
// Fetch admins
$users = \craft\elements\User::find()
    ->admin()
    ->all();
```
:::


#### `affiliatedSite`

Narrows the query results based on the users’ affiliated sites.

Possible values include:

| Value | Fetches users…
| - | -
| `'foo'` | affiliated with the site with a handle of `foo`.
| `['foo', 'bar']` | affiliated with a site with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not affiliated with a site with a handle of `foo` or `bar`.
| a [craft\models\Site](craft5:craft\models\Site) object | affiliated with the site represented by the object.
| `'*'` | affiliated with any site.



::: code
```twig
{# Fetch users affiliated with the Foo site #}
{% set users = craft.users()
  .affiliatedSite('foo')
  .all() %}
```

```php
// Fetch users affiliated with the Foo site
$users = \craft\elements\User::find()
    ->affiliatedSite('foo')
    ->all();
```
:::


#### `affiliatedSiteId`

Narrows the query results based on the users’ affiliated sites, per the site’s ID(s).

Possible values include:

| Value | Fetches users…
| - | -
| `1` | affiliated with the site with an ID of `1`.
| `[1, 2]` | affiliated with a site with an ID of `1` or `2`.
| `['not', 1, 2]` | not affiliated with a site with an ID of `1` or `2`.
| `'*'` | affiliated with any site.



::: code
```twig
{# Fetch users affiliated with the site with an ID of 1 #}
{% set users = craft.users()
  .affiliatedSiteId(1)
  .all() %}
```

```php
// Fetch users affiliated with the site with an ID of 1
$users = \craft\elements\User::find()
    ->affiliatedSiteId(1)
    ->all();
```
:::


#### `afterPopulate`

Performs any post-population processing on elements.










#### `andNotRelatedTo`

Narrows the query results to only users that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all users that are related to myCategoryA and not myCategoryB #}
{% set users = craft.users()
  .relatedTo(myCategoryA)
  .andNotRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all users that are related to $myCategoryA and not $myCategoryB
$users = \craft\elements\User::find()
    ->relatedTo($myCategoryA)
    ->andNotRelatedTo($myCategoryB)
    ->all();
```
:::


#### `andRelatedTo`

Narrows the query results to only users that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all users that are related to myCategoryA and myCategoryB #}
{% set users = craft.users()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all users that are related to $myCategoryA and $myCategoryB
$users = \craft\elements\User::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching users as arrays of data, rather than [User](craft5:craft\elements\User) objects.





::: code
```twig
{# Fetch users as arrays #}
{% set users = craft.users()
  .asArray()
  .all() %}
```

```php
// Fetch users as arrays
$users = \craft\elements\User::find()
    ->asArray()
    ->all();
```
:::


#### `assetUploaders`

Narrows the query results to only users that have uploaded an asset.



::: code
```twig
{# Fetch all users who have uploaded an asset #}
{% set users = craft.users()
  .assetUploaders()
  .all() %}
```

```php
// Fetch all users who have uploaded an asset
$users = \craft\elements\User::find()
    ->assetUploaders()
    ->all();
```
:::


#### `authorOf`

Narrows the query results to users who are the author of the given entry.






#### `authors`

Narrows the query results to only users that are authors of an entry.



::: code
```twig
{# Fetch authors #}
{% set users = craft.users()
  .authors()
  .all() %}
```

```php
// Fetch authors
$users = \craft\elements\User::find()
    ->authors()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `can`

Narrows the query results to only users that have a certain user permission, either directly on the user account or through one of their user groups.

See [User Management](https://craftcms.com/docs/5.x/system/user-management.html) for a full list of available user permissions defined by Craft.



::: code
```twig
{# Fetch users who can access the front end when the system is offline #}
{% set users = craft.users()
  .can('accessSiteWhenSystemIsOff')
  .all() %}
```

```php
// Fetch users who can access the front end when the system is offline
$users = \craft\elements\User::find()
    ->can('accessSiteWhenSystemIsOff')
    ->all();
```
:::


#### `canonicalsOnly`

Narrows the query results to only canonical elements, including elements
that reference another canonical element via `canonicalId` so long as they
aren’t a draft.



Unpublished drafts can be included as well if `drafts(null)` and
`draftOf(false)` are also passed.






#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/5.x/development/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the users’ creation dates.



Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were created at midnight of the specified relative date.



::: code
```twig
{# Fetch users created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set users = craft.users()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch users created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$users = \craft\elements\User::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the users’ last-updated dates.



Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that were updated at midnight of the specified relative date.



::: code
```twig
{# Fetch users updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set users = craft.users()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch users updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$users = \craft\elements\User::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `eagerly`

Causes the query to be used to eager-load results for the query’s source element
and any other elements in its collection.










#### `email`

Narrows the query results based on the users’ email addresses.

Possible values include:

| Value | Fetches users…
| - | -
| `'me@domain.tld'` | with an email of `me@domain.tld`.
| `'not me@domain.tld'` | not with an email of `me@domain.tld`.
| `'*@domain.tld'` | with an email that ends with `@domain.tld`.



::: code
```twig
{# Fetch users with a .co.uk domain on their email address #}
{% set users = craft.users()
  .email('*.co.uk')
  .all() %}
```

```php
// Fetch users with a .co.uk domain on their email address
$users = \craft\elements\User::find()
    ->email('*.co.uk')
    ->all();
```
:::


#### `firstName`

Narrows the query results based on the users’ first names.

Possible values include:

| Value | Fetches users…
| - | -
| `'Jane'` | with a first name of `Jane`.
| `'not Jane'` | not with a first name of `Jane`.



::: code
```twig
{# Fetch all the Jane's #}
{% set users = craft.users()
  .firstName('Jane')
  .all() %}
```

```php
// Fetch all the Jane's
$users = \craft\elements\User::find()
    ->firstName('Jane')
    ->one();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch users in a specific order #}
{% set users = craft.users()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch users in a specific order
$users = \craft\elements\User::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `fullName`

Narrows the query results based on the users’ full names.

Possible values include:

| Value | Fetches users…
| - | -
| `'Jane Doe'` | with a full name of `Jane Doe`.
| `'not Jane Doe'` | not with a full name of `Jane Doe`.



::: code
```twig
{# Fetch all the Jane Doe's #}
{% set users = craft.users()
  .fullName('Jane Doe')
  .all() %}
```

```php
// Fetch all the Jane Doe's
$users = \craft\elements\User::find()
    ->fullName('JaneDoe')
    ->one();
```
:::


#### `getFieldLayouts`

Returns the field layouts that could be associated with the resulting elements.










#### `group`

Narrows the query results based on the user group the users belong to.

Possible values include:

| Value | Fetches users…
| - | -
| `'foo'` | in a group with a handle of `foo`.
| `'not foo'` | not in a group with a handle of `foo`.
| `['foo', 'bar']` | in a group with a handle of `foo` or `bar`.
| `['and', 'foo', 'bar']` | in both groups with handles of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a group with a handle of `foo` or `bar`.
| a [UserGroup](craft5:craft\models\UserGroup) object | in a group represented by the object.



::: code
```twig
{# Fetch users in the Foo user group #}
{% set users = craft.users()
  .group('foo')
  .all() %}
```

```php
// Fetch users in the Foo user group
$users = \craft\elements\User::find()
    ->group('foo')
    ->all();
```
:::


#### `groupId`

Narrows the query results based on the user group the users belong to, per the groups’ IDs.

Possible values include:

| Value | Fetches users…
| - | -
| `1` | in a group with an ID of 1.
| `'not 1'` | not in a group with an ID of 1.
| `[1, 2]` | in a group with an ID of 1 or 2.
| `['and', 1, 2]` | in both groups with IDs of 1 or 2.
| `['not', 1, 2]` | not in a group with an ID of 1 or 2.



::: code
```twig
{# Fetch users in a group with an ID of 1 #}
{% set users = craft.users()
  .groupId(1)
  .all() %}
```

```php
// Fetch users in a group with an ID of 1
$users = \craft\elements\User::find()
    ->groupId(1)
    ->all();
```
:::


#### `hasPhoto`

Narrows the query results to only users that have (or don’t have) a user photo.



::: code
```twig
{# Fetch users with photos #}
{% set users = craft.users()
  .hasPhoto()
  .all() %}
```

```php
// Fetch users without photos
$users = \craft\elements\User::find()
    ->hasPhoto()
    ->all();
```
:::


#### `id`

Narrows the query results based on the users’ IDs.



Possible values include:

| Value | Fetches users…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the user by its ID #}
{% set user = craft.users()
  .id(1)
  .one() %}
```

```php
// Fetch the user by its ID
$user = \craft\elements\User::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching users as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v5/craft-services-elements.html#method-setplaceholderelement).










#### `inBulkOp`

Narrows the query results to only users that were involved in a bulk element operation.










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch users in reverse #}
{% set users = craft.users()
  .inReverse()
  .all() %}
```

```php
// Fetch users in reverse
$users = \craft\elements\User::find()
    ->inReverse()
    ->all();
```
:::


#### `language`

Determines which site(s) the users should be queried in, based on their language.



Possible values include:

| Value | Fetches users…
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
{# Fetch users from English sites #}
{% set users = craft.users()
  .language('en')
  .all() %}
```

```php
// Fetch users from English sites
$users = \craft\elements\User::find()
    ->language('en')
    ->all();
```
:::


#### `lastLoginDate`

Narrows the query results based on the users’ last login dates.

Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that last logged in on or after 2018-04-01.
| `'< 2018-05-01'` | that last logged in before 2018-05-01.
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that last logged in between 2018-04-01 and 2018-05-01.
| `now`/`today`/`tomorrow`/`yesterday` | that last logged in at midnight of the specified relative date.



::: code
```twig
{# Fetch users that logged in recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set users = craft.users()
  .lastLoginDate(">= #{aWeekAgo}")
  .all() %}
```

```php
// Fetch users that logged in recently
$aWeekAgo = (new \DateTime('7 days ago'))->format(\DateTime::ATOM);

$users = \craft\elements\User::find()
    ->lastLoginDate(">= {$aWeekAgo}")
    ->all();
```
:::


#### `lastName`

Narrows the query results based on the users’ last names.

Possible values include:

| Value | Fetches users…
| - | -
| `'Doe'` | with a last name of `Doe`.
| `'not Doe'` | not with a last name of `Doe`.



::: code
```twig
{# Fetch all the Doe's #}
{% set users = craft.users()
  .lastName('Doe')
  .all() %}
```

```php
// Fetch all the Doe's
$users = \craft\elements\User::find()
    ->lastName('Doe')
    ->one();
```
:::


#### `limit`

Determines the number of users that should be returned.



::: code
```twig
{# Fetch up to 10 users  #}
{% set users = craft.users()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 users
$users = \craft\elements\User::find()
    ->limit(10)
    ->all();
```
:::


#### `notRelatedTo`

Narrows the query results to only users that are not related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all users that are related to myEntry #}
{% set users = craft.users()
  .notRelatedTo(myEntry)
  .all() %}
```

```php
// Fetch all users that are related to $myEntry
$users = \craft\elements\User::find()
    ->notRelatedTo($myEntry)
    ->all();
```
:::


#### `offset`

Determines how many users should be skipped in the results.



::: code
```twig
{# Fetch all users except for the first 3 #}
{% set users = craft.users()
  .offset(3)
  .all() %}
```

```php
// Fetch all users except for the first 3
$users = \craft\elements\User::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the users should be returned in. (If empty, defaults to `username ASC`.)



::: code
```twig
{# Fetch all users in order of date created #}
{% set users = craft.users()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all users in order of date created
$users = \craft\elements\User::find()
    ->orderBy('dateCreated ASC')
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
{# Fetch unique users from Site A, or Site B if they don’t exist in Site A #}
{% set users = craft.users()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique users from Site A, or Site B if they don’t exist in Site A
$users = \craft\elements\User::find()
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

Narrows the query results to only users that are related to certain other elements.



See [Relations](https://craftcms.com/docs/5.x/system/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all users that are related to myCategory #}
{% set users = craft.users()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all users that are related to $myCategory
$users = \craft\elements\User::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `render`

Executes the query and renders the resulting elements using their partial templates.

If no partial template exists for an element, its string representation will be output instead.




#### `search`

Narrows the query results to only users that match a search query.



See [Searching](https://craftcms.com/docs/5.x/system/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all users that match the search query #}
{% set users = craft.users()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all users that match the search query
$users = \craft\elements\User::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the users’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches users…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the user by its ID in the elements_sites table #}
{% set user = craft.users()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the user by its ID in the elements_sites table
$user = \craft\elements\User::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `status`

Narrows the query results based on the users’ statuses.

Possible values include:

| Value | Fetches users…
| - | -
| `'inactive'` | with inactive accounts.
| `'active'` | with active accounts.
| `'pending'` | with accounts that are still pending activation.
| `'credentialed'` | with either active or pending accounts.
| `'suspended'` | with suspended accounts.
| `'locked'` | with locked accounts (regardless of whether they’re active or suspended).
| `['active', 'suspended']` | with active or suspended accounts.
| `['not', 'active', 'suspended']` | without active or suspended accounts.



::: code
```twig
{# Fetch active and locked users #}
{% set users = craft.users()
  .status(['active', 'locked'])
  .all() %}
```

```php
// Fetch active and locked users
$users = \craft\elements\User::find()
    ->status(['active', 'locked'])
    ->all();
```
:::


#### `trashed`

Narrows the query results to only users that have been soft-deleted.





::: code
```twig
{# Fetch trashed users #}
{% set users = craft.users()
  .trashed()
  .all() %}
```

```php
// Fetch trashed users
$users = \craft\elements\User::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the users’ UIDs.





::: code
```twig
{# Fetch the user by its UID #}
{% set user = craft.users()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the user by its UID
$user = \craft\elements\User::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `username`

Narrows the query results based on the users’ usernames.

Possible values include:

| Value | Fetches users…
| - | -
| `'foo'` | with a username of `foo`.
| `'not foo'` | not with a username of `foo`.



::: code
```twig
{# Get the requested username #}
{% set requestedUsername = craft.app.request.getSegment(2) %}

{# Fetch that user #}
{% set user = craft.users()
  .username(requestedUsername|literal)
  .one() %}
```

```php
// Get the requested username
$requestedUsername = \Craft::$app->request->getSegment(2);

// Fetch that user
$user = \craft\elements\User::find()
    ->username(\craft\helpers\Db::escapeParam($requestedUsername))
    ->one();
```
:::


#### `wasCountEagerLoaded`

Returns whether the query result count was already eager loaded by the query's source element.










#### `wasEagerLoaded`

Returns whether the query results were already eager loaded by the query's source element.










#### `with`

Causes the query to return matching users eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/5.x/development/eager-loading.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch users eager-loaded with the "Related" field’s relations #}
{% set users = craft.users()
  .with(['related'])
  .all() %}
```

```php
// Fetch users eager-loaded with the "Related" field’s relations
$users = \craft\elements\User::find()
    ->with(['related'])
    ->all();
```
:::


#### `withCustomFields`

Sets whether custom fields should be factored into the query.










#### `withGroups`

Causes the query to return matching users eager-loaded with their user groups.

Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that last logged-in on or after 2018-04-01.
| `'< 2018-05-01'` | that last logged-in before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that last logged-in between 2018-04-01 and 2018-05-01.



::: code
```twig
{# fetch users with their user groups #}
{% set users = craft.users()
  .withGroups()
  .all() %}
```

```php
// fetch users with their user groups
$users = \craft\elements\User::find()
    ->withGroups()
    ->all();
```
:::


#### `withProvisionalDrafts`

Causes the query to return provisional drafts for the matching elements,
when they exist for the current user.











<!-- END PARAMS -->
