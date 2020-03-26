# 1. Install Craft CMS

## Install Craft CMS with Composer

At this point you should have a local development environment running with a database and know how to run console commands. Now we’ll make sure Composer is installed.

### What’s Composer?

<BrowserShot url="https://getcomposer.org/" :link="true">
<img src="../../images/getcomposer.org.png" alt="Screenshot of getcomposer.org homepage" />
</BrowserShot>

Composer is a command line application with one important job: it makes sure a PHP project like our website has all the code it needs to run.

This code is split up into numerous _packages_ written by different authors. Our website depends on these packages—also referred to as _dependencies_—and each one provides a specific set of functionality. Composer makes sure every PHP package (including Craft CMS!) is installed, has the dependencies it needs to do its job, and that all these packages can work together without major conflicts.

Composer handles the complexity of combining these packages so we can use the best software available for each individual job the website needs to accomplish. This isn’t unique to Craft CMS—most modern PHP projects are built this way.

### Check your Composer version

Try running the following console command:

```bash
composer --version
```

You’ll see your current Composer version, or `command not found` if Composer is not installed.

If you’re using Composer 1.3.0 or higher, you’re ready to [Install Craft CMS via Composer](#install-craft-cms-via-composer). If you’re running a lower version or haven’t installed Composer, see [Composer’s install guide](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos).

::: tip
You may be able update your Composer version by runing `composer self-update`. If that doesn’t work, follow the installation instructions to install a newer version.
:::

### Install Craft CMS Files

Choose a new path on your computer where you’d like to install Craft CMS. It can be anywhere you’d like, we’re just going to create some new files and tell your web server where to find them.

We’ll tell Composer where to add these new files using an _absolute_ or _relative_ path:

- The full _absolute_ path is long and specific, like `/Users/bjorn/projects/tutorial` or `C:\Users\bjorn\projects\tutorial`.
- To use a _relative_ path, you first need to use the `cd` command and change your working directory to the existing parent folder. The relative path you provide will be within this working directory. If you’ve navigated to `/Users/bjorn/projects`, for example, you can simply pass Composer the value of `tutorial` to have that folder created.

Whichever option you choose, run the following command and substitute your desired path for `<Path>`:

```bash
composer create-project craftcms/craft <Path>
```

Composer will take a few minutes to download Craft CMS and all its dependencies, set up your project folders, and add a security key:

TODO: add animation of install process

Now we have all the files we need to actually install and start using Craft.

### Tour the site’s folder structure

Let’s open the new folder in a code editor and take a look.

If you’re on a Mac, drag the folder you’ve just created onto the Visual Studio Code icon.

If you’re on Windows or Linux, open VS Code and choose “File”, “Open Folder...”, and select the folder with your new Craft CMS files.

TODO: Add screenshot of vanilla VS Code opened to the new project folder

Before we complete the setup, let’s take a look at the files Composer just created:

```
craft/
├── config/
├── modules/
├── storage/
├── templates/
├── vendor/
├── web/
├── .env
├── .env.example
├── .gitignore
├── composer.json
├── composer.lock
├── craft
└── craft.bat
```

It’s important to maintain this folder structure. You can add files and folders to it, but if you want to rename any of these files we’re starting with you may need to change some settings.

Let’s take a look at each top-level item:

- **`config/`** contains a handful of configuration files, and your `license.key` file once setup’s finished.
- **`modules/`** is ready for custom PHP you could write just for your site. (We’ll be ignoring that.)
- **`storage/`** is where Craft keeps its own temporary files while it’s running.
- **`templates/`** is where we’ll write code for dynamically displaying content. (Unless you’d like to use Craft headlessly, but we’ll come back to that.)
- **`vendor/`** is where Composer stores all the project packages we covered earlier.
- **`web/`** is called the document root, and it’s where your web server will need to be configured to send its requests. We’ll also put website pieces like images, CSS, and JavaScript in this folder.
- **`.env`** is a special file with constants we’ll fill in so Craft knows how to connect to its database.
- **`.env.example`** is an example of `.env`’s format for others to use setting up _their_ environments.
- **`.gitignore`** is another special file for telling Git, if it’s used, not to care about certain files.
- **`composer.json`** is the file Composer uses to know what packages it should install.
- **`composer.lock`** is Composer’s own detailed record of what it has actually installed.
- **`craft`** is Craft’s own console command for macOS and Linux.
- **`craft.bat`** is the same console command for Windows.

It’s okay if you’ve never used Git or if any of these pieces isn’t clear; we’ll be using them shortly!

### Connect the database

Before we can install Craft, we have to make sure it’s able to find the database you created for it. You’ll do this by editing settings in the `.env` file. Unless you skipped ahead, your file will look just like this but with a unique `SECURITY_KEY` filled in:

```dotenv
# The environment Craft is currently running in ('dev', 'staging', 'production', etc.)
ENVIRONMENT="dev"

# The secure key Craft will use for hashing and encrypting data
SECURITY_KEY="••••••••••••••••••••••••••••••••"

# The Data Source Name (“DSN”) that tells Craft how to connect to the database
DB_DSN=""

# The database username to connect with
DB_USER="root"

# The database password to connect with
DB_PASSWORD=""

# The database schema that will be used (PostgreSQL only)
DB_SCHEMA="public"

# The prefix that should be added to generated table names (only necessary if multiple things are sharing the same database)
DB_TABLE_PREFIX=""
```

See the setup guide for your environment for your database settings, then run the following console command:

```bash
./craft setup/db
```

This will prompt you for the settings to fill in. For each step, type your response and press return. Once you’ve finished adding settings, Craft will immediately test them. If it’s successful, it will update the `.env` file for you.

Your settings may look different, but a successful setup will look like this:

```
Which database driver are you using? [mysql,pgsql,?]: mysql
Database server name or IP address: [127.0.0.1] db
Database port: [3306]
Database username: [root] db
Database password:
Database name: db
Database table prefix:
Testing database credentials ... success!
Saving database credentials to your .env file ... done
```

If you look again at your `.env` file, you’ll see those connection settings were filled in and saved:

```dotenv
# The environment Craft is currently running in ('dev', 'staging', 'production', etc.)
ENVIRONMENT="dev"

# The secure key Craft will use for hashing and encrypting data
SECURITY_KEY="••••••••••••••••••••••••••••••••"

# The Data Source Name (“DSN”) that tells Craft how to connect to the database
DB_DSN="mysql:host=db;port=3306;dbname=db;"

# The database username to connect with
DB_USER="db"

# The database password to connect with
DB_PASSWORD="db"

# The database schema that will be used (PostgreSQL only)
DB_SCHEMA="public"

# The prefix that should be added to generated table names (only necessary if multiple things are sharing the same database)
DB_TABLE_PREFIX=""
```

If you’re seeing `Testing database credentials ... failed`, Craft will try guessing another port and ask again for updated credentials. Double-check your setup guide and make sure you’ve got the details right and that your server is running. If you’re stuck here, consider [asking for help on Discord](https://craftcms.com/discord). Be sure to share what environment you’re working with and any error message you’re seeing.

### Set the web root

The last thing Craft needs is the ability to run in a web browser. For this, you’ll need to tell your web server to use Craft’s `web/` folder as the document root. The way you do this will depend on how you’ve chosen to set up your local environment—so refer back to the relevant environment setup guide.

If you attempt to visit your local site’s URL in your browser and see `HTTP 503 – Service Unavailable`, you’re on the right track!

<BrowserShot url="https://localhost:8080" :link="false">
<img src="../../images/tutorial-503.png" alt="Screenshot of 503 unavailable error that means we’re close" />
</BrowserShot>

Use your admin panel URL instead. If your local environment uses `http://localhost:8080/`, for example, visit `http://localhost:8080/admin`. Instead of that 503 error, you should have a red “Install Craft” button.

<BrowserShot url="https://localhost:8080/admin/install" :link="false">
<img src="../../images/tutorial-install.png" alt="Screenshot of 503 unavailable error that means we’re close" />
</BrowserShot>

If you’re getting other errors in your browser, check your environment’s setup guide and make sure you have the right base URL for your site and that the server is running.

### Finish setup

If you’ve managed _not_ to push the red button, go ahead!

You’ll be prompted to accept Craft’s license agreement, create your first user account, and set your site’s name, URL and default language.

Now the real fun begins.
