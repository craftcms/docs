# `{% exit %}`

This tag will prevent the rest of the template from executing, and end the request.

```twig
{% set entry = craft.entries.id(entryId).first() %}

{% if not entry %}
  {% exit 404 %}
{% endif %}
```

## Parameters

The `{% exit %}` tag supports the following parameter:

### Status

If you choose to set the HTTP status code that should be included with the response, Craft will look for the appropriate error template to render. For example, `{% exit 404 %}` will get Craft to return the `404.twig` template. If the template doesn’t exist, Craft will fall back on its own template corresponding to the status code.

::: tip
`{% exit %}` throws an [HttpException](yii2:yii\web\HttpException) with the appropriate status code, so with <config3:devMode> enabled a full error report and stack trace will be shown instead of an error template.
:::
