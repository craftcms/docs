# Users Fields

Users fields type allow you relate [users](users.md) to other elements.

## Settings

Users fields have the following settings:

- **Sources** – Which user groups (or other user index sources) the field should be able to relate users from.
- **Limit** – The maximum number of users that can be related with the field at once. (Default is no limit.)
- **Selection Label** – The label that should be used on the field’s selection button.

### Multi-Site Settings

On multi-site installs, the following setting will also be available (under “Advanced”):

- **Manage relations on a per-site basis** – Whether each site should get its own set of related users.

## The Field

Users fields list all of the currently-related users, with a button to select new ones.

Clicking the “Add a user” button will bring up a modal window where you can find and select additional users.

### Inline User Editing

When you double-click on a related user, a HUD will appear where you can edit the user’s custom fields.

## Development

### Querying Elements with Users Fields

When [querying for elements](element-queries.md) that have a Users field, you can filter the results based on the Users field data using a query param named after your field’s handle.

Possible values include:

| Value | Fetches elements…
| - | -
| `':empty:'` | that don’t have any related users.
| `':notempty:'` | that have at least one related user.
| `100` | that are related to the user with an ID of 100.
| `[100, 200]` | that are related to a user with an ID of 100 or 200.
| `[':empty:', 100, 200]` | without related users, or related to a user with an ID of 100 or 200.
| `['and', 100, 200]` | that are related to the users with IDs of 100 and 200.
| an [User](craft3:craft\elements\User) object | that are related to the user.
| an [UserQuery](craft3:craft\elements\db\UserQuery) object | that are related to any of the resulting users.

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

That will give you a [user query](users.md#querying-users), prepped to output all the related users for the given field.

To loop through all the related users, call [all()](craft3:craft\db\Query::all()) and then loop over the results:

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

If you only want the first related user, call [one()](craft3:craft\db\Query::one()) and make sure it returned something:

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

If you need to check for related users without fetching them you can call [exists()](craft3:craft\db\Query::exists()):

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

You can set [parameters](users.md#parameters) on the user query as well. For example, to only fetch users in the `authors` group, set the [groupId](users.md#groupid) param:

::: code
```twig
{% set relatedUsers = clone(entry.myFieldHandle)
    .group('authors')
    .all() %}
```
```php
$relatedUsers = (clone $entry->myFieldHandle)
    ->group('authors')
    ->all();
```
:::

::: tip
It’s always a good idea to clone the user query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Users Fields

If you have an element form, such as an [entry form](https://craftcms.com/knowledge-base/entry-form), that needs to contain a Users field, you will need to submit your field value as a list of user IDs, in the order you want them to be related.

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

* [User Queries](users.md#querying-users)
* <craft3:craft\elements\User>
* [Relations](relations.md)
