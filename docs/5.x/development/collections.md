# Collections

[Collections](https://laravel.com/docs/10.x/collections) come from the [Laravel](https://laravel.com/) ecosystem, and provide a fluid way of working with array-like data.

<!-- more -->

You can create a `Collection` anywhere:

::: code
``` Twig
{% set list = collect(['Green', 'Teal', 'Blue']) %}
```
``` PHP
use Illuminate\Support\Collection;

$colors = Collection::make(['Green', 'Teal', 'Blue']);
```
:::

Collections can be used in most situations that an array would be:

```twig
<ul>
  {% for color in colors %}
    {# `color` is one of our original three strings: #}
    <li>{{ color }}</li>
  {% endfor %}
</ul>
```

## Methods

[Dozens of convenience methods](https://laravel.com/docs/10.x/collections#available-methods) are available on every collection to simplify cumbersome or error-prone operations.

These methods can be chained together to process data in an elegant way. Take this average review score logic:

```twig
{% set recentReviews = craft.entries()
  .section('reviews')
  .relatedTo({
    targetElement: product,
  })
  .postDate(">= #{now|date_modify('-1 month')}")
  .collect() %}

{{ recentReviews.pluck('rating').average() }}
```

Not all Collection methods return another Collection! In this example, [`.pluck()`](https://laravel.com/docs/10.x/collections#method-pluck) _does_ (containing just the `rating` field values), but [`.average()`](https://laravel.com/docs/10.x/collections#method-average) _doesn’t_ (instead returning a [float](https://www.php.net/manual/en/language.types.float.php)). As Collections are intended for working with lists, methods that return scalar values can only be used at the “end” of a chain.

::: tip
Some common array-manipulation features are already implemented in Craft as Twig [filters](../reference/twig/filters.md) or [functions](../reference/twig/functions.md), but equivalent methods are usually available via Collections. Their supported arguments and signatures may differ slightly, so consult the documentation if you are combining or switching between features.

One common problem, however, is that Twig’s default configuration does not parse anonymous functions or “closures” in every expression context. The [`nystudio107/craft-closure` package](repo:nystudio107/craft-closure/) provides a shim to work around this limitation.
:::

## Element Queries

Use the [`.collect()` query execution method](element-queries.md#query-execution) (in place of `.all()`) to return elements as a <craft5:craft\elements\ElementCollection>. You can also wrap an existing list of elements in a _regular_ `Collection` with the same `collect()` function we used, earlier:

```twig
{# These produce similar results: #}
{% set posts = craft.entries().section('news').collect() %}
{% set posts = collect(craft.entries().section('news').all()) %}
```

[Eager-loaded elements](eager-loading.md) are also wrapped in an `ElementCollection` that allows them to behave a bit like an element query, so you can safely call `.all()` on any relational field without worrying about whether it was eager-loaded or not—or use `.with()` to eager-load another set of nested elements!
