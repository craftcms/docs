# Translation Categories

Modules and plugins can provide custom translation categories, for use with Yii’s [Message Translations](https://www.yiiframework.com/doc/guide/2.0/en/tutorial-i18n#message-translation) feature.

::: tip
See [Static Message Translations](../system/sites.md#static-message-translations) for more details on how message translations work.
:::

## Setup

Translation categories can be pushed onto the <yii2:yii\i18n\I18N::$translations> array.

```php
use craft\i18n\PhpMessageSource;

public function init()
{
    parent::init();

    Craft::$app->i18n->translations['my-category'] = [
        'class' => PhpMessageSource::class,
        'sourceLanguage' => 'en',
        'basePath' => __DIR__ . '/translations',
        'allowOverrides' => true,
    ];
}
```

If you have control over the [application config](../reference/config/app.md) (say, while developing a module or private plugin), you could also add the translation category from there:

```php
// -- config/app.php --
return [
    'components' => [
        'i18n' => [
            'translations' => [
                'my-category' => [
                    'class' => craft\i18n\PhpMessageSource::class,
                    'sourceLanguage' => 'en',
                    'basePath' => dirname(__DIR__) . '/translations',
                    'allowOverrides' => true,
                ],
            ],
        ],
    ],
];
```

Throughout your plugin, pass any string you'd like localized through <craft5:Craft::t()>:

```php{9}
protected function defineRules(): array
{
    $rules = parent::defineRules();
    $rules[] = [
        ['sku'],
        'match',
        'pattern' => '/[A-Z]{4}\-\d{6}/',
        'message' => Craft::t('my-category', '{attribute} “{value}” is not in an acceptable format.'),
    ];

    return $rules;
}
```

## Plugin Translations

Plugins get a custom translation category registered automatically, named after the plugin handle. Plugins can provide translation files within a `translations/` folder in their base source folder.

```treeview
src/
├── Plugin.php
├── ...
└── translations/
    └── de/
        └── plugin-handle.php
```

## Lazy Translation

Craft adds one feature to Yii’s message translation system: lazy translation.

There are a number of scenarios in which you’ll know what needs to be communicated, but not what language it will be read in:

1. The heading or body of an [announcement](announcements.md);
1. [Queue job](queue-jobs.md) descriptions;
1. Text passed to [system messages](../system/mail.md);

Let’s look at a queue job.
Craft spawns a <craft5:craft\queue\jobs\UpdateSearchIndex> job every time an element’s searchable fields are saved… but when triggered from the control panel, the app will be in the current user’s locale, not the element’s language (or its _site’s_ language).
In this case, if the job’s `defaultDescription()` method called `Craft::t('app', 'Updating search indexes')`, control panel users viewing the queue utility would see a message translated into the language used by whoever saved the element, not their language.

Instead, you can use <craft5:craft\i18n\Translation::prep()> to generate an intermediate string that contains everything `Craft::t()` needs to actually localize the message:

```php{3}
protected function defaultDescription(): ?string
{
    return Translation::prep('app', 'Updating search indexes');
}
```

Anywhere you pack a message with `Translation::prep()`, you _must_ use `Craft::t()` to unpack it.
