---
description: Exchange data with Craft over HTTP.
related:
  - uri: ../reference/http-api.md
    label: Controller Action Reference
  - uri: graphql.md
    label: Using Craft’s GraphQL API
---

# Forms

If you’ve gotten familiar with Craft’s [control panel](../system/control-panel.md), you might be wondering what kinds of things you can do from your site’s front-end.
The answer is actually _quite a bit_!

<!-- more -->

Any time you want to get information from (or send information _to_) Craft, it’s part of the [request](#making-requests)-[response](#responses) lifecycle.
This page covers the process of setting up HTML forms (and other types of requests like [Ajax](#ajax)!) to send and receive data in a way that Craft understands.

<See path="../reference/http-api.md" label="HTTP API" description="See a list of routes you can interact with via forms." />

## Making Requests

Most of your interactions with Craft so far have likely been over HTTP.
Let’s take a look at how Craft determines what to do when it receives a request.

### Params

This page will make frequent references to _query_ and _body_ params.
These are named values sent with a request, either encoded after a `?` in the URL, or within the “body” of a request.
Query params are used in [GET](#get) _and_ [POST](#post) requests, but body params are only used in POST requests.

Craft uses a handful of signals to properly [route](../system/routing.md) a request, but may expect others based on what it thinks the user is requesting.
For example, most requests are routed based their path, but a [login request](../reference/http-api.md#post-userslogin) also requires `loginName` and `password` body params.

### Actions

Craft 6.x includes a secondary “action” routing scheme that involves explicitly sending an `action` query or body param.
These requests were historically matched against a controller and action by [IDs](https://www.yiiframework.com/doc/guide/22.0/en/structure-controllers#routes).
In Laravel, controllers are only exposed when bound to a route—so we’ve added [a map of legacy action routes](https://github.com/craftcms/cms/blob/6.x/routes/actions.php) for backward-compatibility.
A special `CraftCms\Cms\Http\Routing\ActionRouteResolver` middleware intercepts and re-routes requests that include a valid `action` param.

Refer to the 5.x version of this page for usage examples; we no longer recommend this strategy, but existing forms will continue to work.

### HTTP Verbs

Each route usually responds to one [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
Using an unsupported method will result in either a 404 (not found) or 405 (method not allowed) error and render your [error template](../system/routing.md#error-templates)—or send a JSON response with an `error` key.

The following sections cover the default behavior in normal and exceptional states.

#### `POST`

All `POST` requests are made through forms or [Ajax](#ajax), and require an `action` parameter and CSRF token.

```twig{3-4}
{# Let your users request a password reset: #}
<form method="post" action="{{ setPasswordUrl }}">
  <label for="loginName">Username or email</label>
  {{ input('text', 'loginName', null, {
    id: 'loginName',
  }) }}

  <button>Reset Password</button>
</form>
```

Some `POST` requests will write [flashes](#flashes) into the session to communicate successes and failures.

::: tip
Flashes are _not_ set when using [Ajax](#ajax).
Look for confirmation and errors in the response!
:::

#### `GET`

`GET` requests are made by accessing an action URL by way of a regular anchor tag, a form submission, or Ajax. In the [examples](#available-actions) that follow, `GET` action requests are much less common than `POST`, as the bulk of read-only request routing is handled for you, out of the box.

::: code
```twig Anchor/Link
{# Output a “log out” link: #}
<a href="{{ actionUrl('users/logout') }}">Log Out</a>

{# Craft actually provides a shortcut for this: #}
<a href="{{ logoutUrl }}">Log Out</a>
```
```twig Form
{# Pass any element to this (say, as a Twig partial) to get a control panel edit button: #}
<form>
  {{ actionInput('elements/redirect') }}
  {{ hiddenInput('elementId', object.id) }}

  <button>Edit</button>
</form>
```
```js Ajax
// Get info about the current session (guests) and user (if logged in):
fetch('/actions/users/session-info', {
  headers: {
    'Accept': 'application/json',
  },
})
.then(response => response.json())
.then(result => console.log(result));
// -> { isGuest: true, timeout: 0, csrfTokenValue: '...' }
```
:::

::: tip
You may notice that the `actionUrl()` function generates URLs with `index.php` visible, despite your <config5:omitScriptNameInUrls> setting. This is intended, as it guarantees compatibility with all environments, regardless of configuration.

If you need a cleaner URL, consider setting up a custom [route](../system/routing.md#advanced-routing-with-url-rules).
:::

### CSRF

<Todo notes="Update with sec-fetch header progress" />

Craft has built-in [Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf) mitigation, and therefore requires a valid session and token any time data is POSTed to a controller action.

For requests initiated by an HTML `<form>`, use the `csrfInput()` [Twig helper](#form-helpers):

```twig{2}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}

  {# ... #}
</form>
```

The process is slightly more complicated for [Ajax](#ajax) requests, but can be abstracted in a manner appropriate for your project.

Any time a CSRF token is generated during a request, Craft sends no-cache headers to prevent tokens from leaking across sessions or becoming stale.

::: warning
Tokens can still be captured within [`{% cache %}` tags](tags.md#cache), so be mindful of context when rendering forms!
:::

### Form Helpers

Craft has a number of built-in Twig functions to make dealing with forms and input easier.

Function | Notes
-------- | -----
[actionInput()](../reference/twig/functions.md#actioninput) | Generate a hidden HTML `<input>` element that routes the request to a specific [action](#actions) URL.
[actionUrl()](../reference/twig/functions.md#actionurl) | Generate an absolute URL to the specified [action](#actions). Typically used in a form’s `action` attribute.
[csrfInput()](../reference/twig/functions.md#csrfinput) | Generate a hidden HTML `<input>` required for CSRF protection.
[failMessageInput()](../reference/twig/functions.md#failmessageinput) | Override error-condition flash messages. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.
[hiddenInput()](../reference/twig/functions.md#hiddeninput) | Lower-level helper for generating hidden HTML inputs.
[input()](../reference/twig/functions.md#input) | Even finer-grained control over HTML `<input>` element creation.
[redirectInput()](../reference/twig/functions.md#redirectinput) | Generates a hidden HTML `<input>` element to control redirection after successful requests. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.
[successMessageInput()](../reference/twig/functions.md#successmessageinput) | Override success-condition flash messages. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.

### Ajax

In order to respond appropriately, Craft requires that Ajax requests are identified as such. Some tools (like jQuery) need no configuration; others (like the native [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)) will need to be configured explicitly:

Header | Notes
------ | -----
`Accept` | Set to `application/json` to receive a JSON response (when available).
`X-CSRF-Token` | Send a valid CSRF token (for POST requests) if none is provided in the request body under the key determined by <config5:csrfTokenName>.
`Content-Type` | Set to `application/json` if the request’s body is a serialized [JSON payload](#sending-json) (as opposed to `FormData`).
`X-Craft-Site` | Set to a valid [site](../system/sites.md) handle or ID to treat the request as though it were part of a specific site.
`X-Craft-Site-Token` | Set to a hashed site ID (_not_ a handle) to force a request to use a particular site. This can also be supplied as a query or body parameter under a key determined by <config5:siteToken>.

A [CSRF](#csrf) token is still required for Ajax requests using the `POST` method.
You can ensure a session is started (for guests) by preflighting a request to the [`users/session-info` action](#get-userssession-info):

```js
// Helper for fetching a CSRF token:
const getSessionInfo = function() {
  return fetch('/actions/users/session-info', {
    headers: {
      'Accept': 'application/json',
    },
  })
  .then(response => response.json());
};

// Session info is passed to the chained handler:
getSessionInfo()
  .then(session => {
    const params = new FormData();

    // Read the User’s ID from the session data (assuming they’re logged in):
    params.append('userId', session.id);
    params.append('fullName', 'Tony Tiger');

    return fetch('/actions/users/save-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': session.csrfTokenValue,
      },
      body: params,
    })
    .then(response => response.json())
    .then(result => console.log(result));
  });
```

This example assumes you have no preexisting HTML from the server, as though it were part of a [headless](config5:headlessMode) application.
If you are working on a hybrid front-end (and sprinkling interactivity into primarily server-rendered pages), you could eliminate the first request by stashing the user ID and CSRF token in the document’s `<head>` (or on another relevant element) and reading it with JavaScript:

```twig{4,7,13}
<button
  id="update-name"
  data-user-id="{{ currentUser.id }}"
  data-csrf-token="{{ session.token() }}">Edit Name</button>

<script>
  const $button = document.getElementById('update-name');

  $button.addEventListener('click', function(e) {
    const params = new FormData();

    params.append('userId', $button.dataset.userId);
    params.append('_token', $button.dataset.csrfToken);
    params.append('fullName', prompt('New name:'));

    fetch('/actions/users/save-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: params,
    })
    .then(response => response.json())
    .then(result => console.log(result));
  });
</script>
```

::: warning
Note that by generating and outputting a CSRF token into HTML, the page can no longer be safely cached.
:::

When using the `fetch()` API, the body of a request can be set to a `FormData` object populated from an HTML form, as well.
In this example, we are using Laravel’s default `csrf_field()` to inject a hidden input with the current token:

```twig{2,10,15}
<form method="post" action="{{ actionUrl('users/save-user') }}" id="user-profile">
  {{ csrf_field() }}

  <input type="text" name="fullName" value="{{ currentUser.fullName }}" required>

  <button>Save</button>
</form>

<script>
  const $form = document.getElementById('user-profile');

  $form.addEventListener('submit', function(event) {
    event.preventDefault();

    fetch(this.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: new FormData($form),
    })
    .then(response => response.json())
    .then(result => console.log(result));
  });
</script>
```

[GraphQL](graphql.md) requests _do not_ use CSRF, for queries or mutations.

#### CORS

<Todo notes="CORS is probably a middleware concern?" />

Requests sent from a domain other than the one Craft is running on (including different subdomains, unless you’ve set <config5:defaultCookieDomain>) may need to use the [`credentials`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials) request option, and configure appropriate `Access-Control-Allow-Credentials` and `Access-Control-Allow-Origin` [headers](../reference/config/app.md#cors) in Craft.

#### Sending JSON

If you prefer to work with a JSON payload for the body, you must include [the appropriate `Content-Type` header](laravel:requests#retrieving-json-input-values).
The equivalent `users/save-user` request would look like this:

```js{11}
// ...
const params = {
  userId: $button.dataset.userId,
  fullName: prompt('New name:'),
};

fetch('/actions/users/save-user', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': $button.dataset.csrfToken,
  },
  body: JSON.stringify(params),
})
.then(response => response.json())
.then(result => console.log(result));
```

Files cannot be uploaded when using `Content-Type: application/json`.

#### Sites

In [headless](config5:headlessMode) mode, and when using [actions](#actions) or otherwise site-agnostic routes (i.e. configured via the [Guest Entries](plugin:guest-entries) plugin), Craft uses the [primary site](../system/sites.md#primary-site), by default.
This means that element queries, static message translations, emails, and other language-dependent features may be handled in unexpected ways.

Send a valid site ID or handle under the `X-Craft-Site` header to tell Craft that it should handle the request in the context of a specific site:

```js{6}
fetch('/guest-entries/save', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Craft-Site': 'corporateFr',
  },
})
.then(response => response.json())
.then(result => console.log(result));
```

<!-- Renamed from Models and Validation -->
<a name="models-and-validation"></a>

### Validation

Craft uses a few different techniques to validate form data, while providing a consistent way to access flashes, errors, and submitted data.
This means your forms will have a familiar structure, whether you’re saving an [element](../system/elements.md) or submitting a [contact form](plugin:contact-form).

If you encounter [errors](#failure) when creating or saving something, the submitted data will be available in the template via Laravel’s `old()` helper, and a [flash](#flashes) will be set.
Field-level errors (for any attribute or custom field that did not validate) are available through the global `errors` variable.

While abbreviated, this “user profile” form contains all the patterns required to display contextual validation errors:

::: code
```twig account.twig
{# This layout contains a global place for flash messages: #}
{% extends '_layouts/default' %}

{# Require an active user session: #}
{% requireLogin %}

{% block content %}
  {# Display the user’s saved name: #}
  <h1>Hello, {{ currentUser.fullName }}</h1>

  <form method="post" action="{{ actionUrl('users/save-user') }}">
    {{ hiddenInput('userId', user.id) }}

    <label for="fullName">Full Name</label>

    {{ input('text', 'fullName', old('fullName', currentUser.fullName ?? ''), {
      id: 'fullName',
      aria: {
        invalid: errors.has('fullName'),
        errormessage: errors.has('fullName') ? 'fullName-errors' : null,
      },
    }) }}

    {% if errors.has('fullName') %}
      {{ ul(errors.get('fullName'), { id: 'fullName-errors' }) }}
    {% endif %}

    {# ...other fields and attributes... #}

    <button>Save</button>
  </form>
{% endblock %}
```
```twig _layouts/default.twig
<!DOCTYPE html>
<html lang="{{ currentSite.language }}">
  <head>
      <meta charset="UTF-8">
      <title>{{ siteName }}</title>
  </head>
  <body>
    {# Output flashes in a global space: #}
    {% set flashes = session().only(['success', 'error']) %}

    {% if flashes is not empty %}
      {% for level, flash in flashes %}
        <p class="{{ level }}" role="alert">{{ flash }}</p>
      {% endfor %}
    {% endif %}

    {# The form will get injected here: #}
    {% block content null %}
  </body>
</html>
```
:::

This example takes advantage of the global `currentUser` variable.
Creating or editing dynamic records (like an entry) will require setting up parameterized [routes](../system/routes.md), loading the corresponding entry, and checking additional permissions.
You can use the loaded object’s properties to populate default values for your inputs:

```twig
{# /account/ratings/{entryId} -> resources/views/_account/edit-review.twig #}

{% set entry = entries()
  .section('ratings')
  .author(currentUser)
  .id(entryId)
  .first() %}

{% if not entry %}
  {% exit 404 'The rating could not be found.' %}
{% endif %}

{{ input('text', 'title', old('title', entry.title ?? null)) }}
```

The routing and “lifecycle” aspects of editing content in the front-end is discussed in greater depth in the [entry form tutorial](kb:entry-form).

::: tip
In previous versions of Craft, you would typically access submitted data and model errors from the model itself.
This is still possible in some scenarios, but we strongly recommend using Laravel’s standardized [`errors` bag](laravel:validation#working-with-error-messages), and the `old()` helper to pull values from the session.

Note that the new behavior means you will be interacting directly with plain values (`old('title')` as a string) instead of hydrated models (`entry.title` as part of an entry element), at any nesting level (like when submitting multiple Matrix entries).
:::

The same principles apply to anything else you want to make editable in the front-end, so long as the user has the correct permissions.
Take a look at the [public registration forms](kb:front-end-user-accounts) for some examples of validation on forms available to guests—and to learn about some nice abstractions that will help reduce repetition in your form markup!

### Flashes

Flashes are temporary messages Craft stores in your session, typically under keys corresponding to their severity, like `success` or `error`.
You should output flashes on any page that has a form, and pages that users may be redirected to after submission.
To make flashes available everywhere, consider placing this in a global [layout](twig.md#template-inheritance):

```twig
{# Retrieve all flashes: #}
{% set flashes = session().all() %}

{% if flashes | length %}
  {% for level, flash in flashes %}
    {# Use the level (most often `success` or `error`) to customize styles: #}
    <p class="{{ level }}">{{ flash }}</p>
  {% endfor %}
{% endif %}
```

Most endpoints support customizing success and fail flashes:

```twig{2,3}
<form method="post" action="{{ actionUrl('entries/save-entry') }}">
  {{ successMessageInput('Your feedback has been logged!') }}
  {{ failMessageInput('Something went wrong when submitting your message.') }}

  {# ... #}

  <textarea name="fields[reviewBody]"></textarea>

  <button>Rate</button>
</form>
```

Laravel also uses the session to send submitted data and field-level validation errors back to a template in [failure](#failure) states, but you are apt to access those through the global `errors` variable or `old()` helper function, not `session()`.

## Responses

Craft is largely consistent in how it responds to form submissions.
Exceptions are noted in each of the [available actions](../reference/http-api.md#available-actions)’ **Response** sections.

Let’s look at some typical success and failure states and how they differ.

### Success

Successful responses are mostly handled via the `CraftCms\Cms\Http\RespondsWithFlash::asSuccess()` or `asModelSuccess()` methods.

#### After a GET Request

Craft’s response to a GET request varies based on whether it included an `Accept: application/json` header—and the substance of the response will differ greatly from action to action (and in [error](#failure) states).

Some GET requests issue redirects (like when you send a signed-in user to your `loginUrl`).

#### After a POST Request

Successful POST requests will often culminate in a [flash](#flashes) being set (under the `success` key) and a 300-level redirection.

Some routes make this redirection configurable (<config5:passwordSuccessPath> or <config5:activateAccountSuccessPath>, for instance)—but sending a hashed `redirect` param with your request will always take precedence.

::: tip
The [`redirectInput()`](../reference/twig/functions.md#redirectinput) function takes the guesswork out of rendering this input.
:::

```twig{2-3}
<form method="post" action="{{ actionUrl('users/send-password-reset-email') }}">
  {# Redirect to a page with further instructions: #}
  {{ redirectInput('help/account-recovery') }}

  {# The above is equivalent to: #}
  <input
    type="hidden"
    name="redirect"
    value="{{ 'help/account-recovery' | hash }}">

  {{ input('email', 'loginName', null, {
    required: true,
  }) }}

  <button>Reset Password</button>
</form>
```

The `redirect` param accepts an [object template](../system/object-templates.md), which is evaluated just before it’s issued, and can reference properties of the element or record you were working with:

```twig
<form method="post" action="{{ actionUrl('entries/save-entry') }}">
  {# Redirect the user to the public page: #}
  {{ redirectInput('community-posts/{uid}') }}

  {# ...entry options... #}

  {{ input('text', 'title', old('title')) }}

  <button>Post + View</button>
</form>
```

::: tip
Inspecting the HTML output, you’ll see your template exactly as provided.
Why wasn’t it rendered?
The “template” will be securely submitted along with your POST request and be rendered _after_ the entry is saved—that’s why we’re able to use properties (like `{uid}`, in the example) whose values aren’t yet known.
:::

For JSON responses, redirection does’t make as much sense—so Craft will include the resolved `redirect` value for your client to navigate programmatically (say, via `window.location = resp.redirect`).

In addition to the `redirect` property, the response object will include a `message` key with the same text that would have been flashed (for a `text/html` response)—either a specific message from Craft, or one provided in the request via the [globally-supported `successMessage` param](../reference/http-api.md#globally-supported-params). Additional action-specific properties are also returned at the top level of the response object.

### Failure

Failed responses are mostly handled via the `CraftCms\Cms\Http\RespondsWithFlash::asFailure()` or `asModelFailure()` methods.

#### During a GET Request

A GET request will typically only fail if an exception is thrown in the process of generating a response.
The criteria for that failure depends on the action, but can also be circumstantial—like a lost database connection.

If the request included an `Accept: application/json` header, Craft will send a `message` key in the JSON response, or a complete stack trace when `APP_DEBUG` is on.
Otherwise, Craft displays a standard [error view](../system/routing.md#error-templates).

#### During a POST Request

POST requests can fail for the same reasons a GET request might, but because they are often responsible for mutating data, you’ll also be contending with [validation](#models-and-validation) errors.

::: tip
We’ll use the term “model” here for technical reasons—but [elements](../system/elements.md) are models, too!
:::

Except in rare, unrecoverable cases, Craft sets an `error` [flash](#flashes) describing the issue, and carries on serving the page at the original path.
Internally, we use Laravel’s `back()` helper to send the submitted data and errors through to your template—making it possible to repopulate inputs and display errors, contextually.
See a complete example of how to handle this in the [models and validation](#models-and-validation) section.

For requests that include an `Accept: application/json` header, Craft instead builds a JSON object with an `errors` key set to a list of the model’s errors (indexed by attribute or field), a `message` key, an array representation of the model, and a `modelName` key with the location of the model data in the payload.
The exact message will be specific to the failure mode, and can be overridden using the [globally-supported `failMessage` param](../reference/http-api.md#global-params).

```json{6}
{
  "errors": {
    "email": "...",
    /* ... */
  },
  "modelName": "user",
  "user": {
    "email": "@craftcms",
    /* ... */
  }
}
```

::: tip
The value of `modelName` in a JSON response is the same as the variable name Craft uses for the model when rendering a template response. We’ll call this out in each action, below!
:::

## Custom Fields

Actions that create or update [elements](../system/elements.md) (like [`entries/save-entry`](../reference/http-api.md#post-entriessave-entry) and [`users/save-address`](#post-userssave-address)) support setting [custom field](../system/fields.md) values.
Only fields that are included in a request will be updated.

Fields should be submitted under a `fields` key, using their handle:

```twig{5}
<form method="post" action="{{ actionUrl('entries/save-entry') }}">
  {{ input('text', 'fields[myCustomFieldHandle]') }}

  <button>Save Entry</button>
</form>
```

In the event you need to re-key the custom field data in the request, you can send a `fieldsLocation` param:

```twig{4,7}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}
  {{ hiddenInput('fieldsLocation', 'f')}}

  {# Don’t forget to update all your input names! #}
  {{ input('text', 'f[myCustomFieldHandle]') }}

  <button>Save Entry</button>
</form>
```

### Field + Data Types

Fields (and attributes) that use [scalar](https://www.php.net/manual/en/function.is-scalar.php) values like numbers, text, or booleans will work as expected with a single input.

Other types may require multiple inputs or specific naming conventions.

#### Date + Time

Entries’ native `postDate` and `expiryDate` properties can be handled in the same way [date/time fields](../reference/field-types/date-time.md#saving-date-fields) are; but instead of passing their values under a `fields` key, you’ll send them as top-level keys in a POST request:

::: code
```twig Unified
{{ input('datetime-local', 'postDate', entry.postDate|atom) }}
```
```twig Discrete Inputs
{{ input('date', 'postDate[date]', entry.postDate.format('Y-m-d')) }}
{{ input('time', 'postDate[time]', entry.postDate.format('G:i')) }}
```
:::

Both of these options will POST valid data that Craft can reconstruct into a PHP DateTime object.

::: tip
Some date properties (like `dateUpdated` and `dateCreated`) may be determined by Craft, and are not editable.
:::

#### Relations

Assets, categories, entries, and tags can be associated to a [relational](../system/relations.md) field by passing an array of IDs. For more information and examples, see the relevant field type documentation:

- [Assets fields](../reference/field-types/assets.md#saving-assets-fields)
- [Entries fields](../reference/field-types/entries.md#saving-entries-fields)
- [Categories fields](../reference/field-types/categories.md#saving-categories-fields)
- [Tags fields](../reference/field-types/tags.md#saving-tags-fields)
