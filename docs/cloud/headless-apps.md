---
description: Reliably connect a headless app to a Craft Cloud environment.
---

# Headless Apps

Craft Cloud uses advanced bot detection and makes a best effort to prioritize
human traffic. This poses a challenge for headless apps: all content
retrieval is automated and often arrives in concentrated bursts during static
builds and background revalidation.

Two components are critical for a successful headless setup on Craft Cloud:

- **Request signing:**
  - Use [request signing](request-signing.md) from trusted server-side code to
    bypass the untrusted-bot policy.
  - Signatures do not bypass shared capacity limits, so signed requests can
    still receive `429` or `503` responses.
  - Never expose the signing key to a browser or in a public environment
    variable.
- **Automated retries:**
  - Treat every non-2xx response as a failure.
  - For `429` and `503` responses, honor `Retry-After` and use bounded retries
    with exponential backoff and jitter.
  - Only retry `POST` requests that contain read-only GraphQL queries—never
    mutations.
  - Throw after retries are exhausted so `stale-while-revalidate` caching can
    preserve the last successful result.

## Automated Retries

A maintained Fetch client such as [Ky](https://github.com/sindresorhus/ky) can
provide this retry policy. If you prefer not to add a dependency, use a small
wrapper around the native Fetch API:

```js
const TOTAL_TIMEOUT = 30_000;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function getRetryDelay(response, attempt) {
  const retryAfter = response.headers.get('Retry-After');

  if (!retryAfter) {
    return null;
  }

  const backoff = 1000 * 2 ** attempt * (0.5 + Math.random() / 2);
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

export async function fetchWithRetry(input, init = {}) {
  const deadline = Date.now() + TOTAL_TIMEOUT;

  for (let attempt = 0; ; attempt++) {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      throw new Error('Craft request timed out');
    }

    const timeoutSignal = AbortSignal.timeout(remaining);
    const signal = init.signal
      ? AbortSignal.any([init.signal, timeoutSignal])
      : timeoutSignal;
    const response = await fetch(input, { ...init, signal });

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

`fetchWithRetry()` retries responses with a `Retry-After` header that fit within
a 30-second deadline.

## Request Signatures

Create a `request-signatures.js` module using `getSignatureHeaders()` from the
general [Node.js signing example](request-signing.md#from-node-js). The
framework examples below import that helper so signing does not interfere with
framework-specific request options.

## Next.js Example

[Next.js extends `fetch()`](https://nextjs.org/docs/app/api-reference/functions/fetch)
with cache and revalidation options. This example uses
[Ky](https://github.com/sindresorhus/ky), which passes those options through to
the underlying Fetch implementation:

```js
import ky from 'ky';
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
const signatureHeaders = getSignatureHeaders({ method, url, headers });

const result = await ky.post(url, {
  body,
  headers: {
    ...headers,
    ...signatureHeaders,
  },
  retry: {
    limit: Number.POSITIVE_INFINITY,
    methods: ['post'],
    statusCodes: [429, 503],
    jitter: true,
  },
  timeout: false,
  totalTimeout: 30_000,
  next: {
    revalidate: 300,
    tags: ['craft:blog'],
  },
}).json();

if (result.errors?.length) {
  throw new Error(result.errors.map((error) => error.message).join('\n'));
}

const data = result.data;
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
  const signatureHeaders = getSignatureHeaders({ method, url, headers });
  const response = await fetchWithRetry(url, {
    method,
    body,
    headers: {
      ...headers,
      ...signatureHeaders,
    },
  });
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
const signatureHeaders = getSignatureHeaders({ method, url, headers });
const response = await fetchWithRetry(url, {
  method,
  body,
  headers: {
    ...headers,
    ...signatureHeaders,
  },
});
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
`stale-while-revalidate` semantics. Its Netlify and Vercel CDN cache providers
are currently experimental, so use the static build approach unless runtime
revalidation is required.
