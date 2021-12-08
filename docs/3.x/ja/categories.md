# カテゴリ

カテゴリを利用して、[エントリ](sections-and-entries.md)、[ユーザー](users.md)、および、[アセット](assets.md)の分類を作成できます。

## カテゴリグループ

カテゴリを作成する前に、それらを含めるためのカテゴリグループを作成しなければなりません。 それぞれのカテゴリグループには、次のことを定義できます。

- カテゴリグループの名前
- カテゴリグループのハンドル（テンプレートから、そのカテゴリグループを参照する方法）
- そのグループの中にネストできるカテゴリの最大レベル
- カテゴリ URI 形式
- カテゴリ URL にアクセスされたとき、どのテンプレートを読み込むか
- グループ内のカテゴリがどんな[フィールド](fields.md)を持つべきか

新しいカテゴリグループを作るには、「設定 > カテゴリ」に移動し、「新しいカテゴリーグループ」ボタンをクリックします。

少なくとも1つのカテゴリグループを作成すると、そのグループのカテゴリを作成できるようになります。

## カテゴリフィールドレイアウト

それぞれのカテゴリグループは、グループ内のカテゴリに関連付けられたデータをカスタマイズできる独自のフィールドレイアウトを持っています。 デフォルトでは、すべてのカテゴリはタイトルフィールド（カテゴリ名）を持っています。

Craft 内で利用可能なすべてのフィールドタイプを使って、フィールドを追加することもできます。 まだフィールドが存在しなければ、先に「設定 > フィールド」から作成しなければなりません。 新しいフィールドは、カテゴリグループのフィールドレイアウトに割り当てられるようになります。

## カテゴリの作成と編集

少なくとも1つのカテゴリグループがあれば、コントロールパネルのメインナビゲーションに「カテゴリ」タブが表示されます。 クリックすると、カテゴリのインデックスに移動します。 サイドバーからカテゴリグループを選択すると、そのグループに含まれるカテゴリを追加 / 並び替え / 削除できます。

![カテゴリインデックス](./images/categories-category-index.png)

カテゴリをダブルクリックすると、カテゴリの名前やスラグ、および、グループに関連付けられたすべてのフィールドを編集できるモーダルウィンドウが開きます。

![カテゴリの編集モーダル](./images/categories-edit-popup.png)

カテゴリを作成するときのオプションは、次の通りです。

- カテゴリフィールドへの記入（フィールドを定義していなければ、タイトルフィールドだけが利用可能となります）
- スラグの編集（タイトルに基づいて、自動的に入力されます）
- 親カテゴリの選択。 新しいカテゴリは、親カテゴリと階層的な関係を持ちます。 これはマルチレベルで分類を作成する際に役立ちます。 親を割り当てる際に新しいカテゴリを作成するオプションもあります。

::: tip
カテゴリグループの設定にある最大レベル欄で指定したレベルまでしか、カテゴリをネストできません。 レベルを指定していない場合、無制限にネストできます。
:::

## カテゴリの割り当て

項目（エントリ、アセット、ユーザーなど）にカテゴリを割り当てるには、先に[カテゴリフィールド](categories-fields.md)を作成しなければなりません。

それぞれのカテゴリフィールドは、1つのカテゴリグループに接続されています。 そのフィールドが付加されたものは何でも、グループに含まれるすべてのカテゴリとの[リレーション](relations.md)を持つことができます。

## カテゴリの照会

**カテゴリクエリ**を利用して、テンプレートや PHP コード内でカテゴリを取得できます。

::: code
```twig
{# Create a new category query #}
{% set myCategoryQuery = craft.categories() %}
```
```php
// Create a new category query
$myCategoryQuery = \craft\elements\Category::find();
```
:::

カテゴリクエリを作成すると、結果を絞り込むための[parameters](#parameters)をセットできます。 さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。 [Category](craft3:craft\elements\Category) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。 :::
:::

### 実例

次の操作を行うことで、「Topics」カテゴリグループに含まれるすべてのカテゴリのナビゲーションを表示できます。

1. `craft.categories()` でカテゴリクエリを作成します。
2. [group](#group) パラメータをセットします。
3. `.all()` でカテゴリを取得します。
4. [nav](tags.md#nav) タグを利用してカテゴリをループ処理し、ナビゲーションの HTML を作成します。

```twig
{# Create a category query with the 'group' parameter #}
{% set myCategoryQuery = craft.categories()
  .group('topics') %}

{# Fetch the categories #}
{% set categories = myCategoryQuery.all() %}

{# Display the navigation #}
<ul>
  {% nav category in categories %}
    <li>
      <a href="{{ category.url }}">{{ category.title }}</a>
      {% ifchildren %}
        <ul>
          {% children %}
        </ul>
      {% endifchildren %}
    </li>
  {% endnav %}
</ul>
```

::: tip
To maintain the exact order you see in the control panel, add `orderBy('lft ASC')` to your query:
```twig
{% set myCategoryQuery = craft.categories()
  .group('topics')
  .orderBy('lft ASC') %}
```
:::

### パラメータ

Category queries support the following parameters:

<!-- BEGIN PARAMS -->

| パラメータ                                     | 説明                                                                                                                                                                                                                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.                                                                                                                                                                                                                                         |
| [ancestorDist](#ancestordist)             | Narrows the query results to only categories that are up to a certain distance away from the category specified by [ancestorOf](#ancestorof).                                                                                                                                                |
| [ancestorOf](#ancestorof)                 | Narrows the query results to only categories that are ancestors of another category in its structure.                                                                                                                                                                                        |
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only categories that are related to certain other elements.                                                                                                                                                                                                     |
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.                                                                                                                                                                                                                                             |
| [asArray](#asarray)                       | Causes the query to return matching categories as arrays of data, rather than [Category](craft3:craft\elements\Category) objects.                                                                                                                                                          |
| [cache](#cache)                           | Enables query cache for this Query.                                                                                                                                                                                                                                                          |
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).                                                                                                                                                                                                        |
| [dateCreated](#datecreated)               | Narrows the query results based on the categories’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#dateupdated)               | Narrows the query results based on the categories’ last-updated dates.                                                                                                                                                                                                                       |
| [descendantDist](#descendantdist)         | Narrows the query results to only categories that are up to a certain distance away from the category specified by [descendantOf](#descendantof).                                                                                                                                            |
| [descendantOf](#descendantof)             | Narrows the query results to only categories that are descendants of another category in its structure.                                                                                                                                                                                      |
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                                 |
| [getCacheTags](#getcachetags)             |                                                                                                                                                                                                                                                                                              |
| [group](#group)                           | Narrows the query results based on the category groups the categories belong to.                                                                                                                                                                                                             |
| [groupId](#groupid)                       | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.                                                                                                                                                                                        |
| [hasDescendants](#hasdescendants)         | Narrows the query results based on whether the categories have any descendants in their structure.                                                                                                                                                                                           |
| [id](#id)                                 | Narrows the query results based on the categories’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching categories as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                                    |
| [leaves](#leaves)                         | Narrows the query results based on whether the categories are “leaves” (categories with no descendants).                                                                                                                                                                                     |
| [level](#level)                           | Narrows the query results based on the categories’ level within the structure.                                                                                                                                                                                                               |
| [limit](#limit)                           | Determines the number of categories that should be returned.                                                                                                                                                                                                                                 |
| [nextSiblingOf](#nextsiblingof)           | Narrows the query results to only the category that comes immediately after another category in its structure.                                                                                                                                                                               |
| [offset](#offset)                         | Determines how many categories should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                       | Determines the order that the categories should be returned in. (If empty, defaults to `dateCreated DESC`, or the order defined by the category group if the [group](#group) or [groupId](#groupid) params are set to a single group.)                                                       |
| [positionedAfter](#positionedafter)       | Narrows the query results to only categories that are positioned after another category in its structure.                                                                                                                                                                                    |
| [positionedBefore](#positionedbefore)     | Narrows the query results to only categories that are positioned before another category in its structure.                                                                                                                                                                                   |
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                                |
| [prevSiblingOf](#prevsiblingof)           | Narrows the query results to only the category that comes immediately before another category in its structure.                                                                                                                                                                              |
| [provisionalDrafts](#provisionaldrafts)   | Narrows the query results to only provisional drafts.                                                                                                                                                                                                                                        |
| [relatedTo](#relatedto)                   | Narrows the query results to only categories that are related to certain other elements.                                                                                                                                                                                                     |
| [savedDraftsOnly](#saveddraftsonly)       | Narrows the query results to only unpublished drafts which have been saved after initial creation.                                                                                                                                                                                           |
| [search](#search)                         | Narrows the query results to only categories that match a search query.                                                                                                                                                                                                                      |
| [siblingOf](#siblingof)                   | Narrows the query results to only categories that are siblings of another category in its structure.                                                                                                                                                                                         |
| [site](#site)                             | Determines which site(s) the categories should be queried in.                                                                                                                                                                                                                                |
| [siteId](#siteid)                         | Determines which site(s) the categories should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the categories’ IDs in the `elements_sites` table.                                                                                                                                                                                                        |
| [slug](#slug)                             | Narrows the query results based on the categories’ slugs.                                                                                                                                                                                                                                    |
| [status](#status)                         | Narrows the query results based on the categories’ statuses.                                                                                                                                                                                                                                 |
| [title](#title)                           | Narrows the query results based on the categories’ titles.                                                                                                                                                                                                                                   |
| [trashed](#trashed)                       | Narrows the query results to only categories that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#uid)                               | Narrows the query results based on the categories’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                            |
| [uri](#uri)                               | Narrows the query results based on the categories’ URIs.                                                                                                                                                                                                                                     |
| [with](#with)                             | Causes the query to return matching categories eager-loaded with related elements.                                                                                                                                                                                                           |

#### `afterPopulate`

Performs any post-population processing on elements.










#### `ancestorDist`

Narrows the query results to only categories that are up to a certain distance away from the category specified by [ancestorOf](#ancestorof).





::: code
```twig
{# Fetch categories above this one #}
{% set categories = craft.categories()
  .ancestorOf(myCategory)
  .ancestorDist(3)
  .all() %}
```

```php
// Fetch categories above this one
$categories = \craft\elements\Category::find()
    ->ancestorOf($myCategory)
    ->ancestorDist(3)
    ->all();
```
:::


#### `ancestorOf`

Narrows the query results to only categories that are ancestors of another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ            |
| --------------------------------------------------- | ------------------- |
| `1`                                                 | ID が 1 のカテゴリの上層。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの上層。 |



::: code
```twig
{# Fetch categories above this one #}
{% set categories = craft.categories()
  .ancestorOf(myCategory)
  .all() %}
```

```php
// Fetch categories above this one
$categories = \craft\elements\Category::find()
    ->ancestorOf($myCategory)
    ->all();
```
:::



::: tip
This can be combined with [ancestorDist](#ancestordist) if you want to limit how far away the ancestor categories can be.
:::


#### `andRelatedTo`

Narrows the query results to only categories that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all categories that are related to myCategoryA and myCategoryB #}
{% set categories = craft.categories()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all categories that are related to $myCategoryA and $myCategoryB
$categories = \craft\elements\Category::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all categories, regardless of status #}
{% set categories = craft.categories()
  .anyStatus()
  .all() %}
```

```php
// Fetch all categories, regardless of status
$categories = \craft\elements\Category::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching categories as arrays of data, rather than [Category](craft3:craft\elements\Category) objects.





::: code
```twig
{# Fetch categories as arrays #}
{% set categories = craft.categories()
  .asArray()
  .all() %}
```

```php
// Fetch categories as arrays
$categories = \craft\elements\Category::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the categories’ creation dates.



Possible values include:

| 値                                                | 取得するカテゴリ                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch categories created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set categories = craft.categories()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch categories created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$categories = \craft\elements\Category::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the categories’ last-updated dates.



Possible values include:

| 値                                                | 取得するカテゴリ                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch categories updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set categories = craft.categories()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch categories updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$categories = \craft\elements\Category::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `descendantDist`

Narrows the query results to only categories that are up to a certain distance away from the category specified by [descendantOf](#descendantof).





::: code
```twig
{# Fetch categories below this one #}
{% set categories = craft.categories()
  .descendantOf(myCategory)
  .descendantDist(3)
  .all() %}
```

```php
// Fetch categories below this one
$categories = \craft\elements\Category::find()
    ->descendantOf($myCategory)
    ->descendantDist(3)
    ->all();
```
:::


#### `descendantOf`

Narrows the query results to only categories that are descendants of another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ            |
| --------------------------------------------------- | ------------------- |
| `1`                                                 | ID が 1 のカテゴリの下層。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの下層。 |



::: code
```twig
{# Fetch categories below this one #}
{% set categories = craft.categories()
  .descendantOf(myCategory)
  .all() %}
```

```php
// Fetch categories below this one
$categories = \craft\elements\Category::find()
    ->descendantOf($myCategory)
    ->all();
```
:::



::: tip
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant categories can be.
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch categories in a specific order #}
{% set categories = craft.categories()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch categories in a specific order
$categories = \craft\elements\Category::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `getCacheTags`








#### `group`

Narrows the query results based on the category groups the categories belong to.

Possible values include:

| 値                                                           | 取得するカテゴリ                          |
| ----------------------------------------------------------- | --------------------------------- |
| `'foo'`                                                     | ハンドルが `foo` のグループ内。               |
| `'not foo'`                                                 | ハンドルが `foo` のグループ内ではない。           |
| `['foo', 'bar']`                                            | ハンドルが `foo` または `bar` のグループ内。     |
| `['not', 'foo', 'bar']`                                     | ハンドルが `foo` または `bar` のグループ内ではない。 |
| [CategoryGroup](craft3:craft\models\CategoryGroup) オブジェクト | オブジェクトで表されるグループ内。                 |



::: code
```twig
{# Fetch categories in the Foo group #}
{% set categories = craft.categories()
  .group('foo')
  .all() %}
```

```php
// Fetch categories in the Foo group
$categories = \craft\elements\Category::find()
    ->group('foo')
    ->all();
```
:::


#### `groupId`

Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.

Possible values include:

| 値               | 取得するカテゴリ                 |
| --------------- | ------------------------ |
| `1`             | ID が 1 のグループ内。           |
| `'not 1'`       | ID が 1 のグループ内ではない。       |
| `[1, 2]`        | ID が 1 または 2 のグループ内。     |
| `['not', 1, 2]` | ID が 1 または 2 のグループ内ではない。 |



::: code
```twig
{# Fetch categories in the group with an ID of 1 #}
{% set categories = craft.categories()
  .groupId(1)
  .all() %}
```

```php
// Fetch categories in the group with an ID of 1
$categories = \craft\elements\Category::find()
    ->groupId(1)
    ->all();
```
:::


#### `hasDescendants`

Narrows the query results based on whether the categories have any descendants in their structure.



(This has the opposite effect of calling [leaves](#leaves).)



::: code
```twig
{# Fetch categories that have descendants #}
{% set categories = craft.categories()
  .hasDescendants()
  .all() %}
```

```php
// Fetch categories that have descendants
$categories = \craft\elements\Category::find()
    ->hasDescendants()
    ->all();
```
:::


#### `id`

Narrows the query results based on the categories’ IDs.



Possible values include:

| 値               | 取得するカテゴリ           |
| --------------- | ------------------ |
| `1`             | ID が 1。            |
| `'not 1'`       | ID が 1ではない。        |
| `[1, 2]`        | ID が 1 または 2。      |
| `['not', 1, 2]` | ID が 1 または 2 ではない。 |



::: code
```twig
{# Fetch the category by its ID #}
{% set category = craft.categories()
  .id(1)
  .one() %}
```

```php
// Fetch the category by its ID
$category = \craft\elements\Category::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching categories as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch categories in reverse #}
{% set categories = craft.categories()
  .inReverse()
  .all() %}
```

```php
// Fetch categories in reverse
$categories = \craft\elements\Category::find()
    ->inReverse()
    ->all();
```
:::


#### `leaves`

Narrows the query results based on whether the categories are “leaves” (categories with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



::: code
```twig
{# Fetch categories that have no descendants #}
{% set categories = craft.categories()
  .leaves()
  .all() %}
```

```php
// Fetch categories that have no descendants
$categories = \craft\elements\Category::find()
    ->leaves()
    ->all();
```
:::


#### `level`

Narrows the query results based on the categories’ level within the structure.



Possible values include:

| 値               | 取得するカテゴリ           |
| --------------- | ------------------ |
| `1`             | レベルが 1。            |
| `'not 1'`       | レベルが 1 ではない。       |
| `'>= 3'`     | レベルが 3 以上。         |
| `[1, 2]`        | レベルが 1 または 2。      |
| `['not', 1, 2]` | レベルが 1 または 2 ではない。 |



::: code
```twig
{# Fetch categories positioned at level 3 or above #}
{% set categories = craft.categories()
  .level('>= 3')
  .all() %}
```

```php
// Fetch categories positioned at level 3 or above
$categories = \craft\elements\Category::find()
    ->level('>= 3')
    ->all();
```
:::


#### `limit`

Determines the number of categories that should be returned.



::: code
```twig
{# Fetch up to 10 categories  #}
{% set categories = craft.categories()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 categories
$categories = \craft\elements\Category::find()
    ->limit(10)
    ->all();
```
:::


#### `nextSiblingOf`

Narrows the query results to only the category that comes immediately after another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ           |
| --------------------------------------------------- | ------------------ |
| `1`                                                 | ID が 1 のカテゴリの後。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの後。 |



::: code
```twig
{# Fetch the next category #}
{% set category = craft.categories()
  .nextSiblingOf(myCategory)
  .one() %}
```

```php
// Fetch the next category
$category = \craft\elements\Category::find()
    ->nextSiblingOf($myCategory)
    ->one();
```
:::


#### `offset`

Determines how many categories should be skipped in the results.



::: code
```twig
{# Fetch all categories except for the first 3 #}
{% set categories = craft.categories()
  .offset(3)
  .all() %}
```

```php
// Fetch all categories except for the first 3
$categories = \craft\elements\Category::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the categories should be returned in. (If empty, defaults to `dateCreated DESC`, or the order defined by the category group if the [group](#group) or [groupId](#groupid) params are set to a single group.)



::: code
```twig
{# Fetch all categories in order of date created #}
{% set categories = craft.categories()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all categories in order of date created
$categories = \craft\elements\Category::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `positionedAfter`

Narrows the query results to only categories that are positioned after another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ           |
| --------------------------------------------------- | ------------------ |
| `1`                                                 | ID が 1 のカテゴリの後。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの後。 |



::: code
```twig
{# Fetch categories after this one #}
{% set categories = craft.categories()
  .positionedAfter(myCategory)
  .all() %}
```

```php
// Fetch categories after this one
$categories = \craft\elements\Category::find()
    ->positionedAfter($myCategory)
    ->all();
```
:::


#### `positionedBefore`

Narrows the query results to only categories that are positioned before another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ           |
| --------------------------------------------------- | ------------------ |
| `1`                                                 | ID が 1 のカテゴリの前。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの前。 |



::: code
```twig
{# Fetch categories before this one #}
{% set categories = craft.categories()
  .positionedBefore(myCategory)
  .all() %}
```

```php
// Fetch categories before this one
$categories = \craft\elements\Category::find()
    ->positionedBefore($myCategory)
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique categories from Site A, or Site B if they don’t exist in Site A #}
{% set categories = craft.categories()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique categories from Site A, or Site B if they don’t exist in Site A
$categories = \craft\elements\Category::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `prevSiblingOf`

Narrows the query results to only the category that comes immediately before another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ           |
| --------------------------------------------------- | ------------------ |
| `1`                                                 | ID が 1 のカテゴリの前。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの前。 |



::: code
```twig
{# Fetch the previous category #}
{% set category = craft.categories()
  .prevSiblingOf(myCategory)
  .one() %}
```

```php
// Fetch the previous category
$category = \craft\elements\Category::find()
    ->prevSiblingOf($myCategory)
    ->one();
```
:::


#### `provisionalDrafts`

Narrows the query results to only provisional drafts.





::: code
```twig
{# Fetch provisional drafts created by the current user #}
{% set categories = craft.categories()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$categories = \craft\elements\Category::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only categories that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all categories that are related to myCategory #}
{% set categories = craft.categories()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all categories that are related to $myCategory
$categories = \craft\elements\Category::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft categories #}
{% set categories = {twig-function}
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft categories
$categories = \craft\elements\Category::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only categories that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all categories that match the search query #}
{% set categories = craft.categories()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all categories that match the search query
$categories = \craft\elements\Category::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siblingOf`

Narrows the query results to only categories that are siblings of another category in its structure.



Possible values include:

| 値                                                   | 取得するカテゴリ           |
| --------------------------------------------------- | ------------------ |
| `1`                                                 | ID が 1 のカテゴリの横。    |
| [Category](craft3:craft\elements\Category) オブジェクト | オブジェクトで表されるカテゴリの横。 |



::: code
```twig
{# Fetch categories beside this one #}
{% set categories = craft.categories()
  .siblingOf(myCategory)
  .all() %}
```

```php
// Fetch categories beside this one
$categories = \craft\elements\Category::find()
    ->siblingOf($myCategory)
    ->all();
```
:::


#### `site`

Determines which site(s) the categories should be queried in.



The current site will be used by default.

Possible values include:

| 値                                                        | 取得するカテゴリ                        |
| -------------------------------------------------------- | ------------------------------- |
| `'foo'`                                                  | ハンドルが `foo` のサイトから。             |
| `['foo', 'bar']`                                         | ハンドルが `foo` または `bar` のサイトから。   |
| `['not', 'foo', 'bar']`                                  | ハンドルが `foo` または `bar` のサイトではない。 |
| [craft\models\Site](craft3:craft\models\Site) オブジェクト | オブジェクトで表されるサイトから。               |
| `'*'`                                                    | すべてのサイトから。                      |

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Fetch categories from the Foo site #}
{% set categories = craft.categories()
  .site('foo')
  .all() %}
```

```php
// Fetch categories from the Foo site
$categories = \craft\elements\Category::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the categories should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| 値               | 取得するカテゴリ                   |
| --------------- | -------------------------- |
| `1`             | ID が `1` のサイトから。           |
| `[1, 2]`        | ID が `1` または `2` のサイトから。   |
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。 |
| `'*'`           | すべてのサイトから。                 |



::: code
```twig
{# Fetch categories from the site with an ID of 1 #}
{% set categories = craft.categories()
  .siteId(1)
  .all() %}
```

```php
// Fetch categories from the site with an ID of 1
$categories = \craft\elements\Category::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the categories’ IDs in the `elements_sites` table.



Possible values include:

| 値               | 取得するカテゴリ                                   |
| --------------- | ------------------------------------------ |
| `1`             | with an `elements_sites` ID of 1.          |
| `'not 1'`       | not with an `elements_sites` ID of 1.      |
| `[1, 2]`        | with an `elements_sites` ID of 1 or 2.     |
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2. |



::: code
```twig
{# Fetch the category by its ID in the elements_sites table #}
{% set category = craft.categories()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the category by its ID in the elements_sites table
$category = \craft\elements\Category::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `slug`

Narrows the query results based on the categories’ slugs.



Possible values include:

| 値                           | 取得するカテゴリ                                         |
| --------------------------- | ------------------------------------------------ |
| `'foo'`                     | with a slug of `foo`.                            |
| `'foo*'`                    | with a slug that begins with `foo`.              |
| `'*foo'`                    | with a slug that ends with `foo`.                |
| `'*foo*'`                   | with a slug that contains `foo`.                 |
| `'not *foo*'`               | with a slug that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a slug that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested category slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the category with that slug #}
{% set category = craft.categories()
  .slug(requestedSlug|literal)
  .one() %}
```

```php
// Get the requested category slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the category with that slug
$category = \craft\elements\Category::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


#### `status`

Narrows the query results based on the categories’ statuses.



Possible values include:

| 値                        | 取得するカテゴリ           |
| ------------------------ | ------------------ |
| `'enabled'`  _(default)_ | that are enabled.  |
| `'disabled'`             | that are disabled. |



::: code
```twig
{# Fetch disabled categories #}
{% set categories = craft.categories()
  .status('disabled')
  .all() %}
```

```php
// Fetch disabled categories
$categories = \craft\elements\Category::find()
    ->status('disabled')
    ->all();
```
:::


#### `title`

Narrows the query results based on the categories’ titles.



Possible values include:

| 値                           | 取得するカテゴリ                                          |
| --------------------------- | ------------------------------------------------- |
| `'Foo'`                     | with a title of `Foo`.                            |
| `'Foo*'`                    | with a title that begins with `Foo`.              |
| `'*Foo'`                    | with a title that ends with `Foo`.                |
| `'*Foo*'`                   | with a title that contains `Foo`.                 |
| `'not *Foo*'`               | with a title that doesn’t contain `Foo`.          |
| `['*Foo*', '*Bar*']`        | with a title that contains `Foo` or `Bar`.        |
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`. |



::: code
```twig
{# Fetch categories with a title that contains "Foo" #}
{% set categories = craft.categories()
  .title('*Foo*')
  .all() %}
```

```php
// Fetch categories with a title that contains "Foo"
$categories = \craft\elements\Category::find()
    ->title('*Foo*')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only categories that have been soft-deleted.





::: code
```twig
{# Fetch trashed categories #}
{% set categories = craft.categories()
  .trashed()
  .all() %}
```

```php
// Fetch trashed categories
$categories = \craft\elements\Category::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the categories’ UIDs.





::: code
```twig
{# Fetch the category by its UID #}
{% set category = craft.categories()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the category by its UID
$category = \craft\elements\Category::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique categories across all sites #}
{% set categories = craft.categories()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique categories across all sites
$categories = \craft\elements\Category::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `uri`

Narrows the query results based on the categories’ URIs.



Possible values include:

| Value                       | Fetches categories…                             |
| --------------------------- | ----------------------------------------------- |
| `'foo'`                     | with a URI of `foo`.                            |
| `'foo*'`                    | with a URI that begins with `foo`.              |
| `'*foo'`                    | with a URI that ends with `foo`.                |
| `'*foo*'`                   | with a URI that contains `foo`.                 |
| `'not *foo*'`               | with a URI that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a URI that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the category with that URI #}
{% set category = craft.categories()
  .uri(requestedUri|literal)
  .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the category with that URI
$category = \craft\elements\Category::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


#### `with`

Causes the query to return matching categories eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch categories eager-loaded with the "Related" field’s relations #}
{% set categories = craft.categories()
  .with(['related'])
  .all() %}
```

```php
// Fetch categories eager-loaded with the "Related" field’s relations
$categories = \craft\elements\Category::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
