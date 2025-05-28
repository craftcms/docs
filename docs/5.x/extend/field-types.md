---
description: Custom field types are an essential piece of Craft’s powerful content modeling toolkit.
---

# Field Types

Plugins can provide custom [field types](../system/fields.md) by creating a class that implements <craft5:craft\base\FieldInterface> and <craft5:craft\base\FieldTrait>. This class serves as both a way to communicate features and behaviors of the field type (like [how it stores data](#database-type) and [what kinds of values](#php-type) it exposes), and as a model that fields of its type will be instantiated with (when used in a field layout or loaded via the API).

Field types are primarily concerned with providing [novel authoring interfaces](#inputs), and storing data in a sensible way. Most fields _do not_ control how that data is displayed in the front-end; instead, they yield a [minimally-normalized](#php-type) value to developers, who can then use it in any number of contexts.

## Field Class

Scaffold a field type with the [generator](generator.md):

<Generator component="field-type" plugin="my-plugin" />

If you would prefer to write a field class from scratch, it should extend <craft5:craft\base\Field>. The base implementation provides some sane defaults, but lacks many specifics that differentiate your field.

Refer to Craft’s own field classes (located in `vendor/craftcms/cms/src/fields/`, or the `craft\fields` namespace) for examples. You may be able to start with a more specific base field type, if your field’s anticipated value type(s) are compatible.

## Registering Custom Field Types

Field classes must be registered with the `Fields` service so Craft knows about it when populating the list of available field types:

```php
<?php
namespace mynamespace;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use yii\base\Event;
use mynamespace\fields\MyField;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function(RegisterComponentTypesEvent $event) {
                $event->types[] = MyField::class;
            }
        );

        // ...
    }

    // ...
}
```

If you used the generator to scaffold the field type, it ought to have inserted this, automatically. You may register as many field types as you wish, from one `EVENT_REGISTER_FIELD_TYPES` event handler.

### Missing Fields

If your field class ever goes missing (say, because a developer uninstalls your plugin or removes the package), Craft will use an instance of <craft5:craft\fields\MissingField>, and display a message in any field layouts it was present in. This ensures the control panel doesn’t become inoperable, but doesn’t prevent front-end templates from breaking.

## Settings

Field types can offer any number of settings that determine how individual fields behave. [Plain text](../reference/field-types/plain-text.md) fields (<craft5:craft\fields\PlainText>), for instance, have **Placeholder Text** and **Field Limit** settings, whereas [country](../reference/field-types/country.md) fields have no options.

Your field type’s settings should be represented as class properties, and `getSettingsHtml()` should return markup for corresponding form inputs:

```php
public bool $useSecurities = false;

// ...

public function getSettingsHtml(): ?string
{
    return Craft::$app->getView()->renderTemplate('my-plugin/fields/currency/settings', [
        'field' => $this,
    ]);
}
```

The template might look something like this:

```twig
{# Import field helpers from Craft: #}
{% import "_includes/forms" as forms %}

{{ forms.lightswitchField({
    label: 'Use securities symbols?'|t('my-plugin'),
    instructions: 'Enable this to allow arbitrary ISIN (ISO6166) symbols.'|t('my-plugin'),
    id: 'currency-allow-securities',
    name: 'useSecurities',
    on: field.useSecurities,
}) }}
```

When an admin is creating or editing a field in the control panel, Craft displays this output below the **Field Type** dropdown menu. Its inputs are namespaced such that <craft5:craft\controllers\FieldsController::actionSaveField()> can assign the settings onto an instance of your field type.

Ultimately, your field type’s settings are serialized into [project config](project-config.md). If your class has non-scalar public properties, or uses a getter/setter pattern around a private property, you may need to explicitly declare the attributes that should be considered “settings” (via `settingsAttributes()`) or return a custom array of settings (via `getSettings()`):

```php
/**
 * Return a list of properties that include settings that should be preserved in project config:
 */
public function settingsAttributes(): array

    // Let Craft determine most, automatically:
    $names = parent::settingsAttributes();

    // Add an attribute...
    $names[] = 'someVirtualProperty';

    // ...or remove one:
    $names = ArrayHelper::withoutValue('someEphemeralProperty');

    return $names;
}

/**
 * Directly return the array that will be packed into project config:
 */
public function getSettings(): array
{
    $settings = parent::getSettings();

    // Sections should be stored as UUIDs, not models:
    $settings['restrictCurrenciesBySectionUsage'] = array_map(fn(Section $s) => $s->uid, $this->_sections);

    return $settings;
}
```

Craft automatically handles serialization of settings that resolve to `DateTime` objects or enums. Read more about handling these values (and taking advantage of environment variables and aliases) on the [project config](project-config.md) page.

::: warning
Even though the `Section` models in this example can _technically_ be serialized and stored in their entirety, you are strongly encouraged to store only a stable identifier that can be dereferenced at runtime—typically its UUID.
:::

## Inputs

A core part of a field’s identity is how authors populate it with data. You are responsible for returning the appropriate markup from an `inputHtml()` method:

```php
use craft\helpers\Cp;

protected function inputHtml(mixed $value, ?ElementInterface $element, bool $inline): string
{
    $id = $this->getInputId();

    $components = [
        Cp::selectizeHtml([
            'id' => "$id-currency",
            'describedBy' => $this->describedBy,
            'name' => "$this->handle[currency]",
            'value' => $value->currency ?? null,
            'options' => $this->getCurrencyOptions(),
            'disabled' => $static,
        ]),
        Cp::textHtml([
            'id' => "$id-amount",
            'name' => "$this->handle[amount]",
            'value' => $value->amount ?? null,
            'type' => 'number',
            'size' => 10,
        ]),
    ];

    return join('', $components);
}
```

In many of Craft’s built-in field types, this method returns different markup depending on the field’s settings. Our currency field example might have two primary “branches,” depending on whether arbitrary security symbols are allowed:

```php
use craft\base\ElementInterface;
use craft\helpers\Cp;

protected function inputHtml(mixed $value, ?ElementInterface $element, bool $inline): string
{
    $id = $this->getInputId();

    $components = [];

    if ($this->useSecurities) {
        $components[] = Cp::textHtml([
            'id' => "$id-security-symbol",
            'name' => "$this->handle[symbol]",
            'value' => $value->symbol ?? null,
            'type' => 'text',
            'class' => 'code',
            'size' => 14,
        ]);
    } else {
        $components[] = Cp::selectizeHtml([
            'id' => "$id-currency-symbol",
            'describedBy' => $this->describedBy,
            'name' => "$this->handle[symbol]",
            'value' => $value->symbol ?? null,
            'options' => $this->getCurrencyOptions(),
            'disabled' => $static,
        ]);
    }

    $components[] = Cp::textHtml([
        'id' => "$id-amount",
        'name' => "$this->handle[amount]",
        'value' => $value->amount ?? null,
        'type' => 'number',
        'size' => 10,
    ]);

    return join('', $components);
}
```

::: tip
You can also render a template instead of generating HTML directly from PHP, like we did for the [settings](#settings) inputs.
:::

### Read-Only Mode

Craft will handle the static or read-only mode for most simple inputs by adding the appropriate HTML attributes, automatically. If you would prefer to control that output directly, define a `getStaticHtml()` method.

Read-only representations of fields are most commonly encountered when viewing element revisions, and are intended to resembles the regular input—in contrast to [previews](#previews) for indexes and element cards, which display a final, formatted value.

### Inline Editing

You also have an opportunity to provide a simplified or alternative input for the [inline editing](../system/elements.md#in-line-editing) mode on element indexes. When a field implements <craft5:craft\base\InlineEditableFieldInterface>, Craft will call its `inputHtml()` method with the `$inline` argument set to `true`:

```php{8-10}
use Craft;
use craft\helpers\Html;

// ...

public function inputHtml(mixed $value, ?ElementInterface $element, bool $inline): string
{
    if ($inline) {
        // Return a simplified UI element, or a static representation
    }

    // Return the normal UI
}
```

## Validation

Field types provide two sets of [validation rules](guide:structure-models#validation-rules).

### Settings Rules

Like other configurable models, your field type’s static `defineRules()` method should return an array of rules that govern its own [settings](#settings).

### Value Rules

When a developer adds an instance of your field type to a field layout, you have an opportunity to contribute rules to the element’s validation, via [`getElementValidationRules()`](craft5:craft\base\Field::getElementValidationRules()):

```php
public function getElementValidationRules(): array
{
    return [
        [
            'string',
            'length' => 3,
        ],
        [
            'in',
            'range' => $this->getSupportedCurrencySymbols(),
        ],
    ];
}
```

Rules defined in this way should _not_ include the field or field instance handle—Craft normalizes the returned rules so that they apply to the current instance. You can, however, use the field’s configuration to conditionally apply some rules:

```php
public function getElementValidationRules(): array
{
    // Set up some default rules that apply to all instances:
    $rules = [
        // ...
    ];

    // Fields that allow allows ISIN (ISO6166) codes for stocks and other securities require special validation:
    if ($this->useSecurities) {
        $rules[] = ['validateSymbol'];
    }

    // Otherwise, just make sure the provided value is among a known list of currencies:
    if (!$this->useSecurities) {
        $rules[] = [
            'in',
            'range' => $this->getSupportedCurrencySymbols(),
        ];
    }

    // Return the final list:
    return $rules;
}
```

::: tip
In this example, `validateSymbol` is a method _on the field class itself_—not the element being validated. Craft normalizes this in such a way that the validation method will be correctly located and bound.
:::

When the effective rules differ this greatly, however, it may be a sign that your field type should actually be _two_ distinct types. Short of that, field settings can also influence the sort of [inputs](#inputs) you display to an author: for this “currency” field, the default appearance could be a dropdown menu with a fixed set of known options; then, in “securities” mode, it could switch to a plain-text input with a placeholder value that takes the shape of a typical ISIN.

### Emptiness

Implement the `isValueEmpty()` to tell Craft what kinds of values you consider “empty.” Internally, we use this to determine whether an author explicitly selected a value (or if it’s a default or incidental) in the process of saving elements and propagating content between sites. The base method treats `null` and zero-length arrays (`[]`) and strings (`''`) as empty.

## Previews

In order for your field type to be displayed on [element indexes](../system/elements.md#indexes) or [cards](../system/elements.md#chips-cards), it must implement <craft5:craft\base\PreviewableFieldInterface>. Some field types will work with no additional configuration, as the base <craft5:craft\base\Field\getPreviewHtml()> method handles a number of common value types including booleans, dates, and anything that can be cast to a string.

You can override this method to apply custom formatting, and take into consideration the field’s configuration:

```php
public function getPreviewHtml(mixed $value, ElementInterface $element): string
{
    // Display securities amounts + symbols, verbatim:
    if ($this->useSecurities) {
        return $value->amount . ' ' . Html::tag('code', $value->symbol);
    }

    // Display a flag for the currency and a formatted value:
    return MyCurrencyHelper::currencyToFlagSvg($value->symbol) . MoneyHelper::toString($value->amount);
}
```

### Placeholder

When a developer is configuring an element card via the field layout designer, it is helpful to show a representative “placeholder” value. Define a `previewPlaceholderHtml()` method, and return an HTML fragment with some [greeked](https://en.wikipedia.org/wiki/Greeking) content:

```php
public function previewPlaceholderHtml(mixed $value, ?ElementInterface $element): string
{
    return Html::tag('code', 'XX-123456789');
}
```

The `value` and `element` arguments are not currently used.

## Supporting Delta Saves

Craft does its best to reduce the amount of unnecessary content churn, and provide a record of what fields change in each draft and revision. The fields that are part of a “delta” save are in large part determined by client-side JavaScript in the control panel that observes `form` elements and only submits updated values. As long as you are using semantic HTML inputs, you don’t typically need to do anything to support delta saves.

However, if your field type needs to perform some post-processing in [afterElementSave()](<craft5:craft\base\FieldInterface::afterElementSave()>) or [afterElementPropagate()](<craft5:craft\base\FieldInterface::afterElementPropagate()>) (say, fetching data from a remote API), you can skip those tasks when the field’s value is unchanged by checking [isFieldDirty()](<craft5:craft\base\ElementInterface::isFieldDirty()>):

```php
public function afterElementSave(ElementInterface $element, bool $isNew): void
{
    if ($element->isFieldDirty($this->handle)) {
        // logic for handling saved element
    }

    parent::afterElementSave($element, $isNew);
}
```

::: tip
Craft considers a field “dirty” as soon as it’s been set, even if the new and old values are effectively the same.
:::

## Storing Content

Craft can take care of storing and retrieving content for your field type, so long as it declares valid [PHP](#php-type) and [database](#database-type) value types. In doing so, you also give Craft an idea about what default [element query capabilities](#query-api)) your field type will support.

### PHP Type

At runtime, Craft generates a special class (`CustomFieldBehavior`) that includes properties and type hints for each custom field. You are responsible for returning a valid PHP [type declaration](https://www.php.net/manual/en/language.types.declarations.php):

```php
public static function phpType(): string
{
    // The field’s value can be `null` or any class that implements a special `CurrencyInterface` interface:
    return sprintf('\\%s|null', CurrencyInterface::class);
}
```

This type declaration must describe the kinds of values your field type returns from its [`normalizeValue()`](craft5:craft\base\Field::normalizeValue()) method:

```php
public function normalizeValue(mixed $value, ?ElementInterface $element): mixed
{
    // Already normalized?
    if ($value instanceof BaseCurrency) {
        return $value;
    }

    // Not set?
    if ($value === null) {
        return null;
    }

    // Misconfigured in some other way?
    if (!is_array($value)) {
        return null;
    }

    return BaseCurrency::create($value);
}
```

Of course, this example hides some of the complexity behind the implementation of other classes—but let’s look at how returning a class affects the developer API:

```twig
{# Output a formatted amount in the selected currency: #}
{% set currency = entry.myCurrencyField %}
{{ curreny.amount | currency(currency.symbol) }}

{# Output just the currency: #}
{{ entry.myCurrencyField.symbol }}
```

### Database Type

Similarly, Craft needs to know the “shape” of values your field type stores, in the database. This can be a singular value type, an array of types representing nested keys, or `null` to signal that your plugin [manages its own content](#custom-tables):

::: code
```php Simple Type
use yii\db\Schema;

// ...

public static function dbType(): array|string|null
{
    return Schema::TYPE_INTEGER;
}
```
```php Complex/Nested Types
use yii\db\Schema;

// ...

public static function dbType(): array|string|null
{
    return [
        'amount' => Schema::TYPE_INTEGER,
        'symbol' => Schema::TYPE_STRING,
    ];
}
```
:::

When returning an array, the order of values is significant! Unless otherwise specified in `queryCondition()`, Craft will use the first key and type when generating coalesce expressions for `WHERE` clauses and [ordering](#sortable-fields).

::: tip
If your field needs to store a more deeply-nested data structure (or one of unknown structure), consider using `Schema::TYPE_JSON`.
:::

### Multi-Instance Fields

Craft treats any field that returns a non-`null` value from `dbType()` as implicitly supporting [multiple instances](../system/fields.md#multi-instance-fields) per field layout, but you can explicitly opt in or out:

```php
public static function isMultiInstance(): bool
{
    return true;
}
```

<Block label="How Field Instances Work">

The database’s `COALESCE()` function is used to discover values among field instance candidates. For example: an entry query may involve any field layout provided via an entry type. Those field layouts can contain field layout elements with overlapping handles—but they are each guaranteed a unique UUIDs under which their content is indexed in the element’s JSON blob.

In order to `SELECT` that data and build `WHERE` and `ORDER BY` expressions, Craft must look at each possible “location” for field data with that handle. This means that despite scanning multiple candidate keys in the JSON blob, only one will ever be contain a value for a given element! At the same time, however, it’s possible that a single handle is used by two otherwise unrelated fields or field types—in these cases, Craft uses the first instance’s handle to build a [query condition](#query-api).

</Block>

### Custom Tables

If you’d rather have your field type store its content in a separate database table, you can return `null` from `dbType()`. You are then responsible for managing…

- …creation, duplication, retrieval, and deletion of field content in the database;
- …support for drafts, revisions, and [sites and localization](../system/sites.md);
- …[multi-instance](#multi-instance-fields) support;
- …inclusion of content fields in element queries and GraphQL;
- …automatic de/serialization + normalization of values;

On the other hand, you get access to a variety of powerful database capabilities, like foreign key constraints, custom indexes, joins, selections, and so on. 

### Sortable Fields

Custom fields that use the native content storage system (not a [custom table](#custom-tables)) are automatically orderable via database queries:

```twig
{% set topAssets = craft.entries()
  .orderBy('myCurrencyField DESC')
  .limit(5)
  .all() %}
```

Craft determines how to sort the data using the `dbType()`’s first (or only) key and type. In [our example](#database-type), that would be either the single “simple” value, or the nested `amount` key.

::: tip
Developers may specify a nested key using dot notation to override the default. <Since ver="5.6.0" feature="Ordering by nested field keys" />

```twig{2}
{% set assetsBySymbol = craft.entries()
  .orderBy('myCurrencyField.symbol ASC')
  .all() %}
```
:::

To be eligible for sortable columns within [element indexes](../system/elements.md#indexes), field types must implement <craft5:craft\base\SortableFieldInterface> and the `getSortOption()` method. The default implementation from <craft5:craft\base\Field> covers most use cases, again using the first `dbType()`. You can override this to gain more control over the handling—suppose the field’s values don’t naturally sort how users would expect, as is often the case with “statuses” or other strings whose order in a process don’t agree with their alphabetic order:

```php
public function getSortOption(): array
{
    $col = $this->getValueSql();

    // Re-map statuses so they are "in order," semantically (not alphabetically):
    $orderBy = <<<SQL
CASE
    WHEN $col = "draft" THEN 0
    WHEN $col = "submitted" THEN 1
    WHEN $col = "approved" THEN 2
    WHEN $col = "published" THEN 3
    ELSE 4
END; 
SQL;

    // This is identical to the base implementation:
    return [
        'label' => Craft::t('site', $this->name),
        'orderBy' => $orderBy,
        'attribute' => isset($this->layoutElement->handle)
            ? "fieldInstance:{$this->layoutElement->uid}"
            : "field:$this->uid",
    ];
}
```

::: tip
Notice that we’re using the [`site` translation category](../system/sites.md#static-message-translations) for the sort option’s `label`! A field’s `name` is chosen by the developer as they build a site; this allows them to localize those names for control panel users.
:::

## Query API

A key quality of your field type is its developer API and query capabilities. Each instance of your field type automatically gets a corresponding query method, which provides many of the basic features you would expect, like automatic `and` and `or` handling, inversion with `not`, `:empty:` and `:notempty:` tokens, operators, and so on.

For additional control over your field type’s query features, implement the static `queryCondition()` method:

```php
public static function queryCondition(
    array $instances,
    mixed $value,
    array &$params,
): array|string|ExpressionInterface|false|null {
    if (is_array($value)) {
        $conditions = [];

        // Build COALESCE() “column” names to properly extract nested values from
        // all possible uses of a field across eligible field layouts:
        if (isset($value['type'])) {
            $valueSql = static::valueSql($instances, 'symbol');

            $conditions[] = match ($value['type']) {
                'currency' => new Expression("CHAR_LENGTH($valueSql) = 3"),
                'security' => new Expression("CHAR_LENGTH($valueSql) = 12"),
            };
        }

        if (isset($value['amount'])) {
            $valueSql = static::valueSql($instances, 'amount');
            $conditions[] = Db::parseNumericParam($valueSql, $value['amount']);
        }

        if (isset($value['symbol'])) {
            $valueSql = static::valueSql($instances, 'symbol');
            $conditions[] = Db::parseParam($valueSql, $value['symbol']);
        }

        // Did we come up with anything?
        if (!empty($conditions)) {
            return $conditions;
        }
    }

    // Everything else can be handled by the default behavior:
    return parent::queryCondition($instances, $value, $params);
}
```

Expressed in Twig (where a developer using your plugin is most apt to encounter these features), queries might look like this:

```twig
{# Find assets with a "zero" amount: #}
{% set zeroValueAssets = craft.entries().myCurrencyField(0).all() %}

{# Find USD assets: #}
{% set usdAssets = craft.entries()
    .myCurrencyField({
        symbol: 'USD',
    })
    .all() %}

{# Find US-based securities: #}
{% set domesticSecurities = craft.entries()
    .myCurrencyField({
        type: 'securities',
        symbol: 'US-*',
    })
    .all() %}
```

By intercepting and processing a couple of extra cases, we’re able to solve common problems for developers that would otherwise require advanced SQL knowledge.

::: tip
Return `false` if the provided `$value` is invalid or unprocessable to skip applying conditions entirely.
:::
