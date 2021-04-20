# Install Craft CMS

At this point you should have a local development environment running with a database and know how to run console commands. Now we’ll take a look at what we’ve got and install Craft CMS.

Nitro and Craft both rely on Composer, and Nitro used it under the hood to establish all the files we need to run Craft.

## What’s Composer?

<BrowserShot url="https://getcomposer.org/" :link="true">
<img src="../images/getcomposer.org.png" alt="Screenshot of getcomposer.org homepage" />
</BrowserShot>

Composer is a command line application with one important job: it makes sure a PHP project like our website has all the code it needs to run.

This code is split up into numerous _packages_ written by different authors. Our website depends on these packages—also referred to as _dependencies_—and each one provides a specific set of functionality. Composer makes sure every PHP package (including Craft CMS!) is installed, has the dependencies it needs to do its job, and that all these packages can work together without major conflicts.

Composer handles the complexity of combining these packages so we can use the best software available for each individual job the website needs to accomplish. This isn’t unique to Craft CMS—most modern PHP projects are built this way.

## Tour the site’s folder structure

Let’s open the new folder in a code editor and take a look.

If you’re on a Mac, drag the folder you’ve just created onto the Visual Studio Code icon.

If you’re on Windows or Linux, open VS Code and choose **File**, **Open Folder...**, and select the folder with your new Craft CMS files.

![](../images/vs-code.png)

Before we complete the setup, let’s take a look at the files Composer just created:

```treeview
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
└── craft
```

It’s important to maintain this folder structure. You can add stuff to it, but if you want to rename anything here you may need to change some settings.

Let’s take a look at each top-level item:

- **`config/`** contains `.php` and `.yaml` configuration files, and `license.key` after installation.
- **`modules/`** is for custom PHP you might want to add for your site. (We’ll be ignoring that.)
- **`storage/`** is where Craft keeps its temporary files.
- **`templates/`** is where we’ll write template code to dynamically display content. (Unless you’d like to use Craft headlessly, but we’ll come back to that.)
- **`vendor/`** is where Composer stores all the project packages we covered earlier.
- **`web/`** is the document root covered [earlier](../environment/stack.md), where your web server needs to send its requests. We’ll also put website pieces like images, CSS, and JavaScript in this folder.
- **`.env`** is a special file with constants that tell Craft how to connect to its database.
- **`.env.example`** is an example of `.env`’s format for others to use setting up _their_ environments.
- **`.gitignore`** is another special file for telling Git, if it’s used, not to care about certain files.
- **`composer.json`** is the file Composer uses to know what packages it *should* install.
- **`composer.lock`** is Composer’s own detailed record of what’s *actually* installed.
- **`craft`** is Craft’s command line executable.

It’s okay if you’ve never used Git or if any of these pieces isn’t clear; we’ll be using them shortly!
