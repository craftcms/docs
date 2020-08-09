# アセット

エントリや他のコンテンツタイプと同様に、プロジェクトのメディアと文書ファイル（アセット）を Craft で管理することができます。

## ボリューム

すべてのアセットは「ボリューム」にあります。 ボリュームは、ストレージコンテナです。 ウェブサーバーのディレクトリ、または、Amazon S3 のようなリモートストレージサービスをボリュームにできます。

「設定 > アセット」から、プロジェクトのボリュームを管理できます。

すべてのボリュームは、その中に含まれるアセットがパプリック URL を持つかどうか、持つ場合に**ベース URL** をどうするかを選択できます。

::: tip
ボリュームのベース URL は環境変数をセットしたり、エイリアスではじめることができます。 詳細については、[環境設定](config/environments.md)を参照してください。 :::
:::

### ローカルボリューム

デフォルトで、ボリュームの1つのタイプ「ローカル」を作成できます。 ローカルボリュームは、ローカルウェブサーバー上のディレクトリを表します。

ローカルボリュームは、**ファイルシステムのパス**という1つの設定があります。 この設定を使用して、サーバー上のボリュームのルートディレクトリからのパスを定義します。

::: tip
ボリュームのファイルシステムのパスは環境変数をセットしたり、エイリアスではじめることができます。 詳細については、[環境設定](config/environments.md)を参照してください。 :::
:::

Craft もしくは PHP が、作成したディレクトリに書き込み可能でなければならないことに注意してください。

### リモートボリューム

Amazon S3 のようなリモートストレージサービスにアセットを保存したい場合は、インテグレーション機能を提供するプラグインをインストールできます。

- [Amazon S3](https://github.com/craftcms/aws-s3)（ファーストパーティ）
- [Google Cloud Storage](https://github.com/craftcms/google-cloud)（ファーストパーティ）
- [Rackspace Cloud Files](https://github.com/craftcms/rackspace)（ファーストパーティ）
- [DigitalOcean Spaces](https://github.com/vaersaagod/dospaces)（Værsågod）
- [fortrabbit Object Storage](https://github.com/fortrabbit/craft-object-storage)（fortrabbit）

## アセットのカスタムフィールド

それぞれのアセットボリュームはフィールドレイアウトを持ち、そのボリュームに含まれるアセットが利用可能な[フィールド](fields.md)をセットできます。 ボリュームの編集中に「フィールドの配置」タブをクリックすることで、ボリュームのフィールドレイアウトを編集できます。

ここで選択したフィールドは、（[アセットページ](#assets-page) または [アセットフィールド](assets-fields.md) のいずれかにある）アセットをダブルクリックした際に開く、アセットエディタの HUD に表示されます。

## アセットページ

最初のボリュームを作成すると、コントロールパネルのメインナビゲーションに「アセット」項目が追加されます。 これをクリックすると、左サイドバーにすべてのボリュームのリスト、メインコンテンツエリアに選択されたボリュームのファイルが表示されたアセットページに移動します。

このページでは、次のことができます。

- 新しいファイルのアップロード
- ファイルのリネーム
- ファイルのタイトルやファイル名の編集
- 選択されたイメージ向けのイメージエディタの起動
- サブフォルダの管理
- （ドラッグアンドドロップによる）別のボリュームやサブフォルダへのファイルの移動
- ファイルの削除

### サブフォルダの管理

左サイドバーのボリュームで右クリックし「新しいサブフォルダー」を選択すると、ボリュームの1つにサブフォルダを作成できます。

サブフォルダを作成すると、その中にファイルをドラックできるようになります。

左サイドバーのサブフォルダで右クリックし「新しいサブフォルダー」を選択すると、サブフォルダの中にネストされたサブフォルダを作成できます。

左サイドバーのサブフォルダを右クリックし「フォルダ名を変更する」を選択すると、サブフォルダをリネームできます。

左サイドバーのサブフォルダを右クリックし「フォルダを削除する」を選択すると、サブフォルダ（および、それに含まれるすべてのアセット）を削除できます。

## アセットインデックスのアップデート

（FTP などの）Craft 外で追加、編集、または、削除されたファイルがある場合、Craft にそのボリュームのインデックスをアップデートするよう伝える必要があります。 「ユーティリティ > アセットインデックス」から実行できます。

リモート画像をキャッシュするオプションがあります。 （Amazon S3 など）リモートボリュームがない場合は、無視して問題ありません。 設定を有効にすると、インデックス処理が完了するまでの時間が長くなりますが、[画像の変形](image-transforms.md)の生成スピードが向上します。

## 画像の変形

Craft はアセットに様々な画像変形を行う手段を提供します。 詳細については、[画像の変形](image-transforms.md)を参照してください。

## イメージエディタ

Craft は画像を変更するための組み込みのイメージエディタを提供します。 画像を切り抜いたり、まっすぐにしたり、回転させたり、反転させたり、さらに焦点を選択することもできます。

イメージエディタを起動するには、（アセットページまたは[アセットフィールド](assets-fields.md)のいずれかにある）画像をダブルクリックし、HUD の画像プレビューエリアの右上にある「編集」ボタンをクリックします。 または、[アセットページ](#assets-page)で任意のアセットを選択し、タスクメニュー（歯車アイコン）から「画像の編集」 を選択することもできます。

### 焦点

[画像の変形](image-transforms.md)でどのように切り抜くかを決定する際、画像のどの部分を優先させるか Craft が認識するために、画像に焦点をセットします。 焦点は、画像の変形の「デフォルトの焦点」設定よりも優先されます。

焦点を設定するには、イメージエディタを開き「焦点」ボタンをクリックします。 画像の中央に円形のアイコンが表示されます。 画像の焦点にしたい場所へ、アイコンをドラッグします。

焦点を削除するには、再度「焦点」ボタンをクリックします。

イメージエディタの他の変更と同様に、画像を保存するまで焦点は有効になりません。

## Querying Assets

You can fetch assets in your templates or PHP code using **asset queries**.

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

Once you’ve created an asset query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](README.md#executing-element-queries) by calling `.all()`. An array of [Asset](craft3:craft\elements\Asset) objects will be returned.

::: tip
See [Introduction to Element Queries](README.md) to learn about how element queries work.
:::

### Example

We can display a list of thumbnails for images in a “Photos” volume by doing the following:

1. Create an asset query with `craft.assets()`.
2. Set the [volume](#volume) and [kind](#kind) parameters on it.
3. Fetch the assets with `.all()`.
4. Loop through the assets using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to create the thumbnail list HTML.

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

::: warning
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have “Assets in this volume have public URLs” enabled and a “Base URL” setting. Otherwise, the result will always be empty.
:::

### Parameters

Asset queries support the following parameters:

<!-- BEGIN PARAMS -->

| Param                                     | Description                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [anyStatus](#anystatus)                   | Removes element filters based on their statuses.                                                                                                                                                                                                                                         |
| [asArray](#asarray)                       | Causes the query to return matching assets as arrays of data, rather than [Asset](craft3:craft\elements\Asset) objects.                                                                                                                                                                |
| [clearCachedResult](#clearcachedresult)   | Clears the cached result.                                                                                                                                                                                                                                                                |
| [dateCreated](#datecreated)               | Narrows the query results based on the assets’ creation dates.                                                                                                                                                                                                                           |
| [dateModified](#datemodified)             | Narrows the query results based on the assets’ files’ last-modified dates.                                                                                                                                                                                                               |
| [dateUpdated](#dateupdated)               | Narrows the query results based on the assets’ last-updated dates.                                                                                                                                                                                                                       |
| [filename](#filename)                     | Narrows the query results based on the assets’ filenames.                                                                                                                                                                                                                                |
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).                                                                                                                                                                                                             |
| [folderId](#folderid)                     | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.                                                                                                                                                                                               |
| [height](#height)                         | Narrows the query results based on the assets’ image heights.                                                                                                                                                                                                                            |
| [id](#id)                                 | Narrows the query results based on the assets’ IDs.                                                                                                                                                                                                                                      |
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching assets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement). |
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.                                                                                                                                                                                                                                |
| [includeSubfolders](#includesubfolders)   | Broadens the query results to include assets from any of the subfolders of the folder specified by [folderId](#folderid).                                                                                                                                                                |
| [kind](#kind)                             | Narrows the query results based on the assets’ file kinds.                                                                                                                                                                                                                               |
| [limit](#limit)                           | Determines the number of assets that should be returned.                                                                                                                                                                                                                                 |
| [offset](#offset)                         | Determines how many assets should be skipped in the results.                                                                                                                                                                                                                             |
| [orderBy](#orderby)                       | Determines the order that the assets should be returned in. (If empty, defaults to `dateCreated DESC`.)                                                                                                                                                                                  |
| [preferSites](#prefersites)               | If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.                                                                                                                                                                            |
| [relatedTo](#relatedto)                   | Narrows the query results to only assets that are related to certain other elements.                                                                                                                                                                                                     |
| [search](#search)                         | Narrows the query results to only assets that match a search query.                                                                                                                                                                                                                      |
| [site](#site)                             | Determines which site(s) the assets should be queried in.                                                                                                                                                                                                                                |
| [siteId](#siteid)                         | Determines which site(s) the assets should be queried in, per the site’s ID.                                                                                                                                                                                                             |
| [size](#size)                             | Narrows the query results based on the assets’ file sizes (in bytes).                                                                                                                                                                                                                    |
| [title](#title)                           | Narrows the query results based on the assets’ titles.                                                                                                                                                                                                                                   |
| [trashed](#trashed)                       | Narrows the query results to only assets that have been soft-deleted.                                                                                                                                                                                                                    |
| [uid](#uid)                               | Narrows the query results based on the assets’ UIDs.                                                                                                                                                                                                                                     |
| [unique](#unique)                         | Determines whether only elements with unique IDs should be returned by the query.                                                                                                                                                                                                        |
| [uploader](#uploader)                     | Narrows the query results based on the user the assets were uploaded by, per the user’s IDs.                                                                                                                                                                                             |
| [volume](#volume)                         | Narrows the query results based on the volume the assets belong to.                                                                                                                                                                                                                      |
| [volumeId](#volumeid)                     | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.                                                                                                                                                                                               |
| [width](#width)                           | Narrows the query results based on the assets’ image widths.                                                                                                                                                                                                                             |
| [with](#with)                             | Causes the query to return matching assets eager-loaded with related elements.                                                                                                                                                                                                           |
| [withTransforms](#withtransforms)         | Causes the query to return matching assets eager-loaded with image transform indexes.                                                                                                                                                                                                    |

#### `anyStatus`

Removes element filters based on their statuses.





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


#### `asArray`

Causes the query to return matching assets as arrays of data, rather than [Asset](craft3:craft\elements\Asset) objects.





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


#### `clearCachedResult`

Clears the cached result.






#### `dateCreated`

Narrows the query results based on the assets’ creation dates.



Possible values include:

| Value                                            | Fetches assets…                                      |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were created on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were created before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01. |



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


#### `dateModified`

Narrows the query results based on the assets’ files’ last-modified dates.

Possible values include:

| Value                                            | Fetches assets…                                       |
| ------------------------------------------------ | ----------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were modified on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were modified before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were modified between 2018-04-01 and 2018-05-01. |



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


#### `dateUpdated`

Narrows the query results based on the assets’ last-updated dates.



Possible values include:

| Value                                            | Fetches assets…                                      |
| ------------------------------------------------ | ---------------------------------------------------- |
| `'>= 2018-04-01'`                             | that were updated on or after 2018-04-01.            |
| `'< 2018-05-01'`                              | that were updated before 2018-05-01                  |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01. |



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


#### `filename`

Narrows the query results based on the assets’ filenames.

Possible values include:

| Value                       | Fetches assets…                                      |
| --------------------------- | ---------------------------------------------------- |
| `'foo.jpg'`                 | with a filename of `foo.jpg`.                        |
| `'foo*'`                    | with a filename that begins with `foo`.              |
| `'*.jpg'`                   | with a filename that ends with `.jpg`.               |
| `'*foo*'`                   | with a filename that contains `foo`.                 |
| `'not *foo*'`               | with a filename that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a filename that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a filename that doesn’t contain `foo` or `bar`. |



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


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
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


#### `folderId`

Narrows the query results based on the folders the assets belong to, per the folders’ IDs.

Possible values include:

| Value           | Fetches assets…                       |
| --------------- | ------------------------------------- |
| `1`             | in a folder with an ID of 1.          |
| `'not 1'`       | not in a folder with an ID of 1.      |
| `[1, 2]`        | in a folder with an ID of 1 or 2.     |
| `['not', 1, 2]` | not in a folder with an ID of 1 or 2. |



::: code
```twig
{# Fetch assets in the folder with an ID of 1 #}
{% set assets = craft.assets()
    .folderId(1)
    .all() %}
```

```php
// Fetch assets in the folder with an ID of 1
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->all();
```
:::



::: tip
This can be combined with [includeSubfolders](#includesubfolders) if you want to include assets in all the subfolders of a certain folder.
:::
#### `height`

Narrows the query results based on the assets’ image heights.

Possible values include:

| Value                         | Fetches assets…                      |
| ----------------------------- | ------------------------------------ |
| `100`                         | with a height of 100.                |
| `'>= 100'`                 | with a height of at least 100.       |
| `['>= 100', '<= 1000']` | with a height between 100 and 1,000. |



::: code
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


#### `id`

Narrows the query results based on the assets’ IDs.



Possible values include:

| Value           | Fetches assets…           |
| --------------- | ------------------------- |
| `1`             | with an ID of 1.          |
| `'not 1'`       | not with an ID of 1.      |
| `[1, 2]`        | with an ID of 1 or 2.     |
| `['not', 1, 2]` | not with an ID of 1 or 2. |



::: code
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



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching assets as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
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


#### `includeSubfolders`

Broadens the query results to include assets from any of the subfolders of the folder specified by [folderId](#folderid).



::: code
```twig
{# Fetch assets in the folder with an ID of 1 (including its subfolders) #}
{% set assets = craft.assets()
    .folderId(1)
    .includeSubfolders()
    .all() %}
```

```php
// Fetch assets in the folder with an ID of 1 (including its subfolders)
$assets = \craft\elements\Asset::find()
    ->folderId(1)
    ->includeSubfolders()
    ->all();
```
:::



::: warning
This will only work if [folderId](#folderid) was set to a single folder ID.
:::
#### `kind`

Narrows the query results based on the assets’ file kinds.

Supported file kinds:
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

Possible values include:

| Value                     | Fetches assets…                           |
| ------------------------- | ----------------------------------------- |
| `'image'`                 | with a file kind of `image`.              |
| `'not image'`             | not with a file kind of `image`..         |
| `['image', 'pdf']`        | with a file kind of `image` or `pdf`.     |
| `['not', 'image', 'pdf']` | not with a file kind of `image` or `pdf`. |



::: code
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


#### `limit`

Determines the number of assets that should be returned.



::: code
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


#### `offset`

Determines how many assets should be skipped in the results.



::: code
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


#### `orderBy`

Determines the order that the assets should be returned in. (If empty, defaults to `dateCreated DESC`.)



::: code
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


#### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique assets from Site A, or Site B if they don’t exist in Site A #}
{% set assets = craft.assets()
    .site('*')
    .unique()
    .preferSites(['a', 'b'])
    .all() %}
```

```php
// Fetch unique assets from Site A, or Site B if they don’t exist in Site A
$assets = \craft\elements\Asset::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only assets that are related to certain other elements.



See [Relations](https://craftcms.com/docs/3.x/relations.html) for a full explanation of how to work with this parameter.



::: code
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


#### `search`

Narrows the query results to only assets that match a search query.



See [Searching](https://craftcms.com/docs/3.x/searching.html) for a full explanation of how to work with this parameter.



::: code
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


#### `site`

Determines which site(s) the assets should be queried in.



The current site will be used by default.

Possible values include:

| Value                                                      | Fetches assets…                                |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `'foo'`                                                    | from the site with a handle of `foo`.          |
| `['foo', 'bar']`                                           | from a site with a handle of `foo` or `bar`.   |
| `['not', 'foo', 'bar']`                                    | not in a site with a handle of `foo` or `bar`. |
| a [craft\models\Site](craft3:craft\models\Site) object | from the site represented by the object.       |
| `'*'`                                                      | from any site.                                 |

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



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


#### `siteId`

Determines which site(s) the assets should be queried in, per the site’s ID.



The current site will be used by default.

Possible values include:

| Value           | Fetches assets…                         |
| --------------- | --------------------------------------- |
| `1`             | from the site with an ID of `1`.        |
| `[1, 2]`        | from a site with an ID of `1` or `2`.   |
| `['not', 1, 2]` | not in a site with an ID of `1` or `2`. |
| `'*'`           | from any site.                          |



::: code
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


#### `size`

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


#### `title`

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


#### `trashed`

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


#### `uid`

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


#### `unique`

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


#### `uploader`

Narrows the query results based on the user the assets were uploaded by, per the user’s IDs.

Possible values include:

| Value                                                          | Fetches assets…                                 |
| -------------------------------------------------------------- | ----------------------------------------------- |
| `1`                                                            | uploaded by the user with an ID of 1.           |
| a [craft\elements\User](craft3:craft\elements\User) object | uploaded by the user represented by the object. |



::: code
```twig
{# Fetch assets uploaded by the user with an ID of 1 #}
{% set assets = craft.assets()
    .uploader(1)
    .all() %}
```

```php
// Fetch assets uploaded by the user with an ID of 1
$assets = \craft\elements\Asset::find()
    ->uploader(1)
    ->all();
```
:::


#### `volume`

Narrows the query results based on the volume the assets belong to.

Possible values include:

| Value                                                  | Fetches assets…                                  |
| ------------------------------------------------------ | ------------------------------------------------ |
| `'foo'`                                                | in a volume with a handle of `foo`.              |
| `'not foo'`                                            | not in a volume with a handle of `foo`.          |
| `['foo', 'bar']`                                       | in a volume with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                                | not in a volume with a handle of `foo` or `bar`. |
| a [volume](craft3:craft\base\VolumeInterface) object | in a volume represented by the object.           |



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


#### `volumeId`

Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.

Possible values include:

| Value           | Fetches assets…                          |
| --------------- | ---------------------------------------- |
| `1`             | in a volume with an ID of 1.             |
| `'not 1'`       | not in a volume with an ID of 1.         |
| `[1, 2]`        | in a volume with an ID of 1 or 2.        |
| `['not', 1, 2]` | not in a volume with an ID of 1 or 2.    |
| `':empty:'`     | that haven’t been stored in a volume yet |



::: code
```twig
{# Fetch assets in the volume with an ID of 1 #}
{% set assets = craft.assets()
    .volumeId(1)
    .all() %}
```

```php
// Fetch assets in the volume with an ID of 1
$assets = \craft\elements\Asset::find()
    ->volumeId(1)
    ->all();
```
:::


#### `width`

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


#### `with`

Causes the query to return matching assets eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/3.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



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


#### `withTransforms`

Causes the query to return matching assets eager-loaded with image transform indexes.

This can improve performance when displaying several image transforms at once, if the transforms have already been generated.

Transforms can be specified as their handle or an object that contains `width` and/or `height` properties.

You can include `srcset`-style sizes (e.g. `100w` or `2x`) following a normal transform definition, for example:

::: code

```twig
[{width: 1000, height: 600}, '1.5x', '2x', '3x']
```

```php
[['width' => 1000, 'height' => 600], '1.5x', '2x', '3x']
```

:::

When a `srcset`-style size is encountered, the preceding normal transform definition will be used as a reference when determining the resulting transform dimensions.



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
