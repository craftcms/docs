# アセットフィールド

アセットフィールドでは、[アセット](assets.md)を他のエレメントに関連付けることができます。

## 設定

アセットフィールドの設定は、次の通りです。

- ** – ファイルのアップロード / 関連付けを単一のフォルダに制限するかどうか。

  有効にすると、次の設定が表示されます。

  - **ロケーションをアップロードする** – フィールドに直接ドラッグされたファイルを保存するロケーション。

  無効にすると、次の設定が表示されます。

  - **ソース** – フィールドが、どのアセットボリューム（または、他のアセットインデックスソース）からアセットを関連付けられるか。
  - **既定のアップロードロケーション** – フィールドに直接ドラッグされたファイルを保存するデフォルトのロケーション。

- **許可されるファイルの種類を制限しますか？ ** 特定の種類のファイルだけをアップロード / 関連付けできるフィールドにするかどうか。
- **リミット** – フィールドに関連付けできるアセット数の上限。 （デフォルトは無制限です）
- **モードを見る。 ** – 投稿者のために、フィールドをどのように表示するか。
- **選択ラベル** – フィールドの選択ボタンのラベルに利用されます。

### マルチサイト設定

On multi-site installs, the following settings will also be available (under **Advanced**):

- **特定のサイトから アセット を関連付けますか?** – 特定のサイトのアセットとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたアセットは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたアセットの独自のセットを取得するかどうか。

### 動的なサブフォルダパス

「ロケーションをアップロードする」と「既定のアップロードロケーション」設定に定義されるサブフォルダには、オプションで Twig タグ（例：`news/{{ slug }}`）を含めることができます。

ソースエレメント（アセットフィールドを持つエレメント）でサポートされているすべてのプロパティは、ここで使用できます。

::: tip
If you want to include the entry’s ID or UID in a dynamic subfolder path, use `{canonicalId}` or `{canonicalUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the revision / draft’s.
:::

そのため、行列フィールドがエントリに紐づけられていて、動的なサブフォルダパスにエントリ ID を出力したい場合、`id` ではなく `owner.id` を使用します。
:::

そのため、行列フィールドがエントリに紐づけられていて、動的なサブフォルダパスにエントリ ID を出力したい場合、`id` ではなく `owner.id` を利用します。 :::
:::

::: warning
If the rendered subfolder path ends up blank, or contains a leading or trailing forward slash (e.g. `foo/`) or an empty segment (e.g. `foo//bar`), Craft will interpret that as a sign that a variable in the subfolder template couldn’t be resolved successfully, and the path will be considered invalid. If you are intentionally outputting a blank segment, output `:ignore:`. For example, if you want to output the first selected category, or nothing if there isn’t one, do this:

```twig
{{ categoriesFieldHandle.one().slug ?? ':ignore:' }}
```
:::

## フィールド

::: tip
アセットフィールドやモーダルウィンドウに直接ファイルをドラックして、アップロードすることもできます。
:::

関連付けられたアセットをダブルクリックすると、アセットのタイトルやカスタムフィールドを編集したり、（画像の場合）イメージエディタを起動できる HUD を表示します。

::: tip
You can also upload assets by dragging files directly onto the assets field or modal window.
:::

### インラインのアセット編集

アセットフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、アセットフィールドのデータに基づいた結果をフィルタできます。

::: tip
You can choose which custom fields should be available for your assets from **Settings** → **Assets** → **[Volume Name]** → **Field Layout**.
:::

## テンプレート記法

### アセットフィールドによるエレメントの照会

テンプレート内でアセットフィールドのエレメントを取得する場合、アセットフィールドのハンドルを利用して関連付けられたアセットにアクセスできます。

これは、所定のフィールドで関連付けられたすべてのアセットを出力するよう準備された[アセットクエリ](assets.md#querying-assets)を提供します。

| 値                                                              | 取得するエレメント                                        |
| -------------------------------------------------------------- | ------------------------------------------------ |
| `':empty:'`                                                    | 関連付けられたアセットを持たない。                                |
| `':notempty:'`                                                 | 少なくとも1つの関連付けられたアセットを持つ。                          |
| `100`                                                          | ID が 100 のアセットが関連付けられている。                        |
| `[100, 200]`                                                   | ID が 100 または 200 のアセットが関連付けられている。                |
| `[':empty:', 100, 200]`                                        | ID が 100 と 200 のアセットが関連付けられている。                  |
| `['and', 100, 200]`                                            | アセットに関連付けられている。                                  |
| [AssetQuery](craft3:craft\elements\db\AssetQuery) オブジェクト    | 結果のアセットのいずれかに関連付けられている。                          |
| an [AssetQuery](craft3:craft\elements\db\AssetQuery) object | that are related to any of the resulting assets. |

関連付けられたすべてのアセットをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。
```twig
{# Fetch entries with a related asset #}
{% set entries = craft.entries()
  .myFieldHandle(':notempty:')
  .all() %}
```
```php
// Fetch entries with a related asset
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### アセットフィールドデータの操作

関連付けられた最初のアセットだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

（取得する必要はなく）いずれかの関連付けられたアセットがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you an [asset query](assets.md#querying-assets), prepped to output all the related assets for the given field.

アセットフィールドを含む必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、フィールド値をアセット ID のリストとして、関連付ける順番で送信する必要があります。

例えば、可能なリレーションごとにチェックボックスのリストを作成できます。
```twig
{% set relatedAssets = entry.myFieldHandle.all() %}
{% if relatedAssets|length %}
  <ul>
    {% for rel in relatedAssets %}
      <li><a href="{{ rel.url }}">{{ rel.filename }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedAssets = $entry->myFieldHandle->all();

if (count($relatedAssets)) {
    foreach ($relatedAssets as $rel) {
        // do something with $rel->url and $rel->filename
    }
}
```
:::

::: warning
`asset.url` または `asset.getUrl()` を使用する場合、そのアセットのソースボリュームは「このボリュームのアセットにはパブリック URL が含まれます」が有効で、「ベース URL」がセットされていなければなりません。 さもなければ、結果は常に空になります。 :::
:::

::: tip
ブラウザがフォームをマルチパートリクエストとして送信することを認識できるよう、`<form>` タグに `enctype="multipart/form-data"` をセットすることを忘れないでください。
:::

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
  <p><a href="{{ rel.url }}">{{ rel.filename }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // do something with $rel->url and $rel->filename
}
```
:::

[Asset](craft3:craft\elements\Asset) オブジェクト

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>There are related assets!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // do something with related assets
}
```
:::

アセットクエリで[パラメータ](assets.md#parameters)をセットすることもできます。 例えば、画像だけが返されることを保証するために、[kind](assets.md#kind) パラメータをセットできます。

::: code
```twig
{% set relatedAssets = clone(entry.myFieldHandle)
  .kind('image')
  .all() %}
```
```php
$relatedAssets = (clone $entry->myFieldHandle)
    ->kind('image')
    ->all();
```
:::

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用してアセットクエリのクローンを作成するのは、とても良いアイデアです。 それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。 :::
:::

### 投稿フォームでアセットフィールドを保存

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain an Assets field, you will need to submit your field value as a list of asset IDs in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible asset options #}
{% set possibleAssets = craft.assets()
  .volume('siteAssets')
  .kind('image')
  .orderBy('filename ASC')
  .withTransforms([{ width: 100, height: 100 }])
  .all() %}

{# Get the currently related asset IDs #}
{% set relatedAssetIds = entry is defined
  ? entry.myFieldHandle.ids()
  : [] %}

<ul>
  {% for possibleAsset in possibleAssets %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myFieldHandle][]',
          possibleAsset.id,
          { checked: possibleAsset.id in relatedAssetIds }
        ) }}
        {{ tag('img', { src: possibleAsset.url }) }}
        {{ possibleAsset.getImg({ width: 100, height: 100 }) }}
        {{ possibleAsset.filename }}
      </label>
    </li>
  {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related assets.

#### 新しいアセットの作成

アセットフィールドは、新規ファイルのアップロードにも対応しています。

```twig
{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

::: tip
Don’t forget to set `enctype="multipart/form-data"` on your `<form>` tag so your browser knows to submit the form as a multipart request.
:::

あるいは、アセットフィールドがアップロードファイルをデコードして扱うよう、Base64 エンコードされたファイルデータを送信することもできます。 そのためには、次のようにデータとファイル名の両方を指定しなければなりません。

```twig
{{ hiddenInput(
  'fields[myFieldHandle][data][]',
  'data:image/jpeg;base64,my-base64-data'
) }}
{{ hiddenInput('fields[myFieldHandle][filename][]', 'myFile.ext') }}
```

アセットフィールドには、現在関連付けられているすべてのアセットのリストと、新しいアセットを追加するためのボタンがあります。

You can do this by passing each of the related asset IDs in the field data array, like we are here with hidden form inputs:

```twig{1-8}
{# Provide each existing asset ID in the array of field data #}
{% for relatedAssetId in entry.myFieldHandle.ids() %}
  {{ input(
    'hidden',
    'fields[myFieldHandle][]',
    relatedAssetId
  ) }}
{% endfor %}

{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

## 関連項目

- [アセットクエリ](assets.md#querying-assets)
- <craft3:craft\elements\Asset>
- [リレーション](relations.md)
-