# Users

Users are Craft’s representation of people.

Each user has an email address and username by default, and optional fields for a name, photo, and password. Like other elements, users can have any number of additional custom fields.

There are also preferences for localization, accessibility, and debugging that may be relevant depending on how you build your site and whether you grant the user access to the control panel.

Users can be part of groups you create that [fine-tune permissions](user-management.md).

## Querying Users

You can fetch users in your templates or PHP code using **user queries**.

::: code
```twig
{# Create a new user query #}
{% set myUserQuery = craft.users() %}
```
```php
// Create a new user query
$myUserQuery = \craft\elements\User::find();
```
:::

Once you’ve created a user query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [User](craft3:craft\elements\User) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display a list of the users in an “Authors” user group by doing the following:

1. Create a user query with `craft.users()`.
2. Set the [group](#group) parameter on it.
3. Fetch the users with `.all()`.
4. Loop through the users using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to create the list HTML.

```twig
{# Create a user query with the 'group' parameter #}
{% set myUserQuery = craft.users()
    .group('authors') %}

{# Fetch the users #}
{% set users = myUserQuery.all() %}

{# Display the list #}
<ul>
    {% for user in users %}
        <li><a href="{{ url('authors/'~user.username) }}">{{ user.name }}</a></li>
    {% endfor %}
</ul>
```

### Parameters

User queries support the following parameters:

<!-- BEGIN PARAMS -->

| Param                                     | Description
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [admin](#admin)                           | Narrows the query results to only users that have admin accounts.
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.
| [asArray](#asarray)                       | Causes the query to return matching users as arrays of data, rather than [User](craft3:craft\elements\User) objects.
| [can](#can)                               | Narrows the query results to only users that have a certain user permission, either directly on the user account or through one of their user groups.
| [clearCachedResult](#clearcachedresult)   | Clears the cached result.
| [dateCreated](#datecreated)               | Narrows the query results based on the users’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the users’ last-updated dates.
| [email](#email)                           | Narrows the query results based on the users’ email addresses.
| [firstName](#firstname)                   | Narrows the query results based on the users’ first names.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [group](#group)                           | Narrows the query results based on the user group the users belong to.
| [groupId](#groupid)                       | Narrows the query results based on the user group the users belong to, per the groups’ IDs.
| [hasPhoto](#hasphoto)                     | Narrows the query results to only users that have (or don’t have) a user photo.
| [id](#id)                                 | Narrows the query results based on the users’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching users as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [lastLoginDate](#lastlogindate)           | Narrows the query results based on the users’ last login dates.
| [lastName](#lastname)                     | Narrows the query results based on the users’ last names.
| [limit](#limit)                           | Determines the number of users that should be returned.
| [offset](#offset)                         | Determines how many users should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the users should be returned in. (If empty, defaults to `username ASC`.)
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [relatedTo](#relatedto)                   | Narrows the query results to only users that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only users that match a search query.
| [status](#status)                         | Narrows the query results based on the users’ statuses.
| [trashed](#trashed)                       | Narrows the query results to only users that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the users’ UIDs.
| [username](#username)                     | Narrows the query results based on the users’ usernames.
| [with](#with)                             | Causes the query to return matching users eager-loaded with related elements.

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


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all users, regardless of status #}
{% set users = craft.users()
    .anyStatus()
    .all() %}
```

```php
// Fetch all users, regardless of status
$users = \craft\elements\User::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching users as arrays of data, rather than [User](craft3:craft\elements\User) objects.





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


#### `can`

Narrows the query results to only users that have a certain user permission, either directly on the user account or through one of their user groups.

See [User Management](https://craftcms.com/docs/3.x/user-management.html) for a full list of available user permissions defined by Craft.



::: code
```twig
{# Fetch users that can access the control panel #}
{% set users = craft.users()
    .can('accessCp')
    .all() %}
```

```php
// Fetch users that can access the control panel
$users = \craft\elements\User::find()
    ->can('accessCp')
    ->all();
```
:::


#### `clearCachedResult`

Clears the cached result.






#### `dateCreated`

Narrows the query results based on the users’ creation dates.



Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.



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
| `'< 2018-05-01'` | that were updated before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.



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


#### `email`

Narrows the query results based on the users’ email addresses.

Possible values include:

| Value | Fetches users…
| - | -
| `'foo@bar.baz'` | with an email of `foo@bar.baz`.
| `'not foo@bar.baz'` | not with an email of `foo@bar.baz`.
| `'*@bar.baz'` | with an email that ends with `@bar.baz`.



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


#### `group`

Narrows the query results based on the user group the users belong to.

Possible values include:

| Value | Fetches users…
| - | -
| `'foo'` | in a group with a handle of `foo`.
| `'not foo'` | not in a group with a handle of `foo`.
| `['foo', 'bar']` | in a group with a handle of `foo` or `bar`.
| `['not', 'foo', 'bar']` | not in a group with a handle of `foo` or `bar`.
| a [UserGroup](craft3:craft\models\UserGroup) object | in a group represented by the object.



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
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










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


#### `lastLoginDate`

Narrows the query results based on the users’ last login dates.

Possible values include:

| Value | Fetches users…
| - | -
| `'>= 2018-04-01'` | that last logged-in on or after 2018-04-01.
| `'< 2018-05-01'` | that last logged-in before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that last logged-in between 2018-04-01 and 2018-05-01.



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
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all users in order of date created
$users = \craft\elements\User::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


#### `preferSites`

If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned
for Site B.

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


#### `relatedTo`

Narrows the query results to only users that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



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


#### `search`

Narrows the query results to only users that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



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


#### `status`

Narrows the query results based on the users’ statuses.

Possible values include:

| Value | Fetches users…
| - | -
| `'active'` _(default)_ | with active accounts.
| `'suspended'` | with suspended accounts.
| `'pending'` | with accounts that are still pending activation.
| `'locked'` | with locked accounts (regardless of whether they’re active or suspended).
| `['active', 'suspended']` | with active or suspended accounts.



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


#### `with`

Causes the query to return matching users eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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



<!-- END PARAMS -->
