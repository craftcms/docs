# Payment Gateways

Craft Commerce payments gateways are provided by Craft CMS plugins.

To create a payment gateway you must install the appropriate plugin, navigate to **Commerce** → **Settings** → **Gateways**, and add configuration for that gateway. For more detailed instructions, see each plugin’s `README.md` file.

Payment gateways generally fit in one of two categories:

- External or _offsite_ gateways.
- Merchant-hosted or _onsite_ gateways.

Merchant-hosted gateways collect the customer’s credit card details directly on your site, but have much stricter requirements such as an SSL certificate for your server. You will also be subject to much more rigorous security requirements under the PCI DSS (Payment Card Industry Data Security Standard). These security requirements are your responsibility, but some gateways allow payment card tokenization.

## First-Party Gateway Plugins

| Plugin                                                                   | Gateways                                | Remarks                                                            | 3D Secure Support   |
| ------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------ | ------------------- |
| [Stripe](https://plugins.craftcms.com/commerce-stripe)                   | Stripe                                  | Uses Stripe SDK; only first-party gateway to support subscriptions | Yes                 |
| [PayPal Checkout](https://plugins.craftcms.com/commerce-paypal-checkout) | PayPal Checkout                         |                                                                    | Yes                 |
| [Sage Pay](https://plugins.craftcms.com/commerce-sagepay)                | SagePay Direct; SagePay Server          |                                                                    | Yes                 |
| [MultiSafepay](https://plugins.craftcms.com/commerce-multisafepay)       | MultiSafePay REST                       | Does not support authorize charges                                 | Yes                 |
| [Worldpay](https://plugins.craftcms.com/commerce-worldpay)               | Worldpay JSON                           |                                                                    | No                  |
| [eWay](https://plugins.craftcms.com/commerce-eway)                       | eWAY Rapid                              | Supports storing payment information                               | Yes                 |
| [Mollie](https://plugins.craftcms.com/commerce-mollie)                   | Mollie                                  | Does not support authorize charges                                 | Yes                 |
| [PayPal](https://plugins.craftcms.com/commerce-paypal) _deprecated_      | PayPal Pro; PayPal REST; PayPal Express | PayPal REST supports storing payment information                   | Only PayPal Express |

## Dummy Gateway

After installation, Craft Commerce will install some demo products and a basic config along with a Dummy payment gateway for testing.

This dummy gateway driver is only for testing with placeholder credit card numbers. A valid card number ending in an even digit will get a successful response. If the last digit is an odd number, the driver will return a generic failure response:

Example Card Number | Dummy Gateway Response
------------------- | ----------------------
4242424242424242  | <span class="text-green"> <check-mark class="inline" /> Success</span>
4444333322221111  | <span class="text-red"> <x-mark class="inline" /> Failure</span>

## Manual Gateway

The manual payment gateway is a special gateway that does not communicate with any third party.

You should use the manual payment gateway to accept checks or bank deposits: it simply authorizes all payments allowing the order to proceed. Once the payment is received, the payment can be manually marked as captured in the control panel.

## Other Gateway Specifics

Before using a plugin-provided gateway, consult the plugin’s readme for specifics pertaining to the gateway.

## Adding Gateways

Additional payment gateways can be added to Commerce with relatively little work. The [first-party gateway plugins](#first-party-gateway-plugins), with the exception of Stripe, use the [Omnipay payment library](https://github.com/craftcms/commerce-omnipay) and can be used as point of reference when creating your own.

See the _Extending Commerce_ section’s [Payment Gateway Types](extend/payment-gateway-types.md) page to learn about building your own gateway plugin or module.

## Storing Config Outside of the Database

When you’re configuring gateways in the Craft control panel, we recommend using [environment variables](https://craftcms.com/docs/3.x/config/#environmental-configuration) so environment-specific settings and sensitive API keys don’t end up in the database or project config.

If you must override gateway settings, you can still do that using a standard config file for your gateway plugin (i.e. `config/commerce-stripe.php`)—but be aware that you’ll only be able to provide one set of settings for that gateway.

## Payment Sources

Craft Commerce supports storing payment sources for select gateways. Storing a payment source allows for a more streamlined shopping experience for your customers.

The following [first-party provided gateways](#first-party-gateway-plugins) support payment sources:

- Stripe
- PayPal REST
- eWAY Rapid

## 3D Secure Payments

3D Secure payments add another authentication step for payments. If a payment has been completed using 3D Secure authentication, the liability for fraudulent charges is shifted from the merchant to the card issuer.
Support for this feature depends on the gateway used and its settings.

## Partial Refunds

All [first-party provided gateways](#first-party-gateway-plugins) support partial refunds as of Commerce 2.0.

## Templating

### craft.commerce.gateways.getAllCustomerEnabledGateways

Returns all payment gateways available to the customer.

```twig
{% set gateways = craft.commerce.gateways.getAllCustomerEnabledGateways %}

{% if not gateways|length %}
<p>No payment methods available.</p>
{% endif %}

{% if gateways|length %}
<form method="post">
  {{ csrfInput() }}
  {{ hiddenInput('action', 'commerce/cart/update-cart') }}
  {{ hiddenInput('redirect', 'commerce/checkout/payment') }}

  <label for="gatewayId">Payment Method</label>
  <select name="gatewayId" id="gatewayId">
    {% for id,name in gateways %}
      <option value="{{ id }}"{% if id == cart.gatewayId %} selected{% endif %}>
        {{- name -}}
      </option>
    {% endfor %}
  </select>
</form>
{% endif %}
```
