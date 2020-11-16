# Date Fields

日付フィールドは date picker を提供します。 同様に、オプションで time picker を提供します。

## 設定

Date fields let you choose whether you want to show only the date, or the date and time.

You can also pick minimum and maximum dates that should be allowed, and if you’re showing the time, you can choose what the minute increment should be.

## テンプレート記法

### Querying Elements with Date Fields

When [querying for elements](element-queries.md) that have a Date field, you can filter the results based on the Date field data using a query param named after your field’s handle.

Possible values include:

| 値                                                | 取得するエレメント                                       |
| ------------------------------------------------ | ----------------------------------------------- |
| `':empty:'`                                      | 選択された日付を持たない。                                   |
| `':notempty:'`                                   | 選択された日付を持つ。                                     |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に選択された日付を持つもの。                     |
| `'< 2018-05-01'`                              | 2018-05-01 より前に選択された日付を持つもの。                    |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に選択された日付を持つもの。       |
| `['or', '< 2018-04-04', '> 2018-05-01']`   | 2018-04-01 より前、または、2018-05-01 より後に選択された日付を持つもの。 |

```twig
{# Fetch entries with with a selected date in the next month #}
{% set start = now|atom %}
{% set end = now|date_modify('+1 month')|atom %}

{% set entries = craft.entries()
    .myFieldHandle('and', ">= #{start}", "< #{end}")
    .all() %}
```

::: tip
The [atom](dev/filters.md#atom) filter converts a date to an ISO-8601 timestamp.
:::

### Working with Date Field Data

If you have an element with a Date field in your template, you can access its value by its handle:

```twig
{% set value = entry.myFieldHandle %}
```

That will give you a [DateTime](http://php.net/manual/en/class.datetime.php) object that represents the selected date, or `null` if no date was selected.

```twig
{% if entry.myFieldHandle %}
    Selected date: {{ entry.myFieldHandle|datetime('short') }}
{% endif %}
```

Craft and Twig provide several Twig filters for manipulating dates, which you can use depending on your needs:

- [date](dev/filters.md#date)
- [time](dev/filters.md#time)
- [datetime](dev/filters.md#datetime)
- [timestamp](dev/filters.md#timestamp)
- [atom](dev/filters.md#atom)
- [rss](dev/filters.md#rss)
- [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)

### Saving Date Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Date field, you can create a `date` or `datetime-local` input.

If you just want the user to be able to select a date, use a `date` input:

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d', timezone='UTC')
    : '' %}

<input type="date" name="fields[myFieldHandle]" value="{{ currentValue }}">
```

If you want the user to be able to select a time as well, use a `datetime-local` input:

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', timezone='UTC')
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle]" value="{{ currentValue }}">
```

::: tip
The [HTML5Forms.js](https://github.com/zoltan-dulac/html5Forms.js) polyfill can be used to implement `date` and `datetime-local` inputs [while we wait](https://caniuse.com/#feat=input-datetime) for better browser support.
:::

#### タイムゾーンのカスタマイズ

By default, Craft will assume the date is posted in UTC. As of Craft 3.1.6 you can post dates in a different timezone by changing the input name to `fields[myFieldHandle][datetime]` and adding a hidden input named `fields[myFieldHandle][timezone]`, set to a [valid PHP timezone](http://php.net/manual/en/timezones.php):

```twig
{% set pt = 'America/Los_Angeles' %}
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', timezone=tz)
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle][datetime]" value="{{ currentValue }}">
{{ hiddenInput('fields[myFieldHandle][timezone]', tz) }}
```

Or you can let users decide which timezone the date should be posted in:

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('Y-m-d\\TH:i', timezone='UTC')
    : '' %}

<input type="datetime-local" name="fields[myFieldHandle][datetime]" value="{{ currentValue }}">

<select name="fields[myFieldHandle][timezone]">
    <option value="UTC" selected>UTC</option>
    <option value="America/Los_Angeles">Pacific Time</option>
    <!-- ... -->
</select>
```

#### 日付と時刻を別々に投稿

If you’d like to post the date and time as separate HTML inputs, give them the names `fields[myFieldHandle][date]` and `fields[myFieldHandle][time]`.

The date input can either be set to the `YYYY-MM-DD` format, or the current locale’s short date format.

The time input can either be set to the `HH:MM` format (24-hour), or the current locale’s short time format.

::: tip
To find out what your current locale’s date and time formats are, add this to your template:

```twig
日付のフォーマット： <code>{{ craft.app.locale.getDateFormat('short', 'php') }}</code><br>
時刻のフォーマット： <code>{{ craft.app.locale.getTimeFormat('short', 'php') }}</code>
```

Then refer to PHP’s [date()](http://php.net/manual/en/function.date.php) function docs to see what each of the format letters mean.
:::
