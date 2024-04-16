---
description: Ideas and inspiration for customizing Craft.
sidebarDepth: 2
---

# Topics

Craft is both a fully-featured content management system _and_ a powerful web application framework. Extensions allow you to build on top of its smart abstractions, or create completely new features that live alongside the main application.

This page collects some common extension vectors along that continuum.

::: tip
Pardon the mess! We just launched this page, and plan to collect more resources here as they are updated with the [generator](generator.md) in mind.

Questions? Feedback? Use the links at the bottom of any page to let us know what’s on your mind.
:::

## Monitoring and Changing Behavior

You can be notified when certain things happen within a Craft application by listening for **events** or registering **hooks**.

### Events

Events are emitted throughout Craft’s request-response and model life cycles, giving developers a chance to react to (or alter) system behavior. This is far and away the most common point of entry for extensions—if you’re looking for a way to familiarize yourself with Craft’s internals, this is it!

<See path="events.md" />

### Hooks

Hooks are similar to [events](#events), but designed specifically for manipulating the context or output of templates. In addition to hooks provided by Craft’s own [control panel templates](template-hooks.md#control-panel-template-hooks), plugins can fire their own hooks using the [`{% hook %}` tag](../reference/twig/tags.md#hook).

<See path="template-hooks.md" />

## Adding Features

While events enable a wide variety of customizations, some extensions will need to provide entirely new features.

### System Component Types

Craft’s most powerful features like elements and custom fields are built on interfaces and base classes that are also available to developers.

<See path="element-types.md" />
<See path="field-types.md" />
<See path="filesystem-types.md" />
<See path="widget-types.md" />
<See path="queue-jobs.md" />

### Miscellany

Other high-impact places to dive in.

<See path="utilities.md" />

## Working with Data

Getting data from users and processing it safely.

### Controllers + Routing

Learn about requests, routing, URL rules, responses, and Craft’s robust authorization and permissions systems.

<See path="controllers.md" />
<See path="user-permissions.md" />

### Models + Records

Extend built-in data types, define new ones, and consolidate logic.

<See path="behaviors.md" />
<See path="services.md" />
<See path="soft-deletes.md" />

### Caching

Sometimes, it can be expensive to repeatedly generate a dataset, or to block requests while waiting for a [third-party API](#using-external-services). Craft exposes a configurable [cache component](guide:caching-data) that can store temporary data in a consistent way:

```php
use Craft;

$params = [
    'productId' => 1234,
];

$key = 'my-plugin:' . md5(json_encode($params));

$value = Craft::$app->getCache()->getOrSet($key, function() {
    // Fetch remote data...

    return $data;
}, $duration);
```

Data returned from this method will be cached with `$key` for `$duration`—or, if `$key` was set within that duration, the data will be returned immediately.

::: tip
All database queries have a [cache()](yii2:yii\db\Query::cache()) method, as well.
:::

## Using External Services

Many plugins act as a bridge between Craft features and third-party services.

### Making HTTP Requests

Whenever you need to call a remote web service, use the built-in [Guzzle](http://docs.guzzlephp.org/en/latest/) factory:

```php
use Craft;

$client = Craft::createGuzzleClient([
    'base_uri' => 'https://api.acme.com/v1',
]);

$response = $client->post('/widgets', [
    'json' => [
        'style' => 'fancy',
    ],
]);
```

Creating HTTP clients this way ensures that all outgoing requests are configured the same way—Craft will apply project-specific settings from the [Guzzle config file](../config/README.md#guzzle), as well as a [global `httpProxy`](../config/general.md#httpproxy).

::: warning
Some third-party packages will use their own HTTP client. Whenever possible, provide the equivalent configuration to those adapters. Guzzle configuration (if any was provided) is available through the config service:

```php
// Guzzle config object:
$guzzleConfig = Craft::$app->getConfig()->getConfigFromFile('guzzle');

// HTTP proxy:
$proxyConfig = Craft::$app->getConfig()->getGeneral()->httpProxy;
```
:::

### Writing Files

Any time your application needs to generate a temporary artifact, you can write it to a file with <craft5:craft\helpers\FileHelper>:

```php
use Craft;
use craft\helpers\FileHelper;

$content = '# Todo List';

$filename = 'todos.md';
$tempDir = Craft::$app->getPath()->getTempPath();

$path = $tempDir . DIRECTORY_SEPARATOR . uniqid() . $filename;

FileHelper::writeToFile($path, $content);

// Pass $path back to another part of the application...
```

Notice that we’ve used <craft5:craft\services\Path::getTempPath()> to keep our files alongside other runtime data. This helps Craft clean up temporary data via the [Caches utility](../control-panel.md#utilities), or the [`clear-caches/temp-files` console command](../reference/cli.md#clear-caches-temp-files).

::: tip
[Logging](../logging.md) should always be done via Craft’s convenience methods, not written directly to disk.
:::

## The Control Panel

Start learning about how to create new views in the [control panel](../control-panel.md).

<See path="cp-section.md" />
