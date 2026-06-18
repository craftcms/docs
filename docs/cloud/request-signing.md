---
description: Sign trusted programmatic requests to avoid bot rate limiting.
---

# Request Signing

Request signing lets trusted systems make programmatic requests to Craft Cloud without being treated like unsanctioned bot traffic.

This is useful for automated systems like serverless build processes or CI/CD pipelines, which can correctly look like bots and be rate-limited more aggressively than browsers.

When Cloud verifies a request signature, it treats the request as project-approved and bypasses bot-specific rate limiting.

Signatures use the environment's `$CRAFT_CLOUD_SIGNING_KEY` to generate signatures. Treat this as a secret!

For more details on RFC 9421 HTTP Message Signatures, see [httpsig.org](https://httpsig.org/).

Craft Cloud's gateway verifier treats request signatures as short-lived and only accepts signatures created within roughly the last 5 minutes. Set `expires` about 5 minutes after `created`.

## Signing Requests from Craft

The `craftcms/cloud` package can sign any PSR-7 request:

```php
use craft\cloud\Module;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

$signer = Module::getInstance()->getRequestSigner();

$request = new Request(
    'POST',
    'https://api.example.test/webhook',
    ['Content-Type' => 'application/json'],
    json_encode([
        'event' => 'order.paid',
    ], JSON_THROW_ON_ERROR),
);

$signedRequest = $signer->sign($request);

$response = (new Client())->send($signedRequest);
```

## Signing Requests from Node.js

Node.js can generate valid signatures for a Craft Cloud environment, given the corresponding `$CRAFT_CLOUD_SIGNING_KEY`. The following example uses [`http-message-sig`](https://www.npmjs.com/package/http-message-sig):

```bash
npm install http-message-sig
```

Then sign the request before sending it to Craft:

```js
import crypto from 'node:crypto';
import { signatureHeadersSync } from 'http-message-sig';

const method = 'POST';
const url = process.env.CRAFT_GRAPHQL_URL;

const body = JSON.stringify({
    query: `
        {
            entries(section: "blog") {
                title
                url
            }
        }
    `,
});

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.CRAFT_GRAPHQL_TOKEN}`,
};

const created = new Date();

const signer = {
    keyid: 'hmac',
    alg: 'hmac-sha256',
    signSync(data) {
        return crypto
            .createHmac('sha256', process.env.CRAFT_CLOUD_SIGNING_KEY)
            .update(data)
            .digest();
    },
};

const signatureHeaders = signatureHeadersSync(
    { method, url, headers, body },
    {
        key: 'sig',
        signer,
        components: ['@method', '@target-uri'],
        created,
        expires: new Date(created.getTime() + 300_000),
    },
);

const response = await fetch(url, {
    method,
    headers: {
        ...headers,
        ...signatureHeaders,
    },
    body,
});

const result = await response.json();
```

Store the signing key in the external system's secret manager. The `@target-uri` value must match the requested URL exactly, including any query string.
