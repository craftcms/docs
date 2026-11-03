---
description: Add MCP capabilities, protect your own APIs with OAuth, and offer personal access token scopes.
includesLlmOutput: true
---

# Extending MCP <Since ver="5.12.0" feature="MCP and OAuth extension points" />

Plugins and modules can add their own tools, resources, and prompts to Craft’s [MCP servers](../system/mcp.md), adjust how Craft describes content to MCP clients, and protect their own APIs with Craft’s [OAuth server](../system/oauth.md).

Craft’s MCP implementation is built on the official [MCP PHP SDK](https://github.com/modelcontextprotocol/php-sdk) (`mcp/sdk`).

## Capabilities

MCP capabilities are public methods on a class, identified by the SDK’s `McpTool`, `McpResource`, `McpResourceTemplate`, and `McpPrompt` attributes:

```php
<?php

namespace mynamespace\mcp;

use Craft;
use craft\mcp\attributes\RequiresPermission;
use Mcp\Capability\Attribute\McpTool;

class MyCapabilities
{
    #[McpTool(name: 'my-plugin.site-name', description: 'Returns the system name.')]
    #[RequiresPermission('accessCp')]
    public function siteName(): string
    {
        return Craft::$app->getSystemName();
    }
}
```

Register the class from your plugin or module’s `init()` method:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\services\Mcp;
use mynamespace\mcp\MyCapabilities;
use yii\base\Event;

Event::on(
    Mcp::class,
    Mcp::EVENT_REGISTER_CAPABILITY_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyCapabilities::class;
    }
);
```

Craft collects registered classes the first time capabilities are discovered—it does not scan your plugin’s directories. Prefix capability names with your plugin’s handle; duplicate names are rejected.

### Access Control

Craft provides method attributes (in the `craft\mcp\attributes` namespace) that control who can discover and call a capability:

| Attribute | Effect |
| --- | --- |
| `RequiresPermission('…')` | The user must have the given [permission](user-permissions.md). Repeatable. |
| `RequiresAdmin` | The user must be an admin, and the token must have the `mcp:admin` scope. |
| `RequiresAdminChanges` | The user must be an admin, <config5:allowAdminChanges> must be on, and the token must have the `mcp:admin` scope. |
| `RequiresHttp` | Only available via the HTTP servers (omitted from the stdio server). |
| `PublicMcp` | Makes the capability eligible for approval on the [public server](../system/mcp.md#public-server). |

Set `readOnlyHint: true` in a tool’s annotations when it doesn’t change anything. Tools without it require the `mcp:write` scope.

::: warning
Approving a `PublicMcp` capability doesn’t automatically restrict it to the content approved under <Journey path="Settings, MCP, Public" />. Your public capabilities must enforce their own restrictions.
:::

To hide a capability from the current user on the authenticated and stdio servers, listen to <craft5:craft\services\Mcp::EVENT_DISCOVERING_CAPABILITY> and set `$event->allowed` to `false`. The event (a `craft\mcp\events\DiscoveringCapability`) only fires for capabilities that already passed Craft’s permission and scope checks, and it can’t hide capabilities approved for the public server.

## Content

### Custom Fields

Field types can describe the values they accept by implementing <craft5:craft\base\InputSchemaFieldInterface>, which requires a `getInputSchema()` method that returns a JSON schema. MCP clients use this to write valid values to your field:

```php
use craft\base\Field;
use craft\base\InputSchemaFieldInterface;

class MyField extends Field implements InputSchemaFieldInterface
{
    public function getInputSchema(): array
    {
        return [
            'type' => 'string',
            'enum' => ['small', 'medium', 'large'],
        ];
    }

    // ...
}
```

### Element Serialization

Listen to `craft\mcp\serializers\ElementSerializer::EVENT_SERIALIZING` to change the data returned for an element. The `craft\mcp\events\ElementSerializing` event has `element`, `serializedData`, and `public` properties:

```php
use craft\mcp\events\ElementSerializing;
use craft\mcp\serializers\ElementSerializer;
use yii\base\Event;

Event::on(
    ElementSerializer::class,
    ElementSerializer::EVENT_SERIALIZING,
    function(ElementSerializing $event) {
        // Don’t add private data to public responses!
        if ($event->public) {
            return;
        }

        $event->serializedData['myPluginScore'] = MyPlugin::getInstance()->scores->get($event->element);
    }
);
```

### Element Adapters

Element types are exposed to the `elements.*` tools by _adapters_ implementing `craft\mcp\elements\ElementAdapter` (you can extend `craft\mcp\elements\BaseElementAdapter`). Register one with the adapter registry:

```php
Craft::$app->get('mcp')->getElementAdapterRegistry()->register(MyElementAdapter::class);
```

…or via the registry’s `EVENT_REGISTER_ADAPTERS` event:

```php
use craft\events\RegisterComponentTypesEvent;
use craft\mcp\elements\ElementAdapterRegistry;
use yii\base\Event;

Event::on(
    ElementAdapterRegistry::class,
    ElementAdapterRegistry::EVENT_REGISTER_ADAPTERS,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = MyElementAdapter::class;
    }
);
```

### Content Model Checks

MCP clients can run checks that audit the content model. Add your own by implementing `craft\mcp\contentmodel\Check` and registering it:

```php
Craft::$app->get('mcp')->getCheckRegistry()->register(MyCheck::class);
```

## Instructions

Craft sends MCP clients instructions about how to work with the project. Plugins can add their own guidance by appending strings to the `instructions` array on two events:

- `craft\mcp\AdminInstructions::EVENT_COLLECT_INSTRUCTIONS` (`craft\mcp\events\CollectingAdminInstructions`) adds to the full instructions returned by the `info.get` tool.
- `craft\mcp\AdminInstructions::EVENT_COLLECT_SERVER_INSTRUCTIONS` (`craft\mcp\events\CollectingServerInstructions`) adds to the short instructions the authenticated and stdio servers send every client when it connects. Unlike `info.get`, users without control panel access receive these, so keep them brief.

```php
use craft\mcp\AdminInstructions;
use craft\mcp\events\CollectingAdminInstructions;
use yii\base\Event;

Event::on(
    AdminInstructions::class,
    AdminInstructions::EVENT_COLLECT_INSTRUCTIONS,
    function(CollectingAdminInstructions $event) {
        $event->instructions[] = 'Use my-plugin.* tools to manage product reviews.';
    }
);
```

## OAuth Resources

Your plugin can protect its own API with Craft’s [OAuth server](../system/oauth.md) by registering an OAuth _resource_. Craft provides the discovery, registration, authorization, consent, and token endpoints; you provide the API itself.

Register resources from your plugin or module’s `init()` method via <craft5:craft\services\OAuth::EVENT_REGISTER_RESOURCES>:

```php
use craft\events\RegisterOAuthResourcesEvent;
use craft\helpers\UrlHelper;
use craft\services\OAuth;
use yii\base\Event;

Event::on(
    OAuth::class,
    OAuth::EVENT_REGISTER_RESOURCES,
    function(RegisterOAuthResourcesEvent $event) {
        $event->resources['my-plugin-api'] = [
            'scopes' => [
                'my-plugin-api:read' => 'Read content through My Plugin.',
                'my-plugin-api:write' => 'Create and change content through My Plugin.',
            ],
            'defaultScopes' => ['my-plugin-api:read'],
            'permissions' => ['myPlugin:useApi'],
            'resourceUrl' => fn() => UrlHelper::siteUrl('api/my-plugin'),
            'consentDescription' => 'This client would like to access My Plugin’s API as you.',
        ];
    }
);
```

The `resources` map is keyed by resource ID (1–64 letters, numbers, underscores, or hyphens), and accepts configuration arrays or `craft\oauth\Resource` objects. It already contains Craft’s own resources (like `mcp`) and any defined under `resources` in [`config/oauth.php`](../system/oauth.md#configuration)—don’t overwrite resources you didn’t register.

| Property | Description |
| --- | --- |
| `scopes` | Map of scope IDs to descriptions shown on the consent screen. Scope IDs must be unique across all resources, and can’t contain spaces, quotes, backslashes, or non-ASCII characters. Prefix them with your resource ID. |
| `defaultScopes` | Scopes to use when an authorization request doesn’t include any. |
| `scopeLevels` | Scopes that form access levels, from narrowest to broadest. Each level includes the ones before it, and users choose one on the consent screen. |
| `scopeLabels` | Short labels for each access level, shown on the consent screen. |
| `userScopes` | A closure (`function(User $user, array $scopes): array`) that returns which of the given scopes a user may grant. |
| `permissions` | Permissions the user must have to authorize and use the resource. |
| `resourceUrl` | The canonical absolute URL of the API, or a closure that returns it. Each resource needs a distinct URL path. |
| `consentDescription` | An explanation shown above the requested scopes on the consent screen. |

Registering a resource does not create a route or controller for your API. Include `accessCp` in `permissions` if your API requires control panel access. Otherwise, users sign in via the front-end <config5:loginPath> during authorization, which must implement Craft’s normal [login flow](../system/user-management.md#front-end-pro) and return the user to the authorization request.

In a multi-site project, generate `resourceUrl` for a specific site (or use a fixed URL) so it doesn’t vary with the current site.

### Protecting a Controller

Authenticate requests to your API with <craft5:craft\services\OAuth::authenticate()>, passing a PSR-7 request, your resource ID, and the scopes the action requires. It returns the authorized user, or throws a `League\OAuth2\Server\Exception\OAuthServerException`:

```php
namespace mynamespace\controllers;

use Craft;
use craft\web\Controller;
use GuzzleHttp\Psr7\ServerRequest;
use League\OAuth2\Server\Exception\OAuthServerException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\Response;

class ApiController extends Controller
{
    protected array|bool|int $allowAnonymous = true;

    public function actionIndex(): Response
    {
        if (!$this->request->getIsGet()) {
            throw new MethodNotAllowedHttpException('GET request required.');
        }

        $oauth = Craft::$app->getOAuth();

        try {
            $user = $oauth->authenticate(
                ServerRequest::fromGlobals(),
                'my-plugin-api',
                ['my-plugin-api:read'],
            );
        } catch (OAuthServerException $e) {
            $this->response->setStatusCode(401);
            $this->response->getHeaders()->set(
                'WWW-Authenticate',
                sprintf('Bearer resource_metadata="%s"', $oauth->resourceMetadataUrl('my-plugin-api')),
            );

            return $this->asJson(['error' => 'invalid_token']);
        }

        return $this->asJson(['userId' => $user->id]);
    }
}
```

`authenticate()` checks the token’s signature, expiry, revocation, resource, and scopes, as well as the user’s current status and the resource’s `permissions`. Omitting the third argument accepts any valid token for the resource.

The returned user is _not_ logged in. Use it to check permissions for the records and operations involved. Scopes only limit what a client can do—they never grant a user additional permissions, so a write action should both require your write scope _and_ check the user’s permissions.

Actions that authenticate exclusively with bearer tokens can disable CSRF validation (via `$enableCsrfValidation` or `beforeAction()`), but should require the appropriate HTTP method. Keep CSRF validation for actions that accept cookie-based sessions.

Use `$oauth->url('register', 'my-plugin-api')` (or `authorize`, `token`) to generate endpoint URLs. Craft serves [discovery metadata](../system/oauth.md#discovery) for every resource automatically; if your API lives on another origin, serve the URL returned by `$oauth->resourceMetadataUrl()` there, using `$oauth->protectedResourceMetadata()` for the response body.

## Personal Access Token Scopes

To let users grant your resource’s scopes to [personal access tokens](../system/oauth.md#personal-access-tokens), register a scope group with <craft5:craft\services\PersonalAccessTokens::registerScopeGroup()>. The factory returns a `craft\oauth\ScopeGroup`, or `null` if the group isn’t currently available:

```php
use craft\elements\User;
use craft\oauth\ScopeGroup;

Craft::$app->getPersonalAccessTokens()->registerScopeGroup('my-plugin', fn() => new ScopeGroup(
    handle: 'my-plugin',
    label: 'My Plugin',
    scopes: ['my-plugin-api:read' => 'Read My Plugin’s data'],
    userScopes: fn(User $user, array $scopes) => $user->can('myPlugin:useApi') ? $scopes : [],
));
```

The scopes must be defined by a registered OAuth resource. A personal access token can include scopes from multiple resources; `authenticate()` only considers your resource’s scopes.
