---
containsGeneratedContent: yes
---

# Users

Users are Craft’s representation of people.

Each user has an email address and username by default, as well as optional fields for a name, photo, and password. Like other [elements](./elements.md), users support custom fields by way of a [field layout](./fields.md#field-layouts).

There are also preferences for localization, accessibility, and debugging that may be relevant depending on how you build your site and whether you grant the user access to the control panel.

What a user can do is determined by which [groups](user-management.md#user-groups) they belong to, and what individual [permissions](user-management.md#permissions) they have been granted.

### Active and Inactive Users

A Craft user can be active or inactive, meaning they have a credentialed account or simply exist as a record in the system. Navigate to the **Users** screen and you’ll find these represented by **Credentialed** and **Inactive** groupings under the “Account Type” heading.

![](./images/account-type-subnav.png)

You’ll most likely be creating active user accounts for content managers or site members to log in and do things. Each active account has its own status to describe that user’s level of access to the system:

- **Active** – Account was activated by an admin, or the user set credentials to gain system access.
- **Pending** – User was invited to activate their account but hasn’t completed the process.
- **Suspended** – Account’s system access was explicitly revoked by another user with sufficient permissions.
- **Locked** – Account was locked because of too many failed login attempts per the <config4:maxInvalidLogins> and <config4:cooldownDuration> config settings.
- **Inactive** – Account never had credentials, or was explicitly deactivated.

You can’t create an inactive user from the control panel, but you can deactivate a user account by choosing **Deactivate...** from its action menu (<icon kind="settings" />). Inactive user accounts are best suited for specific circumstances, like Craft Commerce guest customers or an imaginary Craft-based CRM that manages contacts.

### Addresses

Users each have an address book. [Addresses](./addresses.md) can be managed on behalf of a user via the control panel, or [by the user themselves](./dev/controller-actions.md#post-users-save-address).

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

Once you’ve created a user query, you can set [parameters](#parameters) on it to narrow down the results, and then [execute it](element-queries.md#executing-element-queries) by calling `.all()`. An array of [User](craft4:craft\elements\User) objects will be returned.

::: tip
See [Element Queries](element-queries.md) to learn about how element queries work.
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
!!!include(docs/.artifacts/cms/4.x/users.md)!!!
