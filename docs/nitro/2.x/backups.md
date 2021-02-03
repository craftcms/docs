# Backing Up Databases

Nitro provides a handy way to backup a database using the [`db backup`](commands.md#db-backup).

To backup an existing database, run the `db backup` command:

```bash
$ nitro db backup
```

If you have [more than one database engines](multiple-databases.md) you’ll be prompted to select one:

```bash
Getting ready to backup…
Which database engine?
  1. mysql-8.0-3306.database.nitro
  2. postgres-13-5432.database.nitro
Enter your selection: 2
```

Nitro will now look at all the available databases and prompt you to select one to back up:

```bash
Which database should we backup?
  1. postgres
  2. nitro
  3. plugins
Enter your selection: 3
```

Nitro will back up the database and save it to your host machine’s `~/.nitro/backups` directory:

```bash
Preparing backup…
  … creating backup plugins-2021-01-31-160219.sql ✓
Backup saved in /Users/oli/.nitro/backups/postgres-13-5432.database.nitro 💾
```

## Complete Example

```bash
$ nitro db backup
Getting ready to backup…
Which database engine?
  1. mysql-8.0-3306.database.nitro
  2. postgres-13-5432.database.nitro
Enter your selection: 2
Which database should we backup?
  1. postgres
  2. nitro
  3. plugins
Enter your selection: 3
Preparing backup…
  … creating backup plugins-2021-01-31-160219.sql ✓
Backup saved in /Users/oli/.nitro/backups/postgres-13-5432.database.nitro 💾
```
