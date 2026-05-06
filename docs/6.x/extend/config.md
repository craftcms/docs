# Settings + Config

As mentioned in the [base plugin class](provider.md) section, the return type for your `createSettingsModel()` function has changed.

## Config Files

If you want a user-space config file, add a `config/my-plugin-handle.php` to the root of your package and it will be published by the `CraftCms\Cms\Plugin\Concerns\HasConfig` plugin trait, automatically.
Config loaded in this way is overlaid on the object returned by `createSettingsModel()`.

## Environmental Config

To support environment variable overrides on your settings class (or any model, for that matter), call `Env::config($class, 'MY_PLUGIN_NS_')`.

Plugin settings that support environment variables or aliases should wrap their validation rules in the special `CraftCms\Cms\Validation\Rules\EnvValueRule` class to check the *parsed* values, without replacing those properties on the actual model.
You do not need to juggle the submitted values before they’re sent to project config.

## Initialization

Yii’s system was heavily configuration-driven: objects were initialized with a config map that would cascade down through any nested objects.
Places you’d use `Craft::createObject()` can be mostly replaced with `app()->make($class, [...])`.

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
For more control over how your settings data is normalized, return your own form request class from `getSettingsRequestClass()`.

::: tip
See our [Guest Entries](repo:craftcms/guest-entries/tree/5.x) plugin for an example of these new techniques.
:::
