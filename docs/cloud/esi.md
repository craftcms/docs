---
description: Include islands of personalized or dynamic content in any page.
---

# Edge-Side Includes

Craft Cloud has basic support for the [ESI standard](https://www.w3.org/TR/esi-lang/), allowing you to include dynamic regions in an otherwise [statically-cached](static-caching.md) page.

<!-- more -->

These substitutions are performed _at the edge_, meaning clients do not see additional HTTP round-trips for each fragment, and the final document is indistinguishable from one generated entirely by Craft.

ESI fragments are _always_ cached independently (if [eligible](static-caching.md#controlling-the-cache)), and stitched together in our runtime.

## Templating

Use the helper function `cloud.esi()` <Since ver="1.78.0" repo="craftcms/cloud-extension-yii2" description="Edge-side include helper function was first available in {ver} of the Cloud extension" :use-changelog="false" /> <Since ver="2.22.0" repo="craftcms/cloud-extension-yii2" description="Edge-side include helper function was first available in {ver} of the Cloud extension" :use-changelog="false" /> to include another template:

::: code
```twig header.twig
<header>
  <h1>{{ siteName }}</h1>

  {# ... #}

  {{ cloud.esi('_account/nav.twig') }}
</header>
```
```twig _account/nav.twig
<nav aria-labelledby="account-navigation">
  <h2 id="account-navigation">Account navigation</h2>
  <ul>
    {% if currentUser %}
      <li>
        {{ tag('a', {
          text: 'Dashboard',
          href: siteUrl('my-account/dashboard'),
        }) }}
      </li>
      <li>
        {{ tag('a', {
          text: 'Log out',
          href: logoutUrl,
        }) }}
      </li>
    {% else %}
      <li>
        {{ tag('a', {
          text: 'Log in',
          href: loginUrl,
        }) }}
      </li>
    {% endif %}
  </ul>
</nav>
```
:::

Cloud generates a signed URL, which means you can:

- Pass tamper-proof [variables](#variables) to the included template;
- Include [private](config5:privateTemplateTrigger) templates that are otherwise inaccessible via normal [routing](/5.x/system/routing.md);

## Limitations

Edge-side includes are not a silver bullet for dynamic content.

### Performance

A response can never be sent faster than the slowest sub-resource request, so splitting a page into parts isn’t always the correct path.

Craft Cloud caches sub-resources independently, and can retrieve cached fragments efficiently.
Any sub-resource that _does_ make it to the Craft application, however, is handled as a separate invocation, and may result in longer service than rendering the entire page dynamically.

To illustrate, suppose you had a carousel of ten featured locations that each had a “daytime” and “nighttime” image attached to them, which you display based on the location’s current time.
Putting an edge-side include _inside_ that loop (individually wrapping each project thumbnail) might cause 10 sub-requests.
Wrapping the entire carousel in an include would only trigger a single sub-request.
While the service time for the whole carousel may be slightly longer than an individual slide, grouping the dynamic content means the total number of requests that reach the origin is kept to a minimum.

::: tip
We discuss an alternative to edge-side includes in the [dynamic content](static-caching.md#dynamic-pages) section of the static caching article.
:::

We strongly discourage using edge-side includes inside one another.
If you have mixed static and dynamic content downstream of an include, render it all at once using regular Twig `include`s.

### Variables

Only scalar values can be passed to `cloud.esi()`.
The extension recursively validates arguments to prevent issues when constructing a signed URL.

Because the parent and nested requests do not share memory, you must re-fetch any complex objects like elements:

::: code
```twig{4} home.twig
<h1>{{ siteName }}</h1>

{{ cloud.esi('_partials/hero-carousel', {
  sourceId: entry.id,
}) }}
```
```twig{4,6} _partials/hero-carousel.twig
{# Mark this dynamic include as cacheable for 10 minutes: #}
{% expires in 10 minutes %}

{% set sourceId = craft.app.request.getParam('sourceId') %}
{% set source = craft.entries()
  .id(sourceId)
  .one() %}

{# Get slides from the source and randomize their order: #}
{% set slides = source.heroSlides.all() | shuffle %}

{% for slide in slides %}
  {# ... #}
{% endfor %}
```
:::

Also unlike the built-in `{% include %}` tag and `{{ include() }}` function, the current Twig “context” cannot be passed to the included templates.
Features like the [`_globals` collection](/5.x/reference/twig/global-variables.md#globals) do not share state.

### Side Effects

Templates that depend on (or cause) side-effects of the sequence in which they are rendered, like registering scripts and styles, modifying the `_globals` collection, or setting headers.

### Content Types

Only `text/html` and `text/plain` responses are parsed for edge-side include tags.
A sub-resource may be any compatible content type (i.e. not binary or streams), i.e. `application/json`.

## Development

Outside of cloud, the module silently falls back to synchronous rendering.
This behavior is _not_ identical to `include` tag or function: the included template does not have access to the parent context, and only some [variables](#variables) can be passed.
