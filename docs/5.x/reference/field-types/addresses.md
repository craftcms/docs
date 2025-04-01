---
related:
  - uri: link.md
    label: Link fields
---

# Addresses Fields

The **Addresses** field is similar to a [Matrix](matrix.md) field, but it manages nested [address elements](../element-types/addresses.md) instead of [entries](../element-types/entries.md). When you create an address it is “owned” by the element that field is attached to. Address fields are _not_ [relational fields](../../system/relations.md#custom-fields).

::: tip
Address fields are separate from users’ [address book](../element-types/users.md#addresses), and can be added to any element type!
:::

<BrowserShot url="https://my-project.ddev.site/admin/entries/vendors/123" :link="false">
<img src="../../images/fields-addresses.png" alt="Screenshot of addresses field with two nested address elements" />
</BrowserShot>

Addresses can be copied user-to-user, and field-to-field.

## Settings

Address fields can be displayed to editors as [cards](../../system/elements.md#chips-cards) or in a full [element index](../../system/elements.md#indexes). Either way, individual addresses are always displayed as cards.

You can also choose a minimum and maximum number of addresses that can be added to the field for the owner element to validate.

## Development

Like Matrix and [relational fields](../../system/relations.md#fields), address field data is provided as an [element query](../../development/element-queries.md) or [element collection](../../development/collections.md#element-collections).

Typically, you will access addresses attached to an element via the field’s handle followed by a query execution method like `.all()`:

```twig
{% set addresses = entry.contacts.all() %}

<h2>Contacts</h2>

<ul>
  {% for address in addresses %}
    <li>{{ address|address }}</li>
  {% endfor %}
</ul>
```

<See path="../element-types/addresses.md" label="Addresses" description="Learn more about managing and displaying address data." />
