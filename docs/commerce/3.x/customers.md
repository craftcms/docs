# Customers

With Craft Commerce, a _Customer_ is a model representing a person who may place an order.

That person could’ve placed an order as a guest or be a registered user with an associated Craft [user account](https://craftcms.com/docs/3.x/users.html) for logging in and making orders with saved information.

Customers can be found in the control panel by navigating to **Commerce** → **Customers**.

## Customer List

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

A “Customer Info” tab will be available on every user’s account page in the control panel.

This tab contains the following information:

- **Orders**: list of previous orders for the customer.
- **Active Carts**: list of the customer’s active carts based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Inactive Carts**: list of the customer’s inactive carts based on the [Commerce::\$activeCartDuration](configuration.md#activecartduration) setting.
- **Addresses**: list of the customer’s addresses, which can be edited and deleted.
- **Subscriptions**: list of the customer's subscriptions.

The visibility of this tab can be controlled with the [Commerce::\$showCustomerInfoTab](configuration.md#showcustomerinfotab) setting. The tab is shown by default.

## Customers and Users

A customer with saved login information also has a Craft user account—but not *all* customers have user accounts.

Unlike a Craft user, a customer may be a guest without saved login information and thus not have a user account.

Every Craft user, however, has a customer record by default. This is true even if the user has never created an order.

::: tip
The 1:1 user-to-customer relationship is new to Commerce 3. A migration from Commerce 2 will create a new customer record for any existing Craft user that doesn’t already have one.
:::

Commerce consolidates customers by email address on order completion.

### Customer Flow

#### Guest Checkout

If someone visits the store and checks out as a guest, a new customer record is saved and related to the order.

If there’s already a customer record with the same email address, the order will be associated with the original customer record and the new orphaned one will be marked for garbage collection.

If the guest’s email address matches a Craft user account, the order will be associated with that user instead—via that user’s customer record—and appear in that user’s order history.

#### User Checkout

If the customer is logged in, the order will be associated with that user the moment the cart is created and on through completion.

#### Guest Into User

A customer can register for an account before or after checkout using a normal [Craft user registration form](https://craftcms.com/knowledge-base/front-end-user-accounts).

You can also offer the option to register a user account during the checkout process by setting the `registerUserOnOrderComplete` order property to `true`. (See the [Update Cart Customer](update-cart-customer.md#registering-a-guest-customer-as-a-user) page for examples.)

If a customer chooses to register an account on order completion, a Craft user account is created and the customer will receive an 
activation link via email. Commerce requires several conditions to be met before creating the account:

- The store must be using Commerce Pro.
- The customer must be a guest and not a logged in user.
- The order cannot already be associated with a user account.
- There cannot already be a user account with the email address used on the order.
- The order must have an email address—which likely would have been caught earlier in the checkout process.

If any of the above fail, the user account will not be created; errors will be logged but not displayed or returned.

The Commerce [example templates](https://github.com/craftcms/commerce/blob/master/example-templates/shop/checkout/payment.twig) display a “Register me for a user account” checkbox at the payment stage—but only if a user account doesn’t already exist for the email address on the cart:

```twig
{# Get a user account using the same email address as the cart #}
{% set user = craft.users.email(cart.email).one() %}
{% if not user %}
    <label for="registerUserOnOrderComplete">
        <input type="checkbox" name="registerUserOnOrderComplete" value="1" />
        {{ "Register me for a user account"|t }}
    </label>
{% endif %}
```