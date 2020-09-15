# フィルタ

[Twig に付随する](https://twig.symfony.com/doc/filters/index.html)テンプレートフィルタに加えて、Craft がいくつか独自のものを提供します。

| フォーマット                                                                             | 実例                                                                                                                           |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [abs](https://twig.symfony.com/doc/2.x/filters/abs.html)                           | 9/26/2018                                                                                                                    |
| [append](#append)                                                                  | Sep 26, 2018                                                                                                                 |
| [ucwords](#ascii)                                                                  | September 26, 2018                                                                                                           |
| [atom](#atom)                                                                      | Wednesday, September 26, 2018                                                                                                |
| [ucwords](#attr)                                                                   | Modifies an HTML tag’s attributes.                                                                                           |
| [batch](https://twig.symfony.com/doc/2.x/filters/batch.html)                       | Merges an array with another array.                                                                                          |
| [camel](#camel)                                                                    | 「camelCase」でフォーマットされた文字列を返します。                                                                                               |
| [capitalize](https://twig.symfony.com/doc/2.x/filters/capitalize.html)             | Capitalizes the first character of a string.                                                                                 |
| [column](#column)                                                                  | 渡された配列内にある値だけを含む配列を返します。                                                                                                     |
| [contains](#contains)                                                              | Returns whether an array contains a nested item with a given key/value pair.                                                 |
| [convert_encoding](https://twig.symfony.com/doc/2.x/filters/convert_encoding.html) | Converts a string from one encoding to another.                                                                              |
| [currency](#currency)                                                              | Formats a number as currency.                                                                                                |
| [date](#date)                                                                      | 経由で、人が読めるタイムスタンプとして日付をフォーマットします。                                                                                             |
| [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)           | Modifies a date.                                                                                                             |
| [datetime](#datetime)                                                              | Formats a date with its time.                                                                                                |
| [default](https://twig.symfony.com/doc/2.x/filters/default.html)                   | Returns the value or a default value if empty.                                                                               |
| [diff](#diff)                                                                      | Reverses an array or string.                                                                                                 |
| [duration](#duration)                                                              | Returns a `DateInterval` object.                                                                                             |
| [encenc](#encenc)                                                                  | Encrypts and base64-encodes a string.                                                                                        |
| [escape](https://twig.symfony.com/doc/2.x/filters/escape.html)                     | Extracts a slice of an array or string.                                                                                      |
| [explodeClass](#explodeclass)                                                      | Converts a `class` attribute value into an array of class names.                                                             |
| [explodeStyle](#explodestyle)                                                      | Converts a `style` attribute value into an array of property name/value pairs.                                               |
| [filesize](#filesize)                                                              | Formats a number of bytes into something else.                                                                               |
| [filter](#filter)                                                                  | 配列に <craft3:craft\helpers\ArrayHelper::filterByValue()> を実行します。                                                            |
| [first](https://twig.symfony.com/doc/2.x/filters/first.html)                       | Splits a string by the given delimiter and returns a list of string.                                                         |
| [format](https://twig.symfony.com/doc/2.x/filters/format.html)                     | Converts a value to uppercase.                                                                                               |
| [group](#group)                                                                    | 共通のプロパティに基づいて、配列の項目をグループ化します。                                                                                                |
| [hash](#hash)                                                                      | 不正に変更されるべきではないフォームのデータを安全に渡すために、メッセージ認証コード（HMAC）の鍵付ハッシュを指定された文字列の先頭に追加します。                                                   |
| [id](#id)                                                                          | Normalizes an element ID into only alphanumeric characters, underscores, and dashes.                                         |
| [indexOf](#indexof)                                                                | Returns the index of a given value within an array, or the position of a passed-in string within another string.             |
| [index](#index)                                                                    | Indexes the items in an array.                                                                                               |
| [intersect](#intersect)                                                            | Returns the intersecting items of two arrays.                                                                                |
| [join](https://twig.symfony.com/doc/2.x/filters/join.html)                         | 文字列の最初の文字を大文字にします。                                                                                                           |
| [json_decode](#json_decode)                                                        | JSON-decodes a value.                                                                                                        |
| [json_encode](#json_encode)                                                        | JSON-encodes a value.                                                                                                        |
| [kebab](#kebab)                                                                    | Formats a string into “kebab-case”.                                                                                          |
| [keys](https://twig.symfony.com/doc/2.x/filters/keys.html)                         | Returns the keys of an array.                                                                                                |
| [last](https://twig.symfony.com/doc/2.x/filters/last.html)                         | Returns the last character/item of a string/array.                                                                           |
| [lcfirst](#lcfirst)                                                                | Lowercases the first character of a string.                                                                                  |
| [length](https://twig.symfony.com/doc/2.x/filters/length.html)                     | Returns the length of a string or array.                                                                                     |
| [literal](#literal)                                                                | Escapes an untrusted string for use with element query params.                                                               |
| [lower](https://twig.symfony.com/doc/2.x/filters/lower.html)                       | Capitalizes the first character of each word in a string.                                                                    |
| [map](https://twig.symfony.com/doc/2.x/filters/map.html)                           | Applies an arrow function to the items in an array.                                                                          |
| [markdown](#markdown-or-md)                                                        | Processes a string as Markdown.                                                                                              |
| [merge](https://twig.symfony.com/doc/2.x/filters/merge.html)                       | Merges an array with another array                                                                                           |
| [multisort](#multisort)                                                            | Sorts an array with [ArrayHelper::multisort()](yii2:yii\helpers\BaseArrayHelper::multisort()).                             |
| [namespace](#namespace)                                                            | Namespaces input names and other HTML attributes, as well as CSS selectors.                                                  |
| [namespaceInputId](#namespaceinputid)                                              | Namespaces an element ID.                                                                                                    |
| [namespaceInputName](#namespaceinputname)                                          | Namespaces an input name.                                                                                                    |
| [nl2br](https://twig.symfony.com/doc/2.x/filters/nl2br.html)                       | Inserts HTML line breaks before all newlines in a string.                                                                    |
| [number](#number)                                                                  | Formats a number.                                                                                                            |
| [number_format](https://twig.symfony.com/doc/2.x/filters/number_format.html)       | Formats numbers.                                                                                                             |
| [parseRefs](#parserefs)                                                            | Parses a string for reference tags.                                                                                          |
| [pascal](#pascal)                                                                  | Formats a string into “PascalCase”.                                                                                          |
| [percentage](#percentage)                                                          | Formats a percentage.                                                                                                        |
| [prepend](#prepend)                                                                | Prepends HTML to the beginning of another element.                                                                           |
| [purify](#purify)                                                                  | Runs HTML code through HTML Purifier.                                                                                        |
| [push](#push)                                                                      | Appends one or more items onto the end of an array.                                                                          |
| [raw](https://twig.symfony.com/doc/2.x/filters/raw.html)                           | Marks as value as safe for the current escaping strategy.                                                                    |
| [reduce](https://twig.symfony.com/doc/2.x/filters/reduce.html)                     | Iteratively reduces a sequence or a mapping to a single value using an arrow function, so as to reduce it to a single value. |
| [replace](#replace)                                                                | Replaces parts of a string with other things.                                                                                |
| [reverse](https://twig.symfony.com/doc/2.x/filters/reverse.html)                   | Reverses a string or array.                                                                                                  |
| [round](https://twig.symfony.com/doc/2.x/filters/round.html)                       | Rounds a number to a given precision.                                                                                        |
| [rss](#rss)                                                                        | Converts a date to RSS date format.                                                                                          |
| [slice](https://twig.symfony.com/doc/2.x/filters/slice.html)                       | Percent-encodes a given string as URL segment or an array as query string.                                                   |
| [snake](#snake)                                                                    | Formats a string into “snake_case”.                                                                                          |
| [sort](https://twig.symfony.com/doc/2.x/filters/sort.html)                         | Sorts an array.                                                                                                              |
| [spaceless](https://twig.symfony.com/doc/2.x/filters/spaceless.html)               | Removes whitespace between HTML tags, not whitespace within HTML tags or whitespace in plain text.                           |
| [split](https://twig.symfony.com/doc/2.x/filters/split.html)                       | Strips whitespace (or other characters) from the beginning and end of a string                                               |
| [striptags](https://twig.symfony.com/doc/2.x/filters/striptags.html)               | Strips SGML/XML tags and replace adjacent whitespace by one space.                                                           |
| [time](#time)                                                                      | Formats a time.                                                                                                              |
| [timestamp](#timestamp)                                                            | Formats a human-readable timestamp.                                                                                          |
| [title](https://twig.symfony.com/doc/2.x/filters/title.html)                       | Formats a string into “Title Case”.                                                                                          |
| [translate](#translate-or-t)                                                       | Translates a message.                                                                                                        |
| [truncate](#truncate)                                                              | Truncates a string to a given length, while ensuring that it does not split words.                                           |
| [trim](https://twig.symfony.com/doc/2.x/filters/trim.html)                         | Strips whitespace from the beginning and end of a string.                                                                    |
| [ucfirst](#ucfirst)                                                                | Capitalizes the first character of a string.                                                                                 |
| [unique](#unique)                                                                  | Removes duplicate values from an array.                                                                                      |
| [unshift](#unshift)                                                                | Prepends one or more items to the beginning of an array.                                                                     |
| [upper](https://twig.symfony.com/doc/2.x/filters/upper.html)                       | Formats a string into “UPPER CASE”.                                                                                          |
| [url_encode](https://twig.symfony.com/doc/2.x/filters/url_encode.html)             | Percent-encodes a string as a URL segment or an array as a query string.                                                     |
| [values](#values)                                                                  | Returns all the values in an array, resetting its keys.                                                                      |
| [where](#where)                                                                    | Filters an array by key/value pairs.                                                                                         |
| [withoutKey](#withoutkey)                                                          | Returns an array without the specified key.                                                                                  |
| [without](#without)                                                                | Returns an array without the specified element(s).                                                                           |

## `append`

とりわけ Atom フィードで使用される、ISO-8601 タイムスタンプ（例：`2019-01-29T10:00:00-08:00`）に日付を変換します。

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

If you only want to append a new element if one of the same type doesn’t already exist, pass `'keep'` as a second argument.

```twig
{{ "foo bar"|camel }}
{# Outputs: fooBar #}
```

If you want to replace an existing element of the same type, pass `'replace'` as a second argument.

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>', 'replace') }}
{# Output: <div><p>Ipsum</p></div> #}
```

## `ascii`

ユーザーが優先する言語に応じて指定された通貨で、数値をフォーマットします。

```twig
{{ 1000000|currency('USD') }} → $1,000,000.00
{{ 1000000|currency('USD', [], [], true) }} → $1,000,000
```

By default, the current site’s language will be used when choosing ASCII character mappings. You can override that by passing in a different locale ID.

```twig
{{ entry.postDate|date }} → Sep 26, 2018
```

## `atom`

利用可能な `numberOptions` は、[こちらのリスト](yii2:yii\i18n\Formatter::$numberFormatterOptions)を参照してください。

```twig
{{ entry.postDate|atom }}
```

## `currency( currency, numberOptions, textOptions, stripZeros )`

利用可能な `textOptions` は、[こちらのリスト](yii2:yii\i18n\Formatter::$numberFormatterTextOptions) を参照してください。

```twig
{{ entry.postDate|date('short', locale='en-GB') }} → 26/9/2018
```

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた日付を出力します。

```twig
{{ entry.postDate|date('Y-m-d') }} → 2018-09-26
```

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

```twig
{{ entry.postDate|date('short', timezone='UTC') }} → 9/27/2018
```

利用可能な `format` 値は、次の通りです。

```twig
{{ entry.postDate|datetime }} → Sep 26, 2018, 5:00:00 PM
```

All other attributes will replace the existing attribute values.

```twig
{{ entry.postDate|datetime('short') }} → 9/26/2018, 5:00 PM
```

PHP の `date()` ファンクションでサポートされるものと同じ [フォーマットオプション](http://php.net/manual/en/function.date.php) を使用して、カスタムの日付フォーマットを渡すこともできます。

```twig
{{ entry.postDate|datetime('short', locale='en-GB') }} → 26/9/2018, 17:00
```

## `camel`

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }} → 9/27/2018, 12:00 AM
```

## `column`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた（時刻を含む）日付を出力します。

```twig
{% set entryIds = entries|column('id') %}
```

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

```twig
{{ "secure-string"|encenc }}
```

利用可能な `format` 値は、次の通りです。

## `contains`

Returns whether the passed-in array contains any nested arrays/objects with a particular key/attribute set to a given value.

```twig
{% set allEntries = craft.entries.section('blog').all() %}
{% set allEntriesByYear = allEntries|group('postDate|date("Y")') %}

{% for year, entriesInYear in allEntriesByYear %}
    <h2>{{ year }}</h2>

    <ul>
        {% for entry in entriesInYear %}
            <li><a href="{{ entry.url }}">{{ entry.title }}</a></li>
        {% endfor %}
    </ul>
{% endfor %}
```

## `currency`

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

```twig
{{ 1000000|currency('USD') }}
{# Output: $1,000,000.00 #}
```

[DateInterval](http://php.net/manual/en/class.dateinterval.php) オブジェクトに <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()> を実行します。

```twig
$foo = Craft::$app->request->getPost('foo');
$foo = Craft::$app->security->validateData($foo);

if ($foo !== false) {
    // data is valid
}
```

## `date`

文字列を暗号化し、base64 エンコードします。

```twig
{{ entry.postDate|date('short') }} → 9/26/2018
```

バイト数をより良い何かにフォーマットします。

```twig
{{ 'now'|date('m/d/Y') }}
{# Output: 12/20/1990 #}
```

配列から空のエレメントを削除し、変更された配列を返します。

| フォーマット             | 実例                                              |
| ------------------ | ----------------------------------------------- |
| `short`            | 9/26/2018, 5:00 PM                              |
| `medium` _（デフォルト）_ | Sep 26, 2018, 5:00:00 PM                        |
| `long`             | September 26, 2018 at 5:00:00 PM PDT            |
| `full`             | Wednesday, September 26, 2018 at 5:00:00 PM PDT |

```twig
{{ entry.postDate|time('short', locale='en-GB') }} → 17:00
```

The current application locale will be used by default. If you want to format the date and time for a different locale, use the `locale` argument:

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
If this is used within a [namespace](tags.md#namespace) tag, the namespace applied by the tag will be used by default.
:::

## `datetime`

PHP スクリプトは、[Security::validateData()](yii2:yii\base\Security::validateData()) を経由して値を検証できます。

```twig
{{ "foo bar?"|kebab }}
{# Outputs: foo-bar #}
```

を経由して、HTML の input 要素の `id` としてうまく動作するよう、文字列をフォーマットします。

```twig
{{ entry.postDate|datetime('short') }}
{# Output: 9/26/2018, 5:00 PM #}
```

Possible `format` values are:

| フォーマット             | 実例                                            |
| ------------------ | --------------------------------------------- |
| `short`            | 12/20/1990, 5:00 PM                           |
| `medium` _（デフォルト）_ | Dec 20, 1990, 5:00:00 PM                      |
| `long`             | December 20, 1990 at 5:00:00 PM PDT           |
| `full`             | Thursday, December 20, 1990 at 5:00:00 PM PDT |

使用される正確な時刻のフォーマットは、現在のアプリケーションのローケルに依存します。 異なるローケルの時刻のフォーマットを使用したい場合、`locale` パラメータを利用します。

```twig
{{ 1000000|number }} → 1,000,000
{{ 1000000|number(false) }} → 1000000
```

You can customize the timezone the time is output in, using the `timezone` param:

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }}
{# Output: 12/21/1990, 12:00 AM #}
```

## `filterByValue`

Twig の [json_encode](https://twig.symfony.com/doc/2.x/filters/json_encode.html) フィルタと同様ですが、引数 `options` がセットされておらず、レスポンスのコンテンツタイプが `text/html` または `application/xhtml+xml` の場合、デフォルトで `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT` になります。

を通して、文字列を JSON デコードし配列にします。

```twig
{{ "foo bar"|pascal }}
{# Outputs: FooBar #}
```

## `duration`

「kebab-case」でフォーマットされた文字列を返します。  <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()>

```twig
<p>Posted {{ entry.postDate.diff(now)|duration(false) }} ago.</p>
```

## `encenc`

ヒント：類推できない方のために、[シシカバブ](https://en.wikipedia.org/wiki/Kebab#Shish)の参照です。

```twig
{% set str = "Hello, NAME" %}

{{ str|replace('NAME', currentUser.name) }}
```

## `explodeClass`

文字列の最初の文字を小文字にします。

文字列に <craft3:craft\helpers\Db::escapeParam()> を実行します。

```twig
{% set classNames = 'foo bar baz'|explodeClass %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `explodeStyle`

[Markdown](https://daringfireball.net/projects/markdown/) で文字列を処理します。

このフィルタは、2つの引数をサポートしています。

```twig
{{ 42.1|round }} → 42
{{ 42.9|round }} → 43
```

## `filesize`

[ArrayHelper::multisort()](yii2:yii\helpers\BaseArrayHelper::multisort()) で配列をソートします。

```twig
{{ asset.size }}
{# Output: 1944685 #}
{{ asset.size|filesize }}
{# Output: 1.945 MB #}
```

## `filter`

ユーザーが優先する言語に応じて、数値をフォーマットします。

グループシンボル（例えば、英語のコンマ）を省略したい場合は、オプションで `false` を渡すことができます。

```twig
{{ "foo bar"|snake }}
{# Outputs: foo_bar #}
```

[リファレンスタグ](../reference-tags.md)の文字列を解析します。

```twig
{{ entry.postDate|time }} → 10:00:00 AM
```

## `group`

「PascalCase」（別名「UpperCamelCase」）でフォーマットされた文字列を返します。

```twig
{{ entry.postDate|time('short') }} → 10:00 AM
```

## `hash`

ユーザーが優先する言語に応じて、割合をフォーマットします。

```twig
<input type="hidden" name="foo" value="{{ 'bar'|hash }}">
```

文字列の一部を他のものに置き換えます。

```php
{{ entry.postDate|time('short', timezone='UTC') }} → 12:00 AM
```

## `id`

ペアの検索 / 置換のオブジェクトを渡すことで、一度に複数のものを置き換えることができます。

```twig
{% set name = 'input[name]' %}
<input type="text" name="{{ name }}" id="{{ name|id }}">
```

## `index`

または、一度に1つのものを置き換えることができます。

```twig
{% set entries = entries|index('id') %}
```

## `indexOf`

配列内の渡された値のインデックス、または、他の文字列に含まれる渡された文字列のインデックスを返します。 （返される位置は、0 からはじまることに注意してください。 ）見つからなかった場合、代わりに `-1` が返されます。

```twig
{% set colors = ['red', 'green', 'blue'] %}
<p>Green is located at position {{ colors|indexOf('green') + 1 }}.</p>

{% set position = "team"|indexOf('i') %}
{% if position != -1 %}
    <p>There <em>is</em> an “i” in “team”! It’s at position {{ position + 1 }}.</p>
{% endif %}
```

## `intersect`

最も近い整数値に数を丸めます。

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

RSS フィードに必要な形式（`D, d M Y H:i:s O`）で日付を出力します。

「snake_case」でフォーマットされた文字列を返します。

## `json_decode`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた時刻を出力します。

```twig
{% set arr = '[1, 2, 3]'|json_decode %}
```

## `kebab`

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

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

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

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
- `flavor` は、`'original'`（デフォルト値）、`'gfm'`（GitHub-Flavored Markdown）、`'gfm-comment'`（改行が`<br>`に変換された GFM）、 または、`'extra'`（Markdown Extra）にできます。
- `inlineOnly` は、`<p>` タグを除き、インライン要素だけを解析するかどうかを決定します。 （デフォルトは `false`）

## `multisort`

カテゴリの指定がない場合、デフォルトで `site` になります。

::: tip
これがどのように機能するかの詳細については、[静的メッセージの翻訳](../sites.md)を参照してください。
:::

```twig
{% set entries = entries|multisort('title') %}
```

To sort by multiple properties or keys, pass them in as an array. For example, this will sort entries by their post date first, and then by their title:

```twig
{% set entries = entries|multisort(['postDate', 'title']) %}
```

文字列に含まれるそれぞれの単語の最初の文字を大文字にします。

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

指定されたエレメントを除いた配列を返します。

Tip: That’s a reference to [shish kebabs](https://en.wikipedia.org/wiki/Kebab#Shish) for those of you that don’t get the analogy.

```twig
{% set entries = entries|multisort([
    'postDate',
    'title',
], sortFlag=[SORT_NATURAL, SORT_FLAG_CASE]) %}
```

## `namespace`

The `|namespace` filter can be used to namespace input names and other HTML attributes, as well as CSS selectors.

This works identically to Twig’s core [`keys`](https://twig.symfony.com/doc/2.x/filters/keys.html) filter.

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

Returns the last element of an array or string.

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

This works identically to Twig’s core [`last`](https://twig.symfony.com/doc/2.x/filters/last.html) filter.

If you want class names to get namespaced as well, pass `withClasses=true`. That will affect both class CSS selectors and `class` attributes:

```twig
{{ html|namespace('foo', withClasses=true) }}
```

Returns the number of elements in an array or string.

```html{2,5}
<style>
  .foo-text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="foo-text" id="foo-title" name="foo[title]" type="text">
```

## `namespaceInputId`

This works identically to Twig’s core [`length`](https://twig.symfony.com/doc/2.x/filters/length.html) filter.

Runs a string through

```twig
{{ 'bar'|namespaceInputId('foo') }}
```

Converts a value to lowercase.

```html
foo-bar
```

::: tip
If this is used within a [namespace](tags.md#namespace) tag, the namespace applied by the tag will be used by default.
:::

## `namespaceInputName`

Applies an arrow function to the elements of an array.

This works identically to Twig’s core [`map`](https://twig.symfony.com/doc/2.x/filters/map.html) filter.

```twig
{{ 'bar'|namespaceInputName('foo') }}
```

would output:

```html
foo[bar]
```

::: tip
See [Static Message Translations](../sites.md) for a full explanation on how this works.
:::

## `number`

Formats a number according to the user’s preferred language.

This works identically to Twig’s core [`merge`](https://twig.symfony.com/doc/2.x/filters/merge.html) filter.

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

This works identically to Twig’s core [`number_format`](https://twig.symfony.com/doc/2.x/filters/number_format.html) filter.

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
{% set arr1 = {foo: "Foo", bar: "Bar"} %}
{% set arr2 = arr1|values %}
{# arr2 = ["Foo", "Bar"] #}
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

| Format             | Example        |
| ------------------ | -------------- |
| `short`            | 5:00 PM        |
| `medium` _（デフォルト）_ | 5:00:00 PM     |
| `long`             | 5:00:00 PM PDT |

使用される正確な時刻のフォーマットは、現在のアプリケーションのローケルに依存します。 異なるローケルの時刻のフォーマットを使用したい場合、`locale` パラメータを利用します。

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

## `truncate`

::: tip
The `truncate` filter was added in Craft 3.5.10.
:::

Truncates a string to a given length, while ensuring that it does not split words.

```twig
{{ 'Hello world'|truncate(10) }}
{# Output: Hello… #}
```

An ellipsis (`…`) will be appended to the string if it needs to be truncated, by default. You can customize what gets appended by passing a second argument. (Note that a longer appended string could result in more of the original string getting truncated.)

```twig
{{ 'Hello world'|truncate(10, '...') }}
{# Output: Hello... #}

{{ 'Hello world'|truncate(10, '') }}
{# Output: Hello #}
```

If the truncated string cuts down to less than a single word, that first word will be split by default.

```twig
{{ 'Hello world'|truncate(2) }}
{# Output: H… #}
```

If you’d prefer to have the entire word removed, set the `splitSingleWord` argument to `false`.

```twig
{{ 'Hello world'|truncate(2, splitSingleWord=false) }}
{# Output: … #}
```

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
