- - -
Craft はシステムのすべてのメンバーアカウントを「ユーザー」と呼びます。
- - -
# ユーザー管理

Craft calls all member accounts of the system “[Users](users.md)”.

最初のユーザーアカウントは、[インストール](installation.md)中に作成されます。 Solo エディションを使い続けるなら、あなたが作成可能な唯一のアカウントとなります。 さらに必要であれば、追加のユーザーアカウントを提供する Pro エディションにアップグレードできます。

## 管理者アカウント

インストール中に作成したユーザーアカウントが、デフォルトで管理者になります。

- 設定セクションに含まれるすべてのこと
- 他のユーザーを管理者にする（Craft Pro のみ） <badge type="edition" vertical="middle" title="他の管理者を管理する（Craft Pro のみ）">Pro</badge>
- Administrate other Admins <badge type="edition" vertical="middle" title="Craft Pro only">Pro</badge>

The user account you create during installation is an admin by default.

::: tip
管理者が行うことができるダメージの量を考えると、新しい管理者アカウントの作成は慎重に行うことを強くお勧めします。
:::

## ユーザーグループ

Craft Pro を使っている場合、サイトのユーザーアカウントを整理したり、権限を一括設定するためにユーザーグループを作成できます。

新しいユーザーグループを作るには、「設定 > ユーザー」に移動し、「新しいユーザーグループ」ボタンをクリックします。 グループには、名前とハンドルに加え、グループに含まれるすべてのユーザーに与える権限をセットできます。

グループの作成後は、アカウント設定の「権利」タブをクリックして、ユーザーをグループに割り当てることができます。

## 権限

Craft Pro では、コントロールパネルにアクセスしたり、特定セクションのコンテンツを編集するといった権限をユーザーやグループに許可できます。 これらの権限はユーザーアカウントと同様にユーザーグループにも直接適用できます。 ユーザーグループに権限を適用すると、そのグループに所属するすべてのユーザーがそれを継承します。

::: warning
Make sure you trust users with access to settings that accept Twig code, like the **Settings** section and the **System Messages** utility. It’s possible to do potentially-malicious things in Craft via Twig, which is intented primarily for trusted admins and developers.
:::

The permissions Craft comes with are:

| 権限                                                | ハンドル                                        |
| ------------------------------------------------- | ------------------------------------------- |
| システムがオフの場合にサイトにアクセスする                             | `accessSiteWhenSystemIsOff`                 |
| コントロールパネルへのアクセス                                   | `accessCp`                                  |
| ↳&nbsp; システムがオフラインの場合にコントロールパネルにアクセスする            | `accessCpWhenSystemIsOff`                   |
| ↳&nbsp; Craft CMS 起動とプラグインのアップデート                 | `performUpdates`                            |
| ↳&nbsp; _[プラグイン名]_ のアクセス                          | `accessPlugin-[PluginHandle]`               |
| ユーザーを編集する                                         | `editUsers`                                 |
| ↳&nbsp; ユーザーを登録する                                 | `registerUsers`                             |
| ↳&nbsp; ユーザー権限の割り当て                               | `assignUserPermissions`                     |
| ↳&nbsp; ユーザーを管理する                                 | `administrateUsers`                         |
| ユーザーを削除する                                         | `deleteUsers`                               |
| _[サイト名]_ を編集する                                    | `editSite:[SiteUID]`                        |
| ユーザーを偽装する                                         | `impersonateUsers`                          |
| エントリを編集する                                         | `editEntries:[SectionUID]`                  |
| ↳&nbsp; エントリを作る                                   | `createEntries:[SectionUID]`                |
| ↳&nbsp; ライブの変更を発表する                               | `publishEntries:[SectionUID]`               |
| ↳&nbsp; エントリを削除する                                 | `deleteEntries:[SectionUID]`                |
| ↳&nbsp; 他の投稿者のエントリを編集する                           | `editPeerEntries:[SectionUID]`              |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の作成者の入力のためライブを変更する    | `publishPeerEntries:[SectionUID]`           |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の投稿者のエントリを削除する        | `deletePeerEntries:[SectionUID]`            |
| ↳&nbsp; 他の投稿者の下書きを編集する                            | `editPeerEntryDrafts:[SectionUID]`          |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の投稿者の下書きを投稿する         | `publishPeerEntryDrafts:[SectionUID]`       |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の投稿者の下書きを削除する         | `deletePeerEntryDrafts:[SectionUID]`        |
| _[グローバル設定名]_ を編集する                                | `editGlobalSet:[GlobalSetUID]`              |
| _[カテゴリグループ名]_ を編集する                               | `editCategories:[CategoryGroupUID]`         |
| _[ボリューム名]_ を表示                                    | `viewVolume:[VolumeUID]`                    |
| ↳&nbsp; アップロード                                    | `saveAssetInVolume:[VolumeUID]`             |
| ↳&nbsp; サブフォルダを作成する                               | `createFoldersInVolume:[VolumeUID]`         |
| ↳&nbsp; ファイルとフォルダーを削除                             | `deleteFilesAndFoldersInVolume:[VolumeUID]` |
| ↳&nbsp; 画像を編集する                                   | `editImagesInVolume:[VolumeUID]`            |
| ↳&nbsp; 他のユーザーがアップロードしたファイルを表示                    | `viewPeerFilesInVolume:[VolumeUID]`         |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他のユーザーがアップロードしたファイルを編集 | `editPeerFilesInVolume:[SectionUID]`        |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他のユーザーがアップロードしたファイルを置換 | `replacePeerFilesInVolume:[SectionUID]`     |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他のユーザーがアップロードしたファイルを削除 | `deletePeerFilesInVolume:[SectionUID]`      |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他のユーザーがアップロードした画像を編集   | `editPeerImagesInVolume:[SectionUID]`       |
| Utilities                                         |                                             |
| ↳&nbsp; Updates                                   | `utility:updates`                           |
| ↳&nbsp; System Report                             | `utility:system-report`                     |
| ↳&nbsp; PHP Info                                  | `utility:php-info`                          |
| ↳&nbsp; System Messages                           | `utility:system-messages`                   |
| ↳&nbsp; Asset Indexes                             | `utility:asset-indexes`                     |
| ↳&nbsp; Queue Manager                             | `utility:queue-manager`                     |
| ↳&nbsp; Clear Caches                              | `utility:clear-caches`                      |
| ↳&nbsp; Deprecation Warnings                      | `utility:deprecation-errors`                |
| ↳&nbsp; Database Backup                           | `utility:db-backup`                         |
| ↳&nbsp; Find and Replace                          | `utility:find-replace`                      |
| ↳&nbsp; Migrations                                | `utility:migrations`                        |

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

## 一般登録

Craft Pro has the option of allowing public user registration, which is disabled by default.

To enable public registration, go to **Settings** → **Users** → **Settings**, and check **Allow public registration**. With that checked, you will also have the ability to choose a default user group to which Craft will assign the publicly-registered users.

Once you set up your site to allow public user registration, the last step is to create a [user registration form](https://craftcms.com/knowledge-base/front-end-user-accounts#registration-form) on your site’s front end.
