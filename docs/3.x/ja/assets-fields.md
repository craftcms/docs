# アセットフィールド

アセットフィールドでは、[アセット](assets.md)を他のエレメントに関連付けることができます。

## 設定

アセットフィールドの設定は、次の通りです。

- **アップロードを単一のフォルダに限定しますか** – ファイルのアップロード / 関連付けを単一のフォルダに制限するかどうか。

   有効にすると、次の設定が表示されます。

   - **ロケーションをアップロードする** – フィールドに直接ドラッグされたファイルを保存するロケーション。

   無効にすると、次の設定が表示されます。

   - **ソース** – フィールドが、どのアセットボリューム（または、他のアセットインデックスソース）からアセットを関連付けられるか。
   - **既定のアップロードロケーション** – フィールドに直接ドラッグされたファイルを保存するデフォルトのロケーション。

- **許可されるファイルの種類を制限する** 特定の種類のファイルだけをアップロード / 関連付けできるフィールドにするかどうか。
- **リミット** – フィールドに関連付けできるアセット数の上限。（デフォルトは無制限です）
- **モードを見る。** – 投稿者のために、フィールドをどのように表示するか。
- **選択ラベル** – フィールドの選択ボタンのラベルに利用されます。

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **特定のサイトから アセット を関連付けますか？** – 特定のサイトのアセットとの関連付けのみを許可するかどうか。

   有効にすると、サイトを選択するための新しい設定が表示されます。

   無効にすると、関連付けられたアセットは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたアセットの独自のセットを取得するかどうか。

### 動的なサブフォルダパス

「ロケーションをアップロードする」と「既定のアップロードロケーション」設定に定義されるサブフォルダには、オプションで Twig タグ（例：`news/{{ slug }}`）を含めることができます。

ソースエレメント（アセットフィールドを持つエレメント）でサポートされているすべてのプロパティは、ここで利用できます。

::: tip
動的なサブフォルダパスにエントリの ID や UID を含めたい場合、`{id}` や `{uid}` ではなく `{sourceId}` や `{sourceUid}` を利用してください。それによって、下書きではなくソースエントリの ID や UID が利用されます。
:::

::: tip
[行列フィールド](matrix-fields.md)の中にアセットフィールドを作成する場合、ソースエレメントは作成された行列フィールドのエレメント _ではなく_ 行列ブロックになります。

そのため、行列フィールドがエントリに紐づけられていて、動的なサブフォルダパスにエントリ ID を出力したい場合、`id` ではなく `owner.id` を利用します。
:::

## フィールド

アセットフィールドには、現在関連付けられているすべてのアセットのリストと、新しいアセットを追加するためのボタンがあります。

「アセットを追加」ボタンをクリックすると、新しいアセットのアップロードはもちろん、すでに追加されているアセットの検索や選択ができるモーダルウィンドウが表示されます。

::: tip
アセットフィールドやモーダルウィンドウに直接ファイルをドラックして、アップロードすることもできます。
:::

### インラインのアセット編集

関連付けられたアセットをダブルクリックすると、アセットのタイトルやカスタムフィールドを編集したり、（画像の場合）イメージエディタを起動できる HUD を表示します。

::: tip
アセットで使用するカスタムフィールドは、「設定 > アセット > [ボリューム名] > フィールドレイアウト」から選択できます。
:::

## テンプレート記法

### アセットフィールドによるエレメントの照会

アセットフィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、アセットフィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `':empty:'` | 関連付けられたアセットを持たない。
| `':notempty:'` | 少なくとも1つの関連付けられたアセットを持つ。
| `100` | ID が 100 のアセットが関連付けられている。
| `[100, 200]` | ID が 100 または 200 のアセットが関連付けられている。
| `['and', 100, 200]` | ID が 100 と 200 のアセットが関連付けられている。
| [Asset](craft3:craft\elements\Asset) オブジェクト | アセットに関連付けられている。
| [AssetQuery](craft3:craft\elements\db\AssetQuery) オブジェクト | 結果のアセットのいずれかに関連付けられている。

```twig
{# Fetch entries with a related asset #}
{% set entries = craft.entries()
    .myFieldHandle(':notempty:')
    .all() %}
```

### アセットフィールドデータの操作

テンプレート内でアセットフィールドのエレメントを取得する場合、アセットフィールドのハンドルを利用して関連付けられたアセットにアクセスできます。

```twig
{% set query = entry.myFieldHandle %}
```

これは、所定のフィールドで関連付けられたすべてのアセットを出力するよう準備された[アセットクエリ](assets.md#querying-assets)を提供します。

関連付けられたすべてのアセットをループするには、[all()](craft3:craft\db\Query::all()) を呼び出して、結果をループ処理します。

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
`asset.url` または `asset.getUrl()` を使用する場合、そのアセットのソースボリュームは「このボリュームのアセットにはパブリック URL が含まれます」が有効で、「ベース URL」がセットされていなければなりません。さもなければ、結果は常に空になります。
:::

関連付けられた最初のアセットだけが欲しい場合、代わりに [one()](craft3:craft\db\Query::one()) を呼び出して、何かが返されていることを確認します。

```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.filename }}</a></p>
{% endif %}
```

（取得する必要はなく）いずれかの関連付けられたアセットがあるかを確認したい場合、[exists()](craft3:craft\db\Query::exists()) を呼び出すことができます。

```twig
{% if entry.myFieldHandle.exists() %}
    <p>There are related assets!</p>
{% endif %}
```

アセットクエリで[パラメータ](assets.md#parameters)をセットすることもできます。例えば、画像だけが返されることを保証するために、[kind](assets.md#kind) パラメータをセットできます。

```twig
{% set relatedAssets = clone(entry.myFieldHandle)
    .kind('image')
    .all() %}
```

::: tip
パラメータを調整する前に [clone()](./dev/functions.md#clone) ファンクションを利用してアセットクエリのクローンを作成するのは、とても良いアイデアです。それによって、テンプレートの後半でパラメータが予期しない結果をもたらすことはありません。
:::

### 投稿フォームでアセットフィールドを保存

アセットフィールドを含む必要がある[投稿フォーム](dev/examples/entry-form.md)がある場合、フィールド値をアセット ID のリストとして、関連付ける順番で送信する必要があります。

例えば、可能なリレーションごとにチェックボックスのリストを作成できます。

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

チェックボックスのリストをソート可能にすれば、ユーザーが関連付けられたアセットの順序をコントロールできるようになります。

#### 新しいアセットの作成

アセットフィールドは、新規ファイルのアップロードにも対応しています。

```twig
{{ input('file', 'fields[myFieldHandle][]', options={
  multiple: true,
}) }}
```

::: tip
ブラウザがフォームをマルチパートリクエストとして送信することを認識できるよう、`<form>` タグに `enctype="multipart/form-data"` をセットすることを忘れないでください。
:::

あるいは、アセットフィールドがアップロードファイルをデコードして扱うよう、Base64 エンコードされたファイルデータを送信することもできます。そのためには、次のようにデータとファイル名の両方を指定しなければなりません。

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
* [Relations](relations.md)
