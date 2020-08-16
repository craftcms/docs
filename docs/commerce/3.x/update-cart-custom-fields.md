# Update Cart Custom Fields

Carts ([Orders](orders.md)) are [Element Types](https://craftcms.com/docs/3.x/extend/element-types.html) and can have custom fields associated with them.

Custom fields can be useful for storing further information about an order that falls outside [line item options or notes](adding-to-and-updating-the-cart.md#line-item-options-and-notes).

You are able to update the custom fields on a cart by posting data to the `update-cart` action.

```twig
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}

    <input type="text" name="fields[myFieldHandle]" value="">    

    <input type="submit" value="Update cart">
</form>
```
