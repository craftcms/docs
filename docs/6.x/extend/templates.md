# Templates + Rendering

Rendering HTML has been dramatically simplified.
In most situations, you can render a template with the `template()` helper:

```php
return template('my-plugin/_settings', [
    'settings' => $this->getSettings(),
]);
```

When the template `extend`s a control panel layout or should otherwise be treated as a complete HTML document, use `pageTemplate()`:

```php
return pageTemplate('my-plugin/_report', [
    'summary' => $report->getSummary(),
]);
```

This wraps the template in some “page lifecycle” hooks, like injecting any currently-registered assets into the correct locations.

Call `renderString()` to evaluate a template that is not stored on-disk:

```php
$summary = renderString($report->getBlueprint()->summaryFormat, ['report' => $report]);
```

All three of these helpers also allow you to override the current _mode_, and render a template using the control panel or site Twig environment:

```php
use CraftCms\Cms\View\TemplateMode;

return template(
    $report->getBlueprint()->templatePath,
    ['report' => $report],
    TemplateMode::Site,
);
```

The default mode is determined by the request.
You should only need `TemplateMode::Site` when rendering a template or string that a developer has selected or defined in a [settings](config.md) interface.
It is generally not safe to assume a user-space template exists.

## Sandboxing

Some of the above rendering methods also supports “sandboxed” rendering, in which only subset of objects, properties, and methods are accessible:

- `sandboxedTemplate()`
- `renderSandboxedString()`
- `renderSandboxedObjectTemplate()`

These should be used whenever you are evaluating simple templates that may come from untrusted or under-privileged input, like customizable emails, title formats, and so on.

::: tip
Mark a class, property, or method as safe for sandboxed environments with the `#[CraftCms\Cms\Twig\Attributes\AllowedInSandbox]` attribute.
:::

## Responses

Rendered templates are acceptable return values for controllers; Laravel automatically wrap the output in a complete response object before it bubbles back through any middleware.

Routes can also be mapped directly to templates, in your plugin’s [route files](http.md):

```php
Route::view('my-stats', 'activity/_stats/user-summary');
```

## Events

A pair of events are emitted whenever a template is rendered:

- `CraftCms\Cms\Twig\Events\TemplateRendering`, just before rendering a template. It receives the template path, local variables, and the template mode.
- `CraftCms\Cms\Twig\Events\TemplateRendered`, after the template is rendered. It receives the same arguments, as well as the final `output`.

These events are supplemented by `PageTemplateRendering` (before) and `PageTemplateRendered` (after), when a _page_ template is rendered.

## Middleware

Plugins can register [middleware](http.md#middleware) that filters HTML output, regardless of what generated it.

## Plugin Templates

Your plugin gets its own _template root_ for the control panel Twig environment.
By default, this is `resources/views/` directory, but the `CraftCms\Cms\Plugin\Concerns\HasViews` concern will fall back to `resources/templates/`, or a top-level `templates/` directory, for compatibility.

To register a _site_ template root, listen to the corresponding event:

```php
use CraftCms\Cms\View\Events\SiteTemplateRootsResolving;

public function bootPlugin(): void
{
    Event::listen(function (SiteTemplateRootsResolving $event) {
        $handle = self::getInstance()->handle;

        $event->roots[$handle] = $this->getBasePath().'/site-templates';
    });
}
```

In general, we recommend exposing an API to render HTML fragments (either from a control panel template root, or using the provided `CraftCms\Cms\Support\Html` helpers), rather than exposing templates to the site environment.
For example, the preferred way to inject a tracking script or form would be a custom function like `{{ form('formHandle').render() }}`, instead of `{% include 'super-form/form' with { form: myForm } %}`, where `super-form/form` is a non-editable template your plugin provides (and which doesn’t exist in the project’s templates directory).

## Blade

Craft also supports rendering [Blade templates](laravel:blade).
While `template()` is exclusively for Twig views, Laravel’s generic `view()` helper will also resolve Blade templates in your plugin’s template root (`resources/templates/` or `resources/views/`), in addition to any other custom template roots you may have registered.

The same set of global variables is available to Blade, but there are not direct equivalents to all of Twig’s filters, functions, tests, or operators.
However, because Blade is essentially a normal PHP environment, you can reach directly for any of the underlying features.

## Extensions

Register a [Twig extension](https://twig.symfony.com/doc/3.x/advanced.html#creating-an-extension) from your plugin’s `bootPlugin()` method:

```php
$extension = new MyTwigExtension;

// Via container:
app(\CraftCms\Cms\Twig\Twig::class)->registerExtension($extension);

// With facade:
\CraftCms\Cms\Support\Facades\Twig::registerExtension($extension);
```

::: tip
See the Laravel docs for information about [extending Blade](laravel:blade#extending-blade).
:::

<Block label="Twig extension refactoring">

We split up Craft’s internal Twig extensions into parts to better match their roles.
These classes all live in the `CraftCms\Cms\Twig\Extensions` namespace, and are loaded in roughly this order:

- `CoreTwigExtension` — Most global variables, basic logic and scalar type functions, element query factories, permission checks, asset hooks.
- `LaravelExtension` — Proxies for Laravel helper functions, like `app()`, `config()`, and `old()`, as well as all [facades](helpers.md)
- `DateTwigExtension` — Functions and filters for working with dates and times.
- `ArrayTwigExtension` — Array helpers.
- `TextTwigExtension` — Text manipulation helpers.
- `HtmlTwigExtension` — HTML and Markdown manipulation and filtering helpers.
- `CpExtension` — Additional features available only to the “control panel” template mode.
- `FeExtension` — Additional features available only to the “site” template mode.
- `SinglePreloaderExtension` — Automatically loads single section entries when accessed like a global variable. (Only active when the `preloadSingles` setting is `true`.)

</Block>

::: tip
In the following sections, consider the most impactful way you can contribute functionality to Twig; avoid using generic names or exposing the same feature in multiple ways.
Your entire API will always be available via Twig through the `app()` function, and you can get an instance of your primary plugin class via `Plugins.getPlugin('my-plugin-handle')`.
:::

### Macros

`CraftCms\Cms\Twig\Variables\CraftVariable` still exists, but is only extensible via [macros](macros.md):

::: code
```php
CraftVariable::macro('track', function () {
    return function (string $eventName, array $data = [], int $value = 1) {
        // ...
    }
});
```
```twig
{% do craft.track('pageView', { elementId: entry.id }) %}
```
:::

### Globals

You can inject global variables much more easily in Craft 6.x, using the `CraftCms\Cms\View\Events\TemplateGlobalsResolving` event:

```php
use MyOrg\Activity\Reporting\Manager;
use CraftCms\Cms\View\Events\TemplateGlobalsResolving;

public function bootPlugin(): void
{
    Event::listen(function (TemplateGlobalsResolving::class $event) {
        $event->globals['reporting'] = app(Manager::class);
    });
}
```

Any variables registered in this way will be available in Twig _and_ [Blade](#blade) environments!

::: tip
Craft injects a few additional global Twig variables from its extensions, so `$event->globals` (and the return from `CraftCms\Cms\View\TemplateGlobals::resolve()`) is not a comprehensive list of variables you have access to in Twig—it’s just the core set that is intended to be useful and compatible with every language and mode.
:::

### Facades

Craft exposes each of its facades to Twig through an instance of `CraftCms\Cms\Twig\Variables\Facade`.
You can add your own facades, if they are sufficiently identifiable in name:

::: code
```php
use MyOrg\Activity\Support\Events;
use CraftCms\Cms\Twig\Variables\Facade as FacadeVariable;

public function getGlobals(): array
{
    return [
        new FacadeVariable(Events::class),
    ];
}
```
```twig
{% do Events.track('pageView', { elementId: entry.id }) %}
```
:::
