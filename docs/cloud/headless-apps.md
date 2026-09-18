---
description: Reliably connect a headless app to a Craft Cloud environment.
---

# Headless Apps

Craft Cloud uses advanced bot detection and makes a best effort to prioritize
human traffic. This poses a challenge for headless apps: all content
retrieval is automated and often arrives in concentrated bursts during static
builds and background revalidation.

Follow these guidelines for a successful headless setup on Craft Cloud:

- **Request signing:** [Sign requests](request-signing.md) made by your
  hosting platform, such as Vercel or Netlify, to bypass the stricter
  untrusted-bot policy.
- **Automated retries:** Retries provide resilience against unavoidable
  transient network errors, not just rate limits. Rate limits exist to protect
  your origin. Without them, traffic bursts could overwhelm your database and
  result in more problematic errors.
  - Automated builds can issue many requests in a short window. If possible,
    slow the request rate by reducing build concurrency or adding an interval
    between requests.
    [Nuxt’s Nitro engine supports both options](https://nitro.build/config#prerender).
  - When possible, send GraphQL queries with
    [`GET` requests](/5.x/development/graphql.html#sending-requests-manually) so
    successful responses can be served from Cloud’s static cache.
  - For error responses (4xx and up), honor `Retry-After`, ideally with
    exponential backoff.
  - Only retry `POST` requests that contain read-only GraphQL queries—never
    mutations.

## Automated Retries

A maintained Fetch client such as [Ky](https://github.com/sindresorhus/ky) can
provide this retry policy. If you prefer not to add a dependency, use a small
wrapper around the native Fetch API:

```js
// Bound all attempts and delays.
const TOTAL_TIMEOUT = 30_000;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const getBackoffDelay = (attempt) =>
  1000 * 2 ** attempt * (0.5 + Math.random() / 2);

function getRetryDelay(response, attempt) {
  const retryAfter = response.headers.get('Retry-After');

  // Retry only responses that include Retry-After.
  if (!retryAfter) {
    return null;
  }

  const backoff = getBackoffDelay(attempt);
  const seconds = Number(retryAfter);

  if (Number.isFinite(seconds)) {
    return Math.max(backoff, seconds * 1000);
  }

  const date = Date.parse(retryAfter);

  if (!Number.isNaN(date)) {
    return Math.max(backoff, date - Date.now());
  }

  return backoff;
}

export async function fetchWithRetry(request) {
  const deadline = Date.now() + TOTAL_TIMEOUT;

  for (let attempt = 0; ; attempt++) {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      throw new Error('Craft request timed out');
    }

    const signal = AbortSignal.any([
      request.signal,
      AbortSignal.timeout(remaining),
    ]);
    let response;

    try {
      response = await fetch(request.clone(), { signal });
    } catch (error) {
      const delay = getBackoffDelay(attempt);

      if (request.signal.aborted || Date.now() + delay >= deadline) {
        throw error;
      }

      await sleep(delay);
      continue;
    }

    if (response.ok) {
      return response;
    }

    const error = new Error(`Craft request failed: ${response.status}`);
    const delay = getRetryDelay(response, attempt);

    await response.body?.cancel();

    if (delay === null) {
      throw error;
    }

    if (Date.now() + delay >= deadline) {
      throw error;
    }

    await sleep(delay);
  }
}
```

## Request Signatures

Create a `request-signatures.js` module using `getSignatureHeaders()` from the
general [Node.js signing example](request-signing.md#from-node-js). The
framework examples below construct and sign a native `Request` before sending
it.

## Next.js Example

[Next.js can cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
the validated result of a data-fetching function. This example uses
[Ky](https://github.com/sindresorhus/ky) for the underlying request:

```js
import ky from 'ky';
import { unstable_cache } from 'next/cache';
import { getSignatureHeaders } from './request-signatures.js';

const { CRAFT_URL, CRAFT_GRAPHQL_TOKEN } = process.env;
const method = 'POST';
const url = `${CRAFT_URL}/api`;
const query = `{ entries(section: "blog") { title url } }`;
const body = JSON.stringify({ query });
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${CRAFT_GRAPHQL_TOKEN}`,
};

const getBlogEntries = unstable_cache(
  async () => {
    const request = new Request(url, { method, body, headers });

    for (const [name, value] of Object.entries(getSignatureHeaders(request))) {
      request.headers.set(name, value);
    }

    const result = await ky(request, {
      cache: 'no-store',
      retry: {
        limit: Number.POSITIVE_INFINITY,
        methods: ['post'],
        statusCodes: [429, 503],
        jitter: true,
      },
      timeout: false,
      totalTimeout: 30_000,
    }).json();

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message).join('\n'));
    }

    return result.data;
  },
  ['craft:blog', url, query],
  {
    revalidate: 300,
    tags: ['craft:blog'],
  }
);

const data = await getBlogEntries();
```

Use narrow tags such as `craft:blog` or `craft:products`, and avoid bursts of
app-wide invalidations. When revalidation throws, Next.js continues serving
the last successful result and tries again on a later request.

Vercel provides `stale-while-revalidate` behavior through
[ISR](https://vercel.com/docs/incremental-static-regeneration). Netlify’s
[current Next.js adapter](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
also supports the Full Route and Data caches, including tag- and path-based
revalidation.

## Nuxt Example

Nuxt’s `$fetch` uses [ofetch](https://github.com/unjs/ofetch#-auto-retry), which
can retry requests but does not provide this `Retry-After` and backoff policy.
Keep the signed request in a server route and use the shared helper:

```js
// server/api/blog.get.js
import { fetchWithRetry } from '../utils/fetch-with-retry.js';
import { getSignatureHeaders } from '../utils/request-signatures.js';

const { CRAFT_URL, CRAFT_GRAPHQL_TOKEN } = process.env;
const method = 'POST';
const url = `${CRAFT_URL}/api`;
const query = `{ entries(section: "blog") { title url } }`;
const body = JSON.stringify({ query });
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${CRAFT_GRAPHQL_TOKEN}`,
};

export default defineEventHandler(async () => {
  const request = new Request(url, { method, body, headers });

  for (const [name, value] of Object.entries(getSignatureHeaders(request))) {
    request.headers.set(name, value);
  }

  const response = await fetchWithRetry(request);
  const result = await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join('\n'));
  }

  return result.data;
});
```

Apply `stale-while-revalidate` caching with a route rule, then call the route
from your components with `useFetch('/api/blog')`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  routeRules: {
    '/api/blog': { swr: 300 },
  },
});
```

Nuxt also supports an `isr` route rule on Vercel and Netlify, but adapter
behavior differs. Netlify currently documents a
[cache-control limitation for Nuxt ISR routes](https://docs.netlify.com/build/caching/caching-overview/),
so verify the deployed response before relying on CDN caching.

## Astro Example

Astro prerenders pages by default, so a failed Craft request should fail the
build rather than publish partial content:

```js
---
import { fetchWithRetry } from '../lib/fetch-with-retry.js';
import { getSignatureHeaders } from '../lib/request-signatures.js';

const { CRAFT_URL, CRAFT_GRAPHQL_TOKEN } = process.env;
const method = 'POST';
const url = `${CRAFT_URL}/api`;
const query = `{ entries(section: "blog") { title url } }`;
const body = JSON.stringify({ query });
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${CRAFT_GRAPHQL_TOKEN}`,
};
const request = new Request(url, { method, body, headers });

for (const [name, value] of Object.entries(getSignatureHeaders(request))) {
  request.headers.set(name, value);
}

const response = await fetchWithRetry(request);
const result = await response.json();

if (result.errors?.length) {
  throw new Error(result.errors.map((error) => error.message).join('\n'));
}

const data = result.data;
---
```

Netlify uses [atomic deploys](https://docs.netlify.com/deploy/deploy-overview/),
and Vercel promotes successful deployments to production. A failed build
therefore leaves the current production app in place.

For on-demand rendering, Astro 7 provides a
[route cache API](https://docs.astro.build/en/guides/caching/) with
`stale-while-revalidate` semantics.
