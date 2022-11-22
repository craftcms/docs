# Element Queries

You can fetch elements (entries, categories, assets, etc.) in your templates or PHP code using **element queries**.

Working with element queries consists of three steps:

1. **Create the element query.** You do this by calling a “factory function” that is named after the element type you are going to fetch. For example, if you want to fetch entries, you’d call `craft.entries()`, which returns a new [entry query](entries.md#querying-entries).
2. **Set some parameters.** By default, element queries will be configured to return all elements of the specified type. You can narrow that down to just the elements you care about by setting _parameters_ on the query.
3. **Execute the query.** Once you’ve specified the query parameters, you’re ready for Craft to fetch the elements and give you the results. You do that by calling `.all()` or `.one()`, depending on whether you need multiple elements, or just one.

Here’s what a typical element query might look like:

::: code
```twig
{# Create an entry query and set some parameters on it #}
{% set entryQuery = craft.entries()
  .section('news')
  .orderBy('postDate DESC')
  .limit(10) %}

{# Execute the query and get the results #}
{% set entries = entryQuery.all() %}
```
```php
use craft\elements\Entry;

// Create an entry query and set some parameters on it
$entryQuery = Entry::find()
    ->section('news')
    ->orderBy('postDate DESC')
    ->limit(10);

// Execute the query and get the results
$entries = $entryQuery->all();
```
:::

## Types + Parameters

Each type of element has its own function for creating element queries, and they each have their own parameters you can set.

### Element Types

See the query reference section of each element type for more details on working with them:

[Asset Queries](assets.md#querying-assets)
:     {% set assetQuery = craft.assets() %}

[Category Queries](categories.md#querying-categories)
:     {% set categoryQuery = craft.categories() %}

[Entry Queries](entries.md#querying-entries)
:     {% set entryQuery = craft.entries() %}

[Global Set Queries](globals.md#querying-globals)
:     {% set globalQuery = craft.globals() %}

[Matrix Block Queries](matrix-blocks.md#querying-matrix-blocks)
:     {% set matrixBlockQuery = craft.matrixBlocks() %}

[Tag Queries](tags.md#querying-tags)
:     {% set tagQuery = craft.tags() %}

[User Queries](users.md#querying-users)
:     {% set userQuery = craft.users() %}

### Parameters

Parameters are set using methods after creating an element query, or by passing in key-value pairs to the factory function:

```twig
{% set images = craft.assets()
  .kind('image')
  .all() %}

{# ...or... #}

{% set images = craft.assets({
  kind: 'image',
}).all() %}

{# ...or if you’re fancy, set some parameters conditionally: #}

{% set imagesQuery = craft.assets() %}

{% if craft.app.request.getParam('onlyImages') %}
  {# Effectively the same as chaining query methods: #}
  {% do imagesQuery.kind('image') %}
{% endif %}

{% set images = imagesQuery.all() %}
```

::: tip
Query methods (except for those that [execute](#executing-element-queries) a query) modify some internal properties and return the query itself, allowing you to chained more methods together—just like Craft’s [fluent config](./config/README.md#style-map-vs-fluent) syntax!
:::

All element queries support a standard set of methods (like `.id()`, `.title()`, and [`.search()`](./searching.md)). These are documented alongside the [element type-specific](#element-types) parameters (like `.kind()` in the example above).

Typically, parameters make a query more specific, but setting a single parameter more than once will replace the previous constraint.

#### Querying with Custom Fields

In addition to native query parameters, Craft automatically injects a methods for each of your [custom fields](./fields.md).

For example, if we wanted to find entries in a _Cars_ section with a specific paint color stored in a [dropdown](./dropdown-fields.md) field, we could perform this query:

```twig
{% set silverCars = craft.entries()
  .section('cars')
  .paintColor('silver')
  .all() %}
```

Custom field parameters can be combined for advanced filtering—in this example, we’re also applying a pair of constraints to a [date](./date-time-fields.md) field:

```twig
{% set silverCars = craft.entries()
  .section('cars')
  .paintColor(['silver', 'gold'])
  .modelYear('>= 1990', '<= 2000')
  .all() %}
```

See each [field type](./fields.md#field-types)’s documentation for what kinds of values you can use.

## Executing Element Queries

Once you’ve defined your parameters on the query, there are multiple functions available to execute it, depending on what you need back.

### `all()`

Most of the time, you just want to get the elements that you’re querying for. You do that with the `all()` function.

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .limit(10)
  .all() %}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->limit(10)
    ->all();
```
:::

### `collect()`

Calling `.collect()` to execute a query will perform the same database call as `.all()`, but the results are wrapped in a [collection](https://laravel.com/docs/9.x/collections).

Collections can simplify some common array manipulation and filtering tasks that are otherwise awkward in the template:

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .with(['category'])
  .limit(10)
  .collect() %}

{% set categoriesDescription = entries
  .pluck('category')
  .collapse()
  .pluck('title')
  .join(', ', ' and ') %}
Posted in: {{ categoriesDescription }}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->with(['category'])
    ->limit(10)
    ->collect();

$categoriesDescription = $entries
    ->pluck('category')
    ->collapse()
    ->pluck('title')
    ->join(', ', ' and ');
```
:::

::: tip
You can also call `.all()` and wrap the results in a collection yourself, with the [`collect()` Twig function](./dev/functions.md#collect).
:::

### `one()`

If you only need a single element, call `one()` instead of `all()`. It will either return the element or `null` if no matching element exists.

::: code
```twig
{% set entry = craft.entries()
  .section('news')
  .slug('hello-world')
  .one() %}
```
```php
use craft\elements\Entry;

$entry = Entry::find()
    ->section('news')
    ->slug('hello-world')
    ->one();
```
:::

### `exists()`

If you just need to check if any elements exist that match the element query, you can call `exists()`, which will return either `true` or `false`.

::: code
```twig
{% set exists = craft.entries()
  .section('news')
  .slug('hello-world')
  .exists() %}
```
```php
use craft\elements\Entry;

$exists = Entry::find()
    ->section('news')
    ->slug('hello-world')
    ->exists();
```
:::

### `count()`

If you want to know how many elements match your element query, you can call `count()`.

::: code
```twig
{% set count = craft.entries()
  .section('news')
  .count() %}
```
```php
use craft\elements\Entry;

$count = Entry::find()
    ->section('news')
    ->count();
```
:::

::: tip
The `limit` and `offset` parameters will be ignored when you call `count()`.
:::

### `ids()`

If you just want a list of matching element IDs, you can call `ids()`.

::: code
```twig
{% set entryIds = craft.entries()
  .section('news')
  .ids() %}
```
```php
use craft\elements\Entry;

$entryIds = Entry::find()
    ->section('news')
    ->ids();
```
:::

## Caching Element Queries

### `cache()`

Craft’s element query results can be cached with the `cache()` function:

::: code
```twig
{% set entries = craft.entries()
  .section('news')
  .limit(10)
  .cache()
  .all() %}
```
```php
use craft\elements\Entry;

$entries = Entry::find()
    ->section('news')
    ->limit(10)
    ->cache()
    ->all();
```
:::

This is a layer on top of data caching that’s different from the [template {% cache %} tag](./dev/tags.md#cache).

::: tip
Craft registers an [ElementQueryTagDependency](craft4:craft\cache\ElementQueryTagDependency) for you by default, so cache dependencies and invalidation are handled automatically.
:::

## Advanced Element Queries

Element queries are specialized [query builders](https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder) under the hood, so they support most of the same methods provided by <craft4:craft\db\Query>.

### Selections

- [select()](yii2:yii\db\Query::select())
- [addSelect()](yii2:yii\db\Query::addSelect())
- [distinct()](yii2:yii\db\Query::distinct())
- [groupBy()](yii2:yii\db\Query::groupBy())

Custom field column names will be automatically resolved when using `select()`. <Since ver="4.3.0" feature="Column aliases when using advanced SQL methods" /> In earlier versions, you may find that some field’s database columns include a random suffix and will require translating the field handle with <craft4:craft\helpers\ElementHelper::fieldColumnFromField()>.

### Joins

- [innerJoin()](yii2:yii\db\Query::innerJoin())
- [leftJoin()](yii2:yii\db\Query::leftJoin())
- [rightJoin()](yii2:yii\db\Query::rightJoin())

### Conditions

Exercise caution when using these methods directly—some will completely overwrite the existing query conditions and cause unpredictable results.

- [where()](yii2:yii\db\QueryTrait::where())
- [andWhere()](yii2:yii\db\QueryTrait::andWhere())
- [orWhere()](yii2:yii\db\QueryTrait::orWhere())
- [filterWhere()](yii2:yii\db\QueryTrait::filterWhere())
- [andFilterWhere()](yii2:yii\db\QueryTrait::andFilterWhere())
- [orFilterWhere()](yii2:yii\db\QueryTrait::orFilterWhere())

### Query Execution

- [all()](yii2:yii\db\Query::all())
- [collect()](craft4:craft\db\Query::collect())
- [one()](yii2:yii\db\Query::one())
- [nth()](craft4:craft\db\Query::nth())
- [exists()](yii2:yii\db\Query::exists())
- [count()](yii2:yii\db\Query::count())
- [column()](yii2:yii\db\Query::column())
- [scalar()](yii2:yii\db\Query::scalar())
- [sum()](yii2:yii\db\Query::sum())
- [average()](yii2:yii\db\Query::average())
- [min()](yii2:yii\db\Query::min())
- [max()](yii2:yii\db\Query::max())
- [pairs()](craft4:craft\db\Query::pairs())

::: tip
When customizing an element query, you can call [getRawSql()](craft4:craft\db\Query::getRawSql()) to get the full SQL that is going to be executed by the query, so you have a better idea of what to modify.

```twig
{{ dump(query.getRawSql()) }}
```
