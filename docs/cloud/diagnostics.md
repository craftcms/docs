---
description: Safely collect useful details when diagnosing failed requests to Craft Cloud.
---

# Diagnostics

## Response Headers

- `cf-*` headers come from Cloudflare.
- `x-gateway-*` headers are added by the Craft Cloud gateway.
- All other headers are returned by the origin (Craft).

| Response Header | Description |
| --- | --- |
| <code style="white-space: nowrap;">x-gateway-flow</code> | Identifies how Craft Cloud produced the response. `/origin/fetch` means the gateway fetched the environment’s origin, while `/origin/reject` means it rejected the request before contacting the origin. |
| <code style="white-space: nowrap;">x-gateway-http-signature</code> | Reports whether Craft Cloud detected and validated [request signing](request-signing.md). `verified` means validation succeeded; `unverified` means signing was detected but validation failed. |
| <code style="white-space: nowrap;">cf-ray</code> | Identifies the request in Cloudflare. For [Cloudflare O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/), this is the customer zone Ray ID. |
| <code style="white-space: nowrap;">cf-cache-status</code> | Describes how Cloudflare handled the response in the cache. For Cloudflare O2O, this is the customer zone cache status. See [Troubleshooting Static Caching](static-caching.md#troubleshooting) for common values. |
| <code style="white-space: nowrap;">x-gateway-cf-ray</code> | For Cloudflare O2O, the Ray ID for Craft Cloud’s SaaS provider zone. |
| <code style="white-space: nowrap;">x-gateway-cf-cache-status</code> | For Cloudflare O2O, the cache status for Craft Cloud’s SaaS provider zone. |

## Interpreting Failures

A status code describes the outcome, but not which layer produced it. Combine
it with `x-gateway-flow` and the other diagnostic headers:

| Status | Response Headers | Interpretation |
| --- | --- | --- |
| `4xx/5xx` | `x-gateway-flow: /origin/fetch` | Your application returned the response. Inspect its logs and error handling. |
| `400` | `x-gateway-flow: /origin/reject` | The request body failed gateway validation. Fix the request rather than retrying it unchanged. |
| `401` | `x-gateway-http-signature: unverified` | A signature-protected gateway endpoint rejected an invalid or expired signature. Check the signing key, method, target URL, timestamp, and expiry before signing again. |
| `403` | `x-gateway-flow: /origin/reject` | A gateway request policy blocked the request before it reached your application. Do not retry it unchanged. |
| `404` | `x-gateway-flow: /` | The gateway could not match the hostname to a Craft Cloud environment. Check the requested hostname. |
| `413` | `x-gateway-flow: /origin/reject` | The request body was too large for the origin request path. Reduce its size. |
| `429` | `x-gateway-flow: /origin/reject` and `Retry-After` | The gateway rate limited the request before it reached your application. Honor `Retry-After`. A `verified` signature confirms signing worked, but does not bypass shared capacity limits. |
| `429` | `x-gateway-flow: /origin/fetch` | Your application returned the rate limit. Honor its `Retry-After` header, if present, and inspect application-level limits. |
| `500` | `x-gateway-flow` ending in `/error` | The gateway encountered an internal error. Retry only safe requests, and contact support if it persists. |
| `502` | `x-gateway-flow: /origin/fetch/error` | The gateway could not get a usable response from the origin after a connection or platform error. Contact support if it persists. |
| `503` | `x-gateway-flow: /origin/fetch/error` and `Retry-After` | Origin compute was temporarily throttled. Honor `Retry-After` before retrying a safe request. |
| `504` | `x-gateway-flow: /origin/fetch/error` | Origin work exceeded the [request duration limit](quotas.md#requests-responses). Reduce the work performed during the request. |
| `5xx` | No `x-gateway-flow` | The failure may have occurred before the request reached the gateway. Preserve the Ray IDs and `Retry-After`, if present, when contacting support. |
