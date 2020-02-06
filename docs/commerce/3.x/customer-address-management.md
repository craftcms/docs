# Customer Address Management

When a customer checks out with a new address, the address is added to their address book.

If the customer is a guest, they have no need to manage an address book.

Customers can only add and remove addresses from the front end while they are logged in.

See [the Customer model](api:craft\commerce\models\Customer) to learn about the methods available to retrieve customer address data e.g. [Customer::getPrimaryBillingAddress()](<api:craft\commerce\models\Customer::getPrimaryBillingAddress()>), [Customer::getPrimaryShippingAddress()](<api:craft\commerce\models\Customer::getPrimaryShippingAddress()>) and [Customer::getAddressById()](<api:craft\commerce\models\Customer::getAddressById()>).

## Get all the current customer’s addresses

```twig
{% set addresses = craft.commerce.customer.addresses %}
{% for address in addresses %}
  {{ address.firstName }}<br/>
  {# ... #}
{% endfor %}
```

See <api:craft\commerce\models\Address> to learn about the fields available on an address.

## Get a current customer’s address by its ID

```twig
{% set address = craft.commerce.customer.getAddressById(id) %}
```

## Creating or updating a customer address

The form action for adding or updating a customer’s address is `commerce/customer-addresses/save`.

This example would add a new address for the customer with the details in the `address` form field:

```twig
<form method="post">
  <input type="hidden" name="action" value="commerce/customer-addresses/save">
  {{ redirectInput('commerce/customer/addresses') }}
  {{ csrfInput() }}
  <input type="text" name="address[firstName]" value="{{ address is defined ? address.firstName : '' }}">
  <input type="text" name="address[lastName]" value="{{ address is defined ? address.lastName : '' }}">
  {# ... #}
  <input type="submit" value="Save"/>
</form>
```

To update an existing address, include its ID for the value of a `address[id]` parameter:

```twig{5}
<form method="post">
  <input type="hidden" name="action" value="commerce/customer-addresses/save">
  {{ redirectInput('commerce/customer/addresses') }}
  {{ csrfInput() }}
  <input type="text" name="address[id]" value="{{ address.id }}">
  <input type="text" name="address[firstName]" value="{{ address.firstName }}">
  <input type="text" name="address[lastName]" value="{{ address.lastName }}">
  {# ... #}
  <input type="submit" value="Save"/>
</form>
```

## Deleting a customer's address

The form action for deleting a customer address is `commerce/customer-addresses/delete`. All that’s needed is the address ID:

```twig
<form method="post">
  <input type="hidden" name="action" value="commerce/customer-addresses/delete">
  {{ redirectInput('commerce/customer/addresses') }}
  {{ csrfInput() }}
  <input type="hidden" name="id" value="{{ address.id }}"/>
  <input type="submit" value="delete"/>
</form>
```

::: warning
Deleting an address that is currently applied as the billing or shipping address of the current customer’s cart will result in the addresses on the cart being removed.
:::
