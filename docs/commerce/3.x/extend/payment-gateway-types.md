# Payment Gateway Types

You can add a [payment gateway](../payment-gateways.md) to Craft Commerce with a custom plugin or module that adds one or more Payment Gateway Types.

Similar to how a Craft Section may have one or more Entry Types, a payment gateway may provide as many Payment Gateway Types as it needs in order to support each way it can take payments.

## Overview

Every payment gateway is different, and writing a Payment Gateway Type requires understanding how that gateway works and how Craft Commerce can connect with it.

It might be easiest to start exploring the [dummy gateway](commerce3:craft\commerce\gateways\Dummy), which is meant for testing but implements most Craft Commerce gateway functionality including subscriptions.

Writing a Payment Gateway Type requires navigating three sets of needs:

1. The interface Craft Commerce expects.
2. The features and payment workflows supported by the gateway.
3. The needs of the site you’re working with for a private plugin or module, or the needs stores may generally require if you’re writing a plugin for public release.

If you’re not sure where to start planning your Payment Gateway Type, consider the checkout flow from the customer’s perspective beginning with the order page. From there, you can follow the steps a customer should take to complete an order and identify each required gateway interaction.

## Payment Gateway Class

You’ll need to write a gateway class that implements [GatewayInterface](commerce3:craft\commerce\base\GatewayInterface). Take a look at the class to quickly see the methods you’ll work with.

At a high level, a Craft Commerce gateway may use the following parts:

- Methods that return `true` or `false` to indicate gateway feature support.
- An HTML settings view for managing details like API keys from the Craft control panel.
- A model for collecting and validating payment form details that are sent to the gateway.
- Vital methods that faciliate payment: `purchase()`, `capture()`, `refund()`, etc.
- Front end responses and redirects that facilitate the customer journey.
- A publicly-available endpoint that can receive webhook events from the gateway.

::: tip
It may be easiest to extend the [Gateway](commerce3:craft\commerce\base\Gateway) or [SubscriptionGateway](commerce3:craft\commerce\base\SubscriptionGateway) classes in order to save time and minimize the amount of code you need to write.
:::

Let’s walk through the customer order process to highlight different gateway interactions.

### Checkout Page

Our imaginary customer adds items to a cart and chooses to check out.

They’ll provide required order information before any payment details.

At this stage the Craft developer—the person building the site that *uses* your gateway—may wish to present gateway options to the customer so they can choose how they’ll pay.

Your gateway class can use [`availableForUseWithOrder($order)`](commerce3:craft\commerce\base\GatewayInterface::availableForUseWithOrder()) to examine the order and return `true` if the gateway should be available as a payment option. Even if the store doesn’t expose customer-facing gateway selection, this method is called immediately before sending payment information to the gateway to make sure it _should_. This can be useful, for example, to prevent a $0.00 “charge” from being attempted when there’s no need for it.

```php
// only allow this gateway for orders in Australia
```

### Payment Page

The customer provided order information and needs to be prompted for payment information. (This doesn’t have to be presented on its own page, we’re just separating the step for illustration.)

The Craft developer has to provide a form for these payment details. Your gateway can save that developer time by implementing [`getPaymentFormHtml()`](commerce3:craft\commerce\base\Gateway::getPaymentFormHtml()) to return markup with fields required specifically by your gateway. This can be something that helps the developer get started more quickly or that they end up styling for production.

A PayPal buy button and Stripe credit card form are common examples of HTML that might be returned by `getPaymentFormHtml()`.

::: tip
Markup for the Craft control panel only needs to look great in the control panel.\
Markup for a store’s front end, however, should be as simple and flexible as possible since its appearance varies greatly depending on the project.
:::

### Submitting Payment

The customer fills out and submits the payment form, which posts to [`/commerce/payments/pay`](commerce3:craft\commerce\controllers\PaymentsController::actionPay()).

We already know our gateway will be used because it was either selected in an earlier step or referenced in the `gatewayId` form parameter.

Commerce validates the order, populates the gateway’s provided [`getPaymentFormModel()`](commerce3:craft\commerce\base\GatewayInterface::getPaymentFormModel()) with the request data, and validates that populated model.

The form data can be individual fields or a payment source, meaning a reference to a saved set of fields the customer established at some other point. A gateway supporting payment sources must return `true` for [`supportsPaymentSources()`](commerce3:craft\commerce\base\Gateway::supportsPaymentSources()), and it can then receive a `paymentSourceId` form parameter in place of separate payment fields. If a `paymentSourceId` is submitted that’s available to the customer, that payment source will be loaded and used to populate the payment form model.

::: tip
Payment sources must be established prior to checkout with the gateway’s [`createPaymentSource()`](commerce3:craft\commerce\base\GatewayInterface::createPaymentSource()) method. It’s best to allow the customer to add and delete payment sources by posting to [`/commerce/payment-sources/add`](commerce3:craft\commerce\controllers\PaymentSourcesController::actionAdd()) and [`/commerce/payment-sources/delete`](commerce3:craft\commerce\controllers\PaymentSourcesController::actionDelete()).
:::

The site’s front end should prompt the customer to correct any validation errors.

With the order and payment gateway details good to go, Commerce saves a new pending transaction for the order with the amount owing. This transaction is saved with a hash we’ll come back to later.

::: tip
As of Commerce 3.3, the payment amount can be a partial payment against the order. A gateway can return `false` for `supportsPartialPayments()` to disallow partial payments—which are otherwise allowed by default.
:::

Next, Commerce initiates the configured payment method.

### Initiating a Payment

If there weren’t any validation errors, our customer is still waiting immediately after submitting the payment form as we slow down time to explore what’s happening.

We’ve got valid order and payment information and Commerce will now use [Payments::processPayment()](commerce3:\craft\commerce\services\Payments::processPayment()) to call the gateway’s [`authorize()`](commerce3:craft\commerce\base\GatewayInterface::authorize()) or [`purchase()`](commerce3:craft\commerce\base\GatewayInterface::purchase()) method. Which one depends on two things:

1. What the gateway supports.
2. How the gateway is configured by the store manager.

Payment type support needs to be defined by the gateway’s [`supportsAuthorize()`](commerce3:craft\commerce\base\GatewayInterface::supportsAuthorize()) and [`supportsPurchase()`](commerce3:craft\commerce\base\GatewayInterface::supportsPurchase()) methods.

The gateway’s [`paymentType`](commerce3:craft\commerce\base\Gateway::$paymentType) setting, which can be available to the store manager in the control panel, is what determines which supported type should be used at checkout. (You can use [`getPaymentTypeOptions()`](commerce3:craft\commerce\base\Gateway::getPaymentTypeOptions()) to customize the key+value select menu items to be displayed in the control panel.)

In the authorize-capture flow, `authorize()` will be called and a store manager will need to explicitly capture payment in the control panel separately—which calls your gateway’s `capture()` method.

If the payment can be processed immediately, Commerce will call your gateway’s `purchase()` method.

Your gateway’s `authorize()`, `purchase()`, and `capture()` methods must each return a [`RequestResponseInterface`](commerce3:craft\commerce\base\RequestResponseInterface). This is a sort of Commerce-specific [Response](yii2:yii\web\Response) to a gateway action, meaning something relevant to a transaction that should be recorded. In addition to the status and data from the gateway, this response may also specify where the customer should end up next.

::: tip
If the submitted payment details accept a JSON response, the returned JSON will include failure reasons or `'success' => true` along with relevant cart, redirect, and transaction details.
:::

`RequestResponseInterface` is critical in determining the customer’s exact payment steps through to completion. Let’s see what those steps can look like.

#### Off-Site Payment

If `isRedirect` is `true` in that response, Commerce will send the customer to its `getRedirectUrl()` location using `getRedirectMethod()` and `getRedirectData()`.

Once redirected, Commerce expects the customer to be returned to [`/commerce/payments/complete-payment`](commerce3:craft\commerce\controllers\PaymentsController::actionCompletePayment()) with a `commerceTransactionHash` parameter. This hash must match the pending transaction that was saved before initiating the payment. Commerce calls [Payments::completePayment()](commerce3:craft\commerce\services\Payments::completePayment()) to ensure already-completed transactions are skipped and that either `completePurchase()` or `completeAuthorize()` is called.

Success or redirect responses will update the order as complete and send the customer to the order’s `returnUrl`.

Failure will send the customer to the order’s `cancelUrl`.

#### On-Site Payment

If the payment is successful and there isn’t a required redirect, Commerce will send the customer to the order’s `returnUrl` or a URL specified in the payment form data’s `redirect` parameter.

#### Asynchronous Payment Steps

If the gateway needs to utilize webhook interactions at any point in the process, it can return `true` for [`supportsWebhooks()`](commerce3:craft\commerce\base\GatewayInterface::supportsWebhooks()) and Commerce will call [`processWebhook()`](commerce3:craft\commerce\base\GatewayInterface::processWebhook()) when the gateway’s webhook receives a request.

::: tip
The store manager will automatically see a read-only **Webhook URL** under the **Name** and **Handle** fields after adding your Payment Gateway Type to the store. Its format will be `foo.test/index.php?actions/commerce/webhooks/process-webhook&gateway=2`, where `2` is the ID of the configured Payment Gateway Type.
:::

For example, the Stripe [Strong Customer Authentication](https://stripe.com/docs/strong-customer-authentication) (SCA) process uses webhooks to send the customer back to the order’s `returnUrl` but call `completePayment()` from a webhook instead of the `complete-payment` controller action mentioned above.

::: tip
Any time a gateway sends requests to Commerce, complete request data is available via `Craft::$app->getRequest()`. This can be useful for writing code that completes payments and responds to webhooks.
:::

## Subscription Gateway Class

Like the payment gateway class, the subscription gateway class describes the features it supports and involves a handful of important methods for carrying out common actions related to subscription payments.

A key difference is that subscriptions are ongoing, so the Commerce gateway will necessarily be reacting to webhooks after the initial subscription is established. The subscription is an element in the system and webhooks will ultimately keep it up to date.

The Commerce subscription gateway interface was built with the [Stripe gateway](https://github.com/craftcms/commerce-stripe) in mind, so familiarity with Stripe will help when you’re planning your own gateway implementation.

You’ll need to write a gateway class that extends [Gateway](commerce3:craft\commerce\base\Gateway) and implements [SubscriptionGatewayInterface](commerce3:craft\commerce\base\SubscriptionGatewayInterface). Looking at its methods will give you a quick idea of what your gateway implementation may need.

Mapping a specific gateway’s functionality to the Commerce gateway may be challenging since subscriptions are handled differently among payment gateways, but most interactions will be the result of either recurring charges or customer-driven actions. In the control panel, subscriptions may be edited and have their payment history refreshed.

## Registering a Payment Gateway Type

Register your custom gateway type using the [`registerGatewayTypes`](events.md#registergatewaytypes) event in your plugin or custom module’s `init()` method:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\commerce\services\Purchasables;
use yii\base\Event;

Event::on(
    Gateways::class,
    Gateways::EVENT_REGISTER_GATEWAY_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyGateway::class;
    }
);
```

## Exploring Further

To see example gateways in the wild, see the list of [first-party gateway plugins](../payment-gateways.md#first-party-gateway-plugins) on the Payment Gateways page and additional gateways on the [Craft Plugin Store](https://plugins.craftcms.com/search?q=gateway).
