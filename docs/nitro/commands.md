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

```
$ nitro apply
There are 2 mounted directories and 1 new mount(s) in the config file.
Applied changes from nitro.yaml.
```

## `add`

Adds a new site to the machine.

```
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

## `apply`

Ensures the machine exists and applies any config changes to it.

```
nitro apply [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--skip-hosts`
: Skips updating the `hosts` file.

#### Example

```
$ nitro apply
There are 2 mounted directories and 1 new mount(s) in the config file.
Applied changes from nitro.yaml.
```

## `completion`

## `context`

Shows the machine’s configuration.

```
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

Creates a new database on a database engine in a machine.

```bash
nitro db add [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro db add
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine [1] 2
Enter the name of the database: mynewproject
Added database "mynewproject" to "mysql_5.7_3306".
```

## `db backup`

Backs up one or all databases from a database engine in a machine.

```
nitro db backup [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
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

Imports an SQL file into a database engine in a machine. You’ll be prompted with a list of running database engines
(MySQL and PostgreSQL) that should receive the import.

```
nitro db import <file> [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro db import mybackup.sql
  1 - mysql_5.7_3306
  2 - postgres_11_5432
Select database engine [1] 
Enter the database name to create for the import: new-project
Uploading "mybackup.sql" into "nitro-dev" (large files may take a while)...
Successfully import the database backup into new-project
```

## `db remove`

Removes a database from a database engine in a machine, but not from the config file.

```bash
nitro db remove [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
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

Restarts a database engine in a machine.

```
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

Starts a stopped database engine in a machine.

```
nitro db start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro db start
  1 - postgres_11_5432
  2 - mysql_5.7_3306
Select database engine to start: [1]  
Started database engine postgres_11_5432
```

## `db stop`

Stops a database engine in a machine.

```
nitro db stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
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

Opens your machine configuration file in your default editor for quickly making changes.

```
nitro edit [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

#### Example

```
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

Shows machine details like its IP address and PHP version.

```
nitro info [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro info
$ nitro info
Nitro installed, ready for something incredible at 192.168.64.21.

Add a project with "nitro add <directory>".

Server Information
-------------------------
IP address: 192.168.64.21
PHP version: 7.4

Need help setting up Xdebug?
https://github.com/craftcms/nitro/blob/master/XDEBUG.md

Need help using Nitro? 
https://github.com/craftcms/nitro/blob/master/README.md
```

## `init`

Initializes a machine.

```
nitro init [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to use. If omitted, the command will prompt for it.

`--cpus`
: The max number of CPUs the machine can use. If omitted, Nitro will try to determine the best number based on the host computer.

`--memory`
: The max amount of system RAM the machine can use. If omitted, the command will prompt for it.

`--disk`
: The max amount of disk space the machine can use. If omitted, the command will prompt for it.


If the machine already exists, it will be reconfigured.

## `install composer`

Installs composer inside a virtual machine.

```
nitro install composer
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro install composer
Composer is now installed on "nitro-dev".
```

## `install mysql`

Adds a new MySQL database engine.

```
nitro install mysql
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro install mysql
Enter the MySQL version to install: 5.6
Enter the MySQL port number: 3306
Adding MySQL version "5.6" on port "3306"
Apply changes from config now? [yes]
```

## `install postgres`

Adds a new PostgreSQL database engine.

```
nitro install postgres
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro install postgres
Enter the PostgreSQL version to install: 11
Enter the MySQL port number: 5432
Adding MySQL version "11" on port "5432"
Apply changes from config now? [yes]
```

## `keys`

Imports SSH keys into a virtual machine for use with Composer, git, etc.

```
nitro keys [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


#### Example

```
$ nitro keys
  1 - id_rsa
  2 - personal_rsa
Select the key to add to "nitro-dev"? [1]
Transferred the key "id_rsa" into "nitro-dev".
```

## `logs`

Displays the machine’s logs. This command will prompt you for a type of logs to view, including e.g. `nginx`,
`database`, or `docker` (for a specific container).

```
nitro logs [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `nginx restart`

Restarts nginx on a machine.

```
nitro nginx restart [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `nginx start`

Starts nginx on the machine.

```
nitro nginx start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `nginx stop`

Stops nginx on the machine.

```shell script
nitro nginx stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `php iniget`

Outputs PHP ini setting values.

```
nitro php iniget [<options>] <setting> 
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `php iniset`

Changes PHP ini settings from the command line. This command will prompt for the setting to change, including e.g. `max_execution_time`, `max_input_vars`, `max_input_time`, `max_file_upload`, `memory_limit`, `upload_max_filesize`.

```
nitro php iniset [<options>] <setting> <value> 
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `php restart`

Restarts PHP-FPM on the machine.

```
nitro php restart [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to restart. If omitted, the machine’s default PHP version is used.

## `php start`

Starts PHP-FPM on the machine.

```
nitro php start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to start. If omitted, the machine’s default PHP version is used.

## `php stop`

Stops PHP-FPM on the machine.

```shell script
nitro php stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version to stop. If omitted, the machine’s default PHP version is used.

## `redis`

Starts a Redis shell.

```
nitro redis [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `refresh`

Updates the Nitro CLI’s internal API. (This should be run after a self-update.)

## `remove`

Removes a site from the machine.

```
nitro remove [<options>]
```

You’ll be prompted to select the site that should be removed. If the site has a corresponding
[mount](usage.md#adding-mounts) at `/home/ubuntu/sites/<hostname>`, the mount will be removed as well.

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `rename`

Renames a site in a configuration file, prompting for which site should be renamed.

```
nitro rename [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `restart`

Restarts a machine.

```
nitro restart [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `self-update`

Updates the Nitro CLI.

```
nitro self-update
```

::: warning
This command does not work on Windows. You will need to perform a [manual installation](install.md).
:::

## `ssh`

Tunnels into the machine over SSH as the default `ubuntu` user.

```
nitro ssh [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `start`

Starts the machine.

```
nitro start [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `stop`

Stops the machine.

```
nitro stop [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

## `update`

Performs machine system updates (e.g. `sudo apt get update && sudo apt upgrade -y`).

```
nitro update [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.


## `version`

Checks the current version of Nitro against the releases and shows any updated versions.

```
nitro version
```

## `xdebug off` / `xoff`

Disables Xdebug on a machine.

```
nitro xoff [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version for which Xdebug should be disabled. If omitted, the machine’s default PHP version is used.

## `xdebug on` / `xon`

Enables Xdebug, which is installed and disabled by default on each machine.

```shell script
nitro xon [<options>]
```

#### Options

`-m`, `--machine`
: The name of the machine to use. Defaults to `nitro-dev`.

`--php-version`
: The PHP version for which Xdebug should be enabled. If omitted, the machine’s default PHP version is used.

Ensures Xdebug is installed for PHP and enables it.
