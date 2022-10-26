---
sidebarDepth: 2
---

# Controller Actions

<Todo notes="Finish migrating to combined tables" />
<Todo notes="Revise response sections now that success/failure states are centrally documented" />

Commerce exposes a number of common resources to your storefront via an HTTP API.

::: tip
We recommend reviewing the main Craft documentation on [working with controller actions](/4.x/dev/controller-actions.md) before you dig in, here!
:::

## Available Actions

Action | Description
------ | -----------
<badge vertical="baseline" type="verb">POST</badge> [cart/complete](#post-cart-complete) | Completes an order without payment.
<badge vertical="baseline" type="verb">GET</badge> [cart/get-cart](#get-cart-get-cart) | Returns the current cart as JSON.
<badge vertical="baseline" type="verb">GET</badge> [cart/load-cart](#get-cart-load-cart) | Loads a cookie for the given cart.
<badge vertical="baseline" type="verb">POST</badge> [cart/update-cart](#post-cart-update-cart) | Updates the cart by adding purchasables, updating line items, or updating various cart attributes.
<badge vertical="baseline" type="verb">GET</badge> [downloads/pdf](#get-downloads-pdf) | Returns an order PDF as a file.
<badge vertical="baseline" type="verb">POST</badge> [payment-sources/add](#post-payment-sources-add) | Creates a new payment source.
<badge vertical="baseline" type="verb">POST</badge> [payment-sources/delete](#post-payment-sources-delete) | Deletes a payment source.
<badge vertical="baseline" type="verb">GET</badge> [payments/complete-payment](#get-payments-complete-payment) | Processes customer’s return from an off-site payment.
<badge vertical="baseline" type="verb">POST</badge> [payments/pay](#post-payments-pay) | Makes a payment on an order.

[Address management](/4.x/addresses.md/#managing-addresses) actions are part of the main Craft documentation. Commerce also allows address information to be set directly on a cart via <badge vertical="baseline" type="verb">POST</badge> [cart/update-cart](#post-cart-update-cart).

### <badge vertical="baseline" type="verb">POST</badge> `cart/complete`

You can let your customers complete an order without a payment transaction. The [allowCheckoutWithoutPayment](../config-settings.md#allowcheckoutwithoutpayment) setting must be enabled or an HTTP exception will be thrown.

The cart must have an email address and honor the following settings:

- [allowEmptyCartOnCheckout](../config-settings.md#allowemptycartoncheckout)
- [requireShippingMethodSelectionAtCheckout](../config-settings.md#requireshippingmethodselectionatcheckout)
- [requireBillingAddressAtCheckout](../config-settings.md#requirebillingaddressatcheckout)
- [requireShippingAddressAtCheckout](../config-settings.md#requireshippingaddressatcheckout)

See the [Making Payments](../making-payments.md#checkout-without-payment) page for more on using this action.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`forceSave` | Optionally set to `true` to force saving the cart.
`number` | Optional order number for a specific, existing cart.
`registerUserOnOrderComplete` | Whether to create a user account for the customer when the cart is completed and turned into an order.

#### Response

The output of the action depends on whether the cart was completed successfully and the request included an `Accept: application/json` header.

<span class="croker-table">

State | Standard | Ajax
----- | -------- | ----
<check-mark/> | Redirect response per the hashed `redirect` param, or the user session’s return URL. Success message will be set on the flash `notice` key. | JSON object with the following keys: `success`, `message`, and the cart in the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting.
<x-mark/> | None; the request will be routed per the URI. Cart will be available in the template under the [cartVariable](../config-settings.md#cartvariable), following the [models and validation](/4.x/dev/controller-actions.md#models-and-validation) pattern. | JSON object with the following keys: `error`, `errors`, `success`, `message`, and the cart in the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">GET</badge> `cart/get-cart`

Returns the [current cart](../orders-carts.md#fetching-a-cart) as JSON. A new cart cookie will be generated if one doesn’t already exist.

The request must include `Accept: application/json` in its headers.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`number` | Optional order number for a specific, existing cart.
`forceSave` | Optionally set to `true` to force saving the cart.

#### Response

<span class="croker-table">

State | Ajax
----- | ----
<check-mark/> | JSON object with the current cart under the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">POST</badge> `cart/update-cart`

Updates the cart by [adding](../orders-carts.md#adding-items-to-a-cart) or [updating](../orders-carts.md#working-with-line-items) line items, or setting other cart attributes.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`billingAddress[]` | Billing address attributes. (See [Addresses](../addresses.md)).
`billingAddressId` | ID of an existing address to use as the billing address.
`billingAddressSameAsShipping` | Set to `true` to use shipping address for billing address. (Will ignore billing address ID and fields.)
`clearNotices` | When passed, clears all cart notices.
`clearLineItems` | When passed, empties all line items from cart.
`couponCode` | Coupon code for a [discount](../discounts.md) that should be applied to the cart.
`email` | Email address to be associated with the cart.
`estimatedBillingAddress[]` | Estimated billing address attributes. (See [Addresses](../addresses.md)).
`estimatedBillingAddressSameAsShipping` | Set to `true` to use shipping address for estimated billing address.
`estimatedShippingAddress[]` | Estimated shipping address attributes. (See [Addresses](../addresses.md)).
`fields[]` | Optional array of custom fields to be submitted to the cart.
`forceSave` | Optionally set to `true` to force saving the cart.
`gatewayId` | The payment gateway ID to be used when the cart is completed.
`lineItems[]` | Array of one or more of the cart’s line items to update. Each must have an `id` key-value pair, and may include `options`, `note`, and `qty` key-value pairs. An item may include a `remove` key with a value of `1` or a `qty` of `0` to be removed from the cart.
`number` | Optional order number for specific, existing cart.
`paymentCurrency` | ISO code of a configured [payment currency](../payment-currencies.md) to be used for the cart.
`paymentSourceId` | The ID for a payment source that should be used when the cart is completed.
`purchasableId` | Single purchasable ID to be added to the cart. If provided, will also use optional `note`, `options[]`, and `qty` parameters.
`purchasables[]` | Array of one or more purchasables to be [added to the cart](../orders-carts.md#adding-a-multiple-items). Each must include an `id` key-value pair, and may include `options`, `note`, and `qty` key-value pairs.
`registerUserOnOrderComplete` | Whether to create a user account for the customer when the cart is completed and turned into an order.
`shippingAddress[]` | Shipping address attributes. (See [Addresses](../addresses.md)).
`shippingAddressId` | ID of an existing address to use as the shipping address.
`shippingAddressSameAsBilling` | Set to `true` to use billing address for shipping address and ignore `shippingAddress` and `shippingAddressId`.
`shippingMethodHandle` | The handle of a shipping method to be set for the cart.

#### Response

The output of the action depends on whether the cart was updated successfully and the request included an `Accept: application/json` header.

<span class="croker-table">

State | Standard | Ajax
----- | -------- | ----
<check-mark/> | Redirect response per the hashed `redirect` param. | JSON object with the following keys: `success`, `message`, and the cart in the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting.
<x-mark/> | None; the request will be routed per the URI. Cart will be available in the template under the [cartVariable](../config-settings.md#cartvariable), following the [models and validation](/4.x/dev/controller-actions.md#models-and-validation) pattern. | JSON object with the following keys: `error`, `errors`, `success`, `message`, and the cart in the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">GET/POST</badge> `cart/load-cart`

Loads a cookie for the specified cart.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`number` | Required cart number to be loaded.

#### Response

The action’s output depends on whether the cart was loaded successfully and the request included an `Accept: application/json` header.

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | <badge vertical="baseline" type="verb">GET</badge> requests are redirected to the [loadCartRedirectUrl](../config-settings.md#loadcartredirecturl). <badge vertical="baseline" type="verb">POST</badge> requests are redirected to the hashed `redirect` param, or to the original URI. | JSON object with a `success` key.
<x-mark/> | GET requests will be redirected per the [loadCartRedirectUrl](../config-settings.md#loadcartredirecturl) config setting, and POST requests routed per the URI. A failure message will be set on the flash `error` key. | JSON object with an error message in its `error` key.

</span>

### <badge vertical="baseline" type="verb">GET</badge> `downloads/pdf`

Returns an order PDF as a file.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`number` | Required order number.
`option` | Optional string value that’s passed to the PDF template.
`pdfHandle` | Handle of the [PDF](../pdfs.md) to be rendered.

#### Response

State | Output
----- | ------
<check-mark/> | File response with the rendered PDF and an `application/pdf` MIME type.
<x-mark/> | Exceptions will be rendered with the normal [error template](/4.x/routing.md#error-templates).


### <badge vertical="baseline" type="verb">POST</badge> `payment-sources/add`

Creates a new payment source.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`*` | All body parameters will be provided directly to the gateway’s [payment form](../payment-form-models.md) model.
`description` | Description for the payment source.
`gatewayId` | ID of the new payment source’s gateway, which must support payment sources.

#### Response

The action’s output depends on whether the payment source was saved and the request included an `Accept: application/json` header.

<span class="croker-table">

State | Standard | Ajax
----- | -------- | ----
<check-mark/> | Redirect response per the hashed `redirect` param. | JSON object with a `success` key with a value of `true`, with the payment source on its `paymentSource` key.
<x-mark/> | Routed per the request URI. The <commerce4:craft\commerce\models\payments\BasePaymentForm> will be available in the template as `paymentForm`, following the [models and validation](/4.x/dev/controller-actions.md#models-and-validation) pattern. | JSON object with errors under an `errors` key.

</span>

### <badge vertical="baseline" type="verb">POST</badge> `payment-sources/delete`

Deletes a payment source.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`id` | ID of the saved payment source to delete. (Must belong to the customer, otherwise the user deleting must have `commerce-manageOrders` permission.)

#### Response

The action’s output depends on whether the payment source was removed successfully and the request included an `Accept: application/json` header.

<span class="croker-table">

State | Standard | Ajax
----- | -------- | ----
<check-mark/> | Redirect response to the POST URI. Success message will be set on the flash `notice` key. | JSON object with a `success` key with a value of `true`.
<x-mark/> | Routed per the POST URI. A failure message will be set on the flash `error` key. | JSON object with an error message in its `error` key.

</span>

#### With JSON Request Header

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | JSON object with a `success` key with a value of `true`.
<x-mark/> | JSON object with an error message in its `error` key.

</span>

### <badge vertical="baseline" type="verb">POST</badge> `payments/pay`

Makes a payment on an order.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`*` | All body parameters will be provided directly to the gateway’s payment form model.
`cancelUrl` | URL user should end up on if they choose to cancel payment.
`email` | Email address of the person responsible for payment, which must match the email address on the order. Required if the order being paid is not the active cart.
`gatewayId` | The payment gateway ID to be used for payment.
`number` | The order number payment should be applied to. When ommitted, payment is applied to the current cart.
`paymentAmount` | Hashed payment amount, expressed in the cart’s `paymentCurrency`, available only if [partial payments](../making-payments.md#checkout-with-partial-payment) are allowed.
`paymentCurrency` | ISO code of a configured [payment currency](../payment-currencies.md) to be used for the payment.
`paymentSourceId` | The ID for a payment source that should be used for payment.
`registerUserOnOrderComplete` | Whether the customer should have an account created on order completion.
`savePaymentSource` | Whether to save card information as a payment source. (Gateway must support payment sources.)

#### Response

The action’s output depends on whether payment was applied successfully and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | Redirect response per the order’s `returnUrl` if set, or to the POST URI. Success message will be set on the flash `notice` key.
<x-mark/> | Routed per the POST URI. A failure message will be set on the flash `error` key, and the payment form model and cart will be populated in a `paymentForm` variable and a variable named per the [cartVariable](../config-settings.md#cartvariable) config setting. There may also be a `paymentFormErrors` variable with an array of error messages.

</span>

#### With JSON Request Header

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | JSON object with a `success` key with a value of `true`, the cart on the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting, the redirect value (if applicable) on the `redirect` key, and (if applicable) the `transactionId` and `transactionHash` of the related transaction.
<x-mark/> | JSON object with an error on its `error` key, and the current cart on the key defined by the [cartVariable](../config-settings.md#cartvariable) config setting. Any payment errors will be listed in an array on the `paymentFormErrors` key.

</span>

### <badge vertical="baseline" type="verb">GET</badge> `payments/complete-payment`

Processes customer’s return from an off-site payment.

#### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`commerceTransactionHash` | Required transaction hash used to verify the [off-site payment](../extend/payment-gateway-types.md#off-site-payment) being completed.

#### Response

The action’s output depends on whether the payment completed successfully and the request included an `Accept: application/json` header.

#### Standard Request

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | Redirect response to the order’s `returnUrl`.
<x-mark/> | Redirect response to the order’s `cancelUrl`, with a payment error set on the flash `notice` key.

</span>

#### With JSON Request Header

<span class="croker-table">

State | Output
----- | ------
<check-mark/> | JSON response with the order’s `returnUrl` set on a `url` key.
<x-mark/> | JSON response with the order’s `cancelUrl` set on a `url` key.

</span>

