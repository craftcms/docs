# Resource Limits

Every Craft Cloud project comes with generous resource quotas and simple, predictable [pricing](/cloud#pricing).

## Environments

Projects are given three [environments](/knowledge-base/cloud-environments), one of which may be selected as the [production environment](/knowledge-base/cloud-environments#production-environment). You cannot currently purchase additional environments, but you may delete and recreate them whenever you need.

## Storage

We do have a couple of limits in place for storage to prevent platform abuse:

- Each environment in a **Pro** project gets 20GB of asset storage; **Team** project environments get 10GB.
- Individual files are limited to 200MB;

There are no limits on page views, database size, inbound transfer, or the number of content types, plugins, users, entries, or assets you manage within Craft CMS itself, beyond what is allowed by your [license](#craft-license).

## Bandwidth

Outbound transfer from your application and asset storage bucket are metered.

If a response can be served from our edge (like a [statically-cached](/knowledge-base/cloud-static-caching) HTML document, an [image transform](https://craftcms.com/knowledge-base/cloud-assets#transforms), or any previously-requested asset or [build artifact](/knowledge-base/cloud-builds)), it does _not_ count toward your monthly bandwidth:

- **Team** projects get 250GB of transfer per month, shared between environments.
- **Pro** projects get 500GB of transfer per month, shared between environments.

All transfer from our edge and CDN to your clients is free. Most projects will not need to do anything to take advantage of our edge cache, but you can optimize your cache-hit ratio by following our [static caching guide](/knowledge-base/cloud-static-caching), and limit asset egress by creating thoughtful [named asset transforms](/docs/5.x/development/image-transforms.html).

The following table shows some common resource sizes, and an approximation of the number of uncached requests that fit within the **Team** plan’s bandwidth quota:

Media Type | Typical Size | Requests
--- | --- | ---
HTML Document | 30KB ([Source](https://almanac.httparchive.org/en/2022/markup#document-size)) | 8,000,000
Image | 1MB ([Source](https://almanac.httparchive.org/en/2022/media#bytesizes)) | 250,000
Resized Image | 350KB | ~700,000

These numbers do not represent any actual enforced limits on file sizes or number of requests—they are provided strictly as a means to compare against current or forecasted usage.

::: tip
Keep in mind that each image will only be loaded from the origin _once_ unless they are replaced or modified such that the CDN must be purged. Effectively, your project would only approach these limits if it had many tens of thousands of unique assets that were each requested for the first time in a given month!
:::

## Domains

One [custom domain](/knowledge-base/cloud-domains) is included with every project. You may add as many subdomains as you need, but additional domains are billed at $20 per month. Adding a domain part way through a billing period immediately bills a prorated amount to the payment method on file.

## Requests + Responses

While we don’t impose limits on the *number* of total or concurrent requests, it’s important that they each finish within 60 seconds. Responses with _headers_ exceeding 16,000 bytes (total) may be dropped, so avoid sending long identifiers or setting large cookie values. If you need to associate a significant amount of data with a visitor, consider using the cache or a database table and tying it to the session by ID.

Additionally, the maximum total response length is 6MB, before compression (regardless of its `Content-Type`). The average HTML document size is [about 30KB](https://almanac.httparchive.org/en/2022/markup#document-size), or roughly 0.5% of our cap—so very few sites and apps should be impacted.

Asset uploads from the Craft control panel are _not_ subject to this 6MB limit, as they are uploaded directly to your bucket and served from our CDN. Asset uploads from the site’s front end are subject to this limit unless you provide a way to upload them directly to your bucket from the front end (similar to how the Craft control panel does it).

Build artifacts are also _not_ subject to this limit, as they are served from our CDN.

## Builds and Commands

You can [deploy](/knowledge-base/cloud-deployment) as often as you like. There are no limits on the total number of “build minutes” per billing period, but each [build](/knowledge-base/cloud-builds) must complete within **15 minutes**.

A brand new [starter project](/knowledge-base/using-the-starter-project) will typically deploy in about 90 seconds. Projects that use many plugins or have complex Node build steps will naturally take more time—long-running processes like automated tests may need to be offloaded to a different CI pipeline.

The final [migration](/docs/5.x/deploy.html#migrate) phase of each deployment does *not* count toward the build time limit, but _are_ governed by the discrete command duration limit.

Commands must complete within **15 minutes**, as well. This applies to automatically-triggered commands (like migrations) as well as those run manually from an environment’s **Commands** screen.

Deployments and commands report their elapsed time (during execution), and store their final duration (when they complete or fail).

::: warning
Migrations for major Craft or plugin version upgrades can sometimes exceed this limit on large sites. Test those upgrades locally before deploying to Cloud to get a sense for the total time required.
:::

## Queue

There are no limits to the number of concurrent or monthly queue jobs, but—like builds and commands—each job must be completed within **15 minutes**. For long-running tasks, plugin developers should implement `craft\queue\BaseBatchedJob` so that jobs can be [gracefully batched](/docs/5.x/extend/queue-jobs.html#batched-jobs) as that timeout approaches.

## Craft License

The included Craft Pro or Team license is valid as long as your project is active on Cloud, and is not transferrable to a self-hosted installation. Otherwise, its terms are identical to a normal Craft license—there are no additional restrictions on the variety or quantity of content you manage with the installation, nor the size of your audience. Cloud is subject to our [Acceptable Use Policy](/acceptable-use-policy).

Plugin licenses are *not* included with your Cloud subscription and will need to be purchased separately.
