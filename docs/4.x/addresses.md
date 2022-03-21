# Addresses

Addresses are special elements Craft includes so each [User](users.md) can have an address book.

They’re element types with their own fields, but they’re strictly available to User’s field layouts. Querying addresses and working with their field data, however, is nearly identical to the experience you’d have with any other element type.

## Managing Address Fields

By default, address fields aren’t shown anywhere in the control panel—but they’re ready to customize and add to User field layouts.

In the control panel, navigate to **Settings** → **Users**.

The **User Fields** editor lets you manage whatever fields you’d like to be available for all users:

![Screenshot of User Fields’ Field Layout editor, with an empty layout and an available Addresses field under Native Fields in the sidebar](./images/user-fields.png)

A native **Addresses** field is available to be dragged into the field layout. You could add it to a newly-created “Contact Information” tab, for example, and that tab and its **Addresses** field would be included on every user detail page:

![Screenshot of My Account page with a “Contact Information” tab selected and the “Addresses” field heading with “+ Add an address” just underneath it](./images/my-account-contact-information.png)

Back in **User Settings**, the **Address Fields** editor lets you manage the fields that are part of each address. **Label**, **Country**, and **Address** are included by default, with several other native fields available:

![Screenshot of Address Fields’ Field Layout editor, with an existing Content tab containing Label, Country, and Address fields](./images/address-fields.png)

You can add any native and custom fields to this field layout just like any other element type.

## Address Repository

The [commerceguys/addressing](https://github.com/commerceguys/addressing) library helps power planet-friendly address handling and formatting, and its exhaustive repository of global address information available to any Craft project. If you’d like to get a list of countries, states, or provinces, for example, you can most likely fetch them from these included repositories.

You can use Craft’s [Addresses](craft4:craft\services\Addresses) service to do this from Twig templates and PHP.

Here’s how you can fetch a list of countries, for example:

::: code
```twig
{% set countries = craft.app.getAddresses().countryRepository.getAll() %}
```
```php
$countries = Craft::$app->getAddresses()->countryRepository->getAll();
```
:::

You’ll get an array of [Country](https://github.com/commerceguys/addressing/blob/master/src/Country/Country.php) objects back, which you could use to populate a dropdown menu:

```twig
{% set countryNamesByCode = countries|map((value, key) => "#{value.name}") %}
<select name="myCountry">
  {% for code, name in countryNamesByCode %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>

{# Output:
<select name="myCountry">
  <option value="AF">Afghanistan</option>
  <option value="AX">Åland Islands</option>
  ...
</select>
#}
```

You can similarly get a list of subdivisions, which are hierarchical and can have up to three levels depending on how a given country is organized: _Administrative Area_ → _Locality_ → _Dependent Locality_. We can get all U.S. states by getting subdivisions whose parents are `'US'`:

::: code
```twig
{% set states = craft.app.getAddresses().subdivisionRepository.getAll(['US']) %}
```
```php
$countries = Craft::$app->getAddresses()->subdivisionRepository->getAll(['US']);
```
:::

Each resulting array item is a [Subdivision](https://github.com/commerceguys/addressing/blob/master/src/Subdivision/Subdivision.php) object, which we could treat similarly to the country example above:

```twig
{% set states = craft.app.getAddresses().subdivisionRepository.getAll(['US']) %}
{% set stateNamesByCode = states|map((value, key) => "#{value.name}") %}
<select name="myState">
  {% for code, name in stateNamesByCode %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>

{# Output:
<select name="myState">
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  ...
</select>
#}
```

If we just want a key-value array instead of the extra information that comes with Country and Subdivision objects, we can call either repository’s `getList()` method instead and save ourselves the `|map` step from each example above:

```twig
{% set countries = craft.app.getAddresses().countryRepository.getList() %}
<select name="myCountry">
  {% for code, name in countries %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>

{# Output:
<select name="myCountry">
  <option value="AF">Afghanistan</option>
  <option value="AX">Åland Islands</option>
  ...
</select>
#}

{% set states = craft.app.getAddresses().subdivisionRepository.getList(['US']) %}
<select name="myState">
  {% for code, name in states %}
    <option value="{{ code }}">{{ name }}</option>
  {% endfor %}
</select>

{# Output:
<select name="myState">
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  ...
</select>
#}
```

::: tip
There’s a lot more you can do here, including translated place names, postal codes, timezones, and formatting! Check out the [addressing docs](https://github.com/commerceguys/addressing#data-model) for more details and examples.
:::

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

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can get all the addresses for a user by passing their ID to the `ownerId` parameter.

1. Create an address query with `craft.addresses()`.
2. Set the [`ownerId`](#ownerId) parameter on it.
3. Fetch the addresses with `.collect()`.
4. Loop through the addresses using a [`{% for %}`](https://twig.symfony.com/doc/3.x/tags/for.html) tag.
5. Output preformatted address details with the [`|address`](dev/filters.md#address) filter.

```twig
{# Prepare an element query for addresses belonging to user having ID = 3 #}
{% set myAddressQuery = craft.addresses().ownerId(3) %}

{# Fetch the addresses as a collection #}
{% set addresses = myAddressQuery.collect() %}

{# Loop through addresses and output each one #}
{% for addr in addresses %}
  {{ addr|address }}
{% endfor %}
```

### Parameters

Address queries support the following parameters:

<!-- BEGIN PARAMS -->

| Param                                     | Description
| ----------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| [administrativeArea](#administrativearea) | Narrows the query results based on the administrative area the assets belong to.
| [afterPopulate](#afterpopulate)           | Performs any post-population processing on elements.
| [andRelatedTo](#andrelatedto)             | Narrows the query results to only addresses that are related to certain other elements.
| [asArray](#asarray)                       | Causes the query to return matching addresses as arrays of data, rather than [Address](craft4:craft\elements\Address) objects.
| [cache](#cache)                           | Enables query cache for this Query.
| [clearCachedResult](#clearcachedresult)   | Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).
| [countryCode](#countrycode)               | Narrows the query results based on the country the assets belong to.
| [dateCreated](#datecreated)               | Narrows the query results based on the addresses’ creation dates.
| [dateUpdated](#dateupdated)               | Narrows the query results based on the addresses’ last-updated dates.
| [fixedOrder](#fixedorder)                 | Causes the query results to be returned in the order specified by [id](#id).
| [id](#id)                                 | Narrows the query results based on the addresses’ IDs.
| [ignorePlaceholders](#ignoreplaceholders) | Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).
| [inReverse](#inreverse)                   | Causes the query results to be returned in reverse order.
| [limit](#limit)                           | Determines the number of addresses that should be returned.
| [offset](#offset)                         | Determines how many addresses should be skipped in the results.
| [orderBy](#orderby)                       | Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC`.)
| [owner](#owner)                           | Sets the [ownerId](#ownerid) parameter based on a given owner element.
| [ownerId](#ownerid)                       | Narrows the query results based on the addresses’ owner elements, per their IDs.
| [preferSites](#prefersites)               | If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.
| [relatedTo](#relatedto)                   | Narrows the query results to only addresses that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only addresses that match a search query.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the addresses’ IDs in the `elements_sites` table.
| [trashed](#trashed)                       | Narrows the query results to only addresses that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the addresses’ UIDs.
| [with](#with)                             | Causes the query to return matching addresses eager-loaded with related elements.

#### `administrativeArea`

Narrows the query results based on the administrative area the assets belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'AU'` | with a administrativeArea of `AU`.
| `'not US'` | not in a administrativeArea of `US`.
| `['AU', 'US']` | in a administrativeArea of `AU` or `US`.
| `['not', 'AU', 'US']` | not in a administrativeArea of `AU` or `US`.



::: code
```twig
{# Fetch addresses in the AU #}
{% set addresses = craft.queryFunction()
  .administrativeArea('AU')
  .all() %}
```

```php
// Fetch addresses in the AU
$addresses = \craft\elements\Address::find()
    ->administrativeArea('AU')
    ->all();
```
:::


#### `afterPopulate`

Performs any post-population processing on elements.










#### `andRelatedTo`

Narrows the query results to only addresses that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all addresses that are related to myCategoryA and myCategoryB #}
{% set addresses = craft.queryFunction()
  .relatedTo(myCategoryA)
  .andRelatedTo(myCategoryB)
  .all() %}
```

```php
// Fetch all addresses that are related to $myCategoryA and $myCategoryB
$addresses = \craft\elements\Address::find()
    ->relatedTo($myCategoryA)
    ->andRelatedTo($myCategoryB)
    ->all();
```
:::


#### `asArray`

Causes the query to return matching addresses as arrays of data, rather than [Address](craft4:craft\elements\Address) objects.





::: code
```twig
{# Fetch addresses as arrays #}
{% set addresses = craft.queryFunction()
  .asArray()
  .all() %}
```

```php
// Fetch addresses as arrays
$addresses = \craft\elements\Address::find()
    ->asArray()
    ->all();
```
:::


#### `cache`

Enables query cache for this Query.










#### `clearCachedResult`

Clears the [cached result](https://craftcms.com/docs/4.x/element-queries.html#cache).






#### `countryCode`

Narrows the query results based on the country the assets belong to.

Possible values include:

| Value | Fetches addresses…
| - | -
| `'AU'` | with a countryCode of `AU`.
| `'not US'` | not in a countryCode of `US`.
| `['AU', 'US']` | in a countryCode of `AU` or `US`.
| `['not', 'AU', 'US']` | not in a countryCode of `AU` or `US`.



::: code
```twig
{# Fetch addresses in the AU #}
{% set addresses = craft.queryFunction()
  .countryCode('AU')
  .all() %}
```

```php
// Fetch addresses in the AU
$addresses = \craft\elements\Address::find()
    ->countryCode('AU')
    ->all();
```
:::


#### `dateCreated`

Narrows the query results based on the addresses’ creation dates.



Possible values include:

| Value | Fetches addresses…
| - | -
| `'>= 2018-04-01'` | that were created on or after 2018-04-01.
| `'< 2018-05-01'` | that were created before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were created between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch addresses created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set addresses = craft.queryFunction()
  .dateCreated(['and', ">= #{start}", "< #{end}"])
  .all() %}
```

```php
// Fetch addresses created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$addresses = \craft\elements\Address::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


#### `dateUpdated`

Narrows the query results based on the addresses’ last-updated dates.



Possible values include:

| Value | Fetches addresses…
| - | -
| `'>= 2018-04-01'` | that were updated on or after 2018-04-01.
| `'< 2018-05-01'` | that were updated before 2018-05-01
| `['and', '>= 2018-04-04', '< 2018-05-01']` | that were updated between 2018-04-01 and 2018-05-01.



::: code
```twig
{# Fetch addresses updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set addresses = craft.queryFunction()
  .dateUpdated(">= #{lastWeek}")
  .all() %}
```

```php
// Fetch addresses updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$addresses = \craft\elements\Address::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


#### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch addresses in a specific order #}
{% set addresses = craft.queryFunction()
  .id([1, 2, 3, 4, 5])
  .fixedOrder()
  .all() %}
```

```php
// Fetch addresses in a specific order
$addresses = \craft\elements\Address::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


#### `id`

Narrows the query results based on the addresses’ IDs.



Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | with an ID of 1.
| `'not 1'` | not with an ID of 1.
| `[1, 2]` | with an ID of 1 or 2.
| `['not', 1, 2]` | not with an ID of 1 or 2.



::: code
```twig
{# Fetch the address by its ID #}
{% set address = craft.queryFunction()
  .id(1)
  .one() %}
```

```php
// Fetch the address by its ID
$address = \craft\elements\Address::find()
    ->id(1)
    ->one();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


#### `ignorePlaceholders`

Causes the query to return matching addresses as they are stored in the database, ignoring matching placeholder
elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










#### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch addresses in reverse #}
{% set addresses = craft.queryFunction()
  .inReverse()
  .all() %}
```

```php
// Fetch addresses in reverse
$addresses = \craft\elements\Address::find()
    ->inReverse()
    ->all();
```
:::


#### `limit`

Determines the number of addresses that should be returned.



::: code
```twig
{# Fetch up to 10 addresses  #}
{% set addresses = craft.queryFunction()
  .limit(10)
  .all() %}
```

```php
// Fetch up to 10 addresses
$addresses = \craft\elements\Address::find()
    ->limit(10)
    ->all();
```
:::


#### `offset`

Determines how many addresses should be skipped in the results.



::: code
```twig
{# Fetch all addresses except for the first 3 #}
{% set addresses = craft.queryFunction()
  .offset(3)
  .all() %}
```

```php
// Fetch all addresses except for the first 3
$addresses = \craft\elements\Address::find()
    ->offset(3)
    ->all();
```
:::


#### `orderBy`

Determines the order that the addresses should be returned in. (If empty, defaults to `dateCreated DESC`.)



::: code
```twig
{# Fetch all addresses in order of date created #}
{% set addresses = craft.queryFunction()
  .orderBy('dateCreated ASC')
  .all() %}
```

```php
// Fetch all addresses in order of date created
$addresses = \craft\elements\Address::find()
    ->orderBy('dateCreated ASC')
    ->all();
```
:::


#### `owner`

Sets the [ownerId](#ownerid) parameter based on a given owner element.



::: code
```twig
{# Fetch addresses for the current user #}
{% set addresses = craft.queryFunction()
  .owner(currentUser)
  .all() %}
```

```php
// Fetch addresses created for the current user
$addresses = \craft\elements\Address::find()
    ->owner(Craft::$app->user->identity)
    ->all();
```
:::


#### `ownerId`

Narrows the query results based on the addresses’ owner elements, per their IDs.

Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | created for an element with an ID of 1.
| `'not 1'` | not created for an element with an ID of 1.
| `[1, 2]` | created for an element with an ID of 1 or 2.
| `['not', 1, 2]` | not created for an element with an ID of 1 or 2.



::: code
```twig
{# Fetch addresses created for an element with an ID of 1 #}
{% set addresses = craft.queryFunction()
  .ownerId(1)
  .all() %}
```

```php
// Fetch addresses created for an element with an ID of 1
$addresses = \craft\elements\Address::find()
    ->ownerId(1)
    ->all();
```
:::


#### `preferSites`

If [unique()](https://docs.craftcms.com/api/v3/craft-elements-db-elementquery.html#method-unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C,
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned
for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique addresses from Site A, or Site B if they don’t exist in Site A #}
{% set addresses = craft.queryFunction()
  .site('*')
  .unique()
  .preferSites(['a', 'b'])
  .all() %}
```

```php
// Fetch unique addresses from Site A, or Site B if they don’t exist in Site A
$addresses = \craft\elements\Address::find()
    ->site('*')
    ->unique()
    ->preferSites(['a', 'b'])
    ->all();
```
:::


#### `relatedTo`

Narrows the query results to only addresses that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all addresses that are related to myCategory #}
{% set addresses = craft.queryFunction()
  .relatedTo(myCategory)
  .all() %}
```

```php
// Fetch all addresses that are related to $myCategory
$addresses = \craft\elements\Address::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


#### `search`

Narrows the query results to only addresses that match a search query.



See [Searching](https://craftcms.com/docs/4.x/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all addresses that match the search query #}
{% set addresses = craft.queryFunction()
  .search(searchQuery)
  .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all addresses that match the search query
$addresses = \craft\elements\Address::find()
    ->search($searchQuery)
    ->all();
```
:::


#### `siteSettingsId`

Narrows the query results based on the addresses’ IDs in the `elements_sites` table.



Possible values include:

| Value | Fetches addresses…
| - | -
| `1` | with an `elements_sites` ID of 1.
| `'not 1'` | not with an `elements_sites` ID of 1.
| `[1, 2]` | with an `elements_sites` ID of 1 or 2.
| `['not', 1, 2]` | not with an `elements_sites` ID of 1 or 2.



::: code
```twig
{# Fetch the address by its ID in the elements_sites table #}
{% set address = craft.queryFunction()
  .siteSettingsId(1)
  .one() %}
```

```php
// Fetch the address by its ID in the elements_sites table
$address = \craft\elements\Address::find()
    ->siteSettingsId(1)
    ->one();
```
:::


#### `trashed`

Narrows the query results to only addresses that have been soft-deleted.





::: code
```twig
{# Fetch trashed addresses #}
{% set addresses = craft.queryFunction()
  .trashed()
  .all() %}
```

```php
// Fetch trashed addresses
$addresses = \craft\elements\Address::find()
    ->trashed()
    ->all();
```
:::


#### `uid`

Narrows the query results based on the addresses’ UIDs.





::: code
```twig
{# Fetch the address by its UID #}
{% set address = craft.queryFunction()
  .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
  .one() %}
```

```php
// Fetch the address by its UID
$address = \craft\elements\Address::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


#### `with`

Causes the query to return matching addresses eager-loaded with related elements.



See [Eager-Loading Elements](https://craftcms.com/docs/4.x/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch addresses eager-loaded with the "Related" field’s relations #}
{% set addresses = craft.queryFunction()
  .with(['related'])
  .all() %}
```

```php
// Fetch addresses eager-loaded with the "Related" field’s relations
$addresses = \craft\elements\Address::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->


## Working with Address Fields

### Field Handles

You can reference individual fields—native and custom—using their field handles like any other element:

```twig
<ul>
  <li>Name: {{ myAddress.title }}</li>
  <li>Postal Code: {{ myAddress.postalCode }}</li>
  <li>Custom Label Color: {{ myAddress.myCustomColorFieldHandle }}</li>
</ul>
```

### Attribute Labels

The addressing library’s abstracted _Administrative Area_ → _Locality_ → _Dependent Locality_ terminology probably isn’t what you actually call address bits in your part of the world, and it’s even less likely you’d want to show those terms to site visitors.

You can use any address element’s `addressAttributeLabel()` method to get human-friendly labels for a given locale. Using a U.S. address…

```twig
{{ myAddress.attributeLabel('administrativeArea') }} {# State #}
{{ myAddress.attributeLabel('locality') }} {# City #}
{{ myAddress.attributeLabel('dependentLocality') }} {# Suburb #}
{{ myAddress.attributeLabel('postalCode') }} {# Zip Code #}
```

### `|address` Formatter

You can use the [`|address`](./dev/filters.md#address) filter to get an address with its default HTML formatting:

```twig
{{ myAddress|address }}
{# Output:
  <p translate="no">
    <span class="address-line1">1234 Balboa Towers Circle</span><br>
    <span class="locality">Los Angeles</span>, <span class="administrative-area">CA</span> <span class="postal-code">92662</span><br>
    <span class="country">United States</span>
  </p>
#}
```

The default formatter includes the following options:

- **locale** – defaults to `'en'`
- **html** – defaults to `true`; disable with `false` to maintain line breaks but omit HTML tags
- **html_tag** – defaults to `p`
- **html_attributes** – is an array that defaults to `['translate' => 'no']`

```twig
{# Swap enclosing paragraph tag with a div #}
{{ myAddress|address({ html_tag: 'div' }) }}
{# Output:
  <div translate="no">
    <span class="address-line1">1234 Balboa Towers Circle</span><br>
    <span class="locality">Los Angeles</span>, <span class="administrative-area">CA</span> <span class="postal-code">92662</span><br>
    <span class="country">United States</span>
  </div>
#}

{# Replace the default `translate` param with something whimsical and pointless #}
{{ myAddress|address({ html_attributes: { example: 'sure is!' }}) }}
{# Output:
  <p example="sure is!">
    <span class="address-line1">1234 Balboa Towers Circle</span><br>
    <span class="locality">Los Angeles</span>, <span class="administrative-area">CA</span> <span class="postal-code">92662</span><br>
    <span class="country">United States</span>
  </p>
#}

{# Omit all HTML tags #}
{{ myAddress|address({ html: false }) }}
{# Output:
  1234 Balboa Towers Circle
  Los Angeles, CA 92662
  United States
#}

{# Format with `uk` locale #}
{{ myAddress|address({ html: false, locale: 'uk' }) }}
{# Output:
  1234 Balboa Towers Circle
  Los Angeles, CA 92662
  Сполучені Штати
#}
```

### Customizing the Formatter

You can also pass your own formatter to the `|address` filter. The addressing library includes [PostalLabelFormatter](https://github.com/commerceguys/addressing/blob/master/src/Formatter/PostalLabelFormatter.php) to make it easier to print shipping labels. Here, we can specify that formatter and set its additional `origin_country` option:

```twig
{# Use the postal label formatter #}
{% set addressService = craft.app.getAddresses() %}
{% set labelFormatter = create(
  'CommerceGuys\\Addressing\\Formatter\\PostalLabelFormatter',
  [
    addressService.getAddressFormatRepository(),
    addressService.getCountryRepository(),
    addressService.getSubdivisionRepository(),
  ]) %}
{{ addr|address({ origin_country: 'GB' }, labelFormatter) }}
{# Output:
  1234 Balboa Towers Circle
  LOS ANGELES, CA 92662
  UNITED STATES
#}
```

You can also write a custom formatter that implements [FormatterInterface](https://github.com/commerceguys/addressing/blob/master/src/Formatter/FormatterInterface.php). We might extend the default formatter, for example, to add a `hide_countries` option that avoids printing the names of specified countries:

```php
<?php

namespace mynamespace;

use CommerceGuys\Addressing\AddressInterface;
use CommerceGuys\Addressing\Formatter\DefaultFormatter;
use CommerceGuys\Addressing\Locale;

class OptionalCountryFormatter extends DefaultFormatter
{
    /**
     * @inheritdoc
     */
    protected $defaultOptions = [
        'locale' => 'en',
        'html' => true,
        'html_tag' => 'p',
        'html_attributes' => ['translate' => 'no'],
        'hide_countries' => [],
    ];

    /**
     * @inheritdoc
     */
    public function format(AddressInterface $address, array $options = []): string
    {
        $this->validateOptions($options);
        $options = array_replace($this->defaultOptions, $options);
        $countryCode = $address->getCountryCode();
        $addressFormat = $this->addressFormatRepository->get($countryCode);

        if (!in_array($countryCode, $options['hide_countries'])) {
            if (Locale::matchCandidates($addressFormat->getLocale(), $address->getLocale())) {
                $formatString = '%country' . "\n" . $addressFormat->getLocalFormat();
            } else {
                $formatString = $addressFormat->getFormat() . "\n" . '%country';
            }
        } else {
            // If this is in our `hide_countries` list, omit the country
            $formatString = $addressFormat->getFormat();
        }

        $view = $this->buildView($address, $addressFormat, $options);
        $view = $this->renderView($view);
        $replacements = [];
        foreach ($view as $key => $element) {
            $replacements['%' . $key] = $element;
        }
        $output = strtr($formatString, $replacements);
        $output = $this->cleanupOutput($output);

        if (!empty($options['html'])) {
            $output = nl2br($output, false);
            // Add the HTML wrapper element.
            $attributes = $this->renderAttributes($options['html_attributes']);
            $prefix = '<' . $options['html_tag'] . ' ' . $attributes . '>' . "\n";
            $suffix = "\n" . '</' . $options['html_tag'] . '>';
            $output = $prefix . $output . $suffix;
        }

        return $output;
    }
}
```

We can instantiate and use that just like the postal label formatter:

```twig
{# Use our custom formatter #}
{% set addressService = craft.app.getAddresses() %}
{% set customFormatter = create(
  'mynamespace\\OptionalCountryFormatter',
  [
    addressService.getAddressFormatRepository(),
    addressService.getCountryRepository(),
    addressService.getSubdivisionRepository(),
  ]) %}
{{ addr|address({ hide_countries: ['US'] }, customFormatter) }}
{# Output:
  1234 Balboa Towers Circle
  Los Angeles, CA 92662
#}
```
