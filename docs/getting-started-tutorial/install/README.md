# Install Craft CMS

At this point you should have your [local development stack](../environment/stack.md) set up, and know how to run [console commands](../environment/terminal.md). Now it’s time to install Craft CMS.

## Project Folder

The first step is to create a folder named `tutorial` for us to work in. If you have a place you normally keep development projects, create it alongside those—if not, your desktop or home folder is fine, for now!

In your terminal, run the following commands to create and move into your project folder:

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
