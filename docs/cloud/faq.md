# FAQ

Here are the top questions we get asked about [Craft Cloud](https://craftcms.com/cloud), our first-party hosting platform.

## Status + Help

### Can I monitor Craft Cloud’s health?

Our [status page](https://status.craftcms.com) inclues information about Craft Cloud and all our other web services. More information about health checks is available in the [Cloud Status](/knowledge-base/cloud-status) article.

A link to the status page is available in the footer of every page on <craftcms.com>.

### Where can I find more information on Craft Cloud?

The [Knowledge Base](/knowledge-base/cloud) is the best place to find answers to your Cloud questions—in particular, our [Getting Started](/knowledge-base/cloud-getting-started) guide and the [Troubleshooting Common Problems on Craft Cloud](/knowledge-base/cloud-troubleshooting) are pathways into many platform concepts.

If you have questions about our software products, check out the [Craft CMS](/docs/5.x) or [Craft Commerce](/docs/commerce/5.x) documentation.

### How do I get support for my Craft Cloud project?

Your Craft Cloud subscription entitles you to complementary [developer support](/support-services)! Start a new conversation from our [contact page](/contact?whatCanWeHelpYouWith=Support) using the email associated with your [Craft Console](/knowledge-base/what-is-craft-console) account, or email us directly at <{globalset:productVitals:custom_cloudSupportEmail}>.

### How fast are support response times?

Response times will be similar to normal Craft CMS developer support—we assign priority to incoming issues and address them in an equitable way. We have support personnel in each of Craft Cloud’s [regions](/knowledge-base/cloud-regions) (US, Canada, EU, APAC).

Information about our support tiers is available on the [Developer Support](/support-services) page.

### Is there a roadmap for Craft Cloud?

Yes! Check out the [Roadmaps](https://craftcms.com/roadmap) page. Our plans for Craft Cloud appear [at the bottom of the page](https://craftcms.com/roadmap#cloud).

### How do I request a feature for Craft Cloud?

We welcome feature requests via the [public discussion board](https://github.com/craftcms/cloud/discussions), or via <{globalset:productVitals:custom_cloudSupportEmail}>.

## Service + Features

### Can I point multiple domains to a single Craft Cloud environment?

Yes! This is a perfect way to manage multi-site installations.

Each project gets one free domain, and unlimited subdomains; additional domains can be added [for a fee](/cloud#cloud-infrastructure).

### Which Git providers do you support?

We currently support connecting GitHub, Gitlab, and BitBucket repositories.

### What’s the minimum version of Craft and PHP that Craft Cloud supports?

Craft Cloud requires Craft CMS {globalset:productVitals:vitalsCloudMinCraftVersion} and PHP {globalset:productVitals:custom_cloudMinPhpVersion}. Your `composer.lock` file determines what version of Craft gets installed; your PHP version must be defined in your project’s [`craft-cloud.yaml` configuration file](/knowledge-base/cloud-config).

### Is there are a trial for Craft Cloud?

Yes, all Craft Cloud projects start with a free 7-day trial. Read more about trials in our [Billing](/knowledge-base/cloud-billing) article.

### Which specific regions do you cover?

We currently have presence in North America (Oregon, USA), Canada (Quebec), Europe (Frankfurt, Germany), and Asia-Pacific (Sydney, Australia).

Read more about [region support](/knowledge-base/cloud-regions).

### Is data encrypted at-rest?

Yes—your [assets](/knowledge-base/cloud-assets) and database are both encrypted at-rest. More information is available in our dedicated [databases](/knowledge-base/cloud-databases) article.

### What kind of firewall do you have in place for Cloud?

All Craft Cloud projects are protected by our Cloudflare WAF, with a “reasonable” setup of default rules. We make specific changes to the firewall as needs arise.

Some customers have their own Cloudflare accounts in front of ours, allowing them to manage specific WAF rules before requests make it to Craft Cloud. Cloudflare refers to this as the “[Orange-to-Orange](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)” scenario; more information about this setup is available in the [Craft Cloud for Cloudflare](/knowledge-base/cloud-for-cloudflare-users) article.

### Can I edit my .htaccess or nginx config file?

Nope, sorry! Craft Cloud is serverless, and doesn’t use a traditional HTTP server like nginx or Apache.

### Can I SSH into my server?

Craft Cloud’s serverless architecture means there is nothing to SSH into! Images are built during each deployment, and spun up and destroyed based on traffic—even though the [ephemeral filesystem](/knowledge-base/cloud-migrating-projects) takes some getting used to, its inherent stability and security are an essential part of what makes Cloud such a great place to host your Craft project.

### Can I run Craft console commands?

Yes! From any environment in Craft Console, select **Commands**, then type in the Craft command you want to run. Arbitrary shell commands are not allowed.

Read more about [running](/knowledge-base/cloud-commands) and [scheduling](/knowledge-base/cloud-cron) commands on Cloud.

### Does Craft Cloud support MariaDB?

No, Craft Cloud only supports MySQL {globalset:productVitals:custom_cloudDbSupportMysql} and Postgres {globalset:productVitals:custom_cloudDbSupportPostgres}. If you are migrating a site to Cloud, make sure its database can be neatly imported into MySQL 8, first.

### How do I roll back a deployment?

Currently, there is no automatic way to do this.

As a result of each environment being connected to a git repository, you can revert problematic commits and re-deploy. If changes were made to the database that need to be rolled back (say, via a migration), the database will need to be restored to an appropriate point. Migrations are only run once Cloud has finished building your application image. Failed builds are never deployed!

Read more about [deployments](/knowledge-base/cloud-deployment) and our [build pipeline](/knowledge-base/cloud-builds).

### Can I sync code/databases/assets between environments?

You can populate environments’ storage from whatever source(s) you want, but there is not currently an automated tool for this.

- **Code:** Select the same branch as another environment, and start a deployment.
- **Database:** [Capture and download a backup](/knowledge-base/cloud-backups), then [restore it](/knowledge-base/cloud-backups#restoring-backups) to the secondary environment.
- **Assets:** Manually copy files from one bucket to another. Read more about [synchronizing assets](/knowledge-base/cloud-assets#synchronizing-assets).

Database and asset access credentials can be retrieved from your Craft Cloud console on a per-environment basis via the **Access** menu.

### Do I have to supply my own SSL certificate for my site?

Nope! SSL is included with every domain connected to your Craft Cloud project, and requests are automatically redirected to HTTPs.

### Can I supply my own custom SSL certificate for my site?

Yes! Please send us an email at <{globalset:productVitals:custom_cloudSupportEmail}> to get started.

### Does Craft Cloud provide email services for my Craft project?

We currently do not have a dedicated transactional email service. You are free to use any Craft-compatible mailer adapter or SMTP service.

We cover [customizing Craft’s mailer](/docs/5.x/system/mail.html) in the documentation.

### Does Craft Cloud provide a deployment pipeline?

Yes! Read all about [deployments](/knowledge-base/cloud-deployment) and the [build pipeline](/knowledge-base/cloud-builds).

### How can I statically cache the front end of my site?

Craft Cloud has a built-in [static caching](/knowledge-base/cloud-static-cache) system that is designed to work seamlessly with Craft CMS. On-disk and rewrite-based caches will not work, as the Cloud filesystem is ephemeral—and files in the “web root” aren’t directly exposed to the web.

### How do I work with assets locally and remotely?

The [Cloud filesystem](/knowledge-base/cloud-assets) has a special “fallback” feature for working locally.

### How do I move an existing project to Craft Cloud?

Check out our [migration guide](/knowledge-base/cloud-migrating-projects)! As long as you are using Craft CMS {globalset:productVitals:vitalsCloudMinCraftVersion} or later, your project is apt to work on Craft Cloud with very few changes.


## Billing + Legal

### How does billing work in Craft Cloud?

Craft Cloud plans require a valid payment method on file in your Craft Console account or [organization](/knowledge-base/craft-console-organizations#managing-payment-information). Monthly and yearly plans are available.

Read more about [billing on Craft Cloud](/knowledge-base/cloud-billing).

### Do I need to purchase a Craft license for my site on Craft Cloud?

Nope! A Craft license is included with your Craft Cloud plan. It is valid for as long as your plan is in good standing.

You _do_ need to purchase licenses for any plugins you use, via the in-app Plugin Store.

### Are there any resource limits on Craft Cloud?

Metered resources are listed on our [Cloud Quotas](/knowledge-base/cloud-quotas) page. Technical limitations are covered in [Cloud Services + Compatability](/knowledge-base/cloud-compatibility).

Use of Craft Cloud is also subject to our [Acceptable Use Policy](/acceptable-use-policy) and [Terms of Service](/terms-of-service).

### What kinds of usage trigger additional charges?

We have taken great care to make pricing stable for Cloud customers. As such, we do not use metered billing on any services—instead, we offer two [plans](/cloud#pricing), with add-ons for [asset storage](/knowledge-base/cloud-assets) and [domains](/knowledge-base/cloud-domains).

Refer to the [resource limitations](/knowledge-base/cloud-quotas) page for a list of other metrics.

{{ cloud.supportEmail }}

### Do you offer SLAs?

We only offer SLAs with enterprise agreements in place. Send an email to <{globalset:productVitals:custom_cloudSupportEmail}> to get started.
