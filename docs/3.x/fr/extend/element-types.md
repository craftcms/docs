# Element Types

Element types define the different types of content that can be managed in Craft.

Craft comes with seven built-in element types:

- <craft3:craft\elements\Asset>
- <craft3:craft\elements\Category>
- <craft3:craft\elements\Entry>
- <craft3:craft\elements\GlobalSet>
- <craft3:craft\elements\MatrixBlock>
- <craft3:craft\elements\Tag>
- <craft3:craft\elements\User>

You can refer to these classes for examples. They are located in `vendor/craftcms/cms/src/elements/`.

If your plugin needs to provide a new content type, architecting it as an element type is usually the best way to go.

## Getting Started

### Element Class

Element types are defined by classes which implement <craft3:craft\base\ElementInterface> and <craft3:craft\base\ElementTrait>. The class will serve both as a way to communicate various things about your element type (with static methods), and as a model that elements of its type will be instantiated with.

As a convenience, you can extend <craft3:craft\base\Element>, which provides a base element type implementation.

Create an `elements/` directory within your plugin’s source directory, and create a PHP class file within it, named after the class name you want to give your element type (e.g. `Product.php`).

Define the class within the file, and give a display name and some public properties for any custom attributes your elements will have.

```php
<?php
namespace mynamespace\elements;

use craft\base\Element;

class Product extends Element
{
    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return 'Product';
    }

    /**
     * @inheritdoc
     */
    public static function pluralDisplayName(): string
    {
        return 'Products';
    }

    /**
     * @var int Price
     */
    public $price = 0;

    /**
     * @var string Currency code
     */
    public $currency;

    // ...
}
```

### Registration

Register your element type using the [EVENT_REGISTER_ELEMENT_TYPES](craft3:craft\services\Elements::EVENT_REGISTER_ELEMENT_TYPES) event from your plugin or module’s `init()` method:

```php
use mynamespace\elements\Product;
use craft\events\RegisterComponentTypesEvent;
use craft\services\Elements;
use yii\base\Event;

Event::on(Elements::class,
    Elements::EVENT_REGISTER_ELEMENT_TYPES,
    function(RegisterComponentTypesEvent $event) {
        $event->types[] = Product::class;
    }
);
```

### Database Table

There will be things your elements need to store about themselves that don’t fit into the columns in the `elements` database table. So you’ll need to create a new table to hold that info.

Create an [install migration](migrations.md#plugin-install-migrations) (if you don’t already have one), and add this to its `safeUp()` method:

```php
if (!$this->db->tableExists('{{%products}}')) {
    // create the products table
    $this->createTable('{{%products}}', [
        'id' => $this->integer()->notNull(),
        'price' => $this->integer()->notNull(),
        'currency' => $this->char(3)->notNull(),
        'dateCreated' => $this->dateTime()->notNull(),
        'dateUpdated' => $this->dateTime()->notNull(),
        'uid' => $this->uid(),
        'PRIMARY KEY(id)',
    ]);

    // give it a foreign key to the elements table
    $this->addForeignKey(
        $this->db->getForeignKeyName('{{%products}}', 'id'),
        '{{%products}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
}
```

::: tip
If you’re adding this as an update to an existing plugin, you will need to create a new normal migration as well, and copy the same code into it.
:::

Install the plugin now, so your database table will be created.

You will also need to add an `afterSave()` method to your element class, which is responsible for keeping your element table updated when elements are saved. The `afterSave()` method is a part of the standard element saving [control flow](services.md#interface-oriented-methods).

```php
public function afterSave(bool $isNew)
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
`afterSave()` gets called by <craft3:craft\services\Elements::saveElement()>, after the main element rows in the `elements`, `elements_sites`, and `content` tables have been saved, and the element has been assigned an `id` and `uid` (if new).
:::

### Element Query Class

All element types need a corresponding element query class. Element query classes are an extension of [query builders](https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder), tuned for fetching elements.

All element query classes should extend <craft3:craft\elements\db\ElementQuery>, which provides the base functionality.

They have three responsibilities:

- Provide public properties and setter methods for capturing custom criteria parameters
- Join in the custom element table and select the appropriate columns within it
- Apply the custom criteria parameters as conditions on the query

You can refer to Craft’s own element query classes for examples. They are located in `vendor/craftcms/cms/src/elements/db/`.

To give your plugin an element query, create a `db/` directory within your `elements/` directory, and create a PHP class file within it, named after the class name you want to give your element query (e.g. `ProductQuery.php`).

```php
<?php
namespace mynamespace\elements\db;

use craft\db\Query;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use mynamespace\elements\Product;

class ProductQuery extends ElementQuery
{
    public $price;
    public $currency;

    public function price($value)
    {
        $this->price = $value;

        return $this;
    }

    public function currency($value)
    {
        $this->currency = $value;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        // join in the products table
        $this->joinElementTable('products');

        // select the price column
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

With the element query class in place, the last step is to tie it into your element type. Add the following method to your element class:

```php
use craft\elements\db\ElementQueryInterface;
use mynamespace\elements\db\ProductQuery;

// ...

class Product
{
    public static function find(): ElementQueryInterface
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

Behind the scenes, <craft3:craft\elements\db\ElementQuery> creates two <craft3:craft\db\Query> instances: the main query (`$this->query`), and a subquery (`$this->subQuery`). Column selections should go in the main query, and conditions/joins should be applied to the subquery. Ultimately the subquery will become the `FROM` clause of the main query.

The reason for this separation is performance. It allows MySQL/PostgreSQL to figure out exactly which element rows should be fetched before it has to worry about which columns to select, etc., avoiding the need to run expensive condition operations on temporary tables.

### Template Function

If you want to make it possible for templates to query for your elements, you can create a new template function that returns a new element query. (See [Extending Twig](extending-twig.md) for more details.)

```php
<?php
namespace mynamespace;

use Craft;
use yii\base\Behavior;

/**
 * Adds a `craft.products()` function to the templates (like `craft.entries()`)
 */
class CraftVariableBehavior extends Behavior
{
    public function products($criteria = null): ProductQuery
    {
        $query = Product::find();
        if ($criteria) {
            Craft::configure($query, $criteria);
        }
        return $query;
    }
}
```

## Element Content

If your elements should get their own rows in the `content` table, either because they should have [titles](#titles) or [custom fields](#custom-fields), add a static `hasContent()` method to your element class:

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

Note that [Element Editor HUDs](#editor-huds) do not automatically show a Title field, so you will need to add it yourself:

```php
public function getEditorHtml(): string
{
    $html = \Craft::$app->getView()->renderTemplateMacro('_includes/forms', 'textField', [
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

    // ...

    $html .= parent::getEditorHtml();

    return $html;
}
```

### Custom Fields

#### Managing Field Layouts

If you want your element type to support custom fields, you will also need to create a page somewhere within the control panel for managing your element type’s field layout. The `_includes/forms.html` template provides a `fieldLayoutDesignerField` macro, which will output a field layout designer:

```twig
{% import '_includes/forms' as forms %}

{{ forms.fieldLayoutDesignerField({
    fieldLayout: craft.app.fields.getLayoutByType(
        'ns\\prefix\\elements\\MyElementType'
    ),
}) }}
```

Place that within a `<form>` that posts to one of your plugin’s controllers. The controller can assemble the field layout from the POST data like this:

```php
$fieldLayout = Craft::$app->getFields()->assembleLayoutFromPost();
$fieldLayout->type = MyElementType::class;
```

Your service can then save the field layout by passing it to <craft3:craft\services\Fields::saveLayout()>:

```php
Craft::$app->fields->saveLayout($fieldLayout);
```

Or, if the layout is being used by a component that’s stored in the [project config](project-config.md), you can add the field layout to the component’s config, and save it alongside your component.

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

Rather than only having one field layout for your entire element type, you can also manage multiple field layouts, if needed. For example, entry field layouts are defined for each entry type; asset field layouts are defined for each asset volume, etc.

You can set that up however you want. Just make sure you’re passing the right field layout into the `fieldLayout` key when rendering the field layout designer.

#### Associating Elements to their Field Layouts

Elements’ `getFieldLayout()` method is responsible for returning the field layout that is associated with the current element (if there is one). By default, it will check a `$fieldLayoutId` property on the element. If set, it will return the field layout with the same ID. Therefore it’s recommended that you set the `$fieldLayoutId` property on your elements when saving them.

```php
// ...
$product->fieldLayoutId = $productType->fieldLayoutId;
\Craft::$app->elements->saveElement($product);
```

If the `$fieldLayoutId`  property is set, <craft3:craft\services\Elements::saveElement()> will store it in the `elements.fieldLayoutId` column in the database, and your elements will be re-populated with the values when they are fetched down the road.

Alternatively, you can override the `getFieldLayout()` method, and fetch/return the field layout yourself. This might be preferable if your element type only has a single field layout (like user accounts).

```php
public function getFieldLayout()
{
    return \Craft::$app->fields->getLayoutByType(Product::class);
}
```

See [Edit Page](#edit-page) to learn how to create an edit page for your elements, based on their field layout.

#### Validating Required Custom Fields

Required custom fields are only enforced when the element is saved using the `live` validation scenario. To make sure required custom fields are validated, set the scenario before calling `saveElement()`:

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

If your elements should have their own statuses, give your element class a static <craft3:craft\base\ElementInterface::hasStatuses()> method:

```php
public static function hasStatuses(): bool
{
    return true;
}
```

### Custom Statuses

By default your elements will support two statuses: Enabled and Disabled. If you’d like to give your element type its own custom statuses, first define what they are by overriding its static <craft3:craft\base\ElementInterface::statuses()> method:

```php
public static function statuses(): array
{
    return [
        'foo' => ['label' => \Craft::t('plugin-handle', 'Foo'), 'color' => '27AE60'],
        'bar' => ['label' => \Craft::t('plugin-handle', 'Bar'), 'color' => 'F2842D'],
    ];
}
```

Next add a <craft3:craft\base\ElementInterface::getStatus()> method that returns the current status of an element:

```php
public function getStatus()
{
    if ($this->fooIsTrue) {
        return 'foo';
    }

    return 'bar';
}
```

Finally, override the <craft3:craft\elements\db\ElementQuery::statusCondition()> method on your [element query class](#element-query-class):

```php
protected function statusCondition(string $status)
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

To define your element type’s sources, add a protected static [defineSources()](craft3:craft\base\Element::defineSources()) method to your element class:

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
{% extends '_layouts/elementindex' %}
{% set title = 'Products' %}
{% set elementType = 'ns\\prefix\\elements\\Product' %}
```

### Index Page Actions

You can define which [actions](element-action-types.md) your element type supports on its index page by adding a protected static [defineActions()](craft3:craft\base\Element::defineActions()) method on your element class:

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

To make an element restorable, just add the <craft3:craft\elements\actions\Restore> action to the array returned by your static [defineActions()](craft3:craft\base\Element::defineActions()) method. Craft will automatically hide it during normal index views, and show it when someone selects the “Trashed” status option.

### Index Page Exporters

You can define which [exporter types](element-exporter-types.md) your element type supports on its index page by adding a protected static [defineExporters()](craft3:craft\base\Element::defineExporters()) method on your element class:

```php
protected static function defineExporters(string $source): array
{
    $exporters = parent::defineExporters($source);
    $exporters[] = MyExporter::class;
    return $exporters;
}
```

### Sort Options

You can define the sort options for your element indexes by adding a protected static [defineSortOptions()](craft3:craft\base\Element::defineSortOptions()) method to your element class:

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

### Table Attributes

You can customize which columns should be available to your element indexes’ Table views by adding a protected [defineTableAttributes()](craft3:craft\base\Element::defineTableAttributes()) method to your element class:

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
The first attribute you list here is a special case. It defines the header for the first column in the table view, which is the only one admins can’t remove. Its values will come from your elements’ <craft3:craft\base\ElementInterface::getUiLabel()> method.
:::

If it’s a big list, you can also limit which columns should be visible by default for new [sources](#sources) by adding a protected [defineDefaultTableAttributes()](craft3:craft\base\Element::defineDefaultTableAttributes()) method to your element class:

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

public function getThumbUrl(int $size)
{
    return UrlHelper::resourceUrl("product-images/{$this->id}/{$size}");
}
```

## Searchable Attributes

When an element is saved, Craft’s Search service will index its “searchable attributes” as search keywords on the element. By default, the list of searchable attributes will only include the element’s title and slug, plus any custom field values.

If your element type has additional attributes you want to make searchable, add a protected static [defineSearchableAttributes()](craft3:craft\base\Element::defineSearchableAttributes()) method on your element and list them:

```php
protected static function defineSearchableAttributes(): array
{
    return ['price'];
}
```

## Element URLs

When an element is being saved, its `getUriFormat()` method will be called to find out whether the element should have its own URI in the system, and if so, what it should look like.

So if you want your elements to get their own URLs, you must implement this method and have it return a string that can be parsed with <craft3:craft\web\View::renderObjectTemplate()> (e.g. `products/{slug}`). Usually this should be a user-defined string, rather than something hard-coded.

```php
public function getUriFormat()
{
    return $this->getType()->uriFormat;
}
```

Whenever an element’s URL is requested, Craft will instantiate the element and call its `getRoute()` method, giving the element a chance to decide how the request should be [routed](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing).

Internally, <craft3:craft\base\Element::getRoute()> will call a protected `route()` method, which is what you should override in your element class:

```php
protected function route()
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
    $html = \Craft::$app->getView()->renderTemplateMacro('_includes/forms', 'textField', [
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

If you want to give your element type a full-sized edit page, it’s up to you to set all of that up – the templates, the routes, and the controller actions.

The Edit Category page offers a relatively straightforward example of how it could be done.

- URL Rules:

  ```php
  'categories/<groupHandle:{handle}>/new' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>/<siteHandle:{handle}>' => 'categories/edit-category',
  'categories/<groupHandle:{handle}>/new/<siteHandle:{handle}>' => 'categories/edit-category',
  ```

- Controller actions:

  - [actionEditCategory()](craft3:craft\controllers\CategoriesController::actionEditCategory()) – renders the Edit Category page
  - [actionPreviewCategory()](craft3:craft\controllers\CategoriesController::actionPreviewCategory()) – renders a category’s front-end page for a Live Preview request
  - [actionSaveCategory()](craft3:craft\controllers\CategoriesController::actionSaveCategory()) – saves a category
  - [actionDeleteCategory()](craft3:craft\controllers\CategoriesController::actionDeleteCategory()) – deletes a category
  - [actionShareCategory()](craft3:craft\controllers\CategoriesController::actionShareCategory()) – handles a Share Category request, creating a token for `categories/view-shared-category` and redirecting the user to it
  - [actionViewSharedCategory()](craft3:craft\controllers\CategoriesController::actionViewSharedCategory()) – renders a category’s front-end page for a Share Category token

#### Edit Page Template

You can generate a tab menu and tab contents based on your element’s field layout by calling <craft3:craft\models\FieldLayout::createForm()>, either from your controller action or the edit page template.

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

- Edit Category page template: [categories/_edit.html](https://github.com/craftcms/cms/blob/develop/src/templates/categories/_edit.html)

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

Once you’ve set up an edit page for your element type, you can add a [getCpEditUrl()](craft3:craft\base\ElementInterface::getCpEditUrl()) method to your element class, which will communicate your elements’ edit page URLs within the control panel.

```php
public function getCpEditUrl()
{
    return 'plugin-handle/products/'.$this->id;
}
```

## Relations

### Relation Field

You can give your element its own relation field by creating a new [field type](field-types.md) that extends <craft3:craft\fields\BaseRelationField>.

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
public static function refHandle()
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

public static function eagerLoadingMap(array $sourceElements, string $handle)
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
public function setEagerLoadedElements(string $handle, array $elements)
{
    if ($handle === 'author') {
        $author = $elements[0] ?? null;
        $this->setAuthor($author);
    } else {
        parent::setEagerLoadedElements($handle, $elements);
    }
}
```
