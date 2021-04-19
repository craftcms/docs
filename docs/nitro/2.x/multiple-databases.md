# Running Multiple Databases

You can configure Nitro to run multiple database engines and versions, whether it’s for different projects you work with or testing your plugin’s database support.

When running [`init`](commands.md#init) for the first time, Nitro will ask you if you want to use MySQL and PostgreSQL. If you entered `yes` to both, your config file will look something like this:

```yaml
databases:
  - engine: mysql
    version: "8.0"
    port: "3306"
  - engine: postgres
    version: "13"
    port: "5432"
```

::: tip
Nitro also supports [MariaDB](https://mariadb.org/). Change the engine to `mariadb` and use [a supported version tag](https://hub.docker.com/_/mariadb/).
:::

If we wanted to run MySQL 5.7 in addition to the initially-configured MySQL 8.0, we could use the [`edit`](commands.md#edit) command and add the engine to `nitro.yaml`:

```yaml{5-7}
databases:
  - engine: mysql
    version: "8.0"
    port: "3306"
  - engine: mysql
    version: "5.7"
    port: "33061"
  - engine: postgres
    version: "13"
    port: "5432"
```

We’ve specified port `33061` above—and not the default `3306`—because MySQL 8.0 is already running on that port and each database must have its own.

Running [`apply`](commands.md#apply) will create the new database container and prompt you to update your hosts file.

::: tip
Not sure what port to use? Run the [`portcheck`](commands.md#portcheck) command to see if a given port is available on your host machine.
:::

