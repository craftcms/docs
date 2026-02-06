# Announcements

Plugins can notify control panel users about new features and changes by pushing an _announcement_.

<!-- more -->

When you push an announcement, Craft takes care of creating the announcement for each relevant user.

```php
use craft\i18n\Translation;

Craft::$app->getAnnouncements()->push(
    heading: Translation::prep('my-category', 'New Email Controls'),
    body: Translation::prep('my-category', 'Send to slices of your lists by setting up conditions...'),
    pluginHandle: 'my-plugin-handle',
    adminsOnly: false
);
```

::: tip
Note that we’re using <craft5:craft\i18n\Translation::prep()> instead of <craft5:Craft::t()>.
This [defers the translation](translation-categories.md#lazy-translation) until an announcement is shown to the user; then, Craft translates it using their selected language, not the language the app was in when the announcement was pushed.
:::

You can push announcements from a [migration](migrations.md) or in response to changes in configuration.
Be selective about your use of announcements—they should be informative and actionable for as many users as will see them.
Consider using the `adminsOnly` flag for developer-centric changes.
