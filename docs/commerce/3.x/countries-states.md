# Countries & States

Because billing and shipping addresses are important for orders, Commerce provides convenient, flexible support for working with whatever countries and states your store needs to support.

When you first install Commerce, a complete set of countries and their related states will be prepopulated. You can see these navigating in the control panel to **Store Settings** → **Countries & States**. From there, you can remove any countries you don’t want to be available for checkout, reorder those countries, and add/edit any states within and optionally designate the state as a required field on a per-country basis.

::: tip
Starting your own country? No problem! Choose **New Country** from the **Countries & States** list to enter your own country name, ISO, and individual states.
:::

## Fetching Countries

The following methods are available for getting country data.

- [allEnabledCountries](#craft-commerce-countries-allenabledcountriesaslist)
- [allEnabledCountriesAsList](#craft-commerce-countries-allenabledcountriesaslist)
- [allCountries](#craft-commerce-countries-allcountries)
- [allCountriesAsList](#craft-commerce-countries-allcountriesaslist)
- [countriesByShippingZoneId](#craft-commerce-countries-countriesbyshippingzoneid)
- [countriesByTaxZoneId](#craft-commerce-countries-countriesbytaxzoneid)
- [countryById](#craft-commerce-countries-countrybyid)
- [countryByIso](#craft-commerce-countries-countrybyiso)

### allEnabledCountries

Returns an array of <commerce3:craft\commerce\models\Country> objects representing all countries that have been enabled.

::: code
```twig
{% set countries = craft.commerce.countries.allEnabledCountries %}
<select>
{% for country in countries %}
    <option value="{{ country.id }}">
        {{- country.name -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllEnabledCountries();

foreach ($countries as $country) {
    // $country->id
    // $country->name
}
```
:::

### craft.commerce.countries.allEnabledCountriesAsList

Returns a key-value array representing all countries that have been enabled. Each key is the country ID and the value is the full name of that country.

Data returned as `[32:'Australia', 72:'United States']`.

::: code
```twig
{% set countries = craft.commerce.countries.allEnabledCountriesAsList %}
<select>
{% for id, countryName in countries %}
    <option value="{{ id }}">
        {{- countryName -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllEnabledCountriesAsList();

foreach ($countries as $id => $countryName) {
    // $id
    // $countryName
}
```
:::

### craft.commerce.countries.allCountries

Returns an array of <commerce3:craft\commerce\models\Country> objects representing all countries defined in the system regardless of whether they’re enabled.

::: code
```twig
{% set countries = craft.commerce.countries.allCountries %}
<select name="country">
{% for country in countries %}
    <option value="{{ country.id }}">
        {{- country.name -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllCountries();

foreach ($countries as $country) {
    // $country->id
    // $country->name
}
```
:::

### craft.commerce.countries.allCountriesAsList

Returns a key-value array representing all countries defined in the system regardless of whether they’re enabled. Each key is the country ID and the value is the full name of that country.

Data returned as `[32:'Australia', 72:'United States']`.

::: code
```twig
{% set countries = craft.commerce.countries.allCountriesAsList %}
<select>
{% for id, countryName in countries %}
    <option value="{{ id }}">
        {{- countryName -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllCountriesAsList();

foreach ($countries as $id => $countryName) {
    // $id
    // $countryName
}
```
:::

### craft.commerce.countries.countriesByShippingZoneId

Returns an array of <commerce3:craft\commerce\models\Country> objects representing all countries within the specified shipping zone, per the shipping zone’s ID.

::: code
```twig
{% set countries = craft.commerce.countries
    .countriesByShippingZoneId(shippingZoneId) %}
<select name="country">
{% for country in countries %}
    <option value="{{ country.id }}">
        {{- country.name -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllCountriesByShippingZoneId($shippingZoneId);

foreach ($countries as $country) {
    // $country->id
    // $country->name
}
```
:::

### craft.commerce.countries.countriesByTaxZoneId

Returns an array of <commerce3:craft\commerce\models\Country> objects representing all countries within the specified tax zone, per the tax zone’s ID.

::: code
```twig
{% set countries = craft.commerce.countries.countriesByTaxZoneId(taxZoneId) %}
<select name="country">
{% for country in countries %}
    <option value="{{ country.id }}">
        {{- country.name -}}
    </option>
{% endfor %}
</select>
```
```php
$countries = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getAllCountriesByTaxZoneId($taxZoneId);

foreach ($countries as $country) {
    // $country->id
    // $country->name
}
```
:::

### craft.commerce.countries.countryById

Returns a <commerce3:craft\commerce\models\Country> object for the provided country ID.

::: code
```twig
{% set country = craft.commerce.countries.countryById(countryId) %}
{# country.id #}
{# country.name #}
```
```php
$country = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getCountryById($countryId);
// $country->id
// $country->name
```
:::

### craft.commerce.countries.countryByIso

Returns a <commerce3:craft\commerce\models\Country> object for the provided two-character country ISO code.

::: code
```twig
{% set country = craft.commerce.countries.countryByIso('AU') %}
{# country.id #}
{# country.name #}
```
```php
$country = \craft\commerce\Plugin::getInstance()
    ->getCountries()
    ->getCountryByIso('AU');
// $country->id
// $country->name
```
:::

## Fetching States

The following methods are available for getting country data.

- [allEnabledStates](#craft-commerce-states-allenabledstates)
- [allEnabledStatesAsList](#craft-commerce-states-allenabledstatesaslist)
- [allEnabledStatesAsListGroupedByCountryId](#craft-commerce-states-allenabledstatesaslistgroupedbycountryid)
- [allStates](#craft-commerce-states-allstates)
- [allStatesAsList](#craft-commerce-states-allstatesaslist)
- [allStatesAsListGroupedByCountryId](#craft-commerce-states-allstatesaslistgroupedbycountryid)
- [statesByCountryId](#craft-commerce-states-statesbycountryid)
- [statesByShippingZoneId](#craft-commerce-states-statesbyshippingzoneid)
- [statesByTaxZoneId](#craft-commerce-states-statesbytaxzoneid)
- [stateByAbbreviation](#craft-commerce-states-statebyabbreviation)
- [stateById](#craft-commerce-states-statebyid)

### craft.commerce.states.allEnabledStates

Returns an array of <commerce3:craft\commerce\models\State> objects representing all states that have been enabled.

::: code
```twig
<select>
{% for state in craft.commerce.states.allEnabledStates %}
    <option value="{{ state.id }}">
        {{- state.name -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->getAllEnabledStates();
foreach ($states as $state) {
    // $state->id
    // $state->name
}
```
:::

### craft.commerce.states.allEnabledStatesAsList

Returns a key-value array representing all states that have been enabled. Each key is the state ID and the value is the full name of that state.

Data returned as `[1:'Australian Capital Territory', 2:'New South Wales']`.

::: code
```twig
{% set states = craft.commerce.states.allEnabledStatesAsList %}
<select>
{% for id, stateName in states %}
    <option value="{{ id }}">
        {{- stateName -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->getAllEnabledStatesAsList();

foreach ($states as $id => $stateName) {
    // $id
    // $stateName
}
```
:::

### craft.commerce.states.allEnabledStatesAsListGroupedByCountryId

Returns an array of <commerce3:craft\commerce\models\State> object arrays, indexed by country IDs.

Data returned as `[72:[3:'California', 4:'Washington'],32:[7:'New South Wales']]`.

::: code
```twig
{% set statesByCountryId = craft.commerce.states
    .allEnabledStatesAsListGroupedByCountryId %}
<select>
{% for countryId, states in statesByCountryId %}
    {% set country = craft.commerce.countries.getCountryById(countryId) %}
    <optgroup label="{{ country.name }}">
    {% for stateId, stateName in states %}
        <option value="{{ stateId }}">{{ stateName }}</option>
    {% endfor %}
  </optgroup>
{% endfor %}
</select>
```
```php
$commerce = \craft\commerce\Plugin::getInstance();

$statesByCountryId = $commerce->getStates()
    ->getAllEnabledStatesAsListGroupedByCountryId();

foreach ($statesByCountryId as $countryId => $states) {
    $country = $commerce->getCountries()->getCountryById($countryId);
    foreach ($states as $stateId => $stateName) {
        // $country->name
        // $stateId
        // $stateName
    }
}
```
:::

### craft.commerce.states.allStates

Returns an array of <commerce3:craft\commerce\models\State> objects representing all states defined in the system regardless of whether they’re enabled.

::: code
```twig
<select>
{% for state in craft.commerce.states.allStates %}
    <option value="{{ state.id }}">
        {{- state.name -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->getAllStates();
foreach ($states as $state) {
    // $state->id
    // $state->name
}
```
:::

### craft.commerce.states.allStatesAsList

Returns a key-value array representing all states defined in the system regardless of whether they’re enabled. Each key is the state ID and the value is the full name of that state.

Data returned as `[1:'Australian Capital Territory', 2:'New South Wales']`.

::: code
```twig
{% set states = craft.commerce.states.allStatesAsList %}
<select>
{% for id, stateName in states %}
    <option value="{{ id }}">
        {{- stateName -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->getAllStatesAsList);

foreach ($states as $id => $stateName) {
    // $id
    // $stateName
}
```
:::

### craft.commerce.states.statesByCountryId

Returns an array of <commerce3:craft\commerce\models\State> objects representing all states belonging to the provided country ID, ignoring whether the country or any state is enabled.

::: code
```twig
<select>
{% for state in craft.commerce.states.statesByCountryId(countryId) %}
    <option value="{{ state.id }}">
        {{- state.name -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->statesByCountryId($countryId);
foreach ($states as $state) {
    // $state->id
    // $state->name
}
```
:::

### craft.commerce.states.statesByShippingZoneId

Returns an array of <commerce3:craft\commerce\models\State> objects representing all states belonging to the provided shipping zone by the provided zone ID.

::: code
```twig
<select>
{% for state in craft.commerce.states.statesByShippingZoneId(shippingZoneId) %}
    <option value="{{ state.id }}">
        {{- state.name -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->statesByShippingZoneId($shippingZoneId);
foreach ($states as $state) {
    // $state->id
    // $state->name
}
```
:::

### craft.commerce.states.statesByTaxZoneId

Returns an array of <commerce3:craft\commerce\models\State> objects representing all states belonging to the provided tax zone by the provided zone ID.

::: code
```twig
<select>
{% for state in craft.commerce.states.statesByTaxZoneId(taxZoneId) %}
    <option value="{{ state.id }}">
        {{- state.name -}}
    </option>
{% endfor %}
</select>
```
```php
$states = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->statesByTaxZoneId($taxZoneId);
foreach ($states as $state) {
    // $state->id
    // $state->name
}
```
:::

### craft.commerce.states.stateByAbbreviation

Returns a <commerce3:craft\commerce\models\State> object for the provided country ID and state abbreviation.

::: code
```twig
{% set state = craft.commerce.states.stateByAbbreviation(countryId, 'ACT') %}
{# state.id #}
{# state.name #}
```
```php
$state = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->getStateByAbbreviation($countryId, 'ACT');
// $state->id
// $state->name
```
:::

### craft.commerce.states.stateById

Returns a <commerce3:craft\commerce\models\State> object for the provided state ID.

::: code
```twig
{% set state = craft.commerce.states.stateById(stateId) %}
{# state.id #}
{# state.name #}
```
```php
$state = \craft\commerce\Plugin::getInstance()
    ->getStates()
    ->stateById($stateId);
// $state->id
// $state->name
```
:::
