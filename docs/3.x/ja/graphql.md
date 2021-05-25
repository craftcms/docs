---
keywords: headless
---

# GraphQL API <badge type="edition" vertical="middle" title="Craft は、異なる GraphQL タイプによって実装される、いくつかのインターフェースを定義しています。">draftOf</badge>

Craft Pro は、コンテンツのための自動生成された[GraphQL](https://graphql.org) API を提供します。 これをクエリして、シングルページアプリケーション（SPA）や静的サイトジェネレーターなど、別のアプリケーションに取り込むことができます。

## クエリとレスポンスの実例

はじめに、Craft Pro 3.3 以降を稼働し、さらに、[`enableGql` 設定](config3:enableGql) が `false` にセットされていないことを確認してください。

GraphQL API の探索を開始する最も簡単な方法は、組み込みの [GraphiQL](https://github.com/graphql/graphiql) IDE を使うことです。 これは、コントロールパネルの「GraphQL > GraphiQL」から利用できます。 Querying from the control panel gives you full access to data that’s available, unlike queries from the outside that require [an endpoint and appropriate permissions](#setting-up-your-api-endpoint).

## はじめよう

### クエリのペイロード

Here’s what a [query](#query-reference) for two news entries might look like, complete with a formatted `dateCreated` and custom-transformed `featureImage`:

エンドポイントが正しく設定されていることを確認するには、`{ping}` クエリを送信してみてください。
```graphql GraphQL
{
  entries (section: "news", limit: 2, orderBy: "dateCreated DESC") {
    dateCreated @formatDateTime (format: "Y-m-d")
    title
    children {
      title
    }
    ... on news_article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300, immediately: true)
      }
    }
  }
}
```
```json JSON Response
{
  "data": {
    "entries": [
      {
        "dateCreated": "2019-08-21",
        "title": "An important news item",
        "children": [],
        "shortDescription": "<p>This is how we roll these days.</p>",
        "featuredImage": [
          {
            "url": "/assets/site/_300xAUTO_crop_center-center_none/glasses.jpg"
          }
        ]
      },
      {
        "dateCreated": "2019-07-02",
        "title": "Dolorem ea eveniet alias",
        "children": [
          {
            "title": "Child entry"
          },
          {
            "title": "This is also a child entry"
          }
        ],
        "shortDescription": "Et omnis explicabo iusto eum nobis. Consequatur debitis architecto est exercitationem vitae velit repellendus. Aut consequatur maiores error ducimus ea et. Rem ipsa asperiores eius quas et omnis. Veniam quasi qui repellendus dignissimos et necessitatibus. Aut a illo tempora.",
        "featuredImage": []
      }
    ]
  }
}
```
:::

### クエリとレスポンスの実例

次の JSON レスポンスが返される場合、GraphQL API は稼働しています！

::: code
```graphql GraphQL
mutation saveEntry($title: String, $slug: String) {
  save_news_article_Entry(title: $title, slug: $slug) {
    title
    slug
    dateCreated @formatDateTime (format: "Y-m-d")
  }
}

# query variables:
{
  "title": "Craft 3.5 Supports GraphQL Mutations",
  "slug": "craft-graphql-mutations"
}
```
```json JSON Response
Craft は GraphQL の結果のキャッシュをデフォルトで有効にしていますが、コンフィグ設定 <a href="https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#enablegraphqlcaching">enableGraphQlCaching</a> で無効にできます。
```
:::

## API リクエストの送信

By default, none of your content is available outside of Craft via GraphQL. In order to send GraphQL queries to Craft, we need to establish an endpoint for receiving them and an appropriate set of permissions with a token.

### API エンドポイントの作成

プロジェクトに GraphQL API を追加するための最初のステップは、パブリックエンドポイントを設定することです。

そのためには、`config/routes.php` から `graphql/api` コントローラーアクションを指す [URL ルール](routing.md#advanced-routing-with-url-rules)を作成します。 例えば、次の URL ルールは `/api` リクエストを GraphQL API にルーティングします。

```php
return [
    'api' => 'graphql/api',
    // ...
];
```

::: tip
Craft sets an `access-control-allow-origin: *` header by default on GraphQL responses; consider limiting that for security using the <config3:allowedGraphqlOrigins> setting.
:::

別の GraphQL IDE も利用できます。

```bash
curl -H "Content-Type: application/graphql" -d '{ping}' http://my-project.test/api
```

::: tip
はじめて API を探索する場合、利用可能なスキーマ全体について IDE が情報を得られるように、[Dev Mode](config3:devMode) が有効になっているか確認してください。
:::

```json
{"data":{"ping":"pong"}}
```

（`http://my-project.test/api` を実際のエンドポイントの URL に置き換えてください。
:::

### スキーマの定義

GraphQL API エンドポイントを作成したら、そこからどのコンテンツを利用可能にするかを Craft に伝える必要があります。 ） そのために、**スキーマ**を定義します。

Craft has two types of schemas:

1. **公開スキーマ**は、利用可能な公開コンテンツを定義します。
2. それぞれに独自のシークレット**アクセストークン**を持つ、複数のプライベートスキーマを定義することもできます。

::: tip
GraphQL API リクエストを実行すると、指定されたトークン（があれば、それ）に基づいて、スキーマが自動的に決定されます。 Craft with otherwise use a valid token to determine the relevant schema.

スキーマは、コントロールパネルの「GraphQL > スキーマ」から管理できます。 スキーマごとのスコープを定義することに加えて、有効期限日を指定したり、無効にしたりすることもできます。

## キャッシング

### GraphiQL IDE を利用

`GET` リクエストを利用し、GraphQL クエリを `query` パラメータで定義します。

![組み込みの GraphiQL IDE](./images/graphiql.png)

::: tip
The included GraphiQL IDE preselects a special “Full Schema” option for optimal exploration. You can change the applied schema from its dropdown menu.

![GraphQL SDL では、次のようになります。](./images/graphiql-full-schema.png)
:::

### 別の IDE を利用

Additional GraphQL IDEs are available as well:

* [Insomnia](https://insomnia.rest/)
* [GraphQL Playground](https://github.com/prisma/graphql-playground)
* [GraphQL Playground online](https://www.graphqlbin.com/v2/new)

このクエリはエントリの照会で利用されます。 <config3:devMode> is enabled so the IDE can be informed about the entire schema available to it.
:::

### リクエストを手動で送信

GraphQL API は3つの方法で照会できます。

1. `application/json` コンテンツタイプの `POST` リクエストを利用し、GraphQL クエリを `query` キーで定義します。
  ```bash
  curl \
     --data-urlencode "query={ping}" \
     http://craft32.test/api
   # or
   curl http://craft32.test/api?query=%7Bping%7D
  ```
2. `application/graphql` コンテンツタイプの `POST` リクエストを利用し、GraphQL クエリを生のリクエストボディで定義します。
  ```bash
  curl \
     -H "Content-Type: application/json" \
     -d '{"query":"{ping}"}' \
     http://my-project.test/api
  ```
3. クエリと一緒に [variables](https://graphql.org/learn/queries/#variables) を指定する必要がある場合、`application/json` コンテンツタイプの `POST` リクエストとしてリクエスト送信し、`query` と一緒に JSON 本体に `variables` キーを含めなければいけません。
  ```bash
  curl \
     -H "Content-Type: application/graphql" \
     -d '{ping}' \
     http://my-project.test/api
  ```

#### 変数の指定

If you need to specify any [variables](https://graphql.org/learn/queries/#variables) along with your query, then you must send request as a `POST` request with an `application/json` content type, and include a `variables` key in the JSON body alongside `query`.

```bash
curl \
  -H "Content-Type: application/json" \
  -d '{
        "query": "query($id:[Int]) { entries(id: $id) { id, title } }",
        "variables": { "id": [1, 2, 3] }
      }' \
  http://my-project.test/api
```

#### プライベートスキーマの照会

デフォルトでは、公開スキーマが使用されます。 別の[スキーマ](#define-your-schemas)に対してクエリを実行するには、`Authorization` ヘッダーを利用してアクセストークンを渡します。

```bash
curl \
  -H "Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/graphql" \
  -d '{entries{id}}' \
  http://my-project.test/api
```

::: warning
If you’re unable to query a private schema because of a “missing authorization header”, make sure Craft received it from the web server with a quick post to a test template:

```twig
{{ craft.app.getRequest().getHeaders().has('authorization') ?
    'auth token present ✓' : 
    'auth token missing!' }}
```

Apache strips `Authorization` headers by default, which can be fixed by enabling [CGIPassAuth](https://httpd.apache.org/docs/2.4/en/mod/core.html#cgipassauth) or adding the following to your `.htaccess` file:

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```
:::

## インターフェースの実装

すべてのクエリ結果はキャッシュされるため、繰り返されたクエリはより早く結果を得られます。 GraphQL の結果のキャッシュは、キャッシュを無効化に関する高度なルールセットを持ちません。 サイトのコンテンツ、または、構造を変更すると、すべてのキャッシュが無効になります。

このクエリはタグの照会で利用されます。 <config3:enableGraphQlCaching> setting.

## クエリのリファレンス

それぞれ特定のインターフェース実装のために、定義されたタイプが存在します。 例えば、「ニュース」セクションに「アーティクル」と「エディトリアル」入力タイプを持つ場合、（トークンが利用を許可していれば）`EntryInterface` インターフェースタイプに加え、2つの追加タイプが GraphQL スキーマで定義されます。 それが `news_article_Entry` および `news_editorial_Entry` タイプです。

## 利用可能なディレクティブのリスト

::: tip
実際の API 機能は、スキーマが許可するものに依存します。 :::
:::

<!-- BEGIN QUERIES -->

### `assets` クエリ
このクエリはカテゴリの照会で利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`        | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | 返す下書きの ID（`drafts` テーブルから）                                                                                                                                             |
| `enabledForSite`      | `Boolean`         | 下書きの投稿者 ID                                                                                                                                                             |
| `title`               | `[String]`        | リビジョンのエレメントが返されるかどうか。                                                                                                                                                  |
| `slug`                | `[String]`        | リビジョンが返されるソースエレメントの ID                                                                                                                                                 |
| `uri`                 | `[String]`        | 返すリビジョンの ID（`revisions` テーブルから）                                                                                                                                        |
| `search`              | `String`          | リビジョンの投稿者 ID                                                                                                                                                           |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[Int]`           | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `fixedOrder`          | `Boolean`         | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `inReverse`           | `Boolean`         | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `dateCreated`         | `[String]`        | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `orderBy`             | `String`          | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `volumeId`            | `[QueryArgument]` | クエリの結果を逆順で返します。                                                                                                                                                        |
| `volume`              | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `folderId`            | `[QueryArgument]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `filename`            | `[String]`        | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `kind`                | `[String]`        | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `height`              | `[String]`        | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `width`               | `[String]`        | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `size`                | `[String]`        | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `dateModified`        | `String`          | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `includeSubfolders`   | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `withTransforms`      | `[String]`        | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。                                                                                                                               |
| `uploader`            | `QueryArgument`   | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |

### `assetCount` クエリ
このクエリはカテゴリの数を返すために利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`        | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | 返す下書きの ID（`drafts` テーブルから）                                                                                                                                             |
| `enabledForSite`      | `Boolean`         | 下書きの投稿者 ID                                                                                                                                                             |
| `title`               | `[String]`        | リビジョンのエレメントが返されるかどうか。                                                                                                                                                  |
| `slug`                | `[String]`        | リビジョンが返されるソースエレメントの ID                                                                                                                                                 |
| `uri`                 | `[String]`        | 返すリビジョンの ID（`revisions` テーブルから）                                                                                                                                        |
| `search`              | `String`          | リビジョンの投稿者 ID                                                                                                                                                           |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[Int]`           | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `fixedOrder`          | `Boolean`         | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `inReverse`           | `Boolean`         | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `dateCreated`         | `[String]`        | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `orderBy`             | `String`          | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `volumeId`            | `[QueryArgument]` | クエリの結果を逆順で返します。                                                                                                                                                        |
| `volume`              | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `folderId`            | `[QueryArgument]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `filename`            | `[String]`        | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `kind`                | `[String]`        | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `height`              | `[String]`        | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `width`               | `[String]`        | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `size`                | `[String]`        | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `dateModified`        | `String`          | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `includeSubfolders`   | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `withTransforms`      | `[String]`        | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。                                                                                                                               |
| `uploader`            | `QueryArgument`   | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |

### `asset` クエリ
このクエリは単一カテゴリの照会で利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`        | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | 返す下書きの ID（`drafts` テーブルから）                                                                                                                                             |
| `enabledForSite`      | `Boolean`         | 下書きの投稿者 ID                                                                                                                                                             |
| `title`               | `[String]`        | リビジョンのエレメントが返されるかどうか。                                                                                                                                                  |
| `slug`                | `[String]`        | リビジョンが返されるソースエレメントの ID                                                                                                                                                 |
| `uri`                 | `[String]`        | 返すリビジョンの ID（`revisions` テーブルから）                                                                                                                                        |
| `search`              | `String`          | リビジョンの投稿者 ID                                                                                                                                                           |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[Int]`           | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `fixedOrder`          | `Boolean`         | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `inReverse`           | `Boolean`         | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `dateCreated`         | `[String]`        | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `orderBy`             | `String`          | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `volumeId`            | `[QueryArgument]` | クエリの結果を逆順で返します。                                                                                                                                                        |
| `volume`              | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `folderId`            | `[QueryArgument]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `filename`            | `[String]`        | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `kind`                | `[String]`        | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `height`              | `[String]`        | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `width`               | `[String]`        | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `size`                | `[String]`        | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `dateModified`        | `String`          | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `includeSubfolders`   | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `withTransforms`      | `[String]`        | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。                                                                                                                               |
| `uploader`            | `QueryArgument`   | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |

### `entries` クエリ
このクエリはエントリの数を返すために利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`        | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`         | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`        | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `slug`                | `[String]`        | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `uri`                 | `[String]`        | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`          | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToEntries`    | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`         | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`         | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`          | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`         | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `structureId`         | `Int`             | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `level`               | `Int`             | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `hasDescendants`      | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `ancestorOf`          | `Int`             | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`             | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |
| `descendantOf`        | `Int`             | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`             | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `leaves`              | `Boolean`         | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `nextSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`             | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`             | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`         | ユーザーが編集権限を持つエレメントだけを返すかどうか。                                                                                                                                            |
| `section`             | `[String]`        | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                  |
| `sectionId`           | `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。                                                                                                                        |
| `type`                | `[String]`        | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `typeId`              | `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。                                                                                                                             |
| `authorId`            | `[QueryArgument]` | エントリの投稿者に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `authorGroup`         | `[String]`        | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                               |
| `authorGroupId`       | `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                       |
| `postDate`            | `[String]`        | エントリの投稿日に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `before`              | `String`          | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                   |
| `after`               | `String`          | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                   |
| `expiryDate`          | `[String]`        | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |

### `entryCount` クエリ
このクエリはアセットの数を返すために利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`        | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`         | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`        | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `slug`                | `[String]`        | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `uri`                 | `[String]`        | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`          | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToEntries`    | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`         | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`         | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`          | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`         | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `structureId`         | `Int`             | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `level`               | `Int`             | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `hasDescendants`      | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `ancestorOf`          | `Int`             | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`             | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |
| `descendantOf`        | `Int`             | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`             | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `leaves`              | `Boolean`         | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `nextSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`             | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`             | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`         | ユーザーが編集権限を持つエレメントだけを返すかどうか。                                                                                                                                            |
| `section`             | `[String]`        | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `sectionId`           | `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。                                                                                                                        |
| `type`                | `[String]`        | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `typeId`              | `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。                                                                                                                             |
| `authorId`            | `[QueryArgument]` | エントリの投稿者に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `authorGroup`         | `[String]`        | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                               |
| `authorGroupId`       | `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                       |
| `postDate`            | `[String]`        | エントリの投稿日に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `before`              | `String`          | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                   |
| `after`               | `String`          | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                    |
| `expiryDate`          | `[String]`        | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |

### `entry` クエリ
このクエリは単一エントリの照会で利用されます。
| 引数                    | タイプ               | 説明                                                                                                                                                                     |
| --------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]` | 利用する名前付けされた画像変換のハンドル。                                                                                                                                                  |
| `uid`                 | `[String]`        | 利用する名前付けされた画像変換のハンドル。                                                                                                                                                  |
| `site`                | `[String]`        | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]` | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`         | 生成された変換に利用するモード。                                                                                                                                                       |
| `enabledForSite`      | `Boolean`         | 焦点が指定されていない場合、切り抜きに利用する位置。                                                                                                                                             |
| `title`               | `[String]`        | 変換に利用するインタレースモード。                                                                                                                                                      |
| `slug`                | `[String]`        | 変換の品質。                                                                                                                                                                 |
| `uri`                 | `[String]`        | 変換の画像フォーマット。                                                                                                                                                           |
| `search`              | `String`          | 変換をすぐに生成するか、生成された URL を利用して画像がリクエストされた時だけ生成するかどうか。                                                                                                                     |
| `relatedTo`           | `[QueryArgument]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToEntries`    | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToUsers`      | `[Int]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToCategories` | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToTags`       | `[Int]`           | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`        | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`         | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`         | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`        | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`        | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`             | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`             | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`          | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`         | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。                                                                                                                                     |
| `structureId`         | `Int`             | クエリに結合されるストラクチャーデータを決定します。                                                                                                                                             |
| `level`               | `Int`             | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。                                                                                                                                 |
| `hasDescendants`      | `Boolean`         | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                                    |
| `ancestorOf`          | `Int`             | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`             | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                          |
| `descendantOf`        | `Int`             | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`             | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `leaves`              | `Boolean`         | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `nextSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`             | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`             | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`             | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`         | ユーザーが編集権限を持つエレメントだけを返すかどうか。                                                                                                                                            |
| `section`             | `[String]`        | エントリの投稿者に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `sectionId`           | `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。                                                                                                                        |
| `type`                | `[String]`        | アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。                                                                                                                                       |
| `typeId`              | `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。                                                                                                                             |
| `authorId`            | `[QueryArgument]` | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                               |
| `authorGroup`         | `[String]`        | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                                   |
| `authorGroupId`       | `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                       |
| `postDate`            | `[String]`        | エントリの投稿日に基づいて、クエリの結果を絞り込みます。                                                                                                                                           |
| `before`              | `String`          | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                    |
| `after`               | `String`          | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。                                                                                                                                    |
| `expiryDate`          | `[String]`        | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |

### `globalSets` クエリ
渡されたフィールド値を Markdown として解析します。
| 引数                    | タイプ                  | 説明                                                                                                                                                                     |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`    | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`           | `<p>` タグを除き、インライン要素だけを解析するかどうか。                                                                                                                                  |
| `site`                | `[String]`           | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`    | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`            | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`            | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `slug`                | `[String]`           | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `uri`                 | `[String]`           | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`             | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]`    | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[Int]`              | エレメントのスラグに基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `relatedToEntries`    | `[Int]`              | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                  |
| `relatedToUsers`      | `[Int]`              | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToCategories` | `[Int]`              | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToTags`       | `[TagCriteriaInput]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]`    | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`           | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`            | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`            | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`           | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`           | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`             | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `handle`              | `[String]`           | グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                       |

### `globalSet` クエリ
このクエリは単一グローバル設定の照会で利用されます。
| 引数                    | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`                | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`                 | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`                | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `slug`                | `[String]`                | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uri`                 | `[String]`                | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`                  | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                  |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToTags`       | `[TagCriteriaInput]`      | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`                 | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`                 | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `handle`              | `[String]`                | グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。                                                                                                                                       |

### `users` クエリ
これは、すべてのアセットで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | アセットが属するボリュームの ID。                                                                                                                                                     |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | アセットファイルのファイル名。                                                                                                                                                        |
| `fixedOrder`          | `Boolean`                 | アセットファイルのファイル拡張子。                                                                                                                                                      |
| `inReverse`           | `Boolean`                 | アセットにユーザー定義の焦点がセットされているかどうか。                                                                                                                                           |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | ファイルの種類。                                                                                                                                                               |
| `offset`              | `Int`                     | バイト単位のファイルサイズ。                                                                                                                                                         |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `email`               | `[String]`                | このアセットに基づく `<img>` タグ。                                                                                                                                           |
| `username`            | `[String]`                | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `firstName`           | `[String]`                | 判別できる場合、ファイルの MIME タイプ。                                                                                                                                                |
| `lastName`            | `[String]`                | ボリューム内のアセットのパス。                                                                                                                                                        |
| `hasPhoto`            | `Boolean`                 | アセットファイルが最後に更新された日付。                                                                                                                                                   |
| `groupId`             | `[QueryArgument]`         | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                                   |
| `group`               | `[QueryArgument]`         | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                                   |

### `userCount` クエリ
これは、すべてのエントリで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | ストラクチャー内でのエレメントの左の位置。                                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | ストラクチャー内でのエレメントのレベル。                                                                                                                                                   |
| `fixedOrder`          | `Boolean`                 | エレメントのストラクチャーのルート ID。                                                                                                                                                  |
| `inReverse`           | `Boolean`                 | エレメントのストラクチャー ID。                                                                                                                                                      |
| `dateCreated`         | `[String]`                | 下書きかどうかを返します。                                                                                                                                                          |
| `dateUpdated`         | `[String]`                | リビジョンかどうかを返します。                                                                                                                                                        |
| `offset`              | `Int`                     | エレメントの ID、または、下書き/リビジョンの場合、ソースエレメントの ID を返します。                                                                                                                         |
| `limit`               | `Int`                     | エレメントの UUID、または、下書き/リビジョンの場合、ソースエレメントの UUID を返します。                                                                                                                     |
| `orderBy`             | `String`                  | 返される下書きの ID（`drafts` テーブルから）。                                                                                                                                          |
| `email`               | `[String]`                | 下書きかどうかを返します。                                                                                                                                                          |
| `username`            | `[String]`                | 下書きの名前。                                                                                                                                                                |
| `firstName`           | `[String]`                | 下書きのメモ。                                                                                                                                                                |
| `lastName`            | `[String]`                | エントリを含むセクションの ID。                                                                                                                                                      |
| `hasPhoto`            | `Boolean`                 | エントリを含むセクションのハンドル。                                                                                                                                                     |
| `groupId`             | `[QueryArgument]`         | エントリを含む入力タイプの ID。                                                                                                                                                      |
| `group`               | `[QueryArgument]`         | エントリを含む入力タイプのハンドル。                                                                                                                                                     |

### `user` クエリ
これは、すべてのグローバル設定で実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | グローバル設定の名前。                                                                                                                                                            |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`                 | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`                 | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `email`               | `[String]`                | ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。                                                                                                                                       |
| `username`            | `[String]`                | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `firstName`           | `[String]`                | ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。                                                                                                                                   |
| `lastName`            | `[String]`                | ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。                                                                                                                                     |
| `hasPhoto`            | `Boolean`                 | ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。                                                                                                                         |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。                                                                                                                  |
| `group`               | `[QueryArgument]`         | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |

### `tags` クエリ
これは、すべての行列ブロックで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | 行列ブロックを所有するフィールドの ID。                                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 行列ブロックタイプの ID。                                                                                                                                                         |
| `fixedOrder`          | `Boolean`                 | 行列ブロックタイプのハンドル。                                                                                                                                                        |
| `inReverse`           | `Boolean`                 | 所有するエレメントフィールド内での行列ブロックのソート順。                                                                                                                                          |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `group`               | `[String]`                | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。                                                                                                                          |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。                                                                                                                          |

### `tagCount` クエリ
これは、すべてのユーザーで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `photo`               | `[TagCriteriaInput]`      | ユーザーのフォト。                                                                                                                                                              |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | ユーザーのフルネーム。                                                                                                                                                            |
| `fixedOrder`          | `Boolean`                 | ユーザーのフルネーム、または、ユーザー名。                                                                                                                                                  |
| `inReverse`           | `Boolean`                 | ユーザーの設定。                                                                                                                                                               |
| `dateCreated`         | `[String]`                | ユーザーの優先する言語。                                                                                                                                                           |
| `dateUpdated`         | `[String]`                | ユーザー名。                                                                                                                                                                 |
| `offset`              | `Int`                     | ユーザーのファーストネーム。                                                                                                                                                         |
| `limit`               | `Int`                     | ユーザーのラストネーム。                                                                                                                                                           |
| `orderBy`             | `String`                  | ユーザーのメールアドレス。                                                                                                                                                          |
| `group`               | `[String]`                | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。                                                                                                                          |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。                                                                                                                          |

### `tag` クエリ
これは、すべてのカテゴリで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | ストラクチャー内でのエレメントの左の位置。                                                                                                                                                  |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | ストラクチャー内でのエレメントのレベル。                                                                                                                                                   |
| `fixedOrder`          | `Boolean`                 | エレメントのストラクチャーのルート ID。                                                                                                                                                  |
| `inReverse`           | `Boolean`                 | エレメントのストラクチャー ID。                                                                                                                                                      |
| `dateCreated`         | `[String]`                | カテゴリを含むグループの ID。                                                                                                                                                       |
| `dateUpdated`         | `[String]`                | カテゴリを含むグループのハンドル。                                                                                                                                                      |
| `offset`              | `Int`                     | カテゴリの子。                                                                                                                                                                |
| `limit`               | `Int`                     | カテゴリの親。                                                                                                                                                                |
| `orderBy`             | `String`                  | エレメントのフル URL。                                                                                                                                                          |
| `group`               | `[String]`                | 他のロケールの同じエレメント。                                                                                                                                                        |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。                                                                                                                          |

### `categories` クエリ
これは、すべてのタグで実装されたインターフェースです。
| フィールド                 | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エンティティの ID。                                                                                                                                                            |
| `uid`                 | `[String]`                | エンティティの UID。                                                                                                                                                           |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | エレメントのスラグ。                                                                                                                                                             |
| `enabledForSite`      | `Boolean`                 | エレメントの URI。                                                                                                                                                            |
| `title`               | `[String]`                | エレメントが有効かどうか。                                                                                                                                                          |
| `slug`                | `[String]`                | エレメントがアーカイブされているかどうか。                                                                                                                                                  |
| `uri`                 | `[String]`                | エレメントが関連付けられているサイトの ID。                                                                                                                                                |
| `search`              | `String`                  | エレメントが関連付けられているサイトの言語。                                                                                                                                                 |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントがソフトデリートされているかどうか。                                                                                                                                                |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータス。                                                                                                                                                           |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントが作成された日付。                                                                                                                                                         |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントが最後にアップデートされた日付。                                                                                                                                                  |
| `relatedToTags`       | `[TagCriteriaInput]`      | タグを含むグループの ID。                                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`                 | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`                 | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`                 | Explicitly determines whether the query should join in the structure data.                                                                                             |
| `structureId`         | `Int`                     | Determines which structure data should be joined into the query.                                                                                                       |
| `level`               | `Int`                     | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `hasDescendants`      | `Boolean`                 | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `ancestorOf`          | `Int`                     | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`                     | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `descendantOf`        | `Int`                     | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`                     | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `leaves`              | `Boolean`                 | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `nextSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`                     | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`                     | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`                 | ユーザーが編集権限を持つカテゴリだけを返すかどうか。                                                                                                                                             |
| `group`               | `[String]`                | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |

### `categoryCount` クエリ
このクエリはユーザーの数を返すために利用されます。
| 引数                    | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`                | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`                 | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`                | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `slug`                | `[String]`                | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uri`                 | `[String]`                | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`                  | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToTags`       | `[TagCriteriaInput]`      | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`                 | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`                 | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`                 | Explicitly determines whether the query should join in the structure data.                                                                                             |
| `structureId`         | `Int`                     | Determines which structure data should be joined into the query.                                                                                                       |
| `level`               | `Int`                     | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `hasDescendants`      | `Boolean`                 | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                                   |
| `ancestorOf`          | `Int`                     | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`                     | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。                                                                                                         |
| `descendantOf`        | `Int`                     | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`                     | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                |
| `leaves`              | `Boolean`                 | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `nextSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`                     | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`                     | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`                 | ユーザーが編集権限を持つカテゴリだけを返すかどうか。                                                                                                                                             |
| `group`               | `[String]`                | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |

### `category` クエリ
このクエリは単一ユーザーの照会で利用されます。
| 引数                    | タイプ                       | 説明                                                                                                                                                                     |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | `[QueryArgument]`         | エレメントの ID に基づいて、クエリの結果を絞り込みます。                                                                                                                                         |
| `uid`                 | `[String]`                | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `site`                | `[String]`                | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `siteId`              | `[QueryArgument]`         | エレメントを照会するサイトを決定します。 デフォルトは現在の（リクエストされた）サイトです。                                                                                                                         |
| `unique`              | `Boolean`                 | クエリによってユニークな ID のエレメントだけが返されるかを決定します。                                                                                                                                  |
| `enabledForSite`      | `Boolean`                 | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。                                                                                                        |
| `title`               | `[String]`                | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `slug`                | `[String]`                | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `uri`                 | `[String]`                | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `search`              | `String`                  | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                      |
| `relatedTo`           | `[QueryArgument]`         | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。 `relatedToAll` も利用されている場合、この引数は無視されます。                                                                                  |
| `relatedToAssets`     | `[AssetCriteriaInput]`    | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToEntries`    | `[EntryCriteriaInput]`    | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToUsers`      | `[UserCriteriaInput]`     | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToCategories` | `[CategoryCriteriaInput]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `relatedToTags`       | `[TagCriteriaInput]`      | Narrows the query results to elements that relate to a tag list defined with this argument.                                                                            |
| `relatedToAll`        | `[QueryArgument]`         | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。 この引数を使用すると、`relatedTo` の引数は無視されます。 **This argument is deprecated.** `relatedTo: ["and", ...ids]` should be used instead. |
| `ref`                 | `[String]`                | 参照文字列に基づいて、クエリの結果を絞り込みます。                                                                                                                                              |
| `fixedOrder`          | `Boolean`                 | クエリの結果を引数 `id` で指定された順序で返します。                                                                                                                                          |
| `inReverse`           | `Boolean`                 | クエリの結果を逆順で返します。                                                                                                                                                        |
| `dateCreated`         | `[String]`                | エレメントの作成日に基づいて、クエリの結果を絞り込みます。                                                                                                                                          |
| `dateUpdated`         | `[String]`                | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                                                                                                                   |
| `offset`              | `Int`                     | ページ分割された結果のオフセットを設定します。                                                                                                                                                |
| `limit`               | `Int`                     | ページ分割された結果のリミットを設定します。                                                                                                                                                 |
| `orderBy`             | `String`                  | 返されるエレメントを並び替えるフィールドを設定します。                                                                                                                                            |
| `withStructure`       | `Boolean`                 | Explicitly determines whether the query should join in the structure data.                                                                                             |
| `structureId`         | `Int`                     | Determines which structure data should be joined into the query.                                                                                                       |
| `level`               | `Int`                     | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `hasDescendants`      | `Boolean`                 | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `ancestorOf`          | `Int`                     | Narrows the query results to only elements that are ancestors of another element, provided by its id.                                                                  |
| `ancestorDist`        | `Int`                     | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                 |
| `descendantOf`        | `Int`                     | Narrows the query results to only elements that are descendants of another element, provided by its id.                                                                |
| `descendantDist`      | `Int`                     | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。                                                                                                                                 |
| `leaves`              | `Boolean`                 | エレメントの UID に基づいて、クエリの結果を絞り込みます。                                                                                                                                        |
| `nextSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately after another element, provided by its id.                                                          |
| `prevSiblingOf`       | `Int`                     | Narrows the query results to only the entry that comes immediately before another element, provided by its id.                                                         |
| `positionedAfter`     | `Int`                     | Narrows the query results to only entries that are positioned after another element, provided by its id.                                                               |
| `positionedBefore`    | `Int`                     | Narrows the query results to only entries that are positioned before another element, provided by its id.                                                              |
| `editable`            | `Boolean`                 | ユーザーが編集権限を持つカテゴリだけを返すかどうか。                                                                                                                                             |
| `group`               | `[String]`                | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |
| `groupId`             | `[QueryArgument]`         | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。                                                                                                                      |

<!-- END QUERIES -->

## 定義済みインターフェース
ミューテーションはデータを引数として受け取り、ほとんどの場合は単純ですが、頭に入れておくべきポイントがいくつかあります。

<!-- BEGIN DIRECTIVES -->

### `formatDateTime` ディレクティブ
このディレクティブは、日付を任意の書式にフォーマットできます。 すべてのフィールドに適用できますが、DateTime フィールドに適用した場合のみ変更します。
| 引数         | タイプ      | 説明                                                                                                                                                                                                                                                                                                                         |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | `String` | 利用する書式を指定します。 `short`、`medium`、`long`、`full`、[ICU date フォーマット](http://userguide.icu-project.org/formatparse/datetime)、または、[PHP date フォーマット](https://www.php.net/manual/en/function.date.php)を指定できます。 デフォルトは [Atom date time フォーマット](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.atom])です。 |
| `timezone` | `String` | タイムゾーンのフルネーム。 デフォルトは UTC です。 （例：America/New_York）                                                                                                                                                                                                                                                                          |
| `locale`   | `String` | 日付をフォーマットする際に利用するロケール。 （例：en-US）                                                                                                                                                                                                                                                                                           |


### `transform` ディレクティブ
このディレクティブは、[画像変換](/docs/3.x/ja/image-transforms.html)の URL を返すために利用されます。 Craft で変換するために利用するのと同じ引数を受け入れ、引数 `immediately` を追加します。
| 引数            | タイプ       | 説明                                                                                                               |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `handle`      | `String`  | The handle of the named transform to use.                                                                        |
| `transform`   | `String`  | The handle of the named transform to use.                                                                        |
| `width`       | `Int`     | 生成された変換の幅。                                                                                                       |
| `height`      | `Int`     | 生成された変換の高さ。                                                                                                      |
| `mode`        | `String`  | The mode to use for the generated transform.                                                                     |
| `position`    | `String`  | The position to use when cropping, if no focal point specified.                                                  |
| `interlace`   | `String`  | The interlace mode to use for the transform                                                                      |
| `quality`     | `Int`     | The quality of the transform                                                                                     |
| `format`      | `String`  | The format to use for the transform                                                                              |
| `immediately` | `Boolean` | Whether the transform should be generated immediately or only when the image is requested used the generated URL |


### `markdown` ディレクティブ
フィールドに関連付けられたエレメントの数を返します。
| 引数           | タイプ       | 説明                                                                               |
| ------------ | --------- | -------------------------------------------------------------------------------- |
| `flavor`     | `String`  | 入力内容が解釈されるべき、Markdown の「flavor」。 yii\helpers\Markdown::process() と同じ引数を受け入れます。 |
| `inlineOnly` | `Boolean` | Whether to only parse inline elements, omitting any `<p>` tags.            |

<!-- END DIRECTIVES -->

## ミューテーション
実例を見てみましょう。

<!-- BEGIN INTERFACES -->

### `AssetInterface` インターフェース
This is the interface implemented by all assets.
| Field           | タイプ              | 説明                                                                             |
| --------------- | ---------------- | ------------------------------------------------------------------------------ |
| `id`            | `ID`             | 下書きの投稿者 ID                                                                     |
| `uid`           | `String`         | The uid of the entity                                                          |
| `_count`        | `Int`            | フィールドに関連付けられたエレメントの数を返します。                                                     |
| `title`         | `String`         | エレメントのタイトル。                                                                    |
| `slug`          | `String`         | The element’s slug.                                                            |
| `uri`           | `String`         | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                |
| `enabled`       | `Boolean`        | 下書きのエレメントが返されるかどうか。                                                            |
| `archived`      | `Boolean`        | 下書きのエレメントが返されるかどうか。                                                            |
| `siteId`        | `Int`            | The ID of the site the element is associated with.                             |
| `language`      | `String`         | The language of the site element is associated with.                           |
| `searchScore`   | `String`         | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。                                  |
| `trashed`       | `Boolean`        | 下書きのエレメントが返されるかどうか。                                                            |
| `status`        | `String`         | The element's status.                                                          |
| `dateCreated`   | `DateTime`       | The date the element was created.                                              |
| `dateUpdated`   | `DateTime`       | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。                                           |
| `volumeId`      | `Int`            | アセットが属するフォルダの ID。                                                              |
| `folderId`      | `Int`            | フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。                                  |
| `filename`      | `String`         | The filename of the asset file.                                                |
| `extension`     | `String`         | The file extension for the asset file.                                         |
| `hasFocalPoint` | `Boolean`        | Whether a user-defined focal point is set on the asset.                        |
| `focalPoint`    | `[Float]`        | `x` と `y` キーを持つ配列で表される焦点。 画像でない場合は null。                                       |
| `kind`          | `String`         | タイプ                                                                            |
| `size`          | `String`         | The file size in bytes.                                                        |
| `height`        | `Int`            | ピクセル単位の高さ。 画像でない場合は null。                                                      |
| `width`         | `Int`            | ピクセル単位の幅。 画像でない場合は null。                                                       |
| `img`           | `String`         | An `<img>` tag based on this asset.                                      |
| `srcset`        | `String`         | Returns a `srcset` attribute value based on the given widths or x-descriptors. |
| `url`           | `String`         | アセットのフル URL。 このフィールドは、`transform` ディレクティブと同じフィールドを受け入れます。                      |
| `mimeType`      | `String`         | The file’s MIME type, if it can be determined.                                 |
| `path`          | `String`         | The asset's path in the volume.                                                |
| `dateModified`  | `DateTime`       | アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。                                             |
| `prev`          | `AssetInterface` | 指定された基準から、これに関連する前のエレメントを返します。                                                 |
| `next`          | `AssetInterface` | 指定された基準から、これに関連する次のエレメントを返します。                                                 |


### `EntryInterface` インターフェース
This is the interface implemented by all entries.
| Field                | タイプ                | 説明                                                                                                                       |
| -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `id`                 | `ID`               | 下書きの投稿者 ID                                                                                                               |
| `uid`                | `String`           | The uid of the entity                                                                                                    |
| `_count`             | `Int`              | フィールドに関連付けられたエレメントの数を返します。                                                                                               |
| `title`              | `String`           | エレメントのタイトル。                                                                                                              |
| `slug`               | `String`           | The element’s slug.                                                                                                      |
| `uri`                | `String`           | エレメントの URI に基づいて、クエリの結果を絞り込みます。                                                                                          |
| `enabled`            | `Boolean`          | 下書きのエレメントが返されるかどうか。                                                                                                      |
| `archived`           | `Boolean`          | 下書きのエレメントが返されるかどうか。                                                                                                      |
| `siteId`             | `Int`              | The ID of the site the element is associated with.                                                                       |
| `language`           | `String`           | The language of the site element is associated with.                                                                     |
| `searchScore`        | `String`           | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。                                                                            |
| `trashed`            | `Boolean`          | 下書きのエレメントが返されるかどうか。                                                                                                      |
| `status`             | `String`           | The element's status.                                                                                                    |
| `dateCreated`        | `DateTime`         | The date the element was created.                                                                                        |
| `dateUpdated`        | `DateTime`         | The date the element was last updated.                                                                                   |
| `lft`                | `Int`              | ストラクチャー内でのエレメントの右の位置。                                                                                                    |
| `rgt`                | `Int`              | ストラクチャー内でのエレメントの右の位置。                                                                                                    |
| `level`              | `Int`              | The element’s level within its structure                                                                                 |
| `root`               | `Int`              | 行列ブロックを所有するエレメントの ID。                                                                                                    |
| `structureId`        | `Int`              | リビジョンが返されるソースエレメントの ID                                                                                                   |
| `isDraft`            | `Boolean`          | Returns whether this is a draft.                                                                                         |
| `isRevision`         | `Boolean`          | リビジョンのエレメントが返されるかどうか。                                                                                                    |
| `sourceId`           | `Int`              | リビジョンが返されるソースエレメントの ID                                                                                                   |
| `sourceUid`          | `String`           | リビジョンが返されるソースエレメントの ID                                                                                                   |
| `draftId`            | `Int`              | 返す下書きの ID（`drafts` テーブルから）                                                                                               |
| `isUnpublishedDraft` | `Boolean`          | Returns whether this is an unpublished draft.                                                                            |
| `isUnsavedDraft`     | `Boolean`          | Returns whether this is an unpublished draft. **This field is deprecated.** `isUnpublishedDraft` should be used instead. |
| `draftName`          | `String`           | The name of the draft.                                                                                                   |
| `draftNotes`         | `String`           | The notes for the draft.                                                                                                 |
| `sectionId`          | `Int`              | The ID of the section that contains the entry.                                                                           |
| `sectionHandle`      | `String`           | The handle of the section that contains the entry.                                                                       |
| `typeId`             | `Int`              | The ID of the entry type that contains the entry.                                                                        |
| `typeHandle`         | `String`           | The handle of the entry type that contains the entry.                                                                    |
| `postDate`           | `DateTime`         | エントリの投稿日。                                                                                                                |
| `expiryDate`         | `DateTime`         | エントリの有効期限日。                                                                                                              |
| `children`           | `[EntryInterface]` | セクションがストラクチャーの場合、エントリの子。 `entries` クエリと同じ引数を受け入れます。                                                                      |
| `parent`             | `EntryInterface`   | セクションがストラクチャーの場合、エントリの親。                                                                                                 |
| `url`                | `String`           | エレメントのフル URL。                                                                                                            |
| `localized`          | `[EntryInterface]` | 他のロケールの同じエレメント。                                                                                                          |
| `prev`               | `EntryInterface`   | 指定された基準から、これに関連する前のエレメントを返します。                                                                                           |
| `next`               | `EntryInterface`   | 指定された基準から、これに関連する次のエレメントを返します。                                                                                           |


### `GlobalSetInterface` インターフェース
This is the interface implemented by all global sets.
| Field         | タイプ        | 説明                                                   |
| ------------- | ---------- | ---------------------------------------------------- |
| `id`          | `ID`       | 下書きの投稿者 ID                                           |
| `uid`         | `String`   | The uid of the entity                                |
| `_count`      | `Int`      | フィールドに関連付けられたエレメントの数を返します。                           |
| `title`       | `String`   | エレメントのタイトル。                                          |
| `slug`        | `String`   | The element’s slug.                                  |
| `uri`         | `String`   | エレメントの URI に基づいて、クエリの結果を絞り込みます。                      |
| `enabled`     | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `archived`    | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `siteId`      | `Int`      | The ID of the site the element is associated with.   |
| `language`    | `String`   | The language of the site element is associated with. |
| `searchScore` | `String`   | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。        |
| `trashed`     | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `status`      | `String`   | The element's status.                                |
| `dateCreated` | `DateTime` | The date the element was created.                    |
| `dateUpdated` | `DateTime` | The date the element was last updated.               |
| `name`        | `String`   | グローバル設定のハンドル。                                        |
| `handle`      | `String`   | The handle of the global set.                        |


### `MatrixBlockInterface` インターフェース
This is the interface implemented by all matrix blocks.
| Field         | タイプ        | 説明                                                   |
| ------------- | ---------- | ---------------------------------------------------- |
| `id`          | `ID`       | 下書きの投稿者 ID                                           |
| `uid`         | `String`   | The uid of the entity                                |
| `_count`      | `Int`      | フィールドに関連付けられたエレメントの数を返します。                           |
| `title`       | `String`   | エレメントのタイトル。                                          |
| `slug`        | `String`   | The element’s slug.                                  |
| `uri`         | `String`   | エレメントの URI に基づいて、クエリの結果を絞り込みます。                      |
| `enabled`     | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `archived`    | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `siteId`      | `Int`      | The ID of the site the element is associated with.   |
| `language`    | `String`   | The language of the site element is associated with. |
| `searchScore` | `String`   | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。        |
| `trashed`     | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `status`      | `String`   | The element's status.                                |
| `dateCreated` | `DateTime` | The date the element was created.                    |
| `dateUpdated` | `DateTime` | The date the element was last updated.               |
| `fieldId`     | `Int`      | The ID of the field that owns the matrix block.      |
| `ownerId`     | `Int`      | The ID of the element that owns the matrix block.    |
| `typeId`      | `Int`      | The ID of the matrix block's type.                   |
| `typeHandle`  | `String`   | The handle of the matrix block's type.               |
| `sortOrder`   | `Int`      | 返されるエレメントを並び替えるフィールドを設定します。                          |


### `UserInterface` インターフェース
This is the interface implemented by all users.
| Field               | タイプ        | 説明                                                   |
| ------------------- | ---------- | ---------------------------------------------------- |
| `id`                | `ID`       | 下書きの投稿者 ID                                           |
| `uid`               | `String`   | The uid of the entity                                |
| `_count`            | `Int`      | フィールドに関連付けられたエレメントの数を返します。                           |
| `title`             | `String`   | エレメントのタイトル。                                          |
| `slug`              | `String`   | The element’s slug.                                  |
| `uri`               | `String`   | エレメントの URI に基づいて、クエリの結果を絞り込みます。                      |
| `enabled`           | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `archived`          | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `siteId`            | `Int`      | The ID of the site the element is associated with.   |
| `language`          | `String`   | The language of the site element is associated with. |
| `searchScore`       | `String`   | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。        |
| `trashed`           | `Boolean`  | 下書きのエレメントが返されるかどうか。                                  |
| `status`            | `String`   | The element's status.                                |
| `dateCreated`       | `DateTime` | The date the element was created.                    |
| `dateUpdated`       | `DateTime` | The date the element was last updated.               |
| `friendlyName`      | `String`   | ユーザーのファーストネーム、または、ユーザー名。                             |
| `fullName`          | `String`   | The user's full name.                                |
| `name`              | `String`   | The user's full name or username.                    |
| `preferences`       | `String`   | The user’s preferences.                              |
| `preferredLanguage` | `String`   | The user’s preferred language.                       |
| `username`          | `String`   | 下書きの投稿者 ID                                           |
| `firstName`         | `String`   | The user's first name.                               |
| `lastName`          | `String`   | The user's last name.                                |
| `email`             | `String`   | The user's email.                                    |


### `CategoryInterface` インターフェース
This is the interface implemented by all categories.
| Field         | タイプ                   | 説明                                                   |
| ------------- | --------------------- | ---------------------------------------------------- |
| `id`          | `ID`                  | 下書きの投稿者 ID                                           |
| `uid`         | `String`              | The uid of the entity                                |
| `_count`      | `Int`                 | フィールドに関連付けられたエレメントの数を返します。                           |
| `title`       | `String`              | エレメントのタイトル。                                          |
| `slug`        | `String`              | The element’s slug.                                  |
| `uri`         | `String`              | エレメントの URI に基づいて、クエリの結果を絞り込みます。                      |
| `enabled`     | `Boolean`             | 下書きのエレメントが返されるかどうか。                                  |
| `archived`    | `Boolean`             | 下書きのエレメントが返されるかどうか。                                  |
| `siteId`      | `Int`                 | The ID of the site the element is associated with.   |
| `language`    | `String`              | The language of the site element is associated with. |
| `searchScore` | `String`              | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。        |
| `trashed`     | `Boolean`             | Whether the element has been soft-deleted or not.    |
| `status`      | `String`              | The element's status.                                |
| `dateCreated` | `DateTime`            | The date the element was created.                    |
| `dateUpdated` | `DateTime`            | The date the element was last updated.               |
| `lft`         | `Int`                 | The element’s left position within its structure.    |
| `rgt`         | `Int`                 | The element’s right position within its structure.   |
| `level`       | `Int`                 | The element’s level within its structure             |
| `root`        | `Int`                 | リビジョンが返されるソースエレメントの ID                               |
| `structureId` | `Int`                 | リビジョンが返されるソースエレメントの ID                               |
| `groupId`     | `Int`                 | The ID of the group that contains the category.      |
| `groupHandle` | `String`              | タグを含むグループのハンドル。                                      |
| `children`    | `[CategoryInterface]` | The category’s children.                             |
| `parent`      | `CategoryInterface`   | The category’s parent.                               |
| `url`         | `String`              | 利用するファイルの URL。                                       |
| `localized`   | `[CategoryInterface]` | The same element in other locales.                   |
| `prev`        | `CategoryInterface`   | 指定された基準から、これに関連する前のエレメントを返します。                       |
| `next`        | `CategoryInterface`   | 指定された基準から、これに関連する次のエレメントを返します。                       |


### `TagInterface` インターフェース
This is the interface implemented by all tags.
| Field         | Type       | 説明                                                   |
| ------------- | ---------- | ---------------------------------------------------- |
| `id`          | `ID`       | 下書きの投稿者 ID                                           |
| `uid`         | `String`   | The uid of the entity                                |
| `_count`      | `Int`      | 返されるエレメントを並び替えるフィールドを設定します。                          |
| `title`       | `String`   | エレメントのタイトル。                                          |
| `slug`        | `String`   | The element’s slug.                                  |
| `uri`         | `String`   | エレメントの URI に基づいて、クエリの結果を絞り込みます。                      |
| `enabled`     | `Boolean`  | Whether the element is enabled or not.               |
| `archived`    | `Boolean`  | Whether the element is archived or not.              |
| `siteId`      | `Int`      | The ID of the site the element is associated with.   |
| `language`    | `String`   | The language of the site element is associated with. |
| `searchScore` | `String`   | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。        |
| `trashed`     | `Boolean`  | Whether the element has been soft-deleted or not.    |
| `status`      | `String`   | The element's status.                                |
| `dateCreated` | `DateTime` | The date the element was created.                    |
| `dateUpdated` | `DateTime` | The date the element was last updated.               |
| `groupId`     | `Int`      | The ID of the group that contains the tag.           |
| `groupHandle` | `String`   | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。        |

<!-- END INTERFACES -->

## revisions

GraphQL のミューテーションは、データを変更する方法を提供します。 実際のミューテーションは、スキーマによって異なります。 GraphQL オブジェクトタイプごとに、一般的なミューテーションとタイプ固有のミューテーションがあります。

Mutations take the data as arguments. In this example, we’re using the type-specific `save_news_article_Entry` to save a new entry. We’re providing a title and slug and formatting the `dateCreated` that’s populated automatically when the entry is saved:

::: code
```graphql GraphQL
mutation saveEntry($title: String, $slug: String) {
  save_news_article_Entry(title: $title, slug: $slug) {
    title
    slug
    dateCreated @formatDateTime (format: "Y-m-d")
  }
}

# query variables:
{
  "title": "Craft 3.5 Supports GraphQL Mutations",
  "slug": "craft-graphql-mutations"
}
```
```json JSON Response
{
  "data": {
    "save_news_article_Entry": {
      "title": "Craft 3.5 Supports GraphQL Mutations",
      "slug": "craft-graphql-mutations",
      "dateCreated": "2020-04-18"
    }
  }
}
```
:::

While mutations are mostly straightforward, there are a few important cases to consider.

### ミューテーションの行列フィールド

タグを作成または更新するには、`save_<tagGroupHandle>_Tag` 形式の名前を持つ、タググループ固有のミューテーションを利用します。

慣れていない場合、はじめに[投稿フォーム内で行列フィールドのデータをどのように保存するか](matrix-fields.md#saving-matrix-fields-in-entry-forms)を読むことをお勧めします。
:::

カテゴリを作成または更新するには`save_<categoryGroupHandle>_Tag` 形式の名前を持つ、カテゴリグループ固有のミューテーションを利用します。

| フィールド       | 説明                                                                                  |
| ----------- | ----------------------------------------------------------------------------------- |
| `sortOrder` | ミューテーション後に行列フィールドを必要な順序で維持するための、すべてのブロック ID のリスト。 これには、すべての新しいブロックも含みます。            |
| `blocks`    | すべての実際のブロックのリスト。 変更されないブロックを含める必要はありませんが、それらを削除したくない場合、`sortOrder` フィールドで表す必要があります。 |

実際のブロック入力タイプは、このフィールドで可能なすべてのブロックタイプのフィールドを含みますが、最初の空ではないブロックは、ブロックタイプがフィールドで定義されている順序に考慮されます。

As an example, let’s pretend we have a Matrix field with a handle `ingredients`.

これは `screenshot` ブロックの入力タイプです。 ブロックタイプに定義されたすべてのフィールドが含まれます。

```
ingredients
├── spirit
│   ├── spiritName (Plain Text)
│   └── ounces (Number)
├── mixer
│   ├── mixerName (Plain Text)
│   └── ounces (Number)
└── garnish
    └── garnishName (Plain Text)
```

利用可能な引数は、グローバル設定のカスタムフィールドだけです。

| タイプ名                                             | タイプの説明                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| `documentationField_MatrixInput`                 | これは行列フィールドの入力タイプです。 前述のように、`sortOrder` と `blocks` の2つのフィールドが含まれます。       |
| `documentationField_MatrixBlockContainerInput`   | これはブロックを表す入力タイプです。 この場合、`screenshot` と `paragraph` の2つのフィールドが含まれます。      |
| `documentationField_screenshot_MatrixBlockInput` | Input type for the `spirit` block, containing `spiritName` and `ounces`. |
| `documentationField_paragraph_MatrixBlockInput`  | 同様に、これは `paragraph` ブロックの入力タイプです。                                        |
| `ingredients_garnish_MatrixBlockInput`           | Input type for the `garnish` block, containing `garnishName`.            |

Craft ネイティブの GraphQL API では、現在のところユーザーをミューテートできません。

```graphql
input docunentationField_MatrixInput {
  sortOrder: [QueryArgument]!
  blocks: [documentationField_MatrixBlockContainerInput]
}

input documentationField_MatrixBlockContainerInput {
  screenshot: documentationField_screenshot_MatrixBlockInput
  paragraph: documentationField_paragraph_MatrixBlockInput
}

input documentationField_screenshot_MatrixBlockInput {
  # List of content fields defined for this block type
}

input documentationField_paragraph_MatrixBlockInput {
  # List of content fields defined for this block type
}
  spiritName: String
  ounces: Number
}

input ingredients_mixer_MatrixBlockInput {
  # ... common Matrix Block fields ...
  mixerName: String
  ounces: Number
}

input ingredients_garnish_MatrixBlockInput {
  # ... common Matrix Block fields ...
  garnishName: String
}
```

A mutation saving a new entry with multiple Matrix blocks might look like this:

::: code
```graphql GraphQL
mutation saveEntry(
  $title: String,
  $slug: String,
  $authorId: ID,
  $ingredients: [ingredients_MatrixBlockContainerInput],
  $sortOrder: [QueryArgument]
) {
  save_cocktails_cocktails_Entry(
    title: $title,
    slug: $slug,
    authorId: $authorId,
    ingredients: { blocks: $ingredients, sortOrder: $sortOrder }
  ) {
    title
    slug
    authorId
    dateCreated @formatDateTime (format: "Y-m-d")
    ingredients {
      __typename
        ...on MatrixBlockInterface {
          id
        }
        ... on ingredients_spirit_BlockType {
          spiritName
          ounces
        }
        ... on ingredients_mixer_BlockType {
          mixerName
          ounces
        }
        ... on ingredients_garnish_BlockType {
          garnishName
        }
     }
  }
}

# query variables:
{
  "title": "Gin and Tonic",
  "slug": "gin-tonic",
  "authorId": 1,
  "sortOrder": ["new1", "new2", "new3", "new4"],
  "ingredients": [
    {
      "spirit": {
        "id": "new1",
        "spiritName": "Gin",
        "ounces": 2
      }
    },
    {
      "mixer": {
        "id": "new2",
        "mixerName": "Tonic",
        "ounces": 4
      }
    },
    {
      "mixer": {
        "id": "new3",
        "mixerName": "Fresh Lime Juice",
        "ounces": 0.25
      }
    },
    {
      "garnish": {
        "id": "new4",
        "garnishName": "Lime Wedge or Twist"
      }
    }
  ]
}
```
```json JSON Response
{
  "data": {
    "save_cocktails_cocktails_Entry": {
      "title": "Gin and Tonic",
      "slug": "gin-tonic",
      "authorId": 1,
      "dateCreated": "2021-03-04",
      "ingredients": [
        {
          "__typename": "ingredients_spirit_BlockType",
          "id": "9",
          "spiritName": "Gin",
          "ounces": 2
        },
        {
          "__typename": "ingredients_mixer_BlockType",
          "id": "10",
          "mixerName": "Tonic",
          "ounces": 4
        },
        {
          "__typename": "ingredients_mixer_BlockType",
          "id": "11",
          "mixerName": "Fresh Lime Juice",
          "ounces": 0.25
        },
        {
          "__typename": "ingredients_garnish_BlockType",
          "id": "12",
          "garnishName": "Lime Wedge or Twist"
        }
      ]
    }
  }
}
```
:::

これらのオブジェクトのどのフィールドにデータが含まれるかによって、最終的なブロックタイプが決まります。

複数のブロックタイプが定義されている場合、最初にリストされているブロックタイプだけが考慮されます。
:::

### ミューテーション経由のファイルのアップロード

You can provide files for Assets as either Base64-encoded data, or a URL that Craft will download.

いずれにしても、ファイルをアップロードするには、`FileInput` GraphQL 入力タイプを利用しなければなりません。 次のフィールドがあります。

| フィールド      | 説明                                             |
| ---------- | ---------------------------------------------- |
| `url`      | URL of a file to be downloaded.                |
| `fileData` | Base64 形式のファイルの内容。 指定した場合、URL よりも優先されます。       |
| `filename` | ファイルに利用するファイル名。 指定がない場合、Craft は自身でファイル名を見つけます。 |

### エントリのミューテート

#### エントリの保存

エントリを保存するには、`save_<sectionHandle>_<entryTypeHandle>_Entry` 形式の名前を持つ、エントリタイプ固有のミューテーションを利用します。

<!-- BEGIN ENTRY MUTATION ARGS -->

| 引数           | タイプ        | 説明                                     |
| ------------ | ---------- | -------------------------------------- |
| `id`         | `ID`       | エレメントの ID をセットします。                     |
| `uid`        | `String`   | エレメントの UID をセットします。                    |
| `title`      | `String`   | エレメントのタイトル。                            |
| `enabled`    | `Boolean`  | エレメントを有効にするかどうか。                       |
| `authorId`   | `ID`       | このエントリを作成したユーザーの ID。                   |
| `postDate`   | `DateTime` | エントリがいつ投稿されるべきか。                       |
| `expiryDate` | `DateTime` | エントリをいつ有効期限切れにするか。                     |
| `slug`       | `String`   | エレメントのスラグに基づいて、クエリの結果を絞り込みます。          |
| `siteId`     | `Int`      | エレメントを保存するサイトを決定します。 デフォルトはプライマリサイトです。 |
| `...`        |            | フィールドレイアウトに応じた、より多くの引数。                |

<!-- END ENTRY MUTATION ARGS -->

引数 `id`、`uid`、および、`authorId` は、シングルのエントリには存在しません。 シングルのエントリは投稿者を持たず、正確なミューテーションによって既に識別されているからです。 同様に、ストラクチャーエントリで利用可能な追加の引数があります。 詳細については、[構造データのミューテート](#mutating-structure-data)を参照してください。

::: tip
After saving an entry, Craft runs queue jobs for updating revisions and search indexes. If you’re using Craft headlessly or infrequently accessing the control panel, consider disabling <config3:runQueueAutomatically> and [establishing an always-running daemon](https://nystudio107.com/blog/robust-queue-job-handling-in-craft-cms) to keep revisions and search indexes up to date.
:::

#### 下書きの保存

You can modify existing entries by passing the populated `id` argument to your mutation.

#### 下書きの作成・公開

エントリの下書きを保存するには、`save_<sectionHandle>_<entryTypeHandle>_Draft` 形式の名前を持つ、エントリタイプ固有のミューテーションを利用します。

<!-- BEGIN DRAFT MUTATION ARGS -->

| 引数           | タイプ        | 説明                                     |
| ------------ | ---------- | -------------------------------------- |
| `title`      | `String`   | エレメントのタイトル。                            |
| `enabled`    | `Boolean`  | エレメントを有効にするかどうか。                       |
| `authorId`   | `ID`       | このエントリを作成したユーザーの ID。                   |
| `postDate`   | `DateTime` | エントリがいつ投稿されるべきか。                       |
| `expiryDate` | `DateTime` | エントリをいつ有効期限切れにするか。                     |
| `slug`       | `String`   | エレメントのスラグに基づいて、クエリの結果を絞り込みます。          |
| `siteId`     | `Int`      | エレメントを保存するサイトを決定します。 デフォルトはプライマリサイトです。 |
| `draftId`    | `ID!`      | 下書きの ID。                               |
| `draftName`  | `String`   | 下書きの名前。                                |
| `draftNotes` | `String`   | 下書きのメモ。                                |
| `...`        |            | フィールドレイアウトに応じた、より多くの引数。                |

<!-- END DRAFT MUTATION ARGS -->

#### エントリの削除

下書きを作成するには、`createDraft` ミューテーションを利用します。 これは下書きを作成するエントリの `id` を引数として必要とし、結果として下書きの ID を返します。

下書きを公開するには、`publishDraft` ミューテーションを利用します。 これは公開する下書きの `id` を引数として必要とし、結果としてそれが属するエントリの ID を返します。

#### アセットの保存

エントリを削除するには、`deleteEntry` ミューテーションを利用します。 これは削除されるエントリの `id` が必要です。 結果として操作が成功したかどうかを示すブーリアン値を返します。

### アセットのミューテート

#### アセットの削除

To create or update an [asset](assets.md), use the volume-specific mutation which will have a name in the form of `save_<volumeHandle>_Asset`:

<!-- BEGIN ASSET MUTATION ARGS -->

| 引数            | タイプ         | 説明                      |
| ------------- | ----------- | ----------------------- |
| `id`          | `ID`        | エレメントの ID をセットします。      |
| `uid`         | `String`    | エレメントの UID をセットします。     |
| `title`       | `String`    | エレメントのタイトル。             |
| `enabled`     | `Boolean`   | エレメントを有効にするかどうか。        |
| `_file`       | `FileInput` | このアセットに利用するファイル。        |
| `newFolderId` | `ID`        | このアセットの新しいフォルダの ID。     |
| `...`         |             | フィールドレイアウトに応じた、より多くの引数。 |

<!-- END ASSET MUTATION ARGS -->

#### タグの保存

アセットを削除するには、`deleteAsset` ミューテーションを利用します。 これは削除されるアセットの `id` が必要です。 結果として操作が成功したかどうかを示すブーリアン値を返します。

### タグのミューテート

#### タグの削除

To create or update a [tag](tags.md), use the tag group-specific mutation which will have a name in the form of `save_<tagGroupHandle>_Tag`:

<!-- BEGIN TAG MUTATION ARGS -->

| 引数        | タイプ       | 説明                      |
| --------- | --------- | ----------------------- |
| `id`      | `ID`      | エレメントの ID をセットします。      |
| `uid`     | `String`  | エレメントの UID をセットします。     |
| `title`   | `String`  | エレメントのタイトル。             |
| `enabled` | `Boolean` | エレメントを有効にするかどうか。        |
| `...`     |           | フィールドレイアウトに応じた、より多くの引数。 |

<!-- END TAG MUTATION ARGS -->

#### カテゴリの保存

タグを削除するには、`deleteTag` ミューテーションを利用します。 これは削除されるタグの `id` が必要です。 結果として操作が成功したかどうかを示すブーリアン値を返します。

### カテゴリのミューテート

#### カテゴリの削除

To create or update a [category](categories.md), use the category group-specific mutation which will have a name in the form of `save_<categoryGroupHandle>_Tag`.

<!-- BEGIN CATEGORY MUTATION ARGS -->

| 引数        | タイプ       | 説明                      |
| --------- | --------- | ----------------------- |
| `id`      | `ID`      | エレメントの ID をセットします。      |
| `uid`     | `String`  | エレメントの UID をセットします。     |
| `title`   | `String`  | エレメントのタイトル。             |
| `enabled` | `Boolean` | エレメントを有効にするかどうか。        |
| `...`     |           | フィールドレイアウトに応じた、より多くの引数。 |

<!-- END CATEGORY MUTATION ARGS -->

#### Deleting a Category

カテゴリを削除するには、`deleteCategory` ミューテーションを利用します。 これは削除されるカテゴリの `id` が必要です。 結果として操作が成功したかどうかを示すブーリアン値を返します。

### 構造データのミューテート

ストラクチャーセクションに属するエントリやカテゴリは、構造の一部です。 構造内のそれらの場所を操作するには、適切なミューテーションを利用してエレメントを保存し、次の引数を利用します。

<!-- BEGIN STRUCTURE MUTATION ARGS -->

| 引数              | タイプ       | 説明                         |
| --------------- | --------- | -------------------------- |
| `prependTo`     | `ID`      | 先頭に追加するエレメントの ID。          |
| `appendTo`      | `ID`      | 最後に追加するエレメントの ID。          |
| `prependToRoot` | `Boolean` | この要素をルートの先頭に追加するかどうか。      |
| `appendToRoot`  | `Boolean` | この要素をルートの最後に追加するかどうか。      |
| `insertBefore`  | `ID`      | このエレメントが前に挿入される、エレメントの ID。 |
| `insertAfter`   | `ID`      | このエレメントが後に挿入される、エレメントの ID。 |

<!-- END STRUCTURE MUTATION ARGS -->

### グローバル設定のミューテート

グローバル設定を更新するには、`save_<globalSetHandle>_GlobalSet` 形式の名前を持つ、適切なミューテーションを利用します。

The only available arguments are custom fields on the global set.

### ユーザーのミューテート

It’s currently not possible to mutate users with Craft’s GraphQL API.
