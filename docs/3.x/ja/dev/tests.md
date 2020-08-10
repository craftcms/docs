# テスト

[Twig に付随する](https://twig.symfony.com/doc/tests/index.html)テンプレートタグに加えて、Craft がいくつか独自のものを提供します。

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

オブジェクトが別のオブジェクトまたはクラスのインスタンスかどうかを返します。

```twig
{% if element is instance of('craft\\elements\\Entry') %}
    <h1>{{ entry.title }}</h1>
{% endif %}
```

## `missing`

指定されたオブジェクトが <craft3:craft\base\MissingComponentInterface> のインスタンスかどうかを返します。 型が見つからないコンポーネントを表すために使用されるインターフェースです。

```twig
{% if field is missing %}
    <p>😱</p>
{% endif %}
```
