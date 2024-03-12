# Installation

The prevalence of modern, mature PHP development tools and infrastructure makes Craft easy to install, run, [upgrade](./upgrade.md), and [deploy](./deployment.md).

This [quick-start](#quick-start) guide focuses solely on setting up a local Craft development environment. If you’re ready to launch, jump to the [hosting](#hosting) or [deployment](#deployment) section.

::: tip
If at any point you feel stuck, the [Tutorial](../getting-started-tutorial/README.md) is a comprehensive guide for _anyone_ who wants to get set up with a fast, reliable development environment.
:::

Downloading or installing Craft by any means binds you to its [license](https://craftcms.com/license).

## Quick-Start

Your journey with Craft begins on your local machine, using [DDEV](https://ddev.readthedocs.io/en/stable/). DDEV is a Docker-based PHP development environment that streamlines the creation and management of resources required by a Craft project.

::: tip
While we [strongly recommend](#why-ddev) DDEV for new Craft projects, [alternate installation methods](#alternative-installation-methods) are available for anyone with a preexisting environment or preferred workflow that meets its [requirements](./requirements.md).
:::

[Install or update DDEV](https://ddev.readthedocs.io/en/stable/users/install/), then follow these steps:

1. Create a project directory and move into it:

    ```bash
    mkdir my-craft-project
    cd my-craft-project/
    ```

1. Create DDEV configuration files:

    ```bash
    ddev config --project-type=craftcms --docroot=web --create-docroot
    ```

1. Scaffold the project from the official [starter project](https://github.com/craftcms/craft):

    ```bash
    ddev composer create -y --no-scripts "craftcms/craft:^4"
    ```

1. Run the Craft setup wizard, and accept all defaults (in `[square brackets]`):

    ```bash
    ddev craft install
    ```

    ::: tip
    Our [First-Time Setup](kb:first-time-setup) guide in the Knowledge Base has more information about what to expect during setup.
    :::

Congratulations! You now have a fully-functional Craft application installed and configured. Run `ddev launch` to view the starter project’s welcome screen:

<BrowserShot
    url="https://my-craft-project.ddev.site/"
    :link="false"
    id="welcome-screen"
    :poi="{
        'cp-link': [38, 72],
    }">
<img src="./images/welcome.png" alt="A new Craft installation’s welcome screen" />
</BrowserShot>

## Next Steps

Ready to dive in? Sign in to the [control panel](./control-panel.md) by clicking **Go to your control panel** <Poi label="1" target="welcome-screen" id="cp-link" /> from the welcome screen, or running `ddev launch admin`. The username and password you provided during [setup](kb:first-time-setup) were used to create the first admin user.

You’re welcome to explore things at your own pace—but here are some great starting points:

- Get familiar with the [directory structure](./directory-structure.md) that was created during installation;
- Review [configuration](./config/README.md) methods and options;
- Explore Craft’s main content tools: [elements](./elements.md) and [custom fields](./fields.md);
- Run a [console command](./console-commands.html) using `ddev craft ...` to explore the CLI;
- Discover [plugins](./plugins.md) to add features or integrate with other services;
- Find help and inspiration within our vibrant [community](https://craftcms.com/community)!

Done for the day? [`ddev stop`](https://ddev.readthedocs.io/en/stable/users/basics/commands/#stop) will spin down any containers for the project and free up system resources. [`ddev start`](https://ddev.readthedocs.io/en/stable/users/basics/commands/#start) boots everything back up, right where you left off.

### Workflow + Collaboration

We believe that starting with a local development environment (rather than directly on a remote server) fosters a workflow that will support the reliability and longevity of your project.

<See path="./deployment.md#workflow" label="Defining a Workflow" />

::: tip
To get a collaborator set up, commit your working folder to git (including the `.ddev/` directory) and create a [database backup](./console-commands.html#db-backup). Have them clone the project and run:

```bash
ddev start
ddev import-db path/to/backup.sql
```
:::

## Further Reading

### Why DDEV?

DDEV is our recommended development environment because it isolates software required to run Craft from your local machine—and from your other projects. Each of your sites can be spun up with its own database and PHP version, without the need to manage or switch between specific software packages

The environment for each project is [defined as YAML files](https://ddev.readthedocs.io/en/stable/users/configuration/config/), meaning `ddev start` is usually the only thing required to start working on a project on a new machine—or with a collaborator.

The Docker requirement is not taken lightly! We believe that this one-time installation is much more sustainable for new and returning Craft developers than managing a bare-metal development environment—locally or on a remote server.

### Alternative Installation Methods

Depending on your experience and preferred development environment, you may find one of these platform-agnostic installation processes more comfortable:

- For most environments meeting Craft’s requirements, see [Using the Starter Project](kb:using-the-starter-project) to get started with Composer.
- Especially adventurous users may want to read about [Setting up a Craft Project from Scratch](kb:setting-up-a-craft-project-from-scratch).
- If you are unable to start a project locally—or are constrained by a hosting service—you can directly [download](https://craftcms.com/latest.zip) the latest Craft release as a blank starter project.

::: warning
Pre-built starter project ZIPs should only be used for evaluating Craft in limited circumstances.
:::

### Hosting

<See path="./deployment.md" label="Selecting a Host" description="Know your options when looking for a good hosting solution." />

Craft’s own footprint is relatively light, but it’s important to choose a platform that matches your traffic, storage, and redundancy needs. We maintain a [list of Craft-friendly providers](https://craftcms.com/hosting) for projects of varying scale.

### Deployment

<See path="./deployment.md" />

There is no one-size-fits-all deployment strategy for a Craft project, but we’ve collected our most salient advice in the [Deployment Best Practices](kb:deployment-best-practices) Knowledge Base article.

Regardless of your target infrastructure, it’s important to define a workflow for yourself and your collaborators. Starting a project from a local environment sets a precedent for the flow of code and configuration; while it is _possible_ to scaffold a project directly on a remote host, maintaining a single source of truth for the site will become difficult with changes being made in multiple places, by multiple parties, or without a means of testing those changes in isolation.

### Troubleshooting

Having trouble with DDEV? Make sure your [Docker](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#testing-and-troubleshooting-your-docker-installation) installation is working properly, then head to their [troubleshooting](https://ddev.readthedocs.io/en/stable/users/basics/troubleshooting/) page for specific issues.

See the [Troubleshooting a Failed Craft Installation](kb:troubleshooting-failed-installation) Knowledge Base article for more common installation hang-ups.
