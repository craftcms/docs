# Update Cart Customer

::: warning
Customers are _always_ User elements in Commerce 4 and this page isn’t up to date yet!
:::

A cart always has an associated customer. That customer is a Craft [User](/4.x/users.md) element, and can represent an inactive guest or a credentialed user.

If a customer creates an account, their user element graduates from inactive to credentialed and they’re able to manage [addresses](addresses.md) and any other profile information you choose to make available on the front end.

## Updating the email address on an order

A guest customer’s email address can be updated along with the [update-cart](./dev/controller-actions.md#post-cart-update-cart) action:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ hiddenInput('action', 'commerce/cart/update-cart') }}
  {{ redirectInput('shop/cart') }}

  <input type="text"
    name="email"
    class="{% if cart.getFirstError('email') %}has-error{% endif %}"
    value="{{ cart.email }}"
    placeholder="{{ "your@email.com"|t }}"
  />

  <button>Update Cart Email</button>
</form>
```

If a customer is a credentialed user, they cannot update the order email address—the order always carries the user’s email address.

::: warning
If a customer is authenticated, any attempt to change their order’s email address will be ignored; the order will be linked directly to the customer and their current email address.
:::

## Checking if a guest customer has a user account

When guiding users through the checkout, it’s a good idea to collect the email address early. This checks the cart to see if they already have a user account on your site:

```twig
{% if craft.users.email(cart.email).one() %}
  You are already a user, please log in.
{% endif %}
```

Once a user logs in, the cart’s customer will switch to be the registered user’s customer record. If the cart was empty before login and the user had a previous cart with items, that previous cart will be restored.

## Registering a guest customer as a user

If the customer is a guest and they do not have an account, you can present them with a standard [Craft CMS user registration
form](https://craftcms.com/knowledge-base/front-end-user-accounts#registration-form) during checkout.

If you would like to allow the customer to register on checkout, you can update the order and flag it to register the user on
order completion. This can again be done with the same `commerce/cart/update-cart` form action:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ hiddenInput('action', 'commerce/cart/update-cart') }}
  {{ redirectInput('shop/cart') }}

  <label for="registerUserOnOrderComplete">
    <input type="checkbox"
      id="registerUserOnOrderComplete"
      name="registerUserOnOrderComplete"
      value="1"
    /> Register me for a user account
  </label>
  <button>Update Cart</button>
<form>
```

Alternatively, as seen in the [example templates](example-templates.md), you can set this flag on the `commerce/payments/pay` form action:

```twig
{{ hiddenInput('action', commerce/payments/pay') }}
{# ... payment form ... #}
<label for="registerUserOnOrderComplete">
  <input type="checkbox"
    id="registerUserOnOrderComplete"
    name="registerUserOnOrderComplete"
    value="1"
  /> Register me for a user account
</label>
```

With the `registerUserOnOrderComplete` flag set to `true` on the order, Commerce does the following when order is marked as complete:

1. Checks whether a user already exists. If so, nothing else happens and the steps below are skipped.
2. Creates a user with the same email address as the order.
3. Sets the customer record to relate to that new user. This means all addresses in the guest customer’s address book will belong to the new user.
4. Sends an account activation email prompting the user to set a password.
