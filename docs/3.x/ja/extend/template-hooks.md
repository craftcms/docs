# テンプレートフック

Craft テンプレートでは、[hook](../dev/tags.md#hook) タグを使用してモジュールやプラグインにフックする機会を与えることができます。

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

プラグインやモジュールは <craft3:craft\web\View::hook()> を使用してテンプレートフックに呼び出されることで、メソッドを登録できます。

```php
Craft::$app->view->hook('my-custom-hook-name', function(array &$context) {
    $context['foo'] = 'bar';
    return '<p>Hey!</p>';
});
```

コールバックメソッドは、現在のテンプレートのコンテキスト（現在定義されているすべてのテンプレート変数）を表す `$context` 引数を渡します。 この配列を変更すると、`{% hook %}` タグに続くすべてのタグのテンプレートの変数が変更されます。

このメソッドは、テンプレート内の `{% hook %}` タグがある場所に出力される文字列をオプションで返すことができます。

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

