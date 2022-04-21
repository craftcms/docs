# Image Transforms

Instead of requiring content editors to upload images at a specific sizes, Craft lets you define “image transforms” for automatically manipulating images on demand. Transforms are _non-destructive_, meaning they have no effect on the original uploaded image.

Transforms can be defined in the control panel and directly from your templates or GraphQL queries.

## Defining Transforms from the Control Panel

You can define named transforms from the control panel by navigating to **Settings** → **Assets** → **Image Transforms** and press **New Transform**.

Each transform has the following settings:

- **Name** – the transform’s user-facing name
- **Handle** – the transform’s template-facing handle
- **Mode** – the transform mode
- **Width** – the transform’s resulting width
- **Height** – the transform’s resulting height
- **Quality** - the transform’s resulting image quality (0 to 100)
- **Image Format** – the transform’s resulting image format

**Mode** can be set to the following values:

- **Crop** – Crops the image to the specified width and height, scaling the image up if necessary. (This is the default mode.)
- **Fit** – Scales the image so that it is as big as possible with all dimensions fitting within the specified width and height.
- **Stretch** – Stretches the image to the specified width and height.

If **Mode** is set to “Crop”, an additional “Default Focal Point” setting will appear for defining which image area Craft should center the crop on when a [focal point](assets.md#focal-points) isn’t specified. Its options include:

- Top-Left
- Top-Center
- Top-Right
- Center-Left
- Center-Center
- Center-Right
- Bottom-Left
- Bottom-Center
- Bottom-Right

If you leave **Width** or **Height** blank, that dimension will be set to whatever maintains the image’s aspect ratio. For example, if you have an image that is 600 by 400 pixels, and you set a transform’s Width to 60, but leave Height blank, the resulting height will be 40.

If you leave **Quality** blank, Craft will use the quality set by your <config4:defaultImageQuality> config setting.

**Image Format** can be set to the following values:

- jpg
- png
- gif
- webp

If you leave **Image Format** blank, Craft will use the original image’s format if it’s [web-safe](craft3:craft\helpers\Image::webSafeFormats()). Otherwise Craft will try to figure out the best-suited image format for the job. If it can’t determine that (probably because ImageMagick isn’t installed), it will go with .jpg.

### Applying Named Transforms to Images

To output an image with your named transform applied, pass its handle into your asset’s [getUrl()](craft3:craft\elements\Asset::getUrl()), [getWidth()](craft3:craft\elements\Asset::getWidth()), and [getHeight()](craft3:craft\elements\Asset::getHeight()) functions:

```twig
<img src="{{ asset.getUrl('thumb') }}"
     width="{{ asset.getWidth('thumb') }}"
     height="{{ asset.getHeight('thumb') }}"
>
```

You can also apply the transform on the asset so any relevant properties are automatically manipulated by default. This example would output the same result as the example above:

```twig
{% do asset.setTransform('thumb') %}
<img src="{{ asset.url }}"
     width="{{ asset.width }}"
     height="{{ asset.height }}"
>
```

### Overriding Named Transforms

Pass a [hash](dev/twig-primer.md#hashes) with your handle in a `transform` key instead, and additional properties can be used to override those of the named transform:

```twig{2-3}
{% do asset.setTransform({
  transform: 'thumb',
  quality: 1
}) %}
<img src="{{ asset.url }}"
     width="{{ asset.width }}"
     height="{{ asset.height }}"
>
```

This would accomplish the same thing as the example before it, except `quality` would be maxed out at 100 rather than whatever’s set on the named `'thumb'` transform.

You can override settings like this with the `getUrl()` method, too:

```twig
<source type="image/webp" srcset="{{ asset.getUrl({
  transform: 'thumb',
  format: 'webp',
}) }}">
```

This would use the named `'thumb'` transform’s settings, but always generate a .webp file.

## Defining Transforms in your Templates

You can also define transforms directly in your templates.

First, you create a hash that defines the transform’s parameters:

```twig
{% set thumb = {
  mode: 'crop',
  width: 100,
  height: 100,
  quality: 75,
  position: 'top-center'
} %}
```

Then pass that hash into your asset’s `getUrl()`, `getWidth()`, and `getHeight()` functions:

```twig
<img src="{{ asset.getUrl(thumb) }}"
     width="{{ asset.getWidth(thumb) }}"
     height="{{ asset.getHeight(thumb) }}"
>
```

Notice in this example there are no quotes around “`thumb`” like there were in our earlier examples. That’s because before we were passing a [string](dev/twig-primer.md#strings) set to a control-panel-defined transform’s handle, whereas in this example we’re passing a [variable](dev/twig-primer.md#variables) referencing the `thumb` hash we created in the template.

It would look similar using `setTransform()` like we did in the previous section:

```twig
{% do asset.setTransform(thumb) %}
<img src="{{ asset.url }}"
     width="{{ asset.width }}"
     height="{{ asset.height }}"
>
```

### Possible Values

All the same settings available to named transforms are available to template-defined transforms.

- The `mode` property can be set to either `'crop'`, `'fit'`, or `'stretch'`.
- If `mode` is set to `'crop'`, you can pass a `position` property, set to either `'top-left'`, `'top-center'`, `'top-right'`, `'center-left'`, `'center-center'`, `'center-right'`, `'bottom-left'`, `'bottom-center'`, or `'bottom-right'`.
- `width` and `height` can be set to integers or omitted.
- `quality` can be set to a number between 0 and 100, or omitted.
- `format` can be set to `'jpg'`, `'gif'`, `'png'`, `'webp'`, or omitted.

### Generating `srcset` Sizes

It’s common to need not just one sized image, but a range of them for use with [`srcset`](https://www.w3schools.com/tags/att_source_srcset.asp).

One way you could achieve this is by combining the [`tag` template function](dev/functions.md#tag) with Craft’s [`getSrcSet()`](craft3:craft\elements\Asset::getSrcSet()) method to output an image tag with a range of `srcset` sizes relative to the initial dimensions:

```twig
{% do asset.setTransform({ width: 300, height: 300 }) %}
{{ tag('img', {
  src: asset.url,
  width: asset.width,
  height: asset.height,
  srcset: asset.getSrcset(['1.5x', '2x', '3x']),
  alt: asset.title,
}) }}
```

You can also pass a `sizes` argument to the [`getImg()`](craft3:craft\elements\Asset::getImg()) method to accomplish the same thing:

```twig
{{ asset.getImg({ width: 300, height: 300 }, ['1.5x', '2x', '3x']) }}
```

::: tip
You can also provide relative image sizes when eager-loading asset transforms. See [`AssetQuery::withTransforms()`](craft3:craft\elements\db\AssetQuery::withTransforms()) in the class reference for an example.
:::
