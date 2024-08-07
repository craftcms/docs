---
description: Select a country from the same database that powers address elements.
updatedVersion: 5.x/reference/field-types/country.md
---

# Country Fields

The **Country** field <Since ver="4.6.0" feature="The Country field" /> allows authors to select from a the same list of countries made available via [address](addresses.md) elements. When viewed as part of a form in the [control panel](control-panel.md), countries’ names will be localized into the user’s preferred language.

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

Craft actually returns a [`Country`](repo:commerceguys/addressing/blob/master/src/Country/Country.php) object, which has a few [additional features](addresses.md#country-names), including the complete name (localized for the current site): <Since ver="4.11.0" description="{product} {ver} changed the data type for Country fields." />

```twig
<h1>Mail from {{ entry.country.name }}</h1>
```

In earlier versions of Craft, use the [address repository](addresses.md#address-repository) available via the address service to get a `Country` model:

```twig
{# Load all country data: #}
{% set repo = craft.app.addresses.getCountryRepository() %}

{# Get just the selected country: #}
{% set country = repo.get(entry.country) %}

{# Use properties of the country model: #}
{{ country.name }} ({{ country.threeLetterCode }})
```

The `country` variable in this example is an instance of  [`CommerceGuys\Addressing\Country\Country`](repo:commerceguys/addressing/blob/master/src/Country/Country.php).

### Querying by Country

You can query for elements based on a country field’s value in a familiar way:

```twig

{% set letters = craft.entries
    .section('letters')
    .fromCountry('FR')
    .toCountry('GB')
    .dateSent()
    .all() %}
```

### Front-end Forms

Update the value of a country field on an element by submitting a two-letter country code to the [`entries/save-entry` action](dev/controller-actions.md#post-entries-save-entry). Supposing we are in a template used by the “Letters” section from the previous example, our form might look something like this:

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

<See path="dev/controller-actions.md" description="Read more about using forms to submit data to Craft controllers." />
