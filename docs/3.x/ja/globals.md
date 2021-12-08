# グローバル

グローバルは、テンプレート全体で包括的に利用可能なコンテンツを保存できます。 これは、コントロールパネル経由でエントリではないコンテンツを簡単に編集できるようにする便利な方法です。

Craft はグローバル設定内でグローバルを整理します。 それぞれのグローバル設定は、存在するすべてのフィールドや新しいフィールドを利用する独自の[フィールドレイアウト](fields.md#field-layouts)を持ちます。

To create a Global Set, go to **Settings** → **Globals**.

If you have at least one Global Set, Craft will add a new “Globals” item to the main control panel navigation. Clicking this will take you to a page that lists all your Global Sets in a sidebar, as well as all of the fields associated with the selected Global Set in the main content area.

::: tip
[エントリ](sections-and-entries.md#entries)とは異なり、特定の URL と関連付けられていないグローバル設定では、ライブプレビュー機能がありません。
:::

## テンプレートでのグローバル設定

任意のテンプレートからハンドル経由でグローバル設定にアクセスできます。

`companyInfo` というハンドルのグローバル設定があり、`yearEstablished` というハンドルのフィールドがある場合、次のコードを使用してそのフィールドへどこからでもアクセスすることができます。

```twig
{{ companyInfo.yearEstablished }}
```

カスタムフィールド以外で利用できる追加のグローバル設定のプロパティについては、リファレンスの <craft3:craft\elements\GlobalSet> を参照してください。

### グローバル設定の手動読み込み

メールテンプレートのような特殊な状況では、グローバル設定はデフォルトでは利用できません。 グローバル設定は手動でも読み込めます。 上記の例では、`getSetByHandle()` で読み込むことができます。

そのためには、グローバルセットのフィールドを編集し、それぞれの「翻訳方法」設定で「各サイトに対して翻訳」をセットします。
```twig
{% set companyInfo = craft.app.globals().getSetByHandle('companyInfo') %}
```
```php
$companyInfo = \Craft::$app->getGlobals()->getSetByHandle('companyInfo');
```
:::

詳細については、[Globals サービスクラスのドキュメント](craft3:craft\services\Globals) を参照してください。

## マルチサイトでのグローバル設定

Craft でマルチサイトを運用している場合、グローバル設定はすべてのサイトで利用可能です。 しかしながら、必要に応じていくつかのフィールドを空のままにするなど、それぞれの設定値をサイトごとにセットできます。

そのためには、グローバル設定のフィールドを編集し、それぞれの「翻訳方法」設定で「各サイトに対して翻訳」をセットします。

グローバル設定を表示中にサイトを切り替えるには、コントロールパネルのグローバル設定ページの左上にあるドロップダウンメニューを使用します。

![グローバル内のサイトの切り替え](./images/globals-multisite-nav.png)

## グローバルの照会

**グローバル設定クエリ**を利用して、テンプレートや PHP コード内でグローバル設定を取得できます。

::: code
```twig
{# Create a new global set query #}
{% set myGlobalSetQuery = craft.globalSets() %}
```
```php
// Create a new global set query
$myGlobalSetQuery = \craft\elements\GlobalSet::find();
```
:::

グローバル設定クエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。 さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。 [GlobalSet](craft3:craft\elements\GlobalSet) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。 :::
:::

### 実例

次の操作をすることで、プライマリサイトからグローバル設置をロードし、コンテンツを表示できます。

1. `craft.globalSets()` でグローバル設定クエリを作成します。
2. [handle](#handle) および [siteId](#siteid) パラメータをセットします。
3. `.one()` でグローバル設定を取得します。
4. コンテンツを出力します。

```twig
{# Create a global set query with the 'handle' and 'siteId' parameters #}
{% set myGlobalSetQuery = craft.globalSets()
  .handle('footerCopy')
  .siteId(1) %}

{# Fetch the global set #}
{% set globalSet = myGlobalSetQuery.one() %}

{# Display the content #}
<p>{{ globalSet.copyrightInfo }}</p>
```

::: tip
すべてのグローバル設定は、Twig テンプレートのグローバル変数としてすでに利用可能です。 そのため、現在のサイトとは異なるサイトのコンテンツにアクセスする場合、`craft.globalSets()` を通して取得する必要があります。 :::
:::

### パラメータ

グローバル設定クエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ                                     | 説明                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.                                                                                                                                                                                                                                          |
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only global sets that are related to certain other elements.                                                                                                                                                                                                     |
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.                                                                                                                                                                                                                                              |
| [asArray](#asarray)                       | Causes the query to return matching global sets as arrays of data, rather than [GlobalSet](craft3:craft\elements\GlobalSet) objects.                                                                                                                                                        |
| [cache](#cache)                           | Enables query cache for this Query.                                                                                                                                                                                                                                                           |
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).                                                                                                                                                                                                         |
| [dateCreated](#datecreated)               | Narrows the query results based on the global sets’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#dateupdated)               | Narrows the query results based on the global sets’ last-updated dates.                                                                                                                                                                                                                       |
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                                  |
| [getCacheTags](#getcachetags)             |                                                                                                                                                                                                                                                                                               |
| [handle](#handle)                         | Narrows the query results based on the global sets’ handles.                                                                                                                                                                                                                                  |
| [id](#id)                                 | Narrows the query results based on the global sets’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching global sets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                                     |
| [limit](#limit)                           | Determines the number of global sets that should be returned.                                                                                                                                                                                                                                 |
| [offset](#offset)                         | Determines how many global sets should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                       | Determines the order that the global sets should be returned in. (If empty, defaults to `name ASC`.)                                                                                                                                                                                          |
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                                 |
| [provisionalDrafts](#provisionaldrafts)   | Narrows the query results to only provisional drafts.                                                                                                                                                                                                                                         |
| [relatedTo](#relatedto)                   | Narrows the query results to only global sets that are related to certain other elements.                                                                                                                                                                                                     |
| [savedDraftsOnly](#saveddraftsonly)       | Narrows the query results to only unpublished drafts which have been saved after initial creation.                                                                                                                                                                                            |
| [search](#search)                         | Narrows the query results to only global sets that match a search query.                                                                                                                                                                                                                      |
| [site](#site)                             | Determines which site(s) the global sets should be queried in.                                                                                                                                                                                                                                |
| [siteId](#siteid)                         | Determines which site(s) the global sets should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the global sets’ IDs in the `elements_sites` table.                                                                                                                                                                                                        |
| [trashed](#trashed)                       | Narrows the query results to only global sets that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#uid)                               | Narrows the query results based on the global sets’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                             |
| [with](#with)                             | Causes the query to return matching global sets eager-loaded with related elements.                                                                                                                                                                                                           |

#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only global sets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all global sets that are related to myCategoryA and myCategoryB #}
{% set globalSets = craft.globalSets()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all global sets that are related to $myCategoryA and $myCategoryB
$globalSets = \craft\elements\GlobalSet::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all global sets, regardless of status #}
{% set globalSets = craft.globalSets()
  .anyStatus()
  .all() %}
```

```php
// Fetch all global sets, regardless of status
$globalSets = \craft\elements\GlobalSet::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching global sets as arrays of data, rather than [GlobalSet](craft3:craft\elements\GlobalSet) objects.





::: code
```twig
{# Fetch global sets as arrays #}
{% set globalSets = craft.globalSets()
  .asArray()
  .all() %}
```

```php
// Fetch global sets as arrays
$globalSets = \craft\elements\GlobalSet::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the global sets’ creation dates.



Possible values include:

| 値                                                | 取得するグローバル設定                          |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch global sets created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set globalSets = craft.globalSets()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch global sets created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the global sets’ last-updated dates.



Possible values include:

| 値                                                | 取得するグローバル設定                              |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch global sets updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set globalSets = craft.globalSets()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch global sets updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$globalSets = \craft\elements\GlobalSet::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch global sets in a specific order #}
{% set globalSets = craft.globalSets()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch global sets in a specific order
$globalSets = \craft\elements\GlobalSet::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `getCacheTags`








#### `handle`

Narrows the query results based on the global sets’ handles.

Possible values include:

| 値                       | 取得するグローバル設定                 |
| ----------------------- | --------------------------- |
| `'foo'`                 | ハンドルが `foo`。                |
| `'not foo'`             | ハンドルが `foo` ではない。           |
| `['foo', 'bar']`        | ハンドルが `foo` または `bar`。      |
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` ではない。 |



::: code
```twig
{# Fetch the global set with a handle of 'foo' #}
{% set globalSet = craft.globalSets()
  .handle('foo')
  .one() %}
```

```php
// Fetch the global set with a handle of 'foo'
$globalSet = \craft\elements\GlobalSet::find()
    ->handle('foo')
    ->one();
```
:::


#### `id`

Narrows the query results based on the global sets’ IDs.



Possible values include:

| 値               | 取得するグローバル設定        |
| --------------- | ------------------ |
| `1`             | ID が 1。            |
| `'not 1'`       | ID が 1ではない。        |
| `[1, 2]`        | ID が 1 または 2。      |
| `['not', 1, 2]` | ID が 1 または 2 ではない。 |



::: code
```twig
{# Fetch the global set by its ID #}
{% set globalSet = craft.globalSets()
  .id(1)
  .one() %}
```

```php
// Fetch the global set by its ID
$globalSet = \craft\elements\GlobalSet::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching global sets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch global sets in reverse #}
{% set globalSets = craft.globalSets()
  .inReverse()
  .all() %}
```

```php
// Fetch global sets in reverse
$globalSets = \craft\elements\GlobalSet::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

Determines the number of global sets that should be returned.



::: code
```twig
{# Fetch up to 10 global sets  #}
{% set globalSets = craft.globalSets()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many global sets should be skipped in the results.



::: code
```twig
{# Fetch all global sets except for the first 3 #}
{% set globalSets = craft.globalSets()
  .offset(3)
  .all() %}
```

```php
// Fetch all global sets except for the first 3
$globalSets = \craft\elements\GlobalSet::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the global sets should be returned in. (If empty, defaults to `name ASC`.)



::: code
```twig
{# Fetch all global sets in order of date created #}
{% set globalSets = craft.globalSets()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all global sets in order of date created
$globalSets = \craft\elements\GlobalSet::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique global sets from Site A, or Site B if they don’t exist in Site A #}
{% set globalSets = craft.globalSets()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique global sets from Site A, or Site B if they don’t exist in Site A
$globalSets = \craft\elements\GlobalSet::find()
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
{% set globalSets = craft.globalSets()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$globalSets = \craft\elements\GlobalSet::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only global sets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all global sets that are related to myCategory #}
{% set globalSets = craft.globalSets()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all global sets that are related to $myCategory
$globalSets = \craft\elements\GlobalSet::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft global sets #}
{% set globalSets = {twig-function}
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only global sets that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all global sets that match the search query #}
{% set globalSets = craft.globalSets()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all global sets that match the search query
$globalSets = \craft\elements\GlobalSet::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

Determines which site(s) the global sets should be queried in.



The current site will be used by default.

Possible values include:

| 値                                                        | 取得するグローバル設定                     |
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
{# Fetch global sets from the Foo site #}
{% set globalSets = craft.globalSets()
  .site('foo')
  .all() %}
```

```php
// Fetch global sets from the Foo site
$globalSets = \craft\elements\GlobalSet::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the global sets should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| 値               | 取得するグローバル設定                |
| --------------- | -------------------------- |
| `1`             | ID が `1` のサイトから。           |
| `[1, 2]`        | ID が `1` または `2` のサイトから。   |
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。 |
| `'*'`           | すべてのサイトから。                 |



::: code
```twig
{# Fetch global sets from the site with an ID of 1 #}
{% set globalSets = craft.globalSets()
  .siteId(1)
  .all() %}
```

```php
// Fetch global sets from the site with an ID of 1
$globalSets = \craft\elements\GlobalSet::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the global sets’ IDs in the `elements_sites` table.



Possible values include:

| Value           | Fetches global sets…                       |
| --------------- | ------------------------------------------ |
| `1`             | with an `elements_sites` ID of 1.          |
| `'not 1'`       | not with an `elements_sites` ID of 1.      |
| `[1, 2]`        | with an `elements_sites` ID of 1 or 2.     |
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2. |



::: code
```twig
{# Fetch the global set by its ID in the elements_sites table #}
{% set globalSet = craft.globalSets()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the global set by its ID in the elements_sites table
$globalSet = \craft\elements\GlobalSet::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `trashed`

Narrows the query results to only global sets that have been soft-deleted.





::: code
```twig
{# Fetch trashed global sets #}
{% set globalSets = craft.globalSets()
  .trashed()
  .all() %}
```

```php
// Fetch trashed global sets
$globalSets = \craft\elements\GlobalSet::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the global sets’ UIDs.





::: code
```twig
{# Fetch the global set by its UID #}
{% set globalSet = craft.globalSets()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the global set by its UID
$globalSet = \craft\elements\GlobalSet::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique global sets across all sites #}
{% set globalSets = craft.globalSets()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique global sets across all sites
$globalSets = \craft\elements\GlobalSet::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `with`

Causes the query to return matching global sets eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch global sets eager-loaded with the "Related" field’s relations #}
{% set globalSets = craft.globalSets()
  .with(['related'])
  .all() %}
```

```php
// Fetch global sets eager-loaded with the "Related" field’s relations
$globalSets = \craft\elements\GlobalSet::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
