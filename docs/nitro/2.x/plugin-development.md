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
      "symlink": false,
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
