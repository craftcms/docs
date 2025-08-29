# Static Caching

All of Craft’s default caching features work as you would expect on Craft Cloud.

To supplement this, we provide a static caching system that automatically detects (and purges!) cacheable HTML responses. These static page caches are created and invalidated using the same mechanism as Craft’s own template caches—so any time an element is updated, Cloud knows exactly which pages to purge.

By default, only 200-level GET responses are candidates for static caching; redirection and errors (300-level and higher) are _not_ cached, unless you [explicitly opt in](#force-caching).

## Static Cache vs. Template Caches

Cloud’s static cache operates on *full pages*, which means that either the entire page is cached, or the entire page is served by your application. Whether you use additional caching strategies in your templates or back-end is up to you!

Craft’s built-in `{% cache %}` tag can be combined with static caching—but because the caches are invalidated at the same time, they may be redundant. If you have a highly-dynamic front-end that isn’t possible to cache statically, the normal template cache system is still a great option for caching parts of a page.

Most Craft features that rely on dynamic rendering are already set up to bypass the cache, including the entire control panel, live preview, any front-end pages that use the session or cookies. [Asynchronous CSRF](#csrf) can be enabled in Craft to make most front-end forms cachable.

## Controlling the Cache

The request’s entire URL (including query parameters) is used when determining whether to serve a page from the cache.

In Craft versions 4.10 and 5.2, the [`expires` Twig tag](/5.x/reference/twig/tags.html#expires) was introduced to simplify setting cache headers. Examples are provided below for this method as well as precise control of individual headers via the [`header` tag](/5.x/reference/twig/tags.html#header).

### Force Caching

If you suspect requests are _missing_ the static cache (despite meeting the criteria above), and you know that a page _should_ be cacheable, you can explicitly send cache headers:

```twig
{% expires in 30 minutes %}

{# ...or prior to Craft 4.10 and 5.2... #}

{% set halfHour = 60 * 30 %}
{% do craft.app.response.setCacheHeaders(halfHour) %}
```

Craft always sends the appropriate cache invalidation tags so that the page can be purged, later.

::: warning
Manually caching a page in this way _can_ leak user-specific information. This is only appropriate for use when you are absolutely sure that a page includes no personal details or customizations!
:::

### Opting Out

You can explicitly flag a template or response as being _ineligible_ for full-page caching:

```twig
{# Set “no-cache” headers by omitting a duration: #}
{% expires %}
```

In PHP, use the `Response` component available from any [controller](/5.x/extend/controllers.html):

```php
public function actionSaveWidget(): Response
{
    // ...

    $this->response->setNoCacheHeaders();
}
```

This method also sets `Expires` and `Pragma` headers. When using the `expires` tag without any arguments, it ultimately calls the same function:

```twig
{% do craft.app.response.setNoCacheHeaders() %}
```

## Duration

The Cloud extension uses the same source of information as Craft when determining how long to statically cache a page (if it is cachable at all). This means that pages using elements with an **Expiry Date** sooner than the default [`cacheDuration` setting](/5.x/reference/config/general.html#cacheduration) will only be cached as long as all the underlying content ought to be visible. As with Craft’s template caches system, there is not currently a mechanism in place to invalidate caches that _would_ contain elements with a future **Post Date**.

If you have [manually set cache headers](#force-caching) at some point in the request, Craft will not overwrite those headers.

::: tip
Previously, we used the Twig `{% header %}` tag to set the `Cache-Control` header. This is fine in situations where the template can dictate the final value of a header—but tagging pages for Cloudflare’s cache must be done _additively_ with the response’s [header collection](https://www.yiiframework.com/doc/guide/2.0/en/runtime-responses#http-headers), without replacing ones that may have been set earlier in the request.
:::

## Manual Purging

If you would like to clear your environment’s entire static page cache, visit the **Utilities** screen, check **Cloud Static Caches**, then **Clear Caches**.

To clear a specific cache tag, use the CLI via the environment’s **Commands** screen:

```bash
php craft cloud/static-cache/purge-tags tag-one tag-two
```

You can also directly purge URLs by one or more URL path prefix:

```bash
php craft cloud/static-cache/purge-prefixes /vendors /listings
```

## Session & Cookies

Using any functionality that relies on cookies will prevent a response from being cached. The following sections cover some common Craft features that involve the session and cookies.

If you suspect a page is not being cached, look for a `Set-Cookie` header in the response, and check the [troubleshooting](#troubleshooting) section.

### Users

The `{% requireLogin %}`, `{% requireGuest %}`, `{% requireAdmin %}`, and `{% requirePermission %}` [Twig tags](/5.x/reference/twig/tags.html) all use session data to dynamically redirect users.

Reading the [`currentUser` variable](/5.x/reference/twig/global-variables.html) does not implicitly start a session, and may result in the logged-out state of a page being cached. Any pages you anticipate including personalized content (like user dashboards) should include the [`{% expires %}` tag](#opting-out) so that they are excluded from the cache, or lazily fetch session-dependent regions [via Ajax](#including-via-ajax).

### CSRF

Use Craft’s [`asyncCsrfInputs` setting](/5.x/reference/config/general.html#asynccsrfinputs) to make CSRF inputs generated with the [`csrfInput()` Twig function](/5.x/reference/twig/functions.html#csrfinput) compatible with the static cache. Instead of outputting the `input` element and token directly (therefore opening a session), a placeholder is rendered and replaced after the browser/client loads the page and fetches a CSRF token via Ajax.

You can also opt in to asynchronous CSRF inputs on a case-by-case basis:

```twig
<form method="post">
  {{ csrfInput({ async: true }) }}

  {# ... #}
</form>
```

Avoid calling `craft.app.request.getCsrfToken()` directly, or manually building CSRF inputs. No-cache headers will be sent, _regardless of how you generate or access a token_! This means that outputting a CSRF token in the `<head>` of every page (say, to avoid them being cached in a `{% cache %}` tag later in the document) will make it ineligible for static caching.

### Flashes

Any time you access session-dependent information like [flashes](/5.x/development/forms.html#flashes), Craft sends no-cache headers. Form submissions via POST are never cached and will therefore re-render the page with any contextual [validation errors](/5.x/development/forms.html#models-and-validation) as you would expect—but when the form itself is otherwise cachable (including using [asynchronous CSRF tokens](#csrf)), you can guard flash messages with a check for a flag:

```twig
{# Access session data only when the `success` query param is set: #}
{% if craft.app.request.getQueryParam('success') %}
  {% set flashes = craft.app.session.getAllFlashes(true) %}

  {% if flashes|length %}
    {% for level, flash in flashes %}
      <p>{{ flash }}</p>
    {% endfor %}
  {% endif %}
{% endif %}

<form method="post">
  {{ actionInput('entries/save-entry') }}
  {{ csrfInput({ async: true }) }}

  {# Append a query parameter to the final redirection: #}
  {{ redirectInput(url(craft.app.request.url, { success: true })) }}

  {# ... #}
</form>
```

This allows Cloud to cache the form when it is initially requested, while always triggering no-cache headers after a submission by reading flashes from the session.

### Commerce

Any time you access a customer’s cart via `craft.commerce.carts.cart`, Commerce either reads or writes a [cart number](/commerce/5.x/system/orders-carts.html#order-numbers) to the session. This is not apt to be a problem on pages that only on-session users will access (like the cart, checkout, or account), but it can mean that common ecommerce patterns make your site more difficult to conform with the expectations of Cloud’s static cache.

In particular, displaying dynamic cart data on _every_ page (say, in the site’s header) means that Cloud will be unable to cache your site. See the [Including via Ajax](#including-via-ajax) section to learn about a technique that can help retain these dynamic sections of your site!

## Dynamic Pages

Pages that rely on dynamic content but don’t necessarily access session data are apt to be cached without some intervention.

For example, shuffling, sorting, or querying records based on random values (i.e. `.orderBy('RAND()')`) do _not_ use the session, and cannot be detected by Cloud. If you wish to show randomized content on a page, you may need to [explicitly send no-cache headers](#controlling-the-cache), or reorder content with JavaScript, in the client.

### Including via Ajax

Dynamic or session-dependent sections of a page can be fetched asynchronously, while allowing the bulk of a page to be cached.

Suppose you have a Commerce storefront on Cloud, and you want to make your homepage and cart pages  fast, but still include information about the customer’s cart. Suppose you have this in your site’s header or layout:

```twig
<header>
  <h1>{{ siteName }}</h1>
  <div class="cart">
    Cart <span id="cart-count"></span>

    {# Register a JavaScript fragment: #}
    {% js %}
      const $count = document.getElementById('cart-count');

      fetch('/ajax/components/cart-count')
        .then(r => r.text())
        .then(html => $count.innerHTML = html);
    {% endjs %}
  </div>
</header>
```

This template doesn’t depend on the session, so Cloud would be able to cache it normally. When the page arrives in a customer’s browser, though, it fetches another HTML fragment via Ajax:

```twig
{% set total = craft.commerce.carts.cart.totalQty %}

{{ total }} {{ total == 1 ? 'item' : 'items' }}
```

Similarly, the templates for a randomized carousel might look like this:

```twig
<div id="carousel">
  {# Content will be injected here! #}
</div>

{# Essentially the same JavaScript fragment: #}
{% js %}
  const $carousel = document.getElementById('carousel');

  fetch('/ajax/components/carousel')
    .then(r => r.text())
    .then(html => $carousel.innerHTML = html);
{% endjs %}
```

```twig
{# Send no-cache headers so this is always dynamic: #}
{% expires %}

{% set slides = craft.entries()
  .section('heroSlides')
  .orderBy('RAND()')
  .limit(5)
  .all() %}

{% for slide in slides %}
  <figure>
    {# ... #}
  </figure>
{% endfor %}
```

As long as you can isolate these “islands” of state-dependent or dynamic markup in their own templates, you will be able to retrieve them later over Ajax. This is functionally distinct from a Twig `include` because the logic is never run during the main request; instead, it’s deferred to a second, lighter-weight request.

## Troubleshooting

You can check whether a response was served from the cache by examining its HTTP headers. A `HIT` value in the `cf-cache-status` header indicates that we were able to serve a statically-cached version of the page:

```
cf-cache-status: HIT
```

A `MISS` value on the other hand can mean two things:

- The page was not found in the cache, so it was served from the origin;
- The response served from the origin included headers that prevented it from being cached;

Of course, every page must be requested from the origin at least once for it to be present in the cache—so a `MISS` is not always indicative of a problem! If you observe repeated misses, you may need to audit your templates for use [features that involve the session and cookies](#session-cookies)—the most common offenders will result in a `Set-Cookie` header being sent.

It's important to note that these conditions only apply to requests that would be served by Cloud’s compute layer. Requests for assets (including transforms) also go through our edge, but are governed by different rules and typically out of your control.
