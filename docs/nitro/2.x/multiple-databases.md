# Running Multiple Databases

One of the advantages of running Docker is the ability to run multiple database versions and engines on the same machine using different ports.

::: tip
If you are developing plugins, this makes it really easy to test supported databases on same machine without much hassle. See the [developing plugins section](developing-plugins.md) for more details.
:::

When running [`init`](commands.md#init) for the first time, Nitro will ask you if you want to use MySQL and PostgreSQL. If you entered `yes` to both, your config file will look like the following:

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
We also support `mariadb` databases just change the engine to `mariadb` and the [version to a supported tag](https://hub.docker.com/_/mariadb/).
:::

If we wanted to add another version of MySQL, we can use the [`edit`](commands.md#edit) command to update our `nitro.yaml` file to look like the following:

```yaml
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

In the example we added MySQL 5.7 and assigned a different port (`33061`). Running [`apply`](commands.md#apply) will create the new database container and prompt you to update your hosts file.

::: tip
If you are unsure a port is available before use, you can use the [`portcheck`](commands.md#portcheck) to see if the port is available on your host machine.
:::

