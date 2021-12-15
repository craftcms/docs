# フィールド

サイトのすべてのコンテンツはフィールドに入力されます。

Fields are defined globally from **Settings** → **Fields**. それらは、便宜上フィールドグループ内に整理されていますが、フィールドグループはシステムの他の場所との関連性をほとんど持ちません。

すべてのフィールドはいくつかの共通の設定があります。

- 所属するフィールドグループ
- 名前
- ハンドル
- 説明
- **フィールドタイプ** – フィールドの種類

<BrowserShot url="https://mysite.test/admin/settings/fields/new" :link="false" :max-height="500">
<img src="./images/fields-field-settings.png">
</BrowserShot>

## 翻訳可能なフィールド

Choosing a field type determines what the field’s input UI is going to look like, what type of data it can store, and how you’ll be able to interact with that data from your templates.

Craft comes with the following built-in field types:

- [アセット](assets-fields.md)
- [カテゴリ](categories-fields.md)
- [チェックボックス](checkboxes-fields.md)
- [色](color-fields.md)
- [日/時](date-time-fields.md)
- [セレクトボックス](dropdown-fields.md)
- [Email](email-fields.md)
- [エントリ](entries-fields.md)
- [Lightswitch](lightswitch-fields.md)
- [行列](matrix-fields.md)
- [マルチセレクトボックス](multi-select-fields.md)
- [数字](number-fields.md)
- [プレーンテキスト](plain-text-fields.md)
- [ラジオボタン](radio-buttons-fields.md)
- [テーブル](table-fields.md)
- [タグ](tags-fields.md)
- [Time](time-fields.md)
- [URL](url-fields.md)
- [ユーザー](users-fields.md)

## フィールドタイプ

If you’re running a multi-site Craft installation, most of your fields will have a “Translation Method” setting (depending on their type).

Fields can have the following translation method:

- **翻訳不可** – フィールドはすべてのサイトに渡って同じ値を持ちます。
- **各サイトに対して翻訳** – フィールドはサイトごとに異なる値を持つことができます。
- **各サイトグループに対して翻訳** – フィールドはサイトグループごとに異なる値を持つことができます。
- **各言語に対して翻訳** – フィールドはサイトに関連付けられた固有の言語ごとに異なる値を持つことができます。
- **Custom… ** – The field can have different values based on a custom differentiator.

If you choose “Custom…”, a “Translation Key Format” setting will appear below, where you can define a template that will help Craft which sites to copy the field value over to. When a new field value is saved, Craft will render this template for all sites, and the field value will be copied to all sites where the translation key matches the original site’s.

For example, if a field’s translation key format were `{site.handle[0:2]}`, then new field values would be copied over to any other sites where the first two characters of the site handle matches the first to characters of the original site’s handle.

If the translation key format returns an empty string (`''`), the field will not indicate that it’s available for translation. A key format of `{section.handle == 'blog' ? site.handle : ''}`, for example, would display its field as translatable per site from _only_ the `blog` section—otherwise it would not be available for translation in any other context.

## フィールドレイアウト

Once you’ve created your fields, you can display them in your edit forms by adding them to “field layouts”.

Everything in Craft that has content associated with it will provide a field layout for selecting fields:

- [エントリ](entries.md)は、「設定 > セクション > エントリタイプを編集 > [入力タイプ名] > フィールドレイアウト」の入力タイプで定義されたフィールドレイアウトを使用します。
- [グローバル設定](globals.md)は、「設定 > グローバル > [グローバル設定の名前]」で定義されたそれぞれのフィールドレイアウトを使用します。
- [アセット](assets.md)は、「設定 > アセット > [アセットボリューム名] > フィールドレイアウト」のアセットボリュームごとに定義されたフィールドレイアウトを使用します。
- [カテゴリ](categories.md)は、「設定 > カテゴリ > [カテゴリグループ名] > フィールドレイアウト」のカテゴリグループごとに定義されたフィールドレイアウトを使用します。
- [タグ](tags.md)は、「設定 > タグ > [タググループ名] > フィールドレイアウト」のタググループごとに定義されたフィールドレイアウトを使用します。
- [ユーザー](users.md)は、「設定 > ユーザー > フィールド」で定義された単一のフィールドレイアウトを共有します。

When editing a field layout, you will find a “Content” tab at the top, and a list of all of your site’s fields, grouped into their field groups, at the bottom. Selecting a field is as simple as dragging it from the bottom area to the top, positioning it wherever you want alongside the other selected fields. You can also drag selected fields around to change their order.

Once a field is selected, a gear icon (<icon kind="settings" />) will appear beside it. Pressing it will reveal a context menu with two options:

- 必須にする
- 削除

Clicking “Make required” will add an asterisk (`*`) beside the field’s name, indicating that it’s now required. Subsequent gear icon clicks will reveal a new “Make not required” option which does as you’d expect.

Field layouts for entry types have another feature: they let you define the content tabs that contain the fields. You can create as many content tabs as you want, and use them to organize similar fields together. Each content tab will get its own gear icon allowing you to rename or delete it.
