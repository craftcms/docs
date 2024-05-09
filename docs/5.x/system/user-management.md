---
keywords: permissions users login teams pro registration
description: Tailor front- and back-end experiences to your users’ needs.
related:
  - uri: https://www.craftcms.com/knowledge-base/front-end-user-accounts
    label: "Supporting front-end user accounts"
---

# User Management

[Users](../reference/element-types/users.md) in Craft represent humans in the system. These may be control panel users, member accounts, or records that represent people in general. Users implicitly have the ability to create passwords and log in, but must be granted [permissions](#permissions) or added to [groups](#user-groups) to access the control panel or manage content.

The first user account is created during [installation](../install.md). The number of additional users that can be created (and their capabilities) depends on your Craft [edition](../editions.md):

- **Craft Solo** is limited to a single admin user.
- **Craft Team** <Badge text="New!" vertical="baseline" /> allows up to five users, and one [user group](#user-groups).
- **Craft Pro** has no limitations on the number of registered users or groups, and supports [public registration](#public-registration).

## Statuses

Users may exist in the system in a number of states. A user is typically created in a **Pending** state (ready to be activated via an activation link), whether via [public registration](#public-registration) or by another user. Changes to a user’s status can happen implicitly (via activation, failed login attempts, etc.) or explicitly (suspension by a moderator), some requiring additional verification by email or an [elevated session](#elevated-sessions).

Active
:   An **Active** user is able perform any task their permissions allow. Users are put in this state following account activation (either via an activation link or action taken by another user). However, an active account does not necessarily have a password—but once one is set (or the current password is reset), they _would_ be able to log in normally.

Pending
:   A user is typically created in **Pending** state. The only difference between a **Pending** and **Active** user is that they have never activated their account with an activation link, or had a user with the **Moderate users** permission activate it for them.

Suspended
:   **Suspended** users have been manually locked out of the system by an user with the [_Moderate Users_ permission](#permissions). They will be unable to log in or reset their password.

Inactive
:   Users that have been explicitly deactivated are marked as **Inactive**. An inactive user cannot log in, reset their password, or reactivate their account.

#### Special States

Credentialed
:   Craft has a special distinction for users who are able to log in _or could become able to log in_ under their own power. Any user that is either **Active** or **Pending** is considered **Credentialed**.

Locked
:   When a user makes too many unsuccessful login attempts (according to the <config5:maxInvalidLogins> and <config5:invalidLoginWindowDuration> settings), their account will be **Locked**. Another user with the **Moderate users** [permission](#permissions) can manually unlock a user in this state at any time, or the user can wait until the <config5:cooldownDuration> elapses and try again.

    ::: warning
    User locking is an automatic abuse-prevention behavior, not a moderation tool. If you need to prevent someone from accessing the site or control panel, **suspend** or **deactivate** the user.
    :::

Trashed
:   Like other elements, users can be _soft-deleted_. A trashed user cannot log in or restore themselves, and the user may be garbage-collected after remaining trashed for the configured <config5:softDeleteDuration>.

## Admin Accounts

Admin users are special accounts that can do _everything_ within Craft, including some things that don’t have explicit permissions:

- Modify all [Settings](control-panel.md#settings) (in environments with [admin changes](config5:allowAdminChanges) are enabled);
- Make other users admins (in editions that support multiple users);
- Administrate other admins (in editions that support multiple users);

The user you create during installation is an admin by default. Users in Craft <Badge type="edition" text="Team" vertical="middle" /> can either have permissions from the single [group](#groups), or be an admin.

::: warning
Considering how much damage an admin can do, we strongly advise reserving this role for key members of your team or organization who cannot fulfill their responsibilities without it. Whenever possible, design a [permissions](#permissions) scheme that grants only the necessary capabilities.
:::

To make a user an admin, you must be logged in as an existing admin. Find the user in the **Users** screen, then select the **Permissions** tab, and enable **Admin**. The individual permissions checkboxes will be hidden, as admin implicitly have _all_ permissions. While admin can be part of groups, those groups’ permissions have no bearing on their capabilities unless they are stripped of the admin designation later.

You can also audit and create admin users from the [command line](#cli).

## User Groups <Badge type="edition" text="Pro" />

**User Groups** help organize your site’s user accounts, and uniformly set [permissions](#permissions) on them.

To create a new User Group, go to **Settings** → **Users** and press **+ New user group**. Groups have a **Name** and **Handle**, plus any **Permissions** you want every user within the group to have.

After you create your groups, you can assign users to groups by going into their account settings and choosing the **Permissions** tab. Permissions granted by groups are _additive_, so a user in multiple groups receives the combined permissions of those groups (as well has any permissions granted explicitly to that user). Removing a user from a group does not revoke permissions that are granted by another group they are a member of!

Users in Craft <Badge type="edition" text="Team" vertical="middle" /> belong to a single user group, the permissions for which are managed via <Journey path="Settings, Users, User Permissions" />.

## Permissions <Badge type="edition" text="Team" /> <Badge type="edition" text="Pro" />

Permissions govern what users can do—like access the control panel, edit content within certain sections, create and moderate other users, etc. You can assign these permissions directly to users, or via [user groups](#user-groups). Permissions applied to a user group are inherited by all users belonging to it.

::: warning
Make sure you trust users with access to settings that accept [Twig](../development/twig.md) code, like **URI Formats** and the **System Messages** utility. It’s possible to do malicious things in Craft via Twig, which is intended primarily for trusted admins and developers.
:::

The permissions Craft comes with are:

| Permission | [Handle](#checking-permissions)
| ---------- | ------
| Access the site when the system is off | `accessSiteWhenSystemIsOff`
| Access the control panel | `accessCp`
| ↳&nbsp;Access the control panel when the system is offline | `accessCpWhenSystemIsOff`
| ↳&nbsp; Perform Craft CMS and plugin updates | `performUpdates`
| ↳&nbsp; Access <CodePlaceholder>Plugin Name</CodePlaceholder> | `accessPlugin-[PluginHandle]`
| Edit users | `editUsers`
| ↳&nbsp; Register users | `registerUsers`
| ↳&nbsp; Moderate users | `moderateUsers`
| ↳&nbsp; Administrate users <InfoHud>User administration includes changing emails, sending activation and password reset emails, setting passwords, and deactivating users. This permission can be used to elevate one’s own permissions by gaining access to other administrators’ accounts!</InfoHud> | `administrateUsers`
| ↳&nbsp; Impersonate users <InfoHud>User impersonation allows one user to temporarily access the site as though they were another user with the same (or more restrictive) permissions.</InfoHud> | `impersonateUsers`
| ↳&nbsp; Assign user permissions | `assignUserPermissions`
| ↳&nbsp; Assign users to this group <InfoHud>This is not an actual permission so much as a convenience feature for automatically granting the ability to add peers to the group you are currently editing, as its handle may not be known, yet!</InfoHud> | See note.
| ↳&nbsp; Assign users to <CodePlaceholder>Group Name</CodePlaceholder> | `assignUserGroup:[UserGroupUID]`
| Delete users | `deleteUsers`
| Edit <CodePlaceholder>Site Name</CodePlaceholder> <InfoHud>Site permissions are intersected with other permissions. A user will only be able to edit something if they have access to the site <em>and</em> the element itself.</InfoHud> | `editSite:[SiteUID]`
| View entries <InfoHud>This section is repeated for each configured section.</InfoHud> | `viewEntries:[SectionUID]`
| ↳&nbsp; Create entries | `createEntries:[SectionUID]`
| ↳&nbsp; Save entries | `saveEntries:[SectionUID]`
| ↳&nbsp; Delete entries | `deleteEntries:[SectionUID]`
| ↳&nbsp; View other users’ entries | `viewPeerEntries:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Save other users’ entries | `savePeerEntries:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other users’ entries | `deletePeerEntries:[SectionUID]`
| ↳&nbsp;View other users’ drafts | `viewPeerEntryDrafts:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Save other users’ drafts | `savePeerEntryDrafts:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other users’ drafts | `deletePeerEntryDrafts:[SectionUID]`
| Edit <CodePlaceholder>Global Set Name</CodePlaceholder> | `editGlobalSet:[GlobalSetUID]`
| View categories <InfoHud>This section is repeated for each configured category group.</InfoHud> | `viewCategories:[CategoryGroupUID]`
| ↳&nbsp; Save categories | `saveCategories:[CategoryGroupUID]`
| ↳&nbsp; Delete categories | `deleteCategories:[CategoryGroupUID]`
| ↳&nbsp; View other users’ drafts | `viewPeerCategoryDrafts:[CategoryGroupUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Save other users’ drafts | `savePeerCategoryDrafts:[CategoryGroupUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other users’ drafts | `deletePeerCategoryDrafts:[CategoryGroupUID]`
| View assets | `viewAssets:[VolumeUID]`
| ↳&nbsp; Save assets | `saveAssets:[VolumeUID]`
| ↳&nbsp; Delete assets | `deleteAssets:[VolumeUID]`
| ↳&nbsp; Replace files | `replaceFiles:[VolumeUID]`
| ↳&nbsp; Edit images | `editImages:[VolumeUID]`
| ↳&nbsp; View assets uploaded by other users | `viewPeerAssets:[VolumeUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Save assets uploaded by other users | `savePeerAssets:[VolumeUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Replace files uploaded by other users | `replacePeerFiles:[VolumeUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Remove files uploaded by other users | `deletePeerAssets:[VolumeUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit images uploaded by other users | `editPeerImages:[VolumeUID]`
| ↳&nbsp; Create subfolders | `createFolders:[VolumeUID]`
| Utilities |
| ↳&nbsp; Updates | `utility:updates`
| ↳&nbsp; System Report | `utility:system-report`
| ↳&nbsp; PHP Info | `utility:php-info`
| ↳&nbsp; System Messages | `utility:system-messages`
| ↳&nbsp; Asset Indexes | `utility:asset-indexes`
| ↳&nbsp; Queue Manager | `utility:queue-manager`
| ↳&nbsp; Caches | `utility:clear-caches`
| ↳&nbsp; Deprecation Warnings | `utility:deprecation-errors`
| ↳&nbsp; Database Backup | `utility:db-backup`
| ↳&nbsp; Find and Replace | `utility:find-replace`
| ↳&nbsp; Migrations | `utility:migrations`

You may not see all of these options, initially—only ones that are relevant based on the current content schema will be displayed. For example, everything under _View categories_ will be hidden until you have at least one [category group](../reference/element-types/categories.md#category-groups).

Plugins may register their own permissions, which can appear in a top-level group, under _Access the control panel_, or within _Utilities_.

::: tip
See the _Extending Craft_ [User Permissions](../extend/user-permissions.md) page to learn how to register custom permissions from a module or plugin.
:::

### Checking Permissions

You can check whether the logged-in user has a specific permission using its handle. Replace any bracketed items in the table above with the desired value (So `accessPlugin-[PluginHandle]` would become `accessPlugin-commerce`).

```twig
{% if currentUser.can('accessCp') %}
  <a href="{{ cpUrl() }}">Visit the Control Panel</a>
{% endif %}
```

For UUID-driven permissions, you can either hard-code the value in Twig, or look it up dynamically.

::: code
```twig Verbatim
{# Store the UUID directly in the template: #}
{% if currentUser.can('createEntries:4fcb3c63-9477-4b5f-8021-874d64f819ce') %}
  <a href="{{ siteUrl('account/vendors/add') }}">Add a Vendor</a>
{% endfor %}
```
```twig Dynamic
{# Look up the section by its handle: #}
{% set vendorsSection = craft.app.entries.getSectionByHandle('vendors') %}

{# Build the permission handle: #}
{% if currentUser.can("createEntries:#{vendorsSection.uid}") %}
  <a href="{{ siteUrl('account/vendors/add') }}">Add a Vendor</a>
{% endfor %}
```
:::

This is not strictly necessary, but the `handle` of a given resource is often much easier to understand in the template context.

::: tip
UUIDs and handles are safe to use like this because they’re tracked in [Project Config](project-config.md) and will be [consistent across environments](project-config.md#ids-uuids-and-handles), unlike IDs.
:::

If your site or app doesn’t rely on specific permissions to control access to resources, you can check whether the user belongs to a group, instead:

```twig{3}
{% requireLogin %}

{% if currentUser.isInGroup('members') %}
  <div class="banner">Thanks for your support!</div>
{% endif %}
```

### Requiring Permissions

You can also require the logged-in user to have a specific permission to access an entire template:

```twig
{% requirePermission 'accessCp' %}
```

If the requirements are not met, Craft will send a 403 _Forbidden_ response with the site’s [error template](routing.md#error-templates). Logged-out visitors will be forwarded to the configured [loginPath](config5:loginPath); after signing in, the user will be redirected to the original path—but may still encounter a _Forbidden_ error if their account doesn’t have the correct permissions.

### Forms + Content

When a user is given permissions to edit or create elements that meet certain criteria (say, entries in a specific section), they do _not_ need [control panel](control-panel.md) access to make updates.

When POSTing new data to actions like [`entries/save-entry`](../reference/controller-actions.md#post-entries-save-entry) (or the more generic `elements/save`), Craft checks for the appropriate permissions. This means that you can create secure, streamlined content management tools for users, without ever granting them access to the control panel!

Keep in mind that permissions issues are dealt with differently than [validation errors](../development/forms.md#models-and-validation), so it’s important to check permissions _prior_ to displaying an edit interface to a user. Attempting to POST updates to an element that the current user cannot edit will produce a 400-level HTTP error, and the changes will be lost. If you want to make only certain fields editable to certain users, add [user conditions](fields.md#conditions) to the element’s field layout.

### Querying by Permissions

You can look up users with a given permission using the [`can()` method](../reference/element-types/users.md#can) on a user query. To find users belonging to a specific group, use the [`group()` method](../reference/element-types/users.md#group).

## Authentication <Badge text="New!" />

[Credentialed](#special-states) users in Craft can authenticate with one or more methods. By default, Craft uses a password to verify the user’s identity. In addition to passwords, users can set up [two-factor authentication](#time-based-one-time-passwords), or add a [passkey](#passkeys).

![Two-factor authentication setup screen in the Craft control panel](../images/control-panel-2fa.png)

Plugins can also provide authentication methods!

### Time-based, One-Time Passwords

Craft has built-in support for one-time passwords via your favorite authenticator app or password manager. When enabled (via <Journey path="Settings, Users, Security" />), control panel users subject to your policy will be asked to set up an authenticator on their next login.

If a user loses access to their <abbr title="Time-based, one-time password">TOTP</abbr> provider, they can use one of the recovery codes generated at the time it was set up.

### Passkeys

Individual users can elect to log in with a [Passkey](https://fidoalliance.org/passkeys/). To configure a passkey, visit your user’s account screen via the menu in the upper-right corner of the control panel, then choose **Passkeys**.

::: tip
Some browsers and devices share passkeys via their own accounts or cloud services, so you may only need one passkey added to Craft to authenticate on multiple devices.
:::

### Elevated Sessions

The control panel may require users to reauthorize to perform some actions, like removing authentication methods, altering [permissions](#permissions), or modifying [GraphQL](../development/graphql.md) schemas.

An elevated session’s duration is governed by the <config5:elevatedSessionDuration> setting.

## Public Registration <badge type="edition" title="Craft Pro only">Pro</badge>

Public user registration is disabled by default, but can be turned on by visiting **Settings** → **Users** → **Settings**, and checking **Allow public registration**. With that checked, you will also have the ability to choose a **Default User Group** that publicly-registered users are automatically added to.

Once you set up your site to allow public user registration, the last step is to create a front-end [user registration form](kb:front-end-user-accounts#registration-form). For a full list of params a user can set during registration (or when updating their account, later on), read about the [`users/save-user` controller action](../reference/controller-actions.md#post-users-save-user).

::: tip
By default, Craft puts new users in a [pending state](#statuses) and allows them to activate their own accounts via email. You can instead select **Deactivate users by default** to place a moderation buffer between public registration and eventual access.
:::

### Default Group

Users created via public registration are automatically added to the group designated by the **Default User Group** setting.

::: danger
Select this group’s [permissions](#permissions) carefully, ensuring that new users don’t immediately get access to tools that can negatively affect other users’ experience.
:::

## CLI

Craft’s [command line](cli.md) provides admin-level user management tools. With access to the underlying server, you can create, delete, and impersonate users, get activation URLs, set passwords, and even log out all users.

<See path="../reference/cli.md" hash="users" label="Users CLI Reference" description="Read more about managing users via the command line." />
