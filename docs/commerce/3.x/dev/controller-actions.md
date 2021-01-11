# Controller Actions

The following [controller actions](https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers) are available for the site’s front end:

Action | Description
------ | -----------
<badge vertical="baseline" type="verb">POST</badge> [cart/get-cart](#post-cart-get-cart) | x
<badge vertical="baseline" type="verb">POST</badge> [cart/update-cart](#post-cart-update-cart) | x
<badge vertical="baseline" type="verb">POST</badge> [cart/load-cart](#get-post-cart-load-cart) | x
<badge vertical="baseline" type="verb">POST</badge> [customer-addresses/save](#post-customer-addresses-save) | x
<badge vertical="baseline" type="verb">POST</badge> [customer-addresses/delete](#post-customer-addresses-delete) | x
<badge vertical="baseline" type="verb">POST</badge> [customer-addresses/get-addresses](#post-customer-addresses-get-addresses) | x
<badge vertical="baseline" type="verb">POST</badge> [customer-orders/get-orders](#post-customer-orders-get-orders) | x
<badge vertical="baseline" type="verb">POST</badge> [downloads/pdf](#post-downloads-pdf) | x
<badge vertical="baseline" type="verb">POST</badge> [payment-sources/add](#post-payment-sources-add) | x
<badge vertical="baseline" type="verb">POST</badge> [payment-sources/delete](#post-payment-sources-delete) | x
<badge vertical="baseline" type="verb">POST</badge> [payments/pay](#post-payments-pay) | x
<badge vertical="baseline" type="verb">POST</badge> [payments/complete-payment](#post-payments-complete-payment) | x

::: tip
To invoke a controller action, send a `POST` request to Craft, with an `action` param set to the desired action path, either in the request body or query string.
:::

## `cart/get-cart`

JSON only

## <badge vertical="baseline" type="verb">POST</badge> `cart/update-cart`

### Supported Params

The following params can be sent with the request:

Param | Description
----- | -----------
`fields` |
`purchasableId` |
`note` |
`options` |
`qty` |
`purchasables` |
`purchasables.{$key}.id` |
`purchasables.{$key}.note` |
`purchasables.{$key}.options` |
`purchasables.{$key}.qty` |
`lineItems` |
`lineItems.{$key}.qty` |
`lineItems.{$key}.note` |
`lineItems.{$key}.options` |
`lineItems.{$key}.remove` |
`email` |
`registerUserOnOrderComplete` |
`paymentCurrency` |
`couponCode` |
`gatewayId` |
`paymentSourceId` |
`shippingMethodHandle` |

## <badge vertical="baseline" type="verb">GET</badge> <badge vertical="baseline" type="verb">POST</badge> `cart/load-cart`

Param | Description
----- | -----------
`number` | Required cart number to be loaded.
`redirect` | The hashed URL the browser should redirect to. (Automatically set to `loadCartRedirectUrl` if a GET request that doesn’t expect JSON.)

## <badge vertical="baseline" type="verb">POST</badge> `customer-addresses/save`

Param | Description
----- | -----------
`address.id` | Required address ID to be edited, which must be editable by the current customer.
`address.{$attr}` | 
`makePrimaryBillingAddress` | 
`makePrimaryShippingAddress` | 
`fields` | 

## <badge vertical="baseline" type="verb">POST</badge> `customer-addresses/delete`

Param | Description
----- | -----------
`id` |

## `customer-addresses/get-addresses`

JSON only

## `customer-orders/get-orders`

JSON only

## `downloads/pdf`

Param | Description
----- | -----------
`number` | Required order number.
`pdfHandle` |
`option` |

## <badge vertical="baseline" type="verb">POST</badge> `payment-sources/add`

Param | Description
----- | -----------
`gatewayId` |
`description` |
`*` |

## <badge vertical="baseline" type="verb">POST</badge>  `payment-sources/delete`

Param | Description
----- | -----------
`id` |
`redirect` | The hashed URL the browser should redirect to.

## <badge vertical="baseline" type="verb">POST</badge> `payments/pay`

Param | Description
----- | -----------
`orderNumber` |
`email` |
`registerUserOnOrderComplete` |
`paymentCurrency` |
`gatewayId` |
`paymentSourceId` |
`savePaymentSource` |
`redirect` |
`cancelUrl` |
`*` |

## `payments/complete-payment`

Param | Description
----- | -----------
`commerceTransactionHash` |
