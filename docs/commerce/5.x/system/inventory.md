---
description: Manage stock and fulfill orders with sophisticated inventory tools.
---

# Inventory

Commerce 5 features a sophisticated new [multi-warehouse](#locations) inventory management system, supported by [transfers](#transfers) and atomic inventory [transactions](#transactions).

## Stock

“Stock” is now tracked for each [purchasable](purchasables.md) (or SKU, traditionally) in each configured [location](#locations).

You will encounter inventory primarily within each variant’s edit screen. To start tracking stock, turn on **Inventory**, then use the action menu in any location’s **Available** column to _Set_ or _Adjust_ stock _to_ or _by_ a specific quantity. Changes to [inventory levels](#levels) are tracked as [transactions](#transactions)—including when altered via [transfers](#transfers).

Inventory information is available in your templates, as well. This example disables `<select>` menu options that report having no inventory, to prevent customers from trying to add them to the cart:

```twig{12}
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

## Levels

To support a variety of fulfillment and handling processes, Commerce provides multiple distinct _levels_ per location for each _inventory item_.

- **On Hand** (`onHandTotal`) — Combined total of _available_, _committed_, _quality control_, _safety_, _reserved_, and _damaged_.
- **Available** (`availableTotal`) — Total inventory available for purchase. When this reaches zero, the item is considered “out of stock” and will prevent orders from being completed.
- **Committed** (`committedTotal`) — Inventory allocated to completed (but [unfulfilled](#fulfillment)) orders.
- **Reserved** (`reservedTotal`) — When stock is over-committed in one location, Commerce may 
- **Damaged** (`damagedTotal`), **Safety** (`safetyTotal`), and **Quality Control** (`qualityControlTotal`) — Predefined designations that can be used to hold additional inventory that is _not_ available for purchase.
- **Incoming** (`incomingTotal`) — Inventory that is expected to arrive via a [transfer](#transfers). This may be negative for locations designated as the source for **Pending** or **Partial** transfers.
- **Unavailable** (`unavailableTotal`) — Combined total of _quality control_, _safety_, _reserved_, and _damaged_.
- **Fulfilled** (`fulfilled`) — A special level used to track stock that is fulfilled from the **Committed** state. This level cannot be adjusted except via the [order fulfillment](#fulfillment) screen.

Some inventory levels cannot be directly manipulated: **Committed**, for instance, is used exclusively for holding inventory after an order is completed, but prior to fulfillment. **On Hand** is synthesized from multiple other totals, but _can_ be set—changes to it are actually applied to the **Available** inventory, allowing an employee counting inventory to update stock in the system without having to manually deduct committed or other non-available items.

## Transactions

Any time inventory directly altered, changed in response to a completed order, or updated via a [transfer](#transfers), Commerce logs this as an inventory transaction. Transactions can be viewed in the **History** tab of any inventory item.

Commerce uses database transactions to isolate and roll back groups of inventory changes. Consider a transfer, which must simultaneously add stock to one location and deduct it from another: if one of those operations fails, they are reverted as a group, which can be safely retried later. This “atomicity” also means that concurrent updates to a single inventory value (like a transfer setting its **Available** quantity to `50` and its quantity being reduced by one as an order is completed) are guaranteed to be consistent, regardless which action actually happens first.

## Transfers <Since product="commerce" ver="5.1.0" feature="Transferring inventory between locations" />

When you have two or more inventory locations configured, Commerce adds an **Inventory Transfers** screen to the control panel. Here, you can create and manage transfers of inventory between locations. A transfer encapsulates a list of inventory items and quantities and makes it possible to adjust many [inventory levels](#levels) at once.

You do not need to use transfers to [update stock](#stock). In addition to representing a physical movement of inventory between locations, transfers can represent new stock entering your supply—say, from a virtual “Manufacturing” inventory location.

Like [products](products-variants.md) and [orders](orders-carts.md), transfers are [elements](/5.x/system/elements.md), and therefore have a familiar interface, including [statuses](#statuses) and [custom fields](#field-layout).

### Statuses

Inventory transfers have a fixed workflow comprised of four statuses to help prepare and visualize the movement of stock between locations.

Draft
:   Each transfer begins as a **Draft**. In this state, the manager can add inventory items, adjust quantities, and edit the **Origin** and **Destination** locations for the transfer.

Pending
:   When the transfer is ready to be finalized, a manager can mark it as **Pending**. This makes the transfer details _read-only_ (specifically, the **Origin**, **Destination**, and inventory items), and exposes the item quantities as [**Incoming**](#levels) on the respective inventory items.

Received, Partial
:   The **Received** and **Partial** statuses are applied automatically after marking inventory as received via the **Receive Inventory** slideout.

    A transfer is considered **Received** only when the total quantity for every inventory item has been marked as received.

    If some portion of the inventory items or items’ quantity has been marked as received, a transfer is considered **Partial**. You may use the **Receive Inventory** tool as many times as necessary to complete a transfer—say, if it was split into multiple physical shipments.

    Each time you **Receive Inventory**, the quantity you **Accept** is moved into the **Available** level, and the quantity you **Reject** is moved into 

    ::: warning
    A transfer is considered **Received** even if you **Reject** some of the quantity when receiving inventory.

    Rejecting part of a transfer reduces those items’ **Incoming** level, but doesn’t add it to any other level. If you reject inventory for specific reasons and want to track it in Commerce, consider using one of **Reserved**, **Damaged**, **Safety**, or **Quality Control**.
    :::

### Field Layout

Additional data can be attached to a transfer by adding custom fields to its field layout in <Journey path="Settings, Commerce, System Settings, Transfers" />.

### Permissions

Any store managers who need to orchestrate inventory transfers must have the **Manage inventory transfers** permission.

::: tip
Users do _not_ need the **Manage inventory stock levels** permission to be able to execute transfers.
:::

## Fulfillment

When an order is completed, line items’ quantities are “committed” from the store’s inventory locations in a series of [transactions](#transactions). This process moves stock from the **Available** level to the **Committed** level. Later, when you use the **Fulfillment** action on a completed order, stock is moved from the **Committed** level to a special **Fulfilled** level.

### Strategy

Inventory is committed according to these rules:

- Each _purchasable_ in the order is handled discretely;
- Inventory for a line item is only ever **Committed** from a single location;
- Committing inventory may result in negative **On-hand** or **Available** levels;
- Additional inventory is **Reserved** in as many other locations are required to satisfy the total quantity;
- The order in which inventory locations are attached to a store is significant;
- An order may commit inventory across multiple locations;

::: tip
Purchasables for which inventory management is _disabled_ are not factored in to commitment and fulfillment logic. [Custom line items](orders-carts.md#custom-line-items) are also excluded from these calculations.
:::

Commerce starts by consolidating quantities for each purchasable in an order. That quantity is checked against each inventory location, _in the order they are attached to the store_: if enough inventory is available at one of them, that location is used; if none have enough available inventory, the first attached location is used.

Inventory _movements_ are created against each line item to track how stock is committed and reserved, and saved to the database as [transactions](#transactions). The primary movement for each line item commits inventory from the chosen location; if that stock is exhausted, Commerce keeps track of a running “remainder,” which is later reserved from one or more additional locations. That remainder is treated as a single pool of stock, and no further attempts are made to group it by line item. Instead, Commerce reserves as much stock as is available from each subsequent location until the ordered quantity is satisfied.

### Example

Suppose our store’s inventory looks like this (for clarity, we’ve omitted levels that Commerce would ordinarily display)…

| SKU | Location A | Location B |
| --- | --- | --- |
| `ACME-WIDGET` | **25** Available<br>**10** Committed<br>**0** Reserved | **163** Available<br>**0** Committed<br>**0** Reserved |
| `ACME-FLASK` | **2** Available<br>**0** Committed<br>**0** Reserved | **14** Available<br>**0** Committed<br>**10** Reserved |
| `ACME-ALEMBIC` | **19** Available<br>**0** Committed<br>**0** Reserved | **41** Available<br>**0** Committed<br>**6** Reserved |

…and a customer completes an order with the following items:

- 10 &times; `ACME-WIDGET`
- 1 &times; `ACME-FLASK` (with custom engraving)
- 2 &times; `ACME-FLASK`
- 50 &times; `ACME-ALEMBIC`

Commerce sees three discrete purchasables, and decides that _Location A_ can cover the `ACME-WIDGET` quantity, _Location B_ has enough `ACME-FLASK` stock to cover the total quantity (across two line items), but _no location_ has enough `ACME-ALEMBIC`, so it will default to _Location A_.

1. All `ACME-WIDGET` stock is committed from _Location A_ in a single movement;
1. `ACME-FLASK` stock is committed in two movements from _Location B_:
  - One from the first line item (“engraved”);
  - Two from the second line item (no customization);
1. The `ACME-ALEMBIC` quantity is committed from _Location A_;

In this process, Commerce notes that _Location A_ would be over-committed by 31 units of `ACME-ALEMBIC`, and creates an additional movement to reserve that stock in _Location B_. A total of five movements are executed against three purchasables or _inventory items_, and the final state would look like this (an asterisk indicates a changed level):

| SKU | Location A | Location B |
| --- | --- | --- |
| `ACME-WIDGET` | **15** Available\*<br>**20** Committed\*<br>**0** Reserved | **163** Available<br>**0** Committed<br>**0** Reserved |
| `ACME-FLASK` | **2** Available<br>**0** Committed<br>**0** Reserved | **11** Available\*<br>**3** Committed\*<br>**10** Reserved |
| `ACME-ALEMBIC` | **-31** Available\*<br>**50** Committed\*<br>**0** Reserved | **10** Available\*<br>**0** Committed<br>**37** Reserved\* |

::: tip
If customizations are provided via line items’ `options` array that affect where that item can be shipped or fulfilled from, consider making it a discrete variant.
:::
