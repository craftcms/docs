---
description: Filesystems are the foundation of Craft’s flexible asset management tools.
---

# Filesystem Types

In Craft 4, asset storage has been split into two concepts:

- **Filesystems** establish relationships between Craft and storage media, like the local disk or a storage bucket.
- **Volumes** organize assets into sources that make sense for a site’s content model, define fields available to assets, and bind those sources to filesystems.

What would have been a volume type in Craft 3 is now a filesystem type.

## Filesystem Class

Use the [generator] to create a filesystem class and register it with Craft:

<Generator component="filesystem-type" plugin="my-plugin" />

If you are inclined to implement the filesystem type from scratch, extend <craft5:craft\base\Fs>. There are a number of first-party examples to look at, as well:

- [Amazon AWS S3](repo:craftcms/aws-s3)
- [Google Cloud Storage](repo:craftcms/google-cloud )
- [Azure Blob Storage](repo:craftcms/azure-blob)

Many more filesystem types are available in the [Plugin Store](https://plugins.craftcms.com/categories/assets?craft4).

## Registering your Filesystem Type

Once you have created your filesystem class, you must register it with the `Fs` service so Craft will know about it when populating the list of available filesystem types:

```php
<?php
namespace mynamespace;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fs;
use mynamespace\fs\MyFs;
use yii\base\Event;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(
            Fs::class,
            Fs::EVENT_REGISTER_FILESYSTEM_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MyFs::class;
            }
        );

        // ...
    }

    // ...
}
```

The generator takes care of this for you!

## Implementation

Filesystems are complex components, and their implementation is almost entirely dependent on the storage medium they target. Consider reviewing <craft5:craft\base\FsInterface>, as well as the built-in [Local](craft5:craft\fs\Local) filesystem for some ideas about their responsibilities.

### Flysystem

If you are targeting a popular storage service, you may be able to extend [`craft\flysystem\base\FlysystemFs`](repo:craftcms/flysystem), and connect an existing [Flysystem](repo:thephpleague/flysystem) adapter.

Should that support exist, you can focus on exposing the adapter’s parameters as [settings](#settings) in a Craft-native way.

## Settings

A filesystem class is responsible for declaring configurable attributes, validating and normalizing input, and mapping those settings to its underlying adapter (when using [Flysystem](#flysystem)), or using them in the class itself as part of authorizing or managing file operations.

Users will be presented with the output of your class’s `getSettingsHtml()` method when configuring a new or existing filesystem.

::: tip
Use [auto-suggest inputs](environmental-settings.md#autosuggest-inputs) to make entry of environment variables and aliases easier on your users.
:::

Craft will take care of assigning settings fields into your filesystem class prior to validating or saving it, as long as your inputs’ `name`s match up with filesystem class properties. The entire return value from `getSettingsHtml()` is namespaced to avoid collisions with other filesystem type properties, and settings common to all filesystems (like their name and handle) are merged automatically.

Filesystems are stored in [project config](project-config.md). Craft takes care of packing your class’s public properties into a serializable configuration object by virtue of extending from <craft5:craft\base\SavableComponent> and <craft5:craft\base\ConfigurableComponent>.
