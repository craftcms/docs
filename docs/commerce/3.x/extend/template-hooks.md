# Template Hooks

Commerce adds its own [template hooks](/3.x/extend/template-hooks.md) in addition to Craft’s.

## Control Panel Template Hooks

| Hook                                     | Description                                                          | Template                                                                                                                           |
| ---------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `cp.commerce.discount.edit`              | After discount detail view’s “Enabled” field.                        | [promotions/discounts/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/promotions/discounts/_edit.html) |
| `cp.commerce.order.edit`                 | Before order edit view’s template blocks.                            | [orders/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/orders/_edit.html)                             |
| `cp.commerce.order.edit.details`         | After existing order edit view’s right sidebar details.              | [orders/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/orders/_edit.html)                             |
| `cp.commerce.order.edit.main-pane`       | After existing content within order edit view’s “Order Details” tab. | [orders/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/orders/_edit.html)                             |
| `cp.commerce.product.edit.content`       | After product detail view’s custom fields.                           | [products/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/products/_edit.html)                         |
| `cp.commerce.product.edit.details`       | After existing product detail view’s right sidebar details.          | [products/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/products/_edit.html)                         |
| `cp.commerce.subscriptions.edit.content` | After the last `.pane` in subscription detail view’s content block.  | [subscriptions/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/subscriptions/_edit.html)               |
| `cp.commerce.subscriptions.edit.meta`    | After the discount detail view’s existing right sidebar details.     | [subscriptions/_edit.html](https://github.com/craftcms/commerce/blob/develop/src/templates/subscriptions/_edit.html)               |
