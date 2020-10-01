# Time Fields

Time fields provide a time picker input.

## Settings

You can customize the minute increment, and you can optionally choose minimum and maximum times that should be allowed.

## Templating

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

```twig
{# Fetch entries with with a selected time before 10:00 AM #}
{% set entries = craft.entries()
    .myFieldHandle('< 10:00')
    .all() %}
```

### Working with Time Field Data

If you have an element with a Time field in your template, you can access its value by its handle:

```twig
{% set value = entry.myFieldHandle %}
```

That will give you a [DateTime](http://php.net/manual/en/class.datetime.php) object that represents the selected time (with the date implicitly set to today), or `null` if no time was selected.

If it’s set, you can output a formatted time based on its value using the [time](dev/filters.md#time) filter.

```twig
{% if entry.myFieldHandle %}
    Selected time: {{ entry.myFieldHandle|time('short') }}
{% endif %}
```

### Saving Time Fields in Entry Forms

If you have an [entry form](dev/examples/entry-form.md) that needs to contain a Time field, you can create a `time` input.

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
