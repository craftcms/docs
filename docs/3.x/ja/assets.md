# アセット

エントリや他のコンテンツタイプと同様に、プロジェクトのメディアと文書ファイル（アセット）を Craft で管理できます。

## ボリューム

すべてのアセットは「ボリューム」にあります。ボリュームは、ストレージコンテナです。ウェブサーバーのディレクトリ、または、Amazon S3 のようなリモートストレージサービスをボリュームにできます。

「設定 > アセット」から、プロジェクトのボリュームを管理できます。

すべてのボリュームは、その中に含まれるアセットがパプリック URL を持つかどうか、持つ場合に**ベース URL** をどうするかを選択できます。

::: tip
ボリュームのベース URL は環境変数をセットしたり、エイリアスではじめることができます。詳細については、[環境設定](config/#environmental-configuration)を参照してください。
:::

### ローカルボリューム

デフォルトで、ボリュームの1つのタイプ「ローカル」を作成できます。ローカルボリュームは、ローカルウェブサーバー上のディレクトリを表します。

ローカルボリュームは、**ファイルシステムのパス**という1つの設定があります。この設定を利用して、サーバー上のボリュームのルートディレクトリからのパスを定義します。

::: tip
ボリュームのファイルシステムのパスは環境変数をセットしたり、エイリアスではじめることができます。詳細については、[環境設定](config/#environmental-configuration)を参照してください。
:::

Craft もしくは PHP が、作成したディレクトリに書き込み可能でなければならないことに注意してください。

### リモートボリューム

Amazon S3 のようなリモートストレージサービスにアセットを保存したい場合は、インテグレーション機能を提供するプラグインをインストールできます。

- [Amazon S3](https://github.com/craftcms/aws-s3) (first party)
- [Google Cloud Storage](https://github.com/craftcms/google-cloud) (first party)
- [Rackspace Cloud Files](https://github.com/craftcms/rackspace) (first party)
- [DigitalOcean Spaces](https://github.com/vaersaagod/dospaces) (Værsågod)
- [fortrabbit Object Storage](https://github.com/fortrabbit/craft-object-storage) (fortrabbit)

## アセットのカスタムフィールド

それぞれのアセットボリュームはフィールドレイアウトを持ち、そのボリュームに含まれるアセットが利用可能な[フィールド](fields.md)をセットできます。ボリュームの編集中に「フィールドの配置」タブをクリックすることで、ボリュームのフィールドレイアウトを編集できます。

ここで選択したフィールドは、（[アセットページ](#assets-page)または[アセットフィールド](assets-fields.md)のいずれかにある）アセットをダブルクリックした際に開く、アセットエディタの HUD に表示されます。

## アセットページ

最初のボリュームを作成すると、コントロールパネルのメインナビゲーションに「アセット」項目が追加されます。これをクリックすると、左サイドバーにすべてのボリュームのリスト、メインコンテンツエリアに選択されたボリュームのファイルが表示されたアセットページに移動します。

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

（FTP などの）Craft 外で追加、編集、または、削除されたファイルがある場合、Craft にそのボリュームのインデックスをアップデートするよう伝える必要があります。「ユーティリティ > アセットインデックス」から実行できます。

リモート画像をキャッシュするオプションがあります。（Amazon S3 など）リモートボリュームがない場合は、無視して問題ありません。設定を有効にすると、インデックス処理が完了するまでの時間が長くなりますが、[画像変換](image-transforms.md)の生成スピードが向上します。

## 画像変換

Craft はアセットに様々な画像変換を行う手段を提供します。詳細については、[画像変換](image-transforms.md)を参照してください。

## イメージエディタ

Craft は画像を変更するための組み込みのイメージエディタを提供します。画像を切り抜いたり、まっすぐにしたり、回転させたり、反転させたり、さらに焦点を選択することもできます。

イメージエディタを起動するには、（アセットページまたは[アセットフィールド](assets-fields.md)のいずれかにある）画像をダブルクリックし、HUD の画像プレビューエリアの右上にある「編集」ボタンをクリックします。または、[アセットページ](#assets-page)で任意のアセットを選択し、タスクメニュー（歯車アイコン）から「画像の編集」 を選択することもできます。

### 焦点

[画像変換](image-transforms.md)でどのように切り抜くかを決定する際、画像のどの部分を優先させるか Craft が認識するために、画像に焦点をセットします。焦点は、画像変換の「デフォルトの焦点」設定よりも優先されます。

焦点を設定するには、イメージエディタを開き「焦点」ボタンをクリックします。画像の中央に円形のアイコンが表示されます。画像の焦点にしたい場所へ、アイコンをドラッグします。

焦点を削除するには、再度「焦点」ボタンをクリックします。

イメージエディタの他の変更と同様に、画像を保存するまで焦点は有効になりません。

## アセットの照会

**アセットクエリ**を利用して、テンプレートや PHP コード内でアセットを取得できます。

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

アセットクエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、`.all()` を呼び出して[実行](element-queries.md#executing-element-queries)できます。[Asset](craft3:craft\elements\Asset) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリ](element-queries.md)を参照してください。
:::

### 実例

次の操作を行うことで、「Photos」ボリュームに含まれる画像のサムネイルのリストを表示できます。

1. `craft.assets()` でアセットクエリを作成します。
2. [volume](#volume) および [kind](#kind) パラメータをセットします。
3. `.all()` でアセットを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを利用してアセットをループ処理し、サムネイルリストの HTML を作成します。

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
`asset.url` または `asset.getUrl()` を使用する場合、そのアセットのソースボリュームは「このボリュームのアセットにはパブリック URL が含まれます」が有効で、「ベース URL」がセットされていなければなりません。さもなければ、結果は常に空になります。
:::

### パラメータ

アセットクエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

| パラメータ | 説明 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [anyStatus](#anystatus) | ステータスに基づくエレメントのフィルタを削除します。 |
| [asArray](#asarray) | [Asset](craft3:craft\elements\Asset) オブジェクトではなく、データの配列として、マッチしたアセットをクエリが返します。 |
| [clearCachedResult](#clearcachedresult) | キャッシュされた結果をクリアします。 |
| [dateCreated](#datecreated) | アセットの作成日に基づいて、クエリの結果を絞り込みます。 |
| [dateModified](#datemodified) | アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。 |
| [dateUpdated](#dateupdated) | アセットの最終アップデート日に基づいて、クエリの結果を絞り込みます。 |
| [filename](#filename) | アセットのファイル名に基づいて、クエリの結果を絞り込みます。 |
| [fixedOrder](#fixedorder) | クエリの結果を [id](#id) で指定された順序で返します。 |
| [folderId](#folderid) | フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。 |
| [height](#height) | アセットの画像の高さに基づいて、クエリの結果を絞り込みます。 |
| [id](#id) | アセットの ID に基づいて、クエリの結果を絞り込みます。 |
| [ignorePlaceholders](#ignoreplaceholders) | [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするアセットをクエリが返します。 |
| [inReverse](#inreverse) | クエリの結果を逆順で返します。 |
| [includeSubfolders](#includesubfolders) | [folderId](#folderid) で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。 |
| [kind](#kind) | アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。 |
| [limit](#limit) | 返されるアセットの数を決定します。 |
| [offset](#offset) | 結果からスキップされるアセットの数を決定します。 |
| [orderBy](#orderby) | 返されるアセットの順序を決定します。（空の場合、デフォルトは `dateCreated DESC`） |
| [preferSites](#prefersites) | [unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します |
| [relatedTo](#relatedto) | 特定の他のエレメントと関連付けられたアセットだけに、クエリの結果を絞り込みます。 |
| [search](#search) | 検索クエリにマッチするアセットだけに、クエリの結果を絞り込みます。 |
| [site](#site) | アセットを照会するサイトを決定します。 |
| [siteId](#siteid) | サイトの ID ごとに、アセットを照会するサイトを決定します。 |
| [size](#size) | アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。 |
| [title](#title) | アセットのタイトルに基づいて、クエリの結果を絞り込みます。 |
| [trashed](#trashed) | ソフトデリートされたアセットだけに、クエリの結果を絞り込みます。 |
| [uid](#uid) | アセットの UID に基づいて、クエリの結果を絞り込みます。 |
| [unique](#unique) | クエリによってユニークな ID のエレメントだけが返されるかを決定します。 |
| [uploader](#uploader) | ユーザーの ID ごとに、アセットをアップロードしたユーザーに基づいて、クエリの結果を絞り込みます。 |
| [volume](#volume) | アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。 |
| [volumeId](#volumeid) | ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。 |
| [width](#width) | アセットの画像の幅に基づいて、クエリの結果を絞り込みます。 |
| [with](#with) | 関連付けられたエレメントを eager-loaded した状態で、マッチしたアセットをクエリが返します。 |
| [withTransforms](#withtransforms) | 画像変換インデックスを eager-loaded した状態で、マッチしたアセットをクエリが返します。 |

#### `anyStatus`

ステータスに基づくエレメントのフィルタを削除します。





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

[Asset](craft3:craft\elements\Asset) オブジェクトではなく、データの配列として、マッチしたアセットをクエリが返します。





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

キャッシュされた結果をクリアします。






#### `dateCreated`

アセットの作成日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に作成されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に作成されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。



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

アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降に更新されたもの。
| `'< 2018-05-01'` | 2018-05-01 より前に更新されたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に更新されたもの。



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

アセットの最終アップデート日に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'>= 2018-04-01'` | 2018-04-01 以降にアップデートされたもの。
| `'< 2018-05-01'` | 2018-05-01 より前にアップデートされたもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。



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

アセットのファイル名に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'foo.jpg'` | ファイル名が `foo.jpg`。
| `'foo*'` | ファイル名が `foo` ではじまる。
| `'*.jpg'` | ファイル名が `.jpg` で終わる。
| `'*foo*'` | ファイル名に `foo` を含む。
| `'not *foo*'` | ファイル名に `foo` を含まない。
| `['*foo*', '*bar*']` | ファイル名に `foo` または `bar` を含む。
| `['not', '*foo*', '*bar*']` | ファイル名に `foo` または `bar` を含まない。



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

クエリの結果を [id](#id) で指定された順序で返します。





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

フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1` | ID が 1 のフォルダ内。
| `'not 1'` | ID が 1 のフォルダ内ではない。
| `[1, 2]` | ID が 1 または 2 のフォルダ内。
| `['not', 1, 2]` | ID が 1 または 2 のフォルダ内ではない。



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
特定のフォルダのすべてのサブフォルダのアセットを含めたい場合、[includeSubfolders](#includesubfolders) と組み合わせることができます。
:::
#### `height`

アセットの画像の高さに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `100` | 高さ 100px。
| `'>= 100'` | 少なくとも、高さ 100px。
| `['>= 100', '<= 1000']` | 高さ 100px から 1,000px の間。



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

アセットの ID に基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1` | ID が 1。
| `'not 1'` | ID が 1ではない。
| `[1, 2]` | ID が 1 または 2。
| `['not', 1, 2]` | ID が 1 または 2 ではない。



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
特定の順序で結果を返したい場合、[fixedOrder](#fixedorder) と組み合わせることができます。
:::


#### `ignorePlaceholders`

[craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement) によってセットされたマッチするプレースホルダーエレメントを無視して、データベースに保存されたマッチするアセットをクエリが返します。










#### `inReverse`

クエリの結果を逆順で返します。





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

[folderId](#folderid) で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。



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
これは [folderId](#folderid) に単一のフォルダ ID がセットされているときだけ、動作します。
:::
#### `kind`

アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。

サポートされるファイルの種類：
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

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'image'` | ファイルの種類が `image`。
| `'not image'` | ファイルの種類が `image` ではない。
| `['image', 'pdf']` | ファイルの種類が `image` または `pdf`。
| `['not', 'image', 'pdf']` | ファイルの種類が `image` または `pdf` ではない。



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

返されるアセットの数を決定します。



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

結果からスキップされるアセットの数を決定します。



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

返されるアセットの順序を決定します。（空の場合、デフォルトは `dateCreated DESC`）



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

[unique](#unique) がセットされている場合、マルチサイトでエレメント照会する際に選択されるべきサイトを決定します



例えば、エレメント “Foo” がサイト A とサイト B に存在し、エレメント “Bar” がサイト B とサイト C に存在し、ここに `['c', 'b', 'a']` がセットされている場合、Foo will はサイト C に対して返され、Bar はサイト B に対して返されます。

これがセットされていない場合、現在のサイトが優先されます。



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

特定の他のエレメントと関連付けられたアセットだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[リレーション](relations.md)を参照してください。



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

検索クエリにマッチするアセットだけに、クエリの結果を絞り込みます。



このパラメーターがどのように機能するかの詳細については、[検索](searching.md)を参照してください。



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

アセットを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
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

サイトの ID ごとに、アセットを照会するサイトを決定します。



デフォルトでは、現在のサイトが使用されます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1` | ID が `1` のサイトから。
| `[1, 2]` | ID が `1` または `2` のサイトから。
| `['not', 1, 2]` | ID が `1` または `2` のサイトではない。
| `'*'` | すべてのサイトから。



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

アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1000` | サイズが 1,000 bytes（1KB）。
| `'< 1000000'` | サイズが 1,000,000 bytes（1MB）よりも小さい。
| `['>= 1000', '< 1000000']` | サイズが 1KB から 1MB の間。



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

アセットのタイトルに基づいて、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'Foo'` | タイトルが `Foo`。
| `'Foo*'` | タイトルが `Foo` ではじまる。
| `'*Foo'` | タイトルが `Foo` で終わる。
| `'*Foo*'` | タイトルが `Foo` を含む。
| `'not *Foo*'` | タイトルが `Foo` を含まない。
| `['*Foo*', '*Bar*']` | タイトルが `Foo` または `Bar` を含む。
| `['not', '*Foo*', '*Bar*']` | タイトルが `Foo` または `Bar` を含まない。



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

ソフトデリートされたアセットだけに、クエリの結果を絞り込みます。





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

アセットの UID に基づいて、クエリの結果を絞り込みます。





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

クエリによってユニークな ID のエレメントだけが返されるかを決定します。



一度に複数のサイトからエレメントを照会する際、「重複する」結果を望まない場合に使用します。



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

ユーザーの ID ごとに、アセットをアップロードしたユーザーに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1` | ID が 1 のユーザーによってアップロードされたもの。
| [craft\elements\User](craft3:craft\elements\User) オブジェクト | オブジェクトで表されるユーザーによってアップロードされたもの。



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

アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `'foo'` | ハンドルが `foo` のボリューム内。
| `'not foo'` | ハンドルが `foo` のボリューム内ではない。
| `['foo', 'bar']` | ハンドルが `foo` または `bar` のボリューム内。
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のボリューム内ではない。
| [volume](craft3:craft\base\VolumeInterface) オブジェクト | オブジェクトで表されるボリューム内。



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

ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `1` | ID が 1 のボリューム内。
| `'not 1'` | ID が 1 のボリューム内ではない。
| `[1, 2]` | ID が 1 または 2 のボリューム内。
| `['not', 1, 2]` | ID が 1 または 2 のボリューム内ではない。
| `':empty:'` | ボリューム内にまだ何も保管されていない。



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

アセットの画像の幅に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するアセット
| - | -
| `100` | 幅 100px。
| `'>= 100'` | 少なくとも、幅 100px。
| `['>= 100', '<= 1000']` | 幅 100px から 1,000px の間。



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

関連付けられたエレメントを eager-loaded した状態で、マッチしたアセットをクエリが返します。



このパラメーターがどのように機能するかの詳細については、[エレメントの Eager-Loading](dev/eager-loading-elements.md) を参照してください。



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

画像変換インデックスを eager-loaded した状態で、マッチしたアセットをクエリが返します。

トランスフォームがすでに生成されている場合、一度に複数の変換された画像を表示する際のパフォーマンスが向上します。

トランスフォームは、ハンドルや `width`、および / または、`height` プロパティを含むオブジェクトとして指定できます。

`srcset` スタイルのサイズ（例：`100w` または `2x`）を通常のトランスフォーム定義の後に含めることができます。例えば、

::: code

```twig
[{width: 1000, height: 600}, '1.5x', '2x', '3x']
```

```php
[['width' => 1000, 'height' => 600], '1.5x', '2x', '3x']
```

:::

`srcset` スタイルのサイズに遭遇すると、トランスフォーム寸法の結果を決定する際、先行する通常のトランスフォーム定義が参照として使用されます。



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
