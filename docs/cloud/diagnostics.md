---
description: Safely collect useful details when diagnosing failed requests to Craft Cloud.
---

# Diagnostics

When a request to your Craft Cloud environment fails, log the following
response details before handling the error:

- HTTP status code
- `x-gateway-flow`, if present
- `x-gateway-http-signature`, if present
- `Retry-After`, if present

The `x-gateway-flow` header identifies how Craft Cloud produced the response.
For example, `/origin/fetch` means the gateway fetched the environment’s
origin, while `/origin/reject` means it rejected the request before contacting
the origin.

The `x-gateway-http-signature` header reports whether Craft Cloud detected and
validated [request signing](request-signing.md). A value of `verified` means
validation succeeded; `unverified` means signing was detected but validation
failed.

The `Retry-After` header indicates how long the client should wait before
retrying. Preserve the returned value in logs and honor it when scheduling a
retry.

Log these fields individually from trusted server-side code. Never dump
complete request headers, environment variables, or credentials. In
particular, never log the Craft Cloud signing key, GraphQL tokens, or other
secrets.
