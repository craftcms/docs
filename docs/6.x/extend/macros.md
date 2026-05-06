# Behaviors

There is no direct equivalent to Yii’s [behavior](guide:behaviors) system, but classes that use `Illuminate\Support\Traits\Macroable` can be extended at runtime using [macros](laravel:macros).
Anything that extends our base component class (`CraftCms\Cms\Component\Component`) is “macroable.”
Define macros from your plugin’s `bootPlugin()` method:

```php
use CraftCms\Cms\Site\Data\Site;

public function bootPlugin()
{
    Site::macro('isB2b', function() {
        return str_contains($this->handle, 'biz');
    });
}
```

Then, wherever you’re using a site…

```twig
{{ currentSite.isB2b() ? 'Welcome, Mr. Business!' : 'Hey, bud!' }}
```

Laravel does not have an instance-level event system, but you can colocate multiple event handlers in a [subscriber](laravel:events#event-subscribers).
