# Loading a Cart

There are two methods available for loading a cart—active or inactive—into the current customer’s session: [using a form](#using-a-form-to-load-a-cart) or [via a URL](#using-a-url-to-load-a-cart).

In both methods, any errors that may occur will be returned in the session error flash data.

::: tip
If the cart being loaded belongs to a user, the user must be logged in to load it into their session.
:::

## Using a form to load a cart

Loading a cart using a form requires passing a cart `number` to the `commerce/cart/load-cart` action.

A working example can be seen in the [example templates](https://github.com/craftcms/commerce/tree/master/example-templates/shop/cart/load.twig). Below is a simplified version of that form.

```twig
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/load-cart" />
    {{ redirectInput('/shop/cart') }}

    <input type="text" name="number" value="">
    <input type="submit" value="Submit">
</form>
```

## Using a URL to load a cart

This method uses the Commerce load cart action endpoint. There are a couple of way this URL can be retrieved. Commerce provides a setting ([Commerce::\$loadCartRedirectUrl](configuration.md#loadcartredirecturl)) that allows you to specify the URL a customer will be redirected to after the cart has been loaded.

### Using Twig

```twig
{% set loadCartUrl = actionUrl('commerce/cart/load-cart', { number: cart.number }) %}
```

### Using PHP

```php
use craft\helpers\UrlHelper;
// ...
$loadCartUrl = UrlHelper('commerce/cart/load-cart', ['number' => $cart->number]);
```

::: tip
This method can be useful in an email, allowing customers to retrieve an abandoned cart.
:::
