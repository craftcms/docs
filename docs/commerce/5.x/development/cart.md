# Cart

Commerce represents a customer’s cart with the same object as a completed [order](../system/orders-carts.md), which means working with data before and after [checkout](checkout.md) is familiar.

::: tip
The snippets on this page are simplified versions of concepts illustrated in our [example templates](example-templates.md).
:::

## Accessing the Cart

A customer’s cart is always available via `craft.commerce.carts.cart`. The cart may exist only in-memory; until a customer interacts with it in some way (typically by adding an item—but also saving a custom field, setting their email, adding an address, etc.), Commerce does not bother saving carts to the database.

If you do want a cart to be persisted for _every_ visitor, you can force Commerce to save it by passing `true`:

```twig
{# Get a cart and ensure it's persisted: #}
{% set cart = craft.commerce.carts.cart %}

{{ cart.number }}
```

::: warning
This is generally not necessary, and can have significant performance impacts on high-traffic stores.
:::

## Displaying Cart Contents

A cart’s contents is tracked via _line items_. Line items are populated from [purchasables](../system/purchasables.md) (out-of-the-box, this will almost always be a product _variant_), and have a quantity, description, notes, a calculated subtotal, options, adjustments (like tax and shipping costs), and other metadata. Most importantly, the line item retains a reference to its purchasable—but even in the event a product or variant is altered or deleted after a customer checks out, enough information is memoized on each line item to reconstruct what was purchased, and how much was paid.


### Displaying Notices

Should a something about a cart change (like the price of a line item, its total, [shipping](../system/shipping.md) method eligibility, [coupon](../system/coupon-codes.md) validity, or the availability of a purchasable), Commerce will add a _notice_ to the cart with an explanation of what happened.

You can display notices to the customer by looping over `cart.notices`:

```twig
{% set notices = cart.notices %}

{% if notices %}
  <ul>
    {% for notice in notices %}
      <li class="notice notice--{{ notice.type }}">{{ notice.message }}</li>
    {% endfor %}
  </ul>
{% endfor %}
```

Each notice has `message` and `type` attributes.

### Clearing Notices

To clear notices, send a POST request to the `commerce/cart/update-cart` action with any value in the `clearNotices` param:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('clearNotices', 'Yes, please!') }}

  <button>Clear Notices</button>
</form>
```

Notices may be re-added to a cart any time its contents change, or prices are recalculated.

## Managing Cart Contents

Cart contents are typically updated via an HTML form, but Commerce also supports JSON payloads over Ajax, for headless storefronts.

### Adding Items

To add an item to the cart, send a `purchasableId` the `commerce/cart/update-cart` action:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  <select name="purchasableId">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}">{{ variant.sku }}</option>
    {% endfor %}
  </select>

  <button>Add Item</button>
</form>
```

### Setting Quantity

