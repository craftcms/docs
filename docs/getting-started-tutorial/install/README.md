# Install Craft CMS

At this point you should have [DDEV](https://ddev.com/) 1.21.2+ installed, and know how to run console commands. Now it’s time to install Craft CMS.

The first step is to create a folder to contain the tutorial project, called `tutorial`. You can create it alongside your other development projects, wherever you prefer to store them.

In your terminal, run the following commands to create and go to your `tutorial` folder:

```sh
cd /path/to/dev/folder
mkdir tutorial
cd tutorial
```

Then run the following commands to configure a new DDEV project there:

```sh
# configure a new DDEV project
ddev config --project-type=craftcms

# download the craftcms/craft starter project files
ddev composer create -y --no-scripts --no-install craftcms/craft

# start the web server
ddev start

# install the Composer dependencies
ddev composer update

# run the Craft CMS installer
ddev craft install
```

Answer the questions prompted by the `ddev craft install` command, and leave `Site URL` set to the default value (`https://tutorial.ddev.site`).

Once the command has finished, Craft will be fully installed. You can verify by running the following command, which will load <https://tutorial.ddev.site/> in a new browser window:

```sh
ddev launch
```

You should see Craft’s default welcome template.

<BrowserShot url="https://tutorial.ddev.site/" :link="true">
<img src="../images/welcome-template.png" alt="Screenshot of the Craft CMS welcome template" />
</BrowserShot>
