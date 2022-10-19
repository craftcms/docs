---
related:
  - uri: /commerce/4.x/addresses.md
    label: Using addresses in Craft Commerce
  - uri: /4.x/dev/controller-actions.md
    label: Controller actions reference
---

# Addresses

Addresses are a type of [element](./elements.md) you’ll most commonly encounter in conjunction with [Users](users.md). [Querying addresses](#querying-addresses) and working with their [field data](#fields-and-formatting) is nearly identical to the experience working with any other element type.

For sites supporting [public registration](./user-management.md#public-registration) (like a storefront built on [Craft Commerce](/commerce/4.x/)) users can manage their own [address book](#managing-addresses).

::: tip
Plugins are also able to use addresses to store their own location data.
:::

## Setup

The Address management interface can be added to the User field layout by navigating to  **Settings** → **Users** -> **User Fields**.

![Screenshot of User Fields’ Field Layout editor, with an empty layout and an available Addresses field under Native Fields in the sidebar](./images/user-fields.png)

Create a “Contact Information” tab and drag the **Addresses** field layout element into it to make the interface available on every user detail page.

::: tip
Clicking the <icon kind="settings" /> settings icon on the address field layout element opens additional settings for the address management UI, including tools for [displaying it conditionally](./fields.md#field-layouts).
:::

Take a look at any User’s edit screen to get familiar with the interface:

![Screenshot of My Account page with a “Contact Information” tab selected and the “Addresses” field heading with “+ Add an address” just underneath it](./images/my-account-contact-information.png)

Back in **User Settings**, the **Address Fields** editor lets you manage the fields that are part of each address. **Label**, **Country**, and **Address** are included by default, with several other native fields available:

![Screenshot of Address Fields’ Field Layout editor, with an existing Content tab containing Label, Country, and Address fields](./images/address-fields.png)

### Native and Custom Fields

The address field layout has additional native (but optional) fields for a handful of useful attributes. Addresses—just like other element types—support custom fields for anything else you might need to store.

For compatibility and localization, core address components (aside from the Country Code) can’t be separated from one another in the field layout.

## Querying Addresses

You can fetch addresses in your templates or PHP code using an [AddressQuery](craft4:craft\elements\db\AddressQuery).

::: code
```twig
{# Create a new address query #}
{% set myAddressQuery = craft.addresses() %}
```
```php
// Create a new address query
$myAddressQuery = \craft\elements\Address::find();
```
:::

::: tip
Addresses are just elements, so everything you know about [Element Queries](element-queries.md) applies here!
:::

### Example

Let’s output a list of the logged-in user’s addresses:

1. Create an address query with `craft.addresses()`.
2. Restrict the query to addresses owned by the current User, with the [`owner`](#owner) parameter.
3. Fetch the addresses with `.all()`.
4. Loop through the addresses using a [`{% for %}` tag](https://twig.symfony.com/doc/3.x/tags/for.html).
5. Output preformatted address details with the [`|address`](dev/filters.md#address) filter.

```twig
{% requireLogin #}

{% set addresses = craft.addresses()
  .owner(currentUser)
  .all() %}

{% for addr in addresses %}
  <address>{{ addr|address }}</address>
{% endfor %}
```

We’ll expand on this example in the [Managing Addresses](#managing-addresses) section.

::: warning
Protect your users’ personal information by carefully auditing queries and displaying addresses only on pages that [require login](./dev/tags.md#requirelogin).
:::

### Parameters

Address queries support the following parameters:

<!-- BEGIN PARAMS -->



<!-- textlint-disable -->

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
| [prepareSubquery](#preparesubquery)       | Prepares the element query and returns its subquery (which determines what elements will be returned).
| [relatedTo](#relatedto)                   | Narrows the query results to only addresses that are related to certain other elements.
| [search](#search)                         | Narrows the query results to only addresses that match a search query.
| [siteSettingsId](#sitesettingsid)         | Narrows the query results based on the addresses’ IDs in the `elements_sites` table.
| [trashed](#trashed)                       | Narrows the query results to only addresses that have been soft-deleted.
| [uid](#uid)                               | Narrows the query results based on the addresses’ UIDs.
| [with](#with)                             | Causes the query to return matching addresses eager-loaded with related elements.


<!-- textlint-enable -->


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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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

{% set addresses = craft.addresses()
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

{% set addresses = craft.addresses()
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



::: tip
If no IDs were passed to [id](#id), setting this to `true` will result in an empty result set.
:::



::: code
```twig
{# Fetch addresses in a specific order #}
{% set addresses = craft.addresses()
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
{% set address = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
| `[1, 2]` | created for an element with an ID of 1 or 2.



::: code
```twig
{# Fetch addresses created for an element with an ID of 1 #}
{% set addresses = craft.addresses()
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
and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site B, and Bar will be returned
for Site C.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch unique addresses from Site A, or Site B if they don’t exist in Site A #}
{% set addresses = craft.addresses()
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


#### `prepareSubquery`

Prepares the element query and returns its subquery (which determines what elements will be returned).






#### `relatedTo`

Narrows the query results to only addresses that are related to certain other elements.



See [Relations](https://craftcms.com/docs/4.x/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch all addresses that are related to myCategory #}
{% set addresses = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set address = craft.addresses()
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
{% set addresses = craft.addresses()
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
{% set address = craft.addresses()
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
{% set addresses = craft.addresses()
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


## Address Repository

The [commerceguys/addressing](https://github.com/commerceguys/addressing) library powers planet-friendly address handling and formatting, and its exhaustive repository of global address information is available to all Craft projects. If you need a list of countries, states, or provinces, for example, you can fetch them via Craft’s [Addresses](craft4:craft\services\Addresses) service, from Twig templates or PHP:

::: code
```twig
{% set countries = craft.app.getAddresses().getCountryRepository().getAll() %}
```
```php
$countries = Craft::$app->getAddresses()->getCountryRepository()->getAll();
```
:::

This returns an array of [Country](https://github.com/commerceguys/addressing/blob/master/src/Country/Country.php) objects, indexed by their two-letter code. You might use this to populate a drop-down menu:

```twig
<select name="myCountry">
  {% for code, country in countries %}
    <option value="{{ code }}">{{ country.name }}</option>
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

Similarly, a repository of [subdivisions](https://github.com/commerceguys/addressing/blob/master/src/Subdivision/Subdivision.php) are available, hierarchically—with up to three levels, depending on how a given country is organized: _Administrative Area_ → _Locality_ → _Dependent Locality_.

Expanding upon our previous example, we could output a nicely organized list of “administrative areas,” like this:

```twig
{% set subdivisionRepo = craft.app.getAddresses().getSubdivisionRepository() %}
{% set countriesWithSubdivisions = countries | filter(c => subdivisionRepo.getAll([c.countryCode]) | length) %}

<select name="administrativeArea">
  {% for country in countriesWithSubdivisions %}
    {% set administrativeAreas = subdivisionRepo.getAll([country.countryCode]) %}

    <optgroup label="{{ country.name }}">
      {% for a in administrativeAreas %}
        <option value="{{ a.code }}">{{ a.name }}</option>
      {% endfor %}
    </optgroup>
  {% endfor %}
</select>
```

Either repository’s `getList()` method is a shortcut that returns only key-value pairs, suitable for our examples—it also accepts.

::: tip
Check out the [addressing docs](https://github.com/commerceguys/addressing#data-model) for more details and examples of what’s possible—including translation of place names, postal codes, timezones, and formatting!
:::

## Fields and Formatting

### Field Handles

Individual fields—native and custom—are accessed via their handles, like any other element:

```twig
<ul>
  <li>Name: {{ myAddress.title }}</li>
  <li>Postal Code: {{ myAddress.postalCode }}</li>
  <li>Custom Label Color: {{ myAddress.myCustomColorFieldHandle }}</li>
</ul>
```

### Attribute Labels

The addressing library’s abstracted _Administrative Area_ → _Locality_ → _Dependent Locality_ terminology probably isn’t what you are accustomed to calling those address components in your part of the world—and it’s even less likely you’d want to show those terms to site visitors.

You can use any address element’s `attributeLabel()` method to get human-friendly labels for a given locale. Assuming we’re working with a U.S. address…

```twig
{{ myAddress.attributeLabel('administrativeArea') }} {# State #}
{{ myAddress.attributeLabel('locality') }} {# City #}
{{ myAddress.attributeLabel('dependentLocality') }} {# Suburb #}
{{ myAddress.attributeLabel('postalCode') }} {# Zip Code #}
```

Labels use the address’s current `countryCode` value for localization.

### `|address` Formatter

You can use the [`|address`](./dev/filters.md#address) filter to output a formatted address with basic HTML:

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
{# Swap enclosing paragraph tag for a `div`: #}
{{ myAddress|address({ html_tag: 'div' }) }}
{# Output:
  <div translate="no">
    <span class="address-line1">1234 Balboa Towers Circle</span><br>
    <span class="locality">Los Angeles</span>, <span class="administrative-area">CA</span> <span class="postal-code">92662</span><br>
    <span class="country">United States</span>
  </div>
#}

{# Turn the entire address into a Google Maps link: #}
{{ myAddress|address({
  html_tag: 'a',
  html_attributes: {
    href: url('https://maps.google.com/maps/search/', {
      query_place_id: address.myCustomPlaceIdField,
    }),
  },
}) }}
{# Output:
  <a href="https://maps.google.com/maps/search/?query_place_id=...">
    <span class="address-line1">1234 Balboa Towers Circle</span><br>
    <span class="locality">Los Angeles</span>, <span class="administrative-area">CA</span> <span class="postal-code">92662</span><br>
    <span class="country">United States</span>
  </a>
#}

{# Omit all HTML tags: #}
{{ myAddress|address({ html: false }) }}
{# Output:
  1234 Balboa Towers Circle
  Los Angeles, CA 92662
  United States
#}

{# Force output in the Ukrainian (`uk`) locale: #}
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
use craft\helpers\Html;

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

      // Add the HTML wrapper element with Craft’s HTML helper:
      $output = Html::tag($options['html_tag'], $output, $options['html_attributes']);
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
  ]
) %}
{{ addr|address({ hide_countries: ['US'] }, customFormatter) }}
{# Output:
  1234 Balboa Towers Circle
  Los Angeles, CA 92662
#}
```

## Managing Addresses

Users can add, edit, and delete their own addresses from the front-end via the `users/save-address` and `users/delete-address` [controller actions](./dev/controller-actions.md).

Craft doesn’t automatically give Addresses their own URLs, though—so it’s up to you to define a routing scheme for them via `routes.php`. We’ll cover each of these three routes in the following sections:

```php
<?php
return [
  // Listing Addresses
  'account' => ['template' => '_account/dashboard'],

  // New Addresses
  'account/addresses/new' => ['template' => '_account/edit-address'],

  // Existing Addresses
  'account/addresses/<addressUid:{uid}>' => ['template' => '_account/edit-address'],
];
```

::: tip
The next few snippets may be a bit dense—numbered comments are peppered throughout, corresponding to items in the **Guide** section just below it.
:::

#### Scaffolding

The following templates assume you have a layout functionally equivalent to the [models and validation](./dev/controller-actions.md#models-and-validation) example.

### Listing Addresses

Let’s display the current user’s address book on their account “dashboard.”

::: code
```twig _account/dashboard.twig
{% extends '_layouts/default' %}

{% requireLogin %}

{# 1. Load Addresses: #}
{% set addresses = currentUser.getAddresses() %}

{% block content %}
  <h1>Hello, {{ currentUser.fullName }}!</h1>

  {% if addresses | length %}
    <ul>
      {% for address in addresses %}
        <li>
          {{ address.title }}<br>
          {{ address|address }}<br>

          {# 2. Build an edit URL: #}
          <a href="{{ url("account/addresses/#{address.uid}") }}">Edit</a>

          {# 3. Use a form to delete Addresses: #}
          <form method="post">
            {{ csrfInput() }}
            {{ actionInput('users/delete-address') }}
            {{ hiddenInput('addressId', address.id) }}

            <button>Delete</button>
          </form>
        </li>
      {% endfor $}
    </ul>
  {% else %}
    <p>You haven’t added any addresses, yet!</p>
  {% endif %}

  {# 4. Link to "new" route: #}
  <p><a href="{{ url('account/addresses/new') }}">New Address</a></p>
{% endblock %}
```
:::

#### Guide

1. We’re using a <craft4:craft\elements\User> convenience method to load the current user’s saved addresses, but this is equivalent to our earlier [query example](#querying-addresses).
2. These URLs will need to match the pattern defined in `routes.php`. In our case, that means we need to interpolate the Address’s UID into the path.
3. [Deleting an Address](./dev/controller-actions.md#post-users-delete-address) requires a <badge vertical="baseline" type="verb">POST</badge> request, which—for the sake of simplicity—we’re handling with a regular HTML form.
4. The [New Address](#new-addresses) route is static—there’s nothing to interpolate or parameterize.

### New Addresses

The code for new addresses will end up being reused for [existing addresses](#existing-addresses).

::: code
```twig _account/edit-address.twig
{% extends '_layouts/default' %}

{% requireLogin %}

{% block content %}
  <h1>New Address</h1>

  {# 1. Render the form #}
  {{ include('_account/address-form', {
    address: address ?? create('craft\\elements\\Address'),
  }) }}
{% endblock %}
```
```twig _account/address-form.twig
<form method="post">
  {{ csrfInput() }}

  {# 2. Set the controller action: #}
  {{ actionInput('users/save-address') }}

  {# 3. Special cases for existing addresses: #}
  {% if address.id %}
    {{ hiddenInput('addressId', address.id) }}
  {% endif %}

  {# 4. Redirection: #}
  {{ redirectInput('account/addresses/{uid}') }}

  {# 5. Address Fields: #}

  <label for="title">Title</label>
  <input
    type="text"
    name="title"
    id="title"
    value="{{ address.title }}">

  <label for="addressLine1">Address Line 1</label>
  <input
    type="text"
    name="addressLine1"
    id="addressLine1"
    value="{{ address.addressLine1 }}">

  <label for="addressLine2">Address Line 2</label>
  <input
    type="text"
    name="addressLine2"
    id="addressLine2"
    value="{{ address.addressLine2 }}">

  <label for="countryCode">Country</label>
  <select name="countryCode" id="countryCode">
    {% for country in craft.app.getAddresses().getCountryRepository().getAll() %}
      {{ tag('option', {
        value: country.countryCode,
        selected: country.countryCode == address.countryCode,
        text: country.name,
      }) }}
    {% endfor %}
  </select>

  {# ... #}

  <button>Save</button>
</form>
```
:::

#### Guide

1. We pass an <craft4:craft\elements\Address> to the form partial—either from an `address` variable that is available to the template after an attempted submission (say, due to validation errors), or a new one instantiated with the [`create()` function](./dev/functions.md#create).
2. Whether we’re creating a new Address or editing an existing one (this partial handles both), the request should be sent to the `users/save-address` action.
3. Addresses that have been previously saved will have an `id`, so we need to send that back to apply updates to the correct Address.
4. The [`redirectInput()` function](./dev/functions.md#redirectinput) accepts an “object template,” which can include properties of the thing we’re working with. The template won’t be evaluated when it appears in the form—instead, Craft will render it using the Address object after it’s been successfully saved. In this case, we’ll be taken to the [edit screen](#existing-addresses) for the newly-saved address.
5. Which fields are output is up to you. If you want to capture input for custom fields, it should be nested under the `fields` key: `<input type="text" name="fields[myCustomFieldHandle]" value="...">`

::: tip
See the [complete list of parameters](./dev/controller-actions.md#post-users-save-address) that can be sent 
:::

### Existing Addresses

To edit an existing address, we’ll use the `addressUid` parameter from our route.

```twig
{% extends '_layouts/default' %}

{% requireLogin %}

{# 1. Resolve the address: #}
{% set address = address ?? craft.addresses
  .owner(currentUser)
  .uid(addressUid)
  .one() %}

{# 2. Make sure we got something: #}
{% if not address %}
  {% exit 404 %}
{% endif %}

{% block content %}
  <h1>Edit Address: {{ address.title }}</h1>

  {# 3. Render form: #}
  {{ include('_account/address-form', {
    address: address,
  }) }}
{% endblock %}
```

#### Guide

1. In one statement, we’re checking for the presence of an `address` variable sent back to the template by a prior submission, and falling back to a lookup against the user’s Addresses. By calling `.owner(currentUser)`, we can be certain we’re only ever showing a user an Address they own.
2. If an Address wasn’t passed back to the template, _and_ the UID from our route didn’t match one of the current user’s addresses, we bail.
3. The Address is passed to the form partial for rendering—see the [new address example](#new-addresses) for the form’s markup.


## Validating Addresses

Addresses are validated like any other type of element, but some of the rules are dependent upon its localized format.

You can set requirements for custom fields in the Address Fields [field layout](#native-custom-fields), but additional validation of any address properties requires a [custom plugin or module](/4.x/extend/).

::: tip
Take a look at the [Using Events in a Custom Module](kb:custom-module-events) Knowledge Base article for a dedicated primer on module setup and events.
:::

Validation rules are added via the `Model::EVENT_DEFINE_RULES` event:

```php
use yii\base\Event;
use craft\base\Model;
use craft\elements\Address;
use craft\events\DefineRulesEvent;

Event::on(
  Address::class,
  Model::EVENT_DEFINE_RULES,
  function(DefineRulesEvent $event) {
    $event->rules[] = [
      ['fullName'],
      'match',
      'pattern' => '/droid|bot/i',
      'message' => Craft::t('site', 'Robots are not allowed.'),
    ];
  }
);
```

Errors are available through the same `address.getErrors()` method used in other [action examples](./dev/controller-actions.md#models-and-validation), regardless of whether they were produced by native rules or ones you added.
