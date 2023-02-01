# Element Types

<Todo notes="Include `ExpirableElementInterface`" />
<Todo notes="Mention `canSave()` and other permissions methods" />

Elements underpin Craft’s flexible and extensible content modeling features. You can supplement Craft’s eight [built-in element types](../elements.md#types) with your own, from a plugin or module.

As you implement common element features like [titles](#titles), [sources](#sources), or [statuses](#statuses), the native element classes will be an invaluable resource—both as templates for basic functionality and evidence of the flexibility of elements.

- <craft4:craft\elements\Address>
- <craft4:craft\elements\Asset>
- <craft4:craft\elements\Category>
- <craft4:craft\elements\Entry>
- <craft4:craft\elements\GlobalSet>
- <craft4:craft\elements\MatrixBlock>
- <craft4:craft\elements\Tag>
- <craft4:craft\elements\User>

You can refer to these classes for examples. They are located in `vendor/craftcms/cms/src/elements/`.

If your plugin needs to provide a new content type, architecting it as an element type is usually the best way to go.

## Getting Started

### Element Class

Element types are defined by classes which implement <craft4:craft\base\ElementInterface> and use <craft4:craft\base\ElementTrait>. The class will serve both as a source of information about your element type (using static methods), and as a model that elements of its type will be instantiated with. As a convenience, you can extend <craft4:craft\base\Element>, which provides a barebones element type implementation.

Your element class should be created in an `elements/` directory within your plugin’s source directory, and—per autoloading convention—be named the same as the file. Our examples will be based on a new “product” element, so the element class (`mynamespace\elements\Product`) will live in `src/elements/Product.php`.

::: tip
Use the [generator](./generator.md) to scaffold an element type from the command line!

```bash
php craft make element-type
```
:::

To start, we’ll give the class a handful of public properties and define two static methods that help the control panel render labels.

```php
<?php
namespace mynamespace\elements;

use craft\base\Element;

class Product extends Element
{
    public static function displayName(): string
    {
        return 'Product';
    }

    public static function pluralDisplayName(): string
    {
        return 'Products';
    }

    public int $price = 0;
    public string $currency;

    // ...
}
```

::: tip
The `lowerDisplayName()` and `pluralLowerDisplayName()` can also be explicitly defined, if you find that Craft doesn’t get them quite right.
:::

### Registration

Register your element type using the [EVENT_REGISTER_ELEMENT_TYPES](craft4:craft\services\Elements::EVENT_REGISTER_ELEMENT_TYPES) event from your plugin or module’s `init()` method:

```php
use mynamespace\elements\Product;
use craft\events\RegisterComponentTypesEvent;
use craft\services\Elements;
use yii\base\Event;

Event::on(
    Elements::class,
    Elements::EVENT_REGISTER_ELEMENT_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = Product::class;
    }
);
```

This is not a requirement for all element types, but provides automatic support for things like relational [condition rules](./conditions.md) and [reference tags](../reference-tags.md).

### Persisting Data

Part of what gives custom elements their power is the ability to store additional attributes in a predictable way—without depending on [custom fields](#custom-fields) or [content](#content). [Entries](../entries.md), for instance, have a post date (`postDate`), expiry date (`expiryDate`), and an author ID (`authorId`); [assets](../assets.md) track the underlying file’s extension and what volume and folder they belong to.

While elements automatically get support for storing relations, custom field data, titles, slugs and URIs, , it’s your plugin’s responsibility to create and maintain an appropriate database schema for persisting its native attributes. For our product element type, we’ll need a new table with at least `price` and `currency` columns.

We’re going to set up the mechanisms of persistence now, and will cover [accepting data](#edit-page) later.

#### Migrations

Create an new [migration](migrations.md), and add this to its `safeUp()` method:

```php
// Create the Products table:
$this->createTable('{{%products}}', [
    'id' => $this->primaryKey(),
    'price' => $this->integer()->notNull(),
    'currency' => $this->char(3)->notNull(),
    'dateCreated' => $this->dateTime()->notNull(),
    'dateUpdated' => $this->dateTime()->notNull(),
    'uid' => $this->uid(),
]);

// Give it a foreign key to the elements table:
$this->addForeignKey(
    null,
    '{{%products}}',
    'id',
    '{{%elements}}',
    'id',
    'CASCADE',
    null
);
```

Note that we’ve also specified `id`, `dateCreated`, `dateUpdated`, and `uid` “audit” columns (used by Craft’s [`insert`](craft4:craft\db\Command::insert()), [`upsert`](craft4:craft\db\Command::upsert()), and [`update`](craft4:craft\db\Command::update()) commands)—as well as a foreign key to tie our records back to the source `elements` table. A foreign key ensures records are not orphaned when the underlying element is [hard-deleted](./soft-deletes.md).

::: tip
Plugins should always keep their [install migration](./migrations.md#plugin-install-migrations) up to date. If this is your plugin’s first migration, it can live solely in `Install.php`; otherwise, the same code will need to be present in both a regular migration _and_ the install migration.
:::

Install your plugin (or run `php migrate/up`) to create the database table.

#### Save Hooks

The presence of attributes alone doesn’t give Craft enough information to persist them, automatically. You will need to implement this logic in an `afterSave()` method on your element class, which is called as part of the standard element saving [control flow](services.md#interface-oriented-methods).

```php
public function afterSave(bool $isNew): void
{
    if ($isNew) {
        \Craft::$app->db->createCommand()
            ->insert('{{%products}}', [
                'id' => $this->id,
                'price' => $this->price,
                'currency' => $this->currency,
            ])
            ->execute();
    } else {
        \Craft::$app->db->createCommand()
            ->update('{{%products}}', [
                'price' => $this->price,
                'currency' => $this->currency,
            ], ['id' => $this->id])
            ->execute();
    }

    parent::afterSave($isNew);
}
```

::: tip
`afterSave()` gets called by <craft4:craft\services\Elements::saveElement()>, after the main element rows in the `elements`, `elements_sites`, and `content` tables have been saved, and the element has been assigned an `id` and `uid` (if new). Craft encapsulates the entire element saving operation in a [transaction](guide:db-dao#performing-transactions), so any modifications you make in `afterSave()` will automatically be rolled back in the event of a failure.
:::

Every element save emits [`EVENT_BEFORE_SAVE_ELEMENT`](craft4:craft\services\Elements::EVENT_BEFORE_SAVE_ELEMENT) and [`EVENT_AFTER_SAVE_ELEMENT`](craft4:craft\services\Elements::EVENT_AFTER_SAVE_ELEMENT) events, but you are free to create and emit your own (say, based on certain type of change like an increase or decrease in price) in the `afterSave()` method.

Keep in mind that a “save” can happen in a number of circumstances (like the creation of a draft or revision), and doesn’t always mean that changes are being applied to the canonical version of an element.

### Element Query Class

All element types need a corresponding [element query](../element-queries.md) class. Element query classes are an extension of [query builders](guide:db-query-builder), tuned for fetching elements. They have three responsibilities:

- Provide public properties and setter methods for capturing custom criteria parameters;
- Join in the custom element table and select the appropriate columns within it;
- Synthesize custom parameters into conditions on the query;

Refer to Craft’s own element query classes for examples, in `vendor/craftcms/cms/src/elements/db/`.

Extend <craft4:craft\elements\db\ElementQuery> in a new `elements/db/ProductQuery.php` file:

```php
<?php
namespace mynamespace\elements\db;

use craft\elements\db\ElementQuery;
use craft\helpers\Db;

class ProductQuery extends ElementQuery
{
    public $price;
    public $currency;

    public function price($value): self
    {
        $this->price = $value;

        return $this;
    }

    public function currency($value): self
    {
        $this->currency = $value;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        // JOIN our `products` table:
        $this->joinElementTable('products');

        // SELECT the `price` and `currency` columns:
        $this->query->select([
            'products.price',
            'products.currency',
        ]);

        if ($this->price) {
            $this->subQuery->andWhere(Db::parseParam('products.price', $this->price));
        }

        if ($this->currency) {
            $this->subQuery->andWhere(Db::parseParam('products.currency', $this->currency));
        }

        return parent::beforePrepare();
    }
}
```

The lack of type declarations for the `price` and `currency` properties (or their corresponding setter method arguments) on the element query class is intentional—we want to accept any values compatible with `Db::parseParam()`. We’ll cover some more examples of [param normalization](#normalizing-query-params) in a moment.

Back in your element class, implement the `find()` method and return a new instance of your query class:

```php
use craft\base\Element;
use mynamespace\elements\db\ProductQuery;

// ...

class Product extends Element
{
    public static function find(): ProductQuery
    {
        return new ProductQuery(static::class);
    }

    // ...
}
```

Now you’re ready to start querying for elements of your type:

```php
Product::find()
    ->price(100)
    ->all();
```

#### `$this->query` vs. `$this->subQuery`

Behind the scenes, <craft4:craft\elements\db\ElementQuery> creates two <craft4:craft\db\Query> instances: the main query (`$this->query`), and a subquery (`$this->subQuery`). Column selections should go in the main query, and conditions/joins should be applied to the subquery. Ultimately the subquery will become the `FROM` clause of the main query.

The reason for this separation is performance. It allows MySQL/PostgreSQL to figure out exactly which element rows should be fetched before it has to worry about which columns to select, etc., avoiding the need to run expensive condition operations on temporary tables.

#### Normalizing Query Params

Your query class is responsible for synthesizing and normalizing its params in the `beforePrepare()` method and applying them as <craft4:craft\db\Query::where()>-compatible conditions. Oftentimes, this is only a matter of processing params with the appropriate helper methods:

- [`Db::parseParam()`](craft4:craft\helpers\Db::parseParam()): Type-agnostic.
- [`Db::parseDateParam()`](craft4:craft\helpers\Db::parseDateParam()): Normalizes `DateTime` values.
- [`Db::parseBooleanParam()`](craft4:craft\helpers\Db::parseBooleanParam()): Normalizes boolean values and provides a means for dealing with `null` values in the database.
- [`Db::parseNumericParam()`](craft4:craft\helpers\Db::parseNumericParam()): Rejects non-numeric values.
- [`Db::parseMoneyParam()`](craft4:craft\helpers\Db::parseMoneyParam()): Process conditions including currency-like values into storage-safe integers;

This may also mean reconciling conflicting params, or expanding short-hand params into real column-based conditions.

Query params don’t have to match column names, nor do all column names have to be represented as query params. For instance, if our element also tracked `stock`, and our table included a `stock` column, we _could_ provide a query parameter of the same name—but we could also make it simpler for developers using our element type to query for “available” products, like this:

```php
class ProductQuery extends ElementQuery
{
    public $stock;
    public bool $isAvailable;

    // ...

    public function isAvailable(null|bool $value): self
    {
        $this->isAvailable = $value;

        return $this;
    }

    public function beforePrepare(): bool
    {
        // ...

        if ($this->isAvailable !== null) {
            if ($this->isAvailable) {
                $this->subQuery->andWhere(Db::parseParam('products.stock', '>', 0));
            } else {
                $this->subQuery->andWhere(Db::parseParam('products.stock', '<=', 0));
            }
        }

        return parent::beforePrepare();
    }
}
```

Other criteria may contribute to the definition of “available,” or create situations where an impossible set of conditions are applied (like “available” products with a stock of less than 0). It’s up to you whether you allow contradictions, silently resolve them, or throw an exception.

::: warning
When modifying your query, it’s recommended that new params are applied with `andWhere()` instead of `where()`, as the latter will clear _any_ existing conditions, including those that Craft uses to handle soft-deleted and disabled elements.
:::

### Querying for Elements in Templates

If your element type is useful to developers in Twig, you’ll want to expose an element query factory function. For consistency, we’ll look at how to add a method like `craft.entries()` or `craft.categories()` to the global `craft` variable (an instance of [CraftVariable](craft4:craft\web\twig\variables\CraftVariable)) by attaching a [behavior](guide:concept-behaviors) to it.

Your behavior class (in a new file at `variables/CraftVariableBehavior.php`) should look like this:

```php
<?php
namespace mynamespace\variables;

use mynamespace\elements\Product;
use mynamespace\elements\db\ProductQuery;
use Craft;
use yii\base\Behavior;

/**
 * The class name isn't important, but we've used something that describes
 * how it is applied, rather than what it does.
 * 
 * You are only apt to need a single behavior, even if your plugin or module
 * provides multiple element types.
 */
class CraftVariableBehavior extends Behavior
{
    public function products(array $criteria = []): ProductQuery
    {
        // Create a query via your element type, and apply any passed criteria:
        return Craft::configure(Product::find(), $criteria);
    }
}
```

To attach the behavior, return to your main class’s `init()` method and listen for the `CraftVariable::EVENT_DEFINE_BEHAVIORS` event:

```php
use yii\base\Event;
use craft\events\DefineBehaviorsEvent;
use craft\web\twig\variables\CraftVariable;
use mynamespace\variables\CraftVariableBehavior;

Event::on(
    CraftVariable::class,
    CraftVariable::EVENT_DEFINE_BEHAVIORS,
    function(DefineBehaviorsEvent $e) {
        $e->sender->attachBehaviors([
            CraftVariableBehavior::class,
        ]);
    }
);
```

## Content

If your elements should get their own rows in the `content` table—either because they need [titles](#titles) or [custom fields](#custom-fields)—add a static `hasContent()` method to your element class:

```php
public static function hasContent(): bool
{
    return true;
}
```

### Titles

If your elements should have user-defined titles, add a static `hasTitles()` method to your element class:

```php
public static function hasTitles(): bool
{
    return true;
}
```

::: tip
Don’t forget to include a title field in your [field layout](#managing-field-layouts)!
:::

### Custom Fields

Element types that support content (or provide [field layout elements](#field-layout-elements)) need to define a field layout. Field layouts are stored in the database, but can be reflected in (and controlled by) [Project Config](./project-config.md), as well.

This process begins by providing administrators a place to manage the field layout—usually as part of your plugin’s [settings](./plugin-settings.md) screen. Craft provides a `fieldLayoutDesignerField` macro via `_includes/forms.twig`, which will output a field layout designer and register all the necessary scripts:

```twig
{% import '_includes/forms.twig' as forms %}

{{ forms.fieldLayoutDesignerField({
  fieldLayout: craft.app.fields.getLayoutByType(
    'mynamespace\\elements\\Product'
  ),
}) }}
```

Place that within a `<form>` that posts to one of your plugin’s [controllers](./controllers.md). Craft provides a convenience method for collecting field layout data from a POST request:

```php
$fieldLayout = Craft::$app->getFields()->assembleLayoutFromPost();
$fieldLayout->type = Product::class;
```

The controller (or a [service](./services.md)) can save the field layout by passing it to <craft4:craft\services\Fields::saveLayout()>:

```php
Craft::$app->fields->saveLayout($fieldLayout);
```

#### Using Project Config

One of the benefits of field layouts is that they can be tracked in [project config](project-config.md). Instead of directly saving a field layout to the database, you can validate and write the layout into a known key:

```php
// mynamespace\controllers\SettingsController

use Craft;
use craft\helpers\ArrayHelper;
use craft\helpers\StringHelper;
use craft\web\Controller;

// ...
class SettingsController extends Controller
{
    public function actionSave()
    {
        // Check if a layout already exists in config:
        if ($currentLayout = Craft::$app->getProjectConfig()->get('myplugin.product.fieldlayout')) {
            $uid = ArrayHelper::firstKey($currentLayout);
        } else {
            // Nope! We need a new UID:
            $uid = StringHelper::UUID();
        }

        Craft::$app->getProjectConfig()->set($key, [
            $uid => $layout->getConfig(),
        ]);

        return $this->asModelSuccess(Craft::t('myplugin', 'Field layout saved.'), $layout);
    }
}
```

#### Single Field Layouts

For element types that only require a single field layout, you can look them up with just the class name—its ID is irrelevant:

```php
public function getFieldLayout()
{
    return \Craft::$app->fields->getLayoutByType(self::class);
}
```

#### Multiple Field Layouts

In Craft, some element types define multiple field layouts: entry field layouts are defined for each entry type; asset field layouts are defined for each asset volume, etc. Plugins can provide the same functionality, so long as they’re able to reliably match an element with a layout.

Looking at entries again, each element keeps track of its entry type, and in turn, a field layout.

Or, if the layout is being used by a configurable component stored in [project config](project-config.md) (as entry types and category groups are), you can add the field layout to its config, and save it alongside your component.

```php
use craft\db\Table;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;

// ...

public function saveComponent($myComponent)
{
    // ...

    $fieldLayoutConfig = $fieldLayout->getConfig();
    if ($fieldLayoutConfig) {
        if (!$fieldLayout->id) {
            $layoutUid = $fieldLayout->uid = StringHelper::UUID();
        } else {
            $layoutUid = Db::uidById(Table::FIELDLAYOUTS, $fieldLayout->id);
        }
        $myComponentConfig['fieldLayouts'] = [
            $layoutUid => $fieldLayoutConfig
        ];
    }

    // ...
}

public function handleChangedComponent(ConfigEvent $event)
{
    $data = $event->newValue;

    // ...

    if (!empty($data['fieldLayouts'])) {
        // Save the field layout
        $layout = FieldLayout::createFromConfig(reset($data['fieldLayouts']));
        $layout->id = $myComponentRecord->fieldLayoutId;
        $layout->type = MyComponent::class;
        $layout->uid = key($data['fieldLayouts']);
        Craft::$app->fields->saveLayout($layout);
        $myComponentRecord->fieldLayoutId = $layout->id;
    } else if ($myComponentRecord->fieldLayoutId) {
        // Delete the field layout
        Craft::$app->fields->deleteLayoutById($myComponentRecord->fieldLayoutId);
        $myComponentRecord->fieldLayoutId = null;
    }

    // ...
}

public function handleDeletedComponent(ConfigEvent $event)
{
    // ...

    // Delete the field layout
    if ($myComponentRecord->fieldLayoutId) {
        Craft::$app->fields->deleteLayoutById($myComponentRecord->fieldLayoutId);
    }

    // ...
}
```

#### Associating Elements to their Field Layouts

Elements’ `getFieldLayout()` method is responsible for returning its associated field layout (if there is one). By default, it will check a `$fieldLayoutId` property on the element. If set, it will return the field layout with the same ID. Therefore it’s recommended that you set the `$fieldLayoutId` property on your elements when saving them.

```php
// ...
$product->fieldLayoutId = $productType->fieldLayoutId;
\Craft::$app->elements->saveElement($product);
```

If the `$fieldLayoutId` property is set, <craft4:craft\services\Elements::saveElement()> will store it in the `elements.fieldLayoutId` column in the database, and your elements will be re-populated with the values when they are fetched, down the road.

Alternatively, you can override the `getFieldLayout()` method, and fetch/return the field layout yourself. This might be preferable if your element type only has a single field layout (like user accounts):


The returned layout can be determined by other factors

See [Edit Page](#edit-page) to learn how to create an edit page for your elements, based on their field layout.


### Saving Custom Field Values

When saving values on a custom field, you may use the [`setFieldValue()`](craft4:craft\base\ElementInterface::setFieldValue()) and [`setFieldValues()`](craft4:craft\base\ElementInterface::setFieldValues()) methods or directly access the field handle as a property on the element object.
In this example, we’re setting and saving custom field values for an [Entry](craft4:craft\elements\Entry) element:

::: code
```php Single Value
// Direct assignment:
$entry->myCustomField = 'foo';

// Via helper method:
$entry->setFieldValue('myCustomField', 'foo');

\Craft::$app->elements->saveElement($entry);
```
```php Multiple Values
// Direct assignment:
$entry->myCustomField = 'foo';
$entry->myOtherCustomField = 'bar';

// Via bulk method:
$entry->setFieldValues([
    'myCustomField' => 'foo',
    'myOtherCustomField' => 'bar',
]);

\Craft::$app->elements->saveElement($entry);
```
:::

#### Validating Required Custom Fields

Required custom fields are only enforced when the element is saved using the `live` [validation scenario](guide:structure-models#scenarios). Set the scenario before calling `saveElement()`:

```php
$element->setScenario(\craft\base\Element::SCENARIO_LIVE);
```

### Localization

If your elements’ title and custom field values should be stored on a per-site basis, add a static `isLocalized()` method:

```php
public static function isLocalized(): bool
{
    return true;
}
```

By default, elements will be stored in all sites. If an element should only be stored for certain sites, add a `getSupportedSites()` method to it.

```php
public function getSupportedSites(): array
{
    return [
        1,
        2,
        ['siteId' => 3, 'enabledByDefault' => false],
    ];
}
```

The values in the array returned by `getSupportedSites()` can either be integers (site IDs) or an array with a `siteId` key and optionally an `enabledbyDefault` key (boolean) indicating whether the element should be enabled by default for that site.

::: tip
Elements that support multiple sites will have their `afterSave()` method called multiple times on save – once for each site that the element supports. You can tell whether it’s being called for the originally-submitted site versus a propagated site by checking `$this->propagating`.
:::

## Statuses

If your elements should have their own statuses, give your element class a static <craft4:craft\base\ElementInterface::hasStatuses()> method:

```php
public static function hasStatuses(): bool
{
    return true;
}
```

### Custom Statuses

By default your elements will support two statuses: Enabled and Disabled. If you’d like to give your element type its own custom statuses, first define what they are by overriding its static <craft4:craft\base\ElementInterface::statuses()> method:

```php
public static function statuses(): array
{
    return [
        'foo' => ['label' => \Craft::t('plugin-handle', 'Foo'), 'color' => '27AE60'],
        'bar' => ['label' => \Craft::t('plugin-handle', 'Bar'), 'color' => 'F2842D'],
    ];
}
```

Next add a <craft4:craft\base\ElementInterface::getStatus()> method that returns the current status of an element:

```php
public function getStatus(): ?string
{
    if ($this->fooIsTrue) {
        return 'foo';
    }

    return 'bar';
}
```

Finally, override the <craft4:craft\elements\db\ElementQuery::statusCondition()> method on your [element query class](#element-query-class):

```php
protected function statusCondition(string $status): mixed
{
    switch ($status) {
        case 'foo':
            return ['foo' => true];
        case 'bar':
            return ['bar' => true];
        default:
            // call the base method for `enabled` or `disabled`
            return parent::statusCondition($status);
    }
}
```

## Sources

Your element type can define “sources”, which are groups of elements defined by criteria parameters.

Element type sources will be visible in the sidebar of element indexes, and within the settings of element relation fields.

To define your element type’s sources, add a protected static [defineSources()](craft4:craft\base\Element::defineSources()) method to your element class:

```php
protected static function defineSources(string $context = null): array
{
    return [
        [
            'key' => '*',
            'label' => 'All Products',
            'criteria' => []
        ],
        [
            'key' => 'cad',
            'label' => 'CAD',
            'criteria' => [
                'currency' => 'cad',
            ]
        ],
        [
            'key' => 'usd',
            'label' => 'USD',
            'criteria' => [
                'currency' => 'usd',
            ]
        ],
    ];
}
```

When a source is selected, Craft will configure your [element query](#element-query-class) with the values listed in the source’s `criteria` array.

## Index Page

You can give your [control panel section](cp-section.md) an index page for your element type using the following template:

```twig
{% extends '_layouts/elementindex.twig' %}
{% set title = 'Products' %}
{% set elementType = 'ns\\prefix\\elements\\Product' %}
```

### Table Attributes

You can customize which columns should be available to your element indexes’ Table views by adding a protected [defineTableAttributes()](craft4:craft\base\Element::defineTableAttributes()) method to your element class:

```php
protected static function defineTableAttributes(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
        'currency' => \Craft::t('plugin-handle', 'Currency'),
    ];
}
```

::: tip
The first attribute you list here is a special case. It defines the header for the first column in the table view, which is the only one admins can’t remove. Its values will come from your elements’ <craft4:craft\base\ElementInterface::getUiLabel()> method.
:::

If it’s a big list, you can also limit which columns should be visible by default for new [sources](#sources) by adding a protected [defineDefaultTableAttributes()](craft4:craft\base\Element::defineDefaultTableAttributes()) method to your element class:

```php
protected static function defineDefaultTableAttributes(string $source): array
{
    return ['title', 'price', 'currency'];
}
```

For the table cells, by default Craft will output whatever the string version of the element attribute is. You can override the cell HTML by adding a protected `tableAttributeHtml()` method on your element class:

```php
protected function tableAttributeHtml(string $attribute): string
{
    switch ($attribute) {
        case 'price':
            return \Craft::$app->formatter->asCurrency($this->price, $this->currency);

        case 'currency':
            return strtoupper($this->currency);
    }

    return parent::tableAttributeHtml($attribute);
}
```

### Sort Options

You can define the sort options for your element indexes by adding a protected static [defineSortOptions()](craft4:craft\base\Element::defineSortOptions()) method to your element class:

```php
protected static function defineSortOptions(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
    ];
}
```

When a sort option is selected on an index, its key will be passed to the `$orderBy` property of your [element query](#element-query-class) class (e.g. `['price' => SORT_ASC]`).

### Index Page Exporters

You can define which [exporter types](element-exporter-types.md) your element type supports on its index page by adding a protected static [defineExporters()](craft4:craft\base\Element::defineExporters()) method on your element class:

```php
protected static function defineExporters(string $source): array
{
    $exporters = parent::defineExporters($source);
    $exporters[] = MyExporter::class;
    return $exporters;
}
```

### Index Page Actions

You can define which [actions](element-action-types.md) your element type supports on its index page by adding a protected static [defineActions()](craft4:craft\base\Element::defineActions()) method on your element class:

```php
protected static function defineActions(string $source = null): array
{
    return [
        FooAction::class,
        BarAction::class,
    ];
}
```

### Restore Action

All element types are [soft-deletable](soft-deletes.md) out of the box, however it’s up to each element type to decide whether they should be restorable.

To make an element restorable, just add the <craft4:craft\elements\actions\Restore> action to the array returned by your static [defineActions()](craft4:craft\base\Element::defineActions()) method. Craft will automatically hide it during normal index views, and show it when someone selects the “Trashed” status option.

### Thumb View

Thumbnail views can be be enabled for your element index page on a [source](#sources)-by-source basis.

To enable thumbnail view for a source, add a `hasThumbs` key to its definition:

```php
protected static function defineSources(string $context = null): array
{
    return [
        [
            'key' => 'cad',
            'label' => 'CAD',
            'criteria' => [
                'currency' => 'cad',
            ],
            'hasThumbs' => true
        ],
        // ...
    ];
}
```

Then, add a `getThumbUrl()` method to your element class, which returns the URL to the current element’s thumbnail:

```php
use craft\helpers\UrlHelper;

// ...

public function getThumbUrl(int $size): ?string
{
    return UrlHelper::resourceUrl("product-images/{$this->id}/{$size}");
}
```

## Searchable Attributes

When an element is saved, Craft’s Search service will index its “searchable attributes” as search keywords on the element. By default, the list of searchable attributes will only include the element’s title and slug, plus any custom field values.

If your element type has additional attributes you want to make searchable, add a protected static [defineSearchableAttributes()](craft4:craft\base\Element::defineSearchableAttributes()) method on your element and list them:

```php
protected static function defineSearchableAttributes(): array
{
    return ['price'];
}
```

## Element URLs

When an element is being saved, its `getUriFormat()` method will be called to find out whether the element should have its own URI in the system, and if so, what it should look like.

So if you want your elements to get their own URLs, you must implement this method and have it return a string that can be parsed with <craft4:craft\web\View::renderObjectTemplate()> (e.g. `products/{slug}`). Usually this should be a user-defined string, rather than something hard-coded.

```php
public function getUriFormat(): ?string
{
    return $this->getType()->uriFormat;
}
```

Whenever an element’s URL is requested, Craft will instantiate the element and call its `getRoute()` method, giving the element a chance to decide how the request should be [routed](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing).

Internally, <craft4:craft\base\Element::getRoute()> will call a protected `route()` method, which is what you should override in your element class:

```php
protected function route(): array|string|null
{
    return [
        'templates/render', [
            'template' => $this->getType()->template,
            'variables' => [
                'product' => $this,
            ]
        ]
    ];
}
```

## Editing Elements

### Editor HUDs

To make your elements editable via Element Editor HUDs when double-clicked on within the index page or relation fields, add a `getIsEditable()` method to your element class, which returns whether the current user has permission to edit the element:

```php
public function getIsEditable(): bool
{
    return \Craft::$app->user->checkPermission('edit-product:'.$this->getType()->id);
}
```

By default the element editor HUD will only include custom fields. To include a Title field and/or any element-specific attribute fields, add a `getEditorHtml()` method to your element class:

```php
public function getEditorHtml(): string
{
    $html = \Craft::$app->getView()->renderTemplateMacro('_includes/forms.twig', 'textField', [
        [
            'label' => \Craft::t('app', 'Title'),
            'siteId' => $this->siteId,
            'id' => 'title',
            'name' => 'title',
            'value' => $this->title,
            'errors' => $this->getErrors('title'),
            'first' => true,
            'autofocus' => true,
            'required' => true
        ]
    ]);

    $html .= parent::getEditorHtml();

    return $html;
}
```

### Edit Page

If you want to give your element type a full-sized [edit page](./cp-edit-pages.md), it’s up to you to set all of that up – the templates, the routes, and the controller actions.

The Edit Category page offers a relatively straightforward example of how it could be done.

- URL Rules:

  ```php
  'categories/<groupHandle:{handle}>/new' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>/<siteHandle:{handle}>' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/new/<siteHandle:{handle}>' => 'categories/edit-category',
  ```

- Controller actions:

  - [actionEditCategory()](craft4:craft\controllers\CategoriesController::actionEditCategory()) – renders the Edit Category page
  - [actionPreviewCategory()](craft4:craft\controllers\CategoriesController::actionPreviewCategory()) – renders a category’s front-end page for a Live Preview request
  - [actionSaveCategory()](craft4:craft\controllers\CategoriesController::actionSaveCategory()) – saves a category
  - [actionDeleteCategory()](craft4:craft\controllers\CategoriesController::actionDeleteCategory()) – deletes a category
  - [actionShareCategory()](craft4:craft\controllers\CategoriesController::actionShareCategory()) – handles a Share Category request, creating a token for `categories/view-shared-category` and redirecting the user to it
  - [actionViewSharedCategory()](craft4:craft\controllers\CategoriesController::actionViewSharedCategory()) – renders a category’s front-end page for a Share Category token

#### Edit Page Template

You can generate a tab menu and tab contents based on your element’s field layout by calling <craft4:craft\models\FieldLayout::createForm()>, either from your controller action or the edit page template.

::: code
```php
$fieldLayout = $myElement->getFieldLayout();
$form = $fieldLayout->createForm($myElement);
$tabs = $form->getTabMenu();
$fieldsHtml = $form->render();
```
```twig
{% set fieldLayout = myElement.getFieldLayout() %}
{% set form = fieldLayout.createForm(myElement) %}
{% set tabs = form.getTabMenu() %}
{% set fieldsHtml = form.render() %}
```
:::

Here’s a simple example of the code needed to save an element programatically, which could live within an `actionSave()` controller action:

```php
// Create a new product element
$product = new Product();

// Set the main properties from POST data
$product->price = Craft::$app->request->getBodyParam('price');
$product->currency = Craft::$app->request->getBodyParam('currency');
$product->enabled = (bool)Craft::$app->request->getBodyParam('enabled');

// Set custom field values from POST data in a `fields` namespace
$product->setFieldValuesFromRequest('fields');

// Save the product
$success = Craft::$app->elements->saveElement($product);
```

Once you’ve set up an edit page for your element type, you can add a [getCpEditUrl()](craft4:craft\base\ElementInterface::getCpEditUrl()) method to your element class, which will communicate your elements’ edit page URLs within the control panel.

```php
public function getCpEditUrl(): ?string
{
    return 'plugin-handle/products/'.$this->id;
}
```

::: tip
Elements that are editable (per `getIsEditable()`) and which define a control panel edit URL (via `getCpEditUrl()`) will be accessible from a discoverable `/admin/edit/{id|uid}` URL, which will redirect to their edit page.
:::

## Relations

### Relation Field

You can give your element its own relation field by creating a new [field type](field-types.md) that extends <craft4:craft\fields\BaseRelationField>.

That base class does most of the grunt work for you, so you can get your field up and running by implementing three simple methods:

```php
<?php
namespace mynamespace\fields;

use craft\fields\BaseRelationField;
use mynamespace\elements\Product;

class Products extends BaseRelationField
{
    public static function displayName(): string
    {
        return \Craft::t('plugin-handle', 'Products');
    }

    protected static function elementType(): string
    {
        return Product::class;
    }

    public static function defaultSelectionLabel(): string
    {
        return \Craft::t('plugin-handle', 'Add a product');
    }
}
```

## Reference Tags

If you want your elements to support reference tags (e.g. `{product:100}`), add a static `refHandle()` method to your element class that returns a unique handle that should be used for its reference tags.

```php
public static function refHandle(): ?string
{
    return 'product';
}
```

To make it easier for users to copy your elements’ reference tags, you may want to add a “Copy reference tag” [action](#index-page-actions) to your element’s index page.

```php
use craft\elements\actions\CopyReferenceTag;

// ...

protected static function defineActions(string $source = null): array
{
    return [
        [
            'type' => CopyReferenceTag::class,
            'elementType' => static::class,
        ],
        // ...
    ];
}
```

## Eager-Loading

If your element type has its own [relation field](#relation-field), it is already eager-loadable through that. And if it supports [custom fields](#custom-fields), any elements that are related to your elements through relation fields will be eager-loadable.

The only case where eager-loading support is not provided for free is if your element type has any “hard-coded” relations with other elements. For example, entries have authors (User elements), but those relations are defined in an `authorId` column in the `entries` table, not a custom Users field.

If your elements have any hard-coded relations to other elements, and you want to make those elements eager-loadable, add an `eagerLoadingMap()` method to your element class:

```php
use craft\db\Query;
use craft\elements\User;
use craft\helpers\ArrayHelper;

// ...

public static function eagerLoadingMap(array $sourceElements, string $handle): array|null|false
{
    if ($handle === 'author') {
        // get the source element IDs
        $sourceElementIds = ArrayHelper::getColumn($sourceElements, 'id');

        $map = (new Query())
            ->select(['id as source', 'authorId as target'])
            ->from(['{{%entries}}'])
            ->where(['and', ['id' => $sourceElementIds], ['not', ['authorId' => null]]])
            ->all();

        return [
            'elementType' => User::class,
            'map' => $map
        ];
    }

    return parent::eagerLoadingMap($sourceElements, $handle);
}
```

This function takes an of already-queried elements (the “source” elements), and an eager-loading handle. It is supposed to return a mapping of which source element IDs should eager-load which “target” element IDs.

If you need to override where eager-loaded elements are stored, add a `setEagerLoadedElements()` method to your element class as well:

```php
public function setEagerLoadedElements(string $handle, array $elements): void
{
    if ($handle === 'author') {
        $author = $elements[0] ?? null;
        $this->setAuthor($author);
    } else {
        parent::setEagerLoadedElements($handle, $elements);
    }
}
```

## Garbage Collection

Element types should opt into [garbage collection](../gc.md) by hooking into the [Gc::EVENT_RUN](craft4:craft\services\Gc::EVENT_RUN) event and calling [Gc::deletePartialElements()](craft4:craft\services\Gc::deletePartialElements()):

```php
use mynamespace\elements\MyElement;
use craft\db\Table;
use craft\services\Event;
use craft\services\Gc;
use yii\base\Event;

Event::on(
    Gc::class,
    Gc::EVENT_RUN,
    function(Event $event) {
        // Delete `elements` table rows without peers in the custom `my_element` table
        Craft::$app->getGc()->deletePartialElements(
            MyElement::class,
            'my_element',
            'id'
        );

        // Delete `elements` table rows without corresponding `content` table rows for the custom element
        Craft::$app->getGc()->deletePartialElements(
            MyElement::class,
            Table::CONTENT,
            'elementId'
        );
    }
);
```

This helps ensure that any elements missing data get deleted instead of lingering in the database.
