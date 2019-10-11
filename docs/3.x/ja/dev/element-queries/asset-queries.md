# アセットクエリ

**アセットクエリ**を使用して、テンプレートや PHP コード内でアセットを取得できます。

::: code
```twig
{# Create a new asset query #}
{% set myAssetQuery = craft.assets() %}
```
```php
// Create a new asset query
$myAssetQuery = \craft\elements\Asset::find();
```
:::

アセットクエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](README.md#executing-element-queries)できます。[Asset](api:craft\elements\Asset) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリについて](README.md)を参照してください。
:::

## 実例

次の操作を行うことで、「Photos」ボリュームに含まれる画像のサムネイルのリストを表示できます。

1. `craft.assets()` でアセットクエリを作成します。
2. [volume](#volume) および [kind](#kind) パラメータをセットします。
3. `.all()` でアセットを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを使用してアセットをループ処理し、サムネイルリストの HTML を作成します。

```twig
{# Create an asset query with the 'volume' and 'kind' parameters #}
{% set myAssetQuery = craft.assets()
    .volume('photos')
    .kind('image') %}

{# Fetch the assets #}
{% set images = myAssetQuery.all() %}

{# Display the thumbnail list #}
<ul>
    {% for image in images %}
        <li><img src="{{ image.getUrl('thumb') }}" alt="{{ image.title }}"></li>
    {% endfor %}
</ul>
```

## パラメータ

アセットクエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

### `anyStatus`

[status()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-status) および [enabledForSite()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-enabledforsite) パラメータをクリアします。





::: code
```twig
{# Fetch all assets, regardless of status #}
{% set assets = craft.assets()
    .anyStatus()
    .all() %}
```

```php
// Fetch all assets, regardless of status
$assets = \craft\elements\Asset::find()
    ->anyStatus()
    ->all();
```
:::


### `asArray`

[Asset](api:craft\elements\Asset) オブジェクトではなく、データの配列として、マッチしたアセットをクエリが返します。





::: code
```twig
{# Fetch assets as arrays #}
{% set assets = craft.assets()
    .asArray()
    .all() %}
```

```php
// Fetch assets as arrays
$assets = \craft\elements\Asset::find()
    ->asArray()
    ->all();
```
:::


### `dateCreated`

アセットの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                                | 取得するアセット                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch assets created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set assets = craft.assets()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch assets created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


### `dateModified`

アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値                                                | 取得するアセット                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に更新されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に更新されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に更新されたもの。 |



::: code
```twig
{# Fetch assets modified in the last month #}
{% set start = date('30 days ago')|atom %}

{% set assets = craft.assets()
    .dateModified(">= #{start}")
    .all() %}
```

```php
// Fetch assets modified in the last month
$start = (new \DateTime('30 days ago'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateModified(">= {$start}")
    ->all();
```
:::


### `dateUpdated`

アセットの最終アップデート日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                                | 取得するアセット                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch assets updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set assets = craft.assets()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch assets updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$assets = \craft\elements\Asset::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


### `filename`

アセットのファイル名に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                      | 取得するアセット            |
| -------------------------------------- | ------------------- |
| `f4890a6.83992027'foo.jpg'`            | ファイル名が `foo.jpg`。   |
| a `\craft\elements\db\User` object | ファイル名が `foo` ではじまる。 |



::: code
```twig
{# Fetch all the hi-res images #}
{% set assets = craft.assets()
    .filename('*@2x*')
    .all() %}
```

```php
// Fetch all the hi-res images
$assets = \craft\elements\Asset::find()
    ->filename('*@2x*')
    ->all();
```
:::


### `fixedOrder`

クエリの結果を [id](#id) で指定された順序で返します。



::: code

| 値   | 取得するアセット       |
| --- | -------------- |
| `1` | ID が 1 のフォルダ内。 |



:::
```twig
{# Fetch assets in a specific order #}
{% set assets = craft.assets()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch assets in a specific order
$assets = \craft\elements\Asset::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


### `folderId`

利用可能な値には、次のものが含まれます。



::: code

| 値                                            | 取得するアセット        |
| -------------------------------------------- | --------------- |
| `00100669100`                                | 高さ 100px。       |
| a [Asset](api:craft\elements\Asset) object | 少なくとも、高さ 100px。 |



:::
```twig
{# Fetch assets in the folder with an ID of 1 #}
{% set assets = craft.assets()
    .folderId(1)
    .all() %}
```

```php
// Fetch categories in the folder with an ID of 1
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->all();
```
:::


### `height`

アセットの画像の高さに基づいて、クエリの結果を絞り込みます。





利用可能な値には、次のものが含まれます。
```twig
{# Fetch XL images #}
{% set assets = craft.assets()
    .kind('image')
    .height('>= 1000')
    .all() %}
```

```php
// Fetch XL images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->height('>= 1000')
    ->all();
```
:::


### `id`

:::

アセットの ID に基づいて、クエリの結果を絞り込みます。

| 値                           | 取得するアセット                                             |
| --------------------------- | ---------------------------------------------------- |
| `1`                         | ID が 1。                                              |
| `'not 1'`                   | ID が 1ではない。                                          |
| `[1, 2]`                    | ID が 1 または 2。                                        |
| `['not', 1, 2]`             | ID が 1 または 2 ではない。                                   |
| `'not *foo*'`               | with a filename that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a filename that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a filename that doesn’t contain `foo` or `bar`. |



利用可能な値には、次のものが含まれます。
```twig
{# Fetch the asset by its ID #}
{% set asset = craft.assets()
    .id(1)
    .one() %}
```

```php
// Fetch the asset by its ID
$asset = \craft\elements\Asset::find()
    ->id(1)
    ->one();
```
:::


### `inReverse`

:::





::: tip
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::
```twig
{# Fetch assets in reverse #}
{% set assets = craft.assets()
    .inReverse()
    .all() %}
```

```php
// Fetch assets in reverse
$assets = \craft\elements\Asset::find()
    ->inReverse()
    ->all();
```
:::


### `includeSubfolders`

::: code

:::

| 値                         | 取得するアセット                         |
| ------------------------- | -------------------------------- |
| `d86.57052653'image'`     | ファイルの種類が `image`。                |
| `'not image'`             | ファイルの種類が `image` ではない。           |
| `['image', 'pdf']`        | ファイルの種類が `image` または `pdf`。      |
| `['not', 'image', 'pdf']` | ファイルの種類が `image` または `pdf` ではない。 |



[folderId](#folderid) で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。
```twig
{# Fetch assets in the folder with an ID of 1 (including its subfolders) #}
{% set assets = craft.assets()
    .folderId(1)
    .includeSubfolders()
    .all() %}
```

```php
// Fetch categories in the folder with an ID of 1 (including its subfolders)
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->includeSubfolders()
    ->all();
```
:::



:::
### `kind`

::: warning
これは [folderId](#folderid) に単一のフォルダ ID がセットされているときだけ、動作します。
:::

アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。

| 値                             | 取得するアセット                             |
| ----------------------------- | ------------------------------------ |
| `'foo'`                       | ハンドルが `foo` のサイトから。                  |
| `'>= 100'`                 | オブジェクトで表されるサイトから。                    |
| `['>= 100', '<= 1000']` | with a height between 100 and 1,000. |



サポートされるファイルの種類：
```twig
{# Fetch all the images #}
{% set assets = craft.assets()
    .kind('image')
    .all() %}
```

```php
// Fetch all the images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->all();
```
:::


### `limit`

::: code



:::

| 値                                | 取得するアセット                         |
| -------------------------------- | -------------------------------- |
| `6100023771000`                  | サイズが 1,000 bytes（1KB）。           |
| `'< 1000000'`                 | サイズが 1,000,000 bytes（1MB）よりも小さい。 |
| `['>= 1000', '< 1000000']` | サイズが 1KB から 1MB の間。              |
| `['not', 1, 2]`                  | not with an ID of 1 or 2.        |



返されるアセットの数を決定します。
```twig
{# Fetch up to 10 assets  #}
{% set assets = craft.assets()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 assets
$assets = \craft\elements\Asset::find()
    ->limit(10)
    ->all();
```
:::



:::


### `offset`

結果からスキップされるアセットの数を決定します。










### `orderBy`

::: code





:::
```twig
{# Fetch all assets except for the first 3 #}
{% set assets = craft.assets()
    .offset(3)
    .all() %}
```

```php
// Fetch all assets except for the first 3
$assets = \craft\elements\Asset::find()
    ->offset(3)
    ->all();
```
:::


### `relatedTo`

::: code



:::
```twig
{# Fetch all assets in order of date created #}
{% set assets = craft.assets()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all assets in order of date created
$assets = \craft\elements\Asset::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::



このパラメーターがどのように機能するかの詳細については、[リレーション](https://docs.craftcms.com/v3/relations.html)を参照してください。
### `search`

::: code

:::
- `access`
- `audio`
- `compressed`
- `excel`
- `flash`
- `html`
- `illustrator`
- `image`
- `javascript`
- `json`
- `pdf`
- `photoshop`
- `php`
- `powerpoint`
- `text`
- `video`
- `word`
- `xml`
- `unknown`

検索クエリにマッチするアセットだけに、クエリの結果を絞り込みます。

| 値         | 取得するアセット           |
| --------- | ------------------ |
| `'Foo'`   | タイトルが `Foo`。       |
| `'Foo*'`  | タイトルが `Foo` ではじまる。 |
| `'*Foo'`  | タイトルが `Foo` で終わる。  |
| `'*Foo*'` | タイトルが `Foo` を含む。   |



このパラメーターがどのように機能するかの詳細については、[検索](https://docs.craftcms.com/v3/searching.html)を参照してください。
```twig
{# Fetch all assets that are related to myCategory #}
{% set assets = craft.assets()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all assets that are related to $myCategory
$assets = \craft\elements\Asset::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


### `site`

:::



アセットを照会するサイトを決定します。
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all assets that match the search query #}
{% set assets = craft.assets()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all assets that match the search query
$assets = \craft\elements\Asset::find()
    ->search($searchQuery)
    ->all();
```
:::


### `siteId`

利用可能な値には、次のものが含まれます。



::: code
```twig
{# Fetch assets from the Foo site #}
{% set assets = craft.assets()
    .site('foo')
    .all() %}
```

```php
// Fetch assets from the Foo site
$assets = \craft\elements\Asset::find()
    ->site('foo')
    ->all();
```
:::


### `size`

サイトの ID ごとに、アセットを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。
```twig
{# Fetch assets from the site with an ID of 1 #}
{% set assets = craft.assets()
    .siteId(1)
    .all() %}
```

```php
// Fetch assets from the site with an ID of 1
$assets = \craft\elements\Asset::find()
    ->siteId(1)
    ->all();
```
:::


### `title`

:::



アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。



::: code
```twig
{# Fetch assets that are smaller than 1KB #}
{% set assets = craft.assets()
    .size('< 1000')
    .all() %}
```

```php
// Fetch assets that are smaller than 1KB
$assets = \craft\elements\Asset::find()
    ->size('< 1000')
    ->all();
```
:::


### `trashed`

アセットのタイトルに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。



::: code
```twig
{# Fetch assets with a title that contains "Foo" #}
{% set assets = craft.assets()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch assets with a title that contains "Foo"
$assets = \craft\elements\Asset::find()
    ->title('*Foo*')
    ->all();
```
:::


### `uid`

ソフトデリートされたアセットだけに、クエリの結果を絞り込みます。



::: code

| 値                                      | 取得するアセット                 |
| -------------------------------------- | ------------------------ |
| `09247074'foo'`                        | ハンドルが `foo` のボリューム内。     |
| a `\craft\elements\db\User` object | ハンドルが `foo` のボリューム内ではない。 |



:::
```twig
{# Fetch trashed assets #}
{% set assets = {twig-function}
    .trashed()
    .all() %}
```

```php
// Fetch trashed assets
$assets = \craft\elements\Asset::find()
    ->trashed()
    ->all();
```
:::


### `volume`

::: code



:::

| 値   | 取得するアセット        |
| --- | --------------- |
| `1` | ID が 1 のボリューム内。 |



アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
```twig
{# Fetch the asset by its UID #}
{% set asset = craft.assets()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the asset by its UID
$asset = \craft\elements\Asset::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `volumeId`

::: code



:::

| 値                                            | 取得するアセット       |
| -------------------------------------------- | -------------- |
| `587390100`                                  | 幅 100px。       |
| a [Asset](api:craft\elements\Asset) object | 少なくとも、幅 100px。 |



ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
```twig
{# Fetch assets in the Foo volume #}
{% set assets = craft.assets()
    .volume('foo')
    .all() %}
```

```php
// Fetch assets in the Foo group
$assets = \craft\elements\Asset::find()
    ->volume('foo')
    ->all();
```
:::


### `width`

::: code





:::
```twig
{# Fetch assets in the volume with an ID of 1 #}
{% set assets = craft.assets()
    .volumeId(1)
    .all() %}
```

```php
// Fetch categories in the volume with an ID of 1
$assets = \craft\elements\Asset::find()
    ->volumeId(1)
    ->all();
```
:::


### `with`

利用可能な値には、次のものが含まれます。



::: code



:::
```twig
{# Fetch XL images #}
{% set assets = craft.assets()
    .kind('image')
    .width('>= 1000')
    .all() %}
```

```php
// Fetch XL images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->width('>= 1000')
    ->all();
```
:::


### `withTransforms`

このパラメーターがどのように機能するかの詳細については、[エレメントのEager-Loading](https://docs.craftcms.com/v3/dev/eager-loading-elements.html)を参照してください。



::: code

:::

| Value                                  | Fetches assets…                                |
| -------------------------------------- | ---------------------------------------------- |
| `'foo'`                                | from the site with a handle of `foo`.          |
| `['foo', 'bar']`                       | from a site with a handle of `foo` or `bar`.   |
| `['not', 'foo', 'bar']`                | not in a site with a handle of `foo` or `bar`. |
| a `\craft\elements\db\Site` object | from the site represented by the object.       |
| `'*'`                                  | from any site.                                 |

イメージ変換インデックスを eager-loaded した状態で、マッチしたアセットをクエリが返します。



トランスフォームがすでに生成されている場合、一度に複数の変換された画像を表示する際のパフォーマンスが向上します。
```twig
{# Fetch assets eager-loaded with the "Related" field’s relations #}
{% set assets = craft.assets()
    .with(['related'])
    .all() %}
```

```php
// Fetch assets eager-loaded with the "Related" field’s relations
$assets = \craft\elements\Asset::find()
    ->with(['related'])
    ->all();
```
:::


### `siteId`

:::



The current site will be used by default.



::: code
```twig
{# Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded #}
{% set assets = craft.assets()
    .kind('image')
    .withTransforms(['thumbnail', 'hiResThumbnail'])
    .all() %}
```

```php
// Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->withTransforms(['thumbnail', 'hiResThumbnail'])
    ->all();
```
:::


### `size`

Narrows the query results based on the assets’ file sizes (in bytes).

Possible values include:

| Value                            | Fetches assets…                                 |
| -------------------------------- | ----------------------------------------------- |
| `1000`                           | with a size of 1,000 bytes (1KB).               |
| `'< 1000000'`                 | with a size of less than 1,000,000 bytes (1MB). |
| `['>= 1000', '< 1000000']` | with a size between 1KB and 1MB.                |



::: code
```twig
{# Fetch assets that are smaller than 1KB #}
{% set assets = craft.assets()
    .size('< 1000')
    .all() %}
```

```php
// Fetch assets that are smaller than 1KB
$assets = \craft\elements\Asset::find()
    ->size('< 1000')
    ->all();
```
:::


### `title`

Narrows the query results based on the assets’ titles.



Possible values include:

| Value                       | Fetches assets…                                   |
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
{# Fetch assets with a title that contains "Foo" #}
{% set assets = craft.assets()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch assets with a title that contains "Foo"
$assets = \craft\elements\Asset::find()
    ->title('*Foo*')
    ->all();
```
:::


### `trashed`

Narrows the query results to only assets that have been soft-deleted.





::: code
```twig
{# Fetch trashed assets #}
{% set assets = craft.assets()
    .trashed()
    .all() %}
```

```php
// Fetch trashed assets
$assets = \craft\elements\Asset::find()
    ->trashed()
    ->all();
```
:::


### `uid`

Narrows the query results based on the assets’ UIDs.





::: code
```twig
{# Fetch the asset by its UID #}
{% set asset = craft.assets()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the asset by its UID
$asset = \craft\elements\Asset::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique assets across all sites #}
{% set assets = craft.assets()
    .site('*')
    .unique()
    .all() %}
```

```php
// Fetch unique assets across all sites
$assets = \craft\elements\Asset::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


### `volume`

Narrows the query results based on the volume the assets belong to.

Possible values include:

| Value                                      | Fetches categories…                              |
| ------------------------------------------ | ------------------------------------------------ |
| `'foo'`                                    | in a volume with a handle of `foo`.              |
| `'not foo'`                                | not in a volume with a handle of `foo`.          |
| `['foo', 'bar']`                           | in a volume with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                    | not in a volume with a handle of `foo` or `bar`. |
| a [Volume](api:craft\base\Volume) object | in a volume represented by the object.           |



::: code
```twig
{# Fetch assets in the Foo volume #}
{% set assets = craft.assets()
    .volume('foo')
    .all() %}
```

```php
// Fetch assets in the Foo group
$assets = \craft\elements\Asset::find()
    ->volume('foo')
    ->all();
```
:::


### `volumeId`

Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.

Possible values include:

| Value           | Fetches categories…                   |
| --------------- | ------------------------------------- |
| `1`             | in a volume with an ID of 1.          |
| `'not 1'`       | not in a volume with an ID of 1.      |
| `[1, 2]`        | in a volume with an ID of 1 or 2.     |
| `['not', 1, 2]` | not in a volume with an ID of 1 or 2. |



::: code
```twig
{# Fetch assets in the volume with an ID of 1 #}
{% set assets = craft.assets()
    .volumeId(1)
    .all() %}
```

```php
// Fetch categories in the volume with an ID of 1
$assets = \craft\elements\Asset::find()
    ->volumeId(1)
    ->all();
```
:::


### `width`

Narrows the query results based on the assets’ image widths.

Possible values include:

| Value                         | Fetches assets…                     |
| ----------------------------- | ----------------------------------- |
| `100`                         | with a width of 100.                |
| `'>= 100'`                 | with a width of at least 100.       |
| `['>= 100', '<= 1000']` | with a width between 100 and 1,000. |



::: code
```twig
{# Fetch XL images #}
{% set assets = craft.assets()
    .kind('image')
    .width('>= 1000')
    .all() %}
```

```php
// Fetch XL images
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->width('>= 1000')
    ->all();
```
:::


### `with`

Causes the query to return matching assets eager-loaded with related elements.



See [Eager-Loading Elements](https://docs.craftcms.com/v3/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch assets eager-loaded with the "Related" field’s relations #}
{% set assets = craft.assets()
    .with(['related'])
    .all() %}
```

```php
// Fetch assets eager-loaded with the "Related" field’s relations
$assets = \craft\elements\Asset::find()
    ->with(['related'])
    ->all();
```
:::


### `withTransforms`

Causes the query to return matching assets eager-loaded with image transform indexes.

This can improve performance when displaying several image transforms at once, if the transforms have already been generated.



::: code
```twig
{# Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded #}
{% set assets = craft.assets()
    .kind('image')
    .withTransforms(['thumbnail', 'hiResThumbnail'])
    .all() %}
```

```php
// Fetch assets with the 'thumbnail' and 'hiResThumbnail' transform data preloaded
$assets = \craft\elements\Asset::find()
    ->kind('image')
    ->withTransforms(['thumbnail', 'hiResThumbnail'])
    ->all();
```
:::



<!-- END PARAMS -->

