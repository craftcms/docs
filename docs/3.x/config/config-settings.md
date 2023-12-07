---
updatedVersion: 4.x/config/general.md
---
# General Config Settings

Craft supports several configuration settings that give you control over its behavior.

To set a new config setting, open `config/general.php` and define it in one of the environment config arrays, depending on which environment(s) you want the setting to apply to.

For example, if you want to allow Craft to be updated in dev environments but not on staging or production environments, do this:

```php{4,10}
return [
    // Global settings
    '*' => [
        'allowUpdates' => false,
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'allowUpdates' => true,
        // ...
    ],

    // Staging environment settings
    'staging' => [
        // ...
    ],

    // Production environment settings
    'production' => [
        // ...
    ],
];
```

Here’s the full list of config settings that Craft supports:

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/3.x/config-general.md)!!!
