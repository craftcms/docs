# 行列ブロッククエリ

**行列ブロッククエリ**を使用して、テンプレートや PHP コード内で行列ブロックを取得できます。

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

行列ブロッククエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](README.md#executing-element-queries)できます。[MatrixBlock](craft3:craft\elements\MatrixBlock) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリについて](README.md)を参照してください。
:::

## 実例

次の操作を行うことで、エレメントのすべての行列ブロックのコンテンツを表示できます。

1. `craft.matrixBlocks()` で行列ブロッククエリを作成します。
2. [owner](#owner)、[fieldId](#fieldid)、および、[type](#type) パラメータをセットします。
3. `.all()` で行列ブロックを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを使用して行列ブロックをループ処理し、コンテンツを出力します。

```twig
{# Create a Matrix block query with the 'owner', 'fieldId', and 'type' parameters #}
{% set myMatrixBlockQuery = craft.matrixBlocks()
    .owner(myEntry)
    .fieldId(10)
    .type('text') %}

{# Fetch the Matrix blocks #}
{% set matrixBlocks = myMatrixBlockQuery.all() %}

{# Display their contents #}
{% for block in blocks %}
    <p>{{ block.text }}</p>
{% endfor %}
```

::: warning
返される行列ブロックにカスタムフィールドのコンテンツが代入されるよう、[fieldId](#fieldid) または [id](#id) パラメータを設定する必要があります。
:::

## パラメータ

行列ブロッククエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

### `anyStatus`

[status](#status) および [enabledForSite()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-enabledforsite) パラメータをクリアします。





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


### `asArray`

[MatrixBlock](craft3:craft\elements\MatrixBlock) オブジェクトではなく、データの配列として、マッチした行列ブロックをクエリが返します。





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


### `dateCreated`

行列ブロックの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

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


### `dateUpdated`

行列ブロックの最終アップデート日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

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


### `fieldId`

フィールドの ID ごとに、行列ブロックが属するフィールドに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                      | 取得する行列ブロック          |
| -------------------------------------- | ------------------- |
| `1`                                    | ID が 1 のフィールド内。     |
| a `\craft\elements\db\User` object | ID が 1 のフィールド内ではない。 |



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


### `fixedOrder`

クエリの結果を [id](#id) で指定された順序で返します。



::: code

| 値   | 取得する行列ブロック |
| --- | ---------- |
| `1` | ID が 1。    |



:::
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


### `id`

利用可能な値には、次のものが含まれます。



::: code

| 値                                                        | 取得する行列ブロック                    |
| -------------------------------------------------------- | ----------------------------- |
| `1`                                                      | ID が 1 のエレメントによって作成されたもの。     |
| a [MatrixBlock](craft3:craft\elements\MatrixBlock) object | ID が 1 のエレメントによって作成されたものではない。 |



:::
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


### `inReverse`

クエリの結果を逆順で返します。





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


### `limit`

返される行列ブロックの数を決定します。

::: code

| 値                   | 取得される行列ブロック                          |
| ------------------- | ------------------------------------ |
| `oo'.29678489'foo'` | ハンドルが `foo` のサイトから。                  |
| `'not 1'`           | オブジェクトで表されるサイトから。                    |
| `[1, 2]`            | in a field with an ID of 1 or 2.     |
| `['not', 1, 2]`     | not in a field with an ID of 1 or 2. |



:::
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


### `offset`

::: code





:::
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


### `orderBy`

::: code



:::

| 値               | 取得する行列ブロック                |
| --------------- | ------------------------- |
| `1`             | 有効になっているもの。               |
| `'disabled'`    | 無効になっているもの。               |
| `[1, 2]`        | with an ID of 1 or 2.     |
| `['not', 1, 2]` | not with an ID of 1 or 2. |



指定されたエレメントに基づいて、[ownerId](#ownerid) および [siteId](#siteid) パラメータをセットします。
```twig
{# Fetch all Matrix blocks in order of date created #}
{% set MatrixBlocks = craft.matrixBlocks()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all Matrix blocks in order of date created
$MatrixBlocks = \craft\elements\MatrixBlock::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::



:::


### `owner`

オーナーの ID ごとに、行列ブロックのオーナーエレメントに基づいて、クエリの結果を絞り込みます。










### `ownerId`

利用可能な値には、次のものが含まれます。





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


### `relatedTo`

特定の他のエレメントと関連付けられた行列ブロックだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](https://docs.craftcms.com/v3/relations.html)を参照してください。
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


### `search`

:::



検索クエリにマッチする行列ブロックだけに、クエリの結果を絞り込みます。
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


### `site`

::: code



:::
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


### `siteId`

デフォルトでは、現在のサイトが使用されます。



利用可能な値には、次のものが含まれます。
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


### `status`

:::

サイトの ID ごとに、行列ブロックを照会するサイトを決定します。

| 値                       | 取得する行列ブロック                      |
| ----------------------- | ------------------------------- |
| `65'foo''foo'0766'foo'` | ハンドルが `foo` のタイプ。               |
| `'not foo'`             | ハンドルが `foo` のタイプではない。           |
| `['foo', 'bar']`        | ハンドルが `foo` または `bar` のタイプ。     |
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のタイプではない。 |



デフォルトでは、現在のサイトが使用されます。
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


### `trashed`

:::



行列ブロックのステータスに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。



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


### `type`

ソフトデリートされた行列ブロックだけに、クエリの結果を絞り込みます。



::: code



:::
```twig
{# Fetch trashed Matrix blocks #}
{% set MatrixBlocks = {twig-function}
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


### `typeId`

利用可能な値には、次のものが含まれます。



::: code

| 値                                      | 取得する行列ブロック       |
| -------------------------------------- | ---------------- |
| `1`                                    | ID が 1 のタイプ。     |
| a `\craft\elements\db\User` object | ID が 1 のタイプではない。 |



:::
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


### `uid`

利用可能な値には、次のものが含まれます。



::: code

| Value | Fetches revisions…                |
| ----- | --------------------------------- |
| `1`   | for the revision with an ID of 1. |



:::
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


### `with`

::: code



:::

| Value                                                    | Fetches revisions…                              |
| -------------------------------------------------------- | ----------------------------------------------- |
| `1`                                                      | for the Matrix block with an ID of 1.           |
| a [MatrixBlock](craft3:craft\elements\MatrixBlock) object | for the Matrix block represented by the object. |



関連付けられたエレメントを eager-loaded した状態で、マッチした行列ブロックをクエリが返します。
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


### `revisions`

::: code





:::
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


### `search`

Narrows the query results to only Matrix blocks that match a search query.



See [Searching](https://docs.craftcms.com/v3/searching.html) for a full explanation of how to work with this parameter.



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


### `site`

Determines which site(s) the Matrix blocks should be queried in.



The current site will be used by default.

Possible values include:

| Value                                  | Fetches Matrix blocks…                         |
| -------------------------------------- | ---------------------------------------------- |
| `'foo'`                                | from the site with a handle of `foo`.          |
| `['foo', 'bar']`                       | from a site with a handle of `foo` or `bar`.   |
| `['not', 'foo', 'bar']`                | not in a site with a handle of `foo` or `bar`. |
| a `\craft\elements\db\Site` object | from the site represented by the object.       |
| `'*'`                                  | from any site.                                 |

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


### `siteId`

Determines which site(s) the Matrix blocks should be queried in, per the site’s ID.



The current site will be used by default.



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


### `status`

Narrows the query results based on the Matrix blocks’ statuses.



Possible values include:

| Value                    | Fetches Matrix blocks… |
| ------------------------ | ---------------------- |
| `'enabled'`  _(default)_ | that are enabled.      |
| `'disabled'`             | that are disabled.     |



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


### `trashed`

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


### `type`

Narrows the query results based on the Matrix blocks’ block types.

Possible values include:

| Value                                                           | Fetches Matrix blocks…                         |
| --------------------------------------------------------------- | ---------------------------------------------- |
| `'foo'`                                                         | of a type with a handle of `foo`.              |
| `'not foo'`                                                     | not of a type with a handle of `foo`.          |
| `['foo', 'bar']`                                                | of a type with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                                         | not of a type with a handle of `foo` or `bar`. |
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


### `typeId`

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


### `uid`

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


### `unique`

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


### `with`

Causes the query to return matching Matrix blocks eager-loaded with related elements.



See [Eager-Loading Elements](https://docs.craftcms.com/v3/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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

