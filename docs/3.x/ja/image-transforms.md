# 画像の変形

Instead of requiring content editors to upload images at a specific sizes, Craft lets you define “image transforms” for automatically manipulating images on demand. トランスフォームは _非破壊的_ で、アップロードされた元画像には影響しません。

トランスフォームは、コントロールパネルで定義することも、テンプレートや GraphQL クエリから直接定義することもできます。

## コントロールパネルからトランスフォームの定義

You can define named transforms from the control panel by navigating to **Settings** → **Assets** → **Image Transforms** and press **New Transform**.

トランスフォームには、次の設定があります。

- **名前** – ユーザーに対する画像変形の名前
- **ハンドル** – テンプレートに対する画像変形のハンドル
- **モード** – 変換モード
- **幅** – 変換結果の幅
- **高さ** – 変換結果の高さ
- **品質** - 変換結果の画像品質（0 から 100）
- **画像フォーマット** – 変換結果の画像フォーマット

**モード**には、次の値をセットできます。

- **切り抜き** – 指定された幅と高さに画像を切り抜き、必要であれば画像を拡大します。 （これがデフォルトのモードです。
- **フィット**  – すべての寸法が指定された幅と高さに収まる範囲で、可能な限り大きいサイズになるよう画像を拡大・縮小します。
- **ストレッチ** – 指定された幅と高さに画像を伸張します。

If **Mode** is set to “Crop”, an additional “Default Focal Point” setting will appear for defining which image area Craft should center the crop on when a [focal point](assets.md#focal-points) isn’t specified. オプションには、次のものが含まれます。

- 上左
- 上中
- 上右
- 中央 - 左
- 中央 - 中央
- 中央 - 右
- 下部左
- 下部中央
- 下部右

If you leave **Width** or **Height** blank, that dimension will be set to whatever maintains the image’s aspect ratio. For example, if you have an image that is 600 by 400 pixels, and you set a transform’s Width to 60, but leave Height blank, the resulting height will be 40.

**品質**を空白のままにすると、Craft はコンフィグ設定 <config3:defaultImageQuality> にセットされた品質を使用します

**画像フォーマット**には、次の値をセットできます。

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

## テンプレート内でトランスフォームを定義する

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

Notice in this example there are no quotes around “`thumb`” like there were in our earlier examples. That’s because before we were passing a [string](dev/twig-primer.md#strings) set to a CP-defined transform’s handle, whereas in this example we’re passing a [variable](dev/twig-primer.md#variables) referencing the `thumb` hash we created in the template.

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

- `mode` プロパティには、`'crop'`、`'fit'`、または `'stretch'` をセットすることができます。
- `mode` に `'crop'` をセットした場合、`position` プロパティに `'top-left'`、`'top-center'`、 `'top-right'`、`'center-left'`、`'center-center'`、`'center-right'`、`'bottom-left'`、`'bottom-center'`、または `'bottom-right'` のいずれかをセットして渡すことができます。
- `width` と `height` は、整数をセットするか、省略できます。
- `quality` は、0 から 100 の間の数値をセットするか、省略できます。
- `format` には `'jpg'`、`'gif'`、`'png'` をセットするか、省略できます。

### `srcset` サイズの生成

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
