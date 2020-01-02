# Changes in Commerce 3

## Twig template changes

### Changes

Deprecation of variables was preferred, but breaking changes could not be avoided due to naming collisions between the service names and the previous variable name.

Use the table below to update your twig templates.
D - Deprecated
BC - Breaking Change

| Old                                       | New                                                       | Change
|-------------------------------------------|-----------------------------------------------------------|--------
| `craft.commerce.products`                 | `craft.products`                                          | BC

### Form Action Changes

| Old                                       | New                            | Docs
|-------------------------------------------|--------------------------------|-------
| `commerce/cart/removeLineItem`            | `commerce/cart/update-cart`    | [Updating the Cart](adding-to-and-updating-the-cart.md#updating-line-items)

### Model Changes

#### Model Name

| Old                                       | New                                                       | Change
|-------------------------------------------|-----------------------------------------------------------|--------
| `purchasable.purchasableId`               | `purchasable.id`                                          | BC