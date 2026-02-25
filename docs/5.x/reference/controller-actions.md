---
description: Craft has a powerful and secure HTTP API for interacting with accounts, content, and other features from your front-end.
sidebarDepth: 2
related:
  - uri: ../development/forms.md
    label: Working with Forms in Craft
  - uri: https://craftcms.com/knowledge-base/front-end-user-accounts
    label: Supporting Public Registration
  - uri: https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers
    label: Yii Controllers Guide
---

# Controller Actions

Controllers are Craft’s way of talking to the outside world. Pretty much everything you do with Craft is part of a request that involves a [controller action](guide:structure-controllers)—from updating settings to rendering an entry.

Most controllers and actions are carefully locked down with [permissions](../system/user-management.md#permissions) to prevent malicious activity, but a select few are necessarily available to users and guests _without_ special permissions to support features like [public registration](../system/user-management.md#public-registration) or [cart management](/commerce/5.x/system/orders-carts.md).

The following list of controller actions is non-exhaustive, but covers common patterns like [logging in](#post-userslogin), [creating entries](#post-entriessave-entry), and [managing an address book](#post-userssave-address).

<See path="../development/forms.md" label="Using Forms" description="Start here to learn about sending data to Craft." />

## Available Actions

This is not a comprehensive list! We have selected a few actions to illustrate fundamentals that many projects can benefit from—and to get you prepared to explore the rest of Craft’s [HTTP API](craft5:craft\controllers\AddressesController).

Action | Description
------ | -----------
<badge vertical="baseline" type="verb">POST</badge> [entries/save-entry](#post-entries-save-entry) | Creates or updates an entry.
<badge vertical="baseline" type="verb">POST</badge> [users/login](#post-users-login) | Logs a user in.
<badge vertical="baseline" type="verb">POST</badge> [users/save-user](#post-users-save-user) | Creates or updates a user account.
<badge vertical="baseline" type="verb">POST</badge> [users/upload-user-photo](#post-users-upload-user-photo) | Sets a user’s photo.
<badge vertical="baseline" type="verb">POST</badge> [users/send-password-reset-email](#post-users-send-password-reset-email) | Sends a password reset email.
<badge vertical="baseline" type="verb">GET/POST</badge> [users/set-password](#get-post-users-set-password) | Sets a new password on a user account.
<badge vertical="baseline" type="verb">POST</badge> [users/save-address](#post-users-save-address) | Create or update an [address](element-types/addresses.md) element.
<badge vertical="baseline" type="verb">POST</badge> [users/delete-address](#post-users-delete-address) | Delete an address element.
<badge vertical="baseline" type="verb">GET</badge> [users/session-info](#get-users-session-info) | Retrieve information about the current session.
<badge vertical="baseline" type="verb">GET</badge> [app/health-check](#get-app-health-check) | Ping your app to make sure it’s up.

In each of the following examples, you’ll find a list of **Supported Params** (the values you can send as <badge vertical="baseline" type="verb">GET</badge> query params or in the <badge vertical="baseline" type="verb">POST</badge> body) and information about the possible **Response** conditions.

**Supported Params** can be encoded in the query string, submitted with form inputs, or sent as properties in a [JSON payload](../development/forms.md#ajax).

<a name="global-params" title="Parameters respected for all POST requests"></a>

### Globally-Supported Params

All POST actions honor a few additional parameters, except when using an `Accepts: application/json` header:

- `redirect` — A [hashed](twig/filters.md#hash) URL or path that Craft will send the user to after a [successful request][success-after-post] (i.e. a user is registered or an entry is saved).
- `successMessage` — Overrides the default flash notice for the action.
- `failMessage` — Overrides the default flash error for the action.

::: tip
You can use the [`redirectInput()`](twig/functions.md#redirectinput), [`successMessageInput()`](twig/functions.md#successmessageinput), and [`failMessageInput()`](twig/functions.md#failmessageinput) Twig functions to inject these params into a form.
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
`entryVariable` | The [hashed](twig/filters.md#hash) name of the variable that should reference the entry, if a validation error occurs. (Defaults to `entry`.)
`expiryDate` | The expiry date for the entry. (Defaults to the current expiry date, or `null`.)
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)
`fields[...]` | [Custom field](../development/forms.md#custom-fields) values.
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
<check-mark/> | [Standard behavior][success-after-post]. | [Standard behavior][success-after-post]; entry available under an `entry` key in the response object.
<x-mark/> | [Standard behavior][failure-during-post]; entry available under an `entry` variable, in the template. | [Standard behavior][failure-during-post].

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
`rememberMe` | Whether to keep the user logged-in for an extended period of time per the <config5:rememberedUserSessionDuration> config setting (`1`/`0`).

#### Response

The output of the action depends on whether the login was successful and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][success-after-post]. | [Standard behavior][success-after-post]; additional `returnUrl`,  `csrfTokenValue`, and `user` properties are included in the response object.
<x-mark/> | [Standard behavior][failure-during-post]; additional `loginName`, `rememberMe`, `errorCode`, and `errorMessage` variables will be available in the template. | [Standard behavior][failure-during-post]; additional `loginName`, `rememberMe`, `errorCode`, and `errorMessage` properties are included in the response object.

</span>

::: tip
The `errorCode` corresponds to one of the [`craft\elements\User::AUTH_*` constants](craft5:craft\elements\User).
:::

### <badge vertical="baseline" type="verb">POST</badge> `users/save-user`

Registers a new [user account](../system/user-management.md), or updates an existing one.

::: tip
See the [Front-End User Accounts](kb:front-end-user-accounts#registration-form) guide for an example of working with this action.
:::

::: warning
Users can update all of their own custom field values—hiding or omitting them in a front-end form is not enough to protect modification!

Add a [user editability condition](../system/fields.md#editability-conditions) to any fields that should be tamper-proof.
:::

#### Supported Params

Param | Description
----- | -----------
`admin` | Whether the user should be saved as an admin (`1`/`0`). Only assignable if the logged-in user is an admin.
`currentPassword` | The user’s current password, which is required if `email` or `newPassword` are sent.
`email` | The user’s email address. (Only checked if registering a new user, updating the logged-in user, or the logged-in user is allowed to administrate users.)
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)
`fields[...]` | [Custom field](../development/forms.md#custom-fields) values.
`fullName` | The user’s full name. Preferred to discrete `firstName` and `lastName` params.
`firstName` | The user’s first name. `fullName` is preferred.
`lastName` | The user’s last name. `fullName` is preferred.
`newPassword` | The user’s new password, if updating the logged-in user’s account. (If registering a new user, send `password`.)
`passwordResetRequired` | Whether the user must reset their password before logging in again (`1`/`0`). Only assignable if the logged-in user is an admin.
`password` | The user’s password, when registering a new user. (Has no effect if <config5:deferPublicRegistrationPassword> is `true`. To change the current user’s password, send `newPassword`.)
`photo` | An uploaded user photo. Use `<input type="file">`.
`sendVerificationEmail` | Whether a verification email should be sent before accepting the new `email` (`1`/`0`). (Only used if email verification is enabled, and the logged-in user is allowed to opt out of sending it.)
`userId` | The ID of the user to save, if updating an existing user.
`userVariable` | The hashed name of the variable that should reference the user, if a validation error occurs. (Defaults to `user`.)
`username` | The user’s username. (Only checked if the <config5:useEmailAsUsername> config setting is `false`.)

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
<check-mark label="Success" /> | [Standard behavior][success-after-post]; default redirection uses the <config5:activateAccountSuccessPath> config setting, if email verification is not required. | [Standard behavior][success-after-post]; additional `id` and `csrfTokenValue` keys.
<x-mark label="Success" /> | [Standard behavior][failure-during-post]; user will be available in the template under a variable determined by the `userVariable` param, or `user` by default. | [Standard behavior][failure-during-post].

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
<check-mark label="Success" /> | [Standard behavior][success-after-post]; `html` and `photoId` properties. `html` is only useful in control panel contexts.
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]; additional `error` key is available in the response object, with the exception message.

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/send-password-reset-email`

Sends a password reset email.

::: tip
See the [Front-End User Accounts](kb:front-end-user-accounts#reset-password-form) guide for an example of working with this action.
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
<check-mark label="Success" /> | [Standard behavior][success-after-post]. | [Standard behavior][success-after-post].
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]; additional `errors` and `loginName` variables are passed to the template. | [Standard behavior][failure-during-post]; additional `errors` and `loginName` keys are available in the response object.

</span>

::: tip
The `errors` variable may include multiple discrete failure messages, but the standard `message` variable will still be an accurate summary.
:::

### <badge vertical="baseline" type="verb">GET/POST</badge> `users/set-password`

A <badge vertical="baseline" type="verb">GET</badge> request displays a form allowing a user to set a new password on their account, and <badge vertical="baseline" type="verb">POST</badge> sets a new password on a user account. If the user is [pending](../../system/user-management.md), their account will be activated.

::: tip
This action is responsible for rendering the route defined by the <config5:setPasswordPath> setting.
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
<check-mark label="Success" /> | [Standard behavior][success-after-post]; template determined by <config5:setPasswordPath> is rendered with `id` and `code` variables available.
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]; exception message will point to the issue—commonly, a missing or invalid token.

</span>

For <badge vertical="baseline" type="verb">POST</badge> requests:

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][success-after-post]; redirection depends on the <config5:autoLoginAfterAccountActivation> and <config5:setPasswordSuccessPath> config settings, and whether the user has access to the control panel. | [Standard behavior][success-after-post]; additional `csrfTokenName` key will be available in the response object.
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]; `errors` , `code`, `id`, and `newUser` variables will be passed to the resulting template. | [Standard behavior][failure-during-post].

</span>


### <badge vertical="baseline" type="verb">POST</badge> `users/save-address`

Saves or updates an [address](element-types/addresses.md) element against the current user’s account.

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
`fields[...]` | [Custom field](../development/forms.md#custom-fields) values.
`fieldsLocation` | Parameter name under which Craft will look for custom field data. (Defaults to `fields`.)

::: warning
**This list is incomplete!**

The remaining params depend upon the submitted `countryCode`—refer to the [`commerceguys/addressing` library](https://github.com/commerceguys/addressing/blob/master/src/AddressFormat/AddressField.php#L15-L25) for a comprehensive list, or [learn more about managing addresses](element-types/addresses.md#managing-addresses) in Craft.
:::

#### Response

The output of the action depends on whether the address was saved successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][success-after-post]. | [Standard behavior][success-after-post]; address available under the `address` property in the response object.
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]; additional `address` variable will be passed to the resulting template. | [Standard behavior][failure-during-post]; additional `address` property will be available in the response object.

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
<check-mark label="Success" /> | [Standard behavior][success-after-post]. | [Standard behavior][success-after-post]; additional `address` property will be available in the response object.
<x-mark label="Failure" /> | [Standard behavior][failure-during-post]. | [Standard behavior][failure-during-post].

</span>


### <badge vertical="baseline" type="verb">GET</badge> `users/session-info`

Retrieves information about the current session. Data is returned as JSON, and is only intended for consumption via [Ajax](../development/forms.md#ajax).

#### Response

Only JSON responses are sent, but its content will differ for guests and logged-in users.

<span class="croker-table">

State | `application/json`
----- | ------------------
<check-mark label="Success" /> | [Standard behavior][success-after-post]; response object will contain at least `isGuest` and `timeout` keys, plus a `csrfTokenName` and `csrfTokenValue` (when CSRF protection is enabled), and the current user’s `id`, `uid`, `username`, and `email` (if logged in).
<x-mark label="Failure" /> | [Standard behavior][failure-during-post].

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

## Plugins + Custom Actions

Many plugins expose functionality via their own controllers and actions. Their accepted parameters and response types are entirely up to the author, but the [fundamentals](../development/forms.md#making-requests) will be the same. Consult the appropriate documentation for specifics!

Here are some examples in our own plugins:

- [Commerce](https://plugins.craftcms.com/commerce): A variety of cart management capabilities are provided for users and guests.
- [Contact Form](https://plugins.craftcms.com/contact-form): Adds the `contact-form/send` action for processing submissions and delivering notifications.
- [Element API](https://plugins.craftcms.com/element-api): Customizable routes get mapped to queries, and return JSON representations of elements.

Custom modules can also provide actions via a [Controller](../extend/controllers.md).

[success-after-post]: ../development/forms.md#after-a-post-request
[success-after-get]: ../development/forms.md#after-a-get-request
[failure-during-post]: ../development/forms.md#during-a-post-request
[failure-during-get]: ../development/forms.md#during-a-get-request
