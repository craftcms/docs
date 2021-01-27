# コーディングガイドライン

Craft や Craft プラグイン向けのコードを書くときには、このガイドラインに従うよう最善を尽くしてください。

## コードスタイル

- [PSR-1](https://www.php-fig.org/psr/psr-1/) と [PSR-2](https://www.php-fig.org/psr/psr-2/) のコーディング基準に従ってください。
- 短い配列構文（`['foo' => 'bar']`）を使用してください。
- 行の長さにあまり思い悩まないでください。 可読性に焦点を当てましょう。
- チェインメソッドの呼び出しは、各行の先頭に `->` 演算子を付けて、独自の行に配置する必要があります。
- 複数行にまたがる条件文には、行の最後に理論演算子（`||`、`&&` など）を付ける必要があります。
- 複数行に渡って連結される文字列は、行の最後に `.` 演算子を付ける必要があります。
- 型変換の後にスペースを置かないでください（`(int)$foo`）。
- `include` / `include_once` / `require` / `require_once` のファイルパスを括弧で囲まないでください。 それらはファンクションではありません。

::: tip
PhpStorm プラグインの [Php Inspections (EA Extended)](https://plugins.jetbrains.com/idea/plugin/7622-php-inspections-ea-extended-) は、これらのベストプラクティスの問題を見つけて修正するのに役立ちます。
:::

## ベストプラクティス

- 可能な限り、メソッド引数の型を宣言してください。

    ```php
    public function foo(Entry $entry, array $settings)
    ```

- 可能な限り、厳格な比較演算子（`===` および `!==`）を使用してください。
- Use `$foo === null`/`$bar !== null` rather than `is_null($foo)`/`!is_null($bar)`.
- Use `(int)$foo`/`(float)$bar` rather than `intval($foo)`/`floatval($bar)`.
- Always pass `true`/`false` to the third argument of [in_array()](http://php.net/manual/en/function.in-array.php) to indicate whether the check should be type-strict (and make it `true` whenever possible).
- Use `$obj->property !== null` rather than `isset($obj->property)` in conditions that check if an object property is set.
- Use `empty()`/`!empty()` in conditions that check if an array is/isn’t empty.
- Refer to class names using the [::class](http://php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class) keyword (`Foo::class`) rather than as a string (`'some\nmspace\Foo'`) or <yii2:yii\base\BaseObject::className()>.
- Initialize arrays explicitly (`$array = []`) rather than implicitly (e.g. `$array[] = 'foo'` where `$array` wasn’t defined yet).
- Use `self::_foo()` rather than `static::_foo()` when calling private static functions, since `static::` would break if the class is extended.
- Use `self::CONSTANT` rather than `static::CONSTANT` (unnecessary overhead).
- Only use the `parent::` keyword when calling a parent method with the exact same name as the current method. Otherwise use `$this->`.
- Always specify the visibility of class properties and methods (`public`, `protected`, or `private`).
- Private class property/method names should begin with an underscore (`private $_foo`).
- 2つの型を受け入れる引数の1つが `null` の場合、引数は `null` 以外の型を型宣言に持ち、デフォルト値を `null` とします。
- Always use `require` or `include` when including a file that returns something, rather than `require_once` or `include_once`.
- Use `strpos($foo, $bar) === 0` rather than `strncmp($foo, $bar, $barLength) === 0` when checking if one string begins with another string, for short strings.
- Use `$str === ''` rather than `strlen($str) === 0` when checking if a string is empty.
- Avoid using `array_merge()` within loops when possible.
- ループ処理の終了後、foreach ループの参照によって作成された変数を解除してください。

    ```php
    foreach ($array as &$value) {
        // ...
    }
    unset($value);
    ```

- `join()` よりむしろ `implode()` を使用してください。
- Use `in_array()` rather than `array_search(...) !== false` when the position of the needle isn’t needed.
- Don’t use a `switch` statement when a single `if` condition will suffice.
- Use single quotes (`'`) whenever double quotes (`"`) aren’t needed.
- Use shortcut operators (`+=`, `-=`, `*=`, `/=`, `%=`, `.=`, etc.) whenever possible.
- Use shortcut regex patterns (`\d`, `\D`, `\w`, `\W`, etc.) whenever possible.
- Use the `DIRECTORY_SEPARATOR` constant rather than `'/'` when defining file paths.

::: tip
The [Php Inspections (EA Extended)](https://plugins.jetbrains.com/idea/plugin/7622-php-inspections-ea-extended-) PhpStorm plugin can help you locate and fix these sorts of best practice issues.
:::

## 名前空間とクラス名

- ベースパスにマップされている既知のベース名前空間があれば、クラスのファイルの場所を完全修飾名で推測できる [PSR-4](https://www.php-fig.org/psr/psr-4/) 仕様に従ってください。
- 名前空間は、すべて小文字であるべきです。
- クラス名は `StudlyCase` にする必要があります。
- ファーストパーティのコードだけが、``craft\` および``pixelandtonic\` 名前空間ルートを使用します。 サードパーティプラグインは、ベンダー名とプラグイン名（例：`acme\myplugin\`）を参照する名前空間ルートを使用する必要があります。

## メソッド名

（省略できるかどうかに関わらず）**1つ、または、複数の引数を受け入れる** Getter メソッドは、「正しいと思う」場合のみ `get` ではじめます。

- `getAuthor()`
- `getIsSystemOn()`
- `getHasFreshContent()`

静的メソッドは、一般的に `get` ではじめるべきではありません。

- `getError($attribute)`
- `hasErrors($attribute = null)`

Static methods should generally not start with `get`.

  - `className()`
  - `displayName()`

## 型宣言

Use [type declarations](https://www.php.net/manual/en/language.types.declarations.php) whenever possible. 唯一の例外は、次の通りです。

- [マジックメソッド](http://php.net/manual/en/language.oop5.magic.php)（例：`__toString()`）
- Arguments/return statements that could be multiple non-`null` value types
- 親メソッドで型宣言を持たない、親クラスのメソッドを上書きするメソッド
- インターフェースで必要なメソッドで、インターフェースメソッドに型宣言がないもの

If an argument accepts two types and one of them is `null`, a `?` can be placed before the non-`null` type:

```php
public function foo(?string $bar): void
```

## Docblock

- Methods that override subclass methods or implement an interface method, and don’t have anything relevant to add to the docblock, should only have `@inheritdoc` in the docblock.
- Use full sentences with proper capitalization, grammar, and punctuation in docblock descriptions.
- `@param` and `@return` tags should **not** have proper capitalization or punctuation.
- Use `bool` and `int` instead of `boolean` and `integer` in type declarations.
- Specify array members’ class names in array type declarations when it makes sense (`ElementInterface[]` rather than `array`).
- Chainable functions that return an instance of the current class should use `static` as the return type declaration.
- Functions that don’t ever return anything should have `@return void`.

### Interfaces vs. Implementation Classes

`@param` , `@return` , `@var` , `@method` and `@property` tags on public service methods should reference Interfaces (when applicable), not their implementation class:

```php
// Bad:
/**
 * @param \craft\base\Element $element
 * @param \craft\base\ElementInterface|\craft\base\Element $element
 */

// Better:
/**
 * @param \craft\base\ElementInterface $element
 */
```

Inline `@var` tags should reference implementation classes, not their interfaces:

```php
// Bad:
/** @var \craft\base\ElementInterface $element */
/** @var \craft\base\ElementInterface|\craft\base\Element $element */

// Better:
/** @var \craft\base\Element $element */
```

## 制御フロー

### Happy Paths

Use [them](https://en.wikipedia.org/wiki/Happy_path). In general the execution of a method should only make it all the way to the end if everything went as expected.

```php
// Bad:
if ($condition) {
    // Do stuff

    return true;
}

return false;

// Better:
if (!$condition) {
    return false;
}

// Do stuff

return true;
```

### `if`…`return`…`else`

Don’t do this. There’s no point, and can be misleading at first glance.

```php
// Bad:
if ($condition) {
    return $foo;
} else {
    return $bar;
}

// Better:
if ($condition) {
    return $foo;
}

return $bar;
```

## コントローラー

### Return Types

Controller actions that should complete the request must return either a string (HTML) or a Response object.

```php
// Bad:
$this->asJson($obj);
$this->renderTemplate($template, $variables);

// Better:
return $this->asJson($obj);
return $this->renderTemplate($template, $variables);
```

### JSON Actions

Controller actions that have the option of returning JSON should do so if the request explicitly accepts a JSON response; not if it’s an Ajax request.

```php
// Bad:
if (\Craft::$app->getRequest()->getIsAjax()) {
    return $this->asJson([...]);
}

// Better:
if (\Craft::$app->getRequest()->getAcceptsJson()) {
    return $this->asJson([...]);
}
```

Controller actions that *only* return JSON should require that the request accepts JSON.

```php
$this->requireAcceptsJson();
```

## 例外

- If an exception is likely to occur as a result of user error, use the <yii2:yii\base\UserException> class (or a subclass)
- Only translate exception messages with <craft3:Craft::t()> if it’s a <yii2:yii\base\UserException>.

## データベースクエリ

- Always wrap a table name with `{{%` and `}}` (e.g. `{{%entries}}`) so it’s properly quoted and the table prefix gets inserted.
- Use the `['col1', 'col2']` syntax with `select()` and `groupBy()` instead of `'col1, col2'` even if you’re only referencing a single column.
- Use the `['{{%tablename}}']` syntax with `from()` instead of `'{{%tablename}}'`.
- Use the `['col1' => SORT_ASC, 'col2' => SORT_DESC]` syntax with `orderBy()` instead of `'col1, col2 desc'`.

### Conditions
- Always use Yii’s [declarative condition syntax](yii2:yii\db\QueryInterface::where()) when possible, as it will automatically quote table/column names and values for you.
- For consistency, use:
  - `['col' => $values]`  instead of `['in', 'col', $values]`
  - `['col' => $value]`  instead of `['=', 'col', $value]`
  - `['like', 'col', 'value']`  instead of `['like', 'col', '%value%', false]` *(unless the `%` is only needed on one side of `value`)*
- If searching for `NULL`, use the `['col' => null]` syntax.
- If searching for `NOT NULL`, use the `['not', ['col' => null]]` syntax.
- If you cannot use the declarative condition syntax (e.g. the condition is referencing another table/column name rather than a value, as is often the case with joins), make sure you’ve quoted all column names, and any values that you aren’t 100% confident are safe should be added as query params.

```php
// Bad:
$query->where('foo.thing is null');
$query->innerJoin('{{%bar}} bar', 'bar.fooId = foo.id');

// Better:
$query->where(['foo.thing' => null]);
$query->innerJoin('{{%bar}} bar', '[[bar.fooId]] = [[foo.id]]');
```

## Getter と Setter

Getter and setter methods should have a corresponding `@property` tag in the class’s docblock, so IDEs like PhpStorm can be aware of the magic properties.

```php
/**
 * @property User $author
 */
class Entry
{
    private $_author;

    /**
     * @return User
     */
    public function getAuthor()
    {
        return $this->_author;
    }
}
```

For a slight performance improvement and easier debugging, you should generally stick with calling the getter and setter methods directly rather than going through their magic properties.

```php
// Bad:
$oldAuthor = $entry->author;
$entry->author = $newAuthor;

// Better:
$oldAuthor = $entry->getAuthor();
$entry->setAuthor($newAuthor);
```

### App Component Getters

App components should have their own getter functions, which call the app component getter method [get()](yii2:yii\di\ServiceLocator::get()) directly:

```php
/**
 * @return Entries
 */
public function getEntries()
{
    return $this->get('entries');
}
```

And you should use those instead of their magic properties:

```php
// Bad:
\Craft::$app->entries->saveEntry($entry);

// Better:
\Craft::$app->getEntries()->saveEntry($entry);
```

If you will be referencing the same app component multiple times within the same method, save a local reference to it.

```php
// Bad:
\Craft::$app->getEntries()->saveEntry($entry1);
\Craft::$app->getEntries()->saveEntry($entry2);

// Better:
$entriesService = \Craft::$app->getEntries();
$entriesService->saveEntry($entry1);
$entriesService->saveEntry($entry2);
```
