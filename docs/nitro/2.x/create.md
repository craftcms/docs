# Creating sites

Nitro includes the [`create`](commands.md#create) command to quickly scaffold new sites. The `create` command defaults to the equivalent of `composer create-project craftcms/craft my-project`.

To create a new site with nitro, run the following:

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
  … checking /Users/jasonmccallister/dev/tutorial/composer.json ✓
No lock file found. Updating dependencies instead of installing from lock file. Use composer update over composer install if you do not have a lock file.
Loading composer repositories with package information
Updating dependencies
Lock file operations: 87 installs, 0 updates, 0 removals
// removed for brevity
```

There is a lot happening here, but `nitro create` performs the following steps:

1. Creates a project using the latest `craftcms/craft` boilerplate from GitHub.
2. Created the `tutorial` directory and copied the `craftcms/craft` contents into the `tutorial` directory.
3. Suggested a hostname for the site using the directory name.
4. Asked which version of PHP the site should use.
5. Copied the `.env.example` to `.env`
6. Prompts the user to create a new database.
7. Since we said yes to creating a database, Nitro will prompt you to automaticall configure the `.env` with the correct database credentials.
8. The last step is to install composer dependencies. This does not rely on you having composer installed on your host machine and will instead use [`nitro composer`](commands.md#composer).
9. For the last step, Nitro will prompt you to run [`nitro apply`](commands.md#apply) to update the proxy and your hosts file for the new site.

The new site will be available at [https://tutorial.nitro](https://tutorial.nitro) and is now ready for installation!
