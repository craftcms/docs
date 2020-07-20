# フィルタ

[Twig に付随する](https://twig.symfony.com/doc/filters/index.html)テンプレートフィルタに加えて、Craft がいくつか独自のものを提供します。

## `atom`

とりわけ Atom フィードで使用される、ISO-8601 タイムスタンプ（例：`2019-01-29T10:00:00-08:00`）に日付を変換します。

「camelCase」でフォーマットされた文字列を返します。

## `camel`

配列に [ArrayHelper::getColumn()](yii2:yii\helpers\BaseArrayHelper::getColumn()) を実行し、その結果を返します。

```twig
{{ entry.postDate|atom }}
```

ユーザーが優先する言語に応じて指定された通貨で、数値をフォーマットします。

```twig
{{ "foo bar"|camel }}
{# Outputs: fooBar #}
```

最後の引数に `true` を渡すと、フォーマットされる値が小数値（例：cents）を持たない場合、小数部の桁が削除されます。

```twig
{% set entryIds = entries|column('id') %}
```

## `column`

利用可能な `numberOptions` は、[こちらのリスト](yii2:yii\i18n\Formatter::$numberFormatterOptions)を参照してください。

```twig
{{ 1000000|currency('USD') }} → $1,000,000.00
{{ 1000000|currency('USD', [], [], true) }} → $1,000,000
```

利用可能な `textOptions` は、[こちらのリスト](yii2:yii\i18n\Formatter::$numberFormatterTextOptions) を参照してください。

```twig
{{ entry.postDate|date }} → Sep 26, 2018
```

## `currency( currency, numberOptions, textOptions, stripZeros )`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた日付を出力します。

```twig
{{ entry.postDate|date('short') }} → 9/26/2018
```

## `date`

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

```twig
{{ entry.postDate|date('short', locale='en-GB') }} → 26/9/2018
```

利用可能な `format` 値は、次の通りです。

```twig
{{ entry.postDate|date('Y-m-d') }} → 2018-09-26
```

使用される正確な時刻のフォーマットは、現在のアプリケーションのローケルに依存します。異なるローケルの時刻のフォーマットを使用したい場合、`locale` パラメータを利用します。

```twig
{{ entry.postDate|date('short', timezone='UTC') }} → 9/27/2018
```

PHP の `date()` ファンクションでサポートされるものと同じ [フォーマットオプション](http://php.net/manual/en/function.date.php) を使用して、カスタムの日付フォーマットを渡すこともできます。

```twig
{{ entry.postDate|datetime }} → Sep 26, 2018, 5:00:00 PM
```

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|datetime('short') }} → 9/26/2018, 5:00 PM
```

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた（時刻を含む）日付を出力します。

```twig
{{ entry.postDate|datetime('short', locale='en-GB') }} → 26/9/2018, 17:00
```

## `datetime`

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

利用可能な `format` 値は、次の通りです。

## `duration`

使用される正確な時刻のフォーマットは、現在のアプリケーションのローケルに依存します。異なるローケルの時刻のフォーマットを使用したい場合、`locale` パラメータを利用します。

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }} → 9/27/2018, 12:00 AM
```

## `encenc`

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

[DateInterval](http://php.net/manual/en/class.dateinterval.php) オブジェクトに <api3:craft\helpers\DateTimeHelper::humanDurationFromInterval()> を実行します。

## `filesize`

文字列を暗号化し、base64 エンコードします。

```twig
<p>Posted {{ entry.postDate.diff(now)|duration(false) }} ago.</p>
```

バイト数をより良い何かにフォーマットします。

## `filter`

配列から空のエレメントを削除し、変更された配列を返します。

配列に <api3:craft\helpers\ArrayHelper::filterByValue()> を実行します。

## `filterByValue`

共通のプロパティに基づいて、配列の項目をグループ化します。

```twig
{{ "secure-string"|encenc }}
```

不正に変更されるべきではないフォームのデータを安全に渡すために、メッセージ認証コード（HMAC）の鍵付ハッシュを指定された文字列の先頭に追加します。

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

## `group`

PHP スクリプトは、[Security::validateData()](yii2:yii\base\Security::validateData()) を経由して値を検証できます。

```twig
<input type="hidden" name="foo" value="{{ 'bar'|hash }}">
```

を経由して、HTML の input 要素の `id` としてうまく動作するよう、文字列をフォーマットします。

```twig
$foo = Craft::$app->request->getPost('foo');
$foo = Craft::$app->security->validateData($foo);

if ($foo !== false) {
    // data is valid
}
```

配列に [ArrayHelper::index()](yii2:yii\helpers\BaseArrayHelper::index()) を実行します。

| フォーマット             | 実例                            |
| ------------------ | ----------------------------- |
| `short`            | 9/26/2018                     |
| `medium` _（デフォルト）_ | Sep 26, 2018                  |
| `long`             | September 26, 2018            |
| `full`             | Wednesday, September 26, 2018 |

```twig
{% set name = 'input[name]' %}
<input type="text" name="{{ name }}" id="{{ name|id }}">
```

配列内の渡された値のインデックス、または、他の文字列に含まれる渡された文字列のインデックスを返します。（返される位置は、0 からはじまることに注意してください。）見つからなかった場合、代わりに `-1` が返されます。

```twig
{% set entries = entries|index('id') %}
```

渡された配列内にある値だけを含む配列を返します。

```twig
{% set colors = ['red', 'green', 'blue'] %}
<p>Green is located at position {{ colors|indexOf('green') + 1 }}.</p>

{% set position = "team"|indexOf('i') %}
{% if position != -1 %}
    <p>There <em>is</em> an “i” in “team”! It’s at position {{ position + 1 }}.</p>
{% endif %}
```

## `hash`

Twig の [json_encode](https://twig.symfony.com/doc/2.x/filters/json_encode.html) フィルタと同様ですが、引数 `options` がセットされておらず、レスポンスのコンテンツタイプが `text/html` または `application/xhtml+xml` の場合、デフォルトで `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT` になります。

を通して、文字列を JSON デコードし配列にします。

## `id`

「kebab-case」でフォーマットされた文字列を返します。

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

ヒント：類推できない方のために、[シシカバブ](https://en.wikipedia.org/wiki/Kebab#Shish)の参照です。

```twig
{% set arr = '[1, 2, 3]'|json_decode %}
```

文字列の最初の文字を小文字にします。

| フォーマット             | 実例                                              |
| ------------------ | ----------------------------------------------- |
| `short`            | 9/26/2018, 5:00 PM                              |
| `medium` _（デフォルト）_ | Sep 26, 2018, 5:00:00 PM                        |
| `long`             | September 26, 2018 at 5:00:00 PM PDT            |
| `full`             | Wednesday, September 26, 2018 at 5:00:00 PM PDT |

文字列に <api3:craft\helpers\Db::escapeParam()> を実行します。

```twig
{{ "foo bar?"|kebab }}
{# Outputs: foo-bar #}
```

[Markdown](https://daringfireball.net/projects/markdown/) で文字列を処理します。

```twig
{% set content %}
# Everything You Need to Know About Computer Keyboards

The only *real* computer keyboard ever made was famously
the [Apple Extended Keyboard II] [1].

    [1]: https://www.flickr.com/photos/gruber/sets/72157604797968156/
{% endset %}

{{ content|markdown }}
```

## `index`

このフィルタは、2つの引数をサポートしています。

[ArrayHelper::multisort()](yii2:yii\helpers\BaseArrayHelper::multisort()) で配列をソートします。

## `indexOf`

ユーザーが優先する言語に応じて、数値をフォーマットします。 <api3:craft\helpers\DateTimeHelper::humanDurationFromInterval()>

```twig
{{ 1000000|number }} → 1,000,000
{{ 1000000|number(false) }} → 1000000
```

## `intersect`

グループシンボル（例えば、英語のコンマ）を省略したい場合は、オプションで `false` を渡すことができます。

```twig
{% set content %}
    {entry:blog/hello-world:link} was my first blog post. Pretty geeky, huh?
{% endset %}

{{ content|parseRefs|raw }}
```

## `json_encode`

[リファレンスタグ](../reference-tags.md)の文字列を解析します。

「PascalCase」（別名「UpperCamelCase」）でフォーマットされた文字列を返します。

## `json_decode`

ユーザーが優先する言語に応じて、割合をフォーマットします。

## `kebab`

文字列の一部を他のものに置き換えます。

ペアの検索 / 置換のオブジェクトを渡すことで、一度に複数のものを置き換えることができます。

```twig
{{ "foo bar"|pascal }}
{# Outputs: FooBar #}
```

または、一度に1つのものを置き換えることができます。

```twig
{% set str = "Hello, FIRST LAST" %}

{{ str|replace({
    FIRST: currentUser.firstName,
    LAST:  currentUser.lastName
}) }}
```

## `lcfirst`

置換文字列の値の最初と最後にスラッシュを付けてマッチするものを検索することで、正規表現も利用できます。

## `literal`

最も近い整数値に数を丸めます。

RSS フィードに必要な形式（`D, d M Y H:i:s O`）で日付を出力します。

## `format`

「snake_case」でフォーマットされた文字列を返します。

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた時刻を出力します。

## `multisort`

`format` パラメータに値を渡すことで、詳細がどの程度提供されるかをカスタマイズできます。

```twig
{% set str = "Hello, NAME" %}

{{ str|replace('NAME', currentUser.name) }}
```

## `number`

利用可能な `format` 値は、次の通りです。

```twig
{{ tag.title|lower|replace('/[^\\w]+/', '-') }}
```

使用される正確な時刻のフォーマットは、現在のアプリケーションのローケルに依存します。異なるローケルの時刻のフォーマットを使用したい場合、`locale` パラメータを利用します。

```php
{{ 42.1|round }} → 42
{{ 42.9|round }} → 43
```

## `parseRefs`

`timezone` パラメータを使用して、出力される時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|rss }}
```

## `pascal`

経由で、人が読めるタイムスタンプとして日付をフォーマットします。

```twig
{{ "foo bar"|snake }}
{# Outputs: foo_bar #}
```

## `percentage`

[Craft::t()](yii2:yii\BaseYii::t()) でメッセージを翻訳します。

```twig
{{ entry.postDate|time }} → 10:00:00 AM
```

## `replace`

カテゴリの指定がない場合、デフォルトで `site` になります。

```twig
{{ entry.postDate|time('short') }} → 10:00 AM
```

## `round`

::: tip
これがどのように機能するかの詳細については、[静的メッセージの翻訳](../static-translations.md)を参照してください。
:::

文字列の最初の文字を大文字にします。

## `rss`

文字列に含まれるそれぞれの単語の最初の文字を大文字にします。

配列に [array_unique()](http://php.net/manual/en/function.array-unique.php) を実行します。

## `snake`

指定された配列のすべての値の配列を返しますが、カスタムキーは除かれます。

```twig
{{ entry.postDate|time('short', locale='en-GB') }} → 17:00
```

## `time`

指定されたエレメントを除いた配列を返します。

Tip: That’s a reference to [shish kebabs](https://en.wikipedia.org/wiki/Kebab#Shish) for those of you that don’t get the analogy.

```twig
{{ entry.postDate|time('short', timezone='UTC') }} → 12:00 AM
```

## `timestamp`

Returns the keys of an array.

This works identically to Twig’s core [`keys`](https://twig.symfony.com/doc/2.x/filters/keys.html) filter.

## `last`

Returns the last element of an array or string.

This works identically to Twig’s core [`last`](https://twig.symfony.com/doc/2.x/filters/last.html) filter.

## `ucfirst`

Lowercases the first character of a string.

## `ucwords`

Returns the number of elements in an array or string.

This works identically to Twig’s core [`length`](https://twig.symfony.com/doc/2.x/filters/length.html) filter.

## `unique`

Runs a string through <api3:craft\helpers\Db::escapeParam()>

## `values`

Converts a value to lowercase.

This works identically to Twig’s core [`lower`](https://twig.symfony.com/doc/2.x/filters/lower.html) filter.

## `without`

Applies an arrow function to the elements of an array.

This works identically to Twig’s core [`map`](https://twig.symfony.com/doc/2.x/filters/map.html) filter.

## `markdown` or `md`

Processes a string with [Markdown](https://daringfireball.net/projects/markdown/).

```twig
{{ "Hello world"|t('myCategory') }}
```

This filter supports two arguments:
- `flavor` は、`'original'`（デフォルト値）、`'gfm'`（GitHub-Flavored Markdown）、`'gfm-comment'`（改行が`<br>`に変換された GFM）、 または、`'extra'`（Markdown Extra）にできます。
- `inlineOnly` は、`<p>` タグを除き、インライン要素だけを解析するかどうかを決定します。（デフォルトは `false`）

## `merge`

Merges an array with another array.

This works identically to Twig’s core [`merge`](https://twig.symfony.com/doc/2.x/filters/merge.html) filter.

## `multisort`

Sorts an array with [ArrayHelper::multisort()](yii2:yii\helpers\BaseArrayHelper::multisort()).

## `nl2br`

Inserts HTML line breaks before all newlines in a string.

This works identically to Twig’s core [`nl2br`](https://twig.symfony.com/doc/2.x/filters/nl2br.html) filter.

## `number`

Formats a number according to the user’s preferred language.

You can optionally pass `false` to it if you want group symbols to be omitted (e.g. commas in English).

```twig
{{ "Hello world"|t }}
```

## `number_format`

Formats numbers. It is a wrapper around PHP’s [number_format()](https://secure.php.net/number_format) function:

This works identically to Twig’s core [`number_format`](https://twig.symfony.com/doc/2.x/filters/number_format.html) filter.

## `parseRefs`

Parses a string for [reference tags](../reference-tags.md).

```twig
{% set arr1 = {foo: "Foo", bar: "Bar"} %}
{% set arr2 = arr1|values %}
{# arr2 = ["Foo", "Bar"] #}
```

## `pascal`

Returns a string formatted in “PascalCase” (AKA “UpperCamelCase”).

```twig
{% set entries = craft.entries.section('articles').limit(3).find %}
{% set firstEntry = entries[0] %}
{% set remainingEntries = entries|without(firstEntry) %}
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

## `raw`

Marks a value as being “safe”, which means that in an environment with automatic escaping enabled this variable will not be escaped if raw is the last filter applied to it.

This works identically to Twig’s core [`raw`](https://twig.symfony.com/doc/2.x/filters/raw.html) filter.

## `reduce`

Iteratively reduces a sequence or a mapping to a single value using an arrow function, so as to reduce it to a single value. The arrow function receives the return value of the previous iteration and the current value of the sequence or mapping.

This works identically to Twig’s core [`reduce`](https://twig.symfony.com/doc/2.x/filters/reduce.html) filter.

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

## `reverse`

Reverses an array or string.

This works identically to Twig’s core [`reverse`](https://twig.symfony.com/doc/2.x/filters/reverse.html) filter.

## `round`

Rounds a number to a given precision.

This works identically to Twig’s core [`round`](https://twig.symfony.com/doc/2.x/filters/round.html) filter.

## `rss`

Outputs a date in the format required for RSS feeds (`D, d M Y H:i:s O`).

```twig
{{ entry.postDate|rss }}
```

## `slice`

Extracts a slice of an array or string.

This works identically to Twig’s core [`slice`](https://twig.symfony.com/doc/2.x/filters/slice.html) filter.

## `snake`

Returns a string formatted in “snake_case”.

```twig
{{ 'foo bar'|snake }}
{# Output: foo_bar #}
```

## `sort`

Sorts an array.

This works identically to Twig’s core [`sort`](https://twig.symfony.com/doc/2.x/filters/sort.html) filter.

## `spaceless`

Removes whitespace between HTML tags, not whitespace within HTML tags or whitespace in plain text.

This works identically to Twig’s core [`spaceless`](https://twig.symfony.com/doc/2.x/filters/spaceless.html) filter.

## `split`

Splits a string by the given delimiter and returns a list of string.

This works identically to Twig’s core [`split`](https://twig.symfony.com/doc/2.x/filters/split.html) filter.

## `striptags`

Strips SGML/XML tags and replace adjacent whitespace by one space.

This works identically to Twig’s core [`striptags`](https://twig.symfony.com/doc/2.x/filters/striptags.html) filter.

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

| フォーマット             | 実例             |
| ------------------ | -------------- |
| `short`            | 5:00 PM        |
| `medium` _（デフォルト）_ | 5:00:00 PM     |
| `long`             | 5:00:00 PM PDT |

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

Formats a date as a human-readable timestamp, via <api3:craft\i18n\Formatter::asTimestamp()>.

## `title`

Returns a titlecased version of the value. Words will start with uppercase letters, all remaining characters are lowercase.

This works identically to Twig’s core [`title`](https://twig.symfony.com/doc/2.x/filters/title.html) filter.

## `trim`

Strips whitespace (or other characters) from the beginning and end of a string

This works identically to Twig’s core [`trim`](https://twig.symfony.com/doc/2.x/filters/trim.html) filter.

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
See [Static Message Translations](../static-translations.md) for a full explanation on how this works.
:::

## `ucfirst`

Capitalizes the first character of a string.

## `ucwords`

Capitalizes the first character of each word in a string.

## `unique`

Runs an array through [array_unique()](http://php.net/manual/en/function.array-unique.php).

## `upper`

Converts a value to uppercase.

This works identically to Twig’s core [`upper`](https://twig.symfony.com/doc/2.x/filters/upper.html) filter.

## `url_encode`

Percent-encodes a given string as URL segment or an array as query string.

This works identically to Twig’s core [`url_encode`](https://twig.symfony.com/doc/2.x/filters/url_encode.html) filter.

## `values`

Returns an array of all the values in a given array, but without any custom keys.

```twig
{% set arr1 = {foo: 'Foo', bar: 'Bar'} %}
{% set arr2 = arr1|values %}
{# arr2 = ['Foo', 'Bar'] #}
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
