# Plugin Settings

## Settings Model

Once you’ve indicated your plugin will have settings by enabling `hasCpSettings` in your main plugin class or `composer.json`, you’ll need to provide a model for defining them.

This “settings model” is responsible for storing and validating the setting values.

Settings models are just like any other [model](guide:structure-models). To create it, create a `models/` directory within your plugin’s source directory, and create a `Settings.php` file within it:

```php
<?php

namespace mynamespace\models;

use craft\base\Model;

class Settings extends Model
{
    public $foo = 'defaultFooValue';
    public $bar = 'defaultBarValue';

    public function defineRules(): array
    {
        return [
            [['foo', 'bar'], 'required'],
            // ...
        ];
    }
}
```

Next up, add a `createSettingsModel()` method on your main plugin class, which returns a new instance of your settings model:

```php
<?php
namespace mynamespace;

class Plugin extends \craft\base\Plugin
{
    protected function createSettingsModel(): ?Model
    {
        return new \mynamespace\models\Settings();
    }

    // ...
}
```

::: warning
The setting model’s [`fields()`](<https://www.yiiframework.com/doc/api/2.0/yii-base-model#fields()-detail>) are serialized for project config, so any complex or nested data types that aren’t compatible with [`toArray()`](<https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#toArray()-detail>) should be excluded from `fields()` and declared in [`extraFields()`](<https://www.yiiframework.com/doc/api/2.0/yii-base-arrayabletrait#extraFields()-detail>) instead.
:::

## Accessing Settings

With your settings model and `createSettingsModel()` method in place, you can now access your settings model, populated with any custom values set for the current project, via a `getSettings()` method on your main plugin class:

```php
// From your main plugin class:
$foo = $this->getSettings()->foo;

// From elsewhere:
$foo = \mynamespace\Plugin::getInstance()->getSettings()->foo;
```

Or you can use the `$settings` magic property:

```php
// From your main plugin class:
$foo = $this->settings->foo;

// From elsewhere:
$foo = \mynamespace\Plugin::getInstance()->settings->foo;
```

## Overriding Setting Values

Your setting values can be overridden on a per-project basis from a PHP file within the project’s `config/` folder, named after your plugin handle. For example, if your plugin handle is `foo-bar`, its settings can be overridden from a `config/foo-bar.php` file.

The file just needs to return an array with the overridden values:

```php
<?php

return [
    'foo' => 'overriddenFooValue',
    'bar' => 'overriddenBarValue',
];
```

It can also be a multi-environment config:

```php
<?php

return [
    '*' => [
        'foo' => 'defaultValue',
    ],
    '.test' => [
        'foo' => 'devValue',
    ],
];
```

::: warning
The config file cannot contain any keys that are not defined in the plugin’s settings model.
:::

## Settings Pages

Plugins can also provide a settings page in the control panel, which may make it easier for admins to manage settings values, depending on the plugin.

To give your plugin a settings page, create a `templates/` directory within your plugin’s source directory, and create a `settings.twig` file within it:

```twig
{% import '_includes/forms.twig' as forms %}

{{ forms.textField({
  label: 'Foo',
  name: 'foo',
  value: settings.foo
}) }}

{{ forms.textField({
  label: 'Bar',
  name: 'bar',
  value: settings.bar
}) }}
```

Then, within your main plugin class, set the `$hasCpSettings` property to `true`, and define a `settingsHtml()` method that returns your new rendered template:

```php{9,16-22}
<?php

namespace mynamespace;

use craft\base\Model;

class Plugin extends \craft\base\Plugin
{
    public bool $hasCpSettings = true;

    protected function createSettingsModel(): ?Model
    {
        return new \mynamespace\models\Settings();
    }

    protected function settingsHtml(): ?string
    {
        return \Craft::$app->getView()->renderTemplate(
            'my-plugin-handle/settings',
            ['settings' => $this->getSettings()]
        );
    }

    // ...
}
```

With all that in place, your plugin will now get its own icon on the Settings page, and a cog icon in its row on the <Journey path="Settings, Plugins" /> page, which will link to `/admin/settings/plugins/my-plugin-handle`. Craft manages the routing internally, for both displaying settings pages and receiving POSTed data; `settingsHtml()` should _not_ return an entire HTML `<form>` element.

<See path="project-config.md" hash="secrets-and-environmental-differences" label="Settings and Project Config" description="Learn how to support environment variables and aliases in your plugin settings." />

### Advanced Settings Pages

When the `/admin/settings/plugins/my-plugin-handle` control panel URL is requested, your plugin is ultimately in charge of the response. Namely, your plugin’s `getSettingsResponse()` method. The default `getSettingsResponse()` implementation in <craft5:craft\base\Plugin> will call your plugin’s `settingsHtml()` method, and then tell the active controller to render Craft’s `settings/plugins/_settings` template (the layout template for plugin settings pages), passing it the HTML returned by `settingsHtml()`.

If a plugin needs more control over its settings page(s), it can override its `getSettingsResponse()` method and do whatever it wants with the request, like render its own template…

```php
public function getSettingsResponse(): mixed
{
    return \Craft::$app
        ->controller
        ->renderTemplate('my-plugin-handle/settings/template');
}
```

…or redirect the request:

```php
public function getSettingsResponse(): mixed
{
    $url = \craft\helpers\UrlHelper::cpUrl('my-plugin-handle/settings');

    return \Craft::$app->controller->redirect($url);
}
```

Be aware that whatever you return is directly returned by <craft5:craft\controllers\PluginsController::actionEditPluginSettings()>, and therefore must be compatible with a standard controller action.
