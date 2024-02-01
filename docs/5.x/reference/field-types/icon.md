# Icon Fields

Icon fields allow the user to pick from a curated list of FontAwesome icons that fit the control panel’s style. The field’s value can be used to decorate related or nested element chips and cards.

## Development

The saved value is suitable for use in the front-end with your own FontAwesome library, or Craft’s bundled subset.

### Webfonts

Following the official [web fonts tutorial](https://fontawesome.com/docs/web/setup/host-yourself/webfonts), you might display an icon like this:

```twig
<i class="fa-solid fa-{{ entry.myIconField }}"></i>
```

Change `fa-solid` to another style identifier to suit your site’s appearance!

### SVG + JS

The same HTML will work with the recommendations in the [SVG + JS tutorial](https://fontawesome.com/docs/web/setup/host-yourself/svg-js).

## Bundled Assets

You can output Craft’s bundled SVG files with the [`svg()` Twig function](../twig/functions.md#svg):

```twig
{{ svg("@appicons/#{entry.myIconsField}.svg") }}
```

::: warning
Only one the “solid” icon style is bundled with Craft.
:::
