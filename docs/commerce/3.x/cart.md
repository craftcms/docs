# Cart

A cart is an [order](orders.md) that has not yet been completed. A customer can edit the contents of a cart,
but once the cart becomes an order it is no longer editable by the customer.

You can view all carts on the Orders index page. You can further limit your view to _active_ carts, which have been updated in the last 24 hours, and _inactive_ carts, which are carts older than 24 hours likely to be abandoned.

You can set the system to purge (delete) abandoned carts after a given time period in [your config](configuration.md),
where the default is three months.

In your templates, you can get the current user’s cart with [craft.commerce.carts.cart](craft-commerce-carts-cart.md).

```twig
{% set cart = craft.commerce.carts.cart %}
```

You could also fetch the cart via AJAX. This jQuery example could be added to a Twig template, and outputs the cart data to the browser’s development console:

```twig
<script>
$.ajax({
    url: '',
    data: {
        '{{ craft.config.csrfTokenName|e('js') }}': '{{ craft.request.csrfToken|e('js') }}',
        'action': 'commerce/cart/get-cart'
    },
    success: function(data) {
        console.log(data);
    },
    dataType: 'json'
});
</script>
```

Either of the examples above will generate a new cart in the session if none exists. While it’s unlikely you would make this assignment more than once per page request, getting the cart more than once does not affect performance.

To see what cart information you can use in your templates, take a look at the <api:craft\commerce\elements\Order> class reference.
