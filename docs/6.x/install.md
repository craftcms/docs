# Install

The prevalence of modern, mature PHP development tools and infrastructure makes Craft easy to install, run, [upgrade](./upgrade.md), and [deploy](./deploy.md).

<!-- more -->

This [quick-start](#quick-start) guide focuses solely on setting up a local Craft development environment to try out the alpha.
Downloading or installing Craft by any means (including alpha releases) binds you to its [license](https://craftcms.com/license).

## Quick-Start

Your journey with Craft begins on your local machine, using [DDEV](https://ddev.readthedocs.io/en/stable/).
DDEV is a Docker-based PHP development environment that streamlines the creation and management of resources required by a Craft project.

[Install or update DDEV](https://ddev.readthedocs.io/en/stable/users/install/), then follow these steps:

1. Create a project directory and move into it:

    ```bash
    mkdir my-craft-project
    cd my-craft-project/
    ```

1. Create DDEV configuration files:

    ```bash
    # Note the new project type for 6.x!
    ddev config --project-type=laravel --docroot=public --php-version=8.5
    ```

1. Scaffold the project from the official [starter project](https://github.com/craftcms/craft/tree/6.x):

    ```bash
    ddev composer create-project "craftcms/craft@6"
    ```

    The setup wizard will start automatically! Accept all defaults (in `[square brackets]`), and note your chosen username and password.

    ::: tip
    Our [First-Time Setup](kb:first-time-setup) guide in the Knowledge Base has more information about what to expect during setup.
    :::

Congratulations! You now have a fully-functional Craft application installed and configured. Run `ddev launch` to view the starter project’s welcome screen.

::: tip
We have a list of recommended next steps for new Craft users in the [5.x installation guide](/5.x/install.md).
:::
