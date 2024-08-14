---
description: Select a country from the same database that powers address elements.
---

# Country Fields

The **Country** field allows authors to select from a the same list of countries made available via [address](../element-types/addresses.md) elements. When viewed as part of a form in the [control panel](../../system/control-panel.md), countries’ names will be localized into the user’s preferred language.

<!-- more -->

## Settings

This field has no configurable options.

::: tip
You can switch other text-based fields to use the country field type. As long as your existing field’s values are valid two-letter country codes (or empty), the data will be seamlessly enhanced with the country field’s richer return type.
:::

## Development

Craft stores the field’s value as a capitalized, two-letter country code.

```twig
{% if entry.country is not empty %}
  Country code: {{ entry.country }}
{% endif %}
```

Craft actually returns a [`Country`](repo:commerceguys/addressing/blob/master/src/Country/Country.php) object, which has a few [additional features](../element-types/addresses.md#country-names), including the complete name: <Since ver="5.3.0" description="{product} {ver} changed the data type for Country fields." />

```twig
<h1>Mail from {{ entry.country.name }}</h1>
```

In earlier versions of Craft, use the [address repository](../element-types/addresses.md#address-repository) available via the address service to get a `Country` model:

```twig
{# Load all country data: #}
{% set repo = craft.app.addresses.getCountryRepository() %}

{# Get just the selected country: #}
{% set country = repo.get(entry.country) %}

{# Use properties of the country model: #}
{{ country.name }} ({{ country.threeLetterCode }})
```

The `country` variable in this example is an instance of  [`CommerceGuys\Addressing\Country\Country`](repo:commerceguys/addressing/blob/master/src/Country/Country.php).

#### Localization

To get the localized name of a country, you must re-fetch it from the address repository:

```twig{2}
{% set repo = craft.app.addresses.getCountryRepository() %}
{% set country = repo.get(entry.country, currentSite.locale) %}

{{ country.name }}
{# -> In a site set to use US English (en-US): "United States" #}
{# -> In a site set to use Swiss French (fr-CH): "États-Unis" #}
```

Note that outputting the country object directly (i.e. `{{ country }}`) will always return the two-letter country code, which is standard across locales.

### Querying by Country

You can query for elements based on a country field’s value in a familiar way:

```twig{3-4}
{% set letters = craft.entries
    .section('letters')
    .fromCountry('FR')
    .toCountry('GB')
    .orderBy('dateSent DESC')
    .all() %}
```

::: warning
Queries against country fields currently only support two-letter codes, not complete names or other country properties.
:::

### Front-end Forms

Update the value of a country field on an element by submitting a two-letter country code to the [`entries/save-entry` action](../controller-actions.md#post-entries-save-entry). Supposing we are in a template used by the “Letters” section from the previous example, our form might look something like this:

```twig
{% set countries = craft.app.addresses.getCountryRepository().getAll() %}

<form method="post">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}
  {{ hiddenInput('canonicalId', entry.id) }}

  {{ input('text', 'title', entry.title) }}

  <select name="fields[toCountry]">
    {% for country in countries %}
      {{ tag('option', {
        text: country.name,
        value: country.countryCode,
        selected: country.countryCode == entry.toCountry,
      }) }}
    {% endfor %}
  </select>

  <button>Save</button>
</form>
```

<See path="../controller-actions.md" description="Read more about using forms to submit data to Craft controllers." />
