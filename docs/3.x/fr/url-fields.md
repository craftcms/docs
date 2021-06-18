# URL Fields

URL fields give you a normal text input that can be configured for entering web page URLs, telephone numbers, and email addresses.

While the field doesn’t apply strict validation to what’s entered, it will normalize the saved value so it can be used as an `href` value on the front end.

## Settings

URL fields have the following settings:

- **Allowed URL Types** – The type of URL to be entered, which defaults to “Web page” and displays a dropdown menu if more than one type is selected.
    - **Web Page** - When selected, the entered value is passed to [UrlHelper::isFullUrl()](craft3:craft\helpers\UrlHelper::isFullUrl()) and prepended with `http://` if the result is `false`.
    - **Telephone** - When selected, ensures the value is prepended with `tel:`.
    - **Email** - When selected, ensures the value is prepended with `mailto:`.
- **Max Length** – The maximum number of characters the field can contain. (Defaults to `255`.)

## The Field

URL fields will show a normal text input. If more than one of the allowed URL types is selected, a dropdown menu will be shown before the field for selecting a URL type.

## Development

Calling a URL field in your templates will return the value that was entered in the field, normalized for use in an `<a>` tag’s `href` value.

```twig
{% if entry.myFieldHandle %}
    <h3>Link</h3>
    {{ tag('a', {
        text: 'Learn More',
        href: entry.myFieldHandle
    }) }}
{% endif %}
```
