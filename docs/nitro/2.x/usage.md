# Project Setup

Setting up sites and working with databases after you’ve [installed](installation.md) Nitro.

## Setting Up Sites

Nitro needs a few things in order to set up a site:

- A container needs to be added to serve your site.
- The container has to mount a local folder with your sites code.
- Your system’s `hosts` file needs to be updated to associate your site’s hostname with Nitro.

### Adding a Site with `nitro add`

You can navigate to an existing project folder and add a site for it using the [`add`](commands.md#add) command:

```bash
$ cd /path/to/project
$ nitro add
Adding site…
Enter the hostname [mysite.test]:
  ✓ setting hostname to mysite.test
  ✓ adding site ~/dev/support/mysite.test
Enter the webroot for the site [web]:
  ✓ using webroot web
Choose a PHP version:
  1. 8.0
  2. 7.4
  3. 7.3
  4. 7.2
  5. 7.1
  6. 7.0
Enter your selection: 2
  ✓ setting PHP version 7.4
  … saving file ✓
Site added 🌍
Apply changes now [Y/n]? y
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking mounts…
  … checking ~/dev/craftcms/cms-3 ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test ✓
Checking proxy…
  … updating proxy ✓
Modifying hosts file (you might be prompted for your password)
Adding sites to hosts file…
  … modifying hosts file ✓
Nitro is up and running 😃
```

### Creating a New Site with `nitro create`

The [`add`](commands.md#add) command establishes a site from an existing project, but you can use [`create`](commands.md#create) to initialize a brand new project *and* create a site for it.

By default it sets up a Craft CMS project just like you’d get running `composer create-project craftcms/craft my-project` to get a fresh [Craft installation](/3.x/installation.md).

Below we’ll install Craft in a new `tutorial/` directory with `tutorial.nitro` as its hostname:

```bash
$ nitro create tutorial
Downloading https://github.com/craftcms/craft/archive/HEAD.zip ...
  … setting up project ✓
New site downloaded 🤓
Enter the hostname [tutorial.nitro]:
  ✓ setting hostname to tutorial.nitro
  ✓ adding site ~/dev/tutorial
Enter the webroot for the site [web]:
  ✓ using webroot web
Choose a PHP version:
  1. 8.0
  2. 7.4
  3. 7.3
  4. 7.2
  5. 7.1
  6. 7.0
Enter your selection: 1
  ✓ setting PHP version 8.0
Add a database for the site [Y/n]
Select the database engine:
  1. mysql-8.0-3306.database.nitro
  2. postgres-13-5432.database.nitro
Enter your selection: 2
Enter the new database name: tutorial
  … creating database tutorial ✓
Database added 💪
Should we update the env file? [Y/n] y
.env updated!
  … checking /Users/oli/dev/tutorial/composer.json ✓
No lock file found. Updating dependencies instead of installing from lock file. Use composer update over composer install if you do not have a lock file.
Loading composer repositories with package information
Updating dependencies
Lock file operations: 87 installs, 0 updates, 0 removals
# removed for brevity
```

`nitro create` performs the following steps:

1. Creates a project using the latest [`craftcms/craft`](https://github.com/craftcms/craft) boilerplate from GitHub.
2. Creates the `tutorial` directory and copies the `craftcms/craft` contents into it.
3. Prompts for the new Nitro site’s hostname.
4. Prompts for the site’s PHP version.
5. Copies `.env.example` to `.env`.
6. Prompts for database creation. If you choose to create a database, you’ll be prompted for its name and Nitro will offer to update the `.env` database settings automatically.
7. Installs Composer dependencies using [`nitro composer`](commands.md#composer).
9. Prompts you to run [`nitro apply`](commands.md#apply) in order to update Nitro’s settings and your hosts file.

::: tip
You can pass your own repository to `nitro create` and use that as the scaffold:

```sh
nitro create https://github.com/craftcms/demo my-project
```
:::

### Mounting Your Entire Development Folder

If you manage all your projects within a single dev folder, you can mount that folder once within Nitro and point each site’s web root to the relevant sub-directory within it.

Open your `~/.nitro/nitro.yaml` file in a text editor (or run the [`edit`](commands.md#edit) command), and add sites that each point their `path` setting to your dev folder.

Pretend you use a `dev` directory that lives in your home folder, with each project in a subdirectory:

```treeview
~/dev/
├── happy-lager/
│   ├── ...
│   └── web/
├── spoke-and-chain/
│   ├── ...
│   └── web/
└── starter-blog/
    ├── ...
    └── web/
```

You can point to the dev folder for every site’s `path`, with a specific `webroot` for each one:

```yaml{3,4,8,9,13,14}
sites:
 - hostname: happylager.nitro
   path: ~/dev
   webroot: happy-lager/web
   version: "7.4"
   xdebug: false
 - hostname: spokeandchain.nitro
   path: ~/dev
   webroot: spoke-and-chain/web
   version: "7.4"
   xdebug: false
 - hostname: starterblog.nitro
   path: ~/dev
   webroot: starter-blog/web
   version: "7.4"
   xdebug: false
```

Run `nitro apply` to apply your `nitro.yaml` changes.

::: tip
If you have a large number of files in the development folder, it may be more performant to mount sites individually using `nitro add`.
:::

::: warning
If your projects contain any symlinks, such as `path` Composer repositories, those symlinks **must** be relative (`../`), not absolute (`/` or `~/`).
:::

## Adding Site Aliases

If you need a given site to have more than one domain name associated with it, as you might with a [multi-site Craft install](/3.x/sites.md) for example, you can add any number of domain aliases with the [`alias`](commands.md#alias) command.


If we wanted the project at `spokeandchain.nitro` to also be available at `en.spokeandchain.nitro` and `fr.spokeandchain.nitro`, for example, we would add those domains as aliases like this:

```
$ nitro alias
 Select a site:
  1. happylager.nitro
  2. spokeandchain.nitro
  3. starterblog.nitro
Enter your selection: 2
No existing aliases are set for spokeandchain.nitro
Enter the alias domain for the site (use commas to enter multiple): en.spokeandchain.nitro,fr.spokeandchain.nitro
Adding aliases:
   en.spokeandchain.nitro
   fr.spokeandchain.nitro
Apply changes now [Y/n] y
```

## Connecting to the Database

To connect to the machine from a Craft install, set the following environment variables in your `.env` file:

```
DB_USER="nitro"
DB_PASSWORD="nitro"
# `nitro` is the default database
DB_DATABASE="nitro"
```

Use the [`context`](commands.md#context) command to get the database hostname:

```{23}
$ nitro context
Craft Nitro 2.0.0-alpha

Configuration:   /Users/oli/.nitro/nitro.yaml

Sites:
  hostname:  happylager.nitro
  php:   7.4
  webroot:   happy-lager/web
  path:  ~/dev
  ---
  hostname:  spokeandchain.nitro
  php:   7.4
  webroot:   spoke-and-chain/web
  path:  ~/dev
  ---
  hostname:  starterblog.nitro
  php:   7.4
  webroot:   starter-blog/web
  path:  ~/dev
  ---
Databases:
  engine:    mysql 5.7  hostname: mysql-5.7-3306.database.nitro
  username:  nitro  password: nitro
  port:  3306
  ---
  engine:    postgres 12    hostname: postgres-12-5432.database.nitro
  username:  nitro  password: nitro
  port:  5432
  ---
```

Then from your SQL client of choice, create a new database connection with the following settings:

- **Host**: hostname from [`nitro context`](commands.md#context).
- **Port**: Database port. (3306 for MySQL or 5432 for PostgreSQL by default).
- **Username**: `nitro`
- **Password**: `nitro`

::: tip
Your `.env` file may need different connection settings than your host machine. Use the engine’s default port in your `.env` file, and any custom port on your host machine. See [How Nitro Works](how-nitro-works.md#databases) for more.
:::

## Adding a Database

Nitro creates its initial `nitro` database for you. You can add as many databases as you’d like running the following command, which will prompt for your desired database engine and name:

```bash
$ nitro db add
```

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

Run `nitro apply` to apply your `nitro.yaml` changes.
