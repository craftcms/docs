# Global Variables

The following [global variables](https://twig.symfony.com/doc/2.x/templates.html#global-variables) are available to Twig templates in Craft:

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

A <craft3:craft\web\twig\variables\CraftVariable> object, which provides access points to various helper functions and objects for templates.

### `craft.app`

A reference to the main <craft3:craft\web\Application> instance (the thing you get when you type `Craft::$app` in PHP code) is also available to templates via `craft.app`.

::: warning
Accessing things via `craft.app` is considered advanced. There are more security implications than other Twig-specific variables and functions, and your templates will be more susceptible to breaking changes during major Craft version bumps.
:::

```twig
{% set field = craft.app.fields.getFieldByHandle('body') %}
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

The currently-logged-in user, represented by a <craft3:craft\elements\User> object, or `null` if no one is logged in.

```twig
{% if currentUser %}
    Welcome, {{ currentUser.friendlyName }}!
{% endif %}
```

## `devMode`

Whether the <config3:devMode> config setting is currently enabled.

```twig
{% if devMode %}
    Craft is running in dev mode.
{% endif %}
```

## `loginUrl`

The URL to your site’s login page, based on the <config3:loginPath> config setting.

```twig
{% if not currentUser %}
    <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

## `logoutUrl`

The URL Craft uses to log users out, based on the <config3:logoutPath> config setting. Note that Craft will automatically redirect users to your homepage after going here; there’s no such thing as a “logout _page_”.

```twig
{% if currentUser %}
    <a href="{{ logoutUrl }}">Logout</a>
{% endif %}
```

## `now`

A [DateTime](http://php.net/manual/en/class.datetime.php) object set to the current date and time.

```twig
Today is {{ now|date('M j, Y') }}.
```

## `POS_BEGIN`

Twig-facing copy of the [craft\web\View::POS_BEGIN](craft3:craft\web\View#constants) constant.

## `POS_END`

Twig-facing copy of the [craft\web\View::POS_END](craft3:craft\web\View#constants) constant.

## `POS_HEAD`

Twig-facing copy of the [craft\web\View::POS_HEAD](craft3:craft\web\View#constants) constant.

## `POS_LOAD`

Twig-facing copy of the [craft\web\View::POS_LOAD](craft3:craft\web\View#constants) constant.

## `POS_READY`

Twig-facing copy of the [craft\web\View::POS_READY](craft3:craft\web\View#constants) constant.

## `siteName`

The name of your site, as defined in Settings → Sites.

```twig
<h1>{{ siteName }}</h1>
```

## `siteUrl`

The URL of your site

```twig
<link rel="home" href="{{ siteUrl }}">
```

## `SORT_ASC`

Twig-facing copy of the `SORT_ASC` PHP constant.

## `SORT_DESC`

Twig-facing copy of the `SORT_DESC` PHP constant.

## `SORT_FLAG_CASE`

Twig-facing copy of the `SORT_FLAG_CASE` PHP constant.

## `SORT_LOCALE_STRING`

Twig-facing copy of the `SORT_LOCALE_STRING` PHP constant.

## `SORT_NATURAL`

Twig-facing copy of the `SORT_NATURAL` PHP constant.

## `SORT_NUMERIC`

Twig-facing copy of the `SORT_NUMERIC` PHP constant.

## `SORT_REGULAR`

Twig-facing copy of the `SORT_REGULAR` PHP constant.

## `SORT_STRING`

Twig-facing copy of the `SORT_STRING` PHP constant.

## `systemName`

The System Name, as defined in Settings → General.

## `view`

A reference to the <craft3:craft\web\View> instance that is driving the template.

## Global Set Variables

Each of your site’s [global sets](../globals.md) will be available to your template as global variables, named after their handle.

They will be represented as <craft3:craft\elements\GlobalSet> objects.

```twig
<p>{{ companyInfo.companyName }} was established in {{ companyInfo.yearEstablished }}.</p>
```
