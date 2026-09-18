# Field Types

Fields are wholly a Craft concept, and therefore isolated from many of the internal changes.
The most significant differences are apt to be in how you register field types and field layout elements, and those classes’ validation rules.

## Registration

Add your field type classes to `Plugin::$fieldTypes` and they will be registered automatically.
Outside a plugin, use the `CraftCms\Cms\Field\FieldTypes` registry:

```php
use CraftCms\Cms\Field\FieldTypes;

public function boot(FieldTypes $fieldTypesRegistry): void
{
    $fieldTypesRegistry->register(Backblaze::class);
}
```

Field layout elements must be registered via the `CraftCms\Cms\FieldLayout\Events\FieldLayoutUIElementsResolving` event, as there is no corresponding plugin property.

## Rules

Depending on complexity, field types can define two sets of validation rules:

- `getRules()` — The field’s own settings, set by a developer and stored in project config.
- `getElementRules()` — Rules for the content stored by each instance of the field on an element, which get merged into the elements’ rules at runtime.

::: tip
The adapter takes care of wrapping Yii validation rules from the corresponding legacy `defineRules()` and `getElementValidationRules()` methods.
:::

<See path="validation.md" />

## Settings

Field settings are defined with the new [form builder](forms.md).

Implement a `settingsForm()` method, and return a `CraftCms\Cms\Form\Form` fragment:

```php
use CraftCms\Cms\Form\Controls\Text;
use CraftCms\Cms\Form\Form;
use CraftCms\Cms\Form\FormContext;
use CraftCms\Cms\Form\Nodes\Field as FormField;

use function CraftCms\Cms\t;

public function settingsForm(FormContext $context = new FormContext): ?Form
{
    return Form::make([
        FormField::make(t('Validation pattern'))
            ->instructions(t('The regular expression that the field’s value must match.', category: 'my-plugin'))
            ->control(Text::make('expression')->value($this->expression)),
    ]);
}
```

Every time Craft calls `settingsForm()`, the field class is hydrated with the current input (valid or not).
Complex field settings can be hidden until they are relevant, using normal control flow:

```php
$validationStringColumns = [
    'value' => [
        'heading' => t('Value', category: 'my-plugin'),
        'type' => 'singleline',
    ],
];

$form = Form::make([
    FormField::make(t('Required strings'), Table::make('requiredSubstrings')
        ->columns($validationStringColumns)
        ->allowAdd()
        ->allowDelete()
        ->allowReorder())
        ->instructions(t('One or more strings that must be present in the value.', category: 'my-plugin')),
    FormField::make(t('Forbidden strings'), Table::make('forbiddenSubstrings')
        ->columns($validationStringColumns)
        ->allowAdd()
        ->allowDelete()
        ->allowReorder())
        ->instructions(t('One or more strings that are not allowed to be present in the value.', category: 'my-plugin')),
]);

// Allow direct control using regular expressions if the developer has not added any required/forbidden strings:
if (empty($this->requiredSubstrings) && empty($this->forbiddenSubstrings)) {
    $form->add(
        FormField::make(t('Validation pattern'), Text::make('expression')->value($this->expression))
            ->instructions(t('The regular expression that the field’s value must match.', category: 'my-plugin')),
    );
}

return $form;
```

::: tip
The [adapter](adapter.md) automatically injects HTML from your existing `getSettingsHtml()` method into a shim so they remain compatible with the form builder.
:::

## Input

Element forms also use the new [form builder](forms.md), but you are only responsible for the [control](forms.md#controls) part of the field.
Craft wraps the `CraftCms\Cms\Form\Contracts\Control` instance returned from your `formControl()` method in a complete field, using its configured label, instructions, and so on:

```php
public function formControl(FieldContext $context): Control
{
    return Choice::make($context->path)
        ->options([
            ['label' => t('Win'), 'value' => 'win', 'icon' => 'award'],
            ['label' => t('Loss'), 'value' => 'loss', 'icon' => 'face-frown'],
        ])
        ->multiple(static::$multi)
        ->value($this->encodeValue($context->value));
}
```

Like [settings](#settings), your input is rebuilt by the back-end whenever its value changes.
This means you can react to the current value (`$context->value`) and conditionally expose additional controls, instructions, or settings without registering any Javascript.

::: warning
Inline editing is still handled with plain HTML output, so your fields’ `inputHtml()` remains relevant.
This may change during the alpha.
:::
