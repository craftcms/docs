# Subscription Templates

Once you’ve familiarized yourself with how [subscriptions](subscriptions.md) work and set up your subscription plans, you’re ready to write some subscription templates.

Each gateway provides a default template for subscription actions. If you’d prefer to handle templating yourself, you’ll have to reference the gateway plugin’s documentation to see what parameters are available.

These examples are intended to get you started toward working subscriptions and specify the correct endpoints for subscription actions.

## Subscribing

For starting a subscription, the following example is a good start.

::: warning
Gateways handle subscription payment sources differently, which might impact what’s needed for your template.
:::

This example creates a form for each available plan, posting the selection to the `commerce/subscriptions/subscribe` form action:

```twig
{% set plans = craft.commerce.getPlans().getAllPlans() %}

{% for plan in plans %}
    <form method="post">
        {{ csrfInput() }}
        {{ hiddenInput('action', 'commerce/subscriptions/subscribe') }}
        {{ hiddenInput('planUid', plan.uid|hash) }}

        <h4>{{ plan.name }}</h4>

        {% set paymentSources = craft.commerce.
            getPaymentSources().
            getAllGatewayPaymentSourcesByUserId(
                plan.getGateway().id,
                currentUser.id ?? null
            )
        %}

        {# If we don’t have a saved payment soruce, collect details for the gateway #}
        {% if not paymentSources|length %}
            <div class="paymentForm">
                {{ plan.getGateway().getPaymentFormHtml({})|raw }}
            </div>
        {% endif %}

        <button type="submit">{{ "Subscribe"|t }}</button>
    </form>
{% endfor %}
```

There are several things to note:

- Subscribing a user to a plan requires the user to have a stored payment source. If a user doesn’t have one, you can add it by displaying the payment form with `{{ plan.getGateway().getPaymentFormHtml({})|raw }}`.
- If you wish to set subscription parameters, such as amount of trial days, it is strongly recommended to make use of [subscription events](events.md#beforecreatesubscription) instead of POST data.
- When using Stripe, it’s not possible to choose which payment source to use if more than one is saved. Stripe will use the default payment source associated with that customer.

## Canceling the subscription

To cancel a subscription you can use the following template. It assumes the `subscription` variable is available and set to an instance of `craft\commerce\elements\Subscription`, and posts to the `commerce/subscriptions/cancel` form action:

```twig
<form method="post">
    {{ csrfInput() }}
    {{ hiddenInput('action', 'commerce/subscriptions/cancel') }}
    {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}
    {{ redirectInput('shop/services') }}

    {{ subscription.plan.getGateway().getCancelSubscriptionFormHtml()|raw }}

    <button type="submit">Unsubscribe</button>
</form>
```

If you wish to set cancellation parameters, it is strongly recommended to make use of [subscription events](events.md#beforecancelsubscription) instead of POST data.

## Switching the subscription plan

To switch a subscription plan you can use the following template. It assumes that `subscription` variable is available and set to an instance of `craft\commerce\elements\Subscription`, and posts to the `commerce/subscriptions/switch` form action:

```twig
{% for plan in subscription.alternativePlans %}
    <strong>Switch to {{ plan.name }}</strong>
    <form method="post">
        {{ csrfInput() }}
        {{ hiddenInput('action', 'commerce/subscriptions/switch') }}
        {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}
        {{ hiddenInput('planUid', plan.uid|hash) }}

        {{ plan.getGateway().getSwitchPlansFormHtml(subscription.plan, plan)|raw }}

        <button type="submit" class="button link">Switch</button>
    </form>
    <hr />
{% endfor %}
```

If you wish to set parameters for switching the subscription plan, it is strongly recommended to make use of [subscription events](events.md#beforeswitchsubscriptionplan) instead of POST data.

## Reactivating a canceled subscription

To reactivate a subscription plan you can use the following template. It assumes the `subscription` variable is available and set to an instance of `craft\commerce\elements\Subscription`, and posts to the `commerce/subscriptions/reactivate` form action.

```twig
{% if subscription.canReactivate() %}
    <form method="post">
        {{ csrfInput() }}
        {{ hiddenInput('action', 'commerce/subscriptions/reactivate') }}
        {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}

        <button type="submit" class="button link">Reactivate</button>
    </form>
{% endif %}
```

::: warning
Not all canceled subscriptions might be available for reactivation, so make sure to check for that using `subscription.canReactivate()`.
:::
