# Tests

In addition to the template tags that [Twig comes with](https://twig.symfony.com/doc/tests/index.html), Craft provides a few of its own.

Test | Description
---- | -----------
[constant](https://twig.symfony.com/doc/3.x/tests/constant.html) | Whether a variable is the same as a PHP constant value.
[defined](https://twig.symfony.com/doc/3.x/tests/defined.html) | Whether a variable is defined.
[divisibleby](https://twig.symfony.com/doc/3.x/tests/divisibleby.html) | Whether a number is divisible by another number.
[empty](https://twig.symfony.com/doc/3.x/tests/empty.html) | Whether a variable is empty.
[even](https://twig.symfony.com/doc/3.x/tests/even.html) | Whether a number is even.
[instance of](#instance-of) | Whether an object is an instance of a namespace or parent class.
[iterable](https://twig.symfony.com/doc/3.x/tests/iterable.html) | Whether a variable is an array or a traversable object.
[missing](#missing) | Whether an object is missing its expected class.
[null](https://twig.symfony.com/doc/3.x/tests/null.html) | Whether a variable is `null`.
[odd](https://twig.symfony.com/doc/3.x/tests/odd.html) | Whether a number is odd.
[sameas](https://twig.symfony.com/doc/3.x/tests/sameas.html) | Whether a variable is the same as another.

## `instance of`

Returns whether an object is an instance of another object or class.

```twig
{% if element is instance of('craft\\elements\\Entry') %}
    <h1>{{ entry.title }}</h1>
{% endif %}
```

## `missing`

Returns whether a given object is an instance of <api:craft\base\MissingComponentInterface>, an interface used to represent components whose types are missing.

```twig
{% if field is missing %}
    <p>😱</p>
{% endif %}
```
