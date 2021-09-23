# 検索

このバーが表示されている場所ならどこでも、エレメントを検索できます。

Control panel users can search for elements anywhere this bar is available:

![検索バー](./images/search-bar.svg)

アセット、カテゴリ、エントリ、ユーザー、および、タグは、それぞれ独自の属性を追加して検索できます。

::: warning
検索はエレメント全体に渡ってコンテンツを素早く照会するための優れた方法ですが、フィールド属性を照会する場合、そのフィールドタイプの[クエリパラメータ](element-queries.md#executing-element-queries)を使用するのが最も正確な方法です。
:::
```twig
{% set results = craft.entries()
  .search('foo')
  .all() %}
```
```graphql
{
  entries(search: "foo") {
    title
  }
}
```
```php
$results = \craft\elements\Entry::find()
    ->search('foo')
    ->all();
```
:::

::: tip
The [`defaultSearchTermOptions`](config3:defaultSearchTermOptions) config setting lets you adjust default search behavior.
:::

## サポートする構文

この場合、返されるすべてのエレメントに `searchScore` 属性がセットされ、それぞれの検索スコアを知ることができます。

| この検索によって                 | こちらのエレメントが見つかるでしょう                         |
| ------------------------ | ------------------------------------------ |
| `salty`                  | 「salty」という単語を含んでいる                         |
| `salty dog`              | 「salty」と「dog」の両方を含んでいる。                    |
| `salty OR dog`           | 「salty」または「dog」のいずれか（または、両方）を含んでいる。        |
| `salty -dog`             | 「salty」を含むが「dog」を含んでいない。                   |
| `"salty dog"`            | 正確なフレーズとして「salty dog」を含んでいる。               |
| `*ty`                    | 「ty」で終わる単語を含んでいる。                          |
| `*alt*`                  | 「alt」を含む単語を含んでいる。                          |
| `body:salty`             | `body` フィールドに「salty」を含む。                   |
| `body:salty body:dog`    | `body` フィールドに「salty」と「dog」の両方を含む。          |
| `body:salty OR body:dog` | `body` フィールドに「salty」または「dog」のいずれかを含む。      |
| `body:salty -body:dog`   | `body` フィールドに「salty」を含むが「dog」を含まない。        |
| `body:"salty dog"`       | `body` フィールドに正確なフレーズとして「salty dog」を含む。     |
| `body:*ty`               | `body` フィールドに「ty」で終わる単語を含む。                |
| `body:*alt*`             | `body` フィールドに「alt」を含む単語を含む。                |
| `body::salty`            | `body` フィールドに「salty」がセットされ、それ以外のものがない。     |
| `body::"salty dog"`      | `body` フィールドに「salty dog」がセットされ、それ以外のものがない。 |
| `body::salty*`           | `body` フィールドが「salty」ではじまる。                 |
| `body::*dog`             | `body` フィールドが「dog」で終わる。                    |
| `body:*`                 | `body` フィールドになんらかの値を含む。                    |
| `-body:*`                | `body` フィールドが空である。                         |

## 特定エレメントの属性を検索する

::: tip
動的な検索結果をリスト化する完全な例については、[検索フォーム](dev/examples/search-form.md)チュートリアルを参照してください。
:::

| Element | Additional Search Attributes                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| アセット    | `filename`<br>`extension`<br>`kind`                                                                 |
| カテゴリ    | `title`<br>`slug`                                                                                         |
| エントリ    | `title`<br>`slug`                                                                                         |
| ユーザー    | `username`<br>`firstname`<br>`lastname`<br>`fullname` (firstname + lastname)<br>`email` |
| タグ      | `title`                                                                                                         |

::: warning
Searching is a great way to quickly query content broadly across elements, but the most precise way to query field attributes is through that field type’s [query parameter](element-queries.md#executing-element-queries).
:::

### スコアによる検索結果の順位付け

If you wanted to search only for Assets that are images, it would look like this in the control panel:

![Searching for image assets in the control panel](./images/search-assets-by-kind.png)

The same search from your code:

::: code
```twig
{% set images = craft.assets()
  .search('kind:image')
  .all() %}
```

```graphql
{
  images: assets(search: "kind:image") {
    title
  }
}
```

```php
$images = \craft\elements\Asset::find()
    ->search('kind:image')
    ->all();
```
:::

If you were to search for Users with email addresses ending in `@craftcms.com`, it would look like this in the control panel:

![Searching for users by email in the control panel](./images/search-users-by-email.png)

The same search from your code:

::: code
```twig
{% set users = craft.users()
  .search('email:@craftcms.com')
  .all() %}
```

```graphql
{
  users(search: "email:@craftcms.com") {
    title
  }
}
```

```php
$images = \craft\elements\User::find()
    ->search('email:@craftcms.com')
    ->all();
```
:::

## テンプレート記法

`craft.assets()`, `craft.entries()`, `craft.tags()`, and `craft.users()` support a `search` parameter you can use to filter their elements by a given search query.

::: code
```twig
{# Get the user’s search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch entries that match the search query #}
{% set results = craft.entries()
  .search(searchQuery)
  .all() %}
```
```php
// Get the user’s search query from the 'q' query string param
$searchQuery = Craft::$app->getRequest()->getParam('q');

// Fetch entries that match the search query
$results = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::

### Ordering Results by Score

検索結果をベストマッチからワーストマッチの順に並び替えたい場合、`orderBy` パラメータに `'score'` をセットすることもできます。

::: code
```twig
{% set results = craft.entries()
  .search('foo')
  .orderBy('score')
  .all() %}
```
```graphql
{
  entries(search: "foo", orderBy: "score") {
    title
  }
}
```
```php
$results = \craft\elements\Entry::find()
    ->search('foo')
    ->orderBy('score')
    ->all();
```
:::

When you do this, each of the elements returned will have a `searchScore` attribute set, which reveals what their search score was.

::: tip
See our [Search Form](https://craftcms.com/knowledge-base/search-form) article for a complete example of listing dynamic search results.
:::

## 検索インデックスの再構築

Each element type makes basic details, called _searchable attributes_, available as search keywords. It’s common to search for entries by title, for example, or for users matching a name or email address. (We just looked at these in the [Searching for Specific Element Attributes](#searching-for-specific-element-attributes) table.)

You can also configure any custom field to make its content available for search by enabling **Use this field’s values as search keywords**:

![Searchable Checkbox](./images/searchable-checkbox.png)

Once enabled, the next time an element is saved that field’s content will be stored as plain-text keywords in Craft’s `searchindex` table and available for search.

::: tip
For Matrix fields, the top-level **Use this field’s values as search keywords** setting determines whether any sub-fields will factor into results for the parent. For relational fields like Assets, Categories, and Entries, the setting determines whether related titles should factor into search results.
:::

## Rebuilding Your Search Indexes

Craft は検索インデックスを可能な限り最新に保つよう、最善を尽くしています。 しかし、その一部を不正確にするかもしれない可能性がいくつかあります。 検索インデックスが最新かつ最高データでないと疑われる場合、コマンド `resave/entries` でエントリを一括再保存することで Craft に再構築させることができます。

```bash
php craft resave/entries --update-search-index
```

`--section` や `--type` オプションを利用して、再保存されるべきエントリを指定できます。 サポートされるオプションのリストは、`resave/entries --help` を参照してください。
