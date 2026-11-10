# Image Transforms

Instead of requiring content editors to upload images at a specific sizes, Craft lets you define “image transforms” to automatically manipulate images in predefined ways, or on-demand.
Transforms are _non-destructive_, meaning they have no effect on the original uploaded image.

<!-- more -->

Transforms can be defined in the control panel as [named transforms](#named-transforms) or [ad-hoc in templates](#defining-transforms-in-your-templates) and GraphQL queries.

## Named Transforms

Named transforms are created from the [control panel](../system/control-panel.md) by navigating to <Journey path="Settings, Assets, Image Transforms" /> and press **+ New image transform**.

<BrowserShot
    url="https://my-craft-project.ddev.site/admin/settings/assets/transforms/new"
    :link="false"
    caption="Creating a new predefined asset transform in the control panel."
    id="settings"
    :maxHeight="600">
<img src="../images/asset-transform-config.png" alt="Asset transform edit screen">
</BrowserShot>

<Todo notes="Add POI/waypoints to this screen" />

Every transform has the following settings:

Name
:   A user-facing name or label for the transform. This is mostly for your reference, but it _may_ be exposed to content authors when using fields that support inserting asset references, like [CKEditor](plugin:ckeditor) or the built-in [Markdown](../reference/fields/markdown.md) field.

Handle
:   A template-facing handle, used when accessing transforms in Twig or via GraphQL. _Changing this may require updates to your templates!_

Mode
:   Specifies how the transform is handled:

    - [**Crop**](#crop) (Default) — Crops the image to the specified width and height.
    - [**Fit**](#fit) — Scales the image so that it is as big as possible with all dimensions fitting within the specified width and height.
    - [**Letterbox**](#letterbox) — Scales the image to fit within a box of the specified dimensions (like **Fit**), but fills the negative space with a color.
    - [**Stretch**](#stretch) — Stretches the image to the specified width and height.

All [modes](#transform-modes) support some general controls over image size and quality:

Width
:   Final transformed image width, or blank to calculate automatically from the original image’s aspect ratio.

Height
:   Final transformed image height, or blank to calculate automatically from the original image’s aspect ratio.

Allow Upscaling
:   Whether or not Craft is allowed to scale an image beyond its original dimensions. Affects the maximum **Width** and **Height** for **Fit**, **Crop**, and **Stretch** output, and the matting strategy for **Letterbox** transforms.

Quality
:   Sets a quality or compression ratio for the transformed image, depending on the format of the target image. When left blank, the quality will be determined by the <config5:defaultImageQuality> config setting.

Interlacing
:   Specify an [interlacing](https://en.wikipedia.org/wiki/Interlacing_(bitmaps)) strategy for the pixels in raster images.

Image Format
:   Format for the transformed image.

    - Auto: Same as source image, if web-safe (according to `CraftCms\Cms\Image\ImageHelper::webSafeFormats()`); otherwise `jpg`.
    - `jpg`
    - `gif`
    - `png`
    - `webp` (when supported by ImageMagick)
    - `avif` (when supported by ImageMagick)
    - `jxl` (when supported by ImageMagick)

    ::: tip
    The <config5:transformGifs> setting allows you to completely disable transformation of GIF images. Animated GIFs often consume significant resources to resize, and rarely produce well-optimized output.

    You do not need to update templates for this setting to work—Craft will just ignore the transform and return a URL to the original image.
    :::

::: warning
Some modes may behave the same when using only one of the **Width** and **Height** settings. Typically, an unset dimension means the image’s aspect ratio is maintained.

Suppose we have a source image that is 600 pixels wide and 400 pixels tall. Applying a **Stretch** transform that only declares a **Width** of 60 pixels would produce an image 40 pixels tall.
:::

### Supported Formats

Craft can always transform JPEG, PNG, and GIF images.
Other formats can be transformed (and edited in the [Image Editor](../reference/element-types/assets.md#image-editor)) only when your server’s image driver supports them:

- **WebP** and **AVIF** — Supported as source images and output formats.
- **HEIC/HEIF** — Supported as source images.
- **BMP** — Supported as source images.
- **JPEG XL** (`.jxl`) — Supported as source images and output formats, when ImageMagick supports it.

When a transform’s format is set to **Auto**, images in formats that aren’t _web-safe_ (like BMP, HEIC, or JPEG XL) are converted to `jpg`.
Set an explicit format (like `jxl`) to output something else.

::: tip
The [System Report](../system/control-panel.md#utilities) utility shows which image driver Craft is using.
:::

## Transform Modes

Additional settings are available for some transform modes.

### Crop

When using the **Crop** mode, a **Default Focal Point** setting is revealed, allowing customization of which image area Craft should center the crop on when a [focal point](../reference/element-types/assets.md#focal-points) isn’t specified.
Its options include:

Label | Handle
--- | ---
Top-Left | `top-left`
Top-Center | `top-center`
Top-Right | `top-right`
Center-Left | `center-left`
Center-Center | `center-center`
Center-Right | `center-right`
Bottom-Left | `bottom-left`
Bottom-Center | `bottom-center`
Bottom-Right | `bottom-right`

When a focal point _is_ known for an image, Craft will attempt to keep that point as close to the center of the crop as possible.

### Fit

The **Fit** mode always respects the original image’s aspect ratio. The image is scaled to fit within the specified **Width** and/or **Height**, but may not cover the entire allowed area. Focal points have no effect when using this mode, as images are never cropped.

### Letterbox

Two new options are revealed when using the **Letterbox** mode:

- **Fill Color** — A hexadecimal color value used for the matte. When supported, the default matte is transparent; otherwise, white.
- **Image Position** — Where the image will be anchored, when it does not fill the entire target frame. The same anchoring options are available here as for the **Default Focal Point** option in the **Crop** and **Fit** modes.

Letterbox mode preserves images’ aspect ratios, fitting them within the provided width and height and filling the remaining space with the **Fill Color**. If the target frame is larger than the original image’s dimensions and the **Allow Upscaling** option is _Off_, Craft may matte the image on more than two sides.

### Stretch

Like **Crop** and **Fit**, **Stretch** is only differentiated from other transforms when used with a **Height** _and_ a **Width** setting.

With both set, the image is scaled horizontally _and_ vertically to the target size.

::: warning
As the name of this mode suggests, using a target height and width that are a different aspect ratio than the original image will cause the image to be stretched disproportionately.
:::

## Applying Named Transforms to Images

To output an image with your named transform applied, pass its name to an asset’s `getImg()` method:

```twig
{{ asset.getImg('thumb') }}
```

This is equivalent to building an `<img>` tag from individual properties of an `CraftCms\Cms\Asset\Data\AssetTransformResult`, which you can get via `asset.transform('thumb')`:

```twig
{% set transform = asset.transform('thumb') %}

<img src="{{ transform.url }}"
  width="{{ transform.width }}"
  height="{{ transform.height }}">
```

## Defining Transforms in your Templates

You can also define transforms directly in your templates by creating a hash with the desired parameters:

```twig
{% set thumb = {
  mode: 'crop',
  width: 100,
  height: 100,
  quality: 75,
  position: 'top-center'
} %}
```

::: tip
See a list of all the [possible keys and values](#possible-values) for this object.
:::

Then pass that hash into your asset’s `getImg()` or `transform()` methods:

```twig
{{ asset.getImg(thumb) }}

{# ... #}

{% set transform = asset.transform(thumb) %}

<img src="{{ transform.url }}"
  width="{{ transform.width }}"
  height="{{ transform.height }}">
```

Notice in this example there are no quotes around `thumb`, like there were in earlier ones.
That’s because before we were passing a [string](twig.md#strings) set to reference a control-panel-defined transform by its handle, whereas this example passes a [variable](twig.md#variables) containing the `thumb` options hash we created in the template.

### Possible Values

All the same settings available to [named transforms](#named-transforms) are available to template-defined transforms and transforms requested via [GraphQL](#graphql).

- The `mode` property can be set to either `'crop'`, `'fit'`, `'letterbox'`, or `'stretch'`.
- `width` and `height` can each be set to an integer, or omitted.
- `quality` can be set to a number between 0 and 100, or omitted to use the <config5:defaultImageQuality> setting.
- `format` can be set to `'jpg'`, `'gif'`, `'png'`, `'webp'`, `'avif'`, `'jxl'`, or omitted. Formats other than `jpg`, `gif`, and `png` must be [supported](#supported-formats) by your server.
- A `position` property (set to one of the [valid values](#crop) listed above) is supported when `mode` is set to `'crop'` or `'letterbox'`. The behavior is different for each [type of transform](#transform-modes).

### Overriding Named Transforms

Should you need to break from a named transform in a few places, you can specify overrides alongside a `transform` key:

```twig{2-3}
{% set transform = asset.transform({
  transform: 'thumb',
  quality: 100,
}) %}

<img
  src="{{ transform.url }}"
  width="{{ transform.width }}"
  height="{{ transform.height }}">
```

This would accomplish the same thing as the example before it, except `quality` would be maxed out at 100 rather than whatever was set on the named `'thumb'` transform.
Any of the [transform options](#possible-values) can be used in the passed configuration as overrides.

### Generating `srcset` Sizes

Transforms are a great way to avoid serving unnecessarily-large images to your users—but there’s still room for optimization!
Most browsers support the [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) attribute, which allows you to define a collection of images that are appropriate for a given device or viewport.

Rather than creating an exhaustive list of named transforms or building up multiple config hashes in your templates, you can offload this work to Craft with the `getSrcSet()` method.
Here’s an example that uses the [`tag` template function](../reference/twig/functions.md#tag) to render an image with a `srcset` attribute containing three variations based on a single transform:

```twig
{{ tag('img', {
  src: asset.url,
  width: asset.width,
  height: asset.height,
  srcset: asset.getSrcset(['1.5x', '2x', '3x'], { width: 300, height: 300 }),
  alt: asset.title,
}) }}
```

This can be done even more succinctly by passing a second `sizes` argument to the `getImg()` method:

```twig
{{ asset.getImg({ width: 300, height: 300 }, ['1.5x', '2x', '3x']) }}
```

Don’t forget to configure the corresponding `sizes` attribute, as well—Craft can manage the transforms and build a valid `srcset`, but it doesn’t know how the images are actually used in your front-end!

::: tip
You can also provide `srcset` variations when eager-loading asset transforms.
See `EagerloadsTransforms::withTransforms()` for an example.
:::

## Asset Transformers

Craft separates transforms (the way you intend to use assets) and drivers (the way transforms are generated).
Disks point to a transformer, which is used any time an asset stored on that disk needs to be modified.
This allows projects to combine storage, transformation, and distribution in a way that suits their needs.

By default, all transforms are generated with the built-in `craft` driver, which delegates image manipulation and conversion to a system binary (typically ImageMagick or GD).
Plugins can provide additional drivers.

Transformers are configured alongside each disk in `config/filesystems.php`:

```php
<?php

return [
    'disks' => [
        'uploads' => [
            'driver' => 'local',
            'root' => public_path('uploads'),
            'url' => rtrim((string) env('APP_URL'), '/').'/uploads',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
            'asset_transformer' => [
                // The sole, default transform driver:
                'driver' => 'craft',
                // Use a different disk for output:
                'output_disk' => 'distributionCdn',
                // Generate URLs directly to the transformed images:
                'has_urls' => true,
            ],
        ],
    ],
];
```

Most disks (local or remote) can use the default configuration by omitting the `asset_transformer` key, altogether.

::: warning
Transforms and disks both use a `driver` key (as do other Laravel service configurations), but they _do not_ accept the same values!
:::

The default `craft` transformer builds transforms’ paths from…

- …the source volume’s UUID, prefixed with a `_` (to avoid collisions between similarly-named or located assets between volumes, and to prevent re-indexing);
- …the source asset’s path within its volume;
- …a stable string representation of the transform (like `_190x190_crop_center-center_none`);
- …the original filename;
- …the transform’s new extension;

Suppose two volumes share an underlying `local` disk (like _Product Diagrams_ and _Photos_, with sub-paths `diagrams` and `photos`, respectively):

- When an asset in the _Photos_ volume (at `staff/group-shot-hq.jpg`) is transformed, it would end up on the output disk in `_{photos-volume-uuid}/staff/{transform-string}/group-shot-hq.{ext}`.
- When an asset in the _Product Diagrams_ volume (at `ACME-SKU-123/schematic.png`), it would end up on the output disk in `_{diagrams-volume-uuid}/ACME-SKU-123/{transform-string}/schematic.{ext}`.

::: tip
You can target a [scoped disk](laravel:filesystem#scoped-and-read-only-filesystems) to prevent volume UUIDs polluting the top-level directory of a disk.
The `prefix` of that disk should begin with an underscore (`_`), so the directory is ignored when indexing assets.
:::

If you find the need to switch transform drivers (or `output_disk`s) after some transforms have already been generated, you must clear Craft’s transform index (`php artisan craft:clear-caches/transform-indexes`).
We also recommend deleting the old transform root before regenerating any new transforms, especially as the new and old trees will quickly become tangled.

## GraphQL

When requesting asset data via the [GraphQL](graphql.md) API, you can get named and [ad-hoc](#defining-transforms-in-your-templates) transforms with the `@transform` directive.

::: warning
To prevent abuse, the `@transform` directive is disabled by default.
You can enable it on a per-schema basis by visiting <Journey path="GraphQL, Schemas, *Schema" />

The `disableGraphqlTransformDirective` setting can be used to globally disable transforms, regardless of existing schemas’ settings.
:::

Like we’ve seen in the template-defined transforms, the GraphQL API allows you to retrieve individual properties as though they were tied to a transform…

::: code
```graphql Query
query Thumbnails {
  assets(volume: "images") {
    title
    alt
    url @transform(width: 640, mode: "fit")
    width
    height
  }
}
```
```json Data
{
  "data": {
    "assets": [
      {
        "title": "Warm Springs",
        "alt": "Snow-dusted plateau.",
        "url": "https://my-project.ddev.site/uploads/_a02075aa-8fb3-47d4-a146-af563acb7edf/_640xAUTO_fit_center-center_none/8/warm-springs.jpg",
        "width": 6000,
        "height": 4000
      },
      {
        "title": "Highway 26",
        "alt": "Winter scene near Warm Springs, Oregon",
        "url": "https://my-project.ddev.site/uploads/_a02075aa-8fb3-47d4-a146-af563acb7edf/_640xAUTO_fit_center-center_none/3/highway-26.jpg",
        "width": 6000,
        "height": 4000
      }
    ]
  }
}
```
:::

…or set a transform on the entire asset object:

::: code
```graphql Query
query Gallery {
  assets(volume: "images") @transform("fullscreen") {
    title
    alt
    url
    width
    height
  }
}
```
```json Data
{
  "data": {
    "asset": {
      "title": "Warm Springs",
      "alt": "Highway 26, south of Warm Springs, Oregon",
      "url": "https://my-project.ddev.site/uploads/images/_fullScreen/8/warm-springs.jpg",
      "width": 2560,
      "height": 1707
    }
  }
}
```
:::

Note that in the first example, the `height` and `width` values are for the _original_ image, whereas in the second example, they reflect the _transformed_ dimensions.
