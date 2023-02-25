# Create a Project

At this point you should have your [local development stack](../environment/stack.md) set up, and know how to run [console commands](../environment/terminal.md). Now it’s time to install Craft.

## Project Folder

The first step is to create a folder named `tutorial` for us to work in. If you have a place you normally keep development projects, create it alongside those—if not, your desktop or home folder is fine, for now!

In your terminal, run the following commands to create and move into your project folder:

```sh
cd /path/to/dev/folder
mkdir tutorial
cd tutorial
```

## Setup

Then run the following commands to configure a new DDEV project there:

1. Create DDEV configuration files:

    ```sh
    ddev config --project-type=craftcms --docroot=web --create-docroot
    ```

2. Scaffold the project from the official starter project:

    ```sh
    ddev composer create -y --no-scripts craftcms/craft
    ```

3. Run the Craft setup wizard

    ```sh
    ddev craft install
    ```

    Answer the prompts, leaving `Site URL` set to the default value (`https://tutorial.ddev.site`)—unless you chose something other than `tutorial` when creating your [project folder](#project-folder).

    ::: tip
    Remember the username and password you choose for your user account! We’ll need those in a moment.
    :::

Once the last command has finished, Craft is fully installed! To open your installation in a web browser, run:

```sh
ddev launch
```

You should see Craft’s default welcome template:

<BrowserShot url="https://tutorial.ddev.site/" :link="false" caption="Craft’s front-end welcome screen.">
<img src="../images/welcome-template.png" alt="Screenshot of the Craft CMS welcome template" />
</BrowserShot>

Now, let’s take a look at the contents of your newly-populated project folder.
