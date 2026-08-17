---
description: Reliably connect a headless site to a Craft Cloud environment.
---

# Headless

Craft Cloud uses advanced bot detection and makes a best effort to prioritize
human traffic. This creates a challenge for headless sites: all content
retrieval is automated and often arrives in concentrated bursts during static
builds and background revalidation.

Two components are critical for a successful headless setup on Craft Cloud:

- **Signed requests:** [Sign requests](request-signing.md) from trusted
  server-side code so they bypass the untrusted-bot policy. Signatures do not
  bypass shared capacity limits, so signed requests can still receive `429` or
  `503` responses. Never expose the signing key to a browser or in a public
  environment variable.
- **Automated retries:** Treat every non-2xx response as a failure. For `429` and
  `503` responses, honor `Retry-After` and use bounded retries with exponential
  backoff and jitter. Only retry `POST` requests that contain read-only GraphQL
  queries—never mutations. Throw after retries are exhausted so
  stale-while-revalidate caching can preserve the last successful result.

## Next.js on Vercel

This example uses [Ky](https://github.com/sindresorhus/ky) to implement that
retry policy while preserving
[Next.js fetch options](https://nextjs.org/docs/app/api-reference/functions/fetch).

Install Ky and the signature library used in the general
[Node.js example](request-signing.md#from-node-js):

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

The 30-second overall timeout keeps the retry within the signature’s 60-second
lifetime. If the request still fails, Ky throws, allowing
[Vercel ISR](https://vercel.com/docs/incremental-static-regeneration) to treat a
revalidation as failed and preserve the last successful result.

Adjust `next.revalidate` for your content. Use narrow tags such as `craft:blog`
or `craft:products`, and avoid bursts of site-wide invalidations.

## Diagnostics

Log the response status, `x-gateway-http-signature`, and `Retry-After` when
diagnosing failures. Never log signing keys or GraphQL tokens.
