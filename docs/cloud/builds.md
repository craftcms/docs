# Build Pipeline and Artifacts

As part of every [deployment](deployment.md), Craft Cloud assembles all the code and configuration required to run your PHP application and build front-end assets.

Everything about the build process is dictated by your repository, and [the `craft-cloud.yaml` config file](config.md).

## PHP

Your project’s `composer.json` and `composer.lock` files determine what PHP packages are installed. By default, Cloud expects both files to be at the root of your repository—but your Composer root can be [customized](config.md#config-schema). If either file is missing, the build will fail.

Cloud installs packages by running `composer install`.

## Node.js

Similarly, Cloud looks for `package.json` and `package-lock.json` files at the root of your repository (or at a path set in your [config file](config.md#config-schema)). Unlike the PHP build step, if `package-lock.json` is *missing*, this step is skipped and the deployment will continue.

To enable the Node.js build step, you must set a `node-version` in your [Cloud config file](config.md#config-schema).

### Build Command

Cloud executes the `build` script via `npm run build` after installing the listed packages with `npm clean-install`. You can change which script is run with the `npm-script` setting in `craft-cloud.yaml`—or the directory the command is run in with `node-path`.

Special environment variables are exposed to your Node.js build process:

- `CRAFT_CLOUD_PROJECT_ID`: UUID of the project the build is running in.
- `CRAFT_CLOUD_ENVIRONMENT_ID`: UUID of the build’s target environment.
- `CRAFT_CLOUD_BUILD_ID`: This build’s UUID. You will receive a new build ID for each deployment—even if they have the same `GIT_SHA`.
- `CRAFT_CLOUD_CDN_BASE_URL`: The root URL of your environment’s storage bucket.
- `CRAFT_CLOUD_ARTIFACT_BASE_URL`: See [Artifact URLs](#artifact-uRLs), below.
- `GIT_SHA`: The current commit hash being built.
- `NODE_ENV`: Always `production`, for Cloud builds (even in non-primary environments).

Custom environment variables are currently _not_ injected into the build container.

## Artifacts

At the end of the build step, the contents of the project’s “artifact path” (the web root, by default) are copied to your storage bucket.

::: warning
You can specify a different `artifact-path` in `craft-cloud.yaml`, but when using something other than your web root, files in your web root will no longer be published or accessible. Generally speaking, you should only change the `webroot`, and let Cloud keep the settings synchronized.
:::

### Artifact URLs

If you need to refer to the final, published URL of a build artifact from your build scripts, a file they generate, or from your Craft app, a special `CRAFT_CLOUD_ARTIFACT_BASE_URL` is provided to every environment. From Node.js, you can access this variable via `process.env.CRAFT_CLOUD_ARTIFACT_BASE_URL`—but be aware that it will _not_ be available (or useful) when your scripts are evaluated in a browser.

On Cloud, that URL will always look something like this:

```txt
https://cdn.craft.cloud/{environment-uuid}/builds/{build-uuid}/artifacts
```

Within that `artifacts/` directory, the file structure of your existing artifact path will be preserved. This means that—in most cases—a _relative_ path will work as you’d expect (say, for ES6 modules or CSS `@import` statements).

::: tip
There is no need for filename-based cache-busting, as all artifact URLs will change with every build!
:::

The [Cloud extension](extension.md) also provides the `cloud.artifactUrl()` helper function for generating URLs to files published during your build. If you have historically used the `siteUrl()` or `url()` functions to link a style sheet or JavaScript file (or any other static asset) in your web root, use this function instead.

Outside of Cloud, `cloud.artifactUrl()` falls back to the automatically-determined `@web` alias—and anything in your web root will resolve normally. The special `@artifactBaseUrl` alias mirrors this behavior, and can be used in project config—or [anywhere else that evaluates aliases](/5.x/configure.html#control-panel-settings):

```twig
{# Register a `script` tag to a static asset: #}
{% js '@artifactBaseUrl/dist/js/app.js' %}

{# Equivalent to: #}
{% js cloud.artifactUrl('dist/js/app.js') %}

{# …or a manually-constructed `script` tag with the corresponding `src`! #}
```

If your local development setup serves assets at a _different_ host (like Vite or a webpack dev server running on a different port), you may want to explicitly set the `CRAFT_CLOUD_ARTIFACT_BASE_URL` variable:

```sh
CRAFT_CLOUD_ARTIFACT_BASE_URL="http://my-project.ddev.site:9000/"
```

This will override the default base URL returned by `cloud.artifactUrl()`.

### Hot-linking Build Artifacts

In case you need to link to a build artifact (or any other static file uploaded to the CDN) from _outside_ your site, we provide a stable URL to the current build:

```
https://cdn.craft.cloud/{environment-uuid}/builds/current/artifacts
```

The `current` segment takes the place of a specific build ID, and will always point to the most recent successful build.

### Rewriting Artifact URLs

As an alternative to replacing root-relative asset references in your templates, you can create [rewrite rules](redirects.md) to proxy individual files (or entire directories) from the CDN:

```yml
rewrites:
  - pattern:
      pathname: '/assets/dist/*'
    destination: '{artifactBaseUrl}{request.uri}'
```

You can also serve artifacts from an [additional domain or subdomain](domains.md), as a kind of white-labeled CDN:

```yml
rewrites:
  - pattern:
      hostname: 'static.mydomain.com'
    destination: '{artifactBaseUrl}{request.uri}'
```

A rule like this means that your Craft application is responsible for generating the appropriate URLs; the Cloud extension will continue use the canonical CDN URLs for `@artifactBaseUrl` and `cloud.artifactUrl(...)`. As a result, you are apt to need your own [alias](/5.x/configure.html#aliases) in all of the same situations as you would have used the built-in helpers.

### Reading Files

Reading the contents of a build artifact from the CDN _can_ incur a performance penalty, but when properly cached, the impact will be minimal.

::: tip
Only files that are created _during a build_ must be loaded from the CDN. Anything that is already committed to your `artifact-path` will be available on-disk at runtime.
:::

#### SVGs

Embedding an SVG generated by your build process with Craft’s `svg()` Twig function requests a copy from the CDN each time it is called. Consider pre-processing SVGs in a development environment and committing them to Git to make them available on the function’s disk at runtime.

#### Manifests and Build Hashes

Some front-end build tools write out a “manifest” that maps predictable artifact names (like `my-app.js`) to a build-specific filename that includes an unpredictable hash or digest (like `my-app.656e74f158356.js`) as a means of cache-busting stale assets.

**This is not necessary on Craft Cloud, as each build’s assets are published to a unique URL.**

If you would like to continue to support this workflow, your configuration may require an update to point to the `manifest.json` file on our CDN instead of by path on the local disk. Use `file_get_contents()` to load the contents of a remote file into memory, and the Cloud extension’s `craft\cloud\Helper::artifactUrl('path/to/manifest.json')` to get the build-specific URL.

Users of the [Twigpack](https://plugins.craftcms.com/twigpack?craft5) plugin are protected from performance impacts by its built-in cache. The [Asset Rev](https://plugins.craftcms.com/assetrev?craft5) plugin memoizes manifest files for the duration of a request, but it does _not_ cache them between requests.

::: tip
Craft Cloud’s [static cache](caching.md) can also mitigate latency issues when interacting with remote files.
:::

### Common Toolchains

We have provided special instructions for [Vite](https://nystudio107.com/docs/vite/#craft-cloud) and [Twigpack](https://nystudio107.com/docs/twigpack/#craft-cloud) in their respective documentation.
