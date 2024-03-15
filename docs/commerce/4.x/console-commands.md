---
keywords: cli
updatedVersion: commerce/5.x/reference/console-commands.md
---
# Console Commands

Commerce supplements Craft’s own [console commands](/4.x/console-commands.md) with a few utilities that can help you manage your storefront’s data.

## `commerce/example-templates`

Copies the example templates that Commerce ships with into your project’s template folder.

```
$ php craft commerce/example-templates
A folder will be copied to your templates directory.
Choose folder name: [shop] myshop
Copying ...
Done!
```

Pass the `--overwrite` flag if you’d like to squash an existing folder of the same name.

## `commerce/reset-data`

Cleanses Commerce data without uninstalling the plugin or removing store configuration. This can be useful for removing test data after finishing initial project development.

Deletes all orders, subscriptions, payment sources, customers, addresses and resets discount usages.

```
$ php craft commerce/reset-data
```

## `commerce/transfer-user-data` <Since product="commerce" ver="4.3.0" feature="The customer data transfer command" />

Transfers customer data from one user to another. You will be prompted for the username or email of the source and destination users.

```
$ php craft commerce/transfer-user-data
```

::: warning
Updates are performed via low-level database queries, so element events are not emitted and plugins are not given an opportunity to alter this behavior. This also serves to speed up the process of saving large amounts of data.
:::

## `commerce/upgrade`

Support command for the Commerce 3 → Commerce 4 upgrade process; meant to be run _after_ upgrading to Commerce 4.

```
$ php craft commerce/upgrade
```

It goes through several steps to ensure the best-possible migration:

1. Checks that the standard migration has already been run.
2. Prompts for any custom countries that should be swapped to valid two-letter country codes, which will be used to update all addresses and zones.
3. Prompts to select an existing field handle or create a new custom field on the fly for any legacy address fields that were used with Commerce 3:
    - `title`
    - `address3`
    - `businessId`
    - `phone`
    - `alternativePhone`
    - `custom1`
    - `custom2`
    - `custom3`
    - `custom4`
    - `notes`
4. Converts all legacy customers _without_ user accounts into users.
5. Converts all existing addresses to address elements.
6. Links all user addresses to the appropriate address elements.
7. Links all order addresses to the appropriate address elements.
8. Maps each user’s primary billing and shipping IDs to the appropriate address elements.
9. Creates tax and shipping zone conditions based on legacy country and state lists.
10. Links the store location address to the appropriate address element.
11. Links order history records to their appropriate user accounts.
12. Migrates previously-enabled countries to the store’s Country List and creates an Order Address Condition as needed.
