---
description: Manage stock and fulfill orders with sophisticated inventory tools.
---

# Inventory

Commerce 5 features a sophisticated new [multi-warehouse](#locations) inventory management system.

## Stock

“Stock” is now tracked for each purchasable (or SKU, traditionally) in each configured [location](#locations).

You will encounter inventory primarily within each variant’s edit screen. To start tracking inventory, turn on **Inventory**, and 

Inventory information is available in your templates, as well. This example disables `<select>` menu options that report having no inventory, to prevent customers from trying to add them to the cart:

```twig
{# Assuming we’re on a product page... #}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('commerce/cart/update-cart') }}

  <select name="purchasableId">
    {% for variant in product.variants %}
      {{ tag('option', {
        text: variant.title,
        value: variant.id,
        disabled: not variant.hasStock(),
      }) }}
    {% endfor %}
  </select>

  <button>Add to Cart</button>
</form>
```

## Locations

Commerce tracks inventory with _locations_. Locations are defined globally, then associated with one or more [stores](stores.md).

To add a location, visit <Journey path="Commerce, Inventory, Locations" />, then click **New location**. Locations have a **Name**, **Handle**, and an address.

When you check the stock of a purchasable, Commerce gets the total inventory across all locations associated with the store. Not all locations have to be associated with a store! If you need to track stock that you don’t intend to 

## Levels

To support a variety of fulfillment and handling processes, Commerce provides multiple distinct “quantities” per location and item.

- **On Hand** (`onHandTotal`) — Combined total of _available_, _committed_, _quality control_, _safety_, _reserved_, and _damaged_.
- **Available** (`availableTotal`) — Total inventory available for purchase. When this reaches zero, the item is considered “out of stock” and will prevent orders from being completed.
- **Committed** (`committedTotal`) — Inventory allocated to completed (but unfulfilled) orders.
- **Reserved** (`reservedTotal`), **Damaged** (`damagedTotal`), **Safety** (`safetyTotal`), and **Quality Control** (`qualityControlTotal`) — Predefined designations that can be used to hold additional inventory that is _not_ available for purchase.
- **Incoming** (`incomingTotal`) — Inventory that is expected to arrive via a transfer. (Coming soon!)
- **Unavailable** (`unavailableTotal`) — Combined total of _quality control_, _safety_, _reserved_, and _damaged_.

Some inventory levels cannot be directly manipulated: **Committed**, for instance, is used exclusively for holding inventory after an order is completed, but prior to fulfillment. **On Hand** is synthesized from multiple other totals, but _can_ be set—changes to it are actually applied to the **Available** inventory, allowing an employee counting inventory to update stock in the system without having to manually deduct committed or other non-available items.

## Transactions

Any time inventory directly altered or changed in response to a completed order, Commerce logs this as an inventory transaction. Transactions can be viewed in the **History** tab of any inventory item.
