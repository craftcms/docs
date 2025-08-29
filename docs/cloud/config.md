# Configuration

Craft Cloud looks for a `craft-cloud.yaml` file in the root of the connected repository.

This file has a specific syntax (YAML) and [schema](#config-schema) that determines a few things about how your project is [built](builds.md), [deployed](deployment.md), and served. If there are problems with your config file, the deployment will fail with an error describing the issue.

::: tip
When you run `php craft setup/cloud` to install the [Cloud extension](extension.md), it will offer to generate a config file for you, then walk you through setting PHP and Node.js versions based on your project’s state.
:::

## Config Schema

Your `craft-cloud.yaml` must contain at least a `php-version` key:

```yaml
# Versions must include major + minor, but no patch.
php-version: '8.2'
```

`composer.json`’s [`config.platform`](https://getcomposer.org/doc/06-config.md#platform) is only used to determine the default value that the CLI setup wizard presents.

### Advanced Options

These settings are optional, and should only be used when your project is incompatible with the platform defaults.

```yaml
# Choose a major version of Node.js to use in your build step.
node-version: '18'

# Directory NPM commands will be run in.
node-path: buildchain

# Key/name of the `script` in package.json run at build time.
npm-script: build

# The directory uploaded to our CDN at the end of the build step.
artifact-path: cms/web

# The directory where your PHP application lives.
app-path: cms

# Public directory, containing `index.php`.
webroot: web
```

Expanding on the above:

- `node-version` — When declared, Cloud will use this Node.js version in your build step. (Default: None. If you wish to run a Node.js build step, you must specify a version!)
- `node-path` — This directory must contain `package.json` and `package-lock.json`. Your NPM script will be run here. (Default: `''`)
- `npm-script` — A single script name. Arbitrary Bash (including other `npx` commands) is not allowed. (Default: `build`)
- `artifact-path` — Anything emitted from your build step must be in this directory, or it will not be uploaded to the CDN or available to your running app, in any way. (Default: Inherits the value of `webroot`)
- `app-path` — `composer.json` and `composer.lock` must be located here. Cloud will run `composer install` in this directory. (Default: `''`)
- `webroot` — If your project uses a different directory for the public web root, you should specify it here. This is relative to `app-path`. (Default: `web`)

::: tip
For the latest information on supported PHP and Node.js versions, see our [Cloud Services and Compatibility](compatibility.md) article.
:::

### Redirects and Rewrites

In addition to the above runtime and build settings, you can configure any number of [redirection and rewrite rules](redirects.md). These rules are evaluated _before_ the request reaches your Craft application, and can be used to normalize URLs, proxy assets or artifacts, redirect secondary domains, or map legacy URLs to your new site.

### Directory Structure

Multiple settings influence how Cloud locates key files in your project. The defaults agree with our official [starter project](https://github.com/craftcms/craft).

If you have moved your `composer.json` or `package.json` into subdirectories, you will need to specify an `app-path` or `node-path`, respectively. Similarly, [changing your web root](kb:moving-craft-files) will require setting a `webroot` value, unless it remains below `app-path`, in a directory named `web`.

## Changing Settings

You can update `craft-cloud.yaml` any time. The settings will be validated and used during the next deployment. If you want to test a setting, commit the changes to a branch, and deploy it to another environment!

::: tip
If you encounter an error at build time, check out our [Troubleshooting](troubleshooting.md) guide.
:::

## Headless and Decoupled Front-Ends

If your front-end runs elsewhere (and Craft is deployed solely as a back-end or API), you may not need to run any build process on Cloud. Instead of blocking your deploys running the default `build` script, consider adding a `noop` script to your `package.json`…

```json
{
  // ...
  "scripts": {
    "build": "webpack --production",
    "noop": "exit 0"
  }
}
```

…and updating `craft-cloud.yaml`, appropriately:

```yaml
# ...
npm-script: 'noop'
```
