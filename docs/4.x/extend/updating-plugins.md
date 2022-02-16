# Updating Plugins for Craft 4

TODO: write, obviously

::: tip
If you think something is missing, please [create an issue](https://github.com/craftcms/docs/issues/new).
:::

## High Level Notes

The majority of work updating plugins for Craft 4 will be adding type declarations throughout the code.

Custom volume types will need to be updated, as will anything deprecated in Craft 3 that’s removed in Craft 4.

Some events, permissions, and controller actions have changed largely in support of some exciting new features you may want to take advantage of:

- A unified element editor https://github.com/craftcms/cms/pull/10467
- The condition builder, which is integral to conditional fields, custom sources, and dynamically-controlled relations
- Inactive users


### Plugin Store Considerations

It’s best to update any existing plugin for Craft 4 rather than creating a new one with its own handle. A separate plugin complicates the developer experience, licensing, and migration path.

## Service Names

The following core service names have changed:

| Old             | New
| --------------- | ----------------
| |

## Components

## Translations

## DB Queries

## Control Panel Templates

- All control panel templates end in `.twig` now. ([#9743](https://github.com/craftcms/cms/pull/9743))
- The `forms/selectize` control panel template now supports `addOptionFn` and `addOptionLabel` params, which can be set to add new options to the list.
- Editable tables now support `allowAdd`, `allowDelete`, and `allowReorder` settings, replacing `staticRows`. ([#10163](https://github.com/craftcms/cms/pull/10163))
- The `limitField` macro in the `_components/fieldtypes/elementfieldsettings` control panel template has been renamed to `limitFields`.

### Control Panel Template Hooks

The following control panel [template hooks](template-hooks.md) have been renamed:

| Old                              | New
| -------------------------------- | ----------------------------
| |

## Queue Jobs

## Element Actions

- Renamed the `elements/get-categories-input-html` action to `categories/input-html`.
- Renamed the `elements/get-modal-body` action to `element-selector-modals/body`.
- The `users/save-user` action no longer includes a `unverifiedEmail` key in failure responses.
- Deprecated the `assets/save-asset` action. `elements/save` should be used instead.
- Deprecated the `categories/save-category` action. `elements/save` should be used instead.
- Deprecated the `entries/save-entry` action. `elements/save` should be used instead.

## Events

### Changed

- `craft\gql\TypeManager::EVENT_DEFINE_GQL_TYPE_FIELDS` is now triggered when actually resolving fields for a GraphQL type, rather than when the type is first created. ([#9626](https://github.com/craftcms/cms/issues/9626))
- `craft\services\Assets::EVENT_GET_ASSET_THUMB_URL` has been renamed to `EVENT_DEFINE_THUMB_URL`.
- `craft\services\Assets::EVENT_GET_ASSET_URL` has been renamed to `EVENT_DEFINE_ASSET_URL`.
- `craft\services\Assets::EVENT_GET_THUMB_PATH` has been renamed to `EVENT_DEFINE_THUMB_PATH`.

### Deprecated

- Added `craft\models\FieldLayout::EVENT_DEFINE_NATIVE_FIELDS`, which replaces `EVENT_DEFINE_STANDARD_FIELDS`.
- Deprecated `craft\models\FieldLayout::EVENT_DEFINE_STANDARD_FIELDS`. `EVENT_DEFINE_NATIVE_FIELDS` should be used instead.

### Removed

- Removed `craft\base\Element::ATTR_STATUS_CONFLICTED`.
- Removed `craft\base\Element::EVENT_DEFINE_IS_DELETABLE`. `EVENT_AUTHORIZE_DELETE` can be used instead.
- Removed `craft\base\Element::EVENT_DEFINE_IS_EDITABLE`. `EVENT_AUTHORIZE_VIEW` and `EVENT_AUTHORIZE_SAVE` can be used instead.
- Removed `craft\controllers\EntriesController::EVENT_PREVIEW_ENTRY`.
- Removed `craft\services\Drafts::EVENT_AFTER_MERGE_SOURCE_CHANGES`.
- Removed `craft\services\Drafts::EVENT_AFTER_PUBLISH_DRAFT`.
- Removed `craft\services\Drafts::EVENT_BEFORE_MERGE_SOURCE_CHANGES`.
- Removed `craft\services\Drafts::EVENT_BEFORE_PUBLISH_DRAFT`.
- Removed `craft\services\Gql::EVENT_REGISTER_GQL_PERMISSIONS`. `EVENT_REGISTER_GQL_SCHEMA_COMPONENTS` can be used instead.
- Removed `craft\services\TemplateCaches::EVENT_AFTER_DELETE_CACHES`.
- Removed `craft\services\TemplateCaches::EVENT_BEFORE_DELETE_CACHES`.
- Removed `craft\services\Volumes::EVENT_REGISTER_VOLUME_TYPES`.
- Removed `craft\web\twig\variables\CraftVariable::EVENT_DEFINE_COMPONENTS`. `EVENT_INIT` can be used instead.

## Controller Actions

## User Permissions

A number of user permissions have been renamed in Craft 4:

| Old                                   | New 
| ------------------------------------- | -------------------------
| `createFoldersInVolume:<uid>`         | `createFolders:<uid>`
| `deleteFilesAndFoldersInVolume:<uid>` | `deleteAssets:<uid>`
| `deletePeerFilesInVolume:<uid>`       | `deletePeerAssets:<uid>`
| `editEntries:<uid>`                   | `viewEntries:<uid>`
| `editImagesInVolume:<uid>`            | `editImages:<uid>`
| `editPeerEntries:<uid>`               | `viewPeerEntries:<uid>`
| `editPeerFilesInVolume:<uid>`         | `savePeerAssets:<uid>`
| `editPeerImagesInVolume:<uid>`        | `editPeerImages:<uid>`
| `publishEntries:<uid>`                | `saveEntries:<uid>`<br>No longer differentiates between enabled and disabled entries. Users with `viewEntries:<uid>` permissions can still create drafts.
| `publishPeerEntries:<uid>`            | `savePeerEntries:<uid>`<br>No longer differentiates between enabled and disabled entries. Users with `viewPeerEntries:<uid>` permissions can still create drafts.
| `replaceFilesInVolume:<uid>`          | `replaceFiles:<uid>`
| `replacePeerFilesInVolume:<uid>`      | `replacePeerFiles:<uid>`
| `saveAssetInVolume:<uid>`             | `saveAssets:<uid>`
| `viewPeerFilesInVolume:<uid>`         | `viewPeerAssets:<uid>`
| `viewVolume:<uid>`                    | `viewAssets:<uid>`

Some user permissions have been split into more granular alternatives:

| Old                          | Split Into
| ---------------------------- | -------------
| `editCategories:<uid>`       | `viewCategories:<uid>`<br>`saveCategories:<uid>`<br>`deleteCategories:<uid>`<br>`viewPeerCategoryDrafts:<uid>`<br>`savePeerCategoryDrafts:<uid>`<br>`deletePeerCategoryDrafts:<uid>`
| `editPeerEntryDrafts:<uid>`  | `viewPeerEntryDrafts:<uid>`<br>`savePeerEntryDrafts:<uid>`

## Writing an Upgrade Migration

- JSON column support: https://github.com/craftcms/cms/pull/9089