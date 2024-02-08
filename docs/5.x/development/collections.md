# Collections

[Collections](https://laravel.com/docs/collections) come from the [Laravel](https://laravel.com/) ecosystem, and provide a fluid way of working with array-like data.

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

[Dozens of convenience methods](https://laravel.com/docs/collections#available-methods) are available on every collection to simplify cumbersome or error-prone operations.

These methods can be chained together

::: tip
Some common array-manipulation features are already implemented in Craft as Twig [filters](../reference/twig/filters.md) or [functions](../reference/twig/functions.md), but equivalent methods are usually available via Collections.

One common problem, however, is that Twig’s default configuration does not parse anonymous functions or “closures” in every expression context. The [`nystudio107/craft-closure` package](repo:nystudio107/craft-closure/) provides a shim to work around this limitation.
:::

## Element Queries

Use the [`.collect()` query execution method](./element-queries.md#query-execution) (in place of `.all()`) to return elements as a `Collection`. You can also wrap an existing list of elements in a `Collection` with the same `collect()` function we used, earlier:

```twig
{# These produce the same results: #}
{% set posts = craft.entries().section('news').collect() %}
{% set posts = collect(craft.entries().section('news').all()) %}
```
