# Moving a Project to Cloud

::: tip
Be sure and review our [Getting Started with Craft Cloud](started.md) guide!
:::

This guide collects information from multiple other articles about making an existing project compatible with Craft Cloud.

Most projects will *not* need any special treatment, and will work with minimal configuration—just like a new project. Heavily-customized projects (including those with a non-standard [directory structure](/5.x/system/directory-structure.html)) may require additional auditing or configuration.

Projects based on our official Composer [starter project](kb:using-the-starter-project) tend to enjoy a minimally disruptive migration process, but it’s still a good idea to fully review this document and the resources it links to.

## Code + Configuration

The first thing we’ll tackle is updates to your code and configuration.

### Key Requirements

Your Craft project must already be running Craft {{ $activeSetVars.minCraftVersion }} or later to be compatible with Cloud. In addition, you will need to install the first-party [Cloud extension](extension.md).

### Cloud Config

Cloud expects a `craft-cloud.yaml` file at the root of your repository. At a minimum, this file must contain a `php-version` key to tell Cloud what PHP runtime to use. It’s also where you’ll communicate to the builder where your Composer and Node.js “roots” are—if you have customized your project’s directory structure, you may need to provide additional keys in this config file.

Read more about using the [Cloud config file](config.md).

### Filesystems

Craft Cloud does not have a persistent filesystem (it is [ephemeral](/5.x/reference/config/bootstrap.html#craft-ephemeral) in nature), so **Local** filesystems must be migrated to use the **Cloud** filesystem provided by the Cloud extension.

We have a dedicated article about [working with assets on Cloud](assets.md), and a section that [specifically addresses this migration](assets.md#synchronizing-assets).

### Artifacts, Templates, and URLs

When you deploy your site to Craft Cloud, an [automated build process](builds.md) takes care of generating artifacts via `npm` and uploading them to our CDN. This means that they are not directly accessible in the web root of your site—via the filesystem *or* over HTTP. See our recommendations for [handling references to those artifacts](builds.md#artifact-urls) in your templates.

::: tip
You have control over the build process via [the `craft-cloud.yaml` config file](config.md).
:::

You do _not_ need to set a `@web` [alias](https://craftcms.com/docs/5.x/configure.html#aliases) on Cloud, as all traffic to your site will arrive via our gateway, which sets and validates headers to prevent common security issues.

### Application Config

Craft Cloud automatically configures a number of key application components to make use of platform resources. If you have made any changes via `app.php` to support features of your current infrastructure, you may need to remove or [scope those modifications to a non-Cloud environment](/5.x/configure.html#multi-environment-configs).

### Environment Variables

Your environment variables are managed via each environment’s **Variables** screen—not a `.env` file. Craft Cloud automatically sets a number of important variables, including all of your database connection details, the current site URL or domain, and some [config overrides](/5.x/configure.html#config-overrides) that ensure a consistent experience.

Before your first deployment, add any *custom* variables you reference in your code or project config. Sensitive values can be marked as “write-only” to prevent them from being lifted back out of Craft Console by another organization member. Those values are decrypted at runtime to a special [secrets file](/5.x/configure.html#secrets), and will not appear in logs or be set at the process level.

## Content

This section is primarily concerned with importing your existing content to Craft Cloud.

### Assets

Once you’ve [converted your asset filesystems](assets.md#converting-a-filesystem) in a local environment, you must [upload the assets](assets.md#synchronizing-assets) within them.

### Database

Unlike assets, your database does not require any configuration changes—simply choose the database driver and version matching your current infrastructure when [setting up your Cloud project](started.md). Keep in mind (per the above [application config](#application-config) section) that changes to your database connection component may be overridden when running on Cloud. A `db.php` file is not required for Craft Cloud; we recommend setting all connection information for local development (or other non-Cloud environments) via environment variables.

Our [Craft Cloud Databases](databases.md) article contains sections on importing and exporting data.

::: warning
Craft Cloud does not support the `tablePrefix` setting. See [this section](databases.md#table-prefixes) for information about renaming the tables in your project.
:::

## Deployment

Once you’ve made the required code changes and imported your content, run a [deployment](deployment.md). While it’s a good idea to test the updates locally, you do *not* need to deploy the updates to your legacy infrastructure—Cloud will apply any pending [Project Config](/5.x/system/project-config.html) updates (say, from changing your filesystems’ configuration) at the end of the deployment.

### Preview Domains

Your project automatically gets a [preview domain](domains.md#preview-domains) to validate your configuration and content before going live.

## Launch

When it comes time to launch, there are likely three steps you’ll need to take:

1. Configure a domain;
2. Import new content;
3. Reapply migrations and project config;

Read about [using custom domains with Craft Cloud](domains.md) to prepare for the required DNS changes, or review a more complete [launch checklist](checklist.md).

The exact process will differ based on your project’s tolerance of downtime—but generally, it’s a good idea to put your existing site into [maintenance mode](/5.x/reference/cli.html#off), export and re-import the database (and upload new assets), then run a final deployment.

::: tip
The AWS S3 CLI’s `sync` command is extremely useful for [uploading](assets.md) only new and modified assets. Consider running it periodically in your local environment to keep your content up-to-date—it also works when _uploading_ large asset libraries to your Cloud environment!
:::

With your latest code and content on Cloud, [disable maintenance mode](/5.x/reference/cli.html#on) and [update your DNS](domains.md) to point your live domain at our infrastructure!

More information about launching projects on Cloud is available in the [Going Live](checklist.md) article.
