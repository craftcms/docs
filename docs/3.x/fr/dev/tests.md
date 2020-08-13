# Tests

The following [tests](https://twig.symfony.com/doc/2.x/templates.html#test-operator) are available to Twig templates in Craft:

| Test                                                                    | Description                                                      |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [constant](https://twig.symfony.com/doc/2.x/tests/constant.html)        | Whether a variable is the same as a PHP constant value.          |
| [defined](https://twig.symfony.com/doc/2.x/tests/defined.html)          | Whether a variable is defined.                                   |
| [divisible by](https://twig.symfony.com/doc/2.x/tests/divisibleby.html) | Whether a number is divisible by another number.                 |
| [empty](https://twig.symfony.com/doc/2.x/tests/empty.html)              | Whether a variable is empty.                                     |
| [even](https://twig.symfony.com/doc/2.x/tests/even.html)                | Whether a number is even.                                        |
| [instance of](#instance-of)                                             | Whether an object is an instance of a namespace or parent class. |
| [iterable](https://twig.symfony.com/doc/2.x/tests/iterable.html)        | Whether a variable is an array or a traversable object.          |
| [missing](#missing)                                                     | Whether an object is missing its expected class.                 |
| [null](https://twig.symfony.com/doc/2.x/tests/null.html)                | Whether a variable is `null`.                                    |
| [odd](https://twig.symfony.com/doc/2.x/tests/odd.html)                  | Whether a number is odd.                                         |
| [same as](https://twig.symfony.com/doc/2.x/tests/sameas.html)           | Whether a variable is the same as another.                       |

## `instance of`

Returns whether an object is an instance of another object or class.

```twig
{% if element is instance of('craft\\elements\\Entry') %}
    <h1>{{ entry.title }}</h1>
{% endif %}
```

## `missing`

Returns whether a given object is an instance of <craft3:craft\base\MissingComponentInterface>, an interface used to represent components whose types are missing.

```twig
{% if field is missing %}
    <p>😱</p>
{% endif %}
```
