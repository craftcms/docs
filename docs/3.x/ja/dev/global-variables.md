# グローバル変数

Craft の Twig テンプレートで利用可能な[グローバル変数](https://twig.symfony.com/doc/2.x/templates.html#global-variables)は、以下の通りです。

| 変数 | 説明 |
-------- | -----------
| `_self` | 現在のテンプレート名。 |
| `_context` | 現在定義されている変数。 |
| `_charset` | 現在の文字コード。 |
| [craft](#craft) | <craft3:craft\web\twig\variables\CraftVariable> オブジェクト。 |
| [currentSite](#currentsite) | リクエストされたサイト。 |
| [currentUser](#currentuser) | 現在ログインしているユーザー。 |
| [devMode](#devmode) | Dev Mode が有効かどうか。 |
| [Global set variables](#global-set-variables) | 各グローバル設定の変数。 |
| [loginUrl](#loginurl) | フロントエンドのログインページの URL。 |
| [logoutUrl](#logouturl) | フロントエンドのログアウトページの URL。 |
| [now](#now) | 現在の日/時。 |
| [POS_BEGIN](#pos-begin) | 定数 [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants)。 |
| [POS_END](#pos-end) | 定数 [craft\web\View::POS_END](craft3:craft\web\View#constants)。 |
| [POS_HEAD](#pos-head) | 定数 [craft\web\View::POS_HEAD](craft3:craft\web\View#constants)。 |
| [POS_LOAD](#pos-load) | 定数 [craft\web\View::POS_LOAD](craft3:craft\web\View#constants)。 |
| [POS_READY](#pos-ready) | 定数 [craft\web\View::POS_READY](craft3:craft\web\View#constants)。 |
| [siteName](#sitename) | 現在のサイトの名前。 |
| [siteUrl](#siteurl) | 現在のサイトのベース URL。 |
| [SORT_ASC](#sort-asc) | PHP 定数 `SORT_ASC`。 |
| [SORT_DESC](#sort-desc) | PHP 定数 `SORT_DESC`。 |
| [SORT_FLAG_CASE](#sort-flag-case) | PHP 定数 `SORT_FLAG_CASE`。 |
| [SORT_LOCALE_STRING](#sort-locale-string) | PHP 定数 `SORT_LOCALE_STRING`。 |
| [SORT_NATURAL](#sort-natural) | PHP 定数 `SORT_NATURAL`。 |
| [SORT_NUMERIC](#sort-numeric) | PHP 定数 `SORT_NUMERIC`。 |
| [SORT_REGULAR](#sort-regular) | PHP 定数 `SORT_REGULAR`。 |
| [SORT_STRING](#sort-string) | PHP 定数 `SORT_STRING`。 |
| [systemName](#systemname) | システム名。 |
| [view](#view) | アプリの `view` コンポーネント。 |

## `craft`

様々なヘルパーファンクションやオブジェクトのアクセスポイントを提供する <craft3:craft\web\twig\variables\CraftVariable>  オブジェクト。

### `craft.app`

<craft3:craft\web\Application> インスタンス（PHP コード内で `Craft::$app` と記述したときに取得できるもの）への参照は、`craft.app` 経由でテンプレートでも利用可能です。

::: warning
`craft.app` 経由でアクセスすることは、先進的であると考えられます。他の Twig 特有の変数やファンクションよりもセキュリティの上で意味があります。さらに、Craft のメジャーバージョン間で生じる互換性を破る変更に、テンプレートを反応させやすくするでしょう。
:::

```twig
{% set field = craft.app.fields.getFieldByHandle('body') %}
```

## `currentSite`

<craft3:craft\models\Site> オブジェクトで表される、リクエストされたサイト。

```twig
{{ currentSite.name }}
```

現在のサイトと同じグループのすべてのサイトは、`currentSite.group.sites` 経由でアクセスできます。

```twig
<nav>
    <ul>
        {% for site in currentSite.group.sites %}
            <li><a href="{{ alias(site.baseUrl) }}">{{ site.name }}</a></li>
        {% endfor %}
    </ul>
</nav>
```

## `currentUser`

<craft3:craft\elements\User> オブジェクトで表される、現在ログインしているユーザー。誰もログインしていない場合は、`null`。

```twig
{% if currentUser %}
    Welcome, {{ currentUser.friendlyName }}!
{% endif %}
```

## `devMode`

コンフィグ設定 <config3:devMode> が現在有効になっているかどうか。

```twig
{% if devMode %}
    Craft is running in dev mode.
{% endif %}
```

## `loginUrl`

<config3:loginPath> コンフィグ設定に基づく、サイトのログインページの URL。

```twig
{% if not currentUser %}
    <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

## `logoutUrl`

<config3:logoutPath> コンフィグ設定に基づく、Craft ユーザーのログアウト URL。ここに遷移した後、Craft はユーザーをホームページへ自動的にリダイレクトします。「ログアウト _ページ_」といったものはありません。

```twig
{% if currentUser %}
    <a href="{{ logoutUrl }}">Logout</a>
{% endif %}
```

## `now`

現在の日付と時刻がセットされた [DateTime](http://php.net/manual/en/class.datetime.php) オブジェクト。

```twig
Today is {{ now|date('M j, Y') }}.
```

## `POS_BEGIN`

定数 [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_END`

定数 [craft\web\View::POS_END](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_HEAD`

定数 [craft\web\View::POS_HEAD](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_LOAD`

定数 [craft\web\View::POS_LOAD](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_READY`

定数 [craft\web\View::POS_READY](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `siteName`

「設定 > サイト」で定義されている、サイトの名前。

```twig
<h1>{{ siteName }}</h1>
```

## `siteUrl`

サイトの URL。

```twig
<link rel="home" href="{{ siteUrl }}">
```

## `SORT_ASC`

PHP 定数 `SORT_ASC` の Twig 対応のコピー。

## `SORT_DESC`

PHP 定数 `SORT_DESC` の Twig 対応のコピー。

## `SORT_FLAG_CASE`

PHP 定数 `SORT_FLAG_CASE` の Twig 対応のコピー。

## `SORT_LOCALE_STRING`

PHP 定数 `SORT_LOCALE_STRING` の Twig 対応のコピー。

## `SORT_NATURAL`

PHP 定数 `SORT_NATURAL` の Twig 対応のコピー。

## `SORT_NUMERIC`

PHP 定数 `SORT_NUMERIC` の Twig 対応のコピー。

## `SORT_REGULAR`

PHP 定数 `SORT_REGULAR` の Twig 対応のコピー。

## `SORT_STRING`

PHP 定数 `SORT_STRING` の Twig 対応のコピー。

## `systemName`

「設定 > 一般」で定義されている、システム名。

## `view`

テンプレートを駆動している <craft3:craft\web\View> インスタンスへの参照。

## グローバル設定の変数

それそれのサイトの[グローバル設定](../globals.md)は、ハンドルにちなんで命名されたグローバル変数としてテンプレートで利用可能です。

それらは <craft3:craft\elements\GlobalSet> オブジェクトとして表されます。

```twig
<p>{{ companyInfo.companyName }} was established in {{ companyInfo.yearEstablished }}.</p>
```
