# Filters

The following [filters](https://twig.symfony.com/doc/2.x/templates.html#filters) are available to Twig templates in Craft:

| Filter                                                                             | Description                                                                                                      |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [abs](https://twig.symfony.com/doc/2.x/filters/abs.html)                           | Returns the absolute value of a number.                                                                          |
| [append](#append)                                                                  | Appends HTML to the end of another element.                                                                      |
| [ascii](#ascii)                                                                    | Converts a string to ASCII characters.                                                                           |
| [atom](#atom)                                                                      | Converts a date to an ISO-8601 timestamp.                                                                        |
| [attr](#attr)                                                                      | Modifies an HTML tag’s attributes.                                                                               |
| [batch](https://twig.symfony.com/doc/2.x/filters/batch.html)                       | Batches items in an array.                                                                                       |
| [camel](#camel)                                                                    | Formats a string into camelCase.                                                                                 |
| [capitalize](https://twig.symfony.com/doc/2.x/filters/capitalize.html)             | Capitalizes the first character of a string.                                                                     |
| [column](#column)                                                                  | Returns the values from a single property or key in an array.                                                    |
| [contains](#contains)                                                              | Returns whether an array contains a nested item with a given key/value pair.                                     |
| [convert_encoding](https://twig.symfony.com/doc/2.x/filters/convert_encoding.html) | Converts a string from one encoding to another.                                                                  |
| [currency](#currency)                                                              | Formats a number as currency.                                                                                    |
| [date](#date)                                                                      | Formats a date.                                                                                                  |
| [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)           | Modifies a date.                                                                                                 |
| [datetime](#datetime)                                                              | Formats a date with its time.                                                                                    |
| [default](https://twig.symfony.com/doc/2.x/filters/default.html)                   | Returns the value or a default value if empty.                                                                   |
| [diff](#diff)                                                                      | Returns the difference between arrays.                                                                           |
| [duration](#duration)                                                              | Returns a `DateInterval` object.                                                                                 |
| [encenc](#encenc)                                                                  | Encrypts and base64-encodes a string.                                                                            |
| [escape](https://twig.symfony.com/doc/2.x/filters/escape.html)                     | Escapes a string.                                                                                                |
| [explodeClass](#explodeclass)                                                      | Converts a `class` attribute value into an array of class names.                                                 |
| [explodeStyle](#explodestyle)                                                      | Converts a `style` attribute value into an array of property name/value pairs.                                   |
| [filesize](#filesize)                                                              | Formats a number of bytes into something else.                                                                   |
| [filter](#filter)                                                                  | Filters the items in an array.                                                                                   |
| [first](https://twig.symfony.com/doc/2.x/filters/first.html)                       | Returns the first character/item of a string/array.                                                              |
| [format](https://twig.symfony.com/doc/2.x/filters/format.html)                     | Formats a string by replacing placeholders.                                                                      |
| [group](#group)                                                                    | Groups items in an array.                                                                                        |
| [hash](#hash)                                                                      | Prefixes a string with a keyed-hash message authentication code (HMAC).                                          |
| [id](#id)                                                                          | Normalizes an element ID into only alphanumeric characters, underscores, and dashes.                             |
| [indexOf](#indexof)                                                                | Returns the index of a given value within an array, or the position of a passed-in string within another string. |
| [index](#index)                                                                    | Indexes the items in an array.                                                                                   |
| [intersect](#intersect)                                                            | Returns the intersecting items of two arrays.                                                                    |
| [join](https://twig.symfony.com/doc/2.x/filters/join.html)                         | Concatenates multiple strings into one.                                                                          |
| [json_decode](#json_decode)                                                        | JSON-decodes a value.                                                                                            |
| [json_encode](#json_encode)                                                        | JSON-encodes a value.                                                                                            |
| [kebab](#kebab)                                                                    | Formats a string into “kebab-case”.                                                                              |
| [keys](https://twig.symfony.com/doc/2.x/filters/keys.html)                         | Returns the keys of an array.                                                                                    |
| [last](https://twig.symfony.com/doc/2.x/filters/last.html)                         | Returns the last character/item of a string/array.                                                               |
| [lcfirst](#lcfirst)                                                                | Lowercases the first character of a string.                                                                      |
| [length](https://twig.symfony.com/doc/2.x/filters/length.html)                     | Returns the length of a string or array.                                                                         |
| [literal](#literal)                                                                | Escapes an untrusted string for use with element query params.                                                   |
| [lower](https://twig.symfony.com/doc/2.x/filters/lower.html)                       | Lowercases a string.                                                                                             |
| [map](https://twig.symfony.com/doc/2.x/filters/map.html)                           | Applies an arrow function to the items in an array.                                                              |
| [markdown](#markdown-or-md)                                                        | Processes a string as Markdown.                                                                                  |
| [merge](https://twig.symfony.com/doc/2.x/filters/merge.html)                       | Merges an array with another array                                                                               |
| [multisort](#multisort)                                                            | Sorts an array by one or more keys within its sub-arrays.                                                        |
| [namespace](#namespace)                                                            | Namespaces input names and other HTML attributes, as well as CSS selectors.                                      |
| [namespaceInputId](#namespaceinputid)                                              | Namespaces an element ID.                                                                                        |
| [namespaceInputName](#namespaceinputname)                                          | Namespaces an input name.                                                                                        |
| [nl2br](https://twig.symfony.com/doc/2.x/filters/nl2br.html)                       | Replaces newlines with `<br>` tags.                                                                        |
| [number](#number)                                                                  | Formats a number.                                                                                                |
| [number_format](https://twig.symfony.com/doc/2.x/filters/number_format.html)       | Formats numbers.                                                                                                 |
| [parseRefs](#parserefs)                                                            | Parses a string for reference tags.                                                                              |
| [pascal](#pascal)                                                                  | Formats a string into “PascalCase”.                                                                              |
| [percentage](#percentage)                                                          | Formats a percentage.                                                                                            |
| [prepend](#prepend)                                                                | Prepends HTML to the beginning of another element.                                                               |
| [purify](#purify)                                                                  | Runs HTML code through HTML Purifier.                                                                            |
| [push](#push)                                                                      | Appends one or more items onto the end of an array.                                                              |
| [raw](https://twig.symfony.com/doc/2.x/filters/raw.html)                           | Marks as value as safe for the current escaping strategy.                                                        |
| [reduce](https://twig.symfony.com/doc/2.x/filters/reduce.html)                     | Iteratively reduces a sequence or mapping to a single value.                                                     |
| [replace](#replace)                                                                | Replaces parts of a string with other things.                                                                    |
| [reverse](https://twig.symfony.com/doc/2.x/filters/reverse.html)                   | Reverses a string or array.                                                                                      |
| [round](https://twig.symfony.com/doc/2.x/filters/round.html)                       | Rounds a number.                                                                                                 |
| [rss](#rss)                                                                        | Converts a date to RSS date format.                                                                              |
| [slice](https://twig.symfony.com/doc/2.x/filters/slice.html)                       | Extracts a slice of a string or array.                                                                           |
| [snake](#snake)                                                                    | Formats a string into “snake_case”.                                                                              |
| [sort](https://twig.symfony.com/doc/2.x/filters/sort.html)                         | Sorts an array.                                                                                                  |
| [spaceless](https://twig.symfony.com/doc/2.x/filters/spaceless.html)               | Removes whitespace between HTML tags.                                                                            |
| [split](https://twig.symfony.com/doc/2.x/filters/split.html)                       | Splits a string by a delimiter.                                                                                  |
| [striptags](https://twig.symfony.com/doc/2.x/filters/striptags.html)               | Strips SGML/XML tags from a string.                                                                              |
| [time](#time)                                                                      | Formats a time.                                                                                                  |
| [timestamp](#timestamp)                                                            | Formats a human-readable timestamp.                                                                              |
| [title](https://twig.symfony.com/doc/2.x/filters/title.html)                       | Formats a string into “Title Case”.                                                                              |
| [translate](#translate-or-t)                                                       | Translates a message.                                                                                            |
| [trim](https://twig.symfony.com/doc/2.x/filters/trim.html)                         | Strips whitespace from the beginning and end of a string.                                                        |
| [ucfirst](#ucfirst)                                                                | Capitalizes the first character of a string.                                                                     |
| [unique](#unique)                                                                  | Removes duplicate values from an array.                                                                          |
| [unshift](#unshift)                                                                | Prepends one or more items to the beginning of an array.                                                         |
| [upper](https://twig.symfony.com/doc/2.x/filters/upper.html)                       | Formats a string into “UPPER CASE”.                                                                              |
| [url_encode](https://twig.symfony.com/doc/2.x/filters/url_encode.html)             | Percent-encodes a string as a URL segment or an array as a query string.                                         |
| [values](#values)                                                                  | Returns all the values in an array, resetting its keys.                                                          |
| [where](#where)                                                                    | Filters an array by key/value pairs.                                                                             |
| [withoutKey](#withoutkey)                                                          | Returns an array without the specified key.                                                                      |
| [without](#without)                                                                | Returns an array without the specified element(s).                                                               |

## `append`

Appends HTML to the end of another element.

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

If you only want to append a new element if one of the same type doesn’t already exist, pass `'keep'` as a second argument.

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>', 'keep') }}
{# Output: <div><p>Lorem</p></div> #}
```

If you want to replace an existing element of the same type, pass `'replace'` as a second argument.

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>', 'replace') }}
{# Output: <div><p>Ipsum</p></div> #}
```

## `ascii`

Converts a string to ASCII characters.

```twig
{{ 'über'|ascii }}
{# Output: uber #}
```

By default, the current site’s language will be used when choosing ASCII character mappings. You can override that by passing in a different locale ID.

```twig
{{ 'über'|ascii('de') }}
{# Output: ueber #}
```

## `atom`

Converts a date to an ISO-8601 timestamp (e.g. `2019-01-29T10:00:00-08:00`), which should be used for Atom feeds, among other things.

```twig
{{ entry.postDate|atom }}
```

## `attr`

Modifies an HTML tag’s attributes, using the same attribute definitions supported by using <yii2:yii\helpers\BaseHtml::renderTagAttributes()>.

```twig
{% set tag = '<div>' %}
{{ tag|attr({
    class: 'foo'
}) }}
{# Output: <div class="foo"> #}
```

Only the first tag will be modified, and any HTML comments or doctype declarations before it will be ignored.

```twig
{% set svg %}
    <?xml version="1.0" encoding="utf-8"?>
    <svg>...</svg>
{% endset %}
{{ svg|attr({
    class: 'icon'
}) }}
{# Output:
   <?xml version="1.0" encoding="utf-8"?>
   <svg class="icon">...</svg> #}
```

Attributes can be removed by setting them to `false`.

```twig
{% set tag = '<input type="text" disabled>' %}
{{ tag|attr({
    disabled: false
}) }}
{# Output: <input type="text"> #}
```

`class` and `style` attributes will be combined with the element’s existing attributes, if set.

```twig
{% set tag = '<div class="foo" style="color: black;">' %}
{{ tag|attr({
    class: 'bar',
    style: {background: 'red'}
}) }}
{# Output: <div class="foo bar" style="color: black; background: red;"> #}
```

All other attributes will replace the existing attribute values.

```twig
{% set tag = '<input type="text">' %}
{{ tag|attr({
    type: 'email'
}) }}
{# Output: <input type="email"> #}
```

If you want to completely replace a `class` or `style` attribute, remove it first, then set the new value:

```twig
{% set tag = '<div class="foo">' %}
{{ tag|attr({class: false})|attr({class: 'bar'}) }}
{# Output: <div class="bar"> #}
```

## `camel`

Returns a string formatted in “camelCase”.

```twig
{{ 'foo bar'|camel }}
{# Output: fooBar #}
```

## `column`

Returns the values from a single property or key in the input array.

```twig
{% set entryIds = entries|column('id') %}
```

An arrow function can be passed instead, if the values that should be returned don’t exist as a property or key on the array elements.

```twig
{% set authorNames = entries|column(e => e.author.fullName) %}
```

This works similarly to Twig’s core [`column`](https://twig.symfony.com/doc/2.x/filters/column.html) filter, except that [ArrayHelper::getColumn()](yii2:yii\helpers\BaseArrayHelper::getColumn()) is used rather than PHP’s [array_column()](https://secure.php.net/array_column) function.

## `contains`

Returns whether the passed-in array contains any nested arrays/objects with a particular key/attribute set to a given value.

```twig
{% set works = craft.entries()
    .section('artwork')
    .all() %}

{# See if any of the artwork has a mature rating #}
{% if works|contains('rating', 'm') %}
    <p class="mature">Some of this artwork is meant for mature viewers.</p>
{% endif %}
```

## `currency`

Formats a number with a given currency according to the user’s preferred language.

```twig
{{ 1000000|currency('USD') }}
{# Output: $1,000,000.00 #}
```

You can pass `stripZeros=true` to remove any fraction digits if the value to be formatted has no minor value (e.g. cents):

```twig
{{ 1000000|currency('USD', stripZeros=true) }}
{# Output: $1,000,000 #}
```

## `date`

Formats a timestamp or [DateTime](http://php.net/manual/en/class.datetime.php) object.

```twig
{{ entry.postDate|date }}
{# Output: Dec 20, 1990 #}
```

You can customize how the date is presented by passing a custom date format, just like Twig’s core [`date`](https://twig.symfony.com/doc/2.x/filters/date.html) filter:

```twig
{{ 'now'|date('m/d/Y') }}
{# Output: 12/20/1990 #}
```

Craft also provides some special format keywords that will output locale-specific date formats:

| Format               | Example                     |
| -------------------- | --------------------------- |
| `short`              | 12/20/1990                  |
| `medium` _(default)_ | Dec 20, 1990                |
| `long`               | December 20, 1990           |
| `full`               | Thursday, December 20, 1990 |

```twig
{{ entry.postDate|date('short') }}
{# Output: 12/20/1990 #}
```

The current application locale will be used by default. If you want to format the date for a different locale, use the `locale` argument:

```twig
{{ entry.postDate|date('short', locale='en-GB') }}
{# Output: 20/12/1990 #}
```

You can customize the timezone the time is output in, using the `timezone` param:

```twig
{{ entry.postDate|date('short', timezone='UTC') }}
{# Output: 12/21/1990 #}
```

::: tip
If the value passed to the date filter is `null`, it will return the current date by default.
:::

## `datetime`

Formats a timestamp or [DateTime](http://php.net/manual/en/class.datetime.php) object, including the time of day.

```twig
{{ entry.postDate|datetime }}
{# Output: Dec 20, 1990, 5:00:00 PM #}
```

Craft provides some special format keywords that will output locale-specific date and time formats:

```twig
{{ entry.postDate|datetime('short') }}
{# Output: 9/26/2018, 5:00 PM #}
```

Possible `format` values are:

| Format               | Example                                       |
| -------------------- | --------------------------------------------- |
| `short`              | 12/20/1990, 5:00 PM                           |
| `medium` _(default)_ | Dec 20, 1990, 5:00:00 PM                      |
| `long`               | December 20, 1990 at 5:00:00 PM PDT           |
| `full`               | Thursday, December 20, 1990 at 5:00:00 PM PDT |

The current application locale will be used by default. If you want to format the date and time for a different locale, use the `locale` argument:

```twig
{{ entry.postDate|datetime('short', locale='en-GB') }}
{# Output: 20/12/1990, 17:00 #}
```

You can customize the timezone the time is output in, using the `timezone` param:

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }}
{# Output: 12/21/1990, 12:00 AM #}
```

## `diff`

Returns the difference between arrays, using [array_diff()](https://www.php.net/manual/en/function.array-diff.php).

It will return a new array with any values that were in the initial array, which weren’t present in any of the arrays passed into the filter.

```twig
{% set arr1 = ['foo', 'bar'] %}
{% set arr2 = ['bar', 'baz'] %}
{% set arr3 = arr1|diff(arr2) %}
{# Result: ['foo'] #}
```

## `duration`

Runs a [DateInterval](http://php.net/manual/en/class.dateinterval.php) object through <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()>

```twig
<p>Posted {{ entry.postDate.diff(now)|duration(false) }} ago.</p>
```

## `encenc`

Encrypts and base64-encodes a string.

```twig
{{ 'secure-string'|encenc }}
```

## `explodeClass`

Converts a `class` attribute value into an array of class names.

If an array is passed in, it will be returned as-is.

```twig
{% set classNames = 'foo bar baz'|explodeClass %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `explodeStyle`

Converts a `style` attribute value into an array of property name/value pairs.

If an array is passed in, it will be returned as-is.

```twig
{% set styles = 'font-weight: bold; color: red;'|explodeStyle %}
{# Result: {'font-weight': 'bold', 'color': 'red'} #}
```

## `filesize`

Formats a number of bytes into something nicer.

```twig
{{ asset.size }}
{# Output: 1944685 #}
{{ asset.size|filesize }}
{# Output: 1.945 MB #}
```

## `filter`

Filters elements of an array.

If nothing is passed to it, any “empty” elements will be removed.

```twig
{% set array = ['foo', '', 'bar', '', 'baz'] %}
{% set filteredArray = array|filter %}
{# Result: ['foo', 'bar', 'baz'] #}
```

When an arrow function is passed, this works identically to Twig’s core [`filter`](https://twig.symfony.com/doc/2.x/filters/filter.html) filter.

```twig
{% set array = ['foo', 'bar', 'baz'] %}
{% set filteredArray = array|filter(v => v[0] == 'b') %}
{# Result: ['bar', 'baz'] #}
```

## `group`

Groups items in an array by a the results of an arrow function.

```twig
{% set allEntries = craft.entries.section('blog').all() %}
{% set allEntriesByYear = allEntries|group(e => e.postDate|date('Y')) %}

{% for year, entriesInYear in allEntriesByYear %}
    <h2>{{ year }}</h2>

    <ul>
        {% for entry in entriesInYear %}
            <li><a href="{{ entry.url }}">{{ entry.title }}</a></li>
        {% endfor %}
    </ul>
{% endfor %}
```

## `hash`

Prefixes the given string with a keyed-hash message authentication code (HMAC), for securely passing data in forms that should not be tampered with.

```twig
<input type="hidden" name="foo" value="{{ 'bar'|hash }}">
```

PHP scripts can validate the value via [Security::validateData()](yii2:yii\base\Security::validateData()):

```php
$foo = Craft::$app->request->getBodyParam('foo');
$foo = Craft::$app->security->validateData($foo);

if ($foo !== false) {
    // data is valid
}
```

## `id`

Formats a string into something that will work well as an HTML input `id`, via <craft3:craft\web\View::formatInputId()>.

```twig
{% set name = 'input[name]' %}
<input type="text" name="{{ name }}" id="{{ name|id }}">
```

## `index`

Runs an array through [ArrayHelper::index()](yii2:yii\helpers\BaseArrayHelper::index()).

```twig
{% set entries = entries|index('id') %}
```

## `indexOf`

Returns the index of a passed-in value within an array, or the position of a passed-in string within another string. (Note that the returned position is 0-indexed.) If no position can be found, `-1` is returned instead.

```twig
{% set colors = ['red', 'green', 'blue'] %}
<p>Green is located at position {{ colors|indexOf('green') + 1 }}.</p>

{% set position = 'team'|indexOf('i') %}
{% if position != -1 %}
    <p>There <em>is</em> an “i” in “team”! It’s at position {{ position + 1 }}.</p>
{% endif %}
```

## `intersect`

Returns an array containing only the values that are also in a passed-in array.

```twig
{% set ownedIngredients = [
    'vodka',
    'gin',
    'triple sec',
    'tonic',
    'grapefruit juice'
] %}

{% set longIslandIcedTeaIngredients = [
    'vodka',
    'tequila',
    'rum',
    'gin',
    'triple sec',
    'sweet and sour mix',
    'Coke'
] %}

{% set ownedLongIslandIcedTeaIngredients =
    ownedIngredients|intersect(longIslandIcedTeaIngredients)
%}
```

## `json_encode`

Returns the JSON representation of a value.

This works similarly to Twig’s core [`json_encode`](https://twig.symfony.com/doc/2.x/filters/json_encode.html) filter, except that the `options` argument will default to `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT` if the response content type is either `text/html` or `application/xhtml+xml`.

## `json_decode`

JSON-decodes a string into an array  by passing it through <yii2:yii\helpers\Json::decode()>.

```twig
{% set arr = '[1, 2, 3]'|json_decode %}
```

## `kebab`

Returns a string formatted in “kebab-case”.

::: tip
That’s a reference to [shish kebabs](https://en.wikipedia.org/wiki/Kebab#Shish) for those of you that don’t get the analogy.
:::

```twig
{{ 'foo bar?'|kebab }}
{# Output: foo-bar #}
```

## `lcfirst`

Lowercases the first character of a string.

```twig
{{ 'Foobar'|lcfirst }}
{# Output: foobar #}
```

## `literal`

Runs a string through <craft3:craft\helpers\Db::escapeParam()>.

```twig
{{ 'SELECT id, * FROM table'|literal }}
{# Output: SELECT id\, \* FROM table #}
```

## `markdown` or `md`

Processes a string with [Markdown](https://daringfireball.net/projects/markdown/).

```twig
{% set content %}
# Everything You Need to Know About Computer Keyboards

The only *real* computer keyboard ever made was famously
the [Apple Extended Keyboard II] [1].

    [1]: https://www.flickr.com/photos/gruber/sets/72157604797968156/
{% endset %}

{{ content|markdown }}
```

This filter supports two arguments:
- `flavor` can be `'original'` (default value), `'gfm'`(GitHub-Flavored Markdown), `'gfm-comment'` (GFM with newlines converted to `<br>`s), or `'extra'` (Markdown Extra)
- `inlineOnly` determines whether to only parse inline elements, omitting any `<p>` tags (defaults to `false`)

## `multisort`

Sorts an array by one or more properties or keys within an array’s values.

To sort by a single property or key, pass its name as a string:

```twig
{% set entries = entries|multisort('title') %}
```

To sort by multiple properties or keys, pass them in as an array. For example, this will sort entries by their post date first, and then by their title:

```twig
{% set entries = entries|multisort(['postDate', 'title']) %}
```

An arrow function can be passed instead, if the values that should be sorted by don’t exist as a property or key on the array elements.

```twig
{% set entries = entries|multisort(e => e.author.fullName) %}
```

The values will be sorted in ascending order by default. You can switch to descending order with the `direction` param:

```twig
{% set entries = entries|multisort('title', direction=SORT_DESC) %}
```

You can also customize which sorting behavior is used, with the `sortFlag` param. For example, to sort items numerically, use `SORT_NUMERIC`:

```twig
{% set entries = entries|multisort('id', sortFlag=SORT_NUMERIC) %}
```

See PHP’s [sort()](https://www.php.net/manual/en/function.sort.php) documentation for the available sort flags.

When sorting by multiple properties or keys, you must set the `direction` and `sortFlag` params to arrays as well.

```twig
{% set entries = entries|multisort([
    'postDate',
    'title',
], sortFlag=[SORT_NATURAL, SORT_FLAG_CASE]) %}
```

## `namespace`

The `|namespace` filter can be used to namespace input names and other HTML attributes, as well as CSS selectors.

For example, this:

```twig
{% set html %}
<style>
  .text { font-size: larger; }
  #title { font-weight: bold; }
</style>
<input class="text" id="title" name="title" type="text">
{% endset %}
{{ html|namespace('foo') }}
```

would become this:

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

Notice how the `#title` CSS selector became `#foo-title`, the `id` attribute changed from `title` to `foo-title`, and the `name` attribute changed from `title` to `foo[title]`.

If you want class names to get namespaced as well, pass `withClasses=true`. That will affect both class CSS selectors and `class` attributes:

```twig
{{ html|namespace('foo', withClasses=true) }}
```

That would result in:

```html{2,5}
<style>
  .foo-text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="foo-text" id="foo-title" name="foo[title]" type="text">
```

## `namespaceInputId`

Namepaces an element ID.

For example, this:

```twig
{{ 'bar'|namespaceInputId('foo') }}
```

would output:

```html
foo-bar
```

::: tip
If this is used within a [namespace](tags.md#namespace) tag, the namespace applied by the tag will be used by default.
:::

## `namespaceInputName`

Namepaces an input name.

For example, this:

```twig
{{ 'bar'|namespaceInputName('foo') }}
```

would output:

```html
foo[bar]
```

::: tip
If this is used within a [namespace](tags.md#namespace) tag, the namespace applied by the tag will be used by default.
:::

## `number`

Formats a number according to the user’s preferred language.

You can optionally pass `false` to it if you want group symbols to be omitted (e.g. commas in English).

```twig
{{ 1000000|number }}
{# Output: 1,000,000 #}

{{ 1000000|number(false) }}
{# Output: 1000000 #}
```

## `parseRefs`

Parses a string for [reference tags](../reference-tags.md).

```twig
{% set content %}
    {entry:blog/hello-world:link} was my first blog post. Pretty geeky, huh?
{% endset %}

{{ content|parseRefs|raw }}
```

## `pascal`

Returns a string formatted in “PascalCase” (AKA “UpperCamelCase”).

```twig
{{ 'foo bar'|pascal }}
{# Output: FooBar #}
```

## `percentage`

Formats a percentage according to the user’s preferred language.

## `prepend`

Prepends HTML to the beginning of another element.

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

If you only want to append a new element if one of the same type doesn’t already exist, pass `'keep'` as a second argument.

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>', 'keep') }}
{# Output: <div><p>Ipsum</p></div> #}
```

If you want to replace an existing element of the same type, pass `'replace'` as a second argument.

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>', 'replace') }}
{# Output: <div><p>Lorem</p></div> #}
```

## `purify`

Runs the given text through HTML Purifier.

```twig
{{ user.bio|purify }}
```

You can specify a custom HTML Purifier config file as well:

```twig
{{ user.bio|purify('user_bio') }}
```

That will configure HTML Purifier based on the settings defined by `config/htmlpurifier/user_bio.json`.

## `push`

Appends one or more items onto the end of an array, and returns the new array.

```twig
{% set array1 = ['foo'] %}
{% set array2 = array|push('bar', 'baz') %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `replace`

Replaces parts of a string with other things.

When a mapping array is passed, this works identically to Twig’s core [`replace`](https://twig.symfony.com/doc/2.x/filters/replace.html) filter:

```twig
{% set str = 'Hello, FIRST LAST' %}

{{ str|replace({
    FIRST: currentUser.firstName,
    LAST:  currentUser.lastName
}) }}
```

Or you can replace one thing at a time:

```twig
{% set str = 'Hello, NAME' %}

{{ str|replace('NAME', currentUser.name) }}
```

You can also use a regular expression to search for matches by starting and ending the replacement string’s value with forward slashes:

```twig
{{ tag.title|lower|replace('/[^\\w]+/', '-') }}
```

## `rss`

Outputs a date in the format required for RSS feeds (`D, d M Y H:i:s O`).

```twig
{{ entry.postDate|rss }}
```

## `snake`

Returns a string formatted in “snake_case”.

```twig
{{ 'foo bar'|snake }}
{# Output: foo_bar #}
```

## `time`

Outputs the time of day for a timestamp or [DateTime](http://php.net/manual/en/class.datetime.php) object.

```twig
{{ entry.postDate|time }}
{# Output: 10:00:00 AM #}
```

Craft provides some special format keywords that will output locale-specific time formats:

```twig
{{ entry.postDate|time('short') }}
{# Output: 10:00 AM #}
```

Possible `format` values are:

| Format               | Example        |
| -------------------- | -------------- |
| `short`              | 5:00 PM        |
| `medium` _(default)_ | 5:00:00 PM     |
| `long`               | 5:00:00 PM PDT |

The current application locale will be used by default. If you want to format the date and time for a different locale, use the `locale` argument:

```twig
{{ entry.postDate|time('short', locale='en-GB') }}
{# Output: 17:00 #}
```

You can customize the timezone the time is output in, using the `timezone` param:

```twig
{{ entry.postDate|time('short', timezone='UTC') }}
{# Output: 12:00 AM #}
```

## `timestamp`

Formats a date as a human-readable timestamp, via <craft3:craft\i18n\Formatter::asTimestamp()>.

```twig
{{ now|timestamp }}
{# Output: 9:00:00 AM #}
```

## `translate` or `t`

Translates a message with [Craft::t()](yii2:yii\BaseYii::t()).

```twig
{{ 'Hello world'|t('myCategory') }}
```

If no category is specified, it will default to `site`.

```twig
{{ 'Hello world'|t }}
```

::: tip
See [Static Message Translations](../sites.md#static-message-translations) for a full explanation on how this works.
:::

## `ucfirst`

Capitalizes the first character of a string.

```twig
{{ 'foobar'|ucfirst }}
{# Output: Foobar #}
```

## `unique`

Runs an array through [array_unique()](http://php.net/manual/en/function.array-unique.php).

```twig
{% set array = ['Larry', 'Darryl', 'Darryl'] %}
{{ array|unique }}
{# Result: ['Larry', 'Darryl'] #}
```

## `unshift`

Prepends one or more items to the beginning of an array, and returns the new array.

```twig
{% set array1 = ['foo'] %}
{% set array2 = array|unshift('bar', 'baz') %}
{# Result: ['bar', 'baz', 'foo'] #}
```

## `values`

Returns an array of all the values in a given array, but without any custom keys.

```twig
{% set arr1 = {foo: 'Foo', bar: 'Bar'} %}
{% set arr2 = arr1|values %}
{# arr2 = ['Foo', 'Bar'] #}
```

## `where`

Runs an array through <craft3:craft\helpers\ArrayHelper::where()>.

```twig
{% set array = { 'foo': 'bar', 'bar': 'baz', 'bat': 'bar' } %}
{{ array|filterByValue(v => v == 'bar') }}
{# Result: { 'foo': 'bar', 'bat': 'bar' } #}
```

## `without`

Returns an array without the specified element(s).

```twig
{% set entries = craft.entries.section('articles').limit(3).find %}
{% set firstEntry = entries[0] %}
{% set remainingEntries = entries|without(firstEntry) %}
```

## `withoutKey`

Returns an array without the specified key.

```twig
{% set array = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
} %}
{% set filtered = array|withoutKey('baz') %}
```
