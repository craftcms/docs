# Working with Line Items

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
        <input type="number" name="lineItems[{{ item.id }}][qty]" min="1" value="{{ item.qty }}"">
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
