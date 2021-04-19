# Payment Currencies

Many customers feel more confident buying from a store that allows them to purchase items in the same currency as their credit card or bank account.

Craft Commerce allows you to accept payments in multiple currencies. All products are entered and stored in a primary store currency, and additional payment currencies can then be configured with conversion ratios used to pay for an order. This makes it possible to see the final payment amount in the desired currency at checkout, rather than an amount discovered later on a credit card statement.

To set up payment currencies for your store, navigate to **Commerce** → **Store Settings** → **Payment Currencies** in the control panel.

::: warning
You can only change your primary currency before orders have been completed. Changing the primary currency will delete any existing carts.
:::

## Example

If you selected US Dollars (USD) as your store’s primary currency, you would enter all products, sales, discounts and orders in that currency.

Then you could add Australian Dollars (AUD) as an additional accepted payment currency, with a conversion ratio of `1.3`.

If a customer chooses to pay with AUD, an order that would have been $10.00 USD becomes $13.00 AUD.

::: tip
Craft Commerce does not keep your store’s exchange rates updated automatically. A plugin could be written to update the currency at your preferred interval.
:::

## Order Currency Fields

A cart (order) has the following currency-related fields:

### `order.currency`

This is the primary store currency that all values for price, line items, adjustments, discounts etc. are all stored and returned in.

### `order.paymentCurrency`

If your store has only one currency, this will always be set to the primary store currency. If your store supports multiple payment currencies, this [can be changed by the user](#switching-currencies).

## Transactions Currency Fields

When a customer makes a payment on the order, transactions are applied against the order. Transactions have the following fields relating to payment and currencies:

### `transaction.currency`

This is the primary store currency and the currency the transaction’s `amount` is stored in.

### `transaction.paymentCurrency`

This is the currency in which the `paymentAmount` is stored. It’s also the currency that was used when communicating with the payment gateway when the customer was making payment.

### `transaction.paymentRate`

This is a snapshot of the payment currency’s conversion at the time of payment, stored in case the conversion rate changed after the payment was made.

## Switching currencies

The customer’s payment currency may be defined by a valid 3-digit ISO code for a payment currency you’ve set up. You can supply this code in several ways:

1. Using the `COMMERCE_PAYMENT_CURRENCY` PHP constant in order to lock the cart’s payment currency to the provided code. You would most likely set this constant in your `index.php` file in a location similar to your `CRAFT_LOCALE` constant.

2. Sending the currency code in a `paymentCurrency` POST parameter when using the `commerce/cart/update-cart` form action. This will have no affect if you’ve set the `COMMERCE_PAYMENT_CURRENCY` constant.

3. Sending the currency code in a `paymentCurrency` POST parameter when using the `commerce/payments/pay` form action. This will also have no affect if you’ve set the `COMMERCE_PAYMENT_CURRENCY` constant.

## Conversion and currency formatting

While you can use the `|commerceCurrency` filter as a drop-in replacement for [Craft’s `|currency` filter](https://craftcms.com/docs/3.x/dev/filters.html#currency), it offers additional control over formatting and conversion:

- A `convert` parameter used to convert the base price into the supplied+valid payment currency.
- A `format` parameter that can disable formatting and return the raw currency value as a float.
- A `stripZeros` parameter which can be used to return a formatted value without trailing zeros (`.00`).

Examples:

```twig
{# `USD` #}
{% set baseCurrency = cart.currency %}

{# `AUD`, exchange rate 1.3 #}
{% set paymentCurrency = cart.paymentCurrency %}

{{ 10|commerceCurrency(baseCurrency) }} {# Output: $10.00 #}

{{ order.outstandingBalance|commerceCurrency(
    paymentCurrency,
    convert=true
) }} {# Output: A$13.00 #}

{{ order.outstandingBalance|commerceCurrency(
    paymentCurrency,
    convert=true,
    format=false
) }} {# Output: 13 #}

{{ order.outstandingBalance|commerceCurrency(
    paymentCurrency,
    convert=true,
    format=true
) }} {# Output: A$13.00 #}

{{ order.outstandingBalance|commerceCurrency(
    paymentCurrency,
    convert=true,
    format=true,
    stripZeros=true
) }} {# Output: A$13 #}
```

For more details about the filter and its parameters, see the [Twig filter documentation](twig-filters.md#commercecurrency).
