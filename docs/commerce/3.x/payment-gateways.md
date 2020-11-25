# Payment Gateways

Craft Commerce payments gateways are provided by Craft CMS plugins.

To create a payment gateway you must install the appropriate plugin and navigate to **Commerce** → **Settings** → **Gateways** and configure the appropriate gateway. For more detailed instructions, see each plugin’s `README.md` file.

Payment gateways generally fit in one of two categories:

- External or _offsite_ gateways.
- Merchant-hosted or _onsite_ gateways.

Merchant-hosted gateways collect the customer’s credit card details directly on your site, but have much stricter requirements such as an SSL certificate for your server. You will also be subject to much more rigorous security requirements under the PCI DSS (Payment Card Industry Data Security Standard). These security requirements are your responsibility, but some gateways allow payment card tokenization.

## First-Party Gateway Plugins

| Plugin                                                                                      | Gateways                                | Remarks                                                            | 3D Secure Support   |
| ------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------ | ------------------- |
| [`craftcms/commerce-stripe`](https://github.com/craftcms/commerce-stripe)                   | Stripe                                  | Uses Stripe SDK; only first-party gateway to support subscriptions | Yes                 |
| [`craftcms/commerce-paypal`](https://github.com/craftcms/commerce-paypal)                   | PayPal Pro; PayPal REST; PayPal Express | PayPal REST supports storing payment information                   | Only PayPal Express |
| [`craftcms/commerce-paypal-checkout`](https://github.com/craftcms/commerce-paypal-checkout) |                                         |                                                                    |                     |
| [`craftcms/commerce-sagepay`](https://github.com/craftcms/commerce-sagepay)                 | SagePay Direct; SagePay Server          | SagePay Direct requires setting up webhooks                        | Yes                 |
| [`craftcms/commerce-multisafepay`](https://github.com/craftcms/commerce-multisafepay)       | MultiSafePay REST                       | Does not support authorize charges                                 | Yes                 |
| [`craftcms/commerce-worldpay`](https://github.com/craftcms/commerce-worldpay)               | Worldpay JSON                           | -                                                                  | No                  |
| [`craftcms/commerce-eway`](https://github.com/craftcms/commerce-eway)                       | eWAY Rapid                              | Supports storing payment information                               | Yes                 |
| [`craftcms/commerce-mollie`](https://github.com/craftcms/commerce-mollie)                   | Mollie                                  | Does not support authorize charges                                 | Yes                 |

## Dummy Gateway

After installation, Craft Commerce will install some demo products and a basic config along with a Dummy payment gateway for testing.

This dummy gateway driver is only for testing with placeholder credit card numbers. A valid card number ending in an even digit will get a successful response. If the last digit is an odd number, the driver will return a generic failure response:

`4242424242424242` <span class="text-green"> ✓ Success</span>\
`4444333322221111` <span class="text-red"> ✗ Failure</span>

## Manual Gateway

The manual payment gateway is a special gateway that does not communicate with any third party.

You should use the manual payment gateway to accept checks or bank deposits: it simply authorizes all payments allowing the order to proceed. Once the payment is received, the payment can be manually marked as captured in the control panel.

## Other gateway specifics

Before using a plugin-provided gateway, consult the plugin’s readme for specifics pertaining to the gateway.

## Adding additional gateways

Additional payment gateways can be added to Commerce with relatively little work. The [first-party gateway plugins](#first-party-gateway-plugins), with the exception of Stripe, use the [Omnipay payment library](https://github.com/craftcms/commerce-omnipay) and can be used as point of reference when creating your own.

See the _Extending Commerce_ section’s [Payment Gateway Types](extend/payment-gateway-types.md) page to learn about building your own gateway plugin or module.

## Storing config outside of the database

If you do not wish to store your payment gateway config information in the database (which could include secret API keys), you can override the values of a payment method’s setting via the `commerce-gateways.php` config file. Use the payment gateway’s handle as the key to the config for that payment method.

::: tip
The gateway must be set up in the control panel in order to reference its handle in the config file.
:::

```php
return [
  'myStripeGateway' => [
    'apiKey' => getenv('STRIPE_API_KEY'),
  ],
];
```

## Payment sources

Craft Commerce supports storing payment sources for select gateways. Storing a payment source allows for a more streamlined shopping experience for your customers.

The following [first-party provided gateways](#first-party-gateway-plugins) support payment sources:

- Stripe
- PayPal REST
- eWAY Rapid

## 3D Secure payments

3D Secure payments add another authentication step for payments. If a payment has been completed using 3D Secure authentication, the liability for fraudulent charges is shifted from the merchant to the card issuer.
Support for this feature depends on the gateway used and its settings.

## Partial refunds

All [first-party provided gateways](#first-party-gateway-plugins) support partial refunds as of Commerce 2.0.

