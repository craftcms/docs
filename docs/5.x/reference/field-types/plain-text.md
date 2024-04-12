# Plain Text Fields

**Plain Text** fields give you either a normal text `input` or a multi-line `textarea`, where plain text can be entered. How that text is used is entirely up to you!

<!-- more -->

## Settings

Plain Text fields have the following settings:

- **UI Mode** — How the field should be presented in the control panel. (Defaults to “Normal”, can be “Enlarged”.)
- **Placeholder Text** — The field’s placeholder text, to be displayed if the field has no value yet.
- **Field Limit** — The maximum number of characters or bytes the field is allowed to have. (Accepts a number and a unit, which defaults to “Characters” with another option for “Bytes”.)
- **Use a monospaced font** — Whether field input’s text will use a monospaced font.
- **Allow line breaks** — Whether to allow line breaks in this field.
  - **Initial Rows** — For multi-line inputs, choose how many lines of text fit in the field, initially. This setting does _not_ affect how many lines of text can be stored.

## The Field

Plain Text fields will either show a normal text `input` element or a multi-line `textarea`, depending on whether **Allow line breaks** was checked. To give editors more space, increase the number of **Initial Rows**.

## Development

Accessing a Plain Text field in your templates will return the value that was entered in the field. Suppose our field was named “Summary” and had a handle of `summary`:

```twig
{{ entry.summary }}
```

### Testing for a Value

An empty text field is a “falsey” value, so you can use it in a conditional:

```twig
{% if entry.summary %}
  <h3>Summary</h3>
  <p>{{ entry.summary }}</p>
{% endif %}
```

Keep in mind that whitespace characters count the same as any other character—use the `trim` filter to remove spaces and newlines from the beginning and end:

```twig{1}
{% if entry.summary|trim %}
  {# Ok, there really is content in here! #}
  <h3>Summary</h3>
  <p>{{ entry.summary }}</p>
{% endif %}
```

### Processing Text

Craft’s [Twig environment](../../development/twig.md) has a ton of useful text processing features.

#### Markdown

Parse a field’s value as Markdown with the [`markdown` or `md` filter](../twig/filters.md#markdown-or-md):

```twig{3}
{% if entry.summary %}
  <h3>Summary</h3>
  {{ entry.summary|md }}
{% endif %}
```

Note that we’re not manually wrapping the output in `<p></p>` tags! Markdown takes care of this for us, unless you pass the `inlineOnly` argument:

```twig
<h3>{{ entry.stylizedHeader|md(inlineOnly = true) }}</h3>
```

#### Reference Tags

To include dynamic information in a Plain Text field, you can copy [reference tags](../../system/reference-tags.md) from other elements, then use the `parseRefs` filter to render their values:

::: code
``` Field Value
I can’t live without {globalset:snippets:primaryProductName}!
```
```twig Template
{{ entry.testimonial|parseRefs }}
```
```html Output
I can’t live without Butter™!
```
:::
