---
description: Exchange data with Craft over HTTP.
related:
  - uri: ../reference/controller-actions.md
    label: Controller Action Reference
  - uri: graphql.md
    label: Using Craft’s GraphQL API
---

# Forms

If you’ve gotten familiar with Craft’s [control panel](../system/control-panel.md), you might be wondering what kinds of things you can do from your site’s front-end. The answer is actually _quite a bit_!

<!-- more -->

Any time you want to get information from (or send information _to_) Craft, it’s part of the [request](#making-requests)-[response](#responses) lifecycle. This page covers the process of setting up HTML forms (and other types of requests like [Ajax](#ajax)!) to send and receive data in a way that Craft understands.

<See path="../reference/controller-actions.md" label="Controller Actions Reference" description="See a list of controller actions you can interact with via forms." />

## Making Requests

Most of your interactions with Craft so far have likely been over HTTP. Let’s take a look at how Craft determines what to do when it receives a request.

### Params

This page will make frequent references to _query_ and _body_ params. These are named values sent with a request, either encoded after a `?` in the URL, or within the “body” of a request. Query params are used in [GET](#get) and [POST](#post) requests, but body params are only used in POST requests.

Craft uses a handful of params to properly route a request, but may expect others based on what it thinks the user is requesting. For example, most requests use an [action](#actions) param, but a [login request](../reference/controller-actions.md#post-userslogin) also requires a `username` and `password` param.

### Actions

An “action request” is one that explicitly declares the [controller and action](../reference/controller-actions.md) to use, via an `action` query or body param.

::: tip
This `action` parameter is different from the `<form action="...">` attribute:

- The `action` _param_ should be used within a URL query string (`?action=...`) for `GET` requests, or in the body of a `POST` request.
- The _form attribute_ should only be used when you want to control where a user is sent in [failure scenarios](#failure). When an `action` param is _not_ present in the request, you can use an “action path” like `action="/actions/users/login"`. This attribute has no effect if a redirect is issued in response to the request!
:::

Craft also supports routing to specific actions using a path (beginning with the <config5:actionTrigger> setting), or by creating an [rule in `routes.php`](../routing.md#advanced-routing-with-url-rules).

### HTTP Verbs

Each action usually responds to one [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Using an unsupported method will throw a <yii2:yii\web\BadRequestHttpException>, and show your [error template](../routing.md#error-templates) with a 400 `statusCode`—or send a JSON response with an `error` key.

#### `POST`

All `POST` requests are made through forms or [Ajax](#ajax), and require an `action` parameter and CSRF token.

```twig{3-4}
{# Let your users request a password reset: #}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/send-password-reset-email') }}

  <label for="loginName">Username or email</label>
  {{ input('text', 'loginName', null, {
    id: 'loginName',
  }) }}

  <button>Reset Password</button>
</form>
```

Some `POST` requests will write [flashes](#flashes) into the session to communicate successes and failures.

::: tip
Flashes are _not_ set when using [Ajax](#ajax). Look for confirmation and errors in the response!
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

If you need a cleaner URL, consider setting up a custom [route](../routing.md#advanced-routing-with-url-rules).
:::

### CSRF

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

### Form Helpers

Craft has a number of built-in Twig functions to make dealing with forms and input easier.

Function | Notes
-------- | -----
[actionInput()](./functions.md#actioninput) | Generate a hidden HTML `<input>` element for controlling which action a `<form>` should route to.
[actionUrl()](./functions.md#actionurl) | Generate an absolute URL to the specified action, with any extra params. <badge vertical="baseline" type="verb">GET</badge> only.
[csrfInput()](./functions.md#csrfinput) | Generate a hidden HTML `<input>` required for CSRF protection.
[failMessageInput()](./functions.md#failmessageinput) | Override error-condition flash messages. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.
[hiddenInput()](./functions.md#hiddeninput) | Lower-level helper for generating hidden HTML inputs.
[input()](./functions.md#input) | Even finer-grained control over HTML `<input>` element creation.
[redirectInput()](./functions.md#redirectinput) | Generates a hidden HTML `<input>` element to control redirection after successful requests. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.
[successMessageInput()](./functions.md#successmessageinput) | Override success-condition flash messages. <badge vertical="baseline" type="verb">POST</badge> only, ignored for Ajax requests.

### Ajax

In order to respond appropriately, Craft requires that Ajax requests are identified as such. Some tools (like jQuery) need no configuration; others (like the native [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)) will need to be configured explicitly:

Header | Notes
------ | -----
`Accept` | Set to `application/json` to receive a JSON response (when available).
`X-Requested-With` | Set to `XMLHttpRequest` if your templates rely on `craft.app.request.isAjax`.
`X-CSRF-Token` | Send a valid CSRF token (for POST requests) if none is provided in the request body under the key determined by <config5:csrfTokenName>.
`Content-Type` | Set to `application/json` if the request’s body is a serialized [JSON payload](#sending-json) (as opposed to `FormData`).

A CSRF token is still required for Ajax requests using the `POST` method. You can ensure a session is started (for guests) by preflighting a request to the [`users/session-info` action](#get-userssession-info):

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
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: params,
    })
    .then(response => response.json())
    .then(result => console.log(result));
  });
```

This example assumes you have no preexisting HTML from the server, as though it were part of a [headless](config5:headlessMode) application. If you are working on a hybrid front-end (and sprinkling interactivity into primarily server-rendered pages), you could eliminate the first request by stashing the user ID and CSRF token in the document’s `<head>` (or on another relevant element) and reading it with JavaScript:

```twig{5,8,14}
<button
  id="update-name"
  data-user-id="{{ currentUser.id }}"
  data-csrf-token-value="{{ craft.app.request.getCsrfToken() }}"
  data-csrf-token-name="{{ craft.app.config.general.csrfTokenName }}">Edit Name</button>

<script>
  const $button = document.getElementById('update-name');

  $button.addEventListener('click', function(e) {
    const params = new FormData();

    params.append('userId', $button.dataset.userId);
    params.append($button.dataset.csrfTokenName, $button.dataset.csrfTokenValue);
    params.append('fullName', prompt('New name:'));

    fetch('/actions/users/save-user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: params,
    })
    .then(response => response.json())
    .then(result => console.log(result));
  });
</script>
```

#### Sending JSON

If you prefer to work with a JSON payload for the body, you must include [the appropriate `Content-Type` header](yii2:yii\web\Request::parsers). The equivalent `users/save-user` request would look like this:

```js{11,15}
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
    'X-CSRF-Token': $button.dataset.csrfTokenValue,
    'X-Requested-With': 'XMLHttpRequest',
  },
  body: JSON.stringify(params),
})
.then(response => response.json())
.then(result => console.log(result));
```

Files cannot be uploaded when using `Content-Type: application/json`.

::: warning
When sending a JSON payload in the body of a request, you _must_ use an action path (`/actions/users/save-user`, as in the example above), or provide the action in a query parameter (`/index.php?action=users/save-user`)—the action will _not_ be properly picked up as a property of the decoded payload.
:::

### Models and Validation

Most of the data creation and manipulation actions we’ll cover revolve around <yii2:yii\base\Model>s. Craft uses models to store and validate all kinds of things—including every type of [element](../elements.md) you’re already familiar with!

If you encounter [errors](#failure) when creating or saving something, it will usually be passed back to your template as a special variable like `entry` or `user`, and a [flash](#flashes) will be set. Every model has a `.getErrors()` method that returns a list of messages for any attribute (or custom field) that did not validate.

While abbreviated, this “user profile” form contains all the patterns required to display contextual validation errors:

::: code
```twig account.twig
{% extends '_layouts/default' %}

{# Require an active user session: #}
{% requireLogin %}

{% block content %}
  {# Display the user’s saved name: #}
  <h1>Hello, {{ currentUser.fullName }}</h1>

  {# Normalize the `user` variable, so we can use it in the form regardless of whether or not it was rendered following a submission attempt: #}
  {% set user = user ?? currentUser %}

  <form method="post">
    {{ csrfInput() }}
    {{ actionInput('users/save-user') }}
    {{ hiddenInput('userId', user.id) }}

    <label for="fullName">Full Name</label>

    {{ input('text', 'fullName', user.fullName, {
      id: 'fullName',
      aria: {
        invalid: user.hasErrors('fullName'),
        errormessage: user.hasErrors('fullName') ? 'fullName-errors' : null,
      },
    }) }}

    {% if user.hasErrors('fullName') %}
      <ul id="fullName-errors">
        {% for error in user.getErrors('fullName') %}
          <li>{{ error }}</li>
        {% endfor %}
      </ul>
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
    {% set flashes = craft.app.session.getAllFlashes(true) %}

    {% if flashes | length %}
      {% for level, flash in flashes %}
        <p class="{{ level }}" role="alert">{{ flash }}</p>
      {% endfor %}
    {% endif %}

    {% block content null %}
  </body>
</html>
```
:::

The same principles apply to anything else you want to make editable in the front-end, so long as the user has the correct permissions. Take a look at the [public registration forms](kb:front-end-user-accounts) for some examples of validation on forms available to guests—and to learn about some nice abstractions that will help reduce repetition in your form markup!

#### Flashes

Flashes are temporary messages Craft stores in your session, typically under keys corresponding to their severity, like `notice` or `error`. You can output flashes in your templates:

```twig
{# Retrieve + clear all flashes: #}
{% set flashes = craft.app.session.getAllFlashes(true) %}

{% if flashes | length %}
  {% for level, flash in flashes %}
    {# Use the level (most often `notice` or `error`) to customize styles: #}
    <p class="{{ level }}">{{ flash }}</p>
  {% endfor %}
{% endif %}
```

## Responses

Action requests are largely consistent in their behavior—exceptions will be noted in each of the [available actions](#available-actions)’ **Response** sections.

Let’s look at some typical success and failure states and how they differ.

### Success

Successful responses are mostly handled via the <craft5:craft\web\Controller::asModelSuccess()> or [asSuccess()](craft5:craft\web\Controller::asSuccess()) methods.

#### After a GET Request

Craft’s response to a GET request varies based on whether it included an `Accept: application/json` header—and the substance of the response will differ greatly from action to action.

#### After a POST Request

Successful POST requests will often culminate in a [flash](#flashes) being set (under the `notice` key) and a 300-level redirection.

Some routes make this redirection configurable (<config5:passwordSuccessPath> or <config5:activateAccountSuccessPath>, for instance)—but sending a hashed `redirect` param with your request will always take precedence.

::: tip
The [`redirectInput()`](./functions.md#redirectinput) function takes the guesswork out of rendering this input.
:::

```twig{5-6}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('users/send-password-reset-email') }}

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

The `redirect` param accepts an [object template](../../system/object-templates.md), which is evaluated just before it’s issued, and can reference properties of the element or record you were working with:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}

  {# Redirect the user to the public page: #}
  {{ redirectInput('community-posts/{uid}') }}

  {# ...entry options... #}

  {{ input('text', 'title') }}

  <button>Post + View</button>
</form>
```

::: tip
Inspecting the HTML output, you’ll see your template exactly as provided. Why wasn’t it rendered? The “template” will be securely submitted along with your POST request and be rendered _after_ the entry is saved—that’s why we’re able to use properties (like `{uid}`, in the example) whose values aren’t yet known.
:::

For JSON responses, redirection does’t make as much sense—so Craft will include the resolved `redirect` value for your client to navigate programmatically (say, via `window.location = resp.redirect`).

In addition to the `redirect` property, the response object will include a `message` key with the same text that would have been flashed (for a `text/html` response)—either a specific message from Craft, or one provided in the request via the [globally-supported `successMessage` param](#global-params). Additional action-specific properties are also returned at the top level of the response object.

### Failure

Failed responses are mostly handled via the <craft5:craft\web\Controller::asModelFailure()> or [asFailure()](craft5:craft\web\Controller::asFailure()) methods.

<Todo notes="Simplify action documentation, below" />

#### During a GET Request

A GET request will typically only fail if an exception is thrown in the process of generating a response. The criteria for that failure depends on the action, but can also be circumstantial—like a lost database connection.

If the request included an `Accept: application/json` header, Craft will send a `message` key in the JSON response, or a complete stack trace when <config5:devMode> is on. Otherwise, Craft displays a standard [error view](../routing.md#error-templates).

#### During a POST Request

POST requests can fail for the same reasons a GET request might—but because they are often responsible for mutating data, you’ll also be contending with [validation](#models-and-validation) errors.

::: tip
We’ll use the term “model” here for technical reasons—but [elements](../elements.md) are models, too!
:::

In all but rare, unrecoverable cases, Craft sets an `error` [flash](#flashes) describing the issue, and carries on serving the page at the original path (either the page the request came from, or whatever was in the originating `<form action="...">` attribute). By virtue of being part of the same request that populated and validated a model, Craft is able to pass it all the way through to the rendered template—making it possible to repopulate inputs and display errors, contextually. See a complete example of how to handle this in the [models and validation](#models-and-validation) section.

For requests that include an `Accept: application/json` header, Craft will instead build a JSON object with an `errors` key set to a list of the model’s errors (indexed by attribute or field), a `message` key, an array representation of the model, and a `modelName` key with the location of the model data in the payload. The exact message will be specific to the failure mode, and can be overridden using the [globally-supported `failMessage` param](#global-params).

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

Actions that create or update elements (like [`entries/save-entry`](#post-entriessave-entry) and [`users/save-address`](#post-userssave-address)) support setting [custom field](../fields.md) values. Only fields that are included in a request will be updated.

Fields should be submitted under a `fields` key, using their handle:

```twig{5}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}

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

Entries’ native `postDate` and `expiryDate` properties can be handled in the same way [date/time fields](../date-time-fields.md#saving-date-fields) are; but instead of passing their values under a `fields` key, you’ll send them as top-level keys in a POST request:

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

Assets, categories, entries, and tags can be associated to a [relational](../relations.md) field by passing an array of IDs. For more information and examples, see the relevant field type documentation:

- [Assets fields](../reference/field-types/assets.md#saving-assets-fields)
- [Entries fields](../reference/field-types/entries.md#saving-entries-fields)
- [Categories fields](../reference/field-types/categories.md#saving-categories-fields)
- [Tags fields](../reference/field-types/tags.md#saving-tags-fields)
