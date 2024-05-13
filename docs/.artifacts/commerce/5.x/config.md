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




<!-- END SETTINGS -->
