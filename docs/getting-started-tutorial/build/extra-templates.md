# Extra Templates


## Add a template for a single

Next, let’s set up the about page. We set it up as a single, using the template `_singles/about`.

Create `template/_singles/about.twig` and add the following to it:

```twig
{% extends "_layout.twig" %}

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
      {% include "_includes/post-blocks.twig" with { blocks: entry.postContent.all() } only %}
    </div>
  </div>
{% endblock %}
```

We’re using specific CSS utility classes to create a two-column layout, but otherwise you’ll recognize all the pieces from previous examples!

<BrowserShot url="https://tutorial.ddev.site/about" :link="false" caption="The About page.">
<img src="../images/single.png" alt="Screenshot of two-column About page" />
</BrowserShot>
