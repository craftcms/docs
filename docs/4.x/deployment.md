---
description: Recommendations for hosting and deploying a Craft application
---

# Hosting & Deployment

In more cases than not, our recommendations for hosting and deploying a Craft website also describe effective processes for collaborating with teammates. Let’s start by reviewing some general advice on managing a Craft project.

## Workflow

Our goal here is to define processes that reduce the likelihood of mistakes making it onto a live website, and to put in place systems that help recover when they do.

### Source Control

No matter how you work—or who you work with—the single most important thing to do when working with code is to frequently check it in to [version control](https://www.atlassian.com/git/tutorials/what-is-version-control). Having regular checkpoints and backups can mitigate all kinds of unexpected losses and regressions.

Pushing your work to a centralized repository (GitHub, GitLab, Bitbucket, or elsewhere) also means that getting new code onto a server is dramatically simplified.

### Updates + Project Config

Craft uses Composer under the hood to install and [update](./updating.md) packages it (and any plugins) depends on. The [`composer.lock`](./directory-structure.md#composerlock) file defines the _exact_ set of packages that your project depends on, so tracking it in version control is essential. Any time updates are applied (or new plugins are installed), `composer.lock` will reflect those changes, making it possible for Composer to reconstruct your entire [`vendor/`](./directory-structure.md#vendor).

Whenever you pull new code, running `composer install` guarantees that the `vendor/` directory contains the expected packages.

Changes you make to your site’s settings or content model are tracked by [project config](./project-config.md) and written to YAML files in the `config/project/` directory. Craft’s correlate to `composer install` is [`craft up`](./console-commands.md#up), which reconciles the on-disk project config with its internal state, and automatically makes the necessary changes to the database to bring them into agreement.

We’ll look at these two processes as part of a typical deployment, but 

## Selecting a Host

Craft will work on virtually any hosting platform that meets its [requirements](./requirements.md), but choosing one that matches your expectations for performance and reliability—and your appetite for devops—is key.

::: tip
Check out our list of [hosting partners](https://craftcms.com/hosting), and the [introduction to hosting](kb:hosting-craft-101) Knowledge Base article if this is your first time launching a Craft project.
:::

<columns>
<column>

### Recommendations

- Choose a host that offers dedicated resources. This is sometimes referred to as a “virtual private server,” and will often include specific system information when selecting a service plan, like the number of CPU cores, RAM, and disk space allocated to your project.
- For un-managed hosting, consider using a provisioning tool like [Laravel Forge](https://forge.laravel.com/), [ServerPilot](https://serverpilot.io/), or [Ploi](https://ploi.io/).

</column>
<column>

### Red Flags

- “Shared” hosting may be the most affordable option, but often pits you against other tenants for resources on the same machine.
- Lack of SSH access (i.e. FTP-only hosts) means you will be unable to run [console commands](./console-commands.md), and significantly limits your [deployment](#deployment) options.

</column>
</columns>

### Advanced Options

Craft plays well with non-traditional infrastructure. Let’s look at some examples of how you might take advantage of different platforms.

#### Remote Databases

Your database does not need to be on the same machine that serves web requests. If your provider offers hosted or “managed” databases, consider how your [database settings](./config/db.md) may differ—in most cases, the only difference is what hostname (or [`server`](./config/db.md#server)) you tell Craft to connect to.

::: tip
Keep in mind that using a remote database can contribute to long load times, as Craft has to make network requests for each database call. Be sure and profile
:::

A remote database is one prerequisite for [scaling](#scalability) your server horizontally.

#### Scalability

Craft is benefits from both vertical and horizontal scaling. Giving your server more compute power and RAM, tuning the HTTP server, and [offloading the database](#remote-databases) and other services (vertical scaling) can bring immediate performance improvements. [Distributing load](kb:configuring-load-balanced-environments) across multiple web servers (horizontal scaling) is also viable, thanks to Craft’s support for centralized cache and session storage.

If your site or application demands global distribution, you may be able to take advantage of read/write splitting, replication, and other [advanced database configuration](./config/app.md#database) options to improve performance across regions.

Choosing the right asset storage medium or [Filesystem](./assets.md#filesystems) is another essential component of hosting—especially when it comes to durability and availability.

#### “Platform as a Service”

Proprietary and open source cloud computing solutions are both options for hosting a Craft application. Services like [Heroku](https://heroku.com/) and the Digital Ocean [App Platform](https://www.digitalocean.com/products/app-platform) are designed to reduce your devops burden by provisioning and scaling resources or integrating a build pipeline.

## Deployment

::: tip
Be sure and read our [Deployment Best Practices](kb:deployment-best-practices) article for some high-level recommendations. What follows is intended for technical users who are tasked with extending their workflow to a remote server.
:::

### Typical Process

Let’s look at how to apply a Craft-centric [workflow](#workflow) to deployments. To provide concrete examples, we’ll split the process into three phases:

1. **Build:** Compile all the code that makes the project run.
1. **Release:** Expose your new code bundle to traffic.
1. **Migrate:** Bring the database into agreement with the new code.

Once these definitions are clear, check out some [examples](#examples).

::: tip
These phases aren’t _necessarily_ discrete or sequential, but [isolating each step](#atomic-deployment) can make recovery from a failed deployment much quicker and easier.
:::

#### One-time Setup

Before you deploy a project for the first time, there is apt to be some setup. This might mean uploading an initial batch of assets, creating some config files, setting up SSH keys, importing a database backup, or connecting a service to Github. These requirements will emerge as you decide on the specifics of your deploy process—and where each phase of it happens.

#### Build

The build phase can vary widely between sites, tools, and platforms.

Our primary goal in this phase is to create a fresh copy of your site’s code in as near-complete a state as possible. This will often involve:

- Cloning the latest code from your repository;
- Installing Composer dependencies;
- Building other artifacts like CSS and Javascript;

At one end of the spectrum, this might be as simple as 
On some [platforms](#fully-integrated-platform), the build step may be responsible for preparing an entirely new “container” rather than just code.

#### Release



#### Migrate



### Examples

#### Simple Git

Let’s assume you’ve cloned your project onto a host, and configured it to serve requests directly out of the `web/` directory.

A deployment might look like this:

```bash
# Fetch new code:
git pull

# Install dependencies:
composer install

# Run migrations and apply project config:
php craft up

# Build front-end artifacts:
npm run build
```

For low-traffic sites, this is a totally viable process. If you ever needed to roll back after a broken deploy, you could check out an earlier commit, run `composer install`, and `npm run build`, and—if Craft had run migrations—restore the automatic database backup from `storage/backups/`.

::: warning
Take care to not expose your `.git` directory to the web!
:::

#### “Atomic” Deployment

Let’s look at some ways we might improve upon the basic deployment.

#### Fully-Integrated Platform

On a PaaS product like Heroku, 

## Common Pitfalls

Sometimes, bad things do happen—despite all our preparation. Here are some common issues you might encounter when working with a hosted Craft site.

### Backups

Draft a recovery plan and regularly test backups to ensure it is actionable.

::: warning
Backups that exist only on the machine that is being backed up aren’t really backups! Make sure backups that are part of your recovery plan are copied to at least one other off-site location.
:::

### Be Aware of Artifacts

Not everything that comprises a Craft site is (or should be) tracked in version control:

- Assets uploaded to a local [filesystem](./assets.md#filesystems) via the [control panel](./control-panel.md);
- Database backups (stored in [`storage/backups/`](./directory-structure.md#storage));
- Secrets (usually [relegated to `.env`](./config/README.md#env));
- Caches and other temporary files;

::: tip
See the official [starter project](repo:craftcms/craft)’s `.gitignore` file for a more complete list of files we recommend excluding from version control.
:::

When introducing new code onto your server, consider which of the above files should be kept in place and which can be discarded. Fully replacing your web root or project folder is rarely the right move: you shouldn’t be required to rebuild configuration or copy files back in after deploying new code, and your client’s assets should never be deleted or overwritten.

Similarly, if you are using Git directly on a server to pull new code in, how do you reconcile unforeseen changes that happen on-disk?

### Precision + Judgement

Avoid deployment processes that involve timing, decision-making, manual intervention, or other non-automated steps.
