# Control Panel Sections

Modules and plugins can add new sections to the control panel using the [EVENT_REGISTER_CP_NAV_ITEMS](craft5:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) event.
Plugins also have a special [`getCpNavItem()` method](#control-panel-sections).

```php
use craft\events\RegisterCpNavItemsEvent;
use craft\web\twig\variables\Cp;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        Cp::class,
        Cp::EVENT_REGISTER_CP_NAV_ITEMS,
        function(RegisterCpNavItemsEvent $event) {
            $event->navItems[] = [
                'label' => 'Plugin Zone',
                'url' => 'myplugin-zone',
                'icon' => '@mynamespace/path/to/icon.svg',
            ];
        }
    );

    // ...
}
```

Each item within the [navItems](craft5:craft\events\RegisterCpNavItemsEvent::$navItems) array can have the following keys:

- `url` – The URL that the nav item should link to. (It will be run through <craft5:craft\helpers\UrlHelper::cpUrl()>.)
- `label` – The user-facing nav item label.
- `icon` _(optional)_ – The path to the icon SVG that should be used. (It can begin with an alias.)
- `fontIcon` _(optional)_ – A character/ligature from Craft’s font icon set.
- `badgeCount` _(optional)_ – The [badge count](#badges) that should be displayed in the nav item.
- `subnav` _(optional)_ – An array of additional, nested items that should be visible when your section is accessed, or when a user expands the primary item. (See [Subnavs](#subnavs), below.)

For Craft to properly designate an item as “active,” its `url` must be registered with a _path_ to the plugin or module’s control panel section.
This holds true for `subnav` URLs, as well—their `url` must begin with the parent item’s `url` to appear selected.

## Subnavs

If your section has a sub-navigation, each subnav item within your `subnav` array should be represented by a sub-array with mandatory `url` and `label` keys, and optional `badgeCount`, <Since ver="5.9.0" feature="Icons for nested navigation items in the control panel">`icon`, and `fontIcon`</Since> keys:

```php
$event->navItems[] = [
    // ...

    'subnav' => [
        'attractions' => [
            'label' => 'Attractions',
            'url' => 'plugin-zone/attractions',
            'icon' => 'pegasus',
        ],
        'reservations' => [
            'label' => 'Reservations',
            'url' => 'plugin-zone/reservations',
            'icon' => 'calendar-star',
        ],
        // Display a subnav badge count by adding the optional `badgeCount` key:
        'policies' => [
            'label' => 'Policies',
            'url' => 'plugin-zone/policies'
            'badgeCount' => 3,
        ],
    ],
];
```

Your templates can specify which subnav item should be selected by setting `selectedSubnavItem` to the key of a nav item:

```twig
{% set selectedSubnavItem = 'bar' %}
```

## Badges

Navigation items’ `badgeCount`s are intended to be calculated dynamically.
If this involves costly queries or other blocking operations (like a request to a remote API), consider caching the value.
More guidance on how to use badges can be found in the [Utilities](utilities.md) section.

## Plugin Sections

Plugins that only need to add one section can set the `$hasCpSection` property on their primary plugin class, rather than using the [EVENT_REGISTER_CP_NAV_ITEMS](craft5:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) event:

```php
<?php

namespace mynamespace;

class Plugin extends \craft\base\Plugin
{
    public bool $hasCpSection = true;

    // ...
}
```

::: tip
You can alternatively set a `hasCpSection` value in `composer.json` as noted in the [plugin guide](plugin-guide.md#composer-json). We don’t recommend setting it in both places, however, since the value set in `composer.json` will override your public class property’s value and likely create confusion.
:::

Craft automatically adds a new [user permission](user-permissions.md) for your plugin, and only shows a nav item to users who can access it.

Modify aspects of your plugin’s control panel nav item by overriding its [getCpNavItem()](craft5:craft\base\PluginInterface::getCpNavItem()) method:

```php
public function getCpNavItem(): ?array
{
    // Get the base definition (including `label`, `url`, and `icon`)...
    $item = parent::getCpNavItem();

    // ...customize...
    $item['badgeCount'] = 5;
    $item['subnav'] = [
        // ...
    ];

    // ...and return:
    return $item;
}
```

Clicking on a plugin’s nav item will take the user to `/{cpTrigger}/plugin-handle`, which will attempt to load an `index.html` or `index.twig` template within the plugin’s [template root](template-roots.md) (its `templates/` folder within its base source folder).

::: tip
See [Control Panel Templates](cp-templates.md) for more information about developing control panel templates.
:::

Alternatively, you can route those requests to a controller action (or a different template) by registering a control panel route from your plugin’s `init()` method:

```php
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use yii\base\Event;

public function init()
{
    Event::on(
        UrlManager::class,
        UrlManager::EVENT_REGISTER_CP_URL_RULES,
        function(RegisterUrlRulesEvent $event) {
            $event->rules['plugin-handle'] = 'plugin-handle/foo/bar';
        }
    );
}
```

These rules use the same format as those [defined in `routes.php`](../system/routing.md#advanced-routing-with-url-rules). Find additional examples of control panel and site routes in the routing section of the [controllers](controllers.md#routing) documentation.

::: tip
Craft automatically prepends your pattern with the <config5:cpTrigger>.
Including it (or hard-coding it to the default `admin`) may make your routes unreachable.
:::

