# Twig Filters

## `commerceCurrency`

This can be used as a drop-in replacement for [Craft’s `|currency` filter](https://craftcms.com/docs/3.x/dev/filters.html#currency), but it offers additional parameters for control over formatting and conversion:

| Parameter    | Type   | Default | Required | Description                                                                                                                                      |
| ------------ | ------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currency`   | string |         | yes      | Valid, three-character ISO payment currency set up in **Commerce** → **Store Settings** → **Payment Currencies**.                                            |
| `convert`    | bool   | `false` | no       | Should the amount passed to this filter be converted to `currency`’s exchange rate?                                                              |
| `format`     | bool   | `true`  | no       | Should the amount passed to this filter be formatted according to `currency`? (Typically adds currency symbol and thousands+decimal separators.) |
| `stripZeros` | bool   | `false` | no       | Should trailing zeros (`.00`) be stripped from a formatted number?                                                                               |

### Examples:

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

You might want to show the order’s price in all available payment currencies:

```twig
{% for currency in craft.commerce.paymentCurrencies %}
    Total in {{ currency.iso|upper }}: {{ cart.outstandingBalance|commerceCurrency(
        currency,
        convert=true
    ) }}<br>
{% endfor %}
```
