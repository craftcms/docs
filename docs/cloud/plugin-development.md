# Plugin Development

As long as your plugin’s design and implementation follows our established [best practices](/5.x/extend/index.html), it should work on Craft Cloud without changes. All Craft features are available on Cloud, making the platform’s architectural differences inconsequential when using official, documented APIs.

Plugins must be compatible with at least Craft 4.6 (the minimum version of Craft required to run on Cloud), but they may support earlier versions.

::: tip
Want to test your plugin on Cloud? [Get in touch](craftcom:contact) for a free sandbox environment!
:::

## Special Considerations

There are still a few things about Craft Cloud that may require reevaluation of some assumptions about how web applications are run. The Cloud module and Craft itself provide everything you need to make your plugin reliable and resilient across the widest possible variety of hosting platforms.

### Ephemeral Filesystem

Craft Cloud sets the `CRAFT_EPHEMERAL` config override, which tells Craft to treat file writes as unreliable (or downright impossible). Plugins should honor this setting by checking `craft\helpers\App::isEphemeral()` before trying to perform any writes to the disk.

If you must write files to disk, use the temporary directory determined by the system. **Do not hard-code this path or construct it dynamically.** Instead, use Craft’s [`Path` service](craft5:craft\services\Path) to get information about system directories’ locations:

```php
$path = Craft::$app->getPath();

$tmp = $path->getTempPath();
$storage = $path->getStoragePath();
$cache = $path->getCachePath();

// ...
```

#### Logs

Avoid writing logs directly to a file, as its contents will disappear as soon as the request ends. Always use the `Logger` component (`Craft::$app->getLogger()`) or the static `Craft::info()`, `Craft::warning()`, and `Craft::error()` convenience methods to ensure logs are sent to Cloud’s custom log target.

### File Responses

The Cloud extension automatically handles binary responses (like when a controller action ends with [`sendContentAsFile()`](craft5:craft\web\Response::sendContentAsFile())) by uploading the data to S3 and redirecting to a pre-signed URL.

In general, we recommend _not_ sending binary responses that could otherwise be served as a static asset via [asset bundles](#asset-bundles)—the only situations in which Craft should be involved is when the data is based on some user input, like a dynamically-generated ZIP or PDF. Additionally, pre-signed URLs are unnecessary (and extremely inefficient) for files whose contents are static, predictable, or non-private.

If you do need to customize the delivery of binary data, Cloud’s web runtime is implicitly authorized to interact with its environment’s storage bucket—see the Cloud module for [an example of how we get a URL](https://github.com/craftcms/cloud-extension-yii2/blob/2.x/src/web/ResponseEventHandler.php) to an uploaded object.

### Asset Filesystems

While we recommend that projects on Cloud use our first-party [Cloud filesystem](assets.md), it is not a requirement. Plugins that provide filesystem types may need to implement a custom uploader to send binary files directly to the storage provider (rather than POST them to the Craft application itself).

The Cloud filesystem’s [client-side](https://github.com/craftcms/cloud-extension-yii2/blob/2.x/src/web/assets/uploader/UploaderAsset.php) and [server-side](https://github.com/craftcms/cloud-extension-yii2/blob/2.x/src/controllers/AssetsController.php) code is available for reference.

### Other File Uploads

In situations where you need a file from a user (like a plugin that works with CSVs), consider providing an asset selection input, instead:

```twig
{% import forms from '_includes/forms' %}

{{ forms.elementSelect({
  name: 'file',
  elementType: 'craft\\elements\\Asset',
  limit: 1,
}) }}
```

Doing so will take advantage of the existing volumes and filesystems, while still providing access to the underlying file’s content via `craft\elements\Asset::getStream()`.

### Asset Bundles

Craft Cloud pre-publishes all known asset bundles to our CDN at [build-time](builds.md) to conserve compute resources.

Any static assets your plugin provides to the control panel or front-end must be encapsulated in an [Asset Bundle](/5.x/extend/asset-bundles.html), and its `sourcePath` must begin with your plugin’s predefined alias. To register an asset bundle, call `Craft::$app->getView()->registerAssetBundle($myBundle)` from a controller or template. Publishing one-off or ad-hoc assets at runtime is **not** supported on Cloud.

Asset bundles have some additional requirements:

- Bundle classes must be instantiable _even if Craft is not installed_, or cannot connect to a database. Plugin settings and other system state may be unavailable to the build environment when we are publishing assets.
- Your plugin’s main `composer.json` should always have a `type` of `craft-plugin`, and any downstream packages containing asset bundles (i.e. utilities shared by multiple plugins) must have a `type` beginning with `craft` or `yii` to be picked up by our publishing routine.

### Sessions + CSRF

To help support Cloud’s [static caching](caching.md) system, avoid interacting with the session unnecessarily, during _site_ requests.

Always use the [`csrfInput()` Twig function](/5.x/reference/twig/functions.html#csrfinput) when rendering front-end forms to maintain compatibility with Craft’s [`asyncCsrfInputs` config setting](/5.x/reference/config/general.html#asynccsrfinputs) (4.9.0+). _Building an input manually (or using `craft\web\Request::getCsrfToken()` directly) can leak one user’s CSRF tokens to another!_

## Other Best Practices

Plugins that already embrace our existing [coding guidelines and best practices](/5.x/extend/coding-guidelines.html) should be Cloud-ready—or take significantly less time to make compatible.

In addition, these tips can help avoid hiccups when your plugins are deployed to Craft Cloud:

- Implement batched jobs if your workload is [apt to exceed 15 minutes](quotas.md). It is often better to spawn many small jobs than a single long-running one.
- Don’t set cookies unless absolutely necessary—like in response to a user action.
  - If possible, register JavaScript to fetch CSRF tokens *asynchronously*. Using `{{ csrfInput() }}` in a template outside the control panel will immediately set a cookie and prevent [static caching](caching.md).

## Publishing Your Plugin

Cloud-compatible plugins go through the same [submission and approval process](https://craftcms.com/docs/5.x/extend/plugin-store.html) as regular plugins. Once you’ve verified your plugin works on Cloud, be sure and check the **Tested on Craft Cloud** in its management screen on [Craft Console](https://console.craftcms.com/)!

## Getting Help

Please [reach out to us](craftcom:contact) if you have questions about your plugin’s compatibility.
