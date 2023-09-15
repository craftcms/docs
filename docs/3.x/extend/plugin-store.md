# Publishing to the Plugin Store

If you want to make your plugin available in the in-app Plugin Store, and on [plugins.craftcms.com](https://plugins.craftcms.com/), follow this guide.

## Choose a License

All plugins in the Plugin Store must select a software license.

Commercial plugins are recommended to use the [Craft license](https://raw.githubusercontent.com/craftcms/license/master/index.md).

To use the Craft license:

1. Copy the license text into a `LICENSE.md` file at the root of your repository, and replace `[YOUR_NAME_HERE]` with your personal/organization name.
2. Set the `license` value in `composer.json` to `"proprietary"`.

The following open source licenses are also allowed:

- [Apache-2.0](https://raw.githubusercontent.com/licenses/license-templates/master/templates/apache.txt)
- [GPL-2.0](https://raw.githubusercontent.com/licenses/license-templates/master/templates/gpl2.txt)
- [GPL-3.0](https://raw.githubusercontent.com/licenses/license-templates/master/templates/gpl3.txt)
- [MIT](https://raw.githubusercontent.com/licenses/license-templates/master/templates/mit.txt)

The MIT license is generally recommended, unless you have a good reason to use something else.

To use an open source license:

1. Copy the license text into a `LICENSE.txt` file at the root of your repository, prefixed with a copyright notice (e.g. `Copyright (c) Pixel & Tonic, Inc.`).
2. Set the `license` value in `composer.json` to the appropriate [license name](https://getcomposer.org/doc/04-schema.md#license).

## Registering your Plugin

To register your plugin, first make sure it’s published to a public GitHub repository. Then create a Craft Console account at [console.craftcms.com](https://console.craftcms.com), and connect it to your GitHub account.

::: warning
If your plugins are published to a GitHub organization account, make sure that the organization is checked when authenticating your GitHub account.
:::

From your Craft Console account, you’ll need to first go to “Account Settings”, make sure “Enable plugin developer features” is checked under your username, and choose “Save”.

Once plugin developer features are enabled, add your plugin by going to Plugins → “Add a plugin”, and choose the “Select” button next to your plugin’s repository. You will then be able to edit its description, screenshots, and other details.

### Choose a Price

If you wish to sell your plugin, choose a price point that makes sense. Here are some suggested price ranges to consider:

| Price Range | Example Use Cases
| ----------- | ------------------------------------------------------
| $10-$29     | Lightweight “plug and play” utilities and integrations
| $49-$99     | Complex field types and integrations
| $149-$249   | Plugins that add significant new system functionality
| $499-$999   | Major or highly niche applications

You will also be required to pick a Renewal Price, which is the annual fee the Plugin Store will charge customers who wish to continue installing new updates, after the first year. Pick a Renewal Price that is around 20-50% of the initial Price. For example, if you are charging $99 for your plugin, your Renewal Price should be between $19-$49.

Pixel & Tonic takes a 20% processing fee on all plugin sales; be sure to factor that into your plugin pricing.

::: warning
If you initially submit your plugin as free, you will not be allowed to change it to commercial later. You can, however, give it a commercial [edition](plugin-editions.md) that offers extended functionality, as long as you don’t remove crucial functionality from the free edition.
:::

### Declare Craft Version Support

Every plugin needs to explicitly require a minimum Craft CMS version in `composer.json`:

```json
"require": {
    "craftcms/cms": "^3.0.0"
}
```

### Submit for Approval

Once you’re ready to submit the plugin, click the “Submit for approval” button. Once your plugin is approved, it will become visible on [plugins.craftcms.com](https://plugins.craftcms.com/). It won’t necessarily be available in the in-app Plugin Store yet, though, unless your plugin already has at least one [release](#plugin-releases).

::: tip
You might want to register your plugin with [Packagist](https://packagist.org/) in addition to the Plugin Store, so that people can install and update your plugin from the command line. But Packagist isn’t a requirement for the Plugin Store.
:::

## Plugin Releases

To release a new version of your plugin, first decide on the version number. The Plugin Store follows the same [Semantic Versioning](https://semver.org/) conventions supported by Composer:

- Versions should have 3 or 4 segments (e.g. `1.2.3` or `1.2.3.4`).
- Prerelease versions should end with a release identifier (`-alpha.X`, `-beta.X`, or `-RCX`).

Once you’ve decided on a version, follow these steps:

1. If your plugin has a [changelog](changelogs-and-updates.md), make sure the new version has a correctly-formatted heading, including the release date.

   ```markdown
   ## 3.0.0 - 2018-03-31
   ```

2. If your plugin’s `composer.json` file includes a `version` property, make sure that it is set to the new version number.

3. Once everything is good to go and committed to Git, [create a tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) named after the version number, optionally beginning with `v` (e.g. `v3.0.0` or `v3.0.0-beta.1`). Prefixing the tag name with `release-` is also allowed (e.g. `release-3.0.0` or `release-v3.0.0`).

4. Push your latest commits and your new version tag to GitHub. At this point the Plugin Store should automatically get notified about the release, and will start recording it. If all goes well, it will show up in the Plugin Store within a minute or two.

### Automating GitHub Releases

You can automate creating new [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) for your plugin versions by giving your plugin a new GitHub action.

To do that, add a `.github/workflows/create-release.yml` file on the plugin repository’s **default branch**, with the following contents:

```yaml
name: Create Release
run-name: Create release for ${{ github.event.client_payload.version }}

on:
  repository_dispatch:
    types:
      - craftcms/new-release

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: ncipollo/release-action@v1
        with:
          body: ${{ github.event.client_payload.notes }}
          makeLatest: ${{ github.event.client_payload.latest }}
          name: ${{ github.event.client_payload.version }}
          prerelease: ${{ github.event.client_payload.prerelease }}
          tag: ${{ github.event.client_payload.tag }}
```

That’s it! Going forward, whenever the Plugin Store is notified about new version tags, a new release will be created for the tag, with release notes extracted from `CHANGELOG.md`.  

## Changing the GitHub Repository URL

You can change your plugin’s GitHub repository URL at any time. After you’ve done so, you will need to contact [support@craftcms.com](mailto:support@craftcms.com) to notify Pixel & Tonic of the change, so we can update your plugin’s listing with the new URL. Until the listing has been updated, new release tags won’t be picked up automatically by the Plugin Store.

## Changing the Package Name

If you need to change your plugin’s Composer package name (the `name` property in `composer.json`), follow these steps:

1. [Tag a new release](#plugin-releases) with the new package name, for _each_ of the major Craft versions your plugin has ever been compatible with. For example, if your plugin is listed in the [Craft 3 Plugin Store](https://plugins.craftcms.com/?craft3) and the [Craft 4 Plugin Store](https://plugins.craftcms.com/?craft4), you will need to tag new Craft 3 and Craft 4 versions of your plugin with the updated package name.
2. [Submit](https://packagist.org/packages/submit) your plugin as a **new** package on [Packagist](https://packagist.org/).
3. If your plugin was already listed on Packagist with its old package name, mark the old package as abandoned, and list your new package name as the recommended replacement package.
4. Contact [support@craftcms.com](mailto:support@craftcms.com) to notify Pixel & Tonic of the change, so we can update your plugin’s listing with the new package name.

## Transferring Ownership

If you need to transfer ownership of your plugin to another developer, follow these steps:

1. Visit your plugin’s GitHub repository and click on its **Settings** tab.
2. Scroll down to the bottom and press the **Transfer** button within the **Danger Zone** section, and submit the transfer form.
3. The new developer will likely want to [change the package name](#changing-the-package-name) at this point. Once they’ve done so, remember to mark the old package name as abandoned.
4. Have the new developer contact [support@craftcms.com](mailto:support@craftcms.com) to notify Pixel & Tonic of the change, so we can transfer the plugin to their Craft Console account and update its repository URL and package name.
