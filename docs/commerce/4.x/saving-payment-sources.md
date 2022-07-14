# Saving Payment Sources

::: warning
Payment sources can only be saved when the selected [payment gateway](payment-gateways.md) supports it.
:::

There are two ways to store the payment information for supported gateways:

### 1. Pay and Save

You can pay for the order and have the card stored for future payments by adding a `savePaymentSource` parameter to any form with a value of `true`.

```twig
{% if cart.gateway.supportsPaymentSources() %}
<div class="checkbox">
  <label>
    <input type="checkbox" name="savePaymentSource" value="1" />
    {{ "Save card for future purchases"|t }}
  </label>
</div>
{% endif %}
```

### 2. Save Only

If you’d prefer to _only_ save the payment information for future use, you can submit any regular gateway payment form to `commerce/payment-sources/add` instead of `commerce/payments/pay`.
