# Install Craft CMS

At this point you should have [DDEV](https://ddev.com/) 1.21.4+ installed, and know how to run console commands. Now it’s time to install Craft CMS.

The first step is to create a folder to contain the tutorial project, called `tutorial`. You can create it alongside your other development projects, wherever you prefer to store them.

In your terminal, run the following commands to create and go to your `tutorial` folder:

```sh
cd /path/to/dev/folder
mkdir tutorial
cd tutorial
```

Then run the following commands to configure a new DDEV project there:

```sh
# Create DDEV configuration files
ddev config --project-type=craftcms --docroot=web --create-docroot

# Scaffold the project from the official starter project
ddev composer create -y --no-scripts craftcms/craft

# Run the Craft setup wizard
ddev craft install
```

Answer the questions prompted by the `ddev craft install` command, and leave `Site URL` set to the default value (`https://tutorial.ddev.site`)—unless you chose something other than `tutorial` when creating your project folder.

Once the command has finished, Craft will be fully installed. You can verify by running the following command, which will load <https://tutorial.ddev.site/> in a new browser window:

```sh
ddev launch
```

You should see Craft’s default welcome template.

<BrowserShot url="https://tutorial.ddev.site/" :link="true">
<img src="../images/welcome-template.png" alt="Screenshot of the Craft CMS welcome template" />
</BrowserShot>
