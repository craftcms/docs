# Templates

In Craft, you define your site’s HTML output with templates.

<!-- more -->

Templates are files that live within your `templates/` folder. The structure of this directory is completely up to you—but keeping it organized and in agreement with [project config](../system/project-config.md) settings is essential.

Craft uses [Twig](https://twig.symfony.com/) to parse your templates. Twig is elegant, secure, powerful, and blazing fast. If you’re new to Twig, be sure to read the [Twig Fundamentals](twig.md) page to familiarize yourself with its syntax and capabilities.

::: tip
PHP code isn’t allowed in your templates, but Craft provides various ways to [extend Twig](../extend/extending-twig.md) to suit your needs.
:::


## Template Paths

There are several times when you’ll need to enter a path to one of your templates:

- When choosing which template [entry](../reference/element-types/entries.md) and [category](../reference/element-types/categories.md) URLs should load;
- When assigning a template to a [route](../system/routing.md#dynamic-routes);
- Within [include](https://twig.symfony.com/doc/tags/include.html), [extends](https://twig.symfony.com/doc/tags/extends.html), and [embed](https://twig.symfony.com/doc/tags/embed.html) template tags;

Craft has a standard template path format that applies to each of these cases: a Unix-style filesystem path to the template file, relative to your `templates/` folder. For example, the following paths are valid for a template located at `templates/recipes/entry.twig`:

- `recipes/entry`
- `recipes/entry.twig`

### Index Templates

If you name a template `index.twig`, you don’t need to specify it in the template path.

For example, if you have a template located at `templates/recipes/ingredients/index.twig`, the following template paths would point to it:

- `recipes/ingredients`
- `recipes/ingredients/index`
- `recipes/ingredients/index.twig`

If you have templates located at both `templates/recipes/ingredients.twig` *and* `templates/recipes/ingredients/index.twig`, the template path `recipes/ingredients` will match `ingredients.twig`.

### Hidden Templates

Suppose entries in a _Recipes_ section are configured to use a template located at `templates/recipes/entry.twig`. You might view a recipe at a URL like `http://my-project.tld/recipes/gin-tonic`, causing Craft to render that template—but someone could _also_ access the template directly at `http://my-project.tld/recipes/entry`. This would likely result in an error, oftentimes a result of the template assuming an `entry` variable is automatically injected. While there is value in exposing _some_ templates to Craft’s [routing](../system/routing.md) behavior (like a recipes index template at `templates/recipes/index.twig`), this one is better off hidden from public view.

Craft treats templates (and directories) prefixed with an underscore (`_`) as “hidden,” and will not render them unless specifically configured to do so via an element type’s settings or a custom [route](../system/routing.md#advanced-routing-with-url-rules). Changing the template’s filename to `_entry.twig` (and updating the _Recipes_ section’s configuration to use `recipes/_entry`) will ensure it is only rendered in the context of an entry.

Then, accessing `http://my-project.tld/recipes/entry` returns a 404, instead of trying (and failing) to render the template, out of context.

::: tip
You can customize the prefix for “private” templates using the <config5:privateTemplateTrigger> config setting.
:::

## Template Localization

If you’re running [multiple sites](../system/sites.md) with Craft, you can create site-specific subfolders in your `templates/` directory, with templates that will only be available to a specific site.

For example, if you want to create a special template welcoming your German customers (but there’s no need for it on your English site) then you could save it in `templates/de/welcome.twig`. That template would be available from `https://example.de/welcome`, assuming the German site’s base URL is `https://example.de` and its handle is `de`.

Craft will look for localized templates _before_ it looks for templates in the normal location, so you can use them to override non-localized templates. See our [Localization Guide](../system/sites.md) for more details.
