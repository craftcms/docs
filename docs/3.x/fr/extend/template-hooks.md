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

| Hook                         | Description                                                         | Template                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `cp.elements.element`        | Base element template.                                              | [_elements/element.html](https://github.com/craftcms/cms/blob/master/src/templates/_elements/element.html) |
| `cp.layouts.base`            | Before `doctype` declaration in base template.                      | [_layouts/base.html](https://github.com/craftcms/cms/blob/master/src/templates/_layouts/base.html)         |
| `cp.assets.edit`             | Before asset detail view’s template blocks.                         | [assets/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/assets/_edit.html)           |
| `cp.assets.edit.content`     | After asset detail view’s main content.                             | [assets/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/assets/_edit.html)           |
| `cp.assets.edit.details`     | After asset detail view’s existing right sidebar details column.    | [assets/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/assets/_edit.html)           |
| `cp.assets.edit.settings`    | After asset detail view’s “Filename” field.                         | [assets/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/assets/_edit.html)           |
| `cp.assets.edit.meta`        | After asset detail view’s existing right sidebar meta details.      | [assets/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/assets/_edit.html)           |
| `cp.categories.edit`         | Before category detail view’s template blocks.                      | [categories/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/categories/_edit.html)   |
| `cp.categories.edit.content` | After category detail view’s main content.                          | [categories/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/categories/_edit.html)   |
| `cp.categories.edit.details` | After category detail view’s existing right sidebar details column. | [categories/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/categories/_edit.html)   |
| `cp.entries.edit`            | Before entry detail view’s template blocks.                         | [entries/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/entries/_edit.html)         |
| `cp.entries.edit.content`    | After entry detail view’s main content.                             | [entries/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/entries/_edit.html)         |
| `cp.entries.edit.settings`   | After entry detail view’s sidebar settings block.                   | [entries/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/entries/_edit.html)         |
| `cp.entries.edit.meta`       | After entry detail view’s existing right sidebar meta details.      | [entries/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/entries/_edit.html)         |
| `cp.entries.edit.details`    | After entry detail view’s existing right sidebar details column.    | [entries/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/entries/_edit.html)         |
| `cp.globals.edit`            | Before global set detail view’s template blocks.                    | [globals/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/globals/_edit.html)         |
| `cp.globals.edit.content`    | After global set detail view’s main content.                        | [globals/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/globals/_edit.html)         |
| `cp.users.edit`              | Before user detail view’s template blocks.                          | [users/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/users/_edit.html)             |
| `cp.users.edit.prefs`        | After fields in the user’s “Preferences” tab.                       | [users/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/users/_edit.html)             |
| `cp.users.edit.content`      | After user detail view’s main tabbed content.                       | [users/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/users/_edit.html)             |
| `cp.users.edit.details`      | After user detail view’s right sidebar details.                     | [users/_edit.html](https://github.com/craftcms/cms/blob/master/src/templates/users/_edit.html)             |

