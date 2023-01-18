# Generator

The [Generator](repo:craftcms/generator) is a first-party module, plugin, and component scaffolding tool designed to reduce friction when setting up system extensions. We like to think of it as both a learning _and_ productivity tool.

## Installation

New Craft projects <Since ver="4.3.5" feature="The Generator CLI" /> come with the Generator package installed and ready to use. If you started your project with a version of Craft earlier than 4.3.5, [update](../updating.md) and run:

```bash
composer require craftcms/generator --dev
```

Generator’s API is accessible via the command line, under the `make` command:

```bash
php craft make
```

Without an argument, you will be presented with the command’s help text, and two primary options:

1. `php craft make plugin`: Initialize and wire up a new [Plugin](./plugin-guide.md).
1. `php craft make module`: Create a new [Module](./module-guide.md).



Feel free to explore the generator API at your own pace. See the official readme for a list of [currently-supported components](repo:craftcms/generator#system-component-generation), or run `php craft make` to see what is supported in the currently-installed version.

## Updates

To get the latest Generator functionality, run `composer update` in your project directory. Generator is not considered a plugin, and therefore will not appear in Craft’s built-in updater tool.

### Documentation Changes

We will be gradually rolling out Generator examples to most system component documentation.

## Trivia

Rather than implementing Generator as a plugin or module, we chose to use a Yii feature known as [bootstrapping](yii2:yii\base\BootstrapInterface), which automatically initializes the core class based on the [`extra.bootstrap`](guide:structure-extensions#bootstrapping-classes) key in `composer.json`.

This is generally _not_ a recommended extension point for Craft, as its presence in a system is non-optional once installed, and largely opaque.
