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

Whether the user is able to access the Commerce section of the control panel. (Unlike the others, you’ll find it under Craft’s “Access the control panel” permission.)

### Manage products

Whether the user can see, create, save, edit, and delete products by product type.

### Manage orders

Whether the user can access and interact with orders.

#### Edit orders <badge text="Pro" type="edition" vertical="middle" title="Commerce Pro only" />

Whether the user is allowed to create and edit orders in the control panel using Commerce Pro.

#### Delete orders

Whether a user may delete orders.

#### Capture payment

Whether the user may click the “Capture” button on an authorized transaction.

#### Refund payment

Whether the user may click the “Refund” button on a successful payment.

### Manage customers

Whether the user can see the customers listing and individual customer information.

### Manage promotions

Whether the user can see, create and edit discounts and sales.

### Manage subscriptions

Whether the user can see subscriptions, refresh subscription payments, and cancel subscriptions.

### Manage shipping <badge text="Pro" type="edition" vertical="middle" title="Commerce Pro only" />

Whether the user can create, edit, and delete the following:

- Shipping methods
- Shipping rules
- Shipping categories
- Shipping zones

### Manage taxes <badge text="Pro" type="edition" vertical="middle" title="Commerce Pro only" />

Whether the user can create, edit, and delete tax zones and tax categories.

### Manage store settings

Whether the user may change settings in Commerce’s “Store Settings” area.
