# The Adapter

To reduce the friction for plugin developers (and other early-adopters, in turn), we’ve created a sophisticated compatibility layer that translates legacy API calls to the new Laravel app.

The first step to getting started with your port or compatibility release is requiring the adapter package:

```bash
composer require craftcms/yii2-adapter
```

Keep it as a dependency of your package as long as _you_ actually need it; don’t assume the project will include it!

::: tip
You must address _all_ preexisting deprecation warnings (from 5.x) for the adapter to work.
:::

The adapter package is *not* just a copy of the Craft 5.x application; if you go source-diving, you’ll find that most methods have been reduced to wrappers around the new Laravel application’s APIs.
When possible, we’ve actually extended the _new_ classes and backfilled any methods, properties, and constants that were removed, internally.

We have also added `@deprecated` tags and `#[Deprecated]` attributes to methods and classes that point to suitable replacements, and deprecation errors when old code paths are reached.

::: warning
At this point, _most plugins will be fully compatible with Craft 6.x_.

The rest of this section describes how the adapter works, and how you would go about writing a compatibility layer of your own.
Broadly speaking, this will _not_ be necessary, and you can safely continue from the [required changes](upgrade.md) page.
Consider returning here when your plugin has been fully ported!
:::

## Legacy Support

You are not obligated to provide legacy API support—especially if your plugin is not extensible by other plugins (or from individual projects).

The most common use case for this section is apt to be plugins that store fully-qualified class names in the database or project config.
As an example, a plugin that lets administrators configure notifications and stores their `type` in the database (corresponding directly to a class) should at least move the class into your new namespace and map the old name using PHP’s `class_alias()`.

While you can solve this in part with a migration that substitutes the old classes, there may be a window of time when the app expects those old classes to exist _before_ the migration can run.

::: tip
If you _do_ end up with any kind of compatibility layer, `composer.json` must include your new *and* old `autoload.psr-4` namespaces.
:::

### Your own adapter

Due to its size, Craft’s adapter lives in an external package.
It also results in all of Yii being pulled in as a dependency, which should *not* be necessary for most plugins: your goal should be to have your entire plugin *and* its own compatibility layer (if one is necessary at all) running natively in the new Laravel environment.

Your adapter’s primary function is to map existing projects’ lingering references to old classes (and class members) to their new counterparts.
Here’s an idea for the kinds of changes to expect, based on our first-party plugins:

1. Add `@deprecated` tags and move existing classes into a new `legacy/` auto-loading root. The *namespace* for legacy code should stay the same, but the *root* must be updated in `composer.json`.
2. Add your new namespace to the auto-loading configuration in `composer.json` (say, `MyOrg\\MyPlugin\\`), pointing to `src/`.
3. Create classes in `src/` using the new namespace, and gradually translate implementations. That translation process will involve reviewing the rest of the topics in the migration guide, and may come in a few different forms:
    - Delete and alias completely compatible classes to make them available in your old namespace:
        
        ```php
        // We’re in the old namespace!
        namespace myorg\pluginname\base;
        
        // (Optional) Keep original class definition inside conditional so it can still be picked up by IDEs:
        if (false) {
            /**
             * @deprecated 2.0.0 {@see \MyOrg\PluginName\Contracts\SomeInterface}
             */
            interface SomeInterface
            {}
        }

        // Declare alias to new class:
        class_alias(\MyOrg\PluginName\Contracts\SomeInterface::class, SomeInterface::class))
        ```

    - For classes with shallow inheritance (in particular, those whose parents all belong to your plugin or an external dependency other than Craft or Yii), you can instead move the implementation into the new namespace and `extend` it in the old. (See: `craft\auth\methods\RecoveryCodes`)
    - For classes that have been split up, restructured, or are otherwise incompatible, you can keep parts or whole legacy classes around. Whenever feasible, log deprecation before calling your new API:

        ```php
        namespace myorg\pluginname\services;

        use MyOrg\PluginName\Shipping\Actions\ConfirmSignature;
        use MyOrg\PluginName\Models\Delivery;

        class Shipping
        {
            public function confirmSignature(Delivery $delivery, Asset $proof): void
            {
                \CraftCms\Cms\Support\Facades\Deprecator::log(__METHOD__, 'myorg\pluginname\services\Shipping::confirmSignature() is deprecated. Dispatch the MyOrg\PluginName\Shipping\Actions\ConfirmSignature action, instead.');

                // Supposing we implemented this as a job or event
                ConfirmSignature::dispatch($delivery, $proof);
            }
        }
        ```

Here’s an example of a plugin class that had previously mounted “services” an exposed them via getters:

```php
namespace myorg\myplugin;

use CraftCms\Cms\Support\Facades\Deprecator;

class Analytics extends \MyOrg\MyPlugin\Analytics
{
    // ...

    public function getReports(): Reports
    {
        Deprecator::log(__METHOD__, 'myorg\myplugin\Analytics::getReports() is deprecated. Get an instance of MyOrg\MyPlugin\Analytics\Reports\Manager using the Laravel service container, instead.');

        return app(MyOrg\MyPlugin\Analytics\Reports\Manager::class);
    }
}
```

The legacy events system belonged almost entirely to Yii, so you will not be able to proxy events without the adapter.
If this continuity is important to you and downstream developers, you can either require the adapter or provide clear upgrade instructions to reduce their workload.

See `craft\elements\User` for an example of a class that forwards new events to Yii. We elected to group classes’ proxy handlers in a static `registerEvents()` method, which we call from a central location: `CraftCms\Yii2Adapter\Event\EventCompatibility::boot()`
