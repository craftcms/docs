# コントロールパネルのテンプレート

コントロールパネルは Twig テンプレートを使用して構築されているため、フロントエンドの Twig を操作していれば、新しいページでそれを拡張するのは慣れ親しんだ感じがするでしょう。

プラグインは、ベースソースフフォルダにある `templates/` フォルダ内のテンプレートを定義できます。 そこに含まれるテンプレートは、プラグインのハンドルをテンプレートパス接頭辞として使用することで参照できます。

例えば、プラグインのハンドルが `foo` で  `templates/bar.twig` テンプレートを持つ場合、そのテンプレートは`/admin/foo/bar` にブラウザで移動するか、Twig から `foo/bar`（または、`foo/bar.twig`）を include / extends することによってアクセスできます。

しかし、アクセスできるようにする前に[テンプレートルート](template-roots.md)を手動で定義する必要があります。

## ページのテンプレート

少なくとも、ページのテンプレートは Craft の [_layouts/cp](https://github.com/craftcms/cms/blob/develop/src/templates/_layouts/cp.html) レイアウトテンプレートを extends し、`title` 変数のセットと`content` ブロックを定義する必要があります。

次のブロックも、ページの他の外観をカスタマイズするために定義できます。

```twig
{% extends "_layouts/cp" %}
{% set title = "Page Title"|t('plugin-handle') %}

{% block content %}
  <p>Page content goes here</p>
{% endblock %}
```

### Supported Variables

The following variables are supported by the `_layouts/cp.html` template:

| Variable         | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `title`          | `pageTitle` – ページタイトルの出力にしようされます。                                                                            |
| `bodyClass`      | An array of class names that should be added to the `<body>` tag.                                      |
| `fullPageForm`   | Whether the entire page should be wrapped in one big `<form>` element (see [Form Pages](#form-pages)). |
| `crumbs`         | An array of breadcrumbs (see [Adding Breadcrumbs](#adding-breadcrumbs)).                                     |
| `tabs`           | An array of tabs (see [Adding Tabs](#adding-tabs)).                                                          |
| `selectedTab`    | The ID of the selected tab.                                                                                  |
| `showHeader`     | `header` – ページタイトルや他のヘッダー要素を含むページヘッダーの出力に使用されます。                                                             |
| `mainAttributes` | A hash of HTML attributes that should be added to the `<main>` tag.                                    |

### Available Blocks

The `_layouts/cp` template defines the following blocks, which your template can extend:

| Block          | Outputs                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| `actionButton` | The primary Save button.                                                       |
| `content`      | The page’s main content.                                                       |
| `contextMenu`  | （例：エントリ編集ページのエントリのリビジョンメニュー。 ）                                                 |
| `details`      | `sidebar` – ページのサイドバーコンテンツの出力に使用されます。                                          |
| `footer`       | The page’s footer content.                                                     |
| `header`       | The page’s header content, including the page title and other header elements. |
| `pageTitle`    | The page title (rendered within the `header` block).                           |
| `sidebar`      | The page’s left sidebar content.                                               |
| `toolbar`      | The page’s toolbar content.                                                    |

### Adding Breadcrumbs

To add breadcrumbs to your page, define a `crumbs` variable, set to an array of the breadcrumbs.

Each breadcrumb should be represented as a hash with the following keys:

| Key     | Description                                 |
| ------- | ------------------------------------------- |
| `label` | The breadcrumb label.                       |
| `url`   | The URL that the breadcrumb should link to. |

For example, the following `crumbs` array defines two breadcrumbs:

```twig
{% set crumbs = [
  {
    label: 'Plugin Name'|t('plugin-handle'),
    url: url('plugin-handle'),
  },
  {
    label: 'Products'|t('plugin-handle'),
    url: url('plugin-handle/products'),
  },
] %}
```

### Adding Tabs

To add breadcrumbs to your page, define a `tabs` variable, set to a hash of the tabs, indexed by tab IDs.

Each tab should be represented as a nested hash with the following keys:

| Key     | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| `label` | The breadcrumb label.                                                |
| `url`   | The URL or anchor that the breadcrumb should link to.                |
| `class` | A class name that should be added to the tab (in addition to `tab`). |

For example, the following `tabs` hash defines two tabs, which will toggle the `hidden` class of `<div>` elements whose IDs match the anchors:

```twig
{% set tabs = {
  content: {
    label: 'Content'|t('plugin-handle'),
    url: '#content',
  },
  settings: {
    label: 'Settings'|t('plugin-handle'),
    url: '#settings',
  },
} %}
```

The first tab will be selected by default. You can force a different tab to be selected by default by setting a `selectedTab` variable to the ID of the desired tab:

```twig
{% set selectedTab = 'settings' %}
```

### Form Pages

If the purpose of your template is to present a form to the user, start by setting the `fullPageForm` variable to `true` at the top:

```twig
{% set fullPageForm = true %}
```

When you do that, everything inside the page’s `<main>` element will be wrapped in a `<form>` element, and a Save button and CSRF input will be added to the page automatically for you. It will be up to you to define the `action` input, however.

```twig
{% block content %}
  {{ actionInput('plugin-handle/controller/action') }}
  <!-- ... -->
{% endblock %}
```

Your template can also define the following variables, to customize the form behavior:

| Variable                     | Description                                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formActions`                | An array of available Save menu actions for the form (see [Alternate Form Actions](#alternate-form-actions)).                                                           |
| `mainFormAttributes`         | A hash of HTML attributes that should be added to the `<form>` tag.                                                                                               |
| `retainScrollOnSaveShortcut` | Whether the page’s scroll position should be retained on the subsequent page load when the <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut is used. |
| `saveShortcutRedirect`       | The URL that the page should be redirected to when the <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut is used.                                     |
| `saveShortcut`               | Whether the page should support a <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut (`true` by default).                                              |

#### Form Inputs

Craft’s [_includes/forms.html](https://github.com/craftcms/cms/blob/develop/src/templates/_includes/forms.html) template defines several macros that can be used to display your form elements.

Most input types have two macros: one for outputting _just_ the input; and another for outputting the input as a “field”, complete with a label, author instructions, etc.

For example, if you just want to output a date input, but nothing else, you could use the `date` macro:

```twig
{% import '_includes/forms' as forms %}

{{ forms.date({
  id: 'start-date',
  name: 'startDate',
  value: event.startDate,
}) }}
```

However if you want to wrap the input with a label, author instructions, a “Required” indicator, and any validation errors, you could use the `dateField` macro instead:

```twig
{% import '_includes/forms' as forms %}

{{ forms.dateField({
  label: 'Start Date'|t('plugin-handle'),
  instructions: 'The start date of the event.'|t('plugin-handle'),
  id: 'start-date',
  name: 'startDate',
  value: event.startDate,
  required: true,
  errors: event.getErrors('startDate'),
}) }}
```

#### Alternate Form Actions

If you want your form to have a menu button beside the Save button with alternate form actions, define a `formActions` variable, set to an array of the actions.

Each action should be represented as a hash with the following keys:

| Key            | Description                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`       | The controller action path that the form should submit to, if this action is selected.                                                                |
| `confirm`      | A confirmation message that should be presented to the user when the action is selected, before the form is submitted.                                |
| `data`         | A hash of any data that should be passed to the form’s `submit` event.                                                                                |
| `destructive`  | Whether the action should be considered destructive, which will cause it to be listed in red text at the bottom of the menu, after a horizontal rule. |
| `label`        | The action’s menu option label.                                                                                                                       |
| `params`       | A hash of additional form parameters that should be included in the submission if the action is selected.                                             |
| `redirect`     | The URL that the controller action should redirect to if successful.                                                                                  |
| `retainScroll` | Whether the page’s scroll position should be retained on the subsequent page load.                                                                    |
| `shift`        | Whether the action’s keyboard shortcut should include the <kbd>Shift</kbd> key.                                                                       |
| `shortcut`     | Whether the action should be triggered by a keyboard shortcut.                                                                                        |

For example, the following `formActions` array defines three alternative form actions:

```twig
{% set formActions = [
  {
    label: 'Save and continue editing'|t('plugin-handle'),
    redirect: 'plugin-handle/edit/{id}',
    retainScroll: true,
    shortcut: true,
  },
  {
    label: 'Save and add another'|t('plugin-handle'),
    redirect: 'plugin-handle/new',
    shortcut: true,
    shift: true,
  },
  {
    label: 'Delete'|t('plugin-handle'),
    confirm: 'Are you sure you want to delete this?'|t('plugin-handle'),
    redirect: 'plugin-handle',
    destructive: true,
  },
] %}
```

Note that when `formActions` is defined, the `saveShortcut`, `saveShortcutRedirect`, and `retainScrollOnSaveShortcut` variables will be ignored, as it will be up to the individual form actions to define that behavior.
