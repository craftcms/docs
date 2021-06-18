# Email Fields

Email fields give you a normal text input that requires a valid email address.

## Settings

Email fields have the following settings:

* **Placeholder Text** – The field’s placeholder text, to be displayed if the field has no value yet.

## Development

Calling an Email field in your templates will return the value that was entered in the field.

```twig
{% if user.email %}
    <h3>Email</h3>
    <a href="mailto:{{ user.email }}">{{ user.email }}</a>
{% endif %}
```
