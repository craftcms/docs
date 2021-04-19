---
keywords: permissions
---
# User Management

Craft calls all member accounts of the system “[Users](users.md)”.

The first user account is created during [installation](installation.md). If you stick with the Solo edition, this is the only account you will be able to create. If you need more you can upgrade to the Pro edition, which offers additional user accounts.

## Admin Accounts

Admin accounts are special accounts that can do absolutely everything within Craft, including some things that there aren’t even explicit permissions for:

- Everything within the Settings section
- Make other users Admins <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>
- Administrate other Admins <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>

The user account you create during installation is an admin by default.

::: warning
Considering how much damage an admin can do, we strongly advise caution when creating new admin accounts; only create them for those you trust and who know what they’re doing.
:::

## User Groups

If you have Craft Pro, you can create User Groups to help organize your site’s user accounts, as well as batch-set permissions on them.

To create a new User Group, go to **Settings** → **Users** and choose **+ New user group**. You can give your group a Name and Handle, plus any permissions you want every user within the group to have.

After you create your groups, you can assign users to groups by going into their account settings and choosing the Permissions tab.

## Permissions

Craft Pro allows you to set permissions on users and groups, such as the ability to access the control panel, edit content within certain sections, etc. You can apply these permissions directly to user accounts as well as to user groups. When you apply permissions to a user group, all users that belong to that group will inherit them.

The permissions Craft comes with are:

| Permission | Handle
| ---------- | ------
| Access the site when the system is off | `accessSiteWhenSystemIsOff`
| Access the CP | `accessCp`
| ↳&nbsp; Access the CP when the system is off | `accessCpWhenSystemIsOff`
| ↳&nbsp; Perform Craft and plugin updates | `performUpdates`
| ↳&nbsp; Access _[Plugin Name]_ | `accessPlugin-[PluginHandle]`
| Edit users | `editUsers`
| ↳&nbsp; Register users | `registerUsers`
| ↳&nbsp; Assign permissions | `assignUserPermissions`
| ↳&nbsp; Administrate users | `administrateUsers`
| Delete users | `deleteUsers`
| Edit _[Site Name]_ | `editSite:[SiteUID]`
| Impersonate users | `impersonateUsers`
| Edit entries | `editEntries:[SectionUID]`
| ↳&nbsp; Create entries | `createEntries:[SectionUID]`
| ↳&nbsp; Publish entries | `publishEntries:[SectionUID]`
| ↳&nbsp; Delete entries | `deleteEntries:[SectionUID]`
| ↳&nbsp; Edit other authors’ entries | `editPeerEntries:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Publish other authors’ entries | `publishPeerEntries:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other authors’ entries | `deletePeerEntries:[SectionUID]`
| ↳&nbsp; Edit other authors’ drafts | `editPeerEntryDrafts:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Publish other authors’ drafts | `publishPeerEntryDrafts:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other authors’ drafts | `deletePeerEntryDrafts:[SectionUID]`
| Edit _[Global Set Name]_ | `editGlobalSet:[GlobalSetUID]`
| Edit _[Category Group Name]_ | `editCategories:[CategoryGroupUID]`
| View _[Asset Volume Name]_ | `viewVolume:[VolumeUID]`
| ↳&nbsp; Upload files | `saveAssetInVolume:[VolumeUID]`
| ↳&nbsp; Create subfolders | `createFoldersInVolume:[VolumeUID]`
| ↳&nbsp; Remove files and folders | `deleteFilesAndFoldersInVolume:[VolumeUID]`
| ↳&nbsp; Edit images | `editImagesInVolume:[VolumeUID]`
| ↳&nbsp; View files uploaded by other users | `viewPeerFilesInVolume:[VolumeUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit files uploaded by other users | `editPeerFilesInVolume:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Replace files uploaded by other users | `replacePeerFilesInVolume:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Remove files uploaded by other users | `deletePeerFilesInVolume:[SectionUID]`
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit images uploaded by other users | `editPeerImagesInVolume:[SectionUID]`

::: tip
See the _Extending Craft_ [User Permissions](extend/user-permissions.md) page to learn how to register custom permissions for your module or plugin.
:::

### Checking Permissions

You can check whether the logged-in user has a specific permission by using its handle, replacing any bracketed items in the table above with the desired value (So `accessPlugin-[PluginHandle]` would become `accessPlugin-commerce`).

```twig
{% if currentUser.can('accessCp') %}
    <a href="{{ cpUrl() }}">Visit the Control Panel</a>
{% endif %}
```

### Requiring Permissions

You can also require the logged-in user to have a specific permission to access an entire template:

```twig
{% requirePermission 'accessCp' %}
```

## Public Registration

Craft Pro has the option of allowing public user registration, which is disabled by default.

To enable public registration, go to **Settings** → **Users** → **Settings**, and check **Allow public registration**. With that checked, you will also have the ability to choose a default user group to which Craft will assign the publicly-registered users.

Once you set up your site to allow public user registration, the last step is to create a [user registration form](https://craftcms.com/knowledge-base/front-end-user-accounts#registration-form) on your site’s front end.
