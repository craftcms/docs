# Template Hooks

Craft templates can give modules and plugins an opportunity to hook into them using [hook](../dev/tags.md#hook) tags.

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

Plugins and modules can register methods to be called by template hooks using <craft3:craft\web\View::hook()>.

```php
Craft::$app->view->hook('my-custom-hook-name', function(array &$context) {
    // Modify template *context*
    $context['foo'] = 'bar';

    // Return template *output*
    return '<p>Hey!</p>';
});
```

The callback method will pass a `$context` argument, which represents the current template context (all of the currently defined template variables). Any changes to this array will result in changes to the template’s variables for any tags that follow the `{% hook %}` tag.

The method can optionally return a string, which will be output where the `{% hook %}` tag is in the template.

## Control Panel Template Hooks

Your custom plugin or module can use existing template hooks to modify parts of the Craft control panel.

::: tip
Pay close attention to what you intend to modify; some hooks are provided for modifying context while others make most sense for output.
:::

| Hook                         | Description & Template
| ---------------------------- | -------------------------------------------------------------------
| `cp.elements.element`        | Base element template.<br><small>[_elements/element.twig](https://github.com/craftcms/cms/blob/main/src/templates/_elements/element.twig)</small>
| `cp.layouts.base`            | Before `doctype` declaration in base template.<br><small>[_layouts/base.twig](https://github.com/craftcms/cms/blob/main/src/templates/_layouts/base.twig)</small>
| `cp.globals.edit`            | Before global set detail view’s template blocks.<br><small>[globals/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/globals/_edit.twig)</small>
| `cp.globals.edit.content`    | After global set detail view’s main content.<br><small>[globals/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/globals/_edit.twig)</small>
| `cp.users.edit`              | Before user detail view’s template blocks.<br><small>[users/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.twig)</small>
| `cp.users.edit.prefs`        | After fields in the user’s “Preferences” tab.<br><small>[users/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.twig)</small>
| `cp.users.edit.content`      | After user detail view’s main tabbed content.<br><small>[users/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.twig)</small>
| `cp.users.edit.details`      | After user detail view’s right sidebar details. <br><small>[users/_edit.twig](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.twig)</small>

