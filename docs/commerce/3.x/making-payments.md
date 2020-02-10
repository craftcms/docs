# Making Payments

Once you’ve set up the store and payment gateways, you can start accepting payments.

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
