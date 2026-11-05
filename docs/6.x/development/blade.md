---
keywords: twig, template, view, front end
description: Learn about Blade, Laravel’s native template engine.
---

# Blade

[Blade](laravel:blade) is Laravel’s default template language.
It simplifies your project’s views by combining custom [directives](laravel:blade#blade-directives) with native PHP.

<!-- more -->

This page doesn’t describe Blade fundamentals; rather, we’ll cover how it works as an alternative (or supplement) to Craft’s default template language, [Twig](twig.md).

## Template Discovery

There is no configuration required to render Blade templates: Craft is able to match the appropriate template renderer when loading a view.

You can gradually adopt Blade (or Twig) by replacing templates, one-by-one.
When the application goes to render a template, it generates some candidates based on the view files that exist on-disk.

For example, calling `view('pages/my-template')` will look in `resources/views/` for…

- `my-template.twig`
- `my-template.html`
- `my-template.blade.php`

…unless you’ve overridden the priority using <config6:defaultTemplateExtensions>.

## Rendering

In addition to Laravel’s `view()` helper, Craft has two rendering helpers:

- `template()` — Wraps resolution and rendering in 

## Features

Blade diverges from Twig in features and ergonomics.

### Variables

Blade templates share the same [global variables](../reference/twig/) as Twig, resolved by Craft’s `CraftCms\Cms\View\TemplateGlobals`.

### Directives

Craft introduces a handful of custom directives.

<See path="../reference/blade/directives.md" />

Native Blade directives can be used for Laravel [authorization](laravel:blade#authentication-directives) where they already fit:

```blade
@auth
    ...
@endauth

@can('update', $entry)
    ...
@endcan
```

## Interoperability

Blade can `@include()` any Twig or Blade view that Laravel’s view finder can resolve, because Twig is implemented as a second `Illuminate\Contracts\View\Engine`.
This means that templates provided by Craft, installed plugins, the project, or found in any additional _template roots_ are accessible via `@include()`; there is no dedicated `@craftTemplate()` function.

```blade
@include('_navigation')
@include('articles/_entry', ['entry' => $entry])
@include('my-plugin::tokens.index')
```

Use the `template()` or `pageTemplate()` helper functions from PHP when you need specific behaviors:

- Render control panel templates by passing the `templateMode` argument;
- Wrap a page in lifecycle events and hooks with `pageTemplate()`;
- Restrict discovery to [public templates](templates.md#hidden-templates) by calling `CraftCms\Cms\View\TemplateManager::renderTemplate(..., publicOnly: true)` directly;

Blade's native `@include`, `@extends`, [components](laravel:blade#components), and [stacks](laravel:blade#stacks) work naturally.

Twig can render Laravel Blade views with the `blade()` function:

```twig
{{ blade('my-plugin::tokens.index', { token: token }) }}
{{ blade('my-plugin::nested/screen', { entry: entry }) }}
```

The `blade()` function only resolves and renders Blade templates.
It returns “safe” HTML that Twig will output without escaping

::: warning
“Safe” doesn’t mean that the contents of a Blade template is inherently immune from XSS.
It is still your responsibility to escape user-provided data wherever it’s used!
Blade _does_ automatically escape anything output using a `{{ }}` statement.
:::
