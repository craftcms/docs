# アセットフィールド

アセットフィールドでは、[アセット](assets.md)を他のエレメントに関連付けることができます。

## 設定

アセットフィールドの設定は、次の通りです。

- ** – ファイルのアップロード / 関連付けを単一のフォルダに制限するかどうか。

  有効にすると、次の設定が表示されます。

  - **Upload Location** – The location that files dragged directly onto the field should be saved in.

  If disabled, the following settings will be visible:

  - **Sources** – Which asset volumes (or other asset index sources) the field should be able to relate assets from.
  - **Default Upload Location** – The default location that files dragged directly onto the field should be saved in.

- **許可されるファイルの種類を制限しますか？ ** 特定の種類のファイルだけをアップロード / 関連付けできるフィールドにするかどうか。
- **Limit** – The maximum number of assets that can be related with the field at once. (Default is no limit.)
- **View Mode** – How the field should appear for authors.
- **Selection Label** – The label that should be used on the field’s selection button.

### マルチサイト設定

On multi-site installs, the following settings will also be available (under **Advanced**):

- **特定のサイトから アセット を関連付けますか?** – 特定のサイトのアセットとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたアセットは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたアセットの独自のセットを取得するかどうか。

### 動的なサブフォルダパス

Subfolder paths defined by the **Upload Location** and **Default Upload Location** settings can optionally contain Twig tags (e.g. `news/{{ slug }}`).

ソースエレメント（アセットフィールドを持つエレメント）でサポートされているすべてのプロパティは、ここで使用できます。

::: tip
If you want to include the entry’s ID or UID in a dynamic subfolder path, use `{sourceId}` or `{sourceUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the revision / draft’s.
:::

そのため、行列フィールドがエントリに紐づけられていて、動的なサブフォルダパスにエントリ ID を出力したい場合、`id` ではなく `owner.id` を使用します。
:::

So if your Matrix field is attached to an entry, and you want to output the entry ID in your dynamic subfolder path, use `owner.id` rather than `id`.
:::

::: warning
If the rendered subfolder path ends up blank, or contains a leading or trailing forward slash (e.g. `foo/`) or an empty segment (e.g. `foo//bar`), Craft will interpret that as a sign that a variable in the subfolder template couldn’t be resolved successfully, and the path will be considered invalid. If you are intentionally outputting a blank segment, output `:ignore:`. For example, if you want to output the first selected category, or nothing if there isn’t one, do this:

```twig
{{ categoriesFieldHandle.one().slug ?? ':ignore:' }}
```
:::

## フィールド

Assets fields list all the currently-related assets, with a button to select new ones.

Choosing **Add an asset** will bring up a modal window where you can find and select additional assets, as well as upload new ones.

::: tip
You can also upload assets by dragging files directly onto the assets field or modal window.
:::

### インラインのアセット編集

When you double-click on a related asset, a HUD will appear where you can edit the asset’s title and custom fields, and launch the Image Editor (if it’s an image).

::: tip
You can choose which custom fields should be available for your assets from **Settings** → **Assets** → **[Volume Name]** → **Field Layout**.
:::

## Development

### アセットフィールドによるエレメントの照会

When [querying for elements](element-queries.md) that have an Assets field, you can filter the results based on the Assets field data using a query param named after your field’s handle.

Possible values include:

| 値                                                              | 取得するエレメント                                               |
| -------------------------------------------------------------- | ------------------------------------------------------- |
| `':empty:'`                                                    | 関連付けられたアセットを持たない。                                       |
| `':notempty:'`                                                 | 少なくとも1つの関連付けられたアセットを持つ。                                 |
| `100`                                                          | that are related to the asset with an ID of 100.        |
| `[100, 200]`                                                   | that are related to an asset with an ID of 100 or 200.  |
| `['and', 100, 200]`                                            | that are related to the assets with IDs of 100 and 200. |
| an [Asset](craft3:craft\elements\Asset) object               | that are related to the asset.                          |
| an [AssetQuery](craft3:craft\elements\db\AssetQuery) object | that are related to any of the resulting assets.        |

::: code
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

If you have an element with an Assets field in your template, you can access its related assets using your Assets field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you an [asset query](assets.md#querying-assets), prepped to output all the related assets for the given field.

To loop through all the related assets, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

::: code
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
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have **Assets in this volume have public URLs** enabled and a **Base URL** setting. Otherwise, the result will always be empty.
:::

If you only want the first related asset, call [one()](craft3:craft\db\Query::one()) instead and make sure it returned something:

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

If you need to check for related assets without fetching them, you can call [exists()](craft3:craft\db\Query::exists()):

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

You can set [parameters](assets.md#parameters) on the asset query as well. For example, to ensure that only images are returned, you can set the [kind](assets.md#kind) param:

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
It’s always a good idea to clone the asset query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Assets Fields

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

#### Creating New Assets

Assets fields can handle new file uploads as well:

```twig
{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

::: tip
Don’t forget to set `enctype="multipart/form-data"` on your `<form>` tag so your browser knows to submit the form as a multipart request.
:::

Alternatively, you can submit Base64-encoded file data, which the Assets field will decode and treat as an uploaded file. To do that, you have to specify both the data and the filename like this:

```twig
{{ hiddenInput(
    'fields[myFieldHandle][data][]',
    'data:image/jpeg;base64,my-base64-data'
) }}
{{ hiddenInput('fields[myFieldHandle][filename][]', 'myFile.ext') }}
```

## 関連項目

* [アセットクエリ](assets.md#querying-assets)
* <craft3:craft\elements\Asset>
* [リレーション](relations.md)
