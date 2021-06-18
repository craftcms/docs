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

## Control Panel Template Hooks

Your custom plugin or module can use existing template hooks to modify parts of the Craft control panel.

::: tip
Pay close attention to what you intend to modify; some hooks are provided for modifying context while others make most sense for output.
:::

| Hook                         | Description                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `cp.elements.element`        | Base element template.                                                                                                   |
| `cp.layouts.base`            | Before `doctype` declaration in base template.                                                                           |
| `cp.assets.edit`             | Before asset detail view’s template blocks.                                                                              |
| `cp.assets.edit.content`     | After asset detail view’s main content.                                                                                  |
| `cp.assets.edit.details`     | After asset detail view’s existing right sidebar details column.                                                         |
| `cp.assets.edit.settings`    | After asset detail view’s “Filename” field.                                                                              |
| `cp.assets.edit.meta`        | After asset detail view’s existing right sidebar meta details.                                                           |
| `cp.categories.edit`         | Before category detail view’s template blocks.                                                                           |
| `cp.categories.edit.content` | After category detail view’s main content. https://github.com/craftcms/cms/blob/main/src/templates/categories/_edit.html |
| `cp.categories.edit.details` | After category detail view’s existing right sidebar details column.                                                      |
| `cp.entries.edit`            | Before entry detail view’s template blocks.                                                                              |
| `cp.entries.edit.content`    | After entry detail view’s main content.                                                                                  |
| `cp.entries.edit.settings`   | After entry detail view’s sidebar settings block.                                                                        |
| `cp.entries.edit.meta`       | After entry detail view’s existing right sidebar meta details.                                                           |
| `cp.entries.edit.details`    | After entry detail view’s existing right sidebar details column.                                                         |
| `cp.globals.edit`            | Before global set detail view’s template blocks.                                                                         |
| `cp.globals.edit.content`    | After global set detail view’s main content.                                                                             |
| `cp.users.edit`              | Before user detail view’s template blocks.                                                                               |
| `cp.users.edit.prefs`        | After fields in the user’s “Preferences” tab.                                                                            |
| `cp.users.edit.content`      | After user detail view’s main tabbed content.                                                                            |
| `cp.users.edit.details`      | After user detail view’s right sidebar details. https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.html |

