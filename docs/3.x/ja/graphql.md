---
keywords: headless
---

# GraphQL API

Craft Pro は、コンテンツのための自動生成された[GraphQL](https://graphql.org) API を提供します。これをクエリして、シングルページアプリケーション（SPA）や静的サイトジェネレーターなど、別のアプリケーションに取り込むことができます。

## クエリとレスポンスの実例

### クエリのペイロード

```graphql
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

### クエリとレスポンスの実例

```json
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

## はじめよう

はじめに、Craft Pro 3.3 以降を稼働し、さらに、[`enableGql` 設定](config3:enableGql) が `false` にセットされていないことを確認してください。

### API エンドポイントの作成

プロジェクトに GraphQL API を追加するための最初のステップは、パブリックエンドポイントを設定することです。

そのためには、`config/routes.php` から `graphql/api` コントローラーアクションを指す [URL ルール](routing.md#advanced-routing-with-url-rules)を作成します。例えば、次の URL ルールは `/api` リクエストを GraphQL API にルーティングします。

```php
return [
    'api' => 'graphql/api',
    // ...
];
```

エンドポイントが正しく設定されていることを確認するには、`{ping}` クエリを送信してみてください。

```bash
curl -H "Content-Type: application/graphql" -d '{ping}' http://my-project.test/api
```

（`http://my-project.test/api` を実際のエンドポイントの URL に置き換えてください。）

次の JSON レスポンスが返される場合、GraphQL API は稼働しています！

```json
{"data":{"ping":"pong"}}
```

### スキーマの定義

GraphQL API エンドポイントを作成したら、そこからどのコンテンツを利用可能にするかを Craft に伝える必要があります。（デフォルトでは利用可能なコンテンツはありません。） そのために、**スキーマ**を定義します。

Craft は2つのタイプのスキーマがあります。

- **公開スキーマ**は、利用可能な公開コンテンツを定義します。
- それぞれに独自のシークレット**アクセストークン**を持つ、複数のプライベートスキーマを定義することもできます。

スキーマは、コントロールパネルの「GraphQL > スキーマ」から管理できます。スキーマごとのスコープを定義することに加えて、有効期限日を指定したり、無効にしたりすることもできます。

::: tip
GraphQL API リクエストを実行すると、指定されたトークン（があれば、それ）に基づいて、スキーマが自動的に決定されます。その方法を知るには、[こちら](#querying-a-private-schema)を参照してください。
:::

## API リクエストの送信

### GraphiQL IDE を利用

GraphQL API の探索を開始する最も簡単な方法は、組み込みの [GraphiQL](https://github.com/graphql/graphiql) IDE を使うことです。これは、コントロールパネルの「GraphQL > GraphiQL」から利用できます。

![組み込みの GraphiQL IDE](./images/graphiql.png)

### 別の IDE を利用

別の GraphQL IDE も利用できます。

* [Insomnia](https://insomnia.rest/)
* [GraphQL Playground](https://github.com/prisma/graphql-playground)
* [GraphQL Playground online](https://www.graphqlbin.com/v2/new)

::: tip
はじめて API を探索する場合、利用可能なスキーマ全体について IDE が情報を得られるように、[Dev Mode](config3:devMode) が有効になっているか確認してください。
:::

### リクエストを手動で送信

GraphQL API は3つの方法で照会できます。

- `GET` リクエストを利用し、GraphQL クエリを `query` パラメータで定義します。
   ```bash
   curl \
     --data-urlencode "query={ping}" \
     http://craft32.test/api
   # or
   curl http://craft32.test/api?query=%7Bping%7D
   ```
- `application/json` コンテンツタイプの `POST` リクエストを利用し、GraphQL クエリを `query` キーで定義します。
   ```bash
   curl \
     -H "Content-Type: application/json" \
     -d '{"query":"{ping}"}' \
     http://my-project.test/api
   ```
- `application/graphql` コンテンツタイプの `POST` リクエストを利用し、GraphQL クエリを生のリクエストボディで定義します。
   ```bash
   curl \
     -H "Content-Type: application/graphql" \
     -d '{ping}' \
     http://my-project.test/api
   ```

#### 変数の指定

クエリと一緒に [variables](https://graphql.org/learn/queries/#variables) を指定する必要がある場合、`application/json` コンテンツタイプの `POST` リクエストとしてリクエスト送信し、`query` と一緒に JSON 本体に `variables` キーを含めなければいけません。

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

デフォルトでは、公開スキーマが使用されます。別の[スキーマ](#define-your-schemas)に対してクエリを実行するには、`Authorization` ヘッダーを利用してアクセストークンを渡します。

```bash
curl \
  -H "Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/graphql" \
  -d '{entries{id}}' \
  http://my-project.test/api
```

## キャッシング

すべてのクエリ結果はキャッシュされるため、繰り返されたクエリはより早く結果を得られます。GraphQL の結果のキャッシュは、キャッシュを無効化に関する高度なルールセットを持ちません。サイトのコンテンツ、または、構造を変更すると、すべてのキャッシュが無効になります。

Craft は GraphQL の結果のキャッシュをデフォルトで有効にしていますが、コンフィグ設定 [enableGraphQlCaching](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#enablegraphqlcaching) で無効にできます。

## インターフェースの実装

それぞれ特定のインターフェース実装のために、定義されたタイプが存在します。例えば、「ニュース」セクションに「アーティクル」と「エディトリアル」入力タイプを持つ場合、（トークンが利用を許可していれば）`EntryInterface` インターフェースタイプに加え、2つの追加タイプが GraphQL スキーマで定義されます。 それが `news_article_Entry` および `news_editorial_Entry` タイプです。

## クエリのリファレンス

::: tip
実際の API 機能は、スキーマが許可するものに依存します。
:::

<!-- BEGIN QUERIES -->

### `assets` クエリ
このクエリはアセットの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `volumeId`| `[QueryArgument]` | ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `volume`| `[String]` | ボリュームのハンドルごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `folderId`| `[QueryArgument]` | フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。
| `filename`| `[String]` | アセットのファイル名に基づいて、クエリの結果を絞り込みます。
| `kind`| `[String]` | アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。
| `height`| `[String]` | アセットの画像の高さに基づいて、クエリの結果を絞り込みます。
| `width`| `[String]` | アセットの画像の幅に基づいて、クエリの結果を絞り込みます。
| `size`| `[String]` | アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。
| `dateModified`| `String` | アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。
| `includeSubfolders`| `Boolean` | `folderId` で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。
| `withTransforms`| `[String]` | プリロードするトランスフォームハンドルのリスト。
| `uploader`| `QueryArgument` | ユーザーの ID ごとに、アセットをアップロードしたユーザーに基づいて、クエリの結果を絞り込みます。

### `assetCount` クエリ
このクエリはアセットの数を返すために利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `volumeId`| `[QueryArgument]` | ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `volume`| `[String]` | ボリュームのハンドルごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `folderId`| `[QueryArgument]` | フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。
| `filename`| `[String]` | アセットのファイル名に基づいて、クエリの結果を絞り込みます。
| `kind`| `[String]` | アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。
| `height`| `[String]` | アセットの画像の高さに基づいて、クエリの結果を絞り込みます。
| `width`| `[String]` | アセットの画像の幅に基づいて、クエリの結果を絞り込みます。
| `size`| `[String]` | アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。
| `dateModified`| `String` | アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。
| `includeSubfolders`| `Boolean` | `folderId` で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。
| `withTransforms`| `[String]` | プリロードするトランスフォームハンドルのリスト。
| `uploader`| `QueryArgument` | ユーザーの ID ごとに、アセットをアップロードしたユーザーに基づいて、クエリの結果を絞り込みます。

### `asset` クエリ
このクエリは単一アセットの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `volumeId`| `[QueryArgument]` | ボリュームの ID ごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `volume`| `[String]` | ボリュームのハンドルごとに、アセットが属するボリュームに基づいて、クエリの結果を絞り込みます。
| `folderId`| `[QueryArgument]` | フォルダの ID ごとに、アセットが属するフォルダに基づいて、クエリの結果を絞り込みます。
| `filename`| `[String]` | アセットのファイル名に基づいて、クエリの結果を絞り込みます。
| `kind`| `[String]` | アセットのファイルの種類に基づいて、クエリの結果を絞り込みます。
| `height`| `[String]` | アセットの画像の高さに基づいて、クエリの結果を絞り込みます。
| `width`| `[String]` | アセットの画像の幅に基づいて、クエリの結果を絞り込みます。
| `size`| `[String]` | アセットのファイルサイズ（バイト単位）に基づいて、クエリの結果を絞り込みます。
| `dateModified`| `String` | アセットファイルの最終更新日に基づいて、クエリの結果を絞り込みます。
| `includeSubfolders`| `Boolean` | `folderId` で指定されたフォルダのすべてのサブフォルダにあるアセットを含むよう、クエリの結果を拡張します。
| `withTransforms`| `[String]` | プリロードするトランスフォームハンドルのリスト。
| `uploader`| `QueryArgument` | ユーザーの ID ごとに、アセットをアップロードしたユーザーに基づいて、クエリの結果を絞り込みます。

### `entries` クエリ
このクエリはエントリの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つエレメントだけを返すかどうか。
| `section`| `[String]` | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。
| `sectionId`| `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。
| `type`| `[String]` | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。
| `typeId`| `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。
| `authorId`| `[QueryArgument]` | エントリの投稿者に基づいて、クエリの結果を絞り込みます。
| `authorGroup`| `[String]` | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `authorGroupId`| `[QueryArgument]` | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `postDate`| `[String]` | エントリの投稿日に基づいて、クエリの結果を絞り込みます。
| `before`| `String` | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `after`| `String` | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `expiryDate`| `[String]` | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。

### `entryCount` クエリ
このクエリはエントリの数を返すために利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つエレメントだけを返すかどうか。
| `section`| `[String]` | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。
| `sectionId`| `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。
| `type`| `[String]` | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。
| `typeId`| `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。
| `authorId`| `[QueryArgument]` | エントリの投稿者に基づいて、クエリの結果を絞り込みます。
| `authorGroup`| `[String]` | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `authorGroupId`| `[QueryArgument]` | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `postDate`| `[String]` | エントリの投稿日に基づいて、クエリの結果を絞り込みます。
| `before`| `String` | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `after`| `String` | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `expiryDate`| `[String]` | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。

### `entry` クエリ
このクエリは単一エントリの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つエレメントだけを返すかどうか。
| `section`| `[String]` | エントリが属するセクションハンドルに基づいて、クエリの結果を絞り込みます。
| `sectionId`| `[QueryArgument]` | セクションの ID ごとに、エントリが属するセクションに基づいて、クエリの結果を絞り込みます。
| `type`| `[String]` | エントリの入力タイプのハンドルに基づいて、クエリの結果を絞り込みます。
| `typeId`| `[QueryArgument]` | タイプの ID ごとに、エントリの入力タイプに基づいて、クエリの結果を絞り込みます。
| `authorId`| `[QueryArgument]` | エントリの投稿者に基づいて、クエリの結果を絞り込みます。
| `authorGroup`| `[String]` | エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `authorGroupId`| `[QueryArgument]` | グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `postDate`| `[String]` | エントリの投稿日に基づいて、クエリの結果を絞り込みます。
| `before`| `String` | 特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `after`| `String` | 特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。
| `expiryDate`| `[String]` | エントリの有効期限日に基づいて、クエリの結果を絞り込みます。

### `globalSets` クエリ
このクエリはグローバル設定の照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `handle`| `[String]` | グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。

### `globalSet` クエリ
このクエリは単一グローバル設定の照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `handle`| `[String]` | グローバル設定のハンドルに基づいて、クエリの結果を絞り込みます。

### `users` クエリ
このクエリはユーザーの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `email`| `[String]` | ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。
| `username`| `[String]` | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。
| `firstName`| `[String]` | ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。
| `lastName`| `[String]` | ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。
| `hasPhoto`| `Boolean` | ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `group`| `[QueryArgument]` | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

### `userCount` クエリ
このクエリはユーザーの数を返すために利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `email`| `[String]` | ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。
| `username`| `[String]` | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。
| `firstName`| `[String]` | ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。
| `lastName`| `[String]` | ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。
| `hasPhoto`| `Boolean` | ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `group`| `[QueryArgument]` | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

### `user` クエリ
このクエリは単一ユーザーの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `email`| `[String]` | ユーザーのメールアドレスに基づいて、クエリの結果を絞り込みます。
| `username`| `[String]` | ユーザーのユーザー名に基づいて、クエリの結果を絞り込みます。
| `firstName`| `[String]` | ユーザーのファーストネーム（名）に基づいて、クエリの結果を絞り込みます。
| `lastName`| `[String]` | ユーザーのラストネーム（姓）に基づいて、クエリの結果を絞り込みます。
| `hasPhoto`| `Boolean` | ユーザー写真を持っている（または、持っていない）ユーザーだけに、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループ ID ごとに、ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。
| `group`| `[QueryArgument]` | ユーザーが属するユーザーグループに基づいて、クエリの結果を絞り込みます。

### `tags` クエリ
このクエリはタグの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `group`| `[String]` | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。

### `tagCount` クエリ
このクエリはタグの数を返すために利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `group`| `[String]` | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。

### `tag` クエリ
このクエリは単一タグの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `group`| `[String]` | グループのハンドルごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、タグが属するタググループに基づいて、クエリの結果を絞り込みます。

### `categories` クエリ
このクエリはカテゴリの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つカテゴリだけを返すかどうか。
| `group`| `[String]` | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。

### `categoryCount` クエリ
このクエリはカテゴリの数を返すために利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つカテゴリだけを返すかどうか。
| `group`| `[String]` | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。

### `category` クエリ
このクエリは単一カテゴリの照会で利用されます。
| 引数 | タイプ | 説明
| - | - | -
| `id`| `[QueryArgument]` | エレメントの ID に基づいて、クエリの結果を絞り込みます。
| `uid`| `[String]` | エレメントの UID に基づいて、クエリの結果を絞り込みます。
| `drafts`| `Boolean` | 下書きのエレメントが返されるかどうか。
| `draftOf`| `QueryArgument` | 下書きが返されるソースエレメントの ID。保存されていない下書きを取得するには `false` をセットします。
| `draftId`| `Int` | 返す下書きの ID（`drafts` テーブルから）
| `draftCreator`| `Int` | 下書きの投稿者 ID
| `revisions`| `Boolean` | リビジョンのエレメントが返されるかどうか。
| `revisionOf`| `QueryArgument` | リビジョンが返されるソースエレメントの ID
| `revisionId`| `Int` | 返すリビジョンの ID（`revisions` テーブルから）
| `revisionCreator`| `Int` | リビジョンの投稿者 ID
| `status`| `[String]` | エレメントのステータスに基づいて、クエリの結果を絞り込みます。
| `archived`| `Boolean` | アーカイブされたエレメントだけに、クエリの結果を絞り込みます。
| `trashed`| `Boolean` | ソフトデリートされたエレメントだけに、クエリの結果を絞り込みます。
| `site`| `[String]` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `siteId`| `String` | エレメントを照会するサイトを決定します。デフォルトは現在の（リクエストされた）サイトです。
| `unique`| `Boolean` | クエリによってユニークな ID のエレメントだけが返されるかを決定します。
| `enabledForSite`| `Boolean` | 引数 `site` ごとに、照会されているサイトでエレメントが有効になっているかどうかに基づいて、クエリの結果を絞り込みます。
| `title`| `[String]` | エレメントのタイトルに基づいて、クエリの結果を絞り込みます。
| `slug`| `[String]` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `uri`| `[String]` | エレメントの URI に基づいて、クエリの結果を絞り込みます。
| `search`| `String` | 検索結果にマッチするエレメントだけに、クエリの結果を絞り込みます。
| `relatedTo`| `[Int]` | 指定されたエレメント ID の *いずれか* に関連する要素に、クエリの結果を絞り込みます。`relatedToAll` も利用されている場合、この引数は無視されます。
| `relatedToAll`| `[Int]` | 指定されたエレメント ID の *すべて* に関連する要素に、クエリの結果を絞り込みます。この引数を使用すると、`relatedTo` の引数は無視されます。
| `ref`| `[String]` | 参照文字列に基づいて、クエリの結果を絞り込みます。
| `fixedOrder`| `Boolean` | クエリの結果を引数 `id` で指定された順序で返します。
| `inReverse`| `Boolean` | クエリの結果を逆順で返します。
| `dateCreated`| `[String]` | エレメントの作成日に基づいて、クエリの結果を絞り込みます。
| `dateUpdated`| `[String]` | エレメントの最終アップデート日に基づいて、クエリの結果が絞り込まれます。
| `offset`| `Int` | ページ分割された結果のオフセットを設定します。
| `limit`| `Int` | ページ分割された結果のリミットを設定します。
| `orderBy`| `String` | 返されるエレメントを並び替えるフィールドを設定します。
| `withStructure`| `Boolean` | クエリがストラクチャーデータを結合するかどうかを明示的に決定します。
| `structureId`| `Int` | クエリに結合されるストラクチャーデータを決定します。
| `level`| `Int` | ストラクチャー内のエレメントのレベルに基づいて、クエリの結果を絞り込みます。
| `hasDescendants`| `Boolean` | エレメントが子孫を持つかどうかに基づいて、クエリの結果を絞り込みます。
| `ancestorOf`| `Int` | 指定した他のエレメントの先祖であるエレメントだけに、クエリの結果を絞り込みます。
| `ancestorDist`| `Int` | `ancestorOf` で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `descendantOf`| `Int` | 指定した他のエレメントの子孫であるエレメントだけに、クエリの結果を絞り込みます。
| `descendantDist`| `Int` | `descendantOf`で指定されたエレメントから特定の距離だけ離れているエレメントのみに、クエリの結果を絞り込みます。
| `leaves`| `Boolean` | エレメントが「leaves」（子孫のないエントリ）であるかどうかに基づいて、クエリの結果を絞り込みます。
| `nextSiblingOf`| `Int` | 指定したエレメントの直後にあるエレメントだけに、クエリの結果を絞り込みます。
| `prevSiblingOf`| `Int` | 指定したエレメントの直前にあるエレメントだけに、クエリの結果を絞り込みます。
| `positionedAfter`| `Int` | 指定したエレメントの後に位置するエレメントだけに、クエリの結果を絞り込みます。
| `positionedBefore`| `Int` | 指定したエレメントの前に位置するエレメントだけに、クエリの結果を絞り込みます。
| `editable`| `Boolean` | ユーザーが編集権限を持つカテゴリだけを返すかどうか。
| `group`| `[String]` | グループのハンドルごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。
| `groupId`| `[QueryArgument]` | グループの ID ごとに、カテゴリが属するカテゴリグループに基づいて、クエリの結果を絞り込みます。

<!-- END QUERIES -->

## 利用可能なディレクティブのリスト
ディレクティブは権限によって規制されておらず、返されるデータがどのように表示されるかに影響します。

<!-- BEGIN DIRECTIVES -->

### `formatDateTime` ディレクティブ
このディレクティブは、日付を任意の書式にフォーマットできます。すべてのフィールドに適用できますが、DateTime フィールドに適用した場合のみ変更します。
| 引数 | タイプ | 説明
| - | - | -
| `format`| `String` | 利用する書式を指定します。`short`、`medium`、`long`、`full`、[ICU date フォーマット](http://userguide.icu-project.org/formatparse/datetime)、または、[PHP date フォーマット](https://www.php.net/manual/en/function.date.php)を指定できます。デフォルトは [Atom date time フォーマット](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.atom])です。
| `timezone`| `String` | タイムゾーンのフルネーム。デフォルトは UTC です。（例：America/New_York）
| `locale`| `String` | 日付をフォーマットする際に利用するロケール。（例：en-US）


### `transform` ディレクティブ
このディレクティブは、[画像変換](/docs/3.x/ja/image-transforms.html)の URL を返すために利用されます。Craft で変換するために利用するのと同じ引数を受け入れ、引数 `immediately` を追加します。
| 引数 | タイプ | 説明
| - | - | -
| `handle`| `String` | 利用する名前付けされた画像変換のハンドル。
| `transform`| `String` | 利用する名前付けされた画像変換のハンドル。
| `width`| `Int` | 生成された変換の幅。
| `height`| `Int` | 生成された変換の高さ。
| `mode`| `String` | 生成された変換に利用するモード。
| `position`| `String` | 焦点が指定されていない場合、切り抜きに利用する位置。
| `interlace`| `String` | 変換に利用するインタレースモード。
| `quality`| `Int` | 変換の品質。
| `format`| `String` | 変換の画像フォーマット。
| `immediately`| `Boolean` | 変換をすぐに生成するか、生成された URL を利用して画像がリクエストされた時だけ生成するかどうか。


### `markdown` ディレクティブ
渡されたフィールド値を Markdown として解析します。
| 引数 | タイプ | 説明
| - | - | -
| `flavor`| `String` | 入力内容が解釈されるべき、Markdown の「flavor」。yii\helpers\Markdown::process() と同じ引数を受け入れます。
| `inlineOnly`| `Boolean` | `<p>` タグを除き、インライン要素だけを解析するかどうか。

<!-- END DIRECTIVES -->

## 定義済みインターフェース
Craft は、異なる GraphQL タイプによって実装される、いくつかのインターフェースを定義しています。

<!-- BEGIN INTERFACES -->

### `AssetInterface` インターフェース
これは、すべてのアセットで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `volumeId`| `Int` | アセットが属するボリュームの ID。
| `folderId`| `Int` | アセットが属するフォルダの ID。
| `filename`| `String` | アセットファイルのファイル名。
| `extension`| `String` | アセットファイルのファイル拡張子。
| `hasFocalPoint`| `Boolean` | アセットにユーザー定義の焦点がセットされているかどうか。
| `focalPoint`| `[Float]` | `x` と `y` キーを持つ配列で表される焦点。画像でない場合は null。
| `kind`| `String` | ファイルの種類。
| `size`| `String` | バイト単位のファイルサイズ。
| `height`| `Int` | ピクセル単位の高さ。画像でない場合は null。
| `width`| `Int` | ピクセル単位の幅。画像でない場合は null。
| `img`| `String` | このアセットに基づく `<img>` タグ。
| `url`| `String` | アセットのフル URL。このフィールドは、`transform` ディレクティブと同じフィールドを受け入れます。
| `mimeType`| `String` | 判別できる場合、ファイルの MIME タイプ。
| `path`| `String` | ボリューム内のアセットのパス。
| `dateModified`| `DateTime` | アセットファイルが最後に更新された日付。
| `prev`| `AssetInterface` | 指定された基準から、これに関連する前のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。
| `next`| `AssetInterface` | 指定された基準から、これに関連する次のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。


### `EntryInterface` インターフェース
これは、すべてのエントリで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `lft`| `Int` | ストラクチャー内でのエレメントの左の位置。
| `rgt`| `Int` | ストラクチャー内でのエレメントの右の位置。
| `level`| `Int` | ストラクチャー内でのエレメントのレベル。
| `root`| `Int` | エレメントのストラクチャーのルート ID。
| `structureId`| `Int` | エレメントのストラクチャー ID。
| `isDraft`| `Boolean` | 下書きかどうかを返します。
| `isRevision`| `Boolean` | リビジョンかどうかを返します。
| `sourceId`| `Int` | エレメントの ID、または、下書き/リビジョンの場合、ソースエレメントの ID を返します。
| `sourceUid`| `String` | エレメントの UUID、または、下書き/リビジョンの場合、ソースエレメントの UUID を返します。
| `draftId`| `Int` | 返される下書きの ID（`drafts` テーブルから）。
| `isUnsavedDraft`| `Boolean` | 下書きかどうかを返します。
| `draftName`| `String` | 下書きの名前。
| `draftNotes`| `String` | 下書きのメモ。
| `sectionId`| `Int` | エントリを含むセクションの ID。
| `sectionHandle`| `String` | エントリを含むセクションのハンドル。
| `typeId`| `Int` | エントリを含む入力タイプの ID。
| `typeHandle`| `String` | エントリを含む入力タイプのハンドル。
| `postDate`| `DateTime` | エントリの投稿日。
| `expiryDate`| `DateTime` | エントリの有効期限日。
| `children`| `[EntryInterface]` | セクションがストラクチャーの場合、エントリの子。`entries` クエリと同じ引数を受け入れます。
| `parent`| `EntryInterface` | セクションがストラクチャーの場合、エントリの親。
| `url`| `String` | エレメントのフル URL。
| `localized`| `[EntryInterface]` | 他のロケールの同じエレメント。
| `prev`| `EntryInterface` | 指定された基準から、これに関連する前のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。
| `next`| `EntryInterface` | 指定された基準から、これに関連する次のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。


### `GlobalSetInterface` インターフェース
これは、すべてのグローバル設定で実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `name`| `String` | グローバル設定の名前。
| `handle`| `String` | グローバル設定のハンドル。


### `MatrixBlockInterface` インターフェース
これは、すべての行列ブロックで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `fieldId`| `Int` | 行列ブロックを所有するフィールドの ID。
| `ownerId`| `Int` | 行列ブロックを所有するエレメントの ID。
| `typeId`| `Int` | 行列ブロックタイプの ID。
| `typeHandle`| `String` | 行列ブロックタイプのハンドル。
| `sortOrder`| `Int` | 所有するエレメントフィールド内での行列ブロックのソート順。


### `UserInterface` インターフェース
これは、すべてのユーザーで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `photo`| `AssetInterface` | ユーザーのフォト。
| `friendlyName`| `String` | ユーザーのファーストネーム、または、ユーザー名。
| `fullName`| `String` | ユーザーのフルネーム。
| `name`| `String` | ユーザーのフルネーム、または、ユーザー名。
| `preferences`| `String` | ユーザーの設定。
| `preferredLanguage`| `String` | ユーザーの優先する言語。
| `username`| `String` | ユーザー名。
| `firstName`| `String` | ユーザーのファーストネーム。
| `lastName`| `String` | ユーザーのラストネーム。
| `email`| `String` | ユーザーのメールアドレス。


### `CategoryInterface` インターフェース
これは、すべてのカテゴリで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `lft`| `Int` | ストラクチャー内でのエレメントの左の位置。
| `rgt`| `Int` | ストラクチャー内でのエレメントの右の位置。
| `level`| `Int` | ストラクチャー内でのエレメントのレベル。
| `root`| `Int` | エレメントのストラクチャーのルート ID。
| `structureId`| `Int` | エレメントのストラクチャー ID。
| `groupId`| `Int` | カテゴリを含むグループの ID。
| `groupHandle`| `String` | カテゴリを含むグループのハンドル。
| `children`| `[CategoryInterface]` | カテゴリの子。
| `parent`| `CategoryInterface` | カテゴリの親。
| `url`| `String` | エレメントのフル URL。
| `localized`| `[CategoryInterface]` | 他のロケールの同じエレメント。
| `prev`| `CategoryInterface` | 指定された基準から、これに関連する前のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。
| `next`| `CategoryInterface` | 指定された基準から、これに関連する次のエレメントを返します。注意：このフィールドに引数を適用すると、クエリのパフォーマンスが大幅に低下します。


### `TagInterface` インターフェース
これは、すべてのタグで実装されたインターフェースです。
| フィールド | タイプ | 説明
| - | - | -
| `id`| `ID` | エンティティの ID。
| `uid`| `String` | エンティティの UID。
| `_count`| `Int` | フィールドに関連付けられたエレメントの数を返します。
| `title`| `String` | エレメントのタイトル。
| `slug`| `String` | エレメントのスラグ。
| `uri`| `String` | エレメントの URI。
| `enabled`| `Boolean` | エレメントが有効かどうか。
| `archived`| `Boolean` | エレメントがアーカイブされているかどうか。
| `siteId`| `Int` | エレメントが関連付けられているサイトの ID。
| `language`| `String` | エレメントが関連付けられているサイトの言語。
| `searchScore`| `String` | エレメントの照会で `search` パラメータが利用された場合のエレメントの検索スコア。
| `trashed`| `Boolean` | エレメントがソフトデリートされているかどうか。
| `status`| `String` | エレメントのステータス。
| `dateCreated`| `DateTime` | エレメントが作成された日付。
| `dateUpdated`| `DateTime` | エレメントが最後にアップデートされた日付。
| `groupId`| `Int` | タグを含むグループの ID。
| `groupHandle`| `String` | タグを含むグループのハンドル。

<!-- END INTERFACES -->

## ミューテーション

::: tip
実際の API 機能は、スキーマが許可するものに依存します。
:::

GraphQL のミューテーションは、データを変更する方法を提供します。実際のミューテーションは、スキーマによって異なります。GraphQL オブジェクトタイプごとに、一般的なミューテーションとタイプ固有のミューテーションがあります。

ミューテーションはデータを引数として受け取り、ほとんどの場合は単純ですが、頭に入れておくべきポイントがいくつかあります。

### ミューテーションの行列フィールド

GraphQL の制限により、入力タイプはあまり柔軟ではなく、行列フィールドはとても複雑です。そのため、ドキュメント内で独自のセクションを与えられています。慣れていない場合、はじめに[投稿フォーム内で行列フィールドのデータをどのように保存するか](matrix-fields.md#saving-matrix-fields-in-entry-forms)を読むことをお勧めします。

一般的に、行列入力タイプは同じ構造を持っています。

| フィールド | 説明
| - | -
| `sortOrder`| ミューテーション後に行列フィールドを必要な順序で維持するための、すべてのブロック ID のリスト。これには、すべての新しいブロックも含みます。
| `blocks` | すべての実際のブロックのリスト。変更されないブロックを含める必要はありませんが、それらを削除したくない場合、`sortOrder` フィールドで表す必要があります。

実際のブロック入力タイプは、このフィールドで可能なすべてのブロックタイプのフィールドを含みますが、最初の空ではないブロックは、ブロックタイプがフィールドで定義されている順序に考慮されます。

実例を見てみましょう。

ハンドル `documentationField` の行列フィールドがあるとします。そのフィールドは、`screenshot` と `paragraph` の2つのブロックタイプがあります。この行列フィールドのために生成されたすべての入力タイプのリストは、次の通りです。

| タイプ名 | タイプの説明 |
| - | -
| `documentationField_MatrixInput` | これは行列フィールドの入力タイプです。前述のように、`sortOrder` と `blocks` の2つのフィールドが含まれます。
| `documentationField_MatrixBlockContainerInput` | これはブロックを表す入力タイプです。この場合、`screenshot` と `paragraph` の2つのフィールドが含まれます。
| `documentationField_screenshot_MatrixBlockInput` | これは `screenshot` ブロックの入力タイプです。ブロックタイプに定義されたすべてのフィールドが含まれます。
| `documentationField_paragraph_MatrixBlockInput` | 同様に、これは `paragraph` ブロックの入力タイプです。

GraphQL SDL では、次のようになります。

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
```

2つのブロックを送信すると、`blocks` には `documentationField_MatrixBlockContainerInput` 入力タイプの2つの入力オブジェクトのリストが含まれます。これらのオブジェクトのどのフィールドにデータが含まれるかによって、最終的なブロックタイプが決まります。複数のブロックタイプが定義されている場合、最初にリストされているブロックタイプだけが考慮されます。

### ミューテーション経由のファイルのアップロード

現在、ファイルのアップロードには2つの方法があります。サーバーにダウンロードされるファイルの URL を渡すか、Base64 でエンコードされたファイルデータを渡す方法です。いずれにしても、ファイルをアップロードするには、`FileInput` GraphQL 入力タイプを利用しなければなりません。次のフィールドがあります。

| フィールド | 説明
| - | -
| `fileData` | Base64 形式のファイルの内容。指定した場合、URL よりも優先されます。
| `filename` | ファイルに利用するファイル名。指定がない場合、Craft は自身でファイル名を見つけます。
| `url` | 利用するファイルの URL。

### エントリのミューテート

#### エントリの保存

エントリを保存するには、`save_<sectionHandle>_<entryTypeHandle>_Entry` 形式の名前を持つ、エントリタイプ固有のミューテーションを利用します。

<!-- BEGIN ENTRY MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `id`| `ID` | エレメントの ID をセットします。
| `uid`| `String` | エレメントの UID をセットします。
| `title`| `String` | エレメントのタイトル。
| `enabled`| `Boolean` | エレメントを有効にするかどうか。
| `authorId`| `ID` | このエントリを作成したユーザーの ID。
| `postDate`| `DateTime` | エントリがいつ投稿されるべきか。
| `expiryDate`| `DateTime` | エントリをいつ有効期限切れにするか。
| `slug`| `String` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `siteId`| `Int` | エレメントを保存するサイトを決定します。デフォルトはプライマリサイトです。
| `...`|  | フィールドレイアウトに応じた、より多くの引数。

<!-- END ENTRY MUTATION ARGS -->

引数 `id`、`uid`、および、`authorId` は、シングルのエントリには存在しません。シングルのエントリは投稿者を持たず、正確なミューテーションによって既に識別されているからです。同様に、ストラクチャーエントリで利用可能な追加の引数があります。詳細については、[構造データのミューテート](#mutating-structure-data)を参照してください。

#### 下書きの保存

エントリの下書きを保存するには、`save_<sectionHandle>_<entryTypeHandle>_Draft` 形式の名前を持つ、エントリタイプ固有のミューテーションを利用します。

<!-- BEGIN DRAFT MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `title`| `String` | エレメントのタイトル。
| `enabled`| `Boolean` |  エレメントを有効にするかどうか。
| `authorId`| `ID` | このエントリを作成したユーザーの ID。
| `postDate`| `DateTime` | エントリがいつ投稿されるべきか。
| `expiryDate`| `DateTime` | エントリをいつ有効期限切れにするか。
| `slug`| `String` | エレメントのスラグに基づいて、クエリの結果を絞り込みます。
| `siteId`| `Int` | エレメントを保存するサイトを決定します。デフォルトはプライマリサイトです。
| `draftId`| `ID!` | 下書きの ID。
| `draftName`| `String` | 下書きの名前。
| `draftNotes`| `String` | 下書きのメモ。
| `...`|  | フィールドレイアウトに応じた、より多くの引数。

<!-- END DRAFT MUTATION ARGS -->

#### 下書きの作成・公開

下書きを作成するには、`createDraft` ミューテーションを利用します。これは下書きを作成するエントリの `id` を引数として必要とし、結果として下書きの ID を返します。

下書きを公開するには、`publishDraft` ミューテーションを利用します。これは公開する下書きの `id` を引数として必要とし、結果としてそれが属するエントリの ID を返します。

#### エントリの削除

エントリを削除するには、`deleteEntry` ミューテーションを利用します。これは削除されるエントリの `id` が必要です。結果として操作が成功したかどうかを示すブーリアン値を返します。

### アセットのミューテート

#### アセットの保存

アセットを作成または更新するには、`save_<volumeHandle>_Asset` 形式の名前を持つ、ボリューム固有のミューテーションを利用します。

<!-- BEGIN ASSET MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `id`| `ID` | エレメントの ID をセットします。
| `uid`| `String` | エレメントの UID をセットします。
| `title`| `String` | エレメントのタイトル。
| `enabled`| `Boolean` | エレメントを有効にするかどうか。
| `_file`| `FileInput` | このアセットに利用するファイル。
| `newFolderId`| `ID` | このアセットの新しいフォルダの ID。
| `...`|  | フィールドレイアウトに応じた、より多くの引数。

<!-- END ASSET MUTATION ARGS -->

#### アセットの削除

アセットを削除するには、`deleteAsset` ミューテーションを利用します。これは削除されるアセットの `id` が必要です。結果として操作が成功したかどうかを示すブーリアン値を返します。

### タグのミューテート

#### タグの保存

タグを作成または更新するには、`save_<tagGroupHandle>_Tag` 形式の名前を持つ、タググループ固有のミューテーションを利用します。

<!-- BEGIN TAG MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `id`| `ID` | エレメントの ID をセットします。
| `uid`| `String` | エレメントの UID をセットします。
| `title`| `String` | エレメントのタイトル。
| `enabled`| `Boolean` | エレメントを有効にするかどうか。
| `...`|  | フィールドレイアウトに応じた、より多くの引数。

<!-- END TAG MUTATION ARGS -->

#### タグの削除

タグを削除するには、`deleteTag` ミューテーションを利用します。これは削除されるタグの `id` が必要です。結果として操作が成功したかどうかを示すブーリアン値を返します。

### カテゴリのミューテート

#### カテゴリの保存

カテゴリを作成または更新するには`save_<categoryGroupHandle>_Tag` 形式の名前を持つ、カテゴリグループ固有のミューテーションを利用します。

<!-- BEGIN CATEGORY MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `id`| `ID` | エレメントの ID をセットします。
| `uid`| `String` | エレメントの UID をセットします。
| `title`| `String` | エレメントのタイトル。
| `enabled`| `Boolean` | エレメントを有効にするかどうか。
| `...`|  | フィールドレイアウトに応じた、より多くの引数。

<!-- END CATEGORY MUTATION ARGS -->

#### カテゴリの削除

カテゴリを削除するには、`deleteCategory` ミューテーションを利用します。これは削除されるカテゴリの `id` が必要です。結果として操作が成功したかどうかを示すブーリアン値を返します。

### 構造データのミューテート

ストラクチャーセクションに属するエントリやカテゴリは、構造の一部です。構造内のそれらの場所を操作するには、適切なミューテーションを利用してエレメントを保存し、次の引数を利用します。

<!-- BEGIN STRUCTURE MUTATION ARGS -->

| 引数 | タイプ | 説明
| - | - | -
| `prependTo`| `ID` | 先頭に追加するエレメントの ID。
| `appendTo`| `ID` | 最後に追加するエレメントの ID。
| `prependToRoot`| `Boolean` | この要素をルートの先頭に追加するかどうか。
| `appendToRoot`| `Boolean` | この要素をルートの最後に追加するかどうか。
| `insertBefore`| `ID` | このエレメントが前に挿入される、エレメントの ID。
| `insertAfter`| `ID` | このエレメントが後に挿入される、エレメントの ID。

<!-- END STRUCTURE MUTATION ARGS -->

### グローバル設定のミューテート

グローバル設定を更新するには、`save_<globalSetHandle>_GlobalSet` 形式の名前を持つ、適切なミューテーションを利用します。

利用可能な引数は、グローバル設定のカスタムフィールドだけです。

### ユーザーのミューテート

Craft ネイティブの GraphQL API では、現在のところユーザーをミューテートできません。
