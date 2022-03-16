# Addresses

## Querying Addresses

You can fetch addresses in your templates or PHP code using **address queries**.

::: code
```twig
{# Create a new addresses query #}
{% set myAddressQuery = craft.addresses() %}
```
```php
// Create a new address query
$myAddressQuery = \craft\elements\Address::find();
```
:::

### Parameters

Address queries support the following parameters:

<!-- BEGIN PARAMS -->
<!-- END PARAMS -->
