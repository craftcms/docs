# Plain Text Fields

Plain Text fields give you either a normal text input or a multi-line textarea, where plain text can be entered.

## Settings

Plain Text fields have the following settings:

* **Placeholder Text** – The field’s placeholder text, to be displayed if the field has no value yet.
* **Max Length** – The maximum number of characters the field can contain.
* **Allow line breaks** – Whether or not to allow line breaks in this field.

## The Field

Plain Text fields will either show a normal text input or a multi-line textarea, depending on whether **Allow line breaks** was checked.

## Development

Calling a Plain Text field in your templates will return the value that was entered in the field.

::: code
```twig
{% if entry.myFieldHandle %}
    <h3>Article</h3>
    {{ entry.myFieldHandle|markdown }}
{% endif %}
```
```php
if ($entry->myFieldHandle) {
    // \yii\helpers\Markdown::process($entry->myFieldHandle);
}
```
:::
