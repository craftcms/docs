# PDFs

Commerce includes the option to create any number of order PDFs that can be downloaded from the control panel or included in [status emails](emails.md#pdf-attachment). PDFs are configured independently for each store.

You can manage these PDFs in the control panel visiting <Journey path="Commerce, System Settings, PDFs" />.

Each PDF consists of basic naming details and a Twig template to be rendered on-demand with [Dompdf](https://github.com/dompdf/dompdf), which translates the template’s HTML output into a PDF file.

## Creating a PDF

Commerce does not include any PDFs by default. To add one, visit <Journey path="Commerce, System Settings, PDFs" />, and choose **New PDF**.

You’ll need to enter a few details:

- **Name** is whatever you’d like to call the PDF in the control panel.
- **Handle** is a reference to be used in templates.
- **Description** is an optional note for explaining the template’s layout or purpose.
- **PDF Template Path** should point to the Twig template that should be used for rendering the PDF file. (Add the [receipt example template](https://github.com/craftcms/commerce/blob/5.x/example-templates/dist/shop/_private/receipt/index.twig) here if you’d like to see one in action.)
- **Order PDF Filename Format** determines what the generated filename should look like when a PDF is downloaded or attached to an email. This is evaluated as an [object template](/5.x/system/object-templates.md). (A `.pdf` extension will automatically be appended, so you should not include it in your template.)
- **Language** lets you designate the language to be used when the PDF is rendered. It defaults to “The language the order was made in,” but can be set to any of your [sites](/5.x/system/sites.md)’ languages (or a specific language).
- **Paper Orientation:** Portrait (long edge _vertical_, default) or Landscape (long edge _horizontal_).
- **Paper Size:** Choose a standard paper or label size. Defaults to US Letter (8.5" &times; 11").
- **Enabled?** can be used to quickly toggle the PDF on or off to control whether it gets attached to emails configured to use it.
- **Default Order PDF** will appear only when you’re editing a non-default PDF. Select this to replace the current default PDF when you save it.

Once you’ve saved an enabled PDF, you can render and download it from orders in the control panel, and attach it to emails.

## Downloading a PDF

You can download any enabled PDF from the control panel’s order element index or order detail screen.

Visit <Journey path="Commerce, Orders" />, select one or more orders in the table, then press **Download PDF…** at the top of the page. Choose your desired PDF format and whether you’d prefer a ZIP file containing your document(s) or a single, collated PDF.

You can also click **Download PDF** from the top right corner of an order’s edit screen. If multiple PDFs are available, the main button will download the default PDF and the rest will be accessible via the fly-out menu.

## Including a PDF in an Order Email

You can automatically attach a PDF to order [emails](emails.md).

Create a new email or select an existing one. You’ll see your new PDF(s) available in the **PDF Attachment** field. Select whichever PDF you’d like, choose **Save**, and that PDF will be rendered and attached to the email whenever it’s sent.

## Creating PDF Templates

Review our [example receipt template](https://github.com/craftcms/commerce/blob/5.x/example-templates/dist/shop/_private/receipt/index.twig), previewing it in a browser for convenience until things are mostly as you’d like them.

<Block label="Previewing PDF Templates">

PDFs cannot be previewed from a browser, out-of-the-box, but they can be temporarily [exposed via `routes.php`](/5.x/system/routing.md#advanced-routing-with-url-rules), like this:

```php
return [
    // If your PDF templates are located somewhere else, adjust this path:
    'pdf/test/<orderNumber:[a-f0-9]{32}>' => ['template' => 'shop/_private/receipt/index'],
];
```

At the top of the template, add this:

```twig
{% if currentUser and currentUser.admin %}
  {% set order = order ?? craft.orders()
    .number(orderNumber)
    .one() %}
{% endif %}
```

Find a full order number in the control panel, and visit `https://my-project.ddev.site/pdf/test/73f9f2af9f870019c752ab85073441a9` in your browser (where `73f9f2a...` is your order number).

This process bears a lot in common with our recommendations for [displaying orders after checkout](../development/orders.md#routing)—except that it only allows administrators to preview arbitrary orders!

</Block>

The global `pdfAllowRemoteImages` [config setting](../configure.md#config-settings) governs whether the renderer will download and embed remote images, including those uploaded to Craft.

::: warning
Avoid extending your regular site layouts for PDF templates, as they may include references to scripts and styles that cause issues with PDF conversion.
:::

### Templating Tips

Creating a PDF template is similar to building HTML intended for an email client: the output constraints are far more limiting than those of modern web browsers. You’ll have the same power you’re used to with Twig templates, but it’s important to aim for markup that translates well into a PDF file.

There’s no correct way to build a PDF template, but the following tips should help.

#### Limit Complexity

Simple templates work best. Images, custom fonts, and nuanced styling are likely to require careful work for optimal rendering and performance.

In general:

- Limit image processing.
- Avoid excessively complex markup and high tag counts.
- Don’t over-use images, and wherever possible rely on `jpeg` or `svg` formats with physical dimensions as close as possible to their intended/final display size.
- Limit image use to the following formats (Dompdf will ignore any others): `gif`, `png`, `jpeg`, `bmp`, `svg`.

#### Exercise Caution when using External References

It’s best to keep whatever you can in the template itself. Styles, for example, are most reliable and performant embedded within a `<style>` tag rather than an external `.css` file.

The `@font-face` declaration is supported, but you’ll want to ensure the font itself is rendered properly. (Dompdf attempts to cache font files from remote URLs and can use local fonts in a special folder which requires more setup.)

::: tip
If you’re seeing missing or incorrect characters (i.e. `�` or `□`) where you didn’t expect them, make sure your template specifies the correct content type and charset:

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
```
:::

The [`pdfAllowRemoteImages`](../configure.md#pdfallowremoteimages) setting is `false` by default, so any images in your templates must be provided with [data URLs](/5.x/reference/twig/functions.md#dataurl):

```twig
{# base64-encoded SVG images work when `pdfAllowRemoteImages` is `false` #}
<img width="75" height="75" src="{{ dataUrl('@webroot/images/store-logo.svg') }}" alt="Store logo"/>
```

Enabling `pdfAllowRemoteImages` will make it possible to utilize image URLs in your templates, but you’ll likely need to experiment with URLs that work for your environment and Dompdf version.

#### Beware Dompdf Caching

Dompdf independently caches references to images and fonts when it finds them. This can sometimes be confusing and result in differences between output across environments.

## Customizing PDF Rendering

Commerce ships with limited configuration options for Dompdf, but exposes [`beforeRenderPdf`](../extend/events.md#beforerenderpdf) and [`afterRenderPdf`](../extend/events.md#afterrenderpdf) for controlling how PDFs are ultimately rendered. You can use them to customize Dompdf’s options and output or even skip Dompdf altogether and render PDFs however you’d prefer!
