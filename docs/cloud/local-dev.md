# Local Development

Craft Cloud has very little impact on your local development stack. Any changes required to make your project infrastructure-agnostic are apt to be in code or configuration—not tooling!

Our [Moving to Craft Cloud](projects.md) article covers these changes in detail, but the bits and pieces relevant to local development are collected here.

::: tip
DDEV remains our recommended development environment, as it supports all the PHP and database versions that Cloud does.
:::

## The Cloud Extension

The [Cloud extension](extension.md) allows us to dynamically override some of your Craft application’s configuration to take advantage of platform features, like connecting to the managed database and asset storage.

Your configuration is *not* modified when your project is running outside of Cloud. It’s important to be aware when [moving to Cloud](projects.md), though, which components’ configuration *will* be overridden—especially if your local development environment is designed to reflect your production infrastructure, and you expect certain features (Redis, for instance) to be available at all times.

When your local environment *does* need special configuration (say, to work with your team’s Docker Compose setup), that configuration should be handled with [environment variables](/5.x/configure.html#environment-overrides) or [scoped to a specific environment](/5.x/configure.html#multi-environment-configs).

### Database Connection

We recommend *against* using a `db.php` config file when working on a project that is deployed to Craft Cloud. Instead, use the special `CRAFT_DB_*` [environment variables](/5.x/reference/config/db.html) to set only the connection properties your development environment relies on.

::: tip
Make note of which variables you need for local development in a `.env.example` file so your teammates can get up to speed quickly!
:::

## Assets and Filesystems

The [Cloud filesystem](assets.md) has special settings for local development, under its **Local Filesystem** section. Ensure these settings make sense for your project’s structure:

- The **Base Path** should be below your web root (if the assets you’ll be storing there have public URLs), typically beginning with the `@webroot` alias;
- The **Base URL** should agree, usually starting with the `@web` alias;

To learn more about filesystem settings and synchronizing files, see our article on [working with assets](assets.md).

### Static Assets

References to files in your web root (like scripts and stylesheets) should use the `artifactUrl()` helper provided by the Cloud extension. Read more about [generating artifact URLs](builds.md#artifact-uRLs), especially if you use a development server for front-end assets like Vite or webpack!

## Database Backups

The [Databases on Craft Cloud](databases.md) article has instructions for capturing and restoring Cloud-compatible database backups.

MySQL databases can be restored from a manual or automated Cloud backup with Craft itself (using the `php craft db/restore` command), but Postgres backups require direct use of `pg_restore`.
