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

## `commerce/gateways/list`

Show a table of the configured [gateways](../system/gateways.md).

```
$ php craft commerce/gateways/list
    ID  Name    Handle  Enabled  Type                                           UUID                                
    --  ------  ------  -------  ---------------------------------------------  ------------------------------------
    1   Dummy   dummy   No       craft\commerce\gateways\Dummy                  45462c5b-90e1-4563-9a80-dc4241ee0299
    2   Stripe  stripe  Yes      craft\commerce\stripe\gateways\PaymentIntents  55df7465-9e09-4765-a93b-143f1b4f1f5f
```

## `commerce/gateways/webhook-url`

Output an environment-specific webhook URL for the specified [gateway](../system/gateways.md). Not all gateways require webhooks to be configured—check the plugin’s documentation for more info.

This command expects a single gateway’s `handle` as input, which you can find using the [`gateways/list` command](#commercegatewayslist), above.

```bash
$ php craft commerce/gateways/webhook-url
Webhook URL for the Stripe gateway:
https://commerce.ddev.site/index.php?p=actions/commerce/webhooks/process-webhook&gateway=2
```

Keep in mind that while the _handle_ is stable across environments, [the ID may not be](/5.x/system/project-config.md#ids-uuids-and-handles)!

## `commerce/pricing-catalog/generate`

Regenerates [catalog pricing](../system/pricing-rules.md) data for all purchasables. Commerce keeps track internally of which prices need to be regenerated due to changes in your products or rules—but some advanced conditions (i.e. user groups, account creation time, relations, etc.) can result in stagnant pricing.

Run this command at an interval (via CRON or another task scheduler) to ensure pricing is calculated at an interval that makes sense for your storefront.

```
0 0 * * * /usr/bin/env php /path/to/craft commerce/pricing-catalog/generate
```

::: warning
If you have a large catalog, customer base, or many pricing rules, monitor the time it takes to generate pricing data and ensure each run leaves enough time for the previous job to complete. For example, if it took 30 minutes to regenerate the pricing catalog, running the command every 15 minutes would gradually degrade the system’s performance with concurrent jobs.

To prevent concurrent runs (including in load-balanced environments), add the [`--isolated` flag](/5.x/reference/cli.md#global-options).
:::

## `commerce/reset-data`

Cleanses Commerce data without uninstalling the plugin or removing store configuration. This can be useful for removing test data after finishing initial project development.

Deletes all orders, subscriptions, payment sources, customers, addresses and resets discount usages.

```
$ php craft commerce/reset-data
```

## `commerce/transfer-customer-data`

Transfers customer data from one user to another. You will be prompted for the username or email of the source and destination users.

```
$ php craft commerce/transfer-user-data
```

::: warning
Updates are performed via low-level database queries, so element events are not emitted and plugins are not given an opportunity to alter this behavior. This also serves to speed up the process of saving large amounts of data.

See <commerce5:craft\commerce\services\Customers\transferCustomerData()> for the implementation.
:::
