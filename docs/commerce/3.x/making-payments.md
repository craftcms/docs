# Making Payments

Once you’ve set up the store and payment gateways, you can start accepting payments.

## Paying during the checkout process

For this example, we’re assuming the payment gateway is set on the cart and the `cart` variable is available to the template. This will use `cart.gateway.getPaymentFormHtml()` to render the form fields required by the payment gateway:

```twig
{# @var cart craft\commerce\elements\Order #}
<form method="post">
    <input type="hidden" name="action" value="commerce/payments/pay"/>
    <input type="hidden" name="redirect" value="/commerce/customer/order?number={number}"/>
    <input type="hidden" name="cancelUrl" value="{{ '/commerce/checkout/payment'|hash }}"/>
    {{ csrfInput() }}

    {{ cart.gateway.getPaymentFormHtml({})|raw }}

    <button type="submit">Pay Now</button>
</form>
```

If you’d like to have more control over the form’s markup and styles, you can render them manually.

The example below assumes the availability of a `paymentForm` variable, as discussed in [Payment Form Models](payment-form-models.md), and might be what a simple credit card payment form would look like:

```twig
{% import "_includes/forms" as forms %}
<form method="post">
    <input type="hidden" name="action" value="commerce/payments/pay"/>
    <input type="hidden" name="redirect" value="/commerce/customer/order?number={number}"/>
    <input type="hidden" name="cancelUrl" value="{{ '/commerce/checkout/payment'|hash }}"/>
    {{ csrfInput() }}

    {# first and last name #}
    <fieldset>
        <legend>Card Holder</legend>

        {{ forms.text({
            name: 'firstName',
            maxlength: 70,
            placeholder: "First Name",
            autocomplete: false,
            class: 'card-holder-first-name'~(paymentForm.getErrors('firstName') ? ' error'),
            value: paymentForm.firstName,
            required: true,
        }) }}

        {{ forms.text({
            name: 'lastName',
            maxlength: 70,
            placeholder: "Last Name",
            autocomplete: false,
            class: 'card-holder-last-name'~(paymentForm.getErrors('lastName') ? ' error'),
            value: paymentForm.lastName,
            required: true,
        }) }}

        {% set errors = [] %}
        {% for attributeKey in ['firstName', 'lastName'] %}
            {% set errors = errors|merge(paymentForm.getErrors(attributeKey)) %}
        {% endfor %}

        {{ forms.errorList(errors) }}
    </fieldset>

    {# card number #}
    <fieldset>
        <legend>Card</legend>

        {{ forms.text({
            name: 'number',
            maxlength: 19,
            placeholder: "Card Number",
            autocomplete: false,
            class: 'card-number'~(paymentForm.getErrors('number') ? ' error'),
            value: paymentForm.number
        }) }}

        {{ forms.text({
            class: 'card-expiry'~(paymentForm.getErrors('month') or paymentForm.getErrors('year') ? ' error'),
            type: 'tel',
            name: 'expiry',
            placeholder: "MM / YYYY",
            value: paymentForm.expiry
        }) }}

        {{ forms.text({
            type: 'tel',
            name: 'cvv',
            placeholder: "CVV",
            class: 'card-cvc'~(paymentForm.getErrors('cvv') ? ' error'),
            value: paymentForm.cvv
        }) }}

        {% set errors = [] %}
        {% for attributeKey in ['number', 'month', 'year', 'cvv'] %}
            {% set errors = errors|merge(paymentForm.getErrors(attributeKey)) %}
        {% endfor %}

        {{ forms.errorList(errors) }}
    </fieldset>

    <button type="submit">Pay Now</button>
</form>
```

## Paying outstanding balance on a cart or completed order

It is possible to make a payment on cart or completed order that has an outstanding balance.

The [shop/checkout/pay-static.twig](https://github.com/craftcms/commerce/tree/master/example-templates/shop/checkout/pay-static.twig) template file in the [example templates](example-templates.md) gives a full example on how this is achievable in the front end.

Below is a simplified example of the fields required to make a payment using Twig. The following code makes the assumption that the gateway has already been set.

```twig
{% set number = '00000000000000099999999999999999' %}
{% set email = 'example@email-address.com' %}
{% set cart = craft.orders.number(number).one() ?? null %}
{% set cancelUrl = craft.app.request.getUrl()|hash %}

<form method="post">
    <input type="hidden" name="action" value="commerce/payments/pay"/>
    {{ redirectInput('/shop/customer/order?number='~cart.number~'&success=true') }}
    <input type="hidden" name="cancelUrl" value="{{ cancelUrl }}"/>
    <input type="hidden" name="email" value="{{ email }}"/>
    <input type="hidden" name="orderNumber" value="{{ cart.number }}">

    {{ cart.gateway.getPaymentFormHtml({})|raw }}

    <button type="submit">Submit</button>
</form>
```

If you would like to pay with a different gateway than the one that is already set on the cart/order, you can pass the `gatewayId` in the form.

```twig
{# ... #}
<input type="hidden" name="gatewayId" value="1">
{# ... #}
```

::: warning
During this process the cart or order is never in the user’s session. This means that they could be paying for a cart and also have a separate cart in their current session.
:::