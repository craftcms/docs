---
sidebarDepth: 2
---

# Blog Templates

It’s time to bring together everything we’ve learned and create some templates that display data from the blog we set up in Craft.

## Layout

A **layout** is Twig’s solution for reusable page wrappers. Layouts have all the same features of a regular template. This makes them a perfect place for a global header, navigation, or a footer—but it can also define invisible metadata in the `head` of every page that uses it.

Right-click the `templates/` folder in VS Code’s file browser, then click **New File…**, and name it `_layout.twig`.

::: tip
The underscore (`_`) at the beginning of `_layout.twig` means the template is “private.” Unlike `index.twig`, you will _not_ be able to view the template by visiting `https://tutorial.ddev.site/_layout`.

Use an underscore any time a template doesn’t need to be accessible on its own. You can also prefix a subfolder of your `templates/` directory with an underscore to hide _everything_ inside it.
:::

Copy the following into the `_layout.twig` file you just created:

```twig{2,5,6,7,11-12}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    {% do craft.app.view.registerCssFile('@web/styles.css') %}
  </head>
  <body>
    {% block content %}
      {# Nothing here, yet! #}
    {% endblock %}
  </body>
</html>
```

This is the skeleton of a basic webpage, but it has no content! A layout’s main job is to reduce boilerplate in your templates; here, we’ve defined a few things we want on _every_ page of the site:

- The language content is presented in (on the `<html>` tag);
- The name of our site, in the `<title>` tag (you may recognize this from `index.html`);
- A `<meta>` tag that tells the browser how we want the page to be sized on small-screened devices;
- A reference to a stylesheet;

The last thing to note is the use of the `{% block %}` tag to define a region where our content will go. Craft doesn’t know anything about `_layout.twig` yet, so we’ll have to tell it when we want to use this layout, and what we want to go that `content` block.

## Entry Template

Now that we have a _layout_ template, let’s use it for our individual blog posts.

Create `templates/blog/_entry.twig` and paste this code to it:

```twig{2,5-7}
{# You can omit the `.twig` when referencing another template: #}
{% extends '_layout' %}

{# Provide something to the `content` block in `_layout.twig`: #}
{% block content %}
  <h1>Some day, I’ll be a blog post!</h1>
{% endblock %}
```

The first highlighted line connects our post template with the layout template, using the `{% extends %}` tag.

Now that the blog section’s template is ready, you can visit the URL for a published post:

<BrowserShot url="https://tutorial.ddev.site/blog/my-trip-to-bend" :link="false" caption="">
<img src="../images/twig-entry-static.png" alt="Screenshot of an unstyled page with generic heading" />
</BrowserShot>

::: tip
Not sure what your post’s URL is? Back in the control panel, navigate to a post, then click the **View** button in the upper-right corner to open it in a new tab.
:::

If this didn’t work (and you’re still seeing the same error from the last time we accessed this page), double-check your [section’s settings](../configure/resources.md#creating-a-section) and the location and name of your template file!

### Add Dynamic Data

Hard-coding our post’s title isn’t very practical, so let’s bring in some data from the current post.

We know that any time an element (like our blog post entries) matches a request path, Craft will render the template defined in its settings. In this case, the entry belongs to a section that declared `blog/_entry` as its **Template**—which is why we had to add this one in a particular spot.

But how do we actually get the content for that post? Craft makes the matched entry available in our template under a special `entry` variable:

```twig{5,7-9}
{% extends '_layout' %}

{% block content %}
  {# Access a property of a variable using “dot” notation: #}
  <h1>{{ entry.title }}</h1>

  <time datetime="{{ entry.postDate | atom }}">
    {{ entry.postDate | date }}
  </time>
{% endblock %}
```

Refresh your browser, and you should see the post’s title and the date it was created:

<BrowserShot url="https://tutorial.ddev.site/blog/my-trip-to-bend" :link="false" caption="">
<img src="../images/twig-entry-dynamic.png" alt="Screenshot of detail page with dynamic title and entry date" />
</BrowserShot>

::: tip
If you were to go back into the control panel and create some more posts, you could access any of them this same way!
:::

#### Feature Image

Let’s output the image we attached via the “Feature Image” asset field. That field had a handle of `featureImage`, so it will be available on the `entry` variable as `entry.featureImage`, just like the title was:

```twig{4,15-17}
{% extends '_layout' %}

{# Load the attached image: #}
{% set featureImage = entry.featureImage.one() %}

{% block content %}
  {# Access a property of a variable using “dot” notation: #}
  <h1>{{ entry.title }}</h1>

  <time datetime="{{ entry.postDate | atom }}">
    {{ entry.postDate | date }}
  </time>

  {# Output the image, if one was found: #}
  {% if featureImage %}
    {{ featureImage.getImg() }}
  {% endif %}
{% endblock %}
```

At the top of the template, notice the new `set` tag. This loads and stores the first image attached to our **Feature Image** field. We check at the end of the template whether an image is indeed available (say, in case someone deleted the asset), using an [`if` tag](https://twig.symfony.com/doc/3.x/tags/if.html).

::: warning
You may have noticed the `.one()` at the end of the line that sets `featureImage`. Craft automatically loads the `entry` for this template, but leaves the rest up to you—`entry.featureImage` is actually a pre-configured _query_ that will fetch asset(s) we attached to the field. We are using `.one()` to tell Craft that we want just the first attached asset.

We’ll use a similar query when outputting the post topic and content Matrix field!
:::

We’ve used a convenient feature of the asset object returned by the custom field to generate a complete `<img />` tag:

```twig
{{ featureImage.getImg() }}
```

<Block label="Custom Markup">

If you would prefer to build the image element yourself, you can get the individual properties from the asset:

```twig
<img
  src="{{ featureImage.getUrl() }}"
  alt="{{ featureImage.alt }}"
  width="{{ featureImage.width }}"
  height="{{ featureImage.height }}" />
```

</Block>

Refresh the page to see your changes:

<BrowserShot url="https://tutorial.test/blog/my-trip-to-bend" :link="false" caption="">
<img src="../images/twig-entry-with-image.png" alt="Screenshot of post page with feature image added" />
</BrowserShot>

Our sample image was pretty big, so it's spilling off the page. This isn’t ideal, but it can be fixed with a bit of CSS—or with _transforms_. We’ll get to both of these solutions in a moment.

#### Topics

Let’s add some more metadata to the top of our post. Our content model included a category field called Topics, which we can access in a really similar way to the feature image!

Just below the existing `set` tag, add another one to fetch the attached categories:

```twig{3-4}
{% set featureImage = entry.featureImage.one() %}

{# Load attached topics: #}
{% set topics = entry.topics.all() %}
```

Because we’re allowing authors to attach multiple topics to a post, we’ve used `.all()` to fetch _all_ of them, instead of just the first. This is important, because we will treat `topics` (plural) a little bit differently from `featureImage` (singular).

::: tip
Our annual conference [DotAll](https://dotall.com/) is named after this method!
:::

Just below the post title and `<time>` element, let’s add a new `<ul>` or “unordered list” element and output a list of categories:

```twig{5-11}
<time datetime="{{ entry.postDate | atom }}">
  {{ entry.postDate | date }}
</time>

{% if topics | length %}
  <ul>
    {% for topic in topics %}
      <li>{{ topic.getLink() }}</ul>
    {% endfor %}
  </ul>
{% endif %}
```

This introduces two control tags:

- An `{% if ... %}` statement, that tests whether any categories are attached and prevents outputting an unnecessary `<ul>` element;
- A `{% for ... %}` loop, which (as we saw in `index.twig`) lets us repeat a chunk of output for each item in a list;

Within the topics loop, we output an `<li>` element and use the category’s `.getLink()` method to generate an anchor tag (`<a>`) pointing to its URL. This is akin to the `.getImg()` method we used on the asset attached via our `featureImage` field.

<BrowserShot url="https://tutorial.test/blog/my-trip-to-bend" :link="false" caption="">
<img src="../images/twig-entry-with-categories.png" alt="Screenshot of detail page with topics added" />
</BrowserShot>

Clicking any of the links to a topic will result in a similar error to the one we encountered prior to creating the post template. We’ll implement category pages at the same time as the blog landing page, because they’ll share a great deal of logic.

::: tip
If you pasted this into `templates/blog/_entry.twig` and the indentation got messed up, select the new lines and press <kbd>Tab</kbd> to bump it in. Go too far? <kbd>Shift + Tab</kbd> will _out_dent it again. <kbd>Command/Control + ]</kbd> and <kbd>Command/Control + [</kbd> can do the same thing.
:::

#### Post Content

Let’s output the post content stored in our Matrix field. This process starts in a familiar way:

1. Load matrix blocks via the `postContent` field handle and store them in a variable;
1. Loop over those blocks with a `{% for %}` tag;
1. Render different content based on the blocks’ types, using an `{% if %}` tag;

After the line that declares our `topics` variable, add a new `set` tag:

```twig{3-4}
{% set topics = entry.topics.all() %}

{# Load content blocks: #}
{% set postContent = entry.postContent.all() %}
```

With the content loaded into a `postContent` variable, we can start outputting data for each block. Below the closing `</ul>` of our topics list, add a new `for` loop:

```twig{4,6,9,14,19,24}
{# This should appear just below the last line of the topics `for` loop! }

<div class="post-content">
  {% for contentBlock in postContent %}
    {# Memoize the block type’s handle so we can use it later: #}
    {% set blockType = contentBlock.type.handle %}

    {# Switch what is displayed based on the `type`: #}
    {% if blockType == 'text' %}
      <div class="content-block text">
        {{ contentBlock.text | md }}
      </div>
    {% elseif blockType == 'image' %}
      {% set image = contentBlock.image.one() %}

      <div class="content-block image">
        {{ image.getImg() }}
      </div>
    {% else %}
      <div class="content-block unsupported">
        <p>Unsupported block type: <code>{{ blockType }}</code></p>
      </div>
    {% endif %}
  {% else %}
    {# `for` tags also support an `else` block for when there’s no content! #}

    <div class="content-block empty">
      <p>This post has no content!</p>
    </div>
  {% endfor %}
</div>
```

Looking at the highlighted lines in this block of code…

- Our `for` loop uses the `postContent` variable defined at the top of the template, and makes each block available in turn as `contentBlock`;
- We capture the “type” of block in a variable named `blockType` so we can compare against it later;
- The `if`, `elseif`, and `else` tags test the value of `blockType` each time through the loop and render different sections of the template;
- “Image” blocks contain an asset field that can be used exactly the same way as the `featureImage` field is on the main entry;
- An `else` tag is used to provide some debugging information for us—but it will only show up if we’ve gotten our block type handles mixed up;
- A final `else` tag actually belongs to the main `for` loop, and allows us to output a message when there are no blocks to display;

This is right about where the complexity of field data peaks, for modest websites—so don’t worry if it’s a bit overwhelming! We’ve still got a few more things to implement, and will be returning to 

<Block label="Extra Credit">

How could we add a new _Quote_ block type?

Back in the control panel:

1. Visit **Settings** &rarr; **Fields** &rarr; **Post Content**;
1. Click **New Block Type**;
1. Name it _Quote_, and give it a handle of `quote`;
1. Add a field named _Quote_ (also with a handle of `quote`), and mark it as **Required**;
1. Save the field;

At this point, return to one of your blog entries’s edit screens, and add a **Quote** block to the **Post Content** matrix field. Reload that post’s page in the front-end, and you should see something like this:

> Unsupported block type: `quote`

In `templates/blog/_entry.twig`, add a new `elseif` comparison tag in the content block loop that tests against the new block type’s handle (`quote`):

```twig{2-5}
{# ... #}
{% elseif blockType == 'quote' %}
  <div class="content-block quote">
    <blockquote>{{ contentBlock.quote | md }}</blockquote>
  </div>
{% else %} {# This `else` tag is what outputs our “unsupported” message! #}
{# ... #}
```

This process can be repeated _ad infinitum_ for however many block types you want!

</Block>

## Listing Posts

We’ve set up individual pages for our posts, but there’s no way to discover them from the front-end! We’ll address this with two new templates:

1. A [blog index](#blog-index) page for all posts;
1. A [topic index](#topic-pages) template that filters posts by category;

### Blog Index

Our blog’s landing page will live at `https://tutorial.ddev.site/blog`, and display _all_ posts, in chronological order. This page doesn’t need a corresponding entry in the control panel, because we’ll be naming the template such that Craft’s routing behavior makes it directly accessible.

Create a new template at `templates/blog/index.twig`, with the following content:

```twig{3,8,9,11-13,19}
{% extends '_layout' %}

{% set posts = craft.entries().section('blog').all() %}

{% block content %}
  <h1>Blog</h1>

  {% for post in posts %}
    {% set image = post.featureImage.one() %}

    <article>
      {% if image %}
        {{ image.getImg() }}
      {% endif %}

      <h2>{{ post.title }}</h2>

      <time datetime="{{ entry.postDate | atom }}">{{ entry.postDate | date }}</time>

      {{ post.summary | md }}

      <a href="{{ post.url }}">Continue Reading</a>
    </article>
  {% endfor %}
{% endblock %}
```

Our entry detail page came with an automatically-available `entry` variable, but here we’ve fetched all the entries in the `blog` section and put them in a variable called posts:

```twig
{% set posts = craft.entries().section('blog').all() %}
```

The technical term for what we’re doing is [querying entries](/3.x/entries.md#querying-entries). Once these content elements are stored in Craft CMS, there are lots of options and parameters you can use to query exactly the content you need wherever you happen to need it.

Now create `templates/_includes/listing.twig`. We’ll use this for listing blog entries on this index page and re-use it again shortly for the category page:

```twig
<div class="post-list my-10 flex">
{% for post in posts %}
  <a href="{{ post.url }}" class="flex shadow-lg rounded items-center justify-center overflow-hidden">
    {% if post.featureImage|length %}
      {% set image = post.featureImage.one() %}
      <div class="w-1/4">
        <img src="{{ image.getUrl({ width: 300, height: 300}) }}"
          alt="{{ image.title }}"
          class="block"
        />
      </div>
    {% endif %}
    <span class="title w-3/4 p-4">{{ post.title }}</span>
  </a>
{% endfor %}
</div>
```

The image transform is similar to what we did earlier, except we used `.one()` instead of `.all()` since we only want one image. This also passes an object with `width` and `height` directly to `image.getUrl()` instead of first assigning that object to a variable.

Here’s what the result looks like:

<BrowserShot url="https://tutorial.ddev.site/blog/" :link="false" caption="">
<img src="../images/listing.png" alt="Screenshot of listing page" />
</BrowserShot>

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

### Topic Pages

Create `templates/blog/_category.twig` and add the following:

```twig
{% extends "_layout.twig" %}

{% set posts = craft.entries().section('blog').relatedTo(category).all() %}

{% block content %}

  <h1 class="text-4xl text-black font-display my-4">
    Blog Posts in “{{ category.title }}”
  </h1>

  {% include "_includes/listing.twig" with { posts: posts } only %}
{% endblock %}
```

In the same way that entry detail pages came automatically loaded with an `entry` variable, category pages come with a special `category` variable. We’re using that here to limit only to posts in the selected category using the [`relatedTo` query parameter](/3.x/entries.md#relatedto):

```twig
{% set posts = craft.entries().section('blog').relatedTo(category).all() %}
```

Our post category listings, which you can navigate to by choosing any of a blog post’s tags, should be working now:

<BrowserShot url="https://tutorial.ddev.site/blog/category/ramblings" :link="false" caption="Listing page for posts in the `Ramblings` category.">
<img src="../images/listing-category.png" alt="Screenshot of listing page limited by category" />
</BrowserShot>


## Miscellany

### Global Footer

We used a global set to store a blurb for the bottom of every page on the site. Since we want that to appear everywhere, let’s add it to `_layout.twig` along with a copyright line:

```twig{15-18}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body class="ltr">
    <div class="container mx-auto px-4">
      {% block content %}
      {% endblock %}
    </div>
    <footer class="container mx-auto p-4 text-sm">
      {{ siteInformation.siteDescription|markdown }}
      <p>&copy; {{ now | date('Y') }}, built with <a class="text-blue-600" href="https://craftcms.com">Craft CMS</a></p>
    </footer>
  </body>
</html>
```

The “Site Description” field is Plain Text without any formatting, and just for fun we can use Craft’s [`markdown` filter](/3.x/dev/filters.md#markdown) to output it in a paragaph tag (`<p></p>`) and support [Markdown syntax](https://daringfireball.net/projects/markdown/).

### Navigation

Getting around is pretty awkward right now. Let’s add some navigation.

Create `templates/_includes/nav.twig` and add the following to it:

```twig
<nav class="container mx-auto py-4 px-4" role="navigation" aria-label="Main">
  {% set firstSegment = craft.app.request.getSegment(1) %}
  <ul class="flex">
    <li class="mr-6">
      <a class="text-blue-600 {{ firstSegment == '' ? 'border-b border-blue-400' }}" href="{{ siteUrl }}">Home</a>
    </li>
    <li class="mr-6">
      <a class="text-blue-600 {{ firstSegment == 'blog' ? 'border-b border-blue-400' }}" href="{{ url('blog') }}">Blog</a>
    </li>
    <li class="mr-6">
      <a class="text-blue-600 {{ firstSegment == 'about' ? 'border-b border-blue-400' }}" href="{{ url('about') }}">About</a>
    </li>
  </ul>
</nav>
```

Now let’s include that in `templates/_layout.twig`:

```twig{10}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link href="/styles.css" rel="stylesheet">
  </head>
  <body class="ltr">
    {% include "_includes/nav.twig" %}
    <div class="container mx-auto px-4">
      {% block content %}
      {% endblock %}
    </div>
    <footer class="container mx-auto mt-8 p-4 text-sm opacity-50">
      {{ siteInformation.siteDescription|markdown }}
      <p>&copy; {{ now | date('Y') }}, built with <a class="text-blue-600" href="https://craftcms.com">Craft CMS</a></p>
    </footer>
  </body>
</html>
```

<BrowserShot url="https://tutorial.ddev.site/blog" :link="false" caption="Blog listing with navigation." :max-height="600">
<img src="../images/navigation.png" alt="Screenshot of blog listing with new top navigation" />
</BrowserShot>

::: tip
Using [`craft.app`](https://craftcms.com/docs/3.x/dev/global-variables.html#craft-app) gives us complete access to everything Craft offers, but it’s sort of advanced mode so you shouldn’t need to rely on it often. We’re using it here to get the first segment of the URL and use that to style our navigation accordingly.
:::

## Styling

Craft has no opinions about how you style your front-end. This section covers some basic, broadly-applicable, framework-agnostic solutions for getting 

### Adding a Stylesheet

### Dynamic CSS



## Optimization

### Asset Transforms

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

### Includes
