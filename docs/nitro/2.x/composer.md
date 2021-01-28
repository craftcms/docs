# Installing Composer Dependencies with Nitro

Version 2 of Nitro is container based which makes installing dependencies a breeze. Nitro includes `nitro composer` command that enables you to run any composer command without having composer installed on your host machine.

```
$ cd ~/dev/my-project
$ nitro composer install
  … checking /Users/jasonmccallister/dev/plugins-dev/composer.json ✓
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Nothing to install, update or remove
Generating optimized autoload files
79 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
composer install completed 🤘
```
