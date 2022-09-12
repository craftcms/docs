## Aliases

Some settings and functions in Craft support [Yii aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases), which are basically placeholders for base file system paths and URLs. These include:

- Sites’ Base URL settings
- Volumes’ Base URL settings
- Local volumes’ File System Path settings
- The <config4:resourceBasePath> and <config4:resourceBaseUrl> config settings
- The [svg()](../dev/functions.md#svg-svg-sanitize) Twig function

The following aliases are available out of the box:

| Alias | Description
| ----- | -----------
| `@app` | The path to `vendor/craftcms/cms/src/`
| `@config` | The path to your `config/` folder
| `@contentMigrations` | The path to your `migrations/` folder
| `@craft` | The path to `vendor/craftcms/cms/src/`
| `@lib` | The path to `vendor/craftcms/cms/lib/`
| `@root` | The root project path (same as the [CRAFT_BASE_PATH](#craft-base-path) PHP constant)
| `@runtime` | The path to your `storage/runtime/` folder
| `@storage` | The path to your `storage/` folder
| `@templates` | The path to your `templates/` folder
| `@translations` | The path to your `translations/` folder
| `@vendor` | The path to your `vendor/` folder
| `@web` | The URL to the folder that contains the `index.php` file that was loaded for the request
| `@webroot` | The path to the folder that contains the `index.php` file that was loaded for the request

You can override these default aliases with the <config4:aliases> config setting if needed. 

::: tip
We recommend overriding the `@web` alias if you plan on using it, to avoid a cache poisoning vulnerability.
:::

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
];
```

If your web root is something besides `web/`, `public/`, `public_html/`, or `html/`, or it’s not located alongside your `craft` executable, you will also need to override the `@webroot` alias, so it can be defined properly for console commands.

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
];
```

You can define additional custom aliases using the <config4:aliases> config setting as well. For example, you may wish to create aliases that define the base URL and base path that your asset volumes will live in.

```php
'aliases' => [
    '@web' => 'https://my-project.tld',
    '@webroot' => dirname(__DIR__) . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

With those in place, you could begin your asset volumes’ Base URL and File System Path settings with them, e.g. `@assetBaseUrl/user-photos` and `@assetBasePath/user-photos`.

If you’d like, you can set the alias values with environment variables, either from your `.env` file or somewhere in your environment’s configuration:

```bash
ASSETS_BASE_URL=https://my-project.tld/assets
ASSETS_BASE_PATH=/path/to/webroot/assets
```

Then you can pull them into the alias definitions using [App::env()](craft4:craft\helpers\App::env()):

```php
'aliases' => [
    '@assetBaseUrl' => craft\helpers\App::env('ASSETS_BASE_URL'),
    '@assetBasePath' => craft\helpers\App::env('ASSETS_BASE_PATH'),
],
```

::: tip
When referencing aliases in your settings, you can append additional segments onto the URL or path. For example, you can set a volume’s base URL to `@assetBaseUrl/user-photos`.
:::

::: tip
You can parse aliases in your templates by passing them to the [alias()](../dev/functions.html#alias-string) function:

```twig
{{ alias('@assetBaseUrl') }}
```
