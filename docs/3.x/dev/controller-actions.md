# Controller Actions

The following [controller actions](https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers) are available for front end forms:

Action | Description
------ | -----------
<badge vertical="baseline" type="verb">POST</badge> [entries/save-entry](#post-entries-save-entry) | Saves an entry.
<badge vertical="baseline" type="verb">POST</badge> [users/login](#post-users-login) | Logs a user in.
<badge vertical="baseline" type="verb">POST</badge> [users/save-user](#post-users-save-user) | Saves a user account.
<badge vertical="baseline" type="verb">POST</badge> [users/send-password-reset-email](#post-users-send-password-reset-email) | Sends a password reset email.
<badge vertical="baseline" type="verb">POST</badge> [users/set-password](#post-users-set-password) | Sets a new password on a user account.

::: tip
To invoke a controller action, send a `POST` request to Craft, with an `action` param set to the desired action path, either in the request body or query string.
:::

## <badge vertical="baseline" type="verb">POST</badge> `entries/save-entry`

Saves an entry.

This can be used to save a new or existing entry, determined by the `sourceId` param.

::: tip
See the [Entry Form](https://craftcms.com/knowledge-base/entry-form) guide for an example of working with this action.
:::

::: warning
Note that _all_ custom fields can updated by users. For this reason, you should not assume that custom fields are protected from modification simply because they are not included in the form. 
:::

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`authorId` | The ID of the user account that should be set as the entry author. (Defaults to the entry’s current author, or the logged-in user.)
`enabledForSite` | Whether the entry should be enabled for the current site (`1`/`0`), or an array of site IDs that the entry should be enabled for. (Defaults to the `enabled` param.)
`enabled` | Whether the entry should be enabled (`1`/`0`). (Defaults to enabled.)
`entryId` | Fallback if `sourceId` isn’t passed, for backwards compatibility.
`entryVariable` | The hashed name of the variable that should reference the entry, if a validation error occurs. (Defaults to `entry`.)
`expiryDate` | The expiry date for the entry. (Defaults to the current expiry date, or `null`.)
`failMessage` | The hashed flash notice that should be displayed, if the entry is not saved successfully. (Only used for `text/html` requests.)
`fieldsLocation` | The name of the param that holds any custom field values. (Defaults to `fields`.)
`fields[]` | An array of new custom field values, indexed by field handles. (The param name can be customized via `fieldsLocation`.) Only fields that are included in this array will be updated.
`parentId` | The ID of the parent entry, if it belongs to a structure section.
`postDate` | The post date for the entry. (Defaults to the current post date, or the current time.)
`redirect` | The hashed URL to redirect the browser to, if the entry is saved successfully. (The requested URI will be used by default.)
`revisionNotes` | Notes that should be stored on the new entry revision.
`siteId` | The ID of the site to save the entry in.
`slug` | The entry slug. (Defaults to the current slug, or an auto-generated slug.)
`sourceId` | The ID of the entry to save, if updating an existing entry.
`successMessage` | The hashed flash notice that should be displayed, if the entry is saved successfully. (Only used for `text/html` requests.)
`title` | The entry title. (Defaults to the current entry title.)
`typeId` | The entry type ID to save the entry as. (Defaults to the current entry type.)

### Output

The action’s output depends on whether the entry saved successfully and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | Redirect response per the hashed `redirect` param.
<x-mark/> | None; the request will be routed per the URI. An `entry` variable will be passed to the resulting template. The template can access validation errors via [getErrors()](yii2:yii\base\Model::getErrors()), [getFirstError()](yii2:yii\base\Model::getFirstError()), etc.

</span>

#### With JSON Request Header

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | JSON response with `success`, `id`, `title`, `slug`, `authorUsername`, `dateCreated`, `dateUpdated`, and `postDate` keys.
<x-mark/> | JSON response with an `errors` key set to the result of [getErrors()](yii2:yii\base\Model::getErrors()).

</span>

## <badge vertical="baseline" type="verb">POST</badge> `users/login`

Logs a user in.

::: tip
See the [Front-End User Accounts](https://craftcms.com/knowledge-base/front-end-user-accounts#login-form) guide for an example of working with this action.
:::

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`failMessage` | The hashed flash notice that should be displayed, if the user is not logged in successfully. (Only used for `text/html` requests.)
`loginName` | The username or email of the user to login.
`password` | The user’s password.
`rememberMe` | Whether to keep the user logged-in for an extended period of time per the <config3:rememberedUserSessionDuration> config setting (`1`/`0`).

### Output

The output of the action depends on whether the login was successful and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | Redirect response per the hashed `redirect` param, or the user session’s return URL.
<x-mark/> | None; the request will be routed per the URI. `loginName`, `rememberMe`, `errorCode`, and `errorMessage` variables will be passed to the resulting template.

</span>

#### With JSON Request Header

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | JSON response with `success` and `returnUrl` keys.
<x-mark/> | JSON response with `errorCode` and `error` keys.

</span>

## <badge vertical="baseline" type="verb">POST</badge> `users/save-user`

Saves a user account.

This can be used to register a new user or update an existing one, determined by the `userId` param.

::: tip
See the [Front-End User Accounts](https://craftcms.com/knowledge-base/front-end-user-accounts#registration-form) guide for an example of working with this action.
:::

::: warning
Note that _all_ custom fields can updated by users. For this reason, you should not assume that custom fields are protected from modification simply because they are not included in the form. 
:::

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`admin` | Whether the user should be saved as an admin (`1`/`0`). Only checked if the logged-in user is an admin.
`currentPassword` | The user’s current password, which is required if `email` or `newPassword` are sent.
`email` | The user’s email address. (Only checked if registering a new user, updating the logged-in user, or the logged-in user is allowed to administrate users.)
`failMessage` | The hashed flash notice that should be displayed, if the user account is not saved successfully. (Only used for `text/html` requests.)
`fieldsLocation` | The name of the param that holds any custom field values. (Defaults to `fields`.)
`fields[]` | An array of new custom field values, indexed by field handles. (The param name can be customized via `fieldsLocation`.) Only fields that are included in this array will be updated.
`firstName` | The user’s first name.
`lastName` | The user’s last name.
`newPassword` | The user’s new password, if updating the logged-in user’s account. (If registering a new user, send `password`.)
`passwordResetRequired` | Whether the user must reset their password before logging in again (`1`/`0`). Only checked if the logged-in user is an admin.
`password` | The user’s password, if registering a new user. (If updating an existing user, send `newPassword`.)
`photo` | An uploaded user photo.
`redirect` | The hashed URL to redirect the browser to, if the user account is saved successfully. (The requested URI will typically be used by default.)
`sendVerificationEmail` | Whether a verification email should be sent before accepting the new `email` (`1`/`0`). (Only checked if email verification is enabled, and the logged-in user is allowed to opt out of sending it.)
`successMessage` | The hashed flash notice that should be displayed, if the user account is saved successfully. (Only used for `text/html` requests.)
`userId` | The ID of the user to save, if updating an existing user.
`userVariable` | The hashed name of the variable that should reference the user, if a validation error occurs. (Defaults to `user`.)
`username` | The user’s username. (Only checked if the <config3:useEmailAsUsername> config setting is disabled.)

### Output

The output depends on whether the user save action was successful and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | Redirect response per the hashed `redirect` param, or the <config3:activateAccountSuccessPath> config setting if email verification is not required.
<x-mark/> | None; the request will be routed per the URI. A `user` variable will be passed to the resulting template. The template can access validation errors via [getErrors()](yii2:yii\base\Model::getErrors()), [getFirstError()](yii2:yii\base\Model::getFirstError()), etc.

</span>

#### With JSON Request Header

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | JSON response with `success` and `id` keys.
<x-mark/> | JSON response with an `errors` key.

</span>

## <badge vertical="baseline" type="verb">POST</badge> `users/send-password-reset-email`

Sends a password reset email.

::: tip
See the [Front-End User Accounts](https://craftcms.com/knowledge-base/front-end-user-accounts#reset-password-forms) guide for an example of working with this action.
:::

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`loginName` | The username or email of the user to send a password reset email for.
`successMessage` | The hashed flash notice that should be displayed, if the email is sent successfully. (Only used for `text/html` requests.)
`userId` | The ID of the user to send a password reset email for. (Only checked if the logged-in user has permission to edit other users.)

### Output

The output of the action depends on whether the reset password email was sent successfully, and whether the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | Redirect response per the hashed `redirect` param.
<x-mark/> | None; the request will be routed per the URI. `errors` and `loginName` variables will be passed to the resulting template.

</span>

#### With JSON Request Header

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | JSON response with a `success` key.
<x-mark/> | JSON response with an `error` key.

</span>

## <badge vertical="baseline" type="verb">POST</badge> `users/set-password`

Sets a new password on a user account.

If the user is pending, their account will be activated as well.

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`code` | The user’s verification code.
`failMessage` | The hashed flash notice that should be displayed, if the password is not set successfully. (Only used for `text/html` requests.)
`id` | The user’s UUID.
`newPassword` | The user’s new password.

### Output

The output of the action depends on whether the password was updated successfully and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | Redirect response depending on the <config3:autoLoginAfterAccountActivation> and <config3:setPasswordSuccessPath> config settings, and whether the user has access to the control panel.
<x-mark/> | None; the request will be routed per the URI. `errors` , `code`, `id`, and `newUser` variables will be passed to the resulting template.

</span>

#### With JSON Request Header

<span class="croker-table">

Success | Output
------- | ------
<check-mark/> | JSON response with `success` and (possibly) `csrfTokenValue` keys.
<x-mark/> | JSON response with an `error` key.

</span>
