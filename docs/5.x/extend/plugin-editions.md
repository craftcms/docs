# Plugin Editions

The Plugin Store supports multi-edition plugins, which work similarly to Craft’s editions (Solo, Team, and Pro).

- Plugins that support multiple editions are still comprised of a single Composer package.
- Plugins’ active edition is recorded in the [project config](../project-config.md).
- Plugins can implement feature toggles by checking their active edition.
- Plugins may require a particular Craft edition.

::: warning
Not every plugin can or should support editions. [Contact](https://craftcms.com/contact) Pixel & Tonic before you begin adding edition support to make sure it will be allowed for your plugin.
:::

## Define the Editions

To add edition support to a plugin, begin by defining the available editions (in “ascending” order), by overriding <craft5:craft\base\Plugin::editions()>.

```php
class Plugin extends \craft\base\Plugin;
{
    // The order of your constants isn’t important...
    const EDITION_LITE = 'lite';
    const EDITION_PRO = 'pro';
    const EDITION_EXTREME = 'extreme';

    public static function editions(): array
    {
        return [
            // ...but the order you return them *is*!
            self::EDITION_LITE,
            self::EDITION_PRO,
            self::EDITION_EXTREME,
        ];
    }

    // ...
}
```

## Add Feature Toggles

Your feature toggles can call your plugin’s [is()](craft5:craft\base\Plugin::is()) method.

::: code
```php
if (Plugin::getInstance()->is(Plugin::EDITION_PRO) {
    // Pro edition-only code goes here...
}

if (Plugin::getInstance()->is(Plugin::EDITION_LITE, '>')) {
    // Advanced functionality goes here (`pro` or `extreme`)
}
```
```twig
{% if plugin('plugin-handle').is('pro') %}
  {# Pro edition-only code goes here... #}
{% endif %}
```
:::

`is()` accepts two arguments, `$edition` and `$operator`.

`$edition` is the name of the edition you’re concerned with.

`$operator` is how you wish to compare that edition with the installed edition. by default, the editions are compared for equality

The following operators are also supported:

Operator | Tests if the active edition is ____ the given edition
- | -
`<` or `lt` | …less than…
`<=` or `le` | …less than or equal to…
`>` or `gt` | …greater than…
`>=` or `ge` | …greater than or equal to…
`==` or `eq` | …equal to… (same as default behavior)
`!=`, `<>`, or `ne` | …not equal to…

The active edition is considered “greater than” another if it appears _later_ in the declared [editions array](#define-the-editions), and “less than” another if it appears _earlier_.

::: warning
Changing editions should _never_ result in data or configuration loss.
Editions can change at any time, including due to accidents, like an incorrectly-merged project config change.
:::

Edition comparisons can be performed once your plugin’s `init()` method is called.
Consider binding event listeners only when they are relevant to the installed edition.

Individual [controllers](controllers.md) cannot be conditionally registered (without using distinct controller namespaces), but you _can_ check for editions in each action, or a controller’s `beforeAction()` method:

```php
public function beforeAction($action): bool
{
    // This controller is only accessible to Pro + Extreme installations:
    if (Plugin::getInstance()->is(Plugin::EDITION_PRO, '<')) {
        return false;
    }

    return parent::beforeAction($action);
}
```

## Require a Craft Edition

The [`minCraftEdition`](craft5:craft\base\Plugin::$minCraftEdition) property of your plugin class can be set to any of the <craft5:craft\enums\CmsEdition>

For example, a plugins that provides some additional functionality to [user groups](../system/user-management.md#user-groups) (a feature only available in <Badge type="edition" text="Pro" vertical="middle" />) should have a `minCraftEdition` of `CmsEdition::Pro`.

## Testing

You can toggle the active edition by changing the `plugins.<plugin-handle>.edition` property in `config/project/project.yaml`.

After changing the value to a valid edition handle (one returned by your plugin’s `editions()` method), Craft will prompt you to sync your project config YAML changes into the loaded project config. Once that’s done, your plugin’s active edition will be set to the new edition, and [feature toggles](#add-feature-toggles) should start behaving accordingly.
