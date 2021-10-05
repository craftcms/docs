# テスト

[Twig に付随する](https://twig.symfony.com/doc/tests/index.html)テンプレートタグに加えて、Craft がいくつか独自のものを提供します。

| Test                                                                    | 説明                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [array](#array)                                                         | Whether a variable is an array.                                  |
| [boolean](#boolean)                                                     | Whether a variable is a boolean value.                           |
| [callable](#callable)                                                   | Whether a variable is callable.                                  |
| [constant](https://twig.symfony.com/doc/2.x/tests/constant.html)        | Whether a variable is the same as a PHP constant value.          |
| [defined](https://twig.symfony.com/doc/2.x/tests/defined.html)          | Whether a variable is defined.                                   |
| [divisible by](https://twig.symfony.com/doc/2.x/tests/divisibleby.html) | Whether a number is divisible by another number.                 |
| [empty](https://twig.symfony.com/doc/2.x/tests/empty.html)              | Whether a variable is empty.                                     |
| [even](https://twig.symfony.com/doc/2.x/tests/even.html)                | Whether a number is even.                                        |
| [float](#float)                                                         | Whether a variable is a float value.                             |
| [instance of](#instance-of)                                             | Whether an object is an instance of a namespace or parent class. |
| [integer](#integer)                                                     | Whether a variable is an integer value.                          |
| [iterable](https://twig.symfony.com/doc/2.x/tests/iterable.html)        | Whether a variable is an array or a traversable object.          |
| [missing](#missing)                                                     | Whether an object is missing its expected class.                 |
| [null](https://twig.symfony.com/doc/2.x/tests/null.html)                | Whether a variable is `null`.                                    |
| [numeric](#numeric)                                                     | Whether a variable is numeric.                                   |
| [odd](https://twig.symfony.com/doc/2.x/tests/odd.html)                  | Whether a number is odd.                                         |
| [resource](#resource)                                                   | Whether a variable is a resource.                                |
| [same as](https://twig.symfony.com/doc/2.x/tests/sameas.html)           | Whether a variable is the same as another.                       |
| [scalar](#scalar)                                                       | Whether a variable is a scalar.                                  |
| [string](#string)                                                       | Whether a variable is a string value.                            |

## `array`

Returns whether an object is an array via PHP’s [`is_array()`](https://www.php.net/manual/en/function.is-array.php) method.

```twig
{{ ['oh', 'hello', 'there'] is array ? 'true' : 'false' }}
{# result: true #}

{{ 'oh hai' is array ? 'true' : 'false' }}
{# result: false #}
```

## `boolean`

Returns whether an object is a boolean via PHP’s [`is_bool()`](https://www.php.net/manual/en/function.is-bool.php) method.

```twig
{% if myVar is boolean %}
  {{ myVar ? 'true' : 'false' }}
{% endif %}
```

## `callable`

Returns whether an object is callable via PHP’s [`is_callable()`](https://www.php.net/manual/en/function.is-callable.php) method.

```twig
{{ [entry, 'getStatus'] is callable ? 'true' : 'false' }}
{# result: true #}
```

## `float`

Returns whether an object is a float via PHP’s [`is_float()`](https://www.php.net/manual/en/function.is-float.php) method.

```twig
{{ 10.5 is float ? 'true' : 'false' }}
{# result: true #}

{{ 9 is float ? 'true' : 'false' }}
{# result: false #}

{{ 'duck' is float ? 'true' : 'false' }}
{# result: false #}
```

## `instance of`

Returns whether an object is an instance of another object or class.

```twig
{% if element is instance of('craft\\elements\\Entry') %}
  <h1>{{ entry.title }}</h1>
{% endif %}
```

## `integer`

Returns whether an object is an integer via PHP’s [`is_int()`](https://www.php.net/manual/en/function.is-int.php) method.

```twig
{{ 23 is integer ? 'true' : 'false' }}
{# result: true #}

{{ '23' is integer ? 'true' : 'false' }}
{# result: false #}
```

## `missing`

Returns whether a given object is an instance of <craft3:craft\base\MissingComponentInterface>, an interface used to represent components whose types are missing.

```twig
{% if field is missing %}
  <p>😱</p>
{% endif %}
```

## `numeric`

Returns whether an object is numeric via PHP’s [`is_numeric()`](https://www.php.net/manual/en/function.is-numeric.php) method.

```twig
{{ 23 is numeric ? 'true' : 'false' }}
{# result: true #}

{{ '23' is numeric ? 'true' : 'false' }}
{# result: true #}

{{ 'twenty-three' is numeric ? 'true' : 'false' }}
{# result: false #}
```

## `resource`

Returns whether an object is a resource via PHP’s [`is_resource()`](https://www.php.net/manual/en/function.is-resource.php) method.

```twig
{{ asset.getStream() is resource ? 'true' : 'false' }}
{# result: true #}

{{ siteUrl is resource ? 'true' : 'false' }}
{# result: false #}
```

## `scalar`

Returns whether an object is a scalar via PHP’s [`is_scalar()`](https://www.php.net/manual/en/function.is-scalar.php) method.

```twig
{{ 'hai' is scalar ? 'true' : 'false' }}
{# result: true #}

{{ 23 is scalar ? 'true' : 'false' }}
{# result: true #}

{{ [23, 'hai'] is scalar ? 'true' : 'false' }}
{# result: false #}
```

## `string`

Returns whether an object is a string via PHP’s [`is_string()`](https://www.php.net/manual/en/function.is-string.php) method.

```twig
{{ '23' is string ? 'true' : 'false' }}
{# result: true #}

{{ 23 is string ? 'true' : 'false' }}
{# result: false #}
```
