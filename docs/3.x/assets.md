---
containsGeneratedContent: yes
---

# Assets

You can manage your project’s media and document files (“assets”) in Craft just like entries and other content types.

## Volumes

All of your assets live in “volumes”. Volumes are storage containers. A volume can be a directory on the web server, or a remote storage service like Amazon S3.

You can manage your project’s volumes from **Settings** → **Assets**.

All volumes let you choose whether the assets within them should have public URLs, and if so, what their **base URL** should be.

::: tip
Volumes’ base URLs can be set to an environment variable, or begin with an alias. See [Environmental Configuration](config/#environmental-configuration) to learn more about that.
:::

### Local Volumes

Out of the box, you can create one type of volume, “Local”. Local volumes represent a directory on the local web server.

Local volumes have one setting: **File System Path**. Use this setting to define the path to the volume’s root directory on the server.

::: tip
Local volumes’ file system path can be set to an environment variable, or begin with an alias. See [Environmental Configuration](config/#environmental-configuration) to learn more about that.
:::

Note that Craft/PHP must be able to write to the directory you created.

### Remote Volumes

If you would prefer to store your assets on a remote storage service like Amazon S3, you can install a plugin that provides the integration.

- [Amazon S3](https://github.com/craftcms/aws-s3) (first party)
- [Google Cloud Storage](https://github.com/craftcms/google-cloud) (first party)
- [Rackspace Cloud Files](https://github.com/craftcms/rackspace) (first party)
- [DigitalOcean Spaces](https://github.com/vaersaagod/dospaces) (Værsågod)
- [fortrabbit Object Storage](https://github.com/fortrabbit/craft-object-storage) (fortrabbit)

## Asset Custom Fields

Each of your volumes has a field layout, where you can set the [fields](fields.md) that will be available to assets within that volume. You can edit a volume’s field layout by clicking the **Field Layout** tab when editing the volume.

Any fields you select here will be visible in the asset editor HUD that opens up when you double-click on an asset (either on the [Assets page](#assets-page) or from [Assets fields](assets-fields.md)).

## Assets Page

When you create your first volume, an **Assets** item will be added to the main control panel navigation. Clicking on it will take you to the Assets page, which shows a list of all of your volumes in the left sidebar, and the selected volume’s files in the main content area.

From this page, you can do the following:

- Upload new files
- Rename files
- Edit files’ titles and filenames
- Launch the Image Editor for a selected image
- Manage subfolders
- Move files to a different volume or subfolder (via drag and drop)
- Delete files

### Managing Subfolders

You can create a subfolder in one of your volumes by right-clicking the volume in the left sidebar, and choosing **New subfolder**.

Once you’ve created a subfolder, you can start dragging files into it.

You can create a nested subfolder within a subfolder by right-clicking the subfolder in the left sidebar, and again choosing **New subfolder**.

You can rename a subfolder by right-clicking on the subfolder in the left sidebar and choosing **Rename folder**.

You can delete a subfolder (and all assets within it) by right-clicking on the subfolder in the left sidebar and choosing **Delete folder**.

## Updating Asset Indexes

If any files are ever added, modified, or deleted outside of Craft (such as over FTP), you’ll need to tell Craft to update its indexes for the volume. You can do that from **Utilities** → **Asset Indexes**.

You will have the option to cache remote images. If you don’t have any remote volumes (Amazon S3, etc.), you can safely ignore it. Enabling the setting will cause the indexing process to take longer to complete, but it will improve the speed of [image transform](image-transforms.md) generation.

## Image Transforms

Craft provides a way to perform a variety of image transformations to your assets. See [Image Transforms](image-transforms.md) for more information.

## Image Editor

Craft provides a built-in Image Editor for making changes to your images. You can crop, straighten, rotate, and flip your images, as well as choose a focal point on them.

To launch the Image Editor, double-click an image (either on the Assets page or from an [Assets field](assets-fields.md)) and press **Edit** in the top-right of the image preview area in the HUD. Alternatively, you can select an asset on the [Assets page](#assets-page) and choose **Edit image** from the task menu (<icon kind="settings" />).

### Focal Points

Set focal points on your images so Craft knows which part of the image to prioritize when determining how to crop your images for [image transforms](image-transforms.md). Focal points take precedence over the transform’s Crop Position setting.

To set a focal point, open the Image Editor and click on the Focal Point button. A circular icon will appear in the center of your image. Drag it to wherever you want the image’s focal point to be.

To remove the focal point, click on the Focal Point button again.

Like other changes in the Image Editor, focal points won’t take effect until you’ve saved the image.

## Querying Assets

You can fetch assets in your templates or PHP code using **asset queries**.

::: code
```twig
{# Create a new asset query #}
{% set myAssetQuery = craft.assets() %}
```
```php
// Create a new asset query
$myAssetQuery = \craft\elements\Asset::find();
```
:::

Once you’ve created an asset query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [Asset](craft3:craft\elements\Asset) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
:::

### Example

We can display a list of thumbnails for images in a “Photos” volume by doing the following:

1. Create an asset query with `craft.assets()`.
2. Set the [volume](#volume) and [kind](#kind) parameters on it.
3. Fetch the assets with `.all()`.
4. Loop through the assets using a [for](https://twig.symfony.com/doc/2.x/tags/for.html) tag to create the thumbnail list HTML.

```twig
{# Create an asset query with the 'volume' and 'kind' parameters #}
{% set myAssetQuery = craft.assets()
  .volume('photos')
  .kind('image') %}

{# Fetch the assets #}
{% set images = myAssetQuery.all() %}

{# Display the thumbnail list #}
<ul>
  {% for image in images %}
    <li><img src="{{ image.getUrl('thumb') }}" alt="{{ image.title }}"></li>
  {% endfor %}
</ul>
```

::: warning
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have “Assets in this volume have public URLs” enabled and a “Base URL” setting. Otherwise, the result will always be empty.
:::

You can cache-bust asset URLs automatically by enabling the [revAssetUrls](config3:revAssetUrls) config setting, or handle them individually by using Craft’s [`url()` function](dev/functions.md#url) to append a query parameter with the last-modified timestamp:

```twig
<img src="{{ url(image.getUrl('thumb'), {v: image.dateModified.timestamp}) }}">
{# <img src="https://my-project.tld/images/_thumb/bar.jpg?v=1614374621"> #}
```

### Parameters

Asset queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/3.x/assets.md)!!!
