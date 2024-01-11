---
containsGeneratedContent: yes
---

# Subscription Queries

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

Once you’ve created a subscription query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/3.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Subscription](commerce2:craft\commerce\elements\Subscription) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/3.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

## Example

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

## Parameters

Subscription queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/commerce/2.x/subscription-queries.md)!!!
