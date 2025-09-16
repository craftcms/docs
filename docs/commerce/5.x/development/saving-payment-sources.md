---
sidebarDepth: 2
---

# Saving Payment Sources

::: warning
Payment sources can only be saved for [payment gateways](../system/gateways.md) that support them.
:::

There are two ways for customers to create reusable payment sources:

1. Save the payment method used [while checking out](#pay-and-save);
1. [Explicitly create](#save-only) a saved payment source;

Only logged-in customers can use the second option.
Guests can save payment sources during checkout, but will only be able to reuse them once their account is activated.

## Workflows

### Pay and Save

You can pay for an order and have the card stored for future payments by sending a _truthy_ value under the `savePaymentSource` parameter to any `commerce/carts/update-cart` or `commerce/payments/pay` form:

```twig
{% if cart.gateway.supportsPaymentSources() %}
  <label>
    <input type="checkbox" name="savePaymentSource" value="Yes, please!" />
    {{ "Save card for future purchases"|t }}
  </label>
{% endif %}
```

This example assumes that the customer has selected a gateway in a previous step; if you know that all your available gateways support saved payment sources, you can offer the option unconditionally.

### Save Only

If you’d prefer to _only_ save the payment information for future use, you can submit any regular gateway payment form to `commerce/payment-sources/add` instead of `commerce/payments/pay`:

```twig
{% set gateway = craft.commerce.gateways.getGatewayByHandle('myGateway') %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/payment-sources/add') }}

  {# The gateway ID is required, so Craft knows how to handle the rest of the fields: #}
  {{ hiddenInput('gatewayId', gateway.id) }}

  {# As with other requests, you can send the customer somewhere after the payment method is created... #}
  {{ redirectInput('my-account/wallet') }}

  {# ...or when there is a problem: #}
  {{ hiddenInput('cancelUrl', 'my-account/wallet'|hash) }}

  {# Use a custom confirmation message: #}
  {{ hiddenInput('successMessage', 'Added payment source!'|hash) }}

  {# Output the gateway’s payment form: #}
  {{ gateway.getPaymentFormHtml({})|raw }}
</form>
```

Each gateway will have different requirements for saved payment methods, and some will use an offsite redirect to handle additional verification (i.e. 3D Secure).

## Listing Payment Sources

You can display a customer’s saved payment sources after loading them via the Commerce API:

```twig
{% set myPaymentSources = craft.commerce.paymentSources.getAllPaymentSourcesByCustomerId(currentUser.id) %}

{% if myPaymentSources is empty %}
  <p>You don’t have any saved payment sources.</p>
  <a href="{{ url('my-account/wallet/add') }}">Add one</a>
{% else %}
  <ul>
    {% for paymentSource in myPaymentSources %}
      <li>
        {{ paymentSource.description }}

        {# ... #}
      </li>
    {% endfor %}
  </ul>
{% endif %}
```

For each payment source, the information and [actions](#actions) you provide will depend on the gateway.
You can access the gateway model via `paymentSource.gateway`.
Commerce memoizes the latest information about the payment source (from the gateway’s API) as `paymentSource.response`.

### Actions

These actions can be included any time you’re working with a <commerce5:craft\commerce\models\PaymentSource> object in your templates.
In the example above, they would use the `paymentSource` variable inside the loop.

::: tip
Saved payment methods can be more than credit cards!
Make sure your messaging is appropriate based on the configured gateways and the types of payment methods it supports.
:::

#### Delete a Payment Source

```twig
{{ paymentSource.description }}

<form method="post">
  {{ csrfInput() }}
  {{ redirectInput('my-account/wallet') }}

  {{ actionInput('commerce/payment-sources/delete') }}
  {{ hiddenInput('id', paymentSource.id) }}

  <button type="submit">Delete payment method</button>
</form>
```

#### Select or Switch Primary Payment Source

Within the context of a single payment source, you can make it the customer’s primary using a form like this:

```twig{7,8}
{{ paymentSource.description }}

<form method="post">
  {{ csrfInput() }}
  {{ redirectInput('my-account/wallet') }}

  {{ actionInput('commerce/payment-sources/set-primary-payment-source') }}
  {{ hiddenInput('id', paymentSource.id) }}

  <button type="submit">Use this as my default payment method</button>
</form>
```

You can also have the customer select from a list:

```twig{7,12}
{% set myPaymentSources = craft.commerce.paymentSources.getAllPaymentSourcesByCustomerId(currentUser.id) %}

<form method="post">
  {{ csrfInput() }}
  {{ redirectInput('my-account/wallet') }}

  {{ actionInput('commerce/payment-sources/set-primary-payment-source') }}

  <select name="id">
    {% for paymentSource in myPaymentSources %}
      {% tag 'option' with {
        value: paymentSource.id,
        selected: paymentSource.id == currentUser.primaryPaymentSourceId,
      } %}
        {{ paymentSource.description }} ({{ paymentSource.gateway.name }})
      {% endtag %}
    {% endfor %}
  </select>

  <button type="submit">Set default payment method</button>
</form>
```

### Selecting at Checkout

Customers can select from their saved payment sources any time they update or pay for an order, or start a [subscription](../system/subscriptions.md).

::: warning
Stripe currently does not honor saved payment sources, and will always use the customer’s default payment method. Commerce synchronizes this when [selecting a primary payment source](#select-or-switch-primary-payment-source).
:::

```twig
{% set myPaymentSources = craft.commerce.paymentSources.getAllPaymentSourcesByCustomerId(currentUser.id) %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/carts/update-cart') }}
  
  <select name="paymentSourceId">
    {% for paymentSource in myPaymentSources %}
      {% tag 'option' with {
        value: paymentSource.id,
        selected: paymentSource.id == cart.paymentSourceId,
      } %}
        {{ paymentSource.description }} ({{ paymentSource.gateway.name }})
      {% endtag %}
    {% endfor %}
  </select>
</form>
```

Note that we are using different logic to determine whether an option is `selected`: the cart’s `paymentSourceId` replaces the customer’s `primaryPaymentSourceId`.

::: tip
Commerce automatically sets a customer’s primary payment source on new carts when the store’s **Auto Set Payment Source** [setting](../system/stores.md#settings) is enabled.
:::
