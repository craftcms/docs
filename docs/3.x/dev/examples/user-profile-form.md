# User Profile Form

You can create a form that allows users to edit their profile using the following code as a starting point:

```twig
{# Require that a user is logged in to view this form. #}
{% requireLogin %}

{% macro errorList(errors) %}
  {% if errors %}
    <ul class="errors">
      {% for error in errors %}
        <li>{{ error }}</li>
      {% endfor %}
    </ul>
  {% endif %}
{% endmacro %}

{# If there were any validation errors, a `user` variable will be passed to the
   template, which contains the posted values and validation errors. If that’s not
   set, we’ll default to the current user. #}
{% set user = user ?? currentUser %}

{% if user.hasErrors() %}
  <p>Unable to save your profile.</p>
{% endif %}

<form method="post" accept-charset="UTF-8" enctype="multipart/form-data">
  {{ csrfInput() }}
  {{ actionInput('users/save-user') }}
  {{ hiddenInput('userId', user.id) }}
  {{ redirectInput("users/#{currentUser.username}") }}

  <label for="first-name">First Name</label>
  {{ input('text', 'firstName', user.firstName, {
    id: 'first-name',
    class: user.hasErrors('firstName') ? 'error',
  }) }}
  {{ _self.errorList(user.getErrors('firstName')) }}

  <label for="last-name">Last Name</label>
  {{ input('text', 'lastName', user.firstName, {
    id: 'last-name',
    class: user.hasErrors('lastName') ? 'error',
  }) }}
  {{ _self.errorList(user.getErrors('lastName')) }}

  {% if user.photo %}
    <label>Photo</label>
    {{ user.photo.getImg({width: 150, height: 150})|attr({
      id: 'user-photo',
      alt: user.friendlyName,
    }) }}

    <label for="delete-photo">
      {{ input('checkbox', 'deletePhoto', '1', {
        id: 'delete-photo',
      }) }}
      Delete photo
    </label>
  {% endif %}

  <label for="photo">Upload a new photo</label>
  {{ input('file', 'photo', null, {
    id: 'photo',
    accept: 'image/png,image/jpeg',
  }) }}

  {% if not craft.app.config.general.useEmailAsUsername %}
    <label for="username">Username</label>
    {{ input('text', 'username', user.username, {
      id: 'username',
      class: user.hasErrors('username') ? 'error',
    }) }}
    {{ _self.errorList(user.getErrors('username')) }}
  {% endif %}

  <label for="email">Email</label>
  {{ input('text', 'email', user.unverifiedEmail ?? user.email, {
    id: 'email',
    class: user.hasErrors('email') ? 'error',
  }) }}
  {{ _self.errorList(user.getErrors('username')) }}

  {% if craft.app.projectConfig.get('users.requireEmailVerification') %}
    <p>New email addresses need to be verified.</p>
  {% endif %}

  <label for="new-password">New Password</label>
  {{ input('password', 'newPassword', null, {
    id: 'new-password',
    class: user.hasErrors('newPassword') ? 'error',
  }) }}
  {{ _self.errorList(user.getErrors('newPassword')) }}

  <label for="current-password">Current Password</label>
  {{ input('password', 'password', null, {
    id: 'current-password',
    class: user.hasErrors('currentPassword') ? 'error'
  }) }}
  {{ _self.errorList(user.getErrors('currentPassword')) }}

  {# Custom “Bio” field #}
  <label for="bio">Bio</label>
  {{ tag('textarea', user.bio, {
    id: 'bio',
    name: 'fields[bio]',
    class: user.hasErrors('bio') ? 'error',
  }) }}
  {{ _self.errorList(user.getErrors('bio')) }}

  <input type="submit" value="Save Profile">
</form>
```

::: tip
You can change the name of the variable that the user should be returned to the template as if it contains validation errors, by including a `userVariable` input in your form.

```twig
{{ hiddenInput('userVariable', 'badUser'|hash) }}
```
:::
