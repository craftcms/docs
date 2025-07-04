# Icon Fields

Icon fields allow the user to pick icons that fit the control panel’s style from the [FontAwesome](https://fontawesome.com) library. The field’s value can be used to decorate related or nested element chips and cards by enabling **Use this field’s values for element thumbnails** or **Include this field in element cards** when adding it to a field layout.

<!-- more -->

::: tip
Prior to Craft 5.8.0, only a portion of the FontAwesome library was available. We no longer editorialize, and expose the entire 6.x suite.
:::

## Settings

The icons field has these settings:

- **Include Pro Icons** — Makes FontAwesome Pro icons available for selection. _You may need to purchase a FontAwesome Pro license to use icons in your site’s front-end._
- **Advanced**
  - **GraphQL Mode** <Since ver="5.8.0" feature="Customizing icon field value styles" /> — Choose how this field is represented in the GraphQL API. **Name only** returns only the icon identifier; **Full data** allows selection of the `name` and `styles`.

::: tip
Icon fields created prior to Craft 5.8.0 retain the **Name only** mode. New fields default to **Full data**.
:::

## Development

The saved value is suitable for use in the front-end with your own FontAwesome library.

### Webfonts

Following the official [web fonts tutorial](https://fontawesome.com/docs/web/setup/host-yourself/webfonts), you might display an icon like this:

```twig
<i class="fa-solid fa-{{ entry.myIconField }}"></i>
```

Change `fa-solid` to another style identifier to suit your site’s appearance!

If you added the FontAwesome files in `web/assets/fontawesome/*`, you would link to one or more style sheets like this:

```twig
{% css '/assets/fontawesome/fontawesome.css' %}
{% css '/assets/fontawesome/solid.css' %}
```

You can add [`css` tags](../twig/tags.md#css) like this anywhere in your code and Craft will hoist them into the `<head>` of the document!

### SVG + JS

The same HTML will work with the recommendations in the [SVG + JS tutorial](https://fontawesome.com/docs/web/setup/host-yourself/svg-js).

### Styles <Since ver="5.8.0" feature="Customizing icon field value styles" />

Some icons are present in multiple sets or “styles.” You can check support for a given style using the `styles` property of an icon field:

```twig
{{ tag('i', {
    class: [
        'brands' in entry.myIconField.styles ? 'fa-brands' : 'fa-solid',
        "fa-#{entry.myIconField.name}",
    ],
}) }}
```

### Saving Icon Field Data

The process for submitting icon field data to Craft (via an [element or entry form](kb:entry-form)) is the same as any other field that contains text, like a [dropdown](dropdown.md) field:

```twig
{# Set up a custom map of icon names and labels: #}
{% set iconMap = {
    'github': 'Github',
    'stack-overflow': 'StackOverflow',
    'gitlab': 'Gitlab',
} %}

<select name="fields[myIconFieldHandle]">
  {% for name, label in iconMap %}
    {{ tag('option', {
      text: label,
      value: name,
      selected: entry.myIconFieldHandle.name == name,
    }) }}
  {% endfor %}
</select>
```

::: warning
The FontAwesome library does not include user-facing labels for icons. We recommend maintaining your own abbreviated list of icons, or populating a [dropdown](dropdown.md) field with a subset of icon names that you expect users to need.

Note that validation of icon field values is performed against the _entire_ library.
:::

### GraphQL

Depending on the **GraphQL Mode** setting <Since ver="5.8.0" feature="Customizing icon field value styles" />, the icon field will contain different sub-selections:

::: code
```gql{10} Name only
query Contacts {
  entries(
    section: "contacts"
  ) {
    id
    title

    ... on contact_Entry {
      phone
      myIconFieldHandle
    }
  }
}
```
```gql{10-13} Full data
query Contacts {
  entries(
    section: "contacts"
  ) {
    id
    title

    ... on contact_Entry {
      phone
      myIconFieldHandle {
        name
        styles
      }
    }
  }
}
```
:::

**Name only** returns a string; **Full data** requires a selection of `name` and/or `styles` fields. The `name` sub-selection is equivalent to the value returned by **Name only**.
