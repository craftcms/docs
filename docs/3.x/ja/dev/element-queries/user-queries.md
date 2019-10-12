# ユーザークエリ

**ユーザークエリ**を使用して、テンプレートや PHP コード内でユーザーを取得できます。

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

ユーザークエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](README.md#executing-element-queries)できます。[User](api:craft\elements\User) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリについて](README.md)を参照してください。
:::

## 実例

次の操作を行うことで、「Authors」ユーザーグループに含まれるユーザーのリストを表示できます。

1. `craft.users()` でユーザークエリを作成します。
2. [group](#group) パラメータをセットします。
3. `.all()` でユーザーを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを使用してユーザーをループ処理し、リストの HTML を作成します。

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

## パラメータ

ユーザークエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

### `admin`

「管理」権限を持つユーザーだけに、クエリの結果を絞り込みます。



::: code
```twig
{# Fetch admins #}
{% set elements = {twig-function}
    .admin()
    .all() %}
```

```php
// Fetch admins
$elements = ElementClass::find()
    ->admin()
    ->all();
```
:::


### `anyStatus`

[status](#status) および [enabledForSite()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-enabledforsite) パラメータをクリアします。





::: code
```twig
{# Fetch all elements, regardless of status #}
{% set elements = craft.queryFunction()
    .anyStatus()
    .all() %}
```

```php
// Fetch all elements, regardless of status
$elements = ElementClass::find()
    ->anyStatus()
    ->all();
```
:::


### `asArray`

ElementClass オブジェクトではなく、データの配列として、マッチしたエレメントをクエリが返します。





::: code
```twig
{# Fetch elements as arrays #}
{% set elements = craft.queryFunction()
    .asArray()
    .all() %}
```

```php
// Fetch elements as arrays
$elements = ElementClass::find()
    ->asArray()
    ->all();
```
:::


### `can`

直接ユーザーアカウントにセットされているかユーザーグループの1つを通してセットされている、特定のユーザー権限を持つユーザーだけに、クエリの結果を絞り込みます。

Craft によって定義された利用可能なユーザー権限のリストは、[ユーザー](https://docs.craftcms.com/v3/users.html)を参照してください。



::: code
```twig
{# Fetch users that can access the Control Panel #}
{% set elements = {twig-function}
    .can('accessCp')
    .all() %}
```

```php
// Fetch users that can access the Control Panel
$elements = ElementClass::find()
    ->can('accessCp')
    ->all();
```
:::


### `dateCreated`

エレメントの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                                | 取得するエレメント                            |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch elements created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set elements = craft.queryFunction()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch elements created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$elements = ElementClass::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


### `dateUpdated`

エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。



利用可能な値には、次のものが含まれます。

| 値                                                | 取得するエレメント                                |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch elements updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set elements = craft.queryFunction()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch elements updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$elements = ElementClass::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


### `email`

ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                                                           | 取得するエレメント                    |
| --------------------------------------------------------------------------- | ---------------------------- |
| `r.baz'3d'foo@bar.baz'6c'foo@bar.baz'2f3.95654'foo@bar.baz'64'foo@bar.baz'` | メールアドレスが `foo@bar.baz`。      |
| a [craft\elements\User](api:craft\elements\User) object                 | メールアドレスが `foo@bar.baz` ではない。 |



::: code
```twig
{# Fetch users with a .co.uk domain on their email address #}
{% set elements = craft.queryFunction()
    .email('*.co.uk')
    .all() %}
```

```php
// Fetch users with a .co.uk domain on their email address
$elements = ElementClass::find()
    ->email('*.co.uk')
    ->all();
```
:::


### `firstName`

ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                            | 取得するエレメント         |
| ---------------------------- | ----------------- |
| `6fc090.362772'Jane'4'Jane'` | ファーストネームが `Jane`。 |



::: code
```twig
{# Fetch all the Jane's #}
{% set elements = craft.queryFunction()
    .firstName('Jane')
    .all() %}
```

```php
// Fetch all the Jane's
$elements = ElementClass::find()
    ->firstName('Jane')
    ->one();
```
:::


### `fixedOrder`

クエリの結果を [id](#id) で指定された順序で返します。



::: code

| 値                       | 取得するエレメント               |
| ----------------------- | ----------------------- |
| `284.0886'foo'053'foo'` | ハンドルが `foo` のグループ内。     |
| a ElementClass object   | ハンドルが `foo` のグループ内ではない。 |



:::
```twig
{# Fetch elements in a specific order #}
{% set elements = craft.queryFunction()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch elements in a specific order
$elements = ElementClass::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


### `group`

利用可能な値には、次のものが含まれます。





::: code
```twig
{# Fetch elements in the Foo user group #}
{% set elements = craft.queryFunction()
    .group('foo')
    .all() %}
```

```php
// Fetch elements in the Foo user group
$elements = ElementClass::find()
    ->group('foo')
    ->all();
```
:::


### `groupId`

グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値         | 取得するエレメント            |
| --------- | -------------------- |
| `1`       | ID が 1 のグループ内。       |
| `'not 1'` | ID が 1 のグループ内ではない。   |
| `[1, 2]`  | ID が 1 または 2 のグループ内。 |



::: code
```twig
{# Fetch elements in a group with an ID of 1 #}
{% set elements = craft.queryFunction()
    .groupId(1)
    .all() %}
```

```php
// Fetch elements in a group with an ID of 1
$elements = ElementClass::find()
    ->groupId(1)
    ->all();
```
:::


### `id`

エレメントの ID に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値         | 取得するエレメント   |
| --------- | ----------- |
| `1`       | ID が 1。     |
| `'not 1'` | ID が 1ではない。 |



::: code
```twig
{# Fetch the element by its ID #}
{% set element = craft.queryFunction()
    .id(1)
    .one() %}
```

```php
// Fetch the element by its ID
$element = ElementClass::find()
    ->id(1)
    ->one();
```
:::


### `inReverse`

::: tip
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::





クエリの結果を逆順で返します。
```twig
{# Fetch elements in reverse #}
{% set elements = craft.queryFunction()
    .inReverse()
    .all() %}
```

```php
// Fetch elements in reverse
$elements = ElementClass::find()
    ->inReverse()
    ->all();
```
:::


### `lastLoginDate`

:::

ユーサーの最終ログイン日に基づいて、クエリの結果を絞り込みます。

| 値                                                  | 取得するエレメント                                       |
| -------------------------------------------------- | ----------------------------------------------- |
| `'>= 2018-04-01'`                               | 2018-04-01 以降に最終ログインされたもの。                      |
| `'< 2018-05-01'`                                | 2018-05-01 より前に最終ログインされたもの。                     |
| `['and', '>= 2018-04-04', '< 2018-05-01']`   | 2018-04-01 から 2018-05-01 の間に最終ログインされたもの。        |
| `['not', 'foo', 'bar']`                            | not in a group with a handle of `foo` or `bar`. |
| a [UserGroup](api:craft\models\UserGroup) object | in a group represented by the object.           |



利用可能な値には、次のものが含まれます。
```twig
{# Fetch elements that logged in recently #}
{% set aWeekAgo = date('7 days ago')|atom %}

{% set elements = craft.queryFunction()
    .lastLoginDate(">= #{aWeekAgo}")
    .all() %}
```

```php
// Fetch elements that logged in recently
$aWeekAgo = (new \DateTime('7 days ago'))->format(\DateTime::ATOM);

$elements = ElementClass::find()
    ->lastLoginDate(">= {$aWeekAgo}")
    ->all();
```
:::


### `lastName`

:::

ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。

| 値                       | 取得するエレメント                            |
| ----------------------- | ------------------------------------ |
| `Doe'b44.50395768'Doe'` | ラストネームが `Doe`。                       |
| `'not Doe'`             | ラストネームが `Doe` ではない。                  |
| `[1, 2]`                | in a group with an ID of 1 or 2.     |
| `['not', 1, 2]`         | not in a group with an ID of 1 or 2. |



利用可能な値には、次のものが含まれます。
```twig
{# Fetch all the Doe's #}
{% set elements = craft.queryFunction()
    .lastName('Doe')
    .all() %}
```

```php
// Fetch all the Doe's
$elements = ElementClass::find()
    ->lastName('Doe')
    ->one();
```
:::


### `limit`

:::



返されるエレメントの数を決定します。

| 値             | 取得するエレメント                           |
| ------------- | ----------------------------------- |
| `1`           | 有効なアカウント。                           |
| `'suspended'` | 停止されているアカウント。                       |
| `'pending'`   | アクティベーションが保留されているアカウント。             |
| `'locked'`    | （それが有効か停止されているかに関わらず）ロックされているアカウント。 |



::: code
```twig
{# Fetch up to 10 elements  #}
{% set elements = craft.queryFunction()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 elements
$elements = ElementClass::find()
    ->limit(10)
    ->all();
```
:::



結果からスキップされるエレメントの数を決定します。


### `offset`

::: code










### `orderBy`

:::





返されるエレメントの順序を決定します。
```twig
{# Fetch all elements except for the first 3 #}
{% set elements = craft.queryFunction()
    .offset(3)
    .all() %}
```

```php
// Fetch all elements except for the first 3
$elements = ElementClass::find()
    ->offset(3)
    ->all();
```
:::


### `relatedTo`

:::

特定の他のエレメントと関連付けられたエレメントだけに、クエリの結果を絞り込みます。

| 値                                                | 取得するエレメント                                              |
| ------------------------------------------------ | ------------------------------------------------------ |
| `'foo'`                                          | ユーザー名が `foo`。                                          |
| `'not foo'`                                      | ユーザー名が `foo` ではない。                                     |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that last logged-in between 2018-04-01 and 2018-05-01. |



このパラメーターがどのように機能するかの詳細については、[リレーション](https://docs.craftcms.com/v3/relations.html)を参照してください。
```twig
{# Fetch all elements in order of date created #}
{% set elements = craft.queryFunction()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all elements in order of date created
$elements = ElementClass::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


### `search`

:::

検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。

| Value       | Fetches elements…              |
| ----------- | ------------------------------ |
| `'Doe'`     | with a last name of `Doe`.     |
| `'not Doe'` | not with a last name of `Doe`. |



このパラメーターがどのように機能するかの詳細については、[検索](https://docs.craftcms.com/v3/searching.html)を参照してください。
```twig
{# Fetch all elements that are related to myCategory #}
{% set elements = craft.queryFunction()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all elements that are related to $myCategory
$elements = ElementClass::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


### `status`

:::



エレメントのステータスに基づいて、クエリの結果を絞り込みます。
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all elements that match the search query #}
{% set elements = craft.queryFunction()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all elements that match the search query
$elements = ElementClass::find()
    ->search($searchQuery)
    ->all();
```
:::


### `trashed`

::: code



:::
```twig
{# Fetch active and locked elements #}
{% set elements = {twig-function}
    .status(['active', 'locked'])
    .all() %}
```

```php
// Fetch active and locked elements
$elements = ElementClass::find()
    ->status(['active', 'locked'])
    ->all();
```
:::


### `uid`

::: code



:::
```twig
{# Fetch trashed elements #}
{% set elements = {twig-function}
    .trashed()
    .all() %}
```

```php
// Fetch trashed elements
$elements = ElementClass::find()
    ->trashed()
    ->all();
```
:::


### `username`

::: code



:::

ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。
```twig
{# Fetch the element by its UID #}
{% set element = craft.queryFunction()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the element by its UID
$element = ElementClass::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `with`

:::



関連付けられたエレメントを eager-loaded した状態で、マッチしたエレメントをクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントのEager-Loading](https://docs.craftcms.com/v3/dev/eager-loading-elements.html)を参照してください。
```twig
{# Get the requested username #}
{% set requestedUsername = craft.app.request.getSegment(2) %}

{# Fetch that user #}
{% set element = craft.queryFunction()
    .username(requestedUsername|literal)
    .one() %}
```

```php
// Get the requested username
$requestedUsername = \Craft::$app->request->getSegment(2);

// Fetch that user
$element = ElementClass::find()
    ->username(\craft\helpers\Db::escapeParam($requestedUsername))
    ->one();
```
:::


### `revisionCreator`

:::



Possible values include:

| Value                                                       | Fetches revisions…                     |
| ----------------------------------------------------------- | -------------------------------------- |
| `1`                                                         | created by the user with an ID of 1.   |
| a [craft\elements\User](api:craft\elements\User) object | by the user represented by the object. |



::: code
```twig
{# Fetch elements eager-loaded with the "Related" field’s relations #}
{% set elements = craft.queryFunction()
    .with(['related'])
    .all() %}
```

```php
// Fetch elements eager-loaded with the "Related" field’s relations
$elements = ElementClass::find()
    ->with(['related'])
    ->all();
```
:::


### `revisionId`

Narrows the query results based on the elements’ revision’s ID (from the `revisions` table).



Possible values include:

| Value | Fetches revisions…                |
| ----- | --------------------------------- |
| `1`   | for the revision with an ID of 1. |



::: code
```twig
{# Fetch a revision #}
{% set elements = craft.queryFunction()
    .revisionId(10)
    .all() %}
```

```php
// Fetch a revision
$elements = ElementClass::find()
    ->revisionIf(10)
    ->all();
```
:::


### `revisionOf`

Narrows the query results to only revisions of a given element.



Possible values include:

| Value                 | Fetches revisions…                         |
| --------------------- | ------------------------------------------ |
| `1`                   | for the element with an ID of 1.           |
| a ElementClass object | for the element represented by the object. |



::: code
```twig
{# Fetch revisions of the element #}
{% set elements = craft.queryFunction()
    .revisionOf(myElement)
    .all() %}
```

```php
// Fetch revisions of the element
$elements = ElementClass::find()
    ->revisionOf($myElement)
    ->all();
```
:::


### `revisions`

Narrows the query results to only revision elements.





::: code
```twig
{# Fetch a revision element #}
{% set elements = {twig-function}
    .revisions()
    .id(123)
    .one() %}
```

```php
// Fetch a revision element
$elements = ElementClass::find()
    ->revisions()
    ->id(123)
    ->one();
```
:::


### `search`

Narrows the query results to only elements that match a search query.



See [Searching](https://docs.craftcms.com/v3/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all elements that match the search query #}
{% set elements = craft.queryFunction()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all elements that match the search query
$elements = ElementClass::find()
    ->search($searchQuery)
    ->all();
```
:::


### `status`

Narrows the query results based on the elements’ statuses.

Possible values include:

| Value                     | Fetches elements…                                                         |
| ------------------------- | ------------------------------------------------------------------------- |
| `'active'` _(default)_    | with active accounts.                                                     |
| `'suspended'`             | with suspended accounts.                                                  |
| `'pending'`               | with accounts that are still pending activation.                          |
| `'locked'`                | with locked accounts (regardless of whether they’re active or suspended). |
| `['active', 'suspended']` | with active or suspended accounts.                                        |



::: code
```twig
{# Fetch active and locked elements #}
{% set elements = craft.queryFunction()
    .status(['active', 'locked'])
    .all() %}
```

```php
// Fetch active and locked elements
$elements = ElementClass::find()
    ->status(['active', 'locked'])
    ->all();
```
:::


### `trashed`

Narrows the query results to only elements that have been soft-deleted.





::: code
```twig
{# Fetch trashed elements #}
{% set elements = craft.queryFunction()
    .trashed()
    .all() %}
```

```php
// Fetch trashed elements
$elements = ElementClass::find()
    ->trashed()
    ->all();
```
:::


### `uid`

Narrows the query results based on the elements’ UIDs.





::: code
```twig
{# Fetch the element by its UID #}
{% set element = craft.queryFunction()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the element by its UID
$element = ElementClass::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `username`

Narrows the query results based on the users’ usernames.

Possible values include:

| Value       | Fetches elements…             |
| ----------- | ----------------------------- |
| `'foo'`     | with a username of `foo`.     |
| `'not foo'` | not with a username of `foo`. |



::: code
```twig
{# Get the requested username #}
{% set requestedUsername = craft.app.request.getSegment(2) %}

{# Fetch that user #}
{% set element = craft.queryFunction()
    .username(requestedUsername|literal)
    .one() %}
```

```php
// Get the requested username
$requestedUsername = \Craft::$app->request->getSegment(2);

// Fetch that user
$element = ElementClass::find()
    ->username(\craft\helpers\Db::escapeParam($requestedUsername))
    ->one();
```
:::


### `with`

Causes the query to return matching elements eager-loaded with related elements.



See [Eager-Loading Elements](https://docs.craftcms.com/v3/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch elements eager-loaded with the "Related" field’s relations #}
{% set elements = craft.queryFunction()
    .with(['related'])
    .all() %}
```

```php
// Fetch elements eager-loaded with the "Related" field’s relations
$elements = ElementClass::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->

