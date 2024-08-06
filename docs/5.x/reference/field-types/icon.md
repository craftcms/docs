# Icon Fields

Icon fields allow the user to pick from a curated list of [FontAwesome](https://fontawesome.com) icons that fit the control panel’s style. The field’s value can be used to decorate related or nested element chips and cards by enabling **Use this field’s values for element thumbnails** or **Include this field in element cards** when adding it to a field layout.

<!-- more -->

## Settings

To make FontAwesome Pro icons available, turn on the **Include Pro Icons** option. You may need to purchase a FontAwesome Pro license to use icons in your site’s front-end.

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
