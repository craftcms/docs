# コンフィギュレーションの概要

必要に応じて Craft を設定するには、いくつかの方法があります。

## 一般設定

Craft は、いくつかの[一般設定](config-settings.md)をサポートしています。`config/general.php` ファイルでデフォルト値を上書きすることができます。

```php
return [
    'devMode' => true,
];
```

## データベース接続設定

Craft は、いくつかの[データベース接続設定](db-settings.md)をサポートしています。`config/db.php` ファイルでデフォルト値を上書きすることができます。

## Guzzle 設定

Craft は、次のような HTTP リクエストを作成するたびに [Guzzle 6](http://docs.guzzlephp.org/en/latest/) を使用します。

- Craft のアップデートをチェックするとき
- Craft のサポートウィジェットからサポートリクエストを送信するとき
- Feed ウィジェットから RSS フィードを読み込むとき
- Amazon S3 のようなリモートボリュームにあるアセットを操作するとき

`config/` フォルダに `guzzle.php` ファイルを作成することによって、これらのリクエストを送信する際に Guzzle が使用するコンフィグ設定をカスタマイズできます。そのファイルは、設定を上書きした配列を返さなければなりません。

```php
<?php

return [
    'headers' => ['Foo' => 'Bar'],
    'query'   => ['testing' => '123'],
    'auth'    => ['username', 'password'],
    'proxy'   => 'tcp://localhost:80',
];
```

ここで定義されたオプションは、新しい `GuzzleHttp\Client` インスタンスに渡されます。利用可能なオプションのリストは、[Guzzle のドキュメント](http://docs.guzzlephp.org/en/latest/)を参照してください。

## エイリアス

Craft のいくつかの設定やファンクションでは、基本ファイルシステムのパスや URL を代用する [Yii エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)をサポートしています。 これには次ものが含まれます。

- サイトのベース URL 設定
- ボリュームのベース URL 設定
- ローカルボリュームのファイルシステムパス設定
- コンフィグ設定の <config3:resourceBasePath> と <config3:resourceBaseUrl> config settings
- Twig ファンクションの [svg()](../dev/functions.md#svg-svg-sanitize)

次のエイリアスは、そのまま利用可能です。

| エイリアス                | 説明                                                                              |
| -------------------- | ------------------------------------------------------------------------------- |
| `@app`               | `vendor/craftcms/cms/src/` のパス                                                  |
| `@config`            | `config/` フォルダのパス                                                               |
| `@contentMigrations` | `migrations/` フォルダのパス                                                           |
| `@craft`             | `vendor/craftcms/cms/src/` のパス                                                  |
| `@lib`               | `vendor/craftcms/cms/lib/` のパス                                                  |
| `@root`              | ルートプロジェクトのパス（PHP 定数の [CRAFT_BASE_PATH](php-constants.md#craft-base-path) と同じ） |
| `@runtime`           | `storage/runtime/` フォルダのパス                                                      |
| `@storage`           | `storage/` フォルダのパス                                                              |
| `@templates`         | `templates/` フォルダのパス                                                            |
| `@translations`      | `translations/` フォルダのパス                                                         |
| `@vendor`            | `vendor/` フォルダのパス                                                               |
| `@web`               | リクエストのために読み込まれた `index.php` ファイルを含むフォルダの URL                                    |
| `@webroot`           | リクエストのために読み込まれた `index.php` ファイルを含むフォルダのパス                                      |

コンフィグ設定 <config3:aliases> を利用して、追加の独自エイリアスを定義することができます。例えば、アセットボリュームが存在するベース URL とベースパスを定義するエイリアスを作成したいかもしれません。

```php
'aliases' => [
    '@assetBaseUrl' => 'http://my-project.com/assets',
    '@assetBasePath' => '/path/to/web/assets',
],
```

これらを利用して、アセットボリュームのベース URL やファイルシステムのパス設定を記入しはじめることができます。例：`@assetBaseUrl/user-photos` と `@assetBasePath/user-photos`

```php
ASSETS_BASE_URL=http://my-project.com/assets
ASSETS_BASE_PATH=/path/to/web/assets
```

You can define additional custom aliases using the <config3:aliases> config setting as well. For example, you may wish to create aliases that define the base URL and base path that your asset volumes will live in.

```php
'aliases' => [
    '@assetBaseUrl' => getenv('ASSETS_BASE_URL'),
    '@assetBasePath' => getenv('ASSETS_BASE_PATH'),
],
```

[getenv()](http://php.net/manual/en/function.getenv.php) を使用して、エイリアスの定義にセットすることができます。

::: tip
設定でエイリアスを参照する場合、URL やパスに追加のセグメントを付加することができます。例えば、`@assetBaseUrl/user-photos` をボリュームのベース URL  にセットできます。
:::

```bash
{{ alias('@assetBaseUrl') }}
```

::: tip
[alias()](../dev/functions.html#alias-string) ファンクションに渡すことによって、テンプレート内でエイリアスをパースできます。

```php
'aliases' => [
    '@assetBaseUrl' => getenv('ASSETS_BASE_URL'),
    '@assetBasePath' => getenv('ASSETS_BASE_PATH'),
],
```

:::

`config/routes.php` にカスタムの [URL ルール](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) を定義することができます。詳細については、[ルーティング](../routing.md) を参照してください。

```twig
{{ alias('@assetBaseUrl') }}
```
:::

## URL ルール

`config/app.php` から、コンポーネント設定を上書きしたり新しいモジュールやコンポーネントを追加するような Craft の [アプリケーション設定](app.md) をカスタマイズできます。

## PHP 定数

You can configure core settings like system file paths and the active environment by defining certain [PHP constants](php-constants.md) in `web/index.php`.

## アプリケーション設定

You can customize Craft’s [application configuration](app.md) from `config/app.php`, such as overriding component configs, or adding new modules and components.
