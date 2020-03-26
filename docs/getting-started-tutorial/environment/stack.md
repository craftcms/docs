# Set up a development stack

The word “stack” refers to the web software that’s needed to work with Craft CMS, which is detailed in [Craft’s minimum requirements](https://docs.craftcms.com/v3/requirements.html).

Like your workstation, a web server can run different operating systems and applications. Web servers, however, are configured with an operating system and software for running websites. There are common combinations of web software referred to as “stacks”. (You’ve probably heard of a “full stack developer”, which means someone has experience with each of the software components in a particular stack.)

Craft can run on a number of different stacks, but the main ingredients are...

- **PHP**: the programming language in which Craft is written.
- **A database**: the place where content and most information is stored, sort of like a collection of Excel files used by code that can work with lots of data quickly. Commonly MySQL or PostgreSQL.
- **A web server**: the software that listens for requests made by your web browser, hands them off to a web application (like Craft), and gives a response back to the browser. Commonly Apache or nginx.

The best way to get working quickly is to use a pre-packaged web stack that runs on your operating system. The good news is that you’ve got plenty of options no matter what OS you’re using. The bad news is that the _best_ option depends on your OS and whatever software you’ve already installed.

Choose one of the following guides to set up a development environment on your OS.

::: warning
You won’t be able to set a web root until we get to installing Craft—skip that part and we’ll come back to it.
:::

TODO: write environment setup guides for each (must include creating a database + what settings Craft needs + how to run console commands + checking System Report requirements)

### MacOS, Windows, and Linux

- [Craft Nitro](#)
- [Laravel Homestead](https://laravel.com/docs/6.x/homestead)
- [Vagrant](https://www.vagrantup.com/)
- [DDEV](https://ddev.readthedocs.io/en/stable/)
- [Lando](https://lando.dev/)

### MacOS

- [VirtualHostX](https://clickontyler.com/virtualhostx/)

### Windows

- [WAMP](http://www.wampserver.com/en/)
- [AMPPS](https://www.ampps.com/)
- [XAMPP](https://www.apachefriends.org/index.html)

Once you’ve set up your local development environment, we’re ready to install Craft CMS!
