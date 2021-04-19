# Installing Composer Dependencies

Nitro’s [`composer`](commands.md#composer) command lets you to run any composer command without having Composer installed on your host machine.

```bash
$ cd ~/dev/my-craft-project
$ nitro composer install
  … checking /Users/oli/dev/my-craft-project/composer.json ✓
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Nothing to install, update or remove
Generating optimized autoload files
79 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
composer install completed 🤘
```

## Using Composer 1

Each Nitro site comes with Composer 2 installed by default. If you need to use Composer 1, you can SSH into the site and update it manually:

1. Navigate to your project:
    ```sh
    $ cd ~/dev/my-craft-project
    ```
2. SSH into your site’s container with all-powerful `root` user permissions:
    ```sh
    $ nitro ssh --root
    ```
3. Update Composer to version 1:
    ```sh
    $ composer self-update --1
    ```
4. Optionally exit your site’s container and return to your host machine:
    ```sh
    $ exit
    ```

::: warning
Because site containers are ephemeral, you’ll need to do this again any time you rebuild its Docker container!
:::