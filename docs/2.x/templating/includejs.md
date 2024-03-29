# `{% includeJs %}`

This tag will queue up a JavaScript snippet for inclusion on the page.

```twig
{% set myJs %}
_gaq.push([ "_trackEvent", "Search", "{{ searchTerm|e('js') }}" ]);
{% endset %}

{% includeJs myJs %}
```

## Parameters

The `{% includeJs %}` tag supports the following parameters:

### JavaScript snippet

A string that defines the JavaScript that should be included. The string can be typed directly into the tag, or you can set it to a variable beforehand, and just type the variable name.

### `first`

Add `first` at the end of the tag if you want this JavaScript to be included before any other JavaScript snippets that were included using this tag.

```twig
{% includeJs myJs first %}
```

## Where does it get output?

Your JavaScript snippet will be output by the [getFootHtml()](functions.md#getfoothtml) function. If you aren’t calling that function anywhere, Craft will insert it right before the HTML’s `</body>` tag.

