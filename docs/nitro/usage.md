# Project Setup

## Adding Sites

To add a site to Nitro, three things need to happen:

- Your project files need to be [mounted](#adding-mounts) into the Nitro machine.
- The web server within your Nitro machine needs to be configured to serve your site.
- Your system’s `hosts` file needs to be updated to associate your site’s hostname with Nitro.

### Add a site with `nitro add`

If your project files are completely contained within a single folder, then you can quickly accomplish these using
the [`add`](#add) command:

```bash
$ cd /path/to/project
$ nitro add
Enter the hostname [plugins-dev] example.test
Enter the webroot [web]
Added plugins-dev to config file.
Apply changes from config? [yes]
Mounting /path/to/project to nitro-dev
Adding site example.test to nitro-dev
Applied changes from /Users/oli/.nitro/nitro-dev.yaml
Editing your hosts file
Password: ******
```

::: tip
Multipass requires Full Disk Access on macOS. If you’re seeing mount “not readable” issues, ensure `multipassd` is checked under System Preferences → Security & Privacy → Privacy → Full Disk Access.
:::

### Mounting your entire dev folder at once

If you manage all of your projects within a single dev folder, you can mount that entire folder once within Nitro, and point your sites’ web roots to the appropriate folders within it.

To do that, open your `~/.nitro/nitro-dev.yaml` file in a text editor (or run the [`edit`](commands.md#edit) command), and add a new mount for the folder that contains all of your projects, plus list out all of your sites you wish to add to Nitro within that folder:

```yaml
mounts:
 - source: ~/dev
   dest: /home/ubuntu/sites
sites:
 - hostname: example1.test
   webroot: /home/ubuntu/sites/example1.test/web
 - hostname: example2.test
   webroot: /home/ubuntu/sites/example2.test/web
```

Then run `nitro apply` to apply your `nitro.yaml` changes to the machine.

::: tip
To avoid permission issues, we recommend you always mount folders into `/home/ubuntu/*` within the machine.
:::

::: warning
If your projects contain any symlinks, such as `path` Composer repositories, those symlinks **must** be relative (`../`), not absolute (`/` or `~/`).
:::

### Using Nitro with ngrok

If you’re using [ngrok](https://ngrok.com/) to create a public tunnel to a Nitro site, you can use the `-host-header` option like this:

```
$ ngrok http -host-header=example1.test example1.test:80
```

With a paid ngrok plan you may also set a custom hostname:

```
$ ngrok http -hostname=my-hostname.ngrok.io -host-header=example1.test example1.test:80
```

## Connecting to the Database

To connect to the machine from a Craft install, set the following environment variables in your `.env` file:

```
DB_USER="nitro"
DB_PASSWORD="nitro"
# `nitro` is the default database
DB_DATABASE="nitro"
```

To connect to the database from your host operating system, you’ll first need to get the IP address of your Nitro machine. You can find that by running the [info](#info) command.

```
$ nitro info
Name:           nitro-dev
State:          Running
IPv4:           192.168.64.2
Release:        Ubuntu 20.04 LTS
Image hash:     2f6bc5e7d9ac (Ubuntu 20.04 LTS)
Load:           0.71 0.74 0.60
Disk usage:     2.7G out of 38.6G
Memory usage:   526.4M out of 3.9G
```

Then from your SQL client of choice, create a new database connection with the following settings:

- **Host**: _The `IPv4` value from `nitro info`_
- **Port**: _The port you configured your database with (3306 for MySQL or 5432 for PostgreSQL by default)._
- **Username**: `nitro`
- **Password**: `nitro`

## Adding a Database

Nitro creates its initial `nitro` database for you. You can add as many databases as you’d like running the following command, which will prompt for your desired database engine and name:

```bash
$ nitro db add
```

## Adding Mounts

Nitro can mount various system directories into your Nitro machine. You can either mount each of your projects’
root directories into Nitro individually (as you’d get when [adding a site with `nitro
add`](#add-a-site-with-nitro-add)), or you can mount your entire development folder, or some combination of the two.

To add a new mount, follow these steps:

1. Open your `~/.nitro/nitro.yaml` file in a text editor, and add the new mount:

   ```yaml
   mounts:
     - source: /Users/oli/dev
       dest: /home/ubuntu/sites
   ```

2. Run `nitro apply` to apply the `nitro.yaml` change to the machine.

Once that’s done, you should be able to tunnel into your machine using the [`ssh`](#ssh) command, and see the
newly-mounted directory in there.

## Running Multiple Machines

You can have Nitro manage more than just your primary machine (`nitro-dev`) if you want. For example, you could
create a machine for a specific dev project.

To create a new machine, run the following command:

```bash
$ nitro init -m my-machine
```

Replace `my-machine` with the name you want to give your new machine. Machine names can only include letters,
numbers, underscores, and hyphens.

This command will run through the same prompts you saw when creating your primary machine after you first installed
Nitro. Once it’s done, you’ll have a new Multipass machine, as well as a new configuration file for it at
`~/.nitro/my-machine.yaml`.

All of Nitro’s [commands](commands.md) accept an `-m` option, which you can use to specify which machine the command
should be run against. (`nitro-dev` will always be used by default.)

## Adding Multiple Database Engines

To run multiple database engines on the same machine, open your `~/.nitro/nitro-dev.yaml` file in a text editor (or
run the [`edit`](commands.md#edit) command), and list additional databases under the `databases` key:

```yaml
databases:
 - engine: mysql
   version: "5.7"
   port: "3306"
 - engine: mysql
   version: "5.6"
   port: "33061"
 - engine: postgres
   version: "11"
   port: "5432"
```

::: warning
Each database engine needs its own unique port.
:::

Run `nitro apply` to apply your `nitro.yaml` changes to the machine.
