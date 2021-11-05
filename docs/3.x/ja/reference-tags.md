# リファレンスタグ

リファレンスタグを利用して、サイト内の様々なエレメントへの参照を作成できます。 テーブルフィールド内のテキストセルを含む、あらゆるテキストフィールドで使用できます。

リファレンスタグの構文は、次のようになります。

```twig
{<Type>:<Identifier>:<Property>}
```

ご覧の通り、それらは3つのセグメントで構成されています。

1.  `<Type>` – 参照を作成するエレメントのタイプ。 これは完全修飾のエレメントクラス名（例：`craft\elements\Entry`）、または、エレメントタイプの「リファレンスハンドル」です。

    コアのエレメントタイプは、次のリファレンスハンドルを持っています。

    - `entry`
    - `asset`
    - `tag`
    - `user`
    - `globalset`

2.  `<Identifier>` – エレメントの ID、または、エレメントタイプによってサポートされているカスタム識別子。

    Entries support the following custom identifier:

    - `sectionHandle/entry-slug`

    Identifiers can also include the site ID, UUID, or handle that the element should be loaded from, using an `@<Site>` syntax.

3.  `<Property>` _（オプション）_ – リファレンスタグが返すべきエレメントのプロパティ。 省略した場合、エレメントの URL が返されます。

    利用可能なプロパティのリストは、エレメントタイプのクラスリファレンスを参照してください。

    - [craft\elements\Entry](craft3:craft\elements\Entry#public-properties)
    - [craft\elements\Asset](craft3:craft\elements\Asset#public-properties)
    - [craft\elements\Tag](craft3:craft\elements\Tag#public-properties)
    - [craft\elements\User](craft3:craft\elements\User#public-properties)
    - [craft\elements\GlobalSet](craft3:craft\elements\GlobalSet#public-properties)

    カスタムフィールドのハンドルもサポートされています。 フィールドタイプは文字列として表すことができる値を持っています。

### 実例

有効なリファレンスタグは、次の通りです。

- `{asset:123:filename}` – ID が `123` のアセットのファイル名を（<craft3:craft\elements\Asset::getFilename()> 経由で）返します。
- `{entry:blog/whats-on-tap}` – returns the URL of an entry in a `blog` section with the slug `whats-on-tap`.
- `{entry:blog/whats-on-tap@en:intro}` – returns the value of an `intro` custom field on a `blog` section entry with the slug `whats-on-tap`, loaded from the site with the handle `en`.
- `{craft\commerce\Variant:123:price}` – returns the price of a Commerce Variant object with the id of `123`.
- `{globalset:aGlobalSet:uid}` – returns the UID of a global set with the handle `aGlobalSet`.

## リファレンスタグの解析

[parseRefs](dev/filters.md#parserefs) フィルタを利用して、テンプレート内のリファレンスタグの文字列を解析できます。

```twig
{{ entry.body|parseRefs|raw }}
```
