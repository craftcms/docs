---
sidebarDepth: 2
---

# Controller Actions

Commerce exposes a number of common resources to your storefront via an HTTP API.

::: tip
We recommend reviewing the main Craft documentation on [forms and controller actions](/5.x/development/forms.md) before you dig in, here!
:::

## Available Actions

Methods | Action | Description
--- | --- | ---
<badge vertical="baseline" type="verb">POST</badge> | [cart/complete](#post-cart-complete) | Completes an order without payment.
<badge vertical="baseline" type="verb">GET</badge> | [cart/get-cart](#get-cart-get-cart) | Returns the current cart as JSON.
<badge vertical="baseline" type="verb">GET/POST</badge> | [cart/load-cart](#get-post-cart-load-cart) | Loads a cookie for the given cart.
<badge vertical="baseline" type="verb">POST</badge> | [cart/forget-cart](#get-post-cart-forget-cart) | Removes a cookie for the current cart.
<badge vertical="baseline" type="verb">POST</badge> | [cart/update-cart](#post-cart-update-cart) | Manage a customer’s current [cart](../system/orders-carts.md).
<badge vertical="baseline" type="verb">POST</badge> | [payment-sources/add](#post-payment-sources-add) | Creates a new payment source.
<badge vertical="baseline" type="verb">POST</badge> | [payment-sources/delete](#post-payment-sources-delete) | Deletes a payment source.
<badge vertical="baseline" type="verb">GET</badge> | [payments/complete-payment](#get-payments-complete-payment) | Processes customer’s return from an off-site payment.
<badge vertical="baseline" type="verb">POST</badge> | [payments/pay](#post-payments-pay) | Makes a payment on an order.
<badge vertical="baseline" type="verb">GET</badge> | [downloads/pdf](#get-downloads-pdf) | Returns an order PDF as a file.
<badge vertical="baseline" type="verb">POST</badge> | [subscriptions/subscribe](#post-subscriptions-subscribe) | Starts a new subscription.
<badge vertical="baseline" type="verb">POST</badge> | [subscriptions/cancel](#post-subscriptions-cancel) | Cancels an active subscription.
<badge vertical="baseline" type="verb">POST</badge> | [subscriptions/switch](#post-subscriptions-switch) | Switch an active subscription’s plan.
<badge vertical="baseline" type="verb">POST</badge> | [subscriptions/reactivate](#post-subscriptions-reactivate) | Reactivates a canceled subscription.

[Address management](/5.x/reference/element-types/addresses.md/#managing-addresses) actions are part of the main Craft documentation. Commerce also allows address information to be set directly on a cart via <badge vertical="baseline" type="verb">POST</badge> [cart/update-cart](#post-cart-update-cart).

### <badge vertical="baseline" type="verb">POST</badge> `cart/complete`

You can let your customers complete an order without a payment transaction. At a minimum, the **Allow Checkout Without Payment** [setting](../system/stores.md#settings) setting must be enabled for the cart’s store, or an HTTP exception will be thrown.

::: tip
See the [Making Payments](../development/making-payments.md#checkout-without-payment) page for more information about this action’s requirements.
:::

#### Supported Params

Param | Description
----- | -----------
`forceSave` | Optionally set to `true` to force saving the cart.
`number` | Optional order number for a specific, existing cart.
`registerUserOnOrderComplete` | Whether to create a user account for the customer when the cart is completed and turned into an order.

#### Response

The output of the action depends on whether the cart was completed successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]. | [Standard behavior][after-success]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.
<x-mark label="Failure" /> | [Standard behavior][after-fauilure]; cart is available in the template under a variable determined by the [cartVariable](../configure.md#cartvariable). | [Standard behavior][after-fauilure]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">GET</badge> `cart/get-cart`

Returns the [current cart](../system/orders-carts.md#fetching-a-cart) as JSON. A new cart cookie will be generated if one doesn’t already exist.

The request must include `Accept: application/json` in its headers.

#### Supported Params

Param | Description
----- | -----------
`number` | Optional order number for a specific, existing cart.
`forceSave` | Optionally set to `true` to force saving the cart.

#### Response

<span class="croker-table">

State | `application/json`
----- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">POST</badge> `cart/update-cart`

Updates the cart by [adding](../system/orders-carts.md#adding-items-to-a-cart) or [updating](../system/orders-carts.md#working-with-line-items) line items, and setting addresses and other cart attributes.

::: tip
Read more about [working with Addresses](../system/addresses.md) in Commerce.
:::

#### Supported Params

Param | Description
----- | -----------
`billingAddress[]` | Billing address attributes. (See [Addresses](../system/addresses.md)).
`billingAddressId` | ID of an existing address to use as the billing address.
`billingAddressSameAsShipping` | Set to `true` to use shipping address for billing address. (Will ignore billing address ID and fields.)
`clearNotices` | When passed, clears all cart notices.
`clearLineItems` | When passed, empties all line items from cart.
`couponCode` | Coupon code for a [discount](../system/discounts.md) that should be applied to the cart.
`email` | Email address to be associated with the cart.
`estimatedBillingAddress[]` | Estimated billing address attributes. (See [Addresses](../system/addresses.md)).
`estimatedBillingAddressSameAsShipping` | Set to `true` to use shipping address for estimated billing address.
`estimatedShippingAddress[]` | Estimated shipping address attributes. (See [Addresses](../system/addresses.md)).
`fields[]` | Optional array of custom fields to be submitted to the cart.
`forceSave` | Optionally set to `true` to force saving the cart.
`gatewayId` | The payment gateway ID to be used when the cart is completed.
`lineItems[]` | Array of one or more of the cart’s line items to update. Each must have an `id` key-value pair, and may include `options`, `note`, and `qty` key-value pairs. An item may include a `remove` key with a value of `1` or a `qty` of `0` to be removed from the cart.
`number` | Optional order number for specific, existing cart.
`paymentCurrency` | ISO code of a configured [payment currency](../system/currencies.md) to be used for the cart.
`paymentSourceId` | The ID for a payment source that should be used when the cart is completed.
`purchasableId` | Single purchasable ID to be added to the cart. If provided, will also use optional `note`, `options[]`, and `qty` parameters.
`purchasables[]` | Array of one or more purchasables to be [added to the cart](../system/orders-carts.md#adding-a-multiple-items). Each must include an `id` key-value pair, and may include `options`, `note`, and `qty` key-value pairs.
`registerUserOnOrderComplete` | Whether to create a user account for the customer when the cart is completed and turned into an order.
`saveBillingAddressOnOrderComplete` | Whether to save the billing address to the customer’s address book when the cart is completed and turned into an order.
`saveShippingAddressOnOrderComplete` | Whether to save the shipping address to the customer’s address book when the cart is completed and turned into an order.
`saveAddressesOnOrderComplete` | Whether to save both the shipping _and_ billing address to the customer’s address book when the cart is completed and turned into an order. Unlike `saveBillingAddressOnOrderComplete` and `saveShippingAddressOnOrderComplete`, this is _not_ stored on the order itself—it just allows customers to set both at the same time.
`shippingAddress[]` | Shipping address attributes. (See [Addresses](../system/addresses.md)).
`shippingAddressId` | ID of an existing address to use as the shipping address.
`shippingAddressSameAsBilling` | Set to `true` to use billing address for shipping address and ignore `shippingAddress` and `shippingAddressId`.
`shippingMethodHandle` | The handle of a shipping method to be set for the cart.

#### Response

The output of the action depends on whether the cart was updated successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]. | [Standard behavior][after-success]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.
<x-mark label="Failure" /> | [Standard behavior][after-failure]. | [Standard behavior][after-failure]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.

</span>


### <badge vertical="baseline" type="verb">GET/POST</badge> `cart/load-cart`

Loads a cookie for the specified cart.

#### Supported Params

Param | Description
----- | -----------
`number` | Required cart number to be loaded.

#### Response

The action’s output depends on whether the cart was loaded successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]; <badge vertical="baseline" type="verb">GET</badge> requests are redirected to the [loadCartRedirectUrl](../configure.md#loadcartredirecturl). | [Standard behavior][after-success].
<x-mark label="Failure" /> | [Standard behavior][after-failure]; <badge vertical="baseline" type="verb">GET</badge> requests are redirected per the [loadCartRedirectUrl](../configure.md#loadcartredirecturl). | [Standard behavior][after-failure].

</span>

### <badge vertical="baseline" type="verb">POST</badge> `cart/forget-cart`

Detaches a cart from the current customer’s session. Read more about [managing carts](../system/orders-carts.md#loading-and-forgetting-carts).

This action has no arguments and responses are only sent as `text/html`.

#### Response

<span class="croker-table">

State | `text/html`
--- | ---
<check-mark label="Success" /> | [Standard behavior][after-success].

</span>

### <badge vertical="baseline" type="verb">GET</badge> `cart/get-cart`

Returns the [current cart](../system/orders-carts.md#fetching-a-cart) as JSON. A new cart cookie will be generated if one doesn’t already exist.

The request must include `Accept: application/json` in its headers.

#### Supported Params

Param | Description
----- | -----------
`number` | Optional order number for a specific, existing cart.
`forceSave` | Optionally set to `true` to force saving the cart.

#### Response

<span class="croker-table">

State | `application/json`
----- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable) config setting.

</span>

### <badge vertical="baseline" type="verb">POST</badge> `payment-sources/add`

Creates a new payment source for the current customer.

#### Supported Params

Param | Description
----- | -----------
`*` | All body parameters will be provided directly to the gateway’s payment form model.
`description` | Description for the payment source.
`gatewayId` | ID of the new payment source’s gateway, which must support payment sources.
`isPrimaryPaymentSource` | Send a non-empty value to make this the customer’s primary payment source.

#### Response

The action’s output depends on whether the payment source was saved and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]. | [Standard behavior][after-success]; [PaymentSource](commerce5:craft\commerce\models\PaymentSource) data available under the `paymentSource` key.
<x-mark label="Failure" /> | [Standard behavior][after-failure]; [BasePaymentForm](commerce5:craft\commerce\models\payments\BasePaymentForm) subclass available in the template as `paymentForm`, | [Standard behavior][after-failure]; payment form data available under the `paymentForm` key.

</span>

::: warning
Note that the models available in success and failure states are different!
:::

### <badge vertical="baseline" type="verb">POST</badge> `payment-sources/delete`

Deletes a payment source.

#### Supported Params

Param | Description
----- | -----------
`id` | ID of the saved payment source to delete. (Must belong to the customer, otherwise the user deleting must have `commerce-manageOrders` permission.)

#### Response

The action’s output depends on whether the payment source was removed successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]. | [Standard behavior][after-success].
<x-mark label="Failure" /> | [Standard behavior][after-failure]. | [Standard behavior][after-failure].

</span>

### <badge vertical="baseline" type="verb">POST</badge> `payments/pay`

Makes a payment on an order. Read more about [making payments](../development/making-payments.md).

#### Supported Params

Param | Description
----- | -----------
`*` | All body parameters will be provided directly to the gateway’s payment form model.
`cancelUrl` | URL user should end up on if they choose to cancel payment.
`email` | Email address of the person responsible for payment, which must match the email address on the order. Required if the order being paid is not the active cart.
`gatewayId` | The payment gateway ID to be used for payment.
`number` | The order number payment should be applied to. When ommitted, payment is applied to the current cart.
`paymentAmount` | Hashed payment amount, expressed in the cart’s `paymentCurrency`. Available only if [partial payments](../development/making-payments.md#checkout-with-partial-payment) are allowed.
`paymentCurrency` | ISO code of a configured [payment currency](../system/currencies.md) to be used for the payment.
`paymentSourceId` | The ID for a payment source that should be used for payment.
`registerUserOnOrderComplete` | Whether the customer should have an account created on order completion.
`savePaymentSource` | Whether to save card information as a payment source. (Gateway must support payment sources.)
`saveBillingAddressOnOrderComplete` | Whether to save the billing address to the customer’s address book when the cart is completed and turned into an order.
`saveShippingAddressOnOrderComplete` | Whether to save the shipping address to the customer’s address book when the cart is completed and turned into an order.
`saveAddressesOnOrderComplete` | Whether to save both the shipping _and_ billing address to the customer’s address book when the cart is completed and turned into an order.

#### Response

The action’s output depends on whether payment was applied successfully and `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark label="Success" /> | [Standard behavior][after-success]; redirection defaults to the order’s `returnUrl`. | [Standard behavior][after-success]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable), as well as special `paymentForm`, `transactionId`, and `transactionHash` properties.
<x-mark label="Failure" /> | [Standard behavior][after-failure]; cart is available in the template under a variable determined by the [cartVariable](../configure.md#cartvariable), as well as special `paymentForm` and `paymentFormErrors` variables. | [Standard behavior][after-failure]; cart data is available under a key determined by the [cartVariable](../configure.md#cartvariable), as well as special `paymentForm` and `paymentFormErrors` properties.

</span>

::: tip
Both the cart _and_ payment form models may have errors. Be sure and check all returned variables when a payment fails—the top-level `errors` key in JSON responses will only include errors from the payment form.
:::

</span>

### <badge vertical="baseline" type="verb">GET</badge> `payments/complete-payment`

Processes customer’s return from an off-site payment.

#### Supported Params

Param | Description
----- | -----------
`commerceTransactionHash` | Required transaction hash used to verify the [off-site payment](../extend/payment-gateway-types.md#off-site-payment) being completed.

#### Response

The action’s output depends on whether the payment completed successfully and the `Accept` header.

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][after-success]; redirection defaults to the order’s `returnUrl`. | [Standard behavior][after-success]; special `url` property set to the order’s `returnUrl`.
<x-mark/> | [Standard behavior][after-failure]; redirection defaults to the order’s `cancelUrl`. | [Standard behavior][after-failure]; special `url` property set to the order’s `cancelUrl`.

</span>

### <badge vertical="baseline" type="verb">GET</badge> `downloads/pdf`

Generates and sends an order [PDF](../system/pdfs.md) as a file.

#### Supported Params

Param | Description
----- | -----------
`number` | Required order number.
`option` | Optional string value that’s passed to the PDF template.
`pdfHandle` | Handle of a configured PDF to be rendered.

#### Response

State | Output
----- | ------
<check-mark label="Success" /> | File response with the rendered PDF and an `application/pdf` MIME type.
<x-mark label="Failure" /> | Exceptions will be rendered with the normal [error template](/5.x/system/routing.md#error-templates).

### <badge vertical="baseline" type="verb">POST</badge> `subscriptions/subscribe`

Starts a new subscription with the current customer’s default payment source. Learn more about supporting [Subscriptions](../system/subscriptions.md).

::: warning
We recommend using normal HTML forms and a `text/html` content type for this action, as the gateway _may_ require redirection to resolve billing issues when a subscription cannot be started. This workflow can be problematic when using `application/json` over Ajax.
:::

#### Supported Params

Param | Description
----- | -----------
`planUid` | **Required.** UID of the Commerce plan the customer wants to subscribe to.
`fields[...]` | Subscription custom field values, indexed by their handles.
`fieldsLocation` | Allows relocation of the default `fields` key for custom field data (see above).
`*` | **Conditionally required.** Each [gateway](../system/gateways.md) that supports subscriptions may require additional properties on its <commerce5:craft\commerce\models\subscriptions\SubscriptionForm> subclass.

::: warning
`planUid` and all gateway-specific properties must be [hashed][hash-filter] to prevent tampering.
:::

#### Response

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][after-success]. | [Standard behavior][after-success]; the Subscription model is available under the `subscription` key.
<x-mark/> | [Standard behavior][after-failure]. Most subscription failures will be presented as a succinct error message. Specific issues are logged, but may not be disclosed to the customer. The user may be redirected to the [`updateBillingDetailsUrl` setting](../configure.md#updatebillingdetailsurl) to resolve billing issues. | [Standard behavior][after-failure].

</span>

### <badge vertical="baseline" type="verb">POST</badge> `subscriptions/cancel`

Cancels an active subscription.

#### Supported Params

Param | Description
----- | -----------
`subscriptionUid` | **Required.** UID of the subscription to cancel. Must be [hashed][hash-filter].
`*` | **Conditionally required.** Each [gateway](../system/gateways.md) that supports subscriptions may require additional properties on its <commerce5:craft\commerce\models\subscriptions\CancelSubscriptionForm> subclass.

#### Response

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][after-success]. | [Standard behavior][after-success]; the Subscription model is available under the `subscription` key.
<x-mark/> | [Standard behavior][after-failure]. | [Standard behavior][after-failure].

</span>

### <badge vertical="baseline" type="verb">POST</badge> `subscriptions/switch`

Switch the plan on an active subscription.

#### Supported Params

Param | Description
----- | -----------
`subscriptionUid` | **Required.** UID of the subscription getting updated. Must be [hashed][hash-filter].
`planUid` | **Required.** UID of the plan to switch to. Must be [hashed][hash-filter].
`*` | **Conditionally required.** Each [gateway](../system/gateways.md) that supports subscriptions may require additional properties on its <commerce5:craft\commerce\models\subscriptions\SwitchPlansForm> subclass.

#### Response

The request may fail if the new and old plans are not compatible. This is determined by the gateway, so be sure and consult its documentation and platform limitations.

You can check whether two plans are compatible in Twig, to narrow the options displayed to your customers:

```twig
{% set currentPlan = subscription.getPlan() %}
{% set gateway = currentPlan.getGateway() %}
{% set allPlans = craft.commerce.plans.getPlansByGatewayId(gateway.id) %}
{% set switchablePlans = allPlans|filter((p) => p.canSwitchFrom(currentPlan)) %}

<select name="planUid">
  {% for plan in switchablePlans %}
    <option value="{{ plan.uid|hash }}">{{ plan.name }}</option>
  {% endfor %}
</select>
```

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][after-success]. | [Standard behavior][after-success]; the Subscription model is available under the `subscription` key.
<x-mark/> | [Standard behavior][after-failure]. | [Standard behavior][after-failure].

</span>

### <badge vertical="baseline" type="verb">POST</badge> `subscriptions/reactivate`

Reactivates a canceled subscription. Only subscriptions that haven’t expired yet can be reactivated—a subscription may be canceled

#### Supported Params

Param | Description
----- | -----------
`subscriptionUid` | **Required.** UID of the subscription to reactivate. Must be [hashed][hash-filter].

#### Response

<span class="croker-table">

State | `text/html` | `application/json`
----- | ----------- | ------------------
<check-mark/> | [Standard behavior][after-success]. | [Standard behavior][after-success]; the Subscription model is available under the `subscription` key.
<x-mark/> | [Standard behavior][after-success]. | [Standard behavior][after-success].

</span>

[hash-filter]: /5.x/reference/twig/filters.md#hash
[after-success]: /5.x/development/forms.md#after-a-get-request
[after-failure]: /5.x/development/forms.md#failure
