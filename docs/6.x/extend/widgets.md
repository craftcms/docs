# Widgets

Dashboard widgets provide at-a-glance information or controls on each user’s dashboard.

<!-- more -->

## Widget Class

A widget defines its static qualities (like a [name](#titles-and-names), icon, and [settings](#settings)), and is instantiated whenever it appears on a dashboard.
You may extend any of the built-in widget types, or `CraftCms\Cms\Dashboard\Widgets\Widget` directly.

```php
namespace MyOrg\MyPlugin\Widgets;

use CraftCms\Cms\Dashboard\Widgets\Widget;

final class RandomQuoteWidget extends Widget
{
    public string $quoteSource = 'artisan';
    public int $fakerLength = 200;

    // ...
}
```

Some widgets may only be useful once a condition has been met—like having a section to create entries in.
Your widget should always be _registered_, but you can make it conditionally _selectable_:

```php
public static function isSelectable(): bool
{
    // No distractions for administrators!
    return parent::isSelectable() && ! currentUser()?->isAdmin();
}
```

The base implementation is where we enforce single-instance widgets, which you can opt in- or out-of:

```php
protected static function allowMultipleInstances(): bool
{
    return false;
}
```

### Titles and Names

Widget types are identified by static _display names_.
These are not influenced by [configuration](#settings):

```php
public static function displayName(): string
{
    return t('Random Quote', category: '_demo-plugin');
}
```

A widget’s _title_ is only displayed when added to a dashboard, and while viewing its “front” face:

```php
public function getTitle(): string
{
    return t('Random {type} Quote', ['type' => Str::ucfirst($this->quoteSource)], '_demo-plugin');
}
```

You can also select an icon to represent the widget in the **New widget** menu:

```php
public static function icon(): string
{
    return 'quotes-left';
}
```

### Settings

You can make your widgets configurable by defining public properties, presenting a succinct settings [form](forms.md), and validating incoming options.

```php
public function settingsForm(FormContext $context = new FormContext): ?Form
{
    $form = Form::make();

    // Always include the source selector:
    $form->add(Field::make(t('Quote source', category: '_demo-plugin'), Choice::make('quoteSource')
        ->options([
            ['label' => 'Artisan', 'value' => 'artisan'],
            ['label' => 'Faker', 'value' => 'faker'],
        ])
        ->reactive()));

    // When using Faker, let them customize the length of the generated text:
    if ($this->quoteSource === 'faker') {
        $form->add(Field::make(t('Target length', category: '_demo-plugin'), Number::make('fakerLength'))
            ->instructions(t('Approximate length in characters of the generated text.', category: '_demo-plugin')));
    }

    return $form;
}
```

Hide the widget’s configuration UI entirely by returning `null` (or not implementing `settingsForm()` at all).

Validate settings input by declaring a `getRules()` method:

```php
public function getRules(): array
{
    return [
        'quoteSource' => ['required', Rule::in(['artisan', 'faker'])],
        'fakerLength' => ['integer', 'nullable'],
    ];
}
```

See the [rules and validation](validation.md) documentation for more information.

::: danger
Do not render arbitrary HTML or Twig provided by a user!
Anyone with control panel access can configure widgets.
:::

### Component

Widgets are backed by Vue components, and are rendered in the client.
Your `component()` method must return a valid component name (built-in or plugin-provided), and `props()` should return a compatible set of props to hydrate it.

If you only need to render HTML, use `craft:html-widget`:

```php
use Illuminate\Foundation\Inspiring;

public function component(): string
{
    return 'craft:html-widget';
}

public function props(): array
{
    $quote = Inspiring::quotes()->random();

    return [
        'html' => template('_demo/quote-widget', $quote),
    ]
}
```

Custom components must be registered in a publishable JavaScript file:

::: code
```js Registration
import QuoteWidget from './components/QuoteWidget.vue';

Cp.booting(function () {
    Cp.$components.register('demo-random-quote-widget-vue', QuoteWidget);
});
```
```js Component
<script setup>
const props = defineProps({
    widget: Object,
});
const text = widget.data.text;
const author = widget.data.author;
</script>

<template>
    <craft-card>
        <slot name="header" />
        {{ html }}
    </craft-card>
</template>
```
:::

Vue is not mandatory!
You can also register a simple renderer:

```js
Cp.$components.register('demo-random-quote-widget-simple', {
    props: {
        widget: Object,
        data: Object,
    },
    render() {
        return '...';
    }
});
```

Craft emits client-side lifecycle events for every widget:

```js
window.addEventListener('craft:widget-mounted', function (e) {
    const $element = e.detail.element;
    const widget = e.detail.widget;

    if (widget.type !== 'CraftCms\\DemoPlugin\\Widgets\\RandomQuoteWidget') {
        return;
    }

    console.log('Quote widget loaded!');
});

window.addEventListener('craft:widget-unmounted', function (e) { /* ... */ });
```

## Registration

A plugin can register any number of widget _types_, declaratively:

```php
namespace MyOrg\MyPlugin;

use CraftCms\Cms\Plugin\Plugin as BasePlugin;

class Plugin extends BasePlugin
{
    protected array $widgets = [
        Widgets\RandomQuoteWidget::class,
    ];
}
```

From any other service provider, you can add a widget using the [registry](registries.md):

```php
use CraftCms\Cms\Dashboard\WidgetTypes;

public function boot(
    WidgetTypes $widgetTypes,
): void
{
    $widgetTypes->register(Widgets\RandomQuoteWidget::class);
}
```

## Template-Driven Widgets

Projects can include generic “HTML” widgets by placing Markdown files (`*.md`) in the `resources/widgets/` directory:

```md
---
handle: 'welcome'
label: 'Welcome Widget'
icon: 'hand-wave'
title: 'Welcome to Craft CMS 6.x'
subtitle: 'This widget is defined entirely in Markdown'
maxColspan: 4
showByDefault: true
---

The `body` of a widget can be any valid Markdown, including <u>raw HTML</u>.
Note that Twig is _not_ evaluated.
```

YAML frontmatter is used to populate instances of `CraftCms\Cms\Dashboard\Widgets\Custom`.

Craft exposes these alongside all other widget types, and will them to new users’ dashboards automatically when `showByDefault` is `true`.
Users can individually remove default widgets using the <Icon type="cog" /> settings menu.
