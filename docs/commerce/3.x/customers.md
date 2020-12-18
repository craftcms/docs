# Customers

With Craft Commerce, a _Customer_ is a model representing a person who may place an order.

That person could have placed an order as a guest, or as a registered user with an associated Craft [user account](https://craftcms.com/docs/3.x/users.html) for logging in and making orders with saved information.

Every Craft user has a customer record by default, even if that user has never created an order.

::: tip
The 1:1 user-to-customer relationship is new to Craft Commerce 3. A migration from Commerce 2 will create a new customer record for any existing Craft user that doesn’t already have one.
:::

Commerce will consolidate customers by email address on order completion.

If a customer checks out as a guest, a new customer record will be created. If a customer record already exists with the same email address, the order will be associated with that existing customer record and the now-orphaned one will be automatically garbage collected. If the guest customer’s email address matches one on a Craft user account, the order will be associated with that user (via the user's customer record) and appear in the user’s order history.

If a customer is logged in, any order will naturally be associated with that user the moment the cart is created and on through completion.

## Customer List

Customers can be found in the control panel by navigating to **Commerce** → **Customers**.

The customer list is a paginated data set of all customers in the system linked to a user or having completed orders. The customer list can be searched by name, email, address, and order reference/number.

Customers having user accounts will appear with a link to the respective Craft user in the listing table.

Choose any customer’s email address to see more information.

## Customer

The customer view will show you important information about the customer. The information contained on this page is the same data that is shown on the [customer info tab](#user-customer-info-tab).

### Addresses

The addresses for a customer can be reached via the customer view. Select any address to edit it.

#### Address Lines

The [address model](commerce3:craft\commerce\models\Address) has a read-only `addressLines` parameter. This is an array that is returned containing the lines of the address.

This parameter is designed to allow consistency when displaying a customer's address both in the front end and in the control panel.

Address lines are used, for example, on the Edit Order page in the control panel. There are examples for [displaying an address](https://github.com/craftcms/commerce/blob/develop/example-templates/shop/_includes/addresses/address.twig) in the [example templates](example-templates.md).

You can use the [defineAddressLines event](events.md#defineaddresslines) to customize the array.

## User Customer Info Tab

A “Customer Info” tab will be available on each user account page in the control panel containing the following information:

- **Orders**: list of previous orders for the customer.
- **Active Carts**: list of the customer’s active carts based on the [activeCartDuration](config-settings.md#activecartduration) setting.
- **Inactive Carts**: list of the customer’s inactive carts based on the [activeCartDuration](config-settings.md#activecartduration) setting.
- **Addresses**: list of the customer’s addresses, which can be edited and deleted.
- **Subscriptions**: list of the customer's subscriptions.

This tab is shown by default, but it can be toggled with the [showCustomerInfoTab](config-settings.md#showcustomerinfotab) setting.
