# ユーザープロフィールの編集フォーム

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
{% set user = user ?? <form id="profile-form" class="profile-form" method="post" accept-charset="UTF-8">
      {{ actionInput('users/save-user') }} <div class="group">
  <label for="first-name">First Name</label>
  <input type="text" id="first-name" name="firstName" value="{{ formUser.firstName }}">
</div>

<div class="group">
  <label for="last-name">Last Name</label>
  <input type="text" id="last-name" name="lastName" value="{{ formUser.lastName }}">
</div> Please check for errors.</p>

      <ul>
        {% for error in formUser.getFirstErrors() %}
          <li>{{ error }}</li>
        {% endfor %}
      </ul>
    </div>
  {% endif %}

  {{ csrfInput() }}

  {# {{ redirectInput('users/'~currentUser.username) }} #}

  {{ actionInput('users/save-user') }}

  {{ hiddenInput('userId', formUser.id) }}

  <div class="group">
    <label for="first-name">First Name</label>
    <input type="text" id="first-name" name="firstName" value="{{ formUser.firstName }}">
  </div>

  <div class="group">
    <label for="last-name">Last Name</label>
    <input type="text" id="last-name" name="lastName" value="{{ formUser.lastName }}">
  </div>

  {% if formUser.photo %}
  <div class="group">
    <label>Photo</label>
    <img id="user-photo" src="{{ formUser.photo.url({width: 150}) }}" alt="">
  </div>

  <div class="group">
    <label for="delete-photo">
      <input id="delete-photo" type="checkbox" name="deletePhoto">
      Delete photo
    </label>
    <p class="instruction">If a new photo is selected, this checkbox has no effect.</p>
  </div>
  {% endif %}

  <div class="group">
    <label for="photo">Select photo</label>
    <input id="photo" type="file" name="photo" accept="image/png,image/jpeg">
  </div>

  {% if not craft.app.config.general.useEmailAsUsername %}
    {% set error = formUser.getFirstError('username')  %}
    {% set class = error ? {% set error = formUser.getFirstError('email')  %}
{% set class = error ? 'has-error' : '' %}
<div class="group {{ class }}">
  <label for="email">Email <span class="error-symbol">&#9888;</span></label>

  {% if craft.app.projectConfig.get('users.requireEmailVerification') %}
    <p class="instruction">New email addresses need to be verified.</p>
  {% endif %}

  <p class="error-message">{{ error }}</p>
  <input type="text" id="email" name="email" value="{{ formUser.unverifiedEmail ?? user.email, {
    id: 'email',
    class: user.hasErrors('email') ? 'has-error' : '' %}
  <div class="group {{ class }}">
    <label for="email">Email <span class="error-symbol">&#9888;</span></label>

    {% if craft.app.projectConfig.get('users.requireEmailVerification') %}
      <p class="instruction">New email addresses need to be verified.</p>
    {% endif %}

    <p class="error-message">{{ error }}</p>
    <input type="text" id="email" name="email" value="{{ formUser.unverifiedEmail ?? {% set error = formUser.getFirstError('newPassword')  %}
{% set class = error ? 'has-error' : '' %}
<div class="group {{ class }}">
  <label for="new-password">New Password  <span class="error-symbol">&#9888;</span></label>
  <p class="error-message">{{ error }}</p>
  <input type="password" id="new-password" name="newPassword" value="{{ formUser.newPassword }}">
</div> {% set error = formUser.getFirstError('bio')  %}
{% set class = error ? 'has-error' : '' %}
<div class="group {{ class }}">
  <label for="bio">Bio <span class="error-symbol">&#9888;</span></label>
  <p class="error-message">{{ error }}</p>
  <textarea id="bio" name="fields[bio]">{{ formUser.bio }}</textarea>
</div> 'error',
  }) }}
  {{ _self.errorList(user.getErrors('bio')) }}

  <input type="submit" value="Save Profile">
</form>
```

可能な限りシンプルなプロフィールフォームとフル機能のプロフィールフォームの2つの例を紹介します。

```twig
{{ hiddenInput('userId', formUser.id) }}
```
:::
