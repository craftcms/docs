# Updating Plugins for Craft 4

TODO: write, obviously

::: tip
If you think something is missing, please [create an issue](https://github.com/craftcms/docs/issues/new).
:::

## High Level Notes

The majority of work updating plugins for Craft 4 will be adding type declarations throughout the code.

Custom volume types will need to be updated, as will anything deprecated in Craft 3 that’s removed in Craft 4.

- Unified element editor: https://github.com/craftcms/cms/pull/10467

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


## Writing an Upgrade Migration
