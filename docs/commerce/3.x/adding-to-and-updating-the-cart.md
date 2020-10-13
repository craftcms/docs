# Add to Cart

To add something to the cart, submit the ID of a [purchasable](purchasables.md) element as a `purchasableId` param to the `commerce/cart/update-cart` action.

::: tip
Products are not purchasable on their own; all products have at least one default variant. See [Products](products.md) for more information.
:::

The following is an example of getting the first product found in your store, getting the product’s default variant, and using that variant’s ID in the form that will add that item to the cart:

```twig
{% set product = craft.products.one() %}
{% set variant = product.defaultVariant %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Added {{ product.title }} to the cart.">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}
    <input type="hidden" name="purchasableId" value="{{ variant.id }}">
    <input type="submit" value="Add to cart">
</form>
```

::: tip
The `qty` param is not required. It defaults to `1` if not supplied.
:::

If your product’s type has multiple variants you could loop over them and allow the customer to choose the variant from a dropdown menu:

```twig
{% set product = craft.products.one() %}

<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Added {{ product.title }} to the cart.">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}
    <input type="hidden" name="qty" value="1">
    <select name="purchasableId">
        {% for variant in product.variants %}
            <option value="{{ variant.id }}">{{ variant.sku }}</option>
        {% endfor %}
    </select>
    <input type="submit" value="Add to cart">
</form>
```

::: warning
In the Lite edition of Craft Commerce only single line item can exist in the cart. Whenever a customer adds something to the cart, it replaces whatever item was in the cart. If multiple items are added to the cart in a single request, only the last item gets added to the cart.
:::

::: warning
When using the `commerce/cart/update-cart` form action, the redirect is only followed if _all_ submitted updates succeed.
:::

## Line item options and notes

When submitting a product to the cart, you can optionally include a text note from the customer and arbitrary data.

Here is an example of an add to cart form with both a `note` and `options` param:

```twig
{% set product = craft.products.one() %}
{% set variant = product.defaultVariant %}
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Added {{ product.title }} to the cart.">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}
    <input type="hidden" name="qty" value="1">

    <input type="text" name="note" value="">

    <select name="options[engraving]">
        <option value="happy-birthday">Happy Birthday</option>
        <option value="good-riddance">Good Riddance</option>
    </select>

    <select name="options[giftwrap]">
        <option value="yes">Yes Please</option>
        <option value="no">No Thanks</option>
    </select>

    <input type="hidden" name="purchasableId" value="{{ variant.id }}">
    <input type="submit" value="Add to cart">
</form>
```

In the above example we:

- Allowed a customer to input a `note` with a text field.
- Allowed a customer to choose an option called `engraving` with 2 prepared values.
- Allowed a customer to choose an option called `giftwrap` with 2 prepared values.

::: warning
The options and notes param data is not validated, so a user could submit any data. Use front-end validation.
:::

Once the order is complete, the notes and options can be found on the View Order page:

<img src="./assets/lineitem-options-review.png" width="509" alt="Line Item Option Review.">

## Options uniqueness

The options data submitted to the line item are hashed into an `optionsSignature` for uniqueness. If you submit the same purchasable ID to the cart with different option data, two line items will be created.

Another way to think about it is that each line item is unique based on the combination of `purchasableId` and `optionsSignature`.

## Adding multiple purchasables to the cart

If you’d like to add multiple purchasables to the cart at once, you’ll need to supply the form data in a `purchasables` form array:

```twig
{% set product = craft.products.one() %}
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Products added to the cart.">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}

    {% for variant in product.variants %}
        <input type="hidden" name="purchasables[{{ loop.index }}][id]" value="{{ variant.id }}">
        <input type="hidden" name="purchasables[{{ loop.index }}][qty]" value="1">
    {% endfor %}

    <input type="submit" value="Add all variants to cart">
</form>
```

While using multi-add, the same rules apply whether you’re updating a quantity or adding to cart: the uniqueness of the line item is based on the `optionsSignature` attribute, which is a hash that line item’s `options`.

As shown in the example above, a unique index key is required to group the purchasable ID to its related `notes` and `options` and `qty` param. Using `{{ loop.index }}` is an easy way to do this.

## Updating line items

Once the purchasable has been added to the cart, your customer may want to update the `qty` or `note`, they can do this by updating a line item.

Line items can have their `qty`, `note`, and `options` updated or removed.

To update a line item, submit a `lineItems` form array, where each item’s array key is the line item ID.

In this example, each line item has its quantity and note exposed for the user to edit:

```twig{9,10}
<form method="post">
    <input type="hidden" name="action" value="commerce/cart/update-cart">
    <input type="hidden" name="cartUpdatedNotice" value="Updated line items.">
    {{ redirectInput('shop/cart') }}
    {{ csrfInput() }}

    {% for item in cart.lineItems %}
        <input type="number" name="lineItems[{{ item.id }}][qty]" min="1" value="{{ item.qty }}">
        <input type="text" name="lineItems[{{ item.id }}][note]" placeholder="My Note" value="{{ item.note }}">
    {% endfor %}

    <input type="submit" value="Update Line Item">
</form>
```

Here we’re allowing just one line item to be edited for simplicity. Normally you would loop over all line items and insert `{{ item.id }}` dynamically, allowing your customers to update multiple line items at once.

To remove a line item, send a `lineItems[{{ item.id }}][remove]` param in the request. You could do this by adding a checkbox to the form example like this:

```twig
<input type="checkbox" name="lineItems[{{ item.id }}][remove]" value="1"> Remove item<br>
```

::: tip
The [example templates](example-templates.md) include those above and more templates you might use adding and updating the cart within a full checkout flow.
:::

## Update cart success notice

Since the `commerce/cart/update-cart` form action can do so much, its success flash notice is a generic-sounding “Cart Updated”.

If you want to customize the success message, submit a `cartUpdatedNotice` param to the `commerce/cart/update-cart` form action.

Example custom message:

```twig
<input type="hidden" name="cartUpdatedNotice" value="Your cool cart was updated.">
```

Example displaying the added product title:

```twig
<input type="hidden" name="cartUpdatedNotice" value="Added {{ product.title }} to the cart.">
```

## Restoring previous cart contents

By default, the current cart begins empty and customers add things to it.

If the customer is a registered user they may expect to be able to log into another computer and continue shopping with their cart from a previous session. This will happen automatically if the customer logs in while their current cart is empty (has no line items).

If you want to allow a customer to see carts from previous logged-in sessions you can retrieve them like this:

```twig
{% if currentUser %}
    {% set currentCart = craft.commerce.carts.cart %}
    {% if cart.id %}
        {# return all incomplete carts *except* the one from this session #}
        {% set oldCarts = craft.orders.isCompleted(false).id('not '~cart.id).user(currentUser).all() %}
    {% else %}
        {% set oldCarts = craft.orders.isCompleted(false).user(currentUser).all() %}
    {% endif %}
{% endif %}
```

You could then loop over the line items in those older carts and allow the customer to add them to the current order.

::: tip
You’ll find an example of this in the [example templates](example-templates.md).
:::
