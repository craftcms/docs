# Settings + Config

As mentioned in the [base plugin class](provider.md) section, your plugin is responsible for initializing its own settings object in `createSettings()`.
This is populated with values according to [the process below](#config-files), and used when building the [settings form](#settings-form).

<!-- more -->

You can get an instance of your plugin’s settings from anywhere (after booting) via the container:

```php
$settings = app(\CraftCms\DemoPlugin\Demo)->getSettings();
```

## Config Files

If you want a user-space config file, add a `config/my-plugin-handle.php` to the root of your package and it will be published by the `CraftCms\Cms\Plugin\Concerns\HasConfig` plugin trait, automatically.

The final config map your plugin’s settings model is initialized with will be composed from multiple sources:

1. **Settings model properties:** The class you instantiate in `createSettings()` can have default property values. You may also set properties on it before returning.
1. **Project config:** Values stored in `config/craft/project/project.yaml` under the `plugins.{plugin-handle}.settings` key. _Craft takes care of updating this for you, whenever your plugin’s settings are saved in the control panel._
1. **Local config file:** Settings in a project’s published `config/craft/{plugin-handle}.php` file override everything.

::: warning
This process also applies to settings as they’re committed to project config.
:::

## Environmental Config

To support environment variable overrides on your settings class (or any model, for that matter), call `Env::config($class, 'MY_PLUGIN_NS_')`.

Plugin settings that support environment variables or aliases should wrap their validation rules in the special `CraftCms\Cms\Validation\Rules\EnvValueRule` class to check the *parsed* values, without replacing those properties on the actual model.
You do not need to juggle the submitted values before they’re sent to project config.

## Initialization

Yii’s system was heavily configuration-driven: objects were initialized with a config map that would cascade down through any nested objects.
Places you’d use `Craft::createObject()` can be mostly replaced with `app()->make($class, [...])`.

## Settings Form

The `CraftCms\Cms\Plugin\Concerns\HasSettings` trait gives your plugin a `hasCpSettings` property; set this to `true` to give your plugin a tile in the **Settings** screen of the control panel, and a dedicated settings page.
Craft handles all the routing, so you only need to implement a `settingsForm()` method:

```php
use CraftCms\Cms\Form\Form;
use CraftCms\Cms\Form\FormContext;
use CraftCms\Cms\Form\Controls\Text;
use CraftCms\Cms\Form\Nodes\Field;

#[\Override]
protected function settingsForm(FormContext $context = new FormContext): ?Form
{
    return Form::make([
        Field::make(t('API Key', category: 'my-plugin'), Text::make('apiKey'))
            ->instructions(t('The access key you generated when creating your account.', category: 'my-plugin'))
            ->required();
    ]);
}
```



::: tip
While your [validation](#validation) setup needs to account for what part of the request it is looking at, your settings form is automatically placed within the `settings` namespace, so its [control paths](forms.md#paths) do not need to be prefixed.
:::

Only plugin settings defined in a published config file are pushed into the global configuration repository, accessible through `config('craft.plugin-handle.[...]')`.
This means that the presence of a key in `craft.plugin-handle` is an indication that the setting (and everything downstream of it) is controlled from a config file:

```php
use CraftCms\Cms\Form\Nodes\Callout;

#[\Override]
protected function settingsForm(FormContext $context = new FormContext): ?Form
{
    // Get the whole static config array (so `nulls` are significant):
    $overrides = config(sprintf('craft.%s', $this->handle));

    $form = Form::make([
        // ...
    ]);

    if (Arr::has($overrides, 'someSetting')) {
        $form->add(Callout::make('sections-override-alert', t('Section configuration is being overridden by `{file}`.', ['file' => 'config/craft/guest-entries.php'], 'guest-entries'))->variant('warning'))
    }

    return $form;
}
```

## Validation

The new settings model will be compatible for most plugins, but you will need to adopt new [validation](validation.md) patterns to drop the adapter:

```php
// Remove:
public function defineRules(): array
{}

// Add...
public function getRules(): array
{
    return array_merge(parent::getRules(), [
        'adminNotificationAddress' => ['required', 'email:rfc'],
    ]);
}

// ...or:
public function rulesClass(): string
{
    return MyPluginSettingsRuleset::class;
}
```

You may also tag the settings model with the `#[Ruleset(MyPluginSettingsRuleset::class)]` attribute.
For more control over how your settings data is normalized, return your own [form request](validation#form-request-validation) class from `getSettingsRequestClass()`.

When using a custom `FormRequest`, your rules are evaluated against the entire request, not just the nested `settings` key that Craft ordinarily assigns to your settings model.
The example above (validating `adminNotificationsAddress` on the settings model) would need to be updated to `settings.adminNotificationsAddress` if returned from `FormRequest::rules()`.

::: tip
See our [Guest Entries](repo:craftcms/guest-entries/tree/5.x) plugin for an example of these new techniques.
:::
