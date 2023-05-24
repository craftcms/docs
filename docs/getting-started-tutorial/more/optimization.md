# Optimization

## Asset Transforms

[Transforms](/4.x/image-transforms.md) let you set some constraints for an image and have have Craft resize or crop it, automatically. Let’s revisit our gigantic blog images and apply some transforms.

We’ll use Twig to create a hash of settings, named `featureImage`, then pass those settings to `featureImage.getUrl()`:

```twig{3-8,17}
{% extends "_layout.twig" %}

{% set featureImage = {
  mode: 'crop',
  width: 900,
  height: 600,
  quality: 90
} %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>

  {% if entry.featureImage|length %}
    {% for image in entry.featureImage.all() %}
      <img src="{{ image.getUrl(featureImage) }}" alt="{{ image.title }}" />
    {% endfor %}
  {% endif %}
{% endblock %}
```

You can now refresh the front end and see your transformed asset:

<BrowserShot url="https://tutorial.test/blog/my-trip-to-bend" :link="false" caption="Automatically-resized image, cropped at 900×600px.">
<img src="../images/image-resized.png" alt="Screenshot of detail page with auto-sized image" />
</BrowserShot>

### Focal Points

<Todo notes="Removed from context, needs rewrite" />

In this template we’ve chosen to display a square thumbnail of the “Feature Image” along with the post title. Some of these images may crop weirdly into squares, but we can use focal points to have some control over how they’re cropped!

Transformed images will automatically be cropped from the center, but a content editor may also adjust this by setting a [focal point](/3.x/assets.md#focal-points) in the control panel:

1. In the control panel, navigate to the image either using the **Assets** menu item or **Entries** and choosing the relevant blog post.
2. Double-click the asset and choose **Edit** from the top-right corner of the preview modal to launch the image editor.
3. Choose **Focal Point** and drag the focal point target to an important area of the image.
4. Choose **Save**.

![Setting a focal point on an asset](../images/focal-point.png)

Back on the front end, refresh the listing page and you’ll see the re-cropped thumbnail:

<BrowserShot url="https://tutorial.test/blog/" :link="false" caption="Listing page with adjusted thumbnail focal point.">
<img src="../images/listing-with-custom-focal-point.png" alt="Screenshot of listing page where post thumbnail is cropped toward focal point of image" />
</BrowserShot>


## Includes

When building the blog and topic index pages, there was a lot of repeated code involved with outputting the post previews.

Twig’s `include` feature can help us reduce that repetition
