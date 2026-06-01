# Assets and Publishables

You are free to handle static assets in whatever way fits your needs, but there are a few built-in tools that simplify developing and distributing extensions.

<!-- more -->

## Asset Pipelines

Plugins can register scripts and styles for every control panel request by declaring a map of paths as `$scripts` and `$styles`.
These assets (the keys) become *publishable*, and will be copied into `public/vendor/myorg/plugin-name/...` (the value) when your plugin is installed.
Craft also takes care of deleting them from that directory when your plugin is uninstalled.

```php
class Activity extends Plugin
{
    // ...

    public array $scripts = [
           __DIR__.'/../resources/css/sparkline.css' => 'css/sparkline.css',
    ];

    public array $styles = 
            __DIR__.'/../resources/js/sparkline.js' => 'js/sparkline.js',
    ];

    // ...
}
```

::: tip
The paths you declare in your plugin’s `$scripts` and `$styles` properties should be the final, “built” assets, not their source files.
Whenever you make changes to the files in `resources/`, you will need to re-publish them:

```bash
ddev artisan vendor:publish --tag=your-plugin-handle
```
:::

Any additional publishable files can be declared in the same way as scripts or styles, using the `$publishables` property.
See `CraftCms\Cms\Plugin\Concerns\PublishesFiles` for more information about how this is handled.

### Vite

If you don’t have a preexisting bundler, consider using Laravel’s built-in [Vite pipeline](laravel:vite).
Add a `$vite` property to your plugin with any number of entry points (or `inputs`) to register them as publishable files *and* hook into Laravel’s automatic `hot` file discovery:

```php
class MyPlugin extends \CraftCms\Cms\Plugin\Plugin
{
    protected array $vite = [
        'input' => [
            'resources/js/plugin.js',
            'resources/css/plugin.css',
        ],
        'publicDirectory' => 'resources/dist',
        'buildDirectory' => 'build',
    ];
}
```

Despite the name, `publicDirectory` is not a path within Laravel’s `public/` directory!
It just defines the root folder the Vite dev server exposes, and is relative to your package’s root directory.
`buildDirectory` is appended to the `publicDirectory` to register and serve built assets when Vite is *not* running—Craft registers the equivalent `style` and `script` tags, based on the manifest output by Vite during a production build.

Your minimum configuration in `vite.config.js` should look something like this, matching the input and output paths in the plugin:

```jsx
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/plugin.js',
                'resources/css/plugin.css'
            ],
            publicDirectory: 'resources/dist',
        }),
    ],
});
```

This scaffolding is present in our 6.x-ready [demo plugin](repo:craftcms/demo-plugin).
Additional config may be required for compatibility with your development environment; DDEV, for example, benefits from special CORS rules and customization of the dev server:

```jsx
// ...

const host = '0.0.0.0';
const port = 3000;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
    server: {
        host,
        origin,
        port,
        cors: {
            // Live dangerously...
            origin: true,
            // ...or permit only DDEV origins.
            // See: https://dev.to/mandrasch/vite-is-suddenly-not-working-anymore-due-to-cors-error-ddev-3673
            // origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
        },
    },

    // ...
});
```

If you want to work on multiple plugins at once, each will need a unique `port` and `hotFile`.
The Vite server config block (JS) needs both values; your plugin (PHP) only needs the `hotFile`.

See `CraftCms\Cms\Plugin\Concerns\HasFrontendAssets` for more information about the `$vite` configuration.


## Asset Bundles

Craft includes a lightweight implementation of Yii’s asset bundle system, to help with the transition.
This is an *alternative* to legacy asset registration, and still requires some changes to work.

::: tip
If you had previously maintained an asset bundle to register a single resource (with no dependencies) in the control panel, consider using your plugin’s `$scripts` or `$styles` property.
:::

Your asset bundle(s) must adopt a new interface and define a `register()` method:

```php
namespace MyOrg\MyPlugin\Assets;

use MyOrg\MyPlugin\Plugin;
use CraftCms\Cms\View\HtmlStack;
use CraftCms\Cms\View\LegacyAssets\LegacyAssetInterface;

class ActivityGraph implements LegacyAssetInterface
{
    // Optional:
    public array $depends = [
        \CraftCms\Cms\View\LegacyAssets\D3Asset::class,
    ];

    // Assets defined  `$css` and `$js` should be directly registered against the passed HtmlStack:
    public function register(HtmlStack $htmlStack): void
    {
        $plugin = Plugin::getInstance();
        $publicPath = public_path("vendor/{$plugin->packageName}");

        $htmlStack->jsFile($publicPath.'/build/js/activity.js'));
        $htmlStack->cssFile($publicPath.'/build/css/activity.css'));
    }
}
```

Then, whenever you’re preparing a response that will use the asset (typically in a controller), let the registry know:

```php
use MyOrg\MyPlugin\Assets\ActivityGraph;
use CraftCms\Cms\View\LegacyAssets\InternalAssetRegistry;

app(InternalAssetRegistry::class)->register(ActivityGraph::class);
```

When the app is ready to inject your asset into a response, the _asset’s_ `register()` method is called.

::: warning
Note that the `InternalAssetRegistry` class (and all our own asset bundles) have been deprecated, proactively.
This is a stopgap solution that allowed us to fully eject the adapter for new projects, while gradually rebuilding the control on [Inertia](https://inertiajs.com).
:::

## HTML Fragments

You can use this same system to register any kind of HTML fragment—not just scripts and stylesheets:

```php
use CraftCms\Cms\Support\Facades\HtmlStack;
use CraftCms\Cms\View\Enums\Position;

$link = CraftCms\Cms\Support\Html::tag('link', null, [
    'rel' => 'preconnect',
    'href' => $fs->rootUrl,
]);

HtmlStack::html($link, Position::Head, sprintf('fs-link:%s', $fs->handle));
```

The `View::POS_*` class constants have been replaced with the `Position` enum, used above.
