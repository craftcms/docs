---
description: Connect AI assistants and other MCP clients to your Craft project’s content and settings.
includesLlmOutput: true
---

# MCP <Since ver="5.12.0" feature="MCP servers" />

Craft can expose content and configuration to AI assistants and other clients through the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP).
MCP clients discover the _tools_, _resources_, and _prompts_ (collectively, _capabilities_) that a server offers, then call them on behalf of the person using the assistant.

<!-- more -->

Craft provides three MCP servers:

- **HTTP (Authenticated)** — Users sign in to Craft and authorize a client using [OAuth](oauth.md). The client then acts as that user, within their [permissions](user-management.md#permissions) and the [access level](#access-levels) they granted it. Any [active user](user-management.md#statuses) can connect, but the exposed capabilities will differ based on their permissions.
- **HTTP (Public)** — Anyone can connect without signing in, but they only get the capabilities and content an administrator has [approved](#public-server).
- **stdio** — The `mcp/serve` [console command](cli.md) opens a long-running session over [standard input and output](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio), acting as the specified user. This is useful for assistants running on the same machine as Craft.

Both HTTP servers are disabled by default.

::: tip
Plugins can add their own capabilities—see [Extending MCP](../extend/mcp.md).
:::

## Settings

Administrators can enable and configure the HTTP servers from <Journey path="Settings, MCP" />.
These settings are stored in [project config](project-config.md), so they can only be changed in environments where <config5:allowAdminChanges> is on.

The settings screen has two tabs:

- **Public** — Enable the public server, set its **Endpoint**, and approve the [capabilities and content](#public-server) it exposes.
- **Authenticated** — Enable the authenticated server and set its **Endpoint** and **Authorization Endpoint**.

[Endpoints](#endpoints) in both contexts are paths relative to your site’s base URL.
They can’t begin with the <config5:actionTrigger> or `.well-known`, and can’t conflict with existing [routes](routing.md).

### Endpoints

The authenticated server’s endpoints default to `/{cpTrigger}/mcp` and `/{cpTrigger}/mcp/auth` (i.e. `/admin/mcp` and `/admin/mcp/auth`).
If [public registration](user-management.md#public-registration-pro) is enabled or the <config5:cpTrigger> is empty, they default to `/mcp` and `/mcp/auth`, instead.
The public server’s endpoint defaults to `/mcp`.

Endpoints that begin with the control panel trigger (or any endpoint requested on a separate <config5:baseCpUrl> domain) are treated as control panel requests, so only users with the **Access the control panel** permission can use them.
The public server’s endpoint can’t be in the control panel.

The **Authorization Endpoint** always requires an access token, so MCP clients can discover how to sign in.
This is the URL you should give to clients that sign in with OAuth.

::: warning
The authenticated and public servers can _technically_ share an endpoint; Craft forwards requests that include an `Authorization` header to the authenticated server, and requests without one go to the public server.
However, this may prevent clients from discovering how to begin the OAuth handshake.
Use separate endpoints for the best compatibility.
:::

## Authenticated Server

To set up the authenticated server:

1. Generate the OAuth signing keys:

    ```bash
    php craft oauth/generate-keys
    ```

    See [OAuth](oauth.md#setup) for more about keys and deployment.
1. Enable the server under <Journey path="Settings, MCP, Authenticated" />.
1. Add the **Authorization Endpoint** URL (like `https://my-project.ddev.site/admin/mcp/auth`) to your MCP client.

The first time a client connects, it opens a browser window where you sign in to Craft using the normal login process (including [two-factor authentication](user-management.md#authentication)), then approve or deny its request on a consent screen.

Craft checks the user’s current account status and permissions on every request, so suspending a user or revoking a permission takes effect immediately. Users can review and revoke the apps they’ve authorized from <Journey path="My Account, Tokens" />, when that screen is [available](oauth.md#personal-access-tokens).

### Access Levels

When authorizing a client, the user chooses one of three access levels.
Each level includes the ones before it:

| Access | Scope | Grants |
| --- | --- | --- |
| **Read only** | `mcp:read` | Resources, prompts, and read-only tools. |
| **Read and write** | `mcp:write` | Also tools that create, change, or delete things. |
| **Full access** | `mcp:admin` | Also admin-only capabilities, such as changing settings. |

The consent screen preselects **Read only**, and only offers **Full access** to [admins](user-management.md#admin-accounts).
Access levels only narrow what a client can do—the user’s own permissions still apply.

If a client authorizes again while the user still has an active token for it, Craft skips the consent screen and keeps the access level the user chose before.
Clients can send `prompt=consent` to show the screen anyway.
See [OAuth](oauth.md#scopes-consent-and-token-lifetimes) for more on consent and token lifetimes.

## Public Server

The public server lets anyone use the capabilities and content you approve, without signing in.
Public callers have no Craft user identity.

Under <Journey path="Settings, MCP, Public" />, turn on **Enable the public MCP server**, set its **Endpoint**, and approve…

- **Capabilities:** each tool, resource, resource template, and prompt that unauthenticated clients may discover and call. Only capabilities that have been marked as safe for public use (in Craft’s source code) are listed.
- **Content:** the sites, sections, nested entry fields, volumes, user groups, and element types (like [addresses](../reference/element-types/addresses.md)) that approved capabilities may expose. Leaving a list empty exposes none of that content.
- **Element States:** whether public queries can include drafts (**Allow Drafts**), revisions (**Allow Revisions**), and elements that aren’t enabled (**Allow Inactive Elements**).

Categories, tags, and global sets aren’t available via MCP (but they can be [entrified](https://craftcms.com/blog/entrification)).

Craft provides two tools, out of the box:
- `craft-context-get` — Describes the content accessible to the client.
- `craft-query` — Runs a query against the available content. Public queries return 25 results by default, and at most 100.

::: warning
Approving a plugin-provided capability can expose data outside the content approvals above.
Plugins are responsible for restricting what their own public capabilities return.
:::

## `stdio` Server

The `mcp/serve` command runs an MCP server over `stdin`/`stdout`, acting as the user you pass to `--user` (an ID, username, or email):

```bash
php craft mcp/serve --user=admin
```

The user must be active, and not suspended or locked.
Configure your MCP client to launch this command (from your project’s root) as a local server.

::: danger
The `stdio` server isn’t restricted by OAuth access levels—it can do anything the selected user can.
It omits capabilities that only work over HTTP.
Restart the process after changing the user’s permissions, the [instructions](#configuration), or the content model outside of that session.
:::

## Connecting Clients

Opening an HTTP endpoint in a browser displays its URL along with setup instructions for common AI assistants, like Claude, Claude Code, Codex, Cursor, Gemini CLI, and VS Code. For example, you could add the authenticated server to Claude Code with:

```bash
claude mcp add --transport http my-project https://my-project.ddev.site/admin/mcp/auth
```

HTTP endpoints accept JSON-RPC messages via `POST`. Craft supports both the `initialize` handshake (used by protocol versions through `2025-11-25`) and the per-request metadata used by `2026-07-28`. Handshake clients must return the `Mcp-Session-Id` response header with subsequent requests, and can end their session with a `DELETE` request. Other `GET` requests receive a `405` response.

Handshake sessions are stored in Craft’s [cache](../reference/config/app.md#cache) and expire after an hour of inactivity. Clearing caches requires clients to initialize again.

::: warning
If you run Craft on multiple servers, use a shared cache backend or route each MCP session to the same server.
:::

## Capabilities

Authenticated and stdio clients can inspect and manage sites, sections, entry types, fields, field layouts, entries, drafts, revisions, structures, assets, volumes, users, addresses, user groups, permissions, routes, image transforms, plugins, and project config. They can also search content, run checks on the content model, and perform some maintenance tasks:

- **Caches and queue:** clear caches, and view, run, retry, or release [queue](queue.md) jobs. These require access to the corresponding [utility](control-panel.md#utilities), and are unavailable when it’s listed in <config5:disabledUtilities>.
- **System status:** check whether the system is live and, for admins, turn it on or off. Changing the status is unavailable when <config5:isSystemLive> is set, or when <config5:allowAdminChanges> is off.
- **Project config:** rebuild project config from the database, as the **Project Config** utility does. Requires an admin and writable project config.
- **Preferences:** read and change the user’s preferred language and formatting locale.

Craft only offers clients the capabilities available to them, based on the user’s permissions, <config5:allowAdminChanges>, and the token’s access level. Unavailable capabilities can’t be called directly, and operations on individual records still enforce element permissions.

Field settings and project config values whose keys look sensitive (per the `security` component’s `sensitiveKeywords`) are redacted, including environment variable references. Assets can only be created from HTTPS URLs—Craft rejects local paths, private network addresses, redirects, and files that exceed your upload limits.

::: tip
Clients learn how to work with Craft by calling the `info.get` tool, which returns instructions about the project, its content model, and installed plugins. You can add your own guidance to it with the `instructions` setting in `config/mcp.php`.
:::

## Configuration

Create `config/mcp.php` to customize the MCP servers:

```php
<?php

use craft\config\McpConfig;

return McpConfig::create()
    ->instructions('Follow the editorial style guide when changing article content.');
```

Or, using the array syntax:

```php
<?php

return [
    'instructions' => 'Follow the editorial style guide when changing article content.',
    'filters' => [],
];
```

`instructions`
:   Site-specific guidance appended to the instructions returned by the `info.get` tool.

`filters`
:   An array of Yii [action filter](https://www.yiiframework.com/doc/guide/2.0/en/structure-filters) definitions that are applied to authenticated MCP requests (like rate limiting).

These settings can also be set with environment variables prefixed with `CRAFT_MCP_`, like `CRAFT_MCP_INSTRUCTIONS`.

Signing keys, token lifetimes, and redirect restrictions are configured in [`config/oauth.php`](oauth.md#configuration).
