# `{% requireGuest %}` Tags

This tag will ensure that the user is **not** logged in. If they’re already logged in, they’ll be redirected to the page specified by your <config:postLoginRedirect> config setting.

```twig
{% requireGuest %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the guest enforcement will take place.
