# Subscriptions

Subscriptions are handled by gateways. A payment gateway must handle subscription plan support in order to establish a Commerce subscription for a user.

Because not all gateways support subscriptions via API, Commerce does not allow creating new subscription plans on the gateway. Support for this must be added by a plugin.

Once you’ve added a payment gateway that supports subscriptions, you can then navigate to **Commerce** → **Settings** → **Subscription Plans** to set up subscription plans.

## Subscription Support Across Gateways

Currently, only the [Commerce Stripe gateway](https://plugins.craftcms.com/commerce-stripe) supports subscriptions. If you need subscriptions for another gateway that supports them, a plugin first must be created that implements that gateway.

## Subscription Statuses

Commerce has the following subscription statuses:

- `active` if a subscription is within a paid billing cycle, even if it’s set to cancel at the end of the current billing cycle.
- `canceled` if a subscription is outside of a paid billing cycle and was canceled by the user.
- `expired` if a subscription is outside of a paid billing cycle and was marked as such by the gateway, either because it exhausted a fixed number of billing cycles or a payment failed.
- `trial` if a subscription is within the set amount of trial days from the beginning of the subscription.

In case more than one subscription status could be applied, the order of precedence is `expired`, `canceled`, `trial` and `active`.

## Subscribing

You create a subscription by subscribing a user to a subscription plan. As you are subscribing a user, it is possible to pass parameters for the subscription. All subscription gateways must support a `trialDays` parameter at minimum.

## Changing a Subscription’s Plan

Depending on the gateway, it might be possible to switch subscription plans. Please consult the gateway plugin’s documentation to see if it supports changing a subscription plan.

## Canceling a Subscription

Depending on the gateway, canceling subscriptions supports different options. Please consult the gateway plugin’s documentation to see if it supports canceling a subscription.

## Deleting Subscriptions or Plans

### Gateways

Not all gateways permit deleting subscription plans. Some gateways allow it and preserve all existing subscriptions, while others do not. Regardless of individual gateway support, we recommended **against** deleting a subscription plan on the gateway because it might result in the loss of historical data.

### Commerce

Commerce will attempt to delete all local subscription plans when a gateway is deleted. If any subscription—even an expired one—exists for a given plan, deletion will be prevented. Likewise, Commerce will prevent deleting a user that has active or expired subscriptions.

## Querying Subscriptions

You can fetch subscriptions in your templates or PHP code using **subscription queries**.

::: code
```twig
{# Create a new subscription query #}
{% set mySubscriptionQuery = craft.subscriptions() %}
```
```php
// Create a new subscription query
$mySubscriptionQuery = \craft\commerce\elements\Subscription::find();
```
:::

Once you’ve created a subscription query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/4.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Subscription](commerce3:craft\commerce\elements\Subscription) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/4.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

### Example

We can display all of the current user’s subscriptions by doing the following:

1. Create a subscription query with `craft.subscriptions()`.
2. Set the [user](#user) parameter on it.
3. Fetch the subscriptions with `.all()`.
4. Loop through the subscriptions using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to output their HTML.

```twig
{# Make sure someone is logged in #}
{% requireLogin %}

{# Create a subscription query with the 'user' parameter #}
{% set mySubscriptionQuery = craft.subscriptions()
  .user(currentUser) %}

{# Fetch the subscriptions #}
{% set subscriptions = mySubscriptionQuery.all() %}

{# Display the subscriptions #}
{% for subscription in subscriptions %}
  <article>
    <h1><a href="{{ subscription.url }}">{{ subscription.title }}</a></h1>
    {{ subscription.summary }}
    <a href="{{ subscription.url }}">Learn more</a>
  </article>
{% endfor %}
```

### Parameters

Subscription queries support the following parameters:

<!-- BEGIN PARAMS -->

<!-- END PARAMS -->
