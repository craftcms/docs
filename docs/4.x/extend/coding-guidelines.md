# Coding Guidelines

Do your best to follow these guidelines when writing code for Craft and Craft plugins.

## Tooling

We maintain a few configurations to ensure Craft and all first-party extensions conform to the recommendations laid out in this document.

- [`craftcms/ecs`](repo:craftcms/ecs): “Easy Coding Standards,” with automatic patching.
- [`craftcms/phpstan`](repo:craftcms/phpstan): Prevent bugs with static analysis.
- [`craftcms/rector`](repo:craftcms/rector): Rector rule sets for upgrading plugins between major Craft versions.
- [`craftcms/phpstorm-settings`](repo:craftcms/phpstorm-settings): Style and inspection profiles for PhpStorm.

Use of these tools is not a requirement for inclusion in the Plugin Store, but understanding their value may help you manage a growing extension! [Contributions](repo:craftcms/cms/pulls) to Craft itself _will_ be checked against these standards.

## Code Style

Unless otherwise noted, we target PHP-FIG’s [PSR-12](https://www.php-fig.org/psr/psr-12/) “Extended Coding Style Guide” standards.

Our [ECS config](repo:craftcms/ecs) also enforces these rules:

- A trailing comma _must_ be present after the last element in an array and the last argument of a method definition, when split onto multiple lines.
- The opening parenthesis in an anonymous function declaration _must not_ be surrounded by spaces.
- Constants _must_ have a visibility declaration (PSR-12 chapter [4.3](https://www.php-fig.org/psr/psr-12/#43-properties-and-constants) makes them a condition of support, and all Craft 4-compatible code requires PHP 8.0.1 or greater).

We tend to follow these “soft” rules, as well:

- Chained method calls should each be placed on their own line, with the `->` operator at the beginning of each line.
- Strings that are concatenated across multiple lines should have the `.` operator at the ends of lines.
- Don’t put a space after type typecasts (`(int)$foo`) (See PSR-12 chapter [6.1](https://www.php-fig.org/psr/psr-12/#61-unary-operators))

::: tip
The Craft Autocomplete package provides Twig template autocompletion in PhpStorm for Craft and plugin/module variables and element types: <https://github.com/nystudio107/craft-autocomplete>
:::

## Best Practices

In addition to code style, we have some preferred ways of using language features and built-ins.

- Declare method argument and return types whenever possible.

    ```php
    public function synchronize(Entry $entry, array $data): bool
    ```

- Use strict comparison operators (`===` and `!==`) whenever possible.
- Use `$foo === null`/`$bar !== null` rather than `is_null($foo)`/`!is_null($bar)`.
- Use `(int)$foo`/`(float)$bar` rather than `intval($foo)`/`floatval($bar)`.
- Always pass `true`/`false` to the third argument of [in_array()](http://php.net/manual/en/function.in-array.php) to indicate whether the check should be type-strict (and make it `true` whenever possible).
- Use `$obj->property !== null` rather than `isset($obj->property)` in conditions that check if an object property is set.
- Use `empty()`/`!empty()` in conditions that check if an array is/isn’t empty.
- Refer to class names using the [::class](http://php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class) keyword (`Foo::class`) rather than as a string literal (`'some\namespace\Foo'`) or <yii2:yii\base\BaseObject::className()>.
- Initialize arrays explicitly (`$array = []`) rather than implicitly (e.g. `$array[] = 'foo'` where `$array` wasn’t defined yet).
- Use `self::_foo()` rather than `static::_foo()` when calling private static functions, since `static::` would break if the class is extended.
- Use `self::CONSTANT` rather than `static::CONSTANT` (unnecessary overhead).
- Only use the `parent::` keyword when calling a parent method with the exact same name as the current method. Otherwise use `$this->`.
- Private class property/method names should begin with an underscore (`private $_foo`) (Note that PSR-12 chapter [4.3](https://www.php-fig.org/psr/psr-12/#43-properties-and-constants) only states that leading underscores are “meaningless”).
- Don’t explicitly set class properties’ default values to `null` (e.g. `public $foo = null;`).
- Always use `require` or `include` when including a file that returns something, rather than `require_once` or `include_once`.
- Use `strpos($foo, $bar) === 0` rather than `strncmp($foo, $bar, $barLength) === 0` when checking if one string begins with another string, for short strings.
- Use `$str === ''` rather than `strlen($str) === 0` when checking if a string is empty.
- Avoid using `array_merge()` within loops when possible.
- Unset variables created by reference in foreach-loops after the loop is finished.

    ```php
    foreach ($array as &$value) {
        // ...
    }
    unset($value);
    ```

- Use `implode()` rather than `join()`.
- Use `in_array()` rather than `array_search(...) !== false` when the position of the needle isn’t needed.
- Don’t use a `switch` statement when a single `if` condition will suffice.
- Use single quotes (`'`) whenever double quotes (`"`) aren’t needed.
- Use shortcut operators (`+=`, `-=`, `*=`, `/=`, `%=`, `.=`, etc.) whenever possible.
- Use shortcut regular expression patterns (`\d`, `\D`, `\w`, `\W`, etc.) whenever possible.
- Use the `DIRECTORY_SEPARATOR` constant rather than `'/'` when defining file paths.

::: tip
The [Php Inspections (EA Extended)](https://plugins.jetbrains.com/idea/plugin/7622-php-inspections-ea-extended-) PhpStorm plugin can help you locate and fix these sorts of best practice issues.
:::

## Namespaces & Class Names

Follow PSR-12 and PSR-1 standards, with the following recommendations:

- Auto-loading must conform to [PSR-4](https://www.php-fig.org/psr/psr-4/), wherein a class’s file location can be inferred by its fully qualified name, given a known base namespace mapped to a base path.
- Namespaces should be all-lowercase.
- Only first-party code should use the `craft\` and `pixelandtonic\` namespace roots. Third party plugins should use a namespace root that refers to the vendor name and plugin name (e.g. `acme\myplugin\`).

## Method Names

Getter methods (methods whose primary responsibility is to return something, rather than do something) that **don’t accept any arguments** should begin with `get`, and there should be a corresponding `@property` tag in the class’s docblock to document the corresponding magic getter property.

- `getAuthor()`
- `getIsSystemOn()`
- `getHasFreshContent()`

Getter methods that **accept one or more arguments** (regardless of whether they can be omitted) should only begin with `get` if it “sounds right.”

- `getError($attribute)`
- `hasErrors($attribute = null)`

Static methods should generally not start with `get`.

  - `sources()`
  - `displayName()`

## Type Declarations

Use [type declarations](https://www.php.net/manual/en/language.types.declarations.php) whenever possible. The only exceptions should be:

- [Magic methods](http://php.net/manual/en/language.oop5.magic.php) (e.g. `__toString()`)
- Methods that override a parent class’s method, where the parent method doesn’t have type declarations
- Methods that are required by an interface, and the interface method doesn’t have type declarations

If an argument accepts two types and one of them is `null`, a `?` can be placed before the non-`null` type:

```php
public function foo(?string $bar): void
```

::: tip
PHP 8 introduced [union types](https://www.php.net/manual/en/language.types.type-system.php#language.types.type-system.composite.union) and the [`mixed` pseudo-type](https://www.php.net/manual/en/language.types.mixed.php), which are preferred to omitting a type altogether.
:::

## Docblocks

- Methods that override subclass methods or implement an interface method, and don’t have anything relevant to add to the docblock, should only have `@inheritdoc` in the docblock.
- Use full sentences with proper capitalization, grammar, and punctuation in docblock descriptions.
- `@param` and `@return` tags should **not** have proper capitalization or punctuation.
- Use `bool` and `int` instead of `boolean` and `integer` in type declarations.
- Specify array members’ class names in array type declarations when it makes sense (`ElementInterface[]` rather than `array`). `array` is still acceptable in the actual [method signature](#type-declarations).
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

## Control Flow

### Happy Paths

Use [them](https://en.wikipedia.org/wiki/Happy_path). In general, the execution of a method should only make it all the way to the end if everything went as expected.

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
if (!$condition) {
    return $foo;
} else {
    return $bar;
}

// Better:
if (!$condition) {
    return $foo;
}

return $bar;
```

## Controllers

### Return Types

Controller actions that should complete the request must return either a string (implying a `text/html` content type) or a <craft4:craft\web\Response> object.

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

::: tip
See [Controllers](./controllers.md#handling-requests) for more information on writing content-type-agnostic actions.
:::

## Exceptions

- If an exception is likely to occur as a result of user error (and it may be displayed to them), use the <yii2:yii\base\UserException> class (or a subclass).
- Only translate exception messages with <craft4:Craft::t()> if it’s a <yii2:yii\base\UserException>.

## DB Queries

- Always wrap a table name with `{{%` and `}}` (e.g. `{{%entries}}`) so it’s properly quoted and the [table prefix](../config/db.md#tableprefix) gets inserted.
- Use the `['col1', 'col2']` syntax with `select()` and `groupBy()` instead of `'col1, col2'` even if you’re only referencing a single column.
- Use the `['{{%tablename}}']` syntax with `from()` instead of `'{{%tablename}}'`.
- Use the `['col1' => SORT_ASC, 'col2' => SORT_DESC]` syntax with `orderBy()` instead of `'col1, col2 desc'`.

### Conditions
- Always use Yii’s [declarative condition syntax](yii2:yii\db\QueryInterface::where()) when possible, as it will automatically quote table/column names and values for you.
- For consistency, use:
  - `['col' => $values]`  instead of `['in', 'col', $values]`
  - `['col' => $value]`  instead of `['=', 'col', $value]`
  - `['like', 'col', 'value']`  instead of `['like', 'col', '%value%', false]`
    *(unless the `%` is only needed on one side of `value`)*
- If searching for `NULL`, use the `['col' => null]` syntax.
- If searching for `NOT NULL`, use the `['not', ['col' => null]]` syntax.
- If you cannot use the declarative condition syntax (e.g. the condition is referencing another table/column name rather than a value, as is often the case with joins), make sure you’ve quoted all column names (`[[column]]`), and any values that you aren’t 100% confident are safe to add as query params.

```php
// Bad:
$query->where('foo.thing is null');
$query->innerJoin('{{%bar}} bar', 'bar.fooId = foo.id');

// Better:
$query->where(['foo.thing' => null]);
$query->innerJoin('{{%bar}} bar', '[[bar.fooId]] = [[foo.id]]');
```

## Getters & Setters

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

App components should have their own getter functions, which call the app component getter method [get()](yii2:yii\di\ServiceLocator::get()) directly, using component class as its [return type](#return-types):

```php
use craft\services\Entries;

// ...

public function getEntries(): Entries
{
    return $this->get('entries');
}
```

Use those instead of their magic properties:

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
