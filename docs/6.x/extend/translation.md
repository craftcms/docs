# Translation

One of the few remaining Yii components is its [static translation engine](https://github.com/yiisoft/translator)—we weren’t ready to leave behind its powerful parameterization and formatting API.

## Language Files

The structure of message files remains exactly the same, but your entire `translations/` directory must be renamed `lang/` to be discoverable by the new base plugin class.

## Helpers

`Craft::t()` has been replaced with a global helper function, and its signature has changed:

```php
use function CraftCms\Cms\t;

// t($message, $params, $category)
t('Successfully logged the {name} event.', ['name' => $event->name], 'activity');
```

When you only need a message and category, use a named argument:

```php
t('Failed to log the event.', category: 'activity');
```

The Twig filter’s signature has _not_ changed:

```twig
{{ 'Summary of {num,plural,=1{one event} other{# events}}'|t('activity', { num: report.totalEvents }) }}
```

## Lazy Translation

In situations where the static message is known, but the language it will be displayed in is _not_, use a “prepared” string:

```php
use CraftCms\Cms\Support\Facades\I18N;

$description = I18N::prep('Crunching numbers for {author}…', ['owner' => $template->getAuthor()], 'activity');
GenerateReport::dispatch($template, $description);
```

In this example, `$description` is just a special encoded string with the source message, parameters, and category; when it comes time to display the job description in the control panel, Craft resolves it in the current user’s language.
