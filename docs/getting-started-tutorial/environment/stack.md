# Set up a development stack

“Stack” is shorthand for the software required to run Craft.

You may have heard acronyms like <abbr title="Linux, Apache, MySQL, and PHP">LAMP</abbr> or <abbr title="JavaScript, API, and Markup">JAM</abbr> in conjunction with _stack_—these are just common combinations of technologies that developers and infrastructure engineers have standardized over time.

Craft is a dynamic web application (as opposed to static files), so it must have access to a few services to run:

- **HTTP Server** – Software that listens for incoming _requests_ and hands them off to another program to generate a _response_.
- **PHP Interpreter** – A program that compiles and executes PHP source code.
- **Database** – A storage medium not unlike a collection of spreadsheets that can be queried from code.

We recommend [DDEV](https://ddev.readthedocs.io/en/stable/) for new and returning Craft developers, because it offers the most consistent experience among the tools we’ve tried, and works across all major operating systems. DDEV uses “containers” to run each of the components above, meaning you don’t need to worry about configuring each of them independently—or whether your computer is compatible with a particular version.

## DDEV

Installing DDEV only takes three steps:

- 
DDEV requires that you install a [Docker provider](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/) so it can work with containers.

Instructions for installing DDEV are available in the [DDEV documentation](https://ddev.readthedocs.io/en/stable/).

::: tip
Make sure you’re running DDEV 1.21.4 or later. You can check which version you’re currently running with the following command:

```sh
ddev -v
```
:::
