---
related:
  - uri: ../element-types/users.md
    label: User Elements
  - uri: ../../system/relations.md
    label: Using Relationships
  - uri: ../../system/user-management.md
    label: Managing Users + Permissions
---


# Users Fields

Users fields allow you relate [users](../element-types/users.md) to other elements. It is one of Craft’s [relational](../../system/relations.md) custom fields.

<!-- more -->

## Settings

Users fields have the following settings:

- **Sources** – Which user groups (or other user index [source](../../system/elements.md#sources)) the field should be able to relate users from.
- **Selectable Users Condition** – Rules that determine which users should be available for selection.
- **Min Relations** – The _minimum_ number of users that must be selected. (Default is no limit.)
- **Max Relations** – The _maximum_ number of users that can be selected. (Default is no limit.)
- **Default User Placement** — Whether new selections are prepended or appended to the existing relations.
- **View Mode** — How the related users are displayed to authors (_List_ or _Cards_).
- **“Add” Button Label** – The label that should be used on the field’s selection button.
- **Validate related users** — Whether or not validation errors on the related users will be bubbled up.

### Advanced Settings

Additional settings are available under the **Advanced** toggle:

- **Allow self-relations** — If this field is added to the user element field layout, should the author be allowed to select the user they are editing as a relationship to itself?


### Multi-Site Settings

On multi-site installs, the following setting will also be available:

- **Translation Method** — How relationships are handled when [propagating changes to other sites](../../system/fields.md#translation-methods).

While user elements do have an [affiliated site](../../system/user-management.md#affiliated-site) <Since ver="5.6.0" feature="Affiliated sites for users" />, their content is not localized (and therefore, you cannot establish relationships to a specific site, as you can with other relational fields). You may still use the **Translation Method** setting to determine whether authors can select different users for each site, site group, or language.

## The Field

Users fields list all of the currently-related users, with a button to select new ones.

Clicking the “Add a user” button will bring up a modal window where you can find and select additional users.

### Inline User Editing

When you double-click on a related user, a [slideout](../../system/control-panel.md#slideouts) will appear where you can edit the user’s custom fields.

## Development

### Querying Elements with Users Fields

When [querying for elements](../../development/element-queries.md) that have a Users field, you can filter the results based on the Users field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related users.
| `':notempty:'` | that have at least one related user.
| `100` | that are related to the user with an ID of 100.
| `[100, 200]` | that are related to a user with an ID of 100 or 200.
| `[':empty:', 100, 200]` | without related users, or related to a user with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the users with IDs of 100 and 200.
| an [User](craft5:craft\elements\User) object | that are related to the user.
| an [UserQuery](craft5:craft\elements\db\UserQuery) object | that are related to any of the resulting users.

::: code
```twig
{# Fetch entries with a related user #}
{% set entries = craft.entries()
  .myFieldHandle(':notempty:')
  .all() %}
```
```php
// Fetch entries with a related user
$entries = \craft\elements\Entry::find()
    ->myFieldHandle(':notempty:')
    ->all();
```
:::

### Working with Users Field Data

If you have an element with a Users field in your template, you can access its related users using your Users field’s handle:

::: code
```twig
{% set query = entry.myFieldHandle %}
```
```php
$query = $entry->myFieldHandle;
```
:::

That will give you a [user query](../element-types/users.md#querying-users), prepped to output all the related users for the given field.

To loop through all the related users, call [all()](craft5:craft\db\Query::all()) and then loop over the results:

::: code
```twig
{% set relatedUsers = entry.myFieldHandle.all() %}
{% if relatedUsers|length %}
  <ul>
    {% for rel in relatedUsers %}
      <li><a href="{{ url('profiles/'~rel.username) }}">{{ rel.name }}</a></li>
    {% endfor %}
  </ul>
{% endif %}
```
```php
$relatedUsers = $entry->myFieldHandle->all();
if (count($relatedUsers)) {
    foreach ($relatedUsers as $rel) {
        // \craft\helpers\UrlHelper::url('profiles/' . $rel->username)
        // $rel->name
    }
}
```
:::

If you only want the first related user, call [one()](craft5:craft\db\Query::one()) and make sure it returned something:

::: code
```twig
{% set rel = entry.myFieldHandle.one() %}
{% if rel %}
  <p><a href="{{ url('profiles/'~rel.username) }}">{{ rel.name }}</a></p>
{% endif %}
```
```php
$rel = $entry->myFieldHandle->one();
if ($rel) {
    // \craft\helpers\UrlHelper::url('profiles/' . $rel->username)
    // $rel->name
}
```
:::

If you need to check for related users without fetching them you can call [exists()](craft5:craft\db\Query::exists()):

::: code
```twig
{% if entry.myFieldHandle.exists() %}
  <p>There are related users!</p>
{% endif %}
```
```php
if ($entry->myFieldHandle->exists()) {
    // There are related users!
}
```
:::

You can set [parameters](../element-types/users.md#parameters) on the user query as well. For example, to only fetch users in the `authors` group, set the [groupId](../element-types/users.md#groupid) param:

::: code
```twig
{% set relatedUsers = entry.myFieldHandle
    .group('authors')
    .all() %}
```
```php
$relatedUsers = $entry->myFieldHandle
    ->group('authors')
    ->all();
```
:::

::: tip
<Todo notes="Extract this into a snippet." />

In Craft 3, we recommended cloning these query objects using the [`clone` keyword](https://www.php.net/manual/en/language.oop5.cloning.php) or [`clone()`](../twig/functions.md#clone) Twig function before applying params. **This is no longer required in Craft 4**, because a new copy of the query is returned each time you access the field property.
:::

### Saving Users Fields

If you have an element form, such as an [entry form](kb:entry-form), that needs to contain a Users field, you will need to submit your field value as a list of user IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the existing value
   if no checkboxes are checked. #}
{{ hiddenInput('fields[myFieldHandle]', '') }}

{# Get all of the possible user options #}
{% set possibleUsers = craft.users()
  .group('authors')
  .orderBy('username ASC')
  .all() %}

{# Get the currently related user IDs #}
{% set relatedUserIds = entry is defined
  ? entry.myFieldHandle.ids()
  : [] %}

<ul>
  {% for possibleUser in possibleUsers %}
    <li>
      <label>
        {{ input(
          'checkbox',
          'fields[myFieldHandle][]',
          possibleUser.id,
          { checked: possibleUser.id in relatedUserIds }
        ) }}
        {{ possibleUser.friendlyName }}
      </label>
    </li>
  {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related entries.

## See Also

- [User Queries](../element-types/users.md#querying-users)
- [Addresses](../element-types/addresses.md)
- <craft5:craft\elements\User>
- [Relations](../../system/relations.md)
