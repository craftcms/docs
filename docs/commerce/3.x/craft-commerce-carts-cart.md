# craft.commerce.carts.cart

This template function returns the current user’s cart, which is an [Order object](commerce3:craft\commerce\elements\Order).

You would get cart for the current user like this:

```
{% set cart = craft.commerce.carts.cart %}
```

This is the same as:

```
{% set cart = craft.commerce.getCarts().getCart() %}
```

You can now show the current customer their cart, and add things to this cart with forms in your templates.

Once a cart’s completed and turned into an order, calling the function again will give
your user a new cart.
