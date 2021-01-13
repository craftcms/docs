# Time Fields

Time fields provide a time picker input.

## Settings

You can customize the minute increment and optionally choose minimum and maximum times that should be allowed.

## Converting from a Date Field

If you have an existing [Date](date-time-fields.md) field that you wish to convert to a Time field, you may need to update its existing values to compensate for the fact that Date fields store their values in UTC, whereas Time field values are timezone-less.

For example, if your system timezone is set to `UTC-7 (PDT)`, and you have a Date field value whose time is set to 10:00 AM, its actual value in the database will be `17:00` (5:00 PM), because that’s what 10:00 AM PDT is in UTC.

First visit **Settings** → **General** and check your system timezone. If it’s set to `UTC`, you have nothing to worry about. Go ahead and convert your field type.

Otherwise, take note of the timezone offset, then execute one of the following SQL queries, depending on the database engine you’re using:

::: code
```sql MySQL
UPDATE `content`
SET `field_myFieldHandle` = CONVERT_TZ(`field_myFieldHandle`, '+00:00', '-07:00')
WHERE `field_myFieldHandle` IS NOT NULL
```
```sql PostgreSQL
UPDATE "content"
SET "field_myFieldHandle" = "field_myFieldHandle" at time zone 'UTC' at time zone '-07:00'
WHERE "field_myFieldHandle" IS NOT NULL
```
:::

(Replace `myFieldHandle` with your Date field handle, and `-07:00` with your system timezone offset. You may also need to change the table name and/or column name prefix as well, depending on the field’s context and your tablePrefix DB connection setting.)

Once you’ve updated your existing field values, go ahead and convert your field type.

## Development

### Querying Elements with Time Fields

When [querying for elements](element-queries.md) that have a Time field, you can filter the results based on the Time field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have a selected time.
| `':notempty:'` | that have a selected time.
| `'>= 10:00'` | that have a time selected on or after 10:00 AM.
| `'< 10:00'` | that have a time selected before 10:00 AM.
| `['and', '>= 10:00', '< 17:00']` | that have a time selected between 10:00 AM and 5:00 PM.
| `['or', '< 10:00', '> 17:00']` | that have a time selected before 10:00 AM or after 5:00 PM.

::: code
```twig
{# Fetch entries with with a selected time before 10:00 AM #}
{% set entries = craft.entries()
    .myFieldHandle('< 10:00')
    .all() %}
```
```php
// Fetch entries with with a selected time before 10:00 AM
$entries = \craft\elements\Entry::find()
    ->myFieldHandle('< 10:00')
    ->all();
```
:::

### Working with Time Field Data

If you have an element with a Time field in your template, you can access its value by its handle:

::: code
```twig
{% set value = entry.myFieldHandle %}
```
```php
$value = $entry->myFieldHandle;
```
:::

That will give you a [DateTime](http://php.net/manual/en/class.datetime.php) object that represents the selected time (with the date implicitly set to today), or `null` if no time was selected.

If it’s set, you can output a formatted time based on its value using the [time](dev/filters.md#time) filter.

::: code
```twig
{% if entry.myFieldHandle %}
    Selected time: {{ entry.myFieldHandle|time('short') }}
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    $selectedTime = \Craft::$app->getFormatter()->asTime(
        $entry->myFieldHandle, 
        'short'
    );
}
```
:::

### Saving Time Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Time field, you can create a `time` input.

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('H:i')
    : '' %}

<input type="time" name="fields[myFieldHandle]" value="{{ currentValue }}">
```

#### Customizing the Timezone

By default, Craft will assume the date is posted in the system timezone. You can post dates in a different timezone by changing the input name to `fields[myFieldHandle][time]` and adding a hidden input named `fields[myFieldHandle][timezone]`, set to a [valid PHP timezone](http://php.net/manual/en/timezones.php):

```twig
{# Set a specific timezone #}
{% set tz = 'America/Los_Angeles' %}

{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('H:i', timezone=tz)
    : '' %}

<input type="time" name="fields[myFieldHandle][time]" value="{{ currentValue }}">
{{ hiddenInput('fields[myFieldHandle][timezone]', tz) }}
```

Or you can let users decide which timezone the date should be posted in:

```twig
{% set currentValue = entry is defined and entry.myFieldHandle
    ? entry.myFieldHandle|date('H:i', timezone='UTC')
    : '' %}

<input type="time" name="fields[myFieldHandle][time]" value="{{ currentValue }}">

<select name="fields[myFieldHandle][timezone]">
    <option value="UTC" selected>UTC</option>
    <option value="America/Los_Angeles">Pacific Time</option>
    <!-- ... -->
</select>
```
