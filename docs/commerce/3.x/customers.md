# Customers

Customers are stored in Craft Commerce for the purpose of having a single place to relate orders to.

A customer will always be created during checkout if they are a guest, or if the user is logged in, the customer related to the logged in user will be used.

Logged-in users can only be a single customer in the system. A person may checkout as a guest customer with the same email multiple times, and a new guest customer will be created each time. After an ordered is completed customers are consolidated so there is only ever one customer per email address.

After a user is registered and verified, whenever they log in, all guest orders that used the email address belonging to that user are transferred to the logged in user. This means, even if a registered user makes an anonymous/guest order, the next time they log in, the order will appear in their order history, as long as they used the same email address.

Customers can be found in the control panel by navigating to Commerce → Customers.

## Customer List

The customer list is a paginated data set of all customers in the system that is linked to a user and/or has completed orders. You are able to search the customer list by name, email, address or order reference/number.

Customers that are related to a user account will show a link to their respective user in the user column of the table.

You can see information for each [customer](#customer) by clicking on their email address.

##Customer

The customer view will show you important information about the customer. The information contained on this page is the same data that is shown on the [customer info tab](#user-customer-info-tab).

### Addresses

The addresses for a customer can be reached via the customer view. Selecting an address gives you the ability to edit the address.

## User Customer Info Tab

If a user account has a Craft Commerce customer record associated with it, a “Customer Info” tab will be added to their account page in the control panel.

This tab contains the following information:

- **Orders** – A list of previous orders for the customer.
- **Active Carts** – A list of active carts for the customer based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Inactive Carts** – A list of inactive carts for the customer based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Addresses** – A list of the customer's addresses with the ability to edit or delete.
- **Subscriptions** – A list of the customer's subscriptions.

The visibility of this tab can be controlled with the [Commerce::\$showCustomerInfoTab](configuration.md#showcustomerinfotab) setting. The tab is shown by default.
