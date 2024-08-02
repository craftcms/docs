# Configuring Commerce

Commerce supports a number of [settings](#config-settings). Like Craft’s config settings, you can override their default values in a `config/commerce.php` file.

```php
return [
    'purgeInactiveCartsDuration' => 'P1D',
];
```

::: tip
In Commerce 5, many global settings have become store-specific. See the [upgrade guide](upgrade.md#multi-store) for more information.
:::

## Aliases

Commerce adds these aliases on top of those [provided by Craft](/5.x/configure.md#aliases).

| Alias | Description
| ----- | -----------
| `@commerceLib` | The path to `vendor/craftcms/commerce/lib/`

## Environmental Configuration

Some Commerce settings can be defined on a [per-environment basis](/5.x/configure.md#control-panel-settings) using environment variables or aliases:

- **System Settings** &rarr;
    - **General Settings** &rarr;
        - **Subscription Settings** &rarr;
            - **Billing detail update URL**
    - **Emails** &rarr;
        - **Status Email Address** (Environment variables only)
        - **From Name** (Environment variables only)

## Project Config

Craft Commerce stores the following items in the Craft [project config](/5.x/system/project-config.md):

- Commerce general settings
- Stores
- Order, product, variant, and subscription field layouts
- Order statuses
- Product types
- Email settings
- PDF settings
- Gateways settings

Some items are considered “content” and can change in production, meaning they’re _not_ stored in project config:

- Pricing rules
- Discounts and sales
- Shipping categories
- Shipping zones
- Shipping methods and rules
- Subscription plans
- Tax categories
- Tax zones
- Tax rates
- Order, product, variant, and subscription elements

## Config Settings

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/5.x/config.md)!!!

## Advanced Configuration

Additional customization of Commerce components is possible via [application configuration](/5.x/reference/config/app.md). These settings must be added to your project’s `config/app.php` file, within the `pluginConfigs` block.

### Cart Cookie Configuration

Cart cookies expire after one year, by default. Change this with the [`carts.cartCookieDuration`](commerce5:craft\commerce\services\Carts::cartCookieDuration) property:

```php
return [
    'components' => [
        'plugins' => [
            'pluginConfigs' => [
                'commerce' => [
                    'components' => [
                        'carts' => [
                            'cartCookie' => [
                                // Add custom key-value cookie params
                            ],
                            // Set the cart expiry to one month
                            'cartCookieDuration' => 2629800,
                        ],
                    ],
                ],
            ],
        ],
    ],
];
```
