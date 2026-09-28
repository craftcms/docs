---
description: Diagnose failed requests to Craft Cloud.
pageClass: cloud-diagnostics
---

# Diagnostics

## Response Headers

- `cf-*`: Cloudflare
- `x-gateway-*`: Craft Cloud gateway
- All others: origin (Craft)

| Response Header | Description |
| --- | --- |
| `x-gateway-flow` | How Craft Cloud produced the response. For example, `/origin/fetch` reached Craft. |
| `x-gateway-http-signature` | [Request-signing](request-signing.md) result. `verified` succeeded; `unverified` was detected but failed validation. |
| `cf-ray` | Cloudflare request ID.<sup>1</sup> |
| `cf-cache-status` | Cloudflare [cache status](static-caching.md#troubleshooting).<sup>1</sup> |
| `x-gateway-cf-ray` | Cloudflare request ID.<sup>2</sup> |
| `x-gateway-cf-cache-status` | Cloudflare [cache status](static-caching.md#troubleshooting).<sup>2</sup> |

<sup>1</sup> With [Cloudflare O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) requests, the marked headers describe the customer zone.

<sup>2</sup> The marked headers describe the Craft Cloud zone and are only present with [Cloudflare O2O](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/) requests.

## Interpreting Failures

Status alone does not identify the response layer. Use it with the diagnostic
headers:

| Status | Response Headers | Interpretation |
| --- | --- | --- |
| `4xx/5xx` | `x-gateway-flow: /origin/fetch` | Returned by Craft; check application logs. |
| `400/403/413` | `x-gateway-flow: /origin/reject` | Detected invalid or malicious request. |
| `401` | `x-gateway-http-signature: unverified` | The signature was invalid or expired. |
| `404` | `x-gateway-flow: /` | Hostname did not match a Craft Cloud environment. |
| `429/503` | `Retry-After: 𝑛` | Automate retry, honoring `Retry-After`. |
| `500/502` | No `x-gateway-flow: /origin/fetch` | A gateway error occurred; contact support if it persists. |
| `504` | `x-gateway-flow: /origin/fetch/error` | The origin exceeded the [request duration limit](quotas.md#requests-responses). |
| `5xx` | No `x-gateway-flow` | The error occurred before the gateway, either in the `craft.cloud` zone or a parent Cloudflare zone. |
