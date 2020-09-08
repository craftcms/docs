# グローバル変数

ありとあらゆるテンプレートでは、次の変数を読み込むことができます。

| Variable                                      | Description                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `_self`                                       | The current template name.                                                     |
| `_context`                                    | The currently-defined variables.                                               |
| `_charset`                                    | The current charset.                                                           |
| [craft](#craft)                               | A <craft3:craft\web\twig\variables\CraftVariable> object.                  |
| [currentSite](#currentsite)                   | The requested site.                                                            |
| [currentUser](#currentuser)                   | The currently logged-in user.                                                  |
| [devMode](#devmode)                           | Whether Dev Mode is enabled.                                                   |
| [Global set variables](#global-set-variables) | Variables for each of the global sets.                                         |
| [loginUrl](#loginurl)                         | The URL to the front-end Login page.                                           |
| [logoutUrl](#logouturl)                       | The URL to the front-end Logout page.                                          |
| [now](#now)                                   | The current date/time.                                                         |
| [POS_BEGIN](#pos-begin)                       | The [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants) constant. |
| [POS_END](#pos-end)                           | The [craft\web\View::POS_END](craft3:craft\web\View#constants) constant.   |
| [POS_HEAD](#pos-head)                         | The [craft\web\View::POS_HEAD](craft3:craft\web\View#constants) constant.  |
| [POS_LOAD](#pos-load)                         | The [craft\web\View::POS_LOAD](craft3:craft\web\View#constants) constant.  |
| [POS_READY](#pos-ready)                       | The [craft\web\View::POS_READY](craft3:craft\web\View#constants) constant. |
| [siteName](#sitename)                         | The name of the current site.                                                  |
| [siteUrl](#siteurl)                           | The base URL of the current site.                                              |
| [SORT_ASC](#sort-asc)                         | The `SORT_ASC` PHP constant.                                                   |
| [SORT_DESC](#sort-desc)                       | The `SORT_DESC` PHP constant.                                                  |
| [SORT_FLAG_CASE](#sort-flag-case)           | The `SORT_FLAG_CASE` PHP constant.                                             |
| [SORT_LOCALE_STRING](#sort-locale-string)   | The `SORT_LOCALE_STRING` PHP constant.                                         |
| [SORT_NATURAL](#sort-natural)                 | The `SORT_NATURAL` PHP constant.                                               |
| [SORT_NUMERIC](#sort-numeric)                 | The `SORT_NUMERIC` PHP constant.                                               |
| [SORT_REGULAR](#sort-regular)                 | The `SORT_REGULAR` PHP constant.                                               |
| [SORT_STRING](#sort-string)                   | The `SORT_STRING` PHP constant.T                                               |
| [systemName](#systemname)                     | The system name.                                                               |
| [view](#view)                                 | The app’s `view` component.                                                    |

## `craft`

様々なヘルパーファンクションやオブジェクトのアクセスポイントを提供する <craft3:craft\web\twig\variables\CraftVariable>  オブジェクト。

### `craft.app`

インスタンス（PHP コード内で `Craft::$app` と記述したときに取得できるもの）への参照は、`craft.app` 経由でテンプレートでも利用可能です。

::: warning
`craft.app` 経由でアクセスすることは、先進的であると考えられます。 他の Twig 特有の変数やファンクションよりもセキュリティの上で意味があります。 :::
:::

```twig
{% set field = craft.app.fields.getFieldByHandle('body') %}
```

## `currentSite`

オブジェクトで表される、リクエストされたサイト。

```twig
{{ currentSite.name }}
```

現在のサイトと同じグループのすべてのサイトは、`currentSite.group.sites` 経由でアクセスすることができます。

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

オブジェクトで表される、現在ログインしているユーザー。 誰もログインしていない場合は、`null`。

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

The URL to your site’s login page, based on the <config3:loginPath> コンフィグ設定に基づく、サイトのログインページの URL。

```twig
{% if not currentUser %}
    <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

## `logoutUrl`

The URL Craft uses to log users out, based on the <config3:logoutPath> config setting. ここに遷移した後、Craft はユーザーをホームページへ自動的にリダイレクトします。 「ログアウト _ページ_ 」といったものはありません。

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
