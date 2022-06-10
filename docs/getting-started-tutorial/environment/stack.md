# Set up a development stack

The word “stack” refers to the web software that’s needed to work with Craft CMS, which is detailed in [Craft’s minimum requirements](/4.x/requirements.md).

Like your workstation, a web server can run different operating systems and apps. Web servers, however, use an OS and software specifically for running sites. Common bundles of web software are referred to as “stacks.” (You’ve probably heard of a “full stack developer”, which means someone having experience with each of the software components of a particular stack.)

Craft can run on a few different stacks, but the main ingredients are:

- **PHP** – programming language in which Craft is written.
- **A database** – place where content is stored, sort of like a collection of Excel files used by code that can work with lots of data quickly. Commonly MySQL or PostgreSQL.
- **A web server** – software that listens for requests made by your web browser, hands them off to a web application (like Craft), and gives a response back to the browser. Typically Nginx or Apache.

There are several cross-platform local development tools that package all of these together, for example:

- [DDEV](https://ddev.com/)
- [Lando](https://lando.dev/)
- [Laragon](https://laragon.org/)
- [Laravel Valet](https://laravel.com/docs/8.x/valet)
- [MAMP](https://www.mamp.info/en/mac/)

Craft works with each of these and more, so if you already have a preferred stack that meets Craft’s requirements, feel free to stick with it. For the purposes of this tutorial, we’re going to assume you’re using [DDEV](https://ddev.com/), as it’s quickly becoming a favorite among the Craft and PHP communities.

Instructions for installing DDEV are available in the [DDEV documentation](https://ddev.readthedocs.io/en/stable/).
