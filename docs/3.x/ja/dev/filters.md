# フィルタ

[Twig に付随する](https://twig.symfony.com/doc/filters/index.html)テンプレートフィルタに加えて、Craft がいくつか独自のものを提供します。

| フォーマット                                                                             | 実例                                                                                      |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [abs](https://twig.symfony.com/doc/2.x/filters/abs.html)                           | 9/26/2018                                                                               |
| [append](#append)                                                                  | Sep 26, 2018                                                                            |
| [ucwords](#ascii)                                                                  | September 26, 2018                                                                      |
| [atom](#atom)                                                                      | Wednesday, September 26, 2018                                                           |
| [ucwords](#attr)                                                                   | HTML タグの属性を変更します。                                                                       |
| [batch](https://twig.symfony.com/doc/2.x/filters/batch.html)                       | Merges an array with another array.                                                     |
| [camel](#camel)                                                                    | 「camelCase」でフォーマットされた文字列を返します。                                                          |
| [capitalize](https://twig.symfony.com/doc/2.x/filters/capitalize.html)             | 文字列の最初の文字を大文字にします。                                                                      |
| [column](#column)                                                                  | 渡された配列内にある値だけを含む配列を返します。                                                                |
| [contains](#contains)                                                              | 指定されたキーと値のペアを持つネストされたアイテムを配列が含むかどうかを返します。                                               |
| [convert_encoding](https://twig.symfony.com/doc/2.x/filters/convert_encoding.html) | 文字列をあるエンコーディングから別のエンコーディングに変換します。                                                       |
| [currency](#currency)                                                              | 数値を通貨としてフォーマットします。                                                                      |
| [date](#date)                                                                      | 経由で、人が読めるタイムスタンプとして日付をフォーマットします。                                                        |
| [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)           | 日付を変更します。                                                                               |
| [datetime](#datetime)                                                              | 日付と時刻をフォーマットします。                                                                        |
| [default](https://twig.symfony.com/doc/2.x/filters/default.html)                   | 値、または、空の場合はデフォルト値を返します。                                                                 |
| [diff](#diff)                                                                      | Reverses an array or string.                                                            |
| [duration](#duration)                                                              | `DateInterval` オブジェクトを返します。                                                             |
| [encenc](#encenc)                                                                  | 文字列を暗号化し、base64 エンコードします。                                                               |
| [escape](https://twig.symfony.com/doc/2.x/filters/escape.html)                     | Extracts a slice of an array or string.                                                 |
| [explodeClass](#explodeclass)                                                      | `class` 属性値をクラス名の配列に変換します。                                                              |
| [explodeStyle](#explodestyle)                                                      | `style` 属性値をプロパティ名と値のペアの配列に変換します。                                                       |
| [filesize](#filesize)                                                              | バイト数を他の何かにフォーマットします。                                                                    |
| [filter](#filter)                                                                  | 配列に <craft3:craft\helpers\ArrayHelper::filterByValue()> を実行します。                       |
| [first](https://twig.symfony.com/doc/2.x/filters/first.html)                       | Splits a string by the given delimiter and returns a list of string.                    |
| [format](https://twig.symfony.com/doc/2.x/filters/format.html)                     | Converts a value to uppercase.                                                          |
| [group](#group)                                                                    | 共通のプロパティに基づいて、配列の項目をグループ化します。                                                           |
| [hash](#hash)                                                                      | 不正に変更されるべきではないフォームのデータを安全に渡すために、メッセージ認証コード（HMAC）の鍵付ハッシュを指定された文字列の先頭に追加します。              |
| [httpdate](#httpdate)                                                              | 日付を RSS データフォーマットに変換します。                                                                |
| [id](#id)                                                                          | エレメント ID を英数字、アンダースコア、ダッシュのみに正規化します。                                                    |
| [indexOf](#indexof)                                                                | 配列内の指定された値のインデックス、または、別の文字列内の渡された文字列の位置を返します。                                           |
| [index](#index)                                                                    | 配列内のアイテムをインデックス化します。                                                                    |
| [intersect](#intersect)                                                            | 2つの配列の交差するアイテムを返します。                                                                    |
| [join](https://twig.symfony.com/doc/2.x/filters/join.html)                         | 複数の文字列を1つに連結します。                                                                        |
| [json_decode](#json_decode)                                                        | 値を JSON デコードします。                                                                        |
| [json_encode](#json_encode)                                                        | 値を JSON エンコードします。                                                                       |
| [kebab](#kebab)                                                                    | 文字列を kebab-case にフォーマットします。                                                             |
| [keys](https://twig.symfony.com/doc/2.x/filters/keys.html)                         | 配列のキーを返します。                                                                             |
| [last](https://twig.symfony.com/doc/2.x/filters/last.html)                         | 文字列/配列の最後の文字/アイテムを返します。                                                                 |
| [lcfirst](#lcfirst)                                                                | 文字列の最初の文字を小文字にします。                                                                      |
| [length](https://twig.symfony.com/doc/2.x/filters/length.html)                     | 文字列や配列の長さを返します。                                                                         |
| [literal](#literal)                                                                | エレメントクエリのパラメータで利用するための信頼できない文字列をエスケープします。                                               |
| [lower](https://twig.symfony.com/doc/2.x/filters/lower.html)                       | 文字列を小文字にします。                                                                            |
| [map](https://twig.symfony.com/doc/2.x/filters/map.html)                           | 配列内のアイテムにアローファンクションを適用します。                                                              |
| [markdown](#markdown-or-md)                                                        | 文字列を Markdown として処理します。                                                                 |
| [merge](#merge)                                                                    | Merges an array with another one.                                                       |
| [multisort](#multisort)                                                            | サブ配列内の1つ以上のキーで配列をソートします。                                                                |
| [namespace](#namespace)                                                            | CSS セレクタだけでなく、入力項目の name や HTML 属性に名前空間を割り当てます。                                         |
| [namespaceInputId](#namespaceinputid)                                              | エレメント ID に名前空間を割り当てます。                                                                  |
| [namespaceInputName](#namespaceinputname)                                          | 入力項目の name に名前空間を割り当てます。                                                                |
| [nl2br](https://twig.symfony.com/doc/2.x/filters/nl2br.html)                       | Replaces newlines with `<br>` tags.                                               |
| [number](#number)                                                                  | 数値をフォーマットします。                                                                           |
| [number_format](https://twig.symfony.com/doc/2.x/filters/number_format.html)       | 数値をフォーマットします。                                                                           |
| [parseRefs](#parserefs)                                                            | 文字列の一部を他のものに置き換えます。                                                                     |
| [pascal](#pascal)                                                                  | 文字列を PascalCase にフォーマットします。                                                             |
| [percentage](#percentage)                                                          | パーセンテージをフォーマットします。                                                                      |
| [prepend](#prepend)                                                                | 別の要素の先頭に HTML を追加します。                                                                   |
| [purify](#purify)                                                                  | HTML コードに HTML Purifier を実行します。                                                         |
| [push](#push)                                                                      | 1つ以上のアイテムを配列の最後に追加します。                                                                  |
| [raw](https://twig.symfony.com/doc/2.x/filters/raw.html)                           | 現在のエスケープ方針にとって安全な値であると評価します。                                                            |
| [reduce](https://twig.symfony.com/doc/2.x/filters/reduce.html)                     | シーケンスやマッピングを反復的に単一の値に減らします。                                                             |
| [replace](#replace)                                                                | 文字列をデリミタで分割します。                                                                         |
| [reverse](https://twig.symfony.com/doc/2.x/filters/reverse.html)                   | 文字列や配列を反転します。                                                                           |
| [round](https://twig.symfony.com/doc/2.x/filters/round.html)                       | 数値を丸めます。                                                                                |
| [rss](#rss)                                                                        | Converts a date to RSS date format.                                                     |
| [slice](https://twig.symfony.com/doc/2.x/filters/slice.html)                       | 文字列や配列のスライスを抽出します。                                                                      |
| [slug](https://twig.symfony.com/doc/2.x/filters/slug.html)                         | Transforms a given string into another string that only includes safe ASCII characters. |
| [snake](#snake)                                                                    | 文字列を snake_case にフォーマットします。                                                             |
| [sort](https://twig.symfony.com/doc/2.x/filters/sort.html)                         | 配列をソートします。                                                                              |
| [spaceless](https://twig.symfony.com/doc/2.x/filters/spaceless.html)               | HTML タグ間の空白を削除します。                                                                      |
| [split](https://twig.symfony.com/doc/2.x/filters/split.html)                       | 文字列を大文字にします。                                                                            |
| [striptags](https://twig.symfony.com/doc/2.x/filters/striptags.html)               | 文字列から SGML/XML タグを取り除きます。                                                               |
| [time](#time)                                                                      | 時刻をフォーマットします。                                                                           |
| [timestamp](#timestamp)                                                            | 人が読めるタイムスタンプをフォーマットします。                                                                 |
| [title](https://twig.symfony.com/doc/2.x/filters/title.html)                       | 文字列を Title Case にフォーマットします。                                                             |
| [translate](#translate-or-t)                                                       | メッセージを翻訳します。                                                                            |
| [truncate](#truncate)                                                              | Truncates a string to a given length, while ensuring that it does not split words.      |
| [trim](https://twig.symfony.com/doc/2.x/filters/trim.html)                         | 文字列の最初と最後から空白を取り除きます。                                                                   |
| [ucfirst](#ucfirst)                                                                | 文字列の最初の文字を大文字にします。                                                                      |
| [unique](#unique)                                                                  | 配列から重複する値を取り除きます。                                                                       |
| [unshift](#unshift)                                                                | Prepends one or more items to the beginning of an array.                                |
| [upper](https://twig.symfony.com/doc/2.x/filters/upper.html)                       | 「PascalCase」（別名「UpperCamelCase」）でフォーマットされた文字列を返します。                                     |
| [url_encode](https://twig.symfony.com/doc/2.x/filters/url_encode.html)             | 文字列を URL セグメント、または、クエリ文字列の配列としてパーセントエンコードします。                                           |
| [values](#values)                                                                  | 指定されたキーを除いた配列を返します。                                                                     |
| [where](#where)                                                                    | Filters an array by key/value pairs.                                                    |
| [withoutKey](#withoutkey)                                                          | 指定されたエレメントを除いた配列を返します。                                                                  |
| [without](#without)                                                                | Returns an array without the specified element(s).                                      |

## `append`

とりわけ Atom フィードで使用される、ISO-8601 タイムスタンプ（例：`2019-01-29T10:00:00-08:00`）に日付を変換します。

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

同じタイプの要素がまだ存在しないときのみ新しい要素を追加したい場合、第二引数に `'keep'` を渡します。

```twig
{{ "foo bar"|camel }}
{# Outputs: fooBar #}
```

同じタイプの既に存在する要素を置き換えたい場合、第二引数に `'replace'` を渡します。

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

デフォルトでは、ASCII 文字のマッピングを選択するときに現在のサイトの言語が利用されます。 別のロケール ID を渡すことで、上書きできます。

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

他のすべての属性は、既存の属性値を置き換えます。

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

特定のキー/属性が指定された値を持つ、ネストされた配列/オブジェクトを渡された配列に含むかどうかを返します。

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

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトをフォーマットします。

```twig
{{ 'oh hai'|currency('USD') }}
{# Output: oh hai #}
```

## `date`

Twig コアの [`date`](https://twig.symfony.com/doc/2.x/filters/date.html) フィルタのように、カスタムの日付フォーマットを渡すことで、日付の表示方法をカスタマイズできます。

```twig
{{ entry.postDate|date }}
{# Output: Dec 20, 1990 #}
```

Craft はロケール固有の日付フォーマットを出力するいくつかの特別なフォーマットキーワードも提供します。

```twig
{{ 'now'|date('m/d/Y') }}
{# Output: 12/20/1990 #}
```

Craft also provides some special format keywords that will output locale-specific date formats:

| フォーマット             | 実例                                              |
| ------------------ | ----------------------------------------------- |
| `short`            | 9/26/2018, 5:00 PM                              |
| `medium` _（デフォルト）_ | Sep 26, 2018, 5:00:00 PM                        |
| `long`             | September 26, 2018 at 5:00:00 PM PDT            |
| `full`             | Wednesday, September 26, 2018 at 5:00:00 PM PDT |

```twig
{{ entry.postDate|date('short') }}
{# Output: 12/20/1990 #}
```

デフォルトでは、現在のアプリケーションのロケールが利用されます。 別のロケールで日付をフォーマットしたい場合、引数 `locale` を利用します。

```twig
{{ entry.postDate|date('short', locale='en-GB') }}
{# Output: 20/12/1990 #}
```

::: tip
date フィルタに渡された値が `null` の場合、デフォルトで現在の日付を返します。
:::

```twig
{{ entry.postDate|date('short', timezone='UTC') }}
{# Output: 12/21/1990 #}
```

::: tip
If the value passed to the date filter is `null`, it will return the current date by default.
:::

## `datetime`

Craft はロケール固有の日付と時刻のフォーマットを出力するいくつかの特別なフォーマットキーワードを提供します。

```twig
{{ entry.postDate|datetime }}
{# Output: Dec 20, 1990, 5:00:00 PM #}
```

利用可能な `format` 値は、次の通りです。

```twig
{{ entry.postDate|datetime('short') }}
{# Output: 9/26/2018, 5:00 PM #}
```

`translate` または `t`

| フォーマット             | 実例                                            |
| ------------------ | --------------------------------------------- |
| `short`            | 12/20/1990, 5:00 PM                           |
| `medium` _（デフォルト）_ | Dec 20, 1990, 5:00:00 PM                      |
| `long`             | December 20, 1990 at 5:00:00 PM PDT           |
| `full`             | Thursday, December 20, 1990 at 5:00:00 PM PDT |

デフォルトでは、現在のアプリケーションのロケールが利用されます。 別のロケールで日付と時刻をフォーマットしたい場合、引数 `locale` を利用します。

```twig
{{ entry.postDate|datetime('short', locale='en-GB') }}
{# Output: 20/12/1990, 17:00 #}
```

[array_diff()](https://www.php.net/manual/en/function.array-diff.php) を利用して、配列間の差分を返します。

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }}
{# Output: 12/21/1990, 12:00 AM #}
```

## `filterByValue`

フィルタに渡されたどの配列にも存在しない、最初の配列に含まれるすべての値を持つ新しい配列を返します。

[DateInterval](http://php.net/manual/en/class.dateinterval.php) オブジェクトに <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()> を実行します。

```twig
{% set arr1 = ['foo', 'bar'] %}
{% set arr2 = ['bar', 'baz'] %}
{% set arr3 = arr1|diff(arr2) %}
{# Result: ['foo'] #}
```

## `duration`

文字列を暗号化し、base64 エンコードします。 <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()>

```twig
<p>Posted {{ entry.postDate.diff(now)|duration(false) }} ago.</p>
```

## `encenc`

`class` 属性値をクラス名の配列に変換します。

```twig
{{ 'secure-string'|encenc }}
```

## `explodeClass`

配列が渡された場合、そのまま返されます。

`style` 属性値をプロパティ名と値のペアの配列に変換します。

```twig
{% set classNames = 'foo bar baz'|explodeClass %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `explodeStyle`

配列が渡された場合、そのまま返されます。

バイト数をより良い何かにフォーマットします。

```twig
{% set styles = 'font-weight: bold; color: red;'|explodeStyle %}
{# Result: {'font-weight': 'bold', 'color': 'red'} #}
```

## `filesize`

配列の要素をフィルタします。

```twig
{{ asset.size }}
{# Output: 1944685 #}
{{ asset.size|filesize }}
{# Output: 1.945 MB #}
```

何も渡されなかった場合、「空の」要素は削除されます。

```twig
{{ 'oh hai'|filesize }}
{# Output: oh hai #}
```

## `filter`

アローファンクションが渡された場合、Twig コアの [`filter`](https://twig.symfony.com/doc/2.x/filters/filter.html) フィルタと同様に機能します。

配列内のアイテムをアローファンクションの結果でグループ化します。

```twig
{% set array = ['foo', '', 'bar', '', 'baz'] %}
{% set filteredArray = array|filter %}
{# Result: ['foo', 'bar', 'baz'] #}
```

不正に変更されるべきではないフォームのデータを安全に渡すために、メッセージ認証コード（HMAC）の鍵付ハッシュを指定された文字列の先頭に追加します。

```twig
{% set array = ['foo', 'bar', 'baz'] %}
{% set filteredArray = array|filter(v => v[0] == 'b') %}
{# Result: ['bar', 'baz'] #}
```

## `group`

PHP スクリプトは、[Security::validateData()](yii2:yii\base\Security::validateData()) を経由して値を検証できます。

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

を経由して、HTML の input 要素の `id` としてうまく動作するよう、文字列をフォーマットします。

```twig
<input type="hidden" name="foo" value="{{ 'bar'|hash }}">
```

配列に [ArrayHelper::index()](yii2:yii\helpers\BaseArrayHelper::index()) を実行します。

```php
$foo = Craft::$app->request->getBodyParam('foo');
$foo = Craft::$app->security->validateData($foo);

if ($foo !== false) {
    // data is valid
}
```

## `httpdate`

Converts a date to the HTTP format, used by [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1)-compliant HTTP headers like `Expires`.

```twig
{% header "Expires: " ~ expiry|httpdate %}
{# Output: Expires: Thu, 08 Apr 2021 13:00:00 GMT #}
```

渡された配列内にある値だけを含む配列を返します。

```twig
{% header "Expires: " ~ expiry|httpdate('CET') %}
{# Output: Expires: Thu, 08 Apr 2021 21:00:00 GMT #}
```

## `id`

値の JSON 表記を返します。

```twig
{% set name = 'input[name]' %}
<input type="text" name="{{ name }}" id="{{ name|id }}">
```

## `index`

これは Twig コアの [`json_encode`](https://twig.symfony.com/doc/2.x/filters/json_encode.html) フィルタと同様に機能しますが、引数 `options` がセットされておらず、 レスポンスのコンテンツタイプが `text/html` または `application/xhtml+xml` の場合、デフォルトで `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT` になります。

```twig
{% set entries = entries|index('id') %}
```

## `indexOf`

配列内の渡された値のインデックス、または、他の文字列に含まれる渡された文字列のインデックスを返します。 （返される位置は、0 からはじまることに注意してください。 ）見つからなかった場合、代わりに `-1` が返されます。

```twig
{% set colors = ['red', 'green', 'blue'] %}
<p>Green is located at position {{ colors|indexOf('green') + 1 }}.</p>

{% set position = 'team'|indexOf('i') %}
{% if position != -1 %}
    <p>There <em>is</em> an “i” in “team”! It’s at position {{ position + 1 }}.</p>
{% endif %}
```

## `intersect`

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

## `json_encode`

::: tip
類推できない方のために、[シシカバブ](https://en.wikipedia.org/wiki/Kebab#Shish)の参照です。
:::

文字列の最初の文字を小文字にします。

## `json_decode`

文字列に <craft3:craft\helpers\Db::escapeParam()> を実行します。

```twig
{% set arr = '[1, 2, 3]'|json_decode %}
```

## `kebab`

[Markdown](https://daringfireball.net/projects/markdown/) で文字列を処理します。

::: tip
That’s a reference to [shish kebabs](https://en.wikipedia.org/wiki/Kebab#Shish) for those of you that don’t get the analogy.
:::

```twig
{{ 'foo bar?'|kebab }}
{# Output: foo-bar #}
```

## `lcfirst`

配列内の1つ以上のプロパティまたはキーで、配列をソートします。

```twig
{{ 'Foobar'|lcfirst }}
{# Output: foobar #}
```

## `literal`

Runs a string through <craft3:craft\helpers\Db::escapeParam()> to escape commas and asterisks so they’re are not treated as special characters in query params.

```twig
{% set titleParam = craft.app.request.getQueryParam('title') %}
{% set entry = craft.entries()
  .title(titleParam|literal)
  .one() %}
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

ソートされる値が配列要素のプロパティやキーとして存在しない場合、代わりにアローファンクションを渡すことができます。
- `flavor` は、`'original'`（デフォルト値）、`'gfm'`（GitHub-Flavored Markdown）、`'gfm-comment'`（改行が`<br>`に変換された GFM）、 または、`'extra'`（Markdown Extra）にできます。
- `inlineOnly` は、`<p>` タグを除き、インライン要素だけを解析するかどうかを決定します。 （デフォルトは `false`）

## `merge`

Merges an array with another one.

This has the same behavior as [Twig’s merge filter](https://twig.symfony.com/doc/2.x/filters/merge.html) which uses PHP’s [array_merge()](https://www.php.net/manual/en/function.array-merge.php) under the hood:

```twig
{% set values = [1, 2] %}
{% set values = values|merge(['Lucille', 'Buster']) %}
{# Result: [1, 2, 'Lucille', 'Buster'] #}
```

It also works on hashes, where merging occurs on the keys. A key that doesn’t already exist is added, and a key that does already exist only has its value overridden:

```twig
{% set items = { 'Buster': 'Bluth', 'Lindsay': 'Bluth' } %}
{% set items = items|merge({ 'Tobias': 'Fünke', 'Lindsay': 'Fünke' }) %}
{# Result: { 'Buster': 'Bluth', 'Tobias': 'Fünke', 'Lindsay': 'Fünke' } #}
```

::: tip
If you want to make sure specific values are defined by default in an array, like `'Lindsay': 'Bluth'` below, reverse the elements in the call:

```twig
{% set items = { 'Buster': 'Bluth', 'Lindsay': 'Bluth' } %}
{% set items = { 'Tobias': 'Fünke', 'Lindsay': 'Fünke' }|merge(items) %}
{# Result: { 'Tobias': 'Fünke', 'Lindsay': 'Bluth', 'Buster': 'Bluth' } #}
```
:::

You can also provide an optional `recursive` argument that will use [ArrayHelper::merge()](craft3:craft\helpers\ArrayHelper::merge()) to merge nested arrays or hashes.

Without `recursive`:

```twig
{% set items = {
    'rebellion': { 'Bespin': 'Calrissian', 'Hoth': 'Organa', 'Crait': 'Organa' },
    'empire': { 'Coruscant': 'Palpatine', 'Endor': 'Palpatine' }
} %}
{% set items = items|merge({
    'rebellion': { 'Endor': 'Solo/Organa' },
    'empire': { 'Bespin': 'Vader', 'Hoth': 'Veers' }
}) %}
{# Result: {
    'rebellion': { 'Endor': 'Solo/Organa' },
    'empire': { 'Bespin': 'Vader', 'Hoth': 'Veers' }
} #}
```

With `recursive`:

```twig{8}
{% set items = {
    'rebellion': { 'Bespin': 'Calrissian', 'Hoth': 'Organa', 'Crait': 'Organa' },
    'empire': { 'Coruscant': 'Palpatine', 'Endor': 'Palpatine' }
} %}
{% set items = items|merge({
    'rebellion': { 'Endor': 'Solo/Organa' },
    'empire': { 'Bespin': 'Vader', 'Hoth': 'Veers' }
}, true) %}
{# Result: {
    'rebellion': {
        'Bespin': 'Calrissian',
        'Hoth': 'Organa',
        'Crait': 'Organa',
        'Endor': 'Solo/Organa'
    },
    'empire': {
        'Coruscant': 'Palpatine',
        'Endor': 'Palpatine',
        'Bespin': 'Vader',
        'Hoth': 'Veers'
    }
} #}
```

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

If the passed-in value isn’t a valid number it will be returned verbatim:

```twig
{{ 'oh hai'|number }}
{# Output: oh hai #}
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

```twig
{{ 0.85|percentage }}
{# Output: 85% #}
```

If the passed-in value isn’t a valid number it will be returned verbatim:

```twig
{{ 'oh hai'|percentage }}
{# Output: oh hai #}
```

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
{% set array2 = array1|push('bar', 'baz') %}
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
{% set array2 = array1|unshift('bar', 'baz') %}
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
{{ array|where(v => v == 'bar') }}
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

Returns an array without one or more specified keys.

The key can be a single key as a string:

```twig
{% set array = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
} %}
{% set filtered = array|withoutKey('baz') %}
{# Result: { 'foo': 'foo', 'bar: 'bar' } #}
```

You can also pass multiple keys in an array:

```twig
{% set array = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
} %}
{% set filtered = array|withoutKey(['bar', 'baz']) %}
{# Result: { 'foo': 'foo' } #}
```
