# Loading a Cart

A cart can be loaded into the current customer’s session via [form submission](#using-a-form) or [navigating to a URL](#using-a-url).

Each method requires providing the desired cart number to the `commerce/cart/load-cart` endpoint, which will store any errors in the session’s error flash data (`craft.app.session.getFlash('error')`). The cart itself can be active or inactive.

::: tip
If the desired cart belongs to a user, that user must be logged in to load it into their session.
:::

The [Commerce::\$loadCartRedirectUrl](config-settings.md#loadcartredirecturl) config setting determines where the customer will be sent by default after the cart has been loaded.

## Using a Form

The example templates include [a working sample](https://github.com/craftcms/commerce/tree/master/example-templates/shop/cart/load.twig). This is a simplified version, where a `cart` variable has already been set to the cart that should be loaded:

```twig
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/load-cart" />
    {{ redirectInput('/shop/cart') }}

    <input type="text" name="number" value="{{ cart.number }}">
    <input type="submit" value="Submit">
</form>
```

The form can use a `get` or `post` method, and when posting data it can include its own redirect location just like any other form that Craft handles.

## Using a URL

This example assumes a `cart` object already exists for the cart that should be loaded, and prepares a `loadCartUrl` variable with the URL a customer can access to load their cart:

::: code

```twig
{% set loadCartUrl = actionUrl('commerce/cart/load-cart', { number: cart.number }) %}
```

```php
use craft\helpers\UrlHelper;

$loadCartUrl = UrlHelper::actionUrl(
    'commerce/cart/load-cart',
    ['number' => $cart->number]
);
```
:::

This URL can be presented to the user however you’d like. It’s particularly useful in an email that allows the customer to retrieve an abandoned cart.
