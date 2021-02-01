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
