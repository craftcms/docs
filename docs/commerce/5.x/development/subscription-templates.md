# Subscription Templates

Once you’ve familiarized yourself with how [subscriptions](../system/subscriptions.md) work (and set up at least one plan), you’re ready to scaffold the customer’s subscription workflow.

::: tip
The [example templates](example-templates.md) contain a complete implementation of the following features.
If at any time you are unsure how to integrate these snippets, consider searching the example templates for the corresponding `actionInput()` value!
:::

These examples provide a functional baseline for subscription creation, but do not include any styles or overall customer experience recommendations.
You may integrate them into your front-end in whatever way you see fit, so long as the markup (or [scripts](/5.x/development/forms.md#ajax)) ultimately POST the same data to Commerce.

## Subscribing

To start a subscription, a logged-in user submits a POST request to the `commerce/subscriptions/subscribe` action with a [hashed](/5.x/reference/twig/filters.md#hash) plan UID.

This example creates a form for each available plan:

```twig
{% set plans = craft.commerce.plans.getAllEnabledPlans() %}

{% for plan in plans %}
  <form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/subscriptions/subscribe') }}
    {{ hiddenInput('planUid', plan.uid|hash) }}
    {{ redirectInput('my-account/membership') }}

    <h4>{{ plan.name }}</h4>

    <button>{{ 'Subscribe'|t }}</button>
  </form>
{% endfor %}
```

### Saved Payment Sources

Subscribing a user to a plan requires the user to have a [stored payment source](saving-payment-sources.md).
Each gateway may behave differently, based on the platform’s design.
[Stripe](plugin:commerce-stripe), for example, always uses the customer’s default [saved payment source](saving-payment-sources.md).

::: warning
Creating payment sources at the same time as a subscription is deprecated and will not be supported in future versions of Commerce.
We strongly recommend [creating a saved payment source in advance](saving-payment-sources.md#save-only), as it provides greater compatibility with modern payment methods and authentication.
:::

If you wish to set subscription parameters (like the number of trial days), we recommended making use of [subscription events](../extend/events.md#beforecreatesubscription) instead of POST data from users.

## Listing Subscriptions

A customer’s subscriptions can be displayed using a [subscription query](../system/subscriptions.md#querying-subscriptions).
This is typically a privileged action, so your template should include `{% requireLogin %}`:

```twig
{% requireLogin %}

{% set mySubscriptions = craft.subscriptions()
  .user(currentUser)
  .all() %}

<ul>
  {% for subscription in mySubscriptions %}
    <li>
      <h3>{{ subscription.plan.name }}</h3>
      <dl>
        <dt>Status</dt>
        <dd>{{ subscription.status }}</dd>

        <dt>Started</dt>
        <dd>{{ subscription.dateCreated|date('short') }}</dd>
      </dl>
    </li>
  {% endfor %}
</ul>
```

Without specifying a `.status()`, Commerce will show _all_ the user’s subscriptions—active or not.

### Management Pages

Subscriptions don’t have their own URLs, and they aren’t explicitly connected to a template like [sections](/5.x/reference/element-types/entries.md#sections) are.
However, you can set up dedicated management pages for each subscription with the same strategy described in our [entry form](kb:entry-form#editing-existing-entries) article:

::: code
```php{6} Listing
<ul>
  {% for subscription in mySubscriptions %}
    <li>
      <h3>{{ subscription.plan.name }}</h3>
      {{ tag('a', {
        href: siteUrl("my-account/subscriptions/#{subscription.uid}"),
        text: 'Manage',
      }) }}
    </li>
  {% endfor %}
</ul>
```
```php routes.php
return [
    'my-account/subscriptions/<subscriptionUid:{uid}>' => ['template' => '_account/subscriptions/edit'],
];
```
```twig{6} Template
{# templates/_account/subscriptions/edit.twig #}
{% requireLogin %}

{% set subscription = craft.subscriptions()
  .user(currentUser)
  .uid(subscriptionUid)
  .one() %}

{% if not subscription %}
  {% exit 404 %}
{% endif %}

{# Info + actions go here! #}
```
:::

### Actions

Customers can perform these actions on their own existing subscriptions, individually.

#### Canceling a Subscription

Use the following form to cancel an active subscription.
It assumes you have access to a `subscription` variable, set to a `craft\commerce\elements\Subscription` element.
The form should post to the `commerce/subscriptions/cancel` action:

```twig{3,4,6-8}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/subscriptions/cancel') }}
  {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}

  {% namespace subscription.getGateway().handle|commercePaymentFormNamespace %}
    {{ subscription.plan.getGateway().getCancelSubscriptionFormHtml(subscription)|raw }}
  {% endnamespace %}

  <button>Unsubscribe</button>
</form>
```

::: tip
If a gateway supports additional cancellation parameters, we strongly recommended modifying them via [subscription events](../extend/events.md#beforecancelsubscription) instead of untrusted POST data.
:::

#### Reactivating a canceled subscription

A canceled subscription can be reactivated, prior to expiring.
The following template assumes you have access to a `subscription` variable, set to a `craft\commerce\elements\Subscription` element.

```twig{10,11}
{% if subscription.isCanceled %}
  <p>This subscription was canceled on {{ subscription.dateCanceled|date('short') }}.</p>
{% endif %}

{% if subscription.canReactivate() %}
  <p>You may reactivate your subscription until {{ subscription.nextPaymentDate|date('short') }}.</p>

  <form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/subscriptions/reactivate') }}
    {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}

    <button class="button link">Reactivate</button>
  </form>
{% endif %}
```

::: warning
Not all canceled subscriptions can be reactivated—check if the subscription and gateway allow it by calling `subscription.canReactivate()`.
:::

#### Switching the subscription plan

Switching from one plan to another is possible when Commerce determines there are `alternativePlans` available.
This template assumes you have access to a `subscription` variable set to an instance of `craft\commerce\elements\Subscription`.

::: warning
There are some vital business decisions to make when switching plans, and those decisions can depend on the differences between the current and new plans.
Stripe, for example, provides options for handling proration and billing cycles.
Generally, you should _not_ allow customers to select these options themselves.

You have a few options:
- Omit the gateway’s `getSwitchPlansHtml()` (and accept the defaults);
- Manually `hash` the desired values according to your needs;
- Modify them via [subscription events](../extend/events.md#beforeswitchsubscriptionplan);
:::

```twig
<h1>Switch Plans</h1>

{% for plan in subscription.alternativePlans %}
  <form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/subscriptions/switch') }}

    {# The current subscription’s UID: #}
    {{ hiddenInput('subscriptionUid', subscription.uid|hash) }}

    {# The new plan’s UID: #}
    {{ hiddenInput('planUid', plan.uid|hash) }}

    {# Output gateway-specific options (see cautionary note above): #}
    {{ plan.getGateway().getSwitchPlansFormHtml(subscription.plan, plan)|raw }}

    <button type="submit">Switch to {{ plan.name }}</button>
  </form>
{% endfor %}
```

Plans compatible with the current one are available via `subscription.alternativePlans`.
If the list of compatible plans is empty, the customer will have to [cancel](#canceling-a-subscription) and re-subscribe to a different plan.

## Invoices

Commerce exposes each <commerce5:craft\commerce\models\SubscriptionPayment> created in the course of a subscription as `subscription.getAllPayments()`.

::: tip
The top-level properties are consistent across gateways (including whether it is `paid`, the `paymentAmount`, `paymentCurrency`, and `paymentDate`, and a `paymentReference`), but everything within the `response` property comes directly from the gateway’s API.
:::

```twig
<h2>Payments</h2>

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {% for invoice in subscription.getAllPayments() %}
      <tr>
        <td>{{ invoice.paymentDate|date('short') }}</td>
        <td>{{ invoice.paymentAmount|commerceCurrency(invoice.paymentCurrency) }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
```

This data is equivalent to what Commerce displays in the **Payment history** table on each subscription’s edit screen in the control panel.
The JSON object displayed in the “info” popover is the exact content of `invoice.response`.
