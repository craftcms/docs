# Configuration

## Permissions

The following permissions are available for users or user groups to have for Commerce:


### Access Craft Commerce

This permission lets the user get access to the Commerce section of the control panel.

This permission is found under Craft’s “Access the control panel” permission.


### Manage products

This permission lets the user:

- See products
- Create products
- Save products
- Edit products
- Delete products

### Manage orders

This permission lets the user see orders.

#### Edit orders

This permission lets the user:

- Create orders (Pro Only)
- Edit orders (Pro Only)

#### Delete orders

This permission lets the user delete an order.

#### Capture payment

This permission lets the user click the capture button on an authorized transaction.

#### Refund payment

This permission lets the user click the refund button on a successful payment.

### Manage customers

This permission lets the user:

- See the customers listing
- See customer info

### Manage promotions

This permission lets the user:

- See discounts and sales
- Create & Edit discounts and sales

### Manage subscriptions

This permission lets the user:

- See subscriptions
- Refresh payments on subscriptions
- Cancel subscriptions

### Manage shipping

This permission lets the user:

- Create, edit and delete shipping methods
- Create, edit and delete shipping rules
- Create, edit and delete shipping categories
- Create, edit and delete shipping zones

### Manage taxes

This permission lets the user:
- Create, edit and delete tax zones
- Create, edit and delete tax categories
- Create, edit and delete tax zones

### Manage store settings

This permission lets the user change settings for the commerce.


## General Config

In addition to the settings available in Commerce → Settings, the config items below can be placed into a `commerce.php` file in your `craft/config/` folder. Use the same format as `config/general.php`. You may define it in one of the environment config arrays, depending on which environment(s) you want the setting to apply to.

For example, if you want to change the Commerce inactive carts duration in dev environments, but not on staging or production environments, do this:

```php{4,10}
return [
    // Global settings
    '*' => [
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'purgeInactiveCartsDuration' => P1D,
        // ...
    ],

    // Staging environment settings
    'staging' => [
        // ...
    ],

    // Production environment settings
    'production' => [
        // ...
    ],
];
```

Here’s the full list of config settings that Commerce supports:

<!-- BEGIN SETTINGS -->

## `autoSetNewCartAddresses`

Determines whether the customer’s primary shipping and billing addresses should automatically be set on new carts.

Default: `true`

## `activeCartDuration`

A [duration interval](https://en.wikipedia.org/wiki/ISO_8601#Durations) that determines how long a cart should go without being updated before it is listed as inactive in the Orders index page.

Default: `'PT1H'` (1 hour)

## `freeOrderPaymentStrategy`

Determines how Commerce should handle free orders. The default `complete` setting automatically completes zero-balance orders without forwarding them to the payment gateway. Alternatively, a `process` strategy forwards zero-balance orders to the payment gateway for processing. This can be useful if the customer’s balance needs to be updated or otherwise adjusted by the payment gateway.

Default: `complete`

## `gatewayPostRedirectTemplate`

The path to the template that should be used to perform POST requests to offsite payment gateways.

The template must contain a form that posts to the URL supplied by the `actionUrl` variable, and outputs all hidden inputs with the `inputs` variable.

```twig
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Redirecting...</title>
</head>
<body onload="document.forms[0].submit();">
<form action="{{ actionUrl }}" method="post">
    <p>Redirecting to payment page...</p>
    <p>
        {{ inputs|raw }}
        <input type="submit" value="Continue">
    </p>
</form>
</body>
</html>
```

::: tip
Since this template is simply used for redirecting, it only appears for a few seconds, so we suggest making it load fast with minimal images and inline styles to reduce HTTP requests.
:::

A barebones template is used  by default if this setting isn’t set.

## `loadCartRedirectUrl`

Determines what URL the customer should be redirected to after loading a cart via the load cart action URL.

Default: `siteUrl()`

## `pdfAllowRemoteImages`

Determines whether order PDFs can include remote images.

Default: `false`

## `pdfPaperSize`

The size of the paper to use for generated order PDFs. A full list of paper size values can be found [here](https://github.com/dompdf/dompdf/blob/master/src/Adapter/CPDF.php#L45).

Default: `'letter'`

## `pdfPaperOrientation`

The orientation of the paper to use for generated order PDF files. Valid values are `'portrait'` or `'landscape'`.

Default: `'portrait'`

## `purgeInactiveCarts`

Whether Commerce should automatically delete inactive carts from the database during garbage collection.

Default: `true`

::: tip
You can control how long a cart should go without being updated before it gets deleted [`purgeInactiveCartsDuration`](#purgeinactivecartsduration) setting.
:::

## `purgeInactiveCartsDuration`

A [duration interval](https://en.wikipedia.org/wiki/ISO_8601#Durations) that determines how long a cart should go without being updated before it gets deleted during garbage collection.

Default: `'P3M'` (3 months)

## `requireBillingAddressAtCheckout`

Determines whether a billing address is required before making a payment on an order.

Default: `false`

## `requireShippingAddressAtCheckout`

Determines whether a shipping address is required before making a payment on an order.

Default: `false`

## `requireShippingMethodSelectionAtCheckout`

Determines whether a shipping method selection is required before making a payment on an order.

Default: `false`

## `showCustomerInfoTab`

Whether the [customer info tab](customers.md#user-customer-info-tab) should be shown when viewing users in the control panel.

Default: `true`

## `updateBillingDetailsUrl`

The URL for a user to resolve billing issues with their subscription.

Default: `''`

::: tip
The [example templates](example-templates.md) folder contains an example of this page. It can be found at [shop/plans/update-billing-details.twig](https://github.com/craftcms/commerce/tree/master/example-templates/shop/plans/update-billing-details.twig)
:::

## `useBillingAddressForTax`

Determines whether taxes should be calculated based on the billing address instead of the shipping address.

Default: `false` (use the shipping address)

## `updateCartSearchIndexes`

Determines whether the search index should be updated when a cart is saved by a customer when they use the `commerce/cart/*` controller actions.
Making this `false` will reduce the number of search index update jobs created, but will also reduce the ability to search carts in the control panel.

Default `true`

<!-- END SETTINGS -->
