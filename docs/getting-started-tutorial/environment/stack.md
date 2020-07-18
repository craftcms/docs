# Set up a development stack

[[TOC]]

The word “stack” refers to the web software that’s needed to work with Craft CMS, which is detailed in [Craft’s minimum requirements](https://docs.craftcms.com/v3/requirements.html).

Like your workstation, a web server can run different operating systems and applications. Web servers, however, are configured with an operating system and software for running websites. There are common combinations of web software referred to as “stacks”. (You’ve probably heard of a “full stack developer”, which means someone has experience with each of the software components in a particular stack.)

Craft can run on a number of different stacks, but the main ingredients are...

- **PHP**: the programming language in which Craft is written.
- **A database**: the place where content and most information is stored, sort of like a collection of Excel files used by code that can work with lots of data quickly. Commonly MySQL or PostgreSQL.
- **A web server**: the software that listens for requests made by your web browser, hands them off to a web application (like Craft), and gives a response back to the browser. Commonly Apache or nginx.

The best way to get working quickly is to use a pre-packaged web stack that runs on your operating system. The good news is that you’ve got plenty of options no matter what OS you’re using. The bad news is that the _best_ option depends on your OS and whatever software you’ve already installed.

::: warning
You won’t be able to set a web root until we get to installing Craft—skip that part and we’ll come back to it.
:::

## Set up Laravel Homestead for Craft CMS

We’ll walk through setup using [Laravel Homestead](https://laravel.com/docs/6.x/homestead), a tool for managing your local development environment on macOS, Windows, and Linux.

### Why Homestead?

Before we dive in, here’s why we’re going to use Homestead:

- it’s free, available on multiple platforms, and straightforward to install
- it runs its included software inside a virtual environment, which can be updated, rebuilt or destroyed without affecting your system
- it’s highly configurable and well-documented
- it supports running multiple projects efficiently for the long haul

Some other options are limited to a specific operating system, rely on your system software, or end up being complex to manage. Homestead offers a nice balance of portability, flexibility, and simplicity.

Homestead provisions [Vagrant](https://www.vagrantup.com/) boxes, which are virtual environments similar to running an entire computer inside your computer. Vagrant can use any of several virtualization packages (VirtualBox, VMWare, Parallels, or Hyper-V) that do the lower-level work of emulating hardware on which Vagrant and Homestead manage software.

These extra layers add complexity, but Homestead makes all of it simple to manage. You’ll get the benefit of having a dedicated machine for web development without buying and setting one up. Plus, you can uninstall everything cleanly if you decide you’d rather use something else.

### Step 1: Install a virtualization provider

Whatever system you’re on, you’ll need to choose a package and run its installer.

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) is a great free option whatever OS you’re on.
- [VMWare](https://www.vmware.com/products/personal-desktop-virtualization.html) and [Parallels](https://www.parallels.com/) are commercial options that offer better performance. (To use Parallels for this setup you’ll need a [Pro or Business edition](https://parallels.github.io/vagrant-parallels/)!) With either of these, you’ll also need to [install a Vagrant plugin](https://laravel.com/docs/6.x/homestead#first-steps).
- [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) can be enabled and used in Windows 10 Enterprise, Pro, or Education editions.

### Step 2: Install Vagrant

Once you’ve installed a provider, you’ll need to [download and install Vagrant](https://www.vagrantup.com/downloads.html) for your operating system.

### Step 3: Install the Homestead machine

Now we’ll install the virtual machine Homestead uses to power your local development projects.

Run the following command in your terminal:

```bash
vagrant box add laravel/homestead
```

### Step 4: Install Homestead

Next we’ll add configuration files to a project folder for controlling how Homestead creates environments for our web projects to use.

First, use git to clone a copy of the Homestead repository. If you don’t have git installed, you can [visit the Homestead repository](https://github.com/laravel/homestead), choose “Clone or download” and “Download ZIP”, then extract the contents of the archive to the `~/Homestead` directory.

```bash
git clone https://github.com/laravel/homestead.git ~/Homestead
cd ~/Homestead
git checkout release
```

Once those files are established, run the setup script from that directory:

```bash
# Mac / Linux...
bash init.sh

# Windows...
init.bat
```

::: tip
You may also need to run `chmod +x init.sh` on macOS or Linux in order to execute the setup script.
:::

This will create a configuration file named `Homestead.yaml`.

### Step 5: Configure Homestead

Open `Homestead.yaml` in your code editor to customize it.

#### Set your provider

```yaml
provider: virtualbox
```

If you didn’t install VirtualBox, this should be set to whichever is relevant: `vmware_fusion`, `vmware_workstation`, `parallels`, or `hyperv`.

#### Configure shared folders

The `folders` property lists the directories that should be available to your Homestead machine. Each line will map a folder on your computer to a location inside that virtual machine, where each one should be in the `/home/vagrant` folder.

At this point, it’ll be a good idea to create a folder on your disk you’ll use for setting up projects if you don’t already have one. We’ll assume here that you use `~/projects/`, which is the same as `/Users/bjorn/projects` on a Mac. Each project should live in a subfolder. In this case we’ll install Craft CMS in a project folder called `tutorial`. We can then edit the following:

```yaml
folders:
  - map: ~/projects/tutorial
    to: /home/vagrant/tutorial
```

::: warning
The `~/` syntax does not work on Windows. Use the full path instead, like `C:\Users\bjorn\projects\tutorial`.
:::

For future reference, you can add a folder for each new project and have as many as you’d like:

```yaml{4-5}
folders:
  - map: ~/projects/tutorial
    to: /home/vagrant/tutorial
  - map: ~/projects/pretend-new-project
    to: /home/vagrant/pretend-new-project
```

#### Add a site

When we install Craft CMS, or any PHP application, the project files will come with a _web root_. This is often named `public/`, `public_html/`, or in Craft’s case `web/`.

In this step, we’ll tell Homestead to provide a special domain name—`tutorial.test`—and map it to our project’s web root.

If you’ve not installed Craft CMS yet, that’s okay. You can either point to the directory to be created, or come back to this step after installation.

```yaml
sites:
  - map: tutorial.test
    to: /home/vagrant/tutorial/web
```

If you’re updating `sites` later and need your changes to be applied, run `vagrant reload --provision`.

#### Add the hostname

To have your special host name work locally, you’ll need to make a quick edit to `/etc/hosts` so your local machine knows to route that special domain to your computer instead of the internet.

On macOS and Linux, you’ll need to open `/etc/hosts` in your code editor. On Windows, it may be at `C:\Windows\System32\drivers\etc\hosts\`.

Don’t edit anything else in that file, just add the following and save the file:

```
192.168.10.10 tutorial.test
```

Make sure the IP address listed matches the one in your `Homestead.yaml` file.

#### Launch the Vagrant box

Last step!

From your Homestead directory, run `vagrant up`. The virtual machine will be brought to life.

You should now be able to visit `https://tutorial.test` in your browser and get a “No input file specified.” error message.

## Other local environments

You can also choose one of the following guides to set up a development environment on your OS.

### MacOS, Windows, and Linux

- [DDEV](https://ddev.readthedocs.io/en/stable/)
- [Lando](https://lando.dev/)

### MacOS

- [Laravel Valet](https://laravel.com/docs/7.x/valet)
- [VirtualHostX](https://clickontyler.com/virtualhostx/)
- [MAMP Pro](https://www.mamp.info/en/mamp-pro/windows/)

### Windows

- [WAMP](http://www.wampserver.com/en/)
- [AMPPS](https://www.ampps.com/)
- [XAMPP](https://www.apachefriends.org/index.html)

Once you’ve set up your local development environment, we’re ready to install Craft CMS!
