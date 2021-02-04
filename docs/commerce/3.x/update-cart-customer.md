# Update Cart Customer

A cart always has an associated customer. That customer can either be a guest with no user association, or a registered user—which is a customer associated with a Craft user.

When a user logs in, the current customer switches to the customer associated to the logged-in user.

The only information stored about a customer is their related address book records with primary shipping and billing address IDs. The email address of a guest customer is inferred from their cart’s email address.

A guest customer’s address book is useless without an account for authenticating and storing that information. If a guest registers on checkout, however, the address book will survive. This makes address management during checkout the same for guests and registered users.

## Updating the email address on an order

If a customer is a guest, their email address is updated along with the cart’s email. This can be done with the same `commerce/cart/update-cart` action used for updating anything else on the cart.

Example:

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
    >

    <button type="submit">Update Cart Email</button>
<form>
```

If a customer is a registered user, you cannot update the email address of the order; it’s always set to the user’s email address.

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

Once a user logs in, the cart’s customer will switch to be the registered user’s customer record. If the cart was empty before login and the user had a cart with items from a previous session, that previous cart will be restored.

## Registering a guest customer as a user

If the customer is a guest and they do not have an account, you can present them with a standard [Craft CMS user registration
form](https://craftcms.com/docs/3.x/dev/examples/user-registration-form.html) during checkout.

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
    <button type="submit">Update Cart</button>
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
