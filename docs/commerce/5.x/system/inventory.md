---
description: Manage stock and fulfill orders with sophisticated inventory tools.
---

# Inventory

Commerce 5 features a sophisticated new [multi-warehouse](#locations) inventory management system.

## Stock

“Stock” is now tracked for each purchasable (or SKU, traditionally) in each configured [location](#locations).

You will encounter inventory primarily within each variant’s edit screen. To start tracking inventory, turn on **Inventory**, then use the action menu in any location’s **Available** column to _Set_ or _Adjust_

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

Inventory locations are attached to a store via the **Inventory Locations** setting in <Journey path="Commerce, Store Management, General" />.

When you check the stock of a purchasable, Commerce gets the total inventory across all locations associated with the store. Not all locations must be associated with a store—if you need to track stock that isn’t available to customers (or will be gradually released for sale via [transfers](#transfers)), you can create additional “detached” locations.

::: warning
Commerce commits inventory from the first available location. When _fulfilling_ an order, you may deduct the stock from any of that store’s inventory locations.
:::

## Levels

To support a variety of fulfillment and handling processes, Commerce provides multiple distinct “quantities” per location and item.

- **On Hand** (`onHandTotal`) — Combined total of _available_, _committed_, _quality control_, _safety_, _reserved_, and _damaged_.
- **Available** (`availableTotal`) — Total inventory available for purchase. When this reaches zero, the item is considered “out of stock” and will prevent orders from being completed.
- **Committed** (`committedTotal`) — Inventory allocated to completed (but unfulfilled) orders.
- **Reserved** (`reservedTotal`), **Damaged** (`damagedTotal`), **Safety** (`safetyTotal`), and **Quality Control** (`qualityControlTotal`) — Predefined designations that can be used to hold additional inventory that is _not_ available for purchase.
- **Incoming** (`incomingTotal`) — Inventory that is expected to arrive via a [transfer](#transfers).
- **Unavailable** (`unavailableTotal`) — Combined total of _quality control_, _safety_, _reserved_, and _damaged_.

Some inventory levels cannot be directly manipulated: **Committed**, for instance, is used exclusively for holding inventory after an order is completed, but prior to fulfillment. **On Hand** is synthesized from multiple other totals, but _can_ be set—changes to it are actually applied to the **Available** inventory, allowing an employee counting inventory to update stock in the system without having to manually deduct committed or other non-available items.

## Transactions

Any time inventory directly altered or changed in response to a completed order, Commerce logs this as an inventory transaction. Transactions can be viewed in the **History** tab of any inventory item.

## Transfers <Since product="commerce" ver="5.1.0" feature="Transferring inventory between locations" />

When you have two or more inventory locations configured, Commerce will make an **Inventory Transfers** screen accessible via the control panel. Here, you can create and manage transfers of inventory between locations.

Like [products](products-variants.md) and [orders](orders-carts.md), transfers are [elements](/5.x/system/elements.md), and therefore have a familiar interface, including [statuses](#statuses) and [custom fields](#field-layout).

### Statuses

Each transfer begins as a **Draft**. In this state, the 

### Field Layout

Additional data can be attached to a transfer by adding custom fields to its field layout in <Journey path="Settings, Commerce, System Settings, Transfers" />. Applying tab- and field-level conditions allow you to customize your administrative processes by exposing fields at the right time.
