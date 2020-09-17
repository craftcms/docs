# Config Settings

In addition to the settings in Commerce → Settings, the config items below can be saved in a `craft/config/commerce.php` file using the same format as [Craft’s general config settings](/3.x/config/config-settings.md) in `config/general.php`.

For example, if you wanted to change the [inactive carts duration](#purgeinactivecartsduration) in dev environments but not on staging or production, you could do this:

```php{9}
return [
    // Global settings
    '*' => [
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'purgeInactiveCartsDuration' => 'P1D',
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

Here’s the full list of Commerce config settings:

<!-- BEGIN SETTINGS -->

<!-- END SETTINGS -->
