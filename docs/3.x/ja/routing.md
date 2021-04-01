# ルーティング

ルーティングは、Craft がサイトのリクエストをスマートに処理するのに役立ちます。 Craft にリクエストが届くと、リクエストの送り先を決定するためにチェックします。

以下に詳述されたチェック項目は、このプロセスの仕組みを説明しています。 この情報は、テンプレートの読み込み、プラグインのアクション URL、動的なルート、および、予期しない 404 エラーのトラブルシューティングに役立ちます。

Craft はリクエストを次のように処理します。


0. **このリクエストを Craft が最初に処理するべきか？**

   It’s important to keep in mind that Craft doesn’t get involved for *every* request that touches your server, but only requests that go to your `index.php` file.

   [Craft に付属する](https://github.com/craftcms/craft/blob/master/web/.htaccess) `.htaccess` ファイルは、ウェブサーバーのディレクトリやファイルとマッチしないすべてのリクエストを内部で `index.php` にリダイレクトします。 しかし、（画像、CSS、または、JavaScript のような）*実際に*存在するファイルをブラウザが直接指し示す場合、ウェブサーバーは Craft をロードせずに直接そのファイルを配信します。

1. **それはアクションリクエストか？**

   アクションリクエストは、 `actions/`（または、コンフィグ設定の <config3:actionTrigger> にセットされたもの）ではじまる URL か、POST リクエストやクエリ文字列に `action` パラメータのいずれかを持っています。

   Craft は、アクションを実行するコントローラーアクションに、アクションリクエストをルーティングします。 Craft にはコアアクションのためのシステムコントローラーアクションがありますが、プラグインが同様に独自のカスタムアクションを定義したコントローラーを持っている場合があります。

   リクエストが、コントローラーの呼び出し後に必ずしも終了するとは限りません。 コントローラーがそれをキープし続けることを許可するかもしれません。

2. **それはエレメントリクエストか？**

   URL がエレメントの URI にマッチする場合、Craft はエレメントにそのリクエストのルーティング方法を決定させます。 例えば、ある[エントリの](entries.md) URI がリクエストされた場合、エントリはそのセクションの設定で指定されたテンプレートにリクエストをルーティングし、`entry` 変数が事前定義され、リクエストされたエントリをセットします。

::: tip
モジュールとプラグインは、[EVENT_SET_ROUTE](craft3:craft\base\Element::EVENT_SET_ROUTE) イベントを使用してエレメントルートを上書きできます。
:::

3. **URI がルート、または、URI ルールにマッチするか？**

   URI がいずれかの [動的ルート](#dynamic-routes)、または、[URI ルール](#advanced-routing-with-url-rules)にマッチする場合、それによって指定されたテンプレートやコントローラーアクションがロードされます。

4. **URI がテンプレートとマッチするか？**

   Craft はその URI が有効な[テンプレートパス](dev/README.md#template-paths)かどうかをチェックします。 そうであれば、Craft はマッチしたテンプレートを返します。

::: tip
いずれかの URI セグメントがアンダースコア（例：`blog/_archive/index`）ではじまる場合、Craft はこのステップをスキップします。
:::

5. **404**

   上記のチェックがいずれも成功しなかった場合、Craft は [NotFoundHttpException](yii2:yii\web\NotFoundHttpException) を返します。 \ If [Dev Mode](config3:devMode) is enabled, an error report for the exception will be shown. Otherwise, a 404 error will be returned using either your [custom error template](#error-templates) or Craft’s own default.

## 動的なルート

テンプレートを読み込むための URL が必要なものの、URI とテンプレートパスをマッチさせたくない場合があります。

年を URL のセグメントの1つ（例：`blog/archive/2018`）にする年別アーカイブページが、よい例です。 毎年新しいテンプレートを作成するのは、賢明とは言えません。 代わりに、新しい**ルート**を設定しましょう。

![新しいルートの作成画面](./images/routing-creating-new-route.png)

### ルートの作成

To create a new Route, go to **Settings** → **Routes** and choose **New Route**. A modal window will appear where you can define the route settings:

- URI がどのように見えるか？
- どのテンプレートを読み込むか？

The first setting can contain “tokens”, which represent a range of possible matches, rather than a specific string. (The `year` token, for example, represents four consecutive digits.) When you click on a token, Craft inserts it into the URI setting wherever the cursor is.

If you want to match URIs that look like `blog/archive/2018`, type `blog/archive/` into the URI field and choose the `year` token.

::: tip
Route URIs should **not** begin with a slash (`/`).
:::

After defining your URI pattern and entering a template path, click the “Save” button. The modal will close, revealing your new route on the page.

When you point your browser to `https://my-project.nitro/blog/archive/2018`, it will match your new route, and Craft will load the specified template.

The value of the `year` token will also be available to the template as a variable called `year`.


### 利用可能なトークン

The following tokens are available to the URI setting:

- `*` – スラッシュ（/）を除く、任意の文字列
- `day` – 月の特定の日（1-31 または 01-31）
- `month` – 月の数値表現（1-12 または 01-12）
- `number` – 任意の正の整数
- `page` – 任意の正の整数
- `uid` – A v4 compatible UUID (universally unique ID)
- `slug` – スラッシュ（/）を除く、任意の文字列
- `tag` – スラッシュ（/）を除く、任意の文字列
- `year` – 4桁の連続する数字


## URL ルールによる高度なルーティング

In addition to routes, you can define [URL rules](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) in `config/routes.php`.

```php
return [
    // Route blog/archive/YYYY to a controller action
    'blog/archive/<year:\d{4}>' => 'controller/action/path',

    // Route blog/archive/YYYY to a template
    'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
];
```

If your Craft installation has multiple sites, you can create site-specific URL rules by placing them in a sub-array, and set the key to the site’s handle.

```php
return [
    'siteHandle' => [
        'blog/archive/<year:\d{4}>' => 'controller/action/path',
    ],
];
```

Craft also supports special tokens that you can use within the regular expression portion of your [named parameters](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#named-parameters):

- `{handle}` – フィールドハンドル、ボリュームハンドルなどとマッチします。
- `{slug}` – エントリスラグ、カテゴリスラグなどとマッチします。
- `{uid}` – matches a v4 UUID.

```php
return [
    'blog/<entrySlug:{slug}>' => 'controller/action/path',
];
```

### テンプレート内の名前付けされたパラメータへのアクセス

URL rules that route to a template (`['template' => '<TemplatePath>']`) will pass any matched named parameters to the template as variables.

For example, with this URL rule:

```php
'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
```

If you access `https://my-project.nitro/blog/archive/2018`, your `blog/_archive.twig` template will get loaded a `year` variable set to `2018`.

```twig
<h1>Blog Entries from {{ year }}</h1>
```

### Accessing Named Parameters in your Controllers

To access named parameters in your controllers, you will need to add the parameter(s) to your controller's action definition.

For example, with this URL rule:

```php
'blog/archive/<year:\d{4}>' => 'controller/action/foo',
```

Your controller method would be:

```php
public function actionFoo(int $year = null)
{
    // ...
}
```

## Error Templates

You can provide your own error templates for Craft to use when returning errors.

When Craft encounters an error for a front end request, it will take your <config3:errorTemplatePrefix> into account and check the root of your `templates/` directory, in order, for the following:

1. A template matching the error’s status code, like `404.twig`.
2. For a 503 error, a template named `offline.twig`.
3. A template named `error.twig`.

When Craft finds a matching error template, it will use that and provide it with a few extra Twig variables:

- `message` – error message
- `code` – exception code
- `file` – file that threw the exception
- `line` – line in which the exception occurred
- `statusCode` – error’s HTTP status code

::: tip
You can test these pages even if [Dev Mode](config3:devMode) is enabled by going to `https://my-project.nitro/404`, substituting `404` for the name of the template you’re testing.
:::
