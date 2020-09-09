# フィルタ

Craft の Twig テンプレートで利用可能な[フィルタ](https://twig.symfony.com/doc/2.x/templates.html#filters)は、以下の通りです。

| フィルタ | 説明 |
------ | -----------
| [abs](https://twig.symfony.com/doc/2.x/filters/abs.html) | 数値の絶対値を返します。 |
| [append](#append) | 別の要素の最後に HTML を追加します。 |
| [ascii](#ascii) | 文字列を ASCII 文字に変換します。 |
| [atom](#atom) | 日付を ISO-8601 タイムスタンプに変換します。 |
| [attr](#attr) | HTML タグの属性を変更します。 |
| [batch](https://twig.symfony.com/doc/2.x/filters/batch.html) | 配列内のアイテムをバッチ処理します。 |
| [camel](#camel) | 文字列を camelCase にフォーマットします。 |
| [capitalize](https://twig.symfony.com/doc/2.x/filters/capitalize.html) | 文字列の最初の文字を大文字にします。 |
| [column](#column) | 配列内の単一のプロパティ、または、キーから値を返します。 |
| [contains](#contains) | 指定されたキーと値のペアを持つネストされたアイテムを配列が含むかどうかを返します。 |
| [convert_encoding](https://twig.symfony.com/doc/2.x/filters/convert_encoding.html) | 文字列をあるエンコーディングから別のエンコーディングに変換します。 |
| [currency](#currency) | 数値を通貨としてフォーマットします。 |
| [date](#date) | 日付をフォーマットします。 |
| [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html) | 日付を変更します。 |
| [datetime](#datetime) | 日付と時刻をフォーマットします。 |
| [default](https://twig.symfony.com/doc/2.x/filters/default.html) | 値、または、空の場合はデフォルト値を返します。 |
| [diff](#diff) | 配列間の差分を返します。 |
| [duration](#duration) | `DateInterval` オブジェクトを返します。 |
| [encenc](#encenc) | 文字列を暗号化し、base64 エンコードします。 |
| [escape](https://twig.symfony.com/doc/2.x/filters/escape.html) | 文字列をエスケープします。 |
| [explodeClass](#explodeclass) | `class` 属性値をクラス名の配列に変換します。 |
| [explodeStyle](#explodestyle) | `style` 属性値をプロパティ名と値のペアの配列に変換します。 |
| [filesize](#filesize) | バイト数を他の何かにフォーマットします。 |
| [filter](#filter) | 配列内のアイテムをフィルタします。 |
| [first](https://twig.symfony.com/doc/2.x/filters/first.html) | 文字列/配列の最初の文字/アイテムを返します。 |
| [format](https://twig.symfony.com/doc/2.x/filters/format.html) | プレースホルダを置き換えて文字列をフォーマットします。 |
| [group](#group) | 配列内のアイテムをグループ化します。 |
| [hash](#hash) | メッセージ認証コード（HMAC）の鍵付ハッシュを文字列の先頭に追加します。 |
| [id](#id) | エレメント ID を英数字、アンダースコア、ダッシュのみに正規化します。 |
| [indexOf](#indexof) | 配列内の指定された値のインデックス、または、別の文字列内の渡された文字列の位置を返します。 |
| [index](#index) | 配列内のアイテムをインデックス化します。 |
| [intersect](#intersect) | 2つの配列の交差するアイテムを返します。 |
| [join](https://twig.symfony.com/doc/2.x/filters/join.html) | 複数の文字列を1つに連結します。 |
| [json_decode](#json_decode) | 値を JSON デコードします。 |
| [json_encode](#json_encode) | 値を JSON エンコードします。 |
| [kebab](#kebab) | 文字列を kebab-case にフォーマットします。 |
| [keys](https://twig.symfony.com/doc/2.x/filters/keys.html) | 配列のキーを返します。 |
| [last](https://twig.symfony.com/doc/2.x/filters/last.html) | 文字列/配列の最後の文字/アイテムを返します。 |
| [lcfirst](#lcfirst) | 文字列の最初の文字を小文字にします。 |
| [length](https://twig.symfony.com/doc/2.x/filters/length.html) | 文字列や配列の長さを返します。 |
| [literal](#literal) | エレメントクエリのパラメータで利用するための信頼できない文字列をエスケープします。 |
| [lower](https://twig.symfony.com/doc/2.x/filters/lower.html) | 文字列を小文字にします。 |
| [map](https://twig.symfony.com/doc/2.x/filters/map.html) | 配列内のアイテムにアローファンクションを適用します。 |
| [markdown](#markdown-or-md) | 文字列を Markdown として処理します。 |
| [merge](https://twig.symfony.com/doc/2.x/filters/merge.html) | 配列を別の配列とマージします。 |
| [multisort](#multisort) | サブ配列内の1つ以上のキーで配列をソートします。 |
| [namespace](#namespace) | CSS セレクタだけでなく、入力項目の name や HTML 属性に名前空間を割り当てます。 |
| [namespaceInputId](#namespaceinputid) | エレメント ID に名前空間を割り当てます。 |
| [namespaceInputName](#namespaceinputname) | 入力項目の name に名前空間を割り当てます。 |
| [nl2br](https://twig.symfony.com/doc/2.x/filters/nl2br.html) | 改行を `<br>` タグに置き換えます。 |
| [number](#number) | 数値をフォーマットします。 |
| [number_format](https://twig.symfony.com/doc/2.x/filters/number_format.html) | 数値をフォーマットします。 |
| [parseRefs](#parserefs) | リファレンスタグの文字列を解析します。 |
| [pascal](#pascal) | 文字列を PascalCase にフォーマットします。 |
| [percentage](#percentage) | パーセンテージをフォーマットします。 |
| [prepend](#prepend) | 別の要素の先頭に HTML を追加します。 |
| [purify](#purify) | HTML コードに HTML Purifier を実行します。 |
| [push](#push) | 1つ以上のアイテムを配列の最後に追加します。 |
| [raw](https://twig.symfony.com/doc/2.x/filters/raw.html) | 現在のエスケープ方針にとって安全な値であると評価します。 |
| [reduce](https://twig.symfony.com/doc/2.x/filters/reduce.html) | シーケンスやマッピングを反復的に単一の値に減らします。 |
| [replace](#replace) | 文字列の一部を他のものに置き換えます。 |
| [reverse](https://twig.symfony.com/doc/2.x/filters/reverse.html) | 文字列や配列を反転します。 |
| [round](https://twig.symfony.com/doc/2.x/filters/round.html) | 数値を丸めます。 |
| [rss](#rss) | 日付を RSS データフォーマットに変換します。 |
| [slice](https://twig.symfony.com/doc/2.x/filters/slice.html) | 文字列や配列のスライスを抽出します。 |
| [snake](#snake) | 文字列を snake_case にフォーマットします。 |
| [sort](https://twig.symfony.com/doc/2.x/filters/sort.html) | 配列をソートします。 |
| [spaceless](https://twig.symfony.com/doc/2.x/filters/spaceless.html) | HTML タグ間の空白を削除します。 |
| [split](https://twig.symfony.com/doc/2.x/filters/split.html) | 文字列をデリミタで分割します。 |
| [striptags](https://twig.symfony.com/doc/2.x/filters/striptags.html) | 文字列から SGML/XML タグを取り除きます。 |
| [time](#time) | 時刻をフォーマットします。 |
| [timestamp](#timestamp) | 人が読めるタイムスタンプをフォーマットします。 |
| [title](https://twig.symfony.com/doc/2.x/filters/title.html) | 文字列を Title Case にフォーマットします。 |
| [translate](#translate-or-t) | メッセージを翻訳します。 |
| [trim](https://twig.symfony.com/doc/2.x/filters/trim.html) | 文字列の最初と最後から空白を取り除きます。 |
| [ucfirst](#ucfirst) | 文字列の最初の文字を大文字にします。 |
| [unique](#unique) | 配列から重複する値を取り除きます。 |
| [unshift](#unshift) | 1つ以上のアイテムを配列の先頭に追加します。 |
| [upper](https://twig.symfony.com/doc/2.x/filters/upper.html) | 文字列を大文字にします。 |
| [url_encode](https://twig.symfony.com/doc/2.x/filters/url_encode.html) | 文字列を URL セグメント、または、クエリ文字列の配列としてパーセントエンコードします。 |
| [values](#values) | キーをリセットして、配列内のすべての値を返します。 |
| [where](#where) | キーと値のペアで配列をフィルタします。 |
| [withoutKey](#withoutkey) | 指定されたキーを除いた配列を返します。 |
| [without](#without) | 指定されたエレメントを除いた配列を返します。 |

## `append`

別の要素の最後に HTML を追加します。

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

同じタイプの要素がまだ存在しないときのみ新しい要素を追加したい場合、第二引数に `'keep'` を渡します。

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>', 'keep') }}
{# Output: <div><p>Lorem</p></div> #}
```

同じタイプの既に存在する要素を置き換えたい場合、第二引数に `'replace'` を渡します。

```twig
{{ '<div><p>Lorem</p></div>'|append('<p>Ipsum</p>', 'replace') }}
{# Output: <div><p>Ipsum</p></div> #}
```

## `ascii`

文字列を ASCII 文字に変換します。

```twig
{{ 'über'|ascii }}
{# Output: uber #}
```

デフォルトでは、ASCII 文字のマッピングを選択するときに現在のサイトの言語が利用されます。別のロケール ID を渡すことで、上書きできます。

```twig
{{ 'über'|ascii('de') }}
{# Output: ueber #}
```

## `atom`

とりわけ Atom フィードで使用される、ISO-8601 タイムスタンプ（例：`2019-01-29T10:00:00-08:00`）に日付を変換します。

```twig
{{ entry.postDate|atom }}
```

## `attr`

<yii2:yii\helpers\BaseHtml::renderTagAttributes()> でサポートされるのと同じ属性定義を利用して、HTML タグの属性を変更します。

```twig
{% set tag = '<div>' %}
{{ tag|attr({
    class: 'foo'
}) }}
{# Output: <div class="foo"> #}
```

最初のタグだけが変更され、それより前の HTML コメントや doctype 宣言は無視されます。

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

`false` をセットすることで、属性を削除できます。

```twig
{% set tag = '<input type="text" disabled>' %}
{{ tag|attr({
    disabled: false
}) }}
{# Output: <input type="text"> #}
```

`class` および `style` 属性は、セットされている場合、要素の既存の属性と結合されます。

```twig
{% set tag = '<div class="foo" style="color: black;">' %}
{{ tag|attr({
    class: 'bar',
    style: {background: 'red'}
}) }}
{# Output: <div class="foo bar" style="color: black; background: red;"> #}
```

他のすべての属性は、既存の属性値を置き換えます。

```twig
{% set tag = '<input type="text">' %}
{{ tag|attr({
    type: 'email'
}) }}
{# Output: <input type="email"> #}
```

`class` または `style` 属性を完全に置き換えたい場合、はじめにそれを削除してから新しい値をセットします。

```twig
{% set tag = '<div class="foo">' %}
{{ tag|attr({class: false})|attr({class: 'bar'}) }}
{# Output: <div class="bar"> #}
```

## `camel`

「camelCase」でフォーマットされた文字列を返します。

```twig
{{ 'foo bar'|camel }}
{# Output: fooBar #}
```

## `column`

配列内の単一のプロパティ、または、キーから値を返します。

```twig
{% set entryIds = entries|column('id') %}
```

返される値が配列要素のプロパティやキーとして存在しない場合、代わりにアローファンクションを渡すことができます。

```twig
{% set authorNames = entries|column(e => e.author.fullName) %}
```

PHP の [array_column()](https://secure.php.net/array_column) ファンクションではなく [ArrayHelper::getColumn()](yii2:yii\helpers\BaseArrayHelper::getColumn()) を利用していることを除けば、Twig コアの [`column`](https://twig.symfony.com/doc/2.x/filters/column.html) フィルタと同様に機能します。

## `contains`

特定のキー/属性が指定された値を持つ、ネストされた配列/オブジェクトを渡された配列に含むかどうかを返します。

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

ユーザーが優先する言語に応じて指定された通貨で、数値をフォーマットします。

```twig
{{ 1000000|currency('USD') }}
{# Output: $1,000,000.00 #}
```

フォーマットされる値が小数値（例：cents）を持たない場合、小数部の桁を削除するために `stripZeros=true` を渡すことができます。

```twig
{{ 1000000|currency('USD', stripZeros=true) }}
{# Output: $1,000,000 #}
```

## `date`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトをフォーマットします。

```twig
{{ entry.postDate|date }}
{# Output: Dec 20, 1990 #}
```

Twig コアの [`date`](https://twig.symfony.com/doc/2.x/filters/date.html) フィルタのように、カスタムの日付フォーマットを渡すことで、日付の表示方法をカスタマイズできます。

```twig
{{ 'now'|date('m/d/Y') }}
{# Output: 12/20/1990 #}
```

Craft はロケール固有の日付フォーマットを出力するいくつかの特別なフォーマットキーワードも提供します。

| フォーマット | 実例 |
| -------------------- | --------------------------- |
| `short` | 12/20/1990 |
| `medium` _（デフォルト）_ | Dec 20, 1990 |
| `long` | December 20, 1990 |
| `full` | Thursday, December 20, 1990 |

```twig
{{ entry.postDate|date('short') }}
{# Output: 12/20/1990 #}
```

デフォルトでは、現在のアプリケーションのロケールが利用されます。別のロケールで日付をフォーマットしたい場合、引数 `locale` を利用します。

```twig
{{ entry.postDate|date('short', locale='en-GB') }}
{# Output: 20/12/1990 #}
```

`timezone` パラメータを利用して、出力する時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|date('short', timezone='UTC') }}
{# Output: 12/21/1990 #}
```

::: tip
date フィルタに渡された値が `null` の場合、デフォルトで現在の日付を返します。
:::

## `datetime`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトを時刻を含めてフォーマットします。

```twig
{{ entry.postDate|datetime }}
{# Output: Dec 20, 1990, 5:00:00 PM #}
```

Craft はロケール固有の日付と時刻のフォーマットを出力するいくつかの特別なフォーマットキーワードを提供します。

```twig
{{ entry.postDate|datetime('short') }}
{# Output: 9/26/2018, 5:00 PM #}
```

利用可能な `format` 値は、次の通りです。

| フォーマット | 実例 |
| -------------------- | ---------------------------------------------- |
| `short` | 12/20/1990, 5:00 PM |
| `medium` _（デフォルト）_ | Dec 20, 1990, 5:00:00 PM |
| `long` | December 20, 1990 at 5:00:00 PM PDT |
| `full` | Thursday, December 20, 1990 at 5:00:00 PM PDT |

デフォルトでは、現在のアプリケーションのロケールが利用されます。別のロケールで日付と時刻をフォーマットしたい場合、引数 `locale` を利用します。

```twig
{{ entry.postDate|datetime('short', locale='en-GB') }}
{# Output: 20/12/1990, 17:00 #}
```

`timezone` パラメータを利用して、出力する時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|datetime('short', timezone='UTC') }}
{# Output: 12/21/1990, 12:00 AM #}
```

## `diff`

[array_diff()](https://www.php.net/manual/en/function.array-diff.php) を利用して、配列間の差分を返します。

フィルタに渡されたどの配列にも存在しない、最初の配列に含まれるすべての値を持つ新しい配列を返します。

```twig
{% set arr1 = ['foo', 'bar'] %}
{% set arr2 = ['bar', 'baz'] %}
{% set arr3 = arr1|diff(arr2) %}
{# Result: ['foo'] #}
```

## `duration`

[DateInterval](http://php.net/manual/en/class.dateinterval.php) オブジェクトに <craft3:craft\helpers\DateTimeHelper::humanDurationFromInterval()> を実行します。

```twig
<p>Posted {{ entry.postDate.diff(now)|duration(false) }} ago.</p>
```

## `encenc`

文字列を暗号化し、base64 エンコードします。

```twig
{{ 'secure-string'|encenc }}
```

## `explodeClass`

`class` 属性値をクラス名の配列に変換します。

配列が渡された場合、そのまま返されます。

```twig
{% set classNames = 'foo bar baz'|explodeClass %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `explodeStyle`

`style` 属性値をプロパティ名と値のペアの配列に変換します。

配列が渡された場合、そのまま返されます。

```twig
{% set styles = 'font-weight: bold; color: red;'|explodeStyle %}
{# Result: {'font-weight': 'bold', 'color': 'red'} #}
```

## `filesize`

バイト数をより良い何かにフォーマットします。

```twig
{{ asset.size }}
{# Output: 1944685 #}
{{ asset.size|filesize }}
{# Output: 1.945 MB #}
```

## `filter`

配列の要素をフィルタします。

何も渡されなかった場合、「空の」要素は削除されます。

```twig
{% set array = ['foo', '', 'bar', '', 'baz'] %}
{% set filteredArray = array|filter %}
{# Result: ['foo', 'bar', 'baz'] #}
```

アローファンクションが渡された場合、Twig コアの [`filter`](https://twig.symfony.com/doc/2.x/filters/filter.html) フィルタと同様に機能します。

```twig
{% set array = ['foo', 'bar', 'baz'] %}
{% set filteredArray = array|filter(v => v[0] == 'b') %}
{# Result: ['bar', 'baz'] #}
```

## `group`

配列内のアイテムをアローファンクションの結果でグループ化します。

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

不正に変更されるべきではないフォームのデータを安全に渡すために、メッセージ認証コード（HMAC）の鍵付ハッシュを指定された文字列の先頭に追加します。

```twig
<input type="hidden" name="foo" value="{{ 'bar'|hash }}">
```

PHP スクリプトは、[Security::validateData()](yii2:yii\base\Security::validateData()) を経由して値を検証できます。

```php
$foo = Craft::$app->request->getBodyParam('foo');
$foo = Craft::$app->security->validateData($foo);

if ($foo !== false) {
    // data is valid
}
```

## `id`

<craft3:craft\web\View::formatInputId()> を経由して、HTML の input 要素の `id` としてうまく動作するよう、文字列をフォーマットします。

```twig
{% set name = 'input[name]' %}
<input type="text" name="{{ name }}" id="{{ name|id }}">
```

## `index`

配列に [ArrayHelper::index()](yii2:yii\helpers\BaseArrayHelper::index()) を実行します。

```twig
{% set entries = entries|index('id') %}
```

## `indexOf`

配列内の渡された値のインデックス、または、他の文字列に含まれる渡された文字列のインデックスを返します。（返される位置は、0 からはじまることに注意してください。）見つからなかった場合、代わりに `-1` が返されます。

```twig
{% set colors = ['red', 'green', 'blue'] %}
<p>Green is located at position {{ colors|indexOf('green') + 1 }}.</p>

{% set position = 'team'|indexOf('i') %}
{% if position != -1 %}
    <p>There <em>is</em> an “i” in “team”! It’s at position {{ position + 1 }}.</p>
{% endif %}
```

## `intersect`

渡された配列内にある値だけを含む配列を返します。

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

値の JSON 表記を返します。

これは Twig コアの [`json_encode`](https://twig.symfony.com/doc/2.x/filters/json_encode.html) フィルタと同様に機能しますが、引数 `options` がセットされておらず、 レスポンスのコンテンツタイプが `text/html` または `application/xhtml+xml` の場合、デフォルトで `JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT` になります。

## `json_decode`

<yii2:yii\helpers\Json::decode()> を通して、文字列を配列に JSON デコードします。

```twig
{% set arr = '[1, 2, 3]'|json_decode %}
```

## `kebab`

「kebab-case」でフォーマットされた文字列を返します。

::: tip
類推できない方のために、[シシカバブ](https://en.wikipedia.org/wiki/Kebab#Shish)の参照です。
:::

```twig
{{ 'foo bar?'|kebab }}
{# Output: foo-bar #}
```

## `lcfirst`

文字列の最初の文字を小文字にします。

```twig
{{ 'Foobar'|lcfirst }}
{# Output: foobar #}
```

## `literal`

文字列に <craft3:craft\helpers\Db::escapeParam()> を実行します。

```twig
{{ 'SELECT id, * FROM table'|literal }}
{# Output: SELECT id\, \* FROM table #}
```

## `markdown` or `md`

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

このフィルタは、2つの引数をサポートしています。
- `flavor` は、`'original'`（デフォルト値）、`'gfm'`（GitHub-Flavored Markdown）、 `'gfm-comment'`（改行が `<br>` に変換された GFM）、 または、`'extra'`（Markdown Extra）にできます。
- `inlineOnly` は、`<p>` タグを除き、インライン要素だけを解析するかどうかを決定します。（デフォルトは `false`）

## `multisort`

配列内の1つ以上のプロパティまたはキーで、配列をソートします。

単一のプロパティまたはキーでソートするには、その名前を文字列で渡します。

```twig
{% set entries = entries|multisort('title') %}
```

複数のプロパティまたはキーでソートするには、それらを配列で渡します。例えば、これははじめに投稿日、次にタイトルでエントリをソートします。

```twig
{% set entries = entries|multisort(['postDate', 'title']) %}
```

ソートされる値が配列要素のプロパティやキーとして存在しない場合、代わりにアローファンクションを渡すことができます。

```twig
{% set entries = entries|multisort(e => e.author.fullName) %}
```

デフォルトでは、値は昇順でソートされます。`direction` パラメータを利用して、降順に切り替えることができます。

```twig
{% set entries = entries|multisort('title', direction=SORT_DESC) %}
```

`sortFlag` パラメータを利用して、並び替えの振る舞いをカスタマイズすることもできます。例えば、アイテムを数値でソートするには、`SORT_NUMERIC` を利用します。

```twig
{% set entries = entries|multisort('id', sortFlag=SORT_NUMERIC) %}
```

利用可能なソートフラグについては、PHP の [sort()](https://www.php.net/manual/en/function.sort.php) ドキュメントを参照してください。

複数のプロパティやキーでソートする際、`direction` および `sortFlag` パラメータも配列としてセットしなければなりません。

```twig
{% set entries = entries|multisort([
    'postDate',
    'title',
], sortFlag=[SORT_NATURAL, SORT_FLAG_CASE]) %}
```

## `namespace`

`|namespace` フィルタは、CSS セレクタだけでなく、入力項目の name や HTML 属性の名前空間を割り当てるために利用されます。

例えば、これは

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

次のようになるでしょう。

```html
<style>
  .text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="text" id="foo-title" name="foo[title]" type="text">
```

CSS セレクタの `#title` が `#foo-title`、`id` 属性が `title` から `foo-title`、さらに、`name` 属性が `title` から `foo[title]` へ変わったことに注目してください。

クラス名にも名前空間を割り当てたい場合、`withClasses=true` を渡してください。クラス CSS セレクタと `class` 属性の両方に影響します。

```twig
{{ html|namespace('foo', withClasses=true) }}
```

次のような結果になるでしょう。

```html{2,5}
<style>
  .foo-text { font-size: larger; }
  #foo-title { font-weight: bold; }
</style>
<input class="foo-text" id="foo-title" name="foo[title]" type="text">
```

## `namespaceInputId`

エレメント ID に名前空間を割り当てます。

例えば、これは

```twig
{{ 'bar'|namespaceInputId('foo') }}
```

次のように出力するでしょう。

```html
foo-bar
```

::: tip
これが [namespace](tags.md#namespace) タグ内で利用されている場合、タグによって適用される名前空間がデフォルトで利用されます。
:::

## `namespaceInputName`

入力項目の name に名前空間を割り当てます。

例えば、これは

```twig
{{ 'bar'|namespaceInputName('foo') }}
```

次のように出力するでしょう。

```html
foo[bar]
```

::: tip
これが [namespace](tags.md#namespace) タグ内で利用されている場合、タグによって適用される名前空間がデフォルトで利用されます。
:::

## `number`

ユーザーが優先する言語に応じて、数値をフォーマットします。

グループシンボル（例えば、英語のコンマ）を省略したい場合は、オプションで `false` を渡すことができます。

```twig
{{ 1000000|number }}
{# Output: 1,000,000 #}

{{ 1000000|number(false) }}
{# Output: 1000000 #}
```

## `parseRefs`

[リファレンスタグ](../reference-tags.md)の文字列を解析します。

```twig
{% set content %}
    {entry:blog/hello-world:link} was my first blog post. Pretty geeky, huh?
{% endset %}

{{ content|parseRefs|raw }}
```

## `pascal`

「PascalCase」（別名「UpperCamelCase」）でフォーマットされた文字列を返します。

```twig
{{ 'foo bar'|pascal }}
{# Output: FooBar #}
```

## `percentage`

ユーザーが優先する言語に応じて、パーセンテージをフォーマットします。

## `prepend`

別の要素の先頭に HTML を追加します。

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>') }}
{# Output: <div><p>Lorem</p><p>Ipsum</p></div> #}
```

同じタイプの要素がまだ存在しないときのみ新しい要素を追加したい場合、第二引数に `'keep'` を渡します。

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>', 'keep') }}
{# Output: <div><p>Ipsum</p></div> #}
```

同じタイプの既に存在する要素を置き換えたい場合、第二引数に `'replace'` を渡します。

```twig
{{ '<div><p>Ipsum</p></div>'|prepend('<p>Lorem</p>', 'replace') }}
{# Output: <div><p>Lorem</p></div> #}
```

## `purify`

与えられたテキストに HTML Purifier を実行します。

```twig
{{ user.bio|purify }}
```

カスタムの HTML Purifier 設定ファイルを指定することもできます。

```twig
{{ user.bio|purify('user_bio') }}
```

`config/htmlpurifier/user_bio.json` によって定義された設定に基づいて、HTML Purifier を設定します。

## `push`

1つ以上のアイテムを配列の最後に追加し、新しい配列を返します。

```twig
{% set array1 = ['foo'] %}
{% set array2 = array|push('bar', 'baz') %}
{# Result: ['foo', 'bar', 'baz'] #}
```

## `replace`

文字列の一部を他のものに置き換えます。

マッピング配列が渡された場合、Twig コアの [`replace`](https://twig.symfony.com/doc/2.x/filters/replace.html) フィルタと同様に機能します。

```twig
{% set str = 'Hello, FIRST LAST' %}

{{ str|replace({
    FIRST: currentUser.firstName,
    LAST:  currentUser.lastName
}) }}
```

または、一度に1つのものを置き換えることができます。

```twig
{% set str = 'Hello, NAME' %}

{{ str|replace('NAME', currentUser.name) }}
```

置換文字列の値の最初と最後にスラッシュを付けてマッチするものを検索することで、正規表現も利用できます。

```twig
{{ tag.title|lower|replace('/[^\\w]+/', '-') }}
```

## `rss`

RSS フィードに必要な形式（`D, d M Y H:i:s O`）で日付を出力します。

```twig
{{ entry.postDate|rss }}
```

## `snake`

「snake_case」でフォーマットされた文字列を返します。

```twig
{{ 'foo bar'|snake }}
{# Output: foo_bar #}
```

## `time`

タイムスタンプ、または、[DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトのフォーマットされた時刻を出力します。

```twig
{{ entry.postDate|time }}
{# Output: 10:00:00 AM #}
```

Craft はロケール固有の時刻のフォーマットを出力するいくつかの特別なフォーマットキーワードを提供します。

```twig
{{ entry.postDate|time('short') }}
{# Output: 10:00 AM #}
```

利用可能な `format` 値は、次の通りです。

| フォーマット | 実例 |
| -------------------- | -------------- |
| `short` | 5:00 PM |
| `medium` _（デフォルト）_ | 5:00:00 PM |
| `long` | 5:00:00 PM PDT |

デフォルトでは、現在のアプリケーションのロケールが利用されます。別のロケールで日付と時刻をフォーマットしたい場合、引数 `locale` を利用します。

```twig
{{ entry.postDate|time('short', locale='en-GB') }}
{# Output: 17:00 #}
```

`timezone` パラメータを利用して、出力する時刻のタイムゾーンをカスタマイズできます。

```twig
{{ entry.postDate|time('short', timezone='UTC') }}
{# Output: 12:00 AM #}
```

## `timestamp`

<craft3:craft\i18n\Formatter::asTimestamp()> 経由で、人が読めるタイムスタンプとして日付をフォーマットします。

```twig
{{ now|timestamp }}
{# Output: 9:00:00 AM #}
```

## `translate` または `t`

[Craft::t()](yii2:yii\BaseYii::t()) でメッセージを翻訳します。

```twig
{{ 'Hello world'|t('myCategory') }}
```

カテゴリの指定がない場合、デフォルトで `site` になります。

```twig
{{ 'Hello world'|t }}
```

::: tip
これがどのように機能するかの詳細については、[静的メッセージの翻訳](../sites.md#static-message-translations)を参照してください。
:::

## `ucfirst`

文字列の最初の文字を大文字にします。

```twig
{{ 'foobar'|ucfirst }}
{# Output: Foobar #}
```

## `unique`

配列に [array_unique()](http://php.net/manual/en/function.array-unique.php) を実行します。

```twig
{% set array = ['Larry', 'Darryl', 'Darryl'] %}
{{ array|unique }}
{# Result: ['Larry', 'Darryl'] #}
```

## `unshift`

1つ以上のアイテムを配列の先頭に追加し、新しい配列を返します。

```twig
{% set array1 = ['foo'] %}
{% set array2 = array|unshift('bar', 'baz') %}
{# Result: ['bar', 'baz', 'foo'] #}
```

## `values`

指定された配列のすべての値の配列を返しますが、カスタムキーは除かれます。

```twig
{% set arr1 = {foo: 'Foo', bar: 'Bar'} %}
{% set arr2 = arr1|values %}
{# arr2 = ['Foo', 'Bar'] #}
```

## `where`

配列に <craft3:craft\helpers\ArrayHelper::where()> を実行します。

```twig
{% set array = { 'foo': 'bar', 'bar': 'baz', 'bat': 'bar' } %}
{{ array|filterByValue(v => v == 'bar') }}
{# Result: { 'foo': 'bar', 'bat': 'bar' } #}
```

## `without`

指定されたエレメントを除いた配列を返します。

```twig
{% set entries = craft.entries.section('articles').limit(3).find %}
{% set firstEntry = entries[0] %}
{% set remainingEntries = entries|without(firstEntry) %}
```

## `withoutKey`

指定されたキーを除いた配列を返します。

```twig
{% set array = {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
} %}
{% set filtered = array|withoutKey('baz') %}
```
