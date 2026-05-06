# Field Types

Fields are wholly a Craft concept, and therefore isolated from many of the internal changes.
The most significant differences are apt to be in how you register field types and field layout elements, and those classes’ validation rules.

## Registration

Add your field type classes to `Plugin::$fieldTypes` and they will be registered automatically.
Outside a plugin, listen to `CraftCms\Cms\Field\Events\RegisterFieldTypes`, and push your field class into the event’s `types` property.

Field layout elements must be registered via the `CraftCms\Cms\FieldLayout\Events\DefineUIElements` or `DefineNativeFields` events, as there is no corresponding plugin property.

### Rules

Depending on complexity, field types can define two sets of validation rules:

- `getRules()` — The field’s own settings, set by a developer and stored in project config.
- `getElementRules()` — Rules for the content stored by each instance of the field on an element, which get merged into the elements’ rules at runtime.

::: tip
The adapter takes care of wrapping Yii validation rules from the corresponding legacy `defineRules()` and `getElementValidationRules()` methods.
:::

<See path="validation.md" />
