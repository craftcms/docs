# Set up a development stack

The word “stack” refers to the web software that’s needed to work with Craft CMS, which is detailed in [Craft’s minimum requirements](/3.x/requirements.md).

Like your workstation, a web server can run different operating systems and apps. Web servers, however, use an OS and software specifically for running websites where common bundles of web software are referred to as “stacks”. (You’ve probably heard of a “full stack developer”, which means someone has experience with each of the software components in a particular stack.)

Craft can run on a number of different stacks, but the main ingredients are...

- **PHP**: the programming language in which Craft is written.
- **A database**: the place where content and most information is stored, sort of like a collection of Excel files used by code that can work with lots of data quickly. Commonly MySQL or PostgreSQL.
- **A web server**: the software that listens for requests made by your web browser, hands them off to a web application (like Craft), and gives a response back to the browser. Commonly Apache or nginx.

The best way to get working quickly is to use a pre-packaged web stack that runs on your operating system. We’ll walk through setup using [Craft Nitro](/nitro/2.x/), a tool for managing your local development environment on macOS, Windows, and Linux.

## Why Nitro?

Before we dive in, here’s why we’re going to use Nitro:

- It’s made and supported by the Craft CMS team to simplify local development.
- It’s free, available on multiple platforms, and straightforward to install.
- It runs its included software inside a virtual environment, which can be updated, rebuilt, and destroyed without affecting your system.
- It supports running multiple projects, including non-Craft ones, so it’s useful for the long haul.

Some other options are limited to a specific OS, rely on your system software, or end up being complicated to manage. Nitro offers a nice balance of portability, flexibility, and simplicity.

Nitro uses [Docker](https://www.docker.com/) to efficiently set up and manage web servers inside your computer. If you decide you’d rather use something else, you can safely and easily [uninstall Nitro](/nitro/2.x/installation.md#uninstalling-nitro).

## Step 1: Install Docker Desktop

Visit <https://www.docker.com/products/docker-desktop>, choose the installer for your operating system, and run it. Make sure you run Docker Desktop after you’ve installed it.

## Step 2: Install and Initialize Nitro

Run the following terminal command:

```sh
bash <(curl -sLS http://installer.getnitro.sh)
```

The longest part of the install process is where Nitro downloads, builds, and sets itself up for the first time. It will prompt you for some settings, where each time you can enter a selection and often press <kbd>return</kbd> to accept the default.

This is like creating a new computer just for web development, and if you’ve ever set up a VPS with a hosting provider that’s similar to what we’re doing in this step—but your PC is the data center and Nitro uses Docker to set up pieces for the development environment.

Once complete, you’ll have a configuration file stored at `~/.nitro/nitro.yaml` and be ready to add sites.

## Step 3: Add a Site

When we install Craft CMS, or any PHP application, the project files will rely on a _web root_ for files that need to be publicly available on the internet. This is often named `public/`, `public_html/`, or in Craft’s case `web/`.

In this step, we’ll create a site with a special local domain name—`tutorial.test`—and map it to our project’s web root.

If you’ve not installed Craft CMS yet, that’s okay. You can either point to the directory to be created, or come back to this step after installation.

At this point, it’ll be a good idea to create a folder on your disk you’ll use for setting up projects if you don’t already have one. We’ll assume here that you use `~/projects/`, which is the same as `/Users/oli/projects` on a Mac. Each project should live in a subfolder. In this case we’ll install Craft CMS in a project folder called `tutorial`. The full path on macOS will look like `/Users/oli/projects/tutorial`, and on Windows it would look like `C:\Users\oli\projects\tutorial`.

::: warning
The home folder path alias `~/` can only be used on macOS and Linux. With Windows, you must supply the full path instead, like `C:\Users\oli\projects\tutorial`.
:::

1. Once you’ve created a project folder, navigate to it in your terminal:

```sh
cd ~/projects/tutorial
```

2. Run `nitro add` and follow the prompts.

- hostname: `tutorial.test`
- webroot: `web`
- apply changes: `yes`
- password (for mapping `tutorial.test`): [your operating system password]

The whole process will look something like this when you’re finished:

```
$ nitro add
Adding site…
Enter the hostname [tutorial.nitro]: tutorial.test
  ✓ setting hostname to tutorial.test
  ✓ adding site ~/projects/tutorial
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
  1. mysql-5.7-3306.database.nitro
  2. postgres-12-5432.database.nitro
Enter your selection: 1
Enter the new database name: tutorial
  … creating database tutorial ✓
Database added 💪
Should we update the env file? [y/N]
New site added! 🎉
Apply changes now [Y/n]?
Checking network…
  ✓ network ready
Checking proxy…
  ✓ proxy ready
Checking databases…
  … checking mysql-5.7-3306.database.nitro ✓
  … checking postgres-12-5432.database.nitro ✓
Checking services…
  … checking dynamodb service ✓
  … checking mailhog service ✓
  … checking redis service ✓
Checking sites…
  … checking tutorial.test ✓
Checking proxy…
  … updating proxy ✓
Updating hosts file (you might be prompted for your password)
Password:
Adding sites to hosts file…
  … modifying hosts file ✓

$
```

You should now be able to visit `http://tutorial.test` in your browser and get a 404 error message. That’s exactly what we want, because next we’ll add the files that actually make the site go!

<BrowserShot url="http://tutorial.test" :link="false">
<img src="../images/tutorial-nitro-404.png" alt="Screenshot of 404 error from the web server" />
</BrowserShot>

## Other local environments

You can also choose one of the following guides to set up a development environment on your OS.

### MacOS, Windows, and Linux

- [Homestead](https://craftcms.com/knowledge-base/craft-laravel-homestead)
- [DDEV](https://ddev.readthedocs.io/en/stable/)
- [Lando](https://lando.dev/)

### MacOS

- [Laravel Valet](https://laravel.com/docs/7.x/valet)
- [VirtualHostX](https://clickontyler.com/virtualhostx/)
- [MAMP Pro](https://www.mamp.info/en/mamp-pro/windows/)

### Windows

- [WAMP](http://www.wampserver.com/en/)
- [AMPPS](https://www.ampps.com/)
- [XAMPP](https://www.apachefriends.org/index.html)

Once you’ve set up your local development environment, we’re ready to install Craft CMS!
