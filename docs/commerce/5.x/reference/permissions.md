# Permissions

Commerce embraces Craft’s flexible [user groups and permissions structure](/5.x/system/user-management.md) and gives you fine-grained control over who can access and manage critical ecommerce data.

::: tip
User groups can also be leveraged in [catalog pricing rules](../system/pricing-rules.md) to grant customers access to special discounts.
:::

## Store Managers

Throughout the documentation, we use the shorthand “store managers” for users who have been granted access to a subset of Commerce’s back-office features (like [product management](../system/products-variants.md), [pricing rules](../system/pricing-rules.md), and [inventory](../system/inventory.md), or handling [orders](../system/orders-carts.md))—but it is not a predefined or codified role! You are always in control of your users’ capabilities.

The exact permissions you choose for these store managers will depend on the needs of your organization and site.

::: tip
There may be some overlap between a store manager’s role and that of a regular content author—depending on your content model (specifically, how much content is directly attached to product and variant elements vs. entries), authors may need to be able to update products!
:::

## Permissions

The following Commerce permissions are available for Craft users and user groups.

### Access Craft Commerce

Whether the user is able to access the Commerce section of the control panel.

::: tip
Unlike other Commerce-specific permissions, this one is nested inside Craft’s **Access the control panel** permission. Any user that needs access to Commerce management tools must also be given access to the control panel—but you can design your roles such that those users don’t implicitly have control over other content types or plugins.

![Screenshot of General permissions with an “Access Craft Commerce” checkbox under “Access the control panel”](../images/general-permissions.png =375x375)
:::

### Manage _Product Type Name_ products

Whether the user can manage products, with each product type having its own **Create** and **Delete** permissions.

### Manage orders

Whether the user can access and interact with orders.

#### Edit orders

Whether the user is allowed to create and edit orders in the control panel.

#### Delete orders

Whether a user may delete orders.

#### Capture payment

Whether the user may click the “Capture” button on an authorized transaction.

#### Refund payment

Whether the user may click the “Refund” button on a successful payment.

### Manage subscriptions

Whether the user can see [subscriptions](../system/subscriptions.md), refresh subscription payments, and cancel subscriptions.

### Manage subscription plans

Create, update, and delete subscription plans.

### Manage inventory stock levels

Set and adjust [inventory levels](../system/inventory.md) for any purchasable.

### Manage inventory locations

Create, update, and delete inventory [locations](../system/inventory.md#locations).

### Manage inventory transfers

Draft, execute, and receive inventory [transfers](../system/inventory.md#transfers).

### Manage store settings

Enables access to settings within the **Store Management** screens, but doesn’t grant any specific permissions.

#### Store general settings

Edit store-specific options in <Journey path="Commerce, Store Management, Store, General" />, including the [store location](../system/addresses.md), markets, and available inventory locations.

#### Payment currencies

Add and remove payment currencies available to a store.

#### Manage shipping

Create, edit, and delete the following:

- Shipping methods
- Shipping rules
- Shipping categories
- Shipping zones

#### Manage taxes

Create, edit, and delete tax rates, zones, and categories.

#### Manage promotions

Edit sales
:   Whether the user can edit existing sales.

Create sales
:   Whether the user can create new sales.

Delete sales
:   Whether the user can delete sales.

Edit catalog pricing rules
:   Whether the user can edit existing catalog pricing rules.

Create catalog pricing rules
:   Whether the user can add new catalog pricing rules.

Delete catalog pricing rules 
:   Whether the user can delete existing catalog pricing rules.

    ::: warning
    Note that a user with the **Edit** permission can still disable a catalog pricing rule, which may have the same net effect for customers (except that it can be easily reverted, later).
    :::

Edit discounts
:   Whether the user can edit existing discounts.

Create discounts
:   Whether the user can create new discounts.

Delete discounts
:   Whether the user can delete discounts.

### Manage donation settings

Edit the donation purchasable settings in <Journey path="Commerce, Donations" />.
