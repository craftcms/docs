---
related:
  - uri: backups.md
    label: Backing up and restoring Cloud databases
  - uri: quotas.md
    label: Resource limits on Cloud
  - uri: extension.md
    label: The Cloud extension
---

# Databases

Craft Cloud supports [MySQL](#mySQL) and [Postgres](#postgres) databases. You will pick a database engine when creating a new Cloud project: if you are starting a new project, we recommend MySQL 8.0; existing projects should use the same engine and version used by their current infrastructure.

Both engines support [automated and manual backups](backups.md) via Craft Console.

::: tip
Using a `tablePrefix` from an earlier version of Craft? Follow [these instructions](#table-prefixes) to make your database Cloud-compatible.
:::

## Database Engines

Craft Cloud currently supports MySQL {{ $activeSetVars.dbSupportMySql }} and Postgres {{ $activeSetVars.dbSupportPostgres }} in [all regions](regions.md).

## Connecting to your Database

Each environment gets its own database. Connection details are automatically provided to your application via the [Cloud extension](extension.md), so no configuration is necessary!

If you need to connect to your database from outside of Cloud (like with a database GUI), visit the **Access** screen of your environment to get credentials.

## Backups

In addition to automated nightly backups of your database, you can trigger a manual backup of any environment from Craft Console.

&rarr; Read more about [database backups](backups.md).

::: warning
The **Database Backup** [utility](/5.x/system/control-panel.html#utilities) is not currently supported on Cloud. Use the **Backups** screen in Craft Console to capture a backup.
:::

## Importing Data

From an existing Craft installation, run the [`db/backup` command](/5.x/reference/cli.html#db-backup) to generate a Cloud-compatible database dump. To restore data from another Craft Cloud environment, instead capture and download a backup from the **Backups** screen of the source environment.

The specific commands for importing a backup to Cloud depend on your driver, but they will always be run from your local machine (or from wherever your current Craft installation lives). Substitute the parameters in `{brackets}` with corresponding values from the [**Access** screen](#connecting-to-your-database) of the target Cloud environment.

::: warning
The commands below will perform a “clean” import, erasing any existing content in the environment’s database!
:::

### MySQL

MySQL backups from Craft _or_ Cloud can be imported with this command:

```bash
mysql \
    --host={cloud-db-hostname} \
    --port=3306 \
    --user={username} \
    --password={password} \
    --database={database} \
    < path/to/backup.sql
```

::: warning
Due to idiosyncrasies in the MySQL backup format, your `mysql` client binary must match the version the dump was created with—ideally down to the minor version. For example, if a MySQL dump is created from a server running 8.0.28, then it should be restored with the 8.0.28 `mysql` client version. Some GUI tools (like Table Plus) allow you to specify a version when performing a restore.
:::

### Postgres

Postgres backups come in a few different formats. Craft uses the `plaintext` format by default, but backups from Cloud are captured in the `custom` format for interoperability.

To import a `plaintext` backup, run this command:

```bash
psql \
    --host="{hostname}" \
    --username="{username}" \
    --dbname "{database}" \
    --password \
    < path/to/backup.sql
```

`custom` format backups must be restored with the [`pg_restore` command](https://www.postgresql.org/docs/current/app-pgrestore.html), and require additional flags:

```bash
pg_restore \
    --host="{hostname}" \
    --username="{username}" \
    --dbname "{database}" \
    --password \
    --no-owner \
    --clean \
    --single-transaction \
    --if-exists \
    --no-acl \
    < path/to/backup.sql
```

As of Craft 4.10, you can choose the format Craft uses to back up a Postgres database with the [`backupCommandFormat` setting](/5.x/reference/config/general.html#backupcommandformat).

Make sure the version of `pg_restore` matches the version of `pg_dump` that was used to create the backup. Some GUI tools (like Table Plus) make it possible to choose the version when using binary backups.

When dumping and restoring, the `--password` flag forces a password prompt—you do not need to provide a value as part of the original command. If you need to perform either operation in an automated or non-interactive environment, you can set a [temporary `PGPASSWORD` variable](https://www.postgresql.org/docs/current/libpq-envars.html): `PGPASSWORD=abc123 && pg_restore ...`

## Table Prefixes

The [`tablePrefix` setting](/5.x/reference/config/db.html#tableprefix) (and the corresponding `CRAFT_DB_TABLE_PREFIX` environment variable) are not supported on Cloud.

Run `php craft db/drop-table-prefix` in a local environment before importing your data into Cloud to rename the tables. After doing so, you should unset `tablePrefix` in `db.php` and remove `CRAFT_DB_TABLE_PREFIX` from your `.env`.

## Tips

Here are some common sources of issues when backing up or restoring databases.

### Craft’s `backupCommand`

Using a custom [`backupCommand` config setting](/5.x/reference/config/general.html#backupcommand) can lead to unreliable backups. Be sure to check `general.php` _and_ your `.env` file for a `CRAFT_BACKUP_COMMAND` environment override! Try the default command and [reach out to support](craftcom:contact) if you still get malformed backups.

### Backing up without Craft

Craft (and Cloud) automatically determine the correct command and options for the configured driver when backing up your database—but if you only have access to a database (and not a functional Craft installation), you can still approximate Craft’s behavior.

For MySQL, run this command:

```bash
mysqldump \
    # Connection info:
    --host={host} \
    --port={port} \
    --user={username} \
    --password={password} \
    # Additional flags:
    --no-autocommit \
    --add-drop-table \
    --comments \
    --create-options \
    --dump-date \
    --routines \
    --set-charset \
    --triggers \
    --no-tablespaces \
    --quote-names \
    --set-gtid-purged=off \
    --quick \
    --single-transaction \
    --ignore-table=mydbname.cache \
    --ignore-table=mydbname.phpsessions \
    # Database name (passed as an argument, not an option):
    {database} \
    > path/to/backup.sql
```

Postgres users should use `pg_dump`’s `custom` format for consistency:

```bash
pg_dump \
    # Connection info:
    --host="{hostname}" \
    --username="{username}" \
    --dbname="{database}" \
    --password \
    # Additional flags:
    --format=custom \
    --schema=public \
    --exclude-table=public.cache \
    --exclude-table=public.phpsessions \
    > path/to/backup.sql
```

Note that in both cases, we ignore the `cache` and `phpsessions` tables. Cloud will recreate these if necessary during your next deployment, and they are not typically necessary in local development.
