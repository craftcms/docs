---
description: Learn about configuration options available via Craft’s general.php file.
containsGeneratedContent: yes
related:
  - uri: ../../configure.md
    label: Configuring Craft
---

# General Settings

This group of settings affects a wide variety of Craft’s features and behaviors. If you are uncertain about whether something is configurable or not, refer to the categories in the table of contents.

<!-- more -->

General settings go in `config/craft/general.php`. The config file that ships with [new Craft projects](https://github.com/craftcms/craft/blob/6.x/config/craft/general.php) looks like this:

```php
use CraftCms\Cms\Config\GeneralConfig;

return GeneralConfig::create()
    ->defaultWeekStartDay(1)
    ->omitScriptNameInUrls()
    ->preloadSingles()
    ->preventUserEnumeration()
    ->loginPath(false)
    ->aliases([
        '@webroot' => public_path(),
    ])
;
```

A `general.php` config file is not mandatory; omitting it from your project (or including one but not explicitly configuring a setting) will use Craft’s defaults. The list below describes the default values for each setting.

::: tip
There are a number of [ways to provide configuration](../../configure.md). This file uses the new “[fluent](../../configure.md#style)” syntax, and contains references to [environment variables](../../configure.md#env) for settings that may change between environments.
:::

<!-- This section of the page is dynamically generated! Changes to the file below may be overwritten by automated tools. -->
!!!include(docs/.artifacts/cms/6.x/config-general.md)!!!
