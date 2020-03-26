# 3. Build Your Front End

Now that we’ve modeled our blog’s content in the Craft CMS control panel, it’s time to build a front end to display content for visitors.

## Choose your adventure

Craft CMS supports two distinctly different ways of building a front end:

1. Twig templates for server-generated pages.
2. A GraphQL or JSON API you can use with separate, headless code.

If you’ve never built a website using either one, choosing is a matter of picking whatever you’re most comfortable with or interested in.

Twig templates are like plain HTML with superpowers. They live in the Craft CMS project code you’ve already set up, and they’re easiest to start with if you want to get coding right now.

If you’re familiar with JavaScript and have built a site using [Gatsby](https://www.gatsbyjs.org/) or [Gridsome](https://gridsome.org/) before, relying on Craft’s GraphQL API might be easier. You can spin up your front end project however you normally would, then configure Craft to make its content available.

::: tip
[Craft Pro](https://craftcms.com/pricing) is required to use the GraphQL API. You can try Craft Pro locally without any time limit, but you’ll need to upgrade your license if you use it in production.
:::

Continue with whichever method you’d like to learn right now:

- [Create templates](#create-templates)
- [Fetch content with GraphQL](#fetch-content-with-graphql)

## Create templates

Before we dive into creating templates, let’s look at how they fit into everything.

### Dynamic routing :sparkles:

Every web server has the straightforward job of translating a URL into a response. This job is called _routing_.

At this very moment, you can add a cat photo to your project at `web/cat.jpg` and see it in your browser at `https://localhost:8080/cat.jpg`. The web server reads that URL, finds the file in the web root, and gives it back in a response the browser displays. This is a _static_ route where Craft CMS never gets involved; normal web server stuff.

When we build a template-driven CMS website, the CMS is responsible for handling _dynamic_ routes. If the web server doesn’t find a static route in our case, it hands off to Craft CMS which then looks at [a series of things](https://docs.craftcms.com/v3/routing.html) to see if it can return a response. (If not, it returns a 404.)

As we add content in the control panel, we’re expanding a map of dynamic routes. We’ve used Craft CMS, for example, to create a _Blog_ section that uses the URL format `blog/{slug}` for its posts. `{slug}` is a special placeholder that stands for any published entry’s _Slug_ value. When the URL maps to an entry, our settings also say it should be displayed on a `blog/_entry` template we haven’t created yet.

TODO: diagram URL and the stuff that comes back (HTML, Assets, etc.)

### Working with Twig

[Twig](https://twig.symfony.com/doc/3.x/templates.html) templates are plain text files that use special syntax to render Craft CMS content for the web browser.

::: tip
If you’ve used Twig in other projects that’ll be useful here. Craft adds its own layer of functionality to standard Twig.
:::

Creating Twig templates isn’t all that different from working with HTML, CSS, or JavaScript. In fact, you can write an entire Twig template without even using Twig! The idea is that you build whatever normal parts you would need for a web page and Twig provides super powers for rendering dynamic content wherever you need it.

::: tip
Starting with a static project? You can drag your existing `.html` files to the `templates/` folder and have a great starting point for adding bits of Twig.
:::

Anything that uses dynamic content should live in your `templates/` folder. Regular HTML, CSS, JavaScript and images can (and should) all go in your `web/` directory.

If you’ve never written any part of a website before that’s okay, but it might help to familiarize yourself with fundamental [HTML, CSS, and JavaScript](https://developer.mozilla.org/en-US/docs/Web/Guide/Introduction_to_Web_development).

We’ll copy and paste sample code as we go, so that’s all you’ll need to follow along:

TODO: link to demo repo

### VS Code syntax highlighting

Let’s take a moment and configure our code editor to make life easier.

VS Code has a built-in extension marketplace for installing add-ons that improve working with different kinds of code. There’s a whole universe of customization, but the following extensions will be useful here:

TODO: audit list

- **DotENV** highlights the project `.env` file we’re using and ensures it’s formatted properly.
- **Twig**
- **Twig Language 2**
- **TWIG pack**
- **Alpine.js IntelliSense**
- **Tailwind CSS IntelliSense**
- **PHP IntelliSense** adds syntax highlighting and auto-complete dropdowns for PHP files we work with.

Open the “Extensions” panel in VS Code, search for each one, and choose “Install”. You’ll need to restart the app so they can all take effect.

TODO: briefly show why they’re worth installing

### Structure your front end

Let’s build some templates and start our Twig front end!

#### Where we’re working

Our work here will focus on two folders: `templates/` and `web/`. Every template we add will need to live in the `templates/` folder, where every file can be parsed by Twig and used dynamically. Static front end assets that aren’t templates, like the cat photo earlier, should live in the `web/` directory in whatever organization you’d prefer. We’ve set up Craft CMS to use `web/assets/` for its volumes managed in the control panel, so it’s best to keep non-user-editable files out of that directory just for clarity.

#### Template files

A template file is plain text you can work with in your code editor. Each time we add a template, that means we’ll create a new text file in the templates folder, ending in `.twig` or `.html`. The file extension doesn’t matter in our filesystem, and you’ll notice we didn’t include one configuring Craft earlier. When you provide a value of `blog/_entry`, for example, Craft CMS will automatically look for `template/blog/_entry.twig` and `template/blog/_entry.html`.

::: tip
There’s no “correct” file extension for templates, but `.twig` will be better for automatic syntax highlighting in editors like VS Code.
:::

TODO: mention other front end assets (but grab existing for tutorial)

#### Micro demo: Twig vs. HTML

For a quick example of what we’ll be doing, create `templates/twig-hello.twig` and `web/html-hello.html`. Add the following to each one:

```twig
Hi! This site’s name is {{ siteName }}.
```

Without any setup in Craft CMS, you can go directly to `https://localhost:8080/twig-hello` and `https://localhost:8080/html-hello.html` to see each one in your browser.

The Twig version gets parsed and displays the name of your site, with a clean URL that doesn’t require a file extension.

The static HTML shows the placeholder Twig variable because it’s not parsed, and it requires `.html` in the filename because it maps directly to a file.

This is the difference between a Twig template and static HTML. We’ll create a series of Twig templates to display our content expanding upon this concept.

### Create a layout

Let’s start by creating a layout template at `templates/_layout.twig`.

We want to follow DRY methodology, which stands for Don’t Repeat Yourself. The idea is to write code once and re-use it as much as possible without duplicating things. That makes your site’s code easier to understand and easier to maintain as it grows.

The layout is important for this because it will be the base from which our other templates _extend_.

The underscore (`_`) at the beginning of the filename, `_layout.twig`, means the template is private: unlike the quick example we started with, you _cannot_ view the template by visiting `https://localhost:8080/_layout`. We can use underscores when it makes sense—in this case it’s because the layout is only a shell and isn’t meant to appear on its own.

Copy this into the `templates/_layout.twig` file you created:

```twig
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
  </head>
  <body class="ltr">
    <div class="container mx-auto px-4">
      {% block content %}
      {% endblock %}
    </div>
  </body>
</html>
```

This is basebones HTML that will be the foudnation of every page on the site. HTML uses tags, or markup, as a structured way to organize and describe content. You may immediately recognize Craft’s `siteName` tag in this line:

```twig
    <title>{{ siteName }}</title>
```

`title` is a standard HTML tag used to tell the browser how to label the window or tab for the page. Whatever’s wrapped in the `title` tag—which means whatever’s between the opening `<title>` and closing `</title>` will be displayed. You’ll recognize that `{{ siteName }}` we used above—this is a Twig tag Craft CMS provides for outputting our site name. This is how HTML and Twig work together in our templates.

Other things this template is doing:

- Setting the page’s language to match Craft’s.
- Adding `meta` details that tell browsers how to interpret text and size the viewport—or how the page fits in the browser window and can be zoomed and resized.
- Including TailwindCSS for styling and AlpineJS for scripting some basic interactions we’ll get to later.

The most important part of the template is the `content` block:

```twig
      {% block content %}
      {% endblock %}
```

Whenever you see `{{` `}}` or `{%` `%}` you know you’re looking at Twig tags. In this case, we’re establishing the beginning and end of a block named `content`. The `content` part could be anything we want, but here it imples that what’s inside will be page content. There’s _nothing_ inside, however, because the layout template provides a structure that other child templates will fill in.

### Create a detail page

Now that we have a layout template, let’s use it for our blog post detail pages.

Create `templates/blog/_entry.twig` and add the following to it:

```twig
{% extends "_layout" %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">I’m a blog post!</h1>
{% endblock %}
```

The first line _extends_ the layout template, meaning it will use that as a starting point and let us further customize or override whatever we need to. We’re now providing our own content, within the `content` block, to appear on the page.

Now that the blog section’s template is ready, you can visit the URL for a published post:

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="">
<img src="../../images/tutorial-entry-static.png" alt="Screenshot of empty page with generic title" />
</BrowserShot>

::: tip
Throughout these examples, some tags have `class` parameters with values like `text-4xl text-black font-display my-4`. These are TailwindCSS [utility classes](https://tailwindcss.com/docs/utility-first) that style elements on the page. You can ignore them or check out reference the [TailwindCSS documentation](https://tailwindcss.com/) if you want to explore customizing styles.
:::

That’s clearly no the title we should display on every page. For any detail page template, Craft CMS provides a special `entry` variable we can use to access the details of the relevant entry. Let’s display the `title` and `postDate` properties in the template:

```twig{4,6}
{% extends "_layout" %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>
{% endblock %}
```

Now it’s looking better!

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="">
<img src="../../images/tutorial-entry-dynamic.png" alt="Screenshot of detail page with dynamic title and entry date" />
</BrowserShot>

Notice how we’re using the [`|date()` Twig filter](https://docs.craftcms.com/v3/dev/filters.html#date) to specify formats for the `entry.postDate` value. This is a typical example of using a filter to modify something in Twig; a value you want to modify or transform is followed by a pipe (`|`), the name of the filter, and sometimes settings specific to that filter. You can see all Craft’s available [filters](https://docs.craftcms.com/v3/dev/filters.html) to get a better idea of what you can do with them.

Let’s display the “Feature Image” next, using the `featureImage` handle we created with that custom field:

```twig{8-12}
{% extends "_layout" %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>

  {% if entry.featureImage|length %}
    {% for image in entry.featureImage.all() %}
      <img src="{{ image.url }}" alt="{{ image.title }}" />
    {% endfor %}
  {% endif %}
{% endblock %}
```

This first uses an [`if` conditional statement](https://twig.symfony.com/doc/3.x/tags/if.html) to see whether the editor added an image in this field. The “Assets” field we used can have one or many images depending on how we configure it, so the statement uses the [`|length` Twig filter](https://docs.craftcms.com/v3/dev/filters.html#length) to count the number of items—where `0` will be `false` and anything else will be `true`.

If the statement is `true`, meaning we have at least one feature image, we’ll use `entry.featureImage.all()` to get the set and a `for` statement to loop through and display each item using the `image` variable. (We limited the field settings to allow only one image, but increasing that limit means _every_ image would be shown here!)

For each asset, we output a `img` HTML tag using `{{ image.url }}` to get the web-friendly URL for the image and `{{ image.title }}` as an `alt` tag value used for bots and screen readers.

We should now see the image after refreshing the page:

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="">
<img src="../../images/tutorial-entry-with-image.png" alt="Screenshot of detail page with dynamic image added" />
</BrowserShot>

### Transform an asset

[Image Transforms](https://docs.craftcms.com/v3/image-transforms.html) let you specify the exact dimensions you need and have Craft CMS crop and size an image accordingly. Let’s specify a size for our “Feature Image”.

We’ll use Twig to create an object called `featureImage` with the settings we want, then pass those settings to `image.getUrl()` in place of `image.url`:

```twig{3-8,17}
{% extends "_layout" %}

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

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="Automatically-resized image, cropped at 900×600px.">
<img src="../../images/tutorial-image-resized.png" alt="Screenshot of detail page with auto-sized image" />
</BrowserShot>

### Add Matrix content

Let’s display our post content stored in that Matrix field.

Matrix content is stored in whatever blocks we’ve defined. To display that content, we’ll:

1. use another `for` loop to run through each block
2. use an `if` statement to handle output based on the block type

```twig{21-33}
{% extends "_layout" %}

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

  <div class="my-8">
    {% for block in entry.postContent.all() %}
      <div class="my-4">
        {% if block.type == 'text' %}
          {{ block.text }}
        {% elseif block.type == 'image' %}
          {% for image in block.image.all() %}
            <img src="{{ image.url }}" alt="{{ image.title }}" />
          {% endfor %}
        {% endif %}
      </div>
    {% endfor %}
  </div>
{% endblock %}
```

The Matrix content will now be included on the page:

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="Detail page with post content added." :max-height="600">
<img src="../../images/tutorial-matrix-content.png" alt="Screenshot of detail page with post content" />
</BrowserShot>

### Include a partial

The template’s getting longer, and we know we’ll be re-using the “Post Content” field again in the about page. Let’s tidy up a bit and make sure our Matrix code can be re-used.

To do this, we’ll move the new Twig above to its own smaller, re-usable template partial.

Create `templates/_parts/post-blocks.twig` and copy that code to it:

```twig
<div class="my-8">
  {% for block in entry.postContent.all() %}
    <div class="my-4">
      {% if block.type == 'text' %}
        {{ block.text }}
      {% elseif block.type == 'image' %}
        {% for image in block.image.all() %}
          <img src="{{ image.url }}" alt="{{ image.title }}" />
        {% endfor %}
      {% endif %}
    </div>
  {% endfor %}
</div>
```

We can now go back to `templates/blog/_entry.twig` and _embed_ that template instead:

```twig{21}
{% extends "_layout" %}

{% set featureImage = {
    mode: 'crop',
    width: 900,
    height: 600,
    quality: 90
} %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>

  {% if entry.featureImage | length %}
    {% for image in entry.featureImage.all() %}
      <img src="{{ image.getUrl(featureImage) }}" alt="{{ image.title }}" />
    {% endfor %}
  {% endif %}

  {% include "_parts/post-blocks" with { blocks: entry.postContent.all() } only %}
{% endblock %}
```

The `with { blocks: entry.postContent.all() } only` part means we’re passing the `entry.postContent.all()` value in a variable we’ve labeled `blocks`. That means one small update for `templates/_parts/post-blocks.twig`:

```twig{2}
<div class="my-8">
  {% for block in blocks %}
    <div class="my-4">
      {% if block.type == 'text' %}
        {{ block.text }}
      {% elseif block.type == 'image' %}
        {% for image in block.image.all() %}
          <img src="{{ image.url }}" alt="{{ image.title }}" />
        {% endfor %}
      {% endif %}
    </div>
  {% endfor %}
</div>
```

Refreshing your front end shouldn’t change a thing, but the Twig behind the scenes is now a bit more DRY and ready to re-use.

### Add code comments

While we’re building, let’s add some comments so we can remember what we’ve done. Twig ignores anything wrapped with `{#` and `#}`, which is what we’ll use to leave human-friendly notes:

```twig{3,16,23}
{% extends "_layout" %}

{# create settings for image transform #}
{% set featureImage = {
    mode: 'crop',
    width: 900,
    height: 600,
    quality: 90
} %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>

  {# output transformed feature image(s) #}
  {% if entry.featureImage | length %}
    {% for image in entry.featureImage.all() %}
      <img src="{{ image.getUrl(featureImage) }}" alt="{{ image.title }}" />
    {% endfor %}
  {% endif %}

  {# render Matrix blocks for the “Post Content” field, passed as `blocks` #}
  {% include "_parts/post-blocks" with { blocks: entry.postContent.all() } only %}
{% endblock %}
```

### Display post categories

The last thing we need to do on the post detail template is output the post categories using the `postCategories` field handle:

```twig{26-35}
{% extends "_layout" %}

{# create settings for image transform #}
{% set featureImage = {
    mode: 'crop',
    width: 900,
    height: 600,
    quality: 90
} %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <time class="text-sm block pb-4" datetime="{{ entry.postDate | date('Y-m-d') }}">{{ entry.postDate | date('d M Y') }}</time>

  {# output transformed feature image(s) #}
  {% if entry.featureImage | length %}
    {% for image in entry.featureImage.all() %}
      <img src="{{ image.getUrl(featureImage) }}" alt="{{ image.title }}" />
    {% endfor %}
  {% endif %}

  {# render Matrix blocks for the “Post Content” field, passed as `blocks` #}
  {% include "_parts/post-blocks" with { blocks: entry.postContent.all() } only %}

  {# display post categories #}
  {% if entry.postCategories|length %}
  <div class="border-t py-2 mb-6">
    {% for category in entry.postCategories.all() %}
      <a href="{{ category.url }}" class="inline-block border rounded px-2 py-1 text-sm">
        {{- category.title -}}
      </a>
    {% endfor %}
  </div>
  {% endif %}
{% endblock %}
```

Here we’re first checking whether there _are_ any categories, then outputting individual links. (Those links will be broken for now, but we’ll come back to that.)

The only new thing here are the hyphens in the Twig tag around `category.title`: `{{-` and `-}}`. Those are used for whitespace control, so in the final page instead of...

```html
<a href="(...)" class="inline-block border rounded px-2 py-1 text-sm">
  Category
</a>
```

...the empty space around the category title will be removed:

```html
<a href="(...)" class="inline-block border rounded px-2 py-1 text-sm"
  >Category</a
>
```

### Add a page footer with details from a global set

We used a global set to store a blurb to be displayed at the bottom of all the site’s pages. Since we want that to appear everywhere, let’s add it to `_layout.twig` along with a copyright line:

```twig{16-19}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
  </head>
  <body class="ltr">
    <div class="container mx-auto px-4">
      {% block content %}
      {% endblock %}
    </div>
    <footer class="container mx-auto p-4 text-sm">
      {{ siteInformation.siteDescription|markdown }}
      <p>&copy; {{ now | date('Y') }}, Built with <a class="text-blue-600" href="https://craftcms.com">Craft CMS</a></p>
    </footer>
  </body>
</html>
```

The “Site Description” field is Plain Text without any formatting, and just for fun we can use Craft’s [`markdown` filter](https://docs.craftcms.com/v3/dev/filters.html#markdown) to output it in a paragaph tag (`<p></p>`) and support [markdown syntax](https://daringfireball.net/projects/markdown/).

### Add listing page

We’ll display a listing of posts in two places: in the blog index and again on a category page where they’re limited to the selected category.

Let’s start with our landing page first.

Create `templates/blog/index.twig`. Any time you use `index.twig` or `index.html`, that will be the default template or page in a given folder. So when we visit `https://localhost:8080/blog/`, that folder’s `blog/index.twig` will be used for rendering the result. Add the following to that template:

```twig
{% extends "_layout" %}

{% set posts = craft.entries.section('blog').all() %}

{% block content %}

  <h1 class="text-4xl text-black font-display my-4">Blog Posts</h1>

  {% include "_parts/listing" with { posts: posts } only %}
{% endblock %}
```

Our entry detail page came with an automatically-available `entry` variable, but here we’ve fetched all the entries in the `blog` section and put them in a variable called posts:

```twig
{% set posts = craft.entries.section('blog').all() %}
```

The technical term for what we’re doing is [querying entries](https://docs.craftcms.com/v3/dev/element-queries/entry-queries.html). Once these content elements are stored in Craft CMS, there are lots of options and parameters you can use in these queries to get exactly what you need wherever you need it.

Now add a partial at `templates/_parts/listing.twig` for listing posts we can re-use again shortly:

```twig
<div class="post-list flex">
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

The image transform is similar to what we did earlier, except we used `.one()` instead of `.all()` since we only ever want just one image. This also passes an object with `width` and `height` directly to `image.getUrl()` instead of first assigning that object to a variable.

Here’s what the result looks like:

<BrowserShot url="https://localhost:8080/blog/" :link="false" caption="">
<img src="../../images/tutorial-listing.png" alt="Screenshot of listing page" />
</BrowserShot>

In this template we’ve chosen to display a square thumbnail of the “Feature Image” along with the post title. Some of these images may crop weirdly into squares, but we can use focal points to have some control over how they’re cropped!

Transformed images will automatically be cropped from the center, but a content editor may also adjust this by setting a [focal point](https://docs.craftcms.com/v3/assets.html#focal-points) in the control panel:

1. In the control panel, navigate to the image either using the “Assets” menu item or “Entries” and choosing the relevant blog post.
2. Double-click the asset, then choose “Edit” from the top-right corner of the image preview. (This will open the editor.)
3. Choose the “Focal Point” tool, dragging the focal point bullseye icon to an important area of the image.
4. Choose “Save”.

![Setting a focal point on an asset](../../images/tutorial-focal-point.png)

Back on the front end, refresh the listing page and you’ll see the re-cropped thumbnail:

<BrowserShot url="https://localhost:8080/blog/" :link="false" caption="Listing page with adjusted thumbnail focal point.">
<img src="../../images/tutorial-listing-with-custom-focal-point.png" alt="Screenshot of listing page where post thumbnail is cropped toward focal point of image" />
</BrowserShot>

### Create a category listing

Create `templates/blog/_category` and add the following:

```twig
{% extends "_layout" %}

{% set posts = craft.entries.section('blog').relatedTo(category).all() %}

{% block content %}

  <h1 class="text-4xl text-black font-display my-4">
    Blog Posts in “{{ category.title }}”
  </h1>

  {% include "_parts/listing" with { posts: posts } only %}
{% endblock %}
```

In the same way that entry detail pages came automatically loaded with an `entry` variable, category pages come with a special `category` variable. We’re using that here to limit only to posts in the selected category using the [`relatedTo` query parameter](https://docs.craftcms.com/v3/dev/element-queries/entry-queries.html#relatedto):

```twig
{% set posts = craft.entries.section('blog').relatedTo(category).all() %}
```

Our post category listings, which you can navigate to by choosing any of a blog post’s tags, should be working now:

<BrowserShot url="https://localhost:8080/blog/category/ramblings" :link="false" caption="Listing page for posts in the `Ramblings` category.">
<img src="../../images/tutorial-listing-category.png" alt="Screenshot of listing page limited by category" />
</BrowserShot>

### Add navigation

Getting around is pretty awkward right now. Let’s add some navigation.

Create `templates/_parts/nav.twig` and add the following to it:

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

```twig{12}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js" defer></script>
  </head>
  <body class="ltr">
    {% include "_parts/nav" %}
    <div class="container mx-auto px-4">
      {% block content %}
      {% endblock %}
    </div>
    <footer class="container mx-auto mt-8 p-4 text-sm opacity-50">
      {{ siteInformation.siteDescription|markdown }}
      <p>&copy; {{ now | date('Y') }}, Built with <a class="text-blue-600" href="https://craftcms.com">Craft CMS</a></p>
    </footer>
  </body>
</html>
```

<BrowserShot url="https://localhost:8080/blog" :link="false" caption="Blog listing with navigation." :max-height="600">
<img src="../../images/tutorial-navigation.png" alt="Screenshot of blog listing with new top navigation" />
</BrowserShot>

### Add a template for a single

Next, let’s set up the about page. We set it up as a single, using the template `_singles/about`.

Create `template/_singles/about.twig` and add the following to it:

```twig
{% extends "_layout" %}

{% block content %}
  <h1 class="text-4xl text-black font-display my-4">{{ entry.title }}</h1>

  <div class="flex -mx-4">
    <div class="w-1/2 px-4">
      {% if entry.aboutImage | length %}
        {% for image in entry.aboutImage.all() %}
          <img src="{{ image.getUrl({ width: 800, height: 600 }) }}" alt="{{ image.title }}" class="my-8" />
        {% endfor %}
      {% endif %}
    </div>
    <div class="w-1/2 px-4">
      {% include "_parts/post-blocks" with { blocks: entry.postContent.all() } only %}
    </div>
  </div>
{% endblock %}
```

We’re using some CSS utility classes to create a two-column layout here, but otherwise you’ll recognize all the pieces from previous examples!

<BrowserShot url="https://localhost:8080/about" :link="false" caption="The About page.">
<img src="../../images/tutorial-single.png" alt="Screenshot of two-colum About page" />
</BrowserShot>

### Edit in preview mode

Once you’ve added templates for each of your sections, you can visit the entry edit page in the control panel and choose the “Preview” button to slide open a panel for previewing your edits as you make them:

<BrowserShot url="https://localhost:8080/admin/entries/blog/40-my-first-post" :link="false" caption="Editing a blog post in preview mode.">
<img src="../../images/tutorial-live-preview.png" alt="Screenshot of control panel editing a post with live preview: content on the left and a front end preview on the right" />
</BrowserShot>

## Fetch content with GraphQL

You can also use Craft CMS headlessly, meaning your web server provides an authoring experience but relies on outside code to provide the front end for visitors. In this case you won’t work with Twig templates, but Craft’s GraphQL API.

### Overview

GraphQL is a developer API for querying Craft CMS content to be used by some other code. Querying content, or elements, is almost identical to how you would fetch content in Twig templates once you’ve configured GraphQL.

### Configure GraphQL

The Craft CMS GraphQL API requires Craft Pro. You can upgrade your local install instantly to use a trial of Craft Pro you can use as long as you’d like.

First upgrade your Craft Solo edition to Craft Pro:

1. From the control panel, choose the “Solo” badge in the bottom left corner.
2. In the “Pro” panel, choose “Try for free”.

Your edition will be upgraded and you’ll see a new GraphQL item in the navigation menu. Choose that.

This is the GraphiQL explorer where you can see the API documentation and run queries directly in the browser:

<BrowserShot url="https://localhost:8080/admin/graphql" :link="false" caption="The GraphiQL explorer.">
<img src="../../images/tutorial-graphql.png" alt="Screenshot of GraphiQL" />
</BrowserShot>

Try running a test GraphQL query:

```graphql
{
  ping
}
```

You’ll see `pong` in the response signaling that everything’s ready to go:

<BrowserShot url="https://localhost:8080/admin/graphql?query=%7B%20ping%20%7D%0A" :link="false" caption="It’s working!">
<img src="../../images/tutorial-graphql-ping.png" alt="Screenshot of GraphiQL" />
</BrowserShot>

TODO: headless configuration

### Query content

TODO: querying Entries, Globals, and Assets

```graphql
{
  entries(section: ["blog"]) {
    title
  }
}
```

```graphql
{
  entries(section: ["about"]) {
    title
  }
}
```

```
{
  globalSet(handle: ["siteInformation"]) {
    ... on siteInformation_GlobalSet {
      siteDescription
    }
  }
}
```

TODO: sending data back to Craft (CSRF) ?

TODO: configuring Live Preview

## Build JSON endpoints with Element API

TODO: what is Element API

### Install Element API
