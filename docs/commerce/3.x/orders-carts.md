---
sidebarDepth: 2
---

# Orders & Carts

Variants are added to a _cart_ that can be completed to become an _order_. Carts and orders are both listed in the control panel under Commerce → Orders.

## Carts

As a customer or store manager is building a cart, the goal is to maintain an up-to-date list of items with their relevant costs, discounts, and promotions. For this reason, the cart will be recalculated each time a change is made.

Once a cart is completed, however, it becomes an [order](#orders) that represents choices explicitly finalized by whoever completed the cart. When the cart becomes an order, the customer will no longer be able to make edits.

Carts and orders are both listed on the Orders index page in the control panel, where you can further limit your view to _active_ carts updated in the last 24 hours, and _inactive_ carts older than 24 hours and likely to be abandoned. (You can customize that time limit using the [`activeCartDuration`](config-settings.md#activeCartDuration) setting.)

Craft will automatically to purge (delete) abandoned carts after 90 days, and you can customize this behavior with the [`purgeInactiveCarts`](config-settings.md#purgeInactiveCarts) and [`purgeInactiveCartsDuration`](config-settings.md#purgeInactiveCartsDuration) settings.

### Fetching a Cart

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

To see what cart information you can use in your templates, take a look at the [Order](commerce3:craft\commerce\elements\Order) class reference. You can also see sample Twig in the example templates’ [`shop/cart/index.twig`](https://github.com/craftcms/commerce/blob/develop/example-templates/shop/cart/index.twig).

### Adding Items to a Cart

You can add a purchasable like a [variant](variant.md) to a cart by submitting its `purchasableId` to the `commerce/cart/update-cart` action.

This gets a product and creates a form that will add its default variant to the cart:

```twig
{% set product = craft.products().one() %}
{% set variant = product.defaultVariant %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    <input type="hidden" name="purchasableId" value="{{ variant.id }}">
    <input type="submit" value="Add to cart">
</form>
```

If the product has multiple variants, you could provide a dropdown menu to allow the customer to choose one of them:

```twig{9-13}
{% set product = craft.products().one() %}

<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    {{ redirectInput('shop/cart') }}
    <input type="hidden" name="cartUpdatedNotice" value="Added {{ product.title }} to the cart.">
    <input type="hidden" name="qty" value="1">
    <select name="purchasableId">
        {% for variant in product.variants %}
            <option value="{{ variant.id }}">{{ variant.sku }}</option>
        {% endfor %}
    </select>
    <input type="submit" value="Add to cart">
</form>
```

We’re adding three things here as well:

1. The `cartUpdatedNotice` parameter can be used to customize the default “Cart updated.” flash message.
2. The `qty` parameter can be used to specify a quantity, which defaults to `1` if not supplied.
3. Craft’s [`redirectInput`](/3.x/dev/functions.md#redirectinput) tag can be used to take the user to a specific URL after the cart is updated successfully. **If any part of the `commerce/cart/update-cart` action fails, the user will not be redirected.**

You can add multiple purchasables to the cart in a single request by using a `purchasables` array instead of a single `purchasableId`. This form adds all a product’s variants to the cart at once:

```twig{7-10}
{% set product = craft.products().one() %}
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/update-cart') }}
    {{ redirectInput('shop/cart') }}
    <input type="hidden" name="cartUpdatedNotice" value="Products added to the cart.">
    {% for variant in product.variants %}
        <input type="hidden" name="purchasables[{{ loop.index }}][id]" value="{{ variant.id }}">
        <input type="hidden" name="purchasables[{{ loop.index }}][qty]" value="1">
    {% endfor %}
    <input type="submit" value="Add all variants to cart">
</form>
```

A unique index key is required to group the purchasable `id` with its `qty`, and in this example we’re using `{{ loop.index }}` as a convenient way to provide it.

::: warning
Commerce Lite is limited to a single line in the cart.\
If a customer adds a new item, it replaces whatever was already in the cart.\
If multiple items are added in a request, only the last one gets added to the cart.
:::

### Working with Line Items

Whenever a purchasable is added to a cart, the purchasable becomes a [line item](#purchasables-and-line-items) in that cart. In the examples above we set the line item’s quantity with the `qty` parameter, but we also have `note` and `options` to work with.

#### Line Item Options and Notes

---

While using multi-add, the same rules apply whether you’re updating a quantity or adding to cart: the uniqueness of the line item is based on the `optionsSignature` attribute, which is a hash that line item’s `options`.

---

#### Options Uniqueness

TODO: finish (see adding-to-and-updating-cart)

#### Updating Line Items

### Loading a Cart

An existing cart can be loaded by its cart number into the current customer’s session. This can be accomplished in two ways using the `commerce/cart/load-cart` endpoint: via [form submission](#using-a-form) or [navigating to a URL](#using-a-url).

Each method will store any errors in the session’s error flash data (`craft.app.session.getFlash('error')`), and the cart being loaded can be active or inactive.

::: tip
If the desired cart belongs to a user, that user must be logged in to load it into their session.
:::

The [`loadCartRedirectUrl`](config-settings.md#loadCartRedirectUrl) setting determines where the customer will be sent by default after the cart’s loaded.

#### Loading a Cart with a Form

Send a get or post action request with a `number` parameter referencing the cart you’d like to load. When posting the form data, you can include a specific redirect location like you can with any other Craft post data.

This is a simplified version of [`shop/cart/load.twig`](https://github.com/craftcms/commerce/tree/master/example-templates/shop/cart/load.twig) in the example templates, where a `cart` variable has already been set to the cart that should be loaded:

```twig
<form method="post">
    {{ csrfInput() }}
    {{ actionInput('commerce/cart/load-cart') }}
    {{ redirectInput('/shop/cart') }}

    <input type="text" name="number" value="{{ cart.number }}">
    <input type="submit" value="Submit">
</form>
```

#### Loading a Cart with a URL

You can also load a cart simply navigating to the `commerce/cart/load-cart` endpoint, as long as the `number` parameter is included in the URL.

This example sets `loadCartUrl` to an absolute URL the customer can access to load their cart. Again we’re assuming a `cart` object already exists for the cart that should be loaded:

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

::: tip
This URL can be presented to the user however you’d like. It’s particularly useful in an email that allows the customer to retrieve an abandoned cart.
:::

#### Restoring a Previous Cart’s Contents

## Orders

Orders are [Element Types](/3.x/extend/element-types.md) and can have custom fields associated with them. You can browse orders in the control panel by navigating to Commerce → Orders.

When a cart becomes an order, the following things happen:

1. The `dateOrdered` order attribute is set to the current date.
2. The `isCompleted` order attribute is set to `true`.
3. The default [order status](custom-order-statuses.md) is set on the order and any emails for this status are sent.
4. The order reference number is generated for the order, based on the “Order Reference Number Format” setting. (In the control panel: Commerce → Settings → System Settings → General Settings.)

Instead of being recalculated on each change like a cart, the order will only be recalculated if you [manually trigger recalculation](#recalculating-orders).

If you’d like to jump straight to displaying order information in your templates, take a look at the the <commerce3:craft\commerce\elements\Order> class reference for a complete list of available properties.

### Order Numbers

There are three ways to identify an order: by order number, short order number, and order reference number.

#### Order Number

The order number is a hash generated when the cart is first created in the user’s session. It exists even before the cart is saved in the database, and remains the same for the entire life of the order.

This is different from the order reference number, which is only generated after the cart has been completed and becomes an order.

We recommend using the order number when referencing the order in URLs or anytime the order is retrieved publicly.

#### Short Order Number

The short order number is the first seven characters of the order number. This is short enough to still be unique, and is a little friendlier to customers, although not as friendly as the order reference number.

#### Order Reference Number

The order reference number is generated on cart completion according to the “Order Reference Number Format” in Commerce → Settings → System Settings → General Settings.

This number is usually best used as the customer-facing identifier of the order, but shouldn’t be used in URLs.

```twig
{{ object.reference }}
```

The “Order Reference Number Format” is a mini Twig template that’s rendered when the order is completed. It can use order attributes along with Twig filters and functions. For example:

```twig
{{ object.dateCompleted|date('Y') }}-{{ id }}
```

Output:

```
2018-43
```

In this example, `{{ id }}` refers to the order’s element ID, which is not sequential. If you would rather generate a unique sequential number, a simple way would be to use Craft’s [seq()](https://craftcms.com/docs/3.x/dev/functions.html#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

The `seq()` function takes the following parameters:

1. A key name. If this name is changed, a new sequence starting at one is started.
2. An optional padding character length. For example if the next sequence number is `14` and the padding length is `8`, the generation number will be `00000014`

For example:

```twig
{{ object.dateCompleted|date('Y') }}-{{ seq(object.dateCompleted|date('Y'), 8) }}
```

Ouput:

```
2018-00000023
```

In this example we’ve used the year as the sequence name so we automatically get a new sequence, starting at `1`, when the next year arrives.

## Creating Orders

An order is usually created on the front end as a customer [adds items](adding-to-and-updating-the-cart.md) to and completes a [cart](cart.md). With Commerce Pro, An order may also be created in the control panel.

To create a new order, navigate to Commerce → Orders, and choose “New Order”. This will create a new order that behaves like a cart. As [purchasables](purchasables.md) are added and removed from the order, it will automatically recalculate its sales and adjustments.

::: warning
You must be using [Commerce Pro](editions.md) and have “Edit Orders” permission to create orders from the control panel.
:::

To complete the order, choose “Mark as completed”.

## Editing Orders

Orders can be edited in the control panel by visiting the order edit page and choosing “Edit”. You’ll enter edit mode where you can change values within the order.

While editing the order, it will refresh subtotals and totals and display any errors. It will _not_ automatically recalculate the order based on system rules like shipping, taxes, or promotions. Choose “Recalculate order” to have it fully recalculate including those system rules.

Once you’re happy with your changes, choose “Update Order” to save it to the database.

## Recalculating Orders

Let’s take a closer look at how carts and orders can be recalculated.

A cart or order must always be in one of three calculation modes:

- **Recalculate All** is active for a cart, or an order which is not yet completed.\
This mode refreshes each line item’s details from the related purchasable and re-applies all adjustments to the cart. In other words, it rebuilds and recalculates cart details based on information from purchasables and how Commerce is configured. This mode merges duplicate line items and removes any that are out of stock or whose purchasables were deleted.
- **Adjustments Only** doesn’t touch line items, but re-applies adjustments on the cart or order. This can only be set programmatically and is not available from the control panel.
- **None** doesn’t change anything at all, and is active for an order (completed cart) so only manual edits or admin-initiated recalculation can modify order details.

Cart/order subtotals and totals are computed values that always reflect the sum of line items. A few examples are `totalPrice`, `itemTotal`, and `itemSubtotal`.

You can manually recalculate an order by choosing “Recalculate order” at the bottom of the order edit screen:

![](./assets/recalculate-order.png)

This will set temporarily the order’s calculation mode to *Recalculate All* and trigger recalculation. You can then apply the resulting changes to the order by choosing “Update Order”, or discard them by choosing “Cancel”.

## Order Status Emails

If [status emails](order-status-emails.md) are set up for a newly-updated order status, messages will be sent when the updated order is saved.

You can manually re-send an order status email at any time. Navigate to an order’s edit page, then select the desired email from the Send Email menu at the top of the page.


