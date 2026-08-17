---
description: Reliably connect a headless site to a Craft Cloud environment.
---

# Headless

A headless site typically runs its front end separately from Craft Cloud and
retrieves content from Craft’s [GraphQL API](/5.x/development/graphql.md).
Static builds and background revalidation can generate concentrated bursts of
requests, so the front end must be prepared for temporary capacity limits.

Use this contract regardless of your front-end framework or hosting provider:

- [Sign requests](request-signing.md) from trusted server-side code. Never expose
  the signing key to a browser or in a public environment variable.
- Treat every non-2xx response as a failure. A verified signature bypasses the
  untrusted-bot policy, not shared capacity limits, so signed requests may still
  receive `429` or `503` responses.
- For `429` and `503` responses, honor `Retry-After` and retry a limited number
  of times with exponential backoff and jitter.
- Retry `POST` requests only when they contain read-only GraphQL queries. Never
  automatically retry mutations.
- After retries are exhausted, throw an error rather than rendering or caching
  an incomplete response. Pair this with stale-while-revalidate caching so the
  front end can continue serving the last successful result.

## Next.js on Vercel

This example uses [Ky](https://github.com/sindresorhus/ky) because it treats
non-2xx responses as errors and supports `Retry-After`, bounded retries,
exponential backoff, jitter, and an overall timeout while preserving
[Next.js fetch options](https://nextjs.org/docs/app/api-reference/functions/fetch).

Install Ky and the same signature library used in the general
[Node.js signing example](request-signing.md#from-node-js):

```bash
npm install ky http-message-sig
```

Create a GraphQL helper:

```js
import crypto from 'node:crypto';
import { signatureHeadersSync } from 'http-message-sig';
import ky from 'ky';

const { CRAFT_URL, CRAFT_GRAPHQL_TOKEN, CRAFT_CLOUD_SIGNING_KEY } = process.env;

export async function queryCraft(query, variables = {}) {
  const method = 'POST';
  const url = `${CRAFT_URL}/api`;
  const body = JSON.stringify({ query, variables });
  const created = new Date();

  const signatureHeaders = signatureHeadersSync(
    { method, url },
    {
      key: 'sig',
      signer: {
        keyid: 'hmac',
        alg: 'hmac-sha256',
        signSync(data) {
          return crypto
            .createHmac('sha256', CRAFT_CLOUD_SIGNING_KEY)
            .update(data)
            .digest();
        },
      },
      components: ['@method', '@target-uri'],
      created,
      expires: new Date(created.getTime() + 60 * 1000),
    }
  );

  const result = await ky
    .post(url, {
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CRAFT_GRAPHQL_TOKEN}`,
        ...signatureHeaders,
      },
      retry: {
        limit: 1,
        methods: ['post'],
        statusCodes: [429, 503],
        jitter: true,
      },
      totalTimeout: 30_000,
      next: {
        revalidate: 300,
        tags: ['craft:blog'],
      },
    })
    .json();

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join('\n'));
  }

  return result.data;
}
```

The single retry keeps the request within the signature’s 60-second lifetime,
and Ky throws after the retry or 30-second overall timeout. This allows
[Vercel ISR](https://vercel.com/docs/incremental-static-regeneration) to treat a
background revalidation as failed and preserve the last successful result.

The `next` values are examples. Choose a revalidation interval appropriate for
your content, and use narrow tags such as `craft:blog`, `craft:products`, or a
specific section or entry. Prefer targeted revalidation over invalidating the
entire site, and avoid triggering large bursts of invalidations when content is
updated in bulk.

## Diagnostics

When a request fails, inspect its status and these response headers in your
front-end deployment logs:

- `x-gateway-http-signature` contains request-signature diagnostics;
- `x-gateway-rate-limit` identifies applicable gateway rate limiting; and
- `Retry-After` tells the caller how long to wait before retrying a `429` or
  `503` response.

Do not log signing keys or GraphQL tokens while collecting diagnostics.
