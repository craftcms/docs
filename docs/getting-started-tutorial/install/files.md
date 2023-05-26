# Project File Structure

Let’s get your new `tutorial/` folder opened in a code editor. For now, we’ll assume you’re using Visual Studio Code:

1. Open **Visual Studio Code**;
2. From the **File** menu, select **Open Folder…**;
3. Navigate to your project folder in the file browser;
4. Click **Open** when the project folder is selected, or you’ve just moved into it (with nothing else selected);

You should see something like this:

![](../images/vs-code.png)

In the sidebar, you can see all the files created during installation:

```treeview
craft/
├── .ddev/
├── config/
├── storage/
├── templates/
├── vendor/
├── web/
├── .env
├── .env.example.dev
├── .env.example.production
├── .env.example.staging
├── .gitignore
├── bootstrap.php
├── composer.json
├── composer.lock
└── craft
```

::: tip
It’s important that you maintain this folder structure for the rest of the tutorial. You are welcome to add whatever you like to it, but renaming anything may require config changes that the tutorial doesn’t cover.
:::

Let’s take a look at each top-level item:

This file/folder… | Contains…
--- | ---
`.ddev/` | …DDEV configuration and runtime files. The only file in here you’re likely to ever care about is `config.yaml`.
`config/` | …`.php` and `.yaml` configuration files, and a `license.key` after installation.
`storage/` | …temporary files like caches and logs.
`templates/` | …Twig and HTML files for rendering dynamically display content, unless you’d like to use Craft in “headless” mode—but we’ll come back to that!
`vendor/` | …PHP dependencies, managed by Composer.
`web/` | …publicly-accessible files. This is commonly referred to as the “document root,” which we specified when setting up DDEV. It’s a great place to keep CSS and JavaScript files for your site’s front-end.
`.env` | …configuration and other secrets.
`.env.example.*` | …sensible default environment variables for different environments.
`.gitignore` | …instructions for Git that determine which files and folders are ignored.
`composer.json` | …dependencies and other criteria that tells Composer what should be installed.
`composer.lock` | …the authoritative list of packages and versions that Composer will actually install.
`craft` | …the entry-point for Craft’s command-line interface.

Don’t worry if the purpose of these files remains unclear—we’ll be looking at the important ones in the next section.
