# テンプレートフック

Craft テンプレートでは、[hook](../dev/tags.md#hook) タグを使用してモジュールやプラグインにフックする機会を与えることができます。

```twig
{# Give plugins a chance to make changes here #}
{% hook 'my-custom-hook-name' %}
```

プラグインやモジュールは <craft3:craft\web\View::hook()> を使用してテンプレートフックに呼び出されることで、メソッドを登録できます。

```php
Craft::$app->view->hook('my-custom-hook-name', function(array &$context) {
    // Modify template *context*
    $context['foo'] = 'bar';

    // Return template *output*
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

| Hook                         | Description & Template                                                                                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cp.elements.element`        | Base element template.<br><small>[_elements/element.html](https://github.com/craftcms/cms/blob/main/src/templates/_elements/element.html)</small>                                            |
| `cp.layouts.base`            | Before `doctype` declaration in base template.<br><small>[_layouts/base.html](https://github.com/craftcms/cms/blob/main/src/templates/_layouts/base.html)</small>                            |
| `cp.assets.edit`             | Before asset detail view’s template blocks.<br><small>[assets/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/assets/_edit.html)</small>                                 |
| `cp.assets.edit.content`     | After asset detail view’s main content.<br><small>[assets/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/assets/_edit.html)</small>                                     |
| `cp.assets.edit.details`     | After asset detail view’s existing right sidebar details column.<br><small>[assets/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/assets/_edit.html)</small>            |
| `cp.assets.edit.settings`    | After asset detail view’s “Filename” field.<br><small>[assets/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/assets/_edit.html)</small>                                 |
| `cp.assets.edit.meta`        | After asset detail view’s existing right sidebar meta details.<br><small>[assets/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/assets/_edit.html)</small>              |
| `cp.categories.edit`         | Before category detail view’s template blocks.<br><small>[categories/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/categories/_edit.html)</small>                      |
| `cp.categories.edit.content` | After category detail view’s main content. <br><small>[categories/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/categories/_edit.html)</small>                         |
| `cp.categories.edit.details` | After category detail view’s existing right sidebar details column.<br><small>[categories/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/categories/_edit.html)</small> |
| `cp.entries.edit`            | Before entry detail view’s template blocks.<br><small>[entries/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/entries/_edit.html)</small>                               |
| `cp.entries.edit.content`    | After entry detail view’s main content.<br><small>[entries/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/entries/_edit.html)</small>                                   |
| `cp.entries.edit.settings`   | After entry detail view’s sidebar settings block.<br><small>[entries/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/entries/_edit.html)</small>                         |
| `cp.entries.edit.meta`       | After entry detail view’s existing right sidebar meta details.<br><small>[entries/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/entries/_edit.html)</small>            |
| `cp.entries.edit.details`    | After entry detail view’s existing right sidebar details column.<br><small>[entries/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/entries/_edit.html)</small>          |
| `cp.globals.edit`            | Before global set detail view’s template blocks.<br><small>[globals/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/globals/_edit.html)</small>                          |
| `cp.globals.edit.content`    | After global set detail view’s main content.<br><small>[globals/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/globals/_edit.html)</small>                              |
| `cp.users.edit`              | Before user detail view’s template blocks.<br><small>[users/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.html)</small>                                    |
| `cp.users.edit.prefs`        | After fields in the user’s “Preferences” tab.<br><small>[users/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.html)</small>                                 |
| `cp.users.edit.content`      | After user detail view’s main tabbed content.<br><small>[users/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.html)</small>                                 |
| `cp.users.edit.details`      | After user detail view’s right sidebar details. <br><small>[users/_edit.html](https://github.com/craftcms/cms/blob/main/src/templates/users/_edit.html)</small>                              |

