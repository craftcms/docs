# Update Cart Custom Fields

Carts ([Orders](orders-carts.md)) are [Element Types](https://craftcms.com/docs/3.x/extend/element-types.html) and can have custom fields associated with them.

Custom fields can be useful for storing further information about an order that falls outside [line item options or notes](orders-carts.md#line-item-options-and-notes).

You are able to update the custom fields on a cart by posting data to the `update-cart` action.

```twig
<form method="post">
  {{ csrfInput() }}
  {{ hiddenInput('action', 'commerce/cart/update-cart') }}
  {{ redirectInput('shop/cart') }}

  <input type="text" name="fields[myFieldHandle]" value="">

  <button type="submit">Update Cart</button>
</form>
```
