---
description: Craft’s built-in OAuth authorization server lets apps access its APIs on behalf of your users.
includesLlmOutput: true
---

# OAuth <Since ver="5.12.0" feature="OAuth authorization server" />

Craft includes an OAuth 2 authorization server, which lets apps and AI assistants access Craft’s APIs on behalf of a user—without ever seeing their password.
The authenticated [MCP](mcp.md) server and the [GraphQL API](../development/graphql.md) both use it, and plugins can [protect their own APIs](../extend/mcp.md#oauth-resources) with it.

<!-- more -->

Each API is an OAuth **resource** with its own URL, scopes, and required permissions.
A token issued for one resource can’t be used with another.

Craft’s server supports…

- discovery metadata, so clients can find the endpoints they need;
- dynamic client registration, so clients can register themselves;
- the authorization code grant with [PKCE](https://oauth.net/2/pkce/) (`S256` only);
- refresh token rotation;

Only public clients are supported—there are no client secrets to manage.

## Setup

OAuth access tokens are signed with a key pair. Generate one with the `oauth/generate-keys` command:

```bash
php craft oauth/generate-keys
```

This writes `storage/oauth-private.key` and `storage/oauth-public.key` with restrictive permissions. Keep the private key out of your web root and version control. Craft won’t generate keys while handling a request.

If you run Craft on multiple servers, deploy the same keys to each one, or [configure](#configuration) them via environment variables.

Pass `--force` to replace existing keys:

```bash
php craft oauth/generate-keys --force
```

::: warning
Replacing keys invalidates all access tokens signed with the old key. Refresh tokens are encrypted with a key derived from your <config5:securityKey>, so they are not revoked when you only replace the signing keys.
:::

## Configuration

Create `config/oauth.php` to customize the authorization server:

```php
<?php

return [
    'privateKey' => '$OAUTH_PRIVATE_KEY',
    'publicKey' => '$OAUTH_PUBLIC_KEY',
    'accessTokenDuration' => 'PT1H',
    'refreshTokenDuration' => 'P30D',
    'authorizationCodeDuration' => 'PT10M',
    'redirectDomains' => ['https://client.example', 'http://localhost'],
    'customSchemes' => [],
];
```

`privateKey`, `publicKey`
:   PEM-encoded key contents or file paths, including [aliases](../configure.md#aliases) and [environment variable](../configure.md#env) references. Omit them to use the files in `storage/` created by `oauth/generate-keys`.

`accessTokenDuration`
:   How long access tokens are valid, as a [`DateInterval` duration](https://www.php.net/manual/en/dateinterval.construct.php). Defaults to one hour (`PT1H`).

`refreshTokenDuration`
:   How long refresh tokens are valid. Defaults to 30 days (`P30D`).

`authorizationCodeDuration`
:   How long authorization codes are valid. Defaults to ten minutes (`PT10M`).

`redirectDomains`
:   Origins (with optional path prefixes) that clients may register as redirect URIs. Defaults to `['*']`, which permits any HTTP or HTTPS redirect. HTTP loopback origins (like `http://localhost`) allow any port, for local clients.

`customSchemes`
:   Additional URI schemes allowed in redirect URIs (like those used by desktop apps). These URIs must still include a host.

`resources`
:   Additional [resource definitions](../extend/mcp.md#oauth-resources), keyed by resource ID.

Settings that use scalar values (like a string or integer) can also be set with environment variables prefixed with `CRAFT_OAUTH_`, like `CRAFT_OAUTH_ACCESS_TOKEN_DURATION`.

## Authorization Flow

Most clients (like AI assistants) handle the flow on their own—all you need to do is give them the URL of the API. Here’s what happens behind the scenes:

1. The client fetches the [resource](#endpoints)’s discovery metadata.
1. The client registers itself and receives a `client_id`. Registering doesn’t grant any access.
1. The client sends the user to Craft’s authorization endpoint with the scopes it wants and an `S256` [PKCE code challenge](https://oauth.net/2/pkce/).
1. The user signs in to Craft (if they aren’t already) and approves or denies the request on a [consent](#consent) screen.
1. The user is redirected to the client application with a temporary _authorization code_.
1. The client exchanges that authorization code for an _access token_ and a _refresh token_.
1. The client sends the access token in an `Authorization: Bearer …` header with each API request, and uses the refresh token to get a new one when it expires.

Redirect URIs must exactly match those the client registered.

### Endpoints

Each resource has its own registration, authorization, and token endpoints in the control panel. For a resource with the ID `mcp` and the default <config5:cpTrigger>, they are:

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/admin/oauth/mcp/register` | `POST` | Registers a client, given a JSON body with `redirect_uris` and an optional `client_name`. |
| `/admin/oauth/mcp/authorize` | `GET` | Begins an authorization code request. |
| `/admin/oauth/mcp/token` | `POST` | Exchanges an authorization code or refresh token for new tokens. |

Clients should find these URLs via discovery, rather than hard-coding them.

### Discovery

Craft automatically serves metadata for each resource and its authorization server from `.well-known` URLs. The full resource or issuer path comes after the well-known prefix. For MCP’s authorization endpoint at `https://my-project.ddev.site/mcp/auth`, they are:

```
https://my-project.ddev.site/.well-known/oauth-protected-resource/mcp/auth
https://my-project.ddev.site/.well-known/oauth-authorization-server/admin/oauth/mcp
```

::: tip
If Craft is installed in a subdirectory, configure your web server to forward requests for `/.well-known/oauth-protected-resource/…` and `/.well-known/oauth-authorization-server/…` at the root of the domain to Craft.
:::

When a request is missing a valid access token, protected APIs respond with a `401` status and a `WWW-Authenticate` header that points to the resource’s metadata.

Discovery, registration, and token endpoints stay available while the system is offline (see <config5:isSystemLive>), so clients can refresh their tokens. Authorizing a client still requires a user who can access the control panel while the system is offline.

## Scopes, Consent, and Token Lifetimes

### Consent

When a client requests authorization, Craft shows the user a consent screen listing the client, the access it’s asking for, and where they’ll be redirected. The user can **Authorize** or **Deny** the request. Craft only grants the scopes the client requested—and only those the user is allowed to grant.

Some resources (like MCP and GraphQL) offer **access levels**, where each level includes the ones before it. The user picks one level on the consent screen, which preselects the narrowest. Some levels may only be offered to certain users—for example, MCP only offers **Full access** to admins.

Craft reuses consent while the same user and client have unexpired, unrevoked access tokens that cover the requested scopes, so the user isn’t asked again each time a client reconnects. Requesting a scope the user hasn’t granted requires consent again. Clients can also send…

- `prompt=consent` to show the consent screen anyway;
- `prompt=login` to require the user to log in again;
- `prompt=none` to get an error instead of showing the login or consent screen;

### Token Lifetimes

Access tokens, refresh tokens, and authorization codes expire according to the durations in [`config/oauth.php`](#configuration).

Each time a client uses a refresh token, Craft rotates both tokens: it issues a new access token and refresh token, and revokes the old ones. A refresh can narrow the token’s scopes, but not add new ones.

Scopes never grant a user additional permissions. Tokens stop working as soon as their user becomes inactive, suspended, or locked, or loses a permission the resource requires.

## Personal Access Tokens

Apps and scripts that can’t complete the OAuth flow in a browser can use a _personal access token_, instead.
Users create these from <Journey path="My Account, Tokens" /> in the control panel:

1. Click **New token** (you may be asked to verify your identity, to start an [elevated session](user-management.md#elevated-sessions));
1. Enter a **Name** describing what the token will be used for;
1. Choose the **Scopes** to grant, from any of the available APIs;
1. Choose an **Expiration**: 7 days, 30 days, 90 days, or 1 year;

Copy the token when it’s displayed—you won’t be able to see it again.
Send it with API requests in an `Authorization: Bearer …` header, just like an OAuth access token.

Clicking a token shows its scopes and lets you rename it.
A token’s scopes can’t be changed after it’s created.
The same screen lists the apps you’ve authorized via OAuth. Revoking a personal token revokes it for every API; revoking an app revokes its access and refresh tokens.

The **Tokens** screen is only shown when at least one API offers scopes the user can grant.

Craft offers GraphQL scopes when the GraphQL API is enabled; MCP clients authorize themselves, so MCP doesn’t offer any. Plugins can [offer their own](../extend/mcp.md#personal-access-token-scopes).

## GraphQL

When the [GraphQL API](../development/graphql.md) is enabled, Craft registers a `graphql` resource, at the primary site’s `actions/graphql/api` endpoint. It has two access levels: `graphql:read` tokens can only run queries, and `graphql:write` tokens can also run mutations. Any active user may authorize a client.

Requests authenticated with an OAuth access token or personal access token act as that user, using a schema built from the content and actions they have permission to access. Results are limited to what the user can view. [Schema tokens](../development/graphql.md#generate-tokens) continue to work as before.
