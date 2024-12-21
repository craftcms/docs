---
description: Utilities are special, non-content pages in the control panel, that provide access to back-office features or debugging data.
---

# Utilities

Plugins can provide new utilities for the [control panel](../control-panel.md)’s **Utilities** section by creating a class that implements <craft4:craft\base\UtilityInterface> or extends <craft4:craft\base\Utility>. A utility is typically used to surface information and controls for administrative features that aren’t tied to specific [elements](../elements.md). Each registered utility gets its own [permissions](#permissions).

## Utility Class

Scaffold a utility with the [generator](generator.md):

<Generator component="utility" plugin="my-plugin" />

Answer the prompts, and generator will create the required class and register it via the appropriate [events](events.md).

Alternatively, extending <craft4:craft\base\Utility> will provide all the non-essential methods—but you must still define those that identify your utility:

```php
namespace mynamespace;

use Craft;
use craft\base\Utility;

class MyUtility extends Utility
{
    public static function displayName(): string
    {
        return Craft::t('my-plugin', 'My Utility');
    }

    public static function id(): string
    {
        return 'my-utility';
    }

    public static function iconPath(): ?string
    {
        return Craft::getAlias('@my-plugin/icon.svg');
    }

    public static function contentHtml(): string
    {
        $view = Craft::$app->getView();

        return $view->renderTemplate('_utilities/my-utility.twig');
    }
}
```

This utility would be accessible to any user with the correct [permission](#permissions) at `/admin/utilities/my-utility` (or whatever the site’s <config4:cpTrigger> is).

::: tip
Refer to Craft’s own utility classes (located in `vendor/craftcms/cms/src/utilities/`, or the `craft\utilities` namespace) for more complete examples.
:::

### HTML

If your utility relies on any JavaScript or CSS, be sure and register the relevant [asset bundles](asset-bundles.md) in `contentHtml()`.

You may also implement static `toolbarHtml()` and `footerHtml()` methods to inject actions and metadata.

## Permissions

Each utility automatically gets its own [permission](user-permissions.md). Craft checks these permissions before displaying a utility in the sidebar, and when the utility’s URL is requested.

However, those permissions do _not_ have any bearing on what functionality might be accessible to a user via other means. For example, if your utility displayed a form to authorized users and allowed them to download a specialized report of some kind, the [controller](controllers.md) or action that ultimately generates the report must also check the appropriate permissions. In general, those permissions should be discrete: an administrator would grant users access to the utility _and_ a _Modify Widgets_ permission that your plugin explicitly defines (and checks in the appropriate controller action).

## Registering your Utility

Once you have created your utility class, you will need to register it with the Utilities service, so Craft will know about it when populating the list of available utility types:

```php
<?php
namespace mynamespace\myplugin;

use craft\base\Plugin as BasePlugin;
use craft\events\RegisterComponentTypesEvent;
use craft\services\Utilities;
use yii\base\Event;

class Plugin extends BasePlugin
{
    public function init()
    {
        Event::on(
            Utilities::class,
            Utilities::EVENT_REGISTER_UTILITY_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MyUtility::class;
            }
        );

        // ...
    }

    // ...
}
```
