---
description: Sign trusted programmatic requests to avoid bot rate limiting.
---

# Request Signing

Request signing allows trusted systems to make programmatic requests to Craft Cloud without being treated like unsanctioned bot traffic.

This is useful for automated systems like static site builds or CI/CD pipelines, which will often be identified (correctly!) as “bots” and be rate-limited more aggressively than browsers.

Each environment’s `$CRAFT_CLOUD_SIGNING_KEY` [system variable](environments.md#variables) is used as a shared secret when generating and validating signed requests.

::: tip
For more details on RFC 9421 HTTP Message Signatures, see [httpsig.org](https://httpsig.org/).
:::

## Creating a Signed Request

External systems can generate valid signatures for a Craft Cloud environment, provided the corresponding `$CRAFT_CLOUD_SIGNING_KEY`.

Signatures are valid at the Craft Cloud gateway for a maximum of **five minutes**.
A signed request is not consumed (like a token URL is, in Craft), and they are not idempotent.

### From Node.js

This example uses [`http-message-sig`](https://www.npmjs.com/package/http-message-sig) to generate an RFC 9421-compliant signature:

```bash
npm install http-message-sig
```

Build and send a signed request like this:

```js
import crypto from "node:crypto";
import { signatureHeadersSync } from "http-message-sig";

const method = "POST";
const url = "https://my-env.some-domain.com/api";

const body = JSON.stringify({
  query: `{ entries(section: "blog") { title url } }`,
});

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer my-secret-gql-schema-token",
};

const created = new Date();

const signer = {
  keyid: "hmac",
  alg: "hmac-sha256",
  signSync(data) {
    return crypto
      .createHmac("sha256", process.env.CRAFT_CLOUD_SIGNING_KEY)
      .update(data)
      .digest();
  },
};

const signatureHeaders = signatureHeadersSync(
  { method, url, headers, body },
  {
    key: "sig",
    signer,
    components: ["@method", "@target-uri"],
    created,

    // Optional 60-second expiry. The maximum is five minutes.
    expires: new Date(created.getTime() + 60 * 1000),
  }
);

await fetch(url, {
  method,
  headers: {
    ...headers,
    ...signatureHeaders,
  },
  body,
});
```

::: tip
Requests signed using the `@target-uri` [component](https://www.rfc-editor.org/rfc/rfc9421.html#name-derived-components) are only valid when sent to a URL that matches _exactly_, including the scheme, hostname, path, and query string.
The example above satisfies this by using the same `url` variable for the signed request and the `fetch()` call.
:::

### From Grafana Cloud k6

This example uses [Grafana Cloud k6](https://grafana.com/docs/k6/latest/examples/) with native dependencies:

```js
import crypto from "k6/crypto";
import http from "k6/http";

const method = "POST";
const url = "https://my-env.some-domain.com/api";

const body = JSON.stringify({
  query: `{ entries(section: "blog") { title url } }`,
});

export default function () {
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 60;

  const signatureParams =
    `("@method" "@target-uri");created=${created};expires=${expires};keyid="hmac";alg="hmac-sha256"`;

  const signatureBase = [
    `"@method": ${method}`,
    `"@target-uri": ${url}`,
    `"@signature-params": ${signatureParams}`,
  ].join("\n");

  const signature = crypto.hmac(
    "sha256",
    __ENV.CRAFT_CLOUD_SIGNING_KEY,
    signatureBase,
    "base64"
  );

  http.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer my-secret-gql-schema-token",
      "Signature-Input": `sig=${signatureParams}`,
      Signature: `sig=:${signature}:`,
    },
  });
}
```

### From Craft

Any Craft project running on Cloud can sign requests.
This can be useful when making HTTP requests from a console command, queue job, or for communication between environments or projects.

```php
use Craft;

use craft\cloud\Module;
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

$response = Craft::createGuzzleClient()->send($signedRequest);
```

## Signature Verification

Craft Cloud automatically tries to validate signed requests, at the gateway.
If validation _fails_, normal bot- and rate-limiting rules are applied; if no policies are triggered, the request is forwarded to Craft like any other.

Once the request reaches your application, you are free to perform additional verification (like checking a separate shared secret).
