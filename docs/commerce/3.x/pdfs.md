# PDFs

Commerce includes the option to create any number of order PDFs that can be downloaded from the control panel or included in [status emails](#order-status-emails.md).

You can manage these PDFs in the control panel visiting **Commerce** → **System Settings** → **PDFs**.

Each PDF consists of basic naming details and a Twig template to be rendered on demand with [Dompdf](https://github.com/dompdf/dompdf), which translates your template’s output into a PDF file.

## Creating a PDF

Commerce does not include any PDFs by default. To add one, visit **Commerce** → **System Settings** → **PDFs**, and choose **New PDF**.

You’ll need to enter a few details:

- **Name** is whatever you’d like to call the PDF in the control panel.
- **Handle** is a reference to be used in templates.
- **Description** is an optional note for explaining the template’s layout or purpose.
- **PDF Template Path** should point to the Twig template that should be used for rendering the PDF file. (Add the [`shop/special/receipt`](https://github.com/craftcms/commerce/blob/develop/example-templates/shop/special/receipt.twig) example template here if you’d like to see one in action.)
- **Order PDF Filename Format** determines what the generated filename should look like. It can include tags for outputting order properties such as `{number}` or `{myOrderCustomField}`. (A `.pdf` extension will automatically be appended so you don’t need to add it here.)
- **Enabled?** can be used to quickly toggle the PDF and control whether it’s available and sent in emails configured to use it.
- **Default Order PDF** will appear only when you’re editing an additional or non-default PDF. Select this checkbox to make the current template the new default when you save it.

Once you’ve saved an enabled template, you’ll immediately be able to use it in the control panel and configure emails to utilize it.

## Downloading a PDF

Once at least one PDF is enabled, you can download it from any order detail page in the control panel.

Visit **Commerce** → **Orders**, choose an order, and then choose **Download PDF** from the top right corner of the page. If multiple PDFs are available, the single download button will download the default PDF and include a dropdown menu for selecting whichever PDF you would like.

## Including a PDF in an Order Email

You can automatically attach a copy of a PDF in order emails.

Create a new [order email](order-status-emails.md) or select an existing one. You’ll see your new PDF(s) available in the **PDF Attachment** field. Select whichever PDF you’d like, choose **Save**, and that PDF will be included along with the email when it’s sent.


## Creating PDF Templates

It might be easiest to start by modifying the [`shop/special/receipt`](https://github.com/craftcms/commerce/blob/develop/example-templates/shop/special/receipt.twig) example template, previewing it in a browser for convenience until things are mostly as you’d like them.

Avoid extending your regular site layouts for PDF templates, since your site most likely includes references to scripts and styles that may cause issues with PDF conversion.

::: tip
Regardless of how you work, be sure to test your template by downloading an actual rendered PDF from an order page.
:::

The following config settings can be used for customizing PDF output:

- [pdfPaperOrientation](config-settings.md#pdfpaperorientation)
- [pdfPaperSize](config-settings.md#pdfpapersize)
- [pdfAllowRemoteImages](config-settings.md#pdfallowremoteimages)

### Templating Tips

Creating a PDF template is similar to building HTML intended for an email client: the output constraints are far more limiting than those of modern web browsers. You’ll have the same power you’re used to with Craft Twig templates, but it’s important to aim for markup that translates well into a PDF file.

There’s no correct way to build a PDF template, but the following tips should help.

#### Limit Complexity

Simple templates work best. Images, custom fonts, and nuanced styling are likely to require careful work for optimal rendering and performance.

In general:

- Limit image processing.
- Avoid excessively complex markup and high tag counts.
- Don’t over-use images, and wherever possible rely on `jpeg` or `svg` formats with physical dimensions as close as possible to their intended/final display size.
- Limit image use to the following formats since Dompdf will ignore any others: `gif`, `png`, `jpeg`, `bmp`, `svg`.

#### Careful with External References

It’s best to keep whatever you can in the template itself. Styles, for example, are most reliable and performant embedded within a `<style>` tag rather than an external `.css` file.

The `@font-face` declaration is supported, but you’ll want to ensure the font itself is rendered properly. (Dompdf attempts to cache font files from remote URLs and can use local fonts in a special folder which requires more setup.)

The [`pdfAllowRemoteImages`](config-settings.md#pdfallowremoteimages) setting is `false` by default, so any images in your templates must be provided with `data:` URLs:

```twig
{# base64-encoded SVG image works when `pdfAllowRemoteImages` is `false` #}
<img width="75" height="75" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTg5LjYgMGM1LjggMCAxMC41IDQuNyAxMC40IDEwLjV2NzljMCA1LjgtNC44IDEwLjUtMTAuNSAxMC41aC03OWMtNS44IDAtMTAuNS00LjctMTAuNS0xMC42di03OC45YzAtNS44IDQuNy0xMC41IDEwLjUtMTAuNXptLTE1LjEgNTBoLTQ4Ljh2MTIuOWMwIC45LjMgMS44LjkgMi40LjcuNiAxLjUuOSAyLjQuOWg0Mi4xYy45IDAgMS44LS4zIDIuNC0uOS42LS43LjktMS41LjktMi40em0tMjcuMiA4LjF2Mi43aC04LjF2LTIuN3ptLTEwLjkgMHYyLjdoLTUuNHYtMi43em0zNC41LTI0LjJoLTQyYy0uOSAwLTEuNy4zLTIuNC45LS42LjctLjkgMS41LS45IDIuNHY0LjdoNDguNnYtNC43YzAtLjktLjMtMS44LS45LTIuNC0uNy0uNi0xLjUtLjktMi40LS45eiIgZmlsbD0iI2U1NDIyYiIvPjwvc3ZnPg==" />
```

Enabling `pdfAllowRemoteImages` will make it possible to utilize image URLs in your templates, but you’ll likely need to experiment with URLs that work for your environment and Dompdf version.

#### Beware Dompdf Caching

Dompdf independently caches references to images and fonts when it finds them. This can sometimes be confusing and explain differences between different environments.

## Customizing PDF Rendering

Commerce ships with limited configuration options for Dompdf, but exposes [`beforeRenderPdf`](extend/events.md#beforerenderpdf) and [`afterRenderPdf`](extend/events.md#afterrenderpdf) events you can use to control over how PDFs are ultimately rendered. You can use them to customize Dompdf’s options and output or even skip Dompdf altogether and render PDFs however you’d prefer.
