# Icon Fields

Icon fields allow the user to pick from a curated list of [FontAwesome](https://fontawesome.com) icons that fit the control panel’s style. The field’s value can be used to decorate related or nested element chips and cards by enabling **Use this field’s values for element thumbnails** or **Include this field in element cards** when adding it to a field layout.

<!-- more -->

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
