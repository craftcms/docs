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

マルチサイトがインストールされている場合、次の設定も有効になります。 （「高度」のトグルボタンで表示されます）

- **特定のサイトから アセット を関連付けますか?** – 特定のサイトのアセットとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたアセットは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたアセットの独自のセットを取得するかどうか。

### 動的なサブフォルダパス

「ロケーションをアップロードする」と「既定のアップロードロケーション」設定に定義されるサブフォルダには、オプションで Twig タグ（例：`news/{{ slug }}`）を含めることができます。

ソースエレメント（アセットフィールドを持つエレメント）でサポートされているすべてのプロパティは、ここで使用できます。

::: tip
If you want to include the entry’s ID or UID in a dynamic subfolder path, use `{sourceId}` or `{sourceUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the revision / draft’s.
:::

そのため、行列フィールドがエントリに紐づけられていて、動的なサブフォルダパスにエントリ ID を出力したい場合、`id` ではなく `owner.id` を使用します。
:::

So if your Matrix field is attached to an entry, and you want to output the entry ID in your dynamic subfolder path, use `owner.id` rather than `id`.
:::

## フィールド

「アセットを追加」ボタンをクリックすると、新しいアセットのアップロードはもちろん、すでに追加されているアセットの検索や選択ができるモーダルウィンドウが表示されます。

関連付けられたアセットをダブルクリックすると、アセットのタイトルやカスタムフィールドを編集したり、（画像の場合）イメージエディタを起動できる HUD を表示します。

::: tip
You can also upload assets by dragging files directly onto the assets field or modal window.
:::

### インラインのアセット編集

アセットフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを使用して、アセットフィールドのデータに基づいた結果をフィルタできます。

::: tip
アセットで使用するカスタムフィールドは、「設定 > アセット > [ボリューム名] > フィールドレイアウト」から選択できます。
:::

## テンプレート記法

### アセットフィールドによるエレメントの照会

テンプレート内でアセットフィールドのエレメントを取得する場合、アセットフィールドのハンドルを利用して関連付けられたアセットにアクセスできます。

これは、所定のフィールドで関連付けられたすべてのアセットを出力するよう準備された[アセットクエリ](assets.md#querying-assets)を提供します。

| 値                                                              | 取得するエレメント                                               |
| -------------------------------------------------------------- | ------------------------------------------------------- |
| `':empty:'`                                                    | 関連付けられたアセットを持たない。                                       |
| `':notempty:'`                                                 | 少なくとも1つの関連付けられたアセットを持つ。                                 |
| `100`                                                          | that are related to the asset with an ID of 100.        |
| `[100, 200]`                                                   | that are related to an asset with an ID of 100 or 200.  |
| `['and', 100, 200]`                                            | that are related to the assets with IDs of 100 and 200. |
| an [Asset](craft3:craft\elements\Asset) object               | that are related to the asset.                          |
| an [AssetQuery](craft3:craft\elements\db\AssetQuery) object | that are related to any of the resulting assets.        |

```twig
{# Fetch entries with a related asset #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### アセットフィールドデータの操作

関連付けられたすべてのアセットをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

```twig
{% set query = entry.myFieldHandle %}
```

関連付けられた最初のアセットだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

（取得する必要はなく）いずれかの関連付けられたアセットがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

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

::: warning
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have “Assets in this volume have public URLs” enabled and a “Base URL” setting. Otherwise, the result will always be empty.
:::

フロントエンドの[投稿フォーム](dev/examples/entry-form.md)から、アセットフィールドへのファイルアップロードをユーザーに許可するには、2つの調整が必要です。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.filename }}</a></p>
{% endif %}
```

まず、`<form>` タグに `enctype="multipart/form-data"` 属性があることを確認して、ファイルをアップロードできるようにします。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related assets!</p>
{% endif %}
```

アセットクエリで[パラメータ](assets.md#parameters)をセットすることもできます。 例えば、画像だけが返されることを保証するために、[kind](assets.md#kind) パラメータをセットできます。

```twig
{% set relatedAssets = clone(entry.myFieldHandle)
    .kind('image')
    .all() %}
```

::: tip
It’s always a good idea to clone the asset query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### フロントエンドの投稿フォームからのファイルアップロード

複数ファイルをアップロードできるようにする場合、`multiple` 属性を追加し、input 名の末尾に `[]` を追加します。

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
<input type="file" name="fields[myFieldHandle]">
```

::: tip
Don’t forget to set `enctype="multipart/form-data"` on your `<form>` tag so your browser knows to submit the form as a multipart request.
:::

Alternatively, you can submit Base64-encoded file data, which the Assets field will decode and treat as an uploaded file. To do that, you have to specify both the data and the filename like this:

```twig
<input type="file" name="fields[<FieldHanlde>][]" multiple>
```

## 関連項目

* [アセットクエリ](assets.md#querying-assets)
* <craft3:craft\elements\Asset>
* [リレーション](relations.md)
