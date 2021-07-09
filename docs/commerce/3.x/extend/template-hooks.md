# Template Hooks

Commerce adds its own [template hooks](/3.x/extend/template-hooks.md) in addition to Craft’s.

## Control Panel Template Hooks

| Hook                                     | Description & Template
| ---------------------------------------- | -------------------------------------------------------------------- 
| `cp.commerce.discount.edit`              | After discount detail view’s “Enabled” field.<br><small>[promotions/discounts/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/promotions/discounts/_edit.html)</small>
| `cp.commerce.customers.edit`             | Before customer edit view’s template blocks.<br><small>[customers/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/customers/_edit.html)</small>
| `cp.commerce.customers.edit.content`     | After existing customer edit view’s content.<br><small>[customers/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/customers/_edit.html)</small>
| `cp.commerce.customers.edit.details`     | After existing customer edit view’s right sidebar details.<br><small>[customers/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/customers/_edit.html)</small>
| `cp.commerce.order.edit`                 | Before order edit view’s template blocks.<br><small>[orders/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/orders/_edit.html)</small>
| `cp.commerce.order.edit.details`         | After existing order edit view’s right sidebar details.<br><small>[orders/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/orders/_edit.html)</small>
| `cp.commerce.order.edit.main-pane`       | After existing content within order edit view’s “Order Details” tab.<br><small>[orders/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/orders/_edit.html)</small>
| `cp.commerce.product.edit.content`       | After product detail view’s custom fields.<br><small>[products/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/products/_edit.html)</small>
| `cp.commerce.product.edit.details`       | After existing product detail view’s right sidebar details.<br><small>[products/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/products/_edit.html)</small>
| `cp.commerce.subscriptions.edit.content` | After the last `.pane` in subscription detail view’s content block.<br><small>[subscriptions/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/subscriptions/_edit.html)</small>
| `cp.commerce.subscriptions.edit.meta`    | After the discount detail view’s existing right sidebar details.<br><small>[subscriptions/_edit.html](https://github.com/craftcms/commerce/blob/main/src/templates/subscriptions/_edit.html)</small>
