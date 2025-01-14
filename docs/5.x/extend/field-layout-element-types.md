---
description: Create composable editing and UI components for field layouts.
sidebarDepth: 2
related:
  - uri: ../system/fields.md
    label: Fields + Field Layouts
  - uri: ../system/elements.md
    label: Introduction to Elements
  - uri: element-types.md
    label: Element Types
  - uri: field-types.md
    label: Field Types
---

# Field Layout Elements

In addition to content fields, developers can add a handful of other built-in _field layout elements_ to their [field layouts](../system/fields.md#field-layouts) to optimize the author’s attention or productivity. Craft uses field layout elements for titles, some [address](../reference/element-types/addresses.md) components, alt text on [assets](../reference/element-types/assets.md), native [user](../reference/element-types/users.md) attributes, and more. They also power “UI” elements like horizontal rules, breaks, and templates.

Plugins can supplement the built-in field layout elements by creating and registering a class that extends <craft5:craft\base\FieldLayoutElement>. Broadly speaking, field layout elements come in two flavors:

- **Fields** — Features that enhance (or are essential to) collecting data for an element. **Title** fields, users’ **Email** field, and Commerce’s **Variants** nested element management interface are examples of fields. Fields typically extend <craft5:craft\fieldlayoutelements\BaseField> (or one of its subclasses).
- **UI** — Optional features that can be added any number of times, and are not part of the critical authoring path. The built-in **Template** and **Tip** components are examples of UI elements, and are based on <craft5:craft\fieldlayoutelements\BaseUiElement> (or one of its subclasses).

All layout elements are rendered in the context of an element, and support user and element conditions in addition to their own custom settings. We’ll look at how you can adopt these behaviors via your class’s [inheritance](#base-definitions), [public properties](#settings-features), and configuration.

::: tip
Plugins that provide field types _do not_ need to maintain their own field layout element! Instead, they should [return HTML appropriate to the editing context](field-types.md#inputs), which will be wrapped in an instance of <craft5:craft\fieldlayoutelements\CustomField>.
:::

Field layout elements are only used to build the body of the element editor. The sidebar (or “metadata” column), header, and toolbar are managed by each [element type](element-types.md), individually, but can be customized using [events](events.md).

## Class + Registration

Create a new class that extends <craft5:craft\base\FieldLayoutElement> (or one of the [other existing types](#base-definitions)). Our example will display some sort of read-only status information from an external source:

```php
namespace myplugin\fieldlayoutelements;

use Craft;
use craft\base\ElementInterface;
use craft\fieldlayoutelements\BaseUiElement;
use craft\helpers\Html;

class SynchronizationStatus extends BaseUiElement
{
    public function selectorLabel(): string
    {
        return Craft::t('site', 'Synchronization Status');
    }

    public function formHtml(?ElementInterface $element = null, bool $static = false): ?string
    {
        return Html::tag('div', 'Hello, world!');
    }

    protected function selectorIcon(): ?string
    {
        return 'satellite-dish';
    }
}
```

This is only the minimum implementation for a _UI_ field layout element. Explore deeper customization options in the [base definitions](#base-definitions) and [settings](#settings) sections.

To register a field layout element, add the appropriate event listener:

- For native fields, use <craft5:craft\models\FieldLayout::EVENT_DEFINE_NATIVE_FIELDS>;
- For UI elements, use <craft5:craft\models\FieldLayout::EVENT_DEFINE_UI_ELEMENTS>;

::: code
```php Fields
use craft\events\DefineFieldLayoutElementsEvent;
use craft\models\FieldLayout;
use yii\base\Event;

Event::on(
    FieldLayout::class,
    FieldLayout::EVENT_DEFINE_NATIVE_FIELDS,
    function(DefineFieldLayoutFieldsEvent $event) {
        /** @var FieldLayout $layout */
        $layout = $event->sender;

        if ($layout->type === MyElementType::class) {
            $event->fields[] = MyNativeField::class;
        }
    }
);
```
```php UI Elements
use craft\events\DefineFieldLayoutElementsEvent;
use craft\models\FieldLayout;
use yii\base\Event;

Event::on(
    FieldLayout::class,
    FieldLayout::EVENT_DEFINE_UI_ELEMENTS,
    function(DefineFieldLayoutFieldsEvent $event) {
        $event->elements[] = SynchronizationStatus::class;
    }
);
```
:::

In the first example (registering a “native field”), we perform a check to make sure the layout element is only available in layout designers that target a specific element type.

## Base Definitions

Craft includes a handful of abstract types that can be extended to leverage specific features and provide hints as to the layout element’s purpose:

- <craft5:craft\fieldlayoutelements\BaseUiElement> — A static component that typically does not correspond to a specific element property or accept input. Its appearance and output can still
- <craft5:craft\fieldlayoutelements\BaseField> — Common features for native and custom fields, including a label, instructions, tip, warning, whether or not input is “required,” and whether its underlying attribute can be rendered in [element cards](../system/elements.md#chips--cards) or provide [thumbnails](../system/elements.md#chips--cards). HTML inputs that are rendered into layout elements that extend this class are automatically factored in to change tracking, and their values are sent to Craft when saving an element.
- <craft5:craft\fieldlayoutelements\BaseNativeField> — A subclass of `BaseField` that is intended for use with native element attributes (or an attribute provided via a [behavior](behaviors.md)).
- <craft5:craft\fieldlayoutelements\TextField> — General-purpose input element suitable for most scalar values. You can customize many of the underlying HTML element’s attributes via class properties—see below for an example.

::: tip
Somewhat counterintuitively, the <craft5:craft\fieldlayoutelements\CustomField> class is _not_ intended to be extended. Craft automatically wraps each custom field instance with this layout element, exposing
:::

### Ad-Hoc Elements

In some cases, you may not need to create a dedicated class at all! Suppose we were creating a custom element type to manage currencies and exchange rates—the element type might have a property like `$symbol` to hold a three-character ISO code, which we want to let administrators edit alongside other custom fields. Instead of a custom class, we could register a suitable layout element based on the `TextField` class:

```php
namespace myplugin;

use craft\events\DefineFieldLayoutElementsEvent;
use craft\fieldlayoutelements\TextField;
use craft\models\FieldLayout;
use yii\base\Event;
use myplugin\elements\Currency;

Event::on(
    FieldLayout::class,
    FieldLayout::EVENT_DEFINE_NATIVE_FIELDS,
    function(DefineFieldLayoutFieldsEvent $event) {
        /** @var FieldLayout $layout */
        $layout = $event->sender;

        if ($layout->type === Currency::class) {
            $event->fields[] = [
                'class' => TextField::class,
                'type' => 'text',
                'title' => Craft::t('my-plugin', 'Currency Symbol'),
                'maxlength' => 3,
                'placeholder' => 'USD',
                'autocorrect' => false,
                // ...
            ];
        }
    }
);
```

You can register any value compatible with <craft5:Craft::createObject()>, including strings (like the fully-qualified class name in the previous section), a config object (as above), or an already- instantiated object.

## Settings + Features

For a comprehensive list of methods and properties you can use to customize a field layout element’s behavior, refer to the classes that extend <craft5:craft\base\FieldLayoutElement>. The most important divide in feature sets is between _UI Elements_ (classes that extend <craft5:craft\fieldlayoutelements\BaseUiElement>) and _Fields_ (classes that extend <craft5:craft\fieldlayoutelements\BaseField>). Features available to one or the other are noted.

### Cosmetic

These settings exist primarily to improve the usability and accessibility of fields and UI elements in field layouts.

#### Selector Label

The label displayed when viewing a field layout element in the selector palette, and when it appears within a field layout designer.

```php
protected function selectorLabel(): string
```

#### Icon

An icon that helps identify layout elements of the same type. In mosts cases, this return value should be consistent—but Craft makes use of it to bubble up [dynamic icons](craft5:craft\fieldlayoutelements\CustomField::selectorIcon()) from custom fields.

```php
protected function selectorIcon(): ?string
```

#### Width

By default, field layout elements are full-width. Opt-in to customizable width using `hasCustomWidth()`:

```php
public function hasCustomWidth(): bool
{
    return true;
}
```

#### Indicators (Fields)

To make field layout elements more useful at-a-glance, they support icon-based “indicators.” Craft handles many built-in features (like fields marked as _Required_, or elements with configured conditions), but you can supplement them with your own indicators.

```php
protected function selectorIndicators(): array
{
    // Preserve built-in indicators:
    $indicators = parent::selectorIndicators();

    if ($this->someCustomSetting) {
        $indicators[] = [
            'label' => Craft::t('my-plugin', 'This field layout element may behave differently!'),
            'icon' => 'triangle-exclamation',
            'iconColor' => 'fuchsia',
        ];
    }

    return $indicators;
}
```

#### Label and Instructions (Fields)

Bind assistive text to a native field input.

```php
public ?string $label = null;
public ?string $instructions = null;
```

Override the `defaultLabel()` and `defaultInstructions()` methods instead, if you wish to allow users to customize labels and instructions—or to provide translatable defaults.

#### Tips + Warnings (Fields)

In addition to [labels and instructions](#label-and-instructions-fields), fields can provide a `tip` and `warning` box below their markup.

```php
public ?string $tip = null;
public ?string $warning = null;
```

These strings should be plain text or Markdown; HTML is encoded before parsing.

### Functional

These settings govern the actual behavior and configurability of your field layout element, throughout the system.

#### Multi-instance

Whether your field layout element can be added to a layout more than once. Typically, native fields _do not_ support this, as they represent an underlying element property. Most UI elements _do_, except in cases where multiple instances would be redundant or confusing. Consider that semi-dynamic UI elements may be rendered at different times—say, in response to a new tab becoming visible—and therefore show different information.

```php
public function isMultiInstance(): bool
{
    return true;
}
```

#### Settings Support

If your field layout element has aspects that should be configurable on a per-instance basis, you should return `true` from `hasSettings()`:

```php
public function hasSettings()
{
    return true;
}
```

It is then your responsibility to render additional settings HTML:

```php
protected function settingsHtml(): ?string
{
    return Cp::lightswitchFieldHtml([
        'label' => Craft::t('my-plugin', 'Refresh automatically?'),
        'instructions' => Craft::t('my-plugin', 'Periodically refresh the sync status while the element editor is open and in the foreground.'),
        'id' => 'autoRefresh',
        'name' => 'autoRefresh',
        'on' => $this->autoRefresh,
    ]);
}
```

This markup is prepended to any default settings, like the user and element condition builders. Craft hides the **Settings** action for a field layout element if it doesn’t support [conditions](#conditions) and doesn’t explicitly return `true` from `hasSettings()`.

#### Conditions

All field layout elements support conditions, by default. Opt-out by returning `false` from a `conditional()` method:

```php
protected function conditional(): bool
{
    return false;
}
```

#### Mandatory (Fields)

You can force a field layout element to be present in any field layout it is supported in by marking it as “mandatory:”

```php
public function mandatory(): bool
{
    return false;
}
```

If a mandatory field layout element has not been explicitly added to a field layout via a field layout designer, Craft injects it at the bottom of the first tab (when rendering the layout) to ensure it is available to authors.

#### Requirable (Fields)

When added to a layout, you can include a **Make required/optional** action (along with a corresponding [indicator](#indicators-fields)). The state of this selection is available when rendering a field layout element as the `required` property, and can be used in your `inputHtml()` method.

#### Thumbnail + Card Support (Fields)

Field layout elements also underpin Craft’s handling of [element chips and cards](../system/elements.md#chips-cards).

To make your field layout element available for selection as element thumbnails, implement the `thumbable()` and `thumbHtml()` methods:

```php
public function thumbable(): bool
{
    return true;
}

public function thumbHtml(ElementInterface $element, int $size): ?string
{
    $value = $element->{$this->attribute()};

    return Html::tag('div', Cp::fallbackIconSvg($value), ['class' => 'cp-icon']);
}
```

Any other kind of value can be exposed to element cards by returning `true` from a `previewable()` method:

```php
public function previewable(): bool
{
    return true;
}
```

You must then implement `previewHtml()` to return a representation of your data. By default, Craft will attempt to access a property of the element corresponding to your field layout element’s `attribute`.

```php
public function previewHtml(ElementInterface $element): string
{
    return Html::tag('code', Html::encode($element->{$this->attribute()}));
}
```

#### Fieldset (Fields)

Wrap the input HTML in a `fieldset`, and use special handling for labels, instructions, and errors.

```php
protected function useFieldset(): bool
{
    return true;
}
```
