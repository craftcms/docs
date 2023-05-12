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

Hooks are similar to [events](#events), but designed specifically for manipulating the context or output of templates. In addition to hooks provided by Craft’s own [control panel templates](template-hooks.md#control-panel-template-hooks), plugins can fire their own hooks using the [`{% hook %}` tag](../dev/tags.twig#hook).

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

## The Control Panel

Start learning about how to create new views in the [control panel](../control-panel.md).

<See path="cp-section.md" />
