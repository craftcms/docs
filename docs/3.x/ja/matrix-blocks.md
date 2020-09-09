# 行列ブロック

だんだんと不安定になる WYSIWYG フィールドで管理されたコンテンツやマークアップの毛玉を扱ったことがあるなら、行列ブロックを好きになるでしょう。

行列ブロックは、編集者がコンテンツの作成や再配置に使用できるフィールドのグループです。編集者にとってバランスが取れたカスタマイズ可能なコンテンツと開発者が使用したい適切にモデル化されたコンテンツを柔軟にサポートする上で、欠かすことができません。

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

行列ブロッククエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。[MatrixBlock](craft3:craft\elements\MatrixBlock) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。
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
返される行列ブロックにカスタムフィールドのコンテンツが代入されるよう、[fieldId](#fieldid) または [id](#id) パラメータを設定する必要があります。
:::

### パラメータ

行列ブロッククエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ | 説明 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [allowOwnerDrafts](#allowownerdrafts) | 行列ブロックのオーナーが下書きかどうかに基づいて、クエリの結果を絞り込みます。 |
| [allowOwnerRevisions](#allowownerrevisions) | 行列ブロックのオーナーがリビジョンかどうかに基づいて、クエリの結果を絞り込みます。 |
| [anyStatus](#anystatus) | ステータスに基づくエレメントのフィルタを削除します。 |
| [asArray](#asarray) | [MatrixBlock](craft3:craft\elements\MatrixBlock) オブジェクトではなく、データの配列として、マッチした行列ブロックをクエリが返します。 |
| [clearCachedResult](#clearcachedresult) | キャッシュされた結果をクリアします。 |
| [dateCreated](#datecreated) | 行列ブロックの作成日に基づいて、クエリの結果を絞り込みます。 |
| [dateUpdated](#dateupdated) | 行列ブロックの最終アップデート日に基づいて、クエリの結果を絞り込みます。 |
| [field](#field) | 行列ブロックが属するフィールドに基づいて、クエリの結果を絞り込みます。 |
| [fieldId](#fieldid) | フィールドの ID ごとに、行列ブロックが属するフィールドに基づいて、クエリの結果を絞り込みます。 |
| [fixedOrder](#fixedorder) | クエリの結果を [id](#id) で指定された順序で返します。 |
| [id](#id) | 行列ブロックの ID に基づいて、クエリの結果を絞り込みます。 |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチする行列ブロックをクエリが返します。 |
| [inReverse](#inreverse) | クエリの結果を逆順で返します。 |
| [limit](#limit) | 返される行列ブロックの数を決定します。 |
| [offset](#offset) | 結果からスキップされる行列ブロックの数を決定します。 |
| [orderBy](#orderby) | 返される行列ブロックの順序を決定します。（空の場合、デフォルトは `sortOrder ASC`） |
| [owner](#owner) | 指定されたエレメントに基づいて、[ownerId](#ownerid) および [siteId](#siteid) パラメータをセットします。 |
| [ownerId](#ownerid) | オーナーの ID ごとに、行列ブロックのオーナーエレメントに基づいて、クエリの結果を絞り込みます。 |
| [preferSites](#prefersites) | [unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します |
| [relatedTo](#relatedto) | 特定の他のエレメントと関連付けられた行列ブロックだけに、クエリの結果を絞り込みます。 |
| [search](#search) | 検索クエリにマッチする行列ブロックだけに、クエリの結果を絞り込みます。 |
| [site](#site) | 行列ブロックを照会するサイトを決定します。 |
| [siteId](#siteid) | サイトの ID ごとに、行列ブロックを照会するサイトを決定します。 |
| [status](#status) | 行列ブロックのステータスに基づいて、クエリの結果を絞り込みます。 |
| [trashed](#trashed) | ソフトデリートされた行列ブロックだけに、クエリの結果を絞り込みます。 |
| [type](#type) | 行列ブロックのブロックタイプに基づいて、クエリの結果を絞り込みます。 |
| [typeId](#typeid) | タイプの ID ごとに、行列ブロックのブロックタイプに基づいて、クエリの結果を絞り込みます。 |
| [uid](#uid) | 行列ブロックの UID に基づいて、クエリの結果を絞り込みます。 |
| [unique](#unique) | クエリによってユニークな ID のエレメントだけが返されるかを決定します。 |
| [with](#with) | 関連付けられたエレメントを eager-loaded した状態で、マッチした行列ブロックをクエリが返します。 |

#### `allowOwnerDrafts`

行列ブロックのオーナーが下書きかどうかに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `true` | 下書きに属すことができる。
| `false` | 下書きに属すことができない。




#### `allowOwnerRevisions`

行列ブロックのオーナーがリビジョンかどうかに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `true` | リビジョンに属すことができる。
| `false` | リビジョンに属すことができない。




#### `anyStatus`

ステータスに基づくエレメントのフィルタを削除します。





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


#### `clearCachedResult`

キャッシュされた結果をクリアします。






#### `dateCreated`

行列ブロックの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に作成されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に作成されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。



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

行列ブロックの最終アップデート日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降にアップデートされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前にアップデートされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。



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

行列ブロックが属するフィールドに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `'foo'` | ハンドルが `foo` のフィールド内。
| `'not foo'` | ハンドルが `foo` のフィールド内ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のフィールド内。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のフィールド内ではない。
| [craft\fields\Matrix](craft3:craft\fields\Matrix) オブジェクト | オブジェクトで表されるフィールド内。



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

フィールドの ID ごとに、行列ブロックが属するフィールドに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `1` | ID が 1 のフィールド内。
| `'not 1'` | ID が 1 のフィールド内ではない。
| `[1, 2]` | ID が 1 または 2 のフィールド内。
| `['not', 1, 2]` | ID が 1 または 2 のフィールド内ではない。



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

クエリの結果を [id](#id) で指定された順序で返します。





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


#### `id`

行列ブロックの ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `1` | ID が 1。
| `'not 1'` | ID が 1ではない。
| `[1, 2]` | ID が 1 または 2。
| `['not', 1, 2]` | ID が 1 または 2 ではない。



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
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::


#### `ignorePlaceholders`

[craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチする行列ブロックをクエリが返します。










#### `inReverse`

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


#### `limit`

返される行列ブロックの数を決定します。



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

結果からスキップされる行列ブロックの数を決定します。



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

返される行列ブロックの順序を決定します。（空の場合、デフォルトは `sortOrder ASC`）



::: code
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


#### `owner`

指定されたエレメントに基づいて、[ownerId](#ownerid) および [siteId](#siteid) パラメータをセットします。



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

オーナーの ID ごとに、行列ブロックのオーナーエレメントに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `1` | ID が 1 のエレメントによって作成されたもの。
| `'not 1'` | ID が 1 のエレメントによって作成されたものではない。
| `[1, 2]` | ID が 1 または 2 のエレメントによって作成されたもの。
| `['not', 1, 2]` | ID が 1 または 2 のエレメントによって作成されたものではない。



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

[unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します



例えば、エレメント “Foo” がサイト A とサイト B に存在し、エレメント “Bar” がサイト B とサイト C に存在し、ここに `['c', 'b', 'a']` がセットされている場合、Foo will はサイト C に対して返され、Bar はサイト B に対して返されます。

これがセットされていない場合、現在のサイトが優先されます。



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


#### `relatedTo`

特定の他のエレメントと関連付けられた行列ブロックだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](relations.md)を参照してください。



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


#### `search`

検索クエリにマッチする行列ブロックだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[検索](searching.md)を参照してください。



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

行列ブロックを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得される行列ブロック
| - | -
| `'foo'` | ハンドルが `foo` のサイトから。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のサイトから。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のサイトではない。
| [craft\models\Site](craft3:craft\models\Site) オブジェクト | オブジェクトで表されるサイトから。
| `'*'` | すべてのサイトから。

::: tip
複数のサイトを指定した場合、複数のサイトに属するエレメントは複数回返されます。単一のエレメントだけを返したい場合、これと併せて [unique](#unique) を利用してください。
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

サイトの ID ごとに、行列ブロックを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `1` | ID が `1` のサイトから。
| `[1, 2]` | ID が `1` または `2` のサイトから。
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。
| `'*'` | すべてのサイトから。



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


#### `status`

行列ブロックのステータスに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `'enabled'`  _（デフォルト）_ | 有効なもの。
| `'disabled'` | 無効なもの。



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

ソフトデリートされた行列ブロックだけに、クエリの結果を絞り込みます。





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

行列ブロックのブロックタイプに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `'foo'` | ハンドルが `foo` のタイプ。
| `'not foo'` | ハンドルが `foo` のタイプではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のタイプ。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のタイプではない。
| [MatrixBlockType](craft3:craft\models\MatrixBlockType) オブジェクト | オブジェクトで表されるタイプ。



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

タイプの ID ごとに、行列ブロックのブロックタイプに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得する行列ブロック
| - | -
| `1` | ID が 1 のタイプ。
| `'not 1'` | ID が 1 のタイプではない。
| `[1, 2]` | ID が 1 または 2 のタイプ。
| `['not', 1, 2]` | ID が 1 または 2 のタイプではない。



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

行列ブロックの UID に基づいて、クエリの結果を絞り込みます。





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

クエリによってユニークな ID のエレメントだけが返されるかを決定します。



一度に複数のサイトからエレメントを照会する際、「重複する」結果を望まない場合に使用します。



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

関連付けられたエレメントを eager-loaded した状態で、マッチした行列ブロックをクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントの Eager-Loading](dev/eager-loading-elements.md) を参照してください。



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
