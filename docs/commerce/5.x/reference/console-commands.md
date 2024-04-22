---
keywords: cli
related:
  - uri: /5.x/system/cli.md
    label: The Craft CLI
  - uri: /5.x/reference/cli.md
    label: All Craft console commands
---
# Console Commands

Commerce supplements Craft’s own [console commands](/5.x/reference/cli.md) with a few utilities that can help you manage your storefront’s data.

These commands must be prefixed with `php craft …`, `ddev craft …`, or some variation thereof, depending on your development or hosting environment.

<See path="/5.x/system/cli.md" label="Console Commands" description="Learn more about Craft’s command-line interface." />

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

## `commerce/transfer-user-data`

Transfers customer data from one user to another. You will be prompted for the username or email of the source and destination users.

```
$ php craft commerce/transfer-user-data
```

::: warning
Updates are performed via low-level database queries, so element events are not emitted and plugins are not given an opportunity to alter this behavior. This also serves to speed up the process of saving large amounts of data.
:::
