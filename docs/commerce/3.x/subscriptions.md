# Subscriptions

Subscriptions are handled by gateways. A payment gateway must handle subscription plan support in order to establish a Commerce subscription for a user.

Because not all gateways support subscriptions via API, Commerce does not allow creating new subscription plans on the gateway. Support for this must be added by a plugin.

Once you’ve added a payment gateway that supports subscriptions, you can then navigate to Commerce → Settings → Subscription Plans to set up subscription plans.

## Subscription support across gateways

Currently, only the [Commerce Stripe gateway](https://plugins.craftcms.com/commerce-stripe) supports subscriptions. If you need subscriptions for another gateway that supports them, a plugin first must be created that implements that gateway.

## Subscription statuses

Commerce has the following subscription statuses:

- `active` if a subscription is within a paid billing cycle, even if it’s set to cancel at the end of the current billing cycle.
- `canceled` if a subscription is outside of a paid billing cycle and was canceled by the user.
- `expired` if a subscription is outside of a paid billing cycle and was marked as such by the gateway, either because it exhausted a fixed number of billing cycles or a payment failed.
- `trial` if a subscription is within the set amount of trial days from the beginning of the subscription.

In case more than one subscription status could be applied, the order of precedence is `expired`, `canceled`, `trial` and `active`.

## Subscribing

You create a subscription by subscribing a user to a subscription plan. As you are subscribing a user, it is possible to pass parameters for the subscription. All subscription gateways must support a `trialDays` parameter at minimum.

## Changing a subscription’s plan

Depending on the gateway, it might be possible to switch subscription plans. Please consult the gateway plugin’s documentation to see if it supports changing a subscription plan.

## Canceling a subscription

Depending on the gateway, canceling subscriptions supports different options. Please consult the gateway plugin’s documentation to see if it supports canceling a subscription.

## Deleting subscriptions or plans

### Gateways

Not all gateways permit deleting subscription plans. Some gateways allow it and preserve all existing subscriptions, while others do not. Regardless of individual gateway support, we recommended **against** deleting a subscription plan on the gateway because it might result in the loss of historical data.

### Commerce

Commerce will attempt to delete all local subscription plans when a gateway is deleted. If any subscription—even an expired one—exists for a given plan, deletion will be prevented. Likewise, Commerce will prevent deleting a user that has active or expired subscriptions.
