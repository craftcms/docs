# 日/時フィールド

日付フィールドは date picker を提供します。 同様に、オプションで time picker を提供します。

You can also pick minimum and maximum dates that should be allowed, and if you’re showing the time, you can choose what the minute increment should be.

## 設定

Date fields have the following settings:

- **Show date** or **Show date and time**\ If **Show date and time** is selected, the following settings will be visible:
    - **Minute Increment** – number of minutes that timepicker suggestions should be incremented by. (Authors can manually enter a specific time.)
    - **Show Time Zone** – whether authors should be able to choose the time zone, rather than the system’s.
- **Min Date** – the earliest date that should be allowed.
- **Max Date** – the latest date that should be allowed.

## テンプレート記法

### 日/時フィールドによるエレメントの照会

利用可能な値には、次のものが含まれます。

::: tip
[atom](dev/filters.md#atom) フィルタは日付を ISO-8601 タイムスタンプに変換します。
:::

| 値                                                | 取得するエレメント                                       |
| ------------------------------------------------ | ----------------------------------------------- |
| `':empty:'`                                      | 選択された日付を持たない。                                   |
| `':notempty:'`                                   | 選択された日付を持つ。                                     |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に選択された日付を持つもの。                     |
| `'< 2018-05-01'`                              | 2018-05-01 より前に選択された日付を持つもの。                    |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に選択された日付を持つもの。       |
| `['or', '< 2018-04-04', '> 2018-05-01']`   | 2018-04-01 より前、または、2018-05-01 より後に選択された日付を持つもの。 |

テンプレート内で日/時フィールドのエレメントを取得する場合、日/時フィールドのハンドルを利用して、そのデータにアクセスできます。
```twig
{# Fetch entries with with a selected date in the next month #}
{% set start = now|atom %}
{% set end = now|date_modify('+1 month')|atom %}

{% set entries = craft.entries()
    .myFieldHandle(['and', ">= #{start}", "< #{end}"])
    .all() %}
```
```php
// Fetch entries with a selected date in the next month
$start = (new \DateTime())->format(\DateTime::ATOM);
$end = (new \DateTime('+1 month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->myFieldHandle(['and', ">= ${start}", "< ${end}"])
    ->all();
```
:::

::: tip
The [atom](dev/filters.md#atom) filter converts a date to an ISO-8601 timestamp.
:::

Craft 3.7 added support for using `now` in date comparison strings:

ユーザーに日付だけを選択させたい場合、入力項目 `date` を使用します。
```twig
{# Fetch entries with a selected date in the past #}
{% set pastEntries = craft.entries()
    .myFieldHandle('< now')
    .all() %}
{# Fetch entries with a selected date now onward #}
{% set futureEntries = craft.entries()
    .myFieldHandle('>= now')
    .all() %}
```
```php
// Fetch entries with a selected date in the past
$pastEntries = \craft\elements\Entry::find()
    ->myFieldHandle('< now')
    ->all();
// Fetch entries with a selected date now onward
$futureEntries = \craft\elements\Entry::find()
    ->myFieldHandle('>= now')
    ->all();
```
:::

::: tip
Don’t forget to consider or disable [template caching](tags.md#cache) for requests that use `now` comparisons! You can pass a `x-craft-gql-cache: no-cache` header for GraphQL requests or set a relatively low [cache duration](config3:cacheDuration).
:::

### 日/時フィールドデータの操作

If you have an element with a Date field in your template, you can access its value by its handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you a [DateTime](http://php.net/manual/en/class.datetime.php) object that represents the selected date, or `null` if no date was selected.

::: code
```twig
{% if entry.myFieldHandle %}
    Selected date: {{ entry.myFieldHandle|datetime('short') }}
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    $selectedDate = \Craft::$app->getFormatter()->asDatetime(
        $entry->myFieldHandle,
        'short'
    );
}
```
:::

Craft and Twig provide several Twig filters for manipulating dates, which you can use depending on your needs:

- [date](dev/filters.md#date)
- [time](dev/filters.md#time)
- [datetime](dev/filters.md#datetime)
- [timestamp](dev/filters.md#timestamp)
- [atom](dev/filters.md#atom)
- [rss](dev/filters.md#rss)
- [date_modify](https://twig.symfony.com/doc/2.x/filters/date_modify.html)

### 投稿フォームで日/時フィールドを保存

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
{# Use the timezone selected under Settings → General Settings → Time Zone #}
{% set tz = craft.app.getTimezone() %}

{# Or set a specific timezone #}
{% set tz = 'America/Los_Angeles' %}

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
Date format: <code>{{ craft.app.locale.getDateFormat('short', 'php') }}</code><br>
Time format: <code>{{ craft.app.locale.getTimeFormat('short', 'php') }}</code>
```

Then refer to PHP’s [date()](http://php.net/manual/en/function.date.php) function docs to see what each of the format letters mean.
:::
