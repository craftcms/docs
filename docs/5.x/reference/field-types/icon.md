# Icon Fields

Icon fields allow the user to pick icons that fit the control panel’s style from the [FontAwesome](https://fontawesome.com) library, or from [custom icon sets](#custom-icon-sets). The field’s value can be used to decorate related or nested element chips and cards by enabling **Use this field’s values for element thumbnails** or **Include this field in element cards** when adding it to a field layout.

<!-- more -->

::: tip
Prior to Craft 5.8.0, only a portion of the FontAwesome library was available. We no longer editorialize, and expose the entire 6.x suite.
:::

## Settings

The icons field has these settings:

- **Icon Sets** <Since ver="5.12.0" feature="Custom icon sets" /> — Choose which icon sets (**Font Awesome**, plus any [custom icon sets](#custom-icon-sets)) are selectable, and drag them to set the order they appear in the icon picker. This setting only appears when at least one custom icon set is registered.
- **Include Pro Icons** — Makes FontAwesome Pro icons available for selection. _You may need to purchase a FontAwesome Pro license to use icons in your site’s front-end._ Only available when the **Font Awesome** icon set is selected.
- **Advanced**
  - **GraphQL Mode** <Since ver="5.8.0" feature="Customizing icon field value styles" /> — Choose how this field is represented in the GraphQL API. **Name only** returns only the icon identifier; **Full data** allows selection of the `name` and `styles`.

::: tip
Icon fields created prior to Craft 5.8.0 retain the **Name only** mode. New fields default to **Full data**.
:::

## Custom Icon Sets <Since ver="5.12.0" feature="Custom icon sets" />

In addition to Font Awesome, icon pickers can offer icons from custom icon sets.

The simplest way to add your own icons is with the <config5:customIconPath> setting, which registers a “Custom” icon set made up of the SVG files in a directory:

```php
// config/general.php
use craft\config\GeneralConfig;

return GeneralConfig::create()
    ->customIconPath('@config/icons');
```

Each file’s name (without its `.svg` extension) becomes the icon’s name, so `config/icons/rocket.svg` is available as the `rocket` icon in the “Custom” set (handle `custom`). Only files directly within the directory are included.

Once a custom icon set is registered, select it in an icon field’s [**Icon Sets**](#settings) setting to make its icons selectable.

### Registering Icon Sets

Plugins and modules can register their own icon sets via the <craft5:craft\services\Icons::EVENT_REGISTER_ICON_SETS> event. Each icon set is an instance of a <craft5:craft\icons\IconSet> subclass, with a unique `handle` and a user-facing `name`. Handles must begin with a letter, can only contain letters, numbers, underscores, and hyphens, and can’t be `fontawesome`.

To register a directory of SVG files, use <craft5:craft\icons\DirectoryIconSet>:

```php
use craft\events\RegisterIconSetsEvent;
use craft\icons\DirectoryIconSet;
use craft\services\Icons;
use yii\base\Event;

Event::on(
    Icons::class,
    Icons::EVENT_REGISTER_ICON_SETS,
    function(RegisterIconSetsEvent $event) {
        $event->iconSets[] = new DirectoryIconSet([
            'handle' => 'brand',
            'name' => 'Brand Icons',
            'path' => '@my/plugin/icons',
        ]);
    }
);
```

For icons that come from somewhere else, extend <craft5:craft\icons\IconSet> and implement `getIcons()` (returning a list of icon names) and `getSvg($icon)` (returning an icon’s SVG markup, or `null` if it doesn’t exist). You can also override `getKeywords($icon)` to return additional search terms for an icon. Icon names can’t contain slashes, backslashes, or angle brackets.

## Development

The saved value is suitable for use in the front-end with your own FontAwesome library. Icons from [custom icon sets](#custom-icons) are handled a bit differently.

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

### Custom Icons

Icons selected from a [custom icon set](#custom-icon-sets) are stored as `set-handle:icon-name` (like `custom:rocket`). Font Awesome icons are stored as just their name, without a prefix.

Icon field values have a `set` property containing the handle of the custom icon set the icon was selected from, or `null` for Font Awesome icons. Converting a value to a string (or reading its `name` property) always returns the icon name, without the set handle.

Use `getSvg()` to output an icon’s SVG markup inline, regardless of which set it comes from:

```twig
{% if entry.myIconField %}
  {% if entry.myIconField.set is null %}
    <i class="fa-solid fa-{{ entry.myIconField }}"></i>
  {% else %}
    {{ entry.myIconField.getSvg()|raw }}
  {% endif %}
{% endif %}
```

`getSvg()` returns `null` if the icon no longer exists. `getKeywords()` returns an array of search keywords for the icon—for Font Awesome icons, these come from the library’s metadata.

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

In **Full data** mode, you can also select <Since ver="5.12.0" feature="Icon set data in GraphQL" />:

- `set` — The handle of the [custom icon set](#custom-icon-sets) the icon belongs to, or `null` for Font Awesome icons;
- `svg` — The icon’s SVG markup;
- `keywords` — A list of the icon’s search keywords.
