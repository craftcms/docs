---
keywords: permissions
---
# User Management

[Users](../reference/element-types/users.md) in Craft represent humans in the system. These may be member accounts, or records that represent people in general.

The first user account is created during [installation](installation.md). If you stick with the Solo edition, this is the only account you will be able to create. If you need more (or you want to support [public registration](#public-registration)) you can upgrade to the Pro edition, which offers additional user accounts.

## Statuses

Users may exist in the system in a number of states. A user is typically created in a **Pending** state (ready to be activated via an activation link)

### Active

An **Active** user is able perform any task their permissions allow. Users are put in this state following account activation (either via an activation link or action taken by another user). However, an active account does not necessarily have a password—but once one is set (or the current password is reset), they _would_ be able to log in normally.

### Pending

A user is typically created in **Pending** state. The only difference between a **Pending** and **Active** user is that they have never activated their account with an activation link, or had a user with the **Moderate users** permission activate it for them.

### Suspended

**Suspended** users have been explicitly

### Inactive

Users that have been explicitly deactivated are marked as **Inactive**. An inactive user cannot log in, reset their password, or reactivate their account.

### Special States

#### Credentialed

Craft has a special distinction for users who are able to log in _or could become able to log in_ under their own power. Any user that is either **Active** or **Pending** is considered **Credentialed**.

#### Locked

Once a user has made too many unsuccessful login attempts (according to the <config5:maxInvalidLogins> setting), their account will be **Locked**. Another user with the **Moderate users** [permission](#permissions) can manually unlock a user in this state at any time, or the user can wait until the <config5:cooldownDuration> elapses and try again.

::: warning
User locking is an automatic abuse-prevention behavior, not a moderation tool. If you need to prevent someone from accessing the site or control panel, [suspend](#suspended) or [deactivate](#inactive) their user.
:::

#### Trashed

Like other elements, users can be _soft-deleted_. A trashed user cannot log in or restore themselves, and the user may be garbage-collected after remaining trashed for the configured <config5:softDeleteDuration>.

## Admin Accounts

Admin accounts are special accounts that can do everything within Craft, including some things that don’t have explicit permissions:

- Everything within the Settings section
- Make other users Admins <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>
- Administrate other Admins <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>

The user account you create during installation is an admin by default.

::: warning
Considering how much damage an admin can do, we strongly advise caution when creating new admin accounts; only create them for those you trust and who know what they’re doing.
:::

## User Groups

If you have Craft Pro, you can create User Groups to help organize your site’s user accounts, as well as batch-set permissions on them.

To create a new User Group, go to **Settings** → **Users** and press **+ New user group**. You can give your group a **Name** and **Handle**, plus any **Permissions** you want every user within the group to have.

After you create your groups, you can assign users to groups by going into their account settings and choosing the **Permissions** tab.

## Permissions

Craft Pro allows you to set permissions on users and groups, such as the ability to access the control panel, edit content within certain sections, etc. You can apply these permissions directly to user accounts as well as to user groups. When you apply permissions to a user group, all users that belong to that group will inherit them.

::: warning
Make sure you trust users with access to settings that accept Twig code, like the **Settings** section and the **System Messages** utility. It’s possible to do malicious things in Craft via Twig, which is intended primarily for trusted admins and developers.
:::

The permissions Craft comes with are:

| Permission | Handle
| ---------- | ------
| Access the site when the system is off | `accessSiteWhenSystemIsOff`
| Access the control panel | `accessCp`
| ↳&nbsp;Access the control panel when the system is offline | `accessCpWhenSystemIsOff`
| ↳&nbsp; Perform Craft CMS and plugin updates | `performUpdates`
| ↳&nbsp; Access <CodePlaceholder>Plugin Name</CodePlaceholder> | `accessPlugin-[PluginHandle]`
| Edit users | `editUsers`
| ↳&nbsp; Register users | `registerUsers`
| ↳&nbsp; Moderate users | `moderateUsers`
| ↳&nbsp; Administrate users | `administrateUsers`
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

You may not see all of these options, initially—only ones that are relevant based on the current content schema will be displayed. For example, everything under _View categories_ will be hidden until you have at least one [category group](categories.md#category-groups).

Plugins may register their own permissions, which can appear in a top-level group, under _Access the control panel_, or within _Utilities_.

::: tip
See the _Extending Craft_ [User Permissions](extend/user-permissions.md) page to learn how to register custom permissions from your module or plugin.
:::

### Checking Permissions

You can check whether the logged-in user has a specific permission by using its handle, replacing any bracketed items in the table above with the desired value (So `accessPlugin-[PluginHandle]` would become `accessPlugin-commerce`).

```twig
{% if currentUser.can('accessCp') %}
  <a href="{{ cpUrl() }}">Visit the Control Panel</a>
{% endif %}
```

For UID-driven permissions, you can either hard-code the value in Twig, or look it up dynamically.

::: code
```twig Verbatim
{# Store the UID directly in the template: #}
{% if currentUser.can('createEntries:4fcb3c63-9477-4b5f-8021-874d64f819ce') %}
  <a href="{{ siteUrl('account/vendors/add') }}">Add a Vendor</a>
{% endfor %}
```
```twig Dynamic
{# Look up the section by its handle: #}
{% set vendorsSection = craft.app.sections.getSectionByHandle('vendors') %}

{# Build the permission handle: #}
{% if currentUser.can("createEntries:#{vendorsSection.uid}") %}
  <a href="{{ siteUrl('account/vendors/add') }}">Add a Vendor</a>
{% endfor %}
```
:::

This is not strictly necessary, but the `handle` of a given resource is often much easier to understand in the template context.

::: tip
UIDs are safe to use like this because they’re tracked in [Project Config](./project-config.md) and will be consistent across environments. 
:::

### Requiring Permissions

You can also require the logged-in user to have a specific permission to access an entire template:

```twig
{% requirePermission 'accessCp' %}
```

If the requirements are not met, Craft will send a 403 _Forbidden_ response with the site’s [error template](routing.md#error-templates). Logged-out visitors will be forwarded to the `loginPath`; after signing in, the user will be redirected to the original path—but may still encounter a _Forbidden_ error if their account doesn’t have the correct permissions.

## Public Registration <badge type="edition" title="Craft Pro only">Pro</badge>

Public user registration is disabled by default, but can be turned on in any Craft Pro project.

To enable public registration, go to **Settings** → **Users** → **Settings**, and check **Allow public registration**. With that checked, you will also have the ability to choose a **Default User Group** that publicly-registered users will be automatically added to.

Once you set up your site to allow public user registration, the last step is to create a front-end [user registration form](kb:front-end-user-accounts#registration-form). For a full list of params a user can set during registration (or when updating their account, later on), read about the [`users/save-user` controller action](../reference/controllers/controller-actions.md#post-users-save-user).

::: tip
By default, Craft puts new users in a [pending](#pending) state and allows them to activate their own accounts via email. You can instead select **Deactivate users by default** to place a moderation buffer between public registration and eventual access.
:::
