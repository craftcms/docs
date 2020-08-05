# User Management

Craft calls all member accounts of the system “users”.

The first user account is created during [installation](installation.md). If you stick with the Solo edition, this is the only account you will be able to create. If you need more you can upgrade to the Pro edition, which offers additional user accounts.

## Admin Accounts

Admin accounts are special accounts that can do absolutely everything within Craft, including some things that there aren’t even explicit permissions for:

* Everything within the Settings section
* Make other users Admins (Craft Pro only)
* Administrate other Admins (Craft Pro only)

The user account you create during installation is an admin by default.

::: tip
Considering the amount of damage an admin can do, it’s strongly recommended that you be conservative with creating new admin accounts. Only do it if you trust that they know what they’re doing.
:::

## User Groups

If you have Craft Pro, you can create User Groups to help organize your site’s user accounts, as well as batch-set permissions on them.

To create a new User Group, go to Settings → Users and click the “New Group” button. You can give your group a Name and Handle, plus any permissions you want every user within the group to have.

After you create your groups, you can assign users to groups by going into their account settings and clicking on the Permissions tab.

## Permissions

Craft Pro allows you to set permissions on users and groups, such as the ability to access the control panel, edit content within certain sections, etc. You can apply these permissions directly to user accounts as well as to user groups. When you apply permissions to a user group, all users that belong to that group will inherit them.

The permissions Craft comes with are:

| Permission                                                       | Handle                                      |
| ---------------------------------------------------------------- | ------------------------------------------- |
| Access the site when the system is off                           | `accessSiteWhenSystemIsOff`                 |
| Access the CP                                                    | `accessCp`                                  |
| ↳&nbsp; Access the CP when the system is off                     | `accessCpWhenSystemIsOff`                   |
| ↳&nbsp; Perform Craft and plugin updates                         | `performUpdates`                            |
| ↳&nbsp; Access _[Plugin Name]_                                   | `accessPlugin-[PluginHandle]`               |
| Edit users                                                       | `editUsers`                                 |
| ↳&nbsp; Register users                                           | `registerUsers`                             |
| ↳&nbsp; Assign permissions                                       | `assignUserPermissions`                     |
| ↳&nbsp; Administrate users                                       | `administrateUsers`                         |
| Delete users                                                     | `deleteUsers`                               |
| Edit _[Site Name]_                                               | `editSite:[SiteUID]`                        |
| Impersonate users                                                | `impersonateUsers`                          |
| Edit entries                                                     | `editEntries:[SectionUID]`                  |
| ↳&nbsp; Create entries                                           | `createEntries:[SectionUID]`                |
| ↳&nbsp; Publish entries                                          | `publishEntries:[SectionUID]`               |
| ↳&nbsp; Delete entries                                           | `deleteEntries:[SectionUID]`                |
| ↳&nbsp; Edit other authors’ entries                              | `editPeerEntries:[SectionUID]`              |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Publish other authors’ entries        | `publishPeerEntries:[SectionUID]`           |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other authors’ entries         | `deletePeerEntries:[SectionUID]`            |
| ↳&nbsp; Edit other authors’ drafts                               | `editPeerEntryDrafts:[SectionUID]`          |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Publish other authors’ drafts         | `publishPeerEntryDrafts:[SectionUID]`       |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Delete other authors’ drafts          | `deletePeerEntryDrafts:[SectionUID]`        |
| Edit _[Global Set Name]_                                         | `editGlobalSet:[GlobalSetUID]`              |
| Edit _[Category Group Name]_                                     | `editCategories:[CategoryGroupUID]`         |
| View _[Asset Volume Name]_                                       | `viewVolume:[VolumeUID]`                    |
| ↳&nbsp; Upload files                                             | `saveAssetInVolume:[VolumeUID]`             |
| ↳&nbsp; Create subfolders                                        | `createFoldersInVolume:[VolumeUID]`         |
| ↳&nbsp; Remove files and folders                                 | `deleteFilesAndFoldersInVolume:[VolumeUID]` |
| ↳&nbsp; Edit images                                              | `editImagesInVolume:[VolumeUID]`            |
| ↳&nbsp; View files uploaded by other users                       | `viewPeerFilesInVolume:[VolumeUID]`         |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit files uploaded by other users    | `editPeerFilesInVolume:[SectionUID]`        |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Replace files uploaded by other users | `replacePeerFilesInVolume:[SectionUID]`     |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Remove files uploaded by other users  | `deletePeerFilesInVolume:[SectionUID]`      |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit images uploaded by other users   | `editPeerImagesInVolume:[SectionUID]`       |

## Public Registration

Craft Pro has the option of allowing public user registration, which is disabled by default.

To enable public registration, go to Settings → Users → Settings, and check the “Allow public registration?” setting. With that checked, you will also have the ability to choose a default user group to which Craft will assign the publicly-registered users.

Once you set up your site to allow public user registration, the last step is to create a [user registration form](dev/examples/user-registration-form.md) on your site’s front end.
