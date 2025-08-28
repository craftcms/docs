# Getting Started

Welcome to [Craft Cloud](/cloud), our new hosting platform tailor-made for Craft CMS!

This article covers the critical path to deploying your first project to Cloud. For [new projects](#new-sites), we still recommend starting with a local development environment; most [existing projects](#existing-sites) can be moved to Cloud after a quick system update.

The process looks something like this:

1. ✏️ Spin up a Craft project locally
2. 🌩️ Push your code to a repository and connect it to a new Cloud project in Craft Console
3. 🚀 Kick off your first deploy

Let’s get started!

## Requirements

In addition to a basic familiarity with Craft CMS, this guide will require…

- …a [Craft Console](https://console.craftcms.com) account with a payment method on file;
- …a [GitHub](https://github.com), [BitBucket](https://bitbucket.org), or [Gitlab](https://gitlab.com) account;
- …access to your domain’s DNS records (when you’re ready to go live);

You will be able to follow along using the seven-day free trial included with every Cloud project.

## Preparing your Codebase

Any Craft CMS site running version {globalset:productVitals:vitalsCloudMinCraftVersion} or later can be configured to run on Cloud. Plugins and custom modules must be compatible with at least PHP {globalset:productVitals:custom_cloudMinPhpVersion}, and the project must `require` version {globalset:productVitals:vitalsCloudMinExtensionVersion} of the [Cloud extension](extension.md).

### New Sites

Cloud projects begin the same way as any other. Follow the standard [installation instructions](/5.x/install.html) to get a new site running locally, then run this command to get it Cloud-ready:

```bash
ddev craft setup/cloud
```

Craft will install the [`craftcms/cloud` extension](extension.md), which handles all the necessary configuration, automatically. Your project will continue to work normally, in local development.

Commit and push the project files to a fresh Git repository.

### Existing Sites

Update your project to at least Craft {globalset:productVitals:vitalsCloudMinCraftVersion}, then run the command above. Most projects will run on Cloud without modification—but we recommend reviewing the [compatibility guide](compatibility.md) if you’ve made any customizations via [application config](/5.x/reference/config/app.html), custom modules, or private plugins. We also have a dedicated guide on [moving projects to Craft Cloud](projects.md) from other hosts.

::: tip
Does your project use the `tablePrefix` setting or `CRAFT_DB_TABLE_PREFIX` config variable? Run `ddev craft db/drop-table-prefix` before continuing.
:::

Commit and push the changes to your Git provider. You’re ready!

## Gathering Materials

With your project running locally, it’s the perfect time to collect a few things we’ll need later:

1. Capture a [database backup](databases.md) and take note of the driver (Postgres or MySQL) and version;
1. Download a copy of all your assets (if feasible);
1. Document all your project-specific environment variables;

## Your First Cloud Project

If you haven’t already, create a [Craft Console](kb:what-is-craft-console) account and add a [payment method](kb:craft-console-organizations#managing-payment-information).

::: tip
Cloud projects can be created from your personal Console account, or within an [organization](kb:craft-console-organizations), but we strongly recommend using organizations whenever possible—especially for businesses and agencies that can benefit from delegated access.
:::

From the **Cloud** tab, click **New Project**. Select from the available git providers (or connect a new one), then choose the repository your Craft project was pushed to, in the previous step. Don’t see your repo? Try [one of these troubleshooting tips](troubleshooting.md#repo-not-visible).

### Project Settings

When creating a project, you will be asked for a **Project Name** and **Handle**, what [**Region**](regions.md) it should be hosted in, and the [**Database Engine**](databases.md) you’d like to use. The database engine should match whatever you are using locally—if you just started a new project with DDEV, that would be MySQL 8.

### Billing + Terms

You can pay for Cloud projects monthly or annually. Discounts are provided on annual plans, and to verified [Partners](/become-a-partner). Learn more about how [billing](billing.md) works.

All Cloud plans come with a free seven-day trial!

## Deployment

With your Cloud project connected to a Git repository, it’s time to set up an **Environment**. [Environments](environments.md) allow you to configure and deploy multiple versions of your project, independently—like a live site and a staging site.

### Create an Environment

Each environment is associated with a Git branch, and gets its own database, asset storage, environment variables, logs, [preview domain](domains.md#preview-domains), and deployment strategy.

From your project’s dashboard, click **Environments**, then **New environment**. Give it a **Name**, and select your desired **Deploy Trigger** and **Branch**. Below the settings pane, you’ll have an opportunity to pre-populate the environment with project-specific variables that you would normally store in a `.env` file. You do _not_ need to copy database connection details, URLs, or variables you would only set in a development environment—most configuration will be handled for you, automatically!

Click **Save**, and Cloud will create the environment’s resources.

::: tip
If you selected “On Push” for your **Deployment Trigger**, Cloud will deploy this environment the next time you push a commit to the selected branch. Both “On Push” and “Manual” triggers allow you to visit the Deployments tab of the environment and click **Deploy** to build and deploy from the latest code.
:::

### Importing a Database

See our article on [working with Cloud databases](databases.md) to learn about the process of making and importing a database backup. The process will differ slightly for Postgres and MySQL users.

### Importing Assets

::: tip
If you just started a new project, you can skip this section, and review our [Assets on Craft Cloud](assets.md) article when you’re ready to set up your first asset volume.
:::

Existing projects that use a **Local** asset filesystem will require an update to work on Cloud. See our article about [migrating to Cloud asset storage](assets.md#synchronizing-assets) for more information. While we do not impose limitations on the third-party services your app communicates with, their plugins may require updates to be fully compatible with Cloud.

### Triggering a Deploy

In your environment’s **Deployments** screen, click the **Deploy** button in the upper-right corner.

Cloud will begin a new [build](builds.md), and your changes will be available at your [preview domain](domains.md#preview-domains) in a minute or two!

## Preview Domains

Every environment gets a [preview domain](domains.md#preview-domains) so you can make sure everything is working as expected *before* pointing your real domain at it.

::: tip
Not seeing your changes? Deployment status is reflected on the **Deployments** overview page, and more information is available when clicking the commit message of a single deploy.
:::

### Custom Domains

When you’re ready to cut over, check out our guide on [using custom domains](domains.md). Your first custom domain (and any number subdomains thereof) are free with a Cloud project.
