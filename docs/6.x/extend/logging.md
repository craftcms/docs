# Logging

`Craft::info()` and other log helpers should be replaced with Laravel’s [`Illuminate\Support\Facades\Log` facade](laravel:logging).

## Deprecation Notices

Use `CraftCms\Cms\Support\Facades\Deprecator::log()` to send deprecation notices to the **Deprecation Warnings** utility:

```php
CraftCms\Cms\Support\Facades\Deprecator::log(__METHOD__, 'The track() Twig function is deprecated. Activity plugin APIs have been consolidated into the global `activity` variable: {% do activity.track(...) %}');
```

You can log warnings for newly-deprecated APIs throughout 6.x, or within your compatibility layer.

::: warning
Do not use the adapter’s deprecation API, as it may trigger its *own* warning!
:::
