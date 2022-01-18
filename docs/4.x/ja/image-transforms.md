# 画像変換

コンテンツ編集者に実サイズの画像アップロードを要求する代わりに、Craft では必要に応じて自動的に画像を操作するための「画像変換」を定義できます。トランスフォームは _非破壊的_ で、アップロードされた元画像には影響しません。

トランスフォームは、コントロールパネルで定義することも、テンプレートや GraphQL クエリから直接定義することもできます。

## コントロールパネルからトランスフォームの定義

「設定 > アセット > 画像変換」に移動し、「新しい画像変換」ボタンをクリックすることで、コントロールパネルからトランスフォームを定義できます。

トランスフォームには、次の設定があります。

* **名前** – ユーザーに対する画像変換の名前
* **ハンドル** – テンプレートに対する画像変換のハンドル
* **モード** – 変換モード
* **幅** – 変換結果の幅
* **高さ** – 変換結果の高さ
* **品質** - 変換結果の画像品質（0 から 100）
* **画像フォーマット** – 変換結果の画像フォーマット

**モード**には、次の値をセットできます。

* **切り抜き** – 指定された幅と高さに画像を切り抜き、必要であれば画像を拡大します。（これがデフォルトのモードです。）
* **フィット**  – すべての寸法が指定された幅と高さに収まる範囲で、可能な限り大きいサイズになるよう画像を拡大・縮小します。
* **ストレッチ** – 指定された幅と高さに画像を伸張します。

**モード**で「切り抜き」がセットされた場合、[焦点](assets.md#focal-points)が設定されていない画像に対して Craft がどのエリアを切り抜きの中心にすべきかを決定する「デフォルトの焦点」プルダウンが表示されます。オプションには、次のものが含まれます。

* 上左
* 上中
* 上右
* 中央 - 左
* 中央 - 中央
* 中央 - 右
* 下部左
* 下部中央
* 下部右

**幅**または**高さ**のいずれかを空白のままにすると、その寸法は画像の縦横比を維持するようセットされます。例えば、600 x 400 ピクセルの画像があり、変形の幅を 60 に設定し、高さを空白のままにした場合、変形した画像の高さは 40 になります。

**品質**を空白のままにすると、Craft はコンフィグ設定 <config3:defaultImageQuality> にセットされた品質を使用します

**画像フォーマット**には、次の値をセットできます。

* jpg
* png
* gif

**画像フォーマット**を空欄のままにすると、Craft は web-safe（.jpg、 .png、または .gif） なら元画像のフォーマットを使い、そうでなければ、そのジョブに最適な画像フォーマットを見つけようと試みます。（おそらく、ImageMagik がインストールされていないために）それを決定できない場合は、.jpg として処理されます。

### コントロールパネルで定義された画像変換を適用する

トランスフォームを適用した画像を出力するには、トランスフォームのハンドルをアセットの [getUrl()](craft3:craft\elements\Asset::getUrl())、[getWidth()](craft3:craft\elements\Asset::getWidth())、および、[getHeight()](craft3:craft\elements\Asset::getHeight()) ファンクションに渡します。

```twig
<img src="{{ asset.getUrl('thumb') }}"
     width="{{ asset.getWidth('thumb') }}"
     height="{{ asset.getHeight('thumb') }}"
>
```

## テンプレート内でトランスフォームを定義する

テンプレート内で直接トランスフォームを定義することもできます。

はじめに、トランスフォームのパラメータを定義した[ハッシュ](dev/twig-primer.md#hashes)を作成する必要があります。

```twig
{% set thumb = {
    mode: 'crop',
    width: 100,
    height: 100,
    quality: 75,
    position: 'top-center'
} %}
```

次に、そのハッシュをアセットの `getUrl()`、`getWidth()`、および、`getHeight()` ファンクションへ渡します。

```twig
<img src="{{ asset.getUrl(thumb) }}"
     width="{{ asset.getWidth(thumb) }}"
     height="{{ asset.getHeight(thumb) }}"
>
```

ここでは、最初の例のように「`thumb`」の周りに引用符がないことに注意してください。最初の例ではコントロールパネルで定義されたトランスフォームのハンドルを[文字列](dev/twig-primer.md#strings)として渡しているのに対して、この例ではテンプレート内で作成した `thumb` ハッシュを参照するための[変数](dev/twig-primer.md#variables)として渡しているためです。

### 利用可能な値

コントロールパネルで定義されたトランスフォームで利用可能なすべて設定は、同様にテンプレートで定義されたトランスフォームでも利用できます。

* `mode` プロパティには、`'crop'`、`'fit'`、または、`'stretch'` をセットできます。
* `mode` に `'crop'` をセットした場合、`position` プロパティに `'top-left'`、`'top-center'`、`'top-right'`、`'center-left'`、`'center-center'`、`'center-right'`、`'bottom-left'`、`'bottom-center'`、または、`'bottom-right'` のいずれかをセットして渡すことができます。
* `width` と `height` は、整数をセットするか、省略できます。
* `quality` は、0 から 100 の間の数値をセットするか、省略できます。
* `format` には `'jpg'`、`'gif'`、`'png'` をセットするか、省略できます。

### 名前付けされた画像変換の上書き

Craft 3.5 から `getUrl()` の `transform` プロパティで [テンプレート内で名前付き画像変換を使用](#applying-cp-defined-transforms-to-images)し、必要に応じて他のプロパティを上書きできます。

この例では、`myNamedTransform` で定義されたルールを利用していますが、明示的に `webp` 画像を出力しています。

```twig
<source type="image/webp" srcset="{{ asset.getUrl({
    transform: 'myNamedTransform',
    format: 'webp',
}) }}">
```

### `srcset` サイズの生成

1つの画像サイズだけでなく、[`srcset`](https://www.w3schools.com/tags/att_source_srcset.asp) で使用するための様々な画像が必要になるのが一般的です。

これを実現する方法の1つは、[テンプレートファンクションの `tag`](dev/functions.md#tag) と Craft 3.5 の新しい [`getSrcSet()`](craft3:craft\elements\Asset::getSrcSet()) メソッドを組み合わせて、初期の寸法から相対的な `srcset` サイズの画像タグを出力することです。

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

[`getImg()`](craft3:craft\elements\Asset::getImg()) メソッドに引数 `sizes` を渡せば、同じことができます。

```twig
{{ asset.getImg({ width: 300, height: 300 }, ['1.5x', '2x', '3x']) }}
```

::: tip
Eager-Loading でアセットトランスフォームする際に、相対的な画像サイズを指定することもできます。実例については、クラスリファレンスの [`AssetQuery::withTransforms()`](craft3:craft\elements\db\AssetQuery::withTransforms()) を参照してください。
:::
