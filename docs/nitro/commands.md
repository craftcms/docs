# Commands

## `apply`

Ensures that the machine exists, and applies any changes in its config file to it.

```bash
nitro apply [<options>]
```

##### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--skip-hosts`
: Skips updating the `hosts` file.

##### Example

```bash
$ nitro apply
There are 2 mounted directories and 1 new mount(s) in the config file.
Applied changes from nitro.yaml.
```

## `add`

Adds a new site to the machine.

```bash
nitro add [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--hostname`
: The hostname to use for accessing the site. If not passed, the command will prompt for it.

`--webroot`
: The relative path to the site’s webroot. If not passed, the command will prompt for it.

`--skip-hosts`
: Skips updating the `hosts` file.

#### Example

```bash
$ cd /path/to/project
$ nitro add
Enter the hostname [plugins-dev] example.test
Enter the webroot [web]
Added plugins-dev to config file.
Apply changes from config? [yes]
Mounting /path/to/project to nitro-dev
Adding site example.test to nitro-dev
Applied changes from /Users/vin/.nitro/nitro-dev.yaml
Editing your hosts file
Password: ******
```

## `context`

Shows the machine’s configuration.

```bash
nitro context [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro context
Machine: nitro-dev
------
php: "7.4"
cpus: "1"
disk: 40G
memory: 4G
mounts:
- source: ~/sites/demo-site
  dest: /home/ubuntu/sites/demo-site
databases:
- engine: mysql
  version: "5.7"
  port: "3306"
- engine: postgres
  version: "12"
  port: "5432"
sites:
- hostname: demo-site
  webroot: /home/ubuntu/sites/demo-site/web
------
```

## `db add`

Create a new database on a database engine in a machine.

```bash
nitro db add [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db add
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine [1] 2
Enter the name of the database: mynewproject
Added database "mynewproject" to "mysql_5.7_3306".
```

## `db backup`

Backup one or all databases from a database engine in a machine. 

```bash
nitro db backup [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db backup
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine [1] 
  1 - all-dbs
  2 - postgres
  3 - nitro
  4 - project-one
Select database to backup? [1] 
Created backup "all-dbs-200519_100730.sql", downloading...
Backup completed and stored in "/Users/vin/.nitro/backups/nitro-dev/postgres_11_5432/all-dbs-200519_100730.sql"
```

## `db import`

Import a SQL file into a database engine in a machine. You will be prompted with a list of running database engines
(MySQL and PostgreSQL) to import the file into.

```bash
nitro db import <file> [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db import mybackup.sql
  1 - mysql_5.7_3306
  2 - postgres_11_5432
Select database engine [1] 
Enter the database name to create for the import: new-project
Uploading "mybackup.sql" into "nitro-dev" (large files may take a while)...
Successfully import the database backup into new-project
```

## `db remove`

Will remove a database from a database engine in a machine, but not from the config file.

```bash
nitro db remove [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db remove
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine: [1] 
  1 - nitro
  2 - project-one
 
Are you sure you want to permanently remove the database nitro? [no] 
Removed database nitro
```

## `db restart`

Will restart a database engine in a machine.

```bash
nitro db restart [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db restart
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine to restart: [1]  
Restarted database engine postgres_11_5432
```

## `db start`

Will start a stopped database engine in a machine.

```bash
nitro db start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db start
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine to start: [1]  
Started database engine postgres_11_5432
```

## `db stop`

Will stop a database engine in a machine.

```bash
nitro db stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro db stop
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine to stop: [1]
Stopped database engine postgres_11_5432
```

## `destroy`

Destroys a machine.

```bash
nitro destroy [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--clean`
: Remove the configuration file after destroying the machine. Defaults to `false`.

`--skip-hosts`
: Skips updating the `hosts` file.


## `edit`

Edit allows you to quickly open your machine configuration to make changes.

```bash
nitro edit [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

#### Example

```bash
nitro edit
```

::: tip
If you’re running macOS or Linux, you can set an `EDITOR` environment variable in `~/.bash_profile` to your preferred text editor of choice.

```bash
export EDITOR="/Applications/Sublime Text.app/Contents/MacOS/Sublime Text"
```

After adding that line, restart your terminal or run `source ~/.bash_profile` for the change to take effect.

Alternatively, you can open the configuration file using your operating system’s default text editor for `.yaml` files by running this command:

```bash
open ~/.nitro/nitro-dev.yaml
```

(Replace `nitro-dev` with the appropriate machine name if it’s not that.)
:::

## `info`

Shows the _running_ information for a machine like the IP address, memory, disk usage, and mounts.

```bash
nitro info [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro info
Name:           nitro-dev
State:          Running
IPv4:           192.168.64.48
Release:        Ubuntu 18.04.4 LTS
Image hash:     2f6bc5e7d9ac (Ubuntu 18.04 LTS)
Load:           0.09 0.15 0.22
Disk usage:     2.7G out of 38.6G
Memory usage:   379.8M out of 3.9G
Mounts:         /Users/vin/sites/demo-site => /home/ubuntu/sites/demo-site
                    UID map: 501:default
                    GID map: 20:default
```

## `init`

Initializes a machine.

```bash
nitro init [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to use. If not passed, the command will prompt for it.

`--cpus`
: The max number of CPUs that the machine can use. If not passed, Nitro will try to determine the best number based on the host computer.

`--memory`
: The max amount of system RAM that the machine can use. If not passed, the command will prompt for it.

`--disk`
: The max amount of disk space that the machine can use. If not passed, the command will prompt for it.


If the machine already exists, it will be reconfigured.

## `install composer`

Install composer inside of a virtual machine.

```bash
nitro install composer
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro install composer
Composer is now installed on "nitro-dev".
```

## `install mysql`

This will add a new MySQL database engine.

```bash
nitro install mysql
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro install mysql
Enter the MySQL version to install: 5.6
Enter the MySQL port number: 3306
Adding MySQL version "5.6" on port "3306"
Apply changes from config now? [yes]
```

## `install postgres`

This will add a new PostgreSQL database engine. 

```bash
nitro install postgres
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro install postgres
Enter the PostgreSQL version to install: 11
Enter the MySQL port number: 5432
Adding MySQL version "11" on port "5432"
Apply changes from config now? [yes]
```

## `keys`

Import SSH keys intro a virtual machine for use with Composer, git, etc.

```bash
nitro keys [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```bash
$ nitro keys
  1 - id_rsa
  2 - personal_rsa
Select the key to add to "nitro-dev"? [1]
Transferred the key "id_rsa" into "nitro-dev".
```

## `logs`

Views the machine’s logs. This command will prompt you for a type of logs to view, including e.g. `nginx`,
`database`, or `docker` (for a specific container).

```bash
nitro logs [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `redis`

Starts a Redis shell.

```bash
nitro redis [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `remove`

Removes a site from the machine.

```bash
nitro remove [<options>]
```

You will be prompted to select the site that should be removed. If the site has a corresponding
[mount](#adding-mounts) at `/home/ubuntu/sites/<hostname>`, the mount will be removed as well.

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `rename`

Rename a site in a configuration file. Will prompt for which site to rename.

```bash
nitro rename [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `restart`

Restarts a machine.

```bash
nitro restart [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `self-update`

Perform updates to the Nitro CLI.

```bash
nitro self-update
```

::: warning
This command does not work on Windows. You will need to perform a [manual installation.](https://github.com/craftcms/nitro/blob/master/README.md#installation)
:::

## `ssh`

Tunnels into the machine as the default `ubuntu` user over SSH.

```bash
nitro ssh [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `start`

Starts the machine.

```bash
nitro start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `stop`

Stops the machine.

```bash
nitro stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `update`

Performs system updates (e.g. `sudo apt get update && sudo apt upgrade -y`).

```bash
nitro update [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `version`

Checks the currently version of nitro against the releases and shows any updated versions.

```bash
nitro version
```

## `xdebug on`

Enables Xdebug, which is installed and disabled by default on each machine.

```bash
nitro xdebug on [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to enable Xdebug for.


This ensures Xdebug is installed for PHP and enables it:

## `xdebug off`

Disables Xdebug on a machine.

```bash
nitro xdebug off [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to disable Xdebug for.

