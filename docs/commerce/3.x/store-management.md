# Store Management

Craft Commerce adds user permissions you can customize in any of your [Craft CMS user groups](/3.x/user-management.md).

## Store Managers

While you have complete control over any user groups and permissions you establish for a Craft project, most projects tend to include two types of users: technical administrators and content editors.

Technical administrators are most often developers that use admin accounts for full system access, while content editors have control panel access use the control panel with more limited permissions to manage content without changing system configuration.

Commerce stores typically involve another tier of control panel users we’ll refer to throughout the documentation as “Store Managers”. These are users that have permissions tailored for managing the operation of a store, working with products and orders and pricing. The role is more permissive than that of a content editor, without full admin access to settings that could interrupt the functionality of the store.

The exact permissions you choose for “Store Managers” will depend on the needs of your organization and site.

## Permissions

The following permissions are available for users or user groups to have for Commerce:

### Access Craft Commerce

This permission lets the user get access to the Commerce section of the control panel.

This permission is found under Craft’s “Access the control panel” permission.

### Manage products

This permission lets the user:

- See products
- Create products
- Save products
- Edit products
- Delete products

### Manage orders

This permission lets the user see orders.

#### Edit orders

This permission lets the user:

- Create orders <badge text="Pro" title="Commerce Pro only" />
- Edit orders <badge text="Pro" title="Commerce Pro only" />

#### Delete orders

This permission lets the user delete an order.

#### Capture payment

This permission lets the user click the capture button on an authorized transaction.

#### Refund payment

This permission lets the user click the refund button on a successful payment.

### Manage customers

This permission lets the user:

- See the customers listing
- See customer info

### Manage promotions

This permission lets the user:

- See discounts and sales
- Create & Edit discounts and sales

### Manage subscriptions

This permission lets the user:

- See subscriptions
- Refresh payments on subscriptions
- Cancel subscriptions

### Manage shipping

This permission lets the user:

- Create, edit and delete shipping methods
- Create, edit and delete shipping rules
- Create, edit and delete shipping categories
- Create, edit and delete shipping zones

### Manage taxes

This permission lets the user:
- Create, edit and delete tax zones
- Create, edit and delete tax categories
- Create, edit and delete tax zones

### Manage store settings

This permission lets the user change settings for the commerce.