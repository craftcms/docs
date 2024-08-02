# Line Item Statuses

Line item statuses are custom labels that can be applied to an order’s line items.

Unlike the [order status](custom-order-statuses.md), a line item’s status is optional. They have no functional impact on the line item or its order; it simply provides a way to designate status for store managers. It could be used internally or to communicate stock status to the customer—an item being back-ordered, for example.

Add and manage line item statuses per-[store](stores.md) by navigating to <Journey path="Commerce, System Settings, Line Item Statuses" />. When choosing **New line item status** you’ll need to specify a *Name*, *Handle*, and optional *Color*.

A single line item status may also be designated as the **Default**, meaning new line items will be assigned that status when an order is completed.

Change a line item’s status by choosing **Edit** for any line item in an order’s edit screen and selecting the new status—or **None**—and saving the order.

## Templating

You can access the status of a line item to a user via `item.lineItemStatus`:

```twig{2,5}
{% for item in order.lineItems %}
  {% set status = item.lineItemStatus %}

  {{ item.description }}
  <span class="status-pip status-pip--{{ status.handle }}" title="{{ status.name }}"></span>
  {# ... #}
{% endfor %}
```
