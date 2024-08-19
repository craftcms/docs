---
description: Utilities are special, non-content pages in the control panel, that provide access to back-office features or debugging data.
---

# Utilities

Plugins can provide new utilities for the [control panel](../system/control-panel.md)’s **Utilities** section by creating a class that implements <craft5:craft\base\UtilityInterface> or extends <craf4:craft\base\Utility>. A utility is typically used to surface information and controls for administrative features that aren’t tied to specific [elements](../system/elements.md). Each registered utility gets its own [permissions](#permissions).

## Utility Class

Scaffold a utility with the [generator](generator.md):

<Generator component="utility" plugin="my-plugin" />

Answer the prompts, and generator will create the required class and register it via the appropriate [events](events.md).

Alternatively, extending <craft5:craft\base\Utility> will provide all the non-essential methods—but you must still define those that identify your utility:

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

        // Gather data to pass to the template...
        $params = [
            'myOptions' => [
                // ...
            ],
        ];

        return $view->renderTemplate('_my-plugin/utilities/my-utility.twig', $params);
    }
}
```

This utility would be accessible to any user with the correct [permission](#permissions) at `/admin/utilities/my-utility` (or whatever the site’s <config5:cpTrigger> is).

::: tip
Refer to Craft’s own utility classes (located in `vendor/craftcms/cms/src/utilities/`, or the `craft\utilities` namespace) for more complete examples.
:::

### HTML

If your utility relies on any JavaScript or CSS, be sure and register the relevant [asset bundles](asset-bundles.md) in `contentHtml()`.

You may also implement static `toolbarHtml()` and `footerHtml()` methods to inject actions and metadata.

### Badges

The static [`badgeCount()`](craft5:craft\base\UtilityInterface::badgeCount()) method can be used to surface an integer in its **Utilities** screen navigation item. Craft displays the total badge counts of all registered utilities (accessible to the current user) in the main control panel menu. See the [Updates](craft5:craft\utilities\Updates), [Migrations](craft5:craft\utilities\Migrations), and [Deprecation Warnings](craft5:craft\utilities\DeprecationErrors) classes for some examples of how badges are used.

::: warning
Badge counts are calculated on every control panel request. Be mindful of your users’ experience, and cache any expensive arithmetic or database queries!

It’s also important to display a number that reflects items that are actionable for the current user. Suppose you wanted to list “stale” entries (things that hadn’t been edited in the last month)—showing a user a count across all sections (even if they didn’t have teh correct [permissions](#permissions)) might continue to display a badge, even when their backlog was cleared!

```php
public static function badgeCount(): int
{
    $user = Craft::$app->getUser()->getIdentity();

    // Check the cache before querying, or set the cache for the default `cacheDuration`:
    return Craft::$app->getCache()->getOrSet("my-plugin:utility-badge-count:{$user->uid}", function() {
        return Entry::find()
            ->dateUpdated("<= {$now->modify('-1 month')->format(DateTime::ATOM)}")
            ->savable()
            ->count();
    });
}
```

Utilities are always rendered in the context of control panel user session.
:::

## Permissions

Each utility automatically gets its own [permission](user-permissions.md). Craft checks these permissions before displaying a utility in the sidebar, and when the utility’s URL is requested.

However, those permissions do _not_ have any bearing on what functionality might be accessible to a user via other means. For example, if your utility displayed a form to authorized users and allowed them to download a specialized report of some kind, the [controller](controllers.md) or action that ultimately generates the report must also check the appropriate permissions. In general, those permissions should be discrete: an administrator would grant users access to the utility _and_ a _Modify Widgets_ permission that your plugin explicitly defines (and checks in the appropriate controller action).

## Registering your Utility

Once you have created your utility class, you will need to register it with the [Utilities](craft5:craft\services\Utilities) service, so Craft will know about it when populating the list of available utility types:

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
            Utilities::EVENT_REGISTER_UTILITIES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MyUtility::class;
            }
        );

        // ...
    }

    // ...
}
```

::: tip
Registering your utility doesn’t mean it will automatically appear for users! You must also grant the appropriate [permissions](#permissions).
:::
