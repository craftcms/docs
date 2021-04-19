# Control Panel Templates

The control panel is built using Twig templates, so extending it with new pages should feel familiar if you’ve worked with Twig on the front-end.

Plugins can define templates within the `templates/` folder within their base source folder. Templates within there can be referenced using the plugin’s handle as the template path prefix.

For example if a plugin’s handle is `foo` and it has a `templates/bar.twig` template, that template could be accessed by going to `/admin/foo/bar`, or from Twig by including/extending `foo/bar` (or `foo/bar.twig`).

Modules can have templates too, but they will need to manually define a [template root](template-roots.md) before they are accessible.

## Page Templates

To add a new full page to the control panel, create a template that extends the [_layouts/cp.html](https://github.com/craftcms/cms/blob/develop/src/templates/_layouts/cp.html) template.

At a minimum, your template should set a `title` variable and define a `content` block:

```twig
{% extends "_layouts/cp" %}
{% set title = "Page Title"|t('plugin-handle') %}

{% block content %}
    <p>Page content goes here</p>
{% endblock %}
```

### Supported Variables

The following variables are supported by the `_layouts/cp.html` template:

Variable | Description
-------- | -----------
`title` | The page title.
`bodyClass` | An array of class names that should be added to the `<body>` tag.
`fullPageForm` | Whether the entire page should be wrapped in one big `<form>` element (see [Full Page Forms](#full-page-forms)).
`crumbs` | An array of breadcrumbs (see [Adding Breadcrumbs](#adding-breadcrumbs)).
`tabs` | An array of tabs (see [Adding Tabs](#adding-tabs)).
`selectedTab` | The ID of the selected tab.
`showHeader` | Whether the page header should be shown (`true` by default).
`mainAttributes` | A hash of HTML attributes that should be added to the `<main>` tag. 

### Available Blocks

The `_layouts/cp` template defines the following blocks, which your template can extend:

Block | Outputs
----- | -------
`actionButton` | The primary Save button.
`content` | The page’s main content.
`contextMenu` | An optional context menus beside the page title (e.g. the revision menu on Edit Entry pages).
`details` | The page’s right sidebar content.
`footer` | The page’s footer content.
`header` | The page’s header content, including the page title and other header elements.
`pageTitle` | The page title (rendered within the `header` block).
`sidebar` | The page’s left sidebar content.
`toolbar` | The page’s toolbar content.

### Adding Breadcrumbs

To add breadcrumbs to your page, define a `crumbs` variable, set to an array of the breadcrumbs.

Each breadcrumb should be represented as a hash with the following keys:

Key | Description
--- | -----------
`label` | The breadcrumb label.
`url` | The URL that the breadcrumb should link to.

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

Key | Description
--- | -----------
`label` | The breadcrumb label.
`url` | The URL or anchor that the breadcrumb should link to.
`class` | A class name that should be added to the tab (in addition to `tab`).

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

### Full Page Forms

Set the `fullPageForm` variable to `true` if your page’s purpose in to present one single form:

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

Variable | Description
-------- | -----------
`formActions` | An array of available Save menu actions for the form (see below).
`mainFormAttributes` | A hash of HTML attributes that should be added to the `<form>` tag.
`retainScrollOnSaveShortcut` | Whether the page’s scroll position should be retained on the subsequent page load when the <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut is used.
`saveShortcutRedirect` | The URL that the page should be redirected to when the <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut is used.
`saveShortcut` | Whether the page should support a <kbd>Ctrl</kbd>/<kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut (`true` by default).

#### Alternate Form Actions

If you want your form to have a menu button beside the Save button with alternate form actions, define a `formActions` variable, set to an array of the actions.

Each action should be represented as a hash with the following keys:

Key | Description
--- | -----------
`action` | The controller action path that the form should submit to, if this action is selected.
`confirm` | A confirmation message that should be presented to the user when the action is selected, before the form is submitted.
`data` | A hash of any data that should be passed to the form’s `submit` event.
`destructive` | Whether the action should be considered destructive, which will cause it to be listed in red text at the bottom of the menu, after a horizontal rule.
`label` | The action’s menu option label.
`params` | A hash of additional form parameters that should be included in the submission if the action is selected.
`redirect` | The URL that the controller action should redirect to if successful.
`retainScroll` | Whether the page’s scroll position should be retained on the subsequent page load.
`shift` | Whether the action’s keyboard shortcut should include the <kbd>Shift</kbd> key.
`shortcut` | Whether the action should be triggered by a keyboard shortcut.

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
