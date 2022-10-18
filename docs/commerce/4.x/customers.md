# Customers

Commerce leverages Craft’s native [User](/4.x/users.md) element to represent and track customers.

As soon as an email address is added to an [Order](./orders-carts.md), a customer is created or attached—but because some customers remain guests through checkout, the underlying user may never become [credentialed](#customers-and-users).

## User Customer Info Tab

Go to **Users** in Craft’s global navigation to see a complete list of the site’s users. Clicking any user’s name will take you to their edit screen, where you’ll find a **Commerce** tab:

![Screenshot of user edit screen with four tabs: Account, Content, Permissions, and Commerce](./images/users-commerce-tab.png)

This tab includes the following:

- **Orders** – a searchable list of the customer’s orders.
- **Active Carts** – a list of the customer’s active carts based on the [activeCartDuration](config-settings.md#activecartduration) setting.
- **Inactive Carts** – a list of the customer’s inactive carts based on the [activeCartDuration](config-settings.md#activecartduration) setting.
- **Subscriptions** – a list of the customer’s subscriptions.

This tab is shown by default but you can control its visibility with the [showCustomerInfoTab](config-settings.md#showeditusercommercetab) setting.

::: tip
If you’d like to be able to see and manage customer addresses from the control panel, [include the Addresses field](/4.x/addresses.md#setup) in the User Fields layout.
:::

## Customers and Users

A customer with saved login information is considered a [credentialed](/4.x/users.md#active-and-inactive-users) user. Conversely, customers who check out as guests are set up as inactive users.

### Guest Checkout

If someone visits the store and checks out as a guest, a new inactive user is created and related to the order. Future orders using the same email address will be consolidated under that user. 

### User Checkout

If the customer is logged in, the order will be associated with that user the moment the cart is created.

### Registration at Checkout <badge text="Pro" type="edition" vertical="middle">Pro</badge>

A guest can register for an account before or after checkout using the normal [Craft user registration form](kb:front-end-user-accounts).

You can also offer the option to complete registration at checkout by setting the `registerUserOnOrderComplete` param when [updating a cart](update-cart-customer.md#registering-a-guest-customer-as-a-user).

If a customer chooses to register an account on order completion, an activation link is sent to the email on file.

::: tip
The Commerce [example templates](https://github.com/craftcms/commerce/blob/main/example-templates/dist/shop/checkout/payment.twig) display a “Create an account” checkbox at the payment stage.
:::
