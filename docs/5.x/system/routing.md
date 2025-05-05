# Routing

Routing is the process by which Craft directs incoming requests to specific content or functionality.

Understanding Craft’s high-level approach to routing can help you troubleshoot template loading, plugin action URLs, dynamic routes, and unexpected 404 errors. While this list is an abstraction, it represents the order of Craft’s internal checks:

0. **Should Craft handle this request in the first place?**

    It’s important to keep in mind that Craft doesn’t get involved for *every* request that touches your server—just those that go through your `index.php`.

    The `.htaccess` file that [comes with Craft](https://github.com/craftcms/craft/blob/5.x/web/.htaccess) will silently send all requests that don’t match a directory or file on your web server via `index.php`. If you point your browser directly at a file that *does* exist (such as an image, CSS, or JavaScript file), your web server will serve that file directly, without initializing Craft or PHP.

1. **Is it an action request?**

    [Action requests](../reference/controller-actions.md) either have a path that begins with `/actions/` (or whatever your <config5:actionTrigger> config setting is set to), or an `action` parameter in the POST body or query string. Every request Craft handles is ultimately routed to a controller action, but explicit action requests take precedence and guarantee that essential features are always accessible. If you look at your browser’s _Network_ tab while using the control panel, you’ll see a lot of action requests, like `/index.php?action=users/session-info`.

2. **Is it an element request?**

    If the URI matches an [element](elements.md)’s URI, Craft lets the element decide how to route the request. For example, if an [entry](../reference/element-types/entries.md)’s URI is requested, Craft will render the template specified in its section’s settings, automatically injecting an [`entry` variable](../reference/twig/global-variables.md#other-elements). Only elements that are enabled and [live](drafts-revisions.md#statuses-visibility) are eligible for matching in this way.

    Whenever an element is saved, its URI is rendered and stored in the `elements_sites` database table.

    ::: tip
    Modules and plugins can re-map an element’s route to a custom controller using the [EVENT_SET_ROUTE](craft5:craft\base\Element::EVENT_SET_ROUTE) event to gather and organize additional data, or output it as a different content-type.
    :::

3. **Does the URI match a route or rule?**

    If the URI matches any [dynamic routes](#dynamic-routes) or [URI rules](#advanced-routing-with-url-rules), the template or controller action specified by it will get loaded.

4. **Does the URI match a template?**

    Craft will check if the URI is a valid [template path](../development/templates.md#template-paths). If it is, Craft will render the matched template.

    ::: tip
    If any of the URI segments begin with an underscore (e.g. `blog/_archive/index`), Craft will skip this step. Similarly, [hidden templates](../development/templates.md#hidden-templates) are not matched.
    :::

5. **404**

    If none of the above criteria are met, Craft will throw a [NotFoundHttpException](yii2:yii\web\NotFoundHttpException).

6. **Redirects** <Since ver="5.6.0" feature="Redirection rules" />

    When a 404 exception is thrown, Craft does one final check for a matching [redirect](#redirection) rule. If one is found, the exception is dropped and a 300-level response is sent.

::: warning
If an exception is thrown at any point during a request, Craft will display an error page instead of the expected content.

If [Dev Mode](config5:devMode) is enabled, an error report for the exception will be shown. Otherwise, an error will be returned using either your [custom error template](#error-templates) or Craft’s own default.
:::

## Dynamic Routes

In some cases, you may want a URL to load a template, but its location in your `templates/` folder doesn’t agree with the URI (therefore bypassing step #4), or the URI itself is “dynamic” or parameterized.

A good example of this is a yearly archive page, where you want a year to be one of the segments in the URL (e.g. `blog/archive/2018`). Creating a static route or template for every year would be impractical—instead, you can define a single route with placeholders for dynamic values:

![Creating a New Route](../images/routing-creating-new-route.png)

### Creating Routes

To create a new Route, go to <Journey path="Settings, Routes" /> and choose **New Route**. A modal window will appear where you can define the route settings:

- What should the URI look like?
- Which template should get loaded?

The first setting can contain “tokens”, which represent a range of possible matches, rather than a specific string. (The `year` token, for example, represents four consecutive digits.) When you click on a token, Craft inserts it into the URI setting wherever the cursor is.

If you want to match URIs that look like `blog/archive/2018`, type `blog/archive/` into the URI field and choose the `year` token.

::: tip
Route URIs should _not_ begin with a slash (`/`).
:::

After defining your URI pattern and entering a template path, press **Save**. The modal will close, revealing your new route on the page.

When you point your browser to `https://my-project.tld/blog/archive/2018`, it will match your new route, and Craft will load the specified template with value of the `year` token automatically available in a variable called `year`:

```twig
{# Fetch posts in the specified `year`: #}
{% set posts = craft.entries()
  .section('posts')
  .postDate([
    'and',
    ">= #{year}",
    "< #{year + 1}",
  ])
  .all() %}

{% for post in posts %}
  <article>
    <h2>{{ post.title }}</h2>
    {{ post.description | md }}
    <a href="{{ post.url }}">{{ 'Read More' | t }}</a>
  </article>
{% endfor %}
```

::: tip
Routes automatically support [pagination](../reference/twig/tags.md#paginate), so this one route covers other URIs like `/blog/archive/2018/page/2` (assuming your <config5:pageTrigger> was `page/`). If you wanted to break the archive into smaller logical chunks, you could use additional [tokens](#available-tokens) to collect results by month—or even by day!
:::

### Available Tokens

The following tokens are available to the URI setting:

- `*` – Any string of characters, except for a forward slash (`/`)
- `day` – Day of a month (`1`-`31` or `01`-`31`)
- `month` – Numeric representation of a month (1-12 or 01-12)
- `number` – Any positive integer
- `page` – Any positive integer
- `uid` – A v4 compatible UUID (universally unique ID)
- `slug` – Any string of characters, except for a forward slash (`/`)
- `tag` – Any string of characters, except for a forward slash (`/`)
- `year` – Four consecutive digits

::: tip
If you define a route using a wildcard token (`*`) in the control panel, it will automatically be available as a named parameter called `any`.

![Screenshot of Create a new route control panel form with wildcard token](../images/route-with-wildcard-token.png =400x300)

The template for `my-project.tld/foo/some-slug` could then use `{{ any }}`:

```twig
It seems you’re looking for `{{ any }}`.
{# output: It seems you’re looking for `some-slug`. #}
```
:::

## Advanced Routing with URL Rules

In addition to routes defined via the control panel, you can define [URL rules](guide:runtime-routing#url-rules) in `config/routes.php`.

```php
return [
  // Route blog/archive/YYYY to a controller action
  'blog/archive/<year:\d{4}>' => 'controller/action/path',

  // Route blog/archive/YYYY to a template
  'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
];
```

If your Craft installation has multiple sites, you can create site-specific URL rules by placing them in a sub-array, and set the key to the site’s handle. Craft will take care of determining the site’s base URL via this handle, so you don’t need to declare it as part of the route pattern itself.

```php
return [
  'siteHandle' => [
    'blog/archive/<year:\d{4}>' => 'controller/action/path',
  ],
];
```

A subset of the [tokens](#available-tokens) above can be used within the regular expression portion of your [named parameters](guide:runtime-routing#named-parameters):

- `{handle}` – matches a field handle, volume handle, etc.
- `{slug}` – matches an entry slug, category slug, etc.
- `{uid}` – matches a v4 UUID.

```php
return [
  // Be aware that URIs matching an existing element route will be picked up by step #2, above!
  'blog/<entrySlug:{slug}>' => 'controller/action/path',
];
```

### Accessing Named Parameters in your Templates

URL rules that route to a template (`['template' => 'my/template/path']`) will pass any named parameters to the template as variables—just like CP-defined routes. For example, this rule…

```php
'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
```

…will load `blog/_archive.twig` with a `year` variable set to `2022` when requesting `https://my-project.tld/blog/archive/2022`.

```twig
<h1>Blog Entries from {{ year }}</h1>
```

### Accessing Named Parameters in your Controllers

Named route parameters are automatically passed to matching controller action arguments.

For example, this URL rule…

```php
'comment/<postId:\d+>' => 'my-module/blog/comment',
```

…would match the numeric ID in the route to the `$id` argument of this [custom controller](../extend/controllers.md) action:

```php
namespace modules\controllers;

use craft\elements\Entry;
use craft\web\Controller;

class BlogController extends Controller
{
  /**
   * Create a comment for the specified blog post ID.
   * 
   * @param int $postId Blog Post ID defined by route parameters.
   */
  public function actionComment(int $postId)
  {
    $this->requirePostRequest();

    // Use the ID to look up the entry...
    $entry = Entry::find()
      ->section('posts')
      ->id($postId)
      ->one();

    // ...and grab the comment content from the request:
    $comment = Craft::$app->getRequest()->getBodyParam('comment');

    // ...
  }
}
```

This rule only serves as an alias to the controller action, which will always be directly accessible via an [action request](../development/forms.md)—in this case by using the [`actionInput()`](../reference/twig/functions.md#actioninput) function:

```twig
<form method="post">
  {{ csrfInput() }}
  {{ actionInput('my-module/blog/comment') }}
  {{ hiddenInput('postId', entry.id) }}

  <textarea name="comment"></textarea>

  <button>Post Comment</button>
</form>
```

## Error Templates

You can provide your own error templates for Craft to use when returning errors on the front end.

When an error is encountered, Craft will look for a template in your `templates/` directory, in the following order:

1. A template matching the error’s status code, like `404.twig`.
2. For a 503 error, a template named `offline.twig`.
3. A template named `error.twig`.

::: tip
You can tell Craft to look for the error template in a nested template directory, using the <config5:errorTemplatePrefix> config setting.
:::

If Craft finds a matching error template, it will render it with the following variables:

- `message` – error message
- `code` – exception code
- `file` – file that threw the exception
- `line` – line in which the exception occurred
- `statusCode` – error’s HTTP status code

::: tip
Custom error templates are only used when [Dev Mode](config5:devMode) is **disabled**. When it’s enabled, an exception view will be rendered instead. Note that `devMode` may also be set via the `CRAFT_DEV_MODE` [environment override](../configure.md#environment-overrides)!
:::

### Redirection <Since ver="5.6.0" feature="Redirects config file" />

Craft also supports a `redirects.php` config file that can contain any number of rules, structured similarly to the [advanced routing](#advanced-routing-with-url-rules) examples, above. Redirects are only evaluated after Craft decides it can’t serve the request and begins handling the HTTP exception.

Each item in the returned array is a “rule,” and rules are evaluated from top to bottom. The simplest rule is a case-insensitive mapping from one path to another:

```php
return [
    'old/path' => 'new/path',
];
```

This key-value syntax is equivalent to explicitly declaring a `from` and `to` key in the rule:

```php
return [
    [
        'from' => 'old/path',
        'to' => 'new/path',
    ],
];
```

When using an array, you may also include `caseSensitive` and `statusCode` keys for more control over the rule’s behavior:

```php
return [
    [
        'from' => 'old/path',
        'to' => 'new/path',
        'caseSensitive' => true,
        // Defaults to 302 (“Temporary”)
        'statusCode' => 301, // “Permanent”
    ],
];
```

::: tip
To send a user to the homepage, use an empty string (`''`) for the `to` value.
:::

Rules can contain [parameters](#advanced-routing-with-url-rules), as well:

```php
return [
  'posts/<year:\d{4}>/<slug:{slug}>' => 'news/<year>-<slug>',
];
```

Named parameters can be used in the `to` value by wrapping them in angle brackets, like `<year>` and `<slug>` in this example.

If you need complete control over the matching _and_ redirection logic, create a rule with a `match` key, set to a closure:

```php
return [
    [
        'match' => function (\Psr\Http\Message\UriInterface $url): ?string {
            // Match a path:
            if ($url->getPath() !== 'customer_order.aspx') {
                return null;
            }

            // Or test for the presence of a query parameter:
            parse_str($url->getQuery(), $params);

            if (!isset($params['orderId'])) {
                return null;
            }

            return sprintf('account/orders/%s', $params['orderId']);
        },
        'statusCode' => 301,
    ],
];
```

You may return `null` from a match callback to skip the rule and continue processing. Callbacks are only invoked if all previous rules fail to match.

#### Multi-Site Redirection

Unlike routes, redirection rules are processed globally, and matched against full paths. For example, a rule like `old/page` would _not_ catch a request path beginning with a site’s base path, like `/secondary-site/old/page`. You may parameterize rules to match multiple sites’ base paths (i.e: `<site:{slug}>/old/page`), or define individual rules for each relevant site.

However, as part of Craft’s normal routing behavior, every front-end request is handled in the context of a site—typically one with the correct hostname and the longest matching base path, or the “default” site when none match. When a redirect rule is evaluated, its `to` value is treated as site-relative, meaning this rule…

```php
return [
    'corporate/team' => 'about-us',
];
```

…behaves differently depending on whether or not a site exists with the base path `corporate`. _Without_, it would redirect normally (`/corporate/team` to `/about-us`), but _with_, requests to `/corporate/team` would actually end up at `/corporate/about-us`, because Craft tried to route the request in the “Corporate” site context.

To avoid this ambiguity, prefix the destination with a slash (`/`) to make it an “absolute” path:

```php
return [
    'corporate/team' => '/about-us',
];
```
