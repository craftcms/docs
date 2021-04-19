# Importing Backups into Nitro

Nitro includes a handy way to import backup files from a MySQL or PostgreSQL backup using the [`db import`](commands.md#db-import) command.

Nitro supports importing both regular `.sql` files as well as `.gz` and `.zip`. If the file is compressed Nitro will handle decompressing the file.

To import a database from a backup, run the following commands:

```bash
$ nitro db import my-backup.sql
```

::: tip
If the backup file is not compressed, Nitro will determine the type of database and narrow down the selection automatically. Why would you want to import a mysql backup into a postgres database?
:::

If Nitro was able to detect the backup type, it will prompt you to import only those types, otherwise it will present you a list of engines to import the database into.

```bash
  … detecting backup type ✓
Detected postgres backup
```

::: tip
Nitro supports [multiple database](multiple-databases.md) versions of the same type and/or version to run at the same time.
:::

Next you will be prompted for the new database to create and import the backup into.

```bash
Enter the database name: tutorial
Preparing import…
  … importing database "tutorial" into "postgres-13-5432.database.nitro" ✓
Imported database "tutorial" took 2.00 seconds 💪...
```

Nitro has successfully imported your backup and you are you are now able to get back to work!

## Complete Example

```bash
$ nitro db import my-backup.sql
  … detecting backup type ✓
Detected postgres backup
Enter the database name: tutorial
Preparing import…
  … importing database "tutorial" into "postgres-13-5432.database.nitro" ✓
Imported database "tutorial" took 2.00 seconds 💪...
```
