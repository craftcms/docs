# Customer Address Management

When a customer checks out with a new address, the address is added to their address book.

If the customer is a guest, they have no need to manage an address book.

Customers can only add and remove addresses from the front end while they are logged in.

See [the Customer model](commerce3:craft\commerce\models\Customer) to learn about the methods available to retrieve customer address data e.g. [Customer::getPrimaryBillingAddress()](<commerce3:craft\commerce\models\Customer::getPrimaryBillingAddress()>), [Customer::getPrimaryShippingAddress()](<commerce3:craft\commerce\models\Customer::getPrimaryShippingAddress()>) and [Customer::getAddressById()](<commerce3:craft\commerce\models\Customer::getAddressById()>).

## Get all the current customer’s addresses

```twig
{% set addresses = craft.commerce.customers.customer.addresses %}
{% for address in addresses %}
    {{ address.firstName }}<br/>
    {# ... #}
{% endfor %}
```

See <commerce3:craft\commerce\models\Address> to learn about the fields available on an address.

## Get a current customer’s address by its ID

```twig
{% set address = craft.commerce.customers.customer.getAddressById(id) %}
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
If an address is designated for shipping or billing in a cart, edits will carry over to the cart before checkout. Deleting an address will remove it from the cart and require further user action to complete the order.
:::

## Validating addressses

Commerce saves customer address data without any validation. If you’d like to provide your own validation rules, you either do that on the front end or use a custom plugin or module to provide server side validation.

::: tip
If you’d like to provide your own server side validation, make sure you’re comfortable [creating a plugin or module for Craft CMS](https://craftcms.com/docs/3.x/extend/).
:::

If you write your own plugin or module, you’ll want to use its `init()` method to subscribe to the event that’s triggered when the `Address` model collects it rules prior to attempting validation. Your event listener can add additional [validation rules](https://www.yiiframework.com/doc/guide/2.0/en/input-validation#declaring-rules) for the Address model.

In this example, a new rule is added to make `firstName` and `lastName` required:

```php
use craft\commerce\models\Address;
use craft\base\Model;
use craft\events\DefineRulesEvent;

Event::on(
    Address::class,
    Model::EVENT_DEFINE_RULES,
    function(DefineRulesEvent $event) {
        $rules = $event->rules;
        $rules[] = [['firstName', 'lastName'], 'required'];
        $event->rules = $rules;
    }
);
```

In any of the above examples that post to the `commerce/customer-addresses/save` action, you would access validation errors in your template like any other model:

```twig
{% if address %}
  {# gets all validation errors for the address #}
  {% set errors = address.getErrors() %}

  {# gets the `firstName` error for the address #}
  {% set firstNameErrors = address.getErrors('firstName') %}
{% endif %}
```

For a complete template example that outputs individual field validation errors, see [shop/_includes/addresses/form.twig](https://github.com/craftcms/commerce/tree/master/example-templates/shop/_includes/addresses/form.twig) in the [example templates](example-templates.md).
