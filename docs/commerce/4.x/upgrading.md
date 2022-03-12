# Upgrading to Commerce 4

Commerce 4 brings the power of element types to customers and addresses and incorporates new Craft 4 features.

Address and Customer models have gone away, replaced by [Address](craft4:craft\elements\Address) and [User](craft4:craft\elements\User) elements. Thanks to the now-integrated [commerceguys/addressing](https://github.com/commerceguys/addressing) library (no relation), address data is now more pleasant to work with no matter what part of the planet you’re on.

::: warning
If you’re upgrading from Commerce 2, see the [Changes in Commerce 3](https://craftcms.com/docs/commerce/3.x/upgrading.html) and upgrade to the latest Commerce 3 version before upgrading to Commerce 4.
:::

## Preparing for the Upgrade

Before you begin, make sure that:

- you’ve reviewed the changes in Commerce 4 [in the changelog](https://github.com/craftcms/commerce/blob/main/CHANGELOG.md#400) and further down this page
- your site’s running at least **Craft 4.0**
- you’ve made sure there are no deprecation warnings from Commerce 3 that need fixing
- your **database and files are backed up** in case everything goes horribly wrong

Once you’ve completed these steps, you’re ready continue with the upgrade process.

## Performing the Upgrade

1. Create a new database backup just in case things go sideways.
2. Edit your project’s `composer.json` to require `"craftcms/commerce": "^4.0.0-beta.1"`.
3. In your terminal, run `composer update`.
4. Run `php craft migrate/up --track=plugin:commerce`.
5. Run `php craft commerce/upgrade`.

Once you’re running the latest version of Craft Commerce, you’ll need to update your templates and any custom code relevant to the topics detailed below.

## Customer → User Transition

In Commerce 4, a customer is always represented by a user element regardless of an order’s status.

The [Order::setEmail()](commerce4:commerce\elements\Order::setEmail()) method was previously required to uniquely identify an order from the beginning. You can still use that and Commerce will ensure a user exists with that email address.

If your controller or service has already ensured a given user exists, however, you can now call [Order::setUser()](commerce4:commerce\elements\Order::setUser()) or directly set the [Order::$userId](commerce4:commerce\elements\Order::$userId) property.

## Countries and States

Commerce 4 replaces manually-managed countries and states with an [Addresses](craft4:craft\services\Addresses) service that provides a full repository of countries and subdivisions (states, provinces, etc.).

Enabled countries from Commerce 3 are migrated to store settings. You can order and remove the list of countries available for selection by your customers in front end in dropdowns:

```twig
{# Craft 3 #}
craft.commerce.countries.allEnabledCountriesAsList

{# Craft 4 #}
craft.commerce.getStore().store.getCountriesList()
```

States can no longer be enabled or disabled for selection in dropdown lists, but the new Order Address Condition (**Commerce** → **Store Settings** → **Store**) allows you to set rules for allowed addresses.

This example is configured to only allow orders having addresses in the United States:

![The Order Address Condition condition builder field, configured with `Administrative Area`, `is one of`, and `United States`.](./images/order-address-condition.png)

With these country and subdivision repositories, Commerce has removed support for managing custom countries and states. The [`commerce/upgrade`](console-commands.md#commerce-upgrade) command migrates any custom countries and states into fields on individual addresses and adds rules to zone and store market condition builders to match those custom country and state values.

Please review your tax and shipping zones. We encourage you to use standardized countries and administrative areas (states) for your zones in the future.

## Address Management

Commerce-specific Address models are now Craft [Address](craft4:craft\elements\Address) elements and can only belong to one owner in the Craft install.

This will almost certainly require changes to your front-end templates, though it comes with several benefits:

- better address formatting defaults
- easier address format customization
- custom address fields can be managed in field layouts—so no more need for `custom1`, `custom2`, etc.

An order’s addresses (estimated and normal billing + shipping) belong solely to that order. If a user designates one of their saved addresses for an order’s shipping or billing, the address will be cloned to that order with references to the original address element stored in `order.sourceBillingAddressId` and `order.sourceShippingAddressId`.

You can use [User::getAddresses()](craft4:craft\elements\User::getAddresses()) to fetch any user’s addresses, including the currently-logged-in user:

::: code
```twig
{% set userAddresses = currentUser.getAddresses() %}
```
```php
$userAddresses = Craft::$app->getUser()->getIdentity()->getAddresses();
```
:::

If you’d like to save a new address to a user’s address book, you must provide an `ownerId`:

```php
$address = new \craft\elements\Address();
$address->setAttributes($addressData);
$address->ownerId = 1;

Craft::$app->getElements()->saveElement($address);
```

### Template Changes

`stateId` and `stateValue` references can be replaced with `administrativeArea`—a key-value array indexed by two-letter codes:

```twig
{# Commerce 3 #}
{% set states = craft.commerce.states.allEnabledStatesAsListGroupedByCountryId %}
{% set options = (countryId and states[countryId] is defined ? states[countryId] : []) %}

{% tag 'select' with { name: modelName ~ '[stateValue]' } %}
  {% for key, option in options %}
    {# @var option \craft\commerce\models\State #}
    {% set optionValue = (stateId ?: '') %}
    {{ tag('option', {
      value: key,
      selected: key == optionValue,
      text: option
    }) }}
  {% endfor %}
{% endtag %}

{# Commerce 4 #}
{% set administrativeAreas = craft.app.getAddresses()
  .getSubdivisionRepository.getList([countryCode]) %}

{% tag 'select' with { name: 'administrativeArea' } %}
  {% for key, option in administrativeAreas %}
    {# @var address \craft\elements\Address #}
    {% set selectedValue = address.administrativeArea ?? '' %}
    {{ tag('option', {
      value: key,
      selected: key == selectedValue,
      text: option
    }) }}
  {% endfor %}
{% endtag %}
```

`city` is now `locality`:

```twig
{# Commerce 3 #}
{# @var model craft\commerce\models\Address #}
{{ input('text', modelName ~ '[city]', model.city ?? '') }}

{# Commerce 4 #}
{# @var address craft\elements\Address #}
{{ input('text', 'locality', address.locality ?? '') }}
```

`zipCode` is now `postalCode`:

```twig
{# Commerce 3 #}
{# @var model craft\commerce\models\Address #}
{{ input('text', modelName ~ '[zipCode]', model.zipCode ?? '') }}

{# Commerce 4 #}
{# @var address craft\elements\Address #}
{{ input('text', 'postalCode', address.postalCode ?? '') }}
```

## Front-End Form Requests and Responses

Ajax responses from `commerce/payment-sources/*` no longer return the payment form error using the `paymentForm` key.
Use `paymentFormErrors` to get the payment form errors instead.

## Payment forms

Gateway payment forms are now namespaced with `paymentForm` and the gateway’s `handle`, to prevent conflicts between normal fields and those required by the gateway.

If you were displaying the payment form on the final checkout step, for example, you would need to make the following change:

```twig
{# Commerce 3 #}
{{ cart.gateway.getPaymentFormHtml(params)|raw }}

{# Commerce 4 #}
{% namespace cart.gateway.handle|commercePaymentFormNamespace %}
  {{ cart.gateway.getPaymentFormHtml(params)|raw }}
{% endnamespace %}
```

This makes it possible to display multiple payment forms on the same page within the same form tag.

## Zones

## Config Settings

- Removed the `orderPdfFilenameFormat` setting.
- Removed the `orderPdfPath` setting.

## Twig

- Removed `json_encode_filtered` Twig filter.

::: tip
Consider having a look at the [example templates](example-templates.md)—they’re compatible with Commerce 4!
:::

## Events

## Controller Actions

## User Permissions

Permissions for managing products have become more granular in Commerce 4:

- `commerce-manageProducts` has been replaced by `commerce-editProductType:<uid>` and nested `commerce-createProducts:<uid>` and `commerce-deleteProducts:<uid>` permissions
