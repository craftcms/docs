# Craft Extension

To run a project on Craft Cloud, it must require our first-party `craftcms/cloud` package.

In technical terms, the Cloud extension is a self-bootstrapping Yii module. Practically, it provides…

- …a special [filesystem type](assets.md) that interfaces seamlessly with Cloud’s storage solution;
- …automatic and reliable configuration of your project’s database connection, cache, queue, and other application components;
- …[Twig helpers](/docs/5.x/reference/twig/functions.html) for generating [special URLs](#resource-uRLs);

For most projects—and in local development—the extension will be largely undetectable. It only initializes functionality in environments that suggest (through the presence of special variables) it is necessary.

::: tip
Note that Cloud applies additional configuration directly to Craft via special, non-optional [environment overrides](/docs/5.x/configure.html#environment-overrides).
:::

## Installation

You can install the extension with one command, in any project running Craft CMS 4.5.10 or later (but only projects on {globalset:productVitals:vitalsCloudMinCraftVersion} or later can be deployed to Cloud):

```bash
php craft setup/cloud
```

If you would prefer to use Composer directly, require the `craftcms/cloud` package. After installation, perform one-time setup by running `php craft cloud/setup`.

You will be prompted for some information about your project, and the wizard will write a [Craft Cloud configuration file](config.md) to the project’s root.

## Special Features

### Cloud Filesystem

We recommend that new projects use the [Craft Cloud filesystem type](assets.md) for all [asset volumes](/docs/5.x/reference/element-types/assets.html). Other remote filesystem types may be compatible with Cloud, but will *not* support automatic fallback to your local disk, in development environments.

### Application Components

The extension replaces configuration for Craft’s cache, database, mutex, queue, and session [application components](/docs/5.x/reference/config/app.html) to ensure that they are configured in a way that is compatible with Cloud infrastructure.

### Resource URLs

By default, Craft publishes asset bundles to the public web root and generates URLs according to [`resourceBasePath`](/docs/5.x/reference/config/general.html#resourcebasepath) and [`resourceBaseUrl`](/docs/5.x/reference/config/general.html#resourcebaseurl). _These settings have no effect, when running on Cloud._

To conserve resources, Cloud’s compute layer doesn’t serve *any* static asset requests. Instead, these files are pre-generated and pushed to our CDN when your project is deployed.

#### Build Artifacts

Other static assets in your web root will also be uploaded to our CDN at build time. See our article on [build artifacts](builds.md#artifact-urls) for more information about generating URLs for these files.

### Additional Configuration

The Cloud extension includes some [additional settings](https://github.com/craftcms/cloud-extension-yii2), but they are intended only for debugging and advanced use cases, like emulating Craft Cloud infrastructure, locally. *Configuration that is necessary for your site to run on Cloud will be applied automatically.*

## Further Reading

Additional technical details and the extension’s source are available in the [readme on GitHub](https://github.com/craftcms/cloud-extension-yii2).

If you encounter a bug or compatibility issues with another plugin (public or private), please [file an issue](https://github.com/craftcms/cloud-extension-yii2/issues/new/choose) or [contact support](/contact?whatCanWeHelpYouWith=Support)!
