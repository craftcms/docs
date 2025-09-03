# Redirects and Rewrites

Craft Cloud allows you to define any number of custom [redirect](#redirects) and [rewrite](#rewrites) rules via your [`craft-cloud.yml` config file](config.md).

Both features use the flexible [`URLPattern` API](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/exec) to match request URLs. These rules are evaluated on our gateway, _before_ we pass the request to your Craft application.

## Redirects

Redirection rules live in your `craft-cloud.yml` file, under a `redirects` key:

```yml
php-version: '8.2'

# ...

redirects:
  - pattern:
      hostname: 'legacy-domain.com'
    destination: 'https://new-domain.com/{request.uri}'
    status: 301
```

Each rule’s `pattern` can be a string or an object; either way, it is passed verbatim to the [`new URLPattern(input)` constructor](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern). In effect, you can match based on [parts of a URL](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern#input), without using complex regular expressions.

A pattern (or each of its components) can be a simple string, or include [wildcards and capture groups](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API#concepts_and_usage).

The `destination` is a pseudo-template used to build a complete URL. It can be a static string or contain substitute information about the original request (`request`) or pattern (`matches`). Additionally, these variables are available to simplify constructing URLs to other Craft Cloud resources:

- `cdnBaseUrl` — The Craft Cloud CDN domain, plus the requested environment’s identifier.  
  <small>Example: `https://cdn.craft.cloud/4eca7d1f-8976-45e9-89fb-6b2e864d9407/`</small>
- `assetBaseUrl` —  Same as above, but pointing to the `assets/` subdirectory of the requested environment.  
  <small>Example: `https://cdn.craft.cloud/4eca7d1f-8976-45e9-89fb-6b2e864d9407/assets/`</small>
- `artifactBaseUrl` — The full URL to the current build’s [artifacts](builds.md) directory.  
  <small>Example: `https://cdn.craft.cloud/4eca7d1f-8976-45e9-89fb-6b2e864d9407/builds/current/artifacts/`</small>

The `matches` object is the return value of [`URLPattern.exec()`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/exec#return_value) for the requested URL. It contains all URL components with any captured groups from the supplied `pattern`.

The `request` object contains these properties:

- `url` — A [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object wrapping the original request’s full URL.
- `uri` — Shorthand for everything after the origin in the original request, and similar to `$_SERVER['REQUEST_URI']` in PHP. It is equivalent to `{request.url.pathname}{request.url.search}{request.url.hash}`.
- `method` — The request’s [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods).
- `headers` — A map of request headers and values. (Headers with dashes can be used in `destination` substitutions like any other property, e.g: `{request.headers.Content-Type}`)

### HTTP Status Codes

An optional `status` key in each rule determines what [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) is sent with the redirection. If none is specified, we default to [302 Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302) for a “temporary” redirection.

Use [301 Moved Permanently](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301) with caution! Some infrastructure and tools aggressively cache 301 responses, or completely replace records with the new URL, meaning it can be difficult or impossible to undo.

### Examples

A common problem solved with HTTP servers (or PHP itself) is normalization of “www” or “non-www” URLs.

```yml
redirects:
  - pattern:
      hostname: 'www.mydomain.com'
    destination: 'https://mydomain.com/{request.uri}'
```

The opposite is also possible:

```yml
redirects:
  - pattern:
      hostname: 'mydomain.com'
    destination: 'https://www.mydomain.com/{request.uri}'
```

For these rules to work, you must have both [domains](domains.md) pointed to the same Craft Cloud environment. Wildcards and/or regular expressions (including [negative lookaheads](https://www.regular-expressions.info/lookaround.html)) are required to create generic rules that match any domain.

Enforcing (or trimming) trailing slashes is another common normalization—Craft even has a config setting ([`addTrailingSlashesToUrls`](/docs/5.x/reference/config/general.html#addtrailingslashestourls)) that handles it at the application level. An equivalent rule would look like this:

```yml
redirects:
  - pattern:
      pathname: '/:noSlashes+'
    destination: '/{matches.pathname.groups.noSlashes}/'
    status: 301
```

While this pattern appears to have only a single path segment, the `+` [modifies the capture group](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API#group_modifiers), allowing it to repeat one or more times. Effectively this rule captures _all_ path segments, regardless of depth—from `/top-level` to `/a/deeply/nested/page`. The destination template simply appends a slash to that template.

::: tip
When the parsed `destination` begins with a slash (a _root-relative_ path), Craft Cloud uses the original request’s hostname and protocol as the base.
:::

## Rewrites

Unlike a [redirect](#redirects), URL rewrites are used to create virtual resources at our gateway—effectively giving you a configurable proxy. This means that when a matching URL is requested, the corresponding origin’s response is sent back, verbatim, without an initial 300-level response.

Rules follow essentially the same structure as redirects: the pattern-matching process and destination templates are identical. Rules are created under a `rewrites` key in your `craft-cloud.yml` config file.

::: tip
Using rewrites, you can avoid referencing `cdn.craft.cloud` or updating templates to use [`cloud.artifactUrl`](https://craftcms.com/knowledge-base/cloud-builds#artifact-uRLs)–any CDN requests can be served directly from your custom domain.
:::

### Examples

You can emulate a local asset filesystem by rewriting a path to our CDN:

```yml
rewrites:
  - pattern:
      pathname: '/uploads/:assetPath+'
    destination: '{assetBaseUrl}/{matches.pathname.groups.assetPath}{request.url.search}'
```

Similarly, you can serve user uploads from a secondary domain or subdomain:

```yml
rewrites:
  - pattern:
      hostname: 'cdn.mydomain.com'
      pathname: '/assets/:assetPath+'
    destination: '{assetBaseUrl}/{matches.pathname.groups.assetPath}{request.url.search}'
```

With this strategy, your files are still stored on (and available from) our CDN—all we’ve done is create an alias for the canonical CDN URL. _Craft continues to generate canonical URLs for assets to ensure that they resolve, independent of rewrite configuration._

[Build artifacts](/knowledge-base/cloud-builds) (including static files from your web root) can also be proxied:

```yml
rewrites:
  - pattern:
      pathname: '/(favicon.ico|.well-known|dist)/*?'
    destination: '{artifactBaseUrl}/{request.uri}'
```
