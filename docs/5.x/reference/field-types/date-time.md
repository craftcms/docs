---
related:
  - uri: time.md
    label: Time-only fields
---

# Date Fields

Date fields provide a specialized input that captures and stores a date and time, in UTC. You may [configure](#settings) it to only accept a date (no time), and to expose a timezone selector.

<!-- more -->

## Settings

Date fields have the following settings:

- **Show date** or **Show date and time**\
    If **Show date and time** is selected, the following settings will be visible:
    - **Minute Increment** – number of minutes that timepicker suggestions should be incremented by. (Authors can manually enter a specific time.)
    - **Show Time Zone** – whether authors should be able to choose the time zone, rather than the system’s.
- **Min Date** – the earliest date that should be allowed.
- **Max Date** – the latest date that should be allowed.

## Development

Date values are always stored in UTC, and normalized to the system timezone (set in <Journey path="Settings, General" />), or whichever timezone was selected by the author.

As a result, outputting dates in a template will typically not require

### Working with Date Field Data

If you have an element with a date field in your template, you can access its value by its handle:

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
{% if entry.myDateField %}
  Selected date: {{ entry.myDateField|datetime('short') }}
{% endif %}
```
```php
if ($entry->myDateField) {
    $selectedDate = \Craft::$app->getFormatter()->asDatetime(
        $entry->myDateField,
        'short'
    );
}
```
:::

Twig has a number of filters for manipulating and outputting dates:

- [date](../twig/filters.md#date)
- [time](../twig/filters.md#time)
- [datetime](../twig/filters.md#datetime)
- [duration](../twig/filters.md#duration)
- [timestamp](../twig/filters.md#timestamp)
- [atom](../twig/filters.md#atom)
- [rss](../twig/filters.md#rss)
- [date_modify](https://twig.symfony.com/doc/3.x/filters/date_modify.html)

As a `DateTime` object, you can also use PHP’s native formatting method:

```twig
{{ entry.myDateField.format('F j, Y') }}
{# -> January 1, 2025 #}
```

### Querying Elements with Date Fields

When [querying for elements](element-queries.md) that have a date field, you can filter the results using a query param named after your field’s handle.

Possible values include:

Value | Fetches elements…
--- | ---
`':empty:'` | …that don’t have a selected date.
`':notempty:'` | …that have a selected date.
`'>= 2025-01-01'` | …that have a date selected on or after 1 January, 2025.
`'< 2025-01-01'` | …that have a date selected before 1 January, 2025.
`['and', '>= 2024-01-01', '< 2024-06-01']` | …that have a date selected after 1 January, 2024 and before 1 June, 2025.
`['or', '< 2024-06-01', '> 2025-01-01']` | …that have a date selected before 1 June, 2024 or after 1 January, 2025.

::: code
```twig
{# Fetch entries with a selected date in the next month #}
{% set start = now|atom %}
{% set end = now|date_modify('+1 month')|atom %}

{% set entries = craft.entries()
  .myDateField(['and', ">= #{start}", "< #{end}"])
  .all() %}
```
```php
// Fetch entries with a selected date in the next month
$start = (new \DateTime())->format(\DateTime::ATOM);
$end = (new \DateTime('+1 month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->myDateField(['and', ">= ${start}", "< ${end}"])
    ->all();
```
:::

::: tip
The [atom](../twig/filters.md#atom) filter converts a date to an ISO-8601 timestamp. `#{...}` interpolates the timestamp into a double-quoted string (`"`) with an operator.
:::

In place of a timestamp, you can use a handful of tokens to stand in for commonly-referenced relative times:

::: code
```twig
{# Fetch entries with a selected date in the past #}
{% set pastEntries = craft.entries()
  .myDateField('< now')
  .all() %}
{# Fetch entries with a selected date now onward #}
{% set futureEntries = craft.entries()
  .myDateField('>= now')
  .all() %}
```
```php
// Fetch entries with a selected date in the past
$pastEntries = \craft\elements\Entry::find()
    ->myDateField('< now')
    ->all();
// Fetch entries with a selected date now onward
$futureEntries = \craft\elements\Entry::find()
    ->myDateField('>= now')
    ->all();
```
:::

In these examples, `now` can be substituted for `today` (midnight of the current day), `tomorrow` (midnight of the following day), or `yesterday` (midnight of the previous day).

::: tip
Me mindful of [template caching](../twig/tags.md#cache) when comparing against the current time!
:::

#### Timezones

Craft treats all dates as though they are in the system’s timezone, except when one is set explicitly for a date field.

The returned `DateTime` object’s timezone will be set, accordingly. If you wish to display the date in a _different_ timezone than it was defined, use the `timezone` argument supported by Craft’s [date](../twig/filters.md#date), [datetime](../twig/filters.md#datetime) and [time](../twig/filters.md#time) Twig filters.

::: tip
This flexibility is only a feature of date fields, and native element properties (like entries’ _post date_) are always stored in the system timezone.
:::

#### Advanced Conditions <Since ver="5.6.0" feature="Field aliases in advanced where() clauses" />

Building some date-based constraints can be cumbersome or inscrutable in Twig. In these cases, the database or query builder may be able to make them more declarative:

::: code
```twig{5} MySQL
{% set year = 2024 %}

{% set sentInYear = craft.entries()
  .section('letters')
  .andWhere("YEAR([[dateSent]]) = :y", { y: year })
  .all() %}
```
```twig{5} Postgres
{% set year = 2024 %}

{% set sentInYear = craft.entries()
  .section('letters')
  .andWhere("EXTRACT(YEAR FROM TIMESTAMP [[dateSent]]) = :y", { y: year })
  .all() %}
```
:::

This uses the database’s built-in functions to extract and compare only the year of each date; similarly, you could use the `MONTH()` function (or `MONTH FROM TIMESTAMP`) to find entries with a `dateSent` only in a specific month.

::: danger
_Do not_ pass user input (like a field value or query string) directly to `.andWhere()`! Here, we’ve used a bound parameter (`:y`) to safely escape the input.
:::

Prior to the introduction of custom field column aliases in Craft 5.6.0, advanced queries such as this were still possible, but required that you build the field value SQL expression using the [`fieldValueSql()` function](../twig/functions.md#fieldvaluesql).


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

#### Customizing the Timezone

By default, Craft will assume the date is posted in UTC. You can post dates in a different timezone by changing the primary input’s `name` to `fields[myFieldHandle][datetime]` and adding a hidden input named `fields[myFieldHandle][timezone]`, set to a [valid PHP timezone](http://php.net/manual/en/timezones.php):

```twig
{# Use the timezone selected under Settings → General Settings → Time Zone #}
{% set tz = craft.app.getTimezone() %}

{# Or set a specific timezone #}
{% set tz = 'America/Los_Angeles' %}

{# Normalize saved dates with the specified timezone: #}
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
  {# ... #}
</select>
```

In this example, we’ve elected to normalize the stored date (and timezone) to UTC, then allow the user to send it back to Craft in a localized way.

#### Posting the Date and Time Separately

If you’d like to post the date and time as separate HTML inputs, give them the names `fields[myDateField][date]` and `fields[myDateField][time]`.

- The `date` input can use either the `YYYY-MM-DD` format, or the current locale’s short date format.
- The `time` input can use either the `HH:MM` format (24-hour), or the current locale’s short time format.

::: tip
To find out what your current locale’s date and time formats are, add this to your template:

```twig
Date format: <code>{{ craft.app.locale.getDateFormat('short', 'php') }}</code><br>
Time format: <code>{{ craft.app.locale.getTimeFormat('short', 'php') }}</code>
```

Then refer to PHP’s [date()](http://php.net/manual/en/function.date.php) function docs to see what each of the format letters mean.

The locale that Craft uses to parse dates and times depends on the [site](../../system/sites.md)’s language for front-end requests, and user preferences for control panel requests.
:::

This strategy can by combined with [timezone customization](#customizing-the-timezone).
