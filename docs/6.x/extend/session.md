# Session

The session is deeply integrated with validation, templating, controllers, and authorization. Laravel is responsible for the majority of the session implementation, but Craft adds a few features via `CraftCms\Cms\Http\Mixins\SessionMixin`.

## Auth

You can always get the current `User` element with `Illuminate\Support\Facades\Auth::user()`.
Users are largely unchanged, but the class has been relocated to `CraftCms\Cms\User\Elements\User` and some of its functionality has been split out into concerns (or is handled entirely by Laravel).

## Flashes

You’re bound to need to communicate with the user about the status of a request.
Plugins may interact with the session directly (by flashing data to a session or reading it back out) and indirectly (via authorization, users, or permissions).

The session is available anywhere you are working with a `Request` object (`$request→session()`), and via the global `session()` helper (in PHP and Twig).

Craft always exposes an `errors` key in your templates, containing an instance of `Illuminate\Support\ViewErrorBag`.
For most responses, it will be empty; when a validation error occurs (say, triggered by `$request->validated('title')`, or in a `FormRequest`), Laravel adds those errors to that “bag” by field name:

```php
{% if errors.has('title') %}
  <ul>
    {% for error in errors.get('title') %}
      <li class="error">{{ error }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

The message bag can *technically* hold multiple models’ errors, but Craft doesn’t use this feature.
As a result, there will be a single `default` bag, and calls to `errors.get()`, `has()`, and `any()` are forwarded to it.

General flashes come in three categories: `success`, `notice`, and `error`. These are flashed separately from `errors` (plural), and will only contain a single message each:

```html
{% set flashes = session().only(['success', 'notice', 'error']) %}

{% if flashes is not empty %}
    <ul>
        {% for key, message in flashes %}
            <li class="flash flash--{{ key }}">{{ message }} (<code>{{ key }}</code>)</li>
        {% endfor %}
    </ul>
{% endif %}
```

This example only uses an array to simplify repeated access of the session object.
You can check each flash category separately by calling `session().get('success')`.
Within the control panel, this is all handled for you—including support for rich notification boxes with actions.

We provide the static `CraftCms\Cms\Support\Flash` class to set and get these flash messages in a context-agnostic way.

::: tip
If your controller includes the `CraftCms\Cms\Http\RespondsWithFlash` trait, all of its `as*` methods automatically handle flashing the passed message to the session.
:::

To push more data to the session (like entire models), use the `RespondsWithFlash::asModelSuccess()` and `asModelFailure()` methods, or call `with()` on any redirection response (like `back()->with()` or `redirect()->with()`). When using `with()`, make sure your data is in a serializable state:

```bash
return back()
    ->with('error', t('This is already on your favorites list!'))
    ->with([
        'favorite' => CraftCms\Cms\Support\Arr::toArray($favorite),
    ]);
```

### Other State

The `old()` function is often used in conjunction with `errors` to access values as they were submitted:

```php
{{ input('text', 'name', old('title')) }}

# POST -> <input type-"text" name="title" value="Title that was too long and didn’t validate!">
```

::: danger
Be careful when echoing back user-submitted data.
Twig automatically escapes dynamic values (including those from `old()`), but it’s possible to expose your users to XSS vulnerabilities by using string interpolation or the `raw` filter.
:::
