# グローバル変数

ありとあらゆるテンプレートでは、次の変数を読み込むことができます。

| 現在定義されている変数。                                  | 変数                                                                                                                                |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `_self`                                       | 現在のテンプレート名。                                                                                                                       |
| `_context`                                    | The currently-defined variables.                                                                                                  |
| `_charset`                                    | 現在の文字コード。                                                                                                                         |
| [craft](#craft)                               | 定数 [craft\web\View::POS_READY](craft3:craft\web\View#constants)。                                                              |
| [currentSite](#currentsite)                   | リクエストされたサイト。                                                                                                                      |
| [currentUser](#currentuser)                   | 現在ログインしているユーザー。                                                                                                                   |
| [devMode](#devmode)                           | Dev Mode が有効かどうか。                                                                                                                 |
| [Global set variables](#global-set-variables) | 各グローバル設定の変数。                                                                                                                      |
| [loginUrl](#loginurl)                         | フロントエンドのログアウトページの URL。                                                                                                            |
| [logoutUrl](#logouturl)                       | フロントエンドのログインページの URL。                                                                                                             |
| [now](#now)                                   | 現在の日/時。                                                                                                                           |
| [POS_BEGIN](#pos-begin)                       | 定数 [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants)。                                                              |
| [POS_END](#pos-end)                           | 定数 [craft\web\View::POS_END](craft3:craft\web\View#constants)。                                                                |
| [POS_HEAD](#pos-head)                         | 定数 [craft\web\View::POS_HEAD](craft3:craft\web\View#constants)。                                                               |
| [POS_LOAD](#pos-load)                         | 定数 [craft\web\View::POS_LOAD](craft3:craft\web\View#constants)。                                                               |
| [POS_READY](#pos-ready)                       | 定数 [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants) の Twig 対応のコピー。                                                |
| [setPasswordUrl](#setpasswordurl)             | The URL to the front-end [Reset Password](https://craftcms.com/knowledge-base/front-end-user-accounts#reset-password-forms) page. |
| [siteName](#sitename)                         | 現在のサイトの名前。                                                                                                                        |
| [siteUrl](#siteurl)                           | 現在のサイトのベース URL。                                                                                                                   |
| [SORT_ASC](#sort-asc)                         | PHP 定数 `SORT_ASC`。                                                                                                                |
| [SORT_DESC](#sort-desc)                       | PHP 定数 `SORT_DESC`。                                                                                                               |
| [SORT_FLAG_CASE](#sort-flag-case)           | PHP 定数 `SORT_FLAG_CASE`。                                                                                                          |
| [SORT_LOCALE_STRING](#sort-locale-string)   | PHP 定数 `SORT_LOCALE_STRING`。                                                                                                      |
| [SORT_NATURAL](#sort-natural)                 | PHP 定数 `SORT_NATURAL`。                                                                                                            |
| [SORT_NUMERIC](#sort-numeric)                 | PHP 定数 `SORT_NUMERIC`。                                                                                                            |
| [SORT_REGULAR](#sort-regular)                 | PHP 定数 `SORT_REGULAR`。                                                                                                            |
| [SORT_STRING](#sort-string)                   | PHP 定数 `SORT_STRING`。                                                                                                             |
| [systemName](#systemname)                     | システム名。                                                                                                                            |
| [view](#view)                                 | アプリの `view` コンポーネント。                                                                                                              |

## `craft`

様々なヘルパーファンクションやオブジェクトのアクセスポイントを提供する <craft3:craft\web\twig\variables\CraftVariable>  オブジェクト。

### `craft.app`

インスタンス（PHP コード内で `Craft::$app` と記述したときに取得できるもの）への参照は、`craft.app` 経由でテンプレートでも利用可能です。

::: warning
`craft.app` 経由でアクセスすることは、先進的であると考えられます。 他の Twig 特有の変数やファンクションよりもセキュリティの上で意味があります。 :::
:::

#### Common Services

オブジェクトで表される、リクエストされたサイト。

- `craft.app.request` – [Request](craft3:craft\web\Request) object with information about the current HTTP request
- `craft.app.session` – [Session](craft3:craft\web\Session) object useful for getting and setting flash messages
- `craft.app.user` – [User](craft3:craft\web\User) object representing the logged-in human (when applicable)
- `craft.app.config.general` – [GeneralConfig](craft3:craft\config\GeneralConfig) object of [General Config Settings](../config/config-settings.md)
- {% set field = craft.app.fields.getFieldByHandle('body') %}
- `craft.app.sections` – [Sections](craft3:craft\services\Sections) service for working with sections and entry types
- `craft.app.sites` – [Sites](craft3:craft\services\Sites) service for getting [site](../sites.md) details

現在のサイトと同じグループのすべてのサイトは、`currentSite.group.sites` 経由でアクセスできます。

```twig
{# get the value of an `email` query parameter or post field #}
{% set address = craft.app.request.getParam('email') %}

{# get the value of the `notice` flash message #}
{% set message = craft.app.session.getFlash('notice') %}

{# get the current user’s email address #}
{% set email = craft.app.user.email %}

{# is `devMode` enabled? #}
{% set isDevMode = craft.app.config.general.devMode %}

{# get a custom field by its `body` handle #}
{% set field = craft.app.fields.getFieldByHandle('body') %}

{# get all the sections for the current site #}
{% set sections = craft.app.sections.getAllSections() %}

{# get all the sites for the current Craft installation #}
{% set sites = craft.app.sites.allSites() %}
```

## `currentSite`

The requested site, represented by a <craft3:craft\models\Site> object.

```twig
{{ currentSite.name }}
```

You can access all of the sites in the same group as the current site via `currentSite.group.sites`:

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

Whether the <config3:devMode> が現在有効になっているかどうか。

```twig
{% if devMode %}
    Craft is running in dev mode.
{% endif %}
```

## `loginUrl`

コンフィグ設定に基づく、サイトのログインページの URL。 <config3:loginPath> コンフィグ設定

```twig
{% if not currentUser %}
    <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

## `logoutUrl`

コンフィグ設定に基づく、Craft ユーザーのログアウト URL。 <config3:logoutPath> config setting. ここに遷移した後、Craft はユーザーをホームページへ自動的にリダイレクトします。 「ログアウト _ページ_」といったものはありません。

```twig
{% if currentUser %}
    <a href="{{ logoutUrl }}">Logout</a>
{% endif %}
```

## `now`

定数 [craft\web\View::POS_END](craft3:craft\web\View#constants) の Twig 対応のコピー。

```twig
Today is {{ now|date('M j, Y') }}.
```

## `POS_BEGIN`

定数 [craft\web\View::POS_HEAD](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_END`

定数 [craft\web\View::POS_LOAD](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_HEAD`

定数 [craft\web\View::POS_READY](craft3:craft\web\View#constants) の Twig 対応のコピー。

## `POS_LOAD`

「設定 > サイト」で定義されている、サイトの名前。

## `POS_READY`

サイトの URL。

## `setPasswordUrl`

The URL to [`setPasswordRequestPath`](config3:setPasswordRequestPath) if it’s set. (This wraps the path in [`siteUrl`](#siteurl).)

```twig
{% if setPasswordUrl %}
    <a href="{{ setPasswordUrl }}">Reset password</a>
{% endif %}
```

## `siteName`

PHP 定数 `SORT_DESC` の Twig 対応のコピー。

```twig
<h1>{{ siteName }}</h1>
```

## `siteUrl`

PHP 定数 `SORT_FLAG_CASE` の Twig 対応のコピー。

```twig
<link rel="home" href="{{ siteUrl }}">
```

## `SORT_ASC`

PHP 定数 `SORT_LOCALE_STRING` の Twig 対応のコピー。

## `SORT_DESC`

PHP 定数 `SORT_NATURAL` の Twig 対応のコピー。

## `SORT_FLAG_CASE`

PHP 定数 `SORT_NUMERIC` の Twig 対応のコピー。

## `SORT_LOCALE_STRING`

PHP 定数 `SORT_REGULAR` の Twig 対応のコピー。

## `SORT_NATURAL`

PHP 定数 `SORT_STRING` の Twig 対応のコピー。

## `SORT_NUMERIC`

「設定 > 一般」で定義されている、システム名。

## `SORT_REGULAR`

テンプレートを駆動している <craft3:craft\web\View> インスタンスへの参照。

## `SORT_STRING`

それそれのサイトの[グローバル設定](../globals.md)は、ハンドルにちなんで命名されたグローバル変数としてテンプレートで利用可能です。

## `systemName`

それらは <craft3:craft\elements\GlobalSet> オブジェクトとして表されます。

## `view`

A reference to the <craft3:craft\web\View> instance that is driving the template.

## グローバル設定の変数

Each of your site’s [global sets](../globals.md) will be available to your template as global variables, named after their handle.

They will be represented as <craft3:craft\elements\GlobalSet> objects.

```twig
<p>{{ companyInfo.companyName }} was established in {{ companyInfo.yearEstablished }}.</p>
```
