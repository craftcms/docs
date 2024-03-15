---
updatedVersion: commerce/5.x/development/making-payments.md
---

# Payment Form Models

The payment form model is a special model used to validate payment parameters and pass them on to a payment gateway in a way it expects.

When returning after a validation error, a `paymentForm` variable will be available to the template and set to an instance of [BasePaymentForm](commerce4:craft\commerce\models\payments\BasePaymentForm).

Each gateway can use its own payment form, however it must extend [BasePaymentForm](commerce4:craft\commerce\models\payments\BasePaymentForm). There are generic models available for use, specifically for gateways passing around credit card information, but you should refer to the documentation of the plugin providing the gateway to see whether it uses its own model.

Generally, you shouldn’t be concerned with the specific type of payment form model being used, as it’s provided by the gateway and doesn’t need to be configured.

## Model Attributes

The following payment form model attributes exist for gateways handling credit card information:

::: danger
**We highly discourage creating gateways that directly capture credit card information. Instead, the `token` attribute can be used to transport a one-time use identifier for a payment method that is [tokenized](#tokenization) by a client-side script.**
:::

| Attribute | Validation | Description |
| --- | --- | --- |
| `token` | not validated | If a token is present on the payment form, no validation of other fields is performed and the data is ignored. |
| `firstName` | required | The first name on the customer’s credit card. |
| `lastName` | required | The last name of the customer’s credit card. |
| `month` | required, min: `1`, max: `12` | Integer representing the month of credit card expiry. |
| `year` | required, min: current year, max: current year + 12 | Integer representing the year of credit card expiry. |
| `CVV` | minLength: 3, maxLength: 4 | Integer found on the back of the card for security. |
| `number` | [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) | The credit card number itself. |
| `threeDSecure` | not validated | A flag indicating whether 3D Secure authentication is being performed for the transaction. |

## Tokenization

Whenever possible, gateways should pre-validate credit card information using the processor’s client-side JavaScript library. The [Stripe](https://plugins.craftcms.com/commerce-stripe) plugin does exactly this—many other payment processors have equivalent tokenization systems that avoid sending sensitive information to your server.
