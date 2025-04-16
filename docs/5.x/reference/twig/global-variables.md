---
description: Discover objects and data available to you in any Twig context.
---

# Global Variables

A number of [global variables](https://twig.symfony.com/doc/3.x/templates.html#global-variables) are available to Twig templates. Some come from Twig itself, and some are Craft-specific.

Global variables are accessible in _every_ Twig template, including [system messages](../../system/mail.md#system-messages) and [object templates](../../system/object-templates.md) used for element URIs.

This page is split into four sections:

1. [**Twig defaults**](#twig-defaults): Variables provided by Twig itself.
1. [**Craft**](#craft): Variables injected by Craft.
1. [**Constants**](#php-constants--equivalents): Equivalents of PHP constants.
1. [**Elements**](#automatically-loaded-elements): Auto-loaded elements.

::: tip
These lists may be supplemented by plugins, so refer to their documentation to see what kind of functionality is exposed to your templates!
:::

## Twig Defaults

Global variables [provided directly by Twig](https://twig.symfony.com/doc/3.x/templates.html#global-variables).

Variable | Description
--- | ---
`_self` | The current template name.
`_context` | The currently-defined variables.
`_charset` | The current charset.

## Craft

Additional variables provided by Craft. 

Variable | Description
--- | ---
[_globals](#globals) | Get and set values on a globally-available store.
[craft](#craft-2) | A <craft5:craft\web\twig\variables\CraftVariable> object.
[currentSite](#currentsite) | The requested site.
[currentUser](#currentuser) | The currently logged-in user.
[devMode](#devmode) | Whether Dev Mode is enabled.
[loginUrl](#loginurl) | The URL to the front-end Login page.
[logoutUrl](#logouturl) | The URL to the front-end Logout page.
[now](#now) | The current date/time.
[primarySite](#primarysite) <Since ver="5.6.0" feature="Global Twig variable for the primary site" /> | In multi-site projects, the “primary” site.
[setPasswordUrl](#setpasswordurl) | The URL to the front-end [Reset Password](kb:front-end-user-accounts#reset-password-forms) page.
[siteName](#sitename) | The name of the current site.
[siteUrl](#siteurl) | The base URL of the current site.
[systemName](#systemname) | The system name.
[today](#today) | Midnight of the current day.
[tomorrow](#tomorrow) | Midnight, tomorrow.
[view](#view) | The app’s `view` component.
[yesterday](#yesterday) | Midnight, yesterday.
[Global set variables](#global-set-variables) | Variables for each of the global sets.
[Single variables](#singles) | Variables for each [single section](../element-types/entries.md#singles) entry.

### `_globals`

An empty [Collection](../../development/collections.md) object. You may set and get values with the corresponding methods:

```twig
{% do _globals.set('theme', 'dark') %}
{% do _globals.set({
  red: '#F00',
  green: '#0F0',
  blue: '#00F',
}) %}

{{ _globals.get('theme') }}
{# -> 'dark' #}

{{ _globals.get('red') }}
{# -> '#F00' #}
```

The `_globals` variable has all the native [collection methods](../../development/collections.md#methods), as well as a few that Craft provides (via [macros](https://laravel.com/docs/10.x/collections#method-macro))—including the `set()` method used in the example above, which adds support for setting multiple Collection keys at once.

::: tip
Note that we’re using Twig’s `do` tag to _set_ values. You can _get_ values in any kind of Twig expression—like an output statement or a `set` tag.
:::

If you need to set or manipulated _nested_ values, consider creating a top-level Collection object:

```twig
{% do _globals.set('events', collect()) %}

{# ... #}

{% do _globals.get('events').push("show:element:#{entry.id}") %}
```

View the current contents of the `_globals` variable by passing it to the [`dump` tag](tags.md#dump):

```twig
{# .all() turns the Collection into a plain array: #}
{% dump _globals.all() %}
```

### `craft`

A <craft5:craft\web\twig\variables\CraftVariable> object, which provides access points to various helper functions and objects for templates. Many plugins will attach functionality here.

#### `craft.app`

A reference to the main <craft5:craft\web\Application> or <craft5:craft\console\Application> instance (the same object you get when accessing `Craft::$app` in PHP) is also available to templates via `craft.app`.

::: warning
Accessing things via `craft.app` is considered advanced. There are more security implications than other Twig-specific variables and functions, and your templates will be more susceptible to breaking changes between major Craft versions.
:::

Some of the services commonly used in templates:

- `craft.app.request` – [Request](craft5:craft\web\Request) object with information about the current HTTP request
- `craft.app.session` – [Session](craft5:craft\web\Session) object useful for getting and setting flash messages
- `craft.app.user` – [User](craft5:craft\web\User) object for getting information about the client’s identity
- `craft.app.config.general` – [GeneralConfig](craft5:craft\config\GeneralConfig) object of [General Config Settings](../config/general.md)
- `craft.app.fields` – [Fields](craft5:craft\services\Fields) service for accessing custom field details
- `craft.app.sites` – [Sites](craft5:craft\services\Sites) service for getting [site](../../system/sites.md) details

::: tip
Keep in mind that Twig templates can be rendered from web requests, the CLI, and within queue jobs—so there are situations in which certain features may no be available (like the “[current user](#currentuser),” or information about the request).

The specific services (or “components”) available via `craft.app` correspond to the keys defined in Craft’s [`app.php`](repo:craftcms/cms/blob/5.x/src/config/app.php), [`app.web.php`](repo:craftcms/cms/blob/5.x/src/config/app.web.php), and your project’s [equivalent config files](../config/app.md).
:::

Here are some examples of these services being used in a template:

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
{% set sections = craft.app.entries.getAllSections() %}

{# get all the sites for the current Craft installation #}
{% set sites = craft.app.sites.allSites() %}
```

### `currentSite`

The requested site, represented by a <craft5:craft\models\Site> object.

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

### `currentUser`

The currently-logged-in user, represented by a <craft5:craft\elements\User> object, or `null` if no one is logged in.

```twig
{% if currentUser %}
  Welcome, {{ currentUser.friendlyName }}!
{% endif %}
```

### `devMode`

Whether the <config5:devMode> config setting is currently enabled.

```twig
{% if devMode %}
  Craft is running in dev mode.
{% endif %}
```

### `loginUrl`

The URL to your site’s login page, based on the <config5:loginPath> config setting.

```twig
{% if not currentUser %}
  <a href="{{ loginUrl }}">Login</a>
{% endif %}
```

### `logoutUrl`

The URL Craft uses to log users out, based on the <config5:logoutPath> config setting. Note that Craft will automatically redirect users to your homepage after going here; there’s no such thing as a “logout _page_”.

```twig
{% if currentUser %}
  <a href="{{ logoutUrl }}">Logout</a>
{% endif %}
```

### `now`

A [DateTime](http://php.net/manual/en/class.datetime.php) object set to the current date and time.

```twig
Today is {{ now|date('M j, Y') }}.
```

### `primarySite` <Since ver="5.6.0" feature="Global Twig variable for the primary site" />

The _primary_ site (as designated in <Journey path="Settings, Sites" />), as an instance of <craft4:craft\models\Site>.

```twig
{# Output the primary site’s name: #}
We are a proud member of {{ primarySite.name }}

{# Link to a page on the primary site: #}
{{ tag('a', {
  href: siteUrl('about/governance', siteId = primarySite.id),
  text: 'Learn about our family of businesses',
}) }}
```

`primarySite` will be a reference to the same object as [`currentSite`](#currentsite), when `currentSite.primary` is `true`. You can also retrieve the primary site via `craft.app.sites.primarySite`.

### `setPasswordUrl`

The URL to [`setPasswordRequestPath`](config5:setPasswordRequestPath) if it’s set. (This wraps the path in [`siteUrl`](#siteurl).)

```twig
{% if setPasswordUrl %}
  <a href="{{ setPasswordUrl }}">Reset password</a>
{% endif %}
```

### `siteName`

The name of the current site, as defined in **Settings** → **Sites**.

```twig
<h1>{{ siteName }}</h1>
```

### `siteUrl`

The base URL of the current site.

```twig
<link rel="home" href="{{ siteUrl }}">
```

::: tip
To generate a URL relative to the current site, use the [`siteUrl()` function](functions.md#siteurl).
:::

### `systemName`

The **System Name**, as defined in **Settings** → **General**.

### `today`

A [DateTime](http://php.net/manual/en/class.datetime.php) object in the system’s timezone, set to midnight (00:00 in 24-hour time, or 12:00AM in 12-hour) of the _current_ day.

### `tomorrow`

A [DateTime](http://php.net/manual/en/class.datetime.php) object in the system’s timezone, set to midnight (00:00 in 24-hour time, or 12:00AM in 12-hour) of the _next_ day.

### `view`

A reference to the <craft5:craft\web\View> instance that is driving the template.

### `yesterday`

A [DateTime](http://php.net/manual/en/class.datetime.php) object in the system’s timezone, set to midnight (00:00 in 24-hour time, or 12:00AM in 12-hour) of the _previous_ day.

## PHP Constants + Equivalents

Twig doesn’t distinguish between variables and constants, nor does it expose PHP’s global constants for use in templates (except via the `constant()` function, discussed below). However, Craft exposes a few that make it easier to work with built-in features.

Variable | Description
-------- | -----------
[POS_BEGIN](#pos-begin) | The [craft\web\View::POS_BEGIN](craft5:craft\web\View#constants) constant.
[POS_END](#pos-end) | The [craft\web\View::POS_END](craft5:craft\web\View#constants) constant.
[POS_HEAD](#pos-head) | The [craft\web\View::POS_HEAD](craft5:craft\web\View#constants) constant.
[POS_LOAD](#pos-load) | The [craft\web\View::POS_LOAD](craft5:craft\web\View#constants) constant.
[POS_READY](#pos-ready) | The [craft\web\View::POS_READY](craft5:craft\web\View#constants) constant.
[SORT_ASC](#sort-asc) | The `SORT_ASC` PHP constant.
[SORT_DESC](#sort-desc) | The `SORT_DESC` PHP constant.
[SORT_FLAG_CASE](#sort-flag-case) | The `SORT_FLAG_CASE` PHP constant.
[SORT_LOCALE_STRING](#sort-locale-string) | The `SORT_LOCALE_STRING` PHP constant.
[SORT_NATURAL](#sort-natural) | The `SORT_NATURAL` PHP constant.
[SORT_NUMERIC](#sort-numeric) | The `SORT_NUMERIC` PHP constant.
[SORT_REGULAR](#sort-regular) | The `SORT_REGULAR` PHP constant.
[SORT_STRING](#sort-string) | The `SORT_STRING` PHP constant.

Other constants are accessible with the [`constant()` function](https://twig.symfony.com/doc/3.x/functions/constant.html). Pass a string representing the way you would access it in PHP, including (when applicable) the fully-qualified, properly-escaped class name:

```twig
{# You can fetch native PHP constants... #}
{{ constant('PHP_VERSION') }}

{# ...constants defined by Craft... #}
{{ constant('CRAFT_BASE_PATH') }}

{# ...and even class constants: #}
{{ constant('craft\\elements\\Entry::STATUS_LIVE') }}
```

### `POS_BEGIN`

Twig-facing copy of the [craft\web\View::POS_BEGIN](craft5:craft\web\View#constants) constant. Used in conjunction with the registration of JS and HTML fragments to place them at the _beginning_ of the `<body>` element in the rendered page:

```twig
{% set js %}
  console.log('Hello, Craft!');
{% endset %}

{% do view.registerJs(js, POS_BEGIN) %}
```

### `POS_END`

Twig-facing copy of the [craft\web\View::POS_END](craft5:craft\web\View#constants) constant. Used in conjunction with the registration of JS and HTML fragments to place them at the _end_ of the `<body>` element in the rendered page:

```twig
{% set js %}
  console.log('Goodbye, Craft!');
{% endset %}

{% do view.registerJs(js, POS_END) %}
```

### `POS_HEAD`

Twig-facing copy of the [craft\web\View::POS_HEAD](craft5:craft\web\View#constants) constant. Used in conjunction with the registration of JS and HTML fragments to place them at the end of the `<head>` element in the rendered page:

```twig
{% set js %}
  console.log('Where am I?!');
{% endset %}

{% do view.registerJs(js, POS_HEAD) %}
```

### `POS_LOAD`

Twig-facing copy of the [craft\web\View::POS_LOAD](craft5:craft\web\View#constants) constant. Used only for registering JS fragments, wrapping the code in a jQuery “load” handler:

::: code
```twig Template
{% set js %}
  console.log('Page has finished loading.');
{% endset %}

{% do view.registerJs(js, POS_LOAD) %}
```
```js Output
jQuery(window).on('load', function () {
  console.log('Page has finished loading.');
});
```
:::

::: warning
Using `POS_LOAD` with `view.registerJs()` causes Craft to include its own copy of jQuery in the page.
:::

### `POS_READY`

Twig-facing copy of the [craft\web\View::POS_READY](craft5:craft\web\View#constants) constant. Used in the same way as `POS_LOAD`, but passes the script body to jQuery’s [ready](https://api.jquery.com/ready/) handler:

```js
jQuery(function ($) {
  console.log('DOM is ready.');
});
```

### `SORT_ASC`

Twig-facing copy of the `SORT_ASC` PHP constant.

### `SORT_DESC`

Twig-facing copy of the `SORT_DESC` PHP constant.

### `SORT_FLAG_CASE`

Twig-facing copy of the `SORT_FLAG_CASE` PHP constant.

### `SORT_LOCALE_STRING`

Twig-facing copy of the `SORT_LOCALE_STRING` PHP constant.

### `SORT_NATURAL`

Twig-facing copy of the `SORT_NATURAL` PHP constant.

### `SORT_NUMERIC`

Twig-facing copy of the `SORT_NUMERIC` PHP constant.

### `SORT_REGULAR`

Twig-facing copy of the `SORT_REGULAR` PHP constant.

### `SORT_STRING`

Twig-facing copy of the `SORT_STRING` PHP constant.

## Automatically Loaded Elements

Craft makes some elements available to all templates.

### Global Sets

Each of your site’s [global sets](../element-types/globals.md) will be available to your templates as global variables, named the same as their handle.

They will be represented as <craft5:craft\elements\GlobalSet> objects.

```twig
<p>{{ companyInfo.companyName }} was established in {{ companyInfo.yearEstablished }}.</p>
```

### Singles

Your [single section](../element-types/entries.md#singles) entries can also be loaded automatically by setting <config5:preloadSingles> to `true`. This makes them available by handle in all Twig contexts, just as global sets are. For example, if you had an “About Us” single with the handle `about`, you could access content from that entry in your footer, without setting up a query:

```twig{3}
<footer>
  &copy;{{ now|date('Y') }}
  {{ about.phoneNumber }}
</footer>

::: tip
When you convert a global set to a single using the [`entrify/global-set` command](../cli.md#entrify-global-set), template references should remain compatible, so long as <config5:preloadSingles> is enabled.
:::

### Other Elements

When an element’s URI is requested, Craft automatically loads that element into the Twig environment before rendering the template defined in the [element type](../../system/elements.md)’s settings.

For [entries](../element-types/entries.md), the variable is always named `entry`; for [categories](../element-types/categories.md), `category`. Element types provided by plugins may obey other conventions!
