# Services and Compatibility

Craft Cloud was designed to be compatible with a wide variety of projects—but for security and performance, we did have to make some decisions about what versions of Craft (and the software it depends on) we would officially support. This article covers those limitations, as well as some common features and configurations that may require special attention when moving a project to Cloud.

::: tip
If you maintain a plugin or module, review our [Cloud for Plugin Developers](development.md) guide, as well!
:::

## Craft

Your project must be updated to at least {{ $activeSetVars.minCraftVersion }} to be able to install the [Cloud extension](extension.md), which provides essential functionality like automatic [configuration](config.md) and the [Cloud filesystem](assets.md). Version {{ $activeSetVars.minCloudExtensionVersion }} of the extension is required to deploy your project.

## PHP

PHP {{ $activeSet.minPhpVersion }} and newer are supported on Cloud. Pick a major and minor version via your project’s [`craft-cloud.yaml` config file](config.md).

## Node

Versions 16 and newer of Node are supported in our [builder](builds.md) via the `node-version` key in your [Cloud config file](config.md). We plan to add all [LTS releases](https://nodejs.org/en/about/previous-releases), moving forward.

We recommend declaring only a major version (i.e. `20`) to receive security and stability updates, but minor releases (i.e. `18.6`) are supported.

## Database Engines

See our article on [working with databases](databases.md) for up-to-date information on supported MySQL and Postgres versions. MariaDB is not supported on Craft Cloud, and we no longer recommended it for Craft 5.

## Mailers

Craft Cloud does not have a built-in mail service. You must [configure your own adapter](/5.x/system/mail.html) in Craft, as the default `sendmail` adapter will not work.

## Filesystems

**Local** filesystems will not work on Craft Cloud, and must be [converted](assets.md#converting-a-filesystem) to the Cloud filesystem provided by the extension. Remote filesystems provided by plugins that have not received updates from their maintainers to be compatible with Cloud may not be fully functional.

## Configuration

Some [Craft settings](/5.x/configure.html) behave differently when running on Cloud.

### General Config

The [`resourceBasePath`](/5.x/reference/config/general.html#resourcesbasepath) and [`resourceBaseUrl`](/5.x/reference/config/general.html#resourcebaseurl) have no effect when running on Cloud. Asset bundles and anything that ends up in your [web root](#project-structure) are published to our CDN.

We automatically enable Craft’s [`asyncCsrfInputs`](/5.x/reference/config/general.html#asynccsrfinputs) setting to support [static caching](caching.md).

### Application Config

Changes made via `app.php` may not be honored when deployed to Cloud. Specifically, the [Cloud extension](extension.md) overrides these system components to guarantee they work in a Cloud-compatible way:

- `assetManager`
- `cache`
- `mutex`
- `queue`
- `session`

In addition, we automatically set properties on the `db` component via [environment overrides](/5.x/configure.html#environment-overrides) to ensure Craft can connect to the current environment’s database. You may have connectivity issues if you use a `db.php` file, or add any other `CRAFT_DB_*` variables to an environment.

### Project Structure

If your project has a different directory structure than our official [starter project](kb:using-the-starter-project), you may need to set some additional keys in your [Cloud config file](config.md). This includes the `webroot` and other `*-path` settings.

## Workflow

Cloud was built with teams in mind, so it reflects our recommendations for maintaining a healthy [development and deployment workflow](/5.x/deploy.html). This means that…

- …we require your code to be pushed to a Git provider;
- …direct access to the server/function filesystem is not allowed;
- …[Project Config](/5.x/system/project-config.html) and changes that would alter `composer.json` (like running system updates) are discouraged;

We believe these limitations will not affect most developers, but understand that they may involve some adjustment to processes.

While `devMode` and `allowAdminChanges` are _possible_ to enable in Cloud environments, we strongly advise against it. Making changes to your project’s schema on Cloud can result in your database and Project Config files diverging, as well as data loss.

Whenever possible, we recommend adopting one-way flows for code and content: code changes are made and tested locally, pushed to Git, then deployed; content changes are made in a live environment, backed up, and imported into your local environment.

## Special Considerations

### Headers

Our infrastructure flattens duplicate HTTP response headers into a single, comma-separated one. If you are using the [`{% header … %}` tag](/5.x/reference/twig/tags.html#header) in your templates or manipulating the response object’s `HeaderCollection` directly, you may see *slightly* different output from a Cloud response than you would in other environments. Rest assured, they are functionally equivalent in the HTTP spec!
