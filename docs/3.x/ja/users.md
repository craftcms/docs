# ユーザー

Craft はシステムのすべてのメンバーアカウントを「ユーザー」と呼びます。

それぞれのユーザーは、デフォルトのメールアドレスとユーザー名、および、名前・写真・パスワードのオプションフィールドを持っています。 他のエレメント同様、ユーザーは追加のカスタムフィールドをいくつでも持つことができます。

管理者アカウントは、明示的な権限がない次のことを含め、 Craft 内のすべての操作を確実に行うことができる特別なアカウントです。

インストール中に作成したユーザーアカウントが、デフォルトで管理者になります。

## 管理者アカウント

**ユーザークエリ**を利用して、テンプレートや PHP コード内でユーザーを取得できます。

Craft Pro を使っている場合、サイトのユーザーアカウントを整理したり、権限を一括設定するためにユーザーグループを作成することができます。
```twig
{# Create a new user query #}
{% set myUserQuery = craft.users() %}
```
```php
// Create a new user query
$myUserQuery = \craft\elements\User::find();
```
:::

ユーザークエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。 さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。 [User](craft3:craft\elements\User) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。 :::
:::

### 実例

Craft の権限は次の通りです。

1. `craft.users()` でユーザークエリを作成します。
2. [group](#group) パラメータをセットします。
3. `.all()` でユーザーを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用してユーザーをループ処理し、リストの HTML を作成します。

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

### パラメータ

Craft Pro には、一般ユーザーの登録を許可するオプションがあり、デフォルトで無効化されています。

<!-- BEGIN PARAMS -->

| 権限                                        | ハンドル                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [権限](#admin)                              | 「管理」権限を持つユーザーだけに、クエリの結果を絞り込みます。                                                                                                                                                                                                                                                         |
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.                                                                                                                                                                                                                                    |
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only users that are related to certain other elements.                                                                                                                                                                                                     |
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.                                                                                                                                                                                                                                        |
| [asArray](#asarray)                       | Causes the query to return matching users as arrays of data, rather than [User](craft3:craft\elements\User) objects.                                                                                                                                                                  |
| [cache](#cache)                           | Enables query cache for this Query.                                                                                                                                                                                                                                                     |
| [can](#can)                               | Narrows the query results to only users that have a certain user permission, either directly on the user account or through one of their user groups.                                                                                                                                   |
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).                                                                                                                                                                                                   |
| [dateCreated](#datecreated)               | Narrows the query results based on the users’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#dateupdated)               | Narrows the query results based on the users’ last-updated dates.                                                                                                                                                                                                                       |
| [email](#email)                           | Narrows the query results based on the users’ email addresses.                                                                                                                                                                                                                          |
| [firstName](#firstname)                   | Narrows the query results based on the users’ first names.                                                                                                                                                                                                                              |
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                            |
| [getCacheTags](#getcachetags)             |                                                                                                                                                                                                                                                                                         |
| [group](#group)                           | Narrows the query results based on the user group the users belong to.                                                                                                                                                                                                                  |
| [groupId](#groupid)                       | Narrows the query results based on the user group the users belong to, per the groups’ IDs.                                                                                                                                                                                             |
| [hasPhoto](#hasphoto)                     | Narrows the query results to only users that have (or don’t have) a user photo.                                                                                                                                                                                                         |
| [id](#id)                                 | Narrows the query results based on the users’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching users as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                               |
| [lastLoginDate](#lastlogindate)           | Narrows the query results based on the users’ last login dates.                                                                                                                                                                                                                         |
| [lastName](#lastname)                     | Narrows the query results based on the users’ last names.                                                                                                                                                                                                                               |
| [limit](#limit)                           | Determines the number of users that should be returned.                                                                                                                                                                                                                                 |
| [offset](#offset)                         | Determines how many users should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                       | Determines the order that the users should be returned in. (If empty, defaults to `username ASC`.)                                                                                                                                                                                      |
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                              |
| [provisionalDrafts](#provisionaldrafts)   | Narrows the query results to only provisional drafts.                                                                                                                                                                                                                                   |
| [relatedTo](#relatedto)                   | Narrows the query results to only users that are related to certain other elements.                                                                                                                                                                                                     |
| [savedDraftsOnly](#saveddraftsonly)       | Narrows the query results to only unpublished drafts which have been saved after initial creation.                                                                                                                                                                                      |
| [search](#search)                         | Narrows the query results to only users that match a search query.                                                                                                                                                                                                                      |
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the users’ IDs in the `elements_sites` table.                                                                                                                                                                                                        |
| [status](#status)                         | Narrows the query results based on the users’ statuses.                                                                                                                                                                                                                                 |
| [trashed](#trashed)                       | Narrows the query results to only users that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#uid)                               | Narrows the query results based on the users’ UIDs.                                                                                                                                                                                                                                     |
| [username](#username)                     | Narrows the query results based on the users’ usernames.                                                                                                                                                                                                                                |
| [with](#with)                             | Causes the query to return matching users eager-loaded with related elements.                                                                                                                                                                                                           |
| [withGroups](#withgroups)                 | Causes the query to return matching users eager-loaded with their user groups.                                                                                                                                                                                                          |

#### `admin`

「管理」権限を持つユーザーだけに、クエリの結果を絞り込みます。



サイトに一般ユーザーの登録を許可する設定を行ったら、最後のステップとしてフロントエンドに[ユーザー登録フォーム](dev/examples/user-registration-form.md)を作成します。
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


#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only users that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



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


#### `cache`

Enables query cache for this Query.










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

Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the users’ creation dates.



Possible values include:

| 値                                                | 取得するユーザー                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



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

| 値                                                | 取得するユーザー                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



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

| 値                   | 取得するユーザー                     |
| ------------------- | ---------------------------- |
| `'foo@bar.baz'`     | メールアドレスが `foo@bar.baz`。      |
| `'not foo@bar.baz'` | メールアドレスが `foo@bar.baz` ではない。 |
| `'*@bar.baz'`       | メールアドレスが `@bar.baz` で終わる。    |



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

| 値            | 取得するユーザー               |
| ------------ | ---------------------- |
| `'Jane'`     | ファーストネームが `Jane`。      |
| `'not Jane'` | ファーストネームが `Jane` ではない。 |



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


#### `getCacheTags`








#### `group`

Narrows the query results based on the user group the users belong to.

Possible values include:

| 値                                                   | 取得するユーザー                          |
| --------------------------------------------------- | --------------------------------- |
| `'foo'`                                             | ハンドルが `foo` のグループ内。               |
| `'not foo'`                                         | ハンドルが `foo` のグループ内ではない。           |
| `['foo', 'bar']`                                    | ハンドルが `foo` または `bar` のグループ内。     |
| `['not', 'foo', 'bar']`                             | ハンドルが `foo` または `bar` のグループ内ではない。 |
| [UserGroup](craft3:craft\models\UserGroup) オブジェクト | オブジェクトで表されるグループ内。                 |



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

| 値               | 取得するユーザー                 |
| --------------- | ------------------------ |
| `1`             | ID が 1 のグループ内。           |
| `'not 1'`       | ID が 1 のグループ内ではない。       |
| `[1, 2]`        | ID が 1 または 2 のグループ内。     |
| `['not', 1, 2]` | ID が 1 または 2 のグループ内ではない。 |



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

| 値               | 取得するユーザー           |
| --------------- | ------------------ |
| `1`             | ID が 1。            |
| `'not 1'`       | ID が 1ではない。        |
| `[1, 2]`        | ID が 1 または 2。      |
| `['not', 1, 2]` | ID が 1 または 2 ではない。 |



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

Causes the query to return matching users as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










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

| 値                                                | 取得するユーザー                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に最終ログインされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に最終ログインされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に最終ログインされたもの。 |



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

| 値           | 取得するユーザー            |
| ----------- | ------------------- |
| `'Doe'`     | ラストネームが `Doe`。      |
| `'not Doe'` | ラストネームが `Doe` ではない。 |



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

If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

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


#### `provisionalDrafts`

Narrows the query results to only provisional drafts.





::: code
```twig
{# Fetch provisional drafts created by the current user #}
{% set users = craft.users()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$users = \craft\elements\User::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
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


#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft users #}
{% set users = {twig-function}
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft users
$users = \craft\elements\User::find()
    ->draftOf(false)
    ->savedDraftsOnly()
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


#### `siteSettingsId`

Narrows the query results based on the users’ IDs in the `elements_sites` table.



Possible values include:

| 値               | 取得するユーザー                                   |
| --------------- | ------------------------------------------ |
| `1`             | with an `elements_sites` ID of 1.          |
| `'not 1'`       | not with an `elements_sites` ID of 1.      |
| `[1, 2]`        | with an `elements_sites` ID of 1 or 2.     |
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2. |



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

| 値                                | 取得するユーザー                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| `'active'` _(default)_           | with active accounts.                                                     |
| `'suspended'`                    | with suspended accounts.                                                  |
| `'pending'`                      | with accounts that are still pending activation.                          |
| `'locked'`                       | with locked accounts (regardless of whether they’re active or suspended). |
| `['active', 'suspended']`        | with active or suspended accounts.                                        |
| `['not', 'active', 'suspended']` | without active or suspended accounts.                                     |



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

| Value       | Fetches users…                |
| ----------- | ----------------------------- |
| `'foo'`     | with a username of `foo`.     |
| `'not foo'` | not with a username of `foo`. |



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


#### `withGroups`

Causes the query to return matching users eager-loaded with their user groups.

Possible values include:

| Value                                            | Fetches users…                                         |
| ------------------------------------------------ | ------------------------------------------------------ |
| `'>= 2018-04-01'`                             | that last logged-in on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that last logged-in before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that last logged-in between 2018-04-01 and 2018-05-01. |



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



<!-- END PARAMS -->
