---
description: Craft has a powerful and secure HTTP API for interacting with accounts, content, and other features from your front-end.
sidebarDepth: 2
related:
  - uri: https://craftcms.com/knowledge-base/front-end-user-accounts
    label: Supporting Public Registration
  - uri: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
    label: Yii Controllers Guide
updatedVersion: 5.x/reference/controller-actions.md
---

# Controller Actions

Controllers are Craft’s way of talking to the outside world. Pretty much everything you do with Craft is part of a request that involves a [controller action](guide:structure-controllers)—from updating settings to rendering an entry.

Most controllers and actions are carefully locked down with [permissions](../user-management.md#permissions) to prevent malicious activity, but a select few are necessarily available to users and guests _without_ special permissions to support features like [public registration](../user-management.md#public-registration) or [cart management](/commerce/4.x/orders-carts.md).

To get a sense for the kind of things you can do, jump to the [available actions](#available-actions).

## Making Requests

An “action request” is one that explicitly declares the controller and action to use, via an `action` query or body param.

::: tip
This `action` parameter is different from the `<form action="...">` attribute:

- The `action` _param_ should be used within a URL query string (`?action=...`) for `GET` requests, or in the body of a `POST` request.
- The _form attribute_ should only be used when you want to control where a user is sent in [failure scenarios](#failure). When an `action` param is _not_ present in the request, you can use an “action path” like `action="/actions/users/login"`. This attribute has no effect if a redirect is issued in response to the request!
:::

Craft also supports routing to specific actions using a path (beginning with the <config4:actionTrigger> setting), or by creating an [rule in `routes.php`](../routing.md#advanced-routing-with-url-rules).

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
You may notice that the `actionUrl()` function generates URLs with `index.php` visible, despite your <config4:omitScriptNameInUrls> setting. This is intended, as it guarantees compatibility with all environments, regardless of configuration.

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

Any time a CSRF token is generated during a request, Craft sends no-cache headers to prevent tokens from leaking across sessions or becoming stale. <Since ver="4.11.0" description="We began sending automatic no-cache headers in {product} {ver}." />

::: warning
Tokens can still be captured within [`{% cache %}` tags](tags.md#cache), so be mindful of context when rendering forms—or pass the [`async` option](../reference/twig/functions.md#csrfinput) to `csrfInput()`!
:::

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
`X-CSRF-Token` | Send a valid CSRF token (for POST requests) if none is provided in the request body under the key determined by <config4:csrfTokenName>.
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

This example assumes you have no preexisting HTML from the server, as though it were part of a [headless](config4:headlessMode) application. If you are working on a hybrid front-end (and sprinkling interactivity into primarily server-rendered pages), you could eliminate the first request by stashing the user ID and CSRF token in the document’s `<head>` (or on another relevant element) and reading it with JavaScript:

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

::: warning
Note that by generating and outputting a CSRF token into HTML, the page can no longer be safely cached.
:::

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

Successful responses are mostly handled via the <craft4:craft\web\Controller::asModelSuccess()> or [asSuccess()](craft4:craft\web\Controller::asSuccess()) methods.

#### After a GET Request

Craft’s response to a GET request varies based on whether it included an `Accept: application/json` header—and the substance of the response will differ greatly from action to action.

#### After a POST Request

Successful POST requests will often culminate in a [flash](#flashes) being set (under the `notice` key) and a 300-level redirection.

Some routes make this redirection configurable (<config4:passwordSuccessPath> or <config4:activateAccountSuccessPath>, for instance)—but sending a hashed `redirect` param with your request will always take precedence.

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

The `redirect` param accepts an [object template](../object-templates.md), which is evaluated just before it’s issued, and can reference properties of the element or record you were working with:

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

Failed responses are mostly handled via the <craft4:craft\web\Controller::asModelFailure()> or [asFailure()](craft4:craft\web\Controller::asFailure()) methods.

<Todo note="Simplify action documentation, below" />

#### During a GET Request

A GET request will typically only fail if an exception is thrown in the process of generating a response. The criteria for that failure depends on the action, but can also be circumstantial—like a lost database connection.

If the request included an `Accept: application/json` header, Craft will send a `message` key in the JSON response, or a complete stack trace when <config4:devMode> is on. Otherwise, Craft displays a standard [error view](../routing.md#error-templates).

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

## Available Actions

This is not a comprehensive list! We have selected a few actions to illustrate fundamentals that many projects can benefit from—and to get you prepared to explore the rest of Craft’s [HTTP API](https://github.com/craftcms/cms/tree/main/src/controllers).

Action | Description
------ | -----------
<badge vertical="baseline" type="verb">POST</badge> [entries/save-entry](#post-entries-save-entry) | Creates or updates an entry.
<badge vertical="baseline" type="verb">POST</badge> [users/login](#post-users-login) | Logs a user in.
<badge vertical="baseline" type="verb">POST</badge> [users/save-user](#post-users-save-user) | Creates or updates a user account.
<badge vertical="baseline" type="verb">POST</badge> [users/upload-user-photo](#post-users-upload-user-photo) | Sets a user’s photo.
<badge vertical="baseline" type="verb">POST</badge> [users/send-password-reset-email](#post-users-send-password-reset-email) | Sends a password reset email.
<badge vertical="baseline" type="verb">GET/POST</badge> [users/set-password](#get-post-users-set-password) | Sets a new password on a user account.
<badge vertical="baseline" type="verb">POST</badge> [users/save-address](#post-users-save-address) | Create or update an [address](../addresses.md) element.
<badge vertical="baseline" type="verb">POST</badge> [users/delete-address](#post-users-delete-address) | Delete an address element.
<badge vertical="baseline" type="verb">GET</badge> [users/session-info](#get-users-session-info) | Retrieve information about the current session.
<badge vertical="baseline" type="verb">GET</badge> [app/health-check](#get-app-health-check) | Ping your app to make sure it’s up.

In each of the following examples, you’ll find a list of **Supported Params** (the values you can send as <badge vertical="baseline" type="verb">GET</badge> query params or in the <badge vertical="baseline" type="verb">POST</badge> body) and information about the possible **Response** conditions.

**Supported Params** can be encoded in the query string, submitted with form inputs, or sent as properties in a [JSON payload](#ajax).

<a name="global-params" title="Parameters respected for all POST requests"></a>

::: tip
All POST actions honor a few additional parameters, except when using an `Accepts: application/json` header:
- `redirect`: A [hashed](./filters.md#hash) URL or path that Craft will send the user to after a [successful request](#after-a-post-request) (i.e. a user is registered or an entry is saved).
- `successMessage`: Overrides the default flash notice for the action.
- `failMessage`: Overrides the default flash error for the action.
:::

### <badge vertical="baseline" type="verb">POST</badge> `entries/save-entry`

Create or update an entry the current User has appropriate permissions for.

::: tip
See the [Entry Form](kb:entry-form) guide for an example of working with this action.
:::

::: warning
Note that _all_ custom fields can updated by users. For this reason, you should not assume that custom fields are protected from modification simply because they are omitted from the form.

Similarly, if you are outputting user-submitted content anywhere on site, take special care to prevent yourself or other users from being exposed to [XSS vulnerabilities](https://owasp.org/www-community/attacks/xss/)!
:::

#### Supported Params

Param | Description
----- | -----------
`author` | The ID of the user account that should be set as the entry author. (Defaults to the entry’s current author, or the logged-in user.)
`canonicalId` | The ID of the entry to save, if updating an existing entry.
`enabledForSite` | Whether the entry should be enabled for the entry’s `siteId` (`1`/`0`), or an array of site IDs that the entry should be enabled for. (Defaults to the `enabled` param.)
`enabled` | Whether the entry should be enabled (`1`/`0`). (Defaults to enabled.)
`entryId` | Fallback if `canonicalId` isn’t passed, for backwards compatibility.
`entryVariable` | The [hashed](./filters.md#hash) name of the variable that should reference the entry, if a validation error occurs. (Defaults to `entry`.)
`expiryDate` | The expiry date for the entry. (Defaults to the current expiry date, or `null`.)
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)
`fields[...]` | [Custom field](#custom-fields) values.
`parentId` | The ID of the parent entry, if it belongs to a structure section.
`postDate` | The post date for the entry. (Defaults to the current post date, or the current time.)
`provisional` | Updates the current user’s provisional draft (in the control panel, this correlates to an auto-save).
`revisionNotes` | Notes that should be stored on the new entry revision.
`sectionId` | The ID of the section the entry will be created in. (Only for new entries. User must have appropriate permissions.)
`siteId` | The ID of the site to save the entry in.
`slug` | The entry slug. (Defaults to the current slug, or an auto-generated slug.)
`sourceId` | Fallback if `canonicalId` isn’t passed, for backwards compatibility.
`title` | The entry title. (Defaults to the current entry title.)
`typeId` | The entry type ID to save the entry as. (Defaults to the current entry type for existing entries, or the first configured type for new ones.)

#### Permissions

Requests to `entries/save-entry` must by made by a logged-in user with the appropriate permissions. Permissions are dependent upon the site, section, and the original author (for existing entries).

It is not currently possible to allow anonymous access without [a plugin](https://plugins.craftcms.com/guest-entries?craft4).

#### Response

The action’s output depends on whether the entry saved successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior](#after-a-post-request). | [Standard behavior](#after-a-post-request); entry available under an `entry` key in the response object.
<x-mark/> | [Standard behavior](#after-a-post-request); entry available under an `entry` variable, in the template. | [Standard behavior](#after-a-post-request).

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/login`

Logs a user in.

::: tip
See the [Front-End User Accounts](kb:front-end-user-accounts#login-form) guide for an example of working with this action.
:::

#### Supported Params

Param | Description
----- | -----------
`loginName` | The username or email of the user to login.
`password` | The user’s password.
`rememberMe` | Whether to keep the user logged-in for an extended period of time per the <config4:rememberedUserSessionDuration> config setting (`1`/`0`).

#### Response

The output of the action depends on whether the login was successful and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior](#after-a-post-request). | [Standard behavior](#after-a-post-request); additional `returnUrl`,  `csrfTokenValue`, and `user` <Since ver="4.5.0" feature="Serialized user model in JSON login responses" /> properties are included in the response object.
<x-mark/> | [Standard behavior](#during-a-post-request); additional `loginName`, `rememberMe`, `errorCode`, and `errorMessage` variables will be available in the template. | [Standard behavior](#during-a-post-request); additional `loginName`, `rememberMe`, `errorCode`, and `errorMessage` properties are included in the response object.

</span>

::: tip
The `errorCode` corresponds to one of the [`craft\elements\User::AUTH_*` constants](craft4:craft\elements\User#constants).
:::

### <badge vertical="baseline" type="verb">POST</badge> `users/save-user`

Registers a new [user account](../user-management.md), or updates an existing one.

::: tip
See the [Front-End User Accounts](kb:front-end-user-accounts#registration-form) guide for an example of working with this action.
:::

::: warning
Note that _all_ custom fields can updated by users. For this reason, you should not assume that custom fields are protected from modification simply because they are omitted from the form.
:::

#### Supported Params

Param | Description
----- | -----------
`admin` | Whether the user should be saved as an admin (`1`/`0`). Only assignable if the logged-in user is an admin.
`currentPassword` | The user’s current password, which is required if `email` or `newPassword` are sent.
`email` | The user’s email address. (Only checked if registering a new user, updating the logged-in user, or the logged-in user is allowed to administrate users.)
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)
`fields[...]` | [Custom field](#custom-fields) values.
`fullName` | The user’s full name. Preferred to discrete `firstName` and `lastName` params.
`firstName` | The user’s first name. `fullName` is preferred.
`lastName` | The user’s last name. `fullName` is preferred.
`newPassword` | The user’s new password, if updating the logged-in user’s account. (If registering a new user, send `password`.)
`passwordResetRequired` | Whether the user must reset their password before logging in again (`1`/`0`). Only assignable if the logged-in user is an admin.
`password` | The user’s password, when registering a new user. (Has no effect if <config4:deferPublicRegistrationPassword> is `true`. To change the current user’s password, send `newPassword`.)
`photo` | An uploaded user photo. Use `<input type="file">`.
`sendVerificationEmail` | Whether a verification email should be sent before accepting the new `email` (`1`/`0`). (Only used if email verification is enabled, and the logged-in user is allowed to opt out of sending it.)
`userId` | The ID of the user to save, if updating an existing user.
`userVariable` | The hashed name of the variable that should reference the user, if a validation error occurs. (Defaults to `user`.)
`username` | The user’s username. (Only checked if the <config4:useEmailAsUsername> config setting is `false`.)

#### Permissions

Special permissions are required to allow users to administrate or update other users. A user can always update their own account.

::: danger
Granting administrative permissions to front-end users opens your site up to permissions escalation and significant abuse.
:::

#### Response

The output depends on whether the user save action was successful and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request); default redirection uses the <config4:activateAccountSuccessPath> config setting, if email verification is not required. | [Standard behavior](#after-a-post-request); additional `id` and `csrfTokenValue` keys.
<x-mark label="Success" /> | [Standard behavior](#during-a-post-request); user will be available in the template under a variable determined by the `userVariable` param, or `user` by default. | [Standard behavior](#during-a-post-request).

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/upload-user-photo`

Sets a user’s photo to an uploaded image.

::: tip
You can update a user’s other properties and fields at the same time as uploading a photo, via [`users/save-user`](#post-users-save-user).
:::

#### Supported Params

Param | Description
----- | -----------
`userId` | ID of the user. Required, pass `{{ currentUser.id }}` to change a user’s own photo.
`photo` | Uploaded image. Use `<input type="file">`.

::: warning
Files cannot be uploaded using `Content-Type: application/json`.
:::

#### Response

The output depends on whether the upload was successful. Only JSON is returned, and the request must include the `Accept: application/json` header.

<span class="croker-table">

State | `application/json`
----- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request); `html` and `photoId` <Since ver="4.3.0" feature="The photoId response property" /> properties. `html` is only useful in control panel contexts.
<x-mark label="Failure" /> | [Standard behavior](#during-a-post-request); additional `error` key is available in the response object, with the exception message.

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/send-password-reset-email`

Sends a password reset email.

::: tip
See the [Front-End User Accounts](kb:front-end-user-accounts#reset-password-forms) guide for an example of working with this action.
:::

#### Supported Params

Param | Description
----- | -----------
`loginName` | The username or email of the user to send a password reset email for.
`userId` | The ID of the user to send a password reset email for. (Only checked if the logged-in user has permission to edit other users.)

#### Response

The output of the action depends on whether the user exists, the reset password email was sent successfully, and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request). | [Standard behavior](#after-a-post-request).
<x-mark label="Failure" /> | [Standard behavior](#during-a-post-request); additional `errors` and `loginName` variables are passed to the template. | [Standard behavior](#during-a-post-request); additional `errors` and `loginName` keys are available in the response object.

</span>

::: tip
The `errors` variable may include multiple discrete failure messages, but the standard `message` variable will still be an accurate summary.
:::

### <badge vertical="baseline" type="verb">GET/POST</badge> `users/set-password`

A <badge vertical="baseline" type="verb">GET</badge> request displays a form allowing a user to set a new password on their account, and <badge vertical="baseline" type="verb">POST</badge> sets a new password on a user account. If the user is [pending](../user-management.md), their account will be activated.

::: tip
This action is responsible for rendering the route defined by the <config4:setPasswordPath> setting.
:::

#### Supported Params

Param | Description
----- | -----------
`code` | <badge vertical="baseline" type="verb">GET/POST</badge> The user’s verification code. Craft will provide this in URLs generated from the control panel, or when a link is sent via email.
`id` | <badge vertical="baseline" type="verb">GET/POST</badge> The user’s UUID.
`newPassword` | <badge vertical="baseline" type="verb">POST</badge> The user’s new password.

::: tip
`code` and `id` are required for both <badge vertical="baseline" type="verb">GET</badge> and <badge vertical="baseline" type="verb">POST</badge> requests; users may click a link from an email that includes both as query params—it’s your responsibility to pass these to Craft as hidden fields (along with `newPassword`) in a subsequent form submission.

See the [Front-End User Accounts](kb:front-end-user-accounts#set-password-form) article for an example of how to set up this form.
:::

#### Response

The output of the action depends on the request method, whether the password was updated successfully, and the `Accept` header.

For <badge vertical="baseline" type="verb">GET</badge> requests:

<span class="croker-table">

State | `text/html`
----- | -----------
<check-mark label="Success" /> | [Standard behavior](#after-a-get-request); template determined by <config4:setPasswordPath> is rendered with `id` and `code` variables available.
<x-mark label="Failure" /> | [Standard behavior](#after-a-get-request); exception message will point to the issue—commonly, a missing or invalid token.

</span>

For <badge vertical="baseline" type="verb">POST</badge> requests:

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request); redirection depends on the <config4:autoLoginAfterAccountActivation> and <config4:setPasswordSuccessPath> config settings, and whether the user has access to the control panel. | [Standard behavior](#after-a-post-request); additional `csrfTokenName` key will be available in the response object.
<x-mark label="Failure" /> | [Standard behavior](#during-a-post-request); `errors` , `code`, `id`, and `newUser` variables will be passed to the resulting template. | [Standard behavior](#during-a-post-request).

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/save-address`

Saves or updates an [address](../addresses.md) element against the current user’s account.

#### Supported Params

Param | Description
----- | -----------
`addressId` | An existing address’s ID can be sent to update it, as long as it’s owned by the current user.
`userId` | Owner of the new address. Owners cannot be changed after creation, and new addresses can only be created for the current user or other users they are allowed to edit.
`fullName` | Name for the address. First and last names are not stored discretely, but can by submitted separately.
`firstName` | Can be submitted independently from `lastName`, but will be combined for storage.
`lastName` | Can be submitted independently from `firstName`, but will be combined for storage.
`countryCode` | Required to localize and validate the rest of the address.
`organization` | Additional line for an organization or business name.
`organizationTaxId` | Tax/VAT ID.
`latitude` and `longitude` | GPS coordinates for the address. Not automatically populated or validated.
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)
`fields[...]` | [Custom field](#custom-fields) values.

::: warning
**This list is incomplete!**

The remaining params depend upon the submitted `countryCode`—refer to the [`commerceguys/addressing` library](https://github.com/commerceguys/addressing/blob/master/src/AddressFormat/AddressField.php#L15-L25) for a comprehensive list, or [learn more about managing addresses](../addresses.md#managing-addresses) in Craft.
:::

#### Response

The output of the action depends on whether the address was saved successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request). | [Standard behavior](#after-a-post-request); address available under the `address` property in the response object.
<x-mark label="Failure" /> | [Standard behavior](#during-a-post-request); additional `address` variable will be passed to the resulting template. | [Standard behavior](#during-a-post-request); additional `address` property will be available in the response object.

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/delete-address`

Deletes an address owned by the current user or another user they can edit.

#### Supported Params

Param | Description
----- | -----------
`addressId` | An existing address ID, owned by the current user or a user they’re allowed to edit.

#### Response

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-post-request). | [Standard behavior](#after-a-post-request); additional `address` property will be available in the response object.
<x-mark label="Failure" /> | [Standard behavior](#during-a-post-request). | [Standard behavior](#during-a-post-request).

</span>


### <badge vertical="baseline" type="verb">GET</badge> `users/session-info`

Retrieves information about the current session. Data is returned as JSON, and is only intended for consumption via [Ajax](#ajax).

#### Response

Only JSON responses are sent, but its content will differ for guests and logged-in users.

<span class="croker-table">

State | `application/json`
----- | ------------------
<check-mark label="Success" /> | [Standard behavior](#after-a-get-request); response object will contain at least `isGuest` and `timeout` keys, plus a `csrfTokenName` <Since ver="4.3.0" feature="The csrfTokenName value" /> and `csrfTokenValue` (when CSRF protection is enabled), and the current user’s `id`, `uid`, `username`, and `email` (if logged in).
<x-mark label="Failure" /> | [Standard behavior](#during-a-get-request).

</span>

### <badge vertical="baseline" type="verb">GET</badge> `app/health-check`

A “[no-op](https://en.wikipedia.org/wiki/NOP_(code))” action provided for automated monitoring.

#### Response

The response will be successful (but empty) in all but “exceptional” situations, like an issue connecting to the database. Read more about [the criteria](kb:configuring-load-balanced-environments#health-check-endpoint) for a successful health check.

<span class="croker-table">

State | Any
----- | ---
<check-mark/> | An empty document with a 200 status code.
<x-mark/> | 400- or 500-level status, with an error message or stack trace (in `devMode`, or when the current user has enabled the “show full exception views” preference enabled).

</span>

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

- [Assets fields](../assets-fields.md#saving-assets-fields)
- [Entries fields](../entries-fields.md#saving-entries-fields)
- [Categories fields](../categories-fields.md#saving-categories-fields)
- [Tags fields](../tags-fields.md#saving-tags-fields)

## Plugins + Custom Actions

Many plugins expose functionality via their own controllers and actions. Their accepted parameters and response types are entirely up to the author, but the [fundamentals](#making-requests) will be the same. Consult the appropriate documentation for specifics!

Here are some examples in our own plugins:

- [Commerce](https://plugins.craftcms.com/commerce): A variety of cart management capabilities are provided for users and guests.
- [Contact Form](https://plugins.craftcms.com/contact-form): Adds the `contact-form/send` action for processing submissions and delivering notifications.
- [Element API](https://plugins.craftcms.com/element-api): Customizable routes get mapped to queries, and return JSON representations of elements.

Custom modules can also provide actions via a [Controller](../extend/controllers.md).
