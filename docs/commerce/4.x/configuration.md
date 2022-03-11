# Configuring Commerce

## Config Settings

Commerce supports a number of [config settings](config-settings.md). Like Craft’s config settings, you can override their default values in a `config/commerce.php` file.

```php
return [
    'purgeInactiveCartsDuration' => 'P1D',
];
```

## Aliases

| Alias | Description
| ----- | -----------
| `@commerceLib` | The path to `vendor/craftcms/commerce/lib/`

## Environmental Configuration

Some Commerce settings should be defined on a [per-environment basis](/4.x/config/#environmental-configuration).

- System Settings
    - General Settings
        - Email
            - **Status Email Address**
            - **From Name**
        - Subscription Settings
            - **Billing detail update URL**

## PHP Constants

### `COMMERCE_PAYMENT_CURRENCY`

This constant can be used to lock a valid payment currency ISO code, which otherwise defaults to the primary currency.

## Project Config

Craft Commerce stores the following items in the Craft [project config](/4.x/project-config.md):

- Commerce general settings
- Email settings
- PDF settings
- Gateways settings
- Order field layout
- Order Statuses
- Product types
- Fields and field groups
- Subscription field layout

Not _everything_ should be stored in the project config. Some items are considered content, which will change in production—meaning they’re not stored in the project config:

- Discount promotions
- Sales promotions
- Shipping categories
- Shipping zones
- Shipping methods and rules
- Subscription plans
- Subscriptions elements
- Tax categories
- Tax zones
- Tax rates
- Order elements
- Products & Variant elements
