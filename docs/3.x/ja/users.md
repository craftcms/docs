# ユーザー

ユーザーとは、人々を Craft が表現するものです。

それぞれのユーザーは、デフォルトのメールアドレスとユーザー名、および、名前・写真・パスワードのオプションフィールドを持っています。他のエレメント同様、ユーザーは追加のカスタムフィールドをいくつでも持つことができます。

サイトの構築方法やコントロールパネルにユーザーのアクセスを許可するかどうかによって、関連するローカリゼーション、アクセシビリティ、および、デバッグについても設定できます。

ユーザーは、[権限を微調整](user-management.md)するために作られたグループの一部にできます。

## ユーザーの照会

**ユーザークエリ**を利用して、テンプレートや PHP コード内でユーザーを取得できます。

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

ユーザークエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。[User](craft3:craft\elements\User) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。
:::

### 実例

次の操作を行うことで、「Authors」ユーザーグループに含まれるユーザーのリストを表示できます。

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

ユーザークエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ | 説明 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [admin](#admin) | 「管理」権限を持つユーザーだけに、クエリの結果を絞り込みます。 |
| [anyStatus](#anystatus) | ステータスに基づくエレメントのフィルタを削除します。 |
| [asArray](#asarray) | [User](craft3:craft\elements\User) オブジェクトではなく、データの配列として、マッチしたユーザーをクエリが返します。 |
| [can](#can) | 直接ユーザーアカウントにセットされているかユーザーグループの1つを通してセットされている、特定のユーザー権限を持つユーザーだけに、クエリの結果を絞り込みます。 |
| [clearCachedResult](#clearcachedresult) | キャッシュされた結果をクリアします。 |
| [dateCreated](#datecreated) | ユーザーの作成日に基づいて、クエリの結果を絞り込みます。 |
| [dateUpdated](#dateupdated) | ユーザーの最終アップデート日に基づいて、クエリの結果が絞り込まれます。 |
| [email](#email) | ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。 |
| [firstName](#firstname) | ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。 |
| [fixedOrder](#fixedorder) | クエリの結果を [id](#id) で指定された順序で返します。 |
| [group](#group) | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。 |
| [groupId](#groupid) | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。 |
| [hasPhoto](#hasphoto) | ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。 |
| [id](#id) | ユーザーの ID に基づいて、クエリの結果を絞り込みます。 |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするユーザーをクエリが返します。 |
| [inReverse](#inreverse) | クエリの結果を逆順で返します。 |
| [lastLoginDate](#lastlogindate) | ユーサーの最終ログイン日に基づいて、クエリの結果を絞り込みます。 |
| [lastName](#lastname) | ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。 |
| [limit](#limit) | 返されるユーザーの数を決定します。 |
| [offset](#offset) | 結果からスキップされるユーザーの数を決定します。 |
| [orderBy](#orderby) | 返されるユーザーの順序を決定します。（空の場合、デフォルトは `username ASC`） |
| [preferSites](#prefersites) | [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します。 |
| [relatedTo](#relatedto) | 特定の他のエレメントと関連付けられたユーザーだけに、クエリの結果を絞り込みます。 |
| [search](#search) | 検索クエリにマッチするユーザーだけに、クエリの結果を絞り込みます。 |
| [status](#status) | ユーザーのステータスに基づいて、クエリの結果を絞り込みます。 |
| [trashed](#trashed) | ソフトデリートされたユーザーだけに、クエリの結果を絞り込みます。 |
| [uid](#uid) | ユーザーの UID に基づいて、クエリの結果を絞り込みます。 |
| [username](#username) | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。 |
| [with](#with) | 関連付けられたエレメントを eager-loaded した状態で、マッチしたユーザーをクエリが返します。 |

#### `admin`

「管理」権限を持つユーザーだけに、クエリの結果を絞り込みます。



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

ステータスに基づくエレメントのフィルタを削除します。





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

[User](craft3:craft\elements\User) オブジェクトではなく、データの配列として、マッチしたユーザーをクエリが返します。





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

直接ユーザーアカウントにセットされているかユーザーグループの1つを通してセットされている、特定のユーザー権限を持つユーザーだけに、クエリの結果を絞り込みます。

Craft によって定義された利用可能なユーザー権限のリストは、[ユーザー管理](user-management.md)を参照してください。



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

キャッシュされた結果をクリアします。






#### `dateCreated`

ユーザーの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に作成されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に作成されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。



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

ユーザーの最終アップデート日に基づいて、クエリの結果が絞り込まれます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'>= 2018-04-01'` |  2018-04-01 以降にアップデートされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前にアップデートされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。



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

ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'foo@bar.baz'` | メールアドレスが `foo@bar.baz`。
| `'not foo@bar.baz'` | メールアドレスが `foo@bar.baz` ではない。
| `'*@bar.baz'` | メールアドレスが `@bar.baz` で終わる。



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

ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'Jane'` | ファーストネームが `Jane`。
| `'not Jane'` | ファーストネームが `Jane` ではない。



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

クエリの結果を [id](#id) で指定された順序で返します。





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

ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'foo'` | ハンドルが `foo` のグループ内。
| `'not foo'` | ハンドルが `foo` のグループ内ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のグループ内。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のグループ内ではない。
| [UserGroup](craft3:craft\models\UserGroup) オブジェクト | オブジェクトで表されるグループ内。



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

グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `1` | ID が 1 のグループ内。
| `'not 1'` | ID が 1 のグループ内ではない。
| `[1, 2]` | ID が 1 または 2 のグループ内。
| `['not', 1, 2]` | ID が 1 または 2 のグループ内ではない。



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

ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。



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

ユーザーの ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `1` | ID が 1。
| `'not 1'` | ID が 1ではない。
| `[1, 2]` | ID が 1 または 2。
| `['not', 1, 2]` | ID が 1 または 2 ではない。



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
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::


#### `ignorePlaceholders`

[craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするユーザーをクエリが返します。










#### `inReverse`

クエリの結果を逆順で返します。





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

ユーサーの最終ログイン日に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に最終ログインされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に最終ログインされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に最終ログインされたもの。



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

ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'Doe'` | ラストネームが `Doe`。
| `'not Doe'` | ラストネームが `Doe` ではない。



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

返されるユーザーの数を決定します。



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

結果からスキップされるユーザーの数を決定します。



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

返されるユーザーの順序を決定します。（空の場合、デフォルトは `username ASC`）



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

[unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します。



例えば、エレメント “Foo” がサイト A とサイト B に存在し、エレメント “Bar” がサイト B とサイト C に存在し、ここに `['c', 'b', 'a']` がセットされている場合、Foo will はサイト C に対して返され、Bar はサイト B に対して返されます。

これがセットされていない場合、現在のサイトが優先されます。



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

特定の他のエレメントと関連付けられたユーザーだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](relations.md)を参照してください。



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

検索クエリにマッチするユーザーだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[検索](searching.md)を参照してください。



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

ユーザーのステータスに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'active'` _（デフォルト）_ | 有効なアカウント。
| `'suspended'` | 停止されているアカウント。
| `'pending'` | アクティベーションが保留されているアカウント。
| `'locked'` | （それが有効か停止されているかに関わらず）ロックされているアカウント。
| `['active', 'suspended']` | 有効、または、停止されているアカウント。



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

ソフトデリートされたユーザーだけに、クエリの結果を絞り込みます。





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

ユーザーの UID に基づいて、クエリの結果を絞り込みます。





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

ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するユーザー
| - | -
| `'foo'` | ユーザー名が `foo`。
| `'not foo'` | ユーザー名が `foo` ではない。



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

関連付けられたエレメントを eager-loaded した状態で、マッチしたユーザーをクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントの Eager-Loading](dev/eager-loading-elements.md) を参照してください。



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
