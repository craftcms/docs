# Setting up Nitro for Plugin Development

Nitro supports running multiple sites with their own PHP versions, settings and Xdebug making plugin development easy. There are many ways to setup Nitro for plugin development but here are just a few.

## Local Composer Repository

One of the easiest ways to start plugin development with Nitro is to run the [`add`](commands.md#add) to create a new site.

```bash
$ nitro add plugins-dev
```

Navigate to the `plugins-dev` folder and create a `plugins` directory.

```bash
$ cd plugins-dev
$ mkdir plugins
```

Clone your plugin repository in the `plugins` directory.

```bash
$ git clone git@github.com:craftcms/commerce.git
```

Edit your `composer.json` to add a `repositories` setting:

```json
"repositories": [
    {
      "type": "path",
      "url": "./plugins/commerce"
    }
  ]
```

To add your local plugin, you need to require it in your project. In your sites root directory, require your plugin with the [`composer`](commands.md#composer) command:

```bash
$ nitro composer require craftcms/commerce
```

In the output, you will see your plugin referenced using a symlink during the installation.

    - Installing craftcms/commerce (3.2.14.1): Symlinking from ./plugins/commerce

In the control panel, visit **Settings** → **Plugins**, choose **Commerce** and switch on the **Enable** setting. You can now develop your plugins locally and keep changes tracked with Git!

## Running Codeception and PHPUnit with PHPStorm

PHPStorm allows you to use a remote interpreter to execute Codeception or PHPUnit tests. To run codeceptions tests with Nitro, perform the following actions:

1. Configure the remote interpreter in PHPStorm using Docker.
2. Select the image and version to use (e.g. `craftcms/nginx:7.4-dev`).
3. Add the configuration for running tests.

::: tip
These tests will run inside a container that is not attached to the default `nitro-network`. This means the databases are not reachable by the usual hostname (e.g. `mysql-8.0-3306.database.internal`). Instead, you must use `host.docker.internal` and database port (e.g. `3306`) in your `.env` file to reach the database.
:::
