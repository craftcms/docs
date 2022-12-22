# Installation

The prevalence of modern, mature PHP development tools and infrastructure makes Craft easy to install, run, and [upgrade](./upgrade.md). All you’ll need to follow along is a unix-style command prompt.

::: tip
If at any point you feel stuck, the [Tutorial](../getting-started-tutorial/README.md) is a comprehensive guide for _anyone_ who wants to get set up with a fast, reliable local development environment.
:::

Downloading or installing Craft by any means binds you to its [license](https://craftcms.com/license).

## Quick-Start

[DDEV](https://ddev.readthedocs.io/en/stable/) is a Docker-based PHP development environment that streamlines the creation and management of resources required by a Craft project.

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
    ddev composer create -y --no-scripts craftcms/craft
    ```

1. Start the Craft setup wizard, and accept all defaults (in `[square brackets]`):

    ```bash
    ddev craft install
    ```

    ::: tip
    Our [First-Time Setup](kb:first-time-setup) guide in the Knowledge Base has more information about what to expect during setup.
    :::

Congratulations! You now have a fully-functional Craft application installed and configured. Run `ddev launch` to view the starter project’s welcome screen:

<BrowserShot url="https://my-craft-project.ddev.site/" :link="false">
<img src="./images/welcome.png" alt="A new Craft installation’s welcome screen" />
</BrowserShot>

## Next Steps

Ready to dive in? Sign in to the [control panel](./control-panel.md) by clicking **Go to your control panel** from the welcome screen, or running `ddev launch admin`. The username and password you provided during [setup](kb:first-time-setup) were used to create the first admin user.

You’re welcome to explore things at your own pace—but here are some great starting points:

- Get familiar with the [directory structure](./directory-structure.md) that was created during installation;
- Review [configuration](./config/README.md) methods and options;
- Explore Craft’s main content tools: [elements](./elements.md) and [custom fields](./fields.md);
- Discover [plugins](./plugins.md) to add features or integrate with other services;
- Find help and inspiration within our vibrant [community](https://craftcms.com/community)!

## Further Reading

### Alternative Installation Methods

See [Using the Starter Project](kb:using-the-starter-project) or [Setting up a Craft Project from Scratch](kb:setting-up-a-craft-project-from-scratch) in the Knowledge Base for platform-agnostic installation instructions.

### Hosting

Craft’s own footprint is relatively light, but it’s important to choose a platform that matches your traffic, storage, and redundancy needs. We maintain a [list of Craft-friendly providers](https://craftcms.com/hosting) for projects of varying scale.

### Deployment

There is no one-size-fits-all deployment strategy for a Craft project, but we’ve collected our most salient advice in the [Deployment Best Practices](kb:deployment-best-practices) Knowledge Base article.

Regardless of your target infrastructure, it’s important to define a workflow for yourself and your collaborators. Starting a project from a local environment sets a precedent for the flow of code and configuration; while it is _possible_ to scaffold a project directly on a remote host, maintaining a single source of truth for the site will become difficult with changes being made in multiple places, by multiple parties, or without a means of testing those changes in isolation.

### Troubleshooting

See the [Troubleshooting a Failed Craft Installation](kb:troubleshooting-failed-installation) Knowledge Base article for a number of common installation hang-ups.
