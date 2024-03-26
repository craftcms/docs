---
description: Manage and personalize access to your platform.
containsGeneratedContent: yes
related:
  - uri: ../../system/elements.md
    label: Introduction to Elements
  - uri: ../../system/user-management.md
    label: Managing Users
  - uri: ../field-types/users.md
    label: Users Fields
---

# Users

Users are Craft’s representation of people.

Each user has an email address and username by default, as well as optional fields for a name, photo, and password. Like other [elements](../../system/elements.md), users support custom fields by way of a [field layout](../../system/fields.md#field-layouts).

There are also preferences for localization, accessibility, and debugging that may be relevant depending on how you build your site and whether you grant the user access to the control panel.

What a user can do is determined by which [groups](../../system/user-management.md#user-groups) they belong to, and what individual [permissions](../../system/user-management.md#permissions) they have been granted.

<See path="../../system/user-management.md" hash="statuses" label="User Statuses" description="Learn about how a user’s status affects their capabilities." />

### Addresses

Users each have an address book. [Addresses](addresses.md) can be managed on behalf of a user via the control panel, or [by the user themselves](addresses.md#managing-addresses).

## Querying Users

You can fetch users in your templates or PHP code using **user queries**.

::: code
```twig
{# Create a new user query #}
{% set myUserQuery = craft.users() %}
```
```php
// Create a new user query
$myUserQuery = \craft\elements\User::find();
```
:::

Once you’ve created a user query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](../../system/element-queries.md#executing-element-queries) by calling `.all()`. An array of [User](craft5:craft\elements\User) objects will be returned.

::: tip
See [Element Queries](../../system/element-queries.md) to learn about how element queries work.
:::

### Example

We can display a list of the users in an “Authors” user group by doing the following:

1. Create a user query with `craft.users()`.
2. Set the [group](#group) parameter on it.
3. Fetch the users with `.all()`.
4. Loop through the users using a [for](https://twig.symfony.com/doc/3.x/tags/for.html) tag to create the list HTML.

```twig
{# Create a user query with the 'group' parameter #}
{% set myUserQuery = craft.users()
  .group('authors') %}

{# Fetch the users #}
{% set users = myUserQuery.all() %}

{# Display the list #}
<ul>
  {% for user in users %}
    <li><a href="{{ url('authors/'~user.username) }}">{{ user.name }}</a></li>
  {% endfor %}
</ul>
```

### Parameters

User queries support the following parameters:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/5.x/users.md)!!!
