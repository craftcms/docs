# Customers

With Craft Commerce, a _Customer_ is a model representing a person who placed an order.

That person may have placed an order as a guest or logged in with an account via a related [user account](https://docs.craftcms.com/v3/users.html).

Commerce will consolidate customers by email address. A person may checkout as a guest customer with the same email multiple times, and a new guest customer will be created each time. After an order is completed, customers are consolidated so there is only ever one customer per email address.

Once a user is registered and verified, orders on their email address will be consolidated whenever they log in. Any guest orders with the user’s email address are transferred to the user. As a result, even future anonymous/guest orders with that email address will appear in the user’s order history.

Customers can be found in the control panel by navigating to Commerce → Customers.

## Customer List

The customer list is a paginated data set of all customers in the system linked to a user or having completed orders. The customer list can be searched by name, email, address, and order reference/number.

Customers having user accounts will appear with a link to the respective Craft user in the listing table.

Choose any customer’s You can see information for each customer by clicking on their email address.

## Customer

The customer view will show you important information about the customer. The information contained on this page is the same data that is shown on the [customer info tab](#user-customer-info-tab).

### Addresses

The addresses for a customer can be reached via the customer view. Select any address to edit it.

## User Customer Info Tab

If a user account has a related Craft Commerce customer record, a “Customer Info” tab will be added to their account page in the control panel.

This tab contains the following information:

- **Orders**: list of previous orders for the customer.
- **Active Carts**: list of the customer’s active carts based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Inactive Carts**: list of the customer’s inactive carts based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Addresses**: list of the customer’s addresses, which can be edited and deleted.
- **Subscriptions**: list of the customer's subscriptions.

The visibility of this tab can be controlled with the [Commerce::\$showCustomerInfoTab](configuration.md#showcustomerinfotab) setting. The tab is shown by default.
