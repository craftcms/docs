# フィールド

サイトのすべてのコンテンツはフィールドに入力されます。

フィールドは「設定 > フィールド」からグローバルに定義されます。 それらは、便宜上フィールドグループ内に整理されていますが、フィールドグループはシステムの他の場所との関連性をほとんど持ちません。

すべてのフィールドはいくつかの共通の設定があります。

- 所属するフィールドグループ
- 名前
- ハンドル
- 説明
- **Field Type** – What type of field it is

![フィールドの設定画面](./images/fields-field-settings.png)

## 翻訳可能なフィールド

Craft で多言語サイトを運用している場合、フィールドを翻訳可能にするオプションがあります。

Craft は5つの異なる「翻訳メソッド」を提供します。

* [Assets](assets-fields.md)
* [Categories](categories-fields.md)
* [Checkboxes](checkboxes-fields.md)
* [Color](color-fields.md)
* [Date/Time](date-time-fields.md)
* [Dropdown](dropdown-fields.md)
* Email
* [Entries](entries-fields.md)
* [Lightswitch](lightswitch-fields.md)
* [Matrix](matrix-fields.md)
* [Multi-select](multi-select-fields.md)
* [Number](number-fields.md)
* [Plain Text](plain-text-fields.md)
* [Radio Buttons](radio-buttons-fields.md)
* [Table](table-fields.md)
* [Tags](tags-fields.md)
* URL
* [Users](users-fields.md)

## フィールドタイプ

フィールドが「翻訳不可」とマークされている場合、その値はすべてのサイトに渡って常にコピーされます。

Fields can have the following translation method:

- **Not translatable** – The field will have the same value across all sites.
- **Translate for each site** – The field can have a different value for each site.
- **Translate for each site group** – The field can have a different value for each site group.
- **Translate for each language** – The field can have a different value for each unique language associated with your sites.
- **Custom… ** – The field can have different values based on a custom differentiator.

If you choose “Custom…”, a “Translation Key Format” setting will appear below, where you can define a template that will help Craft which sites to copy the field value over to. フィールドのカスタム「翻訳キー」フォーマットを定義することができ、フィールド値は同じキーを生成するすべてのサイトにコピーされます。

Craft は次の組み込みのフィールドタイプがあります。

## フィールドレイアウト

フィールドを作成すると、「フィールドレイアウト」にそれらを加えることによって編集フォームに表示させることができます。

関連するコンテンツを持つ Craft 内のすべての場所で、フィールドを選択するためのフィールドレイアウトを提供します。

* [エントリ](sections-and-entries.md)は、「設定 > セクション > 入力タイプ > [入力タイプ名] > フィールドレイアウト」の入力タイプごとに定義されたフィールドレイアウトを使用します。
* [グローバル設定](globals.md)は、「設定 > グローバル > [グローバル設定名] > フィールドレイアウト」で定義されたそれぞれのフィールドレイアウトを使用します。
* [アセット](assets.md)は、「設定 > アセット > [アセットボリューム名] > フィールドレイアウト」のアセットボリュームごとに定義されたフィールドレイアウトを使用します。
* [カテゴリ](categories.md)は、「設定 > カテゴリ → [カテゴリグループ名] > フィールドレイアウト」のカテゴリグループごとに定義されたフィールドレイアウトを使用します。
* [タグ](tags.md)は、 「設定 > タグ > [タググループ名] > フィールドレイアウト」のタググループごとに定義されたフィールドレイアウトを使用します。
* [ユーザー](users.md)は、「設定 > ユーザー > フィールド」で定義された単一のフィールドレイアウトを共有します。

フィールドレイアウトを編集すると、一番上に「コンテンツ」タブが、下段にフィールドグループごとに分類されたすべてのサイトのフィールドのリストが表示されます。 フィールドの選択は下のエリアから上にドラッグするだけの簡単な操作で、すでに配置されたフィールドの前後の好きな場所に配置できます。 選択されたフィールドをドラッグして、順序を入れ替えることもできます。

フィールドが選択されると、歯車アイコンが横に表示されます。 クリックすると2つのオプションを含むコンテキストメニューを表示します。

* 必須にする
* 削除

「必須にする」をクリックすると、フィールド名の横にアスタリスク（`*`）が追加され、必須項目になったことを示します。 それ以降、歯車アイコンをクリックすると、期待通り「必須にしない」オプションを表示します。

入力タイプのフィールドレイアウトには別の機能があり、フィールドを含むコンテンツタブを定義できます。 必要数のコンテンツタブを作成し、類似するフィールドをまとめて分類するために利用します。 各コンテンツタブには歯車アイコンが表示され、リネームや削除ができます。
