---
description: "Craft has over 20 built-in field types that help create tightly-tailored authoring and developer experiences."
related:
  - uri: ../../system/fields.md
    label: Fields and Content
  - uri: ../../system/elements.md
    label: Introduction to Elements
---

# Custom Field Types

Craft has over 20 built-in field types that help create tightly-tailored authoring and developer experiences.

<See path="../system/fields.md" label="Fields + Content" description="Get started with fields in Craft." />

<hr>

| Field Type | Description |
| --- | --- |
| [Addresses](addresses.md) | Manage nested [address](../element-types/addresses.md) elements. |
| [Assets](assets.md) | Relate [asset](../element-types/assets.md) elements. |
| [Categories](categories.md) | Relate [category](../element-types/categories.md) elements. |
| [Checkboxes](checkboxes.md) | Choose one or more predefined options using `checkbox` inputs. |
| [Color](color.md) | Pick a color with your platform’s native color picker—or provide a hexadecimal value. |
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

### Booleans

On or off; yes or no; 1 or 0; true or false!

- [Lightswitch](lightswitch.md) — A single on/off switch.
- [Checkboxes](checkboxes.md) — Capture multiple binary settings at once.

### Numbers

- [Money](money.md) — A safer way to store currency values.
- [Number](number.md)
- [Range](range.md)

### Date + Time

- [Date](date-time.md)
- [Time](time.md)

### Lists

Sometimes, you need more than a single value!

- [Checkboxes](checkboxes.md)
- [Matrix](matrix.md)
- [Multi-Select](multi-select.md)
- [Table](table.md)

::: tip
Most of the fields in the [references](#references) section allow you to attach multiple relationships, as well.
:::

### References

Create relationships to content, on- or off-site.

- [Link](link.md)
- [Assets](categories.md)
- [Categories](categories.md)
- [Entries](entries.md)
- [Tags](tags.md)
- [Users](users.md)

### Taxonomies

Organize content

- [Categories](categories.md)
- [Entries](entries.md)
- [Tags](tags.md)

::: tip
You can even attach fields to the elements you relate via these fields!
:::

### Media

Upload and attach files.

- [Assets](assets.md)

### Structured

Manage nested data.

- [Addresses](addresses.md)
- [Matrix](matrix.md)
- [Table](table.md)

### Fun + Cosmetic

Spruce up the authoring experience with these dedicated UIs.

- [Color](color.md)
- [Icon](icon.md)
- [Money](money.md)
