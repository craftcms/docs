# Config Settings

In addition to the settings in **Commerce** → **Settings**, the config items below can be saved in a `config/commerce.php` file using the same format as [Craft’s general config settings](/3.x/config/config-settings.md) in `config/general.php`.

For example, if you wanted to change the [inactive carts duration](#purgeinactivecartsduration) in dev environments but not on staging or production, you could do this:

```php{9}
return [
    // Global settings
    '*' => [
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'purgeInactiveCartsDuration' => 'P1D',
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

You can access the Commerce [general settings model](commerce3:craft\commerce\models\Settings) in your templates:

```twig
{% set settings = craft.commerce.settings %}
```

Here’s the full list of Commerce config settings:

<!-- BEGIN SETTINGS -->

## System

### `defaultView`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'commerce/orders'`

Defined by
:   [Settings::$defaultView](commerce3:craft\commerce\models\Settings::$defaultView)

Since
:   2.2



Commerce’s default control panel view. (Defaults to order index.)



### `emailSenderAddress`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [Settings::$emailSenderAddress](commerce3:craft\commerce\models\Settings::$emailSenderAddress)



Default email address Commerce system messages should be sent from.

If `null` (default), Craft’s [MailSettings::$fromEmail](craft3:craft\models\MailSettings::$fromEmail) will be used.



### `emailSenderAddressPlaceholder`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [Settings::$emailSenderAddressPlaceholder](commerce3:craft\commerce\models\Settings::$emailSenderAddressPlaceholder)



Placeholder value displayed for the sender address control panel settings field.

If `null` (default), Craft’s [MailSettings::$fromEmail](craft3:craft\models\MailSettings::$fromEmail) will be used.



### `emailSenderName`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [Settings::$emailSenderName](commerce3:craft\commerce\models\Settings::$emailSenderName)



Default from name used for Commerce system emails.

If `null` (default), Craft’s [MailSettings::$fromName](craft3:craft\models\MailSettings::$fromName) will be used.



### `emailSenderNamePlaceholder`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `null`

Defined by
:   [Settings::$emailSenderNamePlaceholder](commerce3:craft\commerce\models\Settings::$emailSenderNamePlaceholder)



Placeholder value displayed for the sender name control panel settings field.

If `null` (default), Craft’s [MailSettings::$fromName](craft3:craft\models\MailSettings::$fromName) will be used.



### `showCustomerInfoTab`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [Settings::$showCustomerInfoTab](commerce3:craft\commerce\models\Settings::$showCustomerInfoTab)

Since
:   3.0



Whether the [customer info tab](customers.md#user-customer-info-tab) should be shown when viewing users in the control panel.



## Cart

### `activeCartDuration`

Allowed types
:   `mixed`

Default value
:   `3600`

Defined by
:   [Settings::$activeCartDuration](commerce3:craft\commerce\models\Settings::$activeCartDuration)

Since
:   2.2



How long a cart should go without being updated before it’s considered inactive. (Defaults to one hour.)

See [craft\helpers\ConfigHelper::durationInSeconds()](craft3:craft\helpers\ConfigHelper::durationInSeconds()) for a list of supported value types.



### `allowCheckoutWithoutPayment`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$allowCheckoutWithoutPayment](commerce3:craft\commerce\models\Settings::$allowCheckoutWithoutPayment)

Since
:   3.3



Whether carts are can be marked as completed without a payment.


### `autoSetNewCartAddresses`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [Settings::$autoSetNewCartAddresses](commerce3:craft\commerce\models\Settings::$autoSetNewCartAddresses)



Whether the customer’s primary shipping and billing addresses should be set automatically on new carts.



### `allowEmptyCartOnCheckout`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$allowEmptyCartOnCheckout](commerce3:craft\commerce\models\Settings::$allowEmptyCartOnCheckout)

Since
:   2.2



Whether carts are allowed to be empty on checkout.



### `cartVariable`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'cart'`

Defined by
:   [Settings::$cartVariable](commerce3:craft\commerce\models\Settings::$cartVariable)



Key to be used when returning cart information in a response.



### `loadCartRedirectUrl`

Allowed types
:   [string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:   `null`

Defined by
:   [Settings::$loadCartRedirectUrl](commerce3:craft\commerce\models\Settings::$loadCartRedirectUrl)

Since
:   3.1



Default URL to be loaded after using the [load cart controller action](loading-a-cart.md).

If `null` (default), Craft’s default [`siteUrl`](config3:siteUrl) will be used.



### `purgeInactiveCarts`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [Settings::$purgeInactiveCarts](commerce3:craft\commerce\models\Settings::$purgeInactiveCarts)



Whether inactive carts should automatically be deleted from the database during garbage collection.

::: tip
You can control how long a cart should go without being updated before it gets deleted [`purgeInactiveCartsDuration`](#purgeinactivecartsduration) setting.
:::



### `purgeInactiveCartsDuration`

Allowed types
:   `mixed`

Default value
:   `7776000`

Defined by
:   [Settings::$purgeInactiveCartsDuration](commerce3:craft\commerce\models\Settings::$purgeInactiveCartsDuration)



Default length of time before inactive carts are purged. (Defaults to 90 days.)

See [craft\helpers\ConfigHelper::durationInSeconds()](craft3:craft\helpers\ConfigHelper::durationInSeconds()) for a list of supported value types.



### `updateCartSearchIndexes`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `true`

Defined by
:   [Settings::$updateCartSearchIndexes](commerce3:craft\commerce\models\Settings::$updateCartSearchIndexes)

Since
:   3.1.5



Whether the search index for a cart should be updated when saving the cart via `commerce/cart/*` controller actions.

May be set to `false` to reduce performance impact on high-traffic sites.

::: warning
Setting this to `false` will result in fewer index update queue jobs, but you’ll need to manually re-index orders to ensure up-to-date cart search results in the control panel.
:::



### `validateCartCustomFieldsOnSubmission`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$validateCartCustomFieldsOnSubmission](commerce3:craft\commerce\models\Settings::$validateCartCustomFieldsOnSubmission)

Since
:   3.0.12



Whether to validate custom fields when a cart is updated.

Set to `true` to allow custom content fields to return validation errors when a cart is updated.



## Orders

### `freeOrderPaymentStrategy`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'complete'`

Defined by
:   [Settings::$freeOrderPaymentStrategy](commerce3:craft\commerce\models\Settings::$freeOrderPaymentStrategy)



How Commerce should handle free orders.

The default `'complete'` setting automatically completes zero-balance orders without forwarding them to the payment gateway.

The `'process'` setting forwards zero-balance orders to the payment gateway for processing. This can be useful if the customer’s balance
needs to be updated or otherwise adjusted by the payment gateway.



### `minimumTotalPriceStrategy`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'default'`

Defined by
:   [Settings::$minimumTotalPriceStrategy](commerce3:craft\commerce\models\Settings::$minimumTotalPriceStrategy)



How Commerce should handle minimum total price for an order.

Options:

- `'default'` [rounds](commerce3:\craft\commerce\helpers\Currency::round()) the sum of the item subtotal and adjustments.
- `'zero'` returns `0` if the result from `'default'` would’ve been negative; minimum order total is `0`.
- `'shipping'` returns the total shipping cost if the `'default'` result would’ve been negative; minimum order total equals shipping amount.



### `orderReferenceFormat`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'{{number[:7]}}'`

Defined by
:   [Settings::$orderReferenceFormat](commerce3:craft\commerce\models\Settings::$orderReferenceFormat)



Human-friendly reference number format for orders. Result must be unique.

See [Order Numbers](orders.md#order-numbers).



### `pdfPaperOrientation`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'portrait'`

Defined by
:   [Settings::$pdfPaperOrientation](commerce3:craft\commerce\models\Settings::$pdfPaperOrientation)



The orientation of the paper to use for generated order PDF files.

Options are `'portrait'` and `'landscape'`.



### `pdfPaperSize`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'letter'`

Defined by
:   [Settings::$pdfPaperSize](commerce3:craft\commerce\models\Settings::$pdfPaperSize)



The size of the paper to use for generated order PDFs.

The full list of supported paper sizes can be found [in the dompdf library](https://github.com/dompdf/dompdf/blob/master/src/Adapter/CPDF.php#L45).



### `pdfAllowRemoteImages`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$pdfAllowRemoteImages](commerce3:craft\commerce\models\Settings::$pdfAllowRemoteImages)



Whether to allow non-local images in generated order PDFs.



### `requireShippingAddressAtCheckout`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$requireShippingAddressAtCheckout](commerce3:craft\commerce\models\Settings::$requireShippingAddressAtCheckout)



Whether a shipping address is required before making payment on an order.



### `requireBillingAddressAtCheckout`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$requireBillingAddressAtCheckout](commerce3:craft\commerce\models\Settings::$requireBillingAddressAtCheckout)



Whether a billing address is required before making payment on an order.



### `requireShippingMethodSelectionAtCheckout`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$requireShippingMethodSelectionAtCheckout](commerce3:craft\commerce\models\Settings::$requireShippingMethodSelectionAtCheckout)



Whether shipping method selection is required before making payment on an order.



### `updateBillingDetailsUrl`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [Settings::$updateBillingDetailsUrl](commerce3:craft\commerce\models\Settings::$updateBillingDetailsUrl)



URL for a user to resolve billing issues with their subscription.

::: tip
The example templates include [a template for this page](https://github.com/craftcms/commerce/tree/main/example-templates/build/shop/plans/update-billing-details.twig).
:::



### `useBillingAddressForTax`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$useBillingAddressForTax](commerce3:craft\commerce\models\Settings::$useBillingAddressForTax)



Whether taxes should be calculated based on the billing address instead of the shipping address.



### `validateBusinessTaxIdAsVatId`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$validateBusinessTaxIdAsVatId](commerce3:craft\commerce\models\Settings::$validateBusinessTaxIdAsVatId)



Whether to enable validation requiring the `businessTaxId` to be a valid VAT ID.

When set to `false`, no validation is applied to `businessTaxId`.

When set to `true`, `businessTaxId` must contain a valid VAT ID.

::: tip
This setting strictly toggles input validation and has no impact on tax configuration or behavior elsewhere in the system.
:::



## Payments

### `allowPartialPaymentOnCheckout`

Allowed types
:   [boolean](http://php.net/language.types.boolean)

Default value
:   `false`

Defined by
:   [Settings::$allowPartialPaymentOnCheckout](commerce3:craft\commerce\models\Settings::$allowPartialPaymentOnCheckout)



Whether partial payment can be made from the front end. Gateway must also allow them.

The default `false` does not allow partial payments on the front end.



### `gatewayPostRedirectTemplate`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `''`

Defined by
:   [Settings::$gatewayPostRedirectTemplate](commerce3:craft\commerce\models\Settings::$gatewayPostRedirectTemplate)



The path to the template that should be used to perform POST requests to offsite payment gateways.

The template must contain a form that posts to the URL supplied by the `actionUrl` variable and outputs all hidden inputs with
the `inputs` variable.

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
        <button type="submit">Continue</button>
    </p>
</form>
</body>
</html>
```

::: tip
Since this template is simply used for redirecting, it only appears for a few seconds, so we suggest making it load fast with minimal
images and inline styles to reduce HTTP requests.
:::

If empty (default), each gateway will decide how to handle after-payment redirects.



### `gatewaySettings`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `[]`

Defined by
:   [Settings::$gatewaySettings](commerce3:craft\commerce\models\Settings::$gatewaySettings)



Payment gateway settings indexed by each gateway’s handle.

Check each gateway’s documentation for settings that may be stored.



### `paymentCurrency`

Allowed types
:   [array](http://php.net/language.types.array)

Default value
:   `null`

Defined by
:   [Settings::$paymentCurrency](commerce3:craft\commerce\models\Settings::$paymentCurrency)



ISO codes for supported payment currencies.

See [Payment Currencies](payment-currencies.md).



## Units

### `dimensionUnits`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'mm'`

Defined by
:   [Settings::$dimensionUnits](commerce3:craft\commerce\models\Settings::$dimensionUnits)



Unit type for dimension measurements.

Options:

- `'mm'`
- `'cm'`
- `'m'`
- `'ft'`
- `'in'`



### `weightUnits`

Allowed types
:   [string](http://php.net/language.types.string)

Default value
:   `'g'`

Defined by
:   [Settings::$weightUnits](commerce3:craft\commerce\models\Settings::$weightUnits)



Units to be used for weight measurements.

Options:

- `'g'`
- `'kg'`
- `'lb'`




<!-- END SETTINGS -->
