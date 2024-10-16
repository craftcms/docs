---
sidebarDepth: 2
---

# Extra Templates

Now that we’ve scaffolded our core blog templates, we can turn to some ancillary features. If you have your own ideas, or want to continue tinkering with the _Blog_ section, go for it! This section is mostly an opportunity to practice using tools you’ve already seen.

## About Page

Our original content plan included an “About” page, which we’ll set up as another section. Back in the control panel:

1. Navigate to <Journey path="Settings, Sections" />;
1. Click **+ New section**;
1. Provide these settings:
    - **Name**: “About”
    - **Handle**: `about`
    - **Section Type**: **Single**
    - **URI**: `about`
    - **Template**: `_singles/about`
1. In the **Entry Types** selector, click **+ Create**, and use these settings:
    - **Name**: “About”
    - **Handle**: `about`
    - **Show the Title field**, **Show the Slug field**, and **Show the Status field**: Off
1. Add the base _Image_ field to the _Content_ tab in the field layout designer, and apply these overrides:
    - **Label**: “Profile Image”
    - **Handle**: `profileImage`
    - Optional: Enable the **Use for element thumbnails** in the field layout element’s action menu <Icon kind="ellipses" />;
1. Add the base _Text_ field to the _Content_ tab in the field layout designer, with these overrides:
    - **Label**: “Bio”
    - **Handle**: `bio`
1. **Save** the entry type and section;

With that, our new page is configured! Let’s head over to **Entries** &rarr; **Singles**, then click **About** to add some content.

### Template

Create `templates/_singles/about.twig` (the **Template** path we used when setting up the section) and add the following to it:

```twig
{% extends '_layout' %}

{% set profileImage = entry.profileImage.one() %}

{% block content %}
  <h1>{{ entry.title }}</h1>

  <div class="about">
    {% if profileImage %}
      <div class="photo">
        {{ profileImage.getImg() }}
      </div>
    {% endif %}

    <div class="bio">
      {{ entry.bio | md }}
    </div>
  </div>
{% endblock %}
```

This template builds upon features we’ve already seen in other places—layouts, element queries, `if` tags, and filters. We’ve interspersed a few `class` attributes in the HTML so that we can come back and target it with CSS, later.

Navigate to `/about` (the _About_ section’s URI) in the front-end—you should see our page’s `title` and the profile image we uploaded:

<BrowserShot url="https://tutorial.ddev.site/about" :link="false">
<img src="../images/twig-single.png" alt="Screenshot of “About” page" />
</BrowserShot>

::: tip
These big images really are a hassle! We’ll look at Craft’s built-in tools for transforming images in the [optimization](optimization.md#asset-transforms) section.
:::

## Global Features

Our site is taking shape, but it’s difficult to move from page-to-page, outside of the blog.

### Page Structure

Our pages’ content is currently output directly into the `<body>` element, but it would be nice to have a bit more structure—and carve out some space for a header and footer.

Back in `templates/_layout.twig`, make these updates:

```twig{11-14,18-22}
<!DOCTYPE html>
<html lang="{{ craft.app.language }}">
  <head>
    <meta charset="utf-8"/>
    <title>{{ siteName }}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    {% do craft.app.view.registerCssFile('@web/styles.css') %}
  </head>
  <body>
    <header>
      <a class="home" href="{{ siteUrl }}">{{ siteName }}</a>
    </header>
    <main>
      {% block content %}
        {# Nothing here, yet! #}
      {% endblock %}
    </main>
    <footer>
      <div class="copyright">&copy;{{ now | date('Y') }} {{ siteName }}</div>
      <div class="colophon">Built with <a href="https://craftcms.com/" target="_blank">Craft CMS</a></div>
    </footer>
  </body>
</html>
```

This small change gives our content a dedicated region, and separates it from any global features we might add… like navigation!

### Navigation

The new `<header>` region is a great place to put a globally-available menu. Just below the anchor tag (`<a>`), add a new `<nav>` element:

```twig{3}
<a class="home" href="{{ siteUrl }}">{{ siteName }}</a>

<nav>
  <ul>
    <li>
      <a href="{{ url('/') }}">Home</a>
    </li>
    <li>
      <a href="{{ url('blog') }}">Blog</a>
    </li>
    <li>
      <a href="{{ url('about') }}">About</a>
    </li>
  </ul>
</nav>
```

What a relief—we can finally click around the site, and every page that extends `_layout.twig` gets our centrally-defined menu without any additional work!

<BrowserShot url="https://tutorial.ddev.site/blog" :link="false">
<img src="../images/twig-navigation.png" alt="Screenshot of blog index with navigation menu" />
</BrowserShot>

### Footer

The updates above included a couple of items in the footer, but it’s worth taking a moment to make this space even more useful.

#### Global Sets

Global sets are Craft’s way of storing a data that should be accessible _everywhere_ in our templates. They function almost exactly like the **Single** section we defined for the _About_ page, except that global sets don’t get their own URLs.

In the control panel, navigate to <Journey path="Settings, Globals" />, then follow these steps:

1. Click **+ New global set**;
1. Name the set _Site Info_ and use `siteInfo` for the handle;
1. Click **+ New Tab** in the field layout designer, and name it _Settings_, _Content_, or something else generic (when there’s only a single tab, Craft will hide the UI for it—but its name can’t be empty);
1. Drag in the base _Text_ field, and override these settings:
    - **Label**: “Description”
    - **Handle**: `description`
1. Click **Save** or press <kbd>Ctrl/Command + S</kbd>;

A new **Globals** item should appear in the main navigation. Click that, populate the **Description** field, and save it:

<BrowserShot url="https://tutorial.ddev.site/admin/globals/siteInfo" :link="false">
<img src="../images/globals.png" alt="Screenshot of the Craft control panel showing a global set edit screen" />
</BrowserShot>

Back in `templates/_layout.twig`, output that blurb in the footer:

```twig{2-4}
<footer>
  <div class="description">
    {{ siteInfo.description | md }}
  </div>
  <div class="copyright">&copy;{{ now | date('Y') }} {{ siteName }}</div>
  <div class="colophon">Built with <a href="https://craftcms.com/" target="_blank">Craft CMS</a></div>
</footer>
```

Craft makes the `siteInfo` variable available on every page and in every template, so its fields are always within reach.

Let’s put HTML aside for a moment and get some styles applied!
