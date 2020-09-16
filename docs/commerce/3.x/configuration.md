# Configuring Commerce

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

- Create orders <Badge text="Pro" title="Commerce Pro only" />
- Edit orders <badge text="Pro" :title="Commerce Pro only" />

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

## Project Config

Craft 3.1 introduced the [**project config**](https://craftcms.com/docs/3.x/project-config.html), a sharable configuration store that makes it easier for developers to collaborate and deploy site changes across multiple environments.

Craft Commerce stores the following items in the project config:

- Commerce general settings
- Email settings
- PDF settings
- Gateways settings
- Order field layout
- Order Statuses
- Product types
- Fields and field groups
- Subscription field layout

Not everything should be stored in the project config. Some items are considered content, which will change in production.

The following items are not stored in the project config:

- Discount promotions
- Sales promotions
- Shipping categories
- Shipping zones
- Shipping methods and rules
- Subscription plans
- Subscriptions elements
- Tax categories
- Tax zones
- Tax rates
- Order elements
- Products & Variant elements
