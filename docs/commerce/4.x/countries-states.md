# Countries & States

Craft Commerce takes advantage of Craft’s built-in [addresses](/4.x/addresses.md) support for managing store and order addresses, and includes tools for working with them.

As you’re building your store, you’ll most likely need to fetch two different kinds of address data:

1. Store-specific addresses configured in Commerce, like the store location and markets.\
(Set these via **Commerce** → **Store Settings** → **Store**.)
2. Global lists of countries and states, provided by Craft’s [address repository](/4.x/addresses.md#address-repository).

## Fetching Countries

You can fetch countries within the configured Commerce markets, shipping zones, and tax zones, or more broadly from the Craft CMS address respository.

### Store Market Countries

The [store model](commerce4:craft\commerce\models\Store)’s `getCountriesList()` method returns a key-value array of countries in the store’s configured market. The key will be the country’s two-character ISO code and the value will be its name:

::: code
```twig
{% set storeCountries = craft.commerce
  .getStore()
  .getStore()
  .getCountriesList() %}

<select>
{% for code, name in storeCountries %}
  <option value="{{ code }}">
    {{- name -}}
  </option>
{% endfor %}
</select>
```
```php
$storeCountries = \craft\commerce\Plugin::getInstance()
  ->getStore()
  ->getStore()
  ->getCountriesList();

foreach ($storeCountries as $code => $name) {
    // $code
    // $name
}
```
:::

### Country by ID

If you need to get information for a single country, you can pass its two-character code (and optional locale string) to Craft’s address repository:

::: code
```twig
{# @var country CommerceGuys\Addressing\Country\Country #}
{% set country = craft.app.getAddresses().countryRepository.get('US') %}
```
```php
/** @var CommerceGuys\Addressing\Country\Country $country **/
$country = Craft::$app->getAddresses()->countryRepository->get('US') %}
```
:::

The resulting [Country](https://github.com/commerceguys/addressing/blob/master/src/Country/Country.php) object includes additional code, labeling, and locale information.

### All Countries

You can fetch a list of _all_ countries from Craft’s address repository:

::: code
```twig
{% set countries = craft.app.getAddresses().countryRepository.getList() %}
<select name="myCountry">
  {% for code, name in countries %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>
```
```php
$countries = Craft::$app->getAddresses()->countryRepository->getList() %}
foreach ($countries as $code => $name) {
    // $code
    // $name
}
```
:::

::: tip
Use `getAll()` rather than `getList()` to get back an array of [Country](https://github.com/commerceguys/addressing/blob/master/src/Country/Country.php) objects.
:::

## Fetching States

States are represented by the more general concept of _administrative areas_ in Craft CMS and Craft Commerce. You can fetch states within the configured Commerce markets, or generic lists directly from the Craft CMS address repository.

### Store Market Administrative Areas

You can fetch the states that are part of Commerce’s configured store market via the [store model](commerce4:craft\commerce\models\Store). Results will be keyed by country code:

::: code
```twig
{% set storeStates = craft.commerce
  .getStore()
  .getStore()
  .getAdministrativeAreasListByCountryCode() %}

{% for countryCode, states in storeStates %}
  <h2>{{ countryCode }}</h2>
  <select name="myState">
    {% for code, name in states %}
      <option value="{{ code }}">{{ name }}</option>
    {% endfor %}
  </select>
{% endfor %}
```
```php
$storeStates = \craft\commerce\Plugin::getInstance()
    ->getStore()
    ->getStore()
    ->getAdministrativeAreasListByCountryCode();

foreach ($storeStates as $countryCode => $states) {
  // $countryCode
  foreach ($states as $code => $name) {
    // $code
    // $name
  }
}
```
:::

### Administrative Area by ID

You can fetch a single state’s data, represented by a _subdivision_, by providing its two-character ISO code and parent(s) to the subdivision repository:

::: code
```twig
{# @var state CommerceGuys\Addressing\Subdivision\Subdivision #}
{% set state = craft.app.getAddresses().subdivisionRepository.get('OR', ['US']) %}
```
```php
/** @var CommerceGuys\Addressing\Subdivision\Subdivision $state **/
$state = Craft::$app->getAddresses()->subdivisionRepository->get('OR', ['US']) %}
```
:::

The resulting [Subdivision](https://github.com/commerceguys/addressing/blob/master/src/Subdivision/Subdivision.php) object includes additional code, labeling, and postal code information as well as the ability to access relevant parents and children.

### All Administrative Areas

You can fetch all states for one or more countries using Craft’s address repository:

::: code
```twig
{% set states = craft.app.getAddresses().subdivisionRepository.getList(['US']) %}
<select name="myState">
  {% for code, name in states %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>
```
```php
$states = Craft::$app->getAddresses()->subdivisionRepository->getList(['US']);

foreach ($states as $code => $name) {
  // $code
  // $name
}
```
:::
