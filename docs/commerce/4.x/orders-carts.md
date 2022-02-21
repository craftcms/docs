---
sidebarDepth: 2
---
# Orders & Carts

Variants are added to a _cart_ that can be completed to become an _order_. Carts and orders are both listed in the control panel under **Commerce** → **Orders**.

When we use the terms “cart” and “order”, we’re always referring to an [Order](commerce3:craft\commerce\elements\Order) element; a cart is simply an order that hasn’t been completed—meaning its `isCompleted` property is `false` and its `dateCompleted` is `null`.

## Carts

As a customer or store manager is building a cart, the goal is to maintain an up-to-date list of items with their relevant costs, discounts, and promotions. For this reason, the cart will be recalculated each time a change is made.

Once a cart is completed, however, it becomes an [order](#orders) that represents choices explicitly finalized by whoever completed the cart. The order’s behavior changes slightly at this point: the customer will no longer be able to make edits, and changes made by a store manager will not automatically trigger [recalculation](#recalculating-orders).

Carts and orders are both listed on the Orders index page in the control panel, where you can further limit your view to _active_ carts updated in the last hour, and _inactive_ carts older than an hour that are likely to be abandoned. (You can customize that time limit using the [`activeCartDuration`](config-settings.md#activeCartDuration) setting.)

Craft will automatically to purge (delete) abandoned carts after 90 days, and you can customize this behavior with the [`purgeInactiveCarts`](config-settings.md#purgeInactiveCarts) and [`purgeInactiveCartsDuration`](config-settings.md#purgeInactiveCartsDuration) settings.

On the front end, cart interactions happen via the `commerce/cart/update-cart` form action.

Here’s what we’ll cover in the sections that follow:

- [Fetching a Cart](#fetching-a-cart)
- [Adding Items to a Cart](#adding-items-to-a-cart)
- [Working with Line Items](#working-with-line-items)
- [Loading a Cart](#loading-a-cart)
- [Forgetting a Cart](#forgetting-a-cart)

More topics are covered in separate pages:

- [Addresses](addresses.md)
- [Updating Custom Fields in a Cart](update-cart-custom-fields.md)
- [cart.availableShippingMethodOptions](shipping.md#cart-availableshippingmethodoptions)

### Fetching a Cart

In your templates, you can get the current user’s cart like this:

```twig
{% set cart = craft.commerce.carts.cart %}

{# Same thing: #}
{% set cart = craft.commerce.getCarts().getCart() %}
```

You could also fetch the cart via AJAX. This example could be added to a Twig template, and outputs the cart data to the browser’s development console:

::: code
```twig jQuery
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
$.ajax({
  url: '',
  data: {
    '{{ craft.config.csrfTokenName|e('js') }}': '{{ craft.request.csrfToken|e('js') }}',
    'action': 'commerce/cart/get-cart'
  },
  success: function(response) {
    console.log(response);
  },
  dataType: 'json'
});
</script>
```
```twig Axios
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script>
axios.get('', {
  params: {
    '{{ craft.config.csrfTokenName|e('js') }}': '{{ craft.request.csrfToken|e('js') }}',
    action: 'commerce/cart/get-cart'
  }
}).then((response) => {
  console.log(response.data);
});
</script>
```
:::

Either of the examples above will generate a new cart in the session if none exists. While it’s unlikely you would make this assignment more than once per page request, getting the cart more than once does not affect performance.

To see what cart information you can use in your templates, take a look at the [Order](commerce3:craft\commerce\elements\Order) class reference. You can also see sample Twig in the example templates’ [`shop/cart/index.twig`](https://github.com/craftcms/commerce/blob/main/example-templates/dist/shop/cart/index.twig).

<toggle-tip title="Example Order">

<<< @/docs/commerce/4.x/example-objects/order.php

</toggle-tip>

Once a cart’s completed and turned into an order, calling `craft.commerce.carts.cart` again will return a new cart.

### Adding Items to a Cart

You can add purchasables (like [a variant](products-variants.md#variants)) to the cart by submitting post requests to the `commerce/cart/update-cart` action. Items can be added one at a time or in an array.

#### Adding a Single Item

You can add a single item to a cart by submitting its `purchasableId`.

This gets a product and creates a form that will add its default variant to the cart:

```twig
{% set product = craft.products().one() %}
{% set variant = product.defaultVariant %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('purchasableId', variant.id) }}
  <button type="submit">Add to Cart</button>
</form>
```

If the product has multiple variants, you could provide a dropdown menu to allow the customer to choose one of them:

```twig{10-14}
{% set product = craft.products().one() %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ redirectInput('shop/cart') }}
  {{ hiddenInput('successMessage', 'Added ' ~ product.title ~ ' to cart.'|hash) }}
  {{ hiddenInput('qty', 1) }}

  <select name="purchasableId">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}">{{ variant.sku }}</option>
    {% endfor %}
  </select>
  <button type="submit">Add to Cart</button>
</form>
```

We’re sneaking three new things in here as well:

1. The `successMessage` parameter can be used to customize the default “Cart updated.” flash message.
2. The `qty` parameter can be used to specify a quantity, which defaults to `1` if not supplied.
3. Craft’s [`redirectInput`](/4.x/dev/functions.md#redirectinput) tag can be used to take the user to a specific URL after the cart is updated successfully. **If any part of the cart update action fails, the user will not be redirected.**

#### Adding Multiple Items

You can add multiple purchasables to the cart in a single request using a `purchasables` array instead of a single `purchasableId`. This form adds all a product’s variants to the cart at once:

```twig{7-10}
{% set product = craft.products().one() %}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ redirectInput('shop/cart') }}
  {{ hiddenInput('successMessage', 'Products added to the cart.'|hash) }}
  {% for variant in product.variants %}
     {{ hiddenInput('purchasables[' ~ loop.index ~ '][id]', variant.id) }}
     {{ hiddenInput('purchasables[' ~ loop.index ~ '][qty]', 1) }}
  {% endfor %}
  <button type="submit">Add all variants to cart</button>
</form>
```

A unique index key is required to group the purchasable `id` with its `qty`, and in this example we’re using `{{ loop.index }}` as a convenient way to provide it.

::: tip
You can use the [`purchasableAvailable`](extend/events.md#purchasableavailable) event to control whether a line item should be available to the current user and cart.
:::

::: warning
Commerce Lite is limited to a single line in the cart.\
If a customer adds a new item, it replaces whatever was already in the cart.\
If multiple items are added in a request, only the last one gets added to the cart.
:::

### Working with Line Items

Whenever a purchasable is added to the cart, the purchasable becomes a [line item](#purchasables-and-line-items) in that cart. In the examples above we set the line item’s quantity with the `qty` parameter, but we also have `note` and `options` to work with.

#### Line Item Options and Notes

An `options` parameter can be submitted with arbitrary data to include with that item. A `note` parameter can include a message from the customer.

In this example, we’re providing the customer with an option to include a note, preset engraving message, and giftwrap option:

::: code
```twig Single Item
{% set product = craft.products().one() %}
{% set variant = product.defaultVariant %}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('qty', 1) }}
  <input type="text" name="note" value="">
  <select name="options[engraving]">
    <option value="happy-birthday">Happy Birthday</option>
    <option value="good-riddance">Good Riddance</option>
  </select>
  <select name="options[giftwrap]">
    <option value="yes">Yes Please</option>
    <option value="no">No Thanks</option>
  </select>
  {{ hiddenInput('purchasableId', variant.id) }}
  <button type="submit">Add to Cart</button>
</form>
```
```twig Multiple Items
{% set product = craft.products().one() %}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {% for variant in product.variants %}
    {{ hiddenInput('purchasables[' ~ loop.index ~ '][id]', variant.id) }}
    {{ hiddenInput('purchasables[' ~ loop.index ~ '][qty]', 1) }}
    <input type="text" name="purchasables[{{ loop.index }}][note]" value="">
    <select name="purchasables[{{ loop.index }}][options][engraving]">
      <option value="happy-birthday">Happy Birthday</option>
      <option value="good-riddance">Good Riddance</option>
    </select>
    <select name="purchasables[{{ loop.index }}][options][giftwrap]">
      <option value="yes">Yes Please</option>
      <option value="no">No Thanks</option>
    </select>
  {% endfor %}
  <button type="submit">Add to Cart</button>
</form>
```
:::

::: warning
Commerce does not validate the `options` and `note` parameters. If you’d like to limit user input, use front-end validation or use the [`Model::EVENT_DEFINE_RULES`](craft3:craft\base\Model::EVENT_DEFINE_RULES) event to add validation rules for the [`LineItem`](commerce3:craft\commerce\models\LineItem) model.
:::

The note and options will be visible on the order’s detail page in the control panel:

![Line Item Option Review](./assets/lineitem-options-review.png)

#### Updating Line Items

The `commerce/cart/update-cart` endpoint is for both adding *and updating* cart items.

You can directly modify any line item’s `qty`, `note`, and `options` using that line item’s ID in a `lineItems` array. Here we’re exposing each line item’s quantity and note for the customer to edit:

```twig{6,7}
{% set cart = craft.commerce.carts.cart %}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {% for item in cart.lineItems %}
    <input type="number" name="lineItems[{{ item.id }}][qty]" min="1" value="{{ item.qty }}">
    <input type="text" name="lineItems[{{ item.id }}][note]" placeholder="My Note" value="{{ item.note }}">
  {% endfor %}
  <button type="submit">Update Line Item</button>
</form>
```

You can remove a line item by including a `remove` parameter in the request. This example adds a checkbox the customer can use to remove the line item from the cart:

```twig{8}
{% set cart = craft.commerce.carts.cart %}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {% for item in cart.lineItems %}
    <input type="number" name="lineItems[{{ item.id }}][qty]" min="1" value="{{ item.qty }}">
    <input type="text" name="lineItems[{{ item.id }}][note]" placeholder="My Note" value="{{ item.note }}">
    <input type="checkbox" name="lineItems[{{ item.id }}][remove]" value="1"> Remove item<br>
  {% endfor %}
  <button type="submit">Update Line Item</button>
</form>
```

::: tip
The [example templates](example-templates.md) include a [detailed cart template](https://github.com/craftcms/commerce/blob/main/example-templates/dist/shop/cart/index.twig) for adding and updating items in a full checkout flow.
:::

#### Options Uniqueness

If a purchasable is posted that’s identical to one already in the cart, the relevant line item’s quantity will be incremented by the submitted `qty`.

If you posted a purchasable or tried to update a line item with different `options` values, however, a new line item will be created instead. This behavior is consistent whether you’re updating one item at a time or multiple items in a single request.

Each line item’s uniqueness is determined behind the scenes by an `optionsSignature` attribute, which is a hash of the line item’s options. You can think of each line item as being unique based on a combination of its `purchasableId` and `optionsSignature`.

::: tip
The `note` parameter is not part of a line item’s uniqueness; it will always be updated on a matching line item.
:::

#### Line Item Totals

Each line item includes several totals:

- **lineItem.subtotal** is the sum of the line item’s `qty` and `salePrice`.
- **lineItem.adjustmentsTotal** is the sum of each of the line item’s adjustment `amount` values.
- **lineItem.total** is the sum of the line item’s `subtotal` and `adjustmentsTotal`.

### Loading a Cart

Commerce provides a `commerce/cart/load-cart` endpoint for loading an existing cart into the current customer’s session.

You can have the user interact with the endpoint by either [navigating to a URL](#loading-a-cart-with-a-url) or by [submitting a form](#loading-a-cart-with-a-form). Either way, the cart number is required.

Each method will store any errors in the session’s error flash data (`craft.app.session.getFlash('error')`), and the cart being loaded can be active or inactive.

::: tip
If the desired cart belongs to a user, that user must be logged in to load it into their session.
:::

The [`loadCartRedirectUrl`](config-settings.md#loadCartRedirectUrl) setting determines where the customer will be sent by default after the cart’s loaded.

#### Loading a Cart with a URL

Have the customer navigate to the `commerce/cart/load-cart` endpoint, including the `number` parameter in the URL.

A quick way for a store manager to grab the URL is by navigating in the control panel to **Commerce** → **Orders**, selecting one item from **Active Carts** or **Inactive Carts**, and choosing **Share cart…** from the context menu:

![Share cart context menu option](./assets/share-cart.png)

You can also do this from an order edit page by choosing the gear icon and then **Share cart…**.

To do this programmatically, you’ll need to create an absolute URL for the endpoint and include a reference to the desired cart number.

This example sets `loadCartUrl` to an absolute URL the customer can access to load their cart. Again we’re assuming a `cart` object already exists for the cart that should be loaded:

::: code
```twig
{% set loadCartUrl = actionUrl(
  'commerce/cart/load-cart',
  { number: cart.number }
) %}
```

```php
$loadCartUrl = craft\helpers\UrlHelper::actionUrl(
    'commerce/cart/load-cart',
    ['number' => $cart->number]
);
```
:::

::: tip
This URL can be presented to the user however you’d like. It’s particularly useful in an email that allows the customer to retrieve an abandoned cart.
:::

#### Loading a Cart with a Form

Send a GET or POST action request with a `number` parameter referencing the cart you’d like to load. When posting the form data, you can include a specific redirect location like you can with any other Craft post data.

This is a simplified version of [`shop/cart/load.twig`](https://github.com/craftcms/commerce/tree/main/example-templates/dist/shop/cart/load.twig) in the example templates, where a `cart` variable has already been set to the cart that should be loaded:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/load-cart') }}
  {{ redirectInput('/shop/cart') }}

  <input type="text" name="number" value="{{ cart.number }}">
  <button type="submit">Submit</button>
</form>
```

#### Restoring Previous Cart Contents

If the customer’s a registered user they may want to continue shopping from another browser or computer. If that customer has an empty cart—as they would by default—and they log into the site, the cart from a previous session will automatically be loaded.

You can allow a customer to see carts from previous logged-in sessions:

::: code
```twig
{% if currentUser %}
  {% set currentCart = craft.commerce.carts.cart %}
  {% if currentCart.id %}
    {# Return all incomplete carts *except* the one from this session #}
    {% set oldCarts = craft.orders()
      .isCompleted(false)
      .id('not '~currentCart.id)
      .user(currentUser)
      .all() %}
  {% else %}
    {% set oldCarts = craft.orders()
      .isCompleted(false)
      .user(currentUser)
      .all() %}
  {% endif %}
{% endif %}
```
```php
use craft\commerce\Plugin as Commerce;
use craft\commerce\elements\Order;

$currentUser = Craft::$app->getUser()->getIdentity();

if ($currentUser) {
    $currentCart = Commerce::getInstance()->getCarts()->getCart();
    if ($currentCart->id) {
        // return all incomplete carts *except* the one from this session
        $oldCarts = Order::findAll()
            ->isCompleted(false)
            ->id('not '.$currentCart->id)
            ->user($currentUser);
    } else {
        $oldCarts = Order::findAll()
            ->isCompleted(false)
            ->user($currentUser);
    }
}
```
:::

You could then loop over the line items in those older carts and allow the customer to add them to the current order.

::: tip
You’ll find an example of this in the [example templates](example-templates.md).
:::

### Forgetting a Cart

A logged-in customer’s cart is removed from their session automatically when they log out. You can call the `forgetCart()` method directly at any time to remove the current cart from the session. The cart itself will not be deleted, but only disassociated with the active session.

::: code
```twig
{# Forget the cart in the current session. #}
{{ craft.commerce.carts.forgetCart() }}
```
```php
use craft\commerce\Plugin as Commerce;

// Forget the cart in the current session.
Commerce::getInstance()->getCarts()->forgetCart();
```
:::

## Orders

Orders are [Element Types](/4.x/extend/element-types.md) and can have custom fields associated with them. You can browse orders in the control panel by navigating to **Commerce** → **Orders**.

When a cart becomes an order, the following things happen:

1. The `dateOrdered` order attribute is set to the current date.
2. The `isCompleted` order attribute is set to `true`.
3. The default [order status](custom-order-statuses.md) is set on the order and any emails for this status are sent.
4. The order reference number is generated for the order, based on the “Order Reference Number Format” setting. (In the control panel: **Commerce** → **Settings** → **System Settings** → **General Settings**.)

Instead of being recalculated on each change like a cart, the order will only be recalculated if you [manually trigger recalculation](#recalculating-orders).

Adjustments for discounts, shipping, and tax may be applied when an order is recalcuated. Each adjustment is related to its order, and can optionally relate to a specific line item.

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

The order reference number is generated on cart completion according to the **Order Reference Number Format** in **Commerce** → **Settings** → **System Settings** → **General Settings**.

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

In this example, `{{ id }}` refers to the order’s element ID, which is not sequential. If you would rather generate a unique sequential number, a simple way would be to use Craft’s [seq()](https://craftcms.com/docs/4.x/dev/functions.html#seq) Twig function, which generates a next unique number based on the `name` parameter passed to it.

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

### Creating Orders

An order is usually created on the front end as a customer [adds items](#adding-items-to-a-cart) to and completes a [cart](#carts). With Commerce Pro, An order may also be created in the control panel.

To create a new order, navigate to **Commerce** → **Orders**, and choose **New Order**. This will create a new order that behaves like a cart. As [purchasables](purchasables.md) are added and removed from the order, it will automatically recalculate its [sales](sales.md) and adjustments.

::: warning
You must be using [Commerce Pro](editions.md) and have “Edit Orders” permission to create orders from the control panel.
:::

To complete the order, press **Mark as completed**.

### Editing Orders

Orders can be edited in the control panel by visiting the order edit page and choosing **Edit**. You’ll enter edit mode where you can change values within the order.

While editing the order, it will refresh subtotals and totals and display any errors. It will _not_ automatically recalculate the order based on system rules like shipping, taxes, or promotions. Choose **Recalculate order** to have it fully recalculate including those system rules.

Once you’re happy with your changes, choose **Update Order** to save it to the database.

### Order Totals

Every order includes a few important totals:

- **order.itemSubtotal** is the sum of the order’s [line item `subtotal` amounts](#line-item-totals).
- **order.itemTotal** is the sum of the order’s [line item `total` amounts](#line-item-totals).
- **order.adjustmentSubtotal** is the sum of the order’s adjustments.
- **order.total** is the sum of the order’s `itemSubtotal` and `adjustmentsTotal`.
- **order.totalPrice** is the total order price with a minimum enforced by the [minimumTotalPriceStrategy](config-settings.html#minimumtotalpricestrategy) setting.

::: warning
You’ll also find an `order.adjustmentsSubtotal` which is identical to `order.adjustmentsTotal`. It will be removed in Commerce 4.
:::

### Recalculating Orders

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

### Order Notices

Notices are added to an order whenever it changes, whether it’s the customer saving the cart or a store manager recalculating from the control panel. Each notice is an [OrderNotice](https://github.com/craftcms/commerce/blob/main/src/models/OrderNotice.php) model describing what changed and could include the following:

- A previously-valid coupon or shipping method was removed from the order.
- A line item’s purchasable was no longer available so that line item was removed from the cart.
- A line item’s sale price changed for some reason, like the sale no longer applied for example.

The notice includes a human-friendly terms that can be exposed to the customer, and references to the order and attribute it’s describing.

#### Accessing Order Notices

Notices are stored on the order and accessed with `getNotices()` and `getFirstNotice()` methods.

Each can take optional `type` and `attribute` parameters to limit results to a certain order attribute or kind of notice.

A notice’s `type` will be one of the following:

- `lineItemSalePriceChanged`
- `lineItemRemoved`
- `shippingMethodChanged`
- `invalidCouponRemoved`

::: code
```twig
{# @var order craft\commerce\elements\Order #}

{# Get a multi-dimensional array of notices by attribute key #}
{% set notices = order.getNotices() %}

{# Get an array of notice models for the `couponCode` attribute only #}
{% set couponCodeNotices = order.getNotices(null, 'couponCode') %}

{# Get the first notice only for the `couponCode` attribute #}
{% set firstCouponCodeNotice = order.getFirstNotice(null, 'couponCode') %}

{# Get an array of notice models for changed line item prices #}
{% set priceChangeNotices = order.getNotices('lineItemSalePriceChanged') %}
```
```php
// @var craft\commerce\elements\Order $order

// Get a multi-dimensional array of notices by attribute key
$notices = $order->getNotices();

// Get an array of notice models for the `couponCode` attribute only
$couponCodeNotices = $order->getNotices(null, 'couponCode');

// Get the first notice only for the `couponCode` attribute
$firstCouponCodeNotice = $order->getFirstNotice(null, 'couponCode');

// Get an array of notice models for changed line item prices
$priceChangeNotices = $order->getNotices('lineItemSalePriceChanged');
```
:::

Each notice can be output as a string in a template:

```twig
{% set notice = order.getFirstNotice('salePrice') %}
<p>{{ notice }}</p>
{# result: <p>The price of x has changed</p> #}
```

#### Clearing Order Notices

Notices remain on an order until they’re cleared. You can clear all notices by posting to the cart update form action, or call the order’s `clearNotices()` method to clear specific notices or all of them at once.

This example clears all the notices on the cart:

::: code
```twig{5}
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}
  {{ hiddenInput('successMessage', 'All notices dismissed'|hash) }}
  {{ hiddenInput('clearNotices') }}
  <button type="submit">Dismiss</button>
</form>
```
```php{7}
use craft\commerce\Plugin as Commerce;

// Get the current cart
$cart = Commerce::getInstance()->getCarts()->getCart();

// Clear all notices
$cart->clearNotices();
```
:::

This only clears `couponCode` notices on the cart:

::: code
```twig
{# Clear notices on the `couponCode` attribute #}
{% do cart.clearNotices(null, 'couponCode') %}
```
```php{7}
use craft\commerce\Plugin as Commerce;

// Get the current cart
$cart = Commerce::getInstance()->getCarts()->getCart();

// Clear notices on the `couponCode` attribute
$cart->clearNotices(null, 'couponCode');
```
:::

The notices will be cleared from the cart object in memory. If you’d like the cleared notices to persist, you’ll need to save the cart:

::: code
```twig
{# Save the cart #}
{% do craft.app.elements.saveElement(cart) %}
```
```php
// Save the cart
Craft::$app->getElements()->saveElement($cart);
```
:::

### Order Status Emails

If [status emails](emails.md) are set up for a newly-updated order status, messages will be sent when the updated order is saved.

You can manually re-send an order status email at any time. Navigate to an order’s edit page, then select the desired email from the Send Email menu at the top of the page.

## Querying Orders

You can fetch orders in your templates or PHP code using **order queries**.

::: code
```twig
{# Create a new order query #}
{% set myOrderQuery = craft.orders() %}
```
```php
// Create a new order query
$myOrderQuery = \craft\commerce\elements\Order::find();
```
:::

Once you’ve created an order query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](https://craftcms.com/docs/4.x/element-queries.html#executing-element-queries) by calling `.all()`. An array of [Order](commerce4:craft\commerce\elements\Order) objects will be returned.

::: tip
See [Element Queries](https://craftcms.com/docs/4.x/element-queries.html) in the Craft docs to learn about how element queries work.
:::

### Example

We can display an order with a given order number by doing the following:

1. Create an order query with `craft.orders()`.
2. Set the [number](#number) parameter on it.
3. Fetch the order with `.one()`.
4. Output information about the order as HTML.

```twig
{# Get the requested order number from the query string #}
{% set orderNumber = craft.app.request.getQueryParam('number') %}

{# Create an order query with the 'number' parameter #}
{% set myOrderQuery = craft.orders()
  .number(orderNumber) %}

{# Fetch the order #}
{% set order = myOrderQuery.one() %}

{# Make sure it exists #}
{% if not order %}
  {% exit 404 %}
{% endif %}

{# Display the order #}
<h1>Order {{ order.getShortNumber() }}</h1>
<!-- ... ->
```

## Order Query Parameters

Order queries support the following parameters:

<!-- BEGIN PARAMS -->

<!-- END PARAMS -->
