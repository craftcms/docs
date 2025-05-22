---
description: Recommendations for hosting and deploying a Craft application.
sidebarDepth: 2
---

# Hosting & Deployment

In more cases than not, our recommendations for hosting and deploying a Craft website also describe effective processes for collaborating with teammates. Let’s start by reviewing some general advice on managing a Craft project.

<!-- more -->

## Workflow

Our goal here is to define processes that reduce the likelihood of mistakes making it onto a live website, and to adopt systems that help recover [if/when they do](#common-pitfalls).

### Source Control

No matter how you work—or who you work with—the single most important thing to do when dealing with code is to frequently check it in to [version control](https://www.atlassian.com/git/tutorials/what-is-version-control). Having regular checkpoints and backups can mitigate all kinds of unexpected losses and regressions.

Pushing your work to a centralized repository (GitHub, GitLab, Bitbucket, or elsewhere) also means that getting new code onto a server during a deployment is dramatically simplified.


### System Updates + Project Config

Craft uses Composer under the hood to install and [update](./update.md) plugins and packages it depends on.

Your [`composer.lock`](system/directory-structure.md#composerlock) file defines the _exact_ set of packages that your project uses, so tracking it in version control is essential. The lockfile is updated any time you run system updates or install a new plugin, making it possible for Composer to reconstruct your entire [`vendor/`](system/directory-structure.md#vendor) directory.

In a similar manner, changes you make to your site’s settings and content model are tracked by [project config](system/project-config.md) and written to YAML files in the `config/project/` directory. These files should also be committed to version control.

To stay on top of changes from your team, run these two commands _every time you pull new code_:

1. `composer install`: Ensures the `vendor/` directory contains the expected packages;
1. `php craft up`: Applies incoming project config changes;

We’ll look at how these systems relate to a [typical deployment](#typical-process) in a moment.

### Content

In most cases, your live site’s content should be treated as authoritative: code and configuration flow up (deployment), and content flows back down (database backups).

::: tip
Craft has a built-in backup tool, accessible from the **Utilities** screen of the control panel (for users with the correct permissions) or as a [console command](reference/cli.md#db-backup). There’s also a command for [restoring](reference/cli.md#db-restore) backups!
:::

It is not advisable to attempt merging database tables or otherwise combining local and live content—including completely squashing a live database with a development one. [Project Config](#system-updates-project-config) is Craft’s solution to diverging schema and content.

If you ever need to prepare content ahead of a deployment (say, if you’ve created a new [single](reference/element-types/entries.md#singles) and can’t risk users seeing a partially blank page), consider using a [content migration](extend/migrations.md).

## Selecting a Host

Craft will work on virtually any hosting platform that meets its [requirements](requirements.md), but choosing one that matches your expectations for performance and reliability—and your appetite for devops—is key.

::: tip
Check out our [introduction to hosting](kb:hosting-craft-101) Knowledge Base article if this is your first time launching a Craft project, or spin up a free seven-day trial of [Craft Cloud](https://craftcms.com/cloud)!
:::

<columns>
<column>

### Recommendations

- Choose a host that offers dedicated resources. This is sometimes referred to as a “virtual private server,” and will often include specific system information when selecting a service plan, like the number of CPU cores, RAM, and disk space allocated to your project.
- For un-managed hosting, consider using a provisioning tool like [Laravel Forge](https://forge.laravel.com/), [ServerPilot](https://serverpilot.io/), or [Ploi](https://ploi.io/) to simplify setup and maintenance.

</column>
<column>

### Red Flags

- “Shared” hosting may be the most affordable option, but often pits you against other tenants for resources on the same machine.
- Lack of SSH access (i.e. FTP-only hosts) means you will be unable to run [console commands](reference/cli.md), and significantly limits your [deployment](#deployment) options.
- While convenient, the presence of cPanel is often a sign that the host is re-selling resources, without control over the actual hardware.

</column>
</columns>

### Advanced Options

Craft plays well with non-traditional infrastructure. Let’s look at some examples of how you might take advantage of a provider’s other services.

#### Remote Databases

Your database does not need to be on the same machine that serves web requests. If your provider offers hosted or “managed” databases, consider how your [database settings](reference/config/db.md) may differ—in most cases, the only difference is what hostname (or [`server`](reference/config/db.md#server)) you tell Craft to connect to.

::: tip
Keep in mind that introducing a network roundtrip for each database call can add up quickly. Profile requests with Yii’s debug toolbar to see how this impacts your load times!
:::

A remote database is one prerequisite for [scaling](#scalability) your server horizontally.

#### Scalability

Craft benefits from both vertical and horizontal scaling. Giving your server more compute power and RAM, tuning the HTTP server, and [offloading the database](#remote-databases) and other services (vertical scaling) can bring immediate performance improvements. [Distributing load](kb:configuring-load-balanced-environments) across multiple web servers (horizontal scaling) is also viable, thanks to Craft’s support for centralized [cache](reference/config/app.md#cache) and [session](reference/config/app.md#session) storage.

If your site demands global distribution (and can’t be cached at the edge), you may be able to take advantage of read/write splitting, replication, and other [advanced database configuration](reference/config/app.md#database) options to improve performance across regions.

Choosing the right asset storage medium or [filesystem](reference/element-types/assets.md#filesystems) is another critical component of hosting—especially when it comes to durability and availability.

#### “Platform as a Service”

Proprietary and open source cloud computing solutions are both options for hosting a Craft application. Services like [Heroku](https://heroku.com/) and the Digital Ocean [App Platform](https://www.digitalocean.com/products/app-platform) are designed to reduce your devops burden by provisioning and scaling resources, as well as integrating build pipelines, workers, release hooks, logs, or alerts.

## Deployment

Broadly, we’re defining _deployment_ as the process of publishing code changes to a live website. For the following examples, we’ll assume your project uses the standard [directory structure](system/directory-structure.md).

::: tip
Be sure and read our [Deployment Best Practices](kb:deployment-best-practices) article for some high-level recommendations. What follows is intended for technical users who are tasked with extending their workflow to a web server.
:::

### Typical Process

Let’s look at how to apply a Craft-centric [workflow](#workflow) to deployments. To provide concrete examples, we’ll split the process into three phases:

1. **[Build](#build):** Compile all the code that makes the project run.
1. **[Release](#release):** Expose your new build to traffic.
1. **[Migrate](#migrate):** Bring the database into agreement with the new code.

Once these definitions are clear, check out some [examples](#examples).

::: tip
These phases aren’t _necessarily_ discrete or sequential, but [isolating each step](#atomic-deployment) can make recovery from a failed deployment much quicker and easier.
:::

#### One-time Setup

Before you deploy a project for the first time, there is apt to be some setup. This might mean uploading an initial batch of assets, creating some config files, setting up SSH keys, importing a database backup, or connecting a service to GitHub. These requirements will emerge as you decide on the specifics of your deploy process—and where each phase of it happens.

#### Build

The build phase can vary widely between sites, tools, and platforms. Our primary goal in this phase is to create a fresh copy of your site’s code in as near-complete a state as possible. This will often involve:

- Cloning the latest code from your repository;
- Installing Composer dependencies;
- Rendering other artifacts like CSS and JavaScript;

Compiling your application may happen any number of places: locally; directly on the live server; or on a separate cloud-based action runner like [Buddy](https://buddy.works) or [GitHub Actions](https://github.com/features/actions).

#### Release

This phase is only concerned with replacing the running website with the new build. In some cases, the _build_ and _release_ phases may partially or completely overlap; in others, a release could involve rerouting traffic to an entirely new container!

::: tip
This is also a great time to [clear caches](reference/cli.md#clear-caches)—cached data and templates may be incompatible with the new build.
:::

#### Migrate

The final step in any successful deployment should be running migrations. Craft can apply database migrations and project config changes in a single command:

```bash
php craft up --interactive=0
```

Before any pending migrations are applied, Craft will capture a database backup.

### Examples

With a generic deployment framework in place, we’re ready to get into a few concrete examples.

#### Simple Git

Let’s assume you’ve cloned your project onto a host, and configured it to serve requests directly out of the `web/` directory.

Within the project’s root directory, a simple Git-based deployment might look like this:

```bash
# Fetch new code:
git pull

# Install dependencies:
composer install --no-interaction

# Run migrations and apply project config:
php craft up --interactive=0

# Build front-end artifacts (less urgent / lower priority):
npm install && npm run build
```

Here, the build and release steps are basically combined: updates are integrated directly into the live codebase. For many sites, this is a totally viable process!

If you ever need to roll back after a broken deploy, just check out an earlier commit, run `composer install` (and the `npm` commands, if necessary), and—if Craft had run migrations—restore the automatic database backup from `storage/backups/`.

::: warning
Take care to not expose your `.git` directory (or other private files) to the web!
:::

#### Atomic Deployment

Let’s look at some ways we might improve upon this simple deployment scheme. Our main goal will be to separate each phase of the deployment, so that the live site spends as little time as possible in an intermediate or partially-updated state.

The combination of `git pull` and `composer install` are the most problematic—but we should also make an effort to pre-build front-end resources. Instead of doing all this work directly in a live directory, let’s move it off to the side.

Suppose your project lives at `/var/www/craft-project/`, and Apache or nginx is configured to use `/var/www/craft-project/web/` as your web root. In `/var/www/`, create two new folders:

```treeview{3,4}
/var/www/
├── craft-project/
├── releases/
└── shared/
```

Within `/var/www/`, a deployment might follow these steps:

```bash
# Get a timestamp to identify this release:
DATE="$(date +'%Y-%m-%d--%H%M%S')" # -> 2023-01-01--123456

# Define paths we’ll be working with:
WORKING="/var/www"                 # Root deploy directory
RELEASE="$WORKING/releases/$DATE"  # New release directory
CURRENT="$WORKING/current"         # Live release “link”

# Shallow-clone a fresh copy of the latest project files into our release directory:
git clone --depth=1 git@github.com/organization/repo $RELEASE

# Move into the release directory:
pushd $RELEASE

# Install Composer packages:
composer install --no-interaction

# Build other artifacts:
npm install
npm run build

# Move back out to the main directory:
popd

# Create a symbolic link to the new release:
ln -sf $RELEASE $CURRENT
```

After a deployment, the working directory will look like this:

```treeview{3,5}
/var/www/
├── craft-project/
├── current -> /var/www/releases/2023-01-01--123456/
├── releases/
│   ├── 2023-01-01--123456/
│   └── ...
└── shared/
```

::: tip
Don’t want to bother with Git, Node, or Composer on your server? The entire “build” step of an atomic deployment can be done elsewhere, then uploaded to the `releases/` directory all at once.
:::

There are a few more pieces to this puzzle, though:

- How do we actually serve our new deployment?
- How we can we persist files between releases?
- What about migrations?

The first is straightforward: your HTTP server’s web root must be updated to`/var/www/current/web/`, taking advantage of the stable [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) created by the last step in the deployment script. This is a _one-time change_ to the server’s configuration—subsequent deploys will just replace the `current` symlink!

We can also address persistent files with symbolic links. For each file or directory you want to keep between deployments, add a line just before the final `current` link is created. For the sake of clarity, we’ll also define a new variable pointing to the `shared/` directory we created earlier:

```bash
# ...

SHARED="$WORKING/shared"

# Create links to persistent files:
ln -s "$RELEASE/.env" "$SHARED/.env"
ln -s "$RELEASE/web/uploads" "$SHARED/web/uploads"

# Create a symbolic link to the new release:
ln -sf $RELEASE $CURRENT
```

Before this will work, you’ll have to move the “shared” files out of `craft-project/` and into the `shared/` directory. The sub-paths within `shared/` don’t have to be identical, but they should make sense to you and must agree with the script:

```treeview{6,8,13,15}
/var/www/
├── craft-project/
├── current → /var/www/releases/2023-01-01--123456/
├── releases/
│   ├── 2023-01-01--123456/
│   │   ├── .env → /var/www/shared/.env
│   │   ├── web/
│   │   │   ├── uploads/ → /var/www/shared/web/uploads/
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── shared/
    ├── .env
    └── web/
        └── uploads/
            └── ...
```

Lastly, migrations and project config may still take a moment to apply—it’s up to you to determine how much downtime your project can tolerate! The only thing different from the simple deployment is the `craft` executable path:

```bash
# ...

# Run migrations and apply project config:
php $RELEASE/craft up --interactive=0
```

With an atomic deployment, rollbacks are trivial—the symlink can just be replaced with a previous release, because they’re left exactly as-is.

This is just a blueprint for an “atomic” deployment—there are countless ways to improve upon it for a given site or server. Tools like [Deployer](https://deployer.org/) (a PHP package, itself) provide an abstraction for deployment that is more similar to configuration than scripting, and services like [Laravel Envoyer](https://envoyer.io) roll everything into a neat, hosted solution.

#### Fully-Integrated Platform

On PaaS products like Heroku, you are often only responsible for connecting a repository—the platform figures out what steps are required to build the application and the underlying server “image.” In these cases, the presence of `composer.json` is often enough to indicate that the image needs a PHP runtime and that `composer install` must be run to gather dependencies.

This paradigm also turns the “release” phase on its head: instead of deploying a bundle of _code_, the _entire server image_ (or images, if scaled horizontally) is cycled into the pool of resources and new requests are routed to it—effectively eliminating downtime.

Heroku is just an example of this model, pioneered by Kubernetes and other infrastructure orchestration technologies.

::: tip
Adopting all or parts of the [twelve-factor app](https://12factor.net/) paradigm can be a little disorienting. In particular, an [ephemeral filesystem](reference/config/bootstrap.md#craft_ephemeral) means you will need to adjust the way environment variables are set (in lieu of `.env`), how the cache works, and how sessions are stored. Some of these options are discussed in [advanced application configuration](reference/config/app.md).
:::

## Common Pitfalls

Sometimes, bad things do happen—despite all our preparation. Here are some common issues you might encounter when working with a hosted Craft site.

### Backups

Draft a recovery plan and test it regularly. Backups that exist only on the machine that is being backed up aren’t really backups! Make sure backups that are part of your recovery plan are copied to at least one other off-site location.

### Admin Changes

<config5:allowAdminChanges> should be disabled in all but development environments. If administrators are allowed to make project config changes directly on a live website without oversight, their changes may be reverted the next time you deploy.

### Dev Mode

<config5:devMode> is an invaluable debugging tool for local development—but it’s a performance and security liability on a public-facing website. Keep it off by default, and enable it only via you local `.env` file, by adding `CRAFT_DEV_MODE=true`.

::: tip
Even when `devMode` is off, you can still get profiling data from the Yii debug toolbar by enabling it in your user’s preferences.
:::

### Be Aware of Artifacts

Not everything that comprises a Craft site is (or should be) tracked in version control:

- Assets uploaded to a local [filesystem](reference/element-types/assets.md#filesystems) via the [control panel](system/control-panel.md);
- Database backups (stored in [`storage/backups/`](system/directory-structure.md#storage));
- Secrets (usually [relegated to `.env`](configure.md#env));
- Caches and other temporary files;
- Compiled CSS or JavaScript;

::: tip
See the official [starter project](repo:craftcms/craft)’s `.gitignore` file for a more complete list of files we recommend excluding from version control.
:::

When introducing new code onto your server, consider which of the above files should be kept in place and which can be discarded. Fully replacing your web root or project folder is rarely the right move: you shouldn’t need to rebuild configuration or copy files back in after deploying new code, and your client’s uploads should never be deleted or overwritten.

Similarly, if you are using Git directly on a server to pull new code in, how do you reconcile unforeseen changes that happen on-disk?

### Cloud Storage

There are a ton of benefits to using a remote filesystem for your assets, but care must be taken when managing files in a development environment: deleting or moving assets via the control panel can cause problems the live environment to lose track of files in the storage bucket and may lead to broken links.

### Precision + Judgement

Deployments requiring careful timing, quick decision-making, manual intervention, or other non-automated steps should be avoided. Even if the process is well-defined, understood, and practiced, the door remains open to human error.

### The Queue

If you use a [daemonized queue runner](system/queue.md#daemon) (based on `systemd` or `service`, for instance), it will need to be restarted to pick up the latest application code. [CRON-driven queues](system/queue.md#cron) load the application at each interval and do not need any special treatment. If the path to your application’s `craft` executable changes on each deployment, consider setting up a reliable symlink, or make the appropriate changes to service configuration files or your `crontab`!
