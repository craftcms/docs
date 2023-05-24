# Styling

Craft has no opinions about how you style your front-end. This section covers some basic, broadly-applicable, framework-agnostic solutions for integrating CSS into your project.

## Adding a Stylesheet

When we first created `_layout.twig`, it included this line:

```twig
{% do craft.app.view.registerCssFile('@web/styles.css') %}
```

This is equivalent to using a plain `<link>` tag, but takes care of generating a valid absolute URL and building the appropriate HTML:

```html
<link href="{{ url('@web/styles.css') }}" rel="stylesheet">
```

The same tag can be used anywhere in Twig, meaning each template (say, for the individual post pages) can request that a stylesheet be added to the final document’s `<head>`:

```twig
{% do craft.app.view.registerCssFile('@web/post.css') %}
```

## Making Styles Dynamic

