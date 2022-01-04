# 行列ブロック

だんだんと不安定になる WYSIWYG フィールドで管理されたコンテンツやマークアップの毛玉を扱ったことがあるなら、行列ブロックを好きになるでしょう。

行列ブロックは、編集者がコンテンツの作成や再配置に使用できるフィールドのグループです。 編集者にとってバランスが取れたカスタマイズ可能なコンテンツと開発者が使用したい適切にモデル化されたコンテンツを柔軟にサポートする上で、欠かすことができません。

## 行列ブロックの照会

**行列ブロッククエリ**を利用して、テンプレートや PHP コード内で行列ブロックを取得できます。

::: code
```twig
{# Create a new Matrix block query #}
{% set myMatrixBlockQuery = craft.matrixBlocks() %}
```
```php
// Create a new Matrix block query
$myMatrixBlockQuery = \craft\elements\MatrixBlock::find();
```
:::

行列ブロッククエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。 さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。 [MatrixBlock](craft3:craft\elements\MatrixBlock) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。 :::
:::

### 実例

次の操作を行うことで、エレメントのすべての行列ブロックのコンテンツを表示できます。

1. `craft.matrixBlocks()` で行列ブロッククエリを作成します。
2. [owner](#owner)、[fieldId](#fieldid)、および、[type](#type) パラメータをセットします。
3. `.all()` で行列ブロックを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用して行列ブロックをループ処理し、コンテンツを出力します。

```twig
{# Create a Matrix block query with the 'owner', 'fieldId', and 'type' parameters #}
{% set myMatrixBlockQuery = craft.matrixBlocks()
  .owner(myEntry)
  .fieldId(10)
  .type('text') %}

{# Fetch the Matrix blocks #}
{% set matrixBlocks = myMatrixBlockQuery.all() %}

{# Display their contents #}
{% for block in matrixBlocks %}
  <p>{{ block.text }}</p>
{% endfor %}
```

::: warning
返される行列ブロックにカスタムフィールドのコンテンツが代入されるよう、[fieldId](#fieldid) または [id](#id) パラメータを設定する必要があります。 :::
:::

### パラメータ

行列ブロッククエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ                                       | 説明                                                                                                                                                                                                                                                                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [afterPopulate](#afterpopulate)             | Performs any post-population processing on elements.                                                                                                                                                                                                                                            |
| [allowOwnerDrafts](#allowownerdrafts)       | Narrows the query results based on whether the Matrix blocks’ owners are drafts.                                                                                                                                                                                                                |
| [allowOwnerRevisions](#allowownerrevisions) | Narrows the query results based on whether the Matrix blocks’ owners are revisions.                                                                                                                                                                                                             |
| [andRelatedTo](#andrelatedto)               | Narrows the query results to only Matrix blocks that are related to certain other elements.                                                                                                                                                                                                     |
| [anyStatus](#anystatus)                     | Removes element filters based on their statuses.                                                                                                                                                                                                                                                |
| [asArray](#asarray)                         | Causes the query to return matching Matrix blocks as arrays of data, rather than [MatrixBlock](craft3:craft\elements\MatrixBlock) objects.                                                                                                                                                    |
| [cache](#cache)                             | Enables query cache for this Query.                                                                                                                                                                                                                                                             |
| [clearCachedResult](#clearcachedresult)     | Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).                                                                                                                                                                                                           |
| [dateCreated](#datecreated)                 | Narrows the query results based on the Matrix blocks’ creation dates.                                                                                                                                                                                                                           |
| [dateUpdated](#dateupdated)                 | Narrows the query results based on the Matrix blocks’ last-updated dates.                                                                                                                                                                                                                       |
| [field](#field)                             | Narrows the query results based on the field the Matrix blocks belong to.                                                                                                                                                                                                                       |
| [fieldId](#fieldid)                         | Narrows the query results based on the field the Matrix blocks belong to, per the fields’ IDs.                                                                                                                                                                                                  |
| [fixedOrder](#fixedorder)                   | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                                    |
| [getCacheTags](#getcachetags)               |                                                                                                                                                                                                                                                                                                 |
| [id](#id)                                   | Narrows the query results based on the Matrix blocks’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders)   | Causes the query to return matching Matrix blocks as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                     | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                                       |
| [limit](#limit)                             | Determines the number of Matrix blocks that should be returned.                                                                                                                                                                                                                                 |
| [offset](#offset)                           | Determines how many Matrix blocks should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                         | Determines the order that the Matrix blocks should be returned in. (If empty, defaults to `sortOrder ASC`.)                                                                                                                                                                                     |
| [owner](#owner)                             | Sets the [ownerId](#ownerid) and [siteId](#siteid) parameters based on a given element.                                                                                                                                                                                                         |
| [ownerId](#ownerid)                         | Narrows the query results based on the owner element of the Matrix blocks, per the owners’ IDs.                                                                                                                                                                                                 |
| [preferSites](#prefersites)                 | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                                   |
| [provisionalDrafts](#provisionaldrafts)     | Narrows the query results to only provisional drafts.                                                                                                                                                                                                                                           |
| [relatedTo](#relatedto)                     | Narrows the query results to only Matrix blocks that are related to certain other elements.                                                                                                                                                                                                     |
| [savedDraftsOnly](#saveddraftsonly)         | Narrows the query results to only unpublished drafts which have been saved after initial creation.                                                                                                                                                                                              |
| [search](#search)                           | Narrows the query results to only Matrix blocks that match a search query.                                                                                                                                                                                                                      |
| [site](#site)                               | Determines which site(s) the Matrix blocks should be queried in.                                                                                                                                                                                                                                |
| [siteId](#siteid)                           | Determines which site(s) the Matrix blocks should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [siteSettingsId](#sitesettingsid)           | Narrows the query results based on the Matrix blocks’ IDs in the `elements_sites` table.                                                                                                                                                                                                        |
| [status](#status)                           | Narrows the query results based on the Matrix blocks’ statuses.                                                                                                                                                                                                                                 |
| [trashed](#trashed)                         | Narrows the query results to only Matrix blocks that have been soft-deleted.                                                                                                                                                                                                                    |
| [type](#type)                               | Narrows the query results based on the Matrix blocks’ block types.                                                                                                                                                                                                                              |
| [typeId](#typeid)                           | Narrows the query results based on the Matrix blocks’ block types, per the types’ IDs.                                                                                                                                                                                                          |
| [uid](#uid)                                 | Narrows the query results based on the Matrix blocks’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#unique)                           | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                               |
| [with](#with)                               | Causes the query to return matching Matrix blocks eager-loaded with related elements.                                                                                                                                                                                                           |

#### `afterPopulate`

Performs any post-population processing on elements.










#### `allowOwnerDrafts`

Narrows the query results based on whether the Matrix blocks’ owners are drafts.

Possible values include:

| 値       | 取得する行列ブロック     |
| ------- | -------------- |
| `true`  | 下書きに属すことができる。  |
| `false` | 下書きに属すことができない。 |




#### `allowOwnerRevisions`

Narrows the query results based on whether the Matrix blocks’ owners are revisions.

Possible values include:

| 値       | 取得する行列ブロック       |
| ------- | ---------------- |
| `true`  | リビジョンに属すことができる。  |
| `false` | リビジョンに属すことができない。 |




#### `andRelatedTo`

Narrows the query results to only Matrix blocks that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all Matrix blocks that are related to myCategoryA and myCategoryB #}
{% set MatrixBlocks = craft.matrixBlocks()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all Matrix blocks that are related to $myCategoryA and $myCategoryB
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `anyStatus`

Removes element filters based on their statuses.





::: code
```twig
{# Fetch all Matrix blocks, regardless of status #}
{% set MatrixBlocks = craft.matrixBlocks()
  .anyStatus()
  .all() %}
```

```php
// Fetch all Matrix blocks, regardless of status
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->anyStatus()
    ->all();
```
:::


#### `asArray`

Causes the query to return matching Matrix blocks as arrays of data, rather than [MatrixBlock](craft3:craft\elements\MatrixBlock) objects.





::: code
```twig
{# Fetch Matrix blocks as arrays #}
{% set MatrixBlocks = craft.matrixBlocks()
  .asArray()
  .all() %}
```

```php
// Fetch Matrix blocks as arrays
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/3.x/element-queries.html#cache).






#### `dateCreated`

Narrows the query results based on the Matrix blocks’ creation dates.



Possible values include:

| 値                                                | 取得する行列ブロック                           |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch Matrix blocks created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set MatrixBlocks = craft.matrixBlocks()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch Matrix blocks created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the Matrix blocks’ last-updated dates.



Possible values include:

| 値                                                | 取得する行列ブロック                               |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch Matrix blocks updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set MatrixBlocks = craft.matrixBlocks()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch Matrix blocks updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `field`

Narrows the query results based on the field the Matrix blocks belong to.

Possible values include:

| 値                                                            | 取得する行列ブロック                         |
| ------------------------------------------------------------ | ---------------------------------- |
| `'foo'`                                                      | ハンドルが `foo` のフィールド内。               |
| `'not foo'`                                                  | ハンドルが `foo` のフィールド内ではない。           |
| `['foo', 'bar']`                                             | ハンドルが `foo` または `bar` のフィールド内。     |
| `['not', 'foo', 'bar']`                                      | ハンドルが `foo` または `bar` のフィールド内ではない。 |
| [craft\fields\Matrix](craft3:craft\fields\Matrix) オブジェクト | オブジェクトで表されるフィールド内。                 |



::: code
```twig
{# Fetch Matrix blocks in the Foo field #}
{% set MatrixBlocks = craft.matrixBlocks()
  .field('foo')
  .all() %}
```

```php
// Fetch Matrix blocks in the Foo field
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->field('foo')
    ->all();
```
:::


#### `fieldId`

Narrows the query results based on the field the Matrix blocks belong to, per the fields’ IDs.

Possible values include:

| 値               | 取得する行列ブロック                |
| --------------- | ------------------------- |
| `1`             | ID が 1 のフィールド内。           |
| `'not 1'`       | ID が 1 のフィールド内ではない。       |
| `[1, 2]`        | ID が 1 または 2 のフィールド内。     |
| `['not', 1, 2]` | ID が 1 または 2 のフィールド内ではない。 |



::: code
```twig
{# Fetch Matrix blocks in the field with an ID of 1 #}
{% set MatrixBlocks = craft.matrixBlocks()
  .fieldId(1)
  .all() %}
```

```php
// Fetch Matrix blocks in the field with an ID of 1
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->fieldId(1)
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch Matrix blocks in a specific order #}
{% set MatrixBlocks = craft.matrixBlocks()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch Matrix blocks in a specific order
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `getCacheTags`








#### `id`

Narrows the query results based on the Matrix blocks’ IDs.



Possible values include:

| 値               | 取得する行列ブロック         |
| --------------- | ------------------ |
| `1`             | ID が 1。            |
| `'not 1'`       | ID が 1ではない。        |
| `[1, 2]`        | ID が 1 または 2。      |
| `['not', 1, 2]` | ID が 1 または 2 ではない。 |



::: code
```twig
{# Fetch the Matrix block by its ID #}
{% set MatrixBlock = craft.matrixBlocks()
  .id(1)
  .one() %}
```

```php
// Fetch the Matrix block by its ID
$MatrixBlock = \craft\elements\MatrixBlock::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching Matrix blocks as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch Matrix blocks in reverse #}
{% set MatrixBlocks = craft.matrixBlocks()
  .inReverse()
  .all() %}
```

```php
// Fetch Matrix blocks in reverse
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

Determines the number of Matrix blocks that should be returned.



::: code
```twig
{# Fetch up to 10 Matrix blocks  #}
{% set MatrixBlocks = craft.matrixBlocks()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 Matrix blocks
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many Matrix blocks should be skipped in the results.



::: code
```twig
{# Fetch all Matrix blocks except for the first 3 #}
{% set MatrixBlocks = craft.matrixBlocks()
  .offset(3)
  .all() %}
```

```php
// Fetch all Matrix blocks except for the first 3
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the Matrix blocks should be returned in. (If empty, defaults to `sortOrder ASC`.)



::: code
```twig
{# Fetch all Matrix blocks in order of date created #}
{% set MatrixBlocks = craft.matrixBlocks()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all Matrix blocks in order of date created
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `owner`

Sets the [ownerId](#ownerid) and [siteId](#siteid) parameters based on a given element.



::: code
```twig
{# Fetch Matrix blocks created for this entry #}
{% set MatrixBlocks = craft.matrixBlocks()
  .owner(myEntry)
  .all() %}
```

```php
// Fetch Matrix blocks created for this entry
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->owner($myEntry)
    ->all();
```
:::


#### `ownerId`

Narrows the query results based on the owner element of the Matrix blocks, per the owners’ IDs.

Possible values include:

| 値               | 取得する行列ブロック                          |
| --------------- | ----------------------------------- |
| `1`             | ID が 1 のエレメントによって作成されたもの。           |
| `'not 1'`       | ID が 1 のエレメントによって作成されたものではない。       |
| `[1, 2]`        | ID が 1 または 2 のエレメントによって作成されたもの。     |
| `['not', 1, 2]` | ID が 1 または 2 のエレメントによって作成されたものではない。 |



::: code
```twig
{# Fetch Matrix blocks created for an element with an ID of 1 #}
{% set MatrixBlocks = craft.matrixBlocks()
  .ownerId(1)
  .all() %}
```

```php
// Fetch Matrix blocks created for an element with an ID of 1
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->ownerId(1)
    ->all();
```
:::


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique Matrix blocks from Site A, or Site B if they don’t exist in Site A #}
{% set MatrixBlocks = craft.matrixBlocks()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique Matrix blocks from Site A, or Site B if they don’t exist in Site A
$MatrixBlocks = \craft\elements\MatrixBlock::find()
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
{% set MatrixBlocks = craft.matrixBlocks()
  .provisionalDrafts()
  .draftCreator(currentUser)
  .all() %}
```

```php
// Fetch provisional drafts created by the current user
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->provisionalDrafts()
    ->draftCreator(Craft::$app->user->identity)
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only Matrix blocks that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all Matrix blocks that are related to myCategory #}
{% set MatrixBlocks = craft.matrixBlocks()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all Matrix blocks that are related to $myCategory
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `savedDraftsOnly`

Narrows the query results to only unpublished drafts which have been saved after initial creation.





::: code
```twig
{# Fetch saved, unpublished draft Matrix blocks #}
{% set MatrixBlocks = {twig-function}
  .draftOf(false)
  .savedDraftsOnly()
  .all() %}
```

```php
// Fetch saved, unpublished draft Matrix blocks
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->draftOf(false)
    ->savedDraftsOnly()
    ->all();
```
:::


#### `search`

Narrows the query results to only Matrix blocks that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all Matrix blocks that match the search query #}
{% set MatrixBlocks = craft.matrixBlocks()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all Matrix blocks that match the search query
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `site`

Determines which site(s) the Matrix blocks should be queried in.



The current site will be used by default.

Possible values include:

| 値                                                        | 取得される行列ブロック                     |
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
{# Fetch Matrix blocks from the Foo site #}
{% set MatrixBlocks = craft.matrixBlocks()
  .site('foo')
  .all() %}
```

```php
// Fetch Matrix blocks from the Foo site
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->site('foo')
    ->all();
```
:::


#### `siteId`

Determines which site(s) the Matrix blocks should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| 値               | 取得する行列ブロック                 |
| --------------- | -------------------------- |
| `1`             | ID が `1` のサイトから。           |
| `[1, 2]`        | ID が `1` または `2` のサイトから。   |
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。 |
| `'*'`           | すべてのサイトから。                 |



::: code
```twig
{# Fetch Matrix blocks from the site with an ID of 1 #}
{% set MatrixBlocks = craft.matrixBlocks()
  .siteId(1)
  .all() %}
```

```php
// Fetch Matrix blocks from the site with an ID of 1
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->siteId(1)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the Matrix blocks’ IDs in the `elements_sites` table.



Possible values include:

| 値               | 取得する行列ブロック                                 |
| --------------- | ------------------------------------------ |
| `1`             | with an `elements_sites` ID of 1.          |
| `'not 1'`       | not with an `elements_sites` ID of 1.      |
| `[1, 2]`        | with an `elements_sites` ID of 1 or 2.     |
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2. |



::: code
```twig
{# Fetch the Matrix block by its ID in the elements_sites table #}
{% set MatrixBlock = craft.matrixBlocks()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the Matrix block by its ID in the elements_sites table
$MatrixBlock = \craft\elements\MatrixBlock::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `status`

Narrows the query results based on the Matrix blocks’ statuses.



Possible values include:

| 値                        | 取得する行列ブロック             |
| ------------------------ | ---------------------- |
| `'enabled'`  _(default)_ | that are enabled.      |
| `'disabled'`             | that are disabled.     |
| `['not', 'disabled']`    | that are not disabled. |



::: code
```twig
{# Fetch disabled Matrix blocks #}
{% set MatrixBlocks = craft.matrixBlocks()
  .status('disabled')
  .all() %}
```

```php
// Fetch disabled Matrix blocks
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->status('disabled')
    ->all();
```
:::


#### `trashed`

Narrows the query results to only Matrix blocks that have been soft-deleted.





::: code
```twig
{# Fetch trashed Matrix blocks #}
{% set MatrixBlocks = craft.matrixBlocks()
  .trashed()
  .all() %}
```

```php
// Fetch trashed Matrix blocks
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->trashed()
    ->all();
```
:::


#### `type`

Narrows the query results based on the Matrix blocks’ block types.

Possible values include:

| 値                                                                  | 取得する行列ブロック                                     |
| ------------------------------------------------------------------ | ---------------------------------------------- |
| `'foo'`                                                            | of a type with a handle of `foo`.              |
| `'not foo'`                                                        | not of a type with a handle of `foo`.          |
| `['foo', 'bar']`                                                   | of a type with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                                            | not of a type with a handle of `foo` or `bar`. |
| an [MatrixBlockType](craft3:craft\models\MatrixBlockType) object | of a type represented by the object.           |



::: code
```twig
{# Fetch Matrix blocks with a Foo block type #}
{% set MatrixBlocks = myEntry.myMatrixField
  .type('foo')
  .all() %}
```

```php
// Fetch Matrix blocks with a Foo block type
$MatrixBlocks = $myEntry->myMatrixField
    ->type('foo')
    ->all();
```
:::


#### `typeId`

Narrows the query results based on the Matrix blocks’ block types, per the types’ IDs.

Possible values include:

| Value           | Fetches Matrix blocks…              |
| --------------- | ----------------------------------- |
| `1`             | of a type with an ID of 1.          |
| `'not 1'`       | not of a type with an ID of 1.      |
| `[1, 2]`        | of a type with an ID of 1 or 2.     |
| `['not', 1, 2]` | not of a type with an ID of 1 or 2. |



::: code
```twig
{# Fetch Matrix blocks of the block type with an ID of 1 #}
{% set MatrixBlocks = myEntry.myMatrixField
  .typeId(1)
  .all() %}
```

```php
// Fetch Matrix blocks of the block type with an ID of 1
$MatrixBlocks = $myEntry->myMatrixField
    ->typeId(1)
    ->all();
```
:::


#### `uid`

Narrows the query results based on the Matrix blocks’ UIDs.





::: code
```twig
{# Fetch the Matrix block by its UID #}
{% set MatrixBlock = craft.matrixBlocks()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the Matrix block by its UID
$MatrixBlock = \craft\elements\MatrixBlock::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique Matrix blocks across all sites #}
{% set MatrixBlocks = craft.matrixBlocks()
  .site('*')
  .unique()
  .all() %}
```

```php
// Fetch unique Matrix blocks across all sites
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


#### `with`

Causes the query to return matching Matrix blocks eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch Matrix blocks eager-loaded with the "Related" field’s relations #}
{% set MatrixBlocks = craft.matrixBlocks()
  .with(['related'])
  .all() %}
```

```php
// Fetch Matrix blocks eager-loaded with the "Related" field’s relations
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->
