# Troubleshooting Common Problems

### Why is my repository not showing up when starting a new project?

When creating a project, we show you repositories you have access to through Git providers connected to your *personal* Craft Console account. If the repository is owned by someone else (even if they're a member of the same Craft Console organization), it may not be discoverable. Here are a few things to check:

- Was the repository forked from another repository? We can only deploy from “upstream” repositories (those that are _not_ forks).
- Did you create or push code after reaching this screen? You may need to refresh the page, or wait a few minutes for the repository to be available in the API.
- Are you viewing the correct organization or context? Use the menu to the left of the search bar to switch providers and contexts.

If none of the above work, you may need to reconnect the platform to Craft Console and grant additional permissions:

1. Switch to your personal account with the menu in the upper-right corner;
2. Go to **Settings** (the gear icon in the upper-right corner), then **Integrations**;
3. Click **Disconnect** on the row with your Git provider;
4. Log in to your Git provider, and remove the app or integration:
  - On GitHub, Craft Cloud is registered as an “OAuth App,” and can be managed in your account’s **Settings** &rarr; **Applications** &rarr; **Authorized OAuth Apps** screen. Click the three dots in the **Craft Cloud** row, then select **Revoke**.
  - Instructions for other providers will be added as we roll out support!

Return to the **Integrations** screen in your personal Craft Console account, then click **Connect**. Carefully review the permissions, and ensure that the organization your repository lives in is properly authorized. On GitHub, this means that it will either either have a green check mark <span style="color: green;">&check;</span> next to it, or that you've clicked **Grant** in that row. If the organization only displays a **Request** button, you may need to contact one of the administrators for access.

### Why did my build/deployment fail?

Build failures always display an error in that [deployment](deployment.md)’s details page. If you believe you've encountered a temporary failure, you can try redeploying the latest commit by clicking **Deploy**—even if the environment is set to deploy **On Push**.

The most common problems are:

- **Issues cloning the repository.** Was it made private, renamed, or otherwise disconnected?
- **No PHP version was declared.** Make sure you have a `php-version` key in your [`craft-cloud.yaml` config file](config.md).
- **Unsupported software or package versions.**
  - Your Cloud config file must include a `php-version`, set to a public release of PHP, version {globalset:productVitals:custom_cloudMinPhpVersion} or later. Patch versions are not supported.
  - If you are using Node, `node-version` must be set to {globalset:productVitals:custom_cloudMinNodeVersion} or higher. Only major version numbers are supported.
  - Craft CMS version {globalset:productVitals:vitalsCloudMinCraftVersion} or later is required.
  - `craftcms/cloud` version {globalset:productVitals:vitalsCloudMinExtensionVersion} or later is required.
- **Errors when installing Composer packages.** Do you have a valid `composer.json` and `composer.lock` file in the connected repository? (It's technically possible—but exceedingly rare—for there to be connectivity issues when downloading packages. Check your logs, try again, or reach out to support if you continue to have problems at this stage in the build.)
- **Failures in the Node/NPM build script.** Something went wrong when installing your Node modules or while running the `build` script. Read more about the [build process](builds.md) and how we determine [what build script is run](config.md).

Cloud will report specific errors that fall into one of these categories. Some errors may require that you investigate the build logs, which are also available in the deployment screen; the step that failed will display a red <span style="color: red;">X</span>.

If you continue to have issues with a specific project, environment, or commit, [get in touch](https://craftcms.com/contact)!
