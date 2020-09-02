# Template Hooks

Craft templates can give modules and plugins an opportunity to hook into them using [hook](../dev/tags.md#hook) tags.

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

Plugins and modules can register methods to be called by template hooks using <craft3:craft\web\View::hook()>.

```php
Craft::$app->view->hook('my-custom-hook-name', function(array &$context) {
    $context['foo'] = 'bar';
    return '<p>Hey!</p>';
});
```

The callback method will pass a `$context` argument, which represents the current template context (all of the currently defined template variables). Any changes to this array will result in changes to the template’s variables for any tags that follow the `{% hook %}` tag.

The method can optionally return a string, which will be output where the `{% hook %}` tag is in the template.

## Available Control Panel Template Hooks

- `cp.elements.element`
- `cp.layouts.base`
- `cp.assets.edit`
- `cp.assets.edit.content`
- `cp.assets.edit.details`
- `cp.assets.edit.settings`
- `cp.assets.edit.meta`
- `cp.categories.edit`
- `cp.categories.edit.content`
- `cp.categories.edit.details`
- `cp.entries.edit`
- `cp.entries.edit.content`
- `cp.entries.edit.settings`
- `cp.entries.edit.meta`
- `cp.entries.edit.details`
- `cp.globals.edit`
- `cp.globals.edit.content`
- `cp.users.edit`
- `cp.users.edit.prefs`
- `cp.users.edit.content`
- `cp.users.edit.details`