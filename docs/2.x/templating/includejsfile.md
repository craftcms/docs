# `{% includeJsFile %}`

This tag will queue up a JavaScript file for inclusion on the page.

```twig
{% includeJsFile "/vendor/redactor/redactor.js" %}
```

## Parameters

The `{% includeJsFile %}` tag supports the following parameters:

### JavaScript file

A string that defines the JavaScript file that should be included. The string can be typed directly into the tag, or you can set it to a variable beforehand, and just type the variable name.

### `first`

Add `first` at the end of the tag if you want this JavaScript file to be included before any other JavaScript files that were included using this tag.

```twig
{% includeJsFile myJsFile first %}
```

## Where does it get output?

A `<script>` tag that points to your JavaScript file will be output by the [getFootHtml()](functions.md#getfoothtml) function. If you aren’t calling that function anywhere, Craft will insert it right before the HTML’s `</html>` tag.

