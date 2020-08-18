# 検索

このバーが表示されている場所ならどこでも、エレメントを検索できます。

![検索バー](./images/searching-search-bar.png)

## サポートする構文

Craft は次の検索構文をサポートしています。

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

アセット、カテゴリ、エントリ、ユーザー、および、タグは、それぞれ独自の属性を追加して検索することができます。

* **アセット**

  * filename
  * extension
  * kind

* **カテゴリ**

  * title
  * slug

* **エントリ**

  * title
  * slug

* **ユーザー**

  * ユーザー名
  * firstName
  * lastName
  * fullName (firstName + lastName)
  * メール

* **タグ**

  * title


::: warning
Searching is a great way to quickly query content broadly across elements, but if you’re querying field attributes the most precise way is through that field type’s [query parameter](element-queries.md#executing-element-queries).
:::

## テンプレート記法

検索結果をベストマッチからワーストマッチの順に並び替えたい場合、`orderBy` パラメータに `'score'` をセットすることもできます。

```twig
{# Get the user's search query from the 'q' query-string param #}
{% set searchQuery = craft.app.request.getParam('q') %}

{# Fetch entries that match the search query #}
{% set results = craft.entries()
    .search(searchQuery)
    .all() %}
```

### スコアによる検索結果の順位付け

この場合、返されるすべてのエレメントに `searchScore` 属性がセットされ、それぞれの検索スコアを知ることができます。

```twig
{% set results = craft.entries()
    .search(searchQuery)
    .orderBy('score')
    .all() %}
```

::: tip
動的な検索結果をリスト化する完全な例については、[検索フォーム](dev/examples/search-form.md)チュートリアルを参照してください。
:::

::: tip
See our [Search Form](dev/examples/search-form.md) tutorial for a complete example of listing dynamic search results.
:::

## 検索インデックスの再構築

Craft は検索インデックスを可能な限り最新に保つよう、最善を尽くしています。 しかし、その一部を不正確にするかもしれない可能性がいくつかあります。 検索インデックスが最新かつ最高データでないと疑われる場合、設定にある検索インデックスの再構築ツールで Craft に再構築させることができます。

```bash
php craft resave/entries --update-search-index
```

You can specify which entries should be resaved with the `--section` and `--type` options, among others. Run `resave/entries --help` to see a full list of supported options.
