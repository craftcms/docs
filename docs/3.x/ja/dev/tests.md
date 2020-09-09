# テスト

Craft の Twig テンプレートで利用可能な[テスト](https://twig.symfony.com/doc/2.x/templates.html#test-operator)は、以下の通りです。

| Test | 説明 |
---- | -----------
| [constant](https://twig.symfony.com/doc/2.x/tests/constant.html) | 変数が PHP 定数値と同じかどうか。 |
| [defined](https://twig.symfony.com/doc/2.x/tests/defined.html) | 変数が定義されているかどうか。 |
| [divisible by](https://twig.symfony.com/doc/2.x/tests/divisibleby.html) | 数値が別の数値で割り切れるかどうか。 |
| [empty](https://twig.symfony.com/doc/2.x/tests/empty.html) | 変数が空かどうか。 |
| [even](https://twig.symfony.com/doc/2.x/tests/even.html) | 数値が偶数かどうか。 |
| [instance of](#instance-of) | オブジェクトが名前空間や親クラスのインスタンスかどうか。 |
| [iterable](https://twig.symfony.com/doc/2.x/tests/iterable.html) | 変数が配列、または、Traversable オブジェクトかどうか。 |
| [missing](#missing) | オブジェクトに期待されるクラスがないかどうか。 |
| [null](https://twig.symfony.com/doc/2.x/tests/null.html) | 変数が `null` かどうか。 |
| [odd](https://twig.symfony.com/doc/2.x/tests/odd.html) | 数値が奇数かどうか。 |
| [same as](https://twig.symfony.com/doc/2.x/tests/sameas.html) | 変数が別のものと同じかどうか。 |

## `instance of`

オブジェクトが別のオブジェクトまたはクラスのインスタンスかどうかを返します。

```twig
{% if element is instance of('craft\\elements\\Entry') %}
    <h1>{{ entry.title }}</h1>
{% endif %}
```

## `missing`

指定されたオブジェクトが <craft3:craft\base\MissingComponentInterface> のインスタンスかどうかを返します。型が見つからないコンポーネントを表すために使用されるインターフェースです。

```twig
{% if field is missing %}
    <p>😱</p>
{% endif %}
```
