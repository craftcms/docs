# 画像の変形

Instead of requiring content editors to upload images at a certain size, Craft lets you define “image transforms” for automatically manipulating images on demand. Transforms are _non-destructive_, meaning they have no effect on the original uploaded image.

Transforms can be defined in the control panel and directly from your templates or GraphQL queries.

## コントロールパネルからトランスフォームの定義

You can define transforms from the control panel by navigating to **Settings** → **Assets** → **Image Transforms** and choosing **New Transform**.

Each transform has the following settings:

- **名前** – ユーザーに対する画像変形の名前
- **ハンドル** – テンプレートに対する画像変形のハンドル
- **モード** – 変換モード
- **幅** – 変換結果の幅
- **高さ** – 変換結果の高さ
- **品質** - 変換結果の画像品質（0 から 100）
- **画像フォーマット** – 変換結果の画像フォーマット

**Mode** can be set to the following values:

- **切り抜き** – 指定された幅と高さに画像を切り抜き、必要であれば画像を拡大します。 （これがデフォルトのモードです。
- **Fit** – Scales the image so that it is as big as possible with all dimensions fitting within the specified width and height.
- **ストレッチ** – 指定された幅と高さに画像を伸張します。

If **Mode** is set to “Crop”, an additional “Default Focal Point” setting will appear, where you can define which area of the image Craft should center the crop on, for images without a designated [focal point](assets.md#focal-points). Its options include:

- 上左
- 上中
- 上右
- 中央 - 左
- 中央 - 中央
- 中央 - 右
- 下部左
- 下部中央
- 下部右

If you leave either **Width** or **Height** blank, that dimension will be set to whatever maintains the image’s aspect ratio. So for example, if you have an image that is 600 by 400 pixels, and you set a transform’s Width to 60, but leave Height blank, the resulting height will be 40.

If you leave **Quality** blank, Craft will use the quality set by your <config3:defaultImageQuality> config setting.

**Image Format** can be set to the following values:

- jpg
- png
- gif
- webp

If you leave **Image Format** blank, Craft will use the original image’s format if it’s [web-safe](craft3:craft\helpers\Image::webSafeFormats()); otherwise it will try to figure out the best-suited image format for the job. If it can’t determine that (probably because ImageMagick isn’t installed), it will just go with .jpg.

### CP で定義された画像の変形を適用する

To output an image with a transform applied, simply pass your transform’s handle into your asset’s [getUrl()](craft3:craft\elements\Asset::getUrl()), [getWidth()](craft3:craft\elements\Asset::getWidth()), and [getHeight()](craft3:craft\elements\Asset::getHeight()) functions:

```twig
<img src="{{ asset.getUrl('thumb') }}"
     width="{{ asset.getWidth('thumb') }}"
     height="{{ asset.getHeight('thumb') }}"
>
```

## テンプレート内でトランスフォームを定義する

You can also define transforms directly in your templates.

First, you must create a [hash](dev/twig-primer.md#hashes) that defines the transform’s parameters:

```twig
{% set thumb = {
    mode: 'crop',
    width: 100,
    height: 100,
    quality: 75,
    position: 'top-center'
} %}
```

Then you can pass that hash into your asset’s `getUrl()`, `getWidth()`, and `getHeight()` functions:

```twig
<img src="{{ asset.getUrl(thumb) }}"
     width="{{ asset.getWidth(thumb) }}"
     height="{{ asset.getHeight(thumb) }}"
>
```

Note how in that example there are no quotes around “`thumb`”, like there were in the first one. That’s because in the first one, we were passing a [string](dev/twig-primer.md#strings) set to a CP-defined transform’s handle, whereas in this example we’re passing a [variable](dev/twig-primer.md#variables) referencing the `thumb` hash we created within the template.

### 利用可能な値

All of the same settings available to CP-defined transforms are also available to template-defined transforms.

- `mode` プロパティには、`'crop'`、`'fit'`、または `'stretch'` をセットすることができます。
- `mode` に `'crop'` をセットした場合、`position` プロパティに `'top-left'`、`'top-center'`、 `'top-right'`、`'center-left'`、`'center-center'`、`'center-right'`、`'bottom-left'`、`'bottom-center'`、または `'bottom-right'` のいずれかをセットして渡すことができます。
- `width` と `height` は、整数をセットするか、省略できます。
- `quality` は、0 から 100 の間の数値をセットするか、省略できます。
- `format` can be set to `'jpg'`, `'gif'`, `'png'`, `'webp'`, or omitted.

### Overriding Named Transforms

As of Craft 3.5 it’s possible to [use named transforms in templates](#applying-cp-defined-transforms-to-images) with `getUrl()`’s `transform` property and override other properties as needed.

In this example, we’re using the rules defined in `myNamedTransform` but explicitly outputting a `webp` image:

```twig
<source type="image/webp" srcset="{{ asset.getUrl({
    transform: 'myNamedTransform',
    format: 'webp',
}) }}">
```

### Generating `srcset` Sizes

It’s common to need not just one sized image, but a range of them for use with [`srcset`](https://www.w3schools.com/tags/att_source_srcset.asp).

One way you could achieve this is by combining the [`tag` template function](dev/functions.md#tag) with Craft 3.5’s new [`getSrcSet()`](craft3:craft\elements\Asset::getSrcSet()) method to output an image tag with a range of `srcset` sizes relative to the initial dimensions:

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
