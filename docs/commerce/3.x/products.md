# Products

Products define the items for sale in your store. The product itself is never sold—the thing that goes into a cart for purchase is actually one of the product’s [variants](#variants). Even if a product doesn’t appear to have any variants, it still uses a **default variant** behind the scenes.

For instance, a t-shirt product would likely have at least one variant for each of its colors. You wouldn’t sell the t-shirt without a specific color, so a variant would be necessary.

A book that only comes in one color and size might not have any meaningful variations for the customer to choose. It would still have a specific SKU and dimensions, so a single implicit variant exists and gets added to the cart.

The product describes what’s for sale, and the variant is what the customer ultimately orders.

## Variants

Variants go on to describe the individual properties regarding a variant, such as SKU, price, and dimensions.

These properties are unique to each variant. Custom fields may be added to variants to allow other distinguishing traits.

For example, you may be selling a product which is a baseball jersey, which comes in “Small”, “Medium” and “Large” sizes, and in “Red”, “Green” and “Blue” colors.

For this combination of sizes and colors, you might make a product type that has two dropdown fields (“Color” and “Size”) added to the variant’s field layout.
This would enable unique variant data:

- Small, Red
- Small, Green
- Small, Blue
- Medium, Red
- Medium, Green
- Medium, Blue
- Large, Red
- Large, Green
- Large, Blue

You can continue using as many custom fields as you need to define important properties and variants.

Commerce does not automatically create every possible unique variant for you, that’s up to the author.

### Default Variant

Every single product has a default variant. Whenever a product is created, a default variant for that product will be created too.

If a product type has multiple variants enabled, the author can choose which one should be used by default. Products that do not have multiple variants still have a default variant, but the author cannot add additional variants.

### Variant Stock

Products may be configured for either unlimited stock or a specific quantity per variant, even if using the single default variant. A variant’s finite stock amount will automatically be reduced whenever someone completes an order until it reaches zero.

Though a variant’s “Available for purchase” setting won’t be changed, it cannot be added to a cart once its stock has reached zero.

For returns or refunds that aren’t ultimately delivered to the customer, you’ll need to either manually update product stock or use [the `orderStatusChange` event](events.md#orderstatuschange) to automate further stock adjustments.

## Purchasables

Anything that can be added to the cart by a customer is called a [purchasable](purchasables.md).

Third party plugins can provide additional purchasables.

The only purchasables Craft Commerce provides are [variants](#variants), and [donations](donations.md).
