# Working Locally

The same strategy for [local development](/5.x/extend/plugin-guide.html#path-repository) continues to work in Craft 6.x, with only one exception.
If the host project doesn’t include the recommended `scripts` for a Laravel app, you may need to run this, after installing your package via Composer:

```bash
ddev composer require myorg/activity-plugin

# New: Ask Laravel to 
ddev artisan package:discover
```

::: tip
The `craft6-revamp` tool adds these hooks to your project’s `composer.json`.

If you don’t see evidence of this (or you upgraded the host project manually), add this:

```json{5-9}
{
    // ...

    "scripts": {
        "post-autoload-dump": [
            "Illuminate\Foundation\ComposerScripts::postAutoloadDump",
            "@php artisan package:discover --ansi",
            "@php artisan craft:setup:publish --ansi"
        ]
    }
}
```
:::

The command for installing your plugin will also be slightly different:

```bash
ddev artisan craft:plugin:install

# ...or either of these legacy options:
ddev php craft plugin:install
ddev php craft plugin/install
```
