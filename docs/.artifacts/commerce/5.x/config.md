<!-- This file is generated in an automated workflow based on Craft source files. Changes to it will be overwritten the next time the docs are built. -->

<!-- BEGIN SETTINGS -->

## System

### `defaultView`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'commerce/orders'`

Defined by
:  [Settings::$defaultView](commerce5:craft\commerce\models\Settings::$defaultView)

Since
:  2.2

</div>

Commerce’s default control panel view. (Defaults to order index.)



## Cart

### `activeCartDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `3600` (1 hour)

Defined by
:  [Settings::$activeCartDuration](commerce5:craft\commerce\models\Settings::$activeCartDuration)

Since
:  2.2

</div>

How long a cart should go without being updated before it’s considered inactive.

See [craft\helpers\ConfigHelper::durationInSeconds()](craft4:craft\helpers\ConfigHelper::durationInSeconds()) for a list of supported value types.



### `cartVariable`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'cart'`

Defined by
:  [Settings::$cartVariable](commerce5:craft\commerce\models\Settings::$cartVariable)

</div>

Key to be used when returning cart information in a response.



### `loadCartRedirectUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [Settings::$loadCartRedirectUrl](commerce5:craft\commerce\models\Settings::$loadCartRedirectUrl)

Since
:  3.1

</div>

Default URL to be loaded after using the [load cart controller action](orders-carts.md#loading-a-cart).

If `null` (default), Craft’s default [`siteUrl`](config4:siteUrl) will be used.



### `purgeInactiveCarts`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [Settings::$purgeInactiveCarts](commerce5:craft\commerce\models\Settings::$purgeInactiveCarts)

</div>

Whether inactive carts should automatically be deleted from the database during garbage collection.

::: tip
You can control how long a cart should go without being updated before it gets deleted [`purgeInactiveCartsDuration`](#purgeinactivecartsduration) setting.
:::



### `purgeInactiveCartsDuration`

<div class="compact">

Allowed types
:  `mixed`

Default value
:  `7776000` (90 days)

Defined by
:  [Settings::$purgeInactiveCartsDuration](commerce5:craft\commerce\models\Settings::$purgeInactiveCartsDuration)

</div>

Default length of time before inactive carts are purged. (Defaults to 90 days.)

See [craft\helpers\ConfigHelper::durationInSeconds()](craft4:craft\helpers\ConfigHelper::durationInSeconds()) for a list of supported value types.



### `updateCartSearchIndexes`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `true`

Defined by
:  [Settings::$updateCartSearchIndexes](commerce5:craft\commerce\models\Settings::$updateCartSearchIndexes)

Since
:  3.1.5

</div>

Whether the search index for a cart should be updated when saving the cart via `commerce/cart/*` controller actions.

May be set to `false` to reduce performance impact on high-traffic sites.

::: warning
Setting this to `false` will result in fewer index update queue jobs, but you’ll need to manually re-index orders to ensure up-to-date cart search results in the control panel.
:::



### `validateCartCustomFieldsOnSubmission`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [Settings::$validateCartCustomFieldsOnSubmission](commerce5:craft\commerce\models\Settings::$validateCartCustomFieldsOnSubmission)

Since
:  3.0.12

</div>

Whether to validate custom fields when a cart is updated.

Set to `true` to allow custom content fields to return validation errors when a cart is updated.



## Orders

### `pdfAllowRemoteImages`

<div class="compact">

Allowed types
:  [boolean](https://php.net/language.types.boolean)

Default value
:  `false`

Defined by
:  [Settings::$pdfAllowRemoteImages](commerce5:craft\commerce\models\Settings::$pdfAllowRemoteImages)

</div>

Whether to allow non-local images in generated order PDFs.



### `updateBillingDetailsUrl`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [Settings::$updateBillingDetailsUrl](commerce5:craft\commerce\models\Settings::$updateBillingDetailsUrl)

</div>

URL for a user to resolve billing issues with their subscription.

::: tip
The example templates include [a template for this page](https://github.com/craftcms/commerce/tree/main/example-templates/dist/shop/plans/update-billing-details.twig).
:::



## Payments

### `gatewayPostRedirectTemplate`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `''`

Defined by
:  [Settings::$gatewayPostRedirectTemplate](commerce5:craft\commerce\models\Settings::$gatewayPostRedirectTemplate)

</div>

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



### `paymentCurrency`

<div class="compact">

Allowed types
:  [array](https://php.net/language.types.array), [null](https://php.net/language.types.null)

Default value
:  `null`

Defined by
:  [Settings::$paymentCurrency](commerce5:craft\commerce\models\Settings::$paymentCurrency)

</div>

ISO codes for supported payment currencies.

See [Payment Currencies](payment-currencies.md).



## Units

### `dimensionUnits`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'mm'`

Defined by
:  [Settings::$dimensionUnits](commerce5:craft\commerce\models\Settings::$dimensionUnits)

</div>

Unit type for dimension measurements.

Options:

- `'mm'`
- `'cm'`
- `'m'`
- `'ft'`
- `'in'`



### `weightUnits`

<div class="compact">

Allowed types
:  [string](https://php.net/language.types.string)

Default value
:  `'g'`

Defined by
:  [Settings::$weightUnits](commerce5:craft\commerce\models\Settings::$weightUnits)

</div>

Units to be used for weight measurements.

Options:

- `'g'`
- `'kg'`
- `'lb'`




<!-- END SETTINGS -->
