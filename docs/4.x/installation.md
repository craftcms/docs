# Installation

The prevalence of modern, mature PHP development tools and infrastructure makes Craft easy to install, run, and [upgrade](./upgrade.md). All you’ll need to follow along is a unix-style command prompt.

::: tip
If at any point you feel stuck, the [Tutorial](../getting-started-tutorial/README.md) is a comprehensive guide for _anyone_ who wants to get set up with a fast, reliable local development environment.
:::

Downloading or installing Craft by any means binds you to its [license](https://craftcms.com/license).

## Quick-Start

[DDEV](https://ddev.readthedocs.io/en/stable/) is a Docker-based PHP development environment that streamlines the creation and management of resources required by a Craft project.

[Install DDEV](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/), then follow these steps:

1. Create a project directory and move into it:

    ```bash
    mkdir my-craft-project
    cd my-craft-project/
    ```

1. Create DDEV configuration files:

    ```bash
    ddev config --project-type=craftcms
    ```

1. Initialize the project from our [starter package](https://github.com/craftcms/craft):

    ```bash
    ddev composer create -y --no-scripts --no-install craftcms/craft
    ```

1. Boot up the development environment:

    ```bash
    ddev start
    ```

1. Install the latest dependencies:

    ```bash
    ddev composer update
    ```

1. Start the Craft setup wizard, and accept all defaults (in `[square brackets]`):

    ```bash
    ddev craft install
    ```

That’s it! Run `ddev launch admin` to open the [control panel](./control-panel.md) and sign with the username and password you just created.

::: tip
Forgot to record your password? You can set a new one by running:

```bash
ddev craft users/set-password 1
```
:::

## Next Steps

You’re welcome to explore things at your own pace—but here are some great starting points:

- Get familiar with the [directory structure](./directory-structure.md) that was created during installation;
- Review [configuration](./config/README.md) methods and options;
- Learn about Craft’s main content tools: [elements](./elements.md) and [custom fields](./fields.md);
- Discover [plugins](./plugins.md) to add features or integrate with other services;
- Find help and inspiration within our vibrant [community](https://craftcms.com/community)!

## Further Reading

### Alternative Installation Methods

See [Using the Starter Project](kb:using-the-starter-project) or [Setting up a Craft Project from Scratch](kb:setting-up-a-craft-project-from-scratch) in the Knowledge Base for platform-agnostic installation instructions.

### Hosting

Craft’s own footprint is relatively light, but it’s important to choose a platform that matches your traffic, storage, and redundancy needs. We maintain a [list of Craft-friendly providers](https://craftcms.com/hosting) for projects of varying scale.

### Deployment

There is no one-size-fits-all deployment strategy for a Craft project, but we’ve collected our most salient advice in the [Deployment Best Practices](kb:deployment-best-practices) Knowledge Base article.

### Troubleshooting

See the [Troubleshooting a Failed Craft Installation](kb:troubleshooting-failed-installation) Knowledge Base article for a number of common installation hang-ups.
