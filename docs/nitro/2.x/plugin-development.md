# Setting up Nitro for Plugin Development

Nitro supports running multiple sites with their own PHP versions, settings and Xdebug making plugin development a breeze. There are many ways to setup Nitro for plugin development but here are just a few.

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

Update composer using the [`composer`](commands.md#composer) command:

```bash
$ nitro composer install
```

You can now install your plugin and make changes that will be tracked with Git!
