# Blade Directives

Craft provides a number of Blade directives that simplify access to internal APIs.
The lists below are grouped based on the classes they appear in.

## Auth

&rarr; `CraftCms\Cms\Blade\Directives\AuthDirective`

`@craftRequireLogin`
:   Redirects to the login screen if the user is not authenticated.

`@craftRequireGuest`
:   Redirects to the previous URL if the user _is_ authenticated.

`@craftRequireAdmin`
:   Halts the request if the user is not authenticated as an administrator.

`@craftRequirePermission($permission)`
:   Halts the request if the authenticated user does not have the specified capability.

`@craftRequireEdition($edition, $orBetter = true)`
:   Halts the request if the installed Craft edition does not meet the constraint.

## Cache

&rarr; `CraftCms\Cms\Blade\Directives\CacheDirective`

`craftCache`
:   Start collecting cache tags, and wait for a matching `@endCraftCache` directive.

`craftCacheIf($expression)`
:   Cache the fragment if `$expression` is satisfied.

`craftCacheUnless($expression)`
:   Cache the fragment if `$expression` is _not_ satisfied.

`endCraftCache`
:   Stop collecting cache tags, and cache the resulting HTML fragment, if possible.

<Todo notes="Add HookDirective." />
<Todo notes="Add NamespaceDirective." />

## Page Lifecycle

&rarr; `CraftCms\Cms\Blade\Directives\PageLifecycleDirective`

`@craftHead`
:   Adds a hook for injecting HTML fragments registered for the `<head>` tag.

`@craftBeginBody`
:   Adds a hook for injecting HTML fragments registered for opening `<body>` tag.

`@craftEndBody`
:   Adds a hook for injecting HTML fragments at the end of the `<body>` tag.

## Pagination

&rarr; `CraftCms\Cms\Blade\Directives\PaginationDirective`

`@craftPaginate`
:   [Paginate](../reference/twig/tags.md#paginate) a query.

## Resources

&rarr; `CraftCms\Cms\Blade\Directives\ResourceDirective`

The following tags can be used on their own to register an external asset or snippet, or in a pair to register a block of code.
Buffered resources are output in the appropriate [page lifecycle](#page-lifecycle) hook after a page is rendered.

```blade
{{-- Queue resources into the `@craftHead` hook (by default): --}}
@craftCss('/assets/css/app.css')
@craftJs('/assets/js/app.js')

{{-- Explicitly send a single JS string into the `@craftBeginBody` hook: --}}
@craftJs("document.body.classList.remove('no-js')")

{{-- Buffer a script into the `@craftEndBody` hook: --}}
@craftScript
console.log('Hello from Blade!');
@endCraftScript
```

Craft de-duplicates identical snippets, so you can safely register the same resource multiple times (say, within a loop).

<Todo notes="Describe behaviors of each directive when used on its own and in pairs." />

- `@craftCss` (optionally paired with `@endCraftCss`)
- `@craftJs` (optionally paired with `@endCraftJs`)
- `@craftHtml` (optionally paired with `@endCraftHtml`)
- `@craftScript` (optionally paired with `@endCraftScript`)

## Response

&rarr; `CraftCms\Cms\Blade\Directives\ResponseDirective`

`@craftRedirect(string $path, int $status = 302, ?string $notice = null, ?string $error = null)`
:   Aborts the request and sends a redirect response to `$path` with the provided `$status`. An optional `$notice` or `$error` can be flashed to the user’s session.

`@craftHeader(string $header)`
:   A single header string, with the key and value separated by a colon (`:`), like `X-Release-Codename: poolparty`.

`@craftExpires(DateTimeInterface|string|int|null $expiration = null, ?string $unit = null)`
:   Shortcut for setting cache-control headers (`Expires: $expiration`, `Pragma: cache`, and `Cache-Control: public`). Passing no arguments is equivalent to `Expires: 0`, `Pragma: no-cache`, and `Cache-Control: no-cache, no-store, must-revalidate`.

`@craftExit(?int $status = null, ?string $message = null)`
:   Sends an “error” response using the project-supplied error template and the passed `$status` and `$message`. If no status is supplied, the current output buffer is flushed to the response, but the application is allowed to exit normally.
