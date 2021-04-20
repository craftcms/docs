# Display Cart Items

At some point you’ll want to show a visitor their cart contents. There’s a more complex code sample in [the example templates](https://github.com/craftcms/commerce/tree/main/example-templates/build/shop/cart/index.twig), but the basics are to get the cart, see whether it has any items, then loop through them to display each one’s `salePrice` and the cart `subtotal`.


```twig
{% set cart = craft.commerce.carts.cart %}

<h1>Here’s what’s in your cart</h1>

{% if cart.lineItems|length == 0 %}
    <p>There aren’t any items in your cart.</p>
{% else %}
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {% for item in cart.lineItems %}
                <tr>
                    <td>{{ item.description }} <small>({{ item.sku }})</small></td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.salePriceAsCurrency }}</td>
                </tr>
            {% endfor %}
            <tr>
                <td colspan="3">
                    Cart Total: {{ cart.totalPriceAsCurrency }}
                </td>
            </tr>
        </tbody>
    </table>
{% endif %}

```

::: tip
You’ll most likely want to use `salePrice` so that the item’s price reflects any sales or promotions that should be applied. `price` refers to the value that was entered in the control panel.
:::
