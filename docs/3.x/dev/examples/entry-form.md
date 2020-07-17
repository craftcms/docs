# Entry Form

You can create a form for submitting new entries using the following code as a starting point:

```twig
{% macro errorList(errors) %}
  {% if errors %}
    <ul class="errors">
      {% for error in errors %}
        <li>{{ error }}</li>
      {% endfor %}
    </ul>
  {% endif %}
{% endmacro %}

{# If there were any validation errors, an `entry` variable will be passed to the
   template, which contains the posted values and validation errors. If that’s not
   set, we’ll default to a new entry. #}
{% set entry = entry ?? create('craft\\elements\\Entry') %}

<form method="post" accept-charset="UTF-8">
  {{ csrfInput() }}
  {{ actionInput('entries/save-entry') }}
  {{ redirectInput('viewentry/{slug}') }}
  {{ hiddenInput('sectionId', '2') }}
  {{ hiddenInput('enabled', '1') }}

  <label for="title">Title</label>
  {{ input('text', 'title', entry.title, {
    id: 'title',
    class: entry.hasErrors('title') ? 'error',
  }) }}
  {{ _self.errorList(entry.getErrors('title')) }}

  <label for="body">Body</label>
  {{ tag('textarea', entry.body, {
    id: 'body',
    name: 'body',
    class: entry.hasErrors('body') ? 'error',
  }) }}
  {{ _self.errorList(entry.getErrors('body')) }}

  <input type="submit" value="Publish">
</form>
```

Be sure to change the `sectionId` value to the actual ID of the section want to save the entry to.

The user submitting the entry will also need to have the permission necessary to create entries for the section they are posting to.

::: tip
You can change the name of the variable that the entry should be returned to the template as if it contains validation errors, by including an `entryVariable` input in your form.

```twig
{{ hiddenInput('entryVariable', 'badEntry'|hash) }}
```
:::

::: tip
You can accept anonymous entry submissions using the [Guest Entries](https://plugins.craftcms.com/guest-entries) plugin.
:::

### Editing Existing Entries

You can modify the form to save existing entries by adding an `entryId` hidden input to the form:

```twig
{{ hiddenInput('entryId', entry.id) }}
```
