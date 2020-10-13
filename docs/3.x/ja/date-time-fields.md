# 日/時フィールド

日付フィールドは date picker を提供します。同様に、オプションで time picker を提供します。

## 設定

日/時フィールドは、日付、時刻、もしくはその両方にするか、お好みで選択できます。

## テンプレート記法

### 日/時フィールドによるエレメントの照会

日/時フィールドを持つ[エレメントを照会](element-queries.md)する場合、フィールドのハンドルにちなんで名付けられたクエリパラメータを利用して、日/時フィールドのデータに基づいた結果をフィルタできます。

利用可能な値には、次のものが含まれます。

| 値 | 取得するエレメント
| - | -
| `':empty:'` | 選択された日付を持たない。
| `':notempty:'` | 選択された日付を持つ。
| `'>= 2018-04-01'` | 2018-04-01 以降に選択された日付を持つもの。
| `'< 2018-05-01'` | 2018-05-01 より前に選択された日付を持つもの。
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に選択された日付を持つもの。
| `['or', '< 2018-04-04', '> 2018-05-01']` | 2018-04-01 より前、または、2018-05-01 より後に選択された日付を持つもの。

```twig
{# Fetch entries with with a selected date in the next month #}
{% set start = now|atom %}
{% set end = now|date_modify('+1 month')|atom %}

{% set entries = craft.entries()
    .myFieldHandle(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

::: tip
[atom](dev/filters.md#atom) フィルタは日付を ISO-8601 タイムスタンプに変換します。
:::

### 日/時フィールドデータの操作

テンプレート内で日/時フィールドのエレメントを取得する場合、日/時フィールドのハンドルを利用して、そのデータにアクセスできます。

```twig
{% set value = entry.myFieldHandle %}
```

それは、選択された日付を表す [DateTime](http://php.net/manual/en/class.datetime.php) オブジェクトを提供します。日付が選択されていない場合、`null` になります。

```twig
{% if entry.myFieldHandle %}
    Selected date: {{ entry.myFieldHandle|datetime('short') }}
{% endif %}
```

Craft と Twig は、必要に応じて使用できる日付を操作するためのいくつかの Twig フィルタを提供します。

- [date](dev/filters.md#date)
- [time](dev/filters.md#time)
- [datetime](dev/filters.md#datetime)
- [timestamp](dev/filters.md#timestamp)
- [atom](dev/filters.md#atom)
- [rss](dev/filters.md#rss)
- [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)

### 投稿フォームで日/時フィールドを保存

日/時フィールドを含める必要がある[entry form](dev/examples/entry-form.md)がある場合、入力項目 `date` または `datetime-local` を作成できます。

ユーザーに日付だけを選択させたい場合、入力項目 `date` を使用します。

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d', timezone='UTC')
    : '' %}

<input type="date" name="fields[myFieldHandle]" value="{{ currentValue }}">
```

ユーザーに時刻も選択させたい場合、入力項目 `datetime-local` を使用できます。

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', timezone='UTC')
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle]" value="{{ currentValue }}">
```

::: tip
より良いブラウザサポートを[待っている間](https://caniuse.com/#feat=input-datetime) に入力項目 `date` と `datetime-local` を導入するため、[HTML5Forms.js](https://github.com/zoltan-dulac/html5Forms.js) ポリフィルを利用できます。
:::

#### タイムゾーンのカスタマイズ

デフォルトでは、Craft は日付が UTC で投稿されていると想定します。Craft 3.1.6 から、入力欄の name を `fields[myFieldHandle][datetime]`、不可視項目の name を `fields[myFieldHandle][timezone]` とし、[有効な PHP タイムゾーン](http://php.net/manual/en/timezones.php)をセットすることによって、異なるタイムゾーンの日付を投稿できます。

```twig
{# Use the timezone selected under Settings → General Settings → Time Zone #}
{% set tz = craft.app.getTimezone() %}

{# Or set a specific timezone #}
{% set tz = 'America/Los_Angeles' %}

{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', tz)
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle][datetime]" value="{{ currentValue }}">
{{ hiddenInput('fields[myFieldHandle][timezone]', tz) }}
```

または、どのタイムゾーンで日付を投稿するかをユーザーに決定させることもできます。

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', timezone='UTC')
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle][datetime]" value="{{ currentValue }}">

<select name="fields[myFieldHandle][timezone]">
    <option value="America/Los_Angeles">Pacific Time</option>
    <option value="UTC">UTC</option>
    <!-- ... -->
</select>
```

#### 日付と時刻を別々に投稿

日付と時刻を別々の HTML 入力欄として投稿したい場合、それらの name を `fields[myFieldHandle][date]`、および、`fields[myFieldHandle][time]` にします。

日付入力欄は `YYYY-MM-DD` フォーマット、または、現在のロケールの短縮日付フォーマットのいずれかをセットできます。

時刻入力欄は `HH:MM` フォーマット（24時間表記）、または、現在のロケールの短縮時刻フォーマットのいずれかをセットできます。

::: tip
現在のロケールの日付と時刻のフォーマットを調べるには、テンプレートに次のコードを追加してください。

```twig
Date format: <code>{{ craft.app.locale.getDateFormat('short', 'php') }}</code><br>
Time format: <code>{{ craft.app.locale.getTimeFormat('short', 'php') }}</code>
```

次に、PHP の [date()](http://php.net/manual/en/function.date.php) ファンクションのドキュメントを参照し、各フォーマットの文字の意味を確認してください。
:::
