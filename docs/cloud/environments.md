# Environments

Craft Cloud projects allow you to manage multiple distinct environments or “versions” of your site, each with their own [resources](#resources) and [settings](#environment-settings). Environments are perfect for testing changes before rolling them out to a live site.

Team plans include two environments; Pro plans include three.

## Features

Most of your work in Cloud will be in the context of an environment. Each environment’s landing page has a summary of actions that are available to you.

### Deployments

View current and past deployments, or start a new one. Read more about [deploying to Craft Cloud](deployment.md).

### Logs

Review + search logs from your live app.

### Backups

Create and download snapshots of your [database](databases.md). Backups are created nightly, and you can start a new one at-will—they’re retained for 30 days, either way.

### Variables

Configure this’s environment variables. Adding, updating, or removing a variable requires a deployment to take effect—but you can make multiple changes, then trigger a deployment to keep related or dependent changes in sync.

Cloud automatically sets a number of variables that are essential to your application. These are listed in the **System Variables** section, and they cannot be changed or overridden.

### Commands

Run a Craft console command from your browser. History and logs for past commands are available here, as well.

Every deploy also triggers a `cloud/up` command, so you’ll see those records among any commands you’ve manually run.

### Access

Get credentials to this environment’s database and [asset storage](assets.md). Don’t share these details with anyone!

### Settings

Rename the environment, or change the branch it’s associated with (and when it will be [deployed](deployment.md)).

## Resources

Every environment gets its own database. Data is not automatically cloned from one environment to another, so you will need to manually restore a backup—that backup could come from another Cloud environment, or a local development database.

All environments in a project share a single asset storage bucket, but they are separated into top-level directories named after their environment’s ID (or, more accurately, its UUID).

Cloud generates a [preview domain](domains.md) for each environment—or allows you to connect a [custom domain](domains.md#adding-a-domain) or [subdomain](domains.md#subdomains) thereof.

## Environment Settings

When you create an environment, you’ll give it a name, select a Git branch, and choose a [deployment trigger](deployment.md#deployment-triggers). All three options can be changed any time from the environment’s **Settings** screen.

## Production Environment

In your project’s main **Settings** screen, you can select a **Production Environment**. This setting has three effects:

### Warming

The production environment’s function is kept “warm” by our infrastructure by periodically invoking it.

To conserve compute resources (and therefore energy consumption), Cloud allows non-production environments’ functions to “sleep” after about 15 minutes. This means that—following a period of no activity—there may be a 1–2 second delay prior to the first request being served.

These invocations do not fully bootstrap Craft, so they will be invisible to your application.

### Front-End URLs

Craft Console uses the production environment’s preview domain (or a custom domain connected to it, once verified) when generating public URLs to the project. You may see these at the project level—but when you’re managing a single environment, those URLs will always link to that environment.

### robots.txt

For any environment that is not marked as production, Craft Cloud will serve requests to `robots.txt` with this body:

```
User-agent: *
Disallow: /
```

So they don’t get indexed by search engines. Production environments will allow the application to dictate the contents of `robots.txt`.

## Deleting an Environment

Environments can be deleted at any time. Keep in mind that their resources will be destroyed, and they will immediately stop serving traffic. **Everything below will be unrecoverable:**

- Your **database** and everything in it will be deleted;
- Any **assets** uploaded to the environment will be deleted;
- We remove all **system and custom variables** belonging to the environment;
- The environment’s **settings**, **deployment history**, **command history**, **logs**, and **temporary credentials** are all deleted;

::: warning
Always capture a database backup—and download it—before destroying an environment.
:::

Domains pointed at a deleted environment will also stop resolving.

Instead of deleting an environment, we recommend creating a new one, then pointing custom domains at that—the “old” environment can stay around until you’re confident the new one is properly configured. You are not billed for inactive environments.
