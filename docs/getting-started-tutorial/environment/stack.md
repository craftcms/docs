# Set up a Development Stack

“Stack” is shorthand for the software required to run Craft.

You may have heard acronyms like <abbr title="Linux, Apache, MySQL, and PHP">LAMP</abbr> or <abbr title="JavaScript, API, and Markup">JAM</abbr> in conjunction with _stack_—these are just common combinations of technologies that developers and infrastructure engineers have standardized over time.

Craft is a dynamic web application (as opposed to static files), so it must have access to a few services to run:

- **HTTP Server** – Software that listens for incoming _requests_ and can hand them off to another program to generate a _response_.
- **PHP Interpreter** – A program that compiles and executes PHP source code.
- **Database** – A storage medium not unlike a collection of spreadsheets that can be queried from code.

We recommend [DDEV](https://ddev.readthedocs.io/en/stable/) for new and returning Craft developers, because it offers the most consistent experience among the tools we’ve tried, and works across all major operating systems. DDEV uses [containers](https://www.docker.com/resources/what-container/) to run each of the components above, meaning you don’t need to worry about configuring each of them independently—or whether your computer has (or is compatible with) a particular version.

## DDEV

Setting up DDEV happens in two main steps, each of which includes some platform-specific instructions:

1. Install a [Docker provider](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/) (the underlying container management tool);
2. Install the [DDEV binary](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/) (the program that talks to Docker);

That’s it! You now have everything you need to start building a Craft project—except Craft.

::: tip
Before moving on, make sure you’re running DDEV 1.21.4 or later. You can check which version you’re currently running with the following command:

```sh
ddev -v
```
:::
