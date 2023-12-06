---
containsGeneratedContent: yes
---

# General Settings

This group of settings affects a wide variety of Craft’s features and behaviors. If you are uncertain about whether something is configurable or not, refer to the categories in the table of contents.

General settings go in `config/general.php`. The config file that ships with [new Craft projects](https://github.com/craftcms/craft/blob/master/config/general.php) looks like this:

```php
use craft\config\GeneralConfig;
use craft\helpers\App;

return GeneralConfig::create()
    ->defaultWeekStartDay(1)
    ->omitScriptNameInUrls()
    ->devMode(App::env('DEV_MODE') ?? false)
    ->allowAdminChanges(App::env('ALLOW_ADMIN_CHANGES') ?? false)
    ->disallowRobots(App::env('DISALLOW_ROBOTS') ?? false)
```

::: tip
There are a number of [ways to provide configuration](./README.md). This file uses the new “[fluent](./README.md#style-map-vs-fluent)” syntax, and contains references to [environment variables](./README.md#env) for settings that may change between environments.
:::

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/4.x/cms/config-general.md)!!!
