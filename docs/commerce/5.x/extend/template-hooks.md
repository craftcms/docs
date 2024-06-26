# Template Hooks

Commerce adds its own [template hooks](/5.x/extend/template-hooks.md) in addition to Craft’s. Some hooks are _not_ suitable for injecting HTML, but can still be used to modify data available to the rest of the template.

## Discounts

`cp.commerce.discount.edit`
:   After discount detail view’s “Enabled” field.

    <small>[store-management/discounts/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/discounts/_edit.twig)</small>

`cp.commerce.discounts.edit.content`
:   After discount detail view’s main content.

    <small>[store-management/discounts/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/discounts/_edit.twig)</small>

`cp.commerce.discounts.edit.details`
:   After discount detail view’s existing right sidebar details column.

    <small>[store-management/discounts/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/discounts/_edit.twig)</small>

`cp.commerce.discounts.edit`
:   Before discount detail view’s template blocks. **HTML not allowed.**

    <small>[store-management/discounts/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/discounts/_edit.twig)</small>

`cp.commerce.discounts.index`
:   After discounts index view’s main content.

    <small>[store-management/discounts/index.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/discounts/index.twig)</small>

## Orders

`cp.commerce.order.edit`
:   Before order edit view’s template blocks. **HTML not allowed.**

    <small>[orders/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/orders/_edit.twig)</small>

`cp.commerce.order.edit.details`
:   After existing order edit view’s right sidebar details.

    <small>[orders/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/orders/_edit.twig)</small>

`cp.commerce.order.edit.main-pane`
:   After existing content within order edit view’s “Order Details” tab.

    <small>[orders/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/orders/_edit.twig)</small>

`cp.commerce.order.edit.order-actions`
:   Inject additional controls just before the _primary_ order form actions in the page toolbar.

    <small>[orders/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/orders/_edit.twig)</small>

`cp.commerce.order.edit.order-secondary-actions`
:   Inject additional controls just before the _secondary_ order form actions in the page toolbar.

    <small>[orders/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/orders/_edit.twig)</small>

## Sales

::: warning
Note that [sales](../system/sales.md) are a legacy feature and may not be available to all Commerce users.
:::

`cp.commerce.sales.edit.content`
:   After sale detail view’s main content.

    <small>[promotions/sales/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/promotions/sales/_edit.twig)</small>

`cp.commerce.sales.edit.details`
:   After sale detail view’s existing right sidebar details column.

    <small>[promotions/sales/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/promotions/sales/_edit.twig)</small>

`cp.commerce.sales.edit`
:   Before sale detail view’s template blocks. **HTML not allowed.**

    <small>[promotions/sales/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/promotions/sales/_edit.twig)</small>

`cp.commerce.sales.index`
:   After sales index view’s main content.

    <small>[promotions/sales/index.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/promotions/sales/index.twig)</small>

## Subscriptions

`cp.commerce.subscriptions.edit.content`
:   After the last `.pane` in subscription detail view’s content block.

    <small>[subscriptions/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/subscriptions/_edit.twig)</small>

`cp.commerce.subscriptions.edit.meta`
:   After the right sidebar details on subscription elements’ edit screen.

    <small>[subscriptions/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/subscriptions/_edit.twig)</small>

## Inventory + Locations

`cp.commerce.inventory.index`
:   After the table containing inventory levels for a specific [inventory location](../system/inventory.md).

    <small>[inventory/levels/_index.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/inventory/levels/_index.twig)</small>

`cp.commerce.inventoryLocation.edit`
:   After address fields in the [inventory location](../system/inventory.md) edit screen.

    <small>[inventory-locations/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/inventory-locations/_edit.twig)</small>

## Pricing Catalog

`cp.commerce.catalogPricingRules.index`
:   After the table containing a store’s pricing rules.

    <small>[store-management/pricing-rules/index.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/pricing-rules/index.twig)</small>

`cp.commerce.catalogPricingRules.edit.content`
:   After the tabbed pricing rule configuration UI. Content injected here will always be visible, regardless of the selected tab.

    <small>[store-management/pricing-rules/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/pricing-rules/_edit.twig)</small>

## Shipping

`cp.commerce.shippingMethods.edit.content`
:   After the shipping rule form.

    <small>[store-management/shipping/shipping-methods/_edit.twig](https://github.com/craftcms/commerce/blob/5.x/src/templates/store-management/shipping/shipping-methods/_edit.twig)</small>
