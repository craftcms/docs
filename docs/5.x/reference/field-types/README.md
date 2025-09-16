---
description: "Craft has over 20 built-in field types that help create tightly-tailored authoring and developer experiences."
related:
  - uri: ../../system/fields.md
    label: Fields and Content
  - uri: ../../system/elements.md
    label: Introduction to Elements
---

# Custom Field Types

Craft has over 20 built-in field types that help create tightly-tailored authoring and developer experiences. The table below lists fields in the same order you’ll encounter them in the [control panel](../../system/control-panel.md); you can also browse them by the [type of data](#data-types) they store.

<!-- more -->

<See path="../system/fields.md" label="Fields + Content" description="Get started with fields in Craft." />

## All Fields

| Field Type | Description |
| --- | --- |
| [Addresses](addresses.md) | Manage nested [address](../element-types/addresses.md) elements. |
| [Assets](assets.md) | Relate [asset](../element-types/assets.md) elements. |
| [Button Group](button-group.md) | Choose a single item from a graphical, icon-based toolbar. |
| [Categories](categories.md) | Relate [category](../element-types/categories.md) elements. |
| [Checkboxes](checkboxes.md) | Choose one or more predefined options using `checkbox` inputs. |
| [Color](color.md) | Pick a color with your platform’s native color picker—or provide a hexadecimal value. |
| [Content Block](content-block.md) | Group other fields in a [nested entry](../element-types/entries.md#nested-entries). |
| [Country](country.md) | Choose from a list of countries in a `select` menu. |
| [Date/Time](date-time.md) | Set a date, time, and timezone (optional). |
| [Dropdown](dropdown.md) | Choose a single item from a predefined list using a `select` menu. |
| [Email](email.md) | Validate input as an email address. |
| [Entries](entries.md) | Relate [entry](../element-types/entries.md) elements. |
| [Icon](icon.md) | Pick from a palette of icons from [FontAwesome](https://fontawesome.com). |
| [Lightswitch](lightswitch.md) | Choose an _on_ or _off_ value using a switch. |
| [Link](link.md) | Define a link to an internal or external resource. |
| [Matrix](matrix.md) | Create [nested entries](../element-types/entries.md#nested-entries) from a list of allowed [entry types](../element-types/entries.md#entry-types). |
| [Money](money.md) | Store a value in a specific currency. |
| [Multi-Select](multi-select.md) | Choose one or more options via a tag-like [Selectize](https://selectize.dev/) input. |
| [Number](number.md) | Store a numeric value. |
| [Plain Text](plain-text.md) | Basic input for any kind of textual value. |
| [Radio Buttons](radio-buttons.md) | Choose one option from a predefined list. Equivalent to the _Dropdown_ field. |
| [Range](range.md) | Pick a number with a visual slider. |
| [Table](table.md) | Store repeating rows of simple values. |
| [Tags](tags.md) | Relate [tag](../element-types/tags.md) elements. |
| [Time](time.md) | Choose a time _without_ a date. |
| [Users](users.md) | Relate [user](../element-types/users.md) elements. |

## Data Types

Not sure which field type to use? This list is organized by the types of values that each field stores. Each field may appear in multiple groups!

### Text

Arbitrary and predefined strings.

- [Plain Text](plain-text.md) — Single- or multi-line text of any length.
- [Dropdown](dropdown.md) — A fixed set of options to choose from.
- [Radio Buttons](radio-buttons.md) — Same as a dropdown, but allows “custom” values.
- [Country](country.md) — A specific set of values used to populate addresses.
- [Email](email.md) — Validate an email address. (See: [Link](link.md))

::: tip
Our first-party [CKEditor](plugin:ckeditor) plugin provides a powerful rich text composer that also supports [nested entries](../element-types/entries.md#nested-entries).
:::

### Booleans

On or off; yes or no; 1 or 0; true or false!

- [Lightswitch](lightswitch.md) — A single on/off switch.
- [Checkboxes](checkboxes.md) — Capture multiple binary settings at once.

### Numbers

- [Money](money.md) — A safer way to store currency values.
- [Number](number.md) — Single numeric value with controls for min/max values and precision.
- [Range](range.md) — A number field with an additional slider UI for tactile selection.

### Date + Time

These fields yield `DateTime` objects that can be conveniently compared, queried, and formatted in templates.

- [Date](date-time.md) — Capture a date _and_ time.
- [Time](time.md) — Store only the time of day.

### Lists

Sometimes, you need more than a single value!

- [Checkboxes](checkboxes.md) — Select any number of predefined options, or let authors set one manually.
- [Matrix](matrix.md) — Manage nested entries as an embedded element index or inline blocks.
- [Multi-Select](multi-select.md) — A rudimentary multi-select input, without manual options.
- [Table](table.md) — Repeatable rows of simple data.

::: tip
Most of the fields in the [references](#references) section allow you to attach multiple relationships, as well.
:::

### References

Create [relationships](../../system/relations.md) to content, on- or off-site.

- [Link](link.md) — Flexible input for multiple kinds of locators, like URLs, element relationships, phone numbers, and email addresses.
- [Assets](categories.md) — Connect uploaded [media](#media) to any element.
- [Categories](categories.md) — Organize elements into hierarchical [taxonomies](#taxonomies).
- [Entries](entries.md) — Relate content to or from anywhere!
- [Tags](tags.md) — Organize elements into a flat “[folksonomy](#taxonomies).”
- [Users](users.md) — Associate users with any type of content.

### Taxonomies

Help users and authors understand content by establishing explicit connections.

- [Categories](categories.md) — Connect content to hierarchical structures.
- [Tags](tags.md) — Expressive, ad-hoc organization.
- [Entries](entries.md) — Anything can be a taxonomy!

::: tip
You can even attach fields to the elements you relate via these fields—metadata for your metadata!
:::

### Media

- [Assets](assets.md) — Upload and attach files to anything.

### Structured

Manage nested data.

- [Addresses](addresses.md)
- [Content Block](content-block.md) <Since ver="5.8.0" feature="The Content Block field" />
- [Matrix](matrix.md)
- [Table](table.md)

::: tip
Have a complex content model? You can nest entries as deeply as you want!
:::

### Fun + Cosmetic

Spruce up the authoring experience with these dedicated UIs.

- [Color](color.md) — Select from a palette of colors, or choose a new one.
- [Button Group](button-group.md) — Choose from options identified by an icon—great for layout, positioning, and scale controls
- [Icon](icon.md) — Pick from a library of icons.
- [Money](money.md) — Input values in a specific currency.
- [Range](range.md) — Contextualize numeric values.

::: tip
The [Content Block](content-block.md) field can be also be used to semantically and structurally group (and reuse!) a set of fields. <Since ver="5.8.0" feature="The Content Block field" />
:::
