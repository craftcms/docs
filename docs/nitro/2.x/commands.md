# Commands

## `add`

Adds a new site.

```
nitro add <?path>
```

**Parameters**

`path`
: Optional target path for a site outside the current directory.

**Example**

Specifying a full path:

```
$ nitro add /path/to/project
```

Navigating to a project directory and adding it:

```
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

## `alias`

Add an alias domain to a site.

```
nitro alias
```

**Example**

```
$ nitro alias
 Select a site:
  1. plugins-dev.nitro
  2. tutorial.nitro
Enter your selection: 1
The following aliases are set for plugins-dev.nitro
   plugins.dev
Enter the alias domain for the site (use commas to enter multiple): plugins.nitro,playground.nitro
Adding aliases:
   plugins.nitro
   playground.nitro
Apply changes now [Y/n] y
```

## `apply`

Ensures all resources exist and applies any config changes to them.

```
nitro apply
```

**Options**

`--skip-hosts`
: Skips updating the `hosts` file. You can also set the environment variable "NITRO_EDIT_HOSTS" to "false" for this to apply globally.

**Example**

```
$ nitro apply
nitro apply
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
Nitro is up and running 😃
```

## `blackfire`

Enables and disables Blackfire for a site. Prompts for server ID and server token if they’ve not yet been saved as global settings in Nitro’s config.

### `blackfire on`

Enables Blackfire for a site.

```
nitro blackfire on <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.


### `blackfire off`

Disables Blackfire for a site.

```
nitro blackfire off <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

## `bridge`

Temporarily shares a Nitro site on a local network. Prompts you to select an existing IP address and site for sharing. See [Sharing Sites Locally](local-sharing.md).

```
nitro bridge <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```
$ nitro bridge
Which IP address should we use for the bridge?
  1. 192.168.0.103
  2. 192.168.0.110
Enter your selection: 1
Select a site:
  1. starterblog.nitro
  2. craftcms.nitro
  3. craftcom.nitro
  4. europa.nitro
Enter your selection: 1
bridge server listening on http://192.168.0.103:8000
```

## `clean`

Removes any unused containers.

```
nitro clean
```

**Example**

```
$ nitro clean
Cleaning up…
  … gathering details ✓
Nothing to remove 😅
```

## `completion`

Enables shell completion. You must pass either `bash` or `zsh` as an argument. (See examples.)

```
nitro completion <shell>
```

**Parameters**

`shell`
: Required: `bash` for Bash shell or `zsh` for Zsh shell.

**Zsh Example**

Enable Nitro shell completion for your current session:

```
$ source <(nitro completion zsh)
```

To enable Nitro shell completion for every Zsh session, you’ll first need to make sure shell completion is enabled for your environment. You can enable it by running this once:

```sh
$ echo "autoload -Uz compinit; compinit" >> ~/.zshrc
```

::: tip
The `autoload -Uz compinit; compinit` line should only appear once in your `~/.zshrc` file. You can safely remove any duplicates.
:::

With Zsh shell completion enabled, you can enable completion for Nitro in every session by executing the following once:

```sh
$ mkdir -p "${fpath[1]}"
$ nitro completion zsh > "${fpath[1]}/_nitro"
```

Start a new shell or `source ~/.zshrc` for this setup to take effect.

**Bash Example**

Enable Nitro shell completion for your current session:

```
$ source <(nitro completion bash)
```

Enable Nitro shell completion for every Bash session (only run this once!):

::: code
```sh Linux
$ nitro completion bash > /etc/bash_completion.d/nitro
```
```sh macOS
$ nitro completion bash > /usr/local/etc/bash_completion.d/nitro
```
:::

Start a new shell for this setup to take effect.

## `composer`

Runs Composer commands.

```
nitro composer <command>
```

**Parameters**

`command`
: Composer command to execute.

**Example**

```
$ nitro composer update

nitro composer update
Loading composer repositories with package information
Updating dependencies
Nothing to modify in lock file
Installing dependencies from lock file (including require-dev)
Nothing to install, update or remove
Generating optimized autoload files
45 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
composer update completed 🤘
```

## `context`

Shows configuration information.

```
nitro context
```

**Options**

`--yaml`
: Shows the config file as YAML.

**Example**

```
$ nitro context
Craft Nitro 2.0.0

Configuration:	 /Users/me/.nitro/nitro.yaml

Sites:
  hostname:	 mycraftsite.test
  php:	 7.4
  webroot:	 web
  path:	 ~/dev/support/mycraftsite.test
  ---
Databases:
  engine:	 mysql 8.0 	hostname: mysql-8.0-3306.nitro
  username:	 nitro 	password: nitro
  port:	 3306
  ---
  engine:	 postgres 13 	hostname: postgres-13-5432.nitro
  username:	 nitro 	password: nitro
  port:	 5432
  ---
```

## `container new`

Create a new custom container.

```
nitro container new
```

**Example**

```
$ nitro container new
What image are you trying to add? elasticsearch
Which image should we use?
  1. elasticsearch
  2. bitnami/elasticsearch
  3. bitnami/elasticsearch-exporter
  4. elastichq/elasticsearch-hq
  5. justwatch/elasticsearch_exporter
  6. taskrabbit/elasticsearch-dump
  7. lmenezes/elasticsearch-kopf
  8. blacktop/elasticsearch
  9. barnybug/elasticsearch
  10. elastic/elasticsearch
Enter your selection: 1
What tag should we use [latest]? 7.10.1
  … downloading docker.io/library/elasticsearch:7.10.1 ✓
Expose port `9200` on the host machine [Y/n]? y
Expose port `9300` on the host machine [Y/n]? y
Should we proxy one of the ports to expose a web based UI [Y/n]?
Which port should we use for the UI?
  1. 9200
  2. 9300
Enter your selection: 1
What is the name of the container [elasticsearch]?
Create a file to store environment variables [Y/n]?
Created environment variables file at "/Users/oli/.nitro/.elasticsearch"...
New container "elasticsearch.containers.nitro" added!
Apply changes now [Y/n]?
```

## `container ssh`

SSH into a custom container.

```
nitro container ssh
```

**Example**

```
$ nitro container ssh
Select a container to connect to:
  1. elasticsearch.containers.nitro
  2. rabbitmq.containers.nitro
Enter your selection: 2
root@5e98a85aef29:/#
```

## `container remove`

Removes a custom container, prompting you to select the container if you’ve added more than one using the [`container new`](#container-new) command.

```
nitro container remove
```

**Example**

```
$ nitro container remove
Select the custom container to remove:
  1. bitnami
  2. tutum
Enter your selection: 2
Apply changes now [Y/n]? Y
# ...
```

## `craft`

Runs a Craft console command.

```
nitro craft <command>
```

**Parameters**

`command`
: Craft command to execute.

**Example**

```
$ nitro craft migrate/all
Yii Migration Tool (based on Yii v2.0.38)

Migrated up successfully.
```

## `create`

Initializes and adds a new site. Pass the name of the directory that should be created with a fresh install of the [Craft Composer project](https://github.com/craftcms/craft), or a reference to your own repository followed by the directory name.

```
nitro create <?project> <path>
```

**Parameters**

`project`
: Optional GitHub shorthand or repository URL for a Composer starter project. Defaults to [craftcms/craft](https://github.com/craftcms/craft).

`path`
: Required directory to be created.

::: tip
You can create your own Composer package to jumpstart any PHP project!\
Nitro uses Composer’s [create-project](https://getcomposer.org/doc/03-cli.md#create-project) to check out a repository and run `composer install`. That project’s `composer.json` file can optionally include `post-create-project-cmd` scripts for any setup steps just like the Craft Composer project:

```javascript
// ...
"scripts": {
  "post-create-project-cmd": [
    "@php -r \"file_exists('.env') || copy('.env.example', '.env');\"",
    "@composer dump-autoload -o",
  ]
}
// ...
```

Read the [create-project](https://getcomposer.org/doc/03-cli.md#create-project) documentation for more.
:::

**Example**

```bash
# new default Craft site in `my-project/` directory
$ nitro create my-project

# new site from repository in `my-project/` directory
$ nitro create https://github.com/craftcms/demo my-project

# same as above using GitHub repository shorthand
$ nitro create craftcms/demo my-project
```

## `db add`

Adds a new database in the selected database engine.

```
nitro db add
```

**Example**

```
$ nitro db add
Select the database engine:
  1. postgres-13-5432.nitro
  2. mysql-8.0-3306.nitro
Enter your selection: 2
Enter the new database name: mydatabase
  … creating database mydatabase ✓
Database added 💪
```

## `db backup`

Backs up a database from the selected database engine.

```
nitro db backup
```

**Example**

```
$ nitro db backup
Getting ready to backup…
Which database engine?
  1. postgres-13-5432.nitro
  2. mysql-8.0-3306.nitro
Enter your selection: 2
Which database should we backup?
  1. nitro
  2. support
  3. test
Enter your selection: 2
Preparing backup…
  … creating backup support-2021-01-06-162231.sql ✓
Backup saved in /Users/me/.nitro/backups/mysql-8.0-3306.nitro 💾
```

## `db import`

Imports a database dump into the selected database engine and name. The SQL file to be imported may be plain text, or compressed with zip/gzip.

```
nitro db import <file>
```

::: tip
For uncompressed files, the command will detect and automatically select the database engine.
:::

**Parameters**

`file`
: Dump file to be imported. Can be a filename only, or a relative or absolute file path.

**Options**

`--name`
: Name of the database to receive the import. (Skips prompt.)

**Example**

Import an SQL dump:

```
$ nitro db import dump.sql
  … detecting backup type ✓
Detected postgres backup
Enter the database name: tutorial
Preparing import…
  … uploading backup dump.sql ✓
Imported database "tutorial" in 4.23 seconds 💪
```

Import an SQL dump specifying a `--name` option to skip the interactive prompt:

```
$ nitro db import dump.sql --name tutorial
  … detecting backup type ✓
Detected postgres backup
Preparing import…
  … uploading backup dump.sql ✓
Imported database "tutorial" in 4.23 seconds 💪
```

## `db remove`

Removes a database in the selected database engine.

```
nitro db remove
```

**Example**

```
$ nitro db remove
Which database engine?
  1. mysql-8.0-3306.nitro
  2. postgres-13-5432.nitro
Enter your selection: 1
Which datbase should we remove?
  1. nitro
  2. support
Enter your selection: 2
  … removing support ✓
Database removed 💪
```

## `db ssh`

Allows you to SSH into a database container.

```
nitro db ssh
```

**Example**

```
$ nitro db ssh
Select a database to connect to:
  1. postgres-13-5432.nitro
  2. mysql-8.0-3306.nitro
Enter your selection: 2
root@5e98a85aef29:/#
```

## `destroy`

Destroys all resources (networks, containers, and volumes).

```
nitro destroy
```

**Options**

`--clean`
: Remove the configuration file after destroying the resources. Defaults to `false`.

**Example**

```
$ nitro destroy
Are you sure (this will remove all containers, volumes, and networks) [Y/n] y
Removing Containers…
  … removing mysite.test ✓
  … removing mailhog.service.nitro ✓
  … creating backup postgres-2021-01-06-202905.sql ✓
  … creating backup nitro-2021-01-06-202905.sql ✓
Backups saved in /Users/me/.nitro/postgres-13-5432.nitro 💾
  … removing postgres-13-5432.nitro ✓
Backups saved in /Users/me/.nitro/mysql-8.0-3306.nitro 💾
  … removing mysql-8.0-3306.nitro ✓
  … removing nitro-proxy ✓
Removing Volumes…
  … removing mysql-8.0-3306.nitro ✓
  … removing postgres-13-5432.nitro ✓
  … removing nitro ✓
Removing Networks…
  … removing nitro-network ✓
Nitro destroyed ✨
```

## `disable`

Disables a Nitro service.

```
nitro disable <service>
```

**Parameters**

`service`
: Name of the service to be disabled.

**Example**

```
# disable mailhog
$ nitro disable mailhog

# disable minio
$ nitro disable minio

# disable dynamodb
$ nitro disable dynamodb
```

## `edit`

Opens your Nitro configuration file in your default editor for quickly making changes.

```
nitro edit
```

**Example**

```
$ nitro edit
```

::: tip
If you’re running macOS or Linux, you can set an `EDITOR` environment variable in `~/.bash_profile` (or `~/.zshrc` for ZSH) to your preferred text editor of choice.
:::

```
export EDITOR="/Applications/Sublime Text.app/Contents/MacOS/Sublime Text"
```

After adding that line, restart your terminal or run `source ~/.bash_profile` for the change to take effect.

Alternatively, you can open the configuration file using your operating system’s default text editor for `.yaml` files by running this command:

```
open ~/.nitro/nitro.yaml
```

## `enable`

Enables a Nitro service.

```
nitro enable <service>
```

**Parameters**

`service`
: Name of the service to be enabled.

**Example**

```
# enable mailhog
$ nitro enable mailhog

# enable minio
$ nitro enable minio

# enable dynamodb
$ nitro enable dynamodb
```

## `extensions`

Add additional PHP extensions for a site.

```
nitro extensions
```

**Example**

```
$ nitro extensions
Select a site: 
  1. craft-support.nitro
  2. another-site.nitro
  3. plugins-dev.nitro
Enter your selection: 1
Which PHP extension would you like to enable for craft-support.nitro?
  1. bcmath
  2. bz2
  3. calendar
  4. dba
  5. enchant
  6. exif
  7. gettext
  8. gmp
  9. imap
  10. interbase
  11. ldap
  12. mysqli
  13. oci8
  14. odbc
  15. pcntl
  16. pdo_dblib
  17. pdo_firebird
  18. pdo_oci
  19. pdo_odbc
  20. pdo_sqlite
  21. recode
  22. shmop
  23. snmp
  24. sockets
  25. sysvmsg
  26. sysvsem
  27. sysvshm
  28. tidy
  29. wddx
  30. xmlrpc
  31. xsl
  32. zend_test
Enter your selection: 3
Apply changes now [Y/n] n
```

## `help`

Display information about available console commands.

```
nitro help
```

**Example**

```
$ nitro help add
nitro help add
Add a site

Usage:
  nitro add [flags]

Examples:
  # add the current project as a site
  nitro add

  # add a directory as the site
  nitro add my-project

Flags:
  -h, --help   help for add
```

## `hosts`

Modifies your hosts file.

```
nitro hosts
```

**Options**

`--hostnames [strings]`
: A comma-seperated list of hostnames to add.

`--preview`
: Preview the changes to the host file without applying them.

`--remove`
: A comma-seperated list of hostnames to remove.

**Example**

```
$ sudo nitro hosts --hostnames test1.nitro,test2.nitro
Password:
Adding sites to hosts file…
  … modifying hosts file ✓
```

## `iniset`

Change PHP settings for a site.

```
nitro iniset <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```
$ nitro iniset
Select a site:
  1. craft-support.nitro
  2. another-site.nitro
  3. plugins-dev.nitro
Enter your selection: 1
Which PHP setting would you like to change for craft-support.nitro?
  1. display_errors
  2. max_execution_time
  3. max_input_vars
  4. max_input_time
  5. max_file_upload
  6. memory_limit
  7. opcache_enable
  8. opcache_revalidate_freq
  9. opcache_validate_timestamps
  10. post_max_size
  11. upload_max_file_size
Enter your selection: 3
What should the max input vars be [5000]? 6000
Apply changes now [Y/n] y
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.database.nitro ✓
  … checking postgres-13-5432.database.nitro ✓
Checking services…
  … checking dynamodb service ✓
  … checking mailhog service ✓
  … checking minio service ✓
  … checking redis service ✓
Checking sites…
  … checking craft-support.nitro - updating…
      … installing bcmath ✓
      … installing calendar ✓
  … checking another-site.nitro ✓
  … checking plugins-dev.nitro ✓
Checking proxy…
  … updating proxy ✓
```

## `init`

Initializes the Nitro environment.

```
nitro init
```

If the environment already exists, it will be reconfigured.

**Example**

```
$ nitro init
Checking Nitro…
  … creating network ✓
  … creating volume ✓
  … pulling image ✓
  … creating proxy ✓
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test ✓
Checking proxy…
  … updating proxy ✓
  … getting certificate for Nitro… ✓
Installing certificate (you might be prompted for your password)
Password:
  … cleaning up ✓
Nitro certificates are now trusted 🔒
Nitro is ready! 🚀
```

## `logs`

Displays all of your container logs.

```
nitro logs
```

**Options**

`--follow`
: Follow log output (defaults to true).

`--since`
: Show logs since timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes).

`--timestamps`
: Displays the timestamps in the logs.

**Example**

```
$ nitro logs
2021-01-07 22:46:26,644 INFO supervisord started with pid 1
2021-01-07 22:46:27,648 INFO spawned: 'nginx' with pid 8
2021-01-07 22:46:27,650 INFO spawned: 'php-fpm' with pid 9
nginx: [alert] could not open error log file: open() "/var/lib/nginx/logs/error.log" failed (13: Permission denied)
[07-Jan-2021 22:46:27] NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
[07-Jan-2021 22:46:27] NOTICE: [pool www] 'user' directive is ignored when FPM is not running as root
[07-Jan-2021 22:46:27] NOTICE: [pool www] 'group' directive is ignored when FPM is not running as root
[07-Jan-2021 22:46:27] NOTICE: [pool www] 'group' directive is ignored when FPM is not running as root
[07-Jan-2021 22:46:27] NOTICE: fpm is running, pid 9
[07-Jan-2021 22:46:27] NOTICE: ready to handle connections
2021-01-07 22:46:28,687 INFO success: nginx entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
2021-01-07 22:46:28,687 INFO success: php-fpm entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
```

## `ls`

Display your running containers.

```
nitro ls [<options>]
```

#### Options

`--custom`
: Show custom containers.

`--databases`
: Show databases.

`--proxy`
: Show proxy container.

`--services`
: Show services.

`--sites`
: Show sites.

#### Example

```
$ nitro ls
Hostname                                  Type              Status
mailhog.service.nitro                     site              running
mysql-8.0-3308.database.nitro             database          running
nitro-proxy                               proxy             running
postgres-13-5432.database.nitro           database          running
redis.service.nitro                       site              running
tutorial.nitro                            site              running
```

## `npm`

Run npm commands using the current directory in a container.

```
nitro npm <command>
```

**Parameters**

`command`
: The npm command to be executed.

**Example**

```
$ nitro npm install
  … checking /Users/oli/dev/docs/package.json ✓
  … pulling docker.io/library/node:14-alpine ✓
Running npm install
npm WARN eslint-plugin-node@10.0.0 requires a peer of eslint@>=5.16.0 but none is installed. You must install peer dependencies yourself.
npm WARN eslint-plugin-es@2.0.0 requires a peer of eslint@>=4.19.1 but none is installed. You must install peer dependencies yourself.
npm WARN eslint-plugin-standard@4.1.0 requires a peer of eslint@>=5.0.0 but none is installed. You must install peer dependencies yourself.

audited 2158 packages in 14.312s

101 packages are looking for funding
  run `npm fund` for details
npm install complete 🤘
```

## `php`

Execute a PHP command in a site’s container.

```
nitro php <command>
```

**Parameters**

`command`
: The PHP command to be executed.

**Example**

```
$ nitro php -v
Select a site:
  1. tutorial.nitro
  2. plugins-dev.nitro
Enter your selection: 2
PHP 8.0.2 (cli) (built: Feb 18 2021 00:32:13) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.2, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.2, Copyright (c), by Zend Technologies
    with Xdebug v3.0.3, Copyright (c) 2002-2021, by Derick Rethans
    with blackfire v1.51.0~linux-x64-non_zts80, https://blackfire.io, by Blackfire
```

## `portcheck`

Check if a port is available on your machine.

```
nitro portcheck <port>
```

**Parameters**

`port`
: The port number to check.

**Example**

```
$ nitro portcheck 8080
Port 8080 is available!

$ nitro portcheck 3306
Port 3306 is already in use...
```

## `queue`

Runs a Craft queue worker.

```
nitro queue
```

**Example**

```
$ nitro queue
Listening for queue jobs…
```

## `remove`

Removes a site.

```
nitro remove <?site>
```

::: tip
The `remove` command does not delete databases. If you’d like to remove a site’s database(s), see [`db remove`](#db-remove).
:::

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```
$ nitro remove
Apply changes now [Y/n]? y
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test ✓
Checking proxy…
  … updating proxy ✓
```

## `restart`

Restarts all containers.

```
nitro restart <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory. (Will only restart that site container.)

**Example**

```
$ nitro restart
Restarting Nitro…
  … restarting mysite.test ✓
  … restarting mailhog.service.nitro ✓
  … restarting postgres-13-5432.nitro ✓
  … restarting mysql-8.0-3306.nitro ✓
  … restarting nitro-proxy ✓
Nitro restarted 🎉
```

## `self-update`

Updates Nitro to the latest version.

```
nitro self-update
```

You’ll typically want to follow this with the [`nitro update`](#update) in order to update Nitro’s Docker containers to their latest versions.

::: tip
If you installed Nitro via package manager, you should use that instead. See [Updating](updating.md).
:::

**Example**

```
$ nitro self-update
Checking for updates
  … found version 2.0.6 updating ✓
Updating to Nitro 2.0.6!
```

## `share`

Allows you to share a local site.

```
nitro share <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```bash
$ nitro share
/app $

$ nitro share
Select a site:
  1. craft-support.nitro
  2. another-site.nitro
  3. plugins-dev.nitro
Enter your selection: 1
```

## `ssh`

Allows you to SSH into a container.

```
nitro ssh <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Options**

`--root`
: SSH into a container as the root user.

**Example**

```
$ nitro ssh
/app $

nitro ssh --root
using root… system changes are ephemeral…
/app #
```

## `start`

Starts all containers.

```
nitro start <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory. (Will only start the specified site container rather than all of them.)

**Example**

```
$ nitro start
Starting Nitro…
  ✓ mysite.test ready
  ✓ mailhog.service.nitro ready
  ✓ postgres-13-5432.nitro ready
  ✓ mysql-8.0-3306.nitro ready
  ✓ nitro-proxy ready
Nitro started 👍
```

## `stop`

Stops all containers.

```
nitro stop <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory. (Will only stop the specified site container rather than all of them.)

**Example**

```
$ nitro stop
Stopping Nitro…
  … stopping mysite.test ✓
  … stopping mailhog.service.nitro ✓
  … stopping postgres-13-5432.nitro ✓
  … stopping mysql-8.0-3306.nitro ✓
  … stopping nitro-proxy ✓
Nitro shutdown 😴
```

## `trust`

Trust SSL certificates for a site.

```
nitro trust
```

::: tip
Linux users may need to manually configure each web browser to [trust Nitro’s certificate](linux.md#trusting-nitros-certificate-in-browsers).
:::

**Example**

```
$ nitro trust
  … getting Nitro’s root site certificate ✓
Installing certificate (you might be prompted for your password)
Password:
  … cleaning up ✓
Nitro certificates are now trusted 🔒
```

## `update`

Updates Nitro's containers.

```
nitro update
```

**Example**

```
$ nitro update
Updating nitro…
  … updating nitro-proxy:2.0.0-alpha ✓
  … updating nginx:7.4-dev ✓
  … updating nginx:7.3-dev ✓
  … updating nginx:7.2-dev ✓
  … updating nginx:7.1-dev ✓
Images updated 👍, applying changes…
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test ✓
Checking proxy…
  … updating proxy ✓
```

## `validate`

Validates Nitro's configuration.

```
nitro validate
```

**Example**

```
$ nitro validate
Validating…
  … validating databases ✓
  … validating sites ✓
```

## `version`

Shows Nitro version information.

```
nitro version
```

**Example**

```
$ nitro version
View the changelog at https://github.com/craftcms/nitro/blob/2.0.7/CHANGELOG.md

Nitro CLI: 	   2.0.7
Nitro gRPC:    2.0.7
Docker API: 	 1.41 (1.12 min)
Docker CLI: 	 1.41

The Nitro CLI and gRPC versions do not match
You might need to run `nitro update`
```

## `xoff`

Disables Xdebug for a site.

```
nitro xoff <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```
$ nitro xoff
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test - updating… ✓
Checking proxy…
  … updating proxy ✓
```

## `xon`

Enables Xdebug for a site.

```
nitro xon <?site>
```

**Parameters**

`site`
: Optional hostname for an existing site, to be used instead of site prompt or current directory.

**Example**

```
$ nitro xon
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-8.0-3306.nitro ✓
  … checking postgres-13-5432.nitro ✓
Checking services…
  … checking mailhog service ✓
Checking sites…
  … checking mysite.test - updating… ✓
Checking proxy…
  … updating proxy ✓
```
